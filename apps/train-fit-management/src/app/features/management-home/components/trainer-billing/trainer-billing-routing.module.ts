import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerBillingPage } from './trainer-billing.page';

// Bandeja de casos (sin id) y ficha de un entrenador (con id).
const routes: Routes = [
  { path: '', component: TrainerBillingPage },
  { path: ':userId', component: TrainerBillingPage },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainerBillingPageRoutingModule {}
