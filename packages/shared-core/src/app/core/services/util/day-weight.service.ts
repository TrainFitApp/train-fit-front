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
      const parsedDate = new Date(dietDay.date);
      const dayWeight: DayWeight = {
        date: parsedDate,
        weight: dietDay.weight,
        name: days[parsedDate.getDay()],
        notes: dietDay.notes,
        meals: dietDay.meals,
      };
      dayWeights.push(dayWeight);
    }

    return dayWeights;
  }
}
