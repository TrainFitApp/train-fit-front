const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

// El id de un vídeo de YouTube se saca de la URL en TRES sitios distintos: la
// ficha del ejercicio (config-exercise, cliente), el reproductor de la sesión
// (video-modal, cliente) y la biblioteca de ejercicios de trainers
// (youtube-embed.ts). El entrenador pega un enlace en una app y el cliente lo
// ve en la otra: los tres tienen que entender exactamente las mismas URLs.

const { loadFromSource } = require(path.join(__dirname, 'support/ng-harness.cjs'));

const shared = loadFromSource(
  __filename,
  path.join(__dirname, '../packages/shared-features/src/app/features'),
  {
    VideoModalComponent: 'src/app/features/tables/components/summary/components/current-workout/video-modal/video-modal.component',
    ConfigExercisePage: 'src/app/features/exercises/components/config-exercise/config-exercise.page',
  },
  {
    requires: {
      '@angular/platform-browser': { DomSanitizer: class {} },
      '@angular/router': { ActivatedRoute: class {}, Router: class {} },
      '@angular/common': {},
    },
  },
);
const trainers = loadFromSource(
  __filename,
  path.join(__dirname, '../apps/train-fit-trainers/src/app/features'),
  { parseYouTubeId: 'src/app/features/exercise-library/utils/youtube-embed' },
  { app: 'train-fit-trainers' },
);

const parsers = {
  'video-modal (cliente)': (url) => shared.VideoModalComponent.prototype.parseYouTubeIdFromUrl.call({}, url),
  'config-exercise (cliente)': (url) => shared.ConfigExercisePage.prototype.parseYouTubeIdFromUrl.call({}, url),
  'biblioteca (trainers)': (url) => trainers.parseYouTubeId(url),
};

const CASES = {
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ': 'dQw4w9WgXcQ',
  'https://youtube.com/watch?v=dQw4w9WgXcQ&t=42s': 'dQw4w9WgXcQ',
  'https://youtu.be/dQw4w9WgXcQ': 'dQw4w9WgXcQ',
  'https://youtu.be/dQw4w9WgXcQ?si=abc': 'dQw4w9WgXcQ',
  'https://www.youtube.com/embed/dQw4w9WgXcQ': 'dQw4w9WgXcQ',
  'https://www.youtube.com/embed/dQw4w9WgXcQ?start=10': 'dQw4w9WgXcQ',
};

for (const [name, parse] of Object.entries(parsers)) {
  test(`YouTube (${name}): entiende watch, youtu.be y embed`, () => {
    for (const [url, id] of Object.entries(CASES)) assert.equal(parse(url), id, url);
  });

  test(`YouTube (${name}): URL vacía o de otra web no da id`, () => {
    for (const url of ['', 'https://vimeo.com/123456', 'no es una url']) assert.equal(parse(url) || '', '', url);
  });
}

test('YouTube: los tres parsers coinciden en TODAS las URLs (incluidas las raras)', () => {
  const urls = [
    ...Object.keys(CASES),
    'https://m.youtube.com/watch?v=dQw4w9WgXcQ',
    'https://www.youtube.com/watch?feature=share&v=dQw4w9WgXcQ',
    'https://www.youtube.com/shorts/dQw4w9WgXcQ',
    'http://youtu.be/dQw4w9WgXcQ#t=1',
  ];
  const disagreements = [];
  for (const url of urls) {
    const results = Object.fromEntries(Object.entries(parsers).map(([name, parse]) => [name, parse(url) || '']));
    if (new Set(Object.values(results)).size > 1) disagreements.push({ url, results });
  }
  assert.deepEqual(disagreements, []);
});

test('YouTube: el id que sale de la URL solo puede ser un id válido (11 caracteres [A-Za-z0-9_-])', () => {
  for (const [name, parse] of Object.entries(parsers)) {
    const id = parse('https://youtube.com/watch?v="><img src=x onerror=alert(1)>');
    assert.ok(id === '' || /^[A-Za-z0-9_-]{11}$/.test(id), `${name}: ${id}`);
  }
});
