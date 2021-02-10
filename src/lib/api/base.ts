const DEV_ORIGIN = 'https://192.168.11.101:3001';

const PRO_ORIGIN = 'https://secure-ridge-14179.herokuapp.com';

const REQ_ORIGIN = process.env.MODE === 'development' ? DEV_ORIGIN : PRO_ORIGIN;

const API_BASEURL = `${REQ_ORIGIN}/api/v1`;

export const apiBase = async (path: string, query?: string) => {
  const res = await fetch(`${API_BASEURL}/${path}?${query}`);
  const data = await res.json();
  return data;
};
