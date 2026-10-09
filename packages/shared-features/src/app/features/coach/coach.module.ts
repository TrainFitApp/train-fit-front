import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoachPageRoutingModule } from './coach-routing.module';
import { CoachPage } from './coach.page';
import { CoachPlansSheetComponent } from './components/coach-plans-sheet/coach-plans-sheet.component';
import { CoachProfessionalsSheetComponent } from './components/coach-professionals-sheet/coach-professionals-sheet.component';

@NgModule({
  imports: [SharedModule, CoachPageRoutingModule],
  declarations: [CoachPage, CoachPlansSheetComponent, CoachProfessionalsSheetComponent],
})
export class CoachPageModule {}
