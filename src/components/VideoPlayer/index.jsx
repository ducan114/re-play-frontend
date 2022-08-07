import { useEffect, useRef } from 'react';
import videojs from 'video.js';
import { StyledVideo } from './VideoPlayer.styles';
import 'video.js/dist/video-js.css';

export default function VideoPlayer({ sources, poster, options, onReady }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  const onKeyDown = e => {
    const player = playerRef.current;
    if (!player || player.paused()) return;
    const callbacks = {
      ArrowLeft: () => player.currentTime(player.currentTime() - 30),
      ArrowRight: () => player.currentTime(player.currentTime() + 30)
    };
    const callback = callbacks[e.key];
    if (callback) callback();
  };

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
          poster
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
    document.addEventListener('keydown', onKeyDown);

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
      document.removeEventListener('keypress', onKeyDown);
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <StyledVideo ref={videoRef} className='video-js vjs-big-play-centered' />
    </div>
  );
}
