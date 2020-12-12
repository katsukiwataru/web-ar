const API_BASEURL = 'https://172.20.0.85:8000/api/v1';

export const apiBase = async (path: string, query?: string) => {
  const res = await fetch(`${API_BASEURL}/${path}?${query}`);
  const data = await res.json();
  return data;
};
