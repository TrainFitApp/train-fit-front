"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_features_meal-compose_meal-compose_module_ts"],{

/***/ 72284:
/*!**********************************************************************!*\
  !*** ./src/app/features/meal-compose/meal-compose-routing.module.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MealComposePageRoutingModule: () => (/* binding */ MealComposePageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _pages_compose_meal_compose_meal_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/compose-meal/compose-meal.page */ 68570);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _MealComposePageRoutingModule;




const routes = [{
  path: '',
  component: _pages_compose_meal_compose_meal_page__WEBPACK_IMPORTED_MODULE_1__.ComposeMealPage
}];
class MealComposePageRoutingModule {}
_MealComposePageRoutingModule = MealComposePageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealComposePageRoutingModule, "\u0275fac", function MealComposePageRoutingModule_Factory(t) {
  return new (t || _MealComposePageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealComposePageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _MealComposePageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealComposePageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](MealComposePageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 96541:
/*!**************************************************************!*\
  !*** ./src/app/features/meal-compose/meal-compose.module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MealComposePageModule: () => (/* binding */ MealComposePageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _meal_compose_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./meal-compose-routing.module */ 72284);
/* harmony import */ var _shared_components_meal_snippet_picker_meal_snippet_picker_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/meal-snippet-picker/meal-snippet-picker.module */ 32470);
/* harmony import */ var _pages_compose_meal_compose_meal_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/compose-meal/compose-meal.page */ 68570);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 69717);

var _MealComposePageModule;





class MealComposePageModule {}
_MealComposePageModule = MealComposePageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealComposePageModule, "\u0275fac", function MealComposePageModule_Factory(t) {
  return new (t || _MealComposePageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealComposePageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
  type: _MealComposePageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealComposePageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _meal_compose_routing_module__WEBPACK_IMPORTED_MODULE_2__.MealComposePageRoutingModule, _shared_components_meal_snippet_picker_meal_snippet_picker_module__WEBPACK_IMPORTED_MODULE_3__.MealSnippetPickerModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](MealComposePageModule, {
    declarations: [_pages_compose_meal_compose_meal_page__WEBPACK_IMPORTED_MODULE_4__.ComposeMealPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _meal_compose_routing_module__WEBPACK_IMPORTED_MODULE_2__.MealComposePageRoutingModule, _shared_components_meal_snippet_picker_meal_snippet_picker_module__WEBPACK_IMPORTED_MODULE_3__.MealSnippetPickerModule]
  });
})();

/***/ }),

/***/ 68570:
/*!*******************************************************************************!*\
  !*** ./src/app/features/meal-compose/pages/compose-meal/compose-meal.page.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ComposeMealPage: () => (/* binding */ ComposeMealPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _diet_templates_models_diet_template_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../diet-templates/models/diet-template.model */ 27094);
/* harmony import */ var _clients_components_select_clients_modal_select_clients_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../clients/components/select-clients-modal/select-clients-modal.component */ 81800);
/* harmony import */ var src_app_features_diets_components_meal_components_search_foods_search_foods_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/features/diets/components/meal/components/search-foods/search-foods.page */ 65693);
/* harmony import */ var _shared_components_product_search_modal_product_search_modal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/components/product-search-modal/product-search-modal.component */ 78381);
/* harmony import */ var _shared_components_meal_snippet_picker_meal_snippet_picker_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/components/meal-snippet-picker/meal-snippet-picker.component */ 51111);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _services_meal_compose_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../services/meal-compose-api.service */ 63194);
/* harmony import */ var _shared_services_meal_snippet_api_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../shared/services/meal-snippet-api.service */ 20790);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 84725);


var _ComposeMealPage;













