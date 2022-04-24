import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useEpisodeFetch from '../hooks/useEpisodeFetch';
import { useAPIContext } from '../contexts/APIContext';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import EpisodeModal from '../components/EpisodeModal';
import NotFound from '../components/NotFound';
import Loader from '../components/Loader';
import VideoPlayer from '../components/VideoPlayer';
import EpisodeActions from '../components/EpisodeActions';
import Comments from '../components/Comments';
import { Container } from '../styles/containers';
import { LikeButton, DislikeButton } from '../styles/buttons';
import { Card, CardContent, CardTitle, CardItem } from '../styles/cards';
import { getVideoSource } from '../helpers';

export default function Episode() {
  const {
    loading,
    slug,
    episodeNumber,
    setEpisodeNumber,
    episode,
    setNewUpdate,
    userReaction,
    likeEpisode,
    dislikeEpisode
  } = useEpisodeFetch();
  const {
    user,
    API: { Episode }
  } = useAPIContext();
  const [showUpdateEpisode, setShowUpdateEpisode] = useState(false);
  const playerRef = useRef(null);
  const navigate = useNavigate();

  const videoPlayerOptions = {
    preload: 'metadata',
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    playbackRates: [0.5, 1, 1.5, 2]
  };
  const videoPlayerSources = [
    {
      src: episode && getVideoSource(episode.videoId),
      type: episode && episode.videoMimeType
    }
  ];
  const videoPlayerPoster = (episode && episode.thumbnail) || '';

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
    toast.promise(Episode.delete(slug, episodeNumber), {
      loading: 'Deleting episode',
      success: data => {
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
          <Card m='0 0 2em'>
            <CardContent>
              <CardItem
                as={VideoPlayer}
                sources={videoPlayerSources}
                poster={videoPlayerPoster}
                options={videoPlayerOptions}
                onReady={handlePlayerReady}
              />
              <CardItem as={EpisodeTitle} pd='.25em'>
                Ep {episode.episodeNumber}
                {episode.title && ` - ${episode.title}`}
              </CardItem>
              <CardItem as={EpisodeInfo} pd='.25em'>
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
              </CardItem>
            </CardContent>
          </Card>
          {!loading && <Comments room={`${episode.filmId}/${episode._id}`} />}
          <AnimatePresence>
            {showUpdateEpisode && (
              <EpisodeModal
                onBackdropClick={() => setShowUpdateEpisode(false)}
                onSuccess={newEpisodeNumber => {
                  if (newEpisodeNumber) setEpisodeNumber(newEpisodeNumber);
                  setNewUpdate(true);
                }}
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
`;

const EpisodeInfo = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1em;
`;

const Views = styled.div`
  margin-right: auto;
`;
