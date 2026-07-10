import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ExercisesPageModule } from 'src/app/features/exercises/exercises.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SummmaryPageRoutingModule } from './summary-routing.module';
import { SummaryPage } from './summary.page';
import { ExcelImportComponent } from './components/excel-import/excel-import.component';

@NgModule({
  declarations: [SummaryPage, ExcelImportComponent],
  imports: [SharedModule, ExercisesPageModule, SummmaryPageRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SummaryPageModule {}
