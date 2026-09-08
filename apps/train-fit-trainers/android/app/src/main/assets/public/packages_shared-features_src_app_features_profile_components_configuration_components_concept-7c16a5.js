"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["packages_shared-features_src_app_features_profile_components_configuration_components_concept-7c16a5"],{

/***/ 37621:
/*!*******************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/profile/components/configuration/components/concepts/concepts.module.ts ***!
  \*******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConceptsPageModule: () => (/* binding */ ConceptsPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _concepts_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./concepts.page */ 95342);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);

var _ConceptsPageModule;





const routes = [{
  path: '',
  component: _concepts_page__WEBPACK_IMPORTED_MODULE_2__.ConceptsPage
}];
class ConceptsPageModule {}
_ConceptsPageModule = ConceptsPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ConceptsPageModule, "\u0275fac", function ConceptsPageModule_Factory(t) {
  return new (t || _ConceptsPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ConceptsPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _ConceptsPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ConceptsPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes)]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ConceptsPageModule, {
    declarations: [_concepts_page__WEBPACK_IMPORTED_MODULE_2__.ConceptsPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ }),

/***/ 95342:
/*!*****************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/profile/components/configuration/components/concepts/concepts.page.ts ***!
  \*****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConceptsPage: () => (/* binding */ ConceptsPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _constants_concepts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants/concepts */ 12765);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/util/navigation.service */ 22938);
/* harmony import */ var src_app_core_services_util_util_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/util/util.service */ 35400);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _shared_ui_src_app_shared_pipes_translate_db_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../../../../shared-ui/src/app/shared/pipes/translate-db.pipe */ 36191);

var _ConceptsPage;








