import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CustomExercise } from 'src/app/core/models/customExercise';

@Component({
  selector: 'app-clipboard-exercises-modal',
  templateUrl: './clipboard-exercises-modal.component.html',
  styleUrls: ['./clipboard-exercises-modal.component.scss'],
})
export class ClipboardExercisesModalComponent implements OnInit {
  @Input()
  public exercises: CustomExercise[] = [];

  @Input()
  public mode: 'view' | 'paste' = 'view';

  public selectedIndices = new Set<number>();

  constructor(private modalController: ModalController) {}

  public ngOnInit(): void {
    this.exercises.forEach((_, i) => this.selectedIndices.add(i));
  }

  public get selectedCount(): number {
    return this.selectedIndices.size;
  }

  public isSelected(index: number): boolean {
    return this.selectedIndices.has(index);
  }

  public toggleExercise(index: number): void {
    if (this.selectedIndices.has(index)) {
      this.selectedIndices.delete(index);
    } else {
      this.selectedIndices.add(index);
    }
  }

  public dismiss(): void {
    this.modalController.dismiss(undefined, 'cancel');
  }

  public confirm(): void {
    const selectedExercises = Array.from(this.selectedIndices).map(
      (i) => this.exercises[i]
    );
    this.modalController.dismiss({ selectedExercises }, 'confirm');
  }
}
