import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepoConfigPage } from './repo-config.page';

const routes: Routes = [
  {
    path: '',
    component: RepoConfigPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepoConfigPageRoutingModule {}
