import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { FormCheckReviewPage } from './form-check-review.page';

// Revisiones de técnica (docs/plan-medidas-multimedia.md): la pantalla para
// responder a cada vídeo. La lista vive en la bandeja «Por revisar».
const routes: Routes = [
  { path: '', redirectTo: '/tabs/review?type=form_check', pathMatch: 'full' },
  { path: ':id', component: FormCheckReviewPage, data: { parent: '/tabs/review' } },
];

@NgModule({
  imports: [SharedModule, NavigationModule, RouterModule.forChild(routes)],
  declarations: [FormCheckReviewPage],
})
export class FormChecksPageModule {}
