"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["packages_shared-features_src_app_features_authentication_authentication_module_ts"],{

/***/ 89255:
/*!*******************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/authentication/authentication-routing.module.ts ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthenticationPageRoutingModule: () => (/* binding */ AuthenticationPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _components_sign_in_sign_in_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/sign-in/sign-in.page */ 84905);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _AuthenticationPageRoutingModule;




const routes = [{
  path: '',
  component: _components_sign_in_sign_in_page__WEBPACK_IMPORTED_MODULE_1__.SignInPage
}, {
  path: 'sign-up',
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("packages_shared-features_src_app_features_authentication_components_sign-up_sign-up_module_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/sign-up/sign-up.module */ 32690)).then(m => m.SignUpPageModule)
}, {
  path: 'restore-password',
  loadChildren: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("packages_shared-features_src_app_features_authentication_components_restore-password_restore--cdba96")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/restore-password/restore-password.module */ 93816)).then(m => m.RestorePasswordPageModule)
}];
class AuthenticationPageRoutingModule {}
_AuthenticationPageRoutingModule = AuthenticationPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthenticationPageRoutingModule, "\u0275fac", function AuthenticationPageRoutingModule_Factory(t) {
  return new (t || _AuthenticationPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthenticationPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _AuthenticationPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthenticationPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AuthenticationPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 93494:
/*!***********************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/authentication/authentication.module.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthenticationPageModule: () => (/* binding */ AuthenticationPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _authentication_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./authentication-routing.module */ 89255);
/* harmony import */ var _components_sign_in_sign_in_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/sign-in/sign-in.page */ 84905);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);

var _AuthenticationPageModule;




class AuthenticationPageModule {}
_AuthenticationPageModule = AuthenticationPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthenticationPageModule, "\u0275fac", function AuthenticationPageModule_Factory(t) {
  return new (t || _AuthenticationPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthenticationPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _AuthenticationPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AuthenticationPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _authentication_routing_module__WEBPACK_IMPORTED_MODULE_2__.AuthenticationPageRoutingModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AuthenticationPageModule, {
    declarations: [_components_sign_in_sign_in_page__WEBPACK_IMPORTED_MODULE_3__.SignInPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _authentication_routing_module__WEBPACK_IMPORTED_MODULE_2__.AuthenticationPageRoutingModule]
  });
})();

/***/ }),

/***/ 84905:
/*!*********************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/authentication/components/sign-in/sign-in.page.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignInPage: () => (/* binding */ SignInPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var src_app_core_services_auth_auth_error_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/auth/auth-error.service */ 68063);
/* harmony import */ var src_app_shared_constants_social_network__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/constants/social-network */ 17750);
/* harmony import */ var src_app_shared_models_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/models/theme */ 20544);
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment */ 17762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ionic/angular */ 45398);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/auth/auth.service */ 74048);
/* harmony import */ var src_app_core_services_util_theme_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/util/theme.service */ 18341);
/* harmony import */ var src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/services/util/navigation.service */ 22938);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var src_app_core_services_auth_pending_email_verification_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/core/services/auth/pending-email-verification.service */ 72);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var src_app_core_services_auth_google_auth_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/core/services/auth/google-auth.service */ 55334);
/* harmony import */ var src_app_core_services_auth_apple_auth_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/core/services/auth/apple-auth.service */ 70491);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var src_app_core_directives_lowercase_email_input_directive__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/core/directives/lowercase-email-input.directive */ 24436);


var _SignInPage;





















