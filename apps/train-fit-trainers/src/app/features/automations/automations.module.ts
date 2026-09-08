import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { SelectClientsModalModule } from '../clients/components/select-clients-modal/select-clients-modal.module';
import { AutomationsPageRoutingModule } from './automations-routing.module';
import { AutomationsPage } from './automations.page';
import { RuleBuilderPage } from './pages/rule-builder/rule-builder.page';

@NgModule({
  // SelectClientsModalModule: el constructor de reglas reutiliza el mismo
  // selector de clientes que "aplicar en bloque" en vez de escribir un
  // segundo picker (ver rule-builder.page.ts).
  imports: [SharedModule, NavigationModule, SelectClientsModalModule, AutomationsPageRoutingModule],
  declarations: [AutomationsPage, RuleBuilderPage],
})
export class AutomationsPageModule {}
