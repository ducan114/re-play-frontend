import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import styled from 'styled-components';
import 'video.js/dist/video-js.css';

export default function VideoPlayer({ options, onReady }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log('player is ready');
        onReady && onReady(player);
      }));
    } else {
      // you can update player here [update player through props]
      const player = playerRef.current;
      player.poster(options.poster);
      player.src(options.sources);
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
  color: #00ff00;
  margin-bottom: 1em;

  .vjs-big-play-button {
    border-color: #0f0;
  }
`;
