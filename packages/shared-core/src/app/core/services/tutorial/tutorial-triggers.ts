import { TutorialTrigger } from '../../models/tutorial';

// Comportamiento (cuándo disparar cada tutorial) — el contenido (títulos,
// mensajes) vive en el backend (colección `tutorials`, ver
// TutorialCatalogService). Añadir un tutorial nuevo = 1 entrada aquí +
// appTutorialAnchor="<key>.<stepKey>" en la plantilla + el documento
// correspondiente en la colección `tutorials` (ver
// train-fit-back/scripts/seed-tutorials.js).
export const TUTORIAL_TRIGGERS: TutorialTrigger[] = [
  { key: 'training.introduction', trigger: 'screen-enter' },
  { key: 'training.currentWorkout', trigger: 'screen-enter' },
  { key: 'training.finishWorkout', trigger: 'anchor' },
  { key: 'training.rir', trigger: 'event', eventName: 'setInteracted' },
  { key: 'training.notes', trigger: 'event', eventName: 'exerciseExpanded' },
  { key: 'training.previousSession', trigger: 'anchor' },
  // Simplificación deliberada: en vez de detectar "se completaron todas las
  // series de este ejercicio" (requeriría escuchar cada checkbox individual
  // de set.component), se muestra en el siguiente "momento" natural en el
  // que el botón exista y no haya nada más en cola — normalmente, al
  // expandir otro ejercicio distinto tras ver ya la nota. Sigue cumpliendo
  // "conforme utilice funcionalidades nuevas", sin acoplarse al formulario
  // reactivo de cada serie.
  { key: 'training.addSeries', trigger: 'anchor' },
  { key: 'training.moveExercise', trigger: 'manual' },
  { key: 'training.moveSets', trigger: 'manual' },
  { key: 'training.mesocycle', trigger: 'manual' },
  { key: 'training.statistics', trigger: 'manual' },
];
