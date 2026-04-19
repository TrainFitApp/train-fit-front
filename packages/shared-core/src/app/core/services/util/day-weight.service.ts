import { Injectable } from '@angular/core';
import { DayWeight } from 'src/app/features/diet-days/components/weight-info/models/dayWeight';
import { DietDay } from '../../models/dietDay';

@Injectable()
export class DayWeightService {
  constructor() {}

  public getDayWeights(dietDays: DietDay[]): DayWeight[] {
    // TODO: Sacar a variable
    const days = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
    ];
    const dayWeights: DayWeight[] = [];

    for (const dietDay of dietDays) {
      let dayWeight: DayWeight = {
        date: new Date(dietDay.date),  
        weight: dietDay.weight,
        name: days[new Date(dietDay.date).getDay()],
        notes: dietDay.notes,
        meals: dietDay.meals,
      };
      dayWeight.date = new Date(dietDay.date);
      dayWeight.weight = dietDay.weight;
      dayWeight.name = days[new Date(dietDay.date).getDay()];
      dayWeight.notes = dietDay.notes;
      dayWeight.meals = dietDay.meals;
      dayWeights.push(dayWeight);
    }

    return dayWeights;
  }
}
