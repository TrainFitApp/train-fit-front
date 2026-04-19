import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JWTInterceptor } from './interceptors/jwt.interceptor';
import { AuthApiService } from './services/auth/auth-api.service';
import { AuthService } from './services/auth/auth.service';
import { GoogleAuthService } from './services/auth/google-auth.service';
import { AppleAuthService } from './services/auth/apple-auth.service';
import { CustomExerciseAPIService } from './services/custom-exercise/custom-exercise-api.service';
import { CustomExerciseService } from './services/custom-exercise/custom-exercise.service';
import { BillingApiService } from './services/billing/billing-api.service';
import { BillingService } from './services/billing/billing.service';
import { CustomProductAPIService } from './services/custom-product/custom-product-api.service';
import { CustomProductService } from './services/custom-product/custom-product.service';
import { DietDayAPIService } from './services/diet-day/diet-day-api.service';
import { DietDayService } from './services/diet-day/diet-day.service';
import { DietAPIService } from './services/diet/diet-api.service';
import { DietService } from './services/diet/diet.service';
import { ExerciseAPIService } from './services/exercise/exercise-api.service';
import { ExerciseService } from './services/exercise/exercise.service';
import { HttpService } from './services/http/http.service';
import { MealAPIService } from './services/meal/meal-api.service';
import { MealService } from './services/meal/meal.service';

import { ProductAPIService } from './services/product/product-api.service';
import { ProductService } from './services/product/product.service';
import { SetAPIService } from './services/set/set-api.service';
import { SetService } from './services/set/set.service';
import { SplitAPIService } from './services/split/split-api.service';
import { SplitService } from './services/split/split.service';
import { TableAPIService } from './services/table/table-api.service';
import { TableService } from './services/table/table.service';
import { UserAPIService } from './services/user/user-api.service';
import { UserLocalstorageService } from './services/user/user-localstorage.service';
import { UserService } from './services/user/user.service';
import { AdMobService } from './services/util/ad-mob.service';
import { BarCodeScannerService } from './services/util/bar-code-scanner.service';
import { DayWeightService } from './services/util/day-weight.service';
import { IonicUtilService } from './services/util/ionic-util.service';
import { NavigationService } from './services/util/navigation.service';
import { ThemeService } from './services/util/theme.service';
import { UtilService } from './services/util/util.service';
import { WorkoutAPIService } from './services/workout/workout-api.service';
import { WorkoutService } from './services/workout/workout.service';
import { MatchPasswords } from './validators/matchPasswords';

@NgModule({
  exports: [BrowserModule, BrowserAnimationsModule, HttpClientModule],
  providers: [
    // Services
    // General & Utils
    HttpService,
    UtilService,
    IonicUtilService,
    ThemeService,
    BarCodeScannerService,
    NavigationService,
    DayWeightService,
    AdMobService,
    // Features
    AuthService,
    AuthApiService,
    BillingApiService,
    BillingService,
    GoogleAuthService,
    AppleAuthService,
    UserService,
    UserAPIService,
    UserLocalstorageService,
    DietService,
    DietAPIService,
    DietDayService,
    DietDayAPIService,
    MealService,
    MealAPIService,
    CustomProductService,
    CustomProductAPIService,

    ProductService,
    ProductAPIService,
    TableService,
    TableAPIService,
    SplitService,
    SplitAPIService,
    WorkoutService,
    WorkoutAPIService,
    CustomExerciseService,
    CustomExerciseAPIService,
    SetService,
    SetAPIService,
    ExerciseService,
    ExerciseAPIService,
    // Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true,
    },
    // Validators
    MatchPasswords,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule ya está cargado. Importa CoreModule solo en el AppModule.'
      );
    }
  }
}
