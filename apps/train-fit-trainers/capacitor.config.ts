import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.trainfit.trainers',
  appName: 'TrainFit Trainers',
  webDir: 'www',
  server: {
    androidScheme: 'https',
    cleartext: true,
  },
  plugins: {
    StatusBar: { overlaysWebView: false },
    Keyboard: { resize: 'native' as any, resizeOnFullScreen: false },
    CapacitorCookies: { enabled: true },
    CapacitorHttp: { enabled: true },
    EdgeToEdge: { backgroundColor: '#101112' },
  },
};

export default config;
