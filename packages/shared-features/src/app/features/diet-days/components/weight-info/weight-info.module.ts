import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';
import { DietDayPageModule } from '../../diet-day.module';
import { WeightInfoPage } from './weight-info.page';

const routes: Routes = [
  {
    path: '',
    component: WeightInfoPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    NgChartsModule,
    DietDayPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [WeightInfoPage]
})
export class WeightInfoPageModule {}
