const API_BASE_URL = localStorage.getItem('API_BASE_URL') || 'https://localhost:3000';

window.console.log(`API_BASE_URL: ${API_BASE_URL}`);

export const apiURL = new URL(`${API_BASE_URL}/api/v1/`);

export const apiBase = async (url: URL) => {
  const res = await fetch(url.href, {
    method: 'GET',
    mode: 'no-cors',
  });
  const data = await res.json();
  return data;
};
