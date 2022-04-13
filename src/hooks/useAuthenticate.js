import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { authenticate } from '../API';

export default function useAuthenticate() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [authenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    authenticate(accessToken)
      .then(data => {
        if (!data.user) return;
        setUser(data.user);
        if (data.accessToken) setAccessToken(data.accessToken);
        toast.success('Signed in!');
      })
      .catch(err =>
        toast.error('Sign in failed.\nPlease check your connections!')
      )
      .finally(() => setAuthenticating(false));
  }, []);

  return { user, setUser, accessToken, setAccessToken, authenticating };
}
