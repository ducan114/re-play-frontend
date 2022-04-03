export function getFullname(user) {
  return `${user.firstName} ${user.middleName ? `${user.middleName} ` : ''}${
    user.lastName
  }`;
}
