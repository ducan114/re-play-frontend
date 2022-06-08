import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import styled from 'styled-components';
import 'video.js/dist/video-js.css';

export default function VideoPlayer({ sources, poster, options, onReady }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          sources,
          poster,
        },
        () => {
          console.log('player is ready');
          if (onReady) onReady(player);
        }
      ));
    } else {
      // you can update player here [update player through props]
      const player = playerRef.current;
      player.poster(poster);
      const newSrc = sources[0].src;
      const oldSrc = player.options_.sources[0].src;
      if (newSrc != oldSrc) player.src(sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <StyledVideo ref={videoRef} className='video-js vjs-big-play-centered' />
    </div>
  );
}

const StyledVideo = styled.video`
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
