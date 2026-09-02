export const APP_SHELL_CONFIG = {
  managementEntryEnabled: false,
  // App de entrenadores, sin anuncios (herramienta de trabajo por
  // suscripción) — ver AdMobService, que no llega a llamar a
  // AdMob.initialize() cuando esto es false. Evita también el warning nativo
  // "Google Mobile Ads SDK was initialized without an application ID" (no
  // hay GADApplicationIdentifier en el Info.plist de esta app, a propósito)
  // y el prompt de tracking (ATT) de iOS, que no pinta nada aquí.
  adsEnabled: false,
};
