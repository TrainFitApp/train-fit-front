import { CapacitorConfig } from '@capacitor/cli';

// CapacitorHttp saca las peticiones por NSURLSession nativo en vez de por el
// WebView. En producción es lo que queremos (evita CORS y gestiona las cookies
// de forma nativa), pero rompe el livereload en iOS físico: NSURLSession corre
// dentro del proceso de la app, que está sujeto al permiso de Red Local, y
// contra una IP de LAN (192.168.x.x) iOS lo bloquea devolviendo
// NSURLErrorDomain -1009 "The Internet connection appears to be offline", sin
// llegar a mostrar el diálogo de permiso. El WebView no tiene esa restricción
// porque su red va por un proceso aparte (com.apple.WebKit.Networking) — por
// eso la web carga y solo mueren las llamadas a la API.
//
// En producción no aplica: ahí se habla con app.trainfit.net por HTTPS, no con
// la LAN. Así que solo lo desactivamos en modo live (lo activan los scripts
// live:i / live:a).
const isLiveReload = process.env.CAP_LIVE === 'true';

const config: CapacitorConfig = {
  appId: 'com.trainfit.trainers',
  appName: 'TrainFit Trainers',
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
      enabled: !isLiveReload,
    },
    EdgeToEdge: {
      backgroundColor: '#000000',
    },
  },
};

export default config;
