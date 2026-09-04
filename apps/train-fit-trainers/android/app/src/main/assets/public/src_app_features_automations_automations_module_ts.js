"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_features_automations_automations_module_ts"],{

/***/ 24426:
/*!********************************************************************!*\
  !*** ./src/app/features/automations/automations-routing.module.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutomationsPageRoutingModule: () => (/* binding */ AutomationsPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _automations_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./automations.page */ 7004);
/* harmony import */ var _pages_rule_builder_rule_builder_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/rule-builder/rule-builder.page */ 80938);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);

var _AutomationsPageRoutingModule;





const routes = [{
  path: '',
  component: _automations_page__WEBPACK_IMPORTED_MODULE_1__.AutomationsPage
},
// ':id' acepta también el literal 'new'. Ruta propia y no un panel dentro
// del listado: una regla es un formulario largo, y con el botón de volver
// del móvil el usuario espera salir de la regla, no de la sección.
{
  path: ':id',
  component: _pages_rule_builder_rule_builder_page__WEBPACK_IMPORTED_MODULE_2__.RuleBuilderPage
}];
class AutomationsPageRoutingModule {}
_AutomationsPageRoutingModule = AutomationsPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AutomationsPageRoutingModule, "\u0275fac", function AutomationsPageRoutingModule_Factory(t) {
  return new (t || _AutomationsPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AutomationsPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _AutomationsPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AutomationsPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](AutomationsPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ }),

/***/ 23507:
/*!************************************************************!*\
  !*** ./src/app/features/automations/automations.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutomationsPageModule: () => (/* binding */ AutomationsPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _clients_components_select_clients_modal_select_clients_modal_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../clients/components/select-clients-modal/select-clients-modal.module */ 10119);
/* harmony import */ var _automations_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./automations-routing.module */ 24426);
/* harmony import */ var _automations_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./automations.page */ 7004);
/* harmony import */ var _pages_rule_builder_rule_builder_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages/rule-builder/rule-builder.page */ 80938);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 69717);

var _AutomationsPageModule;






class AutomationsPageModule {}
_AutomationsPageModule = AutomationsPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AutomationsPageModule, "\u0275fac", function AutomationsPageModule_Factory(t) {
  return new (t || _AutomationsPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AutomationsPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineNgModule"]({
  type: _AutomationsPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AutomationsPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _clients_components_select_clients_modal_select_clients_modal_module__WEBPACK_IMPORTED_MODULE_2__.SelectClientsModalModule, _automations_routing_module__WEBPACK_IMPORTED_MODULE_3__.AutomationsPageRoutingModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵsetNgModuleScope"](AutomationsPageModule, {
    declarations: [_automations_page__WEBPACK_IMPORTED_MODULE_4__.AutomationsPage, _pages_rule_builder_rule_builder_page__WEBPACK_IMPORTED_MODULE_5__.RuleBuilderPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _clients_components_select_clients_modal_select_clients_modal_module__WEBPACK_IMPORTED_MODULE_2__.SelectClientsModalModule, _automations_routing_module__WEBPACK_IMPORTED_MODULE_3__.AutomationsPageRoutingModule]
  });
})();

/***/ }),

/***/ 7004:
/*!**********************************************************!*\
  !*** ./src/app/features/automations/automations.page.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AutomationsPage: () => (/* binding */ AutomationsPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _models_coach_rule_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/coach-rule.model */ 51370);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _services_coach_rules_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/coach-rules-api.service */ 87402);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 54844);


var _AutomationsPage;







