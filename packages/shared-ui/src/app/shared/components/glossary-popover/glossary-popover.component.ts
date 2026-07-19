import { Component, Input } from '@angular/core';

export type GlossaryTermKey = 'RIR' | 'MICROCYCLE' | 'ONE_RM';

@Component({
  selector: 'app-glossary-popover',
  templateUrl: './glossary-popover.component.html',
  styleUrls: ['./glossary-popover.component.scss'],
})
export class GlossaryPopoverComponent {
  @Input() public term: GlossaryTermKey;
}
