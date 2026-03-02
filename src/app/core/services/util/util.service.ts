import { Injectable, QueryList } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';
import { Chart, ChartData, ChartOptions, ChartType } from 'chart.js';
import { BehaviorSubject, Subject } from 'rxjs';
import { Keyboard } from '@capacitor/keyboard';
import { CustomExerciseService } from 'src/app/core/services/custom-exercise/custom-exercise.service';
import { DietDayService } from 'src/app/core/services/diet-day/diet-day.service';
import { MealService } from 'src/app/core/services/meal/meal.service';
import { TableService } from 'src/app/core/services/table/table.service';
import { WorkoutService } from 'src/app/core/services/workout/workout.service';
import { MEASURE_FILTER_TYPES } from 'src/app/shared/constants/measureFilter';
import { TABLE_MODE_TYPES } from 'src/app/shared/constants/table-mode';
import { WEEK_DAYS } from 'src/app/shared/constants/week-days';
import { DateRange } from '../../../shared/models/dateRange';
import { CustomExercise } from '../../models/customExercise';
import { DietDay } from '../../models/dietDay';
import { Meal } from '../../models/meal';
import { Split } from '../../models/split';
import { Table } from '../../models/table';
import { Workout } from '../../models/workout';
import {
  USER_ERROR_MESSAGES,
  USER_FORM_CONTROL_FIELDS,
  UserFormGroupControls,
  UserValidationErrors,
} from '../../validators/user-validation-errors';
import { IonicUtilService } from './ionic-util.service';

@Injectable()
export class UtilService {
  private _measureFilter$ = new BehaviorSubject<MEASURE_FILTER_TYPES>(
    MEASURE_FILTER_TYPES.racion
  );
  private _cancelMode$ = new BehaviorSubject<boolean>(false);
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _unselect$ = new BehaviorSubject<boolean>(false);
  private _tableMode$ = new BehaviorSubject<TABLE_MODE_TYPES>(
    TABLE_MODE_TYPES.mesocycle
  );
  private _currentDate$ = new BehaviorSubject<Date>(new Date());
  private _refresh$ = new BehaviorSubject<boolean>(false);
  private _scrollToExercise$ = new Subject<{
    workoutIndex: number;
    exerciseIndex: number;
    highlightClass: string;
  }>();
  private imageCache: { [url: string]: HTMLImageElement } = {};

  private _isTourInit: boolean;

  public get isTourInit(): boolean {
    return this._isTourInit;
  }

  public initTour(status: boolean): void {
    this._isTourInit = status;
  }

  public get loading() {
    return this._loading$.value;
  }

  public get getLoading() {
    return this._loading$.asObservable();
  }

  public set setLoading(loading: boolean) {
    this._loading$.next(loading);
  }

  public get getUnselected() {
    return this._unselect$.asObservable();
  }

  public set setUnselected(unselect: boolean) {
    this._unselect$.next(unselect);
  }

  public set setTableMode(tableMode: TABLE_MODE_TYPES) {
    this._tableMode$.next(tableMode);
  }

  public get getTableMode() {
    return this._tableMode$.asObservable();
  }

  public set setMeasureFilter(measureFilter: MEASURE_FILTER_TYPES) {
    this._measureFilter$.next(measureFilter);
  }

  public get getMeasureFilter() {
    return this._measureFilter$.asObservable();
  }

  public get getCancelMode() {
    return this._cancelMode$.asObservable();
  }

  public set setCancelMode(cancelMode: boolean) {
    this._cancelMode$.next(cancelMode);
  }

  public get getCurrentDate() {
    return this._currentDate$.asObservable();
  }

  public set setCurrentDate(date: Date) {
    this._currentDate$.next(date);
  }

  public get getRefreshAfterDeleteOwn() {
    return this._refresh$.asObservable();
  }

  public set setRefreshAfterDeleteOwn(boolean: boolean) {
    this._refresh$.next(boolean);
  }

  public get getScrollToExercise() {
    return this._scrollToExercise$.asObservable();
  }

  public requestScrollToExercise(data: {
    workoutIndex: number;
    exerciseIndex: number;
    highlightClass: string;
  }) {
    this._scrollToExercise$.next(data);
  }

  constructor(private ionicUtilService: IonicUtilService) {}

