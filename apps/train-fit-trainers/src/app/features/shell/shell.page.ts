import { Component, OnInit } from '@angular/core';
import { TrainerInvitesApiService } from 'src/app/features/invites/services/trainer-invites-api.service';
import { CheckinReportsApiService } from 'src/app/features/checkins/services/checkin-reports-api.service';

export interface ShellMenuItem {
  label: string;
  path: string | null;
  icon: string;
  // Para resaltar el item activo aunque la ruta real tenga subrutas
  // (p. ej. clients/:id) — se compara con startsWith, no con igualdad exacta.
  matchPrefix?: boolean;
  // Sin ruta real todavía (Mensajes/Automatizaciones) — se muestra en el nav
  // para comunicar el roadmap (ver mockup "TrainFit Panel") pero no navega.
  disabled?: boolean;
  // Precalculado una vez (no en la plantilla) para que routerLinkActiveOptions
  // reciba siempre la misma referencia de objeto entre ciclos de detección de
  // cambios, en vez de una nueva en cada uno.
  routerLinkActiveOptions: { exact: boolean };
  // TASK-023 (MASTER_BACKLOG.md) — contador opcional (p. ej. clientes en
  // onboarding con cuestionario esperando revisión). 0/undefined = sin badge.
  badgeCount?: number;
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
export class ShellPage implements OnInit {
  // Sidebar contraíble en escritorio (no forma parte del mockup original,
  // pedido aparte por el usuario) — persistido para que no vuelva a
  // expandirse solo por navegar o recargar.
  private static readonly COLLAPSE_KEY = 'tf-sidebar-collapsed';
  public collapsed = localStorage.getItem(ShellPage.COLLAPSE_KEY) === '1';

  public toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
    localStorage.setItem(ShellPage.COLLAPSE_KEY, this.collapsed ? '1' : '0');
  }

  public readonly menuItems: ShellMenuItem[] = buildMenuItems([
    { label: 'Dashboard', path: '/tabs/dashboard', icon: 'speedometer-outline' },
    { label: 'Clientes', path: '/tabs/clients', icon: 'people-outline', matchPrefix: true },
    { label: 'Plantillas', path: '/tabs/templates', icon: 'albums-outline', matchPrefix: true },
    { label: 'Reportes', path: '/tabs/checkins', icon: 'clipboard-outline', matchPrefix: true },
    { label: 'Mensajes', path: null, icon: 'chatbubble-ellipses-outline', disabled: true },
    { label: 'Automatizaciones', path: null, icon: 'flash-outline', disabled: true },
    { label: 'Configuración', path: '/tabs/configuration', icon: 'settings-outline' },
  ]);

  constructor(
    private trainerInvitesApi: TrainerInvitesApiService,
    private checkinReportsApi: CheckinReportsApiService
  ) {}

  // TASK-023 (MASTER_BACKLOG.md) — antes un cliente con cuestionario ya
  // enviado (status "en_revision", esperando confirmación del trainer) solo
  // era visible entrando a la pestaña "Invitar" — sin ningún aviso en el
  // resto de la app, un trainer que no la visitara nunca se enteraba. Badge
  // en "Clientes" (no en "Mensajes"/otro sitio: A6 lo enmarca como "clientes
  // invisibles en Clientes", y son literalmente clientes en proceso de
  // alta). Solo cuenta "en_revision" — "cuestionario_pendiente" espera al
  // CLIENTE, no hay nada que el trainer deba hacer todavía.
  public ngOnInit(): void {
    this.trainerInvitesApi.getMyInvites().subscribe({
      next: (invites) => {
        const reviewCount = (invites || []).filter((i) => i.status === 'en_revision').length;
        const clientsItem = this.menuItems.find((item) => item.label === 'Clientes');
        if (clientsItem) clientsItem.badgeCount = reviewCount;
      },
      error: () => {
        // Silencioso: el badge es un aviso complementario, no crítico — no
        // debe interrumpir la carga del shell si esta llamada falla.
      },
    });

    // TASK-024 (MASTER_BACKLOG.md) — antes ninguna respuesta de check-in
    // generaba aviso alguno al trainer; había que visitar "Reportes" a
    // ciegas para enterarse de que había algo nuevo. CheckinsPage llama a
    // markSeen() al montar, así que este contador se limpia solo al
    // visitarla — no hace falta lógica de "marcar como leído" aquí.
    this.checkinReportsApi.getUnseenCount().subscribe({
      next: ({ count }) => {
        const reportsItem = this.menuItems.find((item) => item.label === 'Reportes');
        if (reportsItem) reportsItem.badgeCount = count;
      },
      error: () => {
        // Silencioso, mismo criterio que el badge de Clientes de arriba.
      },
    });
  }
}
