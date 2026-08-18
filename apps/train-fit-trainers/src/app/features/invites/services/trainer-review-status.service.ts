import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TrainerInvitesApiService } from './trainer-invites-api.service';
import { TrainerInvite } from '../models/trainer-invite.model';

// Antes shell.page.ts (badge de "Clientes") y clients.page.ts (banner de
// revisión) llamaban cada uno por su cuenta a GET /trainer/invites, y
// clients.page.ts encima la disparaba A LA VEZ que su propia llamada a
// GET /trainer/clients/paginated nada más entrar. Dos peticiones
// autenticadas concurrentes justo al montar la pantalla se cruzaban con el
// refresh de sesión del interceptor JWT y la dejaban cargando para siempre.
// `refresh()` es explícito y nunca se dispara solo al suscribirse — cada
// consumidor decide CUÁNDO pedirlo (clients.page.ts lo encadena después de
// que responda su propia lista, nunca en paralelo).
@Injectable({ providedIn: 'root' })
export class TrainerReviewStatusService {
  private readonly reviewInvites$ = new BehaviorSubject<TrainerInvite[]>([]);

  constructor(private trainerInvitesApi: TrainerInvitesApiService) {}

  public get reviewInvites(): Observable<TrainerInvite[]> {
    return this.reviewInvites$.asObservable();
  }

  public refresh(): void {
    this.trainerInvitesApi.getMyInvites().subscribe({
      next: (invites) => {
        this.reviewInvites$.next((invites || []).filter((invite) => invite.status === 'en_revision'));
      },
      error: () => {
        // Silencioso — mismo criterio que antes: es un aviso complementario,
        // no debe romper Clientes ni el shell si esta llamada falla.
      },
    });
  }
}
