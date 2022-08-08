import { useState, useEffect, useRef } from 'react';

export default function useMountedState(initialState) {
  const [state, setState] = useState(initialState);
  const isMounted = useRef(true);

  const setMountedState = newState => {
    if (isMounted.current) setState(newState);
  };

  useEffect(() => () => (isMounted.current = false), []);

  return [state, setMountedState];
}
