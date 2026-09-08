"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_features_shell_shell_module_ts"],{

/***/ 93918:
/*!**************************************************************************!*\
  !*** ./src/app/features/invites/services/trainer-invites-api.service.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrainerInvitesApiService: () => (/* binding */ TrainerInvitesApiService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/http/http.service */ 88552);

var _TrainerInvitesApiService;


class TrainerInvitesApiService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  getMyInvites() {
    return this.http.get(TrainerInvitesApiService.ENDPOINT);
  }
  sendInvite(clientEmail, scopes) {
    return this.http.post(TrainerInvitesApiService.ENDPOINT, {
      clientEmail,
      scopes
    });
  }
  cancelInvite(id) {
    return this.http.delete(`${TrainerInvitesApiService.ENDPOINT}/${id}`);
  }
  // TAREA 3 — cuestionario inicial del cliente.
  getClientIntake(clientId) {
    return this.http.get(`trainer/clients/${clientId}/intake`);
  }
  confirmClient(clientId) {
    return this.http.post(`trainer/clients/${clientId}/confirm`, {});
  }
  // TASK-049 — configuración de campos activos del cuestionario inicial.
  getIntakeConfig() {
    return this.http.get('trainer/intake-config');
  }
  updateIntakeConfig(enabledFields, customQuestions, lastScopes) {
    return this.http.put('trainer/intake-config', {
      enabledFields,
      customQuestions,
      lastScopes
    });
  }
  // Estado por scope (training/nutrition) de este email con ESTE trainer —
  // para avisar en el form de invitar antes de enviar, no solo dejar que
  // falle el submit contra el índice único del backend.
  checkClientEmailStatus(email) {
    return this.http.get(`trainer/clients/check-email?email=${encodeURIComponent(email)}`);
  }
}
_TrainerInvitesApiService = TrainerInvitesApiService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TrainerInvitesApiService, "ENDPOINT", 'trainer/invites');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TrainerInvitesApiService, "\u0275fac", function TrainerInvitesApiService_Factory(t) {
  return new (t || _TrainerInvitesApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TrainerInvitesApiService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _TrainerInvitesApiService,
  factory: _TrainerInvitesApiService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 14492:
/*!****************************************************************************!*\
  !*** ./src/app/features/invites/services/trainer-review-status.service.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrainerReviewStatusService: () => (/* binding */ TrainerReviewStatusService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 84288);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _trainer_invites_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./trainer-invites-api.service */ 93918);

var _TrainerReviewStatusService;



// Antes shell.page.ts (badge de "Clientes") y clients.page.ts (banner de
// revisión) llamaban cada uno por su cuenta a GET /trainer/invites, y
// clients.page.ts encima la disparaba A LA VEZ que su propia llamada a
// GET /trainer/clients/paginated nada más entrar. Dos peticiones
// autenticadas concurrentes justo al montar la pantalla se cruzaban con el
// refresh de sesión del interceptor JWT y la dejaban cargando para siempre.
// `refresh()` es explícito y nunca se dispara solo al suscribirse — cada
// consumidor decide CUÁNDO pedirlo (clients.page.ts lo encadena después de
// que responda su propia lista, nunca en paralelo).
class TrainerReviewStatusService {
  constructor(trainerInvitesApi) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "trainerInvitesApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "reviewInvites$", new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject([]));
    this.trainerInvitesApi = trainerInvitesApi;
  }
  get reviewInvites() {
    return this.reviewInvites$.asObservable();
  }
  refresh() {
    this.trainerInvitesApi.getMyInvites().subscribe({
      next: invites => {
        this.reviewInvites$.next((invites || []).filter(invite => invite.status === 'en_revision'));
      },
      error: () => {
        // Silencioso — mismo criterio que antes: es un aviso complementario,
        // no debe romper Clientes ni el shell si esta llamada falla.
      }
    });
  }
}
_TrainerReviewStatusService = TrainerReviewStatusService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TrainerReviewStatusService, "\u0275fac", function TrainerReviewStatusService_Factory(t) {
  return new (t || _TrainerReviewStatusService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_trainer_invites_api_service__WEBPACK_IMPORTED_MODULE_1__.TrainerInvitesApiService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TrainerReviewStatusService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _TrainerReviewStatusService,
  factory: _TrainerReviewStatusService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 11702:
/*!********************************************************!*\
  !*** ./src/app/features/shell/shell-routing.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShellPageRoutingModule: () => (/* binding */ ShellPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _shell_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shell.page */ 93992);
/* harmony import */ var src_app_features_clients_resolvers_table_in_context_resolver__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/features/clients/resolvers/table-in-context.resolver */ 3899);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);

var _ShellPageRoutingModule;





