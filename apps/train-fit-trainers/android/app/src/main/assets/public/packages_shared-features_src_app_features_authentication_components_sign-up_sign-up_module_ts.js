"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["packages_shared-features_src_app_features_authentication_components_sign-up_sign-up_module_ts"],{

/***/ 34355:
/*!**************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/models/user.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   User: () => (/* binding */ User)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);

class User {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_id", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "name", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "lastname", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "email", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "password", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "roles", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "status", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "height", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "weight", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "birth", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "sex", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "activity", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "objetive", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "steps", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "training", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "stepGoal", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "dietInUse", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "tableInUse", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "workoutInUse", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "diets", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "dayWeights", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "tables", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "access_token", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "hash", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "theme", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "lang", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "provider", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "personalAds", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "premium", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "goalInUse", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "archivedProducts", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "archivedRecipes", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "archivedExercises", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "lastLogin", void 0);
  }
}

/***/ }),

/***/ 48039:
/*!**************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/auth/sign-up-state.service.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignUpStateService: () => (/* binding */ SignUpStateService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 84288);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _SignUpStateService;


class SignUpStateService {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "userSubject", new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(null));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "yearsSubject", new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(null));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "activityTypeSubject", new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(null));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "registerSocialPendingSubject", new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(false));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "socialProviderSubject", new rxjs__WEBPACK_IMPORTED_MODULE_1__.BehaviorSubject(null));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "user$", this.userSubject.asObservable());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "years$", this.yearsSubject.asObservable());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "activityType$", this.activityTypeSubject.asObservable());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "registerSocialPending$", this.registerSocialPendingSubject.asObservable());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "socialProvider$", this.socialProviderSubject.asObservable());
  }
  setSignUpState(user, years, activityType, registerSocialPending, socialProvider = null) {
    this.userSubject.next(user);
    this.yearsSubject.next(years);
    this.activityTypeSubject.next(activityType);
    this.registerSocialPendingSubject.next(registerSocialPending);
    this.socialProviderSubject.next(socialProvider);
  }
  clearState() {
    this.userSubject.next(null);
    this.yearsSubject.next(null);
    this.activityTypeSubject.next(null);
    this.registerSocialPendingSubject.next(false);
    this.socialProviderSubject.next(null);
  }
}
_SignUpStateService = SignUpStateService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SignUpStateService, "\u0275fac", function SignUpStateService_Factory(t) {
  return new (t || _SignUpStateService)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SignUpStateService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _SignUpStateService,
  factory: _SignUpStateService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 98835:
/*!*******************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/authentication/components/sign-up/sign-up-routing.module.ts ***!
  \*******************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignUpPageRoutingModule: () => (/* binding */ SignUpPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _sign_up_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sign-up.page */ 43221);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _SignUpPageRoutingModule;




const routes = [{
  path: '',
  component: _sign_up_page__WEBPACK_IMPORTED_MODULE_1__.SignUpPage
}];
class SignUpPageRoutingModule {}
_SignUpPageRoutingModule = SignUpPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SignUpPageRoutingModule, "\u0275fac", function SignUpPageRoutingModule_Factory(t) {
  return new (t || _SignUpPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SignUpPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _SignUpPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SignUpPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](SignUpPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 32690:
/*!***********************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/authentication/components/sign-up/sign-up.module.ts ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignUpPageModule: () => (/* binding */ SignUpPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _sign_up_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sign-up-routing.module */ 98835);
/* harmony import */ var _sign_up_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sign-up.page */ 43221);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);

var _SignUpPageModule;




class SignUpPageModule {}
_SignUpPageModule = SignUpPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SignUpPageModule, "\u0275fac", function SignUpPageModule_Factory(t) {
  return new (t || _SignUpPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SignUpPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _SignUpPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SignUpPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _sign_up_routing_module__WEBPACK_IMPORTED_MODULE_2__.SignUpPageRoutingModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](SignUpPageModule, {
    declarations: [_sign_up_page__WEBPACK_IMPORTED_MODULE_3__.SignUpPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _sign_up_routing_module__WEBPACK_IMPORTED_MODULE_2__.SignUpPageRoutingModule]
  });
})();

/***/ }),

/***/ 43221:
/*!*********************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/authentication/components/sign-up/sign-up.page.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignUpPage: () => (/* binding */ SignUpPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! rxjs/operators */ 65821);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! rxjs */ 85342);
/* harmony import */ var src_app_core_models_user__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/models/user */ 34355);
/* harmony import */ var src_app_shared_constants_activity_factor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/constants/activity-factor */ 48547);
/* harmony import */ var src_app_shared_constants_links__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/constants/links */ 16505);
/* harmony import */ var src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/constants/objetives */ 49903);
/* harmony import */ var src_app_shared_constants_sex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/constants/sex */ 97664);
/* harmony import */ var src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/constants/steps */ 2923);
/* harmony import */ var _capacitor_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @capacitor/core */ 44599);
/* harmony import */ var src_app_core_validators_password_complexity__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/validators/password-complexity */ 27539);
/* harmony import */ var src_app_shared_constants_training__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/shared/constants/training */ 58163);
/* harmony import */ var src_app_core_validators_email_exist__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/core/validators/email-exist */ 80341);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var src_app_core_validators_matchPasswords__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/core/validators/matchPasswords */ 7286);
/* harmony import */ var src_app_core_services_util_util_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/core/services/util/util.service */ 35400);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @ionic/angular */ 45398);
/* harmony import */ var src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/core/services/util/navigation.service */ 22938);
/* harmony import */ var src_app_core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/core/services/auth/auth.service */ 74048);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_core_services_auth_sign_up_state_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/core/services/auth/sign-up-state.service */ 48039);
/* harmony import */ var src_app_core_services_auth_pending_email_verification_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! src/app/core/services/auth/pending-email-verification.service */ 72);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var src_app_core_i18n_i18n_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! src/app/core/i18n/i18n.service */ 35347);
/* harmony import */ var src_app_core_services_util_notification_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! src/app/core/services/util/notification.service */ 57507);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var src_app_core_directives_decimal_input_directive__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! src/app/core/directives/decimal-input.directive */ 379);
/* harmony import */ var src_app_core_directives_lowercase_email_input_directive__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! src/app/core/directives/lowercase-email-input.directive */ 24436);


var _SignUpPage;
































