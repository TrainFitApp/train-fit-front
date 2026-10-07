import { Injectable, signal, computed, WritableSignal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import {
  ACTIVITY_FACTOR_TYPE,
  ACTIVITY_FACTOR_VALUES,
} from 'src/app/shared/constants/activity-factor';
import { SEX_TYPES } from 'src/app/shared/constants/sex';
import { MACROS_VALUES } from 'src/app/shared/models/macros-data';
import { STEPS, STEPS_TYPES } from 'src/app/shared/constants/steps';
import { ageFromBirthDate, bmrMifflinStJeor, toBodyInput } from '../../utils/body-metrics.util';
import { User } from '../../models/user';
import { UserAPIService } from './user-api.service';

@Injectable()
export class UserService {
  // Signal para el usuario local
  private readonly _localUser: WritableSignal<User | null> =
    signal<User | null>(null);

  // Signal de solo lectura
  public readonly localUser = computed(() => this._localUser());

  // El mismo estado como Observable, para quien se suscribe con RxJS.
  public readonly getLocalUser$ = toObservable(this._localUser);

  public SEX_TYPES = SEX_TYPES;
  public MACROS_VALUES = MACROS_VALUES;

  // Getter sincrónico para acceso directo al valor
  public get getLocalUser(): User | null {
    return this._localUser();
  }

  // Setter para actualizar el usuario
  public set setLocalUser(user: User | null) {
    this._localUser.set(user);
  }

  constructor(
    private userAPIService: UserAPIService,
  ) {}

  public getUserByEmail(email: string): Observable<User> {
    return this.userAPIService.getUserByEmail(email).pipe(take(1));
  }

  public checkEmail(email: string): Observable<boolean> {
    return this.userAPIService.checkEmail(email).pipe(take(1), (source) =>
      source.pipe((obs) => {
        return new Observable<boolean>((subscriber) => {
          const sub = obs.subscribe({
            next: (res: any) => {
              try {
                let exists = false;
                if (typeof res === 'boolean') {
                  exists = res;
                } else if (typeof res === 'string') {
                  const s = res.trim().toLowerCase();
                  exists = s === 'true' || s === '1' || s === 'yes';
                } else if (res && typeof res === 'object') {
                  if (typeof (res as any).exists === 'boolean')
                    exists = (res as any).exists;
                  else if (typeof (res as any).found === 'boolean')
                    exists = (res as any).found;
                  else if (typeof (res as any).emailExist === 'boolean')
                    exists = (res as any).emailExist;
                  else if ((res as any)._id || (res as any).email)
                    exists = true;
                  else exists = false;
                } else {
                  exists = !!res;
                }
                subscriber.next(exists);
                subscriber.complete();
              } catch (e) {
                subscriber.next(false);
                subscriber.complete();
              }
            },
            error: () => {
              subscriber.next(false);
              subscriber.complete();
            },
          });
          return () => sub.unsubscribe();
        });
      })
    );
  }

  public createUser(user: User, date: Date): Observable<User> {
    const userWithMacros = this.setUserMacrosAndKcal(user);

    return this.userAPIService.createUser(userWithMacros, date).pipe(
      take(1),
      tap((createdUser) => (this.setLocalUser = createdUser)),
    );
  }

  public createProfessionalUser(payload: {
    name: string;
    lastname: string;
    email: string;
    password: string;
  }): Observable<User> {
    return this.userAPIService.createProfessionalUser(payload).pipe(
      take(1),
      tap((createdUser) => (this.setLocalUser = createdUser)),
    );
  }

  public createGoogleUser(
    user: User,
    date: Date,
    tokenGoogle: string
  ): Observable<any> {
    return this.userAPIService.createGoogleUser(user, date, tokenGoogle).pipe(
      take(1),
    );
  }

  public updateUser(user: User): Observable<User> {
    const { kcalTotal, proteinsGTotal, carbohydratesGTotal, fatGTotal, ...cleanUser } = user as any;
    return this.userAPIService.updateUser({ ...cleanUser, _id: user._id } as User).pipe(
      take(1),
      tap((updatedUser) => (this.setLocalUser = updatedUser))
    );
  }

  public updateGoogleUser(user: User): Observable<any> {
    const userWithMacros = this.setUserMacrosAndKcal(user);
    return this.userAPIService.updateGoogleUser(userWithMacros).pipe(
      take(1),
      tap((updatedUser) => (this.setLocalUser = updatedUser.user))
    );
  }

  public createAppleUser(
    user: User,
    date: Date,
    tokenApple: string
  ): Observable<any> {
    return this.userAPIService.createAppleUser(user, date, tokenApple).pipe(
      take(1),
    );
  }

  public updateAppleUser(user: User): Observable<any> {
    const userWithMacros = this.setUserMacrosAndKcal(user);
    return this.userAPIService.updateAppleUser(userWithMacros).pipe(
      take(1),
      tap((updatedUser) => (this.setLocalUser = updatedUser.user))
    );
  }

  public searchUsers(
    page: number,
    search: string,
    filters?: { premiumOnly?: boolean; withHashOnly?: boolean }
  ): Observable<{ users: User[]; total: number }> {
    return this.userAPIService.searchUsers(page, search, filters).pipe(take(1));
  }

  public checkHash(id: string, hash: string): Observable<User> {
    return this.userAPIService.checkHash(id, hash);
  }

  public clearUserHash(id: string): Observable<void> {
    return this.userAPIService.clearUserHash(id).pipe(take(1));
  }

  public sendSuggestions(email: string, suggestions: string) {
    return this.userAPIService
      .sendSuggestions(email, suggestions)
      .pipe(take(1));
  }

  public deleteById(id: string) {
    return this.userAPIService.deleteById(id);
  }

  public verifyPassword(password: string) {
    return this.userAPIService.verifyPassword(password).pipe(take(1));
  }

  public sendMailCode(email: string): Observable<any> {
    return this.userAPIService.sendMailCode(email).pipe(take(1));
  }

  public checkRestoreCode(
    email: string,
    password: string,
    hash: string
  ): Observable<any> {
    return this.userAPIService
      .checkRestoreCode(email, password, hash)
      .pipe(take(1));
  }

  public setUserMacrosAndKcal(user: User): User {
    const finalWeight: number = this.getFinalWeight(user);
    const u = user as any;

    const energyExp: number = this.energyExpenditure(
      this.mifflinStJeorBMR(
        user.sex,
        user.height,
        finalWeight,
        this.getAge(user.birth)
      ),
      user.activity,
      user.steps,
      user.training
    );

    const proteinGT: number = this.proteinsGTotal(
      user.objetive,
      finalWeight,
      user.sex
    );

    const fatGT: number = this.fatGTotal(user.objetive, finalWeight, user.sex);

    u.kcalTotal = this.calculateKcal(user);
    u.proteinsGTotal = parseFloat(proteinGT.toFixed(2));
    u.fatGTotal = parseFloat(fatGT.toFixed(2));
    u.carbohydratesGTotal = parseFloat(
      this.carbohydratesGTotal(
        energyExp,
        user.objetive,
        proteinGT,
        fatGT
      ).toFixed(2)
    );

    return user;
  }

  public calculateKcal(user: User): number {
    const finalWeight: number = this.getFinalWeight(user);

    const energyExp: number = this.energyExpenditure(
      this.mifflinStJeorBMR(
        user.sex,
        user.height,
        finalWeight,
        this.getAge(user.birth)
      ),
      user.activity,
      user.steps,
      user.training
    );

    return Math.round(this.kcalTotal(energyExp, user.objetive));
  }

  private getFinalWeight(user: User): number {
    // Los formularios (registro, editor de perfil) entregan peso/altura como
    // string pese al tipo de User.
    const { weightKg, heightCm } = toBodyInput({ ...user, age: null });
    // Sin peso se mantiene el NaN de siempre (viaja como null en el JSON):
    // un 0 se leería como "0 g de proteína", no como "sin dato".
    if (!weightKg || !heightCm) return weightKg ?? NaN;
    if (this.getIMC(weightKg, heightCm) >= 30)
      return this.getIdealAdjustedWeight(this.getIdealWeight(heightCm, user.sex), weightKg);
    return weightKg;
  }

  private getIdealAdjustedWeight(idealWeight: number, weight: number): number {
    return idealWeight + 0.4 * (weight - idealWeight);
  }

  private getIMC(weight: number, height: number): number {
    return weight / (height / 100) ** 2;
  }

  private getIdealWeight(height: number, sex: SEX_TYPES): number {
    return (sex === SEX_TYPES.male ? 50 : 45.5) + 0.91 * (height - 152.4);
  }

  /**
   * Metabolismo basal por Mifflin-St Jeor (1990).
   *
   * La fórmula vive en utils/body-metrics.util.ts (pura, con sus tests).
   *
   * Este método se queda como adaptador: bmrMifflinStJeor devuelve null si
   * le faltan datos, y todo lo de aquí abajo espera un número (el flujo de
   * alta ya obliga a rellenar peso, altura y fecha de nacimiento antes de
   * llegar).
   */
  private mifflinStJeorBMR(
    sex: number,
    height: number,
    weight: number,
    age: number
  ): number {
    return bmrMifflinStJeor(toBodyInput({ weight, height, age, sex })) ?? 0;
  }

  /**
   * Gasto diario total (TDEE).
   *
   * Si cuenta pasos, `training` ya combina NEAT (pasos) y TEA (días de
   * entrenamiento): basal × training. Si no los cuenta
   * (STEPS_TYPES.notCounted), el NEAT sale del factor de actividad:
   * basal × actividad × training.
   *
   * @param bm - Metabolismo basal (BMR)
   * @param activity - Factor de actividad (solo sin pasos)
   * @param steps - Pasos diarios, o el valor de "no cuenta pasos"
   * @param training - Factor de entrenamiento (con pasos, NEAT + TEA)
   * @returns TDEE en kcal/día
   */
  private energyExpenditure(
    bm: number,
    activity: number,
    steps: number,
    training: number
  ): number {
    // Si no se cuentan pasos (valor 1 según STEPS_TYPES.notCounted)
    // se debe usar el factor de actividad multiplicado por el de entrenamiento
    if (steps === STEPS[STEPS_TYPES.notCounted].value) {
      return bm * (activity || 1.2) * training;
    }

    // Si hay pasos, el valor 'training' ya combina pasos (NEAT) + días entrenamiento (TEA)
    return bm * training;
  }

  private kcalTotal(energyExpenditure: number, objetive: number): number {
    return energyExpenditure + objetive;
  }

  /**
   * Calcula proteína en gramos basado en evidencia científica 2023-2024
   *
   * Rangos óptimos (unificados por género - sin diferencias significativas):
   * - Ganancia: 1.7 g/kg (punto óptimo, beneficios se estabilizan aquí)
   * - Mantenimiento: 1.6 g/kg (suficiente para preservar masa muscular)
   * - Pérdida: 2.0 g/kg (alto para maximizar preservación muscular en déficit)
   *
   * NOTA: Cantidades >2.2 g/kg no producen beneficios adicionales para músculo
   * El exceso se oxida o convierte en grasa
   *
   * Referencias: International Society of Sports Nutrition, BMJ Meta-análisis 2024
   *
   * @param objetive - Objetivo calórico (+superávit, 0=mant, -déficit)
   * @param weight - Peso en kilogramos
   * @param sex - Sexo (no afecta significativamente los rangos)
   * @returns Gramos de proteína por día
   */
  private proteinsGTotal(
    objetive: number,
    weight: number,
    sex: SEX_TYPES
  ): number {
    let range: number;

    if (objetive > 0) {
      // Ganancia muscular: 1.7 g/kg (ambos sexos)
      range = 1.4;
    } else if (objetive === 0) {
      // Mantenimiento: 1.6 g/kg (ambos sexos)
      range = 1.5;
    } else {
      // Pérdida de grasa: 2.0 g/kg (ambos sexos)
      // Alto para maximizar preservación muscular en déficit calórico
      range = 1.6;
    }

    return range * weight;
  }

  private carbohydratesGTotal(
    energyExpenditure: number,
    objetive: number,
    proteinWeight: number,
    fatWeight: number
  ): number {
    return (
      this.carbohydratesKcalTotal(
        energyExpenditure,
        objetive,
        proteinWeight,
        fatWeight
      ) / this.MACROS_VALUES.carbohydrates
    );
  }

  /**
   * Calcula grasa en gramos basado en evidencia científica
   *
   * Rangos por objetivo (hombres | mujeres):
   * - Ganancia: 1.0 | 1.1 g/kg
   * - Mantenimiento: 0.9 | 1.0 g/kg
   * - Pérdida: 0.75 | 0.9 g/kg (mínimo para la función hormonal)
   *
   * MÍNIMO CRÍTICO: 0.5 g/kg para evitar deficiencias de ácidos grasos esenciales
   *
   * @param objetive - Objetivo calórico (+superávit, 0=mant, -déficit)
   * @param weight - Peso en kilogramos
   * @param sex - Sexo (las mujeres llevan un rango más alto)
   * @returns Gramos de grasa por día
   */
  private fatGTotal(objetive: number, weight: number, sex: number): number {
    let range: number;
    const isFemale = sex === SEX_TYPES.female;

    if (objetive > 0) {
      // Ganancia: 1.0 g/kg (hombres) | 1.1 g/kg (mujeres)
      range = isFemale ? 1.1 : 1.0;
    } else if (objetive === 0) {
      // Mantenimiento: 0.9 g/kg (hombres) | 1.0 g/kg (mujeres)
      range = isFemale ? 1.0 : 0.9;
    } else {
      // Pérdida: 0.75 g/kg (hombres) | 0.9 g/kg (mujeres)
      range = isFemale ? 0.9 : 0.75;
    }

    return range * weight;
  }

  private carbohydratesKcalTotal(
    energyExpenditure: number,
    objetive: number,
    proteinWeight: number,
    fatWeight: number
  ): number {
    return (
      this.kcalTotal(energyExpenditure, objetive) -
      (proteinWeight * this.MACROS_VALUES.proteins +
        fatWeight * this.MACROS_VALUES.fat)
    );
  }

  // Edad cumplida a día de hoy; NaN sin fecha válida (las fórmulas de
  // basal no inventan un 0).
  public getAge(birth: string): number {
    return ageFromBirthDate(birth) ?? NaN;
  }

  public getActivityFactor(activityValue: number): ACTIVITY_FACTOR_TYPE {
    return ACTIVITY_FACTOR_VALUES.find((f) => f.value === activityValue);
  }
  public activateAccount(email: string, code: string): Observable<any> {
    return this.userAPIService.activateAccount(email, code);
  }

  public resendActivationCode(email: string): Observable<any> {
    return this.userAPIService.resendActivationCode(email).pipe(take(1));
  }
}
