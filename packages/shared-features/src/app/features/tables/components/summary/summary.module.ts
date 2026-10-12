import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ExercisesPageModule } from 'src/app/features/exercises/exercises.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssistantModule } from 'src/app/features/assistant/assistant.module';
import { SummmaryPageRoutingModule } from './summary-routing.module';
import { SummaryPage } from './summary.page';

@NgModule({
  declarations: [SummaryPage],
  imports: [SharedModule, ExercisesPageModule, AssistantModule, SummmaryPageRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SummaryPageModule {}
