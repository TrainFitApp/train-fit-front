import { Component, OnDestroy, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { TrainerNavigationService } from '../../core/services/trainer-navigation.service';
import { LegacyPaymentRemindersService } from '../payments/services/legacy-payment-reminders.service';

export interface ShellMenuItem {
  label: string;
  path: string | null;
  icon: string;
  // Para resaltar el item activo aunque la ruta real tenga subrutas
  // (p. ej. clients/:id) — se compara con startsWith, no con igualdad exacta.
  matchPrefix?: boolean;
  // Precalculado una vez (no en la plantilla) para que routerLinkActiveOptions
  // reciba siempre la misma referencia de objeto entre ciclos de detección de
  // cambios, en vez de una nueva en cada uno.
  routerLinkActiveOptions: { exact: boolean };
}

// Movimiento 1 Coach Pro — el menú pasa de una lista plana de 6 destinos a
// grupos con encabezado.
//
// El problema no era el NÚMERO de destinos sino que todos pesaran igual: un
// coach entra en "Hoy" y "Clientes" varias veces al día, y en "Biblioteca" o
// "Automatizaciones" una vez al mes. Una lista plana no dice eso; dos grupos
// con nombre, sí. Agrupar además deja sitio para crecer sin que el menú se
// convierta en una lista de doce cosas indistinguibles.
export interface ShellMenuGroup {
  // null en el primer grupo: encabezar "Trabajo diario" justo debajo de la
  // marca añade una etiqueta donde no hace falta — se entiende por posición.
  label: string | null;
  items: ShellMenuItem[];
}

type ShellMenuItemInput = Omit<ShellMenuItem, 'routerLinkActiveOptions'>;

function buildMenuItems(items: ShellMenuItemInput[]): ShellMenuItem[] {
  return items.map((item) => ({
    ...item,
    routerLinkActiveOptions: { exact: !item.matchPrefix },
  }));
}

// Rediseño UI/UX completo (importado de un mockup de Claude Design) —
// sustituye tanto la barra de tabs original como el menú lateral agrupado
// anterior por un sidebar plano de 7 destinos, siempre visible en escritorio.
// Ver PRODUCT.md > Design Principles.
@Component({
  selector: 'app-shell',
  templateUrl: 'shell.page.html',
  styleUrls: ['shell.page.scss'],
})
export class ShellPage implements OnInit, OnDestroy {
  // Sidebar contraíble en escritorio (no forma parte del mockup original,
  // pedido aparte por el usuario) — persistido para que no vuelva a
  // expandirse solo por navegar o recargar.
  private static readonly COLLAPSE_KEY = 'tf-sidebar-collapsed';
  public collapsed = localStorage.getItem(ShellPage.COLLAPSE_KEY) === '1';

  public toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    localStorage.setItem(ShellPage.COLLAPSE_KEY, this.collapsed ? '1' : '0');
  }

  public readonly menuGroups: ShellMenuGroup[] = [
    {
      label: null,
      items: buildMenuItems([
        // "Hoy" y no "Dashboard": el nombre dice qué responde la pantalla, no
        // a qué categoría de software pertenece.
        { label: 'Hoy', path: '/tabs/dashboard', icon: 'today-outline' },
        { label: 'Clientes', path: '/tabs/clients', icon: 'people-outline', matchPrefix: true },
      ]),
    },
    {
      // "Mi negocio" prometia lo que no habia: los dos elementos son
      // metodologia reutilizable, y el unico dato de negocio real (los cobros
      // agregados de todos los clientes) vive en el dashboard Hoy, servido por
      // GET /trainer/payments/summary. Etiquetar esto como negocio mandaba a
      // buscar dinero donde solo hay plantillas.
      label: 'Metodología',
      items: buildMenuItems([
        // "Plantillas" guardaba ocho cosas heterogéneas. Se parte en dos por
        // una distinción que un entrenador reconoce sin explicación: lo que
        // le DOY al cliente frente a CÓMO trabajo yo.
        { label: 'Biblioteca', path: '/tabs/templates', icon: 'albums-outline', matchPrefix: true },
        { label: 'Mi método', path: '/tabs/method', icon: 'construct-outline', matchPrefix: true },
      ]),
    },
  ];

  private backButtonSubscription: Subscription | null = null;

  constructor(
    private navigation: TrainerNavigationService,
    private platform: Platform,
    private legacyPaymentReminders: LegacyPaymentRemindersService
  ) {}

  public ngOnInit(): void {
    // Cobros 2026-09: los avisos de cobro ya no se programan en el móvil; se
    // retiran solo los antiguos que se reconocen como de cobros.
    void this.legacyPaymentReminders.cleanUp();

    // El atrás del sistema ejecuta exactamente lo mismo que el botón de la
    // cabecera (regla de docs/frontend.md: ambos llevan al mismo sitio). El
    // atrás del navegador no necesita enganche: es una navegación normal del
    // Router, y TrainerNavigationService la reconoce como "hacia atrás" —
    // restaura el mismo estado de vista que el botón.
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(
      10,
      () => this.navigation.back()
    );
  }

  public ngOnDestroy(): void {
    this.backButtonSubscription?.unsubscribe();
  }
}
