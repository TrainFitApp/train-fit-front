import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReferencesPage } from './references.page';

const routes: Routes = [
  {
    path: '',
    component: ReferencesPage,
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [ReferencesPage],
})
export class ReferencesPageModule {}
