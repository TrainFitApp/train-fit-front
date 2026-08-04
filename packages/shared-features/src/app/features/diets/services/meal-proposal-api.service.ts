import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';
import { Meal } from 'src/app/core/models/meal';
import { MealProposal } from '../models/meal-proposal.model';

@Injectable({ providedIn: 'root' })
export class MealProposalApiService {
  constructor(private http: HttpService) {}

  public listForDate(date: string): Observable<MealProposal[]> {
    return this.http.get<MealProposal[]>(`diets/${date}/meal-proposals`);
  }

  public choose(date: string, proposalId: string, chosenIndex: number): Observable<Meal> {
    return this.http.post<Meal>(`diets/${date}/meal-proposals/${proposalId}/choose`, {
      chosenIndex,
    });
  }
}
