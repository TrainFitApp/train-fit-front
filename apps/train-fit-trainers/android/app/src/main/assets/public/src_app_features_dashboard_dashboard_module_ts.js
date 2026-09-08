"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_features_dashboard_dashboard_module_ts"],{

/***/ 60562:
/*!**************************************************************************!*\
  !*** ./src/app/features/clients/services/trainer-clients-api.service.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrainerClientsApiService: () => (/* binding */ TrainerClientsApiService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/http/http.service */ 88552);

var _TrainerClientsApiService;


class TrainerClientsApiService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  getMyClients() {
    return this.http.get(TrainerClientsApiService.ENDPOINT);
  }
  // TASK-022 (MASTER_BACKLOG.md) — ruta nueva y aditiva (ver trainer-client-
  // routes.js), no sustituye a getMyClients(): los demás consumidores de
  // esa lista (dashboard, select-clients-modal, etc.) siguen necesitando el
  // listado completo.
  getMyClientsPaginated(page, limit, search) {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit)
    });
    if (search.trim()) params.set('search', search.trim());
    return this.http.get(`${TrainerClientsApiService.ENDPOINT}/paginated?${params.toString()}`);
  }
}
_TrainerClientsApiService = TrainerClientsApiService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TrainerClientsApiService, "ENDPOINT", 'trainer/clients');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TrainerClientsApiService, "\u0275fac", function TrainerClientsApiService_Factory(t) {
  return new (t || _TrainerClientsApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TrainerClientsApiService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _TrainerClientsApiService,
  factory: _TrainerClientsApiService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 65050:
/*!****************************************************************!*\
  !*** ./src/app/features/dashboard/dashboard-routing.module.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardPageRoutingModule: () => (/* binding */ DashboardPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _dashboard_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard.page */ 27852);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _DashboardPageRoutingModule;




const routes = [{
  path: '',
  component: _dashboard_page__WEBPACK_IMPORTED_MODULE_1__.DashboardPage
}];
class DashboardPageRoutingModule {}
_DashboardPageRoutingModule = DashboardPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DashboardPageRoutingModule, "\u0275fac", function DashboardPageRoutingModule_Factory(t) {
  return new (t || _DashboardPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DashboardPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _DashboardPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DashboardPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](DashboardPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 27907:
/*!********************************************************!*\
  !*** ./src/app/features/dashboard/dashboard.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardPageModule: () => (/* binding */ DashboardPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard-routing.module */ 65050);
/* harmony import */ var _dashboard_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard.page */ 27852);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);

var _DashboardPageModule;




class DashboardPageModule {}
_DashboardPageModule = DashboardPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DashboardPageModule, "\u0275fac", function DashboardPageModule_Factory(t) {
  return new (t || _DashboardPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DashboardPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _DashboardPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DashboardPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_2__.DashboardPageRoutingModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](DashboardPageModule, {
    declarations: [_dashboard_page__WEBPACK_IMPORTED_MODULE_3__.DashboardPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _dashboard_routing_module__WEBPACK_IMPORTED_MODULE_2__.DashboardPageRoutingModule]
  });
})();

/***/ }),

/***/ 27852:
/*!******************************************************!*\
  !*** ./src/app/features/dashboard/dashboard.page.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DashboardPage: () => (/* binding */ DashboardPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _clients_services_trainer_clients_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../clients/services/trainer-clients-api.service */ 60562);
/* harmony import */ var _services_trainer_payments_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/trainer-payments-api.service */ 7627);
/* harmony import */ var _services_trainer_notifications_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/trainer-notifications-api.service */ 57438);
/* harmony import */ var _services_coach_alerts_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/coach-alerts-api.service */ 77554);
/* harmony import */ var _services_coach_tasks_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./services/coach-tasks-api.service */ 48099);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ionic/angular */ 54844);


var _DashboardPage;











