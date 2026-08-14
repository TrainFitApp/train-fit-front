import { Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TrainerClientsApiService } from '../clients/services/trainer-clients-api.service';
import { TrainerClientSummary } from '../clients/models/trainer-client-summary.model';
import { ClientDetailApiService } from '../clients/pages/client-detail/services/client-detail-api.service';
import { WorkoutTemplateApiService } from 'src/app/core/services/workout-template/workout-template-api.service';
import { CheckinReportsApiService } from '../checkins/services/checkin-reports-api.service';

type ViewState = 'loading' | 'error' | 'loaded';

interface EvolutionSeries {
  name: string;
  barsPct: number[];
  colorVar: string;
}

const EVOLUTION_COLORS = ['var(--tf-accent)', 'var(--tf-text-secondary)', 'var(--tf-accent-2, #4fc79a)'];
// Cuántos clientes se consultan para el gráfico de evolución de peso — acota
// el fan-out de peticiones (uno por cliente, no hay endpoint agregado).
const EVOLUTION_CLIENT_LIMIT = 5;

// TASK-001 (MASTER_BACKLOG.md) — antes: KPIs, tareas y alertas 100% inventados
// (nombres de cliente que no existen en la BD real). Ahora conecta con datos
// reales donde ya existe un endpoint que los respalda 1:1. "Tareas de hoy" y
// "Rutinas pendientes de revisar" se retiran en vez de rellenarse con otro
// mock: no existe ningún concepto de agenda del entrenador ni de "rutina
// enviada a revisión" en el backend hoy — inventar una UI para un concepto
// que no existe sería el mismo problema del audit con otro disfraz. Ver
// TASK-077 (seguimiento) para construir esa base real antes de tener un
// hueco que llenar aquí.
@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  public state: ViewState = 'loading';

  public activeClientsCount = 0;
  public routineTemplatesCount = 0;
  public checkinResponsesCount = 0;

  public evolution: EvolutionSeries[] = [];
  public evolutionLoading = false;

  constructor(
    private trainerClientsApi: TrainerClientsApiService,
    private workoutTemplateApi: WorkoutTemplateApiService,
    private checkinReportsApi: CheckinReportsApiService,
    private clientDetailApi: ClientDetailApiService
  ) {}

  public ngOnInit(): void {
    this.load();
  }

  public ionViewWillEnter(): void {
    this.load();
  }

  public load(): void {
    this.state = 'loading';
    forkJoin({
      clients: this.trainerClientsApi.getMyClients(),
      templates: this.workoutTemplateApi.list(),
      checkinResponses: this.checkinReportsApi.getMyResponses(),
    }).subscribe({
      next: ({ clients, templates, checkinResponses }) => {
        this.activeClientsCount = clients.length;
        this.routineTemplatesCount = templates.length;
        this.checkinResponsesCount = checkinResponses.length;
        this.state = 'loaded';
        this.loadEvolution(clients);
      },
      error: () => {
        this.state = 'error';
      },
    });
  }

  private loadEvolution(clients: TrainerClientSummary[]): void {
    const withUser = clients.filter((c) => !!c.user).slice(0, EVOLUTION_CLIENT_LIMIT);
    if (!withUser.length) {
      this.evolution = [];
      return;
    }

    this.evolutionLoading = true;
    forkJoin(
      withUser.map((c) =>
        this.clientDetailApi.getAnthropometry(c.user!._id).pipe(catchError(() => of([])))
      )
    ).subscribe((results) => {
      this.evolution = withUser
        .map((c, i) => {
          // getAnthropometry ya viene ordenado de más reciente a más antiguo
          // (client-detail.page.ts la usa como weights[0] = latestWeight) —
          // se invierte para dibujar el gráfico en orden cronológico.
          const weights = (results[i] || [])
            .filter((e) => typeof e.weight === 'number')
            .slice(0, 6)
            .reverse()
            .map((e) => e.weight as number);

          return {
            name: `${c.user!.name} ${c.user!.lastname}`.trim(),
            barsPct: this.normalizeToBars(weights),
            colorVar: EVOLUTION_COLORS[i % EVOLUTION_COLORS.length],
          };
        })
        // Un solo punto no dibuja tendencia — se omite en vez de mostrar una
        // barra plana engañosa.
        .filter((series) => series.barsPct.length >= 2);
      this.evolutionLoading = false;
    });
  }

  // Normaliza al rango propio del cliente (min-max de sus propios pesos),
  // no a una escala absoluta — clientes con pesos muy distintos entre sí
  // deben poder compararse por TENDENCIA, no por valor absoluto compartido.
  private normalizeToBars(weights: number[]): number[] {
    if (weights.length < 2) return [];
    const min = Math.min(...weights);
    const max = Math.max(...weights);
    const range = max - min;
    if (range === 0) return weights.map(() => 60);
    return weights.map((w) => 30 + ((w - min) / range) * 70);
  }
}
