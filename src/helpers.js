const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function getFullname(user) {
  return `${user.firstName} ${user.middleName ? `${user.middleName} ` : ''}${
    user.lastName
  }`;
}

export const getVideoSource = videoId => `${API_BASE_URL}/videos/${videoId}`;
