import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SelectClientsModalComponent } from './select-clients-modal.component';

// Fase 3 Coach Pro — extraído del NgModule de clients por el mismo motivo
// que ProductSearchModalModule: el constructor de automatizaciones necesita
// este mismo selector, y un componente no puede declararse en dos NgModules.
// Importar ClientsPageModule entero desde automations tampoco valdría:
// arrastraría su RouterModule.forChild y registraría sus rutas por segunda
// vez.
@NgModule({
  imports: [SharedModule],
  declarations: [SelectClientsModalComponent],
  exports: [SelectClientsModalComponent],
})
export class SelectClientsModalModule {}
