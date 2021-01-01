import { apiBase } from './base';

export const fetchUser = async (screenName: string) => {
  const query = screenName ? `screenName=${screenName}` : '';
  if (!query) return;
  const res: TwitterUser = await apiBase('users', query);
  return res;
};

export const fetchUserFavorites = async (screenName: string) => {
  const query = screenName ? `screenName=${screenName}` : '';
  if (!query) return;
  const res: TwitterUserFavorite[] = await apiBase('favorites', query);
  return res;
};
