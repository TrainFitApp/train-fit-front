import { Component } from '@angular/core';

export interface ShellMenuItem {
  label: string;
  path: string;
  icon: string;
  // Para resaltar el item activo aunque la ruta real tenga subrutas
  // (p. ej. clients/:id) — se compara con startsWith, no con igualdad exacta.
  matchPrefix?: boolean;
  // Precalculado una vez (no en la plantilla) para que routerLinkActiveOptions
  // reciba siempre la misma referencia de objeto entre ciclos de detección de
  // cambios, en vez de una nueva en cada uno.
  routerLinkActiveOptions: { exact: boolean };
}

export interface ShellMenuGroup {
  label: string;
  items: ShellMenuItem[];
}

type ShellMenuItemInput = Omit<ShellMenuItem, 'routerLinkActiveOptions'>;
type ShellMenuGroupInput = { label: string; items: ShellMenuItemInput[] };

function buildMenuGroups(groups: ShellMenuGroupInput[]): ShellMenuGroup[] {
  return groups.map((group) => ({
    label: group.label,
    items: group.items.map((item) => ({
      ...item,
      routerLinkActiveOptions: { exact: !item.matchPrefix },
    })),
  }));
}

// Replanteamiento UI/UX — sustituye la barra de tabs inferior (solo 3
// destinos, con rutas reales sin ninguna entrada de navegación:
// diet-templates, checkin-templates, subscription, configuration). Ver
// PRODUCT.md > Design Principles: "la navegación no esconde funcionalidad
// real".
@Component({
  selector: 'app-shell',
  templateUrl: 'shell.page.html',
  styleUrls: ['shell.page.scss'],
})
export class ShellPage {
  public readonly menuGroups: ShellMenuGroup[] = buildMenuGroups([
    {
      label: 'Cartera',
      items: [
        { label: 'Clientes', path: '/tabs/clients', icon: 'people-outline', matchPrefix: true },
        { label: 'Invitar cliente', path: '/tabs/invites', icon: 'person-add-outline' },
      ],
    },
    {
      label: 'Plantillas',
      items: [
        {
          label: 'Plantillas de dieta',
          path: '/tabs/diet-templates',
          icon: 'restaurant-outline',
          matchPrefix: true,
        },
        {
          label: 'Plantillas de check-in',
          path: '/tabs/checkin-templates',
          icon: 'pulse-outline',
        },
      ],
    },
    {
      label: 'Cuenta',
      items: [
        { label: 'Suscripción', path: '/tabs/subscription', icon: 'card-outline' },
        { label: 'Configuración', path: '/tabs/configuration', icon: 'settings-outline' },
        { label: 'Perfil', path: '/tabs/profile', icon: 'person-circle-outline' },
      ],
    },
  ]);
}
