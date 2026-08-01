import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full',
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'clients',
        loadChildren: () =>
          import('src/app/features/clients/clients.module').then(
            (m) => m.ClientsPageModule
          ),
      },
      {
        path: 'invites',
        loadChildren: () =>
          import('src/app/features/invites/invites.module').then(
            (m) => m.InvitesPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('src/app/features/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
