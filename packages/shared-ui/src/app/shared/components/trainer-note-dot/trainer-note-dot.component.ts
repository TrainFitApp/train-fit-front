import { Component, Input } from '@angular/core';
import { PinnedExerciseNote } from 'src/app/core/models/pinned-exercise-note';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  TRAINER_NOTE_SHEET_OPTIONS,
  TrainerNoteKind,
} from '../trainer-note-sheet/trainer-note-sheet.component';

// 2026-09 — aviso del entrenador: círculo naranja con el icono de la pestaña
// Coach. Se coloca junto a lo que anota (nombre del día, miniatura del
// ejercicio) en vez de una tarjeta, y abre TrainerNoteSheet. No se pinta si
// no hay nada que leer.
@Component({
  selector: 'app-trainer-note-dot',
  templateUrl: './trainer-note-dot.component.html',
  styleUrls: ['./trainer-note-dot.component.scss'],
})
export class TrainerNoteDotComponent {
  @Input() public kind: TrainerNoteKind = 'exercise';
  @Input() public subject = '';
  @Input() public notes: string | null | undefined = null;
  @Input() public pinned: PinnedExerciseNote | null | undefined = null;
  // sm: sobre una miniatura o en una fila de iconos; md: junto a un título.
  @Input() public size: 'sm' | 'md' = 'md';

  constructor(private ionicUtilService: IonicUtilService) {}

  public get hasContent(): boolean {
    return !!this.notes?.trim() || !!this.pinned?.notes?.trim();
  }

  // Suele vivir dentro de algo pulsable (cabecera de acordeón, tarjeta):
  // el toque es solo para la nota.
  public open(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.ionicUtilService.showModal({
      ...TRAINER_NOTE_SHEET_OPTIONS,
      componentProps: {
        kind: this.kind,
        subject: this.subject || '',
        notes: this.notes?.trim() || null,
        pinnedNotes: this.pinned?.notes || null,
        pinnedUpdatedAt: this.pinned?.updatedAt || null,
      },
    });
  }
}
