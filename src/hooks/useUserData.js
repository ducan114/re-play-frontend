import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { unsubscribeUser } from '../pushNotificationSubscription';

export default function useUserData(getUserInfo) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    setLoadingUser(true);
    getUserInfo()
      .then(data => {
        setUser(data);
        toast.success('Signed in');
      })
      .catch(err => {})
      .finally(() => setLoadingUser(false));
  }, []);

  useEffect(() => {
    if (!loadingUser && !user) unsubscribeUser();
  }, [loadingUser, user]);

  return {
    user,
    loadingUser,
    setUser
  };
}