function ConceptsPage_div_11_ng_container_1_ion_card_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-card", 19)(1, "div", 20)(2, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](3, "ion-icon", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "h3", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "p", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](9, "translateDb");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "span", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const concept_r6 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("concept-icon-badge--nutrition", concept_r6.type === ctx_r5.CONCEPT_TYPES.nutrition)("concept-icon-badge--training", concept_r6.type === ctx_r5.CONCEPT_TYPES.training);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("name", concept_r6.type === ctx_r5.CONCEPT_TYPES.nutrition ? "nutrition-outline" : "barbell-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](6, 8, "CONCEPTS." + concept_r6.key));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](9, 10, concept_r6.description));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r5.getTypeLabel(concept_r6.type));
  }
}
function ConceptsPage_div_11_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 14)(2, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](6, ConceptsPage_div_11_ng_container_1_ion_card_6_Template, 12, 12, "ion-card", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const group_r4 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](group_r4.letter);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", group_r4.items)("ngForTrackBy", ctx_r3.trackByKey);
  }
}
function ConceptsPage_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, ConceptsPage_div_11_ng_container_1_Template, 7, 3, "ng-container", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r0.groups)("ngForTrackBy", ctx_r0.trackByLetter);
  }
}
function ConceptsPage_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 26)(1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "ion-icon", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](5, 2, "CONCEPTS.NO_RESULTS_TITLE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 4, "CONCEPTS.NO_RESULTS_TEXT"));
  }
}
function removeAccents(str) {
  return str.normalize('NFD').replace(/[̀-ͯ]/g, '');
}
class ConceptsPage {
  constructor(navigationService, utilService, translate) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "navigationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "utilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "translate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "search", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "CONCEPT_VALUES", [..._constants_concepts__WEBPACK_IMPORTED_MODULE_1__.CONCEPT_VALUES]);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "CONCEPT_TYPES", _constants_concepts__WEBPACK_IMPORTED_MODULE_1__.CONCEPT_TYPES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "groups", []);
    this.navigationService = navigationService;
    this.utilService = utilService;
    this.translate = translate;
    this.sortConceptsAlphabetically(this.CONCEPT_VALUES);
    this.buildGroups();
  }
  closeModal() {
    this.navigationService.goBack();
  }
  getTypeLabel(type) {
    if (type === _constants_concepts__WEBPACK_IMPORTED_MODULE_1__.CONCEPT_TYPES.nutrition) return this.translate.instant('CONCEPTS.NUTRITION');
    if (type === _constants_concepts__WEBPACK_IMPORTED_MODULE_1__.CONCEPT_TYPES.training) return this.translate.instant('CONCEPTS.TRAINING');
    return this.translate.instant('CONCEPTS.GENERAL');
  }
  trackByLetter(_index, group) {
    return group.letter;
  }
  trackByKey(_index, concept) {
    return concept.key;
  }
  sortConceptsAlphabetically(concepts) {
    concepts.sort((a, b) => a.name.localeCompare(b.name));
  }
  buildGroups() {
    const map = new Map();
    for (const concept of this.CONCEPT_VALUES) {
      const letter = removeAccents(concept.name.charAt(0).toUpperCase());
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter).push(concept);
    }
    this.groups = Array.from(map.entries()).map(([letter, items]) => ({
      letter,
      items
    }));
  }
  searchConcepts(event) {
    this.search = this.utilService.getEventString(event);
    const query = removeAccents(this.search.toLowerCase());
    this.CONCEPT_VALUES = _constants_concepts__WEBPACK_IMPORTED_MODULE_1__.CONCEPTS.filter(concept => {
      const nameMatch = removeAccents(concept.name.toLowerCase()).includes(query);
      const descriptionMatch = removeAccents(concept.description.toLowerCase()).includes(query);
      return nameMatch || descriptionMatch;
    });
    this.sortConceptsAlphabetically(this.CONCEPT_VALUES);
    this.buildGroups();
  }
}
_ConceptsPage = ConceptsPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ConceptsPage, "\u0275fac", function ConceptsPage_Factory(t) {
  return new (t || _ConceptsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_2__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_core_services_util_util_service__WEBPACK_IMPORTED_MODULE_3__.UtilService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ConceptsPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: _ConceptsPage,
  selectors: [["app-concepts"]],
  decls: 14,
  vars: 5,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["type", "button", "aria-label", "Volver", 1, "tf-page-header__back-button", 3, "click"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section", "concepts-search-section"], ["debounce", "400", "mode", "ios", 1, "concepts-searchbar", 3, "placeholder", "ionInput"], [1, "tf-page-header__actions"], [1, "concepts-content"], ["class", "concepts-container", 4, "ngIf", "ngIfElse"], ["noResults", ""], [1, "concepts-container"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "group-header"], [1, "group-letter"], [1, "group-rule"], [1, "concepts-grid"], ["class", "concept-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "concept-card"], [1, "concept-header"], [1, "concept-icon-badge"], [3, "name"], [1, "concept-title"], [1, "concept-description"], [1, "concept-type-label"], [1, "no-results"], [1, "no-results-icon-wrap"], ["name", "search-outline", 1, "no-results-icon"]],
  template: function ConceptsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function ConceptsPage_Template_button_click_4_listener() {
        return ctx.closeModal();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "ion-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 6)(7, "ion-searchbar", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ionInput", function ConceptsPage_Template_ion_searchbar_ionInput_7_listener($event) {
        return ctx.searchConcepts($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "ion-content", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](11, ConceptsPage_div_11_Template, 2, 2, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](12, ConceptsPage_ng_template_12_Template, 9, 6, "ng-template", null, 11, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 3, "CONCEPTS.SEARCH_PLACEHOLDER"));
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.groups.length > 0)("ngIfElse", _r1);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonCard, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonSearchbar, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.TextValueAccessor, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe, _shared_ui_src_app_shared_pipes_translate_db_pipe__WEBPACK_IMPORTED_MODULE_4__.TranslateDbPipe],
  styles: [".concepts-search-section[_ngcontent-%COMP%] {\n  min-width: 0;\n}\n\n.concepts-searchbar[_ngcontent-%COMP%] {\n  --background: rgba(255, 255, 255, 0.05);\n  --border-radius: 8px;\n  --box-shadow: none;\n  --color: rgba(255, 255, 255, 0.9);\n  --placeholder-color: rgba(255, 255, 255, 0.5);\n  --icon-color: rgba(255, 255, 255, 0.7);\n  --clear-button-color: rgba(255, 255, 255, 0.7);\n  --padding-top: 0;\n  --padding-bottom: 0;\n  margin: 0;\n  padding: 0;\n}\n.concepts-searchbar.searchbar-has-focus[_ngcontent-%COMP%] {\n  --background: rgba(255, 255, 255, 0.08);\n}\n\n.concepts-content[_ngcontent-%COMP%] {\n  --background: #141414;\n  background: #141414;\n}\n\n.concepts-content[_ngcontent-%COMP%]::part(background) {\n  background: #141414;\n}\n\n.concepts-container[_ngcontent-%COMP%] {\n  padding: 8px 20px 40px;\n  max-width: 1080px;\n  margin: 0 auto;\n}\n\n.group-header[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 2;\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 14px 2px 10px;\n  background: linear-gradient(#141414 72%, transparent);\n}\n\n.group-letter[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 700;\n  letter-spacing: 0.1em;\n  color: rgba(255, 255, 255, 0.45);\n}\n\n.group-rule[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 1px;\n  background: rgba(255, 255, 255, 0.08);\n}\n\n.concepts-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));\n  gap: 10px;\n  margin-bottom: 22px;\n}\n@media (max-width: 640px) {\n  .concepts-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n.concept-card[_ngcontent-%COMP%] {\n  --background: rgba(255, 255, 255, 0.03);\n  margin: 0;\n  padding: 14px 16px 16px;\n  border-radius: 14px;\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  box-shadow: none;\n  transition: border-color 180ms ease, background-color 180ms ease, transform 120ms ease;\n}\n.concept-card[_ngcontent-%COMP%]:hover {\n  --background: rgba(255, 255, 255, 0.045);\n  border-color: rgba(255, 255, 255, 0.16);\n}\n.concept-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n\n.concept-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  margin-bottom: 8px;\n}\n\n.concept-icon-badge[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 28px;\n  height: 28px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.06);\n  color: rgba(255, 255, 255, 0.5);\n}\n.concept-icon-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n.concept-icon-badge--nutrition[_ngcontent-%COMP%] {\n  background: rgba(52, 199, 89, 0.12);\n  color: #34c759;\n}\n.concept-icon-badge--training[_ngcontent-%COMP%] {\n  background: rgba(254, 144, 0, 0.14);\n  color: var(--ion-color-primary);\n}\n\n.concept-title[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  margin: 3px 0 0;\n  font-size: 0.98rem;\n  font-weight: 650;\n  letter-spacing: -0.01em;\n  line-height: 1.3;\n  color: #ffffff;\n}\n\n.concept-description[_ngcontent-%COMP%] {\n  margin: 0 0 10px;\n  font-size: 0.86rem;\n  line-height: 1.55;\n  color: rgba(255, 255, 255, 0.6);\n}\n\n.concept-type-label[_ngcontent-%COMP%] {\n  display: inline-block;\n  font-size: 0.7rem;\n  font-weight: 600;\n  letter-spacing: 0.02em;\n  color: rgba(255, 255, 255, 0.48);\n}\n\n.no-results[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 88px 32px 0;\n  text-align: center;\n}\n.no-results[_ngcontent-%COMP%]   .no-results-icon-wrap[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: rgba(255, 255, 255, 0.05);\n  margin-bottom: 18px;\n}\n.no-results[_ngcontent-%COMP%]   .no-results-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  color: rgba(255, 255, 255, 0.4);\n}\n.no-results[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #ffffff;\n  font-weight: 650;\n  margin: 0 0 6px;\n  font-size: 1.05rem;\n}\n.no-results[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.5);\n  margin: 0;\n  font-size: 0.88rem;\n  max-width: 32ch;\n}\n\n@media (max-width: 768px) {\n  .concepts-container[_ngcontent-%COMP%] {\n    padding: 4px 16px 32px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL3Byb2ZpbGUvY29tcG9uZW50cy9jb25maWd1cmF0aW9uL2NvbXBvbmVudHMvY29uY2VwdHMvY29uY2VwdHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBO0VBQ0UsWUFBQTtBQUZGOztBQUtBO0VBQ0UsdUNBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUNBQUE7RUFDQSw2Q0FBQTtFQUNBLHNDQUFBO0VBQ0EsOENBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLFVBQUE7QUFGRjtBQUlFO0VBQ0UsdUNBQUE7QUFGSjs7QUFNQTtFQUNFLHFCQUFBO0VBQ0EsbUJBQUE7QUFIRjs7QUFNQTtFQUNFLG1CQUFBO0FBSEY7O0FBTUE7RUFDRSxzQkFBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtBQUhGOztBQVFBO0VBQ0UsZ0JBQUE7RUFDQSxNQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxzQkFBQTtFQUNBLHFEQUFBO0FBTEY7O0FBUUE7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxnQ0FBQTtBQUxGOztBQVFBO0VBQ0UsT0FBQTtFQUNBLFdBQUE7RUFDQSxxQ0FBQTtBQUxGOztBQVFBO0VBQ0UsYUFBQTtFQUNBLDREQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0FBTEY7QUFPRTtFQU5GO0lBT0ksMEJBQUE7RUFKRjtBQUNGOztBQVNBO0VBQ0UsdUNBQUE7RUFDQSxTQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtFQUNBLDJDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzRkFBQTtBQU5GO0FBUUU7RUFDRSx3Q0FBQTtFQUNBLHVDQUFBO0FBTko7QUFTRTtFQUNFLHNCQUFBO0FBUEo7O0FBV0E7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7QUFSRjs7QUFhQTtFQUNFLGNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxxQ0FBQTtFQUNBLCtCQUFBO0FBVkY7QUFZRTtFQUNFLGVBQUE7QUFWSjtBQWFFO0VBQ0UsbUNBQUE7RUFDQSxjQUFBO0FBWEo7QUFjRTtFQUNFLG1DQUFBO0VBQ0EsK0JBQUE7QUFaSjs7QUFnQkE7RUFDRSxPQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFiRjs7QUFnQkE7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSwrQkFBQTtBQWJGOztBQWdCQTtFQUNFLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0NBQUE7QUFiRjs7QUFpQkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esb0JBQUE7RUFDQSxrQkFBQTtBQWRGO0FBZ0JFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EscUNBQUE7RUFDQSxtQkFBQTtBQWRKO0FBaUJFO0VBQ0UsZUFBQTtFQUNBLCtCQUFBO0FBZko7QUFrQkU7RUFDRSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFoQko7QUFtQkU7RUFDRSwrQkFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUFqQko7O0FBc0JBO0VBQ0U7SUFDRSxzQkFBQTtFQW5CRjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSGVhZGVyOiByZXV0aWxpemEgLnRmLXBhZ2UtaGVhZGVyIChwYWNrYWdlcy9zaGFyZWQtdGhlbWUvc3JjL2dsb2JhbC5zY3NzLFxuLy8gY29tcGFydGlkbyBwb3IgbGFzIDMgYXBwcykgZW4gdmV6IGRlIGR1cGxpY2FyIHN1cyBlc3RpbG9zIGxvY2FsbWVudGUgw6LCgMKUXG4vLyBzb2xvIHNlIGHDg8KxYWRlIGVsIGh1ZWNvIHBhcmEgZWwgYnVzY2Fkb3IsIHF1ZSBhcXXDg8KtIHN1c3RpdHV5ZSBhbCB0w4PCrXR1bG8uXG4uY29uY2VwdHMtc2VhcmNoLXNlY3Rpb24ge1xuICBtaW4td2lkdGg6IDA7XG59XG5cbi5jb25jZXB0cy1zZWFyY2hiYXIge1xuICAtLWJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XG4gIC0tYm9yZGVyLXJhZGl1czogOHB4O1xuICAtLWJveC1zaGFkb3c6IG5vbmU7XG4gIC0tY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcbiAgLS1wbGFjZWhvbGRlci1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xuICAtLWljb24tY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcbiAgLS1jbGVhci1idXR0b24tY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcbiAgLS1wYWRkaW5nLXRvcDogMDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMDtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuXG4gICYuc2VhcmNoYmFyLWhhcy1mb2N1cyB7XG4gICAgLS1iYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDgpO1xuICB9XG59XG5cbi5jb25jZXB0cy1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiAjMTQxNDE0O1xuICBiYWNrZ3JvdW5kOiAjMTQxNDE0O1xufVxuXG4uY29uY2VwdHMtY29udGVudDo6cGFydChiYWNrZ3JvdW5kKSB7XG4gIGJhY2tncm91bmQ6ICMxNDE0MTQ7XG59XG5cbi5jb25jZXB0cy1jb250YWluZXIge1xuICBwYWRkaW5nOiA4cHggMjBweCA0MHB4O1xuICBtYXgtd2lkdGg6IDEwODBweDtcbiAgbWFyZ2luOiAwIGF1dG87XG59XG5cbi8vIENhYmVjZXJhIGRlIGdydXBvIGFsZmFiw4PCqXRpY28gw6LCgMKUIGZpamEgYXJyaWJhIG1pZW50cmFzIHNlIGhhY2Ugc2Nyb2xsLCBjb24gdW5cbi8vIGRlc3ZhbmVjaWRvIGRldHLDg8KhcyBwYXJhIHF1ZSBlbCBjb250ZW5pZG8gbm8gcXVlZGUgcGVnYWRvIGFsIGJvcmRlLlxuLmdyb3VwLWhlYWRlciB7XG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIHRvcDogMDtcbiAgei1pbmRleDogMjtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxNHB4IDJweCAxMHB4O1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoIzE0MTQxNCA3MiUsIHRyYW5zcGFyZW50KTtcbn1cblxuLmdyb3VwLWxldHRlciB7XG4gIGZvbnQtc2l6ZTogMC43MnJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMWVtO1xuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQ1KTtcbn1cblxuLmdyb3VwLXJ1bGUge1xuICBmbGV4OiAxO1xuICBoZWlnaHQ6IDFweDtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4KTtcbn1cblxuLmNvbmNlcHRzLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgzMDBweCwgMWZyKSk7XG4gIGdhcDogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMjJweDtcblxuICBAbWVkaWEgKG1heC13aWR0aDogNjQwcHgpIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxufVxuXG4vLyBDYXJkOiB1bmEgw4PCum5pY2EgY2FwYSBkZSBwcm9mdW5kaWRhZCAoYm9yZGUsIHNpbiBzb21icmEpIHBhcmEgcXVlIG5vIGxlYVxuLy8gY29tbyBcImdob3N0IGNhcmRcIiDDosKAwpQgY29oZXJlbnRlIGNvbiBlbCByZXN0byBkZSBsaXN0YWRvcyBkZSBsYSBhcHAuXG4uY29uY2VwdC1jYXJkIHtcbiAgLS1iYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDE0cHggMTZweCAxNnB4O1xuICBib3JkZXItcmFkaXVzOiAxNHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDgpO1xuICBib3gtc2hhZG93OiBub25lO1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMTgwbXMgZWFzZSwgYmFja2dyb3VuZC1jb2xvciAxODBtcyBlYXNlLCB0cmFuc2Zvcm0gMTIwbXMgZWFzZTtcblxuICAmOmhvdmVyIHtcbiAgICAtLWJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNDUpO1xuICAgIGJvcmRlci1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE2KTtcbiAgfVxuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTgpO1xuICB9XG59XG5cbi5jb25jZXB0LWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBnYXA6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbn1cblxuLy8gRWwgdGlwbyBzZSBtYXJjYSBjb24gZWwgaWNvbm8sIG5vIGNvbiB1biBib3JkZSBkZSBjb2xvciBsYXRlcmFsIMOiwoDClCBldml0YVxuLy8gZHVwbGljYXIgbGEgc2XDg8KxYWwgKHlhIGVzdMODwqEgZW4gbGEgZXRpcXVldGEgZGUgYWJham8pIGNvbiBtw4PCoXMgcnVpZG8gdmlzdWFsLlxuLmNvbmNlcHQtaWNvbi1iYWRnZSB7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICB3aWR0aDogMjhweDtcbiAgaGVpZ2h0OiAyOHB4O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDYpO1xuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDE1cHg7XG4gIH1cblxuICAmLS1udXRyaXRpb24ge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoNTIsIDE5OSwgODksIDAuMTIpO1xuICAgIGNvbG9yOiAjMzRjNzU5O1xuICB9XG5cbiAgJi0tdHJhaW5pbmcge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU0LCAxNDQsIDAsIDAuMTQpO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIH1cbn1cblxuLmNvbmNlcHQtdGl0bGUge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG4gIG1hcmdpbjogM3B4IDAgMDtcbiAgZm9udC1zaXplOiAwLjk4cmVtO1xuICBmb250LXdlaWdodDogNjUwO1xuICBsZXR0ZXItc3BhY2luZzogLTAuMDFlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMztcbiAgY29sb3I6ICNmZmZmZmY7XG59XG5cbi5jb25jZXB0LWRlc2NyaXB0aW9uIHtcbiAgbWFyZ2luOiAwIDAgMTBweDtcbiAgZm9udC1zaXplOiAwLjg2cmVtO1xuICBsaW5lLWhlaWdodDogMS41NTtcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcbn1cblxuLmNvbmNlcHQtdHlwZS1sYWJlbCB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgZm9udC1zaXplOiAwLjdyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGxldHRlci1zcGFjaW5nOiAwLjAyZW07XG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNDgpO1xufVxuXG4vLyBObyBSZXN1bHRzXG4ubm8tcmVzdWx0cyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nOiA4OHB4IDMycHggMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gIC5uby1yZXN1bHRzLWljb24td3JhcCB7XG4gICAgd2lkdGg6IDU2cHg7XG4gICAgaGVpZ2h0OiA1NnB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcbiAgICBtYXJnaW4tYm90dG9tOiAxOHB4O1xuICB9XG5cbiAgLm5vLXJlc3VsdHMtaWNvbiB7XG4gICAgZm9udC1zaXplOiAyNHB4O1xuICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XG4gIH1cblxuICBoMyB7XG4gICAgY29sb3I6ICNmZmZmZmY7XG4gICAgZm9udC13ZWlnaHQ6IDY1MDtcbiAgICBtYXJnaW46IDAgMCA2cHg7XG4gICAgZm9udC1zaXplOiAxLjA1cmVtO1xuICB9XG5cbiAgcCB7XG4gICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcbiAgICBtYXJnaW46IDA7XG4gICAgZm9udC1zaXplOiAwLjg4cmVtO1xuICAgIG1heC13aWR0aDogMzJjaDtcbiAgfVxufVxuXG4vLyBSZXNwb25zaXZpZGFkIG3Dg8KzdmlsXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLmNvbmNlcHRzLWNvbnRhaW5lciB7XG4gICAgcGFkZGluZzogNHB4IDE2cHggMzJweDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
}));


