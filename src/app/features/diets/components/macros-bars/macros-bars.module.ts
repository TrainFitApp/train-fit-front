import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { MacrosBarsComponent } from './macros-bars.component';

@NgModule({
  declarations: [MacrosBarsComponent],
  imports: [SharedModule],
  exports: [MacrosBarsComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MacrosBarsModule { }
