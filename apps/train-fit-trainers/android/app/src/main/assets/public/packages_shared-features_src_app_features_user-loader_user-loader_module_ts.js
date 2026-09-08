"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["packages_shared-features_src_app_features_user-loader_user-loader_module_ts"],{

/***/ 96370:
/*!*******************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/coach/coach.service.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CoachService: () => (/* binding */ CoachService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 37728);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 27453);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 2950);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 98945);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 51097);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _CoachService;





// Tab Coach, Fase 1 — detecta si el usuario autenticado tiene algo que ver
// en el tab "Coach": un profesional con relación ACTIVA, o una invitación
// todavía sin responder. Antes solo miraba "activa", así que un cliente
// recién invitado no veía el tab y tenía que encontrar el acceso oculto en
// Configuración ("Mis profesionales", ya eliminado) para responder — ahora
// el tab aparece en cuanto hay una invitación, sea cual sea su estado.
// Vive en shared-core (no en shared-features) porque lo consumen tanto la
// capa app (tabs.page.ts) como shared-features (user-loader.page.ts) —
// misma dirección de dependencias que UserService.
class CoachService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_hasCoachRelation", (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.signal)(false));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "hasCoachRelation", (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.computed)(() => this._hasCoachRelation()));
    // Distinto de hasCoachRelation (que también cuenta invitaciones sin
    // responder): esto es "asignado" de verdad — al menos un profesional con
    // relación ACTIVA. Lo usa configuration.page.ts para ocultar la
    // configuración de anuncios a un cliente que ya lleva un trainer.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_hasActiveTrainer", (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.signal)(false));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "hasActiveTrainer", (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.computed)(() => this._hasActiveTrainer()));
    this.http = http;
  }
  // Nunca debe romper el flujo que la llama (arranque de la app, respuesta a
  // una invitación, desvinculación) — cualquier fallo se traduce en "sin
  // relación" en vez de propagar el error.
  refresh() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.forkJoin)({
      active: this.http.get('trainer/info'),
      pending: this.http.get('trainer/invites/mine')
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(({
      active,
      pending
    }) => {
      this._hasActiveTrainer.set((active || []).length > 0);
      return (active || []).length > 0 || (pending || []).length > 0;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(hasCoachRelation => this._hasCoachRelation.set(hasCoachRelation)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.catchError)(() => {
      this._hasCoachRelation.set(false);
      this._hasActiveTrainer.set(false);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(false);
    }));
  }
}
_CoachService = CoachService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CoachService, "\u0275fac", function CoachService_Factory(t) {
  return new (t || _CoachService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CoachService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _CoachService,
  factory: _CoachService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 594:
/*!***********************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/notifications/notifications.service.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotificationsService: () => (/* binding */ NotificationsService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 27453);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 2950);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 98945);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 51097);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _NotificationsService;





// Tab Coach, Fase 3 — contador de notificaciones no leídas para el badge del
// tab Coach. Nunca push remoto (00-riesgos.md R5): el cliente lo ve la
// próxima vez que abre la app o refresca. Cualquier fallo se traduce en 0
// en vez de propagar el error (mismo criterio que CoachService).
class NotificationsService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_unreadCount", (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.signal)(0));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "unreadCount", (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.computed)(() => this._unreadCount()));
    this.http = http;
  }
  refresh() {
    return this.http.get('notifications/mine/unread-count').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(res => res?.count || 0), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(count => this._unreadCount.set(count)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(() => {
      this._unreadCount.set(0);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(0);
    }));
  }
  // Actualización optimista tras marcar leída(s) — evita esperar un
  // roundtrip solo para que el badge baje.
  decrementBy(amount) {
    this._unreadCount.set(Math.max(0, this._unreadCount() - amount));
  }
  markAllReadLocally() {
    this._unreadCount.set(0);
  }
}
_NotificationsService = NotificationsService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(NotificationsService, "\u0275fac", function NotificationsService_Factory(t) {
  return new (t || _NotificationsService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(NotificationsService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _NotificationsService,
  factory: _NotificationsService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 76046:
/*!*****************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/onboarding/onboarding.service.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ALL_INTAKE_FIELDS: () => (/* binding */ ALL_INTAKE_FIELDS),
/* harmony export */   OnboardingService: () => (/* binding */ OnboardingService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 27453);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 2950);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 98945);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 51097);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _OnboardingService;





const ALL_INTAKE_FIELDS = ['goals', 'healthConditions', 'experienceLevel', 'availability', 'equipment', 'allergies', 'favoriteFoods', 'dislikedFoods', 'cooksAtHome'];
const EMPTY_STATUS = {
  blocked: false,
  relations: []
};
function normalizeStatus(status) {
  if (!status) return EMPTY_STATUS;
  return {
    ...status,
    relations: (status.relations || []).map(r => ({
      ...r,
      intakeEnabledFields: r.intakeEnabledFields?.length ? r.intakeEnabledFields : ALL_INTAKE_FIELDS,
      intakeCustomQuestions: r.intakeCustomQuestions || []
    }))
  };
}
// TAREA 3 (coach-tab) — ¿debe el cliente ver la pantalla de cuestionario/
// espera en vez del resto de la app? Solo true si NO tiene ninguna relación
// activa con nadie todavía Y tiene al menos una relación en curso de alta.
// Poblado en user-loader.page.ts junto a CoachService/NotificationsService,
// consumido de forma síncrona por onboarding.guard.ts.
class OnboardingService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_status", (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.signal)(EMPTY_STATUS));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "blocked", (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.computed)(() => this._status().blocked));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "relations", (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.computed)(() => this._status().relations));
    this.http = http;
  }
  refresh() {
    return this.http.get('trainer/onboarding-status').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(status => normalizeStatus(status)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(status => this._status.set(status)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(() => {
      this._status.set(EMPTY_STATUS);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(EMPTY_STATUS);
    }));
  }
}
_OnboardingService = OnboardingService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(OnboardingService, "\u0275fac", function OnboardingService_Factory(t) {
  return new (t || _OnboardingService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(OnboardingService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _OnboardingService,
  factory: _OnboardingService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 91149:
/*!*************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/user-loader/user-loader-routing.module.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserLoaderPageRoutingModule: () => (/* binding */ UserLoaderPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _user_loader_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./user-loader.page */ 29887);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _UserLoaderPageRoutingModule;




const routes = [{
  path: '',
  component: _user_loader_page__WEBPACK_IMPORTED_MODULE_1__.UserLoaderPage
}];
class UserLoaderPageRoutingModule {}
_UserLoaderPageRoutingModule = UserLoaderPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserLoaderPageRoutingModule, "\u0275fac", function UserLoaderPageRoutingModule_Factory(t) {
  return new (t || _UserLoaderPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserLoaderPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _UserLoaderPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserLoaderPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](UserLoaderPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 98932:
/*!*****************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/user-loader/user-loader.module.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserLoaderPageModule: () => (/* binding */ UserLoaderPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _user_loader_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./user-loader.page */ 29887);
/* harmony import */ var _user_loader_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user-loader-routing.module */ 91149);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);

var _UserLoaderPageModule;




class UserLoaderPageModule {}
_UserLoaderPageModule = UserLoaderPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserLoaderPageModule, "\u0275fac", function UserLoaderPageModule_Factory(t) {
  return new (t || _UserLoaderPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserLoaderPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _UserLoaderPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserLoaderPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _user_loader_routing_module__WEBPACK_IMPORTED_MODULE_3__.UserLoaderPageRoutingModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](UserLoaderPageModule, {
    declarations: [_user_loader_page__WEBPACK_IMPORTED_MODULE_2__.UserLoaderPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _user_loader_routing_module__WEBPACK_IMPORTED_MODULE_3__.UserLoaderPageRoutingModule]
  });
})();

/***/ }),

