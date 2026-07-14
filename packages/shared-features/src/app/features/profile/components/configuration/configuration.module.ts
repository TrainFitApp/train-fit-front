import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigurationPageRoutingModule } from './configuration-routing.module';
import { ConfigurationPage } from './configuration.page';
import { AdPreferencesPage } from './components/ad-preferences/ad-preferences.page';
import { EditorPage } from './components/editor/editor.page';
import { NutritionEditorPage } from './components/editor/components/nutrition-editor/nutrition-editor.page';
import { GoalListPage } from './components/goal-list/goal-list.page';

@NgModule({
  declarations: [
    ConfigurationPage,
    AdPreferencesPage,
    EditorPage,
    NutritionEditorPage,
    GoalListPage,
  ],
  imports: [SharedModule, ConfigurationPageRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ConfigurationPageModule {}
