import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerSharedModule } from '../../trainer-shared.module';
import { TrainerInvitePage } from './invite.page';

const routes: Routes = [{ path: '', component: TrainerInvitePage }];

@NgModule({
  imports: [TrainerSharedModule, RouterModule.forChild(routes)],
  declarations: [TrainerInvitePage],
})
export class TrainerInviteModule {}