function DashboardPage_div_9_span_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate3"](" ", ctx_r21.activeClientsCount, " cliente", ctx_r21.activeClientsCount === 1 ? "" : "s", " activo", ctx_r21.activeClientsCount === 1 ? "" : "s", " ");
  }
}
function DashboardPage_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 29)(1, "div", 30)(2, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_div_9_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r23);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r22.setAlertFilter("all"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "ion-icon", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, " Todas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_div_9_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r23);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r24.setAlertFilter("high"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "ion-icon", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, " Urgentes ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](12, DashboardPage_div_9_span_12_Template, 2, 3, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("triage-chip--active", ctx_r0.alertFilter === "all");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("aria-pressed", ctx_r0.alertFilter === "all");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r0.alerts.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("triage-chip--active", ctx_r0.alertFilter === "high");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r0.highPriorityCount === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("aria-pressed", ctx_r0.alertFilter === "high");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r0.highPriorityCount);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.activeClientsCount !== null);
  }
}
function DashboardPage_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "div", 39)(2, "div", 39)(3, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function DashboardPage_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "ion-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "No se pudieron cargar las alertas de tus clientes.");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_div_17_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r26);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r25.loadAlerts());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "Reintentar");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function DashboardPage_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "ion-icon", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "p", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Ning\u00FAn cliente necesita atenci\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, " Cada madrugada se revisan el peso, las medidas, la adherencia y los check-ins de tus clientes. Lo que necesite una decisi\u00F3n tuya aparecer\u00E1 aqu\u00ED. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "button", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_div_18_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r28);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r27.evaluateNow());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r3.isEvaluating);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r3.isEvaluating ? "Revisando\u2026" : "Revisar ahora", " ");
  }
}
function DashboardPage_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "ion-icon", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "p", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Nada urgente ahora mismo");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_div_19_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r30);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r29.setAlertFilter("all"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" Ver las ", ctx_r4.alerts.length, " alertas ");
  }
}
function DashboardPage_ul_20_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "li", 50)(1, "button", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_ul_20_li_1_Template_button_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r34);
      const alert_r32 = restoredCtx.$implicit;
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r33.openAlertClient(alert_r32));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "ion-icon", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "span", 53)(4, "span", 54)(5, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "span", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "div", 59)(14, "button", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_ul_20_li_1_Template_button_click_14_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r34);
      const alert_r32 = restoredCtx.$implicit;
      const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r35.openTaskPanelFromAlert(alert_r32, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](15, "ion-icon", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "button", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_ul_20_li_1_Template_button_click_16_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r34);
      const alert_r32 = restoredCtx.$implicit;
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r36.resolveAlert(alert_r32, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](17, "ion-icon", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const alert_r32 = ctx.$implicit;
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("aria-label", "Abrir la ficha de " + alert_r32.clientName);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("alert-icon--high", alert_r32.priority === "high");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("name", ctx_r31.alertIcon(alert_r32));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](alert_r32.clientName);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("priority-chip--high", alert_r32.priority === "high");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r31.priorityLabel(alert_r32.priority), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](alert_r32.reason);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r31.alertAge(alert_r32));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("aria-label", "Crear una tarea a partir de la alerta de " + alert_r32.clientName);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r31.isResolving(alert_r32));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("aria-label", "Marcar como resuelta la alerta de " + alert_r32.clientName);
  }
}
function DashboardPage_ul_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ul", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, DashboardPage_ul_20_li_1_Template, 18, 13, "li", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r5.visibleAlerts)("ngForTrackBy", ctx_r5.trackByAlertId);
  }
}
function DashboardPage_button_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_button_21_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r38);
      const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r37.showAllAlerts = true);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](" Ver ", ctx_r6.hiddenAlertsCount, " alerta", ctx_r6.hiddenAlertsCount === 1 ? "" : "s", " m\u00E1s ");
  }
}
function DashboardPage_div_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "div", 65)(2, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function DashboardPage_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "ion-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "No se pudieron cargar tus pendientes.");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_div_29_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r40);
      const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r39.loadTasks());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "Reintentar");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function DashboardPage_div_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "ion-icon", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "p", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Sin pendientes");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "Anota aqu\u00ED lo que tengas que hacer, o cr\u00E9alo directamente desde una alerta con el bot\u00F3n\u00A0+.");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function DashboardPage_ul_31_li_1_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const clientLabel_r45 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](clientLabel_r45);
  }
}
function DashboardPage_ul_31_li_1_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const dueLabel_r46 = ctx.ngIf;
    const task_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().$implicit;
    const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("task-due--overdue", ctx_r44.isTaskOverdue(task_r42));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](dueLabel_r46);
  }
}
function DashboardPage_ul_31_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "li", 69)(1, "button", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_ul_31_li_1_Template_button_click_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r49);
      const task_r42 = restoredCtx.$implicit;
      const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r48.completeTask(task_r42, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "ion-icon", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "button", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_ul_31_li_1_Template_button_click_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r49);
      const task_r42 = restoredCtx.$implicit;
      const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r50.openTaskClient(task_r42));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "span", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "span", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, DashboardPage_ul_31_li_1_span_7_Template, 2, 1, "span", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, DashboardPage_ul_31_li_1_span_8_Template, 2, 3, "span", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const task_r42 = ctx.$implicit;
    const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("aria-label", "Marcar como hecha: " + task_r42.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("task-main--plain", !task_r42.clientId);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !task_r42.clientId);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](task_r42.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r41.taskClientLabel(task_r42));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r41.taskDueLabel(task_r42));
  }
}
function DashboardPage_ul_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ul", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, DashboardPage_ul_31_li_1_Template, 9, 7, "li", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r10.tasks)("ngForTrackBy", ctx_r10.trackByTaskId);
  }
}
function DashboardPage_button_37_Template(rf, ctx) {
  if (rf & 1) {
    const _r52 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_button_37_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r52);
      const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r51.markAllNotificationsRead());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Marcar le\u00EDdas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function DashboardPage_div_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "div", 65)(2, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function DashboardPage_div_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r54 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "ion-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "No se pudo cargar tu actividad reciente.");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_div_39_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r54);
      const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r53.loadNotifications());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "Reintentar");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function DashboardPage_div_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "ion-icon", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Aqu\u00ED aparecer\u00E1 lo que hagan tus clientes: aceptar invitaciones, responder check-ins o actualizar sus preferencias.");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function DashboardPage_button_41_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "span", 86);
  }
}
function DashboardPage_button_41_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "(no le\u00EDda)");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function DashboardPage_button_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r59 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_button_41_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r59);
      const notification_r55 = restoredCtx.$implicit;
      const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r58.openNotification(notification_r55));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, DashboardPage_button_41_span_1_Template, 1, 0, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "ion-icon", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 82)(4, "span", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, DashboardPage_button_41_span_6_Template, 2, 0, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "span", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](9, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const notification_r55 = ctx.$implicit;
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("notification-card--unread", !notification_r55.read);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !notification_r55.read);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("name", ctx_r15.notificationIcon(notification_r55));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx_r15.notificationTitle(notification_r55), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !notification_r55.read);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](9, 7, notification_r55.createdAt, "d MMM, HH:mm"));
  }
}
function DashboardPage_section_42_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const payments_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](", ", payments_r60.overdueCount, " vencido", payments_r60.overdueCount === 1 ? "" : "s", "");
  }
}
function DashboardPage_section_42_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 94)(1, "span", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](5, "div", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "span", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const point_r64 = ctx.$implicit;
    const isLast_r65 = ctx.last;
    const payments_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().ngIf;
    const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", point_r64.totalAmount > 0 ? _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind4"](3, 6, point_r64.totalAmount, "EUR", "symbol", "1.0-0") : "", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵstyleProp"]("transform", "scaleY(" + ctx_r62.monthBarScale(point_r64, payments_r60.monthlySeries) + ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("payments-bar--current", isLast_r65);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r62.monthLabel(point_r64.month));
  }
}
function DashboardPage_section_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "section", 88)(1, "div", 89)(2, "h2", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Cobros");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "span", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](6, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, DashboardPage_section_42_ng_container_7_Template, 2, 2, "ng-container", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, DashboardPage_section_42_div_9_Template, 8, 11, "div", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const payments_r60 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("payments-pending--overdue", payments_r60.overdueCount > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind4"](6, 5, payments_r60.pendingAmount, "EUR", "symbol", "1.0-0"), " pendiente");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", payments_r60.overdueCount > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", payments_r60.monthlySeries);
  }
}
function DashboardPage_ng_template_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "section", 88)(1, "h2", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2, "Cobros");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "p", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](4, "No se pudo cargar la gr\u00E1fica de cobros.");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
}
function DashboardPage_div_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r68 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_div_45_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r68);
      const ctx_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r67.closeTaskPanel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function DashboardPage_div_46_p_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "p", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r69 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("Sobre ", ctx_r69.taskClientName, "");
  }
}
function DashboardPage_div_46_span_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Crear tarea");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function DashboardPage_div_46_ion_spinner_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "ion-spinner", 116);
  }
}
function DashboardPage_div_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r73 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "div", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "h2", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Nueva tarea");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, DashboardPage_div_46_p_4_Template, 2, 1, "p", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "label", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, "Qu\u00E9 hay que hacer");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "div", 106)(8, "input", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function DashboardPage_div_46_Template_input_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r73);
      const ctx_r72 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r72.taskTitle = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "label", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10, " Para cu\u00E1ndo ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "span", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, "(opcional)");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "div", 106)(14, "input", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function DashboardPage_div_46_Template_input_ngModelChange_14_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r73);
      const ctx_r74 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r74.taskDueDate = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "div", 111)(16, "button", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_div_46_Template_button_click_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r73);
      const ctx_r75 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r75.closeTaskPanel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](17, "Cancelar");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "button", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_div_46_Template_button_click_18_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r73);
      const ctx_r76 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r76.submitTask());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](19, DashboardPage_div_46_span_19_Template, 2, 0, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](20, DashboardPage_div_46_ion_spinner_20_Template, 1, 0, "ion-spinner", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r20.taskClientName);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx_r20.taskTitle);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx_r20.taskDueDate);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx_r20.canSubmitTask);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r20.isSavingTask);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r20.isSavingTask);
  }
}
const NOTIFICATION_ICONS = {
  invite_accepted: 'person-add-outline',
  intake_submitted_trainer: 'document-text-outline',
  checkin_responded: 'clipboard-outline',
  nutrition_preferences_updated: 'nutrition-outline'
};
// Un icono por TIPO de problema, no por prioridad: la prioridad ya se lee en
// el chip de al lado, y repetirla en el icono gastaría el único canal que
// distingue "peso" de "check-in" de un vistazo.
const ALERT_ICONS = {
  pending_review: 'document-text-outline',
  checkin_overdue: 'clipboard-outline',
  plan_ending_soon: 'hourglass-outline',
  stagnation: 'remove-outline',
  weight_change: 'trending-up-outline',
  measurement_change: 'resize-outline',
  low_adherence: 'pie-chart-outline',
  inactive_client: 'moon-outline'
};
const PRIORITY_LABELS = {
  high: 'Urgente',
  medium: 'Revisar',
  low: 'Menor'
};
// Título por defecto de la tarea que nace de cada alerta. El coach puede
// cambiarlo antes de guardar — esto solo evita empezar con un campo vacío
// cuando el siguiente paso es evidente por el tipo de problema.
const TASK_TITLE_BY_ALERT = {
  pending_review: 'Revisar cuestionario inicial',
  checkin_overdue: 'Recordar el check-in',
  plan_ending_soon: 'Renovar el plan de nutrición',
  stagnation: 'Revisar estrategia nutricional',
  weight_change: 'Revisar el cambio de peso',
  measurement_change: 'Revisar las medidas',
  low_adherence: 'Contactar para revisar adherencia',
  inactive_client: 'Contactar con el cliente'
};
const MONTH_LABELS = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
// Fase 1 Coach Pro — el dashboard deja de ser un panel de métricas para
// responder una sola pregunta: "¿dónde tengo que intervenir hoy?".
//
// Cambios de fondo respecto a la versión anterior:
//   - "Requiere tu atención" leía AttentionItem (3 señales recalculadas en
//     cada carga, sin prioridad ni estado). Ahora lee CoachAlert: 8 señales
//     ya evaluadas, con prioridad, motivo redactado y acciones reales
//     (resolver, crear tarea) — antes la única acción posible era navegar.
//   - Las 3 stat cards de arriba desaparecen como estructura de la página.
//     "Clientes activos" pasa a la línea de contexto del header (es contexto,
//     no una decisión), "Check-ins pendientes" era un recuento de algo que ya
//     está listado justo debajo, y "Cobros pendientes" se funde con su propia
//     gráfica al final. En su lugar, una barra de triaje que además FILTRA la
//     lista — cuenta y sirve para algo, no solo cuenta.
//   - "Mis pendientes" es nuevo: hasta ahora el profesional no tenía dónde
//     anotar lo que debía hacer, y las alertas no tenían adónde desembocar.
class DashboardPage {
  constructor(trainerClientsApi, trainerPaymentsApi, trainerNotificationsApi, coachAlertsApi, coachTasksApi, ionicUtilService, router) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "trainerClientsApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "trainerPaymentsApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "trainerNotificationsApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "coachAlertsApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "coachTasksApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "activeClientsCount", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "paymentsSummary", null);
    // --- Alertas ---
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "alertsState", 'loading');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "alerts", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "alertFilter", 'all');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "showAllAlerts", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isEvaluating", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "resolvingAlertIds", new Set());
    // --- Mis pendientes ---
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "tasksState", 'loading');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "tasks", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "showTaskPanel", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "taskTitle", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "taskDueDate", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "taskClientId", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "taskSourceAlertId", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "taskClientName", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isSavingTask", false);
    // --- Actividad reciente ---
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "notificationsState", 'loading');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "notifications", []);
    this.trainerClientsApi = trainerClientsApi;
    this.trainerPaymentsApi = trainerPaymentsApi;
    this.trainerNotificationsApi = trainerNotificationsApi;
    this.coachAlertsApi = coachAlertsApi;
    this.coachTasksApi = coachTasksApi;
    this.ionicUtilService = ionicUtilService;
    this.router = router;
  }
  ngOnInit() {
    this.loadAll();
  }
  ionViewWillEnter() {
    this.loadAll();
  }
  // Cada sección carga por su cuenta: un fallo en cobros no debe dejar sin
  // alertas al profesional, ni al revés. Mismo criterio que ya seguía esta
  // página para notificaciones.
  loadAll() {
    this.loadAlerts();
    this.loadTasks();
    this.loadNotifications();
    this.loadClientsCount();
    this.loadPaymentsSummary();
  }
  // --- Alertas ---
  loadAlerts() {
    this.alertsState = 'loading';
    this.coachAlertsApi.getMine('open').subscribe({
      next: alerts => {
        this.alerts = alerts;
        this.alertsState = 'loaded';
      },
      error: () => {
        this.alertsState = 'error';
      }
    });
  }
  get highPriorityCount() {
    return this.alerts.filter(alert => alert.priority === 'high').length;
  }
  get filteredAlerts() {
    if (this.alertFilter === 'high') {
      return this.alerts.filter(alert => alert.priority === 'high');
    }
    return this.alerts;
  }
  get visibleAlerts() {
    const filtered = this.filteredAlerts;
    return this.showAllAlerts ? filtered : filtered.slice(0, DashboardPage.ALERT_PREVIEW_COUNT);
  }
  get hiddenAlertsCount() {
    return Math.max(0, this.filteredAlerts.length - DashboardPage.ALERT_PREVIEW_COUNT);
  }
  setAlertFilter(filter) {
    this.alertFilter = filter;
    this.showAllAlerts = false;
  }
  alertIcon(alert) {
    return ALERT_ICONS[alert.type] || 'alert-circle-outline';
  }
  priorityLabel(priority) {
    return PRIORITY_LABELS[priority] || 'Revisar';
  }
  // "Detectado hoy" / "hace 3 días" — la antigüedad importa: un
  // estancamiento de hace tres semanas pesa más que el de esta mañana, y una
  // fecha absoluta obliga a calcularlo mentalmente.
  alertAge(alert) {
    const days = Math.floor((Date.now() - new Date(alert.createdAt).getTime()) / 86400000);
    if (days <= 0) return 'Detectado hoy';
    if (days === 1) return 'Detectado ayer';
    return `Detectado hace ${days} días`;
  }
  isResolving(alert) {
    return this.resolvingAlertIds.has(alert._id);
  }
  openAlertClient(alert) {
    void this.router.navigate(['/tabs/clients', alert.clientId]);
  }
  // Se retira de la lista al instante y se ofrece deshacer en el propio
  // toast: en un panel de triaje, esperar la respuesta del servidor para
  // cada fila hace el trabajo lento, y confirmar cada resolución con un
  // diálogo lo hace insoportable. Si la llamada falla, la fila vuelve.
  resolveAlert(alert, event) {
    event.stopPropagation();
    if (this.resolvingAlertIds.has(alert._id)) return;
    const index = this.alerts.findIndex(a => a._id === alert._id);
    if (index === -1) return;
    this.resolvingAlertIds.add(alert._id);
    this.alerts = this.alerts.filter(a => a._id !== alert._id);
    this.coachAlertsApi.setStatus(alert._id, 'resolved').subscribe({
      next: () => {
        this.resolvingAlertIds.delete(alert._id);
        void this.presentUndoToast(alert, index);
      },
      error: error => {
        this.resolvingAlertIds.delete(alert._id);
        this.restoreAlert(alert, index);
        void this.ionicUtilService.showErrorToast(error, 'No se pudo resolver la alerta');
      }
    });
  }
  presentUndoToast(alert, index) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.ionicUtilService.showToast({
        message: `Resuelta: ${alert.clientName}`,
        duration: 5000,
        position: 'bottom',
        cssClass: 'toast-safe-area',
        buttons: [{
          text: 'Deshacer',
          handler: () => {
            _this.coachAlertsApi.setStatus(alert._id, 'open').subscribe({
              next: () => _this.restoreAlert(alert, index),
              error: error => void _this.ionicUtilService.showErrorToast(error, 'No se pudo reabrir la alerta')
            });
          }
        }]
      });
    })();
  }
  // Devuelve la fila a su sitio original, no al final — el orden lo decide la
  // prioridad, y reinsertar al final la haría "saltar" al recargar.
  restoreAlert(alert, index) {
    const next = [...this.alerts];
    next.splice(Math.min(index, next.length), 0, alert);
    this.alerts = next;
  }
  // El ciclo natural del evaluador es de 24 h. Sin esta acción, un
  // profesional que acaba de dar de alta a sus clientes vería un panel vacío
  // hasta la mañana siguiente y concluiría que no funciona.
  evaluateNow() {
    if (this.isEvaluating) return;
    this.isEvaluating = true;
    this.coachAlertsApi.evaluateNow().subscribe({
      next: () => {
        this.isEvaluating = false;
        this.loadAlerts();
      },
      error: error => {
        this.isEvaluating = false;
        void this.ionicUtilService.showErrorToast(error, 'No se pudo revisar a tus clientes');
      }
    });
  }
  trackByAlertId(_index, alert) {
    return alert._id;
  }
  // --- Mis pendientes ---
  loadTasks() {
    this.tasksState = 'loading';
    this.coachTasksApi.getMine('pending').subscribe({
      next: tasks => {
        this.tasks = tasks;
        this.tasksState = 'loaded';
      },
      error: () => {
        this.tasksState = 'error';
      }
    });
  }
  openTaskPanel() {
    this.taskTitle = '';
    this.taskDueDate = '';
    this.taskClientId = null;
    this.taskClientName = null;
    this.taskSourceAlertId = null;
    this.showTaskPanel = true;
  }
  // Desde una alerta: el título viene propuesto por tipo y la tarea queda
  // atada al cliente y a la alerta de origen, para que la ficha pueda
  // enseñar más tarde de dónde salió.
  openTaskPanelFromAlert(alert, event) {
    event.stopPropagation();
    this.taskTitle = TASK_TITLE_BY_ALERT[alert.type] || 'Revisar cliente';
    this.taskDueDate = '';
    this.taskClientId = alert.clientId;
    this.taskClientName = alert.clientName;
    this.taskSourceAlertId = alert._id;
    this.showTaskPanel = true;
  }
  closeTaskPanel() {
    this.showTaskPanel = false;
  }
  get canSubmitTask() {
    return !!this.taskTitle.trim() && !this.isSavingTask;
  }
  submitTask() {
    if (!this.canSubmitTask) return;
    this.isSavingTask = true;
    this.coachTasksApi.create({
      title: this.taskTitle.trim(),
      dueDate: this.taskDueDate || null,
      clientId: this.taskClientId,
      sourceAlertId: this.taskSourceAlertId
    }).subscribe({
      next: () => {
        this.isSavingTask = false;
        this.showTaskPanel = false;
        this.loadTasks();
      },
      error: error => {
        this.isSavingTask = false;
        void this.ionicUtilService.showErrorToast(error, 'No se pudo crear la tarea');
      }
    });
  }
  // Marcar hecha retira la tarea de la lista de pendientes al instante,
  // mismo criterio optimista que resolver una alerta.
  completeTask(task, event) {
    event.stopPropagation();
    const index = this.tasks.findIndex(t => t._id === task._id);
    this.tasks = this.tasks.filter(t => t._id !== task._id);
    this.coachTasksApi.update(task._id, {
      status: 'done'
    }).subscribe({
      error: error => {
        const next = [...this.tasks];
        next.splice(Math.min(index, next.length), 0, task);
        this.tasks = next;
        void this.ionicUtilService.showErrorToast(error, 'No se pudo completar la tarea');
      }
    });
  }
  openTaskClient(task) {
    if (!task.clientId) return;
    void this.router.navigate(['/tabs/clients', task.clientId._id]);
  }
  taskClientLabel(task) {
    if (!task.clientId) return null;
    return `${task.clientId.name} ${task.clientId.lastname}`.trim();
  }
  // "Vence hoy" / "Vencida" / "Vence el 4 sep" — el estado de vencimiento es
  // lo que decide si una tarea sube en la lista, así que se nombra en vez de
  // dejar una fecha suelta que hay que comparar mentalmente con hoy.
  taskDueLabel(task) {
    if (!task.dueDate) return null;
    const today = new Date().toISOString().slice(0, 10);
    if (task.dueDate < today) return 'Vencida';
    if (task.dueDate === today) return 'Vence hoy';
    return `Vence el ${this.formatShortDate(task.dueDate)}`;
  }
  isTaskOverdue(task) {
    if (!task.dueDate) return false;
    return task.dueDate <= new Date().toISOString().slice(0, 10);
  }
  formatShortDate(isoDate) {
    const [, month, day] = isoDate.split('-');
    return `${Number(day)} ${MONTH_LABELS[Number(month) - 1] || ''}`.trim();
  }
  trackByTaskId(_index, task) {
    return task._id;
  }
  // --- Actividad reciente ---
  loadNotifications() {
    this.notificationsState = 'loading';
    this.trainerNotificationsApi.getMine().subscribe({
      next: notifications => {
        this.notifications = notifications.slice(0, 6);
        this.notificationsState = 'loaded';
      },
      error: () => {
        this.notificationsState = 'error';
      }
    });
  }
  notificationIcon(notification) {
    return NOTIFICATION_ICONS[notification.type] || 'notifications-outline';
  }
  notificationClientName(notification) {
    if (!notification.client) return 'Un cliente';
    return `${notification.client.name} ${notification.client.lastname}`.trim();
  }
  notificationTitle(notification) {
    const name = this.notificationClientName(notification);
    switch (notification.type) {
      case 'invite_accepted':
        return `${name} aceptó tu invitación`;
      case 'intake_submitted_trainer':
        return `${name} completó su cuestionario inicial`;
      case 'checkin_responded':
        return `${name} respondió un check-in`;
      case 'nutrition_preferences_updated':
        return `${name} actualizó sus preferencias nutricionales`;
      default:
        return 'Nueva actividad';
    }
  }
  openNotification(notification) {
    if (!notification.read) {
      notification.read = true;
      this.trainerNotificationsApi.markRead(notification._id).subscribe();
    }
    switch (notification.type) {
      case 'checkin_responded':
        // A la ficha del cliente, subpestaña Check-ins. Antes iba a la
        // bandeja agregada, que se retiró por redundante con esta.
        if (notification.client) {
          void this.router.navigate(['/tabs/clients', notification.client._id], {
            queryParams: {
              tab: 'checkins'
            }
          });
        } else {
          void this.router.navigate(['/tabs/clients']);
        }
        break;
      case 'nutrition_preferences_updated':
      case 'intake_submitted_trainer':
      case 'invite_accepted':
        if (notification.client) {
          void this.router.navigate(['/tabs/clients', notification.client._id]);
        } else {
          void this.router.navigate(['/tabs/clients']);
        }
        break;
      default:
        break;
    }
  }
  markAllNotificationsRead() {
    this.trainerNotificationsApi.markAllRead().subscribe(() => {
      this.notifications = this.notifications.map(n => ({
        ...n,
        read: true
      }));
    });
  }
  get hasUnreadNotifications() {
    return this.notifications.some(n => !n.read);
  }
  trackByNotificationId(_index, notification) {
    return notification._id;
  }
  // --- Contexto (clientes activos, cobros) ---
  loadClientsCount() {
    this.trainerClientsApi.getMyClients().subscribe({
      next: clients => {
        this.activeClientsCount = clients.length;
      },
      error: () => {
        this.activeClientsCount = null;
      }
    });
  }
  loadPaymentsSummary() {
    this.trainerPaymentsApi.getOverview().subscribe({
      next: summary => {
        this.paymentsSummary = summary;
      },
      error: () => {
        this.paymentsSummary = null;
      }
    });
  }
  monthLabel(month) {
    const monthIndex = Number(month.slice(5, 7)) - 1;
    return MONTH_LABELS[monthIndex] || month;
  }
  // Fracción 0..1 para transform: scaleY() — nunca height (layout thrash).
  // Barra a 0 = sin cobros ese mes (visible como línea base, no ausente) —
  // normalizado contra el máximo de la propia serie, no una escala fija.
  monthBarScale(point, series) {
    const max = Math.max(...series.map(p => p.totalAmount), 1);
    const pct = Math.max(point.totalAmount / max * 100, point.totalAmount > 0 ? 6 : 2);
    return Number((pct / 100).toFixed(4));
  }
}
_DashboardPage = DashboardPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(DashboardPage, "ALERT_PREVIEW_COUNT", 12);
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(DashboardPage, "\u0275fac", function DashboardPage_Factory(t) {
  return new (t || _DashboardPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_clients_services_trainer_clients_api_service__WEBPACK_IMPORTED_MODULE_2__.TrainerClientsApiService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_trainer_payments_api_service__WEBPACK_IMPORTED_MODULE_3__.TrainerPaymentsApiService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_trainer_notifications_api_service__WEBPACK_IMPORTED_MODULE_4__.TrainerNotificationsApiService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_coach_alerts_api_service__WEBPACK_IMPORTED_MODULE_5__.CoachAlertsApiService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_services_coach_tasks_api_service__WEBPACK_IMPORTED_MODULE_6__.CoachTasksApiService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_7__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(DashboardPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: _DashboardPage,
  selectors: [["app-dashboard"]],
  decls: 47,
  vars: 23,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["aria-label", "Abrir men\u00FA de navegaci\u00F3n", 1, "tf-page-header__back-button"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "dashboard-content"], ["class", "triage-bar", 4, "ngIf"], ["id", "alerts-section", 1, "panel-card", "alerts-panel"], [1, "panel-card-header"], [1, "panel-card-title"], ["type", "button", 1, "link-button", 3, "disabled", "click"], ["class", "alerts-skeleton", 4, "ngIf"], ["class", "section-state", 4, "ngIf"], ["class", "section-state section-state--calm", 4, "ngIf"], ["class", "alert-list", 4, "ngIf"], ["type", "button", "class", "show-more-button", 3, "click", 4, "ngIf"], [1, "panel-card", "tasks-panel"], ["type", "button", 1, "link-button", 3, "click"], ["class", "task-list", 4, "ngIf"], [1, "dashboard-grid"], [1, "panel-card", "activity-panel"], ["type", "button", "class", "link-button", 3, "click", 4, "ngIf"], ["class", "notification-card", 3, "notification-card--unread", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "panel-card payments-chart-card", 4, "ngIf", "ngIfElse"], ["paymentsChartFallback", ""], ["class", "panel-backdrop", 3, "click", 4, "ngIf"], ["class", "panel-sheet", "role", "dialog", "aria-modal", "true", "aria-labelledby", "task-sheet-title", 4, "ngIf"], [1, "triage-bar"], ["role", "group", "aria-label", "Filtrar alertas por prioridad", 1, "triage-filters"], ["type", "button", 1, "triage-chip", 3, "click"], ["name", "layers-outline", "aria-hidden", "true", 1, "triage-chip__icon"], [1, "triage-count"], ["type", "button", 1, "triage-chip", "triage-chip--urgent", 3, "disabled", "click"], ["name", "alert-circle-outline", "aria-hidden", "true", 1, "triage-chip__icon"], ["class", "triage-context", 4, "ngIf"], [1, "triage-context"], [1, "alerts-skeleton"], [1, "skeleton-block", "alert-row-skeleton"], [1, "section-state"], ["name", "cloud-offline-outline", "aria-hidden", "true"], ["type", "button", 1, "retry-button", 3, "click"], [1, "section-state", "section-state--calm"], ["name", "checkmark-circle-outline", "aria-hidden", "true"], [1, "section-state__title"], ["type", "button", 1, "retry-button", 3, "disabled", "click"], ["name", "funnel-outline", "aria-hidden", "true"], [1, "alert-list"], ["class", "alert-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "alert-row"], ["type", "button", 1, "alert-main", 3, "click"], ["aria-hidden", "true", 1, "alert-icon", 3, "name"], [1, "alert-body"], [1, "alert-head"], [1, "alert-client"], [1, "priority-chip"], [1, "alert-reason"], [1, "alert-age"], [1, "alert-actions"], ["type", "button", "title", "Crear tarea", 1, "alert-action", 3, "click"], ["name", "add-outline", "aria-hidden", "true"], ["type", "button", "title", "Marcar resuelta", 1, "alert-action", "alert-action--resolve", 3, "disabled", "click"], ["name", "checkmark-outline", "aria-hidden", "true"], ["type", "button", 1, "show-more-button", 3, "click"], [1, "skeleton-block", "task-row-skeleton"], ["name", "checkbox-outline", "aria-hidden", "true"], [1, "task-list"], ["class", "task-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "task-row"], ["type", "button", 1, "task-check", 3, "click"], ["type", "button", 1, "task-main", 3, "disabled", "click"], [1, "task-title"], [1, "task-meta"], ["class", "task-client", 4, "ngIf"], ["class", "task-due", 3, "task-due--overdue", 4, "ngIf"], [1, "task-client"], [1, "task-due"], ["name", "pulse-outline", "aria-hidden", "true"], [1, "notification-card", 3, "click"], ["class", "notification-dot", "aria-hidden", "true", 4, "ngIf"], ["aria-hidden", "true", 1, "notification-icon", 3, "name"], [1, "notification-info"], [1, "notification-title"], ["class", "sr-only", 4, "ngIf"], [1, "notification-subtitle"], ["aria-hidden", "true", 1, "notification-dot"], [1, "sr-only"], [1, "panel-card", "payments-chart-card"], [1, "panel-card-header", "payments-header"], [1, "payments-pending"], [4, "ngIf"], [1, "payments-chart"], ["class", "payments-bar-col", 4, "ngFor", "ngForOf"], [1, "payments-bar-col"], [1, "payments-bar-value"], [1, "payments-bar-track"], [1, "payments-bar"], [1, "payments-bar-label"], [1, "empty-hint"], [1, "panel-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "task-sheet-title", 1, "panel-sheet"], ["aria-hidden", "true", 1, "panel-handle"], ["id", "task-sheet-title", 1, "panel-title"], ["class", "panel-subtitle", 4, "ngIf"], ["for", "task-title", 1, "field-label"], [1, "input-wrapper"], ["id", "task-title", "type", "text", "maxlength", "200", "placeholder", "Revisar estrategia nutricional", 1, "input-field", 3, "ngModel", "ngModelChange"], ["for", "task-due", 1, "field-label"], [1, "field-optional"], ["id", "task-due", "type", "date", 1, "input-field", 3, "ngModel", "ngModelChange"], [1, "panel-actions"], ["type", "button", 1, "cancel-button", 3, "click"], ["type", "button", 1, "submit-button", 3, "disabled", "click"], ["name", "dots", 4, "ngIf"], [1, "panel-subtitle"], ["name", "dots"]],
  template: function DashboardPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "ion-menu-button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 5)(6, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "Hoy");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "ion-content", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, DashboardPage_div_9_Template, 13, 10, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "section", 9)(11, "div", 10)(12, "h2", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](13, "Requiere acci\u00F3n");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "button", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_Template_button_click_14_listener() {
        return ctx.evaluateNow();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](16, DashboardPage_div_16_Template, 4, 0, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](17, DashboardPage_div_17_Template, 6, 0, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](18, DashboardPage_div_18_Template, 8, 2, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](19, DashboardPage_div_19_Template, 6, 1, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](20, DashboardPage_ul_20_Template, 2, 2, "ul", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](21, DashboardPage_button_21_Template, 2, 2, "button", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](22, "section", 18)(23, "div", 10)(24, "h2", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](25, "Mis pendientes");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](26, "button", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function DashboardPage_Template_button_click_26_listener() {
        return ctx.openTaskPanel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](27, "A\u00F1adir");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](28, DashboardPage_div_28_Template, 3, 0, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](29, DashboardPage_div_29_Template, 6, 0, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](30, DashboardPage_div_30_Template, 6, 0, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](31, DashboardPage_ul_31_Template, 2, 2, "ul", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](32, "div", 21)(33, "section", 22)(34, "div", 10)(35, "h2", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](36, "Actividad reciente");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](37, DashboardPage_button_37_Template, 2, 0, "button", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](38, DashboardPage_div_38_Template, 3, 0, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](39, DashboardPage_div_39_Template, 6, 0, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](40, DashboardPage_div_40_Template, 4, 0, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](41, DashboardPage_button_41_Template, 10, 10, "button", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](42, DashboardPage_section_42_Template, 10, 10, "section", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](43, DashboardPage_ng_template_43_Template, 5, 0, "ng-template", null, 26, _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](45, DashboardPage_div_45_Template, 1, 0, "div", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](46, DashboardPage_div_46_Template, 21, 6, "div", 28);
    }
    if (rf & 2) {
      const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵreference"](44);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.alertsState === "loaded" && ctx.alerts.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.isEvaluating);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ctx.isEvaluating ? "Revisando\u2026" : "Revisar ahora", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.alertsState === "loading");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.alertsState === "error");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.alertsState === "loaded" && !ctx.alerts.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.alertsState === "loaded" && ctx.alerts.length && !ctx.filteredAlerts.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.alertsState === "loaded" && ctx.filteredAlerts.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.showAllAlerts && ctx.hiddenAlertsCount > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.tasksState === "loading");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.tasksState === "error");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.tasksState === "loaded" && !ctx.tasks.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.tasksState === "loaded" && ctx.tasks.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.hasUnreadNotifications);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.notificationsState === "loading");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.notificationsState === "error");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.notificationsState === "loaded" && !ctx.notifications.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx.notifications)("ngForTrackBy", ctx.trackByNotificationId);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.paymentsSummary)("ngIfElse", _r17);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.showTaskPanel);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.showTaskPanel);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonMenuButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_12__.IonSpinner, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CurrencyPipe, _angular_common__WEBPACK_IMPORTED_MODULE_10__.DatePipe],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-backdrop-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-sheet-in {\n  from {\n    transform: translateY(16px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-side-panel-in {\n  from {\n    transform: translateX(24px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n.dashboard-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 20px;\n  --padding-end: 20px;\n  --padding-top: 12px;\n  --padding-bottom: 32px;\n}\n\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n\n.triage-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--tf-space-4);\n  flex-wrap: wrap;\n  margin-bottom: var(--tf-space-4);\n}\n\n.triage-filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--tf-space-2);\n}\n\n.triage-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-4);\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n  color: var(--tf-text-secondary);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  cursor: pointer;\n  transition: background var(--tf-duration-fast) var(--tf-ease-out), border-color var(--tf-duration-fast) var(--tf-ease-out), color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.triage-chip[_ngcontent-%COMP%]:hover:not(:disabled) {\n  border-color: var(--tf-border-strong);\n}\n.triage-chip[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.triage-chip[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.triage-chip--active[_ngcontent-%COMP%] {\n  background: var(--tf-surface-4);\n  border-color: var(--tf-border-strong);\n  color: var(--tf-text);\n}\n.triage-chip--urgent.triage-chip--active[_ngcontent-%COMP%] {\n  background: var(--tf-danger-soft);\n  border-color: var(--tf-danger-border);\n  color: var(--tf-danger-text);\n}\n\n.triage-chip__icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 17px;\n  color: var(--tf-text-faint);\n}\n\n.triage-chip--active[_ngcontent-%COMP%]   .triage-chip__icon[_ngcontent-%COMP%], .triage-chip--urgent[_ngcontent-%COMP%]   .triage-chip__icon[_ngcontent-%COMP%] {\n  color: inherit;\n}\n\n.triage-count[_ngcontent-%COMP%] {\n  font-variant-numeric: tabular-nums;\n  font-weight: 700;\n  color: var(--tf-text);\n}\n.triage-chip--urgent.triage-chip--active[_ngcontent-%COMP%]   .triage-count[_ngcontent-%COMP%] {\n  color: inherit;\n}\n\n.triage-context[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-muted);\n  font-variant-numeric: tabular-nums;\n}\n\n.panel-card[_ngcontent-%COMP%] {\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n  overflow: hidden;\n}\n\n.alerts-panel[_ngcontent-%COMP%], .tasks-panel[_ngcontent-%COMP%] {\n  margin-bottom: var(--tf-space-5);\n}\n\n.panel-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--tf-space-3);\n  padding: var(--tf-space-4) var(--tf-space-5);\n  border-bottom: 1px solid var(--tf-border);\n}\n\n.panel-card-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-md);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.link-button[_ngcontent-%COMP%] {\n  position: relative;\n  background: transparent;\n  border: none;\n  padding: 0;\n  color: var(--tf-accent-text);\n  font-family: inherit;\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n  cursor: pointer;\n}\n.link-button[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  min-width: var(--tf-touch-min);\n  width: 100%;\n  height: var(--tf-touch-min);\n  transform: translate(-50%, -50%);\n}\n.link-button[_ngcontent-%COMP%]:disabled {\n  color: var(--tf-text-muted);\n  cursor: default;\n}\n.link-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 3px;\n  border-radius: var(--tf-radius-sm);\n}\n\n.alerts-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n\n.skeleton-block[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n  border-radius: var(--tf-radius-lg);\n}\n.skeleton-block[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n\n.alert-row-skeleton[_ngcontent-%COMP%] {\n  height: 92px;\n  border-radius: 0;\n}\n\n.task-row-skeleton[_ngcontent-%COMP%] {\n  height: 64px;\n  border-radius: 0;\n}\n\n.section-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: var(--tf-space-2);\n  padding: var(--tf-space-8) var(--tf-space-6);\n  color: var(--tf-text-muted);\n}\n.section-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: var(--tf-text-faint);\n  margin-bottom: var(--tf-space-1);\n}\n.section-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-sm);\n  line-height: var(--tf-line-height-base);\n  max-width: 48ch;\n}\n.section-state[_ngcontent-%COMP%]   .retry-button[_ngcontent-%COMP%] {\n  margin-top: var(--tf-space-3);\n}\n\n.section-state__title[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-base);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.section-state--calm[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--tf-success);\n}\n\n.retry-button[_ngcontent-%COMP%] {\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-5);\n  background: var(--tf-surface-5);\n  color: var(--tf-text);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-sm);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform var(--tf-duration-fast) var(--tf-ease-out);\n}\n.retry-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.96);\n}\n.retry-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n  transform: none;\n}\n.retry-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.alert-list[_ngcontent-%COMP%], .task-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n.alert-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  gap: var(--tf-space-2);\n  padding-right: var(--tf-space-4);\n  border-bottom: 1px solid var(--tf-border-subtle);\n  transition: background var(--tf-duration-fast) var(--tf-ease-out);\n}\n.alert-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.alert-row[_ngcontent-%COMP%]:hover {\n  background: var(--tf-surface-2);\n}\n\n.alert-main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  align-items: flex-start;\n  gap: var(--tf-space-3);\n  padding: var(--tf-space-4) var(--tf-space-2) var(--tf-space-4) var(--tf-space-5);\n  border: none;\n  background: transparent;\n  color: inherit;\n  font-family: inherit;\n  text-align: left;\n  cursor: pointer;\n}\n.alert-main[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: -2px;\n  border-radius: var(--tf-radius-sm);\n}\n\n.alert-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  margin-top: 2px;\n  font-size: 18px;\n  color: var(--tf-text-secondary);\n}\n.alert-icon--high[_ngcontent-%COMP%] {\n  color: var(--tf-danger);\n}\n\n.alert-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-1);\n}\n\n.alert-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n  flex-wrap: wrap;\n}\n\n.alert-client[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-base);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.priority-chip[_ngcontent-%COMP%] {\n  padding: 2px var(--tf-space-2);\n  border-radius: var(--tf-radius-pill);\n  background: var(--tf-surface-4);\n  color: var(--tf-text-secondary);\n  font-size: var(--tf-font-size-xs);\n  font-weight: 700;\n  letter-spacing: 0.01em;\n  white-space: nowrap;\n}\n.priority-chip--high[_ngcontent-%COMP%] {\n  background: var(--tf-danger-soft);\n  color: var(--tf-danger-text);\n}\n\n.alert-reason[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-sm);\n  line-height: var(--tf-line-height-base);\n  color: var(--tf-text-secondary);\n  max-width: 68ch;\n}\n\n.alert-age[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-text-muted);\n}\n\n.alert-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n  flex-shrink: 0;\n}\n\n.alert-action[_ngcontent-%COMP%] {\n  --background: var(--tf-surface-3);\n  --background-activated: var(--tf-surface-4);\n  --background-hover: var(--tf-surface-4);\n  --background-focused: var(--tf-surface-4);\n  --color: var(--tf-text-secondary);\n  --border-radius: var(--tf-radius-sm);\n  --padding-start: 0;\n  --padding-end: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  background: var(--tf-surface-3);\n  color: var(--tf-text-secondary);\n  border: none;\n  border-radius: var(--tf-radius-sm);\n  width: var(--tf-touch-min);\n  height: var(--tf-touch-min);\n  min-width: var(--tf-touch-min);\n  min-height: var(--tf-touch-min);\n  margin: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: background var(--tf-duration-fast) var(--tf-ease-out), color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.alert-action[_ngcontent-%COMP%]:active {\n  background: var(--tf-surface-4);\n}\n.alert-action[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.alert-action[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.alert-action[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.alert-action--resolve[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--tf-success-soft);\n  color: var(--tf-success);\n}\n\n.show-more-button[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: var(--tf-touch-min);\n  border: none;\n  border-top: 1px solid var(--tf-border);\n  background: transparent;\n  color: var(--tf-accent-text);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  cursor: pointer;\n  transition: background var(--tf-duration-fast) var(--tf-ease-out);\n}\n.show-more-button[_ngcontent-%COMP%]:hover {\n  background: var(--tf-surface-2);\n}\n.show-more-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: -2px;\n}\n\n.task-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-3);\n  padding: 0 var(--tf-space-4) 0 var(--tf-space-5);\n  border-bottom: 1px solid var(--tf-border-subtle);\n}\n.task-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.task-row[_ngcontent-%COMP%]:hover {\n  background: var(--tf-surface-2);\n}\n\n.task-check[_ngcontent-%COMP%] {\n  position: relative;\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  min-width: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  border: 1.5px solid var(--tf-border-strongest);\n  border-radius: 50%;\n  background: transparent;\n  color: transparent;\n  cursor: pointer;\n  transition: border-color var(--tf-duration-fast) var(--tf-ease-out), background var(--tf-duration-fast) var(--tf-ease-out), color var(--tf-duration-fast) var(--tf-ease-out), transform var(--tf-duration-fast) var(--tf-ease-out);\n}\n.task-check[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.task-check[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: var(--tf-touch-min);\n  height: var(--tf-touch-min);\n  transform: translate(-50%, -50%);\n}\n.task-check[_ngcontent-%COMP%]:hover, .task-check[_ngcontent-%COMP%]:focus-visible {\n  border-color: var(--tf-success);\n  background: var(--tf-success-soft);\n  color: var(--tf-success);\n}\n.task-check[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.task-check[_ngcontent-%COMP%]:active {\n  transform: scale(0.92);\n}\n@media (prefers-reduced-motion: reduce) {\n  .task-check[_ngcontent-%COMP%] {\n    transition: none;\n  }\n  .task-check[_ngcontent-%COMP%]:active {\n    transform: none;\n  }\n}\n\n.task-main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: var(--tf-space-3) 0;\n  min-height: 56px;\n  justify-content: center;\n  border: none;\n  background: transparent;\n  color: inherit;\n  font-family: inherit;\n  text-align: left;\n  cursor: pointer;\n}\n.task-main[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: -2px;\n  border-radius: var(--tf-radius-sm);\n}\n.task-main--plain[_ngcontent-%COMP%] {\n  cursor: default;\n}\n\n.task-title[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-base);\n  color: var(--tf-text);\n}\n\n.task-meta[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n  flex-wrap: wrap;\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-text-muted);\n}\n\n.task-client[_ngcontent-%COMP%] {\n  color: var(--tf-text-secondary);\n}\n\n.task-due--overdue[_ngcontent-%COMP%] {\n  color: var(--tf-danger-text);\n  font-weight: 600;\n}\n\n.dashboard-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: var(--tf-space-5);\n  align-items: start;\n}\n@media (max-width: 900px) {\n  .dashboard-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n.notification-card[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-3);\n  min-height: var(--tf-touch-min);\n  padding: var(--tf-space-3) var(--tf-space-5);\n  border: none;\n  border-bottom: 1px solid var(--tf-border-subtle);\n  background: transparent;\n  color: inherit;\n  font-family: inherit;\n  text-align: left;\n  cursor: pointer;\n  transition: background var(--tf-duration-fast) var(--tf-ease-out);\n}\n.notification-card[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.notification-card[_ngcontent-%COMP%]:hover {\n  background: var(--tf-surface-2);\n}\n.notification-card[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: -2px;\n}\n\n.notification-dot[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 10px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--tf-accent);\n}\n\n.notification-card--unread[_ngcontent-%COMP%] {\n  padding-left: calc(var(--tf-space-5) + 10px);\n}\n\n.notification-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 17px;\n  color: var(--tf-text-secondary);\n}\n\n.notification-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.notification-title[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-secondary);\n}\n\n.notification-subtitle[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-text-muted);\n}\n\n.payments-chart-card[_ngcontent-%COMP%] {\n  padding-bottom: var(--tf-space-5);\n}\n\n.payments-header[_ngcontent-%COMP%] {\n  flex-wrap: wrap;\n}\n\n.payments-pending[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n  color: var(--tf-text-muted);\n  font-variant-numeric: tabular-nums;\n}\n.payments-pending--overdue[_ngcontent-%COMP%] {\n  color: var(--tf-danger-text);\n}\n\n.payments-chart[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-end;\n  gap: var(--tf-space-2);\n  height: 140px;\n  padding: var(--tf-space-5) var(--tf-space-5) 0;\n}\n\n.payments-bar-col[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  height: 100%;\n  min-width: 0;\n}\n\n.payments-bar-value[_ngcontent-%COMP%] {\n  display: block;\n  height: 14px;\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--tf-text-muted);\n  margin-bottom: var(--tf-space-1);\n  white-space: nowrap;\n  font-variant-numeric: tabular-nums;\n}\n\n.payments-bar-track[_ngcontent-%COMP%] {\n  flex: 1;\n  width: 100%;\n  min-height: 0;\n}\n\n.payments-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  border-radius: 3px 3px 0 0;\n  background: var(--tf-surface-5);\n  transform-origin: bottom;\n  transition: transform var(--tf-duration-base) var(--tf-ease-out);\n}\n@media (prefers-reduced-motion: reduce) {\n  .payments-bar[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n\n.payments-bar--current[_ngcontent-%COMP%] {\n  background: var(--tf-accent);\n}\n\n.payments-bar-label[_ngcontent-%COMP%] {\n  margin-top: var(--tf-space-2);\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-text-muted);\n  text-transform: capitalize;\n}\n\n.empty-hint[_ngcontent-%COMP%] {\n  margin: 0;\n  padding: var(--tf-space-2) var(--tf-space-5) var(--tf-space-4);\n  color: var(--tf-text-muted);\n  font-size: var(--tf-font-size-sm);\n  line-height: var(--tf-line-height-base);\n}\n\n.panel-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: var(--tf-overlay);\n  z-index: var(--tf-z-modal-backdrop, 400);\n  animation: _ngcontent-%COMP%_tf-backdrop-in 200ms var(--tf-ease-out) both;\n}\n@media (prefers-reduced-motion: reduce) {\n  .panel-backdrop[_ngcontent-%COMP%] {\n    animation: none;\n    opacity: 1;\n  }\n}\n\n.panel-sheet[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: var(--tf-z-modal, 500);\n  background: var(--tf-surface-1);\n  border-top: 1px solid var(--tf-border-strong);\n  border-radius: 20px 20px 0 0;\n  padding: 10px 16px 24px;\n  max-height: 80vh;\n  overflow-y: auto;\n  animation: _ngcontent-%COMP%_tf-sheet-in 260ms var(--tf-ease-out) both;\n}\n@media (prefers-reduced-motion: reduce) {\n  .panel-sheet[_ngcontent-%COMP%] {\n    animation: none;\n    opacity: 1;\n    transform: none;\n  }\n}\n\n.panel-handle[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 4px;\n  border-radius: 2px;\n  background: var(--tf-border-strongest);\n  margin: 0 auto 14px;\n}\n\n.panel-title[_ngcontent-%COMP%] {\n  margin: 0 0 var(--tf-space-1);\n  font-size: var(--tf-font-size-lg);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.panel-subtitle[_ngcontent-%COMP%] {\n  margin: 0 0 var(--tf-space-4);\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-muted);\n}\n\n.field-label[_ngcontent-%COMP%] {\n  display: block;\n  margin: var(--tf-space-4) 0 var(--tf-space-2);\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n  color: var(--tf-text-secondary);\n}\n\n.field-optional[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--tf-text-muted);\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n  height: var(--tf-touch-min);\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.input-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n  font-size: var(--tf-font-size-base);\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.panel-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--tf-space-3);\n  margin-top: var(--tf-space-6);\n}\n\n.cancel-button[_ngcontent-%COMP%] {\n  flex: 1;\n  height: var(--tf-touch-min);\n  background: var(--tf-surface-3);\n  color: var(--tf-text-secondary);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n  font-family: inherit;\n  font-size: var(--tf-font-size-base);\n  font-weight: 600;\n  cursor: pointer;\n}\n.cancel-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: var(--tf-radius-lg);\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  flex: 1;\n  height: var(--tf-touch-min);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: var(--tf-font-size-base);\n}\n.submit-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n\n@media (max-width: 560px) {\n  .alert-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: stretch;\n    gap: 0;\n    padding-right: 0;\n  }\n  .alert-main[_ngcontent-%COMP%] {\n    padding-right: var(--tf-space-5);\n  }\n  .alert-actions[_ngcontent-%COMP%] {\n    justify-content: flex-end;\n    gap: var(--tf-space-2);\n    padding: 0 var(--tf-space-5) var(--tf-space-4);\n  }\n  .triage-bar[_ngcontent-%COMP%] {\n    justify-content: flex-start;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5wYWdlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX3BhbmVsLXNoZWV0LnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX2J1dHRvbnMuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9faW5wdXRzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJBO0VBQ0U7SUFDRSwyQkFBQTtFQ3hCRjtBQUNGO0FDb0RBO0VBQ0U7SUFDRSxVQUFBO0VEbERGO0VDb0RBO0lBQ0UsVUFBQTtFRGxERjtBQUNGO0FDcURBO0VBQ0U7SUFDRSwyQkFBQTtJQUNBLFVBQUE7RURuREY7RUNxREE7SUFDRSx3QkFBQTtJQUNBLFVBQUE7RURuREY7QUFDRjtBQ3FIQTtFQUNFO0lBQ0UsMkJBQUE7SUFDQSxVQUFBO0VEbkhGO0VDcUhBO0lBQ0Usd0JBQUE7SUFDQSxVQUFBO0VEbkhGO0FBQ0Y7QUEzQkE7RUFDRSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0FBNkJGOztBQXhCQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7QUEyQkY7O0FBakJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7RUFDQSxnQ0FBQTtBQW9CRjs7QUFqQkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7QUFvQkY7O0FBakJBO0VBQ0Usb0JBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsK0JBQUE7RUFDQSw0QkFBQTtFQUNBLCtCQUFBO0VBQ0Esa0NBQUE7RUFJQSxrQ0FBQTtFQUNBLCtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLDRLQUFBO0FBaUJGO0FBYkU7RUFDRSxxQ0FBQTtBQWVKO0FBWkU7RUFDRSxtQ0FBQTtFQUNBLG1CQUFBO0FBY0o7QUFYRTtFQUNFLGFBQUE7RUFDQSxlQUFBO0FBYUo7QUFWRTtFQUNFLCtCQUFBO0VBQ0EscUNBQUE7RUFDQSxxQkFBQTtBQVlKO0FBUEU7RUFDRSxpQ0FBQTtFQUNBLHFDQUFBO0VBQ0EsNEJBQUE7QUFTSjs7QUFGQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsMkJBQUE7QUFLRjs7QUFGQTs7RUFFRSxjQUFBO0FBS0Y7O0FBRkE7RUFFRSxrQ0FBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUFJRjtBQUZFO0VBQ0UsY0FBQTtBQUlKOztBQUFBO0VBQ0UsaUNBQUE7RUFDQSwyQkFBQTtFQUNBLGtDQUFBO0FBR0Y7O0FBR0E7RUFDRSwrQkFBQTtFQUVBLGtDQUFBO0VBQ0Esa0NBQUE7RUFDQSxnQkFBQTtBQURGOztBQUlBOztFQUVFLGdDQUFBO0FBREY7O0FBSUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLHNCQUFBO0VBQ0EsNENBQUE7RUFDQSx5Q0FBQTtBQURGOztBQUlBO0VBQ0UsU0FBQTtFQUNBLGlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtBQURGOztBQUlBO0VBQ0Usa0JBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsNEJBQUE7RUFDQSxvQkFBQTtFQUNBLGlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBREY7QUFRRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsOEJBQUE7RUFDQSxXQUFBO0VBQ0EsMkJBQUE7RUFDQSxnQ0FBQTtBQU5KO0FBU0U7RUFDRSwyQkFBQTtFQUNBLGVBQUE7QUFQSjtBQVVFO0VBQ0UsbUNBQUE7RUFDQSxtQkFBQTtFQUNBLGtDQUFBO0FBUko7O0FBZUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0FBWkY7O0FBZUE7RUQ1TUUsa0JBQUE7RUFDQSxnQkFBQTtFQUNBLCtCQUFBO0VDNE1BLGtDQUFBO0FBVkY7QURoTUU7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsNEJBQUE7RUFDQSwrRUFBQTtFQUNBLG1DQUFBO0FDa01KO0FEL0xFO0VBQ0U7SUFDRSxlQUFBO0VDaU1KO0FBQ0Y7O0FBRUE7RUFDRSxZQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLFlBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsNENBQUE7RUFDQSwyQkFBQTtBQUNGO0FBQ0U7RUFDRSxlQUFBO0VBQ0EsMkJBQUE7RUFDQSxnQ0FBQTtBQUNKO0FBRUU7RUFDRSxTQUFBO0VBQ0EsaUNBQUE7RUFDQSx1Q0FBQTtFQUNBLGVBQUE7QUFBSjtBQUdFO0VBQ0UsNkJBQUE7QUFESjs7QUFLQTtFQUNFLG1DQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtBQUZGOztBQU1BO0VBQ0Usd0JBQUE7QUFIRjs7QUFNQTtFQUNFLCtCQUFBO0VBQ0EsNEJBQUE7RUFDQSwrQkFBQTtFQUNBLHFCQUFBO0VBQ0EseUNBQUE7RUFDQSxrQ0FBQTtFQUNBLG9CQUFBO0VBQ0EsaUNBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxnRUFBQTtBQUhGO0FBS0U7RUFDRSxzQkFBQTtBQUhKO0FBTUU7RUFDRSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7QUFKSjtBQU9FO0VBQ0UsbUNBQUE7RUFDQSxtQkFBQTtBQUxKOztBQVlBOztFQUVFLGdCQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7QUFURjs7QUFZQTtFQUNFLGFBQUE7RUFDQSxvQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnREFBQTtFQUNBLGlFQUFBO0FBVEY7QUFXRTtFQUNFLG1CQUFBO0FBVEo7QUFZRTtFQUNFLCtCQUFBO0FBVko7O0FBaUJBO0VBQ0UsT0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxzQkFBQTtFQUNBLGdGQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0EsY0FBQTtFQUNBLG9CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBZEY7QUFnQkU7RUFDRSxtQ0FBQTtFQUNBLG9CQUFBO0VBQ0Esa0NBQUE7QUFkSjs7QUFrQkE7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7RUFDQSwrQkFBQTtBQWZGO0FBaUJFO0VBQ0UsdUJBQUE7QUFmSjs7QUFtQkE7RUFDRSxPQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHNCQUFBO0FBaEJGOztBQW1CQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtBQWhCRjs7QUFtQkE7RUFDRSxtQ0FBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUFoQkY7O0FBcUJBO0VBQ0UsOEJBQUE7RUFDQSxvQ0FBQTtFQUNBLCtCQUFBO0VBQ0EsK0JBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtBQWxCRjtBQXNCRTtFQUNFLGlDQUFBO0VBQ0EsNEJBQUE7QUFwQko7O0FBMEJBO0VBQ0UsaUNBQUE7RUFDQSx1Q0FBQTtFQUNBLCtCQUFBO0VBQ0EsZUFBQTtBQXZCRjs7QUEwQkE7RUFDRSxpQ0FBQTtFQUNBLDJCQUFBO0FBdkJGOztBQTBCQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtBQXZCRjs7QUEwQkE7RUVyWEUsaUNBQUE7RUFDQSwyQ0FBQTtFQUNBLHVDQUFBO0VBQ0EseUNBQUE7RUFDQSxpQ0FBQTtFQUNBLG9DQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFFQSwrQkFBQTtFQUNBLCtCQUFBO0VBQ0EsWUFBQTtFQUNBLGtDRndXNkM7RUV2VzdDLDBCRnVXd0I7RUV0V3hCLDJCRnNXd0I7RUVyV3hCLDhCRnFXd0I7RUVwV3hCLCtCRm9Xd0I7RUVuV3hCLFNBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxtSEFBQTtBRjhWRjtBRTNWRTtFQUNFLCtCQUFBO0FGNlZKO0FFMVZFO0VBQ0UsbUNBQUE7RUFDQSxtQkFBQTtBRjRWSjtBRXpWRTtFQUNFLGVGaVZnRTtBQVVwRTtBQVJFO0VBQ0UsYUFBQTtFQUNBLGVBQUE7QUFVSjtBQVBFO0VBQ0Usa0NBQUE7RUFDQSx3QkFBQTtBQVNKOztBQUxBO0VBQ0UsV0FBQTtFQUNBLCtCQUFBO0VBQ0EsWUFBQTtFQUNBLHNDQUFBO0VBQ0EsdUJBQUE7RUFDQSw0QkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUNBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpRUFBQTtBQVFGO0FBTkU7RUFDRSwrQkFBQTtBQVFKO0FBTEU7RUFDRSxtQ0FBQTtFQUNBLG9CQUFBO0FBT0o7O0FBQUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGdEQUFBO0VBQ0EsZ0RBQUE7QUFHRjtBQURFO0VBQ0UsbUJBQUE7QUFHSjtBQUFFO0VBQ0UsK0JBQUE7QUFFSjs7QUFJQTtFQUNFLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLDhDQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGtPQUFBO0FBREY7QUFNRTtFQUNFLGVBQUE7QUFKSjtBQVVFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSwwQkFBQTtFQUNBLDJCQUFBO0VBQ0EsZ0NBQUE7QUFSSjtBQVdFO0VBRUUsK0JBQUE7RUFDQSxrQ0FBQTtFQUNBLHdCQUFBO0FBVko7QUFhRTtFQUNFLG1DQUFBO0VBQ0EsbUJBQUE7QUFYSjtBQWNFO0VBQ0Usc0JBQUE7QUFaSjtBQWVFO0VBckRGO0lBc0RJLGdCQUFBO0VBWkY7RUFjRTtJQUNFLGVBQUE7RUFaSjtBQUNGOztBQWdCQTtFQUNFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtFQUNBLDRCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLGNBQUE7RUFDQSxvQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQWJGO0FBZUU7RUFDRSxtQ0FBQTtFQUNBLG9CQUFBO0VBQ0Esa0NBQUE7QUFiSjtBQWtCRTtFQUNFLGVBQUE7QUFoQko7O0FBb0JBO0VBQ0UsbUNBQUE7RUFDQSxxQkFBQTtBQWpCRjs7QUFvQkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7RUFDQSxpQ0FBQTtFQUNBLDJCQUFBO0FBakJGOztBQW9CQTtFQUNFLCtCQUFBO0FBakJGOztBQW9CQTtFQUNFLDRCQUFBO0VBQ0EsZ0JBQUE7QUFqQkY7O0FBdUJBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtBQXBCRjtBQXNCRTtFQU5GO0lBT0ksMEJBQUE7RUFuQkY7QUFDRjs7QUFzQkE7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLCtCQUFBO0VBQ0EsNENBQUE7RUFDQSxZQUFBO0VBQ0EsZ0RBQUE7RUFDQSx1QkFBQTtFQUNBLGNBQUE7RUFDQSxvQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGlFQUFBO0FBbkJGO0FBcUJFO0VBQ0UsbUJBQUE7QUFuQko7QUFzQkU7RUFDRSwrQkFBQTtBQXBCSjtBQXVCRTtFQUNFLG1DQUFBO0VBQ0Esb0JBQUE7QUFyQko7O0FBeUJBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsUUFBQTtFQUNBLDJCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLDRCQUFBO0FBdEJGOztBQXlCQTtFQUNFLDRDQUFBO0FBdEJGOztBQXlCQTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsK0JBQUE7QUF0QkY7O0FBeUJBO0VBQ0UsT0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0FBdEJGOztBQXlCQTtFQUNFLGlDQUFBO0VBQ0EsK0JBQUE7QUF0QkY7O0FBeUJBO0VBQ0UsaUNBQUE7RUFDQSwyQkFBQTtBQXRCRjs7QUF5QkE7RUFDRSxpQ0FBQTtBQXRCRjs7QUF5QkE7RUFDRSxlQUFBO0FBdEJGOztBQXlCQTtFQUNFLGlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSwyQkFBQTtFQUNBLGtDQUFBO0FBdEJGO0FBd0JFO0VBQ0UsNEJBQUE7QUF0Qko7O0FBMEJBO0VBQ0UsYUFBQTtFQUNBLHFCQUFBO0VBQ0Esc0JBQUE7RUFDQSxhQUFBO0VBQ0EsOENBQUE7QUF2QkY7O0FBMEJBO0VBQ0UsT0FBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7QUF2QkY7O0FBNkJBO0VBQ0UsY0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSwyQkFBQTtFQUNBLGdDQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQ0FBQTtBQTFCRjs7QUE2QkE7RUFDRSxPQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7QUExQkY7O0FBZ0NBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSwwQkFBQTtFQUNBLCtCQUFBO0VBQ0Esd0JBQUE7RUFDQSxnRUFBQTtBQTdCRjtBQStCRTtFQVJGO0lBU0ksZ0JBQUE7RUE1QkY7QUFDRjs7QUErQkE7RUFDRSw0QkFBQTtBQTVCRjs7QUErQkE7RUFDRSw2QkFBQTtFQUNBLGlDQUFBO0VBQ0EsMkJBQUE7RUFDQSwwQkFBQTtBQTVCRjs7QUErQkE7RUFDRSxTQUFBO0VBQ0EsOERBQUE7RUFDQSwyQkFBQTtFQUNBLGlDQUFBO0VBQ0EsdUNBQUE7QUE1QkY7O0FBa0NBO0VDeHZCRSxlQUFBO0VBQ0EsUUFBQTtFQUNBLDZCQUFBO0VBQ0Esd0NBQUE7RUFPQSx1REFBQTtBRG90QkY7QUNsdEJFO0VENHVCRjtJQzN1QkksZUFBQTtJQUNBLFVBQUE7RURxdEJGO0FBQ0Y7O0FBd0JBO0VDenVCRSxlQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0EsK0JBQUE7RUFDQSwrQkFBQTtFQUNBLDZDQUFBO0VBQ0EsNEJBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvREFBQTtBRHF0QkY7QUNqdEJFO0VEMHRCRjtJQ3p0QkksZUFBQTtJQUNBLFVBQUE7SUFDQSxlQUFBO0VEb3RCRjtBQUNGOztBQU1BO0VDdHRCRSxXQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0Esc0NBQUE7RUFDQSxtQkFBQTtBRG90QkY7O0FBRUE7RUFDRSw2QkFBQTtFQUNBLGlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtBQUNGOztBQUVBO0VBQ0UsNkJBQUE7RUFDQSxpQ0FBQTtFQUNBLDJCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxjQUFBO0VBQ0EsNkNBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsMkJBQUE7QUFDRjs7QUFFQTtFRy94QkUsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLCtCSDZ4QjBCO0VHNXhCMUIseUNBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpREFBQTtFSDB4QkEsMkJBQUE7QUFRRjtBR2h5QkU7RUFDRSw4QkFBQTtBSGt5Qko7O0FBUkE7RUdoeEJFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0Esb0JBQUE7RUFDQSxZQUFBO0VIMndCQSxtQ0FBQTtBQWtCRjtBRzN4QkU7RUFDRSwyQkFBQTtBSDZ4Qko7O0FBbEJBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsNkJBQUE7QUFxQkY7O0FBbEJBO0VBQ0UsT0FBQTtFQUNBLDJCQUFBO0VBQ0EsK0JBQUE7RUFDQSwrQkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0NBQUE7RUFDQSxvQkFBQTtFQUNBLG1DQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBcUJGO0FBbkJFO0VBQ0UsbUNBQUE7RUFDQSxtQkFBQTtBQXFCSjs7QUFqQkE7RUU3ekJFLFlBQUE7RUFDQSxrQ0Y2ekI0QjtFRTV6QjVCLHFDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxnRkFBQTtFRjB6QkEsT0FBQTtFQUNBLDJCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQ0FBQTtBQXlCRjtBRXQxQkU7RUFDRSxzQkFBQTtBRncxQko7QUVyMUJFO0VBQ0UsYUFBQTtFQUNBLGVBQUE7QUZ1MUJKO0FFcDFCRTtFQUNFLGlDQUFBO0VBQ0EsbUJBQUE7QUZzMUJKOztBQTNCQTtFQUNFO0lBQ0Usc0JBQUE7SUFDQSxvQkFBQTtJQUNBLE1BQUE7SUFDQSxnQkFBQTtFQThCRjtFQTNCQTtJQUNFLGdDQUFBO0VBNkJGO0VBMUJBO0lBQ0UseUJBQUE7SUFDQSxzQkFBQTtJQUNBLDhDQUFBO0VBNEJGO0VBekJBO0lBQ0UsMkJBQUE7RUEyQkY7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIFNrZWxldG9uIGRlIGNhcmdhIGNvbiBiYXJyaWRvIGRlIHNoaW1tZXIgw6LCgMKUIG1pc21vIGJsb3F1ZSByZXBldGlkbyBsaXRlcmFsbWVudGVcbi8vIGVuIH4xMCBww4PCoWdpbmFzIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuXG4vLyBDYWRhIHDDg8KhZ2luYSBhcGxpY2EgZWwgbWl4aW4gc29icmUgc3UgcHJvcGlvIHNlbGVjdG9yIHkgYcODwrFhZGUgZW5jaW1hIHNvbG8gbG9cbi8vIHF1ZSB2YXLDg8KtYSAoYm9yZGVyLXJhZGl1cywgaGVpZ2h0LCB3aWR0aCwgdmFyaWFudGVzIGNvbiBub21icmUpLlxuQG1peGluIHRmLXNrZWxldG9uLXNoaW1tZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG5cbiAgJjo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldDogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgdHJhbnNwYXJlbnQsIHZhcigtLXRmLXNoaW1tZXIpLCB0cmFuc3BhcmVudCk7XG4gICAgYW5pbWF0aW9uOiB0Zi1zaGltbWVyIDEuNHMgaW5maW5pdGU7XG4gIH1cblxuICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xuICAgICY6OmFmdGVyIHtcbiAgICAgIGFuaW1hdGlvbjogbm9uZTtcbiAgICB9XG4gIH1cbn1cblxuQGtleWZyYW1lcyB0Zi1zaGltbWVyIHtcbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xuICB9XG59XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi90aGVtZS9za2VsZXRvbic7XG5AaW1wb3J0ICcuLi8uLi8uLi90aGVtZS9idXR0b25zJztcbkBpbXBvcnQgJy4uLy4uLy4uL3RoZW1lL3BhbmVsLXNoZWV0JztcbkBpbXBvcnQgJy4uLy4uLy4uL3RoZW1lL2lucHV0cyc7XG5cbi5kYXNoYm9hcmQtY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtYmcpO1xuICAtLXBhZGRpbmctc3RhcnQ6IDIwcHg7XG4gIC0tcGFkZGluZy1lbmQ6IDIwcHg7XG4gIC0tcGFkZGluZy10b3A6IDEycHg7XG4gIC0tcGFkZGluZy1ib3R0b206IDMycHg7XG59XG5cbi8vIFRleHRvIHNvbG8gcGFyYSBsZWN0b3JlcyBkZSBwYW50YWxsYSAoZXN0YWRvIFwibm8gbGXDg8KtZGFcIiBkZSBub3RpZmljYWNpb25lcyxcbi8vIGhveSDDg8K6bmljYW1lbnRlIHZpc3VhbCB2w4PCrWEgcHVudG8gKyBpbmRlbnQpLlxuLnNyLW9ubHkge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAxcHg7XG4gIGhlaWdodDogMXB4O1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IC0xcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGNsaXA6IHJlY3QoMCwgMCwgMCwgMCk7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIGJvcmRlcjogMDtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBCYXJyYSBkZSB0cmlhamVcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gU3VzdGl0dXllIGFsIGdyaWQgZGUgMyBzdGF0IGNhcmRzLiBMb3MgbsODwrptZXJvcyBzaWd1ZW4gYWjDg8KtLCBwZXJvIGFob3JhIGNhZGFcbi8vIHVubyBlcyB1biBmaWx0cm8gZGUgbGEgbGlzdGEgZGUgYWJham8gZW4gdmV6IGRlIHVuYSB0YXJqZXRhIHF1ZSBzb2xvIHNlXG4vLyBtaXJhLiBcIkNsaWVudGVzIGFjdGl2b3NcIiBxdWVkYSBhIGxhIGRlcmVjaGEgY29tbyBjb250ZXh0byB0aXBvZ3LDg8KhZmljbyDDosKAwpRcbi8vIGRhdG8gZGUgZm9uZG8sIG5vIHVuYSBkZWNpc2nDg8KzbiBxdWUgdG9tYXIuXG4udHJpYWdlLWJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS00KTtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBtYXJnaW4tYm90dG9tOiB2YXIoLS10Zi1zcGFjZS00KTtcbn1cblxuLnRyaWFnZS1maWx0ZXJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbn1cblxuLnRyaWFnZS1jaGlwIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIG1pbi1oZWlnaHQ6IHZhcigtLXRmLXRvdWNoLW1pbik7XG4gIHBhZGRpbmc6IDAgdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG4gIC8vIEN1YWRyYWRvIGRlIGVzcXVpbmFzIHJlZG9uZGVhZGFzLCBpZ3VhbCBxdWUgbG9zIGJvdG9uZXMgZGUgaWNvbm8gZGVsXG4gIC8vIHNpc3RlbWEgKHRmLWljb24tYnV0dG9uLCAxMnB4KTogbGEgYXBwIG5vIG1lemNsYSBjw4PCoXBzdWxhcyB5IGN1YWRyYWRvc1xuICAvLyBlbiBsYSBtaXNtYSBiYXJyYS5cbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLWxnKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICBib3JkZXItY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpLFxuICAgIGNvbG9yIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG5cbiAgJjpkaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogMC40NTtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gIH1cblxuICAmLS1hY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIH1cblxuICAvLyBFbCBjaGlwIGRlIHVyZ2VudGVzIHNlIHRpw4PCsWUgc29sbyBjdWFuZG8gRVNUw4PCgSBhY3Rpdm86IGVuIHJlcG9zbyBjb21waXRlXG4gIC8vIGNvbiBsYXMgYWxlcnRhcyByZWFsZXMgZGUgbGEgbGlzdGEgc2kgdmEgc2llbXByZSBlbiByb2pvLlxuICAmLS11cmdlbnQudHJpYWdlLWNoaXAtLWFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtZGFuZ2VyLXNvZnQpO1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtZGFuZ2VyLWJvcmRlcik7XG4gICAgY29sb3I6IHZhcigtLXRmLWRhbmdlci10ZXh0KTtcbiAgfVxufVxuXG4vLyBFbCBpY29ubywgdW4gcHVudG8gcG9yIGRlYmFqbyBkZWwgdGV4dG86IGF5dWRhIGEgZGlzdGluZ3VpciBsb3MgZG9zXG4vLyBmaWx0cm9zIGRlIHVuIHZpc3Rhem8sIHBlcm8gbGEgZXRpcXVldGEgZXMgbGEgcXVlIG1hbmRhLiBFbiBlbCBhY3Rpdm9cbi8vIGhlcmVkYSBlbCBjb2xvciBkZWwgY2hpcCBwYXJhIG5vIHF1ZWRhcnNlIGFwYWdhZG8uXG4udHJpYWdlLWNoaXBfX2ljb24ge1xuICBmbGV4LXNocmluazogMDtcbiAgZm9udC1zaXplOiAxN3B4O1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1mYWludCk7XG59XG5cbi50cmlhZ2UtY2hpcC0tYWN0aXZlIC50cmlhZ2UtY2hpcF9faWNvbixcbi50cmlhZ2UtY2hpcC0tdXJnZW50IC50cmlhZ2UtY2hpcF9faWNvbiB7XG4gIGNvbG9yOiBpbmhlcml0O1xufVxuXG4udHJpYWdlLWNvdW50IHtcbiAgLy8gVGFidWxhcmVzIHBhcmEgcXVlIGVsIGFuY2hvIGRlbCBjaGlwIG5vIGJhaWxlIGFsIHBhc2FyIGRlIDkgYSAxMC5cbiAgZm9udC12YXJpYW50LW51bWVyaWM6IHRhYnVsYXItbnVtcztcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuXG4gIC50cmlhZ2UtY2hpcC0tdXJnZW50LnRyaWFnZS1jaGlwLS1hY3RpdmUgJiB7XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gIH1cbn1cblxuLnRyaWFnZS1jb250ZXh0IHtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGZvbnQtdmFyaWFudC1udW1lcmljOiB0YWJ1bGFyLW51bXM7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQ29udGVuZWRvcmVzIGRlIHNlY2Npw4PCs25cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLnBhbmVsLWNhcmQge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTEpO1xuICAvLyBFbGV2YWNpw4PCs24gZGVjbGFyYWRhIFVOQSB2ZXo6IGJvcmRlLCBzaW4gc29tYnJhIGVuY2ltYS5cbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLWxnKTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLmFsZXJ0cy1wYW5lbCxcbi50YXNrcy1wYW5lbCB7XG4gIG1hcmdpbi1ib3R0b206IHZhcigtLXRmLXNwYWNlLTUpO1xufVxuXG4ucGFuZWwtY2FyZC1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTQpIHZhcigtLXRmLXNwYWNlLTUpO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbn1cblxuLnBhbmVsLWNhcmQtdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLW1kKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xufVxuXG4ubGluay1idXR0b24ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQtdGV4dCk7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS14cyk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcblxuICAvLyBVbiBlbmxhY2UgZGUgdGV4dG8gZW4gbGEgY2FiZWNlcmEgZGUgdW5hIHRhcmpldGEgbWlkZSBsbyBxdWUgbWlkZSBzdVxuICAvLyB0ZXh0bzogMTZweCBkZSBhbHRvLCBtdXkgcG9yIGRlYmFqbyBkZWwgbcODwq1uaW1vIHTDg8KhY3RpbCBkZSA0NHB4IHF1ZSBleGlnZVxuICAvLyBQUk9EVUNULm1kLiBEYXJsZSBwYWRkaW5nIGxvIGNvbnZlcnRpcsODwq1hIGVuIHVuIGJvdMODwrNuIHkgY29tcGV0aXLDg8KtYSBjb24gZWxcbiAgLy8gdMODwq10dWxvIGRlIGFsIGxhZG8sIGFzw4PCrSBxdWUgc2UgYW1wbMODwq1hIHNvbG8gZWwgw4PCgVJFQSBQVUxTQUJMRSDDosKAwpQgbWlzbWFcbiAgLy8gdMODwqljbmljYSBxdWUgbGEgY2FzaWxsYSBkZSB0YXJlYXMgeSBsb3Mgc2VnbWVudG9zIGRlbCBzZWxlY3RvciBkZSBzZW1hbmFzLlxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDUwJTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgbWluLXdpZHRoOiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAzcHg7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLXNtKTtcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEVzdGFkb3MgZGUgc2VjY2nDg8KzbiAoY2FyZ2EgLyBlcnJvciAvIHZhY8ODwq1vKVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4uYWxlcnRzLXNrZWxldG9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxcHg7XG59XG5cbi5za2VsZXRvbi1ibG9jayB7XG4gIEBpbmNsdWRlIHRmLXNrZWxldG9uLXNoaW1tZXI7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1sZyk7XG59XG5cbi8vIE1pc21hcyBhbHR1cmFzIHF1ZSBsYXMgZmlsYXMgcmVhbGVzOiBlbCBlc3F1ZWxldG8gYW50aWNpcGEgbGEgZm9ybWEgZmluYWwsXG4vLyBubyB1biBibG9xdWUgZ2Vuw4PCqXJpY28gcXVlIGx1ZWdvIHNhbHRhLlxuLmFsZXJ0LXJvdy1za2VsZXRvbiB7XG4gIGhlaWdodDogOTJweDtcbiAgYm9yZGVyLXJhZGl1czogMDtcbn1cblxuLnRhc2stcm93LXNrZWxldG9uIHtcbiAgaGVpZ2h0OiA2NHB4O1xuICBib3JkZXItcmFkaXVzOiAwO1xufVxuXG4uc2VjdGlvbi1zdGF0ZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtOCkgdmFyKC0tdGYtc3BhY2UtNik7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAyOHB4O1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LWZhaW50KTtcbiAgICBtYXJnaW4tYm90dG9tOiB2YXIoLS10Zi1zcGFjZS0xKTtcbiAgfVxuXG4gIHAge1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gICAgbGluZS1oZWlnaHQ6IHZhcigtLXRmLWxpbmUtaGVpZ2h0LWJhc2UpO1xuICAgIG1heC13aWR0aDogNDhjaDtcbiAgfVxuXG4gIC5yZXRyeS1idXR0b24ge1xuICAgIG1hcmdpbi10b3A6IHZhcigtLXRmLXNwYWNlLTMpO1xuICB9XG59XG5cbi5zZWN0aW9uLXN0YXRlX190aXRsZSB7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWJhc2UpO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG59XG5cbi8vIFwiVG9kbyBlbiBvcmRlblwiIG5vIGVzIHVuIGVycm9yOiBlbCBpY29ubyB2YSBlbiB2ZXJkZSwgbm8gZW4gZ3JpcyBhcGFnYWRvLlxuLnNlY3Rpb24tc3RhdGUtLWNhbG0gaW9uLWljb24ge1xuICBjb2xvcjogdmFyKC0tdGYtc3VjY2Vzcyk7XG59XG5cbi5yZXRyeS1idXR0b24ge1xuICBtaW4taGVpZ2h0OiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICBwYWRkaW5nOiAwIHZhcigtLXRmLXNwYWNlLTUpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTUpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtc20pO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45Nik7XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICAgIHRyYW5zZm9ybTogbm9uZTtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIExpc3RhIGRlIGFsZXJ0YXNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLmFsZXJ0LWxpc3QsXG4udGFzay1saXN0IHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xufVxuXG4uYWxlcnQtcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIHBhZGRpbmctcmlnaHQ6IHZhcigtLXRmLXNwYWNlLTQpO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN1YnRsZSk7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6bGFzdC1jaGlsZCB7XG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgfVxuXG4gICY6aG92ZXIge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMik7XG4gIH1cbn1cblxuLy8gVG9kYSBsYSBmaWxhIChpY29ubyArIHRleHRvcykgZXMgZWwgZGVzdGlubyBwcmluY2lwYWw6IGFicmlyIGxhIGZpY2hhIGRlbFxuLy8gY2xpZW50ZS4gTGFzIGRvcyBhY2Npb25lcyBzdWVsdGFzIHZpdmVuIGZ1ZXJhIGRlIGVzdGUgYm90w4PCs24gcGFyYSBubyBhbmlkYXJcbi8vIGNvbnRyb2xlcyBpbnRlcmFjdGl2b3MuXG4uYWxlcnQtbWFpbiB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTQpIHZhcigtLXRmLXNwYWNlLTIpIHZhcigtLXRmLXNwYWNlLTQpIHZhcigtLXRmLXNwYWNlLTUpO1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogaW5oZXJpdDtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAtMnB4O1xuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1zbSk7XG4gIH1cbn1cblxuLmFsZXJ0LWljb24ge1xuICBmbGV4LXNocmluazogMDtcbiAgbWFyZ2luLXRvcDogMnB4O1xuICBmb250LXNpemU6IDE4cHg7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG5cbiAgJi0taGlnaCB7XG4gICAgY29sb3I6IHZhcigtLXRmLWRhbmdlcik7XG4gIH1cbn1cblxuLmFsZXJ0LWJvZHkge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMSk7XG59XG5cbi5hbGVydC1oZWFkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4uYWxlcnQtY2xpZW50IHtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtYmFzZSk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbn1cblxuLy8gTGEgcHJpb3JpZGFkIHNlIG5vbWJyYSBjb24gUEFMQUJSQSwgbm8gc29sbyBjb24gY29sb3Igw6LCgMKUIGVsIGNvbG9yIHNvbG9cbi8vIHNlcsODwq1hIGluYWNjZXNpYmxlIHBhcmEgZGFsdG9uaXNtbyB5IGVuIGVzY2FsYSBkZSBncmlzZXMgKFBST0RVQ1QubWQgPiBBQSkuXG4ucHJpb3JpdHktY2hpcCB7XG4gIHBhZGRpbmc6IDJweCB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLXBpbGwpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS14cyk7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxldHRlci1zcGFjaW5nOiAwLjAxZW07XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cbiAgLy8gLS10Zi1kYW5nZXItdGV4dCwgbm8gLS10Zi1kYW5nZXI6IGVuIG5lZ3JpdGEgZGUgMTJweCBzb2JyZSBlbCBmb25kb1xuICAvLyB0ZcODwrFpZG8gZXN0byBlcyBURVhUTyAodW1icmFsIEFBIDQsNToxKSwgbm8gdW4gZWxlbWVudG8gZ3LDg8KhZmljby5cbiAgJi0taGlnaCB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtZGFuZ2VyLXNvZnQpO1xuICAgIGNvbG9yOiB2YXIoLS10Zi1kYW5nZXItdGV4dCk7XG4gIH1cbn1cblxuLy8gTGEgZnJhc2UgbGEgcmVkYWN0YSBlbCBiYWNrZW5kIGNvbiBsb3MgbsODwrptZXJvcyBkZW50cm87IGFxdcODwq0gc29sbyBzZSBsZSBkYVxuLy8gdW5hIG1lZGlkYSBsZWdpYmxlLlxuLmFsZXJ0LXJlYXNvbiB7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcbiAgbGluZS1oZWlnaHQ6IHZhcigtLXRmLWxpbmUtaGVpZ2h0LWJhc2UpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBtYXgtd2lkdGg6IDY4Y2g7XG59XG5cbi5hbGVydC1hZ2Uge1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS14cyk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbn1cblxuLmFsZXJ0LWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTIpO1xuICBmbGV4LXNocmluazogMDtcbn1cblxuLmFsZXJ0LWFjdGlvbiB7XG4gIEBpbmNsdWRlIHRmLWljb24tYnV0dG9uKHZhcigtLXRmLXRvdWNoLW1pbiksIHZhcigtLXRmLXJhZGl1cy1zbSksIDIwcHgpO1xuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNDU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG5cbiAgJi0tcmVzb2x2ZTpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VjY2Vzcy1zb2Z0KTtcbiAgICBjb2xvcjogdmFyKC0tdGYtc3VjY2Vzcyk7XG4gIH1cbn1cblxuLnNob3ctbW9yZS1idXR0b24ge1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQtdGV4dCk7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBNaXMgcGVuZGllbnRlc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4udGFzay1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTMpO1xuICBwYWRkaW5nOiAwIHZhcigtLXRmLXNwYWNlLTQpIDAgdmFyKC0tdGYtc3BhY2UtNSk7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3VidGxlKTtcblxuICAmOmxhc3QtY2hpbGQge1xuICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gIH1cblxuICAmOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICB9XG59XG5cbi8vIENhc2lsbGEgZGUgXCJoZWNob1wiOiBlbCBpY29ubyBzb2xvIHNlIHRpw4PCsWUgYWwgcGFzYXIgcG9yIGVuY2ltYSBvIGNvbiBmb2NvLFxuLy8gcGFyYSBxdWUgZW4gcmVwb3NvIHNlIGxlYSBjb21vIHVuYSBjYXNpbGxhIHZhY8ODwq1hIHkgbm8gY29tbyBhbGdvIHlhIG1hcmNhZG8uXG4udGFzay1jaGVjayB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZmxleC1zaHJpbms6IDA7XG4gIHdpZHRoOiAyNHB4O1xuICBoZWlnaHQ6IDI0cHg7XG4gIG1pbi13aWR0aDogMjRweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHBhZGRpbmc6IDA7XG4gIGJvcmRlcjogMS41cHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZ2VzdCk7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiB0cmFuc3BhcmVudDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpLFxuICAgIGJhY2tncm91bmQgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpLFxuICAgIGNvbG9yIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICB0cmFuc2Zvcm0gdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDE1cHg7XG4gIH1cblxuICAvLyBFbCBjw4PCrXJjdWxvIHBpbnRhZG8gbWlkZSAyNHB4LCBwZXJvIGVsIMODwqFyZWEgcHVsc2FibGUgbGxlZ2EgYWwgbcODwq1uaW1vXG4gIC8vIHTDg8KhY3RpbCBkZSA0NHB4IHbDg8KtYSBlc3RlIHBzZXVkby1lbGVtZW50byBjZW50cmFkbyDDosKAwpQgYWdyYW5kYXIgZWwgZGlidWpvXG4gIC8vIGhhcsODwq1hIHF1ZSB1bmEgbGlzdGEgZGUgcGVuZGllbnRlcyBwYXJlY2llcmEgdW4gZm9ybXVsYXJpby5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogNTAlO1xuICAgIHdpZHRoOiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICAgIGhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgfVxuXG4gICY6aG92ZXIsXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1zdWNjZXNzKTtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdWNjZXNzLXNvZnQpO1xuICAgIGNvbG9yOiB2YXIoLS10Zi1zdWNjZXNzKTtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTIpO1xuICB9XG5cbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICB0cmFuc2l0aW9uOiBub25lO1xuXG4gICAgJjphY3RpdmUge1xuICAgICAgdHJhbnNmb3JtOiBub25lO1xuICAgIH1cbiAgfVxufVxuXG4udGFzay1tYWluIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDJweDtcbiAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtMykgMDtcbiAgbWluLWhlaWdodDogNTZweDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLXNtKTtcbiAgfVxuXG4gIC8vIFNpbiBjbGllbnRlIGFsIHF1ZSBuYXZlZ2FyOiBkZWphIGRlIGNvbXBvcnRhcnNlIGNvbW8gdW4gZW5sYWNlIGVuIHZleiBkZVxuICAvLyBmaW5naXIgdW5hIGFjY2nDg8KzbiBxdWUgbm8gb2N1cnJlLlxuICAmLS1wbGFpbiB7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG59XG5cbi50YXNrLXRpdGxlIHtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtYmFzZSk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbn1cblxuLnRhc2stbWV0YSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUteHMpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG59XG5cbi50YXNrLWNsaWVudCB7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG59XG5cbi50YXNrLWR1ZS0tb3ZlcmR1ZSB7XG4gIGNvbG9yOiB2YXIoLS10Zi1kYW5nZXItdGV4dCk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQWN0aXZpZGFkIHJlY2llbnRlICsgY29icm9zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi5kYXNoYm9hcmQtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS01KTtcbiAgYWxpZ24taXRlbXM6IHN0YXJ0O1xuXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA5MDBweCkge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG59XG5cbi5ub3RpZmljYXRpb24tY2FyZCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIG1pbi1oZWlnaHQ6IHZhcigtLXRmLXRvdWNoLW1pbik7XG4gIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTMpIHZhcigtLXRmLXNwYWNlLTUpO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3VidGxlKTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmxhc3QtY2hpbGQge1xuICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gIH1cblxuICAmOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogLTJweDtcbiAgfVxufVxuXG4ubm90aWZpY2F0aW9uLWRvdCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMTBweDtcbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgd2lkdGg6IDZweDtcbiAgaGVpZ2h0OiA2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50KTtcbn1cblxuLm5vdGlmaWNhdGlvbi1jYXJkLS11bnJlYWQge1xuICBwYWRkaW5nLWxlZnQ6IGNhbGModmFyKC0tdGYtc3BhY2UtNSkgKyAxMHB4KTtcbn1cblxuLm5vdGlmaWNhdGlvbi1pY29uIHtcbiAgZmxleC1zaHJpbms6IDA7XG4gIGZvbnQtc2l6ZTogMTdweDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbn1cblxuLm5vdGlmaWNhdGlvbi1pbmZvIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDJweDtcbn1cblxuLm5vdGlmaWNhdGlvbi10aXRsZSB7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbn1cblxuLm5vdGlmaWNhdGlvbi1zdWJ0aXRsZSB7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xufVxuXG4ucGF5bWVudHMtY2hhcnQtY2FyZCB7XG4gIHBhZGRpbmctYm90dG9tOiB2YXIoLS10Zi1zcGFjZS01KTtcbn1cblxuLnBheW1lbnRzLWhlYWRlciB7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLnBheW1lbnRzLXBlbmRpbmcge1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS14cyk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgZm9udC12YXJpYW50LW51bWVyaWM6IHRhYnVsYXItbnVtcztcblxuICAmLS1vdmVyZHVlIHtcbiAgICBjb2xvcjogdmFyKC0tdGYtZGFuZ2VyLXRleHQpO1xuICB9XG59XG5cbi5wYXltZW50cy1jaGFydCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgaGVpZ2h0OiAxNDBweDtcbiAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtNSkgdmFyKC0tdGYtc3BhY2UtNSkgMDtcbn1cblxuLnBheW1lbnRzLWJhci1jb2wge1xuICBmbGV4OiAxO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1pbi13aWR0aDogMDtcbn1cblxuLy8gQWx0dXJhIHJlc2VydmFkYSBTSUVNUFJFIChpbmNsdXNvIHZhY8ODwq1hKSDDosKAwpQgc2kgbm8sIGxvcyBtZXNlcyBzaW4gY29icm9zXG4vLyAoc2luIGVzdGEgZXRpcXVldGEpIHRlbmRyw4PCrWFuIHVuIHRyYWNrIG3Dg8KhcyBhbHRvIHF1ZSBsb3MgZGVtw4PCoXMgeSBsYXMgYmFycmFzXG4vLyBubyBjb21wYXJ0aXLDg8KtYW4gbMODwq1uZWEgYmFzZS5cbi5wYXltZW50cy1iYXItdmFsdWUge1xuICBkaXNwbGF5OiBibG9jaztcbiAgaGVpZ2h0OiAxNHB4O1xuICBmb250LXNpemU6IDEwcHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgbWFyZ2luLWJvdHRvbTogdmFyKC0tdGYtc3BhY2UtMSk7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIGZvbnQtdmFyaWFudC1udW1lcmljOiB0YWJ1bGFyLW51bXM7XG59XG5cbi5wYXltZW50cy1iYXItdHJhY2sge1xuICBmbGV4OiAxO1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogMDtcbn1cblxuLy8gQWx0dXJhIHNpZW1wcmUgYWwgMTAwJSBkZWwgdHJhY2s7IGVsIHZhbG9yIHJlYWwgc2UgcmVwcmVzZW50YSBjb25cbi8vIHRyYW5zZm9ybTogc2NhbGVZKCkgZGVzZGUgYWJham8sIG51bmNhIGFuaW1hbmRvIGhlaWdodCAobGF5b3V0IHRocmFzaCDDosKAwpRcbi8vIHZlciBQUk9EVUNULm1kLCBcInZlbG9jaWRhZCBzb2JyZSBjZXJlbW9uaWFcIikuXG4ucGF5bWVudHMtYmFyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogM3B4IDNweCAwIDA7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNSk7XG4gIHRyYW5zZm9ybS1vcmlnaW46IGJvdHRvbTtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIHZhcigtLXRmLWR1cmF0aW9uLWJhc2UpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xuICAgIHRyYW5zaXRpb246IG5vbmU7XG4gIH1cbn1cblxuLnBheW1lbnRzLWJhci0tY3VycmVudCB7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLWFjY2VudCk7XG59XG5cbi5wYXltZW50cy1iYXItbGFiZWwge1xuICBtYXJnaW4tdG9wOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUteHMpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xufVxuXG4uZW1wdHktaGludCB7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtMikgdmFyKC0tdGYtc3BhY2UtNSkgdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBsaW5lLWhlaWdodDogdmFyKC0tdGYtbGluZS1oZWlnaHQtYmFzZSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUGFuZWwgZGUgbnVldmEgdGFyZWEgw6LCgMKUIG1pc21vcyBtaXhpbnMgcXVlIGVsIHJlc3RvIGRlIGJvdHRvbSBzaGVldHNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLnBhbmVsLWJhY2tkcm9wIHtcbiAgQGluY2x1ZGUgdGYtcGFuZWwtYmFja2Ryb3A7XG59XG5cbi5wYW5lbC1zaGVldCB7XG4gIEBpbmNsdWRlIHRmLXBhbmVsLXNoZWV0O1xufVxuXG4ucGFuZWwtaGFuZGxlIHtcbiAgQGluY2x1ZGUgdGYtcGFuZWwtaGFuZGxlO1xufVxuXG4ucGFuZWwtdGl0bGUge1xuICBtYXJnaW46IDAgMCB2YXIoLS10Zi1zcGFjZS0xKTtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtbGcpO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG59XG5cbi5wYW5lbC1zdWJ0aXRsZSB7XG4gIG1hcmdpbjogMCAwIHZhcigtLXRmLXNwYWNlLTQpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbn1cblxuLmZpZWxkLWxhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogdmFyKC0tdGYtc3BhY2UtNCkgMCB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUteHMpO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xufVxuXG4uZmllbGQtb3B0aW9uYWwge1xuICBmb250LXdlaWdodDogNDAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG59XG5cbi5pbnB1dC13cmFwcGVyIHtcbiAgQGluY2x1ZGUgdGYtaW5wdXQtd3JhcHBlcih2YXIoLS10Zi1zdXJmYWNlLTIpKTtcbiAgaGVpZ2h0OiB2YXIoLS10Zi10b3VjaC1taW4pO1xufVxuXG4uaW5wdXQtZmllbGQge1xuICBAaW5jbHVkZSB0Zi1pbnB1dC1maWVsZDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtYmFzZSk7XG59XG5cbi5wYW5lbC1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgbWFyZ2luLXRvcDogdmFyKC0tdGYtc3BhY2UtNik7XG59XG5cbi5jYW5jZWwtYnV0dG9uIHtcbiAgZmxleDogMTtcbiAgaGVpZ2h0OiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbGcpO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtYmFzZSk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLnN1Ym1pdC1idXR0b24ge1xuICBAaW5jbHVkZSB0Zi1ncmFkaWVudC1idXR0b24odmFyKC0tdGYtcmFkaXVzLWxnKSk7XG5cbiAgZmxleDogMTtcbiAgaGVpZ2h0OiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtYmFzZSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTcODwrN2aWxcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUG9yIGRlYmFqbyBkZSA1NjBweCBsYXMgZG9zIGFjY2lvbmVzIGRlIGxhIGFsZXJ0YSBiYWphbiBhIHN1IHByb3BpYSBsw4PCrW5lYTpcbi8vIG1hbnRlbmVybGFzIGEgbGEgZGVyZWNoYSBkZWphcsODwq1hIGxhIGZyYXNlIGRlbCBtb3Rpdm8gZW4gdW5hIGNvbHVtbmEgZGVcbi8vIH4xNCBjYXJhY3RlcmVzLCBpbGVnaWJsZSBqdXN0byBlbiBlbCB0ZXh0byBxdWUgZXhwbGljYSBlbCBwcm9ibGVtYS5cbkBtZWRpYSAobWF4LXdpZHRoOiA1NjBweCkge1xuICAuYWxlcnQtcm93IHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICAgIGdhcDogMDtcbiAgICBwYWRkaW5nLXJpZ2h0OiAwO1xuICB9XG5cbiAgLmFsZXJ0LW1haW4ge1xuICAgIHBhZGRpbmctcmlnaHQ6IHZhcigtLXRmLXNwYWNlLTUpO1xuICB9XG5cbiAgLmFsZXJ0LWFjdGlvbnMge1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gICAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgICBwYWRkaW5nOiAwIHZhcigtLXRmLXNwYWNlLTUpIHZhcigtLXRmLXNwYWNlLTQpO1xuICB9XG5cbiAgLnRyaWFnZS1iYXIge1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgfVxufVxuIiwiLy8gQm90dG9tIHNoZWV0IChiYWNrZHJvcCArIHBhbmVsIGRlc2xpemFudGUgZGVzZGUgYWJham8pIMOiwoDClCBkdXBsaWNhZG8gYnl0ZSBhXG4vLyBieXRlIGVuIDIgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPlxuLy8gRmFzZSAzKS4gVGFtYmnDg8KpbiBhcGFyZWNlIGZ1ZXJhIGRlIGVzdGEgYXBwIGVuIHBhY2thZ2VzL3NoYXJlZC1mZWF0dXJlc1xuLy8gKG9uYm9hcmRpbmcsIG15LWNoZWNraW5zLCBldGMuKSDDosKAwpQgZnVlcmEgZGUgYWxjYW5jZSBhcXXDg8KtIHBvcnF1ZSBlc2EgY2FwYSBub1xuLy8gdGllbmUgbG9zIHRva2VucyAtLXRmLSo7IHNpIGVzYXMgcMODwqFnaW5hcyBtaWdyYW4gYSAtLXRmLSogYWxnw4PCum4gZMODwq1hLCBlc3RlXG4vLyBtaXNtbyBwYXJ0aWFsIGVzIGVsIGRlc3Rpbm8gbmF0dXJhbC5cbkBtaXhpbiB0Zi1wYW5lbC1iYWNrZHJvcCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgaW5zZXQ6IDA7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLW92ZXJsYXkpO1xuICB6LWluZGV4OiB2YXIoLS10Zi16LW1vZGFsLWJhY2tkcm9wLCA0MDApO1xuICAvLyBgYm90aGAgeSBubyBlbCB2YWxvciBwb3IgZGVmZWN0byBgbm9uZWA6IHNpbiBmaWxsLW1vZGUgZWwgZWxlbWVudG8gc2VcbiAgLy8gcXVlZGEgZW4gc3UgdmFsb3IgQkFTRSBtaWVudHJhcyBsYSBhbmltYWNpw4PCs24gZXN0w4PCoSBwZW5kaWVudGUgZGUgYXJyYW5jYXJcbiAgLy8gw6LCgMKUcGVzdGHDg8KxYSBlbiBzZWd1bmRvIHBsYW5vLCB3ZWJ2aWV3IHF1ZSBkaWZpZXJlIGVsIHByaW1lciBmcmFtZcOiwoDClCB5IGNvbW9cbiAgLy8gZWwga2V5ZnJhbWUgcGFydGUgZGUgb3BhY2l0eSAwLCBsYSBob2phIGFwYXJlY8ODwq1hIGEgbWVkaWFzLCB0cmFuc2zDg8K6Y2lkYSxcbiAgLy8gZGVqYW5kbyB2ZXIgbGEgZmljaGEgZGUgZGV0csODwqFzLiBNZWRpZG86IGNvbiBsYSBhbmltYWNpw4PCs24gc2luIGF2YW56YXIsXG4gIC8vIG9wYWNpdHkgY29tcHV0YWJhIDAuXG4gIGFuaW1hdGlvbjogdGYtYmFja2Ryb3AtaW4gMjAwbXMgdmFyKC0tdGYtZWFzZS1vdXQpIGJvdGg7XG5cbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICBhbmltYXRpb246IG5vbmU7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuXG5AbWl4aW4gdGYtcGFuZWwtc2hlZXQge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIHotaW5kZXg6IHZhcigtLXRmLXotbW9kYWwsIDUwMCk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMSk7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogMjBweCAyMHB4IDAgMDtcbiAgcGFkZGluZzogMTBweCAxNnB4IDI0cHg7XG4gIG1heC1oZWlnaHQ6IDgwdmg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIGFuaW1hdGlvbjogdGYtc2hlZXQtaW4gMjYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpIGJvdGg7XG5cbiAgLy8gU2luIGFuaW1hY2nDg8KzbiwgZWwgZXN0YWRvIGZpbmFsIHRpZW5lIHF1ZSBxdWVkYXIgZXhwbMODwq1jaXRvOiBgbm9uZWAgYm9ycmFcbiAgLy8gdGFtYmnDg8KpbiBlbCBgYm90aGAgZGUgYXJyaWJhLlxuICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xuICAgIGFuaW1hdGlvbjogbm9uZTtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogbm9uZTtcbiAgfVxufVxuXG5AbWl4aW4gdGYtcGFuZWwtaGFuZGxlIHtcbiAgd2lkdGg6IDM2cHg7XG4gIGhlaWdodDogNHB4O1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLWJvcmRlci1zdHJvbmdlc3QpO1xuICBtYXJnaW46IDAgYXV0byAxNHB4O1xufVxuXG5Aa2V5ZnJhbWVzIHRmLWJhY2tkcm9wLWluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHRmLXNoZWV0LWluIHtcbiAgZnJvbSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDE2cHgpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUGFuZWwgbGF0ZXJhbCBkZXJlY2hvLiBNaXNtYSBwaWV6YSBxdWUgbGEgYm90dG9tIHNoZWV0IHBlcm8gYW5jbGFkbyBhbFxuLy8gbGFkbywgcGFyYSBmb3JtdWxhcmlvcyBsYXJnb3MgcXVlIHNlIHJlbGxlbmFuIG1pcmFuZG8gZWwgY29udGVuaWRvIGRlXG4vLyBkZXRyw4PCoXMgKHN1cGxlbWVudG9zIGp1bnRvIGEgc3VzIGdyw4PCoWZpY2FzLCBwb3IgZWplbXBsbykuXG4vL1xuLy8gRW4gbcODwrN2aWwgTk8gc2UgbGF0ZXJhbGl6YTogNDAwcHggZGUgYW5jaG8gc29icmUgdW5hIHBhbnRhbGxhIGRlIDM5MCBlcyB1bmFcbi8vIGhvamEgYSBwYW50YWxsYSBjb21wbGV0YSBtYWwgaGVjaGEuIFBvciBkZWJham8gZGUgNzY4cHggc2lndWUgc2llbmRvXG4vLyBib3R0b20gc2hlZXQsIHF1ZSBlcyBlbCBnZXN0byBxdWUgbGEgZ2VudGUgZXNwZXJhIGFow4PCrS5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRWwgdmVsbyBzZSBhY2xhcmEgZW4gZXNjcml0b3JpbzogZWwgcGFuZWwgc2UgbGF0ZXJhbGl6YSBwcmVjaXNhbWVudGUgcGFyYVxuLy8gcG9kZXIgbWlyYXIgbG8gcXVlIGhheSBkZXRyw4PCoXMgbWllbnRyYXMgc2UgcmVsbGVuYSAobGFzIGdyw4PCoWZpY2FzIGRlXG4vLyBwcm9ncmVzbywgYWwgcGF1dGFyIHVuIHN1cGxlbWVudG8pLiBBbCA1MCUgcXVlZGFiYW4gYXBhZ2FkYXMuXG5AbWl4aW4gdGYtc2lkZS1wYW5lbC1iYWNrZHJvcCB7XG4gIEBpbmNsdWRlIHRmLXBhbmVsLWJhY2tkcm9wO1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XG4gIH1cbn1cblxuQG1peGluIHRmLXNpZGUtcGFuZWwoJHdpZHRoOiA0MjBweCkge1xuICBAaW5jbHVkZSB0Zi1wYW5lbC1zaGVldDtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICB0b3A6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGxlZnQ6IGF1dG87XG4gICAgcmlnaHQ6IDA7XG4gICAgd2lkdGg6ICR3aWR0aDtcbiAgICBtYXgtd2lkdGg6IDkydnc7XG4gICAgLy8gMTAwdmggeSBubyBgbm9uZWA6IHNpIHVuIGFuY2VzdHJvIGNvbiBgY29udGFpbmAgY2FwdHVyYSBlbCBmaXhlZFxuICAgIC8vIChpb24tY29udGVudCBsbyBoYWNlKSwgZWwgcGFuZWwgdG9tYSBsYSBhbHR1cmEgZGUgRVNFIGFuY2VzdHJvLiBTaVxuICAgIC8vIG1pZGUgbcODwqFzIHF1ZSBsYSB2ZW50YW5hLCBlbCBwaWUgY29uIEd1YXJkYXIgc2UgcXVlZGEgZnVlcmEgZGVcbiAgICAvLyBwYW50YWxsYS4gTWVkaWRvOiA4NDBweCBkZSBhbHRvIGVuIHVuYSB2ZW50YW5hIGRlIDgwMC5cbiAgICBtYXgtaGVpZ2h0OiAxMDB2aDtcbiAgICAvLyBTaW4gZXN0byBlbCByZWxsZW5vIHNlIHN1bWEgYWwgYW5jaG8geSBhbCBhbHRvOiBlbCBwYW5lbCBtZWTDg8KtYSA0ODFweFxuICAgIC8vIHBpZGllbmRvIDQ0MCwgeSA4NDAgZGUgYWx0byBlbiB1bmEgdmVudGFuYSBkZSA4MDAsIGRlc2JvcmRhbmRvIHBvclxuICAgIC8vIGFiYWpvLiBFc3RlIHByb3llY3RvIG5vIHRpZW5lIHJlc2V0IGdsb2JhbCBkZSBib3gtc2l6aW5nLlxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgYm9yZGVyLXRvcDogbm9uZTtcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtNSkgdmFyKC0tdGYtc3BhY2UtNSkgMDtcbiAgICBhbmltYXRpb246IHRmLXNpZGUtcGFuZWwtaW4gMjYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpIGJvdGg7XG5cbiAgICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xuICAgICAgYW5pbWF0aW9uOiBub25lO1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIHRyYW5zZm9ybTogbm9uZTtcbiAgICB9XG4gIH1cbn1cblxuLy8gRWwgYXNhIGRlIGFycmFzdHJlIHNvbG8gdGllbmUgc2VudGlkbyBlbiBsYSBob2phIGluZmVyaW9yOiBlbiB1biBwYW5lbFxuLy8gbGF0ZXJhbCBubyBoYXkgbmFkYSBxdWUgYXJyYXN0cmFyIGhhY2lhIGFiYWpvLlxuQG1peGluIHRmLXNpZGUtcGFuZWwtaGFuZGxlIHtcbiAgQGluY2x1ZGUgdGYtcGFuZWwtaGFuZGxlO1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cblxuQGtleWZyYW1lcyB0Zi1zaWRlLXBhbmVsLWluIHtcbiAgZnJvbSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDI0cHgpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG4iLCIvLyBCb3TDg8KzbiBDVEEgY29uIGdyYWRpZW50ZSBkZSBhY2VudG8gw6LCgMKUIG1pc21vIGJsb3F1ZSByZXBldGlkbyBlbiB+MTEgc2l0aW9zIGRlXG4vLyB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgcG9yIGxheW91dCAod2lkdGgsIGhlaWdodCwgZm9udC1zaXplLCBtYXJnaW4pLlxuLy9cbi8vIExhIG1pdGFkIGRlIGxvcyBzaXRpb3Mgb3JpZ2luYWxlcyBubyB0ZW7Dg8KtYW4gdHJhbnNpY2nDg8Kzbi9mZWVkYmFjayBkZSBwdWxzYWNpw4PCs25cbi8vIG5pIDpmb2N1cy12aXNpYmxlIMOiwoDClCBlbCBtaXhpbiBsb3MgYcODwrFhZGUgc2llbXByZSwgY2llcnJhIGVzZSBodWVjbyBkZVxuLy8gY29uc2lzdGVuY2lhIGRlIGludGVyYWNjacODwrNuIChQUk9EVUNULm1kOiBcInVuIHNvbG8gcGF0csODwrNuIHBvciB0aXBvIGRlXG4vLyBjb21wb25lbnRlXCIpIGVuIHZleiBkZSBwZXJwZXR1YXIgbGEgdmFyaWFjacODwrNuIGFjY2lkZW50YWwuXG5AbWl4aW4gdGYtZ3JhZGllbnQtYnV0dG9uKCRyYWRpdXM6IDEycHgpIHtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAkcmFkaXVzO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtZ3JhZGllbnQpO1xuICBjb2xvcjogdmFyKC0tdGYtYWNjZW50LWNvbnRyYXN0KTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpLCBvcGFjaXR5IDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk3KTtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNDU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtdGV4dCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxufVxuXG4vLyBCb3TDg8KzbiBkZSBoZWFkZXIgcXVlIGVzIHNvbG8gdW4gaWNvbm8gw6LCgMKUIG1pc21vIGxvb2sgXCJlbnZ1ZWx0b1wiIHF1ZSB5YSB1c2EgbGFcbi8vIGFwcCBkZSBjb25zdW1pZG9yIGVuIHN1cyB0b29sYmFycyAocGFja2FnZXMvc2hhcmVkLWZlYXR1cmVzLy4uLi9kaWV0cy9cbi8vIGNvbXBvbmVudHMvdG9vbGJhci1jYWxlbmRhcjogZm9uZG8gKyBib3JkZXItcmFkaXVzICsgY2FqYSBmaWphIDQ0eDQ0LCBlblxuLy8gdmV6IGRlbCBpb24tYnV0dG9uIHBsYW5vL3RyYW5zcGFyZW50ZSBxdWUgdGVuw4PCrWEgY2FkYSBwYW50YWxsYSBkZSB0cmFpbmVyc1xuLy8gaGFzdGEgYWhvcmEpLiBUb2tlbmVhZG8gYSBsYSBwYWxldGEgZGUgZXN0YSBhcHAgZW4gdmV6IGRlIHJlcGV0aXIgbG9zXG4vLyByZ2JhKDI1NSwyNTUsMjU1LC4uLikgc3VlbHRvcyBkZWwgb3JpZ2luYWwuXG4vL1xuLy8gU2lydmUgdGFudG8gcGFyYSA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIj4gKHVzYSBsYXMgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzXG4vLyBkZSBJb25pYykgY29tbyBwYXJhIHVuIDxidXR0b24+IG5hdGl2byAodXNhIGxhcyBwcm9waWVkYWRlcyBwbGFuYXMpIMOiwoDClFxuLy8gYW1ib3MgY29leGlzdGVuIGhveSBlbiB0cmFpbmVycyBwYXJhIGVsIG1pc21vIHJvbCBkZSBcInZvbHZlclwiL1wiY2VycmFyXCIuXG5AbWl4aW4gdGYtaWNvbi1idXR0b24oJHNpemU6IDQ0cHgsICRyYWRpdXM6IDEycHgsICRpY29uLXNpemU6IDIwcHgpIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICAtLWJhY2tncm91bmQtYWN0aXZhdGVkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtaG92ZXI6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIC0tYmFja2dyb3VuZC1mb2N1c2VkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIC0tYm9yZGVyLXJhZGl1czogI3skcmFkaXVzfTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAtLXBhZGRpbmctZW5kOiAwO1xuICAtLXBhZGRpbmctdG9wOiAwO1xuICAtLXBhZGRpbmctYm90dG9tOiAwO1xuXG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgd2lkdGg6ICRzaXplO1xuICBoZWlnaHQ6ICRzaXplO1xuICBtaW4td2lkdGg6ICRzaXplO1xuICBtaW4taGVpZ2h0OiAkc2l6ZTtcbiAgbWFyZ2luOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICBjb2xvciB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAkaWNvbi1zaXplO1xuICB9XG59XG5cbi8vIEV4cGFuc29yIGludmlzaWJsZSBkZSB6b25hIHB1bHNhYmxlLlxuLy9cbi8vIFBBUkEgUVXDg8KJOiB1biBjb250cm9sIGNvbXBhY3RvICh1biBpY29ubyBkZSAzMiBweCBlbiB1bmEgZmlsYSBkZSB0YWJsYSwgdW5cbi8vIGVubGFjZSBkZSB0ZXh0byBkZSAxNiBweCkgbm8gbGxlZ2EgYSBsb3MgNDQgcHggcXVlIGV4aWdlIFBST0RVQ1QubWQsIHlcbi8vIGVuZ29yZGFybG8gZGUgdmVyZGFkIGRlc3BsYXphIHRvZG8gbG8gcXVlIHRpZW5lIGFscmVkZWRvciDDosKAwpQgZW4gdW5hIHRhYmxhXG4vLyBkZSB2ZWludGUgZmlsYXMsIDggcHggcG9yIGZpbGEgc29uIG1lZGlhIHBhbnRhbGxhLlxuLy9cbi8vIEVsIHBzZXVkb2VsZW1lbnRvIGNyZWNlIGhhY2lhIGZ1ZXJhIHNpbiBvY3VwYXIgc2l0aW8gZW4gZWwgZmx1am8sIGFzw4PCrSBxdWVcbi8vIGVsIGJvdMODwrNuIHNlIHZlIHBlcXVlw4PCsW8geSBzZSBwdWxzYSBncmFuZGUuXG4vL1xuLy8gQVZJU08gREUgTUVESUNJw4PCk046IGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIE5PIHZlIGVzdGUgcHNldWRvZWxlbWVudG8sIGFzw4PCrVxuLy8gcXVlIGFsIHZlcmlmaWNhciBoYXkgcXVlIHVzYXIgZWxlbWVudEZyb21Qb2ludCBjb24gZWwgZWxlbWVudG8gZGVudHJvIGRlbFxuLy8gdmlld3BvcnQuIEFkZW3Dg8KhcyBlbCBoaXQtdGVzdCBkZXZ1ZWx2ZSAyIHB4IG1lbm9zIHF1ZSBsYSBjYWphIGRlY2xhcmFkYVxuLy8gKGNvbXByb2JhZG86IC00cHggZGEgNDIsIC02cHggZGEgNDYpLCBhc8ODwq0gcXVlIHVuIDQyIG1lZGlkbyBzb24gNDQgcmVhbGVzLlxuLy9cbi8vICRncm93OiBjdcODwqFudG8gY3JlY2UgcG9yIGNhZGEgbGFkby4gNHB4IGxsZXZhIHVuIGNvbnRyb2wgZGUgMzYgcHggYSA0NC5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlcigkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldDogLSN7JGdyb3d9O1xuICB9XG59XG5cbi8vIFZhcmlhbnRlIHF1ZSBzb2xvIGNyZWNlIGVuIFZFUlRJQ0FMLiBQYXJhIGNvbnRyb2xlcyBlbiBmaWxhIGRvbmRlIGVsXG4vLyBleHBhbnNvciBob3Jpem9udGFsIHNlIHNvbGFwYXLDg8KtYSBjb24gZWwgZGUgYWwgbGFkbyB5IHJvYmFyw4PCrWEgc3VzIHRvcXVlcy5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlci15KCRncm93OiA0cHgpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogLSN7JGdyb3d9O1xuICAgIGJvdHRvbTogLSN7JGdyb3d9O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gIH1cbn1cbiIsIi8vIEZpbGEgZGUgaW5wdXQgY29uIGljb25vICh3cmFwcGVyICsgaWNvbm8gKyBjYW1wbykgw6LCgMKUIHJlcGV0aWRhIGVuIDQgcMODwqFnaW5hc1xuLy8gYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS4gRWwgZm9uZG9cbi8vIGRlbCB3cmFwcGVyIGVzIGVsIMODwrpuaWNvIHZhbG9yIHF1ZSB2YXLDg8KtYSBwb3IgcMODwqFnaW5hIChzdXBlcmZpY2llIDEgbyAyIHNlZ8ODwrpuXG4vLyBjb250ZXh0byB2aXN1YWwpLCBkZSBhaMODwq0gZWwgcGFyw4PCoW1ldHJvOyB0YW1hw4PCsW8gZGUgZnVlbnRlL2FsdG8vbWFyZ2VuIHNlXG4vLyBkZWphbiBmdWVyYSBkZWwgbWl4aW4gcG9ycXVlIGNhZGEgcMODwqFnaW5hIGxvcyBmaWphIHNlZ8ODwrpuIHN1IHByb3BpbyBsYXlvdXQuXG5AbWl4aW4gdGYtaW5wdXQtd3JhcHBlcigkYmc6IHZhcigtLXRmLXN1cmZhY2UtMSkpIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xuICBiYWNrZ3JvdW5kOiAkYmc7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAwIDE0cHg7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjpmb2N1cy13aXRoaW4ge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgfVxufVxuXG5AbWl4aW4gdGYtaW5wdXQtaWNvbiB7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbkBtaXhpbiB0Zi1pbnB1dC1maWVsZCB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgb3V0bGluZTogbm9uZTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgaGVpZ2h0OiAxMDAlO1xuXG4gICY6OnBsYWNlaG9sZGVyIHtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
}));


