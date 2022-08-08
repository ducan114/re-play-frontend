import styled from 'styled-components';

export const StyledVideo = styled.video`
  color: var(--colors-primary);
  margin-bottom: 1em;

  &.vjs-big-play-centered {
    .vjs-big-play-button {
      margin: 0;
      transform: translate(-50%, -50%);
    }
  }

  .vjs-big-play-button {
    width: 2em;
    height: 2em;
    border-radius: 100%;
    border-color: var(--colors-primary);

    .vjs-icon-placeholder {
      ::before {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: auto;
        height: auto;
      }
    }
  }
`;
