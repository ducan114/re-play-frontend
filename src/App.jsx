import { APIProvider } from './contexts/APIContext';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import GlobalStyles from './styles/globalStyles';

export default function App() {
  return (
    <APIProvider>
      <Header />
      <Outlet />
      <Toaster />
      <GlobalStyles />
    </APIProvider>
  );
}