/***/ 29887:
/*!***************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/user-loader/user-loader.page.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserLoaderPage: () => (/* binding */ UserLoaderPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 47114);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 49224);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 51097);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs */ 27453);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs */ 37728);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/animations */ 23133);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var src_app_core_services_table_table_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/table/table.service */ 91594);
/* harmony import */ var src_app_core_services_diet_diet_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/diet/diet.service */ 36752);
/* harmony import */ var src_app_core_services_workout_workout_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/workout/workout.service */ 76990);
/* harmony import */ var src_app_core_services_util_theme_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/util/theme.service */ 18341);
/* harmony import */ var src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/util/navigation.service */ 22938);
/* harmony import */ var src_app_core_i18n_i18n_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/i18n/i18n.service */ 35347);
/* harmony import */ var src_app_core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/services/auth/auth.service */ 74048);
/* harmony import */ var src_app_core_services_billing_billing_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/services/billing/billing.service */ 58854);
/* harmony import */ var src_app_core_services_coach_coach_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/core/services/coach/coach.service */ 96370);
/* harmony import */ var src_app_core_services_notifications_notifications_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/core/services/notifications/notifications.service */ 594);
/* harmony import */ var src_app_core_services_onboarding_onboarding_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/core/services/onboarding/onboarding.service */ 76046);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common */ 31133);

var _UserLoaderPage;


















