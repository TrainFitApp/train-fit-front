import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pendingChangesGuard } from 'src/app/core/guards/pending-changes.guard';
import { DietTemplatesListPage } from './pages/diet-templates-list/diet-templates-list.page';
import { DietTemplateBuilderPage } from './pages/diet-template-builder/diet-template-builder.page';
import { DietPhasePickerPage } from './pages/diet-phase-picker/diet-phase-picker.page';

const routes: Routes = [
  { path: '', component: DietTemplatesListPage },
  // Sugerencias de dieta — "Empezar fase" desde la ficha del cliente: la
  // misma biblioteca, ordenada por lo que pide ese cliente, con el panel de
  // parámetros a la derecha. Ruta propia (y no un modo de la lista) para que
  // el atrás, el deep link y un F5 en medio de la elección funcionen solos.
  {
    path: 'for-phase/:clientId',
    component: DietPhasePickerPage,
    // Se entró desde la ficha del cliente, no desde la biblioteca.
    data: { parent: '/tabs/clients/:clientId' },
  },
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
  // Editar la dieta YA ASIGNADA a un cliente (cualquier revisión, con o sin
  // sourceTemplateId) — mismo builder, en modo "copia asignada": lee/escribe
  // el _id de esa copia directamente, nunca una plantilla de biblioteca (ver
  // diet-template-builder.page.ts#startForAssignedCopy).
  {
    path: 'edit-assignment/:clientId/:planId',
    component: DietTemplateBuilderPage,
    data: { parent: '/tabs/clients/:clientId' },
    canDeactivate: [pendingChangesGuard],
  },
  // Preparar la SIGUIENTE revisión de una fase: mismo builder, precargado
  // con el contenido vigente escalado a las kcal del query param (ver
  // diet-template-builder.page.ts#startForNextRevision).
  {
    path: 'next-revision/:clientId/:phaseId',
    component: DietTemplateBuilderPage,
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
