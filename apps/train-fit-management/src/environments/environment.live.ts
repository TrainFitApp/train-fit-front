import pkg from '../../package.json';

const PORT = ':3000';
// Usar IP local para que el dispositivo/simulator iOS pueda conectarse
// IP del Mac (ver ifconfig en1) — coincide con el --public-host de
// npm run live:i:m / live:a:m. Si el router la reasigna, actualizar aqui
// tambien. Revertido una vez ya por un guardado desde el editor con buffer
// viejo (mismo problema que en train-fit-back/app.js) — si vuelve a
// aparecer 192.168.1.13, es eso, no un fallo de esta edicion.
const API_URL_BASE = 'http://192.168.1.19' + PORT;

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
  revenueCat: {
    enabled: true,
    androidApiKey: 'goog_pvSUJOuehaZgKpwrUOLIaHJfBev',
    iosApiKey: 'appl_dELMaNRdIcHVKUJYHKdSLbAQRdl',
    entitlementId: 'no_adds_and_features',
  },
};
