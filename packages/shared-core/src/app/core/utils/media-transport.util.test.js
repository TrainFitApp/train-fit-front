const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// media-transport.util.ts: envío de fotos y vídeos directo a R2 y Bunny.
//
// Bug de 2026-10-14 (primera prueba en un Android real): las apps nativas
// tienen CapacitorHttp activo, que saca todo XMLHttpRequest a una URL
// absoluta por el HTTP nativo. Su puente solo convierte cuerpos File,
// FormData, Uint8Array…; un Blob a secas (canvas.toBlob, File.slice) lo manda
// como JSON `{}`. R2 lo rechazaba y la subida fallaba al instante, sin que
// llegara nada al bucket.
//
// En vez de imitar el puente de memoria, el test extrae y ejecuta su
// `convertBody` real (node_modules/@capacitor/{android,ios}) y lo conecta a un
// almacenamiento simulado que, como R2 y Bunny, solo acepta el archivo entero.

let transport;

test.before(async () => {
  transport = await import('./media-transport.util.ts');
});

function repoRoot(from) {
  let dir = path.resolve(from);
  while (!fs.existsSync(path.join(dir, 'apps')) || !fs.existsSync(path.join(dir, 'packages'))) dir = path.dirname(dir);
  return dir;
}

const BRIDGES = [
  ['Android', 'node_modules/@capacitor/android/capacitor/src/main/assets/native-bridge.js'],
  ['iOS', 'node_modules/@capacitor/ios/Capacitor/Capacitor/assets/native-bridge.js'],
].map(([name, relative]) => [name, path.join(repoRoot(__dirname), relative)]);

/** `convertBody` tal cual está en el puente: qué tipo de cuerpo manda al nativo. */
function loadConvertBody(file) {
  const source = fs.readFileSync(file, 'utf8');
  const start = source.indexOf('const convertBody = async');
  const end = source.indexOf('const CAPACITOR_HTTP_INTERCEPTOR');
  assert.ok(
    start > -1 && end > start,
    'No se encontró convertBody en el puente de Capacitor: revisa cómo trata ahora los cuerpos de XHR antes de actualizar Capacitor.'
  );
  const sandbox = {
    ReadableStream,
    Uint8Array,
    URLSearchParams,
    FormData,
    File,
    TextDecoder,
    JSON,
    readFileAsBase64: async (blob) => Buffer.from(await blob.arrayBuffer()).toString('base64'),
    convertFormData: async () => [],
  };
  return vm.runInNewContext(`${source.slice(start, end)}\nconvertBody`, sandbox);
}

const realXhr = globalThis.XMLHttpRequest;
const realFetch = globalThis.fetch;
test.afterEach(() => {
  globalThis.XMLHttpRequest = realXhr;
  globalThis.fetch = realFetch;
});

/**
 * XMLHttpRequest como lo deja CapacitorHttp: el cuerpo pasa por `convertBody`
 * y lo que sale se lo come `serve` (el almacenamiento). No hay eventos de
 * progreso de subida y `getResponseHeader` distingue mayúsculas, como en el
 * puente.
 */
function installNativeXhr(convertBody, serve) {
  class NativeXhr {
    constructor() {
      this.requestHeaders = {};
      this.upload = {};
      this.status = 0;
    }
    open(method, url) {
      this.method = method;
      this.url = url;
    }
    setRequestHeader(name, value) {
      this.requestHeaders[name] = value;
    }
    getResponseHeader(name) {
      return this.responseHeaders?.[name];
    }
    send(body) {
      convertBody(body).then(({ data, type, headers }) => {
        const response = serve({ method: this.method, url: this.url, dataType: type, data, headers: { ...headers, ...this.requestHeaders } });
        this.status = response.status;
        this.responseHeaders = response.headers;
        this.onload?.();
      }, () => this.onerror?.());
    }
  }
  globalThis.XMLHttpRequest = NativeXhr;
}

const photoBytes = crypto.randomBytes(5000);
const photoBlob = () => new Blob([photoBytes], { type: 'image/jpeg' });
const signedPut = { method: 'PUT', url: 'https://trainfit-media.example.r2.cloudflarestorage.com/photo.jpg?X-Amz-Signature=xxxx', headers: { 'Content-Type': 'image/jpeg' } };

