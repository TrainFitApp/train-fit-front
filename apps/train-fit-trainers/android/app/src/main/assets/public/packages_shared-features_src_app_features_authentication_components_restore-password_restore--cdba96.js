"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["packages_shared-features_src_app_features_authentication_components_restore-password_restore--cdba96"],{

/***/ 93816:
/*!*****************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/authentication/components/restore-password/restore-password.module.ts ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RestorePasswordPageModule: () => (/* binding */ RestorePasswordPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _restore_password_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./restore-password.page */ 26403);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);

var _RestorePasswordPageModule;





const routes = [{
  path: '',
  component: _restore_password_page__WEBPACK_IMPORTED_MODULE_2__.RestorePasswordPage
}];
class RestorePasswordPageModule {}
_RestorePasswordPageModule = RestorePasswordPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RestorePasswordPageModule, "\u0275fac", function RestorePasswordPageModule_Factory(t) {
  return new (t || _RestorePasswordPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RestorePasswordPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _RestorePasswordPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RestorePasswordPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](RestorePasswordPageModule, {
    declarations: [_restore_password_page__WEBPACK_IMPORTED_MODULE_2__.RestorePasswordPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ }),

/***/ 26403:
/*!***************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/authentication/components/restore-password/restore-password.page.ts ***!
  \***************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RestorePasswordPage: () => (/* binding */ RestorePasswordPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var src_app_core_validators_password_complexity__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/validators/password-complexity */ 27539);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/util/navigation.service */ 22938);
/* harmony import */ var src_app_core_validators_matchPasswords__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/validators/matchPasswords */ 7286);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var src_app_core_services_util_util_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/util/util.service */ 35400);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var src_app_core_directives_lowercase_email_input_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/directives/lowercase-email-input.directive */ 24436);

var _RestorePasswordPage;