function ComposeMealPage_option_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "option", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const slot_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("value", slot_r5);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate"](slot_r5);
  }
}
function ComposeMealPage_div_21_div_6_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("\u00B7 ", item_r6.quantity, "g");
  }
}
function ComposeMealPage_div_21_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "ion-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](2, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](4, ComposeMealPage_div_21_div_6_ng_container_4_Template, 2, 1, "ng-container", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](5, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ComposeMealPage_div_21_div_6_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r14);
      const i_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().index;
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r12.clearProduct(i_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](6, "ion-icon", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("name", item_r6.recipeId ? "restaurant-outline" : "checkmark-circle-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"](" ", item_r6.recipeId ? item_r6.recipeName : item_r6.productName, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", item_r6.quantity);
  }
}
function ComposeMealPage_div_21_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ComposeMealPage_div_21_button_7_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r18);
      const i_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]().index;
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r16.openProductSearch(i_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "ion-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2, " Buscar producto o receta real ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function ComposeMealPage_div_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "div", 28)(1, "div", 29)(2, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](4, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ComposeMealPage_div_21_Template_button_click_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r20);
      const i_r7 = restoredCtx.index;
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r19.removeFoodItem(i_r7));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](5, "ion-icon", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](6, ComposeMealPage_div_21_div_6_Template, 7, 3, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](7, ComposeMealPage_div_21_button_7_Template, 3, 0, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const i_r7 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtextInterpolate1"]("Alimento ", i_r7 + 1, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵattribute"]("aria-label", "Eliminar alimento " + (i_r7 + 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", item_r6.productId || item_r6.recipeId);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !item_r6.productId && !item_r6.recipeId);
  }
}
function ComposeMealPage_button_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ComposeMealPage_button_29_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵresetView"](ctx_r21.saveAsSnippet());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](1, "ion-icon", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](2, " Guardar esta composici\u00F3n como snippet ");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function ComposeMealPage_span_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](1, "Elegir clientes y aplicar");
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
  }
}
function ComposeMealPage_ion_spinner_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](0, "ion-spinner", 43);
  }
}
function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}
// TAREA5 (auditoría UX, Fase D) — punto de entrada propio para pautar la
// MISMA comida a un grupo de clientes de una sola vez, en vez de que
// "aplicar a otros clientes" sea solo una opción secundaria al final del
// flujo de un cliente concreto (bulkApplyPrescribedMeal en client-detail).
// Reutiliza SearchFoodsPage/ProductSearchModalComponent con un
// trainerContext "sin cliente real" (clientUser/dietDay/meal vacíos, igual
// que diet-template-builder cuando compone localmente) y el endpoint nuevo
// POST /trainer/meals/apply-to-clients (sin cliente origen en la URL).
class ComposeMealPage {
  constructor(modalController, mealComposeApi, mealSnippetApi, ionicUtilService, router) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "mealComposeApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "mealSnippetApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "mealSlots", _diet_templates_models_diet_template_model__WEBPACK_IMPORTED_MODULE_2__.MEAL_SLOTS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "mealSlot", _diet_templates_models_diet_template_model__WEBPACK_IMPORTED_MODULE_2__.MEAL_SLOTS[0]);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "date", todayIsoDate());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "items", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "maxItems", 8);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isApplying", false);
    this.modalController = modalController;
    this.mealComposeApi = mealComposeApi;
    this.mealSnippetApi = mealSnippetApi;
    this.ionicUtilService = ionicUtilService;
    this.router = router;
  }
  addFoodItem() {
    if (this.items.length >= this.maxItems) return;
    this.items.push({});
  }
  removeFoodItem(index) {
    this.items.splice(index, 1);
  }
  clearProduct(index) {
    const item = this.items[index];
    item.productId = undefined;
    item.productName = undefined;
    item.recipeId = undefined;
    item.recipeName = undefined;
    item.quantity = undefined;
  }
  openProductSearch(itemIndex) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const outerModal = yield _this.modalController.create({
        component: src_app_features_diets_components_meal_components_search_foods_search_foods_page__WEBPACK_IMPORTED_MODULE_4__.SearchFoodsPage,
        componentProps: {
          trainerContext: _this.buildTrainerContext(itemIndex, () => void outerModal.dismiss())
        },
        cssClass: 'tf-panel-modal'
      });
      yield outerModal.present();
      yield outerModal.onDidDismiss();
    })();
  }
  buildTrainerContext(itemIndex, closeOuter) {
    return {
      clientUser: {},
      dietDay: {},
      meal: {},
      targetLabel: this.mealSlot,
      confirmSelection: selection => this.applySelection(itemIndex, selection),
      closeSelf: closeOuter,
      pickCreateProduct: () => void this.confirmCreateProduct(itemIndex, closeOuter)
    };
  }
  applySelection(itemIndex, selection) {
    if (!selection.length) return;
    selection.forEach((sel, i) => {
      let targetIndex = itemIndex;
      if (i > 0) {
        if (this.items.length >= this.maxItems) return;
        this.items.push({});
        targetIndex = this.items.length - 1;
      }
      const item = this.items[targetIndex];
      if (sel.kind === 'recipe' && sel.recipe) {
        item.recipeId = sel.recipe._id;
        item.recipeName = sel.recipe.name;
        item.productId = undefined;
        item.productName = undefined;
        item.quantity = sel.quantity ?? undefined;
      } else if (sel.kind === 'product' && sel.product) {
        item.productId = sel.product._id;
        item.productName = sel.product.name;
        item.recipeId = undefined;
        item.recipeName = undefined;
        item.quantity = sel.quantity ?? undefined;
      }
    });
  }
  confirmCreateProduct(itemIndex, closeOuter) {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this2.modalController.create({
        component: _shared_components_product_search_modal_product_search_modal_component__WEBPACK_IMPORTED_MODULE_5__.ProductSearchModalComponent,
        componentProps: {
          startInCreateProduct: true
        },
        cssClass: 'tf-panel-modal'
      });
      yield modal.present();
      const {
        data,
        role
      } = yield modal.onDidDismiss();
      if (role !== 'confirm' || !data) return;
      const item = _this2.items[itemIndex];
      if (data.kind === 'recipe' && data.recipe) {
        item.recipeId = data.recipe._id;
        item.recipeName = data.recipe.name;
        item.productId = undefined;
        item.productName = undefined;
        item.quantity = data.quantity ?? undefined;
      } else if (data.product) {
        item.productId = data.product._id;
        item.productName = data.product.name;
        item.recipeId = undefined;
        item.recipeName = undefined;
        item.quantity = data.quantity ?? undefined;
      }
      closeOuter();
    })();
  }
  get canCompose() {
    return this.items.length > 0 && this.items.every(i => !!(i.productId || i.recipeId));
  }
  itemsToCustomEntries() {
    const customProducts = [];
    const customRecipes = [];
    for (const item of this.items) {
      if (item.recipeId) {
        customRecipes.push({
          recipe: item.recipeId,
          quantity: item.quantity || null
        });
      } else if (item.productId) {
        customProducts.push({
          product: item.productId,
          quantity: item.quantity || 100
        });
      }
    }
    return {
      customProducts,
      customRecipes
    };
  }
  // TAREA5 (auditoría UX, Fase C) — insertar un snippet de golpe: cada
  // entrada del snippet rellena/añade un alimento, igual que la selección
  // múltiple del buscador (misma mecánica, distinta fuente).
  openSnippetPicker() {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this3.modalController.create({
        component: _shared_components_meal_snippet_picker_meal_snippet_picker_component__WEBPACK_IMPORTED_MODULE_6__.MealSnippetPickerComponent,
        cssClass: 'tf-panel-modal'
      });
      yield modal.present();
      const {
        data,
        role
      } = yield modal.onDidDismiss();
      if (role !== 'confirm' || !data) return;
      _this3.insertSnippet(data);
    })();
  }
  insertSnippet(snippet) {
    for (const cp of snippet.customProducts || []) {
      if (this.items.length >= this.maxItems) break;
      const productId = typeof cp.product === 'string' ? cp.product : cp.product?._id;
      if (!productId) continue;
      this.items.push({
        productId,
        productName: cp.productName || 'Producto guardado',
        quantity: cp.quantity ?? undefined
      });
    }
    for (const cr of snippet.customRecipes || []) {
      if (this.items.length >= this.maxItems) break;
      const recipeId = typeof cr.recipe === 'string' ? cr.recipe : cr.recipe?._id;
      if (!recipeId) continue;
      this.items.push({
        recipeId,
        recipeName: cr.recipeName || 'Receta guardada',
        quantity: cr.quantity ?? undefined
      });
    }
  }
  saveAsSnippet() {
    var _this4 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this4.canCompose) return;
      yield _this4.ionicUtilService.showAlert({
        header: 'Guardar como snippet',
        message: 'Reutilizable en cualquier plantilla o cliente, con 1 clic.',
        inputs: [{
          name: 'name',
          type: 'text',
          placeholder: 'p. ej. Desayuno alto en proteína'
        }],
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Guardar',
          handler: data => {
            const name = (data?.name || '').trim();
            if (!name) return false;
            const {
              customProducts,
              customRecipes
            } = _this4.itemsToSnippetEntries();
            _this4.mealSnippetApi.create(name, customProducts, customRecipes).subscribe({
              next: () => _this4.ionicUtilService.showToast({
                message: `Snippet "${name}" guardado`,
                duration: 2000
              }),
              error: () => _this4.ionicUtilService.showErrorToast('No se pudo guardar el snippet', 'Error', 3000)
            });
            return true;
          }
        }]
      });
    })();
  }
  itemsToSnippetEntries() {
    const customProducts = [];
    const customRecipes = [];
    for (const item of this.items) {
      if (item.recipeId) {
        customRecipes.push({
          recipe: item.recipeId,
          recipeName: item.recipeName,
          quantity: item.quantity || null
        });
      } else if (item.productId) {
        customProducts.push({
          product: item.productId,
          productName: item.productName,
          quantity: item.quantity || 100
        });
      }
    }
    return {
      customProducts,
      customRecipes
    };
  }
  chooseClientsAndApply() {
    var _this5 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this5.canCompose || _this5.isApplying) return;
      const modal = yield _this5.modalController.create({
        component: _clients_components_select_clients_modal_select_clients_modal_component__WEBPACK_IMPORTED_MODULE_3__.SelectClientsModalComponent,
        componentProps: {
          requiredScope: 'nutrition',
          title: `Aplicar "${_this5.mealSlot}" a clientes`
        },
        cssClass: 'tf-panel-modal'
      });
      yield modal.present();
      const {
        data,
        role
      } = yield modal.onDidDismiss();
      if (role !== 'confirm' || !data?.targetClientIds?.length) return;
      _this5.isApplying = true;
      const {
        customProducts,
        customRecipes
      } = _this5.itemsToCustomEntries();
      _this5.mealComposeApi.applyToClients({
        date: _this5.date,
        mealSlot: _this5.mealSlot,
        customProducts,
        customRecipes,
        merge: false,
        targetClientIds: data.targetClientIds
      }).subscribe({
        next: results => {
          _this5.isApplying = false;
          _this5.showResultToast(results);
        },
        error: () => {
          _this5.isApplying = false;
          _this5.ionicUtilService.showErrorToast('No se pudo aplicar la comida', 'Error', 3000);
        }
      });
    })();
  }
  showResultToast(results) {
    const successCount = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success);
    if (!failed.length) {
      this.ionicUtilService.showToast({
        message: `"${this.mealSlot}" aplicada a ${successCount} cliente${successCount === 1 ? '' : 's'}`,
        duration: 2500
      });
      this.items = [];
      return;
    }
    this.ionicUtilService.showErrorToast(`Aplicada a ${successCount} de ${results.length} — ${failed[0].error || 'error desconocido'}`, 'Aplicado parcialmente', 4000);
  }
  trackByIndex(index) {
    return index;
  }
  goBack() {
    this.router.navigate(['/tabs/templates']);
  }
}
_ComposeMealPage = ComposeMealPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ComposeMealPage, "\u0275fac", function ComposeMealPage_Factory(t) {
  return new (t || _ComposeMealPage)(_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_11__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_services_meal_compose_api_service__WEBPACK_IMPORTED_MODULE_7__.MealComposeApiService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_shared_services_meal_snippet_api_service__WEBPACK_IMPORTED_MODULE_8__.MealSnippetApiService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_9__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_12__.Router));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ComposeMealPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineComponent"]({
  type: _ComposeMealPage,
  selectors: [["app-compose-meal"]],
  decls: 33,
  vars: 11,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["type", "button", "aria-label", "Volver", 1, "tf-page-header__back-button", 3, "click"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "compose-content"], [1, "page-hint"], [1, "field-row"], [1, "input-wrapper"], ["name", "restaurant-outline", 1, "input-icon"], ["aria-label", "Comida", 1, "input-field", "select-field", 3, "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], ["name", "calendar-outline", 1, "input-icon"], ["type", "date", "aria-label", "Fecha", 1, "input-field", 3, "ngModel", "ngModelChange"], ["class", "food-item-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "snippet-actions-row"], ["type", "button", 1, "add-alternative-btn", 3, "disabled", "click"], ["name", "add-outline"], ["name", "bookmark-outline"], ["type", "button", "class", "snippet-save-link", 3, "click", 4, "ngIf"], ["type", "button", 1, "submit-button", 3, "disabled", "click"], [4, "ngIf"], ["name", "dots", 4, "ngIf"], [3, "value"], [1, "food-item-card"], [1, "food-item-header"], [1, "food-item-title"], ["type", "button", 1, "remove-alternative-btn", 3, "click"], ["name", "trash-outline"], ["class", "product-pick-row", 4, "ngIf"], ["type", "button", "class", "search-product-btn", 3, "click", 4, "ngIf"], [1, "product-pick-row"], [1, "input-icon", 3, "name"], [1, "picked-product-name"], ["type", "button", "aria-label", "Quitar producto seleccionado", 1, "clear-product-btn", 3, "click"], ["name", "close-outline"], ["type", "button", 1, "search-product-btn", 3, "click"], ["name", "search-outline"], ["type", "button", 1, "snippet-save-link", 3, "click"], ["name", "dots"]],
  template: function ComposeMealPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ComposeMealPage_Template_button_click_4_listener() {
        return ctx.goBack();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](5, "ion-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](6, "div", 6)(7, "h1", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](8, "Componer para varios clientes");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](9, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](10, "ion-content", 9)(11, "p", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](12, " Comp\u00F3n una comida una sola vez y apl\u00EDcala directamente a un grupo de clientes \u2014 sin repetir el ciclo de b\u00FAsqueda cliente a cliente. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](13, "div", 11)(14, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](15, "ion-icon", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](16, "select", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngModelChange", function ComposeMealPage_Template_select_ngModelChange_16_listener($event) {
        return ctx.mealSlot = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](17, ComposeMealPage_option_17_Template, 2, 2, "option", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](18, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](19, "ion-icon", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](20, "input", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("ngModelChange", function ComposeMealPage_Template_input_ngModelChange_20_listener($event) {
        return ctx.date = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](21, ComposeMealPage_div_21_Template, 8, 4, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](22, "div", 19)(23, "button", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ComposeMealPage_Template_button_click_23_listener() {
        return ctx.addFoodItem();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](24, "ion-icon", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](25, " A\u00F1adir alimento ");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](26, "button", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ComposeMealPage_Template_button_click_26_listener() {
        return ctx.openSnippetPicker();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelement"](27, "ion-icon", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtext"](28, " Insertar snippet ");
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](29, ComposeMealPage_button_29_Template, 3, 0, "button", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementStart"](30, "button", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵlistener"]("click", function ComposeMealPage_Template_button_click_30_listener() {
        return ctx.chooseClientsAndApply();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](31, ComposeMealPage_span_31_Template, 2, 0, "span", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵtemplate"](32, ComposeMealPage_ion_spinner_32_Template, 1, 0, "ion-spinner", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngModel", ctx.mealSlot);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx.mealSlots);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngModel", ctx.date);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngForOf", ctx.items)("ngForTrackBy", ctx.trackByIndex);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx.items.length >= ctx.maxItems);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", ctx.items.length >= ctx.maxItems);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.canCompose);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("disabled", !ctx.canCompose || ctx.isApplying);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", !ctx.isApplying);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵproperty"]("ngIf", ctx.isApplying);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_13__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_13__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_14__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_14__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonSpinner],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n.compose-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: var(--tf-space-4);\n  --padding-end: var(--tf-space-4);\n  --padding-top: var(--tf-space-3);\n  --padding-bottom: var(--tf-space-6);\n}\n\n.page-hint[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-muted);\n  margin: 0 0 var(--tf-space-4);\n  line-height: 1.4;\n}\n\n.field-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n  position: relative;\n  height: 50px;\n  margin-bottom: var(--tf-space-3);\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  flex-shrink: 0;\n  font-size: var(--tf-font-size-lg);\n}\n\n.input-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n  font-size: var(--tf-font-size-base);\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.select-field[_ngcontent-%COMP%] {\n  appearance: none;\n  -webkit-appearance: none;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%238b8b8b' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: right 0 center;\n  padding-right: var(--tf-space-5);\n}\n\n.food-item-card[_ngcontent-%COMP%] {\n  padding: var(--tf-space-3);\n  margin-bottom: var(--tf-space-3);\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-md);\n}\n\n.food-item-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: var(--tf-space-2);\n}\n\n.food-item-title[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n  color: var(--tf-text-secondary);\n}\n\n.remove-alternative-btn[_ngcontent-%COMP%] {\n  width: var(--tf-touch-min);\n  height: var(--tf-touch-min);\n  margin: calc((var(--tf-touch-min) - 20px) / -2) calc((var(--tf-touch-min) - 20px) / -2) calc((var(--tf-touch-min) - 20px) / -2) 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  border-radius: var(--tf-radius-sm);\n  color: var(--tf-text-muted);\n  cursor: pointer;\n  flex-shrink: 0;\n  transition: color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.remove-alternative-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.remove-alternative-btn[_ngcontent-%COMP%]:hover {\n  color: var(--tf-danger);\n}\n.remove-alternative-btn[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.product-pick-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n  padding: var(--tf-space-3) var(--tf-space-3) var(--tf-space-3) 12px;\n  margin-bottom: var(--tf-space-3);\n  background: var(--tf-success-soft);\n  border: 1px solid var(--tf-success-border);\n  border-radius: var(--tf-radius-md);\n}\n.product-pick-row[_ngcontent-%COMP%]   .input-icon[_ngcontent-%COMP%] {\n  color: var(--tf-success);\n}\n\n.picked-product-name[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  font-size: var(--tf-font-size-base);\n  color: var(--tf-text);\n  font-weight: 600;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.clear-product-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: var(--tf-touch-min);\n  height: var(--tf-touch-min);\n  margin: calc((var(--tf-touch-min) - 20px) / -2) calc((var(--tf-touch-min) - 20px) / -2) calc((var(--tf-touch-min) - 20px) / -2) 0;\n  background: none;\n  border: none;\n  border-radius: var(--tf-radius-sm);\n  color: var(--tf-text-muted);\n  cursor: pointer;\n  flex-shrink: 0;\n  transition: color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.clear-product-btn[_ngcontent-%COMP%]:hover {\n  color: var(--tf-text);\n}\n.clear-product-btn[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.search-product-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  height: var(--tf-touch-min);\n  margin-bottom: var(--tf-space-2);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--tf-space-2);\n  background: var(--tf-accent-soft);\n  border: 1px solid var(--tf-accent-soft-border);\n  border-radius: var(--tf-radius-md);\n  color: var(--tf-accent);\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  cursor: pointer;\n  transition: border-color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.search-product-btn[_ngcontent-%COMP%]:hover {\n  border-color: var(--tf-accent);\n}\n.search-product-btn[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.snippet-actions-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n  margin-bottom: var(--tf-space-2);\n}\n.snippet-actions-row[_ngcontent-%COMP%]   .add-alternative-btn[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n}\n\n.add-alternative-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  height: var(--tf-touch-min);\n  margin-bottom: var(--tf-space-4);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--tf-space-2);\n  background: transparent;\n  border: 1px dashed var(--tf-border-strongest);\n  border-radius: var(--tf-radius-lg);\n  color: var(--tf-text-secondary);\n  font-size: var(--tf-font-size-base);\n  font-weight: 600;\n  cursor: pointer;\n  transition: border-color var(--tf-duration-fast) var(--tf-ease-out), color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.add-alternative-btn[_ngcontent-%COMP%]:not(:disabled):hover {\n  border-color: var(--tf-accent);\n  color: var(--tf-accent);\n}\n.add-alternative-btn[_ngcontent-%COMP%]:not(:disabled):focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.add-alternative-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n\n.snippet-save-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--tf-space-2);\n  width: 100%;\n  height: var(--tf-touch-min);\n  background: none;\n  border: none;\n  color: var(--tf-accent);\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  margin-bottom: var(--tf-space-4);\n  cursor: pointer;\n}\n.snippet-save-link[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n  border-radius: var(--tf-radius-sm);\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  width: 100%;\n  height: 50px;\n  font-size: var(--tf-font-size-base);\n}\n.submit-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvbWVhbC1jb21wb3NlL3BhZ2VzL2NvbXBvc2UtbWVhbC9jb21wb3NlLW1lYWwucGFnZS5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19pbnB1dHMuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fYnV0dG9ucy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCQTtFQUNFO0lBQ0UsMkJBQUE7RUN4QkY7QUFDRjtBQUFBO0VBQ0UsMEJBQUE7RUFDQSxrQ0FBQTtFQUNBLGdDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxtQ0FBQTtBQUVGOztBQUNBO0VBQ0UsaUNBQUE7RUFDQSwyQkFBQTtFQUNBLDZCQUFBO0VBQ0EsZ0JBQUE7QUFFRjs7QUFDQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLFNBQUE7QUFFRjs7QUFDQTtFQ25CRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsK0JEaUIwQjtFQ2hCMUIseUNBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpREFBQTtFRGNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLGdDQUFBO0FBU0Y7QUN2QkU7RUFDRSw4QkFBQTtBRHlCSjs7QUFUQTtFQ1hFLDJCQUFBO0VBQ0EsY0FBQTtFRFlBLGlDQUFBO0FBYUY7O0FBVkE7RUNYRSxPQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxxQkFBQTtFQUNBLG9CQUFBO0VBQ0EsWUFBQTtFRE1BLG1DQUFBO0FBb0JGO0FDeEJFO0VBQ0UsMkJBQUE7QUQwQko7O0FBakJBO0VBQ0UsZ0JBQUE7RUFDQSx3QkFBQTtFQUNBLG1TQUFBO0VBQ0EsNEJBQUE7RUFDQSxtQ0FBQTtFQUNBLGdDQUFBO0FBb0JGOztBQWpCQTtFQUNFLDBCQUFBO0VBQ0EsZ0NBQUE7RUFDQSwrQkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0NBQUE7QUFvQkY7O0FBakJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxnQ0FBQTtBQW9CRjs7QUFqQkE7RUFDRSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7QUFvQkY7O0FBZkE7RUFDRSwwQkFBQTtFQUNBLDJCQUFBO0VBQ0EsaUlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLGtDQUFBO0VBQ0EsMkJBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLDREQUFBO0FBa0JGO0FBaEJFO0VBQ0UsZUFBQTtBQWtCSjtBQWZFO0VBQ0UsdUJBQUE7QUFpQko7QUFkRTtFQUNFLG1DQUFBO0VBQ0EsbUJBQUE7QUFnQko7O0FBWkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLG1FQUFBO0VBQ0EsZ0NBQUE7RUFDQSxrQ0FBQTtFQUNBLDBDQUFBO0VBQ0Esa0NBQUE7QUFlRjtBQWJFO0VBQ0Usd0JBQUE7QUFlSjs7QUFYQTtFQUNFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsbUNBQUE7RUFDQSxxQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0FBY0Y7O0FBWEE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLDBCQUFBO0VBQ0EsMkJBQUE7RUFDQSxpSUFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLGtDQUFBO0VBQ0EsMkJBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLDREQUFBO0FBY0Y7QUFaRTtFQUNFLHFCQUFBO0FBY0o7QUFYRTtFQUNFLG1DQUFBO0VBQ0EsbUJBQUE7QUFhSjs7QUFUQTtFQUNFLFdBQUE7RUFDQSwyQkFBQTtFQUNBLGdDQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxzQkFBQTtFQUNBLGlDQUFBO0VBQ0EsOENBQUE7RUFDQSxrQ0FBQTtFQUNBLHVCQUFBO0VBQ0EsaUNBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxtRUFBQTtBQVlGO0FBVkU7RUFDRSw4QkFBQTtBQVlKO0FBVEU7RUFDRSxtQ0FBQTtFQUNBLG1CQUFBO0FBV0o7O0FBUEE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxTQUFBO0VBQ0EsZ0NBQUE7QUFVRjtBQVJFO0VBQ0UsZ0JBQUE7QUFVSjs7QUFOQTtFQUNFLFdBQUE7RUFDQSwyQkFBQTtFQUNBLGdDQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxzQkFBQTtFQUNBLHVCQUFBO0VBQ0EsNkNBQUE7RUFDQSxrQ0FBQTtFQUNBLCtCQUFBO0VBQ0EsbUNBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxxSEFBQTtBQVNGO0FBTkU7RUFDRSw4QkFBQTtFQUNBLHVCQUFBO0FBUUo7QUFMRTtFQUNFLG1DQUFBO0VBQ0EsbUJBQUE7QUFPSjtBQUpFO0VBQ0UsWUFBQTtFQUNBLGVBQUE7QUFNSjs7QUFGQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7RUFDQSxXQUFBO0VBQ0EsMkJBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLGlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQ0FBQTtFQUNBLGVBQUE7QUFLRjtBQUhFO0VBQ0UsbUNBQUE7RUFDQSxtQkFBQTtFQUNBLGtDQUFBO0FBS0o7O0FBREE7RUVqUEUsWUFBQTtFQUNBLG1CQUZpQztFQUdqQyxxQ0FBQTtFQUNBLGdDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0ZBQUE7RUY2T0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxtQ0FBQTtBQVVGO0FFdlBFO0VBQ0Usc0JBQUE7QUZ5UEo7QUV0UEU7RUFDRSxhQUFBO0VBQ0EsZUFBQTtBRndQSjtBRXJQRTtFQUNFLGlDQUFBO0VBQ0EsbUJBQUE7QUZ1UEoiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTa2VsZXRvbiBkZSBjYXJnYSBjb24gYmFycmlkbyBkZSBzaGltbWVyIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gbGl0ZXJhbG1lbnRlXG4vLyBlbiB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgKGJvcmRlci1yYWRpdXMsIGhlaWdodCwgd2lkdGgsIHZhcmlhbnRlcyBjb24gbm9tYnJlKS5cbkBtaXhpbiB0Zi1za2VsZXRvbi1zaGltbWVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuXG4gICY6OmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHRyYW5zcGFyZW50LCB2YXIoLS10Zi1zaGltbWVyKSwgdHJhbnNwYXJlbnQpO1xuICAgIGFuaW1hdGlvbjogdGYtc2hpbW1lciAxLjRzIGluZmluaXRlO1xuICB9XG5cbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICAmOjphZnRlciB7XG4gICAgICBhbmltYXRpb246IG5vbmU7XG4gICAgfVxuICB9XG59XG5cbkBrZXlmcmFtZXMgdGYtc2hpbW1lciB7XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgfVxufVxuIiwiQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vdGhlbWUvc2tlbGV0b24nO1xuQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vdGhlbWUvYnV0dG9ucyc7XG5AaW1wb3J0ICcuLi8uLi8uLi8uLi8uLi90aGVtZS9pbnB1dHMnO1xuXG4uY29tcG9zZS1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1iZyk7XG4gIC0tcGFkZGluZy1zdGFydDogdmFyKC0tdGYtc3BhY2UtNCk7XG4gIC0tcGFkZGluZy1lbmQ6IHZhcigtLXRmLXNwYWNlLTQpO1xuICAtLXBhZGRpbmctdG9wOiB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgLS1wYWRkaW5nLWJvdHRvbTogdmFyKC0tdGYtc3BhY2UtNik7XG59XG5cbi5wYWdlLWhpbnQge1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgbWFyZ2luOiAwIDAgdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGxpbmUtaGVpZ2h0OiAxLjQ7XG59XG5cbi5maWVsZC1yb3cge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XG4gIGdhcDogMTBweDtcbn1cblxuLmlucHV0LXdyYXBwZXIge1xuICBAaW5jbHVkZSB0Zi1pbnB1dC13cmFwcGVyKHZhcigtLXRmLXN1cmZhY2UtMikpO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogNTBweDtcbiAgbWFyZ2luLWJvdHRvbTogdmFyKC0tdGYtc3BhY2UtMyk7XG59XG5cbi5pbnB1dC1pY29uIHtcbiAgQGluY2x1ZGUgdGYtaW5wdXQtaWNvbjtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtbGcpO1xufVxuXG4uaW5wdXQtZmllbGQge1xuICBAaW5jbHVkZSB0Zi1pbnB1dC1maWVsZDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtYmFzZSk7XG59XG5cbi8vIExhIGZsZWNoYSBuYXRpdmEgZGVsIDxzZWxlY3Q+IGRlc2FwYXJlY2UgY29uIGFwcGVhcmFuY2U6bm9uZSDDosKAwpQgc2Vcbi8vIHN1c3RpdHV5ZSBwb3IgdW5hIHByb3BpYSAobWlzbW8gcGF0csODwrNuIHF1ZSBjaGVja2lucy5wYWdlLnNjc3Ncbi8vIC5jbGllbnQtc2VsZWN0KSBwYXJhIG5vIHBlcmRlciBsYSBzZcODwrFhbCBkZSBcImVzdG8gc2UgcHVlZGUgZGVzcGxlZ2FyXCIuXG4uc2VsZWN0LWZpZWxkIHtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWwsJTNDc3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzE0JyBoZWlnaHQ9JzE0JyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nJTIzOGI4YjhiJyBzdHJva2Utd2lkdGg9JzIuNScgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyUzRSUzQ3BvbHlsaW5lIHBvaW50cz0nNiA5IDEyIDE1IDE4IDknJTNFJTNDL3BvbHlsaW5lJTNFJTNDL3N2ZyUzRVwiKTtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogcmlnaHQgMCBjZW50ZXI7XG4gIHBhZGRpbmctcmlnaHQ6IHZhcigtLXRmLXNwYWNlLTUpO1xufVxuXG4uZm9vZC1pdGVtLWNhcmQge1xuICBwYWRkaW5nOiB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgbWFyZ2luLWJvdHRvbTogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1tZCk7XG59XG5cbi5mb29kLWl0ZW0taGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBtYXJnaW4tYm90dG9tOiB2YXIoLS10Zi1zcGFjZS0yKTtcbn1cblxuLmZvb2QtaXRlbS10aXRsZSB7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbn1cblxuLy8gVGFyZ2V0IHTDg8KhY3RpbCA0NHB4IChQUk9EVUNULm1kKSBhdW5xdWUgZWwgaWNvbm8gc2lnYSBzaWVuZG8gcGVxdWXDg8KxbyDDosKAwpRcbi8vIGVsIGJvdMODwrNuIHZpdmUgZW4gdW5hIGZpbGEgY29tcGFjdGEsIGFzw4PCrSBxdWUgc29sbyBsYSBjYWphIGRlIHRvcXVlIGNyZWNlLlxuLnJlbW92ZS1hbHRlcm5hdGl2ZS1idG4ge1xuICB3aWR0aDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgaGVpZ2h0OiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICBtYXJnaW46IGNhbGMoKHZhcigtLXRmLXRvdWNoLW1pbikgLSAyMHB4KSAvIC0yKSBjYWxjKCh2YXIoLS10Zi10b3VjaC1taW4pIC0gMjBweCkgLyAtMikgY2FsYygodmFyKC0tdGYtdG91Y2gtbWluKSAtIDIwcHgpIC8gLTIpIDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtc20pO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZmxleC1zaHJpbms6IDA7XG4gIHRyYW5zaXRpb246IGNvbG9yIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICB9XG5cbiAgJjpob3ZlciB7XG4gICAgY29sb3I6IHZhcigtLXRmLWRhbmdlcik7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLnByb2R1Y3QtcGljay1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTIpO1xuICBwYWRkaW5nOiB2YXIoLS10Zi1zcGFjZS0zKSB2YXIoLS10Zi1zcGFjZS0zKSB2YXIoLS10Zi1zcGFjZS0zKSAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VjY2Vzcy1zb2Z0KTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtc3VjY2Vzcy1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbWQpO1xuXG4gIC5pbnB1dC1pY29uIHtcbiAgICBjb2xvcjogdmFyKC0tdGYtc3VjY2Vzcyk7XG4gIH1cbn1cblxuLnBpY2tlZC1wcm9kdWN0LW5hbWUge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWJhc2UpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG4uY2xlYXItcHJvZHVjdC1idG4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IHZhcigtLXRmLXRvdWNoLW1pbik7XG4gIGhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgbWFyZ2luOiBjYWxjKCh2YXIoLS10Zi10b3VjaC1taW4pIC0gMjBweCkgLyAtMikgY2FsYygodmFyKC0tdGYtdG91Y2gtbWluKSAtIDIwcHgpIC8gLTIpIGNhbGMoKHZhcigtLXRmLXRvdWNoLW1pbikgLSAyMHB4KSAvIC0yKSAwO1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1zbSk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmbGV4LXNocmluazogMDtcbiAgdHJhbnNpdGlvbjogY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6aG92ZXIge1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxufVxuXG4uc2VhcmNoLXByb2R1Y3QtYnRuIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgbWFyZ2luLWJvdHRvbTogdmFyKC0tdGYtc3BhY2UtMik7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTIpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtc29mdCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWFjY2VudC1zb2Z0LWJvcmRlcik7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1tZCk7XG4gIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmhvdmVyIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLnNuaXBwZXQtYWN0aW9ucy1yb3cge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XG4gIGdhcDogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogdmFyKC0tdGYtc3BhY2UtMik7XG5cbiAgLmFkZC1hbHRlcm5hdGl2ZS1idG4ge1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gIH1cbn1cblxuLmFkZC1hbHRlcm5hdGl2ZS1idG4ge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICBtYXJnaW4tYm90dG9tOiB2YXIoLS10Zi1zcGFjZS00KTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IDFweCBkYXNoZWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZ2VzdCk7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1sZyk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWJhc2UpO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCksXG4gICAgY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6bm90KDpkaXNhYmxlZCk6aG92ZXIge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgICBjb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgfVxuXG4gICY6bm90KDpkaXNhYmxlZCk6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNDtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gIH1cbn1cblxuLnNuaXBwZXQtc2F2ZS1saW5rIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IHZhcigtLXRmLXRvdWNoLW1pbik7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbWFyZ2luLWJvdHRvbTogdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGN1cnNvcjogcG9pbnRlcjtcblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLXNtKTtcbiAgfVxufVxuXG4uc3VibWl0LWJ1dHRvbiB7XG4gIEBpbmNsdWRlIHRmLWdyYWRpZW50LWJ1dHRvbjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNTBweDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtYmFzZSk7XG59XG4iLCIvLyBGaWxhIGRlIGlucHV0IGNvbiBpY29ubyAod3JhcHBlciArIGljb25vICsgY2FtcG8pIMOiwoDClCByZXBldGlkYSBlbiA0IHDDg8KhZ2luYXNcbi8vIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuIEVsIGZvbmRvXG4vLyBkZWwgd3JhcHBlciBlcyBlbCDDg8K6bmljbyB2YWxvciBxdWUgdmFyw4PCrWEgcG9yIHDDg8KhZ2luYSAoc3VwZXJmaWNpZSAxIG8gMiBzZWfDg8K6blxuLy8gY29udGV4dG8gdmlzdWFsKSwgZGUgYWjDg8KtIGVsIHBhcsODwqFtZXRybzsgdGFtYcODwrFvIGRlIGZ1ZW50ZS9hbHRvL21hcmdlbiBzZVxuLy8gZGVqYW4gZnVlcmEgZGVsIG1peGluIHBvcnF1ZSBjYWRhIHDDg8KhZ2luYSBsb3MgZmlqYSBzZWfDg8K6biBzdSBwcm9waW8gbGF5b3V0LlxuQG1peGluIHRmLWlucHV0LXdyYXBwZXIoJGJnOiB2YXIoLS10Zi1zdXJmYWNlLTEpKSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgYmFja2dyb3VuZDogJGJnO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMCAxNHB4O1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6Zm9jdXMtd2l0aGluIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIH1cbn1cblxuQG1peGluIHRmLWlucHV0LWljb24ge1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG5AbWl4aW4gdGYtaW5wdXQtZmllbGQge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGhlaWdodDogMTAwJTtcblxuICAmOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG59XG4iLCIvLyBCb3TDg8KzbiBDVEEgY29uIGdyYWRpZW50ZSBkZSBhY2VudG8gw6LCgMKUIG1pc21vIGJsb3F1ZSByZXBldGlkbyBlbiB+MTEgc2l0aW9zIGRlXG4vLyB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgcG9yIGxheW91dCAod2lkdGgsIGhlaWdodCwgZm9udC1zaXplLCBtYXJnaW4pLlxuLy9cbi8vIExhIG1pdGFkIGRlIGxvcyBzaXRpb3Mgb3JpZ2luYWxlcyBubyB0ZW7Dg8KtYW4gdHJhbnNpY2nDg8Kzbi9mZWVkYmFjayBkZSBwdWxzYWNpw4PCs25cbi8vIG5pIDpmb2N1cy12aXNpYmxlIMOiwoDClCBlbCBtaXhpbiBsb3MgYcODwrFhZGUgc2llbXByZSwgY2llcnJhIGVzZSBodWVjbyBkZVxuLy8gY29uc2lzdGVuY2lhIGRlIGludGVyYWNjacODwrNuIChQUk9EVUNULm1kOiBcInVuIHNvbG8gcGF0csODwrNuIHBvciB0aXBvIGRlXG4vLyBjb21wb25lbnRlXCIpIGVuIHZleiBkZSBwZXJwZXR1YXIgbGEgdmFyaWFjacODwrNuIGFjY2lkZW50YWwuXG5AbWl4aW4gdGYtZ3JhZGllbnQtYnV0dG9uKCRyYWRpdXM6IDEycHgpIHtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAkcmFkaXVzO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtZ3JhZGllbnQpO1xuICBjb2xvcjogdmFyKC0tdGYtYWNjZW50LWNvbnRyYXN0KTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpLCBvcGFjaXR5IDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk3KTtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNDU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtdGV4dCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxufVxuXG4vLyBCb3TDg8KzbiBkZSBoZWFkZXIgcXVlIGVzIHNvbG8gdW4gaWNvbm8gw6LCgMKUIG1pc21vIGxvb2sgXCJlbnZ1ZWx0b1wiIHF1ZSB5YSB1c2EgbGFcbi8vIGFwcCBkZSBjb25zdW1pZG9yIGVuIHN1cyB0b29sYmFycyAocGFja2FnZXMvc2hhcmVkLWZlYXR1cmVzLy4uLi9kaWV0cy9cbi8vIGNvbXBvbmVudHMvdG9vbGJhci1jYWxlbmRhcjogZm9uZG8gKyBib3JkZXItcmFkaXVzICsgY2FqYSBmaWphIDQ0eDQ0LCBlblxuLy8gdmV6IGRlbCBpb24tYnV0dG9uIHBsYW5vL3RyYW5zcGFyZW50ZSBxdWUgdGVuw4PCrWEgY2FkYSBwYW50YWxsYSBkZSB0cmFpbmVyc1xuLy8gaGFzdGEgYWhvcmEpLiBUb2tlbmVhZG8gYSBsYSBwYWxldGEgZGUgZXN0YSBhcHAgZW4gdmV6IGRlIHJlcGV0aXIgbG9zXG4vLyByZ2JhKDI1NSwyNTUsMjU1LC4uLikgc3VlbHRvcyBkZWwgb3JpZ2luYWwuXG4vL1xuLy8gU2lydmUgdGFudG8gcGFyYSA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIj4gKHVzYSBsYXMgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzXG4vLyBkZSBJb25pYykgY29tbyBwYXJhIHVuIDxidXR0b24+IG5hdGl2byAodXNhIGxhcyBwcm9waWVkYWRlcyBwbGFuYXMpIMOiwoDClFxuLy8gYW1ib3MgY29leGlzdGVuIGhveSBlbiB0cmFpbmVycyBwYXJhIGVsIG1pc21vIHJvbCBkZSBcInZvbHZlclwiL1wiY2VycmFyXCIuXG5AbWl4aW4gdGYtaWNvbi1idXR0b24oJHNpemU6IDQ0cHgsICRyYWRpdXM6IDEycHgsICRpY29uLXNpemU6IDIwcHgpIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICAtLWJhY2tncm91bmQtYWN0aXZhdGVkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtaG92ZXI6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIC0tYmFja2dyb3VuZC1mb2N1c2VkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIC0tYm9yZGVyLXJhZGl1czogI3skcmFkaXVzfTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAtLXBhZGRpbmctZW5kOiAwO1xuICAtLXBhZGRpbmctdG9wOiAwO1xuICAtLXBhZGRpbmctYm90dG9tOiAwO1xuXG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgd2lkdGg6ICRzaXplO1xuICBoZWlnaHQ6ICRzaXplO1xuICBtaW4td2lkdGg6ICRzaXplO1xuICBtaW4taGVpZ2h0OiAkc2l6ZTtcbiAgbWFyZ2luOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICBjb2xvciB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAkaWNvbi1zaXplO1xuICB9XG59XG5cbi8vIEV4cGFuc29yIGludmlzaWJsZSBkZSB6b25hIHB1bHNhYmxlLlxuLy9cbi8vIFBBUkEgUVXDg8KJOiB1biBjb250cm9sIGNvbXBhY3RvICh1biBpY29ubyBkZSAzMiBweCBlbiB1bmEgZmlsYSBkZSB0YWJsYSwgdW5cbi8vIGVubGFjZSBkZSB0ZXh0byBkZSAxNiBweCkgbm8gbGxlZ2EgYSBsb3MgNDQgcHggcXVlIGV4aWdlIFBST0RVQ1QubWQsIHlcbi8vIGVuZ29yZGFybG8gZGUgdmVyZGFkIGRlc3BsYXphIHRvZG8gbG8gcXVlIHRpZW5lIGFscmVkZWRvciDDosKAwpQgZW4gdW5hIHRhYmxhXG4vLyBkZSB2ZWludGUgZmlsYXMsIDggcHggcG9yIGZpbGEgc29uIG1lZGlhIHBhbnRhbGxhLlxuLy9cbi8vIEVsIHBzZXVkb2VsZW1lbnRvIGNyZWNlIGhhY2lhIGZ1ZXJhIHNpbiBvY3VwYXIgc2l0aW8gZW4gZWwgZmx1am8sIGFzw4PCrSBxdWVcbi8vIGVsIGJvdMODwrNuIHNlIHZlIHBlcXVlw4PCsW8geSBzZSBwdWxzYSBncmFuZGUuXG4vL1xuLy8gQVZJU08gREUgTUVESUNJw4PCk046IGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIE5PIHZlIGVzdGUgcHNldWRvZWxlbWVudG8sIGFzw4PCrVxuLy8gcXVlIGFsIHZlcmlmaWNhciBoYXkgcXVlIHVzYXIgZWxlbWVudEZyb21Qb2ludCBjb24gZWwgZWxlbWVudG8gZGVudHJvIGRlbFxuLy8gdmlld3BvcnQuIEFkZW3Dg8KhcyBlbCBoaXQtdGVzdCBkZXZ1ZWx2ZSAyIHB4IG1lbm9zIHF1ZSBsYSBjYWphIGRlY2xhcmFkYVxuLy8gKGNvbXByb2JhZG86IC00cHggZGEgNDIsIC02cHggZGEgNDYpLCBhc8ODwq0gcXVlIHVuIDQyIG1lZGlkbyBzb24gNDQgcmVhbGVzLlxuLy9cbi8vICRncm93OiBjdcODwqFudG8gY3JlY2UgcG9yIGNhZGEgbGFkby4gNHB4IGxsZXZhIHVuIGNvbnRyb2wgZGUgMzYgcHggYSA0NC5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlcigkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldDogLSN7JGdyb3d9O1xuICB9XG59XG5cbi8vIFZhcmlhbnRlIHF1ZSBzb2xvIGNyZWNlIGVuIFZFUlRJQ0FMLiBQYXJhIGNvbnRyb2xlcyBlbiBmaWxhIGRvbmRlIGVsXG4vLyBleHBhbnNvciBob3Jpem9udGFsIHNlIHNvbGFwYXLDg8KtYSBjb24gZWwgZGUgYWwgbGFkbyB5IHJvYmFyw4PCrWEgc3VzIHRvcXVlcy5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlci15KCRncm93OiA0cHgpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogLSN7JGdyb3d9O1xuICAgIGJvdHRvbTogLSN7JGdyb3d9O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
}));


/***/ }),

/***/ 63194:
/*!****************************************************************************!*\
  !*** ./src/app/features/meal-compose/services/meal-compose-api.service.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MealComposeApiService: () => (/* binding */ MealComposeApiService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/http/http.service */ 88552);

var _MealComposeApiService;


class MealComposeApiService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  applyToClients(body) {
    return this.http.post('trainer/meals/apply-to-clients', body);
  }
}
_MealComposeApiService = MealComposeApiService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealComposeApiService, "\u0275fac", function MealComposeApiService_Factory(t) {
  return new (t || _MealComposeApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealComposeApiService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _MealComposeApiService,
  factory: _MealComposeApiService.ɵfac,
  providedIn: 'root'
}));


/***/ })

}]);
//# sourceMappingURL=src_app_features_meal-compose_meal-compose_module_ts.js.map