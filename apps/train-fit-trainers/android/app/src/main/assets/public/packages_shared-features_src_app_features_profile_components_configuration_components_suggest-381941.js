"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["packages_shared-features_src_app_features_profile_components_configuration_components_suggest-381941"],{

/***/ 25961:
/*!*************************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/profile/components/configuration/components/suggestions/suggestions.module.ts ***!
  \*************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SuggestionsPageModule: () => (/* binding */ SuggestionsPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _suggestions_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./suggestions.page */ 1298);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);

var _SuggestionsPageModule;





const routes = [{
  path: '',
  component: _suggestions_page__WEBPACK_IMPORTED_MODULE_2__.SuggestionsPage
}];
class SuggestionsPageModule {}
_SuggestionsPageModule = SuggestionsPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SuggestionsPageModule, "\u0275fac", function SuggestionsPageModule_Factory(t) {
  return new (t || _SuggestionsPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SuggestionsPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _SuggestionsPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SuggestionsPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](SuggestionsPageModule, {
    declarations: [_suggestions_page__WEBPACK_IMPORTED_MODULE_2__.SuggestionsPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ }),

/***/ 1298:
/*!***********************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/profile/components/configuration/components/suggestions/suggestions.page.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SuggestionsPage: () => (/* binding */ SuggestionsPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/util/navigation.service */ 22938);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 54844);

var _SuggestionsPage;







