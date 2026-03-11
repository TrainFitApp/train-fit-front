const PORT = ':3000';
// Usar IP local para que el dispositivo/simulator iOS pueda conectarse
const API_URL_BASE = 'http://192.168.1.15' + PORT;

export const environment = {
  production: false,
  PORT: PORT,
  API_URL_BASE: API_URL_BASE,
  API_URL_BASE_BACKEND: API_URL_BASE,
  API_URL: API_URL_BASE + '/api',
  lang: 'ES',
};
