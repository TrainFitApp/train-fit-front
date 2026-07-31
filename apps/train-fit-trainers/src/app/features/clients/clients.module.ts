import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerSharedModule } from '../../trainer-shared.module';
import { TrainerClientsPage } from './clients.page';
import { TrainerClientDetailPage } from './client-detail.page';

const routes: Routes = [
  { path: '', component: TrainerClientsPage, pathMatch: 'full' },
  { path: ':clientId', component: TrainerClientDetailPage },
];

@NgModule({
  imports: [TrainerSharedModule, RouterModule.forChild(routes)],
  declarations: [TrainerClientsPage, TrainerClientDetailPage],
})
export class TrainerClientsModule {}
