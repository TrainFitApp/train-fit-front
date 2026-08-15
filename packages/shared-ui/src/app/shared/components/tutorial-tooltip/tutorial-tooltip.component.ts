import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ActiveTutorialStep } from 'src/app/core/models/tutorial';

@Component({
  selector: 'app-tutorial-tooltip',
  templateUrl: './tutorial-tooltip.component.html',
  styleUrls: ['./tutorial-tooltip.component.scss'],
  host: {
    role: 'dialog',
    'aria-live': 'polite',
    'aria-modal': 'false',
  },
})
export class TutorialTooltipComponent {
  @Input() public activeStep!: ActiveTutorialStep;

  @Output() public next = new EventEmitter<void>();
  @Output() public skip = new EventEmitter<void>();

  @HostListener('document:keydown.escape')
  public onEscape(): void {
    this.skip.emit();
  }

  public get isLastStep(): boolean {
    return this.activeStep.stepIndex + 1 >= this.activeStep.totalSteps;
  }

  public get dotsArray(): number[] {
    return Array.from({ length: this.activeStep.totalSteps });
  }
}