const _c0 = ["codeInput"];
const _c1 = ["swiperSignUp"];
function SignUpPage_ng_container_6_div_14_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.NAME_REQUIRED"));
  }
}
function SignUpPage_ng_container_6_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](1, SignUpPage_ng_container_6_div_14_span_1_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_0_0 = ctx_r7.signUpForm.get("name")) == null ? null : tmp_0_0.errors == null ? null : tmp_0_0.errors["required"]);
  }
}
function SignUpPage_ng_container_6_div_20_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.LASTNAME_REQUIRED"));
  }
}
function SignUpPage_ng_container_6_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](1, SignUpPage_ng_container_6_div_20_span_1_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_0_0 = ctx_r8.signUpForm.get("lastname")) == null ? null : tmp_0_0.errors == null ? null : tmp_0_0.errors["required"]);
  }
}
function SignUpPage_ng_container_6_ng_template_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "ion-datetime", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("ionChange", function SignUpPage_ng_container_6_ng_template_34_Template_ion_datetime_ionChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r34);
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r33.onDateChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](3, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](4, "ion-icon", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("preferWheel", true)("max", ctx_r9.getMaxDate())("min", ctx_r9.getMinDate())("showDefaultButtons", true)("locale", ctx_r9.locale)("doneText", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](1, 8, "COMMON.CONFIRM"))("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 10, "COMMON.CANCEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](7, 12, "SIGN_UP.BIRTH_DATE"));
  }
}
function SignUpPage_ng_container_6_div_35_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.BIRTH_REQUIRED"));
  }
}
function SignUpPage_ng_container_6_div_35_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.BIRTH_MIN_AGE"));
  }
}
function SignUpPage_ng_container_6_div_35_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.BIRTH_INVALID"));
  }
}
function SignUpPage_ng_container_6_div_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](1, SignUpPage_ng_container_6_div_35_span_1_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](2, SignUpPage_ng_container_6_div_35_span_2_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](3, SignUpPage_ng_container_6_div_35_span_3_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    let tmp_0_0;
    let tmp_1_0;
    let tmp_2_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_0_0 = ctx_r10.signUpForm.get("birth")) == null ? null : tmp_0_0.errors == null ? null : tmp_0_0.errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx_r10.signUpForm.get("birth")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["minAge"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_2_0 = ctx_r10.signUpForm.get("birth")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["maxAge"]);
  }
}
function SignUpPage_ng_container_6_div_49_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.WEIGHT_REQUIRED"));
  }
}
function SignUpPage_ng_container_6_div_49_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.WEIGHT_MIN"));
  }
}
function SignUpPage_ng_container_6_div_49_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.WEIGHT_MAX"));
  }
}
function SignUpPage_ng_container_6_div_49_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](1, SignUpPage_ng_container_6_div_49_span_1_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](2, SignUpPage_ng_container_6_div_49_span_2_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](3, SignUpPage_ng_container_6_div_49_span_3_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    let tmp_0_0;
    let tmp_1_0;
    let tmp_2_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_0_0 = ctx_r11.signUpForm.get("weight")) == null ? null : tmp_0_0.errors == null ? null : tmp_0_0.errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx_r11.signUpForm.get("weight")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["min"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_2_0 = ctx_r11.signUpForm.get("weight")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["max"]);
  }
}
function SignUpPage_ng_container_6_div_63_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.HEIGHT_REQUIRED"));
  }
}
function SignUpPage_ng_container_6_div_63_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.HEIGHT_MIN"));
  }
}
function SignUpPage_ng_container_6_div_63_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.HEIGHT_MAX"));
  }
}
function SignUpPage_ng_container_6_div_63_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](1, SignUpPage_ng_container_6_div_63_span_1_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](2, SignUpPage_ng_container_6_div_63_span_2_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](3, SignUpPage_ng_container_6_div_63_span_3_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    let tmp_0_0;
    let tmp_1_0;
    let tmp_2_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_0_0 = ctx_r12.signUpForm.get("height")) == null ? null : tmp_0_0.errors == null ? null : tmp_0_0.errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx_r12.signUpForm.get("height")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["min"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_2_0 = ctx_r12.signUpForm.get("height")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["max"]);
  }
}
function SignUpPage_ng_container_6_div_86_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.SEX_REQUIRED"));
  }
}
function SignUpPage_ng_container_6_div_86_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](1, SignUpPage_ng_container_6_div_86_span_1_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_0_0 = ctx_r13.signUpForm.get("sex")) == null ? null : tmp_0_0.errors == null ? null : tmp_0_0.errors["required"]);
  }
}
function SignUpPage_ng_container_6_div_96_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ng_container_6_div_96_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r47);
      const stepValue_r45 = restoredCtx.$implicit;
      const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r46.selectSteps(stepValue_r45.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](1, "h3", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const stepValue_r45 = ctx.$implicit;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵclassProp"]("selected", ((tmp_0_0 = ctx_r14.signUpForm.get("steps")) == null ? null : tmp_0_0.value) === stepValue_r45.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](3, 3, stepValue_r45.name));
  }
}
function SignUpPage_ng_container_6_div_97_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 79)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](3, 1, "SIGN_UP.STEPS_REQUIRED"));
  }
}
function SignUpPage_ng_container_6_swiper_slide_98_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r52 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ng_container_6_swiper_slide_98_div_9_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r52);
      const activity_r50 = restoredCtx.$implicit;
      const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r51.selectActivity(activity_r50.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](1, "h3", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](4, "p", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const activity_r50 = ctx.$implicit;
    const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵclassProp"]("selected", ctx_r48.signUpForm.controls.activity.value === activity_r50.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](3, 4, activity_r50.name));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](6, 6, activity_r50.description));
  }
}
function SignUpPage_ng_container_6_swiper_slide_98_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 79)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](3, 1, "SIGN_UP.ACTIVITY_REQUIRED"));
  }
}
const _c2 = function (a0) {
  return {
    "has-error": a0
  };
};
function SignUpPage_ng_container_6_swiper_slide_98_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "swiper-slide")(1, "div", 12)(2, "h2", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](5, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](8, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](9, SignUpPage_ng_container_6_swiper_slide_98_div_9_Template, 7, 8, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](10, SignUpPage_ng_container_6_swiper_slide_98_div_10_Template, 4, 3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    let tmp_2_0;
    let tmp_4_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](4, 5, "SIGN_UP.ACTIVITY_LEVEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](7, 7, "SIGN_UP.ACTIVITY_LEVEL_SUBTITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpureFunction1"](9, _c2, ((tmp_2_0 = ctx_r16.signUpForm.get("activity")) == null ? null : tmp_2_0.invalid) && ((tmp_2_0 = ctx_r16.signUpForm.get("activity")) == null ? null : tmp_2_0.touched)));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngForOf", ctx_r16.ACTIVITY_FACTOR_VALUES);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ((tmp_4_0 = ctx_r16.signUpForm.get("activity")) == null ? null : tmp_4_0.invalid) && ((tmp_4_0 = ctx_r16.signUpForm.get("activity")) == null ? null : tmp_4_0.touched));
  }
}
function SignUpPage_ng_container_6_div_108_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ng_container_6_div_108_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r55);
      const training_r53 = restoredCtx.$implicit;
      const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r54.selectTraining(training_r53.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](1, "h3", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const training_r53 = ctx.$implicit;
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵclassProp"]("selected", ctx_r17.signUpForm.controls.training.value === training_r53.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](3, 3, training_r53.name));
  }
}
function SignUpPage_ng_container_6_div_109_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 79)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](3, 1, "SIGN_UP.TRAINING_REQUIRED"));
  }
}
function SignUpPage_ng_container_6_div_119_p_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "p", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.GOAL_GAIN_DESC"), " ");
  }
}
function SignUpPage_ng_container_6_div_119_p_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "p", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.GOAL_LOSS_DESC"), " ");
  }
}
function SignUpPage_ng_container_6_div_119_p_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "p", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.GOAL_MAINTENANCE_DESC"), " ");
  }
}
function SignUpPage_ng_container_6_div_119_Template(rf, ctx) {
  if (rf & 1) {
    const _r61 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ng_container_6_div_119_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r61);
      const objetive_r56 = restoredCtx.$implicit;
      const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r60.selectObjetive(objetive_r56));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](1, "h3", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](4, SignUpPage_ng_container_6_div_119_p_4_Template, 3, 3, "p", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](5, SignUpPage_ng_container_6_div_119_p_5_Template, 3, 3, "p", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](6, SignUpPage_ng_container_6_div_119_p_6_Template, 3, 3, "p", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const objetive_r56 = ctx.$implicit;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵclassProp"]("selected", ((tmp_0_0 = ctx_r19.signUpForm.get("objetive")) == null ? null : tmp_0_0.value) === objetive_r56.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](3, 6, objetive_r56.name));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", objetive_r56.key === ctx_r19.OBJETIVES[ctx_r19.OBJETIVE_TYPES.gain].key);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", objetive_r56.key === ctx_r19.OBJETIVES[ctx_r19.OBJETIVE_TYPES.loss].key);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", objetive_r56.key === ctx_r19.OBJETIVES[ctx_r19.OBJETIVE_TYPES.maintenance].key);
  }
}
function SignUpPage_ng_container_6_div_120_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 79)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](3, 1, "SIGN_UP.GOAL_REQUIRED"));
  }
}
function SignUpPage_ng_container_6_div_121_Template(rf, ctx) {
  if (rf & 1) {
    const _r63 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 86)(1, "h3", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](4, "span", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](10, "ion-range", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("ionChange", function SignUpPage_ng_container_6_div_121_Template_ion_range_ionChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r63);
      const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r62.changeObjetive($event));
    })("ionKnobMoveStart", function SignUpPage_ng_container_6_div_121_Template_ion_range_ionKnobMoveStart_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r63);
      const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r64.onMove());
    })("ionKnobMoveEnd", function SignUpPage_ng_container_6_div_121_Template_ion_range_ionKnobMoveEnd_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r63);
      const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r65.onStop());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](11, "p", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](14, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](16, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](19, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](20, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](22, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](25, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](26, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](28, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](29, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](30, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](3, 17, "SIGN_UP.SELECT_YOUR"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", ctx_r21.signUpForm.get("objetive").value > 0 ? _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](6, 19, "SIGN_UP.SURPLUS") : _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](7, 21, "SIGN_UP.DEFICIT"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](9, 23, "SIGN_UP.CALORIC"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("min", 50)("max", 500)("value", ctx_r21.objetiveKcal)("pin", true)("step", 50)("ticks", true)("snaps", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](13, 25, "SIGN_UP.THE_MORE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](ctx_r21.signUpForm.controls.objetive.value > 0 ? _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](16, 27, "SIGN_UP.MORE") : _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](17, 29, "SIGN_UP.LESS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](19, 31, "SIGN_UP.KCAL_SELECT"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](ctx_r21.signUpForm.controls.objetive.value > 0 ? _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](22, 33, "SIGN_UP.INCREASE") : _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](23, 35, "SIGN_UP.DECREASE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](25, 37, "SIGN_UP.WILL_BE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate2"]("", ctx_r21.signUpForm.controls.objetive.value > 0 ? _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](28, 39, "SIGN_UP.MORE") : _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](29, 41, "SIGN_UP.LESS"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](30, 43, "SIGN_UP.AGGRESSIVE"), "");
  }
}
function SignUpPage_ng_container_6_swiper_slide_122_div_13_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.EMAIL_REQUIRED"));
  }
}
function SignUpPage_ng_container_6_swiper_slide_122_div_13_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.EMAIL_INVALID"));
  }
}
function SignUpPage_ng_container_6_swiper_slide_122_div_13_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.EMAIL_EXISTS"));
  }
}
function SignUpPage_ng_container_6_swiper_slide_122_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](1, SignUpPage_ng_container_6_swiper_slide_122_div_13_span_1_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](2, SignUpPage_ng_container_6_swiper_slide_122_div_13_span_2_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](3, SignUpPage_ng_container_6_swiper_slide_122_div_13_span_3_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](3);
    let tmp_0_0;
    let tmp_1_0;
    let tmp_2_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_0_0 = ctx_r66.signUpForm.get("email")) == null ? null : tmp_0_0.errors == null ? null : tmp_0_0.errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx_r66.signUpForm.get("email")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["email"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_2_0 = ctx_r66.signUpForm.get("email")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["emailExist"]);
  }
}
function SignUpPage_ng_container_6_swiper_slide_122_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "swiper-slide")(1, "div", 12)(2, "h2", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](5, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](8, "div", 15)(9, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](10, "ion-icon", 92)(11, "input", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](13, SignUpPage_ng_container_6_swiper_slide_122_div_13_Template, 4, 3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    let tmp_2_0;
    let tmp_4_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](4, 5, "SIGN_UP.YOUR_EMAIL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](7, 7, "SIGN_UP.EMAIL_SUBTITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpureFunction1"](11, _c2, ((tmp_2_0 = ctx_r22.signUpForm.get("email")) == null ? null : tmp_2_0.invalid) && (((tmp_2_0 = ctx_r22.signUpForm.get("email")) == null ? null : tmp_2_0.touched) || ((tmp_2_0 = ctx_r22.signUpForm.get("email")) == null ? null : tmp_2_0.dirty))));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](12, 9, "SIGN_UP.EMAIL_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ((tmp_4_0 = ctx_r22.signUpForm.get("email")) == null ? null : tmp_4_0.invalid) && (((tmp_4_0 = ctx_r22.signUpForm.get("email")) == null ? null : tmp_4_0.touched) || ((tmp_4_0 = ctx_r22.signUpForm.get("email")) == null ? null : tmp_4_0.dirty)));
  }
}
function SignUpPage_ng_container_6_swiper_slide_123_div_15_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.PASS_REQUIRED"));
  }
}
function SignUpPage_ng_container_6_swiper_slide_123_div_15_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.PASS_LENGTH"));
  }
}
function SignUpPage_ng_container_6_swiper_slide_123_div_15_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.PASS_UPPERCASE"));
  }
}
function SignUpPage_ng_container_6_swiper_slide_123_div_15_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.PASS_LOWERCASE"));
  }
}
function SignUpPage_ng_container_6_swiper_slide_123_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](1, SignUpPage_ng_container_6_swiper_slide_123_div_15_span_1_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](2, SignUpPage_ng_container_6_swiper_slide_123_div_15_span_2_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](3, SignUpPage_ng_container_6_swiper_slide_123_div_15_span_3_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](4, SignUpPage_ng_container_6_swiper_slide_123_div_15_span_4_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r70 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](3);
    let tmp_0_0;
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_0_0 = ctx_r70.signUpForm.get("password")) == null ? null : tmp_0_0.errors == null ? null : tmp_0_0.errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx_r70.signUpForm.get("password")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["length"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_2_0 = ctx_r70.signUpForm.get("password")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["uppercase"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_3_0 = ctx_r70.signUpForm.get("password")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["lowercase"]);
  }
}
function SignUpPage_ng_container_6_swiper_slide_123_div_23_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.PASS_CONFIRM"), " ");
  }
}
function SignUpPage_ng_container_6_swiper_slide_123_div_23_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.PASS_LENGTH"));
  }
}
function SignUpPage_ng_container_6_swiper_slide_123_div_23_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.PASS_UPPERCASE"));
  }
}
function SignUpPage_ng_container_6_swiper_slide_123_div_23_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.PASS_LOWERCASE"));
  }
}
function SignUpPage_ng_container_6_swiper_slide_123_div_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](1, SignUpPage_ng_container_6_swiper_slide_123_div_23_span_1_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](2, SignUpPage_ng_container_6_swiper_slide_123_div_23_span_2_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](3, SignUpPage_ng_container_6_swiper_slide_123_div_23_span_3_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](4, SignUpPage_ng_container_6_swiper_slide_123_div_23_span_4_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r71 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](3);
    let tmp_0_0;
    let tmp_1_0;
    let tmp_2_0;
    let tmp_3_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_0_0 = ctx_r71.signUpForm.get("passwordRep")) == null ? null : tmp_0_0.errors == null ? null : tmp_0_0.errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx_r71.signUpForm.get("passwordRep")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["length"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_2_0 = ctx_r71.signUpForm.get("passwordRep")) == null ? null : tmp_2_0.errors == null ? null : tmp_2_0.errors["uppercase"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (tmp_3_0 = ctx_r71.signUpForm.get("passwordRep")) == null ? null : tmp_3_0.errors == null ? null : tmp_3_0.errors["lowercase"]);
  }
}
function SignUpPage_ng_container_6_swiper_slide_123_div_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 79)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](3, 1, "SIGN_UP.PASS_NOT_MATCH"));
  }
}
function SignUpPage_ng_container_6_swiper_slide_123_Template(rf, ctx) {
  if (rf & 1) {
    const _r82 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "swiper-slide")(1, "div", 12)(2, "h2", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](5, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](8, "div", 15)(9, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](10, "ion-icon", 94)(11, "input", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](13, "ion-button", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ng_container_6_swiper_slide_123_Template_ion_button_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r82);
      const ctx_r81 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r81.showPass = !ctx_r81.showPass);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](14, "ion-icon", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](15, SignUpPage_ng_container_6_swiper_slide_123_div_15_Template, 5, 4, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](16, "div", 15)(17, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](18, "ion-icon", 94)(19, "input", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](21, "ion-button", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ng_container_6_swiper_slide_123_Template_ion_button_click_21_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r82);
      const ctx_r83 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r83.showPassRep = !ctx_r83.showPassRep);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](22, "ion-icon", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](23, SignUpPage_ng_container_6_swiper_slide_123_div_23_Template, 5, 4, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](24, SignUpPage_ng_container_6_swiper_slide_123_div_24_Template, 4, 3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    let tmp_5_0;
    let tmp_9_0;
    let tmp_10_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](4, 11, "SIGN_UP.PASSWORD"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](7, 13, "SIGN_UP.PASSWORD_SUBTITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("type", ctx_r23.showPass ? "text" : "password")("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](12, 15, "SIGN_UP.PASSWORD_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("name", ctx_r23.showPass ? "eye-off-outline" : "eye-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ((tmp_5_0 = ctx_r23.signUpForm.get("password")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r23.signUpForm.get("password")) == null ? null : tmp_5_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("type", ctx_r23.showPassRep ? "text" : "password")("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](20, 17, "SIGN_UP.PASSWORD_REPEAT_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("name", ctx_r23.showPassRep ? "eye-off-outline" : "eye-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ((tmp_9_0 = ctx_r23.signUpForm.get("passwordRep")) == null ? null : tmp_9_0.invalid) && ((tmp_9_0 = ctx_r23.signUpForm.get("passwordRep")) == null ? null : tmp_9_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", (((tmp_10_0 = ctx_r23.signUpForm.get("password")) == null ? null : tmp_10_0.touched) || ((tmp_10_0 = ctx_r23.signUpForm.get("passwordRep")) == null ? null : tmp_10_0.touched)) && (ctx_r23.signUpForm.errors == null ? null : ctx_r23.signUpForm.errors["notSame"]));
  }
}
const _c3 = function () {
  return {
    standalone: true
  };
};
function SignUpPage_ng_container_6_ng_container_144_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r88 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](1, "div", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](2, "div", 100)(3, "span", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](6, "ion-select", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("ngModelChange", function SignUpPage_ng_container_6_ng_container_144_ng_container_18_Template_ion_select_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r88);
      const ctx_r87 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r87.notifWeekday = $event);
    })("ionChange", function SignUpPage_ng_container_6_ng_container_144_ng_container_18_Template_ion_select_ionChange_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r88);
      const ctx_r89 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r89.onNotifSettingsChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](9, "ion-select-option", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](12, "ion-select-option", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](15, "ion-select-option", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](18, "ion-select-option", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](21, "ion-select-option", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](24, "ion-select-option", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](26, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](27, "ion-select-option", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](29, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r84 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](5, 19, "NOTIFICATIONS.DAY_OF_WEEK"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpropertyInterpolate"]("okText", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](7, 21, "COMMON.OK"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](8, 23, "COMMON.CANCEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngModel", ctx_r84.notifWeekday)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpureFunction0"](39, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("value", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](11, 25, "NOTIFICATIONS.SUNDAY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("value", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](14, 27, "NOTIFICATIONS.MONDAY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("value", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](17, 29, "NOTIFICATIONS.TUESDAY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("value", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](20, 31, "NOTIFICATIONS.WEDNESDAY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("value", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](23, 33, "NOTIFICATIONS.THURSDAY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("value", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](26, 35, "NOTIFICATIONS.FRIDAY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("value", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](29, 37, "NOTIFICATIONS.SATURDAY"));
  }
}
const _c4 = function (a0) {
  return {
    days: a0
  };
};
function SignUpPage_ng_container_6_ng_container_144_ng_container_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r91 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](1, "div", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](2, "div", 100)(3, "span", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](6, "div", 110)(7, "ion-button", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ng_container_6_ng_container_144_ng_container_19_Template_ion_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r91);
      const ctx_r90 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r90.changeNotifInterval(-1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](8, "ion-icon", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](9, "span", 113);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](11, "ion-button", 111);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ng_container_6_ng_container_144_ng_container_19_Template_ion_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r91);
      const ctx_r92 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r92.changeNotifInterval(1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](12, "ion-icon", 114);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r85 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind2"](5, 2, "NOTIFICATIONS.EVERY_X_DAYS", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpureFunction1"](5, _c4, ctx_r85.notifIntervalDays)));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](ctx_r85.notifIntervalDays);
  }
}
function SignUpPage_ng_container_6_ng_container_144_ng_template_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r94 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "ion-datetime", 115);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("ngModelChange", function SignUpPage_ng_container_6_ng_container_144_ng_template_30_Template_ion_datetime_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r94);
      const ctx_r93 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r93.notifTime = $event);
    })("ionChange", function SignUpPage_ng_container_6_ng_container_144_ng_template_30_Template_ion_datetime_ionChange_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r94);
      const ctx_r95 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r95.onNotifSettingsChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](3, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](4, "ion-icon", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r86 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("preferWheel", true)("locale", ctx_r86.locale)("showDefaultButtons", true)("doneText", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](1, 7, "COMMON.OK"))("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 9, "COMMON.CANCEL"))("ngModel", ctx_r86.notifTime);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](7, 11, "NOTIFICATIONS.TIME"));
  }
}
function SignUpPage_ng_container_6_ng_container_144_Template(rf, ctx) {
  if (rf & 1) {
    const _r97 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](1, "div", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](2, "div", 100)(3, "span", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](6, "ion-select", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("ngModelChange", function SignUpPage_ng_container_6_ng_container_144_Template_ion_select_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r97);
      const ctx_r96 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r96.notifFrequency = $event);
    })("ionChange", function SignUpPage_ng_container_6_ng_container_144_Template_ion_select_ionChange_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r97);
      const ctx_r98 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r98.onNotifSettingsChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](9, "ion-select-option", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](12, "ion-select-option", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](15, "ion-select-option", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](18, SignUpPage_ng_container_6_ng_container_144_ng_container_18_Template, 30, 40, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](19, SignUpPage_ng_container_6_ng_container_144_ng_container_19_Template, 13, 7, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](20, "div", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](21, "div", 100)(22, "span", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](24, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](25, "div", 106);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](26, "ion-icon", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](27, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](29, "ion-modal", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("willPresent", function SignUpPage_ng_container_6_ng_container_144_Template_ion_modal_willPresent_29_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r97);
      const ctx_r99 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r99.isTimeModalOpen = true);
    })("willDismiss", function SignUpPage_ng_container_6_ng_container_144_Template_ion_modal_willDismiss_29_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r97);
      const ctx_r100 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r100.isTimeModalOpen = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](30, SignUpPage_ng_container_6_ng_container_144_ng_template_30_Template, 8, 13, "ng-template");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](5, 14, "NOTIFICATIONS.FREQUENCY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpropertyInterpolate"]("okText", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](7, 16, "COMMON.OK"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](8, 18, "COMMON.CANCEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngModel", ctx_r24.notifFrequency)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpureFunction0"](28, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](11, 20, "NOTIFICATIONS.DAILY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](14, 22, "NOTIFICATIONS.WEEKLY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](17, 24, "NOTIFICATIONS.CUSTOM_INTERVAL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ctx_r24.notifFrequency === "weekly");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ctx_r24.notifFrequency === "interval");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](24, 26, "NOTIFICATIONS.TIME"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](ctx_r24.getNotifTimeDisplay());
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("keepContentsMounted", true)("showBackdrop", true);
  }
}
function SignUpPage_ng_container_6_div_163_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 79)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](3, 1, "SIGN_UP.TERMS_REQUIRED"));
  }
}
function SignUpPage_ng_container_6_div_173_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 79)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](3, 1, "SIGN_UP.PRIVACY_REQUIRED"));
  }
}
function SignUpPage_ng_container_6_ion_button_175_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "ion-button", 116)(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("disabled", ctx_r27.signUpForm.invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](3, 2, "SIGN_UP.VIEW_SHEET"));
  }
}
function SignUpPage_ng_container_6_div_176_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](1, "ion-icon", 118);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](2, "span", 119);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](4, 1, ctx_r28.error));
  }
}
function SignUpPage_ng_container_6_div_219_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 120)(1, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](2, "ion-icon", 121);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](3, "span", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](6, "div", 122)(7, "div", 123);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](5, 2, "SIGN_UP.ACTIVITY_LEVEL_TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](9, 4, ctx_r29.activityType.name), " ");
  }
}
function SignUpPage_ng_container_6_div_234_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "div", 124)(1, "div", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](2, "ion-icon", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](3, "div", 127)(4, "h5", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](7, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](6, 2, "SIGN_UP.WARNING"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](9, 4, "SIGN_UP.VERIFICATION_EMAIL_WARNING"));
  }
}
function SignUpPage_ng_container_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r102 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](1, "swiper-slide")(2, "div", 12)(3, "h2", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](6, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](9, "div", 15)(10, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](11, "ion-icon", 17)(12, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](14, SignUpPage_ng_container_6_div_14_Template, 2, 1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](15, "div", 15)(16, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](17, "ion-icon", 20)(18, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](19, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](20, SignUpPage_ng_container_6_div_20_Template, 2, 1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](21, "swiper-slide")(22, "div", 12)(23, "h2", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](25, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](26, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](28, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](29, "div", 15)(30, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](31, "ion-icon", 23)(32, "ion-datetime-button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](33, "ion-modal", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("willPresent", function SignUpPage_ng_container_6_Template_ion_modal_willPresent_33_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r102);
      const ctx_r101 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r101.isDateModalOpen = true);
    })("willDismiss", function SignUpPage_ng_container_6_Template_ion_modal_willDismiss_33_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r102);
      const ctx_r103 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r103.isDateModalOpen = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](34, SignUpPage_ng_container_6_ng_template_34_Template, 8, 14, "ng-template");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](35, SignUpPage_ng_container_6_div_35_Template, 4, 3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](36, "swiper-slide")(37, "div", 12)(38, "h2", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](39);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](40, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](41, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](42);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](43, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](44, "div", 15)(45, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](46, "ion-icon", 26)(47, "input", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](48, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](49, SignUpPage_ng_container_6_div_49_Template, 4, 3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](50, "swiper-slide")(51, "div", 12)(52, "h2", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](53);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](54, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](55, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](56);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](57, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](58, "div", 15)(59, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](60, "ion-icon", 28)(61, "input", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](62, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](63, SignUpPage_ng_container_6_div_63_Template, 4, 3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](64, "swiper-slide")(65, "div", 12)(66, "h2", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](67);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](68, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](69, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](70);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](71, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](72, "div", 30)(73, "div", 31)(74, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](75, "input", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](76, "label", 34)(77, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](78);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](79, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](80, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](81, "input", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](82, "label", 36)(83, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](84);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](85, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](86, SignUpPage_ng_container_6_div_86_Template, 2, 1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](87, "swiper-slide")(88, "div", 12)(89, "h2", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](90);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](91, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](92, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](93);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](94, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](95, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](96, SignUpPage_ng_container_6_div_96_Template, 4, 5, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](97, SignUpPage_ng_container_6_div_97_Template, 4, 3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](98, SignUpPage_ng_container_6_swiper_slide_98_Template, 11, 11, "swiper-slide", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](99, "swiper-slide")(100, "div", 12)(101, "h2", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](102);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](103, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](104, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](105);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](106, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](107, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](108, SignUpPage_ng_container_6_div_108_Template, 4, 5, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](109, SignUpPage_ng_container_6_div_109_Template, 4, 3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](110, "swiper-slide")(111, "div", 12)(112, "h2", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](113);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](114, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](115, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](116);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](117, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](118, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](119, SignUpPage_ng_container_6_div_119_Template, 7, 8, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](120, SignUpPage_ng_container_6_div_120_Template, 4, 3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](121, SignUpPage_ng_container_6_div_121_Template, 31, 45, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](122, SignUpPage_ng_container_6_swiper_slide_122_Template, 14, 13, "swiper-slide", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](123, SignUpPage_ng_container_6_swiper_slide_123_Template, 25, 19, "swiper-slide", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](124, "swiper-slide")(125, "div", 12)(126, "h2", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](127);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](128, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](129, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](130);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](131, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](132, "div", 40)(133, "div", 41)(134, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](135, "ion-icon", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](136, "div")(137, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](138);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](139, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](140, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](141);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](142, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](143, "ion-toggle", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("ngModelChange", function SignUpPage_ng_container_6_Template_ion_toggle_ngModelChange_143_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r102);
      const ctx_r104 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r104.notifEnabled = $event);
    })("ionChange", function SignUpPage_ng_container_6_Template_ion_toggle_ionChange_143_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r102);
      const ctx_r105 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r105.onNotifToggle());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](144, SignUpPage_ng_container_6_ng_container_144_Template, 31, 29, "ng-container", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](145, "swiper-slide")(146, "div", 12)(147, "h2", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](148);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](149, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](150, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](151);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](152, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](153, "div", 47)(154, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ng_container_6_Template_div_click_154_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r102);
      const ctx_r106 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r106.toggleControl("termsAndConditions"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](155, "ion-checkbox", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ng_container_6_Template_ion_checkbox_click_155_listener($event) {
      return $event.stopPropagation();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](156, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](157);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](158, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](159, "a", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ng_container_6_Template_a_click_159_listener($event) {
      return $event.stopPropagation();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](160);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](161, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](162, "ion-icon", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](163, SignUpPage_ng_container_6_div_163_Template, 4, 3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](164, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ng_container_6_Template_div_click_164_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r102);
      const ctx_r109 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r109.toggleControl("policyAndPrivacy"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](165, "ion-checkbox", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ng_container_6_Template_ion_checkbox_click_165_listener($event) {
      return $event.stopPropagation();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](166, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](167);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](168, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](169, "a", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ng_container_6_Template_a_click_169_listener($event) {
      return $event.stopPropagation();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](170);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](171, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](172, "ion-icon", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](173, SignUpPage_ng_container_6_div_173_Template, 4, 3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](174, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](175, SignUpPage_ng_container_6_ion_button_175_Template, 4, 4, "ion-button", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](176, SignUpPage_ng_container_6_div_176_Template, 5, 3, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](177, "swiper-slide")(178, "div", 58)(179, "h2", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](180);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](181, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](182, "div", 59)(183, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](184, "ion-icon", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](185, "span", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](186);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](187, "div", 63)(188, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](189, "ion-icon", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](190, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](191);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](192, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](193);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](194, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](195, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](196, "ion-icon", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](197, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](198);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](199, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](200);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](201, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](202, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](203, "ion-icon", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](204, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](205);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](206, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](207, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](208);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](209, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](210, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](211, "ion-icon", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](212, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](213);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](214, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](215, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](216, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](217);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](218, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](219, SignUpPage_ng_container_6_div_219_Template, 10, 6, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](220, "div", 72)(221, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](222, "ion-icon", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](223, "span", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](224);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](225, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](226, "div", 74)(227, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](228);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](229, "div", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](230);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](231, "span", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](232);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](233, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](234, SignUpPage_ng_container_6_div_234_Template, 10, 6, "div", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"]();
    let tmp_3_0;
    let tmp_5_0;
    let tmp_8_0;
    let tmp_10_0;
    let tmp_14_0;
    let tmp_19_0;
    let tmp_22_0;
    let tmp_27_0;
    let tmp_30_0;
    let tmp_32_0;
    let tmp_36_0;
    let tmp_38_0;
    let tmp_41_0;
    let tmp_43_0;
    let tmp_56_0;
    let tmp_60_0;
    let tmp_61_0;
    let tmp_65_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](5, 86, "SIGN_UP.TELL_US_ABOUT_YOU"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](8, 88, "SIGN_UP.START_WITH_BASICS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](13, 90, "SIGN_UP.NAME_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ((tmp_3_0 = ctx_r1.signUpForm.get("name")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r1.signUpForm.get("name")) == null ? null : tmp_3_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](19, 92, "SIGN_UP.LASTNAME_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ((tmp_5_0 = ctx_r1.signUpForm.get("lastname")) == null ? null : tmp_5_0.invalid) && ((tmp_5_0 = ctx_r1.signUpForm.get("lastname")) == null ? null : tmp_5_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](25, 94, "SIGN_UP.BIRTH_DATE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](28, 96, "SIGN_UP.SELECT_BIRTH_DATE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpureFunction1"](170, _c2, ((tmp_8_0 = ctx_r1.signUpForm.get("birth")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx_r1.signUpForm.get("birth")) == null ? null : tmp_8_0.touched)));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("keepContentsMounted", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ((tmp_10_0 = ctx_r1.signUpForm.get("birth")) == null ? null : tmp_10_0.invalid) && ((tmp_10_0 = ctx_r1.signUpForm.get("birth")) == null ? null : tmp_10_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](40, 98, "SIGN_UP.YOUR_WEIGHT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](43, 100, "SIGN_UP.WEIGHT_SUBTITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](48, 102, "SIGN_UP.WEIGHT_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ((tmp_14_0 = ctx_r1.signUpForm.get("weight")) == null ? null : tmp_14_0.invalid) && ((tmp_14_0 = ctx_r1.signUpForm.get("weight")) == null ? null : tmp_14_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](54, 104, "SIGN_UP.YOUR_HEIGHT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](57, 106, "SIGN_UP.HEIGHT_SUBTITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](62, 108, "SIGN_UP.HEIGHT_PLACEHOLDER"))("maxDecimals", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ((tmp_19_0 = ctx_r1.signUpForm.get("height")) == null ? null : tmp_19_0.invalid) && ((tmp_19_0 = ctx_r1.signUpForm.get("height")) == null ? null : tmp_19_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](68, 110, "SIGN_UP.SEX"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](71, 112, "SIGN_UP.SEX_SUBTITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpureFunction1"](172, _c2, ((tmp_22_0 = ctx_r1.signUpForm.get("sex")) == null ? null : tmp_22_0.invalid) && ((tmp_22_0 = ctx_r1.signUpForm.get("sex")) == null ? null : tmp_22_0.touched)));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("value", ctx_r1.SEX_TYPES.male);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](79, 114, "SIGN_UP.MALE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("value", ctx_r1.SEX_TYPES.female);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](85, 116, "SIGN_UP.FEMALE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ((tmp_27_0 = ctx_r1.signUpForm.get("sex")) == null ? null : tmp_27_0.invalid) && ((tmp_27_0 = ctx_r1.signUpForm.get("sex")) == null ? null : tmp_27_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](91, 118, "SIGN_UP.DAILY_ACTIVITY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](94, 120, "SIGN_UP.DAILY_ACTIVITY_SUBTITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpureFunction1"](174, _c2, ((tmp_30_0 = ctx_r1.signUpForm.get("steps")) == null ? null : tmp_30_0.invalid) && ((tmp_30_0 = ctx_r1.signUpForm.get("steps")) == null ? null : tmp_30_0.touched)));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngForOf", ctx_r1.STEPS_VALUES);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ((tmp_32_0 = ctx_r1.signUpForm.get("steps")) == null ? null : tmp_32_0.invalid) && ((tmp_32_0 = ctx_r1.signUpForm.get("steps")) == null ? null : tmp_32_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ctx_r1.signUpForm.controls.steps.value && ctx_r1.signUpForm.controls.steps.value === ctx_r1.STEPS[ctx_r1.STEPS_TYPES.notCounted].value);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](103, 122, "SIGN_UP.TRAINING_DAYS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](106, 124, "SIGN_UP.TRAINING_DAYS_SUBTITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpureFunction1"](176, _c2, ((tmp_36_0 = ctx_r1.signUpForm.get("training")) == null ? null : tmp_36_0.invalid) && ((tmp_36_0 = ctx_r1.signUpForm.get("training")) == null ? null : tmp_36_0.touched)));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngForOf", ctx_r1.TRAINING_TYPE_VALUES);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ((tmp_38_0 = ctx_r1.signUpForm.get("training")) == null ? null : tmp_38_0.invalid) && ((tmp_38_0 = ctx_r1.signUpForm.get("training")) == null ? null : tmp_38_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](114, 126, "SIGN_UP.WHAT_IS_YOUR_GOAL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](117, 128, "SIGN_UP.SELECT_MAIN_GOAL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpureFunction1"](178, _c2, ((tmp_41_0 = ctx_r1.signUpForm.get("objetive")) == null ? null : tmp_41_0.invalid) && ((tmp_41_0 = ctx_r1.signUpForm.get("objetive")) == null ? null : tmp_41_0.touched)));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngForOf", ctx_r1.OBJETIVES_VALUES);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ((tmp_43_0 = ctx_r1.signUpForm.get("objetive")) == null ? null : tmp_43_0.invalid) && ((tmp_43_0 = ctx_r1.signUpForm.get("objetive")) == null ? null : tmp_43_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ctx_r1.signUpForm.get("objetive").value && ctx_r1.signUpForm.get("objetive").value !== 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ctx_r1.registerSocialPending);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ctx_r1.registerSocialPending);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](128, 130, "SIGN_UP.NOTIF_TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](131, 132, "SIGN_UP.NOTIF_SUBTITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](139, 134, "NOTIFICATIONS.WEIGHT_REMINDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](142, 136, "NOTIFICATIONS.WEIGHT_REMINDER_DESC"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngModel", ctx_r1.notifEnabled)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpureFunction0"](180, _c3));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ctx_r1.notifEnabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](149, 138, "SIGN_UP.FINISH_REGISTRATION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](152, 140, "SIGN_UP.ACCEPT_TERMS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpureFunction1"](181, _c2, ((tmp_56_0 = ctx_r1.signUpForm.get("termsAndConditions")) == null ? null : tmp_56_0.invalid) && ((tmp_56_0 = ctx_r1.signUpForm.get("termsAndConditions")) == null ? null : tmp_56_0.touched)));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](158, 142, "SIGN_UP.I_ACCEPT"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("href", ctx_r1.LINKS.termsAndConditions, _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](161, 144, "SIGN_UP.TERMS_AND_CONDITIONS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ((tmp_60_0 = ctx_r1.signUpForm.get("termsAndConditions")) == null ? null : tmp_60_0.invalid) && ((tmp_60_0 = ctx_r1.signUpForm.get("termsAndConditions")) == null ? null : tmp_60_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpureFunction1"](183, _c2, ((tmp_61_0 = ctx_r1.signUpForm.get("policyAndPrivacy")) == null ? null : tmp_61_0.invalid) && ((tmp_61_0 = ctx_r1.signUpForm.get("policyAndPrivacy")) == null ? null : tmp_61_0.touched)));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](168, 146, "SIGN_UP.I_HAVE_READ"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("href", ctx_r1.LINKS.privacyAndPolicy, _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](171, 148, "SIGN_UP.PRIVACY_POLICY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ((tmp_65_0 = ctx_r1.signUpForm.get("policyAndPrivacy")) == null ? null : tmp_65_0.invalid) && ((tmp_65_0 = ctx_r1.signUpForm.get("policyAndPrivacy")) == null ? null : tmp_65_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", !ctx_r1.isLastDataSlide);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ctx_r1.signUpForm.invalid && ctx_r1.error);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](181, 150, "SIGN_UP.WELCOME_SHEET"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate2"]("", ctx_r1.name, " ", ctx_r1.lastname, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"]("", ctx_r1.weight, " kg");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](194, 152, "SIGN_UP.WEIGHT_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"]("", ctx_r1.height, " cm");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](201, 154, "SIGN_UP.HEIGHT_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate2"]("", ctx_r1.years, " ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](206, 156, "SIGN_UP.YEARS"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](209, 158, "SIGN_UP.AGE_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", ctx_r1.sex === ctx_r1.SEX_TYPES.male ? _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](214, 160, "SIGN_UP.MALE_SHORT") : _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](215, 162, "SIGN_UP.FEMALE_SHORT"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](218, 164, "SIGN_UP.SEX_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ctx_r1.activityType);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](225, 166, "SIGN_UP.DAILY_GOAL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", ctx_r1.objetiveMessage, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", ctx_r1.kcalTotal, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](233, 168, "SIGN_UP.KCAL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ctx_r1.registerSocialPending);
  }
}
function SignUpPage_swiper_slide_7_span_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](2, 1, "SIGN_UP.VERIFY_CODE_BUTTON"));
  }
}
function SignUpPage_swiper_slide_7_ion_spinner_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](0, "ion-spinner", 142);
  }
}
function SignUpPage_swiper_slide_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r116 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "swiper-slide")(1, "div", 128)(2, "h2", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](5, "p", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](8, "div", 129)(9, "div", 130)(10, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](13, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](15, "p", 131);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](16, "ion-icon", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](17, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](19, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](20, "div", 132)(21, "div", 133)(22, "div", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](23, "ion-icon", 135);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](24, "input", 136, 137);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("input", function SignUpPage_swiper_slide_7_Template_input_input_24_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r116);
      const ctx_r115 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r115.onCodeInputChange($event));
    })("keydown.enter", function SignUpPage_swiper_slide_7_Template_input_keydown_enter_24_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r116);
      const ctx_r117 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r117.verifyCode());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](26, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](27, "ion-button", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_swiper_slide_7_Template_ion_button_click_27_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r116);
      const ctx_r118 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r118.verifyCode());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](28, SignUpPage_swiper_slide_7_span_28_Template, 3, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](29, SignUpPage_swiper_slide_7_ion_spinner_29_Template, 1, 0, "ion-spinner", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](30, "div", 140)(31, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](32);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](33, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](34, "ion-button", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_swiper_slide_7_Template_ion_button_click_34_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r116);
      const ctx_r119 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r119.resendCode());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](36, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](37, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"]();
    let tmp_3_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](4, 12, "SIGN_UP.VERIFY_ACCOUNT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](7, 14, "SIGN_UP.VERIFY_SUBTITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](12, 16, "SIGN_UP.VERIFY_MESSAGE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](ctx_r2.verifyEmailOnly ? ctx_r2.user.email : (tmp_3_0 = ctx_r2.signUpForm.get("email")) == null ? null : tmp_3_0.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](19, 18, "SIGN_UP.SPAM_WARNING"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](26, 20, "SIGN_UP.CODE_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("disabled", ctx_r2.isProcessing);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", !ctx_r2.isProcessing);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ctx_r2.isProcessing);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](33, 22, "SIGN_UP.NO_CODE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("disabled", ctx_r2.isProcessing || ctx_r2.resendDisabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", ctx_r2.resendDisabled ? _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](36, 24, "SIGN_UP.RESEND_IN") + " " + ctx_r2.resendCountdown + "s" : _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](37, 26, "SIGN_UP.RESEND_CODE"), " ");
  }
}
function SignUpPage_ion_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r121 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "ion-button", 143);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ion_button_10_Template_ion_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r121);
      const ctx_r120 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r120.exitRegistration());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](1, "ion-icon", 144);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](3, 1, "SIGN_UP.EXIT"), " ");
  }
}
function SignUpPage_ion_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r123 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "ion-button", 145);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ion_button_11_Template_ion_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r123);
      const ctx_r122 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r122.prevSlide());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](1, "ion-icon", 146);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](3, 1, "SIGN_UP.PREVIOUS"), " ");
  }
}
function SignUpPage_ion_button_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r125 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "ion-button", 147);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ion_button_12_Template_ion_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r125);
      const ctx_r124 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r124.nextSlide());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](4, "ion-icon", 148);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](3, 1, "SIGN_UP.NEXT"));
  }
}
function SignUpPage_ion_button_13_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "span")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵpipeBind1"](3, 1, "SIGN_UP.FINALIZE"));
  }
}
function SignUpPage_ion_button_13_ion_spinner_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](0, "ion-spinner", 142);
  }
}
function SignUpPage_ion_button_13_ion_icon_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](0, "ion-icon", 151);
  }
}
function SignUpPage_ion_button_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r130 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](0, "ion-button", 149);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("click", function SignUpPage_ion_button_13_Template_ion_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵrestoreView"](_r130);
      const ctx_r129 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵresetView"](ctx_r129.register());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](1, SignUpPage_ion_button_13_span_1_Template, 4, 3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](2, SignUpPage_ion_button_13_ion_spinner_2_Template, 1, 0, "ion-spinner", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](3, SignUpPage_ion_button_13_ion_icon_3_Template, 1, 0, "ion-icon", 150);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("disabled", ctx_r6.isProcessing);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", !ctx_r6.isProcessing);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ctx_r6.isProcessing);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", !ctx_r6.isProcessing);
  }
}
class SignUpPage {
  get locale() {
    return this.i18nService.current === 'en' ? 'en-US' : 'es-ES';
  }
  constructor(userService, matchPasswords, utilService, ionicUtilService, platform, navigationService, authService, router, signUpStateService, pendingEmailVerificationService, translate, i18nService, notificationService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "userService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "matchPasswords", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "utilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "platform", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "navigationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "authService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "signUpStateService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "pendingEmailVerificationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "translate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "i18nService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "notificationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "codeInput", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dateModal", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isDateModalOpen", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "swiperSignUpRef", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "swiper", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "signUpForm", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "name", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "lastname", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "steps", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "weight", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "height", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "birth", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "sex", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "showPass", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "showPassRep", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "notBegining", 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isEnding", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "user", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dateValue", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "objetiveKcal", 200);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "currentSlide", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "existPrev", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "existNext", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "registerSocialPending", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "error", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "backButton$", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "destroy$", new rxjs__WEBPACK_IMPORTED_MODULE_25__.Subject());
    // Data Sheet & Registration variables
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isProcessing", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "verifyEmailOnly", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "codeSended", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "resendDisabled", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "resendCountdown", 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "resendInterval", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "objetiveMessage", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "kcalTotal", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "years", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "RESEND_COOLDOWN_SECONDS", 60);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "objetiveSelected", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "OBJETIVE_TYPES", src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_5__.OBJETIVE_TYPES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "OBJETIVES", src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_5__.OBJETIVES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "OBJETIVES_VALUES", src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_5__.OBJETIVES_VALUES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "SEX", src_app_shared_constants_sex__WEBPACK_IMPORTED_MODULE_6__.SEX);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "SEX_TYPES", src_app_shared_constants_sex__WEBPACK_IMPORTED_MODULE_6__.SEX_TYPES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ACTIVITY_FACTOR_VALUES", src_app_shared_constants_activity_factor__WEBPACK_IMPORTED_MODULE_3__.ACTIVITY_FACTOR_VALUES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ACTIVITY_FACTOR", src_app_shared_constants_activity_factor__WEBPACK_IMPORTED_MODULE_3__.ACTIVITY_FACTOR);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "STEPS_TYPES", src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_7__.STEPS_TYPES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "STEPS", src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_7__.STEPS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "STEPS_VALUES", src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_7__.STEPS_VALUES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "TRAINING_TYPE_VALUES", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "LINKS", src_app_shared_constants_links__WEBPACK_IMPORTED_MODULE_4__.LINKS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "notifEnabled", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "notifFrequency", 'daily');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "notifWeekday", 1);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "notifIntervalDays", 2);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "notifTime", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isTimeModalOpen", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "notifPermissionAttempted", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "MIN_SIGN_UP_AGE", 13);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "MAX_SIGN_UP_AGE", 120);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_defaultBirthDate", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_maxDate", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_minDate", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "socialProvider", null);
    this.userService = userService;
    this.matchPasswords = matchPasswords;
    this.utilService = utilService;
    this.ionicUtilService = ionicUtilService;
    this.platform = platform;
    this.navigationService = navigationService;
    this.authService = authService;
    this.router = router;
    this.signUpStateService = signUpStateService;
    this.pendingEmailVerificationService = pendingEmailVerificationService;
    this.translate = translate;
    this.i18nService = i18nService;
    this.notificationService = notificationService;
    // Determinar tipo de registro
    const localUser = this.userService.getLocalUser;
    const navigation = this.router.getCurrentNavigation();
    const navigationData = navigation?.extras?.state?.data;
    const pendingVerification = this.pendingEmailVerificationService.get();
    const fromSignIn = !!navigationData?.fromSignIn;
    const verificationEmail = navigationData?.email ?? pendingVerification?.email ?? null;
    this.verifyEmailOnly = !!navigationData?.verifyEmailOnly || !!pendingVerification;
    if (this.verifyEmailOnly) {
      if (!this.user) {
        this.user = new src_app_core_models_user__WEBPACK_IMPORTED_MODULE_2__.User();
      }
      this.user.email = verificationEmail;
      this.codeSended = true;
      if (verificationEmail && !pendingVerification) {
        this.pendingEmailVerificationService.markCodeSent(verificationEmail);
      }
      this.restoreResendCooldown(pendingVerification);
    }
    // Si NO hay usuario local o viene de Sign In, es registro tradicional (con email/pass)
    this.registerSocialPending = !localUser || fromSignIn;
    // Determinar si es social
    if (localUser && !this.isUserRegistrationComplete(localUser)) {
      // Es un social login pendiente de completar datos
      this.socialProvider = localUser.provider === 'apple' ? 'apple' : 'google';
    }
  }
  /**
   * Verifica si el usuario completó todos los datos de registro
   */
  isUserRegistrationComplete(user) {
    return !!(user?.name && user?.lastname && user?.weight && user?.height);
  }
  // Renombrando para mayor claridad interna si se desea, pero mantengo compatibilidad
  get isSocialRegistration() {
    return !this.registerSocialPending;
  }
  get activityType() {
    return this.userService.getActivityFactor(this.signUpForm.controls.activity.value);
  }
  ngOnInit() {
    this.initVariables();
    this.initForm();
    // this.setActivityType();
    this.initializeBackButtonCustomHandler();
    this.signUpForm.valueChanges.subscribe(res => {
      this.error = this.utilService.handleErrors(this.signUpForm);
      this.name = res.name;
      this.lastname = res.lastname;
      this.steps = res.steps;
      this.weight = res.weight;
      this.height = res.height;
      this.dateValue = this.userService.getAge(new Date(res.birth));
      this.birth = this.dateValue;
      this.sex = res.sex;
    });
    this.signUpForm.get('steps').valueChanges.subscribe(() => {
      if (this.steps !== src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_7__.STEPS[src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_7__.STEPS_TYPES.notCounted].id) {
        this.signUpForm.controls.activity.setValue(null, {
          emitEvent: false
        });
        setTimeout(() => this.swiperReady());
      }
    });
  }
  ngAfterViewInit() {
    // TODO: lamentable que se tenga que cargar con un delay
    setTimeout(() => this.swiperReady());
  }
  ionViewWillLeave() {
    this.backButton$?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
    if (this.resendInterval) clearInterval(this.resendInterval);
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.resendInterval) clearInterval(this.resendInterval);
  }
  initVariables() {
    this.existNext = true;
    this.updateTrainingOptions();
    const date = new Date();
    date.setHours(9, 0, 0, 0);
    this.notifTime = date.toISOString();
  }
  initForm() {
    this.signUpForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormGroup({
      name: new _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.required),
      lastname: new _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.required),
      weight: new _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.min(30), _angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.max(300)])),
      height: new _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.min(70), _angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.max(300)])),
      birth: new _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormControl(this.getDefaultBirthDate(), _angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.required, this.birthDateAgeRangeValidator()])),
      steps: new _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.required),
      objetive: new _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.required),
      sex: new _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.required),
      activity: new _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormControl(null),
      training: new _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.required),
      email: new _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormControl(null),
      password: new _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormControl(null),
      passwordRep: new _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormControl(null),
      termsAndConditions: new _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.requiredTrue),
      policyAndPrivacy: new _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.requiredTrue)
    }, {
      validators: this.matchPasswords.matchPassword
    });
    // this.signUpForm.controls.activity.valueChanges.subscribe(() =>
    //   this.activityType
    // );
    this.signUpForm.controls.steps.valueChanges.subscribe(selectedStep => {
      this.signUpForm.controls.training.setValue(null);
      if (selectedStep === src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_7__.STEPS[src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_7__.STEPS_TYPES.notCounted].value) this.signUpForm.controls.activity.setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.required);else {
        this.signUpForm.controls.activity.clearValidators();
        this.signUpForm.controls.activity.setValue(null);
      }
      this.signUpForm.controls.activity.updateValueAndValidity();
      this.updateTrainingOptions(selectedStep);
    });
    if (this.registerSocialPending) {
      this.signUpForm.get('email')?.setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.email]));
      this.signUpForm.get('email')?.setAsyncValidators(src_app_core_validators_email_exist__WEBPACK_IMPORTED_MODULE_11__.EmailExistValidator.createValidator(this.userService));
      this.signUpForm.get('password')?.setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.required, src_app_core_validators_password_complexity__WEBPACK_IMPORTED_MODULE_9__.PasswordComplexity.basicComplexity()]));
      this.signUpForm.get('passwordRep')?.setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_26__.Validators.required, src_app_core_validators_password_complexity__WEBPACK_IMPORTED_MODULE_9__.PasswordComplexity.basicComplexity()]));
      // Es importante llamar a updateValueAndValidity() para aplicar los cambios
      this.signUpForm.get('email')?.updateValueAndValidity();
      this.signUpForm.get('password')?.updateValueAndValidity();
      this.signUpForm.get('passwordRep')?.updateValueAndValidity();
    }
  }
  selectObjetive(objetive) {
    if (this.objetiveSelected?.id !== objetive.id) {
      this.objetiveKcal = 200; // resetear al cambiar de objetivo
    }

    this.objetiveSelected = objetive;
    this.signUpForm.get('objetive')?.setValue(objetive.value);
  }
  selectSteps(stepValue) {
    this.signUpForm.get('steps')?.setValue(stepValue);
  }
  selectActivity(value) {
    this.signUpForm.controls.activity.setValue(value);
  }
  selectTraining(value) {
    this.signUpForm.controls.training.setValue(value);
  }
  toggleControl(controlName) {
    const control = this.signUpForm.get(controlName);
    if (!control) return;
    const current = !!control.value;
    control.setValue(!current);
    control.markAsTouched();
    control.updateValueAndValidity({
      onlySelf: true
    });
  }
  updateTrainingOptions(selectedStep) {
    // Si no hay un paso seleccionado, usar un valor por defecto
    const stepValue = selectedStep || src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_7__.STEPS[src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_7__.STEPS_TYPES.between2000And6000].value;
    const trainingValues = (0,src_app_shared_constants_training__WEBPACK_IMPORTED_MODULE_10__.calculateTrainingValues)(stepValue);
    if (trainingValues) Object.assign(this.TRAINING_TYPE_VALUES, Object.values(trainingValues));
  }
  swiperReady() {
    const swiperEl = Object.assign(this.swiperSignUpRef?.nativeElement, {
      allowTouchMove: false
    });
    swiperEl.initialize();
    this.swiper = this.swiperSignUpRef?.nativeElement.swiper;
    this.swiper.on('slideChange', () => {
      this.checkNextAndPrev();
      this.checkNotificationSlide();
    });
    setTimeout(() => this.checkNotificationSlide(), 300);
  }
  checkNextAndPrev() {
    const swiper = this.swiperSignUpRef.nativeElement.swiper;
    const activeIndex = swiper.activeIndex;
    this.currentSlide = activeIndex;
    this.existNext = activeIndex < swiper.slides.length - 1 && !this.codeSended;
    this.existPrev = activeIndex > 0 && !this.codeSended;
  }
  get isLastDataSlide() {
    if (!this.swiper) return false;
    const slides = this.getPresentSlidesControls();
    // El slide de la ficha es el penúltimo si hay verificación, o el último si no hay
    const sheetIndex = this.registerSocialPending ? slides.length - 2 : slides.length - 1;
    return this.swiper.activeIndex >= sheetIndex;
  }
  get isLastFormSlide() {
    if (!this.swiper) return false;
    const slides = this.getPresentSlidesControls();
    const formIndex = this.registerSocialPending ? slides.length - 3 : slides.length - 2;
    return this.swiper.activeIndex === formIndex;
  }
  customFormatter(value) {
    return `${value} h`;
  }
  nextSlide() {
    const swiper = this.swiperSignUpRef.nativeElement.swiper;
    const activeIndex = swiper.activeIndex;
    const controls = this.getControlsForSlideIndex(activeIndex);
    let isValid = true;
    let pendingControl = null;
    for (const controlName of controls) {
      const control = this.signUpForm.get(controlName);
      if (!control) continue;
      control.markAsTouched();
      const hasAsyncValidator = !!control.asyncValidator;
      if (!hasAsyncValidator) {
        control.updateValueAndValidity({
          onlySelf: true
        });
      }
      if (control.pending) pendingControl = control;
      if (control.invalid) isValid = false;
    }
    // Si hay una validación asíncrona pendiente (como email), esperar a que finalice
    if (pendingControl) {
      const sub = pendingControl.statusChanges.subscribe(status => {
        if (status !== 'PENDING') {
          sub.unsubscribe();
          pendingControl.markAsTouched();
          if (pendingControl.invalid) return;
          this.nextSlide();
        }
      });
      return;
    }
    if (!isValid) return;
    swiper.slideNext();
  }
  prevSlide() {
    this.swiperSignUpRef.nativeElement.swiper.slidePrev();
  }
  onNotifToggle() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.notifEnabled) {
        const granted = yield _this.requestNotifPermission();
        if (!granted) {
          _this.notifEnabled = false;
          return;
        }
      }
      yield _this.saveNotifSettings();
    })();
  }
  onNotifSettingsChange() {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this2.saveNotifSettings();
    })();
  }
  changeNotifInterval(delta) {
    const newVal = this.notifIntervalDays + delta;
    if (newVal >= 1 && newVal <= 60) {
      this.notifIntervalDays = newVal;
      void this.saveNotifSettings();
    }
  }
  getNotifTimeDisplay() {
    if (!this.notifTime) return '--:--';
    const date = new Date(this.notifTime);
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }
  checkNotificationSlide() {
    if (this.notifPermissionAttempted || this.verifyEmailOnly || !this.swiper) return;
    const slides = this.getPresentSlidesControls();
    const termsIndex = slides.findIndex(s => Array.isArray(s) && s.includes('termsAndConditions') && s.includes('policyAndPrivacy'));
    const notifIndex = termsIndex - 1;
    if (this.swiper.activeIndex === notifIndex) {
      this.notifPermissionAttempted = true;
      void this.requestNotifPermission();
    }
  }
  requestNotifPermission() {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_capacitor_core__WEBPACK_IMPORTED_MODULE_8__.Capacitor.isNativePlatform()) return false;
      try {
        const granted = yield _this3.notificationService.requestPermissions();
        if (!granted) {
          _this3.ionicUtilService.showToast({
            message: _this3.translate.instant('NOTIFICATIONS.PERMISSION_DENIED'),
            duration: 2000,
            color: 'warning'
          });
          return false;
        }
        _this3.notifEnabled = true;
        if (!_this3.notifTime) {
          const date = new Date();
          date.setHours(9, 0, 0, 0);
          _this3.notifTime = date.toISOString();
        }
        yield _this3.saveNotifSettings();
        return true;
      } catch {
        return false;
      }
    })();
  }
  saveNotifSettings() {
    var _this4 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this4.notifTime) {
        const date = new Date();
        date.setHours(9, 0, 0, 0);
        _this4.notifTime = date.toISOString();
      }
      const timeDate = new Date(_this4.notifTime);
      yield _this4.notificationService.saveAndSchedule({
        enabled: _this4.notifEnabled,
        hour: timeDate.getHours(),
        minute: timeDate.getMinutes(),
        frequency: _this4.notifFrequency,
        weekday: _this4.notifFrequency === 'weekly' ? _this4.notifWeekday : undefined,
        intervalDays: _this4.notifFrequency === 'interval' ? _this4.notifIntervalDays : undefined
      });
    })();
  }
  exitRegistration() {
    this.showExitConfirm();
  }
  register() {
    if (this.signUpForm.invalid) return;
    this.isProcessing = true;
    this.kcalTotal = this.userService.calculateKcal(this.user);
    if (this.registerSocialPending) {
      // Registro tradicional (email/password)
      this.userService.createUser(this.user, new Date()).subscribe({
        next: resUser => {
          this.user = resUser;
          this.user.email = this.user.email || this.signUpForm.get('email')?.value;
          this.pendingEmailVerificationService.start(this.user.email);
          this.codeSended = true;
          this.mailToast();
          this.startResendCooldown();
          this.isProcessing = false;
          // Avanzar al slide de verificación
          setTimeout(() => {
            this.swiper.slideNext();
          }, 100);
        },
        error: err => {
          this.isProcessing = false;
          this.ionicUtilService.showErrorToast(err?.error?.message || this.translate.instant('SIGN_UP.REGISTER_ERROR'), this.translate.instant('COMMON.ERROR'), 3000);
        }
      });
    } else {
      // Registro social (Google/Apple) - Actualizar perfil existente
      this.user.email = this.userService.getLocalUser.email;
      this.signUpStateService.socialProvider$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_27__.take)(1)).subscribe(provider => {
        const updateObs = provider === 'apple' ? this.userService.updateAppleUser(this.user) : this.userService.updateGoogleUser(this.user);
        updateObs.subscribe({
          next: res => {
            const finish = () => {
              if (res?.user) {
                this.userService.setLocalUser = res.user;
                this.authService.setUser = res.user;
              }
              this.navigationService.goToUserLoader();
              this.isProcessing = false;
            };
            if (res?.access_token) {
              this.authService.applyAuthResponse(res).subscribe({
                next: finish,
                error: err => {
                  this.isProcessing = false;
                  this.ionicUtilService.showErrorToast(err, this.translate.instant('SIGN_UP.SESSION_SAVE_ERROR'), 3000);
                }
              });
              return;
            }
            finish();
          },
          error: err => {
            this.isProcessing = false;
            this.ionicUtilService.showErrorToast(err?.error?.message || this.translate.instant('SIGN_UP.SOCIAL_REGISTER_ERROR'), this.translate.instant('COMMON.ERROR'), 3000);
          }
        });
      });
    }
  }
  // Cubre tanto tecleo como pegado (paste dispara 'input' igual que teclear):
  // el código solo puede contener dígitos, máximo 6, tanto si el usuario
  // escribe letras como si pega el texto completo del email.
  onCodeInputChange(event) {
    const input = event.target;
    const digitsOnly = input.value.replace(/\D/g, '').slice(0, 6);
    if (input.value !== digitsOnly) {
      input.value = digitsOnly;
    }
  }
  verifyCode() {
    const code = this.codeInput.nativeElement.value.toString().trim().replace(/\D/g, '');
    if (!code) {
      this.ionicUtilService.showToast({
        message: this.translate.instant('SIGN_UP.ENTER_CODE'),
        duration: 3000
      });
      return;
    }
    if (!this.user?.email) {
      this.pendingEmailVerificationService.clear();
      this.ionicUtilService.showToast({
        message: this.translate.instant('SIGN_UP.RECOVER_EMAIL_ERROR'),
        duration: 3000
      });
      this.navigationService.goToLoginPage();
      return;
    }
    this.isProcessing = true;
    this.userService.activateAccount(this.user.email, code).subscribe({
      next: response => {
        this.ionicUtilService.showToast({
          message: this.translate.instant('SIGN_UP.ACCOUNT_ACTIVATED'),
          duration: 3000
        });
        if (response?.access_token) {
          this.authService.applyAuthResponse(response).subscribe({
            next: () => this.navigationService.goToUserLoader(),
            error: err => {
              this.ionicUtilService.showErrorToast(err, this.translate.instant('SIGN_UP.SESSION_SAVE_ERROR'), 3000);
            }
          });
        } else {
          this.pendingEmailVerificationService.clear();
          this.navigationService.goToLoginPage();
        }
        this.isProcessing = false;
      },
      error: err => {
        this.ionicUtilService.showToast({
          message: err?.error?.message || this.translate.instant('SIGN_UP.INCORRECT_CODE'),
          duration: 3000
        });
        this.isProcessing = false;
      }
    });
  }
  resendCode() {
    if (!this.user?.email || this.resendDisabled) return;
    this.isProcessing = true;
    this.userService.resendActivationCode(this.user.email).subscribe({
      next: () => {
        this.pendingEmailVerificationService.markCodeSent(this.user.email);
        this.codeInput.nativeElement.value = '';
        this.startResendCooldown();
        this.ionicUtilService.showToast({
          message: this.translate.instant('SIGN_UP.CODE_RESENT'),
          duration: 3000
        });
        this.isProcessing = false;
      },
      error: err => {
        this.ionicUtilService.showToast({
          message: err?.error?.message || this.translate.instant('SIGN_UP.RESEND_CODE_ERROR'),
          duration: 3000
        });
        this.isProcessing = false;
      }
    });
  }
  startResendCooldown(seconds = this.RESEND_COOLDOWN_SECONDS) {
    if (this.resendInterval) clearInterval(this.resendInterval);
    if (seconds <= 0) {
      this.resendDisabled = false;
      this.resendCountdown = 0;
      return;
    }
    this.resendDisabled = true;
    this.resendCountdown = seconds;
    this.resendInterval = setInterval(() => {
      this.resendCountdown--;
      if (this.resendCountdown <= 0) {
        this.resendDisabled = false;
        clearInterval(this.resendInterval);
      }
    }, 1000);
  }
  restoreResendCooldown(pendingVerification) {
    if (!pendingVerification?.codeSentAt) {
      return;
    }
    const sentAt = new Date(pendingVerification.codeSentAt).getTime();
    if (Number.isNaN(sentAt)) {
      return;
    }
    const elapsedSeconds = Math.floor((Date.now() - sentAt) / 1000);
    this.startResendCooldown(this.RESEND_COOLDOWN_SECONDS - elapsedSeconds);
  }
  mailToast() {
    const toast = {
      message: this.translate.instant('SIGN_UP.CODE_SENT_TO_EMAIL'),
      duration: 7000
    };
    this.ionicUtilService.showToast(toast);
  }
  getAge(birth) {
    if (!birth) return 0;
    return this.userService.getAge(new Date(birth));
  }
  onDateChange(event) {
    const selectedDate = event.detail.value;
    if (selectedDate) {
      this.signUpForm.get('birth')?.setValue(selectedDate);
      this.signUpForm.get('birth')?.markAsTouched();
    }
  }
  getMaxDate() {
    if (!this._maxDate) {
      const maxDate = this.getTodayDateOnly();
      maxDate.setFullYear(maxDate.getFullYear() - this.MIN_SIGN_UP_AGE);
      maxDate.setMonth(11, 31);
      this._maxDate = maxDate.toISOString();
    }
    return this._maxDate;
  }
  getMinDate() {
    if (!this._minDate) {
      const minDate = this.getTodayDateOnly();
      minDate.setFullYear(minDate.getFullYear() - this.MAX_SIGN_UP_AGE);
      minDate.setMonth(0, 1);
      this._minDate = minDate.toISOString();
    }
    return this._minDate;
  }
  getDefaultBirthDate() {
    if (!this._defaultBirthDate) {
      const defaultBirthDate = this.getTodayDateOnly();
      defaultBirthDate.setFullYear(defaultBirthDate.getFullYear() - this.MIN_SIGN_UP_AGE);
      this._defaultBirthDate = defaultBirthDate.toISOString();
    }
    return this._defaultBirthDate;
  }
  birthDateAgeRangeValidator() {
    return control => {
      if (!control.value) {
        return null;
      }
      const birthDate = this.toDateOnly(control.value);
      if (!birthDate) {
        return {
          invalidDate: true
        };
      }
      const youngestAllowedBirthDate = this.getTodayDateOnly();
      youngestAllowedBirthDate.setFullYear(youngestAllowedBirthDate.getFullYear() - this.MIN_SIGN_UP_AGE);
      if (birthDate > youngestAllowedBirthDate) {
        return {
          minAge: true
        };
      }
      const oldestAllowedBirthDate = this.getTodayDateOnly();
      oldestAllowedBirthDate.setFullYear(oldestAllowedBirthDate.getFullYear() - this.MAX_SIGN_UP_AGE);
      if (birthDate < oldestAllowedBirthDate) {
        return {
          maxAge: true
        };
      }
      return null;
    };
  }
  getTodayDateOnly() {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }
  toDateOnly(value) {
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) {
      return null;
    }
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  getControlsForSlideIndex(index) {
    const slides = this.getPresentSlidesControls();
    return slides[index] ?? [];
  }
  getPresentSlidesControls() {
    if (this.verifyEmailOnly) {
      return [[]]; // Solo hay un slide de verificación
    }

    const slides = [['name', 'lastname'], ['birth'], ['weight'], ['height'], ['sex'], ['steps']];
    if (this.signUpForm.controls.steps.value && this.signUpForm.controls.steps.value === src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_7__.STEPS[src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_7__.STEPS_TYPES.notCounted].value) {
      slides.push(['activity']);
    }
    slides.push(['training']);
    slides.push(['objetive']);
    if (this.registerSocialPending) {
      slides.push(['email']);
      slides.push(['password', 'passwordRep']);
    }
    slides.push([]); // Notificaciones
    slides.push(['termsAndConditions', 'policyAndPrivacy']);
    slides.push([]); // Ficha de datos
    if (this.registerSocialPending) {
      slides.push([]); // Verificación
    }

    return slides;
  }
  showSheet() {
    if (this.verifyEmailOnly || this.codeSended) {
      this.verifyCode();
      return;
    }
    if (this.signUpForm.invalid) return;
    if (!this.objetiveSelected) return;
    const activity = this.signUpForm.controls.activity.value ? this.signUpForm.controls.activity.value : 1;
    const finalKcal = this.objetiveSelected.id === this.OBJETIVE_TYPES.gain ? Math.abs(this.objetiveKcal) : this.objetiveSelected.id === this.OBJETIVE_TYPES.loss ? -Math.abs(this.objetiveKcal) : 0;
    this.user = {
      ...this.signUpForm.value,
      activity: activity,
      objetive: finalKcal,
      lang: this.i18nService.current
    };
    if (this.user.objetive > 0) this.objetiveMessage = this.translate.instant('SIGN_UP.CALORIC_SURPLUS');else if (this.user.objetive < 0) this.objetiveMessage = this.translate.instant('SIGN_UP.CALORIC_DEFICIT');else this.objetiveMessage = this.translate.instant('SIGN_UP.MAINTENANCE');
    this.years = this.dateValue;
    this.kcalTotal = this.userService.calculateKcal(this.user);
    // Avanzar al slide de la ficha
    this.swiper.slideNext();
  }
  calculateBirh(date) {
    this.dateValue = this.userService.getAge(new Date(date));
  }
  // public setActivityType(): void {
  //   for (const type of ACTIVITY_FACTOR_VALUES) {
  //     if (
  //       ACTIVITY_FACTOR[type.id].value ===
  //       this.signUpForm.controls.activity.value
  //     )
  //       this.activityType = type;
  //   }
  // }
  changeObjetive(event) {
    const objetive = this.utilService.getEventNumber(event);
    this.objetiveKcal = Number(objetive);
  }
  onMove() {
    this.swiper.disable();
  }
  onStop() {
    this.swiper.enable();
  }
  initializeBackButtonCustomHandler() {
    var _this5 = this;
    this.backButton$ = this.platform.backButton.subscribeWithPriority(9999, /*#__PURE__*/(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this5.isDateModalOpen) {
        yield _this5.dateModal.dismiss();
        return;
      }
      _this5.showExitConfirm();
    }));
  }
  showExitConfirm() {
    const alertOptions = {
      header: this.translate.instant('COMMON.BACK'),
      message: this.translate.instant('COMMON.LOSE_PROGRESS'),
      buttons: [{
        text: this.translate.instant('COMMON.CANCEL').toUpperCase(),
        role: 'cancel'
      }, {
        text: this.translate.instant('COMMON.CONFIRM').toUpperCase(),
        cssClass: 'alert-button-primary',
        handler: () => {
          this.pendingEmailVerificationService.clear();
          if (this.authService.isAuthenticated() || this.authService.hasStoredAccessToken()) {
            this.authService.logout();
          } else {
            this.navigationService.goToLoginPage();
          }
          this.backButton$?.unsubscribe();
        }
      }]
    };
    this.ionicUtilService.showAlert(alertOptions);
  }
}
_SignUpPage = SignUpPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(SignUpPage, "\u0275fac", function SignUpPage_Factory(t) {
  return new (t || _SignUpPage)(_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdirectiveInject"](src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_12__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdirectiveInject"](src_app_core_validators_matchPasswords__WEBPACK_IMPORTED_MODULE_13__.MatchPasswords), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdirectiveInject"](src_app_core_services_util_util_service__WEBPACK_IMPORTED_MODULE_14__.UtilService), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_15__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_28__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdirectiveInject"](src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_16__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdirectiveInject"](src_app_core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_17__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_29__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdirectiveInject"](src_app_core_services_auth_sign_up_state_service__WEBPACK_IMPORTED_MODULE_18__.SignUpStateService), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdirectiveInject"](src_app_core_services_auth_pending_email_verification_service__WEBPACK_IMPORTED_MODULE_19__.PendingEmailVerificationService), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_30__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdirectiveInject"](src_app_core_i18n_i18n_service__WEBPACK_IMPORTED_MODULE_20__.I18nService), _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdirectiveInject"](src_app_core_services_util_notification_service__WEBPACK_IMPORTED_MODULE_21__.NotificationService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(SignUpPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵdefineComponent"]({
  type: _SignUpPage,
  selectors: [["app-sign-up"]],
  viewQuery: function SignUpPage_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵviewQuery"](_c0, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonModal, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵviewQuery"](_c1, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵloadQuery"]()) && (ctx.codeInput = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵloadQuery"]()) && (ctx.dateModal = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵloadQuery"]()) && (ctx.swiperSignUpRef = _t.first);
    }
  },
  decls: 14,
  vars: 9,
  consts: [["fullscreen", "", "scroll-y", "false", 1, "auth-content"], [1, "auth-container"], [1, "signup-form", 3, "formGroup", "ngSubmit"], ["pagination", "true", "pagination-type", "progressbar", "init", "false"], ["swiperSignUp", ""], [4, "ngIf"], [1, "signup-footer"], [1, "footer-buttons"], ["class", "nav-button prev exit-btn", "fill", "outline", 3, "click", 4, "ngIf"], ["class", "nav-button prev", "fill", "outline", 3, "click", 4, "ngIf"], ["class", "nav-button next", 3, "click", 4, "ngIf"], ["class", "nav-button next finalize-btn", 3, "disabled", "click", 4, "ngIf"], [1, "form-section"], [1, "section-title"], [1, "section-subtitle"], [1, "input-group"], [1, "input-wrapper"], ["name", "person-outline", 1, "input-icon"], ["type", "text", "id", "name", "formControlName", "name", "required", "", 1, "input-field", 3, "placeholder"], ["class", "validation-error", 4, "ngIf"], ["name", "people-outline", 1, "input-icon"], ["type", "text", "id", "lastname", "formControlName", "lastname", "required", "", 1, "input-field", 3, "placeholder"], [1, "input-wrapper", 3, "ngClass"], ["name", "calendar-outline", 1, "input-icon"], ["datetime", "birthdate", 1, "input-field"], [1, "datetime-modal", "birthdate-datetime-modal", 3, "keepContentsMounted", "willPresent", "willDismiss"], ["name", "fitness-outline", 1, "input-icon"], ["type", "text", "inputmode", "decimal", "id", "weight", "formControlName", "weight", "step", "0.1", "maxlength", "6", "required", "", "appDecimalInput", "", 1, "input-field", 3, "placeholder"], ["name", "resize-outline", 1, "input-icon"], ["type", "text", "inputmode", "numeric", "id", "height", "formControlName", "height", "maxlength", "3", "required", "", "appDecimalInput", "", 1, "input-field", 3, "placeholder", "maxDecimals"], [1, "choice-group"], [1, "gender-options", 3, "ngClass"], [1, "gender-option"], ["type", "radio", "id", "male", "formControlName", "sex", 3, "value"], ["for", "male"], ["type", "radio", "id", "female", "formControlName", "sex", 3, "value"], ["for", "female"], [1, "selection-options", 3, "ngClass"], ["class", "selection-option", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["class", "calorie-selector", 4, "ngIf"], [1, "signup-notif-card"], [1, "signup-notif-row"], [1, "signup-notif-info"], ["name", "scale-outline", 1, "signup-notif-icon"], [1, "signup-notif-label"], [1, "signup-notif-desc"], [3, "ngModel", "ngModelOptions", "ngModelChange", "ionChange"], [1, "checkbox-section"], [1, "checkbox-item", 3, "ngClass", "click"], ["formControlName", "termsAndConditions", "mode", "ios", 1, "modern-checkbox", 3, "click"], [1, "checkbox-label"], [1, "checkbox-link", 3, "href", "click"], ["name", "document-text-outline", "color", "primary", 1, "checkbox-icon"], ["formControlName", "policyAndPrivacy", "mode", "ios", 1, "modern-checkbox", 3, "click"], ["name", "shield-checkmark-outline", "color", "primary", 1, "checkbox-icon"], [1, "submit-button-container"], ["type", "submit", "expand", "block", "class", "submit-button", 3, "disabled", 4, "ngIf"], ["class", "error-message", 4, "ngIf"], [1, "form-section", "compact-section"], [1, "stats-card-modern"], [1, "card-header-modern"], ["name", "person-circle-outline"], [1, "card-title-modern"], [1, "stats-grid-modern"], [1, "stat-item-modern"], ["name", "fitness-outline"], [1, "stat-value-modern"], [1, "stat-label-modern"], ["name", "resize-outline"], ["name", "calendar-outline"], ["name", "person-outline"], ["class", "info-card-modern", 4, "ngIf"], [1, "info-card-modern", "objective-card-modern"], ["name", "rocket-outline"], [1, "card-content-modern", "objective-content-modern"], [1, "objective-message-modern"], [1, "calories-modern"], [1, "unit-modern"], ["class", "info-card-modern warning-card-modern", 4, "ngIf"], [1, "validation-error"], ["id", "birthdate", "mode", "ios", "formControlName", "birth", "presentation", "date", 3, "preferWheel", "max", "min", "showDefaultButtons", "locale", "doneText", "cancelText", "ionChange"], ["slot", "title", 1, "datetime-title"], [1, "selection-option", 3, "click"], [1, "selection-title"], [1, "selection-desc"], ["class", "selection-desc", 4, "ngIf"], [1, "calorie-selector"], [1, "calorie-title"], [1, "calorie-type"], ["mode", "ios", 1, "ion-margin", "ion-padding", 3, "min", "max", "value", "pin", "step", "ticks", "snaps", "ionChange", "ionKnobMoveStart", "ionKnobMoveEnd"], [1, "calorie-description"], [1, "highlight"], ["name", "mail-outline", 1, "input-icon"], ["type", "email", "autocapitalize", "none", "autocorrect", "off", "spellcheck", "false", "formControlName", "email", "appLowercaseEmailInput", "", 1, "input-field", 3, "placeholder"], ["name", "lock-closed-outline", 1, "input-icon"], ["formControlName", "password", 1, "input-field", 3, "type", "placeholder"], ["fill", "clear", "type", "button", 1, "password-toggle", 3, "click"], [3, "name"], ["formControlName", "passwordRep", 1, "input-field", 3, "type", "placeholder"], [1, "signup-notif-divider"], [1, "signup-notif-option"], [1, "signup-notif-option-label"], ["interface", "popover", 3, "ngModel", "ngModelOptions", "okText", "cancelText", "ngModelChange", "ionChange"], ["value", "daily"], ["value", "weekly"], ["value", "interval"], ["id", "signup-notif-time-trigger", 1, "signup-time-display"], ["name", "time-outline"], ["trigger", "signup-notif-time-trigger", 1, "time-datetime-modal", 3, "keepContentsMounted", "showBackdrop", "willPresent", "willDismiss"], [3, "value"], [1, "signup-notif-stepper"], ["fill", "clear", "size", "small", 3, "click"], ["name", "remove-outline"], [1, "signup-stepper-value"], ["name", "add-outline"], ["id", "signup-notif-datetime", "mode", "ios", "presentation", "time", 3, "preferWheel", "locale", "showDefaultButtons", "doneText", "cancelText", "ngModel", "ngModelChange", "ionChange"], ["type", "submit", "expand", "block", 1, "submit-button", 3, "disabled"], [1, "error-message"], ["color", "danger", "name", "alert-circle-outline"], [1, "error-text"], [1, "info-card-modern"], ["name", "flash-outline"], [1, "card-content-modern"], [1, "activity-name-modern"], [1, "info-card-modern", "warning-card-modern"], [1, "warning-content-modern"], ["name", "alert-circle-outline"], [1, "warning-text-modern"], [1, "form-section", "verification-section"], [1, "verification-wrapper-modern"], [1, "verification-message-modern"], [1, "spam-warning-modern"], [1, "form-fields-modern"], [1, "input-group-modern"], [1, "input-wrapper-modern", "verification-input-modern"], ["name", "shield-checkmark-outline", 1, "input-icon-modern"], ["type", "text", "inputmode", "numeric", "autocomplete", "one-time-code", "pattern", "[0-9]*", "maxlength", "6", 1, "input-field-modern", "verification-field-modern", 3, "placeholder", "input", "keydown.enter"], ["codeInput", ""], ["expand", "block", 1, "verify-button-modern", 3, "disabled", "click"], ["name", "dots", 4, "ngIf"], [1, "resend-container-modern"], ["fill", "clear", "size", "small", 3, "disabled", "click"], ["name", "dots"], ["fill", "outline", 1, "nav-button", "prev", "exit-btn", 3, "click"], ["name", "exit-outline", "slot", "start"], ["fill", "outline", 1, "nav-button", "prev", 3, "click"], ["name", "arrow-back-outline", "slot", "start"], [1, "nav-button", "next", 3, "click"], ["name", "arrow-forward-outline", "slot", "end"], [1, "nav-button", "next", "finalize-btn", 3, "disabled", "click"], ["name", "checkmark-circle-outline", "slot", "end", 4, "ngIf"], ["name", "checkmark-circle-outline", "slot", "end"]],
  template: function SignUpPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelement"](0, "ion-header");
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](1, "ion-content", 0)(2, "div", 1)(3, "form", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵlistener"]("ngSubmit", function SignUpPage_Template_form_ngSubmit_3_listener() {
        return ctx.showSheet();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](4, "swiper-container", 3, 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](6, SignUpPage_ng_container_6_Template, 235, 185, "ng-container", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](7, SignUpPage_swiper_slide_7_Template, 38, 28, "swiper-slide", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementStart"](8, "ion-footer", 6)(9, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](10, SignUpPage_ion_button_10_Template, 4, 3, "ion-button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](11, SignUpPage_ion_button_11_Template, 4, 3, "ion-button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](12, SignUpPage_ion_button_12_Template, 5, 3, "ion-button", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵtemplate"](13, SignUpPage_ion_button_13_Template, 4, 4, "ion-button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("formGroup", ctx.signUpForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", !ctx.verifyEmailOnly);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ctx.verifyEmailOnly || ctx.registerSocialPending && ctx.codeSended);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵclassProp"]("is-last-slide", ctx.isLastDataSlide);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", !ctx.existPrev);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ctx.existPrev);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ctx.existNext && !ctx.isLastDataSlide && !ctx.isLastFormSlide && !ctx.verifyEmailOnly);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_24__["ɵɵproperty"]("ngIf", ctx.isLastDataSlide && !ctx.codeSended);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_32__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_32__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_32__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_26__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_26__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.RadioControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormControlName, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonCheckbox, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonDatetime, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonDatetimeButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonRange, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonSelect, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonSelectOption, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonSpinner, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonToggle, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.IonModal, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.BooleanValueAccessor, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.SelectValueAccessor, _ionic_angular__WEBPACK_IMPORTED_MODULE_31__.TextValueAccessor, src_app_core_directives_decimal_input_directive__WEBPACK_IMPORTED_MODULE_22__.DecimalInputDirective, src_app_core_directives_lowercase_email_input_directive__WEBPACK_IMPORTED_MODULE_23__.LowercaseEmailInputDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_30__.TranslatePipe],
  styles: ["@charset \"UTF-8\";\n[_nghost-%COMP%] {\n  --bg-primary: #0a0a0b;\n  --bg-secondary: #111111;\n  --bg-tertiary: #1c1c1e;\n  --border-primary: #2a2a2a;\n  --text-primary: #ffffff;\n  --text-secondary: #9ca3af;\n  --accent-primary: #fe9000;\n}\n\n.auth-content[_ngcontent-%COMP%] {\n  --background: var(--bg-primary);\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n}\n\n.auth-container[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  background: var(--bg-secondary);\n  display: flex;\n  flex-direction: column;\n  padding: 40px 25px 20px 25px;\n  overflow: hidden;\n}\n\n.logo-section[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.logo-section[_ngcontent-%COMP%]   .logo-image[_ngcontent-%COMP%] {\n  width: 40vw;\n  max-width: 350px;\n  min-width: 300px;\n  height: auto;\n  margin: 0 auto;\n}\n\n.signup-form[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.input-group[_ngcontent-%COMP%] {\n  margin-bottom: 25px;\n}\n.input-group[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  background-color: var(--bg-tertiary);\n  border: 1px solid var(--border-primary);\n  border-radius: 12px;\n  transition: all 0.3s ease;\n  min-height: 56px;\n}\n.input-group[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--accent-primary);\n  box-shadow: 0 0 0 2px rgba(254, 144, 0, 0.1);\n}\n.input-group[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]:has(.input-field.ng-invalid.ng-touched) {\n  border-color: #ff4444;\n  box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.1);\n}\n.input-group[_ngcontent-%COMP%]   .input-wrapper.has-error[_ngcontent-%COMP%] {\n  border-color: #ff4444;\n  box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.1);\n}\n.input-group[_ngcontent-%COMP%]   .input-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 16px;\n  color: var(--text-secondary);\n  font-size: 20px;\n  pointer-events: none;\n  z-index: 2;\n  width: 20px;\n  height: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.input-group[_ngcontent-%COMP%]   .input-field[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 15px;\n  background-color: var(--bg-tertiary);\n  border: none;\n  border-radius: 12px;\n  color: var(--text-primary);\n  font-size: 16px;\n  font-weight: 500;\n  box-sizing: border-box;\n  outline: none;\n}\n.input-wrapper[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%]   .input-field[_ngcontent-%COMP%] {\n  background: transparent;\n  border-radius: 0;\n  padding: 16px 16px 16px 48px;\n}\n.input-group[_ngcontent-%COMP%]   .input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-secondary);\n  opacity: 0.7;\n}\n.input-group[_ngcontent-%COMP%]   .input-field[_ngcontent-%COMP%]:not(.input-wrapper   *)[_ngcontent-%COMP%] {\n  border: 1px solid var(--border-primary);\n  transition: border-color 0.3s ease;\n}\n.input-group[_ngcontent-%COMP%]   .input-field[_ngcontent-%COMP%]:not(.input-wrapper   *)[_ngcontent-%COMP%]:focus {\n  border-color: var(--accent-primary);\n}\n.input-group[_ngcontent-%COMP%]   .input-field[_ngcontent-%COMP%]:not(.input-wrapper   *)[_ngcontent-%COMP%]:invalid {\n  border-color: var(--error-color);\n}\n.input-group[_ngcontent-%COMP%]   .password-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 8px;\n  --color: var(--text-secondary);\n  --padding-start: 8px;\n  --padding-end: 8px;\n  height: 40px;\n  width: 40px;\n  z-index: 3;\n  border-radius: 8px;\n  margin: 0;\n}\n.input-group[_ngcontent-%COMP%]   .password-toggle[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.input-group[_ngcontent-%COMP%]   .validation-error[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  padding-left: 4px;\n  font-size: 13px;\n  color: #ff4444;\n  font-weight: 500;\n}\n.input-group[_ngcontent-%COMP%]   .validation-error[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  line-height: 1.5;\n  margin-bottom: 2px;\n}\n.input-group[_ngcontent-%COMP%]   .validation-error[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.choice-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.validation-error[_ngcontent-%COMP%] {\n  margin-top: 10px;\n  padding-left: 4px;\n  font-size: 13px;\n  color: #ff4444;\n  font-weight: 500;\n}\n.validation-error[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: block;\n  line-height: 1.5;\n  margin-bottom: 2px;\n}\n.validation-error[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.gender-options[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 15px;\n}\n\n.gender-option[_ngcontent-%COMP%] {\n  flex: 1;\n  color: #ffffff;\n}\n.gender-option[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  display: none;\n}\n.gender-option[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 20px 10px;\n  background-color: var(--bg-tertiary);\n  border: 1px solid var(--border-primary);\n  border-radius: 12px;\n  text-align: center;\n  height: 100%;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  text-align: center;\n  height: 100%;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.gender-option[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin-bottom: 10px;\n  color: var(--text-secondary);\n}\n.gender-option[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.gender-option[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  margin-bottom: 10px;\n  color: var(--text-secondary);\n}\n.gender-option[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.gender-option[_ngcontent-%COMP%]   label.selected[_ngcontent-%COMP%] {\n  background-color: #2c2111;\n  border-color: var(--accent-primary);\n}\n.gender-option[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + label[_ngcontent-%COMP%] {\n  background-color: #2c2111;\n  border-color: var(--accent-primary);\n  color: var(--accent-primary);\n}\n.gender-option[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:checked    + label[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--accent-primary);\n}\n\n.gender-options.has-error[_ngcontent-%COMP%]   .gender-option[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {\n  border-color: #ff4444;\n}\n\n.selection-options[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.selection-options[_ngcontent-%COMP%]   .selection-option[_ngcontent-%COMP%] {\n  background-color: var(--bg-tertiary);\n  border: 1px solid var(--border-primary);\n  border-radius: 10px;\n  padding: 12px 16px;\n}\n.selection-options[_ngcontent-%COMP%]   .selection-option.selected[_ngcontent-%COMP%] {\n  background-color: #2c2111;\n  border-color: var(--accent-primary);\n}\n.selection-options.has-error[_ngcontent-%COMP%]   .selection-option[_ngcontent-%COMP%] {\n  border-color: #ff4444;\n}\n\n.selection-title[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 600;\n  margin: 0 0 4px 0;\n  line-height: 1.3;\n  color: white;\n}\n\n.selection-desc[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  margin: 0;\n  line-height: 1.4;\n}\n\n.objective-info[_ngcontent-%COMP%] {\n  margin: 25px 0;\n  padding: 20px;\n  background-color: var(--bg-tertiary);\n  border: 1px solid var(--border-primary);\n  border-radius: 12px;\n  transition: all 0.3s ease;\n}\n.objective-info[_ngcontent-%COMP%]   .objective-title[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  color: var(--text-primary);\n  margin: 0 0 10px 0;\n  display: flex;\n  align-items: center;\n}\n.objective-info[_ngcontent-%COMP%]   .objective-title[_ngcontent-%COMP%]::before {\n  content: \"\uD83C\uDFAF\";\n  margin-right: 10px;\n  font-size: 20px;\n}\n.objective-info[_ngcontent-%COMP%]   .objective-description[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-secondary);\n  margin: 0;\n  line-height: 1.5;\n}\n.objective-info[_ngcontent-%COMP%]   .objective-description[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--accent-primary);\n  font-weight: 600;\n}\n\n.calorie-selector[_ngcontent-%COMP%] {\n  margin: 30px 0;\n  padding: 25px 20px;\n  background: linear-gradient(135deg, var(--bg-tertiary) 0%, rgba(28, 28, 30, 0.8) 100%);\n  border: 1px solid var(--border-primary);\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);\n  transition: all 0.3s ease;\n}\n.calorie-selector[_ngcontent-%COMP%]   .calorie-title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--text-primary);\n  margin: 0 0 20px 0;\n  text-align: center;\n}\n.calorie-selector[_ngcontent-%COMP%]   .calorie-title[_ngcontent-%COMP%]   .calorie-type[_ngcontent-%COMP%] {\n  color: var(--accent-primary);\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.calorie-selector[_ngcontent-%COMP%]   ion-range[_ngcontent-%COMP%] {\n  --bar-background: var(--border-primary);\n  --bar-background-active: var(--accent-primary);\n  --bar-height: 6px;\n  --bar-border-radius: 3px;\n  --knob-background: var(--accent-primary);\n  --knob-size: 24px;\n  --pin-background: var(--accent-primary);\n  --pin-color: white;\n  margin: 20px 0;\n}\n.calorie-selector[_ngcontent-%COMP%]   ion-range[_ngcontent-%COMP%]::part(tick) {\n  background: var(--border-primary);\n}\n.calorie-selector[_ngcontent-%COMP%]   ion-range[_ngcontent-%COMP%]::part(tick-active) {\n  background: var(--accent-primary);\n}\n.calorie-selector[_ngcontent-%COMP%]   .calorie-description[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  text-align: center;\n  margin: 15px 0 0 0;\n  line-height: 1.4;\n}\n.calorie-selector[_ngcontent-%COMP%]   .calorie-description[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--accent-primary);\n}\n.calorie-selector[_ngcontent-%COMP%]   .calorie-description[_ngcontent-%COMP%]   .highlight[_ngcontent-%COMP%] {\n  color: var(--accent-primary);\n  font-weight: 600;\n}\n\n.signup-swiper[_ngcontent-%COMP%] {\n  height: auto;\n}\n.signup-swiper[_ngcontent-%COMP%]   .swiper-slide[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  padding: 20px 0;\n}\n.signup-swiper[_ngcontent-%COMP%]   .swiper-pagination[_ngcontent-%COMP%] {\n  position: relative;\n  margin-top: 30px;\n}\n.signup-swiper[_ngcontent-%COMP%]   .swiper-pagination[_ngcontent-%COMP%]   .swiper-pagination-bullet[_ngcontent-%COMP%] {\n  background: var(--border-primary);\n  opacity: 1;\n  width: 8px;\n  height: 8px;\n  margin: 0 4px;\n}\n.signup-swiper[_ngcontent-%COMP%]   .swiper-pagination[_ngcontent-%COMP%]   .swiper-pagination-bullet.swiper-pagination-bullet-active[_ngcontent-%COMP%] {\n  background: var(--accent-primary);\n}\n\nswiper-container[_ngcontent-%COMP%] {\n  width: 100%;\n  flex: 1;\n  --swiper-pagination-color: var(--accent-primary);\n  --swiper-pagination-progressbar-bg-color: var(--border-primary);\n}\n\nswiper-slide[_ngcontent-%COMP%] {\n  background: transparent;\n  display: flex;\n  justify-content: center;\n  align-items: flex-start;\n  padding: 0;\n  height: auto;\n  overflow-y: auto;\n}\n\n.divider[_ngcontent-%COMP%] {\n  margin: 32px 20px;\n  font-size: 14px;\n  font-weight: 400;\n  color: var(--text-secondary);\n  text-align: center;\n  background: rgba(var(--ion-color-medium-rgb), 0.3);\n  height: 1px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.divider[_ngcontent-%COMP%]::before {\n  content: \"\";\n  flex: 1;\n  height: 1px;\n  background: rgba(var(--ion-color-medium-rgb), 0.3);\n}\n.divider[_ngcontent-%COMP%]::after {\n  content: \"\";\n  flex: 1;\n  height: 1px;\n  background: rgba(var(--ion-color-medium-rgb), 0.3);\n}\n\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  padding: 40px 0;\n}\n.loading-container[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {\n  --color: var(--accent-primary);\n  width: 32px;\n  height: 32px;\n}\n\n.signup-form[_ngcontent-%COMP%] {\n  width: 100%;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n}\n\nion-list[_ngcontent-%COMP%] {\n  background: transparent;\n  padding: 0;\n}\n\nion-card[_ngcontent-%COMP%] {\n  --background: var(--bg-tertiary);\n  --color: var(--text-primary);\n  border: 1px solid var(--border-primary);\n  border-radius: 12px;\n  margin: 0 0 20px 0;\n  box-shadow: none;\n}\n\nion-card-header[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n\nion-card-content[_ngcontent-%COMP%] {\n  padding: 0 16px 16px 16px;\n  color: var(--text-secondary);\n}\n\nion-item[_ngcontent-%COMP%] {\n  --background: transparent;\n  --color: var(--text-primary);\n  --border-color: var(--border-primary);\n  --inner-border-width: 0;\n  --padding-start: 16px;\n  --padding-end: 16px;\n  margin-bottom: 8px;\n}\n\nion-label[_ngcontent-%COMP%] {\n  color: var(--text-secondary) !important;\n  font-weight: 500;\n}\n\nion-input[_ngcontent-%COMP%] {\n  --color: var(--text-primary);\n  --placeholder-color: var(--text-secondary);\n  font-weight: 500;\n}\n\n.action-buttons[_ngcontent-%COMP%] {\n  margin-top: 30px;\n}\n.action-buttons[_ngcontent-%COMP%]   .next-button[_ngcontent-%COMP%], .action-buttons[_ngcontent-%COMP%]   .signup-button[_ngcontent-%COMP%] {\n  --background: var(--accent-primary);\n  --color: #ffffff;\n  --border-radius: 12px;\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n  --box-shadow: 0 4px 12px rgba(254, 144, 0, 0.3);\n  font-weight: 600;\n  font-size: 16px;\n  margin-bottom: 15px;\n  height: 56px;\n}\n.action-buttons[_ngcontent-%COMP%]   .next-button[disabled][_ngcontent-%COMP%], .action-buttons[_ngcontent-%COMP%]   .signup-button[disabled][_ngcontent-%COMP%] {\n  --background: var(--border-primary);\n  --color: var(--text-secondary);\n  --box-shadow: none;\n}\n.action-buttons[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%] {\n  --background: transparent;\n  --color: var(--text-secondary);\n  --border-radius: 12px;\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n  font-weight: 500;\n  font-size: 16px;\n  height: 56px;\n  border: 1px solid var(--border-primary);\n}\n\n.error-message[_ngcontent-%COMP%] {\n  background: rgba(255, 68, 68, 0.1);\n  border: 1px solid rgba(255, 68, 68, 0.3);\n  border-radius: 8px;\n  padding: 12px 16px;\n  margin: 20px 0;\n  color: #ff4444;\n  font-size: 14px;\n  font-weight: 500;\n  text-align: center;\n}\n.error-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  font-size: 16px;\n}\n\n.form-section[_ngcontent-%COMP%] {\n  flex: 0 0 100%;\n  width: 100%;\n  padding: 0 5px;\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  overflow-y: auto;\n  scrollbar-width: none; \n\n  box-sizing: border-box;\n}\n.form-section[_ngcontent-%COMP%]::-webkit-scrollbar {\n  display: none; \n\n}\n\n.section-title[_ngcontent-%COMP%] {\n  color: #ffffff;\n  font-size: 20px;\n  font-weight: 700;\n  margin-bottom: 8px;\n  text-align: center;\n  line-height: 1.2;\n}\n\n.section-subtitle[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin-bottom: 20px;\n  text-align: center;\n  line-height: 1.3;\n}\n\n.auth-links[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 25px;\n}\n.auth-links[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--accent-primary);\n  text-decoration: none;\n  font-weight: 500;\n  font-size: 14px;\n  transition: all 0.3s ease;\n}\n\n@media (min-width: 481px) and (max-width: 767px) {\n  .auth-content[_ngcontent-%COMP%] {\n    padding: 0;\n  }\n  .auth-container[_ngcontent-%COMP%] {\n    max-width: 100%;\n    width: 100%;\n    padding: 35px 30px 20px 30px;\n    margin: 0;\n    border-radius: 0;\n  }\n  .logo-section[_ngcontent-%COMP%] {\n    margin-bottom: 30px;\n  }\n  .logo-section[_ngcontent-%COMP%]   .logo-image[_ngcontent-%COMP%] {\n    width: 30vw;\n    max-width: 280px;\n    min-width: 220px;\n  }\n  .input-group[_ngcontent-%COMP%]   .input-field[_ngcontent-%COMP%] {\n    padding: 18px 50px 18px 45px;\n    font-size: 16px;\n  }\n  .section-title[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .section-subtitle[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .selection-options[_ngcontent-%COMP%] {\n    gap: 10px;\n  }\n  .selection-options[_ngcontent-%COMP%]   .selection-option[_ngcontent-%COMP%] {\n    padding: 16px 18px;\n  }\n  .signup-footer[_ngcontent-%COMP%]   .footer-buttons[_ngcontent-%COMP%] {\n    padding: 15px 30px;\n  }\n  .nav-button[_ngcontent-%COMP%] {\n    --padding-top: 16px;\n    --padding-bottom: 16px;\n    font-size: 16px;\n  }\n}\n@media (max-width: 480px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: 30px 20px;\n  }\n  .logo-section[_ngcontent-%COMP%] {\n    margin-bottom: 25px;\n  }\n  .logo-section[_ngcontent-%COMP%]   .logo-image[_ngcontent-%COMP%] {\n    width: 35vw;\n    min-width: 250px;\n  }\n  .logo-section[_ngcontent-%COMP%]   .app-title[_ngcontent-%COMP%] {\n    font-size: 24px;\n  }\n  .input-group[_ngcontent-%COMP%]   .input-field[_ngcontent-%COMP%] {\n    padding: 16px 50px 16px 45px;\n    font-size: 15px;\n  }\n  .action-buttons[_ngcontent-%COMP%]   .next-button[_ngcontent-%COMP%], .action-buttons[_ngcontent-%COMP%]   .signup-button[_ngcontent-%COMP%], .action-buttons[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%] {\n    height: 52px;\n    font-size: 15px;\n  }\n}\n@media (max-height: 700px) {\n  .auth-content[_ngcontent-%COMP%] {\n    align-items: flex-start;\n    padding-top: 1rem;\n  }\n  .auth-container[_ngcontent-%COMP%] {\n    padding: 20px 25px;\n  }\n  .logo-section[_ngcontent-%COMP%] {\n    margin-bottom: 20px;\n  }\n}\n.checkbox-section[_ngcontent-%COMP%] {\n  margin: 25px 0;\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.checkbox-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px 14px;\n  border-radius: 12px;\n  background: var(--bg-tertiary);\n  border: 1px solid var(--border-primary);\n  transition: transform 0.08s ease, border-color 0.2s ease;\n  cursor: pointer;\n}\n.checkbox-item[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n.checkbox-item.has-error[_ngcontent-%COMP%] {\n  border-color: #ff4444;\n}\n.checkbox-item[_ngcontent-%COMP%]   .modern-checkbox[_ngcontent-%COMP%] {\n  margin-right: 12px;\n  --size: 22px;\n  --checkbox-background-checked: var(--accent-primary);\n  --border-color-checked: var(--accent-primary);\n  --checkmark-color: white;\n}\n.checkbox-item[_ngcontent-%COMP%]   .checkbox-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-primary);\n  line-height: 1.4;\n}\n.checkbox-item[_ngcontent-%COMP%]   .checkbox-link[_ngcontent-%COMP%] {\n  color: var(--accent-primary);\n  text-decoration: none;\n  font-weight: 500;\n}\n.checkbox-item[_ngcontent-%COMP%]   .checkbox-icon[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 20px;\n  color: var(--text-secondary);\n}\n\n.checkbox-group[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin-bottom: 15px;\n}\n.checkbox-group[_ngcontent-%COMP%]   ion-checkbox[_ngcontent-%COMP%] {\n  margin-right: 12px;\n  --size: 18px;\n  --checkbox-background-checked: var(--accent-primary);\n  --border-color-checked: var(--accent-primary);\n  --checkmark-color: white;\n}\n.checkbox-group[_ngcontent-%COMP%]   .checkbox-label[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  line-height: 1.4;\n}\n.checkbox-group[_ngcontent-%COMP%]   .checkbox-label[_ngcontent-%COMP%]   .checkbox-link[_ngcontent-%COMP%] {\n  color: var(--accent-primary);\n  text-decoration: none;\n  font-weight: 500;\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  --background: var(--accent-primary);\n  --color: white;\n  --border-radius: 12px;\n  --box-shadow: 0 4px 15px rgba(254, 144, 0, 0.2);\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n  font-weight: 700;\n  font-size: 16px;\n  transition: all 0.3s ease;\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  --background: var(--bg-tertiary);\n  --color: var(--text-secondary);\n  --box-shadow: none;\n  opacity: 0.5;\n}\n\n.signup-footer[_ngcontent-%COMP%] {\n  --background: var(--bg-secondary);\n  margin-bottom: 0 !important; \n\n  padding-bottom: calc(12px + env(safe-area-inset-bottom, 0px));\n}\n.signup-footer[_ngcontent-%COMP%]   .footer-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  padding: 12px 25px;\n  padding-bottom: calc(6px + env(safe-area-inset-bottom, 0px));\n  background: var(--bg-secondary);\n}\n.signup-footer[_ngcontent-%COMP%]   .footer-buttons.is-last-slide[_ngcontent-%COMP%] {\n  padding: 6px 12px;\n  padding-bottom: calc(6px + env(safe-area-inset-bottom, 0px));\n  gap: 6px;\n}\n\n.ios[_nghost-%COMP%]   .signup-footer[_ngcontent-%COMP%], .ios   [_nghost-%COMP%]   .signup-footer[_ngcontent-%COMP%] {\n  padding-bottom: calc(12px + 0.22 * var(--keyboard-height, 0px) + env(safe-area-inset-bottom, 0px));\n}\n.ios[_nghost-%COMP%]   .signup-footer[_ngcontent-%COMP%]   .footer-buttons[_ngcontent-%COMP%], .ios   [_nghost-%COMP%]   .signup-footer[_ngcontent-%COMP%]   .footer-buttons[_ngcontent-%COMP%] {\n  padding-bottom: calc(6px + 0.22 * var(--keyboard-height, 0px) + env(safe-area-inset-bottom, 0px));\n}\n.ios[_nghost-%COMP%]   .signup-footer[_ngcontent-%COMP%]   .footer-buttons.is-last-slide[_ngcontent-%COMP%], .ios   [_nghost-%COMP%]   .signup-footer[_ngcontent-%COMP%]   .footer-buttons.is-last-slide[_ngcontent-%COMP%] {\n  padding-bottom: calc(6px + 0.22 * var(--keyboard-height, 0px) + env(safe-area-inset-bottom, 0px));\n}\n\n[_nghost-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n[_nghost-%COMP%]   ion-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n[_nghost-%COMP%]   ion-footer[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n\n.nav-button[_ngcontent-%COMP%] {\n  flex: 1;\n  --padding-top: 14px;\n  --padding-bottom: 14px;\n  --border-radius: 10px;\n  font-weight: 600;\n  font-size: 14px;\n  transition: all 0.3s ease;\n  min-width: 0;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  margin: 0;\n}\n.nav-button.prev[_ngcontent-%COMP%] {\n  --background: var(--bg-tertiary);\n  --color: var(--text-secondary);\n  --border-color: var(--border-primary);\n}\n.nav-button.next[_ngcontent-%COMP%] {\n  --background: var(--accent-primary);\n  --color: white;\n  --box-shadow: 0 4px 15px rgba(254, 144, 0, 0.2);\n}\n.nav-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n  ion-modal.modal-default.show-modal ~ ion-modal.modal-default {\n  --backdrop-opacity: 0.5;\n}\n\n@media (min-width: 768px) {\n  .auth-container[_ngcontent-%COMP%] {\n    max-width: 500px;\n    padding: 50px 40px;\n    border-radius: 20px;\n    margin: 20px auto;\n    min-height: calc(100vh - 40px);\n    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);\n  }\n  .logo-section[_ngcontent-%COMP%]   .logo-image[_ngcontent-%COMP%] {\n    width: 35vw;\n    max-width: 400px;\n    min-width: 320px;\n  }\n  .form-group[_ngcontent-%COMP%] {\n    margin-bottom: 25px;\n  }\n  .input-wrapper[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%]   .input-field[_ngcontent-%COMP%] {\n    padding: 18px 20px 18px 55px;\n    font-size: 16px;\n  }\n  .input-container[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n    --padding-start: 20px;\n    --padding-end: 20px;\n    font-size: 16px;\n  }\n  .selection-container[_ngcontent-%COMP%] {\n    padding: 25px;\n  }\n  .selection-item[_ngcontent-%COMP%] {\n    padding: 20px;\n    margin-bottom: 20px;\n  }\n  .objective-info[_ngcontent-%COMP%] {\n    padding: 25px;\n  }\n  .calorie-selector[_ngcontent-%COMP%] {\n    padding: 25px;\n  }\n}\n@media (min-width: 1024px) {\n  .auth-content[_ngcontent-%COMP%] {\n    padding: 40px 20px;\n  }\n  .auth-container[_ngcontent-%COMP%] {\n    max-width: 600px;\n    padding: 60px 50px;\n    border-radius: 25px;\n  }\n  .logo-section[_ngcontent-%COMP%]   .logo-image[_ngcontent-%COMP%] {\n    width: 30vw;\n    max-width: 450px;\n    min-width: 350px;\n  }\n  .form-group[_ngcontent-%COMP%] {\n    margin-bottom: 30px;\n  }\n  .input-wrapper[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%]   .input-field[_ngcontent-%COMP%] {\n    padding: 20px 25px 20px 60px;\n    font-size: 18px;\n  }\n  .input-container[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n    --padding-start: 25px;\n    --padding-end: 25px;\n    font-size: 18px;\n    min-height: 60px;\n  }\n  .selection-container[_ngcontent-%COMP%] {\n    padding: 30px;\n  }\n  .selection-item[_ngcontent-%COMP%] {\n    padding: 25px;\n    margin-bottom: 25px;\n  }\n  .objective-info[_ngcontent-%COMP%] {\n    padding: 30px;\n  }\n  .calorie-selector[_ngcontent-%COMP%] {\n    padding: 30px;\n  }\n  .signup-swiper[_ngcontent-%COMP%]   .swiper-button-prev[_ngcontent-%COMP%], .signup-swiper[_ngcontent-%COMP%]   .swiper-button-next[_ngcontent-%COMP%] {\n    width: 50px;\n    height: 50px;\n  }\n  .signup-swiper[_ngcontent-%COMP%]   .swiper-button-prev[_ngcontent-%COMP%]::after, .signup-swiper[_ngcontent-%COMP%]   .swiper-button-next[_ngcontent-%COMP%]::after {\n    font-size: 20px;\n  }\n}\n@media (min-width: 1440px) {\n  .auth-container[_ngcontent-%COMP%] {\n    max-width: 700px;\n    padding: 70px 60px;\n  }\n  .logo-section[_ngcontent-%COMP%]   .logo-image[_ngcontent-%COMP%] {\n    width: 25vw;\n    max-width: 500px;\n  }\n  .input-wrapper[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%]   .input-field[_ngcontent-%COMP%] {\n    padding: 22px 30px 22px 65px;\n    font-size: 20px;\n  }\n  .input-container[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n    font-size: 20px;\n    min-height: 65px;\n  }\n}\n@media (max-height: 600px) and (orientation: landscape) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: 20px 25px;\n  }\n  .logo-section[_ngcontent-%COMP%]   .logo-image[_ngcontent-%COMP%] {\n    width: 25vw;\n    max-width: 200px;\n    min-width: 150px;\n  }\n  .form-group[_ngcontent-%COMP%] {\n    margin-bottom: 15px;\n  }\n  .selection-container[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n  .selection-item[_ngcontent-%COMP%] {\n    padding: 15px;\n    margin-bottom: 15px;\n  }\n}\n@media (max-width: 375px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: 30px 20px;\n  }\n  .logo-section[_ngcontent-%COMP%]   .logo-image[_ngcontent-%COMP%] {\n    width: 45vw;\n    min-width: 250px;\n  }\n  .input-container[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n    --padding-start: 15px;\n    --padding-end: 15px;\n    font-size: 14px;\n  }\n  .selection-container[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n  .selection-item[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n}\n@media (max-height: 700px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: 15px 25px 10px 25px;\n  }\n  .section-title[_ngcontent-%COMP%] {\n    font-size: 18px;\n    margin-bottom: 6px;\n  }\n  .section-subtitle[_ngcontent-%COMP%] {\n    font-size: 12px;\n    margin-bottom: 15px;\n  }\n  .selection-options[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n  .selection-options[_ngcontent-%COMP%]   .selection-option[_ngcontent-%COMP%] {\n    padding: 10px 14px;\n  }\n  .selection-title[_ngcontent-%COMP%] {\n    font-size: 13px;\n    margin-bottom: 2px;\n  }\n  .selection-desc[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .signup-footer[_ngcontent-%COMP%]   .footer-buttons[_ngcontent-%COMP%] {\n    padding: 10px 25px;\n    padding-bottom: calc(8px + env(safe-area-inset-bottom, 0px));\n  }\n  .nav-button[_ngcontent-%COMP%] {\n    --padding-top: 12px;\n    --padding-bottom: 12px;\n    font-size: 13px;\n  }\n}\n@media (max-height: 600px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: 10px 25px 8px 25px;\n  }\n  .section-title[_ngcontent-%COMP%] {\n    font-size: 16px;\n    margin-bottom: 4px;\n  }\n  .section-subtitle[_ngcontent-%COMP%] {\n    font-size: 11px;\n    margin-bottom: 12px;\n  }\n  .selection-options[_ngcontent-%COMP%] {\n    gap: 4px;\n  }\n  .selection-options[_ngcontent-%COMP%]   .selection-option[_ngcontent-%COMP%] {\n    padding: 8px 12px;\n  }\n  .selection-title[_ngcontent-%COMP%] {\n    font-size: 12px;\n    margin-bottom: 1px;\n  }\n  .selection-desc[_ngcontent-%COMP%] {\n    font-size: 10px;\n  }\n  .signup-footer[_ngcontent-%COMP%]   .footer-buttons[_ngcontent-%COMP%] {\n    padding: 8px 25px;\n    padding-bottom: calc(6px + env(safe-area-inset-bottom, 0px));\n    gap: 8px;\n  }\n  .nav-button[_ngcontent-%COMP%] {\n    --padding-top: 10px;\n    --padding-bottom: 10px;\n    font-size: 12px;\n  }\n}\n@media (max-width: 374px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: 15px 15px 20px 15px;\n  }\n  .logo-section[_ngcontent-%COMP%]   .logo-image[_ngcontent-%COMP%] {\n    width: 45vw;\n    max-width: 280px;\n    min-width: 200px;\n  }\n  .form-fields[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n  .input-container[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n    --padding-start: 45px;\n    --padding-end: 15px;\n    font-size: 14px;\n  }\n  .section-title[_ngcontent-%COMP%] {\n    font-size: 18px;\n    margin-bottom: 6px;\n  }\n  .section-subtitle[_ngcontent-%COMP%] {\n    font-size: 12px;\n    margin-bottom: 15px;\n  }\n  .selection-options[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n  .selection-options[_ngcontent-%COMP%]   .selection-option[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n  }\n  .selection-title[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n  .selection-desc[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .signup-footer[_ngcontent-%COMP%]   .footer-buttons[_ngcontent-%COMP%] {\n    gap: 8px;\n    padding: 10px 15px;\n    padding-bottom: calc(8px + env(safe-area-inset-bottom, 0px));\n  }\n  .nav-button[_ngcontent-%COMP%] {\n    font-size: 12px;\n    --padding-top: 12px;\n    --padding-bottom: 12px;\n  }\n  .login-button[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n  .forgot-password[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n  .signup-link[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n.stats-card-modern[_ngcontent-%COMP%] {\n  background: var(--bg-tertiary);\n  border: 1px solid var(--border-primary);\n  border-radius: 12px;\n  margin: 16px 0;\n  padding: 0;\n  overflow: hidden;\n}\n.stats-card-modern[_ngcontent-%COMP%]   .card-header-modern[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  padding: 12px 16px;\n  border-bottom: 1px solid var(--border-primary);\n  align-items: center;\n}\n.stats-card-modern[_ngcontent-%COMP%]   .card-header-modern[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--accent-primary);\n}\n.stats-card-modern[_ngcontent-%COMP%]   .card-header-modern[_ngcontent-%COMP%]   .card-title-modern[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: white;\n  letter-spacing: 0.5px;\n}\n.stats-card-modern[_ngcontent-%COMP%]   .stats-grid-modern[_ngcontent-%COMP%] {\n  padding: 16px;\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 8px;\n}\n.stats-card-modern[_ngcontent-%COMP%]   .stats-grid-modern[_ngcontent-%COMP%]   .stat-item-modern[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 6px;\n}\n.stats-card-modern[_ngcontent-%COMP%]   .stats-grid-modern[_ngcontent-%COMP%]   .stat-item-modern[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--accent-primary);\n}\n.stats-card-modern[_ngcontent-%COMP%]   .stats-grid-modern[_ngcontent-%COMP%]   .stat-item-modern[_ngcontent-%COMP%]   .stat-value-modern[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: white;\n  text-align: center;\n}\n.stats-card-modern[_ngcontent-%COMP%]   .stats-grid-modern[_ngcontent-%COMP%]   .stat-item-modern[_ngcontent-%COMP%]   .stat-label-modern[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n  text-align: center;\n}\n\n.info-card-modern[_ngcontent-%COMP%] {\n  background: var(--bg-tertiary);\n  border: 1px solid var(--border-primary);\n  border-radius: 12px;\n  margin-bottom: 16px;\n  padding: 0;\n  overflow: hidden;\n}\n.info-card-modern[_ngcontent-%COMP%]   .card-header-modern[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 12px 16px;\n  border-bottom: 1px solid var(--border-primary);\n}\n.info-card-modern[_ngcontent-%COMP%]   .card-header-modern[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  margin-right: 10px;\n  color: var(--accent-primary);\n}\n.info-card-modern[_ngcontent-%COMP%]   .card-header-modern[_ngcontent-%COMP%]   .card-title-modern[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12px;\n  font-weight: 600;\n  color: white;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.info-card-modern[_ngcontent-%COMP%]   .card-content-modern[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.info-card-modern[_ngcontent-%COMP%]   .card-content-modern[_ngcontent-%COMP%]   .activity-name-modern[_ngcontent-%COMP%] {\n  font-size: 15px;\n  color: white;\n  line-height: 1.4;\n}\n.info-card-modern.objective-card-modern[_ngcontent-%COMP%]   .objective-content-modern[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.info-card-modern.objective-card-modern[_ngcontent-%COMP%]   .objective-content-modern[_ngcontent-%COMP%]   .objective-message-modern[_ngcontent-%COMP%] {\n  font-size: 13px;\n  color: var(--text-secondary);\n  margin-bottom: 8px;\n}\n.info-card-modern.objective-card-modern[_ngcontent-%COMP%]   .objective-content-modern[_ngcontent-%COMP%]   .calories-modern[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: 700;\n  color: white;\n}\n.info-card-modern.objective-card-modern[_ngcontent-%COMP%]   .objective-content-modern[_ngcontent-%COMP%]   .calories-modern[_ngcontent-%COMP%]   .unit-modern[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--text-secondary);\n  font-weight: 500;\n  margin-left: 4px;\n}\n.info-card-modern.warning-card-modern[_ngcontent-%COMP%]   .warning-content-modern[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 16px;\n  gap: 12px;\n}\n.info-card-modern.warning-card-modern[_ngcontent-%COMP%]   .warning-content-modern[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 28px;\n  color: var(--accent-primary);\n  flex-shrink: 0;\n}\n.info-card-modern.warning-card-modern[_ngcontent-%COMP%]   .warning-content-modern[_ngcontent-%COMP%]   .warning-text-modern[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.info-card-modern.warning-card-modern[_ngcontent-%COMP%]   .warning-content-modern[_ngcontent-%COMP%]   .warning-text-modern[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 14px;\n  font-weight: 600;\n  color: white;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.info-card-modern.warning-card-modern[_ngcontent-%COMP%]   .warning-content-modern[_ngcontent-%COMP%]   .warning-text-modern[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 12px;\n  color: var(--text-secondary);\n  line-height: 1.4;\n}\n\n.verification-wrapper-modern[_ngcontent-%COMP%] {\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n}\n\n.verification-message-modern[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 24px;\n  padding: 20px;\n  background: var(--bg-tertiary);\n  border-radius: 12px;\n  border: 1px solid var(--border-primary);\n}\n.verification-message-modern[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 15px;\n  line-height: 1.5;\n}\n.verification-message-modern[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--accent-primary);\n}\n.verification-message-modern[_ngcontent-%COMP%]   .spam-warning-modern[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--text-secondary);\n  margin-top: 12px;\n  margin-bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.verification-message-modern[_ngcontent-%COMP%]   .spam-warning-modern[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n\n.form-fields-modern[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  margin-bottom: 20px;\n}\n\n.input-group-modern[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.input-wrapper-modern[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  background: var(--bg-tertiary);\n  border: 1px solid var(--border-primary);\n  border-radius: 12px;\n  padding: 0 16px;\n  transition: all 0.3s ease;\n}\n.input-wrapper-modern[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--accent-primary);\n}\n.input-wrapper-modern.verification-input-modern[_ngcontent-%COMP%]   .verification-field-modern[_ngcontent-%COMP%] {\n  text-align: center;\n  letter-spacing: 8px;\n  font-size: 20px;\n  font-weight: 600;\n}\n.input-wrapper-modern.verification-input-modern[_ngcontent-%COMP%]   .verification-field-modern[_ngcontent-%COMP%]::placeholder {\n  letter-spacing: 8px;\n  color: var(--text-secondary);\n  opacity: 0.7;\n}\n\n.input-icon-modern[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: 20px;\n  margin-right: 12px;\n  flex-shrink: 0;\n}\n\n.input-field-modern[_ngcontent-%COMP%] {\n  flex: 1;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: white;\n  font-size: 16px;\n  padding: 16px 0;\n  width: 100%;\n}\n.input-field-modern[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n\n.verify-button-modern[_ngcontent-%COMP%] {\n  --background: var(--accent-primary);\n  --color: white;\n  --border-radius: 12px;\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n  height: 56px;\n  font-weight: 700;\n  font-size: 16px;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n  margin-bottom: 16px;\n}\n.verify-button-modern[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n}\n\n.resend-container-modern[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.resend-container-modern[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--text-secondary);\n  margin-bottom: 4px;\n}\n.resend-container-modern[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --color: var(--accent-primary);\n  font-weight: 600;\n  font-size: 14px;\n}\n\n.finalize-btn[_ngcontent-%COMP%] {\n  --box-shadow: 0 4px 15px rgba(254, 144, 0, 0.4);\n}\n\n.signup-notif-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid rgba(254, 144, 0, 0.2);\n  border-radius: 16px;\n  padding: 16px;\n  margin-top: 16px;\n}\n.signup-notif-card[_ngcontent-%COMP%]   .signup-notif-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n.signup-notif-card[_ngcontent-%COMP%]   .signup-notif-row[_ngcontent-%COMP%]   .signup-notif-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n.signup-notif-card[_ngcontent-%COMP%]   .signup-notif-row[_ngcontent-%COMP%]   .signup-notif-info[_ngcontent-%COMP%]   .signup-notif-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: #fe9000;\n  min-width: 24px;\n}\n.signup-notif-card[_ngcontent-%COMP%]   .signup-notif-row[_ngcontent-%COMP%]   .signup-notif-info[_ngcontent-%COMP%]   .signup-notif-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 15px;\n  font-weight: 700;\n  color: #f4f4f5;\n  margin-bottom: 2px;\n}\n.signup-notif-card[_ngcontent-%COMP%]   .signup-notif-row[_ngcontent-%COMP%]   .signup-notif-info[_ngcontent-%COMP%]   .signup-notif-desc[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 13px;\n  color: var(--ion-color-medium);\n}\n.signup-notif-card[_ngcontent-%COMP%]   .signup-notif-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: rgba(255, 255, 255, 0.08);\n  margin: 12px 0;\n}\n.signup-notif-card[_ngcontent-%COMP%]   .signup-notif-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 4px 0;\n}\n.signup-notif-card[_ngcontent-%COMP%]   .signup-notif-option[_ngcontent-%COMP%]   .signup-notif-option-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 500;\n  color: #f4f4f5;\n  white-space: nowrap;\n}\n.signup-notif-card[_ngcontent-%COMP%]   .signup-notif-option[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {\n  --padding-start: 10px;\n  --padding-end: 30px;\n  --color: #fe9000;\n  min-height: 38px;\n  width: auto;\n  max-width: 160px;\n  border: 1px solid rgba(254, 144, 0, 0.25);\n  border-radius: 10px;\n  background: rgba(254, 144, 0, 0.08);\n  font-size: 13px;\n  font-weight: 600;\n}\n.signup-notif-card[_ngcontent-%COMP%]   .signup-notif-option[_ngcontent-%COMP%]   .signup-notif-stepper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n.signup-notif-card[_ngcontent-%COMP%]   .signup-notif-option[_ngcontent-%COMP%]   .signup-notif-stepper[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --padding-start: 6px;\n  --padding-end: 6px;\n  --color: #fe9000;\n  margin: 0;\n  height: 32px;\n}\n.signup-notif-card[_ngcontent-%COMP%]   .signup-notif-option[_ngcontent-%COMP%]   .signup-notif-stepper[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.signup-notif-card[_ngcontent-%COMP%]   .signup-notif-option[_ngcontent-%COMP%]   .signup-notif-stepper[_ngcontent-%COMP%]   .signup-stepper-value[_ngcontent-%COMP%] {\n  min-width: 24px;\n  text-align: center;\n  font-size: 15px;\n  font-weight: 700;\n  color: #fe9000;\n}\n.signup-notif-card[_ngcontent-%COMP%]   .signup-time-display[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 14px;\n  border-radius: 10px;\n  background: rgba(254, 144, 0, 0.08);\n  border: 1px solid rgba(254, 144, 0, 0.25);\n  cursor: pointer;\n}\n.signup-notif-card[_ngcontent-%COMP%]   .signup-time-display[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: #fe9000;\n}\n.signup-notif-card[_ngcontent-%COMP%]   .signup-time-display[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  color: #fe9000;\n  letter-spacing: 0.5px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL2F1dGhlbnRpY2F0aW9uL2NvbXBvbmVudHMvc2lnbi11cC9zaWduLXVwLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxnQkFBZ0I7QUFDaEI7RUFDRSxxQkFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLHVCQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtBQUNGOztBQUdBO0VBQ0UsK0JBQUE7RUFDQSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSx1QkFBQTtBQUFGOztBQUlBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSwrQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLDRCQUFBO0VBQ0EsZ0JBQUE7QUFERjs7QUFLQTtFQUNFLGtCQUFBO0FBRkY7QUFJRTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QUFGSjs7QUFPQTtFQUNFLFdBQUE7QUFKRjs7QUFRQTtFQUNFLG1CQUFBO0FBTEY7QUFPRTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esb0NBQUE7RUFDQSx1Q0FBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtBQUxKO0FBT0k7RUFDRSxtQ0FBQTtFQUNBLDRDQUFBO0FBTE47QUFRSTtFQUNFLHFCQUFBO0VBQ0EsNENBQUE7QUFOTjtBQVNJO0VBQ0UscUJBQUE7RUFDQSw0Q0FBQTtBQVBOO0FBV0U7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSw0QkFBQTtFQUNBLGVBQUE7RUFDQSxvQkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBVEo7QUFZRTtFQUNFLFdBQUE7RUFDQSxhQUFBO0VBQ0Esb0NBQUE7RUFDQSxZQUFBO0VBQ0EsbUJB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TjtBQStRTTtFQUNFLGVBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtBQTdRUjtBQWdSTTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7QUE5UVI7QUFpUk07RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLDhCQUFBO0FBL1FSO0FBb1JFO0VBQ0UsV0FBQTtFQUNBLHFDQUFBO0VBQ0EsY0FBQTtBQWxSSjtBQXFSRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsU0FBQTtFQUNBLGNBQUE7QUFuUko7QUFxUkk7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7QUFuUk47QUFzUkk7RUFDRSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLHlDQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQ0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQXBSTjtBQXVSSTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7QUFyUk47QUF1Uk07RUFDRSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtBQXJSUjtBQXVSUTtFQUNFLGVBQUE7QUFyUlY7QUF5Uk07RUFDRSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBdlJSO0FBNFJFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQ0FBQTtFQUNBLHlDQUFBO0VBQ0EsZUFBQTtBQTFSSjtBQTRSSTtFQUNFLGVBQUE7RUFDQSxjQUFBO0FBMVJOO0FBNlJJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLHFCQUFBO0FBM1JOIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVmFyaWFibGVzIGRlIGNvbG9yZXMgaW5zcGlyYWRhcyBlbiBsYSBpbWFnZW4gZGUgcmVmZXJlbmNpYVxuOmhvc3Qge1xuICAtLWJnLXByaW1hcnk6ICMwYTBhMGI7XG4gIC0tYmctc2Vjb25kYXJ5OiAjMTExMTExO1xuICAtLWJnLXRlcnRpYXJ5OiAjMWMxYzFlO1xuICAtLWJvcmRlci1wcmltYXJ5OiAjMmEyYTJhO1xuICAtLXRleHQtcHJpbWFyeTogI2ZmZmZmZjtcbiAgLS10ZXh0LXNlY29uZGFyeTogIzljYTNhZjtcbiAgLS1hY2NlbnQtcHJpbWFyeTogI2ZlOTAwMDtcbn1cblxuLy8gQXV0aCBDb250ZW50IENvbnRhaW5lclxuLmF1dGgtY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tYmctcHJpbWFyeSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbn1cblxuLy8gTWFpbiBDb250YWluZXJcbi5hdXRoLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQ6IHZhcigtLWJnLXNlY29uZGFyeSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHBhZGRpbmc6IDQwcHggMjVweCAyMHB4IDI1cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi8vIExvZ28gU2VjdGlvblxuLmxvZ28tc2VjdGlvbiB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAubG9nby1pbWFnZSB7XG4gICAgd2lkdGg6IDQwdnc7XG4gICAgbWF4LXdpZHRoOiAzNTBweDtcbiAgICBtaW4td2lkdGg6IDMwMHB4O1xuICAgIGhlaWdodDogYXV0bztcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgfVxufVxuXG4vLyBTaWdudXAgRm9ybVxuLnNpZ251cC1mb3JtIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi8vIElucHV0IEdyb3Vwc1xuLmlucHV0LWdyb3VwIHtcbiAgbWFyZ2luLWJvdHRvbTogMjVweDtcblxuICAuaW5wdXQtd3JhcHBlciB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iZy10ZXJ0aWFyeSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbiAgICBtaW4taGVpZ2h0OiA1NnB4O1xuXG4gICAgJjpmb2N1cy13aXRoaW4ge1xuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAycHggcmdiYSgyNTQsIDE0NCwgMCwgMC4xKTtcbiAgICB9XG5cbiAgICAmOmhhcyguaW5wdXQtZmllbGQubmctaW52YWxpZC5uZy10b3VjaGVkKSB7XG4gICAgICBib3JkZXItY29sb3I6ICNmZjQ0NDQ7XG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAycHggcmdiYSgyNTUsIDY4LCA2OCwgMC4xKTtcbiAgICB9XG5cbiAgICAmLmhhcy1lcnJvciB7XG4gICAgICBib3JkZXItY29sb3I6ICNmZjQ0NDQ7XG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAycHggcmdiYSgyNTUsIDY4LCA2OCwgMC4xKTtcbiAgICB9XG4gIH1cblxuICAuaW5wdXQtaWNvbiB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDE2cHg7XG4gICAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgei1pbmRleDogMjtcbiAgICB3aWR0aDogMjBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB9XG5cbiAgLmlucHV0LWZpZWxkIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBwYWRkaW5nOiAxNXB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWJnLXRlcnRpYXJ5KTtcbiAgICBib3JkZXI6IG5vbmU7IC8vIFJlbW92ZSBkZWZhdWx0IGJvcmRlciBjb21wbGV0ZWx5XG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KTtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIG91dGxpbmU6IG5vbmU7IC8vIFJlbW92ZSBvdXRsaW5lXG5cbiAgICAvLyBXaGVuIGluc2lkZSBpbnB1dC13cmFwcGVyLCBhZGp1c3QgcGFkZGluZyBhbmQgcmVtb3ZlIGJhY2tncm91bmRcbiAgICAuaW5wdXQtd3JhcHBlciAmIHtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICAgIHBhZGRpbmc6IDE2cHggMTZweCAxNnB4IDQ4cHg7IC8vIEV4dHJhIGxlZnQgcGFkZGluZyBmb3IgaWNvblxuICAgIH1cblxuICAgICY6OnBsYWNlaG9sZGVyIHtcbiAgICAgIGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gICAgICBvcGFjaXR5OiAwLjc7XG4gICAgfVxuXG4gICAgLy8gRm9yIHN0YW5kYWxvbmUgaW5wdXRzIChub3QgaW5zaWRlIHdyYXBwZXIpLCBhZGQgYm9yZGVyXG4gICAgJjpub3QoLmlucHV0LXdyYXBwZXIgKikge1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xuICAgICAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuM3MgZWFzZTtcblxuICAgICAgJjpmb2N1cyB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgICAgfVxuXG4gICAgICAmOmludmFsaWQge1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLWVycm9yLWNvbG9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG4gIC5wYXNzd29yZC10b2dnbGUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICByaWdodDogOHB4O1xuICAgIC0tY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcbiAgICAtLXBhZGRpbmctZW5kOiA4cHg7XG4gICAgaGVpZ2h0OiA0MHB4O1xuICAgIHdpZHRoOiA0MHB4O1xuICAgIHotaW5kZXg6IDM7XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIG1hcmdpbjogMDtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICB9XG4gIH1cblxuICAudmFsaWRhdGlvbi1lcnJvciB7XG4gICAgbWFyZ2luLXRvcDogMTBweDtcbiAgICBwYWRkaW5nLWxlZnQ6IDRweDtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgY29sb3I6ICNmZjQ0NDQ7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcblxuICAgIHNwYW4ge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMnB4O1xuXG4gICAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBDaG9pY2UgR3JvdXBcbi5jaG9pY2UtZ3JvdXAge1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4vLyBHbG9iYWwgdmFsaWRhdGlvbiBlcnJvciBzdHlsZSAoYXBwbGllcyBvdXRzaWRlIG9mIC5pbnB1dC1ncm91cCBhcyB3ZWxsKVxuLnZhbGlkYXRpb24tZXJyb3Ige1xuICBtYXJnaW4tdG9wOiAxMHB4O1xuICBwYWRkaW5nLWxlZnQ6IDRweDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBjb2xvcjogI2ZmNDQ0NDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcblxuICBzcGFuIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBsaW5lLWhlaWdodDogMS41O1xuICAgIG1hcmdpbi1ib3R0b206IDJweDtcblxuICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIH1cbiAgfVxufVxuXG4vLyBHZW5kZXIgT3B0aW9uc1xuLmdlbmRlci1vcHRpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxNXB4O1xufVxuXG4uZ2VuZGVyLW9wdGlvbiB7XG4gIGZsZXg6IDE7XG4gIGNvbG9yOiAjZmZmZmZmO1xuXG4gIGlucHV0IHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgbGFiZWwge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIHBhZGRpbmc6IDIwcHggMTBweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iZy10ZXJ0aWFyeSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGhlaWdodDogMTAwJTtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuICAgIH1cblxuICAgIHNwYW4ge1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICB9XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGhlaWdodDogMTAwJTtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuICAgIH1cblxuICAgIHNwYW4ge1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICB9XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG5cbiAgICAmLnNlbGVjdGVkIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICMyYzIxMTE7XG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgICB9XG4gIH1cblxuICBpbnB1dDpjaGVja2VkICsgbGFiZWwge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMyYzIxMTE7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gICAgY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gICAgfVxuICB9XG59XG5cbi5nZW5kZXItb3B0aW9ucy5oYXMtZXJyb3IgLmdlbmRlci1vcHRpb24gbGFiZWwge1xuICBib3JkZXItY29sb3I6ICNmZjQ0NDQ7XG59XG5cbi8vIEVzdGlsbyBnZW7Dg8KpcmljbyBwYXJhIG9wY2lvbmVzIHNlbGVjY2lvbmFibGVzXG4uc2VsZWN0aW9uLW9wdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDhweDtcblxuICAuc2VsZWN0aW9uLW9wdGlvbiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmctdGVydGlhcnkpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1wcmltYXJ5KTtcbiAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgIHBhZGRpbmc6IDEycHggMTZweDtcblxuICAgICYuc2VsZWN0ZWQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogIzJjMjExMTtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgIH1cbiAgfVxuXG4gICYuaGFzLWVycm9yIC5zZWxlY3Rpb24tb3B0aW9uIHtcbiAgICBib3JkZXItY29sb3I6ICNmZjQ0NDQ7XG4gIH1cbn1cblxuLnNlbGVjdGlvbi10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbWFyZ2luOiAwIDAgNHB4IDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjM7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLnNlbGVjdGlvbi1kZXNjIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuICBtYXJnaW46IDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjQ7XG59XG5cbi8vIE9iamVjdGl2ZSBJbmZvIFNlY3Rpb25cbi5vYmplY3RpdmUtaW5mbyB7XG4gIG1hcmdpbjogMjVweCAwO1xuICBwYWRkaW5nOiAyMHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iZy10ZXJ0aWFyeSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1wcmltYXJ5KTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcblxuICAub2JqZWN0aXZlLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDE4cHg7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KTtcbiAgICBtYXJnaW46IDAgMCAxMHB4IDA7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgJjo6YmVmb3JlIHtcbiAgICAgIGNvbnRlbnQ6IFwiw7DCn8KOwq9cIjtcbiAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICB9XG4gIH1cblxuICAub2JqZWN0aXZlLWRlc2NyaXB0aW9uIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgICBtYXJnaW46IDA7XG4gICAgbGluZS1oZWlnaHQ6IDEuNTtcblxuICAgIHN0cm9uZyB7XG4gICAgICBjb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICB9XG4gIH1cbn1cblxuLy8gQ2Fsb3JpZSBTZWxlY3RvciBTZWN0aW9uXG4uY2Fsb3JpZS1zZWxlY3RvciB7XG4gIG1hcmdpbjogMzBweCAwO1xuICBwYWRkaW5nOiAyNXB4IDIwcHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcbiAgICAxMzVkZWcsXG4gICAgdmFyKC0tYmctdGVydGlhcnkpIDAlLFxuICAgIHJnYmEoMjgsIDI4LCAzMCwgMC44KSAxMDAlXG4gICk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1wcmltYXJ5KTtcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgYm94LXNoYWRvdzogMCA0cHggMjBweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG5cbiAgLmNhbG9yaWUtdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LXByaW1hcnkpO1xuICAgIG1hcmdpbjogMCAwIDIwcHggMDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgICAuY2Fsb3JpZS10eXBlIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAwLjVweDtcbiAgICB9XG4gIH1cblxuICBpb24tcmFuZ2Uge1xuICAgIC0tYmFyLWJhY2tncm91bmQ6IHZhcigtLWJvcmRlci1wcmltYXJ5KTtcbiAgICAtLWJhci1iYWNrZ3JvdW5kLWFjdGl2ZTogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgIC0tYmFyLWhlaWdodDogNnB4O1xuICAgIC0tYmFyLWJvcmRlci1yYWRpdXM6IDNweDtcbiAgICAtLWtub2ItYmFja2dyb3VuZDogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgIC0ta25vYi1zaXplOiAyNHB4O1xuICAgIC0tcGluLWJhY2tncm91bmQ6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgICAtLXBpbi1jb2xvcjogd2hpdGU7XG4gICAgbWFyZ2luOiAyMHB4IDA7XG5cbiAgICAmOjpwYXJ0KHRpY2spIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWJvcmRlci1wcmltYXJ5KTtcbiAgICB9XG5cbiAgICAmOjpwYXJ0KHRpY2stYWN0aXZlKSB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gICAgfVxuICB9XG5cbiAgLmNhbG9yaWUtZGVzY3JpcHRpb24ge1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBtYXJnaW46IDE1cHggMCAwIDA7XG4gICAgbGluZS1oZWlnaHQ6IDEuNDtcblxuICAgIHN0cm9uZyB7XG4gICAgICBjb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgIH1cblxuICAgIC5oaWdobGlnaHQge1xuICAgICAgY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgfVxuICB9XG59XG5cbi8vIFN3aXBlciBwZXJzb25hbGl6YWRvXG4uc2lnbnVwLXN3aXBlciB7XG4gIGhlaWdodDogYXV0bztcblxuICAuc3dpcGVyLXNsaWRlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgcGFkZGluZzogMjBweCAwO1xuICB9XG5cbiAgLnN3aXBlci1wYWdpbmF0aW9uIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbWFyZ2luLXRvcDogMzBweDtcblxuICAgIC5zd2lwZXItcGFnaW5hdGlvbi1idWxsZXQge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xuICAgICAgb3BhY2l0eTogMTtcbiAgICAgIHdpZHRoOiA4cHg7XG4gICAgICBoZWlnaHQ6IDhweDtcbiAgICAgIG1hcmdpbjogMCA0cHg7XG5cbiAgICAgICYuc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZSB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuc3dpcGVyLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBmbGV4OiAxO1xuICAtLXN3aXBlci1wYWdpbmF0aW9uLWNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gIC0tc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXItYmctY29sb3I6IHZhcigtLWJvcmRlci1wcmltYXJ5KTtcbn1cblxuc3dpcGVyLXNsaWRlIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgcGFkZGluZzogMDtcbiAgaGVpZ2h0OiBhdXRvO1xuICBvdmVyZmxvdy15OiBhdXRvO1xufVxuXG4vLyBEaXZpZGVyXG4uZGl2aWRlciB7XG4gIG1hcmdpbjogMzJweCAyMHB4O1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3ItbWVkaXVtLXJnYiksIDAuMyk7XG4gIGhlaWdodDogMXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgZmxleDogMTtcbiAgICBoZWlnaHQ6IDFweDtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1tZWRpdW0tcmdiKSwgMC4zKTtcbiAgfVxuXG4gICY6OmFmdGVyIHtcbiAgICBjb250ZW50OiBcIlwiO1xuICAgIGZsZXg6IDE7XG4gICAgaGVpZ2h0OiAxcHg7XG4gICAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3ItbWVkaXVtLXJnYiksIDAuMyk7XG4gIH1cbn1cblxuLy8gTG9hZGluZyBTdGF0ZVxuLmxvYWRpbmctY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDQwcHggMDtcblxuICBpb24tc3Bpbm5lciB7XG4gICAgLS1jb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgIHdpZHRoOiAzMnB4O1xuICAgIGhlaWdodDogMzJweDtcbiAgfVxufVxuXG4vLyBGb3JtdWxhcmlvXG4uc2lnbnVwLWZvcm0ge1xuICB3aWR0aDogMTAwJTtcbiAgZmxleDogMTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLy8gQ2FyZHMgeSBjb250ZW5pZG9cbmlvbi1saXN0IHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHBhZGRpbmc6IDA7XG59XG5cbmlvbi1jYXJkIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1iZy10ZXJ0aWFyeSk7XG4gIC0tY29sb3I6IHZhcigtLXRleHQtcHJpbWFyeSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1wcmltYXJ5KTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgbWFyZ2luOiAwIDAgMjBweCAwO1xuICBib3gtc2hhZG93OiBub25lO1xufVxuXG5pb24tY2FyZC1oZWFkZXIge1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG5pb24tY2FyZC1jb250ZW50IHtcbiAgcGFkZGluZzogMCAxNnB4IDE2cHggMTZweDtcbiAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbn1cblxuLy8gSXRlbXMgZGVsIGZvcm11bGFyaW9cbmlvbi1pdGVtIHtcbiAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgLS1jb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KTtcbiAgLS1ib3JkZXItY29sb3I6IHZhcigtLWJvcmRlci1wcmltYXJ5KTtcbiAgLS1pbm5lci1ib3JkZXItd2lkdGg6IDA7XG4gIC0tcGFkZGluZy1zdGFydDogMTZweDtcbiAgLS1wYWRkaW5nLWVuZDogMTZweDtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xufVxuXG5pb24tbGFiZWwge1xuICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpICFpbXBvcnRhbnQ7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbmlvbi1pbnB1dCB7XG4gIC0tY29sb3I6IHZhcigtLXRleHQtcHJpbWFyeSk7XG4gIC0tcGxhY2Vob2xkZXItY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLy8gQnV0dG9uc1xuLmFjdGlvbi1idXR0b25zIHtcbiAgbWFyZ2luLXRvcDogMzBweDtcblxuICAubmV4dC1idXR0b24sXG4gIC5zaWdudXAtYnV0dG9uIHtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcblxuICAgIC0tY29sb3I6ICNmZmZmZmY7XG4gICAgLS1ib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgIC0tcGFkZGluZy10b3A6IDE2cHg7XG4gICAgLS1wYWRkaW5nLWJvdHRvbTogMTZweDtcbiAgICAtLWJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgyNTQsIDE0NCwgMCwgMC4zKTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxNXB4O1xuICAgIGhlaWdodDogNTZweDtcblxuICAgICZbZGlzYWJsZWRdIHtcbiAgICAgIC0tYmFja2dyb3VuZDogdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xuICAgICAgLS1jb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuICAgICAgLS1ib3gtc2hhZG93OiBub25lO1xuICAgIH1cbiAgfVxuXG4gIC5iYWNrLWJ1dHRvbiB7XG4gICAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAtLWNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gICAgLS1ib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgIC0tcGFkZGluZy10b3A6IDE2cHg7XG4gICAgLS1wYWRkaW5nLWJvdHRvbTogMTZweDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBoZWlnaHQ6IDU2cHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xuICB9XG59XG5cbi8vIEVycm9yIE1lc3NhZ2Vcbi5lcnJvci1tZXNzYWdlIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDY4LCA2OCwgMC4xKTtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDY4LCA2OCwgMC4zKTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIG1hcmdpbjogMjBweCAwO1xuICBjb2xvcjogI2ZmNDQ0NDtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgaW9uLWljb24ge1xuICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxufVxuXG4vLyBGb3JtIHNlY3Rpb24gc3R5bGVzXG4uZm9ybS1zZWN0aW9uIHtcbiAgZmxleDogMCAwIDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBwYWRkaW5nOiAwIDVweDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7IC8qIEZpcmVmb3ggKi9cbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcblxuICAmOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgZGlzcGxheTogbm9uZTsgLyogU2FmYXJpIGFuZCBDaHJvbWUgKi9cbiAgfVxufVxuXG4uc2VjdGlvbi10aXRsZSB7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBmb250LXNpemU6IDIwcHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBsaW5lLWhlaWdodDogMS4yO1xufVxuXG4uc2VjdGlvbi1zdWJ0aXRsZSB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBsaW5lLWhlaWdodDogMS4zO1xufVxuXG4vLyBBdXRoIExpbmtzXG4uYXV0aC1saW5rcyB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogMjVweDtcblxuICBhIHtcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuICB9XG59XG5cbi8vIFJlc3BvbnNpdmUgRGVzaWduXG4vLyBQYW50YWxsYXMgbcODwrN2aWxlcyBncmFuZGVzICg0ODFweCAtIDc2N3B4KVxuQG1lZGlhIChtaW4td2lkdGg6IDQ4MXB4KSBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgLmF1dGgtY29udGVudCB7XG4gICAgcGFkZGluZzogMDtcbiAgfVxuXG4gIC5hdXRoLWNvbnRhaW5lciB7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmc6IDM1cHggMzBweCAyMHB4IDMwcHg7XG4gICAgbWFyZ2luOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gIH1cblxuICAubG9nby1zZWN0aW9uIHtcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuXG4gICAgLmxvZ28taW1hZ2Uge1xuICAgICAgd2lkdGg6IDMwdnc7XG4gICAgICBtYXgtd2lkdGg6IDI4MHB4O1xuICAgICAgbWluLXdpZHRoOiAyMjBweDtcbiAgICB9XG4gIH1cblxuICAuaW5wdXQtZ3JvdXAgLmlucHV0LWZpZWxkIHtcbiAgICBwYWRkaW5nOiAxOHB4IDUwcHggMThweCA0NXB4O1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxuXG4gIC5zZWN0aW9uLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDIycHg7XG4gIH1cblxuICAuc2VjdGlvbi1zdWJ0aXRsZSB7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICB9XG5cbiAgLnNlbGVjdGlvbi1vcHRpb25zIHtcbiAgICBnYXA6IDEwcHg7XG5cbiAgICAuc2VsZWN0aW9uLW9wdGlvbiB7XG4gICAgICBwYWRkaW5nOiAxNnB4IDE4cHg7XG4gICAgfVxuICB9XG5cbiAgLnNpZ251cC1mb290ZXIgLmZvb3Rlci1idXR0b25zIHtcbiAgICBwYWRkaW5nOiAxNXB4IDMwcHg7XG4gIH1cblxuICAubmF2LWJ1dHRvbiB7XG4gICAgLS1wYWRkaW5nLXRvcDogMTZweDtcbiAgICAtLXBhZGRpbmctYm90dG9tOiAxNnB4O1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcbiAgLmF1dGgtY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiAzMHB4IDIwcHg7XG4gIH1cblxuICAubG9nby1zZWN0aW9uIHtcbiAgICBtYXJnaW4tYm90dG9tOiAyNXB4O1xuXG4gICAgLmxvZ28taW1hZ2Uge1xuICAgICAgd2lkdGg6IDM1dnc7XG4gICAgICBtaW4td2lkdGg6IDI1MHB4O1xuICAgIH1cblxuICAgIC5hcHAtdGl0bGUge1xuICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgIH1cbiAgfVxuXG4gIC5pbnB1dC1ncm91cCAuaW5wdXQtZmllbGQge1xuICAgIHBhZGRpbmc6IDE2cHggNTBweCAxNnB4IDQ1cHg7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICB9XG5cbiAgLmFjdGlvbi1idXR0b25zIHtcbiAgICAubmV4dC1idXR0b24sXG4gICAgLnNpZ251cC1idXR0b24sXG4gICAgLmJhY2stYnV0dG9uIHtcbiAgICAgIGhlaWdodDogNTJweDtcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICB9XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtaGVpZ2h0OiA3MDBweCkge1xuICAuYXV0aC1jb250ZW50IHtcbiAgICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgICBwYWRkaW5nLXRvcDogMXJlbTtcbiAgfVxuXG4gIC5hdXRoLWNvbnRhaW5lciB7XG4gICAgcGFkZGluZzogMjBweCAyNXB4O1xuICB9XG5cbiAgLmxvZ28tc2VjdGlvbiB7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgfVxufVxuXG4vLyBDaGVja2JveCBTZWN0aW9uXG4uY2hlY2tib3gtc2VjdGlvbiB7XG4gIG1hcmdpbjogMjVweCAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDE2cHg7XG59XG5cbi5jaGVja2JveC1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDE0cHg7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWJnLXRlcnRpYXJ5KTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4wOHMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMnMgZWFzZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTgpO1xuICB9XG5cbiAgJi5oYXMtZXJyb3Ige1xuICAgIGJvcmRlci1jb2xvcjogI2ZmNDQ0NDtcbiAgfVxuXG4gIC5tb2Rlcm4tY2hlY2tib3gge1xuICAgIG1hcmdpbi1yaWdodDogMTJweDtcbiAgICAtLXNpemU6IDIycHg7XG4gICAgLS1jaGVja2JveC1iYWNrZ3JvdW5kLWNoZWNrZWQ6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgICAtLWJvcmRlci1jb2xvci1jaGVja2VkOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gICAgLS1jaGVja21hcmstY29sb3I6IHdoaXRlO1xuICB9XG5cbiAgLmNoZWNrYm94LWxhYmVsIHtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgY29sb3I6IHZhcigtLXRleHQtcHJpbWFyeSk7XG4gICAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgfVxuXG4gIC5jaGVja2JveC1saW5rIHtcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICB9XG5cbiAgLmNoZWNrYm94LWljb24ge1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuICB9XG59XG5cbi5jaGVja2JveC1ncm91cCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG5cbiAgaW9uLWNoZWNrYm94IHtcbiAgICBtYXJnaW4tcmlnaHQ6IDEycHg7XG4gICAgLS1zaXplOiAxOHB4O1xuICAgIC0tY2hlY2tib3gtYmFja2dyb3VuZC1jaGVja2VkOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gICAgLS1ib3JkZXItY29sb3ItY2hlY2tlZDogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgIC0tY2hlY2ttYXJrLWNvbG9yOiB3aGl0ZTtcbiAgfVxuXG4gIC5jaGVja2JveC1sYWJlbCB7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gICAgbGluZS1oZWlnaHQ6IDEuNDtcblxuICAgIC5jaGVja2JveC1saW5rIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgIH1cbiAgfVxufVxuXG4vLyBTdWJtaXQgQnV0dG9uXG5cbi5zdWJtaXQtYnV0dG9uIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG5cbiAgLS1jb2xvcjogd2hpdGU7XG4gIC0tYm9yZGVyLXJhZGl1czogMTJweDtcbiAgLS1ib3gtc2hhZG93OiAwIDRweCAxNXB4IHJnYmEoMjU0LCAxNDQsIDAsIDAuMik7XG4gIC0tcGFkZGluZy10b3A6IDE2cHg7XG4gIC0tcGFkZGluZy1ib3R0b206IDE2cHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcblxuICAmOmRpc2FibGVkIHtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWJnLXRlcnRpYXJ5KTtcbiAgICAtLWNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gICAgLS1ib3gtc2hhZG93OiBub25lO1xuICAgIG9wYWNpdHk6IDAuNTtcbiAgfVxufVxuXG4vLyBGb290ZXIgZGUgbmF2ZWdhY2nDg8KzbiAoY29tcG9ydGFtaWVudG8gYmFzZSBwYXJhIHRvZGFzIGxhcyBwbGF0YWZvcm1hcylcbi5zaWdudXAtZm9vdGVyIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1iZy1zZWNvbmRhcnkpO1xuICAvLyBPdmVycmlkZSBnbG9iYWwgLmlvcyBpb24tZm9vdGVyIG1hcmdpbiBxdWUgYcODwrFhZGUgZXNwYWNpbyBwYXJhIHRhYi1iYXJcbiAgbWFyZ2luLWJvdHRvbTogMCAhaW1wb3J0YW50OyAvKiBhdW1lbnRhciBlc3BhY2lvIHBvciBkZWJham86IGJhc2UgZmlqbyArIHNhZmUtYXJlYSAqL1xuICBwYWRkaW5nLWJvdHRvbTogY2FsYygxMnB4ICsgZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20sIDBweCkpO1xuXG4gIC5mb290ZXItYnV0dG9ucyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBnYXA6IDEwcHg7XG4gICAgcGFkZGluZzogMTJweCAyNXB4O1xuICAgIHBhZGRpbmctYm90dG9tOiBjYWxjKDZweCArIGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tLCAwcHgpKTtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1iZy1zZWNvbmRhcnkpO1xuXG4gICAgJi5pcy1sYXN0LXNsaWRlIHtcbiAgICAgIHBhZGRpbmc6IDZweCAxMnB4O1xuICAgICAgcGFkZGluZy1ib3R0b206IGNhbGMoNnB4ICsgZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20sIDBweCkpO1xuICAgICAgZ2FwOiA2cHg7XG4gICAgfVxuICB9XG59XG5cbi8vIFNvbG8gZW4gaU9TIGFwbGljYW1vcyBlbCBhanVzdGUgZGluw4PCoW1pY28gY3VhbmRvIGFwYXJlY2UgZWwgdGVjbGFkb1xuOmhvc3QtY29udGV4dCguaW9zKSAuc2lnbnVwLWZvb3RlciB7XG4gIHBhZGRpbmctYm90dG9tOiBjYWxjKFxuICAgIDEycHggKyAwLjIyICogdmFyKC0ta2V5Ym9hcmQtaGVpZ2h0LCAwcHgpICsgZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20sIDBweClcbiAgKTtcblxuICAuZm9vdGVyLWJ1dHRvbnMge1xuICAgIHBhZGRpbmctYm90dG9tOiBjYWxjKFxuICAgICAgNnB4ICsgMC4yMiAqIHZhcigtLWtleWJvYXJkLWhlaWdodCwgMHB4KSArXG4gICAgICAgIGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tLCAwcHgpXG4gICAgKTtcblxuICAgICYuaXMtbGFzdC1zbGlkZSB7XG4gICAgICBwYWRkaW5nLWJvdHRvbTogY2FsYyhcbiAgICAgICAgNnB4ICsgMC4yMiAqIHZhcigtLWtleWJvYXJkLWhlaWdodCwgMHB4KSArXG4gICAgICAgICAgZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20sIDBweClcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbi8vIEFzZWd1cmFyIHF1ZSBsYSBww4PCoWdpbmEgdXNlIHRvZG8gZWwgYWx0byBkaXNwb25pYmxlXG46aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGhlaWdodDogMTAwJTtcblxuICBpb24tY29udGVudCB7XG4gICAgZmxleDogMTtcbiAgfVxuXG4gIGlvbi1mb290ZXIge1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICB9XG59XG5cbi5uYXYtYnV0dG9uIHtcbiAgZmxleDogMTtcbiAgLS1wYWRkaW5nLXRvcDogMTRweDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMTRweDtcbiAgLS1ib3JkZXItcmFkaXVzOiAxMHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBmb250LXNpemU6IDE0cHg7XG4gIHRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2U7XG4gIG1pbi13aWR0aDogMDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIG1hcmdpbjogMDtcblxuICAmLnByZXYge1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0tYmctdGVydGlhcnkpO1xuICAgIC0tY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgICAtLWJvcmRlci1jb2xvcjogdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xuICB9XG5cbiAgJi5uZXh0IHtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgICAtLWNvbG9yOiB3aGl0ZTtcbiAgICAtLWJveC1zaGFkb3c6IDAgNHB4IDE1cHggcmdiYSgyNTQsIDE0NCwgMCwgMC4yKTtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNTtcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICB9XG59XG5cbi8vIE1vZGFsIGJhY2tkcm9wXG46Om5nLWRlZXAgaW9uLW1vZGFsLm1vZGFsLWRlZmF1bHQuc2hvdy1tb2RhbCB+IGlvbi1tb2RhbC5tb2RhbC1kZWZhdWx0IHtcbiAgLS1iYWNrZHJvcC1vcGFjaXR5OiAwLjU7XG59XG5cbi8vIE1lZGlhIFF1ZXJpZXMgcGFyYSBSZXNwb25zaXZlIERlc2lnblxuXG4vLyBUYWJsZXRzICg3NjhweCAtIDEwMjRweClcbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAuYXV0aC1jb250YWluZXIge1xuICAgIG1heC13aWR0aDogNTAwcHg7XG4gICAgcGFkZGluZzogNTBweCA0MHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgbWFyZ2luOiAyMHB4IGF1dG87XG4gICAgbWluLWhlaWdodDogY2FsYygxMDB2aCAtIDQwcHgpO1xuICAgIGJveC1zaGFkb3c6IDAgMjBweCA0MHB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgfVxuXG4gIC5sb2dvLXNlY3Rpb24gLmxvZ28taW1hZ2Uge1xuICAgIHdpZHRoOiAzNXZ3O1xuICAgIG1heC13aWR0aDogNDAwcHg7XG4gICAgbWluLXdpZHRoOiAzMjBweDtcbiAgfVxuXG4gIC5mb3JtLWdyb3VwIHtcbiAgICBtYXJnaW4tYm90dG9tOiAyNXB4O1xuICB9XG5cbiAgLmlucHV0LWdyb3VwIC5pbnB1dC1maWVsZCB7XG4gICAgLmlucHV0LXdyYXBwZXIgJiB7XG4gICAgICBwYWRkaW5nOiAxOHB4IDIwcHggMThweCA1NXB4OyAvLyBBdW1lbnRhciBwYWRkaW5nLWxlZnQgcGFyYSBldml0YXIgc29sYXBhbWllbnRvIGNvbiBpY29ub3NcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICB9XG4gIH1cblxuICAuaW5wdXQtY29udGFpbmVyIGlvbi1pbnB1dCB7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAyMHB4O1xuICAgIC0tcGFkZGluZy1lbmQ6IDIwcHg7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICB9XG5cbiAgLnNlbGVjdGlvbi1jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDI1cHg7XG4gIH1cblxuICAuc2VsZWN0aW9uLWl0ZW0ge1xuICAgIHBhZGRpbmc6IDIwcHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgfVxuXG4gIC5vYmplY3RpdmUtaW5mbyB7XG4gICAgcGFkZGluZzogMjVweDtcbiAgfVxuXG4gIC5jYWxvcmllLXNlbGVjdG9yIHtcbiAgICBwYWRkaW5nOiAyNXB4O1xuICB9XG59XG5cbi8vIERlc2t0b3AgKDEwMjRweCspXG5AbWVkaWEgKG1pbi13aWR0aDogMTAyNHB4KSB7XG4gIC5hdXRoLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDQwcHggMjBweDtcbiAgfVxuXG4gIC5hdXRoLWNvbnRhaW5lciB7XG4gICAgbWF4LXdpZHRoOiA2MDBweDtcbiAgICBwYWRkaW5nOiA2MHB4IDUwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMjVweDtcbiAgfVxuXG4gIC5sb2dvLXNlY3Rpb24gLmxvZ28taW1hZ2Uge1xuICAgIHdpZHRoOiAzMHZ3O1xuICAgIG1heC13aWR0aDogNDUwcHg7XG4gICAgbWluLXdpZHRoOiAzNTBweDtcbiAgfVxuXG4gIC5mb3JtLWdyb3VwIHtcbiAgICBtYXJnaW4tYm90dG9tOiAzMHB4O1xuICB9XG5cbiAgLmlucHV0LWdyb3VwIC5pbnB1dC1maWVsZCB7XG4gICAgLmlucHV0LXdyYXBwZXIgJiB7XG4gICAgICBwYWRkaW5nOiAyMHB4IDI1cHggMjBweCA2MHB4OyAvLyBBdW1lbnRhciBwYWRkaW5nLWxlZnQgcGFyYSBldml0YXIgc29sYXBhbWllbnRvIGNvbiBpY29ub3NcbiAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICB9XG4gIH1cblxuICAuaW5wdXQtY29udGFpbmVyIGlvbi1pbnB1dCB7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAyNXB4O1xuICAgIC0tcGFkZGluZy1lbmQ6IDI1cHg7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIG1pbi1oZWlnaHQ6IDYwcHg7XG4gIH1cblxuICAuc2VsZWN0aW9uLWNvbnRhaW5lciB7XG4gICAgcGFkZGluZzogMzBweDtcbiAgfVxuXG4gIC5zZWxlY3Rpb24taXRlbSB7XG4gICAgcGFkZGluZzogMjVweDtcbiAgICBtYXJnaW4tYm90dG9tOiAyNXB4O1xuICB9XG5cbiAgLm9iamVjdGl2ZS1pbmZvIHtcbiAgICBwYWRkaW5nOiAzMHB4O1xuICB9XG5cbiAgLmNhbG9yaWUtc2VsZWN0b3Ige1xuICAgIHBhZGRpbmc6IDMwcHg7XG4gIH1cblxuICAuc2lnbnVwLXN3aXBlciB7XG4gICAgLnN3aXBlci1idXR0b24tcHJldixcbiAgICAuc3dpcGVyLWJ1dHRvbi1uZXh0IHtcbiAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgaGVpZ2h0OiA1MHB4O1xuXG4gICAgICAmOjphZnRlciB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gTGFyZ2UgRGVza3RvcCAoMTQ0MHB4KylcbkBtZWRpYSAobWluLXdpZHRoOiAxNDQwcHgpIHtcbiAgLmF1dGgtY29udGFpbmVyIHtcbiAgICBtYXgtd2lkdGg6IDcwMHB4O1xuICAgIHBhZGRpbmc6IDcwcHggNjBweDtcbiAgfVxuXG4gIC5sb2dvLXNlY3Rpb24gLmxvZ28taW1hZ2Uge1xuICAgIHdpZHRoOiAyNXZ3O1xuICAgIG1heC13aWR0aDogNTAwcHg7XG4gIH1cblxuICAuaW5wdXQtZ3JvdXAgLmlucHV0LWZpZWxkIHtcbiAgICAuaW5wdXQtd3JhcHBlciAmIHtcbiAgICAgIHBhZGRpbmc6IDIycHggMzBweCAyMnB4IDY1cHg7IC8vIEF1bWVudGFyIHBhZGRpbmctbGVmdCBwYXJhIGV2aXRhciBzb2xhcGFtaWVudG8gY29uIGljb25vc1xuICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgIH1cbiAgfVxuXG4gIC5pbnB1dC1jb250YWluZXIgaW9uLWlucHV0IHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgbWluLWhlaWdodDogNjVweDtcbiAgfVxufVxuXG4vLyBNb2JpbGUgbGFuZHNjYXBlXG5AbWVkaWEgKG1heC1oZWlnaHQ6IDYwMHB4KSBhbmQgKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpIHtcbiAgLmF1dGgtY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiAyMHB4IDI1cHg7XG4gIH1cblxuICAubG9nby1zZWN0aW9uIC5sb2dvLWltYWdlIHtcbiAgICB3aWR0aDogMjV2dztcbiAgICBtYXgtd2lkdGg6IDIwMHB4O1xuICAgIG1pbi13aWR0aDogMTUwcHg7XG4gIH1cblxuICAuZm9ybS1ncm91cCB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTVweDtcbiAgfVxuXG4gIC5zZWxlY3Rpb24tY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiAxNXB4O1xuICB9XG5cbiAgLnNlbGVjdGlvbi1pdGVtIHtcbiAgICBwYWRkaW5nOiAxNXB4O1xuICAgIG1hcmdpbi1ib3R0b206IDE1cHg7XG4gIH1cbn1cblxuLy8gU21hbGwgbW9iaWxlIGRldmljZXNcbkBtZWRpYSAobWF4LXdpZHRoOiAzNzVweCkge1xuICAuYXV0aC1jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDMwcHggMjBweDtcbiAgfVxuXG4gIC5sb2dvLXNlY3Rpb24gLmxvZ28taW1hZ2Uge1xuICAgIHdpZHRoOiA0NXZ3O1xuICAgIG1pbi13aWR0aDogMjUwcHg7XG4gIH1cblxuICAuaW5wdXQtY29udGFpbmVyIGlvbi1pbnB1dCB7XG4gICAgLS1wYWRkaW5nLXN0YXJ0OiAxNXB4O1xuICAgIC0tcGFkZGluZy1lbmQ6IDE1cHg7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICB9XG5cbiAgLnNlbGVjdGlvbi1jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDE1cHg7XG4gIH1cblxuICAuc2VsZWN0aW9uLWl0ZW0ge1xuICAgIHBhZGRpbmc6IDE1cHg7XG4gIH1cbn1cblxuLy8gUGFudGFsbGFzIGNvbiBhbHR1cmEgcmVkdWNpZGEgKG1lbm9zIGRlIDcwMHB4KVxuQG1lZGlhIChtYXgtaGVpZ2h0OiA3MDBweCkge1xuICAuYXV0aC1jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDE1cHggMjVweCAxMHB4IDI1cHg7XG4gIH1cblxuICAuc2VjdGlvbi10aXRsZSB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDZweDtcbiAgfVxuXG4gIC5zZWN0aW9uLXN1YnRpdGxlIHtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTVweDtcbiAgfVxuXG4gIC5zZWxlY3Rpb24tb3B0aW9ucyB7XG4gICAgZ2FwOiA2cHg7XG5cbiAgICAuc2VsZWN0aW9uLW9wdGlvbiB7XG4gICAgICBwYWRkaW5nOiAxMHB4IDE0cHg7XG4gICAgfVxuICB9XG5cbiAgLnNlbGVjdGlvbi10aXRsZSB7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIG1hcmdpbi1ib3R0b206IDJweDtcbiAgfVxuXG4gIC5zZWxlY3Rpb24tZGVzYyB7XG4gICAgZm9udC1zaXplOiAxMXB4O1xuICB9XG5cbiAgLnNpZ251cC1mb290ZXIgLmZvb3Rlci1idXR0b25zIHtcbiAgICBwYWRkaW5nOiAxMHB4IDI1cHg7XG4gICAgcGFkZGluZy1ib3R0b206IGNhbGMoOHB4ICsgZW52KHNhZmUtYXJlYS1pbnNldC1ib3R0b20sIDBweCkpO1xuICB9XG5cbiAgLm5hdi1idXR0b24ge1xuICAgIC0tcGFkZGluZy10b3A6IDEycHg7XG4gICAgLS1wYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gIH1cbn1cblxuLy8gUGFudGFsbGFzIG11eSBjb3J0YXMgKG1lbm9zIGRlIDYwMHB4IGRlIGFsdHVyYSlcbkBtZWRpYSAobWF4LWhlaWdodDogNjAwcHgpIHtcbiAgLmF1dGgtY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiAxMHB4IDI1cHggOHB4IDI1cHg7XG4gIH1cblxuICAuc2VjdGlvbi10aXRsZSB7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIG1hcmdpbi1ib3R0b206IDRweDtcbiAgfVxuXG4gIC5zZWN0aW9uLXN1YnRpdGxlIHtcbiAgICBmb250LXNpemU6IDExcHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgfVxuXG4gIC5zZWxlY3Rpb24tb3B0aW9ucyB7XG4gICAgZ2FwOiA0cHg7XG5cbiAgICAuc2VsZWN0aW9uLW9wdGlvbiB7XG4gICAgICBwYWRkaW5nOiA4cHggMTJweDtcbiAgICB9XG4gIH1cblxuICAuc2VsZWN0aW9uLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMXB4O1xuICB9XG5cbiAgLnNlbGVjdGlvbi1kZXNjIHtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gIH1cblxuICAuc2lnbnVwLWZvb3RlciAuZm9vdGVyLWJ1dHRvbnMge1xuICAgIHBhZGRpbmc6IDhweCAyNXB4O1xuICAgIHBhZGRpbmctYm90dG9tOiBjYWxjKDZweCArIGVudihzYWZlLWFyZWEtaW5zZXQtYm90dG9tLCAwcHgpKTtcbiAgICBnYXA6IDhweDtcbiAgfVxuXG4gIC5uYXYtYnV0dG9uIHtcbiAgICAtLXBhZGRpbmctdG9wOiAxMHB4O1xuICAgIC0tcGFkZGluZy1ib3R0b206IDEwcHg7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICB9XG59XG5cbi8vIEV4dHJhIFNtYWxsIE1vYmlsZSAoMzIwcHggLSAzNzRweClcbkBtZWRpYSAobWF4LXdpZHRoOiAzNzRweCkge1xuICAuYXV0aC1jb250YWluZXIge1xuICAgIHBhZGRpbmc6IDE1cHggMTVweCAyMHB4IDE1cHg7XG4gIH1cblxuICAubG9nby1zZWN0aW9uIC5sb2dvLWltYWdlIHtcbiAgICB3aWR0aDogNDV2dztcbiAgICBtYXgtd2lkdGg6IDI4MHB4O1xuICAgIG1pbi13aWR0aDogMjAwcHg7XG4gIH1cblxuICAuZm9ybS1maWVsZHMge1xuICAgIGdhcDogMTJweDtcbiAgfVxuXG4gIC5pbnB1dC1jb250YWluZXIgaW9uLWlucHV0IHtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDQ1cHg7XG4gICAgLS1wYWRkaW5nLWVuZDogMTVweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gIH1cblxuICAuc2VjdGlvbi10aXRsZSB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDZweDtcbiAgfVxuXG4gIC5zZWN0aW9uLXN1YnRpdGxlIHtcbiAgICBmb250LXNpemU6IDEycHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTVweDtcbiAgfVxuXG4gIC5zZWxlY3Rpb24tb3B0aW9ucyB7XG4gICAgZ2FwOiA2cHg7XG5cbiAgICAuc2VsZWN0aW9uLW9wdGlvbiB7XG4gICAgICBwYWRkaW5nOiAxMHB4IDEycHg7XG4gICAgfVxuICB9XG5cbiAgLnNlbGVjdGlvbi10aXRsZSB7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICB9XG5cbiAgLnNlbGVjdGlvbi1kZXNjIHtcbiAgICBmb250LXNpemU6IDExcHg7XG4gIH1cblxuICAuc2lnbnVwLWZvb3RlciAuZm9vdGVyLWJ1dHRvbnMge1xuICAgIGdhcDogOHB4O1xuICAgIHBhZGRpbmc6IDEwcHggMTVweDtcbiAgICBwYWRkaW5nLWJvdHRvbTogY2FsYyg4cHggKyBlbnYoc2FmZS1hcmVhLWluc2V0LWJvdHRvbSwgMHB4KSk7XG4gIH1cblxuICAubmF2LWJ1dHRvbiB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIC0tcGFkZGluZy10b3A6IDEycHg7XG4gICAgLS1wYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgfVxuXG4gIC5sb2dpbi1idXR0b24ge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgfVxuXG4gIC5mb3Jnb3QtcGFzc3dvcmQge1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgfVxuXG4gIC5zaWdudXAtbGluayB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICB9XG59XG5cbi8vIC0tLS0tLSBFU1RJTE9TIE1PREVSTk9TIChGSUNIQSBZIFZFUklGSUNBQ0nDg8KTTikgLS0tLS0tXG5cbi5zdGF0cy1jYXJkLW1vZGVybiB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWJnLXRlcnRpYXJ5KTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBtYXJnaW46IDE2cHggMDtcbiAgcGFkZGluZzogMDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgXG4gIC5jYXJkLWhlYWRlci1tb2Rlcm4ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZ2FwOiAxMnB4O1xuICAgIHBhZGRpbmc6IDEycHggMTZweDtcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgICB9XG4gICAgXG4gICAgLmNhcmQtdGl0bGUtbW9kZXJuIHtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICBsZXR0ZXItc3BhY2luZzogMC41cHg7XG4gICAgfVxuICB9XG4gIFxuICAuc3RhdHMtZ3JpZC1tb2Rlcm4ge1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg0LCAxZnIpO1xuICAgIGdhcDogOHB4O1xuICAgIFxuICAgIC5zdGF0LWl0ZW0tbW9kZXJuIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogNnB4O1xuICAgICAgXG4gICAgICBpb24taWNvbiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgICAgY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLnN0YXQtdmFsdWUtbW9kZXJuIHtcbiAgICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLnN0YXQtbGFiZWwtbW9kZXJuIHtcbiAgICAgICAgZm9udC1zaXplOiAxMHB4O1xuICAgICAgICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICBsZXR0ZXItc3BhY2luZzogMC4zcHg7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLmluZm8tY2FyZC1tb2Rlcm4ge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1iZy10ZXJ0aWFyeSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1wcmltYXJ5KTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgcGFkZGluZzogMDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgXG4gIC5jYXJkLWhlYWRlci1tb2Rlcm4ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1wcmltYXJ5KTtcbiAgICBcbiAgICBpb24taWNvbiB7XG4gICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gICAgICBjb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgIH1cbiAgICBcbiAgICAuY2FyZC10aXRsZS1tb2Rlcm4ge1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICBsZXR0ZXItc3BhY2luZzogMC41cHg7XG4gICAgfVxuICB9XG4gIFxuICAuY2FyZC1jb250ZW50LW1vZGVybiB7XG4gICAgcGFkZGluZzogMTZweDtcbiAgICBcbiAgICAuYWN0aXZpdHktbmFtZS1tb2Rlcm4ge1xuICAgICAgZm9udC1zaXplOiAxNXB4O1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgICB9XG4gIH1cbiAgXG4gICYub2JqZWN0aXZlLWNhcmQtbW9kZXJuIHtcbiAgICAub2JqZWN0aXZlLWNvbnRlbnQtbW9kZXJuIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIFxuICAgICAgLm9iamVjdGl2ZS1tZXNzYWdlLW1vZGVybiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgICAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xuICAgICAgfVxuICAgICAgXG4gICAgICAuY2Fsb3JpZXMtbW9kZXJuIHtcbiAgICAgICAgZm9udC1zaXplOiAzMnB4O1xuICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgIFxuICAgICAgICAudW5pdC1tb2Rlcm4ge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDRweDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgJi53YXJuaW5nLWNhcmQtbW9kZXJuIHtcbiAgICAud2FybmluZy1jb250ZW50LW1vZGVybiB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgICBnYXA6IDEycHg7XG4gICAgICBcbiAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgZm9udC1zaXplOiAyOHB4O1xuICAgICAgICBjb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgICAgICBmbGV4LXNocmluazogMDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLndhcm5pbmctdGV4dC1tb2Rlcm4ge1xuICAgICAgICBmbGV4OiAxO1xuICAgICAgICBcbiAgICAgICAgaDUge1xuICAgICAgICAgIG1hcmdpbjogMCAwIDRweCAwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICAgIGxldHRlci1zcGFjaW5nOiAwLjVweDtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcCB7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgICAgICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLnZlcmlmaWNhdGlvbi13cmFwcGVyLW1vZGVybiB7XG4gIHBhZGRpbmc6IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi52ZXJpZmljYXRpb24tbWVzc2FnZS1tb2Rlcm4ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDI0cHg7XG4gIHBhZGRpbmc6IDIwcHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWJnLXRlcnRpYXJ5KTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xuXG4gIGlvbi1sYWJlbCB7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICBsaW5lLWhlaWdodDogMS41O1xuXG4gICAgc3Ryb25nIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gICAgfVxuICB9XG4gIFxuICAuc3BhbS13YXJuaW5nLW1vZGVybiB7XG4gICAgZm9udC1zaXplOiAxMnB4OyBcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpOyBcbiAgICBtYXJnaW4tdG9wOiAxMnB4OyBcbiAgICBtYXJnaW4tYm90dG9tOiAwOyBcbiAgICBkaXNwbGF5OiBmbGV4OyBcbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyBcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgXG4gICAgZ2FwOiA2cHg7XG4gICAgXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgIH1cbiAgfVxufVxuXG4uZm9ybS1maWVsZHMtbW9kZXJuIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAyMHB4O1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4uaW5wdXQtZ3JvdXAtbW9kZXJuIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA4cHg7XG59XG5cbi5pbnB1dC13cmFwcGVyLW1vZGVybiB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYmFja2dyb3VuZDogdmFyKC0tYmctdGVydGlhcnkpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItcHJpbWFyeSk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBhZGRpbmc6IDAgMTZweDtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcblxuICAmOmZvY3VzLXdpdGhpbiB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gIH1cblxuICAmLnZlcmlmaWNhdGlvbi1pbnB1dC1tb2Rlcm4ge1xuICAgIC52ZXJpZmljYXRpb24tZmllbGQtbW9kZXJuIHtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGxldHRlci1zcGFjaW5nOiA4cHg7XG4gICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgXG4gICAgICAmOjpwbGFjZWhvbGRlciB7XG4gICAgICAgIGxldHRlci1zcGFjaW5nOiA4cHg7XG4gICAgICAgIGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gICAgICAgIG9wYWNpdHk6IDAuNztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLmlucHV0LWljb24tbW9kZXJuIHtcbiAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgZm9udC1zaXplOiAyMHB4O1xuICBtYXJnaW4tcmlnaHQ6IDEycHg7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4uaW5wdXQtZmllbGQtbW9kZXJuIHtcbiAgZmxleDogMTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgb3V0bGluZTogbm9uZTtcbiAgY29sb3I6IHdoaXRlO1xuICBmb250LXNpemU6IDE2cHg7XG4gIHBhZGRpbmc6IDE2cHggMDtcbiAgd2lkdGg6IDEwMCU7XG5cbiAgJjpmb2N1cyB7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgfVxufVxuXG4udmVyaWZ5LWJ1dHRvbi1tb2Rlcm4ge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgLS1jb2xvcjogd2hpdGU7XG4gIC0tYm9yZGVyLXJhZGl1czogMTJweDtcbiAgLS1wYWRkaW5nLXRvcDogMTZweDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMTZweDtcbiAgaGVpZ2h0OiA1NnB4O1xuICBmb250LXdlaWdodDogNzAwO1xuICBmb250LXNpemU6IDE2cHg7XG4gIGxldHRlci1zcGFjaW5nOiAwLjVweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjU7XG4gIH1cbn1cblxuLnJlc2VuZC1jb250YWluZXItbW9kZXJuIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBcbiAgcCB7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICB9XG4gIFxuICBpb24tYnV0dG9uIHtcbiAgICAtLWNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gIH1cbn1cblxuLmZpbmFsaXplLWJ0biB7XG4gIC0tYm94LXNoYWRvdzogMCA0cHggMTVweCByZ2JhKDI1NCwgMTQ0LCAwLCAwLjQpO1xufVxuXG4uc2lnbnVwLW5vdGlmLWNhcmQge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDQpO1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NCwgMTQ0LCAwLCAwLjIpO1xuICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICBwYWRkaW5nOiAxNnB4O1xuICBtYXJnaW4tdG9wOiAxNnB4O1xuXG4gIC5zaWdudXAtbm90aWYtcm93IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGdhcDogMTJweDtcblxuICAgIC5zaWdudXAtbm90aWYtaW5mbyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogMTJweDtcblxuICAgICAgLnNpZ251cC1ub3RpZi1pY29uIHtcbiAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICBjb2xvcjogI2ZlOTAwMDtcbiAgICAgICAgbWluLXdpZHRoOiAyNHB4O1xuICAgICAgfVxuXG4gICAgICAuc2lnbnVwLW5vdGlmLWxhYmVsIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgY29sb3I6ICNmNGY0ZjU7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDJweDtcbiAgICAgIH1cblxuICAgICAgLnNpZ251cC1ub3RpZi1kZXNjIHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC5zaWdudXAtbm90aWYtZGl2aWRlciB7XG4gICAgaGVpZ2h0OiAxcHg7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4KTtcbiAgICBtYXJnaW46IDEycHggMDtcbiAgfVxuXG4gIC5zaWdudXAtbm90aWYtb3B0aW9uIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGdhcDogMTJweDtcbiAgICBwYWRkaW5nOiA0cHggMDtcblxuICAgIC5zaWdudXAtbm90aWYtb3B0aW9uLWxhYmVsIHtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBjb2xvcjogI2Y0ZjRmNTtcbiAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgfVxuXG4gICAgaW9uLXNlbGVjdCB7XG4gICAgICAtLXBhZGRpbmctc3RhcnQ6IDEwcHg7XG4gICAgICAtLXBhZGRpbmctZW5kOiAzMHB4O1xuICAgICAgLS1jb2xvcjogI2ZlOTAwMDtcbiAgICAgIG1pbi1oZWlnaHQ6IDM4cHg7XG4gICAgICB3aWR0aDogYXV0bztcbiAgICAgIG1heC13aWR0aDogMTYwcHg7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NCwgMTQ0LCAwLCAwLjI1KTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NCwgMTQ0LCAwLCAwLjA4KTtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgfVxuXG4gICAgLnNpZ251cC1ub3RpZi1zdGVwcGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgZ2FwOiA2cHg7XG5cbiAgICAgIGlvbi1idXR0b24ge1xuICAgICAgICAtLXBhZGRpbmctc3RhcnQ6IDZweDtcbiAgICAgICAgLS1wYWRkaW5nLWVuZDogNnB4O1xuICAgICAgICAtLWNvbG9yOiAjZmU5MDAwO1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIGhlaWdodDogMzJweDtcblxuICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC5zaWdudXAtc3RlcHBlci12YWx1ZSB7XG4gICAgICAgIG1pbi13aWR0aDogMjRweDtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgIGNvbG9yOiAjZmU5MDAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC5zaWdudXAtdGltZS1kaXNwbGF5IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG4gICAgcGFkZGluZzogNnB4IDE0cHg7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NCwgMTQ0LCAwLCAwLjA4KTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NCwgMTQ0LCAwLCAwLjI1KTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgICBjb2xvcjogI2ZlOTAwMDtcbiAgICB9XG5cbiAgICBzcGFuIHtcbiAgICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBjb2xvcjogI2ZlOTAwMDtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAwLjVweDtcbiAgICB9XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
}));


