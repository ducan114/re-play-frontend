import { APIProvider } from './contexts/APIContext';
import { ModalProvider } from './contexts/ModalContext';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import GlobalStyles from './styles/globalStyles';
import * as serviceWorker from './serviceWorkerRegistration';

export default function App() {
  return (
    <APIProvider>
      <Header />
      <ModalProvider>
        <Outlet />
      </ModalProvider>
      <Toaster />
      <GlobalStyles />
    </APIProvider>
  );
}

serviceWorker.register();
