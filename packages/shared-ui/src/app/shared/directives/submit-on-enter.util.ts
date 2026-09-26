const TEXT_INPUT_TYPES = new Set(['text', 'email', 'password', 'number', 'tel', 'url']);
const IGNORED_CONTROLS = 'textarea, ion-textarea, [contenteditable]:not([contenteditable="false"]), [role="combobox"], [data-enter-submit-ignore]';
export type EnterSubmitButton = HTMLElement & { disabled?: boolean };

/** Enter solo confirma el formulario explícito al que pertenece el campo. */
export function submitOnEnter(
  event: KeyboardEvent,
  scope: HTMLElement,
  button: EnterSubmitButton | null | undefined
): void {
  if (!button || event.key !== 'Enter' || event.defaultPrevented || event.isComposing ||
      event.keyCode === 229 || event.repeat || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
    return;
  }

  // composedPath incluye el input nativo de ion-input y atraviesa su Shadow DOM.
  const elements = event.composedPath().filter((item): item is HTMLElement =>
    !!item && typeof item === 'object' && 'tagName' in item
  );
  const input = elements[0] as HTMLInputElement | undefined;
  if (!input || input.tagName !== 'INPUT' || !TEXT_INPUT_TYPES.has(input.type) ||
      input.readOnly || input.disabled || elements.some((element) => element.matches(IGNORED_CONTROLS))) {
    return;
  }
  const nearestScope = elements.find((element) => element.hasAttribute('data-enter-submit-scope'));
  if (nearestScope !== scope) return;

  // Consumir también cuando está deshabilitado evita el submit implícito del navegador.
  event.preventDefault();
  event.stopPropagation();
  if (button.disabled || button.getAttribute('aria-disabled') === 'true' || !button.isConnected) return;
  button.click();
}
