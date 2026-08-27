import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectClientsModalModule } from '../clients/components/select-clients-modal/select-clients-modal.module';
import { ProtocolsPageRoutingModule } from './protocols-routing.module';
import { ProtocolsPage } from './protocols.page';

@NgModule({
  // SelectClientsModalModule: aplicar un protocolo usa el mismo selector de
  // clientes que el resto de operaciones en bloque.
  imports: [SharedModule, SelectClientsModalModule, ProtocolsPageRoutingModule],
  declarations: [ProtocolsPage],
})
export class ProtocolsPageModule {}