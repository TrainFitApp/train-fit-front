import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingStatusPage } from './onboarding-status.page';

const routes: Routes = [
  {
    path: '',
    component: OnboardingStatusPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class OnboardingStatusPageRoutingModule {}
