import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import {
  fetchFilm,
  createFilmReaction,
  fetchFilmReaction,
  updateFilmReaction,
  deleteFilmReaction
} from '../API';
import toast from 'react-hot-toast';

export default function useFilmFetch() {
  const params = useParams();
  const { user, accessToken } = useContext(UserContext);
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
      setFilm(await fetchFilm(slug));
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
    (userReaction
      ? userReaction === reaction
        ? deleteFilmReaction(accessToken, slug)
        : updateFilmReaction(accessToken, slug, reaction)
      : createFilmReaction(accessToken, slug, reaction)
    ).then(data => {
      setUserReaction(data.reaction);
      setNewUpdate(true);
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
    fetchFilmReaction(accessToken, slug).then(data =>
      setUserReaction(data.reaction)
    );
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
