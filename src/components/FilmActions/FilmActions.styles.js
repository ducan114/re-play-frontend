import styled from 'styled-components';

export const Wrapper = styled.div`
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
