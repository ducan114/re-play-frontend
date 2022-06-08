const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function getFullname(user) {
  return `${user.firstName} ${user.middleName ? `${user.middleName} ` : ''}${
    user.lastName
  }`;
}

export const getVideoSource = videoId => `${API_BASE_URL}/videos/${videoId}`;

export const toViewsString = views => {
  if (views >= 1e9) return `${parseViews(views / 1e9)} B`;
  if (views >= 1e6) return `${parseViews(views / 1e6)} M`;
  if (views >= 1e3) return `${parseViews(views / 1e3)} K`;
  return views;
};

const parseViews = views => {
  views = views.toString();
  const dotId = views.indexOf('.');
  if (dotId === -1) return views;
  views = views.slice(0, dotId + 1 + 1);
  return Number(views);
};
