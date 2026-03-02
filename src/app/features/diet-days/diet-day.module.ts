import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  imports: [SharedModule],
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DietDayPageModule {}
