"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["packages_shared-features_src_app_features_profile_components_configuration_configuration_module_ts"],{

/***/ 54456:
/*!*****************************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/profile/components/configuration/components/ad-preferences/ad-preferences.page.ts ***!
  \*****************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdPreferencesPage: () => (/* binding */ AdPreferencesPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 647);

var _AdPreferencesPage;




class AdPreferencesPage {
  constructor(userService, modalController) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "userService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "modalController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selectedOption", void 0);
    this.userService = userService;
    this.modalController = modalController;
    const user = this.userService.getLocalUser;
    this.selectedOption = user.personalAds === undefined ? true : !!user.personalAds;
  }
  dismiss() {
    this.modalController.dismiss(this.selectedOption);
  }
}
_AdPreferencesPage = AdPreferencesPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AdPreferencesPage, "\u0275fac", function AdPreferencesPage_Factory(t) {
  return new (t || _AdPreferencesPage)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_1__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.ModalController));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AdPreferencesPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _AdPreferencesPage,
  selectors: [["app-ad-preferences"]],
  decls: 67,
  vars: 43,
  consts: [[1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], [1, "tf-page-header__back-button", 3, "click"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "content-wrapper"], [1, "consent-card"], [1, "intro-block"], [1, "intro-icon"], ["name", "sparkles-outline"], [1, "info-block"], [1, "info-item"], ["name", "person-circle-outline"], ["name", "shield-checkmark-outline"], [1, "options-group", 3, "value", "ionChange"], ["lines", "none", "button", "", 1, "option-card", 3, "click"], ["slot", "start", 3, "value"], [1, "ad-footer"], ["expand", "block", 3, "click"]],
  template: function AdPreferencesPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-header")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AdPreferencesPage_Template_button_click_4_listener() {
        return ctx.modalController.dismiss();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "ion-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 5)(7, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](9, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "ion-content")(12, "div", 8)(13, "ion-card", 9)(14, "ion-card-content")(15, "div", 10)(16, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "ion-icon", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "h2");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](20, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](23, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "div", 13)(25, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](26, "ion-icon", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "div")(28, "strong");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](29);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](30, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](32);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](33, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](35, "ion-icon", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "div")(37, "strong");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](39, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](41);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](42, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "ion-radio-group", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ionChange", function AdPreferencesPage_Template_ion_radio_group_ionChange_43_listener($event) {
        return ctx.selectedOption = $event.detail.value;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](44, "ion-item", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AdPreferencesPage_Template_ion_item_click_44_listener() {
        return ctx.selectedOption = true;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](45, "ion-radio", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "ion-label")(47, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](48);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](49, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](50, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](51);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](52, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](53, "ion-item", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AdPreferencesPage_Template_ion_item_click_53_listener() {
        return ctx.selectedOption = false;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](54, "ion-radio", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](55, "ion-label")(56, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](57);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](58, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](59, "p");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](60);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](61, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](62, "ion-footer", 20)(63, "ion-button", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AdPreferencesPage_Template_ion_button_click_63_listener() {
        return ctx.dismiss();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](64, "strong");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](65);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](66, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](9, 19, "AD_PREFERENCES.TITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](20, 21, "AD_PREFERENCES.HEADER"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](23, 23, "AD_PREFERENCES.DESCRIPTION"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](30, 25, "AD_PREFERENCES.PERSONALIZED"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](33, 27, "AD_PREFERENCES.PERSONALIZED_DESC"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](39, 29, "AD_PREFERENCES.NON_PERSONALIZED"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](42, 31, "AD_PREFERENCES.NON_PERSONALIZED_DESC"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", ctx.selectedOption);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("selected", ctx.selectedOption === true);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](49, 33, "AD_PREFERENCES.PERSONALIZED_OPTION"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](52, 35, "AD_PREFERENCES.PERSONALIZED_OPTION_DESC"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("selected", ctx.selectedOption === false);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("value", false);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](58, 37, "AD_PREFERENCES.NON_PERSONALIZED_OPTION"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](61, 39, "AD_PREFERENCES.NON_PERSONALIZED_OPTION_DESC"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](66, 41, "AD_PREFERENCES.SAVE"));
    }
  },
  dependencies: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonCard, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonCardContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonRadio, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonRadioGroup, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.RadioValueAccessor, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.SelectValueAccessor, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe],
  styles: [".content-wrapper[_ngcontent-%COMP%] {\n  padding: 16px;\n  min-height: 100%;\n}\n\n.consent-card[_ngcontent-%COMP%] {\n  background: linear-gradient(160deg, #171717 0%, #111111 100%);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 18px;\n  width: 100%;\n  max-width: 560px;\n  margin: 0 auto;\n  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);\n}\n.consent-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  padding: 22px;\n}\n\n.intro-block[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 18px;\n}\n.intro-block[_ngcontent-%COMP%]   .intro-icon[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 52px;\n  margin: 0 auto 10px;\n  border-radius: 14px;\n  background: rgba(254, 144, 0, 0.16);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.intro-block[_ngcontent-%COMP%]   .intro-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: var(--ion-color-primary);\n}\n.intro-block[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  font-size: 1.2rem;\n  font-weight: 700;\n  color: #fff;\n}\n.intro-block[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: rgba(255, 255, 255, 0.72);\n  line-height: 1.45;\n  font-size: 0.95rem;\n}\n\n.info-block[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 12px;\n  padding: 10px;\n  margin-bottom: 16px;\n}\n.info-block[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n  align-items: flex-start;\n  padding: 8px;\n}\n.info-block[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  margin-top: 2px;\n  font-size: 18px;\n  color: var(--ion-color-primary);\n  flex-shrink: 0;\n}\n.info-block[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.info-block[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: #fff;\n}\n.info-block[_ngcontent-%COMP%]   .info-item[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: rgba(255, 255, 255, 0.65);\n  line-height: 1.35;\n}\n\n.options-group[_ngcontent-%COMP%]   .option-card[_ngcontent-%COMP%] {\n  --background: rgba(255, 255, 255, 0.03);\n  --color: #fff;\n  border: 1px solid rgba(255, 255, 255, 0.09);\n  border-radius: 12px;\n  margin: 10px 0;\n  transition: 0.2s ease;\n}\n.options-group[_ngcontent-%COMP%]   .option-card.selected[_ngcontent-%COMP%] {\n  --background: rgba(254, 144, 0, 0.12);\n  border-color: rgba(254, 144, 0, 0.45);\n  box-shadow: 0 0 0 1px rgba(254, 144, 0, 0.22) inset;\n}\n.options-group[_ngcontent-%COMP%]   .option-card[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  margin: 12px 0;\n}\n.options-group[_ngcontent-%COMP%]   .option-card[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: #fff;\n}\n.options-group[_ngcontent-%COMP%]   .option-card[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.82rem;\n  color: rgba(255, 255, 255, 0.65);\n}\n\n.ad-footer[_ngcontent-%COMP%] {\n  padding: 14px;\n  background: var(--ion-background-color);\n}\n.ad-footer[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --background: linear-gradient(135deg, #fe9000 0%, #ff6b35 100%);\n  --color: #fff;\n  --border-radius: 12px;\n  height: 48px;\n  font-weight: 700;\n  letter-spacing: 0.2px;\n  margin: 0;\n}\n.ad-footer[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  margin-left: 6px;\n  font-size: 1.1rem;\n}\n\nion-radio[_ngcontent-%COMP%]::part(container) {\n  width: 24px;\n  height: 24px;\n  border-radius: 7px;\n  border: 2px solid rgba(255, 255, 255, 0.35);\n}\n\nion-radio.radio-checked[_ngcontent-%COMP%]::part(container) {\n  background: var(--ion-color-primary);\n  border-color: transparent;\n}\n\nion-radio.radio-checked[_ngcontent-%COMP%]::part(mark) {\n  width: 6px;\n  height: 10px;\n  border-width: 0 2px 2px 0;\n  border-style: solid;\n  border-color: #fff;\n  transform: rotate(45deg);\n}\n\n@media (max-width: 768px) {\n  .content-wrapper[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .consent-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n    padding: 18px;\n  }\n}\n@media (max-width: 480px) {\n  .content-wrapper[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .intro-block[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 1.05rem;\n  }\n  .intro-block[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 0.88rem;\n  }\n  .ad-footer[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .ad-footer[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n    height: 44px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL3Byb2ZpbGUvY29tcG9uZW50cy9jb25maWd1cmF0aW9uL2NvbXBvbmVudHMvYWQtcHJlZmVyZW5jZXMvYWQtcHJlZmVyZW5jZXMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLGdCQUFBO0FBQ0Y7O0FBRUE7RUFDRSw2REFBQTtFQUNBLDJDQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsMkNBQUE7QUFDRjtBQUNFO0VBQ0UsYUFBQTtBQUNKOztBQUdBO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtBQUFGO0FBRUU7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQ0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBQUo7QUFFSTtFQUNFLGVBQUE7RUFDQSwrQkFBQTtBQUFOO0FBSUU7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUFGSjtBQUtFO0VBQ0UsU0FBQTtFQUNBLGdDQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtBQUhKOztBQU9BO0VBQ0UscUNBQUE7RUFDQSwyQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0FBSkY7QUFNRTtFQUNFLGFBQUE7RUFDQSxTQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0FBSko7QUFNSTtFQUNFLGVBQUE7RUFDQSxlQUFBO0VBQ0EsK0JBQUE7RUFDQSxjQUFBO0FBSk47QUFPSTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFFBQUE7QUFMTjtBQU9NO0VBQ0UsaUJBQUE7RUFDQSxXQUFBO0FBTFI7QUFRTTtFQUNFLGtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxpQkFBQTtBQU5SOztBQWFFO0VBQ0UsdUNBQUE7RUFDQSxhQUFBO0VBQ0EsMkNBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtBQVZKO0FBWUk7RUFDRSxxQ0FBQTtFQUNBLHFDQUFBO0VBQ0EsbURBQUE7QUFWTjtBQWFJO0VBQ0UsY0FBQTtBQVhOO0FBYU07RUFDRSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUFYUjtBQWNNO0VBQ0UsU0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0NBQUE7QUFaUjs7QUFrQkE7RUFDRSxhQUFBO0VBQ0EsdUNBQUE7QUFmRjtBQWlCRTtFQUNFLCtEQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxTQUFBO0FBZko7QUFpQkk7RUFDRSxnQkFBQTtFQUNBLGlCQUFBO0FBZk47O0FBb0JBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLDJDQUFBO0FBakJGOztBQW9CQTtFQUNFLG9DQUFBO0VBQ0EseUJBQUE7QUFqQkY7O0FBb0JBO0VBQ0UsVUFBQTtFQUNBLFlBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSx3QkFBQTtBQWpCRjs7QUFvQkE7RUFDRTtJQUNFLGFBQUE7RUFqQkY7RUFvQkE7SUFDRSxhQUFBO0VBbEJGO0FBQ0Y7QUFxQkE7RUFDRTtJQUNFLGFBQUE7RUFuQkY7RUFzQkE7SUFDRSxrQkFBQTtFQXBCRjtFQXVCQTtJQUNFLGtCQUFBO0VBckJGO0VBd0JBO0lBQ0UsYUFBQTtFQXRCRjtFQXdCRTtJQUNFLFlBQUE7RUF0Qko7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5jb250ZW50LXdyYXBwZXIge1xuICBwYWRkaW5nOiAxNnB4O1xuICBtaW4taGVpZ2h0OiAxMDAlO1xufVxuXG4uY29uc2VudC1jYXJkIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE2MGRlZywgIzE3MTcxNyAwJSwgIzExMTExMSAxMDAlKTtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4KTtcbiAgYm9yZGVyLXJhZGl1czogMThweDtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogNTYwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBib3gtc2hhZG93OiAwIDEwcHggMzBweCByZ2JhKDAsIDAsIDAsIDAuMzUpO1xuXG4gIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDIycHg7XG4gIH1cbn1cblxuLmludHJvLWJsb2NrIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAxOHB4O1xuXG4gIC5pbnRyby1pY29uIHtcbiAgICB3aWR0aDogNTJweDtcbiAgICBoZWlnaHQ6IDUycHg7XG4gICAgbWFyZ2luOiAwIGF1dG8gMTBweDtcbiAgICBib3JkZXItcmFkaXVzOiAxNHB4O1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU0LCAxNDQsIDAsIDAuMTYpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMjRweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgfVxuICB9XG5cbiAgaDIge1xuICAgIG1hcmdpbjogMCAwIDhweDtcbiAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGNvbG9yOiAjZmZmO1xuICB9XG5cbiAgcCB7XG4gICAgbWFyZ2luOiAwO1xuICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzIpO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjQ1O1xuICAgIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgfVxufVxuXG4uaW5mby1ibG9jayB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wOCk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG5cbiAgLmluZm8taXRlbSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBnYXA6IDEwcHg7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgcGFkZGluZzogOHB4O1xuXG4gICAgaW9uLWljb24ge1xuICAgICAgbWFyZ2luLXRvcDogMnB4O1xuICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIH1cblxuICAgIGRpdiB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGdhcDogMnB4O1xuXG4gICAgICBzdHJvbmcge1xuICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICB9XG5cbiAgICAgIHNwYW4ge1xuICAgICAgICBmb250LXNpemU6IDAuODJyZW07XG4gICAgICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNjUpO1xuICAgICAgICBsaW5lLWhlaWdodDogMS4zNTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLm9wdGlvbnMtZ3JvdXAge1xuICAub3B0aW9uLWNhcmQge1xuICAgIC0tYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAzKTtcbiAgICAtLWNvbG9yOiAjZmZmO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wOSk7XG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICBtYXJnaW46IDEwcHggMDtcbiAgICB0cmFuc2l0aW9uOiAwLjJzIGVhc2U7XG5cbiAgICAmLnNlbGVjdGVkIHtcbiAgICAgIC0tYmFja2dyb3VuZDogcmdiYSgyNTQsIDE0NCwgMCwgMC4xMik7XG4gICAgICBib3JkZXItY29sb3I6IHJnYmEoMjU0LCAxNDQsIDAsIDAuNDUpO1xuICAgICAgYm94LXNoYWRvdzogMCAwIDAgMXB4IHJnYmEoMjU0LCAxNDQsIDAsIDAuMjIpIGluc2V0O1xuICAgIH1cblxuICAgIGlvbi1sYWJlbCB7XG4gICAgICBtYXJnaW46IDEycHggMDtcblxuICAgICAgaDMge1xuICAgICAgICBtYXJnaW46IDAgMCA0cHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICB9XG5cbiAgICAgIHAge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMC44MnJlbTtcbiAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42NSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi5hZC1mb290ZXIge1xuICBwYWRkaW5nOiAxNHB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tYmFja2dyb3VuZC1jb2xvcik7XG5cbiAgaW9uLWJ1dHRvbiB7XG4gICAgLS1iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjZmU5MDAwIDAlLCAjZmY2YjM1IDEwMCUpO1xuICAgIC0tY29sb3I6ICNmZmY7XG4gICAgLS1ib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgIGhlaWdodDogNDhweDtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGxldHRlci1zcGFjaW5nOiAwLjJweDtcbiAgICBtYXJnaW46IDA7XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBtYXJnaW4tbGVmdDogNnB4O1xuICAgICAgZm9udC1zaXplOiAxLjFyZW07XG4gICAgfVxuICB9XG59XG5cbmlvbi1yYWRpbzo6cGFydChjb250YWluZXIpIHtcbiAgd2lkdGg6IDI0cHg7XG4gIGhlaWdodDogMjRweDtcbiAgYm9yZGVyLXJhZGl1czogN3B4O1xuICBib3JkZXI6IDJweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMzUpO1xufVxuXG5pb24tcmFkaW8ucmFkaW8tY2hlY2tlZDo6cGFydChjb250YWluZXIpIHtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xufVxuXG5pb24tcmFkaW8ucmFkaW8tY2hlY2tlZDo6cGFydChtYXJrKSB7XG4gIHdpZHRoOiA2cHg7XG4gIGhlaWdodDogMTBweDtcbiAgYm9yZGVyLXdpZHRoOiAwIDJweCAycHggMDtcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiAjZmZmO1xuICB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAuY29udGVudC13cmFwcGVyIHtcbiAgICBwYWRkaW5nOiAxMnB4O1xuICB9XG5cbiAgLmNvbnNlbnQtY2FyZCBpb24tY2FyZC1jb250ZW50IHtcbiAgICBwYWRkaW5nOiAxOHB4O1xuICB9XG59XG5cbkBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkge1xuICAuY29udGVudC13cmFwcGVyIHtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICB9XG5cbiAgLmludHJvLWJsb2NrIGgyIHtcbiAgICBmb250LXNpemU6IDEuMDVyZW07XG4gIH1cblxuICAuaW50cm8tYmxvY2sgcCB7XG4gICAgZm9udC1zaXplOiAwLjg4cmVtO1xuICB9XG5cbiAgLmFkLWZvb3RlciB7XG4gICAgcGFkZGluZzogMTBweDtcblxuICAgIGlvbi1idXR0b24ge1xuICAgICAgaGVpZ2h0OiA0NHB4O1xuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
}));


/***/ }),

/***/ 71035:
/*!***************************************************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/profile/components/configuration/components/editor/components/nutrition-editor/nutrition-editor.page.ts ***!
  \***************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NutritionEditorPage: () => (/* binding */ NutritionEditorPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/util/navigation.service */ 22938);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var src_app_core_services_nutritional_goal_nutritional_goal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/nutritional-goal/nutritional-goal.service */ 29586);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/angular */ 45398);
/* harmony import */ var src_app_core_services_util_ad_mob_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/util/ad-mob.service */ 36718);
/* harmony import */ var src_app_core_services_billing_billing_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/billing/billing.service */ 58854);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var src_app_core_directives_cursor_end_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/directives/cursor-end.directive */ 71445);
/* harmony import */ var src_app_core_directives_decimal_input_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/directives/decimal-input.directive */ 379);


var _NutritionEditorPage;