/***/ }),

/***/ 12765:
/*!**********************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/profile/components/configuration/components/concepts/constants/concepts.ts ***!
  \**********************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CONCEPTS: () => (/* binding */ CONCEPTS),
/* harmony export */   CONCEPT_TYPES: () => (/* binding */ CONCEPT_TYPES),
/* harmony export */   CONCEPT_VALUES: () => (/* binding */ CONCEPT_VALUES)
/* harmony export */ });
var CONCEPT_TYPES;
(function (CONCEPT_TYPES) {
  CONCEPT_TYPES["general"] = "";
  CONCEPT_TYPES["nutrition"] = "Nutrici\u00F3n";
  CONCEPT_TYPES["training"] = "Entrenamiento";
})(CONCEPT_TYPES || (CONCEPT_TYPES = {}));
const CONCEPTS = [{
  key: 'ABDUCCION',
  name: 'Abducción',
  description: 'Movimiento por el cual un miembro se aleja del plano medio que divide imaginariamente el cuerpo en dos partes simétricas, generalmente se aplica al alejamiento de un brazo del tronco o una pierna de la otra.',
  type: CONCEPT_TYPES.training
}, {
  key: 'ADUCCION',
  name: 'Aducción',
  description: 'Movimiento por el cual se acerca un miembro al plano medio que divide imaginariamente el cuerpo en dos partes simétricas, generalmente se aplica al acercamiento de un brazo al tronco una pierna a la otra.',
  type: CONCEPT_TYPES.training
}, {
  key: 'AGONISTA',
  name: 'Agonista',
  description: 'Músculo: el que realiza un movimiento.',
  type: CONCEPT_TYPES.training
}, {
  key: 'ANTAGONISTA',
  name: 'Antagonista',
  description: 'Músculo: el opuesto al que realiza el movimiento.',
  type: CONCEPT_TYPES.training
}, {
  key: 'ZONA_ANTERIOR',
  name: 'Zona anterior',
  description: 'Delante, ventral.',
  type: CONCEPT_TYPES.training
}, {
  key: 'APNEA',
  name: 'Apnea',
  description: 'Falta o suspensión de la respiración.',
  type: CONCEPT_TYPES.training
}, {
  key: 'ARTICULACION',
  name: 'Articulación',
  description: 'Unión de un hueso con otro, generalmente móvil.',
  type: CONCEPT_TYPES.training
}, {
  key: 'ATROFIA',
  name: 'Atrofia',
  description: 'Disminución en el tamaño de uno o varios tejidos de los que forman un órgano, con la consiguiente minoración del volumen, peso y actividad funcional, a causa de escasez o retardo en el proceso nutritivo. Es consecuencia directa de la disminución o inactividad física de un músculo en concreto.',
  type: CONCEPT_TYPES.training
}, {
  key: 'BIOMECANICA',
  name: 'Biomecánica',
  description: 'Ciencia que estudia la aplicación de la mecánica a los seres vivos.',
  type: CONCEPT_TYPES.training
}, {
  key: 'CENTRO_GRAVEDAD',
  name: 'Centro de gravedad',
  description: 'Punto imaginario que representa el centro del peso del cuerpo o de un objeto, alrededor del cual todas las partes se equilibran.',
  type: CONCEPT_TYPES.training
}, {
  key: 'CIFOSIS',
  name: 'Cifosis',
  description: 'Curva de convexidad posterior, natural en la zona dorsal.',
  type: CONCEPT_TYPES.training
}, {
  key: 'CUADRUPEDIA',
  name: 'Cuadrupedia',
  description: 'Posición en la que se apoyan en el suelo las manos y los pies y/o rodillas.',
  type: CONCEPT_TYPES.training
}, {
  key: 'CURL',
  name: 'Curl',
  description: 'Acercamiento en flexión de un miembro con articulación en bisagra, utilizado generalmente para denominar la flexión de brazo y la de pierna.',
  type: CONCEPT_TYPES.training
}, {
  key: 'DIRECCION',
  name: 'Dirección',
  description: 'Línea formada por un punto en movimiento independientemente de su sentido ',
  type: CONCEPT_TYPES.training
}, {
  key: 'ZONA_DISTAL',
  name: 'Zona Distal',
  description: 'Alejado del tronco, del origen.',
  type: CONCEPT_TYPES.training
}, {
  key: 'EJERCICIO',
  name: 'Ejercicio',
  description: 'Cualquier acto motor voluntario y destinado al trabajo muscular. Un ejercicio se compone, en este caso, de una o varias series.',
  type: CONCEPT_TYPES.training
}, {
  key: 'ESPIRACION',
  name: 'Espiración',
  description: 'Expeler el aire aspirado, soplar.',
  type: CONCEPT_TYPES.training
}, {
  key: 'EXTENSION',
  name: 'Extensión',
  description: 'Desplegar una articulación antes flexionada.',
  type: CONCEPT_TYPES.training
}, {
  key: 'FALLO_MUSCULAR',
  name: 'Fallo muscular',
  description: 'Llevar una serie hasta el punto de máximo agotamiento muscular local, con incapacidad para completar una repetición más de forma correcta y completa.',
  type: CONCEPT_TYPES.training
}, {
  key: 'FASE_CONCENTRICA',
  name: 'Fase concéntrica/positiva',
  description: 'Movimiento de contracción en acortamiento muscular.',
  type: CONCEPT_TYPES.training
}, {
  key: 'FASE_EXCENTRICA',
  name: 'Fase excéntrica/negativa',
  description: 'La contraria a la concéntrica o positiva.',
  type: CONCEPT_TYPES.training
}, {
  key: 'FIBRA_MUSCULAR',
  name: 'Fibra muscular',
  description: 'Célula contráctil del músculo.',
  type: CONCEPT_TYPES.training
}, {
  key: 'FLEXIBILIDAD',
  name: 'Flexibilidad',
  description: 'Cualidad de flexible, con capacidad para doblarse.',
  type: CONCEPT_TYPES.training
}, {
  key: 'FLEXION',
  name: 'Flexión',
  description: 'Acción y efecto de doblar el cuerpo o algún miembro. Desde la posición anatómica es el acercamiento de las partes anteriores del cuerpo, excepto en la pierna que es acercamiento posterior.',
  type: CONCEPT_TYPES.training
}, {
  key: 'FUERZA',
  name: 'Fuerza',
  description: 'Vigor, robustez y capacidad para mover un peso o resistencia. Fuerza= masa x aceleración.',
  type: CONCEPT_TYPES.training
}, {
  key: 'FUERZA_MAXIMA',
  name: 'Fuerza máxima',
  description: 'Fuerza total para una sola repetición.',
  type: CONCEPT_TYPES.training
}, {
  key: 'FUERZA_RESISTENCIA',
  name: 'Fuerza resistencia',
  description: 'Fuerza prolongada en el tiempo.',
  type: CONCEPT_TYPES.training
}, {
  key: 'GRASAS',
  name: 'Grasas(G)',
  description: 'Nutriente esencial para el organismo. Cada gramo de grasa es de aproximadamente 9Kcal',
  type: CONCEPT_TYPES.nutrition
}, {
  key: 'HIDRATOS',
  name: 'Hidratos de carbono (HC)',
  description: 'Los hidratos de carbono son el principal aporte energético que utiliza el cuerpo, cada gramo de H.C. Es de aproximadamente 4Kcal.',
  type: CONCEPT_TYPES.nutrition
}, {
  key: 'HIPEREXTENSION',
  name: 'Hiperextensión',
  description: 'Extensión más allá de la posición anatómica.',
  type: CONCEPT_TYPES.training
}, {
  key: 'HIPERTROFIA',
  name: 'Hipertrofia',
  description: 'Aumento del volumen de un órgano, como el aumento del tamaño muscular.',
  type: CONCEPT_TYPES.training
}, {
  key: 'PLANO_HORIZONTAL',
  name: 'Plano horizontal ',
  description: 'Plano paralelo al suelo que divide el cuerpo en posición anatómica en secciones superior e inferior.',
  type: CONCEPT_TYPES.training
}, {
  key: 'ID',
  name: 'ID',
  description: 'Tiempo de descanso entre series',
  type: CONCEPT_TYPES.training
}, {
  key: 'IMC',
  name: 'IMC',
  description: 'Indice de masa corporal',
  type: CONCEPT_TYPES.nutrition
}, {
  key: 'INTENSIDAD',
  name: 'Intensidad',
  description: 'Porcentaje de trabajo en relación con la fuerza máxima aplicada a un esfuerzo muscular concreto. También cualquier variable que dificulte cuantitativamente un ejercicio.',
  type: CONCEPT_TYPES.training
}, {
  key: 'INSPIRACION',
  name: 'Inspiración',
  description: 'Atraer el aire exterior a los pulmones, aspirar.',
  type: CONCEPT_TYPES.training
}, {
  key: 'ISOMETRICO',
  name: 'Isométrico',
  description: 'Contracción muscular que deja la articulación fijada, inmóvil, aunque con aumento de tono.',
  type: CONCEPT_TYPES.training
}, {
  key: 'KCAL',
  name: 'Kcal',
  description: 'Kcal (Kilocaloria) es una unidad de energía. Esta se utiliza para medir la cantidad de energía que requiere nuestro cuerpo, y para determinar la cantidad de energía de los alimentos',
  type: CONCEPT_TYPES.nutrition
}, {
  key: 'ZONA_LATERAL',
  name: 'Zona lateral',
  description: 'Alejado del plano medio-sagital.',
  type: CONCEPT_TYPES.training
}, {
  key: 'PLANO_LONGITUDINAL',
  name: 'Plano longitudinal',
  description: 'Perpendicular al suelo, es decir, el que divide al cuerpo en una zona anterior y posterior.',
  type: CONCEPT_TYPES.training
}, {
  key: 'LORDOSIS',
  name: 'Lordosis',
  description: 'Curva de concavidad posterior, natural en las zonas lumbar y cervical.',
  type: CONCEPT_TYPES.training
}, {
  key: 'MANCUERNA',
  name: 'Mancuerna',
  description: 'Cada una de las dos barras metálicas con discos en los extremos (u otro tipo de lastre) generalmente para utilizar con una sola mano, haltera.',
  type: CONCEPT_TYPES.training
}, {
  key: 'MASA',
  name: 'Masa',
  description: 'Magnitud física que expresa la cantidad de materia que contiene un cuerpo. Su unidad en el Sistema Internacional es el kilogramo (kg). Suele confundirse con peso, aunque en la vida diaria esté permitida esta licencia.',
  type: CONCEPT_TYPES.training
}, {
  key: 'MECANICA',
  name: 'Mecánica',
  description: 'Ciencia que estudia el equilibrio y movimiento de los cuerpos sometidos a fuerzas.',
  type: CONCEPT_TYPES.training
}, {
  key: 'ZONA_MEDIAL',
  name: 'Zona medial ',
  description: 'Cercano al plano medio-sagital.',
  type: CONCEPT_TYPES.training
}, {
  key: 'MESOCICLO',
  name: 'Mesociclo',
  description: 'Son estructuras temporales intermedias de entrenamiento que tienen como finalidad lograr objetivos parciales del proceso global de entrenamiento.',
  type: CONCEPT_TYPES.training
}, {
  key: 'MICROCICLO',
  name: 'Microciclo',
  description: 'Es el conjunto de todas las sesiones de entrenamiento hasta que el ciclo de las sesiones vuelva a comenzar',
  type: CONCEPT_TYPES.training
}, {
  key: 'MOVILIDAD_ARTICULAR',
  name: 'Movilidad articular',
  description: 'Rango de movimiento limitado por los choques óseos o musculares.',
  type: CONCEPT_TYPES.training
}, {
  key: 'MULTIPOWER',
  name: 'Multipower',
  description: 'Aparato versátil con barra de cargas laterales guiadas, generalmente con discos o placas como lastre.',
  type: CONCEPT_TYPES.training
}, {
  key: 'POSICION_ANATOMICA',
  name: 'Posición anatómica',
  description: 'De pie, cabeza erguida, piernas ligeramente separadas, brazos a los lados y manos en supinación (mostrando las palmas).',
  type: CONCEPT_TYPES.training
}, {
  key: 'POSICION_NEUTRA',
  name: 'Posición neutra',
  description: 'Entre la pronación y la supinación. De pie es la que se adopta de forma natural, con la palma de las manos enfrentadas a los muslos.',
  type: CONCEPT_TYPES.training
}, {
  key: 'ZONA_POSTERIOR',
  name: 'Zona posterior',
  description: 'Detrás, dorsal.',
  type: CONCEPT_TYPES.training
}, {
  key: 'PRESS',
  name: 'Press',
  description: 'Empuje o extensión.',
  type: CONCEPT_TYPES.training
}, {
  key: 'PRONACION',
  name: 'Pronación',
  description: 'Movimiento del antebrazo que hace girar la mano de fuera a dentro presentando el dorso de ella, como cuando se dispone a tomar un objeto de una mesa.',
  type: CONCEPT_TYPES.training
}, {
  key: 'PROTEINA',
  name: 'Proteína(P)',
  description: 'Nutriente esencial para el organismo. Las proteínas son moléculas que desempeñan muchas funciones y son la base de las estructuras de nuestro cuerpo. También tienen un aporte energético, cada gramo de proteína tiene aproximadamente 4Kcal',
  type: CONCEPT_TYPES.nutrition
}, {
  key: 'ZONA_PROXIMAL',
  name: 'Zona proximal ',
  description: 'Cercano al tronco, al origen.',
  type: CONCEPT_TYPES.training
}, {
  key: 'REFLEJO',
  name: 'Reflejo',
  description: 'Movimiento involuntario de respuesta a un estímulo.',
  type: CONCEPT_TYPES.training
}, {
  key: 'REPETICIONES',
  name: 'Repeticiones',
  description: 'Numero de veces seguidas que se repite el movimiento del ejercicio',
  type: CONCEPT_TYPES.training
}, {
  key: 'RIR',
  name: 'RIR',
  description: 'El RIR o repeticiones en recamara, es lo que se utiliza para determinar las repeticiones que faltan para llegar al fallo muscular, por ejemplo: 12 repeticiones a un RIR3, quiere decir que cuando hagamos las 12 repeticiones, como máximo podremos hacer 15 repeticiones, es decir tenemos 3 restantes en recámara. ',
  type: CONCEPT_TYPES.training
}, {
  key: 'ROTACION',
  name: 'Rotación',
  description: 'Giro',
  type: CONCEPT_TYPES.training
}, {
  key: 'RPE',
  name: 'RPE',
  description: 'El rpe es el esfuerzo percibido. Es una puntuación numérica subjetiva del esfuerzo durante la serie. A mayor esfuerzo mayor puntuación. 0-1 muy fácil 2-3 fácil 4-5 medianamente fácil 6-7algo difícil 8-9 difícil 10 muy difícil',
  type: CONCEPT_TYPES.training
}, {
  key: 'PLANO_SAGITAL',
  name: 'Plano sagital ',
  description: 'Perpendicular al longitudinal y transversal, es decir, el que divide al cuerpo en dos mitades casi simétricas de izquierda-derecha.',
  type: CONCEPT_TYPES.training
}, {
  key: 'SENTIDO',
  name: 'Sentido',
  description: 'Orientación hacia la que se mueve un punto, en una dirección hay dos sentidos opuestos ',
  type: CONCEPT_TYPES.training
}, {
  key: 'SERIES',
  name: 'Series',
  description: 'Agrupación de repeticiones',
  type: CONCEPT_TYPES.training
}, {
  key: 'SESION_ENTRENAMIENTO',
  name: 'Sesión de entrenamiento',
  description: 'Conjunto de ejercicios realizados o a realizar en un día',
  type: CONCEPT_TYPES.training
}, {
  key: 'SINERGISTA',
  name: 'Músculo sinergista',
  description: 'El que se une al movimiento de otro/s músculo/s para realizar una misma acción.',
  type: CONCEPT_TYPES.training
}, {
  key: 'SUPERSERIE',
  name: 'Superserie',
  description: 'Serie compuesta de dos ejercicios, o de uno solo con distinto peso en algunas repeticiones.',
  type: CONCEPT_TYPES.training
}, {
  key: 'SUPINACION',
  name: 'Supinación',
  description: 'Movimiento del antebrazo que hace girar la mano de dentro a fuera, presentando la palma, como cuando se lleva un alimento de la mesa a la boca.',
  type: CONCEPT_TYPES.training
}, {
  key: 'PLANO_TRANSVERSAL',
  name: 'Plano transversal',
  description: 'Perpendicular al longitudinal, es decir, el que divide al cuerpo en una zona superior e inferior.',
  type: CONCEPT_TYPES.training
}, {
  key: 'VENTRAL',
  name: 'Ventral',
  description: 'Anterior, frontal.',
  type: CONCEPT_TYPES.training
}, {
  key: 'BARRA_Z',
  name: 'Barra Z',
  description: 'Barra anatómicamente acodada (angulosa) para facilitar un agarre cómodo con las manos.',
  type: CONCEPT_TYPES.training
}];
const CONCEPT_VALUES = Object.values(CONCEPTS);

/***/ })

}]);
//# sourceMappingURL=packages_shared-features_src_app_features_profile_components_configuration_components_concept-7c16a5.js.map