function SignInPage_header_3_p_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "p", 11)(1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](2, "Trainers");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
  }
}
function SignInPage_header_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "header", 7)(1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](2, "img", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](3, SignInPage_header_3_p_3_Template, 3, 0, "p", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r0.isTrainerApp);
  }
}
function SignInPage_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "ion-spinner", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](4, 1, "SIGN_IN.VERIFYING_CREDENTIALS"));
  }
}
function SignInPage_div_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](1, "ion-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵclassProp"]("login-feedback--retryable", ctx_r4.isLoginErrorRetryable);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("name", ctx_r4.loginErrorIcon);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](ctx_r4.error);
  }
}
function SignInPage_div_6_div_7_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 1, "SIGN_IN.EMAIL_REQUIRED_VALIDATION"));
  }
}
function SignInPage_div_6_div_7_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 1, "SIGN_IN.EMAIL_VALID_VALIDATION"));
  }
}
function SignInPage_div_6_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, SignInPage_div_6_div_7_span_1_Template, 3, 3, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](2, SignInPage_div_6_div_7_span_2_Template, 3, 3, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    let tmp_0_0;
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", (tmp_0_0 = ctx_r5.loginForm.get("email")) == null ? null : tmp_0_0.errors == null ? null : tmp_0_0.errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx_r5.loginForm.get("email")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["email"]);
  }
}
function SignInPage_div_6_div_16_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 1, "SIGN_IN.PASSWORD_REQUIRED_VALIDATION"));
  }
}
function SignInPage_div_6_div_16_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](2, 1, "SIGN_IN.PASSWORD_MINLENGTH_VALIDATION"));
  }
}
function SignInPage_div_6_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, SignInPage_div_6_div_16_span_1_Template, 3, 3, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](2, SignInPage_div_6_div_16_span_2_Template, 3, 3, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    let tmp_0_0;
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", (tmp_0_0 = ctx_r7.loginForm.get("password")) == null ? null : tmp_0_0.errors == null ? null : tmp_0_0.errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx_r7.loginForm.get("password")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["minlength"]);
  }
}
function SignInPage_div_6_button_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function SignInPage_div_6_button_28_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r14.signInWithGoogle());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "svg", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](3, "path", 43)(4, "path", 44)(5, "path", 45)(6, "path", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](7, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("disabled", ctx_r8.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](9, 2, "SIGN_IN.CONTINUE_WITH_GOOGLE"));
  }
}
function SignInPage_div_6_button_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "button", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function SignInPage_div_6_button_29_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r17);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r16.signInWithApple());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](1, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "svg", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](3, "path", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnamespaceHTML"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](4, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("disabled", ctx_r9.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](6, 2, "SIGN_IN.CONTINUE_WITH_APPLE"));
  }
}
function SignInPage_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](1, SignInPage_div_6_div_1_Template, 4, 4, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](2, "div", 18)(3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](4, "ion-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](5, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("keydown.enter", function SignInPage_div_6_Template_input_keydown_enter_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r19);
      const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵreference"](12);
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](_r6.focus());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](7, SignInPage_div_6_div_7_Template, 3, 2, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](8, "div", 18)(9, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](10, "ion-icon", 23)(11, "input", 24, 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](14, "ion-button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function SignInPage_div_6_Template_ion_button_click_14_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r19);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r20.showPass = !ctx_r20.showPass);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelement"](15, "ion-icon", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](16, SignInPage_div_6_div_16_Template, 3, 2, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](17, "div", 28)(18, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function SignInPage_div_6_Template_button_click_18_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r19);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r21.goToRestorePass());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](21, "ion-button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](24, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](26, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](27, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](28, SignInPage_div_6_button_28_Template, 10, 4, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](29, SignInPage_div_6_button_29_Template, 7, 4, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](30, "p", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](31);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](32, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](33, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("click", function SignInPage_div_6_Template_button_click_33_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵrestoreView"](_r19);
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵresetView"](ctx_r22.navigateSignUp());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtext"](34);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipe"](35, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵnextContext"]();
    let tmp_3_0;
    let tmp_8_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r2.error);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵclassProp"]("input-wrapper--auth-error", ctx_r2.loginErrorKind === "invalid-credentials");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](6, 19, "SIGN_IN.EMAIL_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ((tmp_3_0 = ctx_r2.loginForm.get("email")) == null ? null : tmp_3_0.invalid) && ((tmp_3_0 = ctx_r2.loginForm.get("email")) == null ? null : tmp_3_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵclassProp"]("input-wrapper--auth-error", ctx_r2.loginErrorKind === "invalid-credentials");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("type", ctx_r2.showPass ? "text" : "password")("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](13, 21, "SIGN_IN.PASSWORD_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("name", ctx_r2.showPass ? "eye-off-outline" : "eye-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ((tmp_8_0 = ctx_r2.loginForm.get("password")) == null ? null : tmp_8_0.invalid) && ((tmp_8_0 = ctx_r2.loginForm.get("password")) == null ? null : tmp_8_0.touched));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](20, 23, "SIGN_IN.FORGOT_PASSWORD"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("disabled", ctx_r2.loading || ctx_r2.loginForm.invalid);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](23, 25, "SIGN_IN.LOGIN"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](26, 27, "SIGN_IN.OR_ACCESS_WITH"));
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r2.isAndroid || ctx_r2.isApple);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx_r2.isApple);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](32, 29, "SIGN_IN.NO_ACCOUNT"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵpipeBind1"](35, 31, "SIGN_IN.CREATE_ACCOUNT"), " ");
  }
}
class SignInPage {
  constructor(_platform, fb, cdr, route, router, authService, themeService, navigationService, ionicUtilService, authErrorService, pendingEmailVerificationService, userService, _googleAuthService, _appleAuthService, translate) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_platform", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "fb", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "cdr", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "route", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "authService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "themeService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "navigationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "authErrorService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "pendingEmailVerificationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "userService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_googleAuthService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_appleAuthService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "translate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "loginForm", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "user", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "loading", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "theme", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "showPass", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "showLogo", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "hasFormFocus", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isApple", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isAndroid", void 0);
    // Este sign-in es compartido literalmente (mismo archivo) entre las 3
    // apps vía path alias — environment.auth.clientFamily es lo único que
    // distingue en qué build se está compilando, ver environment.ts de cada app.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isTrainerApp", src_environments_environment__WEBPACK_IMPORTED_MODULE_5__.environment.auth?.clientFamily === 'trainfit-trainers');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "error", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "loginErrorKind", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isLoginErrorRetryable", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "logoSyncTimeoutId", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "THEMES", src_app_shared_models_theme__WEBPACK_IMPORTED_MODULE_4__.Theme);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "SOCIAL_NETWORKS", src_app_shared_constants_social_network__WEBPACK_IMPORTED_MODULE_3__.SOCIAL_NETWORKS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "SOCIAL_NETWORK_TYPES", src_app_shared_constants_social_network__WEBPACK_IMPORTED_MODULE_3__.SOCIAL_NETWORK_TYPES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "SOCIAL_NETWORK_VALUES", src_app_shared_constants_social_network__WEBPACK_IMPORTED_MODULE_3__.SOCIAL_NETWORK_VALUES);
    this._platform = _platform;
    this.fb = fb;
    this.cdr = cdr;
    this.route = route;
    this.router = router;
    this.authService = authService;
    this.themeService = themeService;
    this.navigationService = navigationService;
    this.ionicUtilService = ionicUtilService;
    this.authErrorService = authErrorService;
    this.pendingEmailVerificationService = pendingEmailVerificationService;
    this.userService = userService;
    this._googleAuthService = _googleAuthService;
    this._appleAuthService = _appleAuthService;
    this.translate = translate;
    this.initVariables();
  }
  get formControls() {
    return this.loginForm.controls;
  }
  get loginErrorIcon() {
    switch (this.loginErrorKind) {
      case 'invalid-credentials':
        return 'lock-closed-outline';
      case 'network':
      case 'timeout':
        return 'cloud-offline-outline';
      case 'wrong-app-for-role':
        return 'swap-horizontal-outline';
      default:
        return 'alert-circle-outline';
    }
  }
  ngOnInit() {
    this.initForm();
    this.applyNavigationFeedback();
  }
  ionViewWillLeave() {
    this.hasFormFocus = false;
    this.syncLogoVisibility();
    if (this.logoSyncTimeoutId) {
      clearTimeout(this.logoSyncTimeoutId);
      this.logoSyncTimeoutId = undefined;
    }
  }
  initVariables() {
    this.loading = false;
    this.error = '';
    this.loginErrorKind = null;
    this.isLoginErrorRetryable = false;
    this.showLogo = true;
    this.hasFormFocus = false;
    // DETECCIÓN DE PLATAFORMA PARA PRO
    // Android: Solo Google
    // iOS: Google y Apple
    // Web: Google y Apple (opcional, pero habilitado por defecto si no es android)
    this.isAndroid = this._platform.is('android');
    this.isApple = this._platform.is('ios') || this._platform.is('iphone') || this._platform.is('ipad');
    this.themeService.theme.subscribe(resTheme => this.theme = resTheme);
  }
  navigateSocialNetwork(socialNetwork) {
    window.location.href = socialNetwork.url;
  }
  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [_angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.email]],
      password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.required]
    });
    this.loginForm.valueChanges.subscribe(() => this.clearLoginError());
  }
  login() {
    if (this.loading) {
      return;
    }
    this.clearLoginError();
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    const observer = {
      next: () => this.handleLoginCorrect(),
      error: error => {
        void this.handleLoginError(error);
      },
      complete: () => this.loading = false
    };
    this.authService.login(this.formControls.email.value.trim().toLowerCase(), this.formControls.password.value).subscribe(observer);
  }
  /**
   * Sign in con Google
   * Flujo:
   * 1. Obtener token de Google via Capacitor Social Login
   * 2. Enviar al backend para verificar/crear usuario
   * 3. Si usuario ya completó registro → ir a Home
   * 4. Si usuario nuevo o incompleto → ir a SignUp para completar datos
   */
  signInWithGoogle() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.loading) {
        return;
      }
      try {
        _this.clearLoginError();
        _this.loading = true;
        // 1. Obtener credenciales de Google
        const googleResponse = yield _this._googleAuthService.signIn();
        const email = googleResponse?.result?.profile?.email?.toLowerCase();
        const idToken = googleResponse?.result?.idToken;
        if (!email || !idToken) {
          console.warn('[AUTH] google_sign_in_missing_credentials');
          _this.ionicUtilService.showErrorToast(_this.translate.instant('SIGN_IN.GOOGLE_NO_DATA'), _this.translate.instant('SIGN_IN.GOOGLE_LOGIN_ERROR'), 2500);
          _this.loading = false;
          return;
        }
        // 2. Verificar con el backend (verifica token y devuelve/crea usuario)
        // Si el usuario no existe → backend devuelve 404 → handleSocialError redirige al registro
        _this.authService.verifyGoogle(email, idToken).subscribe({
          next: response => _this.handleSocialSuccess(response, 'Google'),
          error: error => _this.handleSocialError(error, email, 'Google', idToken)
        });
      } catch (error) {
        // Este catch solo captura errores del plugin nativo de Google (no errores HTTP)
        console.warn('[AUTH] google_sign_in_plugin_failed', {
          reason: error?.code || error?.message || 'unknown'
        });
        // No mostrar toast si el usuario canceló (error de cancelación)
        const isCancelled = error?.message?.toLowerCase().includes('cancel') || error?.code === '12501';
        if (!isCancelled) {
          _this.ionicUtilService.showErrorToast(_this.translate.instant('SIGN_IN.GOOGLE_CONNECT_ERROR'), _this.translate.instant('SIGN_IN.GOOGLE_LOGIN_ERROR'), 2500);
        }
        _this.loading = false;
      }
    })();
  }
  signInWithApple() {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.loading) {
        return;
      }
      try {
        _this2.clearLoginError();
        _this2.loading = true;
        const appleResponse = yield _this2._appleAuthService.signIn();
        const idToken = appleResponse?.result?.idToken;
        let email = appleResponse?.result?.profile?.email ? appleResponse.result.profile.email.toLowerCase() : null;
        if (!email && idToken) {
          try {
            const decodedToken = _this2.authService.getDecodedUser({
              access_token: idToken
            });
            if (decodedToken && decodedToken.email) {
              email = decodedToken.email.toLowerCase();
            }
          } catch (e) {
            console.warn('[AUTH] apple_token_email_decode_failed');
          }
        }
        if (!idToken) {
          _this2.loading = false;
          _this2.ionicUtilService.showErrorToast(_this2.translate.instant('SIGN_IN.APPLE_NO_TOKEN'), _this2.translate.instant('SIGN_IN.APPLE_LOGIN_ERROR'), 2500);
          return;
        }
        _this2.authService.verifyApple(email, idToken).subscribe({
          next: response => _this2.handleSocialSuccess(response, 'Apple'),
          error: error => _this2.handleSocialError(error, email, 'Apple', idToken)
        });
      } catch (error) {
        if (!error.status && !error.message?.includes('Usuario no encontrado')) {
          console.warn('[AUTH] apple_sign_in_plugin_failed', {
            reason: error?.code || error?.message || 'unknown'
          });
          _this2.ionicUtilService.showErrorToast(_this2.translate.instant('SIGN_IN.APPLE_CONNECT_ERROR'), _this2.translate.instant('SIGN_IN.APPLE_LOGIN_ERROR'), 2500);
        }
        _this2.loading = false;
      }
    })();
  }
  /**
   * Maneja respuesta exitosa de social auth (Google/Apple)
   */
  handleSocialSuccess(response, provider) {
    this.authService.applyAuthResponse(response).subscribe({
      next: () => {
        this.userService.setLocalUser = response.user;
        if (this.isUserRegistrationComplete(response.user)) {
          const colorMode = response.user.theme || 'dark';
          this.themeService.toggleColorMode(colorMode);
          this.navigationService.goToUserLoader(this.getReturnUrl());
        } else {
          this.navigationService.goToSignUp();
        }
        this.loading = false;
      },
      error: error => {
        this.ionicUtilService.showErrorToast(error, this.translate.instant('SIGN_IN.LOGIN_ERROR_WITH_PROVIDER', {
          provider
        }), 2500);
        this.loading = false;
      }
    });
  }
  handleSocialError(error, email, provider, socialToken) {
    const feedback = this.authErrorService.toLoginFeedback(error);
    const status = feedback.status;
    const message = (error?.error?.message || error?.message || error?.statusMessage || '').toLowerCase();
    const isNotFound = status === 404 || message.includes('no encontrado') || message.includes('not found') || message.includes('usuario no encontrado');
    if (isNotFound) {
      this.createNewSocialUser(email, provider, socialToken);
    } else {
      console.warn('[AUTH] social_sign_in_failed', {
        provider,
        status,
        kind: feedback.kind
      });
      this.ionicUtilService.showErrorToast(this.getSocialAuthMessage(feedback, provider), this.translate.instant('SIGN_IN.LOGIN_ERROR_WITH_PROVIDER', {
        provider
      }), 2500);
      this.loading = false;
    }
  }
  getSocialAuthMessage(feedback, provider) {
    if (['network', 'timeout', 'server', 'storage'].includes(feedback.kind)) {
      return feedback.message;
    }
    return this.translate.instant('SIGN_IN.SOCIAL_AUTH_RETRY', {
      provider
    });
  }
  /**
   * Crea un nuevo usuario social (Google/Apple)
   */
  createNewSocialUser(email, provider, socialToken) {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // Si es Apple y no tenemos email, hay que pedirlo
      if (provider === 'Apple' && !email) {
        yield _this3.askForEmailAndCreateAppleUser(socialToken);
        return;
      }
      if (!socialToken) {
        _this3.ionicUtilService.showErrorToast(_this3.translate.instant('SIGN_IN.REGISTER_ERROR_WITH_PROVIDER', {
          provider
        }), _this3.translate.instant('SIGN_IN.CREATE_ACCOUNT_ERROR_WITH_PROVIDER', {
          provider
        }), 2500);
        _this3.loading = false;
        return;
      }
      const createObs = provider === 'Google' ? _this3.userService.createGoogleUser({
        email
      }, new Date(), socialToken) : _this3.userService.createAppleUser({
        email
      }, new Date(), socialToken);
      createObs.subscribe({
        next: response => {
          _this3.authService.applyAuthResponse(response).subscribe({
            next: () => {
              _this3.userService.setLocalUser = response.user;
              _this3.navigationService.goToSignUp();
              _this3.loading = false;
            },
            error: error => {
              _this3.ionicUtilService.showErrorToast(error, _this3.translate.instant('SIGN_IN.CREATE_ACCOUNT_ERROR_WITH_PROVIDER', {
                provider
              }), 2500);
              _this3.loading = false;
            }
          });
        },
        error: error => {
          console.warn('[AUTH] social_user_creation_failed', {
            provider,
            status: error?.status
          });
          _this3.ionicUtilService.showErrorToast(error, _this3.translate.instant('SIGN_IN.CREATE_ACCOUNT_ERROR_WITH_PROVIDER', {
            provider
          }), 2500);
          _this3.loading = false;
        }
      });
    })();
  }
  /**
   * Pide el email al usuario cuando Apple no lo proporciona (sucede en re-intentos de registro)
   */
  askForEmailAndCreateAppleUser(tokenApple) {
    var _this4 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this4.loading = false;
      const alert = yield _this4.ionicUtilService.showAlert({
        header: _this4.translate.instant('SIGN_IN.EMAIL_REQUIRED'),
        message: _this4.translate.instant('SIGN_IN.APPLE_EMAIL_MESSAGE'),
        inputs: [{
          name: 'email',
          type: 'email',
          placeholder: _this4.translate.instant('SIGN_IN.EMAIL_PLACEHOLDER')
        }],
        buttons: [{
          text: _this4.translate.instant('COMMON.CANCEL'),
          role: 'cancel'
        }, {
          text: _this4.translate.instant('SIGN_IN.CONTINUE'),
          handler: data => {
            if (data.email && data.email.includes('@')) {
              _this4.loading = true;
              _this4.executeCreateAppleUser(data.email.toLowerCase(), tokenApple);
            } else {
              _this4.ionicUtilService.showErrorToast(_this4.translate.instant('SIGN_IN.VALID_EMAIL'));
              return false;
            }
          }
        }]
      });
    })();
  }
  executeCreateAppleUser(email, tokenApple) {
    this.userService.createAppleUser({
      email
    }, new Date(), tokenApple).subscribe({
      next: response => {
        this.authService.applyAuthResponse(response).subscribe({
          next: () => {
            this.userService.setLocalUser = response.user;
            this.navigationService.goToSignUp();
            this.loading = false;
          },
          error: error => {
            this.ionicUtilService.showErrorToast(error, this.translate.instant('SIGN_IN.CREATE_ACCOUNT_ERROR_WITH_PROVIDER', {
              provider: 'Apple'
            }));
            this.loading = false;
          }
        });
      },
      error: error => {
        console.warn('[AUTH] apple_user_creation_failed', {
          status: error?.status
        });
        this.ionicUtilService.showErrorToast(error, this.translate.instant('SIGN_IN.CREATE_ACCOUNT_ERROR_WITH_PROVIDER', {
          provider: 'Apple'
        }));
        this.loading = false;
      }
    });
  }
  /**
   * Verifica si el usuario completó todos los datos de registro
   * Un usuario de Google recién creado solo tiene: _id, email, roles, refreshToken, __v
   * Un usuario completo tiene: name, lastname, weight, height, etc.
   */
  isUserRegistrationComplete(user) {
    return !!(user?.name && user?.lastname && user?.weight && user?.height);
  }
  handleLoginCorrect() {
    this.clearLoginError();
    this.userService.getUserByEmail(this.formControls.email.value.toLowerCase()).subscribe({
      next: resUser => {
        this.userService.setLocalUser = resUser;
        const colorMode = resUser.theme;
        this.themeService.toggleColorMode(colorMode);
        this.navigationService.goToUserLoader(this.getReturnUrl());
      },
      error: error => {
        const feedback = this.authErrorService.toLoginFeedback(error);
        this.setLoginFeedback({
          ...feedback,
          message: feedback.kind === 'network' || feedback.kind === 'timeout' ? feedback.message : this.translate.instant('SIGN_IN.UNEXPECTED_ERROR')
        });
        this.loading = false;
      }
    });
  }
  handleLoginError(error) {
    this.loading = false;
    const feedback = this.authErrorService.toLoginFeedback(error);
    // Detectar si el usuario no ha verificado su cuenta (error 403)
    if (feedback.kind === 'account-not-verified') {
      const email = this.formControls.email.value;
      this.pendingEmailVerificationService.markCodeSent(email);
      const extras = {
        state: {
          data: {
            verifyEmailOnly: true,
            email: email,
            fromSignIn: true
          }
        }
      };
      this.ionicUtilService.showToast({
        message: feedback.message,
        duration: 3000,
        color: 'warning',
        icon: 'mail-unread-outline'
      });
      this.navigationService.goToSignUp(extras);
      return;
    }
    console.warn('[AUTH] sign_in_failed', {
      kind: feedback.kind,
      status: feedback.status,
      retryable: feedback.retryable
    });
    this.setLoginFeedback(feedback);
  }
  setLoginFeedback(feedback) {
    this.error = feedback.message;
    this.loginErrorKind = feedback.kind;
    this.isLoginErrorRetryable = feedback.retryable;
  }
  clearLoginError() {
    if (!this.error && !this.loginErrorKind) {
      return;
    }
    this.error = '';
    this.loginErrorKind = null;
    this.isLoginErrorRetryable = false;
    this.loginForm?.setErrors(null);
  }
  applyNavigationFeedback() {
    if (this.applyQueryParamFeedback()) {
      return;
    }
    const state = this.navigationService.getState();
    if (this.applyFeedbackState(state)) {
      this.navigationService.clearStateKeys(['loginErrorKind', 'loginErrorMessage', 'loginErrorRetryable']);
    }
  }
  // TASK-010 — reenvía el returnUrl capturado por auth.guard.ts (si lo hay)
  // hacia user-loader.page.ts, que es quien decide a dónde navegar una vez
  // termina de precargar los datos del usuario.
  getReturnUrl() {
    return this.route.snapshot.queryParamMap.get('returnUrl');
  }
  applyQueryParamFeedback() {
    const issue = this.route.snapshot.queryParamMap.get(src_app_core_services_auth_auth_error_service__WEBPACK_IMPORTED_MODULE_2__.AUTH_LOGIN_FEEDBACK_QUERY_PARAM);
    if (issue !== src_app_core_services_auth_auth_error_service__WEBPACK_IMPORTED_MODULE_2__.AUTH_LOGIN_CONNECTION_QUERY_VALUE) {
      return false;
    }
    this.setLoginFeedback(this.authErrorService.toLoginFeedback({
      status: 0
    }));
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        [src_app_core_services_auth_auth_error_service__WEBPACK_IMPORTED_MODULE_2__.AUTH_LOGIN_FEEDBACK_QUERY_PARAM]: null
      },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
    return true;
  }
  applyFeedbackState(state) {
    if (!state?.loginErrorMessage || !state?.loginErrorKind) {
      return false;
    }
    this.setLoginFeedback({
      kind: state.loginErrorKind,
      message: state.loginErrorMessage,
      retryable: state.loginErrorRetryable ?? true
    });
    return true;
  }
  goToRestorePass() {
    this.navigationService.goToRestorePasswordPage();
  }
  navigateSignUp() {
    const extras = {
      state: {
        data: {
          fromSignIn: true
        }
      }
    };
    this.navigationService.goToSignUp(extras);
  }
  onFormFocusIn() {
    this.hasFormFocus = true;
    // En iOS, esconder instantáneamente con *ngIf al ganar foco puede cortar
    // la apertura del teclado; retrasamos mínimamente el update.
    this.syncLogoVisibility(90);
  }
  onFormFocusOut() {
    setTimeout(() => {
      const active = document.activeElement;
      const stillInsideForm = !!active?.closest?.('.login-form');
      this.hasFormFocus = stillInsideForm;
      this.syncLogoVisibility();
    }, 0);
  }
  syncLogoVisibility(delayMs = 0) {
    if (this.logoSyncTimeoutId) {
      clearTimeout(this.logoSyncTimeoutId);
      this.logoSyncTimeoutId = undefined;
    }
    const apply = () => {
      this.showLogo = !this.hasFormFocus;
      try {
        this.cdr.detectChanges();
      } catch {}
    };
    if (delayMs > 0) {
      this.logoSyncTimeoutId = setTimeout(apply, delayMs);
      return;
    }
    apply();
  }
}
_SignInPage = SignInPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(SignInPage, "\u0275fac", function SignInPage_Factory(t) {
  return new (t || _SignInPage)(_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_17__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_15__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_18__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_18__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](src_app_core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_6__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](src_app_core_services_util_theme_service__WEBPACK_IMPORTED_MODULE_7__.ThemeService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_8__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_9__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](src_app_core_services_auth_auth_error_service__WEBPACK_IMPORTED_MODULE_2__.AuthErrorService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](src_app_core_services_auth_pending_email_verification_service__WEBPACK_IMPORTED_MODULE_10__.PendingEmailVerificationService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_11__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](src_app_core_services_auth_google_auth_service__WEBPACK_IMPORTED_MODULE_12__.GoogleAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](src_app_core_services_auth_apple_auth_service__WEBPACK_IMPORTED_MODULE_13__.AppleAuthService), _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslateService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(SignInPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineComponent"]({
  type: _SignInPage,
  selectors: [["app-sign-in"]],
  decls: 7,
  vars: 6,
  consts: [[1, "auth-content"], [1, "auth-shell"], [1, "auth-card"], ["class", "brand-block", 4, "ngIf"], ["novalidate", "", 1, "login-form", 3, "formGroup", "ngSubmit", "focusin", "focusout"], ["class", "loading-container", 4, "ngIf"], ["class", "form-fields", 4, "ngIf"], [1, "brand-block"], [1, "logo-section"], ["alt", "Logo de TrainFit", "src", "https://www.trainfit.net/resources/img/logo/login_dark.svg", 1, "logo-image"], ["class", "app-context", 4, "ngIf"], [1, "app-context"], [1, "app-context-mark"], [1, "loading-container"], ["name", "dots", "color", "primary"], [1, "loading-text"], [1, "form-fields"], ["class", "login-feedback", 3, "login-feedback--retryable", 4, "ngIf"], [1, "input-group"], [1, "input-wrapper"], ["name", "mail-outline", 1, "input-icon"], ["id", "email", "type", "email", "enterkeyhint", "next", "inputmode", "email", "autocomplete", "email", "autocapitalize", "none", "autocorrect", "off", "spellcheck", "false", "formControlName", "email", "appLowercaseEmailInput", "", 1, "input-field", 3, "placeholder", "keydown.enter"], ["class", "validation-error", 4, "ngIf"], ["name", "lock-closed-outline", 1, "input-icon"], ["id", "password", "enterkeyhint", "done", "autocomplete", "current-password", "formControlName", "password", 1, "input-field", 3, "type", "placeholder"], ["passwordInput", ""], ["fill", "clear", "type", "button", 1, "password-toggle", 3, "click"], [3, "name"], [1, "forgot-password-container"], ["type", "button", 1, "text-link", "forgot-password", 3, "click"], ["type", "submit", "expand", "block", 1, "login-button", 3, "disabled"], [1, "divider"], [1, "social-login"], ["class", "social-signin-button google", "type", "button", 3, "disabled", "click", 4, "ngIf"], ["class", "social-signin-button apple", "type", "button", 3, "disabled", "click", 4, "ngIf"], [1, "signup-link"], ["type", "button", 1, "text-link", "signup-action", 3, "click"], [1, "login-feedback"], [1, "validation-error"], [4, "ngIf"], ["type", "button", 1, "social-signin-button", "google", 3, "disabled", "click"], [1, "social-logo"], ["width", "20", "height", "20", "viewBox", "0 0 24 24"], ["fill", "#4285F4", "d", "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"], ["fill", "#34A853", "d", "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"], ["fill", "#FBBC05", "d", "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"], ["fill", "#EA4335", "d", "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"], [1, "button-text"], ["type", "button", 1, "social-signin-button", "apple", 3, "disabled", "click"], ["width", "20", "height", "20", "viewBox", "0 0 226 226"], ["d", "M170.18,91.8c-0.25,29.35,24.01,43.46,25.06,44.1c-0.12,0.4 -3.93,13.43 -12.92,26.54c-7.77,11.33 -15.84,22.61 -28.46,22.84c-12.4,0.23 -16.4,-7.34 -30.56,-7.34c-14.16,0 -18.6,7.11 -30.56,7.57c-12.18,0.47 -21.43-12.31 -29.28-23.64c-16.05-23.18 -28.32-65.5 -11.75-94.13c8.23-14.22,22.87-23.23,38.86-23.47c12.18-0.23,23.68,8.2,31.14,8.2c7.46,0,21.37-10.27,35.91-8.77c6.09,0.25,23.18,2.44,34.19,18.52C190.96,65.37,170.47,73.49,170.18,91.8z M138.83,38.03c6.51-7.88,10.89-18.82,9.69-29.74c-9.39,0.38-20.75,6.26-27.48,14.14c-6.03,6.96-11.31,18.15-9.88,28.8C121.57,51.98,132.32,45.9,138.83,38.03z", "fill", "#ffffff"]],
  template: function SignInPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](0, "ion-content", 0)(1, "section", 1)(2, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](3, SignInPage_header_3_Template, 4, 1, "header", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementStart"](4, "form", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵlistener"]("ngSubmit", function SignInPage_Template_form_ngSubmit_4_listener() {
        return ctx.login();
      })("focusin", function SignInPage_Template_form_focusin_4_listener() {
        return ctx.onFormFocusIn();
      })("focusout", function SignInPage_Template_form_focusout_4_listener() {
        return ctx.onFormFocusOut();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](5, SignInPage_div_5_Template, 5, 3, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵtemplate"](6, SignInPage_div_6_Template, 36, 33, "div", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵclassProp"]("compact-mode", !ctx.showLogo);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.showLogo);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("formGroup", ctx.loginForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", ctx.loading);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵproperty"]("ngIf", !ctx.loading);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_16__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_16__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormControlName, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_21__.IonSpinner, src_app_core_directives_lowercase_email_input_directive__WEBPACK_IMPORTED_MODULE_14__.LowercaseEmailInputDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslatePipe],
  styles: ["[_nghost-%COMP%] {\n  --bg-primary: #0a0a0b;\n  --bg-secondary: #111111;\n  --bg-tertiary: #1c1c1e;\n  --bg-elevated: rgba(24, 24, 26, 0.92);\n  --border-primary: rgba(255, 255, 255, 0.08);\n  --border-strong: rgba(254, 144, 0, 0.28);\n  --text-primary: #ffffff;\n  --text-secondary: #9ca3af;\n  --accent-primary: #fe9000;\n  --accent-primary-strong: #ff9f1a;\n  --danger: #ff5d5d;\n}\n\n.auth-content[_ngcontent-%COMP%] {\n  --background: radial-gradient(\n      circle at top,\n      rgba(254, 144, 0, 0.16),\n      transparent 30%\n    ),\n    linear-gradient(180deg, #0b0b0c 0%, #080809 100%);\n}\n\n.auth-shell[_ngcontent-%COMP%] {\n  min-height: 100%;\n  display: grid;\n  place-items: center;\n  padding: clamp(24px, 5vw, 48px) 20px;\n}\n\n.auth-shell.compact-mode[_ngcontent-%COMP%] {\n  place-items: start center;\n  padding-top: 75px;\n  padding-bottom: 16px;\n}\n\n.auth-shell.compact-mode[_ngcontent-%COMP%]   .auth-card[_ngcontent-%COMP%] {\n  gap: 22px;\n}\n\n.auth-card[_ngcontent-%COMP%] {\n  width: min(100%, 460px);\n  display: grid;\n  gap: clamp(24px, 4vw, 32px);\n  padding: 0;\n  background: transparent;\n  border: 0;\n  border-radius: 0;\n  box-shadow: none;\n  -webkit-backdrop-filter: none;\n          backdrop-filter: none;\n}\n\n.brand-block[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n}\n\n.logo-section[_ngcontent-%COMP%] {\n  width: 100%;\n  display: grid;\n  place-items: center;\n  text-align: center;\n}\n\n.logo-image[_ngcontent-%COMP%] {\n  display: block;\n  width: min(100%, 300px);\n  max-width: clamp(220px, 58vw, 300px);\n  height: auto;\n  object-fit: contain;\n  margin: 0 auto;\n}\n\n.app-context[_ngcontent-%COMP%] {\n  margin: 10px 0 0;\n  text-align: center;\n}\n\n.app-context-mark[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.76rem;\n  font-weight: 700;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  color: var(--accent-primary);\n}\n.app-context-mark[_ngcontent-%COMP%]::before, .app-context-mark[_ngcontent-%COMP%]::after {\n  content: \"\";\n  width: 14px;\n  height: 1px;\n  background: currentColor;\n  opacity: 0.5;\n}\n\n.login-form[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.loading-container[_ngcontent-%COMP%] {\n  min-height: 240px;\n  display: grid;\n  place-items: center;\n  gap: 16px;\n  text-align: center;\n}\n.loading-container[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {\n  width: 48px;\n  height: 48px;\n}\n\n.loading-text[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text-secondary);\n  font-size: 0.95rem;\n}\n\n.form-fields[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n}\n\n.login-feedback[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 20px 1fr;\n  align-items: start;\n  gap: 10px;\n  padding: 12px 14px;\n  border: 1px solid rgba(255, 93, 93, 0.34);\n  border-radius: 8px;\n  background: rgba(255, 93, 93, 0.1);\n  color: #ffdede;\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 1.45;\n}\n.login-feedback[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  margin-top: 1px;\n  color: var(--danger);\n}\n.login-feedback[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.login-feedback--retryable[_ngcontent-%COMP%] {\n  border-color: rgba(254, 144, 0, 0.34);\n  background: rgba(254, 144, 0, 0.1);\n  color: #ffe6c2;\n}\n.login-feedback--retryable[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--accent-primary);\n}\n\n.input-group[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  min-height: 54px;\n  background: var(--bg-tertiary);\n  border: 1px solid var(--border-primary);\n  border-radius: 16px;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--border-strong);\n  box-shadow: 0 0 0 4px rgba(254, 144, 0, 0.12);\n}\n.input-wrapper[_ngcontent-%COMP%]:has(.input-field.ng-invalid.ng-touched) {\n  border-color: rgba(255, 93, 93, 0.72);\n  box-shadow: 0 0 0 4px rgba(255, 93, 93, 0.12);\n}\n\n.input-wrapper--auth-error[_ngcontent-%COMP%] {\n  border-color: rgba(255, 93, 93, 0.72);\n  box-shadow: 0 0 0 4px rgba(255, 93, 93, 0.12);\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 18px;\n  width: 20px;\n  height: 20px;\n  color: var(--text-secondary);\n  pointer-events: none;\n}\n\n.input-field[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 0;\n  outline: 0;\n  background: transparent;\n  color: var(--text-primary);\n  padding: 16px 54px 16px 50px;\n  font-size: 16px;\n  font-weight: 500;\n  font-family: inherit;\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-secondary);\n  opacity: 0.84;\n}\n\n.password-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 6px;\n  margin: 0;\n  height: 42px;\n  width: 42px;\n  --color: var(--text-secondary);\n  --padding-start: 0;\n  --padding-end: 0;\n  --border-radius: 12px;\n}\n\n.validation-error[_ngcontent-%COMP%] {\n  padding-left: 4px;\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 1.45;\n  color: var(--danger);\n}\n\n.forgot-password-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  margin-top: -2px;\n}\n\n.text-link[_ngcontent-%COMP%] {\n  border: 0;\n  background: transparent;\n  padding: 0;\n  cursor: pointer;\n  font: inherit;\n}\n\n.forgot-password[_ngcontent-%COMP%], .signup-action[_ngcontent-%COMP%] {\n  color: var(--accent-primary);\n  font-weight: 600;\n}\n\n.login-button[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 4px 0 0;\n  --background: linear-gradient(\n    135deg,\n    var(--accent-primary) 0%,\n    var(--accent-primary-strong) 100%\n  );\n  --color: #ffffff;\n  --border-radius: 16px;\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n  --box-shadow: 0 14px 28px rgba(254, 144, 0, 0.22);\n  font-size: 16px;\n  font-weight: 700;\n}\n.login-button[_ngcontent-%COMP%]:disabled {\n  --background: #2a2a2a;\n  --color: var(--text-secondary);\n  --box-shadow: none;\n}\n\n.divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n  color: var(--text-secondary);\n  font-size: 13px;\n  text-align: center;\n}\n\n.divider[_ngcontent-%COMP%]::before, .divider[_ngcontent-%COMP%]::after {\n  content: \"\";\n  flex: 1;\n  height: 1px;\n  background: rgba(255, 255, 255, 0.12);\n}\n\n.social-login[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\n\n.social-signin-button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 12px;\n  width: 100%;\n  min-height: 52px;\n  padding: 0 18px;\n  border-radius: 16px;\n  border: 1px solid var(--border-primary);\n  background: var(--bg-tertiary);\n  color: var(--text-primary);\n  cursor: pointer;\n  font: inherit;\n  font-size: 14px;\n  font-weight: 600;\n  transition: transform 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease;\n}\n.social-signin-button[_ngcontent-%COMP%]:hover, .social-signin-button[_ngcontent-%COMP%]:focus-visible {\n  border-color: rgba(255, 255, 255, 0.16);\n  background: #242426;\n  transform: translateY(-1px);\n  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);\n  outline: none;\n}\n.social-signin-button[_ngcontent-%COMP%]:active {\n  transform: translateY(0);\n}\n.social-signin-button[_ngcontent-%COMP%]:disabled {\n  cursor: default;\n  opacity: 0.62;\n  transform: none;\n  box-shadow: none;\n}\n.social-signin-button.apple[_ngcontent-%COMP%] {\n  background: #000000;\n  border-color: #111111;\n}\n\n.social-logo[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 20px;\n  height: 20px;\n  flex: 0 0 20px;\n}\n.social-logo[_ngcontent-%COMP%]   svg[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n}\n\n.button-text[_ngcontent-%COMP%] {\n  letter-spacing: 0.01em;\n}\n\n.signup-link[_ngcontent-%COMP%] {\n  margin: 4px 0 0;\n  text-align: center;\n  color: var(--text-secondary);\n  font-size: 14px;\n  line-height: 1.5;\n}\n\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n\n@media (max-width: 479px) {\n  .auth-shell[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    gap: 22px;\n  }\n  .logo-image[_ngcontent-%COMP%] {\n    max-width: clamp(200px, 64vw, 260px);\n  }\n  .input-wrapper[_ngcontent-%COMP%] {\n    min-height: 50px;\n  }\n  .input-field[_ngcontent-%COMP%] {\n    padding: 15px 50px 15px 46px;\n    font-size: 15px;\n  }\n  .social-signin-button[_ngcontent-%COMP%] {\n    min-height: 50px;\n  }\n}\n@media (min-width: 768px) {\n  .auth-card[_ngcontent-%COMP%] {\n    width: min(100%, 500px);\n  }\n  .logo-image[_ngcontent-%COMP%] {\n    max-width: 320px;\n  }\n}\n@media (max-height: 720px) {\n  .auth-shell[_ngcontent-%COMP%] {\n    align-items: start;\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    gap: 20px;\n    margin-block: 12px;\n  }\n  .logo-image[_ngcontent-%COMP%] {\n    max-width: clamp(180px, 38vh, 250px);\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], *[_ngcontent-%COMP%]::before, *[_ngcontent-%COMP%]::after {\n    transition: none !important;\n    animation: none !important;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL2F1dGhlbnRpY2F0aW9uL2NvbXBvbmVudHMvc2lnbi1pbi9zaWduLWluLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFBO0VBQ0EsdUJBQUE7RUFDQSxzQkFBQTtFQUNBLHFDQUFBO0VBQ0EsMkNBQUE7RUFDQSx3Q0FBQTtFQUNBLHVCQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtFQUNBLGdDQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFOzs7OztxREFBQTtBQU1GOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQ0FBQTtBQUNGOztBQUVBO0VBQ0UseUJBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxTQUFBO0FBQ0Y7O0FBRUE7RUFDRSx1QkFBQTtFQUNBLGFBQUE7RUFDQSwyQkFBQTtFQUNBLFVBQUE7RUFDQSx1QkFBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsNkJBQUE7VUFBQSxxQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7QUFDRjs7QUFFQTtFQUNFLGNBQUE7RUFDQSx1QkFBQTtFQUNBLG9DQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtBQUNGOztBQU9BO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtBQUpGOztBQU9BO0VBQ0Usb0JBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLDRCQUFBO0FBSkY7QUFNRTtFQUVFLFdBQUE7RUFDQSxXQUFBO0VBQ0EsV0FBQTtFQUNBLHdCQUFBO0VBQ0EsWUFBQTtBQUxKOztBQVNBO0VBQ0UsV0FBQTtBQU5GOztBQVNBO0VBQ0UsaUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7QUFORjtBQVFFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFOSjs7QUFVQTtFQUNFLFNBQUE7RUFDQSw0QkFBQTtFQUNBLGtCQUFBO0FBUEY7O0FBVUE7RUFDRSxhQUFBO0VBQ0EsU0FBQTtBQVBGOztBQVVBO0VBQ0UsYUFBQTtFQUNBLCtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSx5Q0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0NBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QUFQRjtBQVNFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0Esb0JBQUE7QUFQSjtBQVVFO0VBQ0UsU0FBQTtBQVJKOztBQVlBO0VBQ0UscUNBQUE7RUFDQSxrQ0FBQTtFQUNBLGNBQUE7QUFURjtBQVdFO0VBQ0UsNEJBQUE7QUFUSjs7QUFhQTtFQUNFLGFBQUE7RUFDQSxRQUFBO0FBVkY7O0FBYUE7RUFDRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsOEJBQUE7RUFDQSx1Q0FBQTtFQUNBLG1CQUFBO0VBQ0EsNkVBQUE7QUFWRjtBQVlFO0VBQ0Usa0NBQUE7RUFDQSw2Q0FBQTtBQVZKO0FBYUU7RUFDRSxxQ0FBQTtFQUNBLDZDQUFBO0FBWEo7O0FBZUE7RUFDRSxxQ0FBQTtFQUNBLDZDQUFBO0FBWkY7O0FBZUE7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLDRCQUFBO0VBQ0Esb0JBQUE7QUFaRjs7QUFlQTtFQUNFLFdBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtFQUNBLHVCQUFBO0VBQ0EsMEJBQUE7RUFDQSw0QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLG9CQUFBO0FBWkY7QUFjRTtFQUNFLDRCQUFBO0VBQ0EsYUFBQTtBQVpKOztBQWdCQTtFQUNFLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0FBYkY7O0FBZ0JBO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0FBYkY7O0FBZ0JBO0VBQ0UsYUFBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7QUFiRjs7QUFnQkE7RUFDRSxTQUFBO0VBQ0EsdUJBQUE7RUFDQSxVQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7QUFiRjs7QUFnQkE7O0VBRUUsNEJBQUE7RUFDQSxnQkFBQTtBQWJGOztBQWdCQTtFQUNFLFdBQUE7RUFDQSxlQUFBO0VBQ0E7Ozs7R0FBQTtFQUtBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsaURBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFiRjtBQWVFO0VBQ0UscUJBQUE7RUFDQSw4QkFBQTtFQUNBLGtCQUFBO0FBYko7O0FBaUJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLDRCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FBZEY7O0FBaUJBOztFQUVFLFdBQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLHFDQUFBO0FBZEY7O0FBaUJBO0VBQ0UsYUFBQTtFQUNBLFNBQUE7QUFkRjs7QUFpQkE7RUFDRSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUNBQUE7RUFDQSw4QkFBQTtFQUNBLDBCQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5R0FBQTtBQWRGO0FBaUJFO0VBRUUsdUNBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0EsMkNBQUE7RUFDQSxhQUFBO0FBaEJKO0FBbUJFO0VBQ0Usd0JBQUE7QUFqQko7QUFvQkU7RUFDRSxlQUFBO0VBQ0EsYUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQWxCSjtBQXFCRTtFQUNFLG1CQUFBO0VBQ0EscUJBQUE7QUFuQko7O0FBdUJBO0VBQ0Usb0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0FBcEJGO0FBc0JFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7QUFwQko7O0FBd0JBO0VBQ0Usc0JBQUE7QUFyQkY7O0FBd0JBO0VBQ0UsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsNEJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFyQkY7O0FBd0JBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtBQXJCRjs7QUF3QkE7RUFDRTtJQUNFLGFBQUE7RUFyQkY7RUF3QkE7SUFDRSxTQUFBO0VBdEJGO0VBeUJBO0lBQ0Usb0NBQUE7RUF2QkY7RUEwQkE7SUFDRSxnQkFBQTtFQXhCRjtFQTJCQTtJQUNFLDRCQUFBO0lBQ0EsZUFBQTtFQXpCRjtFQTRCQTtJQUNFLGdCQUFBO0VBMUJGO0FBQ0Y7QUE2QkE7RUFDRTtJQUNFLHVCQUFBO0VBM0JGO0VBOEJBO0lBQ0UsZ0JBQUE7RUE1QkY7QUFDRjtBQStCQTtFQUNFO0lBQ0Usa0JBQUE7RUE3QkY7RUFnQ0E7SUFDRSxTQUFBO0lBQ0Esa0JBQUE7RUE5QkY7RUFpQ0E7SUFDRSxvQ0FBQTtFQS9CRjtBQUNGO0FBa0NBO0VBQ0U7OztJQUdFLDJCQUFBO0lBQ0EsMEJBQUE7RUFoQ0Y7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgLS1iZy1wcmltYXJ5OiAjMGEwYTBiO1xuICAtLWJnLXNlY29uZGFyeTogIzExMTExMTtcbiAgLS1iZy10ZXJ0aWFyeTogIzFjMWMxZTtcbiAgLS1iZy1lbGV2YXRlZDogcmdiYSgyNCwgMjQsIDI2LCAwLjkyKTtcbiAgLS1ib3JkZXItcHJpbWFyeTogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4KTtcbiAgLS1ib3JkZXItc3Ryb25nOiByZ2JhKDI1NCwgMTQ0LCAwLCAwLjI4KTtcbiAgLS10ZXh0LXByaW1hcnk6ICNmZmZmZmY7XG4gIC0tdGV4dC1zZWNvbmRhcnk6ICM5Y2EzYWY7XG4gIC0tYWNjZW50LXByaW1hcnk6ICNmZTkwMDA7XG4gIC0tYWNjZW50LXByaW1hcnktc3Ryb25nOiAjZmY5ZjFhO1xuICAtLWRhbmdlcjogI2ZmNWQ1ZDtcbn1cblxuLmF1dGgtY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KFxuICAgICAgY2lyY2xlIGF0IHRvcCxcbiAgICAgIHJnYmEoMjU0LCAxNDQsIDAsIDAuMTYpLFxuICAgICAgdHJhbnNwYXJlbnQgMzAlXG4gICAgKSxcbiAgICBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMGIwYjBjIDAlLCAjMDgwODA5IDEwMCUpO1xufVxuXG4uYXV0aC1zaGVsbCB7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IGNsYW1wKDI0cHgsIDV2dywgNDhweCkgMjBweDtcbn1cblxuLmF1dGgtc2hlbGwuY29tcGFjdC1tb2RlIHtcbiAgcGxhY2UtaXRlbXM6IHN0YXJ0IGNlbnRlcjtcbiAgcGFkZGluZy10b3A6IDc1cHg7XG4gIHBhZGRpbmctYm90dG9tOiAxNnB4O1xufVxuXG4uYXV0aC1zaGVsbC5jb21wYWN0LW1vZGUgLmF1dGgtY2FyZCB7XG4gIGdhcDogMjJweDtcbn1cblxuLmF1dGgtY2FyZCB7XG4gIHdpZHRoOiBtaW4oMTAwJSwgNDYwcHgpO1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IGNsYW1wKDI0cHgsIDR2dywgMzJweCk7XG4gIHBhZGRpbmc6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IDA7XG4gIGJvcmRlci1yYWRpdXM6IDA7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG4gIGJhY2tkcm9wLWZpbHRlcjogbm9uZTtcbn1cblxuLmJyYW5kLWJsb2NrIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcbn1cblxuLmxvZ28tc2VjdGlvbiB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBncmlkO1xuICBwbGFjZS1pdGVtczogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5sb2dvLWltYWdlIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiBtaW4oMTAwJSwgMzAwcHgpO1xuICBtYXgtd2lkdGg6IGNsYW1wKDIyMHB4LCA1OHZ3LCAzMDBweCk7XG4gIGhlaWdodDogYXV0bztcbiAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi8vIExvY2t1cCBkZSBzdWItbWFyY2EsIG5vIHVuIGtpY2tlciBkZWNvcmF0aXZvIMOiwoDClCBsYSDDg8K6bmljYSBzZcODwrFhbCBkZSBlbiBxdcODwqlcbi8vIGFwcCBlc3TDg8KhIGVsIHVzdWFyaW8gKHNpZ24taW4gZXMgbGl0ZXJhbG1lbnRlIGVsIG1pc21vIGFyY2hpdm8gY29tcGFydGlkb1xuLy8gZW50cmUgbGFzIDMgYXBwcywgdmVyIGlzVHJhaW5lckFwcCBlbiBzaWduLWluLnBhZ2UudHMpLiBUaXBvZ3JhZsODwq1hXG4vLyBjb250ZW5pZGEsIHNpbiBjYWphIG5pIGZvbmRvOiBzZSBsZWUgY29tbyBwYXJ0ZSBkZWwgd29yZG1hcmssIG5vIGNvbW8gdW5hXG4vLyBldGlxdWV0YSBwZWdhZGEgZW5jaW1hLlxuLmFwcC1jb250ZXh0IHtcbiAgbWFyZ2luOiAxMHB4IDAgMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uYXBwLWNvbnRleHQtbWFyayB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgZm9udC1zaXplOiAwLjc2cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBsZXR0ZXItc3BhY2luZzogMC4yMmVtO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBjb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuXG4gICY6OmJlZm9yZSxcbiAgJjo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHdpZHRoOiAxNHB4O1xuICAgIGhlaWdodDogMXB4O1xuICAgIGJhY2tncm91bmQ6IGN1cnJlbnRDb2xvcjtcbiAgICBvcGFjaXR5OiAwLjU7XG4gIH1cbn1cblxuLmxvZ2luLWZvcm0ge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmxvYWRpbmctY29udGFpbmVyIHtcbiAgbWluLWhlaWdodDogMjQwcHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTZweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gIGlvbi1zcGlubmVyIHtcbiAgICB3aWR0aDogNDhweDtcbiAgICBoZWlnaHQ6IDQ4cHg7XG4gIH1cbn1cblxuLmxvYWRpbmctdGV4dCB7XG4gIG1hcmdpbjogMDtcbiAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgZm9udC1zaXplOiAwLjk1cmVtO1xufVxuXG4uZm9ybS1maWVsZHMge1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IDE2cHg7XG59XG5cbi5sb2dpbi1mZWVkYmFjayB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMjBweCAxZnI7XG4gIGFsaWduLWl0ZW1zOiBzdGFydDtcbiAgZ2FwOiAxMHB4O1xuICBwYWRkaW5nOiAxMnB4IDE0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCA5MywgOTMsIDAuMzQpO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCA5MywgOTMsIDAuMSk7XG4gIGNvbG9yOiAjZmZkZWRlO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjQ1O1xuXG4gIGlvbi1pY29uIHtcbiAgICB3aWR0aDogMjBweDtcbiAgICBoZWlnaHQ6IDIwcHg7XG4gICAgbWFyZ2luLXRvcDogMXB4O1xuICAgIGNvbG9yOiB2YXIoLS1kYW5nZXIpO1xuICB9XG5cbiAgcCB7XG4gICAgbWFyZ2luOiAwO1xuICB9XG59XG5cbi5sb2dpbi1mZWVkYmFjay0tcmV0cnlhYmxlIHtcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDI1NCwgMTQ0LCAwLCAwLjM0KTtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTQsIDE0NCwgMCwgMC4xKTtcbiAgY29sb3I6ICNmZmU2YzI7XG5cbiAgaW9uLWljb24ge1xuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gIH1cbn1cblxuLmlucHV0LWdyb3VwIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ2FwOiA4cHg7XG59XG5cbi5pbnB1dC13cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtaW4taGVpZ2h0OiA1NHB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1iZy10ZXJ0aWFyeSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1wcmltYXJ5KTtcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMnMgZWFzZSwgYm94LXNoYWRvdyAwLjJzIGVhc2UsIHRyYW5zZm9ybSAwLjJzIGVhc2U7XG5cbiAgJjpmb2N1cy13aXRoaW4ge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tYm9yZGVyLXN0cm9uZyk7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgNHB4IHJnYmEoMjU0LCAxNDQsIDAsIDAuMTIpO1xuICB9XG5cbiAgJjpoYXMoLmlucHV0LWZpZWxkLm5nLWludmFsaWQubmctdG91Y2hlZCkge1xuICAgIGJvcmRlci1jb2xvcjogcmdiYSgyNTUsIDkzLCA5MywgMC43Mik7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgNHB4IHJnYmEoMjU1LCA5MywgOTMsIDAuMTIpO1xuICB9XG59XG5cbi5pbnB1dC13cmFwcGVyLS1hdXRoLWVycm9yIHtcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDI1NSwgOTMsIDkzLCAwLjcyKTtcbiAgYm94LXNoYWRvdzogMCAwIDAgNHB4IHJnYmEoMjU1LCA5MywgOTMsIDAuMTIpO1xufVxuXG4uaW5wdXQtaWNvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMThweDtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbi5pbnB1dC1maWVsZCB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KTtcbiAgcGFkZGluZzogMTZweCA1NHB4IDE2cHggNTBweDtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcblxuICAmOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgICBvcGFjaXR5OiAwLjg0O1xuICB9XG59XG5cbi5wYXNzd29yZC10b2dnbGUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiA2cHg7XG4gIG1hcmdpbjogMDtcbiAgaGVpZ2h0OiA0MnB4O1xuICB3aWR0aDogNDJweDtcbiAgLS1jb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuICAtLXBhZGRpbmctc3RhcnQ6IDA7XG4gIC0tcGFkZGluZy1lbmQ6IDA7XG4gIC0tYm9yZGVyLXJhZGl1czogMTJweDtcbn1cblxuLnZhbGlkYXRpb24tZXJyb3Ige1xuICBwYWRkaW5nLWxlZnQ6IDRweDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBmb250LXdlaWdodDogNTAwO1xuICBsaW5lLWhlaWdodDogMS40NTtcbiAgY29sb3I6IHZhcigtLWRhbmdlcik7XG59XG5cbi5mb3Jnb3QtcGFzc3dvcmQtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgbWFyZ2luLXRvcDogLTJweDtcbn1cblxuLnRleHQtbGluayB7XG4gIGJvcmRlcjogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHBhZGRpbmc6IDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udDogaW5oZXJpdDtcbn1cblxuLmZvcmdvdC1wYXNzd29yZCxcbi5zaWdudXAtYWN0aW9uIHtcbiAgY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmxvZ2luLWJ1dHRvbiB7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW46IDRweCAwIDA7XG4gIC0tYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxuICAgIDEzNWRlZyxcbiAgICB2YXIoLS1hY2NlbnQtcHJpbWFyeSkgMCUsXG4gICAgdmFyKC0tYWNjZW50LXByaW1hcnktc3Ryb25nKSAxMDAlXG4gICk7XG4gIC0tY29sb3I6ICNmZmZmZmY7XG4gIC0tYm9yZGVyLXJhZGl1czogMTZweDtcbiAgLS1wYWRkaW5nLXRvcDogMTZweDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMTZweDtcbiAgLS1ib3gtc2hhZG93OiAwIDE0cHggMjhweCByZ2JhKDI1NCwgMTQ0LCAwLCAwLjIyKTtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBmb250LXdlaWdodDogNzAwO1xuXG4gICY6ZGlzYWJsZWQge1xuICAgIC0tYmFja2dyb3VuZDogIzJhMmEyYTtcbiAgICAtLWNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gICAgLS1ib3gtc2hhZG93OiBub25lO1xuICB9XG59XG5cbi5kaXZpZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxNHB4O1xuICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuICBmb250LXNpemU6IDEzcHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmRpdmlkZXI6OmJlZm9yZSxcbi5kaXZpZGVyOjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIGZsZXg6IDE7XG4gIGhlaWdodDogMXB4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTIpO1xufVxuXG4uc29jaWFsLWxvZ2luIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ2FwOiAxMnB4O1xufVxuXG4uc29jaWFsLXNpZ25pbi1idXR0b24ge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgd2lkdGg6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDUycHg7XG4gIHBhZGRpbmc6IDAgMThweDtcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1iZy10ZXJ0aWFyeSk7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LXByaW1hcnkpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZvbnQ6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMnMgZWFzZSwgYm9yZGVyLWNvbG9yIDAuMnMgZWFzZSxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yIDAuMnMgZWFzZSwgYm94LXNoYWRvdyAwLjJzIGVhc2U7XG5cbiAgJjpob3ZlcixcbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBib3JkZXItY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xNik7XG4gICAgYmFja2dyb3VuZDogIzI0MjQyNjtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTFweCk7XG4gICAgYm94LXNoYWRvdzogMCAxMHB4IDI0cHggcmdiYSgwLCAwLCAwLCAwLjE4KTtcbiAgICBvdXRsaW5lOiBub25lO1xuICB9XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgICBvcGFjaXR5OiAwLjYyO1xuICAgIHRyYW5zZm9ybTogbm9uZTtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICB9XG5cbiAgJi5hcHBsZSB7XG4gICAgYmFja2dyb3VuZDogIzAwMDAwMDtcbiAgICBib3JkZXItY29sb3I6ICMxMTExMTE7XG4gIH1cbn1cblxuLnNvY2lhbC1sb2dvIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogMjBweDtcbiAgaGVpZ2h0OiAyMHB4O1xuICBmbGV4OiAwIDAgMjBweDtcblxuICBzdmcge1xuICAgIHdpZHRoOiAyMHB4O1xuICAgIGhlaWdodDogMjBweDtcbiAgfVxufVxuXG4uYnV0dG9uLXRleHQge1xuICBsZXR0ZXItc3BhY2luZzogMC4wMWVtO1xufVxuXG4uc2lnbnVwLWxpbmsge1xuICBtYXJnaW46IDRweCAwIDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBsaW5lLWhlaWdodDogMS41O1xufVxuXG4uc3Itb25seSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDFweDtcbiAgaGVpZ2h0OiAxcHg7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogLTFweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgY2xpcDogcmVjdCgwLCAwLCAwLCAwKTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgYm9yZGVyOiAwO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogNDc5cHgpIHtcbiAgLmF1dGgtc2hlbGwge1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gIH1cblxuICAuYXV0aC1jYXJkIHtcbiAgICBnYXA6IDIycHg7XG4gIH1cblxuICAubG9nby1pbWFnZSB7XG4gICAgbWF4LXdpZHRoOiBjbGFtcCgyMDBweCwgNjR2dywgMjYwcHgpO1xuICB9XG5cbiAgLmlucHV0LXdyYXBwZXIge1xuICAgIG1pbi1oZWlnaHQ6IDUwcHg7XG4gIH1cblxuICAuaW5wdXQtZmllbGQge1xuICAgIHBhZGRpbmc6IDE1cHggNTBweCAxNXB4IDQ2cHg7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICB9XG5cbiAgLnNvY2lhbC1zaWduaW4tYnV0dG9uIHtcbiAgICBtaW4taGVpZ2h0OiA1MHB4O1xuICB9XG59XG5cbkBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAuYXV0aC1jYXJkIHtcbiAgICB3aWR0aDogbWluKDEwMCUsIDUwMHB4KTtcbiAgfVxuXG4gIC5sb2dvLWltYWdlIHtcbiAgICBtYXgtd2lkdGg6IDMyMHB4O1xuICB9XG59XG5cbkBtZWRpYSAobWF4LWhlaWdodDogNzIwcHgpIHtcbiAgLmF1dGgtc2hlbGwge1xuICAgIGFsaWduLWl0ZW1zOiBzdGFydDtcbiAgfVxuXG4gIC5hdXRoLWNhcmQge1xuICAgIGdhcDogMjBweDtcbiAgICBtYXJnaW4tYmxvY2s6IDEycHg7XG4gIH1cblxuICAubG9nby1pbWFnZSB7XG4gICAgbWF4LXdpZHRoOiBjbGFtcCgxODBweCwgMzh2aCwgMjUwcHgpO1xuICB9XG59XG5cbkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICosXG4gICo6OmJlZm9yZSxcbiAgKjo6YWZ0ZXIge1xuICAgIHRyYW5zaXRpb246IG5vbmUgIWltcG9ydGFudDtcbiAgICBhbmltYXRpb246IG5vbmUgIWltcG9ydGFudDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
}));


/***/ })

}]);
//# sourceMappingURL=packages_shared-features_src_app_features_authentication_authentication_module_ts.js.map