const routes = [{
  path: '',
  redirectTo: 'dashboard',
  pathMatch: 'full'
}, {
  path: '',
  component: _shell_page__WEBPACK_IMPORTED_MODULE_1__.ShellPage,
  children: [{
    // Nueva pantalla de aterrizaje (mockup "TrainFit Panel" > Dashboard) —
    // vista agregada de clientes/tareas/check-ins/alertas de un vistazo.
    path: 'dashboard',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_features_dashboard_dashboard_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/dashboard/dashboard.module */ 27907)).then(m => m.DashboardPageModule)
  }, {
    // Mockup "TrainFit Panel" > Plantillas, hoy **Biblioteca**: lo que el
    // entrenador prepara para dárselo a un cliente (entrenamientos,
    // rutinas, dietas, intercambios, ejercicios). La ruta sigue siendo
    // 'templates' a propósito — renombrarla rompería los enlaces
    // guardados de quien ya usa la app sin ganar nada: el nombre que ve
    // el usuario está en la cabecera y en el menú, no en la URL.
    path: 'templates',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_shared_components_category-grid_category-grid_module_ts"), __webpack_require__.e("common"), __webpack_require__.e("src_app_features_templates_templates_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/templates/templates.module */ 10939)).then(m => m.TemplatesPageModule)
  }, {
    // Movimiento 6 Coach Pro — cuánto estimula cada ejercicio a cada
    // músculo y cuánto castiga a cada articulación, según ESTE
    // entrenador. Alcanzable desde Mi método: es literalmente eso, y no
    // material que se le dé al cliente.
    path: 'exercise-scores',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_features_exercise-scores_exercise-scores_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/exercise-scores/exercise-scores.module */ 51243)).then(m => m.ExerciseScoresPageModule)
  }, {
    // Movimiento 1 Coach Pro — la otra mitad del antiguo hub: cómo
    // trabaja el entrenador (check-ins, protocolos, automatizaciones).
    path: 'method',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_features_checkin-templates_components_apply-checkin-template-modal_apply-chec-5aea39"), __webpack_require__.e("default-src_app_shared_components_category-grid_category-grid_module_ts"), __webpack_require__.e("common"), __webpack_require__.e("src_app_features_method_method_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/method/method.module */ 55387)).then(m => m.MethodPageModule)
  }, {
    // Mockup "TrainFit Panel" > Rutinas — builder de biblioteca de
    // ejercicios + tabla de días/series. Visual únicamente por ahora
    // (Fase 1), sin conexión al motor real de rutinas.
    path: 'routines',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_features_routines_routines_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/routines/routines.module */ 18171)).then(m => m.RoutinesPageModule)
  }, {
    // Rutinas -> Plantillas (rediseño 2026-08) — biblioteca de plantillas
    // de rutina COMPLETA (microciclos/splits/workouts) del profesional,
    // distinta de /tabs/routines (biblioteca de WorkoutTemplate: un solo
    // día/sesión). Reemplaza a la antigua RoutinesOverviewPage, que
    // mostraba rutinas ya asignadas a clientes (esa vista se elimina: esa
    // info ya vive en la ficha de cada cliente) — ver templates.page.ts.
    // La ruta del Planificador en modo plantilla va DECLARADA ANTES que
    // esta (más específica primero, mismo criterio que TASK-026 para
    // 'clients/:clientId/tables/:tableId/planner' vs 'clients').
    path: 'routine-templates/:tableId/planner',
    resolve: {
      table: src_app_features_clients_resolvers_table_in_context_resolver__WEBPACK_IMPORTED_MODULE_2__.TableInContextResolver
    },
    data: {
      templateMode: true
    },
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_features_planner_planner_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/planner/planner.module */ 43627)).then(m => m.PlannerPageModule)
  }, {
    path: 'routine-templates',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_features_routine-templates_routine-templates_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/routine-templates/routine-templates.module */ 75607)).then(m => m.RoutineTemplatesPageModule)
  }, {
    // TASK-042 (MASTER_BACKLOG.md) — catálogo de ejercicios como pantalla
    // propia, alcanzable desde la categoría "Ejercicios" en Biblioteca
    // (/tabs/templates), no como destino nuevo del sidebar.
    path: 'exercises',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_features_exercise-library_exercise-library_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/exercise-library/exercise-library.module */ 72229)).then(m => m.ExerciseLibraryPageModule)
  }, {
    // TASK-026 (MASTER_BACKLOG.md) — antes vivía como ruta raíz en
    // app-routing.module.ts ('clients/:clientId/tables/:tableId/planner',
    // fuera de 'tabs'): el usuario perdía el sidebar al entrar, y había
    // dos espacios de nombres de URL distintos para "clients" (este y el
    // 'clients' de justo abajo). Anidada aquí, la URL real pasa a ser
    // '/tabs/clients/:clientId/tables/:tableId/planner' — mismo
    // namespace que la ficha de cliente. Declarada ANTES que 'clients'
    // (más específica primero) para que el Router la resuelva
    // directamente en vez de depender del backtracking tras intentar
    // encajarla, sin éxito, dentro de ClientsPageModule. El guard de la
    // ruta padre 'tabs' (authMatchGuard) ya cubre esta ruta, no hace
    // falta repetirlo. TableInContextResolver se reutiliza tal cual —
    // sigue sembrando la tabla del cliente antes de activar la ruta.
    path: 'clients/:clientId/tables/:tableId/planner',
    resolve: {
      table: src_app_features_clients_resolvers_table_in_context_resolver__WEBPACK_IMPORTED_MODULE_2__.TableInContextResolver
    },
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_features_planner_planner_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/planner/planner.module */ 43627)).then(m => m.PlannerPageModule)
  }, {
    path: 'clients',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_features_clients_components_select-clients-modal_select-clients-modal_component_ts"), __webpack_require__.e("default-src_app_features_diet-templates_models_diet-template_model_ts-src_app_shared_componen-13dfa4"), __webpack_require__.e("default-packages_shared-core_src_app_core_constants_checkin-fields_ts"), __webpack_require__.e("common"), __webpack_require__.e("src_app_features_clients_clients_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/clients/clients.module */ 88223)).then(m => m.ClientsPageModule)
  }, {
    path: 'invites',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_features_invites_invites_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/invites/invites.module */ 69971)).then(m => m.InvitesPageModule)
  }, {
    // Sin tocar: NavigationService.goToProfile() (shared-core, usado por
    // las 3 apps del monorepo) navega con ruta absoluta hardcodeada
    // 'tabs/profile' — cambiar esta ruta rompería ese contrato
    // compartido. El footer del sidebar de esta app enlaza a
    // /tabs/account (más abajo), no a esta.
    path: 'profile',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-packages_shared-core_src_app_core_services_coach_coach_service_ts-packages_shared-fea-c4bcd8"), __webpack_require__.e("common"), __webpack_require__.e("src_app_features_profile_profile_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/profile/profile.module */ 16735)).then(m => m.ProfilePageModule)
  }, {
    // "Mi cuenta" — página local propia de esta app (no el ProfilePage
    // compartido de arriba, orientado a macros/dieta del consumidor).
    // Ver MVP-trainers/tareas-grandes/TAREA5.
    path: 'account',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_features_account_account_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/account/account.module */ 30859)).then(m => m.AccountPageModule)
  }, {
    // Replanteamiento MVP (nutrición) — biblioteca de plantillas de dieta.
    path: 'diet-templates',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_features_diet-templates_models_diet-template_model_ts-src_app_shared_componen-13dfa4"), __webpack_require__.e("default-src_app_shared_components_meal-snippet-picker_meal-snippet-picker_module_ts"), __webpack_require__.e("common"), __webpack_require__.e("src_app_features_diet-templates_diet-templates_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/diet-templates/diet-templates.module */ 15761)).then(m => m.DietTemplatesPageModule)
  }, {
    // Alcanzable desde el menú lateral. Código compartido
    // (NavigationService.goToConfiguration en shared-core) navega con la
    // ruta absoluta 'configuration' — resuelta aquí vía redirect en
    // app-routing.module.ts, no rompe al vivir anidada.
    path: 'configuration',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-packages_shared-core_src_app_core_services_coach_coach_service_ts-packages_shared-fea-c4bcd8"), __webpack_require__.e("packages_shared-features_src_app_features_profile_components_configuration_configuration_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/profile/components/configuration/configuration.module */ 87883)).then(m => m.ConfigurationPageModule)
  }, {
    // MVP-trainers F02 — paywall/suscripción del profesional.
    path: 'subscription',
    loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_features_subscription_subscription_module_ts").then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/subscription/subscription.module */ 7651)).then(m => m.SubscriptionPageModule)
  }, {
    // MVP-trainers F17 — plantillas de check-in del profesional.
    path: 'checkin-templates',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_features_checkin-templates_components_apply-checkin-template-modal_apply-chec-5aea39"), __webpack_require__.e("default-packages_shared-core_src_app_core_constants_checkin-fields_ts"), __webpack_require__.e("src_app_features_checkin-templates_checkin-templates_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/checkin-templates/checkin-templates.module */ 49087)).then(m => m.CheckinTemplatesPageModule)
  }, {
    // Fase 5 Coach Pro — grupos de intercambio de alimentos (§16).
    // Alcanzable desde Biblioteca: es material para el cliente.
    path: 'food-exchanges',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_features_food-exchanges_food-exchanges_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/food-exchanges/food-exchanges.module */ 84467)).then(m => m.FoodExchangesPageModule)
  }, {
    // Fase 4 Coach Pro — protocolos: la metodología del coach empaquetada.
    // Alcanzable desde Mi método (method.page.ts), no como destino propio
    // del sidebar: se define una vez, no es un flujo de trabajo diario.
    path: 'protocols',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_features_clients_components_select-clients-modal_select-clients-modal_component_ts"), __webpack_require__.e("common"), __webpack_require__.e("src_app_features_protocols_protocols_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/protocols/protocols.module */ 4403)).then(m => m.ProtocolsPageModule)
  }, {
    // Fase 3 Coach Pro — reglas WHEN/IF/THEN del profesional. El
    // constructor vive en la subruta ':id' (con 'new' como literal), no
    // en un panel: es un formulario largo y el botón de volver del móvil
    // debe salir de la regla, no de la sección.
    path: 'automations',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_features_clients_components_select-clients-modal_select-clients-modal_component_ts"), __webpack_require__.e("common"), __webpack_require__.e("src_app_features_automations_automations_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/automations/automations.module */ 23507)).then(m => m.AutomationsPageModule)
  }, {
    // TAREA5 (auditoría UX, Fase D) — componer una comida y aplicarla
    // de una vez a varios clientes, sin pasar por la ficha de uno solo.
    path: 'meal-compose',
    loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("default-src_app_features_clients_components_select-clients-modal_select-clients-modal_component_ts"), __webpack_require__.e("default-src_app_features_diet-templates_models_diet-template_model_ts-src_app_shared_componen-13dfa4"), __webpack_require__.e("default-src_app_shared_components_meal-snippet-picker_meal-snippet-picker_module_ts"), __webpack_require__.e("src_app_features_meal-compose_meal-compose_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! src/app/features/meal-compose/meal-compose.module */ 96541)).then(m => m.MealComposePageModule)
  }]
}];
class ShellPageRoutingModule {}
_ShellPageRoutingModule = ShellPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ShellPageRoutingModule, "\u0275fac", function ShellPageRoutingModule_Factory(t) {
  return new (t || _ShellPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ShellPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _ShellPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ShellPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ShellPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ }),

