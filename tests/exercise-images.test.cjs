const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Las imágenes de ejercicio van dentro de las tres apps
// (packages/shared-core/src/assets/exercises/, ver scripts/exercise-images.cjs):
// nada se carga de la web pública ni de un CDN. El back guarda en
// Exercise.imageUrl "assets/exercises/<clave>.webp" con la misma regla de
// clave (train-fit-back/scripts/migrations/30-app-images.js): los casos
// de abajo son los mismos en los dos repos.

const ROOT = path.resolve(__dirname, '..');
const { exerciseImageKey, OUT } = require('../scripts/exercise-images.cjs');
const APPS = ['train-fit-front', 'train-fit-trainers', 'train-fit-management'];
const PLACEHOLDERS = ['placeholder.png'];
const KEY = /^[a-z0-9]+(-[a-z0-9]+)*$/;
// 242 imágenes ocupaban 6,7 MB al convertirlas (2026-10-12; en GIF, 67 MB).
const BUDGET_BYTES = 8 * 1024 * 1024;

const files = fs.readdirSync(OUT);
const images = files.filter((name) => name.endsWith('.webp'));

test('clave de la imagen: la misma regla que la migración del back', () => {
  assert.equal(exerciseImageKey('1 Press Inclinado maquina.gif'), '1-press-inclinado-maquina');
  assert.equal(exerciseImageKey('132 Curl bíceps barra.gif'), '132-curl-biceps-barra');
  assert.equal(exerciseImageKey('225 Skierg(Esquiador).gif'), '225-skierg-esquiador');
  assert.equal(exerciseImageKey('Peso muerto rumano barra hexagonal.gif'), 'peso-muerto-rumano-barra-hexagonal');
  assert.equal(exerciseImageKey('Extensión de cuádriceps ñ.gif'), 'extension-de-cuadriceps-n');
});

test('imágenes: solo WebP animados con nombre de clave, más la miniatura de reserva', () => {
  assert.ok(images.length >= 242, `${images.length} imágenes`);
  assert.deepEqual(files.filter((name) => !name.endsWith('.webp')).sort(), PLACEHOLDERS);
  for (const name of images) {
    assert.match(name.replace(/\.webp$/, ''), KEY, name);
    const header = Buffer.alloc(64);
    const fd = fs.openSync(path.join(OUT, name), 'r');
    fs.readSync(fd, header, 0, 64, 0);
    fs.closeSync(fd);
    assert.equal(header.toString('ascii', 0, 4), 'RIFF', name);
    assert.equal(header.toString('ascii', 8, 12), 'WEBP', name);
    assert.ok(header.includes('ANIM'), `${name} no es animado`);
  }
});

test('imágenes: caben en el presupuesto de tamaño (van dentro de cada app)', () => {
  const total = images.reduce((sum, name) => sum + fs.statSync(path.join(OUT, name)).size, 0);
  assert.ok(total < BUDGET_BYTES, `${(total / 1024 / 1024).toFixed(1)} MB`);
});

test('las tres apps copian las imágenes a assets/exercises', () => {
  for (const app of APPS) {
    const config = JSON.parse(fs.readFileSync(path.join(ROOT, `apps/${app}/angular.json`), 'utf8'));
    const assets = Object.values(config.projects)[0].architect.build.options.assets;
    assert.ok(
      assets.some((entry) => entry.input === '../../packages/shared-core/src/assets/exercises' && entry.output === 'assets/exercises'),
      app,
    );
  }
});

test('ninguna app carga medios de la web pública (GIFs ni reproductor de YouTube)', () => {
  const offenders = [];
  const skip = new Set(['node_modules', 'www', 'android', 'ios', 'dist', '.angular']);
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (skip.has(entry.name)) continue;
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (/\.(ts|html|scss|json)$/.test(entry.name)) {
        const text = fs.readFileSync(full, 'utf8');
        if (/trainfit\.net\/resources|youtube-embed\.html|www\.trainfit\.net/.test(text)) offenders.push(path.relative(ROOT, full));
      }
    }
  };
  walk(path.join(ROOT, 'packages'));
  for (const app of APPS) walk(path.join(ROOT, `apps/${app}/src`));
  assert.deepEqual(offenders, []);
});
