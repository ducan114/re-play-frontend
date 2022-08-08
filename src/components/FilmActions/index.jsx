import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrapper } from './FilmActions.styles';

export default function FilmActions({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper title='Actions'>
      <motion.span
        className='material-symbols-outlined'
        whileHover={{ scale: 1.1 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        onClick={() => setIsOpen(prev => !prev)}>
        settings
      </motion.span>
      <AnimatePresence exitBeforeEnter>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}
