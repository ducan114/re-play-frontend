import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrapper } from './EpisodeActions.styles';

export default function EpisodeActions({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Wrapper>
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
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.75, opacity: 0 }}>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}
