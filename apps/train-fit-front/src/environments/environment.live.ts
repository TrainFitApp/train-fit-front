const PORT = ':3000';
// Usar IP local para que el dispositivo/simulator iOS pueda conectarse
const API_URL_BASE = 'http://192.168.1.10' + PORT;

export const environment = {
  production: false,
  PORT: PORT,
  API_URL_BASE: API_URL_BASE,
  API_URL_BASE_BACKEND: API_URL_BASE,
  API_URL: API_URL_BASE + '/api',
  lang: 'ES',
  auth: {
    clientFamily: 'trainfit-front',
    google: {
      webClientId:
        '775987417074-s1e767h7tps05ectmrb85uqh7hhp9p8n.apps.googleusercontent.com',
      iosClientId:
        '775987417074-ibu27rm1ku8uuunaacebmp14ahvuuk4u.apps.googleusercontent.com',
    },
    apple: {
      clientId: 'com.trainfit.trainfit',
    },
  },
};