class UserLoaderPage {
  constructor(userService, tableService, dietService, workoutService, themeService, navigationService, i18nService, authService, billingService, coachService, notificationsService, onboardingService, translate, route, router) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "userService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "tableService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "dietService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "workoutService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "themeService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "navigationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "i18nService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "authService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "billingService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "coachService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "notificationsService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "onboardingService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "translate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "route", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "LOADING_CONFIG", {
      STEP_DELAY: 300,
      COMPLETION_DELAY: 800,
      EXIT_ANIMATION_DELAY: 500
    });
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "MAX_INITIAL_LOAD_RETRIES", 2);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "email", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "loadingStep", 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "animationState", 'in');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "progress", 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "loadingText", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "initialLoadRetryCount", 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "loadingMessages", ['USER_LOADER.LOGGING_IN', 'USER_LOADER.LOADING_PROFILE', 'USER_LOADER.PREPARING_ROUTINES', 'USER_LOADER.LOADING_DIET', 'USER_LOADER.FINALIZING']);
    this.userService = userService;
    this.tableService = tableService;
    this.dietService = dietService;
    this.workoutService = workoutService;
    this.themeService = themeService;
    this.navigationService = navigationService;
    this.i18nService = i18nService;
    this.authService = authService;
    this.billingService = billingService;
    this.coachService = coachService;
    this.notificationsService = notificationsService;
    this.onboardingService = onboardingService;
    this.translate = translate;
    this.route = route;
    this.router = router;
    this.email = this.authService.user?.email;
  }
  // TASK-010 (MASTER_BACKLOG.md) — restaura el deep link original (guardado
  // por auth.guard.ts como returnUrl) en vez de caer siempre al dashboard.
  // Validación mínima: debe ser una ruta interna real ('/algo'), nunca una
  // URL absoluta ni protocol-relative ('//host') colada en el query param.
  getSafeReturnUrl() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    if (!returnUrl || !returnUrl.startsWith('/') || returnUrl.startsWith('//')) {
      return null;
    }
    return returnUrl;
  }
  ngOnInit() {
    this.startLoadingSequence();
  }
  ngOnDestroy() {
    // Cleanup no longer needed since we removed fake intervals
  }
  startLoadingSequence() {
    if (!this.email) {
      this.authService.logout();
      return;
    }
    this.loadingText = this.translate.instant(this.loadingMessages[0]);
    this.updateLoadingStep(1);
    this.updateProgress(10);
    this.userService.getUserByEmail(this.email).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.switchMap)(resUser => {
      this.updateLoadingStep(2);
      this.updateProgress(30);
      this.userService.setLocalUser = resUser;
      if (resUser.lang) this.i18nService.switchLang(resUser.lang);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.from)(this.billingService.logIn(resUser?._id)).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_15__.catchError)(error => {
        console.warn('Billing logIn no disponible durante carga inicial', error);
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.of)(false);
      }), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.switchMap)(() => {
        if (!this.isUserRegistrationComplete(resUser)) {
          throw new Error('INCOMPLETE_USER');
        }
        this.themeService.toggleColorMode(resUser.theme || 'dark');
        this.updateLoadingStep(3);
        this.updateProgress(40);
        const tableObservable = resUser.tableInUse ? this.tableService.getTableById(resUser.tableInUse) : (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.of)(null);
        const dietObservable = resUser.dietInUse ? this.dietService.getDietById(resUser.dietInUse) : (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.of)(null);
        const workoutInUseObservable = resUser.workoutInUse ? this.workoutService.getWorkoutById(resUser.workoutInUse) : (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.of)(null);
        // Tab Coach (Fases 1/3) y TAREA 3 (onboarding) — endpoints del
        // lado CLIENTE (auth(["user", ...]) en el backend). Una cuenta
        // profesional pura (roles:["trainer"], sin "user" — ver
        // POST /users/professional) nunca tiene acceso, así que ni se
        // llaman: antes se llamaban igual y el 403 se tragaba en
        // silencio (ruido de consola en cada login de trainer, cero
        // impacto funcional, pero sin motivo para seguir así).
        const isClientAccount = !!resUser.roles?.includes('user');
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_17__.forkJoin)([tableObservable, dietObservable, workoutInUseObservable, isClientAccount ? this.coachService.refresh() : (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.of)(false), isClientAccount ? this.notificationsService.refresh() : (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.of)(0), isClientAccount ? this.onboardingService.refresh() : (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.of)(null)]);
      }));
    })).subscribe(([resTable, resDiet, resWorkoutInUse]) => {
      this.initialLoadRetryCount = 0;
      this.updateLoadingStep(4);
      this.updateProgress(80);
      // Always sync (not just when truthy) so a leftover signal from a
      // previous session/account never survives into one with no table,
      // diet, or workout in use.
      this.tableService.setCurrentTable = resTable ?? null;
      this.dietService.setCurrentDiet = resDiet ?? null;
      this.workoutService.setCurrentWorkout = resWorkoutInUse ?? null;
      setTimeout(() => {
        this.updateLoadingStep(5);
        this.updateProgress(100);
        this.loadingText = this.translate.instant('USER_LOADER.READY');
        setTimeout(() => {
          this.startExitAnimation();
          setTimeout(() => {
            const returnUrl = this.getSafeReturnUrl();
            if (returnUrl) {
              void this.router.navigateByUrl(returnUrl, {
                replaceUrl: true
              });
            } else {
              this.navigationService.goToTabsPage();
            }
          }, this.LOADING_CONFIG.EXIT_ANIMATION_DELAY);
        }, this.LOADING_CONFIG.COMPLETION_DELAY);
      }, this.LOADING_CONFIG.STEP_DELAY);
    }, err => {
      if (err.message === 'INCOMPLETE_USER') {
        this.navigationService.goToSignUp();
        return;
      }
      console.error('Error cargando usuario inicial:', err);
      if (this.requiresRelogin(err)) {
        this.userService.setLocalUser = null;
        this.workoutService.setCurrentWorkout = null;
        this.dietService.setCurrentDiet = null;
        this.tableService.setCurrentTable = null;
        this.authService.logout();
        return;
      }
      if (this.initialLoadRetryCount < this.MAX_INITIAL_LOAD_RETRIES) {
        this.initialLoadRetryCount += 1;
        this.loadingText = this.translate.instant('USER_LOADER.RETRYING');
        this.updateProgress(20);
        setTimeout(() => this.startLoadingSequence(), 1200 * this.initialLoadRetryCount);
        return;
      }
      this.loadingText = this.translate.instant('USER_LOADER.FAILED');
      this.updateProgress(0);
    });
  }
  requiresRelogin(error) {
    return !!(error?.requiresRelogin || error?.error?.requiresRelogin);
  }
  isUserRegistrationComplete(user) {
    // MVP-trainers F01: las cuentas profesionales (roles: ["trainer"]) nunca
    // tienen datos biométricos por diseño — exigirlos aquí las mandaría en
    // bucle a un sign-up de consumidor que no les corresponde.
    if (user?.roles?.includes('trainer')) {
      return !!(user?.name && user?.lastname);
    }
    return !!(user?.name && user?.lastname && user?.weight && user?.height);
  }
  updateProgress(value) {
    this.progress = Math.min(value, 100);
  }
  startExitAnimation() {
    this.animationState = 'out';
  }
  updateLoadingStep(step) {
    this.loadingStep = step;
    if (step <= this.loadingMessages.length) {
      this.loadingText = this.translate.instant(this.loadingMessages[step - 1]);
    }
  }
}
_UserLoaderPage = UserLoaderPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserLoaderPage, "\u0275fac", function UserLoaderPage_Factory(t) {
  return new (t || _UserLoaderPage)(_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_1__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](src_app_core_services_table_table_service__WEBPACK_IMPORTED_MODULE_2__.TableService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](src_app_core_services_diet_diet_service__WEBPACK_IMPORTED_MODULE_3__.DietService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](src_app_core_services_workout_workout_service__WEBPACK_IMPORTED_MODULE_4__.WorkoutService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](src_app_core_services_util_theme_service__WEBPACK_IMPORTED_MODULE_5__.ThemeService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_6__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](src_app_core_i18n_i18n_service__WEBPACK_IMPORTED_MODULE_7__.I18nService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](src_app_core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_8__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](src_app_core_services_billing_billing_service__WEBPACK_IMPORTED_MODULE_9__.BillingService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](src_app_core_services_coach_coach_service__WEBPACK_IMPORTED_MODULE_10__.CoachService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](src_app_core_services_notifications_notifications_service__WEBPACK_IMPORTED_MODULE_11__.NotificationsService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](src_app_core_services_onboarding_onboarding_service__WEBPACK_IMPORTED_MODULE_12__.OnboardingService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_20__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_20__.Router));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(UserLoaderPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵdefineComponent"]({
  type: _UserLoaderPage,
  selectors: [["app-user-loader"]],
  decls: 37,
  vars: 22,
  consts: [[1, "splash-container", "flex-center"], [1, "splash-content", "flex-center"], [1, "logo-container", "flex-center"], [1, "logo-circle", "flex-center"], ["src", "../../../../assets/Solo_Logo_dark.png", 1, "logo-image"], [1, "app-name"], [1, "train-text"], [1, "fit-text"], [1, "app-tagline"], [1, "highlight-letter"], [1, "progress-container"], [1, "progress-header", "flex-center"], [1, "loading-text", "m-0"], [1, "progress-bar"], [1, "progress-fill"], [1, "progress-percentage-bottom", "flex-center"], [1, "progress-percentage"], [1, "progress-steps", "flex-center"], [1, "step"]],
  template: function UserLoaderPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](4, "img", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](5, "h1", 5)(6, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](7, "Train");
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](8, "span", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](9, "Fit");
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](10, "p", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](11, " DE");
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](12, "span", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](13, "F");
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](14, "EAT YOUR L");
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](15, "span", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](16, "I");
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](17, "MI");
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](18, "span", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](19, "T");
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](20, "S ");
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](21, "div", 10)(22, "div", 11)(23, "p", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](24);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](25, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](26, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](27, "div", 15)(28, "span", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtext"](29);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipe"](30, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementStart"](31, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelement"](32, "div", 18)(33, "div", 18)(34, "div", 18)(35, "div", 18)(36, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("@fadeInOut", ctx.animationState);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("@logoAnimation", ctx.animationState);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("@textAnimation", ctx.animationState);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("@textAnimation", ctx.animationState);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵproperty"]("@progressAnimation", ctx.animationState);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate"](ctx.loadingText);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵstyleProp"]("width", ctx.progress, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵpipeBind2"](30, 19, ctx.progress, "1.0-0"), "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵclassProp"]("active", ctx.loadingStep >= 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵclassProp"]("active", ctx.loadingStep >= 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵclassProp"]("active", ctx.loadingStep >= 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵclassProp"]("active", ctx.loadingStep >= 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_18__["ɵɵclassProp"]("active", ctx.loadingStep >= 5);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_21__.DecimalPipe],
  styles: ["[_nghost-%COMP%] {\n  --splash-primary: var(--ion-color-primary);\n  --splash-primary-dark: var(--ion-color-primary-shade);\n  --splash-text-light: var(--ion-color-primary-contrast);\n  --splash-background: var(--ion-color-primary);\n  --splash-text-primary: var(--ion-color-primary-contrast);\n  --splash-text-secondary: rgba(255, 255, 255, 0.8);\n}\n\n.splash-container[_ngcontent-%COMP%] {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: linear-gradient(135deg, #141414 0%, #252525 50%, #141414 100%);\n  color: #ffffff;\n  z-index: 9999;\n  overflow: hidden;\n  font-family: \"Poppins\", sans-serif;\n}\n\n.splash-content[_ngcontent-%COMP%] {\n  flex-direction: column;\n  max-width: 400px;\n  width: 100%;\n  padding: 2rem 1.5rem;\n  text-align: center;\n}\n\n.splash-logo[_ngcontent-%COMP%] {\n  width: 120px;\n  height: 120px;\n  margin-bottom: 20px;\n  border-radius: 50%;\n  background-color: var(--splash-text-light);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n}\n\n.splash-title[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: bold;\n  margin-bottom: 10px;\n  color: var(--splash-text-light);\n}\n\n.highlight-letter[_ngcontent-%COMP%] {\n  color: #FF6B00;\n  font-weight: bold;\n}\n\n.splash-subtitle[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  margin-bottom: 40px;\n  color: var(--splash-text-light);\n  opacity: 0.9;\n}\n\n.splash-branding[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 20px;\n  font-size: 0.9rem;\n  opacity: 0.7;\n  color: var(--splash-text-light);\n}\n\n.logo-container[_ngcontent-%COMP%] {\n  flex-direction: column;\n  margin-bottom: 3rem;\n  margin-top: -2rem;\n  position: relative;\n}\n\n.logo-circle[_ngcontent-%COMP%] {\n  width: 200px;\n  height: 200px;\n  background: transparent;\n  border-radius: 50%;\n  margin: 0 auto 1.5rem;\n  position: relative;\n}\n.logo-circle[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: -30px;\n  left: -30px;\n  right: -30px;\n  bottom: -30px;\n  border: 4px solid var(--ion-color-primary, #3880ff);\n  border-top-color: transparent;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_rotate 4s linear infinite;\n}\n.logo-circle[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  top: -50px;\n  left: -50px;\n  right: -50px;\n  bottom: -50px;\n  border: 3px solid var(--ion-color-secondary, #0cd1e8);\n  border-bottom-color: transparent;\n  border-radius: 50%;\n  animation: _ngcontent-%COMP%_rotate 6s linear infinite reverse;\n}\n\n.logo-icon[_ngcontent-%COMP%] {\n  font-size: 4rem;\n  color: white;\n  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));\n}\n\n.logo-image[_ngcontent-%COMP%] {\n  width: 160px;\n  height: 160px;\n  object-fit: contain;\n  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));\n  transition: all 0.3s ease;\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    transform: translateX(-100%);\n  }\n  100% {\n    transform: translateX(100%);\n  }\n}\n@keyframes _ngcontent-%COMP%_rotate {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n@keyframes _ngcontent-%COMP%_pulse-success {\n  0% {\n    transform: scale(1);\n  }\n  50% {\n    transform: scale(1.1);\n    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px var(--ion-color-success);\n  }\n  100% {\n    transform: scale(1);\n  }\n}\n.app-name[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  margin-bottom: 0.5rem;\n  text-align: center;\n  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n  letter-spacing: -0.5px;\n  font-family: \"Poppins\", sans-serif;\n}\n.app-name[_ngcontent-%COMP%]   .train-text[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.app-name[_ngcontent-%COMP%]   .fit-text[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary, #3880ff);\n}\n\n.app-tagline[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 400;\n  text-align: center;\n  color: rgba(255, 255, 255, 0.9);\n  opacity: 0.9;\n  margin-bottom: 2rem;\n  letter-spacing: 0.5px;\n  font-family: \"Poppins\", sans-serif;\n  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);\n}\n\n.progress-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 320px;\n  margin: 0 auto;\n  padding: 0 2rem;\n  position: relative;\n}\n\n.progress-header[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  text-align: center;\n}\n.progress-header[_ngcontent-%COMP%]   .loading-text[_ngcontent-%COMP%] {\n  margin: 0;\n  width: 100%;\n}\n.progress-header[_ngcontent-%COMP%]   .progress-percentage[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 500;\n  color: var(--ion-color-primary);\n  font-family: \"Poppins\", sans-serif;\n}\n\n.progress-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 4px;\n  background: rgba(255, 255, 255, 0.2);\n  border-radius: 2px;\n  overflow: hidden;\n  margin-bottom: 0.5rem;\n  position: relative;\n}\n\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background: var(--ion-color-primary);\n  border-radius: 2px;\n  transition: width 0.6s ease-out;\n  position: relative;\n}\n\n.progress-percentage-bottom[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n}\n.progress-percentage-bottom[_ngcontent-%COMP%]   .progress-percentage[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 500;\n  color: var(--ion-color-primary);\n  font-family: \"Poppins\", sans-serif;\n}\n\n.loading-text[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: 0.9rem;\n  color: rgba(255, 255, 255, 0.8);\n  font-weight: 400;\n  font-family: \"Poppins\", sans-serif;\n}\n\n.progress-steps[_ngcontent-%COMP%] {\n  gap: 8px;\n  margin-top: 1rem;\n}\n.progress-steps[_ngcontent-%COMP%]   .step[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.3);\n  transition: all 0.3s ease;\n}\n.progress-steps[_ngcontent-%COMP%]   .step.active[_ngcontent-%COMP%] {\n  background: var(--ion-color-primary);\n  transform: scale(1.3);\n}\n\n@media (max-width: 768px) {\n  .splash-content[_ngcontent-%COMP%] {\n    padding: 1.5rem 1rem;\n    max-width: 350px;\n  }\n  .logo-container[_ngcontent-%COMP%] {\n    margin-top: -1rem;\n    margin-bottom: 2rem;\n  }\n  .logo-circle[_ngcontent-%COMP%] {\n    width: 160px;\n    height: 160px;\n    margin-bottom: 1rem;\n  }\n  .logo-circle[_ngcontent-%COMP%]::before {\n    top: -20px;\n    left: -20px;\n    right: -20px;\n    bottom: -20px;\n    border-width: 3px;\n  }\n  .logo-circle[_ngcontent-%COMP%]::after {\n    top: -35px;\n    left: -35px;\n    right: -35px;\n    bottom: -35px;\n    border-width: 2px;\n  }\n  .logo-image[_ngcontent-%COMP%] {\n    width: 130px;\n    height: 130px;\n  }\n  .logo-icon[_ngcontent-%COMP%] {\n    font-size: 3rem;\n  }\n  .app-name[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .app-tagline[_ngcontent-%COMP%] {\n    font-size: 1rem;\n  }\n  .progress-container[_ngcontent-%COMP%] {\n    max-width: 250px;\n    padding: 0 1rem;\n  }\n}\n@media (max-width: 480px) {\n  .splash-content[_ngcontent-%COMP%] {\n    padding: 1rem 0.75rem;\n    max-width: 300px;\n  }\n  .logo-container[_ngcontent-%COMP%] {\n    margin-top: -0.5rem;\n    margin-bottom: 1.5rem;\n  }\n  .logo-circle[_ngcontent-%COMP%] {\n    width: 130px;\n    height: 130px;\n    margin-bottom: 0.75rem;\n  }\n  .logo-circle[_ngcontent-%COMP%]::before {\n    top: -15px;\n    left: -15px;\n    right: -15px;\n    bottom: -15px;\n    border-width: 3px;\n  }\n  .logo-circle[_ngcontent-%COMP%]::after {\n    top: -25px;\n    left: -25px;\n    right: -25px;\n    bottom: -25px;\n    border-width: 2px;\n  }\n  .logo-image[_ngcontent-%COMP%] {\n    width: 100px;\n    height: 100px;\n  }\n  .logo-icon[_ngcontent-%COMP%] {\n    font-size: 2.5rem;\n  }\n  .app-name[_ngcontent-%COMP%] {\n    font-size: 1.8rem;\n  }\n  .app-tagline[_ngcontent-%COMP%] {\n    font-size: 0.9rem;\n  }\n  .progress-container[_ngcontent-%COMP%] {\n    max-width: 200px;\n    padding: 0 0.75rem;\n  }\n}\n@media (max-height: 600px) {\n  .logo-container[_ngcontent-%COMP%] {\n    margin-bottom: 1.5rem;\n    margin-top: -1rem;\n  }\n  .progress-container[_ngcontent-%COMP%] {\n    margin-top: 30px;\n  }\n  .logo-circle[_ngcontent-%COMP%] {\n    width: 140px;\n    height: 140px;\n  }\n  .logo-circle[_ngcontent-%COMP%]::before {\n    top: -20px;\n    left: -20px;\n    right: -20px;\n    bottom: -20px;\n    border-width: 3px;\n  }\n  .logo-circle[_ngcontent-%COMP%]::after {\n    top: -30px;\n    left: -30px;\n    right: -30px;\n    bottom: -30px;\n    border-width: 2px;\n  }\n  .logo-image[_ngcontent-%COMP%] {\n    width: 110px;\n    height: 110px;\n  }\n  .logo-icon[_ngcontent-%COMP%] {\n    font-size: 2.5rem;\n  }\n}\n.logo-circle.completed[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, var(--ion-color-success), var(--ion-color-primary-tint));\n  transform: scale(1.1);\n  transition: all 0.5s ease;\n  animation: _ngcontent-%COMP%_pulse-success 0.6s ease-out;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL3VzZXItbG9hZGVyL3VzZXItbG9hZGVyLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUVFLDBDQUFBO0VBQ0EscURBQUE7RUFDQSxzREFBQTtFQUNBLDZDQUFBO0VBQ0Esd0RBQUE7RUFDQSxpREFBQTtBQUhGOztBQU1BO0VBQ0UsZUFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSwwRUFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQ0FBQTtBQUhGOztBQU1BO0VBQ0Usc0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0FBSEY7O0FBTUE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQ0FBQTtFQUNBLHdDQUFBO0FBSEY7O0FBTUE7RUFDRSxpQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSwrQkFBQTtBQUhGOztBQU1BO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0FBSEY7O0FBTUE7RUFDRSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsK0JBQUE7RUFDQSxZQUFBO0FBSEY7O0FBTUE7RUFDRSxrQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLFlBQUE7RUFDQSwrQkFBQTtBQUhGOztBQU9BO0VBQ0Usc0JBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7QUFKRjs7QUFPQTtFQUNFLFlBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7QUFKRjtBQU1FO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1EQUFBO0VBQ0EsNkJBQUE7RUFDQSxrQkFBQTtFQUNBLG9DQUFBO0FBSko7QUFPRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxxREFBQTtFQUNBLGdDQUFBO0VBQ0Esa0JBQUE7RUFDQSw0Q0FBQTtBQUxKOztBQVNBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSxpREFBQTtBQU5GOztBQVNBO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGlEQUFBO0VBQ0EseUJBQUE7QUFORjs7QUFVQTtFQUNFO0lBQ0UsNEJBQUE7RUFQRjtFQVNBO0lBQ0UsMkJBQUE7RUFQRjtBQUNGO0FBVUE7RUFDRTtJQUNFLHVCQUFBO0VBUkY7RUFVQTtJQUNFLHlCQUFBO0VBUkY7QUFDRjtBQVdBO0VBQ0U7SUFDRSxtQkFBQTtFQVRGO0VBV0E7SUFDRSxxQkFBQTtJQUNBLDRFQUNFO0VBVko7RUFhQTtJQUNFLG1CQUFBO0VBWEY7QUFDRjtBQWNBO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5Q0FBQTtFQUNBLHNCQUFBO0VBQ0Esa0NBQUE7QUFaRjtBQWNFO0VBQ0UsY0FBQTtBQVpKO0FBZUU7RUFDRSx3Q0FBQTtBQWJKOztBQWlCQTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLCtCQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxrQ0FBQTtFQUNBLHlDQUFBO0FBZEY7O0FBa0JBO0VBQ0UsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQWZGOztBQWtCQTtFQUNFLG1CQUFBO0VBQ0Esa0JBQUE7QUFmRjtBQWlCRTtFQUNFLFNBQUE7RUFDQSxXQUFBO0FBZko7QUFrQkU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7RUFDQSxrQ0FBQTtBQWhCSjs7QUFvQkE7RUFDRSxXQUFBO0VBQ0EsV0FBQTtFQUNBLG9DQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7QUFqQkY7O0FBb0JBO0VBQ0UsWUFBQTtFQUNBLG9DQUFBO0VBQ0Esa0JBQUE7RUFDQSwrQkFBQTtFQUNBLGtCQUFBO0FBakJGOztBQW9CQTtFQUNFLG1CQUFBO0FBakJGO0FBbUJFO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLCtCQUFBO0VBQ0Esa0NBQUE7QUFqQko7O0FBcUJBO0VBQ0Usa0JBQUE7RUFDQSxpQkFBQTtFQUNBLCtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQ0FBQTtBQWxCRjs7QUFxQkE7RUFDRSxRQUFBO0VBQ0EsZ0JBQUE7QUFsQkY7QUFvQkU7RUFDRSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0Esb0NBQUE7RUFDQSx5QkFBQTtBQWxCSjtBQW9CSTtFQUNFLG9DQUFBO0VBQ0EscUJBQUE7QUFsQk47O0FBd0JBO0VBQ0U7SUFDRSxvQkFBQTtJQUNBLGdCQUFBO0VBckJGO0VBd0JBO0lBQ0UsaUJBQUE7SUFDQSxtQkFBQTtFQXRCRjtFQXlCQTtJQUNFLFlBQUE7SUFDQSxhQUFBO0lBQ0EsbUJBQUE7RUF2QkY7RUF5QkU7SUFDRSxVQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7SUFDQSxhQUFBO0lBQ0EsaUJBQUE7RUF2Qko7RUEwQkU7SUFDRSxVQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7SUFDQSxhQUFBO0lBQ0EsaUJBQUE7RUF4Qko7RUE0QkE7SUFDRSxZQUFBO0lBQ0EsYUFBQTtFQTFCRjtFQTZCQTtJQUNFLGVBQUE7RUEzQkY7RUE4QkE7SUFDRSxlQUFBO0VBNUJGO0VBK0JBO0lBQ0UsZUFBQTtFQTdCRjtFQWdDQTtJQUNFLGdCQUFBO0lBQ0EsZUFBQTtFQTlCRjtBQUNGO0FBaUNBO0VBQ0U7SUFDRSxxQkFBQTtJQUNBLGdCQUFBO0VBL0JGO0VBa0NBO0lBQ0UsbUJBQUE7SUFDQSxxQkFBQTtFQWhDRjtFQW1DQTtJQUNFLFlBQUE7SUFDQSxhQUFBO0lBQ0Esc0JBQUE7RUFqQ0Y7RUFtQ0U7SUFDRSxVQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7SUFDQSxhQUFBO0lBQ0EsaUJBQUE7RUFqQ0o7RUFvQ0U7SUFDRSxVQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7SUFDQSxhQUFBO0lBQ0EsaUJBQUE7RUFsQ0o7RUFzQ0E7SUFDRSxZQUFBO0lBQ0EsYUFBQTtFQXBDRjtFQXVDQTtJQUNFLGlCQUFBO0VBckNGO0VBd0NBO0lBQ0UsaUJBQUE7RUF0Q0Y7RUF5Q0E7SUFDRSxpQkFBQTtFQXZDRjtFQTBDQTtJQUNFLGdCQUFBO0lBQ0Esa0JBQUE7RUF4Q0Y7QUFDRjtBQTJDQTtFQUNFO0lBQ0UscUJBQUE7SUFDQSxpQkFBQTtFQXpDRjtFQTRDQTtJQUNFLGdCQUFBO0VBMUNGO0VBNkNBO0lBQ0UsWUFBQTtJQUNBLGFBQUE7RUEzQ0Y7RUE2Q0U7SUFDRSxVQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7SUFDQSxhQUFBO0lBQ0EsaUJBQUE7RUEzQ0o7RUE4Q0U7SUFDRSxVQUFBO0lBQ0EsV0FBQTtJQUNBLFlBQUE7SUFDQSxhQUFBO0lBQ0EsaUJBQUE7RUE1Q0o7RUFnREE7SUFDRSxZQUFBO0lBQ0EsYUFBQTtFQTlDRjtFQWlEQTtJQUNFLGlCQUFBO0VBL0NGO0FBQ0Y7QUFtREE7RUFDRSw0RkFBQTtFQUNBLHFCQUFBO0VBQ0EseUJBQUE7RUFDQSxzQ0FBQTtBQWpERiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNyYy9hcHAvZmVhdHVyZXMvdXNlci1sb2FkZXIvdXNlci1sb2FkZXIucGFnZS5zY3NzXG4vLyBPcHRpbWl6YWRvIHBhcmEgdXNhciB2YXJpYWJsZXMgZ2xvYmFsZXMgZGVsIHNpc3RlbWEgVHJhaW4gRml0XG5cbjpob3N0IHtcbiAgLy8gVmFyaWFibGVzIGVzcGVjw4PCrWZpY2FzIGRlbCBzcGxhc2ggdXNhbmRvIGVsIHNpc3RlbWEgZGUgdGVtYSBnbG9iYWxcbiAgLS1zcGxhc2gtcHJpbWFyeTogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAtLXNwbGFzaC1wcmltYXJ5LWRhcms6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlKTtcbiAgLS1zcGxhc2gtdGV4dC1saWdodDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xuICAtLXNwbGFzaC1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIC0tc3BsYXNoLXRleHQtcHJpbWFyeTogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xuICAtLXNwbGFzaC10ZXh0LXNlY29uZGFyeTogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xufVxuXG4uc3BsYXNoLWNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMTQxNDE0IDAlLCAjMjUyNTI1IDUwJSwgIzE0MTQxNCAxMDAlKTtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIHotaW5kZXg6IDk5OTk7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGZvbnQtZmFtaWx5OiBcIlBvcHBpbnNcIiwgc2Fucy1zZXJpZjtcbn1cblxuLnNwbGFzaC1jb250ZW50IHtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgbWF4LXdpZHRoOiA0MDBweDtcbiAgd2lkdGg6IDEwMCU7XG4gIHBhZGRpbmc6IDJyZW0gMS41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5zcGxhc2gtbG9nbyB7XG4gIHdpZHRoOiAxMjBweDtcbiAgaGVpZ2h0OiAxMjBweDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zcGxhc2gtdGV4dC1saWdodCk7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMik7XG59XG5cbi5zcGxhc2gtdGl0bGUge1xuICBmb250LXNpemU6IDIuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIGNvbG9yOiB2YXIoLS1zcGxhc2gtdGV4dC1saWdodCk7XG59XG5cbi5oaWdobGlnaHQtbGV0dGVyIHtcbiAgY29sb3I6ICNGRjZCMDA7IC8vIENvbG9yIG5hcmFuamEgcGFyYSBsYXMgbGV0cmFzIEYgZSBJXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuXG4uc3BsYXNoLXN1YnRpdGxlIHtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIG1hcmdpbi1ib3R0b206IDQwcHg7XG4gIGNvbG9yOiB2YXIoLS1zcGxhc2gtdGV4dC1saWdodCk7XG4gIG9wYWNpdHk6IDAuOTtcbn1cblxuLnNwbGFzaC1icmFuZGluZyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAyMHB4O1xuICBmb250LXNpemU6IDAuOXJlbTtcbiAgb3BhY2l0eTogMC43O1xuICBjb2xvcjogdmFyKC0tc3BsYXNoLXRleHQtbGlnaHQpO1xufVxuXG4vLyBMb2dvIHkgYnJhbmRpbmdcbi5sb2dvLWNvbnRhaW5lciB7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1hcmdpbi1ib3R0b206IDNyZW07XG4gIG1hcmdpbi10b3A6IC0ycmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5sb2dvLWNpcmNsZSB7XG4gIHdpZHRoOiAyMDBweDtcbiAgaGVpZ2h0OiAyMDBweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgbWFyZ2luOiAwIGF1dG8gMS41cmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiBcIlwiO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC0zMHB4O1xuICAgIGxlZnQ6IC0zMHB4O1xuICAgIHJpZ2h0OiAtMzBweDtcbiAgICBib3R0b206IC0zMHB4O1xuICAgIGJvcmRlcjogNHB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LCAjMzg4MGZmKTtcbiAgICBib3JkZXItdG9wLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYW5pbWF0aW9uOiByb3RhdGUgNHMgbGluZWFyIGluZmluaXRlO1xuICB9XG5cbiAgJjo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogLTUwcHg7XG4gICAgbGVmdDogLTUwcHg7XG4gICAgcmlnaHQ6IC01MHB4O1xuICAgIGJvdHRvbTogLTUwcHg7XG4gICAgYm9yZGVyOiAzcHggc29saWQgdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSwgIzBjZDFlOCk7XG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGFuaW1hdGlvbjogcm90YXRlIDZzIGxpbmVhciBpbmZpbml0ZSByZXZlcnNlO1xuICB9XG59XG5cbi5sb2dvLWljb24ge1xuICBmb250LXNpemU6IDRyZW07XG4gIGNvbG9yOiB3aGl0ZTtcbiAgZmlsdGVyOiBkcm9wLXNoYWRvdygwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjIpKTtcbn1cblxuLmxvZ28taW1hZ2Uge1xuICB3aWR0aDogMTYwcHg7XG4gIGhlaWdodDogMTYwcHg7XG4gIG9iamVjdC1maXQ6IGNvbnRhaW47XG4gIGZpbHRlcjogZHJvcC1zaGFkb3coMCA0cHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKSk7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG59XG5cbi8vIEFuaW1hY2lvbmVzIG9wdGltaXphZGFzXG5Aa2V5ZnJhbWVzIHNoaW1tZXIge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgfVxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyByb3RhdGUge1xuICBmcm9tIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwZGVnKTtcbiAgfVxuICB0byB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHB1bHNlLXN1Y2Nlc3Mge1xuICAwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgfVxuICA1MCUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4xKTtcbiAgICBib3gtc2hhZG93OlxuICAgICAgMCA4cHggMzJweCByZ2JhKDAsIDAsIDAsIDAuMyksXG4gICAgICAwIDAgMjBweCB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gIH1cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcbiAgfVxufVxuXG4uYXBwLW5hbWUge1xuICBmb250LXNpemU6IDIuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHRleHQtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjMpO1xuICBsZXR0ZXItc3BhY2luZzogLTAuNXB4O1xuICBmb250LWZhbWlseTogXCJQb3BwaW5zXCIsIHNhbnMtc2VyaWY7XG5cbiAgLnRyYWluLXRleHQge1xuICAgIGNvbG9yOiAjZmZmZmZmO1xuICB9XG5cbiAgLmZpdC10ZXh0IHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnksICMzODgwZmYpO1xuICB9XG59XG5cbi5hcHAtdGFnbGluZSB7XG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xuICBmb250LXdlaWdodDogNDAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOSk7XG4gIG9wYWNpdHk6IDAuOTtcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICBmb250LWZhbWlseTogXCJQb3BwaW5zXCIsIHNhbnMtc2VyaWY7XG4gIHRleHQtc2hhZG93OiAwIDFweCA0cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xufVxuXG4vLyBCYXJyYSBkZSBwcm9ncmVzbyBtZWpvcmFkYVxuLnByb2dyZXNzLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDMyMHB4O1xuICBtYXJnaW46IDAgYXV0bztcbiAgcGFkZGluZzogMCAycmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5wcm9ncmVzcy1oZWFkZXIge1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgLmxvYWRpbmctdGV4dCB7XG4gICAgbWFyZ2luOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbiAgLnByb2dyZXNzLXBlcmNlbnRhZ2Uge1xuICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgZm9udC1mYW1pbHk6IFwiUG9wcGluc1wiLCBzYW5zLXNlcmlmO1xuICB9XG59XG5cbi5wcm9ncmVzcy1iYXIge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA0cHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBtYXJnaW4tYm90dG9tOiAwLjVyZW07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnByb2dyZXNzLWZpbGwge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICB0cmFuc2l0aW9uOiB3aWR0aCAwLjZzIGVhc2Utb3V0O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi5wcm9ncmVzcy1wZXJjZW50YWdlLWJvdHRvbSB7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG5cbiAgLnByb2dyZXNzLXBlcmNlbnRhZ2Uge1xuICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgZm9udC1mYW1pbHk6IFwiUG9wcGluc1wiLCBzYW5zLXNlcmlmO1xuICB9XG59XG5cbi5sb2FkaW5nLXRleHQge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xuICBmb250LXdlaWdodDogNDAwO1xuICBmb250LWZhbWlseTogXCJQb3BwaW5zXCIsIHNhbnMtc2VyaWY7XG59XG5cbi5wcm9ncmVzcy1zdGVwcyB7XG4gIGdhcDogOHB4O1xuICBtYXJnaW4tdG9wOiAxcmVtO1xuXG4gIC5zdGVwIHtcbiAgICB3aWR0aDogNnB4O1xuICAgIGhlaWdodDogNnB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMyk7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcblxuICAgICYuYWN0aXZlIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMS4zKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gUmVzcG9uc2l2ZSBkZXNpZ24gdXNhbmRvIHZhcmlhYmxlcyBnbG9iYWxlc1xuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5zcGxhc2gtY29udGVudCB7XG4gICAgcGFkZGluZzogMS41cmVtIDFyZW07XG4gICAgbWF4LXdpZHRoOiAzNTBweDtcbiAgfVxuXG4gIC5sb2dvLWNvbnRhaW5lciB7XG4gICAgbWFyZ2luLXRvcDogLTFyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogMnJlbTtcbiAgfVxuXG4gIC5sb2dvLWNpcmNsZSB7XG4gICAgd2lkdGg6IDE2MHB4O1xuICAgIGhlaWdodDogMTYwcHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcblxuICAgICY6OmJlZm9yZSB7XG4gICAgICB0b3A6IC0yMHB4O1xuICAgICAgbGVmdDogLTIwcHg7XG4gICAgICByaWdodDogLTIwcHg7XG4gICAgICBib3R0b206IC0yMHB4O1xuICAgICAgYm9yZGVyLXdpZHRoOiAzcHg7XG4gICAgfVxuXG4gICAgJjo6YWZ0ZXIge1xuICAgICAgdG9wOiAtMzVweDtcbiAgICAgIGxlZnQ6IC0zNXB4O1xuICAgICAgcmlnaHQ6IC0zNXB4O1xuICAgICAgYm90dG9tOiAtMzVweDtcbiAgICAgIGJvcmRlci13aWR0aDogMnB4O1xuICAgIH1cbiAgfVxuXG4gIC5sb2dvLWltYWdlIHtcbiAgICB3aWR0aDogMTMwcHg7XG4gICAgaGVpZ2h0OiAxMzBweDtcbiAgfVxuXG4gIC5sb2dvLWljb24ge1xuICAgIGZvbnQtc2l6ZTogM3JlbTtcbiAgfVxuXG4gIC5hcHAtbmFtZSB7XG4gICAgZm9udC1zaXplOiAycmVtO1xuICB9XG5cbiAgLmFwcC10YWdsaW5lIHtcbiAgICBmb250LXNpemU6IDFyZW07XG4gIH1cblxuICAucHJvZ3Jlc3MtY29udGFpbmVyIHtcbiAgICBtYXgtd2lkdGg6IDI1MHB4O1xuICAgIHBhZGRpbmc6IDAgMXJlbTtcbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcbiAgLnNwbGFzaC1jb250ZW50IHtcbiAgICBwYWRkaW5nOiAxcmVtIDAuNzVyZW07XG4gICAgbWF4LXdpZHRoOiAzMDBweDtcbiAgfVxuXG4gIC5sb2dvLWNvbnRhaW5lciB7XG4gICAgbWFyZ2luLXRvcDogLTAuNXJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG4gIH1cblxuICAubG9nby1jaXJjbGUge1xuICAgIHdpZHRoOiAxMzBweDtcbiAgICBoZWlnaHQ6IDEzMHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDAuNzVyZW07XG5cbiAgICAmOjpiZWZvcmUge1xuICAgICAgdG9wOiAtMTVweDtcbiAgICAgIGxlZnQ6IC0xNXB4O1xuICAgICAgcmlnaHQ6IC0xNXB4O1xuICAgICAgYm90dG9tOiAtMTVweDtcbiAgICAgIGJvcmRlci13aWR0aDogM3B4O1xuICAgIH1cblxuICAgICY6OmFmdGVyIHtcbiAgICAgIHRvcDogLTI1cHg7XG4gICAgICBsZWZ0OiAtMjVweDtcbiAgICAgIHJpZ2h0OiAtMjVweDtcbiAgICAgIGJvdHRvbTogLTI1cHg7XG4gICAgICBib3JkZXItd2lkdGg6IDJweDtcbiAgICB9XG4gIH1cblxuICAubG9nby1pbWFnZSB7XG4gICAgd2lkdGg6IDEwMHB4O1xuICAgIGhlaWdodDogMTAwcHg7XG4gIH1cblxuICAubG9nby1pY29uIHtcbiAgICBmb250LXNpemU6IDIuNXJlbTtcbiAgfVxuXG4gIC5hcHAtbmFtZSB7XG4gICAgZm9udC1zaXplOiAxLjhyZW07XG4gIH1cblxuICAuYXBwLXRhZ2xpbmUge1xuICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICB9XG5cbiAgLnByb2dyZXNzLWNvbnRhaW5lciB7XG4gICAgbWF4LXdpZHRoOiAyMDBweDtcbiAgICBwYWRkaW5nOiAwIDAuNzVyZW07XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtaGVpZ2h0OiA2MDBweCkge1xuICAubG9nby1jb250YWluZXIge1xuICAgIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbiAgICBtYXJnaW4tdG9wOiAtMXJlbTtcbiAgfVxuXG4gIC5wcm9ncmVzcy1jb250YWluZXIge1xuICAgIG1hcmdpbi10b3A6IDMwcHg7XG4gIH1cblxuICAubG9nby1jaXJjbGUge1xuICAgIHdpZHRoOiAxNDBweDtcbiAgICBoZWlnaHQ6IDE0MHB4O1xuXG4gICAgJjo6YmVmb3JlIHtcbiAgICAgIHRvcDogLTIwcHg7XG4gICAgICBsZWZ0OiAtMjBweDtcbiAgICAgIHJpZ2h0OiAtMjBweDtcbiAgICAgIGJvdHRvbTogLTIwcHg7XG4gICAgICBib3JkZXItd2lkdGg6IDNweDtcbiAgICB9XG5cbiAgICAmOjphZnRlciB7XG4gICAgICB0b3A6IC0zMHB4O1xuICAgICAgbGVmdDogLTMwcHg7XG4gICAgICByaWdodDogLTMwcHg7XG4gICAgICBib3R0b206IC0zMHB4O1xuICAgICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgfVxuICB9XG5cbiAgLmxvZ28taW1hZ2Uge1xuICAgIHdpZHRoOiAxMTBweDtcbiAgICBoZWlnaHQ6IDExMHB4O1xuICB9XG5cbiAgLmxvZ28taWNvbiB7XG4gICAgZm9udC1zaXplOiAyLjVyZW07XG4gIH1cbn1cblxuLy8gRXN0YWRvcyBlc3BlY2lhbGVzIHVzYW5kbyB2YXJpYWJsZXMgZ2xvYmFsZXNcbi5sb2dvLWNpcmNsZS5jb21wbGV0ZWQge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS1pb24tY29sb3Itc3VjY2VzcyksIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXRpbnQpKTtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xuICB0cmFuc2l0aW9uOiBhbGwgMC41cyBlYXNlO1xuICBhbmltYXRpb246IHB1bHNlLXN1Y2Nlc3MgMC42cyBlYXNlLW91dDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"],
  data: {
    animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.trigger)('fadeInOut', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.state)('in', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.style)({
      opacity: 1
    })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.transition)('void => *', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.style)({
      opacity: 0
    }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.animate)('800ms ease-in', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.style)({
      opacity: 1
    }))]), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.transition)('* => void', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.animate)('500ms ease-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.style)({
      opacity: 0
    }))])]), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.trigger)('logoAnimation', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.state)('in', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.style)({
      transform: 'scale(1)',
      opacity: 1
    })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.transition)('void => *', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.style)({
      transform: 'scale(0.8)',
      opacity: 0
    }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.animate)('600ms ease-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.style)({
      transform: 'scale(1)',
      opacity: 1
    }))])]), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.trigger)('textAnimation', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.state)('in', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.style)({
      opacity: 1
    })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.transition)('void => *', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.style)({
      opacity: 0
    }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.animate)('400ms 300ms ease-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.style)({
      opacity: 1
    }))])]), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.trigger)('progressAnimation', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.state)('in', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.style)({
      opacity: 1
    })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.transition)('void => *', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.style)({
      opacity: 0
    }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.animate)('400ms 600ms ease-out', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_22__.style)({
      opacity: 1
    }))])])]
  }
}));


/***/ })

}]);
//# sourceMappingURL=packages_shared-features_src_app_features_user-loader_user-loader_module_ts.js.map