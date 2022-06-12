import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  aspect-ratio: 3/4;
  background-color: var(--colors-secondary-translucent);

  :hover img {
    filter: brightness(75%);
  }
`;
export const Title = styled.div`
  --ph: 1em;
  background-color: var(--colors-secondary-translucent);
  color: var(--colors-primary-dark-2);
  box-shadow: var(--shadow-border-super-big);
  position: absolute;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 0.5em var(--ph);

  div {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    white-space: nowrap;
    min-width: 100%;
  }

  :hover span {
    display: inline-block;
    transition: ${props => props.tt} linear;
    transform: translateX(calc(var(--width) - 2 * var(--ph) - 100%));
  }
`;

export const Image = styled.img`
  object-fit: cover;
  display: block;
  width: 100%;
  height: 100%;
`;
