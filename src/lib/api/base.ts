const API_BASEURL = 'https://192.168.11.18:3001/api/v1';

export const apiBase = async (path: string, query?: string) => {
  const res = await fetch(`${API_BASEURL}/${path}?${query}`);
  const data = await res.json();
  return data;
};
