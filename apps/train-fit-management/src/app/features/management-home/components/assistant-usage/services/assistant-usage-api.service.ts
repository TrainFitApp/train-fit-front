import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

export interface AssistantUsageTotals {
  messages: number;
  users: number;
  atp: number;
  usd: number;
  unpriced: number;
  avgAtp: number;
  avgLatencyMs: number;
  notUnderstood: number;
  refusals: number;
  // Resueltos sin modelo (vía rápida), con foto, y valoraciones 👍/👎.
  local: number;
  images: number;
  feedback: { up: number; down: number };
  cacheShare: number;
  tokens: { input: number; output: number; cacheRead: number; cacheWrite: number };
}

export interface AssistantUsageReport {
  month: string;
  status: { configured: boolean; model: string };
  totals: AssistantUsageTotals;
  byApp: { app: 'client' | 'trainer'; messages: number; users: number; atp: number; usd: number }[];
  byIntent: { app: 'client' | 'trainer'; intent: string | null; messages: number; atp: number; avgAtp: number; usd: number; up: number; down: number }[];
  history: { month: string; messages: number; atp: number; usd: number }[];
}

// Consumo del asistente trAInfit (GET /assistant/admin/usage): sin texto de
// nadie, solo cuánto se usa, en qué y cuánto cuesta.
@Injectable({ providedIn: 'root' })
export class AssistantUsageApiService {
  private readonly http = inject(HttpService);

  public getUsage(month?: string): Observable<AssistantUsageReport> {
    return this.http.get<AssistantUsageReport>(month ? `assistant/admin/usage?month=${month}` : 'assistant/admin/usage');
  }
}
