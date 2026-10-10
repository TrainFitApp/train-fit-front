import { NgModule } from '@angular/core';
import { LocalNumberPipe } from './local-number.pipe';

// Módulo propio del pipe para que lo usen también los módulos pequeños que
// no importan SharedModule entero (SharedModule lo reexporta).
@NgModule({
  declarations: [LocalNumberPipe],
  exports: [LocalNumberPipe],
})
export class LocalNumberPipeModule {}
