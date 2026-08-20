import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UserService } from 'src/app/core/services/user/user.service';
import { TrainerClientSummary } from '../clients/models/trainer-client-summary.model';
import { TrainerClientsApiService } from '../clients/services/trainer-clients-api.service';
import { ClientDetailApiService } from '../clients/pages/client-detail/services/client-detail-api.service';
import { ClientTable } from '../clients/pages/client-detail/models/client-detail.model';

// Fila: una rutina (Table) YA ASIGNADA a un cliente concreto, con sus
// microciclos (splits) reales. Distinto de WorkoutTemplate (biblioteca de
// bloques reutilizables en /tabs/routines).
export interface RoutineOverviewRow {
  clientId: string;
  clientName: string;
  table: ClientTable;
  microcyclesCount: number;
  workoutsCount: number;
  completedWorkoutsCount: number;
}

// Extraído de routines-overview.page.ts para que templates.page.ts (columna
// "Rutinas activas" en Recientes) pueda pedir el mismo agregado sin
// duplicar la lógica de forkJoin sobre getMyClients()/getTables().
@Injectable({ providedIn: 'root' })
export class RoutinesOverviewService {
  constructor(
    private trainerClientsApi: TrainerClientsApiService,
    private clientDetailApi: ClientDetailApiService,
    private userService: UserService
  ) {}

  public getAssignedRoutines(): Observable<RoutineOverviewRow[]> {
    return this.trainerClientsApi
      .getMyClients()
      .pipe(switchMap((clients) => this.loadTablesForClients(clients || [])));
  }

  private loadTablesForClients(clients: TrainerClientSummary[]): Observable<RoutineOverviewRow[]> {
    const trainingClients = clients.filter((c) => c.user && c.scopes.includes('training'));
    if (!trainingClients.length) return of([]);

    const trainerId = this.userService.localUser()?._id;

    return forkJoin(
      trainingClients.map((client) =>
        this.clientDetailApi.getTables(client.user!._id).pipe(
          map((tables) => ({ client, tables: tables || [] })),
          catchError(() => of({ client, tables: [] as ClientTable[] }))
        )
      )
    ).pipe(
      map((results) => {
        const rows: RoutineOverviewRow[] = [];
        for (const { client, tables } of results) {
          const assigned = tables.filter((t) => t.assignedByTrainerId === trainerId);
          for (const table of assigned) {
            rows.push(this.buildRow(client, table));
          }
        }
        return rows;
      })
    );
  }

  private buildRow(client: TrainerClientSummary, table: ClientTable): RoutineOverviewRow {
    const splits = table.splits || [];
    const workouts = splits.flatMap((s) => s.workouts || []);
    return {
      clientId: client.user!._id,
      clientName: `${client.user!.name} ${client.user!.lastname}`.trim(),
      table,
      microcyclesCount: splits.length,
      workoutsCount: workouts.length,
      completedWorkoutsCount: workouts.filter((w) => !!w.date).length,
    };
  }
}
