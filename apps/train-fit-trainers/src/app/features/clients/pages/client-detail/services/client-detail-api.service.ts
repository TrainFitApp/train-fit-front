import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  AdherenceSummary,
  AnthropometryEntry,
  CheckinResponseEntry,
  ClientNutritionalGoal,
  ClientNutritionalGoalResponse,
  ClientNutritionPreferences,
  ClientScope,
  ClientTable,
  NutritionComplianceSummary,
  NutritionDaySummary,
  NutritionFoodsSummary,
  NutritionTrackingSummary,
  Supplement,
  SupplementTiming,
  TrainerNote,
  TrainerTask,
  TrainerTaskType,
  TrainingGoal,
} from '../models/client-detail.model';
import { CheckinSchedule, CheckinScheduleHistory } from '../components/checkin-workspace/checkin-workspace.model';
import { PainEntry, PainThreshold } from 'src/app/core/constants/pain';
import { ShoppingList } from 'src/app/core/utils/shopping-list.util';
import { ClientNoteDomain, ClientNotesPage, ClientNotesQuery, ClientNotesUnread } from '../models/client-notes.model';
import {
  ClientProgress,
  ClientSummary,
  ClientTrainingProgress,
  PlanChange,
} from '../models/client-progress.model';

@Injectable({ providedIn: 'root' })
export class ClientDetailApiService {
  constructor(private http: HttpService) {}

  private base(clientId: string): string {
    return `trainer/clients/${clientId}`;
  }

  // --- Notas del cliente (Plan > Notas del cliente) ---
  public getClientNotes(clientId: string, query: ClientNotesQuery): Observable<ClientNotesPage> {
    const params = [`page=${query.page || 0}`];
    if (query.domain) params.push(`domain=${query.domain}`);
    if (query.seen !== null && query.seen !== undefined) params.push(`seen=${query.seen}`);
    if (query.q?.trim()) params.push(`q=${encodeURIComponent(query.q.trim())}`);
    return this.http.get<ClientNotesPage>(`${this.base(clientId)}/client-notes?${params.join('&')}`);
  }

  public getClientNotesUnread(clientId: string): Observable<ClientNotesUnread> {
    return this.http.get<ClientNotesUnread>(`${this.base(clientId)}/client-notes/unread-count`);
  }

  // keys: marca esas notas. Sin keys: todas las que coinciden con el filtro.
  public setClientNotesSeen(
    clientId: string,
    seen: boolean,
    keys: string[] | null,
    filter: { domain?: ClientNoteDomain | null; q?: string } = {}
  ): Observable<{ updated: number; unread: ClientNotesUnread }> {
    const body = keys ? { seen, keys } : { seen, all: true, domain: filter.domain || null, q: filter.q || '' };
    return this.http.put<{ updated: number; unread: ClientNotesUnread }>(`${this.base(clientId)}/client-notes/seen`, body);
  }

  public getTables(clientId: string): Observable<ClientTable[]> {
    return this.http.get<ClientTable[]>(`${this.base(clientId)}/tables`);
  }

  public getTrainingGoal(clientId: string): Observable<TrainingGoal> {
    return this.http.get<TrainingGoal>(`${this.base(clientId)}/training-goal`);
  }

  public updateTrainingGoal(clientId: string, goal: TrainingGoal): Observable<TrainingGoal> {
    return this.http.put<TrainingGoal>(`${this.base(clientId)}/training-goal`, goal);
  }

  public getAvailableTemplates(clientId: string): Observable<ClientTable[]> {
    return this.http.get<ClientTable[]>(
      `${this.base(clientId)}/tables/available-templates`
    );
  }

  public assignNewRoutine(clientId: string, name: string): Observable<ClientTable> {
    return this.http.post<ClientTable>(`${this.base(clientId)}/tables`, {
      mode: 'new',
      name,
    });
  }

  public assignTemplateRoutine(
    clientId: string,
    sourceTableId: string
  ): Observable<ClientTable> {
    return this.http.post<ClientTable>(`${this.base(clientId)}/tables`, {
      mode: 'duplicate',
      sourceTableId,
    });
  }

  public getAnthropometry(clientId: string): Observable<AnthropometryEntry[]> {
    return this.http.get<AnthropometryEntry[]>(`${this.base(clientId)}/anthropometry`);
  }

