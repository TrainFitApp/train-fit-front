import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Split } from 'src/app/core/models/split';

@Component({
  selector: 'app-delete-splits-modal',
  templateUrl: './delete-splits-modal.component.html',
  styleUrls: ['./delete-splits-modal.component.scss'],
})
export class DeleteSplitsModalComponent implements OnInit {
  @Input()
  public splits: Split[] = [];

  @Input()
  public currentSplitIndex: number = 0;

  @Input()
  public workoutInUse?: string;

  public selectedSplitIds = new Set<string>();

  constructor(private modalController: ModalController) {}

  public ngOnInit(): void {
    const currentSplitId = this.splits[this.currentSplitIndex]?._id;
    if (currentSplitId) {
      this.selectedSplitIds.add(currentSplitId);
    }
  }

  public get selectedCount(): number {
    return this.selectedSplitIds.size;
  }

  public isSelected(splitId: string): boolean {
    return this.selectedSplitIds.has(splitId);
  }

  public toggleSplit(splitId: string): void {
    if (this.selectedSplitIds.has(splitId)) {
      this.selectedSplitIds.delete(splitId);
    } else {
      this.selectedSplitIds.add(splitId);
    }
  }

  public setSplitSelected(splitId: string, selected: boolean): void {
    if (selected) {
      this.selectedSplitIds.add(splitId);
    } else {
      this.selectedSplitIds.delete(splitId);
    }
  }

  public isSplitCompleted(split: Split): boolean {
    return Boolean(
      split.workouts?.length &&
        split.workouts.every((workout) => Boolean(workout.date))
    );
  }

  public containsActiveWorkout(split: Split): boolean {
    if (!this.workoutInUse) return false;
    return (split.workouts || []).some(
      (workout) => workout._id === this.workoutInUse
    );
  }

  public dismiss(): void {
    void this.modalController.dismiss(undefined, 'cancel');
  }

  public confirmSelection(): void {
    if (this.selectedCount === 0) return;

    void this.modalController.dismiss(
      { splitIds: Array.from(this.selectedSplitIds) },
      'confirm'
    );
  }

  public trackBySplit(split: Split): string {
    return split._id;
  }
}
