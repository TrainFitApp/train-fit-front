"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_features_profile_profile_module_ts"],{

/***/ 56246:
/*!************************************************************!*\
  !*** ./src/app/features/profile/profile-routing.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProfilePageRoutingModule: () => (/* binding */ ProfilePageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_features_profile_profile_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/features/profile/profile.page */ 80411);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _ProfilePageRoutingModule;




const routes = [{
  path: '',
  component: src_app_features_profile_profile_page__WEBPACK_IMPORTED_MODULE_1__.ProfilePage
}];
class ProfilePageRoutingModule {}
_ProfilePageRoutingModule = ProfilePageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProfilePageRoutingModule, "\u0275fac", function ProfilePageRoutingModule_Factory(t) {
  return new (t || _ProfilePageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProfilePageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _ProfilePageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProfilePageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ProfilePageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 16735:
/*!****************************************************!*\
  !*** ./src/app/features/profile/profile.module.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProfilePageModule: () => (/* binding */ ProfilePageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _profile_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./profile-routing.module */ 56246);
/* harmony import */ var src_app_features_profile_profile_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/features/profile/profile.page */ 80411);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);

var _ProfilePageModule;




class ProfilePageModule {}
_ProfilePageModule = ProfilePageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProfilePageModule, "\u0275fac", function ProfilePageModule_Factory(t) {
  return new (t || _ProfilePageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProfilePageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _ProfilePageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProfilePageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _profile_routing_module__WEBPACK_IMPORTED_MODULE_2__.ProfilePageRoutingModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](ProfilePageModule, {
    declarations: [src_app_features_profile_profile_page__WEBPACK_IMPORTED_MODULE_3__.ProfilePage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _profile_routing_module__WEBPACK_IMPORTED_MODULE_2__.ProfilePageRoutingModule]
  });
})();

/***/ }),

/***/ 10755:
/*!*****************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/diet-days/components/weight-info/constants/chartRanges.ts ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CHART_RANGES: () => (/* binding */ CHART_RANGES),
/* harmony export */   CHART_RANGES_TYPES: () => (/* binding */ CHART_RANGES_TYPES),
/* harmony export */   CHART_RANGES_VALUES: () => (/* binding */ CHART_RANGES_VALUES)
/* harmony export */ });
var CHART_RANGES_TYPES;
(function (CHART_RANGES_TYPES) {
  CHART_RANGES_TYPES["week"] = "semana";
  CHART_RANGES_TYPES["month"] = "mes";
})(CHART_RANGES_TYPES || (CHART_RANGES_TYPES = {}));
const CHART_RANGES = {
  week: 'semana',
  month: 'mes'
};
const CHART_RANGES_VALUES = Object.values(CHART_RANGES);

/***/ }),

/***/ 81286:
/*!********************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/profile/models/groups.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GROUPS: () => (/* binding */ GROUPS),
/* harmony export */   GROUPS_VALUES: () => (/* binding */ GROUPS_VALUES)
/* harmony export */ });
var GROUPS;
(function (GROUPS) {
  GROUPS["day"] = "Diario";
  GROUPS["month"] = "Mensual";
  GROUPS["year"] = "Anual";
})(GROUPS || (GROUPS = {}));
// export const GROUPS_VALUES = { ...GROUPS } as const;
const GROUPS_VALUES = Object.values(GROUPS);

/***/ }),

/***/ 32376:
/*!*************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/profile/models/tableGroups.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TABLE_GROUPS: () => (/* binding */ TABLE_GROUPS),
/* harmony export */   TABLE_GROUPS_VALUES: () => (/* binding */ TABLE_GROUPS_VALUES)
/* harmony export */ });
var TABLE_GROUPS;
(function (TABLE_GROUPS) {
  TABLE_GROUPS["today"] = "Hoy";
  TABLE_GROUPS["summary"] = "Resumen";
  TABLE_GROUPS["workout"] = "Entrenamiento";
  TABLE_GROUPS["split"] = "Micro-ciclo";
  TABLE_GROUPS["mesocycle"] = "Meso-ciclo";
  TABLE_GROUPS["table"] = "Rutina";
})(TABLE_GROUPS || (TABLE_GROUPS = {}));
const TABLE_GROUPS_VALUES = Object.values(TABLE_GROUPS);

/***/ }),

/***/ 80411:
/*!*******************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/profile/profile.page.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProfilePage: () => (/* binding */ ProfilePage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _capacitor_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/browser */ 90660);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! rxjs */ 37728);
/* harmony import */ var src_app_core_services_coach_coach_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/coach/coach.service */ 96370);
/* harmony import */ var src_app_core_services_table_table_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/table/table.service */ 91594);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var src_app_core_services_workout_workout_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/workout/workout.service */ 76990);
/* harmony import */ var src_app_core_services_billing_billing_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/billing/billing.service */ 58854);
/* harmony import */ var src_app_core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/services/auth/auth.service */ 74048);
/* harmony import */ var src_app_app_shell_config__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/app-shell.config */ 21394);
/* harmony import */ var src_app_features_diet_days_components_weight_info_constants_chartRanges__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/features/diet-days/components/weight-info/constants/chartRanges */ 10755);
/* harmony import */ var src_app_shared_constants_calculators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/shared/constants/calculators */ 92557);
/* harmony import */ var src_app_shared_constants_info__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/shared/constants/info */ 57914);
/* harmony import */ var src_app_shared_constants_links__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/shared/constants/links */ 16505);
/* harmony import */ var src_app_shared_constants_social_network__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/shared/constants/social-network */ 17750);
/* harmony import */ var src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/shared/constants/steps */ 2923);
/* harmony import */ var src_app_shared_constants_training__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/shared/constants/training */ 58163);
/* harmony import */ var src_app_shared_models_macros_data__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/shared/models/macros-data */ 41805);
/* harmony import */ var src_app_shared_models_theme__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/shared/models/theme */ 20544);
/* harmony import */ var _models_groups__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./models/groups */ 81286);
/* harmony import */ var _models_tableGroups__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./models/tableGroups */ 32376);
/* harmony import */ var _components_configuration_components_editor_editor_page__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/configuration/components/editor/editor.page */ 61206);
/* harmony import */ var src_app_core_services_remote_config_remote_config_gate_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! src/app/core/services/remote-config/remote-config-gate.service */ 51150);
/* harmony import */ var src_app_core_services_util_util_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! src/app/core/services/util/util.service */ 35400);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var src_app_core_services_util_theme_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! src/app/core/services/util/theme.service */ 18341);
/* harmony import */ var src_app_core_services_anthropometry_anthropometry_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! src/app/core/services/anthropometry/anthropometry.service */ 80714);
/* harmony import */ var src_app_core_services_diet_day_diet_day_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! src/app/core/services/diet-day/diet-day.service */ 18086);
/* harmony import */ var src_app_core_services_nutritional_goal_nutritional_goal_service__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! src/app/core/services/nutritional-goal/nutritional-goal.service */ 29586);
/* harmony import */ var src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! src/app/core/services/util/navigation.service */ 22938);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @ionic/angular */ 45398);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var src_app_core_services_util_ad_mob_service__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! src/app/core/services/util/ad-mob.service */ 36718);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _shared_ui_src_app_shared_components_maintenance_warning_banner_maintenance_warning_banner_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ../../../../../shared-ui/src/app/shared/components/maintenance-warning-banner/maintenance-warning-banner.component */ 61033);
/* harmony import */ var _shared_ui_src_app_shared_pipes_translate_db_pipe__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ../../../../../shared-ui/src/app/shared/pipes/translate-db.pipe */ 36191);


var _ProfilePage;





































