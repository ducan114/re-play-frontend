import styled from 'styled-components';

export const Wrapper = styled.div`
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
