import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnvConfigPage } from './env-config.page';

const routes: Routes = [
  {
    path: '',
    component: EnvConfigPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnvConfigPageRoutingModule {}
