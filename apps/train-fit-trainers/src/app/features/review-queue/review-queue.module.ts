import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { ReviewQueuePage } from './review-queue.page';

// Bandeja «Por revisar»: check-ins, revisiones de técnica y cuestionarios
// de alta que esperan respuesta. Cada fila abre la pantalla donde se revisa.
const routes: Routes = [{ path: '', component: ReviewQueuePage }];

@NgModule({
  imports: [SharedModule, NavigationModule, RouterModule.forChild(routes)],
  declarations: [ReviewQueuePage],
})
export class ReviewQueuePageModule {}
