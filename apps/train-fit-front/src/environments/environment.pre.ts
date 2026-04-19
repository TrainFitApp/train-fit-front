const PORT = '';
const API_URL_BASE =
  'https://train-fit-back.onrender.com' + PORT;

export const environment = {
  production: false,
  environmentName: 'pre',
  PORT: PORT,
  API_URL_BASE: API_URL_BASE,
  API_URL_BASE_BACKEND: API_URL_BASE,
  API_URL: API_URL_BASE + '/api',
  lang: 'ES'
};
