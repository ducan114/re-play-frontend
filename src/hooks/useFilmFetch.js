import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAPIContext } from '../contexts/APIContext';
import toast from 'react-hot-toast';

export default function useFilmFetch() {
  const params = useParams();
  const {
    user,
    API: { Film, FilmReaction }
  } = useAPIContext();
  const [film, setFilm] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [newUpdate, setNewUpdate] = useState(false);
  const [thumbnailLoading, setThumbnailLoading] = useState(true);
  const [slug, setSlug] = useState(params.slug);
  const [userReaction, setUserReaction] = useState(undefined);
  const navigate = useNavigate();

  const getFilm = async () => {
    setLoading(true);
    try {
      const film = await Film.findOne(slug);
      setFilm(film);
    } catch (err) {
      if (err.message === 'Film not found') {
        setFilm(undefined);
        return toast.error(err.message);
      }
      setFilm(null);
      toast.error('Failed to load film\nPlease check your connections');
    } finally {
      setLoading(false);
    }
  };

  const reactToFilm = reaction =>
    user
      ? (userReaction
          ? userReaction === reaction
            ? FilmReaction.delete(slug)
            : FilmReaction.update(slug, reaction)
          : FilmReaction.create(slug, reaction)
        ).then(data => {
          setUserReaction(data.reaction);
          setNewUpdate(true);
        })
      : toast.error(`Please sign in to ${reaction} film`, {
          id: 'Require sign in'
        });

  const likeFilm = () => reactToFilm('like');

  const dislikeFilm = () => reactToFilm('dislike');

  useEffect(getFilm, [slug]);

  useEffect(() => {
    if (newUpdate) getFilm().finally(() => setNewUpdate(false));
  }, [newUpdate]);

  useEffect(() => navigate(`/films/${slug}`), [slug]);

  useEffect(() => {
    if (!user) return setUserReaction(undefined);
    FilmReaction.findOne(slug)
      .then(data => setUserReaction(data.reaction))
      .catch(console.error);
  }, [user]);

  return {
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
  };
}
