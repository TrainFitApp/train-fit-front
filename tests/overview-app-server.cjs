// Sirve las apps compiladas con transporte local hacia el backend temporal real.
// No simula respuestas de producto. Las peticiones API sólo pueden usar el proxy local.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');
const root = path.resolve(__dirname, '..');
const buildRoot = path.join(root, '.tmp/overview-integrated-build');
const backend = JSON.parse(fs.readFileSync(path.resolve(root, '../train-fit-back/.tmp/overview-browser-session.json'), 'utf8'));
if (backend.status !== 'ready' || new URL(backend.url).hostname !== '127.0.0.1' || !/^trainfit_overview_browser_\d+_\d+$/.test(backend.database)) throw new Error('Se necesita un backend temporal local listo');
const requests = [];
const servers = [];
const output = path.join(root, '.tmp/overview-integrated-ui.json');
fs.mkdirSync(path.dirname(output), { recursive: true });
const types = { '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.json':'application/json', '.svg':'image/svg+xml', '.png':'image/png', '.woff2':'font/woff2' };
const preApiUrl = 'https://train-fit-back-977t.onrender.com';
// Fallar antes de abrir puertos si el último build no corresponde a pre.
for (const app of ['train-fit-trainers', 'train-fit-front']) {
  const directory = path.join(buildRoot, app);
  const scripts = fs.readdirSync(directory).filter(file => file.endsWith('.js'));
  if (!scripts.some(file => fs.readFileSync(path.join(directory, file), 'utf8').includes(preApiUrl))) {
    throw new Error(`Compila ${app} con la configuración pre en ${directory} antes de iniciar las pruebas locales`);
  }
}
async function serve(app) {
  const directory = path.join(buildRoot, app);
  const server = http.createServer((req, res) => {
    // También bloquea APIs externas si otro proceso sustituye www durante la sesión.
    res.setHeader('Content-Security-Policy', "connect-src 'self'; form-action 'self'");
    if (req.url.startsWith('/api/')) {
      const headers = { ...req.headers }; delete headers.host;
      const proxy = http.request(new URL(req.url, backend.url), { method: req.method, headers }, response => {
        requests.push({ app, method: req.method, path: req.url, status: response.statusCode });
        res.writeHead(response.statusCode, response.headers); response.pipe(res);
      });
      proxy.on('error', error => { res.writeHead(502); res.end(JSON.stringify({ message: error.message })); });
      req.pipe(proxy); return;
    }
    const pathname = decodeURIComponent(new URL(req.url, 'http://127.0.0.1').pathname);
    let file = path.resolve(directory, '.' + pathname);
    if (!file.startsWith(directory + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) file = path.join(directory, 'index.html');
    if (!fs.existsSync(file)) { res.writeHead(503, { 'Content-Type': 'text/plain' }); res.end('Compilación en curso'); return; }
    const extension = path.extname(file);
    let contents = fs.readFileSync(file);
    // Solo configuración del entorno servido, nunca altera el bundle en disco.
    if (extension === '.js') contents = contents.toString().replaceAll(preApiUrl, 'http://' + req.headers.host);
    res.setHeader('Content-Type', types[extension] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-store'); res.end(contents);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  servers.push(server); return 'http://127.0.0.1:' + server.address().port;
}
(async () => {
  const manifest = { trainerUrl: await serve('train-fit-trainers'), clientUrl: await serve('train-fit-front'), backendPid: backend.pid, status: 'ready' };
  fs.writeFileSync(output, JSON.stringify(manifest, null, 2));
  console.log(JSON.stringify(manifest));
  const input = readline.createInterface({ input: process.stdin });
  async function close() {
    input.close(); process.stdin.pause();
    await Promise.all(servers.map(server => new Promise(resolve => { server.close(resolve); server.closeAllConnections?.(); })));
    fs.writeFileSync(output, JSON.stringify({ ...manifest, status: 'closed', requests }, null, 2));
  }
  input.on('line', line => { if (line.trim() === 'shutdown') void close(); });
  process.once('SIGINT', close); process.once('SIGTERM', close);
})();
