const PORT = '';
const API_URL_BASE = 'https://server.trainfit.net' + PORT;

export const environment = {
  production: true,
  PORT: PORT,
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
