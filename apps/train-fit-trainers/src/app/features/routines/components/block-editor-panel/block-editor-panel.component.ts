import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WorkoutTemplateBlockType } from 'src/app/core/models/workout-template';
import { localizeRecord } from 'src/app/core/i18n/localized-catalog';

// Lo que se edita de un bloque: lo mismo que en el Planificador (nombre y
// tipo). Rondas, descansos e instrucciones no se piden allí; si una
// plantilla los trae (p. ej. de una versión anterior), se conservan tal cual.
export interface BlockDraft {
  name: string;
  type: WorkoutTemplateBlockType;
}

export type BlockEditorResult = { action: 'save'; block: BlockDraft } | { action: 'delete' };

export const BLOCK_TYPES: WorkoutTemplateBlockType[] = ['straight', 'superset', 'circuit', 'warmup', 'finisher'];

export const BLOCK_TYPE_LABELS: Record<WorkoutTemplateBlockType, string> = {
  straight: 'Recta',
  superset: 'Superserie',
  circuit: 'Circuito',
  warmup: 'Calentamiento',
  finisher: 'Finisher',
};
localizeRecord(BLOCK_TYPE_LABELS, 'ROUTINES.BLOCK_TYPES');

const BLOCK_TYPE_HINTS: Record<WorkoutTemplateBlockType, string> = {
  straight: 'Todas las series de un ejercicio y luego el siguiente.',
  superset: 'Dos o tres ejercicios seguidos; descansas al acabar la ronda.',
  circuit: 'Varios ejercicios en ronda, con descanso entre rondas.',
  warmup: 'Activación y series de aproximación antes del trabajo.',
  finisher: 'Un bloque corto e intenso para cerrar la sesión.',
};
localizeRecord(BLOCK_TYPE_HINTS, 'ROUTINES.BLOCK_TYPE_HINTS');

// Crear o editar un bloque en un panel lateral: nombre y tipo, los dos a la
// vista (en el Planificador son dos alerts seguidos).
@Component({
  selector: 'app-block-editor-panel',
  templateUrl: './block-editor-panel.component.html',
  styleUrls: ['./block-editor-panel.component.scss'],
})
export class BlockEditorPanelComponent implements OnInit {
  @Input() block: BlockDraft | null = null;
  @Input() isNew = false;

  public draft: BlockDraft = { name: '', type: 'straight' };

  public readonly types = BLOCK_TYPES;
  public readonly labels = BLOCK_TYPE_LABELS;
  public readonly hints = BLOCK_TYPE_HINTS;

  constructor(private modalController: ModalController) {}

  public ngOnInit(): void {
    if (this.block) this.draft = { name: this.block.name || '', type: this.block.type || 'straight' };
  }

  public selectType(type: WorkoutTemplateBlockType): void {
    this.draft.type = type;
  }

  public save(): void {
    const block: BlockDraft = { name: (this.draft.name || '').trim().slice(0, 100), type: this.draft.type };
    void this.modalController.dismiss({ action: 'save', block } as BlockEditorResult, 'save');
  }

  public remove(): void {
    void this.modalController.dismiss({ action: 'delete' } as BlockEditorResult, 'delete');
  }

  public close(): void {
    void this.modalController.dismiss(null, 'cancel');
  }
}
