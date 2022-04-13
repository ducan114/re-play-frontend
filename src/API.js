const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchFilms = (searchTerm = '', page = 1) =>
  fetch(`${API_BASE_URL}/films?searchTerm=${searchTerm}&page=${page}`).then(
    res => res.json()
  );

export const authenticate = accessToken =>
  fetch(`${API_BASE_URL}/signin`, {
    method: 'POST',
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    credentials: 'include'
  }).then(res => res.json());

export const createFilm = (accessToken, data) =>
  fetch(`${API_BASE_URL}/films`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: data
  }).then(res => res.json());

export const fetchFilm = slug =>
  fetch(`${API_BASE_URL}/films/${slug}`).then(res => {
    if (res.status === 404) throw new Error('Film not found');
    return res.json();
  });

export const updateFilm = (accessToken, slug, data) =>
  fetch(`${API_BASE_URL}/films/${slug}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: data
  }).then(res => res.json());

export const deleteFilm = (accessToken, slug) =>
  fetch(`${API_BASE_URL}/films/${slug}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then(res => res.json());

export const createEpisode = (accessToken, slug, data) =>
  fetch(`${API_BASE_URL}/films/${slug}`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: data
  }).then(res => res.json());

export const fetchEpisode = (slug, episodeNumber) =>
  fetch(`${API_BASE_URL}/films/${slug}/${episodeNumber}`).then(res => {
    if (res.status === 404) throw new Error('Episode not found');
    return res.json();
  });

export const updateEpisode = (accessToken, slug, episodeNumber, data) =>
  fetch(`${API_BASE_URL}/films/${slug}/${episodeNumber}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    body: data
  }).then(res => res.json());

export const deleteEpisode = (accessToken, slug, episodeNumber) =>
  fetch(`${API_BASE_URL}/films/${slug}/${episodeNumber}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  }).then(res => res.json());

export const createFilmReaction = (accessToken, slug, reaction) =>
  fetch(`${API_BASE_URL}/user/reactions/films/${slug}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    credentials: 'include',
    body: JSON.stringify({ reaction })
  }).then(res => res.json());

export const fetchFilmReaction = (accessToken, slug) =>
  fetch(`${API_BASE_URL}/user/reactions/films/${slug}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    credentials: 'include'
  }).then(res => res.json());

export const updateFilmReaction = (accessToken, slug, reaction) =>
  fetch(`${API_BASE_URL}/user/reactions/films/${slug}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ reaction })
  }).then(res => res.json());

export const deleteFilmReaction = (accessToken, slug) =>
  fetch(`${API_BASE_URL}/user/reactions/films/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    credentials: 'include'
  }).then(res => res.json());

export const checkEpisodeNumber = (accessToken, slug, episodeNumber) =>
  fetch(`${API_BASE_URL}/films/${slug}/checkEpisodeNumber`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ episodeNumber })
  }).then(res => {
    if (res.status === 400) throw new Error('Invalid episode number');
    return res.json();
  });

export const createEpisodeReaction = (
  accessToken,
  slug,
  episodeNumber,
  reaction
) =>
  fetch(`${API_BASE_URL}/user/reactions/films/${slug}/${episodeNumber}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ reaction })
  }).then(res => res.json());

export const fetchEpisodeReaction = (accessToken, slug, episodeNumber) =>
  fetch(`${API_BASE_URL}/user/reactions/films/${slug}/${episodeNumber}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    credentials: 'include'
  }).then(res => res.json());

export const updateEpisodeReaction = (
  accessToken,
  slug,
  episodeNumber,
  reaction
) =>
  fetch(`${API_BASE_URL}/user/reactions/films/${slug}/${episodeNumber}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ reaction, a: 1 })
  }).then(res => res.json());

export const deleteEpisodeReaction = (accessToken, slug, episodeNumber) =>
  fetch(`${API_BASE_URL}/user/reactions/films/${slug}/${episodeNumber}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    credentials: 'include'
  }).then(res => res.json());
