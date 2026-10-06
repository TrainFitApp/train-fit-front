import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { DateFieldComponent, DatePickerSheetComponent } from './date-field.component';

// El campo y la hoja con ion-datetime que abre (sustituye al
// <input type="date|time"> nativo).
@NgModule({
  imports: [CommonModule, IonicModule, TranslateModule],
  declarations: [DateFieldComponent, DatePickerSheetComponent],
  exports: [DateFieldComponent],
})
export class DateFieldModule {}
