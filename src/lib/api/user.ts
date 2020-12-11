import { apiURL } from './base';

export const getUser = async (screenName: string) => {
  const userURL = new URL('users', apiURL.href);
  userURL.searchParams.append('screenName', screenName);
  // apiURL.searchParams.append('key', 'aw28ooYtJzukZdVTpXXfxbEN3');
  const res = await fetch(userURL.href);
  const data = await res.json();
  console.log(res, data);
  const iconURL = data.profile_image_url_https;
  return iconURL;
};

export const getUserFavorites = () => {
};
