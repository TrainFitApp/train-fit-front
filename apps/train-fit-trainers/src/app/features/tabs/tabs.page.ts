import { Component } from '@angular/core';

const TRAINER_TABS = {
  clients: 'clients',
  invites: 'invites',
  profile: 'profile',
} as const;

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  public TABS = TRAINER_TABS;
}
