import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableCardPage } from './components/table-card/table-card.page';
import { SearchTablesPage } from './search-tables.page';

const routes: Routes = [
  {
    path: '',
    component: SearchTablesPage,
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [SearchTablesPage, TableCardPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SearchTablesPageModule {}
