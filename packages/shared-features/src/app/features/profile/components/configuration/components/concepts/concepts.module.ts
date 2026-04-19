import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConceptsPage } from './concepts.page';

const routes: Routes = [
  {
    path: '',
    component: ConceptsPage,
  },
];

@NgModule({
  declarations: [ConceptsPage],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class ConceptsPageModule {}
