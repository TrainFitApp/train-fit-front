import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerTabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TrainerTabsPage,
    children: [
      { path: '', redirectTo: 'clients', pathMatch: 'full' },
      {
        path: 'clients',
        loadChildren: () =>
          import('../clients/clients.module').then(
            (module) => module.TrainerClientsModule
          ),
      },
      {
        path: 'invite',
        loadChildren: () =>
          import('../invite/invite.module').then(
            (module) => module.TrainerInviteModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../profile/profile.module').then(
            (module) => module.TrainerProfileModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainerTabsRoutingModule {}
