import { createContext, useContext, useState, useEffect } from 'react';

const ModalContext = createContext({
  increaseModals: () => {},
  decreaseModals: () => {}
});

export function useModalContext() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [modals, setModals] = useState(0);

  useEffect(() => {
    if (modals === 0) document.body.classList.remove('modal-open');
    else document.body.classList.add('modal-open');
  }, [modals]);

  return (
    <ModalContext.Provider
      value={{
        increaseModals: () => setModals(prev => prev + 1),
        decreaseModals: () => setModals(prev => prev - 1)
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
