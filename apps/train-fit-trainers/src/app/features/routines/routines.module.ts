import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { RoutinesPageRoutingModule } from './routines-routing.module';
import { RoutinesPage } from './routines.page';
import { RoutineBuilderPage } from './pages/routine-builder/routine-builder.page';
import { BlockEditorPanelComponent } from './components/block-editor-panel/block-editor-panel.component';
import { ChipInputComponent } from './components/chip-input/chip-input.component';
import { TemplateExercisePanelComponent } from './components/template-exercise-panel/template-exercise-panel.component';

@NgModule({
  imports: [SharedModule, NavigationModule, RoutinesPageRoutingModule],
  declarations: [
    RoutinesPage,
    RoutineBuilderPage,
    BlockEditorPanelComponent,
    ChipInputComponent,
    TemplateExercisePanelComponent,
  ],
})
export class RoutinesPageModule {}
