import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Button = styled(motion.button)`
  text-decoration: none;
  cursor: pointer;
  padding: 0.5em 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  border-radius: 5px;
  font-weight: 700;
  font-size: 1rem;
  gap: ${props => props.gap};

  &[disabled] {
    filter: grayscale(1);
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(Button)`
  background-color: var(--colors-secondary-dark);
  color: var(--colors-primary);
`;

export const SecondaryButton = styled(Button)`
  background-color: var(--colors-primary);
  color: var(--colors-secondary-dark);
`;

export const SuccessButton = styled(Button)`
  background-color: var(--colors-success);
  color: var(--colors-primary);
`;

export const DangerButton = styled(Button)`
  background-color: var(--colors-danger);
  color: var(--colors-primary);
`;

export const BlueButton = styled(Button)`
  background-color: var(--colors-blue);
  color: var(--colors-primary);
`;

export const LikeButton = styled(Button)`
  padding: 0.5em;
  background-color: transparent;
  color: ${props =>
    props.dark ? 'var(--colors-secondary-dark-2)' : 'var(--colors-primary)'};

  span.material-icons {
    color: ${props => props.liked && 'var(--colors-blue)'};
  }

  :hover span.material-icons {
    color: var(--colors-blue);
  }
`;

export const DislikeButton = styled(SecondaryButton)`
  padding: 0.5em;
  background-color: transparent;
  color: ${props =>
    props.dark ? 'var(--colors-secondary-dark-2)' : 'var(--colors-primary)'};

  span.material-icons {
    color: ${props => props.disliked && 'var(--colors-danger)'};
  }

  :hover span.material-icons {
    color: var(--colors-danger);
  }
`;
