import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientsPage } from './clients.page';
import { ClientDetailPage } from './pages/client-detail/client-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ClientsPage,
  },
  {
    path: ':id',
    component: ClientDetailPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ClientsPageRoutingModule {}
