import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Banner de «Hazte Pro» de toda la app: franja plana teñida de naranja, sin
 * borde ni sombra. Recibe los textos ya traducidos y avisa al pulsar; quien lo
 * usa decide a dónde lleva y cuándo se muestra. El margen lo pone el
 * contenedor sobre el propio `app-premium-banner`.
 */
@Component({
  selector: 'app-premium-banner',
  templateUrl: './premium-banner.component.html',
  styleUrls: ['./premium-banner.component.scss'],
})
export class PremiumBannerComponent {
  @Input() public title = '';
  @Input() public subtitle = '';
  @Output() public readonly pressed = new EventEmitter<void>();
}
