import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Card = styled(motion.div)`
  padding: ${props => props.pd || '1em'};
  border: none;
  border-radius: 10px;
  background-color: var(--colors-primary);
  box-shadow: var(--shadow-border);
  margin: ${props => props.m};
`;

export const CardTitle = styled.h1`
  text-align: center;
  font-size: 2rem;
  margin: ${props => props.m};
  color: ${props => props.c};
`;

export const CardItem = styled(motion.div)`
  padding: ${props => props.pd || '.75em'};
  cursor: ${props => props.pointer && 'pointer'};
  border-bottom: ${props =>
    props.bb && '1px solid var(--colors-primary-dark-2)'};
`;