const _c0 = ["sliderContainer"];
function NutritionEditorPage_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "button", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NutritionEditorPage_button_11_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r5.deleteGoal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "ion-icon", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function NutritionEditorPage_button_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "button", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NutritionEditorPage_button_32_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r7.useGoal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "ion-icon", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](4, 1, "NUTRITION_EDITOR.USAR"));
  }
}
const _c1 = function (a0) {
  return {
    kcal: a0
  };
};
function NutritionEditorPage_div_123_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "i", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "div", 83)(3, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](5, 2, "NUTRITION_EDITOR.CALORIE_EXCESS_TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](8, 4, "NUTRITION_EDITOR.CALORIE_EXCESS_MSG", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](7, _c1, ctx_r9.round1(ctx_r9.Math.abs(ctx_r9.getKcalDifference())))), " ");
  }
}
const _c2 = function (a0) {
  return {
    percent: a0
  };
};
function NutritionEditorPage_div_123_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "i", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "div", 83)(3, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](5, 2, "NUTRITION_EDITOR.PERCENT_EXCESS_TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](8, 4, "NUTRITION_EDITOR.PERCENT_EXCESS_MSG", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](7, _c2, ctx_r10.getPercentageSum())), " ");
  }
}
function NutritionEditorPage_div_123_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](1, NutritionEditorPage_div_123_div_1_Template, 9, 9, "div", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](2, NutritionEditorPage_div_123_div_2_Template, 9, 9, "div", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r3.hasKcalExcess());
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx_r3.hasPercentageExcess());
  }
}
function NutritionEditorPage_div_151_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 85)(1, "div", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](2, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](3, "span", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "div", 89)(6, "span", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](8, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "span", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const macro_r11 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵstyleProp"]("background-color", ctx_r4.getMacroColor(macro_r11));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](ctx_r4.getMacroName(macro_r11));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("", ctx_r4.Math.round(ctx_r4.state.grams[macro_r11]), "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("(", ctx_r4.round1(ctx_r4.state.pct[macro_r11]), "%)");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate2"]("", ctx_r4.getKcalByMacro(macro_r11), " ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](12, 7, "NUTRITION_EDITOR.KCAL"), "");
  }
}
const _c3 = function () {
  return ["p", "c", "f"];
};
class NutritionEditorPage {
  constructor(navigationService, userService, nutritionalGoalService, ionicUtilService, platform, ngZone, cdr, adMobService, billingService, translate, modalController) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "navigationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "userService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "nutritionalGoalService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "platform", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ngZone", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "cdr", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "adMobService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "billingService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "translate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "content", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "goalId", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "goal", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "user", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "Math", Math);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isSaving", false);
    // Estado principal
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "state", {
      mode: "g",
      kcalPerG: {
        p: 4,
        c: 4,
        f: 9
      },
      lock: {
        p: false,
        c: false,
        f: false,
        calories: false
      },
      grams: {
        p: 0,
        c: 0,
        f: 0
      },
      pct: {
        p: 0,
        c: 0,
        f: 0
      },
      targetKcal: 2000,
      updating: false,
      syncKcal: false
    });
    // Estado original para detectar cambios
    // Estado original del usuario para restaurar en caso de cancelar
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "originalUser", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "originalState", {
      targetKcal: 2000,
      grams: {
        p: 0,
        c: 0,
        f: 0
      }
    });
    // ---------- Unified Slider Logic ----------
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "activeDragHandle", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "sliderContainer", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "animationFrameId", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "cachedElements", {});
    // Arrow function to preserve 'this' context in event listeners
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "onDragMove", event => {
      if (!this.activeDragHandle || !this.sliderContainer) return;
      if (event.cancelable) {
        event.preventDefault(); // Prevent scrolling
      }
      // Throttling with requestAnimationFrame for smooth 60fps performance
      if (this.animationFrameId) return;
      this.animationFrameId = requestAnimationFrame(() => {
        this.animationFrameId = null;
        if (!this.activeDragHandle) return;
        const container = this.sliderContainer.nativeElement;
        const rect = container.getBoundingClientRect();
        let clientX;
        if (event.touches && event.touches.length > 0) {
          clientX = event.touches[0].clientX;
        } else {
          clientX = event.clientX;
        }
        let percentage = (clientX - rect.left) / rect.width * 100;
        percentage = this.clamp(percentage, 0, 100);
        // Logic based on which handle is dragged
        if (this.activeDragHandle === "h1") {
          let newP = percentage;
          let newC = this.state.pct.c;
          let newF = this.state.pct.f;
          if (this.state.lock.c) {
            if (newP + this.state.pct.c > 100) newP = 100 - this.state.pct.c;
            newC = this.state.pct.c;
            newF = 100 - newP - newC;
          } else {
            const currentH2Pos = this.state.pct.p + this.state.pct.c;
            if (newP > currentH2Pos) {
              if (this.state.lock.f) {
                newP = currentH2Pos;
              } else {
                newP = percentage;
                newC = 0;
                newF = 100 - newP;
              }
            } else {
              newP = percentage;
              newC = currentH2Pos - newP;
              newF = 100 - newP - newC;
            }
          }
          this.updateMacrosFromSlider(newP, newC, newF);
        } else if (this.activeDragHandle === "h2") {
          let h2Pos = percentage;
          let newP = this.state.pct.p;
          let newC = this.state.pct.c;
          let newF = 100 - h2Pos;
          if (h2Pos < newP) {
            if (this.state.lock.p) {
              h2Pos = newP;
            } else {
              newP = h2Pos;
              newC = 0;
            }
          } else {
            if (this.state.lock.c) {
              newP = h2Pos - this.state.pct.c;
              newC = this.state.pct.c;
              if (newP < 0) {
                newP = 0;
                h2Pos = newP + newC;
              }
            } else {
              newC = h2Pos - newP;
            }
          }
          newF = 100 - newP - newC;
          this.updateMacrosFromSlider(newP, newC, newF);
        }
      });
    });
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "onDragEnd", event => {
      if (this.animationFrameId) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
      if (this.activeDragHandle) {
        // Return to Angular zone to sync state and trigger one final Change Detection
        this.ngZone.run(() => {
          this.activeDragHandle = null;
          this.state.updating = false;
          this.cdr.detectChanges();
        });
      }
      if (event && event.releasePointerCapture && event.pointerId !== undefined) {
        try {
          event.target.releasePointerCapture(event.pointerId);
        } catch (e) {}
      }
      document.removeEventListener("pointermove", this.onDragMove);
      document.removeEventListener("pointerup", this.onDragEnd);
      document.removeEventListener("pointercancel", this.onDragEnd);
      document.removeEventListener("touchmove", this.onDragMove);
      document.removeEventListener("touchend", this.onDragEnd);
    });
    // Propiedad para almacenar el objetivo final calculado
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "objetiveFinal", 0);
    this.navigationService = navigationService;
    this.userService = userService;
    this.nutritionalGoalService = nutritionalGoalService;
    this.ionicUtilService = ionicUtilService;
    this.platform = platform;
    this.ngZone = ngZone;
    this.cdr = cdr;
    this.adMobService = adMobService;
    this.billingService = billingService;
    this.translate = translate;
    this.modalController = modalController;
  }
  ngOnInit() {
    this.init();
  }
  // ---------- Utilidades ----------
  round1(x) {
    return Math.round((+x + Number.EPSILON) * 10) / 10;
  }
  clamp(x, a, b) {
    return Math.min(b, Math.max(a, +x || 0));
  }
  kcalFromGrams() {
    return Math.round(this.state.grams.p * this.state.kcalPerG.p + this.state.grams.c * this.state.kcalPerG.c + this.state.grams.f * this.state.kcalPerG.f);
  }
  gramsFromPct(pct, kcalPerG) {
    return this.state.targetKcal > 0 ? Math.round(pct / 100 * this.state.targetKcal / kcalPerG) : 0;
  }
  pctFromGrams(g, kcalPerG) {
    return this.state.targetKcal > 0 ? this.round1(g * kcalPerG / this.state.targetKcal * 100) : 0;
  }
  // ---------- Inicialización ----------
  init() {
    this.user = this.userService.getLocalUser;
    if (this.goalId) {
      const existingGoal = this.nutritionalGoalService.getGoalById(this.goalId);
      if (existingGoal) {
        this.goal = existingGoal;
      } else {
        this.nutritionalGoalService.refreshFromServer().subscribe(goals => {
          this.goal = goals.find(g => g._id === this.goalId);
          if (this.goal) this.applyGoalToState();
        });
        return;
      }
    }
    if (this.goal) {
      this.applyGoalToState();
    } else {
      this.saveOriginalState();
    }
  }
  applyGoalToState() {
    if (!this.goal) return;
    this.state.targetKcal = Math.round(this.goal.kcalTotal || 0);
    this.state.grams.p = Math.round(this.goal.proteinsGTotal || 0);
    this.state.grams.c = Math.round(this.goal.carbohydratesGTotal || 0);
    this.state.grams.f = Math.round(this.goal.fatGTotal || 0);
    if (this.state.targetKcal > 0) {
      this.state.pct.p = this.pctFromGrams(this.state.grams.p, this.state.kcalPerG.p);
      this.state.pct.c = this.pctFromGrams(this.state.grams.c, this.state.kcalPerG.c);
      this.state.pct.f = this.pctFromGrams(this.state.grams.f, this.state.kcalPerG.f);
    }
    const targetKcalInput = document.getElementById("targetKcal");
    const pInput = document.getElementById("pInput");
    const cInput = document.getElementById("cInput");
    const fInput = document.getElementById("fInput");
    if (targetKcalInput) targetKcalInput.value = this.state.targetKcal.toString();
    if (pInput) pInput.value = this.state.grams.p.toString();
    if (cInput) cInput.value = this.state.grams.c.toString();
    if (fInput) fInput.value = this.state.grams.f.toString();
    this.updateKcalConstants();
    this.render();
    this.saveOriginalState();
  }
  saveOriginalState() {
    // Guardar estado de la interfaz
    this.originalState = {
      targetKcal: this.state.targetKcal,
      grams: {
        p: this.state.grams.p,
        c: this.state.grams.c,
        f: this.state.grams.f
      }
    };
    // Guardar estado original del usuario (copia profunda)
    this.originalUser = JSON.parse(JSON.stringify(this.user));
  }
  hasUnsavedChanges() {
    const hasChanges = this.originalState.targetKcal !== this.state.targetKcal || this.originalState.grams.p !== this.state.grams.p || this.originalState.grams.c !== this.state.grams.c || this.originalState.grams.f !== this.state.grams.f;
    console.log("Checking for unsaved changes:", {
      hasChanges,
      original: this.originalState,
      current: {
        targetKcal: this.state.targetKcal,
        grams: this.state.grams
      }
    });
    return hasChanges;
  }
  restoreOriginalState() {
    console.log("Restoring original state:", this.originalState);
    // Restaurar valores del estado de la interfaz
    this.state.targetKcal = this.originalState.targetKcal;
    this.state.grams.p = this.originalState.grams.p;
    this.state.grams.c = this.originalState.grams.c;
    this.state.grams.f = this.originalState.grams.f;
    // Recalcular porcentajes basados en los valores restaurados
    if (this.state.targetKcal > 0) {
      this.state.pct.p = this.pctFromGrams(this.state.grams.p, this.state.kcalPerG.p);
      this.state.pct.c = this.pctFromGrams(this.state.grams.c, this.state.kcalPerG.c);
      this.state.pct.f = this.pctFromGrams(this.state.grams.f, this.state.kcalPerG.f);
    }
    // IMPORTANTE: Restaurar el usuario original completo en el servicio
    // Esto evita que los cambios se propaguen a otros componentes
    if (this.originalUser) {
      this.userService.setLocalUser = JSON.parse(JSON.stringify(this.originalUser));
      this.user = this.userService.getLocalUser;
    }
    // Actualizar los inputs del DOM con los valores restaurados
    const targetKcalInput = document.getElementById("targetKcal");
    const pInput = document.getElementById("pInput");
    const cInput = document.getElementById("cInput");
    const fInput = document.getElementById("fInput");
    if (targetKcalInput) targetKcalInput.value = this.state.targetKcal.toString();
    if (pInput) pInput.value = this.state.grams.p.toString();
    if (cInput) cInput.value = this.state.grams.c.toString();
    if (fInput) fInput.value = this.state.grams.f.toString();
    // Re-renderizar la interfaz
    this.updateKcalConstants();
    this.render();
    console.log("State and user restored successfully");
  }
  // ---------- Manejo de eventos ----------
  onTargetKcalChange(event) {
    if (this.state.updating) return; // Prevent loop
    this.state.targetKcal = this.clamp(event.target.value, 0, 100000);
    // Al cambiar calorías, siempre queremos escalar los gramos manteniendo la distribución (%)
    // Esto evita que la barra se "rompa" (supere 100%)
    // Recalcular gramos basados en los porcentajes actuales y las nuevas calorías
    this.state.grams.p = this.gramsFromPct(this.state.pct.p, this.state.kcalPerG.p);
    this.state.grams.c = this.gramsFromPct(this.state.pct.c, this.state.kcalPerG.c);
    this.state.grams.f = this.gramsFromPct(this.state.pct.f, this.state.kcalPerG.f);
    this.syncInputsFromState();
    this.render();
  }
  onSyncKcalChange(event) {
    this.state.syncKcal = event.target.checked;
    if (this.state.syncKcal) {
      this.state.targetKcal = this.kcalFromGrams();
      const targetKcalInput = document.getElementById("targetKcal");
      if (targetKcalInput) targetKcalInput.value = this.state.targetKcal.toString();
    }
    this.render();
  }
  onMacroInput(key, event) {
    if (this.state.updating) return;
    const val = this.clamp(event.target.value, 0, 10000);
    // Actualizar gramos
    this.state.grams[key] = val;
    this.state.pct[key] = this.pctFromGrams(val, this.state.kcalPerG[key]);
    // Si syncKcal está activado, actualizar calorías objetivo
    if (this.state.syncKcal) {
      this.state.targetKcal = this.kcalFromGrams();
    }
    // Redistribuir automáticamente si hay macros desbloqueados
    const sum = this.state.pct.p + this.state.pct.c + this.state.pct.f;
    if (sum > 100.0) {
      const others = ["p", "c", "f"].filter(k => k !== key && !this.state.lock[k]);
      if (others.length) {
        const excess = sum - 100.0;
        const share = excess / others.length;
        others.forEach(k => {
          this.state.pct[k] = this.clamp(this.state.pct[k] - share, 0, 100);
          this.state.grams[k] = this.gramsFromPct(this.state.pct[k], this.state.kcalPerG[k]);
        });
      }
    }
    this.syncInputsFromState();
    this.render();
  }
  // ---------- Modo ----------
  setMode(mode) {
    if (this.state.mode === mode) return;
    this.state.mode = mode;
    const modeGrams = document.getElementById("modeGrams");
    const modePercent = document.getElementById("modePercent");
    document.querySelectorAll(".segmented button").forEach(b => b.classList.remove("active"));
    if (mode === "g" && modeGrams) {
      modeGrams.classList.add("active");
    } else if (mode === "%" && modePercent) {
      modePercent.classList.add("active");
    }
    this.syncInputsFromState();
    this.render();
  }
  // ---------- Bloqueos ----------
  toggleLock(key) {
    this.state.lock[key] = !this.state.lock[key];
    const elementMap = {
      p: "lockP",
      c: "lockC",
      f: "lockF"
    };
    const el = document.getElementById(elementMap[key]);
    const icon = el?.querySelector("i");
    if (icon) {
      icon.className = this.state.lock[key] ? "fa fa-lock" : "fa fa-unlock";
    }
    if (el) {
      el.classList.toggle("active", this.state.lock[key]);
    }
    // Si se desbloquea un macro, redistribuir automáticamente
    if (!this.state.lock[key]) {
      this.redistributeMacros();
    }
    this.render();
  }
  toggleCaloriesLock() {
    this.state.lock.calories = !this.state.lock.calories;
  }
  onPercentInput(key, event) {
    if (this.state.updating) return;
    const val = this.clamp(event.target.value, 0, 100);
    this.state.pct[key] = val;
    this.state.grams[key] = this.gramsFromPct(this.state.pct[key], this.state.kcalPerG[key]);
    if (this.state.syncKcal) {
      this.state.targetKcal = this.kcalFromGrams();
    }
    // Redistribuir automáticamente si hay macros desbloqueados
    const sum = this.state.pct.p + this.state.pct.c + this.state.pct.f;
    if (sum > 100.0) {
      const others = ["p", "c", "f"].filter(k => k !== key && !this.state.lock[k]);
      if (others.length) {
        const excess = sum - 100.0;
        const share = excess / others.length;
        others.forEach(k => {
          this.state.pct[k] = this.clamp(this.state.pct[k] - share, 0, 100);
          this.state.grams[k] = this.gramsFromPct(this.state.pct[k], this.state.kcalPerG[k]);
        });
      }
    }
    this.syncInputsFromState();
    this.render();
  }
  startDrag(handle, event) {
    // If it's a PointerEvent, use pointer capture for better mobile reliability
    if (event.setPointerCapture && event.pointerId !== undefined) {
      event.target.setPointerCapture(event.pointerId);
    }
    // Check locks
    if (this.state.lock.p && handle === "h1") return;
    if (this.state.lock.f && handle === "h2") return;
    this.activeDragHandle = handle;
    this.state.updating = true;
    // Pre-cache elements to avoid repetitive DOM lookups during drag
    this.cachedElements = {
      pG: document.getElementById("proteinGramsInput"),
      pP: document.getElementById("proteinPercentInput"),
      cG: document.getElementById("carbsGramsInput"),
      cP: document.getElementById("carbsPercentInput"),
      fG: document.getElementById("fatGramsInput"),
      fP: document.getElementById("fatPercentInput"),
      kcal: document.getElementById("caloriesInput"),
      kcalTotal: document.getElementById("totalKcalFromMacros"),
      // Segmentos del slider para actualización manual
      segP: document.querySelector(".segment-p"),
      segC: document.querySelector(".segment-c"),
      segF: document.querySelector(".segment-f"),
      handle1: document.querySelector(".handle-1"),
      handle2: document.querySelector(".handle-2"),
      labelP: document.getElementById("labelP"),
      labelC: document.getElementById("labelC"),
      labelF: document.getElementById("labelF")
    };
    // Run outside Angular to avoid heavy Change Detection on every move
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener("pointermove", this.onDragMove);
      document.addEventListener("pointerup", this.onDragEnd);
      document.addEventListener("pointercancel", this.onDragEnd);
      document.addEventListener("touchmove", this.onDragMove, {
        passive: false
      });
      document.addEventListener("touchend", this.onDragEnd);
    });
  }
  onTrackPointerDown(event) {
    if (!this.sliderContainer) return;
    const container = this.sliderContainer.nativeElement;
    const rect = container.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width * 100;
    // Find nearest handle position
    const h1Pos = this.state.pct.p;
    const h2Pos = this.state.pct.p + this.state.pct.c;
    const d1 = Math.abs(x - h1Pos);
    const d2 = Math.abs(x - h2Pos);
    const handle = d1 < d2 ? "h1" : "h2";
    // Start drag
    this.startDrag(handle, event);
    // Force first update
    this.onDragMove(event);
  }
  updateMacrosFromSlider(p, c, f) {
    // Round to 1 decimal to avoid float jitter execution
    p = this.round1(p);
    c = this.round1(c);
    f = this.round1(100 - p - c);
    // Update state properties (outside Angular, so NO full Change Detection runs)
    this.state.pct.p = p;
    this.state.pct.c = c;
    this.state.pct.f = f;
    this.state.grams.p = this.gramsFromPct(p, this.state.kcalPerG.p);
    this.state.grams.c = this.gramsFromPct(c, this.state.kcalPerG.c);
    this.state.grams.f = this.gramsFromPct(f, this.state.kcalPerG.f);
    if (this.state.syncKcal) {
      this.state.targetKcal = this.kcalFromGrams();
    }
    // MANUAL UI UPDATE - Extremely fast, bypasses Angular
    this.manualUIUpdate();
  }
  manualUIUpdate() {
    const {
      pG,
      pP,
      cG,
      cP,
      fG,
      fP,
      kcal,
      kcalTotal,
      segP,
      segC,
      segF,
      handle1,
      handle2,
      labelP,
      labelC,
      labelF
    } = this.cachedElements;
    const p = this.state.pct.p;
    const c = this.state.pct.c;
    const f = this.state.pct.f;
    // Actualizar Inputs - Gramos ahora sin decimales (Enteros puros)
    if (pG) pG.value = Math.round(this.state.grams.p).toString();
    if (pP) pP.value = p.toFixed(1);
    if (cG) cG.value = Math.round(this.state.grams.c).toString();
    if (cP) cP.value = c.toFixed(1);
    if (fG) fG.value = Math.round(this.state.grams.f).toString();
    if (fP) fP.value = f.toFixed(1);
    if (kcal) kcal.value = this.state.targetKcal.toString();
    if (kcalTotal) kcalTotal.textContent = this.getTotalKcalFromMacros().toString();
    // Actualizar Slider Bar (Segments)
    if (segP) segP.style.width = p + "%";
    if (segC) {
      segC.style.left = p + "%";
      segC.style.width = c + "%";
    }
    if (segF) {
      segF.style.left = p + c + "%";
      segF.style.width = f + "%";
    }
    // Actualizar Labels dentro de la barra
    if (labelP) {
      labelP.textContent = p.toFixed(1) + "%";
      labelP.style.display = p > 8 ? "block" : "none";
    }
    if (labelC) {
      labelC.textContent = c.toFixed(1) + "%";
      labelC.style.display = c > 8 ? "block" : "none";
    }
    if (labelF) {
      labelF.textContent = f.toFixed(1) + "%";
      labelF.style.display = f > 8 ? "block" : "none";
    }
    // Actualizar Handles
    if (handle1) handle1.style.left = p + "%";
    if (handle2) handle2.style.left = p + c + "%";
  }
  // ---------- Presets ----------
  applyPreset(p, c, f) {
    this.setMode("%");
    this.state.pct = {
      p,
      c,
      f
    };
    this.state.grams.p = this.gramsFromPct(p, this.state.kcalPerG.p);
    this.state.grams.c = this.gramsFromPct(c, this.state.kcalPerG.c);
    this.state.grams.f = this.gramsFromPct(f, this.state.kcalPerG.f);
    const syncKcal = document.getElementById("syncKcal");
    if (syncKcal?.checked) {
      this.state.targetKcal = this.kcalFromGrams();
    }
    this.syncInputsFromState();
    this.render();
  }
  applyKgPreset(p, c, f) {
    const pPerKg = document.getElementById("pPerKg");
    const cPerKg = document.getElementById("cPerKg");
    const fPerKg = document.getElementById("fPerKg");
    if (pPerKg) pPerKg.value = p.toString();
    if (cPerKg) cPerKg.value = c.toString();
    if (fPerKg) fPerKg.value = f.toString();
    this.applyKg();
  }
  applyKg() {
    const weightKg = document.getElementById("weightKg");
    const pPerKg = document.getElementById("pPerKg");
    const cPerKg = document.getElementById("cPerKg");
    const fPerKg = document.getElementById("fPerKg");
    const w = +(weightKg?.value || 0);
    if (w <= 0) return;
    const p = +(pPerKg?.value || 0);
    const c = +(cPerKg?.value || 0);
    const f = +(fPerKg?.value || 0);
    this.setMode("g");
    this.state.grams.p = this.round1(p * w);
    this.state.grams.c = this.round1(c * w);
    this.state.grams.f = this.round1(f * w);
    this.state.pct.p = this.pctFromGrams(this.state.grams.p, this.state.kcalPerG.p);
    this.state.pct.c = this.pctFromGrams(this.state.grams.c, this.state.kcalPerG.c);
    this.state.pct.f = this.pctFromGrams(this.state.grams.f, this.state.kcalPerG.f);
    const syncKcal = document.getElementById("syncKcal");
    if (syncKcal?.checked) {
      this.state.targetKcal = this.kcalFromGrams();
    }
    this.syncInputsFromState();
    this.render();
  }
  // ---------- Actualización de UI ----------
  updateKcalConstants() {
    const pKcalPerG = document.getElementById("pKcalPerG");
    const cKcalPerG = document.getElementById("cKcalPerG");
    const fKcalPerG = document.getElementById("fKcalPerG");
    if (pKcalPerG) pKcalPerG.textContent = this.state.kcalPerG.p.toString();
    if (cKcalPerG) cKcalPerG.textContent = this.state.kcalPerG.c.toString();
    if (fKcalPerG) fKcalPerG.textContent = this.state.kcalPerG.f.toString();
    // Recalcular con nuevas constantes
    if (this.state.mode === "g") {
      this.state.pct.p = this.pctFromGrams(this.state.grams.p, this.state.kcalPerG.p);
      this.state.pct.c = this.pctFromGrams(this.state.grams.c, this.state.kcalPerG.c);
      this.state.pct.f = this.pctFromGrams(this.state.grams.f, this.state.kcalPerG.f);
    } else {
      this.state.grams.p = this.gramsFromPct(this.state.pct.p, this.state.kcalPerG.p);
      this.state.grams.c = this.gramsFromPct(this.state.pct.c, this.state.kcalPerG.c);
      this.state.grams.f = this.gramsFromPct(this.state.pct.f, this.state.kcalPerG.f);
    }
    this.syncInputsFromState();
    this.render();
  }
  syncInputsFromState() {
    // Only used for initialization or major state changes, not during drag
    const pG = document.getElementById("proteinGramsInput");
    const pP = document.getElementById("proteinPercentInput");
    const cG = document.getElementById("carbsGramsInput");
    const cP = document.getElementById("carbsPercentInput");
    const fG = document.getElementById("fatGramsInput");
    const fP = document.getElementById("fatPercentInput");
    const kcal = document.getElementById("caloriesInput");
    if (pG) pG.value = this.state.grams.p.toFixed(0);
    if (pP) pP.value = this.state.pct.p.toFixed(1);
    if (cG) cG.value = this.state.grams.c.toFixed(0);
    if (cP) cP.value = this.state.pct.c.toFixed(1);
    if (fG) fG.value = this.state.grams.f.toFixed(0);
    if (fP) fP.value = this.state.pct.f.toFixed(1);
    if (kcal) kcal.value = this.state.targetKcal.toString();
  }
  infoLine(k) {
    const g = this.state.grams[k] || 0;
    const pct = this.state.pct[k] || 0;
    const kcal = this.round1(g * this.state.kcalPerG[k]);
    return `<b>${g || 0} g</b> • <b>${kcal} kcal</b> • <b>${pct || 0}%</b>`;
  }
  render() {
    // Round factors for display
    const totalKcal = this.kcalFromGrams();
    const totalKcalElement = document.getElementById("totalKcalFromMacros");
    if (totalKcalElement) {
      totalKcalElement.textContent = totalKcal.toString();
    }
  }
  // ---------- Guardar ----------
  save() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.state.grams.p === 0 || _this.state.grams.c === 0 || _this.state.grams.f === 0) {
        const toast = {
          message: _this.translate.instant('NUTRITION_EDITOR.MISSING_VALUES'),
          duration: 3000,
          color: "warning"
        };
        yield _this.ionicUtilService.showToast(toast);
        return;
      }
      if (!_this.isValidConfiguration()) {
        console.warn("Configuración inválida, no se puede guardar");
        // Mostrar toast informativo
        const toast = {
          message: _this.translate.instant('NUTRITION_EDITOR.INVALID_CONFIG_MSG'),
          duration: 3000,
          color: "warning"
        };
        yield _this.ionicUtilService.showToast(toast);
        // Hacer scroll a la sección de resumen
        const summarySection = document.querySelector(".summary-section");
        if (summarySection && _this.content) {
          // Obtener la posición del elemento
          const yOffset = summarySection.getBoundingClientRect().top + window.pageYOffset - 100;
          _this.content.scrollToPoint(0, yOffset, 500);
        }
        return;
      }
      if (!_this.shouldRequireAdPrompt()) {
        _this.executeSave();
        return;
      }
      // Estrategia de Monetización: Rewarded Ad para guardar cambios maestros
      const alertOptions = {
        header: _this.translate.instant('NUTRITION_EDITOR.SAVE_HEADER'),
        message: _this.translate.instant('NUTRITION_EDITOR.SAVE_MSG'),
        buttons: [{
          text: _this.translate.instant('COMMON.CANCEL'),
          role: "cancel"
        }, {
          text: _this.translate.instant('PROFILE.WATCH_AD'),
          cssClass: "alert-button-success",
          handler: () => {
            _this.adMobService.interstitial("save_nutrition").then(() => {
              _this.executeSave();
            }).catch(err => {
              console.error("Error AdMob Interstitial:", err);
              _this.executeSave();
            });
          }
        }]
      };
      yield _this.ionicUtilService.showAlert(alertOptions);
    })();
  }
  shouldRequireAdPrompt() {
    const entitlements = this.billingService.getCachedEntitlements();
    if (typeof entitlements?.adsEnabled === "boolean") {
      return entitlements.adsEnabled;
    }
    return !Boolean(this.user?.premium?.entitled);
  }
  executeSave() {
    if (this.isSaving || !this.goal) {
      return;
    }
    this.isSaving = true;
    const goalData = {
      kcalTotal: Math.round(this.state.targetKcal),
      proteinsGTotal: Math.round(this.state.grams.p),
      carbohydratesGTotal: Math.round(this.state.grams.c),
      fatGTotal: Math.round(this.state.grams.f)
    };
    this.nutritionalGoalService.update(this.goal._id, goalData).subscribe({
      next: updatedGoal => {
        this.goal = updatedGoal;
        if (this.user?.goalInUse === this.goal._id || !this.user?.goalInUse) {
          this.nutritionalGoalService.setActive(this.goal._id).subscribe({
            next: () => {
              const toast = {
                message: this.translate.instant('NUTRITION_EDITOR.SAVE_SUCCESS'),
                duration: 2000
              };
              this.ionicUtilService.showToast(toast);
              this.saveOriginalState();
              setTimeout(() => {
                this.modalController.dismiss({
                  saved: true
                });
              }, 100);
            },
            error: error => {
              console.error("Error al activar objetivo nutricional:", error);
              const errorToast = {
                message: this.translate.instant('NUTRITION_EDITOR.SAVE_ERROR'),
                duration: 3000
              };
              this.ionicUtilService.showToast(errorToast);
              this.isSaving = false;
            }
          });
          return;
        }
        const toast = {
          message: this.translate.instant('NUTRITION_EDITOR.SAVE_SUCCESS'),
          duration: 2000
        };
        this.ionicUtilService.showToast(toast);
        this.saveOriginalState();
        setTimeout(() => {
          this.modalController.dismiss({
            saved: true
          });
        }, 100);
      },
      error: error => {
        console.error("Error al guardar configuración nutricional:", error);
        const errorToast = {
          message: this.translate.instant('NUTRITION_EDITOR.SAVE_ERROR'),
          duration: 3000
        };
        this.ionicUtilService.showToast(errorToast);
        this.isSaving = false;
        setTimeout(() => {
          this.modalController.dismiss({
            saved: false
          });
        }, 100);
      }
    });
  }
  isValidConfiguration() {
    const totalKcalFromMacros = this.kcalFromGrams();
    const delta = Math.abs(totalKcalFromMacros - this.state.targetKcal);
    return delta <= 25; // Margen de error de 25 kcal
  }
  // Métodos para el resumen detallado
  getTotalKcalFromMacros() {
    return Math.round(this.kcalFromGrams());
  }
  getKcalDifference() {
    return Math.round(this.getTotalKcalFromMacros() - this.state.targetKcal);
  }
  getKcalByMacro(key) {
    const macroKey = key;
    return Math.round(this.state.grams[macroKey] * this.state.kcalPerG[macroKey]);
  }
  hasKcalExcess() {
    return this.getKcalDifference() > 10; // Tolerancia de 10 kcal
  }

  getPercentageSum() {
    return this.round1(this.state.pct.p + this.state.pct.c + this.state.pct.f);
  }
  hasPercentageExcess() {
    return this.getPercentageSum() > 100.1; // Tolerancia de 0.1%
  }

  getMacroName(key) {
    const macroKey = key;
    const names = {
      p: this.translate.instant('NUTRITION_EDITOR.PROTEINS'),
      c: this.translate.instant('NUTRITION_EDITOR.CBH'),
      f: this.translate.instant('NUTRITION_EDITOR.FATS')
    };
    return names[macroKey];
  }
  getMacroColor(key) {
    const colors = {
      p: "var(--protein-color)",
      c: "var(--carbs-color)",
      f: "var(--fat-color)"
    };
    const macroKey = key;
    return colors[macroKey];
  }
  redistributeMacros() {
    // Redistribuir porcentajes para que sumen 100% entre macros no bloqueados
    const totalPct = this.state.pct.p + this.state.pct.c + this.state.pct.f;
    if (totalPct === 100) {
      // Ya suman 100%, no hay nada que redistribuir
      return;
    }
    // Obtener macros no bloqueados
    const unlocked = ["p", "c", "f"].filter(k => !this.state.lock[k]);
    if (unlocked.length === 0) {
      // Todos están bloqueados, no se puede redistribuir
      return;
    }
    if (unlocked.length === 1) {
      // Solo uno desbloqueado, ajustar para que la suma sea 100%
      const key = unlocked[0];
      const lockedSum = ["p", "c", "f"].filter(k => k !== key && this.state.lock[k]).reduce((sum, k) => sum + this.state.pct[k], 0);
      this.state.pct[key] = Math.max(0, Math.min(100, 100 - lockedSum));
      this.state.grams[key] = this.gramsFromPct(this.state.pct[key], this.state.kcalPerG[key]);
    } else {
      // Múltiples desbloqueados, redistribuir proporcionalmente
      const lockedSum = ["p", "c", "f"].filter(k => this.state.lock[k]).reduce((sum, k) => sum + this.state.pct[k], 0);
      const availableForUnlocked = Math.max(0, 100 - lockedSum);
      const currentUnlockedSum = unlocked.reduce((sum, k) => sum + this.state.pct[k], 0);
      if (currentUnlockedSum > 0) {
        // Redistribuir proporcionalmente
        unlocked.forEach(k => {
          const proportion = this.state.pct[k] / currentUnlockedSum;
          this.state.pct[k] = this.round1(availableForUnlocked * proportion);
          this.state.grams[k] = this.gramsFromPct(this.state.pct[k], this.state.kcalPerG[k]);
        });
      } else {
        // Distribuir equitativamente
        const equalShare = availableForUnlocked / unlocked.length;
        unlocked.forEach(k => {
          this.state.pct[k] = this.round1(equalShare);
          this.state.grams[k] = this.gramsFromPct(this.state.pct[k], this.state.kcalPerG[k]);
        });
      }
    }
    // Sincronizar inputs y actualizar vista
    this.syncInputsFromState();
  }
  recalculateMacros() {
    if (this.state.targetKcal <= 0) {
      console.warn("No se puede recalcular sin un objetivo de kcal válido");
      return;
    }
    // Obtener proporciones actuales
    const currentTotalKcal = this.kcalFromGrams();
    if (currentTotalKcal <= 0) {
      // Si no hay macros definidos, usar proporciones equilibradas por defecto
      this.applyPreset(30, 40, 30);
      return;
    }
    // Calcular proporciones actuales
    const pKcal = this.state.grams.p * this.state.kcalPerG.p;
    const cKcal = this.state.grams.c * this.state.kcalPerG.c;
    const fKcal = this.state.grams.f * this.state.kcalPerG.f;
    const pProportion = pKcal / currentTotalKcal;
    const cProportion = cKcal / currentTotalKcal;
    const fProportion = fKcal / currentTotalKcal;
    // Aplicar proporciones al nuevo objetivo
    const newPKcal = this.state.targetKcal * pProportion;
    const newCKcal = this.state.targetKcal * cProportion;
    const newFKcal = this.state.targetKcal * fProportion;
    // Convertir a gramos
    this.state.grams.p = this.round1(newPKcal / this.state.kcalPerG.p);
    this.state.grams.c = this.round1(newCKcal / this.state.kcalPerG.c);
    this.state.grams.f = this.round1(newFKcal / this.state.kcalPerG.f);
    // Actualizar porcentajes
    this.state.pct.p = this.round1(pProportion * 100);
    this.state.pct.c = this.round1(cProportion * 100);
    this.state.pct.f = this.round1(fProportion * 100);
    console.log("Macros recalculados manteniendo proporciones:", {
      proportions: {
        p: pProportion,
        c: cProportion,
        f: fProportion
      },
      newGrams: this.state.grams,
      newPercentages: this.state.pct
    });
    this.render();
  }
  // ---------- Métodos de cálculo automático ----------
  autoCalculate() {
    this.setFinalObjetive();
    setTimeout(() => {
      const userForm = {
        ...this.user,
        objetive: this.objetiveFinal,
        kcalTotal: this.state.targetKcal,
        proteinsGTotal: this.state.grams.p,
        carbohydratesGTotal: this.state.grams.c,
        fatGTotal: this.state.grams.f
      };
      const updatedUser = this.userService.setUserMacrosAndKcal(userForm);
      Object.assign(this.user, updatedUser);
      if (this.goal) {
        this.goal.kcalTotal = updatedUser.kcalTotal || 0;
        this.goal.proteinsGTotal = updatedUser.proteinsGTotal || 0;
        this.goal.carbohydratesGTotal = updatedUser.carbohydratesGTotal || 0;
        this.goal.fatGTotal = updatedUser.fatGTotal || 0;
      }
      this.calculate();
    });
  }
  setFinalObjetive() {
    // Determinar el tipo de objetivo basado en el valor actual del usuario
    let objetiveType;
    if (this.user.objetive > 0) {
      objetiveType = "gain";
    } else if (this.user.objetive < 0) {
      objetiveType = "loss";
    } else {
      objetiveType = "maintenance";
    }
    const objetiveValue = Math.abs(this.user.objetive);
    if (objetiveType === "loss") {
      this.objetiveFinal = -Math.abs(objetiveValue);
    } else if (objetiveType === "gain") {
      this.objetiveFinal = Math.abs(objetiveValue);
    } else {
      this.objetiveFinal = 0;
    }
  }
  calculate() {
    if (!this.goal) return;
    this.state.targetKcal = Math.round(this.goal.kcalTotal || 0);
    this.state.grams.p = Math.round(this.goal.proteinsGTotal || 0);
    this.state.grams.c = Math.round(this.goal.carbohydratesGTotal || 0);
    this.state.grams.f = Math.round(this.goal.fatGTotal || 0);
    // Recalcular porcentajes
    if (this.state.targetKcal > 0) {
      this.state.pct.p = this.pctFromGrams(this.state.grams.p, this.state.kcalPerG.p);
      this.state.pct.c = this.pctFromGrams(this.state.grams.c, this.state.kcalPerG.c);
      this.state.pct.f = this.pctFromGrams(this.state.grams.f, this.state.kcalPerG.f);
    }
    // Actualizar la interfaz
    this.syncInputsFromState();
    this.render();
  }
  closeModal() {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.hasUnsavedChanges()) {
        const alertOptions = {
          header: _this2.translate.instant('NUTRITION_EDITOR.UNSAVED_HEADER'),
          message: _this2.translate.instant('NUTRITION_EDITOR.UNSAVED_MSG'),
          cssClass: "alert-grid-buttons",
          buttons: [{
            text: _this2.translate.instant('COMMON.CANCEL'),
            role: "cancel",
            cssClass: "secondary"
          }, {
            text: _this2.translate.instant('COMMON.SAVE'),
            handler: function () {
              var _ref = (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
                yield _this2.save();
              });
              return function handler() {
                return _ref.apply(this, arguments);
              };
            }()
          }, {
            text: _this2.translate.instant('EDITOR.DISCARD_BTN'),
            role: "destructive",
            handler: () => {
              _this2.restoreOriginalState();
              _this2.modalController.dismiss();
            }
          }]
        };
        yield _this2.ionicUtilService.showAlert(alertOptions);
      } else {
        _this2.modalController.dismiss();
      }
    })();
  }
  renameGoal() {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this3.goal) return;
      const alertOptions = {
        header: _this3.translate.instant('NUTRITION_EDITOR.RENAME_HEADER'),
        inputs: [{
          name: 'name',
          type: 'text',
          value: _this3.goal.name,
          placeholder: _this3.translate.instant('NUTRITION_GOALS.NAME_PLACEHOLDER')
        }],
        buttons: [{
          text: _this3.translate.instant('COMMON.CANCEL'),
          role: 'cancel'
        }, {
          text: _this3.translate.instant('COMMON.SAVE'),
          handler: data => {
            const newName = data?.name?.trim();
            if (!newName) return false;
            _this3.nutritionalGoalService.update(_this3.goal._id, {
              name: newName
            }).subscribe({
              next: updated => {
                _this3.goal = updated;
              },
              error: () => {
                const toast = {
                  message: _this3.translate.instant('NUTRITION_EDITOR.SAVE_ERROR'),
                  duration: 3000
                };
                _this3.ionicUtilService.showToast(toast);
              }
            });
            return true;
          }
        }]
      };
      yield _this3.ionicUtilService.showAlert(alertOptions);
    })();
  }
  deleteGoal() {
    var _this4 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this4.goal) return;
      if (!_this4.nutritionalGoalService.canDelete(_this4.goal._id)) {
        const toast = {
          message: _this4.translate.instant('NUTRITION_GOALS.MINIMUM_ONE_MSG'),
          duration: 3000,
          color: "warning"
        };
        yield _this4.ionicUtilService.showToast(toast);
        return;
      }
      const alertOptions = {
        header: _this4.translate.instant('NUTRITION_EDITOR.DELETE_HEADER'),
        message: _this4.translate.instant('NUTRITION_EDITOR.DELETE_MSG', {
          name: _this4.goal.name
        }),
        cssClass: "custom-alert",
        buttons: [{
          text: _this4.translate.instant('COMMON.CANCEL'),
          role: 'cancel'
        }, {
          text: _this4.translate.instant('COMMON.DELETE'),
          role: 'destructive',
          handler: () => {
            _this4.nutritionalGoalService.delete(_this4.goal._id).subscribe({
              next: () => {
                _this4.modalController.dismiss({
                  deleted: true
                });
              },
              error: () => {
                const toast = {
                  message: _this4.translate.instant('NUTRITION_EDITOR.SAVE_ERROR'),
                  duration: 3000
                };
                _this4.ionicUtilService.showToast(toast);
              }
            });
          }
        }]
      };
      yield _this4.ionicUtilService.showAlert(alertOptions);
    })();
  }
  useGoal() {
    var _this5 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this5.goal) return;
      const alertOptions = {
        header: _this5.translate.instant('NUTRITION_EDITOR.USE_HEADER'),
        message: _this5.translate.instant('NUTRITION_EDITOR.USE_MSG'),
        buttons: [{
          text: _this5.translate.instant('COMMON.CANCEL'),
          role: 'cancel'
        }, {
          text: _this5.translate.instant('NUTRITION_EDITOR.USAR'),
          handler: () => {
            const goalData = {
              kcalTotal: Math.round(_this5.state.targetKcal),
              proteinsGTotal: Math.round(_this5.state.grams.p),
              carbohydratesGTotal: Math.round(_this5.state.grams.c),
              fatGTotal: Math.round(_this5.state.grams.f)
            };
            _this5.nutritionalGoalService.update(_this5.goal._id, goalData).subscribe({
              next: updatedGoal => {
                _this5.goal = updatedGoal;
                _this5.nutritionalGoalService.setActive(_this5.goal._id).subscribe({
                  next: () => {
                    _this5.modalController.dismiss({
                      saved: true
                    });
                  },
                  error: () => {
                    const toast = {
                      message: _this5.translate.instant('NUTRITION_EDITOR.SAVE_ERROR'),
                      duration: 3000
                    };
                    _this5.ionicUtilService.showToast(toast);
                  }
                });
              },
              error: () => {
                const toast = {
                  message: _this5.translate.instant('NUTRITION_EDITOR.SAVE_ERROR'),
                  duration: 3000
                };
                _this5.ionicUtilService.showToast(toast);
              }
            });
          }
        }]
      };
      yield _this5.ionicUtilService.showAlert(alertOptions);
    })();
  }
}
_NutritionEditorPage = NutritionEditorPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(NutritionEditorPage, "\u0275fac", function NutritionEditorPage_Factory(t) {
  return new (t || _NutritionEditorPage)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_2__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_3__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_core_services_nutritional_goal_nutritional_goal_service__WEBPACK_IMPORTED_MODULE_4__.NutritionalGoalService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_5__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_11__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_10__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_core_services_util_ad_mob_service__WEBPACK_IMPORTED_MODULE_6__.AdMobService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_core_services_billing_billing_service__WEBPACK_IMPORTED_MODULE_7__.BillingService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_13__.ModalController));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(NutritionEditorPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: _NutritionEditorPage,
  selectors: [["app-nutrition-editor"]],
  viewQuery: function NutritionEditorPage_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonContent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.content = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵloadQuery"]()) && (ctx.sliderContainer = _t.first);
    }
  },
  inputs: {
    goalId: "goalId"
  },
  decls: 165,
  vars: 166,
  consts: [[1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], [1, "tf-page-header__back-button", 3, "click"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section", 2, "cursor", "pointer", 3, "click"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], ["class", "tf-page-header__action-button", 3, "click", 4, "ngIf"], [1, "main-content"], [1, "card", "calories-card"], [1, "card-title"], [1, "fa", "fa-bullseye"], [1, "input-group"], ["type", "number", "id", "caloriesInput", "inputmode", "numeric", "pattern", "[0-9]*", "placeholder", "0", "appCursorEnd", "", 1, "calories-input", 3, "value", "readonly", "input"], [1, "calories-label"], ["id", "caloriesLock", 1, "lock-button", "calories-lock-button", 3, "click"], [1, "fa"], [1, "calories-actions"], [1, "auto-calc-btn", 3, "click"], ["name", "calculator-outline"], ["class", "auto-calc-btn auto-calc-btn--primary", 3, "click", 4, "ngIf"], [1, "card", "macros-card"], [1, "fa", "fa-pie-chart"], [1, "unified-slider-container", 3, "pointerdown"], ["sliderContainer", ""], [1, "unified-slider-track"], [1, "slider-segments-wrapper"], [1, "slider-segment", "segment-p"], ["id", "labelP"], [1, "slider-segment", "segment-c"], ["id", "labelC"], [1, "slider-segment", "segment-f"], ["id", "labelF"], [1, "slider-handle", "handle-1", 3, "pointerdown"], [1, "slider-handle", "handle-2", 3, "pointerdown"], [1, "macro-adjuster-card", "protein"], [1, "macro-info"], [1, "macro-dot"], [1, "macro-text"], [1, "macro-name"], [1, "macro-kcal-info"], [1, "macro-inputs"], [1, "input-field", "grams"], ["type", "number", "id", "proteinGramsInput", "inputmode", "numeric", "pattern", "[0-9]*", "placeholder", "0", "appCursorEnd", "", 3, "value", "readonly", "input"], [1, "unit"], [1, "input-field", "percentage"], ["type", "text", "id", "proteinPercentInput", "inputmode", "decimal", "pattern", "[0-9]*", "placeholder", "0", "appCursorEnd", "", "appDecimalInput", "", 3, "value", "readonly", "input"], [1, "lock-toggle", 3, "title", "click"], [1, "macro-adjuster-card", "carbs"], ["type", "number", "id", "carbsGramsInput", "inputmode", "numeric", "pattern", "[0-9]*", "placeholder", "0", "appCursorEnd", "", 3, "value", "readonly", "input"], ["type", "text", "id", "carbsPercentInput", "inputmode", "decimal", "pattern", "[0-9]*", "placeholder", "0", "appCursorEnd", "", "appDecimalInput", "", 3, "value", "readonly", "input"], [1, "macro-adjuster-card", "fat"], ["type", "number", "id", "fatGramsInput", "inputmode", "numeric", "pattern", "[0-9]*", "placeholder", "0", "appCursorEnd", "", 3, "value", "readonly", "input"], ["type", "text", "id", "fatPercentInput", "inputmode", "decimal", "pattern", "[0-9]*", "placeholder", "0", "appCursorEnd", "", "appDecimalInput", "", 3, "value", "readonly", "input"], [1, "card", "summary-card"], ["class", "warnings", 4, "ngIf"], [1, "summary-section", "calories-summary"], [1, "summary-subtitle"], [1, "fa", "fa-fire"], [1, "summary-row"], [1, "summary-label"], [1, "summary-value", "target-kcal"], [1, "summary-value", "total-kcal"], [1, "summary-value", "difference-kcal"], [1, "summary-section", "macros-breakdown"], ["class", "macro-summary-item", 4, "ngFor", "ngForOf"], [1, "summary-section", "visual-distribution"], [1, "distribution-chart"], [1, "chart-bar-segment", "chart-protein"], [1, "chart-bar-segment", "chart-carbs"], [1, "chart-bar-segment", "chart-fat"], [1, "percentage-total"], [1, "footer-action"], [1, "save-button", 3, "disabled", "click"], [1, "tf-page-header__action-button", 3, "click"], ["name", "trash-outline", "color", "danger"], [1, "auto-calc-btn", "auto-calc-btn--primary", 3, "click"], ["name", "checkmark-circle-outline"], [1, "warnings"], ["class", "info-card warning-card", 4, "ngIf"], [1, "info-card", "warning-card"], [1, "fa", "fa-exclamation-triangle", "info-icon"], [1, "info-text"], [1, "info-title"], [1, "macro-summary-item"], [1, "macro-summary-header"], [1, "macro-color-indicator"], [1, "macro-summary-name"], [1, "macro-summary-details"], [1, "macro-summary-grams"], [1, "macro-summary-percent"], [1, "macro-summary-kcal"]],
  template: function NutritionEditorPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "ion-header")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NutritionEditorPage_Template_button_click_4_listener() {
        return ctx.closeModal();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](5, "ion-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NutritionEditorPage_Template_div_click_6_listener() {
        return ctx.renameGoal();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](7, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](9, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](11, NutritionEditorPage_button_11_Template, 2, 0, "button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](12, "ion-content")(13, "div", 9)(14, "div", 10)(15, "h2", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](16, "i", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](17);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](18, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](19, "div", 13)(20, "input", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("input", function NutritionEditorPage_Template_input_input_20_listener($event) {
        return ctx.onTargetKcalChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](21, "span", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](22);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](23, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](24, "button", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NutritionEditorPage_Template_button_click_24_listener() {
        return ctx.toggleCaloriesLock();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](25, "i", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](26, "div", 18)(27, "button", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NutritionEditorPage_Template_button_click_27_listener() {
        return ctx.autoCalculate();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](28, "ion-icon", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](29, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](30);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](31, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](32, NutritionEditorPage_button_32_Template, 5, 3, "button", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](33, "div", 22)(34, "h2", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](35, "i", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](36);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](37, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](38, "div", 24, 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("pointerdown", function NutritionEditorPage_Template_div_pointerdown_38_listener($event) {
        return ctx.onTrackPointerDown($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](40, "div", 26)(41, "div", 27)(42, "div", 28)(43, "span", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](44);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](45, "div", 30)(46, "span", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](47);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](48, "div", 32)(49, "span", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](50);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](51, "div", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("pointerdown", function NutritionEditorPage_Template_div_pointerdown_51_listener($event) {
        return ctx.startDrag("h1", $event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](52, "div", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("pointerdown", function NutritionEditorPage_Template_div_pointerdown_52_listener($event) {
        return ctx.startDrag("h2", $event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](53, "div", 36)(54, "div", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](55, "span", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](56, "div", 39)(57, "span", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](58);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](59, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](60, "span", 41);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](61);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](62, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](63, "div", 42)(64, "div", 43)(65, "input", 44);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("input", function NutritionEditorPage_Template_input_input_65_listener($event) {
        return ctx.onMacroInput("p", $event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](66, "span", 45);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](67, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](68, "div", 46)(69, "input", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("input", function NutritionEditorPage_Template_input_input_69_listener($event) {
        return ctx.onPercentInput("p", $event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](70, "span", 45);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](71, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](72, "button", 48);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NutritionEditorPage_Template_button_click_72_listener() {
        return ctx.toggleLock("p");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](73, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](74, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](75, "i", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](76, "div", 49)(77, "div", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](78, "span", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](79, "div", 39)(80, "span", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](81);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](82, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](83, "span", 41);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](84);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](85, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](86, "div", 42)(87, "div", 43)(88, "input", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("input", function NutritionEditorPage_Template_input_input_88_listener($event) {
        return ctx.onMacroInput("c", $event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](89, "span", 45);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](90, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](91, "div", 46)(92, "input", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("input", function NutritionEditorPage_Template_input_input_92_listener($event) {
        return ctx.onPercentInput("c", $event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](93, "span", 45);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](94, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](95, "button", 48);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NutritionEditorPage_Template_button_click_95_listener() {
        return ctx.toggleLock("c");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](96, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](97, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](98, "i", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](99, "div", 52)(100, "div", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](101, "span", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](102, "div", 39)(103, "span", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](104);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](105, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](106, "span", 41);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](107);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](108, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](109, "div", 42)(110, "div", 43)(111, "input", 53);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("input", function NutritionEditorPage_Template_input_input_111_listener($event) {
        return ctx.onMacroInput("f", $event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](112, "span", 45);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](113, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](114, "div", 46)(115, "input", 54);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("input", function NutritionEditorPage_Template_input_input_115_listener($event) {
        return ctx.onPercentInput("f", $event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](116, "span", 45);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](117, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](118, "button", 48);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NutritionEditorPage_Template_button_click_118_listener() {
        return ctx.toggleLock("f");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](119, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](120, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](121, "i", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](122, "div", 55);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](123, NutritionEditorPage_div_123_Template, 3, 2, "div", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](124, "div", 57)(125, "h3", 58);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](126, "i", 59);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](127);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](128, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](129, "div", 60)(130, "span", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](131);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](132, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](133, "span", 62);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](134);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](135, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](136, "div", 60)(137, "span", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](138);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](139, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](140, "span", 63);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](141);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](142, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](143, "div", 60)(144, "span", 61);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](145);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](146, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](147, "span", 64);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](148);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](149, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](150, "div", 65);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](151, NutritionEditorPage_div_151_Template, 13, 9, "div", 66);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](152, "div", 67)(153, "div", 68);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](154, "div", 69)(155, "div", 70)(156, "div", 71);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](157, "div", 72);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](158);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](159, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](160, "div", 73)(161, "button", 74);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function NutritionEditorPage_Template_button_click_161_listener() {
        return ctx.save();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](162);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipe"](163, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](164, "ion-footer");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"]((ctx.goal == null ? null : ctx.goal.name) || _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](9, 110, "NUTRITION_EDITOR.TITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.goal);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](18, 112, "NUTRITION_EDITOR.CALORIES_GOAL"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", ctx.state.targetKcal)("readonly", ctx.state.lock.calories);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](23, 114, "NUTRITION_EDITOR.KCAL"));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("locked", ctx.state.lock.calories);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("fa-lock", ctx.state.lock.calories)("fa-unlock", !ctx.state.lock.calories);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](31, 116, "NUTRITION_EDITOR.RECALCULAR"));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.goal && ctx.goal._id !== (ctx.user == null ? null : ctx.user.goalInUse));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](37, 118, "NUTRITION_EDITOR.MACRO_DISTRIBUTION"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵstyleProp"]("width", ctx.state.pct.p, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("", ctx.round1(ctx.state.pct.p), "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵstyleProp"]("left", ctx.state.pct.p, "%")("width", ctx.state.pct.c, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("", ctx.round1(ctx.state.pct.c), "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵstyleProp"]("left", ctx.state.pct.p + ctx.state.pct.c, "%")("width", ctx.state.pct.f, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("", ctx.round1(ctx.state.pct.f), "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵstyleProp"]("left", ctx.state.pct.p, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵstyleProp"]("left", ctx.state.pct.p + ctx.state.pct.c, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("locked", ctx.state.lock.p);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](59, 120, "NUTRITION_EDITOR.PROTEINS"));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate2"]("", ctx.getKcalByMacro("p"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](62, 122, "NUTRITION_EDITOR.KCAL"), "");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", ctx.state.grams.p)("readonly", ctx.state.lock.p);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", ctx.round1(ctx.state.pct.p))("readonly", ctx.state.lock.p);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("is-locked", ctx.state.lock.p);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("title", ctx.state.lock.p ? _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](73, 124, "NUTRITION_EDITOR.UNLOCK") : _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](74, 126, "NUTRITION_EDITOR.LOCK"));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("fa-lock", ctx.state.lock.p)("fa-unlock", !ctx.state.lock.p);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("locked", ctx.state.lock.c);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](82, 128, "NUTRITION_EDITOR.CBH"));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate2"]("", ctx.getKcalByMacro("c"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](85, 130, "NUTRITION_EDITOR.KCAL"), "");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", ctx.state.grams.c)("readonly", ctx.state.lock.c);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", ctx.round1(ctx.state.pct.c))("readonly", ctx.state.lock.c);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("is-locked", ctx.state.lock.c);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("title", ctx.state.lock.c ? _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](96, 132, "NUTRITION_EDITOR.UNLOCK") : _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](97, 134, "NUTRITION_EDITOR.LOCK"));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("fa-lock", ctx.state.lock.c)("fa-unlock", !ctx.state.lock.c);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("locked", ctx.state.lock.f);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](105, 136, "NUTRITION_EDITOR.FATS"));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate2"]("", ctx.getKcalByMacro("f"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](108, 138, "NUTRITION_EDITOR.KCAL"), "");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", ctx.state.grams.f)("readonly", ctx.state.lock.f);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", ctx.round1(ctx.state.pct.f))("readonly", ctx.state.lock.f);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("is-locked", ctx.state.lock.f);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("title", ctx.state.lock.f ? _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](119, 140, "NUTRITION_EDITOR.UNLOCK") : _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](120, 142, "NUTRITION_EDITOR.LOCK"));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("fa-lock", ctx.state.lock.f)("fa-unlock", !ctx.state.lock.f);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.hasKcalExcess() || ctx.hasPercentageExcess());
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](128, 144, "NUTRITION_EDITOR.BALANCE_TITLE"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](132, 146, "NUTRITION_EDITOR.GOAL_LABEL"));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate2"]("", ctx.state.targetKcal, " ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](135, 148, "NUTRITION_EDITOR.KCAL"), "");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](139, 150, "NUTRITION_EDITOR.TOTAL_MACROS"));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("excess", ctx.hasKcalExcess());
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate2"]("", ctx.getTotalKcalFromMacros(), " ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](142, 152, "NUTRITION_EDITOR.KCAL"), "");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](146, 154, "NUTRITION_EDITOR.DIFFERENCE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("positive", ctx.getKcalDifference() > 0)("negative", ctx.getKcalDifference() < 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate3"](" ", ctx.getKcalDifference() > 0 ? "+" : "", "", ctx.round1(ctx.getKcalDifference()), " ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](149, 156, "NUTRITION_EDITOR.KCAL"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction0"](163, _c3));
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵstyleProp"]("width", ctx.state.pct.p, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵstyleProp"]("width", ctx.state.pct.c, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵstyleProp"]("width", ctx.state.pct.f, "%");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵclassProp"]("excess", ctx.hasPercentageExcess());
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind2"](159, 158, "NUTRITION_EDITOR.TOTAL_LABEL", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpureFunction1"](164, _c2, ctx.getPercentageSum())), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", !ctx.isValidConfiguration() || ctx.isSaving);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵpipeBind1"](163, 161, "NUTRITION_EDITOR.GUARDAR"), " ");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_13__.IonIcon, src_app_core_directives_cursor_end_directive__WEBPACK_IMPORTED_MODULE_8__.CursorEndDirective, src_app_core_directives_decimal_input_directive__WEBPACK_IMPORTED_MODULE_9__.DecimalInputDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslatePipe],
  styles: [".tf-page-header__action-button {\n  background: rgba(255, 255, 255, 0.05);\n  border: none;\n  border-radius: 8px;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: rgba(255, 255, 255, 0.7);\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.tf-page-header__action-button ion-icon {\n  font-size: 20px;\n}\n.tf-page-header__action-button:active {\n  transform: scale(0.95);\n  background: rgba(255, 255, 255, 0.1);\n}\n\n:root {\n  --bg-primary: #0a0a0b;\n  --bg-secondary: #111111;\n  --bg-tertiary: #141414;\n  --border-primary: #252525;\n  --text-primary: #ffffff;\n  --text-secondary: #9ca3af;\n  --accent-primary: #fe9000;\n}\n\n.mobile-container {\n  min-height: 100vh;\n  background: var(--bg-primary);\n  color: var(--text-primary);\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif;\n  display: flex;\n  flex-direction: column;\n}\n\n.main-content {\n  flex: 1;\n  padding: 1rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n.card {\n  background: var(--bg-tertiary);\n  border: 1px solid var(--border-primary);\n  border-radius: 12px;\n  padding: 1.5rem;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);\n  transition: all 0.2s ease;\n}\n\n.card-title {\n  font-size: 1.1rem;\n  font-weight: 600;\n  margin: 0 0 1rem 0;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.card-title i {\n  color: var(--accent-primary);\n  font-size: 1rem;\n}\n\n.calories-card .input-group {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  background: var(--bg-secondary);\n  border: 2px solid var(--border-primary);\n  border-radius: 8px;\n  padding: 0.75rem;\n  transition: border-color 0.2s ease;\n}\n.calories-card .input-group:focus-within {\n  border-color: var(--accent-primary);\n}\n.calories-card .calories-input {\n  flex: 1;\n  background: transparent;\n  border: none;\n  color: var(--text-primary);\n  font-size: 2rem;\n  font-weight: 700;\n  text-align: center;\n  outline: none;\n}\n.calories-card .calories-input::placeholder {\n  color: var(--text-secondary);\n}\n.calories-card .calories-input[readonly] {\n  opacity: 0.6;\n  cursor: not-allowed;\n}\n.calories-card .calories-label {\n  color: var(--text-secondary);\n  font-size: 1.1rem;\n  font-weight: 500;\n}\n\n.calories-actions {\n  display: flex;\n  gap: 8px;\n  margin-top: 12px;\n}\n.calories-actions .auto-calc-btn {\n  flex: 1;\n}\n\n.macros-card .macro-adjuster-card {\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid var(--border-primary);\n  border-radius: 14px;\n  padding: 12px 14px;\n  margin-bottom: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  transition: all 0.2s ease;\n  gap: 12px;\n}\n.macros-card .macro-adjuster-card:last-child {\n  margin-bottom: 0;\n}\n.macros-card .macro-adjuster-card.locked {\n  background: rgba(0, 0, 0, 0.15);\n  border-color: rgba(255, 255, 255, 0.05);\n}\n.macros-card .macro-adjuster-card.locked .macro-dot,\n.macros-card .macro-adjuster-card.locked .macro-name,\n.macros-card .macro-adjuster-card.locked .macro-kcal-info,\n.macros-card .macro-adjuster-card.locked .input-field input {\n  opacity: 0.5;\n}\n.macros-card .macro-adjuster-card.protein {\n  --macro-color: #3880ff;\n  --macro-bg-glow: rgba(56, 128, 255, 0.1);\n}\n.macros-card .macro-adjuster-card.carbs {\n  --macro-color: #2dd36f;\n  --macro-bg-glow: rgba(45, 211, 111, 0.1);\n}\n.macros-card .macro-adjuster-card.fat {\n  --macro-color: #ffc409;\n  --macro-bg-glow: rgba(255, 196, 9, 0.1);\n}\n.macros-card .macro-info {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  flex: 0 0 90px;\n}\n.macros-card .macro-info .macro-dot {\n  width: 10px;\n  height: 10px;\n  border-radius: 50%;\n  background: var(--macro-color);\n  box-shadow: 0 0 8px var(--macro-bg-glow);\n}\n.macros-card .macro-info .macro-text {\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n.macros-card .macro-info .macro-name {\n  font-size: 0.85rem;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.macros-card .macro-info .macro-kcal-info {\n  font-size: 0.7rem;\n  color: var(--text-secondary);\n  font-weight: 500;\n}\n.macros-card .macro-inputs {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex: 1;\n  justify-content: flex-end;\n}\n.macros-card .input-field {\n  position: relative;\n  background: var(--bg-secondary);\n  border: 1px solid var(--border-primary);\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  padding-right: 8px;\n  transition: all 0.2s ease;\n}\n.macros-card .input-field input {\n  background: transparent;\n  border: none;\n  color: var(--text-primary);\n  width: 52px;\n  padding: 10px 4px 10px 10px;\n  font-size: 0.9rem;\n  font-weight: 700;\n  text-align: right;\n  outline: none;\n  -webkit-appearance: none;\n          appearance: none;\n  -moz-appearance: textfield;\n}\n.macros-card .input-field input::-webkit-outer-spin-button, .macros-card .input-field input::-webkit-inner-spin-button {\n  appearance: none;\n  -webkit-appearance: none;\n  margin: 0;\n}\n.macros-card .input-field .unit {\n  font-size: 0.7rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n  margin-left: 2px;\n}\n.macros-card .input-field:focus-within {\n  border-color: var(--macro-color);\n  box-shadow: 0 0 0 3px var(--macro-bg-glow);\n}\n.macros-card .input-field.percentage input {\n  width: 52px;\n}\n.macros-card .lock-toggle {\n  background: transparent;\n  border: 1px solid var(--border-primary);\n  border-radius: 8px;\n  color: var(--text-secondary);\n  width: 36px;\n  height: 36px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.2s ease;\n  cursor: pointer;\n}\n.macros-card .lock-toggle.is-locked {\n  background: var(--macro-color);\n  border-color: var(--macro-color);\n  color: white;\n  box-shadow: 0 2px 8px var(--macro-bg-glow);\n}\n.macros-card .lock-toggle:active {\n  transform: scale(0.9);\n}\n.macros-card .lock-toggle i {\n  font-size: 0.85rem;\n}\n.macros-card .unified-slider-container {\n  position: relative;\n  width: 100%;\n  height: 48px;\n  margin: 20px 0;\n  touch-action: none;\n  padding: 10px 0;\n}\n.macros-card .unified-slider-track {\n  position: relative;\n  width: 100%;\n  height: 24px;\n  background: var(--bg-secondary);\n  border-radius: 12px;\n  overflow: visible;\n  border: 1px solid var(--border-primary);\n  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n.macros-card .slider-segments-wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.macros-card .slider-segment {\n  position: absolute;\n  height: 100%;\n  top: 0;\n  will-change: width, left;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: rgba(255, 255, 255, 0.9);\n  font-size: 11px;\n  font-weight: 700;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);\n  overflow: hidden;\n  white-space: nowrap;\n}\n.macros-card .slider-segment.segment-p {\n  background-color: var(--protein-color);\n}\n.macros-card .slider-segment.segment-c {\n  background-color: var(--carbs-color);\n}\n.macros-card .slider-segment.segment-f {\n  background-color: var(--fat-color);\n}\n.macros-card .slider-handle {\n  position: absolute;\n  top: 50%;\n  width: 32px;\n  height: 32px;\n  background: #ffffff;\n  border-radius: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 10;\n  cursor: grab;\n  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border: 3px solid var(--bg-tertiary);\n  transition: transform 0.1s ease, box-shadow 0.1s ease;\n  touch-action: none;\n}\n.macros-card .slider-handle::before {\n  content: \"\";\n  position: absolute;\n  top: -15px;\n  left: -15px;\n  right: -15px;\n  bottom: -15px;\n}\n.macros-card .slider-handle:active {\n  cursor: grabbing;\n  transform: translate(-50%, -50%);\n  border-color: var(--accent-primary);\n}\n.macros-card .slider-handle::after {\n  content: \"\";\n  width: 4px;\n  height: 14px;\n  background: #ccc;\n  border-radius: 2px;\n}\n.macros-card .protein input[type=range]::-webkit-slider-thumb {\n  background-color: var(--protein-color) !important;\n}\n.macros-card .carbs input[type=range]::-webkit-slider-thumb {\n  background-color: var(--carbs-color) !important;\n}\n.macros-card .fat input[type=range]::-webkit-slider-thumb {\n  background-color: var(--fat-color) !important;\n}\n.macros-card .protein input[type=range]::-moz-range-thumb {\n  background-color: var(--protein-color) !important;\n}\n.macros-card .carbs input[type=range]::-moz-range-thumb {\n  background-color: var(--carbs-color) !important;\n}\n.macros-card .fat input[type=range]::-moz-range-thumb {\n  background-color: var(--fat-color) !important;\n}\n\n.lock-button {\n  background: var(--bg-secondary);\n  border: 1px solid var(--border-primary);\n  border-radius: 6px;\n  color: var(--text-secondary);\n  padding: 0.5rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 36px;\n  height: 36px;\n}\n.lock-button.locked {\n  background: var(--accent-primary);\n  color: var(--text-primary);\n  border-color: var(--accent-primary);\n}\n.lock-button i {\n  font-size: 0.9rem;\n}\n\n.distribution-card .distribution-chart {\n  height: 20px;\n  border-radius: 10px;\n  overflow: hidden;\n  display: flex;\n  background: var(--bg-secondary);\n  border: 1px solid var(--border-primary);\n}\n.distribution-card .chart-bar-segment {\n  height: 100%;\n  transition: width 0.3s ease;\n}\n.distribution-card .chart-bar-segment.chart-protein {\n  background: var(--protein-color);\n}\n.distribution-card .chart-bar-segment.chart-carbs {\n  background: var(--carbs-color);\n}\n.distribution-card .chart-bar-segment.chart-fat {\n  background: var(--fat-color);\n}\n\n.footer-action {\n  display: flex;\n  gap: 16px;\n  justify-content: center;\n  align-items: center;\n  padding: 20px;\n  flex-wrap: nowrap;\n  border-top: 1px solid var(--border-primary);\n}\n\n.save-button {\n  height: 48px;\n  border-radius: 12px;\n  padding: 12px 24px;\n  font-size: 0.7rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  border: none;\n  text-transform: none;\n  flex: 1;\n  min-width: 140px;\n}\n@media (max-width: 768px) {\n  .save-button {\n    flex: 1;\n    max-width: none;\n    width: 100%;\n  }\n}\n\n.save-button {\n  background: var(--accent-primary);\n  color: white;\n}\n.save-button:disabled {\n  background: var(--text-secondary);\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n\n.auto-calc-btn {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 10px;\n  width: 100%;\n  height: 48px;\n  border-radius: 12px;\n  padding: 12px 20px;\n  border: none;\n  background: rgba(var(--ion-color-secondary-rgb), 0.15);\n  color: var(--ion-color-secondary);\n  font-size: 0.75rem;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.auto-calc-btn ion-icon {\n  font-size: 1.2rem;\n  color: var(--ion-color-secondary);\n}\n.auto-calc-btn:active {\n  transform: scale(0.98);\n  background: rgba(var(--ion-color-secondary-rgb), 0.25);\n}\n.auto-calc-btn--primary {\n  background: rgba(var(--ion-color-primary-rgb), 0.15);\n  color: var(--ion-color-primary);\n}\n.auto-calc-btn--primary ion-icon {\n  color: var(--ion-color-primary);\n}\n.auto-calc-btn--primary:active {\n  background: rgba(var(--ion-color-primary-rgb), 0.25);\n}\n\n.mobile-container {\n  min-height: 100vh;\n  width: 100%;\n  max-width: 100vw;\n  overflow-x: hidden;\n  -webkit-overflow-scrolling: touch;\n  scroll-behavior: smooth;\n}\n\n.main-content {\n  padding: 12px;\n  width: 100%;\n}\n\n.card {\n  padding: 16px;\n  margin-bottom: 12px;\n  border-radius: 12px;\n}\n\n.calories-input {\n  font-size: 2rem;\n  width: 100%;\n  max-width: 200px;\n  text-align: center;\n}\n\n@media (max-width: 480px) {\n  .macro-adjuster-card {\n    padding: 10px;\n  }\n  .macro-adjuster-card .macro-info {\n    flex: 0 0 90px;\n  }\n  .macro-adjuster-card .macro-inputs {\n    gap: 4px;\n  }\n  .macro-adjuster-card .input-field input {\n    width: 42px;\n    padding: 8px 2px 8px 6px;\n  }\n}\n\n@media (max-width: 374px) {\n  .main-content {\n    padding: 8px;\n  }\n  .card {\n    padding: 12px;\n    margin-bottom: 8px;\n  }\n  .calories-input {\n    font-size: 1.8rem;\n    max-width: 180px;\n  }\n  .macro-name {\n    font-size: 14px;\n  }\n}\n@media (min-width: 375px) and (max-width: 479px) {\n  .main-content {\n    padding: 16px;\n  }\n  .card {\n    padding: 18px;\n  }\n  .calories-input {\n    font-size: 2.2rem;\n    max-width: 220px;\n  }\n  .macro-adjuster .macro-values {\n    gap: 12px;\n  }\n  .grams-input,\n  .percent-input {\n    width: 65px;\n    font-size: 15px;\n  }\n}\n@media (min-width: 480px) and (max-width: 767px) {\n  .mobile-container {\n    max-width: 600px;\n    margin: 0 auto;\n  }\n  .main-content {\n    padding: 20px;\n  }\n  .card {\n    padding: 24px;\n    margin-bottom: 16px;\n  }\n  .calories-input {\n    font-size: 2.5rem;\n    max-width: 250px;\n  }\n}\n@media (min-width: 768px) and (max-width: 1023px) {\n  .mobile-container {\n    max-width: 700px;\n    margin: 0 auto;\n    padding: 20px;\n  }\n  .main-content {\n    padding: 24px;\n  }\n  .card {\n    padding: 28px;\n    margin-bottom: 20px;\n  }\n  .calories-input {\n    font-size: 2.8rem;\n    max-width: 280px;\n  }\n}\n@media (min-width: 1024px) {\n  .mobile-container {\n    max-width: 800px;\n    margin: 0 auto;\n    padding: 40px 20px;\n  }\n  .main-content {\n    padding: 32px;\n  }\n  .card {\n    padding: 32px;\n    margin-bottom: 24px;\n  }\n  .calories-input {\n    font-size: 3rem;\n    max-width: 300px;\n  }\n}\n.summary-section {\n  margin-bottom: 1.5rem;\n}\n.summary-section:last-child {\n  margin-bottom: 0;\n}\n\n.summary-subtitle {\n  font-size: 1rem;\n  font-weight: 600;\n  margin: 0 0 1rem 0;\n  color: var(--text-primary);\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n.summary-subtitle i {\n  color: var(--accent-primary);\n  font-size: 0.875rem;\n}\n\n.calories-summary .summary-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem 0;\n  border-bottom: 1px solid var(--border-primary);\n}\n.calories-summary .summary-row:last-child {\n  border-bottom: none;\n}\n.calories-summary .summary-label {\n  color: var(--text-secondary);\n  font-size: 0.875rem;\n}\n.calories-summary .summary-value {\n  font-weight: 600;\n  font-size: 0.875rem;\n}\n.calories-summary .summary-value.target-kcal {\n  color: var(--text-primary);\n}\n.calories-summary .summary-value.total-kcal {\n  color: var(--text-primary);\n}\n.calories-summary .summary-value.total-kcal.excess {\n  color: #ef4444;\n}\n.calories-summary .summary-value.difference-kcal.positive {\n  color: #ef4444;\n}\n.calories-summary .summary-value.difference-kcal.negative {\n  color: var(--carbs-color);\n}\n\n.macros-breakdown .macro-summary-item {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.75rem 0;\n  border-bottom: 1px solid var(--border-primary);\n}\n.macros-breakdown .macro-summary-item:last-child {\n  border-bottom: none;\n}\n.macros-breakdown .macro-summary-header {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n}\n.macros-breakdown .macro-color-indicator {\n  width: 12px;\n  height: 12px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.macros-breakdown .macro-summary-name {\n  font-weight: 500;\n  color: var(--text-primary);\n  font-size: 0.875rem;\n}\n.macros-breakdown .macro-summary-details {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-size: 0.8125rem;\n}\n.macros-breakdown .macro-summary-grams {\n  font-weight: 600;\n  color: var(--text-primary);\n  min-width: 40px;\n  text-align: right;\n}\n.macros-breakdown .macro-summary-percent {\n  color: var(--text-secondary);\n  min-width: 45px;\n  text-align: right;\n}\n.macros-breakdown .macro-summary-kcal {\n  color: var(--text-secondary);\n  min-width: 55px;\n  text-align: right;\n}\n\n.visual-distribution .distribution-chart {\n  height: 8px;\n  background: var(--border-primary);\n  border-radius: 4px;\n  overflow: hidden;\n  display: flex;\n  margin-bottom: 0.75rem;\n}\n.visual-distribution .chart-bar-segment {\n  height: 100%;\n  transition: all 0.3s ease;\n  cursor: help;\n}\n.visual-distribution .chart-bar-segment.chart-protein {\n  background: var(--protein-color);\n}\n.visual-distribution .chart-bar-segment.chart-carbs {\n  background: var(--carbs-color);\n}\n.visual-distribution .chart-bar-segment.chart-fat {\n  background: var(--fat-color);\n}\n.visual-distribution .percentage-total {\n  text-align: center;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n}\n.visual-distribution .percentage-total.excess {\n  color: #f59e0b;\n}\n\n.info-card {\n  display: flex;\n  align-items: flex-start;\n  gap: 12px;\n  padding: 14px 16px;\n  border-radius: 12px;\n  margin-bottom: 12px;\n  background: linear-gradient(135deg, rgba(var(--ion-color-primary-rgb), 0.08) 0%, rgba(var(--ion-color-primary-rgb), 0.04) 100%);\n  border: 1px solid rgba(var(--ion-color-primary-rgb), 0.18);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.info-card.warning-card {\n  background: linear-gradient(135deg, rgba(var(--ion-color-warning-rgb), 0.1) 0%, rgba(var(--ion-color-warning-rgb), 0.05) 100%);\n  border-color: rgba(var(--ion-color-warning-rgb), 0.25);\n}\n.info-card.warning-card .info-icon,\n.info-card.warning-card .info-title {\n  color: var(--ion-color-warning);\n}\n.info-card .info-icon {\n  font-size: 1.25rem;\n  flex-shrink: 0;\n  margin-top: 2px;\n}\n.info-card .info-text .info-title {\n  display: block;\n  font-size: 0.95rem;\n  font-weight: 700;\n  letter-spacing: 0.2px;\n  margin-bottom: 4px;\n}\n.info-card .info-text p {\n  margin: 0;\n  font-size: 0.85rem;\n  line-height: 1.5;\n  color: var(--text-secondary);\n}\n\n@media (max-width: 480px) {\n  .macro-summary-details {\n    flex-direction: column;\n    gap: 0.25rem;\n    align-items: flex-end;\n  }\n  .warnings .info-card {\n    padding: 12px;\n    gap: 10px;\n  }\n  .warnings .info-card .info-icon {\n    font-size: 1.1rem;\n  }\n  .warnings .info-card .info-title {\n    font-size: 0.85rem;\n  }\n  .warnings .info-card p {\n    font-size: 0.8rem;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL3Byb2ZpbGUvY29tcG9uZW50cy9jb25maWd1cmF0aW9uL2NvbXBvbmVudHMvZWRpdG9yL2NvbXBvbmVudHMvbnV0cml0aW9uLWVkaXRvci9udXRyaXRpb24tZWRpdG9yLnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNFLHFDQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLCtCQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0FBQUY7QUFFRTtFQUNFLGVBQUE7QUFBSjtBQUdFO0VBQ0Usc0JBQUE7RUFDQSxvQ0FBQTtBQURKOztBQUtBO0VBQ0UscUJBQUE7RUFDQSx1QkFBQTtFQUNBLHNCQUFBO0VBQ0EseUJBQUE7RUFDQSx1QkFBQTtFQUNBLHlCQUFBO0VBQ0EseUJBQUE7QUFGRjs7QUFLQTtFQUNFLGlCQUFBO0VBQ0EsNkJBQUE7RUFDQSwwQkFBQTtFQUNBLDhFQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FBRkY7O0FBTUE7RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7QUFIRjs7QUFPQTtFQUNFLDhCQUFBO0VBQ0EsdUNBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSx3Q0FBQTtFQUNBLHlCQUFBO0FBSkY7O0FBT0E7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7QUFKRjtBQU1FO0VBQ0UsNEJBQUE7RUFDQSxlQUFBO0FBSko7O0FBVUU7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsK0JBQUE7RUFDQSx1Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQ0FBQTtBQVBKO0FBU0k7RUFDRSxtQ0FBQTtBQVBOO0FBV0U7RUFDRSxPQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsMEJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7QUFUSjtBQVdJO0VBQ0UsNEJBQUE7QUFUTjtBQVlJO0VBQ0UsWUFBQTtFQUNBLG1CQUFBO0FBVk47QUFjRTtFQUNFLDRCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBQVpKOztBQWdCQTtFQUNFLGFBQUE7RUFDQSxRQUFBO0VBQ0EsZ0JBQUE7QUFiRjtBQWVFO0VBQ0UsT0FBQTtBQWJKOztBQW1CRTtFQUNFLHFDQUFBO0VBQ0EsdUNBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLHlCQUFBO0VBQ0EsU0FBQTtBQWhCSjtBQWtCSTtFQUNFLGdCQUFBO0FBaEJOO0FBbUJJO0VBQ0UsK0JBQUE7RUFDQSx1Q0FBQTtBQWpCTjtBQW1CTTs7OztFQUlFLFlBQUE7QUFqQlI7QUFzQkk7RUFDRSxzQkFBQTtFQUNBLHdDQUFBO0FBcEJOO0FBdUJJO0VBQ0Usc0JBQUE7RUFDQSx3Q0FBQTtBQXJCTjtBQXdCSTtFQUNFLHNCQUFBO0VBQ0EsdUNBQUE7QUF0Qk47QUEwQkU7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsY0FBQTtBQXhCSjtBQTBCSTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSw4QkFBQTtFQUNBLHdDQUFBO0FBeEJOO0FBMkJJO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtBQXpCTjtBQTRCSTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSwwQkFBQTtBQTFCTjtBQTZCSTtFQUNFLGlCQUFBO0VBQ0EsNEJBQUE7RUFDQSxnQkFBQTtBQTNCTjtBQStCRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0VBQ0EseUJBQUE7QUE3Qko7QUFnQ0U7RUFDRSxrQkFBQTtFQUNBLCtCQUFBO0VBQ0EsdUNBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7QUE5Qko7QUFnQ0k7RUFDRSx1QkFBQTtFQUNBLFlBQUE7RUFDQSwwQkFBQTtFQUNBLFdBQUE7RUFDQSwyQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtFQUNBLGFBQUE7RUFDQSx3QkFBQTtVQUFBLGdCQUFBO0VBQ0EsMEJBQUE7QUE5Qk47QUFnQ007RUFFRSxnQkFBQTtFQUNBLHdCQUFBO0VBQ0EsU0FBQTtBQS9CUjtBQW1DSTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLGdCQUFBO0FBakNOO0FBb0NJO0VBQ0UsZ0NBQUE7RUFDQSwwQ0FBQTtBQWxDTjtBQXNDTTtFQUNFLFdBQUE7QUFwQ1I7QUF5Q0U7RUFDRSx1QkFBQTtFQUNBLHVDQUFBO0VBQ0Esa0JBQUE7RUFDQSw0QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSx5QkFBQTtFQUNBLGVBQUE7QUF2Q0o7QUF5Q0k7RUFDRSw4QkFBQTtFQUNBLGdDQUFBO0VBQ0EsWUFBQTtFQUNBLDBDQUFBO0FBdkNOO0FBMENJO0VBQ0UscUJBQUE7QUF4Q047QUEyQ0k7RUFDRSxrQkFBQTtBQXpDTjtBQThDRTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7RUFHQSxlQUFBO0FBOUNKO0FBaURFO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLCtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLHVDQUFBO0VBQ0EsOENBQUE7QUEvQ0o7QUFrREU7RUFDRSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FBaERKO0FBbURFO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsTUFBQTtFQUNBLHdCQUFBO0VBR0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSwrQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLHlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQW5ESjtBQXFESTtFQUNFLHNDQUFBO0FBbkROO0FBdURJO0VBQ0Usb0NBQUE7QUFyRE47QUF3REk7RUFDRSxrQ0FBQTtBQXRETjtBQTJERTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdDQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSx3Q0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esb0NBQUE7RUFDQSxxREFBQTtFQUNBLGtCQUFBO0FBekRKO0FBNERJO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsVUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtBQTFETjtBQTZESTtFQUNFLGdCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxtQ0FBQTtBQTNETjtBQThESTtFQUNFLFdBQUE7RUFDQSxVQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7QUE1RE47QUFpRUU7RUFDRSxpREFBQTtBQS9ESjtBQWtFRTtFQUNFLCtDQUFBO0FBaEVKO0FBbUVFO0VBQ0UsNkNBQUE7QUFqRUo7QUFvRUU7RUFDRSxpREFBQTtBQWxFSjtBQXFFRTtFQUNFLCtDQUFBO0FBbkVKO0FBc0VFO0VBQ0UsNkNBQUE7QUFwRUo7O0FBeUVBO0VBQ0UsK0JBQUE7RUFDQSx1Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsNEJBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQXRFRjtBQXdFRTtFQUNFLGlDQUFBO0VBQ0EsMEJBQUE7RUFDQSxtQ0FBQTtBQXRFSjtBQXlFRTtFQUNFLGlCQUFBO0FBdkVKOztBQThFRTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLCtCQUFBO0VBQ0EsdUNBQUE7QUEzRUo7QUE4RUU7RUFDRSxZQUFBO0VBQ0EsMkJBQUE7QUE1RUo7QUE4RUk7RUFDRSxnQ0FBQTtBQTVFTjtBQStFSTtFQUNFLDhCQUFBO0FBN0VOO0FBZ0ZJO0VBQ0UsNEJBQUE7QUE5RU47O0FBb0ZBO0VBQ0UsYUFBQTtFQUNBLFNBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUVBLGlCQUFBO0VBQ0EsMkNBQUE7QUFsRkY7O0FBc0ZBO0VBQ0UsWUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtFQUNBLG9CQUFBO0VBQ0EsT0FBQTtFQUNBLGdCQUFBO0FBbkZGO0FBcUZFO0VBYkY7SUFjSSxPQUFBO0lBQ0EsZUFBQTtJQUNBLFdBQUE7RUFsRkY7QUFDRjs7QUFxRkE7RUFDRSxpQ0FBQTtFQUNBLFlBQUE7QUFsRkY7QUFvRkU7RUFDRSxpQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQWxGSjs7QUF1RkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0Esc0RBQUE7RUFDQSxpQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtBQXBGRjtBQXNGRTtFQUNFLGlCQUFBO0VBQ0EsaUNBQUE7QUFwRko7QUF1RkU7RUFDRSxzQkFBQTtFQUNBLHNEQUFBO0FBckZKO0FBd0ZFO0VBQ0Usb0RBQUE7RUFDQSwrQkFBQTtBQXRGSjtBQXdGSTtFQUNFLCtCQUFBO0FBdEZOO0FBeUZJO0VBQ0Usb0RBQUE7QUF2Rk47O0FBK0ZBO0VBQ0UsaUJBQUE7RUFDQSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLGlDQUFBO0VBQ0EsdUJBQUE7QUE1RkY7O0FBK0ZBO0VBQ0UsYUFBQTtFQUNBLFdBQUE7QUE1RkY7O0FBK0ZBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUE1RkY7O0FBK0ZBO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0FBNUZGOztBQWdHRTtFQURGO0lBRUksYUFBQTtFQTVGRjtFQThGRTtJQUNFLGNBQUE7RUE1Rko7RUErRkU7SUFDRSxRQUFBO0VBN0ZKO0VBaUdJO0lBQ0UsV0FBQTtJQUNBLHdCQUFBO0VBL0ZOO0FBQ0Y7O0FBcUdBO0VBQ0U7SUFDRSxZQUFBO0VBbEdGO0VBcUdBO0lBQ0UsYUFBQTtJQUNBLGtCQUFBO0VBbkdGO0VBc0dBO0lBQ0UsaUJBQUE7SUFDQSxnQkFBQTtFQXBHRjtFQXVHQTtJQUNFLGVBQUE7RUFyR0Y7QUFDRjtBQXlHQTtFQUNFO0lBQ0UsYUFBQTtFQXZHRjtFQTBHQTtJQUNFLGFBQUE7RUF4R0Y7RUEyR0E7SUFDRSxpQkFBQTtJQUNBLGdCQUFBO0VBekdGO0VBNEdBO0lBQ0UsU0FBQTtFQTFHRjtFQTZHQTs7SUFFRSxXQUFBO0lBQ0EsZUFBQTtFQTNHRjtBQUNGO0FBK0dBO0VBQ0U7SUFDRSxnQkFBQTtJQUNBLGNBQUE7RUE3R0Y7RUFnSEE7SUFDRSxhQUFBO0VBOUdGO0VBaUhBO0lBQ0UsYUFBQTtJQUNBLG1CQUFBO0VBL0dGO0VBa0hBO0lBQ0UsaUJBQUE7SUFDQSxnQkFBQTtFQWhIRjtBQUNGO0FBcUhBO0VBQ0U7SUFDRSxnQkFBQTtJQUNBLGNBQUE7SUFDQSxhQUFBO0VBbkhGO0VBc0hBO0lBQ0UsYUFBQTtFQXBIRjtFQXVIQTtJQUNFLGFBQUE7SUFDQSxtQkFBQTtFQXJIRjtFQXdIQTtJQUNFLGlCQUFBO0lBQ0EsZ0JBQUE7RUF0SEY7QUFDRjtBQTBIQTtFQUNFO0lBQ0UsZ0JBQUE7SUFDQSxjQUFBO0lBQ0Esa0JBQUE7RUF4SEY7RUEySEE7SUFDRSxhQUFBO0VBekhGO0VBNEhBO0lBQ0UsYUFBQTtJQUNBLG1CQUFBO0VBMUhGO0VBNkhBO0lBQ0UsZUFBQTtJQUNBLGdCQUFBO0VBM0hGO0FBQ0Y7QUErSEE7RUFDRSxxQkFBQTtBQTdIRjtBQStIRTtFQUNFLGdCQUFBO0FBN0hKOztBQWlJQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsMEJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FBOUhGO0FBZ0lFO0VBQ0UsNEJBQUE7RUFDQSxtQkFBQTtBQTlISjs7QUFvSUU7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EsOENBQUE7QUFqSUo7QUFtSUk7RUFDRSxtQkFBQTtBQWpJTjtBQXFJRTtFQUNFLDRCQUFBO0VBQ0EsbUJBQUE7QUFuSUo7QUFzSUU7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0FBcElKO0FBc0lJO0VBQ0UsMEJBQUE7QUFwSU47QUF1SUk7RUFDRSwwQkFBQTtBQXJJTjtBQXVJTTtFQUNFLGNBQUE7QUFySVI7QUEwSU07RUFDRSxjQUFBO0FBeElSO0FBMklNO0VBQ0UseUJBQUE7QUF6SVI7O0FBaUpFO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLDhDQUFBO0FBOUlKO0FBZ0pJO0VBQ0UsbUJBQUE7QUE5SU47QUFrSkU7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0FBaEpKO0FBbUpFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QUFqSko7QUFvSkU7RUFDRSxnQkFBQTtFQUNBLDBCQUFBO0VBQ0EsbUJBQUE7QUFsSko7QUFxSkU7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7QUFuSko7QUFzSkU7RUFDRSxnQkFBQTtFQUNBLDBCQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0FBcEpKO0FBdUpFO0VBQ0UsNEJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUFySko7QUF3SkU7RUFDRSw0QkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQXRKSjs7QUE0SkU7RUFDRSxXQUFBO0VBQ0EsaUNBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FBekpKO0FBNEpFO0VBQ0UsWUFBQTtFQUNBLHlCQUFBO0VBQ0EsWUFBQTtBQTFKSjtBQTRKSTtFQUNFLGdDQUFBO0FBMUpOO0FBNkpJO0VBQ0UsOEJBQUE7QUEzSk47QUE4Skk7RUFDRSw0QkFBQTtBQTVKTjtBQWdLRTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0FBOUpKO0FBZ0tJO0VBQ0UsY0FBQTtBQTlKTjs7QUFvS0E7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsK0hBQUE7RUFHQSwwREFBQTtFQUNBLHlDQUFBO0FBbktGO0FBcUtFO0VBQ0UsOEhBQUE7RUFHQSxzREFBQTtBQXJLSjtBQXVLSTs7RUFFRSwrQkFBQTtBQXJLTjtBQXlLRTtFQUNFLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7QUF2S0o7QUEyS0k7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7QUF6S047QUE2S0k7RUFDRSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0FBM0tOOztBQWlMQTtFQUNFO0lBQ0Usc0JBQUE7SUFDQSxZQUFBO0lBQ0EscUJBQUE7RUE5S0Y7RUFrTEU7SUFDRSxhQUFBO0lBQ0EsU0FBQTtFQWhMSjtFQWtMSTtJQUNFLGlCQUFBO0VBaExOO0VBbUxJO0lBQ0Usa0JBQUE7RUFqTE47RUFvTEk7SUFDRSxpQkFBQTtFQWxMTjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVmFyaWFibGVzIGRlIGNvbG9yZXMgLSBJZMODwqludGljYXMgYSBudXRyaXRpb25fZ29hbHNfdjIuaHRtbFxuLnRmLXBhZ2UtaGVhZGVyX19hY3Rpb24tYnV0dG9uIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIHdpZHRoOiA0MHB4O1xuICBoZWlnaHQ6IDQwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgfVxuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTUpO1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbiAgfVxufVxuXG46cm9vdCB7XG4gIC0tYmctcHJpbWFyeTogIzBhMGEwYjtcbiAgLS1iZy1zZWNvbmRhcnk6ICMxMTExMTE7XG4gIC0tYmctdGVydGlhcnk6ICMxNDE0MTQ7XG4gIC0tYm9yZGVyLXByaW1hcnk6ICMyNTI1MjU7XG4gIC0tdGV4dC1wcmltYXJ5OiAjZmZmZmZmO1xuICAtLXRleHQtc2Vjb25kYXJ5OiAjOWNhM2FmO1xuICAtLWFjY2VudC1wcmltYXJ5OiAjZmU5MDAwO1xufVxuXG4ubW9iaWxlLWNvbnRhaW5lciB7XG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1iZy1wcmltYXJ5KTtcbiAgY29sb3I6IHZhcigtLXRleHQtcHJpbWFyeSk7XG4gIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsIFwiU2Vnb2UgVUlcIiwgUm9ib3RvLCBzYW5zLXNlcmlmO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4vLyBNYWluIGNvbnRlbnRcbi5tYWluLWNvbnRlbnQge1xuICBmbGV4OiAxO1xuICBwYWRkaW5nOiAxcmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDFyZW07XG59XG5cbi8vIENhcmRzXG4uY2FyZCB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWJnLXRlcnRpYXJ5KTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAxLjVyZW07XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG59XG5cbi5jYXJkLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxLjFyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG1hcmdpbjogMCAwIDFyZW0gMDtcbiAgY29sb3I6IHZhcigtLXRleHQtcHJpbWFyeSk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMC41cmVtO1xuXG4gIGkge1xuICAgIGNvbG9yOiB2YXIoLS1hY2NlbnQtcHJpbWFyeSk7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICB9XG59XG5cbi8vIENhbG9yaWVzIGNhcmRcbi5jYWxvcmllcy1jYXJkIHtcbiAgLmlucHV0LWdyb3VwIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiAwLjc1cmVtO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJnLXNlY29uZGFyeSk7XG4gICAgYm9yZGVyOiAycHggc29saWQgdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBwYWRkaW5nOiAwLjc1cmVtO1xuICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjJzIGVhc2U7XG5cbiAgICAmOmZvY3VzLXdpdGhpbiB7XG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgICB9XG4gIH1cblxuICAuY2Fsb3JpZXMtaW5wdXQge1xuICAgIGZsZXg6IDE7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LXByaW1hcnkpO1xuICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBvdXRsaW5lOiBub25lO1xuXG4gICAgJjo6cGxhY2Vob2xkZXIge1xuICAgICAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgICB9XG5cbiAgICAmW3JlYWRvbmx5XSB7XG4gICAgICBvcGFjaXR5OiAwLjY7XG4gICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICAgIH1cbiAgfVxuXG4gIC5jYWxvcmllcy1sYWJlbCB7XG4gICAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICBmb250LXdlaWdodDogNTAwO1xuICB9XG59XG5cbi5jYWxvcmllcy1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA4cHg7XG4gIG1hcmdpbi10b3A6IDEycHg7XG5cbiAgLmF1dG8tY2FsYy1idG4ge1xuICAgIGZsZXg6IDE7XG4gIH1cbn1cblxuLy8gTWFjcm9zIGNhcmRcbi5tYWNyb3MtY2FyZCB7XG4gIC5tYWNyby1hZGp1c3Rlci1jYXJkIHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1wcmltYXJ5KTtcbiAgICBib3JkZXItcmFkaXVzOiAxNHB4O1xuICAgIHBhZGRpbmc6IDEycHggMTRweDtcbiAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgICBnYXA6IDEycHg7XG5cbiAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG5cbiAgICAmLmxvY2tlZCB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMTUpO1xuICAgICAgYm9yZGVyLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpO1xuXG4gICAgICAubWFjcm8tZG90LFxuICAgICAgLm1hY3JvLW5hbWUsXG4gICAgICAubWFjcm8ta2NhbC1pbmZvLFxuICAgICAgLmlucHV0LWZpZWxkIGlucHV0IHtcbiAgICAgICAgb3BhY2l0eTogMC41O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE51dHJpZW50IHNwZWNpZmljIGNvbG9yc1xuICAgICYucHJvdGVpbiB7XG4gICAgICAtLW1hY3JvLWNvbG9yOiAjMzg4MGZmO1xuICAgICAgLS1tYWNyby1iZy1nbG93OiByZ2JhKDU2LCAxMjgsIDI1NSwgMC4xKTtcbiAgICB9XG5cbiAgICAmLmNhcmJzIHtcbiAgICAgIC0tbWFjcm8tY29sb3I6ICMyZGQzNmY7XG4gICAgICAtLW1hY3JvLWJnLWdsb3c6IHJnYmEoNDUsIDIxMSwgMTExLCAwLjEpO1xuICAgIH1cblxuICAgICYuZmF0IHtcbiAgICAgIC0tbWFjcm8tY29sb3I6ICNmZmM0MDk7XG4gICAgICAtLW1hY3JvLWJnLWdsb3c6IHJnYmEoMjU1LCAxOTYsIDksIDAuMSk7XG4gICAgfVxuICB9XG5cbiAgLm1hY3JvLWluZm8ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDEwcHg7XG4gICAgZmxleDogMCAwIDkwcHg7XG5cbiAgICAubWFjcm8tZG90IHtcbiAgICAgIHdpZHRoOiAxMHB4O1xuICAgICAgaGVpZ2h0OiAxMHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tbWFjcm8tY29sb3IpO1xuICAgICAgYm94LXNoYWRvdzogMCAwIDhweCB2YXIoLS1tYWNyby1iZy1nbG93KTtcbiAgICB9XG5cbiAgICAubWFjcm8tdGV4dCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGdhcDogMXB4O1xuICAgIH1cblxuICAgIC5tYWNyby1uYW1lIHtcbiAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KTtcbiAgICB9XG5cbiAgICAubWFjcm8ta2NhbC1pbmZvIHtcbiAgICAgIGZvbnQtc2l6ZTogMC43cmVtO1xuICAgICAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgfVxuICB9XG5cbiAgLm1hY3JvLWlucHV0cyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogOHB4O1xuICAgIGZsZXg6IDE7XG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgfVxuXG4gIC5pbnB1dC1maWVsZCB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJnLXNlY29uZGFyeSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZy1yaWdodDogOHB4O1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG5cbiAgICBpbnB1dCB7XG4gICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgIGNvbG9yOiB2YXIoLS10ZXh0LXByaW1hcnkpO1xuICAgICAgd2lkdGg6IDUycHg7XG4gICAgICBwYWRkaW5nOiAxMHB4IDRweCAxMHB4IDEwcHg7XG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICBhcHBlYXJhbmNlOiBub25lO1xuICAgICAgLW1vei1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7XG5cbiAgICAgICY6Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24sXG4gICAgICAmOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uIHtcbiAgICAgICAgYXBwZWFyYW5jZTogbm9uZTtcbiAgICAgICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLnVuaXQge1xuICAgICAgZm9udC1zaXplOiAwLjdyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgICAgIG1hcmdpbi1sZWZ0OiAycHg7XG4gICAgfVxuXG4gICAgJjpmb2N1cy13aXRoaW4ge1xuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1tYWNyby1jb2xvcik7XG4gICAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggdmFyKC0tbWFjcm8tYmctZ2xvdyk7XG4gICAgfVxuXG4gICAgJi5wZXJjZW50YWdlIHtcbiAgICAgIGlucHV0IHtcbiAgICAgICAgd2lkdGg6IDUycHg7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLmxvY2stdG9nZ2xlIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItcHJpbWFyeSk7XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gICAgd2lkdGg6IDM2cHg7XG4gICAgaGVpZ2h0OiAzNnB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcblxuICAgICYuaXMtbG9ja2VkIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLW1hY3JvLWNvbG9yKTtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tbWFjcm8tY29sb3IpO1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgYm94LXNoYWRvdzogMCAycHggOHB4IHZhcigtLW1hY3JvLWJnLWdsb3cpO1xuICAgIH1cblxuICAgICY6YWN0aXZlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC45KTtcbiAgICB9XG5cbiAgICBpIHtcbiAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgICB9XG4gIH1cblxuICAvLyBFc3RpbG9zIHBhcmEgZWwgc2xpZGVyIHVuaWZpY2Fkb1xuICAudW5pZmllZC1zbGlkZXItY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiA0OHB4O1xuICAgIG1hcmdpbjogMjBweCAwO1xuICAgIHRvdWNoLWFjdGlvbjogbm9uZTsgLy8gUHJldmVudHMgc2Nyb2xsaW5nIHdoaWxlIGRyYWdnaW5nXG5cbiAgICAvLyDDg8KBcmVhIHNlbnNpYmxlIG3Dg8KhcyBncmFuZGUgcGFyYSBmYWNpbGl0YXIgZWwgdG9xdWVcbiAgICBwYWRkaW5nOiAxMHB4IDA7XG4gIH1cblxuICAudW5pZmllZC1zbGlkZXItdHJhY2sge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDI0cHg7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYmctc2Vjb25kYXJ5KTtcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgIG92ZXJmbG93OiB2aXNpYmxlOyAvLyBIYW5kbGVzIG11c3QgYmUgdmlzaWJsZSBvdXRzaWRlIVxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1wcmltYXJ5KTtcbiAgICBib3gtc2hhZG93OiBpbnNldCAwIDJweCA0cHggcmdiYSgwLCAwLCAwLCAwLjIpO1xuICB9XG5cbiAgLnNsaWRlci1zZWdtZW50cy13cmFwcGVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7IC8vIE1hdGNoIHBhcmVudFxuICAgIG92ZXJmbG93OiBoaWRkZW47IC8vIFRoaXMgaXMgd2hhdCBjbGlwcyB0aGUgYmFyIVxuICB9XG5cbiAgLnNsaWRlci1zZWdtZW50IHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHRvcDogMDtcbiAgICB3aWxsLWNoYW5nZTogd2lkdGgsIGxlZnQ7XG5cbiAgICAvLyBFdGlxdWV0YXMgZGUgcG9yY2VudGFqZSBkZW50cm8gZGUgbGEgYmFycmFcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcbiAgICBmb250LXNpemU6IDExcHg7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICB0ZXh0LXNoYWRvdzogMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC41KTtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cbiAgICAmLnNlZ21lbnQtcCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcm90ZWluLWNvbG9yKTtcbiAgICAgIC8vIGJvcmRlciByYWRpdXMgaGFuZGxlZCBieSB3cmFwcGVyXG4gICAgfVxuXG4gICAgJi5zZWdtZW50LWMge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tY2FyYnMtY29sb3IpO1xuICAgIH1cblxuICAgICYuc2VnbWVudC1mIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWZhdC1jb2xvcik7XG4gICAgICAvLyBib3JkZXIgcmFkaXVzIGhhbmRsZWQgYnkgd3JhcHBlclxuICAgIH1cbiAgfVxuXG4gIC5zbGlkZXItaGFuZGxlIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiA1MCU7XG4gICAgd2lkdGg6IDMycHg7XG4gICAgaGVpZ2h0OiAzMnB4O1xuICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpO1xuICAgIHotaW5kZXg6IDEwO1xuICAgIGN1cnNvcjogZ3JhYjtcbiAgICBib3gtc2hhZG93OiAwIDNweCA4cHggcmdiYSgwLCAwLCAwLCAwLjQpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBib3JkZXI6IDNweCBzb2xpZCB2YXIoLS1iZy10ZXJ0aWFyeSk7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuMXMgZWFzZSwgYm94LXNoYWRvdyAwLjFzIGVhc2U7XG4gICAgdG91Y2gtYWN0aW9uOiBub25lO1xuXG4gICAgLy8gSGl0IGFyZWEgZXh0ZW5zaW9uIGZvciBtb2JpbGVcbiAgICAmOjpiZWZvcmUge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IC0xNXB4O1xuICAgICAgbGVmdDogLTE1cHg7XG4gICAgICByaWdodDogLTE1cHg7XG4gICAgICBib3R0b206IC0xNXB4O1xuICAgIH1cblxuICAgICY6YWN0aXZlIHtcbiAgICAgIGN1cnNvcjogZ3JhYmJpbmc7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKTtcbiAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgIH1cblxuICAgICY6OmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgd2lkdGg6IDRweDtcbiAgICAgIGhlaWdodDogMTRweDtcbiAgICAgIGJhY2tncm91bmQ6ICNjY2M7XG4gICAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgfVxuICB9XG5cbiAgLy8gRXN0aWxvcyBlc3BlY8ODwq1maWNvcyBwYXJhIHNsaWRlcnMgZGUgY2FkYSBtYWNyb251dHJpZW50ZVxuICAucHJvdGVpbiBpbnB1dFt0eXBlPVwicmFuZ2VcIl06Oi13ZWJraXQtc2xpZGVyLXRodW1iIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wcm90ZWluLWNvbG9yKSAhaW1wb3J0YW50O1xuICB9XG5cbiAgLmNhcmJzIGlucHV0W3R5cGU9XCJyYW5nZVwiXTo6LXdlYmtpdC1zbGlkZXItdGh1bWIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNhcmJzLWNvbG9yKSAhaW1wb3J0YW50O1xuICB9XG5cbiAgLmZhdCBpbnB1dFt0eXBlPVwicmFuZ2VcIl06Oi13ZWJraXQtc2xpZGVyLXRodW1iIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1mYXQtY29sb3IpICFpbXBvcnRhbnQ7XG4gIH1cblxuICAucHJvdGVpbiBpbnB1dFt0eXBlPVwicmFuZ2VcIl06Oi1tb3otcmFuZ2UtdGh1bWIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXByb3RlaW4tY29sb3IpICFpbXBvcnRhbnQ7XG4gIH1cblxuICAuY2FyYnMgaW5wdXRbdHlwZT1cInJhbmdlXCJdOjotbW96LXJhbmdlLXRodW1iIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jYXJicy1jb2xvcikgIWltcG9ydGFudDtcbiAgfVxuXG4gIC5mYXQgaW5wdXRbdHlwZT1cInJhbmdlXCJdOjotbW96LXJhbmdlLXRodW1iIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1mYXQtY29sb3IpICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuLy8gTG9jayBidXR0b25zXG4ubG9jay1idXR0b24ge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1iZy1zZWNvbmRhcnkpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItcHJpbWFyeSk7XG4gIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgcGFkZGluZzogMC41cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDM2cHg7XG4gIGhlaWdodDogMzZweDtcblxuICAmLmxvY2tlZCB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LXByaW1hcnkpO1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICB9XG5cbiAgaSB7XG4gICAgZm9udC1zaXplOiAwLjlyZW07XG4gIH1cbn1cblxuLy8gRGlzdHJpYnV0aW9uIGNhcmRcblxuLmRpc3RyaWJ1dGlvbi1jYXJkIHtcbiAgLmRpc3RyaWJ1dGlvbi1jaGFydCB7XG4gICAgaGVpZ2h0OiAyMHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWJnLXNlY29uZGFyeSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xuICB9XG5cbiAgLmNoYXJ0LWJhci1zZWdtZW50IHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgdHJhbnNpdGlvbjogd2lkdGggMC4zcyBlYXNlO1xuXG4gICAgJi5jaGFydC1wcm90ZWluIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXByb3RlaW4tY29sb3IpO1xuICAgIH1cblxuICAgICYuY2hhcnQtY2FyYnMge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tY2FyYnMtY29sb3IpO1xuICAgIH1cblxuICAgICYuY2hhcnQtZmF0IHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWZhdC1jb2xvcik7XG4gICAgfVxuICB9XG59XG5cbi8vIEZvb3RlclxuLmZvb3Rlci1hY3Rpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDE2cHg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAyMHB4O1xuXG4gIGZsZXgtd3JhcDogbm93cmFwO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLXByaW1hcnkpO1xufVxuXG4vLyBFc3RpbG9zIGJhc2UgdW5pZmljYWRvcyBwYXJhIGFtYm9zIGJvdG9uZXNcbi5zYXZlLWJ1dHRvbiB7XG4gIGhlaWdodDogNDhweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMTJweCAyNHB4O1xuICBmb250LXNpemU6IDAuN3JlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xuICBib3JkZXI6IG5vbmU7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDE0MHB4O1xuXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgIGZsZXg6IDE7XG4gICAgbWF4LXdpZHRoOiBub25lO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59XG5cbi5zYXZlLWJ1dHRvbiB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWFjY2VudC1wcmltYXJ5KTtcbiAgY29sb3I6IHdoaXRlO1xuXG4gICY6ZGlzYWJsZWQge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICAgIG9wYWNpdHk6IDAuNjtcbiAgfVxufVxuXG4vLyBCb3TDg8KzbiBkZSByZWNhbGN1bGFyIGF1dG9tw4PCoXRpY28gKGRlYmFqbyBkZWwgaGVhZGVyKVxuLmF1dG8tY2FsYy1idG4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA0OHB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4IDIwcHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5LXJnYiksIDAuMTUpO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgfVxuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTgpO1xuICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2IpLCAwLjI1KTtcbiAgfVxuXG4gICYtLXByaW1hcnkge1xuICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4xNSk7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgfVxuXG4gICAgJjphY3RpdmUge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjI1KTtcbiAgICB9XG4gIH1cbn1cblxuLy8gUmVzcG9uc2l2ZSBEZXNpZ24gLSBNb2JpbGUgRmlyc3RcblxuLy8gQmFzZSBzdHlsZXMgKE1vYmlsZSAtIDMyMHB4Kylcbi5tb2JpbGUtY29udGFpbmVyIHtcbiAgbWluLWhlaWdodDogMTAwdmg7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMHZ3O1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG4gIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcbiAgc2Nyb2xsLWJlaGF2aW9yOiBzbW9vdGg7XG59XG5cbi5tYWluLWNvbnRlbnQge1xuICBwYWRkaW5nOiAxMnB4O1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmNhcmQge1xuICBwYWRkaW5nOiAxNnB4O1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xufVxuXG4uY2Fsb3JpZXMtaW5wdXQge1xuICBmb250LXNpemU6IDJyZW07XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDIwMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5tYWNyby1hZGp1c3Rlci1jYXJkIHtcbiAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XG4gICAgcGFkZGluZzogMTBweDtcblxuICAgIC5tYWNyby1pbmZvIHtcbiAgICAgIGZsZXg6IDAgMCA5MHB4O1xuICAgIH1cblxuICAgIC5tYWNyby1pbnB1dHMge1xuICAgICAgZ2FwOiA0cHg7XG4gICAgfVxuXG4gICAgLmlucHV0LWZpZWxkIHtcbiAgICAgIGlucHV0IHtcbiAgICAgICAgd2lkdGg6IDQycHg7XG4gICAgICAgIHBhZGRpbmc6IDhweCAycHggOHB4IDZweDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gU21hbGwgTW9iaWxlICh1cCB0byAzNzRweClcbkBtZWRpYSAobWF4LXdpZHRoOiAzNzRweCkge1xuICAubWFpbi1jb250ZW50IHtcbiAgICBwYWRkaW5nOiA4cHg7XG4gIH1cblxuICAuY2FyZCB7XG4gICAgcGFkZGluZzogMTJweDtcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIH1cblxuICAuY2Fsb3JpZXMtaW5wdXQge1xuICAgIGZvbnQtc2l6ZTogMS44cmVtO1xuICAgIG1heC13aWR0aDogMTgwcHg7XG4gIH1cblxuICAubWFjcm8tbmFtZSB7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICB9XG59XG5cbi8vIExhcmdlIE1vYmlsZSAoMzc1cHggLSA0NzlweClcbkBtZWRpYSAobWluLXdpZHRoOiAzNzVweCkgYW5kIChtYXgtd2lkdGg6IDQ3OXB4KSB7XG4gIC5tYWluLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gIH1cblxuICAuY2FyZCB7XG4gICAgcGFkZGluZzogMThweDtcbiAgfVxuXG4gIC5jYWxvcmllcy1pbnB1dCB7XG4gICAgZm9udC1zaXplOiAyLjJyZW07XG4gICAgbWF4LXdpZHRoOiAyMjBweDtcbiAgfVxuXG4gIC5tYWNyby1hZGp1c3RlciAubWFjcm8tdmFsdWVzIHtcbiAgICBnYXA6IDEycHg7XG4gIH1cblxuICAuZ3JhbXMtaW5wdXQsXG4gIC5wZXJjZW50LWlucHV0IHtcbiAgICB3aWR0aDogNjVweDtcbiAgICBmb250LXNpemU6IDE1cHg7XG4gIH1cbn1cblxuLy8gU21hbGwgVGFibGV0ICg0ODBweCAtIDc2N3B4KVxuQG1lZGlhIChtaW4td2lkdGg6IDQ4MHB4KSBhbmQgKG1heC13aWR0aDogNzY3cHgpIHtcbiAgLm1vYmlsZS1jb250YWluZXIge1xuICAgIG1heC13aWR0aDogNjAwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gIH1cblxuICAubWFpbi1jb250ZW50IHtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICB9XG5cbiAgLmNhcmQge1xuICAgIHBhZGRpbmc6IDI0cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgfVxuXG4gIC5jYWxvcmllcy1pbnB1dCB7XG4gICAgZm9udC1zaXplOiAyLjVyZW07XG4gICAgbWF4LXdpZHRoOiAyNTBweDtcbiAgfVxufVxuXG5cbi8vIExhcmdlIFRhYmxldCAoNzY4cHggLSAxMDIzcHgpXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIGFuZCAobWF4LXdpZHRoOiAxMDIzcHgpIHtcbiAgLm1vYmlsZS1jb250YWluZXIge1xuICAgIG1heC13aWR0aDogNzAwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgcGFkZGluZzogMjBweDtcbiAgfVxuXG4gIC5tYWluLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDI0cHg7XG4gIH1cblxuICAuY2FyZCB7XG4gICAgcGFkZGluZzogMjhweDtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICB9XG5cbiAgLmNhbG9yaWVzLWlucHV0IHtcbiAgICBmb250LXNpemU6IDIuOHJlbTtcbiAgICBtYXgtd2lkdGg6IDI4MHB4O1xuICB9XG59XG5cbi8vIERlc2t0b3AgKDEwMjRweCspXG5AbWVkaWEgKG1pbi13aWR0aDogMTAyNHB4KSB7XG4gIC5tb2JpbGUtY29udGFpbmVyIHtcbiAgICBtYXgtd2lkdGg6IDgwMHB4O1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIHBhZGRpbmc6IDQwcHggMjBweDtcbiAgfVxuXG4gIC5tYWluLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDMycHg7XG4gIH1cblxuICAuY2FyZCB7XG4gICAgcGFkZGluZzogMzJweDtcbiAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICB9XG5cbiAgLmNhbG9yaWVzLWlucHV0IHtcbiAgICBmb250LXNpemU6IDNyZW07XG4gICAgbWF4LXdpZHRoOiAzMDBweDtcbiAgfVxufVxuXG4vLyBTZWNjaW9uZXMgZGVsIHJlc3VtZW5cbi5zdW1tYXJ5LXNlY3Rpb24ge1xuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG5cbiAgJjpsYXN0LWNoaWxkIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICB9XG59XG5cbi5zdW1tYXJ5LXN1YnRpdGxlIHtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBtYXJnaW46IDAgMCAxcmVtIDA7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LXByaW1hcnkpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDAuNXJlbTtcblxuICBpIHtcbiAgICBjb2xvcjogdmFyKC0tYWNjZW50LXByaW1hcnkpO1xuICAgIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIH1cbn1cblxuLy8gQmFsYW5jZSBjYWzDg8Kzcmljb1xuLmNhbG9yaWVzLXN1bW1hcnkge1xuICAuc3VtbWFyeS1yb3cge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMC41cmVtIDA7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1wcmltYXJ5KTtcblxuICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICBib3JkZXItYm90dG9tOiBub25lO1xuICAgIH1cbiAgfVxuXG4gIC5zdW1tYXJ5LWxhYmVsIHtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuICAgIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gIH1cblxuICAuc3VtbWFyeS12YWx1ZSB7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBmb250LXNpemU6IDAuODc1cmVtO1xuXG4gICAgJi50YXJnZXQta2NhbCB7XG4gICAgICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KTtcbiAgICB9XG5cbiAgICAmLnRvdGFsLWtjYWwge1xuICAgICAgY29sb3I6IHZhcigtLXRleHQtcHJpbWFyeSk7XG5cbiAgICAgICYuZXhjZXNzIHtcbiAgICAgICAgY29sb3I6ICNlZjQ0NDQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJi5kaWZmZXJlbmNlLWtjYWwge1xuICAgICAgJi5wb3NpdGl2ZSB7XG4gICAgICAgIGNvbG9yOiAjZWY0NDQ0O1xuICAgICAgfVxuXG4gICAgICAmLm5lZ2F0aXZlIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWNhcmJzLWNvbG9yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gRGVzZ2xvc2UgcG9yIG1hY3JvbnV0cmllbnRlXG4ubWFjcm9zLWJyZWFrZG93biB7XG4gIC5tYWNyby1zdW1tYXJ5LWl0ZW0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMC43NXJlbSAwO1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItcHJpbWFyeSk7XG5cbiAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgICB9XG4gIH1cblxuICAubWFjcm8tc3VtbWFyeS1oZWFkZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDAuNzVyZW07XG4gIH1cblxuICAubWFjcm8tY29sb3ItaW5kaWNhdG9yIHtcbiAgICB3aWR0aDogMTJweDtcbiAgICBoZWlnaHQ6IDEycHg7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICB9XG5cbiAgLm1hY3JvLXN1bW1hcnktbmFtZSB7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KTtcbiAgICBmb250LXNpemU6IDAuODc1cmVtO1xuICB9XG5cbiAgLm1hY3JvLXN1bW1hcnktZGV0YWlscyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogMC43NXJlbTtcbiAgICBmb250LXNpemU6IDAuODEyNXJlbTtcbiAgfVxuXG4gIC5tYWNyby1zdW1tYXJ5LWdyYW1zIHtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LXByaW1hcnkpO1xuICAgIG1pbi13aWR0aDogNDBweDtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgfVxuXG4gIC5tYWNyby1zdW1tYXJ5LXBlcmNlbnQge1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gICAgbWluLXdpZHRoOiA0NXB4O1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICB9XG5cbiAgLm1hY3JvLXN1bW1hcnkta2NhbCB7XG4gICAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgICBtaW4td2lkdGg6IDU1cHg7XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gIH1cbn1cblxuLy8gRGlzdHJpYnVjacODwrNuIHZpc3VhbFxuLnZpc3VhbC1kaXN0cmlidXRpb24ge1xuICAuZGlzdHJpYnV0aW9uLWNoYXJ0IHtcbiAgICBoZWlnaHQ6IDhweDtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1ib3JkZXItcHJpbWFyeSk7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBtYXJnaW4tYm90dG9tOiAwLjc1cmVtO1xuICB9XG5cbiAgLmNoYXJ0LWJhci1zZWdtZW50IHtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbiAgICBjdXJzb3I6IGhlbHA7XG5cbiAgICAmLmNoYXJ0LXByb3RlaW4ge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tcHJvdGVpbi1jb2xvcik7XG4gICAgfVxuXG4gICAgJi5jaGFydC1jYXJicyB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1jYXJicy1jb2xvcik7XG4gICAgfVxuXG4gICAgJi5jaGFydC1mYXQge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tZmF0LWNvbG9yKTtcbiAgICB9XG4gIH1cblxuICAucGVyY2VudGFnZS10b3RhbCB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuXG4gICAgJi5leGNlc3Mge1xuICAgICAgY29sb3I6ICNmNTllMGI7XG4gICAgfVxuICB9XG59XG5cbi8vIEluZm8vV2FybmluZyBDYXJkIChTdHlsZSBtYXRjaGluZyBtYW5hZ2Utc2V0KVxuLmluZm8tY2FyZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDE0cHggMTZweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZyxcbiAgICAgIHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4wOCkgMCUsXG4gICAgICByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMDQpIDEwMCUpO1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMTgpO1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjA4KTtcblxuICAmLndhcm5pbmctY2FyZCB7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZyxcbiAgICAgICAgcmdiYSh2YXIoLS1pb24tY29sb3Itd2FybmluZy1yZ2IpLCAwLjEpIDAlLFxuICAgICAgICByZ2JhKHZhcigtLWlvbi1jb2xvci13YXJuaW5nLXJnYiksIDAuMDUpIDEwMCUpO1xuICAgIGJvcmRlci1jb2xvcjogcmdiYSh2YXIoLS1pb24tY29sb3Itd2FybmluZy1yZ2IpLCAwLjI1KTtcblxuICAgIC5pbmZvLWljb24sXG4gICAgLmluZm8tdGl0bGUge1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nKTtcbiAgICB9XG4gIH1cblxuICAuaW5mby1pY29uIHtcbiAgICBmb250LXNpemU6IDEuMjVyZW07XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgbWFyZ2luLXRvcDogMnB4O1xuICB9XG5cbiAgLmluZm8tdGV4dCB7XG4gICAgLmluZm8tdGl0bGUge1xuICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICBmb250LXNpemU6IDAuOTVyZW07XG4gICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMnB4O1xuICAgICAgbWFyZ2luLWJvdHRvbTogNHB4O1xuXG4gICAgfVxuXG4gICAgcCB7XG4gICAgICBtYXJnaW46IDA7XG4gICAgICBmb250LXNpemU6IDAuODVyZW07XG4gICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgICB9XG4gIH1cbn1cblxuLy8gUmVzcG9uc2l2ZSBhZGp1c3RtZW50cyBwYXJhIGVsIHJlc3VtZW5cbkBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkge1xuICAubWFjcm8tc3VtbWFyeS1kZXRhaWxzIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogMC4yNXJlbTtcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gIH1cblxuICAud2FybmluZ3Mge1xuICAgIC5pbmZvLWNhcmQge1xuICAgICAgcGFkZGluZzogMTJweDtcbiAgICAgIGdhcDogMTBweDtcblxuICAgICAgLmluZm8taWNvbiB7XG4gICAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgICAgfVxuXG4gICAgICAuaW5mby10aXRsZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgICAgIH1cblxuICAgICAgcCB7XG4gICAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgICAgfVxuICAgIH1cbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0= */"],
  encapsulation: 2
}));


