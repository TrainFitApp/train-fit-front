import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

interface Tip {
  icon: string;
  text: string;
}

const TIP_KEYS = [
  { icon: 'barbell-outline', key: 'AI_LOADING.FUN_FACT_1' },
  { icon: 'flash-outline', key: 'AI_LOADING.FUN_FACT_2' },
  { icon: 'create-outline', key: 'AI_LOADING.FUN_FACT_3' },
  { icon: 'copy-outline', key: 'AI_LOADING.FUN_FACT_4' },
  { icon: 'nutrition-outline', key: 'AI_LOADING.FUN_FACT_5' },
  { icon: 'bar-chart-outline', key: 'AI_LOADING.FUN_FACT_6' },
  { icon: 'scale-outline', key: 'AI_LOADING.FUN_FACT_7' },
  { icon: 'trophy-outline', key: 'AI_LOADING.FUN_FACT_8' },
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

  currentTip = Math.floor(Math.random() * TIP_KEYS.length);
  animating = false;

  private intervalId: ReturnType<typeof setInterval> | undefined;

  readonly tips = TIP_KEYS;

  constructor(private translate: TranslateService) {}

  get currentTipText(): string {
    return this.translate.instant(this.tips[this.currentTip].key);
  }

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
      let next = Math.floor(Math.random() * TIP_KEYS.length);
      if (next === this.currentTip) next = (next + 1) % this.tips.length;
      this.currentTip = next;
      this.animating = false;
    }, 300);
  }
}
