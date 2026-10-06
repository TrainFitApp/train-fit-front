import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { SelectClientsModalModule } from '../clients/components/select-clients-modal/select-clients-modal.module';
import { ProtocolsPageRoutingModule } from './protocols-routing.module';
import { ProtocolsPage } from './protocols.page';
import { MacroAdjustModule } from '../../shared/components/macro-adjust/macro-adjust.module';

@NgModule({
  // SelectClientsModalModule: aplicar un protocolo usa el mismo selector de
  // clientes que el resto de operaciones en bloque.
  // MacroAdjustModule: el objetivo de kcal y macros se edita igual que en la ficha.
  imports: [SharedModule, NavigationModule, SelectClientsModalModule, MacroAdjustModule, ProtocolsPageRoutingModule],
  declarations: [ProtocolsPage],
})
export class ProtocolsPageModule {}