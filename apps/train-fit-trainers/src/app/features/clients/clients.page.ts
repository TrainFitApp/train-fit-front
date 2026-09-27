import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonRefresher } from '@ionic/angular';
import { ClientRosterComponent } from './components/client-roster/client-roster.component';

// Movimiento 1 Coach Pro — dos formas de mirar la MISMA lista, no dos
// destinos distintos del menú:
//   lista   -> ¿quién es? (buscar a alguien concreto, dar de alta, filtrar)
//   cartera -> ¿cómo van? (comparar a todos entre sí y decidir a quién
//              atender hoy)
//
// 2026-09 — aceptar la invitación ya da de alta al cliente: sale aquí al
// momento, sin revisar ni confirmar nada. Si aún no ha enviado su
// cuestionario inicial, la Cartera lo marca en su fila.
@Component({
  selector: 'app-clients',
  templateUrl: 'clients.page.html',
  styleUrls: ['clients.page.scss'],
})
export class ClientsPage {
  @ViewChild(ClientRosterComponent) private roster?: ClientRosterComponent;

  constructor(private router: Router) {}

  // Tirar para refrescar: recarga la Cartera.
  public onRefresh(event: CustomEvent): void {
    this.roster?.load();
    ((event.target as unknown) as IonRefresher).complete();
  }

  public goToInvite(): void {
    void this.router.navigate(['/tabs/invites']);
  }
}
