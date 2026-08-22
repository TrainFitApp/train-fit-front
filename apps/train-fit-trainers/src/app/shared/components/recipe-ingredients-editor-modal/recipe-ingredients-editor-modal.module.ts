import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeIngredientsEditorModalComponent } from './recipe-ingredients-editor-modal.component';

@NgModule({
  imports: [SharedModule],
  declarations: [RecipeIngredientsEditorModalComponent],
  exports: [RecipeIngredientsEditorModalComponent],
})
export class RecipeIngredientsEditorModalModule {}
