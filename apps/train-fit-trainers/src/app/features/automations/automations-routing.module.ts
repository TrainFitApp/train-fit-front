import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutomationsPage } from './automations.page';
import { RuleBuilderPage } from './pages/rule-builder/rule-builder.page';

const routes: Routes = [
  { path: '', component: AutomationsPage },
  // ':id' acepta también el literal 'new'. Ruta propia y no un panel dentro
  // del listado: una regla es un formulario largo, y con el botón de volver
  // del móvil el usuario espera salir de la regla, no de la sección.
  { path: ':id', component: RuleBuilderPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutomationsPageRoutingModule {}
