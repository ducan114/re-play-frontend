import { createContext, useContext } from 'react';
import usePushNotification from '../hooks/usePushNotification';

const PushNotificationContext = createContext({
  handlePushSubscriptionRequest: () => {},
  subscribeUser: () => {},
  unsubscribeUser: () => {}
});

export function usePushNotificationContext() {
  return useContext(PushNotificationContext);
}

export function PushNotificationProvider({ children }) {
  const { subscribeUser, unsubscribeUser, handlePushSubscriptionRequest } =
    usePushNotification();

  return (
    <PushNotificationContext.Provider
      value={{ subscribeUser, unsubscribeUser, handlePushSubscriptionRequest }}
    >
      {children}
    </PushNotificationContext.Provider>
  );
}
