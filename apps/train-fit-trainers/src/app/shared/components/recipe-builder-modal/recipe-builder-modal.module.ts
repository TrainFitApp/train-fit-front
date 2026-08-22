import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeBuilderModalComponent } from './recipe-builder-modal.component';

@NgModule({
  imports: [SharedModule],
  declarations: [RecipeBuilderModalComponent],
  exports: [RecipeBuilderModalComponent],
})
export class RecipeBuilderModalModule {}