function RestorePasswordPage_ng_container_15_h1_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "h1", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, "RESTORE_PASSWORD.SUCCESS_CHANGED"));
  }
}
function RestorePasswordPage_ng_container_15_h1_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "h1", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, "RESTORE_PASSWORD.SUCCESS_RESTORED"));
  }
}
function RestorePasswordPage_ng_container_15_p_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "p", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, "RESTORE_PASSWORD.SUCCESS_LOGIN"));
  }
}
function RestorePasswordPage_ng_container_15_p_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "p", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, "RESTORE_PASSWORD.SUCCESS_UPDATED"));
  }
}
function RestorePasswordPage_ng_container_15_ion_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RestorePasswordPage_ng_container_15_ion_button_8_Template_ion_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r9.navigationService.goToLoginPage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "ion-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 1, "SIGN_IN.LOGIN"), " ");
  }
}
function RestorePasswordPage_ng_container_15_ion_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RestorePasswordPage_ng_container_15_ion_button_9_Template_ion_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r11.navigationService.goBack());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "ion-icon", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 1, "COMMON.BACK"), " ");
  }
}
function RestorePasswordPage_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "header", 12)(2, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "ion-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](4, RestorePasswordPage_ng_container_15_h1_4_Template, 3, 3, "h1", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, RestorePasswordPage_ng_container_15_h1_5_Template, 3, 3, "h1", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, RestorePasswordPage_ng_container_15_p_6_Template, 3, 3, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, RestorePasswordPage_ng_container_15_p_7_Template, 3, 3, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](8, RestorePasswordPage_ng_container_15_ion_button_8_Template, 4, 3, "ion-button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, RestorePasswordPage_ng_container_15_ion_button_9_Template, 4, 3, "ion-button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.getLocalUser);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r0.getLocalUser);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r0.getLocalUser);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.getLocalUser);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r0.getLocalUser);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.getLocalUser);
  }
}
function RestorePasswordPage_ng_container_16_div_9_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 34)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 1, "USER_ERRORS.REQUIRED"));
  }
}
function RestorePasswordPage_ng_container_16_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 29)(1, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](2, "ion-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "input", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("input", function RestorePasswordPage_ng_container_16_div_9_Template_input_input_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r18);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r17.showEmailRequiredError = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, RestorePasswordPage_ng_container_16_div_9_div_5_Template, 4, 3, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("input-wrapper--auth-error", ctx_r13.showEmailRequiredError);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](4, 4, "RESTORE_PASSWORD.EMAIL_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r13.showEmailRequiredError);
  }
}
function RestorePasswordPage_ng_container_16_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "ion-spinner", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function RestorePasswordPage_ng_container_16_div_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div")(1, "ion-button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RestorePasswordPage_ng_container_16_div_11_Template_ion_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r20);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r19.sendMailCode());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 1, "RESTORE_PASSWORD.RESTORE_BUTTON"), " ");
  }
}
function RestorePasswordPage_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "header", 12)(2, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "ion-icon", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "p", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "form", 25)(8, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](9, RestorePasswordPage_ng_container_16_div_9_Template, 6, 6, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](10, RestorePasswordPage_ng_container_16_div_10_Template, 2, 0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](11, RestorePasswordPage_ng_container_16_div_11_Template, 4, 3, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](6, 5, "RESTORE_PASSWORD.INFO_MESSAGE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", ctx_r1.restorePassForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.needsEmailInput);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r1.loading);
  }
}
function RestorePasswordPage_ng_container_17_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 34)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 1, "USER_ERRORS.REQUIRED"));
  }
}
function RestorePasswordPage_ng_container_17_div_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 34)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 1, "USER_ERRORS.REQUIRED"));
  }
}
function RestorePasswordPage_ng_container_17_div_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "ion-spinner", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function RestorePasswordPage_ng_container_17_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div")(1, "ion-button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RestorePasswordPage_ng_container_17_div_30_Template_ion_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r28);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r27.checkRestoreCode());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 1, "RESTORE_PASSWORD.VERIFY_CODE"), " ");
  }
}
const _c0 = function (a0) {
  return {
    seconds: a0
  };
};
function RestorePasswordPage_ng_container_17_span_36_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](2, 1, "RESTORE_PASSWORD.RESEND_IN", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction1"](4, _c0, ctx_r25.resendCountdown)));
  }
}
function RestorePasswordPage_ng_container_17_span_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](2, 1, "RESTORE_PASSWORD.RESEND"));
  }
}
const _c1 = function () {
  return {
    standalone: true
  };
};
function RestorePasswordPage_ng_container_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "form", 25)(7, "div", 26)(8, "div", 29)(9, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](10, "ion-icon", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "input", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function RestorePasswordPage_ng_container_17_Template_input_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r30);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r29.code = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "div", 29)(14, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](15, "ion-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "input", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("input", function RestorePasswordPage_ng_container_17_Template_input_input_16_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r30);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r31.showPassRequiredError = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "ion-button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RestorePasswordPage_ng_container_17_Template_ion_button_click_18_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r30);
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r32.showPass = !ctx_r32.showPass);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](19, "ion-icon", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](20, RestorePasswordPage_ng_container_17_div_20_Template, 4, 3, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](21, "div", 29)(22, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](23, "ion-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](24, "input", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("input", function RestorePasswordPage_ng_container_17_Template_input_input_24_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r30);
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r33.showPassRepRequiredError = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](25, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](26, "ion-button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RestorePasswordPage_ng_container_17_Template_ion_button_click_26_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r30);
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r34.showPass = !ctx_r34.showPass);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](27, "ion-icon", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](28, RestorePasswordPage_ng_container_17_div_28_Template, 4, 3, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](29, RestorePasswordPage_ng_container_17_div_29_Template, 2, 0, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](30, RestorePasswordPage_ng_container_17_div_30_Template, 4, 3, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](31, "div", 46)(32, "p", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](34, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](35, "button", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RestorePasswordPage_ng_container_17_Template_button_click_35_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r30);
      const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r35.resendCode());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](36, RestorePasswordPage_ng_container_17_span_36_Template, 3, 6, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](37, RestorePasswordPage_ng_container_17_span_37_Template, 3, 3, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](3, 24, "RESTORE_PASSWORD.VERIFICATION_MESSAGE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r2.needsEmailInput ? (tmp_1_0 = ctx_r2.restorePassForm.get("email")) == null ? null : tmp_1_0.value : ctx_r2.getLocalUser == null ? null : ctx_r2.getLocalUser.email);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", ctx_r2.restorePassForm);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](12, 26, "RESTORE_PASSWORD.CODE_PLACEHOLDER"))("ngModel", ctx_r2.code)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](34, _c1));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("input-wrapper--auth-error", ctx_r2.showPassRequiredError);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("type", ctx_r2.showPass ? "text" : "password")("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](17, 28, "RESTORE_PASSWORD.NEW_PASSWORD"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("name", ctx_r2.showPass ? "eye-off-outline" : "eye-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r2.showPassRequiredError);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵclassProp"]("input-wrapper--auth-error", ctx_r2.showPassRepRequiredError);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("type", ctx_r2.showPass ? "text" : "password")("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](25, 30, "RESTORE_PASSWORD.REPEAT_PASSWORD"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("name", ctx_r2.showPass ? "eye-off-outline" : "eye-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r2.showPassRepRequiredError);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r2.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r2.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](34, 32, "RESTORE_PASSWORD.NO_CODE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r2.loading || ctx_r2.resendDisabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r2.resendDisabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r2.resendDisabled);
  }
}
class RestorePasswordPage {
  get effectiveEmail() {
    return this.needsEmailInput ? this.restorePassForm?.get('email')?.value : this.localEmail;
  }
  get getLocalUser() {
    return this.userService.getLocalUser;
  }
  constructor(navigationService, matchPasswords, modalController, userService, utilService, ionicUtilService, translate) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "navigationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "matchPasswords", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "modalController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "userService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "utilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "translate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "restorePassForm", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "code", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "showPass", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "loading", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "codeSended", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "codeAccepted", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "needsEmailInput", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "resendDisabled", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "resendCountdown", 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "showEmailRequiredError", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "showPassRequiredError", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "showPassRepRequiredError", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "resendInterval", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "localEmail", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "RESEND_COOLDOWN_SECONDS", 60);
    // El componente se destruye/recrea al navegar (atrás/adelante), lo que
    // reseteaba resendDisabled a false aunque el cooldown de 60s del backend
    // siguiera activo: el usuario podía pulsar "Reenviar" dentro de esa
    // ventana y recibir un 200/429 sin que el código cambiase. Se persiste el
    // timestamp del último envío para reconstruir el cooldown restante.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "RESEND_STORAGE_KEY", 'trainfit.restorePasswordCodeSentAt');
    this.navigationService = navigationService;
    this.matchPasswords = matchPasswords;
    this.modalController = modalController;
    this.userService = userService;
    this.utilService = utilService;
    this.ionicUtilService = ionicUtilService;
    this.translate = translate;
  }
  ngOnInit() {
    this.initVariables();
    this.initForm();
    this.restoreResendCooldown();
  }
  initVariables() {
    this.showPass = false;
    this.loading = false;
    this.localEmail = this.userService.getLocalUser?.email ?? null;
    this.needsEmailInput = !this.localEmail;
  }
  initForm() {
    const controls = {
      password: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, src_app_core_validators_password_complexity__WEBPACK_IMPORTED_MODULE_1__.PasswordComplexity.basicComplexity()])),
      passwordRep: new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, src_app_core_validators_password_complexity__WEBPACK_IMPORTED_MODULE_1__.PasswordComplexity.basicComplexity()]))
    };
    if (this.needsEmailInput) {
      controls['email'] = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.Validators.email]));
    }
    this.restorePassForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormGroup(controls, {
      validators: this.matchPasswords.matchPassword
    });
    this.restorePassForm.valueChanges.subscribe(() => {
      this.showEmailRequiredError = false;
      this.showPassRequiredError = false;
      this.showPassRepRequiredError = false;
    });
  }
  sendMailCode() {
    this.showEmailRequiredError = !this.restorePassForm.get('email')?.value;
    const email = this.needsEmailInput ? this.restorePassForm.get('email')?.value : this.userService.getLocalUser?.email;
    const emailValid = this.needsEmailInput ? this.restorePassForm.get('email')?.valid : !!email;
    if (emailValid) {
      if (!email) {
        this.ionicUtilService.showErrorToast(this.translate.instant('RESTORE_PASSWORD.TOAST_USER_EMAIL_NOT_FOUND'), this.translate.instant('RESTORE_PASSWORD.TOAST_ERROR_DEFAULT'), 3000);
        return;
      }
      this.loading = true;
      this.userService.sendMailCode(email).subscribe({
        next: () => {
          this.loading = false;
          this.codeSended = true;
          this.persistCodeSentAt(email);
          this.startResendCooldown();
          this.ionicUtilService.showSuccessToast(this.translate.instant('RESTORE_PASSWORD.TOAST_CODE_SENT'), 3000);
        },
        error: err => {
          this.loading = false;
          this.ionicUtilService.showErrorToast(err, this.translate.instant('RESTORE_PASSWORD.TOAST_ERROR_SEND_CODE'), 3000);
        }
      });
    }
  }
  checkRestoreCode() {
    const email = this.needsEmailInput ? this.restorePassForm.get('email')?.value : this.userService.getLocalUser?.email;
    if (!email) {
      this.ionicUtilService.showErrorToast(this.translate.instant('RESTORE_PASSWORD.TOAST_USER_EMAIL_NOT_FOUND'), this.translate.instant('RESTORE_PASSWORD.TOAST_ERROR_DEFAULT'), 3000);
      return;
    }
    const password = this.restorePassForm.controls.password.value;
    const passwordRep = this.restorePassForm.controls.passwordRep.value;
    this.showPassRequiredError = !password;
    this.showPassRepRequiredError = !passwordRep;
    if (!password || !passwordRep) {
      this.ionicUtilService.showErrorToast(this.translate.instant('USER_ERRORS.PASSWORD_REQUIRED'));
      return;
    }
    if (this.restorePassForm.errors?.['notSame']) {
      this.ionicUtilService.showErrorToast(this.translate.instant('USER_ERRORS.PASSWORDS_NOT_MATCH'));
      return;
    }
    this.loading = true;
    this.userService.checkRestoreCode(email, password, (this.code || '').toLowerCase()).subscribe({
      next: () => {
        this.loading = false;
        this.ionicUtilService.showSuccessToast(this.translate.instant('RESTORE_PASSWORD.TOAST_PASSWORD_CHANGED'), 2000);
        if (this.userService.getLocalUser) {
          this.navigationService.goBack();
        } else {
          this.codeAccepted = true;
        }
      },
      error: err => {
        this.loading = false;
        this.ionicUtilService.showErrorToast(err, this.translate.instant('RESTORE_PASSWORD.TOAST_ERROR_INVALID_CODE'), 3000);
      }
    });
  }
  resendCode() {
    if (this.resendDisabled) return;
    const email = this.needsEmailInput ? this.restorePassForm.get('email')?.value : this.userService.getLocalUser?.email;
    if (!email) return;
    this.persistCodeSentAt(email);
    this.startResendCooldown();
    this.loading = true;
    this.userService.sendMailCode(email).subscribe({
      next: () => {
        this.loading = false;
        this.code = '';
        this.ionicUtilService.showSuccessToast(this.translate.instant('RESTORE_PASSWORD.TOAST_CODE_RESENT'), 3000);
      },
      error: err => {
        this.loading = false;
        this.ionicUtilService.showErrorToast(err, this.translate.instant('RESTORE_PASSWORD.TOAST_ERROR_RESEND_CODE'), 3000);
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
  persistCodeSentAt(email) {
    try {
      localStorage.setItem(this.RESEND_STORAGE_KEY, JSON.stringify({
        email: (email || '').toLowerCase(),
        sentAt: new Date().toISOString()
      }));
    } catch {
      // localStorage no disponible (modo privado, etc.) — el cooldown seguirá
      // aplicándose igualmente en el backend, solo se pierde la restauración
      // de la cuenta atrás tras recrear el componente.
    }
  }
  restoreResendCooldown() {
    try {
      const raw = localStorage.getItem(this.RESEND_STORAGE_KEY);
      if (!raw) return;
      const stored = JSON.parse(raw);
      const email = (this.effectiveEmail || '').toLowerCase();
      if (!email || stored.email !== email) return;
      const sentAt = new Date(stored.sentAt).getTime();
      if (Number.isNaN(sentAt)) return;
      const elapsedSeconds = Math.floor((Date.now() - sentAt) / 1000);
      const remaining = this.RESEND_COOLDOWN_SECONDS - elapsedSeconds;
      if (remaining > 0) {
        this.startResendCooldown(remaining);
      }
    } catch {
      // Estado corrupto en localStorage: se ignora, el cooldown del backend
      // sigue protegiendo el endpoint aunque la UI no lo refleje.
    }
  }
  ngOnDestroy() {
    if (this.resendInterval) clearInterval(this.resendInterval);
  }
  goBack() {
    this.navigationService.goBack();
  }
}
_RestorePasswordPage = RestorePasswordPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RestorePasswordPage, "\u0275fac", function RestorePasswordPage_Factory(t) {
  return new (t || _RestorePasswordPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_2__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_core_validators_matchPasswords__WEBPACK_IMPORTED_MODULE_3__.MatchPasswords), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_core_services_util_util_service__WEBPACK_IMPORTED_MODULE_5__.UtilService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_6__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RestorePasswordPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: _RestorePasswordPage,
  selectors: [["app-restore-password"]],
  decls: 18,
  vars: 9,
  consts: [[1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], [1, "tf-page-header__back-button", 3, "click"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "auth-content"], [1, "auth-shell"], [1, "auth-card"], [4, "ngIf"], [1, "brand-block"], [1, "success-icon"], ["name", "checkmark-circle"], ["class", "page-title", 4, "ngIf"], ["class", "page-subtitle", 4, "ngIf"], ["expand", "block", "class", "login-button", 3, "click", 4, "ngIf"], [1, "page-title"], [1, "page-subtitle"], ["expand", "block", 1, "login-button", 3, "click"], ["name", "log-in-outline", "slot", "start"], ["name", "arrow-back-outline", "slot", "start"], [1, "icon-container"], ["name", "key"], [1, "login-form", 3, "formGroup"], [1, "form-fields"], ["class", "input-group", 4, "ngIf"], ["class", "loading-container", 4, "ngIf"], [1, "input-group"], [1, "input-wrapper"], ["name", "mail-outline", 1, "input-icon"], ["type", "email", "autocapitalize", "none", "autocorrect", "off", "spellcheck", "false", "formControlName", "email", "appLowercaseEmailInput", "", 1, "input-field", 3, "placeholder", "input"], ["class", "validation-error", 4, "ngIf"], [1, "validation-error"], [1, "loading-container"], ["name", "dots", "color", "primary"], ["type", "button", "expand", "block", 1, "login-button", 3, "click"], [1, "verification-message"], ["name", "shield-checkmark-outline", 1, "input-icon"], ["type", "text", 1, "input-field", "input-field--code", 3, "placeholder", "ngModel", "ngModelOptions", "ngModelChange"], ["name", "lock-closed-outline", 1, "input-icon"], ["formControlName", "password", 1, "input-field", 3, "type", "placeholder", "input"], ["fill", "clear", "type", "button", 1, "password-toggle", 3, "click"], [3, "name"], ["formControlName", "passwordRep", 1, "input-field", 3, "type", "placeholder", "input"], [1, "resend-section"], [1, "resend-text"], ["type", "button", 1, "text-link", "forgot-password", 3, "disabled", "click"]],
  template: function RestorePasswordPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-header")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RestorePasswordPage_Template_button_click_4_listener() {
        return ctx.goBack();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](5, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](6, "ion-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](7, "div", 5)(8, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](10, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](11, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](12, "ion-content", 8)(13, "section", 9)(14, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](15, RestorePasswordPage_ng_container_15_Template, 10, 6, "ng-container", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](16, RestorePasswordPage_ng_container_16_Template, 12, 7, "ng-container", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](17, RestorePasswordPage_ng_container_17_Template, 38, 35, "ng-container", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](5, 5, "COMMON.BACK"));
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind1"](10, 7, "RESTORE_PASSWORD.TITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.codeAccepted);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.codeSended && !ctx.codeAccepted);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.codeSended && !ctx.codeAccepted);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.FormControlName, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonSpinner, src_app_core_directives_lowercase_email_input_directive__WEBPACK_IMPORTED_MODULE_7__.LowercaseEmailInputDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe],
  styles: ["[_nghost-%COMP%] {\n  --bg-primary: #0a0a0b;\n  --bg-secondary: #111111;\n  --bg-tertiary: #1c1c1e;\n  --bg-elevated: rgba(24, 24, 26, 0.92);\n  --border-primary: rgba(255, 255, 255, 0.08);\n  --border-strong: rgba(254, 144, 0, 0.28);\n  --text-primary: #ffffff;\n  --text-secondary: #9ca3af;\n  --accent-primary: #fe9000;\n  --accent-primary-strong: #ff9f1a;\n  --danger: #ff5d5d;\n}\n\n.auth-content[_ngcontent-%COMP%] {\n  --background: radial-gradient(\n      circle at top,\n      rgba(254, 144, 0, 0.16),\n      transparent 30%\n    ),\n    linear-gradient(180deg, #0b0b0c 0%, #080809 100%);\n}\n\n.auth-shell[_ngcontent-%COMP%] {\n  min-height: 100%;\n  display: grid;\n  place-items: center;\n  padding: clamp(24px, 5vw, 48px) 20px;\n}\n\n.auth-card[_ngcontent-%COMP%] {\n  width: min(100%, 460px);\n  display: grid;\n  gap: clamp(24px, 4vw, 32px);\n  padding: 0;\n  background: transparent;\n  border: 0;\n  border-radius: 0;\n  box-shadow: none;\n}\n\n.brand-block[_ngcontent-%COMP%] {\n  display: grid;\n  place-items: center;\n}\n\n.icon-container[_ngcontent-%COMP%] {\n  width: 82px;\n  height: 82px;\n  margin: 0 auto 20px;\n  display: grid;\n  place-items: center;\n  border-radius: 24px;\n  color: #111111;\n  background: linear-gradient(135deg, #fe9000, #ffb347);\n  box-shadow: 0 18px 42px rgba(254, 144, 0, 0.32);\n}\n.icon-container[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 42px;\n}\n\n.page-title[_ngcontent-%COMP%] {\n  margin: 0;\n  color: var(--text-primary);\n  font-size: clamp(24px, 5vw, 28px);\n  font-weight: 700;\n  letter-spacing: -0.02em;\n}\n\n.page-subtitle[_ngcontent-%COMP%] {\n  margin: 8px 0 0;\n  color: var(--text-secondary);\n  font-size: 15px;\n  line-height: 1.5;\n  text-align: center;\n}\n\n.success-icon[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.success-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  color: var(--accent-primary);\n}\n\n.login-form[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.form-fields[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n}\n\n.input-group[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 8px;\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  min-height: 54px;\n  background: var(--bg-tertiary);\n  border: 1px solid var(--border-primary);\n  border-radius: 16px;\n  transition: border-color 0.2s ease, box-shadow 0.2s ease;\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--border-strong);\n  box-shadow: 0 0 0 4px rgba(254, 144, 0, 0.12);\n}\n.input-wrapper.input-wrapper--auth-error[_ngcontent-%COMP%] {\n  border-color: rgba(255, 93, 93, 0.72);\n  box-shadow: 0 0 0 4px rgba(255, 93, 93, 0.12);\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 18px;\n  width: 20px;\n  height: 20px;\n  color: var(--text-secondary);\n  pointer-events: none;\n}\n\n.input-field[_ngcontent-%COMP%] {\n  width: 100%;\n  border: 0;\n  outline: 0;\n  background: transparent;\n  color: var(--text-primary);\n  padding: 16px 54px 16px 50px;\n  font-size: 16px;\n  font-weight: 500;\n  font-family: inherit;\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--text-secondary);\n  opacity: 0.84;\n}\n.input-field.input-field--code[_ngcontent-%COMP%] {\n  text-align: center;\n  letter-spacing: 8px;\n  font-size: 18px;\n  font-weight: 600;\n}\n.input-field.input-field--code[_ngcontent-%COMP%]::placeholder {\n  letter-spacing: 4px;\n}\n\n.password-toggle[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 6px;\n  margin: 0;\n  height: 42px;\n  width: 42px;\n  --color: var(--text-secondary);\n  --padding-start: 0;\n  --padding-end: 0;\n  --border-radius: 12px;\n}\n\n.validation-error[_ngcontent-%COMP%] {\n  padding-left: 4px;\n  font-size: 13px;\n  font-weight: 500;\n  line-height: 1.45;\n  color: var(--danger);\n}\n\n.login-feedback[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 20px 1fr;\n  align-items: start;\n  gap: 10px;\n  padding: 12px 14px;\n  border: 1px solid rgba(255, 93, 93, 0.34);\n  border-radius: 8px;\n  background: rgba(255, 93, 93, 0.1);\n  color: #ffdede;\n  font-size: 14px;\n  font-weight: 600;\n  line-height: 1.45;\n  margin-bottom: 8px;\n}\n.login-feedback[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  margin-top: 1px;\n  color: var(--danger);\n}\n.login-feedback[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n}\n\n.verification-message[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  border-radius: 12px;\n  background: var(--bg-tertiary);\n  border: 1px solid var(--border-primary);\n  color: var(--text-primary);\n  font-size: 15px;\n  line-height: 1.5;\n}\n.verification-message[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--accent-primary);\n}\n\n.login-button[_ngcontent-%COMP%] {\n  width: 100%;\n  margin: 24px 0 0;\n  --background: linear-gradient(\n    135deg,\n    var(--accent-primary) 0%,\n    var(--accent-primary-strong) 100%\n  );\n  --color: #ffffff;\n  --border-radius: 16px;\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n  --box-shadow: 0 14px 28px rgba(254, 144, 0, 0.22);\n  font-size: 16px;\n  font-weight: 700;\n}\n.login-button[_ngcontent-%COMP%]:disabled {\n  --background: #2a2a2a;\n  --color: var(--text-secondary);\n  --box-shadow: none;\n}\n\n.loading-container[_ngcontent-%COMP%] {\n  min-height: 80px;\n  display: grid;\n  place-items: center;\n}\n.loading-container[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n}\n\n.resend-section[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 16px;\n}\n\n.resend-text[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  color: var(--text-secondary);\n  font-size: 14px;\n}\n\n.text-link[_ngcontent-%COMP%] {\n  border: 0;\n  background: transparent;\n  padding: 0;\n  cursor: pointer;\n  font: inherit;\n}\n\n.forgot-password[_ngcontent-%COMP%] {\n  color: var(--accent-primary);\n  font-weight: 600;\n  font-size: 14px;\n}\n.forgot-password[_ngcontent-%COMP%]:disabled {\n  opacity: 0.5;\n  cursor: default;\n}\n\n@media (max-width: 479px) {\n  .auth-shell[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    gap: 22px;\n  }\n  .input-wrapper[_ngcontent-%COMP%] {\n    min-height: 50px;\n  }\n  .input-field[_ngcontent-%COMP%] {\n    padding: 15px 50px 15px 46px;\n    font-size: 15px;\n  }\n}\n@media (min-width: 768px) {\n  .auth-card[_ngcontent-%COMP%] {\n    width: min(100%, 500px);\n  }\n}\n@media (max-height: 720px) {\n  .auth-shell[_ngcontent-%COMP%] {\n    align-items: start;\n  }\n  .auth-card[_ngcontent-%COMP%] {\n    gap: 20px;\n    margin-block: 12px;\n  }\n}\n@media (prefers-reduced-motion: reduce) {\n  *[_ngcontent-%COMP%], *[_ngcontent-%COMP%]::before, *[_ngcontent-%COMP%]::after {\n    transition: none !important;\n    animation: none !important;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL2F1dGhlbnRpY2F0aW9uL2NvbXBvbmVudHMvcmVzdG9yZS1wYXNzd29yZC9yZXN0b3JlLXBhc3N3b3JkLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHFCQUFBO0VBQ0EsdUJBQUE7RUFDQSxzQkFBQTtFQUNBLHFDQUFBO0VBQ0EsMkNBQUE7RUFDQSx3Q0FBQTtFQUNBLHVCQUFBO0VBQ0EseUJBQUE7RUFDQSx5QkFBQTtFQUNBLGdDQUFBO0VBQ0EsaUJBQUE7QUFDRjs7QUFFQTtFQUNFOzs7OztxREFBQTtBQU1GOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQ0FBQTtBQUNGOztBQUVBO0VBQ0UsdUJBQUE7RUFDQSxhQUFBO0VBQ0EsMkJBQUE7RUFDQSxVQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EscURBQUE7RUFDQSwrQ0FBQTtBQUNGO0FBQ0U7RUFDRSxlQUFBO0FBQ0o7O0FBR0E7RUFDRSxTQUFBO0VBQ0EsMEJBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFBRjs7QUFHQTtFQUNFLGVBQUE7RUFDQSw0QkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBQUY7O0FBR0E7RUFDRSxrQkFBQTtBQUFGO0FBRUU7RUFDRSxlQUFBO0VBQ0EsNEJBQUE7QUFBSjs7QUFJQTtFQUNFLFdBQUE7QUFERjs7QUFJQTtFQUNFLGFBQUE7RUFDQSxTQUFBO0FBREY7O0FBSUE7RUFDRSxhQUFBO0VBQ0EsUUFBQTtBQURGOztBQUlBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLDhCQUFBO0VBQ0EsdUNBQUE7RUFDQSxtQkFBQTtFQUNBLHdEQUFBO0FBREY7QUFHRTtFQUNFLGtDQUFBO0VBQ0EsNkNBQUE7QUFESjtBQUlFO0VBQ0UscUNBQUE7RUFDQSw2Q0FBQTtBQUZKOztBQU1BO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSw0QkFBQTtFQUNBLG9CQUFBO0FBSEY7O0FBTUE7RUFDRSxXQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7RUFDQSx1QkFBQTtFQUNBLDBCQUFBO0VBQ0EsNEJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtBQUhGO0FBS0U7RUFDRSw0QkFBQTtFQUNBLGFBQUE7QUFISjtBQU1FO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQUpKO0FBTUk7RUFDRSxtQkFBQTtBQUpOOztBQVNBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsOEJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUFORjs7QUFTQTtFQUNFLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtBQU5GOztBQVNBO0VBQ0UsYUFBQTtFQUNBLCtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSx5Q0FBQTtFQUNBLGtCQUFBO0VBQ0Esa0NBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQU5GO0FBUUU7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxvQkFBQTtBQU5KO0FBU0U7RUFDRSxTQUFBO0FBUEo7O0FBV0E7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSx1Q0FBQTtFQUNBLDBCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBUkY7QUFVRTtFQUNFLDRCQUFBO0FBUko7O0FBWUE7RUFDRSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQTs7OztHQUFBO0VBS0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxpREFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQVRGO0FBV0U7RUFDRSxxQkFBQTtFQUNBLDhCQUFBO0VBQ0Esa0JBQUE7QUFUSjs7QUFhQTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0FBVkY7QUFZRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FBVko7O0FBY0E7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0FBWEY7O0FBY0E7RUFDRSxlQUFBO0VBQ0EsNEJBQUE7RUFDQSxlQUFBO0FBWEY7O0FBY0E7RUFDRSxTQUFBO0VBQ0EsdUJBQUE7RUFDQSxVQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7QUFYRjs7QUFjQTtFQUNFLDRCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBWEY7QUFhRTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBWEo7O0FBZ0JBO0VBQ0U7SUFDRSxhQUFBO0VBYkY7RUFnQkE7SUFDRSxTQUFBO0VBZEY7RUFpQkE7SUFDRSxnQkFBQTtFQWZGO0VBa0JBO0lBQ0UsNEJBQUE7SUFDQSxlQUFBO0VBaEJGO0FBQ0Y7QUFtQkE7RUFDRTtJQUNFLHVCQUFBO0VBakJGO0FBQ0Y7QUFvQkE7RUFDRTtJQUNFLGtCQUFBO0VBbEJGO0VBcUJBO0lBQ0UsU0FBQTtJQUNBLGtCQUFBO0VBbkJGO0FBQ0Y7QUFzQkE7RUFDRTs7O0lBR0UsMkJBQUE7SUFDQSwwQkFBQTtFQXBCRjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICAtLWJnLXByaW1hcnk6ICMwYTBhMGI7XG4gIC0tYmctc2Vjb25kYXJ5OiAjMTExMTExO1xuICAtLWJnLXRlcnRpYXJ5OiAjMWMxYzFlO1xuICAtLWJnLWVsZXZhdGVkOiByZ2JhKDI0LCAyNCwgMjYsIDAuOTIpO1xuICAtLWJvcmRlci1wcmltYXJ5OiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDgpO1xuICAtLWJvcmRlci1zdHJvbmc6IHJnYmEoMjU0LCAxNDQsIDAsIDAuMjgpO1xuICAtLXRleHQtcHJpbWFyeTogI2ZmZmZmZjtcbiAgLS10ZXh0LXNlY29uZGFyeTogIzljYTNhZjtcbiAgLS1hY2NlbnQtcHJpbWFyeTogI2ZlOTAwMDtcbiAgLS1hY2NlbnQtcHJpbWFyeS1zdHJvbmc6ICNmZjlmMWE7XG4gIC0tZGFuZ2VyOiAjZmY1ZDVkO1xufVxuXG4uYXV0aC1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiByYWRpYWwtZ3JhZGllbnQoXG4gICAgICBjaXJjbGUgYXQgdG9wLFxuICAgICAgcmdiYSgyNTQsIDE0NCwgMCwgMC4xNiksXG4gICAgICB0cmFuc3BhcmVudCAzMCVcbiAgICApLFxuICAgIGxpbmVhci1ncmFkaWVudCgxODBkZWcsICMwYjBiMGMgMCUsICMwODA4MDkgMTAwJSk7XG59XG5cbi5hdXRoLXNoZWxsIHtcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZ3JpZDtcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogY2xhbXAoMjRweCwgNXZ3LCA0OHB4KSAyMHB4O1xufVxuXG4uYXV0aC1jYXJkIHtcbiAgd2lkdGg6IG1pbigxMDAlLCA0NjBweCk7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogY2xhbXAoMjRweCwgNHZ3LCAzMnB4KTtcbiAgcGFkZGluZzogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogMDtcbiAgYm9yZGVyLXJhZGl1czogMDtcbiAgYm94LXNoYWRvdzogbm9uZTtcbn1cblxuLmJyYW5kLWJsb2NrIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcbn1cblxuLmljb24tY29udGFpbmVyIHtcbiAgd2lkdGg6IDgycHg7XG4gIGhlaWdodDogODJweDtcbiAgbWFyZ2luOiAwIGF1dG8gMjBweDtcbiAgZGlzcGxheTogZ3JpZDtcbiAgcGxhY2UtaXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogMjRweDtcbiAgY29sb3I6ICMxMTExMTE7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmZTkwMDAsICNmZmIzNDcpO1xuICBib3gtc2hhZG93OiAwIDE4cHggNDJweCByZ2JhKDI1NCwgMTQ0LCAwLCAwLjMyKTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiA0MnB4O1xuICB9XG59XG5cbi5wYWdlLXRpdGxlIHtcbiAgbWFyZ2luOiAwO1xuICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KTtcbiAgZm9udC1zaXplOiBjbGFtcCgyNHB4LCA1dncsIDI4cHgpO1xuICBmb250LXdlaWdodDogNzAwO1xuICBsZXR0ZXItc3BhY2luZzogLTAuMDJlbTtcbn1cblxuLnBhZ2Utc3VidGl0bGUge1xuICBtYXJnaW46IDhweCAwIDA7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uc3VjY2Vzcy1pY29uIHtcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDY0cHg7XG4gICAgY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgfVxufVxuXG4ubG9naW4tZm9ybSB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uZm9ybS1maWVsZHMge1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IDE2cHg7XG59XG5cbi5pbnB1dC1ncm91cCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogOHB4O1xufVxuXG4uaW5wdXQtd3JhcHBlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogNTRweDtcbiAgYmFja2dyb3VuZDogdmFyKC0tYmctdGVydGlhcnkpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItcHJpbWFyeSk7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjJzIGVhc2UsIGJveC1zaGFkb3cgMC4ycyBlYXNlO1xuXG4gICY6Zm9jdXMtd2l0aGluIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLWJvcmRlci1zdHJvbmcpO1xuICAgIGJveC1zaGFkb3c6IDAgMCAwIDRweCByZ2JhKDI1NCwgMTQ0LCAwLCAwLjEyKTtcbiAgfVxuXG4gICYuaW5wdXQtd3JhcHBlci0tYXV0aC1lcnJvciB7XG4gICAgYm9yZGVyLWNvbG9yOiByZ2JhKDI1NSwgOTMsIDkzLCAwLjcyKTtcbiAgICBib3gtc2hhZG93OiAwIDAgMCA0cHggcmdiYSgyNTUsIDkzLCA5MywgMC4xMik7XG4gIH1cbn1cblxuLmlucHV0LWljb24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDE4cHg7XG4gIHdpZHRoOiAyMHB4O1xuICBoZWlnaHQ6IDIwcHg7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuXG4uaW5wdXQtZmllbGQge1xuICB3aWR0aDogMTAwJTtcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6IHZhcigtLXRleHQtcHJpbWFyeSk7XG4gIHBhZGRpbmc6IDE2cHggNTRweCAxNnB4IDUwcHg7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG5cbiAgJjo6cGxhY2Vob2xkZXIge1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gICAgb3BhY2l0eTogMC44NDtcbiAgfVxuXG4gICYuaW5wdXQtZmllbGQtLWNvZGUge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBsZXR0ZXItc3BhY2luZzogOHB4O1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuXG4gICAgJjo6cGxhY2Vob2xkZXIge1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDRweDtcbiAgICB9XG4gIH1cbn1cblxuLnBhc3N3b3JkLXRvZ2dsZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IDZweDtcbiAgbWFyZ2luOiAwO1xuICBoZWlnaHQ6IDQycHg7XG4gIHdpZHRoOiA0MnB4O1xuICAtLWNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbiAgLS1ib3JkZXItcmFkaXVzOiAxMnB4O1xufVxuXG4udmFsaWRhdGlvbi1lcnJvciB7XG4gIHBhZGRpbmctbGVmdDogNHB4O1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIGxpbmUtaGVpZ2h0OiAxLjQ1O1xuICBjb2xvcjogdmFyKC0tZGFuZ2VyKTtcbn1cblxuLmxvZ2luLWZlZWRiYWNrIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAyMHB4IDFmcjtcbiAgYWxpZ24taXRlbXM6IHN0YXJ0O1xuICBnYXA6IDEwcHg7XG4gIHBhZGRpbmc6IDEycHggMTRweDtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDkzLCA5MywgMC4zNCk7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDkzLCA5MywgMC4xKTtcbiAgY29sb3I6ICNmZmRlZGU7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbGluZS1oZWlnaHQ6IDEuNDU7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcblxuICBpb24taWNvbiB7XG4gICAgd2lkdGg6IDIwcHg7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIG1hcmdpbi10b3A6IDFweDtcbiAgICBjb2xvcjogdmFyKC0tZGFuZ2VyKTtcbiAgfVxuXG4gIHAge1xuICAgIG1hcmdpbjogMDtcbiAgfVxufVxuXG4udmVyaWZpY2F0aW9uLW1lc3NhZ2Uge1xuICBwYWRkaW5nOiAxNHB4IDE2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWJnLXRlcnRpYXJ5KTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xuICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KTtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBsaW5lLWhlaWdodDogMS41O1xuXG4gIHN0cm9uZyB7XG4gICAgY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgfVxufVxuXG4ubG9naW4tYnV0dG9uIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMjRweCAwIDA7XG4gIC0tYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxuICAgIDEzNWRlZyxcbiAgICB2YXIoLS1hY2NlbnQtcHJpbWFyeSkgMCUsXG4gICAgdmFyKC0tYWNjZW50LXByaW1hcnktc3Ryb25nKSAxMDAlXG4gICk7XG4gIC0tY29sb3I6ICNmZmZmZmY7XG4gIC0tYm9yZGVyLXJhZGl1czogMTZweDtcbiAgLS1wYWRkaW5nLXRvcDogMTZweDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMTZweDtcbiAgLS1ib3gtc2hhZG93OiAwIDE0cHggMjhweCByZ2JhKDI1NCwgMTQ0LCAwLCAwLjIyKTtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBmb250LXdlaWdodDogNzAwO1xuXG4gICY6ZGlzYWJsZWQge1xuICAgIC0tYmFja2dyb3VuZDogIzJhMmEyYTtcbiAgICAtLWNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gICAgLS1ib3gtc2hhZG93OiBub25lO1xuICB9XG59XG5cbi5sb2FkaW5nLWNvbnRhaW5lciB7XG4gIG1pbi1oZWlnaHQ6IDgwcHg7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIHBsYWNlLWl0ZW1zOiBjZW50ZXI7XG5cbiAgaW9uLXNwaW5uZXIge1xuICAgIHdpZHRoOiA0MHB4O1xuICAgIGhlaWdodDogNDBweDtcbiAgfVxufVxuXG4ucmVzZW5kLXNlY3Rpb24ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG59XG5cbi5yZXNlbmQtdGV4dCB7XG4gIG1hcmdpbjogMCAwIDRweDtcbiAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4udGV4dC1saW5rIHtcbiAgYm9yZGVyOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgcGFkZGluZzogMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmb250OiBpbmhlcml0O1xufVxuXG4uZm9yZ290LXBhc3N3b3JkIHtcbiAgY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAxNHB4O1xuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNTtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gIH1cbn1cblxuLy8gUmVzcG9uc2l2ZSDDosKAwpQgbWF0Y2hlcyBzaWduLWluIGJyZWFrcG9pbnRzXG5AbWVkaWEgKG1heC13aWR0aDogNDc5cHgpIHtcbiAgLmF1dGgtc2hlbGwge1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gIH1cblxuICAuYXV0aC1jYXJkIHtcbiAgICBnYXA6IDIycHg7XG4gIH1cblxuICAuaW5wdXQtd3JhcHBlciB7XG4gICAgbWluLWhlaWdodDogNTBweDtcbiAgfVxuXG4gIC5pbnB1dC1maWVsZCB7XG4gICAgcGFkZGluZzogMTVweCA1MHB4IDE1cHggNDZweDtcbiAgICBmb250LXNpemU6IDE1cHg7XG4gIH1cbn1cblxuQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gIC5hdXRoLWNhcmQge1xuICAgIHdpZHRoOiBtaW4oMTAwJSwgNTAwcHgpO1xuICB9XG59XG5cbkBtZWRpYSAobWF4LWhlaWdodDogNzIwcHgpIHtcbiAgLmF1dGgtc2hlbGwge1xuICAgIGFsaWduLWl0ZW1zOiBzdGFydDtcbiAgfVxuXG4gIC5hdXRoLWNhcmQge1xuICAgIGdhcDogMjBweDtcbiAgICBtYXJnaW4tYmxvY2s6IDEycHg7XG4gIH1cbn1cblxuQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgKixcbiAgKjo6YmVmb3JlLFxuICAqOjphZnRlciB7XG4gICAgdHJhbnNpdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICAgIGFuaW1hdGlvbjogbm9uZSAhaW1wb3J0YW50O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ })

}]);
//# sourceMappingURL=packages_shared-features_src_app_features_authentication_components_restore-password_restore--cdba96.js.map