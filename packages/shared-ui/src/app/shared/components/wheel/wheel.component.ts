import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  clampWheelIndex,
  WheelOption,
  wheelIndexFromScroll,
  wheelKeyTarget,
  wheelScrollTop,
} from './wheel.util';

let nextWheelId = 0;

// Una columna de rueda con la forma de las del registro (peso, altura y fecha
// de nacimiento): filas de 52px que encajan solas en el centro, la elegida en
// grande y las demás cada vez más apagadas. Se usa dentro de <app-wheel-group>,
// que pone la banda de la fila elegida y deja varias ruedas lado a lado.
//
//   <app-wheel-group>
//     <app-wheel [options]="options" [(index)]="first"></app-wheel>
//   </app-wheel-group>
//
// El scroll y el encaje son nativos (scroll-snap): aquí solo se lee qué fila
// quedó en el centro. `index` se emite en cuanto cambia la fila central, no al
// soltar, así que quien la use siempre tiene a mano la fila que se ve elegida.
@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrls: ['./wheel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WheelComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() public options: WheelOption[] = [];
  // Fila elegida; con [(index)] se mantiene sola.
  @Input() public index = 0;
  @Input() public ariaLabel = '';
  // Ancho en px. 84 es el de las ruedas del registro; el texto largo (FALLO,
  // meses) pide más.
  @Input() public width = 84;
  @Output() public indexChange = new EventEmitter<number>();

  @ViewChild('scroller', { static: true }) private scroller: ElementRef<HTMLElement>;

  @HostBinding('style.width.px') public get hostWidth(): number {
    return this.width;
  }

  public activeIndex = 0;
  public readonly trackByIndex = (index: number): number => index;

  private readonly wheelId = ++nextWheelId;
  // Alto real de una fila, leído del DOM (lo fija el CSS, que es el único que
  // lo sabe). 0 mientras la rueda no se ve: sin diseño no hay medidas.
  private itemHeight = 0;
  private resizeObserver: ResizeObserver | null = null;
  private readonly stopTouch = (event: Event): void => event.stopPropagation();

  constructor(private zone: NgZone, private cdr: ChangeDetectorRef) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['index'] && !changes['options']) return;
    const next = clampWheelIndex(this.index, this.options.length);
    const moved = next !== this.activeIndex;
    this.activeIndex = next;
    // Con opciones nuevas el DOM todavía es el viejo: se recoloca cuando ya
    // están pintadas.
    if (changes['options'] && !changes['options'].firstChange) {
      requestAnimationFrame(() => this.sync());
    } else if (moved) {
      this.scrollToIndex(next, false);
    }
  }

  public ngAfterViewInit(): void {
    const scroller = this.scroller.nativeElement;
    // Fuera de la zona: el scroll dispara decenas de eventos por segundo y
    // solo interesa el momento en que cambia la fila central.
    this.zone.runOutsideAngular(() => {
      scroller.addEventListener('scroll', this.onScroll, { passive: true });
      scroller.addEventListener('keydown', this.onKeydown);
      // Ionic arrastra una hoja con cualquier gesto vertical que no empiece
      // en un ion-content: sin cortar aquí el toque, mover la rueda movería
      // (y cerraría) la hoja en la que está.
      scroller.addEventListener('touchstart', this.stopTouch, { passive: true });
      scroller.addEventListener('mousedown', this.stopTouch);
    });

    // Dentro de un modal o de un slide la rueda se crea antes de verse (sin
    // diseño no se puede colocar el scroll): el observador avisa en cuanto
    // tiene tamaño y recoloca también si cambia (girar el móvil).
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.sync());
      this.resizeObserver.observe(scroller);
    }
    this.sync();
  }

  public ngOnDestroy(): void {
    const scroller = this.scroller.nativeElement;
    scroller.removeEventListener('scroll', this.onScroll);
    scroller.removeEventListener('keydown', this.onKeydown);
    scroller.removeEventListener('touchstart', this.stopTouch);
    scroller.removeEventListener('mousedown', this.stopTouch);
    this.resizeObserver?.disconnect();
  }

  public optionId(index: number): string {
    return `wheel-${this.wheelId}-option-${index}`;
  }

  public select(index: number): void {
    this.scrollToIndex(index, true);
  }

  private readonly onScroll = (): void => {
    if (!this.itemHeight) return;
    const next = wheelIndexFromScroll(
      this.scroller.nativeElement.scrollTop,
      this.itemHeight,
      this.options.length
    );
    if (next === this.activeIndex) return;
    this.zone.run(() => {
      this.activeIndex = next;
      this.cdr.markForCheck();
      this.indexChange.emit(next);
    });
  };

  private readonly onKeydown = (event: KeyboardEvent): void => {
    const target = wheelKeyTarget(event.key, this.activeIndex, this.options.length);
    if (target === null) return;
    event.preventDefault();
    this.scrollToIndex(target, true);
  };

  // Coloca el scroll en la fila elegida si ya hay medidas.
  private sync(): void {
    if (!this.measure()) return;
    const scroller = this.scroller.nativeElement;
    const top = wheelScrollTop(this.activeIndex, this.itemHeight, this.options.length);
    if (Math.abs(scroller.scrollTop - top) > 0.5) scroller.scrollTop = top;
  }

  private measure(): boolean {
    const item = this.scroller.nativeElement.querySelector<HTMLElement>('.wheel-item');
    const height = item?.offsetHeight ?? 0;
    if (!height) return false;
    this.itemHeight = height;
    return true;
  }

  private scrollToIndex(index: number, smooth: boolean): void {
    if (!this.itemHeight) return;
    const reduceMotion =
      typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.scroller.nativeElement.scrollTo({
      top: wheelScrollTop(index, this.itemHeight, this.options.length),
      behavior: smooth && !reduceMotion ? 'smooth' : 'auto',
    });
  }
}
