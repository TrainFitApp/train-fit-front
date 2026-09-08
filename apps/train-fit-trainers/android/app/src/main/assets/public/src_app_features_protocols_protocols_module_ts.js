"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_features_protocols_protocols_module_ts"],{

/***/ 47672:
/*!**************************************************************************************!*\
  !*** ./src/app/features/checkin-templates/services/checkin-templates-api.service.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckinTemplatesApiService: () => (/* binding */ CheckinTemplatesApiService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/http/http.service */ 88552);

var _CheckinTemplatesApiService;


class CheckinTemplatesApiService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  list() {
    return this.http.get('trainer/checkin-templates');
  }
  create(name, enabledFields, cadence, customQuestions = []) {
    return this.http.post('trainer/checkin-templates', {
      name,
      enabledFields,
      cadence,
      customQuestions
    });
  }
  update(id, updates) {
    return this.http.put(`trainer/checkin-templates/${id}`, updates);
  }
  delete(id) {
    return this.http.delete(`trainer/checkin-templates/${id}`);
  }
  apply(id, clientIds) {
    return this.http.post(`trainer/checkin-templates/${id}/apply`, {
      clientIds
    });
  }
}
_CheckinTemplatesApiService = CheckinTemplatesApiService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CheckinTemplatesApiService, "\u0275fac", function CheckinTemplatesApiService_Factory(t) {
  return new (t || _CheckinTemplatesApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CheckinTemplatesApiService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _CheckinTemplatesApiService,
  factory: _CheckinTemplatesApiService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 47529:
/*!*******************************************************************!*\
  !*** ./src/app/features/protocols/models/coach-protocol.model.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PROTOCOL_TASK_PRESETS: () => (/* binding */ PROTOCOL_TASK_PRESETS)
/* harmony export */ });
// Fase 4 Coach Pro — espejo de components/coachProtocols/ (backend).
const PROTOCOL_TASK_PRESETS = [{
  type: 'steps',
  label: 'Pasos diarios',
  unit: 'pasos',
  target: 10000
}, {
  type: 'water',
  label: 'Agua',
  unit: 'l',
  target: 2
}, {
  type: 'sleep',
  label: 'Horas de sueño',
  unit: 'h',
  target: 8
}, {
  type: 'cardio',
  label: 'Cardio',
  unit: 'min',
  target: 30
}];

/***/ }),

/***/ 18250:
/*!****************************************************************!*\
  !*** ./src/app/features/protocols/protocols-routing.module.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProtocolsPageRoutingModule: () => (/* binding */ ProtocolsPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _protocols_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./protocols.page */ 33660);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _ProtocolsPageRoutingModule;




const routes = [{
  path: '',
  component: _protocols_page__WEBPACK_IMPORTED_MODULE_1__.ProtocolsPage
}];
class ProtocolsPageRoutingModule {}
_ProtocolsPageRoutingModule = ProtocolsPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProtocolsPageRoutingModule, "\u0275fac", function ProtocolsPageRoutingModule_Factory(t) {
  return new (t || _ProtocolsPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProtocolsPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _ProtocolsPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProtocolsPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ProtocolsPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 4403:
/*!********************************************************!*\
  !*** ./src/app/features/protocols/protocols.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProtocolsPageModule: () => (/* binding */ ProtocolsPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _clients_components_select_clients_modal_select_clients_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../clients/components/select-clients-modal/select-clients-modal.module */ 10119);
/* harmony import */ var _protocols_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./protocols-routing.module */ 18250);
/* harmony import */ var _protocols_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./protocols.page */ 33660);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 69717);

var _ProtocolsPageModule;





class ProtocolsPageModule {}
_ProtocolsPageModule = ProtocolsPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProtocolsPageModule, "\u0275fac", function ProtocolsPageModule_Factory(t) {
  return new (t || _ProtocolsPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProtocolsPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
  type: _ProtocolsPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProtocolsPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _clients_components_select_clients_modal_select_clients_modal_module__WEBPACK_IMPORTED_MODULE_2__.SelectClientsModalModule, _protocols_routing_module__WEBPACK_IMPORTED_MODULE_3__.ProtocolsPageRoutingModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](ProtocolsPageModule, {
    declarations: [_protocols_page__WEBPACK_IMPORTED_MODULE_4__.ProtocolsPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _clients_components_select_clients_modal_select_clients_modal_module__WEBPACK_IMPORTED_MODULE_2__.SelectClientsModalModule, _protocols_routing_module__WEBPACK_IMPORTED_MODULE_3__.ProtocolsPageRoutingModule]
  });
})();

/***/ }),

/***/ 33660:
/*!******************************************************!*\
  !*** ./src/app/features/protocols/protocols.page.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProtocolsPage: () => (/* binding */ ProtocolsPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 37728);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 27453);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 51097);
/* harmony import */ var _clients_components_select_clients_modal_select_clients_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../clients/components/select-clients-modal/select-clients-modal.component */ 81800);
/* harmony import */ var _models_coach_protocol_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/coach-protocol.model */ 47529);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _services_coach_protocols_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/coach-protocols-api.service */ 37551);
/* harmony import */ var _checkin_templates_services_checkin_templates_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../checkin-templates/services/checkin-templates-api.service */ 47672);
/* harmony import */ var _diet_templates_services_diet_template_api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../diet-templates/services/diet-template-api.service */ 63459);
/* harmony import */ var src_app_core_services_routine_template_routine_template_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/routine-template/routine-template-api.service */ 76391);
/* harmony import */ var _automations_services_coach_rules_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../automations/services/coach-rules-api.service */ 87402);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/router */ 64409);


var _ProtocolsPage;