function AutomationsPage_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "div", 16)(2, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AutomationsPage_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "No se pudieron cargar tus automatizaciones");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AutomationsPage_div_13_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r4.load());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "Reintentar");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function AutomationsPage_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Tu metodolog\u00EDa, aplicada sola");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, " Una automatizaci\u00F3n vigila a tus clientes por ti y te avisa cuando pasa algo que a ti te importa. Por ejemplo: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "em");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "si el peso apenas baja durante 2 semanas y la adherencia supera el 85%, av\u00EDsame de un posible estancamiento");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, ". ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AutomationsPage_div_14_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r6.createRule());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, " Crear mi primera automatizaci\u00F3n ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function AutomationsPage_ul_15_li_1_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rule_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](rule_r9.description);
  }
}
function AutomationsPage_ul_15_li_1_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-icon", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rule_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", rule_r9.disabledReason, " ");
  }
}
function AutomationsPage_ul_15_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "li", 25)(1, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AutomationsPage_ul_15_li_1_Template_button_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r15);
      const rule_r9 = restoredCtx.$implicit;
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r14.openRule(rule_r9));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "span", 27)(3, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, AutomationsPage_ul_15_li_1_span_7_Template, 2, 1, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "span", 31)(9, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](10, "ion-icon", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](13, "ion-icon", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](16, "ion-icon", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](18, AutomationsPage_ul_15_li_1_span_18_Template, 3, 1, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](19, "div", 37)(20, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AutomationsPage_ul_15_li_1_Template_button_click_20_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r15);
      const rule_r9 = restoredCtx.$implicit;
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r16.toggleRule(rule_r9, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](21, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AutomationsPage_ul_15_li_1_Template_button_click_22_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r15);
      const rule_r9 = restoredCtx.$implicit;
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r17.confirmDelete(rule_r9, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](23, "ion-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const rule_r9 = ctx.$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("rule-card--off", !rule_r9.enabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](rule_r9.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("level-chip--auto", rule_r9.level === "automatic");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r8.levelLabel(rule_r9), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", rule_r9.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", ctx_r8.triggerLabel(rule_r9), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", ctx_r8.conditionsLabel(rule_r9), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", ctx_r8.scopeLabel(rule_r9), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", rule_r9.disabledReason);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("rule-switch--on", rule_r9.enabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r8.isToggling(rule_r9));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("aria-checked", rule_r9.enabled)("aria-label", (rule_r9.enabled ? "Desactivar" : "Activar") + " " + rule_r9.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("aria-label", "Eliminar " + rule_r9.name);
  }
}
function AutomationsPage_ul_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ul", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, AutomationsPage_ul_15_li_1_Template, 24, 17, "li", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r3.rules)("ngForTrackBy", ctx_r3.trackByRuleId);
  }
}
const LEVEL_LABELS = _models_coach_rule_model__WEBPACK_IMPORTED_MODULE_2__.RULE_LEVELS.reduce((acc, l) => ({
  ...acc,
  [l.key]: l.label
}), {});
const TRIGGER_LABELS = _models_coach_rule_model__WEBPACK_IMPORTED_MODULE_2__.RULE_TRIGGERS.reduce((acc, t) => ({
  ...acc,
  [t.key]: t.label
}), {});
// Fase 3 Coach Pro — listado de automatizaciones. El constructor vive en su
// propia ruta (/tabs/automations/:id) porque una regla es un formulario
// largo: dentro de un panel deslizante, el botón de volver del móvil
// cerraría la pantalla entera en vez de la regla a medio escribir.
class AutomationsPage {
  constructor(coachRulesApi, ionicUtilService, router) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "coachRulesApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "state", 'loading');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "rules", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "togglingIds", new Set());
    this.coachRulesApi = coachRulesApi;
    this.ionicUtilService = ionicUtilService;
    this.router = router;
  }
  ionViewWillEnter() {
    this.load();
  }
  load() {
    this.state = 'loading';
    this.coachRulesApi.getMine().subscribe({
      next: rules => {
        this.rules = rules;
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      }
    });
  }
  levelLabel(rule) {
    return LEVEL_LABELS[rule.level] || 'Solo informar';
  }
  triggerLabel(rule) {
    return TRIGGER_LABELS[rule.trigger] || 'Cada día';
  }
  scopeLabel(rule) {
    if (rule.appliesTo === 'all_clients') return 'Todos tus clientes';
    const count = rule.clientIds?.length || 0;
    return `${count} cliente${count === 1 ? '' : 's'}`;
  }
  conditionsLabel(rule) {
    const count = rule.conditions?.length || 0;
    const joiner = rule.conditionLogic === 'any' ? 'o' : 'y';
    return `${count} condición${count === 1 ? '' : 'es'} (${joiner})`;
  }
  isToggling(rule) {
    return this.togglingIds.has(rule._id);
  }
  toggleRule(rule, event) {
    event.stopPropagation();
    if (this.togglingIds.has(rule._id)) return;
    const next = !rule.enabled;
    this.togglingIds.add(rule._id);
    rule.enabled = next;
    // Reactivar a mano limpia el cartel de "se desactivó sola": el motivo ya
    // no describe el estado actual.
    if (next) rule.disabledReason = null;
    this.coachRulesApi.toggle(rule._id, next).subscribe({
      next: () => this.togglingIds.delete(rule._id),
      error: error => {
        this.togglingIds.delete(rule._id);
        rule.enabled = !next;
        void this.ionicUtilService.showErrorToast(error, 'No se pudo cambiar el estado de la regla');
      }
    });
  }
  openRule(rule) {
    void this.router.navigate(['/tabs/automations', rule._id]);
  }
  createRule() {
    void this.router.navigate(['/tabs/automations', 'new']);
  }
  confirmDelete(rule, event) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      event.stopPropagation();
      yield _this.ionicUtilService.showAlert({
        header: 'Eliminar automatización',
        message: `"${rule.name}" dejará de evaluarse. Las alertas que ya generó se conservan.`,
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            _this.coachRulesApi.remove(rule._id).subscribe({
              next: () => {
                _this.rules = _this.rules.filter(r => r._id !== rule._id);
              },
              error: error => void _this.ionicUtilService.showErrorToast(error, 'No se pudo eliminar la regla')
            });
          }
        }]
      });
    })();
  }
  trackByRuleId(_index, rule) {
    return rule._id;
  }
}
_AutomationsPage = AutomationsPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(AutomationsPage, "\u0275fac", function AutomationsPage_Factory(t) {
  return new (t || _AutomationsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_coach_rules_api_service__WEBPACK_IMPORTED_MODULE_3__.CoachRulesApiService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_4__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(AutomationsPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: _AutomationsPage,
  selectors: [["app-automations"]],
  decls: 16,
  vars: 4,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["aria-label", "Abrir men\u00FA de navegaci\u00F3n", 1, "tf-page-header__back-button"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], ["type", "button", "aria-label", "Nueva automatizaci\u00F3n", 1, "tf-page-header__back-button", 3, "click"], ["name", "add-outline"], [1, "automations-content"], ["class", "page-skeleton", 4, "ngIf"], ["class", "page-state", 4, "ngIf"], ["class", "page-state page-state--intro", 4, "ngIf"], ["class", "rule-list", 4, "ngIf"], [1, "page-skeleton"], [1, "skeleton-block", "rule-card-skeleton"], [1, "page-state"], ["name", "cloud-offline-outline", "aria-hidden", "true"], ["type", "button", 1, "retry-button", 3, "click"], [1, "page-state", "page-state--intro"], ["name", "git-branch-outline", "aria-hidden", "true"], ["type", "button", 1, "primary-button", 3, "click"], [1, "rule-list"], ["class", "rule-card", 3, "rule-card--off", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "rule-card"], ["type", "button", 1, "rule-main", 3, "click"], [1, "rule-head"], [1, "rule-name"], [1, "level-chip"], ["class", "rule-description", 4, "ngIf"], [1, "rule-meta"], [1, "rule-meta-item"], ["name", "time-outline", "aria-hidden", "true"], ["name", "funnel-outline", "aria-hidden", "true"], ["name", "people-outline", "aria-hidden", "true"], ["class", "rule-warning", 4, "ngIf"], [1, "rule-actions"], ["type", "button", "role", "switch", 1, "rule-switch", 3, "disabled", "click"], ["aria-hidden", "true", 1, "rule-switch-knob"], ["type", "button", 1, "rule-delete", 3, "click"], ["name", "trash-outline", "aria-hidden", "true"], [1, "rule-description"], [1, "rule-warning"], ["name", "warning-outline", "aria-hidden", "true"]],
  template: function AutomationsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "ion-menu-button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 5)(6, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "Automatizaciones");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "div", 7)(9, "button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AutomationsPage_Template_button_click_9_listener() {
        return ctx.createRule();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](10, "ion-icon", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "ion-content", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](12, AutomationsPage_div_12_Template, 3, 0, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, AutomationsPage_div_13_Template, 6, 0, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, AutomationsPage_div_14_Template, 11, 0, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](15, AutomationsPage_ul_15_Template, 2, 2, "ul", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.state === "loading");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.state === "error");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.state === "loaded" && !ctx.rules.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.state === "loaded" && ctx.rules.length);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonMenuButton],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n.automations-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 20px;\n  --padding-end: 20px;\n  --padding-top: 12px;\n  --padding-bottom: 32px;\n}\n\n.page-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-4);\n}\n\n.skeleton-block[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n  border-radius: var(--tf-radius-lg);\n}\n.skeleton-block[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n\n.rule-card-skeleton[_ngcontent-%COMP%] {\n  height: 116px;\n}\n\n.page-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: var(--tf-space-3);\n  padding: var(--tf-space-12) var(--tf-space-6);\n  color: var(--tf-text-muted);\n}\n.page-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 34px;\n  color: var(--tf-text-faint);\n}\n.page-state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-lg);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n.page-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-sm);\n  line-height: var(--tf-line-height-base);\n  max-width: 52ch;\n}\n.page-state[_ngcontent-%COMP%]   em[_ngcontent-%COMP%] {\n  color: var(--tf-text-secondary);\n  font-style: normal;\n  font-weight: 600;\n}\n\n.page-state--intro[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--tf-accent);\n}\n\n.retry-button[_ngcontent-%COMP%], .primary-button[_ngcontent-%COMP%] {\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-6);\n  font-family: inherit;\n  font-size: var(--tf-font-size-base);\n  cursor: pointer;\n}\n\n.retry-button[_ngcontent-%COMP%] {\n  background: var(--tf-surface-5);\n  color: var(--tf-text);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-sm);\n  font-weight: 700;\n}\n.retry-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.primary-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: var(--tf-radius-lg);\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  margin-top: var(--tf-space-2);\n}\n.primary-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.primary-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.primary-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n\n.rule-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-3);\n}\n\n.rule-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  gap: var(--tf-space-2);\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n  padding-right: var(--tf-space-3);\n  transition: border-color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.rule-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--tf-border-strong);\n}\n\n.rule-card--off[_ngcontent-%COMP%] {\n  opacity: 0.6;\n}\n\n.rule-main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-2);\n  padding: var(--tf-space-4);\n  border: none;\n  background: transparent;\n  color: inherit;\n  font-family: inherit;\n  text-align: left;\n  cursor: pointer;\n}\n.rule-main[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: -2px;\n  border-radius: var(--tf-radius-lg);\n}\n\n.rule-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n  flex-wrap: wrap;\n}\n\n.rule-name[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-md);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.level-chip[_ngcontent-%COMP%] {\n  padding: 2px var(--tf-space-2);\n  border-radius: var(--tf-radius-pill);\n  background: var(--tf-surface-4);\n  color: var(--tf-text-secondary);\n  font-size: var(--tf-font-size-xs);\n  font-weight: 700;\n  white-space: nowrap;\n}\n.level-chip--auto[_ngcontent-%COMP%] {\n  background: var(--tf-accent-soft);\n  color: var(--tf-accent-text);\n}\n\n.rule-description[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-sm);\n  line-height: var(--tf-line-height-base);\n  color: var(--tf-text-secondary);\n  max-width: 68ch;\n}\n\n.rule-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--tf-space-3);\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-text-muted);\n}\n\n.rule-meta-item[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n}\n.rule-meta-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n\n.rule-warning[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--tf-space-2);\n  padding: var(--tf-space-2) var(--tf-space-3);\n  border-radius: var(--tf-radius-sm);\n  background: var(--tf-danger-soft);\n  color: var(--tf-danger-text);\n  font-size: var(--tf-font-size-xs);\n  line-height: var(--tf-line-height-base);\n}\n.rule-warning[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  margin-top: 1px;\n  font-size: 14px;\n}\n\n.rule-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: var(--tf-space-2);\n  flex-shrink: 0;\n}\n\n.rule-switch[_ngcontent-%COMP%] {\n  position: relative;\n  width: 44px;\n  height: 26px;\n  padding: 0;\n  border: none;\n  border-radius: var(--tf-radius-pill);\n  background: var(--tf-surface-4);\n  cursor: pointer;\n  transition: background var(--tf-duration-base) var(--tf-ease-out);\n}\n.rule-switch[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: var(--tf-touch-min);\n  height: var(--tf-touch-min);\n  transform: translate(-50%, -50%);\n}\n.rule-switch--on[_ngcontent-%COMP%] {\n  background: var(--tf-accent);\n}\n.rule-switch[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n.rule-switch[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.rule-switch-knob[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 3px;\n  left: 3px;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background: var(--tf-text);\n  transition: transform var(--tf-duration-base) var(--tf-ease-out);\n}\n.rule-switch--on[_ngcontent-%COMP%]   .rule-switch-knob[_ngcontent-%COMP%] {\n  transform: translateX(18px);\n  background: var(--tf-accent-contrast);\n}\n@media (prefers-reduced-motion: reduce) {\n  .rule-switch-knob[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n\n.rule-delete[_ngcontent-%COMP%] {\n  --background: var(--tf-surface-3);\n  --background-activated: var(--tf-surface-4);\n  --background-hover: var(--tf-surface-4);\n  --background-focused: var(--tf-surface-4);\n  --color: var(--tf-text-secondary);\n  --border-radius: var(--tf-radius-sm);\n  --padding-start: 0;\n  --padding-end: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  background: var(--tf-surface-3);\n  color: var(--tf-text-secondary);\n  border: none;\n  border-radius: var(--tf-radius-sm);\n  width: var(--tf-touch-min);\n  height: var(--tf-touch-min);\n  min-width: var(--tf-touch-min);\n  min-height: var(--tf-touch-min);\n  margin: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: background var(--tf-duration-fast) var(--tf-ease-out), color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.rule-delete[_ngcontent-%COMP%]:active {\n  background: var(--tf-surface-4);\n}\n.rule-delete[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.rule-delete[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.rule-delete[_ngcontent-%COMP%]:hover {\n  background: var(--tf-danger-soft);\n  color: var(--tf-danger-text);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYXV0b21hdGlvbnMvYXV0b21hdGlvbnMucGFnZS5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19idXR0b25zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJBO0VBQ0U7SUFDRSwyQkFBQTtFQ3hCRjtBQUNGO0FBREE7RUFDRSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0FBR0Y7O0FBQUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtBQUdGOztBQUFBO0VEWkUsa0JBQUE7RUFDQSxnQkFBQTtFQUNBLCtCQUFBO0VDWUEsa0NBQUE7QUFLRjtBRGZFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLDRCQUFBO0VBQ0EsK0VBQUE7RUFDQSxtQ0FBQTtBQ2lCSjtBRGRFO0VBQ0U7SUFDRSxlQUFBO0VDZ0JKO0FBQ0Y7O0FBZkE7RUFDRSxhQUFBO0FBa0JGOztBQWZBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0VBQ0EsNkNBQUE7RUFDQSwyQkFBQTtBQWtCRjtBQWhCRTtFQUNFLGVBQUE7RUFDQSwyQkFBQTtBQWtCSjtBQWZFO0VBQ0UsU0FBQTtFQUNBLGlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtBQWlCSjtBQWRFO0VBQ0UsU0FBQTtFQUNBLGlDQUFBO0VBQ0EsdUNBQUE7RUFDQSxlQUFBO0FBZ0JKO0FBYkU7RUFDRSwrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFlSjs7QUFUQTtFQUNFLHVCQUFBO0FBWUY7O0FBVEE7O0VBRUUsK0JBQUE7RUFDQSw0QkFBQTtFQUNBLG9CQUFBO0VBQ0EsbUNBQUE7RUFDQSxlQUFBO0FBWUY7O0FBVEE7RUFDRSwrQkFBQTtFQUNBLHFCQUFB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LHVDQUFBO0VBQ0EseUNBQUE7RUFDQSxpQ0FBQTtFQUNBLG9DQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFFQSwrQkFBQTtFQUNBLCtCQUFBO0VBQ0EsWUFBQTtFQUNBLGtDRCtPNkM7RUM5TzdDLDBCRDhPd0I7RUM3T3hCLDJCRDZPd0I7RUM1T3hCLDhCRDRPd0I7RUMzT3hCLCtCRDJPd0I7RUMxT3hCLFNBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGVBQUE7RUFDQSxtSEFBQTtBRGlRRjtBQzlQRTtFQUNFLCtCQUFBO0FEZ1FKO0FDN1BFO0VBQ0UsbUNBQUE7RUFDQSxtQkFBQTtBRCtQSjtBQzVQRTtFQUNFLGVEd05nRTtBQXNDcEU7QUFwQ0U7RUFDRSxpQ0FBQTtFQUNBLDRCQUFBO0FBc0NKIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU2tlbGV0b24gZGUgY2FyZ2EgY29uIGJhcnJpZG8gZGUgc2hpbW1lciDDosKAwpQgbWlzbW8gYmxvcXVlIHJlcGV0aWRvIGxpdGVyYWxtZW50ZVxuLy8gZW4gfjEwIHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS5cbi8vIENhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW8gc2VsZWN0b3IgeSBhw4PCsWFkZSBlbmNpbWEgc29sbyBsb1xuLy8gcXVlIHZhcsODwq1hIChib3JkZXItcmFkaXVzLCBoZWlnaHQsIHdpZHRoLCB2YXJpYW50ZXMgY29uIG5vbWJyZSkuXG5AbWl4aW4gdGYtc2tlbGV0b24tc2hpbW1lciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcblxuICAmOjphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGluc2V0OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCB0cmFuc3BhcmVudCwgdmFyKC0tdGYtc2hpbW1lciksIHRyYW5zcGFyZW50KTtcbiAgICBhbmltYXRpb246IHRmLXNoaW1tZXIgMS40cyBpbmZpbml0ZTtcbiAgfVxuXG4gIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgJjo6YWZ0ZXIge1xuICAgICAgYW5pbWF0aW9uOiBub25lO1xuICAgIH1cbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHRmLXNoaW1tZXIge1xuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XG4gIH1cbn1cbiIsIkBpbXBvcnQgJy4uLy4uLy4uL3RoZW1lL3NrZWxldG9uJztcbkBpbXBvcnQgJy4uLy4uLy4uL3RoZW1lL2J1dHRvbnMnO1xuXG4uYXV0b21hdGlvbnMtY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtYmcpO1xuICAtLXBhZGRpbmctc3RhcnQ6IDIwcHg7XG4gIC0tcGFkZGluZy1lbmQ6IDIwcHg7XG4gIC0tcGFkZGluZy10b3A6IDEycHg7XG4gIC0tcGFkZGluZy1ib3R0b206IDMycHg7XG59XG5cbi5wYWdlLXNrZWxldG9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS00KTtcbn1cblxuLnNrZWxldG9uLWJsb2NrIHtcbiAgQGluY2x1ZGUgdGYtc2tlbGV0b24tc2hpbW1lcjtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLWxnKTtcbn1cblxuLnJ1bGUtY2FyZC1za2VsZXRvbiB7XG4gIGhlaWdodDogMTE2cHg7XG59XG5cbi5wYWdlLXN0YXRlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTMpO1xuICBwYWRkaW5nOiB2YXIoLS10Zi1zcGFjZS0xMikgdmFyKC0tdGYtc3BhY2UtNik7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAzNHB4O1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LWZhaW50KTtcbiAgfVxuXG4gIGgyIHtcbiAgICBtYXJnaW46IDA7XG4gICAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtbGcpO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICB9XG5cbiAgcCB7XG4gICAgbWFyZ2luOiAwO1xuICAgIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcbiAgICBsaW5lLWhlaWdodDogdmFyKC0tdGYtbGluZS1oZWlnaHQtYmFzZSk7XG4gICAgbWF4LXdpZHRoOiA1MmNoO1xuICB9XG5cbiAgZW0ge1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIH1cbn1cblxuLy8gRWwgZXN0YWRvIHZhY8ODwq1vIGVzIGxhIHByaW1lcmEgcGFudGFsbGEgcXVlIHZlIHVuIGNvYWNoIGFxdcODwq06IGVsIGljb25vIHZhXG4vLyBlbiBhY2VudG8sIG5vIGVuIGdyaXMgYXBhZ2FkbywgcG9ycXVlIG5vIGVzIHVuIGVycm9yIHNpbm8gdW5hIGludml0YWNpw4PCs24uXG4ucGFnZS1zdGF0ZS0taW50cm8gaW9uLWljb24ge1xuICBjb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbn1cblxuLnJldHJ5LWJ1dHRvbixcbi5wcmltYXJ5LWJ1dHRvbiB7XG4gIG1pbi1oZWlnaHQ6IHZhcigtLXRmLXRvdWNoLW1pbik7XG4gIHBhZGRpbmc6IDAgdmFyKC0tdGYtc3BhY2UtNik7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1iYXNlKTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ucmV0cnktYnV0dG9uIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS01KTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLXNtKTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLnByaW1hcnktYnV0dG9uIHtcbiAgQGluY2x1ZGUgdGYtZ3JhZGllbnQtYnV0dG9uKHZhcigtLXRmLXJhZGl1cy1sZykpO1xuXG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogdmFyKC0tdGYtc3BhY2UtMik7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTGlzdGEgZGUgcmVnbGFzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi5ydWxlLWxpc3Qge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMyk7XG59XG5cbi5ydWxlLWNhcmQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0xKTtcbiAgLy8gRWxldmFjacODwrNuIGRlY2xhcmFkYSB1bmEgdmV6OiBib3JkZSwgc2luIHNvbWJyYS5cbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLWxnKTtcbiAgcGFkZGluZy1yaWdodDogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjpob3ZlciB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgfVxufVxuXG4vLyBVbmEgcmVnbGEgYXBhZ2FkYSBzZSBhdGVuw4PCumEgZW50ZXJhIGVuIHZleiBkZSBtYXJjYXJzZSBjb24gdW4gY29sb3I6IG5vIGVzXG4vLyB1biBlc3RhZG8gZGUgZXJyb3IsIGVzIHVuIGVzdGFkbyBpbmFjdGl2by5cbi5ydWxlLWNhcmQtLW9mZiB7XG4gIG9wYWNpdHk6IDAuNjtcbn1cblxuLnJ1bGUtbWFpbiB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLWxnKTtcbiAgfVxufVxuXG4ucnVsZS1oZWFkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4ucnVsZS1uYW1lIHtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtbWQpO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG59XG5cbi5sZXZlbC1jaGlwIHtcbiAgcGFkZGluZzogMnB4IHZhcigtLXRmLXNwYWNlLTIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtcGlsbCk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuICAvLyBFbCBuaXZlbCBcImF1dG9tw4PCoXRpY29cIiBlcyBlbCDDg8K6bmljbyBxdWUgYWN0w4PCumEgc2luIHByZWd1bnRhcjogc2UgZGlzdGluZ3VlXG4gIC8vIHBvcnF1ZSBlcyBsYSBkaWZlcmVuY2lhIHF1ZSBpbXBvcnRhIGRlIHVuIHZpc3Rhem8gZW4gdW4gbGlzdGFkby5cbiAgJi0tYXV0byB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LXNvZnQpO1xuICAgIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQtdGV4dCk7XG4gIH1cbn1cblxuLnJ1bGUtZGVzY3JpcHRpb24ge1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGxpbmUtaGVpZ2h0OiB2YXIoLS10Zi1saW5lLWhlaWdodC1iYXNlKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgbWF4LXdpZHRoOiA2OGNoO1xufVxuXG4ucnVsZS1tZXRhIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTMpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS14cyk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbn1cblxuLnJ1bGUtbWV0YS1pdGVtIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNHB4O1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gIH1cbn1cblxuLnJ1bGUtd2FybmluZyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTIpO1xuICBwYWRkaW5nOiB2YXIoLS10Zi1zcGFjZS0yKSB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLXNtKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtZGFuZ2VyLXNvZnQpO1xuICBjb2xvcjogdmFyKC0tdGYtZGFuZ2VyLXRleHQpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS14cyk7XG4gIGxpbmUtaGVpZ2h0OiB2YXIoLS10Zi1saW5lLWhlaWdodC1iYXNlKTtcblxuICBpb24taWNvbiB7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgbWFyZ2luLXRvcDogMXB4O1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgfVxufVxuXG4ucnVsZS1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4vLyBJbnRlcnJ1cHRvciBwcm9waW8gZW4gdmV6IGRlIGlvbi10b2dnbGU6IGVsIGNvbXBvbmVudGUgZGUgSW9uaWMgcmVuZGVyaXphXG4vLyBlbiBzaGFkb3cgRE9NIHkgc29sbyBhY2VwdGEgc3UgcHJvcGlhIHBhbGV0YSB2w4PCrWEgY3VzdG9tIHByb3BlcnRpZXMsIGxvIHF1ZVxuLy8gb2JsaWdhIGEgcmVwZXRpciBsb3MgdG9rZW5zIHVubyBhIHVuby4gQXF1w4PCrSBzb24gMjAgbMODwq1uZWFzIHkgdXNhIGxvcyBtaXNtb3Ncbi8vIHRva2VucyBxdWUgdG9kbyBsbyBkZW3Dg8Khcy5cbi5ydWxlLXN3aXRjaCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgd2lkdGg6IDQ0cHg7XG4gIGhlaWdodDogMjZweDtcbiAgcGFkZGluZzogMDtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtcGlsbCk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCB2YXIoLS10Zi1kdXJhdGlvbi1iYXNlKSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgLy8gw4PCgXJlYSBwdWxzYWJsZSBhbCBtw4PCrW5pbW8gdMODwqFjdGlsIHNpbiBlbmdvcmRhciBlbCBkaWJ1am8gZGVsIGludGVycnVwdG9yLlxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDUwJTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgd2lkdGg6IHZhcigtLXRmLXRvdWNoLW1pbik7XG4gICAgaGVpZ2h0OiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICB9XG5cbiAgJi0tb24ge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLWFjY2VudCk7XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG59XG5cbi5ydWxlLXN3aXRjaC1rbm9iIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDNweDtcbiAgbGVmdDogM3B4O1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXRleHQpO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gdmFyKC0tdGYtZHVyYXRpb24tYmFzZSkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gIC5ydWxlLXN3aXRjaC0tb24gJiB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDE4cHgpO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLWFjY2VudC1jb250cmFzdCk7XG4gIH1cblxuICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xuICAgIHRyYW5zaXRpb246IG5vbmU7XG4gIH1cbn1cblxuLnJ1bGUtZGVsZXRlIHtcbiAgQGluY2x1ZGUgdGYtaWNvbi1idXR0b24odmFyKC0tdGYtdG91Y2gtbWluKSwgdmFyKC0tdGYtcmFkaXVzLXNtKSwgMThweCk7XG5cbiAgJjpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtZGFuZ2VyLXNvZnQpO1xuICAgIGNvbG9yOiB2YXIoLS10Zi1kYW5nZXItdGV4dCk7XG4gIH1cbn1cbiIsIi8vIEJvdMODwrNuIENUQSBjb24gZ3JhZGllbnRlIGRlIGFjZW50byDDosKAwpQgbWlzbW8gYmxvcXVlIHJlcGV0aWRvIGVuIH4xMSBzaXRpb3MgZGVcbi8vIH4xMCBww4PCoWdpbmFzIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuXG4vLyBDYWRhIHDDg8KhZ2luYSBhcGxpY2EgZWwgbWl4aW4gc29icmUgc3UgcHJvcGlvIHNlbGVjdG9yIHkgYcODwrFhZGUgZW5jaW1hIHNvbG8gbG9cbi8vIHF1ZSB2YXLDg8KtYSBwb3IgbGF5b3V0ICh3aWR0aCwgaGVpZ2h0LCBmb250LXNpemUsIG1hcmdpbikuXG4vL1xuLy8gTGEgbWl0YWQgZGUgbG9zIHNpdGlvcyBvcmlnaW5hbGVzIG5vIHRlbsODwq1hbiB0cmFuc2ljacODwrNuL2ZlZWRiYWNrIGRlIHB1bHNhY2nDg8KzblxuLy8gbmkgOmZvY3VzLXZpc2libGUgw6LCgMKUIGVsIG1peGluIGxvcyBhw4PCsWFkZSBzaWVtcHJlLCBjaWVycmEgZXNlIGh1ZWNvIGRlXG4vLyBjb25zaXN0ZW5jaWEgZGUgaW50ZXJhY2Npw4PCs24gKFBST0RVQ1QubWQ6IFwidW4gc29sbyBwYXRyw4PCs24gcG9yIHRpcG8gZGVcbi8vIGNvbXBvbmVudGVcIikgZW4gdmV6IGRlIHBlcnBldHVhciBsYSB2YXJpYWNpw4PCs24gYWNjaWRlbnRhbC5cbkBtaXhpbiB0Zi1ncmFkaWVudC1idXR0b24oJHJhZGl1czogMTJweCkge1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6ICRyYWRpdXM7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLWFjY2VudC1ncmFkaWVudCk7XG4gIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQtY29udHJhc3QpO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCksIG9wYWNpdHkgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTcpO1xuICB9XG5cbiAgJjpkaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogMC40NTtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi10ZXh0KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG59XG5cbi8vIEJvdMODwrNuIGRlIGhlYWRlciBxdWUgZXMgc29sbyB1biBpY29ubyDDosKAwpQgbWlzbW8gbG9vayBcImVudnVlbHRvXCIgcXVlIHlhIHVzYSBsYVxuLy8gYXBwIGRlIGNvbnN1bWlkb3IgZW4gc3VzIHRvb2xiYXJzIChwYWNrYWdlcy9zaGFyZWQtZmVhdHVyZXMvLi4uL2RpZXRzL1xuLy8gY29tcG9uZW50cy90b29sYmFyLWNhbGVuZGFyOiBmb25kbyArIGJvcmRlci1yYWRpdXMgKyBjYWphIGZpamEgNDR4NDQsIGVuXG4vLyB2ZXogZGVsIGlvbi1idXR0b24gcGxhbm8vdHJhbnNwYXJlbnRlIHF1ZSB0ZW7Dg8KtYSBjYWRhIHBhbnRhbGxhIGRlIHRyYWluZXJzXG4vLyBoYXN0YSBhaG9yYSkuIFRva2VuZWFkbyBhIGxhIHBhbGV0YSBkZSBlc3RhIGFwcCBlbiB2ZXogZGUgcmVwZXRpciBsb3Ncbi8vIHJnYmEoMjU1LDI1NSwyNTUsLi4uKSBzdWVsdG9zIGRlbCBvcmlnaW5hbC5cbi8vXG4vLyBTaXJ2ZSB0YW50byBwYXJhIDxpb24tYnV0dG9uIGZpbGw9XCJjbGVhclwiPiAodXNhIGxhcyBDU1MgY3VzdG9tIHByb3BlcnRpZXNcbi8vIGRlIElvbmljKSBjb21vIHBhcmEgdW4gPGJ1dHRvbj4gbmF0aXZvICh1c2EgbGFzIHByb3BpZWRhZGVzIHBsYW5hcykgw6LCgMKUXG4vLyBhbWJvcyBjb2V4aXN0ZW4gaG95IGVuIHRyYWluZXJzIHBhcmEgZWwgbWlzbW8gcm9sIGRlIFwidm9sdmVyXCIvXCJjZXJyYXJcIi5cbkBtaXhpbiB0Zi1pY29uLWJ1dHRvbigkc2l6ZTogNDRweCwgJHJhZGl1czogMTJweCwgJGljb24tc2l6ZTogMjBweCkge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG4gIC0tYmFja2dyb3VuZC1hY3RpdmF0ZWQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIC0tYmFja2dyb3VuZC1ob3ZlcjogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1iYWNrZ3JvdW5kLWZvY3VzZWQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIC0tY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgLS1ib3JkZXItcmFkaXVzOiAjeyRyYWRpdXN9O1xuICAtLXBhZGRpbmctc3RhcnQ6IDA7XG4gIC0tcGFkZGluZy1lbmQ6IDA7XG4gIC0tcGFkZGluZy10b3A6IDA7XG4gIC0tcGFkZGluZy1ib3R0b206IDA7XG5cbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAkcmFkaXVzO1xuICB3aWR0aDogJHNpemU7XG4gIGhlaWdodDogJHNpemU7XG4gIG1pbi13aWR0aDogJHNpemU7XG4gIG1pbi1oZWlnaHQ6ICRzaXplO1xuICBtYXJnaW46IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpLFxuICAgIGNvbG9yIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6ICRpY29uLXNpemU7XG4gIH1cbn1cblxuLy8gRXhwYW5zb3IgaW52aXNpYmxlIGRlIHpvbmEgcHVsc2FibGUuXG4vL1xuLy8gUEFSQSBRVcODwok6IHVuIGNvbnRyb2wgY29tcGFjdG8gKHVuIGljb25vIGRlIDMyIHB4IGVuIHVuYSBmaWxhIGRlIHRhYmxhLCB1blxuLy8gZW5sYWNlIGRlIHRleHRvIGRlIDE2IHB4KSBubyBsbGVnYSBhIGxvcyA0NCBweCBxdWUgZXhpZ2UgUFJPRFVDVC5tZCwgeVxuLy8gZW5nb3JkYXJsbyBkZSB2ZXJkYWQgZGVzcGxhemEgdG9kbyBsbyBxdWUgdGllbmUgYWxyZWRlZG9yIMOiwoDClCBlbiB1bmEgdGFibGFcbi8vIGRlIHZlaW50ZSBmaWxhcywgOCBweCBwb3IgZmlsYSBzb24gbWVkaWEgcGFudGFsbGEuXG4vL1xuLy8gRWwgcHNldWRvZWxlbWVudG8gY3JlY2UgaGFjaWEgZnVlcmEgc2luIG9jdXBhciBzaXRpbyBlbiBlbCBmbHVqbywgYXPDg8KtIHF1ZVxuLy8gZWwgYm90w4PCs24gc2UgdmUgcGVxdWXDg8KxbyB5IHNlIHB1bHNhIGdyYW5kZS5cbi8vXG4vLyBBVklTTyBERSBNRURJQ0nDg8KTTjogZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgTk8gdmUgZXN0ZSBwc2V1ZG9lbGVtZW50bywgYXPDg8KtXG4vLyBxdWUgYWwgdmVyaWZpY2FyIGhheSBxdWUgdXNhciBlbGVtZW50RnJvbVBvaW50IGNvbiBlbCBlbGVtZW50byBkZW50cm8gZGVsXG4vLyB2aWV3cG9ydC4gQWRlbcODwqFzIGVsIGhpdC10ZXN0IGRldnVlbHZlIDIgcHggbWVub3MgcXVlIGxhIGNhamEgZGVjbGFyYWRhXG4vLyAoY29tcHJvYmFkbzogLTRweCBkYSA0MiwgLTZweCBkYSA0NiksIGFzw4PCrSBxdWUgdW4gNDIgbWVkaWRvIHNvbiA0NCByZWFsZXMuXG4vL1xuLy8gJGdyb3c6IGN1w4PCoW50byBjcmVjZSBwb3IgY2FkYSBsYWRvLiA0cHggbGxldmEgdW4gY29udHJvbCBkZSAzNiBweCBhIDQ0LlxuQG1peGluIHRmLXRvdWNoLWV4cGFuZGVyKCRncm93OiA0cHgpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGluc2V0OiAtI3skZ3Jvd307XG4gIH1cbn1cblxuLy8gVmFyaWFudGUgcXVlIHNvbG8gY3JlY2UgZW4gVkVSVElDQUwuIFBhcmEgY29udHJvbGVzIGVuIGZpbGEgZG9uZGUgZWxcbi8vIGV4cGFuc29yIGhvcml6b250YWwgc2Ugc29sYXBhcsODwq1hIGNvbiBlbCBkZSBhbCBsYWRvIHkgcm9iYXLDg8KtYSBzdXMgdG9xdWVzLlxuQG1peGluIHRmLXRvdWNoLWV4cGFuZGVyLXkoJGdyb3c6IDRweCkge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAtI3skZ3Jvd307XG4gICAgYm90dG9tOiAtI3skZ3Jvd307XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
}));


/***/ }),

/***/ 51370:
/*!*****************************************************************!*\
  !*** ./src/app/features/automations/models/coach-rule.model.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RULE_GROUP_LABELS: () => (/* binding */ RULE_GROUP_LABELS),
/* harmony export */   RULE_LEVELS: () => (/* binding */ RULE_LEVELS),
/* harmony export */   RULE_TRIGGERS: () => (/* binding */ RULE_TRIGGERS)
/* harmony export */ });
// Fase 3 Coach Pro — espejo de components/coachRules/ (backend).
const RULE_LEVELS = [{
  key: 'informative',
  label: 'Solo informar',
  description: 'Crea una alerta en tu panel. Tú decides qué hacer.'
}, {
  key: 'suggestion',
  label: 'Sugerir una acción',
  description: 'Crea la alerta y propone una tarea que aceptas con un clic.'
}, {
  key: 'automatic',
  label: 'Crear la tarea automáticamente',
  description: 'Crea la alerta y la tarea sin preguntarte.'
}];
const RULE_TRIGGERS = [{
  key: 'daily',
  label: 'Cada día',
  description: 'Revisa a todos tus clientes cada madrugada.'
}, {
  key: 'after_checkin',
  label: 'Tras un check-in',
  description: 'Solo revisa a quien haya respondido desde la última vez.'
}, {
  key: 'after_measurement',
  label: 'Tras una medición',
  description: 'Solo revisa a quien haya registrado medidas desde la última vez.'
}];
const RULE_GROUP_LABELS = {
  composicion: 'Composición corporal',
  medidas: 'Medidas',
  adherencia: 'Adherencia',
  bienestar: 'Bienestar',
  seguimiento: 'Seguimiento'
};

