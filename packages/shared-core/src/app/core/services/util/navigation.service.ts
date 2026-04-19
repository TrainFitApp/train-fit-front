import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Network } from '@capacitor/network';
import { NavController } from '@ionic/angular';
import { Split } from '../../models/split';
import { Table } from '../../models/table';
import { User } from '../../models/user';
import { Workout } from '../../models/workout';

@Injectable()
export class NavigationService {
  private readonly SIGN_IN_ROUTE = 'sign-in';
  private readonly USER_LOADER_ROUTE = 'user-loader';
  private readonly TABS_ROUTE = 'tabs';
  private readonly TABS_DIETS_ROUTE = 'tabs/diets';
  private readonly WEIGHT_INFO_ROUTE = 'weight-info';
  private readonly TABS_SUMMARY_ROUTE = 'tabs/summary';
  private readonly MESOCYCLE_ROUTE = 'mesocycle';
  private readonly PROFILE_ROUTE = 'tabs/profile';
  private readonly PROFILE_USERS_ROUTE = 'search-users';
  private readonly CONFIGURATION_ROUTE = 'configuration';
  private readonly CONCEPTS_ROUTE = 'configuration/concepts';
  private readonly SUGGESTIONS_ROUTE = 'configuration/suggestions';
  private readonly REFERENCES_ROUTE = 'configuration/references';
  private readonly CALCULATOR_LIST_ROUTE = 'tabs/profile/calculator-list';
  private readonly PREMIUM_ROUTE = 'premium';
  private readonly SEARCH_TABLES_ROUTE = 'search-tables/false';
  private readonly SEARCH_OWN_TABLES_ROUTE = 'search-tables/true';
  private readonly CURRENT_WORKOUT_ROUTE = 'current-workout';
  private readonly SIGN_UP_ROUTE = 'sign-in/sign-up';
  private readonly DATA_SHEET_ROUTE = 'sign-in/sign-up/data-sheet';
  private readonly RESTORE_PASSWORD_ROUTE = 'sign-in/restore-password';
  private readonly EXERCISES_ROUTE = 'exercises';
  private readonly NO_CONECTION_ROUTE = 'disconnected';

  // Temporary data storage for passing data between routes
  private _tempData: Map<string, any> = new Map();

  constructor(private navController: NavController, private router: Router) {
    this.initNetworkListener();
  }

  // --- Temporary data storage methods ---
  public setTempData(key: string, data: any): void {
    this._tempData.set(key, data);
  }

  public getTempData<T = any>(key: string): T | null {
    const data = this._tempData.get(key);
    return (data as T) || null;
  }

  public clearTempData(key: string): void {
    this._tempData.delete(key);
  }

  public goToLoginPage(): void {
    this.navController.navigateRoot([this.SIGN_IN_ROUTE], { replaceUrl: true });
  }

  public goToRestorePasswordPage(): void {
    this.navController.navigateForward([this.RESTORE_PASSWORD_ROUTE]);
  }

  public goToTabsPage(): void {
    this.navController.navigateRoot([this.TABS_ROUTE]);
  }

  public goToTabsDietsPage(): void {
    this.navController.navigateRoot([this.TABS_DIETS_ROUTE], {
      replaceUrl: true,
    });
  }
  public goToTabsSummaryPage(): void {
    this.navController.navigateRoot([this.TABS_SUMMARY_ROUTE], {
      replaceUrl: true,
    });
  }

  public goToSignUp(extras?: any): void {
    this.navController.navigateForward([this.SIGN_UP_ROUTE], extras);
  }

  public goToDataSheet(): void {
    this.navController.navigateForward([this.DATA_SHEET_ROUTE]);
  }

  public goToInfo(): void {
    this.navController.navigateRoot([this.NO_CONECTION_ROUTE]);
  }

  public goToSearchTables(isOwn?: boolean): void {
    this.navController.navigateForward(
      [isOwn ? this.SEARCH_OWN_TABLES_ROUTE : this.SEARCH_TABLES_ROUTE],
      {
        animated: false,
      }
    );
  }

