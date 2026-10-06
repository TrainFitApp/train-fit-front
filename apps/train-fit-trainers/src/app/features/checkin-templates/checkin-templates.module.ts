import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckinFieldSelectorModule } from '../../shared/components/checkin-field-selector/checkin-field-selector.module';
import { ApplyCheckinTemplateModalModule } from './components/apply-checkin-template-modal/apply-checkin-template-modal.module';
import { CustomQuestionEditorModule } from '../../shared/components/custom-question-editor/custom-question-editor.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { CheckinTemplatesPageRoutingModule } from './checkin-templates-routing.module';
import { CheckinTemplatesPage } from './checkin-templates.page';

@NgModule({
  imports: [SharedModule, NavigationModule, CheckinTemplatesPageRoutingModule, CheckinFieldSelectorModule, CustomQuestionEditorModule, ApplyCheckinTemplateModalModule],
  declarations: [CheckinTemplatesPage],
})
export class CheckinTemplatesPageModule {}
