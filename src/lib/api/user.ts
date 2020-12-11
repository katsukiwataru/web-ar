// import { apiBase } from './base';

export const getUser = async () => {
  const res = await fetch('/api');
  console.log(res);
  return res;
};
// const userURL = new URL('users', '/api');
// userURL.searchParams.append('screenName', screenName);
// const data = await apiBase(userURL);

// export const getUserFavorites = async (screenName: string) => {
//   const userURL = new URL('favorites', apiURL.href);
//   userURL.searchParams.append('screenName', screenName);
//   const data = await apiBase(userURL);
//   return data;
// };
