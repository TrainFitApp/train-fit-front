import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPage } from './account.page';

const routes: Routes = [
  { path: '', component: AccountPage },
  {
    // Configuración > Cobros: lo que los clientes pagan al entrenador fuera de
    // la app. Separado de la suscripción a TrainFit (/tabs/subscription).
    path: 'payments',
    data: { parent: '/tabs/account' },
    loadChildren: () =>
      import('../payments/pages/payments-overview/payments-overview.module').then((m) => m.PaymentsOverviewPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountPageRoutingModule {}