/***/ }),

/***/ 89906:
/*!*******************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/profile/components/configuration/components/goal-list/goal-list.page.ts ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GoalListPage: () => (/* binding */ GoalListPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _editor_components_nutrition_editor_nutrition_editor_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../editor/components/nutrition-editor/nutrition-editor.page */ 71035);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 85342);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 66893);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var src_app_core_services_nutritional_goal_nutritional_goal_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/nutritional-goal/nutritional-goal.service */ 29586);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/util/navigation.service */ 22938);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 84725);


var _GoalListPage;












const _c0 = ["goalNameInput"];
function GoalListPage_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 17)(1, "div", 18)(2, "input", 19, 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function GoalListPage_div_17_Template_input_ngModelChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r4.newGoalName = $event);
    })("keyup.enter", function GoalListPage_div_17_Template_input_keyup_enter_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r6.confirmCreateGoal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function GoalListPage_div_17_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r7.confirmCreateGoal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](6, "ion-icon", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function GoalListPage_div_17_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r8.cancelCreateGoal());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "ion-icon", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r0.newGoalName)("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](4, 2, "NUTRITION_GOALS.NAME_PLACEHOLDER"));
  }
}
function GoalListPage_div_19_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "ion-icon", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 1, "NUTRITION_GOALS.LOCKED"), " ");
  }
}
function GoalListPage_div_19_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "ion-icon", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 1, "NUTRITION_GOALS.IN_USE"), " ");
  }
}
function GoalListPage_div_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function GoalListPage_div_19_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r13);
      const goal_r9 = restoredCtx.$implicit;
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r12.openEditor(goal_r9));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 26)(2, "h3", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, GoalListPage_div_19_span_5_Template, 4, 3, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](6, GoalListPage_div_19_span_6_Template, 4, 3, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function GoalListPage_div_19_Template_button_click_7_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r13);
      const goal_r9 = restoredCtx.$implicit;
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r14.deleteGoal(goal_r9, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "ion-icon", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "div", 33)(10, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](11, "div", 35)(12, "div", 36)(13, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "div", 38)(15, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](16, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](19, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](20, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](22, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](23, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](24, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](26, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](27, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](29, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](30, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](31, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](32);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](33, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](34, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](36, "div", 45)(37, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](38);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](39, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](40, "kcal");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const goal_r9 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵclassProp"]("active", goal_r9._id === ctx_r1.activeGoalId)("locked", ctx_r1.isGoalLocked(goal_r9));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](goal_r9.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r1.isGoalLocked(goal_r9));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", goal_r9._id === ctx_r1.activeGoalId);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵstyleProp"]("width", ctx_r1.getMacroPct(goal_r9, "p"), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵstyleProp"]("width", ctx_r1.getMacroPct(goal_r9, "c"), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵstyleProp"]("width", ctx_r1.getMacroPct(goal_r9, "f"), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](19, 20, "NUTRITION_GOALS.PROTEIN"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", goal_r9.proteinsGTotal, "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](26, 22, "NUTRITION_GOALS.CBHS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", goal_r9.carbohydratesGTotal, "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](33, 24, "NUTRITION_GOALS.FAT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", goal_r9.fatGTotal, "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](goal_r9.kcalTotal);
  }
}
function GoalListPage_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "ion-icon", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](4, 1, "NUTRITION_GOALS.EMPTY"));
  }
}
class GoalListPage {
  constructor(modalController, alertController, translate, nutritionalGoalService, userService, ionicUtilService, navigationService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "alertController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "translate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "nutritionalGoalService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "userService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "navigationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "goalNameInput", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "goals", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "activeGoalId", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isCreating", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "newGoalName", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isLoading", true);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "destroy$", new rxjs__WEBPACK_IMPORTED_MODULE_8__.Subject());
    this.modalController = modalController;
    this.alertController = alertController;
    this.translate = translate;
    this.nutritionalGoalService = nutritionalGoalService;
    this.userService = userService;
    this.ionicUtilService = ionicUtilService;
    this.navigationService = navigationService;
  }
  ngOnInit() {
    const user = this.userService.getLocalUser;
    this.activeGoalId = user?.goalInUse || null;
    this.loadGoals();
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  loadGoals() {
    this.isLoading = true;
    this.nutritionalGoalService.refreshFromServer().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.destroy$)).subscribe({
      next: goals => {
        this.activeGoalId = this.userService.getLocalUser?.goalInUse || null;
        this.goals = [...goals].sort((a, b) => {
          if (a._id === this.activeGoalId) return -1;
          if (b._id === this.activeGoalId) return 1;
          return 0;
        });
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.ionicUtilService.showToast({
          message: this.translate.instant('COMMON.ERROR'),
          duration: 2000,
          color: 'danger'
        });
      }
    });
  }
  dismiss() {
    this.modalController.dismiss();
  }
  startCreateGoal() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.hasReachedGoalLimit()) {
        yield _this.showGoalLimitAlert();
        return;
      }
      _this.isCreating = true;
      _this.newGoalName = '';
      setTimeout(() => {
        _this.goalNameInput?.nativeElement?.focus();
      }, 100);
    })();
  }
  confirmCreateGoal() {
    const name = this.newGoalName.trim();
    if (!name) {
      this.ionicUtilService.showToast({
        message: this.translate.instant('NUTRITION_GOALS.REQUIRED_FIELDS'),
        duration: 2000,
        color: 'warning'
      });
      return;
    }
    this.nutritionalGoalService.create({
      name
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(this.destroy$)).subscribe({
      next: goal => {
        this.isCreating = false;
        this.newGoalName = '';
        this.openEditor(goal);
      },
      error: error => {
        if (this.isNutritionalGoalLimitError(error)) {
          this.isCreating = false;
          this.newGoalName = '';
          void this.showGoalLimitAlert();
          return;
        }
        void this.ionicUtilService.showToast({
          message: this.translate.instant('COMMON.ERROR'),
          duration: 2000,
          color: 'danger'
        });
      }
    });
  }
  cancelCreateGoal() {
    this.isCreating = false;
    this.newGoalName = '';
  }
  openEditor(goal) {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.isGoalLocked(goal)) {
        yield _this2.showLockedGoalAlert();
        return;
      }
      const modal = yield _this2.ionicUtilService.showModal({
        component: _editor_components_nutrition_editor_nutrition_editor_page__WEBPACK_IMPORTED_MODULE_2__.NutritionEditorPage,
        componentProps: {
          goalId: goal._id
        },
        cssClass: 'fullscreen-modal'
      });
      if (modal?.data) {
        _this2.activeGoalId = _this2.userService.getLocalUser?.goalInUse || null;
      }
      _this2.loadGoals();
    })();
  }
  deleteGoal(goal, event) {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      event.stopPropagation();
      if (_this3.goals.length <= 1) {
        const alert = yield _this3.alertController.create({
          header: _this3.translate.instant('NUTRITION_GOALS.DELETE_HEADER'),
          message: _this3.translate.instant('NUTRITION_GOALS.MINIMUM_ONE_MSG'),
          cssClass: 'custom-alert',
          buttons: [{
            text: _this3.translate.instant('COMMON.OK'),
            role: 'cancel'
          }]
        });
        yield alert.present();
        return;
      }
      const alert = yield _this3.alertController.create({
        header: _this3.translate.instant('NUTRITION_GOALS.DELETE_HEADER'),
        message: _this3.translate.instant('NUTRITION_GOALS.DELETE_MSG', {
          name: goal.name
        }),
        cssClass: 'custom-alert',
        buttons: [{
          text: _this3.translate.instant('COMMON.CANCEL'),
          role: 'cancel'
        }, {
          text: _this3.translate.instant('COMMON.DELETE'),
          role: 'destructive',
          handler: () => {
            _this3.nutritionalGoalService.delete(goal._id).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.takeUntil)(_this3.destroy$)).subscribe({
              next: () => {
                _this3.activeGoalId = _this3.userService.getLocalUser?.goalInUse || null;
                _this3.loadGoals();
              },
              error: () => {
                _this3.loadGoals();
                _this3.ionicUtilService.showToast({
                  message: _this3.translate.instant('COMMON.ERROR'),
                  duration: 2000,
                  color: 'danger'
                });
              }
            });
          }
        }]
      });
      yield alert.present();
    })();
  }
  getMacroPct(goal, macro) {
    const kcalPerG = {
      p: 4,
      c: 4,
      f: 9
    };
    const grams = {
      p: goal.proteinsGTotal || 0,
      c: goal.carbohydratesGTotal || 0,
      f: goal.fatGTotal || 0
    };
    const total = grams.p * kcalPerG.p + grams.c * kcalPerG.c + grams.f * kcalPerG.f;
    if (total <= 0) return 0;
    return Math.round(grams[macro] * kcalPerG[macro] / total * 100);
  }
  get goalLimit() {
    return this.userService.getLocalUser?.premium?.entitled ? 10 : 1;
  }
  hasReachedGoalLimit() {
    return this.goals.length >= this.goalLimit;
  }
  isGoalLocked(goal) {
    if (this.userService.getLocalUser?.premium?.entitled) return false;
    if (this.goals.length <= this.goalLimit) return false;
    return goal._id !== this.getUnlockedFreeGoalId();
  }
  getUnlockedFreeGoalId() {
    const activeGoalId = this.userService.getLocalUser?.goalInUse || this.activeGoalId;
    const activeGoal = this.goals.find(goal => goal._id === activeGoalId);
    return activeGoal?._id || this.goals[0]?._id || null;
  }
  isNutritionalGoalLimitError(error) {
    return error?.code === 'NUTRITIONAL_GOALS_LIMIT_REACHED' || error?.error?.code === 'NUTRITIONAL_GOALS_LIMIT_REACHED';
  }
  showGoalLimitAlert() {
    var _this4 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const isPremium = Boolean(_this4.userService.getLocalUser?.premium?.entitled);
      if (!isPremium) {
        yield _this4.ionicUtilService.showPremiumLimitAlert({
          message: _this4.translate.instant('NUTRITION_GOALS.LIMIT_REACHED_FREE'),
          onUpgrade: () => _this4.navigationService.goToPremium()
        });
        return;
      }
      yield _this4.ionicUtilService.showAlert({
        header: _this4.translate.instant('PREMIUM.LIMIT_REACHED'),
        message: _this4.translate.instant('NUTRITION_GOALS.LIMIT_REACHED_PRO'),
        buttons: [{
          text: _this4.translate.instant('COMMON.OK'),
          role: 'cancel'
        }]
      });
    })();
  }
  showLockedGoalAlert() {
    var _this5 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this5.ionicUtilService.showPremiumLimitAlert({
        message: _this5.translate.instant('NUTRITION_GOALS.LOCKED_FREE'),
        onUpgrade: () => _this5.navigationService.goToPremium()
      });
    })();
  }
}
_GoalListPage = GoalListPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(GoalListPage, "\u0275fac", function GoalListPage_Factory(t) {
  return new (t || _GoalListPage)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_10__.AlertController), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_core_services_nutritional_goal_nutritional_goal_service__WEBPACK_IMPORTED_MODULE_3__.NutritionalGoalService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_5__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_6__.NavigationService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(GoalListPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: _GoalListPage,
  selectors: [["app-goal-list"]],
  viewQuery: function GoalListPage_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵloadQuery"]()) && (ctx.goalNameInput = _t.first);
    }
  },
  decls: 21,
  vars: 8,
  consts: [[1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], [1, "tf-page-header__back-button", 3, "click"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "tf-page-header__action-button", 3, "click"], ["name", "add-outline"], [1, "tf-page-header__progress"], [1, "tf-page-header__progress-indicator"], [1, "goal-list-content"], ["class", "create-goal-card", 4, "ngIf"], [1, "goal-cards"], ["class", "goal-card", 3, "active", "locked", "click", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], [1, "create-goal-card"], [1, "create-goal-input-row"], ["type", "text", 1, "goal-name-input", 3, "ngModel", "placeholder", "ngModelChange", "keyup.enter"], ["goalNameInput", ""], [1, "confirm-name-btn", 3, "click"], ["name", "checkmark-outline"], [1, "cancel-name-btn", 3, "click"], ["name", "close-outline"], [1, "goal-card", 3, "click"], [1, "goal-card__header"], [1, "goal-card__name"], [1, "goal-card__actions"], ["class", "locked-badge", 4, "ngIf"], ["class", "in-use-badge", 4, "ngIf"], [1, "delete-goal-btn", 3, "click"], ["name", "close-outline", "color", "danger"], [1, "goal-card__macros"], [1, "macro-bar"], [1, "macro-bar__segment", "macro-bar__segment--protein"], [1, "macro-bar__segment", "macro-bar__segment--carbs"], [1, "macro-bar__segment", "macro-bar__segment--fat"], [1, "macro-details"], [1, "macro-detail"], [1, "macro-dot", "macro-dot--protein"], [1, "macro-detail__name"], [1, "macro-detail__value"], [1, "macro-dot", "macro-dot--carbs"], [1, "macro-dot", "macro-dot--fat"], [1, "macro-kcal"], [1, "macro-kcal__value"], [1, "macro-kcal__unit"], [1, "locked-badge"], ["name", "lock-closed-outline"], [1, "in-use-badge"], ["name", "checkmark-circle"], [1, "empty-state"], ["name", "nutrition-outline"]],
  template: function GoalListPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-header")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function GoalListPage_Template_button_click_4_listener() {
        return ctx.dismiss();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](5, "ion-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "div", 5)(7, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](9, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "div", 7)(11, "button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function GoalListPage_Template_button_click_11_listener() {
        return ctx.startCreateGoal();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](12, "ion-icon", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](13, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](14, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "ion-content")(16, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](17, GoalListPage_div_17_Template, 9, 4, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](18, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](19, GoalListPage_div_19_Template, 41, 26, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](20, GoalListPage_div_20_Template, 5, 3, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](9, 6, "NUTRITION_GOALS.TITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵstyleProp"]("visibility", ctx.isLoading ? "visible" : "hidden");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.isCreating);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.goals);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.isLoading && ctx.goals.length === 0 && !ctx.isCreating);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonIcon, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslatePipe],
  styles: [".goal-list-content[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n\n.tf-page-header__action-button[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border: none;\n  border-radius: 8px;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: rgba(255, 255, 255, 0.7);\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.tf-page-header__action-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.tf-page-header__action-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n  background: rgba(255, 255, 255, 0.1);\n}\n\n.create-goal-card[_ngcontent-%COMP%] {\n  background: #141414;\n  border: 1px solid #252525;\n  border-radius: 16px;\n  padding: 16px 20px;\n  margin-bottom: 16px;\n  position: relative;\n  overflow: hidden;\n}\n.create-goal-card[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 16px;\n  padding: 1px;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02));\n  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n  -webkit-mask-composite: xor;\n          mask-composite: exclude;\n  pointer-events: none;\n  z-index: 1;\n}\n.create-goal-card[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background: #373737;\n  z-index: 10;\n}\n\n.create-goal-input-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.goal-name-input[_ngcontent-%COMP%] {\n  flex: 1;\n  background: transparent;\n  border: none;\n  border-bottom: 1px solid #373737;\n  border-radius: 0;\n  padding: 8px 0;\n  font-size: 16px;\n  color: #ffffff;\n  outline: none;\n  transition: border-color 0.2s ease;\n}\n.goal-name-input[_ngcontent-%COMP%]:focus {\n  border-bottom-color: var(--ion-color-primary);\n}\n.goal-name-input[_ngcontent-%COMP%]::placeholder {\n  color: #9ca3af;\n}\n\n.confirm-name-btn[_ngcontent-%COMP%], .cancel-name-btn[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border: none;\n  border-radius: 8px;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.confirm-name-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], .cancel-name-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.confirm-name-btn[_ngcontent-%COMP%]:active, .cancel-name-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n}\n\n.confirm-name-btn[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n}\n.confirm-name-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n}\n.confirm-name-btn[_ngcontent-%COMP%]:active {\n  background: rgba(255, 255, 255, 0.1);\n}\n\n.cancel-name-btn[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.7);\n}\n.cancel-name-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(255, 255, 255, 0.1);\n}\n.cancel-name-btn[_ngcontent-%COMP%]:active {\n  background: rgba(255, 255, 255, 0.1);\n}\n\n.goal-cards[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.goal-card[_ngcontent-%COMP%] {\n  background: #141414;\n  border: 1px solid #252525;\n  border-radius: 16px;\n  padding: 20px;\n  cursor: pointer;\n  transition: all 0.2s;\n  position: relative;\n  overflow: hidden;\n}\n.goal-card[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 16px;\n  padding: 1px;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02));\n  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n  -webkit-mask-composite: xor;\n          mask-composite: exclude;\n  pointer-events: none;\n  z-index: 1;\n}\n.goal-card[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background: #373737;\n  z-index: 10;\n}\n.goal-card[_ngcontent-%COMP%]:hover {\n  border-color: #373737;\n}\n\n.goal-card.active[_ngcontent-%COMP%] {\n  border-color: rgba(var(--ion-color-success-rgb), 0.3);\n}\n.goal-card.active[_ngcontent-%COMP%]::after {\n  background: var(--ion-color-success, #2dd36f);\n  box-shadow: 0 1px 10px rgba(var(--ion-color-success-rgb), 0.3);\n}\n\n.goal-card.locked[_ngcontent-%COMP%] {\n  border-color: rgba(255, 255, 255, 0.08);\n}\n.goal-card.locked[_ngcontent-%COMP%]::after {\n  background: #6b7280;\n}\n.goal-card.locked[_ngcontent-%COMP%]   .goal-card__macros[_ngcontent-%COMP%] {\n  opacity: 0.45;\n}\n\n.goal-card__header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n\n.goal-card__name[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  margin: 0;\n  color: #ffffff;\n  letter-spacing: -0.3px;\n}\n\n.goal-card__actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.in-use-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 12px;\n  font-weight: 600;\n  color: var(--ion-color-success, #2dd36f);\n  background: rgba(var(--ion-color-success-rgb), 0.12);\n  padding: 4px 10px;\n  border-radius: 20px;\n  white-space: nowrap;\n}\n.in-use-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n\n.locked-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 12px;\n  font-weight: 700;\n  color: #e5e7eb;\n  background: rgba(255, 255, 255, 0.08);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  padding: 4px 10px;\n  border-radius: 20px;\n  white-space: nowrap;\n}\n.locked-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n\n.delete-goal-btn[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  font-size: 18px;\n  padding: 6px;\n  cursor: pointer;\n  border-radius: 8px;\n  transition: all 0.2s ease;\n}\n.delete-goal-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(var(--ion-color-danger-rgb), 0.15);\n}\n.delete-goal-btn[_ngcontent-%COMP%]:active {\n  background: rgba(var(--ion-color-danger-rgb), 0.25);\n  transform: scale(0.95);\n}\n\n.goal-card__macros[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  padding-top: 14px;\n  border-top: 1px solid #252525;\n  margin-top: 14px;\n}\n\n.macro-bar[_ngcontent-%COMP%] {\n  display: flex;\n  height: 6px;\n  border-radius: 3px;\n  overflow: hidden;\n  background: #252525;\n  gap: 2px;\n}\n\n.macro-bar__segment[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 3px;\n  transition: width 0.3s ease;\n}\n.macro-bar__segment--protein[_ngcontent-%COMP%] {\n  background: var(--protein-color, #3880ff);\n}\n.macro-bar__segment--carbs[_ngcontent-%COMP%] {\n  background: var(--carbs-color, #2dd36f);\n}\n.macro-bar__segment--fat[_ngcontent-%COMP%] {\n  background: var(--fat-color, #ffc409);\n}\n\n.macro-details[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n.macro-detail[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex: 1;\n}\n\n.macro-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.macro-dot--protein[_ngcontent-%COMP%] {\n  background: var(--protein-color, #3880ff);\n}\n.macro-dot--carbs[_ngcontent-%COMP%] {\n  background: var(--carbs-color, #2dd36f);\n}\n.macro-dot--fat[_ngcontent-%COMP%] {\n  background: var(--fat-color, #ffc409);\n}\n\n.macro-detail__name[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 600;\n  color: #9ca3af;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n\n.macro-detail__value[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: #ffffff;\n  margin-left: auto;\n  font-variant-numeric: tabular-nums;\n}\n\n.macro-kcal[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: center;\n  gap: 4px;\n  padding-top: 2px;\n}\n\n.macro-kcal__value[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 800;\n  color: #ffffff;\n  letter-spacing: -0.5px;\n}\n\n.macro-kcal__unit[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: #6b7280;\n  text-transform: uppercase;\n}\n\n.empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 64px 16px;\n  color: #9ca3af;\n  text-align: center;\n}\n\n.empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 56px;\n  margin-bottom: 20px;\n  color: #373737;\n}\n\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 500;\n  line-height: 1.5;\n  max-width: 240px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL3Byb2ZpbGUvY29tcG9uZW50cy9jb25maWd1cmF0aW9uL2NvbXBvbmVudHMvZ29hbC1saXN0L2dvYWwtbGlzdC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSxxQ0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSwrQkFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtBQUNGO0FBQ0U7RUFDRSxlQUFBO0FBQ0o7QUFFRTtFQUNFLHNCQUFBO0VBQ0Esb0NBQUE7QUFBSjs7QUFJQTtFQUNFLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBREY7QUFHRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSx3RkFBQTtFQUNBLDhFQUNFO1VBREYsc0VBQ0U7RUFFRiwyQkFBQTtVQUFBLHVCQUFBO0VBQ0Esb0JBQUE7RUFDQSxVQUFBO0FBSEo7QUFNRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7QUFKSjs7QUFRQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7QUFMRjs7QUFRQTtFQUNFLE9BQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxnQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtFQUNBLGtDQUFBO0FBTEY7QUFPRTtFQUNFLDZDQUFBO0FBTEo7QUFRRTtFQUNFLGNBQUE7QUFOSjs7QUFVQTs7RUFFRSxxQ0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7QUFQRjtBQVNFOztFQUNFLGVBQUE7QUFOSjtBQVNFOztFQUNFLHNCQUFBO0FBTko7O0FBVUE7RUFDRSwrQkFBQTtBQVBGO0FBU0U7RUFDRSxvQ0FBQTtBQVBKO0FBVUU7RUFDRSxvQ0FBQTtBQVJKOztBQVlBO0VBQ0UsK0JBQUE7QUFURjtBQVdFO0VBQ0Usb0NBQUE7QUFUSjtBQVlFO0VBQ0Usb0NBQUE7QUFWSjs7QUFjQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7QUFYRjs7QUFjQTtFQUNFLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxlQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBWEY7QUFhRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSx3RkFBQTtFQUNBLDhFQUNFO1VBREYsc0VBQ0U7RUFFRiwyQkFBQTtVQUFBLHVCQUFBO0VBQ0Esb0JBQUE7RUFDQSxVQUFBO0FBYko7QUFnQkU7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FBZEo7QUFpQkU7RUFDRSxxQkFBQTtBQWZKOztBQW1CQTtFQUNFLHFEQUFBO0FBaEJGO0FBa0JFO0VBQ0UsNkNBQUE7RUFDQSw4REFBQTtBQWhCSjs7QUFvQkE7RUFDRSx1Q0FBQTtBQWpCRjtBQW1CRTtFQUNFLG1CQUFBO0FBakJKO0FBb0JFO0VBQ0UsYUFBQTtBQWxCSjs7QUFzQkE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FBbkJGOztBQXNCQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLFNBQUE7RUFDQSxjQUFBO0VBQ0Esc0JBQUE7QUFuQkY7O0FBc0JBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtBQW5CRjs7QUFzQkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esd0NBQUE7RUFDQSxvREFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQW5CRjtBQXFCRTtFQUNFLGVBQUE7QUFuQko7O0FBdUJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxxQ0FBQTtFQUNBLDBDQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FBcEJGO0FBc0JFO0VBQ0UsZUFBQTtBQXBCSjs7QUF3QkE7RUFDRSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLHlCQUFBO0FBckJGO0FBdUJFO0VBQ0UsbURBQUE7QUFyQko7QUF3QkU7RUFDRSxtREFBQTtFQUNBLHNCQUFBO0FBdEJKOztBQTBCQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtFQUNBLDZCQUFBO0VBQ0EsZ0JBQUE7QUF2QkY7O0FBMEJBO0VBQ0UsYUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBdkJGOztBQTBCQTtFQUNFLFlBQUE7RUFDQSxrQkFBQTtFQUNBLDJCQUFBO0FBdkJGO0FBeUJFO0VBQWEseUNBQUE7QUF0QmY7QUF1QkU7RUFBVyx1Q0FBQTtBQXBCYjtBQXFCRTtFQUFTLHFDQUFBO0FBbEJYOztBQXFCQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLFFBQUE7QUFsQkY7O0FBcUJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLE9BQUE7QUFsQkY7O0FBcUJBO0VBQ0UsVUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QUFsQkY7QUFvQkU7RUFBYSx5Q0FBQTtBQWpCZjtBQWtCRTtFQUFXLHVDQUFBO0FBZmI7QUFnQkU7RUFBUyxxQ0FBQTtBQWJYOztBQWdCQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0FBYkY7O0FBZ0JBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0Esa0NBQUE7QUFiRjs7QUFnQkE7RUFDRSxhQUFBO0VBQ0EscUJBQUE7RUFDQSx1QkFBQTtFQUNBLFFBQUE7RUFDQSxnQkFBQTtBQWJGOztBQWdCQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxzQkFBQTtBQWJGOztBQWdCQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtBQWJGOztBQWdCQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtBQWJGOztBQWdCQTtFQUNFLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7QUFiRjs7QUFnQkE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBYkYiLCJzb3VyY2VzQ29udGVudCI6WyIuZ29hbC1saXN0LWNvbnRlbnQge1xuICBwYWRkaW5nOiAyMHB4O1xufVxuXG4udGYtcGFnZS1oZWFkZXJfX2FjdGlvbi1idXR0b24ge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgd2lkdGg6IDQwcHg7XG4gIGhlaWdodDogNDBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNyk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICB9XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45NSk7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xuICB9XG59XG5cbi5jcmVhdGUtZ29hbC1jYXJkIHtcbiAgYmFja2dyb3VuZDogIzE0MTQxNDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzI1MjUyNTtcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgcGFkZGluZzogMTZweCAyMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiBcIlwiO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcbiAgICBib3R0b206IDA7XG4gICAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgICBwYWRkaW5nOiAxcHg7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpKTtcbiAgICBtYXNrOlxuICAgICAgbGluZWFyLWdyYWRpZW50KCNmZmYgMCAwKSBjb250ZW50LWJveCxcbiAgICAgIGxpbmVhci1ncmFkaWVudCgjZmZmIDAgMCk7XG4gICAgbWFzay1jb21wb3NpdGU6IGV4Y2x1ZGU7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgei1pbmRleDogMTtcbiAgfVxuXG4gICY6OmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgaGVpZ2h0OiAzcHg7XG4gICAgYmFja2dyb3VuZDogIzM3MzczNztcbiAgICB6LWluZGV4OiAxMDtcbiAgfVxufVxuXG4uY3JlYXRlLWdvYWwtaW5wdXQtcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG59XG5cbi5nb2FsLW5hbWUtaW5wdXQge1xuICBmbGV4OiAxO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzM3MzczNztcbiAgYm9yZGVyLXJhZGl1czogMDtcbiAgcGFkZGluZzogOHB4IDA7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjJzIGVhc2U7XG5cbiAgJjpmb2N1cyB7XG4gICAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICB9XG5cbiAgJjo6cGxhY2Vob2xkZXIge1xuICAgIGNvbG9yOiAjOWNhM2FmO1xuICB9XG59XG5cbi5jb25maXJtLW5hbWUtYnRuLFxuLmNhbmNlbC1uYW1lLWJ0biB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICB3aWR0aDogNDBweDtcbiAgaGVpZ2h0OiA0MHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gIH1cblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTtcbiAgfVxufVxuXG4uY29uZmlybS1uYW1lLWJ0biB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG5cbiAgJjpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xuICB9XG5cbiAgJjphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbiAgfVxufVxuXG4uY2FuY2VsLW5hbWUtYnRuIHtcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcblxuICAmOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gIH1cblxuICAmOmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xuICB9XG59XG5cbi5nb2FsLWNhcmRzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxNnB4O1xufVxuXG4uZ29hbC1jYXJkIHtcbiAgYmFja2dyb3VuZDogIzE0MTQxNDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzI1MjUyNTtcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgcGFkZGluZzogMjBweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogXCJcIjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgcGFkZGluZzogMXB4O1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSk7XG4gICAgbWFzazpcbiAgICAgIGxpbmVhci1ncmFkaWVudCgjZmZmIDAgMCkgY29udGVudC1ib3gsXG4gICAgICBsaW5lYXItZ3JhZGllbnQoI2ZmZiAwIDApO1xuICAgIG1hc2stY29tcG9zaXRlOiBleGNsdWRlO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIHotaW5kZXg6IDE7XG4gIH1cblxuICAmOjphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGhlaWdodDogM3B4O1xuICAgIGJhY2tncm91bmQ6ICMzNzM3Mzc7XG4gICAgei1pbmRleDogMTA7XG4gIH1cblxuICAmOmhvdmVyIHtcbiAgICBib3JkZXItY29sb3I6ICMzNzM3Mzc7XG4gIH1cbn1cblxuLmdvYWwtY2FyZC5hY3RpdmUge1xuICBib3JkZXItY29sb3I6IHJnYmEodmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiKSwgMC4zKTtcblxuICAmOjphZnRlciB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MsICMyZGQzNmYpO1xuICAgIGJveC1zaGFkb3c6IDAgMXB4IDEwcHggcmdiYSh2YXIoLS1pb24tY29sb3Itc3VjY2Vzcy1yZ2IpLCAwLjMpO1xuICB9XG59XG5cbi5nb2FsLWNhcmQubG9ja2VkIHtcbiAgYm9yZGVyLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDgpO1xuXG4gICY6OmFmdGVyIHtcbiAgICBiYWNrZ3JvdW5kOiAjNmI3MjgwO1xuICB9XG5cbiAgLmdvYWwtY2FyZF9fbWFjcm9zIHtcbiAgICBvcGFjaXR5OiAwLjQ1O1xuICB9XG59XG5cbi5nb2FsLWNhcmRfX2hlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbn1cblxuLmdvYWwtY2FyZF9fbmFtZSB7XG4gIGZvbnQtc2l6ZTogMThweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbWFyZ2luOiAwO1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgbGV0dGVyLXNwYWNpbmc6IC0wLjNweDtcbn1cblxuLmdvYWwtY2FyZF9fYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNnB4O1xufVxuXG4uaW4tdXNlLWJhZGdlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzLCAjMmRkMzZmKTtcbiAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3Itc3VjY2Vzcy1yZ2IpLCAwLjEyKTtcbiAgcGFkZGluZzogNHB4IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgfVxufVxuXG4ubG9ja2VkLWJhZGdlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA0cHg7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6ICNlNWU3ZWI7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wOCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbiAgcGFkZGluZzogNHB4IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgfVxufVxuXG4uZGVsZXRlLWdvYWwtYnRuIHtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm9yZGVyOiBub25lO1xuICBmb250LXNpemU6IDE4cHg7XG4gIHBhZGRpbmc6IDZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG5cbiAgJjpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3ItZGFuZ2VyLXJnYiksIDAuMTUpO1xuICB9XG5cbiAgJjphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjI1KTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTUpO1xuICB9XG59XG5cbi5nb2FsLWNhcmRfX21hY3JvcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZy10b3A6IDE0cHg7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjMjUyNTI1O1xuICBtYXJnaW4tdG9wOiAxNHB4O1xufVxuXG4ubWFjcm8tYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiA2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogIzI1MjUyNTtcbiAgZ2FwOiAycHg7XG59XG5cbi5tYWNyby1iYXJfX3NlZ21lbnQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDNweDtcbiAgdHJhbnNpdGlvbjogd2lkdGggMC4zcyBlYXNlO1xuXG4gICYtLXByb3RlaW4geyBiYWNrZ3JvdW5kOiB2YXIoLS1wcm90ZWluLWNvbG9yLCAjMzg4MGZmKTsgfVxuICAmLS1jYXJicyB7IGJhY2tncm91bmQ6IHZhcigtLWNhcmJzLWNvbG9yLCAjMmRkMzZmKTsgfVxuICAmLS1mYXQgeyBiYWNrZ3JvdW5kOiB2YXIoLS1mYXQtY29sb3IsICNmZmM0MDkpOyB9XG59XG5cbi5tYWNyby1kZXRhaWxzIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDhweDtcbn1cblxuLm1hY3JvLWRldGFpbCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNnB4O1xuICBmbGV4OiAxO1xufVxuXG4ubWFjcm8tZG90IHtcbiAgd2lkdGg6IDhweDtcbiAgaGVpZ2h0OiA4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgZmxleC1zaHJpbms6IDA7XG5cbiAgJi0tcHJvdGVpbiB7IGJhY2tncm91bmQ6IHZhcigtLXByb3RlaW4tY29sb3IsICMzODgwZmYpOyB9XG4gICYtLWNhcmJzIHsgYmFja2dyb3VuZDogdmFyKC0tY2FyYnMtY29sb3IsICMyZGQzNmYpOyB9XG4gICYtLWZhdCB7IGJhY2tncm91bmQ6IHZhcigtLWZhdC1jb2xvciwgI2ZmYzQwOSk7IH1cbn1cblxuLm1hY3JvLWRldGFpbF9fbmFtZSB7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICM5Y2EzYWY7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjNweDtcbn1cblxuLm1hY3JvLWRldGFpbF9fdmFsdWUge1xuICBmb250LXNpemU6IDEzcHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgZm9udC12YXJpYW50LW51bWVyaWM6IHRhYnVsYXItbnVtcztcbn1cblxuLm1hY3JvLWtjYWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDRweDtcbiAgcGFkZGluZy10b3A6IDJweDtcbn1cblxuLm1hY3JvLWtjYWxfX3ZhbHVlIHtcbiAgZm9udC1zaXplOiAyMnB4O1xuICBmb250LXdlaWdodDogODAwO1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgbGV0dGVyLXNwYWNpbmc6IC0wLjVweDtcbn1cblxuLm1hY3JvLWtjYWxfX3VuaXQge1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiAjNmI3MjgwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xufVxuXG4uZW1wdHktc3RhdGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgcGFkZGluZzogNjRweCAxNnB4O1xuICBjb2xvcjogIzljYTNhZjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZW1wdHktc3RhdGUgaW9uLWljb24ge1xuICBmb250LXNpemU6IDU2cHg7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG4gIGNvbG9yOiAjMzczNzM3O1xufVxuXG4uZW1wdHktc3RhdGUgcCB7XG4gIGZvbnQtc2l6ZTogMTVweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgbWF4LXdpZHRoOiAyNDBweDtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
}));


