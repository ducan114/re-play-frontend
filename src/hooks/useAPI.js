import { useState } from 'react';
import {
  User,
  Film,
  Episode,
  FilmReaction,
  EpisodeReaction,
  Genre
} from '../API';

export default function useAPI() {
  const [accessToken, setAccessToken] = useState(null);

  const refreshTokenIfNeeded = async (callback, ...params) => {
    let resp = await callback(accessToken, ...params);
    if (resp.status === 401) {
      const tokenResp = await User.refreshToken();
      const newAccessToken = await tokenResp.json();
      if (tokenResp.status === 200) {
        setAccessToken(newAccessToken);
        resp = await callback(newAccessToken, ...params);
      }
    }
    const data = await resp.json();
    if (resp.status >= 400) throw new Error(data.message);
    return data;
  };

  const getUserInfo = () => refreshTokenIfNeeded(User.getInfo);
  const createFilm = data => refreshTokenIfNeeded(Film.create, data);
  const updateFilm = (slug, data) =>
    refreshTokenIfNeeded(Film.update, slug, data);
  const deleteFilm = slug => refreshTokenIfNeeded(Film.delete, slug);
  const createEpisode = (slug, data) =>
    refreshTokenIfNeeded(Episode.create, slug, data);
  const updateEpisode = (slug, episodeNumber, data) =>
    refreshTokenIfNeeded(Episode.update, slug, episodeNumber, data);
  const deleteEpisode = (slug, episodeNumber) =>
    refreshTokenIfNeeded(Episode.delete, slug, episodeNumber);
  const createFilmReaction = (slug, reaction) =>
    refreshTokenIfNeeded(FilmReaction.create, slug, reaction);
  const fetchFilmReaction = slug =>
    refreshTokenIfNeeded(FilmReaction.findOne, slug);
  const updateFilmReaction = (slug, reaction) =>
    refreshTokenIfNeeded(FilmReaction.update, slug, reaction);
  const deleteFilmReaction = slug =>
    refreshTokenIfNeeded(FilmReaction.delete, slug);
  const isAvailableEpisodeNumber = (slug, episodeNumber) =>
    refreshTokenIfNeeded(Episode.isAvailableEpisodeNumber, slug, episodeNumber);
  const createEpisodeReaction = (slug, episodeNumber, reaction) =>
    refreshTokenIfNeeded(EpisodeReaction.create, slug, episodeNumber, reaction);
  const fetchEpisodeReaction = (slug, episodeNumber) =>
    refreshTokenIfNeeded(EpisodeReaction.findOne, slug, episodeNumber);
  const updateEpisodeReaction = (slug, episodeNumber, reaction) =>
    refreshTokenIfNeeded(EpisodeReaction.update, slug, episodeNumber, reaction);
  const deleteEpisodeReaction = (slug, episodeNumber) =>
    refreshTokenIfNeeded(EpisodeReaction.delete, slug, episodeNumber);
  const createGenre = (name, description) =>
    refreshTokenIfNeeded(Genre.create, name, description);
  const updateGenre = (name, newName, newDescription) =>
    refreshTokenIfNeeded(Genre.update, name, newName, newDescription);
  const deleteGenre = name => refreshTokenIfNeeded(Genre.delete, name);

  return {
    User: {
      getInfo: getUserInfo,
      refreshToken: User.refreshToken,
      signOut: User.signOut
    },
    Film: {
      findOne: Film.findOne,
      findMany: Film.findMany,
      create: createFilm,
      update: updateFilm,
      delete: deleteFilm
    },
    Episode: {
      findOne: Episode.findOne,
      create: createEpisode,
      update: updateEpisode,
      delete: deleteEpisode,
      isAvailableEpisodeNumber,
      updateViews: Episode.updateViews
    },
    FilmReaction: {
      findOne: fetchFilmReaction,
      create: createFilmReaction,
      update: updateFilmReaction,
      delete: deleteFilmReaction
    },
    EpisodeReaction: {
      findOne: fetchEpisodeReaction,
      create: createEpisodeReaction,
      update: updateEpisodeReaction,
      delete: deleteEpisodeReaction
    },
    Genre: {
      findOne: Genre.findOne,
      findMany: Genre.findMany,
      create: createGenre,
      update: updateGenre,
      delete: deleteGenre
    }
  };
}
