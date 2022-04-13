import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import useEpisodeFetch from '../hooks/useEpisodeFetch';
import UserContext from '../contexts/userContext';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import EpisodeModal from '../components/EpisodeModal';
import NotFound from '../components/NotFound';
import Loader from '../components/Loader';
import VideoPlayer from '../components/VideoPlayer';
import EpisodeActions from '../components/EpisodeActions';
import { Container } from '../styles/containers';
import { LikeButton, DislikeButton } from '../styles/buttons';
import { getVideoSource } from '../helpers';
import { updateEpisode, deleteEpisode } from '../API';

export default function Episode() {
  const {
    loading,
    slug,
    episodeNumber,
    setEpisodeNumber,
    accessToken,
    episode,
    setNewUpdate,
    userReaction,
    likeEpisode,
    dislikeEpisode
  } = useEpisodeFetch();
  const { user } = useContext(UserContext);
  const [showUpdateEpisode, setShowUpdateEpisode] = useState(false);
  const playerRef = useRef(null);
  const navigate = useNavigate();

  const videoPlayerOptions = {
    preload: 'metadata',
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    playbackRates: [0.5, 1, 1.5, 2],
    poster: episode && episode.thumbnail,
    sources: [
      {
        src: episode && getVideoSource(episode.videoId),
        type: episode && episode.videoMimeType
      }
    ]
  };

  const handlePlayerReady = player => {
    playerRef.current = player;
    // you can handle player events here
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };

  const handleDeleteEpisode = () =>
    toast.promise(deleteEpisode(accessToken, slug, episodeNumber), {
      loading: 'Deleting episode',
      success: data => {
        if (data.accessToken) setAccessToken(data.accessToken);
        navigate(`/films/${slug}`);
        return data.message;
      },
      error: 'Failed to delete film\nPlease check your connections'
    });

  const scaleUp = { scale: 1.05 };
  const scaleDown = { scale: 0.95 };

  return !loading && episode === undefined ? (
    <NotFound />
  ) : (
    <Container as='main' pd='2em 0'>
      {episode ? (
        <>
          <VideoPlayer
            options={videoPlayerOptions}
            onReady={handlePlayerReady}
          />
          <EpisodeTitle>
            Ep {episode.episodeNumber}
            {episode.title && ` - ${episode.title}`}
          </EpisodeTitle>
          <EpisodeInfo>
            <Views>
              {episode.views} view{episode.views > 1 && 's'}
            </Views>
            <LikeButton
              dark
              gap='.5em'
              whileHover={scaleUp}
              whileTap={scaleDown}
              title={episode.likes}
              liked={userReaction === 'like'}
              onClick={likeEpisode}
            >
              <span className='material-icons'>thumb_up</span>
              {episode.likes}
            </LikeButton>
            <DislikeButton
              dark
              gap='.5em'
              whileHover={scaleUp}
              whileTap={scaleDown}
              title={episode.dislikes}
              disliked={userReaction === 'dislike'}
              onClick={dislikeEpisode}
            >
              <span className='material-icons'>thumb_down</span>
              {episode.dislikes}
            </DislikeButton>
            {user && user.role === 'admin' && (
              <EpisodeActions>
                <motion.span
                  className='material-icons'
                  whileHover={scaleUp}
                  whileTap={scaleDown}
                  title='Update'
                  onClick={() => setShowUpdateEpisode(true)}
                >
                  edit
                </motion.span>
                <motion.span
                  className='material-icons'
                  whileHover={scaleUp}
                  whileTap={scaleDown}
                  title='Delete'
                  onClick={handleDeleteEpisode}
                >
                  delete
                </motion.span>
              </EpisodeActions>
            )}
          </EpisodeInfo>
          <AnimatePresence>
            {showUpdateEpisode && (
              <EpisodeModal
                onBackdropClick={() => setShowUpdateEpisode(false)}
                onSuccess={newEpisodeNumber => {
                  if (newEpisodeNumber) setEpisodeNumber(newEpisodeNumber);
                  setNewUpdate(true);
                }}
                onSubmit={data =>
                  updateEpisode(accessToken, slug, episodeNumber, data)
                }
                action='Update'
                episode={episode}
              />
            )}
          </AnimatePresence>
        </>
      ) : (
        loading && <Loader />
      )}
    </Container>
  );
}

const EpisodeTitle = styled.h1`
  font-weight: 400;
  font-size: 1.5rem;
  margin-bottom: 0.25em;
`;

const EpisodeInfo = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1em;
`;

const Views = styled.div`
  margin-right: auto;
`;
