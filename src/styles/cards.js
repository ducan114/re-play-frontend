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

export const CardContent = styled.div`
  display: ${props => props.flex && 'flex'};
  flex-wrap: ${props => props.fwrap && 'wrap'};
  justify-content: ${props => props.centered && 'center'};
  align-items: ${props => props.centered && 'center'};
  flex-direction: ${props => props.col && 'column'};
  margin: ${props => props.m};
  padding: ${props => props.pd};
  column-gap: ${props => props.cg};
  row-gap: ${props => props.rg};
  max-height: ${props => props.mh};
`;

export const CardTitle = styled.h1`
  text-align: ${props => props.ta};
  font-size: ${props => props.fs || '2rem'};
  margin: ${props => props.m};
  color: ${props => props.c};
  font-weight: ${props => props.wght || 700};
`;

export const CardItem = styled(motion.div)`
  padding: ${props => props.pd || '.75em'};
  cursor: ${props => props.pointer && 'pointer'};
  border-bottom: ${props =>
    props.bb && '1px solid var(--colors-primary-dark-2)'};
`;
