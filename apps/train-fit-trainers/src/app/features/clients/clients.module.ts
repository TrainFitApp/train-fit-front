import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientsPageRoutingModule } from './clients-routing.module';
import { ClientsPage } from './clients.page';
import { ClientDetailPage } from './pages/client-detail/client-detail.page';
import { SelectClientsModalComponent } from './components/select-clients-modal/select-clients-modal.component';
import { ApplyDietTemplateModalComponent } from './components/apply-diet-template-modal/apply-diet-template-modal.component';
import { ProductSearchModalModule } from '../../shared/components/product-search-modal/product-search-modal.module';

@NgModule({
  imports: [SharedModule, ClientsPageRoutingModule, ProductSearchModalModule],
  declarations: [ClientsPage, ClientDetailPage, SelectClientsModalComponent, ApplyDietTemplateModalComponent],
})
export class ClientsPageModule {}
