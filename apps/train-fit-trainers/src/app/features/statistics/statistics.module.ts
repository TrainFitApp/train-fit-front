import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatisticsPageRoutingModule } from './statistics-routing.module';
import { StatisticsPage } from './statistics.page';
import { EsNumberPipe } from './es-number.pipe';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule, StatisticsPageRoutingModule],
  declarations: [StatisticsPage, EsNumberPipe],
})
export class StatisticsPageModule {}
