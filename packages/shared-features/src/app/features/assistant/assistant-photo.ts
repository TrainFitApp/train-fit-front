import { AssistantImage } from './models/assistant.model';

// Foto del plato para el asistente: se reduce en el móvil antes de mandarla
// (lado mayor de 1.024 px, JPEG al 80 %), así pesa ~150 KB, cabe con holgura
// en el tope del back (1,5 MB) y cuesta menos tokens. Necesita el DOM
// (canvas): no tiene test unitario; lo cubre el de integración del back.

const MAX_SIDE = 1024;
const QUALITY = 0.8;

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('photo'));
    };
    image.src = url;
  });
}

/** La foto lista para el back (`image`) y una miniatura para la burbuja (`preview`). */
export async function shrinkPhoto(file: File): Promise<{ image: AssistantImage; preview: string }> {
  const source = await loadImage(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(source.naturalWidth, source.naturalHeight));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(source.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(source.naturalHeight * scale));
  const context = canvas.getContext('2d');
  if (!context) throw new Error('photo');
  context.drawImage(source, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/jpeg', QUALITY);
  return { image: { mediaType: 'image/jpeg', data: dataUrl.slice(dataUrl.indexOf(',') + 1) }, preview: dataUrl };
}
