import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Backdrop, Modal as StyledModal } from '../styles/modals';

export default function Modal({ onBackdropClick, children }) {
  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  return (
    <Backdrop onClick={onBackdropClick}>
      <StyledModal
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
            stiffness: 500,
          },
        }}
        exit={{ y: '100vh', opacity: 0 }}>
        {children}
      </StyledModal>
    </Backdrop>
  );
}
