(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["main"],{

/***/ 52576:
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppRoutingModule: () => (/* binding */ AppRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/guards/auth.guard */ 17533);
/* harmony import */ var src_app_shared_components_disconnected_disconnected_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/components/disconnected/disconnected.component */ 89353);
/* harmony import */ var src_app_features_clients_resolvers_table_in_context_resolver__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/features/clients/resolvers/table-in-context.resolver */ 3899);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);

var _AppRoutingModule;






const routes = [{
  // TASK-007 (MASTER_BACKLOG.md) — StatisticsPage reutilizada tal cual de
  // shared-features, mismo resolver que el Planner. Alcance reducido: solo
  // el gráfico de progresión/comparación (ya correctamente scoped por
  // TableService.currentTable) — StatisticsPage oculta por sí sola la
  // tarjeta de histórico "all-time" al detectar :clientId en la ruta,
  // porque ese widget usa un endpoint self-service (ver DECISIONS.md,
  // 2026-08-11). TASK-020 queda pendiente para reactivarlo correctamente.
  path: 'clients/:clientId/tables/:tableId/statistics',
  canMatch: [src_app_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__.authMatchGuard],
  resolve: {
    table: src_app_features_clients_resolvers_table_in_context_resolver__WEBPACK_IMPORTED_MODULE_3__.TableInContextResolver
  },
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-packages_shared-ui_src_app_shared_shared_module_ts"), __webpack_require__.e("packages_shared-features_src_app_features_tables_components_summary_components_statistics_sta-a2ec4e")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/tables/components/summary/components/statistics/statistics.module */ 80391)).then(m => m.StatisticsPageModule)
}, {
  path: '',
  redirectTo: 'user-loader',
  pathMatch: 'full'
}, {
  // Intercepta ANTES que 'sign-in': el registro de profesional (F01) es una
  // pantalla propia de esta app (sin datos biométricos), no la del wizard
  // compartido de consumidor. NavigationService.goToSignUp() navega siempre
  // a 'sign-in/sign-up' (hardcoded en shared-core) — esta entrada more
  // específica gana el match antes de que 'sign-in' delegue a su propio
  // hijo 'sign-up' (el wizard de consumidor, que aquí nunca se alcanza).
  path: 'sign-in/sign-up',
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-packages_shared-ui_src_app_shared_shared_module_ts"), __webpack_require__.e("common"), __webpack_require__.e("src_app_features_professional-sign-up_sign-up_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/professional-sign-up/sign-up.module */ 66663)).then(m => m.SignUpPageModule)
}, {
  path: 'sign-in',
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-packages_shared-ui_src_app_shared_shared_module_ts"), __webpack_require__.e("common"), __webpack_require__.e("packages_shared-features_src_app_features_authentication_authentication_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/authentication/authentication.module */ 93494)).then(m => m.AuthenticationPageModule)
}, {
  // Replanteamiento UI/UX — antes TabsPage (barra inferior de 3 destinos).
  // Ahora ShellPage: ion-split-pane + ion-menu. configuration/subscription/
  // checkin-templates/diet-templates viven aquí dentro como hijas — así el
  // panel lateral persistente de escritorio NO desaparece al navegar a
  // ninguna de ellas (ver shell-routing.module.ts).
  path: 'tabs',
  canMatch: [src_app_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__.authMatchGuard],
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-packages_shared-ui_src_app_shared_shared_module_ts"), __webpack_require__.e("src_app_features_shell_shell_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/shell/shell.module */ 51935)).then(m => m.ShellPageModule)
}, {
  // Redirect, no ruta real: NavigationService.goToConfiguration() y los
  // sub-destinos de ConfigurationPage (Diccionario/Reportes y sugerencias/
  // Referencias: gotoConcepts()/goToSuggestions()/goToReferences(), todos
  // en shared-core, compartido por las 3 apps) navegan con rutas absolutas
  // hardcodeadas 'configuration', 'configuration/concepts', etc. — este
  // redirect las reenvía a la ubicación real dentro del shell sin obligar
  // a shared-core a saber que en esta app concreta la ruta vive anidada.
  // SIN pathMatch:'full' a propósito (antes lo tenía): con 'full' solo
  // interceptaba la ruta exacta 'configuration' y dejaba sin match
  // 'configuration/concepts'/'configuration/suggestions' (NG04002) — en
  // modo prefijo (por defecto) Angular conserva los segmentos sobrantes
  // tras el redirect.
  path: 'configuration',
  redirectTo: 'tabs/configuration'
}, {
  // MVP-trainers F02 — redirect: ConfigurationPage#goToTrainerSubscription()
  // (shared-features) navega con ruta absoluta hardcodeada '/subscription'.
  path: 'subscription',
  redirectTo: 'tabs/subscription',
  pathMatch: 'full'
}, {
  path: 'user-loader',
  canMatch: [src_app_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_1__.authMatchGuard],
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-packages_shared-ui_src_app_shared_shared_module_ts"), __webpack_require__.e("packages_shared-features_src_app_features_user-loader_user-loader_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/user-loader/user-loader.module */ 98932)).then(m => m.UserLoaderPageModule)
}, {
  path: 'disconnected',
  component: src_app_shared_components_disconnected_disconnected_component__WEBPACK_IMPORTED_MODULE_2__.DisconnectedComponent
}];
class AppRoutingModule {}
_AppRoutingModule = AppRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AppRoutingModule, "\u0275fac", function AppRoutingModule_Factory(t) {
  return new (t || _AppRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AppRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _AppRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AppRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule.forRoot(routes, {
    preloadingStrategy: _angular_router__WEBPACK_IMPORTED_MODULE_5__.PreloadAllModules
  }), _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AppRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule]
  });
})();

/***/ }),

/***/ 21394:
/*!*************************************!*\
  !*** ./src/app/app-shell.config.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   APP_SHELL_CONFIG: () => (/* binding */ APP_SHELL_CONFIG)
/* harmony export */ });
const APP_SHELL_CONFIG = {
  managementEntryEnabled: false,
  // App de entrenadores, sin anuncios (herramienta de trabajo por
  // suscripción) — ver AdMobService, que no llega a llamar a
  // AdMob.initialize() cuando esto es false. Evita también el warning nativo
  // "Google Mobile Ads SDK was initialized without an application ID" (no
  // hay GADApplicationIdentifier en el Info.plist de esta app, a propósito)
  // y el prompt de tracking (ATT) de iOS, que no pinta nada aquí.
  adsEnabled: false
};

/***/ }),

/***/ 32190:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _capacitor_app__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/app */ 41641);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/core */ 44599);
/* harmony import */ var swiper_element_bundle__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! swiper/element/bundle */ 37198);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_core_services_remote_config_remote_config_gate_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/remote-config/remote-config-gate.service */ 51150);
/* harmony import */ var src_app_core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/auth/auth.service */ 74048);
/* harmony import */ var src_app_core_services_auth_pending_email_verification_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/auth/pending-email-verification.service */ 72);
/* harmony import */ var src_app_core_services_util_theme_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/services/util/theme.service */ 18341);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/angular */ 54844);


var _AppComponent;










(0,swiper_element_bundle__WEBPACK_IMPORTED_MODULE_4__.register)();
class AppComponent {
  constructor(router, remoteConfigGate, authService, pendingEmailVerificationService, themeService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "remoteConfigGate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "authService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "pendingEmailVerificationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "themeService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isNativeClient", _capacitor_core__WEBPACK_IMPORTED_MODULE_3__.Capacitor.isNativePlatform());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "hasAuthenticatedSession", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "appStateListener", null);
    this.router = router;
    this.remoteConfigGate = remoteConfigGate;
    this.authService = authService;
    this.pendingEmailVerificationService = pendingEmailVerificationService;
    this.themeService = themeService;
    void this.initializeApp();
  }
  initializeApp() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // Mantenimiento/actualización obligatoria BEFORE any routing (Inicio Total)
      yield _this.remoteConfigGate.checkAndPresent();
      // Force dark theme regardless of OS preference
      _this.themeService.toggleColorMode('dark');
      _this.initSessionTracking();
      _this.routeOnStartup();
      _this.restoreSessionOnStartup();
      _this.initForegroundGateRefresh();
    })();
  }
  routeOnStartup() {
    if (this.shouldKeepPendingEmailVerificationVisible()) {
      void this.router.navigate(['/sign-in/sign-up'], {
        replaceUrl: true
      });
    }
  }
  initSessionTracking() {
    this.authService.user$.subscribe(user => {
      this.hasAuthenticatedSession = Boolean(user);
    });
  }
  restoreSessionOnStartup() {
    if (this.authService.isSessionValid() || this.shouldKeepPendingEmailVerificationVisible()) {
      return;
    }
    console.info('[AUTH] auth_bootstrap_refresh_attempt');
    this.authService.restoreSessionSilently().subscribe({
      next: restored => {
        if (restored && !this.router.url.includes('/user-loader')) {
          void this.router.navigate(['/user-loader'], {
            replaceUrl: true
          });
        }
      },
      error: error => {
        if (error?.error?.requiresRelogin || error?.requiresRelogin) {
          this.authService.logout();
        }
      }
    });
  }
  initForegroundGateRefresh() {
    if (!this.isNativeClient) {
      return;
    }
    void _capacitor_app__WEBPACK_IMPORTED_MODULE_2__.App.addListener('appStateChange', ({
      isActive
    }) => {
      if (!isActive) {
        return;
      }
      void this.remoteConfigGate.checkAndPresent();
      if (this.shouldDeferAuthWorkForCurrentRoute()) {
        return;
      }
      if (this.authService.isAccessTokenExpiringSoon()) {
        this.authService.restoreSessionSilently().subscribe({
          error: error => {
            if (error?.error?.requiresRelogin || error?.requiresRelogin) {
              this.authService.logout();
            }
          }
        });
      }
    }).then(listener => {
      this.appStateListener = listener;
    });
  }
  shouldKeepPendingEmailVerificationVisible() {
    return !this.authService.isAuthenticated() && this.pendingEmailVerificationService.hasPendingVerification();
  }
  shouldDeferAuthWorkForCurrentRoute() {
    if (this.authService.isAuthenticated() || this.hasAuthenticatedSession) {
      return false;
    }
    return this.pendingEmailVerificationService.hasPendingVerification() || this.isPublicAuthRoute(this.router.url);
  }
  isPublicAuthRoute(url) {
    const path = (url || '').split('?')[0].split('#')[0];
    return path === '/sign-in' || path.startsWith('/sign-in/sign-up') || path.startsWith('/sign-in/restore-password');
  }
  ngOnDestroy() {
    if (this.appStateListener) {
      void this.appStateListener.remove();
      this.appStateListener = null;
    }
  }
}
_AppComponent = AppComponent;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(AppComponent, "\u0275fac", function AppComponent_Factory(t) {
  return new (t || _AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_10__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_core_services_remote_config_remote_config_gate_service__WEBPACK_IMPORTED_MODULE_5__.RemoteConfigGateService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_6__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_core_services_auth_pending_email_verification_service__WEBPACK_IMPORTED_MODULE_7__.PendingEmailVerificationService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_core_services_util_theme_service__WEBPACK_IMPORTED_MODULE_8__.ThemeService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(AppComponent, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
  type: _AppComponent,
  selectors: [["app-root"]],
  decls: 2,
  vars: 0,
  template: function AppComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-app");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "ion-router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    }
  },
  dependencies: [_ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonApp, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonRouterOutlet],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
}));


/***/ }),

/***/ 86161:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppModule: () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-routing.module */ 52576);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ 32190);
/* harmony import */ var src_app_core_core_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/core.module */ 53348);
/* harmony import */ var src_app_features_app_update_app_update_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/features/app-update/app-update.module */ 77140);
/* harmony import */ var src_app_features_maintenance_maintenance_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/features/maintenance/maintenance.module */ 9260);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 69717);

var _AppModule;








class AppModule {}
_AppModule = AppModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AppModule, "\u0275fac", function AppModule_Factory(t) {
  return new (t || _AppModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AppModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
  type: _AppModule,
  bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent]
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AppModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
  imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule.forRoot(), src_app_core_core_module__WEBPACK_IMPORTED_MODULE_3__.CoreModule, src_app_features_app_update_app_update_module__WEBPACK_IMPORTED_MODULE_4__.AppUpdateModule, src_app_features_maintenance_maintenance_module__WEBPACK_IMPORTED_MODULE_5__.MaintenanceModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AppModule, {
    declarations: [_app_component__WEBPACK_IMPORTED_MODULE_2__.AppComponent],
    imports: [_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule, src_app_core_core_module__WEBPACK_IMPORTED_MODULE_3__.CoreModule, src_app_features_app_update_app_update_module__WEBPACK_IMPORTED_MODULE_4__.AppUpdateModule, src_app_features_maintenance_maintenance_module__WEBPACK_IMPORTED_MODULE_5__.MaintenanceModule, _app_routing_module__WEBPACK_IMPORTED_MODULE_1__.AppRoutingModule]
  });
})();

/***/ }),

/***/ 3899:
/*!*************************************************************************!*\
  !*** ./src/app/features/clients/resolvers/table-in-context.resolver.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TableInContextResolver: () => (/* binding */ TableInContextResolver)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 33867);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 98945);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 51097);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_table_table_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/table/table.service */ 91594);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 64409);

var _TableInContextResolver;






// Replanteamiento MVP (rutinas) — el constructor de mesociclos
// (mesocycle.page.ts, reutilizado tal cual desde shared-features) lee la
// tabla a editar desde TableService.currentTable(), una señal global que en
// train-fit-front se siembra en el login con la tabla propia del usuario.
// train-fit-trainers no tiene ese sembrado (ni falta que le hace: ningún
// otro punto de esta app lee esa señal), así que este resolver la siembra
// explícitamente desde el :tableId de la ruta ANTES de que el componente se
// active, para que el primer efecto que lea la señal ya tenga la tabla del
// CLIENTE, no una tabla ajena o vacía.
class TableInContextResolver {
  constructor(tableService, ionicUtilService, router) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "tableService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "router", void 0);
    this.tableService = tableService;
    this.ionicUtilService = ionicUtilService;
    this.router = router;
  }
  // TASK-011 (MASTER_BACKLOG.md) — sin catchError, un 403/404 (tabla
  // borrada o acceso revocado entre que el entrenador abrió la lista y
  // hizo clic) cancelaba la navegación en silencio: NavigationError sin
  // escuchar en ningún sitio, pantalla congelada/en blanco. Ahora se avisa
  // con un toast y se redirige a la lista de clientes en vez de dejar al
  // usuario varado. `EMPTY` aborta limpiamente la navegación pendiente sin
  // que Angular Router propague un NavigationError sin manejar.
  resolve(route) {
    const tableId = route.paramMap.get('tableId') || '';
    // Rutinas -> Plantillas (rediseño 2026-08): este resolver también siembra
    // el Planificador en modo plantilla (sin cliente, ver
    // shell-routing.module.ts data.templateMode) — el fallback de error debe
    // volver a la biblioteca de plantillas en ese caso, no a la lista de
    // clientes.
    const fallbackRoute = route.data?.['templateMode'] ? ['/tabs/routine-templates'] : ['/tabs/clients'];
    return this.tableService.getTableById(tableId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(table => this.tableService.setCurrentTable = table), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(error => {
      void this.ionicUtilService.showErrorToast(error, 'No se pudo abrir este entrenamiento. Puede que ya no exista o que no tengas acceso.');
      void this.router.navigate(fallbackRoute);
      return rxjs__WEBPACK_IMPORTED_MODULE_5__.EMPTY;
    }));
  }
}
_TableInContextResolver = TableInContextResolver;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TableInContextResolver, "\u0275fac", function TableInContextResolver_Factory(t) {
  return new (t || _TableInContextResolver)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](src_app_core_services_table_table_service__WEBPACK_IMPORTED_MODULE_1__.TableService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_2__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TableInContextResolver, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: _TableInContextResolver,
  factory: _TableInContextResolver.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 17762:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
/* harmony import */ var _package_json__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../package.json */ 8330);

const PORT = '';
const API_URL_BASE = 'https://train-fit-back-977t.onrender.com' + PORT;
const environment = {
  production: false,
  APP_VERSION: _package_json__WEBPACK_IMPORTED_MODULE_0__.version,
  APP_STORE_URL: 'https://apps.apple.com/es/app/trainfit-trainers/id0000000000',
  GOOGLE_PLAY_URL: 'https://play.google.com/store/apps/details?id=com.trainfit.trainers',
  environmentName: 'pre',
  PORT: PORT,
  API_URL_BASE: API_URL_BASE,
  API_URL_BASE_BACKEND: API_URL_BASE,
  API_URL: API_URL_BASE + '/api',
  lang: 'ES',
  auth: {
    clientFamily: 'trainfit-trainers',
    google: {
      webClientId: '775987417074-s1e767h7tps05ectmrb85uqh7hhp9p8n.apps.googleusercontent.com',
      iosClientId: ''
    },
    apple: {
      clientId: ''
    }
  },
  revenueCat: {
    enabled: false,
    androidApiKey: '',
    iosApiKey: '',
    entitlementId: ''
  }
};

/***/ }),

/***/ 53443:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser */ 93125);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 86161);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./environments/environment */ 17762);




if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.production) {
  (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.enableProdMode)();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__.platformBrowser().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule).catch(err => console.log(err));

/***/ }),

/***/ 53348:
/*!**************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/core.module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CoreModule: () => (/* binding */ CoreModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! @angular/common/http */ 77566);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! @angular/platform-browser */ 93125);
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! @angular/platform-browser/animations */ 91902);
/* harmony import */ var _interceptors_jwt_interceptor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interceptors/jwt.interceptor */ 68300);
/* harmony import */ var _i18n_i18n_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./i18n/i18n.module */ 60890);
/* harmony import */ var _services_auth_auth_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/auth/auth-api.service */ 74081);
/* harmony import */ var _services_auth_auth_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/auth/auth.service */ 74048);
/* harmony import */ var _services_auth_google_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/auth/google-auth.service */ 55334);
/* harmony import */ var _services_auth_apple_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/auth/apple-auth.service */ 70491);
/* harmony import */ var _services_app_update_app_update_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./services/app-update/app-update.service */ 21746);
/* harmony import */ var _services_custom_exercise_custom_exercise_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./services/custom-exercise/custom-exercise-api.service */ 94887);
/* harmony import */ var _services_custom_exercise_custom_exercise_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/custom-exercise/custom-exercise.service */ 33014);
/* harmony import */ var _services_billing_billing_api_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./services/billing/billing-api.service */ 61335);
/* harmony import */ var _services_billing_billing_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./services/billing/billing.service */ 58854);
/* harmony import */ var _services_custom_product_custom_product_api_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./services/custom-product/custom-product-api.service */ 76071);
/* harmony import */ var _services_custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./services/custom-product/custom-product.service */ 57846);
/* harmony import */ var _services_diet_day_diet_day_api_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services/diet-day/diet-day-api.service */ 67863);
/* harmony import */ var _services_diet_day_diet_day_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./services/diet-day/diet-day.service */ 18086);
/* harmony import */ var _services_diet_diet_api_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./services/diet/diet-api.service */ 21457);
/* harmony import */ var _services_diet_diet_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./services/diet/diet.service */ 36752);
/* harmony import */ var _services_exercise_exercise_api_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./services/exercise/exercise-api.service */ 72881);
/* harmony import */ var _services_exercise_exercise_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./services/exercise/exercise.service */ 49232);
/* harmony import */ var _services_rm_calculator_rm_calculator_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./services/rm-calculator/rm-calculator.service */ 72490);
/* harmony import */ var _services_rest_timer_rest_timer_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./services/rest-timer/rest-timer.service */ 72496);
/* harmony import */ var _services_exercise_history_exercise_history_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./services/exercise-history/exercise-history.service */ 83042);
/* harmony import */ var _services_http_http_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./services/http/http.service */ 88552);
/* harmony import */ var _services_meal_meal_api_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./services/meal/meal-api.service */ 74859);
/* harmony import */ var _services_meal_meal_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./services/meal/meal.service */ 96994);
/* harmony import */ var _services_pinned_exercise_note_pinned_exercise_note_api_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./services/pinned-exercise-note/pinned-exercise-note-api.service */ 53333);
/* harmony import */ var _services_pinned_exercise_note_pinned_exercise_note_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./services/pinned-exercise-note/pinned-exercise-note.service */ 49996);
/* harmony import */ var _services_product_product_api_service__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./services/product/product-api.service */ 7559);
/* harmony import */ var _services_product_product_service__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./services/product/product.service */ 24630);
/* harmony import */ var _services_set_set_api_service__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./services/set/set-api.service */ 78715);
/* harmony import */ var _services_set_set_service__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./services/set/set.service */ 48434);
/* harmony import */ var _services_split_split_api_service__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./services/split/split-api.service */ 78051);
/* harmony import */ var _services_split_split_service__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./services/split/split.service */ 20538);
/* harmony import */ var _services_table_table_api_service__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./services/table/table-api.service */ 25331);
/* harmony import */ var _services_table_table_service__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./services/table/table.service */ 91594);
/* harmony import */ var _services_user_user_api_service__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./services/user/user-api.service */ 81243);
/* harmony import */ var _services_user_user_localstorage_service__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./services/user/user-localstorage.service */ 23225);
/* harmony import */ var _services_user_user_service__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./services/user/user.service */ 66802);
/* harmony import */ var _services_anthropometry_anthropometry_service__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./services/anthropometry/anthropometry.service */ 80714);
/* harmony import */ var _services_util_ad_mob_service__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./services/util/ad-mob.service */ 36718);
/* harmony import */ var _services_util_bar_code_scanner_service__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./services/util/bar-code-scanner.service */ 75822);
/* harmony import */ var _services_util_day_weight_service__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./services/util/day-weight.service */ 46817);
/* harmony import */ var _services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./services/util/ionic-util.service */ 37057);
/* harmony import */ var _services_util_navigation_service__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./services/util/navigation.service */ 22938);
/* harmony import */ var _services_util_notification_service__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./services/util/notification.service */ 57507);
/* harmony import */ var _services_util_theme_service__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./services/util/theme.service */ 18341);
/* harmony import */ var _services_util_util_service__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./services/util/util.service */ 35400);
/* harmony import */ var _services_workout_workout_api_service__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./services/workout/workout-api.service */ 63887);
/* harmony import */ var _services_workout_workout_service__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./services/workout/workout.service */ 76990);
/* harmony import */ var _validators_matchPasswords__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./validators/matchPasswords */ 7286);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! @angular/core */ 69717);

var _CoreModule;






















































class CoreModule {
  constructor(parentModule) {
    if (parentModule) {
      throw new Error('CoreModule ya está cargado. Importa CoreModule solo en el AppModule.');
    }
  }
}
_CoreModule = CoreModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CoreModule, "\u0275fac", function CoreModule_Factory(t) {
  return new (t || _CoreModule)(_angular_core__WEBPACK_IMPORTED_MODULE_51__["ɵɵinject"](_CoreModule, 12));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CoreModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_51__["ɵɵdefineNgModule"]({
  type: _CoreModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CoreModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_51__["ɵɵdefineInjector"]({
  providers: [
  // Services
  // General & Utils
  _services_http_http_service__WEBPACK_IMPORTED_MODULE_23__.HttpService, _services_util_util_service__WEBPACK_IMPORTED_MODULE_47__.UtilService, _services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_43__.IonicUtilService, _services_util_theme_service__WEBPACK_IMPORTED_MODULE_46__.ThemeService, _services_util_bar_code_scanner_service__WEBPACK_IMPORTED_MODULE_41__.BarCodeScannerService, _services_util_navigation_service__WEBPACK_IMPORTED_MODULE_44__.NavigationService, _services_util_day_weight_service__WEBPACK_IMPORTED_MODULE_42__.DayWeightService, _services_util_notification_service__WEBPACK_IMPORTED_MODULE_45__.NotificationService, _services_util_ad_mob_service__WEBPACK_IMPORTED_MODULE_40__.AdMobService, _services_app_update_app_update_service__WEBPACK_IMPORTED_MODULE_7__.AppUpdateService,
  // Features
  _services_auth_auth_service__WEBPACK_IMPORTED_MODULE_4__.AuthService, _services_auth_auth_api_service__WEBPACK_IMPORTED_MODULE_3__.AuthApiService, _services_billing_billing_api_service__WEBPACK_IMPORTED_MODULE_10__.BillingApiService, _services_billing_billing_service__WEBPACK_IMPORTED_MODULE_11__.BillingService, _services_auth_google_auth_service__WEBPACK_IMPORTED_MODULE_5__.GoogleAuthService, _services_auth_apple_auth_service__WEBPACK_IMPORTED_MODULE_6__.AppleAuthService, _services_user_user_service__WEBPACK_IMPORTED_MODULE_38__.UserService, _services_user_user_api_service__WEBPACK_IMPORTED_MODULE_36__.UserAPIService, _services_user_user_localstorage_service__WEBPACK_IMPORTED_MODULE_37__.UserLocalstorageService, _services_anthropometry_anthropometry_service__WEBPACK_IMPORTED_MODULE_39__.AnthropometryService, _services_diet_diet_service__WEBPACK_IMPORTED_MODULE_17__.DietService, _services_diet_diet_api_service__WEBPACK_IMPORTED_MODULE_16__.DietAPIService, _services_diet_day_diet_day_service__WEBPACK_IMPORTED_MODULE_15__.DietDayService, _services_diet_day_diet_day_api_service__WEBPACK_IMPORTED_MODULE_14__.DietDayAPIService, _services_meal_meal_service__WEBPACK_IMPORTED_MODULE_25__.MealService, _services_meal_meal_api_service__WEBPACK_IMPORTED_MODULE_24__.MealAPIService, _services_custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_13__.CustomProductService, _services_custom_product_custom_product_api_service__WEBPACK_IMPORTED_MODULE_12__.CustomProductAPIService, _services_product_product_service__WEBPACK_IMPORTED_MODULE_29__.ProductService, _services_product_product_api_service__WEBPACK_IMPORTED_MODULE_28__.ProductAPIService, _services_table_table_service__WEBPACK_IMPORTED_MODULE_35__.TableService, _services_table_table_api_service__WEBPACK_IMPORTED_MODULE_34__.TableAPIService, _services_split_split_service__WEBPACK_IMPORTED_MODULE_33__.SplitService, _services_split_split_api_service__WEBPACK_IMPORTED_MODULE_32__.SplitAPIService, _services_workout_workout_service__WEBPACK_IMPORTED_MODULE_49__.WorkoutService, _services_workout_workout_api_service__WEBPACK_IMPORTED_MODULE_48__.WorkoutAPIService, _services_custom_exercise_custom_exercise_service__WEBPACK_IMPORTED_MODULE_9__.CustomExerciseService, _services_custom_exercise_custom_exercise_api_service__WEBPACK_IMPORTED_MODULE_8__.CustomExerciseAPIService, _services_pinned_exercise_note_pinned_exercise_note_service__WEBPACK_IMPORTED_MODULE_27__.PinnedExerciseNoteService, _services_pinned_exercise_note_pinned_exercise_note_api_service__WEBPACK_IMPORTED_MODULE_26__.PinnedExerciseNoteAPIService, _services_set_set_service__WEBPACK_IMPORTED_MODULE_31__.SetService, _services_set_set_api_service__WEBPACK_IMPORTED_MODULE_30__.SetAPIService, _services_exercise_exercise_service__WEBPACK_IMPORTED_MODULE_19__.ExerciseService, _services_exercise_exercise_api_service__WEBPACK_IMPORTED_MODULE_18__.ExerciseAPIService, _services_rm_calculator_rm_calculator_service__WEBPACK_IMPORTED_MODULE_20__.RmCalculatorService, _services_exercise_history_exercise_history_service__WEBPACK_IMPORTED_MODULE_22__.ExerciseHistoryService, _services_rest_timer_rest_timer_service__WEBPACK_IMPORTED_MODULE_21__.RestTimerService,
  // Interceptors
  {
    provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_52__.HTTP_INTERCEPTORS,
    useClass: _interceptors_jwt_interceptor__WEBPACK_IMPORTED_MODULE_1__.JWTInterceptor,
    multi: true
  },
  // Validators
  _validators_matchPasswords__WEBPACK_IMPORTED_MODULE_50__.MatchPasswords],
  imports: [_i18n_i18n_module__WEBPACK_IMPORTED_MODULE_2__.I18nModule, _angular_platform_browser__WEBPACK_IMPORTED_MODULE_53__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_54__.BrowserAnimationsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_52__.HttpClientModule, _i18n_i18n_module__WEBPACK_IMPORTED_MODULE_2__.I18nModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_51__["ɵɵsetNgModuleScope"](CoreModule, {
    imports: [_i18n_i18n_module__WEBPACK_IMPORTED_MODULE_2__.I18nModule],
    exports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_53__.BrowserModule, _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_54__.BrowserAnimationsModule, _angular_common_http__WEBPACK_IMPORTED_MODULE_52__.HttpClientModule, _i18n_i18n_module__WEBPACK_IMPORTED_MODULE_2__.I18nModule]
  });
})();

/***/ }),

/***/ 17533:
/*!********************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/guards/auth.guard.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authActivateGuard: () => (/* binding */ authActivateGuard),
/* harmony export */   authMatchGuard: () => (/* binding */ authMatchGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 27453);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 2950);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 51097);
/* harmony import */ var _services_auth_auth_error_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/auth/auth-error.service */ 68063);
/* harmony import */ var _services_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/auth/auth.service */ 74048);
/* harmony import */ var _services_auth_pending_email_verification_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/auth/pending-email-verification.service */ 72);







// TASK-010 (MASTER_BACKLOG.md) — sin capturar la URL solicitada, cualquier
// deep link (notificación, email, enlace directo a un cliente/rutina) que
// requiriera login siempre aterrizaba en el dashboard tras autenticarse. Se
// añade como returnUrl para que sign-in/user-loader puedan restaurarlo (ver
// sign-in.page.ts#handleLoginCorrect/handleSocialSuccess y
// user-loader.page.ts). Nunca se captura '/sign-in' ni rutas vacías —
// evitaría un bucle de redirección sin sentido.
const buildReturnUrl = router => {
  const attemptedUrl = router.getCurrentNavigation()?.extractedUrl?.toString();
  if (!attemptedUrl || attemptedUrl === '/' || attemptedUrl.startsWith('/sign-in')) {
    return null;
  }
  return attemptedUrl;
};
const createLoginRedirect = (router, showConnectionIssue = false) => {
  const returnUrl = buildReturnUrl(router);
  return router.createUrlTree(['/sign-in'], {
    queryParams: {
      ...(showConnectionIssue ? {
        [_services_auth_auth_error_service__WEBPACK_IMPORTED_MODULE_0__.AUTH_LOGIN_FEEDBACK_QUERY_PARAM]: _services_auth_auth_error_service__WEBPACK_IMPORTED_MODULE_0__.AUTH_LOGIN_CONNECTION_QUERY_VALUE
      } : {}),
      ...(returnUrl ? {
        returnUrl
      } : {})
    }
  });
};
const checkToken = () => {
  const authService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService);
  const pendingEmailVerificationService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_services_auth_pending_email_verification_service__WEBPACK_IMPORTED_MODULE_2__.PendingEmailVerificationService);
  const router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router);
  if (authService.isAuthenticated()) {
    return true;
  }
  if (pendingEmailVerificationService.hasPendingVerification()) {
    return router.createUrlTree(['/sign-in/sign-up']);
  }
  console.info('[AUTH] auth_guard_refresh_attempt');
  return authService.restoreSessionSilently().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(restored => {
    if (restored) {
      return true;
    }
    console.info('[AUTH] auth_guard_redirect_login');
    return createLoginRedirect(router);
  }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.catchError)(err => {
    if (err?.error?.requiresRelogin || err?.requiresRelogin) {
      authService.logout();
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(false);
    }
    console.warn('[AUTH] auth_guard_refresh_transient_failure', {
      status: err?.status,
      message: err?.message
    });
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(createLoginRedirect(router, true));
  }));
};
const authActivateGuard = () => checkToken();
const authMatchGuard = () => checkToken();

/***/ }),

/***/ 60890:
/*!*******************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/i18n/i18n.module.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I18nModule: () => (/* binding */ I18nModule),
/* harmony export */   createTranslateLoader: () => (/* binding */ createTranslateLoader),
/* harmony export */   initTranslations: () => (/* binding */ initTranslations)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common/http */ 77566);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/http-loader */ 44199);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 99295);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 36115);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 51097);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 27453);
/* harmony import */ var _i18n_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./i18n.service */ 35347);

var _I18nModule;








function createTranslateLoader(http) {
  return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_2__.TranslateHttpLoader(http, './assets/i18n/', '.json');
}
// Preloads the translation table before the app's first route/guard runs, so
// no `translate.instant(...)` call (e.g. AuthErrorService on a cold-start
// network failure) can race the async load and fall back to showing the raw
// translation key. 4s safety timeout: never let a missing/corrupt asset hang
// bootstrap indefinitely.
function initTranslations(translate) {
  return () => (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.firstValueFrom)(translate.use((0,_i18n_service__WEBPACK_IMPORTED_MODULE_1__.resolveInitialLang)()).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.timeout)(4000), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null))));
}
class I18nModule {}
_I18nModule = I18nModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(I18nModule, "\u0275fac", function I18nModule_Factory(t) {
  return new (t || _I18nModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(I18nModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({
  type: _I18nModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(I18nModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({
  providers: [{
    provide: _angular_core__WEBPACK_IMPORTED_MODULE_7__.APP_INITIALIZER,
    useFactory: initTranslations,
    deps: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateService],
    multi: true
  }],
  imports: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateModule.forRoot({
    loader: {
      provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_9__.HttpClient]
    },
    defaultLanguage: 'es'
  }), _ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](I18nModule, {
    imports: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateModule],
    exports: [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_8__.TranslateModule]
  });
})();

/***/ }),

/***/ 35347:
/*!********************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/i18n/i18n.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DEFAULT_LANG: () => (/* binding */ DEFAULT_LANG),
/* harmony export */   I18nService: () => (/* binding */ I18nService),
/* harmony export */   resolveInitialLang: () => (/* binding */ resolveInitialLang)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 84288);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 647);

var _I18nService;




const DEFAULT_LANG = new _angular_core__WEBPACK_IMPORTED_MODULE_1__.InjectionToken('DEFAULT_LANG');
function detectBrowserLang() {
  try {
    const nav = navigator.language || navigator.userLanguage;
    if (nav?.startsWith('en')) return 'en';
    if (nav?.startsWith('es')) return 'es';
  } catch {}
  return null;
}
// Saved choice > browser language > 'es'. Shared with the APP_INITIALIZER in
// i18n.module.ts so both resolve to the exact same language on cold start.
function resolveInitialLang() {
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('trainfit_lang') : null;
  return saved || detectBrowserLang() || 'es';
}
class I18nService {
  constructor(translate, defaultLang) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "translate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "defaultLang", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "currentLang", new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject('es'));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "lang$", this.currentLang.asObservable());
    this.translate = translate;
    this.defaultLang = defaultLang;
    const lang = resolveInitialLang();
    translate.use(lang);
    this.currentLang.next(lang);
  }
  switchLang(lang) {
    this.translate.use(lang);
    this.currentLang.next(lang);
    try {
      localStorage.setItem('trainfit_lang', lang);
    } catch {}
  }
  get current() {
    return this.currentLang.value;
  }
}
_I18nService = I18nService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(I18nService, "\u0275fac", function I18nService_Factory(t) {
  return new (t || _I18nService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](DEFAULT_LANG, 8));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(I18nService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _I18nService,
  factory: _I18nService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 68300:
/*!*******************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/interceptors/jwt.interceptor.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JWTInterceptor: () => (/* binding */ JWTInterceptor)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ 77566);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/core */ 44599);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 84288);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 83494);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 51097);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 75504);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 65821);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 47114);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ 17762);
/* harmony import */ var _services_auth_auth_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/auth/auth-api.service */ 74081);
/* harmony import */ var _services_maintenance_maintenance_modal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/maintenance/maintenance-modal.service */ 24626);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _services_auth_auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/auth/auth.service */ 74048);

var _JWTInterceptor;









/**
 * Context token that marks a request as already having been retried after
 * a 401. Prevents infinite retry loops.
 */
const AUTH_RETRY_ATTEMPTED = new _angular_common_http__WEBPACK_IMPORTED_MODULE_6__.HttpContextToken(() => false);
/**
 * JWTInterceptor — HTTP Interceptor with Semaphore Queue
 *
 * Handles token injection and automatic refresh on 401 responses.
 *
 * ── Semaphore / Queue pattern ──────────────────────────────────────────────
 *
 *  • `isRefreshing` — boolean flag that becomes true the moment the first
 *    401 is caught and a refresh call is in progress.
 *
 *  • `refreshToken$` — BehaviorSubject<string | null> that acts as a queue:
 *      - Starts as null.
 *      - While a refresh is in progress subsequent 401 requests subscribe to
 *        this subject and **pause** via `filter(token => token !== null)` +
 *        `take(1)`.  They will not proceed until the subject emits a value.
 *      - Once the new token arrives the subject emits it, all waiting
 *        requests resume simultaneously with the fresh token.
 *
 *  • If the refresh call itself fails with a terminal error, `logout()` is
 *    called.  In all failure cases the subject emits null, queued requests
 *    are unblocked and receive the original 401 error.
 */
class JWTInterceptor {
  constructor(authService, injector) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "authService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "injector", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "clientPlatform", _capacitor_core__WEBPACK_IMPORTED_MODULE_1__.Capacitor.getPlatform());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "clientFamily", src_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.auth?.clientFamily ?? 'trainfit-front');
    // ─── Semaphore state ──────────────────────────────────────────────────────
    /** True while a refresh call is in-flight. */
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isRefreshing", false);
    /**
     * Queue subject.
     * Emits null when idle or when a refresh fails; emits the new access
     * token string when a refresh succeeds, unblocking all queued requests.
     */
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "refreshToken$", new rxjs__WEBPACK_IMPORTED_MODULE_7__.BehaviorSubject(null));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "maintenanceModal", null);
    this.authService = authService;
    this.injector = injector;
  }
  // ─── Intercept ────────────────────────────────────────────────────────────
  intercept(request, next) {
    // Always attach platform headers.
    const baseRequest = request.clone({
      setHeaders: {
        'x-client-platform': this.clientPlatform,
        'x-client-family': this.clientFamily
      },
      withCredentials: true
    });
    // Public endpoints bypass auth header injection and 401 handling.
    if (this.isPublicEndpoint(baseRequest)) {
      return next.handle(baseRequest);
    }
    // Attach the current in-memory access token if available.
    const token = this.authService.getAccessToken();
    const authRequest = token ? this.addAuthorizationHeader(baseRequest, token) : baseRequest;
    return next.handle(authRequest).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(error => this.handleError(error, baseRequest, next)));
  }
  // ─── Error Handler ────────────────────────────────────────────────────────
  handleError(error, originalRequest, next) {
    // 503 with MAINTENANCE_ACTIVE → show maintenance screen.
    if (error.status === 503 && error.error?.code === 'MAINTENANCE_ACTIVE') {
      if (!this.maintenanceModal) {
        this.maintenanceModal = this.injector.get(_services_maintenance_maintenance_modal_service__WEBPACK_IMPORTED_MODULE_4__.MaintenanceModalService);
      }
      const maintenance = {
        state: 'active',
        message: error.error?.message || ''
      };
      void this.maintenanceModal.presentIfActive(maintenance);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.throwError)(() => error);
    }
    // Pass through non-401 errors unchanged.
    if (error.status !== 401) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.throwError)(() => error);
    }
    // A terminal error means the session is irrecoverable → force logout.
    if (this.authService.isTerminalAuthError(error)) {
      this.authService.logout();
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.throwError)(() => error);
    }
    // A request that has already been retried once should not retry again.
    if (originalRequest.context.get(AUTH_RETRY_ATTEMPTED)) {
      this.authService.logout();
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.throwError)(() => error);
    }
    // ── Semaphore gate ────────────────────────────────────────────────────
    if (this.isRefreshing) {
      // A refresh is already in flight.
      // Pause this request until the refresh completes (success OR failure).
      // We filter on `!isRefreshing` instead of `token !== null` so that
      // a failed refresh (which emits null) also unblocks queued requests.
      return this.refreshToken$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.filter)(() => !this.isRefreshing), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.switchMap)(newToken => {
        if (!newToken) {
          // Refresh failed — propagate the original 401 to this request.
          return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.throwError)(() => error);
        }
        return next.handle(this.addAuthorizationHeader(originalRequest, newToken, true));
      }));
    }
    // ── First request to hit 401: start the refresh ───────────────────────
    this.isRefreshing = true;
    this.refreshToken$.next(null); // reset subject so queued requests wait
    return this.authService.refreshToken().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.switchMap)(response => {
      const newToken = response?.access_token ?? this.authService.getAccessToken();
      if (!newToken) {
        this.finalizeRefresh(null);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.throwError)(() => error);
      }
      // Unblock all queued requests with the fresh token.
      this.finalizeRefresh(newToken);
      return next.handle(this.addAuthorizationHeader(originalRequest, newToken, true));
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.catchError)(refreshError => {
      // Refresh failed — signal failure to queued requests and logout.
      this.finalizeRefresh(null);
      if (this.authService.isTerminalAuthError(refreshError)) {
        this.authService.logout();
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.throwError)(() => refreshError);
    }));
  }
  // ─── Helpers ─────────────────────────────────────────────────────────────
  /**
   * Called after a refresh attempt (success or failure).
   * Resets the semaphore flag and emits on the queue subject.
   *
   * @param newToken The fresh access token on success, or `null` on failure.
   */
  finalizeRefresh(newToken) {
    this.isRefreshing = false;
    this.refreshToken$.next(newToken);
  }
  /** Clone `req` adding a Bearer Authorization header. */
  addAuthorizationHeader(req, token, markRetry = false) {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true,
      context: markRetry ? req.context.set(AUTH_RETRY_ATTEMPTED, true) : req.context
    });
  }
  /** Returns true for endpoints that never require an Authorization header. */
  isPublicEndpoint(request) {
    const isUsersCreate = request.method === 'POST' && /\/users\/?$/.test(request.url);
    const isPublicHashCheck = request.method === 'GET' && request.url.includes('/users/hash/');
    return request.url.includes(_services_auth_auth_api_service__WEBPACK_IMPORTED_MODULE_3__.AuthApiService.AUTHORIZATION_TOKEN_ENDPOINT) || request.url.includes(_services_auth_auth_api_service__WEBPACK_IMPORTED_MODULE_3__.AuthApiService.REFRESH_ENDPOINT) || request.url.includes(_services_auth_auth_api_service__WEBPACK_IMPORTED_MODULE_3__.AuthApiService.LOGOUT_ENDPOINT) || request.url.includes(_services_auth_auth_api_service__WEBPACK_IMPORTED_MODULE_3__.AuthApiService.VERIFY_GOOGLE_ENDPOINT) || request.url.includes(_services_auth_auth_api_service__WEBPACK_IMPORTED_MODULE_3__.AuthApiService.VERIFY_APPLE_ENDPOINT) || request.url.includes(_services_auth_auth_api_service__WEBPACK_IMPORTED_MODULE_3__.AuthApiService.SOCIAL_REGISTER_ENDPOINT) || request.url.includes(_services_auth_auth_api_service__WEBPACK_IMPORTED_MODULE_3__.AuthApiService.ACTIVATE_ENDPOINT) || request.url.includes('/users/check/') || request.url.includes('/users/send/mail/code') || isPublicHashCheck || isUsersCreate;
  }
}
_JWTInterceptor = JWTInterceptor;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(JWTInterceptor, "\u0275fac", function JWTInterceptor_Factory(t) {
  return new (t || _JWTInterceptor)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_5__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_13__.Injector));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(JWTInterceptor, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjectable"]({
  token: _JWTInterceptor,
  factory: _JWTInterceptor.ɵfac
}));


/***/ }),

/***/ 9268:
/*!***********************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/models/customProduct.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CUSTOM_PRODUCT_KEYS: () => (/* binding */ CUSTOM_PRODUCT_KEYS),
/* harmony export */   CUSTOM_PRODUCT_NUTRITION_FIELDS: () => (/* binding */ CUSTOM_PRODUCT_NUTRITION_FIELDS),
/* harmony export */   CUSTOM_PRODUCT_VALUES: () => (/* binding */ CUSTOM_PRODUCT_VALUES),
/* harmony export */   CustomProduct: () => (/* binding */ CustomProduct)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);

class CustomProduct {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_id", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "quantity", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "order", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "product", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "lastUsedAt", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "mealId", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "customRecipeId", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "baseCustomProductId", void 0);
    // Pautado por trainer (ver custom-product-schema.js backend) — presente
    // si un profesional pautó este producto. Protegido de borrado/edición
    // directa (backend, meal-service.js#assertMealEditable).
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "assignedByTrainerId", void 0);
    // El cliente lo marca como tomado — nunca bloqueado por assignedByTrainerId.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "consumed", void 0);
    // Overrides nutricionales
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "energyKcal100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "protein100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "carbohydrates100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "fat100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "saturatedFat100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "sugars100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "fiber100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "salt100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "sodium100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "cholesterol100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "transFat100g", void 0);
    // Minerales
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "calcium100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "iron100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "magnesium100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "phosphorus100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "potassium100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "zinc100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "copper100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "manganese100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selenium100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "iodine100g", void 0);
    // Vitaminas
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminA100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminC100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminD100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminE100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminK100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminB1100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminB2100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminB3100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminB5100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminB6100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminB9100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminB12100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "biotin100g", void 0);
    // Otros
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "omega3100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "omega6100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "omega9100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "caffeine100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "taurine100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "alcohol100g", void 0);
    // Propiedades adicionales
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "ingredients", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "allergens", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "traces", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vegan", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vegetarian", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "lactoseFree", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "glutenFree", void 0);
  }
}
const CUSTOM_PRODUCT_KEYS = {
  quantity: 'quantity',
  energy: 'energyKcal100g',
  protein: 'protein100g',
  carbohydrates: 'carbohydrates100g',
  fat: 'fat100g'
};
const CUSTOM_PRODUCT_NUTRITION_FIELDS = ['energyKcal100g', 'protein100g', 'carbohydrates100g', 'fat100g', 'saturatedFat100g', 'sugars100g', 'fiber100g', 'salt100g', 'sodium100g', 'cholesterol100g', 'transFat100g', 'calcium100g', 'iron100g', 'magnesium100g', 'phosphorus100g', 'potassium100g', 'zinc100g', 'copper100g', 'manganese100g', 'selenium100g', 'iodine100g', 'vitaminA100g', 'vitaminC100g', 'vitaminD100g', 'vitaminE100g', 'vitaminK100g', 'vitaminB1100g', 'vitaminB2100g', 'vitaminB3100g', 'vitaminB5100g', 'vitaminB6100g', 'vitaminB9100g', 'vitaminB12100g', 'biotin100g', 'omega3100g', 'omega6100g', 'omega9100g', 'caffeine100g', 'taurine100g', 'alcohol100g'];
const CUSTOM_PRODUCT_VALUES = Object.values(CUSTOM_PRODUCT_KEYS);

/***/ }),

/***/ 110:
/*!**************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/models/diet.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Diet: () => (/* binding */ Diet)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);

class Diet {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_id", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "name", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "pinnedNote", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "dietsDay", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "kcalAverage", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "proteinsGAverage", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "carbohydratesGAverage", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "fatGAverage", void 0);
  }
}

/***/ }),

/***/ 90394:
/*!*****************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/models/dietDay.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DietDay: () => (/* binding */ DietDay)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);

class DietDay {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_id", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "weight", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "date", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "notes", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "steps", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "meals", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "kcal", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "kcalTotal", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "proteinsG", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "proteinsGTotal", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "carbohydratesG", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "carbohydratesGTotal", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "fatG", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "fatGTotal", void 0);
  }
}

/***/ }),

/***/ 66940:
/*!*********************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/models/http-header.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTTP_HEADERS: () => (/* binding */ HTTP_HEADERS),
/* harmony export */   HttpHeader: () => (/* binding */ HttpHeader)
/* harmony export */ });
class HttpHeader {
  constructor(key, value) {
    this[key] = value;
  }
}
const HTTP_HEADERS = {
  auth: {
    authorization: {
      id: 'Authorization'
    }
  },
  login: {
    contentType: {
      id: 'Content-Type',
      header: new HttpHeader('Content-Type', 'application/x-www-form-urlencoded')
    },
    disableBrowserPopup: {
      id: 'X-Requested-With',
      header: new HttpHeader('X-Requested-With', 'XMLHttpRequest')
    }
  }
};

/***/ }),

/***/ 50059:
/*!**************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/models/meal.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MEAL_TYPES: () => (/* binding */ MEAL_TYPES),
/* harmony export */   MEAL_VALUES: () => (/* binding */ MEAL_VALUES),
/* harmony export */   Meal: () => (/* binding */ Meal)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);

class Meal {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_id", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "name", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "kcal", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "protein", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "carbohydrate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "fat", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "notes", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "customProducts", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "customRecipes", void 0);
  }
}
var MEAL_TYPES;
(function (MEAL_TYPES) {
  MEAL_TYPES[MEAL_TYPES["Desayuno"] = 0] = "Desayuno";
  MEAL_TYPES[MEAL_TYPES["Almuerzo"] = 1] = "Almuerzo";
  MEAL_TYPES[MEAL_TYPES["Comida"] = 2] = "Comida";
  MEAL_TYPES[MEAL_TYPES["Merienda"] = 3] = "Merienda";
  MEAL_TYPES[MEAL_TYPES["Cena"] = 4] = "Cena";
  MEAL_TYPES[MEAL_TYPES["Recena"] = 5] = "Recena";
})(MEAL_TYPES || (MEAL_TYPES = {}));
const MEAL_VALUES = Object.values(MEAL_TYPES);

/***/ }),

/***/ 6546:
/*!***************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/models/split.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SPLIT_PURPOSES: () => (/* binding */ SPLIT_PURPOSES),
/* harmony export */   Split: () => (/* binding */ Split)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);

const SPLIT_PURPOSES = [{
  key: 'regular',
  label: 'Normal'
}, {
  key: 'accumulation',
  label: 'Acumulación'
}, {
  key: 'intensification',
  label: 'Intensificación'
}, {
  key: 'peak',
  label: 'Pico'
}, {
  key: 'deload',
  label: 'Descarga'
}, {
  key: 'vacation',
  label: 'Vacaciones'
}];
class Split {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_id", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "name", void 0);
    // Qué buscaba el entrenador con este bloque ("subir series de espalda sin
    // tocar pierna"). Es lo que responde, tres meses después, a "¿por qué
    // programé esto?".
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "objective", void 0);
    // 'regular' por defecto: todos los microciclos que ya existen lo son, y
    // nadie tiene que ir a marcarlos.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "purpose", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "workouts", void 0);
  }
}

/***/ }),

/***/ 30558:
/*!***************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/models/table.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Table: () => (/* binding */ Table)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);

class Table {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_id", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "name", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "type", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "userId", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "splits", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "urlImage", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "description", void 0);
    // Light search payload fields (search-tables)
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "microcyclesCount", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "workoutsCount", void 0);
    // MVP-trainers F11/F15: presente si un profesional asignó esta rutina.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "assignedByTrainerId", void 0);
  }
}

/***/ }),

/***/ 28861:
/*!*****************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/models/workout.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Workout: () => (/* binding */ Workout),
/* harmony export */   WorkoutBlock: () => (/* binding */ WorkoutBlock)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);

class WorkoutBlock {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_id", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "name", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "type", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "order", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "rounds", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "restBetweenExercises", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "restBetweenRounds", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "instructions", void 0);
  }
}
class Workout {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_id", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "name", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "notes", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "date", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "cronometer", void 0);
    // Set once, the moment the workout truly starts (first "play"). Combined
    // with `date` (finish timestamp, null while in progress) this derives the
    // elapsed time as `(date ?? now) - startedAt` — no interval-accumulated
    // counter, so it survives app kills/backgrounding/navigation untouched.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "startedAt", void 0);
    // True when the user explicitly skipped this training day. Mutually
    // exclusive with `date`: a skipped workout is never marked as finished.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "rest", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "blocks", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "exercises", void 0);
    // MVP-trainers F18 — pulso opcional de readiness/esfuerzo por sesión (1-5),
    // visible para el profesional junto al historial de entrenamientos (F09).
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "readinessPre", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "perceivedEffortPost", void 0);
    // Movimiento 2 Coach Pro — agujetas al LLEGAR a la sesión, por grupo
    // muscular. Solo los grupos marcados por encima de "nada"; vacío = nada
    // reportado. Ver constants/soreness.ts para por qué se pregunta antes de
    // entrenar y no después.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "sorenessPre", void 0);
  }
}

/***/ }),

/***/ 80714:
/*!***********************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/anthropometry/anthropometry.service.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnthropometryService: () => (/* binding */ AnthropometryService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 65821);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _AnthropometryService;



class AnthropometryService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "endpoint", 'anthropometry');
    this.http = http;
  }
  createAnthropometry(data) {
    return this.http.post(this.endpoint, data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  getAnthropometryById(id) {
    return this.http.get(`${this.endpoint}/${id}`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  getAnthropometryByDate(date) {
    return this.http.post(`${this.endpoint}/by-date`, {
      date
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  getAnthropometriesBetweenDates(minDate, maxDate) {
    return this.http.post(`${this.endpoint}/between-dates`, {
      minDate,
      maxDate
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  getAllAnthropometries() {
    return this.http.get(this.endpoint).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  updateAnthropometry(id, data) {
    return this.http.put(`${this.endpoint}/${id}`, data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  deleteAnthropometry(id) {
    return this.http.delete(`${this.endpoint}/${id}`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  upsertAnthropometry(data) {
    return this.http.post(`${this.endpoint}/upsert`, data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
}
_AnthropometryService = AnthropometryService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AnthropometryService, "\u0275fac", function AnthropometryService_Factory(t) {
  return new (t || _AnthropometryService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AnthropometryService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _AnthropometryService,
  factory: _AnthropometryService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 21746:
/*!*****************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/app-update/app-update.service.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppUpdateService: () => (/* binding */ AppUpdateService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _capacitor_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/browser */ 90660);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/core */ 44599);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ 17762);
/* harmony import */ var src_app_features_app_update_app_update_modal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/features/app-update/app-update-modal.component */ 97109);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 54844);


var _AppUpdateService;






class AppUpdateService {
  constructor(modalController) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isModalOpen", false);
    this.modalController = modalController;
  }
  // `forceUpdate` viene ya calculado por RemoteConfigService/RemoteConfigGateService
  // (comparación semver de versión mínima por plataforma, hecha en el backend).
  presentRequiredUpdate(forceUpdate) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!forceUpdate?.required || _this.isModalOpen) {
        return;
      }
      yield _this.showRequiredUpdateModal(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.APP_VERSION, forceUpdate.minVersion || "", forceUpdate.message || "");
    })();
  }
  showRequiredUpdateModal(currentVersion, requiredVersion, customMessage) {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.isModalOpen) {
        return;
      }
      _this2.isModalOpen = true;
      const modal = yield _this2.modalController.create({
        component: src_app_features_app_update_app_update_modal_component__WEBPACK_IMPORTED_MODULE_5__.AppUpdateModalComponent,
        componentProps: {
          currentVersion,
          requiredVersion,
          customMessage,
          updateHandler: () => _this2.openStore()
        },
        cssClass: "app-update-required-modal",
        backdropDismiss: false,
        canDismiss: false
      });
      modal.onDidDismiss().then(() => {
        _this2.isModalOpen = false;
      });
      yield modal.present();
    })();
  }
  openStore() {
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const platform = _capacitor_core__WEBPACK_IMPORTED_MODULE_3__.Capacitor.getPlatform();
      // Web no tiene tienda de apps: la "actualización" es simplemente recargar,
      // el usuario ya recibe el build más reciente al hacerlo.
      if (platform === "web") {
        window.location.reload();
        return;
      }
      const url = platform === "ios" ? src_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.APP_STORE_URL : src_environments_environment__WEBPACK_IMPORTED_MODULE_4__.environment.GOOGLE_PLAY_URL;
      if (!url) {
        console.warn("Missing store URL for update flow");
        return;
      }
      yield _capacitor_browser__WEBPACK_IMPORTED_MODULE_2__.Browser.open({
        url
      });
    })();
  }
}
_AppUpdateService = AppUpdateService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(AppUpdateService, "\u0275fac", function AppUpdateService_Factory(t) {
  return new (t || _AppUpdateService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(AppUpdateService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: _AppUpdateService,
  factory: _AppUpdateService.ɵfac
}));


/***/ }),

/***/ 70491:
/*!***********************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/auth/apple-auth.service.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppleAuthService: () => (/* binding */ AppleAuthService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _capgo_capacitor_social_login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capgo/capacitor-social-login */ 76948);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 45398);


var _AppleAuthService;



class AppleAuthService {
  constructor(_platform) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_platform", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "initialized", false);
    this._platform = _platform;
    // Inicialización bajo demanda en signIn
  }

  initialize() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.initialized) return;
      try {
        const config = {
          apple: {
            clientId: 'com.trainfit.trainfit'
          },
          google: {
            webClientId: '775987417074-s1e767h7tps05ectmrb85uqh7hhp9p8n.apps.googleusercontent.com'
          }
        };
        if (_this._platform.is('ios')) {
          config.google.iOSClientId = '775987417074-ibu27rm1ku8uuunaacebmp14ahvuuk4u.apps.googleusercontent.com';
        }
        console.log('Inicializando SocialLogin (AppleService)...');
        yield _capgo_capacitor_social_login__WEBPACK_IMPORTED_MODULE_2__.SocialLogin.initialize(config);
        _this.initialized = true;
      } catch (error) {
        console.error('Error inicializando Apple Auth:', error);
      }
    })();
  }
  signIn() {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this2.initialized) {
        yield _this2.initialize();
      }
      return yield _capgo_capacitor_social_login__WEBPACK_IMPORTED_MODULE_2__.SocialLogin.login({
        provider: 'apple',
        options: {
          scopes: ['email', 'fullName']
        }
      });
    })();
  }
}
_AppleAuthService = AppleAuthService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(AppleAuthService, "\u0275fac", function AppleAuthService_Factory(t) {
  return new (t || _AppleAuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.Platform));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(AppleAuthService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _AppleAuthService,
  factory: _AppleAuthService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 74081:
/*!*********************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/auth/auth-api.service.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthApiService: () => (/* binding */ AuthApiService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _AuthApiService;


class AuthApiService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  login(email, password) {
    return this.http.post(AuthApiService.AUTHORIZATION_TOKEN_ENDPOINT, {
      email,
      password
    }, undefined, true);
  }
  save(user) {
    return this.http.put(AuthApiService.REGISTER_ENDPOINT, user);
  }
  refreshToken() {
    return this.refreshTokenWithHeader();
  }
  refreshTokenWithHeader(refreshToken) {
    const headers = refreshToken ? {
      "x-refresh-token": refreshToken
    } : undefined;
    // withCredentials keeps web cookie flow active.
    return this.http.post(AuthApiService.REFRESH_ENDPOINT, {}, headers, true);
  }
  logout() {
    return this.logoutWithHeader();
  }
  logoutWithHeader(refreshToken) {
    const headers = refreshToken ? {
      "x-refresh-token": refreshToken
    } : undefined;
    // withCredentials keeps web cookie flow active.
    return this.http.post(AuthApiService.LOGOUT_ENDPOINT, {}, headers, true);
  }
  impersonate(userId) {
    return this.http.post(AuthApiService.IMPERSONATE_ENDPOINT, {
      userId
    }, undefined, true);
  }
  revertImpersonation() {
    return this.http.post(AuthApiService.REVERT_IMPERSONATE_ENDPOINT, {}, undefined, true);
  }
  verifyGoogle(email, tokenGoogle) {
    return this.http.post(AuthApiService.VERIFY_GOOGLE_ENDPOINT, {
      email,
      tokenGoogle
    }, undefined, true);
  }
  verifyApple(email, tokenApple) {
    return this.http.post(AuthApiService.VERIFY_APPLE_ENDPOINT, {
      email,
      tokenApple
    }, undefined, true);
  }
}
_AuthApiService = AuthApiService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthApiService, "AUTHORIZATION_TOKEN_ENDPOINT", "auth/login");
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthApiService, "REGISTER_ENDPOINT", "users");
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthApiService, "REFRESH_ENDPOINT", "auth/refresh");
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthApiService, "LOGOUT_ENDPOINT", "auth/logout");
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthApiService, "VERIFY_GOOGLE_ENDPOINT", "auth/social/google/verify");
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthApiService, "VERIFY_APPLE_ENDPOINT", "auth/social/apple/verify");
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthApiService, "SOCIAL_REGISTER_ENDPOINT", "auth/social/register");
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthApiService, "ACTIVATE_ENDPOINT", "auth/activate");
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthApiService, "IMPERSONATE_ENDPOINT", "auth/impersonate");
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthApiService, "REVERT_IMPERSONATE_ENDPOINT", "auth/impersonate/revert");
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthApiService, "\u0275fac", function AuthApiService_Factory(t) {
  return new (t || _AuthApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthApiService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _AuthApiService,
  factory: _AuthApiService.ɵfac
}));


/***/ }),

/***/ 68063:
/*!***********************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/auth/auth-error.service.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AUTH_LOGIN_CONNECTION_QUERY_VALUE: () => (/* binding */ AUTH_LOGIN_CONNECTION_QUERY_VALUE),
/* harmony export */   AUTH_LOGIN_FEEDBACK_QUERY_PARAM: () => (/* binding */ AUTH_LOGIN_FEEDBACK_QUERY_PARAM),
/* harmony export */   AuthErrorService: () => (/* binding */ AuthErrorService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _AuthErrorService;


const AUTH_LOGIN_FEEDBACK_QUERY_PARAM = 'loginIssue';
const AUTH_LOGIN_CONNECTION_QUERY_VALUE = 'connection';
class AuthErrorService {
  get translate() {
    if (!this._translate) {
      this._translate = this.injector.get(_ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__.TranslateService);
    }
    return this._translate;
  }
  constructor(injector) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "injector", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_translate", null);
    this.injector = injector;
  }
  toLoginFeedback(error) {
    const status = this.getStatus(error);
    const code = this.getCode(error);
    if (this.isAccountNotVerified(status, code)) {
      return {
        kind: 'account-not-verified',
        message: this.translate.instant('AUTH_ERRORS.ACCOUNT_NOT_VERIFIED'),
        retryable: false,
        status,
        code
      };
    }
    // El mensaje lo arma el backend a medida (qué app, qué rol le hace
    // falta a la cuenta) — no hay una traducción estática única que lo
    // cubra, se pasa el mensaje real del servidor tal cual.
    if (this.isWrongAppForRole(status, code)) {
      return {
        kind: 'wrong-app-for-role',
        message: this.getServerMessage(error) || this.translate.instant('AUTH_ERRORS.UNEXPECTED'),
        retryable: false,
        status,
        code
      };
    }
    if (this.isInvalidCredentials(status, code)) {
      return {
        kind: 'invalid-credentials',
        message: this.translate.instant('AUTH_ERRORS.INVALID_CREDENTIALS'),
        retryable: false,
        status,
        code
      };
    }
    if (this.isStorageError(error)) {
      return {
        kind: 'storage',
        message: this.translate.instant('AUTH_ERRORS.STORAGE'),
        retryable: true,
        status,
        code
      };
    }
    if (this.isTimeout(status, error)) {
      return {
        kind: 'timeout',
        message: this.translate.instant('AUTH_ERRORS.TIMEOUT'),
        retryable: true,
        status,
        code
      };
    }
    if (this.isNetworkError(status, error)) {
      return {
        kind: 'network',
        message: this.translate.instant('AUTH_ERRORS.NETWORK'),
        retryable: true,
        status,
        code
      };
    }
    if (status && status >= 500) {
      return {
        kind: 'server',
        message: this.translate.instant('AUTH_ERRORS.UNEXPECTED'),
        retryable: true,
        status,
        code
      };
    }
    return {
      kind: 'unexpected',
      message: this.translate.instant('AUTH_ERRORS.UNEXPECTED'),
      retryable: true,
      status,
      code
    };
  }
  isAccountNotVerifiedError(error) {
    return this.isAccountNotVerified(this.getStatus(error), this.getCode(error));
  }
  isInvalidCredentials(status, code) {
    return status === 401 || status === 404 || code === 'INVALID_CREDENTIALS';
  }
  isAccountNotVerified(status, code) {
    return status === 403 && code === 'ACCOUNT_NOT_VERIFIED';
  }
  isWrongAppForRole(status, code) {
    return status === 403 && code === 'WRONG_APP_FOR_ROLE';
  }
  getServerMessage(error) {
    const message = error?.error?.message;
    return typeof message === 'string' && message.length > 0 ? message : undefined;
  }
  isTimeout(status, error) {
    return status === 408 || status === 504 || error?.name === 'TimeoutError' || error?.error?.name === 'TimeoutError';
  }
  isStorageError(error) {
    return !!(error?.transientAuthStorage || error?.error?.transientAuthStorage);
  }
  isNetworkError(status, error) {
    const nativeError = error?.error;
    return status === 0 || error?.status === 0 || nativeError?.status === 0 || typeof ProgressEvent !== 'undefined' && nativeError instanceof ProgressEvent;
  }
  getStatus(error) {
    const candidates = [error?.status, error?.error?.status, error?.statusCode, error?.originalError?.status];
    for (const candidate of candidates) {
      const status = Number(candidate);
      if (Number.isFinite(status)) {
        return status;
      }
    }
    return undefined;
  }
  getCode(error) {
    const candidates = [error?.error?.error, error?.error?.code, error?.error, error?.code];
    return candidates.find(candidate => typeof candidate === 'string' && candidate.length > 0);
  }
}
_AuthErrorService = AuthErrorService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthErrorService, "\u0275fac", function AuthErrorService_Factory(t) {
  return new (t || _AuthErrorService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injector));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthErrorService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _AuthErrorService,
  factory: _AuthErrorService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 74048:
/*!*****************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/auth/auth.service.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthService: () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 84288);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 83494);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 27453);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 49224);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 47114);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 2950);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 51097);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs/operators */ 99160);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs/operators */ 72048);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _auth_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth-api.service */ 74081);
/* harmony import */ var _user_user_localstorage_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../user/user-localstorage.service */ 23225);
/* harmony import */ var _billing_billing_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../billing/billing.service */ 58854);
/* harmony import */ var _util_navigation_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/navigation.service */ 22938);
/* harmony import */ var _refresh_token_store_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./refresh-token-store.service */ 25385);
/* harmony import */ var _security_secure_storage_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../security/secure-storage.service */ 18787);
/* harmony import */ var _pending_email_verification_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./pending-email-verification.service */ 72);


var _AuthService;










/** Keys used in SecureStorage for token persistence on native. */
const SS_ACCESS_TOKEN_KEY = 'auth_access_token';
class AuthService {
  constructor(authApiService, userLocalstorageService, billingService, navigationService, refreshTokenStore, secureStorage, pendingEmailVerificationService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "authApiService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "userLocalstorageService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "billingService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "navigationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "refreshTokenStore", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "secureStorage", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "pendingEmailVerificationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_user$", new rxjs__WEBPACK_IMPORTED_MODULE_9__.BehaviorSubject(null));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "EXPIRATION_KEY", 'exp');
    /** In-memory access token — the source of truth for all request signing. */
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "accessToken", null);
    /**
     * Shared in-flight refresh Observable.
     * Reused by every concurrent caller so the API is only hit once.
     */
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "refreshInFlight$", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isLoggingOut", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "impersonating", false);
    this.authApiService = authApiService;
    this.userLocalstorageService = userLocalstorageService;
    this.billingService = billingService;
    this.navigationService = navigationService;
    this.refreshTokenStore = refreshTokenStore;
    this.secureStorage = secureStorage;
    this.pendingEmailVerificationService = pendingEmailVerificationService;
    // Legacy cleanup: never leave tokens in plain localStorage.
    this.userLocalstorageService.removeUserToken();
    localStorage.removeItem('admin_token');
  }
  // ─── Public getters ────────────────────────────────────────────────────────
  get user() {
    return this._user$.value;
  }
  get user$() {
    return this._user$.asObservable();
  }
  set setUser(user) {
    this._user$.next(user);
  }
  get isImpersonating() {
    return this.impersonating;
  }
  /** Returns the current in-memory access token (null when not authenticated). */
  getAccessToken() {
    return this.accessToken;
  }
  // ─── Session validity ──────────────────────────────────────────────────────
  isAuthenticated() {
    return this.isSessionValid();
  }
  isSessionValid() {
    const decoded = this.getDecodedUser({
      access_token: this.accessToken ?? ''
    });
    const exp = decoded?.[this.EXPIRATION_KEY] ?? null;
    return !!exp && exp >= Date.now() / 1000;
  }
  isAccessTokenExpiringSoon(bufferSeconds = 60) {
    const decoded = this.getDecodedUser({
      access_token: this.accessToken ?? ''
    });
    const exp = decoded?.[this.EXPIRATION_KEY] ?? null;
    if (!exp) {
      return true;
    }
    return exp <= Date.now() / 1000 + bufferSeconds;
  }
  hasStoredAccessToken() {
    return !!this.accessToken;
  }
  // ─── JWT helpers ───────────────────────────────────────────────────────────
  getDecodedUser(token) {
    if (!token?.access_token || token.access_token.length <= 0) {
      return undefined;
    }
    let decoded = null;
    try {
      const parts = token.access_token.split('.');
      if (parts.length > 1 && parts[1]) {
        decoded = JSON.parse(this.decodeJwtPayload(parts[1]));
      }
    } catch (error) {
      console.warn('[AUTH] jwt_decode_failed', error);
    }
    return decoded;
  }
  decodeJwtPayload(payload) {
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(payload.length / 4) * 4, '=');
    return atob(normalized);
  }
  // ─── Auth actions ──────────────────────────────────────────────────────────
  login(email, password) {
    return this.authApiService.login(email, password).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.switchMap)(response => this.applyAuthResponse(response)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(() => undefined));
  }
  impersonate(userId) {
    return this.authApiService.impersonate(userId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.switchMap)(response => this.applyAuthResponse(response)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(() => undefined));
  }
  revertImpersonation() {
    return this.authApiService.revertImpersonation().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.switchMap)(response => this.applyAuthResponse(response)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(() => undefined), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.catchError)(error => {
      if (this.isTerminalAuthError(error)) {
        this.logout();
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.throwError)(() => error);
    }));
  }
  revertImpersonationLocally() {
    return;
  }
  restoreSessionSilently() {
    return this.ensureAuthenticated();
  }
  ensureAuthenticated() {
    if (this.isSessionValid()) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.of)(true);
    }
    return this.refreshToken().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(response => !!response?.access_token), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.catchError)(error => {
      if (this.isTerminalAuthError(error) || this.isTransientAuthError(error)) {
        throw error;
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.of)(false);
    }));
  }
  // ─── Error classification ──────────────────────────────────────────────────
  isTransientAuthError(error) {
    return error?.status === 0 || error?.status === 409 || error?.status >= 500 || error?.name === 'TimeoutError';
  }
  isTerminalAuthError(error) {
    const code = error?.code || error?.error?.code;
    return error?.requiresRelogin === true || error?.error?.requiresRelogin === true || ['SESSION_REPLACED', 'REFRESH_INVALID', 'REFRESH_EXPIRED', 'PASSWORD_CHANGED'].includes(code);
  }
  // ─── Token persistence ─────────────────────────────────────────────────────
  /**
   * Persist auth tokens after a successful login or refresh.
   *
   * On native platforms both `access_token` and `refresh_token` are stored
   * in SecureStorage (via the community plugin `capacitor-secure-storage-plugin`).
   * The access token is also kept in-memory for fast synchronous access.
   */
  persistAuthTokens(token) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!token?.access_token) {
        return;
      }
      if (_this.secureStorage.isNativeClient) {
        // Persist access token in SecureStorage for cross-session restore.
        try {
          yield _this.secureStorage.set(SS_ACCESS_TOKEN_KEY, token.access_token);
          console.info('[AUTH] access_token_persisted_secure');
        } catch (error) {
          console.warn('[AUTH] access_token_persist_failed', error);
        }
        // Persist refresh token (delegated to RefreshTokenStoreService).
        if (token.refresh_token) {
          console.info('[AUTH] persist_refresh_token_native');
          yield _this.refreshTokenStore.save(token.refresh_token);
        }
      }
      // Always keep the access token in-memory.
      _this.accessToken = token.access_token;
      const userDecoded = _this.getDecodedUser({
        access_token: token.access_token
      });
      if (userDecoded) {
        _this._user$.next(userDecoded);
        _this.impersonating = !!userDecoded.imp;
        _this.pendingEmailVerificationService.clear();
        console.info('[AUTH] access_token_applied', {
          email: userDecoded.email ?? null,
          impersonating: _this.impersonating
        });
      }
    })();
  }
  /** Build a Token object from a raw API response and persist it. */
  applyAuthResponse(response) {
    const token = {
      access_token: response?.access_token,
      refresh_token: response?.refresh_token,
      expires_in: response?.expires_in,
      token_type: response?.token_type
    };
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.from)(this.persistAuthTokens(token)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(() => {
      if (response?.user) {
        this._user$.next(response.user);
      }
      this.impersonating = !!response?.is_impersonating;
      console.info('[AUTH] auth_response_applied', {
        hasAccessToken: !!response?.access_token,
        hasRefreshToken: !!response?.refresh_token,
        nativeClient: this.secureStorage.isNativeClient,
        impersonating: this.impersonating
      });
    }));
  }
  // ─── Token refresh ─────────────────────────────────────────────────────────
  /**
   * Refresh the access token.
   *
   * Multiple concurrent callers share the same in-flight Observable via
   * `shareReplay(1)` so the network call is made exactly once.
   * On success, tokens are persisted and the shared Observable is cleared.
   * On terminal failure the caller is responsible for triggering logout.
   */
  refreshToken() {
    if (this.refreshInFlight$) {
      return this.refreshInFlight$;
    }
    const refreshRequest$ = this.secureStorage.isNativeClient ? (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.from)(this.refreshTokenStore.get()).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.switchMap)(storedRefreshToken => {
      if (!storedRefreshToken) {
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.throwError)(() => ({
          status: 401,
          code: 'REFRESH_INVALID',
          message: 'No refresh token in secure storage',
          requiresRelogin: true
        }));
      }
      console.info('[AUTH] refresh_with_native_token');
      return this.authApiService.refreshTokenWithHeader(storedRefreshToken);
    })) : this.authApiService.refreshToken();
    this.refreshInFlight$ = refreshRequest$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.switchMap)(response => this.applyAuthResponse(response).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.map)(() => response))), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.catchError)(error => {
      console.error('[AUTH] refresh_failed', {
        status: error?.status,
        code: error?.code ?? error?.error?.code
      });
      // On a terminal error, wipe secure storage so the next boot is clean.
      if (this.isTerminalAuthError(error)) {
        void this.clearSecureTokens();
      }
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.throwError)(() => error);
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_16__.finalize)(() => {
      this.refreshInFlight$ = null;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_17__.shareReplay)(1));
    return this.refreshInFlight$;
  }
  // ─── Social auth ───────────────────────────────────────────────────────────
  verifyGoogle(email, tokenGoogle) {
    return this.authApiService.verifyGoogle(email, tokenGoogle);
  }
  verifyApple(email, tokenApple) {
    return this.authApiService.verifyApple(email, tokenApple);
  }
  // ─── Logout ────────────────────────────────────────────────────────────────
  logout() {
    if (this.isLoggingOut) {
      return;
    }
    this.isLoggingOut = true;
    const nativeRefreshTokenSnapshot = this.secureStorage.isNativeClient ? this.refreshTokenStore.peek() : null;
    // Clear in-memory state immediately.
    this.accessToken = null;
    this.impersonating = false;
    this.userLocalstorageService.removeUserToken();
    localStorage.removeItem('admin_token');
    // Clear SecureStorage asynchronously.
    void this.clearSecureTokens();
    void this.billingService.logOut();
    this._user$.next(null);
    this.navigationService.goToLoginPage();
    const logoutRequest$ = this.secureStorage.isNativeClient ? this.authApiService.logoutWithHeader(nativeRefreshTokenSnapshot ?? undefined) : this.authApiService.logout();
    logoutRequest$.subscribe({
      next: () => {
        this.isLoggingOut = false;
      },
      error: err => {
        console.error('[AUTH] logout_error', err);
        this.isLoggingOut = false;
      }
    });
  }
  // ─── Private helpers ───────────────────────────────────────────────────────
  /** Remove both tokens from SecureStorage. Fire-and-forget safe. */
  clearSecureTokens() {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield Promise.all([_this2.secureStorage.remove(SS_ACCESS_TOKEN_KEY).catch(() => undefined), _this2.refreshTokenStore.clear().catch(() => undefined)]);
      console.info('[AUTH] secure_tokens_cleared');
    })();
  }
}
_AuthService = AuthService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(AuthService, "\u0275fac", function AuthService_Factory(t) {
  return new (t || _AuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵinject"](_auth_api_service__WEBPACK_IMPORTED_MODULE_2__.AuthApiService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵinject"](_user_user_localstorage_service__WEBPACK_IMPORTED_MODULE_3__.UserLocalstorageService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵinject"](_billing_billing_service__WEBPACK_IMPORTED_MODULE_4__.BillingService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵinject"](_util_navigation_service__WEBPACK_IMPORTED_MODULE_5__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵinject"](_refresh_token_store_service__WEBPACK_IMPORTED_MODULE_6__.RefreshTokenStoreService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵinject"](_security_secure_storage_service__WEBPACK_IMPORTED_MODULE_7__.SecureStorageService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵinject"](_pending_email_verification_service__WEBPACK_IMPORTED_MODULE_8__.PendingEmailVerificationService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(AuthService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineInjectable"]({
  token: _AuthService,
  factory: _AuthService.ɵfac
}));


/***/ }),

/***/ 55334:
/*!************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/auth/google-auth.service.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GoogleAuthService: () => (/* binding */ GoogleAuthService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _capgo_capacitor_social_login__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capgo/capacitor-social-login */ 76948);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 45398);


var _GoogleAuthService;



class GoogleAuthService {
  constructor(_platform) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_platform", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "WEB_CLIENT_ID", '775987417074-s1e767h7tps05ectmrb85uqh7hhp9p8n.apps.googleusercontent.com');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "IOS_CLIENT_ID", '775987417074-ibu27rm1ku8uuunaacebmp14ahvuuk4u.apps.googleusercontent.com');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "initialized", false);
    this._platform = _platform;
    // No inicializamos automáticamente en el constructor para evitar carreras
    // La inicialización se hará bajo demanda en el signIn
  }

  initialize() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.initialized) return;
      try {
        const config = {
          google: {
            webClientId: _this.WEB_CLIENT_ID
          }
        };
        if (_this._platform.is('ios')) {
          config.google.iOSClientId = _this.IOS_CLIENT_ID;
          config.apple = {
            clientId: 'com.trainfit.trainfit'
          };
        }
        console.log('Inicializando SocialLogin con config:', config);
        yield _capgo_capacitor_social_login__WEBPACK_IMPORTED_MODULE_2__.SocialLogin.initialize(config);
        _this.initialized = true;
      } catch (error) {
        console.error('Error inicializando Google Auth:', error);
      }
    })();
  }
  signIn() {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this2.initialized) {
        yield _this2.initialize();
      }
      console.log('Ejecutando SocialLogin.login para google...');
      try {
        // Intentar logout previo para forzar el selector de cuentas
        yield _capgo_capacitor_social_login__WEBPACK_IMPORTED_MODULE_2__.SocialLogin.logout({
          provider: 'google'
        });
      } catch (e) {
        // Ignoramos error si no estaba logueado
        console.log('No había sesión previa de Google para cerrar o error en logout', e);
      }
      const response = yield _capgo_capacitor_social_login__WEBPACK_IMPORTED_MODULE_2__.SocialLogin.login({
        provider: 'google',
        options: {}
      });
      console.log('Respuesta de SocialLogin.login google:', response);
      return response;
    })();
  }
}
_GoogleAuthService = GoogleAuthService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(GoogleAuthService, "\u0275fac", function GoogleAuthService_Factory(t) {
  return new (t || _GoogleAuthService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_4__.Platform));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(GoogleAuthService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _GoogleAuthService,
  factory: _GoogleAuthService.ɵfac
}));


/***/ }),

/***/ 72:
/*!***************************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/auth/pending-email-verification.service.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PendingEmailVerificationService: () => (/* binding */ PendingEmailVerificationService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 69717);

var _PendingEmailVerificationService;

class PendingEmailVerificationService {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "STORAGE_KEY", "trainfit.pendingEmailVerification");
  }
  start(email) {
    const normalizedEmail = this.normalizeEmail(email);
    if (!normalizedEmail) {
      return null;
    }
    const now = new Date().toISOString();
    const state = {
      flow: "email-verification",
      email: normalizedEmail,
      createdAt: now,
      codeSentAt: now
    };
    this.save(state);
    return state;
  }
  markCodeSent(email) {
    const existing = this.get();
    const normalizedEmail = this.normalizeEmail(email ?? existing?.email ?? "");
    if (!normalizedEmail) {
      return null;
    }
    const state = {
      flow: "email-verification",
      email: normalizedEmail,
      createdAt: existing?.createdAt ?? new Date().toISOString(),
      codeSentAt: new Date().toISOString()
    };
    this.save(state);
    return state;
  }
  get() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      if (!raw) {
        return null;
      }
      const parsed = JSON.parse(raw);
      if (!this.isValidState(parsed)) {
        this.clear();
        return null;
      }
      return {
        flow: "email-verification",
        email: this.normalizeEmail(parsed.email),
        createdAt: parsed.createdAt,
        codeSentAt: parsed.codeSentAt
      };
    } catch {
      this.clear();
      return null;
    }
  }
  hasPendingVerification() {
    return !!this.get();
  }
  clear() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.warn("[AUTH] pending_email_verification_clear_failed", error);
    }
  }
  save(state) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.warn("[AUTH] pending_email_verification_save_failed", error);
    }
  }
  isValidState(state) {
    return state?.flow === "email-verification" && !!this.normalizeEmail(state.email) && this.isValidDate(state.createdAt) && this.isValidDate(state.codeSentAt);
  }
  isValidDate(value) {
    return !!value && !Number.isNaN(new Date(value).getTime());
  }
  normalizeEmail(email) {
    return typeof email === "string" ? email.trim().toLowerCase() : "";
  }
}
_PendingEmailVerificationService = PendingEmailVerificationService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(PendingEmailVerificationService, "\u0275fac", function PendingEmailVerificationService_Factory(t) {
  return new (t || _PendingEmailVerificationService)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(PendingEmailVerificationService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _PendingEmailVerificationService,
  factory: _PendingEmailVerificationService.ɵfac,
  providedIn: "root"
}));


/***/ }),

/***/ 25385:
/*!********************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/auth/refresh-token-store.service.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RefreshTokenStoreService: () => (/* binding */ RefreshTokenStoreService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _security_secure_storage_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../security/secure-storage.service */ 18787);


var _RefreshTokenStoreService;


/**
 * RefreshTokenStoreService
 *
 * Manages secure persistence of the refresh token on native platforms via
 * `SecureStorageService` (backed by `capacitor-secure-storage-plugin`,
 * the free community plugin).
 *
 * Keeps an in-memory cache so that header-based logout/refresh retries can
 * read the token synchronously via `peek()` without an async round-trip.
 */
class RefreshTokenStoreService {
  constructor(secureStorage) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "secureStorage", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "cachedRefreshToken", null);
    this.secureStorage = secureStorage;
    if (this.isNativeClient) {
      // Warm up the in-memory cache at boot so peek() is ready immediately.
      this.get().catch(() => undefined);
    }
  }
  /** True when running on a native Capacitor platform (iOS / Android). */
  get isNativeClient() {
    return this.secureStorage.isNativeClient;
  }
  /**
   * Synchronous peek at the cached refresh token.
   * Use only where async is not possible (e.g. building logout headers).
   */
  peek() {
    return this.cachedRefreshToken;
  }
  /**
   * Persist `refreshToken` in secure storage and update the in-memory cache.
   * Passing `null` / `undefined` delegates to `clear()`.
   */
  save(refreshToken) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this.isNativeClient) {
        return;
      }
      if (!refreshToken) {
        yield _this.clear();
        return;
      }
      _this.cachedRefreshToken = refreshToken;
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          yield _this.secureStorage.set(RefreshTokenStoreService.REFRESH_TOKEN_KEY, refreshToken);
          console.info('[AUTH] refresh_token_saved', {
            attempt: attempt + 1
          });
          return;
        } catch (error) {
          if (attempt === 0) {
            console.warn('[AUTH] refresh_token_save_retry', {
              reason: error?.message ?? String(error)
            });
            yield _this.delay(150);
            continue;
          }
          console.error('[AUTH] refresh_token_save_failed', error);
          throw {
            status: 0,
            message: 'Secure storage write failed',
            transientAuthStorage: true,
            error
          };
        }
      }
    })();
  }
  /**
   * Read the refresh token from secure storage.
   * Returns `null` if the key does not exist.
   */
  get() {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this2.isNativeClient) {
        return null;
      }
      if (_this2.cachedRefreshToken) {
        return _this2.cachedRefreshToken;
      }
      for (let attempt = 0; attempt < 2; attempt++) {
        try {
          const value = yield _this2.secureStorage.get(RefreshTokenStoreService.REFRESH_TOKEN_KEY);
          _this2.cachedRefreshToken = value;
          console.info('[AUTH] refresh_token_loaded', {
            found: !!value,
            attempt: attempt + 1
          });
          return value;
        } catch (error) {
          if (attempt === 0) {
            console.warn('[AUTH] refresh_token_load_retry', {
              reason: error?.message ?? String(error)
            });
            yield _this2.delay(150);
            continue;
          }
          console.error('[AUTH] refresh_token_load_failed', error);
          throw {
            status: 0,
            message: 'Secure storage read failed',
            transientAuthStorage: true,
            error
          };
        }
      }
      return null;
    })();
  }
  /**
   * Wipe the refresh token from secure storage and clear the in-memory cache.
   */
  clear() {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this3.cachedRefreshToken = null;
      if (!_this3.isNativeClient) {
        return;
      }
      yield _this3.secureStorage.remove(RefreshTokenStoreService.REFRESH_TOKEN_KEY);
      console.info('[AUTH] refresh_token_cleared');
    })();
  }
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
_RefreshTokenStoreService = RefreshTokenStoreService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RefreshTokenStoreService, "REFRESH_TOKEN_KEY", 'auth_refresh_token');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RefreshTokenStoreService, "\u0275fac", function RefreshTokenStoreService_Factory(t) {
  return new (t || _RefreshTokenStoreService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_security_secure_storage_service__WEBPACK_IMPORTED_MODULE_2__.SecureStorageService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RefreshTokenStoreService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _RefreshTokenStoreService,
  factory: _RefreshTokenStoreService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 61335:
/*!***************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/billing/billing-api.service.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BillingApiService: () => (/* binding */ BillingApiService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _BillingApiService;


class BillingApiService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  linkCustomer(appUserId) {
    return this.http.post(`${BillingApiService.BILLING_ENDPOINT}/customer/link`, {
      appUserId
    });
  }
  getEntitlementsMe() {
    return this.http.get(`${BillingApiService.BILLING_ENDPOINT}/entitlements/me`);
  }
  restore(payload) {
    return this.http.post(`${BillingApiService.BILLING_ENDPOINT}/restore`, payload || {});
  }
  grantPremium(userId, duration) {
    return this.http.post(`${BillingApiService.BILLING_ENDPOINT}/admin/grant`, {
      userId,
      duration
    });
  }
  extendPremium(userId, duration) {
    return this.http.post(`${BillingApiService.BILLING_ENDPOINT}/admin/extend`, {
      userId,
      duration
    });
  }
  revokePremium(userId) {
    return this.http.post(`${BillingApiService.BILLING_ENDPOINT}/admin/revoke`, {
      userId
    });
  }
  getUserSubscriptionStatus(userId) {
    return this.http.get(`${BillingApiService.BILLING_ENDPOINT}/admin/status/${userId}`);
  }
}
_BillingApiService = BillingApiService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(BillingApiService, "BILLING_ENDPOINT", 'billing');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(BillingApiService, "\u0275fac", function BillingApiService_Factory(t) {
  return new (t || _BillingApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(BillingApiService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _BillingApiService,
  factory: _BillingApiService.ɵfac
}));


/***/ }),

/***/ 58854:
/*!***********************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/billing/billing.service.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BillingService: () => (/* binding */ BillingService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ 44599);
/* harmony import */ var _capacitor_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/browser */ 90660);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 99295);
/* harmony import */ var _revenuecat_purchases_capacitor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @revenuecat/purchases-capacitor */ 1447);
/* harmony import */ var _revenuecat_purchases_capacitor_ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @revenuecat/purchases-capacitor-ui */ 58536);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/environments/environment */ 17762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _billing_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./billing-api.service */ 61335);
/* harmony import */ var _user_user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../user/user.service */ 66802);


var _BillingService;










class BillingService {
  get translate() {
    if (!this._translate) {
      this._translate = this.injector.get(_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslateService);
    }
    return this._translate;
  }
  constructor(injector, billingApiService, userService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "injector", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "billingApiService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "userService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isNativeClient", _capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.isNativePlatform());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "platform", _capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.getPlatform());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "initializePromise", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "configured", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "cachedEntitlements", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "customerInfoListenerId", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_translate", null);
    this.injector = injector;
    this.billingApiService = billingApiService;
    this.userService = userService;
  }
  get isBillingEnabled() {
    return this.isNativeClient && src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.revenueCat.enabled;
  }
  get entitlementId() {
    return src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.revenueCat.entitlementId;
  }
  initialize() {
    if (this.initializePromise) {
      return this.initializePromise;
    }
    if (!this.isNativeClient) {
      this.initializePromise = Promise.resolve();
      return this.initializePromise;
    }
    this.initializePromise = this.doInitialize();
    return this.initializePromise;
  }
  logIn(appUserId) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.initialize();
      if (!_this.configured) {
        return false;
      }
      const normalizedUserId = appUserId?.trim();
      if (!normalizedUserId) {
        return false;
      }
      try {
        const {
          appUserID: currentAppUserId
        } = yield _revenuecat_purchases_capacitor__WEBPACK_IMPORTED_MODULE_4__.Purchases.getAppUserID();
        if (currentAppUserId !== normalizedUserId) {
          yield _revenuecat_purchases_capacitor__WEBPACK_IMPORTED_MODULE_4__.Purchases.logIn({
            appUserID: normalizedUserId
          });
        }
        yield _this.syncSubscriberAttributes();
        yield _this.linkCustomerInBackend(normalizedUserId);
        yield _this.getBackendEntitlements();
        return true;
      } catch (error) {
        console.warn('RevenueCat logIn error', error);
        return false;
      }
    })();
  }
  logOut() {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this2.initialize();
      if (!_this2.configured) {
        return;
      }
      try {
        yield _revenuecat_purchases_capacitor__WEBPACK_IMPORTED_MODULE_4__.Purchases.logOut();
        _this2.cachedEntitlements = null;
      } catch (error) {
        console.warn('RevenueCat logOut error', error);
      }
    })();
  }
  getOfferings() {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this3.initialize();
      if (!_this3.configured) {
        return null;
      }
      try {
        return yield _revenuecat_purchases_capacitor__WEBPACK_IMPORTED_MODULE_4__.Purchases.getOfferings();
      } catch (error) {
        console.error('RevenueCat getOfferings error', error);
        return null;
      }
    })();
  }
  getCurrentOffering() {
    var _this4 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const offerings = yield _this4.getOfferings();
      if (offerings?.current) {
        return offerings.current;
      }
      const fallbackOfferings = Object.values(offerings?.all || {});
      const firstUsableOffering = fallbackOfferings.find(offering => offering?.monthly || offering?.annual) || fallbackOfferings[0] || null;
      if (firstUsableOffering) {
        console.warn('RevenueCat current offering missing. Using fallback offering:', firstUsableOffering.identifier);
      }
      return firstUsableOffering;
    })();
  }
  purchasePackage(selectedPackage, googleProductChangeInfo) {
    var _this5 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this5.initialize();
      if (!_this5.configured || !selectedPackage) {
        return {
          customerInfo: null,
          error: {
            userCancelled: false,
            code: 'NOT_CONFIGURED_OR_INVALID_PACKAGE',
            message: _this5.translate.instant('BILLING.INVALID_PACKAGE')
          },
          usedGoogleProductChangeInfo: Boolean(googleProductChangeInfo),
          usedFallbackWithoutGoogleProductChangeInfo: false
        };
      }
      try {
        const result = yield _revenuecat_purchases_capacitor__WEBPACK_IMPORTED_MODULE_4__.Purchases.purchasePackage({
          aPackage: selectedPackage,
          googleProductChangeInfo: googleProductChangeInfo || null
        });
        return {
          customerInfo: result?.customerInfo || null,
          error: null,
          usedGoogleProductChangeInfo: Boolean(googleProductChangeInfo),
          usedFallbackWithoutGoogleProductChangeInfo: false
        };
      } catch (error) {
        const mappedError = _this5.mapPurchaseError(error);
        console.error('RevenueCat purchasePackage error', mappedError.code, mappedError.message, error);
        return {
          customerInfo: null,
          error: mappedError,
          usedGoogleProductChangeInfo: Boolean(googleProductChangeInfo),
          usedFallbackWithoutGoogleProductChangeInfo: false
        };
      }
    })();
  }
  purchaseSubscriptionOption(subscriptionOption, googleProductChangeInfo) {
    var _this6 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this6.initialize();
      if (!_this6.configured || !subscriptionOption) {
        return {
          customerInfo: null,
          error: {
            userCancelled: false,
            code: 'NOT_CONFIGURED_OR_INVALID_SUBSCRIPTION_OPTION',
            message: _this6.translate.instant('BILLING.INVALID_SUBSCRIPTION')
          },
          usedGoogleProductChangeInfo: Boolean(googleProductChangeInfo),
          usedFallbackWithoutGoogleProductChangeInfo: false
        };
      }
      try {
        const result = yield _revenuecat_purchases_capacitor__WEBPACK_IMPORTED_MODULE_4__.Purchases.purchaseSubscriptionOption({
          subscriptionOption,
          googleProductChangeInfo: googleProductChangeInfo || null
        });
        return {
          customerInfo: result?.customerInfo || null,
          error: null,
          usedGoogleProductChangeInfo: Boolean(googleProductChangeInfo),
          usedFallbackWithoutGoogleProductChangeInfo: false
        };
      } catch (error) {
        const mappedError = _this6.mapPurchaseError(error);
        console.error('RevenueCat purchaseSubscriptionOption error', mappedError.code, mappedError.message, error);
        return {
          customerInfo: null,
          error: mappedError,
          usedGoogleProductChangeInfo: Boolean(googleProductChangeInfo),
          usedFallbackWithoutGoogleProductChangeInfo: false
        };
      }
    })();
  }
  restorePurchases() {
    var _this7 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this7.initialize();
      if (!_this7.configured) {
        return null;
      }
      try {
        const {
          customerInfo
        } = yield _revenuecat_purchases_capacitor__WEBPACK_IMPORTED_MODULE_4__.Purchases.restorePurchases();
        return customerInfo;
      } catch (error) {
        console.error('RevenueCat restorePurchases error', error);
        return null;
      }
    })();
  }
  getCustomerInfo() {
    var _this8 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this8.initialize();
      if (!_this8.configured) {
        return null;
      }
      try {
        const {
          customerInfo
        } = yield _revenuecat_purchases_capacitor__WEBPACK_IMPORTED_MODULE_4__.Purchases.getCustomerInfo();
        return customerInfo;
      } catch (error) {
        console.error('RevenueCat getCustomerInfo error', error);
        return null;
      }
    })();
  }
  purchasePlan(_x) {
    var _this9 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (plan, intent = 'activate') {
      const currentOffering = yield _this9.getCurrentOffering();
      if (!currentOffering) {
        return {
          customerInfo: null,
          error: {
            userCancelled: false,
            code: 'NO_OFFERING',
            message: _this9.translate.instant('BILLING.NO_OFFERING')
          },
          usedGoogleProductChangeInfo: false,
          usedFallbackWithoutGoogleProductChangeInfo: false
        };
      }
      const selectedPackage = plan === 'monthly' ? currentOffering.monthly : currentOffering.annual;
      if (!selectedPackage) {
        return {
          customerInfo: null,
          error: {
            userCancelled: false,
            code: 'PACKAGE_NOT_AVAILABLE',
            message: _this9.translate.instant('BILLING.PACKAGE_NOT_AVAILABLE', {
              plan
            })
          },
          usedGoogleProductChangeInfo: false,
          usedFallbackWithoutGoogleProductChangeInfo: false
        };
      }
      let googleProductChangeInfo = null;
      // Fix: forzar customerInfo fresco para obtener el purchaseToken actualizado
      const currentCustomerInfo = yield _this9.getFreshCustomerInfo();
      const currentProductIdentifier = _this9.resolveCurrentSubscriptionProductId(currentCustomerInfo);
      const selectedProductIdentifier = selectedPackage.product?.identifier;
      // C1: detectar cambio de base plan cuando el producto es el mismo (modelo Google Play
      // con base plans: 'trainfit_pro' monthly y 'trainfit_pro' annual tienen el mismo identifier)
      const cachedCurrentPlan = _this9.cachedEntitlements?.plan ?? null;
      const isBasePlanChange = currentProductIdentifier === selectedProductIdentifier && Boolean(currentProductIdentifier) && (cachedCurrentPlan === 'monthly' || cachedCurrentPlan === 'annual') && cachedCurrentPlan !== plan;
      const shouldForcePlanChangeByStoreState = _this9.platform === 'android' && intent === 'activate' && Boolean(currentProductIdentifier) && Boolean(selectedProductIdentifier) && (currentProductIdentifier !== selectedProductIdentifier || isBasePlanChange);
      const effectiveIntent = shouldForcePlanChangeByStoreState ? 'change_plan' : intent;
      const shouldTreatAsPlanChange = _this9.platform === 'android' && effectiveIntent === 'change_plan' && Boolean(currentProductIdentifier) && Boolean(selectedProductIdentifier) && (currentProductIdentifier !== selectedProductIdentifier || isBasePlanChange);
      if (_this9.platform === 'android' && effectiveIntent === 'change_plan' && !currentProductIdentifier) {
        return {
          customerInfo: null,
          error: {
            userCancelled: false,
            code: 'CHANGE_PLAN_NO_ACTIVE_SUBSCRIPTION',
            message: _this9.translate.instant('BILLING.NO_ACTIVE_SUBSCRIPTION')
          },
          usedGoogleProductChangeInfo: false,
          usedFallbackWithoutGoogleProductChangeInfo: false
        };
      }
      if (shouldTreatAsPlanChange) {
        const isDowngrade = _this9.isPlanDowngrade(currentProductIdentifier, plan);
        if (isDowngrade) {
          return {
            customerInfo: null,
            error: {
              userCancelled: false,
              code: 'DOWNGRADE_MANAGED_IN_STORE',
              message: _this9.translate.instant('BILLING.DOWNGRADE_MANAGED_IN_STORE')
            },
            usedGoogleProductChangeInfo: false,
            usedFallbackWithoutGoogleProductChangeInfo: false
          };
        }
        // Google Play base plans (mismo producto, distinto base plan):
        // - IMMEDIATE_WITH_TIME_PRORATION no está soportado → Google devuelve error
        // - Upgrade (mensual → anual): IMMEDIATE_AND_CHARGE_FULL_PRICE
        // - Downgrade (anual → mensual): DEFERRED — el cambio aplica al siguiente período de renovación.
        //   En sandbox puede fallar (comportamiento inconsistente con ciclos cortos).
        //   En producción funciona correctamente: el usuario mantiene el plan anual hasta que vence
        //   y en la siguiente renovación se cobra el mensual. Sin reembolso.
        // oldProductIdentifier debe ser el identificador COMPLETO con base plan
        const prorationMode = _revenuecat_purchases_capacitor__WEBPACK_IMPORTED_MODULE_4__.PRORATION_MODE.IMMEDIATE_AND_CHARGE_FULL_PRICE;
        googleProductChangeInfo = {
          oldProductIdentifier: currentProductIdentifier,
          prorationMode
        };
      }
      console.info('[Billing] purchasePlan attempt', {
        platform: _this9.platform,
        requestedPlan: plan,
        intent,
        effectiveIntent,
        currentProductIdentifier,
        selectedProductIdentifier,
        oldProductIdForChange: googleProductChangeInfo?.oldProductIdentifier ?? null,
        usingGoogleProductChangeInfo: Boolean(googleProductChangeInfo),
        prorationMode: googleProductChangeInfo?.prorationMode ?? null
      });
      if (_this9.platform === 'android' && selectedPackage.product?.defaultOption) {
        return _this9.purchaseSubscriptionOption(selectedPackage.product.defaultOption, googleProductChangeInfo);
      }
      return _this9.purchasePackage(selectedPackage, googleProductChangeInfo);
    }).apply(this, arguments);
  }
  presentPaywallIfNeeded() {
    var _this0 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (requiredEntitlementIdentifier = src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.revenueCat.entitlementId) {
      yield _this0.initialize();
      if (!_this0.configured || !requiredEntitlementIdentifier) {
        return null;
      }
      try {
        const result = yield _revenuecat_purchases_capacitor_ui__WEBPACK_IMPORTED_MODULE_5__.RevenueCatUI.presentPaywallIfNeeded({
          requiredEntitlementIdentifier
        });
        return result?.result || null;
      } catch (error) {
        console.error('RevenueCat presentPaywallIfNeeded error', error);
        return null;
      }
    }).apply(this, arguments);
  }
  openNativeManageSubscriptions() {
    var _this1 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        if (_this1.platform === 'android') {
          yield _capacitor_browser__WEBPACK_IMPORTED_MODULE_3__.Browser.open({
            url: 'https://play.google.com/store/account/subscriptions?package=com.trainfit.trainfit&sku=trainfit_pro'
          });
          return true;
        }
        if (_this1.platform === 'ios') {
          window.open('itms-apps://apps.apple.com/account/subscriptions', '_system');
          return true;
        }
        return false;
      } catch (error) {
        console.error('Open native manage subscriptions error', error);
        return false;
      }
    })();
  }
  getBackendEntitlements() {
    var _this10 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const entitlements = yield _this10.refreshBackendEntitlements();
      return entitlements ?? _this10.cachedEntitlements;
    })();
  }
  refreshBackendEntitlements() {
    var _this11 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const entitlements = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.firstValueFrom)(_this11.billingApiService.getEntitlementsMe());
        _this11.cachedEntitlements = entitlements;
        _this11.applyPremiumToLocalUser(entitlements);
        return entitlements;
      } catch (error) {
        console.error('Billing getBackendEntitlements error', error);
        return null;
      }
    })();
  }
  isFreshLimitReached(limit) {
    var _this12 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const cachedRemaining = _this12.cachedEntitlements?.remaining?.[limit];
      if (cachedRemaining === null || cachedRemaining === undefined || cachedRemaining > 0) {
        return false;
      }
      const freshEntitlements = yield _this12.refreshBackendEntitlements();
      const freshRemaining = freshEntitlements?.remaining?.[limit];
      return freshRemaining !== null && freshRemaining !== undefined && freshRemaining <= 0;
    })();
  }
  syncEntitlementsWithBackend(customerInfo, plan) {
    var _this13 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const appUserId = _this13.userService.getLocalUser?._id || null;
      try {
        const entitlements = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.firstValueFrom)(_this13.billingApiService.restore({
          appUserId: appUserId || undefined,
          customerInfo: customerInfo || undefined,
          plan: plan || undefined
        }));
        _this13.cachedEntitlements = entitlements;
        _this13.applyPremiumToLocalUser(entitlements);
        return entitlements;
      } catch (error) {
        console.error('Billing syncEntitlementsWithBackend error', error);
        return null;
      }
    })();
  }
  getCachedEntitlements() {
    return this.cachedEntitlements;
  }
  hasActiveEntitlement(customerInfo, entitlementId = src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.revenueCat.entitlementId) {
    if (!customerInfo || !entitlementId) {
      return false;
    }
    return !!customerInfo.entitlements?.active?.[entitlementId];
  }
  doInitialize() {
    var _this14 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const apiKey = _this14.getApiKeyForPlatform();
      if (!apiKey) {
        console.warn('RevenueCat disabled: missing api key or unsupported platform.');
        return;
      }
      try {
        if (!src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.production) {
          yield _revenuecat_purchases_capacitor__WEBPACK_IMPORTED_MODULE_4__.Purchases.setLogLevel({
            level: _revenuecat_purchases_capacitor__WEBPACK_IMPORTED_MODULE_4__.LOG_LEVEL.DEBUG
          });
        }
        yield _revenuecat_purchases_capacitor__WEBPACK_IMPORTED_MODULE_4__.Purchases.configure({
          apiKey
        });
        _this14.configured = true;
        _this14.registerCustomerInfoUpdateListener();
        const localUserId = _this14.userService.getLocalUser?._id;
        if (localUserId) {
          yield _this14.syncSubscriberAttributes();
          yield _this14.linkCustomerInBackend(localUserId);
        }
      } catch (error) {
        _this14.configured = false;
        console.error('RevenueCat configure error', error);
      }
    })();
  }
  /**
   * Escucha los cambios de entitlement que RevenueCat empuja al SDK (expiración,
   * renovación, fallo de cobro, cancelación reflejada, etc.) sin depender de que
   * el usuario visite una pantalla concreta o vuelva de background. Cada vez que
   * llega un CustomerInfo nuevo, se manda al backend para forzar una
   * reconciliación real (equivalente a lo que hoy solo dispara "Restaurar compras").
   */
  registerCustomerInfoUpdateListener() {
    if (this.customerInfoListenerId) return;
    _revenuecat_purchases_capacitor__WEBPACK_IMPORTED_MODULE_4__.Purchases.addCustomerInfoUpdateListener(customerInfo => {
      void this.syncEntitlementsWithBackend(customerInfo);
    }).then(listenerId => {
      this.customerInfoListenerId = listenerId;
    }).catch(error => {
      console.warn('RevenueCat addCustomerInfoUpdateListener error', error);
    });
  }
  syncSubscriberAttributes() {
    var _this15 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const email = _this15.userService.getLocalUser?.email;
      if (email && _this15.isNativeClient && _this15.configured) {
        try {
          yield _revenuecat_purchases_capacitor__WEBPACK_IMPORTED_MODULE_4__.Purchases.setEmail({
            email
          });
        } catch (error) {
          console.warn('RevenueCat syncSubscriberAttributes error', error);
        }
      }
    })();
  }
  linkCustomerInBackend(appUserId) {
    var _this16 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!appUserId) return;
      try {
        yield (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.firstValueFrom)(_this16.billingApiService.linkCustomer(appUserId));
      } catch (error) {
        console.warn('Billing linkCustomerInBackend error', error);
      }
    })();
  }
  applyPremiumToLocalUser(entitlements) {
    if (!entitlements) return;
    const localUser = this.userService.getLocalUser;
    if (!localUser) return;
    const updatedUser = {
      ...localUser,
      premium: {
        entitled: !!entitlements.isPremium,
        plan: entitlements.plan,
        expiresAt: entitlements.expiresAt,
        source: entitlements.source,
        lastSyncAt: new Date().toISOString()
      }
    };
    this.userService.setLocalUser = updatedUser;
  }
  resolveCurrentSubscriptionProductId(customerInfo) {
    if (!customerInfo) {
      return null;
    }
    const entitlementProductId = customerInfo.entitlements?.active?.[this.entitlementId]?.productIdentifier || null;
    const activeSubscriptions = customerInfo.activeSubscriptions || [];
    return entitlementProductId || activeSubscriptions[0] || null;
  }
  /** Invalida la caché de RevenueCat y obtiene customerInfo actualizado desde los servidores */
  getFreshCustomerInfo() {
    var _this17 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this17.initialize();
      if (!_this17.configured) {
        return null;
      }
      try {
        yield _revenuecat_purchases_capacitor__WEBPACK_IMPORTED_MODULE_4__.Purchases.invalidateCustomerInfoCache();
      } catch {
        // invalidateCustomerInfoCache puede no estar disponible en todas las versiones — continuar igualmente
      }
      return _this17.getCustomerInfo();
    })();
  }
  /**
   * I1: resuelve el plan ('monthly' | 'annual') a partir de un CustomerInfo comparando
   * el productId activo contra los identificadores reales del offering actual.
   * Útil cuando el product ID no incluye el sufijo de plan ('trainfit_pro' + base plans).
   */
  resolvePlanFromCustomerInfo(customerInfo) {
    var _this18 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!customerInfo) return null;
      const currentProductId = _this18.resolveCurrentSubscriptionProductId(customerInfo);
      if (!currentProductId) return null;
      // Primer intento: sufijo en el product ID (funciona con trainfit_pro_monthly/annual)
      const id = currentProductId.toLowerCase();
      if (id.includes('annual') || id.includes('anual') || id.includes('year')) {
        return 'annual';
      }
      if (id.includes('month') || id.includes('mensual')) {
        return 'monthly';
      }
      // Segundo intento: comparar contra los identifiers del offering actual
      // (funciona con base plans donde ambos paquetes tienen el mismo product ID)
      const offering = yield _this18.getCurrentOffering();
      if (!offering) return null;
      const monthlyId = offering.monthly?.product?.identifier ?? null;
      const annualId = offering.annual?.product?.identifier ?? null;
      // Solo útil si monthly y annual tienen identifiers distintos
      if (monthlyId && annualId && monthlyId !== annualId) {
        if (currentProductId === annualId) return 'annual';
        if (currentProductId === monthlyId) return 'monthly';
      }
      return null;
    })();
  }
  /** Determina si el cambio de plan es un downgrade (anual → mensual) */
  isPlanDowngrade(currentProductIdentifier, targetPlan) {
    if (!currentProductIdentifier) {
      return false;
    }
    // Primer intento: sufijo en el product ID (trainfit_pro_annual, trainfit_pro_yearly…)
    const currentIsAnnual = currentProductIdentifier.toLowerCase().includes('annual') || currentProductIdentifier.toLowerCase().includes('anual') || currentProductIdentifier.toLowerCase().includes('year');
    if (currentIsAnnual) {
      return targetPlan === 'monthly';
    }
    // C1 fallback: si el product ID no tiene sufijo (base plan model: 'trainfit_pro'),
    // usar el plan almacenado en el backend como fuente de verdad
    const cachedPlan = this.cachedEntitlements?.plan;
    if (cachedPlan === 'annual' && targetPlan === 'monthly') {
      return true;
    }
    return false;
  }
  mapPurchaseError(error) {
    const errorCode = String(error?.code || error?.rcCode || '').toUpperCase();
    const userCancelled = Boolean(error?.userCancelled || errorCode === 'PURCHASE_CANCELLED' || errorCode === 'PURCHASE_CANCELLED_ERROR' || errorCode === 'USER_CANCELED');
    const code = String(error?.code || error?.rcCode || 'PURCHASE_ERROR');
    const message = String(error?.message || error?.readableErrorCode || this.translate.instant('BILLING.PURCHASE_ERROR'));
    return {
      userCancelled,
      code,
      message
    };
  }
  getApiKeyForPlatform() {
    if (!src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.revenueCat.enabled) {
      return '';
    }
    if (this.platform === 'android') {
      return src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.revenueCat.androidApiKey;
    }
    if (this.platform === 'ios') {
      return src_environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.revenueCat.iosApiKey;
    }
    return '';
  }
}
_BillingService = BillingService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(BillingService, "\u0275fac", function BillingService_Factory(t) {
  return new (t || _BillingService)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_11__.Injector), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_billing_api_service__WEBPACK_IMPORTED_MODULE_7__.BillingApiService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵinject"](_user_user_service__WEBPACK_IMPORTED_MODULE_8__.UserService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(BillingService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjectable"]({
  token: _BillingService,
  factory: _BillingService.ɵfac
}));


/***/ }),

/***/ 94887:
/*!*******************************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/custom-exercise/custom-exercise-api.service.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomExerciseAPIService: () => (/* binding */ CustomExerciseAPIService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 65821);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _CustomExerciseAPIService;



class CustomExerciseAPIService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  updateCustomExercise(customExercise, setsToCreate, setsToUpdate, setsToDelete) {
    return this.http.put(`${CustomExerciseAPIService.CUSTOM_EXERCISE_ENDPOINT}`, {
      customExercise,
      setsToCreate,
      setsToUpdate,
      setsToDelete
    });
  }
  copySetOnCustomExercise(order, set) {
    return this.http.put(`${CustomExerciseAPIService.CUSTOM_EXERCISE_ENDPOINT}/copy/${order}`, set);
  }
  addSetToCustomExercise(id, set) {
    return this.http.put(`${CustomExerciseAPIService.CUSTOM_EXERCISE_ENDPOINT}/${id}`, set);
  }
  // Rediseño de entrenamiento Fase B — asigna/quita el blockId de un
  // CustomExercise (null para dejarlo suelto, sin agrupar).
  setCustomExerciseBlock(id, blockId) {
    return this.http.put(`${CustomExerciseAPIService.CUSTOM_EXERCISE_ENDPOINT}/${id}/block`, {
      blockId
    });
  }
  deleteCustomExercise(id) {
    return this.http.delete(`${CustomExerciseAPIService.CUSTOM_EXERCISE_ENDPOINT}/${id}`);
  }
  deleteCustomExercises(exercisesIds) {
    return this.http.post(`${CustomExerciseAPIService.CUSTOM_EXERCISE_ENDPOINT}/delete/multiple`, exercisesIds).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
}
_CustomExerciseAPIService = CustomExerciseAPIService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CustomExerciseAPIService, "CUSTOM_EXERCISE_ENDPOINT", 'customexercises');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CustomExerciseAPIService, "\u0275fac", function CustomExerciseAPIService_Factory(t) {
  return new (t || _CustomExerciseAPIService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CustomExerciseAPIService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _CustomExerciseAPIService,
  factory: _CustomExerciseAPIService.ɵfac
}));


/***/ }),

/***/ 33014:
/*!***************************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/custom-exercise/custom-exercise.service.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomExerciseService: () => (/* binding */ CustomExerciseService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 65821);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _custom_exercise_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-exercise-api.service */ 94887);

var _CustomExerciseService;



class CustomExerciseService {
  constructor(customExerciseAPIService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "customExerciseAPIService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "customExerciseClipboard", void 0);
    this.customExerciseAPIService = customExerciseAPIService;
  }
  get getCustomExerciseClipboard() {
    return this.customExerciseClipboard;
  }
  set setCustomExerciseClipboard(customExerciseClipboard) {
    this.customExerciseClipboard = customExerciseClipboard;
  }
  updateCustomExercise(customExercise, setsToCreate, setsToUpdate, setsToDelete) {
    return this.customExerciseAPIService.updateCustomExercise(customExercise, setsToCreate, setsToUpdate, setsToDelete);
  }
  copySetOnCustomExercise(order, customExercise) {
    return this.customExerciseAPIService.copySetOnCustomExercise(order, customExercise);
  }
  addSetToCustomExercise(idCustomExercise, set) {
    return this.customExerciseAPIService.addSetToCustomExercise(idCustomExercise, set);
  }
  setCustomExerciseBlock(id, blockId) {
    return this.customExerciseAPIService.setCustomExerciseBlock(id, blockId);
  }
  deleteCustomExercise(id) {
    return this.customExerciseAPIService.deleteCustomExercise(id).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  deleteCustomExercises(exercisesIds) {
    return this.customExerciseAPIService.deleteCustomExercises(exercisesIds);
  }
  isCustomExerciseCompleted(customExercise) {
    return customExercise.sets.length > 0 && !!!customExercise.sets.find(setTemp => !setTemp.doned);
  }
}
_CustomExerciseService = CustomExerciseService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CustomExerciseService, "\u0275fac", function CustomExerciseService_Factory(t) {
  return new (t || _CustomExerciseService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_custom_exercise_api_service__WEBPACK_IMPORTED_MODULE_1__.CustomExerciseAPIService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CustomExerciseService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _CustomExerciseService,
  factory: _CustomExerciseService.ɵfac
}));


/***/ }),

/***/ 76071:
/*!*****************************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/custom-product/custom-product-api.service.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomProductAPIService: () => (/* binding */ CustomProductAPIService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _models_customProduct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/customProduct */ 9268);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _CustomProductAPIService;



class CustomProductAPIService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  createCustomProductAndAddToMeal(idMeal, customProduct, idUser) {
    const payload = {
      idMeal,
      customProduct: this.serializeCustomProduct(customProduct),
      idUser
    };
    return this.http.post(`${CustomProductAPIService.CUSTOM_PRODUCTS_ENDPOINT}`, this.removeUndefinedFields(payload));
  }
  updateCustomProduct(customProduct) {
    return this.http.put(`${CustomProductAPIService.CUSTOM_PRODUCTS_ENDPOINT}`, this.serializeCustomProduct(customProduct));
  }
  deleteCustomProduct(id) {
    return this.http.delete(`${CustomProductAPIService.CUSTOM_PRODUCTS_ENDPOINT}/${id}`);
  }
  getCustomProductInfo(customProduct, key) {
    return customProduct[key] * customProduct.quantity / 100;
  }
  serializeCustomProduct(customProduct) {
    const payload = {};
    if (customProduct?._id) {
      payload._id = customProduct._id;
    }
    if (Object.prototype.hasOwnProperty.call(customProduct, 'quantity')) {
      payload.quantity = customProduct.quantity;
    }
    if (Object.prototype.hasOwnProperty.call(customProduct, 'order')) {
      payload.order = customProduct.order;
    }
    if (Object.prototype.hasOwnProperty.call(customProduct, 'mealId')) {
      payload.mealId = customProduct.mealId;
    }
    if (Object.prototype.hasOwnProperty.call(customProduct, 'product')) {
      payload.product = this.serializeProductRef(customProduct.product);
    }
    _models_customProduct__WEBPACK_IMPORTED_MODULE_1__.CUSTOM_PRODUCT_NUTRITION_FIELDS.forEach(field => {
      if (!Object.prototype.hasOwnProperty.call(customProduct, field)) {
        return;
      }
      payload[field] = customProduct[field];
    });
    CustomProductAPIService.CUSTOM_PRODUCT_EXTRA_FIELDS.forEach(field => {
      if (!Object.prototype.hasOwnProperty.call(customProduct, field)) {
        return;
      }
      payload[field] = customProduct[field];
    });
    return this.removeUndefinedFields(payload);
  }
  serializeProductRef(product) {
    if (!product) {
      return product;
    }
    if (typeof product === 'string') {
      return product;
    }
    if (product._id) {
      return product._id;
    }
    return this.removeUndefinedFields({
      ...product
    });
  }
  removeUndefinedFields(value) {
    if (Array.isArray(value)) {
      return value.map(item => this.removeUndefinedFields(item));
    }
    if (!value || typeof value !== 'object') {
      return value;
    }
    const cleaned = {};
    Object.keys(value).forEach(key => {
      const nextValue = value[key];
      if (nextValue === undefined) {
        return;
      }
      cleaned[key] = this.removeUndefinedFields(nextValue);
    });
    return cleaned;
  }
}
_CustomProductAPIService = CustomProductAPIService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CustomProductAPIService, "CUSTOM_PRODUCTS_ENDPOINT", 'customproducts');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CustomProductAPIService, "CUSTOM_PRODUCT_EXTRA_FIELDS", ['ingredients', 'allergens', 'traces', 'vegan', 'vegetarian', 'lactoseFree', 'glutenFree']);
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CustomProductAPIService, "\u0275fac", function CustomProductAPIService_Factory(t) {
  return new (t || _CustomProductAPIService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_2__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CustomProductAPIService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _CustomProductAPIService,
  factory: _CustomProductAPIService.ɵfac
}));


/***/ }),

/***/ 57846:
/*!*************************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/custom-product/custom-product.service.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CustomProductService: () => (/* binding */ CustomProductService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 65821);
/* harmony import */ var _models_customProduct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/customProduct */ 9268);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _custom_product_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom-product-api.service */ 76071);

var _CustomProductService;





class CustomProductService {
  constructor(modalController, customAPIService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "modalController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "customAPIService", void 0);
    this.modalController = modalController;
    this.customAPIService = customAPIService;
  }
  /**
   * Get specific nutritional info for a CustomProduct based on its quantity.
   * Falls back to product or legacy ownProduct field.
   */
  getCustomProductInfo(customProduct, key) {
    if (!customProduct || !customProduct.quantity) return 0;
    let val = customProduct[key];
    // Fallback to underlying product
    if (val === undefined || val === null) {
      const p = customProduct.product;
      if (p) {
        val = p[key];
      }
    }
    return (val || 0) * customProduct.quantity / 100;
  }
  /**
   * Get all macros for a CustomProduct
   */
  getMacros(customProduct) {
    return {
      kcal: this.getCustomProductInfo(customProduct, 'energyKcal100g'),
      protein: this.getCustomProductInfo(customProduct, 'protein100g'),
      carbs: this.getCustomProductInfo(customProduct, 'carbohydrates100g'),
      fat: this.getCustomProductInfo(customProduct, 'fat100g')
    };
  }
  createCustomProductAndAddToMeal(idMeal, customProduct, idUser) {
    return this.customAPIService.createCustomProductAndAddToMeal(idMeal, customProduct, idUser);
  }
  updateCustomProduct(customProduct) {
    return this.customAPIService.updateCustomProduct(customProduct);
  }
  deleteCustomProduct(id) {
    return this.customAPIService.deleteCustomProduct(id).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.take)(1));
  }
  /**
   * Composes a CustomProduct. Ownership is derived from product.userId when needed.
   */
  composeCustomProduct(product, quantity, order) {
    const customProductNew = new _models_customProduct__WEBPACK_IMPORTED_MODULE_1__.CustomProduct();
    customProductNew.quantity = quantity;
    customProductNew.order = order;
    customProductNew.product = product;
    return customProductNew;
  }
  /**
   * Mapea todos los valores nutricionales de un producto base a un CustomProduct
   * Se usa cuando el producto base ha cambiado y queremos que la entrada en la dieta refleje esos cambios.
   */
  mapNutritionalValues(product, customProduct) {
    const keys = ['energyKcal100g', 'protein100g', 'carbohydrates100g', 'fat100g', 'saturatedFat100g', 'sugars100g', 'fiber100g', 'salt100g', 'sodium100g', 'cholesterol100g', 'transFat100g', 'calcium100g', 'iron100g', 'magnesium100g', 'phosphorus100g', 'potassium100g', 'zinc100g', 'copper100g', 'manganese100g', 'selenium100g', 'iodine100g', 'vitaminA100g', 'vitaminC100g', 'vitaminD100g', 'vitaminE100g', 'vitaminK100g', 'vitaminB1100g', 'vitaminB2100g', 'vitaminB3100g', 'vitaminB5100g', 'vitaminB6100g', 'vitaminB9100g', 'vitaminB12100g', 'biotin100g', 'omega3100g', 'omega6100g', 'omega9100g', 'caffeine100g', 'taurine100g', 'alcohol100g', 'vegan', 'vegetarian', 'lactoseFree', 'glutenFree', 'ingredients', 'allergens', 'traces'];
    keys.forEach(key => {
      customProduct[key] = product[key];
    });
  }
}
_CustomProductService = CustomProductService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CustomProductService, "\u0275fac", function CustomProductService_Factory(t) {
  return new (t || _CustomProductService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_custom_product_api_service__WEBPACK_IMPORTED_MODULE_2__.CustomProductAPIService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CustomProductService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: _CustomProductService,
  factory: _CustomProductService.ɵfac
}));


/***/ }),

/***/ 67863:
/*!*****************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/diet-day/diet-day-api.service.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DietDayAPIService: () => (/* binding */ DietDayAPIService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 65821);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _DietDayAPIService;



class DietDayAPIService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  getDietDayByIdDietAndDate(id, date) {
    return this.http.post(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/date/${id}`, {
      date
    });
  }
  getDietDaysBetweenDatesByIdDiet(id, dateRage) {
    return this.http.post(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/between/${id}`, dateRage);
  }
  createDietDay(dietDay) {
    return this.http.post(`${DietDayAPIService.DIET_DAYS_ENDPOINT}`, dietDay);
  }
  createDayWeightOnNewDietDay(dayWeight, dietInUseId, currentDate) {
    return this.http.post(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/create/on/new/${dietInUseId}`, {
      dayWeight,
      currentDate
    });
  }
  createCustomProductOnNewDietDay(customProduct, indexMeal, dietInUseId, currentDate, idUser) {
    return this.http.post(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/${dietInUseId}`, {
      customProduct,
      indexMeal,
      currentDate,
      idUser
    });
  }
  updateDietDay(dietDay) {
    return this.http.put(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/${dietDay._id}`, dietDay).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  pasteDietDay(id, dietDayClipboard, dietDayToPaste) {
    return this.http.put(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/copy/paste/${id}`, {
      dietDayClipboard,
      dietDayToPaste
    });
  }
  // TODO: Debería devolver user o dietDay?
  archiveDietDay(idUser, idDietDay) {
    return this.http.put(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/archive/dietday/on/user`, {
      idUser,
      idDietDay
    });
  }
  deleteDietDay(idDiet, idDietDay) {
    return this.http.delete(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/${idDiet}/${idDietDay}`);
  }
  createCustomRecipeOnNewDietDay(customRecipe, indexMeal, dietInUseId, currentDate) {
    return this.http.post(`${DietDayAPIService.DIET_DAYS_ENDPOINT}/create/recipe/new/${dietInUseId}`, {
      customRecipe,
      indexMeal,
      currentDate
    });
  }
  addCustomRecipeToMeal(mealId, customRecipeId) {
    return this.http.post(`meals/${mealId}/customrecipes/${customRecipeId}`, {});
  }
  removeCustomRecipeFromMeal(mealId, customRecipeId) {
    return this.http.delete(`meals/customrecipe/${mealId}/${customRecipeId}`);
  }
}
_DietDayAPIService = DietDayAPIService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DietDayAPIService, "DIET_DAYS_ENDPOINT", 'dietdays');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DietDayAPIService, "\u0275fac", function DietDayAPIService_Factory(t) {
  return new (t || _DietDayAPIService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DietDayAPIService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _DietDayAPIService,
  factory: _DietDayAPIService.ɵfac
}));


/***/ }),

/***/ 18086:
/*!*************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/diet-day/diet-day.service.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DietDayService: () => (/* binding */ DietDayService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 68075);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 2950);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 65821);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 98945);
/* harmony import */ var src_app_shared_models_macros_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/models/macros-data */ 41805);
/* harmony import */ var _models_dietDay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/dietDay */ 90394);
/* harmony import */ var _models_meal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../models/meal */ 50059);
/* harmony import */ var _diet_day_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./diet-day-api.service */ 67863);
/* harmony import */ var _custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../custom-product/custom-product.service */ 57846);
/* harmony import */ var src_app_core_services_util_util_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/util/util.service */ 35400);
/* harmony import */ var _recipe_recipe_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../recipe/recipe.service */ 50888);

var _DietDayService;











class DietDayService {
  get getDietDayClipboard() {
    return this.dietDayClipboard;
  }
  set setDietDayClipboard(dietDayClipboard) {
    this.dietDayClipboard = dietDayClipboard;
  }
  get currentDietDay() {
    return this._currentDietDay();
  }
  get getCurrentDietDay() {
    return this._currentDietDay$;
  }
  set setCurrentDietDay(dietDay) {
    this._currentDietDay.set(dietDay);
  }
  constructor(dietDayAPIService, customProductService, utilService, recipeService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "dietDayAPIService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "customProductService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "utilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "recipeService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "dietDayClipboard", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_currentDietDay", (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.signal)(null));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_currentDietDay$", (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_9__.toObservable)(this._currentDietDay));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "MEALS", _models_meal__WEBPACK_IMPORTED_MODULE_3__.MEAL_TYPES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "MACROS_VALUES", src_app_shared_models_macros_data__WEBPACK_IMPORTED_MODULE_1__.MACROS_VALUES);
    this.dietDayAPIService = dietDayAPIService;
    this.customProductService = customProductService;
    this.utilService = utilService;
    this.recipeService = recipeService;
  }
  getDietDayByIdDietAndDate(id, date) {
    return this.dietDayAPIService.getDietDayByIdDietAndDate(id, date).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_10__.map)(response => {
      // If anthropometry has weight, set it on the dietDay for backwards compatibility
      if (response?.dietDay && response?.anthropometry?.weight !== undefined) {
        response.dietDay.weight = response.anthropometry.weight;
      }
      return response.dietDay;
    }));
  }
  getDietDaysBetweenDatesByIdDiet(id, dateRage) {
    return this.dietDayAPIService.getDietDaysBetweenDatesByIdDiet(id, dateRage);
  }
  createDietDay(dietDay) {
    return this.dietDayAPIService.createDietDay(dietDay);
  }
  createDayWeightOnNewDietDay(dayWeight, dietInUseId, currentDate) {
    return this.dietDayAPIService.createDayWeightOnNewDietDay(dayWeight, dietInUseId, currentDate).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.map)(response => {
      if (response?.anthropometry?.weight !== undefined) {
        response.dietDay.weight = response.anthropometry.weight;
      }
      return response.dietDay;
    }));
  }
  createCustomProduct(loading, dietDay, customProduct, meal, idDietInUse, idUser) {
    loading.value = true;
    if (!dietDay._id) {
      this.utilService.setLoading = true;
    }
    return this.createCustomProductOnDietDayMeal(customProduct, meal, dietDay, idDietInUse, idUser).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.tap)(response => {
      this.applyCustomProductResponseToLocalState(response, dietDay, meal);
      loading.value = false;
    }));
  }
  applyCustomProductResponseToLocalState(response, dietDay, meal) {
    if (this.isCustomProductResponse(response)) {
      const updatedDietDay = this.addCreatedCustomProductToMeal(dietDay, meal, response);
      this.setCurrentDietDay = updatedDietDay;
      return;
    }
    this.setCurrentDietDay = response;
    this.utilService.setLoading = false;
  }
  isCustomProductResponse(response) {
    return !!response && 'product' in response;
  }
  addCreatedCustomProductToMeal(dietDay, meal, customProduct) {
    const mealIndex = dietDay.meals.findIndex(mealTemp => mealTemp.name === meal.name);
    if (mealIndex === -1) {
      return dietDay;
    }
    const targetMeal = dietDay.meals[mealIndex];
    targetMeal.customProducts = targetMeal.customProducts || [];
    targetMeal.customProducts.push(customProduct);
    return {
      ...dietDay
    };
  }
  updateCustomProduct(customProduct, meal, dietDay) {
    this.customProductService.updateCustomProduct(customProduct).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.take)(1)).subscribe(resCustomProduct => {
      const indexMeal = dietDay.meals.findIndex(mealTemp => mealTemp._id === meal._id);
      const indexProduct = dietDay.meals[indexMeal].customProducts.findIndex(customProductTemp => customProductTemp._id === customProduct._id);
      dietDay.meals[indexMeal].customProducts[indexProduct] = resCustomProduct;
      this.setCurrentDietDay = dietDay;
    });
  }
  createCustomProductOnNewDietDay(customProduct, indexMeal, dietInUseId, currentDate, idUser) {
    return this.dietDayAPIService.createCustomProductOnNewDietDay(customProduct, indexMeal, dietInUseId, currentDate, idUser);
  }
  updateDietDay(dietDay) {
    return this.dietDayAPIService.updateDietDay(dietDay);
  }
  pasteDietDay(id, dietDayClipboard, dietDayToPaste) {
    return this.dietDayAPIService.pasteDietDay(id, dietDayClipboard, dietDayToPaste).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.take)(1));
  }
  archiveDietDay(idUser, idDietDay) {
    return this.dietDayAPIService.archiveDietDay(idUser, idDietDay);
  }
  deleteDietDay(idDiet, idDietDay) {
    return this.dietDayAPIService.deleteDietDay(idDiet, idDietDay).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.take)(1), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.tap)(() => {
      const dateStr = this.currentDietDay?.date || this.utilService.formatDateToYYYYMMDD(new Date());
      const clearedDietDay = this.getStandardDietDay(dateStr);
      this.setCurrentDietDay = clearedDietDay;
      this.utilService.setUnselected = true;
    }));
  }
  createCustomProductOnDietDayMeal(customProduct, meal, dietDay, idDietInUse, idUser) {
    let createCustomProductOnDietDayMeal$;
    if (dietDay._id) {
      createCustomProductOnDietDayMeal$ = this.customProductService.createCustomProductAndAddToMeal(meal._id, customProduct, idUser);
    } else {
      createCustomProductOnDietDayMeal$ = this.createCustomProductOnNewDietDay(customProduct, dietDay.meals.findIndex(mealTemp => mealTemp.name === meal.name), idDietInUse, dietDay.date, idUser);
    }
    return createCustomProductOnDietDayMeal$;
  }
  syncUpdatedProductInCurrentDietDay(updatedProduct) {
    if (!updatedProduct?._id) {
      return false;
    }
    const currentDietDay = this.currentDietDay;
    if (!currentDietDay?.meals?.length) {
      return false;
    }
    const productId = updatedProduct._id;
    let hasChanges = false;
    const getProductId = productRef => {
      if (!productRef) return null;
      if (typeof productRef === 'string') return productRef;
      return productRef._id || null;
    };
    currentDietDay.meals.forEach(meal => {
      if (Array.isArray(meal.customProducts)) {
        meal.customProducts.forEach(customProduct => {
          const customProductProductId = getProductId(customProduct?.product);
          if (customProductProductId === productId) {
            customProduct.product = {
              ...updatedProduct
            };
            hasChanges = true;
          }
        });
      }
      if (Array.isArray(meal.customRecipes)) {
        meal.customRecipes.forEach(instance => {
          if (!instance) return;
          if (Array.isArray(instance.addedCustomProducts)) {
            instance.addedCustomProducts.forEach(additionalCp => {
              const addProductId = getProductId(additionalCp?.product);
              if (addProductId === productId) {
                additionalCp.product = {
                  ...updatedProduct
                };
                hasChanges = true;
              }
            });
          }
          const recipe = typeof instance.recipe === 'object' ? instance.recipe : null;
          if (recipe && Array.isArray(recipe.customProducts)) {
            recipe.customProducts.forEach(recipeCp => {
              const recipeProductId = getProductId(recipeCp?.product);
              if (recipeProductId === productId) {
                recipeCp.product = {
                  ...updatedProduct
                };
                hasChanges = true;
              }
            });
          }
        });
      }
    });
    if (hasChanges) {
      this.setCurrentDietDay = {
        ...currentDietDay
      };
    }
    return hasChanges;
  }
  syncUpdatedRecipeInCurrentDietDay(updatedRecipe) {
    if (!updatedRecipe?._id) {
      return null;
    }
    const currentDietDay = this.currentDietDay;
    if (!currentDietDay?.meals?.length) {
      return null;
    }
    const recipeId = updatedRecipe._id.toString();
    let hasChanges = false;
    const nextMeals = currentDietDay.meals.map(meal => {
      const customRecipes = meal.customRecipes || [];
      let mealChanged = false;
      const nextCustomRecipes = customRecipes.map(customRecipe => {
        const recipeRef = customRecipe?.recipe;
        const currentRecipe = recipeRef && typeof recipeRef === 'object' ? recipeRef : null;
        const currentRecipeId = this.getRecipeId(recipeRef);
        if (!currentRecipeId || currentRecipeId !== recipeId) {
          return customRecipe;
        }
        hasChanges = true;
        mealChanged = true;
        if (currentRecipe) {
          Object.assign(currentRecipe, updatedRecipe);
        }
        return {
          ...customRecipe,
          recipe: {
            ...(currentRecipe || {}),
            ...updatedRecipe
          }
        };
      });
      return mealChanged ? {
        ...meal,
        customRecipes: nextCustomRecipes
      } : meal;
    });
    if (!hasChanges) {
      return null;
    }
    const updatedDietDay = {
      ...currentDietDay,
      meals: nextMeals
    };
    this.setCurrentDietDay = updatedDietDay;
    return updatedDietDay;
  }
  getRecipeId(recipeRef) {
    if (!recipeRef) return null;
    if (typeof recipeRef === 'string') return recipeRef;
    return recipeRef?._id?.toString?.() || recipeRef?.toString?.() || null;
  }
  getDietDayKcal(dietDay) {
    let kcal = 0;
    dietDay.meals?.forEach(meal => {
      // Sum products
      kcal += meal.customProducts?.reduce((total, cp) => {
        return total + this.customProductService.getMacros(cp).kcal;
      }, 0) || 0;
      // Sum recipes
      kcal += meal.customRecipes?.reduce((total, instance) => {
        return total + this.calculateInstanceMacros(instance).kcal;
      }, 0) || 0;
    });
    return kcal;
  }
  getDietDayProteins(dietDay) {
    let protein = 0;
    dietDay.meals?.forEach(meal => {
      protein += meal.customProducts?.reduce((total, cp) => {
        return total + this.customProductService.getMacros(cp).protein;
      }, 0) || 0;
      protein += meal.customRecipes?.reduce((total, instance) => {
        return total + this.calculateInstanceMacros(instance).protein;
      }, 0) || 0;
    });
    return protein;
  }
  getDietDayCarbohydrates(dietDay) {
    let carbs = 0;
    dietDay.meals?.forEach(meal => {
      carbs += meal.customProducts?.reduce((total, cp) => {
        return total + this.customProductService.getMacros(cp).carbs;
      }, 0) || 0;
      carbs += meal.customRecipes?.reduce((total, instance) => {
        return total + this.calculateInstanceMacros(instance).carbs;
      }, 0) || 0;
    });
    return carbs;
  }
  getDietDayFat(dietDay) {
    let fat = 0;
    dietDay.meals?.forEach(meal => {
      fat += meal.customProducts?.reduce((total, cp) => {
        return total + this.customProductService.getMacros(cp).fat;
      }, 0) || 0;
      fat += meal.customRecipes?.reduce((total, instance) => {
        return total + this.calculateInstanceMacros(instance).fat;
      }, 0) || 0;
    });
    return fat;
  }
  getStandardDietDay(date) {
    let dietDay = new _models_dietDay__WEBPACK_IMPORTED_MODULE_2__.DietDay();
    dietDay.date = date;
    dietDay.meals = [];
    for (let i = 0; i < 6; i++) {
      let meal = new _models_meal__WEBPACK_IMPORTED_MODULE_3__.Meal();
      meal.name = _models_meal__WEBPACK_IMPORTED_MODULE_3__.MEAL_TYPES[i];
      meal.customProducts = [];
      meal.customRecipes = [];
      dietDay.meals.push(meal);
    }
    return dietDay;
  }
  getWeek(firstWeekDay, dietDays) {
    let week = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(new Date(firstWeekDay).setDate(new Date(firstWeekDay).getDate() + i));
      const dateStr = this.utilService.formatDateToYYYYMMDD(date);
      const dietDay = dietDays.find(dietDay => dietDay.date === dateStr);
      if (dietDay?._id) {
        if (!dietDay.weight) dietDay.weight = undefined;
        week.push(dietDay);
      } else {
        const newDietDay = new _models_dietDay__WEBPACK_IMPORTED_MODULE_2__.DietDay();
        newDietDay.date = dateStr;
        newDietDay.weight = undefined;
        week.push(newDietDay);
      }
    }
    return week;
  }
  getWeekWeightAverage(dietsDay) {
    let sumWeights = 0;
    let sumDaysWithWeight = 0;
    dietsDay.forEach(dietDay => {
      if (dietDay.weight) {
        sumWeights += dietDay.weight;
        sumDaysWithWeight++;
      }
    });
    return sumWeights / sumDaysWithWeight;
  }
  getRecipeInstancePortionRatio(instance) {
    const recipe = typeof instance.recipe === 'object' ? instance.recipe : null;
    if (!recipe) return 0;
    const totals = this.recipeService.calculateCustomRecipeTotals(recipe, instance);
    return totals.portionRatio;
  }
  calculateInstanceMacros(instance) {
    const recipe = typeof instance.recipe === 'object' ? instance.recipe : null;
    if (!recipe) return {
      kcal: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
    return this.recipeService.calculateCustomRecipeTotals(recipe, instance).portionMacros;
  }
}
_DietDayService = DietDayService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DietDayService, "\u0275fac", function DietDayService_Factory(t) {
  return new (t || _DietDayService)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_diet_day_api_service__WEBPACK_IMPORTED_MODULE_4__.DietDayAPIService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_5__.CustomProductService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](src_app_core_services_util_util_service__WEBPACK_IMPORTED_MODULE_6__.UtilService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵinject"](_recipe_recipe_service__WEBPACK_IMPORTED_MODULE_7__.RecipeService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DietDayService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: _DietDayService,
  factory: _DietDayService.ɵfac
}));


/***/ }),

/***/ 21457:
/*!*********************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/diet/diet-api.service.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DietAPIService: () => (/* binding */ DietAPIService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 69717);

var _DietAPIService;

class DietAPIService {}
_DietAPIService = DietAPIService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DietAPIService, "\u0275fac", function DietAPIService_Factory(t) {
  return new (t || _DietAPIService)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DietAPIService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _DietAPIService,
  factory: _DietAPIService.ɵfac
}));


/***/ }),

/***/ 36752:
/*!*****************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/diet/diet.service.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DietService: () => (/* binding */ DietService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 84288);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 2950);
/* harmony import */ var _models_diet__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/diet */ 110);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../http/http.service */ 88552);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 77566);
/* harmony import */ var _product_product_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../product/product.service */ 24630);
/* harmony import */ var _diet_day_diet_day_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../diet-day/diet-day.service */ 18086);

var _DietService;








class DietService {
  get getCurrentDiet() {
    return this._currentDiet$.asObservable();
  }
  set setCurrentDiet(diet) {
    this._currentDiet$.next(diet);
  }
  constructor(http, httpClient, productService, dietDayService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "httpClient", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "productService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "dietDayService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_currentDiet$", new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject(null));
    this.http = http;
    this.httpClient = httpClient;
    this.productService = productService;
    this.dietDayService = dietDayService;
  }
  searchDiet(search, page) {
    return this.http.post(`diets/search?page=${page}&limit=10`, {
      search
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(resDiets => resDiets.map(dietTemp => {
      dietTemp.kcalAverage = this.getDietAverageKcal(dietTemp);
      dietTemp.proteinsGAverage = this.getDietAverageProtein(dietTemp);
      dietTemp.carbohydratesGAverage = this.getDietAverageCarbohydrates(dietTemp);
      dietTemp.fatGAverage = this.getDietAverageFat(dietTemp);
      return dietTemp;
    })));
  }
  getDietById(id) {
    return this.http.get(`diets/${id}`);
  }
  getRecentMealProducts(dietId, mealIndex, options = {}) {
    const params = new URLSearchParams({
      mealIndex: String(mealIndex),
      limit: String(options.limit || 15)
    });
    return this.http.get(`diets/${dietId}/recent-products?${params.toString()}`);
  }
  getRecentMealRecipes(dietId, mealIndex, options = {}) {
    const params = new URLSearchParams({
      mealIndex: String(mealIndex),
      limit: String(options.limit || 15)
    });
    return this.http.get(`diets/${dietId}/recent-recipes?${params.toString()}`);
  }
  createDiet(diet) {
    return this.http.post(`diets`, diet);
  }
  addDietDietDay(idDiet, idDietDay) {
    return this.http.put(`diets/${idDiet}/${idDietDay}`, null);
  }
  addDietUser(idUser, idDiet) {
    return this.http.put(`diets/add/${idUser}/${idDiet}`, null);
  }
  getDietAverageKcal(diet) {
    let kcal = 0;
    diet.dietsDay.forEach(dietDayTemp => {
      kcal += this.dietDayService.getDietDayKcal(dietDayTemp);
    });
    return kcal / diet.dietsDay.length;
  }
  getDietAverageProtein(diet) {
    let proteinG = 0;
    diet.dietsDay.forEach(dietDayTemp => {
      proteinG += this.dietDayService.getDietDayKcal(dietDayTemp) / 4;
    });
    return proteinG / (diet.dietsDay.length + 1);
  }
  getDietAverageCarbohydrates(diet) {
    let kcal = 0;
    diet.dietsDay.forEach(dietDayTemp => {
      dietDayTemp.meals.forEach(mealTemp => {
        mealTemp.customProducts.forEach(productTemp => {
          kcal += this.productService.getProductKcal(productTemp);
        });
      });
    });
    return kcal;
  }
  getDietAverageFat(diet) {
    let kcal = 0;
    diet.dietsDay.forEach(dietDayTemp => {
      dietDayTemp.meals.forEach(mealTemp => {
        mealTemp.customProducts.forEach(productTemp => {
          kcal += this.productService.getProductKcal(productTemp);
        });
      });
    });
    return kcal;
  }
  getStandarDiet() {
    // let mealNames = ["Desayuno", "Almuerzo", "Comida", "Merienda", "Cena", "Recena"];
    // let meals: Meal[] = [];
    // for (let i = 0; i < 6; i++) {
    //   let meal = new Meal();
    //   meal.name = mealNames[i];
    //   meal.customProducts = [];
    //   meals.push(meal);
    // }
    // let dietDay = new DietDay();
    // dietDay.date = new Date();
    // dietDay.name = "Diet Day";
    // dietDay.meals = [];
    let diet = new _models_diet__WEBPACK_IMPORTED_MODULE_1__.Diet();
    diet.name = 'Diet';
    diet.dietsDay = [];
    return diet;
  }
  updatePinnedNote(dietId, notes) {
    return this.http.patch(`diets/${dietId}/pinned-note`, {
      notes
    });
  }
}
_DietService = DietService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DietService, "\u0275fac", function DietService_Factory(t) {
  return new (t || _DietService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_2__.HttpService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_product_product_service__WEBPACK_IMPORTED_MODULE_3__.ProductService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_diet_day_diet_day_service__WEBPACK_IMPORTED_MODULE_4__.DietDayService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DietService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: _DietService,
  factory: _DietService.ɵfac
}));


/***/ }),

/***/ 83042:
/*!*****************************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/exercise-history/exercise-history.service.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExerciseHistoryService: () => (/* binding */ ExerciseHistoryService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 27453);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 98945);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 72048);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _ExerciseHistoryService;




class ExerciseHistoryService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "statsCache", new Map());
    this.http = http;
  }
  // TASK-020 (MASTER_BACKLOG.md) — clientId opcional: cuando se llama desde
  // el contexto trainer (StatisticsPage detecta :clientId en la ruta), pega
  // al endpoint YA EXISTENTE y autorizado `GET /trainer/clients/:clientId/
  // workouts/history` (mismo `tableModel.getExerciseHistoryStats` por debajo,
  // mismo shape de respuesta) en vez del endpoint self-service — así se
  // consulta el histórico del CLIENTE, no el del propio entrenador logueado.
  getStatsForExercise$(exerciseId, exerciseNameFallback, clientId) {
    const cacheKey = `${clientId || 'self'}:${exerciseId ?? `name:${exerciseNameFallback}`}`;
    const cached = this.statsCache.get(cacheKey);
    if (cached) return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(cached);
    const params = new URLSearchParams();
    if (exerciseId) params.set('exerciseId', exerciseId);else params.set('exerciseName', exerciseNameFallback);
    const url = clientId ? `trainer/clients/${clientId}/workouts/history?${params}` : `tables/exercise-history/stats?${params}`;
    return this.http.get(url).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(stats => this.statsCache.set(cacheKey, stats)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.shareReplay)(1));
  }
  invalidateCache() {
    this.statsCache.clear();
  }
}
_ExerciseHistoryService = ExerciseHistoryService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ExerciseHistoryService, "\u0275fac", function ExerciseHistoryService_Factory(t) {
  return new (t || _ExerciseHistoryService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ExerciseHistoryService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: _ExerciseHistoryService,
  factory: _ExerciseHistoryService.ɵfac
}));


/***/ }),

/***/ 72881:
/*!*****************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/exercise/exercise-api.service.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExerciseAPIService: () => (/* binding */ ExerciseAPIService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 65821);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/http/http.service */ 88552);

var _ExerciseAPIService;



class ExerciseAPIService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  searchExercise(searchExercisesFilterGroup) {
    // Do not send ownFilter for exercises; rely on userId + favFilter
    const {
      ownFilter,
      isCardio,
      ...restPayload
    } = searchExercisesFilterGroup || {};
    const payload = {
      ...restPayload
    };
    if (isCardio === true) {
      payload.isCardio = true;
    }
    return this.http.post(`${ExerciseAPIService.EXERCISE_ENDPOINT}/search?page=${searchExercisesFilterGroup.page}&limit=10`, payload);
  }
  archiveExercise(idSplit, idUser) {
    return this.http.put(`${ExerciseAPIService.EXERCISE_ENDPOINT}/archive`, {
      idSplit,
      idUser
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  addExerciseToFavorites(idExercise, idUser) {
    return this.http.put(`${ExerciseAPIService.EXERCISE_ENDPOINT}/favorite`, {
      idExercise,
      idUser
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  createExercise(exerciseData) {
    return this.http.post(`${ExerciseAPIService.EXERCISE_ENDPOINT}`, exerciseData);
  }
  updateExercise(idExercise, exerciseData) {
    return this.http.patch(`${ExerciseAPIService.EXERCISE_ENDPOINT}/${idExercise}`, exerciseData);
  }
  deleteExercise(idExercise) {
    return this.http.delete(`${ExerciseAPIService.EXERCISE_ENDPOINT}/${idExercise}`);
  }
}
_ExerciseAPIService = ExerciseAPIService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ExerciseAPIService, "EXERCISE_ENDPOINT", 'exercises');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ExerciseAPIService, "\u0275fac", function ExerciseAPIService_Factory(t) {
  return new (t || _ExerciseAPIService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ExerciseAPIService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _ExerciseAPIService,
  factory: _ExerciseAPIService.ɵfac
}));


/***/ }),

/***/ 49232:
/*!*************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/exercise/exercise.service.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExerciseService: () => (/* binding */ ExerciseService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 84288);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 98945);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _exercise_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./exercise-api.service */ 72881);

var _ExerciseService;




class ExerciseService {
  get getExercises() {
    return this._exercises$.asObservable();
  }
  set setExercises(exercises) {
    this._exercises$.next(exercises);
  }
  constructor(exerciseAPIService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "exerciseAPIService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_exercises$", new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject([]));
    this.exerciseAPIService = exerciseAPIService;
  }
  searchExercise(searchFilterGroupExercises) {
    return this.exerciseAPIService.searchExercise(searchFilterGroupExercises);
  }
  archiveExercise(idExercise, idUser) {
    return this.exerciseAPIService.archiveExercise(idExercise, idUser);
  }
  addExerciseToFavorites(idExercise, idUser) {
    return this.exerciseAPIService.addExerciseToFavorites(idExercise, idUser);
  }
  getCombinedMuscularGroups(exercise) {
    return [...exercise.muscleGroups1, ...exercise.muscleGroups2];
  }
  createExercise(exerciseData) {
    return this.exerciseAPIService.createExercise(exerciseData);
  }
  updateExercise(idExercise, exerciseData) {
    return this.exerciseAPIService.updateExercise(idExercise, exerciseData).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.tap)(updatedExercise => {
      const currentExercises = this._exercises$.getValue();
      if (!currentExercises?.length) {
        return;
      }
      const exerciseIndex = currentExercises.findIndex(exercise => exercise._id === idExercise);
      if (exerciseIndex === -1) {
        return;
      }
      const mergedExercise = {
        ...currentExercises[exerciseIndex],
        ...exerciseData,
        ...(updatedExercise || {}),
        _id: currentExercises[exerciseIndex]._id || idExercise
      };
      if (!updatedExercise?.isCardio && !exerciseData?.isCardio) {
        delete mergedExercise.isCardio;
      }
      const nextExercises = [...currentExercises];
      nextExercises[exerciseIndex] = mergedExercise;
      this._exercises$.next(nextExercises);
    }));
  }
  deleteExercise(idExercise) {
    return this.exerciseAPIService.deleteExercise(idExercise);
  }
}
_ExerciseService = ExerciseService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ExerciseService, "\u0275fac", function ExerciseService_Factory(t) {
  return new (t || _ExerciseService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_exercise_api_service__WEBPACK_IMPORTED_MODULE_1__.ExerciseAPIService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ExerciseService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: _ExerciseService,
  factory: _ExerciseService.ɵfac
}));


/***/ }),

/***/ 88552:
/*!*****************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/http/http.service.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HttpService: () => (/* binding */ HttpService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ 77566);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 83494);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 51097);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ 17762);
/* harmony import */ var _models_http_header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/http-header */ 66940);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _util_util_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/util.service */ 35400);

var _HttpService;








class HttpService {
  constructor(http, utilService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "utilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "BASIC_AUTHORIZATION", 'Basic');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "BEARER_AUTHORIZATION", 'Bearer');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "apiUrl", src_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.API_URL);
    this.http = http;
    this.utilService = utilService;
  }
  get(endpoint, headers, withCredentials) {
    const endpointUrl = this.getEndpointUrl(endpoint);
    const options = {};
    if (headers) {
      options.headers = headers;
    }
    if (withCredentials) {
      options.withCredentials = true;
    }
    return this.http.get(endpointUrl, options).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(exception => this.handleError(exception)));
  }
  post(endpoint, body, headers, withCredentials) {
    const requestOptions = this.getRequestOptions(headers, withCredentials);
    return this.http.post(this.getEndpointUrl(endpoint), body, requestOptions).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(exception => this.handleError(exception)));
  }
  getRequestOptions(headers, withCredentials) {
    const requestOptions = {};
    if (headers) {
      requestOptions.headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpHeaders({
        ...headers
      });
    }
    if (withCredentials) {
      requestOptions.withCredentials = true;
    }
    return requestOptions;
  }
  // TODO: No se si se usa
  postWithoutMessage(endpoint, body, headers, withCredentials) {
    const requestOptions = this.getRequestOptions(headers, withCredentials);
    return this.http.post(this.getEndpointUrl(endpoint), body, requestOptions).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(exception => this.handleErrorWithoutMessage(exception)));
  }
  put(endpoint, body, reqOpts) {
    return this.http.put(this.getEndpointUrl(endpoint), body, reqOpts).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(exception => this.handleError(exception)));
  }
  patch(endpoint, body, reqOpts) {
    return this.http.patch(this.getEndpointUrl(endpoint), body, reqOpts).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(exception => this.handleError(exception)));
  }
  delete(endpoint, reqOpts) {
    return this.http.delete(this.getEndpointUrl(endpoint), reqOpts).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.catchError)(exception => this.handleError(exception)));
  }
  cloneRequestWithTokenAuthorization(request, token) {
    const headerValue = this.getAuthorization(token);
    return request.clone({
      headers: request.headers.set(_models_http_header__WEBPACK_IMPORTED_MODULE_2__.HTTP_HEADERS.auth.authorization.id, headerValue)
    });
  }
  getLoginAuthorizationHeaders(email, password) {
    const authorization = this.getLoginAuthorization(email, password);
    const authorizationHeader = new _models_http_header__WEBPACK_IMPORTED_MODULE_2__.HttpHeader(_models_http_header__WEBPACK_IMPORTED_MODULE_2__.HTTP_HEADERS.auth.authorization.id, authorization);
    return {
      ...authorizationHeader,
      ..._models_http_header__WEBPACK_IMPORTED_MODULE_2__.HTTP_HEADERS.login.disableBrowserPopup.header,
      ..._models_http_header__WEBPACK_IMPORTED_MODULE_2__.HTTP_HEADERS.login.contentType.header
    };
  }
  getAuthorization(token) {
    return `${this.BEARER_AUTHORIZATION} ${token}`;
  }
  getLoginAuthorization(email, password) {
    const credentials = btoa(`${email}:${password}`);
    return `${this.BASIC_AUTHORIZATION} ${credentials}`;
  }
  handleError(exception) {
    // Preservar el error original con toda su información incluyendo el status
    let error = exception;
    // Si el error tiene una estructura HttpErrorResponse, preservarla completamente
    if (exception?.status !== undefined && (exception?.error || exception?.message)) {
      // IMPORTANTE: Priorizar el mensaje del backend (exception.error.message)
      // sobre el mensaje genérico de Angular (exception.message = "Http failure response for...")
      const backendMessage = (typeof exception.error === 'object' ? exception.error?.message : null) || exception.message;
      error = {
        // Spread el error del backend para obtener sus propiedades
        ...(typeof exception.error === 'object' ? exception.error : {}),
        status: exception.status,
        // El mensaje del backend tiene prioridad sobre el genérico de Angular
        message: backendMessage,
        // Preservar el error original completo para acceso en capas superiores
        error: exception.error
      };
    } else if (exception?.error) {
      // Si hay error interno, asegurar que el status se preserve
      if (typeof exception.error === 'object') {
        error = {
          ...exception.error,
          status: exception.status ?? exception.error.status
        };
      } else {
        error = {
          error: exception.error,
          status: exception.status
        };
      }
    } else if (exception?.status !== undefined) {
      // Si solo hay status, preservarlo
      error = {
        ...exception,
        status: exception.status
      };
    }
    return this.handlePropagationError(error);
  }
  // TODO: No se si se usa
  handleErrorWithoutMessage(exception) {
    const error = !!exception?.error ? {
      ...exception?.error
    } : exception;
    if (!!exception?.error) {
      alert(error);
    }
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.throwError)(exception);
  }
  handlePropagationError(exception) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.throwError)(exception);
  }
  getEndpointUrl(endpoint) {
    return `${this.apiUrl}/${endpoint}`;
  }
  getFromLocalStorage(key) {
    const value = localStorage.getItem(key);
    if (!value) {
      return null;
    }
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error(`Error parsing localStorage key "${key}":`, error);
      return null;
    }
  }
}
_HttpService = HttpService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(HttpService, "\u0275fac", function HttpService_Factory(t) {
  return new (t || _HttpService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_5__.HttpClient), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_util_util_service__WEBPACK_IMPORTED_MODULE_3__.UtilService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(HttpService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: _HttpService,
  factory: _HttpService.ɵfac
}));


/***/ }),

/***/ 24626:
/*!*************************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/maintenance/maintenance-modal.service.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MaintenanceModalService: () => (/* binding */ MaintenanceModalService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_features_maintenance_maintenance_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/features/maintenance/maintenance-modal.component */ 7645);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 45398);
/* harmony import */ var _remote_config_remote_config_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../remote-config/remote-config.service */ 88662);


var _MaintenanceModalService;




const POLL_INTERVAL_MS = 5000;
class MaintenanceModalService {
  constructor(modalController, remoteConfigService, navController, ngZone) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "remoteConfigService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "navController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ngZone", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isModalOpen", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "activeModal", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "pollHandle", null);
    this.modalController = modalController;
    this.remoteConfigService = remoteConfigService;
    this.navController = navController;
    this.ngZone = ngZone;
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.stopPolling();
      } else if (this.isModalOpen) {
        this.startPolling();
      }
    });
  }
  presentIfActive(maintenance) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (maintenance?.state !== 'active' || _this.isModalOpen) {
        return;
      }
      yield _this.present(maintenance.message || '');
    })();
  }
  present(message) {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this2.isModalOpen = true;
      const modal = yield _this2.modalController.create({
        component: src_app_features_maintenance_maintenance_modal_component__WEBPACK_IMPORTED_MODULE_2__.MaintenanceModalComponent,
        componentProps: {
          message
        },
        cssClass: 'maintenance-modal',
        backdropDismiss: false
      });
      _this2.activeModal = modal;
      modal.onDidDismiss().then(() => {
        _this2.isModalOpen = false;
        _this2.activeModal = null;
        _this2.stopPolling();
        _this2.ngZone.run(() => {
          void _this2.navController.navigateForward(['user-loader'], {
            replaceUrl: true
          });
        });
      });
      yield modal.present();
      _this2.startPolling();
    })();
  }
  startPolling() {
    var _this3 = this;
    this.stopPolling();
    this.pollHandle = setInterval( /*#__PURE__*/(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const status = yield _this3.remoteConfigService.checkConfig();
      if (status.maintenance.state !== 'active') {
        yield _this3.activeModal?.dismiss();
      }
    }), POLL_INTERVAL_MS);
  }
  stopPolling() {
    if (this.pollHandle) {
      clearInterval(this.pollHandle);
      this.pollHandle = null;
    }
  }
}
_MaintenanceModalService = MaintenanceModalService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(MaintenanceModalService, "\u0275fac", function MaintenanceModalService_Factory(t) {
  return new (t || _MaintenanceModalService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_remote_config_remote_config_service__WEBPACK_IMPORTED_MODULE_3__.RemoteConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_6__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_4__.NgZone));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(MaintenanceModalService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: _MaintenanceModalService,
  factory: _MaintenanceModalService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 74859:
/*!*********************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/meal/meal-api.service.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MealAPIService: () => (/* binding */ MealAPIService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);
/* harmony import */ var _user_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user/user.service */ 66802);

var _MealAPIService;



class MealAPIService {
  constructor(http, userService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "userService", void 0);
    this.http = http;
    this.userService = userService;
  }
  searchAllWithFilters(searchFilterGroup) {
    const payload = {
      ...searchFilterGroup,
      userId: searchFilterGroup?.userId || this.userService.getLocalUser?._id
    };
    return this.http.post(`${MealAPIService.MEAL_ENDPOINT}/search/all`, payload);
  }
  pasteMeal(clipboard, merge) {
    const mealToSend = clipboard.getFilteredMeal();
    return this.http.put(`${MealAPIService.MEAL_ENDPOINT}/paste`, {
      meals: {
        mealClipboard: mealToSend,
        mealToPaste: clipboard.mealToPaste
      },
      merge
    });
  }
  updateMeal(meal) {
    return this.http.put(`${MealAPIService.MEAL_ENDPOINT}/update/all/meal/fields`, meal);
  }
  modifyMeal(meal) {
    return this.http.put(`${MealAPIService.MEAL_ENDPOINT}/modify/one/simple`, meal);
  }
  deleteMealProduct(idMeal, idProduct) {
    return this.http.delete(`${MealAPIService.MEAL_ENDPOINT}/${idMeal}/${idProduct}`);
  }
  deleteMealCustomProducts(id) {
    return this.http.delete(`${MealAPIService.MEAL_ENDPOINT}/all/customproducts/${id}`);
  }
  deleteMealRecipes(id) {
    return this.http.delete(`${MealAPIService.MEAL_ENDPOINT}/all/customrecipesref/${id}`);
  }
  addCustomRecipe(mealId, customRecipeId) {
    return this.http.post(`${MealAPIService.MEAL_ENDPOINT}/${mealId}/customrecipes/${customRecipeId}`, {});
  }
  deleteMealCustomRecipe(mealId, customRecipeId) {
    return this.http.delete(`${MealAPIService.MEAL_ENDPOINT}/customrecipe/${mealId}/${customRecipeId}`);
  }
  // TAREA (meals pautados) — marcar/desmarcar consumido un producto/receta
  // pautados (mismo patrón que setMealCompleted en la app de trainer).
  setCustomProductConsumed(mealId, customProductId, consumed) {
    return this.http.patch(`${MealAPIService.MEAL_ENDPOINT}/${mealId}/customproducts/${customProductId}/consumed`, {
      consumed
    });
  }
  setCustomRecipeConsumed(mealId, customRecipeId, consumed) {
    return this.http.patch(`${MealAPIService.MEAL_ENDPOINT}/${mealId}/customrecipes/${customRecipeId}/consumed`, {
      consumed
    });
  }
}
_MealAPIService = MealAPIService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealAPIService, "MEAL_ENDPOINT", 'meals');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealAPIService, "\u0275fac", function MealAPIService_Factory(t) {
  return new (t || _MealAPIService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_user_user_service__WEBPACK_IMPORTED_MODULE_2__.UserService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealAPIService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _MealAPIService,
  factory: _MealAPIService.ɵfac
}));


/***/ }),

/***/ 96994:
/*!*****************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/meal/meal.service.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MealService: () => (/* binding */ MealService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 84288);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 65821);
/* harmony import */ var src_app_shared_models_meal_clipboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/models/meal-clipboard */ 30289);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _meal_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./meal-api.service */ 74859);

var _MealService;




class MealService {
  constructor(mealAPIService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "mealAPIService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "mealClipboardSubject", new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(null));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_currentMeal$", new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(null));
    this.mealAPIService = mealAPIService;
  }
  get getCurrentMeal() {
    return this._currentMeal$.value;
  }
  set setCurrentMeal(meal) {
    this._currentMeal$.next(meal);
  }
  get getMealClipboard() {
    return this.mealClipboardSubject.value;
  }
  get mealClipboard$() {
    return this.mealClipboardSubject.asObservable();
  }
  set setMealClipboard(mealClipboard) {
    this.mealClipboardSubject.next(new src_app_shared_models_meal_clipboard__WEBPACK_IMPORTED_MODULE_1__.MealClipboard(mealClipboard, null));
  }
  setFullMealClipboard(mealClipboard, mealToPaste) {
    const clipboard = new src_app_shared_models_meal_clipboard__WEBPACK_IMPORTED_MODULE_1__.MealClipboard(mealClipboard, mealToPaste);
    clipboard.setFullMeal();
    this.mealClipboardSubject.next(clipboard);
  }
  setPartialMealClipboard(mealClipboard, mealToPaste, productIds, recipeIds) {
    const clipboard = new src_app_shared_models_meal_clipboard__WEBPACK_IMPORTED_MODULE_1__.MealClipboard(mealClipboard, mealToPaste);
    clipboard.setPartialSelection(productIds, recipeIds);
    this.mealClipboardSubject.next(clipboard);
  }
  clearMealClipboard() {
    this.mealClipboardSubject.next(null);
  }
  hasMealClipboard() {
    return !!this.mealClipboardSubject.value;
  }
  searchAllWithFilters(searchFilterGroup) {
    return this.mealAPIService.searchAllWithFilters(searchFilterGroup);
  }
  pasteMeal(mealClipboard, merge) {
    return this.mealAPIService.pasteMeal(mealClipboard, merge);
  }
  updateMeal(meal) {
    return this.mealAPIService.updateMeal(meal).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.take)(1));
  }
  modifyMeal(meal) {
    return this.mealAPIService.modifyMeal(meal).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.take)(1));
  }
  deleteMealProduct(idMeal, idProduct) {
    return this.mealAPIService.deleteMealProduct(idMeal, idProduct);
  }
  deleteMealCustomProducts(id) {
    return this.mealAPIService.deleteMealCustomProducts(id);
  }
  deleteMealRecipes(id) {
    return this.mealAPIService.deleteMealRecipes(id);
  }
  addCustomRecipe(mealId, customRecipeId) {
    return this.mealAPIService.addCustomRecipe(mealId, customRecipeId);
  }
  deleteMealCustomRecipe(mealId, customRecipeId) {
    return this.mealAPIService.deleteMealCustomRecipe(mealId, customRecipeId);
  }
  getMealIndex(meal, dietDay) {
    return dietDay.meals.findIndex(mTemp => mTemp.name === meal.name);
  }
  setCustomProductConsumed(mealId, customProductId, consumed) {
    return this.mealAPIService.setCustomProductConsumed(mealId, customProductId, consumed);
  }
  setCustomRecipeConsumed(mealId, customRecipeId, consumed) {
    return this.mealAPIService.setCustomRecipeConsumed(mealId, customRecipeId, consumed);
  }
}
_MealService = MealService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealService, "\u0275fac", function MealService_Factory(t) {
  return new (t || _MealService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_meal_api_service__WEBPACK_IMPORTED_MODULE_2__.MealAPIService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: _MealService,
  factory: _MealService.ɵfac
}));


/***/ }),

/***/ 53333:
/*!*****************************************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/pinned-exercise-note/pinned-exercise-note-api.service.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PinnedExerciseNoteAPIService: () => (/* binding */ PinnedExerciseNoteAPIService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _PinnedExerciseNoteAPIService;


class PinnedExerciseNoteAPIService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  getByTable(tableId) {
    return this.http.get(`${PinnedExerciseNoteAPIService.PINNED_EXERCISE_NOTE_ENDPOINT}/table/${tableId}`);
  }
  getById(id) {
    return this.http.get(`${PinnedExerciseNoteAPIService.PINNED_EXERCISE_NOTE_ENDPOINT}/${id}`);
  }
  upsert(dto) {
    const url = `${PinnedExerciseNoteAPIService.PINNED_EXERCISE_NOTE_ENDPOINT}/table/${dto.tableId}/workout/${dto.workoutIndex}/exercise/${dto.exerciseIndex}`;
    return this.http.post(url, {
      notes: dto.notes
    });
  }
  delete(id) {
    return this.http.delete(`${PinnedExerciseNoteAPIService.PINNED_EXERCISE_NOTE_ENDPOINT}/${id}`);
  }
}
_PinnedExerciseNoteAPIService = PinnedExerciseNoteAPIService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(PinnedExerciseNoteAPIService, "PINNED_EXERCISE_NOTE_ENDPOINT", 'pinned-exercise-notes');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(PinnedExerciseNoteAPIService, "\u0275fac", function PinnedExerciseNoteAPIService_Factory(t) {
  return new (t || _PinnedExerciseNoteAPIService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(PinnedExerciseNoteAPIService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _PinnedExerciseNoteAPIService,
  factory: _PinnedExerciseNoteAPIService.ɵfac
}));


/***/ }),

/***/ 49996:
/*!*************************************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/pinned-exercise-note/pinned-exercise-note.service.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PinnedExerciseNoteService: () => (/* binding */ PinnedExerciseNoteService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 84288);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 27453);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 98945);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 51097);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 2950);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _pinned_exercise_note_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pinned-exercise-note-api.service */ 53333);

var _PinnedExerciseNoteService;



class PinnedExerciseNoteService {
  constructor(apiService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "apiService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "cache", new Map());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "cacheSubject", new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(new Map()));
    this.apiService = apiService;
  }
  getByTable(tableId) {
    const cached = this.cache.get(tableId);
    if (cached) {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)(cached);
    }
    return this.apiService.getByTable(tableId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(notes => {
      this.cache.set(tableId, notes);
      this.cacheSubject.next(new Map(this.cache));
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.catchError)(() => {
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.of)([]);
    }));
  }
  getByPosition(tableId, workoutIndex, exerciseIndex) {
    return this.getByTable(tableId).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(notes => notes.find(n => n.workoutIndex === workoutIndex && n.exerciseIndex === exerciseIndex) || null));
  }
  upsert(dto) {
    return this.apiService.upsert(dto).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(note => {
      const tableCache = this.cache.get(dto.tableId) || [];
      const existingIndex = tableCache.findIndex(n => n.workoutIndex === dto.workoutIndex && n.exerciseIndex === dto.exerciseIndex);
      if (existingIndex >= 0) {
        tableCache[existingIndex] = note;
      } else {
        tableCache.push(note);
      }
      this.cache.set(dto.tableId, tableCache);
      this.cacheSubject.next(new Map(this.cache));
    }));
  }
  delete(id, tableId) {
    return this.apiService.delete(id).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.tap)(() => {
      const tableCache = this.cache.get(tableId) || [];
      const filtered = tableCache.filter(n => n._id !== id);
      this.cache.set(tableId, filtered);
      this.cacheSubject.next(new Map(this.cache));
    }));
  }
  clearCache(tableId) {
    this.cache.delete(tableId);
    this.cacheSubject.next(new Map(this.cache));
  }
  get cache$() {
    return this.cacheSubject.asObservable();
  }
}
_PinnedExerciseNoteService = PinnedExerciseNoteService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(PinnedExerciseNoteService, "\u0275fac", function PinnedExerciseNoteService_Factory(t) {
  return new (t || _PinnedExerciseNoteService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_pinned_exercise_note_api_service__WEBPACK_IMPORTED_MODULE_1__.PinnedExerciseNoteAPIService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(PinnedExerciseNoteService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: _PinnedExerciseNoteService,
  factory: _PinnedExerciseNoteService.ɵfac
}));


/***/ }),

/***/ 7559:
/*!***************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/product/product-api.service.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProductAPIService: () => (/* binding */ ProductAPIService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 65821);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _ProductAPIService;



class ProductAPIService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  getProducts() {
    return this.http.get(`${ProductAPIService.PRODUCTS_ENDPOINT}`);
  }
  getProductByCode(idUser, code) {
    return this.http.get(`${ProductAPIService.PRODUCTS_ENDPOINT}/code/${idUser}/${code}`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  getProductsCount() {
    return this.http.get(`${ProductAPIService.PRODUCTS_ENDPOINT}/count`);
  }
  // Body como objeto {search} — no un string crudo: express.json() usa
  // "strict" por defecto en el backend y rechaza con 400 cualquier body cuyo
  // valor raíz no sea un objeto/array (ver product-controller.js#searchProduct).
  searchProduct(page, search) {
    return this.http.post(`${ProductAPIService.PRODUCTS_ENDPOINT}/search?page=${page}&limit=10`, {
      search
    });
  }
  /** Crear un producto. Si se incluye userId en el objeto, será un producto del usuario. */
  saveProduct(product) {
    return this.http.post(`${ProductAPIService.PRODUCTS_ENDPOINT}`, this.serializeProduct(product));
  }
  /** Actualizar un producto (soporta tanto globales como de usuario). */
  updateProduct(product) {
    return this.http.put(`${ProductAPIService.PRODUCTS_ENDPOINT}`, this.serializeProduct(product)).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  /** Promover un producto de usuario a producto global (equivalente al antiguo toProduct). */
  promoteToGlobal(id) {
    return this.http.put(`${ProductAPIService.PRODUCTS_ENDPOINT}/promote/${id}`, {}).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  /** Añadir/quitar de favoritos. Ya no necesita isOwn — todo va a archivedProducts. */
  addFavoriteProduct(idProduct, idUser) {
    return this.http.put(`${ProductAPIService.PRODUCTS_ENDPOINT}/favProduct`, {
      idProduct,
      idUser
    });
  }
  /** Eliminar un producto (solo el creador puede borrar sus propios productos). */
  deleteProduct(id) {
    return this.http.delete(`${ProductAPIService.PRODUCTS_ENDPOINT}/${id}`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  serializeProduct(product) {
    return this.removeEmptyProductFields(product);
  }
  removeEmptyProductFields(value) {
    if (Array.isArray(value)) {
      return value.map(item => this.removeEmptyProductFields(item));
    }
    if (!value || typeof value !== 'object') {
      return value;
    }
    const cleaned = {};
    Object.keys(value).forEach(key => {
      const nextValue = value[key];
      if (nextValue === null || nextValue === undefined || nextValue === '' || nextValue === false) {
        return;
      }
      if (typeof nextValue === 'object' && !Array.isArray(nextValue)) {
        const nestedValue = this.removeEmptyProductFields(nextValue);
        if (nestedValue && typeof nestedValue === 'object' && !Array.isArray(nestedValue) && Object.keys(nestedValue).length === 0) {
          return;
        }
        cleaned[key] = nestedValue;
        return;
      }
      cleaned[key] = this.removeEmptyProductFields(nextValue);
    });
    return cleaned;
  }
}
_ProductAPIService = ProductAPIService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProductAPIService, "PRODUCTS_ENDPOINT", 'products');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProductAPIService, "\u0275fac", function ProductAPIService_Factory(t) {
  return new (t || _ProductAPIService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProductAPIService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _ProductAPIService,
  factory: _ProductAPIService.ɵfac
}));


/***/ }),

/***/ 24630:
/*!***********************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/product/product.service.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProductService: () => (/* binding */ ProductService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _product_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./product-api.service */ 7559);

var _ProductService;


class ProductService {
  constructor(productAPIService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "productAPIService", void 0);
    this.productAPIService = productAPIService;
  }
  getProductKcal(customProduct) {
    return customProduct.quantity * customProduct.energyKcal100g / 100;
  }
  getProducts() {
    return this.productAPIService.getProducts();
  }
  getProductByCode(idUser, code) {
    return this.productAPIService.getProductByCode(idUser, code);
  }
  getProductsCount() {
    return this.productAPIService.getProductsCount();
  }
  searchProduct(page, search) {
    return this.productAPIService.searchProduct(page, search);
  }
  /** Crear un producto. Si incluye userId, será un producto del usuario. */
  saveProduct(product) {
    return this.productAPIService.saveProduct(product);
  }
  /** Actualizar un producto (propio o global según permisos). */
  updateProduct(product) {
    return this.productAPIService.updateProduct(product);
  }
  /** Promover producto de usuario a producto global (ex: toProduct). */
  promoteToGlobal(id) {
    return this.productAPIService.promoteToGlobal(id);
  }
  /**
   * Añadir/quitar de favoritos. Ya no requiere isOwn —
   * todos los productos (incluidos los del usuario) van a archivedProducts.
   */
  addFavoriteProduct(idProduct, idUser) {
    return this.productAPIService.addFavoriteProduct(idProduct, idUser);
  }
  /**
   * Eliminar un producto del usuario. Solo permitir si product.userId === currentUser._id.
   */
  deleteProduct(id) {
    return this.productAPIService.deleteProduct(id);
  }
  measureFilterHasChange() {}
}
_ProductService = ProductService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProductService, "\u0275fac", function ProductService_Factory(t) {
  return new (t || _ProductService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_product_api_service__WEBPACK_IMPORTED_MODULE_1__.ProductAPIService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProductService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _ProductService,
  factory: _ProductService.ɵfac
}));


/***/ }),

/***/ 12713:
/*!*************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/recipe/recipe-api.service.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RecipeApiService: () => (/* binding */ RecipeApiService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _RecipeApiService;


/**
 * Recipe API Service
 * Handles HTTP requests for Recipe CRUD and search operations
 */
class RecipeApiService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  /**
   * Get Recipe by ID
   */
  getById(id) {
    return this.http.get(`${RecipeApiService.RECIPES_ENDPOINT}/${id}`);
  }
  /**
   * Search recipes (verified + user's own)
   */
  searchRecipes(search, page = 0, limit = 10, filters) {
    const params = new URLSearchParams({
      search,
      page: String(page),
      limit: String(limit)
    });
    if (filters?.own) params.set('own', 'true');
    if (filters?.fav) params.set('fav', 'true');
    if (filters?.verified) params.set('verified', 'true');
    return this.http.get(`${RecipeApiService.RECIPES_ENDPOINT}/search?${params.toString()}`);
  }
  /**
   * Get user's own recipes
   */
  getUserRecipes(page = 0, limit = 10, search = '') {
    return this.http.get(`${RecipeApiService.RECIPES_ENDPOINT}/user?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`);
  }
  /**
   * Get verified recipes
   */
  getVerifiedRecipes(search = '', page = 0, limit = 10) {
    return this.http.get(`${RecipeApiService.RECIPES_ENDPOINT}/verified?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`);
  }
  /**
   * Get user's archived recipes
   */
  getArchivedRecipes(search = '', page = 0, limit = 10) {
    return this.http.get(`${RecipeApiService.RECIPES_ENDPOINT}/archived?search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`);
  }
  /**
   * Create a new Recipe
   */
  create(recipe) {
    return this.http.post(`${RecipeApiService.RECIPES_ENDPOINT}`, recipe);
  }
  /**
   * Compose Recipe + CustomRecipe in one call
   */
  compose(payload) {
    return this.http.post(`${RecipeApiService.RECIPES_ENDPOINT}/compose`, payload);
  }
  /**
   * Update a Recipe (only owner can update)
   */
  update(id, recipe) {
    return this.http.put(`${RecipeApiService.RECIPES_ENDPOINT}/${id}`, recipe);
  }
  /**
   * Delete a Recipe (only owner can delete)
   */
  delete(id) {
    return this.http.delete(`${RecipeApiService.RECIPES_ENDPOINT}/${id}`);
  }
  /**
   * Toggle archived status for a recipe
   */
  toggleArchived(recipeId) {
    return this.http.post(`${RecipeApiService.RECIPES_ENDPOINT}/${recipeId}/archive`, {});
  }
  /**
   * Add customProduct to Recipe
   */
  addCustomProduct(recipeId, customProductId) {
    return this.http.post(`${RecipeApiService.RECIPES_ENDPOINT}/${recipeId}/customproducts/${customProductId}`, {});
  }
  /**
   * Remove customProduct from Recipe
   */
  removeCustomProduct(recipeId, customProductId) {
    return this.http.delete(`${RecipeApiService.RECIPES_ENDPOINT}/${recipeId}/customproducts/${customProductId}`);
  }
}
_RecipeApiService = RecipeApiService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipeApiService, "RECIPES_ENDPOINT", 'recipes');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipeApiService, "\u0275fac", function RecipeApiService_Factory(t) {
  return new (t || _RecipeApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipeApiService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _RecipeApiService,
  factory: _RecipeApiService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 50888:
/*!*********************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/recipe/recipe.service.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RecipeService: () => (/* binding */ RecipeService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _recipe_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./recipe-api.service */ 12713);

var _RecipeService;


class RecipeService {
  constructor(recipeApiService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "recipeApiService", void 0);
    this.recipeApiService = recipeApiService;
  }
  getById(id) {
    return this.recipeApiService.getById(id);
  }
  searchRecipes(search, page = 0, limit = 20, filters) {
    return this.recipeApiService.searchRecipes(search, page, limit, filters);
  }
  getUserRecipes(page = 0, limit = 20, search = '') {
    return this.recipeApiService.getUserRecipes(page, limit, search);
  }
  getVerifiedRecipes(search = '', page = 0, limit = 20) {
    return this.recipeApiService.getVerifiedRecipes(search, page, limit);
  }
  getArchivedRecipes(search = '', page = 0, limit = 20) {
    return this.recipeApiService.getArchivedRecipes(search, page, limit);
  }
  create(recipe) {
    return this.recipeApiService.create(recipe);
  }
  compose(payload) {
    return this.recipeApiService.compose(payload);
  }
  update(id, recipe) {
    return this.recipeApiService.update(id, recipe);
  }
  delete(id) {
    return this.recipeApiService.delete(id);
  }
  toggleArchived(recipeId) {
    return this.recipeApiService.toggleArchived(recipeId);
  }
  addCustomProduct(recipeId, customProductId) {
    return this.recipeApiService.addCustomProduct(recipeId, customProductId);
  }
  removeCustomProduct(recipeId, customProductId) {
    return this.recipeApiService.removeCustomProduct(recipeId, customProductId);
  }
  calculateRecipeMacros(recipe) {
    let kcal = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    let quantity = 0;
    const ingredients = recipe.ingredients || recipe.customProducts || [];
    for (const cp of ingredients) {
      const qty = this.toPositiveNumber(cp.quantity) || 0;
      const multiplier = qty / 100;
      const product = cp.product || {};
      quantity += qty;
      kcal += (cp.energyKcal100g ?? product.energyKcal100g ?? 0) * multiplier;
      protein += (cp.protein100g ?? product.protein100g ?? 0) * multiplier;
      carbs += (cp.carbohydrates100g ?? product.carbohydrates100g ?? 0) * multiplier;
      fat += (cp.fat100g ?? product.fat100g ?? 0) * multiplier;
    }
    return {
      kcal,
      protein,
      carbs,
      fat,
      quantity
    };
  }
  getEmptyRecipeNutrition() {
    return this.buildNutritionCalculation([], this.zeroMacroTotals(), null, null);
  }
  calculateRecipeNutritionFromIngredients(ingredients, consumedQuantity, cookedWeight) {
    const normalizedIngredients = ingredients || [];
    const totals = this.calculateRecipeMacros({
      name: '',
      customProducts: normalizedIngredients
    });
    return this.buildNutritionCalculation(normalizedIngredients, totals, consumedQuantity, cookedWeight);
  }
  areCustomProductsEquivalent(left, right) {
    if (!left && !right) return true;
    if (!left || !right) return false;
    return RecipeService.CUSTOM_PRODUCT_COMPARISON_FIELDS.every(field => this.areValuesEquivalent(left?.[field], right?.[field]));
  }
  buildModifiedBaseCustomProduct(baseIngredient, currentIngredient) {
    const modified = {
      baseCustomProductId: baseIngredient._id,
      quantity: currentIngredient.quantity
    };
    RecipeService.CUSTOM_PRODUCT_COMPARISON_FIELDS.forEach(field => {
      const currentValue = currentIngredient?.[field];
      const baseValue = baseIngredient?.[field];
      if (!this.areValuesEquivalent(currentValue, baseValue)) {
        modified[field] = this.cloneComparableValue(currentValue);
      }
    });
    return modified;
  }
  serializeCustomProductForPersistence(ingredient) {
    const payload = {
      quantity: ingredient.quantity
    };
    const normalizedProductId = this.normalizeObjectId(ingredient.product?._id || ingredient.product);
    if (normalizedProductId) {
      payload.product = normalizedProductId;
    }
    const normalizedIngredientId = this.normalizeObjectId(ingredient._id);
    if (normalizedIngredientId) {
      payload._id = normalizedIngredientId;
    }
    RecipeService.CUSTOM_PRODUCT_COMPARISON_FIELDS.forEach(field => {
      if (field === 'quantity') return;
      if (!Object.prototype.hasOwnProperty.call(ingredient, field)) {
        return;
      }
      const value = ingredient?.[field];
      if (value === undefined) {
        return;
      }
      if (typeof value === 'string' && value.trim() === '') {
        return;
      }
      payload[field] = this.cloneComparableValue(value);
    });
    return payload;
  }
  mergeRecipeIngredients(recipe, customRecipe) {
    if (!recipe) return [];
    if (!customRecipe) return [...(recipe.customProducts || [])];
    const removedIds = new Set((customRecipe.removedBaseCustomProductIds || []).map(id => (id?._id || id).toString()));
    const modifiedMap = new Map();
    (customRecipe.modifiedBaseCustomProducts || []).forEach(item => {
      const id = item?.baseCustomProductId?._id || item?.baseCustomProductId;
      if (id) {
        modifiedMap.set(id.toString(), item);
      }
    });
    const mergedBase = (recipe.customProducts || []).filter(ingredient => !removedIds.has(ingredient?._id?.toString?.())).map(ingredient => {
      const id = ingredient?._id?.toString?.();
      const modified = id ? modifiedMap.get(id) : null;
      if (!modified) return ingredient;
      const nextIngredient = {
        ...ingredient
      };
      RecipeService.CUSTOM_PRODUCT_COMPARISON_FIELDS.forEach(field => {
        if (modified?.[field] !== undefined) {
          nextIngredient[field] = this.cloneComparableValue(modified[field]);
        }
      });
      return nextIngredient;
    });
    return [...mergedBase, ...(customRecipe.addedCustomProducts || [])];
  }
  getRemovedBaseIngredients(recipe, ingredients) {
    if (!recipe) return [];
    return (recipe.customProducts || []).filter(ingredient => !ingredients.find(current => current?._id === ingredient?._id));
  }
  calculateCustomRecipeTotals(recipe, customRecipe) {
    const ingredients = this.mergeRecipeIngredients(recipe, customRecipe);
    const nutrition = this.calculateRecipeNutritionFromIngredients(ingredients, customRecipe?.quantity, customRecipe?.quantityCooked);
    return {
      ingredients,
      totals: nutrition.totals,
      baseline: nutrition.portionBaseline,
      consumed: nutrition.consumed,
      rawWeight: nutrition.rawWeight,
      cookedWeight: nutrition.cookedWeight,
      portionBaseline: nutrition.portionBaseline,
      portionBasis: nutrition.portionBasis,
      portionRatio: nutrition.portionRatio,
      portionMacros: nutrition.portionMacros,
      per100Baseline: nutrition.per100Baseline,
      per100Basis: nutrition.per100Basis,
      per100Macros: nutrition.per100Macros
    };
  }
  getTopIngredients(recipe, count = 3) {
    const ingredients = recipe.ingredients || recipe.customProducts || [];
    if (ingredients.length === 0) {
      return '';
    }
    return [...ingredients].sort((a, b) => (b.quantity || 0) - (a.quantity || 0)).slice(0, count).map(cp => cp.product?.name || 'Ingrediente').join(', ');
  }
  getIngredientsList(recipe) {
    if (!recipe.customProducts || recipe.customProducts.length === 0) {
      return [];
    }
    return [...recipe.customProducts].sort((a, b) => (b.quantity || 0) - (a.quantity || 0)).map(cp => ({
      name: cp.product?.name || 'Ingrediente',
      quantity: cp.quantity || 0
    }));
  }
  isFavorite(recipe, archivedRecipes) {
    return recipe._id ? archivedRecipes.includes(recipe._id) : false;
  }
  areValuesEquivalent(left, right) {
    if (Array.isArray(left) || Array.isArray(right)) {
      return JSON.stringify(left || []) === JSON.stringify(right || []);
    }
    return left === right;
  }
  cloneComparableValue(value) {
    if (Array.isArray(value)) {
      return [...value];
    }
    return value;
  }
  buildNutritionCalculation(ingredients, totals, consumedQuantity, cookedWeight) {
    const rawWeight = totals.quantity || 0;
    const normalizedCookedWeight = this.toPositiveNumber(cookedWeight);
    const consumed = this.toPositiveNumber(consumedQuantity) || 0;
    const hasCookedWeight = !!normalizedCookedWeight;
    const baseline = hasCookedWeight ? normalizedCookedWeight : rawWeight;
    const basis = hasCookedWeight ? 'cooked' : 'raw';
    const portionRatio = baseline > 0 && consumed > 0 ? consumed / baseline : 0;
    return {
      ingredients,
      totals,
      rawWeight,
      cookedWeight: normalizedCookedWeight,
      consumed,
      portionBaseline: baseline,
      portionBasis: basis,
      portionRatio,
      portionMacros: this.scaleMacros(totals, portionRatio),
      per100Baseline: baseline,
      per100Basis: basis,
      per100Macros: baseline > 0 ? this.scaleMacros(totals, 100 / baseline) : this.zeroMacros()
    };
  }
  scaleMacros(macros, ratio) {
    return {
      kcal: macros.kcal * ratio,
      protein: macros.protein * ratio,
      carbs: macros.carbs * ratio,
      fat: macros.fat * ratio
    };
  }
  zeroMacros() {
    return {
      kcal: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
  }
  zeroMacroTotals() {
    return {
      ...this.zeroMacros(),
      quantity: 0
    };
  }
  toPositiveNumber(value) {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return null;
    }
    return parsed;
  }
  normalizeObjectId(value) {
    if (!value) return null;
    const rawValue = value?._id || value;
    const normalizedValue = typeof rawValue === 'string' ? rawValue : rawValue?.toString?.();
    return /^[a-f\d]{24}$/i.test(normalizedValue || '') ? normalizedValue : null;
  }
}
_RecipeService = RecipeService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipeService, "CUSTOM_PRODUCT_COMPARISON_FIELDS", ['quantity', 'energyKcal100g', 'protein100g', 'carbohydrates100g', 'fat100g', 'saturatedFat100g', 'sugars100g', 'fiber100g', 'salt100g', 'sodium100g', 'cholesterol100g', 'transFat100g', 'calcium100g', 'iron100g', 'magnesium100g', 'phosphorus100g', 'potassium100g', 'zinc100g', 'copper100g', 'manganese100g', 'selenium100g', 'iodine100g', 'vitaminA100g', 'vitaminC100g', 'vitaminD100g', 'vitaminE100g', 'vitaminK100g', 'vitaminB1100g', 'vitaminB2100g', 'vitaminB3100g', 'vitaminB5100g', 'vitaminB6100g', 'vitaminB9100g', 'vitaminB12100g', 'biotin100g', 'omega3100g', 'omega6100g', 'omega9100g', 'caffeine100g', 'taurine100g', 'alcohol100g', 'ingredients', 'allergens', 'traces', 'vegan', 'vegetarian', 'lactoseFree', 'glutenFree']);
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipeService, "\u0275fac", function RecipeService_Factory(t) {
  return new (t || _RecipeService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_recipe_api_service__WEBPACK_IMPORTED_MODULE_1__.RecipeApiService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipeService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _RecipeService,
  factory: _RecipeService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 51150:
/*!****************************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/remote-config/remote-config-gate.service.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RemoteConfigGateService: () => (/* binding */ RemoteConfigGateService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 84288);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _remote_config_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./remote-config.service */ 88662);
/* harmony import */ var _app_update_app_update_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../app-update/app-update.service */ 21746);
/* harmony import */ var _maintenance_maintenance_modal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../maintenance/maintenance-modal.service */ 24626);


var _RemoteConfigGateService;





// Orquesta la prioridad: mantenimiento activo > actualización forzada >
// aviso previo > nada. Un único punto de entrada (checkAndPresent) para que
// AppComponent no acumule checks independientes.
class RemoteConfigGateService {
  constructor(remoteConfigService, appUpdateService, maintenanceModalService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "remoteConfigService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "appUpdateService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "maintenanceModalService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "warningBannerSubject", new rxjs__WEBPACK_IMPORTED_MODULE_5__.BehaviorSubject(null));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "warningBanner$", this.warningBannerSubject.asObservable());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dismissedWarningThisSession", false);
    this.remoteConfigService = remoteConfigService;
    this.appUpdateService = appUpdateService;
    this.maintenanceModalService = maintenanceModalService;
  }
  checkAndPresent() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const status = yield _this.remoteConfigService.checkConfig();
      if (status.maintenance.state === 'active') {
        _this.warningBannerSubject.next(null);
        yield _this.maintenanceModalService.presentIfActive(status.maintenance);
        return;
      }
      if (status.forceUpdate.required) {
        _this.warningBannerSubject.next(null);
        yield _this.appUpdateService.presentRequiredUpdate(status.forceUpdate);
        return;
      }
      if (status.maintenance.state === 'warning' && !_this.dismissedWarningThisSession) {
        _this.warningBannerSubject.next({
          message: status.maintenance.message || ''
        });
        return;
      }
      _this.warningBannerSubject.next(null);
    })();
  }
  // Descartable solo durante la sesión actual — no se persiste, vuelve a
  // aparecer si el usuario relanza la app.
  dismissWarningBanner() {
    this.dismissedWarningThisSession = true;
    this.warningBannerSubject.next(null);
  }
}
_RemoteConfigGateService = RemoteConfigGateService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RemoteConfigGateService, "\u0275fac", function RemoteConfigGateService_Factory(t) {
  return new (t || _RemoteConfigGateService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_remote_config_service__WEBPACK_IMPORTED_MODULE_2__.RemoteConfigService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_app_update_app_update_service__WEBPACK_IMPORTED_MODULE_3__.AppUpdateService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_maintenance_maintenance_modal_service__WEBPACK_IMPORTED_MODULE_4__.MaintenanceModalService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RemoteConfigGateService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: _RemoteConfigGateService,
  factory: _RemoteConfigGateService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 88662:
/*!***********************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/remote-config/remote-config.service.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RemoteConfigService: () => (/* binding */ RemoteConfigService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 99295);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ 17762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../http/http.service */ 88552);


var _RemoteConfigService;




const CACHE_KEY = 'trainfit_remote_config';
const FALLBACK_STATUS = {
  maintenance: {
    state: 'normal'
  },
  forceUpdate: {
    required: false
  }
};
class RemoteConfigService {
  constructor(httpService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "httpService", void 0);
    this.httpService = httpService;
  }
  checkConfig() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const response = yield (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.firstValueFrom)(_this.httpService.get(`config?version=${src_environments_environment__WEBPACK_IMPORTED_MODULE_2__.environment.APP_VERSION}`));
        if (response?.maintenance && response?.forceUpdate) {
          _this.cacheStatus(response);
          return response;
        }
        return _this.getCachedStatus();
      } catch (error) {
        console.warn('Remote config check failed', error);
        return _this.getCachedStatus();
      }
    })();
  }
  cacheStatus(status) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(status));
    } catch {}
  }
  // Fail-open: sin caché válida, no bloquear nunca la app.
  getCachedStatus() {
    const cached = this.httpService.getFromLocalStorage(CACHE_KEY);
    if (cached?.maintenance && cached?.forceUpdate) {
      return cached;
    }
    return FALLBACK_STATUS;
  }
}
_RemoteConfigService = RemoteConfigService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RemoteConfigService, "\u0275fac", function RemoteConfigService_Factory(t) {
  return new (t || _RemoteConfigService)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_3__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RemoteConfigService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: _RemoteConfigService,
  factory: _RemoteConfigService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 72496:
/*!*****************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/rest-timer/rest-timer.service.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RestTimerService: () => (/* binding */ RestTimerService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _capacitor_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @capacitor/app */ 41641);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ 44599);
/* harmony import */ var _util_notification_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../util/notification.service */ 57507);

var _RestTimerService;





class RestTimerService {
  constructor(notificationService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "notificationService", void 0);
    // Sobrevive a que la app se cierre/mate en 2º plano — se restaura en el
    // constructor (nueva instancia de servicio tras un cold start).
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "STORAGE_KEY", 'trainfit_rest_timer');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_active", (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.signal)(null));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_paused", (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.signal)(false));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_pausedRemainingMs", (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.signal)(0));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_now", (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.signal)(Date.now()));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "tickHandle", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "appStateListener", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "active", this._active.asReadonly());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "paused", this._paused.asReadonly());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "remainingSeconds", (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.computed)(() => {
      const active = this._active();
      if (!active) return 0;
      if (this._paused()) return Math.ceil(this._pausedRemainingMs() / 1000);
      return Math.max(0, Math.ceil((active.restEndsAt - this._now()) / 1000));
    }));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isRunning", (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.computed)(() => !!this._active() && !this._paused() && this.remainingSeconds() > 0));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isFinished", (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.computed)(() => !!this._active() && this.remainingSeconds() === 0));
    this.notificationService = notificationService;
    this.restoreFromStorage();
    this.listenAppStateChange();
  }
  start(workoutId, setId, seconds) {
    if (!seconds || seconds <= 0) return;
    this.stopTicker();
    this._paused.set(false);
    this._pausedRemainingMs.set(0);
    this._now.set(Date.now());
    this._active.set({
      workoutId,
      setId,
      totalSeconds: seconds,
      restEndsAt: Date.now() + seconds * 1000
    });
    this.startTicker();
    this.persist();
    void this.notificationService.scheduleRestEndNotification(seconds);
  }
  pause() {
    const active = this._active();
    if (!active || this._paused()) return;
    this._pausedRemainingMs.set(Math.max(0, active.restEndsAt - Date.now()));
    this._paused.set(true);
    this.stopTicker();
    this.persist();
    void this.notificationService.cancelRestEndNotification();
  }
  resume() {
    const active = this._active();
    if (!active || !this._paused()) return;
    this._active.set({
      ...active,
      restEndsAt: Date.now() + this._pausedRemainingMs()
    });
    this._paused.set(false);
    this.startTicker();
    this.persist();
    void this.notificationService.scheduleRestEndNotification(this.remainingSeconds());
  }
  addSeconds(delta) {
    const active = this._active();
    if (!active) return;
    if (this._paused()) {
      this._pausedRemainingMs.set(Math.max(0, this._pausedRemainingMs() + delta * 1000));
    } else {
      this._active.set({
        ...active,
        restEndsAt: Math.max(Date.now(), active.restEndsAt + delta * 1000)
      });
      if (!this.tickHandle && this.remainingSeconds() > 0) this.startTicker();
    }
    this.persist();
    if (!this._paused()) {
      void this.notificationService.scheduleRestEndNotification(this.remainingSeconds());
    }
  }
  skip() {
    this.stopTicker();
    this._active.set(null);
    this._paused.set(false);
    this._pausedRemainingMs.set(0);
    this.clearPersisted();
    void this.notificationService.cancelRestEndNotification();
  }
  startTicker() {
    this.stopTicker();
    this.tickHandle = setInterval(() => {
      this._now.set(Date.now());
      if (this.remainingSeconds() === 0) this.stopTicker();
    }, 1000);
  }
  stopTicker() {
    if (this.tickHandle) clearInterval(this.tickHandle);
    this.tickHandle = undefined;
  }
  persist() {
    const active = this._active();
    if (!active) return;
    const payload = {
      active,
      paused: this._paused(),
      pausedRemainingMs: this._pausedRemainingMs()
    };
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Almacenamiento no disponible: el timer sigue funcionando en memoria,
      // simplemente no sobrevivirá a un cold start.
    }
  }
  clearPersisted() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch {
      // no-op
    }
  }
  restoreFromStorage() {
    let stored = null;
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      stored = raw ? JSON.parse(raw) : null;
    } catch {
      stored = null;
    }
    if (!stored?.active) return;
    this._active.set(stored.active);
    this._paused.set(!!stored.paused);
    this._pausedRemainingMs.set(stored.pausedRemainingMs || 0);
    this._now.set(Date.now());
    if (!this._paused() && this.remainingSeconds() > 0) {
      this.startTicker();
    }
  }
  listenAppStateChange() {
    if (!_capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.isNativePlatform()) return;
    void _capacitor_app__WEBPACK_IMPORTED_MODULE_1__.App.addListener('appStateChange', ({
      isActive
    }) => {
      if (!isActive || !this._active()) return;
      this._now.set(Date.now());
      if (!this._paused() && this.remainingSeconds() === 0) this.stopTicker();
    }).then(listener => {
      this.appStateListener = listener;
    });
  }
}
_RestTimerService = RestTimerService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RestTimerService, "\u0275fac", function RestTimerService_Factory(t) {
  return new (t || _RestTimerService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_util_notification_service__WEBPACK_IMPORTED_MODULE_3__.NotificationService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RestTimerService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: _RestTimerService,
  factory: _RestTimerService.ɵfac
}));


/***/ }),

/***/ 72490:
/*!***********************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/rm-calculator/rm-calculator.service.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RmCalculatorService: () => (/* binding */ RmCalculatorService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 69717);

var _RmCalculatorService;

const ROUND_INCREMENT_KG = 2.5;
class RmCalculatorService {
  calculateEpley(weight, reps) {
    if (reps <= 1) return weight;
    return weight * (1 + reps / 30);
  }
  calculateBrzycki(weight, reps) {
    if (reps <= 1) return weight;
    return weight * (36 / (37 - reps));
  }
  calculateLombardi(weight, reps) {
    if (reps <= 1) return weight;
    return weight * Math.pow(reps, 0.1);
  }
  calculateAll(weight, reps) {
    return {
      epley: this.calculateEpley(weight, reps),
      brzycki: this.calculateBrzycki(weight, reps),
      lombardi: this.calculateLombardi(weight, reps)
    };
  }
  // Corte único y no ambiguo: 2-5 Epley, 6-8 Brzycki, 9+ Lombardi.
  getRecommendedFormula(reps) {
    if (reps <= 5) return 'epley';
    if (reps <= 8) return 'brzycki';
    return 'lombardi';
  }
  // Del 100% hacia abajo, para que la fila de referencia (1RM) aparezca primero.
  getPercentageTable(oneRm, percentagesDesc) {
    return percentagesDesc.map(percentage => ({
      percentage,
      weight: this.roundToIncrement(oneRm * percentage / 100, ROUND_INCREMENT_KG)
    }));
  }
  roundToIncrement(value, increment) {
    if (!Number.isFinite(value)) return 0;
    return Math.round(value / increment) * increment;
  }
}
_RmCalculatorService = RmCalculatorService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RmCalculatorService, "\u0275fac", function RmCalculatorService_Factory(t) {
  return new (t || _RmCalculatorService)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RmCalculatorService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _RmCalculatorService,
  factory: _RmCalculatorService.ɵfac
}));


/***/ }),

/***/ 18787:
/*!*******************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/security/secure-storage.service.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SecureStorageService: () => (/* binding */ SecureStorageService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ 44599);
/* harmony import */ var capacitor_secure_storage_plugin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! capacitor-secure-storage-plugin */ 12583);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);


var _SecureStorageService;



/**
 * SecureStorageService
 *
 * Thin wrapper over `capacitor-secure-storage-plugin` (the free community
 * plugin available on npm) that provides a clean async API for storing,
 * retrieving and removing sensitive key-value pairs on native platforms.
 *
 * On the web platform the plugin falls back to localStorage, which is
 * acceptable for development but NOT considered secure for production.
 *
 * NOTE: If the project migrates to `@capawesome/capacitor-secure-storage`
 * (paid Capawesome Insiders) in the future, only the three private helpers
 * (`_set`, `_get`, `_remove`) need to be updated.
 */
class SecureStorageService {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isNative", _capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.isNativePlatform());
  }
  // ─── Public API ───────────────────────────────────────────────────────────
  /**
   * Persist a value under `key` in secure storage.
   * On non-native platforms this is a no-op for sensitive keys.
   */
  set(key, value) {
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield capacitor_secure_storage_plugin__WEBPACK_IMPORTED_MODULE_3__.SecureStoragePlugin.set({
          key,
          value
        });
      } catch (error) {
        console.error(`[SecureStorage] set failed for key="${key}"`, error);
        throw error;
      }
    })();
  }
  /**
   * Retrieve the value stored under `key`.
   * Returns `null` if the key does not exist or on any read error.
   */
  get(key) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const result = yield capacitor_secure_storage_plugin__WEBPACK_IMPORTED_MODULE_3__.SecureStoragePlugin.get({
          key
        });
        return result?.value ?? null;
      } catch (error) {
        // The plugin throws when a key is missing – treat that as null.
        if (_this.isMissingKeyError(error)) {
          return null;
        }
        console.error(`[SecureStorage] get failed for key="${key}"`, error);
        return null;
      }
    })();
  }
  /**
   * Remove the entry stored under `key`.
   * Silently ignores "key not found" errors.
   */
  remove(key) {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield capacitor_secure_storage_plugin__WEBPACK_IMPORTED_MODULE_3__.SecureStoragePlugin.remove({
          key
        });
      } catch (error) {
        if (!_this2.isMissingKeyError(error)) {
          console.error(`[SecureStorage] remove failed for key="${key}"`, error);
        }
      }
    })();
  }
  /** Whether this device is running on a native Capacitor platform. */
  get isNativeClient() {
    return this.isNative;
  }
  // ─── Private helpers ──────────────────────────────────────────────────────
  isMissingKeyError(error) {
    const msg = String(error?.message ?? error ?? '');
    return msg.includes('Item with given key does not exist') || msg.includes('does not exist');
  }
}
_SecureStorageService = SecureStorageService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(SecureStorageService, "\u0275fac", function SecureStorageService_Factory(t) {
  return new (t || _SecureStorageService)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(SecureStorageService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: _SecureStorageService,
  factory: _SecureStorageService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 78715:
/*!*******************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/set/set-api.service.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SetAPIService: () => (/* binding */ SetAPIService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _SetAPIService;


class SetAPIService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  createSet(set) {
    return this.http.post(`${SetAPIService.SET_ENDPOINT}/one`, set);
  }
  createSets(sets) {
    return this.http.post(`${SetAPIService.SET_ENDPOINT}`, sets);
  }
  updateSet(set) {
    return this.http.put(`${SetAPIService.SET_ENDPOINT}`, set);
  }
  deleteById(id) {
    return this.http.delete(`${SetAPIService.SET_ENDPOINT}/${id}`);
  }
}
_SetAPIService = SetAPIService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SetAPIService, "SET_ENDPOINT", 'sets');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SetAPIService, "\u0275fac", function SetAPIService_Factory(t) {
  return new (t || _SetAPIService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SetAPIService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _SetAPIService,
  factory: _SetAPIService.ɵfac
}));


/***/ }),

/***/ 48434:
/*!***************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/set/set.service.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SetService: () => (/* binding */ SetService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 65821);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _set_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./set-api.service */ 78715);

var _SetService;



class SetService {
  constructor(setAPIService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "setAPIService", void 0);
    this.setAPIService = setAPIService;
  }
  createSet(set) {
    return this.setAPIService.createSet(set);
  }
  createSets(sets) {
    return this.setAPIService.createSets(sets);
  }
  updateSet(set) {
    return this.setAPIService.updateSet(set);
  }
  deleteSet(id) {
    return this.setAPIService.deleteById(id).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
}
_SetService = SetService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SetService, "\u0275fac", function SetService_Factory(t) {
  return new (t || _SetService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_set_api_service__WEBPACK_IMPORTED_MODULE_1__.SetAPIService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SetService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _SetService,
  factory: _SetService.ɵfac
}));


/***/ }),

/***/ 78051:
/*!***********************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/split/split-api.service.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SplitAPIService: () => (/* binding */ SplitAPIService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 65821);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _SplitAPIService;



class SplitAPIService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  createSplit(split) {
    return this.http.post(`${SplitAPIService.SPLIT_ENDPOINT}`, split);
  }
  createSplitAndAddToTable(tableInUseId) {
    return this.http.post(`${SplitAPIService.SPLIT_ENDPOINT}/${tableInUseId}`, null);
  }
  addSplitToTable(idTable, idSplit, withSets) {
    return this.http.put(`splits/add/to/table`, {
      idTable,
      idSplit,
      withSets
    }).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  getSplitByIdAndDate(id, date) {
    return this.http.post(`${SplitAPIService.SPLIT_ENDPOINT}/date/${id}`, {
      date
    });
  }
  addTableSplit(idTable, idSplit) {
    return this.http.put(`${SplitAPIService.SPLIT_ENDPOINT}/split/${idTable}/${idSplit}`, null);
  }
  // Planificador visual (Fase C) — engancha un Workout YA CREADO (standalone,
  // vía WorkoutAPIService.createWorkout) a UN split concreto. Backend ya
  // existía (addWorkoutsSplit, split-routes.js `PUT /:idSplit/:idWorkout`)
  // pero no tenía wrapper en el frontend — nada lo llamaba hasta ahora.
  addWorkoutToSplit(idSplit, idWorkout) {
    return this.http.put(`${SplitAPIService.SPLIT_ENDPOINT}/${idSplit}/${idWorkout}`, null);
  }
  // Bug preexistente arreglado: apuntaba a `splits` (sin :id) mientras el
  // backend expone `PUT /splits/:id` (split-routes.js) — no tenía ningún
  // caller real hasta el Planificador visual (Fase C), que es el primero en
  // usarlo de verdad (renombrar semana).
  updateSplit(id, patch) {
    return this.http.put(`${SplitAPIService.SPLIT_ENDPOINT}/${id}`, patch);
  }
  deleteSplit(idTable, idSplit) {
    return this.http.delete(`${SplitAPIService.SPLIT_ENDPOINT}/${idTable}/${idSplit}`);
  }
  deleteSplits(idTable, splitIds) {
    return this.http.delete(`${SplitAPIService.SPLIT_ENDPOINT}/${idTable}`, {
      body: {
        splitIds
      }
    });
  }
  // Planificador visual (Fase C) — "Añadir semana" en blanco (a diferencia
  // de addSplitToTable, que siempre duplica un split existente).
  createBlankSplitAndAddToTable(idTable, name) {
    return this.http.post(`${SplitAPIService.SPLIT_ENDPOINT}/blank/${idTable}`, {
      name
    });
  }
  // Reordena las columnas (splits) dentro de una tabla.
  reorderSplits(idTable, splitIdsOrder) {
    return this.http.put(`${SplitAPIService.SPLIT_ENDPOINT}/rows/order/${idTable}`, {
      splitIdsOrder
    });
  }
}
_SplitAPIService = SplitAPIService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SplitAPIService, "SPLIT_ENDPOINT", 'splits');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SplitAPIService, "\u0275fac", function SplitAPIService_Factory(t) {
  return new (t || _SplitAPIService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SplitAPIService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _SplitAPIService,
  factory: _SplitAPIService.ɵfac
}));


/***/ }),

/***/ 20538:
/*!*******************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/split/split.service.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SplitService: () => (/* binding */ SplitService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 85342);
/* harmony import */ var _models_split__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/split */ 6546);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _split_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./split-api.service */ 78051);

var _SplitService;




class SplitService {
  constructor(splitAPIService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "splitAPIService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_addOrDeleteSplitSlide$", new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject());
    this.splitAPIService = splitAPIService;
  }
  createSplit(split) {
    return this.splitAPIService.createSplit(split);
  }
  createSplitAndAddToTable(tableInUseId) {
    return this.splitAPIService.createSplitAndAddToTable(tableInUseId);
  }
  addSplitToTable(idTable, idSplit, withSets) {
    return this.splitAPIService.addSplitToTable(idTable, idSplit, withSets);
  }
  getSplitByIdAndDate(id, date) {
    return this.splitAPIService.getSplitByIdAndDate(id, date);
  }
  addTableSplit(idTable, idSplit) {
    return this.splitAPIService.addSplitToTable(idTable, idSplit);
  }
  addWorkoutToSplit(idSplit, idWorkout) {
    return this.splitAPIService.addWorkoutToSplit(idSplit, idWorkout);
  }
  updateSplit(id, patch) {
    return this.splitAPIService.updateSplit(id, patch);
  }
  deleteSplit(idTable, idSplit) {
    return this.splitAPIService.deleteSplit(idTable, idSplit);
  }
  deleteSplits(idTable, splitIds) {
    return this.splitAPIService.deleteSplits(idTable, splitIds);
  }
  createBlankSplitAndAddToTable(idTable, name) {
    return this.splitAPIService.createBlankSplitAndAddToTable(idTable, name);
  }
  reorderSplits(idTable, splitIdsOrder) {
    return this.splitAPIService.reorderSplits(idTable, splitIdsOrder);
  }
  getStandarSplit() {
    const split = new _models_split__WEBPACK_IMPORTED_MODULE_1__.Split();
    split.name = 'Split';
    split.workouts = [];
    return split;
  }
}
_SplitService = SplitService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SplitService, "\u0275fac", function SplitService_Factory(t) {
  return new (t || _SplitService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_split_api_service__WEBPACK_IMPORTED_MODULE_2__.SplitAPIService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SplitService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: _SplitService,
  factory: _SplitService.ɵfac
}));


/***/ }),

/***/ 25331:
/*!***********************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/table/table-api.service.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TableAPIService: () => (/* binding */ TableAPIService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 84288);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _TableAPIService;



class TableAPIService {
  get getCurrentTable() {
    return this._currentTable$.asObservable();
  }
  set setCurrentTable(table) {
    this._currentTable$.next(table);
  }
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_currentTable$", new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(null));
    this.http = http;
  }
  getTableById(id) {
    return this.http.get(`tables/${id}`);
  }
  copyTable(idUser, idTable) {
    return this.http.post(`tables/copy/${idTable}`, {
      idUser
    });
  }
  duplicateTable(idUser, idTable) {
    return this.http.post(`tables/duplicate/${idTable}`, {
      idUser
    });
  }
  copySharedTable(idUser, idTable) {
    return this.http.get(`tables/share/${idUser}/${idTable}`);
  }
  getSearchTables(search, page, idUser, isOwn, defaultOnly = false) {
    return this.http.post(`tables/search?page=${page}&limit=5`, {
      search,
      idUser,
      isOwn,
      defaultOnly
    });
  }
  getTables(page, limit, own) {
    const url = `tables?page=${page}&limit=${limit}&own=${own}`;
    return this.http.get(url);
  }
  createTableToUser(idUser, name) {
    return this.http.post(`tables/user/${idUser}`, {
      name
    });
  }
  createDefaultTable(name) {
    return this.http.post(`tables/default`, {
      name
    });
  }
  updateTableName(table) {
    return this.http.put(`tables`, {
      _id: table._id,
      name: table.name
    });
  }
  deleteTableById(idUser, idTable) {
    return this.http.delete(`tables/${idUser}/${idTable}`);
  }
}
_TableAPIService = TableAPIService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TableAPIService, "\u0275fac", function TableAPIService_Factory(t) {
  return new (t || _TableAPIService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TableAPIService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _TableAPIService,
  factory: _TableAPIService.ɵfac
}));


/***/ }),

/***/ 91594:
/*!*******************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/table/table.service.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TableService: () => (/* binding */ TableService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 68075);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 65821);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 84498);
/* harmony import */ var _models_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/table */ 30558);
/* harmony import */ var _table_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./table-api.service */ 25331);

var _TableService;






class TableService {
  // Getter sincrónico para acceso directo al valor
  get tableInUse() {
    return this._currentTable();
  }
  // Setter para actualizar la tabla
  set setCurrentTable(table) {
    if (!table) {
      this._currentTable.set(null);
      return;
    }
    // Deep copy to ensure nested changes trigger updates
    this._currentTable.set(JSON.parse(JSON.stringify(table)));
  }
  constructor(tableAPIService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "tableAPIService", void 0);
    // Signal para la tabla actual
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_currentTable", (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.signal)(null));
    // Signal de solo lectura (computed)
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "currentTable", (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.computed)(() => this._currentTable()));
    // Observable para compatibilidad con código existente
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "getCurrentTable", (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_4__.toObservable)(this._currentTable));
    this.tableAPIService = tableAPIService;
  }
  // `User.tableInUse` llega unas veces como string (id) y otras como el Table
  // ya populado, según la ruta que lo devuelva — se normaliza aquí una vez
  // para que ningún consumidor tenga que reimplementar esta comparación.
  getTableInUseId(tableInUse) {
    if (!tableInUse) return null;
    if (typeof tableInUse === 'string') return tableInUse;
    return tableInUse?._id?.toString?.() || tableInUse?.toString?.() || null;
  }
  getTableById(id) {
    return this.tableAPIService.getTableById(id).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1));
  }
  copyTable(idUser, idTable) {
    return this.tableAPIService.copyTable(idUser, idTable).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1));
  }
  duplicateTable(idUser, idTable) {
    return this.tableAPIService.duplicateTable(idUser, idTable).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1));
  }
  copySharedTable(idUser, idTable) {
    return this.tableAPIService.copySharedTable(idUser, idTable).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1));
  }
  getSearchTables(searchFilterGroup, idUser) {
    return this.tableAPIService.getSearchTables(searchFilterGroup.search, searchFilterGroup.page, idUser, searchFilterGroup.ownFilter, searchFilterGroup.defaultOnly).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.distinctUntilChanged)());
  }
  // Todas las rutinas propias del usuario, completamente pobladas
  // (splits->workouts->exercises->sets), para agregaciones históricas
  // (ej. ExerciseHistoryService). Distinto de getSearchTables(), que solo
  // trae name/thumbnail para las tarjetas de búsqueda.
  getAllOwnTables(limit = 200) {
    return this.tableAPIService.getTables(0, limit, true).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1));
  }
  getStandarTable() {
    const table = new _models_table__WEBPACK_IMPORTED_MODULE_1__.Table();
    table.name = 'Rutina predeterminada';
    table.splits = [];
    return table;
  }
  createTableToUser(idUser, name) {
    return this.tableAPIService.createTableToUser(idUser, name).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1));
  }
  createDefaultTable(name) {
    return this.tableAPIService.createDefaultTable(name).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1));
  }
  updateTableName(table) {
    return this.tableAPIService.updateTableName(table).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1));
  }
  deleteTableById(idUser, idTable) {
    return this.tableAPIService.deleteTableById(idUser, idTable).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.take)(1));
  }
}
_TableService = TableService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TableService, "\u0275fac", function TableService_Factory(t) {
  return new (t || _TableService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_table_api_service__WEBPACK_IMPORTED_MODULE_2__.TableAPIService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TableService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _TableService,
  factory: _TableService.ɵfac
}));


/***/ }),

/***/ 81243:
/*!*********************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/user/user-api.service.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserAPIService: () => (/* binding */ UserAPIService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _UserAPIService;


class UserAPIService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  getUserByEmail(email) {
    return this.http.get(`${UserAPIService.USERS_ENDPOINT}/${email}`);
  }
  checkEmail(email) {
    return this.http.get(`${UserAPIService.USERS_ENDPOINT}/check/${email}`);
  }
  createUser(user, date) {
    return this.http.post(`${UserAPIService.USERS_ENDPOINT}`, {
      user,
      date
    });
  }
  createProfessionalUser(payload) {
    return this.http.post(`${UserAPIService.USERS_ENDPOINT}/professional`, payload);
  }
  createGoogleUser(user, date, tokenGoogle) {
    return this.http.post(`${UserAPIService.AUTH_SOCIAL_REGISTER_ENDPOINT}`, {
      user,
      date,
      provider: 'google',
      tokenGoogle
    });
  }
  updateUser(user) {
    return this.http.put(`${UserAPIService.USERS_ENDPOINT}`, user);
  }
  updateGoogleUser(user) {
    return this.http.put(`${UserAPIService.AUTH_SOCIAL_COMPLETE_ENDPOINT}`, user);
  }
  createAppleUser(user, date, tokenApple) {
    return this.http.post(`${UserAPIService.AUTH_SOCIAL_REGISTER_ENDPOINT}`, {
      user,
      date,
      tokenApple,
      provider: 'apple'
    });
  }
  updateAppleUser(user) {
    return this.http.put(`${UserAPIService.AUTH_SOCIAL_COMPLETE_ENDPOINT}`, user);
  }
  playStopDiet(idUser, idDietInUse) {
    return this.http.put(`${UserAPIService.USERS_ENDPOINT}/playstopdiet/${idUser}/${idDietInUse}`, null);
  }
  searchArchivedsByFilter(searchFilters) {
    return this.http.post(`${UserAPIService.USERS_ENDPOINT}/search/by`, searchFilters);
  }
  searchUsers(page, search, filters) {
    return this.http.post(`${UserAPIService.USERS_ENDPOINT}/search`, {
      page,
      search,
      filters
    });
  }
  checkHash(id, hash) {
    return this.http.get(`${UserAPIService.USERS_ENDPOINT}/hash/${id}/${hash}`);
  }
  clearUserHash(id) {
    return this.http.delete(`${UserAPIService.USERS_ENDPOINT}/hash/${id}`);
  }
  addFavoriteProduct(idUser, idProduct) {
    return this.http.put(`${UserAPIService.USERS_ENDPOINT}/favProduct`, {
      idUser,
      idProduct
    });
  }
  sendMailCode(email) {
    return this.http.get(`${UserAPIService.USERS_ENDPOINT}/${UserAPIService.USERS_SEND_MAIL_CODE_ENDPOINT}/${email}`);
  }
  checkRestoreCode(email, password, hash) {
    return this.http.post(`${UserAPIService.USERS_ENDPOINT}/${UserAPIService.USERS_SEND_MAIL_CODE_ENDPOINT}`, {
      email,
      password,
      hash
    });
  }
  sendSuggestions(email, suggestions) {
    return this.http.post(`${UserAPIService.USERS_ENDPOINT}/suggestions`, {
      email,
      suggestions
    });
  }
  deleteById(id) {
    return this.http.delete(`${UserAPIService.USERS_ENDPOINT}/${id}`);
  }
  verifyPassword(password) {
    return this.http.post(`${UserAPIService.USERS_ENDPOINT}/verify-password`, {
      password
    });
  }
  updateUserRoles(id, roles) {
    return this.http.put(`${UserAPIService.USERS_ENDPOINT}/roles/${id}`, {
      roles
    });
  }
  activateAccount(email, code) {
    return this.http.post(`${UserAPIService.AUTH_ACTIVATE_ENDPOINT}`, {
      email,
      code
    });
  }
  resendActivationCode(email) {
    return this.http.post(`${UserAPIService.AUTH_RESEND_CODE_ENDPOINT}`, {
      email
    });
  }
}
_UserAPIService = UserAPIService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserAPIService, "USERS_ENDPOINT", 'users');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserAPIService, "AUTH_ACTIVATE_ENDPOINT", 'auth/activate');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserAPIService, "AUTH_RESEND_CODE_ENDPOINT", 'auth/resend-code');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserAPIService, "AUTH_SOCIAL_REGISTER_ENDPOINT", 'auth/social/register');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserAPIService, "AUTH_SOCIAL_COMPLETE_ENDPOINT", 'auth/social/complete');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserAPIService, "USERS_SEND_MAIL_CODE_ENDPOINT", 'send/mail/code');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserAPIService, "\u0275fac", function UserAPIService_Factory(t) {
  return new (t || _UserAPIService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserAPIService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _UserAPIService,
  factory: _UserAPIService.ɵfac
}));


/***/ }),

/***/ 23225:
/*!******************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/user/user-localstorage.service.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserLocalstorageService: () => (/* binding */ UserLocalstorageService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 69717);

var _UserLocalstorageService;

class UserLocalstorageService {
  getUserToken() {
    return null;
  }
  getAccessToken() {
    return null;
  }
  setUserToken(token) {
    localStorage.removeItem(UserLocalstorageService.CURRENT_USER_KEY);
  }
  removeUserToken() {
    localStorage.removeItem(UserLocalstorageService.CURRENT_USER_KEY);
  }
}
_UserLocalstorageService = UserLocalstorageService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserLocalstorageService, "CURRENT_USER_KEY", 'currentUser');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserLocalstorageService, "ACCESS_TOKEN_KEY", 'access_token');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserLocalstorageService, "\u0275fac", function UserLocalstorageService_Factory(t) {
  return new (t || _UserLocalstorageService)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserLocalstorageService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _UserLocalstorageService,
  factory: _UserLocalstorageService.ɵfac
}));


/***/ }),

/***/ 66802:
/*!*****************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/user/user.service.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserService: () => (/* binding */ UserService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 68075);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 51349);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 65821);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 98945);
/* harmony import */ var src_app_shared_constants_activity_factor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/constants/activity-factor */ 48547);
/* harmony import */ var src_app_shared_constants_sex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/constants/sex */ 97664);
/* harmony import */ var src_app_shared_models_macros_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/models/macros-data */ 41805);
/* harmony import */ var src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/constants/steps */ 2923);
/* harmony import */ var _utils_body_metrics_util__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../utils/body-metrics.util */ 16703);
/* harmony import */ var _user_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user-api.service */ 81243);

var _UserService;











class UserService {
  // Getter sincrónico para acceso directo al valor
  get getLocalUser() {
    return this._localUser();
  }
  // Setter para actualizar el usuario
  set setLocalUser(user) {
    this._localUser.set(user);
  }
  constructor(userAPIService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "userAPIService", void 0);
    // Signal para el usuario local
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_localUser", (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.signal)(null));
    // Signal de solo lectura
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "localUser", (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.computed)(() => this._localUser()));
    // Observable para compatibilidad con código existente
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "getLocalUser$", (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_8__.toObservable)(this._localUser));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "SEX_TYPES", src_app_shared_constants_sex__WEBPACK_IMPORTED_MODULE_2__.SEX_TYPES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "MACROS_VALUES", src_app_shared_models_macros_data__WEBPACK_IMPORTED_MODULE_3__.MACROS_VALUES);
    this.userAPIService = userAPIService;
  }
  getUserByEmail(email) {
    return this.userAPIService.getUserByEmail(email).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1));
  }
  checkEmail(email) {
    return this.userAPIService.checkEmail(email).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1), source => source.pipe(obs => {
      return new rxjs__WEBPACK_IMPORTED_MODULE_10__.Observable(subscriber => {
        const sub = obs.subscribe({
          next: res => {
            try {
              let exists = false;
              if (typeof res === 'boolean') {
                exists = res;
              } else if (typeof res === 'string') {
                const s = res.trim().toLowerCase();
                exists = s === 'true' || s === '1' || s === 'yes';
              } else if (res && typeof res === 'object') {
                if (typeof res.exists === 'boolean') exists = res.exists;else if (typeof res.found === 'boolean') exists = res.found;else if (typeof res.emailExist === 'boolean') exists = res.emailExist;else if (res._id || res.email) exists = true;else exists = false;
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
          }
        });
        return () => sub.unsubscribe();
      });
    }));
  }
  createUser(user, date) {
    const userWithMacros = this.setUserMacrosAndKcal(user);
    return this.userAPIService.createUser(userWithMacros, date).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.tap)(createdUser => this.setLocalUser = createdUser));
  }
  createProfessionalUser(payload) {
    return this.userAPIService.createProfessionalUser(payload).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.tap)(createdUser => this.setLocalUser = createdUser));
  }
  createGoogleUser(user, date, tokenGoogle) {
    return this.userAPIService.createGoogleUser(user, date, tokenGoogle).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1));
  }
  updateUser(user) {
    const {
      kcalTotal,
      proteinsGTotal,
      carbohydratesGTotal,
      fatGTotal,
      ...cleanUser
    } = user;
    return this.userAPIService.updateUser({
      ...cleanUser,
      _id: user._id
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.tap)(updatedUser => this.setLocalUser = updatedUser));
  }
  updateGoogleUser(user) {
    const userWithMacros = this.setUserMacrosAndKcal(user);
    return this.userAPIService.updateGoogleUser(userWithMacros).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.tap)(updatedUser => this.setLocalUser = updatedUser.user));
  }
  createAppleUser(user, date, tokenApple) {
    return this.userAPIService.createAppleUser(user, date, tokenApple).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1));
  }
  updateAppleUser(user) {
    const userWithMacros = this.setUserMacrosAndKcal(user);
    return this.userAPIService.updateAppleUser(userWithMacros).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.tap)(updatedUser => this.setLocalUser = updatedUser.user));
  }
  playStopDiet(idUser, idDietInUse) {
    return this.userAPIService.playStopDiet(idUser, idDietInUse);
  }
  searchArchivedsByFilter(searchFilters) {
    return this.userAPIService.searchArchivedsByFilter(searchFilters);
  }
  searchUsers(page, search, filters) {
    return this.userAPIService.searchUsers(page, search, filters).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1));
  }
  checkHash(id, hash) {
    return this.userAPIService.checkHash(id, hash);
  }
  clearUserHash(id) {
    return this.userAPIService.clearUserHash(id).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1));
  }
  addFavoriteProduct(idUser, idProduct) {
    return this.userAPIService.addFavoriteProduct(idUser, idProduct);
  }
  sendSuggestions(email, suggestions) {
    return this.userAPIService.sendSuggestions(email, suggestions).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1));
  }
  deleteById(id) {
    return this.userAPIService.deleteById(id);
  }
  verifyPassword(password) {
    return this.userAPIService.verifyPassword(password).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1));
  }
  sendMailCode(email) {
    return this.userAPIService.sendMailCode(email).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1));
  }
  checkRestoreCode(email, password, hash) {
    return this.userAPIService.checkRestoreCode(email, password, hash).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1));
  }
  setUserMacrosAndKcal(user) {
    const finalWeight = this.getFinalWeight(user);
    const u = user;
    const energyExp = this.energyExpenditure(this.mifflinStJeorBMR(user.sex, user.height, finalWeight, this.getAge(user.birth)), user.activity, user.steps, user.training);
    const proteinGT = this.proteinsGTotal(user.objetive, finalWeight, user.sex);
    const fatGT = this.fatGTotal(user.objetive, finalWeight, user.sex);
    u.kcalTotal = this.calculateKcal(user);
    u.proteinsGTotal = parseFloat(proteinGT.toFixed(2));
    u.fatGTotal = parseFloat(fatGT.toFixed(2));
    u.carbohydratesGTotal = parseFloat(this.carbohydratesGTotal(energyExp, user.objetive, proteinGT, fatGT).toFixed(2));
    return user;
  }
  calculateKcal(user) {
    const finalWeight = this.getFinalWeight(user);
    const energyExp = this.energyExpenditure(this.mifflinStJeorBMR(user.sex, user.height, finalWeight, this.getAge(user.birth)), user.activity, user.steps, user.training);
    return Math.round(this.kcalTotal(energyExp, user.objetive));
  }
  getFinalWeight(user) {
    let finalWeight = user.weight;
    if (this.getIMC(user.weight, user.height) >= 30) finalWeight = this.getIdealAdjustedWeight(this.getIdealWeight(user.height, user.sex), user.weight);
    return finalWeight;
  }
  getIdealAdjustedWeight(idealWeight, weight) {
    return idealWeight + 0.4 * (weight - idealWeight);
  }
  getIMC(weight, height) {
    return weight / (height / 100) ** 2;
  }
  getIdealWeight(height, sex) {
    return (sex === src_app_shared_constants_sex__WEBPACK_IMPORTED_MODULE_2__.SEX_TYPES.male ? 50 : 45.5) + 0.91 * (height - 152.4);
  }
  /**
   * Metabolismo basal por Mifflin-St Jeor (1990).
   *
   * Movimiento 3 Coach Pro — la fórmula ya no vive aquí: se movió a
   * utils/body-metrics.util.ts al necesitarla también la calculadora del
   * entrenador. Copiarla habría dejado dos versiones de la misma cuenta que
   * se desincronizan a la primera corrección, y con ellas dos objetivos
   * calóricos distintos para la misma persona según quién mire.
   *
   * Este método se queda como adaptador: bmrMifflinStJeor devuelve null si
   * le faltan datos, y todo lo de aquí abajo espera un número (el flujo de
   * alta ya obliga a rellenar peso, altura y fecha de nacimiento antes de
   * llegar).
   */
  mifflinStJeorBMR(sex, height, weight, age) {
    return (0,_utils_body_metrics_util__WEBPACK_IMPORTED_MODULE_5__.bmrMifflinStJeor)({
      weightKg: weight,
      heightCm: height,
      age,
      sex
    }) ?? 0;
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
  energyExpenditure(bm, activity, steps, training) {
    // Si no se cuentan pasos (valor 1 según STEPS_TYPES.notCounted)
    // se debe usar el factor de actividad multiplicado por el de entrenamiento
    if (steps === src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_4__.STEPS[src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_4__.STEPS_TYPES.notCounted].value) {
      return bm * (activity || 1.2) * training;
    }
    // Si hay pasos, el valor 'training' ya combina pasos (NEAT) + días entrenamiento (TEA)
    return bm * training;
  }
  kcalTotal(energyExpenditure, objetive) {
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
  proteinsGTotal(objetive, weight, sex) {
    let range;
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
  carbohydratesGTotal(energyExpenditure, objetive, proteinWeight, fatWeight) {
    return this.carbohydratesKcalTotal(energyExpenditure, objetive, proteinWeight, fatWeight) / this.MACROS_VALUES.carbohydrates;
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
  fatGTotal(objetive, weight, sex) {
    let range;
    const isFemale = sex === src_app_shared_constants_sex__WEBPACK_IMPORTED_MODULE_2__.SEX_TYPES.female;
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
  carbohydratesKcalTotal(energyExpenditure, objetive, proteinWeight, fatWeight) {
    return this.kcalTotal(energyExpenditure, objetive) - (proteinWeight * this.MACROS_VALUES.proteins + fatWeight * this.MACROS_VALUES.fat);
  }
  getAge(birthDate) {
    return Math.floor(Math.abs(Date.now() - new Date(birthDate).getTime()) / (1000 * 3600 * 24) / 365.25);
  }
  getActivityFactor(activityValue) {
    return src_app_shared_constants_activity_factor__WEBPACK_IMPORTED_MODULE_1__.ACTIVITY_FACTOR_VALUES.find(f => f.value === activityValue);
  }
  activateAccount(email, code) {
    return this.userAPIService.activateAccount(email, code);
  }
  resendActivationCode(email) {
    return this.userAPIService.resendActivationCode(email).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.take)(1));
  }
}
_UserService = UserService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserService, "\u0275fac", function UserService_Factory(t) {
  return new (t || _UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_user_api_service__WEBPACK_IMPORTED_MODULE_6__.UserAPIService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: _UserService,
  factory: _UserService.ɵfac
}));


/***/ }),

/***/ 36718:
/*!*******************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/util/ad-mob.service.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdMobService: () => (/* binding */ AdMobService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor-community/admob */ 45307);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/core */ 44599);
/* harmony import */ var _user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../user/user.service */ 66802);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 45398);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment */ 17762);
/* harmony import */ var _billing_billing_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../billing/billing.service */ 58854);
/* harmony import */ var src_app_app_shell_config__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/app-shell.config */ 21394);


var _AdMobService;









class AdMobService {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ID_ANDROID_INTERSTITIAL_DEFAULT", 'ca-app-pub-7032025540653355/1755796410');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ID_IOS_INTERSTITIAL_DEFAULT", 'ca-app-pub-7032025540653355/5874037227');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "INTERSTITIAL_ANDROID", {
      start_statistics: 'ca-app-pub-7032025540653355/9245951775',
      start_workout: 'ca-app-pub-7032025540653355/4185196788',
      save_nutrition: 'ca-app-pub-7032025540653355/6811360120',
      create_routine: 'ca-app-pub-7032025540653355/8253703220',
      create_product: 'ca-app-pub-7032025540653355/9577124267',
      create_exercise: 'ca-app-pub-7032025540653355/1935706881',
      create_recipe: 'ca-app-pub-7032025540653355/1879866567',
      acquire_routine: 'ca-app-pub-7032025540653355/9629095154',
      profile_start: 'ca-app-pub-7032025540653355/4314458216',
      rm_calculator: 'ca-app-pub-7032025540653355/1114289586'
    });
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "INTERSTITIAL_IOS", {
      start_statistics: 'ca-app-pub-7032025540653355/2193458263',
      start_workout: 'ca-app-pub-7032025540653355/4085124438',
      save_nutrition: 'ca-app-pub-7032025540653355/7337973738',
      create_routine: 'ca-app-pub-7032025540653355/7832797754',
      create_product: 'ca-app-pub-7032025540653355/9768695959',
      create_exercise: 'ca-app-pub-7032025540653355/8699156867',
      create_recipe: 'ca-app-pub-7032025540653355/4753441916',
      acquire_routine: 'ca-app-pub-7032025540653355/2238959219',
      profile_start: 'ca-app-pub-7032025540653355/5874037227',
      rm_calculator: 'ca-app-pub-7032025540653355/5464185440'
    });
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "userService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.inject)(_user_user_service__WEBPACK_IMPORTED_MODULE_4__.UserService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "billingService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.inject)(_billing_billing_service__WEBPACK_IMPORTED_MODULE_6__.BillingService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_platform", (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.inject)(_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.Platform));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "useTestAds", !src_environments_environment__WEBPACK_IMPORTED_MODULE_5__.environment.production);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "diagnosticLoggingEnabled", !src_environments_environment__WEBPACK_IMPORTED_MODULE_5__.environment.production || Boolean(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__.environment.adMob?.diagnostics));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "initializing", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "canRequestAds", true);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "adMobListeners", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "profileStartInFlight", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "lastProfileStartAt", 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "activeInterstitialRequest", null);
    // App de entrenadores/gestión — sin anuncios (APP_SHELL_CONFIG.adsEnabled
    // = false ahí): sin este guard, el constructor de este servicio (inyectado
    // en más de una decena de páginas compartidas — nutrition-editor,
    // config-exercise, create-product...) llamaba a AdMob.initialize() en
    // TODAS las apps por igual, disparando el warning nativo "Google Mobile
    // Ads SDK was initialized without an application ID" (esas apps no
    // declaran GADApplicationIdentifier en su Info.plist, a propósito) y el
    // prompt de tracking (ATT) de iOS, ninguno de los dos con sentido fuera
    // del cliente free con anuncios.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "adsEnabled", src_app_app_shell_config__WEBPACK_IMPORTED_MODULE_7__.APP_SHELL_CONFIG.adsEnabled !== false);
    if (!this.adsEnabled) {
      return;
    }
    this.initAdMobEventLogging();
    this.initialize();
  }
  interstitial() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (placement = 'default') {
      if (!_this.adsEnabled) {
        return;
      }
      const profileGuardEnabled = placement === 'profile_start';
      if (profileGuardEnabled && !_this.reserveProfileStartSlot()) {
        return;
      }
      try {
        if (!_capacitor_core__WEBPACK_IMPORTED_MODULE_3__.Capacitor.isNativePlatform()) {
          _this.logAdEvent('debug', 'interstitial_skipped_non_native', {
            placement
          });
          return;
        }
        yield _this.initializing;
        const user = _this.userService.getLocalUser;
        if (!user || !_this.shouldShowAds(user)) {
          _this.logAdEvent('debug', 'interstitial_skipped_user_state', {
            placement,
            hasUser: Boolean(user)
          });
          return;
        }
        if (!(yield _this.ensureAdsCanBeRequested(user, placement))) {
          return;
        }
        const adId = _this.getInterstitialAdId(placement);
        const options = {
          adId,
          isTesting: _this.useTestAds,
          npa: !user.personalAds
        };
        _this.activeInterstitialRequest = {
          placement,
          adId
        };
        _this.logAdEvent('info', 'interstitial_prepare_start', {
          placement,
          adUnit: _this.getAdUnitSuffix(adId),
          npa: options.npa,
          isTesting: options.isTesting
        });
        yield _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.AdMob.prepareInterstitial(options);
        _this.logAdEvent('info', 'interstitial_show_start', {
          placement,
          adUnit: _this.getAdUnitSuffix(adId)
        });
        yield _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.AdMob.showInterstitial();
      } catch (error) {
        _this.logAdEvent('error', 'interstitial_request_failed', {
          placement
        }, error);
        throw error;
      } finally {
        if (profileGuardEnabled) {
          _this.profileStartInFlight = false;
        }
      }
    }).apply(this, arguments);
  }
  interstitialCapgo() {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this2.interstitial('acquire_routine');
    })();
  }
  reserveProfileStartSlot() {
    const now = Date.now();
    if (this.profileStartInFlight) {
      this.logAdEvent('debug', 'profile_start_skipped_in_flight');
      return false;
    }
    if (now - this.lastProfileStartAt < 10000) {
      this.logAdEvent('debug', 'profile_start_skipped_throttle');
      return false;
    }
    this.profileStartInFlight = true;
    this.lastProfileStartAt = now;
    return true;
  }
  initAdMobEventLogging() {
    if (!_capacitor_core__WEBPACK_IMPORTED_MODULE_3__.Capacitor.isNativePlatform()) {
      return;
    }
    this.registerAdMobListener(_capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.AdMob.addListener(_capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.InterstitialAdPluginEvents.Loaded, info => {
      this.logAdEvent('info', 'interstitial_loaded', {
        ...this.getActiveInterstitialLogContext(),
        loadedAdUnit: this.getAdUnitSuffix(info?.adUnitId)
      });
    }), _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.InterstitialAdPluginEvents.Loaded);
    this.registerAdMobListener(_capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.AdMob.addListener(_capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.InterstitialAdPluginEvents.FailedToLoad, error => {
      this.logAdEvent('error', 'interstitial_failed_to_load', this.getActiveInterstitialLogContext(), error);
    }), _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.InterstitialAdPluginEvents.FailedToLoad);
    this.registerAdMobListener(_capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.AdMob.addListener(_capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.InterstitialAdPluginEvents.Showed, () => {
      this.logAdEvent('info', 'interstitial_showed', this.getActiveInterstitialLogContext());
    }), _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.InterstitialAdPluginEvents.Showed);
    this.registerAdMobListener(_capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.AdMob.addListener(_capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.InterstitialAdPluginEvents.FailedToShow, error => {
      this.logAdEvent('error', 'interstitial_failed_to_show', this.getActiveInterstitialLogContext(), error);
    }), _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.InterstitialAdPluginEvents.FailedToShow);
    this.registerAdMobListener(_capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.AdMob.addListener(_capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.InterstitialAdPluginEvents.Dismissed, () => {
      this.logAdEvent('info', 'interstitial_dismissed', this.getActiveInterstitialLogContext());
    }), _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.InterstitialAdPluginEvents.Dismissed);
  }
  registerAdMobListener(registration, eventName) {
    void registration.then(listener => this.adMobListeners.push(listener)).catch(error => {
      this.logAdEvent('warn', 'admob_listener_registration_failed', {
        eventName
      }, error);
    });
  }
  initialize() {
    if (!this.initializing) {
      this.initializing = this.doInitialize();
    }
    return this.initializing;
  }
  doInitialize() {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.AdMob.initialize();
        _this3.logAdEvent('info', 'sdk_initialized', {
          isTesting: _this3.useTestAds
        });
        const consentInfo = yield _this3.requestConsentInfo('initialize');
        yield _this3.presentConsentFormIfRequired(consentInfo, 'initialize');
        yield _this3.requestTrackingAuthorizationIfNeeded();
      } catch (error) {
        _this3.logAdEvent('error', 'sdk_initialize_failed', {}, error);
      }
    })();
  }
  consent(user) {
    var _this4 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const consentInfo = yield _this4.requestConsentInfo('user_consent');
      const resolvedConsentInfo = yield _this4.presentConsentFormIfRequired(consentInfo, 'user_consent');
      const personalAds = user.personalAds === undefined ? _this4.getDefaultPersonalAdsPreference(resolvedConsentInfo) : Boolean(user.personalAds);
      _this4.userService.setLocalUser = {
        ...user,
        personalAds
      };
      return _this4.canRequestAds;
    })();
  }
  ensureAdsCanBeRequested(user, source) {
    var _this5 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (user.personalAds === undefined || !_this5.canRequestAds) {
        yield _this5.consent(user);
      }
      if (!_this5.canRequestAds) {
        _this5.logAdEvent('warn', 'ad_request_blocked_by_consent', {
          source
        });
        return false;
      }
      return true;
    })();
  }
  requestConsentInfo(reason) {
    var _this6 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const consentInfo = yield _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.AdMob.requestConsentInfo();
        _this6.updateCanRequestAds(consentInfo, reason);
        return consentInfo;
      } catch (error) {
        _this6.logAdEvent('warn', 'consent_info_request_failed', {
          reason
        }, error);
        return null;
      }
    })();
  }
  presentConsentFormIfRequired(consentInfo, reason) {
    var _this7 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!consentInfo) {
        return null;
      }
      if (consentInfo.isConsentFormAvailable && consentInfo.status === _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.AdmobConsentStatus.REQUIRED) {
        try {
          const updatedConsentInfo = yield _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.AdMob.showConsentForm();
          _this7.updateCanRequestAds(updatedConsentInfo, `${reason}_form`);
          return updatedConsentInfo;
        } catch (error) {
          _this7.logAdEvent('warn', 'consent_form_failed', {
            reason
          }, error);
          return consentInfo;
        }
      }
      return consentInfo;
    })();
  }
  updateCanRequestAds(consentInfo, reason) {
    if (typeof consentInfo.canRequestAds === 'boolean') {
      this.canRequestAds = consentInfo.canRequestAds;
    }
    this.logAdEvent('debug', 'consent_state', {
      reason,
      status: consentInfo.status,
      canRequestAds: this.canRequestAds,
      isConsentFormAvailable: Boolean(consentInfo.isConsentFormAvailable),
      privacyOptionsRequirementStatus: consentInfo.privacyOptionsRequirementStatus || null
    });
  }
  requestTrackingAuthorizationIfNeeded() {
    var _this8 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_capacitor_core__WEBPACK_IMPORTED_MODULE_3__.Capacitor.getPlatform() !== 'ios') {
        return;
      }
      try {
        const trackingInfo = yield _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.AdMob.trackingAuthorizationStatus();
        if (trackingInfo.status === 'notDetermined') {
          yield _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.AdMob.requestTrackingAuthorization();
        }
        const authorizationStatus = yield _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.AdMob.trackingAuthorizationStatus();
        _this8.logAdEvent('info', 'tracking_authorization_status', {
          status: authorizationStatus.status
        });
      } catch (error) {
        _this8.logAdEvent('warn', 'tracking_authorization_failed', {}, error);
      }
    })();
  }
  getDefaultPersonalAdsPreference(consentInfo) {
    return consentInfo?.status === _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.AdmobConsentStatus.OBTAINED || consentInfo?.status === _capacitor_community_admob__WEBPACK_IMPORTED_MODULE_2__.AdmobConsentStatus.NOT_REQUIRED;
  }
  getInterstitialAdId(placement) {
    if (placement === 'default') {
      return this._platform.is('ios') ? this.ID_IOS_INTERSTITIAL_DEFAULT : this.ID_ANDROID_INTERSTITIAL_DEFAULT;
    }
    return this._platform.is('ios') ? this.INTERSTITIAL_IOS[placement] : this.INTERSTITIAL_ANDROID[placement];
  }
  shouldShowAds(user) {
    if (!user) {
      return false;
    }
    const cachedEntitlements = this.billingService.getCachedEntitlements();
    if (typeof cachedEntitlements?.adsEnabled === 'boolean') {
      return cachedEntitlements.adsEnabled;
    }
    return !Boolean(user?.premium?.entitled);
  }
  getActiveInterstitialLogContext() {
    return {
      placement: this.activeInterstitialRequest?.placement || null,
      adUnit: this.getAdUnitSuffix(this.activeInterstitialRequest?.adId)
    };
  }
  getAdUnitSuffix(adId) {
    if (!adId) {
      return null;
    }
    const separatorIndex = adId.lastIndexOf('/');
    return separatorIndex >= 0 ? adId.slice(separatorIndex + 1) : adId;
  }
  logAdEvent(level, event, context = {}, error) {
    if ((level === 'debug' || level === 'info') && !this.diagnosticLoggingEnabled) {
      return;
    }
    const payload = {
      event,
      platform: _capacitor_core__WEBPACK_IMPORTED_MODULE_3__.Capacitor.getPlatform(),
      production: src_environments_environment__WEBPACK_IMPORTED_MODULE_5__.environment.production,
      ...context
    };
    const message = `[AdMob] ${event}`;
    const errorSummary = error ? this.getErrorSummary(error) : undefined;
    if (level === 'debug') {
      console.debug(message, payload, errorSummary || '');
      return;
    }
    if (level === 'info') {
      console.info(message, payload, errorSummary || '');
      return;
    }
    if (level === 'warn') {
      console.warn(message, payload, errorSummary || '');
      return;
    }
    console.error(message, payload, errorSummary || '');
  }
  getErrorSummary(error) {
    const maybeError = error;
    return {
      code: maybeError?.code ?? null,
      message: maybeError?.message ?? String(error)
    };
  }
}
_AdMobService = AdMobService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(AdMobService, "\u0275fac", function AdMobService_Factory(t) {
  return new (t || _AdMobService)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(AdMobService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjectable"]({
  token: _AdMobService,
  factory: _AdMobService.ɵfac
}));


/***/ }),

/***/ 75822:
/*!*****************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/util/bar-code-scanner.service.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BarCodeScannerService: () => (/* binding */ BarCodeScannerService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _capacitor_barcode_scanner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/barcode-scanner */ 51110);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/core */ 44599);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_util_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ionic-util.service */ 37057);


var _BarCodeScannerService;





class BarCodeScannerService {
  get translate() {
    if (!this._translate) {
      this._translate = this.injector.get(_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateService);
    }
    return this._translate;
  }
  constructor(ionicUtilService, injector) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "injector", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "flashEnabled", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_translate", null);
    this.ionicUtilService = ionicUtilService;
    this.injector = injector;
  }
  startScanner() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        if (!_capacitor_core__WEBPACK_IMPORTED_MODULE_3__.Capacitor.isNativePlatform() && !_this.isSecureOrigin()) {
          yield _this.ionicUtilService.showAlert({
            header: _this.translate.instant('BARCODE.CAMERA_BLOCKED'),
            message: _this.translate.instant('BARCODE.CAMERA_BLOCKED_MSG'),
            buttons: [_this.translate.instant('COMMON.OK')]
          });
        }
        const result = yield _capacitor_barcode_scanner__WEBPACK_IMPORTED_MODULE_2__.CapacitorBarcodeScanner.scanBarcode({
          hint: _capacitor_barcode_scanner__WEBPACK_IMPORTED_MODULE_2__.CapacitorBarcodeScannerTypeHint.ALL,
          scanInstructions: _this.translate.instant('BARCODE.SCAN_INSTRUCTIONS'),
          scanButton: false,
          scanText: ' ',
          cameraDirection: _capacitor_barcode_scanner__WEBPACK_IMPORTED_MODULE_2__.CapacitorBarcodeScannerCameraDirection.BACK,
          scanOrientation: _capacitor_barcode_scanner__WEBPACK_IMPORTED_MODULE_2__.CapacitorBarcodeScannerScanOrientation.ADAPTIVE,
          android: {
            scanningLibrary: _capacitor_barcode_scanner__WEBPACK_IMPORTED_MODULE_2__.CapacitorBarcodeScannerAndroidScanningLibrary.ZXING
          },
          web: {
            // Permitir elegir cámara en web (p.ej. traseros en móviles)
            showCameraSelection: true,
            scannerFPS: 30
          }
        });
        // El plugin gestiona su propio ciclo de vida; no llamamos a stopScanner
        if (result && result.ScanResult) {
          return result.ScanResult;
        }
        // Sin resultados (no cancel): mostrar aviso con alerta de Ionic
        const alertOptions = {
          header: _this.translate.instant('COMMON.ERROR'),
          message: _this.translate.instant('BARCODE.NO_DATA'),
          buttons: [{
            text: _this.translate.instant('ACTIONS.ACCEPT'),
            cssClass: 'primary'
          }]
        };
        yield _this.ionicUtilService.showAlert(alertOptions);
        return undefined;
      } catch (error) {
        const msg = error && error.message || '';
        if (/cancel/i.test(msg)) {
          return undefined;
        }
        const alertOptions = {
          header: _this.translate.instant('COMMON.ERROR'),
          message: msg || _this.translate.instant('BARCODE.CAMERA_ERROR'),
          buttons: [{
            text: _this.translate.instant('ACTIONS.ACCEPT'),
            cssClass: 'primary'
          }]
        };
        yield _this.ionicUtilService.showAlert(alertOptions);
        return undefined;
      }
    })();
  }
  toggleFlash(enabled) {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // El plugin @capacitor/barcode-scanner no expone control de flash de forma universal.
      // Notificamos al usuario y mantenemos el estado local para el icono.
      _this2.flashEnabled = enabled;
      const alertOptions = {
        header: _this2.translate.instant('COMMON.INFORMATION'),
        message: _this2.translate.instant('BARCODE.FLASH_UNAVAILABLE'),
        buttons: [{
          text: _this2.translate.instant('ACTIONS.ACCEPT'),
          cssClass: 'primary'
        }]
      };
      yield _this2.ionicUtilService.showAlert(alertOptions);
    })();
  }
  getFlashStatus() {
    return this.flashEnabled;
  }
  scanFromGallery() {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        console.log('Función de galería no implementada en este plugin');
        const alertOptions = {
          header: _this3.translate.instant('COMMON.INFORMATION'),
          message: _this3.translate.instant('BARCODE.GALLERY_UNAVAILABLE'),
          buttons: [{
            text: _this3.translate.instant('ACTIONS.ACCEPT'),
            cssClass: 'primary'
          }]
        };
        yield _this3.ionicUtilService.showAlert(alertOptions);
        return null;
      } catch (error) {
        console.error('Error al acceder a la galería:', error);
        const alertOptions = {
          header: _this3.translate.instant('COMMON.ERROR'),
          message: _this3.translate.instant('BARCODE.GALLERY_ERROR'),
          buttons: [{
            text: _this3.translate.instant('ACTIONS.ACCEPT'),
            cssClass: 'primary'
          }]
        };
        yield _this3.ionicUtilService.showAlert(alertOptions);
        return null;
      }
    })();
  }
  isSecureOrigin() {
    try {
      const isSecure = window.isSecureContext;
      const protocolSecure = location.protocol === 'https:';
      const host = location.hostname || '';
      const isLocal = host === 'localhost' || host === '127.0.0.1' || host.endsWith('.local');
      return !!(isSecure || protocolSecure || isLocal);
    } catch {
      return false;
    }
  }
}
_BarCodeScannerService = BarCodeScannerService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(BarCodeScannerService, "\u0275fac", function BarCodeScannerService_Factory(t) {
  return new (t || _BarCodeScannerService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_ionic_util_service__WEBPACK_IMPORTED_MODULE_4__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.Injector));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(BarCodeScannerService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: _BarCodeScannerService,
  factory: _BarCodeScannerService.ɵfac
}));


/***/ }),

/***/ 46817:
/*!***********************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/util/day-weight.service.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DayWeightService: () => (/* binding */ DayWeightService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 69717);

var _DayWeightService;

class DayWeightService {
  constructor() {}
  getDayWeights(dietDays) {
    // TODO: Sacar a variable
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const dayWeights = [];
    for (const dietDay of dietDays) {
      const parsedDate = new Date(dietDay.date);
      const dayWeight = {
        date: parsedDate,
        weight: dietDay.weight,
        name: days[parsedDate.getDay()],
        notes: dietDay.notes,
        meals: dietDay.meals
      };
      dayWeights.push(dayWeight);
    }
    return dayWeights;
  }
}
_DayWeightService = DayWeightService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DayWeightService, "\u0275fac", function DayWeightService_Factory(t) {
  return new (t || _DayWeightService)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DayWeightService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _DayWeightService,
  factory: _DayWeightService.ɵfac
}));


/***/ }),

/***/ 54547:
/*!**************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/util/error-handler.service.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ErrorHandlerService: () => (/* binding */ ErrorHandlerService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 69717);

var _ErrorHandlerService;

/**
 * Servicio para extraer y formatear mensajes de error del backend
 * Maneja diferentes formatos de respuesta de error HTTP
 */
class ErrorHandlerService {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "unexpectedMessage", 'Ha ocurrido un error inesperado');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "connectionMessage", 'No se pudo conectar. Inténtalo de nuevo');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "unsafeMessagePattern", /(\/api\/|https?:\/\/|Http failure response|stack|trace|TypeError|ReferenceError|SyntaxError|AxiosError|Mongo(Error|ServerError)?|CastError|ECONN|ETIMEDOUT|ENOTFOUND|Cannot\s)/i);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "sensitiveAuthPattern", /(contraseña incorrecta|correo no encontrado|usuario (no existe|inexistente|no encontrado))/i);
  }
  /**
   * Extrae un mensaje de error legible de una respuesta de error HTTP o cualquier error
   * @param error - El objeto de error (HttpErrorResponse, string, object, etc.)
   * @returns Un mensaje de error legible para mostrar al usuario
   */
  getErrorMessage(error) {
    const status = this.getStatus(error);
    if (status === 0) {
      return this.connectionMessage;
    }
    if (status && status >= 500) {
      return this.unexpectedMessage;
    }
    const extractedMessage = this.extractMessage(error);
    if (extractedMessage && !this.isUnsafeMessage(extractedMessage)) {
      return extractedMessage;
    }
    if (status) {
      return this.getDefaultErrorByStatus(status);
    }
    return this.unexpectedMessage;
  }
  extractMessage(error) {
    if (typeof error === 'string') {
      return error;
    }
    if (typeof error?.error === 'object' && error.error?.message) {
      return error.error.message;
    }
    if (typeof error?.error === 'string') {
      return error.error;
    }
    if (typeof error?.message === 'string') {
      return error.message;
    }
    if (typeof error?.statusMessage === 'string') {
      return error.statusMessage;
    }
    return null;
  }
  getStatus(error) {
    const status = Number(error?.status ?? error?.error?.status);
    return Number.isFinite(status) ? status : undefined;
  }
  isUnsafeMessage(message) {
    return this.unsafeMessagePattern.test(message) || this.sensitiveAuthPattern.test(message);
  }
  /**
   * Obtiene un mensaje de error predefinido según el código HTTP
   */
  getDefaultErrorByStatus(status) {
    const errorMessages = {
      400: 'Solicitud inválida. Verifica los datos.',
      401: 'No autorizado. Inicia sesión de nuevo.',
      402: 'No se proporcionó token.',
      403: 'No tienes permiso para acceder a esto.',
      404: 'Recurso no encontrado.',
      409: 'Conflicto con los datos. Intenta de nuevo.',
      422: 'Datos inválidos. Verifica los campos.',
      429: 'Demasiadas solicitudes. Espera un momento.',
      500: this.unexpectedMessage,
      502: this.unexpectedMessage,
      503: this.connectionMessage,
      504: 'La conexión tardó demasiado. Inténtalo de nuevo'
    };
    return errorMessages[status] || this.unexpectedMessage;
  }
  /**
   * Extrae el mensaje de error y lo formatea con prefijo
   * Útil para toasts con contexto adicional
   */
  getFormattedErrorMessage(error, defaultMessage) {
    const errorMsg = this.getErrorMessage(error);
    const extractedMessage = this.extractMessage(error);
    if (defaultMessage && (errorMsg === this.unexpectedMessage || !!extractedMessage && this.isUnsafeMessage(extractedMessage))) {
      return defaultMessage;
    }
    return errorMsg;
  }
  /**
   * Determina si es un error de autenticación
   */
  isAuthError(error) {
    return error?.status === 401 || error?.error?.requiresRelogin === true;
  }
  /**
   * Determina si es un error de validación
   */
  isValidationError(error) {
    return error?.status === 400 || error?.status === 422;
  }
  /**
   * Determina si es un error de servidor
   */
  isServerError(error) {
    return error?.status >= 500;
  }
  /**
   * Determina el color del toast según el tipo de error
   */
  getToastColorByError(error) {
    if (this.isAuthError(error)) {
      return 'warning';
    }
    if (this.isServerError(error)) {
      return 'danger';
    }
    if (this.isValidationError(error)) {
      return 'warning';
    }
    return 'danger';
  }
  /**
   * Determina el icono del toast según el tipo de error
   */
  getToastIconByError(error) {
    if (this.isAuthError(error)) {
      return 'lock-open-outline';
    }
    if (this.isServerError(error)) {
      return 'server-outline';
    }
    if (this.isValidationError(error)) {
      return 'alert-circle-outline';
    }
    return 'close-circle-outline';
  }
}
_ErrorHandlerService = ErrorHandlerService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ErrorHandlerService, "\u0275fac", function ErrorHandlerService_Factory(t) {
  return new (t || _ErrorHandlerService)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ErrorHandlerService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _ErrorHandlerService,
  factory: _ErrorHandlerService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 37057:
/*!***********************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/util/ionic-util.service.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IonicUtilService: () => (/* binding */ IonicUtilService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ 44599);
/* harmony import */ var _capgo_capacitor_navigation_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capgo/capacitor-navigation-bar */ 58175);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 45398);
/* harmony import */ var _error_handler_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./error-handler.service */ 54547);


var _IonicUtilService;






class IonicUtilService {
  get translate() {
    if (!this._translate) {
      this._translate = this.injector.get(_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateService);
    }
    return this._translate;
  }
  constructor(actionSheetController, popoverController, alertController, toastController, modalController, loadingController, pickerController, platform, errorHandlerService, injector) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "actionSheetController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "popoverController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "alertController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "toastController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "loadingController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "pickerController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "platform", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "errorHandlerService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "injector", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "loading", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_translate", null);
    this.actionSheetController = actionSheetController;
    this.popoverController = popoverController;
    this.alertController = alertController;
    this.toastController = toastController;
    this.modalController = modalController;
    this.loadingController = loadingController;
    this.pickerController = pickerController;
    this.platform = platform;
    this.errorHandlerService = errorHandlerService;
    this.injector = injector;
    this.configureStatusBar();
  }
  showModal(modalOptions) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const showModal = yield _this.modalController.create({
        component: modalOptions.component,
        componentProps: modalOptions.componentProps,
        cssClass: modalOptions.cssClass,
        initialBreakpoint: modalOptions.initialBreakpoint,
        breakpoints: modalOptions.breakpoints,
        animated: true
      });
      showModal.present();
      return showModal.onDidDismiss();
    })();
  }
  closeModal() {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this2.modalController.dismiss();
    })();
  }
  showPicker(options) {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const picker = yield _this3.pickerController.create({
        columns: options.columns,
        buttons: options.buttons || [{
          text: _this3.translate.instant('COMMON.CANCEL'),
          role: 'cancel'
        }, {
          text: _this3.translate.instant('COMMON.OK')
        }],
        mode: options.mode || 'ios',
        cssClass: options.cssClass,
        animated: true
      });
      yield picker.present();
      return picker.onDidDismiss();
    })();
  }
  showAlert(alert) {
    var _this4 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // Si el alert tiene inputs, asegurar que el primero tenga autofocus
      const normalizedInputs = alert.inputs && alert.inputs.length > 0 ? alert.inputs.map((inp, idx) => {
        if (idx === 0) {
          return {
            ...inp,
            attributes: {
              ...(inp?.attributes || {}),
              autofocus: true,
              appCursorEnd: true
            }
          };
        }
        return inp;
      }) : alert.inputs;
      const showAlert = yield _this4.alertController.create({
        cssClass: alert.cssClass ? `custom-alert ${alert.cssClass}` : 'custom-alert',
        header: alert.header,
        message: alert.message,
        buttons: alert.buttons,
        inputs: normalizedInputs,
        animated: true,
        backdropDismiss: false
      });
      yield showAlert.present();
      // Suscribir botón atrás nativo para cerrar el alert
      const backSub = _this4.platform.backButton.subscribeWithPriority(Number.MAX_SAFE_INTEGER, () => {
        try {
          showAlert.dismiss(undefined, 'cancel');
        } catch {}
      });
      // Intentar enfocar el primer input tras presentarlo con pequeños reintentos
      if (normalizedInputs && normalizedInputs.length > 0) {
        const tryFocus = () => {
          const el = document.querySelector('ion-alert textarea, ion-alert input, ion-alert .alert-input');
          if (el) {
            try {
              el.focus();
              const val = el.value ?? '';
              if (typeof val === 'string' && el.setSelectionRange) {
                el.setSelectionRange(val.length, val.length);
              }
            } catch {}
            return true;
          }
          return false;
        };
        let attempts = 0;
        const interval = setInterval(() => {
          if (tryFocus() || ++attempts >= 10) {
            clearInterval(interval);
          }
        }, 50);
      }
      const res = yield showAlert.onDidDismiss();
      backSub.unsubscribe?.();
      return res;
    })();
  }
  closeAlert() {
    var _this5 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const top = yield _this5.alertController.getTop();
        yield top?.dismiss(undefined, 'cancel');
      } catch {}
    })();
  }
  showActionSheet(actionSheet) {
    var _this6 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const showActionSheet = yield _this6.actionSheetController.create({
        header: actionSheet.header,
        cssClass: 'action-sheet-custom',
        buttons: actionSheet.buttons
      });
      showActionSheet.present();
      return showActionSheet.onDidDismiss();
    })();
  }
  showPopover(popover) {
    var _this7 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const showPopover = yield _this7.popoverController.create({
        component: popover.component,
        componentProps: popover.componentProps,
        event: popover.event,
        showBackdrop: true,
        mode: 'ios',
        animated: true
      });
      showPopover.present();
      return showPopover.onDidDismiss();
    })();
  }
  closePopover() {
    var _this8 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this8.popoverController.dismiss();
    })();
  }
  showToast(toast) {
    var _this9 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const cssClass = toast.cssClass ? Array.isArray(toast.cssClass) ? ['toast-safe-area', ...toast.cssClass] : `toast-safe-area ${toast.cssClass}` : 'toast-safe-area';
      const showToast = yield _this9.toastController.create({
        // Forward all provided options to respect platform differences
        message: toast.message,
        duration: toast.duration,
        position: toast.position || 'bottom',
        color: toast.color || 'tertiary',
        icon: toast.icon || 'information-circle-outline',
        buttons: toast.buttons || [{
          text: _this9.translate.instant('COMMON.OK'),
          role: 'cancel'
        }],
        // Ensure keyboard closes so bottom toasts aren't hidden behind it on mobile
        keyboardClose: true,
        // Apply a CSS class for any additional styling
        cssClass
      });
      showToast.present();
      return showToast.onDidDismiss();
    })();
  }
  showPremiumLimitAlert(options) {
    var _this0 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      return _this0.showAlert({
        header: options.header ?? _this0.translate.instant('PREMIUM.LIMIT_REACHED'),
        message: options.message,
        buttons: [{
          text: _this0.translate.instant('COMMON.CANCEL'),
          role: 'cancel'
        }, {
          text: _this0.translate.instant('PREMIUM.GO_PRO'),
          cssClass: 'alert-button-primary',
          handler: () => {
            void options.onUpgrade?.();
          }
        }]
      });
    })();
  }
  /**
   * Muestra un toast de error extrayendo automáticamente el mensaje del error
   * @param error - El objeto de error del backend o cualquier error
   * @param defaultMessage - Mensaje por defecto si no se puede extraer uno
   * @param duration - Duración en milisegundos (default 3000)
   */
  showErrorToast(_x) {
    var _this1 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (error, defaultMessage = 'Ocurrió un error',
    // kept as literal fallback, consumer should provide translated message
    duration = 3000) {
      const errorMessage = _this1.errorHandlerService.getFormattedErrorMessage(error, defaultMessage);
      const toastColor = _this1.errorHandlerService.getToastColorByError(error);
      const toastIcon = _this1.errorHandlerService.getToastIconByError(error);
      const showToast = yield _this1.toastController.create({
        message: errorMessage,
        duration,
        position: 'bottom',
        color: toastColor,
        icon: toastIcon,
        buttons: [{
          text: _this1.translate.instant('COMMON.OK'),
          role: 'cancel'
        }],
        keyboardClose: true,
        cssClass: 'toast-safe-area error-toast'
      });
      yield showToast.present();
    }).apply(this, arguments);
  }
  /**
   * Muestra un toast de éxito
   * @param message - Mensaje a mostrar
   * @param duration - Duración en milisegundos (default 2000)
   */
  showSuccessToast() {
    var _this10 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (message = _this10.translate.instant('COMMON.SUCCESS'), duration = 2000) {
      const showToast = yield _this10.toastController.create({
        message,
        duration,
        position: 'bottom',
        color: 'success',
        icon: 'checkmark-circle-outline',
        buttons: [{
          text: _this10.translate.instant('COMMON.OK'),
          role: 'cancel'
        }],
        keyboardClose: true,
        cssClass: 'toast-safe-area success-toast'
      });
      yield showToast.present();
    }).apply(this, arguments);
  }
  /**
   * Muestra un toast de advertencia
   * @param message - Mensaje a mostrar
   * @param duration - Duración en milisegundos (default 2500)
   */
  showWarningToast() {
    var _this11 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (message = _this11.translate.instant('COMMON.WARNING'), duration = 2500) {
      const showToast = yield _this11.toastController.create({
        message,
        duration,
        position: 'bottom',
        color: 'warning',
        icon: 'alert-circle-outline',
        buttons: [{
          text: _this11.translate.instant('COMMON.OK'),
          role: 'cancel'
        }],
        keyboardClose: true,
        cssClass: 'toast-safe-area warning-toast'
      });
      yield showToast.present();
    }).apply(this, arguments);
  }
  closePicker() {
    var _this12 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this12.pickerController.dismiss();
    })();
  }
  showLoading(options) {
    var _this13 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const loadingOptions = {
        message: options?.message ?? _this13.translate.instant('COMMON.LOADING'),
        spinner: options?.spinner ?? 'crescent',
        cssClass: options?.cssClass
      };
      _this13.loading = yield _this13.loadingController.create({
        message: loadingOptions.message,
        spinner: loadingOptions.spinner,
        cssClass: loadingOptions.cssClass,
        backdropDismiss: false
      });
      yield _this13.loading.present();
    })();
  }
  hideLoading() {
    var _this14 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this14.loading) {
        yield _this14.loading.dismiss();
        _this14.loading = null;
      }
    })();
  }
  scrollToBottom(content) {
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (content) {
        yield content.scrollToBottom(300);
      }
    })();
  }
  showNotes(title, content) {
    var _this15 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const alert = yield _this15.alertController.create({
        header: title,
        message: content || _this15.translate.instant('COMMON.NO_INFO'),
        buttons: [{
          text: _this15.translate.instant('COMMON.CERRAR'),
          role: 'cancel',
          cssClass: 'alert-button-primary'
        }],
        cssClass: 'custom-alert notes-alert',
        animated: true,
        backdropDismiss: false
      });
      yield alert.present();
    })();
  }
  configureStatusBar() {
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        const platform = _capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.getPlatform();
        if (platform !== 'web') {
          // Android: fuerza la barra de navegación inferior en oscuro con iconos claros
          if (platform === 'android') {
            try {
              yield _capgo_capacitor_navigation_bar__WEBPACK_IMPORTED_MODULE_3__.NavigationBar.setNavigationBarColor({
                color: '#111111',
                darkButtons: false
              });
            } catch (e) {
              // Ignoramos si el plugin no está disponible en tiempo de desarrollo
            }
          }
        }
      } catch (err) {
        // Fallback silencioso si el plugin no está disponible en web
      }
    })();
  }
}
_IonicUtilService = IonicUtilService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(IonicUtilService, "\u0275fac", function IonicUtilService_Factory(t) {
  return new (t || _IonicUtilService)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ActionSheetController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.PopoverController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ToastController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.LoadingController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.PickerController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_error_handler_service__WEBPACK_IMPORTED_MODULE_4__.ErrorHandlerService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_6__.Injector));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(IonicUtilService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjectable"]({
  token: _IonicUtilService,
  factory: _IonicUtilService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 22938:
/*!***********************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/util/navigation.service.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NavigationService: () => (/* binding */ NavigationService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _capacitor_network__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/network */ 78010);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 85342);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 75504);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 2950);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 45398);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _remote_config_remote_config_gate_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../remote-config/remote-config-gate.service */ 51150);


var _NavigationService;






class NavigationService {
  constructor(navController, router, remoteConfigGate, modalController) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "navController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "remoteConfigGate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "SIGN_IN_ROUTE", 'sign-in');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "USER_LOADER_ROUTE", 'user-loader');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "TABS_ROUTE", 'tabs');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "TABS_DIETS_ROUTE", 'tabs/diets');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "WEIGHT_INFO_ROUTE", 'weight-info');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "TABS_SUMMARY_ROUTE", 'tabs/summary');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "MESOCYCLE_ROUTE", 'mesocycle');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "PROFILE_ROUTE", 'tabs/profile');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "PROFILE_USERS_ROUTE", 'search-users');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "MANAGEMENT_HOME_ROUTE", 'management-home');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "CONFIGURATION_ROUTE", 'configuration');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "CONCEPTS_ROUTE", 'configuration/concepts');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "SUGGESTIONS_ROUTE", 'configuration/suggestions');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "REFERENCES_ROUTE", 'configuration/references');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "CALCULATOR_LIST_ROUTE", 'tabs/profile/calculator-list');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "PREMIUM_ROUTE", 'premium');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "SEARCH_TABLES_ROUTE", 'search-tables');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "CURRENT_WORKOUT_ROUTE", 'current-workout');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "RM_CALCULATOR_ROUTE", 'rm-calculator');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "SIGN_UP_ROUTE", 'sign-in/sign-up');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "DATA_SHEET_ROUTE", 'sign-in/sign-up/data-sheet');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "RESTORE_PASSWORD_ROUTE", 'sign-in/restore-password');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "EXERCISES_ROUTE", 'exercises');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "NO_CONECTION_ROUTE", 'disconnected');
    // Temporary data storage for passing data between routes
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_tempData", new Map());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "tempDataChanges$", new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subject());
    this.navController = navController;
    this.router = router;
    this.remoteConfigGate = remoteConfigGate;
    this.modalController = modalController;
    this.initNetworkListener();
  }
  // --- Temporary data storage methods ---
  setTempData(key, data) {
    this._tempData.set(key, data);
    this.tempDataChanges$.next({
      key,
      value: data
    });
  }
  getTempData(key) {
    const data = this._tempData.get(key);
    return data || null;
  }
  clearTempData(key) {
    this._tempData.delete(key);
    this.tempDataChanges$.next({
      key,
      value: null
    });
  }
  watchTempData(key) {
    return this.tempDataChanges$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.filter)(change => change.key === key), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(change => change.value ?? null));
  }
  goToLoginPage() {
    this.navController.navigateRoot([this.SIGN_IN_ROUTE], {
      replaceUrl: true
    });
  }
  goToRestorePasswordPage() {
    this.navController.navigateForward([this.RESTORE_PASSWORD_ROUTE]);
  }
  goToTabsPage() {
    this.navController.navigateRoot([this.TABS_ROUTE]);
  }
  goToTabsDietsPage() {
    this.navController.navigateRoot([this.TABS_DIETS_ROUTE], {
      replaceUrl: true
    });
  }
  goToTabsSummaryPage() {
    this.navController.navigateRoot([this.TABS_SUMMARY_ROUTE], {
      replaceUrl: true
    });
  }
  goToSignUp(extras) {
    this.navController.navigateForward([this.SIGN_UP_ROUTE], extras);
  }
  goToDataSheet() {
    this.navController.navigateForward([this.DATA_SHEET_ROUTE]);
  }
  goToInfo() {
    this.navController.navigateRoot([this.NO_CONECTION_ROUTE]);
  }
  goToSearchTables() {
    this.navController.navigateForward([this.SEARCH_TABLES_ROUTE], {
      animated: false
    });
  }
  goToCurrentWorkout() {
    this.navController.navigateForward([this.CURRENT_WORKOUT_ROUTE]);
  }
  goToMesocycle() {
    this.navController.navigateForward([this.MESOCYCLE_ROUTE]);
  }
  goToStatistics() {
    this.navController.navigateForward(['/statistics']);
  }
  goToRmCalculator() {
    this.navController.navigateForward([this.RM_CALCULATOR_ROUTE]);
  }
  goToWeightInfo() {
    this.navController.navigateForward(['/' + this.WEIGHT_INFO_ROUTE], {
      animated: true
    });
  }
  goToProfile() {
    this.navController.navigateRoot([this.PROFILE_ROUTE], {
      replaceUrl: true
    });
  }
  goToConfiguration() {
    this.navController.navigateForward([this.CONFIGURATION_ROUTE]);
  }
  goToProfileUsers() {
    this.navController.navigateForward([this.PROFILE_USERS_ROUTE]);
  }
  goToManagementHome() {
    this.navController.navigateForward([this.MANAGEMENT_HOME_ROUTE]);
  }
  goToCalculatorList() {
    this.navController.navigateForward([this.CALCULATOR_LIST_ROUTE]);
  }
  goToPremium() {
    void this.closeModalsAndNavigateToPremium();
  }
  closeModalsAndNavigateToPremium() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.dismissOpenModalsForPremiumRedirect();
      yield _this.navController.navigateForward([_this.PREMIUM_ROUTE]);
    })();
  }
  dismissOpenModalsForPremiumRedirect() {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const maxDismissAttempts = 10;
      for (let attempt = 0; attempt < maxDismissAttempts; attempt++) {
        const topModal = yield _this2.modalController.getTop();
        if (!topModal) {
          return;
        }
        try {
          yield topModal.dismiss(undefined, 'premium-redirect');
        } catch (error) {
          console.warn('Could not dismiss modal before premium navigation', error);
        }
      }
    })();
  }
  gotoConcepts() {
    this.navController.navigateForward([this.CONCEPTS_ROUTE]);
  }
  goToSuggestions() {
    this.navController.navigateForward([this.SUGGESTIONS_ROUTE]);
  }
  goToReferences() {
    this.navController.navigateForward([this.REFERENCES_ROUTE]);
  }
  // TASK-010 — returnUrl opcional: permite que user-loader.page.ts navegue
  // al deep link originalmente solicitado en vez de siempre caer al
  // dashboard tras el login (ver auth.guard.ts#buildReturnUrl).
  goToUserLoader(returnUrl) {
    this.navController.navigateForward([this.USER_LOADER_ROUTE], {
      replaceUrl: true,
      queryParams: returnUrl ? {
        returnUrl
      } : undefined
    });
  }
  goToExercises(workout, workoutIndex, user, tableInUse, currentSplit) {
    this.navController.navigateRoot([this.EXERCISES_ROUTE], {
      queryParams: {
        workout: workout,
        workoutIndex: workoutIndex,
        user: user,
        tableInUse: tableInUse,
        currentSplit: currentSplit
      }
    });
  }
  goBack() {
    this.navController.pop();
  }
  goToSearchFoods(extras) {
    this.navController.navigateForward(['/search-foods'], {
      ...(extras || {})
    });
  }
  goToCreateProduct(extras) {
    this.navController.navigateForward(['/search-foods/create-product'], {
      ...(extras || {})
    });
  }
  goToAddProduct(extras) {
    this.navController.navigateForward(['/search-foods/add-product'], {
      ...(extras || {})
    });
  }
  goToConfigRecipe(extras) {
    this.navController.navigateForward(['/search-foods/config-recipe'], {
      ...(extras || {})
    });
  }
  backTo(url, extras) {
    this.navController.navigateBack(url, {
      ...(extras || {})
    });
  }
  backNoAnim() {
    this.navController.pop();
  }
  // --- Navigation state helpers (use instead of window.history.state) ---
  getState() {
    try {
      return window.history.state || {};
    } catch {
      return {};
    }
  }
  replaceState(nextState) {
    try {
      const url = this.router.url;
      window.history.replaceState(nextState || {}, '', url);
    } catch {}
  }
  clearStateKeys(keys) {
    try {
      const current = this.getState() || {};
      const newState = {
        ...current
      };
      keys.forEach(k => delete newState[k]);
      this.replaceState(newState);
    } catch {}
  }
  initNetworkListener() {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const status = yield _capacitor_network__WEBPACK_IMPORTED_MODULE_2__.Network.getStatus();
      if (!status.connected) {
        _this3.goToInfo();
      }
      _capacitor_network__WEBPACK_IMPORTED_MODULE_2__.Network.addListener('networkStatusChange', /*#__PURE__*/function () {
        var _ref = (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (status) {
          if (status.connected) {
            if (_this3.router.url === `/${_this3.NO_CONECTION_ROUTE}`) {
              // Antes de volver a la app, verificamos mantenimiento/actualización obligatoria
              // que no pudimos comprobar cuando no había conexión
              yield _this3.remoteConfigGate.checkAndPresent();
              _this3.goToUserLoader();
            }
          } else _this3.goToInfo();
        });
        return function (_x) {
          return _ref.apply(this, arguments);
        };
      }());
    })();
  }
}
_NavigationService = NavigationService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(NavigationService, "\u0275fac", function NavigationService_Factory(t) {
  return new (t || _NavigationService)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_remote_config_remote_config_gate_service__WEBPACK_IMPORTED_MODULE_3__.RemoteConfigGateService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵinject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(NavigationService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjectable"]({
  token: _NavigationService,
  factory: _NavigationService.ɵfac
}));


/***/ }),

/***/ 57507:
/*!*************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/util/notification.service.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotificationService: () => (/* binding */ NotificationService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/core */ 44599);
/* harmony import */ var _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @capacitor/local-notifications */ 55934);
/* harmony import */ var capacitor_secure_storage_plugin__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! capacitor-secure-storage-plugin */ 12583);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 69717);


var _NotificationService;




class NotificationService {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "STORAGE_KEY", 'trainfit_notification_settings');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "CHANNEL_ID", 'trainfit-weight-reminder');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "REST_TIMER_CHANNEL_ID", 'trainfit-rest-timer');
    // Un único timer de descanso activo a la vez: ID fijo, siempre se cancela
    // antes de reprogramar (ver RestTimerService).
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "REST_TIMER_NOTIFICATION_ID", 999999);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "cachedSettings", null);
  }
  initialize() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.isNativePlatform()) return;
      yield _this.createChannel();
      yield _this.createRestTimerChannel();
      const settings = yield _this.getSettings();
      if (settings.enabled) {
        yield _this.cancelAll();
        yield _this.scheduleReminder(settings);
      }
    })();
  }
  createChannel() {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.isNativePlatform()) return;
      try {
        const channel = {
          id: _this2.CHANNEL_ID,
          name: 'Recordatorio de peso',
          description: 'Notificaciones para recordar registrar tu peso',
          importance: 4,
          vibration: true,
          lights: true
        };
        yield _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__.LocalNotifications.createChannel(channel);
      } catch (e) {
        console.warn('[NotificationService] Error creating channel', e);
      }
    })();
  }
  createRestTimerChannel() {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.isNativePlatform()) return;
      try {
        const channel = {
          id: _this3.REST_TIMER_CHANNEL_ID,
          name: 'Descanso entre series',
          description: 'Avisa cuando termina el descanso pautado de una serie',
          importance: 4,
          vibration: true,
          lights: true
        };
        yield _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__.LocalNotifications.createChannel(channel);
      } catch (e) {
        console.warn('[NotificationService] Error creating rest timer channel', e);
      }
    })();
  }
  scheduleRestEndNotification(seconds) {
    var _this4 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.isNativePlatform()) return;
      yield _this4.cancelRestEndNotification();
      try {
        yield _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__.LocalNotifications.schedule({
          notifications: [{
            id: _this4.REST_TIMER_NOTIFICATION_ID,
            title: 'TrainFit',
            body: '¡Descanso terminado! Hora de la siguiente serie.',
            schedule: {
              at: new Date(Date.now() + seconds * 1000),
              allowWhileIdle: true
            },
            channelId: _this4.REST_TIMER_CHANNEL_ID
          }]
        });
      } catch (e) {
        console.warn('[NotificationService] Error scheduling rest end notification', e);
      }
    })();
  }
  cancelRestEndNotification() {
    var _this5 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.isNativePlatform()) return;
      try {
        yield _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__.LocalNotifications.cancel({
          notifications: [{
            id: _this5.REST_TIMER_NOTIFICATION_ID
          }]
        });
      } catch (e) {
        console.warn('[NotificationService] Error canceling rest end notification', e);
      }
    })();
  }
  requestExactAlarmIfNeeded() {
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.getPlatform() !== 'android') return;
      try {
        const status = yield _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__.LocalNotifications.checkExactNotificationSetting();
        if (status.exact_alarm !== 'granted') {
          yield _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__.LocalNotifications.changeExactNotificationSetting();
        }
      } catch (e) {
        console.warn('[NotificationService] Error requesting exact alarm', e);
      }
    })();
  }
  requestPermissions() {
    var _this6 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.isNativePlatform()) return false;
      const perm = yield _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__.LocalNotifications.requestPermissions();
      const granted = perm.display === 'granted';
      if (granted && _capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.getPlatform() === 'android') {
        yield _this6.requestExactAlarmIfNeeded();
      }
      return granted;
    })();
  }
  getSettings() {
    var _this7 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this7.cachedSettings) return _this7.cachedSettings;
      try {
        const {
          value
        } = yield capacitor_secure_storage_plugin__WEBPACK_IMPORTED_MODULE_4__.SecureStoragePlugin.get({
          key: _this7.STORAGE_KEY
        });
        if (!value) {
          return {
            enabled: false,
            hour: 9,
            minute: 0,
            frequency: 'daily'
          };
        }
        _this7.cachedSettings = JSON.parse(value);
        return _this7.cachedSettings;
      } catch {
        return {
          enabled: false,
          hour: 9,
          minute: 0,
          frequency: 'daily'
        };
      }
    })();
  }
  saveAndSchedule(settings) {
    var _this8 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this8.cachedSettings = settings;
      try {
        yield capacitor_secure_storage_plugin__WEBPACK_IMPORTED_MODULE_4__.SecureStoragePlugin.set({
          key: _this8.STORAGE_KEY,
          value: JSON.stringify(settings)
        });
      } catch (e) {
        console.warn('[NotificationService] Error saving settings', e);
      }
      if (settings.enabled) {
        yield _this8.cancelAll();
        yield _this8.scheduleReminder(settings);
      } else {
        yield _this8.cancelAll();
      }
    })();
  }
  cancelAll() {
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.isNativePlatform()) return;
      const pending = yield _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__.LocalNotifications.getPending();
      if (pending.notifications.length > 0) {
        yield _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__.LocalNotifications.cancel({
          notifications: pending.notifications.map(n => ({
            id: n.id
          }))
        });
      }
    })();
  }
  scheduleReminder(settings) {
    var _this9 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_capacitor_core__WEBPACK_IMPORTED_MODULE_2__.Capacitor.isNativePlatform()) return;
      const {
        hour,
        minute,
        frequency,
        weekday,
        intervalDays
      } = settings;
      const title = 'TrainFit';
      const body = '¡No olvides registrar tu peso hoy!';
      if (frequency === 'daily') {
        const schedule = {
          on: {
            hour,
            minute
          },
          allowWhileIdle: true
        };
        yield _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__.LocalNotifications.schedule({
          notifications: [{
            id: 1,
            title,
            body,
            schedule,
            channelId: _this9.CHANNEL_ID
          }]
        });
      } else if (frequency === 'weekly' && weekday) {
        const schedule = {
          on: {
            weekday,
            hour,
            minute
          },
          allowWhileIdle: true
        };
        yield _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__.LocalNotifications.schedule({
          notifications: [{
            id: 1,
            title,
            body,
            schedule,
            channelId: _this9.CHANNEL_ID
          }]
        });
      } else if (frequency === 'interval' && intervalDays && intervalDays > 0) {
        yield _this9.scheduleIntervalNotifications(hour, minute, intervalDays, title, body);
      }
    })();
  }
  scheduleIntervalNotifications(hour, minute, intervalDays, title, body) {
    var _this0 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const now = new Date();
      const targetTime = new Date(now);
      targetTime.setHours(hour, minute, 0, 0);
      if (targetTime.getTime() <= now.getTime()) {
        targetTime.setDate(targetTime.getDate() + 1);
      }
      const notifications = [];
      let id = 100;
      for (let i = 0; i < 30; i++) {
        const fireDate = new Date(targetTime);
        fireDate.setDate(fireDate.getDate() + intervalDays * i);
        notifications.push({
          id: id++,
          title,
          body,
          schedule: {
            at: fireDate,
            allowWhileIdle: true
          },
          channelId: _this0.CHANNEL_ID
        });
      }
      yield _capacitor_local_notifications__WEBPACK_IMPORTED_MODULE_3__.LocalNotifications.schedule({
        notifications
      });
    })();
  }
}
_NotificationService = NotificationService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(NotificationService, "\u0275fac", function NotificationService_Factory(t) {
  return new (t || _NotificationService)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(NotificationService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjectable"]({
  token: _NotificationService,
  factory: _NotificationService.ɵfac
}));


/***/ }),

/***/ 18341:
/*!******************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/util/theme.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ThemeService: () => (/* binding */ ThemeService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 84288);
/* harmony import */ var src_app_shared_models_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/models/theme */ 20544);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);

var _ThemeService;



class ThemeService {
  get getTheme() {
    return this._theme$.value;
  }
  constructor(rendererFactory) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "renderer", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "THEME_KEY", 'theme');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_theme$", new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(src_app_shared_models_theme__WEBPACK_IMPORTED_MODULE_1__.THEMES.light.id));
    this.renderer = rendererFactory.createRenderer(null, null);
    const colorMode = localStorage.getItem(this.THEME_KEY);
    if (colorMode) {
      this._theme$.next(colorMode);
      this.renderer.setAttribute(document.body, 'color-theme', colorMode);
    }
  }
  toggleColorMode(color) {
    localStorage.setItem(this.THEME_KEY, color);
    this._theme$.next(color);
    this.renderer.setAttribute(document.body, 'color-theme', color);
  }
  get theme() {
    return this._theme$.asObservable();
  }
}
_ThemeService = ThemeService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ThemeService, "\u0275fac", function ThemeService_Factory(t) {
  return new (t || _ThemeService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__.RendererFactory2));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ThemeService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _ThemeService,
  factory: _ThemeService.ɵfac
}));


/***/ }),

/***/ 35400:
/*!*****************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/util/util.service.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UtilService: () => (/* binding */ UtilService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! chart.js */ 86743);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 84288);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 85342);
/* harmony import */ var _capacitor_keyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/keyboard */ 31649);
/* harmony import */ var src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/constants/measureFilter */ 46926);
/* harmony import */ var src_app_shared_constants_table_mode__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/constants/table-mode */ 72534);
/* harmony import */ var src_app_shared_constants_week_days__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/constants/week-days */ 72972);
/* harmony import */ var src_app_shared_models_dateRange__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/models/dateRange */ 18916);
/* harmony import */ var _validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../validators/user-validation-errors */ 83056);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_util_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ionic-util.service */ 37057);


var _UtilService;












class UtilService {
  get translate() {
    if (!this._translate) {
      this._translate = this.injector.get(_ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__.TranslateService);
    }
    return this._translate;
  }
  get isTourInit() {
    return this._isTourInit;
  }
  initTour(status) {
    this._isTourInit = status;
  }
  get loading() {
    return this._loading$.value;
  }
  get getLoading() {
    return this._loading$.asObservable();
  }
  set setLoading(loading) {
    this._loading$.next(loading);
  }
  get getUnselected() {
    return this._unselect$.asObservable();
  }
  set setUnselected(unselect) {
    this._unselect$.next(unselect);
  }
  set setTableMode(tableMode) {
    this._tableMode$.next(tableMode);
  }
  get getTableMode() {
    return this._tableMode$.asObservable();
  }
  set setMeasureFilter(measureFilter) {
    this._measureFilter$.next(measureFilter);
  }
  get getMeasureFilter() {
    return this._measureFilter$.asObservable();
  }
  get getCurrentDate() {
    return this._currentDate$.asObservable();
  }
  set setCurrentDate(date) {
    this._currentDate$.next(date);
  }
  get getRefreshAfterDeleteOwn() {
    return this._refresh$.asObservable();
  }
  set setRefreshAfterDeleteOwn(boolean) {
    this._refresh$.next(boolean);
  }
  get getScrollToExercise() {
    return this._scrollToExercise$.asObservable();
  }
  requestScrollToExercise(data) {
    this._scrollToExercise$.next(data);
  }
  constructor(ionicUtilService, injector) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "injector", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_measureFilter$", new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject(src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_3__.MEASURE_FILTER_TYPES.racion));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_loading$", new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject(false));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_unselect$", new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject(false));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_tableMode$", new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject(src_app_shared_constants_table_mode__WEBPACK_IMPORTED_MODULE_4__.TABLE_MODE_TYPES.mesocycle));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_currentDate$", new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject(this.formatDateToYYYYMMDD(new Date())));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_refresh$", new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject(false));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_scrollToExercise$", new rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "imageCache", {});
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_translate", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_isTourInit", void 0);
    // Global flag to indicate if a modal overlay is open
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_modalOpen$", new rxjs__WEBPACK_IMPORTED_MODULE_10__.BehaviorSubject(false));
    this.ionicUtilService = ionicUtilService;
    this.injector = injector;
  }
  getFirstWeekDay(dateObject, dayIndex) {
    const dayOfWeek = dateObject.getDay(),
      firstDayOfWeek = new Date(dateObject),
      diff = dayOfWeek >= dayIndex ? dayOfWeek - dayIndex : 6 - dayOfWeek;
    firstDayOfWeek.setDate(dateObject.getDate() - diff);
    return firstDayOfWeek;
  }
  getWeekRange(selectedDate) {
    const dateMin = this.getFirstWeekDay(selectedDate, src_app_shared_constants_week_days__WEBPACK_IMPORTED_MODULE_5__.WEEK_DAYS.monday);
    const dateMinStr = this.formatDateToYYYYMMDD(dateMin);
    const dateMax = new Date(dateMin);
    dateMax.setDate(dateMin.getDate() + 6);
    const dateMaxStr = this.formatDateToYYYYMMDD(dateMax);
    const dateRange = new src_app_shared_models_dateRange__WEBPACK_IMPORTED_MODULE_6__.DateRange(dateMinStr, dateMaxStr);
    const labels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    return {
      dateMin: dateMinStr,
      dateMax: dateMaxStr,
      dateRange,
      labels
    };
  }
  numberDaysBetween(dateMin, dateMax) {
    const date1_ms = dateMin.getTime();
    const date2_ms = dateMax.getTime();
    const difference_ms = Math.abs(date2_ms - date1_ms);
    return Math.round(difference_ms / (1000 * 60 * 60 * 24));
  }
  getDatesInRange(startDate, endDate) {
    const date = new Date(startDate.getTime());
    const dates = [];
    while (date <= endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  }
  getWeekOfMonth(d) {
    const date = new Date(d);
    const dayOfWeek = (date.getDay() + 6) % 7;
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;
    const adjustedDay = date.getDate() + firstDayOfWeek - dayOfWeek;
    return Math.ceil(adjustedDay / 7);
  }
  sortListByDates(objs) {
    return objs.sort((objA, objB) => {
      if (typeof objA.date === 'string' && typeof objB.date === 'string') {
        return objA.date.localeCompare(objB.date);
      }
      return new Date(objA.date).getTime() - new Date(objB.date).getTime();
    });
  }
  average(numbers) {
    const numbersTotal = numbers.filter(numberTemp => !isNaN(numberTemp));
    if (numbersTotal.length === 0) {
      return 0; // Handle division by zero for empty array
    }

    const sum = numbersTotal.reduce((total, num) => total + (num || 0), 0);
    return sum / numbersTotal.length;
  }
  toStringDateDateFormat(date) {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }
  formatDateToYYYYMMDD(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }
  parseYYYYMMDD(dateStr) {
    const datePart = dateStr.split('T')[0];
    const [y, m, d] = datePart.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  formatDateKey(date) {
    return this.formatDateToYYYYMMDD(date);
  }
  datesAreOnSameDay(first, second) {
    return first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate();
  }
  datesStrAreOnSameDay(first, second) {
    return first === second;
  }
  getFirstWeekDayStr(dateStr, dayIndex) {
    const dateObj = this.parseYYYYMMDD(dateStr);
    const dayOfWeek = dateObj.getDay();
    const firstDayOfWeek = new Date(dateObj);
    const diff = dayOfWeek >= dayIndex ? dayOfWeek - dayIndex : 6 - dayOfWeek;
    firstDayOfWeek.setDate(dateObj.getDate() - diff);
    return this.formatDateToYYYYMMDD(firstDayOfWeek);
  }
  getWeekRangeStr(selectedDate) {
    const dateMin = this.getFirstWeekDayStr(selectedDate, src_app_shared_constants_week_days__WEBPACK_IMPORTED_MODULE_5__.WEEK_DAYS.monday);
    const parsedMin = this.parseYYYYMMDD(dateMin);
    const dateMaxDate = new Date(parsedMin);
    dateMaxDate.setDate(parsedMin.getDate() + 6);
    const dateMax = this.formatDateToYYYYMMDD(dateMaxDate);
    const dateRange = new src_app_shared_models_dateRange__WEBPACK_IMPORTED_MODULE_6__.DateRange(dateMin, dateMax);
    const labels = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    return {
      dateMin,
      dateMax,
      dateRange,
      labels
    };
  }
  numberDaysBetweenStr(dateMin, dateMax) {
    const a = this.parseYYYYMMDD(dateMin);
    const b = this.parseYYYYMMDD(dateMax);
    return Math.round(Math.abs(b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
  }
  getWeekOfMonthFromStr(dateStr) {
    return this.getWeekOfMonth(this.parseYYYYMMDD(dateStr));
  }
  initFakeModalState() {
    const modalState = {
      modal: true,
      desc: 'fake state for our modal'
    };
    history.pushState(modalState, null);
    try {
      // Notify globally that a modal is open
      this._modalOpen$.next(true);
    } catch {}
  }
  numberArray(number) {
    const res = [];
    for (let i = 1; i <= number; i++) {
      res.push(i);
    }
    return res;
  }
  endFakeModalState() {
    if (window.history.state.modal) {
      history.back();
    }
    try {
      // Notify globally that the modal is closed
      this._modalOpen$.next(false);
    } catch {}
  }
  initChart(ref, chartType, chartData, chartOptions) {
    return new chart_js__WEBPACK_IMPORTED_MODULE_12__.Chart(ref, {
      type: chartType,
      data: chartData,
      options: chartOptions
    });
  }
  updateChart(chart) {
    chart.update();
  }
  getEventString(event) {
    return event && event['detail'] ? event['detail'].value.trim() : '';
  }
  getEventNumber(event) {
    return event['detail'].value;
  }
  getEventCheck(event) {
    return event.target.checked;
  }
  get getModalOpen() {
    return this._modalOpen$.asObservable();
  }
  set setModalOpen(isOpen) {
    this._modalOpen$.next(isOpen);
  }
  closeSweetAlert() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.ionicUtilService.closeAlert();
    })();
  }
  toggleDisableAllCheckboxes(checkboxes, disabled) {
    checkboxes.toArray().forEach(cb => cb.disabled = disabled);
  }
  deepClone(obj) {
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
  getMinNumber(numbers) {
    let minimo = numbers.find(nTemp => nTemp);
    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] && numbers[i] < minimo) {
        minimo = numbers[i];
      }
    }
    return minimo;
  }
  getTextWithoutSpecialCharacters(input) {
    return input.replace(/[^a-zA-Z0-9 ]/g, '');
  }
  isWorkoutDoned(workout) {
    return workout.exercises.every(exercise => exercise.sets.every(set => set.doned));
  }
  isSplitDoned(split) {
    if (!split?.workouts) return false;
    return split.workouts.every(wTemp => wTemp.rest || wTemp.date);
  }
  getCurrentPlayingSplit(table) {
    return table.splits.findIndex(split => split.workouts.some(workout => !workout.date && !workout.rest)) + 1;
  }
  manageNote(object, service) {
    const alertOptions = {
      header: this.translate.instant('COMMON.NOTES'),
      inputs: [{
        name: 'notes',
        type: 'textarea',
        placeholder: this.translate.instant('COMMON.WRITE_NOTES_HERE'),
        value: object['notes'] || '',
        attributes: {
          maxlength: 500
        }
      }],
      buttons: [{
        text: this.translate.instant('COMMON.CANCEL'),
        role: 'cancel'
      }, {
        text: this.translate.instant('COMMON.SAVE'),
        handler: () => true
      }]
    };
    return this.ionicUtilService.showAlert(alertOptions).then(result => {
      if (result.role !== 'cancel' && result.data?.values?.notes !== undefined) {
        // Empty text means "clear the note" — must go through so it's persisted
        // as such, instead of being silently dropped like before.
        object['notes'] = (result.data.values.notes || '').trim();
        if (object.exercises) this.handleWorkout(object, service);else if (object.meals) this.handleDietDay(object, service);else if (object.customProducts) this.handleMeal(object, service);else if (object.sets) this.handleCustomExercise(object, service);
        return true;
      }
      return false;
    });
  }
  static handleFormErrors(controls) {
    let errors = [];
    Object.keys(controls).forEach(key => {
      const control = controls[key];
      if (control instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormGroup) {
        errors = errors.concat(this.handleFormErrors(control.controls));
      }
      const controlErrors = controls[key].errors;
      if (controlErrors !== null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors.push({
            control_name: key,
            error_name: keyError,
            error_value: controlErrors[keyError]
          });
        });
      }
    });
    return errors;
  }
  handleErrors(form) {
    if (form.invalid) {
      const controlErrors = UtilService.handleFormErrors(form.controls);
      const formErrors = form.errors ? Object.keys(form.errors).map(keyError => ({
        control_name: 'password',
        error_name: keyError,
        error_value: form.errors[keyError]
      })) : [];
      const allErrors = [...controlErrors, ...formErrors];
      const error = allErrors.shift();
      if (error) {
        let text;
        switch (error.error_name) {
          case 'required':
            text = _validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_ERROR_MESSAGES.required(_validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_FORM_CONTROL_FIELDS[error.control_name]);
            break;
          case 'pattern':
            text = _validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_ERROR_MESSAGES.pattern(_validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_FORM_CONTROL_FIELDS[error.control_name]);
            break;
          case 'email':
            text = _validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_ERROR_MESSAGES.email(_validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_FORM_CONTROL_FIELDS[error.control_name]);
            break;
          case 'min':
            text = _validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_ERROR_MESSAGES.minlength(_validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_FORM_CONTROL_FIELDS[error.control_name], error.error_value.min);
            break;
          case 'length':
            text = _validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_ERROR_MESSAGES.length(_validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_FORM_CONTROL_FIELDS[error.control_name]);
            break;
          case 'minlength':
            text = _validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_ERROR_MESSAGES.minlength(_validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_FORM_CONTROL_FIELDS[error.control_name], error.error_value.requiredLength);
            break;
          case 'maxlength':
            text = _validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_ERROR_MESSAGES.maxlength(_validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_FORM_CONTROL_FIELDS[error.control_name], error.error_value.requiredLength);
            break;
          case 'uppercase':
            text = _validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_ERROR_MESSAGES.uppercase(_validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_FORM_CONTROL_FIELDS[error.control_name]);
            break;
          case 'lowercase':
            text = _validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_ERROR_MESSAGES.lowercase(_validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_FORM_CONTROL_FIELDS[error.control_name]);
            break;
          case 'areEqual':
            text = _validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_ERROR_MESSAGES.areEqual(_validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_FORM_CONTROL_FIELDS[error.control_name]);
            break;
          case 'emailExist':
            text = _validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_ERROR_MESSAGES.emailExist(_validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_FORM_CONTROL_FIELDS[error.control_name]);
            break;
          case 'notSame':
            text = _validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_ERROR_MESSAGES.notSame(_validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_FORM_CONTROL_FIELDS[error.control_name]);
            break;
          case 'manHood':
            text = _validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_ERROR_MESSAGES.manHood(_validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_FORM_CONTROL_FIELDS[error.control_name]);
            break;
          case 'emailExist':
            text = _validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_ERROR_MESSAGES.emailExist(_validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_FORM_CONTROL_FIELDS[error.control_name]);
            break;
          default:
            text = _validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_ERROR_MESSAGES.default(_validators_user_validation_errors__WEBPACK_IMPORTED_MODULE_7__.USER_FORM_CONTROL_FIELDS[error.control_name], error.error_name, error.error_value);
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
  hideKeyboardOnScroll(event, threshold = 10, allowHide = true) {
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
      _capacitor_keyboard__WEBPACK_IMPORTED_MODULE_2__.Keyboard.hide().catch(() => {
        // Silenciar errores (puede fallar en web o si ya está cerrado)
      });
    }
    UtilService.lastScrollTop = scrollTop;
  }
  hideKeyboardOnClick(event) {
    const composedPath = event?.composedPath?.();
    const isInputFromPath = !!composedPath?.some(node => {
      if (!(node instanceof Element)) {
        return false;
      }
      const tagName = node.tagName?.toLowerCase();
      if (tagName === 'input' || tagName === 'textarea') {
        return true;
      }
      if (tagName === 'ion-input' || tagName === 'ion-textarea') {
        return true;
      }
      if (node.classList.contains('native-input') || node.classList.contains('textarea-native')) {
        return true;
      }
      return node.getAttribute('contenteditable') === 'true';
    });
    const target = event?.target;
    const isInputFromClosest = !!target && !!target.closest('input, textarea, ion-input, ion-textarea, .native-input, .textarea-native, [contenteditable="true"]');
    const isInput = isInputFromPath || isInputFromClosest;
    if (isInput) return;
    _capacitor_keyboard__WEBPACK_IMPORTED_MODULE_2__.Keyboard.hide().catch(() => {});
    const active = document.activeElement;
    try {
      if (active && typeof active.blur === 'function') {
        active.blur();
      }
    } catch {}
  }
  handleWorkout(workout, service) {
    service.modifyWorkout(workout).subscribe(resWorkout => service.setCurrentWorkout = resWorkout);
  }
  handleDietDay(dietDay, service) {
    service.updateDietDay(dietDay).subscribe();
  }
  handleMeal(meal, service) {
    service.modifyMeal(meal).subscribe();
  }
  handleCustomExercise(customExercise, service) {
    service.updateCustomExercise(customExercise).subscribe();
  }
}
_UtilService = UtilService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(UtilService, "lastScrollTop", void 0);
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(UtilService, "\u0275fac", function UtilService_Factory(t) {
  return new (t || _UtilService)(_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵinject"](_ionic_util_service__WEBPACK_IMPORTED_MODULE_8__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_14__.Injector));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(UtilService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineInjectable"]({
  token: _UtilService,
  factory: _UtilService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 63887:
/*!***************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/workout/workout-api.service.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkoutAPIService: () => (/* binding */ WorkoutAPIService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _WorkoutAPIService;


class WorkoutAPIService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  createWorkout(workout) {
    return this.http.post(`${WorkoutAPIService.WORKOUT_ENDPOINT}`, workout);
  }
  addWorkoutsToSplits(idTable, workouts) {
    const body = Array.isArray(workouts) ? workouts : [workouts];
    return this.http.post(`${WorkoutAPIService.WORKOUT_ENDPOINT}/multiple/${idTable}`, body);
  }
  duplicateWorkoutRow(idTable, idWorkout, nameSuffix) {
    return this.http.post(`${WorkoutAPIService.WORKOUT_ENDPOINT}/duplicate-row/${idTable}/${idWorkout}`, {
      nameSuffix
    });
  }
  reorderWorkoutRows(idTable, workoutIdsOrder) {
    return this.http.put(`${WorkoutAPIService.WORKOUT_ENDPOINT}/rows/order/${idTable}`, {
      workoutIdsOrder
    });
  }
  addExerciseToWorkouts(workoutIds, exerciseId) {
    return this.http.post(`${WorkoutAPIService.WORKOUT_ENDPOINT}/multiple/exercises`, {
      workoutIds,
      exerciseId
    });
  }
  getWorkoutById(id) {
    return this.http.get(`${WorkoutAPIService.WORKOUT_ENDPOINT}/${id}`);
  }
  getWorkoutByIdAndDate(id, date) {
    return this.http.post(`${WorkoutAPIService.WORKOUT_ENDPOINT}/date/${id}`, {
      date
    });
  }
  pasteExercises(tableId, sourceWorkoutId, targetWorkoutId, exercises) {
    return this.http.put(`workouts/paste-exercises`, {
      tableId,
      sourceWorkoutId,
      targetWorkoutId,
      exercises
    });
  }
  modifyWorkout(workout) {
    return this.http.put(`workouts/modify/one/simple/save`, workout);
  }
  // Planificador visual (Fase C) — copia un workout suelto a otra semana (o
  // a la misma, como "duplicar en el sitio"). Devuelve table.splits completo,
  // mismo contrato que el resto de altas de workout.
  copyWorkoutToSplit(idWorkout, idSplit) {
    return this.http.post(`${WorkoutAPIService.WORKOUT_ENDPOINT}/${idWorkout}/copy-to-split/${idSplit}`, {});
  }
  // Reordena las cards DENTRO de una sola columna.
  reorderWorkoutsInSplit(idSplit, workoutIdsOrder) {
    return this.http.put(`${WorkoutAPIService.WORKOUT_ENDPOINT}/split/${idSplit}/order`, {
      workoutIdsOrder
    });
  }
  // Rediseño de entrenamiento Fase B — reemplaza Workout.blocks[] completo.
  updateWorkoutBlocks(workoutId, blocks) {
    return this.http.put(`${WorkoutAPIService.WORKOUT_ENDPOINT}/${workoutId}/blocks`, {
      blocks
    });
  }
  finishWorkout(workoutId, date) {
    return this.http.put(`workouts/finish`, {
      workoutId,
      date
    });
  }
  skipWorkout(workoutId, rest) {
    return this.http.put(`workouts/skip`, {
      workoutId,
      rest
    });
  }
  updateWorkout(workout, customExercise) {
    return this.http.put(`workouts`, {
      workout,
      customExercise
    });
  }
  updateCustomExercises(idTable, idWorkout, idCustomExercise, idExercise) {
    return this.http.put(`workouts/${idTable}/${idWorkout}/${idCustomExercise}/${idExercise}`, null);
  }
  updateWorkoutsOrder(idWorkout, idTable, indexReorderedCustomExercises) {
    return this.http.put(`workouts/${idWorkout}/${idTable}`, indexReorderedCustomExercises);
  }
  updateWorkoutsName(idTable, idWorkout, workoutsName) {
    return this.http.put(`${WorkoutAPIService.WORKOUT_ENDPOINT}/names/${idTable}/${idWorkout}`, {
      workoutsName: workoutsName
    });
  }
  deleteWorkout(id) {
    return this.http.delete(`workouts/delete/${id}`);
  }
  deleteWorkoutCustomExercises(id) {
    return this.http.delete(`workouts/all/deletes/${id}`);
  }
  deleteWorkouts(workouts) {
    return this.http.put(`workouts/deletes`, workouts);
  }
  addDataExerciseToWorkout(workoutId, dataExerciseData) {
    return this.http.post(`${WorkoutAPIService.WORKOUT_ENDPOINT}/add-data-exercise/${workoutId}`, dataExerciseData);
  }
}
_WorkoutAPIService = WorkoutAPIService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(WorkoutAPIService, "WORKOUT_ENDPOINT", 'workouts');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(WorkoutAPIService, "\u0275fac", function WorkoutAPIService_Factory(t) {
  return new (t || _WorkoutAPIService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(WorkoutAPIService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _WorkoutAPIService,
  factory: _WorkoutAPIService.ɵfac
}));


/***/ }),

/***/ 76990:
/*!***********************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/workout/workout.service.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WorkoutService: () => (/* binding */ WorkoutService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 68075);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 84288);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 65821);
/* harmony import */ var _models_workout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../models/workout */ 28861);
/* harmony import */ var _workout_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./workout-api.service */ 63887);

var _WorkoutService;






class WorkoutService {
  get getExerciseClipboard() {
    return this.exerciseClipboardSubject.value;
  }
  get exerciseClipboard$() {
    return this.exerciseClipboardSubject.asObservable();
  }
  set setExerciseClipboard(clipboard) {
    this.exerciseClipboardSubject.next(clipboard);
  }
  clearExerciseClipboard() {
    this.exerciseClipboardSubject.next(null);
  }
  hasExerciseClipboard() {
    return !!this.exerciseClipboardSubject.value;
  }
  pasteExercises(tableId, sourceWorkoutId, targetWorkoutId, exercises) {
    return this.workoutAPIService.pasteExercises(tableId, sourceWorkoutId, targetWorkoutId, exercises);
  }
  // Signal para el workout actual

  // Getter sincrónico para acceso directo al valor
  get currentWorkout() {
    return this._currentWorkout();
  }
  // Setter para actualizar el workout
  set setCurrentWorkout(workout) {
    if (!workout) {
      this._currentWorkout.set(null);
      return;
    }
    this._currentWorkout.set({
      ...workout
    });
  }
  constructor(workoutAPIService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "workoutAPIService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "exerciseClipboardSubject", new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(null));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_currentWorkout", (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.signal)(null));
    // Signal de solo lectura
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "currentWorkoutSignal", (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.computed)(() => this._currentWorkout()));
    // Observable para compatibilidad con código existente
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "getCurrentWorkout", (0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_5__.toObservable)(this._currentWorkout));
    this.workoutAPIService = workoutAPIService;
  }
  createWorkout(workout) {
    return this.workoutAPIService.createWorkout(workout);
  }
  addWorkoutsToSplits(idTable, workouts) {
    return this.workoutAPIService.addWorkoutsToSplits(idTable, workouts);
  }
  duplicateWorkoutRow(idTable, idWorkout, nameSuffix) {
    return this.workoutAPIService.duplicateWorkoutRow(idTable, idWorkout, nameSuffix).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.take)(1));
  }
  reorderWorkoutRows(idTable, workoutIdsOrder) {
    return this.workoutAPIService.reorderWorkoutRows(idTable, workoutIdsOrder).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.take)(1));
  }
  addExerciseToWorkouts(workoutIds, exerciseId) {
    return this.workoutAPIService.addExerciseToWorkouts(workoutIds, exerciseId);
  }
  getWorkoutById(id) {
    return this.workoutAPIService.getWorkoutById(id).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.take)(1));
  }
  getWorkoutByIdAndDate(id, date) {
    return this.workoutAPIService.getWorkoutByIdAndDate(id, date);
  }
  modifyWorkout(workout) {
    return this.workoutAPIService.modifyWorkout(workout).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.take)(1));
  }
  copyWorkoutToSplit(idWorkout, idSplit) {
    return this.workoutAPIService.copyWorkoutToSplit(idWorkout, idSplit).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.take)(1));
  }
  reorderWorkoutsInSplit(idSplit, workoutIdsOrder) {
    return this.workoutAPIService.reorderWorkoutsInSplit(idSplit, workoutIdsOrder).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.take)(1));
  }
  updateWorkoutBlocks(workoutId, blocks) {
    return this.workoutAPIService.updateWorkoutBlocks(workoutId, blocks).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.take)(1));
  }
  // Limpia el startedAt de un workout que quedó "en curso" sin querer (Stop,
  // o abandonado en silencio al empezar otro) para que el cronómetro no siga
  // contando desde un timestamp viejo cuando se retome.
  clearStartedAt(workout) {
    return this.modifyWorkout({
      ...workout,
      startedAt: null
    });
  }
  // Workout previamente en curso (previousWorkoutId) que quedaría "colgado"
  // (startedAt sin date) si se empieza uno distinto sin resolverlo antes.
  getDanglingWorkout(previousWorkoutId, newWorkoutId, table) {
    if (!previousWorkoutId || previousWorkoutId === newWorkoutId) return undefined;
    const danglingWorkout = table?.splits?.flatMap(split => split.workouts).find(workoutTemp => workoutTemp._id === previousWorkoutId);
    return danglingWorkout?.startedAt && !danglingWorkout.date ? danglingWorkout : undefined;
  }
  hasProgress(workout) {
    return !!workout.exercises?.some(exercise => exercise.sets?.some(set => set.doned));
  }
  finishWorkout(workoutId, date) {
    return this.workoutAPIService.finishWorkout(workoutId, date).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.take)(1));
  }
  skipWorkout(workoutId, rest) {
    return this.workoutAPIService.skipWorkout(workoutId, rest).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.take)(1));
  }
  updateWorkout(workout, customExercise) {
    return this.workoutAPIService.updateWorkout(workout, customExercise);
  }
  updateCustomExercises(idTable, idWorkout, idCustomExercise, idExercise) {
    return this.workoutAPIService.updateCustomExercises(idTable, idWorkout, idCustomExercise, idExercise);
  }
  updateWorkoutsOrder(idWorkout, idTable, indexReorderedCustomExercises) {
    return this.workoutAPIService.updateWorkoutsOrder(idWorkout, idTable, indexReorderedCustomExercises);
  }
  updateWorkoutsName(idTable, idWorkout, workoutsName) {
    return this.workoutAPIService.updateWorkoutsName(idTable, idWorkout, workoutsName);
  }
  deleteWorkout(id) {
    return this.workoutAPIService.deleteWorkout(id);
  }
  deleteWorkoutCustomExercises(id) {
    return this.workoutAPIService.deleteWorkoutCustomExercises(id).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.take)(1));
  }
  deleteWorkouts(workouts) {
    return this.workoutAPIService.deleteWorkouts(workouts).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.take)(1));
  }
  getStandarWorkout() {
    const workout = new _models_workout__WEBPACK_IMPORTED_MODULE_1__.Workout();
    workout.name = 'Entrenamiento';
    workout.exercises = [];
    return workout;
  }
  addDataExerciseToWorkout(workoutId, dataExerciseData) {
    return this.workoutAPIService.addDataExerciseToWorkout(workoutId, dataExerciseData);
  }
}
_WorkoutService = WorkoutService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(WorkoutService, "\u0275fac", function WorkoutService_Factory(t) {
  return new (t || _WorkoutService)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵinject"](_workout_api_service__WEBPACK_IMPORTED_MODULE_2__.WorkoutAPIService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(WorkoutService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjectable"]({
  token: _WorkoutService,
  factory: _WorkoutService.ɵfac
}));


/***/ }),

/***/ 16703:
/*!**************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/utils/body-metrics.util.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BMR_FORMULAS: () => (/* binding */ BMR_FORMULAS),
/* harmony export */   ageFromBirthDate: () => (/* binding */ ageFromBirthDate),
/* harmony export */   bmi: () => (/* binding */ bmi),
/* harmony export */   bmrHarrisBenedict: () => (/* binding */ bmrHarrisBenedict),
/* harmony export */   bmrKatchMcArdle: () => (/* binding */ bmrKatchMcArdle),
/* harmony export */   bmrMifflinStJeor: () => (/* binding */ bmrMifflinStJeor),
/* harmony export */   bodyFatDeurenberg: () => (/* binding */ bodyFatDeurenberg),
/* harmony export */   bodyFatNavy: () => (/* binding */ bodyFatNavy),
/* harmony export */   fatMassFromPercentage: () => (/* binding */ fatMassFromPercentage),
/* harmony export */   leanMassFromPercentage: () => (/* binding */ leanMassFromPercentage),
/* harmony export */   proportionIndices: () => (/* binding */ proportionIndices),
/* harmony export */   totalEnergyExpenditure: () => (/* binding */ totalEnergyExpenditure)
/* harmony export */ });
/**
 * Movimiento 3 Coach Pro — las cuentas que un entrenador hace a mano sobre
 * las medidas de un cliente: metabolismo basal, porcentaje graso a partir de
 * perímetros, masa magra y proporciones.
 *
 * TODO ES PURO: entran números, salen números. Sin servicios, sin HTTP, sin
 * modelos. Dos motivos concretos:
 *
 *   - Nada de esto se GUARDA. Son valores derivados de medidas que ya están
 *     en Anthropometry; persistirlos crearía una segunda versión de la
 *     verdad que se queda vieja en cuanto el cliente se vuelve a medir.
 *   - Mifflin-St Jeor ya vivía dentro de UserService (privado, acoplado a
 *     User) para calcular el objetivo del cliente. Al necesitarlo también la
 *     app del entrenador, la salida fácil era copiarlo. Se extrae aquí y
 *     UserService pasa a llamarlo, así que la fórmula existe UNA vez.
 *
 * Todas las funciones devuelven null cuando les falta algún dato, en vez de
 * un 0 o un NaN: "no lo sé" y "sale cero" son cosas distintas, y sobre estos
 * números un entrenador decide qué le manda comer a alguien.
 *
 * SIN IMPORTS, a propósito. Es lo que permite probarlo con el runner que el
 * proyecto ya tiene (node:test en el backend, ver body-metrics.test.js):
 * montar un segundo runner solo para el front sería una arquitectura
 * paralela para nueve funciones puras. De paso desaparece un import de
 * `shared-ui` desde `core`, que iba en la dirección equivocada entre capas.
 */
// Espejo de SEX_TYPES.male (shared-ui/constants/sex, donde female = 0 y
// male = 1). Aquí como número suelto para que este módulo no dependa de
// nada; la correspondencia se comprueba en el test.
const MALE = 1;
function isPositive(value) {
  return typeof value === 'number' && Number.isFinite(value) && value > 0;
}
function round(value, decimals = 1) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
const BMR_FORMULAS = [{
  key: 'mifflin',
  label: 'Mifflin-St Jeor',
  note: 'La más fiable en población general. Es la que usa la app para calcular el objetivo del cliente.'
}, {
  key: 'harris',
  label: 'Harris-Benedict',
  note: 'La clásica (revisión de 1984). Suele dar algo más alto que Mifflin.'
}, {
  key: 'katch',
  label: 'Katch-McArdle',
  note: 'Parte de la masa magra, no del peso total. La mejor si tienes un % graso fiable; sin él no se puede calcular.'
}];
/**
 * Mifflin-St Jeor (1990). Más precisa (~5%) que Harris-Benedict en
 * poblaciones modernas.
 *   Hombres: (10 × peso) + (6,25 × altura) − (5 × edad) + 5
 *   Mujeres: (10 × peso) + (6,25 × altura) − (5 × edad) − 161
 */
function bmrMifflinStJeor(input) {
  const {
    weightKg,
    heightCm,
    age,
    sex
  } = input;
  if (!isPositive(weightKg) || !isPositive(heightCm) || !isPositive(age)) return null;
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return round(sex === MALE ? base + 5 : base - 161, 0);
}
/**
 * Harris-Benedict, revisión de Roza y Shizgal (1984).
 *   Hombres: 88,362 + (13,397 × peso) + (4,799 × altura) − (5,677 × edad)
 *   Mujeres: 447,593 + (9,247 × peso) + (3,098 × altura) − (4,330 × edad)
 */
function bmrHarrisBenedict(input) {
  const {
    weightKg,
    heightCm,
    age,
    sex
  } = input;
  if (!isPositive(weightKg) || !isPositive(heightCm) || !isPositive(age)) return null;
  const value = sex === MALE ? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age : 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.33 * age;
  return round(value, 0);
}
/**
 * Katch-McArdle: 370 + (21,6 × masa magra en kg).
 *
 * No usa sexo ni edad porque no le hacen falta: la masa magra ya recoge esa
 * diferencia. A cambio exige conocerla, así que devuelve null sin ella —
 * estimarla a partir del peso sería volver a Mifflin por la puerta de atrás.
 */
function bmrKatchMcArdle(leanMassKg) {
  if (!isPositive(leanMassKg)) return null;
  return round(370 + 21.6 * leanMassKg, 0);
}
/**
 * Método de la Marina de EE. UU. (Hodgdon & Beckett), a partir de
 * perímetros. Es el que un entrenador puede aplicar con una cinta métrica y
 * sin báscula de bioimpedancia.
 *
 *   Hombres: 495 / (1,0324 − 0,19077·log10(cintura − cuello)
 *                          + 0,15456·log10(altura)) − 450
 *   Mujeres: 495 / (1,29579 − 0,35004·log10(cintura + cadera − cuello)
 *                           + 0,22100·log10(altura)) − 450
 *
 * La cadera solo la necesita la fórmula femenina.
 *
 * Devuelve null si la resta interna no es positiva (un cuello mayor que la
 * cintura, típico de una medida mal apuntada): el logaritmo daría NaN, y un
 * NaN paseando por la interfaz es peor que un hueco.
 */
function bodyFatNavy(params) {
  const {
    sex,
    heightCm,
    neckCm,
    waistCm,
    hipCm
  } = params;
  if (!isPositive(heightCm) || !isPositive(neckCm) || !isPositive(waistCm)) return null;
  if (sex === MALE) {
    const girth = waistCm - neckCm;
    if (girth <= 0) return null;
    const value = 495 / (1.0324 - 0.19077 * Math.log10(girth) + 0.15456 * Math.log10(heightCm)) - 450;
    return isPositive(value) ? round(value) : null;
  }
  if (!isPositive(hipCm)) return null;
  const girth = waistCm + hipCm - neckCm;
  if (girth <= 0) return null;
  const value = 495 / (1.29579 - 0.35004 * Math.log10(girth) + 0.221 * Math.log10(heightCm)) - 450;
  return isPositive(value) ? round(value) : null;
}
/**
 * Deurenberg (1991), a partir del IMC: solo necesita peso, altura, edad y
 * sexo. Menos fina que Navy —no mira dónde está la grasa— pero sirve cuando
 * no hay perímetros apuntados.
 *
 *   %graso = 1,20·IMC + 0,23·edad − 10,8·(1 si hombre, 0 si mujer) − 5,4
 */
function bodyFatDeurenberg(input) {
  const {
    weightKg,
    heightCm,
    age,
    sex
  } = input;
  if (!isPositive(weightKg) || !isPositive(heightCm) || !isPositive(age)) return null;
  // IMC SIN redondear: bmi() redondea a un decimal para enseñarlo, y meter
  // ese valor ya recortado en la fórmula arrastra el error al resultado.
  const bmiValue = weightKg / (heightCm / 100) ** 2;
  const value = 1.2 * bmiValue + 0.23 * age - 10.8 * (sex === MALE ? 1 : 0) - 5.4;
  return isPositive(value) ? round(value) : null;
}
// --- Composición ---
function bmi(weightKg, heightCm) {
  if (!isPositive(weightKg) || !isPositive(heightCm)) return null;
  return round(weightKg / (heightCm / 100) ** 2, 1);
}
function fatMassFromPercentage(weightKg, bodyFatPct) {
  if (!isPositive(weightKg) || !isPositive(bodyFatPct)) return null;
  return round(weightKg * bodyFatPct / 100, 1);
}
function leanMassFromPercentage(weightKg, bodyFatPct) {
  const fat = fatMassFromPercentage(weightKg, bodyFatPct);
  if (fat === null || !isPositive(weightKg)) return null;
  return round(weightKg - fat, 1);
}
// --- Gasto energético ---
/**
 * Gasto total = basal × factor de actividad.
 *
 * El factor sale de ACTIVITY_FACTOR (shared-ui), que ya existía y que usa la
 * app del cliente: dos escalas de actividad distintas darían dos objetivos
 * distintos para la misma persona según quién mire.
 */
function totalEnergyExpenditure(bmrValue, activityFactor) {
  if (!isPositive(bmrValue) || !isPositive(activityFactor)) return null;
  return round(bmrValue * activityFactor, 0);
}
/**
 * Proporciones entre perímetros. Lo que le importa a un entrenador no es el
 * número absoluto de hoy sino cómo se mueve: una cintura que baja mientras
 * el pecho se mantiene no se ve mirando los dos por separado.
 *
 * Solo se devuelven los índices que se pueden calcular con las medidas que
 * REALMENTE hay apuntadas. Rellenar los que faltan con ceros invitaría a
 * leer como "malo" lo que solo es "no medido".
 */
function proportionIndices(measurements) {
  const {
    chest,
    waist,
    hip,
    bicepsContracted,
    thighRelaxed
  } = measurements;
  const indices = [];
  const push = (key, label, numerator, denominator, reference, referenceNote) => {
    if (!isPositive(numerator) || !isPositive(denominator)) return;
    indices.push({
      key,
      label,
      value: round(numerator / denominator, 2),
      reference,
      referenceNote
    });
  };
  push('chest_waist', 'Pecho / cintura', chest, waist, 1.4, 'La proporción "en V" clásica ronda 1,4. Más importante que acertarla es hacia dónde se mueve.');
  push('arm_waist', 'Brazo / cintura', bicepsContracted, waist, null, 'Sin referencia universal: sirve para ver si el brazo crece mientras la cintura no.');
  push('waist_hip', 'Cintura / cadera', waist, hip, null, 'Índice de salud reconocido. Por debajo de 0,90 en hombres y 0,85 en mujeres se considera bajo riesgo (OMS).');
  push('thigh_waist', 'Muslo / cintura', thighRelaxed, waist, null, 'Sin referencia universal: útil para seguir el desarrollo del tren inferior frente al abdomen.');
  return indices;
}
// --- Edad ---
// Edad cumplida a día de hoy. Aparte porque las tres fórmulas de basal la
// necesitan y un "años = hoy − nacimiento" ingenuo se equivoca en un año
// para quien aún no ha cumplido este año.
function ageFromBirthDate(birth) {
  if (!birth) return null;
  const birthDate = new Date(birth);
  if (Number.isNaN(birthDate.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDelta = today.getMonth() - birthDate.getMonth();
  if (monthDelta < 0 || monthDelta === 0 && today.getDate() < birthDate.getDate()) {
    age -= 1;
  }
  return age >= 0 && age < 130 ? age : null;
}

/***/ }),

/***/ 7286:
/*!****************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/validators/matchPasswords.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MatchPasswords: () => (/* binding */ MatchPasswords)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 69717);

var _MatchPasswords;

class MatchPasswords {
  matchPassword(group) {
    if (group.controls.password.value === group.controls.passwordRep.value) {
      return null;
    } else {
      return {
        notSame: true
      };
    }
  }
}
_MatchPasswords = MatchPasswords;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MatchPasswords, "\u0275fac", function MatchPasswords_Factory(t) {
  return new (t || _MatchPasswords)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MatchPasswords, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _MatchPasswords,
  factory: _MatchPasswords.ɵfac
}));


/***/ }),

/***/ 83056:
/*!************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/validators/user-validation-errors.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   USER_ERROR_MESSAGES: () => (/* binding */ USER_ERROR_MESSAGES),
/* harmony export */   USER_FORM_CONTROL_FIELDS: () => (/* binding */ USER_FORM_CONTROL_FIELDS)
/* harmony export */ });
const USER_FORM_CONTROL_FIELDS = {
  name: 'USER_FORM.NAME',
  lastname: 'USER_FORM.LASTNAME',
  birth: 'USER_FORM.BIRTH',
  weight: 'USER_FORM.WEIGHT',
  height: 'USER_FORM.HEIGHT',
  sex: 'USER_FORM.SEX',
  steps: 'USER_FORM.STEPS',
  activity: 'USER_FORM.ACTIVITY',
  training: 'USER_FORM.TRAINING',
  objetive: 'USER_FORM.OBJECTIVE',
  email: 'USER_FORM.EMAIL',
  password: 'USER_FORM.PASSWORD',
  passwordRep: 'USER_FORM.PASSWORD',
  termsAndConditions: 'USER_FORM.TERMS',
  policyAndPrivacy: 'USER_FORM.PRIVACY'
};
const USER_ERROR_MESSAGES = {
  required: _fieldName => 'USER_ERRORS.REQUIRED',
  pattern: _fieldName => 'USER_ERRORS.PATTERN',
  email: _fieldName => 'USER_ERRORS.EMAIL',
  minlength: (_fieldName, requiredLength) => requiredLength ? `USER_ERRORS.MINLENGTH:${requiredLength}` : 'USER_ERRORS.MINLENGTH',
  maxlength: (_fieldName, requiredLength) => requiredLength ? `USER_ERRORS.MAXLENGTH:${requiredLength}` : 'USER_ERRORS.MAXLENGTH',
  areEqual: _fieldName => 'USER_ERRORS.ARE_EQUAL',
  notSame: _fieldName => 'USER_ERRORS.NOT_SAME',
  manHood: _fieldName => 'USER_ERRORS.MIN_AGE',
  emailExist: _fieldName => 'USER_ERRORS.EMAIL_EXIST',
  length: _fieldName => 'USER_ERRORS.LENGTH',
  default: (_fieldName, _errorName, _errorValue) => 'USER_ERRORS.DEFAULT',
  uppercase: _fieldName => 'USER_ERRORS.UPPERCASE',
  lowercase: _fieldName => 'USER_ERRORS.LOWERCASE'
};

/***/ }),

/***/ 97109:
/*!************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/app-update/app-update-modal.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppUpdateModalComponent: () => (/* binding */ AppUpdateModalComponent)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 647);


var _AppUpdateModalComponent;




function AppUpdateModalComponent_ion_spinner_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "ion-spinner", 10);
  }
}
function AppUpdateModalComponent_span_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](2, 1, "APP_UPDATE.UPDATE_NOW"));
  }
}
const _c0 = function (a0) {
  return {
    version: a0
  };
};
class AppUpdateModalComponent {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "currentVersion", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "requiredVersion", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "customMessage", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "updateHandler", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isOpeningStore", false);
  }
  updateNow() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.isOpeningStore || !_this.updateHandler) {
        return;
      }
      _this.isOpeningStore = true;
      try {
        yield _this.updateHandler();
      } finally {
        _this.isOpeningStore = false;
      }
    })();
  }
}
_AppUpdateModalComponent = AppUpdateModalComponent;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(AppUpdateModalComponent, "\u0275fac", function AppUpdateModalComponent_Factory(t) {
  return new (t || _AppUpdateModalComponent)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(AppUpdateModalComponent, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _AppUpdateModalComponent,
  selectors: [["app-update-modal"]],
  inputs: {
    currentVersion: "currentVersion",
    requiredVersion: "requiredVersion",
    customMessage: "customMessage",
    updateHandler: "updateHandler"
  },
  decls: 23,
  vars: 25,
  consts: [[1, "update-screen", 3, "fullscreen"], [1, "update-card"], [1, "update-card__icon"], ["name", "cloud-download-outline"], [1, "update-card__eyebrow"], [1, "update-card__message"], [1, "update-card__versions"], ["expand", "block", "size", "large", 1, "update-card__button", 3, "disabled", "click"], ["name", "crescent", 4, "ngIf"], [4, "ngIf"], ["name", "crescent"]],
  template: function AppUpdateModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-content", 0)(1, "section", 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "ion-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "p", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](6, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](9, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "p", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](12, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 6)(14, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](16, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](18);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](19, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "ion-button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AppUpdateModalComponent_Template_ion_button_click_20_listener() {
        return ctx.updateNow();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](21, AppUpdateModalComponent_ion_spinner_21_Template, 1, 0, "ion-spinner", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](22, AppUpdateModalComponent_span_22_Template, 3, 3, "span", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("fullscreen", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](6, 9, "APP_UPDATE.MANDATORY"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](9, 11, "APP_UPDATE.NEW_VERSION"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx.customMessage || _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](12, 13, "APP_UPDATE.DESCRIPTION"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](16, 15, "APP_UPDATE.YOUR_VERSION", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](21, _c0, ctx.currentVersion)));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](19, 18, "APP_UPDATE.REQUIRED_VERSION", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](23, _c0, ctx.requiredVersion)));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.isOpeningStore);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.isOpeningStore);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.isOpeningStore);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonSpinner, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslatePipe],
  styles: [".update-screen[_ngcontent-%COMP%] {\n  --background: #0f0f0f;\n}\n\n.update-card[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding: max(48px, env(safe-area-inset-top)) 24px max(32px, env(safe-area-inset-bottom));\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  text-align: center;\n  color: #ffffff;\n  background: radial-gradient(circle at top left, rgba(254, 144, 0, 0.25), transparent 34%), linear-gradient(180deg, #161616 0%, #0f0f0f 100%);\n}\n\n.update-card__icon[_ngcontent-%COMP%] {\n  width: 82px;\n  height: 82px;\n  margin: 0 auto 24px;\n  display: grid;\n  place-items: center;\n  border-radius: 24px;\n  color: #111111;\n  background: linear-gradient(135deg, #fe9000, #ffb347);\n  box-shadow: 0 18px 42px rgba(254, 144, 0, 0.32);\n}\n.update-card__icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 42px;\n}\n\n.update-card__eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 10px;\n  color: #fe9000;\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: clamp(2rem, 9vw, 3.4rem);\n  line-height: 0.96;\n  font-weight: 900;\n  letter-spacing: -0.05em;\n}\n\n.update-card__message[_ngcontent-%COMP%] {\n  max-width: 420px;\n  margin: 22px auto 0;\n  color: rgba(255, 255, 255, 0.78);\n  font-size: 1rem;\n  line-height: 1.55;\n}\n\n.update-card__versions[_ngcontent-%COMP%] {\n  margin: 28px auto;\n  max-width: 360px;\n  width: 100%;\n  display: grid;\n  gap: 10px;\n}\n.update-card__versions[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  padding: 12px 14px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.06);\n  color: rgba(255, 255, 255, 0.84);\n  font-weight: 700;\n}\n\n.update-card__button[_ngcontent-%COMP%] {\n  max-width: 360px;\n  width: 100%;\n  margin: 0 auto;\n  --background: #fe9000;\n  --background-activated: #e57f00;\n  --background-hover: #ff9c1a;\n  --border-radius: 16px;\n  --box-shadow: 0 16px 34px rgba(254, 144, 0, 0.28);\n  --color: #111111;\n  min-height: 56px;\n  font-weight: 900;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL2FwcC11cGRhdGUvYXBwLXVwZGF0ZS1tb2RhbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLHdGQUFBO0VBRUEsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSw0SUFDRTtBQURKOztBQUtBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLHFEQUFBO0VBQ0EsK0NBQUE7QUFGRjtBQUlFO0VBQ0UsZUFBQTtBQUZKOztBQU1BO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0EseUJBQUE7QUFIRjs7QUFNQTtFQUNFLFNBQUE7RUFDQSxtQ0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtBQUhGOztBQU1BO0VBQ0UsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLGdDQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FBSEY7O0FBTUE7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxTQUFBO0FBSEY7QUFLRTtFQUNFLGtCQUFBO0VBQ0EsMENBQUE7RUFDQSxtQkFBQTtFQUNBLHFDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtBQUhKOztBQU9BO0VBQ0UsZ0JBQUE7RUFDQSxXQUFBO0VBQ0EsY0FBQTtFQUNBLHFCQUFBO0VBQ0EsK0JBQUE7RUFDQSwyQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaURBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7QUFKRiIsInNvdXJjZXNDb250ZW50IjpbIi51cGRhdGUtc2NyZWVuIHtcbiAgLS1iYWNrZ3JvdW5kOiAjMGYwZjBmO1xufVxuXG4udXBkYXRlLWNhcmQge1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nOiBtYXgoNDhweCwgZW52KHNhZmUtYXJlYS1pbnNldC10b3ApKSAyNHB4XG4gICAgbWF4KDMycHgsIGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tKSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBiYWNrZ3JvdW5kOlxuICAgIHJhZGlhbC1ncmFkaWVudChjaXJjbGUgYXQgdG9wIGxlZnQsIHJnYmEoMjU0LCAxNDQsIDAsIDAuMjUpLCB0cmFuc3BhcmVudCAzNCUpLFxuICAgIGxpbmVhci1ncmFkaWVudCgxODBkZWcsICMxNjE2MTYgMCUsICMwZjBmMGYgMTAwJSk7XG59XG5cbi51cGRhdGUtY2FyZF9faWNvbiB7XG4gIHdpZHRoOiA4MnB4O1xuICBoZWlnaHQ6IDgycHg7XG4gIG1hcmdpbjogMCBhdXRvIDI0cHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDI0cHg7XG4gIGNvbG9yOiAjMTExMTExO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZmU5MDAwLCAjZmZiMzQ3KTtcbiAgYm94LXNoYWRvdzogMCAxOHB4IDQycHggcmdiYSgyNTQsIDE0NCwgMCwgMC4zMik7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogNDJweDtcbiAgfVxufVxuXG4udXBkYXRlLWNhcmRfX2V5ZWJyb3cge1xuICBtYXJnaW46IDAgMCAxMHB4O1xuICBjb2xvcjogI2ZlOTAwMDtcbiAgZm9udC1zaXplOiAwLjc4cmVtO1xuICBmb250LXdlaWdodDogODAwO1xuICBsZXR0ZXItc3BhY2luZzogMC4xMmVtO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG5oMSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiBjbGFtcCgycmVtLCA5dncsIDMuNHJlbSk7XG4gIGxpbmUtaGVpZ2h0OiAwLjk2O1xuICBmb250LXdlaWdodDogOTAwO1xuICBsZXR0ZXItc3BhY2luZzogLTAuMDVlbTtcbn1cblxuLnVwZGF0ZS1jYXJkX19tZXNzYWdlIHtcbiAgbWF4LXdpZHRoOiA0MjBweDtcbiAgbWFyZ2luOiAyMnB4IGF1dG8gMDtcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43OCk7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNTU7XG59XG5cbi51cGRhdGUtY2FyZF9fdmVyc2lvbnMge1xuICBtYXJnaW46IDI4cHggYXV0bztcbiAgbWF4LXdpZHRoOiAzNjBweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogMTBweDtcblxuICBzcGFuIHtcbiAgICBwYWRkaW5nOiAxMnB4IDE0cHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xuICAgIGJvcmRlci1yYWRpdXM6IDE0cHg7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA2KTtcbiAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjg0KTtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICB9XG59XG5cbi51cGRhdGUtY2FyZF9fYnV0dG9uIHtcbiAgbWF4LXdpZHRoOiAzNjBweDtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMCBhdXRvO1xuICAtLWJhY2tncm91bmQ6ICNmZTkwMDA7XG4gIC0tYmFja2dyb3VuZC1hY3RpdmF0ZWQ6ICNlNTdmMDA7XG4gIC0tYmFja2dyb3VuZC1ob3ZlcjogI2ZmOWMxYTtcbiAgLS1ib3JkZXItcmFkaXVzOiAxNnB4O1xuICAtLWJveC1zaGFkb3c6IDAgMTZweCAzNHB4IHJnYmEoMjU0LCAxNDQsIDAsIDAuMjgpO1xuICAtLWNvbG9yOiAjMTExMTExO1xuICBtaW4taGVpZ2h0OiA1NnB4O1xuICBmb250LXdlaWdodDogOTAwO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
}));


/***/ }),

/***/ 77140:
/*!***************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/app-update/app-update.module.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppUpdateModule: () => (/* binding */ AppUpdateModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _app_update_modal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app-update-modal.component */ 97109);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _AppUpdateModule;





class AppUpdateModule {}
_AppUpdateModule = AppUpdateModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AppUpdateModule, "\u0275fac", function AppUpdateModule_Factory(t) {
  return new (t || _AppUpdateModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AppUpdateModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _AppUpdateModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AppUpdateModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppUpdateModule, {
    declarations: [_app_update_modal_component__WEBPACK_IMPORTED_MODULE_1__.AppUpdateModalComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateModule]
  });
})();

/***/ }),

/***/ 7645:
/*!**************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/maintenance/maintenance-modal.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MaintenanceModalComponent: () => (/* binding */ MaintenanceModalComponent)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 647);

var _MaintenanceModalComponent;



class MaintenanceModalComponent {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "message", '');
  }
}
_MaintenanceModalComponent = MaintenanceModalComponent;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MaintenanceModalComponent, "\u0275fac", function MaintenanceModalComponent_Factory(t) {
  return new (t || _MaintenanceModalComponent)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MaintenanceModalComponent, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _MaintenanceModalComponent,
  selectors: [["app-maintenance-modal"]],
  inputs: {
    message: "message"
  },
  decls: 18,
  vars: 13,
  consts: [[1, "maintenance-screen", 3, "fullscreen"], [1, "maintenance-card"], [1, "maintenance-card__icon"], ["name", "construct-outline"], [1, "maintenance-card__eyebrow"], [1, "maintenance-card__message"], [1, "maintenance-card__status"], ["name", "dots"]],
  template: function MaintenanceModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-content", 0)(1, "section", 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "ion-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](6, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](9, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "p", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](12, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](14, "ion-spinner", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](17, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("fullscreen", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](6, 5, "MAINTENANCE.MODAL.EYEBROW"));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](9, 7, "MAINTENANCE.MODAL.TITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.message || _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](12, 9, "MAINTENANCE.MODAL.DEFAULT_MESSAGE"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](17, 11, "MAINTENANCE.MODAL.CHECKING"));
    }
  },
  dependencies: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonSpinner, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslatePipe],
  styles: [".maintenance-screen[_ngcontent-%COMP%] {\n  --background: #0f0f0f;\n}\n\n.maintenance-card[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding: max(48px, env(safe-area-inset-top)) 24px max(32px, env(safe-area-inset-bottom));\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  text-align: center;\n  color: #ffffff;\n  background: radial-gradient(circle at top left, rgba(254, 144, 0, 0.25), transparent 34%), linear-gradient(180deg, #161616 0%, #0f0f0f 100%);\n}\n\n.maintenance-card__icon[_ngcontent-%COMP%] {\n  width: 82px;\n  height: 82px;\n  margin: 0 auto 24px;\n  display: grid;\n  place-items: center;\n  border-radius: 24px;\n  color: #111111;\n  background: linear-gradient(135deg, #fe9000, #ffb347);\n  box-shadow: 0 18px 42px rgba(254, 144, 0, 0.32);\n}\n.maintenance-card__icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 42px;\n}\n\n.maintenance-card__eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 10px;\n  color: #fe9000;\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: clamp(2rem, 9vw, 3.4rem);\n  line-height: 0.96;\n  font-weight: 900;\n  letter-spacing: -0.05em;\n}\n\n.maintenance-card__message[_ngcontent-%COMP%] {\n  max-width: 420px;\n  margin: 22px auto 0;\n  color: rgba(255, 255, 255, 0.78);\n  font-size: 1rem;\n  line-height: 1.55;\n}\n\n.maintenance-card__status[_ngcontent-%COMP%] {\n  margin: 28px auto 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 0.85rem;\n  font-weight: 600;\n}\n.maintenance-card__status[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {\n  width: 18px;\n  height: 18px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL21haW50ZW5hbmNlL21haW50ZW5hbmNlLW1vZGFsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UscUJBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0Esd0ZBQUE7RUFFQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLDRJQUNFO0FBREo7O0FBS0E7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EscURBQUE7RUFDQSwrQ0FBQTtBQUZGO0FBSUU7RUFDRSxlQUFBO0FBRko7O0FBTUE7RUFDRSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtBQUhGOztBQU1BO0VBQ0UsU0FBQTtFQUNBLG1DQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0FBSEY7O0FBTUE7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0NBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFIRjs7QUFNQTtFQUNFLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0EsK0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBSEY7QUFLRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FBSEoiLCJzb3VyY2VzQ29udGVudCI6WyIubWFpbnRlbmFuY2Utc2NyZWVuIHtcbiAgLS1iYWNrZ3JvdW5kOiAjMGYwZjBmO1xufVxuXG4ubWFpbnRlbmFuY2UtY2FyZCB7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IG1heCg0OHB4LCBlbnYoc2FmZS1hcmVhLWluc2V0LXRvcCkpIDI0cHhcbiAgICBtYXgoMzJweCwgZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20pKTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGJhY2tncm91bmQ6XG4gICAgcmFkaWFsLWdyYWRpZW50KGNpcmNsZSBhdCB0b3AgbGVmdCwgcmdiYSgyNTQsIDE0NCwgMCwgMC4yNSksIHRyYW5zcGFyZW50IDM0JSksXG4gICAgbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzE2MTYxNiAwJSwgIzBmMGYwZiAxMDAlKTtcbn1cblxuLm1haW50ZW5hbmNlLWNhcmRfX2ljb24ge1xuICB3aWR0aDogODJweDtcbiAgaGVpZ2h0OiA4MnB4O1xuICBtYXJnaW46IDAgYXV0byAyNHB4O1xuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1pdGVtczogY2VudGVyO1xuICBib3JkZXItcmFkaXVzOiAyNHB4O1xuICBjb2xvcjogIzExMTExMTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZlOTAwMCwgI2ZmYjM0Nyk7XG4gIGJveC1zaGFkb3c6IDAgMThweCA0MnB4IHJnYmEoMjU0LCAxNDQsIDAsIDAuMzIpO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDQycHg7XG4gIH1cbn1cblxuLm1haW50ZW5hbmNlLWNhcmRfX2V5ZWJyb3cge1xuICBtYXJnaW46IDAgMCAxMHB4O1xuICBjb2xvcjogI2ZlOTAwMDtcbiAgZm9udC1zaXplOiAwLjc4cmVtO1xuICBmb250LXdlaWdodDogODAwO1xuICBsZXR0ZXItc3BhY2luZzogMC4xMmVtO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG5oMSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiBjbGFtcCgycmVtLCA5dncsIDMuNHJlbSk7XG4gIGxpbmUtaGVpZ2h0OiAwLjk2O1xuICBmb250LXdlaWdodDogOTAwO1xuICBsZXR0ZXItc3BhY2luZzogLTAuMDVlbTtcbn1cblxuLm1haW50ZW5hbmNlLWNhcmRfX21lc3NhZ2Uge1xuICBtYXgtd2lkdGg6IDQyMHB4O1xuICBtYXJnaW46IDIycHggYXV0byAwO1xuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjc4KTtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS41NTtcbn1cblxuLm1haW50ZW5hbmNlLWNhcmRfX3N0YXR1cyB7XG4gIG1hcmdpbjogMjhweCBhdXRvIDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDEwcHg7XG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNSk7XG4gIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcblxuICBpb24tc3Bpbm5lciB7XG4gICAgd2lkdGg6IDE4cHg7XG4gICAgaGVpZ2h0OiAxOHB4O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ }),

/***/ 9260:
/*!*****************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/maintenance/maintenance.module.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MaintenanceModule: () => (/* binding */ MaintenanceModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _maintenance_modal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maintenance-modal.component */ 7645);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _MaintenanceModule;





class MaintenanceModule {}
_MaintenanceModule = MaintenanceModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MaintenanceModule, "\u0275fac", function MaintenanceModule_Factory(t) {
  return new (t || _MaintenanceModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MaintenanceModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _MaintenanceModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MaintenanceModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](MaintenanceModule, {
    declarations: [_maintenance_modal_component__WEBPACK_IMPORTED_MODULE_1__.MaintenanceModalComponent],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonicModule, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateModule]
  });
})();

/***/ }),

/***/ 89353:
/*!*************************************************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/components/disconnected/disconnected.component.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DisconnectedComponent: () => (/* binding */ DisconnectedComponent)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ 647);

var _DisconnectedComponent;



class DisconnectedComponent {
  constructor() {}
  ngOnInit() {}
}
_DisconnectedComponent = DisconnectedComponent;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DisconnectedComponent, "\u0275fac", function DisconnectedComponent_Factory(t) {
  return new (t || _DisconnectedComponent)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DisconnectedComponent, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _DisconnectedComponent,
  selectors: [["app-disconnected"]],
  decls: 18,
  vars: 13,
  consts: [[1, "disconnected-screen", 3, "fullscreen"], [1, "disconnected-card"], [1, "disconnected-card__icon"], ["name", "wifi-outline"], [1, "disconnected-card__eyebrow"], [1, "disconnected-card__message"], [1, "disconnected-card__status"], ["name", "crescent", "color", "primary", 1, "disconnected-card__spinner"]],
  template: function DisconnectedComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "ion-content", 0)(1, "section", 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "ion-icon", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "p", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](6, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "h1");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](9, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "p", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](12, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 6)(14, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](16, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](17, "ion-spinner", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("fullscreen", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](6, 5, "DISCONNECTED.EYEBROW"));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](9, 7, "DISCONNECTED.TITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](12, 9, "DISCONNECTED.MESSAGE"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](16, 11, "DISCONNECTED.WAITING"));
    }
  },
  dependencies: [_ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_2__.IonSpinner, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__.TranslatePipe],
  styles: [".disconnected-screen[_ngcontent-%COMP%] {\n  --background: #0f0f0f;\n}\n\n.disconnected-card[_ngcontent-%COMP%] {\n  min-height: 100%;\n  padding: max(48px, env(safe-area-inset-top)) 24px max(32px, env(safe-area-inset-bottom));\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  text-align: center;\n  color: #ffffff;\n  background: radial-gradient(circle at top left, rgba(254, 144, 0, 0.15), transparent 34%), linear-gradient(180deg, #161616 0%, #0f0f0f 100%);\n}\n\n.disconnected-card__icon[_ngcontent-%COMP%] {\n  width: 82px;\n  height: 82px;\n  margin: 0 auto 24px;\n  display: grid;\n  place-items: center;\n  border-radius: 24px;\n  color: #111111;\n  background: linear-gradient(135deg, #fe9000, #ffb347);\n  box-shadow: 0 18px 42px rgba(254, 144, 0, 0.32);\n}\n.disconnected-card__icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 42px;\n}\n\n.disconnected-card__eyebrow[_ngcontent-%COMP%] {\n  margin: 0 0 10px;\n  color: #fe9000;\n  font-size: 0.78rem;\n  font-weight: 800;\n  letter-spacing: 0.12em;\n  text-transform: uppercase;\n}\n\nh1[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: clamp(2rem, 9vw, 3.4rem);\n  line-height: 0.96;\n  font-weight: 900;\n  letter-spacing: -0.05em;\n}\n\n.disconnected-card__message[_ngcontent-%COMP%] {\n  max-width: 420px;\n  margin: 22px auto 0;\n  color: rgba(255, 255, 255, 0.78);\n  font-size: 1rem;\n  line-height: 1.55;\n}\n\n.disconnected-card__status[_ngcontent-%COMP%] {\n  margin: 28px auto 14px;\n  max-width: 360px;\n  width: 100%;\n}\n.disconnected-card__status[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  padding: 12px 14px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 14px;\n  background: rgba(255, 255, 255, 0.06);\n  color: rgba(255, 255, 255, 0.84);\n  font-weight: 700;\n}\n\n.disconnected-card__spinner[_ngcontent-%COMP%] {\n  margin: 0 auto;\n  --color: #fe9000;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC11aS9zcmMvYXBwL3NoYXJlZC9jb21wb25lbnRzL2Rpc2Nvbm5lY3RlZC9kaXNjb25uZWN0ZWQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxxQkFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSx3RkFBQTtFQUVBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0VBQ0EsNElBQ0U7QUFESjs7QUFLQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxxREFBQTtFQUNBLCtDQUFBO0FBRkY7QUFJRTtFQUNFLGVBQUE7QUFGSjs7QUFNQTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0FBSEY7O0FBTUE7RUFDRSxTQUFBO0VBQ0EsbUNBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFIRjs7QUFNQTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQ0FBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQUhGOztBQU1BO0VBQ0Usc0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUFIRjtBQUtFO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsMENBQUE7RUFDQSxtQkFBQTtFQUNBLHFDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtBQUhKOztBQU9BO0VBQ0UsY0FBQTtFQUNBLGdCQUFBO0FBSkYiLCJzb3VyY2VzQ29udGVudCI6WyIuZGlzY29ubmVjdGVkLXNjcmVlbiB7XG4gIC0tYmFja2dyb3VuZDogIzBmMGYwZjtcbn1cblxuLmRpc2Nvbm5lY3RlZC1jYXJkIHtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogbWF4KDQ4cHgsIGVudihzYWZlLWFyZWEtaW5zZXQtdG9wKSkgMjRweFxuICAgIG1heCgzMnB4LCBlbnYoc2FmZS1hcmVhLWluc2V0LWJvdHRvbSkpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgYmFja2dyb3VuZDpcbiAgICByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0IHRvcCBsZWZ0LCByZ2JhKDI1NCwgMTQ0LCAwLCAwLjE1KSwgdHJhbnNwYXJlbnQgMzQlKSxcbiAgICBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMTYxNjE2IDAlLCAjMGYwZjBmIDEwMCUpO1xufVxuXG4uZGlzY29ubmVjdGVkLWNhcmRfX2ljb24ge1xuICB3aWR0aDogODJweDtcbiAgaGVpZ2h0OiA4MnB4O1xuICBtYXJnaW46IDAgYXV0byAyNHB4O1xuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1pdGVtczogY2VudGVyO1xuICBib3JkZXItcmFkaXVzOiAyNHB4O1xuICBjb2xvcjogIzExMTExMTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZlOTAwMCwgI2ZmYjM0Nyk7XG4gIGJveC1zaGFkb3c6IDAgMThweCA0MnB4IHJnYmEoMjU0LCAxNDQsIDAsIDAuMzIpO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDQycHg7XG4gIH1cbn1cblxuLmRpc2Nvbm5lY3RlZC1jYXJkX19leWVicm93IHtcbiAgbWFyZ2luOiAwIDAgMTBweDtcbiAgY29sb3I6ICNmZTkwMDA7XG4gIGZvbnQtc2l6ZTogMC43OHJlbTtcbiAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMTJlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuaDEge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMnJlbSwgOXZ3LCAzLjRyZW0pO1xuICBsaW5lLWhlaWdodDogMC45NjtcbiAgZm9udC13ZWlnaHQ6IDkwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IC0wLjA1ZW07XG59XG5cbi5kaXNjb25uZWN0ZWQtY2FyZF9fbWVzc2FnZSB7XG4gIG1heC13aWR0aDogNDIwcHg7XG4gIG1hcmdpbjogMjJweCBhdXRvIDA7XG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzgpO1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjU1O1xufVxuXG4uZGlzY29ubmVjdGVkLWNhcmRfX3N0YXR1cyB7XG4gIG1hcmdpbjogMjhweCBhdXRvIDE0cHg7XG4gIG1heC13aWR0aDogMzYwcHg7XG4gIHdpZHRoOiAxMDAlO1xuXG4gIHNwYW4ge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHBhZGRpbmc6IDEycHggMTRweDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gICAgYm9yZGVyLXJhZGl1czogMTRweDtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDYpO1xuICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODQpO1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIH1cbn1cblxuLmRpc2Nvbm5lY3RlZC1jYXJkX19zcGlubmVyIHtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIC0tY29sb3I6ICNmZTkwMDA7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ }),

/***/ 48547:
/*!****************************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/constants/activity-factor.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ACTIVITY_FACTOR: () => (/* binding */ ACTIVITY_FACTOR),
/* harmony export */   ACTIVITY_FACTOR_TYPES: () => (/* binding */ ACTIVITY_FACTOR_TYPES),
/* harmony export */   ACTIVITY_FACTOR_VALUES: () => (/* binding */ ACTIVITY_FACTOR_VALUES)
/* harmony export */ });
var ACTIVITY_FACTOR_TYPES;
(function (ACTIVITY_FACTOR_TYPES) {
  ACTIVITY_FACTOR_TYPES[ACTIVITY_FACTOR_TYPES["veryLight"] = 1] = "veryLight";
  ACTIVITY_FACTOR_TYPES[ACTIVITY_FACTOR_TYPES["light"] = 2] = "light";
  ACTIVITY_FACTOR_TYPES[ACTIVITY_FACTOR_TYPES["moderate"] = 3] = "moderate";
  ACTIVITY_FACTOR_TYPES[ACTIVITY_FACTOR_TYPES["active"] = 4] = "active";
  ACTIVITY_FACTOR_TYPES[ACTIVITY_FACTOR_TYPES["veryActive"] = 5] = "veryActive";
})(ACTIVITY_FACTOR_TYPES || (ACTIVITY_FACTOR_TYPES = {}));
const ACTIVITY_FACTOR = {
  [ACTIVITY_FACTOR_TYPES.veryLight]: {
    id: ACTIVITY_FACTOR_TYPES.veryLight,
    name: 'ACTIVITY_FACTOR.VERY_LIGHT',
    value: 1.15,
    description: 'ACTIVITY_FACTOR.VERY_LIGHT_DESC'
  },
  [ACTIVITY_FACTOR_TYPES.light]: {
    id: ACTIVITY_FACTOR_TYPES.light,
    name: 'ACTIVITY_FACTOR.LIGHT',
    value: 1.3,
    description: 'ACTIVITY_FACTOR.LIGHT_DESC'
  },
  [ACTIVITY_FACTOR_TYPES.moderate]: {
    id: ACTIVITY_FACTOR_TYPES.moderate,
    name: 'ACTIVITY_FACTOR.MODERATE',
    value: 1.45,
    description: 'ACTIVITY_FACTOR.MODERATE_DESC'
  },
  [ACTIVITY_FACTOR_TYPES.active]: {
    id: ACTIVITY_FACTOR_TYPES.active,
    name: 'ACTIVITY_FACTOR.ACTIVE',
    value: 1.6,
    description: 'ACTIVITY_FACTOR.ACTIVE_DESC'
  },
  [ACTIVITY_FACTOR_TYPES.veryActive]: {
    id: ACTIVITY_FACTOR_TYPES.veryActive,
    name: 'ACTIVITY_FACTOR.VERY_ACTIVE',
    value: 1.75,
    description: 'ACTIVITY_FACTOR.VERY_ACTIVE_DESC'
  }
};
const ACTIVITY_FACTOR_VALUES = Object.values(ACTIVITY_FACTOR);

/***/ }),

/***/ 46926:
/*!**************************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/constants/measureFilter.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MEASURE_FILTER: () => (/* binding */ MEASURE_FILTER),
/* harmony export */   MEASURE_FILTER_TYPES: () => (/* binding */ MEASURE_FILTER_TYPES),
/* harmony export */   MEASURE_FILTER_VALUES: () => (/* binding */ MEASURE_FILTER_VALUES)
/* harmony export */ });
var MEASURE_FILTER_TYPES;
(function (MEASURE_FILTER_TYPES) {
  MEASURE_FILTER_TYPES[MEASURE_FILTER_TYPES["auto"] = -1] = "auto";
  MEASURE_FILTER_TYPES[MEASURE_FILTER_TYPES["cieng"] = 0] = "cieng";
  MEASURE_FILTER_TYPES[MEASURE_FILTER_TYPES["racion"] = 1] = "racion";
  MEASURE_FILTER_TYPES[MEASURE_FILTER_TYPES["total"] = 2] = "total";
})(MEASURE_FILTER_TYPES || (MEASURE_FILTER_TYPES = {}));
const MEASURE_FILTER = {
  [MEASURE_FILTER_TYPES.auto]: {
    id: MEASURE_FILTER_TYPES.auto,
    name: 'MEASURE_FILTER.AUTO',
    description: 'MEASURE_FILTER.AUTO_DESC'
  },
  [MEASURE_FILTER_TYPES.total]: {
    id: MEASURE_FILTER_TYPES.total,
    name: 'MEASURE_FILTER.TOTAL_WEIGHT',
    description: 'MEASURE_FILTER.TOTAL_WEIGHT_DESC'
  },
  [MEASURE_FILTER_TYPES.cieng]: {
    id: MEASURE_FILTER_TYPES.cieng,
    name: 'MEASURE_FILTER.PER_100G',
    description: 'MEASURE_FILTER.PER_100G_DESC'
  },
  [MEASURE_FILTER_TYPES.racion]: {
    id: MEASURE_FILTER_TYPES.racion,
    name: 'MEASURE_FILTER.SERVING',
    description: 'MEASURE_FILTER.SERVING_DESC'
  }
};
const MEASURE_FILTER_VALUES = Object.values(MEASURE_FILTER_TYPES);

/***/ }),

/***/ 97664:
/*!****************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/constants/sex.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SEX: () => (/* binding */ SEX),
/* harmony export */   SEX_TYPES: () => (/* binding */ SEX_TYPES)
/* harmony export */ });
var SEX_TYPES;
(function (SEX_TYPES) {
  SEX_TYPES[SEX_TYPES["female"] = 0] = "female";
  SEX_TYPES[SEX_TYPES["male"] = 1] = "male";
})(SEX_TYPES || (SEX_TYPES = {}));
const SEX = {
  [SEX_TYPES.female]: 'Femenino',
  [SEX_TYPES.male]: 'Masculino'
};

/***/ }),

/***/ 2923:
/*!******************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/constants/steps.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STEPS: () => (/* binding */ STEPS),
/* harmony export */   STEPS_TYPES: () => (/* binding */ STEPS_TYPES),
/* harmony export */   STEPS_VALUES: () => (/* binding */ STEPS_VALUES)
/* harmony export */ });
var STEPS_TYPES;
(function (STEPS_TYPES) {
  STEPS_TYPES[STEPS_TYPES["notCounted"] = 0] = "notCounted";
  STEPS_TYPES[STEPS_TYPES["lessThan1000"] = 1] = "lessThan1000";
  STEPS_TYPES[STEPS_TYPES["between2000And6000"] = 2] = "between2000And6000";
  STEPS_TYPES[STEPS_TYPES["between7000And9000"] = 3] = "between7000And9000";
  STEPS_TYPES[STEPS_TYPES["betweenThan10000And15000"] = 4] = "betweenThan10000And15000";
  STEPS_TYPES[STEPS_TYPES["betweenThan16000And18000"] = 5] = "betweenThan16000And18000";
  STEPS_TYPES[STEPS_TYPES["moreThan19000"] = 6] = "moreThan19000";
})(STEPS_TYPES || (STEPS_TYPES = {}));
// Cuando le da a ninguno
const STEPS = {
  [STEPS_TYPES.notCounted]: {
    id: STEPS_TYPES.notCounted,
    name: 'STEPS.NOT_COUNTED',
    value: 1
  },
  [STEPS_TYPES.lessThan1000]: {
    id: STEPS_TYPES.lessThan1000,
    name: 'STEPS.LESS_THAN_1000',
    value: 1.2
  },
  [STEPS_TYPES.between2000And6000]: {
    id: STEPS_TYPES.between2000And6000,
    name: 'STEPS.BETWEEN_2000_6000',
    value: 1.37
  },
  [STEPS_TYPES.between7000And9000]: {
    id: STEPS_TYPES.between7000And9000,
    name: 'STEPS.BETWEEN_7000_9000',
    value: 1.46
  },
  [STEPS_TYPES.betweenThan10000And15000]: {
    id: STEPS_TYPES.betweenThan10000And15000,
    name: 'STEPS.BETWEEN_10000_15000',
    value: 1.55
  },
  [STEPS_TYPES.betweenThan16000And18000]: {
    id: STEPS_TYPES.betweenThan16000And18000,
    name: 'STEPS.BETWEEN_16000_18000',
    value: 1.71
  },
  [STEPS_TYPES.moreThan19000]: {
    id: STEPS_TYPES.moreThan19000,
    name: 'STEPS.MORE_THAN_19000',
    value: 1.86
  }
};
const STEPS_VALUES = Object.values(STEPS);

/***/ }),

/***/ 72534:
/*!***********************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/constants/table-mode.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TABLE_MODE_TYPES: () => (/* binding */ TABLE_MODE_TYPES)
/* harmony export */ });
var TABLE_MODE_TYPES;
(function (TABLE_MODE_TYPES) {
  TABLE_MODE_TYPES["mesocycle"] = "mesocycle";
  TABLE_MODE_TYPES["summaryGeneral"] = "summaryGeneral";
  TABLE_MODE_TYPES["summaryWorkout"] = "summaryWorkout";
})(TABLE_MODE_TYPES || (TABLE_MODE_TYPES = {}));
// export type TABLE_MODE_TYPE = {
//   id: TABLE_MODE_TYPES;
//   value: string;
//   icon: string;
//   color?: string;
// };
// export const TABLE_MODE: {
//   [id: number]: TABLE_MODE_TYPE;
// } = {
//   [TABLE_MODE_TYPES.mesocycle]: {
//     id: TABLE_MODE_TYPES.mesocycle,
//     value: 'Añadir entrenamiento',
//     icon: 'barbell-outline',
//   },
//   [TABLE_MODE_TYPES.summaryGeneral]: {
//     id: TABLE_MODE_TYPES.summaryGeneral,
//     value: 'Añadir micro-ciclo',
//     icon: 'albums-outline',
//     color: 'tertiary',
//   },
//   [TABLE_MODE_TYPES.summaryWorkout]: {
//     id: TABLE_MODE_TYPES.summaryWorkout,
//     value: 'Eliminar micro-ciclo',
//     icon: 'trash-bin-outline',
//     color: 'danger',
//   },
// };
// export const TABLE_MODE_VALUES = Object.values(TABLE_MODE);

/***/ }),

/***/ 72972:
/*!**********************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/constants/week-days.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   WEEK_DAYS: () => (/* binding */ WEEK_DAYS)
/* harmony export */ });
const WEEK_DAYS = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6
};

/***/ }),

/***/ 18916:
/*!*******************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/models/dateRange.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DateRange: () => (/* binding */ DateRange)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);

class DateRange {
  constructor(minDate, maxDate) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "minDate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "maxDate", void 0);
    this.minDate = minDate;
    this.maxDate = maxDate;
  }
}

/***/ }),

/***/ 41805:
/*!*********************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/models/macros-data.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MACROS_VALUES: () => (/* binding */ MACROS_VALUES),
/* harmony export */   MacrosData: () => (/* binding */ MacrosData)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);

class MacrosData {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "kcal", 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "protein", 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "carbohydrate", 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "fat", 0);
  }
}
var MACROS_VALUES;
(function (MACROS_VALUES) {
  MACROS_VALUES[MACROS_VALUES["proteins"] = 4] = "proteins";
  MACROS_VALUES[MACROS_VALUES["carbohydrates"] = 4] = "carbohydrates";
  MACROS_VALUES[MACROS_VALUES["fat"] = 9] = "fat";
})(MACROS_VALUES || (MACROS_VALUES = {}));

/***/ }),

/***/ 30289:
/*!************************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/models/meal-clipboard.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MealClipboard: () => (/* binding */ MealClipboard)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_core_models_meal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/models/meal */ 50059);


class MealClipboard {
  constructor(mealClipboard, mealToPaste) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "mealClipboard", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "mealToPaste", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selectedProducts", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selectedRecipes", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isFullMeal", true);
    this.mealClipboard = mealClipboard;
    this.mealToPaste = mealToPaste;
  }
  setFullMeal() {
    this.isFullMeal = true;
    this.selectedProducts = [];
    this.selectedRecipes = [];
  }
  setPartialSelection(productIds, recipeIds) {
    this.isFullMeal = false;
    this.selectedProducts = productIds;
    this.selectedRecipes = recipeIds;
  }
  getFilteredMeal() {
    if (this.isFullMeal || !this.mealClipboard) {
      return this.mealClipboard;
    }
    const filteredMeal = new src_app_core_models_meal__WEBPACK_IMPORTED_MODULE_1__.Meal();
    filteredMeal._id = this.mealClipboard._id;
    filteredMeal.name = this.mealClipboard.name;
    filteredMeal.notes = this.mealClipboard.notes;
    if (this.mealClipboard.customProducts) {
      filteredMeal.customProducts = this.mealClipboard.customProducts.filter(cp => this.selectedProducts.includes(cp._id));
    }
    if (this.mealClipboard.customRecipes) {
      filteredMeal.customRecipes = this.mealClipboard.customRecipes.filter(cr => this.selectedRecipes.includes(cr._id));
    }
    return filteredMeal;
  }
  getSelectedProductsCount() {
    return this.isFullMeal ? this.mealClipboard?.customProducts?.length ?? 0 : this.selectedProducts.length;
  }
  getSelectedRecipesCount() {
    return this.isFullMeal ? this.mealClipboard?.customRecipes?.length ?? 0 : this.selectedRecipes.length;
  }
  getTotalItemsCount() {
    return this.getSelectedProductsCount() + this.getSelectedRecipesCount();
  }
  hasSelection() {
    return this.getTotalItemsCount() > 0;
  }
}

/***/ }),

/***/ 20544:
/*!***************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/models/theme.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   THEMES: () => (/* binding */ THEMES),
/* harmony export */   Theme: () => (/* binding */ Theme)
/* harmony export */ });
var Theme;
(function (Theme) {
  Theme["dark"] = "dark";
  Theme["light"] = "light";
})(Theme || (Theme = {}));
const THEMES = {
  dark: {
    id: Theme.dark
  },
  light: {
    id: Theme.light
  }
};

/***/ }),

/***/ 48107:
/*!**********************************************************************************************************************************************!*\
  !*** ../../node_modules/@ionic/core/dist/esm/ lazy ^\.\/.*\.entry\.js$ include: \.entry\.js$ exclude: \.system\.entry\.js$ namespace object ***!
  \**********************************************************************************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ion-accordion_2.entry.js": [
		88803,
		"common",
		"node_modules_ionic_core_dist_esm_ion-accordion_2_entry_js"
	],
	"./ion-action-sheet.entry.js": [
		86530,
		"common",
		"node_modules_ionic_core_dist_esm_ion-action-sheet_entry_js"
	],
	"./ion-alert.entry.js": [
		71330,
		"common",
		"node_modules_ionic_core_dist_esm_ion-alert_entry_js"
	],
	"./ion-app_8.entry.js": [
		57716,
		"common",
		"node_modules_ionic_core_dist_esm_ion-app_8_entry_js"
	],
	"./ion-avatar_3.entry.js": [
		26093,
		"node_modules_ionic_core_dist_esm_ion-avatar_3_entry_js"
	],
	"./ion-back-button.entry.js": [
		38238,
		"common",
		"node_modules_ionic_core_dist_esm_ion-back-button_entry_js"
	],
	"./ion-backdrop.entry.js": [
		85940,
		"node_modules_ionic_core_dist_esm_ion-backdrop_entry_js"
	],
	"./ion-breadcrumb_2.entry.js": [
		89182,
		"common",
		"node_modules_ionic_core_dist_esm_ion-breadcrumb_2_entry_js"
	],
	"./ion-button_2.entry.js": [
		57403,
		"node_modules_ionic_core_dist_esm_ion-button_2_entry_js"
	],
	"./ion-card_5.entry.js": [
		77580,
		"node_modules_ionic_core_dist_esm_ion-card_5_entry_js"
	],
	"./ion-checkbox.entry.js": [
		73427,
		"node_modules_ionic_core_dist_esm_ion-checkbox_entry_js"
	],
	"./ion-chip.entry.js": [
		29492,
		"node_modules_ionic_core_dist_esm_ion-chip_entry_js"
	],
	"./ion-col_3.entry.js": [
		22632,
		"node_modules_ionic_core_dist_esm_ion-col_3_entry_js"
	],
	"./ion-datetime-button.entry.js": [
		50715,
		"default-node_modules_ionic_core_dist_esm_data-bb424ba8_js",
		"node_modules_ionic_core_dist_esm_ion-datetime-button_entry_js"
	],
	"./ion-datetime_3.entry.js": [
		76057,
		"default-node_modules_ionic_core_dist_esm_data-bb424ba8_js",
		"common",
		"node_modules_ionic_core_dist_esm_ion-datetime_3_entry_js"
	],
	"./ion-fab_3.entry.js": [
		77875,
		"common",
		"node_modules_ionic_core_dist_esm_ion-fab_3_entry_js"
	],
	"./ion-img.entry.js": [
		17083,
		"node_modules_ionic_core_dist_esm_ion-img_entry_js"
	],
	"./ion-infinite-scroll_2.entry.js": [
		78127,
		"common",
		"node_modules_ionic_core_dist_esm_ion-infinite-scroll_2_entry_js"
	],
	"./ion-input.entry.js": [
		59580,
		"default-node_modules_ionic_core_dist_esm_form-controller-21dd62b1_js-node_modules_ionic_core_-a176d1",
		"common",
		"node_modules_ionic_core_dist_esm_ion-input_entry_js"
	],
	"./ion-item-option_3.entry.js": [
		57465,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item-option_3_entry_js"
	],
	"./ion-item_8.entry.js": [
		58750,
		"common",
		"node_modules_ionic_core_dist_esm_ion-item_8_entry_js"
	],
	"./ion-loading.entry.js": [
		41400,
		"common",
		"node_modules_ionic_core_dist_esm_ion-loading_entry_js"
	],
	"./ion-menu_3.entry.js": [
		75567,
		"common",
		"node_modules_ionic_core_dist_esm_ion-menu_3_entry_js"
	],
	"./ion-modal.entry.js": [
		22813,
		"common",
		"node_modules_ionic_core_dist_esm_ion-modal_entry_js"
	],
	"./ion-nav_2.entry.js": [
		27788,
		"node_modules_ionic_core_dist_esm_ion-nav_2_entry_js"
	],
	"./ion-picker-column-internal.entry.js": [
		23389,
		"common",
		"node_modules_ionic_core_dist_esm_ion-picker-column-internal_entry_js"
	],
	"./ion-picker-internal.entry.js": [
		62752,
		"node_modules_ionic_core_dist_esm_ion-picker-internal_entry_js"
	],
	"./ion-popover.entry.js": [
		60741,
		"common",
		"node_modules_ionic_core_dist_esm_ion-popover_entry_js"
	],
	"./ion-progress-bar.entry.js": [
		47445,
		"node_modules_ionic_core_dist_esm_ion-progress-bar_entry_js"
	],
	"./ion-radio_2.entry.js": [
		32574,
		"common",
		"node_modules_ionic_core_dist_esm_ion-radio_2_entry_js"
	],
	"./ion-range.entry.js": [
		98777,
		"common",
		"node_modules_ionic_core_dist_esm_ion-range_entry_js"
	],
	"./ion-refresher_2.entry.js": [
		91913,
		"common",
		"node_modules_ionic_core_dist_esm_ion-refresher_2_entry_js"
	],
	"./ion-reorder_2.entry.js": [
		92162,
		"common",
		"node_modules_ionic_core_dist_esm_ion-reorder_2_entry_js"
	],
	"./ion-ripple-effect.entry.js": [
		15368,
		"node_modules_ionic_core_dist_esm_ion-ripple-effect_entry_js"
	],
	"./ion-route_4.entry.js": [
		14638,
		"node_modules_ionic_core_dist_esm_ion-route_4_entry_js"
	],
	"./ion-searchbar.entry.js": [
		53901,
		"common",
		"node_modules_ionic_core_dist_esm_ion-searchbar_entry_js"
	],
	"./ion-segment_2.entry.js": [
		34364,
		"common",
		"node_modules_ionic_core_dist_esm_ion-segment_2_entry_js"
	],
	"./ion-select_3.entry.js": [
		17688,
		"common",
		"node_modules_ionic_core_dist_esm_ion-select_3_entry_js"
	],
	"./ion-spinner.entry.js": [
		40529,
		"common",
		"node_modules_ionic_core_dist_esm_ion-spinner_entry_js"
	],
	"./ion-split-pane.entry.js": [
		55123,
		"node_modules_ionic_core_dist_esm_ion-split-pane_entry_js"
	],
	"./ion-tab-bar_2.entry.js": [
		32482,
		"common",
		"node_modules_ionic_core_dist_esm_ion-tab-bar_2_entry_js"
	],
	"./ion-tab_2.entry.js": [
		67826,
		"node_modules_ionic_core_dist_esm_ion-tab_2_entry_js"
	],
	"./ion-text.entry.js": [
		86941,
		"node_modules_ionic_core_dist_esm_ion-text_entry_js"
	],
	"./ion-textarea.entry.js": [
		49304,
		"default-node_modules_ionic_core_dist_esm_form-controller-21dd62b1_js-node_modules_ionic_core_-a176d1",
		"node_modules_ionic_core_dist_esm_ion-textarea_entry_js"
	],
	"./ion-toast.entry.js": [
		4107,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toast_entry_js"
	],
	"./ion-toggle.entry.js": [
		81858,
		"common",
		"node_modules_ionic_core_dist_esm_ion-toggle_entry_js"
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(() => {
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 48107;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 70979:
/*!****************************************************************************************************************************************************************!*\
  !*** ../../node_modules/@stencil/core/internal/client/ lazy ^\.\/.*\.entry\.js.*$ include: \.entry\.js$ exclude: \.system\.entry\.js$ strict namespace object ***!
  \****************************************************************************************************************************************************************/
/***/ ((module) => {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(() => {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = () => ([]);
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 70979;
module.exports = webpackEmptyAsyncContext;

/***/ }),

/***/ 8330:
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = /*#__PURE__*/JSON.parse('{"name":"@trainfit/train-fit-trainers","version":"1.0.0","author":"TrainFit","homepage":"https://trainfit.net","scripts":{"ng":"ng","start":"ionic serve","start:pre":"ionic serve --configuration=pre","start:pro":"ionic serve --configuration=production","build":"ionic build","build:pre":"ionic build --configuration=pre","build:pro":"ionic build --configuration=production","watch":"ng build --watch --configuration development","lint":"ng lint","build:i":"npm run build:i:pro","build:a":"npm run build:a:pro","build:i:pre":"ionic build --configuration=pre && npx cap sync ios && npx cap open ios && npx cap run ios","build:a:pre":"ionic build --configuration=pre && npx cap sync android && npx cap open android && npx cap run android","build:i:pro":"ionic build --configuration=production && npx cap sync ios && npx cap open ios && npx cap run ios","build:a:pro":"ionic build --configuration=production && npx cap sync android && npx cap open android && npx cap run android","live:i":"ionic cap run ios --livereload --external --host=0.0.0.0 --configuration=live","live:a":"ionic cap run android --livereload --external --host=0.0.0.0 --configuration=live"},"private":true,"dependencies":{"@angular/animations":"^16.0.0","@angular/cdk":"^16.2.0","@angular/common":"^16.0.0","@angular/compiler":"^16.0.0","@angular/core":"^16.0.0","@angular/forms":"^16.0.0","@angular/platform-browser":"^16.0.0","@angular/platform-browser-dynamic":"^16.0.0","@angular/router":"^16.0.0","@capacitor/android":"^7.0.0","@capacitor/app":"^7.0.0","@capacitor/barcode-scanner":"^2.2.0","@capacitor/browser":"^7.0.0","@capacitor/core":"^7.0.0","@capacitor/ios":"^7.0.0","@capacitor/keyboard":"^7.0.0","@capacitor/network":"^7.0.0","@capawesome/capacitor-android-edge-to-edge-support":"^7.2.3","@capgo/capacitor-navigation-bar":"^7.3.14","@capgo/capacitor-social-login":"^7.0.0","@ionic/angular":"^7.0.0","@revenuecat/purchases-capacitor":"^11.3.2","@revenuecat/purchases-capacitor-ui":"^11.3.2","@zxing/library":"^0.21.3","capacitor-secure-storage-plugin":"^0.12.0","chart.js":"^4.4.1","ionicons":"^7.0.0","ng2-charts":"^5.0.4","rxjs":"~7.8.0","swiper":"^11.0.5","tslib":"^2.3.0","zone.js":"~0.13.0"},"devDependencies":{"@angular-devkit/build-angular":"^16.0.0","@angular-eslint/builder":"^16.0.0","@angular-eslint/eslint-plugin":"^16.0.0","@angular-eslint/eslint-plugin-template":"^16.0.0","@angular-eslint/schematics":"^16.0.0","@angular-eslint/template-parser":"^16.0.0","@angular/cli":"^16.0.0","@angular/compiler-cli":"^16.0.0","@angular/language-service":"^16.0.0","@capacitor/assets":"3.0.5","@capacitor/cli":"^7.0.0","@ionic/angular-toolkit":"^9.0.0","@types/node":"^20.0.0","@typescript-eslint/eslint-plugin":"^6.0.0","@typescript-eslint/parser":"^6.0.0","eslint":"^7.26.0","eslint-plugin-import":"2.22.1","eslint-plugin-jsdoc":"30.7.6","eslint-plugin-prefer-arrow":"1.2.2","ts-node":"^8.3.0","typescript":"~5.0.2"},"description":"TrainFit Trainers comparte la base del frontend de TrainFit en formato monorepo y ofrece una app Ionic independiente para profesionales (entrenadores/nutricionistas) que gestionan clientes.","browserslist":["last 2 Chrome versions","last 2 ChromeAndroid versions","last 2 Firefox versions","last 2 Edge versions","Safari >=15","iOS >=15","not IE 11","not dead"]}');

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(53443)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map