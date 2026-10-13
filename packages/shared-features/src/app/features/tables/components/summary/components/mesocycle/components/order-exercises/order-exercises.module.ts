import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExerciseOrderListComponent } from './exercise-order-list.component';
import { OrderExercisesPage } from './order-exercises.page';

@NgModule({
  declarations: [OrderExercisesPage, ExerciseOrderListComponent],
  imports: [SharedModule],
  exports: [OrderExercisesPage, ExerciseOrderListComponent],
})
export class OrderExercisesPageModule {}
