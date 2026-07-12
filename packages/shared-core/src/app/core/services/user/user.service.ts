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
import { User } from '../../models/user';
import { UserAPIService } from './user-api.service';

@Injectable()
export class UserService {
  // Signal para el usuario local
  private readonly _localUser: WritableSignal<User | null> =
    signal<User | null>(null);

  // Signal de solo lectura
  public readonly localUser = computed(() => this._localUser());

  // Observable para compatibilidad con código existente
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

  constructor(private userAPIService: UserAPIService) {}

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
    const userToCreate = this.setUserMacrosAndKcal(user);
    return this.userAPIService.createUser(userToCreate, date).pipe(take(1));
  }

  public createGoogleUser(
    user: User,
    date: Date,
    tokenGoogle: string
  ): Observable<any> {
    return this.userAPIService.createGoogleUser(user, date, tokenGoogle).pipe(take(1));
  }

  public updateUser(user: User): Observable<User> {
    return this.userAPIService.updateUser(user).pipe(
      take(1),
      tap((updatedUser) => (this.setLocalUser = updatedUser))
    );
  }

  public updateGoogleUser(user: User): Observable<any> {
    const userToUpdate = this.setUserMacrosAndKcal(user);
    return this.userAPIService.updateGoogleUser(userToUpdate).pipe(
      take(1),
      tap((updatedUser) => (this.setLocalUser = updatedUser.user))
    );
  }

  public createAppleUser(
    user: User,
    date: Date,
    tokenApple: string
  ): Observable<any> {
    return this.userAPIService
      .createAppleUser(user, date, tokenApple)
      .pipe(take(1));
  }

  public updateAppleUser(user: User): Observable<any> {
    const userToUpdate = this.setUserMacrosAndKcal(user);
    return this.userAPIService.updateAppleUser(userToUpdate).pipe(
      take(1),
      tap((updatedUser) => (this.setLocalUser = updatedUser.user))
    );
  }

  public playStopDiet(idUser: string, idDietInUse: string): Observable<any> {
    return this.userAPIService.playStopDiet(idUser, idDietInUse);
  }

  public searchArchivedsByFilter(searchFilters: any): Observable<any> {
    return this.userAPIService.searchArchivedsByFilter(searchFilters);
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

  public addFavoriteProduct(
    idUser: string,
    idProduct: string
  ): Observable<{ isFavorite: boolean; message?: string }> {
    return this.userAPIService.addFavoriteProduct(idUser, idProduct);
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

  public restorePassword(email: string, newPassword: string) {
    return this.userAPIService
      .restorePassword(email, newPassword)
      .pipe(take(1));
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

    user.kcalTotal = this.calculateKcal(user);
    user.proteinsGTotal = parseFloat(proteinGT.toFixed(2));
    user.fatGTotal = parseFloat(fatGT.toFixed(2));
    user.carbohydratesGTotal = parseFloat(
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
    let finalWeight: number = user.weight;
    if (this.getIMC(user.weight, user.height) >= 30)
      finalWeight = this.getIdealAdjustedWeight(
        this.getIdealWeight(user.height, user.sex),
        user.weight
      );
    return finalWeight;
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
   * Calcula el metabolismo basal usando la fórmula Mifflin-St Jeor (1990)
   * Más precisa (~5%) que Harris-Benedict para poblaciones modernas
   *
   * Fórmula:
   * Hombres: (10 × peso) + (6.25 × altura) – (5 × edad) + 5
   * Mujeres: (10 × peso) + (6.25 × altura) – (5 × edad) – 161
   *
   * @param sex - Sexo del usuario (SEX_TYPES.male o SEX_TYPES.female)
   * @param height - Altura en centímetros
   * @param weight - Peso en kilogramos
   * @param age - Edad en años
   * @returns BMR en kcal/día
   */
  private mifflinStJeorBMR(
    sex: number,
    height: number,
    weight: number,
    age: number
  ): number {
    const baseBMR = 10 * weight + 6.25 * height - 5 * age;
    return sex === SEX_TYPES.male ? baseBMR + 5 : baseBMR - 161;
  }

  /**
   * Calcula el TDEE (Total Daily Energy Expenditure) usando el factor combinado
   *
   * IMPORTANTE: El parámetro 'training' ya incluye la combinación de:
   * - NEAT (Non-Exercise Activity Thermogenesis) basado en pasos
   * - TEA (Thermic Effect of Activity) basado en días de entrenamiento
   *
   * Por tanto, solo se multiplica BMR × training (no se usa 'activity' ni 'steps')
   *
   * @param bm - Metabolismo Basal (BMR)
   * @param activity - Factor de actividad (NO USADO - mantener por compatibilidad)
   * @param steps - Pasos diarios (NO USADO - mantener por compatibilidad)
   * @param training - Factor pre-calculado que combina NEAT + TEA (1.0 - 1.9)
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
   * Rangos óptimos (unificados - independiente de sexo):
   * - Ganancia: 1.0 g/kg (20-30% kcal, necesario para hormonas)
   * - Mantenimiento: 0.9 g/kg (20-30% kcal)
   * - Pérdida: 0.75 g/kg (20-30% kcal, mínimo para función hormonal)
   *
   * MÍNIMO CRÍTICO: 0.5 g/kg para evitar deficiencias de ácidos grasos esenciales
   *
   * @param objetive - Objetivo calórico (+superávit, 0=mant, -déficit)
   * @param weight - Peso en kilogramos
   * @param sex - Sexo (parámetro mantenido por compatibilidad)
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

  public getAge(birthDate: Date): number {
    return Math.floor(
      Math.abs(Date.now() - new Date(birthDate).getTime()) /
        (1000 * 3600 * 24) /
        365.25
    );
  }

  public getActivityFactor(activityValue: number): ACTIVITY_FACTOR_TYPE {
    return ACTIVITY_FACTOR_VALUES.find((f) => f.value === activityValue);
  }
  public activateAccount(email: string, code: string): Observable<any> {
    return this.userAPIService.activateAccount(email, code);
  }
}
