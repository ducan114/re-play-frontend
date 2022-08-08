import styled from 'styled-components';

export const Wrapper = styled.div`
  background-color: var(--colors-secondary);
  color: var(--colors-primary);
  padding-bottom: 0.5em;

  span.material-symbols-outlined {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45px;
    height: 45px;
    cursor: pointer;
    font-size: 2rem;
  }
`;

export const SearchBox = styled.div`
  flex: 1 1 0px;
  min-width: 120px;
  background-color: var(--colors-secondary-translucent);
  border: none;
  border-radius: 100px;
  outline: none;
  display: flex;
  align-items: center;

  :focus {
    outline: none;
  }

  input,
  input:focus {
    outline: none;
  }

  input {
    flex: 1 1 0px;
    min-width: 120px;
    background-color: transparent;
    border: none;
    color: var(--colors-primary);
    font-size: 1.1rem;
  }
`;
