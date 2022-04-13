import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserContext from '../contexts/userContext';
import toast from 'react-hot-toast';
import {
  fetchEpisode,
  fetchEpisodeReaction,
  createEpisodeReaction,
  updateEpisodeReaction,
  deleteEpisodeReaction
} from '../API';

export default function useEpisodeFetch() {
  const params = useParams();
  const { user, accessToken } = useContext(UserContext);
  const [episodeNumber, setEpisodeNumber] = useState(params.episodeNumber);
  const [episode, setEpisode] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [newUpdate, setNewUpdate] = useState(false);
  const [userReaction, setUserReaction] = useState(undefined);
  const navigate = useNavigate();

  const getEpisode = async () => {
    setLoading(true);
    try {
      setEpisode(await fetchEpisode(params.slug, episodeNumber));
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
    (userReaction
      ? userReaction === reaction
        ? deleteEpisodeReaction(accessToken, params.slug, episodeNumber)
        : updateEpisodeReaction(
            accessToken,
            params.slug,
            episodeNumber,
            reaction
          )
      : createEpisodeReaction(accessToken, params.slug, episodeNumber, reaction)
    ).then(data => {
      setUserReaction(data.reaction);
      setNewUpdate(true);
    });

  const likeEpisode = () => reactToEpisode('like');
  const dislikeEpisode = () => reactToEpisode('dislike');

  useEffect(getEpisode, [episodeNumber]);

  useEffect(() => {
    if (newUpdate) getEpisode().finally(() => setNewUpdate(false));
  }, [newUpdate]);

  useEffect(
    () => navigate(`/films/${params.slug}/${episodeNumber}`),
    [episodeNumber]
  );

  useEffect(() => {
    if (!user) return setUserReaction(undefined);
    fetchEpisodeReaction(accessToken, params.slug, episodeNumber).then(data =>
      setUserReaction(data.reaction)
    );
  }, [user]);

  return {
    loading,
    episode,
    setNewUpdate,
    slug: params.slug,
    accessToken,
    episodeNumber,
    setEpisodeNumber,
    userReaction,
    likeEpisode,
    dislikeEpisode
  };
}