  // TASK-019 (MASTER_BACKLOG.md) — antes solo se podía vaciar una Table
  // semana a semana a mano; no existía forma de eliminar la Table completa
  // ya asignada. Endpoint ya existía y ya autorizaba a "trainer" con
  // relación activa (table-access.js#canAccessUserTable) — solo faltaba el
  // consumidor. Nota: la ruta vive bajo /tables, no bajo trainer/clients/,
  // por eso no usa this.base(clientId).
  public deleteTable(tableId: string): Observable<unknown> {
    return this.http.delete(`tables/${tableId}`);
  }

  public revokeRelation(clientId: string, scope: ClientScope): Observable<unknown> {
    return this.http.delete(`trainer/clients/${clientId}?scope=${scope}`);
  }

  public getNotes(clientId: string): Observable<TrainerNote[]> {
    return this.http.get<TrainerNote[]>(`${this.base(clientId)}/notes`);
  }

  // TASK-062 (MASTER_BACKLOG.md) — fecha de la última vez que este cliente
  // fue revocado por este trainer, si alguna. null si nunca lo fue (caso
  // normal). Se usa para separar visualmente notas/tareas "de una relación
  // anterior" sin necesidad de purgarlas.
  public getPreviousRelationCutoff(clientId: string): Observable<{ cutoffDate: string | null }> {
    return this.http.get<{ cutoffDate: string | null }>(
      `${this.base(clientId)}/previous-relation-cutoff`
    );
  }

  public createNote(clientId: string, text: string): Observable<TrainerNote> {
    return this.http.post<TrainerNote>(`${this.base(clientId)}/notes`, { text });
  }

  // Un solo endpoint para fijar/desfijar y/o corregir el texto — pasa solo
  // lo que cambia (ver trainer-client-data-controller.js#updateNote).
  public updateNote(
    clientId: string,
    noteId: string,
    changes: { text?: string; pinned?: boolean }
  ): Observable<TrainerNote> {
    return this.http.patch<TrainerNote>(`${this.base(clientId)}/notes/${noteId}`, changes);
  }

  public deleteNote(clientId: string, noteId: string): Observable<{ success: boolean }> {
    return this.http.delete<{ success: boolean }>(`${this.base(clientId)}/notes/${noteId}`);
  }

  public getCheckinResponses(clientId: string): Observable<CheckinResponseEntry[]> {
    return this.http.get<CheckinResponseEntry[]>(`${this.base(clientId)}/checkin-responses`);
  }

  public getCheckinSchedules(clientId: string): Observable<CheckinSchedule[]> {
    return this.http.get<CheckinSchedule[]>(`${this.base(clientId)}/checkin-schedules`);
  }

  // Histórico de UNA programación: `before` es el cursor que devolvió la
  // página anterior (`nextBefore`).
  public getCheckinScheduleHistory(
    clientId: string,
    scheduleId: string,
    before: string | null = null,
    limit = 50
  ): Observable<CheckinScheduleHistory> {
    const cursor = before ? `&before=${before}` : '';
    return this.http.get<CheckinScheduleHistory>(
      `${this.base(clientId)}/checkin-schedules/${scheduleId}/history?limit=${limit}${cursor}`
    );
  }

  public getAdherence(clientId: string): Observable<AdherenceSummary> {
    return this.http.get<AdherenceSummary>(`${this.base(clientId)}/adherence`);
  }

  // Fase 2 Coach Pro — la pestaña Resumen en UNA petición: alertas,
  // adherencia multidimensional, tendencia de peso y qué tiene asignado.
  // Antes esa misma respuesta exigía 4 llamadas repartidas por 4 pestañas.
  public getSummary(clientId: string): Observable<ClientSummary> {
    return this.http.get<ClientSummary>(`${this.base(clientId)}/summary`);
  }

  // Movimiento 5 Coach Pro — suplementación pautada. El catálogo de momentos
  // lo decide el backend, igual que el de dolor y el de reglas: así es
  // imposible que la interfaz ofrezca uno que el validador no conoce.
  // Objetivo nutricional del cliente + cómo se calcularía hoy. El
  // profesional lo ve y lo edita desde Plan > Nutrición.
  public getNutritionalGoal(clientId: string): Observable<ClientNutritionalGoalResponse> {
    return this.http.get<ClientNutritionalGoalResponse>(`trainer/clients/${clientId}/nutritional-goal`);
  }

  // Con `recalculate` vuelve al valor calculado del perfil; con kcal/macros,
  // lo fija a mano (y deja de recalcularse solo).
  public updateNutritionalGoal(
    clientId: string,
    body: { recalculate: true } | { kcalTotal: number; proteinsGTotal: number; carbohydratesGTotal: number; fatGTotal: number }
  ): Observable<ClientNutritionalGoal> {
    return this.http.put<ClientNutritionalGoal>(`trainer/clients/${clientId}/nutritional-goal`, body);
  }