/***/ 51935:
/*!************************************************!*\
  !*** ./src/app/features/shell/shell.module.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShellPageModule: () => (/* binding */ ShellPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _shell_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shell-routing.module */ 11702);
/* harmony import */ var _shell_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shell.page */ 93992);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);

var _ShellPageModule;





class ShellPageModule {}
_ShellPageModule = ShellPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ShellPageModule, "\u0275fac", function ShellPageModule_Factory(t) {
  return new (t || _ShellPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ShellPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _ShellPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ShellPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule, _shell_routing_module__WEBPACK_IMPORTED_MODULE_2__.ShellPageRoutingModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ShellPageModule, {
    declarations: [_shell_page__WEBPACK_IMPORTED_MODULE_3__.ShellPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule, _shell_routing_module__WEBPACK_IMPORTED_MODULE_2__.ShellPageRoutingModule]
  });
})();

/***/ }),

/***/ 93992:
/*!**********************************************!*\
  !*** ./src/app/features/shell/shell.page.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ShellPage: () => (/* binding */ ShellPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_features_invites_services_trainer_review_status_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/features/invites/services/trainer-review-status.service */ 14492);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 64409);

var _ShellPage;





function ShellPage_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "TrainFit Pro");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function ShellPage_div_11_p_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](group_r3.label);
  }
}
function ShellPage_div_11_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "div", 23);
  }
}
function ShellPage_div_11_ion_menu_toggle_3_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r8.label);
  }
}
function ShellPage_div_11_ion_menu_toggle_3_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", ctx_r11.collapsed ? item_r8.badgeCount + " cliente(s) esperando revisi\u00F3n" : null);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](item_r8.badgeCount);
  }
}
function ShellPage_div_11_ion_menu_toggle_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-menu-toggle", 24)(1, "a", 25, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "ion-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, ShellPage_div_11_ion_menu_toggle_3_span_4_Template, 2, 1, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](5, ShellPage_div_11_ion_menu_toggle_3_span_5_Template, 2, 2, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](2);
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("routerLink", item_r8.path)("routerLinkActiveOptions", item_r8.routerLinkActiveOptions)("title", ctx_r6.collapsed ? item_r8.label : null);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("aria-current", _r9.isActive ? "page" : null);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("name", item_r8.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx_r6.collapsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", item_r8.badgeCount);
  }
}
function ShellPage_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ShellPage_div_11_p_1_Template, 2, 1, "p", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, ShellPage_div_11_div_2_Template, 1, 0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, ShellPage_div_11_ion_menu_toggle_3_Template, 6, 7, "ion-menu-toggle", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r3 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", group_r3.label && !ctx_r1.collapsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", group_r3.label && ctx_r1.collapsed);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", group_r3.items);
  }
}
function ShellPage_span_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Mi cuenta");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function buildMenuItems(items) {
  return items.map(item => ({
    ...item,
    routerLinkActiveOptions: {
      exact: !item.matchPrefix
    }
  }));
}
// Rediseño UI/UX completo (importado de un mockup de Claude Design) —
// sustituye tanto la barra de tabs original como el menú lateral agrupado
// anterior por un sidebar plano de 7 destinos, siempre visible en escritorio.
// Ver PRODUCT.md > Design Principles.
class ShellPage {
  toggleCollapsed() {
    this.collapsed = !this.collapsed;
    localStorage.setItem(ShellPage.COLLAPSE_KEY, this.collapsed ? '1' : '0');
  }
  // Acceso plano para la lógica de badges — recorrer grupos cada vez que
  // llega un contador sería trabajo repetido sin ninguna ganancia.
  get allMenuItems() {
    return this.menuGroups.flatMap(group => group.items);
  }
  constructor(trainerReviewStatus) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "trainerReviewStatus", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "collapsed", localStorage.getItem(ShellPage.COLLAPSE_KEY) === '1');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "menuGroups", [{
      label: null,
      items: buildMenuItems([
      // "Hoy" y no "Dashboard": el nombre dice qué responde la pantalla, no
      // a qué categoría de software pertenece.
      {
        label: 'Hoy',
        path: '/tabs/dashboard',
        icon: 'today-outline'
      }, {
        label: 'Clientes',
        path: '/tabs/clients',
        icon: 'people-outline',
        matchPrefix: true
      }])
    }, {
      // "Mi negocio" prometia lo que no habia: los dos elementos son
      // metodologia reutilizable, y el unico dato de negocio real (los cobros
      // agregados de todos los clientes) vive en el dashboard Hoy, servido por
      // GET /trainer/payments/summary. Etiquetar esto como negocio mandaba a
      // buscar dinero donde solo hay plantillas.
      label: 'Metodología',
      items: buildMenuItems([
      // "Plantillas" guardaba ocho cosas heterogéneas. Se parte en dos por
      // una distinción que un entrenador reconoce sin explicación: lo que
      // le DOY al cliente frente a CÓMO trabajo yo.
      {
        label: 'Biblioteca',
        path: '/tabs/templates',
        icon: 'albums-outline',
        matchPrefix: true
      }, {
        label: 'Mi método',
        path: '/tabs/method',
        icon: 'construct-outline',
        matchPrefix: true
      }])
    }, {
      label: null,
      items: buildMenuItems([{
        label: 'Configuración',
        path: '/tabs/configuration',
        icon: 'settings-outline'
      }])
    }]);
    this.trainerReviewStatus = trainerReviewStatus;
  }
  // TASK-023 (MASTER_BACKLOG.md) — antes un cliente con cuestionario ya
  // enviado (status "en_revision", esperando confirmación del trainer) solo
  // era visible entrando a la pestaña "Invitar" — sin ningún aviso en el
  // resto de la app, un trainer que no la visitara nunca se enteraba. Badge
  // en "Clientes" (no en "Mensajes"/otro sitio: A6 lo enmarca como "clientes
  // invisibles en Clientes", y son literalmente clientes en proceso de
  // alta). Solo cuenta "en_revision" — "cuestionario_pendiente" espera al
  // CLIENTE, no hay nada que el trainer deba hacer todavía.
  ngOnInit() {
    this.trainerReviewStatus.reviewInvites.subscribe(invites => {
      const clientsItem = this.allMenuItems.find(item => item.label === 'Clientes');
      if (clientsItem) clientsItem.badgeCount = invites.length;
    });
    this.trainerReviewStatus.refresh();
  }
}
_ShellPage = ShellPage;
// Sidebar contraíble en escritorio (no forma parte del mockup original,
// pedido aparte por el usuario) — persistido para que no vuelva a
// expandirse solo por navegar o recargar.
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ShellPage, "COLLAPSE_KEY", 'tf-sidebar-collapsed');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ShellPage, "\u0275fac", function ShellPage_Factory(t) {
  return new (t || _ShellPage)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_features_invites_services_trainer_review_status_service__WEBPACK_IMPORTED_MODULE_1__.TrainerReviewStatusService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ShellPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _ShellPage,
  selectors: [["app-shell"]],
  decls: 19,
  vars: 11,
  consts: [["contentId", "tf-main-content", "when", "md", 1, "app-split-pane"], ["contentId", "tf-main-content", "type", "overlay", "side", "start", 1, "app-menu"], [1, "app-menu-content"], [1, "app-brand-row"], [1, "app-brand"], [1, "app-brand-mark"], ["class", "app-brand-name", 4, "ngIf"], ["type", "button", 1, "collapse-toggle", 3, "click"], ["aria-hidden", "true", 3, "name"], ["aria-label", "Navegaci\u00F3n principal", 1, "app-menu-nav"], ["class", "menu-group", 4, "ngFor", "ngForOf"], [1, "app-menu-footer"], ["routerLink", "/tabs/account", 1, "footer-user", 3, "title"], [1, "footer-user-avatar"], ["name", "person", "aria-hidden", "true"], ["class", "footer-user-label", 4, "ngIf"], ["id", "tf-main-content", 1, "ion-page"], [1, "app-brand-name"], [1, "menu-group"], ["class", "menu-group-label", 4, "ngIf"], ["class", "menu-group-rule", "aria-hidden", "true", 4, "ngIf"], ["auto-hide", "false", 4, "ngFor", "ngForOf"], [1, "menu-group-label"], ["aria-hidden", "true", 1, "menu-group-rule"], ["auto-hide", "false"], ["routerLinkActive", "menu-item--active", 1, "menu-item", 3, "routerLink", "routerLinkActiveOptions", "title"], ["rla", "routerLinkActive"], [4, "ngIf"], ["class", "menu-item-badge", 3, "title", 4, "ngIf"], [1, "menu-item-badge", 3, "title"], [1, "footer-user-label"]],
  template: function ShellPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-split-pane", 0)(1, "ion-menu", 1)(2, "ion-content", 2)(3, "div", 3)(4, "div", 4)(5, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "TF");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, ShellPage_span_7_Template, 2, 0, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "button", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ShellPage_Template_button_click_8_listener() {
        return ctx.toggleCollapsed();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](9, "ion-icon", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "nav", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, ShellPage_div_11_Template, 4, 3, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 11)(13, "a", 12)(14, "span", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "ion-icon", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, ShellPage_span_16_Template, 2, 0, "span", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](18, "ion-router-outlet");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("app-split-pane--collapsed", ctx.collapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("app-menu--collapsed", ctx.collapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.collapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("aria-label", ctx.collapsed ? "Expandir men\u00FA" : "Contraer men\u00FA")("aria-expanded", !ctx.collapsed);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("name", ctx.collapsed ? "chevron-forward-outline" : "chevron-back-outline");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.menuGroups);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("title", ctx.collapsed ? "Mi cuenta" : null);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.collapsed);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonMenu, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonMenuToggle, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonSplitPane, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.IonRouterOutlet, _ionic_angular__WEBPACK_IMPORTED_MODULE_4__.RouterLinkWithHrefDelegate, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLinkActive],
  styles: [".app-menu[_ngcontent-%COMP%] {\n  --width: 268px;\n  --background: var(--tf-surface-1);\n  --border-color: var(--tf-border);\n  transition: width var(--tf-duration-fast) var(--tf-ease-out);\n}\n.app-menu--collapsed[_ngcontent-%COMP%] {\n  --width: 72px;\n}\n\n.app-split-pane[_ngcontent-%COMP%] {\n  --side-min-width: 268px;\n  --side-max-width: 268px;\n}\n.app-split-pane--collapsed[_ngcontent-%COMP%] {\n  --side-min-width: 72px;\n  --side-max-width: 72px;\n}\n\n.app-menu-content[_ngcontent-%COMP%] {\n  --background: var(--tf-surface-1);\n  --padding-top: var(--tf-space-5);\n  --padding-bottom: var(--tf-space-4);\n  --padding-start: var(--tf-space-3);\n  --padding-end: var(--tf-space-3);\n  display: flex;\n  flex-direction: column;\n}\n\n.app-brand-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--tf-space-2);\n  padding: 0 var(--tf-space-2) var(--tf-space-6);\n}\n.app-menu--collapsed[_ngcontent-%COMP%]   .app-brand-row[_ngcontent-%COMP%] {\n  flex-direction: column;\n  gap: var(--tf-space-3);\n}\n\n.app-brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-3);\n  min-width: 0;\n}\n\n.collapse-toggle[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 26px;\n  height: 26px;\n  background: var(--tf-surface-3);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-sm);\n  color: var(--tf-text-secondary);\n  cursor: pointer;\n  transition: background var(--tf-duration-fast) var(--tf-ease-out), color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.collapse-toggle[_ngcontent-%COMP%]:hover {\n  background: var(--tf-surface-4);\n  color: var(--tf-text);\n}\n.collapse-toggle[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.collapse-toggle[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n@media (max-width: 767px) {\n  .collapse-toggle[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n\n.app-brand-mark[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  border-radius: var(--tf-radius-md);\n  background: var(--tf-accent);\n  color: var(--tf-accent-contrast);\n  font-weight: 800;\n  font-size: var(--tf-font-size-base);\n  flex-shrink: 0;\n}\n\n.app-brand-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: var(--tf-font-size-lg);\n  color: var(--tf-text);\n}\n\n.app-menu-nav[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-1);\n}\n\n.menu-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-1);\n}\n.menu-group[_ngcontent-%COMP%]    + .menu-group[_ngcontent-%COMP%] {\n  margin-top: var(--tf-space-4);\n}\n\n.menu-group-label[_ngcontent-%COMP%] {\n  margin: 0 0 var(--tf-space-1);\n  padding: 0 var(--tf-space-4);\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: var(--tf-text-muted);\n}\n\n.menu-group-rule[_ngcontent-%COMP%] {\n  height: 1px;\n  margin: var(--tf-space-2) var(--tf-space-3) var(--tf-space-1);\n  background: var(--tf-border);\n}\n\n.menu-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-3);\n  min-height: 48px;\n  padding: 0 var(--tf-space-4);\n  border-radius: var(--tf-radius-md);\n  color: var(--tf-text-secondary);\n  font-size: var(--tf-font-size-md);\n  font-weight: 500;\n  text-decoration: none;\n  cursor: pointer;\n  transition: background-color var(--tf-duration-fast) var(--tf-ease-out), color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.menu-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 21px;\n  flex-shrink: 0;\n}\n.menu-item[_ngcontent-%COMP%]:hover {\n  background: var(--tf-surface-3);\n  color: var(--tf-text);\n}\n.menu-item[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.menu-item--active[_ngcontent-%COMP%] {\n  background: var(--tf-accent-soft);\n  color: var(--tf-text);\n  font-weight: 600;\n}\n.menu-item--active[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--tf-accent);\n}\n.app-menu--collapsed[_ngcontent-%COMP%]   .menu-item[_ngcontent-%COMP%] {\n  justify-content: center;\n  padding: 0;\n  position: relative;\n}\n\n.menu-item-badge[_ngcontent-%COMP%] {\n  margin-left: auto;\n  min-width: 18px;\n  height: 18px;\n  padding: 0 5px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--tf-danger-contrast, #fff);\n  background: var(--tf-danger, #eb445a);\n  border-radius: var(--tf-radius-pill);\n  flex-shrink: 0;\n}\n.app-menu--collapsed[_ngcontent-%COMP%]   .menu-item-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 4px;\n  right: 4px;\n  margin-left: 0;\n}\n\n.app-menu-footer[_ngcontent-%COMP%] {\n  margin-top: auto;\n  padding-top: var(--tf-space-4);\n  border-top: 1px solid var(--tf-border);\n}\n\n.footer-user[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-3);\n  min-height: 48px;\n  padding: 0 var(--tf-space-4);\n  border-radius: var(--tf-radius-md);\n  color: var(--tf-text);\n  text-decoration: none;\n  transition: background-color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.footer-user[_ngcontent-%COMP%]:hover {\n  background: var(--tf-surface-3);\n}\n.footer-user[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.app-menu--collapsed[_ngcontent-%COMP%]   .footer-user[_ngcontent-%COMP%] {\n  justify-content: center;\n  padding: 0;\n}\n\n.footer-user-avatar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n  border-radius: 50%;\n  background: var(--tf-surface-4);\n  color: var(--tf-text-secondary);\n  flex-shrink: 0;\n}\n.footer-user-avatar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n\n.footer-user-label[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-md);\n  font-weight: 500;\n}\n\n#tf-main-content[_ngcontent-%COMP%] {\n  background: var(--tf-bg);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvc2hlbGwvc2hlbGwucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBO0VBQ0UsY0FBQTtFQUNBLGlDQUFBO0VBQ0EsZ0NBQUE7RUFJQSw0REFBQTtBQVBGO0FBV0U7RUFDRSxhQUFBO0FBVEo7O0FBa0JBO0VBQ0UsdUJBQUE7RUFDQSx1QkFBQTtBQWZGO0FBaUJFO0VBQ0Usc0JBQUE7RUFDQSxzQkFBQTtBQWZKOztBQW1CQTtFQUNFLGlDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxtQ0FBQTtFQUNBLGtDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7QUFoQkY7O0FBbUJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxzQkFBQTtFQUNBLDhDQUFBO0FBaEJGO0FBa0JFO0VBQ0Usc0JBQUE7RUFDQSxzQkFBQTtBQWhCSjs7QUFvQkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7QUFqQkY7O0FBb0JBO0VBQ0UsY0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSwrQkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0NBQUE7RUFDQSwrQkFBQTtFQUNBLGVBQUE7RUFDQSxtSEFBQTtBQWpCRjtBQW9CRTtFQUNFLCtCQUFBO0VBQ0EscUJBQUE7QUFsQko7QUFxQkU7RUFDRSxtQ0FBQTtFQUNBLG1CQUFBO0FBbkJKO0FBc0JFO0VBQ0UsZUFBQTtBQXBCSjtBQXlCRTtFQS9CRjtJQWdDSSxhQUFBO0VBdEJGO0FBQ0Y7O0FBeUJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtDQUFBO0VBQ0EsNEJBQUE7RUFDQSxnQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUNBQUE7RUFDQSxjQUFBO0FBdEJGOztBQXlCQTtFQUNFLGdCQUFBO0VBQ0EsaUNBQUE7RUFDQSxxQkFBQTtBQXRCRjs7QUF5QkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtBQXRCRjs7QUEwQkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtBQXZCRjtBQTJCRTtFQUNFLDZCQUFBO0FBekJKOztBQTZCQTtFQUNFLDZCQUFBO0VBQ0EsNEJBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUlBLDJCQUFBO0FBN0JGOztBQWlDQTtFQUNFLFdBQUE7RUFDQSw2REFBQTtFQUNBLDRCQUFBO0FBOUJGOztBQWlDQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLGtDQUFBO0VBQ0EsK0JBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxlQUFBO0VBQ0EseUhBQUE7QUE5QkY7QUFpQ0U7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQS9CSjtBQWtDRTtFQUNFLCtCQUFBO0VBQ0EscUJBQUE7QUFoQ0o7QUFvQ0U7RUFDRSxtQ0FBQTtFQUNBLG1CQUFBO0FBbENKO0FBcUNFO0VBQ0UsaUNBQUE7RUFDQSxxQkFBQTtFQUNBLGdCQUFBO0FBbkNKO0FBcUNJO0VBQ0UsdUJBQUE7QUFuQ047QUF1Q0U7RUFDRSx1QkFBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtBQXJDSjs7QUEwQ0E7RUFDRSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esc0NBQUE7RUFDQSxxQ0FBQTtFQUNBLG9DQUFBO0VBQ0EsY0FBQTtBQXZDRjtBQXlDRTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFVBQUE7RUFDQSxjQUFBO0FBdkNKOztBQTJDQTtFQUNFLGdCQUFBO0VBQ0EsOEJBQUE7RUFDQSxzQ0FBQTtBQXhDRjs7QUEyQ0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7RUFDQSxrQ0FBQTtFQUNBLHFCQUFBO0VBQ0EscUJBQUE7RUFDQSx1RUFBQTtBQXhDRjtBQTBDRTtFQUNFLCtCQUFBO0FBeENKO0FBMkNFO0VBQ0UsbUNBQUE7RUFDQSxtQkFBQTtBQXpDSjtBQTRDRTtFQUNFLHVCQUFBO0VBQ0EsVUFBQTtBQTFDSjs7QUE4Q0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSwrQkFBQTtFQUNBLCtCQUFBO0VBQ0EsY0FBQTtBQTNDRjtBQTZDRTtFQUNFLGVBQUE7QUEzQ0o7O0FBK0NBO0VBQ0UsaUNBQUE7RUFDQSxnQkFBQTtBQTVDRjs7QUFpREE7RUFDRSx3QkFBQTtBQTlDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIFNpZGViYXIgcGxhbm8gKDcgZGVzdGlub3MpLCBzaWVtcHJlIHZpc2libGUgZW4gZXNjcml0b3JpbyDDosKAwpQgdmVyIG1vY2t1cFxuLy8gXCJUcmFpbkZpdCBQYW5lbFwiIGltcG9ydGFkbyBkZSBDbGF1ZGUgRGVzaWduLiBpb24tc3BsaXQtcGFuZSBtYW5lamEgZWxcbi8vIHJlc3BvbnNpdmUgZGUgZm9ybWEgbmF0aXZhOiBkcmF3ZXIgc3VwZXJwdWVzdG8gZW4gbcODwrN2aWwsIHBhbmVsIHBlcnNpc3RlbnRlXG4vLyBkZXNkZSBlbCBicmVha3BvaW50IFwibWRcIiAoNzY4cHgpLlxuXG4uYXBwLW1lbnUge1xuICAtLXdpZHRoOiAyNjhweDtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTEpO1xuICAtLWJvcmRlci1jb2xvcjogdmFyKC0tdGYtYm9yZGVyKTtcbiAgLy8gLS10Zi1kdXJhdGlvbi1mYXN0ICgxMjBtcywgbGEgbWlzbWEgcXVlIHlhIHVzYSAuY29sbGFwc2UtdG9nZ2xlIGFsXG4gIC8vIGhhY2VyIGhvdmVyKSBlbiB2ZXogZGUgLS10Zi1kdXJhdGlvbi1iYXNlICgxODBtcykgw6LCgMKUIHNlIHBpZGnDg8KzIG3Dg8Khc1xuICAvLyByw4PCoXBpZG8gc2luIHBlcmRlciBsYSBhbmltYWNpw4PCs24sIG5vIHF1aXRhcmxhLlxuICB0cmFuc2l0aW9uOiB3aWR0aCB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgLy8gQ29udHJhw4PCrWJsZSBlbiBlc2NyaXRvcmlvIChwZWRpZG8gYXBhcnRlIGRlbCBtb2NrdXApIMOiwoDClCBpY29uLW9ubHksIG1pc21hXG4gIC8vIGlkZWEgcXVlIGxhIHZhcmlhbnRlIFwiVGFibGV0IMOiwoDClCA4MzRweFwiIGRlbCBtb2NrdXAgaW1wb3J0YWRvLlxuICAmLS1jb2xsYXBzZWQge1xuICAgIC0td2lkdGg6IDcycHg7XG4gIH1cbn1cblxuLy8gaW9uLXNwbGl0LXBhbmUgZW52dWVsdmUgaW9uLW1lbnUgZW4gZWwgcGFuZWwgcGVyc2lzdGVudGUgZGUgZXNjcml0b3JpbyBjb25cbi8vIHN1IHByb3BpbyAtLXNpZGUtbWluLXdpZHRoICgyNzBweCBwb3IgZGVmZWN0byBkZSBJb25pYykgw6LCgMKUIHNpbiBwaXNhcmxvXG4vLyBhcXXDg8KtLCBlc2UgbcODwq1uaW1vIGdhbmEgc29icmUgZWwgLS13aWR0aDo3MnB4IGRlIGFycmliYSB5IGVsIHNpZGVuYXYgc2Vcbi8vIHF1ZWRhIGFuY2hvIGF1bnF1ZSBlbCB0ZXh0byB5YSBzZSBoYXlhIG9jdWx0YWRvLiBNaXNtbyBhbmNobyBxdWVcbi8vIC5hcHAtbWVudSBlbiBjYWRhIGVzdGFkbywgbWluPW1heCBwYXJhIHF1ZSBubyBmbGV4aW9uZSBlbnRyZSBtZWRpYXMuXG4uYXBwLXNwbGl0LXBhbmUge1xuICAtLXNpZGUtbWluLXdpZHRoOiAyNjhweDtcbiAgLS1zaWRlLW1heC13aWR0aDogMjY4cHg7XG5cbiAgJi0tY29sbGFwc2VkIHtcbiAgICAtLXNpZGUtbWluLXdpZHRoOiA3MnB4O1xuICAgIC0tc2lkZS1tYXgtd2lkdGg6IDcycHg7XG4gIH1cbn1cblxuLmFwcC1tZW51LWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMSk7XG4gIC0tcGFkZGluZy10b3A6IHZhcigtLXRmLXNwYWNlLTUpO1xuICAtLXBhZGRpbmctYm90dG9tOiB2YXIoLS10Zi1zcGFjZS00KTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgLS1wYWRkaW5nLWVuZDogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5hcHAtYnJhbmQtcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTIpO1xuICBwYWRkaW5nOiAwIHZhcigtLXRmLXNwYWNlLTIpIHZhcigtLXRmLXNwYWNlLTYpO1xuXG4gIC5hcHAtbWVudS0tY29sbGFwc2VkICYge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgfVxufVxuXG4uYXBwLWJyYW5kIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4uY29sbGFwc2UtdG9nZ2xlIHtcbiAgZmxleC1zaHJpbms6IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogMjZweDtcbiAgaGVpZ2h0OiAyNnB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtc20pO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpLFxuICAgIGNvbG9yIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gIH1cblxuICAvLyBFbCBkcmF3ZXIgc3VwZXJwdWVzdG8gZGUgbcODwrN2aWwgbm8gbmVjZXNpdGEgY29udHJhZXJzZSAoeWEgc2UgYWJyZS9jaWVycmFcbiAgLy8gZW50ZXJvKSDDosKAwpQgc29sbyB0aWVuZSBzZW50aWRvIGVuIGVsIHBhbmVsIHBlcnNpc3RlbnRlIGRlIGVzY3JpdG9yaW8uXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cblxuLmFwcC1icmFuZC1tYXJrIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiAzNnB4O1xuICBoZWlnaHQ6IDM2cHg7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1tZCk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLWFjY2VudCk7XG4gIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQtY29udHJhc3QpO1xuICBmb250LXdlaWdodDogODAwO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1iYXNlKTtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbi5hcHAtYnJhbmQtbmFtZSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWxnKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xufVxuXG4uYXBwLW1lbnUtbmF2IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0xKTtcbn1cblxuLy8gTW92aW1pZW50byAxIENvYWNoIFBybyDDosKAwpQgZ3J1cG9zIGNvbiBlbmNhYmV6YWRvLlxuLm1lbnUtZ3JvdXAge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTEpO1xuXG4gIC8vIEVsIGFpcmUgdmEgRU5UUkUgZ3J1cG9zLCBubyBkZW50cm86IHNlcGFyYXIgdmlzdWFsbWVudGUgZXMgdG9kbyBlbFxuICAvLyB0cmFiYWpvIHF1ZSBoYWNlIGVsIGFncnVwYWRvLlxuICAmICsgJiB7XG4gICAgbWFyZ2luLXRvcDogdmFyKC0tdGYtc3BhY2UtNCk7XG4gIH1cbn1cblxuLm1lbnUtZ3JvdXAtbGFiZWwge1xuICBtYXJnaW46IDAgMCB2YXIoLS10Zi1zcGFjZS0xKTtcbiAgcGFkZGluZzogMCB2YXIoLS10Zi1zcGFjZS00KTtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUteHMpO1xuICBmb250LXdlaWdodDogNjAwO1xuICBsZXR0ZXItc3BhY2luZzogMC4wNmVtO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAvLyBNdXRlZCAobm8gc2Vjb25kYXJ5KTogZXMgdW5hIGV0aXF1ZXRhIGRlIG9yaWVudGFjacODwrNuLCBubyB1biBkZXN0aW5vOyBzaVxuICAvLyBjb21waXRpZXJhIGVuIHBlc28gY29uIGxvcyBpdGVtcyBzZXLDg8KtYSBydWlkby4gdG9rZW5zLnNjc3MgcmVzZXJ2YVxuICAvLyAtLXRmLXRleHQtbXV0ZWQganVzdG8gcGFyYSBlc3RvLlxuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG59XG5cbi8vIFN1c3RpdHV0byBkZWwgZW5jYWJlemFkbyBjdWFuZG8gZWwgc2lkZWJhciBlc3TDg8KhIGNvbnRyYcODwq1kby5cbi5tZW51LWdyb3VwLXJ1bGUge1xuICBoZWlnaHQ6IDFweDtcbiAgbWFyZ2luOiB2YXIoLS10Zi1zcGFjZS0yKSB2YXIoLS10Zi1zcGFjZS0zKSB2YXIoLS10Zi1zcGFjZS0xKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYm9yZGVyKTtcbn1cblxuLm1lbnUtaXRlbSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIG1pbi1oZWlnaHQ6IDQ4cHg7XG4gIHBhZGRpbmc6IDAgdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1tZCk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLW1kKTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpLFxuICAgIGNvbG9yIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAyMXB4O1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICB9XG5cbiAgJjpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIH1cblxuICAvLyBGb2NvIHZpc2libGUgcG9yIHRlY2xhZG8gw6LCgMKUIFdDQUcgQUEgKFBST0RVQ1QubWQgPiBBY2Nlc2liaWxpZGFkKS5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG5cbiAgJi0tYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtc29mdCk7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBjb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgICB9XG4gIH1cblxuICAuYXBwLW1lbnUtLWNvbGxhcHNlZCAmIHtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAwO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxufVxuXG4vLyBUQVNLLTAyMyDDosKAwpQgYXZpc28gZGUgY2xpZW50ZXMgZW4gb25ib2FyZGluZyBlc3BlcmFuZG8gcmV2aXNpw4PCs24uXG4ubWVudS1pdGVtLWJhZGdlIHtcbiAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gIG1pbi13aWR0aDogMThweDtcbiAgaGVpZ2h0OiAxOHB4O1xuICBwYWRkaW5nOiAwIDVweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6IHZhcigtLXRmLWRhbmdlci1jb250cmFzdCwgI2ZmZik7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLWRhbmdlciwgI2ViNDQ1YSk7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1waWxsKTtcbiAgZmxleC1zaHJpbms6IDA7XG5cbiAgLmFwcC1tZW51LS1jb2xsYXBzZWQgJiB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNHB4O1xuICAgIHJpZ2h0OiA0cHg7XG4gICAgbWFyZ2luLWxlZnQ6IDA7XG4gIH1cbn1cblxuLmFwcC1tZW51LWZvb3RlciB7XG4gIG1hcmdpbi10b3A6IGF1dG87XG4gIHBhZGRpbmctdG9wOiB2YXIoLS10Zi1zcGFjZS00KTtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG59XG5cbi5mb290ZXItdXNlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIG1pbi1oZWlnaHQ6IDQ4cHg7XG4gIHBhZGRpbmc6IDAgdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1tZCk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kLWNvbG9yIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG5cbiAgLmFwcC1tZW51LS1jb2xsYXBzZWQgJiB7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgcGFkZGluZzogMDtcbiAgfVxufVxuXG4uZm9vdGVyLXVzZXItYXZhdGFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiAzNnB4O1xuICBoZWlnaHQ6IDM2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgZmxleC1zaHJpbms6IDA7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgfVxufVxuXG4uZm9vdGVyLXVzZXItbGFiZWwge1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1tZCk7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi8vIEVsIHBhbmVsIHByaW5jaXBhbCBoZXJlZGEgZWwgZm9uZG8gZGUgbGEgYXBwIMOiwoDClCBzaW4gZXN0bywgZWwgaHVlY28gZW50cmVcbi8vIGVsIG1lbsODwrogcGVyc2lzdGVudGUgeSBlbCBjb250ZW5pZG8gc2UgdmUgZGVsIGJsYW5jbyBwb3IgZGVmZWN0byBkZSBJb25pYy5cbiN0Zi1tYWluLWNvbnRlbnQge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1iZyk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ })

}]);
//# sourceMappingURL=src_app_features_shell_shell_module_ts.js.map