import { createContext, useContext } from 'react';
import useAPI from '../hooks/useAPI';
import useUserData from '../hooks/useUserData';

const APIContext = createContext({
  user: null,
  loadingUser: true,
  setUser: () => {},
  API: null
});

export function useAPIContext() {
  return useContext(APIContext);
}

export function APIProvider({ children }) {
  const API = useAPI();
  const { user, loadingUser, setUser } = useUserData(API.User.getInfo);

  return (
    <APIContext.Provider value={{ user, loadingUser, setUser, API }}>
      {children}
    </APIContext.Provider>
  );
}
