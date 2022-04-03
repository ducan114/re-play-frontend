import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  width: 90%;
  display: ${props => props.flex && 'flex'};
  flex-direction: ${props => props.col && 'column'};
  padding: ${props => props.pd};
  justify-content: ${props => props.centered && 'center'};
  align-items: ${props => props.centered && 'center'};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
  display: ${props => props.grid && 'grid'};
  grid-template-columns: ${props => props.gtc};
  grid-template-rows: ${props => props.gtr};
  column-gap: ${props => props.cg};
  row-gap: ${props => props.rg};
`;