function ProfilePage_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](1, "ion-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
  }
}
function ProfilePage_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](1, "ion-icon", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](2, "ion-text", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("name", ctx_r1.iconArrowObjetive)("color", ctx_r1.colorObjetive);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("color", ctx_r1.colorObjetive);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](ctx_r1.objetiveMessage);
  }
}
function ProfilePage_button_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵlistener"]("click", function ProfilePage_button_25_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵresetView"](ctx_r10.revertImpersonation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](1, "ion-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
  }
}
function ProfilePage_button_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵlistener"]("click", function ProfilePage_button_26_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵresetView"](ctx_r12.goToUsers());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](1, "ion-icon", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
  }
}
function ProfilePage_app_maintenance_warning_banner_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "app-maintenance-warning-banner", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵlistener"]("dismissed", function ProfilePage_app_maintenance_warning_banner_27_Template_app_maintenance_warning_banner_dismissed_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵresetView"](ctx_r15.dismissMaintenanceWarning());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const maintenanceBanner_r14 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("message", maintenanceBanner_r14.message);
  }
}
function ProfilePage_button_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵlistener"]("click", function ProfilePage_button_29_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵresetView"](ctx_r17.goToPremium());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](1, "ion-icon", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](2, "div", 36)(3, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](6, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](9, "ion-icon", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](5, 2, "PROFILE.GO_PRO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](8, 4, "PROFILE.PREMIUM_SUBTITLE"));
  }
}
function ProfilePage_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "div", 40)(1, "div", 41)(2, "h3", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](3, "ion-icon", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](7, "div", 44)(8, "ion-toggle", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵlistener"]("ionChange", function ProfilePage_div_30_Template_ion_toggle_ionChange_8_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵrestoreView"](_r20);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵresetView"](ctx_r19.toggleNutritionView());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](9, "div", 46)(10, "div", 47)(11, "div", 48)(12, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](14, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](16, "div", 51)(17, "div", 52)(18, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](19, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](20, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](22, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](23, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](24, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](25, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](26, "div", 52)(27, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](28, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](29, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](31, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](32, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](33, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](34, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](35, "div", 52)(36, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](37, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](38, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](40, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](41, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](42, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](43, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate1"](" ", ctx_r6.showRemainingNutrition ? _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](5, 20, "PROFILE.MACROS_REMAINING") : _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](6, 22, "PROFILE.MACROS_CONSUMED"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("checked", ctx_r6.showRemainingNutrition);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngClass", ctx_r6.getKcalValueClass());
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate1"](" ", ctx_r6.getNutritionValue(), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](ctx_r6.getNutritionLabel());
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](22, 24, "PROFILE.PROTEIN"));
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngClass", ctx_r6.getProteinValueClass())("innerHTML", ctx_r6.getProteinValues(), _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵstyleProp"]("width", ctx_r6.proteinPercentage, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](31, 26, "PROFILE.CBH"));
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngClass", ctx_r6.getCarbValueClass())("innerHTML", ctx_r6.getCarbValues(), _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵstyleProp"]("width", ctx_r6.carbohydratesPercentage, "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](40, 28, "PROFILE.FATS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngClass", ctx_r6.getFatValueClass())("innerHTML", ctx_r6.getFatValues(), _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵstyleProp"]("width", ctx_r6.fatPercentage, "%");
  }
}
function ProfilePage_div_31_span_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "span", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngClass", ctx_r21.getWeightChangeClass(ctx_r21.currWeightAverage, ctx_r21.prevWeightAverage));
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate2"](" ", ctx_r21.getWeightChangeIcon(ctx_r21.currWeightAverage, ctx_r21.prevWeightAverage), "", ctx_r21.getWeightChangeText(ctx_r21.currWeightAverage, ctx_r21.prevWeightAverage), " ");
  }
}
function ProfilePage_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "div", 63)(1, "div", 41)(2, "h3", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](3, "ion-icon", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](6, "div", 44)(7, "button", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵlistener"]("click", function ProfilePage_div_31_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵrestoreView"](_r23);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵresetView"](ctx_r22.goToWeightInfo());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](8, "ion-icon", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](9, "div", 67)(10, "div", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵlistener"]("click", function ProfilePage_div_31_Template_div_click_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵrestoreView"](_r23);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵresetView"](ctx_r24.showInfo("PROFILE.TODAY_WEIGHT_INFO"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](11, "div", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](14, "div", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](16, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](17, "div", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵlistener"]("click", function ProfilePage_div_31_Template_div_click_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵrestoreView"](_r23);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵresetView"](ctx_r25.showInfo("PROFILE.PREV_WEEK_AVG_INFO"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](18, "div", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](21, "div", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](23, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](24, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵlistener"]("click", function ProfilePage_div_31_Template_div_click_24_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵrestoreView"](_r23);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵresetView"](ctx_r26.showInfo("PROFILE.CURR_WEEK_AVG_INFO"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](25, "div", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](27, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](28, "div", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](30, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplate"](31, ProfilePage_div_31_span_31_Template, 2, 3, "span", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](32, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](5, 8, "PROFILE.WEIGHT_PROGRESS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](13, 10, "PROFILE.TODAY_WEIGHT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate1"](" ", ctx_r7.getTodayWeight() ? _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind2"](16, 12, ctx_r7.getTodayWeight(), "1.0-2") + "kg" : "-", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](20, 15, "PROFILE.PREV_WEEK_AVG"));
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind2"](23, 17, ctx_r7.prevWeightAverage || 0, "1.0-2"), "kg ");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](27, 20, "PROFILE.CURR_WEEK_AVG"));
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate1"](" ", ctx_r7.currWeightAverage === 0 ? "-" : _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind2"](30, 22, ctx_r7.currWeightAverage || 0, "1.0-2") + "kg", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngIf", ctx_r7.currWeightAverage && ctx_r7.prevWeightAverage);
  }
}
const _c0 = function (a0) {
  return {
    split: a0
  };
};
function ProfilePage_div_32_div_1_p_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "p", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind2"](2, 1, "PROFILE.MICROCYCLE", _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpureFunction1"](4, _c0, ctx_r30.getCurrentPlayingSplit())), " ");
  }
}
const _c1 = function (a0) {
  return {
    count: a0
  };
};
function ProfilePage_div_32_div_1_p_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "p", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind2"](2, 1, "PROFILE.MICROCYCLES_AVAILABLE", _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpureFunction1"](4, _c1, (ctx_r31.tableInUse.splits == null ? null : ctx_r31.tableInUse.splits.length) || 0)), " ");
  }
}
const _c2 = function (a0, a1) {
  return {
    "active": a0,
    "completed": a1
  };
};
const _c3 = function (a0, a1) {
  return {
    completed: a0,
    total: a1
  };
};
function ProfilePage_div_32_div_1_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "div", 87)(1, "div", 88)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](4, "span", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](8, "div", 90)(9, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](12, "div", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](13, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](14, "div", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵlistener"]("click", function ProfilePage_div_32_div_1_div_12_Template_div_click_14_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵrestoreView"](_r34);
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"](3);
      ctx_r33.goToStatistics();
      return _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵresetView"]($event.stopPropagation());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](15, "ion-icon", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](16, "div", 95)(17, "span", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](19, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](ctx_r32.workoutInUse.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpureFunction2"](18, _c2, !ctx_r32.isWorkoutInUseEnded, ctx_r32.isWorkoutInUseEnded));
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](ctx_r32.isWorkoutInUseEnded ? _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](6, 9, "PROFILE.COMPLETED") : _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](7, 11, "PROFILE.ACTIVE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind2"](11, 13, "PROFILE.EXERCISES_COMPLETED", _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpureFunction2"](21, _c3, ctx_r32.completedExercises, ctx_r32.workoutInUse.exercises.length)));
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵstyleProp"]("width", ctx_r32.completedExercises / ctx_r32.workoutInUse.exercises.length * 100, "%")("background-color", ctx_r32.isWorkoutInUseEnded ? "var(--pe-accent)" : "var(--ion-color-success)");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](19, 16, "PROFILE.STATISTICS"));
  }
}
function ProfilePage_div_32_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "div", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵlistener"]("click", function ProfilePage_div_32_div_1_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵrestoreView"](_r36);
      const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵresetView"](ctx_r35.goToSummary());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](1, "div", 79)(2, "h2", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](3, "ion-icon", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](6, "div", 82)(7, "p", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](9, "translateDb");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplate"](10, ProfilePage_div_32_div_1_p_10_Template, 3, 6, "p", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplate"](11, ProfilePage_div_32_div_1_p_11_Template, 3, 6, "p", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplate"](12, ProfilePage_div_32_div_1_div_12_Template, 20, 24, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](5, 5, "PROFILE.ACTIVE_ROUTINE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](9, 7, ctx_r27.tableInUse.name));
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngIf", (ctx_r27.user == null ? null : ctx_r27.user.workoutInUse) && ctx_r27.workoutInUse);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngIf", !(ctx_r27.user == null ? null : ctx_r27.user.workoutInUse));
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngIf", (ctx_r27.user == null ? null : ctx_r27.user.workoutInUse) && ctx_r27.workoutInUse);
  }
}
function ProfilePage_div_32_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "div", 97)(1, "div", 98)(2, "div", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](3, "ion-icon", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](4, "p", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](7, "p", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](10, "ion-button", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵlistener"]("click", function ProfilePage_div_32_ng_template_2_Template_ion_button_click_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵrestoreView"](_r38);
      const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵresetView"](ctx_r37.goToSummary());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](6, 3, "PROFILE.NO_ROUTINE_TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](9, 5, "PROFILE.NO_ROUTINE_SUBTITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](12, 7, "PROFILE.SELECT_ROUTINE"));
  }
}
function ProfilePage_div_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplate"](1, ProfilePage_div_32_div_1_Template, 13, 9, "div", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplate"](2, ProfilePage_div_32_ng_template_2_Template, 13, 9, "ng-template", null, 77, _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵreference"](3);
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngIf", ctx_r8.tableInUse)("ngIfElse", _r28);
  }
}
function ProfilePage_ion_grid_33_ion_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r42 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "ion-button")(1, "ion-button", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵlistener"]("click", function ProfilePage_ion_grid_33_ion_button_8_Template_ion_button_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵrestoreView"](_r42);
      const socialNetWork_r40 = restoredCtx.$implicit;
      const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵresetView"](ctx_r41.navigateSocialNetwork(socialNetWork_r40));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](2, "ion-icon", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const socialNetWork_r40 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("name", socialNetWork_r40.icon);
  }
}
function ProfilePage_ion_grid_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "ion-grid", 104)(1, "ion-row")(2, "ion-col", 105)(3, "ion-label", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](6, "ion-row", 107)(7, "ion-buttons");
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplate"](8, ProfilePage_ion_grid_33_ion_button_8_Template, 3, 1, "ion-button", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](5, 2, "PROFILE.SOCIAL_NETWORKS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngForOf", ctx_r9.SOCIAL_NETWORK_VALUES);
  }
}
class ProfilePage {
  get _kcalTotal() {
    return this.activeGoal?.kcalTotal || this.user?.kcalTotal || 0;
  }
  get _proteinsGTotal() {
    return this.activeGoal?.proteinsGTotal || this.user?.proteinsGTotal || 0;
  }
  get _carbohydratesGTotal() {
    return this.activeGoal?.carbohydratesGTotal || this.user?.carbohydratesGTotal || 0;
  }
  get _fatGTotal() {
    return this.activeGoal?.fatGTotal || this.user?.fatGTotal || 0;
  }
  constructor(utilService, ionicUtilService, themeService, anthropometryService, dietDayService, nutritionalGoalService, navigationService, platform, adMobService, translate) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "utilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "themeService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "anthropometryService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietDayService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "nutritionalGoalService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "navigationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "platform", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "adMobService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "translate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "appShellConfig", src_app_app_shell_config__WEBPACK_IMPORTED_MODULE_9__.APP_SHELL_CONFIG);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "user", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietInUse", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "tableInUse", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "workoutInUse", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietDay", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "kcalCirclePercentage", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dailySteps", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isWorkoutInUseEnded", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "completedExercises", 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "prevWeightAverage", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "currWeightAverage", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "objetiveMessage", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "iconArrowObjetive", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "colorObjetive", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isDietDayCompleted", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietDay$", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietDays", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "daysWeight", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "macrosData", new src_app_shared_models_macros_data__WEBPACK_IMPORTED_MODULE_17__.MacrosData());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "macrosBars", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "label", 'PROFILE.STEPS');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "labels", ['L', 'M', 'X', 'J', 'V', 'S', 'D']);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "chartRange", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "indexCurrentDate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "pointRadius", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "prevWeekDateRange", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "currWeekDateRange", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "prevDietDayWeights", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "currDietDayWeights", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "lastDietWeightsFetchKey", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "kcalChartConfig", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "proteinChartConfig", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "carbohydratesChartConfig", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "fatChartConfig", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "selectedGroup", src_app_features_diet_days_components_weight_info_constants_chartRanges__WEBPACK_IMPORTED_MODULE_10__.CHART_RANGES_TYPES.week);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "chartMacros", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "theme", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "THEMES", src_app_shared_models_theme__WEBPACK_IMPORTED_MODULE_18__.THEMES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "CALCULATOR_VALUES", src_app_shared_constants_calculators__WEBPACK_IMPORTED_MODULE_11__.CALCULATOR_VALUES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "GROUPS_VALUES", _models_groups__WEBPACK_IMPORTED_MODULE_19__.GROUPS_VALUES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "CHART_RANGES", src_app_features_diet_days_components_weight_info_constants_chartRanges__WEBPACK_IMPORTED_MODULE_10__.CHART_RANGES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "CHART_RANGES_VALUES", src_app_features_diet_days_components_weight_info_constants_chartRanges__WEBPACK_IMPORTED_MODULE_10__.CHART_RANGES_VALUES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "selectedWorkoutGroup", _models_tableGroups__WEBPACK_IMPORTED_MODULE_20__.TABLE_GROUPS.workout);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "TABLE_GROUPS", _models_tableGroups__WEBPACK_IMPORTED_MODULE_20__.TABLE_GROUPS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "TABLE_GROUPS_VALUES", _models_tableGroups__WEBPACK_IMPORTED_MODULE_20__.TABLE_GROUPS_VALUES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "INFO", src_app_shared_constants_info__WEBPACK_IMPORTED_MODULE_12__.INFO);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "SOCIAL_NETWORKS", src_app_shared_constants_social_network__WEBPACK_IMPORTED_MODULE_14__.SOCIAL_NETWORKS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "SOCIAL_NETWORK_TYPES", src_app_shared_constants_social_network__WEBPACK_IMPORTED_MODULE_14__.SOCIAL_NETWORK_TYPES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "SOCIAL_NETWORK_VALUES", src_app_shared_constants_social_network__WEBPACK_IMPORTED_MODULE_14__.SOCIAL_NETWORK_VALUES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "LINKS", src_app_shared_constants_links__WEBPACK_IMPORTED_MODULE_13__.LINKS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "STEPS_VALUES", src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_15__.STEPS_VALUES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "TRAINING_TYPE_VALUES", []);
    // Inyección de servicios con Signals
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "userService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_33__.inject)(src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_5__.UserService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "tableService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_33__.inject)(src_app_core_services_table_table_service__WEBPACK_IMPORTED_MODULE_4__.TableService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "workoutService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_33__.inject)(src_app_core_services_workout_workout_service__WEBPACK_IMPORTED_MODULE_6__.WorkoutService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "billingService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_33__.inject)(src_app_core_services_billing_billing_service__WEBPACK_IMPORTED_MODULE_7__.BillingService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "authService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_33__.inject)(src_app_core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_8__.AuthService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "remoteConfigGate", (0,_angular_core__WEBPACK_IMPORTED_MODULE_33__.inject)(src_app_core_services_remote_config_remote_config_gate_service__WEBPACK_IMPORTED_MODULE_22__.RemoteConfigGateService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "coachService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_33__.inject)(src_app_core_services_coach_coach_service__WEBPACK_IMPORTED_MODULE_3__.CoachService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "activeGoal", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "Math", Math);
    // Nutrition section methods
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "showRemainingNutrition", false);
    this.utilService = utilService;
    this.ionicUtilService = ionicUtilService;
    this.themeService = themeService;
    this.anthropometryService = anthropometryService;
    this.dietDayService = dietDayService;
    this.nutritionalGoalService = nutritionalGoalService;
    this.navigationService = navigationService;
    this.platform = platform;
    this.adMobService = adMobService;
    this.translate = translate;
    // Effect para el usuario
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_33__.effect)(() => {
      const resUser = this.userService.localUser();
      if (resUser) {
        this.user = resUser;
        this.loadActiveGoal();
        this.initTrainingValues();
        this.setObjetiveMessage();
        this.setWeekRanges();
        this.setDietDaysWeights();
      }
    });
    // Effect para la tabla actual
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_33__.effect)(() => {
      this.tableInUse = this.tableService.currentTable();
    });
    // Effect para el workout actual
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_33__.effect)(() => {
      const resCurrentWorkout = this.workoutService.currentWorkoutSignal();
      if (this.user?.workoutInUse !== undefined && this.user?.workoutInUse === resCurrentWorkout?._id) {
        // Hay un entrenamiento activamente en uso
        this.workoutInUse = resCurrentWorkout;
        this.completedExercises = this.workoutInUse?.exercises.reduce((acc, curr) => acc + (this.isExerciseDoned(curr) ? 1 : 0), 0);
        this.isCurrentWorkoutEnded();
      } else {
        // No hay entrenamiento activo - solo mostrar rutina si existe
        this.workoutInUse = undefined;
        this.completedExercises = 0;
        this.isWorkoutInUseEnded = false;
      }
    });
  }
  loadActiveGoal() {
    if (this.user?.goalInUse) {
      const goal = this.nutritionalGoalService.getGoalById(this.user.goalInUse);
      if (goal) {
        this.activeGoal = goal;
      } else {
        this.nutritionalGoalService.refreshFromServer().subscribe(goals => {
          this.activeGoal = goals.find(g => g._id === this.user.goalInUse) || null;
        });
      }
    } else {
      this.activeGoal = null;
    }
  }
  ngOnInit() {
    this.initVariables();
    if (this.user && !this.user?.premium?.entitled) {
      this.adMobService.interstitial('profile_start');
    }
  }
  ionViewWillEnter() {
    void this.refreshPremiumState();
    this.lastDietWeightsFetchKey = undefined;
    this.setWeekRanges();
    this.setDietDaysWeights();
  }
  ionViewWillLeave() {}
  showAlertInfo() {
    let message;
    if (this.user.objetive !== 0) message = this.user.objetive > 0 ? this.translate.instant('PROFILE.WEIGHT_GOAL_SURPLUS', {
      kcal: this.user.objetive
    }) : this.translate.instant('PROFILE.WEIGHT_GOAL_DEFICIT', {
      kcal: Math.abs(this.user.objetive)
    });else message = this.translate.instant('PROFILE.WEIGHT_GOAL_KEEP');
    const toastOptions = {
      message: message,
      duration: 2000
    };
    this.ionicUtilService.showToast(toastOptions);
  }
  showInfo(info) {
    const toastOptions = {
      message: this.translate.instant(info),
      duration: 1000
    };
    this.ionicUtilService.showToast(toastOptions);
  }
  getUserAge() {
    if (!this.user?.birth) return 0;
    const birthDate = new Date(this.user.birth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
      age--;
    }
    return age;
  }
  getStepsDescription() {
    if (!this.user?.steps) return '';
    const stepOption = src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_15__.STEPS_VALUES.find(s => s.value === this.user.steps);
    return stepOption ? stepOption.name : '';
  }
  getTrainingDescription() {
    const notConfigured = this.translate.instant('PROFILE.NOT_CONFIGURED');
    if (!this.user) return notConfigured;
    const steps = this.user.steps || 1.37;
    const training = this.user.training || 1.0;
    const trainingValues = (0,src_app_shared_constants_training__WEBPACK_IMPORTED_MODULE_16__.calculateTrainingValues)(steps);
    if (!trainingValues) return notConfigured;
    const trainingOption = Object.values(trainingValues).find(t => t.value === training);
    return trainingOption ? trainingOption.name : notConfigured;
  }
  initTrainingValues() {
    if (this.user?.steps) {
      const trainingValues = (0,src_app_shared_constants_training__WEBPACK_IMPORTED_MODULE_16__.calculateTrainingValues)(this.user.steps);
      if (trainingValues) {
        Object.assign(this.TRAINING_TYPE_VALUES, Object.values(trainingValues));
      }
    }
  }
  getWeightChangeClass(current, previous) {
    if (!current || !previous) return '';
    if (current < previous) return 'positive';
    if (current > previous) return 'negative';
    return '';
  }
  getWeightChangeText(current, previous) {
    if (!current || !previous) return '';
    const diff = current - previous;
    const sign = diff > 0 ? '+' : '';
    return `${sign}${diff.toFixed(2)}kg`;
  }
  getWeightChangeIcon(current, previous) {
    if (!current || !previous) return '';
    if (current < previous) return '↓ ';
    if (current > previous) return '↑ ';
    return '→ ';
  }
  getWeightTrendClass(period) {
    const current = this.currWeightAverage || 0;
    const previous = this.prevWeightAverage || 0;
    if (current < previous) return 'trend-positive';
    if (current > previous) return 'trend-negative';
    return 'trend-neutral';
  }
  getWeightTrendValue(period) {
    const current = this.currWeightAverage || 0;
    const previous = this.prevWeightAverage || 0;
    const diff = current - previous;
    if (period === 'month') {
      const monthlyDiff = diff * 4;
      const sign = monthlyDiff > 0 ? '+' : '';
      return `${sign}${monthlyDiff.toFixed(2)}kg`;
    }
    const sign = diff > 0 ? '+' : '';
    return `${sign}${diff.toFixed(2)}kg`;
  }
  getTodayWeight() {
    if (this.dietDay && this.dietDay.weight) {
      return this.dietDay.weight;
    }
    return 0;
  }
  getWeeklyDifference() {
    const diff = this.getWeeklyDifferenceValue();
    return diff >= 0 ? '+' : '-';
  }
  getWeeklyDifferenceValue() {
    const current = this.currWeightAverage || 0;
    const previous = this.prevWeightAverage || 0;
    return current - previous;
  }
  getCurrentPlayingSplit() {
    return this.utilService.getCurrentPlayingSplit(this.tableInUse);
  }
  initVariables() {
    this.macrosBars = {
      hideMinKcal: true,
      hideMaxKcal: true
    };
    this.chartRange = src_app_features_diet_days_components_weight_info_constants_chartRanges__WEBPACK_IMPORTED_MODULE_10__.CHART_RANGES.week;
    this.setUser();
    this.getTable();
    this.getCurrentWorkout();
    this.getCurrentDietDay();
    this.setTheme();
  }
  setUser() {
    // Ya gestionado por effect en el constructor
  }
  setObjetiveMessage() {
    if (this.user) {
      if (this.user.objetive > 0) {
        this.objetiveMessage = this.translate.instant('PROFILE.CALORIC_SURPLUS');
        this.iconArrowObjetive = 'caret-up-outline';
        this.colorObjetive = 'success';
      } else if (this.user.objetive < 0) {
        this.objetiveMessage = this.translate.instant('PROFILE.CALORIC_DEFICIT');
        this.iconArrowObjetive = 'caret-down-outline';
        this.colorObjetive = 'danger';
      } else {
        this.objetiveMessage = this.translate.instant('PROFILE.MAINTENANCE');
        this.iconArrowObjetive = 'chevron-collapse-outline';
        this.colorObjetive = 'tertiary';
      }
    }
  }
  setTheme() {
    this.themeService.theme.subscribe(resTheme => {
      if (resTheme) this.theme = resTheme;
    });
  }
  initCharts() {
    this.kcalChartConfig = {
      percent: this.kcalCirclePercentage,
      backgroundColor: 'transparent',
      radius: 40,
      maxPercent: 100,
      units: ' %',
      unitsColor: 'var(--ion-color-light-contrast)',
      outerStrokeWidth: 6,
      outerStrokeColor: 'var(--ion-color-primary)',
      innerStrokeColor: 'var(--ion-color-secondary)',
      titleColor: 'var(--ion-color-light-contrast)',
      subtitleColor: '#483500',
      titleFontSize: '15',
      titleFontWeight: '800',
      unitsFontWeight: '800',
      showSubtitle: false,
      responsive: true,
      showInnerStroke: true,
      startFromZero: true
    };
    this.proteinChartConfig = {
      radius: 30,
      percent: this.proteinPercentage,
      space: -10,
      outerStrokeGradient: true,
      outerStrokeWidth: 10,
      outerStrokeColor: '#4882c2',
      outerStrokeGradientStopColor: '#53a9ff',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 10,
      title: 'UI',
      animateTitle: false,
      animationDuration: 0,
      showUnits: false,
      showBackground: false,
      clockwise: false,
      startFromZero: false,
      lazy: true,
      responsive: true
    };
    this.carbohydratesChartConfig = {
      radius: 30,
      percent: this.carbohydratesPercentage,
      space: -10,
      outerStrokeGradient: true,
      outerStrokeWidth: 10,
      outerStrokeColor: '#4882c2',
      outerStrokeGradientStopColor: '#53a9ff',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 10,
      title: 'UI',
      animateTitle: false,
      animationDuration: 0,
      showUnits: false,
      showBackground: false,
      clockwise: false,
      startFromZero: false,
      lazy: true,
      responsive: true
    };
    this.fatChartConfig = {
      radius: 30,
      percent: this.fatPercentage,
      space: -10,
      outerStrokeGradient: true,
      outerStrokeWidth: 10,
      outerStrokeColor: '#4882c2',
      outerStrokeGradientStopColor: '#53a9ff',
      innerStrokeColor: '#e7e8ea',
      innerStrokeWidth: 10,
      title: 'UI',
      animateTitle: false,
      animationDuration: 0,
      showUnits: false,
      showBackground: false,
      clockwise: false,
      startFromZero: false,
      lazy: true,
      responsive: true
    };
  }
  chartRangeChange(group) {
    this.chartRange = group;
    this.selectedGroup = group;
  }
  isExerciseDoned(customExercise) {
    return !!!customExercise.sets.find(setTemp => !setTemp.doned);
  }
  getMacrosPercentages() {
    this.kcalCirclePercentage = Math.floor(this.calculatePercentage(this.macrosData.kcal, this._kcalTotal));
  }
  calculatePercentage(current, max) {
    return current * 100 / max;
  }
  setDietInfo() {
    this.macrosData = new src_app_shared_models_macros_data__WEBPACK_IMPORTED_MODULE_17__.MacrosData();
    if (!this.dietDay) return;
    this.macrosData.kcal = this.dietDayService.getDietDayKcal(this.dietDay);
    this.macrosData.protein = this.dietDayService.getDietDayProteins(this.dietDay);
    this.macrosData.carbohydrate = this.dietDayService.getDietDayCarbohydrates(this.dietDay);
    this.macrosData.fat = this.dietDayService.getDietDayFat(this.dietDay);
  }
  toggleColor(event) {
    this.themeService.toggleColorMode(event.detail.value);
  }
  playStopDiet(diet) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const buttons = [{
        text: _this.translate.instant('COMMON.CANCEL').toUpperCase(),
        role: 'cancel'
      }, {
        text: 'OK',
        cssClass: 'alert-button-primary',
        handler: () => {
          _this.activeDiet();
        }
      }];
      const alertInput = {
        header: diet.name,
        message: _this.translate.instant('PROFILE.STOP_DIET'),
        buttons: buttons
      };
      yield _this.ionicUtilService.showAlert(alertInput);
    })();
  }
  activeDiet() {
    this.userService.playStopDiet(this.user._id, this.user.dietInUse).subscribe(resUser => this.user = resUser);
  }
  edit() {
    const modal = {
      component: _components_configuration_components_editor_editor_page__WEBPACK_IMPORTED_MODULE_21__.EditorPage
    };
    this.ionicUtilService.showModal(modal);
  }
  navigateSocialNetwork(socialNetwork) {
    window.location.href = socialNetwork.url;
  }
  goToCalculatorList() {
    this.navigationService.goToCalculatorList();
  }
  getAge(birth) {
    return this.userService.getAge(birth);
  }
  getCurrentDietDay() {
    if (this.user?.dietInUse) {
      const today = this.utilService.formatDateToYYYYMMDD(new Date());
      if (this.dietDay$) this.dietDay$.unsubscribe();
      this.dietDayService.getDietDayByIdDietAndDate(this.user.dietInUse, today).subscribe(resDietDay => {
        if (resDietDay) this.dietDay = resDietDay;else this.dietDay = this.dietDayService.getStandardDietDay(today);
        this.dietDayService.setCurrentDietDay = resDietDay;
        this.dietDayService.getCurrentDietDay.subscribe(resDietDay => {
          this.dietDay = resDietDay;
          this.setDietInfo();
          this.getMacrosPercentages();
          this.initCharts();
          if (this.macrosData.protein || this.macrosData.carbohydrate || this.macrosData.fat) this.initChartMacros();
          this.checkDietDayCompleted();
        });
      });
    }
  }
  getCurrentWorkout() {
    // Ya gestionado por effect en el constructor
  }
  getTable() {
    // Ya gestionado por effect en el constructor
  }
  goToConfiguration() {
    this.navigationService.goToConfiguration();
  }
  goToUsers() {
    this.navigationService.goToManagementHome();
  }
  goToPremium() {
    this.navigationService.goToPremium();
  }
  get maintenanceWarning$() {
    return this.remoteConfigGate.warningBanner$;
  }
  dismissMaintenanceWarning() {
    this.remoteConfigGate.dismissWarningBanner();
  }
  goToWeightInfo() {
    this.navigationService.goToWeightInfo();
  }
  goToStatistics() {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.user?.premium?.entitled) {
        _this2.navigationService.goToStatistics();
        return;
      }
      const alertOptions = {
        header: _this2.translate.instant('PROFILE.PREMIUM_STATS_HEADER'),
        message: _this2.translate.instant('PROFILE.PREMIUM_STATS_MSG'),
        buttons: [{
          text: _this2.translate.instant('COMMON.CANCEL'),
          role: 'cancel',
          cssClass: 'alert-button-primary'
        }, {
          text: _this2.translate.instant('PROFILE.WATCH_AD'),
          cssClass: 'alert-button-success',
          handler: () => {
            _this2.adMobService.interstitial('start_statistics').then(() => {
              _this2.navigationService.goToStatistics();
            }).catch(err => {
              console.error(_this2.translate.instant('PROFILE.REFRESH_PREMIUM_ERROR'), err);
              _this2.navigationService.goToStatistics();
            });
          }
        }]
      };
      yield _this2.ionicUtilService.showAlert(alertOptions);
    })();
  }
  openReferences() {
    this.navigationService.goToReferences();
  }
  isCurrentWorkoutEnded() {
    if (this.workoutInUse) {
      let workoutsEnded = [];
      this.workoutInUse.exercises.forEach(exerciseTemp => {
        workoutsEnded.push(this.isExerciseDoned(exerciseTemp));
      });
      this.isWorkoutInUseEnded = !workoutsEnded.includes(false);
    } else this.isWorkoutInUseEnded = false;
  }
  checkDietDayCompleted() {
    this.isDietDayCompleted = this.kcalCirclePercentage >= 100 && this.proteinPercentage >= 100 && this.carbohydratesPercentage >= 100 && this.fatPercentage >= 100;
  }
  openAboutUs() {
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _capacitor_browser__WEBPACK_IMPORTED_MODULE_2__.Browser.open({
        url: 'https://www.trainfit.net/index.html#about'
      });
    })();
  }
  getISODate(workoutDate) {
    return workoutDate ? new Date(workoutDate).toISOString() : undefined;
  }
  changeWorkoutDate(workout, dateISO) {
    workout.date = new Date(dateISO);
    this.workoutService.modifyWorkout(workout).subscribe();
  }
  goToSummary() {
    this.navigationService.goToTabsSummaryPage();
  }
  goToDiets() {
    this.navigationService.goToTabsDietsPage();
  }
  setWeekRanges() {
    const prevDate = new Date(new Date().setDate(new Date().getDate() - 7));
    const currDate = new Date(new Date().setDate(new Date().getDate()));
    this.prevWeekDateRange = this.utilService.getWeekRange(prevDate).dateRange;
    this.currWeekDateRange = this.utilService.getWeekRange(currDate).dateRange;
  }
  setDietDayWeightsAverages() {
    this.prevWeightAverage = Number(this.utilService.average(this.prevDietDayWeights).toFixed(2));
    this.currWeightAverage = Number(this.utilService.average(this.currDietDayWeights).toFixed(2));
  }
  setDietDaysWeights() {
    if (!this.prevWeekDateRange || !this.currWeekDateRange) {
      return;
    }
    const currentFetchKey = [this.prevWeekDateRange?.minDate, this.prevWeekDateRange?.maxDate, this.currWeekDateRange?.minDate, this.currWeekDateRange?.maxDate].join('|');
    if (this.lastDietWeightsFetchKey === currentFetchKey) {
      return;
    }
    this.lastDietWeightsFetchKey = currentFetchKey;
    (0,rxjs__WEBPACK_IMPORTED_MODULE_34__.forkJoin)([this.anthropometryService.getAnthropometriesBetweenDates(this.prevWeekDateRange.minDate, this.prevWeekDateRange.maxDate), this.anthropometryService.getAnthropometriesBetweenDates(this.currWeekDateRange.minDate, this.currWeekDateRange.maxDate)]).subscribe(([resPrev, resCurr]) => {
      this.prevDietDayWeights = resPrev.map(a => a.weight).filter(w => w != null);
      this.currDietDayWeights = resCurr.map(a => a.weight).filter(w => w != null);
      this.setDietDayWeightsAverages();
    });
  }
  initChartMacros() {
    this.chartMacros?.destroy();
    const hasMacrosCanvas = !!document.getElementById('macros');
    if (!hasMacrosCanvas) {
      return;
    }
    const data = {
      labels: ['P', 'CBH', 'G'],
      datasets: [{
        data: [this.macrosData.protein, this.macrosData.carbohydrate, this.macrosData.fat],
        borderColor: ['#419EFA', '#35FF1D', '#FFF51D'],
        backgroundColor: ['rgba(65, 158, 250, 0.2)', 'rgba(53, 250, 29, 0.2)', 'rgba(255, 245, 29,  0.2)'],
        borderWidth: 1
      }]
    };
    const options = {
      indexAxis: 'y',
      plugins: {
        legend: {
          display: false
        }
      }
    };
    this.chartMacros = this.utilService.initChart('macros', 'bar', data, options);
  }
  toggleNutritionView() {
    this.showRemainingNutrition = !this.showRemainingNutrition;
  }
  getNutritionValue() {
    if (this.showRemainingNutrition) {
      const remaining = this._kcalTotal - this.macrosData.kcal;
      return Math.round(remaining).toLocaleString();
    } else {
      return Math.round(this.macrosData.kcal).toLocaleString();
    }
  }
  getNutritionLabel() {
    if (this.showRemainingNutrition) {
      return this.translate.instant('PROFILE.REMAINING');
    } else {
      return this.translate.instant('PROFILE.OF_KCAL', {
        kcal: Math.round(this._kcalTotal).toLocaleString()
      });
    }
  }
  getProteinValues() {
    if (this.showRemainingNutrition) {
      const remaining = this._proteinsGTotal - this.macrosData.protein;
      return `<strong>${Math.round(remaining)}g</strong>`;
    } else {
      return `<strong>${Math.round(this.macrosData.protein)}g</strong>/${Math.round(this._proteinsGTotal)}g`;
    }
  }
  getCarbValues() {
    if (this.showRemainingNutrition) {
      const remaining = this._carbohydratesGTotal - this.macrosData.carbohydrate;
      return `<strong>${Math.round(remaining)}g</strong>`;
    } else {
      return `<strong>${Math.round(this.macrosData.carbohydrate)}g</strong>/${Math.round(this._carbohydratesGTotal)}g`;
    }
  }
  getFatValues() {
    if (this.showRemainingNutrition) {
      const remaining = this._fatGTotal - this.macrosData.fat;
      return `<strong>${Math.round(remaining)}g</strong>`;
    } else {
      return `<strong>${Math.round(this.macrosData.fat)}g</strong>/${Math.round(this._fatGTotal)}g`;
    }
  }
  // Getter properties for percentages
  get proteinPercentage() {
    return this.macrosData.protein * 100 / this._proteinsGTotal;
  }
  get carbohydratesPercentage() {
    return this.macrosData.carbohydrate * 100 / this._carbohydratesGTotal;
  }
  get fatPercentage() {
    return this.macrosData.fat * 100 / this._fatGTotal;
  }
  // Methods to check if values exceed limits
  isKcalExceeded() {
    return this.macrosData.kcal > this._kcalTotal;
  }
  isProteinExceeded() {
    return this.macrosData.protein > this._proteinsGTotal;
  }
  isCarbExceeded() {
    return this.macrosData.carbohydrate > this._carbohydratesGTotal;
  }
  isFatExceeded() {
    return this.macrosData.fat > this._fatGTotal;
  }
  // Methods to get CSS classes for exceeded values
  getKcalValueClass() {
    return this.isKcalExceeded() ? 'exceeded-value' : '';
  }
  getProteinValueClass() {
    return this.isProteinExceeded() ? 'exceeded-value' : '';
  }
  getCarbValueClass() {
    return this.isCarbExceeded() ? 'exceeded-value' : '';
  }
  getFatValueClass() {
    return this.isFatExceeded() ? 'exceeded-value' : '';
  }
  /**
   * Obtiene las iniciales del nombre y apellido del usuario
   * @returns String con las iniciales (ej: "JP" para Juan Perez)
   */
  getUserInitials() {
    if (!this.user || !this.user.name) {
      return '';
    }
    const firstName = this.user.name.trim();
    const lastName = this.user.lastname ? this.user.lastname.trim() : '';
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return firstInitial + lastInitial;
  }
  get isPremiumActive() {
    return Boolean(this.user?.premium?.entitled);
  }
  get showManagementEntry() {
    return this.appShellConfig.managementEntryEnabled && Boolean(this.user?.roles?.includes('admin'));
  }
  get isImpersonating() {
    return this.authService.isImpersonating;
  }
  revertImpersonation() {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const alertRes = yield _this3.ionicUtilService.showAlert({
        header: _this3.translate.instant('PROFILE.REVERT_IMP_HEADER'),
        message: _this3.translate.instant('PROFILE.REVERT_IMP_MSG'),
        buttons: [{
          text: _this3.translate.instant('COMMON.CANCEL'),
          role: 'cancel'
        }, {
          text: _this3.translate.instant('PROFILE.REVERT'),
          role: 'confirm',
          cssClass: 'danger-btn'
        }]
      });
      if (alertRes?.role === 'confirm') {
        _this3.authService.revertImpersonation().subscribe({
          next: () => {
            _this3.ionicUtilService.showSuccessToast(_this3.translate.instant('PROFILE.SESSION_RESTORED'));
            window.location.href = '/profile/users';
          },
          error: error => {
            _this3.ionicUtilService.showErrorToast(error, _this3.translate.instant('PROFILE.SESSION_RESTORE_ERROR'));
          }
        });
      }
    })();
  }
  get premiumPlanLabel() {
    return this.translate.instant('PROFILE.PRO_LABEL');
  }
  refreshPremiumState() {
    var _this4 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      try {
        yield _this4.billingService.getBackendEntitlements();
      } catch (error) {
        console.warn(_this4.translate.instant('PROFILE.REFRESH_PREMIUM_ERROR'), error);
      }
    })();
  }
}
_ProfilePage = ProfilePage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ProfilePage, "\u0275fac", function ProfilePage_Factory(t) {
  return new (t || _ProfilePage)(_angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵdirectiveInject"](src_app_core_services_util_util_service__WEBPACK_IMPORTED_MODULE_23__.UtilService), _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_24__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵdirectiveInject"](src_app_core_services_util_theme_service__WEBPACK_IMPORTED_MODULE_25__.ThemeService), _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵdirectiveInject"](src_app_core_services_anthropometry_anthropometry_service__WEBPACK_IMPORTED_MODULE_26__.AnthropometryService), _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵdirectiveInject"](src_app_core_services_diet_day_diet_day_service__WEBPACK_IMPORTED_MODULE_27__.DietDayService), _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵdirectiveInject"](src_app_core_services_nutritional_goal_nutritional_goal_service__WEBPACK_IMPORTED_MODULE_28__.NutritionalGoalService), _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵdirectiveInject"](src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_29__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_35__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵdirectiveInject"](src_app_core_services_util_ad_mob_service__WEBPACK_IMPORTED_MODULE_30__.AdMobService), _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_36__.TranslateService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ProfilePage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵdefineComponent"]({
  type: _ProfilePage,
  selectors: [["app-profile"]],
  decls: 34,
  vars: 17,
  consts: [[1, "toolbar-calendar-container"], [1, "main-toolbar"], [1, "toolbar-content"], [1, "title-section"], [1, "title-content"], [1, "brand-name"], [1, "train-text"], [1, "fit-text"], [1, "profile-section"], [1, "profile-header"], [1, "avatar-wrapper"], [1, "avatar"], ["class", "avatar-pro-badge", 4, "ngIf"], [1, "user-info"], [1, "user-name"], ["class", "user-goal", 4, "ngIf"], [1, "profile-actions"], [1, "settings-btn", 3, "click"], ["name", "settings-outline"], ["class", "settings-btn", 3, "click", 4, "ngIf"], [3, "message", "dismissed", 4, "ngIf"], ["class", "premium-banner", 3, "click", 4, "ngIf"], ["class", "nutrition-section", 4, "ngIf"], ["class", "weight-progress-section", 4, "ngIf"], ["class", "routine-section", 4, "ngIf"], ["class", "social-networks-section", 4, "ngIf"], [1, "avatar-pro-badge"], ["name", "diamond"], [1, "user-goal"], [3, "name", "color"], [3, "color"], ["color", "danger", "name", "log-out-outline"], ["color", "secondary", "name", "apps-outline"], [3, "message", "dismissed"], [1, "premium-banner", 3, "click"], ["name", "diamond-outline", 1, "premium-banner__icon"], [1, "premium-banner__text"], [1, "premium-banner__title"], [1, "premium-banner__sub"], ["name", "chevron-forward-outline", 1, "premium-banner__arrow"], [1, "nutrition-section"], [1, "section-header"], [1, "section-title"], ["name", "restaurant-outline", "color", "primary"], [1, "section-actions"], [1, "nutrition-toggle", 3, "checked", "ionChange"], [1, "nutrition-content"], [1, "nutrition-overview"], [1, "nutrition-card"], [1, "nutrition-value", 3, "ngClass"], [1, "nutrition-label"], [1, "nutrition-progress"], [1, "macro-row"], [1, "macro-info"], [1, "macro-color", "protein"], [1, "macro-name"], [1, "macro-values", 3, "ngClass", "innerHTML"], [1, "progress-bar"], [1, "progress-fill", "protein"], [1, "macro-color", "carbs"], [1, "progress-fill", "carbs"], [1, "macro-color", "fats"], [1, "progress-fill", "fats"], [1, "weight-progress-section"], ["name", "scale-outline", "color", "primary"], [1, "weight-progress-btn", 3, "click"], ["name", "stats-chart-outline"], [1, "weight-grid"], [1, "weight-metric", 3, "click"], [1, "weight-metric-label"], [1, "weight-metric-value"], [1, "weight-metric", "full-width", 3, "click"], ["class", "weight-change", 3, "ngClass", 4, "ngIf"], [1, "weight-stats"], [1, "weight-change", 3, "ngClass"], [1, "routine-section"], ["class", "card workout-card clickable-card", 3, "click", 4, "ngIf", "ngIfElse"], ["noRoutine", ""], [1, "card", "workout-card", "clickable-card", 3, "click"], [1, "card-header"], [1, "card-title"], ["name", "barbell-outline", "color", "primary"], [1, "workout-status"], [1, "workout-title"], ["class", "workout-subtitle", 4, "ngIf"], ["class", "workout-progress", 4, "ngIf"], [1, "workout-subtitle"], [1, "workout-progress"], [1, "progress-info"], [1, "workout-state", 3, "ngClass"], [1, "progress-indicator"], [1, "progress-text"], [1, "progress-bar-bg"], [1, "info-card", "info-card--orange", "summary-info-card", 3, "click"], ["name", "bar-chart-outline", 1, "info-icon"], [1, "info-text"], [1, "info-title"], [1, "card", "workout-card"], [1, "no-routine-card"], [1, "no-routine-icon"], ["name", "calendar-outline", "color", "primary"], [1, "no-routine-text"], [1, "no-routine-subtext"], [1, "primary-action-btn", 3, "click"], [1, "social-networks-section"], [1, "ion-text-center"], ["color", "medium"], [1, "ion-justify-content-center"], [4, "ngFor", "ngForOf"], [3, "click"], ["slot", "icon-only", 3, "name"]],
  template: function ProfilePage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](0, "ion-header")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "div", 3)(5, "div", 4)(6, "strong", 5)(7, "span", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](8, "TRAIN");
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](9, "span", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](10, "FIT");
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](11, "ion-content")(12, "div", 8)(13, "header", 9)(14, "div", 10)(15, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplate"](17, ProfilePage_div_17_Template, 2, 0, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](18, "div", 13)(19, "h1", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtext"](20);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplate"](21, ProfilePage_div_21_Template, 4, 4, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementStart"](22, "div", 16)(23, "button", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵlistener"]("click", function ProfilePage_Template_button_click_23_listener() {
        return ctx.goToConfiguration();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelement"](24, "ion-icon", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplate"](25, ProfilePage_button_25_Template, 2, 0, "button", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplate"](26, ProfilePage_button_26_Template, 2, 0, "button", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplate"](27, ProfilePage_app_maintenance_warning_banner_27_Template, 1, 1, "app-maintenance-warning-banner", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipe"](28, "async");
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplate"](29, ProfilePage_button_29_Template, 10, 6, "button", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplate"](30, ProfilePage_div_30_Template, 44, 30, "div", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplate"](31, ProfilePage_div_31_Template, 33, 25, "div", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplate"](32, ProfilePage_div_32_Template, 4, 2, "div", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtemplate"](33, ProfilePage_ion_grid_33_Template, 9, 4, "ion-grid", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵclassProp"]("avatar--pro", ctx.isPremiumActive);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate"](ctx.getUserInitials());
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngIf", ctx.isPremiumActive);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵtextInterpolate2"]("", ctx.user == null ? null : ctx.user.name, " ", ctx.user == null ? null : ctx.user.lastname, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngIf", !(ctx.user == null ? null : ctx.user.roles == null ? null : ctx.user.roles.includes("trainer")));
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngIf", ctx.isImpersonating);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngIf", ctx.showManagementEntry && !ctx.isImpersonating);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵpipeBind1"](28, 15, ctx.maintenanceWarning$));
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngIf", !ctx.isPremiumActive && !(ctx.user == null ? null : ctx.user.roles == null ? null : ctx.user.roles.includes("trainer")) && !ctx.coachService.hasActiveTrainer());
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngIf", !(ctx.user == null ? null : ctx.user.roles == null ? null : ctx.user.roles.includes("trainer")));
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngIf", !(ctx.user == null ? null : ctx.user.roles == null ? null : ctx.user.roles.includes("trainer")));
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngIf", !(ctx.user == null ? null : ctx.user.roles == null ? null : ctx.user.roles.includes("trainer")));
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_33__["ɵɵproperty"]("ngIf", !(ctx.user == null ? null : ctx.user.roles == null ? null : ctx.user.roles.includes("trainer")));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_37__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_37__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_37__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_38__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_38__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_38__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_38__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_38__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_38__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_38__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_38__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_38__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_38__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_38__.IonToggle, _ionic_angular__WEBPACK_IMPORTED_MODULE_38__.BooleanValueAccessor, _shared_ui_src_app_shared_components_maintenance_warning_banner_maintenance_warning_banner_component__WEBPACK_IMPORTED_MODULE_31__.MaintenanceWarningBannerComponent, _angular_common__WEBPACK_IMPORTED_MODULE_37__.AsyncPipe, _angular_common__WEBPACK_IMPORTED_MODULE_37__.DecimalPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_36__.TranslatePipe, _shared_ui_src_app_shared_pipes_translate_db_pipe__WEBPACK_IMPORTED_MODULE_32__.TranslateDbPipe],
  styles: ["@charset \"UTF-8\";\n.toolbar-calendar-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  background: #141414;\n  border-bottom: 1px solid rgba(37, 37, 37, 0.3);\n  position: relative;\n  overflow: hidden;\n}\n.toolbar-calendar-container[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 1px;\n  z-index: 1;\n}\n\n.main-toolbar[_ngcontent-%COMP%] {\n  --background: transparent;\n  --color: #ffffff;\n  --border-width: 0;\n  --padding-start: 0;\n  --padding-end: 0;\n  --min-height: 60px;\n  position: relative;\n  z-index: 2;\n}\n.main-toolbar[_ngcontent-%COMP%]   .toolbar-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0 20px;\n  height: 60px;\n  width: 100%;\n}\n\n.title-section[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 8px 0;\n  border-radius: 8px;\n}\n.title-section[_ngcontent-%COMP%]   .title-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.title-section[_ngcontent-%COMP%]   .title-content[_ngcontent-%COMP%]   .brand-name[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n  letter-spacing: 1px;\n}\n.title-section[_ngcontent-%COMP%]   .title-content[_ngcontent-%COMP%]   .brand-name[_ngcontent-%COMP%]   .train-text[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.title-section[_ngcontent-%COMP%]   .title-content[_ngcontent-%COMP%]   .brand-name[_ngcontent-%COMP%]   .fit-text[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #fe9000 0%, #ff6b35 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n\n@media (max-width: 480px) {\n  .toolbar-calendar-container[_ngcontent-%COMP%]   .main-toolbar[_ngcontent-%COMP%] {\n    --min-height: 56px;\n  }\n  .toolbar-calendar-container[_ngcontent-%COMP%]   .main-toolbar[_ngcontent-%COMP%]   .toolbar-content[_ngcontent-%COMP%] {\n    padding: 0 16px;\n    height: 56px;\n  }\n  .toolbar-calendar-container[_ngcontent-%COMP%]   .title-section[_ngcontent-%COMP%]   .title-content[_ngcontent-%COMP%]   .brand-name[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n}\n@media (prefers-color-scheme: dark) {\n  .toolbar-calendar-container[_ngcontent-%COMP%] {\n    background: #141414;\n    border-bottom-color: rgba(37, 37, 37, 0.5);\n  }\n}\n.arrow-up[_ngcontent-%COMP%] {\n  width: 0;\n  height: 0;\n  border-left: 0.2em solid transparent;\n  border-right: 0.2em solid transparent;\n  border-bottom: 0.2em solid orange;\n}\n\n.app-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n  margin: 0;\n  letter-spacing: -0.01em;\n}\n.app-title[_ngcontent-%COMP%]   .fit-primary[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n}\n\n@media (prefers-color-scheme: dark) {\n  .app-title[_ngcontent-%COMP%] {\n    color: #ffffff;\n  }\n  .app-title[_ngcontent-%COMP%]   .fit-primary[_ngcontent-%COMP%] {\n    color: var(--ion-color-primary);\n  }\n}\n.t-init-profile.light-theme[_ngcontent-%COMP%]   .app-title[_ngcontent-%COMP%] {\n  color: var(--ion-color-dark);\n}\n.t-init-profile.light-theme[_ngcontent-%COMP%]   .app-title[_ngcontent-%COMP%]   .fit-primary[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n}\n.t-init-profile.dark-theme[_ngcontent-%COMP%]   .app-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.t-init-profile.dark-theme[_ngcontent-%COMP%]   .app-title[_ngcontent-%COMP%]   .fit-primary[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n}\n\n\n\n.social-networks-section[_ngcontent-%COMP%]   ion-grid[_ngcontent-%COMP%] {\n  background: transparent !important;\n}\n.social-networks-section[_ngcontent-%COMP%]   ion-row[_ngcontent-%COMP%] {\n  background: transparent !important;\n}\n.social-networks-section[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%] {\n  background: transparent !important;\n}\n.social-networks-section[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --background: transparent !important;\n}\n\nion-slides[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\nion-progress-bar[_ngcontent-%COMP%] {\n  height: 0.4em;\n  border-radius: 3px;\n}\n\nion-label[_ngcontent-%COMP%]    > p[_ngcontent-%COMP%], ol[_ngcontent-%COMP%] {\n  font-size: xx-small;\n  margin: 0;\n  margin-top: -0.2em;\n  margin-bottom: -0.2em;\n}\n\n.disabled-initial[_ngcontent-%COMP%] {\n  opacity: 1 !important;\n}\n\n\n\n.section-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: var(--ion-color-medium-tint);\n  margin: 0 16px 12px 16px;\n  opacity: 0.4;\n}\n\n\n\n.nutrition-title-section[_ngcontent-%COMP%] {\n  margin: 1rem 1rem 0.5rem 1rem;\n}\n.nutrition-title-section[_ngcontent-%COMP%]   .page-nutrition-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: var(--ion-color-primary);\n  margin: 0;\n}\n.nutrition-title-section[_ngcontent-%COMP%]   .page-nutrition-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.375rem;\n  font-weight: 600;\n}\n\n\n\n.nutrition-section[_ngcontent-%COMP%] {\n  background: #141414;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n  border-radius: 16px;\n  padding: 1.25rem;\n  margin: 16px;\n  border: 1px solid #252525;\n}\n\n.nutrition-content[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  align-items: flex-start;\n}\n\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 16px;\n}\n\n.section-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: var(--ion-color-primary-contrast);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex: 1;\n  margin: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.nutrition-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 700;\n  color: var(--ion-color-primary-contrast);\n  margin: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.section-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n\n\n.section-action[_ngcontent-%COMP%], .card-action[_ngcontent-%COMP%] {\n  background: #1f1f1f;\n  color: #fe9000;\n  font-size: 0.75rem;\n  font-weight: 600;\n  padding: 5px 9px;\n  border-radius: 8px;\n  border: 1px solid #252525;\n  text-decoration: none;\n  display: inline-block;\n  transition: none;\n}\n.section-action[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .card-action[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: #fe9000;\n  font-weight: 600;\n}\n\n\n\n.weight-progress-btn[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--pe-muted);\n  width: 2.5rem;\n  height: 2.5rem;\n  min-width: 2.5rem;\n  min-height: 2.5rem;\n  border-radius: 10px;\n  font-size: 1rem;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n  transition: all 0.3s ease;\n  flex-shrink: 0;\n}\n.weight-progress-btn[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 0;\n  height: 0;\n  background: radial-gradient(circle, rgba(254, 144, 0, 0.3) 0%, transparent 70%);\n  border-radius: 50%;\n  transform: translate(-50%, -50%);\n  transition: all 0.6s ease;\n  z-index: 0;\n}\n.weight-progress-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n}\n.weight-progress-btn[_ngcontent-%COMP%]:active::before {\n  width: 200%;\n  height: 200%;\n  animation: _ngcontent-%COMP%_dropEffect 0.6s ease-out;\n}\n.weight-progress-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.125rem !important;\n  font-weight: 600;\n  position: relative;\n  z-index: 1;\n  width: 1.125rem;\n  height: 1.125rem;\n  flex-shrink: 0;\n}\n\n\n\n.nutrition-toggle[_ngcontent-%COMP%] {\n  --background: #252525;\n  --background-checked: #fe9000;\n  --handle-background: #ffffff;\n  --handle-background-checked: #ffffff;\n  --border-radius: 12px;\n  --handle-border-radius: 10px;\n  --handle-width: 18px;\n  --handle-height: 18px;\n  --track-width: 36px;\n  --track-height: 20px;\n  margin: 0;\n  transform: scale(0.9);\n}\n\n.nutrition-overview[_ngcontent-%COMP%] {\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n  flex-shrink: 0;\n  min-width: 7.5rem;\n  height: 8.625rem;\n}\n\n.nutrition-card[_ngcontent-%COMP%] {\n  background: #0e0e0e;\n  border-radius: 12px;\n  padding: 0.375rem;\n  text-align: center;\n  border: 1px solid #373737;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  min-height: 7.5rem;\n  overflow: hidden;\n}\n\n\n\n.routine-section[_ngcontent-%COMP%] {\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n  margin: 16px;\n  border-radius: 16px;\n  padding: 0;\n  overflow: hidden;\n}\n.routine-section[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%] {\n  --card-color: var(--ion-color-primary);\n  --card-color-rgb: var(--ion-color-primary-rgb);\n  background: rgba(var(--card-color-rgb), 0.08);\n  border: 1px solid rgba(var(--card-color-rgb), 0.18);\n  border-radius: 16px;\n  padding: 12px 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  margin-top: 12px;\n  margin-bottom: 0px;\n  text-align: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.routine-section[_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n  background: rgba(var(--card-color-rgb), 0.12);\n}\n.routine-section[_ngcontent-%COMP%]   .info-card--orange[_ngcontent-%COMP%] {\n  --card-color: var(--ion-color-warning);\n  --card-color-rgb: var(--ion-color-warning-rgb);\n}\n.routine-section[_ngcontent-%COMP%]   .info-icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: var(--card-color);\n  flex-shrink: 0;\n}\n.routine-section[_ngcontent-%COMP%]   .info-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.routine-section[_ngcontent-%COMP%]   .info-text[_ngcontent-%COMP%]   .info-title[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 600;\n  color: var(--card-color);\n  margin: 0;\n  letter-spacing: 0.2px;\n}\n\n.workout-card[_ngcontent-%COMP%] {\n  background: #141414;\n  border: 1px solid #252525;\n  border-radius: 16px;\n  padding: 1.25rem;\n  overflow: hidden;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: all 0.2s ease-in-out;\n  \n\n}\n.workout-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n  overflow: hidden;\n}\n.workout-card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: var(--pe-text);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.workout-card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  color: #ffffff;\n}\n.workout-card.clickable-card[_ngcontent-%COMP%] {\n  -webkit-user-select: none;\n          user-select: none;\n}\n.workout-card[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n  box-shadow: 0 2px 8px rgba(254, 144, 0, 0.1);\n}\n\n.workout-status[_ngcontent-%COMP%] {\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n  margin-bottom: 10px;\n  background: #0e0e0e;\n  border: 1px solid #252525;\n  padding: 0.9375rem;\n  border-radius: 12px;\n}\n.workout-status[_ngcontent-%COMP%]   .workout-title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  margin: 0 0 4px 0;\n  color: var(--pe-text);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.workout-status[_ngcontent-%COMP%]   .workout-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: var(--pe-muted);\n  margin: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.workout-progress[_ngcontent-%COMP%]   .progress-info[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 0.8125rem;\n  margin-bottom: 8px;\n  color: var(--pe-text);\n  overflow: hidden;\n}\n.workout-progress[_ngcontent-%COMP%]   .progress-info[_ngcontent-%COMP%]   .workout-state[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.workout-progress[_ngcontent-%COMP%]   .progress-info[_ngcontent-%COMP%]   .workout-state.active[_ngcontent-%COMP%] {\n  color: var(--ion-color-success);\n}\n.workout-progress[_ngcontent-%COMP%]   .progress-info[_ngcontent-%COMP%]   .workout-state.completed[_ngcontent-%COMP%] {\n  color: var(--pe-accent);\n}\n.workout-progress[_ngcontent-%COMP%]   .progress-indicator[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.workout-progress[_ngcontent-%COMP%]   .progress-indicator[_ngcontent-%COMP%]   .progress-text[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: var(--pe-muted);\n  font-weight: 500;\n}\n.workout-progress[_ngcontent-%COMP%]   .progress-bar-bg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 8px;\n  background-color: var(--pe-bg-tertiary);\n  border-radius: 5px;\n  overflow: hidden;\n}\n.workout-progress[_ngcontent-%COMP%]   .progress-bar-bg[_ngcontent-%COMP%]   .progress-bar[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 5px;\n}\n\n.available-routine-section[_ngcontent-%COMP%] {\n  background: var(--ion-color-light-tint);\n  padding: 1rem;\n  border-radius: 16px;\n}\n.available-routine-section[_ngcontent-%COMP%]   .available-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  margin-bottom: 12px;\n}\n.available-routine-section[_ngcontent-%COMP%]   .available-info[_ngcontent-%COMP%]   .available-title[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--ion-text-color);\n}\n.available-routine-section[_ngcontent-%COMP%]   .available-info[_ngcontent-%COMP%]   .available-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--ion-color-medium);\n}\n.available-routine-section[_ngcontent-%COMP%]   .start-button[_ngcontent-%COMP%] {\n  margin: 0;\n  --padding-start: 0;\n  --padding-end: 0;\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.no-routine-card[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 1.875rem 1.25rem;\n}\n.no-routine-card[_ngcontent-%COMP%]   .no-routine-icon[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  color: var(--ion-color-medium);\n  margin-bottom: 6px;\n}\n.no-routine-card[_ngcontent-%COMP%]   .no-routine-text[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  color: var(--ion-text-color);\n  font-weight: 700;\n  margin: 0;\n  letter-spacing: -0.3px;\n  line-height: 1.3;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n}\n.no-routine-card[_ngcontent-%COMP%]   .no-routine-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.8125rem;\n  color: var(--ion-color-medium);\n  font-weight: 500;\n  margin: 0;\n  letter-spacing: -0.1px;\n  opacity: 0.8;\n}\n\nion-button[_ngcontent-%COMP%] {\n  --color: white;\n  --background: var(--ion-color-primary);\n  --border-radius: 6px;\n  font-weight: 600;\n  text-transform: none;\n  flex-shrink: 0;\n}\n\n@media (max-width: 320px) {\n  .profile-section[_ngcontent-%COMP%] {\n    padding: 1rem 0.75rem 0 0.75rem;\n  }\n  .nutrition-title-section[_ngcontent-%COMP%] {\n    margin: 0.75rem 0.5rem 0.25rem 0.5rem;\n  }\n  .no-routine-card[_ngcontent-%COMP%] {\n    padding: 1.25rem 0.75rem;\n  }\n}\n@media (max-width: 480px) {\n  .profile-section[_ngcontent-%COMP%] {\n    padding: 1.25rem 1rem 0 1rem;\n  }\n  .user-avatar[_ngcontent-%COMP%] {\n    width: 3.5rem;\n    height: 3.5rem;\n  }\n  .user-name[_ngcontent-%COMP%] {\n    font-size: clamp(0.9rem, 3.5vw, 1.125rem);\n    line-height: 1.2;\n  }\n  .info-row-compact[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.375rem;\n  }\n  .weight-progress-section[_ngcontent-%COMP%] {\n    margin: 0.5rem 0.25rem;\n    padding: 0.75rem;\n  }\n}\n@media (min-width: 481px) and (max-width: 768px) {\n  .profile-section[_ngcontent-%COMP%] {\n    padding: 1.5rem 1.5rem 0 1.5rem;\n  }\n  .nutrition-card[_ngcontent-%COMP%] {\n    margin: 1rem 0.5rem;\n  }\n  .weight-stat[_ngcontent-%COMP%] {\n    max-width: 180px;\n  }\n}\n@media (min-width: 769px) {\n  .profile-section[_ngcontent-%COMP%] {\n    padding: 2rem 2rem 0 2rem;\n    max-width: 1200px;\n    margin: 0 auto;\n  }\n  .nutrition-title-section[_ngcontent-%COMP%] {\n    margin: 1.5rem 1.5rem 0.75rem 1.5rem;\n  }\n  .weight-progress-section[_ngcontent-%COMP%] {\n    margin: 1rem 0.75rem;\n    padding: 1.25rem;\n  }\n  .weight-stat[_ngcontent-%COMP%] {\n    max-width: 12.5rem;\n  }\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .routine-section-minimal[_ngcontent-%COMP%] {\n  background: var(--ion-color-step-50);\n  border-color: var(--ion-color-step-200);\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.4);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .routine-header-minimal[_ngcontent-%COMP%] {\n  border-bottom-color: var(--ion-color-step-200);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .routine-status-minimal[_ngcontent-%COMP%] {\n  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(0, 0, 0, 0.2);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .routine-status-minimal.active[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(var(--ion-color-primary-rgb), 1), rgba(var(--ion-color-primary-rgb), 0.8));\n  border-color: rgba(var(--ion-color-primary-rgb), 0.9);\n  box-shadow: 0 4px 12px rgba(var(--ion-color-primary-rgb), 0.4), 0 1px 3px rgba(var(--ion-color-primary-rgb), 0.3);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .routine-status-minimal.completed[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(var(--ion-color-success-rgb), 1), rgba(var(--ion-color-success-rgb), 0.8));\n  border-color: rgba(var(--ion-color-success-rgb), 0.9);\n  box-shadow: 0 4px 12px rgba(var(--ion-color-success-rgb), 0.4), 0 1px 3px rgba(var(--ion-color-success-rgb), 0.3);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .routine-status-minimal.available[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(var(--ion-color-warning-rgb), 1), rgba(var(--ion-color-warning-rgb), 0.8));\n  border-color: rgba(var(--ion-color-warning-rgb), 0.9);\n  box-shadow: 0 4px 12px rgba(var(--ion-color-warning-rgb), 0.4), 0 1px 3px rgba(var(--ion-color-warning-rgb), 0.3);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .routine-card-minimal[_ngcontent-%COMP%] {\n  background: linear-gradient(145deg, rgba(var(--ion-color-step-100), 0.5), rgba(var(--ion-color-step-100), 0.3));\n  border-color: rgba(var(--ion-color-step-200), 0.8);\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2), 0 1px 3px rgba(0, 0, 0, 0.3);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .routine-mesocycle[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-primary-rgb), 0.15);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .routine-workout[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-success-rgb), 0.08);\n  border-color: rgba(var(--ion-color-success-rgb), 0.2);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .routine-workout[_ngcontent-%COMP%]   .workout-cycle[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-success-rgb), 0.2) !important;\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .progress-percent[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-primary-rgb), 0.2) !important;\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .progress-bar-minimal[_ngcontent-%COMP%] {\n  background: var(--ion-color-step-200);\n  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .progress-bar-minimal[_ngcontent-%COMP%]   .progress-fill-minimal[_ngcontent-%COMP%] {\n  background: linear-gradient(90deg, var(--ion-color-primary), var(--ion-color-secondary));\n  box-shadow: 0 1px 3px rgba(var(--ion-color-primary-rgb), 0.6);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .routine-info-minimal[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-warning-rgb), 0.08);\n  border-color: rgba(var(--ion-color-warning-rgb), 0.2);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .no-routine-minimal[_ngcontent-%COMP%] {\n  background: var(--ion-color-step-100);\n  border-color: var(--ion-color-step-300);\n}\n\n.nutrition-value[_ngcontent-%COMP%] {\n  font-size: clamp(20px, 5vw, 28px);\n  font-weight: 700;\n  color: var(--ion-color-primary-contrast);\n  margin-bottom: 6px;\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  -webkit-hyphens: auto;\n          hyphens: auto;\n  line-height: 1.1;\n  overflow: visible;\n  text-overflow: unset;\n  display: block;\n  white-space: normal;\n}\n\n.nutrition-label[_ngcontent-%COMP%] {\n  font-size: clamp(12px, 3vw, 16px);\n  color: var(--ion-color-step-600);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  line-height: 1.2;\n  overflow: visible;\n  text-overflow: unset;\n  white-space: normal;\n}\n\n.nutrition-progress[_ngcontent-%COMP%] {\n  margin-top: 0;\n  flex: 1;\n}\n\n.macro-item[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.macro-item[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.macro-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n\n.macro-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.macro-color[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n}\n.macro-color.protein[_ngcontent-%COMP%] {\n  background: var(--protein-color);\n}\n.macro-color.carbs[_ngcontent-%COMP%] {\n  background: var(--carbs-color);\n}\n.macro-color.fats[_ngcontent-%COMP%] {\n  background: var(--fat-color);\n}\n\n.macro-name[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  color: var(--ion-color-primary-contrast);\n}\n\n.macro-values[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-step-600);\n}\n.macro-values[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: white;\n}\n\n.progress-bar[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 6px;\n  background: var(--ion-color-step-150);\n  border-radius: 3px;\n  overflow: hidden;\n  margin-top: 4px;\n  margin-bottom: 16px;\n}\n\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 3px;\n}\n.progress-fill.protein[_ngcontent-%COMP%] {\n  background: var(--protein-color);\n}\n.progress-fill.carbs[_ngcontent-%COMP%] {\n  background: var(--carbs-color);\n}\n.progress-fill.fats[_ngcontent-%COMP%] {\n  background: var(--fat-color);\n}\n\n\n\n.profile-section[_ngcontent-%COMP%] {\n  padding: 1.5rem 1.25rem 0 1.25rem;\n}\n\n.profile-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 15px;\n  margin-bottom: 30px;\n}\n\n.avatar-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  flex-shrink: 0;\n}\n\n.avatar[_ngcontent-%COMP%] {\n  width: 3.75rem;\n  height: 3.75rem;\n  border-radius: 50%;\n  background-color: var(--pe-accent);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: white;\n}\n.avatar.avatar--pro[_ngcontent-%COMP%] {\n  border: 2px solid rgba(255, 192, 74, 0.85);\n  box-shadow: 0 0 0 3px rgba(254, 144, 0, 0.18), 0 10px 22px rgba(254, 144, 0, 0.16);\n}\n\n.avatar-pro-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: -2px;\n  right: -2px;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background: linear-gradient(135deg, #ffd166 0%, #f3a020 100%);\n  border: 2px solid var(--ion-background-color, #1a1a1a);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 2px 6px rgba(243, 160, 32, 0.5);\n}\n.avatar-pro-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 9px;\n  color: #3d1f00;\n}\n\n.user-info[_ngcontent-%COMP%] {\n  flex-grow: 1;\n  min-width: 0;\n  \n\n  overflow: hidden;\n  \n\n  padding-top: 3px;\n}\n\n.user-name[_ngcontent-%COMP%] {\n  font-size: clamp(1rem, 4vw, 1.25rem);\n  font-weight: 700;\n  margin: 0;\n  color: var(--ion-text-color);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  max-width: 100%;\n  line-height: 1.2;\n  word-break: break-word;\n  -webkit-hyphens: auto;\n          hyphens: auto;\n}\n\n.user-goal[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--pe-muted);\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  margin-top: 4px;\n}\n\n.profile-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n\n.settings-btn[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--pe-muted);\n  width: 3.0625rem;\n  height: 3.0625rem;\n  min-width: 3.0625rem;\n  \n\n  min-height: 3.0625rem;\n  \n\n  border-radius: 12px;\n  font-size: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n  transition: all 0.3s ease;\n  flex-shrink: 0;\n  \n\n}\n.settings-btn[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 0;\n  height: 0;\n  background: radial-gradient(circle, rgba(254, 144, 0, 0.3) 0%, transparent 70%);\n  border-radius: 50%;\n  transform: translate(-50%, -50%);\n  transition: all 0.6s ease;\n  z-index: 0;\n}\n.settings-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n}\n.settings-btn[_ngcontent-%COMP%]:active::before {\n  width: 200%;\n  height: 200%;\n  animation: _ngcontent-%COMP%_dropEffect 0.6s ease-out;\n}\n.settings-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.375rem !important;\n  \n\n  font-weight: 600;\n  position: relative;\n  z-index: 1;\n  width: 1.375rem;\n  \n\n  height: 1.375rem;\n  \n\n  flex-shrink: 0;\n  \n\n}\n\n@keyframes _ngcontent-%COMP%_dropEffect {\n  0% {\n    width: 0;\n    height: 0;\n    opacity: 1;\n  }\n  50% {\n    width: 150%;\n    height: 150%;\n    opacity: 0.8;\n  }\n  100% {\n    width: 200%;\n    height: 200%;\n    opacity: 0;\n  }\n}\n\n\n.exceeded-value[_ngcontent-%COMP%] {\n  color: var(--ion-color-danger) !important;\n  font-weight: 700;\n}\n\n.premium-banner[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  width: calc(100% - 32px);\n  margin: 0 16px 12px;\n  padding: 13px 14px;\n  border-radius: 14px;\n  background: linear-gradient(135deg, rgba(254, 144, 0, 0.1) 0%, rgba(254, 144, 0, 0.05) 100%);\n  border: 1px solid rgba(254, 144, 0, 0.3);\n  cursor: pointer;\n  transition: background 150ms ease, transform 130ms ease;\n}\n.premium-banner[_ngcontent-%COMP%]:active {\n  transform: scale(0.985);\n  background: rgba(254, 144, 0, 0.14);\n}\n\n.premium-banner__icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: var(--ion-color-primary);\n  flex-shrink: 0;\n}\n\n.premium-banner__text[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  text-align: left;\n}\n\n.premium-banner__title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: var(--ion-color-primary);\n}\n\n.premium-banner__sub[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--pe-muted);\n}\n\n.premium-banner__arrow[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--pe-muted-2);\n  flex-shrink: 0;\n}\n\n\n\n.personal-info-section-compact[_ngcontent-%COMP%] {\n  background: #141414;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n  border-radius: 16px;\n  padding: 1.25rem;\n  margin: 16px;\n  border: 1px solid #252525;\n}\n.personal-info-section-compact[_ngcontent-%COMP%]   .compact-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 12px;\n  padding-bottom: 8px;\n  border-bottom: 1px solid var(--ion-color-step-150);\n  \n\n}\n.personal-info-section-compact[_ngcontent-%COMP%]   .compact-header[_ngcontent-%COMP%]   .header-icon[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  color: white;\n}\n.personal-info-section-compact[_ngcontent-%COMP%]   .compact-header[_ngcontent-%COMP%]   .header-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: var(--ion-color-primary-contrast);\n  flex: 1;\n}\n.personal-info-section-compact[_ngcontent-%COMP%]   .compact-header[_ngcontent-%COMP%]   .personal-info-btn[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--pe-muted);\n  width: 2.5rem;\n  height: 2.5rem;\n  min-width: 2.5rem;\n  min-height: 2.5rem;\n  border-radius: 10px;\n  font-size: 1rem;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  position: relative;\n  overflow: hidden;\n  transition: all 0.3s ease;\n  flex-shrink: 0;\n}\n.personal-info-section-compact[_ngcontent-%COMP%]   .compact-header[_ngcontent-%COMP%]   .personal-info-btn[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 0;\n  height: 0;\n  background: radial-gradient(circle, rgba(254, 144, 0, 0.3) 0%, transparent 70%);\n  border-radius: 50%;\n  transform: translate(-50%, -50%);\n  transition: all 0.6s ease;\n  z-index: 0;\n}\n.personal-info-section-compact[_ngcontent-%COMP%]   .compact-header[_ngcontent-%COMP%]   .personal-info-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n}\n.personal-info-section-compact[_ngcontent-%COMP%]   .compact-header[_ngcontent-%COMP%]   .personal-info-btn[_ngcontent-%COMP%]:active::before {\n  width: 200%;\n  height: 200%;\n  animation: _ngcontent-%COMP%_dropEffect 0.6s ease-out;\n}\n.personal-info-section-compact[_ngcontent-%COMP%]   .compact-header[_ngcontent-%COMP%]   .personal-info-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.125rem !important;\n  font-weight: 600;\n  position: relative;\n  z-index: 1;\n  width: 1.125rem;\n  height: 1.125rem;\n  flex-shrink: 0;\n}\n.personal-info-section-compact[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 8px;\n}\n.personal-info-section-compact[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n@media (max-width: 480px) {\n  .personal-info-section-compact[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n    gap: 4px;\n  }\n}\n@media (max-width: 320px) {\n  .personal-info-section-compact[_ngcontent-%COMP%]   .info-row[_ngcontent-%COMP%] {\n    gap: 2px;\n  }\n}\n.personal-info-section-compact[_ngcontent-%COMP%]   .info-item-compact[_ngcontent-%COMP%] {\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n  flex: 1;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: #0e0e0e;\n  border-radius: 8px;\n  padding: 0.5rem 0.625rem;\n  border: 1px solid #252525;\n  min-width: 0;\n}\n.personal-info-section-compact[_ngcontent-%COMP%]   .info-item-compact[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--ion-color-primary);\n  flex-shrink: 0;\n}\n.personal-info-section-compact[_ngcontent-%COMP%]   .info-item-compact[_ngcontent-%COMP%]   .info-text[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 500;\n  color: var(--ion-color-primary-contrast);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n@media (max-width: 480px) {\n  .personal-info-section-compact[_ngcontent-%COMP%]   .info-item-compact[_ngcontent-%COMP%] {\n    padding: 0.375rem 0.5rem;\n    gap: 4px;\n  }\n  .personal-info-section-compact[_ngcontent-%COMP%]   .info-item-compact[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .personal-info-section-compact[_ngcontent-%COMP%]   .info-item-compact[_ngcontent-%COMP%]   .info-text[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n}\n@media (max-width: 320px) {\n  .personal-info-section-compact[_ngcontent-%COMP%]   .info-item-compact[_ngcontent-%COMP%] {\n    padding: 0.25rem 0.375rem;\n    gap: 3px;\n  }\n  .personal-info-section-compact[_ngcontent-%COMP%]   .info-item-compact[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .personal-info-section-compact[_ngcontent-%COMP%]   .info-item-compact[_ngcontent-%COMP%]   .info-text[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n}\n\n.profile-email[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--ion-color-medium);\n  margin-bottom: 8px;\n}\n\n.profile-stats[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.stat-item[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  color: var(--ion-color-primary);\n  display: block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-medium);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n\n\n.dark[_nghost-%COMP%]   .nutrition-section[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .nutrition-section[_ngcontent-%COMP%] {\n  background: var(--ion-color-step-100);\n  border-color: var(--ion-color-step-200);\n}\n.dark[_nghost-%COMP%]   .nutrition-card[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .nutrition-card[_ngcontent-%COMP%] {\n  background: var(--ion-color-step-150);\n  border-color: var(--ion-color-step-250);\n}\n.dark[_nghost-%COMP%]   .progress-bar[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .progress-bar[_ngcontent-%COMP%] {\n  background: var(--ion-color-step-250);\n}\n.dark[_nghost-%COMP%]   .hero-section[_ngcontent-%COMP%], .dark   [_nghost-%COMP%]   .hero-section[_ngcontent-%COMP%] {\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);\n}\n\n\n\n.light[_nghost-%COMP%]   .hero-section[_ngcontent-%COMP%], .light   [_nghost-%COMP%]   .hero-section[_ngcontent-%COMP%] {\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);\n}\n\n\n\n.dark[_ngcontent-%COMP%]   .profile-section[_ngcontent-%COMP%] {\n  background: var(--ion-color-dark);\n  border-color: var(--ion-color-dark-shade);\n}\n.dark[_ngcontent-%COMP%]   .profile-section[_ngcontent-%COMP%]   .profile-header[_ngcontent-%COMP%] {\n  background: var(--ion-color-dark-tint);\n  border-color: var(--ion-color-dark-shade);\n}\n.dark[_ngcontent-%COMP%]   .profile-section[_ngcontent-%COMP%]   .profile-info[_ngcontent-%COMP%]   .profile-name[_ngcontent-%COMP%] {\n  color: var(--ion-color-light);\n}\n.dark[_ngcontent-%COMP%]   .profile-section[_ngcontent-%COMP%]   .profile-info[_ngcontent-%COMP%]   .profile-email[_ngcontent-%COMP%] {\n  color: var(--ion-color-light-tint);\n}\n.dark[_ngcontent-%COMP%]   .profile-section[_ngcontent-%COMP%]   .profile-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%] {\n  background: var(--ion-color-dark-tint);\n  border-color: var(--ion-color-dark-shade);\n}\n.dark[_ngcontent-%COMP%]   .profile-section[_ngcontent-%COMP%]   .profile-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  color: var(--ion-color-light);\n}\n.dark[_ngcontent-%COMP%]   .profile-section[_ngcontent-%COMP%]   .profile-stats[_ngcontent-%COMP%]   .stat-item[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  color: var(--ion-color-light-tint);\n}\n.dark[_ngcontent-%COMP%]   .weight-progress-section[_ngcontent-%COMP%] {\n  background: var(--ion-color-dark);\n  border-color: var(--ion-color-dark-shade);\n}\n.dark[_ngcontent-%COMP%]   .weight-progress-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  color: var(--ion-color-light);\n}\n.dark[_ngcontent-%COMP%]   .weight-progress-section[_ngcontent-%COMP%]   .weight-metric-card[_ngcontent-%COMP%] {\n  background: #1f2937;\n  border-color: var(--ion-color-dark-shade);\n}\n.dark[_ngcontent-%COMP%]   .weight-progress-section[_ngcontent-%COMP%]   .weight-metric-card[_ngcontent-%COMP%]   .weight-metric-value[_ngcontent-%COMP%] {\n  font-size: 1.375rem;\n  font-weight: 700;\n  color: var(--text-primary, #ffffff);\n  color: #ffffff;\n}\n.dark[_ngcontent-%COMP%]   .weight-progress-section[_ngcontent-%COMP%]   .weight-metric-card[_ngcontent-%COMP%]   .weight-metric-value[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.dark[_ngcontent-%COMP%]   .weight-progress-section[_ngcontent-%COMP%]   .weight-metric-card[_ngcontent-%COMP%]   .weight-metric-label[_ngcontent-%COMP%] {\n  color: #9ca3af;\n}\n.dark[_ngcontent-%COMP%]   .weight-progress-section[_ngcontent-%COMP%]   .weight-chart-container[_ngcontent-%COMP%] {\n  background: #1f2937;\n  border-color: var(--ion-color-dark-shade);\n}\n.dark[_ngcontent-%COMP%]   .weight-progress-section[_ngcontent-%COMP%]   .weight-chart-container[_ngcontent-%COMP%]   .chart-header[_ngcontent-%COMP%]   .chart-title[_ngcontent-%COMP%] {\n  color: var(--ion-color-light);\n}\n.dark[_ngcontent-%COMP%]   .weight-progress-section[_ngcontent-%COMP%]   .weight-chart-container[_ngcontent-%COMP%]   .chart-header[_ngcontent-%COMP%]   .chart-period[_ngcontent-%COMP%] {\n  color: var(--ion-color-light-tint);\n}\n.dark[_ngcontent-%COMP%]   .weight-progress-section[_ngcontent-%COMP%]   .weight-chart-container[_ngcontent-%COMP%]   .weight-chart[_ngcontent-%COMP%]   .weight-point[_ngcontent-%COMP%]   .weight-value[_ngcontent-%COMP%] {\n  background: #1f2937;\n  border-color: var(--ion-color-dark-shade);\n  color: var(--ion-color-light);\n}\n.dark[_ngcontent-%COMP%]   .weight-progress-section[_ngcontent-%COMP%]   .weight-chart-container[_ngcontent-%COMP%]   .weight-chart[_ngcontent-%COMP%]   .weight-point[_ngcontent-%COMP%]   .weight-label[_ngcontent-%COMP%] {\n  color: var(--ion-color-light-tint);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.dark[_ngcontent-%COMP%]   .weight-progress-section[_ngcontent-%COMP%]   .weight-chart-container[_ngcontent-%COMP%]   .weight-chart[_ngcontent-%COMP%]   .chart-grid[_ngcontent-%COMP%]   .grid-line[_ngcontent-%COMP%] {\n  background: var(--ion-color-dark-shade);\n}\n.dark[_ngcontent-%COMP%]   .weight-progress-section[_ngcontent-%COMP%]   .weight-stats[_ngcontent-%COMP%]   .weight-stat[_ngcontent-%COMP%] {\n  background: #1f2937;\n  border-color: var(--ion-color-dark-shade);\n}\n.dark[_ngcontent-%COMP%]   .weight-progress-section[_ngcontent-%COMP%]   .weight-stats[_ngcontent-%COMP%]   .weight-stat[_ngcontent-%COMP%]   .weight-stat-label[_ngcontent-%COMP%] {\n  color: var(--ion-color-light-tint);\n}\n\n\n\n@media (max-width: 480px) {\n  .stats-container[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n    gap: 6px;\n  }\n  .stat-card[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .hero-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    text-align: center;\n    gap: 12px;\n  }\n  .user-name[_ngcontent-%COMP%] {\n    font-size: clamp(1.2rem, 5vw, 1.5rem);\n    line-height: 1.2;\n  }\n}\n\n\n@media (max-width: 414px) {\n  .profile-stats[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n  .weight-progress-section[_ngcontent-%COMP%] {\n    margin: 0.75rem 0.5rem;\n    padding: 0.875rem;\n  }\n  .weight-progress-section[_ngcontent-%COMP%]   .weight-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n    gap: 8px;\n    margin-bottom: 12px;\n  }\n  .weight-progress-section[_ngcontent-%COMP%]   .weight-single-card[_ngcontent-%COMP%] {\n    max-width: 70%;\n    margin: 0 auto;\n  }\n  .weight-progress-section[_ngcontent-%COMP%]   .weight-metric-card[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .weight-progress-section[_ngcontent-%COMP%]   .weight-metric-card[_ngcontent-%COMP%]   .weight-metric-value[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n  }\n  .weight-progress-section[_ngcontent-%COMP%]   .weight-metric-card[_ngcontent-%COMP%]   .weight-metric-label[_ngcontent-%COMP%] {\n    font-size: 0.625rem;\n  }\n  .weight-progress-section[_ngcontent-%COMP%]   .weight-stats[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n  .weight-progress-section[_ngcontent-%COMP%]   .weight-stats[_ngcontent-%COMP%]   .weight-stat[_ngcontent-%COMP%] {\n    padding: 0.5rem;\n    max-width: 9.375rem;\n  }\n  .weight-progress-section[_ngcontent-%COMP%]   .weight-stats[_ngcontent-%COMP%]   .weight-stat[_ngcontent-%COMP%]   .weight-stat-value[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n  }\n  .weight-progress-section[_ngcontent-%COMP%]   .weight-stats[_ngcontent-%COMP%]   .weight-stat[_ngcontent-%COMP%]   .weight-stat-label[_ngcontent-%COMP%] {\n    font-size: 0.6rem;\n  }\n}\n[_ngcontent-%COMP%]:root {\n  --bg-primary: #0a0a0b;\n  --bg-secondary: #111111;\n  --bg-tertiary: #1c1c1e;\n  --border-primary: #2a2a2a;\n  --text-primary: #ffffff;\n  --text-secondary: #9ca3af;\n  --accent-primary: #fe9000;\n  --success-color: #22c55e;\n  --danger-color: #ef4444;\n}\n\n\n\n.weight-progress-section[_ngcontent-%COMP%] {\n  margin: 16px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n  background: #141414;\n  border: 1px solid #252525;\n  border-radius: 16px;\n  padding: 1.25rem;\n  \n\n\n}\n.weight-progress-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 16px;\n  gap: 8px;\n}\n.weight-progress-section[_ngcontent-%COMP%]   .edit-nutrition-btn[_ngcontent-%COMP%] {\n  --background: var(--ion-color-secondary);\n  --color: white;\n  font-size: 12px;\n  height: 32px;\n}\n.weight-progress-section[_ngcontent-%COMP%]   .edit-nutrition-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.weight-progress-section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.weight-progress-section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.4rem;\n  color: #ffffff;\n}\n\n.weight-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 15px;\n  text-align: center;\n}\n\n.weight-metric[_ngcontent-%COMP%] {\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n  background: #0e0e0e;\n  border: 1px solid #373737;\n  padding: 15px;\n  border-radius: 12px;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n}\n.weight-metric.full-width[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.weight-metric[_ngcontent-%COMP%]   .weight-metric-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary, #9ca3af);\n  margin-bottom: 8px;\n}\n.weight-metric[_ngcontent-%COMP%]   .weight-metric-value[_ngcontent-%COMP%] {\n  font-size: 1.375rem;\n  font-weight: 700;\n  color: var(--text-primary, #ffffff);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.weight-metric[_ngcontent-%COMP%]   .weight-metric-value[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n}\n.weight-metric[_ngcontent-%COMP%]   .weight-metric-value[_ngcontent-%COMP%]   .weight-change[_ngcontent-%COMP%] {\n  display: inline;\n  font-size: 13px;\n  font-weight: 600;\n  margin-left: 5px;\n}\n.weight-metric[_ngcontent-%COMP%]   .weight-metric-value[_ngcontent-%COMP%]   .weight-change.positive[_ngcontent-%COMP%] {\n  color: var(--success-color, #22c55e);\n}\n.weight-metric[_ngcontent-%COMP%]   .weight-metric-value[_ngcontent-%COMP%]   .weight-change.negative[_ngcontent-%COMP%] {\n  color: var(--danger-color, #ef4444);\n}\n.weight-metric[_ngcontent-%COMP%]   .weight-metric-value[_ngcontent-%COMP%]   .weight-change.neutral[_ngcontent-%COMP%] {\n  color: var(--text-secondary, #9ca3af);\n}\n\n.weight-stats[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 12px;\n  margin-top: 16px;\n}\n.weight-stats[_ngcontent-%COMP%]   .weight-stat[_ngcontent-%COMP%] {\n  background: var(--ion-color-light-tint);\n  border-radius: 8px;\n  padding: 0.75rem;\n  text-align: center;\n  border: 1px solid var(--ion-color-light-shade);\n  flex: 1;\n  max-width: 200px;\n}\n.weight-stats[_ngcontent-%COMP%]   .weight-stat[_ngcontent-%COMP%]   .weight-stat-value[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 700;\n  margin-bottom: 4px;\n}\n.weight-stats[_ngcontent-%COMP%]   .weight-stat[_ngcontent-%COMP%]   .weight-stat-value.trend-positive[_ngcontent-%COMP%] {\n  color: var(--ion-color-success);\n}\n.weight-stats[_ngcontent-%COMP%]   .weight-stat[_ngcontent-%COMP%]   .weight-stat-value.trend-negative[_ngcontent-%COMP%] {\n  color: var(--ion-color-danger);\n}\n.weight-stats[_ngcontent-%COMP%]   .weight-stat[_ngcontent-%COMP%]   .weight-stat-value.trend-neutral[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n}\n.weight-stats[_ngcontent-%COMP%]   .weight-stat[_ngcontent-%COMP%]   .weight-stat-label[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  color: var(--ion-color-medium);\n}\n\n\n\n.dark[_ngcontent-%COMP%]   .profile-section[_ngcontent-%COMP%] {\n  border-bottom-color: var(--ion-color-dark);\n}\n.dark[_ngcontent-%COMP%]   .profile-name[_ngcontent-%COMP%] {\n  color: var(--ion-color-light);\n}\n.dark[_ngcontent-%COMP%]   .profile-avatar[_ngcontent-%COMP%] {\n  border-color: var(--ion-color-dark);\n}\n.dark[_ngcontent-%COMP%]   .profile-avatar[_ngcontent-%COMP%]   .avatar-initials[_ngcontent-%COMP%] {\n  color: white;\n}\n.dark[_ngcontent-%COMP%]   .progress-section[_ngcontent-%COMP%] {\n  background: var(--ion-color-dark-tint);\n  border-color: var(--ion-color-dark-shade);\n}\n.dark[_ngcontent-%COMP%]   .progress-section[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  color: var(--ion-color-light);\n}\n.dark[_ngcontent-%COMP%]   .progress-section[_ngcontent-%COMP%]   .progress-cards[_ngcontent-%COMP%]   .progress-card[_ngcontent-%COMP%] {\n  background: var(--ion-color-dark-shade);\n  border-color: var(--ion-color-medium-shade);\n}\n.dark[_ngcontent-%COMP%]   .progress-section[_ngcontent-%COMP%]   .progress-cards[_ngcontent-%COMP%]   .progress-card[_ngcontent-%COMP%]   .progress-content[_ngcontent-%COMP%]   .progress-value[_ngcontent-%COMP%] {\n  color: var(--ion-color-light);\n}\n.dark[_ngcontent-%COMP%]   .progress-section[_ngcontent-%COMP%]   .progress-chart[_ngcontent-%COMP%] {\n  background: var(--ion-color-dark-shade);\n  border-color: var(--ion-color-medium-shade);\n}\n.dark[_ngcontent-%COMP%]   .progress-section[_ngcontent-%COMP%]   .progress-chart[_ngcontent-%COMP%]   .chart-header[_ngcontent-%COMP%]   .chart-title[_ngcontent-%COMP%] {\n  color: var(--ion-color-light);\n}\n\n\n\n.profile-options[_ngcontent-%COMP%] {\n  padding: 0 16px;\n}\n.profile-options[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {\n  margin: 0.75rem 0;\n  border-radius: 16px;\n  background: #141414;\n  border: 1px solid #252525;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n}\n.profile-options[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --background: transparent;\n  --color: #ffffff;\n  --padding-start: 20px;\n  --padding-end: 20px;\n  --min-height: 64px;\n}\n.profile-options[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 600;\n  color: #ffffff;\n}\n.profile-options[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 700;\n}\n.profile-options[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n.profile-options[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --background: transparent !important;\n  --color: var(--ion-color-medium) !important;\n  --border-radius: 12px;\n  --padding-start: 12px;\n  --padding-end: 12px;\n  margin: 0;\n}\n.profile-options[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n\n\n\n.dark[_ngcontent-%COMP%]   .profile-options[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {\n  background: var(--ion-color-dark-shade);\n  border-color: var(--ion-color-medium-shade);\n}\n.dark[_ngcontent-%COMP%]   .profile-options[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  color: var(--ion-color-light);\n}\n.dark[_ngcontent-%COMP%]   .profile-options[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  color: var(--ion-color-light);\n}\n\n\n\n@media (max-width: 414px) {\n  .profile-stats[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n  .progress-section[_ngcontent-%COMP%] {\n    margin: 12px 8px;\n    padding: 14px;\n  }\n  .progress-section[_ngcontent-%COMP%]   .progress-cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr;\n    gap: 6px;\n  }\n  .progress-section[_ngcontent-%COMP%]   .progress-cards[_ngcontent-%COMP%]   .progress-card[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .progress-section[_ngcontent-%COMP%]   .weight-bars[_ngcontent-%COMP%] {\n    padding: 0 10px;\n  }\n  .progress-section[_ngcontent-%COMP%]   .weight-bars[_ngcontent-%COMP%]   .weight-bar[_ngcontent-%COMP%]   .bar-visual[_ngcontent-%COMP%] {\n    width: 1.25rem;\n  }\n  .profile-options[_ngcontent-%COMP%] {\n    padding: 0 12px;\n  }\n  .profile-options[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {\n    margin: 0.5rem 0;\n  }\n  .profile-options[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n    --padding-start: 16px;\n    --padding-end: 16px;\n    --min-height: 56px;\n  }\n  .profile-options[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 0.9375rem;\n  }\n  .profile-options[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-buttons[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 1.125rem;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL3Byb2ZpbGUvcHJvZmlsZS5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZ0JBQWdCO0FBQ2hCO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsOENBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBQ0Y7QUFFRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFdBQUE7RUFDQSxVQUFBO0FBQUo7O0FBS0E7RUFDRSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7QUFGRjtBQUlFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUFGSjs7QUFPQTtFQUNFLE9BQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7QUFKRjtBQU1FO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFKSjtBQU1JO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFKTjtBQU1NO0VBQ0UsY0FBQTtBQUpSO0FBT007RUFDRSw2REFBQTtFQUNBLDZCQUFBO0VBQ0Esb0NBQUE7RUFDQSxxQkFBQTtBQUxSOztBQVlBO0VBRUk7SUFDRSxrQkFBQTtFQVZKO0VBWUk7SUFDRSxlQUFBO0lBQ0EsWUFBQTtFQVZOO0VBZ0JNO0lBQ0UsZUFBQTtFQWRSO0FBQ0Y7QUFxQkE7RUFDRTtJQUNFLG1CQUFBO0lBQ0EsMENBQUE7RUFuQkY7QUFDRjtBQXNCQTtFQUNFLFFBQUE7RUFDQSxTQUFBO0VBQ0Esb0NBQUE7RUFDQSxxQ0FBQTtFQUNBLGlDQUFBO0FBcEJGOztBQXdCQTtFQUNFLGlCQUFBO0VBQ0Es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RUFDRSxlQUFBO0FBOVFaOztBQXNSQSwrQ0FBQTtBQUdJO0VBQ0UsdUNBQUE7RUFDQSwyQ0FBQTtBQXJSTjtBQXdSUTtFQUNFLDZCQUFBO0FBdFJWO0FBd1JVO0VBQ0UsNkJBQUE7QUF0Ulo7O0FBOFJBLG9GQUFBO0FBQ0E7RUFDRTtJQUNFLFNBQUE7RUEzUkY7RUE4UkE7SUFDRSxnQkFBQTtJQUNBLGFBQUE7RUE1UkY7RUE4UkU7SUFDRSw4QkFBQTtJQUNBLFFBQUE7RUE1Uko7RUE4Ukk7SUFDRSxhQUFBO0VBNVJOO0VBZ1NFO0lBQ0UsZUFBQTtFQTlSSjtFQWdTSTtJQUNFLGNBQUE7RUE5Uk47RUFtU0E7SUFDRSxlQUFBO0VBalNGO0VBbVNFO0lBQ0UsZ0JBQUE7RUFqU0o7RUFtU0k7SUFDRSxxQkFBQTtJQUNBLG1CQUFBO0lBQ0Esa0JBQUE7RUFqU047RUFtU007SUFDRSxvQkFBQTtFQWpTUjtFQW9TTTtJQUNFLG1CQUFBO0VBbFNSO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBFc3RpbG9zIGRlbCB0b29sYmFyLWNhbGVuZGFyIGFkYXB0YWRvcyBwYXJhIHByb2ZpbGUgKHNpbiBib3RvbmVzIG5pIGFuaW1hY2lvbmVzKVxuLnRvb2xiYXItY2FsZW5kYXItY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQ6ICMxNDE0MTQ7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDM3LCAzNywgMzcsIDAuMyk7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAvLyBFZmVjdG8gZGUgYnJpbGxvIHN1dGlsXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogXCJcIjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgaGVpZ2h0OiAxcHg7XG4gICAgei1pbmRleDogMTtcbiAgfVxufVxuXG4vLyBUb29sYmFyIHByaW5jaXBhbFxuLm1haW4tdG9vbGJhciB7XG4gIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIC0tY29sb3I6ICNmZmZmZmY7XG4gIC0tYm9yZGVyLXdpZHRoOiAwO1xuICAtLXBhZGRpbmctc3RhcnQ6IDA7XG4gIC0tcGFkZGluZy1lbmQ6IDA7XG4gIC0tbWluLWhlaWdodDogNjBweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB6LWluZGV4OiAyO1xuXG4gIC50b29sYmFyLWNvbnRlbnQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAwIDIwcHg7XG4gICAgaGVpZ2h0OiA2MHB4O1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59XG5cbi8vIFNlY2Npw4PCs24gZGVsIHTDg8KtdHVsb1xuLnRpdGxlLXNlY3Rpb24ge1xuICBmbGV4OiAxO1xuICBwYWRkaW5nOiA4cHggMDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuXG4gIC50aXRsZS1jb250ZW50IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cbiAgICAuYnJhbmQtbmFtZSB7XG4gICAgICBmb250LXNpemU6IDIycHg7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDFweDtcblxuICAgICAgLnRyYWluLXRleHQge1xuICAgICAgICBjb2xvcjogI2ZmZmZmZjtcbiAgICAgIH1cblxuICAgICAgLmZpdC10ZXh0IHtcbiAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZlOTAwMCAwJSwgI2ZmNmIzNSAxMDAlKTtcbiAgICAgICAgLXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6IHRleHQ7XG4gICAgICAgIC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBSZXNwb25zaXZpZGFkIHBhcmEgcGFudGFsbGFzIHBlcXVlw4PCsWFzXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcbiAgLnRvb2xiYXItY2FsZW5kYXItY29udGFpbmVyIHtcbiAgICAubWFpbi10b29sYmFyIHtcbiAgICAgIC0tbWluLWhlaWdodDogNTZweDtcblxuICAgICAgLnRvb2xiYXItY29udGVudCB7XG4gICAgICAgIHBhZGRpbmc6IDAgMTZweDtcbiAgICAgICAgaGVpZ2h0OiA1NnB4O1xuICAgICAgfVxuICAgIH1cblxuICAgIC50aXRsZS1zZWN0aW9uIHtcbiAgICAgIC50aXRsZS1jb250ZW50IHtcbiAgICAgICAgLmJyYW5kLW5hbWUge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBUZW1hIG9zY3VybyBlc3BlY8ODwq1maWNvXG5AbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7XG4gIC50b29sYmFyLWNhbGVuZGFyLWNvbnRhaW5lciB7XG4gICAgYmFja2dyb3VuZDogIzE0MTQxNDtcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiByZ2JhKDM3LCAzNywgMzcsIDAuNSk7XG4gIH1cbn1cblxuLmFycm93LXVwIHtcbiAgd2lkdGg6IDA7XG4gIGhlaWdodDogMDtcbiAgYm9yZGVyLWxlZnQ6IDAuMmVtIHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItcmlnaHQ6IDAuMmVtIHNvbGlkIHRyYW5zcGFyZW50O1xuICBib3JkZXItYm90dG9tOiAwLjJlbSBzb2xpZCBvcmFuZ2U7XG59XG5cbi8vIEVzdGlsb3MgdW5pZmljYWRvcyBwYXJhIGVsIHTDg8KtdHVsbyBUUkFJTkZJVCAoaWTDg8KpbnRpY29zIGEgc3VtbWFyeSlcbi5hcHAtdGl0bGUge1xuICBmb250LXNpemU6IDEuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgbWFyZ2luOiAwO1xuICBsZXR0ZXItc3BhY2luZzogLTAuMDFlbTtcblxuICAuZml0LXByaW1hcnkge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIH1cbn1cblxuLy8gVGVtYSBvc2N1cm8gKGlkw4PCqW50aWNvIGEgc3VtbWFyeSlcbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcbiAgLmFwcC10aXRsZSB7XG4gICAgY29sb3I6ICNmZmZmZmY7XG5cbiAgICAuZml0LXByaW1hcnkge1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICB9XG4gIH1cbn1cblxuLy8gU29wb3J0ZSBlc3BlY8ODwq1maWNvIHBhcmEgdGVtYXMgZGUgcHJvZmlsZSAoaWTDg8KpbnRpY28gYSBzdW1tYXJ5KVxuLnQtaW5pdC1wcm9maWxlIHtcbiAgJi5saWdodC10aGVtZSB7XG4gICAgLmFwcC10aXRsZSB7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuXG4gICAgICAuZml0LXByaW1hcnkge1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gICYuZGFyay10aGVtZSB7XG4gICAgLmFwcC10aXRsZSB7XG4gICAgICBjb2xvcjogI2ZmZmZmZjtcblxuICAgICAgLmZpdC1wcmltYXJ5IHtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyogRXN0aWxvcyBlc3BlY8ODwq1maWNvcyBwYXJhIGxhIHNlY2Npw4PCs24gZGUgcmVkZXMgc29jaWFsZXMgKi9cbi5zb2NpYWwtbmV0d29ya3Mtc2VjdGlvbiB7XG4gIGlvbi1ncmlkIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICB9XG5cbiAgaW9uLXJvdyB7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgfVxuXG4gIGlvbi1idXR0b25zIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICB9XG5cbiAgaW9uLWJ1dHRvbiB7XG4gICAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICB9XG59XG5cbmlvbi1zbGlkZXMge1xuICB3aWR0aDogMTAwJTtcbn1cblxuaW9uLXByb2dyZXNzLWJhciB7XG4gIGhlaWdodDogMC40ZW07XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbn1cblxuaW9uLWxhYmVsPnAsXG5vbCB7XG4gIGZvbnQtc2l6ZTogeHgtc21hbGw7XG4gIG1hcmdpbjogMDtcbiAgbWFyZ2luLXRvcDogLTAuMmVtO1xuICBtYXJnaW4tYm90dG9tOiAtMC4yZW07XG59XG5cbi5kaXNhYmxlZC1pbml0aWFsIHtcbiAgb3BhY2l0eTogMSAhaW1wb3J0YW50O1xufVxuXG4vKiBTZWN0aW9uIERpdmlkZXIgKi9cbi5zZWN0aW9uLWRpdmlkZXIge1xuICBoZWlnaHQ6IDFweDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS10aW50KTtcbiAgbWFyZ2luOiAwIDE2cHggMTJweCAxNnB4O1xuICBvcGFjaXR5OiAwLjQ7XG59XG5cbi8qIE51dHJpdGlvbiBUaXRsZSBTZWN0aW9uICovXG4ubnV0cml0aW9uLXRpdGxlLXNlY3Rpb24ge1xuICBtYXJnaW46IDFyZW0gMXJlbSAwLjVyZW0gMXJlbTtcblxuICAucGFnZS1udXRyaXRpb24tdGl0bGUge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDhweDtcbiAgICBmb250LXNpemU6IDEuMjVyZW07XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIG1hcmdpbjogMDtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4zNzVyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgIH1cbiAgfVxufVxuXG4vKiBOdXRyaXRpb24gU2VjdGlvbiBTdHlsZXMgKi9cbi5udXRyaXRpb24tc2VjdGlvbiB7XG4gIGJhY2tncm91bmQ6ICMxNDE0MTQ7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIHBhZGRpbmc6IDEuMjVyZW07XG4gIG1hcmdpbjogMTZweDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzI1MjUyNTtcbn1cblxuLm51dHJpdGlvbi1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAyMHB4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbn1cblxuLnNlY3Rpb24taGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xufVxuXG4uc2VjdGlvbi1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG59XG5cbi5zZWN0aW9uLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxLjEyNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIGZsZXg6IDE7XG4gIG1hcmdpbjogMDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi5udXRyaXRpb24tdGl0bGUge1xuICBmb250LXNpemU6IDEuMTI1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xuICBtYXJnaW46IDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uc2VjdGlvbi1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG59XG5cbi8qIEVzdGlsbyB1bmlmaWNhZG8gcGFyYSBib3RvbmVzIGRlIHNlY2Npw4PCs24gKi9cbi5zZWN0aW9uLWFjdGlvbixcbi5jYXJkLWFjdGlvbiB7XG4gIGJhY2tncm91bmQ6ICMxZjFmMWY7XG4gIGNvbG9yOiAjZmU5MDAwO1xuICBmb250LXNpemU6IDAuNzVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHBhZGRpbmc6IDVweCA5cHg7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzI1MjUyNTtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHRyYW5zaXRpb246IG5vbmU7XG5cbiAgc3BhbiB7XG4gICAgZm9udC1zaXplOiAwLjc1cmVtO1xuICAgIGNvbG9yOiAjZmU5MDAwO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIH1cbn1cblxuLyogQm90w4PCs24gZGUgcHJvZ3Jlc28gZGUgcGVzbyAtIGVzdGlsbyBkZWwgYm90w4PCs24gZGUgYWp1c3RlcyAqL1xuLndlaWdodC1wcm9ncmVzcy1idG4ge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpO1xuXG4gIGNvbG9yOiB2YXIoLS1wZS1tdXRlZCk7XG4gIHdpZHRoOiAyLjVyZW07XG4gIGhlaWdodDogMi41cmVtO1xuICBtaW4td2lkdGg6IDIuNXJlbTtcbiAgbWluLWhlaWdodDogMi41cmVtO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbiAgZmxleC1zaHJpbms6IDA7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiBcIlwiO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDUwJTtcbiAgICBsZWZ0OiA1MCU7XG4gICAgd2lkdGg6IDA7XG4gICAgaGVpZ2h0OiAwO1xuICAgIGJhY2tncm91bmQ6IHJhZGlhbC1ncmFkaWVudChjaXJjbGUsIHJnYmEoMjU0LCAxNDQsIDAsIDAuMykgMCUsIHRyYW5zcGFyZW50IDcwJSk7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjZzIGVhc2U7XG4gICAgei1pbmRleDogMDtcbiAgfVxuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTUpO1xuXG4gICAgJjo6YmVmb3JlIHtcbiAgICAgIHdpZHRoOiAyMDAlO1xuICAgICAgaGVpZ2h0OiAyMDAlO1xuICAgICAgYW5pbWF0aW9uOiBkcm9wRWZmZWN0IDAuNnMgZWFzZS1vdXQ7XG4gICAgfVxuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMS4xMjVyZW0gIWltcG9ydGFudDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB6LWluZGV4OiAxO1xuICAgIHdpZHRoOiAxLjEyNXJlbTtcbiAgICBoZWlnaHQ6IDEuMTI1cmVtO1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICB9XG59XG5cbi8qIFRvZ2dsZSBTdHlsZXMgLSBTaW1wbGlmaWNhZG8gKi9cbi5udXRyaXRpb24tdG9nZ2xlIHtcbiAgLS1iYWNrZ3JvdW5kOiAjMjUyNTI1O1xuICAtLWJhY2tncm91bmQtY2hlY2tlZDogI2ZlOTAwMDtcbiAgLS1oYW5kbGUtYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgLS1oYW5kbGUtYmFja2dyb3VuZC1jaGVja2VkOiAjZmZmZmZmO1xuICAtLWJvcmRlci1yYWRpdXM6IDEycHg7XG4gIC0taGFuZGxlLWJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIC0taGFuZGxlLXdpZHRoOiAxOHB4O1xuICAtLWhhbmRsZS1oZWlnaHQ6IDE4cHg7XG4gIC0tdHJhY2std2lkdGg6IDM2cHg7XG4gIC0tdHJhY2staGVpZ2h0OiAyMHB4O1xuICBtYXJnaW46IDA7XG4gIHRyYW5zZm9ybTogc2NhbGUoMC45KTtcbn1cblxuLm51dHJpdGlvbi1vdmVydmlldyB7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICBnYXA6IDE2cHg7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICBtaW4td2lkdGg6IDcuNXJlbTtcbiAgaGVpZ2h0OiA4LjYyNXJlbTtcbn1cblxuLm51dHJpdGlvbi1jYXJkIHtcbiAgYmFja2dyb3VuZDogIzBlMGUwZTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMC4zNzVyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYm9yZGVyOiAxcHggc29saWQgIzM3MzczNztcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIG1pbi1oZWlnaHQ6IDcuNXJlbTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLyogUm91dGluZSBTZWN0aW9uIFN0eWxlcyAqL1xuLy8gRW5oYW5jZWQgTWluaW1hbCBSb3V0aW5lIFNlY3Rpb25cbi8vIFJvdXRpbmUgU2VjdGlvbiBTdHlsZXMgLSBGaXRuZXNzIENhcmQgU3RydWN0dXJlXG4ucm91dGluZS1zZWN0aW9uIHtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgbWFyZ2luOiAxNnB4O1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBwYWRkaW5nOiAwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gIC8vIFRhcmpldGEgaW5mb3JtYXRpdmEgY29uIHBhbGV0YSBwcmltYXJ5L25hcmFuamFcbiAgLmluZm8tY2FyZCB7XG4gICAgLy8gVmFyaWFibGVzIGRlIGNvbG9yIHBvciBkZWZlY3RvIChwcmltYXJ5KVxuICAgIC0tY2FyZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIC0tY2FyZC1jb2xvci1yZ2I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYik7XG4gICAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1jYXJkLWNvbG9yLXJnYiksIDAuMDgpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEodmFyKC0tY2FyZC1jb2xvci1yZ2IpLCAwLjE4KTtcbiAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgIHBhZGRpbmc6IDEycHggMTZweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgZ2FwOiAxMnB4O1xuICAgIG1hcmdpbi10b3A6IDEycHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMHB4O1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcblxuICAgICY6YWN0aXZlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC45OCk7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWNhcmQtY29sb3ItcmdiKSwgMC4xMik7XG4gICAgfVxuICB9XG5cbiAgLy8gVmFyaWFudGUgbmFyYW5qYVxuICAuaW5mby1jYXJkLS1vcmFuZ2Uge1xuICAgIC0tY2FyZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXdhcm5pbmcpO1xuICAgIC0tY2FyZC1jb2xvci1yZ2I6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nLXJnYik7XG4gIH1cblxuICAuaW5mby1pY29uIHtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICBjb2xvcjogdmFyKC0tY2FyZC1jb2xvcik7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gIH1cblxuICAuaW5mby10ZXh0IHtcbiAgICBmbGV4OiAxO1xuXG4gICAgLmluZm8tdGl0bGUge1xuICAgICAgZm9udC1zaXplOiAwLjk1cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1jYXJkLWNvbG9yKTtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAwLjJweDtcbiAgICB9XG4gIH1cbn1cblxuLndvcmtvdXQtY2FyZCB7XG4gIGJhY2tncm91bmQ6ICMxNDE0MTQ7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMyNTI1MjU7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIHBhZGRpbmc6IDEuMjVyZW07XG5cbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XG5cbiAgLmNhcmQtaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxuXG4gIC5jYXJkLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDEuMTI1cmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLXBlLXRleHQpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDhweDtcbiAgICBtYXJnaW46IDA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAxLjI1cmVtO1xuICAgICAgY29sb3I6ICNmZmZmZmY7XG4gICAgfVxuICB9XG5cbiAgLyogRXN0aWxvcyBwYXJhIGNhcmQgY2xpY2tlYWJsZSAqL1xuICAmLmNsaWNrYWJsZS1jYXJkIHtcbiAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgfVxuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMjU0LCAxNDQsIDAsIDAuMSk7XG4gIH1cbn1cblxuLndvcmtvdXQtc3RhdHVzIHtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgYmFja2dyb3VuZDogIzBlMGUwZTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzI1MjUyNTtcbiAgcGFkZGluZzogMC45Mzc1cmVtO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuXG4gIC53b3Jrb3V0LXRpdGxlIHtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBtYXJnaW46IDAgMCA0cHggMDtcbiAgICBjb2xvcjogdmFyKC0tcGUtdGV4dCk7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB9XG5cbiAgLndvcmtvdXQtc3VidGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xuICAgIGNvbG9yOiB2YXIoLS1wZS1tdXRlZCk7XG4gICAgbWFyZ2luOiAwO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgfVxufVxuXG4ud29ya291dC1wcm9ncmVzcyB7XG4gIC5wcm9ncmVzcy1pbmZvIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBmb250LXNpemU6IDAuODEyNXJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgY29sb3I6IHZhcigtLXBlLXRleHQpO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgICAud29ya291dC1zdGF0ZSB7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuXG4gICAgICAmLmFjdGl2ZSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgICB9XG5cbiAgICAgICYuY29tcGxldGVkIHtcbiAgICAgICAgY29sb3I6IHZhcigtLXBlLWFjY2VudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLnByb2dyZXNzLWluZGljYXRvciB7XG4gICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuXG4gICAgLnByb2dyZXNzLXRleHQge1xuICAgICAgZm9udC1zaXplOiAwLjgxMjVyZW07XG4gICAgICBjb2xvcjogdmFyKC0tcGUtbXV0ZWQpO1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG4gIH1cblxuICAucHJvZ3Jlc3MtYmFyLWJnIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDhweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wZS1iZy10ZXJ0aWFyeSk7XG4gICAgYm9yZGVyLXJhZGl1czogNXB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgICAucHJvZ3Jlc3MtYmFyIHtcbiAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgICB9XG4gIH1cbn1cblxuLy8gQXZhaWxhYmxlIHJvdXRpbmUgc2VjdGlvblxuLmF2YWlsYWJsZS1yb3V0aW5lLXNlY3Rpb24ge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQtdGludCk7XG4gIHBhZGRpbmc6IDFyZW07XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG5cbiAgLmF2YWlsYWJsZS1pbmZvIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiA0cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTJweDtcblxuICAgIC5hdmFpbGFibGUtdGl0bGUge1xuICAgICAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLXRleHQtY29sb3IpO1xuICAgIH1cblxuICAgIC5hdmFpbGFibGUtc3VidGl0bGUge1xuICAgICAgZm9udC1zaXplOiAwLjc1cmVtO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIH1cbiAgfVxuXG4gIC5zdGFydC1idXR0b24ge1xuICAgIG1hcmdpbjogMDtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDA7XG4gICAgLS1wYWRkaW5nLWVuZDogMDtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgfVxufVxuXG4vLyBObyByb3V0aW5lIGNhcmRcbi5uby1yb3V0aW5lLWNhcmQge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDEuODc1cmVtIDEuMjVyZW07XG5cbiAgLm5vLXJvdXRpbmUtaWNvbiB7XG4gICAgZm9udC1zaXplOiAxLjc1cmVtO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gIH1cblxuICAubm8tcm91dGluZS10ZXh0IHtcbiAgICBmb250LXNpemU6IDEuMTI1cmVtO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tdGV4dC1jb2xvcik7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBtYXJnaW46IDA7XG4gICAgbGV0dGVyLXNwYWNpbmc6IC0wLjNweDtcbiAgICBsaW5lLWhlaWdodDogMS4zO1xuICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBzYW5zLXNlcmlmO1xuICB9XG5cbiAgLm5vLXJvdXRpbmUtc3VidGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMC44MTI1cmVtO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIG1hcmdpbjogMDtcbiAgICBsZXR0ZXItc3BhY2luZzogLTAuMXB4O1xuICAgIG9wYWNpdHk6IDAuODtcbiAgfVxufVxuXG5pb24tYnV0dG9uIHtcbiAgLS1jb2xvcjogd2hpdGU7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAtLWJvcmRlci1yYWRpdXM6IDZweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgdGV4dC10cmFuc2Zvcm06IG5vbmU7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4vLyBSZXNwb25zaXZlIERlc2lnbiAtIE1vYmlsZSBGaXJzdCBBcHByb2FjaFxuQG1lZGlhIChtYXgtd2lkdGg6IDMyMHB4KSB7XG4gIC5wcm9maWxlLXNlY3Rpb24ge1xuICAgIHBhZGRpbmc6IDFyZW0gMC43NXJlbSAwIDAuNzVyZW07XG4gIH1cblxuICAubnV0cml0aW9uLXRpdGxlLXNlY3Rpb24ge1xuICAgIG1hcmdpbjogMC43NXJlbSAwLjVyZW0gMC4yNXJlbSAwLjVyZW07XG4gIH1cblxuICAubm8tcm91dGluZS1jYXJkIHtcbiAgICBwYWRkaW5nOiAxLjI1cmVtIDAuNzVyZW07XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XG4gIC5wcm9maWxlLXNlY3Rpb24ge1xuICAgIHBhZGRpbmc6IDEuMjVyZW0gMXJlbSAwIDFyZW07XG4gIH1cblxuICAudXNlci1hdmF0YXIge1xuICAgIHdpZHRoOiAzLjVyZW07XG4gICAgaGVpZ2h0OiAzLjVyZW07XG4gIH1cblxuICAudXNlci1uYW1lIHtcbiAgICBmb250LXNpemU6IGNsYW1wKDAuOXJlbSwgMy41dncsIDEuMTI1cmVtKTtcbiAgICBsaW5lLWhlaWdodDogMS4yO1xuICB9XG5cbiAgLmluZm8tcm93LWNvbXBhY3Qge1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiAwLjM3NXJlbTtcbiAgfVxuXG4gIC53ZWlnaHQtcHJvZ3Jlc3Mtc2VjdGlvbiB7XG4gICAgbWFyZ2luOiAwLjVyZW0gMC4yNXJlbTtcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xuICB9XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA0ODFweCkgYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5wcm9maWxlLXNlY3Rpb24ge1xuICAgIHBhZGRpbmc6IDEuNXJlbSAxLjVyZW0gMCAxLjVyZW07XG4gIH1cblxuICAubnV0cml0aW9uLWNhcmQge1xuICAgIG1hcmdpbjogMXJlbSAwLjVyZW07XG4gIH1cblxuICAud2VpZ2h0LXN0YXQge1xuICAgIG1heC13aWR0aDogMTgwcHg7XG4gIH1cbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDc2OXB4KSB7XG4gIC5wcm9maWxlLXNlY3Rpb24ge1xuICAgIHBhZGRpbmc6IDJyZW0gMnJlbSAwIDJyZW07XG4gICAgbWF4LXdpZHRoOiAxMjAwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gIH1cblxuICAubnV0cml0aW9uLXRpdGxlLXNlY3Rpb24ge1xuICAgIG1hcmdpbjogMS41cmVtIDEuNXJlbSAwLjc1cmVtIDEuNXJlbTtcbiAgfVxuXG4gIC53ZWlnaHQtcHJvZ3Jlc3Mtc2VjdGlvbiB7XG4gICAgbWFyZ2luOiAxcmVtIDAuNzVyZW07XG4gICAgcGFkZGluZzogMS4yNXJlbTtcbiAgfVxuXG4gIC53ZWlnaHQtc3RhdCB7XG4gICAgbWF4LXdpZHRoOiAxMi41cmVtO1xuICB9XG59XG5cbmJvZHlbY29sb3ItdGhlbWU9XCJkYXJrXCJdIHtcbiAgLnJvdXRpbmUtc2VjdGlvbi1taW5pbWFsIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc3RlcC01MCk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3RlcC0yMDApO1xuICAgIGJveC1zaGFkb3c6XG4gICAgICAwIDRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4zKSxcbiAgICAgIDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuNCk7XG4gIH1cblxuICAucm91dGluZS1oZWFkZXItbWluaW1hbCB7XG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXN0ZXAtMjAwKTtcbiAgfVxuXG4gIC5yb3V0aW5lLXN0YXR1cy1taW5pbWFsIHtcbiAgICBib3gtc2hhZG93OlxuICAgICAgMCAzcHggOHB4IHJnYmEoMCwgMCwgMCwgMC4zKSxcbiAgICAgIDAgMXB4IDNweCByZ2JhKDAsIDAsIDAsIDAuMik7XG5cbiAgICAmLmFjdGl2ZSB7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLFxuICAgICAgICAgIHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMSksXG4gICAgICAgICAgcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjgpKTtcbiAgICAgIGJvcmRlci1jb2xvcjogcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjkpO1xuICAgICAgYm94LXNoYWRvdzpcbiAgICAgICAgMCA0cHggMTJweCByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuNCksXG4gICAgICAgIDAgMXB4IDNweCByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMyk7XG4gICAgfVxuXG4gICAgJi5jb21wbGV0ZWQge1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZyxcbiAgICAgICAgICByZ2JhKHZhcigtLWlvbi1jb2xvci1zdWNjZXNzLXJnYiksIDEpLFxuICAgICAgICAgIHJnYmEodmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiKSwgMC44KSk7XG4gICAgICBib3JkZXItY29sb3I6IHJnYmEodmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiKSwgMC45KTtcbiAgICAgIGJveC1zaGFkb3c6XG4gICAgICAgIDAgNHB4IDEycHggcmdiYSh2YXIoLS1pb24tY29sb3Itc3VjY2Vzcy1yZ2IpLCAwLjQpLFxuICAgICAgICAwIDFweCAzcHggcmdiYSh2YXIoLS1pb24tY29sb3Itc3VjY2Vzcy1yZ2IpLCAwLjMpO1xuICAgIH1cblxuICAgICYuYXZhaWxhYmxlIHtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsXG4gICAgICAgICAgcmdiYSh2YXIoLS1pb24tY29sb3Itd2FybmluZy1yZ2IpLCAxKSxcbiAgICAgICAgICByZ2JhKHZhcigtLWlvbi1jb2xvci13YXJuaW5nLXJnYiksIDAuOCkpO1xuICAgICAgYm9yZGVyLWNvbG9yOiByZ2JhKHZhcigtLWlvbi1jb2xvci13YXJuaW5nLXJnYiksIDAuOSk7XG4gICAgICBib3gtc2hhZG93OlxuICAgICAgICAwIDRweCAxMnB4IHJnYmEodmFyKC0taW9uLWNvbG9yLXdhcm5pbmctcmdiKSwgMC40KSxcbiAgICAgICAgMCAxcHggM3B4IHJnYmEodmFyKC0taW9uLWNvbG9yLXdhcm5pbmctcmdiKSwgMC4zKTtcbiAgICB9XG4gIH1cblxuICAucm91dGluZS1jYXJkLW1pbmltYWwge1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxNDVkZWcsIHJnYmEodmFyKC0taW9uLWNvbG9yLXN0ZXAtMTAwKSwgMC41KSwgcmdiYSh2YXIoLS1pb24tY29sb3Itc3RlcC0xMDApLCAwLjMpKTtcbiAgICBib3JkZXItY29sb3I6IHJnYmEodmFyKC0taW9uLWNvbG9yLXN0ZXAtMjAwKSwgMC44KTtcbiAgICBib3gtc2hhZG93OlxuICAgICAgMCAycHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMiksXG4gICAgICAwIDFweCAzcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xuICB9XG5cbiAgLnJvdXRpbmUtbWVzb2N5Y2xlIHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMTUpO1xuICB9XG5cbiAgLnJvdXRpbmUtd29ya291dCB7XG4gICAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3Itc3VjY2Vzcy1yZ2IpLCAwLjA4KTtcbiAgICBib3JkZXItY29sb3I6IHJnYmEodmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiKSwgMC4yKTtcblxuICAgIC53b3Jrb3V0LWN5Y2xlIHtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiKSwgMC4yKSAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxuXG4gIC5wcm9ncmVzcy1wZXJjZW50IHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMikgIWltcG9ydGFudDtcbiAgfVxuXG4gIC5wcm9ncmVzcy1iYXItbWluaW1hbCB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtMjAwKTtcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjMpO1xuXG4gICAgLnByb2dyZXNzLWZpbGwtbWluaW1hbCB7XG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSwgdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSkpO1xuICAgICAgYm94LXNoYWRvdzogMCAxcHggM3B4IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC42KTtcbiAgICB9XG4gIH1cblxuICAucm91dGluZS1pbmZvLW1pbmltYWwge1xuICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXdhcm5pbmctcmdiKSwgMC4wOCk7XG4gICAgYm9yZGVyLWNvbG9yOiByZ2JhKHZhcigtLWlvbi1jb2xvci13YXJuaW5nLXJnYiksIDAuMik7XG4gIH1cblxuICAubm8tcm91dGluZS1taW5pbWFsIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc3RlcC0xMDApO1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXN0ZXAtMzAwKTtcbiAgfVxufVxuXG4ubnV0cml0aW9uLXZhbHVlIHtcbiAgZm9udC1zaXplOiBjbGFtcCgyMHB4LCA1dncsIDI4cHgpO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xuICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gIHdvcmQtd3JhcDogYnJlYWstd29yZDtcbiAgb3ZlcmZsb3ctd3JhcDogYnJlYWstd29yZDtcbiAgaHlwaGVuczogYXV0bztcbiAgbGluZS1oZWlnaHQ6IDEuMTtcbiAgb3ZlcmZsb3c6IHZpc2libGU7XG4gIHRleHQtb3ZlcmZsb3c6IHVuc2V0O1xuICBkaXNwbGF5OiBibG9jaztcbiAgd2hpdGUtc3BhY2U6IG5vcm1hbDtcbn1cblxuLm51dHJpdGlvbi1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMTJweCwgM3Z3LCAxNnB4KTtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdGVwLTYwMCk7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjVweDtcbiAgd29yZC13cmFwOiBicmVhay13b3JkO1xuICBvdmVyZmxvdy13cmFwOiBicmVhay13b3JkO1xuICBsaW5lLWhlaWdodDogMS4yO1xuICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgdGV4dC1vdmVyZmxvdzogdW5zZXQ7XG4gIHdoaXRlLXNwYWNlOiBub3JtYWw7XG59XG5cbi5udXRyaXRpb24tcHJvZ3Jlc3Mge1xuICBtYXJnaW4tdG9wOiAwO1xuICBmbGV4OiAxO1xufVxuXG4ubWFjcm8taXRlbSB7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG5cbiAgJjpsYXN0LWNoaWxkIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICB9XG59XG5cbi5tYWNyby1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbn1cblxuLm1hY3JvLWluZm8ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbn1cblxuLm1hY3JvLWNvbG9yIHtcbiAgd2lkdGg6IDEycHg7XG4gIGhlaWdodDogMTJweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuXG4gICYucHJvdGVpbiB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tcHJvdGVpbi1jb2xvcik7XG4gIH1cblxuICAmLmNhcmJzIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1jYXJicy1jb2xvcik7XG4gIH1cblxuICAmLmZhdHMge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWZhdC1jb2xvcik7XG4gIH1cbn1cblxuLm1hY3JvLW5hbWUge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XG59XG5cbi5tYWNyby12YWx1ZXMge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3RlcC02MDApO1xuXG4gIHN0cm9uZyB7XG4gICAgY29sb3I6IHdoaXRlO1xuICB9XG59XG5cbi5wcm9ncmVzcy1iYXIge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA2cHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zdGVwLTE1MCk7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbWFyZ2luLXRvcDogNHB4O1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xufVxuXG4ucHJvZ3Jlc3MtZmlsbCB7XG4gIGhlaWdodDogMTAwJTtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuXG4gICYucHJvdGVpbiB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tcHJvdGVpbi1jb2xvcik7XG4gIH1cblxuICAmLmNhcmJzIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1jYXJicy1jb2xvcik7XG4gIH1cblxuICAmLmZhdHMge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWZhdC1jb2xvcik7XG4gIH1cbn1cblxuLyogUHJvZmlsZSBTZWN0aW9uIFN0eWxlcyAqL1xuLnByb2ZpbGUtc2VjdGlvbiB7XG4gIHBhZGRpbmc6IDEuNXJlbSAxLjI1cmVtIDAgMS4yNXJlbTtcbn1cblxuLnByb2ZpbGUtaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGdhcDogMTVweDtcbiAgbWFyZ2luLWJvdHRvbTogMzBweDtcbn1cblxuLmF2YXRhci13cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmbGV4LXNocmluazogMDtcbn1cblxuLmF2YXRhciB7XG4gIHdpZHRoOiAzLjc1cmVtO1xuICBoZWlnaHQ6IDMuNzVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tcGUtYWNjZW50KTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogd2hpdGU7XG5cbiAgJi5hdmF0YXItLXBybyB7XG4gICAgYm9yZGVyOiAycHggc29saWQgcmdiYSgyNTUsIDE5MiwgNzQsIDAuODUpO1xuICAgIGJveC1zaGFkb3c6XG4gICAgICAwIDAgMCAzcHggcmdiYSgyNTQsIDE0NCwgMCwgMC4xOCksXG4gICAgICAwIDEwcHggMjJweCByZ2JhKDI1NCwgMTQ0LCAwLCAwLjE2KTtcbiAgfVxufVxuXG4uYXZhdGFyLXByby1iYWRnZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAtMnB4O1xuICByaWdodDogLTJweDtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZmZkMTY2IDAlLCAjZjNhMDIwIDEwMCUpO1xuICBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1pb24tYmFja2dyb3VuZC1jb2xvciwgIzFhMWExYSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBib3gtc2hhZG93OiAwIDJweCA2cHggcmdiYSgyNDMsIDE2MCwgMzIsIDAuNSk7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogOXB4O1xuICAgIGNvbG9yOiAjM2QxZjAwO1xuICB9XG59XG5cbi51c2VyLWluZm8ge1xuICBmbGV4LWdyb3c6IDE7XG4gIG1pbi13aWR0aDogMDtcbiAgLyogUGVybWl0ZSBxdWUgZWwgY29udGVuZWRvciBzZSBjb250cmFpZ2EgKi9cbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgLyogUHJldmllbmUgZGVzYm9yZGFtaWVudG8gKi9cbiAgcGFkZGluZy10b3A6IDNweDtcbn1cblxuLnVzZXItbmFtZSB7XG4gIGZvbnQtc2l6ZTogY2xhbXAoMXJlbSwgNHZ3LCAxLjI1cmVtKTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbWFyZ2luOiAwO1xuICBjb2xvcjogdmFyKC0taW9uLXRleHQtY29sb3IpO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBsaW5lLWhlaWdodDogMS4yO1xuICB3b3JkLWJyZWFrOiBicmVhay13b3JkO1xuICBoeXBoZW5zOiBhdXRvO1xufVxuXG4udXNlci1nb2FsIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBjb2xvcjogdmFyKC0tcGUtbXV0ZWQpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDVweDtcbiAgbWFyZ2luLXRvcDogNHB4O1xufVxuXG4ucHJvZmlsZS1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG5cbi5zZXR0aW5ncy1idG4ge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpO1xuXG4gIGNvbG9yOiB2YXIoLS1wZS1tdXRlZCk7XG4gIHdpZHRoOiAzLjA2MjVyZW07XG4gIGhlaWdodDogMy4wNjI1cmVtO1xuICBtaW4td2lkdGg6IDMuMDYyNXJlbTtcbiAgLyogQXNlZ3VyYSBxdWUgbm8gc2UgcmVkdXpjYSAqL1xuICBtaW4taGVpZ2h0OiAzLjA2MjVyZW07XG4gIC8qIEFzZWd1cmEgcXVlIG5vIHNlIHJlZHV6Y2EgKi9cbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuICBmbGV4LXNocmluazogMDtcblxuICAvKiBQcmV2aWVuZSBxdWUgc2UgY29udHJhaWdhICovXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogXCJcIjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1MCU7XG4gICAgbGVmdDogNTAlO1xuICAgIHdpZHRoOiAwO1xuICAgIGhlaWdodDogMDtcbiAgICBiYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoY2lyY2xlLCByZ2JhKDI1NCwgMTQ0LCAwLCAwLjMpIDAlLCB0cmFuc3BhcmVudCA3MCUpO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC42cyBlYXNlO1xuICAgIHotaW5kZXg6IDA7XG4gIH1cblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTtcblxuICAgICY6OmJlZm9yZSB7XG4gICAgICB3aWR0aDogMjAwJTtcbiAgICAgIGhlaWdodDogMjAwJTtcbiAgICAgIGFuaW1hdGlvbjogZHJvcEVmZmVjdCAwLjZzIGVhc2Utb3V0O1xuICAgIH1cbiAgfVxuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDEuMzc1cmVtICFpbXBvcnRhbnQ7XG4gICAgLyogRnVlcnphIGVsIHRhbWHDg8KxbyBkZWwgaWNvbm8gKi9cbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB6LWluZGV4OiAxO1xuICAgIHdpZHRoOiAxLjM3NXJlbTtcbiAgICAvKiBBbmNobyBmaWpvICovXG4gICAgaGVpZ2h0OiAxLjM3NXJlbTtcbiAgICAvKiBBbHRvIGZpam8gKi9cbiAgICBmbGV4LXNocmluazogMDtcbiAgICAvKiBQcmV2aWVuZSBjb250cmFjY2nDg8KzbiAqL1xuICB9XG59XG5cblxuQGtleWZyYW1lcyBkcm9wRWZmZWN0IHtcbiAgMCUge1xuICAgIHdpZHRoOiAwO1xuICAgIGhlaWdodDogMDtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG5cbiAgNTAlIHtcbiAgICB3aWR0aDogMTUwJTtcbiAgICBoZWlnaHQ6IDE1MCU7XG4gICAgb3BhY2l0eTogMC44O1xuICB9XG5cbiAgMTAwJSB7XG4gICAgd2lkdGg6IDIwMCU7XG4gICAgaGVpZ2h0OiAyMDAlO1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbn1cblxuLyogRXhjZWVkZWQgdmFsdWVzIHN0eWxpbmcgKi9cbi5leGNlZWRlZC12YWx1ZSB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKSAhaW1wb3J0YW50O1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4vLyDDosKUwoDDosKUwoDDosKUwoAgUHJlbWl1bSB1cGdyYWRlIGJhbm5lciDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoBcblxuLnByZW1pdW0tYmFubmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICB3aWR0aDogY2FsYygxMDAlIC0gMzJweCk7XG4gIG1hcmdpbjogMCAxNnB4IDEycHg7XG4gIHBhZGRpbmc6IDEzcHggMTRweDtcbiAgYm9yZGVyLXJhZGl1czogMTRweDtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgcmdiYSgyNTQsIDE0NCwgMCwgMC4xKSAwJSwgcmdiYSgyNTQsIDE0NCwgMCwgMC4wNSkgMTAwJSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU0LCAxNDQsIDAsIDAuMyk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAxNTBtcyBlYXNlLCB0cmFuc2Zvcm0gMTMwbXMgZWFzZTtcblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk4NSk7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTQsIDE0NCwgMCwgMC4xNCk7XG4gIH1cbn1cblxuLnByZW1pdW0tYmFubmVyX19pY29uIHtcbiAgZm9udC1zaXplOiAyMnB4O1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBmbGV4LXNocmluazogMDtcbn1cblxuLnByZW1pdW0tYmFubmVyX190ZXh0IHtcbiAgZmxleDogMTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAycHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG59XG5cbi5wcmVtaXVtLWJhbm5lcl9fdGl0bGUge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG59XG5cbi5wcmVtaXVtLWJhbm5lcl9fc3ViIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogdmFyKC0tcGUtbXV0ZWQpO1xufVxuXG4ucHJlbWl1bS1iYW5uZXJfX2Fycm93IHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBjb2xvcjogdmFyKC0tcGUtbXV0ZWQtMik7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4vKiBQZXJzb25hbCBJbmZvcm1hdGlvbiBTZWN0aW9uIC0gQ29tcGFjdCBWZXJzaW9uICovXG4ucGVyc29uYWwtaW5mby1zZWN0aW9uLWNvbXBhY3Qge1xuICBiYWNrZ3JvdW5kOiAjMTQxNDE0O1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjMpO1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBwYWRkaW5nOiAxLjI1cmVtO1xuICBtYXJnaW46IDE2cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMyNTI1MjU7XG5cbiAgLmNvbXBhY3QtaGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICBwYWRkaW5nLWJvdHRvbTogOHB4O1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3Itc3RlcC0xNTApO1xuXG4gICAgLmhlYWRlci1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4xMjVyZW07XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgfVxuXG4gICAgLmhlYWRlci10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDEuMTI1cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XG4gICAgICBmbGV4OiAxO1xuICAgIH1cblxuICAgIC8qIEJvdMODwrNuIGRlIGluZm9ybWFjacODwrNuIHBlcnNvbmFsIC0gZXN0aWxvIGRlbCBib3TDg8KzbiBkZSBhanVzdGVzICovXG4gICAgLnBlcnNvbmFsLWluZm8tYnRuIHtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XG4gICAgICBjb2xvcjogdmFyKC0tcGUtbXV0ZWQpO1xuICAgICAgd2lkdGg6IDIuNXJlbTtcbiAgICAgIGhlaWdodDogMi41cmVtO1xuICAgICAgbWluLXdpZHRoOiAyLjVyZW07XG4gICAgICBtaW4taGVpZ2h0OiAyLjVyZW07XG4gICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuICAgICAgZmxleC1zaHJpbms6IDA7XG5cbiAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIGxlZnQ6IDUwJTtcbiAgICAgICAgd2lkdGg6IDA7XG4gICAgICAgIGhlaWdodDogMDtcbiAgICAgICAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGNpcmNsZSwgcmdiYSgyNTQsIDE0NCwgMCwgMC4zKSAwJSwgdHJhbnNwYXJlbnQgNzAlKTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuNnMgZWFzZTtcbiAgICAgICAgei1pbmRleDogMDtcbiAgICAgIH1cblxuICAgICAgJjphY3RpdmUge1xuICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTUpO1xuXG4gICAgICAgICY6OmJlZm9yZSB7XG4gICAgICAgICAgd2lkdGg6IDIwMCU7XG4gICAgICAgICAgaGVpZ2h0OiAyMDAlO1xuICAgICAgICAgIGFuaW1hdGlvbjogZHJvcEVmZmVjdCAwLjZzIGVhc2Utb3V0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgZm9udC1zaXplOiAxLjEyNXJlbSAhaW1wb3J0YW50O1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgIHotaW5kZXg6IDE7XG4gICAgICAgIHdpZHRoOiAxLjEyNXJlbTtcbiAgICAgICAgaGVpZ2h0OiAxLjEyNXJlbTtcbiAgICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLmluZm8tcm93IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGdhcDogOHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcblxuICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIH1cblxuICAgIC8vIE1hbnRlbmVyIGRpc2XDg8KxbyBob3Jpem9udGFsIGVuIHRvZG9zIGxvcyB0YW1hw4PCsW9zIGRlIHBhbnRhbGxhXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XG4gICAgICBnYXA6IDRweDsgLy8gUmVkdWNpciBnYXAgZW4gcGFudGFsbGFzIHBlcXVlw4PCsWFzIHBlcm8gbWFudGVuZXIgaG9yaXpvbnRhbFxuICAgIH1cblxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiAzMjBweCkge1xuICAgICAgZ2FwOiAycHg7IC8vIEdhcCBhw4PCum4gbcODwqFzIHBlcXVlw4PCsW8gcGFyYSBwYW50YWxsYXMgbXV5IHBlcXVlw4PCsWFzXG4gICAgfVxuICB9XG5cbiAgLmluZm8taXRlbS1jb21wYWN0IHtcbiAgICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjMpO1xuICAgIGZsZXg6IDE7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogNnB4O1xuICAgIGJhY2tncm91bmQ6ICMwZTBlMGU7XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIHBhZGRpbmc6IDAuNXJlbSAwLjYyNXJlbTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMjUyNTI1O1xuICAgIG1pbi13aWR0aDogMDsgLy8gUGVybWl0ZSBxdWUgbG9zIGVsZW1lbnRvcyBzZSBlbmNvamFuXG5cbiAgICBpb24taWNvbiB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgfVxuXG4gICAgLmluZm8tdGV4dCB7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgfVxuXG4gICAgLy8gQWp1c3RlcyByZXNwb25zaXZvcyBwYXJhIHBhbnRhbGxhcyBwZXF1ZcODwrFhc1xuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkge1xuICAgICAgcGFkZGluZzogMC4zNzVyZW0gMC41cmVtO1xuICAgICAgZ2FwOiA0cHg7XG5cbiAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgfVxuXG4gICAgICAuaW5mby10ZXh0IHtcbiAgICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiAzMjBweCkge1xuICAgICAgcGFkZGluZzogMC4yNXJlbSAwLjM3NXJlbTtcbiAgICAgIGdhcDogM3B4O1xuXG4gICAgICBpb24taWNvbiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICAgIH1cblxuICAgICAgLmluZm8tdGV4dCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLnByb2ZpbGUtZW1haWwge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xufVxuXG4ucHJvZmlsZS1zdGF0cyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTZweDtcbn1cblxuLnN0YXQtaXRlbSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnN0YXQtdmFsdWUge1xuICBmb250LXNpemU6IDE4cHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLnN0YXQtbGFiZWwge1xuICBmb250LXNpemU6IDEycHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLyogRGFyayB0aGVtZSBhZGp1c3RtZW50cyAqL1xuOmhvc3QtY29udGV4dCguZGFyaykge1xuICAubnV0cml0aW9uLXNlY3Rpb24ge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zdGVwLTEwMCk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3RlcC0yMDApO1xuICB9XG5cbiAgLm51dHJpdGlvbi1jYXJkIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc3RlcC0xNTApO1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXN0ZXAtMjUwKTtcbiAgfVxuXG4gIC5wcm9ncmVzcy1iYXIge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zdGVwLTI1MCk7XG4gIH1cblxuICAuaGVyby1zZWN0aW9uIHtcbiAgICBib3gtc2hhZG93OiAwIDhweCAzMnB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgfVxufVxuXG4vKiBMaWdodCB0aGVtZSBhZGp1c3RtZW50cyAqL1xuOmhvc3QtY29udGV4dCgubGlnaHQpIHtcbiAgLmhlcm8tc2VjdGlvbiB7XG4gICAgYm94LXNoYWRvdzogMCA4cHggMzJweCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xuICB9XG59XG5cbi8qIERhcmsgdGhlbWUgYWRqdXN0bWVudHMgZm9yIHByb2ZpbGUgc2VjdGlvbiAqL1xuLmRhcmsge1xuICAucHJvZmlsZS1zZWN0aW9uIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyay1zaGFkZSk7XG5cbiAgICAucHJvZmlsZS1oZWFkZXIge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWRhcmstdGludCk7XG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrLXNoYWRlKTtcbiAgICB9XG5cbiAgICAucHJvZmlsZS1pbmZvIHtcbiAgICAgIC5wcm9maWxlLW5hbWUge1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICAgIH1cblxuICAgICAgLnByb2ZpbGUtZW1haWwge1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5wcm9maWxlLXN0YXRzIHtcbiAgICAgIC5zdGF0LWl0ZW0ge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItZGFyay10aW50KTtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyay1zaGFkZSk7XG5cbiAgICAgICAgLnN0YXQtdmFsdWUge1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLnN0YXQtbGFiZWwge1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQtdGludCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAud2VpZ2h0LXByb2dyZXNzLXNlY3Rpb24ge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrLXNoYWRlKTtcblxuICAgIC5zZWN0aW9uLWhlYWRlciB7XG4gICAgICAuc2VjdGlvbi10aXRsZSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC53ZWlnaHQtbWV0cmljLWNhcmQge1xuICAgICAgYmFja2dyb3VuZDogIzFmMjkzNztcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmstc2hhZGUpO1xuXG4gICAgICAud2VpZ2h0LW1ldHJpYy12YWx1ZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMS4zNzVyZW07XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS10ZXh0LXByaW1hcnksICNmZmZmZmYpO1xuXG4gICAgICAgIHNtYWxsIHtcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgIH1cblxuICAgICAgICBjb2xvcjogI2ZmZmZmZjtcbiAgICAgIH1cblxuICAgICAgLndlaWdodC1tZXRyaWMtbGFiZWwge1xuICAgICAgICBjb2xvcjogIzljYTNhZjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAud2VpZ2h0LWNoYXJ0LWNvbnRhaW5lciB7XG4gICAgICBiYWNrZ3JvdW5kOiAjMWYyOTM3O1xuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyay1zaGFkZSk7XG5cbiAgICAgIC5jaGFydC1oZWFkZXIge1xuICAgICAgICAuY2hhcnQtdGl0bGUge1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLmNoYXJ0LXBlcmlvZCB7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1saWdodC10aW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAud2VpZ2h0LWNoYXJ0IHtcbiAgICAgICAgLndlaWdodC1wb2ludCB7XG4gICAgICAgICAgLndlaWdodC12YWx1ZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMWYyOTM3O1xuICAgICAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyay1zaGFkZSk7XG4gICAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAud2VpZ2h0LWxhYmVsIHtcbiAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQtdGludCk7XG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC5jaGFydC1ncmlkIHtcbiAgICAgICAgICAuZ3JpZC1saW5lIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1kYXJrLXNoYWRlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAud2VpZ2h0LXN0YXRzIHtcbiAgICAgIC53ZWlnaHQtc3RhdCB7XG4gICAgICAgIGJhY2tncm91bmQ6ICMxZjI5Mzc7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmstc2hhZGUpO1xuXG4gICAgICAgIC53ZWlnaHQtc3RhdC1sYWJlbCB7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1saWdodC10aW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKiBNb2JpbGUtb3B0aW1pemVkIHJlc3BvbnNpdmUgZGVzaWduIC0gbWFpbnRhaW5pbmcgMi1jb2x1bW4gbGF5b3V0ICovXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcbiAgLnN0YXRzLWNvbnRhaW5lciB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xuICAgIGdhcDogNnB4O1xuICB9XG5cbiAgLnN0YXQtY2FyZCB7XG4gICAgcGFkZGluZzogMTBweDtcbiAgfVxuXG4gIC5oZXJvLWhlYWRlciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZ2FwOiAxMnB4O1xuICB9XG5cbiAgLnVzZXItbmFtZSB7XG4gICAgZm9udC1zaXplOiBjbGFtcCgxLjJyZW0sIDV2dywgMS41cmVtKTtcbiAgICBsaW5lLWhlaWdodDogMS4yO1xuICB9XG59XG5cbi8qIE1vYmlsZS1maXJzdCByZXNwb25zaXZlIGFkanVzdG1lbnRzIC0gbWFpbnRhaW5pbmcgMi1jb2x1bW4gbGF5b3V0ICovXG5AbWVkaWEgKG1heC13aWR0aDogNDE0cHgpIHtcbiAgLnByb2ZpbGUtc3RhdHMge1xuICAgIGdhcDogMTBweDtcbiAgfVxuXG4gIC53ZWlnaHQtcHJvZ3Jlc3Mtc2VjdGlvbiB7XG4gICAgbWFyZ2luOiAwLjc1cmVtIDAuNXJlbTtcbiAgICBwYWRkaW5nOiAwLjg3NXJlbTtcblxuICAgIC53ZWlnaHQtcm93IHtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcbiAgICAgIGdhcDogOHB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgICB9XG5cbiAgICAud2VpZ2h0LXNpbmdsZS1jYXJkIHtcbiAgICAgIG1heC13aWR0aDogNzAlO1xuICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgfVxuXG4gICAgLndlaWdodC1tZXRyaWMtY2FyZCB7XG4gICAgICBwYWRkaW5nOiAxMHB4O1xuXG4gICAgICAud2VpZ2h0LW1ldHJpYy12YWx1ZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgICAgfVxuXG4gICAgICAud2VpZ2h0LW1ldHJpYy1sYWJlbCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC42MjVyZW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLndlaWdodC1zdGF0cyB7XG4gICAgICBnYXA6IDZweDtcblxuICAgICAgLndlaWdodC1zdGF0IHtcbiAgICAgICAgcGFkZGluZzogMC41cmVtO1xuICAgICAgICBtYXgtd2lkdGg6IDkuMzc1cmVtO1xuXG4gICAgICAgIC53ZWlnaHQtc3RhdC12YWx1ZSB7XG4gICAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICAgIH1cblxuICAgICAgICAud2VpZ2h0LXN0YXQtbGFiZWwge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMC42cmVtO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbjpyb290IHtcbiAgLS1iZy1wcmltYXJ5OiAjMGEwYTBiO1xuICAtLWJnLXNlY29uZGFyeTogIzExMTExMTtcbiAgLS1iZy10ZXJ0aWFyeTogIzFjMWMxZTtcbiAgLS1ib3JkZXItcHJpbWFyeTogIzJhMmEyYTtcbiAgLS10ZXh0LXByaW1hcnk6ICNmZmZmZmY7XG4gIC0tdGV4dC1zZWNvbmRhcnk6ICM5Y2EzYWY7XG4gIC0tYWNjZW50LXByaW1hcnk6ICNmZTkwMDA7XG4gIC0tc3VjY2Vzcy1jb2xvcjogIzIyYzU1ZTtcbiAgLS1kYW5nZXItY29sb3I6ICNlZjQ0NDQ7XG59XG5cbi8qIFdlaWdodCBQcm9ncmVzcyBTZWN0aW9uIFN0eWxlcyAqL1xuLndlaWdodC1wcm9ncmVzcy1zZWN0aW9uIHtcbiAgbWFyZ2luOiAxNnB4O1xuXG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gIGJhY2tncm91bmQ6ICMxNDE0MTQ7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMyNTI1MjU7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIHBhZGRpbmc6IDEuMjVyZW07XG5cbiAgLyogYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTsgKi9cbiAgLnNlY3Rpb24taGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgZ2FwOiA4cHg7XG4gIH1cblxuICAuZWRpdC1udXRyaXRpb24tYnRuIHtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xuICAgIC0tY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBoZWlnaHQ6IDMycHg7XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgfVxuICB9XG5cbiAgLnNlY3Rpb24tdGl0bGUge1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXNpemU6IDEuMTI1cmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBmb250LXNpemU6IDEuNHJlbTtcbiAgICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgIH1cbiAgfVxufVxuXG4ud2VpZ2h0LWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XG4gIGdhcDogMTVweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ud2VpZ2h0LW1ldHJpYyB7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gIGJhY2tncm91bmQ6ICMwZTBlMGU7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMzNzM3Mzc7XG4gIHBhZGRpbmc6IDE1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcblxuICAmLmZ1bGwtd2lkdGgge1xuICAgIGdyaWQtY29sdW1uOiAxIC8gLTE7XG4gIH1cblxuICAud2VpZ2h0LW1ldHJpYy1sYWJlbCB7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSwgIzljYTNhZik7XG4gICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICB9XG5cbiAgLndlaWdodC1tZXRyaWMtdmFsdWUge1xuICAgIGZvbnQtc2l6ZTogMS4zNzVyZW07XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5LCAjZmZmZmZmKTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cbiAgICBzbWFsbCB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cblxuICAgIC53ZWlnaHQtY2hhbmdlIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBtYXJnaW4tbGVmdDogNXB4O1xuXG4gICAgICAmLnBvc2l0aXZlIHtcbiAgICAgICAgY29sb3I6IHZhcigtLXN1Y2Nlc3MtY29sb3IsICMyMmM1NWUpO1xuICAgICAgfVxuXG4gICAgICAmLm5lZ2F0aXZlIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWRhbmdlci1jb2xvciwgI2VmNDQ0NCk7XG4gICAgICB9XG5cbiAgICAgICYubmV1dHJhbCB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSwgIzljYTNhZik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi53ZWlnaHQtc3RhdHMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBtYXJnaW4tdG9wOiAxNnB4O1xuXG4gIC53ZWlnaHQtc3RhdCB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXRpbnQpO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbGlnaHQtc2hhZGUpO1xuICAgIGZsZXg6IDE7XG4gICAgbWF4LXdpZHRoOiAyMDBweDtcblxuICAgIC53ZWlnaHQtc3RhdC12YWx1ZSB7XG4gICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuXG4gICAgICAmLnRyZW5kLXBvc2l0aXZlIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgICAgIH1cblxuICAgICAgJi50cmVuZC1uZWdhdGl2ZSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbiAgICAgIH1cblxuICAgICAgJi50cmVuZC1uZXV0cmFsIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC53ZWlnaHQtc3RhdC1sYWJlbCB7XG4gICAgICBmb250LXNpemU6IDAuNjg3NXJlbTtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICB9XG4gIH1cbn1cblxuLyogRGFyayB0aGVtZSBhZGp1c3RtZW50cyBmb3IgcHJvZ3Jlc3Mgc2VjdGlvbiAqL1xuLmRhcmsge1xuICAucHJvZmlsZS1zZWN0aW9uIHtcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIH1cblxuICAucHJvZmlsZS1uYW1lIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgfVxuXG4gIC5wcm9maWxlLWF2YXRhciB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG5cbiAgICAuYXZhdGFyLWluaXRpYWxzIHtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICB9XG4gIH1cblxuICAucHJvZ3Jlc3Mtc2VjdGlvbiB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWRhcmstdGludCk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyay1zaGFkZSk7XG5cbiAgICAuc2VjdGlvbi1oZWFkZXIgLnNlY3Rpb24tdGl0bGUge1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gICAgfVxuXG4gICAgLnByb2dyZXNzLWNhcmRzIC5wcm9ncmVzcy1jYXJkIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1kYXJrLXNoYWRlKTtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZSk7XG5cbiAgICAgIC5wcm9ncmVzcy1jb250ZW50IC5wcm9ncmVzcy12YWx1ZSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5wcm9ncmVzcy1jaGFydCB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItZGFyay1zaGFkZSk7XG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0tc2hhZGUpO1xuXG4gICAgICAuY2hhcnQtaGVhZGVyIC5jaGFydC10aXRsZSB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKiBQcm9maWxlIE9wdGlvbnMgQ2FyZHMgU3R5bGVzICovXG4ucHJvZmlsZS1vcHRpb25zIHtcbiAgcGFkZGluZzogMCAxNnB4O1xuXG4gIGlvbi1jYXJkIHtcbiAgICBtYXJnaW46IDAuNzVyZW0gMDtcbiAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgIGJhY2tncm91bmQ6ICMxNDE0MTQ7XG4gICAgYm9yZGVyOiAxcHggc29saWQgIzI1MjUyNTtcbiAgICBib3gtc2hhZG93OiAwIDRweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gICAgaW9uLWl0ZW0ge1xuICAgICAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgIC0tY29sb3I6ICNmZmZmZmY7XG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDIwcHg7XG4gICAgICAtLXBhZGRpbmctZW5kOiAyMHB4O1xuICAgICAgLS1taW4taGVpZ2h0OiA2NHB4O1xuXG4gICAgICBoMiB7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICBjb2xvcjogI2ZmZmZmZjtcblxuICAgICAgICBzdHJvbmcge1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgIH1cblxuICAgICAgICBpb24tbGFiZWwge1xuICAgICAgICAgIGNvbG9yOiAjZmZmZmZmO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlvbi1idXR0b25zIHtcbiAgICAgICAgaW9uLWJ1dHRvbiB7XG4gICAgICAgICAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAgICAgICAgIC0tY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pICFpbXBvcnRhbnQ7XG4gICAgICAgICAgLS1ib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgICAgICAgIC0tcGFkZGluZy1zdGFydDogMTJweDtcbiAgICAgICAgICAtLXBhZGRpbmctZW5kOiAxMnB4O1xuICAgICAgICAgIG1hcmdpbjogMDtcblxuICAgICAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyogRGFyayB0aGVtZSBhZGp1c3RtZW50cyBmb3IgcHJvZmlsZSBvcHRpb25zICovXG4uZGFyayB7XG4gIC5wcm9maWxlLW9wdGlvbnMge1xuICAgIGlvbi1jYXJkIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1kYXJrLXNoYWRlKTtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1zaGFkZSk7XG5cbiAgICAgIGlvbi1pdGVtIHtcbiAgICAgICAgaDIge1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuXG4gICAgICAgICAgaW9uLWxhYmVsIHtcbiAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKiBNb2JpbGUtb3B0aW1pemVkIGFkanVzdG1lbnRzIGZvciBwcm9ncmVzcyBzZWN0aW9uIC0gbWFpbnRhaW5pbmcgMi1jb2x1bW4gbGF5b3V0ICovXG5AbWVkaWEgKG1heC13aWR0aDogNDE0cHgpIHtcbiAgLnByb2ZpbGUtc3RhdHMge1xuICAgIGdhcDogMTBweDtcbiAgfVxuXG4gIC5wcm9ncmVzcy1zZWN0aW9uIHtcbiAgICBtYXJnaW46IDEycHggOHB4O1xuICAgIHBhZGRpbmc6IDE0cHg7XG5cbiAgICAucHJvZ3Jlc3MtY2FyZHMge1xuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xuICAgICAgZ2FwOiA2cHg7XG5cbiAgICAgIC5wcm9ncmVzcy1jYXJkIHtcbiAgICAgICAgcGFkZGluZzogMTBweDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAud2VpZ2h0LWJhcnMge1xuICAgICAgcGFkZGluZzogMCAxMHB4O1xuXG4gICAgICAud2VpZ2h0LWJhciAuYmFyLXZpc3VhbCB7XG4gICAgICAgIHdpZHRoOiAxLjI1cmVtO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC5wcm9maWxlLW9wdGlvbnMge1xuICAgIHBhZGRpbmc6IDAgMTJweDtcblxuICAgIGlvbi1jYXJkIHtcbiAgICAgIG1hcmdpbjogMC41cmVtIDA7XG5cbiAgICAgIGlvbi1pdGVtIHtcbiAgICAgICAgLS1wYWRkaW5nLXN0YXJ0OiAxNnB4O1xuICAgICAgICAtLXBhZGRpbmctZW5kOiAxNnB4O1xuICAgICAgICAtLW1pbi1oZWlnaHQ6IDU2cHg7XG5cbiAgICAgICAgaDIge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMC45Mzc1cmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgaW9uLWJ1dHRvbnMgaW9uLWJ1dHRvbiBpb24taWNvbiB7XG4gICAgICAgICAgZm9udC1zaXplOiAxLjEyNXJlbTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
}));


