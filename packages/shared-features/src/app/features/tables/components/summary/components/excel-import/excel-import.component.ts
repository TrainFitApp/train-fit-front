import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AiTablePreview, AiSplitPreview, AiWorkoutPreview, AiExercisePreview, AiSetPreview } from 'src/app/core/models/ai-import';

@Component({
  selector: 'app-excel-import',
  templateUrl: './excel-import.component.html',
  styleUrls: ['./excel-import.component.scss'],
})
export class ExcelImportComponent implements OnInit {
  @Input() preview: AiTablePreview;

  public expandedSplits: Set<number> = new Set();
  public expandedWorkouts: Set<string> = new Set();
  public expandedExercises: Set<string> = new Set();

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  public getSplitCount(): number {
    return this.preview?.splits?.length || 0;
  }

  public getWorkoutCount(): number {
    if (!this.preview?.splits) return 0;
    return this.preview.splits.reduce((sum, s) => sum + (s.workouts?.length || 0), 0);
  }

  public getExerciseCount(): number {
    if (!this.preview?.splits) return 0;
    return this.preview.splits.reduce(
      (sum, s) =>
        sum +
        (s.workouts || []).reduce(
          (ws, w) => ws + (w.exercises?.length || 0),
          0
        ),
      0
    );
  }

  public getTotalSets(): number {
    if (!this.preview?.splits) return 0;
    return this.preview.splits.reduce(
      (sum, s) =>
        sum +
        (s.workouts || []).reduce(
          (ws, w) =>
            ws +
            (w.exercises || []).reduce(
              (es, e) => es + (e.sets?.length || 0),
              0
            ),
          0
        ),
      0
    );
  }

  public toggleSplit(index: number): void {
    if (this.expandedSplits.has(index)) {
      this.expandedSplits.delete(index);
    } else {
      this.expandedSplits.add(index);
    }
  }

  public toggleWorkout(key: string): void {
    if (this.expandedWorkouts.has(key)) {
      this.expandedWorkouts.delete(key);
    } else {
      this.expandedWorkouts.add(key);
    }
  }

  public toggleExercise(key: string): void {
    if (this.expandedExercises.has(key)) {
      this.expandedExercises.delete(key);
    } else {
      this.expandedExercises.add(key);
    }
  }

  public isSplitExpanded(index: number): boolean {
    return this.expandedSplits.has(index);
  }

  public isWorkoutExpanded(key: string): boolean {
    return this.expandedWorkouts.has(key);
  }

  public isExerciseExpanded(key: string): boolean {
    return this.expandedExercises.has(key);
  }

  public formatExpectedReps(sets: AiSetPreview[]): string {
    if (!sets || sets.length === 0) return '-';
    const s = sets[0];
    if (s.expectedReps?.length === 2) {
      return `${s.expectedReps[0]}-${s.expectedReps[1]}`;
    }
    if (s.expectedReps?.length === 1) {
      return `${s.expectedReps[0]}`;
    }
    return '-';
  }

  public formatExpectedRir(sets: AiSetPreview[]): string {
    if (!sets || sets.length === 0) return '-';
    const s = sets[0];
    if (s.expectedRir?.[0] === -1) return 'FALLO';
    if (s.expectedRir?.length === 2) {
      return `${s.expectedRir[0]}-${s.expectedRir[1]} RIR`;
    }
    if (s.expectedRir?.length === 1) {
      return `${s.expectedRir[0]} RIR`;
    }
    return '-';
  }

  public formatWeight(sets: AiSetPreview[]): string {
    if (!sets || sets.length === 0) return '-';
    const w = sets[0].weight;
    return w ? `${w} kg` : '-';
  }

  public hasSetModifiers(sets: AiSetPreview[]): boolean {
    if (!sets || sets.length === 0) return false;
    const s = sets[0];
    return !!(s.drop || s.restPause);
  }

  public getSetModifiers(sets: AiSetPreview[]): string {
    if (!sets || sets.length === 0) return '';
    const s = sets[0];
    const mods: string[] = [];
    if (s.drop) mods.push('DS');
    if (s.restPause) mods.push(`RP ${s.restPause}s`);
    return mods.join(' ');
  }

  public confirm(): void {
    this.modalController.dismiss({ confirmed: true });
  }

  public cancel(): void {
    this.modalController.dismiss({ confirmed: false });
  }
}
