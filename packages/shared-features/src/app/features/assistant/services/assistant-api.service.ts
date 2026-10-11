import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import {
  AssistantChoice,
  AssistantImage,
  AssistantReply,
  AssistantState,
  AssistantView,
  ReferralState,
} from '../models/assistant.model';

// Asistente trAInfit — espejo de components/assistant/ y components/referrals/
// (backend). Solo HTTP; el estado vive en AssistantService.
@Injectable({ providedIn: 'root' })
export class AssistantApiService {
  constructor(private http: HttpService) {}

  public getState(): Observable<AssistantState> {
    return this.http.get<AssistantState>('assistant');
  }

  public giveConsent(): Observable<{ consent: boolean }> {
    return this.http.put<{ consent: boolean }>('assistant/consent', {});
  }

  // Lo único que pasa por la IA (y gasta ATP), salvo las frases obvias que
  // resuelve el back sin ella. `view`: lo que tiene en pantalla; `image`: la
  // foto del plato (Premium).
  public sendMessage(text: string, view: AssistantView | null, image?: AssistantImage | null): Observable<AssistantReply> {
    return this.http.post<AssistantReply>('assistant/messages', { text, view, ...(image ? { image } : {}) });
  }

  // Atajo sin IA: 0 ATP.
  public runQuick(intent: string, view: AssistantView | null): Observable<AssistantReply> {
    return this.http.post<AssistantReply>(`assistant/quick/${encodeURIComponent(intent)}`, { view });
  }

  // 👍/👎 de una respuesta (`ref`: la que trae el turno), o null para quitarlo.
  public rateReply(ref: string, value: 'up' | 'down' | null): Observable<{ ref: string; feedback: 'up' | 'down' | null }> {
    return this.http.post<{ ref: string; feedback: 'up' | 'down' | null }>('assistant/feedback', { ref, value });
  }

  public confirmAction(actionId: string, choice: AssistantChoice): Observable<AssistantReply> {
    return this.http.post<AssistantReply>(`assistant/actions/${actionId}/confirm`, choice);
  }

  public cancelAction(actionId: string): Observable<{ turn: AssistantReply['turn'] }> {
    return this.http.delete(`assistant/actions/${actionId}`);
  }

  public resetConversation(): Observable<void> {
    return this.http.delete('assistant/conversation');
  }

  public getReferral(): Observable<ReferralState> {
    return this.http.get<ReferralState>('referrals/mine');
  }

  public redeemReferral(code: string): Observable<{ invitedBy: boolean }> {
    return this.http.post<{ invitedBy: boolean }>('referrals/redeem', { code });
  }
}
