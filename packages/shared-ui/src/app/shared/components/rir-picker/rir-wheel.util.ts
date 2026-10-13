import {
  buildRirValue,
  getRirNumberOptions,
  RIR_EMPTY_LABEL,
  RIR_FAIL_VALUE,
  RirValue,
  rirFailLabel,
} from 'src/app/core/models/rir';
import { WheelOption } from '../wheel/wheel.util';

export interface RirWheelOption extends WheelOption {
  // null = sin dato; -1 = fallo (RIR_FAIL_VALUE); 0–10 = el número.
  value: number | null;
}

// Las dos ruedas del selector (valor y, opcional, el otro extremo de un
// rango) llevan las mismas filas: «-», FALLO y de 0 a 10.
export function getRirWheelOptions(): RirWheelOption[] {
  return [
    { label: RIR_EMPTY_LABEL, value: null, tone: 'muted' },
    { label: rirFailLabel(), value: RIR_FAIL_VALUE, tone: 'accent' },
    ...getRirNumberOptions().map((value) => ({ label: String(value), value })),
  ];
}

// Fila de la rueda para un valor de RIR; el hueco («-») si no está.
export function rirWheelIndex(options: RirWheelOption[], value: number | null): number {
  return Math.max(
    0,
    options.findIndex((option) => option.value === value)
  );
}

// Lo que guardaría el selector con estas dos filas elegidas. La regla (fallo
// gana al rango, mismo extremo dos veces es uno) es la de buildRirValue.
export function rirFromWheel(
  options: RirWheelOption[],
  firstIndex: number,
  secondIndex: number
): RirValue {
  return buildRirValue(options[firstIndex]?.value ?? null, options[secondIndex]?.value ?? null);
}
