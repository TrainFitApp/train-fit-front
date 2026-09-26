import type { AlertOptions } from '@ionic/angular';

/** Solo formularios de texto con una acción inequívoca, nunca menús/confirmaciones. */
export function alertEnterSubmitIndex(options: Pick<AlertOptions, 'inputs' | 'buttons'>): number {
  const inputs = options.inputs || [];
  const textTypes = new Set(['text', 'email', 'password', 'number', 'tel', 'url']);
  if (!inputs.length || inputs.some((input) => !textTypes.has(input.type || 'text'))) return -1;
  const buttons = options.buttons || [];
  const actions = buttons.map((button, index) => ({ button, index }))
    .filter(({ button }) => typeof button === 'string' || button.role !== 'cancel');
  if (actions.length !== 1) return -1;
  const action = actions[0];
  return typeof action.button !== 'string' && typeof action.button.handler === 'function'
    ? action.index
    : -1;
}
