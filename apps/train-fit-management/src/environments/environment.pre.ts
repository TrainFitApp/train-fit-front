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
  lang: 'ES',
  auth: {
    clientFamily: 'train-fit-management',
    google: {
      webClientId:
        '775987417074-s1e767h7tps05ectmrb85uqh7hhp9p8n.apps.googleusercontent.com',
      iosClientId: '',
    },
    apple: {
      clientId: '',
    },
  },
};
