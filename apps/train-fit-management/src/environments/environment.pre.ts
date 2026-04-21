import pkg from '../../package.json';

const PORT = '';
const API_URL_BASE =
  'https://train-fit-back.onrender.com' + PORT;

export const environment = {
  production: false,
  environmentName: 'pre',
  APP_VERSION: pkg.version,
  APP_STORE_URL: 'https://apps.apple.com/es/app/trainfit/id6471257280',
  GOOGLE_PLAY_URL:
    'https://play.google.com/store/apps/details?id=com.trainfit.trainfit',
  PORT: PORT,
  API_URL_BASE: API_URL_BASE,
  API_URL_BASE_BACKEND: API_URL_BASE,
  API_URL: API_URL_BASE + '/api',
  lang: 'ES'
};
