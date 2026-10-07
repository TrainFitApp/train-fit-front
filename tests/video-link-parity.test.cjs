const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Enlaces de la biblioteca de vídeos de técnica: el editor de trainers
// reconoce la plataforma mientras se escribe (core/utils/video-link.util.ts)
// y el back decide al guardar (techniqueVideos/technique-video-service.js,
// parseLink). Si no entienden las mismas URLs, el editor da por bueno un
// enlace que luego el back rechaza (o al revés) y la vista previa enseña un
// vídeo distinto del que verá el cliente.
//
// Lee el back del repo hermano (o TRAINFIT_BACK_DIR); sin él, se omite.

const { loadFromSource } = require(path.join(__dirname, 'support/ng-harness.cjs'));

const ROOT = path.resolve(__dirname, '..');
const BACK = process.env.TRAINFIT_BACK_DIR || path.resolve(ROOT, '../train-fit-back');
const SERVICE = path.join(BACK, 'components/techniqueVideos/technique-video-service.js');

function loadBack() {
  if (!fs.existsSync(SERVICE)) return null;
  try {
    return require(SERVICE);
  } catch {
    return null; // sin node_modules en el back (CI del front)
  }
}

const back = loadBack();
const { parseVideoLink } = loadFromSource(__filename, path.join(ROOT, 'packages/shared-core/src/app/core'), {
  parseVideoLink: 'src/app/core/utils/video-link.util',
});

const URLS = [
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  'https://youtube.com/watch?feature=share&v=dQw4w9WgXcQ',
  'https://m.youtube.com/watch?v=dQw4w9WgXcQ&t=42s',
  'https://youtu.be/dQw4w9WgXcQ?si=abc',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://www.youtube.com/shorts/dQw4w9WgXcQ',
  'https://www.youtube.com/live/dQw4w9WgXcQ',
  '   https://youtu.be/dQw4w9WgXcQ   ',
  'https://vimeo.com/123456789',
  'https://vimeo.com/video/123456789',
  'https://player.vimeo.com/video/123456789?h=abc',
  'https://vimeo.com/12345',
  'https://www.youtube.com/watch?v=short',
  'https://www.instagram.com/p/abc/',
  'https://www.tiktok.com/@coach/video/7234567890123456789',
  'no es un enlace',
  '',
  '   ',
  `https://youtu.be/dQw4w9WgXcQ?x=${'a'.repeat(500)}`,
];

test('enlaces de vídeo: YouTube (watch, youtu.be, embed, shorts, live) y Vimeo, con su id', () => {
  assert.deepEqual(parseVideoLink('https://youtu.be/dQw4w9WgXcQ?si=abc'), { source: 'youtube', youtubeId: 'dQw4w9WgXcQ', vimeoId: null });
  assert.deepEqual(parseVideoLink('https://www.youtube.com/shorts/dQw4w9WgXcQ'), { source: 'youtube', youtubeId: 'dQw4w9WgXcQ', vimeoId: null });
  assert.deepEqual(parseVideoLink('https://player.vimeo.com/video/123456789'), { source: 'vimeo', youtubeId: null, vimeoId: '123456789' });
});

test('enlaces de vídeo: otras webs, texto suelto, vacío o demasiado largo no son un enlace', () => {
  for (const url of ['https://www.instagram.com/p/abc/', 'no es un enlace', '', '   ', null, undefined, `https://youtu.be/dQw4w9WgXcQ?x=${'a'.repeat(500)}`]) {
    assert.equal(parseVideoLink(url), null, String(url).slice(0, 40));
  }
});

test('enlaces de vídeo: el editor de trainers y el back entienden exactamente las mismas URLs', { skip: !back && 'sin el back' }, () => {
  const disagreements = [];
  for (const url of URLS) {
    const front = parseVideoLink(url);
    const saved = back.parseLink(url);
    const expected = saved
      ? {
          source: saved.source,
          youtubeId: saved.source === 'youtube' ? back.parseYouTubeId(saved.externalUrl) : null,
          vimeoId: saved.source === 'vimeo' ? back.parseVimeoId(saved.externalUrl) : null,
        }
      : null;
    if (JSON.stringify(front) !== JSON.stringify(expected)) disagreements.push({ url: url.slice(0, 60), front, back: expected });
  }
  assert.deepEqual(disagreements, []);
});
