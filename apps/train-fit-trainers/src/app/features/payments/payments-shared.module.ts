import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { DateFieldComponent } from '../../shared/components/date-field/date-field.component';
import { ChargeDetailPanelComponent } from './components/charge-detail-panel/charge-detail-panel.component';
import { ChargeFormPanelComponent } from './components/charge-form-panel/charge-form-panel.component';
import { ClientPaymentsCardComponent } from './components/client-payments-card/client-payments-card.component';
import { ClientPaymentsLedgerComponent } from './components/client-payments-ledger/client-payments-ledger.component';
import { FeePlanPanelComponent } from './components/fee-plan-panel/fee-plan-panel.component';
import { PaymentBalanceBarComponent } from './components/payment-balance-bar/payment-balance-bar.component';
import { PaymentRegisterPanelComponent } from './components/payment-register-panel/payment-register-panel.component';
import { PaymentSettingsPanelComponent } from './components/payment-settings-panel/payment-settings-panel.component';
import { PaymentsSheetComponent } from './components/payments-sheet/payments-sheet.component';

// Piezas de Cobros compartidas por la ficha del cliente (Gestión > Cobros y
// la tarjeta del Resumen) y por Configuración > Cobros.
@NgModule({
  imports: [SharedModule, DateFieldComponent],
  declarations: [
    PaymentsSheetComponent,
    PaymentBalanceBarComponent,
    PaymentRegisterPanelComponent,
    ChargeFormPanelComponent,
    FeePlanPanelComponent,
    ChargeDetailPanelComponent,
    ClientPaymentsLedgerComponent,
    ClientPaymentsCardComponent,
    PaymentSettingsPanelComponent,
  ],
  exports: [
    PaymentsSheetComponent,
    PaymentBalanceBarComponent,
    PaymentRegisterPanelComponent,
    ChargeDetailPanelComponent,
    ClientPaymentsLedgerComponent,
    ClientPaymentsCardComponent,
    PaymentSettingsPanelComponent,
  ],
})
export class PaymentsSharedModule {}
