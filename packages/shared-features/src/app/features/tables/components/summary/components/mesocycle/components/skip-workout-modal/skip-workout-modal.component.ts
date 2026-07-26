import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Workout } from 'src/app/core/models/workout';

export interface WorkoutSkipItem {
  workout: Workout;
  splitIndex: number;
}

@Component({
  selector: 'app-skip-workout-modal',
  templateUrl: './skip-workout-modal.component.html',
  styleUrls: ['./skip-workout-modal.component.scss'],
})
export class SkipWorkoutModalComponent {
  @Input()
  public workoutItems: WorkoutSkipItem[] = [];

  @Input()
  public header: string;

  @Input()
  public message: string;

  @Input()
  public confirmText: string;

  @Input()
  public showSecondaryAction = false;

  @Input()
  public secondaryText: string;

  constructor(private modalController: ModalController) {}

  public dismiss(): void {
    this.modalController.dismiss(null, 'cancel');
  }

  public confirm(): void {
    this.modalController.dismiss(null, 'confirm');
  }

  public secondary(): void {
    this.modalController.dismiss(null, 'secondary');
  }
}
