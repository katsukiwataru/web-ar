// const API_BASEURL = 'https://192.168.11.101:3001/api/v1';
const origin =
  process.env.MODE === 'development' ? 'https://172.20.0.38:3001' : 'https://secure-ridge-14179.herokuapp.com/api/v1/';

const API_BASEURL = `${origin}/api/v1`;

export const apiBase = async (path: string, query?: string) => {
  const res = await fetch(`${API_BASEURL}/${path}?${query}`);
  const data = await res.json();
  return data;
};
