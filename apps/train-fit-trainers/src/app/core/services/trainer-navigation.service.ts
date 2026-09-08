import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter } from 'rxjs';

// Enrutado coherente de la app de entrenadores (2026-09).
//
// Antes cada pantalla resolvía "Volver" por su cuenta: router.navigate a una
// ruta fija (`/tabs/routines`, `/tabs/templates`…), a veces con parches
// puntuales (?returnTab=, data.templateMode, isCreatingForClient). Con dos
// entradas distintas a la misma pantalla (Protocolos desde Mi método, pero
// "volver" a Biblioteca; el constructor de plantillas desde Biblioteca, pero
// "volver" a Rutinas) el destino era simplemente el equivocado.
//
// Modelo híbrido, un solo criterio para toda la app:
//
//   1. Historial real: pila propia de URLs alimentada por el Router. Volver
//      lleva a la pantalla anterior de verdad, viniera de donde viniera.
//   2. Padre canónico: cada ruta declara `data: { parent }` en su routing
//      module. Es el destino cuando NO hay historial — entrada por deep link,
//      recarga de página (F5) o primera pantalla de la sesión.
//
// La pila no se usa como cola infinita: si la URL de destino ya estaba en la
// pila, se trunca ahí en vez de apilarla otra vez. Así A -> B -> A deja [A],
// no [A, B, A], y "atrás" nunca hace ping-pong entre dos copias de la misma
// pantalla.
@Injectable({ providedIn: 'root' })
export class TrainerNavigationService {
  // Solo el interior del panel (el shell con su menú lateral) forma parte del
  // historial navegable: login, carga de usuario o la pantalla de sin
  // conexión no son sitios a los que "volver".
  private static readonly SHELL_PREFIX = '/tabs';

  private stack: string[] = [];

  // Estado de vista (pestaña activa, scroll, filtros) por clave de pantalla.
  // En memoria a propósito: sobrevive a la navegación dentro de la sesión, no
  // a una recarga — y no ensucia la URL, que sigue siendo compartible.
  private viewStates = new Map<string, unknown>();

  // Padre canónico de la ruta activa. Se recalcula en cada NavigationEnd en
  // vez de al vuelo desde la plantilla: `canGoBack` se consulta en cada ciclo
  // de detección de cambios.
  private currentParent: string | null = null;

  // Si la navegación en curso es "hacia atrás" — botón de la cabecera, atrás
  // del navegador o del sistema, o cualquier navegación a una URL que ya
  // estaba en la pila. Solo entonces se restaura el estado de vista: entrar
  // de nuevo a una sección desde el menú lateral empieza limpio.
  private arrivedByBack = false;
  private navigatingBack = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event): event is NavigationStart => event instanceof NavigationStart))
      .subscribe((event) => {
        // En NavigationStart, no en NavigationEnd: ionViewWillEnter se dispara
        // durante la activación de la ruta, antes de que NavigationEnd llegue.
        // Si la bandera se marcara al final, la pantalla que entra leería
        // todavía el valor de la navegación anterior.
        this.arrivedByBack =
          this.navigatingBack || this.stack.slice(0, -1).includes(event.url);
      });

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.record(event.urlAfterRedirects));

    // Una navegación cancelada (pendingChangesGuard diciendo "sigo editando")
    // no ha llevado a ninguna parte: las banderas vuelven a su sitio para que
    // la SIGUIENTE navegación no se confunda con una vuelta atrás.
    this.router.events
      .pipe(
        filter(
          (event) => event instanceof NavigationCancel || event instanceof NavigationError
        )
      )
      .subscribe(() => {
        this.navigatingBack = false;
        this.arrivedByBack = false;
      });
  }

  // Hay botón de "Volver" solo si la ruta declara padre. Es decir: las
  // secciones raíz del menú lateral (Hoy, Clientes, Biblioteca, Mi método,
  // Mi cuenta, Configuración) nunca lo muestran — son destinos a los que se
  // salta, no niveles de profundidad. Y el botón no cambia de aspecto según
  // de dónde vengas: mismo destino declarado, mismo botón.
  public get canGoBack(): boolean {
    return this.currentParent !== null;
  }

  public back(): void {
    const target = this.stack[this.stack.length - 2] || this.currentParent;
    if (!target) return;
    this.navigatingBack = true;
    void this.router.navigateByUrl(target);
  }

  public saveViewState(key: string, state: unknown): void {
    this.viewStates.set(key, state);
  }

  // Devuelve el estado guardado SOLO si se ha llegado hacia atrás; en una
  // entrada nueva lo descarta, para que abrir una sección desde el menú no
  // arrastre los filtros y el scroll de la visita anterior.
  public consumeViewState<T>(key: string): T | null {
    if (!this.arrivedByBack) {
      this.viewStates.delete(key);
      return null;
    }
    return (this.viewStates.get(key) as T) ?? null;
  }

  private record(url: string): void {
    if (!url.startsWith(TrainerNavigationService.SHELL_PREFIX)) {
      this.stack = [];
      this.currentParent = null;
      this.navigatingBack = false;
      return;
    }

    const alreadyVisited = this.stack.lastIndexOf(url);
    if (alreadyVisited >= 0) {
      this.stack.length = alreadyVisited + 1;
      this.arrivedByBack = true;
    } else {
      this.stack.push(url);
    }
    this.navigatingBack = false;
    this.currentParent = this.resolveParent();
  }

  // El padre lo declara la ruta más profunda que lo defina. Admite parámetros
  // (`/tabs/clients/:clientId`), que se resuelven con los params acumulados de
  // la rama activa: el padre del Planificador de un cliente es la ficha de ESE
  // cliente, no una ruta fija.
  private resolveParent(): string | null {
    let route: ActivatedRouteSnapshot | null = this.router.routerState.snapshot.root;
    let parent: string | null = null;
    let params: Record<string, string> = {};

    while (route) {
      params = { ...params, ...route.params };
      const declared = route.data?.['parent'];
      if (typeof declared === 'string') parent = declared;
      route = route.firstChild;
    }

    if (!parent) return null;
    return parent.replace(/:([A-Za-z0-9_]+)/g, (match, name: string) => params[name] ?? match);
  }
}