/***/ }),

/***/ 52866:
/*!************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/profile/components/configuration/configuration-routing.module.ts ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfigurationPageRoutingModule: () => (/* binding */ ConfigurationPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _configuration_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./configuration.page */ 78404);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _ConfigurationPageRoutingModule;




const routes = [{
  path: '',
  component: _configuration_page__WEBPACK_IMPORTED_MODULE_1__.ConfigurationPage
}, {
  path: 'concepts',
  loadChildren: () => __webpack_require__.e(/*! import() */ "packages_shared-features_src_app_features_profile_components_configuration_components_concept-7c16a5").then(__webpack_require__.bind(__webpack_require__, /*! ./components/concepts/concepts.module */ 37621)).then(m => m.ConceptsPageModule)
}, {
  path: 'suggestions',
  loadChildren: () => __webpack_require__.e(/*! import() */ "packages_shared-features_src_app_features_profile_components_configuration_components_suggest-381941").then(__webpack_require__.bind(__webpack_require__, /*! ./components/suggestions/suggestions.module */ 25961)).then(m => m.SuggestionsPageModule)
}, {
  path: 'references',
  loadChildren: () => __webpack_require__.e(/*! import() */ "packages_shared-features_src_app_features_profile_components_configuration_components_referen-f4705c").then(__webpack_require__.bind(__webpack_require__, /*! ./components/references/references.module */ 10439)).then(m => m.ReferencesPageModule)
}];
class ConfigurationPageRoutingModule {}
_ConfigurationPageRoutingModule = ConfigurationPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ConfigurationPageRoutingModule, "\u0275fac", function ConfigurationPageRoutingModule_Factory(t) {
  return new (t || _ConfigurationPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ConfigurationPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _ConfigurationPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ConfigurationPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ConfigurationPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 87883:
/*!****************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/profile/components/configuration/configuration.module.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfigurationPageModule: () => (/* binding */ ConfigurationPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _configuration_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./configuration-routing.module */ 52866);
/* harmony import */ var _configuration_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./configuration.page */ 78404);
/* harmony import */ var _components_ad_preferences_ad_preferences_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/ad-preferences/ad-preferences.page */ 54456);
/* harmony import */ var _components_editor_editor_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/editor/editor.page */ 61206);
/* harmony import */ var _components_editor_components_nutrition_editor_nutrition_editor_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/editor/components/nutrition-editor/nutrition-editor.page */ 71035);
/* harmony import */ var _components_goal_list_goal_list_page__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/goal-list/goal-list.page */ 89906);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 69717);

