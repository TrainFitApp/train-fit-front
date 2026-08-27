import { Component, Input, OnChanges } from '@angular/core';
import {
  ACTIVITY_FACTOR_VALUES,
  ACTIVITY_FACTOR_TYPE,
} from 'src/app/shared/constants/activity-factor';
import {
  ageFromBirthDate,
  bmi,
  bmrHarrisBenedict,
  bmrKatchMcArdle,
  bmrMifflinStJeor,
  BMR_FORMULAS,
  BmrFormulaKey,
  bodyFatDeurenberg,
  bodyFatNavy,
  fatMassFromPercentage,
  leanMassFromPercentage,
  proportionIndices,
  ProportionIndex,
  totalEnergyExpenditure,
} from 'src/app/core/utils/body-metrics.util';
import { ClientBodyProfile } from '../../models/client-progress.model';
import { AnthropometryEntry } from '../../models/client-detail.model';

interface BodyFatEstimate {
  key: string;
  label: string;
  percentage: number;
  // De dónde sale, para que el entrenador sepa qué medida revisar si el
  // número le chirría.
  from: string;
  // El dato medido gana al estimado siempre que exista.
  measured: boolean;
}

interface BmrRow {
  key: BmrFormulaKey;
  label: string;
  note: string;
  // null = a esta fórmula le falta algún dato. Se sigue mostrando la fila,
  // diciendo QUÉ falta: esconderla dejaría al entrenador preguntándose por
  // qué ve dos fórmulas y no tres.
  value: number | null;
  missing: string;
}

/**
 * Movimiento 3 Coach Pro — las cuentas que el entrenador hacía a mano (o en
 * una hoja aparte) sobre las medidas que la app ya tiene guardadas.
 *
 * Nada de esto se guarda: son valores DERIVADOS de la última medición, y
 * persistirlos crearía una segunda versión de la verdad que se queda vieja
 * en cuanto el cliente se vuelve a medir. Las fórmulas viven en
 * core/utils/body-metrics.util.ts, puras y compartidas con la app del
 * cliente (que ya usaba Mifflin-St Jeor para su propio objetivo).
 */
@Component({
  selector: 'app-body-calculator',
  templateUrl: 'body-calculator.component.html',
  styleUrls: ['body-calculator.component.scss'],
})
export class BodyCalculatorComponent implements OnChanges {
  @Input() public profile: ClientBodyProfile | null = null;
  @Input() public measurement: AnthropometryEntry | null = null;

  public readonly activityFactors: ACTIVITY_FACTOR_TYPE[] = ACTIVITY_FACTOR_VALUES;

  // Moderado por defecto: es el punto medio de la escala y el que menos se
  // equivoca cuando no se sabe nada del cliente.
  public activityFactor = 1.45;

  public age: number | null = null;
  public bmiValue: number | null = null;
  public bmrRows: BmrRow[] = [];
  public bodyFatEstimates: BodyFatEstimate[] = [];
  public selectedBodyFat: number | null = null;
  public fatMassKg: number | null = null;
  public leanMassKg: number | null = null;
  public indices: ProportionIndex[] = [];

  // Qué le falta al cliente para que esto sirva de algo. Se dice una vez
  // arriba en vez de dejar la tarjeta llena de guiones.
  public missingProfile: string[] = [];

  public ngOnChanges(): void {
    this.recompute();
  }

  public onActivityChange(value: number): void {
    this.activityFactor = value;
  }

  // El entrenador elige de qué estimación parten masa grasa y magra: dos
  // métodos sobre el mismo cliente pueden diferir 3-4 puntos, y el que sabe
  // cuál se parece más a ese cliente es él, no la app.
  public selectBodyFat(percentage: number): void {
    this.selectedBodyFat = percentage;
    this.recomputeComposition();
  }

  public tdeeFor(row: BmrRow): number | null {
    return totalEnergyExpenditure(row.value, this.activityFactor);
  }

  public trackByKey(_index: number, item: { key: string }): string {
    return item.key;
  }

