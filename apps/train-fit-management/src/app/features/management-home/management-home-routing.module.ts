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
  {
    path: 'repo-config',
    loadChildren: () =>
      import('./components/repo-config/repo-config.module').then(
        (m) => m.RepoConfigPageModule
      ),
  },
  {
    path: 'db-config',
    loadChildren: () =>
      import('./components/db-config/db-config.module').then(
        (m) => m.DbConfigPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementHomePageRoutingModule {}
