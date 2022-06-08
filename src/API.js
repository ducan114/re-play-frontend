const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const refreshToken = () =>
  fetch(`${API_BASE_URL}/token`, {
    credentials: 'include',
  });

const signOut = () =>
  fetch(`${API_BASE_URL}/signout`, {
    credentials: 'include',
  });

const getUserInfo = accessToken =>
  fetch(`${API_BASE_URL}/user`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

const fetchFilms = (mode, searchTerm = '', page = 1) =>
  (mode === 'topview'
    ? fetch(`${API_BASE_URL}/films/topview`)
    : mode === 'toplike'
    ? fetch(`${API_BASE_URL}/films/toplike`)
    : fetch(`${API_BASE_URL}/films?searchTerm=${searchTerm}&page=${page}`)
  ).then(res => res.json());

const createFilm = (accessToken, data) =>
  fetch(`${API_BASE_URL}/films`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  });

const fetchFilm = slug =>
  fetch(`${API_BASE_URL}/films/${slug}`).then(res => {
    if (res.status === 404) throw new Error('Film not found');
    return res.json();
  });

const updateFilm = (accessToken, slug, data) =>
  fetch(`${API_BASE_URL}/films/${slug}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  });

const deleteFilm = (accessToken, slug) =>
  fetch(`${API_BASE_URL}/films/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

const createEpisode = (accessToken, slug, data) =>
  fetch(`${API_BASE_URL}/films/${slug}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  });

const fetchEpisode = (slug, episodeNumber) =>
  fetch(`${API_BASE_URL}/films/${slug}/${episodeNumber}`).then(res => {
    if (res.status === 404) throw new Error('Episode not found');
    return res.json();
  });

const updateEpisode = (accessToken, slug, episodeNumber, data) =>
  fetch(`${API_BASE_URL}/films/${slug}/${episodeNumber}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  });

const deleteEpisode = (accessToken, slug, episodeNumber) =>
  fetch(`${API_BASE_URL}/films/${slug}/${episodeNumber}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

const updateViews = (slug, episodeNumber, userId) =>
  fetch(`${API_BASE_URL}/films/${slug}/${episodeNumber}/views`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId }),
  });

const createFilmReaction = (accessToken, slug, reaction) =>
  fetch(`${API_BASE_URL}/user/reactions/films/${slug}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ reaction }),
  });

const fetchFilmReaction = (accessToken, slug) =>
  fetch(`${API_BASE_URL}/user/reactions/films/${slug}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

const updateFilmReaction = (accessToken, slug, reaction) =>
  fetch(`${API_BASE_URL}/user/reactions/films/${slug}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reaction }),
  });

const deleteFilmReaction = (accessToken, slug) =>
  fetch(`${API_BASE_URL}/user/reactions/films/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

const isAvailableEpisodeNumber = (accessToken, slug, episodeNumber) =>
  fetch(`${API_BASE_URL}/films/${slug}/checkEpisodeNumber`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ episodeNumber }),
  });

const createEpisodeReaction = (accessToken, slug, episodeNumber, reaction) =>
  fetch(`${API_BASE_URL}/user/reactions/films/${slug}/${episodeNumber}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reaction }),
  });

const fetchEpisodeReaction = (accessToken, slug, episodeNumber) =>
  fetch(`${API_BASE_URL}/user/reactions/films/${slug}/${episodeNumber}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

const updateEpisodeReaction = (accessToken, slug, episodeNumber, reaction) =>
  fetch(`${API_BASE_URL}/user/reactions/films/${slug}/${episodeNumber}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reaction }),
  });

const deleteEpisodeReaction = (accessToken, slug, episodeNumber) =>
  fetch(`${API_BASE_URL}/user/reactions/films/${slug}/${episodeNumber}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export const Film = {
  findOne: fetchFilm,
  findMany: fetchFilms,
  create: createFilm,
  update: updateFilm,
  delete: deleteFilm,
};

export const Episode = {
  findOne: fetchEpisode,
  create: createEpisode,
  update: updateEpisode,
  delete: deleteEpisode,
  isAvailableEpisodeNumber,
  updateViews,
};

export const User = {
  signOut,
  getInfo: getUserInfo,
  refreshToken,
};

export const FilmReaction = {
  findOne: fetchFilmReaction,
  create: createFilmReaction,
  update: updateFilmReaction,
  delete: deleteFilmReaction,
};

export const EpisodeReaction = {
  findOne: fetchEpisodeReaction,
  create: createEpisodeReaction,
  update: updateEpisodeReaction,
  delete: deleteEpisodeReaction,
};