  public getFirstWeekDay(dateObject: Date, dayIndex: number) {
    const dayOfWeek = dateObject.getDay(),
      firstDayOfWeek = new Date(dateObject),
      diff = dayOfWeek >= dayIndex ? dayOfWeek - dayIndex : 6 - dayOfWeek;

    firstDayOfWeek.setDate(dateObject.getDate() - diff);

    return firstDayOfWeek;
  }

  public getWeekRange(selectedDate: Date): {
    dateMin: Date;
    dateMax: Date;
    dateRange: DateRange;
    labels: string[];
  } {
    const dateMin = this.getFirstWeekDay(selectedDate, WEEK_DAYS.monday);
    dateMin.setHours(0, 0, 0, 0);

    const dateMax = new Date(dateMin);
    dateMax.setDate(dateMin.getDate() + 6);
    dateMax.setHours(23, 59, 59, 59);

    const dateRange = new DateRange(dateMin, dateMax);
    const labels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

    return { dateMin, dateMax, dateRange, labels };
  }

  public numberDaysBetween(dateMin: Date, dateMax: Date) {
    const date1_ms = dateMin.getTime();
    const date2_ms = dateMax.getTime();
    const difference_ms = Math.abs(date2_ms - date1_ms);
    return Math.round(difference_ms / (1000 * 60 * 60 * 24));
  }

  public getDatesInRange(startDate: Date, endDate: Date): Date[] {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }

  public getWeekOfMonth(d: Date): number {
    const date = new Date(d);
    const dayOfWeek = (date.getDay() + 6) % 7;
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;
    const adjustedDay = date.getDate() + firstDayOfWeek - dayOfWeek;
    return Math.ceil(adjustedDay / 7);
  }

  public sortListByDates(objs: any[]) {
    return objs.sort(
      (objA, objB) =>
        new Date(objA.date).getTime() - new Date(objB.date).getTime()
    );
  }

  public datesAreOnSameDay(first: Date, second: Date): boolean {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  }

  public average(numbers: number[]): number {
    const numbersTotal = numbers.filter((numberTemp) => !isNaN(numberTemp));
    if (numbersTotal.length === 0) {
      return 0; // Handle division by zero for empty array
    }
    const sum = numbersTotal.reduce((total, num) => total + (num || 0), 0);
    return sum / numbersTotal.length;
  }

