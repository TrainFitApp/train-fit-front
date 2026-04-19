import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NutritionalObjectivesComponent } from './nutritional-objectives.component';
import { NutritionalObjectivesRoutingModule } from './nutritional-objectives-routing.module';

@NgModule({
  declarations: [NutritionalObjectivesComponent],
  imports: [SharedModule, NutritionalObjectivesRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NutritionalObjectivesModule { }
