import { Component, Input, OnDestroy, OnInit } from '@angular/core';

interface Tip {
  icon: string;
  text: string;
}

const TIPS: Tip[] = [
  { icon: 'barbell-outline', text: 'Sabías que contamos con +250 ejercicios en la biblioteca' },
  { icon: 'flash-outline', text: 'TrainFit está enfocada para los que entrenan en serio y al grano, sin tonterías' },
  { icon: 'create-outline', text: 'Aprovecha las notas para apuntar info de tu dieta o entrenamiento' },
  { icon: 'copy-outline', text: 'Sabías que puedes copiar tus microciclos con tan solo 2 clics' },
  { icon: 'nutrition-outline', text: 'Sabías que puedes crear tus propias recetas' },
  { icon: 'bar-chart-outline', text: 'Sabías que tienes un apartado con tus estadísticas de entrenamiento' },
  { icon: 'scale-outline', text: 'Sabías que puedes registrar tu peso diario y ver estadísticas' },
  { icon: 'trophy-outline', text: 'TrainFit, la app #1 elegida por usuarios intermedios y avanzados' },
];

@Component({
  selector: 'app-ai-loading-overlay',
  templateUrl: './ai-loading-overlay.component.html',
  styleUrls: ['./ai-loading-overlay.component.scss'],
})
export class AiLoadingOverlayComponent implements OnInit, OnDestroy {
  @Input() set visible(val: boolean) {
    this._visible = val;
    if (val) this.startRotation();
    else this.stopRotation();
  }
  get visible(): boolean { return this._visible; }
  private _visible = false;

  @Input() message = '';

  currentTip = Math.floor(Math.random() * TIPS.length);
  animating = false;

  private intervalId: ReturnType<typeof setInterval> | undefined;

  readonly tips = TIPS;

  ngOnInit(): void {
    if (this.visible) this.startRotation();
  }

  ngOnDestroy(): void {
    this.stopRotation();
  }

  private startRotation(): void {
    this.stopRotation();
    this.intervalId = setInterval(() => this.nextTip(), 5000);
  }

  private stopRotation(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private nextTip(): void {
    this.animating = true;
    setTimeout(() => {
      let next = Math.floor(Math.random() * this.tips.length);
      if (next === this.currentTip) next = (next + 1) % this.tips.length;
      this.currentTip = next;
      this.animating = false;
    }, 300);
  }
}
