import { ChangeDetectionStrategy, Component } from '@angular/core';

// Varias <app-wheel> lado a lado con la banda de la fila elegida por detrás
// (la franja con dos líneas y un brillo naranja del registro). Lo que se
// proyecta dentro, ruedas y separadores, queda centrado en el alto de la
// rueda. Los colores son variables --wheel-* con respaldo oscuro: quien lo
// use sobre otro fondo las redefine aquí.
@Component({
  selector: 'app-wheel-group',
  templateUrl: './wheel-group.component.html',
  styleUrls: ['./wheel-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WheelGroupComponent {}
