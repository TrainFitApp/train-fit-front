import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrderExercisesPage } from './order-exercises.page';

@NgModule({
  declarations: [OrderExercisesPage],
  imports: [SharedModule],
  exports: [OrderExercisesPage],
})
export class OrderExercisesPageModule {}
