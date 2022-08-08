import { useEffect } from 'react';
import { useModalContext } from '../../contexts/ModalContext';
import { motion } from 'framer-motion';
import { Backdrop, Wrapper } from './Modal.styles';

export default function Modal({ onBackdropClick, children }) {
  const { increaseModals, decreaseModals } = useModalContext();
  useEffect(() => {
    increaseModals();
    return decreaseModals;
  }, []);

  return (
    <Backdrop
      onClick={e => {
        e.stopPropagation();
        onBackdropClick();
      }}
    >
      <Wrapper
        as={motion.div}
        onClick={e => e.stopPropagation()}
        initial={{ y: '-100vh', opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.2,
            type: 'spring',
            damping: 25,
            stiffness: 500
          }
        }}
        exit={{ y: '100vh', opacity: 0 }}
      >
        {children}
      </Wrapper>
    </Backdrop>
  );
}
