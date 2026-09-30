import { Component, Input } from '@angular/core';
import { NavigationService } from 'src/app/core/services/util/navigation.service';

/**
 * Card de venta para quien no puede subir fotos ni vídeos (decisión 1 del
 * plan: gratis para entrenadores, premium y clientes con entrenador activo).
 * Mismo lenguaje que el `premium-banner` de perfil y dieta. En el estado
 * vacío enseña el comparador de muestra, sin fotos de nadie.
 */
@Component({
  selector: 'app-premium-media-card',
  templateUrl: './premium-media-card.component.html',
  styleUrls: ['./premium-media-card.component.scss'],
})
export class PremiumMediaCardComponent {
  @Input() public variant: 'photos' | 'videos' = 'photos';
  // true: ocupa el estado vacío, con la muestra del comparador.
  @Input() public showcase = false;

  constructor(private navigationService: NavigationService) {}

  public goToPremium(): void {
    this.navigationService.goToPremium();
  }
}
