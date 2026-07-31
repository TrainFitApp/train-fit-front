import pkg from '../../package.json';

const API_URL_BASE = 'https://train-fit-back-977t.onrender.com';

export const environment = {
  production: false,
  environmentName: 'pre',
  APP_VERSION: pkg.version,
  APP_STORE_URL: '',
  GOOGLE_PLAY_URL: '',
  API_URL_BASE,
  API_URL_BASE_BACKEND: API_URL_BASE,
  API_URL: `${API_URL_BASE}/api`,
  lang: 'ES',
  auth: {
    clientFamily: 'trainfit-trainers',
    google: { webClientId: '', iosClientId: '' },
    apple: { clientId: 'com.trainfit.trainers' },
  },
  revenueCat: {
    enabled: false,
    androidApiKey: '',
    iosApiKey: '',
    entitlementId: 'trainer_pro',
  },
};