  public goToCurrentWorkout(): void {
    this.navController.navigateForward([this.CURRENT_WORKOUT_ROUTE]);
  }

  public goToMesocycle(): void {
    this.navController.navigateForward([this.MESOCYCLE_ROUTE]);
  }

  public goToStatistics(): void {
    this.navController.navigateForward(['/statistics']);
  }

  public goToWeightInfo(): void {
    this.navController.navigateForward([this.WEIGHT_INFO_ROUTE], {
      animated: true,
    });
  }

  public goToProfile(): void {
    this.navController.navigateRoot([this.PROFILE_ROUTE], { replaceUrl: true });
  }

  public goToConfiguration(): void {
    this.navController.navigateForward([this.CONFIGURATION_ROUTE]);
  }

  public goToProfileUsers(): void {
    this.navController.navigateForward([this.PROFILE_USERS_ROUTE]);
  }

  public goToCalculatorList(): void {
    this.navController.navigateForward([this.CALCULATOR_LIST_ROUTE]);
  }

  public goToPremium(): void {
    this.navController.navigateForward([this.PREMIUM_ROUTE]);
  }

  public gotoConcepts(): void {
    this.navController.navigateForward([this.CONCEPTS_ROUTE]);
  }

  public goToSuggestions(): void {
    this.navController.navigateForward([this.SUGGESTIONS_ROUTE]);
  }

  public goToReferences(): void {
    this.navController.navigateForward([this.REFERENCES_ROUTE]);
  }

  public goToUserLoader(): void {
    this.navController.navigateForward([this.USER_LOADER_ROUTE], {
      replaceUrl: true,
    });
  }

  public goToExercises(
    workout: Workout,
    workoutIndex: number,
    user: User,
    tableInUse: Table,
    currentSplit: Split
  ): void {
    this.navController.navigateRoot([this.EXERCISES_ROUTE], {
      queryParams: {
        workout: workout,
        workoutIndex: workoutIndex,
        user: user,
        tableInUse: tableInUse,
        currentSplit: currentSplit,
      },
    });
  }

  public goBack(): void {
    this.navController.pop();
  }

  public goToSearchFoods(extras?: any): void {
    this.navController.navigateForward(['/search-foods'], {
      ...(extras || {}),
    });
  }

  public goToCreateProduct(extras?: any): void {
    this.navController.navigateForward(['/search-foods/create-product'], {
      ...(extras || {}),
    });
  }

  public goToAddProduct(extras?: any): void {
    this.navController.navigateForward(['/search-foods/add-product'], {
      ...(extras || {}),
    });
  }

  public goToConfigRecipe(extras?: any): void {
    this.navController.navigateForward(['/search-foods/config-recipe'], {
      ...(extras || {}),
    });
  }

  public backTo(url: string | string[], extras?: any): void {
    this.navController.navigateBack(url, {
      ...(extras || {}),
    });
  }

  public backNoAnim(): void {
    this.navController.pop();
  }

  // --- Navigation state helpers (use instead of window.history.state) ---
  public getState<T = any>(): T {
    try {
      return (window.history.state as T) || ({} as T);
    } catch {
      return {} as T;
    }
  }

  public replaceState(nextState: any): void {
    try {
      const url = this.router.url;
      window.history.replaceState(nextState || {}, '', url);
    } catch { }
  }

  public clearStateKeys(keys: string[]): void {
    try {
      const current: any = this.getState() || {};
      const newState: any = { ...current };
      keys.forEach((k) => delete newState[k]);
      this.replaceState(newState);
    } catch { }
  }

  private async initNetworkListener(): Promise<void> {
    const status = await Network.getStatus();
    if (!status.connected) {
      this.goToInfo();
    }

    Network.addListener('networkStatusChange', (status) => {
      if (status.connected) {
        if (this.router.url === `/${this.NO_CONECTION_ROUTE}`)
          this.goToUserLoader();
      } else this.goToInfo();
    });
  }
}