var _ConfigurationPageModule;








class ConfigurationPageModule {}
_ConfigurationPageModule = ConfigurationPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ConfigurationPageModule, "\u0275fac", function ConfigurationPageModule_Factory(t) {
  return new (t || _ConfigurationPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ConfigurationPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({
  type: _ConfigurationPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ConfigurationPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _configuration_routing_module__WEBPACK_IMPORTED_MODULE_2__.ConfigurationPageRoutingModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](ConfigurationPageModule, {
    declarations: [_configuration_page__WEBPACK_IMPORTED_MODULE_3__.ConfigurationPage, _components_ad_preferences_ad_preferences_page__WEBPACK_IMPORTED_MODULE_4__.AdPreferencesPage, _components_editor_editor_page__WEBPACK_IMPORTED_MODULE_5__.EditorPage, _components_editor_components_nutrition_editor_nutrition_editor_page__WEBPACK_IMPORTED_MODULE_6__.NutritionEditorPage, _components_goal_list_goal_list_page__WEBPACK_IMPORTED_MODULE_7__.GoalListPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _configuration_routing_module__WEBPACK_IMPORTED_MODULE_2__.ConfigurationPageRoutingModule]
  });
})();

/***/ }),

/***/ 78404:
/*!**************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/profile/components/configuration/configuration.page.ts ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfigurationPage: () => (/* binding */ ConfigurationPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_models_theme__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/models/theme */ 20544);
/* harmony import */ var _components_ad_preferences_ad_preferences_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/ad-preferences/ad-preferences.page */ 54456);
/* harmony import */ var _components_editor_editor_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/editor/editor.page */ 61206);
/* harmony import */ var _components_goal_list_goal_list_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/goal-list/goal-list.page */ 89906);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var src_app_core_services_util_theme_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/util/theme.service */ 18341);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var src_app_core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/services/auth/auth.service */ 74048);
/* harmony import */ var src_app_core_services_coach_coach_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/core/services/coach/coach.service */ 96370);
/* harmony import */ var src_app_core_services_table_table_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/core/services/table/table.service */ 91594);
/* harmony import */ var src_app_core_services_diet_diet_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/core/services/diet/diet.service */ 36752);
/* harmony import */ var src_app_core_services_workout_workout_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/core/services/workout/workout.service */ 76990);
/* harmony import */ var src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/core/services/util/navigation.service */ 22938);
/* harmony import */ var src_app_core_services_util_notification_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/core/services/util/notification.service */ 57507);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var src_app_core_i18n_i18n_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/core/i18n/i18n.service */ 35347);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @ionic/angular */ 54844);