  public toStringDateDateFormat(date: Date): string {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  public initFakeModalState(): void {
    const modalState = {
      modal: true,
      desc: 'fake state for our modal',
    };
    history.pushState(modalState, null);
    try {
      // Notify globally that a modal is open
      this._modalOpen$.next(true);
    } catch {}
  }

  public numberArray(number: number) {
    const res = [];
    for (let i = 1; i <= number; i++) {
      res.push(i);
    }
    return res;
  }

  public endFakeModalState() {
    if (window.history.state.modal) {
      history.back();
    }
    try {
      // Notify globally that the modal is closed
      this._modalOpen$.next(false);
    } catch {}
  }

  public initChart(
    ref: string,
    chartType: ChartType,
    chartData: ChartData,
    chartOptions: ChartOptions
  ): Chart {
    return new Chart(ref, {
      type: chartType,
      data: chartData,
      options: chartOptions,
    });
  }

  public updateChart(chart: Chart) {
    chart.update();
  }

  public getEventString(event: Event): string {
    return event && event['detail'] ? event['detail'].value.trim() : '';
  }

  public getEventNumber(event: Event): number {
    return event['detail'].value;
  }

  public getEventCheck(event: Event) {
    return (<HTMLInputElement>event.target).checked;
  }

  // Global flag to indicate if a modal overlay is open
  private _modalOpen$ = new BehaviorSubject<boolean>(false);
  public get getModalOpen() {
    return this._modalOpen$.asObservable();
  }
  public set setModalOpen(isOpen: boolean) {
    this._modalOpen$.next(isOpen);
  }

  public async closeSweetAlert(): Promise<void> {
    await this.ionicUtilService.closeAlert();
  }

  public toggleDisableAllCheckboxes(
    checkboxes: QueryList<any>,
    disabled: boolean
  ) {
    checkboxes.toArray().forEach((cb) => (cb.disabled = disabled));
  }

  public deepClone(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }

    const clonedObj = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = this.deepClone(obj[key]);
      }
    }

    return clonedObj;
  }

  public getMinNumber(numbers: number[]): number {
    let minimo: number = numbers.find((nTemp) => nTemp);

    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] && numbers[i] < minimo) {
        minimo = numbers[i];
      }
    }

    return minimo;
  }

  public getTextWithoutSpecialCharacters(input: string): string {
    return input.replace(/[^a-zA-Z0-9 ]/g, '');
  }

  public isWorkoutDoned(workout: Workout): boolean {
    return workout.exercises.every((exercise) =>
      exercise.sets.every((set) => set.doned)
    );
  }

  public isSplitDoned(split: Split): boolean {
    return split.workouts.every((wTemp) => wTemp.date);
  }

  public getCurrentPlayingSplit(table: Table): number {
    return (
      table.splits.findIndex((split) =>
        split.workouts.some((workout) => !workout.date)
      ) + 1
    );
  }

  public manageNote(
    object: Table | Workout | CustomExercise | DietDay | Meal,
    service:
      | WorkoutService
      | CustomExerciseService
      | DietDayService
      | MealService
      | TableService
  ): Promise<boolean> {
    const alertOptions = {
      header: 'Notas',
      inputs: [
        {
          name: 'notes',
          type: 'textarea' as 'textarea',
          placeholder: 'Escribe tus notas aquí...',
          value: object['notes'] || '',
        },
      ],
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
        },
        {
          text: 'GUARDAR',
          handler: (data) => {
            if (!data.notes || data.notes.trim() === '') {
              const errorAlert = {
                header: 'Error',
                message: 'El campo no puede estar vacío',
                buttons: ['OK'],
              };
              this.ionicUtilService.showAlert(errorAlert);
              return false;
            }
            return true;
          },
        },
      ],
    };

    return this.ionicUtilService.showAlert(alertOptions).then((result) => {
      if (result.role !== 'cancel' && result.data?.values?.notes) {
        object['notes'] = result.data.values.notes;

        if ((object as Workout).exercises)
          this.handleWorkout(object as Workout, service as WorkoutService);
        else if ((object as DietDay).meals)
          this.handleDietDay(object as DietDay, service as DietDayService);
        else if ((object as Meal).customProducts)
          this.handleMeal(object as Meal, service as MealService);
        else if ((object as CustomExercise).sets)
          this.handleCustomExercise(
            object as CustomExercise,
            service as CustomExerciseService
          );

        return true;
      }
      return false;
    });
  }

  private static handleFormErrors(
    controls: UserFormGroupControls
  ): UserValidationErrors[] {
    let errors: UserValidationErrors[] = [];
    Object.keys(controls).forEach((key) => {
      const control = controls[key];
      if (control instanceof FormGroup) {
        errors = errors.concat(this.handleFormErrors(control.controls));
      }
      const controlErrors: ValidationErrors = controls[key].errors;
      if (controlErrors !== null) {
        Object.keys(controlErrors).forEach((keyError) => {
          errors.push({
            control_name: key,
            error_name: keyError,
            error_value: controlErrors[keyError],
          });
        });
      }
    });
    return errors;
  }

  public handleErrors(form: FormGroup): string | undefined {
    if (form.invalid) {
      const controlErrors = UtilService.handleFormErrors(form.controls);

      const formErrors = form.errors
        ? Object.keys(form.errors).map((keyError) => ({
            control_name: 'password',
            error_name: keyError,
            error_value: form.errors[keyError],
          }))
        : [];

      const allErrors = [...controlErrors, ...formErrors];

      const error = allErrors.shift();

      if (error) {
        let text: string;
        switch (error.error_name) {
          case 'required':
            text = USER_ERROR_MESSAGES.required(
              USER_FORM_CONTROL_FIELDS[error.control_name]
            );
            break;
          case 'pattern':
            text = USER_ERROR_MESSAGES.pattern(
              USER_FORM_CONTROL_FIELDS[error.control_name]
            );
            break;
          case 'email':
            text = USER_ERROR_MESSAGES.email(
              USER_FORM_CONTROL_FIELDS[error.control_name]
            );
            break;
          case 'min':
            text = USER_ERROR_MESSAGES.minlength(
              USER_FORM_CONTROL_FIELDS[error.control_name],
              error.error_value.min
            );
            break;
          case 'length':
            text = USER_ERROR_MESSAGES.length(
              USER_FORM_CONTROL_FIELDS[error.control_name]
            );
            break;
          case 'minlength':
            text = USER_ERROR_MESSAGES.minlength(
              USER_FORM_CONTROL_FIELDS[error.control_name],
              error.error_value.requiredLength
            );
            break;
          case 'maxlength':
            text = USER_ERROR_MESSAGES.maxlength(
              USER_FORM_CONTROL_FIELDS[error.control_name],
              error.error_value.requiredLength
            );
            break;
          case 'uppercase':
            text = USER_ERROR_MESSAGES.uppercase(
              USER_FORM_CONTROL_FIELDS[error.control_name]
            );
            break;
          case 'lowercase':
            text = USER_ERROR_MESSAGES.lowercase(
              USER_FORM_CONTROL_FIELDS[error.control_name]
            );
            break;
          case 'specialChar':
            text = USER_ERROR_MESSAGES.specialChar(
              USER_FORM_CONTROL_FIELDS[error.control_name]
            );
            break;
          case 'areEqual':
            text = USER_ERROR_MESSAGES.areEqual(
              USER_FORM_CONTROL_FIELDS[error.control_name]
            );
            break;
          case 'emailExist':
            text = USER_ERROR_MESSAGES.emailExist(
              USER_FORM_CONTROL_FIELDS[error.control_name]
            );
            break;
          case 'notSame':
            text = USER_ERROR_MESSAGES.notSame(
              USER_FORM_CONTROL_FIELDS[error.control_name]
            );
            break;
          case 'manHood':
            text = USER_ERROR_MESSAGES.manHood(
              USER_FORM_CONTROL_FIELDS[error.control_name]
            );
            break;
          case 'emailExist':
            text = USER_ERROR_MESSAGES.emailExist(
              USER_FORM_CONTROL_FIELDS[error.control_name]
            );
            break;
          default:
            text = USER_ERROR_MESSAGES.default(
              USER_FORM_CONTROL_FIELDS[error.control_name],
              error.error_name,
              error.error_value
            );
        }
        return text;
      }
    }
    return undefined;
  }

  /**
   * Oculta el teclado automáticamente al hacer scroll hacia abajo.
   * Usa directamente con el evento (ionScroll) de ion-content.
   *
   * @param allowHide - Si es false, solo actualiza la posición del scroll sin intentar cerrar el teclado (útil para scroll inercial)
   */
  public hideKeyboardOnScroll(
    event: any,
    threshold: number = 10,
    allowHide: boolean = true
  ): void {
    const scrollTop = event?.detail?.scrollTop ?? 0;

    // Inicializar si es la primera vez
    if (UtilService.lastScrollTop === undefined) {
      UtilService.lastScrollTop = scrollTop;
      return;
    }

    const scrollDiff = scrollTop - UtilService.lastScrollTop;

    // Solo si scroll hacia abajo, supera el umbral Y está permitido cerrar
    if (allowHide && scrollDiff > threshold) {
      // Llamar a hide() es seguro incluso si el teclado no está visible
      Keyboard.hide().catch(() => {
        // Silenciar errores (puede fallar en web o si ya está cerrado)
      });
    }

    UtilService.lastScrollTop = scrollTop;
  }

  private static lastScrollTop: number;

  public hideKeyboardOnClick(event: Event): void {
    const target = event?.target as Element | null;
    const isInput =
      !!target &&
      !!(target as Element).closest(
        'input, textarea, ion-input, ion-textarea, [contenteditable="true"]'
      );
    if (isInput) return;
    Keyboard.hide().catch(() => {});
    const active = document.activeElement as HTMLElement | null;
    try {
      if (active && typeof (active as any).blur === 'function') {
        (active as any).blur();
      }
    } catch {}
  }

  private handleWorkout(workout: Workout, service: WorkoutService): void {
    service
      .modifyWorkout(workout)
      .subscribe((resWorkout) => (service.setCurrentWorkout = resWorkout));
  }

  private handleDietDay(dietDay: DietDay, service: DietDayService): void {
    service.updateDietDay(dietDay).subscribe();
  }

  private handleMeal(meal: Meal, service: MealService): void {
    service.modifyMeal(meal).subscribe();
  }

  private handleCustomExercise(
    customExercise: CustomExercise,
    service: CustomExerciseService
  ): void {
    service.updateCustomExercise(customExercise).subscribe();
  }
}
