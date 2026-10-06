import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomQuestionEditorComponent } from './custom-question-editor.component';

@NgModule({
  imports: [SharedModule],
  declarations: [CustomQuestionEditorComponent],
  exports: [CustomQuestionEditorComponent],
})
export class CustomQuestionEditorModule {}
