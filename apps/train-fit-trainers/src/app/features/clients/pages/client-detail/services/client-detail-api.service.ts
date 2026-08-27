import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  AdherenceSummary,
  AnthropometryEntry,
  AnthropometryRequest,
  AnthropometryRequestCadence,
  BulkApplyResult,
  CheckinConfig,
  CheckinResponseEntry,
  ClientNutritionPreferences,
  ClientScope,
  ClientTable,
  DietDaySummary,
  NutritionalGoal,
  NutritionComplianceSummary,
  NutritionTrackingSummary,
  Supplement,
  SupplementTiming,
  TrainerNote,
  TrainerPayment,
  TrainerTask,
  TrainerTaskType,
} from '../models/client-detail.model';
import { PainEntry, PainThreshold } from 'src/app/core/constants/pain';
import {
  ClientBodyProfile,
  ClientProgress,
  ClientSummary,
  ClientTrainingProgress,
  PlanChange,
} from '../models/client-progress.model';

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

@Injectable({ providedIn: 'root' })
export class ClientDetailApiService {
  constructor(private http: HttpService) {}

  private base(clientId: string): string {
    return `trainer/clients/${clientId}`;
  }

  public getTables(clientId: string): Observable<ClientTable[]> {
    return this.http.get<ClientTable[]>(`${this.base(clientId)}/tables`);
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
  public deleteTable(clientId: string, tableId: string): Observable<unknown> {
    return this.http.delete(`tables/${clientId}/${tableId}`);
  }

  public getDiet(clientId: string, date: string = todayIsoDate()): Observable<DietDaySummary | null> {
    return this.http.get<DietDaySummary | null>(
      `${this.base(clientId)}/diet?date=${encodeURIComponent(date)}`
    );
  }

  public getNutritionalGoals(clientId: string): Observable<NutritionalGoal[]> {
    return this.http.get<NutritionalGoal[]>(`${this.base(clientId)}/nutritional-goals`);
  }

  public revokeRelation(clientId: string, scope: ClientScope): Observable<unknown> {
    return this.http.delete(`trainer/clients/${clientId}?scope=${scope}`);
  }

  // `fiberGTotal` (Fase 5) y `reason` (Fase 4) son opcionales: los objetivos
  // sin fibra y los cambios sin motivo siguen siendo válidos.
  public assignNutritionalGoal(
    clientId: string,
    goal: {
      name: string;
      kcalTotal: number;
      proteinsGTotal: number;
      carbohydratesGTotal: number;
      fatGTotal: number;
      fiberGTotal?: number | null;
      reason?: string;
    }
  ): Observable<NutritionalGoal> {
    return this.http.post<NutritionalGoal>(
      `${this.base(clientId)}/nutritional-goals`,
      goal
    );
  }

  public activateNutritionalGoal(clientId: string, goalId: string): Observable<{ _id: string }> {
    return this.http.put<{ _id: string }>(
      `${this.base(clientId)}/nutritional-goals/${goalId}/activate`,
      {}
    );
  }

  public getAnthropometryRequest(clientId: string): Observable<AnthropometryRequest | null> {
    return this.http.get<AnthropometryRequest | null>(`${this.base(clientId)}/anthropometry-request`);
  }

  public upsertAnthropometryRequest(
    clientId: string,
    body: { fields: string[]; notes: string; cadence: AnthropometryRequestCadence; customIntervalDays: number | null }
  ): Observable<AnthropometryRequest> {
    return this.http.put<AnthropometryRequest>(`${this.base(clientId)}/anthropometry-request`, body);
  }

  public cancelAnthropometryRequest(clientId: string): Observable<unknown> {
    return this.http.delete(`${this.base(clientId)}/anthropometry-request`);
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

  public setNotePinned(clientId: string, noteId: string, pinned: boolean): Observable<TrainerNote> {
    return this.http.patch<TrainerNote>(`${this.base(clientId)}/notes/${noteId}`, { pinned });
  }

  public getCheckinConfig(clientId: string): Observable<CheckinConfig | null> {
    return this.http.get<CheckinConfig | null>(`${this.base(clientId)}/checkin-config`);
  }

  public getCheckinResponses(clientId: string): Observable<CheckinResponseEntry[]> {
    return this.http.get<CheckinResponseEntry[]>(`${this.base(clientId)}/checkin-responses`);
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

  // Movimiento 3 Coach Pro — altura, sexo y nacimiento del cliente, lo único
  // que le falta a la calculadora corporal (las mediciones ya las carga la
  // pestaña). Llamada propia y barata (una consulta): colgarla de
  // getSummary obligaría a Medidas a pagar las ~9 consultas de Resumen.
  public getBodyProfile(clientId: string): Observable<ClientBodyProfile> {
    return this.http.get<ClientBodyProfile>(`${this.base(clientId)}/body-profile`);
  }

  // Movimiento 5 Coach Pro — suplementación pautada. El catálogo de momentos
  // lo decide el backend, igual que el de dolor y el de reglas: así es
  // imposible que la interfaz ofrezca uno que el validador no conoce.
  public getSupplementTimings(): Observable<{ timings: SupplementTiming[] }> {
    return this.http.get<{ timings: SupplementTiming[] }>('supplements/timings');
  }

  public getSupplements(clientId: string): Observable<Supplement[]> {
    return this.http.get<Supplement[]>(`${this.base(clientId)}/supplements`);
  }

  public createSupplement(clientId: string, payload: Partial<Supplement>): Observable<Supplement> {
    return this.http.post<Supplement>(`${this.base(clientId)}/supplements`, payload);
  }

  public updateSupplement(
    clientId: string,
    supplementId: string,
    payload: Partial<Supplement>
  ): Observable<Supplement> {
    return this.http.put<Supplement>(
      `${this.base(clientId)}/supplements/${supplementId}`,
      payload
    );
  }

  public deleteSupplement(clientId: string, supplementId: string): Observable<void> {
    return this.http.delete<void>(`${this.base(clientId)}/supplements/${supplementId}`);
  }

  // Movimiento 5 Coach Pro — qué tiene que comprar el cliente para cumplir
  // el plan de ese rango. Sin modelo nuevo detrás: son los mismos días de
  // dieta sumados por producto.
  public getShoppingList(
    clientId: string,
    from: string,
    to: string
  ): Observable<{
    items: { name: string; quantity: number; dayCount: number }[];
    daysWithPlan: number;
    period: { from: string; to: string } | null;
  }> {
    return this.http.get<{
      items: { name: string; quantity: number; dayCount: number }[];
      daysWithPlan: number;
      period: { from: string; to: string } | null;
    }>(`${this.base(clientId)}/shopping-list?from=${from}&to=${to}`);
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

  public getPayments(clientId: string): Observable<TrainerPayment[]> {
    return this.http.get<TrainerPayment[]>(`${this.base(clientId)}/payments`);
  }

  public createPayment(
    clientId: string,
    payment: { amount: number; dueDate: string; note?: string }
  ): Observable<TrainerPayment> {
    return this.http.post<TrainerPayment>(`${this.base(clientId)}/payments`, payment);
  }

  public setPaymentPaid(clientId: string, paymentId: string, paid: boolean): Observable<TrainerPayment> {
    return this.http.patch<TrainerPayment>(`${this.base(clientId)}/payments/${paymentId}`, { paid });
  }

  // coach-tab FASE4 — tareas/hábitos.
  public getTasks(clientId: string): Observable<TrainerTask[]> {
    return this.http.get<TrainerTask[]>(`${this.base(clientId)}/tasks`);
  }

  public createTask(
    clientId: string,
    task: { type: TrainerTaskType; label?: string; target: number; unit: string }
  ): Observable<TrainerTask> {
    return this.http.post<TrainerTask>(`${this.base(clientId)}/tasks`, task);
  }

  public deactivateTask(clientId: string, taskId: string): Observable<unknown> {
    return this.http.delete(`${this.base(clientId)}/tasks/${taskId}`);
  }

  // F12 — pautar una única composición, aplicación inmediata sobre el hueco de comida.
  public prescribeMeal(
    clientId: string,
    date: string,
    mealId: string,
    body: { customProducts: unknown[]; customRecipes: unknown[]; merge: boolean }
  ): Observable<unknown> {
    return this.http.post(
      `${this.base(clientId)}/diet-days/${date}/meals/${mealId}/prescribe`,
      body
    );
  }

  // F28 — 2+ alternativas nombradas, aplicación diferida hasta que el cliente elija.
  public proposeMealAlternatives(
    clientId: string,
    date: string,
    mealSlot: string,
    alternatives: { label: string; customProducts: unknown[]; customRecipes: unknown[] }[]
  ): Observable<unknown> {
    return this.http.post(
      `${this.base(clientId)}/diet-days/${date}/meals/${encodeURIComponent(mealSlot)}/propose`,
      { alternatives }
    );
  }

  // F29 — preferencias nutricionales del cliente, solo lectura para el profesional.
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

  // --- F30: aplicar en bloque (reutiliza F11/F12/F13, una vez por cliente destino) ---
  public applyRoutineToClients(
    sourceTableId: string,
    targetClientIds: string[]
  ): Observable<BulkApplyResult[]> {
    return this.http.post<BulkApplyResult[]>(
      `trainer/routines/${sourceTableId}/apply-to-clients`,
      { targetClientIds }
    );
  }

  public applyMealToClients(
    sourceClientId: string,
    date: string,
    mealSlot: string,
    body: { customProducts: unknown[]; customRecipes: unknown[]; merge: boolean },
    targetClientIds: string[]
  ): Observable<BulkApplyResult[]> {
    return this.http.post<BulkApplyResult[]>(
      `${this.base(sourceClientId)}/diet-days/${date}/meals/${encodeURIComponent(mealSlot)}/apply-to-clients`,
      { ...body, targetClientIds }
    );
  }

  public applyGoalToClients(
    sourceClientId: string,
    goal: { name: string; kcalTotal: number; proteinsGTotal: number; carbohydratesGTotal: number; fatGTotal: number },
    targetClientIds: string[]
  ): Observable<BulkApplyResult[]> {
    return this.http.post<BulkApplyResult[]>(
      `${this.base(sourceClientId)}/nutrition-goals/apply-to-clients`,
      { ...goal, targetClientIds }
    );
  }
}
