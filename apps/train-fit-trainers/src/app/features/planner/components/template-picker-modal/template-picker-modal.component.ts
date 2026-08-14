import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WorkoutTemplate, WorkoutTemplateLevel } from 'src/app/core/models/workout-template';

const LEVEL_LABELS: Record<WorkoutTemplateLevel, string> = {
  principiante: 'Principiante',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
};

// TASK-043 (MASTER_BACKLOG.md) — sustituye el AlertOptions de texto plano de
// planner-column.component.ts#applyTemplateAlert() (sin buscador ni preview,
// no escalaba más allá de ~10 plantillas) por un modal con filtro por
// nombre/tags y la misma info de preview que ya usa RoutinesPage
// (nivel/tags/bloques/ejercicios) — mismo dato (WorkoutTemplate[]) ya
// cargado por el llamante, sin llamada a backend nueva.
@Component({
  selector: 'app-template-picker-modal',
  templateUrl: './template-picker-modal.component.html',
  styleUrls: ['./template-picker-modal.component.scss'],
})
export class TemplatePickerModalComponent implements OnInit {
  @Input() templates: WorkoutTemplate[] = [];

  public search = '';
  public filteredTemplates: WorkoutTemplate[] = [];

  public readonly levelLabels = LEVEL_LABELS;

  constructor(private modalController: ModalController) {}

  public ngOnInit(): void {
    this.filteredTemplates = this.templates;
  }

  public onSearchChange(): void {
    const term = this.search.trim().toLowerCase();
    if (!term) {
      this.filteredTemplates = this.templates;
      return;
    }
    this.filteredTemplates = this.templates.filter((template) => {
      const haystack = [template.name, ...(template.tags || [])].join(' ').toLowerCase();
      return haystack.includes(term);
    });
  }

  public exerciseCount(template: WorkoutTemplate): number {
    return (template.blocks || []).reduce(
      (total, block) => total + (block.exercises?.length || 0),
      0
    );
  }

  public blockCount(template: WorkoutTemplate): number {
    return (template.blocks || []).length;
  }

  public trackByTemplateId(_index: number, template: WorkoutTemplate): string {
    return template._id;
  }

  public choose(template: WorkoutTemplate): void {
    this.modalController.dismiss(template._id);
  }

  public close(): void {
    this.modalController.dismiss();
  }
}
