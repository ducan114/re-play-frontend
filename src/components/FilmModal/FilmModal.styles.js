import styled from 'styled-components';

export const PosterPriviewer = styled.img`
  grid-column: span 2;
  object-fit: cover;
  width: 100%;
  border-radius: 10px;
`;

export const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.5em;
  row-gap: 0.5em;
  padding: 0.25em 0;
`;

export const Genre = styled.div`
  border-radius: 100px;
  padding: 0.125em 1em;
  border: 1px solid var(--colors-primary-dark-3);
  box-shadow: var(--shadow-border);
`;
