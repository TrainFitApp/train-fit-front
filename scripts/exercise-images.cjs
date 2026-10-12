#!/usr/bin/env node
// Imágenes de ejercicio de las apps: convierte los GIF del catálogo a WebP
// animado y los deja en packages/shared-core/src/assets/exercises/, que las
// tres apps copian a assets/exercises/ (ver su angular.json). Van dentro de la
// app: no dependen de la web pública ni de ningún CDN.
//
// Uso:
//   SHARP_PATH=<carpeta de sharp ≥ 0.34> node scripts/exercise-images.cjs <carpeta con los GIF>
//
// Hace falta sharp ≥ 0.34 para volver a montar la animación con menos frames
// (`join`). El del workspace es el 0.32 que trae @capacitor/assets; uno que
// sirve es el de train-fit-web (devDependency):
//   SHARP_PATH=../train-fit-web/node_modules/sharp node scripts/exercise-images.cjs <carpeta>
//
// Compresión (2026-10-12: 242 GIF de 128 px pasaron de 68 MB a unos 7 MB):
// - 128 px, como el original (se pintan a 48-72 px);
// - con más de 12 frames se queda uno de cada dos y se suma su duración, así
//   que el movimiento dura lo mismo;
// - WebP con pérdida, calidad 50, esfuerzo 6.
//
// El nombre de cada fichero es la clave del ejercicio: el del GIF sin
// extensión, sin tildes, en minúsculas y con guiones. La misma regla está en
// train-fit-back/scripts/migrations/30-app-images.js, que deja en cada
// ejercicio `imageUrl: "assets/exercises/<clave>.webp"`.
//
// Los GIF originales del catálogo vivían en train-fit-web
// (public/resources/img/exercises/, borrados el 2026-10-12): siguen en su
// historial de git si hay que volver a convertirlos.

const fs = require('node:fs');
const path = require('node:path');

const OUT = path.join(__dirname, '../packages/shared-core/src/assets/exercises');
const MAX_FRAMES = 12;
const WEBP = { quality: 50, effort: 6, loop: 0 };

function exerciseImageKey(fileName) {
  return fileName
    .replace(/\.[^.]+$/, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function convert(sharp, file) {
  const meta = await sharp(file, { animated: true }).metadata();
  const { width, pageHeight: height, pages } = meta;
  const delays = meta.delay || [];
  const opaque = (await sharp(file, { animated: true }).stats()).isOpaque;
  const channels = opaque ? 3 : 4;
  const decoded = sharp(file, { animated: true });
  const strip = await (opaque ? decoded.removeAlpha() : decoded.ensureAlpha()).raw().toBuffer();
  const frameBytes = width * height * channels;
  const step = pages > MAX_FRAMES ? 2 : 1;

  const frames = [];
  const delay = [];
  for (let first = 0; first < pages; first += step) {
    const raw = strip.subarray(first * frameBytes, (first + 1) * frameBytes);
    frames.push(await sharp(raw, { raw: { width, height, channels } }).png().toBuffer());
    let duration = 0;
    for (let i = first; i < Math.min(first + step, pages); i += 1) duration += delays[i] || 100;
    delay.push(duration);
  }
  return sharp(frames, { join: { animated: true } }).webp({ ...WEBP, delay }).toBuffer();
}

async function main() {
  const source = process.argv[2];
  if (!source) {
    console.error('Uso: SHARP_PATH=<sharp ≥ 0.34> node scripts/exercise-images.cjs <carpeta con los GIF>');
    process.exit(1);
  }
  const sharpDir = process.env.SHARP_PATH
    ? path.resolve(process.env.SHARP_PATH)
    : path.dirname(require.resolve('sharp/package.json'));
  const sharp = require(sharpDir);
  const sharpVersion = require(path.join(sharpDir, 'package.json')).version;
  const [major, minor] = sharpVersion.split('.').map(Number);
  if (major === 0 && minor < 34) {
    console.error(`Hace falta sharp ≥ 0.34 y este es ${sharpVersion}: pásalo con SHARP_PATH.`);
    process.exit(1);
  }

  fs.mkdirSync(OUT, { recursive: true });
  const gifs = fs.readdirSync(source).filter((name) => name.toLowerCase().endsWith('.gif')).sort();
  const keys = new Map();
  let before = 0;
  let after = 0;
  for (const name of gifs) {
    const key = exerciseImageKey(name);
    if (keys.has(key)) throw new Error(`«${name}» y «${keys.get(key)}» dan la misma clave: ${key}`);
    keys.set(key, name);
    const webp = await convert(sharp, path.join(source, name));
    fs.writeFileSync(path.join(OUT, `${key}.webp`), webp);
    before += fs.statSync(path.join(source, name)).size;
    after += webp.length;
  }
  const mb = (bytes) => (bytes / 1024 / 1024).toFixed(1);
  console.log(`${gifs.length} imágenes: ${mb(before)} MB en GIF, ${mb(after)} MB en WebP (${OUT})`);
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

module.exports = { exerciseImageKey, OUT };
