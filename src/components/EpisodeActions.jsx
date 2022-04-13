import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

export default function EpisodeActions({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Wrapper>
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
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.75, opacity: 0 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;

  div {
    position: absolute;
    bottom: calc(100% + 5px);
    right: 0;
    border-radius: 5px;
    padding: 0.5em;
    background-color: var(--colors-primary);
    box-shadow: var(--shadow-border-big);
  }
`;
