import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyFormChecksPage } from './my-form-checks.page';

const routes: Routes = [{ path: '', component: MyFormChecksPage }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [MyFormChecksPage],
})
export class MyFormChecksPageModule {}
