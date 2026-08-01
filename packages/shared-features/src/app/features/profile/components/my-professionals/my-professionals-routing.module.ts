import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfessionalsPage } from './my-professionals.page';

const routes: Routes = [
  {
    path: '',
    component: MyProfessionalsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MyProfessionalsPageRoutingModule {}
