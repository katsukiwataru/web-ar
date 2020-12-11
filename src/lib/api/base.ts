export const apiURL = new URL(`http://localhost:3000/api/v1/`);

export const apiBase = async (url: URL) => {
  const res = await fetch(url.href);
  const data = await res.json();
  return data;
};
