import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientsPageRoutingModule } from './clients-routing.module';
import { ClientsPage } from './clients.page';
import { ClientDetailPage } from './pages/client-detail/client-detail.page';

@NgModule({
  imports: [SharedModule, ClientsPageRoutingModule],
  declarations: [ClientsPage, ClientDetailPage],
})
export class ClientsPageModule {}
