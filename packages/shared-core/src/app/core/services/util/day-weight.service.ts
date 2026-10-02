import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DayWeight } from 'src/app/features/diet-days/components/weight-info/models/dayWeight';
import { DietDay } from '../../models/dietDay';

@Injectable()
export class DayWeightService {
  constructor(private translate: TranslateService) {}

  public getDayWeights(dietDays: DietDay[]): DayWeight[] {
    // WEIGHT_INFO.DAYS empieza en lunes; getDay() cuenta desde el domingo.
    const mondayFirst: string[] = this.translate.instant('WEIGHT_INFO.DAYS');
    const days = [mondayFirst[6], ...mondayFirst.slice(0, 6)];
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