var _ConfigurationPage;





















function ConfigurationPage_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 11)(1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](2, "ion-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](6, "ion-card", 42)(7, "ion-item", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function ConfigurationPage_div_13_Template_ion_item_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r5.openPremiumPage());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](8, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](9, "ion-icon", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](10, "ion-label")(11, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](5, 2, "CONFIGURATION.TRAINFIT_PRO"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](13, 4, "CONFIGURATION.TRAINFIT_PRO"));
  }
}
function ConfigurationPage_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 11)(1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](2, "ion-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](4, "Suscripci\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](5, "ion-card", 42)(6, "ion-item", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function ConfigurationPage_div_14_Template_ion_item_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r7.goToTrainerSubscription());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](7, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](8, "ion-icon", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](9, "ion-label")(10, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](11, "Gestionar suscripci\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()()();
  }
}
function ConfigurationPage_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 11)(1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](2, "ion-icon", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](6, "ion-card", 14)(7, "ion-item", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function ConfigurationPage_div_15_Template_ion_item_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r9.editNutritionalGoals());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](8, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](9, "ion-icon", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](10, "ion-label")(11, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](14, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](15, "ion-item", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function ConfigurationPage_div_15_Template_ion_item_click_15_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r10);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r11.editPersonalData());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](16, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](17, "ion-icon", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](18, "ion-label")(19, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](21, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](22, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](5, 3, "CONFIGURATION.PROFILE_OPTIONS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](13, 5, "CONFIGURATION.NUTRITIONAL_GOALS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](21, 7, "CONFIGURATION.EDIT_PROFILE"));
  }
}
function ConfigurationPage_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 11)(1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](2, "ion-icon", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](6, "ion-card", 14)(7, "ion-item", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function ConfigurationPage_div_16_Template_ion_item_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r13);
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r12.goToAdConsent());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](8, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](9, "ion-icon", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](10, "ion-label")(11, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](5, 2, "CONFIGURATION.PRIVACY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](13, 4, "CONFIGURATION.AD_PREFERENCES"));
  }
}
function ConfigurationPage_div_17_ng_container_18_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](2, "ion-item", 52)(3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](6, "ion-select", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("ngModelChange", function ConfigurationPage_div_17_ng_container_18_ng_container_18_Template_ion_select_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r18.notifWeekday = $event);
    })("ionChange", function ConfigurationPage_div_17_ng_container_18_ng_container_18_Template_ion_select_ionChange_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r19);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r20.onSettingsChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](9, "ion-select-option", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](12, "ion-select-option", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](15, "ion-select-option", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](18, "ion-select-option", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](21, "ion-select-option", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](23, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](24, "ion-select-option", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](26, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](27, "ion-select-option", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](28);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](29, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](5, 18, "NOTIFICATIONS.DAY_OF_WEEK"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpropertyInterpolate"]("okText", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](7, 20, "COMMON.OK"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](8, 22, "COMMON.CANCEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngModel", ctx_r15.notifWeekday);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("value", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](11, 24, "NOTIFICATIONS.SUNDAY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("value", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](14, 26, "NOTIFICATIONS.MONDAY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("value", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](17, 28, "NOTIFICATIONS.TUESDAY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("value", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](20, 30, "NOTIFICATIONS.WEDNESDAY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("value", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](23, 32, "NOTIFICATIONS.THURSDAY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("value", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](26, 34, "NOTIFICATIONS.FRIDAY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("value", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](29, 36, "NOTIFICATIONS.SATURDAY"));
  }
}
const _c0 = function (a0) {
  return {
    days: a0
  };
};
function ConfigurationPage_div_17_ng_container_18_ng_container_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](2, "ion-item", 52)(3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](6, "div", 66)(7, "ion-button", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function ConfigurationPage_div_17_ng_container_18_ng_container_19_Template_ion_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r21.changeInterval(-1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](8, "ion-icon", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](9, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](11, "ion-button", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function ConfigurationPage_div_17_ng_container_18_ng_container_19_Template_ion_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r22);
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r23.changeInterval(1));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](12, "ion-icon", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind2"](5, 2, "NOTIFICATIONS.EVERY_X_DAYS", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpureFunction1"](5, _c0, ctx_r16.notifIntervalDays)));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](ctx_r16.notifIntervalDays);
  }
}
function ConfigurationPage_div_17_ng_container_18_ng_template_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "ion-datetime", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("ngModelChange", function ConfigurationPage_div_17_ng_container_18_ng_template_31_Template_ion_datetime_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r25);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r24.notifTime = $event);
    })("ionChange", function ConfigurationPage_div_17_ng_container_18_ng_template_31_Template_ion_datetime_ionChange_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r25);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r26.onSettingsChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](3, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](4, "ion-icon", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("preferWheel", true)("locale", ctx_r17.locale)("showDefaultButtons", true)("doneText", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](1, 7, "COMMON.OK"))("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](2, 9, "COMMON.CANCEL"))("ngModel", ctx_r17.notifTime);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](7, 11, "NOTIFICATIONS.TIME"));
  }
}
function ConfigurationPage_div_17_ng_container_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](2, "ion-item", 52)(3, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](6, "ion-select", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("ngModelChange", function ConfigurationPage_div_17_ng_container_18_Template_ion_select_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r28);
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r27.notifFrequency = $event);
    })("ionChange", function ConfigurationPage_div_17_ng_container_18_Template_ion_select_ionChange_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r28);
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r29.onSettingsChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](9, "ion-select-option", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](12, "ion-select-option", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](14, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](15, "ion-select-option", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](17, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](18, ConfigurationPage_div_17_ng_container_18_ng_container_18_Template, 30, 38, "ng-container", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](19, ConfigurationPage_div_17_ng_container_18_ng_container_19_Template, 13, 7, "ng-container", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](20, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](21, "ion-item", 52)(22, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](24, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](25, "ion-datetime-button", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](26, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function ConfigurationPage_div_17_ng_container_18_Template_div_click_26_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r28);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r30.openTimePicker());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](27, "ion-icon", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](28, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](30, "ion-modal", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("willPresent", function ConfigurationPage_div_17_ng_container_18_Template_ion_modal_willPresent_30_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r28);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r31.isTimeModalOpen = true);
    })("willDismiss", function ConfigurationPage_div_17_ng_container_18_Template_ion_modal_willDismiss_30_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r28);
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r32.isTimeModalOpen = false);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](31, ConfigurationPage_div_17_ng_container_18_ng_template_31_Template, 8, 13, "ng-template");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](5, 13, "NOTIFICATIONS.FREQUENCY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpropertyInterpolate"]("okText", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](7, 15, "COMMON.OK"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](8, 17, "COMMON.CANCEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngModel", ctx_r14.notifFrequency);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](11, 19, "NOTIFICATIONS.DAILY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](14, 21, "NOTIFICATIONS.WEEKLY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](17, 23, "NOTIFICATIONS.CUSTOM_INTERVAL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r14.notifFrequency === "weekly");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r14.notifFrequency === "interval");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](24, 25, "NOTIFICATIONS.TIME"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](ctx_r14.getNotifTimeDisplay());
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("keepContentsMounted", true)("showBackdrop", true);
  }
}
function ConfigurationPage_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "div", 11)(1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](2, "ion-icon", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](6, "ion-card", 14)(7, "ion-item", 52)(8, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](9, "ion-icon", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](10, "ion-label")(11, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](13, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](14, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](16, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](17, "ion-toggle", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("ngModelChange", function ConfigurationPage_div_17_Template_ion_toggle_ngModelChange_17_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r34);
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r33.notifEnabled = $event);
    })("ionChange", function ConfigurationPage_div_17_Template_ion_toggle_ionChange_17_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵrestoreView"](_r34);
      const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵresetView"](ctx_r35.onToggleReminder());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](18, ConfigurationPage_div_17_ng_container_18_Template, 32, 27, "ng-container", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](5, 5, "NOTIFICATIONS.TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](13, 7, "NOTIFICATIONS.WEIGHT_REMINDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](16, 9, "NOTIFICATIONS.WEIGHT_REMINDER_DESC"));
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngModel", ctx_r4.notifEnabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx_r4.notifEnabled);
  }
}
class ConfigurationPage {
  get locale() {
    return this.currentLang === 'en' ? 'en-US' : 'es-ES';
  }
  constructor(router, userService, themeService, ionicUtilService, authService, coachService, tableService, dietService, workoutService, navigationService, notificationService, translate, i18nService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "userService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "themeService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "authService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "coachService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "tableService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "workoutService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "navigationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "notificationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "translate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "i18nService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "user", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "theme", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isPremium", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "THEMES", src_app_shared_models_theme__WEBPACK_IMPORTED_MODULE_2__.Theme);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "currentLang", 'es');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "notifEnabled", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "notifFrequency", 'daily');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "notifWeekday", 1);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "notifIntervalDays", 2);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "notifTime", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isTimeModalOpen", false);
    // Links constants
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "LINKS", {
      privacyAndPolicy: 'https://trainfit.net/#/politicas',
      us: 'https://trainfit.net/#/SobreNosotros',
      termsAndConditions: 'https://trainfit.net/#/terminosycondiciones'
    });
    this.router = router;
    this.userService = userService;
    this.themeService = themeService;
    this.ionicUtilService = ionicUtilService;
    this.authService = authService;
    this.coachService = coachService;
    this.tableService = tableService;
    this.dietService = dietService;
    this.workoutService = workoutService;
    this.navigationService = navigationService;
    this.notificationService = notificationService;
    this.translate = translate;
    this.i18nService = i18nService;
    this.theme = this.themeService.getTheme;
    this.user = this.userService.getLocalUser;
    this.isPremium = !!this.user?.premium?.entitled;
    this.currentLang = this.i18nService.current;
    void this.loadNotificationSettings();
  }
  loadNotificationSettings() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const settings = yield _this.notificationService.getSettings();
      _this.notifEnabled = settings.enabled;
      _this.notifFrequency = settings.frequency;
      _this.notifWeekday = settings.weekday ?? 1;
      _this.notifIntervalDays = settings.intervalDays ?? 2;
      const date = new Date();
      date.setHours(settings.hour, settings.minute, 0, 0);
      _this.notifTime = date.toISOString();
    })();
  }
  onToggleReminder() {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this2.notifEnabled) {
        const granted = yield _this2.notificationService.requestPermissions();
        if (!granted) {
          _this2.ionicUtilService.showToast({
            message: _this2.translate.instant('NOTIFICATIONS.PERMISSION_DENIED'),
            duration: 2000,
            color: 'warning'
          });
          _this2.notifEnabled = false;
          return;
        }
      }
      yield _this2.saveNotifSettings();
    })();
  }
  onSettingsChange() {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this3.saveNotifSettings();
    })();
  }
  changeInterval(delta) {
    const newVal = this.notifIntervalDays + delta;
    if (newVal >= 1 && newVal <= 60) {
      this.notifIntervalDays = newVal;
      void this.saveNotifSettings();
    }
  }
  openTimePicker() {
    const trigger = document.getElementById('notif-time-trigger');
    if (trigger) {
      trigger.click();
    }
  }
  getNotifTimeDisplay() {
    if (!this.notifTime) return '--:--';
    const date = new Date(this.notifTime);
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  }
  saveNotifSettings() {
    var _this4 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const timeDate = new Date(_this4.notifTime);
      const hour = timeDate.getHours();
      const minute = timeDate.getMinutes();
      yield _this4.notificationService.saveAndSchedule({
        enabled: _this4.notifEnabled,
        hour,
        minute,
        frequency: _this4.notifFrequency,
        weekday: _this4.notifFrequency === 'weekly' ? _this4.notifWeekday : undefined,
        intervalDays: _this4.notifFrequency === 'interval' ? _this4.notifIntervalDays : undefined
      });
    })();
  }
  switchLang(lang) {
    this.i18nService.switchLang(lang);
    this.currentLang = lang;
    this.user.lang = lang;
    this.userService.updateUser(this.user).subscribe(() => {
      this.navigationService.goToUserLoader();
    });
  }
  toggleColor() {
    this.theme = this.theme === this.THEMES.light ? this.THEMES.dark : this.THEMES.light;
    this.themeService.toggleColorMode(this.theme);
    this.user.theme = this.theme;
    this.userService.updateUser(this.user).subscribe(resUser => this.user = resUser);
  }
  logout() {
    const alertOptions = {
      header: this.translate.instant('CONFIGURATION.LOGOUT_HEADER'),
      message: this.translate.instant('CONFIGURATION.LOGOUT_MSG'),
      buttons: [{
        text: this.translate.instant('CONFIGURATION.CANCEL_BTN'),
        role: 'cancel'
      }, {
        text: this.translate.instant('CONFIGURATION.CONFIRM'),
        cssClass: 'alert-button-primary',
        handler: () => {
          this.userService.setLocalUser = null;
          this.workoutService.setCurrentWorkout = null;
          this.dietService.setCurrentDiet = null;
          this.tableService.setCurrentTable = null;
          this.authService.logout();
        }
      }]
    };
    this.ionicUtilService.showAlert(alertOptions);
  }
  goToRestorePassword() {
    this.navigationService.goToRestorePasswordPage();
  }
  // Sin acceso propio en esta pantalla (quitados de "Opciones de perfil").
  // Reubicados como tarjetas siempre visibles en el menú del tab Coach
  // (CoachPage.goToCheckins()/goToNutritionPreferences(), mismas rutas).
  goToMyCheckins() {
    void this.router.navigate(['/my-checkins']);
  }
  goToNutritionPreferences() {
    void this.router.navigate(['/nutrition-preferences']);
  }
  goToTrainerSubscription() {
    void this.router.navigate(['/subscription']);
  }
  goToAdConsent() {
    var _this5 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = {
        component: _components_ad_preferences_ad_preferences_page__WEBPACK_IMPORTED_MODULE_3__.AdPreferencesPage,
        cssClass: 'fullscreen-modal'
      };
      const res = yield _this5.ionicUtilService.showModal(modal);
      if (res?.data === undefined || res?.data === null) return;
      const selectedOption = !!res.data;
      if (_this5.user?.personalAds === selectedOption) return;
      const updatedUser = {
        ..._this5.user,
        personalAds: selectedOption
      };
      _this5.userService.updateUser(updatedUser).subscribe({
        next: userUpdated => {
          _this5.user = userUpdated;
          _this5.ionicUtilService.showToast({
            message: _this5.translate.instant('CONFIGURATION.AD_UPDATED'),
            duration: 1400,
            color: 'success'
          });
        },
        error: () => {
          _this5.ionicUtilService.showToast({
            message: _this5.translate.instant('CONFIGURATION.AD_UPDATE_ERROR'),
            duration: 1600,
            color: 'danger'
          });
        }
      });
    })();
  }
  openTrainers() {
    const header = this.translate.instant('CONFIGURATION.TRAINER_MODE_HEADER');
    const message = this.translate.instant('CONFIGURATION.TRAINER_MODE_MSG');
    const buttons = [{
      text: 'OK',
      cssClass: 'alert-button-primary'
    }];
    const alertOptions = {
      header: header,
      message: message,
      buttons: buttons
    };
    this.ionicUtilService.showAlert(alertOptions);
  }
  deleteAccount() {
    // Cuentas sociales (Google/Apple) no tienen contraseña propia que verificar.
    if (this.user?.provider) {
      this.confirmDeleteAccountWithoutPassword();
      return;
    }
    const alertOptions = {
      header: this.translate.instant('CONFIGURATION.DELETE_HEADER'),
      message: this.translate.instant('CONFIGURATION.DELETE_MSG'),
      inputs: [{
        name: 'password',
        type: 'password',
        placeholder: this.translate.instant('CONFIGURATION.DELETE_PASSWORD_PLACEHOLDER')
      }],
      buttons: [{
        text: this.translate.instant('CONFIGURATION.CANCEL_BTN'),
        role: 'cancel'
      }, {
        text: this.translate.instant('CONFIGURATION.DELETE_BTN'),
        role: 'destructive',
        handler: data => {
          if (!data?.password) {
            this.ionicUtilService.showToast({
              message: this.translate.instant('CONFIGURATION.DELETE_PASSWORD_REQUIRED'),
              duration: 2000,
              color: 'warning'
            });
            return false;
          }
          return true;
        }
      }]
    };
    this.ionicUtilService.showAlert(alertOptions).then(result => {
      if (result.role === 'cancel') return;
      const password = result.data?.values?.password;
      if (!password) return;
      this.userService.verifyPassword(password).subscribe({
        next: () => this.performAccountDeletion(),
        error: () => {
          this.ionicUtilService.showToast({
            message: this.translate.instant('CONFIGURATION.DELETE_PASSWORD_INCORRECT'),
            duration: 2500,
            color: 'danger'
          });
        }
      });
    });
  }
  confirmDeleteAccountWithoutPassword() {
    // Cuentas Google/Apple no tienen contraseña propia que pedir: en su lugar,
    // se exige escribir la palabra de confirmación tal cual.
    const confirmWord = this.translate.instant('CONFIGURATION.DELETE_CONFIRM_WORD');
    const alertOptions = {
      header: this.translate.instant('CONFIGURATION.DELETE_HEADER'),
      message: this.translate.instant('CONFIGURATION.DELETE_MSG_SOCIAL', {
        word: confirmWord.toUpperCase()
      }),
      inputs: [{
        name: 'confirmWord',
        type: 'text',
        placeholder: confirmWord.toUpperCase()
      }],
      buttons: [{
        text: this.translate.instant('CONFIGURATION.CANCEL_BTN'),
        role: 'cancel'
      }, {
        text: this.translate.instant('CONFIGURATION.DELETE_BTN'),
        role: 'destructive',
        handler: data => {
          const typed = (data?.confirmWord || '').trim().toLowerCase();
          if (typed !== confirmWord.trim().toLowerCase()) {
            this.ionicUtilService.showToast({
              message: this.translate.instant('CONFIGURATION.DELETE_CONFIRM_WORD_MISMATCH', {
                word: confirmWord.toUpperCase()
              }),
              duration: 2200,
              color: 'warning'
            });
            return false;
          }
          this.performAccountDeletion();
          return true;
        }
      }]
    };
    this.ionicUtilService.showAlert(alertOptions);
  }
  performAccountDeletion() {
    this.userService.deleteById(this.user._id).subscribe({
      next: () => {
        this.userService.setLocalUser = null;
        this.workoutService.setCurrentWorkout = null;
        this.dietService.setCurrentDiet = null;
        this.tableService.setCurrentTable = null;
        this.authService.logout();
      },
      error: error => {
        console.error('[ConfigurationPage] Error deleting account:', error);
        this.ionicUtilService.showErrorToast(error, this.translate.instant('CONFIGURATION.DELETE_ERROR'));
      }
    });
  }
  close() {
    this.navigationService.goBack();
  }
  editNutritionalGoals() {
    var _this6 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const user = _this6.userService.getLocalUser;
      if (!user?._id) return;
      const modal = {
        component: _components_goal_list_goal_list_page__WEBPACK_IMPORTED_MODULE_5__.GoalListPage,
        cssClass: 'fullscreen-modal'
      };
      yield _this6.ionicUtilService.showModal(modal);
    })();
  }
  editPersonalData() {
    const modal = {
      component: _components_editor_editor_page__WEBPACK_IMPORTED_MODULE_4__.EditorPage
    };
    this.ionicUtilService.showModal(modal);
  }
  openConcepts() {
    this.navigationService.gotoConcepts();
  }
  openSuggestions() {
    this.navigationService.goToSuggestions();
  }
  openReferences() {
    this.navigationService.goToReferences();
  }
  openPremiumPage() {
    this.navigationService.goToPremium();
  }
}
_ConfigurationPage = ConfigurationPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ConfigurationPage, "\u0275fac", function ConfigurationPage_Factory(t) {
  return new (t || _ConfigurationPage)(_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_18__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_6__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](src_app_core_services_util_theme_service__WEBPACK_IMPORTED_MODULE_7__.ThemeService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_8__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](src_app_core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_9__.AuthService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](src_app_core_services_coach_coach_service__WEBPACK_IMPORTED_MODULE_10__.CoachService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](src_app_core_services_table_table_service__WEBPACK_IMPORTED_MODULE_11__.TableService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](src_app_core_services_diet_diet_service__WEBPACK_IMPORTED_MODULE_12__.DietService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](src_app_core_services_workout_workout_service__WEBPACK_IMPORTED_MODULE_13__.WorkoutService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_14__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](src_app_core_services_util_notification_service__WEBPACK_IMPORTED_MODULE_15__.NotificationService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdirectiveInject"](src_app_core_i18n_i18n_service__WEBPACK_IMPORTED_MODULE_16__.I18nService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ConfigurationPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineComponent"]({
  type: _ConfigurationPage,
  selectors: [["app-configuration"]],
  decls: 137,
  vars: 63,
  consts: [[1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], [1, "tf-page-header__back-button", 3, "click"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "configuration-content"], [1, "config-sections"], ["class", "section-group", 4, "ngIf"], [1, "section-group"], [1, "section-header"], ["name", "help-circle-outline"], [1, "config-card"], ["button", "", 1, "config-item", 3, "click"], ["slot", "start", 1, "item-icon-container", "help-icon"], ["name", "library-outline", "color", "tertiary"], [1, "divider"], ["name", "mail-open-outline", "color", "tertiary"], ["name", "language-outline"], ["button", "", 1, "config-item", 3, "disabled", "click"], ["slot", "start", 1, "item-icon-container", "profile-icon"], ["name", "checkbox-outline", 3, "color"], ["name", "document-text-outline"], ["button", "", 1, "config-item", 3, "href"], ["slot", "start", 1, "item-icon-container", "legal-icon"], ["name", "file-tray-full-outline", "color", "medium"], ["name", "people-outline", "color", "medium"], ["name", "information-circle-outline", "color", "medium"], ["name", "link-outline", "color", "medium"], ["name", "shield-checkmark-outline"], ["slot", "start", 1, "item-icon-container", "security-icon"], ["name", "key-outline", "color", "medium"], ["name", "person-outline"], ["button", "", 1, "config-item", "logout-item", 3, "click"], ["slot", "start", 1, "item-icon-container", "logout-icon"], ["name", "log-out-outline", "color", "medium"], ["button", "", 1, "config-item", "danger-item", 3, "click"], ["slot", "start", 1, "item-icon-container", "danger-icon"], ["name", "trash-outline", "color", "danger"], ["name", "diamond-outline"], [1, "config-card", "config-card--premium"], ["slot", "start", 1, "item-icon-container", "premium-icon"], ["name", "diamond-outline", "color", "warning"], ["name", "settings-outline"], ["name", "restaurant-outline", "color", "secondary"], ["name", "person-outline", "color", "secondary"], ["name", "eye-outline"], ["slot", "start", 1, "item-icon-container", "privacy-icon"], ["name", "pricetags-outline", "color", "tertiary"], ["name", "alarm-outline"], [1, "config-item"], ["slot", "start", 1, "item-icon-container", "reminder-icon"], ["name", "scale-outline", "color", "warning"], ["slot", "end", 3, "ngModel", "ngModelChange", "ionChange"], [4, "ngIf"], ["interface", "popover", 3, "ngModel", "okText", "cancelText", "ngModelChange", "ionChange"], ["value", "daily"], ["value", "weekly"], ["value", "interval"], ["id", "notif-time-trigger", "datetime", "notif-datetime", "slot", "end", 1, "hidden-datetime-button"], [1, "time-display", 3, "click"], ["name", "time-outline"], ["trigger", "notif-time-trigger", 1, "time-datetime-modal", 3, "keepContentsMounted", "showBackdrop", "willPresent", "willDismiss"], [3, "value"], ["slot", "end", 1, "stepper", 2, "display", "flex", "align-items", "center", "gap", "8px"], ["fill", "clear", "size", "small", 3, "click"], ["name", "remove-outline"], [2, "min-width", "24px", "text-align", "center"], ["name", "add-outline"], ["id", "notif-datetime", "mode", "ios", "presentation", "time", 3, "preferWheel", "locale", "showDefaultButtons", "doneText", "cancelText", "ngModel", "ngModelChange", "ionChange"], ["slot", "title", 1, "datetime-title"]],
  template: function ConfigurationPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](0, "ion-header")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function ConfigurationPage_Template_button_click_4_listener() {
        return ctx.close();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](5, "ion-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](6, "div", 5)(7, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](9, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](10, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](11, "ion-content", 8)(12, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](13, ConfigurationPage_div_13_Template, 14, 6, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](14, ConfigurationPage_div_14_Template, 12, 0, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](15, ConfigurationPage_div_15_Template, 23, 9, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](16, ConfigurationPage_div_16_Template, 14, 6, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtemplate"](17, ConfigurationPage_div_17_Template, 19, 11, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](18, "div", 11)(19, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](20, "ion-icon", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](21, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](22);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](23, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](24, "ion-card", 14)(25, "ion-item", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function ConfigurationPage_Template_ion_item_click_25_listener() {
        return ctx.openConcepts();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](26, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](27, "ion-icon", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](28, "ion-label")(29, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](30);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](31, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](32, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](33, "ion-item", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function ConfigurationPage_Template_ion_item_click_33_listener() {
        return ctx.openSuggestions();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](34, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](35, "ion-icon", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](36, "ion-label")(37, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](38);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](39, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](40, "div", 11)(41, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](42, "ion-icon", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](43, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](44);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](45, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](46, "ion-card", 14)(47, "ion-item", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function ConfigurationPage_Template_ion_item_click_47_listener() {
        return ctx.switchLang("es");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](48, "div", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](49, "ion-icon", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](50, "ion-label")(51, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](52);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](53, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](54, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](55, "ion-item", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function ConfigurationPage_Template_ion_item_click_55_listener() {
        return ctx.switchLang("en");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](56, "div", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](57, "ion-icon", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](58, "ion-label")(59, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](60);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](61, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](62, "div", 11)(63, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](64, "ion-icon", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](65, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](66);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](67, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](68, "ion-card", 14)(69, "ion-item", 25)(70, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](71, "ion-icon", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](72, "ion-label")(73, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](74);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](75, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](76, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](77, "ion-item", 25)(78, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](79, "ion-icon", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](80, "ion-label")(81, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](82);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](83, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](84, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](85, "ion-item", 25)(86, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](87, "ion-icon", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](88, "ion-label")(89, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](90);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](91, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](92, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](93, "ion-item", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function ConfigurationPage_Template_ion_item_click_93_listener() {
        return ctx.openReferences();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](94, "div", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](95, "ion-icon", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](96, "ion-label")(97, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](98);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](99, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](100, "div", 11)(101, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](102, "ion-icon", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](103, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](104);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](105, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](106, "ion-card", 14)(107, "ion-item", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function ConfigurationPage_Template_ion_item_click_107_listener() {
        return ctx.goToRestorePassword();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](108, "div", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](109, "ion-icon", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](110, "ion-label")(111, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](112);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](113, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](114, "div", 11)(115, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](116, "ion-icon", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](117, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](118);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](119, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](120, "ion-card", 14)(121, "ion-item", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function ConfigurationPage_Template_ion_item_click_121_listener() {
        return ctx.logout();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](122, "div", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](123, "ion-icon", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](124, "ion-label")(125, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](126);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](127, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](128, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](129, "ion-item", 38);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵlistener"]("click", function ConfigurationPage_Template_ion_item_click_129_listener() {
        return ctx.deleteAccount();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](130, "div", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](131, "ion-icon", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementStart"](132, "ion-label")(133, "h3");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtext"](134);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipe"](135, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵelement"](136, "ion-footer");
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](9, 29, "CONFIGURATION.TITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", !(ctx.user == null ? null : ctx.user.roles == null ? null : ctx.user.roles.includes("trainer")) && (ctx.isPremium || !ctx.coachService.hasActiveTrainer()));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", ctx.user == null ? null : ctx.user.roles == null ? null : ctx.user.roles.includes("trainer"));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", !(ctx.user == null ? null : ctx.user.roles == null ? null : ctx.user.roles.includes("trainer")));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", !(ctx.user == null ? null : ctx.user.roles == null ? null : ctx.user.roles.includes("trainer")) && !ctx.coachService.hasActiveTrainer());
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("ngIf", !(ctx.user == null ? null : ctx.user.roles == null ? null : ctx.user.roles.includes("trainer")));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](23, 31, "CONFIGURATION.HELP_RESOURCES"));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](31, 33, "CONFIGURATION.DICTIONARY"));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](39, 35, "CONFIGURATION.SUGGESTIONS"));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](45, 37, "CONFIGURATION.LANGUAGE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("disabled", ctx.currentLang === "es");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("color", ctx.currentLang === "es" ? "primary" : "medium");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](53, 39, "LANGUAGES.SPANISH"));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("disabled", ctx.currentLang === "en");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("color", ctx.currentLang === "en" ? "primary" : "medium");
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](61, 41, "LANGUAGES.ENGLISH"));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](67, 43, "CONFIGURATION.LEGAL_INFO"));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("href", ctx.LINKS.privacyAndPolicy);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](75, 45, "CONFIGURATION.PRIVACY_POLICY"));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("href", ctx.LINKS.us);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](83, 47, "CONFIGURATION.ABOUT_US"));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵproperty"]("href", ctx.LINKS.termsAndConditions);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](91, 49, "CONFIGURATION.TERMS"));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](99, 51, "CONFIGURATION.REFERENCES"));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](105, 53, "CONFIGURATION.SECURITY"));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](113, 55, "CONFIGURATION.CHANGE_PASSWORD"));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](119, 57, "CONFIGURATION.ACCOUNT"));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](127, 59, "CONFIGURATION.LOGOUT"));
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵpipeBind1"](135, 61, "CONFIGURATION.DELETE_ACCOUNT"));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonCard, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonDatetime, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonDatetimeButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonSelect, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonSelectOption, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonToggle, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.IonModal, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.BooleanValueAccessor, _ionic_angular__WEBPACK_IMPORTED_MODULE_22__.SelectValueAccessor, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslatePipe],
  styles: [".configuration-content[_ngcontent-%COMP%] {\n  --background: var(--ion-color-light);\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%] {\n  padding: 0 16px 24px;\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  display: flex;\n  align-items: center;\n  margin-bottom: 12px;\n  padding: 0 4px;\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--ion-color-primary);\n  margin-right: 8px;\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .section-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 600;\n  color: #8b8b8b;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card--premium[_ngcontent-%COMP%] {\n  border: 1px solid rgba(254, 144, 0, 0.45);\n  box-shadow: 0 2px 16px rgba(254, 144, 0, 0.12);\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%] {\n  margin: 0;\n  border-radius: 16px;\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);\n  overflow: hidden;\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%] {\n  --padding-start: 20px;\n  --padding-end: 20px;\n  --min-height: 72px;\n  --border-radius: 0;\n  --background: var(--ion-card-background);\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  margin-right: 16px;\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.theme-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-warning-rgb), 0.1);\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.security-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-medium-rgb), 0.1);\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.privacy-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-tertiary-rgb), 0.1);\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.logout-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-medium-rgb), 0.1);\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.danger-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-danger-rgb), 0.1);\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.profile-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-secondary-rgb), 0.1);\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.help-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-tertiary-rgb), 0.1);\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.legal-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-medium-rgb), 0.1);\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.premium-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-warning-rgb), 0.12);\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.reminder-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-warning-rgb), 0.12);\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 16px;\n  font-weight: 600;\n  color: var(--ion-text-color);\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 14px;\n  color: var(--ion-color-medium);\n  line-height: 1.4;\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .chevron-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--ion-color-medium);\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item.theme-item[_ngcontent-%COMP%]   ion-toggle[_ngcontent-%COMP%] {\n  --handle-background: var(--ion-color-light);\n  --handle-background-checked: var(--ion-color-primary-contrast);\n  --background: var(--ion-color-medium);\n  --background-checked: var(--ion-color-primary);\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item.danger-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: var(--ion-color-danger);\n}\n.configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%] {\n  margin: 0 20px;\n  border-top: 1px solid var(--ion-color-light-shade);\n  opacity: 0.6;\n}\n\n.premium-card[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.premium-card[_ngcontent-%COMP%]   .premium-status[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n  padding: 12px;\n  border-radius: 12px;\n  background: rgba(var(--ion-color-warning-rgb), 0.12);\n  margin-bottom: 12px;\n}\n.premium-card[_ngcontent-%COMP%]   .premium-status[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: var(--ion-color-warning);\n  margin-top: 2px;\n}\n.premium-card[_ngcontent-%COMP%]   .premium-status[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 15px;\n  font-weight: 700;\n}\n.premium-card[_ngcontent-%COMP%]   .premium-status[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 4px 0 0 0;\n  font-size: 13px;\n  color: var(--ion-color-medium);\n}\n.premium-card[_ngcontent-%COMP%]   .premium-status.is-premium[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-success-rgb), 0.12);\n}\n.premium-card[_ngcontent-%COMP%]   .premium-status.is-premium[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--ion-color-success);\n}\n.premium-card[_ngcontent-%COMP%]   .premium-plans[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 10px;\n  margin-bottom: 12px;\n}\n.premium-card[_ngcontent-%COMP%]   .premium-plans[_ngcontent-%COMP%]   .plan-btn[_ngcontent-%COMP%] {\n  border: 1px solid var(--ion-color-step-200);\n  border-radius: 12px;\n  background: var(--ion-color-light);\n  color: var(--ion-text-color);\n  padding: 12px;\n  text-align: left;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  font-size: 14px;\n  font-weight: 600;\n}\n.premium-card[_ngcontent-%COMP%]   .premium-plans[_ngcontent-%COMP%]   .plan-btn--featured[_ngcontent-%COMP%] {\n  border-color: rgba(var(--ion-color-primary-rgb), 0.5);\n  background: rgba(var(--ion-color-primary-rgb), 0.08);\n}\n.premium-card[_ngcontent-%COMP%]   .premium-actions[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  margin: 6px 0;\n}\n\nbody[color-theme=dark][_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%] {\n  --background: var(--ion-background-color);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%] {\n  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.2);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.theme-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-primary-rgb), 0.2);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.security-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-medium-rgb), 0.2);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.privacy-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-tertiary-rgb), 0.2);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.logout-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-medium-rgb), 0.2);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.danger-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-danger-rgb), 0.2);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.profile-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-secondary-rgb), 0.2);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.help-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-tertiary-rgb), 0.2);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.legal-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-medium-rgb), 0.2);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.premium-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-warning-rgb), 0.22);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container.reminder-icon[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-warning-rgb), 0.22);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .divider[_ngcontent-%COMP%] {\n  border-top-color: var(--ion-color-step-200);\n}\n\n@media (max-width: 768px) {\n  .configuration-content[_ngcontent-%COMP%]   .user-profile-section[_ngcontent-%COMP%] {\n    padding: 20px 16px;\n  }\n  .configuration-content[_ngcontent-%COMP%]   .user-profile-section[_ngcontent-%COMP%]   .user-avatar[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 56px;\n  }\n  .configuration-content[_ngcontent-%COMP%]   .user-profile-section[_ngcontent-%COMP%]   .user-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    font-size: 22px;\n  }\n  .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%] {\n    padding: 0 12px 20px;\n  }\n  .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%] {\n    --min-height: 64px;\n    --padding-start: 16px;\n    --padding-end: 16px;\n  }\n  .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container[_ngcontent-%COMP%] {\n    width: 40px;\n    height: 40px;\n    margin-right: 12px;\n  }\n  .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 20px;\n  }\n}\n@media (min-width: 820px) {\n  .config-sections[_ngcontent-%COMP%] {\n    max-width: 1100px;\n    margin: 0 auto;\n    padding: 0 24px 32px;\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n    align-items: start;\n    gap: 24px 28px;\n  }\n  .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%] {\n    margin-bottom: 0;\n  }\n}\n@media (prefers-contrast: high) {\n  .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%] {\n    border: 2px solid var(--ion-color-medium);\n  }\n  .configuration-content[_ngcontent-%COMP%]   .config-sections[_ngcontent-%COMP%]   .section-group[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .config-item[_ngcontent-%COMP%]   .item-icon-container[_ngcontent-%COMP%] {\n    border: 1px solid var(--ion-color-medium);\n  }\n}\nion-modal.time-datetime-modal[_ngcontent-%COMP%] {\n  --width: min(420px, 92vw);\n  --height: auto;\n  --max-height: 78vh;\n  --border-radius: 22px;\n  --backdrop-opacity: 0.58;\n  --box-shadow: 0 24px 48px rgba(0, 0, 0, 0.45);\n}\n\nion-modal.time-datetime-modal[_ngcontent-%COMP%]::part(content) {\n  border-radius: 22px;\n  border: 1px solid rgba(254, 144, 0, 0.25);\n  background: #121212;\n  overflow: hidden;\n}\n\nion-modal.time-datetime-modal[_ngcontent-%COMP%]   ion-datetime[_ngcontent-%COMP%] {\n  --background: transparent;\n  --color: #f4f4f5;\n  --title-color: #f4f4f5;\n  --wheel-highlight-background: rgba(254, 144, 0, 0.18);\n  --wheel-fade-background-rgb: 18, 18, 18;\n  --wheel-highlight-border-radius: 14px;\n  padding: 14px 14px 12px;\n}\n\nion-modal.time-datetime-modal[_ngcontent-%COMP%]   .datetime-title[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 10px;\n  padding: 6px 10px;\n  border-radius: 12px;\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid rgba(254, 144, 0, 0.2);\n}\n\nion-modal.time-datetime-modal[_ngcontent-%COMP%]   .datetime-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], ion-modal.time-datetime-modal[_ngcontent-%COMP%]   .datetime-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #fe9000;\n  text-shadow: none;\n}\n\nion-modal.time-datetime-modal[_ngcontent-%COMP%]   .datetime-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  font-size: 16px;\n  border-radius: 8px;\n  background: rgba(254, 144, 0, 0.18);\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\nion-modal.time-datetime-modal[_ngcontent-%COMP%]   .datetime-title[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  letter-spacing: 0.2px;\n}\n\nion-modal.time-datetime-modal[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --border-radius: 10px;\n}\n\n.hidden-datetime-button[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.time-display[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 14px;\n  border-radius: 12px;\n  background: rgba(254, 144, 0, 0.12);\n  border: 1px solid rgba(254, 144, 0, 0.25);\n  cursor: pointer;\n  transition: background 0.2s ease;\n}\n.time-display[_ngcontent-%COMP%]:active {\n  background: rgba(254, 144, 0, 0.22);\n}\n.time-display[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: #fe9000;\n}\n.time-display[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: #fe9000;\n  letter-spacing: 0.5px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL3Byb2ZpbGUvY29tcG9uZW50cy9jb25maWd1cmF0aW9uL2NvbmZpZ3VyYXRpb24ucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0Usb0NBQUE7QUFBRjtBQUVFO0VBQ0Usb0JBQUE7QUFBSjtBQUVJO0VBQ0UsbUJBQUE7QUFBTjtBQUVNO0VBQ0UsZ0JBQUE7RUFFQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7QUFEUjtBQUdRO0VBQ0UsZUFBQTtFQUNBLCtCQUFBO0VBQ0EsaUJBQUE7QUFEVjtBQUlRO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7QUFGVjtBQU1NO0VBQ0UseUNBQUE7RUFDQSw4Q0FBQTtBQUpSO0FBT007RUFDRSxTQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQ0FBQTtFQUNBLGdCQUFBO0FBTFI7QUFPUTtFQUNFLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esd0NBQUE7QUFMVjtBQU9VO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7QUFMWjtBQU9ZO0VBQ0UsZUFBQTtBQUxkO0FBUVk7RUFDRSxtREFBQTtBQU5kO0FBU1k7RUFDRSxrREFBQTtBQVBkO0FBVVk7RUFDRSxvREFBQTtBQVJkO0FBV1k7RUFDRSxrREFBQTtBQVRkO0FBWVk7RUFDRSxrREFBQTtBQVZkO0FBYVk7RUFDRSxxREFBQTtBQVhkO0FBY1k7RUFDRSxvREFBQTtBQVpkO0FBZVk7RUFDRSxrREFBQTtBQWJkO0FBZ0JZO0VBQ0Usb0RBQUE7QUFkZDtBQWlCWTtFQUNFLG9EQUFBO0FBZmQ7QUFvQlk7RUFDRSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0FBbEJkO0FBcUJZO0VBQ0UsU0FBQTtFQUNBLGVBQUE7RUFDQSw4QkFBQTtFQUNBLGdCQUFBO0FBbkJkO0FBdUJVO0VBQ0UsZUFBQTtFQUNBLDhCQUFBO0FBckJaO0FBeUJZO0VBQ0UsMkNBQUE7RUFDQSw4REFBQTtFQUNBLHFDQUFBO0VBQ0EsOENBQUE7QUF2QmQ7QUE0Qlk7RUFDRSw4QkFBQTtBQTFCZDtBQStCUTtFQUNFLGNBQUE7RUFDQSxrREFBQTtFQUNBLFlBQUE7QUE3QlY7O0FBb0NBO0VBQ0UsYUFBQTtBQWpDRjtBQW1DRTtFQUNFLGFBQUE7RUFDQSxTQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxvREFBQTtFQUNBLG1CQUFBO0FBakNKO0FBbUNJO0VBQ0UsZUFBQTtFQUNBLCtCQUFBO0VBQ0EsZUFBQTtBQWpDTjtBQW9DSTtFQUNFLFNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUFsQ047QUFxQ0k7RUFDRSxpQkFBQTtFQUNBLGVBQUE7RUFDQSw4QkFBQTtBQW5DTjtBQXNDSTtFQUNFLG9EQUFBO0FBcENOO0FBc0NNO0VBQ0UsK0JBQUE7QUFwQ1I7QUF5Q0U7RUFDRSxhQUFBO0VBQ0EsMEJBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7QUF2Q0o7QUF5Q0k7RUFDRSwyQ0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0NBQUE7RUFDQSw0QkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBdkNOO0FBMENJO0VBQ0UscURBQUE7RUFDQSxvREFBQTtBQXhDTjtBQTZDSTtFQUNFLGFBQUE7QUEzQ047O0FBa0RFO0VBQ0UseUNBQUE7QUEvQ0o7QUFtRFE7RUFDRSx5Q0FBQTtBQWpEVjtBQW9EWTtFQUNFLG1EQUFBO0FBbERkO0FBcURZO0VBQ0Usa0RBQUE7QUFuRGQ7QUFzRFk7RUFDRSxvREFBQTtBQXBEZDtBQXVEWTtFQUNFLGtEQUFBO0FBckRkO0FBd0RZO0VBQ0Usa0RBQUE7QUF0RGQ7QUF5RFk7RUFDRSxxREFBQTtBQXZEZDtBQTBEWTtFQUNFLG9EQUFBO0FBeERkO0FBMkRZO0VBQ0Usa0RBQUE7QUF6RGQ7QUE0RFk7RUFDRSxvREFBQTtBQTFEZDtBQTZEWTtFQUNFLG9EQUFBO0FBM0RkO0FBK0RVO0VBQ0UsMkNBQUE7QUE3RFo7O0FBc0VBO0VBRUk7SUFDRSxrQkFBQTtFQXBFSjtFQXNFSTtJQUNFLGVBQUE7RUFwRU47RUF1RUk7SUFDRSxlQUFBO0VBckVOO0VBeUVFO0lBQ0Usb0JBQUE7RUF2RUo7RUF5RUk7SUFDRSxrQkFBQTtJQUNBLHFCQUFBO0lBQ0EsbUJBQUE7RUF2RU47RUF5RU07SUFDRSxXQUFBO0lBQ0EsWUFBQTtJQUNBLGtCQUFBO0VBdkVSO0VBeUVRO0lBQ0UsZUFBQTtFQXZFVjtBQUNGO0FBMkZBO0VBQ0U7SUFDRSxpQkFBQTtJQUNBLGNBQUE7SUFDQSxvQkFBQTtJQUNBLGFBQUE7SUFDQSwyREFBQTtJQUNBLGtCQUFBO0lBQ0EsY0FBQTtFQXpGRjtFQTJGRTtJQUNFLGdCQUFBO0VBekZKO0FBQ0Y7QUE4RkE7RUFFSTtJQUNFLHlDQUFBO0VBN0ZKO0VBK0ZJO0lBQ0UseUNBQUE7RUE3Rk47QUFDRjtBQWtHQTtFQUNFLHlCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSx3QkFBQTtFQUNBLDZDQUFBO0FBaEdGOztBQW1HQTtFQUNFLG1CQUFBO0VBQ0EseUNBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FBaEdGOztBQW1HQTtFQUNFLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLHFEQUFBO0VBQ0EsdUNBQUE7RUFDQSxxQ0FBQTtFQUNBLHVCQUFBO0FBaEdGOztBQW1HQTtFQUNFLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHFDQUFBO0VBQ0Esd0NBQUE7QUFoR0Y7O0FBbUdBOztFQUVFLGNBQUE7RUFDQSxpQkFBQTtBQWhHRjs7QUFtR0E7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLG1DQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0FBaEdGOztBQW1HQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0FBaEdGOztBQW1HQTtFQUNFLHFCQUFBO0FBaEdGOztBQW1HQTtFQUNFLGFBQUE7QUFoR0Y7O0FBbUdBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQ0FBQTtFQUNBLHlDQUFBO0VBQ0EsZUFBQTtFQUNBLGdDQUFBO0FBaEdGO0FBa0dFO0VBQ0UsbUNBQUE7QUFoR0o7QUFtR0U7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBQWpHSjtBQW9HRTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtBQWxHSiIsInNvdXJjZXNDb250ZW50IjpbIi8vIENvbmZpZ3VyYXRpb24gUGFnZSBTdHlsZXNcbi5jb25maWd1cmF0aW9uLWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG5cbiAgLmNvbmZpZy1zZWN0aW9ucyB7XG4gICAgcGFkZGluZzogMCAxNnB4IDI0cHg7XG5cbiAgICAuc2VjdGlvbi1ncm91cCB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuXG4gICAgICAuc2VjdGlvbi1oZWFkZXIge1xuICAgICAgICBtYXJnaW4tdG9wOiAxMnB4O1xuXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG4gICAgICAgIHBhZGRpbmc6IDAgNHB4O1xuXG4gICAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDhweDtcbiAgICAgICAgfVxuXG4gICAgICAgIHNwYW4ge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICAgIGNvbG9yOiAjOGI4YjhiO1xuICAgICAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC5jb25maWctY2FyZC0tcHJlbWl1bSB7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU0LCAxNDQsIDAsIDAuNDUpO1xuICAgICAgICBib3gtc2hhZG93OiAwIDJweCAxNnB4IHJnYmEoMjU0LCAxNDQsIDAsIDAuMTIpO1xuICAgICAgfVxuXG4gICAgICAuY29uZmlnLWNhcmQge1xuICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMnB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjA4KTtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAgICAgICAuY29uZmlnLWl0ZW0ge1xuICAgICAgICAgIC0tcGFkZGluZy1zdGFydDogMjBweDtcbiAgICAgICAgICAtLXBhZGRpbmctZW5kOiAyMHB4O1xuICAgICAgICAgIC0tbWluLWhlaWdodDogNzJweDtcbiAgICAgICAgICAtLWJvcmRlci1yYWRpdXM6IDA7XG4gICAgICAgICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY2FyZC1iYWNrZ3JvdW5kKTtcblxuICAgICAgICAgIC5pdGVtLWljb24tY29udGFpbmVyIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgICAgICB3aWR0aDogNDRweDtcbiAgICAgICAgICAgIGhlaWdodDogNDRweDtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDE2cHg7XG5cbiAgICAgICAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAyNHB4O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmLnRoZW1lLWljb24ge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci13YXJuaW5nLXJnYiksIDAuMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICYuc2VjdXJpdHktaWNvbiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLW1lZGl1bS1yZ2IpLCAwLjEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmLnByaXZhY3ktaWNvbiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYiksIDAuMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICYubG9nb3V0LWljb24ge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1tZWRpdW0tcmdiKSwgMC4xKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJi5kYW5nZXItaWNvbiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmLnByb2ZpbGUtaWNvbiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2IpLCAwLjEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmLmhlbHAtaWNvbiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYiksIDAuMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICYubGVnYWwtaWNvbiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLW1lZGl1bS1yZ2IpLCAwLjEpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmLnByZW1pdW0taWNvbiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXdhcm5pbmctcmdiKSwgMC4xMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICYucmVtaW5kZXItaWNvbiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXdhcm5pbmctcmdiKSwgMC4xMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaW9uLWxhYmVsIHtcbiAgICAgICAgICAgIGgzIHtcbiAgICAgICAgICAgICAgbWFyZ2luOiAwIDAgNHB4IDA7XG4gICAgICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgICAgICAgY29sb3I6IHZhcigtLWlvbi10ZXh0LWNvbG9yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcCB7XG4gICAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmNoZXZyb24taWNvbiB7XG4gICAgICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJi50aGVtZS1pdGVtIHtcbiAgICAgICAgICAgIGlvbi10b2dnbGUge1xuICAgICAgICAgICAgICAtLWhhbmRsZS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgICAgICAgICAgICAtLWhhbmRsZS1iYWNrZ3JvdW5kLWNoZWNrZWQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcbiAgICAgICAgICAgICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICAgICAgICAgLS1iYWNrZ3JvdW5kLWNoZWNrZWQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAmLmRhbmdlci1pdGVtIHtcbiAgICAgICAgICAgIGlvbi1sYWJlbCBoMyB7XG4gICAgICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFuZ2VyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAuZGl2aWRlciB7XG4gICAgICAgICAgbWFyZ2luOiAwIDIwcHg7XG4gICAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1saWdodC1zaGFkZSk7XG4gICAgICAgICAgb3BhY2l0eTogMC42O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi5wcmVtaXVtLWNhcmQge1xuICBwYWRkaW5nOiAxNnB4O1xuXG4gIC5wcmVtaXVtLXN0YXR1cyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBnYXA6IDEycHg7XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgcGFkZGluZzogMTJweDtcbiAgICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXdhcm5pbmctcmdiKSwgMC4xMik7XG4gICAgbWFyZ2luLWJvdHRvbTogMTJweDtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itd2FybmluZyk7XG4gICAgICBtYXJnaW4tdG9wOiAycHg7XG4gICAgfVxuXG4gICAgaDMge1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgZm9udC1zaXplOiAxNXB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICB9XG5cbiAgICBwIHtcbiAgICAgIG1hcmdpbjogNHB4IDAgMCAwO1xuICAgICAgZm9udC1zaXplOiAxM3B4O1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIH1cblxuICAgICYuaXMtcHJlbWl1bSB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1zdWNjZXNzLXJnYiksIDAuMTIpO1xuXG4gICAgICBpb24taWNvbiB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLnByZW1pdW0tcGxhbnMge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gICAgZ2FwOiAxMHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG5cbiAgICAucGxhbi1idG4ge1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLXN0ZXAtMjAwKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi10ZXh0LWNvbG9yKTtcbiAgICAgIHBhZGRpbmc6IDEycHg7XG4gICAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgIH1cblxuICAgIC5wbGFuLWJ0bi0tZmVhdHVyZWQge1xuICAgICAgYm9yZGVyLWNvbG9yOiByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuNSk7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMDgpO1xuICAgIH1cbiAgfVxuXG4gIC5wcmVtaXVtLWFjdGlvbnMge1xuICAgIGlvbi1idXR0b24ge1xuICAgICAgbWFyZ2luOiA2cHggMDtcbiAgICB9XG4gIH1cbn1cblxuLy8gRGFyayBUaGVtZSBTcGVjaWZpYyBTdHlsZXNcbmJvZHlbY29sb3ItdGhlbWU9XCJkYXJrXCJdIHtcbiAgLmNvbmZpZ3VyYXRpb24tY29udGVudCB7XG4gICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tYmFja2dyb3VuZC1jb2xvcik7XG5cbiAgICAuY29uZmlnLXNlY3Rpb25zIHtcbiAgICAgIC5zZWN0aW9uLWdyb3VwIHtcbiAgICAgICAgLmNvbmZpZy1jYXJkIHtcbiAgICAgICAgICBib3gtc2hhZG93OiAwIDJweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcblxuICAgICAgICAgIC5jb25maWctaXRlbSAuaXRlbS1pY29uLWNvbnRhaW5lciB7XG4gICAgICAgICAgICAmLnRoZW1lLWljb24ge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICYuc2VjdXJpdHktaWNvbiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLW1lZGl1bS1yZ2IpLCAwLjIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmLnByaXZhY3ktaWNvbiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYiksIDAuMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICYubG9nb3V0LWljb24ge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1tZWRpdW0tcmdiKSwgMC4yKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgJi5kYW5nZXItaWNvbiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmLnByb2ZpbGUtaWNvbiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeS1yZ2IpLCAwLjIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmLmhlbHAtaWNvbiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5LXJnYiksIDAuMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICYubGVnYWwtaWNvbiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLW1lZGl1bS1yZ2IpLCAwLjIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmLnByZW1pdW0taWNvbiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXdhcm5pbmctcmdiKSwgMC4yMik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICYucmVtaW5kZXItaWNvbiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXdhcm5pbmctcmdiKSwgMC4yMik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLmRpdmlkZXIge1xuICAgICAgICAgICAgYm9yZGVyLXRvcC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXN0ZXAtMjAwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gUmVzcG9uc2l2ZSBEZXNpZ25cbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAuY29uZmlndXJhdGlvbi1jb250ZW50IHtcbiAgICAudXNlci1wcm9maWxlLXNlY3Rpb24ge1xuICAgICAgcGFkZGluZzogMjBweCAxNnB4O1xuXG4gICAgICAudXNlci1hdmF0YXIgaW9uLWljb24ge1xuICAgICAgICBmb250LXNpemU6IDU2cHg7XG4gICAgICB9XG5cbiAgICAgIC51c2VyLWluZm8gaDIge1xuICAgICAgICBmb250LXNpemU6IDIycHg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmNvbmZpZy1zZWN0aW9ucyB7XG4gICAgICBwYWRkaW5nOiAwIDEycHggMjBweDtcblxuICAgICAgLnNlY3Rpb24tZ3JvdXAgLmNvbmZpZy1jYXJkIC5jb25maWctaXRlbSB7XG4gICAgICAgIC0tbWluLWhlaWdodDogNjRweDtcbiAgICAgICAgLS1wYWRkaW5nLXN0YXJ0OiAxNnB4O1xuICAgICAgICAtLXBhZGRpbmctZW5kOiAxNnB4O1xuXG4gICAgICAgIC5pdGVtLWljb24tY29udGFpbmVyIHtcbiAgICAgICAgICB3aWR0aDogNDBweDtcbiAgICAgICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICAgICAgbWFyZ2luLXJpZ2h0OiAxMnB4O1xuXG4gICAgICAgICAgaW9uLWljb24ge1xuICAgICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBFc2NyaXRvcmlvOiBjYWRhIHNlY2Npw4PCs24gKFN1c2NyaXBjacODwrNuLCBBeXVkYSB5IHJlY3Vyc29zLCBJZGlvbWEuLi4pIGVzXG4vLyBzdSBwcm9waWEgY29sdW1uYSDDosKAwpQgdMODwq10dWxvIGFycmliYSwgb3BjaW9uZXMgZGViYWpvIMOiwoDClCB5IGxhcyBjb2x1bW5hcyBzZVxuLy8gcmVwYXJ0ZW4gZWwgYW5jaG8gZGlzcG9uaWJsZTsgbGFzIHF1ZSBubyBjYWJlbiBlbiBsYSBmaWxhIHBhc2FuIGEgbGFcbi8vIHNpZ3VpZW50ZS4gYXV0by1maXQgZGVjaWRlIGN1w4PCoW50YXMgY2FiZW4gKDIgZW4gcGFudGFsbGFzIG1lZGlhbmFzLCAzKyBlblxuLy8gbXV5IGFuY2hhcykgZW4gdmV6IGRlIGZvcnphciBzaWVtcHJlIDIuXG4vL1xuLy8gR3JpZCByZWFsLCBubyBtYXNvbnJ5OiBjb21vIGNhZGEgZmlsYSBpZ3VhbGEgc3UgYWx0dXJhIGEgbGEgc2VjY2nDg8KzbiBtw4PCoXNcbi8vIGFsdGEgZGUgZXNhIGZpbGEsIHVuYSBzZWNjacODwrNuIGNvcnRhIHB1ZWRlIGRlamFyIGFsZ28gZGUgaHVlY28gZGViYWpvXG4vLyBhbnRlcyBkZSBxdWUgZW1waWVjZSBsYSBzaWd1aWVudGUgZmlsYSBzaSBzdSBwYXJlamEgZGUgZmlsYSBlcyBtw4PCoXNcbi8vIGFsdGEgw6LCgMKUIGNvbXBvcnRhbWllbnRvIGVzdMODwqFuZGFyIGRlIGN1YWxxdWllciBncmlkIGRlIHRhcmpldGFzIChtYXNvbnJ5XG4vLyBzaW4gSlMgc2UgcHJvYsODwrMgeSBubyBlcyBmaWFibGUgZGVudHJvIGRlIHVuIGlvbi1jb250ZW50IHJlYWwpLiBhbGlnbi1cbi8vIGl0ZW1zOiBzdGFydCBldml0YSBxdWUgbGEgc2VjY2nDg8KzbiBjb3J0YSBzZSBFU1RJUkUgcGFyYSByZWxsZW5hciBlc2Vcbi8vIGh1ZWNvIChpc3N1ZSBkaXN0aW50bywgc8ODwq0gc29sdWNpb25hYmxlKSwgbm8gZXZpdGEgZWwgaHVlY28gZW4gc8ODwq0uXG5AbWVkaWEgKG1pbi13aWR0aDogODIwcHgpIHtcbiAgLmNvbmZpZy1zZWN0aW9ucyB7XG4gICAgbWF4LXdpZHRoOiAxMTAwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgcGFkZGluZzogMCAyNHB4IDMycHg7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDI4MHB4LCAxZnIpKTtcbiAgICBhbGlnbi1pdGVtczogc3RhcnQ7XG4gICAgZ2FwOiAyNHB4IDI4cHg7XG5cbiAgICAuc2VjdGlvbi1ncm91cCB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIH1cbiAgfVxufVxuXG4vLyBIaWdoIGNvbnRyYXN0IG1vZGUgc3VwcG9ydFxuQG1lZGlhIChwcmVmZXJzLWNvbnRyYXN0OiBoaWdoKSB7XG4gIC5jb25maWd1cmF0aW9uLWNvbnRlbnQge1xuICAgIC5jb25maWctc2VjdGlvbnMgLnNlY3Rpb24tZ3JvdXAgLmNvbmZpZy1jYXJkIHtcbiAgICAgIGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuXG4gICAgICAuY29uZmlnLWl0ZW0gLml0ZW0taWNvbi1jb250YWluZXIge1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuaW9uLW1vZGFsLnRpbWUtZGF0ZXRpbWUtbW9kYWwge1xuICAtLXdpZHRoOiBtaW4oNDIwcHgsIDkydncpO1xuICAtLWhlaWdodDogYXV0bztcbiAgLS1tYXgtaGVpZ2h0OiA3OHZoO1xuICAtLWJvcmRlci1yYWRpdXM6IDIycHg7XG4gIC0tYmFja2Ryb3Atb3BhY2l0eTogMC41ODtcbiAgLS1ib3gtc2hhZG93OiAwIDI0cHggNDhweCByZ2JhKDAsIDAsIDAsIDAuNDUpO1xufVxuXG5pb24tbW9kYWwudGltZS1kYXRldGltZS1tb2RhbDo6cGFydChjb250ZW50KSB7XG4gIGJvcmRlci1yYWRpdXM6IDIycHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU0LCAxNDQsIDAsIDAuMjUpO1xuICBiYWNrZ3JvdW5kOiAjMTIxMjEyO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG5pb24tbW9kYWwudGltZS1kYXRldGltZS1tb2RhbCBpb24tZGF0ZXRpbWUge1xuICAtLWJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAtLWNvbG9yOiAjZjRmNGY1O1xuICAtLXRpdGxlLWNvbG9yOiAjZjRmNGY1O1xuICAtLXdoZWVsLWhpZ2hsaWdodC1iYWNrZ3JvdW5kOiByZ2JhKDI1NCwgMTQ0LCAwLCAwLjE4KTtcbiAgLS13aGVlbC1mYWRlLWJhY2tncm91bmQtcmdiOiAxOCwgMTgsIDE4O1xuICAtLXdoZWVsLWhpZ2hsaWdodC1ib3JkZXItcmFkaXVzOiAxNHB4O1xuICBwYWRkaW5nOiAxNHB4IDE0cHggMTJweDtcbn1cblxuaW9uLW1vZGFsLnRpbWUtZGF0ZXRpbWUtbW9kYWwgLmRhdGV0aW1lLXRpdGxlIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgcGFkZGluZzogNnB4IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU0LCAxNDQsIDAsIDAuMik7XG59XG5cbmlvbi1tb2RhbC50aW1lLWRhdGV0aW1lLW1vZGFsIC5kYXRldGltZS10aXRsZSBzcGFuLFxuaW9uLW1vZGFsLnRpbWUtZGF0ZXRpbWUtbW9kYWwgLmRhdGV0aW1lLXRpdGxlIGlvbi1pY29uIHtcbiAgY29sb3I6ICNmZTkwMDA7XG4gIHRleHQtc2hhZG93OiBub25lO1xufVxuXG5pb24tbW9kYWwudGltZS1kYXRldGltZS1tb2RhbCAuZGF0ZXRpbWUtdGl0bGUgaW9uLWljb24ge1xuICB3aWR0aDogMjRweDtcbiAgaGVpZ2h0OiAyNHB4O1xuICBmb250LXNpemU6IDE2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTQsIDE0NCwgMCwgMC4xOCk7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuaW9uLW1vZGFsLnRpbWUtZGF0ZXRpbWUtbW9kYWwgLmRhdGV0aW1lLXRpdGxlIHNwYW4ge1xuICBmb250LXNpemU6IDE1cHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxldHRlci1zcGFjaW5nOiAwLjJweDtcbn1cblxuaW9uLW1vZGFsLnRpbWUtZGF0ZXRpbWUtbW9kYWwgaW9uLWJ1dHRvbiB7XG4gIC0tYm9yZGVyLXJhZGl1czogMTBweDtcbn1cblxuLmhpZGRlbi1kYXRldGltZS1idXR0b24ge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4udGltZS1kaXNwbGF5IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIHBhZGRpbmc6IDhweCAxNHB4O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NCwgMTQ0LCAwLCAwLjEyKTtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTQsIDE0NCwgMCwgMC4yNSk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjJzIGVhc2U7XG5cbiAgJjphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU0LCAxNDQsIDAsIDAuMjIpO1xuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBjb2xvcjogI2ZlOTAwMDtcbiAgfVxuXG4gIHNwYW4ge1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGNvbG9yOiAjZmU5MDAwO1xuICAgIGxldHRlci1zcGFjaW5nOiAwLjVweDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
}));


/***/ })

}]);
//# sourceMappingURL=packages_shared-features_src_app_features_profile_components_configuration_configuration_module_ts.js.map