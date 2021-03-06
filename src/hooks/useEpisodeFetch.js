import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAPIContext } from '../contexts/APIContext';
import toast from 'react-hot-toast';

export default function useEpisodeFetch() {
  const params = useParams();
  const {
    user,
    API: { Episode, EpisodeReaction, Film }
  } = useAPIContext();
  const [episodeNumber, setEpisodeNumber] = useState(params.episodeNumber);
  const [episode, setEpisode] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [newUpdate, setNewUpdate] = useState(false);
  const [userReaction, setUserReaction] = useState(undefined);
  const [episodes, setEpisodes] = useState([]);
  const navigate = useNavigate();
  const isInitialRender = useRef(true);

  const getEpisode = async () => {
    try {
      setEpisode(await Episode.findOne(params.slug, episodeNumber));
      setEpisodes((await Film.findOne(params.slug)).episodes);
    } catch (err) {
      if (err.message === 'Episode not found') {
        setEpisode(undefined);
        return toast.error(err.message);
      }
      setEpisode(null);
      toast.error('Failed to load episode\nPlease check your connections');
    } finally {
      setLoading(false);
    }
  };

  const reactToEpisode = reaction =>
    user
      ? (userReaction
          ? userReaction === reaction
            ? EpisodeReaction.delete(params.slug, episodeNumber)
            : EpisodeReaction.update(params.slug, episodeNumber, reaction)
          : EpisodeReaction.create(params.slug, episodeNumber, reaction)
        ).then(data => {
          setUserReaction(data.reaction);
          setNewUpdate(true);
        })
      : toast.error(`Please sign in to ${reaction} episode`, {
          id: 'Require sign in'
        });

  const likeEpisode = () => reactToEpisode('like');
  const dislikeEpisode = () => reactToEpisode('dislike');

  useEffect(getEpisode, [episodeNumber]);

  useEffect(() => {
    if (!newUpdate) return;
    setNewUpdate(false);
    getEpisode();
  }, [newUpdate]);

  useEffect(() => {
    if (isInitialRender.current) return (isInitialRender.current = false);
    navigate(`/films/${params.slug}/${episodeNumber}`);
  }, [episodeNumber]);

  useEffect(() => {
    if (!user) return setUserReaction(undefined);
    EpisodeReaction.findOne(params.slug, episodeNumber)
      .then(data => setUserReaction(data.reaction))
      .catch(console.error);
  }, [user]);

  useEffect(() => {
    setEpisodeNumber(params.episodeNumber);
  }, [params.episodeNumber]);

  return {
    episode,
    episodes,
    loading,
    setNewUpdate,
    slug: params.slug,
    episodeNumber,
    setEpisodeNumber,
    userReaction,
    likeEpisode,
    dislikeEpisode
  };
}
