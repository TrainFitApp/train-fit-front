import { localizeProp } from '../i18n/localized-catalog';

// Movimiento 3 Coach Pro — registro de dolor.
//
// Espejo EXACTO de train-fit-back/components/painLog/pain-catalog.js
// (backend) — sincronizados a mano y comprobado por pain-catalog.test.js,
// igual que el catálogo de check-in y el de agujetas.
//
// POR QUÉ ES UN COMPONENTE APARTE Y NO UN CAMPO DE CHECK-IN
// Un check-in es semanal y una molestia va por días: "esta semana me dolió
// la rodilla" no dice si fue un día o siete, ni si va a más o a menos. Y
// sobre todo, el dolor es lo único de la app que puede obligar a cambiar el
// entrenamiento HOY.

export interface PainBand {
  from: number;
  to: number;
  label: string;
}

export interface PainEntry {
  _id?: string;
  date: string;
  zone: string;
  level: number;
  note?: string;
}

export interface PainThreshold {
  _id?: string;
  zone: string;
  // Hasta aquí se entrena con normalidad.
  workLevel: number;
  // Desde aquí se para. Nunca menor que workLevel.
  painLevel: number;
  note?: string;
}

// Lista CERRADA con lateralidad ya incluida, mismo criterio que el catálogo
// de agujetas: una serie temporal necesita que el eje no cambie, y "rodilla"
// sin lado no sirve para seguir una lesión.
export const PAIN_ZONES: string[] = [
  'Cuello',
  'Espalda alta',
  'Espalda baja',
  'Hombro izq.',
  'Hombro der.',
  'Codo izq.',
  'Codo der.',
  'Muñeca izq.',
  'Muñeca der.',
  'Cadera izq.',
  'Cadera der.',
  'Rodilla izq.',
  'Rodilla der.',
  'Tobillo izq.',
  'Tobillo der.',
];

// EVA 0-10, la escala que se usa en consulta. Las frases van por TRAMOS y no
// una por número: nadie distingue de verdad un 6 de un 7, y prometer esa
// precisión haría que el cliente se lo pensara demasiado y acabara
// contestando cualquier cosa. Lo que sí importa es el salto entre tramos,
// que es donde cambia lo que el entrenador tiene que hacer.
export const PAIN_BANDS: PainBand[] = [
  { from: 0, to: 0, label: 'Sin dolor' },
  { from: 1, to: 2, label: 'Molestia leve, apenas la noto' },
  { from: 3, to: 4, label: 'Dolor leve: me distrae, pero hago vida normal' },
  { from: 5, to: 6, label: 'Dolor moderado: me limita algunos movimientos' },
  { from: 7, to: 8, label: 'Dolor fuerte: no puedo entrenar esa zona' },
  { from: 9, to: 10, label: 'Dolor insoportable: tengo que parar del todo' },
];

// Las zonas son datos guardados (se traducen al pintar con translateDb);
// las frases de los tramos solo se muestran.
PAIN_BANDS.forEach((band, index) => localizeProp(band, 'label', `PAIN.BANDS.${index}`));

export const PAIN_MIN = 0;
export const PAIN_MAX = 10;

// A partir de aquí el dolor deja de ser una molestia y pasa a condicionar el
// entrenamiento.
export const PAIN_LIMITING_LEVEL = 5;

export const PAIN_LEVELS: number[] = Array.from(
  { length: PAIN_MAX - PAIN_MIN + 1 },
  (_unused, index) => PAIN_MIN + index
);

export function painBandFor(level: number): PainBand | null {
  return PAIN_BANDS.find((band) => level >= band.from && level <= band.to) || null;
}

export function painLabelFor(level: number): string {
  return painBandFor(level)?.label || '';
}

// El dolor MÁS ALTO de cada zona en el periodo, con su última fecha. Es lo
// que un entrenador mira primero: no le sirve la media (una rodilla que un
// día llega a 8 es un problema aunque el resto de la semana esté a 1).
export function worstByZone(
  entries: PainEntry[]
): { zone: string; level: number; lastDate: string }[] {
  const worst = new Map<string, { zone: string; level: number; lastDate: string }>();

  for (const entry of entries || []) {
    const current = worst.get(entry.zone);
    if (!current || entry.level > current.level) {
      worst.set(entry.zone, { zone: entry.zone, level: entry.level, lastDate: entry.date });
    } else if (entry.date > current.lastDate) {
      current.lastDate = entry.date;
    }
  }

  // De más dolor a menos: el orden del catálogo aquí no ayuda, lo urgente es
  // lo que más duele.
  return [...worst.values()].sort((a, b) => b.level - a.level);
}
