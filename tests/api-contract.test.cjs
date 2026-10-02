const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Contrato front ↔ back: cada llamada HTTP que hacen las apps (HttpService:
// this.http.get/post/put/patch/delete) tiene que corresponder a una ruta que
// el backend declara, con el mismo método. Renombrar o borrar una ruta en el
// back sin tocar el front (o al revés) deja una pantalla rota que solo se ve
// al pulsar el botón: aquí se ve al pasar los tests.
//
// Lee el código fuente de los dos repos (sin arrancar nada). El backend se
// busca en ../train-fit-back o en TRAINFIT_BACK_DIR; si no está (CI del front,
// que solo tiene este repo), el test se omite.

const ROOT = path.resolve(__dirname, '..');
const BACK = process.env.TRAINFIT_BACK_DIR || path.resolve(ROOT, '../train-fit-back');
const HAS_BACK = fs.existsSync(path.join(BACK, 'routes/index.js'));
const METHODS = ['get', 'post', 'put', 'patch', 'delete'];

// --- Backend: rutas declaradas -----------------------------------------------------

function readRoutesFile(file) {
  const source = fs.readFileSync(file, 'utf8');
  // `const base = "/payments/clients/:clientId"` y rutas `${base}/summary`.
  const constants = {};
  for (const match of source.matchAll(/const\s+(\w+)\s*=\s*(['"`])([^'"`$]*)\2/g)) constants[match[1]] = match[3];
  const expand = (text) => text.replace(/\$\{(\w+)\}/g, (_, name) => constants[name] ?? `:${name}`);
  const routes = [];
  const pattern = /router\.(get|post|put|patch|delete)(?:Async)?\(\s*(?:(['"`])([^'"`]+)\2|(\w+)\s*,)/g;
  for (const match of source.matchAll(pattern)) {
    const routePath = match[3] !== undefined ? expand(match[3]) : constants[match[4]];
    if (routePath) routes.push({ method: match[1], path: routePath });
  }
  return routes;
}

function backendRoutes() {
  const indexFile = path.join(BACK, 'routes/index.js');
  const index = fs.readFileSync(indexFile, 'utf8');
  const files = {};
  for (const match of index.matchAll(/const\s+(\w+)\s*=\s*require\(\s*["'](\.[^"']+)["']\s*\)/g)) {
    files[match[1]] = require.resolve(path.resolve(path.dirname(indexFile), match[2]));
  }
  const routes = [];
  for (const match of index.matchAll(/router\.use\(\s*(?:["']([^"']*)["']\s*,\s*)?(\w+)\s*\)/g)) {
    const prefix = match[1] || '';
    const file = files[match[2]];
    if (!file) continue;
    for (const route of readRoutesFile(file)) routes.push({ method: route.method, path: `${prefix}${route.path}` });
  }
  // Las que monta app.js fuera de routes/index.js.
  routes.push({ method: 'post', path: '/billing/webhooks/stripe' });
  return routes.map((route) => ({ ...route, segments: split(route.path) }));
}

const split = (p) => p.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);

// --- Front: llamadas HTTP ----------------------------------------------------------

const IGNORED_DIRS = new Set(['node_modules', 'www', 'dist', 'android', 'ios', '.angular']);

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!IGNORED_DIRS.has(entry.name)) walk(path.join(dir, entry.name), acc);
    } else if (/\.ts$/.test(entry.name) && !/\.(spec|test)\.ts$/.test(entry.name)) {
      acc.push(path.join(dir, entry.name));
    }
  }
  return acc;
}

/** Lee el literal (comillas o backticks, con ${...} anidados) que empieza en `start`. */
function readLiteral(source, start) {
  const quote = source[start];
  if (!["'", '"', '`'].includes(quote)) return null;
  let i = start + 1;
  let out = '';
  while (i < source.length) {
    const ch = source[i];
    if (ch === '\\') {
      out += source.slice(i, i + 2);
      i += 2;
      continue;
    }
    if (quote === '`' && ch === '$' && source[i + 1] === '{') {
      let depth = 1;
      let j = i + 2;
      while (j < source.length && depth) {
        if (source[j] === '{') depth += 1;
        else if (source[j] === '}') depth -= 1;
        j += 1;
      }
      out += source.slice(i, j);
      i = j;
      continue;
    }
    if (ch === quote) return out;
    out += ch;
    i += 1;
  }
  return null;
}

function constantsOf(source) {
  const constants = {};
  for (const match of source.matchAll(/\b([A-Za-z_]\w*)\s*(?::\s*string\s*)?=\s*(['"`])([^'"`$]*)\2/g)) {
    constants[match[1]] = match[3];
  }
  return constants;
}

function templateMethodsOf(source) {
  const methods = {};
  const pattern = /\b(\w+)\s*\([^)]*\)\s*:\s*string\s*\{\s*return\s+(['"`])/g;
  for (const match of source.matchAll(pattern)) {
    const literal = readLiteral(source, match.index + match[0].length - 1);
    if (literal !== null) methods[match[1]] = literal;
  }
  return methods;
}

function resolveTemplate(raw, constants, methods, depth = 0) {
  return raw.replace(/\$\{([^{}]*(?:\{[^{}]*\}[^{}]*)*)\}/g, (_, expr) => {
    const resolved = resolveExpression(expr.trim(), constants, methods, depth + 1);
    return resolved.length === 1 ? resolved[0] : ':p';
  });
}

/** Texto del primer argumento de la llamada: hasta la coma o el paréntesis de cierre de nivel 0. */
function readArgument(source, start) {
  let depth = 0;
  let i = start;
  while (i < source.length) {
    const ch = source[i];
    if (["'", '"', '`'].includes(ch)) {
      const literal = readLiteral(source, i);
      if (literal === null) return null;
      i += literal.length + 2;
      continue;
    }
    if ('([{'.includes(ch)) depth += 1;
    if (')]}'.includes(ch)) {
      if (depth === 0) return source.slice(start, i).trim();
      depth -= 1;
    }
    if (ch === ',' && depth === 0) return source.slice(start, i).trim();
    i += 1;
  }
  return null;
}

/**
 * Posibles rutas de una expresión: literal, constante (Clase.NOMBRE,
 * this.nombre), método que devuelve una plantilla (this.base(id)) o un
 * ternario con dos ramas. Lo que no se puede resolver devuelve [].
 */
function resolveExpression(expr, constants, methods, depth = 0) {
  if (depth > 4) return [];
  const text = expr.trim();
  if (["'", '"', '`'].includes(text[0])) {
    const literal = readLiteral(text, 0);
    return literal !== null && literal.length + 2 === text.length ? [resolveTemplate(literal, constants, methods, depth)] : [];
  }
  const ternary = splitTernary(text);
  if (ternary) {
    return [
      ...resolveExpression(ternary[0], constants, methods, depth + 1),
      ...resolveExpression(ternary[1], constants, methods, depth + 1),
    ];
  }
  const method = text.match(/^(?:this\.)?(\w+)\((.*)\)$/s);
  if (method && methods[method[1]] !== undefined) return [resolveTemplate(methods[method[1]], constants, methods, depth + 1)];
  const name = text.match(/^(?:[\w.]+\.)?(\w+)$/);
  if (name && constants[name[1]] !== undefined) return [constants[name[1]]];
  // Getter (`get base(): string { return \`trainer/clients/${id}\`; }`).
  if (name && methods[name[1]] !== undefined) return [resolveTemplate(methods[name[1]], constants, methods, depth + 1)];
  return [];
}

/** `cond ? a : b` de nivel 0 -> [a, b]. */
function splitTernary(text) {
  let depth = 0;
  let question = -1;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (["'", '"', '`'].includes(ch)) {
      const literal = readLiteral(text, i);
      if (literal === null) return null;
      i += literal.length + 1;
      continue;
    }
    if ('([{'.includes(ch)) depth += 1;
    else if (')]}'.includes(ch)) depth -= 1;
    else if (depth === 0 && ch === '?' && text[i + 1] !== '.' && text[i + 1] !== '?' && question < 0) question = i;
    else if (depth === 0 && ch === ':' && question >= 0) return [text.slice(question + 1, i), text.slice(i + 1)];
  }
  return null;
}

function frontendCalls() {
  const calls = [];
  const unresolved = [];
  const files = [...walk(path.join(ROOT, 'packages')), ...walk(path.join(ROOT, 'apps'))];
  for (const file of files) {
    // El propio HttpService reenvía `endpoint` a HttpClient: no es una llamada.
    if (file.endsWith(path.join('services', 'http', 'http.service.ts'))) continue;
    const source = fs.readFileSync(file, 'utf8');
    if (!/\bhttp\w*\s*\.\s*(get|post|put|patch|delete)\b/.test(source)) continue;
    const constants = constantsOf(source);
    const methods = templateMethodsOf(source);
    const pattern = /\b(?:this\.)?http\w*\s*\.\s*(get|post|put|patch|delete)\s*(?:<[^()]*?>)?\(\s*/g;
    for (const match of source.matchAll(pattern)) {
      const where = `${path.relative(ROOT, file)}:${source.slice(0, match.index).split('\n').length}`;
      const argument = readArgument(source, match.index + match[0].length);
      if (argument && /API_URL|https?:\/\/|environment\./.test(argument)) continue; // URL completa: otro servicio
      const options = argument ? resolveExpression(argument, constants, methods) : [];
      if (!options.length) {
        unresolved.push(`${where} (${argument})`);
        continue;
      }
      for (const option of options) {
        const resolved = option.split('?')[0];
        // Base que no se ha podido resolver (`${this.algo}/...`): no se puede
        // comprobar sin inventar, cuenta como no resuelta.
        if (resolved.startsWith(':p')) {
          unresolved.push(`${where} (${argument})`);
          continue;
        }
        calls.push({ method: match[1], path: resolved, segments: split(resolved), where });
      }
    }
  }
  return { calls, unresolved };
}

function matches(call, route) {
  if (call.method !== route.method) return false;
  if (call.segments.length !== route.segments.length) return false;
  return call.segments.every((segment, i) => {
    const expected = route.segments[i];
    if (expected.startsWith(':') || expected === '*') return true;
    if (segment.includes(':p')) return true; // parte dinámica: puede valer lo que diga la ruta
    return segment === expected;
  });
}

// --- Tests -------------------------------------------------------------------------

// Llamadas sin ruta en el backend que hoy solo viven en código muerto (ningún
// componente las invoca). No rompen nada visible, pero conviene borrarlas: al
// quitarlas, quitarlas también de aquí.
const DEAD_CODE_ORPHANS = new Set([]);

// Llamadas sin ruta que SÍ usa una pantalla: fallan con 404 al abrirla. Cada
// entrada es un bug conocido (test `todo`); vacío desde 2026-10.
const BROKEN_ORPHANS = new Map([]);

const keyOf = (call) => `${call.method.toUpperCase()} ${call.path}`;

function orphanCalls() {
  const routes = backendRoutes();
  const { calls } = frontendCalls();
  return { routes, calls, orphan: calls.filter((call) => !routes.some((route) => matches(call, route))) };
}

test('contrato API: cada llamada del front existe en el back con el mismo método', { skip: !HAS_BACK && 'Sin ../train-fit-back' }, () => {
  const { routes, calls, orphan } = orphanCalls();
  assert.ok(routes.length > 300, `solo ${routes.length} rutas leídas del backend`);
  assert.ok(calls.length > 250, `solo ${calls.length} llamadas leídas del front`);
  const unexpected = orphan.filter((call) => !DEAD_CODE_ORPHANS.has(keyOf(call)) && !BROKEN_ORPHANS.has(keyOf(call)));
  assert.deepEqual(
    unexpected.map((call) => `${keyOf(call)}  (${call.where})`),
    [],
    'Llamadas del front sin ruta en el backend (o con otro método).',
  );
});

test('contrato API: las listas de huérfanas conocidas siguen siendo ciertas (si se arregla una, se quita de la lista)', { skip: !HAS_BACK && 'Sin ../train-fit-back' }, () => {
  const { orphan } = orphanCalls();
  const current = new Set(orphan.map(keyOf));
  const stale = [...DEAD_CODE_ORPHANS].filter((key) => !current.has(key));
  assert.deepEqual(stale, []);
});

for (const [key, reason] of BROKEN_ORPHANS) {
  test(`contrato API: ${key} tiene ruta en el backend`, { skip: !HAS_BACK && 'Sin ../train-fit-back', todo: `BUG: ${reason}` }, () => {
    const { orphan } = orphanCalls();
    assert.ok(!orphan.some((call) => keyOf(call) === key));
  });
}

test('contrato API: el escáner entiende casi todas las llamadas (no se escapa nada en silencio)', { skip: !HAS_BACK && 'Sin ../train-fit-back' }, () => {
  const { calls, unresolved } = frontendCalls();
  assert.ok(unresolved.length <= Math.max(10, calls.length * 0.05), `sin resolver: ${unresolved.join(', ')}`);
});
