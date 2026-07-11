import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  RmCalculatorService,
  RmFormula,
  RmPercentageRow,
} from 'src/app/core/services/rm-calculator/rm-calculator.service';

// Descendente: la fila del 1RM (100%) aparece primero.
const PERCENTAGES_DESC = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];

const FORMULA_DESCRIPTIONS: Record<RmFormula, string> = {
  epley: 'Más precisa entre 2 y 6 repeticiones.',
  brzycki: 'Más precisa entre 3 y 10 repeticiones.',
  lombardi: 'Más precisa a partir de 6 repeticiones.',
};

@Component({
  selector: 'app-rm-calculator',
  templateUrl: './rm-calculator.page.html',
  styleUrls: ['./rm-calculator.page.scss'],
})
export class RmCalculatorPage {
  public readonly formulas: RmFormula[] = ['epley', 'brzycki', 'lombardi'];

  public weight: number | null = null;
  public reps: number | null = null;

  public hasCalculated = false;
  public showRangeWarning = false;
  public results: Record<RmFormula, number> | null = null;
  public recommendedFormula: RmFormula = 'epley';
  public selectedTableFormula: RmFormula = 'epley';
  public percentageTable: RmPercentageRow[] = [];

  constructor(
    private rmCalculatorService: RmCalculatorService,
    private navCtrl: NavController
  ) {}

  public goBack(): void {
    this.navCtrl.back();
  }

  public get canCalculate(): boolean {
    return (
      this.weight != null &&
      this.weight > 0 &&
      this.reps != null &&
      this.reps >= 1
    );
  }

  public calculate(): void {
    if (!this.canCalculate) return;

    this.showRangeWarning = this.reps < 1 || this.reps > 15;
    this.recommendedFormula = this.rmCalculatorService.getRecommendedFormula(
      this.reps
    );
    this.results = this.rmCalculatorService.calculateAll(this.weight, this.reps);
    this.selectedTableFormula = this.recommendedFormula;
    this.hasCalculated = true;
    this.updatePercentageTable();
  }

  public selectTableFormula(value: any): void {
    this.selectedTableFormula = value as RmFormula;
    this.updatePercentageTable();
  }

  public formulaLabel(formula: RmFormula): string {
    switch (formula) {
      case 'epley':
        return 'Epley';
      case 'brzycki':
        return 'Brzycki';
      case 'lombardi':
        return 'Lombardi';
    }
  }

  public formulaDescription(formula: RmFormula): string {
    return FORMULA_DESCRIPTIONS[formula];
  }

  public round1(value: number): number {
    return Math.round(value * 10) / 10;
  }

  private updatePercentageTable(): void {
    if (!this.results) return;
    const oneRm = this.results[this.selectedTableFormula];
    this.percentageTable = this.rmCalculatorService.getPercentageTable(
      oneRm,
      PERCENTAGES_DESC
    );
  }
}