/***/ }),

/***/ 49903:
/*!**********************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/constants/objetives.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJETIVES: () => (/* binding */ OBJETIVES),
/* harmony export */   OBJETIVES_VALUES: () => (/* binding */ OBJETIVES_VALUES),
/* harmony export */   OBJETIVE_TYPES: () => (/* binding */ OBJETIVE_TYPES)
/* harmony export */ });
var OBJETIVE_TYPES;
(function (OBJETIVE_TYPES) {
  OBJETIVE_TYPES[OBJETIVE_TYPES["gain"] = 0] = "gain";
  OBJETIVE_TYPES[OBJETIVE_TYPES["maintenance"] = 1] = "maintenance";
  OBJETIVE_TYPES[OBJETIVE_TYPES["loss"] = 2] = "loss";
})(OBJETIVE_TYPES || (OBJETIVE_TYPES = {}));
const OBJETIVES = {
  [OBJETIVE_TYPES.gain]: {
    id: OBJETIVE_TYPES.gain,
    name: 'OBJETIVES.GAIN_WEIGHT',
    key: 'superávit',
    value: 300
  },
  [OBJETIVE_TYPES.maintenance]: {
    id: OBJETIVE_TYPES.maintenance,
    name: 'OBJETIVES.MAINTAIN_WEIGHT',
    key: 'mantenimiento',
    value: 0
  },
  [OBJETIVE_TYPES.loss]: {
    id: OBJETIVE_TYPES.loss,
    name: 'OBJETIVES.LOSE_WEIGHT',
    key: 'déficit',
    value: -300
  }
};
const OBJETIVES_VALUES = Object.values(OBJETIVES);

