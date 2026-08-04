import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCheckinsPage } from './my-checkins.page';

const routes: Routes = [
  {
    path: '',
    component: MyCheckinsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MyCheckinsPageRoutingModule {}
