import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvitesPage } from './invites.page';

const routes: Routes = [
  {
    path: '',
    component: InvitesPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class InvitesPageRoutingModule {}
