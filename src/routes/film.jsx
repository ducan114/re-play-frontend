import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFilmFetch from '../hooks/useFilmFetch';
import { useAPIContext } from '../contexts/APIContext';
import { usePushNotificationContext } from '../contexts/PushNotificationContext';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import Comments from '../components/Comments/';
import EpisodeModal from '../components/EpisodeModal/';
import FilmModal from '../components/FilmModal/';
import FilmActions from '../components/FilmActions/';
import Loader from '../components/Loader/';
import NotFound from '../components/NotFound/';
import Thumbnail from '../components/Thumbnail/';
import EpisodesGrid from '../components/EpisodesGrid';
import { Container } from '../styles/containers';
import { Card, CardContent, CardItem } from '../styles/cards';
import { SubscribeButton, LikeButton, DislikeButton } from '../styles/buttons';

export default function Film() {
  const {
    film,
    loading,
    thumbnailLoading,
    setThumbnailLoading,
    slug,
    setSlug,
    setNewUpdate,
    userReaction,
    likeFilm,
    dislikeFilm,
    isSubscribed,
    subscribe,
    unsubscribe
  } = useFilmFetch();
  const { user, API } = useAPIContext();
  const { handlePushSubscriptionRequest } = usePushNotificationContext();
  const [showAddEpisode, setShowAddEpisode] = useState(false);
  const [showUpdateFilm, setShowUpdateFilm] = useState(false);
  const navigate = useNavigate();

  const handleDeleteFilm = () =>
    toast.promise(API.Film.delete(slug), {
      loading: 'Deleting film',
      success: data => {
        navigate('/');
        return data.message;
      },
      error: 'Failed to delete film\nPlease check your connections'
    });

  const handleFilmSubscription = () => {
    if (isSubscribed) return unsubscribe();
    subscribe();

    handlePushSubscriptionRequest();
  };

  const scaleUp = { scale: 1.05 };
  const scaleDown = { scale: 0.95 };

  return !loading && film === undefined ? (
    <NotFound />
  ) : (
    <Container as='main' pd='2em 0'>
      {film ? (
        <>
          <FCard as='section' m='0 0 2em' hidden={thumbnailLoading}>
            <FCardContent>
              <ThumbContainer>
                <Thumbnail
                  img={film.poster}
                  onLoaded={() => setThumbnailLoading(false)}
                  hidden={thumbnailLoading}
                >
                  {user && user.role === 'admin' && (
                    <FilmActions>
                      <motion.span
                        className='material-symbols-outlined'
                        whileHover={scaleUp}
                        whileTap={scaleDown}
                        onClick={() => setShowUpdateFilm(true)}
                        title='Update'
                      >
                        edit
                      </motion.span>
                      <motion.span
                        className='material-symbols-outlined'
                        whileHover={scaleUp}
                        whileTap={scaleDown}
                        onClick={handleDeleteFilm}
                        title='Delete'
                      >
                        delete
                      </motion.span>
                      <motion.span
                        className='material-symbols-outlined'
                        whileHover={scaleUp}
                        whileTap={scaleDown}
                        onClick={() => setShowAddEpisode(true)}
                        title='New episode'
                      >
                        add
                      </motion.span>
                    </FilmActions>
                  )}
                </Thumbnail>
              </ThumbContainer>
              <Info>
                <FTitle>{film.title}</FTitle>
                <FDescription>
                  {film.description || 'No description.'}
                </FDescription>
                <Genres>
                  {film.genres.map(genre => (
                    <Genre key={genre.name}>{genre.name}</Genre>
                  ))}
                </Genres>
                <Detail>
                  <div>
                    {film.views} view{film.views > 1 && 's'}
                  </div>
                  <SubscribeButton
                    title={isSubscribed ? 'Unsubscribed' : 'Subscribe'}
                    subscribed={isSubscribed}
                    onClick={handleFilmSubscription}
                  >
                    <motion.span
                      whileHover={scaleUp}
                      whileTap={scaleDown}
                      className='material-symbols-outlined'
                    >
                      subscriptions
                    </motion.span>
                  </SubscribeButton>
                  <LikeButton
                    gap='.5em'
                    title={film.likes}
                    liked={userReaction === 'like'}
                    onClick={likeFilm}
                  >
                    <motion.span
                      whileHover={scaleUp}
                      whileTap={scaleDown}
                      className='material-symbols-outlined'
                    >
                      thumb_up
                    </motion.span>
                    {film.likes}
                  </LikeButton>
                  <DislikeButton
                    gap='.5em'
                    title={film.dislikes}
                    disliked={userReaction === 'dislike'}
                    onClick={dislikeFilm}
                  >
                    <motion.span
                      whileHover={scaleUp}
                      whileTap={scaleDown}
                      className='material-symbols-outlined'
                    >
                      thumb_down
                    </motion.span>
                    {film.dislikes}
                  </DislikeButton>
                </Detail>
              </Info>
            </FCardContent>
          </FCard>
          <EpisodesGrid
            slug={slug}
            episodes={film.episodes}
            hidden={thumbnailLoading}
          />
          {!thumbnailLoading && <Comments room={film._id} />}
          <AnimatePresence exitBeforeEnter>
            {showAddEpisode && (
              <EpisodeModal
                onBackdropClick={() => setShowAddEpisode(false)}
                onSuccess={() => setNewUpdate(true)}
                action='Create'
              />
            )}
          </AnimatePresence>
          <AnimatePresence exitBeforeEnter>
            {showUpdateFilm && (
              <FilmModal
                onBackdropClick={() => setShowUpdateFilm(false)}
                onSuccess={slug => {
                  if (slug) setSlug(slug);
                  setNewUpdate(true);
                }}
                action='Update'
                film={film}
              />
            )}
          </AnimatePresence>
          {thumbnailLoading && <Loader />}
        </>
      ) : (
        loading && <Loader />
      )}
    </Container>
  );
}

const FCard = styled(Card)`
  padding: 0;
  color: var(--colors-primary);
  background-color: var(--colors-secondary-translucent-dark);
  overflow: hidden;
`;

const ThumbContainer = styled(CardItem)`
  padding: 0;
  flex: 3 1 0;

  @media screen and (max-width: 968px) {
    flex: 2 1 0;
  }
`;

const Info = styled(CardItem)`
  flex: 7 1 0;
  display: flex;
  flex-direction: column;
  padding: 1em 1em 0.5em 2em;

  @media screen and (max-width: 968px) {
    flex: 3 1 0;
  }

  @media screen and (max-width: 768px) {
    padding: 1em;
  }
`;

const FCardContent = styled(CardContent)`
  display: flex;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const FTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5em;
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1em;

  div:first-child {
    margin-right: auto;
  }
`;

const FDescription = styled.p`
  flex: 1 1 0;
  overflow: auto;
  margin-bottom: 0.5em;
  padding-right: 0.5em;
  white-space: pre-wrap;
  font-weight: 300;
  font-size: 0.95rem;

  &::-webkit-scrollbar-thumb {
    border-radius: 0;
  }

  @media screen and (max-width: 768px) {
    flex: 1;
    max-height: 150px;
  }
`;

const Genres = styled.div`
  display: flex;
  column-gap: 0.5em;
  row-gap: 0.25em;
  flex-wrap: wrap;
  align-items: center;
  overflow-y: auto;
  max-height: 80px;
`;

const Genre = styled.span`
  padding: 0.1em 0.75em;
  border-radius: 100px;
  background-color: var(--colors-primary-dark-2);
  color: var(--colors-secondary-dark);
  font-size: 0.85rem;
`;
