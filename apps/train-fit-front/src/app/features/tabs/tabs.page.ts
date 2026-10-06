import { Component, effect } from '@angular/core';
import { Router } from '@angular/router';
import { CoachService } from 'src/app/core/services/coach/coach.service';
import { NotificationsService } from 'src/app/core/services/notifications/notifications.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { UtilService } from 'src/app/core/services/util/util.service';
import { TABS } from 'src/app/shared/constants/tabs';
import { TABLE_MODE_TYPES } from 'src/app/shared/constants/table-mode';

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

  constructor(
    private utilService: UtilService,
    private router: Router,
    private navigationService: NavigationService,
    public coachService: CoachService,
    public notificationsService: NotificationsService
  ) {
    // Sin profesional ni invitación el tab Coach desaparece en el acto. Si el
    // cliente estaba dentro (acaba de rechazar su última invitación o de
    // desvincularse), se le lleva al tab de inicio en vez de dejarle en una
    // pantalla cuyo tab ya no existe.
    effect(() => {
      if (!this.coachService.hasCoachRelation() && this.router.url.startsWith(`/tabs/${TABS.coach}`)) {
        this.navigationService.goToTabsPage();
      }
    });
  }
}
