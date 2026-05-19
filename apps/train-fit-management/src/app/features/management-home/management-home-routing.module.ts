import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagementHomePage } from './management-home.page';

const routes: Routes = [
  {
    path: '',
    component: ManagementHomePage,
  },
  {
    path: 'env-config',
    loadChildren: () =>
      import('./components/env-config/env-config.module').then(
        (m) => m.EnvConfigPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementHomePageRoutingModule {}
