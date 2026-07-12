import { Injectable } from '@angular/core';

export type RmFormula = 'epley' | 'brzycki' | 'lombardi';

export interface RmPercentageRow {
  percentage: number;
  weight: number;
}

const ROUND_INCREMENT_KG = 2.5;

@Injectable()
export class RmCalculatorService {
  public calculateEpley(weight: number, reps: number): number {
    if (reps <= 1) return weight;
    return weight * (1 + reps / 30);
  }

  public calculateBrzycki(weight: number, reps: number): number {
    if (reps <= 1) return weight;
    return weight * (36 / (37 - reps));
  }

  public calculateLombardi(weight: number, reps: number): number {
    if (reps <= 1) return weight;
    return weight * Math.pow(reps, 0.1);
  }

  public calculateAll(weight: number, reps: number): Record<RmFormula, number> {
    return {
      epley: this.calculateEpley(weight, reps),
      brzycki: this.calculateBrzycki(weight, reps),
      lombardi: this.calculateLombardi(weight, reps),
    };
  }

  // Corte único y no ambiguo: 2-5 Epley, 6-8 Brzycki, 9+ Lombardi.
  public getRecommendedFormula(reps: number): RmFormula {
    if (reps <= 5) return 'epley';
    if (reps <= 8) return 'brzycki';
    return 'lombardi';
  }

  // Del 100% hacia abajo, para que la fila de referencia (1RM) aparezca primero.
  public getPercentageTable(
    oneRm: number,
    percentagesDesc: number[],
  ): RmPercentageRow[] {
    return percentagesDesc.map((percentage) => ({
      percentage,
      weight: this.roundToIncrement((oneRm * percentage) / 100, ROUND_INCREMENT_KG),
    }));
  }

  private roundToIncrement(value: number, increment: number): number {
    if (!Number.isFinite(value)) return 0;
    return Math.round(value / increment) * increment;
  }
}
