import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

export default function FilmActions({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper title='Actions'>
      <motion.span
        className='material-icons'
        whileHover={{ scale: 1.1 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        onClick={() => setIsOpen(prev => !prev)}
      >
        settings
      </motion.span>
      <AnimatePresence exitBeforeEnter>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  top: 0.5em;
  left: 0.5em;
  cursor: pointer;

  div {
    position: absolute;
    top: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    row-gap: 0.5em;
  }
`;
