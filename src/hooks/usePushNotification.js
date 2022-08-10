import { useEffect } from 'react';
import { useAPIContext } from '../contexts/APIContext';
import toast from 'react-hot-toast';

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

export default function usePushNotification() {
  const {
    user,
    loadingUser,
    API: { PushNotification }
  } = useAPIContext();

  useEffect(() => {
    if (!loadingUser && !user) unsubscribeUser();
  }, [loadingUser, user]);

  const unsubscribeUser = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        if (!registration.pushManager)
          return console.log('Push manager unavailable');

        const subscription = await registration.pushManager.getSubscription();
        if (subscription == null)
          return console.log('No subscription detected');

        await subscription.unsubscribe();
        console.log('Unsubscribed');
      } catch (err) {
        console.log(
          'An error occurred during service worker registration',
          err
        );
      }
    }
  };

  const subscribeUser = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.ready;
        if (!registration.pushManager)
          return console.log('Push manager unavailable');

        const subscription = await registration.pushManager.getSubscription();
        if (subscription === null) {
          console.log('No subscription detected. Make a request');
          try {
            const newSubscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
            });
            console.log('New subscription added' + newSubscription);
            PushNotification.subscribe(newSubscription);
          } catch (err) {
            if (Notification.permission !== 'granted')
              console.log('Permission was not granted');
            else
              console.log(
                'An error occurred during the subscription process',
                err
              );
          }
        } else {
          console.log('Existing subscription detected');
        }
      } catch (err) {
        console.log(
          'An error occurred during service worker registration',
          err
        );
      }
    }
  };

  const handlePushSubscriptionRequest = () => {
    if (Notification.permission === 'granted') {
      console.log('Notification accepted');
      subscribeUser();
    } else if (Notification.permission === 'denied') {
      console.log('Notification blocked');
      return toast.error(
        'Notifications is currently blocked\nYou will not be notified'
      );
    } else {
      console.log('Asking for notification permission');
      toast.promise(Notification.requestPermission(), {
        loading: 'Asking for notification permission...',
        success: consent => {
          if (consent !== 'granted') {
            console.log('Notification denied');
            throw new Error('Permission denied');
          }
          subscribeUser();
          return 'Permission granted';
        },
        error: err => err.message
      });
    }
  };

  return {
    handlePushSubscriptionRequest,
    subscribeUser,
    unsubscribeUser
  };
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
