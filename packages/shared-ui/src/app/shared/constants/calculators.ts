import { FormControl, FormControlName } from '@angular/forms';

export enum CALCULATOR_TYPES {
  rm = 0,
  imc = 1,
}

export type CALCULATOR_TYPE = {
  id: CALCULATOR_TYPES;
  name: string;
  description: string;
  icon: string;
  inputs: string[];
  equation: string;
  measure: string;
};

export const CALCULATORS: {
  [id: number]: CALCULATOR_TYPE;
} = {
  [CALCULATOR_TYPES.rm]: {
    id: CALCULATOR_TYPES.rm,
    name: 'Calculadora RM',
    description:
      'El cálculo se fundamenta en el conteo de repeticiones que se pueden hacer al levantar un peso hasta que se llegue al fallo. Si no se superan las 12 repeticiones, esta estimación es bastante precisa y útil. La formula utilizada es la de Brzycki.',
    icon: 'barbell-outline',
    inputs: ['kg', 'reps'],
    equation: 'kg / (1.0278 -(0.0278 * reps))',
    measure: 'KG',
  },
  [CALCULATOR_TYPES.imc]: {
    id: CALCULATOR_TYPES.imc,
    name: 'Calculadora IMC',
    description:
      'Útil para evaluar la relación entre el peso y la altura de una persona y determinar si su peso está dentro del rango saludable.',
    icon: 'barbell-outline',
    inputs: ['kg', 'cm'],
    equation: 'kg / ((cm / 100) * (cm / 100))',
    measure: 'IMC',
  },
};

export const CALCULATOR_VALUES = Object.values(CALCULATORS);

export function evaluateEquation(
  equation: string,
  params: { [key: string]: number }
): number {
  // Reemplazar las variables en la ecuación con los valores de los parámetros
  const formattedEquation = equation.replace(/\b(\w+)\b/g, (match) => {
    return params[match] !== undefined ? params[match].toString() : match;
  });

  // Evaluar la ecuación de manera segura
  try {
    // Function() con una cadena es, en general, un agujero: aquí no lo es
    // porque las únicas ecuaciones son las dos literales de CALCULATORS, en
    // este mismo fichero, y nada del exterior llega a `equation`. La regla se
    // acota en esta línea y no en la configuración, para que cualquier
    // Function()/eval() NUEVO en el monorepo siga rompiendo el lint.
    //
    // Si algún día la ecuación pasa a venir de fuera (del backend o del
    // usuario), esto hay que sustituirlo por un evaluador acotado.
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    return Function('"use strict";return (' + formattedEquation + ')')();
  } catch (e) {
    console.error('Error evaluating equation:', e);
    return NaN;
  }
}
