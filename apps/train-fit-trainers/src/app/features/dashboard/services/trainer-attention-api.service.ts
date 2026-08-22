import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { AttentionItem } from '../models/attention-item.model';

@Injectable({ providedIn: 'root' })
export class TrainerAttentionApiService {
  private static readonly ENDPOINT = 'trainer/dashboard/attention-items';

  constructor(private http: HttpService) {}

  public getMine(): Observable<AttentionItem[]> {
    return this.http.get<AttentionItem[]>(TrainerAttentionApiService.ENDPOINT);
  }
}
