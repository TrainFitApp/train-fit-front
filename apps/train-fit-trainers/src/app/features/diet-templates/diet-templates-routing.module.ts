import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pendingChangesGuard } from 'src/app/core/guards/pending-changes.guard';
import { DietTemplatesListPage } from './pages/diet-templates-list/diet-templates-list.page';
import { DietTemplateBuilderPage } from './pages/diet-template-builder/diet-template-builder.page';

const routes: Routes = [
  { path: '', component: DietTemplatesListPage },
  // "Crear dieta" — mismo builder, en modo "para este cliente" en vez de
  // "editar plantilla existente" (ver diet-template-builder.page.ts).
  {
    path: 'for-client/:clientId',
    component: DietTemplateBuilderPage,
    // Se entró desde la ficha del cliente, no desde la biblioteca: el padre
    // canónico es esa ficha.
    data: { parent: '/tabs/clients/:clientId' },
    canDeactivate: [pendingChangesGuard],
  },
  {
    path: ':id',
    component: DietTemplateBuilderPage,
    data: { parent: '/tabs/diet-templates' },
    canDeactivate: [pendingChangesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DietTemplatesPageRoutingModule {}
