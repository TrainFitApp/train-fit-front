"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["packages_shared-features_src_app_features_profile_components_configuration_components_referen-f4705c"],{

/***/ 10439:
/*!***********************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/profile/components/configuration/components/references/references.module.ts ***!
  \***********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReferencesPageModule: () => (/* binding */ ReferencesPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _references_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./references.page */ 86080);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);

var _ReferencesPageModule;





const routes = [{
  path: '',
  component: _references_page__WEBPACK_IMPORTED_MODULE_2__.ReferencesPage
}];
class ReferencesPageModule {}
_ReferencesPageModule = ReferencesPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ReferencesPageModule, "\u0275fac", function ReferencesPageModule_Factory(t) {
  return new (t || _ReferencesPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ReferencesPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _ReferencesPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ReferencesPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ReferencesPageModule, {
    declarations: [_references_page__WEBPACK_IMPORTED_MODULE_2__.ReferencesPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ }),

/***/ 86080:
/*!*********************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/profile/components/configuration/components/references/references.page.ts ***!
  \*********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ReferencesPage: () => (/* binding */ ReferencesPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/util/navigation.service */ 22938);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngx-translate/core */ 647);

var _ReferencesPage;




class ReferencesPage {
  constructor(navigationService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "navigationService", void 0);
    this.navigationService = navigationService;
  }
  goBack() {
    this.navigationService.goBack();
  }
}
_ReferencesPage = ReferencesPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ReferencesPage, "\u0275fac", function ReferencesPage_Factory(t) {
  return new (t || _ReferencesPage)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_1__.NavigationService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ReferencesPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
  type: _ReferencesPage,
  selectors: [["app-references"]],
  decls: 61,
  vars: 30,
  consts: [[1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], [1, "tf-page-header__back-button", 3, "click"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [3, "innerHTML"], ["lines", "none"], ["name", "checkmark-circle", "slot", "start", "color", "success"], ["href", "https://estilosdevidasaludable.sanidad.gob.es/alimentacionSaludable/home.htm", "target", "_blank"], ["href", "https://www.aesan.gob.es/AECOSAN/web/nutricion/seccion/estrategia_naos.htm", "target", "_blank"], ["href", "https://www.who.int/es/news-room/fact-sheets/detail/healthy-diet", "target", "_blank"], ["href", "https://www.fen.org.es/storage/app/media/imgPublicaciones/2018/libro-la-alimentacion-espanola.pdf", "target", "_blank"]],
  template: function ReferencesPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "ion-header")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ReferencesPage_Template_button_click_4_listener() {
        return ctx.goBack();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "ion-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 5)(7, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](9, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "ion-content")(12, "ion-list")(13, "ion-card")(14, "ion-card-header")(15, "ion-card-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](17, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "ion-card-subtitle");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](20, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "ion-card-content");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](22, "p", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](23, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "ion-list")(25, "ion-item", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](26, "ion-icon", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](29, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "a", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, " estilosdevidasaludable.sanidad.gob.es ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "ion-item", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](33, "ion-icon", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](34, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](35);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](36, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](37, "a", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, " aesan.gob.es ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](39, "ion-item", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](40, "ion-icon", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](41, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](42);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](43, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](44, "a", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](45, " who.int ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](46, "ion-item", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](47, "ion-icon", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](48, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](49);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](50, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](51, "a", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](52, " fen.org.es ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](53, "ion-card")(54, "ion-card-header")(55, "ion-card-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](56);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](57, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](58, "ion-card-content");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](59, "p", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](60, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](9, 10, "REFERENCES.TITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](17, 12, "REFERENCES.SOURCES_TITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](20, 14, "REFERENCES.SOURCES_SUBTITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](23, 16, "REFERENCES.DESCRIPTION"), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](29, 18, "REFERENCES.MINISTERIO"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](36, 20, "REFERENCES.NAOS"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](43, 22, "REFERENCES.OMS"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](50, 24, "REFERENCES.FEN"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](57, 26, "REFERENCES.NOTE_TITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("innerHTML", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](60, 28, "REFERENCES.NOTE_TEXT"), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeHtml"]);
    }
  },
  dependencies: [_ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonCard, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonCardContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonCardHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonCardSubtitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonCardTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonList, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_4__.TranslatePipe],
  styles: ["/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZVJvb3QiOiIifQ== */"]
}));


/***/ })

}]);
//# sourceMappingURL=packages_shared-features_src_app_features_profile_components_configuration_components_referen-f4705c.js.map