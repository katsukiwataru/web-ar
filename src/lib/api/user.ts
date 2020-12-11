import { apiBase, apiURL } from './base';

export const getUser = async (screenName: string) => {
  const userURL = new URL('users', apiURL.href);
  userURL.searchParams.append('screenName', screenName);
  const data = await apiBase(userURL);
  return data;
};

export const getUserFavorites = async (screenName: string) => {
  const userURL = new URL('favorites', apiURL.href);
  userURL.searchParams.append('screenName', screenName);
  const data = await apiBase(userURL);
  return data;
};
