import Header from './components/Header';
import GlobalStyles from './styles/globalStyles';
import { useState, useEffect } from 'react';
import UserContext from './contexts/userContext';
import { Outlet } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function App() {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [authenticating, setAuthenticating] = useState(true);

  const authenticate = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ accessToken })
      });
      const data = await res.json();
      if (!data.user) return;

      setUser(data.user);
      if (data.accessToken) setAccessToken(data.accessToken);
      toast.success('Signed in!');
    } catch (err) {
      toast.error('Sign in failed.\nPlease check your connections!');
    } finally {
      setAuthenticating(false);
    }
  };

  useEffect(authenticate, []);

  return (
    <UserContext.Provider
      value={{ user, authenticating, accessToken, setUser, setAccessToken }}
    >
      <GlobalStyles />
      <Header />
      <Outlet />
      <Toaster />
    </UserContext.Provider>
  );
}
