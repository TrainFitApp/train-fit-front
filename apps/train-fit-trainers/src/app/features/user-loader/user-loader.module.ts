import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerSharedModule } from '../../trainer-shared.module';
import { TrainerUserLoaderPage } from './user-loader.page';

const routes: Routes = [{ path: '', component: TrainerUserLoaderPage }];

@NgModule({
  imports: [TrainerSharedModule, RouterModule.forChild(routes)],
  declarations: [TrainerUserLoaderPage],
})
export class TrainerUserLoaderModule {}
