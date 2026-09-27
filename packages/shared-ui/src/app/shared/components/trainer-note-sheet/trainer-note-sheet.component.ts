import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

export type TrainerNoteKind = 'exercise' | 'workout';

// 2026-09 — lo que pautó el entrenador para un ejercicio o un entrenamiento,
// en modo lectura, como hoja inferior (sale al tocar el chip con el icono de
// la pestaña Coach en current-workout). Dos fuentes posibles: la nota de esta
// sesión (CustomExercise.notes / Workout.notes) y la anclada por el
// entrenador, que vale para esa posición en todos los microciclos.
// Abrir con TRAINER_NOTE_SHEET_OPTIONS.
@Component({
  selector: 'app-trainer-note-sheet',
  templateUrl: './trainer-note-sheet.component.html',
  styleUrls: ['./trainer-note-sheet.component.scss'],
})
export class TrainerNoteSheetComponent {
  @Input() public kind: TrainerNoteKind = 'exercise';
  // Nombre del ejercicio o del entrenamiento, tal cual viene de BD.
  @Input() public subject = '';
  @Input() public notes: string | null = null;
  @Input() public pinnedNotes: string | null = null;
  @Input() public pinnedUpdatedAt: Date | string | null = null;

  constructor(private modalController: ModalController) {}

  public close(): void {
    this.modalController.dismiss();
  }
}

// Alto automático (ver .trainer-note-sheet-modal en global.scss): una nota
// corta no abre media pantalla vacía y una larga hace scroll dentro.
export const TRAINER_NOTE_SHEET_OPTIONS = {
  component: TrainerNoteSheetComponent,
  cssClass: 'trainer-note-sheet-modal',
  breakpoints: [0, 1],
  initialBreakpoint: 1,
};
