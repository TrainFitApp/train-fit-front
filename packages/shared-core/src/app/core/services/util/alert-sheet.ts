import { Animation, Gesture, createAnimation, createGesture } from '@ionic/angular';

// Los alerts salen como hoja inferior (IonicUtilService.showAlert). Siguen
// siendo `ion-alert` por debajo, y no un `ion-modal` propio, a propósito:
// hay handlers que llaman a `modalController.dismiss()` sin id con el alert
// abierto para cerrar la página modal que hay debajo (search-exercises,
// order-sets, nutrition-editor...). Si la hoja fuera un ion-modal, ese
// dismiss cerraría la hoja y no la página. Además se conservan tal cual los
// `role`, los `data.values` y el `return false` de 195 llamadas.
// Aquí vive solo la parte que el CSS no puede hacer: entrar y salir desde
// abajo y cerrarla arrastrando. El aspecto está en `global.scss`.

const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
// Más que el 100 %: en escritorio la hoja flota separada del borde inferior.
const OFFSCREEN = 'translateY(calc(100% + 40px))';

const reducedMotion = (): boolean =>
  typeof matchMedia === 'function' &&
  matchMedia('(prefers-reduced-motion: reduce)').matches;

const parts = (baseEl: HTMLElement) => ({
  backdrop: baseEl.querySelector('ion-backdrop') as HTMLElement,
  wrapper: baseEl.querySelector('.alert-wrapper') as HTMLElement,
});

export const alertSheetEnter = (baseEl: HTMLElement): Animation => {
  const { backdrop, wrapper } = parts(baseEl);
  const reduce = reducedMotion();

  const backdropAnimation = createAnimation()
    .addElement(backdrop)
    .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
    .beforeStyles({ 'pointer-events': 'none' })
    .afterClearStyles(['pointer-events']);

  // fill 'none': al acabar, la hoja queda en su sitio por CSS y no por la
  // animación, así el arrastre puede moverla con `style.transform`.
  const wrapperAnimation = createAnimation().addElement(wrapper).fill('none');
  if (reduce) {
    wrapperAnimation.fromTo('opacity', 0.01, 1);
  } else {
    wrapperAnimation.fromTo('transform', OFFSCREEN, 'translateY(0)');
  }

  return createAnimation()
    .addElement(baseEl)
    .easing(EASE_OUT)
    .duration(reduce ? 120 : 360)
    .addAnimation([backdropAnimation, wrapperAnimation]);
};

export const alertSheetLeave = (baseEl: HTMLElement): Animation => {
  const { backdrop, wrapper } = parts(baseEl);
  const reduce = reducedMotion();
  // Si se cierra arrastrando, sale desde donde la soltó el dedo.
  const from = wrapper.style.transform || 'translateY(0)';

  const backdropAnimation = createAnimation()
    .addElement(backdrop)
    .fromTo('opacity', 'var(--backdrop-opacity)', 0);

  const wrapperAnimation = createAnimation().addElement(wrapper);
  if (reduce) {
    wrapperAnimation.fromTo('opacity', 1, 0);
  } else {
    wrapperAnimation.fromTo('transform', from, OFFSCREEN);
  }

  return createAnimation()
    .addElement(baseEl)
    .easing(EASE_IN)
    .duration(reduce ? 120 : 220)
    .addAnimation([backdropAnimation, wrapperAnimation]);
};

// Arrastrar hacia abajo desde el tirador o la cabecera la cierra como
// "Cancelar" (Ionic llama al handler del botón cancel, igual que con el botón
// atrás). Solo desde arriba: más abajo hay textos con scroll e inputs.
export const enableAlertSheetSwipe = (
  alertEl: HTMLIonAlertElement
): Gesture | undefined => {
  const wrapper = alertEl.querySelector('.alert-wrapper') as HTMLElement | null;
  if (!wrapper) return undefined;

  const gesture = createGesture({
    el: wrapper,
    gestureName: 'alert-sheet-swipe',
    direction: 'y',
    threshold: 6,
    canStart: (detail) => {
      const target = detail.event.target as HTMLElement | null;
      const fromTop = detail.startY - wrapper.getBoundingClientRect().top;
      return fromTop < 28 || !!target?.closest('.alert-head');
    },
    onStart: () => {
      wrapper.style.transition = 'none';
    },
    onMove: (detail) => {
      wrapper.style.transform = `translateY(${Math.max(0, detail.deltaY)}px)`;
    },
    onEnd: (detail) => {
      const farEnough = detail.deltaY > Math.min(140, wrapper.offsetHeight * 0.3);
      if (farEnough || detail.velocityY > 0.5) {
        void alertEl.dismiss(undefined, 'cancel');
        return;
      }
      wrapper.style.transition = `transform 220ms ${EASE_OUT}`;
      wrapper.style.transform = '';
    },
  });
  gesture.enable();
  return gesture;
};
