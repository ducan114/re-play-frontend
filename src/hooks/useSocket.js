import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useAPIContext } from '../contexts/APIContext';

const SOCKET_BASE_URL = import.meta.env.VITE_SOCKET_BASE_URL;

export default function useSocket() {
  const { user } = useAPIContext();
  const [socket, setSocket] = useState();

  useEffect(
    () =>
      user
        ? setSocket(
            io(SOCKET_BASE_URL, {
              autoConnect: false,
              withCredentials: true
            })
          )
        : setSocket(
            io(SOCKET_BASE_URL, {
              autoConnect: false
            })
          ),
    [user]
  );

  useEffect(() => {
    if (!socket) return;
    socket.connect();

    return () => socket.close();
  }, [socket]);

  return socket;
}