  private recompute(): void {
    const profile = this.profile;
    const measurement = this.measurement;

    this.age = ageFromBirthDate(profile?.birth);
    const weightKg = measurement?.weight ?? null;
    const heightCm = profile?.heightCm ?? null;
    const sex = profile?.sex ?? null;

    this.missingProfile = [];
    if (!weightKg) this.missingProfile.push('peso');
    if (!heightCm) this.missingProfile.push('altura');
    if (this.age === null) this.missingProfile.push('fecha de nacimiento');
    if (sex === null || sex === undefined) this.missingProfile.push('sexo');

    this.bmiValue = bmi(weightKg, heightCm);

    const input = { weightKg, heightCm, age: this.age, sex };
    this.bodyFatEstimates = this.buildBodyFatEstimates(input, measurement);

    // Se parte del dato medido si lo hay; si no, del primero disponible.
    // Cambiarlo es un clic, pero el valor por defecto tiene que ser el mejor
    // disponible, no el primero por orden alfabético.
    const preferred =
      this.bodyFatEstimates.find((estimate) => estimate.measured) || this.bodyFatEstimates[0];
    this.selectedBodyFat = preferred?.percentage ?? null;

    this.recomputeComposition();
    this.bmrRows = this.buildBmrRows(input);

    this.indices = proportionIndices({
      chest: measurement?.chest,
      // Se usa cintura y, si no está apuntada, ombligo: son dos medidas
      // distintas, pero un entrenador que solo apunta una de las dos
      // prefiere el índice aproximado a ningún índice. La etiqueta de la
      // tarjeta dice cuál se ha usado.
      waist: measurement?.waist ?? measurement?.abdomen,
      hip: measurement?.hip,
      bicepsContracted: this.biggestBiceps(measurement),
      thighRelaxed: measurement?.thighRelaxed,
    });
  }

  public get waistSourceIsNavel(): boolean {
    return !this.measurement?.waist && !!this.measurement?.abdomen;
  }

  // El brazo dominante, no una media de los dos: es el que el entrenador
  // sigue, y promediarlos escondería una asimetría que importa.
  private biggestBiceps(measurement: AnthropometryEntry | null): number | null {
    const values = [measurement?.bicepsContractedL, measurement?.bicepsContractedR].filter(
      (value): value is number => typeof value === 'number' && value > 0
    );
    return values.length ? Math.max(...values) : null;
  }

  private buildBodyFatEstimates(
    input: { weightKg: number | null; heightCm: number | null; age: number | null; sex: number | null },
    measurement: AnthropometryEntry | null
  ): BodyFatEstimate[] {
    const estimates: BodyFatEstimate[] = [];

    // Bioimpedancia: es una medida, no una estimación. Va primero y marcada
    // como tal para que no compita de tú a tú con las fórmulas.
    if (measurement?.fatMass && input.weightKg) {
      estimates.push({
        key: 'scale',
        label: 'Báscula',
        percentage: Math.round((measurement.fatMass / input.weightKg) * 1000) / 10,
        from: `${measurement.fatMass} kg de masa grasa medidos`,
        measured: true,
      });
    }

    const navy = bodyFatNavy({
      sex: input.sex,
      heightCm: input.heightCm,
      neckCm: measurement?.neck ?? null,
      waistCm: measurement?.waist ?? measurement?.abdomen ?? null,
      hipCm: measurement?.hip ?? null,
    });
    if (navy !== null) {
      estimates.push({
        key: 'navy',
        label: 'Perímetros (Navy)',
        percentage: navy,
        from: 'Cuello, cintura' + (input.sex === 0 ? ' y cadera' : '') + ' y altura',
        measured: false,
      });
    }

    const deurenberg = bodyFatDeurenberg(input);
    if (deurenberg !== null) {
      estimates.push({
        key: 'deurenberg',
        label: 'IMC (Deurenberg)',
        percentage: deurenberg,
        from: 'Peso, altura, edad y sexo',
        measured: false,
      });
    }

    return estimates;
  }

  private recomputeComposition(): void {
    const weightKg = this.measurement?.weight ?? null;
    this.fatMassKg = fatMassFromPercentage(weightKg, this.selectedBodyFat);
    this.leanMassKg = leanMassFromPercentage(weightKg, this.selectedBodyFat);
  }

  private buildBmrRows(input: {
    weightKg: number | null;
    heightCm: number | null;
    age: number | null;
    sex: number | null;
  }): BmrRow[] {
    const values: Record<BmrFormulaKey, number | null> = {
      mifflin: bmrMifflinStJeor(input),
      harris: bmrHarrisBenedict(input),
      katch: bmrKatchMcArdle(this.leanMassKg),
    };

    return BMR_FORMULAS.map((formula) => ({
      key: formula.key,
      label: formula.label,
      note: formula.note,
      value: values[formula.key],
      missing:
        values[formula.key] !== null
          ? ''
          : formula.key === 'katch'
          ? 'Necesita un % graso: apunta masa grasa o los perímetros de cuello y cintura.'
          : `Faltan datos del cliente: ${this.missingProfile.join(', ')}.`,
    }));
  }
}
