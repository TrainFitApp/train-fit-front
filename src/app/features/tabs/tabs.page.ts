import { Component } from '@angular/core';
import { UtilService } from 'src/app/core/services/util/util.service';
import { TABS } from 'src/app/shared/constants/tabs';
import { TABLE_MODE_TYPES } from '../../shared/constants/table-mode';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  public TABS = TABS;
  public TABLE_MODE_TYPES = TABLE_MODE_TYPES;

  public onTabChange(event): void {
    if (event.tab === TABS.summary)
      this.utilService.setTableMode = TABLE_MODE_TYPES.mesocycle;
    else this.utilService.setTableMode = undefined;
  }

  constructor(private utilService: UtilService) {}
}