function ProtocolsPage_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "div", 20)(2, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function ProtocolsPage_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "ion-icon", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, "No se pudieron cargar tus protocolos");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ProtocolsPage_div_14_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r7.load());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](5, "Reintentar");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
}
function ProtocolsPage_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "ion-icon", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, "Tu metodolog\u00EDa, en un solo paso");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](5, " Un protocolo agrupa lo que le pones a un cliente cuando entra en una fase: macros, plantilla de check-in, plan de dieta, rutina, automatizaciones y h\u00E1bitos. Cr\u00E9alo una vez \u2014 ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "em");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7, "Definici\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](8, ", ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "em");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](10, "Volumen");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](11, ", ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "em");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](13, "Recomposici\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](14, "\u2014 y apl\u00EDcalo entero cada vez que lo necesites. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](15, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ProtocolsPage_div_15_Template_button_click_15_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r9.openEditor());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](16, "Crear mi primer protocolo");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
}
function ProtocolsPage_section_16_div_6_p_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "p", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const result_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](result_r12.error);
  }
}
function ProtocolsPage_section_16_div_6_ul_6_li_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "li", 41)(1, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const step_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](step_r17.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("step-status--skipped", step_r17.status === "skipped")("step-status--failed", step_r17.status === "failed");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", step_r17.status === "applied" ? "Aplicado" : step_r17.status === "skipped" ? "No incluido" : "Fall\u00F3", " ");
  }
}
function ProtocolsPage_section_16_div_6_ul_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "ul", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, ProtocolsPage_section_16_div_6_ul_6_li_1_Template, 5, 6, "li", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const result_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", result_r12.steps)("ngForTrackBy", ctx_r14.trackByIndex);
  }
}
function ProtocolsPage_section_16_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 32)(1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "ion-icon", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](5, ProtocolsPage_section_16_div_6_p_5_Template, 2, 1, "p", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](6, ProtocolsPage_section_16_div_6_ul_6_Template, 2, 2, "ul", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const result_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("result-icon--ok", result_r12.success)("result-icon--fail", !result_r12.success);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("name", result_r12.success ? "checkmark-circle-outline" : "alert-circle-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](result_r12.clientId);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", result_r12.error);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", result_r12.steps == null ? null : result_r12.steps.length);
  }
}
function ProtocolsPage_section_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "section", 27)(1, "div", 28)(2, "h2", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3, "Resultado");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ProtocolsPage_section_16_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r20);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r19.dismissResults());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](5, "Cerrar");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](6, ProtocolsPage_section_16_div_6_Template, 7, 8, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r3.applyResults)("ngForTrackBy", ctx_r3.trackByIndex);
  }
}
function ProtocolsPage_ul_17_li_1_p_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "p", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const protocol_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](protocol_r22.description);
  }
}
function ProtocolsPage_ul_17_li_1_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const part_r29 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", part_r29, " ");
  }
}
function ProtocolsPage_ul_17_li_1_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, " Vac\u00EDo ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function ProtocolsPage_ul_17_li_1_span_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "Aplicar");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function ProtocolsPage_ul_17_li_1_ion_spinner_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "ion-spinner", 64);
  }
}
function ProtocolsPage_ul_17_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "li", 46)(1, "div", 47)(2, "h2", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](4, ProtocolsPage_ul_17_li_1_p_4_Template, 2, 1, "p", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](6, ProtocolsPage_ul_17_li_1_span_6_Template, 2, 1, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, ProtocolsPage_ul_17_li_1_span_7_Template, 2, 0, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "div", 53)(9, "button", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ProtocolsPage_ul_17_li_1_Template_button_click_9_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r31);
      const protocol_r22 = restoredCtx.$implicit;
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r30.applyProtocol(protocol_r22));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](10, ProtocolsPage_ul_17_li_1_span_10_Template, 2, 0, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](11, ProtocolsPage_ul_17_li_1_ion_spinner_11_Template, 1, 0, "ion-spinner", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "button", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ProtocolsPage_ul_17_li_1_Template_button_click_12_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r31);
      const protocol_r22 = restoredCtx.$implicit;
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r32.openEditor(protocol_r22));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](13, "ion-icon", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](14, "button", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ProtocolsPage_ul_17_li_1_Template_button_click_14_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r31);
      const protocol_r22 = restoredCtx.$implicit;
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r33.confirmDelete(protocol_r22));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](15, "ion-icon", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const protocol_r22 = ctx.$implicit;
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](protocol_r22.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", protocol_r22.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r21.contentSummary(protocol_r22))("ngForTrackBy", ctx_r21.trackByIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx_r21.contentSummary(protocol_r22).length);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx_r21.applyingId === protocol_r22._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r21.applyingId !== protocol_r22._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r21.applyingId === protocol_r22._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("aria-label", "Editar " + protocol_r22.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("aria-label", "Eliminar " + protocol_r22.name);
  }
}
function ProtocolsPage_ul_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "ul", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, ProtocolsPage_ul_17_li_1_Template, 16, 10, "li", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r4.protocols)("ngForTrackBy", ctx_r4.trackByProtocolId);
  }
}
function ProtocolsPage_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ProtocolsPage_div_18_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r35);
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r34.closeEditor());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function ProtocolsPage_div_19_option_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "option", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r46 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngValue", option_r46._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](option_r46.name);
  }
}
function ProtocolsPage_div_19_option_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "option", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r47 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngValue", option_r47._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](option_r47.name);
  }
}
function ProtocolsPage_div_19_option_54_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "option", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r48 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngValue", option_r48._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](option_r48.name);
  }
}
function ProtocolsPage_div_19_p_57_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "p", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, " Todav\u00EDa no tienes automatizaciones. Puedes crearlas desde el men\u00FA lateral y a\u00F1adirlas aqu\u00ED luego. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function ProtocolsPage_div_19_div_58_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r52 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "button", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ProtocolsPage_div_19_div_58_button_1_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r52);
      const rule_r50 = restoredCtx.$implicit;
      const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r51.toggleRule(rule_r50._id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rule_r50 = ctx.$implicit;
    const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("rule-chip--active", ctx_r49.isRuleSelected(rule_r50._id));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("aria-pressed", ctx_r49.isRuleSelected(rule_r50._id));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", rule_r50.name, " ");
  }
}
function ProtocolsPage_div_19_div_58_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, ProtocolsPage_div_19_div_58_button_1_Template, 2, 4, "button", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r40.rules)("ngForTrackBy", ctx_r40.trackByIndex);
  }
}
function ProtocolsPage_div_19_button_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "button", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ProtocolsPage_div_19_button_62_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r55);
      const preset_r53 = restoredCtx.$implicit;
      const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r54.addTask(preset_r53.type));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "ion-icon", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const preset_r53 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("", preset_r53.label, " ");
  }
}
function ProtocolsPage_div_19_div_63_Template(rf, ctx) {
  if (rf & 1) {
    const _r59 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 110)(1, "span", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "input", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngModelChange", function ProtocolsPage_div_19_div_63_Template_input_ngModelChange_3_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r59);
      const task_r56 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](task_r56.target = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "span", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "button", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ProtocolsPage_div_19_div_63_Template_button_click_6_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r59);
      const i_r57 = restoredCtx.index;
      const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r60.removeTask(i_r57));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](7, "ion-icon", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const task_r56 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](task_r56.label || "H\u00E1bito");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngModel", task_r56.target);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("aria-label", "Objetivo de " + (task_r56.label || "h\u00E1bito"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](task_r56.unit);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("aria-label", "Quitar " + (task_r56.label || "h\u00E1bito"));
  }
}
function ProtocolsPage_div_19_p_65_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "p", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r43.validationError);
  }
}
function ProtocolsPage_div_19_span_70_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r44.editingId ? "Guardar" : "Crear protocolo");
  }
}
function ProtocolsPage_div_19_ion_spinner_71_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "ion-spinner", 64);
  }
}
function ProtocolsPage_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r62 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "h2", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "label", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](5, "Nombre");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "div", 70)(7, "input", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngModelChange", function ProtocolsPage_div_19_Template_input_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r62);
      const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r61.name = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "label", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](9, "Descripci\u00F3n ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "span", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](11, "(opcional)");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "div", 70)(13, "input", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngModelChange", function ProtocolsPage_div_19_Template_input_ngModelChange_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r62);
      const ctx_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r63.description = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](14, "h3", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](15, "Objetivo nutricional");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "p", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](17, "D\u00E9jalo vac\u00EDo si este protocolo no cambia los macros del cliente.");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](18, "div", 77)(19, "div", 78)(20, "label", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](21, "Calor\u00EDas");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](22, "input", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngModelChange", function ProtocolsPage_div_19_Template_input_ngModelChange_22_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r62);
      const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r64.kcalTotal = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](23, "div", 78)(24, "label", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](25, "Prote\u00EDnas (g)");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](26, "input", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngModelChange", function ProtocolsPage_div_19_Template_input_ngModelChange_26_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r62);
      const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r65.proteinsGTotal = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](27, "div", 78)(28, "label", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](29, "Carbohidratos (g)");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](30, "input", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngModelChange", function ProtocolsPage_div_19_Template_input_ngModelChange_30_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r62);
      const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r66.carbohydratesGTotal = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](31, "div", 78)(32, "label", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](33, "Grasas (g)");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](34, "input", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngModelChange", function ProtocolsPage_div_19_Template_input_ngModelChange_34_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r62);
      const ctx_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r67.fatGTotal = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](35, "h3", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](36, "Plantillas");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](37, "label", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](38, "Check-in");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](39, "select", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngModelChange", function ProtocolsPage_div_19_Template_select_ngModelChange_39_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r62);
      const ctx_r68 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r68.checkinTemplateId = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](40, "option", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](41, "Ninguna");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](42, ProtocolsPage_div_19_option_42_Template, 2, 2, "option", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](43, "label", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](44, "Plan de dieta");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](45, "select", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngModelChange", function ProtocolsPage_div_19_Template_select_ngModelChange_45_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r62);
      const ctx_r69 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r69.dietTemplateId = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](46, "option", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](47, "Ninguno");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](48, ProtocolsPage_div_19_option_48_Template, 2, 2, "option", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](49, "label", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](50, "Rutina");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](51, "select", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngModelChange", function ProtocolsPage_div_19_Template_select_ngModelChange_51_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r62);
      const ctx_r70 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r70.routineTemplateId = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](52, "option", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](53, "Ninguna");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](54, ProtocolsPage_div_19_option_54_Template, 2, 2, "option", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](55, "h3", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](56, "Automatizaciones");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](57, ProtocolsPage_div_19_p_57_Template, 2, 0, "p", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](58, ProtocolsPage_div_19_div_58_Template, 2, 2, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](59, "h3", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](60, "H\u00E1bitos diarios");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](61, "div", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](62, ProtocolsPage_div_19_button_62_Template, 3, 1, "button", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](63, ProtocolsPage_div_19_div_63_Template, 8, 5, "div", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](64, "div", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](65, ProtocolsPage_div_19_p_65_Template, 2, 1, "p", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](66, "div", 102)(67, "button", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ProtocolsPage_div_19_Template_button_click_67_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r62);
      const ctx_r71 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r71.closeEditor());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](68, "Cancelar");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](69, "button", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ProtocolsPage_div_19_Template_button_click_69_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r62);
      const ctx_r72 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r72.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](70, ProtocolsPage_div_19_span_70_Template, 2, 1, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](71, ProtocolsPage_div_19_ion_spinner_71_Template, 1, 0, "ion-spinner", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", ctx_r6.editingId ? "Editar protocolo" : "Nuevo protocolo", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngModel", ctx_r6.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngModel", ctx_r6.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngModel", ctx_r6.kcalTotal);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngModel", ctx_r6.proteinsGTotal);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngModel", ctx_r6.carbohydratesGTotal);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngModel", ctx_r6.fatGTotal);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngModel", ctx_r6.checkinTemplateId);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngValue", null);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r6.checkinTemplates);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngModel", ctx_r6.dietTemplateId);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngValue", null);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r6.dietTemplates);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngModel", ctx_r6.routineTemplateId);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngValue", null);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r6.routineTemplates);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx_r6.rules.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r6.rules.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r6.taskPresets)("ngForTrackBy", ctx_r6.trackByIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx_r6.dailyTasks)("ngForTrackBy", ctx_r6.trackByIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r6.validationError);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx_r6.isSaving);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx_r6.isSaving);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r6.isSaving);
  }
}
// Fase 4 Coach Pro — protocolos (§20): la metodología del coach, empaquetada.
//
// Un protocolo NO guarda contenido: guarda referencias a las plantillas que
// el coach ya tiene. Por eso esta pantalla es fundamentalmente una lista de
// selectores — y por eso al aplicarlo el backend ejecuta exactamente las
// mismas operaciones que el coach haría a mano, una por una.
//
// El editor vive en un panel dentro de esta misma página, no en una ruta
// propia como el constructor de reglas: un protocolo es una lista corta de
// elecciones (nombre, macros, 3 plantillas, hábitos), no un formulario con
// estructura anidada.
class ProtocolsPage {
  constructor(coachProtocolsApi, checkinTemplatesApi, dietTemplateApi, routineTemplateApi, coachRulesApi, ionicUtilService, modalController) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "coachProtocolsApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "checkinTemplatesApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietTemplateApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "routineTemplateApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "coachRulesApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "taskPresets", _models_coach_protocol_model__WEBPACK_IMPORTED_MODULE_3__.PROTOCOL_TASK_PRESETS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "state", 'loading');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "protocols", []);
    // Opciones de los selectores, cargadas una vez al abrir el editor.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "checkinTemplates", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietTemplates", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "routineTemplates", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "rules", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "optionsLoaded", false);
    // --- Editor ---
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "showEditor", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "editingId", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isSaving", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "name", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "description", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "kcalTotal", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "proteinsGTotal", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "carbohydratesGTotal", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "fatGTotal", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "checkinTemplateId", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietTemplateId", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "routineTemplateId", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ruleIds", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dailyTasks", []);
    // --- Resultado de aplicar ---
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "applyResults", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "applyingId", null);
    this.coachProtocolsApi = coachProtocolsApi;
    this.checkinTemplatesApi = checkinTemplatesApi;
    this.dietTemplateApi = dietTemplateApi;
    this.routineTemplateApi = routineTemplateApi;
    this.coachRulesApi = coachRulesApi;
    this.ionicUtilService = ionicUtilService;
    this.modalController = modalController;
  }
  ionViewWillEnter() {
    this.load();
  }
  load() {
    this.state = 'loading';
    this.coachProtocolsApi.getMine().subscribe({
      next: protocols => {
        this.protocols = protocols;
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      }
    });
  }
  // Las cuatro fuentes en paralelo y tolerantes a fallo individual: que un
  // coach no tenga plantillas de dieta no debe impedirle elegir una rutina.
  loadOptions() {
    if (this.optionsLoaded) return;
    (0,rxjs__WEBPACK_IMPORTED_MODULE_11__.forkJoin)({
      checkins: this.checkinTemplatesApi.list().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.of)([]))),
      diets: this.dietTemplateApi.list().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.of)([]))),
      routines: this.routineTemplateApi.list().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.of)([]))),
      rules: this.coachRulesApi.getMine().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.of)([])))
    }).subscribe(result => {
      this.checkinTemplates = (result.checkins || []).map(t => ({
        _id: t._id,
        name: t.name
      }));
      this.dietTemplates = (result.diets || []).map(t => ({
        _id: t._id,
        name: t.name
      }));
      this.routineTemplates = (result.routines || []).map(t => ({
        _id: t._id,
        name: t.name || 'Rutina'
      }));
      this.rules = (result.rules || []).map(r => ({
        _id: r._id,
        name: r.name
      }));
      this.optionsLoaded = true;
    });
  }
  // --- Editor ---
  openEditor(protocol) {
    this.loadOptions();
    this.editingId = protocol?._id || null;
    this.name = protocol?.name || '';
    this.description = protocol?.description || '';
    this.kcalTotal = protocol?.nutritionalGoal?.kcalTotal ?? null;
    this.proteinsGTotal = protocol?.nutritionalGoal?.proteinsGTotal ?? null;
    this.carbohydratesGTotal = protocol?.nutritionalGoal?.carbohydratesGTotal ?? null;
    this.fatGTotal = protocol?.nutritionalGoal?.fatGTotal ?? null;
    this.checkinTemplateId = protocol?.checkinTemplateId || null;
    this.dietTemplateId = protocol?.dietTemplateId || null;
    this.routineTemplateId = protocol?.routineTemplateId || null;
    this.ruleIds = [...(protocol?.ruleIds || [])];
    this.dailyTasks = (protocol?.dailyTasks || []).map(t => ({
      ...t
    }));
    this.showEditor = true;
  }
  closeEditor() {
    this.showEditor = false;
  }
  toggleRule(ruleId) {
    this.ruleIds = this.ruleIds.includes(ruleId) ? this.ruleIds.filter(id => id !== ruleId) : [...this.ruleIds, ruleId];
  }
  isRuleSelected(ruleId) {
    return this.ruleIds.includes(ruleId);
  }
  addTask(preset) {
    if (this.dailyTasks.some(t => t.type === preset && preset !== 'custom')) return;
    const base = this.taskPresets.find(p => p.type === preset);
    this.dailyTasks = [...this.dailyTasks, {
      type: preset,
      label: base?.label || null,
      target: base?.target || 1,
      unit: base?.unit || ''
    }];
  }
  removeTask(index) {
    this.dailyTasks = this.dailyTasks.filter((_, i) => i !== index);
  }
  get validationError() {
    if (!this.name.trim()) return 'Ponle un nombre al protocolo.';
    if (this.dailyTasks.some(t => !(Number(t.target) > 0))) {
      return 'Cada hábito necesita un objetivo mayor que 0.';
    }
    // Un protocolo que no hace nada se puede guardar sin error, pero avisa:
    // es casi seguro un olvido, no una intención.
    const hasContent = this.kcalTotal !== null || this.checkinTemplateId || this.dietTemplateId || this.routineTemplateId || this.ruleIds.length || this.dailyTasks.length;
    if (!hasContent) return 'Añade al menos una cosa: macros, una plantilla, una regla o un hábito.';
    return null;
  }
  save() {
    const error = this.validationError;
    if (error) {
      void this.ionicUtilService.showWarningToast(error);
      return;
    }
    if (this.isSaving) return;
    this.isSaving = true;
    const payload = {
      name: this.name.trim(),
      description: this.description.trim(),
      nutritionalGoal: {
        kcalTotal: this.kcalTotal === null ? null : Number(this.kcalTotal),
        proteinsGTotal: this.proteinsGTotal === null ? null : Number(this.proteinsGTotal),
        carbohydratesGTotal: this.carbohydratesGTotal === null ? null : Number(this.carbohydratesGTotal),
        fatGTotal: this.fatGTotal === null ? null : Number(this.fatGTotal)
      },
      checkinTemplateId: this.checkinTemplateId || null,
      dietTemplateId: this.dietTemplateId || null,
      routineTemplateId: this.routineTemplateId || null,
      ruleIds: this.ruleIds,
      dailyTasks: this.dailyTasks.map(t => ({
        ...t,
        target: Number(t.target)
      }))
    };
    const request$ = this.editingId ? this.coachProtocolsApi.update(this.editingId, payload) : this.coachProtocolsApi.create(payload);
    request$.subscribe({
      next: () => {
        this.isSaving = false;
        this.showEditor = false;
        this.load();
      },
      error: error => {
        this.isSaving = false;
        void this.ionicUtilService.showErrorToast(error, 'No se pudo guardar el protocolo');
      }
    });
  }
  confirmDelete(protocol) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.ionicUtilService.showAlert({
        header: 'Eliminar protocolo',
        message: `"${protocol.name}" desaparecerá de tu biblioteca. Los clientes a los que ya se lo aplicaste conservan todo lo que se les asignó.`,
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            _this.coachProtocolsApi.remove(protocol._id).subscribe({
              next: () => {
                _this.protocols = _this.protocols.filter(p => p._id !== protocol._id);
              },
              error: error => void _this.ionicUtilService.showErrorToast(error, 'No se pudo eliminar el protocolo')
            });
          }
        }]
      });
    })();
  }
  // --- Aplicar ---
  applyProtocol(protocol) {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this2.modalController.create({
        component: _clients_components_select_clients_modal_select_clients_modal_component__WEBPACK_IMPORTED_MODULE_2__.SelectClientsModalComponent,
        componentProps: {
          title: `Aplicar "${protocol.name}"`
        }
      });
      yield modal.present();
      const {
        data,
        role
      } = yield modal.onWillDismiss();
      if (role !== 'confirm' || !data?.targetClientIds?.length) return;
      _this2.applyingId = protocol._id;
      _this2.applyResults = [];
      _this2.coachProtocolsApi.applyToClients(protocol._id, data.targetClientIds).subscribe({
        next: results => {
          _this2.applyingId = null;
          _this2.applyResults = results;
          const failed = results.filter(r => !r.success).length;
          if (!failed) {
            void _this2.ionicUtilService.showSuccessToast(`Protocolo aplicado a ${results.length} cliente${results.length === 1 ? '' : 's'}`);
          } else {
            void _this2.ionicUtilService.showWarningToast(`${results.length - failed} de ${results.length} aplicados. Revisa el detalle.`);
          }
        },
        error: error => {
          _this2.applyingId = null;
          void _this2.ionicUtilService.showErrorToast(error, 'No se pudo aplicar el protocolo');
        }
      });
    })();
  }
  dismissResults() {
    this.applyResults = [];
  }
  // --- Resumen para la tarjeta ---
  contentSummary(protocol) {
    const parts = [];
    if (protocol.nutritionalGoal?.kcalTotal !== null && protocol.nutritionalGoal?.kcalTotal !== undefined) {
      parts.push(`${protocol.nutritionalGoal.kcalTotal} kcal`);
    }
    if (protocol.checkinTemplateId) parts.push('Check-in');
    if (protocol.dietTemplateId) parts.push('Plan de dieta');
    if (protocol.routineTemplateId) parts.push('Rutina');
    if (protocol.ruleIds?.length) {
      parts.push(`${protocol.ruleIds.length} automatización${protocol.ruleIds.length === 1 ? '' : 'es'}`);
    }
    if (protocol.dailyTasks?.length) {
      parts.push(`${protocol.dailyTasks.length} hábito${protocol.dailyTasks.length === 1 ? '' : 's'}`);
    }
    return parts;
  }
  trackByProtocolId(_index, protocol) {
    return protocol._id;
  }
  trackByIndex(index) {
    return index;
  }
}
_ProtocolsPage = ProtocolsPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ProtocolsPage, "\u0275fac", function ProtocolsPage_Factory(t) {
  return new (t || _ProtocolsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_coach_protocols_api_service__WEBPACK_IMPORTED_MODULE_4__.CoachProtocolsApiService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_checkin_templates_services_checkin_templates_api_service__WEBPACK_IMPORTED_MODULE_5__.CheckinTemplatesApiService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_diet_templates_services_diet_template_api_service__WEBPACK_IMPORTED_MODULE_6__.DietTemplateApiService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_core_services_routine_template_routine_template_api_service__WEBPACK_IMPORTED_MODULE_7__.RoutineTemplateApiService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_automations_services_coach_rules_api_service__WEBPACK_IMPORTED_MODULE_8__.CoachRulesApiService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_9__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_14__.ModalController));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ProtocolsPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: _ProtocolsPage,
  selectors: [["app-protocols"]],
  decls: 20,
  vars: 7,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["type", "button", "routerLink", "/tabs/templates", "aria-label", "Volver a plantillas", 1, "tf-page-header__back-button"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], ["type", "button", "aria-label", "Nuevo protocolo", 1, "tf-page-header__back-button", 3, "click"], ["name", "add-outline"], [1, "protocols-content"], ["class", "page-skeleton", 4, "ngIf"], ["class", "page-state", 4, "ngIf"], ["class", "page-state page-state--intro", 4, "ngIf"], ["class", "results-card", 4, "ngIf"], ["class", "protocol-list", 4, "ngIf"], ["class", "panel-backdrop", 3, "click", 4, "ngIf"], ["class", "panel-sheet", "role", "dialog", "aria-modal", "true", "aria-labelledby", "protocol-editor-title", 4, "ngIf"], [1, "page-skeleton"], [1, "skeleton-block", "protocol-card-skeleton"], [1, "page-state"], ["name", "cloud-offline-outline", "aria-hidden", "true"], ["type", "button", 1, "retry-button", 3, "click"], [1, "page-state", "page-state--intro"], ["name", "layers-outline", "aria-hidden", "true"], ["type", "button", 1, "primary-button", 3, "click"], [1, "results-card"], [1, "results-head"], [1, "results-title"], ["type", "button", 1, "link-button", 3, "click"], ["class", "result-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "result-row"], [1, "result-head"], ["aria-hidden", "true", 3, "name"], [1, "result-client"], ["class", "result-error", 4, "ngIf"], ["class", "step-list", 4, "ngIf"], [1, "result-error"], [1, "step-list"], ["class", "step-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "step-row"], [1, "step-label"], [1, "step-status"], [1, "protocol-list"], ["class", "protocol-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "protocol-card"], [1, "protocol-main"], [1, "protocol-name"], ["class", "protocol-description", 4, "ngIf"], [1, "content-chips"], ["class", "content-chip", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "content-chip content-chip--empty", 4, "ngIf"], [1, "protocol-actions"], ["type", "button", 1, "apply-button", 3, "disabled", "click"], [4, "ngIf"], ["name", "dots", 4, "ngIf"], ["type", "button", 1, "icon-button", 3, "click"], ["name", "create-outline", "aria-hidden", "true"], ["type", "button", 1, "icon-button", "icon-button--danger", 3, "click"], ["name", "trash-outline", "aria-hidden", "true"], [1, "protocol-description"], [1, "content-chip"], [1, "content-chip", "content-chip--empty"], ["name", "dots"], [1, "panel-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "protocol-editor-title", 1, "panel-sheet"], ["aria-hidden", "true", 1, "panel-handle"], ["id", "protocol-editor-title", 1, "panel-title"], ["for", "protocol-name", 1, "field-label"], [1, "input-wrapper"], ["id", "protocol-name", "type", "text", "maxlength", "100", "placeholder", "Definici\u00F3n", 1, "input-field", 3, "ngModel", "ngModelChange"], ["for", "protocol-description", 1, "field-label"], [1, "field-optional"], ["id", "protocol-description", "type", "text", "maxlength", "500", "placeholder", "Fase de d\u00E9ficit moderado", 1, "input-field", 3, "ngModel", "ngModelChange"], [1, "section-title"], [1, "section-hint"], [1, "macro-grid"], [1, "macro-field"], ["for", "protocol-kcal", 1, "field-label"], ["id", "protocol-kcal", "type", "number", "min", "0", 1, "builder-input", 3, "ngModel", "ngModelChange"], ["for", "protocol-protein", 1, "field-label"], ["id", "protocol-protein", "type", "number", "min", "0", 1, "builder-input", 3, "ngModel", "ngModelChange"], ["for", "protocol-carbs", 1, "field-label"], ["id", "protocol-carbs", "type", "number", "min", "0", 1, "builder-input", 3, "ngModel", "ngModelChange"], ["for", "protocol-fat", 1, "field-label"], ["id", "protocol-fat", "type", "number", "min", "0", 1, "builder-input", 3, "ngModel", "ngModelChange"], ["for", "protocol-checkin", 1, "field-label"], ["id", "protocol-checkin", 1, "builder-select", 3, "ngModel", "ngModelChange"], [3, "ngValue"], [3, "ngValue", 4, "ngFor", "ngForOf"], ["for", "protocol-diet", 1, "field-label"], ["id", "protocol-diet", 1, "builder-select", 3, "ngModel", "ngModelChange"], ["for", "protocol-routine", 1, "field-label"], ["id", "protocol-routine", 1, "builder-select", 3, "ngModel", "ngModelChange"], ["class", "section-hint", 4, "ngIf"], ["class", "rule-chips", 4, "ngIf"], [1, "task-add-row"], ["type", "button", "class", "add-chip", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "task-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "panel-actions"], ["class", "save-error", 4, "ngIf"], [1, "panel-buttons"], ["type", "button", 1, "cancel-button", 3, "click"], ["type", "button", 1, "submit-button", 3, "disabled", "click"], [1, "rule-chips"], ["type", "button", "class", "rule-chip", 3, "rule-chip--active", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "rule-chip", 3, "click"], ["type", "button", 1, "add-chip", 3, "click"], ["name", "add-outline", "aria-hidden", "true"], [1, "task-row"], [1, "task-name"], ["type", "number", "min", "0", 1, "builder-input", "builder-input--narrow", 3, "ngModel", "ngModelChange"], [1, "task-unit"], ["name", "close-outline", "aria-hidden", "true"], [1, "save-error"]],
  template: function ProtocolsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](5, "ion-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "div", 6)(7, "h1", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](8, "Protocolos");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](9, "div", 8)(10, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ProtocolsPage_Template_button_click_10_listener() {
        return ctx.openEditor();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](11, "ion-icon", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "ion-content", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](13, ProtocolsPage_div_13_Template, 3, 0, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](14, ProtocolsPage_div_14_Template, 6, 0, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](15, ProtocolsPage_div_15_Template, 17, 0, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](16, ProtocolsPage_section_16_Template, 7, 2, "section", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](17, ProtocolsPage_ul_17_Template, 2, 2, "ul", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](18, ProtocolsPage_div_18_Template, 1, 0, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](19, ProtocolsPage_div_19_Template, 72, 26, "div", 18);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.state === "loading");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.state === "error");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.state === "loaded" && !ctx.protocols.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.applyResults.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.state === "loaded" && ctx.protocols.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.showEditor);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.showEditor);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_16__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_16__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonSpinner, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.RouterLinkDelegate, _angular_router__WEBPACK_IMPORTED_MODULE_17__.RouterLink],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-backdrop-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-sheet-in {\n  from {\n    transform: translateY(16px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-side-panel-in {\n  from {\n    transform: translateX(24px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n.protocols-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 20px;\n  --padding-end: 20px;\n  --padding-top: 12px;\n  --padding-bottom: 32px;\n}\n\n.page-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-4);\n}\n\n.skeleton-block[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n  border-radius: var(--tf-radius-lg);\n}\n.skeleton-block[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n\n.protocol-card-skeleton[_ngcontent-%COMP%] {\n  height: 132px;\n}\n\n.page-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: var(--tf-space-3);\n  padding: var(--tf-space-12) var(--tf-space-6);\n  color: var(--tf-text-muted);\n}\n.page-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 34px;\n  color: var(--tf-text-faint);\n}\n.page-state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-lg);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n.page-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-sm);\n  line-height: var(--tf-line-height-base);\n  max-width: 56ch;\n}\n.page-state[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  font-style: normal;\n  font-weight: 600;\n  color: var(--tf-text-secondary);\n}\n\n.page-state--intro[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--tf-accent);\n}\n\n.retry-button[_ngcontent-%COMP%] {\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-5);\n  background: var(--tf-surface-5);\n  color: var(--tf-text);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-sm);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  font-weight: 700;\n  cursor: pointer;\n}\n.retry-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.primary-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: var(--tf-radius-lg);\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-6);\n  margin-top: var(--tf-space-2);\n  font-size: var(--tf-font-size-base);\n}\n.primary-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.primary-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.primary-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n\n.protocol-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-3);\n}\n\n.protocol-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--tf-space-4);\n  padding: var(--tf-space-4);\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n  flex-wrap: wrap;\n}\n\n.protocol-main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 200px;\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-2);\n}\n\n.protocol-name[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-md);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.protocol-description[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-sm);\n  line-height: var(--tf-line-height-base);\n  color: var(--tf-text-secondary);\n  max-width: 68ch;\n}\n\n.content-chips[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--tf-space-2);\n}\n\n.content-chip[_ngcontent-%COMP%] {\n  padding: 2px var(--tf-space-2);\n  border-radius: var(--tf-radius-pill);\n  background: var(--tf-surface-4);\n  color: var(--tf-text-secondary);\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n  white-space: nowrap;\n}\n.content-chip--empty[_ngcontent-%COMP%] {\n  background: transparent;\n  border: 1px dashed var(--tf-border-strong);\n  color: var(--tf-text-muted);\n  font-weight: 400;\n}\n\n.protocol-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n}\n\n.apply-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: var(--tf-radius-md);\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: var(--tf-touch-min);\n  min-width: 96px;\n  padding: 0 var(--tf-space-4);\n  font-size: var(--tf-font-size-sm);\n}\n.apply-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.apply-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.apply-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n\n.icon-button[_ngcontent-%COMP%] {\n  --background: var(--tf-surface-3);\n  --background-activated: var(--tf-surface-4);\n  --background-hover: var(--tf-surface-4);\n  --background-focused: var(--tf-surface-4);\n  --color: var(--tf-text-secondary);\n  --border-radius: var(--tf-radius-sm);\n  --padding-start: 0;\n  --padding-end: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  background: var(--tf-surface-3);\n  color: var(--tf-text-secondary);\n  border: none;\n  border-radius: var(--tf-radius-sm);\n  width: var(--tf-touch-min);\n  height: var(--tf-touch-min);\n  min-width: var(--tf-touch-min);\n  min-height: var(--tf-touch-min);\n  margin: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: background var(--tf-duration-fast) var(--tf-ease-out), color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.icon-button[_ngcontent-%COMP%]:active {\n  background: var(--tf-surface-4);\n}\n.icon-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.icon-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.icon-button--danger[_ngcontent-%COMP%]:hover {\n  background: var(--tf-danger-soft);\n  color: var(--tf-danger-text);\n}\n\n.results-card[_ngcontent-%COMP%] {\n  margin-bottom: var(--tf-space-4);\n  padding: var(--tf-space-4);\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n}\n\n.results-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: var(--tf-space-3);\n}\n\n.results-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-md);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.link-button[_ngcontent-%COMP%] {\n  position: relative;\n  background: transparent;\n  border: none;\n  padding: 0;\n  color: var(--tf-accent-text);\n  font-family: inherit;\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n  cursor: pointer;\n}\n.link-button[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  min-width: var(--tf-touch-min);\n  width: 100%;\n  height: var(--tf-touch-min);\n  transform: translate(-50%, -50%);\n}\n.link-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 3px;\n}\n\n.result-row[_ngcontent-%COMP%] {\n  padding: var(--tf-space-3) 0;\n  border-bottom: 1px solid var(--tf-border-subtle);\n}\n.result-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.result-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n}\n.result-head[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n\n.result-icon--ok[_ngcontent-%COMP%] {\n  color: var(--tf-success);\n}\n\n.result-icon--fail[_ngcontent-%COMP%] {\n  color: var(--tf-danger-text);\n}\n\n.result-client[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.result-error[_ngcontent-%COMP%] {\n  margin: var(--tf-space-1) 0 0 26px;\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-danger-text);\n}\n\n.step-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: var(--tf-space-2) 0 0 26px;\n  padding: 0;\n}\n\n.step-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: var(--tf-space-3);\n  padding: 3px 0;\n  font-size: var(--tf-font-size-xs);\n}\n\n.step-label[_ngcontent-%COMP%] {\n  color: var(--tf-text-secondary);\n}\n\n.step-status[_ngcontent-%COMP%] {\n  color: var(--tf-success);\n  font-weight: 600;\n}\n.step-status--skipped[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  font-weight: 400;\n}\n.step-status--failed[_ngcontent-%COMP%] {\n  color: var(--tf-danger-text);\n}\n\n.panel-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: var(--tf-overlay);\n  z-index: var(--tf-z-modal-backdrop, 400);\n  animation: _ngcontent-%COMP%_tf-backdrop-in 200ms var(--tf-ease-out) both;\n}\n@media (prefers-reduced-motion: reduce) {\n  .panel-backdrop[_ngcontent-%COMP%] {\n    animation: none;\n    opacity: 1;\n  }\n}\n\n.panel-sheet[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: var(--tf-z-modal, 500);\n  background: var(--tf-surface-1);\n  border-top: 1px solid var(--tf-border-strong);\n  border-radius: 20px 20px 0 0;\n  padding: 10px 16px 24px;\n  max-height: 80vh;\n  overflow-y: auto;\n  animation: _ngcontent-%COMP%_tf-sheet-in 260ms var(--tf-ease-out) both;\n}\n@media (prefers-reduced-motion: reduce) {\n  .panel-sheet[_ngcontent-%COMP%] {\n    animation: none;\n    opacity: 1;\n    transform: none;\n  }\n}\n@media (min-width: 768px) {\n  .panel-sheet[_ngcontent-%COMP%] {\n    max-width: 640px;\n    margin: 0 auto;\n    right: 0;\n    left: 0;\n  }\n}\n\n.panel-handle[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 4px;\n  border-radius: 2px;\n  background: var(--tf-border-strongest);\n  margin: 0 auto 14px;\n}\n\n.panel-title[_ngcontent-%COMP%] {\n  margin: 0 0 var(--tf-space-4);\n  font-size: var(--tf-font-size-lg);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.section-title[_ngcontent-%COMP%] {\n  margin: var(--tf-space-6) 0 var(--tf-space-1);\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  color: var(--tf-text-secondary);\n}\n\n.section-hint[_ngcontent-%COMP%] {\n  margin: 0 0 var(--tf-space-3);\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-text-muted);\n  line-height: var(--tf-line-height-base);\n}\n\n.field-label[_ngcontent-%COMP%] {\n  display: block;\n  margin: var(--tf-space-3) 0 var(--tf-space-2);\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n  color: var(--tf-text-secondary);\n}\n\n.field-optional[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--tf-text-muted);\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n  height: var(--tf-touch-min);\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.input-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n  font-size: var(--tf-font-size-base);\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.builder-select[_ngcontent-%COMP%], .builder-input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-3);\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-md);\n  color: var(--tf-text);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n}\n.builder-select[_ngcontent-%COMP%]:focus-visible, .builder-input[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.builder-select[_ngcontent-%COMP%] {\n  padding-right: var(--tf-space-8);\n  cursor: pointer;\n  -webkit-appearance: none;\n          appearance: none;\n  background-image: linear-gradient(45deg, transparent 50%, var(--tf-text-muted) 50%), linear-gradient(135deg, var(--tf-text-muted) 50%, transparent 50%);\n  background-position: calc(100% - 18px) calc(50% + 2px), calc(100% - 13px) calc(50% + 2px);\n  background-size: 5px 5px, 5px 5px;\n  background-repeat: no-repeat;\n}\n.builder-select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  background: var(--tf-surface-2);\n  color: var(--tf-text);\n}\n\n.builder-input[_ngcontent-%COMP%] {\n  font-variant-numeric: tabular-nums;\n}\n.builder-input--narrow[_ngcontent-%COMP%] {\n  width: 90px;\n}\n\n.macro-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: var(--tf-space-3);\n}\n\n.macro-field[_ngcontent-%COMP%]   .field-label[_ngcontent-%COMP%] {\n  margin-top: 0;\n}\n\n.rule-chips[_ngcontent-%COMP%], .task-add-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--tf-space-2);\n}\n\n.rule-chip[_ngcontent-%COMP%], .add-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-4);\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-pill);\n  color: var(--tf-text-secondary);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  cursor: pointer;\n  transition: background var(--tf-duration-fast) var(--tf-ease-out), border-color var(--tf-duration-fast) var(--tf-ease-out), color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.rule-chip[_ngcontent-%COMP%]:focus-visible, .add-chip[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.rule-chip--active[_ngcontent-%COMP%] {\n  background: var(--tf-accent-soft);\n  border-color: var(--tf-accent-soft-border);\n  color: var(--tf-accent-text);\n}\n\n.add-chip[_ngcontent-%COMP%] {\n  border-style: dashed;\n}\n.add-chip[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n\n.task-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n  margin-top: var(--tf-space-2);\n  padding: var(--tf-space-2) var(--tf-space-3);\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-md);\n}\n\n.task-name[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text);\n}\n\n.task-unit[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-text-muted);\n  min-width: 42px;\n}\n\n.panel-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-3);\n  margin-top: var(--tf-space-6);\n}\n\n.save-error[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-muted);\n}\n\n.panel-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--tf-space-3);\n}\n\n.cancel-button[_ngcontent-%COMP%] {\n  flex: 1;\n  height: var(--tf-touch-min);\n  background: var(--tf-surface-3);\n  color: var(--tf-text-secondary);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n  font-family: inherit;\n  font-size: var(--tf-font-size-base);\n  font-weight: 600;\n  cursor: pointer;\n}\n.cancel-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: var(--tf-radius-lg);\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  flex: 1;\n  height: var(--tf-touch-min);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: var(--tf-font-size-base);\n}\n.submit-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvcHJvdG9jb2xzL3Byb3RvY29scy5wYWdlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX3BhbmVsLXNoZWV0LnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX2J1dHRvbnMuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9faW5wdXRzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJBO0VBQ0U7SUFDRSwyQkFBQTtFQ3hCRjtBQUNGO0FDb0RBO0VBQ0U7SUFDRSxVQUFBO0VEbERGO0VDb0RBO0lBQ0UsVUFBQTtFRGxERjtBQUNGO0FDcURBO0VBQ0U7SUFDRSwyQkFBQTtJQUNBLFVBQUE7RURuREY7RUNxREE7SUFDRSx3QkFBQTtJQUNBLFVBQUE7RURuREY7QUFDRjtBQ3FIQTtFQUNFO0lBQ0UsMkJBQUE7SUFDQSxVQUFBO0VEbkhGO0VDcUhBO0lBQ0Usd0JBQUE7SUFDQSxVQUFBO0VEbkhGO0FBQ0Y7QUEzQkE7RUFDRSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0FBNkJGOztBQTFCQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHNCQUFBO0FBNkJGOztBQTFCQTtFRGRFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSwrQkFBQTtFQ2NBLGtDQUFBO0FBK0JGO0FEM0NFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLDRCQUFBO0VBQ0EsK0VBQUE7RUFDQSxtQ0FBQTtBQzZDSjtBRDFDRTtFQUNFO0lBQ0UsZUFBQTtFQzRDSjtBQUNGOztBQXpDQTtFQUNFLGFBQUE7QUE0Q0Y7O0FBekNBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsNkNBQUE7RUFDQSwyQkFBQTtBQTRDRjtBQTFDRTtF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YUFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSw2QkFBQTtFQUNBLDRDQUFBO0VBQ0EsK0JBQUE7RUFDQSxrQ0FBQTtFQUNBLGtDQUFBO0FBa0lGOztBQS9IQTtFQUNFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsaUNBQUE7RUFDQSxxQkFBQTtBQWtJRjs7QUEvSEE7RUFDRSxpQ0FBQTtFQUNBLDJCQUFBO0VBQ0EsZUFBQTtBQWtJRjs7QUEvSEE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtFQUNBLDZCQUFBO0FBa0lGOztBQS9IQTtFQUNFLFNBQUE7RUFDQSxpQ0FBQTtFQUNBLDJCQUFBO0FBa0lGOztBQS9IQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtBQWtJRjs7QUEvSEE7RUFDRSxPQUFBO0VBQ0EsMkJBQUE7RUFDQSwrQkFBQTtFQUNBLCtCQUFBO0VBQ0Esa0NBQUE7RUFDQSxrQ0FBQTtFQUNBLG9CQUFBO0VBQ0EsbUNBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFrSUY7QUFoSUU7RUFDRSxtQ0FBQTtFQUNBLG1CQUFBO0FBa0lKOztBQTlIQTtFRXJoQkUsWUFBQTtFQUNBLGtDRnFoQjRCO0VFcGhCNUIscUNBQUE7RUFDQSxnQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGdGQUFBO0VGa2hCQSxPQUFBO0VBQ0EsMkJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLG1DQUFBO0FBc0lGO0FFM3BCRTtFQUNFLHNCQUFBO0FGNnBCSjtBRTFwQkU7RUFDRSxhQUFBO0VBQ0EsZUFBQTtBRjRwQko7QUV6cEJFO0VBQ0UsaUNBQUE7RUFDQSxtQkFBQTtBRjJwQkoiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTa2VsZXRvbiBkZSBjYXJnYSBjb24gYmFycmlkbyBkZSBzaGltbWVyIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gbGl0ZXJhbG1lbnRlXG4vLyBlbiB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgKGJvcmRlci1yYWRpdXMsIGhlaWdodCwgd2lkdGgsIHZhcmlhbnRlcyBjb24gbm9tYnJlKS5cbkBtaXhpbiB0Zi1za2VsZXRvbi1zaGltbWVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuXG4gICY6OmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHRyYW5zcGFyZW50LCB2YXIoLS10Zi1zaGltbWVyKSwgdHJhbnNwYXJlbnQpO1xuICAgIGFuaW1hdGlvbjogdGYtc2hpbW1lciAxLjRzIGluZmluaXRlO1xuICB9XG5cbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICAmOjphZnRlciB7XG4gICAgICBhbmltYXRpb246IG5vbmU7XG4gICAgfVxuICB9XG59XG5cbkBrZXlmcmFtZXMgdGYtc2hpbW1lciB7XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgfVxufVxuIiwiQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvc2tlbGV0b24nO1xuQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvYnV0dG9ucyc7XG5AaW1wb3J0ICcuLi8uLi8uLi90aGVtZS9wYW5lbC1zaGVldCc7XG5AaW1wb3J0ICcuLi8uLi8uLi90aGVtZS9pbnB1dHMnO1xuXG4ucHJvdG9jb2xzLWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLXRmLWJnKTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAyMHB4O1xuICAtLXBhZGRpbmctZW5kOiAyMHB4O1xuICAtLXBhZGRpbmctdG9wOiAxMnB4O1xuICAtLXBhZGRpbmctYm90dG9tOiAzMnB4O1xufVxuXG4ucGFnZS1za2VsZXRvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtNCk7XG59XG5cbi5za2VsZXRvbi1ibG9jayB7XG4gIEBpbmNsdWRlIHRmLXNrZWxldG9uLXNoaW1tZXI7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1sZyk7XG59XG5cbi5wcm90b2NvbC1jYXJkLXNrZWxldG9uIHtcbiAgaGVpZ2h0OiAxMzJweDtcbn1cblxuLnBhZ2Utc3RhdGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTEyKSB2YXIoLS10Zi1zcGFjZS02KTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDM0cHg7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtZmFpbnQpO1xuICB9XG5cbiAgaDIge1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1sZyk7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIH1cblxuICBwIHtcbiAgICBtYXJnaW46IDA7XG4gICAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICAgIGxpbmUtaGVpZ2h0OiB2YXIoLS10Zi1saW5lLWhlaWdodC1iYXNlKTtcbiAgICBtYXgtd2lkdGg6IDU2Y2g7XG4gIH1cblxuICBlbSB7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgfVxufVxuXG4ucGFnZS1zdGF0ZS0taW50cm8gaW9uLWljb24ge1xuICBjb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbn1cblxuLnJldHJ5LWJ1dHRvbiB7XG4gIG1pbi1oZWlnaHQ6IHZhcigtLXRmLXRvdWNoLW1pbik7XG4gIHBhZGRpbmc6IDAgdmFyKC0tdGYtc3BhY2UtNSk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNSk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1zbSk7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLnByaW1hcnktYnV0dG9uIHtcbiAgQGluY2x1ZGUgdGYtZ3JhZGllbnQtYnV0dG9uKHZhcigtLXRmLXJhZGl1cy1sZykpO1xuXG4gIG1pbi1oZWlnaHQ6IHZhcigtLXRmLXRvdWNoLW1pbik7XG4gIHBhZGRpbmc6IDAgdmFyKC0tdGYtc3BhY2UtNik7XG4gIG1hcmdpbi10b3A6IHZhcigtLXRmLXNwYWNlLTIpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1iYXNlKTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBMaXN0YWRvXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi5wcm90b2NvbC1saXN0IHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTMpO1xufVxuXG4ucHJvdG9jb2wtY2FyZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTQpO1xuICBwYWRkaW5nOiB2YXIoLS10Zi1zcGFjZS00KTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0xKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLWxnKTtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4ucHJvdG9jb2wtbWFpbiB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMjAwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG59XG5cbi5wcm90b2NvbC1uYW1lIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1tZCk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbn1cblxuLnByb3RvY29sLWRlc2NyaXB0aW9uIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGxpbmUtaGVpZ2h0OiB2YXIoLS10Zi1saW5lLWhlaWdodC1iYXNlKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgbWF4LXdpZHRoOiA2OGNoO1xufVxuXG4vLyBRdcODwqkgbGxldmEgZGVudHJvIGVsIHByb3RvY29sbywgZGUgdW4gdmlzdGF6bzogZXMgbGEgw4PCum5pY2EgZm9ybWEgZGVcbi8vIGRpc3Rpbmd1aXIgZG9zIHByb3RvY29sb3MgY29uIG5vbWJyZXMgcGFyZWNpZG9zIHNpbiBhYnJpcmxvcy5cbi5jb250ZW50LWNoaXBzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTIpO1xufVxuXG4uY29udGVudC1jaGlwIHtcbiAgcGFkZGluZzogMnB4IHZhcigtLXRmLXNwYWNlLTIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtcGlsbCk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuICAmLS1lbXB0eSB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyOiAxcHggZGFzaGVkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICB9XG59XG5cbi5wcm90b2NvbC1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbn1cblxuLmFwcGx5LWJ1dHRvbiB7XG4gIEBpbmNsdWRlIHRmLWdyYWRpZW50LWJ1dHRvbih2YXIoLS10Zi1yYWRpdXMtbWQpKTtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgbWluLXdpZHRoOiA5NnB4O1xuICBwYWRkaW5nOiAwIHZhcigtLXRmLXNwYWNlLTQpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG59XG5cbi5pY29uLWJ1dHRvbiB7XG4gIEBpbmNsdWRlIHRmLWljb24tYnV0dG9uKHZhcigtLXRmLXRvdWNoLW1pbiksIHZhcigtLXRmLXJhZGl1cy1zbSksIDE4cHgpO1xuXG4gICYtLWRhbmdlcjpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtZGFuZ2VyLXNvZnQpO1xuICAgIGNvbG9yOiB2YXIoLS10Zi1kYW5nZXItdGV4dCk7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBSZXN1bHRhZG8gZGUgYXBsaWNhclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4ucmVzdWx0cy1jYXJkIHtcbiAgbWFyZ2luLWJvdHRvbTogdmFyKC0tdGYtc3BhY2UtNCk7XG4gIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTQpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTEpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbGcpO1xufVxuXG4ucmVzdWx0cy1oZWFkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBtYXJnaW4tYm90dG9tOiB2YXIoLS10Zi1zcGFjZS0zKTtcbn1cblxuLnJlc3VsdHMtdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLW1kKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xufVxuXG4ubGluay1idXR0b24ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQtdGV4dCk7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS14cyk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcblxuICAvLyDDg8KBcmVhIHB1bHNhYmxlIGFsIG3Dg8KtbmltbyB0w4PCoWN0aWwgc2luIGVuZ29yZGFyIGVsIGVubGFjZSDDosKAwpQgbWlzbW8gY3JpdGVyaW9cbiAgLy8gcXVlIC5saW5rLWJ1dHRvbiBlbiBkYXNoYm9hcmQucGFnZS5zY3NzLlxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDUwJTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgbWluLXdpZHRoOiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDNweDtcbiAgfVxufVxuXG4ucmVzdWx0LXJvdyB7XG4gIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTMpIDA7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3VidGxlKTtcblxuICAmOmxhc3QtY2hpbGQge1xuICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gIH1cbn1cblxuLnJlc3VsdC1oZWFkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxN3B4O1xuICB9XG59XG5cbi5yZXN1bHQtaWNvbi0tb2sge1xuICBjb2xvcjogdmFyKC0tdGYtc3VjY2Vzcyk7XG59XG5cbi5yZXN1bHQtaWNvbi0tZmFpbCB7XG4gIGNvbG9yOiB2YXIoLS10Zi1kYW5nZXItdGV4dCk7XG59XG5cbi5yZXN1bHQtY2xpZW50IHtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG59XG5cbi5yZXN1bHQtZXJyb3Ige1xuICBtYXJnaW46IHZhcigtLXRmLXNwYWNlLTEpIDAgMCAyNnB4O1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS14cyk7XG4gIGNvbG9yOiB2YXIoLS10Zi1kYW5nZXItdGV4dCk7XG59XG5cbi5zdGVwLWxpc3Qge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBtYXJnaW46IHZhcigtLXRmLXNwYWNlLTIpIDAgMCAyNnB4O1xuICBwYWRkaW5nOiAwO1xufVxuXG4uc3RlcC1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIHBhZGRpbmc6IDNweCAwO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS14cyk7XG59XG5cbi5zdGVwLWxhYmVsIHtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbn1cblxuLnN0ZXAtc3RhdHVzIHtcbiAgY29sb3I6IHZhcigtLXRmLXN1Y2Nlc3MpO1xuICBmb250LXdlaWdodDogNjAwO1xuXG4gICYtLXNraXBwZWQge1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgICBmb250LXdlaWdodDogNDAwO1xuICB9XG5cbiAgJi0tZmFpbGVkIHtcbiAgICBjb2xvcjogdmFyKC0tdGYtZGFuZ2VyLXRleHQpO1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRWRpdG9yXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi5wYW5lbC1iYWNrZHJvcCB7XG4gIEBpbmNsdWRlIHRmLXBhbmVsLWJhY2tkcm9wO1xufVxuXG4ucGFuZWwtc2hlZXQge1xuICBAaW5jbHVkZSB0Zi1wYW5lbC1zaGVldDtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICBtYXgtd2lkdGg6IDY0MHB4O1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIHJpZ2h0OiAwO1xuICAgIGxlZnQ6IDA7XG4gIH1cbn1cblxuLnBhbmVsLWhhbmRsZSB7XG4gIEBpbmNsdWRlIHRmLXBhbmVsLWhhbmRsZTtcbn1cblxuLnBhbmVsLXRpdGxlIHtcbiAgbWFyZ2luOiAwIDAgdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWxnKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xufVxuXG4uc2VjdGlvbi10aXRsZSB7XG4gIG1hcmdpbjogdmFyKC0tdGYtc3BhY2UtNikgMCB2YXIoLS10Zi1zcGFjZS0xKTtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xufVxuXG4uc2VjdGlvbi1oaW50IHtcbiAgbWFyZ2luOiAwIDAgdmFyKC0tdGYtc3BhY2UtMyk7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBsaW5lLWhlaWdodDogdmFyKC0tdGYtbGluZS1oZWlnaHQtYmFzZSk7XG59XG5cbi5maWVsZC1sYWJlbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IHZhcigtLXRmLXNwYWNlLTMpIDAgdmFyKC0tdGYtc3BhY2UtMik7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbn1cblxuLmZpZWxkLW9wdGlvbmFsIHtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xufVxuXG4uaW5wdXQtd3JhcHBlciB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LXdyYXBwZXIodmFyKC0tdGYtc3VyZmFjZS0yKSk7XG4gIGhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbn1cblxuLmlucHV0LWZpZWxkIHtcbiAgQGluY2x1ZGUgdGYtaW5wdXQtZmllbGQ7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWJhc2UpO1xufVxuXG4uYnVpbGRlci1zZWxlY3QsXG4uYnVpbGRlci1pbnB1dCB7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICBwYWRkaW5nOiAwIHZhcigtLXRmLXNwYWNlLTMpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLW1kKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxufVxuXG4uYnVpbGRlci1zZWxlY3Qge1xuICBwYWRkaW5nLXJpZ2h0OiB2YXIoLS10Zi1zcGFjZS04KTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBhcHBlYXJhbmNlOiBub25lO1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsIHRyYW5zcGFyZW50IDUwJSwgdmFyKC0tdGYtdGV4dC1tdXRlZCkgNTAlKSxcbiAgICBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS10Zi10ZXh0LW11dGVkKSA1MCUsIHRyYW5zcGFyZW50IDUwJSk7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNhbGMoMTAwJSAtIDE4cHgpIGNhbGMoNTAlICsgMnB4KSwgY2FsYygxMDAlIC0gMTNweCkgY2FsYyg1MCUgKyAycHgpO1xuICBiYWNrZ3JvdW5kLXNpemU6IDVweCA1cHgsIDVweCA1cHg7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG5cbiAgb3B0aW9uIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgfVxufVxuXG4uYnVpbGRlci1pbnB1dCB7XG4gIGZvbnQtdmFyaWFudC1udW1lcmljOiB0YWJ1bGFyLW51bXM7XG5cbiAgJi0tbmFycm93IHtcbiAgICB3aWR0aDogOTBweDtcbiAgfVxufVxuXG4ubWFjcm8tZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMyk7XG59XG5cbi5tYWNyby1maWVsZCAuZmllbGQtbGFiZWwge1xuICBtYXJnaW4tdG9wOiAwO1xufVxuXG4ucnVsZS1jaGlwcyxcbi50YXNrLWFkZC1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG59XG5cbi5ydWxlLWNoaXAsXG4uYWRkLWNoaXAge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA0cHg7XG4gIG1pbi1oZWlnaHQ6IHZhcigtLXRmLXRvdWNoLW1pbik7XG4gIHBhZGRpbmc6IDAgdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMik7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1waWxsKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICBib3JkZXItY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpLFxuICAgIGNvbG9yIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLnJ1bGUtY2hpcC0tYWN0aXZlIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LXNvZnQpO1xuICBib3JkZXItY29sb3I6IHZhcigtLXRmLWFjY2VudC1zb2Z0LWJvcmRlcik7XG4gIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQtdGV4dCk7XG59XG5cbi5hZGQtY2hpcCB7XG4gIGJvcmRlci1zdHlsZTogZGFzaGVkO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cbn1cblxuLnRhc2stcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgbWFyZ2luLXRvcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTIpIHZhcigtLXRmLXNwYWNlLTMpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbWQpO1xufVxuXG4udGFzay1uYW1lIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbn1cblxuLnRhc2stdW5pdCB7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBtaW4td2lkdGg6IDQycHg7XG59XG5cbi5wYW5lbC1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgbWFyZ2luLXRvcDogdmFyKC0tdGYtc3BhY2UtNik7XG59XG5cbi5zYXZlLWVycm9yIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbn1cblxuLnBhbmVsLWJ1dHRvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTMpO1xufVxuXG4uY2FuY2VsLWJ1dHRvbiB7XG4gIGZsZXg6IDE7XG4gIGhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLWxnKTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWJhc2UpO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG59XG5cbi5zdWJtaXQtYnV0dG9uIHtcbiAgQGluY2x1ZGUgdGYtZ3JhZGllbnQtYnV0dG9uKHZhcigtLXRmLXJhZGl1cy1sZykpO1xuXG4gIGZsZXg6IDE7XG4gIGhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWJhc2UpO1xufVxuIiwiLy8gQm90dG9tIHNoZWV0IChiYWNrZHJvcCArIHBhbmVsIGRlc2xpemFudGUgZGVzZGUgYWJham8pIMOiwoDClCBkdXBsaWNhZG8gYnl0ZSBhXG4vLyBieXRlIGVuIDIgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPlxuLy8gRmFzZSAzKS4gVGFtYmnDg8KpbiBhcGFyZWNlIGZ1ZXJhIGRlIGVzdGEgYXBwIGVuIHBhY2thZ2VzL3NoYXJlZC1mZWF0dXJlc1xuLy8gKG9uYm9hcmRpbmcsIG15LWNoZWNraW5zLCBldGMuKSDDosKAwpQgZnVlcmEgZGUgYWxjYW5jZSBhcXXDg8KtIHBvcnF1ZSBlc2EgY2FwYSBub1xuLy8gdGllbmUgbG9zIHRva2VucyAtLXRmLSo7IHNpIGVzYXMgcMODwqFnaW5hcyBtaWdyYW4gYSAtLXRmLSogYWxnw4PCum4gZMODwq1hLCBlc3RlXG4vLyBtaXNtbyBwYXJ0aWFsIGVzIGVsIGRlc3Rpbm8gbmF0dXJhbC5cbkBtaXhpbiB0Zi1wYW5lbC1iYWNrZHJvcCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgaW5zZXQ6IDA7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLW92ZXJsYXkpO1xuICB6LWluZGV4OiB2YXIoLS10Zi16LW1vZGFsLWJhY2tkcm9wLCA0MDApO1xuICAvLyBgYm90aGAgeSBubyBlbCB2YWxvciBwb3IgZGVmZWN0byBgbm9uZWA6IHNpbiBmaWxsLW1vZGUgZWwgZWxlbWVudG8gc2VcbiAgLy8gcXVlZGEgZW4gc3UgdmFsb3IgQkFTRSBtaWVudHJhcyBsYSBhbmltYWNpw4PCs24gZXN0w4PCoSBwZW5kaWVudGUgZGUgYXJyYW5jYXJcbiAgLy8gw6LCgMKUcGVzdGHDg8KxYSBlbiBzZWd1bmRvIHBsYW5vLCB3ZWJ2aWV3IHF1ZSBkaWZpZXJlIGVsIHByaW1lciBmcmFtZcOiwoDClCB5IGNvbW9cbiAgLy8gZWwga2V5ZnJhbWUgcGFydGUgZGUgb3BhY2l0eSAwLCBsYSBob2phIGFwYXJlY8ODwq1hIGEgbWVkaWFzLCB0cmFuc2zDg8K6Y2lkYSxcbiAgLy8gZGVqYW5kbyB2ZXIgbGEgZmljaGEgZGUgZGV0csODwqFzLiBNZWRpZG86IGNvbiBsYSBhbmltYWNpw4PCs24gc2luIGF2YW56YXIsXG4gIC8vIG9wYWNpdHkgY29tcHV0YWJhIDAuXG4gIGFuaW1hdGlvbjogdGYtYmFja2Ryb3AtaW4gMjAwbXMgdmFyKC0tdGYtZWFzZS1vdXQpIGJvdGg7XG5cbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICBhbmltYXRpb246IG5vbmU7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuXG5AbWl4aW4gdGYtcGFuZWwtc2hlZXQge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIHotaW5kZXg6IHZhcigtLXRmLXotbW9kYWwsIDUwMCk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMSk7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogMjBweCAyMHB4IDAgMDtcbiAgcGFkZGluZzogMTBweCAxNnB4IDI0cHg7XG4gIG1heC1oZWlnaHQ6IDgwdmg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIGFuaW1hdGlvbjogdGYtc2hlZXQtaW4gMjYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpIGJvdGg7XG5cbiAgLy8gU2luIGFuaW1hY2nDg8KzbiwgZWwgZXN0YWRvIGZpbmFsIHRpZW5lIHF1ZSBxdWVkYXIgZXhwbMODwq1jaXRvOiBgbm9uZWAgYm9ycmFcbiAgLy8gdGFtYmnDg8KpbiBlbCBgYm90aGAgZGUgYXJyaWJhLlxuICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xuICAgIGFuaW1hdGlvbjogbm9uZTtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogbm9uZTtcbiAgfVxufVxuXG5AbWl4aW4gdGYtcGFuZWwtaGFuZGxlIHtcbiAgd2lkdGg6IDM2cHg7XG4gIGhlaWdodDogNHB4O1xuICBib3JkZXItcmFkaXVzOiAycHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLWJvcmRlci1zdHJvbmdlc3QpO1xuICBtYXJnaW46IDAgYXV0byAxNHB4O1xufVxuXG5Aa2V5ZnJhbWVzIHRmLWJhY2tkcm9wLWluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHRmLXNoZWV0LWluIHtcbiAgZnJvbSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDE2cHgpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUGFuZWwgbGF0ZXJhbCBkZXJlY2hvLiBNaXNtYSBwaWV6YSBxdWUgbGEgYm90dG9tIHNoZWV0IHBlcm8gYW5jbGFkbyBhbFxuLy8gbGFkbywgcGFyYSBmb3JtdWxhcmlvcyBsYXJnb3MgcXVlIHNlIHJlbGxlbmFuIG1pcmFuZG8gZWwgY29udGVuaWRvIGRlXG4vLyBkZXRyw4PCoXMgKHN1cGxlbWVudG9zIGp1bnRvIGEgc3VzIGdyw4PCoWZpY2FzLCBwb3IgZWplbXBsbykuXG4vL1xuLy8gRW4gbcODwrN2aWwgTk8gc2UgbGF0ZXJhbGl6YTogNDAwcHggZGUgYW5jaG8gc29icmUgdW5hIHBhbnRhbGxhIGRlIDM5MCBlcyB1bmFcbi8vIGhvamEgYSBwYW50YWxsYSBjb21wbGV0YSBtYWwgaGVjaGEuIFBvciBkZWJham8gZGUgNzY4cHggc2lndWUgc2llbmRvXG4vLyBib3R0b20gc2hlZXQsIHF1ZSBlcyBlbCBnZXN0byBxdWUgbGEgZ2VudGUgZXNwZXJhIGFow4PCrS5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gRWwgdmVsbyBzZSBhY2xhcmEgZW4gZXNjcml0b3JpbzogZWwgcGFuZWwgc2UgbGF0ZXJhbGl6YSBwcmVjaXNhbWVudGUgcGFyYVxuLy8gcG9kZXIgbWlyYXIgbG8gcXVlIGhheSBkZXRyw4PCoXMgbWllbnRyYXMgc2UgcmVsbGVuYSAobGFzIGdyw4PCoWZpY2FzIGRlXG4vLyBwcm9ncmVzbywgYWwgcGF1dGFyIHVuIHN1cGxlbWVudG8pLiBBbCA1MCUgcXVlZGFiYW4gYXBhZ2FkYXMuXG5AbWl4aW4gdGYtc2lkZS1wYW5lbC1iYWNrZHJvcCB7XG4gIEBpbmNsdWRlIHRmLXBhbmVsLWJhY2tkcm9wO1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4yNSk7XG4gIH1cbn1cblxuQG1peGluIHRmLXNpZGUtcGFuZWwoJHdpZHRoOiA0MjBweCkge1xuICBAaW5jbHVkZSB0Zi1wYW5lbC1zaGVldDtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICB0b3A6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGxlZnQ6IGF1dG87XG4gICAgcmlnaHQ6IDA7XG4gICAgd2lkdGg6ICR3aWR0aDtcbiAgICBtYXgtd2lkdGg6IDkydnc7XG4gICAgLy8gMTAwdmggeSBubyBgbm9uZWA6IHNpIHVuIGFuY2VzdHJvIGNvbiBgY29udGFpbmAgY2FwdHVyYSBlbCBmaXhlZFxuICAgIC8vIChpb24tY29udGVudCBsbyBoYWNlKSwgZWwgcGFuZWwgdG9tYSBsYSBhbHR1cmEgZGUgRVNFIGFuY2VzdHJvLiBTaVxuICAgIC8vIG1pZGUgbcODwqFzIHF1ZSBsYSB2ZW50YW5hLCBlbCBwaWUgY29uIEd1YXJkYXIgc2UgcXVlZGEgZnVlcmEgZGVcbiAgICAvLyBwYW50YWxsYS4gTWVkaWRvOiA4NDBweCBkZSBhbHRvIGVuIHVuYSB2ZW50YW5hIGRlIDgwMC5cbiAgICBtYXgtaGVpZ2h0OiAxMDB2aDtcbiAgICAvLyBTaW4gZXN0byBlbCByZWxsZW5vIHNlIHN1bWEgYWwgYW5jaG8geSBhbCBhbHRvOiBlbCBwYW5lbCBtZWTDg8KtYSA0ODFweFxuICAgIC8vIHBpZGllbmRvIDQ0MCwgeSA4NDAgZGUgYWx0byBlbiB1bmEgdmVudGFuYSBkZSA4MDAsIGRlc2JvcmRhbmRvIHBvclxuICAgIC8vIGFiYWpvLiBFc3RlIHByb3llY3RvIG5vIHRpZW5lIHJlc2V0IGdsb2JhbCBkZSBib3gtc2l6aW5nLlxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgYm9yZGVyLXRvcDogbm9uZTtcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtNSkgdmFyKC0tdGYtc3BhY2UtNSkgMDtcbiAgICBhbmltYXRpb246IHRmLXNpZGUtcGFuZWwtaW4gMjYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpIGJvdGg7XG5cbiAgICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xuICAgICAgYW5pbWF0aW9uOiBub25lO1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIHRyYW5zZm9ybTogbm9uZTtcbiAgICB9XG4gIH1cbn1cblxuLy8gRWwgYXNhIGRlIGFycmFzdHJlIHNvbG8gdGllbmUgc2VudGlkbyBlbiBsYSBob2phIGluZmVyaW9yOiBlbiB1biBwYW5lbFxuLy8gbGF0ZXJhbCBubyBoYXkgbmFkYSBxdWUgYXJyYXN0cmFyIGhhY2lhIGFiYWpvLlxuQG1peGluIHRmLXNpZGUtcGFuZWwtaGFuZGxlIHtcbiAgQGluY2x1ZGUgdGYtcGFuZWwtaGFuZGxlO1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cblxuQGtleWZyYW1lcyB0Zi1zaWRlLXBhbmVsLWluIHtcbiAgZnJvbSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDI0cHgpO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG4iLCIvLyBCb3TDg8KzbiBDVEEgY29uIGdyYWRpZW50ZSBkZSBhY2VudG8gw6LCgMKUIG1pc21vIGJsb3F1ZSByZXBldGlkbyBlbiB+MTEgc2l0aW9zIGRlXG4vLyB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgcG9yIGxheW91dCAod2lkdGgsIGhlaWdodCwgZm9udC1zaXplLCBtYXJnaW4pLlxuLy9cbi8vIExhIG1pdGFkIGRlIGxvcyBzaXRpb3Mgb3JpZ2luYWxlcyBubyB0ZW7Dg8KtYW4gdHJhbnNpY2nDg8Kzbi9mZWVkYmFjayBkZSBwdWxzYWNpw4PCs25cbi8vIG5pIDpmb2N1cy12aXNpYmxlIMOiwoDClCBlbCBtaXhpbiBsb3MgYcODwrFhZGUgc2llbXByZSwgY2llcnJhIGVzZSBodWVjbyBkZVxuLy8gY29uc2lzdGVuY2lhIGRlIGludGVyYWNjacODwrNuIChQUk9EVUNULm1kOiBcInVuIHNvbG8gcGF0csODwrNuIHBvciB0aXBvIGRlXG4vLyBjb21wb25lbnRlXCIpIGVuIHZleiBkZSBwZXJwZXR1YXIgbGEgdmFyaWFjacODwrNuIGFjY2lkZW50YWwuXG5AbWl4aW4gdGYtZ3JhZGllbnQtYnV0dG9uKCRyYWRpdXM6IDEycHgpIHtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAkcmFkaXVzO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtZ3JhZGllbnQpO1xuICBjb2xvcjogdmFyKC0tdGYtYWNjZW50LWNvbnRyYXN0KTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpLCBvcGFjaXR5IDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk3KTtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNDU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtdGV4dCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxufVxuXG4vLyBCb3TDg8KzbiBkZSBoZWFkZXIgcXVlIGVzIHNvbG8gdW4gaWNvbm8gw6LCgMKUIG1pc21vIGxvb2sgXCJlbnZ1ZWx0b1wiIHF1ZSB5YSB1c2EgbGFcbi8vIGFwcCBkZSBjb25zdW1pZG9yIGVuIHN1cyB0b29sYmFycyAocGFja2FnZXMvc2hhcmVkLWZlYXR1cmVzLy4uLi9kaWV0cy9cbi8vIGNvbXBvbmVudHMvdG9vbGJhci1jYWxlbmRhcjogZm9uZG8gKyBib3JkZXItcmFkaXVzICsgY2FqYSBmaWphIDQ0eDQ0LCBlblxuLy8gdmV6IGRlbCBpb24tYnV0dG9uIHBsYW5vL3RyYW5zcGFyZW50ZSBxdWUgdGVuw4PCrWEgY2FkYSBwYW50YWxsYSBkZSB0cmFpbmVyc1xuLy8gaGFzdGEgYWhvcmEpLiBUb2tlbmVhZG8gYSBsYSBwYWxldGEgZGUgZXN0YSBhcHAgZW4gdmV6IGRlIHJlcGV0aXIgbG9zXG4vLyByZ2JhKDI1NSwyNTUsMjU1LC4uLikgc3VlbHRvcyBkZWwgb3JpZ2luYWwuXG4vL1xuLy8gU2lydmUgdGFudG8gcGFyYSA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIj4gKHVzYSBsYXMgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzXG4vLyBkZSBJb25pYykgY29tbyBwYXJhIHVuIDxidXR0b24+IG5hdGl2byAodXNhIGxhcyBwcm9waWVkYWRlcyBwbGFuYXMpIMOiwoDClFxuLy8gYW1ib3MgY29leGlzdGVuIGhveSBlbiB0cmFpbmVycyBwYXJhIGVsIG1pc21vIHJvbCBkZSBcInZvbHZlclwiL1wiY2VycmFyXCIuXG5AbWl4aW4gdGYtaWNvbi1idXR0b24oJHNpemU6IDQ0cHgsICRyYWRpdXM6IDEycHgsICRpY29uLXNpemU6IDIwcHgpIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICAtLWJhY2tncm91bmQtYWN0aXZhdGVkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtaG92ZXI6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIC0tYmFja2dyb3VuZC1mb2N1c2VkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIC0tYm9yZGVyLXJhZGl1czogI3skcmFkaXVzfTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAtLXBhZGRpbmctZW5kOiAwO1xuICAtLXBhZGRpbmctdG9wOiAwO1xuICAtLXBhZGRpbmctYm90dG9tOiAwO1xuXG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgd2lkdGg6ICRzaXplO1xuICBoZWlnaHQ6ICRzaXplO1xuICBtaW4td2lkdGg6ICRzaXplO1xuICBtaW4taGVpZ2h0OiAkc2l6ZTtcbiAgbWFyZ2luOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICBjb2xvciB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAkaWNvbi1zaXplO1xuICB9XG59XG5cbi8vIEV4cGFuc29yIGludmlzaWJsZSBkZSB6b25hIHB1bHNhYmxlLlxuLy9cbi8vIFBBUkEgUVXDg8KJOiB1biBjb250cm9sIGNvbXBhY3RvICh1biBpY29ubyBkZSAzMiBweCBlbiB1bmEgZmlsYSBkZSB0YWJsYSwgdW5cbi8vIGVubGFjZSBkZSB0ZXh0byBkZSAxNiBweCkgbm8gbGxlZ2EgYSBsb3MgNDQgcHggcXVlIGV4aWdlIFBST0RVQ1QubWQsIHlcbi8vIGVuZ29yZGFybG8gZGUgdmVyZGFkIGRlc3BsYXphIHRvZG8gbG8gcXVlIHRpZW5lIGFscmVkZWRvciDDosKAwpQgZW4gdW5hIHRhYmxhXG4vLyBkZSB2ZWludGUgZmlsYXMsIDggcHggcG9yIGZpbGEgc29uIG1lZGlhIHBhbnRhbGxhLlxuLy9cbi8vIEVsIHBzZXVkb2VsZW1lbnRvIGNyZWNlIGhhY2lhIGZ1ZXJhIHNpbiBvY3VwYXIgc2l0aW8gZW4gZWwgZmx1am8sIGFzw4PCrSBxdWVcbi8vIGVsIGJvdMODwrNuIHNlIHZlIHBlcXVlw4PCsW8geSBzZSBwdWxzYSBncmFuZGUuXG4vL1xuLy8gQVZJU08gREUgTUVESUNJw4PCk046IGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIE5PIHZlIGVzdGUgcHNldWRvZWxlbWVudG8sIGFzw4PCrVxuLy8gcXVlIGFsIHZlcmlmaWNhciBoYXkgcXVlIHVzYXIgZWxlbWVudEZyb21Qb2ludCBjb24gZWwgZWxlbWVudG8gZGVudHJvIGRlbFxuLy8gdmlld3BvcnQuIEFkZW3Dg8KhcyBlbCBoaXQtdGVzdCBkZXZ1ZWx2ZSAyIHB4IG1lbm9zIHF1ZSBsYSBjYWphIGRlY2xhcmFkYVxuLy8gKGNvbXByb2JhZG86IC00cHggZGEgNDIsIC02cHggZGEgNDYpLCBhc8ODwq0gcXVlIHVuIDQyIG1lZGlkbyBzb24gNDQgcmVhbGVzLlxuLy9cbi8vICRncm93OiBjdcODwqFudG8gY3JlY2UgcG9yIGNhZGEgbGFkby4gNHB4IGxsZXZhIHVuIGNvbnRyb2wgZGUgMzYgcHggYSA0NC5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlcigkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldDogLSN7JGdyb3d9O1xuICB9XG59XG5cbi8vIFZhcmlhbnRlIHF1ZSBzb2xvIGNyZWNlIGVuIFZFUlRJQ0FMLiBQYXJhIGNvbnRyb2xlcyBlbiBmaWxhIGRvbmRlIGVsXG4vLyBleHBhbnNvciBob3Jpem9udGFsIHNlIHNvbGFwYXLDg8KtYSBjb24gZWwgZGUgYWwgbGFkbyB5IHJvYmFyw4PCrWEgc3VzIHRvcXVlcy5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlci15KCRncm93OiA0cHgpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogLSN7JGdyb3d9O1xuICAgIGJvdHRvbTogLSN7JGdyb3d9O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gIH1cbn1cbiIsIi8vIEZpbGEgZGUgaW5wdXQgY29uIGljb25vICh3cmFwcGVyICsgaWNvbm8gKyBjYW1wbykgw6LCgMKUIHJlcGV0aWRhIGVuIDQgcMODwqFnaW5hc1xuLy8gYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS4gRWwgZm9uZG9cbi8vIGRlbCB3cmFwcGVyIGVzIGVsIMODwrpuaWNvIHZhbG9yIHF1ZSB2YXLDg8KtYSBwb3IgcMODwqFnaW5hIChzdXBlcmZpY2llIDEgbyAyIHNlZ8ODwrpuXG4vLyBjb250ZXh0byB2aXN1YWwpLCBkZSBhaMODwq0gZWwgcGFyw4PCoW1ldHJvOyB0YW1hw4PCsW8gZGUgZnVlbnRlL2FsdG8vbWFyZ2VuIHNlXG4vLyBkZWphbiBmdWVyYSBkZWwgbWl4aW4gcG9ycXVlIGNhZGEgcMODwqFnaW5hIGxvcyBmaWphIHNlZ8ODwrpuIHN1IHByb3BpbyBsYXlvdXQuXG5AbWl4aW4gdGYtaW5wdXQtd3JhcHBlcigkYmc6IHZhcigtLXRmLXN1cmZhY2UtMSkpIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xuICBiYWNrZ3JvdW5kOiAkYmc7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAwIDE0cHg7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjpmb2N1cy13aXRoaW4ge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgfVxufVxuXG5AbWl4aW4gdGYtaW5wdXQtaWNvbiB7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbkBtaXhpbiB0Zi1pbnB1dC1maWVsZCB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgb3V0bGluZTogbm9uZTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgaGVpZ2h0OiAxMDAlO1xuXG4gICY6OnBsYWNlaG9sZGVyIHtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
}));


/***/ })

}]);
//# sourceMappingURL=src_app_features_protocols_protocols_module_ts.js.map