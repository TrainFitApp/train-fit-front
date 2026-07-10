import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-char-counter',
  templateUrl: './char-counter.component.html',
  styleUrls: ['./char-counter.component.scss'],
})
export class CharCounterComponent {
  @Input()
  public value: string | null | undefined = '';

  @Input()
  public max: number = 0;

  public get length(): number {
    return this.value?.length || 0;
  }

  public get limitReached(): boolean {
    return this.length >= this.max;
  }
}
