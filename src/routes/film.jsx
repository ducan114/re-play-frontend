import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useFilmFetch from '../hooks/useFilmFetch';
import UserContext from '../contexts/userContext';
import styled from 'styled-components';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import EpisodeModal from '../components/EpisodeModal';
import FilmModal from '../components/FilmModal';
import FilmActions from '../components/FilmActions';
import Loader from '../components/Loader';
import NotFound from '../components/NotFound';
import Thumbnail from '../components/Thumbnail';
import { Container } from '../styles/containers';
import { Card, CardContent, CardItem, CardTitle } from '../styles/cards';
import { LikeButton, DislikeButton } from '../styles/buttons';
import { createEpisode, updateFilm, deleteFilm } from '../API';

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
    dislikeFilm
  } = useFilmFetch();
  const { user, accessToken, setAccessToken } = useContext(UserContext);
  const [showAddEpisode, setShowAddEpisode] = useState(false);
  const [showUpdateFilm, setShowUpdateFilm] = useState(false);
  const navigate = useNavigate();

  const handleDeleteFilm = () =>
    toast.promise(deleteFilm(accessToken, slug), {
      loading: 'Deleting film',
      success: data => {
        if (data.accessToken) setAccessToken(data.accessToken);
        navigate('/');
        return data.message;
      },
      error: 'Failed to delete film\nPlease check your connections'
    });

  const scaleUp = { scale: 1.05 };
  const scaleDown = { scale: 0.95 };

  return !loading && film === undefined ? (
    <NotFound />
  ) : (
    <Container as='main' pd='2em 0'>
      {film ? (
        <>
          <FCard m='0 0 2em' hidden={thumbnailLoading}>
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
                        className='material-icons'
                        whileHover={scaleUp}
                        whileTap={scaleDown}
                        onClick={() => setShowUpdateFilm(true)}
                        title='Update'
                      >
                        edit
                      </motion.span>
                      <motion.span
                        className='material-icons'
                        whileHover={scaleUp}
                        whileTap={scaleDown}
                        onClick={handleDeleteFilm}
                        title='Delete'
                      >
                        delete
                      </motion.span>
                      <motion.span
                        className='material-icons'
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
                <Detail>
                  <div>
                    {film.views} view{film.views > 1 && 's'}
                  </div>
                  <LikeButton
                    gap='.5em'
                    whileHover={scaleUp}
                    whileTap={scaleDown}
                    title={film.likes}
                    liked={userReaction === 'like'}
                    onClick={likeFilm}
                  >
                    <span className='material-icons'>thumb_up</span>
                    {film.likes}
                  </LikeButton>
                  <DislikeButton
                    gap='.5em'
                    whileHover={scaleUp}
                    whileTap={scaleDown}
                    title={film.dislikes}
                    disliked={userReaction === 'dislike'}
                    onClick={dislikeFilm}
                  >
                    <span className='material-icons'>thumb_down</span>
                    {film.dislikes}
                  </DislikeButton>
                </Detail>
              </Info>
            </FCardContent>
          </FCard>
          <Card hidden={thumbnailLoading}>
            <CardTitle fs='1.25rem' m='0 0 .5em'>
              Episodes
            </CardTitle>
            <CardContent
              flex
              centered={film.episodes.length === 0}
              cg='.75em'
              rg='.75em'
            >
              {film.episodes.length === 0 && 'This film has no episode yet'}
              {film.episodes.map(ep => (
                <Episode
                  as={Link}
                  to={`/films/${slug}/${ep.episodeNumber}`}
                  key={ep.episodeNumber}
                >
                  {ep.episodeNumber}
                </Episode>
              ))}
            </CardContent>
          </Card>
          <AnimatePresence exitBeforeEnter>
            {showAddEpisode && (
              <EpisodeModal
                onBackdropClick={() => setShowAddEpisode(false)}
                onSuccess={() => setNewUpdate(true)}
                onSubmit={data => createEpisode(accessToken, slug, data)}
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
                onSubmit={data => updateFilm(accessToken, slug, data)}
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
  font-weight: 400;
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
  white-space: pre-wrap;
`;

const Episode = styled.div`
  min-width: 30px;
  padding: 0.25em 0.5em;
  display: flex;
  justify-content: center;
  align-item: center;
  border-radius: 5px;
  background-color: var(--colors-primary-dark-2);
  box-shadow: var(--shadow-border);
`;
