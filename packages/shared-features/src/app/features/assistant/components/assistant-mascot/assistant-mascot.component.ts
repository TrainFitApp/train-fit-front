import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, inject } from '@angular/core';
import { MascotMood } from '../../assistant-view.util';

// La mascota de trAInfit: una mancuerna vista de frente con la cara en la
// barra. Sus placas son la barra de energía: se llenan de naranja con el ATP
// que le queda. Formas geométricas exactas (nada de dibujo a mano) y
// animaciones solo de estado: parpadeo en reposo, «series» mientras piensa,
// cara de contenta al terminar, ojos cerrados dormida. Con movimiento
// reducido, quieta.
@Component({
  selector: 'app-assistant-mascot',
  templateUrl: './assistant-mascot.component.html',
  styleUrls: ['./assistant-mascot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssistantMascotComponent implements OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);

  @Input() public mood: MascotMood = 'idle';
  // 0..1: ATP que le queda.
  @Input() public set level(value: number | null | undefined) {
    this.fill = Math.max(0, Math.min(1, Number(value) || 0));
  }
  // Ancho en px; el alto es 3/5.
  @Input() public size = 44;
  @Input() public label = '';

  public fill = 1;
  public waving = false;
  private waveTimer: ReturnType<typeof setTimeout> | null = null;

  // El hueco de la carga dentro de cada placa grande (la placa va de y = 3 a
  // 45; la carga, 1,6 hacia dentro, deja ver el borde).
  private static readonly CHARGE_TOP = 4.6;
  private static readonly CHARGE_HEIGHT = 38.8;

  @HostBinding('style.width.px') public get width(): number {
    return this.size;
  }

  @HostBinding('style.height.px') public get height(): number {
    return Math.round(this.size * 0.6);
  }

  public get chargeY(): number {
    return AssistantMascotComponent.CHARGE_TOP + AssistantMascotComponent.CHARGE_HEIGHT * (1 - this.fill);
  }

  public get chargeHeight(): number {
    return AssistantMascotComponent.CHARGE_HEIGHT * this.fill;
  }

  /** Saludo corto (al tocarla o al pasar el ratón). */
  public wave(): void {
    if (this.mood === 'asleep' || this.mood === 'thinking') return;
    this.waving = true;
    this.cdr.markForCheck();
    if (this.waveTimer) clearTimeout(this.waveTimer);
    this.waveTimer = setTimeout(() => {
      this.waving = false;
      this.cdr.markForCheck();
    }, 700);
  }

  public ngOnDestroy(): void {
    if (this.waveTimer) clearTimeout(this.waveTimer);
  }
}
