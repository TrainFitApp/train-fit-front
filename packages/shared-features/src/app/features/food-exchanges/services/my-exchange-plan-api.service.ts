import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/core/services/http/http.service';

// Movimiento 5 Coach Pro — espejo de la parte de NutritionalGoal y
// FoodExchangeGroup que necesita el planificador del cliente.

export interface MyGoalMealExchange {
  groupId: string;
  groupName: string;
  count: number;
}

export interface MyGoalMeal {
  name: string;
  exchanges: MyGoalMealExchange[];
}

export interface MyExchangeItem {
  name: string;
  quantity: number;
  unit: string;
  note?: string;
}

export interface MyExchangeGroup {
  _id: string;
  name: string;
  category: string;
  equivalenceNote: string;
  items: MyExchangeItem[];
  /** Qué lleva UNA ración. Cada macro puede faltar por separado. */
  serving?: {
    kcal: number | null;
    protein: number | null;
    carbs: number | null;
    fat: number | null;
  } | null;
  /** El grupo que no se pesa: "come lo que quieras de estos". */
  freeQuantity?: boolean;
}

export interface MyExchangePlan {
  meals: MyGoalMeal[];
  groups: MyExchangeGroup[];
}

@Injectable({ providedIn: 'root' })
export class MyExchangePlanApiService {
  constructor(private http: HttpService) {}

  // Una sola petición para las dos mitades: el reparto no sirve de nada sin
  // los grupos (dice "2 raciones de proteína" y el cliente necesita saber
  // cuáles), y pedirlos por separado dejaría la pantalla a medias mientras
  // llega la segunda.
  public getMyPlan(): Observable<MyExchangePlan> {
    return this.http.get<MyExchangePlan>('trainer/food-exchanges/my-plan');
  }
}
