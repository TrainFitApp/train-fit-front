import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TrainerNavigationService } from '../../../core/services/trainer-navigation.service';

// Cabecera única de la app (2026-09). Antes cada pantalla repetía el mismo
// bloque `.tf-page-header` a mano y decidía por su cuenta qué poner a la
// izquierda: unas el botón de volver con un destino fijo, otras el
// ion-menu-button (que en escritorio está oculto, porque el sidebar es fijo:
// esas pantallas eran callejones sin salida) y una — el catálogo de
// ejercicios — directamente nada.
//
// Aquí la decisión es una sola y viene del enrutado: si la ruta declara
// `data.parent` hay "Volver"; si no, es sección raíz del menú y va el botón
// de menú (visible solo en móvil, donde el sidebar se colapsa).
@Component({
  selector: 'app-page-header',
  templateUrl: 'page-header.component.html',
})
export class PageHeaderComponent {
  // Título simple. Para títulos con marcado propio (el Planificador lo usa
  // como botón para renombrar la rutina) se proyecta con [pageTitle].
  @Input() public title = '';

  // Salida opcional para pantallas con una sub-vista propia dentro de la misma
  // ruta (el buscador a pantalla completa de Puntuaciones): ahí "Volver"
  // significa cerrar esa sub-vista, no abandonar la pantalla. Si nadie la
  // escucha, el botón navega con el criterio normal.
  @Output() public back = new EventEmitter<void>();

  constructor(public navigation: TrainerNavigationService) {}

  public get canGoBack(): boolean {
    return this.back.observed || this.navigation.canGoBack;
  }

  public goBack(): void {
    if (this.back.observed) {
      this.back.emit();
      return;
    }
    this.navigation.back();
  }
}
