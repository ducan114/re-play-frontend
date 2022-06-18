import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Form } from '../../styles/forms';

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
  align-self: center;
`;

export const AddGenre = styled(motion.span)`
  border-radius: 100%;
  color: var(--colors-success);
  width: max-content;
  transition: background-color 300ms;

  :hover,
  :active {
    background-color: var(--colors-success-translucent);
  }
`;

export const GenreList = styled.div`
  grid-column: span 2;
`;

export const GenreWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid var(--colors-primary-dark-2);
  transition: all 300ms;
  padding: 0.5em;
  ${props => props.selected && 'box-shadow: var(--shadow-border)'};
  ${props =>
    props.selected && 'background-color: var(--colors-primary-dark-3)'};

  :hover {
    ${props => props.selected || 'box-shadow: var(--shadow-border)'};
    ${props =>
      props.selected || 'background-color: var(--colors-primary-dark-2)'};
  }
`;

export const GenreName = styled.div`
  flex: 1 1 0;
  font-size: 1rem;
`;

export const GenreActions = styled.div`
  display: flex;
  column-gap: 0.5em;
`;

export const EditGenreIcon = styled(motion.span)`
  color: var(--colors-warning);
  border-radius: 100%;
  transition: background-color 300ms;

  :hover {
    background-color: var(--colors-warning-translucent);
  }
`;

export const DeleteGenreIcon = styled(motion.span)`
  color: var(--colors-danger);
  border-radius: 100%;
  transition: background-color 300ms;

  :hover {
    background-color: var(--colors-danger-translucent);
  }
`;
