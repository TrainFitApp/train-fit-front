import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceConfigPage } from './maintenance-config.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceConfigPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceConfigPageRoutingModule {}
