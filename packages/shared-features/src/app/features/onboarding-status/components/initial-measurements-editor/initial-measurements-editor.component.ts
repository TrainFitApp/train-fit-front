import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InitialMeasurementDefinition, InitialMeasurementDraft, InitialMeasurementValue } from '../../models/initial-measurements';

@Component({
  selector: 'app-initial-measurements-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './initial-measurements-editor.component.html',
  styleUrls: ['./initial-measurements-editor.component.scss'],
})
export class InitialMeasurementsEditorComponent {
  @Input() public definitions: InitialMeasurementDefinition[] = [];
  @Input() public rows: InitialMeasurementDraft[] = [];
  @Input() public recent: InitialMeasurementValue[] = [];
  @Input() public errors: Record<string, string> = {};
  @Input() public today = '';
  @Input() public disabled = false;
  @Output() public rowsChange = new EventEmitter<InitialMeasurementDraft[]>();

  public row(field: string): InitialMeasurementDraft {
    return this.rows.find((item) => item.field === field) || { field, value: '', date: this.today };
  }

  public previous(field: string): InitialMeasurementValue | undefined {
    return this.recent.find((item) => item.field === field && Number.isFinite(item.value) && item.value > 0);
  }

  public edit(field: string, property: 'value' | 'date', value: string): void {
    const next: InitialMeasurementDraft = { ...this.row(field), [property]: String(value ?? '') };
    delete next.confirmedExisting;
    delete next.expectedValue;
    this.replace(next);
  }

  public reuse(previous: InitialMeasurementValue): void {
    this.replace({ field: previous.field, value: String(previous.value), date: previous.date, confirmedExisting: true });
  }

  public formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  }

  public trackByKey(_index: number, definition: InitialMeasurementDefinition): string {
    return definition.key;
  }

  private replace(next: InitialMeasurementDraft): void {
    this.rowsChange.emit([...this.rows.filter((item) => item.field !== next.field), next]);
  }
}