/** R2: la URL firmada fija tipo y longitud; un cuerpo distinto da 403. */
function objectStorage(expected, contentType) {
  const stored = [];
  return {
    stored,
    serve(request) {
      if (request.method !== 'PUT') return { status: 405 };
      if (request.dataType !== 'file') return { status: 403 };
      if (request.headers['Content-Type'] !== contentType) return { status: 403 };
      const bytes = Buffer.from(request.data, 'base64');
      if (Buffer.compare(bytes, expected) !== 0) return { status: 403 };
      stored.push(bytes);
      return { status: 200 };
    },
  };
}

test('asUploadBody', async (t) => {
  await t.test('un Blob pasa a File con el mismo contenido y el tipo pedido', async () => {
    const body = transport.asUploadBody(photoBlob(), 'image/jpeg');
    assert.ok(body instanceof File);
    assert.equal(body.type, 'image/jpeg');
    assert.equal(body.size, photoBytes.length);
    assert.equal(Buffer.compare(Buffer.from(await body.arrayBuffer()), photoBytes), 0);
  });

  await t.test('un trozo sin tipo (File.slice) toma el que se le da', () => {
    const chunk = new File([photoBytes], 'v.mp4', { type: 'video/mp4' }).slice(0, 100);
    assert.equal(chunk.type, '');
    const body = transport.asUploadBody(chunk, 'application/offset+octet-stream');
    assert.ok(body instanceof File);
    assert.equal(body.type, 'application/offset+octet-stream');
    assert.equal(body.size, 100);
  });

  await t.test('un File que ya tiene ese tipo se devuelve tal cual', () => {
    const file = new File([photoBytes], 'v.mp4', { type: 'video/mp4' });
    assert.equal(transport.asUploadBody(file, 'video/mp4'), file);
    assert.equal(transport.asUploadBody(file, 'Video/MP4'), file, 'el tipo no distingue mayúsculas');
  });

  await t.test('sin tipo explícito usa el del propio Blob', () => {
    assert.equal(transport.asUploadBody(photoBlob()).type, 'image/jpeg');
  });
});

for (const [name, bridgeFile] of BRIDGES) {
  test(`${name}: el puente de Capacitor entiende lo que se envía`, { skip: !fs.existsSync(bridgeFile) && 'Capacitor no está instalado' }, async (t) => {
    const convertBody = loadConvertBody(bridgeFile);

    await t.test('foto: PUT firmado con el JPEG entero (regresión: el Blob llegaba como JSON y R2 daba 403)', async () => {
      const storage = objectStorage(photoBytes, 'image/jpeg');
      installNativeXhr(convertBody, storage.serve);
      await transport.putWithProgress(signedPut, photoBlob());
      assert.equal(storage.stored.length, 1, 'R2 recibió el archivo');
    });

    await t.test('miniatura y portada de vídeo (Blob de canvas.toBlob) también llegan enteras', async () => {
      const thumb = crypto.randomBytes(900);
      const storage = objectStorage(thumb, 'image/jpeg');
      installNativeXhr(convertBody, storage.serve);
      await transport.putWithProgress(signedPut, new Blob([thumb], { type: 'image/jpeg' }));
      assert.equal(storage.stored.length, 1);
    });

    await t.test('el Content-Type firmado manda sobre el tipo del Blob', async () => {
      const video = crypto.randomBytes(2000);
      const storage = objectStorage(video, 'video/mp4');
      installNativeXhr(convertBody, storage.serve);
      const target = { ...signedPut, headers: { 'Content-Type': 'video/mp4' } };
      await transport.putWithProgress(target, new Blob([video])); // Blob sin tipo
      assert.equal(storage.stored.length, 1);
    });

    await t.test('sin eventos de progreso del puente, al terminar avisa con el total', async () => {
      installNativeXhr(convertBody, objectStorage(photoBytes, 'image/jpeg').serve);
      const seen = [];
      await transport.putWithProgress(signedPut, photoBlob(), (loaded) => seen.push(loaded));
      assert.deepEqual(seen, [photoBytes.length]);
    });

    await t.test('un 403 del almacenamiento rechaza con MEDIA_UPLOAD_FAILED', async () => {
      installNativeXhr(convertBody, () => ({ status: 403 }));
      await assert.rejects(transport.putWithProgress(signedPut, photoBlob()), { code: 'MEDIA_UPLOAD_FAILED' });
    });

    await t.test('TUS: cada trozo llega entero y en orden, y el progreso sube trozo a trozo', async () => {
      const video = crypto.randomBytes(transport.TUS_CHUNK_BYTES * 2 + 1234);
      const server = { offset: 0, chunks: [], types: [] };
      const patches = [];
      installNativeXhr(convertBody, (request) => {
        patches.push(request.method);
        if (request.method !== 'PATCH' || request.dataType !== 'file') return { status: 400 };
        if (Number(request.headers['Upload-Offset']) !== server.offset) return { status: 409 };
        server.types.push(request.headers['Content-Type']);
        const bytes = Buffer.from(request.data, 'base64');
        server.chunks.push(bytes);
        server.offset += bytes.length;
        return { status: 204 };
      });
      const created = [];
      globalThis.fetch = async (url, init) => {
        created.push({ url, ...init });
        return new Response(null, { status: 201, headers: { Location: '/tusupload/abc123' } });
      };
      const target = {
        method: 'TUS',
        url: 'https://video.example.net/tusupload',
        headers: { AuthorizationSignature: 'xxxx', VideoId: 'v1', LibraryId: '1' },
        metadata: { filetype: 'video/mp4' },
      };
      const file = new File([video], 'clip.mp4', { type: 'video/mp4' });
      const seen = [];
      await transport.tusUpload(target, file, (loaded) => seen.push(loaded));

      assert.equal(created.length, 1, 'una sola creación');
      assert.equal(created[0].headers['Upload-Length'], String(video.length));
      assert.equal(server.chunks.length, 3);
      assert.deepEqual(server.types, Array(3).fill('application/offset+octet-stream'));
      assert.equal(Buffer.compare(Buffer.concat(server.chunks), video), 0, 'Bunny reconstruye el vídeo idéntico');
      assert.deepEqual(seen, [transport.TUS_CHUNK_BYTES, transport.TUS_CHUNK_BYTES * 2, video.length]);
    });
  });
}

