import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NutritionalObjectivesComponent } from './nutritional-objectives.component';

@NgModule({
    declarations: [NutritionalObjectivesComponent],
    imports: [SharedModule],
    exports: [NutritionalObjectivesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class NutritionalObjectivesModule { }