  public getSupplementTimings(): Observable<{ timings: SupplementTiming[] }> {
    return this.http.get<{ timings: SupplementTiming[] }>('supplements/timings');
  }

  // Emite el clientId tras crear, editar o quitar un suplemento: el
  // calendario de nutrición los pinta por fechas y los tiene cacheados.
  public readonly supplementsChanged$ = new Subject<string>();

  public getSupplements(clientId: string): Observable<Supplement[]> {
    return this.http.get<Supplement[]>(`${this.base(clientId)}/supplements`);
  }

  public createSupplement(clientId: string, payload: Partial<Supplement>): Observable<Supplement> {
    return this.http
      .post<Supplement>(`${this.base(clientId)}/supplements`, payload)
      .pipe(tap(() => this.supplementsChanged$.next(clientId)));
  }

  public updateSupplement(
    clientId: string,
    supplementId: string,
    payload: Partial<Supplement>
  ): Observable<Supplement> {
    return this.http
      .put<Supplement>(`${this.base(clientId)}/supplements/${supplementId}`, payload)
      .pipe(tap(() => this.supplementsChanged$.next(clientId)));
  }

  public deleteSupplement(clientId: string, supplementId: string): Observable<void> {
    return this.http
      .delete<void>(`${this.base(clientId)}/supplements/${supplementId}`)
      .pipe(tap(() => this.supplementsChanged$.next(clientId)));
  }

  // Movimiento 5 Coach Pro — qué tiene que comprar el cliente para cumplir
  // el plan de ese rango: menús × días, con sus alternativas. Sin modelo
  // nuevo detrás: el servidor la calcula del plan al pedirla.
  public getShoppingList(clientId: string, from: string, to: string): Observable<ShoppingList> {
    return this.http.get<ShoppingList>(`${this.base(clientId)}/shopping-list?from=${from}&to=${to}`);
  }

  // Movimiento 3 Coach Pro — registro diario de dolor del cliente + los
  // umbrales que fijó este entrenador, en UNA petición: la pantalla los
  // enseña juntos porque un "6 en rodilla" no significa nada hasta leerlo al
  // lado de "para a partir de 5".
  public getClientPain(
    clientId: string,
    days: number
  ): Observable<{ days: number; entries: PainEntry[]; thresholds: PainThreshold[] }> {
    return this.http.get<{ days: number; entries: PainEntry[]; thresholds: PainThreshold[] }>(
      `${this.base(clientId)}/pain?days=${days}`
    );
  }

  public savePainThreshold(
    clientId: string,
    threshold: PainThreshold
  ): Observable<PainThreshold> {
    return this.http.put<PainThreshold>(`${this.base(clientId)}/pain/thresholds`, threshold);
  }

  public removePainThreshold(clientId: string, zone: string): Observable<void> {
    return this.http.delete<void>(
      `${this.base(clientId)}/pain/thresholds/${encodeURIComponent(zone)}`
    );
  }

  // Serie semanal + comparativa de la última semana contra la anterior. La
  // comparativa no es otra llamada: son los dos últimos elementos de la
  // misma serie, calculados en el backend para no duplicar la aritmética.
  public getProgress(clientId: string, weeks: number): Observable<ClientProgress> {
    return this.http.get<ClientProgress>(`${this.base(clientId)}/progress?weeks=${weeks}`);
  }

  // Fase 4 Coach Pro — qué le he cambiado a este cliente y por qué.
  public getChanges(clientId: string): Observable<PlanChange[]> {
    return this.http.get<PlanChange[]>(`${this.base(clientId)}/changes`);
  }

  // Fase 6 Coach Pro — volumen, PRs y evolución de cargas. Llamada aparte de
  // getProgress porque su consulta es con diferencia la más cara del módulo:
  // solo se pide si el cliente tiene ámbito de entrenamiento.
  public getTrainingProgress(
    clientId: string,
    weeks: number
  ): Observable<ClientTrainingProgress> {
    return this.http.get<ClientTrainingProgress>(
      `${this.base(clientId)}/training-progress?weeks=${weeks}`
    );
  }