const _c0 = ["ionTextArea"];
function SuggestionsPage_div_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "ion-icon", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "ion-text", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](4, 1, "SUGGESTIONS.MIN_CHARS"));
  }
}
function SuggestionsPage_div_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 30)(1, "ion-button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SuggestionsPage_div_28_Template_ion_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r5.sendSuggestions());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "ion-icon", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](25);
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r2.isSending || ((_r0 == null ? null : _r0.value == null ? null : (tmp_0_0 = _r0.value.trim()) == null ? null : tmp_0_0.length) || 0) < 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](5, 2, "SUGGESTIONS.SEND"));
  }
}
function SuggestionsPage_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 30)(1, "ion-button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "ion-spinner", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "strong", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](5, 1, "SUGGESTIONS.PROCESSING"));
  }
}
class SuggestionsPage {
  constructor(navigationService, userService, ionicUtilService, translate) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "navigationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "userService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "translate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "ionTextArea", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "userEmail", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isSending", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "showThanks", false);
    this.navigationService = navigationService;
    this.userService = userService;
    this.ionicUtilService = ionicUtilService;
    this.translate = translate;
  }
  sendSuggestions() {
    this.isSending = true;
    const email = this.userService.getLocalUser?.email || this.userEmail;
    const message = (this.ionTextArea?.value || '').trim();
    if (message.length < 20) {
      this.isSending = false;
      return;
    }
    this.userService.sendSuggestions(email, message).subscribe(() => {
      const alertOptions = {
        header: this.translate.instant('SUGGESTIONS.SUCCESS_HEADER'),
        message: this.translate.instant('SUGGESTIONS.SUCCESS_MSG'),
        buttons: [this.translate.instant('COMMON.OK')]
      };
      this.ionicUtilService.showAlert(alertOptions);
      this.showThanks = true;
      this.isSending = false;
      if (this.ionTextArea) this.ionTextArea.value = '';
    }, () => {
      this.isSending = false;
      this.ionicUtilService.showAlert({
        header: this.translate.instant('SUGGESTIONS.ERROR_HEADER'),
        message: this.translate.instant('SUGGESTIONS.ERROR_MSG'),
        buttons: [this.translate.instant('COMMON.OK')]
      });
    });
  }
  close() {
    this.navigationService.goBack();
  }
}
_SuggestionsPage = SuggestionsPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SuggestionsPage, "\u0275fac", function SuggestionsPage_Factory(t) {
  return new (t || _SuggestionsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_1__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_2__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_3__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslateService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SuggestionsPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _SuggestionsPage,
  selectors: [["app-suggestions"]],
  viewQuery: function SuggestionsPage_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵloadQuery"]()) && (ctx.ionTextArea = _t.first);
    }
  },
  decls: 41,
  vars: 18,
  consts: [[1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], [1, "tf-page-header__back-button", 3, "click"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "page-container"], [1, "header-section"], [1, "header-content"], [1, "header-info"], [1, "page-subtitle"], [1, "header-icon"], ["name", "chatbubbles-outline", 1, "main-icon"], [1, "section-divider"], [1, "feedback-section"], [1, "feedback-content"], ["rows", "4", 1, "feedback-textarea", 3, "placeholder"], ["ionTextArea", ""], ["class", "textarea-helper", 4, "ngIf"], ["class", "action-section", 4, "ngIf", "ngIfElse"], ["sendingTpl", ""], [1, "footer-info"], [1, "info-card"], ["name", "heart-outline", 1, "info-icon"], [1, "info-text"], [1, "textarea-helper"], ["name", "information-circle-outline", "color", "warning"], ["color", "medium"], [1, "action-section"], ["fill", "solid", "color", "primary", "expand", "block", 1, "send-button", 3, "disabled", "click"], ["name", "send-outline", "slot", "start"], ["expand", "block", "disabled", ""], ["name", "crescent", "color", "light"], [2, "margin-left", "8px"]],
  template: function SuggestionsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function SuggestionsPage_Template_button_click_4_listener() {
        return ctx.close();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](5, "ion-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 5)(7, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](9, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](10, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "ion-content")(12, "div", 8)(13, "div", 9)(14, "div", 10)(15, "div", 11)(16, "h3", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](18, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](20, "ion-icon", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](21, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](22, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](23, "div", 17)(24, "ion-textarea", 18, 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](26, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](27, SuggestionsPage_div_27_Template, 5, 3, "div", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](28, SuggestionsPage_div_28_Template, 6, 4, "div", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](29, SuggestionsPage_ng_template_29_Template, 6, 3, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](31, "div", 23)(32, "div", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](33, "ion-icon", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](34, "div", 26)(35, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](36);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](37, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](38, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](39);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](40, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()()();
    }
    if (rf & 2) {
      const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](25);
      const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](30);
      let tmp_3_0;
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](9, 8, "SUGGESTIONS.TITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](18, 10, "SUGGESTIONS.SUBTITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](26, 12, "SUGGESTIONS.PLACEHOLDER"));
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ((_r0 == null ? null : _r0.value == null ? null : (tmp_3_0 = _r0.value.trim()) == null ? null : tmp_3_0.length) || 0) < 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.isSending)("ngIfElse", _r3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](37, 14, "SUGGESTIONS.FOOTER_TITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](40, 16, "SUGGESTIONS.FOOTER_TEXT"));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonSpinner, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonTextarea, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.TextValueAccessor, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__.TranslatePipe],
  styles: ["@media (min-width: 640px) {\n  .page-container[_ngcontent-%COMP%] {\n    max-width: 640px;\n    margin: 0 auto;\n  }\n}\n\n\n\n.header-section[_ngcontent-%COMP%] {\n  padding: 1.5rem 1rem 1rem 1rem;\n  background: var(--ion-background-color);\n}\n\n.header-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 1rem;\n}\n\n.header-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.page-subtitle[_ngcontent-%COMP%] {\n  font-size: 1 rem;\n  font-weight: 700;\n  color: var(--ion-color-primary-contrast);\n  margin: 0;\n  line-height: 1.3;\n}\n\n.header-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 3.5rem;\n  height: 3.5rem;\n  background: rgba(var(--ion-color-tertiary-rgb), 0.1);\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n\n.main-icon[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  color: var(--ion-color-tertiary);\n}\n\n\n\n.section-divider[_ngcontent-%COMP%] {\n  height: 1px;\n  background: var(--ion-color-medium-tint);\n  margin: 0 16px 12px 16px;\n  opacity: 0.4;\n}\n\n\n\n.feedback-section[_ngcontent-%COMP%] {\n  margin: 16px;\n}\n\n.feedback-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.feedback-textarea[_ngcontent-%COMP%] {\n  --background: var(--ion-item-background);\n  --color: var(--ion-color-primary-contrast);\n  --placeholder-color: var(--ion-color-medium);\n  --border-color: var(--ion-color-step-150);\n  border: 1px solid var(--ion-color-step-150);\n  border-radius: 12px;\n  padding: 12px;\n  font-size: 0.9rem;\n  min-height: 120px;\n}\n.feedback-textarea[_ngcontent-%COMP%]:focus-within {\n  --border-color: var(--ion-color-primary);\n  --highlight-color-focused: var(--ion-color-primary);\n  border-color: var(--ion-color-primary);\n  box-shadow: 0 0 0 2px rgba(var(--ion-color-primary-rgb), 0.15);\n}\n\n.textarea-helper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  margin-top: 8px;\n  font-size: 0.8rem;\n  color: var(--ion-color-medium);\n}\n\n.action-section[_ngcontent-%COMP%] {\n  margin: 24px 16px 16px 16px;\n}\n\n.send-button[_ngcontent-%COMP%] {\n  --background: var(--ion-color-primary);\n  --color: var(--ion-color-primary-contrast);\n  --border-radius: 12px;\n  height: 48px;\n  font-weight: 600;\n  font-size: 0.9rem;\n}\n.send-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n}\n.send-button[_ngcontent-%COMP%]:disabled {\n  --background: var(--ion-color-medium);\n  --color: var(--ion-color-medium-contrast);\n  opacity: 0.6;\n}\n\n\n\n.footer-info[_ngcontent-%COMP%] {\n  margin: 24px 16px 32px 16px;\n}\n\n.info-card[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-success-rgb), 0.1);\n  border: 1px solid rgba(var(--ion-color-success-rgb), 0.2);\n  border-radius: 12px;\n  padding: 16px;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n}\n\n.info-icon[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  color: var(--ion-color-success);\n  flex-shrink: 0;\n}\n\n.info-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.info-text[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: var(--ion-color-primary-contrast);\n  margin: 0 0 4px 0;\n}\n.info-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--ion-color-medium);\n  margin: 0;\n  line-height: 1.4;\n}\n\n\n\n\n\n@media (max-width: 768px) {\n  .header-content[_ngcontent-%COMP%] {\n    gap: 0.75rem;\n  }\n  .page-title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .header-icon[_ngcontent-%COMP%] {\n    width: 3rem;\n    height: 3rem;\n  }\n  .main-icon[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .feedback-textarea[_ngcontent-%COMP%] {\n    min-height: 100px;\n    background: var(--ion-item-background);\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL3Byb2ZpbGUvY29tcG9uZW50cy9jb25maWd1cmF0aW9uL2NvbXBvbmVudHMvc3VnZ2VzdGlvbnMvc3VnZ2VzdGlvbnMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1FO0VBREY7SUFFSSxnQkFBQTtJQUNBLGNBQUE7RUFKRjtBQUNGOztBQU9BLG1CQUFBO0FBQ0E7RUFDRSw4QkFBQTtFQUNBLHVDQUFBO0FBSkY7O0FBT0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLFNBQUE7QUFKRjs7QUFPQTtFQUNFLE9BQUE7QUFKRjs7QUFPQTtFQUNFLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx3Q0FBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtBQUpGOztBQU9BO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0VBQ0EsY0FBQTtFQUNBLG9EQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBSkY7O0FBT0E7RUFDRSxrQkFBQTtFQUNBLGdDQUFBO0FBSkY7O0FBT0Esb0JBQUE7QUFDQTtFQUNFLFdBQUE7RUFDQSx3Q0FBQTtFQUNBLHdCQUFBO0VBQ0EsWUFBQTtBQUpGOztBQU9BLHFCQUFBO0FBQ0E7RUFDRSxZQUFBO0FBSkY7O0FBT0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0FBSkY7O0FBT0E7RUFDRSx3Q0FBQTtFQUNBLDBDQUFBO0VBQ0EsNENBQUE7RUFDQSx5Q0FBQTtFQUNBLDJDQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtBQUpGO0FBTUU7RUFDRSx3Q0FBQTtFQUNBLG1EQUFBO0VBQ0Esc0NBQUE7RUFDQSw4REFBQTtBQUpKOztBQVFBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLDhCQUFBO0FBTEY7O0FBT0E7RUFDRSwyQkFBQTtBQUpGOztBQU9BO0VBQ0Usc0NBQUE7RUFDQSwwQ0FBQTtFQUNBLHFCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QUFKRjtBQU1FO0VBQ0UsbUJBQUE7QUFKSjtBQU9FO0VBQ0UscUNBQUE7RUFDQSx5Q0FBQTtFQUNBLFlBQUE7QUFMSjs7QUFTQSxnQkFBQTtBQUNBO0VBQ0UsMkJBQUE7QUFORjs7QUFTQTtFQUNFLG1EQUFBO0VBQ0EseURBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0FBTkY7O0FBU0E7RUFDRSxpQkFBQTtFQUNBLCtCQUFBO0VBQ0EsY0FBQTtBQU5GOztBQVNBO0VBQ0UsT0FBQTtBQU5GO0FBUUU7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0Esd0NBQUE7RUFDQSxpQkFBQTtBQU5KO0FBU0U7RUFDRSxpQkFBQTtFQUNBLDhCQUFBO0VBQ0EsU0FBQTtFQUNBLGdCQUFBO0FBUEo7O0FBV0EsMkJBQUE7QUFJQSxzQkFBQTtBQUNBO0VBQ0U7SUFDRSxZQUFBO0VBWEY7RUFjQTtJQUNFLGlCQUFBO0VBWkY7RUFlQTtJQUNFLFdBQUE7SUFDQSxZQUFBO0VBYkY7RUFnQkE7SUFDRSxpQkFBQTtFQWRGO0VBaUJBO0lBQ0UsaUJBQUE7SUFDQSxzQ0FBQTtFQWZGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXNrdG9wL3dlYiDDosKAwpQgYW50ZXMgY2FkYSBzZWNjacODwrNuIChoZWFkZXIsIHRleHRhcmVhLCBib3TDg8KzbiwgZm9vdGVyKSBzZVxuLy8gZXN0aXJhYmEgYSB0b2RvIGVsIGFuY2hvIGRlIGxhIHZlbnRhbmEsIHNpbiB0b3BlOiB1biB0ZXh0YXJlYSBvIHVuIGJvdMODwrNuXG4vLyBkZSAxODAwcHggc2UgbGVlbiBjb21vIHVuYSB0aXJhIGZpbmEsIG5vIGNvbW8gdW4gZm9ybXVsYXJpby4gU2UgbGltaXRhIGVsXG4vLyBhbmNobyBkZSBsZWN0dXJhIHkgc2UgY2VudHJhLCBpZ3VhbCBxdWUgZWwgcmVzdG8gZGUgcGFudGFsbGFzIGRlXG4vLyBjb250ZW5pZG8gc2ltcGxlIHlhIGFkYXB0YWRhcyAodmVyIGNvbmNlcHRzLnBhZ2Uuc2NzcykuXG4ucGFnZS1jb250YWluZXIge1xuICBAbWVkaWEgKG1pbi13aWR0aDogNjQwcHgpIHtcbiAgICBtYXgtd2lkdGg6IDY0MHB4O1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICB9XG59XG5cbi8qIEhlYWRlciBTZWN0aW9uICovXG4uaGVhZGVyLXNlY3Rpb24ge1xuICBwYWRkaW5nOiAxLjVyZW0gMXJlbSAxcmVtIDFyZW07XG4gIGJhY2tncm91bmQ6IHZhcigtLWlvbi1iYWNrZ3JvdW5kLWNvbG9yKTtcbn1cblxuLmhlYWRlci1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDFyZW07XG59XG5cbi5oZWFkZXItaW5mbyB7XG4gIGZsZXg6IDE7XG59XG5cbi5wYWdlLXN1YnRpdGxlIHtcbiAgZm9udC1zaXplOiAxIHJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcbiAgbWFyZ2luOiAwO1xuICBsaW5lLWhlaWdodDogMS4zO1xufVxuXG4uaGVhZGVyLWljb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDMuNXJlbTtcbiAgaGVpZ2h0OiAzLjVyZW07XG4gIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYiksIDAuMSk7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbi5tYWluLWljb24ge1xuICBmb250LXNpemU6IDEuNzVyZW07XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItdGVydGlhcnkpO1xufVxuXG4vKiBTZWN0aW9uIERpdmlkZXIgKi9cbi5zZWN0aW9uLWRpdmlkZXIge1xuICBoZWlnaHQ6IDFweDtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS10aW50KTtcbiAgbWFyZ2luOiAwIDE2cHggMTJweCAxNnB4O1xuICBvcGFjaXR5OiAwLjQ7XG59XG5cbi8qIEZlZWRiYWNrIFNlY3Rpb24gKi9cbi5mZWVkYmFjay1zZWN0aW9uIHtcbiAgbWFyZ2luOiAxNnB4O1xufVxuXG4uZmVlZGJhY2stY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMTZweDtcbn1cblxuLmZlZWRiYWNrLXRleHRhcmVhIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24taXRlbS1iYWNrZ3JvdW5kKTtcbiAgLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xuICAtLXBsYWNlaG9sZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgLS1ib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdGVwLTE1MCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1zdGVwLTE1MCk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBhZGRpbmc6IDEycHg7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xuICBtaW4taGVpZ2h0OiAxMjBweDtcblxuICAmOmZvY3VzLXdpdGhpbiB7XG4gICAgLS1ib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAtLWhpZ2hsaWdodC1jb2xvci1mb2N1c2VkOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgYm94LXNoYWRvdzogMCAwIDAgMnB4IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4xNSk7XG4gIH1cbn1cblxuLnRleHRhcmVhLWhlbHBlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNnB4O1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIGZvbnQtc2l6ZTogMC44cmVtO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG59XG4uYWN0aW9uLXNlY3Rpb24ge1xuICBtYXJnaW46IDI0cHggMTZweCAxNnB4IDE2cHg7XG59XG5cbi5zZW5kLWJ1dHRvbiB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XG4gIC0tYm9yZGVyLXJhZGl1czogMTJweDtcbiAgaGVpZ2h0OiA0OHB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBmb250LXNpemU6IDAuOXJlbTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxLjEyNXJlbTtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdCk7XG4gICAgb3BhY2l0eTogMC42O1xuICB9XG59XG5cbi8qIEZvb3RlciBJbmZvICovXG4uZm9vdGVyLWluZm8ge1xuICBtYXJnaW46IDI0cHggMTZweCAzMnB4IDE2cHg7XG59XG5cbi5pbmZvLWNhcmQge1xuICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1zdWNjZXNzLXJnYiksIDAuMSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEodmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiKSwgMC4yKTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMTZweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xufVxuXG4uaW5mby1pY29uIHtcbiAgZm9udC1zaXplOiAxLjVyZW07XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4uaW5mby10ZXh0IHtcbiAgZmxleDogMTtcblxuICBoMyB7XG4gICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xuICAgIG1hcmdpbjogMCAwIDRweCAwO1xuICB9XG5cbiAgcCB7XG4gICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIG1hcmdpbjogMDtcbiAgICBsaW5lLWhlaWdodDogMS40O1xuICB9XG59XG5cbi8qIERhcmsgVGhlbWUgQWRqdXN0bWVudHMgKi9cbkBtZWRpYSAocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspIHtcbn1cblxuLyogUmVzcG9uc2l2ZSBEZXNpZ24gKi9cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAuaGVhZGVyLWNvbnRlbnQge1xuICAgIGdhcDogMC43NXJlbTtcbiAgfVxuXG4gIC5wYWdlLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgfVxuXG4gIC5oZWFkZXItaWNvbiB7XG4gICAgd2lkdGg6IDNyZW07XG4gICAgaGVpZ2h0OiAzcmVtO1xuICB9XG5cbiAgLm1haW4taWNvbiB7XG4gICAgZm9udC1zaXplOiAxLjVyZW07XG4gIH1cblxuICAuZmVlZGJhY2stdGV4dGFyZWEge1xuICAgIG1pbi1oZWlnaHQ6IDEwMHB4O1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1pdGVtLWJhY2tncm91bmQpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ })

}]);
//# sourceMappingURL=packages_shared-features_src_app_features_profile_components_configuration_components_suggest-381941.js.map