/***/ }),

/***/ 92557:
/*!************************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/constants/calculators.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CALCULATORS: () => (/* binding */ CALCULATORS),
/* harmony export */   CALCULATOR_TYPES: () => (/* binding */ CALCULATOR_TYPES),
/* harmony export */   CALCULATOR_VALUES: () => (/* binding */ CALCULATOR_VALUES),
/* harmony export */   evaluateEquation: () => (/* binding */ evaluateEquation)
/* harmony export */ });
var CALCULATOR_TYPES;
(function (CALCULATOR_TYPES) {
  CALCULATOR_TYPES[CALCULATOR_TYPES["rm"] = 0] = "rm";
  CALCULATOR_TYPES[CALCULATOR_TYPES["imc"] = 1] = "imc";
})(CALCULATOR_TYPES || (CALCULATOR_TYPES = {}));
const CALCULATORS = {
  [CALCULATOR_TYPES.rm]: {
    id: CALCULATOR_TYPES.rm,
    name: 'Calculadora RM',
    description: 'El cálculo se fundamenta en el conteo de repeticiones que se pueden hacer al levantar un peso hasta que se llegue al fallo. Si no se superan las 12 repeticiones, esta estimación es bastante precisa y útil. La formula utilizada es la de Brzycki.',
    icon: 'barbell-outline',
    inputs: ['kg', 'reps'],
    equation: 'kg / (1.0278 -(0.0278 * reps))',
    measure: 'KG'
  },
  [CALCULATOR_TYPES.imc]: {
    id: CALCULATOR_TYPES.imc,
    name: 'Calculadora IMC',
    description: 'Útil para evaluar la relación entre el peso y la altura de una persona y determinar si su peso está dentro del rango saludable.',
    icon: 'barbell-outline',
    inputs: ['kg', 'cm'],
    equation: 'kg / ((cm / 100) * (cm / 100))',
    measure: 'IMC'
  }
};
const CALCULATOR_VALUES = Object.values(CALCULATORS);
function evaluateEquation(equation, params) {
  // Reemplazar las variables en la ecuación con los valores de los parámetros
  const formattedEquation = equation.replace(/\b(\w+)\b/g, match => {
    return params[match] !== undefined ? params[match].toString() : match;
  });
  // Evaluar la ecuación de manera segura
  try {
    return Function('"use strict";return (' + formattedEquation + ')')();
  } catch (e) {
    console.error('Error evaluating equation:', e);
    return NaN;
  }
}

/***/ }),

/***/ 57914:
/*!*****************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/constants/info.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   INFO: () => (/* binding */ INFO)
/* harmony export */ });
const INFO = {
  pastAverageWeight: 'Media de tu peso de la semana pasada',
  averageWeight: 'Media semanal de tu peso',
  currentWeight: 'Tu peso registrado para el día de hoy',
  weightDifference: 'Diferencia entre la media de la semana actual y la anterior'
};

/***/ })

}]);
//# sourceMappingURL=src_app_features_profile_profile_module_ts.js.map