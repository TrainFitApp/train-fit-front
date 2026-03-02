import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { SuggestionsPage } from './suggestions.page';

const routes: Routes = [
  {
    path: '',
    component: SuggestionsPage,
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [SuggestionsPage],
})
export class SuggestionsPageModule {}
