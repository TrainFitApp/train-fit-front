import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NumericKeypadService } from './numeric-keypad.service';

// Clase que se pone en <ion-app> mientras el teclado está abierto — ver
// global.scss: encoge ion-app para dejarle sitio, como hace el webview con
// el teclado del sistema.
const ION_APP_KEYPAD_OPEN_CLASS = 'numeric-keypad-open';

/**
 * Teclado numérico a medida. Se monta UNA vez por app, en app.component.html
 * y FUERA de <ion-app> (que con `contain: layout` sería el bloque contenedor
 * del position:fixed y, al encogerse, arrastraría el teclado consigo). Los
 * inputs que lo usan se marcan con appNumericKeypad.
 */
@Component({
  selector: 'app-numeric-keypad',
  templateUrl: './numeric-keypad.component.html',
  styleUrls: ['./numeric-keypad.component.scss'],
})
export class NumericKeypadComponent implements OnInit, OnDestroy {
  // Asignado en el constructor, no como inicializador de campo: con
  // useDefineForClassFields los inicializadores de campo corren ANTES de
  // que se asigne la parameter property inyectada, dejando
  // this.numericKeypadService en undefined en ese punto ("Cannot read
  // properties of undefined (reading 'visible$')").
  public readonly visible$: Observable<boolean>;
  public readonly digitRows: string[][] = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ];

  private visible = false;
  private visibleSubscription?: Subscription;
  private ionAppTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private el: ElementRef<HTMLElement>,
    private renderer: Renderer2,
    private numericKeypadService: NumericKeypadService
  ) {
    this.visible$ = this.numericKeypadService.visible$;
  }

  ngOnInit(): void {
    this.visibleSubscription = this.visible$.subscribe((visible) => {
      this.visible = visible;
      // El foco llega en el mousedown del toque y el click en su mouseup, los
      // dos seguidos en la misma tarea. Si ion-app se encogiera aquí, un
      // input de la franja inferior (la que va a ocupar el teclado) quedaría
      // fuera de ion-app antes del mouseup: el click se redirigiría al
      // ancestro común (body), onDocumentClick lo tomaría por un toque en
      // otro sitio y cerraría el teclado recién abierto. Por eso se encoge
      // en la tarea siguiente, ya despachado el click.
      clearTimeout(this.ionAppTimer);
      this.ionAppTimer = setTimeout(() => this.syncIonAppClass());
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.ionAppTimer);
    this.visibleSubscription?.unsubscribe();
  }

  private syncIonAppClass(): void {
    const ionApp = document.querySelector('ion-app');
    if (!ionApp) return;
    if (this.visible) {
      this.renderer.addClass(ionApp, ION_APP_KEYPAD_OPEN_CLASS);
    } else {
      this.renderer.removeClass(ionApp, ION_APP_KEYPAD_OPEN_CLASS);
    }
  }

  // Cerrar al tocar cualquier cosa que no sea el propio teclado ni otro
  // input suyo (la comprobación del input la hace el servicio).
  @HostListener('document:click', ['$event.target'])
  onDocumentClick(target: EventTarget | null): void {
    if (!this.visible || (target instanceof Node && this.el.nativeElement.contains(target))) {
      return;
    }
    this.numericKeypadService.hideKeyboardIfInteractingElsewhere(target);
  }

  public tapDigit(digit: string): void {
    this.numericKeypadService.appendChar(digit);
  }

  public tapDecimalPoint(): void {
    this.numericKeypadService.appendChar('.');
  }

  public tapBackspace(): void {
    this.numericKeypadService.backspace();
  }

  public tapHideKeyboard(): void {
    this.numericKeypadService.hideKeyboard();
  }

  public tapIncrement(): void {
    this.numericKeypadService.incrementValue(1);
  }

  public tapDecrement(): void {
    this.numericKeypadService.incrementValue(-1);
  }

  public tapNext(): void {
    this.numericKeypadService.focusNext();
  }
}
