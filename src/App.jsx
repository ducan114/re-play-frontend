import useAuthenticate from './hooks/useAuthenticate';
import UserContext from './contexts/userContext';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import GlobalStyles from './styles/globalStyles';

export default function App() {
  const { user, authenticating, accessToken, setUser, setAccessToken } =
    useAuthenticate();

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
