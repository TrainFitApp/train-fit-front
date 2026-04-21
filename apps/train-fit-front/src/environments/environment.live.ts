import pkg from '../../package.json';

const PORT = '';
// Usar IP local para que el dispositivo/simulator iOS pueda conectarse
const API_URL_BASE = 'https://train-fit-back-production.up.railway.app' + PORT;

export const environment = {
  production: false,
  APP_VERSION: pkg.version,
  APP_STORE_URL: 'https://apps.apple.com/es/app/trainfit/id6471257280',
  GOOGLE_PLAY_URL:
    'https://play.google.com/store/apps/details?id=com.trainfit.trainfit',
  API_URL_BASE: API_URL_BASE,
  API_URL_BASE_BACKEND: API_URL_BASE,
  API_URL: API_URL_BASE + '/api',
  lang: 'ES',
  revenueCat: {
    enabled: true,
    androidApiKey: 'goog_pvSUJOuehaZgKpwrUOLIaHJfBev',
    iosApiKey: 'appl_dELMaNRdIcHVKUJYHKdSLbAQRdl',
    entitlementId: 'no_adds_and_features',
  },
};