  // Tarea 4 (2026-09) — mismo endpoint, modo rango libre: comparación por
  // microciclo en Entrenamiento, con las fechas que el entrenador elija en
  // el calendario en vez de una de las 3 ventanas fijas de arriba.
  public getTrainingBlocks(
    clientId: string,
    from: string,
    to: string,
    exercises?: string[],
    workout?: string
  ): Observable<ClientTrainingProgress> {
    // Parámetros repetidos (exercises=A&exercises=B), no una lista separada
    // por comas: un nombre de ejercicio con una coma literal rompería el
    // split del backend sin forma de distinguirla del separador.
    const exercisesParam = (exercises || [])
      .map((name) => `&exercises=${encodeURIComponent(name)}`)
      .join('');
    const workoutParam = workout ? `&workout=${encodeURIComponent(workout)}` : '';
    return this.http.get<ClientTrainingProgress>(
      `${this.base(clientId)}/training-progress?from=${from}&to=${to}${exercisesParam}${workoutParam}`
    );
  }

  // F20-bis — cumplimiento por día (para el calendario de nutrición), distinto
  // de /adherence (kcal pautada vs. objetivo).
  public getNutritionCompliance(
    clientId: string,
    from: string,
    to: string
  ): Observable<NutritionComplianceSummary> {
    return this.http.get<NutritionComplianceSummary>(
      `${this.base(clientId)}/nutrition-compliance?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
    );
  }

  // F20-ter — pautado vs. consumido (kcal/proteína/carbos/grasa) por día,
  // para el gráfico de comparación junto al calendario.
  public getNutritionTracking(
    clientId: string,
    from: string,
    to: string
  ): Observable<NutritionTrackingSummary> {
    return this.http.get<NutritionTrackingSummary>(
      `${this.base(clientId)}/nutrition-tracking?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
    );
  }

  // Cumplimiento alimento a alimento del rango — panel de resumen de una semana.
  // El backend acota `to` a hoy: los días futuros aún no materializados se
  // resuelven con consumed:false y falsearían el cumplimiento.
  public getNutritionFoods(
    clientId: string,
    from: string,
    to: string
  ): Observable<NutritionFoodsSummary> {
    return this.http.get<NutritionFoodsSummary>(
      `${this.base(clientId)}/nutrition-foods?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`
    );
  }

  // Resumen de un día (Plan › Nutrición › Día): menú y opciones elegidas, lo
  // tomado, lo que no, lo propio y la desviación. No crea el día.
  public getNutritionDay(clientId: string, date: string): Observable<NutritionDaySummary> {
    return this.http.get<NutritionDaySummary>(
      `${this.base(clientId)}/nutrition-day?date=${encodeURIComponent(date)}`
    );
  }

  // coach-tab FASE4 — tareas/hábitos.
  public getTasks(clientId: string): Observable<TrainerTask[]> {
    return this.http.get<TrainerTask[]>(`${this.base(clientId)}/tasks`);
  }

  public createTask(
    clientId: string,
    task: { type: TrainerTaskType; label?: string; target: number; targetMax?: number | null; unit: string }
  ): Observable<TrainerTask> {
    return this.http.post<TrainerTask>(`${this.base(clientId)}/tasks`, task);
  }

  public updateTask(
    clientId: string,
    taskId: string,
    task: { label?: string; target: number; targetMax?: number | null; unit: string }
  ): Observable<TrainerTask> {
    return this.http.put<TrainerTask>(`${this.base(clientId)}/tasks/${taskId}`, task);
  }

  public deactivateTask(clientId: string, taskId: string): Observable<unknown> {
    return this.http.delete(`${this.base(clientId)}/tasks/${taskId}`);
  }

  // F29 — preferencias nutricionales del cliente.
  public getNutritionPreferences(clientId: string): Observable<ClientNutritionPreferences | null> {
    return this.http.get<ClientNutritionPreferences | null>(
      `${this.base(clientId)}/nutrition-preferences`
    );
  }

  public requestNutritionPreferences(clientId: string): Observable<ClientNutritionPreferences> {
    return this.http.post<ClientNutritionPreferences>(
      `${this.base(clientId)}/nutrition-preferences/request`,
      {}
    );
  }

  // El profesional edita directamente las preferencias en vez de esperar a
  // que el cliente responda el cuestionario.
  public updateNutritionPreferences(
    clientId: string,
    payload: Partial<
      Pick<
        ClientNutritionPreferences,
        | 'allergies'
        | 'favoriteFoods'
        | 'dislikedFoods'
        | 'cooksAtHome'
        | 'dietaryFlags'
        | 'disabledMealSlots'
      >
    >
  ): Observable<ClientNutritionPreferences> {
    return this.http.put<ClientNutritionPreferences>(
      `${this.base(clientId)}/nutrition-preferences`,
      payload
    );
  }
}
