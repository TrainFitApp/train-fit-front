import pkg from '../../package.json';

const PORT = '';
const API_URL_BASE = 'https://server.trainfit.net' + PORT;

export const environment = {
  production: true,
  APP_VERSION: pkg.version,
  APP_STORE_URL: 'https://apps.apple.com/es/app/trainfit-trainers/id0000000000',
  GOOGLE_PLAY_URL:
    'https://play.google.com/store/apps/details?id=com.trainfit.trainers',
  API_URL_BASE: API_URL_BASE,
  API_URL_BASE_BACKEND: API_URL_BASE,
  API_URL: API_URL_BASE + '/api',
  lang: 'ES',
  auth: {
    clientFamily: 'trainfit-trainers',
    google: {
      webClientId:
        '775987417074-s1e767h7tps05ectmrb85uqh7hhp9p8n.apps.googleusercontent.com',
      iosClientId: '',
    },
    apple: {
      clientId: '',
    },
  },
  revenueCat: {
    enabled: false,
    androidApiKey: '',
    iosApiKey: '',
    entitlementId: '',
  },
};