/***/ }),

/***/ 58163:
/*!*********************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/constants/training.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TRAINING_TYPES: () => (/* binding */ TRAINING_TYPES),
/* harmony export */   calculateTrainingValues: () => (/* binding */ calculateTrainingValues)
/* harmony export */ });
/* harmony import */ var _steps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./steps */ 2923);

var TRAINING_TYPES;
(function (TRAINING_TYPES) {
  TRAINING_TYPES[TRAINING_TYPES["veryLight"] = 1] = "veryLight";
  TRAINING_TYPES[TRAINING_TYPES["light"] = 2] = "light";
  TRAINING_TYPES[TRAINING_TYPES["moderate"] = 3] = "moderate";
  TRAINING_TYPES[TRAINING_TYPES["active"] = 4] = "active";
})(TRAINING_TYPES || (TRAINING_TYPES = {}));
const calculateTrainingValues = selectedStep => {
  switch (selectedStep) {
    case _steps__WEBPACK_IMPORTED_MODULE_0__.STEPS[_steps__WEBPACK_IMPORTED_MODULE_0__.STEPS_TYPES.notCounted].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'TRAINING.NONE',
          value: 1
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: 'TRAINING.ONE_OR_TWO',
          value: 1.02
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: 'TRAINING.THREE_OR_FOUR',
          value: 1.05
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: 'TRAINING.FIVE_OR_SIX',
          value: 1.07
        }
      };
    case _steps__WEBPACK_IMPORTED_MODULE_0__.STEPS[_steps__WEBPACK_IMPORTED_MODULE_0__.STEPS_TYPES.lessThan1000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'TRAINING.NONE',
          value: 1.0862
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: 'TRAINING.ONE_OR_TWO',
          value: 1.107
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: 'TRAINING.THREE_OR_FOUR',
          value: 1.14
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: 'TRAINING.FIVE_OR_SIX',
          value: 1.162
        }
      };
    case _steps__WEBPACK_IMPORTED_MODULE_0__.STEPS[_steps__WEBPACK_IMPORTED_MODULE_0__.STEPS_TYPES.between2000And6000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'TRAINING.NONE',
          value: 1.24
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: 'TRAINING.ONE_OR_TWO',
          value: 1.264
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: 'TRAINING.THREE_OR_FOUR',
          value: 1.301
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: 'TRAINING.FIVE_OR_SIX',
          value: 1.326
        }
      };
    case _steps__WEBPACK_IMPORTED_MODULE_0__.STEPS[_steps__WEBPACK_IMPORTED_MODULE_0__.STEPS_TYPES.between7000And9000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'TRAINING.NONE',
          value: 1.321
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: 'TRAINING.ONE_OR_TWO',
          value: 1.348
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: 'TRAINING.THREE_OR_FOUR',
          value: 1.387
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: 'TRAINING.FIVE_OR_SIX',
          value: 1.413
        }
      };
    case _steps__WEBPACK_IMPORTED_MODULE_0__.STEPS[_steps__WEBPACK_IMPORTED_MODULE_0__.STEPS_TYPES.betweenThan10000And15000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'TRAINING.NONE',
          value: 1.402
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: 'TRAINING.ONE_OR_TWO',
          value: 1.431
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: 'TRAINING.THREE_OR_FOUR',
          value: 1.472
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: 'TRAINING.FIVE_OR_SIX',
          value: 1.5
        }
      };
    case _steps__WEBPACK_IMPORTED_MODULE_0__.STEPS[_steps__WEBPACK_IMPORTED_MODULE_0__.STEPS_TYPES.betweenThan16000And18000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'TRAINING.NONE',
          value: 1.547
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: 'TRAINING.ONE_OR_TWO',
          value: 1.578
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: 'TRAINING.THREE_OR_FOUR',
          value: 1.625
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: 'TRAINING.FIVE_OR_SIX',
          value: 1.655
        }
      };
    case _steps__WEBPACK_IMPORTED_MODULE_0__.STEPS[_steps__WEBPACK_IMPORTED_MODULE_0__.STEPS_TYPES.moreThan19000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'TRAINING.NONE',
          value: 1.683
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: 'TRAINING.ONE_OR_TWO',
          value: 1.717
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: 'TRAINING.THREE_OR_FOUR',
          value: 1.767
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: 'TRAINING.FIVE_OR_SIX',
          value: 1.801
        }
      };
    // Agregar más casos según sea necesario para otros valores de STEPS_TYPES
    default:
      return null;
    // Valor por defecto o un objeto vacío
  }
};

/***/ })

}]);
//# sourceMappingURL=packages_shared-features_src_app_features_authentication_components_sign-up_sign-up_module_ts.js.map