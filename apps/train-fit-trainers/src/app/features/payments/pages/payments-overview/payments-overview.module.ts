import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavigationModule } from '../../../../shared/navigation/navigation.module';
import { DateFieldComponent } from '../../../../shared/components/date-field/date-field.component';
import { PaymentsSharedModule } from '../../payments-shared.module';
import { PaymentsOverviewPage } from './payments-overview.page';

@NgModule({
  imports: [
    SharedModule,
    NavigationModule,
    DateFieldComponent,
    PaymentsSharedModule,
    RouterModule.forChild([{ path: '', component: PaymentsOverviewPage }]),
  ],
  declarations: [PaymentsOverviewPage],
})
export class PaymentsOverviewPageModule {}
