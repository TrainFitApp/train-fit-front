import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { FormChecksPage } from './form-checks.page';
import { FormCheckReviewPage } from './form-check-review.page';

// Revisiones de técnica (docs/plan-medidas-multimedia.md): bandeja de vídeos
// que mandan los clientes y la pantalla para responder a cada uno.
const routes: Routes = [
  { path: '', component: FormChecksPage },
  { path: ':id', component: FormCheckReviewPage, data: { parent: '/tabs/form-checks' } },
];

@NgModule({
  imports: [SharedModule, NavigationModule, RouterModule.forChild(routes)],
  declarations: [FormChecksPage, FormCheckReviewPage],
})
export class FormChecksPageModule {}
