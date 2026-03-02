import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { DataSheetPage } from './data-sheet.page';

const routes: Routes = [
  {
    path: '',
    component: DataSheetPage,
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [DataSheetPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DataSheetPageModule {}