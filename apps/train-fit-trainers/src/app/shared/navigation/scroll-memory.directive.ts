import { AfterViewInit, Directive, Input, OnDestroy } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { NavigationStart, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { TrainerNavigationService } from '../../core/services/trainer-navigation.service';

// Devuelve el scroll al sitio donde estaba al salir, pero solo cuando se
// vuelve hacia atrás: aterrizar a media lista tras pulsar una sección del menú
// lateral sería desconcertante.
//
// Se restaura con reintentos porque las listas se pintan tras la respuesta del
// backend: en el momento de entrar la página todavía no mide lo suficiente
// como para desplazarse hasta la posición guardada.
@Directive({ selector: 'ion-content[appScrollMemory]' })
export class ScrollMemoryDirective implements AfterViewInit, OnDestroy {
  @Input('appScrollMemory') public key = '';

  private static readonly MAX_ATTEMPTS = 20;
  private static readonly RETRY_MS = 50;

  // Cacheado en la entrada: al destruirse la página hace falta leer el scroll
  // de forma síncrona, y getScrollElement() es una promesa.
  private scrollElement: HTMLElement | null = null;
  private pendingRetry: ReturnType<typeof setTimeout> | null = null;
  private routerSubscription: Subscription | null = null;

  constructor(
    private content: IonContent,
    private navigation: TrainerNavigationService,
    private router: Router
  ) {}

  public ngAfterViewInit(): void {
    const stored = this.navigation.consumeViewState<number>(this.stateKey);
    void this.content.getScrollElement().then((element) => {
      this.scrollElement = element;
      if (stored) this.restore(stored, 0);
    });

    // La posición se guarda al ARRANCAR cada navegación, no solo al destruir
    // la página: ion-router-outlet mantiene viva la instancia mientras se
    // navega hacia dentro (ver client-detail.page.ts), así que ngOnDestroy
    // puede no llegar nunca — y cuando llega, ya es tarde para leer el DOM.
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => this.remember());
  }

  public ngOnDestroy(): void {
    if (this.pendingRetry) clearTimeout(this.pendingRetry);
    this.routerSubscription?.unsubscribe();
    this.remember();
  }

  private remember(): void {
    if (!this.scrollElement) return;
    this.navigation.saveViewState(this.stateKey, this.scrollElement.scrollTop);
  }

  private get stateKey(): string {
    return `scroll:${this.key}`;
  }

  private restore(offset: number, attempt: number): void {
    const element = this.scrollElement;
    if (!element) return;

    const reachable = element.scrollHeight - element.clientHeight >= offset;
    if (reachable || attempt >= ScrollMemoryDirective.MAX_ATTEMPTS) {
      void this.content.scrollToPoint(0, offset, 0);
      return;
    }

    this.pendingRetry = setTimeout(
      () => this.restore(offset, attempt + 1),
      ScrollMemoryDirective.RETRY_MS
    );
  }
}