test('en el navegador (sin puente) el progreso real se reenvía y el cuerpo sigue siendo un File', async () => {
  let sent;
  class BrowserXhr {
    constructor() {
      this.upload = {};
      this.status = 0;
    }
    open() {}
    setRequestHeader() {}
    send(body) {
      sent = body;
      this.upload.onprogress({ loaded: 1000 });
      this.upload.onprogress({ loaded: 3000 });
      this.status = 200;
      this.onload();
    }
  }
  globalThis.XMLHttpRequest = BrowserXhr;
  const seen = [];
  await transport.putWithProgress(signedPut, photoBlob(), (loaded) => seen.push(loaded));
  assert.ok(sent instanceof File);
  assert.equal(sent.size, photoBytes.length);
  assert.deepEqual(seen, [1000, 3000, photoBytes.length]);
});

test('un error de red rechaza con MEDIA_UPLOAD_FAILED y una cancelación con MEDIA_UPLOAD_ABORTED', async () => {
  class FailingXhr {
    constructor() {
      this.upload = {};
    }
    open() {}
    setRequestHeader() {}
    send() {
      this.onerror();
    }
  }
  globalThis.XMLHttpRequest = FailingXhr;
  await assert.rejects(transport.putWithProgress(signedPut, photoBlob()), { code: 'MEDIA_UPLOAD_FAILED' });

  class AbortedXhr extends FailingXhr {
    send() {
      this.onabort();
    }
  }
  globalThis.XMLHttpRequest = AbortedXhr;
  await assert.rejects(transport.putWithProgress(signedPut, photoBlob()), { code: 'MEDIA_UPLOAD_ABORTED' });
});

test('TUS: si Bunny no devuelve Location, la subida falla sin enviar ningún trozo', async () => {
  let patched = false;
  globalThis.XMLHttpRequest = class {
    constructor() {
      this.upload = {};
    }
    open() {
      patched = true;
    }
  };
  globalThis.fetch = async () => new Response(null, { status: 201 });
  const target = { method: 'TUS', url: 'https://video.example.net/tusupload', headers: {} };
  await assert.rejects(transport.tusUpload(target, new Blob([photoBytes]), () => undefined), { code: 'MEDIA_UPLOAD_FAILED' });
  assert.equal(patched, false);
});
