import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Table } from 'src/app/core/models/table';
import { Workout } from 'src/app/core/models/workout';

@Component({
  selector: 'app-table-preview-modal',
  templateUrl: './table-preview-modal.component.html',
  styleUrls: ['./table-preview-modal.component.scss'],
})
export class TablePreviewModalComponent {
  @Input()
  public table: Table;

  @Input()
  public own: boolean;

  @Input()
  public isActive: boolean = false;

  constructor(private modalController: ModalController) {}

  get totalWorkouts(): number {
    return this.table?.splits?.reduce((acc, s) => acc + (s.workouts?.length || 0), 0) || 0;
  }

  get totalExercises(): number {
    return this.table?.splits?.reduce(
      (acc, s) => acc + s.workouts.reduce((wAcc, w) => wAcc + (w.exercises?.length || 0), 0),
      0
    ) || 0;
  }

  public dismiss(): void {
    this.modalController.dismiss(undefined, 'cancel');
  }

  public use(): void {
    this.modalController.dismiss({ action: 'use' }, 'confirm');
  }

  public trackByWorkout(index: number, workout: Workout): string {
    return workout._id || String(index);
  }
}
