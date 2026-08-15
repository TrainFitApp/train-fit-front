import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TutorialContent } from '../../models/tutorial';
import { HttpService } from '../http/http.service';

@Injectable()
export class TutorialApiService {
  private static readonly TUTORIALS_ENDPOINT = 'tutorials';
  private static readonly ONBOARDING_ENDPOINT = 'onboarding/tutorials';

  constructor(private readonly http: HttpService) {}

  public getCatalog(): Observable<TutorialContent[]> {
    return this.http.get<TutorialContent[]>(TutorialApiService.TUTORIALS_ENDPOINT);
  }

  public complete(key: string): Observable<{ pendingTutorials: string[] }> {
    return this.http.post<{ pendingTutorials: string[] }>(
      `${TutorialApiService.ONBOARDING_ENDPOINT}/complete`,
      { key }
    );
  }

  public reopen(key: string): Observable<{ pendingTutorials: string[] }> {
    return this.http.post<{ pendingTutorials: string[] }>(
      `${TutorialApiService.ONBOARDING_ENDPOINT}/reopen`,
      { key }
    );
  }
}
