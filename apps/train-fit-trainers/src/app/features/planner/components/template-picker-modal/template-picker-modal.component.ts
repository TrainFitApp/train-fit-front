import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { WorkoutTemplate, WorkoutTemplateLevel } from 'src/app/core/models/workout-template';
import { localizeRecord } from 'src/app/core/i18n/localized-catalog';

const LEVEL_LABELS: Record<WorkoutTemplateLevel, string> = {
  principiante: 'Principiante',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado',
};
localizeRecord(LEVEL_LABELS, 'PLANNER.TEMPLATE_LEVELS');

// TASK-043 (MASTER_BACKLOG.md) — sustituye el AlertOptions de texto plano de
// planner-column.component.ts#applyTemplateAlert() (sin buscador ni preview,
// no escalaba más allá de ~10 plantillas) por un modal con filtro por
// nombre/tags y la misma info de preview que ya usa RoutinesPage
// (nivel/tags/bloques/ejercicios) — mismo dato (WorkoutTemplate[]) ya
// cargado por el llamante, sin llamada a backend nueva.
// Multi-selección (2026-08) — antes elegir una plantilla la aplicaba y
// cerraba el modal de inmediato, obligando a reabrirlo una vez por cada
// entrenamiento que se quisiera añadir. Ahora se marcan varias con checkbox
// (o "Seleccionar todas") y se aplican todas de una vez al confirmar — el
// llamante (planner-column.component.ts) las aplica en secuencia, una
// request por plantilla (applyToTable).
@Component({
  selector: 'app-template-picker-modal',
  templateUrl: './template-picker-modal.component.html',
  styleUrls: ['./template-picker-modal.component.scss'],
})
export class TemplatePickerModalComponent implements OnInit {
  @Input() templates: WorkoutTemplate[] = [];

  public search = '';
  public filteredTemplates: WorkoutTemplate[] = [];
  public selectedIds = new Set<string>();

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

  public toggle(template: WorkoutTemplate): void {
    if (this.selectedIds.has(template._id)) this.selectedIds.delete(template._id);
    else this.selectedIds.add(template._id);
  }

  public isSelected(template: WorkoutTemplate): boolean {
    return this.selectedIds.has(template._id);
  }

  // "Seleccionar todas" actúa solo sobre lo visible tras el filtro — marcar
  // "todas" con un buscador activo no debe arrastrar plantillas ocultas que
  // el entrenador ni ha visto.
  public get allFilteredSelected(): boolean {
    return this.filteredTemplates.length > 0 && this.filteredTemplates.every((t) => this.selectedIds.has(t._id));
  }

  public toggleSelectAllFiltered(): void {
    if (this.allFilteredSelected) {
      this.filteredTemplates.forEach((t) => this.selectedIds.delete(t._id));
    } else {
      this.filteredTemplates.forEach((t) => this.selectedIds.add(t._id));
    }
  }

  public confirmSelection(): void {
    if (!this.selectedIds.size) return;
    this.modalController.dismiss([...this.selectedIds]);
  }

  public close(): void {
    this.modalController.dismiss();
  }
}
