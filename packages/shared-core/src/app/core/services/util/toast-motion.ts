import { Animation, createAnimation } from '@ionic/angular';

interface ToastPosition {
  position?: 'top' | 'middle' | 'bottom';
  top?: string;
  bottom?: string;
}

const reducedMotion = (): boolean =>
  typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

function toastEnter(baseEl: HTMLElement, options: ToastPosition = {}): Animation {
  const root = baseEl.shadowRoot ?? baseEl;
  const wrapper = root.querySelector<HTMLElement>('.toast-wrapper');
  if (!wrapper) return createAnimation();

  // Ionic calcula estos desplazamientos con safe-area y positionAnchor.
  // La transición conserva esa posición final y recorre solo unos píxeles.
  let offset = '0px';
  if (options.position === 'middle') {
    wrapper.style.top = `${Math.floor((baseEl.clientHeight - wrapper.clientHeight) / 2)}px`;
  } else {
    offset = (options.position === 'top' ? options.top : options.bottom) || '0px';
  }
  const restingTransform = `translateY(${offset})`;
  wrapper.style.transform = restingTransform;

  const reduce = reducedMotion();
  const animation = createAnimation()
    .addElement(wrapper)
    .duration(reduce ? 100 : 180)
    .easing('cubic-bezier(0.23, 1, 0.32, 1)')
    .fromTo('opacity', 0.01, 1);
  if (!reduce) {
    animation.fromTo('transform', `translateY(calc(${offset} + ${options.position === 'top' ? '-8px' : '8px'}))`, restingTransform);
  }
  return animation;
}

function toastLeave(baseEl: HTMLElement, options: ToastPosition = {}): Animation {
  const wrapper = (baseEl.shadowRoot ?? baseEl).querySelector<HTMLElement>('.toast-wrapper');
  if (!wrapper) return createAnimation();
  const current = getComputedStyle(wrapper);
  const offset = (options.position === 'top' ? options.top : options.position === 'middle' ? '0px' : options.bottom) || '0px';
  const reduce = reducedMotion();
  const animation = createAnimation()
    .addElement(wrapper)
    .duration(reduce ? 80 : 130)
    .easing('cubic-bezier(0.23, 1, 0.32, 1)')
    .fromTo('opacity', current.opacity, 0);
  if (!reduce) {
    animation.fromTo('transform', current.transform, `translateY(calc(${offset} + ${options.position === 'top' ? '-6px' : '6px'}))`);
  }
  return animation;
}

export const trainFitToastAnimations = { toastEnter, toastLeave };
