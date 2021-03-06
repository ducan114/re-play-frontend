import styled from 'styled-components';

export const Form = styled.form`
  padding: ${props => props.pd || undefined};
  display: grid;
  grid-template-columns: max-content 1fr;
  width: 100%;
  gap: 1em;
  overflow-y: auto;
  align-items: baseline;
  color: var(--colors-secondary-dark);

  label {
    font-weight: 700;
    cursor: pointer;
    padding: 0.25em 0;
    align-self: flex-start;
  }

  label[data-select-media] {
    grid-column: span 2;
    width: 100%;
  }

  input,
  textarea {
    outline: none;
    border: none;
    padding: 0.25em 0.5em;
  }

  input {
    position: relative;
    font-size: 1rem;
    border-bottom: 1px solid var(--colors-secondary);
    width: 100%;

    :focus {
      border-bottom-width: 2px;
    }
  }

  textarea {
    resize: none;
    width: 100%;
    height: 200px;
    border-radius: 5px;
    /* box-shadow: var(--shadow-border); */
    border: 1px solid var(--colors-secondary);
    background-color: var(--colors-primary-dark-1);
    font-family: 'Poppins', sans-serif;
    font-size: 1rem;
    flex-shrink: 0;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

export const FormControl = styled.div`
  ${props =>
    props.sticky &&
    `
  position: sticky;
  bottom: 0;
  padding-right: 0.5em;
  `}
  padding-top: .25em;
  padding-bottom: 0.25em;
  grid-column: span 2;
  justify-self: end;
  display: flex;
  column-gap: 1em;
`;

export const FormTitle = styled.div`
  text-align: ${props => props.center};
  margin: ${props => props.m || '0 0 .5em'};
  font-size: ${props => props.fs || '1.75rem'};
  font-weight: 700;
  grid-column: span 2;
`;
