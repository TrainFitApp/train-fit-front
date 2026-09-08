import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { PageHeaderComponent } from './page-header/page-header.component';
import { ScrollMemoryDirective } from './scroll-memory.directive';

@NgModule({
  imports: [CommonModule, IonicModule, TranslateModule],
  declarations: [PageHeaderComponent, ScrollMemoryDirective],
  exports: [PageHeaderComponent, ScrollMemoryDirective],
})
export class NavigationModule {}
