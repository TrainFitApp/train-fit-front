import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../shared/navigation/navigation.module';
import { CustomQuestionEditorModule } from '../../shared/components/custom-question-editor/custom-question-editor.module';
import { InvitesPageRoutingModule } from './invites-routing.module';
import { InvitesPage } from './invites.page';

@NgModule({
  imports: [SharedModule, NavigationModule, InvitesPageRoutingModule, CustomQuestionEditorModule],
  declarations: [InvitesPage],
})
export class InvitesPageModule {}
