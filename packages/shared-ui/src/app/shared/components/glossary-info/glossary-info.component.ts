import { Component, Input } from '@angular/core';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import {
  GlossaryPopoverComponent,
  GlossaryTermKey,
} from '../glossary-popover/glossary-popover.component';

@Component({
  selector: 'app-glossary-info',
  templateUrl: './glossary-info.component.html',
  styleUrls: ['./glossary-info.component.scss'],
})
export class GlossaryInfoComponent {
  @Input() public term: GlossaryTermKey;
  @Input() public size: 'sm' | 'md' = 'md';

  constructor(private ionicUtilService: IonicUtilService) {}

  public showInfo(event: Event): void {
    event.stopPropagation();
    this.ionicUtilService.showPopover({
      component: GlossaryPopoverComponent,
      componentProps: { term: this.term },
      event,
    });
  }
}