/***/ }),

/***/ 80938:
/*!******************************************************************************!*\
  !*** ./src/app/features/automations/pages/rule-builder/rule-builder.page.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RuleBuilderPage: () => (/* binding */ RuleBuilderPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_features_clients_components_select_clients_modal_select_clients_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/features/clients/components/select-clients-modal/select-clients-modal.component */ 81800);
/* harmony import */ var _models_coach_rule_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../models/coach-rule.model */ 51370);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _services_coach_rules_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/coach-rules-api.service */ 87402);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 84725);


var _RuleBuilderPage;









function RuleBuilderPage_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "div", 14)(2, "div", 15)(3, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RuleBuilderPage_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "ion-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "No se pudo abrir esta automatizaci\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RuleBuilderPage_div_12_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r3.goBack());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Volver");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function RuleBuilderPage_ng_container_13_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RuleBuilderPage_ng_container_13_button_13_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r19);
      const option_r17 = restoredCtx.$implicit;
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r18.trigger = option_r17.key);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "span", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const option_r17 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("option-card--active", ctx_r5.trigger === option_r17.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("aria-checked", ctx_r5.trigger === option_r17.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](option_r17.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](option_r17.description);
  }
}
function RuleBuilderPage_ng_container_13_div_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 50)(1, "button", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RuleBuilderPage_ng_container_13_div_22_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r21);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r20.conditionLogic = "all");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, " Se cumplen todas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "button", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RuleBuilderPage_ng_container_13_div_22_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r21);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r22.conditionLogic = "any");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, " Se cumple alguna ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("logic-option--active", ctx_r6.conditionLogic === "all");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("aria-pressed", ctx_r6.conditionLogic === "all");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("logic-option--active", ctx_r6.conditionLogic === "any");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("aria-pressed", ctx_r6.conditionLogic === "any");
  }
}
function RuleBuilderPage_ng_container_13_ng_container_24_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r25.conditionLogic === "all" ? "Y" : "O", " ");
  }
}
function RuleBuilderPage_ng_container_13_ng_container_24_optgroup_5_option_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "option", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const metric_r33 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", metric_r33.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", metric_r33.label, " ");
  }
}
function RuleBuilderPage_ng_container_13_ng_container_24_optgroup_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "optgroup", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, RuleBuilderPage_ng_container_13_ng_container_24_optgroup_5_option_1_Template, 2, 2, "option", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r31 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("label", group_r31.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", group_r31.metrics);
  }
}
function RuleBuilderPage_ng_container_13_ng_container_24_option_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "option", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const operator_r34 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", operator_r34.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", operator_r34.label, " ");
  }
}
function RuleBuilderPage_ng_container_13_ng_container_24_span_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const condition_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r28.unitFor(condition_r23));
  }
}
function RuleBuilderPage_ng_container_13_ng_container_24_select_11_option_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "option", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const period_r37 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngValue", period_r37.days);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", period_r37.label, " ");
  }
}
function RuleBuilderPage_ng_container_13_ng_container_24_select_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r40 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "select", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RuleBuilderPage_ng_container_13_ng_container_24_select_11_Template_select_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r40);
      const condition_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](condition_r23.periodDays = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, RuleBuilderPage_ng_container_13_ng_container_24_select_11_option_1_Template, 2, 2, "option", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    const condition_r23 = ctx_r41.$implicit;
    const i_r24 = ctx_r41.index;
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", condition_r23.periodDays);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("aria-label", "Periodo de la condici\u00F3n " + (i_r24 + 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r29.catalog == null ? null : ctx_r29.catalog.periods);
  }
}
function RuleBuilderPage_ng_container_13_ng_container_24_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RuleBuilderPage_ng_container_13_ng_container_24_button_12_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r44);
      const i_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().index;
      const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r42.removeCondition(i_r24));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "ion-icon", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const i_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().index;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("aria-label", "Quitar la condici\u00F3n " + (i_r24 + 1));
  }
}
function RuleBuilderPage_ng_container_13_ng_container_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, RuleBuilderPage_ng_container_13_ng_container_24_div_1_Template, 2, 1, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 53)(3, "div", 54)(4, "select", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RuleBuilderPage_ng_container_13_ng_container_24_Template_select_ngModelChange_4_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r47);
      const condition_r23 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](condition_r23.metric = $event);
    })("ngModelChange", function RuleBuilderPage_ng_container_13_ng_container_24_Template_select_ngModelChange_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r47);
      const condition_r23 = restoredCtx.$implicit;
      const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r48.onMetricChange(condition_r23));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, RuleBuilderPage_ng_container_13_ng_container_24_optgroup_5_Template, 2, 2, "optgroup", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "select", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RuleBuilderPage_ng_container_13_ng_container_24_Template_select_ngModelChange_6_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r47);
      const condition_r23 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](condition_r23.operator = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, RuleBuilderPage_ng_container_13_ng_container_24_option_7_Template, 2, 2, "option", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 59)(9, "input", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RuleBuilderPage_ng_container_13_ng_container_24_Template_input_ngModelChange_9_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r47);
      const condition_r23 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](condition_r23.value = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, RuleBuilderPage_ng_container_13_ng_container_24_span_10_Template, 2, 1, "span", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, RuleBuilderPage_ng_container_13_ng_container_24_select_11_Template, 2, 3, "select", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](12, RuleBuilderPage_ng_container_13_ng_container_24_button_12_Template, 2, 1, "button", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const condition_r23 = ctx.$implicit;
    const i_r24 = ctx.index;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", i_r24 > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", condition_r23.metric);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("aria-label", "M\u00E9trica de la condici\u00F3n " + (i_r24 + 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r7.metricGroups);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", condition_r23.operator);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("aria-label", "Comparaci\u00F3n de la condici\u00F3n " + (i_r24 + 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r7.operatorsFor(condition_r23));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", condition_r23.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("aria-label", "Valor de la condici\u00F3n " + (i_r24 + 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r7.unitFor(condition_r23));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r7.showsPeriod(condition_r23));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r7.conditions.length > 1);
  }
}
function RuleBuilderPage_ng_container_13_button_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r52 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RuleBuilderPage_ng_container_13_button_25_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r52);
      const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r51.addCondition());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "ion-icon", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, " A\u00F1adir condici\u00F3n ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RuleBuilderPage_ng_container_13_div_35_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r59 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RuleBuilderPage_ng_container_13_div_35_button_5_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r59);
      const i_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().index;
      const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r57.removeAction(i_r54));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "ion-icon", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RuleBuilderPage_ng_container_13_div_35_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r62 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 82)(1, "span", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "Prioridad");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "select", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RuleBuilderPage_ng_container_13_div_35_div_8_Template_select_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r62);
      const action_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](action_r53.priority = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "option", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Urgente");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "option", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "Revisar");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "option", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "Menor");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const action_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", action_r53.priority);
  }
}
function RuleBuilderPage_ng_container_13_div_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r65 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 74)(1, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "ion-icon", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "span", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, RuleBuilderPage_ng_container_13_div_35_button_5_Template, 2, 0, "button", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 22)(7, "input", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RuleBuilderPage_ng_container_13_div_35_Template_input_ngModelChange_7_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r65);
      const action_r53 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](action_r53.message = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, RuleBuilderPage_ng_container_13_div_35_div_8_Template, 10, 1, "div", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const action_r53 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("name", action_r53.type === "create_alert" ? "notifications-outline" : "checkbox-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", action_r53.type === "create_alert" ? "Avisarme con una alerta" : "Crear una tarea", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", action_r53.type !== "create_alert");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("placeholder", action_r53.type === "create_alert" ? "Posible estancamiento" : "Revisar estrategia nutricional")("ngModel", action_r53.message);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("aria-label", action_r53.type === "create_alert" ? "Texto de la alerta" : "T\u00EDtulo de la tarea");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", action_r53.type === "create_alert");
  }
}
function RuleBuilderPage_ng_container_13_button_36_Template(rf, ctx) {
  if (rf & 1) {
    const _r67 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RuleBuilderPage_ng_container_13_button_36_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r67);
      const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r66.addAction("create_task"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "ion-icon", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, " A\u00F1adir una tarea ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RuleBuilderPage_ng_container_13_button_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r70 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RuleBuilderPage_ng_container_13_button_44_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r70);
      const option_r68 = restoredCtx.$implicit;
      const ctx_r69 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r69.level = option_r68.key);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "span", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const option_r68 = ctx.$implicit;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("option-card--active", ctx_r11.level === option_r68.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("aria-checked", ctx_r11.level === option_r68.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](option_r68.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](option_r68.description);
  }
}
function RuleBuilderPage_ng_container_13_p_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "ion-icon", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, " Este nivel necesita una tarea que sugerir o crear. A\u00F1\u00E1dela arriba. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RuleBuilderPage_ng_container_13_div_60_Template(rf, ctx) {
  if (rf & 1) {
    const _r72 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 90)(1, "button", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RuleBuilderPage_ng_container_13_div_60_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r72);
      const ctx_r71 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r71.openClientPicker());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "ion-icon", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "span", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r13.clientIds.length ? "Cambiar selecci\u00F3n" : "Elegir clientes", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate3"](" ", ctx_r13.clientIds.length, " cliente", ctx_r13.clientIds.length === 1 ? "" : "s", " seleccionado", ctx_r13.clientIds.length === 1 ? "" : "s", " ");
  }
}
function RuleBuilderPage_ng_container_13_p_62_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r14.validationError);
  }
}
function RuleBuilderPage_ng_container_13_span_64_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r15.isNew ? "Crear automatizaci\u00F3n" : "Guardar cambios");
  }
}
function RuleBuilderPage_ng_container_13_ion_spinner_65_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "ion-spinner", 95);
  }
}
function RuleBuilderPage_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r74 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "section", 20)(2, "label", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Nombre");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 22)(5, "input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RuleBuilderPage_ng_container_13_Template_input_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r74);
      const ctx_r73 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r73.name = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "section", 24)(7, "div", 25)(8, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9, "Cu\u00E1ndo");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "Con qu\u00E9 frecuencia reviso a tus clientes");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, RuleBuilderPage_ng_container_13_button_13_Template, 5, 5, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](15, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "section", 24)(17, "div", 25)(18, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](19, "Si");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](21, "Se cumple lo siguiente");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](22, RuleBuilderPage_ng_container_13_div_22_Template, 5, 6, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](24, RuleBuilderPage_ng_container_13_ng_container_24_Template, 13, 12, "ng-container", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](25, RuleBuilderPage_ng_container_13_button_25_Template, 3, 0, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](26, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](27, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](28, "section", 24)(29, "div", 25)(30, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](31, "Entonces");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](32, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](33, "Esto es lo que hago");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](34, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](35, RuleBuilderPage_ng_container_13_div_35_Template, 9, 7, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](36, RuleBuilderPage_ng_container_13_button_36_Template, 3, 0, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](37, "section", 24)(38, "div", 25)(39, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](40, "Hasta d\u00F3nde");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](41, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](42, "Cu\u00E1nta libertad le doy");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](43, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](44, RuleBuilderPage_ng_container_13_button_44_Template, 5, 5, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](45, RuleBuilderPage_ng_container_13_p_45_Template, 3, 0, "p", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](46, "p", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](47, "ion-icon", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](48, " Una automatizaci\u00F3n nunca modifica planes, calor\u00EDas ni rutinas. Como mucho te avisa y te crea tareas. Si diera positivo en demasiados clientes a la vez, se desactivar\u00EDa sola y te lo dir\u00EDa. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](49, "section", 24)(50, "div", 25)(51, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](52, "A qui\u00E9n");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](53, "div", 41)(54, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RuleBuilderPage_ng_container_13_Template_button_click_54_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r74);
      const ctx_r75 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r75.appliesTo = "all_clients");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](55, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](56, "Todos mis clientes");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](57, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RuleBuilderPage_ng_container_13_Template_button_click_57_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r74);
      const ctx_r76 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r76.appliesTo = "selected");
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](58, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](59, "Solo algunos");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](60, RuleBuilderPage_ng_container_13_div_60_Template, 6, 4, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](61, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](62, RuleBuilderPage_ng_container_13_p_62_Template, 2, 1, "p", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](63, "button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RuleBuilderPage_ng_container_13_Template_button_click_63_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r74);
      const ctx_r77 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r77.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](64, RuleBuilderPage_ng_container_13_span_64_Template, 2, 1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](65, RuleBuilderPage_ng_container_13_ion_spinner_65_Template, 1, 0, "ion-spinner", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r2.triggers);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.conditions.length > 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r2.conditions)("ngForTrackBy", ctx_r2.trackByIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.conditions.length < ctx_r2.maxConditions);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r2.actions)("ngForTrackBy", ctx_r2.trackByIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r2.hasTaskAction);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r2.levels);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.levelNeedsTask);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("option-card--active", ctx_r2.appliesTo === "all_clients");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("aria-checked", ctx_r2.appliesTo === "all_clients");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("option-card--active", ctx_r2.appliesTo === "selected");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵattribute"]("aria-checked", ctx_r2.appliesTo === "selected");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.appliesTo === "selected");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.validationError);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r2.isSaving);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r2.isSaving);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.isSaving);
  }
}
const MAX_CONDITIONS = 5;
const MAX_ACTIONS = 3;
// Fase 3 Coach Pro — el constructor visual (§11 de la especificación).
//
// La regla se compone eligiendo de listas, nunca escribiendo expresiones: no
// hay campo de texto donde quepa una sintaxis, y los operadores que se
// ofrecen dependen de la métrica elegida (el catálogo del backend los trae
// ya filtrados). Eso hace imposible construir una regla sin sentido —
// "el nivel de estrés ha bajado un 5%" ni siquiera aparece como opción.
//
// La página lee el vocabulario del backend en vez de traerlo escrito: si
// mañana se añade una métrica al catálogo, aparece aquí sin tocar el
// frontend.
class RuleBuilderPage {
  constructor(coachRulesApi, ionicUtilService, modalController, route, router) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "coachRulesApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "route", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "levels", _models_coach_rule_model__WEBPACK_IMPORTED_MODULE_3__.RULE_LEVELS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "triggers", _models_coach_rule_model__WEBPACK_IMPORTED_MODULE_3__.RULE_TRIGGERS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "groupLabels", _models_coach_rule_model__WEBPACK_IMPORTED_MODULE_3__.RULE_GROUP_LABELS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "maxConditions", MAX_CONDITIONS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "maxActions", MAX_ACTIONS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "state", 'loading');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "catalog", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isNew", true);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isSaving", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ruleId", null);
    // --- La regla en construcción ---
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "name", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "description", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "level", 'informative');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "trigger", 'daily');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "conditionLogic", 'all');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "conditions", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "actions", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "appliesTo", 'all_clients');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "clientIds", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "selectedClientNames", []);
    // Índice por clave, para no recorrer el catálogo en cada consulta de la
    // plantilla (que se evalúa en cada ciclo de detección de cambios).
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "metricsByKey", new Map());
    this.coachRulesApi = coachRulesApi;
    this.ionicUtilService = ionicUtilService;
    this.modalController = modalController;
    this.route = route;
    this.router = router;
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.isNew = !id || id === 'new';
    this.ruleId = this.isNew ? null : id;
    this.load();
  }
  load() {
    this.state = 'loading';
    this.coachRulesApi.getCatalog().subscribe({
      next: catalog => {
        this.catalog = catalog;
        this.metricsByKey = new Map(catalog.metrics.map(m => [m.key, m]));
        if (this.isNew) {
          this.seedNewRule();
          this.state = 'loaded';
        } else {
          this.loadExistingRule();
        }
      },
      error: () => {
        this.state = 'error';
      }
    });
  }
  // Una regla nueva arranca con una condición y una alerta ya puestas: la
  // pantalla en blanco con un botón "añadir condición" obliga a entender el
  // modelo antes de poder tocar nada.
  seedNewRule() {
    this.conditions = [this.emptyCondition()];
    this.actions = [{
      type: 'create_alert',
      message: '',
      priority: 'medium'
    }];
  }
  loadExistingRule() {
    this.coachRulesApi.getMine().subscribe({
      next: rules => {
        const rule = rules.find(r => r._id === this.ruleId);
        if (!rule) {
          this.state = 'error';
          return;
        }
        this.applyRule(rule);
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      }
    });
  }
  applyRule(rule) {
    this.name = rule.name;
    this.description = rule.description || '';
    this.level = rule.level;
    this.trigger = rule.trigger;
    this.conditionLogic = rule.conditionLogic;
    this.conditions = rule.conditions.map(c => ({
      ...c
    }));
    this.actions = rule.actions.map(a => ({
      ...a
    }));
    this.appliesTo = rule.appliesTo;
    this.clientIds = [...(rule.clientIds || [])];
  }
  emptyCondition() {
    const first = this.catalog?.metrics[0];
    return {
      metric: first?.key || '',
      operator: first?.operators[0]?.key || '',
      value: 0,
      periodDays: this.catalog?.periods[1]?.days || 14
    };
  }
  // --- Métrica y operadores ---
  metricFor(condition) {
    return this.metricsByKey.get(condition.metric) || null;
  }
  operatorsFor(condition) {
    return this.metricFor(condition)?.operators || [];
  }
  unitFor(condition) {
    const operator = this.operatorsFor(condition).find(o => o.key === condition.operator);
    // Los operadores de variación llevan su propio sufijo (%), que gana
    // sobre la unidad de la métrica: "ha bajado más de 2 kg" sería otra
    // pregunta distinta de la que este operador hace.
    return operator?.suffix || this.metricFor(condition)?.unit || '';
  }
  showsPeriod(condition) {
    return this.metricFor(condition)?.periodAware === true;
  }
  // Al cambiar de métrica, el operador anterior puede no aplicar a la nueva.
  // Se reemplaza por el primero válido en vez de dejar una combinación que
  // el backend rechazaría al guardar.
  onMetricChange(condition) {
    const operators = this.operatorsFor(condition);
    if (!operators.some(o => o.key === condition.operator)) {
      condition.operator = operators[0]?.key || '';
    }
  }
  get metricGroups() {
    if (!this.catalog) return [];
    const groups = new Map();
    for (const metric of this.catalog.metrics) {
      if (!groups.has(metric.group)) groups.set(metric.group, []);
      groups.get(metric.group)?.push(metric);
    }
    return [...groups.entries()].map(([key, metrics]) => ({
      key,
      label: this.groupLabels[key] || key,
      metrics
    }));
  }
  // --- Condiciones y acciones ---
  addCondition() {
    if (this.conditions.length >= MAX_CONDITIONS) return;
    this.conditions = [...this.conditions, this.emptyCondition()];
  }
  removeCondition(index) {
    if (this.conditions.length <= 1) return;
    this.conditions = this.conditions.filter((_, i) => i !== index);
  }
  addAction(type) {
    if (this.actions.length >= MAX_ACTIONS) return;
    if (this.actions.some(a => a.type === type)) return;
    this.actions = [...this.actions, {
      type,
      message: ''
    }];
  }
  removeAction(index) {
    const action = this.actions[index];
    // La alerta es obligatoria: sin ella la regla actuaría en silencio y no
    // habría dónde ver que se disparó (el backend también lo rechaza).
    if (action?.type === 'create_alert') return;
    this.actions = this.actions.filter((_, i) => i !== index);
  }
  get hasTaskAction() {
    return this.actions.some(a => a.type === 'create_task');
  }
  get alertAction() {
    return this.actions.find(a => a.type === 'create_alert');
  }
  // Los niveles "sugerir" y "automático" solo tienen sentido si hay una
  // tarea que sugerir o crear. Se avisa en vez de dejar elegir un nivel que
  // no haría nada.
  get levelNeedsTask() {
    return (this.level === 'suggestion' || this.level === 'automatic') && !this.hasTaskAction;
  }
  // --- Alcance ---
  openClientPicker() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this.modalController.create({
        component: src_app_features_clients_components_select_clients_modal_select_clients_modal_component__WEBPACK_IMPORTED_MODULE_2__.SelectClientsModalComponent,
        componentProps: {
          preselectedIds: _this.clientIds
        }
      });
      yield modal.present();
      const {
        data,
        role
      } = yield modal.onWillDismiss();
      if (role !== 'confirm' || !data?.targetClientIds) return;
      _this.clientIds = data.targetClientIds;
    })();
  }
  // --- Guardar ---
  get validationError() {
    if (!this.name.trim()) return 'Ponle un nombre a la automatización.';
    if (!this.conditions.length) return 'Añade al menos una condición.';
    if (this.conditions.some(c => !c.metric || !c.operator)) {
      return 'Completa todas las condiciones.';
    }
    if (this.conditions.some(c => !Number.isFinite(Number(c.value)))) {
      return 'Cada condición necesita un valor numérico.';
    }
    if (!this.alertAction?.message.trim()) {
      return 'Escribe el aviso que quieres recibir.';
    }
    if (this.hasTaskAction && !this.actions.find(a => a.type === 'create_task')?.message.trim()) {
      return 'Escribe el título de la tarea.';
    }
    if (this.levelNeedsTask) {
      return 'Ese nivel necesita una tarea. Añádela o cambia a "Solo informar".';
    }
    if (this.appliesTo === 'selected' && !this.clientIds.length) {
      return 'Elige a qué clientes se aplica.';
    }
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
      level: this.level,
      trigger: this.trigger,
      conditions: this.conditions.map(c => ({
        ...c,
        value: Number(c.value)
      })),
      conditionLogic: this.conditionLogic,
      actions: this.actions.map(a => ({
        ...a,
        message: a.message.trim()
      })),
      appliesTo: this.appliesTo,
      clientIds: this.appliesTo === 'selected' ? this.clientIds : [],
      enabled: true
    };
    const request$ = this.isNew ? this.coachRulesApi.create(payload) : this.coachRulesApi.update(this.ruleId, payload);
    request$.subscribe({
      next: () => {
        this.isSaving = false;
        void this.router.navigate(['/tabs/automations']);
      },
      error: error => {
        this.isSaving = false;
        void this.ionicUtilService.showErrorToast(error, 'No se pudo guardar la automatización');
      }
    });
  }
  goBack() {
    void this.router.navigate(['/tabs/automations']);
  }
  trackByIndex(index) {
    return index;
  }
}
_RuleBuilderPage = RuleBuilderPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RuleBuilderPage, "\u0275fac", function RuleBuilderPage_Factory(t) {
  return new (t || _RuleBuilderPage)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_coach_rules_api_service__WEBPACK_IMPORTED_MODULE_4__.CoachRulesApiService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_5__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RuleBuilderPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: _RuleBuilderPage,
  selectors: [["app-rule-builder"]],
  decls: 14,
  vars: 4,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["type", "button", "aria-label", "Volver", 1, "tf-page-header__back-button", 3, "click"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "builder-content"], ["class", "page-skeleton", 4, "ngIf"], ["class", "page-state", 4, "ngIf"], [4, "ngIf"], [1, "page-skeleton"], [1, "skeleton-block", 2, "height", "120px"], [1, "skeleton-block", 2, "height", "200px"], [1, "skeleton-block", 2, "height", "160px"], [1, "page-state"], ["name", "alert-circle-outline", "aria-hidden", "true"], ["type", "button", 1, "retry-button", 3, "click"], [1, "builder-card"], ["for", "rule-name", 1, "field-label"], [1, "input-wrapper"], ["id", "rule-name", "type", "text", "maxlength", "100", "placeholder", "Posible estancamiento", 1, "input-field", 3, "ngModel", "ngModelChange"], [1, "step-card"], [1, "step-head"], [1, "step-badge"], [1, "step-hint"], ["role", "radiogroup", "aria-label", "Cu\u00E1ndo se eval\u00FAa la automatizaci\u00F3n", 1, "option-list"], ["type", "button", "class", "option-card", "role", "radio", 3, "option-card--active", "click", 4, "ngFor", "ngForOf"], ["aria-hidden", "true", 1, "step-connector"], ["class", "logic-switch", "role", "group", "aria-label", "C\u00F3mo se combinan las condiciones", 4, "ngIf"], [1, "condition-list"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", "class", "add-row-button", 3, "click", 4, "ngIf"], ["class", "action-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "step-badge", "step-badge--muted"], ["role", "radiogroup", "aria-label", "Nivel de automatizaci\u00F3n", 1, "option-list"], ["class", "inline-warning", 4, "ngIf"], [1, "inline-note"], ["name", "shield-checkmark-outline", "aria-hidden", "true"], ["role", "radiogroup", "aria-label", "A qu\u00E9 clientes se aplica", 1, "option-list", "option-list--inline"], ["type", "button", "role", "radio", 1, "option-card", 3, "click"], [1, "option-title"], ["class", "client-picker", 4, "ngIf"], [1, "save-bar"], ["class", "save-error", 4, "ngIf"], ["type", "button", 1, "primary-button", 3, "disabled", "click"], ["name", "dots", 4, "ngIf"], [1, "option-description"], ["role", "group", "aria-label", "C\u00F3mo se combinan las condiciones", 1, "logic-switch"], ["type", "button", 1, "logic-option", 3, "click"], ["class", "condition-joiner", "aria-hidden", "true", 4, "ngIf"], [1, "condition-card"], [1, "condition-fields"], [1, "builder-select", "builder-select--metric", 3, "ngModel", "ngModelChange"], [3, "label", 4, "ngFor", "ngForOf"], [1, "builder-select", 3, "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], [1, "value-field"], ["type", "number", "step", "any", 1, "builder-input", 3, "ngModel", "ngModelChange"], ["class", "value-unit", 4, "ngIf"], ["class", "builder-select", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["type", "button", "class", "condition-remove", 3, "click", 4, "ngIf"], ["aria-hidden", "true", 1, "condition-joiner"], [3, "label"], [3, "value"], [1, "value-unit"], [3, "ngValue", 4, "ngFor", "ngForOf"], [3, "ngValue"], ["type", "button", 1, "condition-remove", 3, "click"], ["name", "close-outline", "aria-hidden", "true"], ["type", "button", 1, "add-row-button", 3, "click"], ["name", "add-outline", "aria-hidden", "true"], [1, "action-card"], [1, "action-head"], ["aria-hidden", "true", 3, "name"], [1, "action-title"], ["type", "button", "class", "condition-remove", "aria-label", "Quitar la tarea", 3, "click", 4, "ngIf"], ["type", "text", "maxlength", "200", 1, "input-field", 3, "placeholder", "ngModel", "ngModelChange"], ["class", "priority-row", 4, "ngIf"], ["type", "button", "aria-label", "Quitar la tarea", 1, "condition-remove", 3, "click"], [1, "priority-row"], [1, "priority-label"], ["aria-label", "Prioridad de la alerta", 1, "builder-select", 3, "ngModel", "ngModelChange"], ["value", "high"], ["value", "medium"], ["value", "low"], [1, "inline-warning"], ["name", "information-circle-outline", "aria-hidden", "true"], [1, "client-picker"], ["type", "button", 1, "secondary-button", 3, "click"], ["name", "people-outline", "aria-hidden", "true"], [1, "client-count"], [1, "save-error"], ["name", "dots"]],
  template: function RuleBuilderPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RuleBuilderPage_Template_button_click_4_listener() {
        return ctx.goBack();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "ion-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 6)(7, "h1", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](9, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "ion-content", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, RuleBuilderPage_div_11_Template, 4, 0, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](12, RuleBuilderPage_div_12_Template, 6, 0, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, RuleBuilderPage_ng_container_13_Template, 66, 22, "ng-container", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx.isNew ? "Nueva automatizaci\u00F3n" : "Editar automatizaci\u00F3n");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.state === "loading");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.state === "error");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.state === "loaded");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_10__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_10__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonSpinner],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n.builder-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 20px;\n  --padding-end: 20px;\n  --padding-top: 12px;\n  --padding-bottom: 32px;\n}\n\n.page-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-4);\n}\n\n.skeleton-block[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n  border-radius: var(--tf-radius-lg);\n}\n.skeleton-block[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n\n.page-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: var(--tf-space-3);\n  padding: var(--tf-space-12) var(--tf-space-6);\n  color: var(--tf-text-muted);\n}\n.page-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 34px;\n  color: var(--tf-text-faint);\n}\n.page-state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-lg);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.builder-card[_ngcontent-%COMP%], .step-card[_ngcontent-%COMP%] {\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n  padding: var(--tf-space-5);\n  margin-bottom: var(--tf-space-4);\n}\n\n.step-card[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n\n.step-connector[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  height: var(--tf-space-5);\n}\n.step-connector[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  width: 2px;\n  height: 100%;\n  background: var(--tf-border-strong);\n}\n\n.step-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-3);\n  flex-wrap: wrap;\n  margin-bottom: var(--tf-space-4);\n}\n\n.step-badge[_ngcontent-%COMP%] {\n  padding: 3px var(--tf-space-3);\n  border-radius: var(--tf-radius-pill);\n  background: var(--tf-accent-soft);\n  color: var(--tf-accent-text);\n  font-size: var(--tf-font-size-xs);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n}\n.step-badge--muted[_ngcontent-%COMP%] {\n  background: var(--tf-surface-4);\n  color: var(--tf-text-secondary);\n}\n\n.step-hint[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-muted);\n}\n\n.field-label[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: var(--tf-space-2);\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n  color: var(--tf-text-secondary);\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n  height: var(--tf-touch-min);\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.input-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n  font-size: var(--tf-font-size-base);\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.builder-select[_ngcontent-%COMP%] {\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-8) 0 var(--tf-space-3);\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-md);\n  color: var(--tf-text);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  cursor: pointer;\n  -webkit-appearance: none;\n          appearance: none;\n  background-image: linear-gradient(45deg, transparent 50%, var(--tf-text-muted) 50%), linear-gradient(135deg, var(--tf-text-muted) 50%, transparent 50%);\n  background-position: calc(100% - 18px) calc(50% + 2px), calc(100% - 13px) calc(50% + 2px);\n  background-size: 5px 5px, 5px 5px;\n  background-repeat: no-repeat;\n}\n.builder-select[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.builder-select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%], .builder-select[_ngcontent-%COMP%]   optgroup[_ngcontent-%COMP%] {\n  background: var(--tf-surface-2);\n  color: var(--tf-text);\n}\n\n.builder-input[_ngcontent-%COMP%] {\n  width: 100%;\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-3);\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-md);\n  color: var(--tf-text);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  font-variant-numeric: tabular-nums;\n}\n.builder-input[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.option-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-2);\n}\n.option-list--inline[_ngcontent-%COMP%] {\n  flex-direction: row;\n  flex-wrap: wrap;\n}\n.option-list--inline[_ngcontent-%COMP%]   .option-card[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 160px;\n}\n\n.option-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-height: var(--tf-touch-min);\n  padding: var(--tf-space-3) var(--tf-space-4);\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-md);\n  font-family: inherit;\n  text-align: left;\n  cursor: pointer;\n  transition: border-color var(--tf-duration-fast) var(--tf-ease-out), background var(--tf-duration-fast) var(--tf-ease-out);\n}\n.option-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--tf-border-strong);\n}\n.option-card--active[_ngcontent-%COMP%] {\n  background: var(--tf-accent-tint);\n  border-color: var(--tf-accent-soft-border);\n}\n.option-card[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.option-title[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-base);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.option-description[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-text-muted);\n  line-height: var(--tf-line-height-base);\n}\n\n.logic-switch[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 3px;\n  margin-bottom: var(--tf-space-4);\n  padding: 3px;\n  background: var(--tf-surface-3);\n  border-radius: var(--tf-radius-pill);\n  width: -moz-fit-content;\n  width: fit-content;\n}\n\n.logic-option[_ngcontent-%COMP%] {\n  position: relative;\n  min-height: 34px;\n  padding: 0 var(--tf-space-4);\n  border: none;\n  border-radius: var(--tf-radius-pill);\n  background: transparent;\n  color: var(--tf-text-muted);\n  font-family: inherit;\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n  cursor: pointer;\n}\n.logic-option[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 0;\n  right: 0;\n  height: var(--tf-touch-min);\n  transform: translateY(-50%);\n}\n.logic-option--active[_ngcontent-%COMP%] {\n  background: var(--tf-surface-5);\n  color: var(--tf-text);\n}\n.logic-option[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.condition-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-2);\n}\n\n.condition-joiner[_ngcontent-%COMP%] {\n  align-self: center;\n  padding: 0 var(--tf-space-3);\n  font-size: var(--tf-font-size-xs);\n  font-weight: 700;\n  color: var(--tf-text-muted);\n  letter-spacing: 0.06em;\n}\n\n.condition-card[_ngcontent-%COMP%], .action-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--tf-space-2);\n  padding: var(--tf-space-3);\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-md);\n}\n\n.action-card[_ngcontent-%COMP%] {\n  flex-direction: column;\n  gap: var(--tf-space-3);\n}\n\n.condition-fields[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--tf-space-2);\n}\n\n.builder-select--metric[_ngcontent-%COMP%] {\n  flex: 1 1 100%;\n}\n\n.value-field[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n  flex: 0 1 130px;\n}\n\n.value-unit[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-muted);\n  white-space: nowrap;\n}\n\n.condition-remove[_ngcontent-%COMP%] {\n  --background: var(--tf-surface-3);\n  --background-activated: var(--tf-surface-4);\n  --background-hover: var(--tf-surface-4);\n  --background-focused: var(--tf-surface-4);\n  --color: var(--tf-text-secondary);\n  --border-radius: var(--tf-radius-sm);\n  --padding-start: 0;\n  --padding-end: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  background: var(--tf-surface-3);\n  color: var(--tf-text-secondary);\n  border: none;\n  border-radius: var(--tf-radius-sm);\n  width: var(--tf-touch-min);\n  height: var(--tf-touch-min);\n  min-width: var(--tf-touch-min);\n  min-height: var(--tf-touch-min);\n  margin: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: background var(--tf-duration-fast) var(--tf-ease-out), color var(--tf-duration-fast) var(--tf-ease-out);\n  flex-shrink: 0;\n}\n.condition-remove[_ngcontent-%COMP%]:active {\n  background: var(--tf-surface-4);\n}\n.condition-remove[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.condition-remove[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.condition-remove[_ngcontent-%COMP%]:hover {\n  background: var(--tf-danger-soft);\n  color: var(--tf-danger-text);\n}\n\n.action-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n  width: 100%;\n}\n.action-head[_ngcontent-%COMP%]    > ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--tf-accent);\n}\n\n.action-title[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: var(--tf-font-size-base);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.action-card[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.priority-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-3);\n  width: 100%;\n}\n\n.priority-label[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-text-muted);\n}\n\n.add-row-button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n  min-height: var(--tf-touch-min);\n  margin-top: var(--tf-space-3);\n  padding: 0 var(--tf-space-4);\n  background: transparent;\n  border: 1px dashed var(--tf-border-strong);\n  border-radius: var(--tf-radius-md);\n  color: var(--tf-text-secondary);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  cursor: pointer;\n  transition: border-color var(--tf-duration-fast) var(--tf-ease-out), color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.add-row-button[_ngcontent-%COMP%]:hover {\n  border-color: var(--tf-accent-soft-border);\n  color: var(--tf-text);\n}\n.add-row-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.add-row-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n\n.inline-warning[_ngcontent-%COMP%], .inline-note[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--tf-space-2);\n  margin: var(--tf-space-4) 0 0;\n  padding: var(--tf-space-3);\n  border-radius: var(--tf-radius-md);\n  font-size: var(--tf-font-size-xs);\n  line-height: var(--tf-line-height-base);\n}\n.inline-warning[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], .inline-note[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  margin-top: 1px;\n  font-size: 15px;\n}\n\n.inline-warning[_ngcontent-%COMP%] {\n  background: var(--tf-accent-soft);\n  color: var(--tf-accent-text);\n}\n\n.inline-note[_ngcontent-%COMP%] {\n  background: var(--tf-surface-2);\n  color: var(--tf-text-muted);\n}\n\n.client-picker[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-3);\n  flex-wrap: wrap;\n  margin-top: var(--tf-space-4);\n}\n\n.secondary-button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-4);\n  background: var(--tf-surface-3);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-md);\n  color: var(--tf-text);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  cursor: pointer;\n}\n.secondary-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.client-count[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-text-muted);\n  font-variant-numeric: tabular-nums;\n}\n\n.save-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-3);\n  margin-top: var(--tf-space-6);\n}\n\n.save-error[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-muted);\n}\n\n.primary-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: var(--tf-radius-lg);\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  min-height: var(--tf-touch-min);\n  font-size: var(--tf-font-size-base);\n}\n.primary-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.primary-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.primary-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYXV0b21hdGlvbnMvcGFnZXMvcnVsZS1idWlsZGVyL3J1bGUtYnVpbGRlci5wYWdlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX2lucHV0cy5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19idXR0b25zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJBO0VBQ0U7SUFDRSwyQkFBQTtFQ3hCRjtBQUNGO0FBQUE7RUFDRSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0FBRUY7O0FBQ0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtBQUVGOztBQUNBO0VEYkUsa0JBQUE7RUFDQSxnQkFBQTtFQUNBLCtCQUFBO0VDYUEsa0NBQUE7QUFJRjtBRGZFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLDRCQUFBO0VBQ0EsK0VBQUE7RUFDQSxtQ0FBQTtBQ2lCSjtBRGRFO0VBQ0U7SUFDRSxlQUFBO0VDZ0JKO0FBQ0Y7O0FBZEE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSw2Q0FBQTtFQUNBLDJCQUFBO0FBaUJGO0FBZkU7RUFDRSxlQUFBO0VBQ0EsMkJBQUE7QUFpQko7QUFkRTtFQUNFLFNBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUFnQko7O0FBTkE7O0VBRUUsK0JBQUE7RUFDQSxrQ0FBQTtFQUNBLGtDQUFBO0VBQ0EsMEJBQUE7RUFDQSxnQ0FBQTtBQVNGOztBQU5BO0VBQ0UsZ0JBQUE7QUFTRjs7QUFOQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLHlCQUFBO0FBU0Y7QUFQRTtFQUNFLFVBQUE7RUFDQSxZQUFBO0VBQ0EsbUNBQUE7QUFTSjs7QUFM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QTtBQWNGOztBQVhBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esc0JBQUE7RUFDQSw2QkFBQTtBQWNGOztBQVRBO0VBQ0UsU0FBQTtFQUNBLGlDQUFBO0VBQ0EsMkJBQUE7QUFZRjs7QUFUQTtFRXBmRSxZQUFBO0VBQ0Esa0NGb2Y0QjtFRW5mNUIscUNBQUE7RUFDQSxnQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGdGQUFBO0VGaWZBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsK0JBQUE7RUFDQSxtQ0FBQTtBQWlCRjtBRXBnQkU7RUFDRSxzQkFBQTtBRnNnQko7QUVuZ0JFO0VBQ0UsYUFBQTtFQUNBLGVBQUE7QUZxZ0JKO0FFbGdCRTtFQUNFLGlDQUFBO0VBQ0EsbUJBQUE7QUZvZ0JKIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU2tlbGV0b24gZGUgY2FyZ2EgY29uIGJhcnJpZG8gZGUgc2hpbW1lciDDosKAwpQgbWlzbW8gYmxvcXVlIHJlcGV0aWRvIGxpdGVyYWxtZW50ZVxuLy8gZW4gfjEwIHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS5cbi8vIENhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW8gc2VsZWN0b3IgeSBhw4PCsWFkZSBlbmNpbWEgc29sbyBsb1xuLy8gcXVlIHZhcsODwq1hIChib3JkZXItcmFkaXVzLCBoZWlnaHQsIHdpZHRoLCB2YXJpYW50ZXMgY29uIG5vbWJyZSkuXG5AbWl4aW4gdGYtc2tlbGV0b24tc2hpbW1lciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcblxuICAmOjphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGluc2V0OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCB0cmFuc3BhcmVudCwgdmFyKC0tdGYtc2hpbW1lciksIHRyYW5zcGFyZW50KTtcbiAgICBhbmltYXRpb246IHRmLXNoaW1tZXIgMS40cyBpbmZpbml0ZTtcbiAgfVxuXG4gIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgJjo6YWZ0ZXIge1xuICAgICAgYW5pbWF0aW9uOiBub25lO1xuICAgIH1cbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHRmLXNoaW1tZXIge1xuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XG4gIH1cbn1cbiIsIkBpbXBvcnQgJy4uLy4uLy4uLy4uLy4uL3RoZW1lL3NrZWxldG9uJztcbkBpbXBvcnQgJy4uLy4uLy4uLy4uLy4uL3RoZW1lL2J1dHRvbnMnO1xuQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vdGhlbWUvaW5wdXRzJztcblxuLmJ1aWxkZXItY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtYmcpO1xuICAtLXBhZGRpbmctc3RhcnQ6IDIwcHg7XG4gIC0tcGFkZGluZy1lbmQ6IDIwcHg7XG4gIC0tcGFkZGluZy10b3A6IDEycHg7XG4gIC0tcGFkZGluZy1ib3R0b206IDMycHg7XG59XG5cbi5wYWdlLXNrZWxldG9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS00KTtcbn1cblxuLnNrZWxldG9uLWJsb2NrIHtcbiAgQGluY2x1ZGUgdGYtc2tlbGV0b24tc2hpbW1lcjtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLWxnKTtcbn1cblxuLnBhZ2Utc3RhdGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTEyKSB2YXIoLS10Zi1zcGFjZS02KTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDM0cHg7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtZmFpbnQpO1xuICB9XG5cbiAgaDIge1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1sZyk7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBUYXJqZXRhcyBkZSBwYXNvXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIExhIHJlZ2xhIHNlIGxlZSBkZSBhcnJpYmEgYWJham8gY29tbyB1bmEgZnJhc2U6IENVw4PCgU5ETyDDosKGwpIgU0kgw6LChsKSIEVOVE9OQ0VTLlxuLy8gQ2FkYSBwYXNvIGVzIHVuYSB0YXJqZXRhIHkgZW50cmUgZWxsYXMgaGF5IHVuIGNvbmVjdG9yIHZlcnRpY2FsLCBwYXJhIHF1ZVxuLy8gbGEgc2VjdWVuY2lhIHNlIHZlYSBhbnRlcyBkZSBsZWVybGEuXG4uYnVpbGRlci1jYXJkLFxuLnN0ZXAtY2FyZCB7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1sZyk7XG4gIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTUpO1xuICBtYXJnaW4tYm90dG9tOiB2YXIoLS10Zi1zcGFjZS00KTtcbn1cblxuLnN0ZXAtY2FyZCB7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG5cbi5zdGVwLWNvbm5lY3RvciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBoZWlnaHQ6IHZhcigtLXRmLXNwYWNlLTUpO1xuXG4gIHNwYW4ge1xuICAgIHdpZHRoOiAycHg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICB9XG59XG5cbi5zdGVwLWhlYWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTMpO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIG1hcmdpbi1ib3R0b206IHZhcigtLXRmLXNwYWNlLTQpO1xufVxuXG4uc3RlcC1iYWRnZSB7XG4gIHBhZGRpbmc6IDNweCB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLXBpbGwpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtc29mdCk7XG4gIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQtdGV4dCk7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDRlbTtcblxuICAvLyBMb3MgcGFzb3MgZGUgY29uZmlndXJhY2nDg8KzbiAobml2ZWwsIGFsY2FuY2UpIG5vIGZvcm1hbiBwYXJ0ZSBkZSBsYSBmcmFzZVxuICAvLyBDVcODwoFORE8vU0kvRU5UT05DRVMsIGFzw4PCrSBxdWUgbm8gY29tcGl0ZW4gcG9yIGVsIG1pc21vIGFjZW50by5cbiAgJi0tbXV0ZWQge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgfVxufVxuXG4uc3RlcC1oaW50IHtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQ2FtcG9zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi5maWVsZC1sYWJlbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW4tYm90dG9tOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUteHMpO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xufVxuXG4uaW5wdXQtd3JhcHBlciB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LXdyYXBwZXIodmFyKC0tdGYtc3VyZmFjZS0yKSk7XG4gIGhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbn1cblxuLmlucHV0LWZpZWxkIHtcbiAgQGluY2x1ZGUgdGYtaW5wdXQtZmllbGQ7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWJhc2UpO1xufVxuXG4vLyA8c2VsZWN0PiBuYXRpdm8sIG5vIHVuIGRlc3BsZWdhYmxlIHByb3BpbzogZW4gbcODwrN2aWwgYWJyZSBsYSBydWVkYSBkZWxcbi8vIHNpc3RlbWEsIHF1ZSBlcyBtw4PCoXMgcsODwqFwaWRhIHkgYWNjZXNpYmxlIHF1ZSBjdWFscXVpZXIgbGlzdGEgcmVpbXBsZW1lbnRhZGFcbi8vIChQUk9EVUNULm1kOiBubyByZWludmVudGFyIGFmZm9yZGFuY2VzIGVzdMODwqFuZGFyKS5cbi5idWlsZGVyLXNlbGVjdCB7XG4gIG1pbi1oZWlnaHQ6IHZhcigtLXRmLXRvdWNoLW1pbik7XG4gIHBhZGRpbmc6IDAgdmFyKC0tdGYtc3BhY2UtOCkgMCB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1tZCk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBhcHBlYXJhbmNlOiBub25lO1xuICAvLyBGbGVjaGEgZGlidWphZGEgY29uIGdyYWRpZW50ZXMsIHNpbiBpbWFnZW4gZXh0ZXJuYSBuaSBnbGlmbyB1bmljb2RlLlxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoNDVkZWcsIHRyYW5zcGFyZW50IDUwJSwgdmFyKC0tdGYtdGV4dC1tdXRlZCkgNTAlKSxcbiAgICBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS10Zi10ZXh0LW11dGVkKSA1MCUsIHRyYW5zcGFyZW50IDUwJSk7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNhbGMoMTAwJSAtIDE4cHgpIGNhbGMoNTAlICsgMnB4KSwgY2FsYygxMDAlIC0gMTNweCkgY2FsYyg1MCUgKyAycHgpO1xuICBiYWNrZ3JvdW5kLXNpemU6IDVweCA1cHgsIDVweCA1cHg7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG5cbiAgb3B0aW9uLFxuICBvcHRncm91cCB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIH1cbn1cblxuLmJ1aWxkZXItaW5wdXQge1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgcGFkZGluZzogMCB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1tZCk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcbiAgZm9udC12YXJpYW50LW51bWVyaWM6IHRhYnVsYXItbnVtcztcblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBPcGNpb25lcyAodHJpZ2dlciwgbml2ZWwsIGFsY2FuY2UpXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi5vcHRpb24tbGlzdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG5cbiAgJi0taW5saW5lIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGZsZXgtd3JhcDogd3JhcDtcblxuICAgIC5vcHRpb24tY2FyZCB7XG4gICAgICBmbGV4OiAxO1xuICAgICAgbWluLXdpZHRoOiAxNjBweDtcbiAgICB9XG4gIH1cbn1cblxuLm9wdGlvbi1jYXJkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAycHg7XG4gIG1pbi1oZWlnaHQ6IHZhcigtLXRmLXRvdWNoLW1pbik7XG4gIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTMpIHZhcigtLXRmLXNwYWNlLTQpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbWQpO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpLFxuICAgIGJhY2tncm91bmQgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6aG92ZXIge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIH1cblxuICAvLyBMYSBvcGNpw4PCs24gZWxlZ2lkYSBzZSBtYXJjYSBjb24gYm9yZGUgeSB0aW50ZSBkZSBhY2VudG8gw6LCgMKUIHNpbiBpY29ubyBkZVxuICAvLyBjaGVjayBhw4PCsWFkaWRvOiBlbCBlc3RhZG8geWEgc2UgbGVlLCB5IHVuIGNoZWNrIGR1cGxpY2Fyw4PCrWEgbGEgc2XDg8KxYWwuXG4gICYtLWFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LXRpbnQpO1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYWNjZW50LXNvZnQtYm9yZGVyKTtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxufVxuXG4ub3B0aW9uLXRpdGxlIHtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtYmFzZSk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbn1cblxuLm9wdGlvbi1kZXNjcmlwdGlvbiB7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBsaW5lLWhlaWdodDogdmFyKC0tdGYtbGluZS1oZWlnaHQtYmFzZSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gQ29uZGljaW9uZXNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLmxvZ2ljLXN3aXRjaCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogM3B4O1xuICBtYXJnaW4tYm90dG9tOiB2YXIoLS10Zi1zcGFjZS00KTtcbiAgcGFkZGluZzogM3B4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtcGlsbCk7XG4gIHdpZHRoOiBmaXQtY29udGVudDtcbn1cblxuLmxvZ2ljLW9wdGlvbiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgbWluLWhlaWdodDogMzRweDtcbiAgcGFkZGluZzogMCB2YXIoLS10Zi1zcGFjZS00KTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtcGlsbCk7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS14cyk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcblxuICAvLyBNaXNtbyBjcml0ZXJpbyBxdWUgbG9zIHNlZ21lbnRvcyBkZWwgc2VsZWN0b3IgZGUgc2VtYW5hcyBkZWwgUmVzdW1lbjpcbiAgLy8gZGlidWpvIGNvbXBhY3RvLCDDg8KhcmVhIHB1bHNhYmxlIGFsIG3Dg8KtbmltbyB0w4PCoWN0aWwsIGFtcGxpYWRhIHNvbG8gZW5cbiAgLy8gdmVydGljYWwgcGFyYSBubyBzb2xhcGFyIGNvbiBlbCBzZWdtZW50byB2ZWNpbm8uXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogNTAlO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgaGVpZ2h0OiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgfVxuXG4gICYtLWFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS01KTtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLmNvbmRpdGlvbi1saXN0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbn1cblxuLmNvbmRpdGlvbi1qb2luZXIge1xuICBhbGlnbi1zZWxmOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDAgdmFyKC0tdGYtc3BhY2UtMyk7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBsZXR0ZXItc3BhY2luZzogMC4wNmVtO1xufVxuXG4uY29uZGl0aW9uLWNhcmQsXG4uYWN0aW9uLWNhcmQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMik7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1tZCk7XG59XG5cbi5hY3Rpb24tY2FyZCB7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMyk7XG59XG5cbi5jb25kaXRpb24tZmllbGRzIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG59XG5cbi8vIExhIG3Dg8KpdHJpY2EgZXMgbG8gcHJpbWVybyBxdWUgc2UgZWxpZ2UgeSBsYSBldGlxdWV0YSBtw4PCoXMgbGFyZ2E6IG9jdXBhIGxhXG4vLyBsw4PCrW5lYSBlbnRlcmEgYW50ZXMgZGUgcXVlIGVsIHJlc3RvIGxhIGRlamUgZW4gMTIgY2FyYWN0ZXJlcy5cbi5idWlsZGVyLXNlbGVjdC0tbWV0cmljIHtcbiAgZmxleDogMSAxIDEwMCU7XG59XG5cbi52YWx1ZS1maWVsZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIGZsZXg6IDAgMSAxMzBweDtcbn1cblxuLnZhbHVlLXVuaXQge1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLmNvbmRpdGlvbi1yZW1vdmUge1xuICBAaW5jbHVkZSB0Zi1pY29uLWJ1dHRvbih2YXIoLS10Zi10b3VjaC1taW4pLCB2YXIoLS10Zi1yYWRpdXMtc20pLCAyMHB4KTtcblxuICBmbGV4LXNocmluazogMDtcblxuICAmOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1kYW5nZXItc29mdCk7XG4gICAgY29sb3I6IHZhcigtLXRmLWRhbmdlci10ZXh0KTtcbiAgfVxufVxuXG4uYWN0aW9uLWhlYWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTIpO1xuICB3aWR0aDogMTAwJTtcblxuICA+IGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIH1cbn1cblxuLmFjdGlvbi10aXRsZSB7XG4gIGZsZXg6IDE7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWJhc2UpO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG59XG5cbi5hY3Rpb24tY2FyZCAuaW5wdXQtd3JhcHBlciB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4ucHJpb3JpdHktcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5wcmlvcml0eS1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xufVxuXG4uYWRkLXJvdy1idXR0b24ge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgbWluLWhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgbWFyZ2luLXRvcDogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIHBhZGRpbmc6IDAgdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IDFweCBkYXNoZWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1tZCk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICBjb2xvciB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjpob3ZlciB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1hY2NlbnQtc29mdC1ib3JkZXIpO1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBBdmlzb3MgeSBndWFyZGFkb1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4uaW5saW5lLXdhcm5pbmcsXG4uaW5saW5lLW5vdGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgbWFyZ2luOiB2YXIoLS10Zi1zcGFjZS00KSAwIDA7XG4gIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTMpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbWQpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS14cyk7XG4gIGxpbmUtaGVpZ2h0OiB2YXIoLS10Zi1saW5lLWhlaWdodC1iYXNlKTtcblxuICBpb24taWNvbiB7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgbWFyZ2luLXRvcDogMXB4O1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgfVxufVxuXG4uaW5saW5lLXdhcm5pbmcge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtc29mdCk7XG4gIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQtdGV4dCk7XG59XG5cbi5pbmxpbmUtbm90ZSB7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMik7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbn1cblxuLmNsaWVudC1waWNrZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTMpO1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIG1hcmdpbi10b3A6IHZhcigtLXRmLXNwYWNlLTQpO1xufVxuXG4uc2Vjb25kYXJ5LWJ1dHRvbiB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTIpO1xuICBtaW4taGVpZ2h0OiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICBwYWRkaW5nOiAwIHZhcigtLXRmLXNwYWNlLTQpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLW1kKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG59XG5cbi5jbGllbnQtY291bnQge1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS14cyk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgZm9udC12YXJpYW50LW51bWVyaWM6IHRhYnVsYXItbnVtcztcbn1cblxuLnNhdmUtYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgbWFyZ2luLXRvcDogdmFyKC0tdGYtc3BhY2UtNik7XG59XG5cbi8vIFBvciBxdcODwqkgbm8gc2UgcHVlZGUgZ3VhcmRhciwgZGljaG8gc2llbXByZS4gVW4gYm90w4PCs24gZGVzYWN0aXZhZG8gc2luXG4vLyBleHBsaWNhY2nDg8KzbiBkZWphIGFsIGNvYWNoIGFkaXZpbmFuZG8gcXXDg8KpIGxlIGZhbHRhLlxuLnNhdmUtZXJyb3Ige1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xufVxuXG4ucHJpbWFyeS1idXR0b24ge1xuICBAaW5jbHVkZSB0Zi1ncmFkaWVudC1idXR0b24odmFyKC0tdGYtcmFkaXVzLWxnKSk7XG5cbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IHZhcigtLXRmLXRvdWNoLW1pbik7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWJhc2UpO1xufVxuIiwiLy8gRmlsYSBkZSBpbnB1dCBjb24gaWNvbm8gKHdyYXBwZXIgKyBpY29ubyArIGNhbXBvKSDDosKAwpQgcmVwZXRpZGEgZW4gNCBww4PCoWdpbmFzXG4vLyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLiBFbCBmb25kb1xuLy8gZGVsIHdyYXBwZXIgZXMgZWwgw4PCum5pY28gdmFsb3IgcXVlIHZhcsODwq1hIHBvciBww4PCoWdpbmEgKHN1cGVyZmljaWUgMSBvIDIgc2Vnw4PCum5cbi8vIGNvbnRleHRvIHZpc3VhbCksIGRlIGFow4PCrSBlbCBwYXLDg8KhbWV0cm87IHRhbWHDg8KxbyBkZSBmdWVudGUvYWx0by9tYXJnZW4gc2Vcbi8vIGRlamFuIGZ1ZXJhIGRlbCBtaXhpbiBwb3JxdWUgY2FkYSBww4PCoWdpbmEgbG9zIGZpamEgc2Vnw4PCum4gc3UgcHJvcGlvIGxheW91dC5cbkBtaXhpbiB0Zi1pbnB1dC13cmFwcGVyKCRiZzogdmFyKC0tdGYtc3VyZmFjZS0xKSkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEwcHg7XG4gIGJhY2tncm91bmQ6ICRiZztcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBhZGRpbmc6IDAgMTRweDtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmZvY3VzLXdpdGhpbiB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICB9XG59XG5cbkBtaXhpbiB0Zi1pbnB1dC1pY29uIHtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBmbGV4LXNocmluazogMDtcbn1cblxuQG1peGluIHRmLWlucHV0LWZpZWxkIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBvdXRsaW5lOiBub25lO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBoZWlnaHQ6IDEwMCU7XG5cbiAgJjo6cGxhY2Vob2xkZXIge1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgfVxufVxuIiwiLy8gQm90w4PCs24gQ1RBIGNvbiBncmFkaWVudGUgZGUgYWNlbnRvIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gZW4gfjExIHNpdGlvcyBkZVxuLy8gfjEwIHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS5cbi8vIENhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW8gc2VsZWN0b3IgeSBhw4PCsWFkZSBlbmNpbWEgc29sbyBsb1xuLy8gcXVlIHZhcsODwq1hIHBvciBsYXlvdXQgKHdpZHRoLCBoZWlnaHQsIGZvbnQtc2l6ZSwgbWFyZ2luKS5cbi8vXG4vLyBMYSBtaXRhZCBkZSBsb3Mgc2l0aW9zIG9yaWdpbmFsZXMgbm8gdGVuw4PCrWFuIHRyYW5zaWNpw4PCs24vZmVlZGJhY2sgZGUgcHVsc2FjacODwrNuXG4vLyBuaSA6Zm9jdXMtdmlzaWJsZSDDosKAwpQgZWwgbWl4aW4gbG9zIGHDg8KxYWRlIHNpZW1wcmUsIGNpZXJyYSBlc2UgaHVlY28gZGVcbi8vIGNvbnNpc3RlbmNpYSBkZSBpbnRlcmFjY2nDg8KzbiAoUFJPRFVDVC5tZDogXCJ1biBzb2xvIHBhdHLDg8KzbiBwb3IgdGlwbyBkZVxuLy8gY29tcG9uZW50ZVwiKSBlbiB2ZXogZGUgcGVycGV0dWFyIGxhIHZhcmlhY2nDg8KzbiBhY2NpZGVudGFsLlxuQG1peGluIHRmLWdyYWRpZW50LWJ1dHRvbigkcmFkaXVzOiAxMnB4KSB7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LWdyYWRpZW50KTtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudC1jb250cmFzdCk7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSwgb3BhY2l0eSAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45Nyk7XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjQ1O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLXRleHQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLy8gQm90w4PCs24gZGUgaGVhZGVyIHF1ZSBlcyBzb2xvIHVuIGljb25vIMOiwoDClCBtaXNtbyBsb29rIFwiZW52dWVsdG9cIiBxdWUgeWEgdXNhIGxhXG4vLyBhcHAgZGUgY29uc3VtaWRvciBlbiBzdXMgdG9vbGJhcnMgKHBhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy8uLi4vZGlldHMvXG4vLyBjb21wb25lbnRzL3Rvb2xiYXItY2FsZW5kYXI6IGZvbmRvICsgYm9yZGVyLXJhZGl1cyArIGNhamEgZmlqYSA0NHg0NCwgZW5cbi8vIHZleiBkZWwgaW9uLWJ1dHRvbiBwbGFuby90cmFuc3BhcmVudGUgcXVlIHRlbsODwq1hIGNhZGEgcGFudGFsbGEgZGUgdHJhaW5lcnNcbi8vIGhhc3RhIGFob3JhKS4gVG9rZW5lYWRvIGEgbGEgcGFsZXRhIGRlIGVzdGEgYXBwIGVuIHZleiBkZSByZXBldGlyIGxvc1xuLy8gcmdiYSgyNTUsMjU1LDI1NSwuLi4pIHN1ZWx0b3MgZGVsIG9yaWdpbmFsLlxuLy9cbi8vIFNpcnZlIHRhbnRvIHBhcmEgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCI+ICh1c2EgbGFzIENTUyBjdXN0b20gcHJvcGVydGllc1xuLy8gZGUgSW9uaWMpIGNvbW8gcGFyYSB1biA8YnV0dG9uPiBuYXRpdm8gKHVzYSBsYXMgcHJvcGllZGFkZXMgcGxhbmFzKSDDosKAwpRcbi8vIGFtYm9zIGNvZXhpc3RlbiBob3kgZW4gdHJhaW5lcnMgcGFyYSBlbCBtaXNtbyByb2wgZGUgXCJ2b2x2ZXJcIi9cImNlcnJhclwiLlxuQG1peGluIHRmLWljb24tYnV0dG9uKCRzaXplOiA0NHB4LCAkcmFkaXVzOiAxMnB4LCAkaWNvbi1zaXplOiAyMHB4KSB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcbiAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1iYWNrZ3JvdW5kLWhvdmVyOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtZm9jdXNlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1jb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICAtLWJvcmRlci1yYWRpdXM6ICN7JHJhZGl1c307XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbiAgLS1wYWRkaW5nLXRvcDogMDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMDtcblxuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6ICRyYWRpdXM7XG4gIHdpZHRoOiAkc2l6ZTtcbiAgaGVpZ2h0OiAkc2l6ZTtcbiAgbWluLXdpZHRoOiAkc2l6ZTtcbiAgbWluLWhlaWdodDogJHNpemU7XG4gIG1hcmdpbjogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCksXG4gICAgY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogJGljb24tc2l6ZTtcbiAgfVxufVxuXG4vLyBFeHBhbnNvciBpbnZpc2libGUgZGUgem9uYSBwdWxzYWJsZS5cbi8vXG4vLyBQQVJBIFFVw4PCiTogdW4gY29udHJvbCBjb21wYWN0byAodW4gaWNvbm8gZGUgMzIgcHggZW4gdW5hIGZpbGEgZGUgdGFibGEsIHVuXG4vLyBlbmxhY2UgZGUgdGV4dG8gZGUgMTYgcHgpIG5vIGxsZWdhIGEgbG9zIDQ0IHB4IHF1ZSBleGlnZSBQUk9EVUNULm1kLCB5XG4vLyBlbmdvcmRhcmxvIGRlIHZlcmRhZCBkZXNwbGF6YSB0b2RvIGxvIHF1ZSB0aWVuZSBhbHJlZGVkb3Igw6LCgMKUIGVuIHVuYSB0YWJsYVxuLy8gZGUgdmVpbnRlIGZpbGFzLCA4IHB4IHBvciBmaWxhIHNvbiBtZWRpYSBwYW50YWxsYS5cbi8vXG4vLyBFbCBwc2V1ZG9lbGVtZW50byBjcmVjZSBoYWNpYSBmdWVyYSBzaW4gb2N1cGFyIHNpdGlvIGVuIGVsIGZsdWpvLCBhc8ODwq0gcXVlXG4vLyBlbCBib3TDg8KzbiBzZSB2ZSBwZXF1ZcODwrFvIHkgc2UgcHVsc2EgZ3JhbmRlLlxuLy9cbi8vIEFWSVNPIERFIE1FRElDScODwpNOOiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBOTyB2ZSBlc3RlIHBzZXVkb2VsZW1lbnRvLCBhc8ODwq1cbi8vIHF1ZSBhbCB2ZXJpZmljYXIgaGF5IHF1ZSB1c2FyIGVsZW1lbnRGcm9tUG9pbnQgY29uIGVsIGVsZW1lbnRvIGRlbnRybyBkZWxcbi8vIHZpZXdwb3J0LiBBZGVtw4PCoXMgZWwgaGl0LXRlc3QgZGV2dWVsdmUgMiBweCBtZW5vcyBxdWUgbGEgY2FqYSBkZWNsYXJhZGFcbi8vIChjb21wcm9iYWRvOiAtNHB4IGRhIDQyLCAtNnB4IGRhIDQ2KSwgYXPDg8KtIHF1ZSB1biA0MiBtZWRpZG8gc29uIDQ0IHJlYWxlcy5cbi8vXG4vLyAkZ3JvdzogY3XDg8KhbnRvIGNyZWNlIHBvciBjYWRhIGxhZG8uIDRweCBsbGV2YSB1biBjb250cm9sIGRlIDM2IHB4IGEgNDQuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIoJGdyb3c6IDRweCkge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IC0jeyRncm93fTtcbiAgfVxufVxuXG4vLyBWYXJpYW50ZSBxdWUgc29sbyBjcmVjZSBlbiBWRVJUSUNBTC4gUGFyYSBjb250cm9sZXMgZW4gZmlsYSBkb25kZSBlbFxuLy8gZXhwYW5zb3IgaG9yaXpvbnRhbCBzZSBzb2xhcGFyw4PCrWEgY29uIGVsIGRlIGFsIGxhZG8geSByb2JhcsODwq1hIHN1cyB0b3F1ZXMuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIteSgkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC0jeyRncm93fTtcbiAgICBib3R0b206IC0jeyRncm93fTtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ })

}]);
//# sourceMappingURL=src_app_features_automations_automations_module_ts.js.map