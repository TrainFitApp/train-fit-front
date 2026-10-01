import { localizeProp } from "../i18n/localized-catalog";
import { Workout } from "./workout";

// Movimiento 6 Coach Pro — qué es este microciclo dentro del plan.
//
// Un bloque de acumulación, uno de intensificación y una descarga se leen y
// se juzgan de forma distinta: un volumen que baja un 40% es una alarma en
// el primero y exactamente lo previsto en la tercera.
export type SplitPurpose =
  | 'regular'
  | 'accumulation'
  | 'intensification'
  | 'peak'
  | 'deload'
  | 'vacation';

export const SPLIT_PURPOSES: { key: SplitPurpose; label: string }[] = [
  { key: 'regular', label: 'Normal' },
  { key: 'accumulation', label: 'Acumulación' },
  { key: 'intensification', label: 'Intensificación' },
  { key: 'peak', label: 'Pico' },
  { key: 'deload', label: 'Descarga' },
  { key: 'vacation', label: 'Vacaciones' },
];
SPLIT_PURPOSES.forEach((purpose) => localizeProp(purpose, 'label', `SPLIT_PURPOSES.${purpose.key}`));

export class Split {
    _id: string;
    name?: string;
    // Qué buscaba el entrenador con este bloque ("subir series de espalda sin
    // tocar pierna"). Es lo que responde, tres meses después, a "¿por qué
    // programé esto?".
    objective?: string;
    // 'regular' por defecto: todos los microciclos que ya existen lo son, y
    // nadie tiene que ir a marcarlos.
    purpose?: SplitPurpose;
    workouts: Workout[];
}