/***/ }),

/***/ 48099:
/*!************************************************************************!*\
  !*** ./src/app/features/dashboard/services/coach-tasks-api.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CoachTasksApiService: () => (/* binding */ CoachTasksApiService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/http/http.service */ 88552);

var _CoachTasksApiService;


class CoachTasksApiService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  getMine(status) {
    const query = status ? `?status=${status}` : '';
    return this.http.get(`${CoachTasksApiService.ENDPOINT}${query}`);
  }
  create(payload) {
    return this.http.post(CoachTasksApiService.ENDPOINT, payload);
  }
  update(id, updates) {
    return this.http.patch(`${CoachTasksApiService.ENDPOINT}/${id}`, updates);
  }
  remove(id) {
    return this.http.delete(`${CoachTasksApiService.ENDPOINT}/${id}`);
  }
}
_CoachTasksApiService = CoachTasksApiService;
// "coach-tasks" y no "tasks": /trainer/tasks/* ya existe y son los hábitos
// diarios del cliente. Ver components/coachTasks/coach-task-routes.js.
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CoachTasksApiService, "ENDPOINT", 'trainer/coach-tasks');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CoachTasksApiService, "\u0275fac", function CoachTasksApiService_Factory(t) {
  return new (t || _CoachTasksApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CoachTasksApiService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _CoachTasksApiService,
  factory: _CoachTasksApiService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 57438:
/*!**********************************************************************************!*\
  !*** ./src/app/features/dashboard/services/trainer-notifications-api.service.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrainerNotificationsApiService: () => (/* binding */ TrainerNotificationsApiService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/http/http.service */ 88552);

var _TrainerNotificationsApiService;


class TrainerNotificationsApiService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  getMine() {
    return this.http.get(`${TrainerNotificationsApiService.ENDPOINT}/mine`);
  }
  getUnreadCount() {
    return this.http.get(`${TrainerNotificationsApiService.ENDPOINT}/mine/unread-count`);
  }
  markRead(id) {
    return this.http.patch(`${TrainerNotificationsApiService.ENDPOINT}/${id}/read`, {});
  }
  markAllRead() {
    return this.http.post(`${TrainerNotificationsApiService.ENDPOINT}/mark-all-read`, {});
  }
}
_TrainerNotificationsApiService = TrainerNotificationsApiService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TrainerNotificationsApiService, "ENDPOINT", 'trainer/notifications');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TrainerNotificationsApiService, "\u0275fac", function TrainerNotificationsApiService_Factory(t) {
  return new (t || _TrainerNotificationsApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TrainerNotificationsApiService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _TrainerNotificationsApiService,
  factory: _TrainerNotificationsApiService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 7627:
/*!*****************************************************************************!*\
  !*** ./src/app/features/dashboard/services/trainer-payments-api.service.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrainerPaymentsApiService: () => (/* binding */ TrainerPaymentsApiService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/http/http.service */ 88552);

var _TrainerPaymentsApiService;


class TrainerPaymentsApiService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  getOverview() {
    return this.http.get(`${TrainerPaymentsApiService.ENDPOINT}/summary`);
  }
}
_TrainerPaymentsApiService = TrainerPaymentsApiService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TrainerPaymentsApiService, "ENDPOINT", 'trainer/payments');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TrainerPaymentsApiService, "\u0275fac", function TrainerPaymentsApiService_Factory(t) {
  return new (t || _TrainerPaymentsApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TrainerPaymentsApiService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _TrainerPaymentsApiService,
  factory: _TrainerPaymentsApiService.ɵfac,
  providedIn: 'root'
}));


/***/ })

}]);
//# sourceMappingURL=src_app_features_dashboard_dashboard_module_ts.js.map