import { Component, Input } from '@angular/core';

export type GlossaryTermKey =
  | 'RIR'
  | 'MICROCYCLE'
  | 'ONE_RM'
  | 'BEST_SET'
  | 'EFFECTIVE_VOLUME'
  | 'SETS_COMPARISON'
  | 'PINNED_NOTE'
  | 'SET_OBJECTIVE';

@Component({
  selector: 'app-glossary-popover',
  templateUrl: './glossary-popover.component.html',
  styleUrls: ['./glossary-popover.component.scss'],
})
export class GlossaryPopoverComponent {
  @Input() public term: GlossaryTermKey;
}
