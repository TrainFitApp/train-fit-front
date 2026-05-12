import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRuntimePolicyPage } from './app-runtime-policy.page';

const routes: Routes = [
  {
    path: '',
    component: AppRuntimePolicyPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRuntimePolicyRoutingModule {}
