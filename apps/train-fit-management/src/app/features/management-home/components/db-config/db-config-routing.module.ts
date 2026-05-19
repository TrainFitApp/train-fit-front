import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DbConfigPage } from './db-config.page';

const routes: Routes = [
  {
    path: '',
    component: DbConfigPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DbConfigPageRoutingModule {}
