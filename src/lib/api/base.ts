export const apiURL = new URL(`http://localhost:3000/api/v1/`);

export const apiBase = async () => {
  const userURL = new URL('users', apiURL.href);
  // apiURL.searchParams.append('key', 'aw28ooYtJzukZdVTpXXfxbEN3');
  const res = await fetch(userURL.href);
  const data = await res.json();
  return data;
};
