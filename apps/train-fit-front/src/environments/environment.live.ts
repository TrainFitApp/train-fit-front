import pkg from '../../package.json';

const PORT = '';
const API_URL_BASE = 'https://train-fit-back-production.up.railway.app' + PORT;

export const environment = {
  production: true,
  APP_VERSION: pkg.version,
  APP_STORE_URL: 'https://apps.apple.com/es/app/trainfit/id6471257280',
  GOOGLE_PLAY_URL:
    'https://play.google.com/store/apps/details?id=com.trainfit.trainfit',
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
  revenueCat: {
    enabled: true,
    androidApiKey: 'goog_pvSUJOuehaZgKpwrUOLIaHJfBev',
    iosApiKey: 'appl_dELMaNRdIcHVKUJYHKdSLbAQRdl',
    entitlementId: 'no_adds_and_features',
  },
};
