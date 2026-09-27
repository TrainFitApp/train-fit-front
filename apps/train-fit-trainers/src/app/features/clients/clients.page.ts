import { Component, DestroyRef, OnInit, ViewChild, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { IonRefresher } from '@ionic/angular';
import { ClientRosterComponent } from './components/client-roster/client-roster.component';

// Movimiento 1 Coach Pro — dos formas de mirar la MISMA lista, no dos
// destinos distintos del menú:
//   lista   -> ¿quién es? (buscar a alguien concreto, dar de alta, filtrar)
//   cartera -> ¿cómo van? (comparar a todos entre sí y decidir a quién
//              atender hoy)
//
// 2026-09 — aceptar la invitación ya da de alta al cliente: sale aquí al
// momento. Mientras su intake esté sin enviar o por revisar, su fila no
// abre la ficha: despliega el intake para revisarlo (ver client-roster).
@Component({
  selector: 'app-clients',
  templateUrl: 'clients.page.html',
  styleUrls: ['clients.page.scss'],
})
export class ClientsPage implements OnInit {
  // static: la Cartera no está dentro de ningún *ngIf, así que ya existe en
  // la primera entrada (hace falta para desplegar ?review= de inmediato).
  @ViewChild(ClientRosterComponent, { static: true }) private roster?: ClientRosterComponent;

  private hasEntered = false;
  private readonly destroyRef = inject(DestroyRef);

  constructor(private router: Router, private route: ActivatedRoute) {}

  // Suscripción y no lectura en ionViewWillEnter: el guard también puede
  // mandar aquí estando ya en Clientes, y entonces Ionic no vuelve a entrar.
  public ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => this.focusReviewFromGuard(params.get('review')));
  }

  // ion-router-outlet mantiene viva esta página al navegar, así que la
  // Cartera (que carga en su ngOnInit) no volvía a pedirse: un cliente que
  // acababa de aceptar la invitación no salía hasta recargar el navegador.
  // La primera entrada ya la carga el propio ngOnInit de la Cartera.
  public ionViewWillEnter(): void {
    if (this.hasEntered) this.roster?.load(true);
    this.hasEntered = true;
  }

  // intake-reviewed.guard.ts manda aquí (?review=<clientId>) a quien intenta
  // abrir un cliente con el intake sin revisar. Se consume y se quita de la
  // URL para que volver a Clientes no lo despliegue otra vez.
  private focusReviewFromGuard(clientId: string | null): void {
    if (!clientId) return;
    this.roster?.focusClient(clientId);
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { review: null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  // Tirar para refrescar: recarga la Cartera.
  public onRefresh(event: CustomEvent): void {
    this.roster?.load(true);
    ((event.target as unknown) as IonRefresher).complete();
  }

  public goToInvite(): void {
    void this.router.navigate(['/tabs/invites']);
  }
}
