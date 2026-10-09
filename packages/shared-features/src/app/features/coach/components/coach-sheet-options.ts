// Hojas del tab Coach ("Tus planes", "Tus profesionales"): alto automático
// (ver .coach-sheet-modal en global.scss), de modo que una hoja corta no abre
// media pantalla vacía y una larga hace scroll dentro (.cs-body).
export const COACH_SHEET_OPTIONS = {
  cssClass: 'coach-sheet-modal',
  breakpoints: [0, 1],
  initialBreakpoint: 1,
};

// "Tus profesionales" se abre por completo: la ficha (datos, cobros,
// terminar la relación) es larga y no debe quedarse a medias.
export const COACH_FULL_SHEET_OPTIONS = {
  ...COACH_SHEET_OPTIONS,
  cssClass: ['coach-sheet-modal', 'coach-sheet-modal--full'],
};
