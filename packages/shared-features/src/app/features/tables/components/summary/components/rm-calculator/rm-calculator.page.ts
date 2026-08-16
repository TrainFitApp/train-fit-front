import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import {
  RmCalculatorService,
  RmFormula,
  RmPercentageRow,
} from 'src/app/core/services/rm-calculator/rm-calculator.service';
import { AdMobService } from 'src/app/core/services/util/ad-mob.service';

// Descendente: la fila del 1RM (100%) aparece primero.
const PERCENTAGES_DESC = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];

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
    private navCtrl: NavController,
    private adMobService: AdMobService,
    private translateService: TranslateService
  ) { }

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

    // Esperar a que las cards de resultados se rendericen antes de hacer scroll.
    setTimeout(() => {
      const element = document.getElementById("results-card");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 500);

    // AdMobService ya comprueba internamente si el usuario es premium/adsEnabled;
    // en usuarios pro esto no hace nada.
    void this.adMobService.interstitial('rm_calculator').catch((error) => {
      console.error('Error showing rm_calculator interstitial:', error);
    });
  }

  public selectTableFormula(value: any): void {
    this.selectedTableFormula = value as RmFormula;
    this.updatePercentageTable();
  }

  public formulaLabel(formula: RmFormula): string {
    switch (formula) {
      case 'epley':
        return this.translateService.instant('RM_CALCULATOR.FORMULA_EPLEY');
      case 'brzycki':
        return this.translateService.instant('RM_CALCULATOR.FORMULA_BRZYCKI');
      case 'lombardi':
        return this.translateService.instant('RM_CALCULATOR.FORMULA_LOMBARDI');
    }
  }

  public formulaDescription(formula: RmFormula): string {
    switch (formula) {
      case 'epley':
        return this.translateService.instant('RM_CALCULATOR.FORMULA_EPLEY_DESC');
      case 'brzycki':
        return this.translateService.instant('RM_CALCULATOR.FORMULA_BRZYCKI_DESC');
      case 'lombardi':
        return this.translateService.instant('RM_CALCULATOR.FORMULA_LOMBARDI_DESC');
    }
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
