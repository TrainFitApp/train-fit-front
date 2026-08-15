import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TutorialsPage } from './tutorials.page';

const routes: Routes = [
  {
    path: '',
    component: TutorialsPage,
  },
];

@NgModule({
  declarations: [TutorialsPage],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class TutorialsPageModule {}
