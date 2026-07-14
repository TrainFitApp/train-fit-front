import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.trainfit.trainfit',
  appName: 'TrainFit',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    cleartext: true,
  },
  plugins: {
    StatusBar: {
      overlaysWebView: false,
    },
    Keyboard: {
      resize: 'native' as any,
      resizeOnFullScreen: false,
    },
    CapacitorCookies: {
      enabled: true,
    },
    CapacitorHttp: {
      enabled: true,
    },
    EdgeToEdge: {
      backgroundColor: '#000000',
    },
    LocalNotifications: {
      smallIcon: 'ic_notification',
      iconColor: '#FE9000',
    },
  },
};

export default config;
