import { createContext } from 'react';

const UserContext = createContext({
  user: null,
  authenticating: true,
  setUser: () => {},
  accessToken: null,
  setAccessToken: () => {}
});

export default UserContext;
