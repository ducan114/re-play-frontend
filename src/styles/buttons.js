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
  background-color: var(--btn-background-color);
  color: var(--btn-color, var(--colors-primary));
  box-shadow: ${props =>
    props.shadow && '0 0 3px 0 var(--btn-background-color)'};

  &[disabled] {
    filter: grayscale(1);
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(Button)`
  --btn-background-color: var(--colors-secondary-dark);
  --btn-color: var(--colors-primary);
`;

export const SecondaryButton = styled(Button)`
  --btn-background-color: var(--colors-primary);
  --btn-color: var(--colors-secondary-dark);
`;

export const SuccessButton = styled(Button)`
  --btn-background-color: var(--colors-success);
  --btn-color: var(--colors-primary);
`;

export const DangerButton = styled(Button)`
  --btn-background-color: var(--colors-danger);
  --btn-color: var(--colors-primary);
`;

export const BlueButton = styled(Button)`
  --btn-background-color: var(--colors-blue);
  --btn-color: var(--colors-primary);
`;

export const LikeButton = styled(Button)`
  padding: 0.5em;
  --btn-background-color: transparent;
  --btn-color: ${props =>
    props.dark ? 'var(--colors-secondary-dark)' : 'var(--colors-primary)'};

  span.material-symbols-outlined {
    color: var(--btn-color);
    --btn-color: ${props => props.liked && 'var(--colors-blue)'};
    ${props => props.liked && "font-variation-settings: 'FILL' 1"};
  }

  :hover span.material-symbols-outlined {
    --btn-color: var(--colors-blue);
  }
`;

export const DislikeButton = styled(SecondaryButton)`
  padding: 0.5em;
  --btn-background-color: transparent;
  --btn-color: ${props =>
    props.dark ? 'var(--colors-secondary-dark)' : 'var(--colors-primary)'};

  span.material-symbols-outlined {
    color: var(--btn-color);
    --btn-color: ${props => props.disliked && 'var(--colors-danger)'};
    ${props => props.disliked && "font-variation-settings: 'FILL' 1"};
  }

  :hover span.material-symbols-outlined {
    --btn-color: var(--colors-danger);
  }
`;
