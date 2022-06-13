import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Form, FormTitle, FormControl } from '../../styles/forms';

export const Wrapper = styled(Form)`
  label[data-is-icon] {
    display: flex;
  }

  span.material-symbols-outlined {
    font-size: 1.75rem;
    align-items: baseline;
    font-variation-settings: 'wght' 500;
  }
`;

export const Genres = styled.div`
  font-weight: 500;
`;

export const AddGenre = styled(motion.span)`
  border-radius: 5px;
  color: var(--colors-success);
  width: max-content;
`;
