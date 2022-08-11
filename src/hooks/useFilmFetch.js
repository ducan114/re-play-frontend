import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAPIContext } from '../contexts/APIContext';
import toast from 'react-hot-toast';

export default function useFilmFetch() {
  const params = useParams();
  const {
    user,
    API: { Film, FilmReaction, FilmSubscription }
  } = useAPIContext();
  const [film, setFilm] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [newUpdate, setNewUpdate] = useState(false);
  const [thumbnailLoading, setThumbnailLoading] = useState(true);
  const [slug, setSlug] = useState(params.slug);
  const [userReaction, setUserReaction] = useState(undefined);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();
  const isInitialRender = useRef(true);

  const getFilm = async () => {
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

  const subscribe = () =>
    user
      ? FilmSubscription.create(slug).then(data => {
          setIsSubscribed(data.subscribed);
        })
      : toast.error(`Please sign in to subscribe to this film`, {
          id: 'Require sign in'
        });

  const unsubscribe = () =>
    user
      ? FilmSubscription.delete(slug).then(data => {
          setIsSubscribed(data.subscribed);
        })
      : toast.error(`Please sign in to subscribe to this film`, {
          id: 'Require sign in'
        });

  useEffect(getFilm, [slug]);

  useEffect(() => {
    if (!newUpdate) return;
    setNewUpdate(false);
    getFilm();
  }, [newUpdate]);

  useEffect(() => {
    if (isInitialRender.current) return (isInitialRender.current = false);
    navigate(`/films/${slug}`);
  }, [slug]);

  useEffect(() => {
    if (!user) {
      setUserReaction(undefined);
      setIsSubscribed(false);
      return;
    }
    FilmReaction.findOne(slug)
      .then(data => setUserReaction(data.reaction))
      .catch(console.error);
    FilmSubscription.findOne(slug)
      .then(data => setIsSubscribed(data.subscribed))
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
    dislikeFilm,
    isSubscribed,
    subscribe,
    unsubscribe
  };
}
