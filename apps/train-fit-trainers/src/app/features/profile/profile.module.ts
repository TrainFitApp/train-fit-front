import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerSharedModule } from '../../trainer-shared.module';
import { TrainerProfilePage } from './profile.page';

const routes: Routes = [{ path: '', component: TrainerProfilePage }];

@NgModule({
  imports: [TrainerSharedModule, RouterModule.forChild(routes)],
  declarations: [TrainerProfilePage],
})
export class TrainerProfileModule {}
