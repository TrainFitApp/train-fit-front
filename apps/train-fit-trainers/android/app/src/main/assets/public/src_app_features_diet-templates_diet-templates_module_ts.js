"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_features_diet-templates_diet-templates_module_ts"],{

/***/ 58912:
/*!**************************************************************************!*\
  !*** ./src/app/features/diet-templates/diet-templates-routing.module.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DietTemplatesPageRoutingModule: () => (/* binding */ DietTemplatesPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _pages_diet_templates_list_diet_templates_list_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/diet-templates-list/diet-templates-list.page */ 75318);
/* harmony import */ var _pages_diet_template_builder_diet_template_builder_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/diet-template-builder/diet-template-builder.page */ 77406);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);

var _DietTemplatesPageRoutingModule;





const routes = [{
  path: '',
  component: _pages_diet_templates_list_diet_templates_list_page__WEBPACK_IMPORTED_MODULE_1__.DietTemplatesListPage
},
// "Crear dieta" — mismo builder, en modo "para este cliente" en vez de
// "editar plantilla existente" (ver diet-template-builder.page.ts).
{
  path: 'for-client/:clientId',
  component: _pages_diet_template_builder_diet_template_builder_page__WEBPACK_IMPORTED_MODULE_2__.DietTemplateBuilderPage
}, {
  path: ':id',
  component: _pages_diet_template_builder_diet_template_builder_page__WEBPACK_IMPORTED_MODULE_2__.DietTemplateBuilderPage
}];
class DietTemplatesPageRoutingModule {}
_DietTemplatesPageRoutingModule = DietTemplatesPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DietTemplatesPageRoutingModule, "\u0275fac", function DietTemplatesPageRoutingModule_Factory(t) {
  return new (t || _DietTemplatesPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DietTemplatesPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _DietTemplatesPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DietTemplatesPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](DietTemplatesPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ }),

/***/ 15761:
/*!******************************************************************!*\
  !*** ./src/app/features/diet-templates/diet-templates.module.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DietTemplatesPageModule: () => (/* binding */ DietTemplatesPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _diet_templates_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./diet-templates-routing.module */ 58912);
/* harmony import */ var _shared_components_product_search_modal_product_search_modal_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/components/product-search-modal/product-search-modal.module */ 56368);
/* harmony import */ var _shared_components_meal_snippet_picker_meal_snippet_picker_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/meal-snippet-picker/meal-snippet-picker.module */ 32470);
/* harmony import */ var src_app_features_diets_components_meal_components_search_foods_components_create_product_create_product_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/features/diets/components/meal/components/search-foods/components/create-product/create-product.module */ 40048);
/* harmony import */ var _shared_components_recipe_builder_modal_recipe_builder_modal_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/components/recipe-builder-modal/recipe-builder-modal.module */ 53152);
/* harmony import */ var _shared_components_recipe_ingredients_editor_modal_recipe_ingredients_editor_modal_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/components/recipe-ingredients-editor-modal/recipe-ingredients-editor-modal.module */ 43090);
/* harmony import */ var _shared_components_product_detail_panel_product_detail_panel_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../shared/components/product-detail-panel/product-detail-panel.module */ 20176);
/* harmony import */ var _pages_diet_templates_list_diet_templates_list_page__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./pages/diet-templates-list/diet-templates-list.page */ 75318);
/* harmony import */ var _pages_diet_template_builder_diet_template_builder_page__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./pages/diet-template-builder/diet-template-builder.page */ 77406);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 69717);

var _DietTemplatesPageModule;











class DietTemplatesPageModule {}
_DietTemplatesPageModule = DietTemplatesPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DietTemplatesPageModule, "\u0275fac", function DietTemplatesPageModule_Factory(t) {
  return new (t || _DietTemplatesPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DietTemplatesPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineNgModule"]({
  type: _DietTemplatesPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(DietTemplatesPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _diet_templates_routing_module__WEBPACK_IMPORTED_MODULE_2__.DietTemplatesPageRoutingModule, _shared_components_product_search_modal_product_search_modal_module__WEBPACK_IMPORTED_MODULE_3__.ProductSearchModalModule, _shared_components_meal_snippet_picker_meal_snippet_picker_module__WEBPACK_IMPORTED_MODULE_4__.MealSnippetPickerModule, src_app_features_diets_components_meal_components_search_foods_components_create_product_create_product_module__WEBPACK_IMPORTED_MODULE_5__.CreateProductPageModule, _shared_components_recipe_builder_modal_recipe_builder_modal_module__WEBPACK_IMPORTED_MODULE_6__.RecipeBuilderModalModule, _shared_components_recipe_ingredients_editor_modal_recipe_ingredients_editor_modal_module__WEBPACK_IMPORTED_MODULE_7__.RecipeIngredientsEditorModalModule, _shared_components_product_detail_panel_product_detail_panel_module__WEBPACK_IMPORTED_MODULE_8__.ProductDetailPanelModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsetNgModuleScope"](DietTemplatesPageModule, {
    declarations: [_pages_diet_templates_list_diet_templates_list_page__WEBPACK_IMPORTED_MODULE_9__.DietTemplatesListPage, _pages_diet_template_builder_diet_template_builder_page__WEBPACK_IMPORTED_MODULE_10__.DietTemplateBuilderPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _diet_templates_routing_module__WEBPACK_IMPORTED_MODULE_2__.DietTemplatesPageRoutingModule, _shared_components_product_search_modal_product_search_modal_module__WEBPACK_IMPORTED_MODULE_3__.ProductSearchModalModule, _shared_components_meal_snippet_picker_meal_snippet_picker_module__WEBPACK_IMPORTED_MODULE_4__.MealSnippetPickerModule, src_app_features_diets_components_meal_components_search_foods_components_create_product_create_product_module__WEBPACK_IMPORTED_MODULE_5__.CreateProductPageModule, _shared_components_recipe_builder_modal_recipe_builder_modal_module__WEBPACK_IMPORTED_MODULE_6__.RecipeBuilderModalModule, _shared_components_recipe_ingredients_editor_modal_recipe_ingredients_editor_modal_module__WEBPACK_IMPORTED_MODULE_7__.RecipeIngredientsEditorModalModule, _shared_components_product_detail_panel_product_detail_panel_module__WEBPACK_IMPORTED_MODULE_8__.ProductDetailPanelModule]
  });
})();

/***/ }),

/***/ 28457:
/*!*****************************************************************************************************************************************!*\
  !*** ./src/app/features/diet-templates/pages/diet-template-builder/components/day-meal-editor-modal/day-meal-editor-modal.component.ts ***!
  \*****************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DayMealEditorModalComponent: () => (/* binding */ DayMealEditorModalComponent)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _shared_components_product_search_modal_product_search_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../shared/components/product-search-modal/product-search-modal.component */ 78381);
/* harmony import */ var src_app_features_diets_components_meal_components_search_foods_components_create_product_create_product_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/features/diets/components/meal/components/search-foods/components/create-product/create-product.page */ 75627);
/* harmony import */ var src_app_features_diets_components_meal_components_search_foods_search_foods_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/features/diets/components/meal/components/search-foods/search-foods.page */ 65693);
/* harmony import */ var _shared_components_meal_snippet_picker_meal_snippet_picker_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../shared/components/meal-snippet-picker/meal-snippet-picker.component */ 51111);
/* harmony import */ var _shared_components_recipe_builder_modal_recipe_builder_modal_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../shared/components/recipe-builder-modal/recipe-builder-modal.component */ 41853);
/* harmony import */ var _shared_components_recipe_ingredients_editor_modal_recipe_ingredients_editor_modal_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../shared/components/recipe-ingredients-editor-modal/recipe-ingredients-editor-modal.component */ 47075);
/* harmony import */ var _shared_components_product_detail_panel_product_detail_panel_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../shared/components/product-detail-panel/product-detail-panel.component */ 85965);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _shared_services_meal_snippet_api_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../shared/services/meal-snippet-api.service */ 20790);
/* harmony import */ var src_app_core_services_custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/core/services/custom-product/custom-product.service */ 57846);
/* harmony import */ var src_app_core_services_recipe_recipe_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/core/services/recipe/recipe.service */ 50888);


var _DayMealEditorModalComponent;


















function DayMealEditorModalComponent_p_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "p", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](1, " A\u00F1ade una composici\u00F3n para esta comida, o 2 o m\u00E1s opciones nombradas para que el cliente elija cu\u00E1l come ese d\u00EDa. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}
function DayMealEditorModalComponent_div_12_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 25)(1, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "div", 27)(4, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function DayMealEditorModalComponent_div_12_div_1_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r10);
      const i_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().index;
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r8.duplicateAlternative(i_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](5, "ion-icon", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function DayMealEditorModalComponent_div_12_div_1_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r10);
      const i_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().index;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r11.removeAlternative(i_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](7, "ion-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const i_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().index;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"]("Opci\u00F3n ", ctx_r4.meal.alternatives.length - i_r3, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r4.meal.alternatives.length >= ctx_r4.maxAlternatives);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r4.meal.alternatives.length <= 1);
  }
}
const _c0 = function () {
  return {
    standalone: true
  };
};
function DayMealEditorModalComponent_div_12_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "ion-icon", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](2, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngModelChange", function DayMealEditorModalComponent_div_12_div_2_Template_input_ngModelChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r16);
      const alt_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](alt_r2.label = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const alt_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngModel", alt_r2.label)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpureFunction0"](2, _c0));
  }
}
function DayMealEditorModalComponent_div_12_ng_container_3_div_1_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function DayMealEditorModalComponent_div_12_ng_container_3_div_1_button_5_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r27);
      const j_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2).index;
      const i_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().index;
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r25.editRecipeIngredients(i_r3, j_r19));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "ion-icon", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}
function DayMealEditorModalComponent_div_12_ng_container_3_div_1_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "button", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function DayMealEditorModalComponent_div_12_ng_container_3_div_1_button_6_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r31);
      const j_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2).index;
      const i_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().index;
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r29.removeFoodItem(i_r3, j_r19));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "ion-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}
function DayMealEditorModalComponent_div_12_ng_container_3_div_1_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 52)(1, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](3, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](5, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](7, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](8, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](10, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](11, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](12, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](13, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](15, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](16, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](17, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](18, "span", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipe"](20, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const item_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind2"](5, 4, item_r18.kcal, "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind2"](10, 7, item_r18.protein, "1.0-1"), "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind2"](15, 10, item_r18.carbs, "1.0-1"), "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵpipeBind2"](20, 13, item_r18.fat, "1.0-1"), "g");
  }
}
function DayMealEditorModalComponent_div_12_ng_container_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 37)(1, "div", 38)(2, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function DayMealEditorModalComponent_div_12_ng_container_3_div_1_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r36);
      const j_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().index;
      const i_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().index;
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r34.openProductSearch(i_r3, j_r19));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](3, "ion-icon", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](5, DayMealEditorModalComponent_div_12_ng_container_3_div_1_button_5_Template, 2, 0, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](6, DayMealEditorModalComponent_div_12_ng_container_3_div_1_button_6_Template, 2, 0, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](7, "div", 43)(8, "ion-label", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](9, "Cantidad");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](10, "div", 45)(11, "input", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("ngModelChange", function DayMealEditorModalComponent_div_12_ng_container_3_div_1_Template_input_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r36);
      const item_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().$implicit;
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r38.onQuantityChange(item_r18, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](12, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](13, "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](14, DayMealEditorModalComponent_div_12_ng_container_3_div_1_div_14_Template, 21, 16, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().$implicit;
    const alt_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().$implicit;
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r20.isOpeningPicker);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("name", item_r18.recipeId ? "restaurant-outline" : "nutrition-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate1"](" ", item_r18.recipeId ? item_r18.recipeName : item_r18.productName, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", item_r18.recipeId && item_r18.recipe);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", alt_r2.items.length > 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngModel", item_r18.quantity);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", item_r18.kcal !== undefined);
  }
}
function DayMealEditorModalComponent_div_12_ng_container_3_div_2_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "button", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function DayMealEditorModalComponent_div_12_ng_container_3_div_2_button_4_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r45);
      const j_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2).index;
      const i_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().index;
      const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r43.removeFoodItem(i_r3, j_r19));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "ion-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}
function DayMealEditorModalComponent_div_12_ng_container_3_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r49 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 59)(1, "button", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function DayMealEditorModalComponent_div_12_ng_container_3_div_2_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r49);
      const j_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().index;
      const i_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().index;
      const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r47.openProductSearch(i_r3, j_r19));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](2, "ion-icon", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](3, " Buscar producto o receta real ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](4, DayMealEditorModalComponent_div_12_ng_container_3_div_2_button_4_Template, 2, 0, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const alt_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"](2).$implicit;
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx_r21.isOpeningPicker);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", alt_r2.items.length > 1);
  }
}
function DayMealEditorModalComponent_div_12_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, DayMealEditorModalComponent_div_12_ng_container_3_div_1_Template, 15, 7, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](2, DayMealEditorModalComponent_div_12_ng_container_3_div_2_Template, 5, 2, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const item_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", item_r18.productId || item_r18.recipeId);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", !item_r18.productId && !item_r18.recipeId);
  }
}
function DayMealEditorModalComponent_div_12_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r54 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "button", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function DayMealEditorModalComponent_div_12_button_11_Template_button_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r54);
      const i_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]().index;
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r52.saveAsSnippet(i_r3, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](1, "ion-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](2, " Guardar como snippet ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
}
function DayMealEditorModalComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r56 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](1, DayMealEditorModalComponent_div_12_div_1_Template, 8, 3, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](2, DayMealEditorModalComponent_div_12_div_2_Template, 3, 3, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](3, DayMealEditorModalComponent_div_12_ng_container_3_Template, 3, 2, "ng-container", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](4, "div", 21)(5, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function DayMealEditorModalComponent_div_12_Template_button_click_5_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r56);
      const i_r3 = restoredCtx.index;
      const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r55.addFoodItem(i_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](6, "ion-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](7, " A\u00F1adir alimento ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](8, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function DayMealEditorModalComponent_div_12_Template_button_click_8_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵrestoreView"](_r56);
      const i_r3 = restoredCtx.index;
      const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵresetView"](ctx_r57.openSnippetPicker(i_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](9, "ion-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](10, " Insertar snippet ");
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](11, DayMealEditorModalComponent_div_12_button_11_Template, 3, 0, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const alt_r2 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.isMultiple);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx_r1.isMultiple);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngForOf", alt_r2.items)("ngForTrackBy", ctx_r1.trackByIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", alt_r2.items.length >= ctx_r1.maxFoodItemsPerAlternative || ctx_r1.isOpeningPicker);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", alt_r2.items.length >= ctx_r1.maxFoodItemsPerAlternative);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", alt_r2.items.length);
  }
}
// Extraído de diet-template-builder.page.ts a un modal standalone real —
// mismo motivo y mismo arreglo que ApplyCheckinTemplateModalComponent
// (ver comentario ahí): el panel "editor de celda" vivía como un
// <div position:fixed> hecho a mano DENTRO de la página que lo abría, y
// Ionic marca `.ion-page` con `contain: layout` (la convierte en containing
// block de ese `fixed`) — el panel dejaba de posicionarse contra el
// viewport y se apilaba codo a codo con el <ion-header> de esa misma
// página, quedando tapado por él en escritorio. Un ion-modal real
// (ModalController) se adjunta fuera de `.ion-page`, en la capa de
// overlays de Ionic — mismo mecanismo que ya usan sin problema los
// buscadores de productos/ejercicios. cssClass: 'tf-panel-modal' le da el
// mismo aspecto de panel anclado a la derecha en escritorio que tenía el
// div original.
//
// `meal` se recibe por referencia (mismo objeto que vive dentro de
// `days`/`dayPatterns` en la página): las mutaciones aquí dentro
// (añadir/quitar alternativas, alimentos...) se reflejan directamente en
// el tablero al cerrar, sin eventos de salida ni copia de datos.
class DayMealEditorModalComponent {
  constructor(modalController, ionicUtilService, mealSnippetApi, customProductService, recipeService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "mealSnippetApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "customProductService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recipeService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "meal", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dayLabel", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "mode", 'sequential');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "maxAlternatives", 4);
    // Sin límite real de alimentos por alternativa — Infinity mantiene las
    // comparaciones (>=/<) ya escritas en todo el archivo sin tocar cada
    // sitio uno a uno.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "maxFoodItemsPerAlternative", Infinity);
    // Fix4 — sin esto, un doble tap disparaba openProductSearch() dos veces
    // antes de que el primer `await modalController.create()` resolviera,
    // apilando dos SearchFoodsPage y obligando a cerrar el panel dos veces.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isOpeningPicker", false);
    // --- Panel de detalle (ProductDetailPanelComponent) ---
    // Siempre el más a la izquierda de los que estén abiertos: 1 panel de
    // 420px delante (el propio buscador) mientras esté abierto.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "pickerModal", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "detailModal", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "selectionApi", null);
    this.modalController = modalController;
    this.ionicUtilService = ionicUtilService;
    this.mealSnippetApi = mealSnippetApi;
    this.customProductService = customProductService;
    this.recipeService = recipeService;
  }
  dismiss() {
    this.modalController.dismiss();
  }
  // Fase 9 — igual criterio que client-detail.page.ts#prescribeIsMultiple:
  // la etiqueta de cada alternativa solo se pide/muestra cuando hay 2+.
  get isMultiple() {
    return (this.meal?.alternatives.length || 0) >= 2;
  }
  emptyFoodItem() {
    return {};
  }
  // Sin item semilla — antes una alternativa nueva arrancaba con un
  // "Alimento 1" en blanco que exigía un segundo tap ("Buscar producto o
  // receta real") para hacer algo útil. Vacía del todo: solo se ven los
  // botones "Añadir alimento"/"Insertar snippet", y "Añadir alimento" ya
  // abre el buscador real directamente (ver addFoodItem).
  emptyAlternative() {
    return {
      label: '',
      items: []
    };
  }
  // Cada alternativa nueva se pone ARRIBA de las anteriores (más reciente
  // primero) — así lo pidió el trainer, en vez de acumularse al final.
  addAlternative() {
    if (this.meal.alternatives.length >= this.maxAlternatives) return;
    this.meal.alternatives.unshift(this.emptyAlternative());
  }
  // TAREA5 (auditoría UX, Fase E) — la mayoría de alternativas comparten casi
  // todos los alimentos. Duplicar copia la composición entera para editar
  // solo lo que cambia, en vez de repetir el ciclo de búsqueda completo.
  duplicateAlternative(altIndex) {
    if (this.meal.alternatives.length >= this.maxAlternatives) return;
    const source = this.meal.alternatives[altIndex];
    this.meal.alternatives.splice(altIndex + 1, 0, {
      label: source.label ? `${source.label} (copia)` : '',
      items: source.items.map(item => ({
        ...item
      }))
    });
  }
  removeAlternative(altIndex) {
    if (this.meal.alternatives.length <= 1) return;
    this.meal.alternatives.splice(altIndex, 1);
  }
  // Va directo al buscador real (mismo criterio que "Buscar producto o
  // receta real" en un item ya existente) en vez de crear un placeholder
  // "Alimento N" en blanco que hubiera que rellenar en un segundo paso.
  // itemIndex=null en openProductSearch/applyTrainerSelection significa
  // "añade uno nuevo al final", no "rellena este hueco".
  addFoodItem(altIndex) {
    const alt = this.meal.alternatives[altIndex];
    if (!alt || alt.items.length >= this.maxFoodItemsPerAlternative) return;
    void this.openProductSearch(altIndex, null);
  }
  removeFoodItem(altIndex, itemIndex) {
    const alt = this.meal.alternatives[altIndex];
    if (!alt || alt.items.length <= 1) return;
    alt.items.splice(itemIndex, 1);
  }
  // TAREA5 — mismo buscador real search-foods que client-detail (ver ahí el
  // porqué del trainerContext). Aquí no hay cliente/dieta real de por medio
  // (una plantilla es local hasta pulsar "Guardar"), así que los callbacks
  // solo abren el panel de cantidad/confirmar y escriben en el array local.
  // itemIndex: null = añade uno nuevo al final de la alternativa (desde
  // "Añadir alimento"); un índice concreto = rellena/reemplaza ESE hueco
  // (desde "Añadir alimento" sobre un hueco vacío, o al tocar el nombre de
  // un alimento ya elegido para cambiarlo por otro).
  openProductSearch(altIndex, itemIndex) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.isOpeningPicker) return;
      _this.isOpeningPicker = true;
      try {
        const outerModal = yield _this.modalController.create({
          component: src_app_features_diets_components_meal_components_search_foods_search_foods_page__WEBPACK_IMPORTED_MODULE_4__.SearchFoodsPage,
          componentProps: {
            trainerContext: _this.buildSearchFoodsTrainerContext(altIndex, itemIndex, () => void outerModal.dismiss())
          },
          cssClass: 'tf-panel-modal'
        });
        _this.pickerModal = outerModal;
        yield outerModal.present();
        yield outerModal.onDidDismiss();
        _this.pickerModal = null;
        yield _this.closeDetailPanel();
      } finally {
        _this.isOpeningPicker = false;
      }
    })();
  }
  buildSearchFoodsTrainerContext(altIndex, itemIndex, closeOuter) {
    return {
      clientUser: {},
      dietDay: {},
      meal: {},
      targetLabel: this.meal.slot,
      confirmSelection: items => this.applyTrainerSelection(altIndex, itemIndex, items),
      closeSelf: closeOuter,
      registerSelectionApi: api => this.selectionApi = api,
      // Fix5 — CreateProductPage es la pantalla real del cliente (macros/
      // micros/alérgenos/vegano/escáner), no el form reducido de
      // ProductSearchModalComponent. modalMode:true hace que, al guardar,
      // se cierre con {kind:'product', product, quantity:100} — mismo shape
      // que ProductSearchResult, sin importar ese tipo en shared-features.
      pickCreateProduct: () => void this.pickFromModal(src_app_features_diets_components_meal_components_search_foods_components_create_product_create_product_page__WEBPACK_IMPORTED_MODULE_3__.CreateProductPage, {
        modalMode: true
      }, altIndex, itemIndex, closeOuter),
      pickCreateRecipe: () => void this.confirmPickedRecipe(altIndex, itemIndex, closeOuter),
      // Tocar una card en el buscador solo previsualiza (naranja + panel de
      // detalle aparte) — nunca añade directamente. Pulsar "Añadir a
      // {slot}" DENTRO del panel de detalle marca el alimento en la cesta
      // del buscador (como si se tocara el checkbox, con la cantidad puesta
      // ahí) y solo cierra el propio panel de detalle — el buscador sigue
      // abierto para seguir eligiendo. "Añadir N a {slot}" (abajo del
      // buscador) es quien de verdad confirma y cierra todo.
      onFocusItem: item => void this.showDetailPanel(item, quantity => {
        this.selectionApi?.setSelected(item, quantity);
      })
    };
  }
  // No espera a que el panel anterior se cierre antes de abrir el nuevo
  // (ver comentario largo en RecipeBuilderModalComponent#showDetailPanel):
  // tocar producto A y enseguida producto B debe reemplazar el detalle
  // directamente, sin tener que cerrar y volver a tocar B.
  showDetailPanel(item, onAdd) {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const previous = _this2.detailModal;
      const modal = yield _this2.modalController.create({
        component: _shared_components_product_detail_panel_product_detail_panel_component__WEBPACK_IMPORTED_MODULE_8__.ProductDetailPanelComponent,
        componentProps: {
          product: item.kind === 'product' ? item.product : undefined,
          recipe: item.kind === 'recipe' ? item.recipe : undefined,
          quantity: item.quantity,
          onAdd,
          addLabel: `Añadir a ${_this2.meal.slot}`
        },
        // ion-disable-focus-trap: ver comentario largo en
        // RecipeBuilderModalComponent#openIngredientPicker — sin esto, el
        // focus trap global de Ionic secuestraba el foco hacia este panel en
        // cuanto estaba abierto, sin dejar escribir en las cantidades del
        // editor de comida (ni, con el buscador también abierto, en él).
        cssClass: 'tf-panel-modal-detail-1 ion-disable-focus-trap',
        // sin esto, el backdrop invisible (showBackdrop:false NO desactiva
        // backdropDismiss) se comía el primer click sobre otro producto —
        // lo interpretaba como "tocar fuera" y cerraba el panel en vez de
        // dejar pasar el click a la card de debajo.
        showBackdrop: false,
        backdropDismiss: false
      });
      _this2.detailModal = modal;
      if (previous) yield previous.dismiss();
      yield modal.present();
      void modal.onDidDismiss().then(() => {
        if (_this2.detailModal === modal) _this2.detailModal = null;
      });
    })();
  }
  closeDetailPanel() {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this3.detailModal) {
        yield _this3.detailModal.dismiss();
        _this3.detailModal = null;
      }
    })();
  }
  // TAREA5 (auditoría UX) — igual que client-detail: el primer alimento
  // marcado rellena el hueco actual (si itemIndex apunta a uno), el resto
  // se añade como alimentos nuevos de la misma alternativa, sin repetir la
  // búsqueda. itemIndex=null trata TODAS las selecciones como "nuevas".
  applyTrainerSelection(altIndex, itemIndex, items) {
    const alt = this.meal.alternatives[altIndex];
    if (!alt || !items.length) return;
    items.forEach((selection, i) => {
      let targetIndex;
      if (itemIndex !== null && i === 0) {
        targetIndex = itemIndex;
      } else {
        if (alt.items.length >= this.maxFoodItemsPerAlternative) return;
        alt.items.push(this.emptyFoodItem());
        targetIndex = alt.items.length - 1;
      }
      this.assignSelectionToItem(alt.items[targetIndex], selection);
    });
  }
  // Escribe la selección (producto o receta real) en el item Y cachea su
  // snapshot de macros (ver comentario en TemplateFoodItem) reutilizando
  // CustomProductService.getMacros()/RecipeService.calculateCustomRecipeTotals()
  // — el mismo cálculo que ya usan las cards de search-foods, no una copia.
  assignSelectionToItem(item, selection) {
    if (selection.kind === 'recipe' && selection.recipe) {
      item.recipeId = selection.recipe._id;
      item.recipeName = selection.recipe.name;
      item.recipe = selection.recipe;
      item.productId = undefined;
      item.productName = undefined;
      item.product = undefined;
      item.quantity = selection.quantity ?? undefined;
      // Receta nueva en este hueco: cualquier personalización de
      // ingredientes de la receta ANTERIOR no aplica a esta.
      item.addedCustomProducts = undefined;
      item.modifiedBaseCustomProducts = undefined;
      item.removedBaseCustomProductIds = undefined;
      this.recalculateItemMacros(item);
    } else if (selection.kind === 'product' && selection.product) {
      item.productId = selection.product._id;
      item.productName = selection.product.name;
      item.product = selection.product;
      item.recipeId = undefined;
      item.recipeName = undefined;
      item.recipe = undefined;
      item.addedCustomProducts = undefined;
      item.modifiedBaseCustomProducts = undefined;
      item.removedBaseCustomProductIds = undefined;
      item.quantity = selection.quantity ?? undefined;
      this.recalculateItemMacros(item);
    }
  }
  // Fix — cantidad editable in situ (mismo criterio que la cesta de
  // selección múltiple en search-foods.page.html): recalcula el snapshot
  // de macros con el producto/receta real ya cacheado en el item, sin
  // reabrir el buscador.
  onQuantityChange(item, value) {
    const parsed = parseFloat(value);
    item.quantity = Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
    this.recalculateItemMacros(item);
  }
  recalculateItemMacros(item) {
    if (item.recipe) {
      const macros = this.recipeService.calculateCustomRecipeTotals(item.recipe, {
        quantity: item.quantity ?? undefined,
        quantityCooked: null,
        addedCustomProducts: item.addedCustomProducts,
        modifiedBaseCustomProducts: item.modifiedBaseCustomProducts,
        removedBaseCustomProductIds: item.removedBaseCustomProductIds
      }).portionMacros;
      item.kcal = macros.kcal;
      item.protein = macros.protein;
      item.carbs = macros.carbs;
      item.fat = macros.fat;
    } else if (item.product) {
      const macros = this.customProductService.getMacros({
        product: item.product,
        quantity: item.quantity ?? 100
      });
      item.kcal = macros.kcal;
      item.protein = macros.protein;
      item.carbs = macros.carbs;
      item.fat = macros.fat;
    }
  }
  // Fix7 — crear una receta nueva reutiliza el mismo paso de "confirmar
  // cantidad" que ya existe para recetas EXISTENTES (ProductSearchModalComponent
  // con preselectedRecipe salta directo a ese paso), en vez de duplicar esa UI.
  confirmPickedRecipe(altIndex, itemIndex, closeOuter) {
    var _this4 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const builderModal = yield _this4.modalController.create({
        component: _shared_components_recipe_builder_modal_recipe_builder_modal_component__WEBPACK_IMPORTED_MODULE_6__.RecipeBuilderModalComponent,
        cssClass: 'tf-panel-modal'
      });
      yield builderModal.present();
      const {
        data: recipe,
        role
      } = yield builderModal.onDidDismiss();
      if (role !== 'confirm' || !recipe) return;
      yield _this4.pickFromModal(_shared_components_product_search_modal_product_search_modal_component__WEBPACK_IMPORTED_MODULE_2__.ProductSearchModalComponent, {
        preselectedRecipe: recipe
      }, altIndex, itemIndex, closeOuter);
    })();
  }
  pickFromModal(component, componentProps, altIndex, itemIndex, closeOuter) {
    var _this5 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this5.modalController.create({
        component,
        componentProps,
        cssClass: 'tf-panel-modal'
      });
      yield modal.present();
      const {
        data,
        role
      } = yield modal.onDidDismiss();
      if (role !== 'confirm' || !data) return;
      const alt = _this5.meal.alternatives[altIndex];
      if (!alt) return;
      let item;
      if (itemIndex !== null) {
        item = alt.items[itemIndex];
      } else if (alt.items.length < _this5.maxFoodItemsPerAlternative) {
        item = _this5.emptyFoodItem();
        alt.items.push(item);
      }
      if (!item) return;
      _this5.assignSelectionToItem(item, data);
      closeOuter();
    })();
  }
  // Personalizar los ingredientes de la receta YA elegida en este hueco
  // (añadir/quitar/cambiar cantidad) sin tocar la receta base — mismo caso
  // que ConfigRecipePage en modo "add" del cliente. Distinto de tocar el
  // nombre (que SUSTITUYE la receta entera): esto ajusta la instancia.
  editRecipeIngredients(altIndex, itemIndex) {
    var _this6 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const item = _this6.meal.alternatives[altIndex]?.items[itemIndex];
      if (!item?.recipe) return;
      const modal = yield _this6.modalController.create({
        component: _shared_components_recipe_ingredients_editor_modal_recipe_ingredients_editor_modal_component__WEBPACK_IMPORTED_MODULE_7__.RecipeIngredientsEditorModalComponent,
        componentProps: {
          recipe: item.recipe,
          addedCustomProducts: item.addedCustomProducts || [],
          modifiedBaseCustomProducts: item.modifiedBaseCustomProducts || [],
          removedBaseCustomProductIds: item.removedBaseCustomProductIds || []
        },
        cssClass: 'tf-panel-modal'
      });
      yield modal.present();
      const {
        data,
        role
      } = yield modal.onDidDismiss();
      if (role !== 'confirm' || !data) return;
      item.addedCustomProducts = data.addedCustomProducts;
      item.modifiedBaseCustomProducts = data.modifiedBaseCustomProducts;
      item.removedBaseCustomProductIds = data.removedBaseCustomProductIds;
      _this6.recalculateItemMacros(item);
    })();
  }
  // --- Snippets (TAREA5, Fase C): insertar de golpe, o guardar la
  // alternativa actual como snippet reutilizable en cualquier otra
  // plantilla/cliente ---
  openSnippetPicker(altIndex) {
    var _this7 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this7.modalController.create({
        component: _shared_components_meal_snippet_picker_meal_snippet_picker_component__WEBPACK_IMPORTED_MODULE_5__.MealSnippetPickerComponent,
        cssClass: 'tf-panel-modal'
      });
      yield modal.present();
      const {
        data,
        role
      } = yield modal.onDidDismiss();
      if (role !== 'confirm' || !data) return;
      _this7.insertSnippet(altIndex, data);
    })();
  }
  // Fix3 — snippet.customProducts/customRecipes vienen autopopulados por el
  // backend (mongoose-autopopulate, ver meal-schema.js) con el
  // product/recipe real; el campo productName/recipeName plano nunca
  // existió (se descartaba al guardar, ver mealDao.pasteMeal). Mismo
  // arreglo que customProductsToItems/customRecipesToItems en
  // diet-template-builder.page.ts: leer el nombre del ref poblado, y
  // cachear macros con el mismo cálculo que el resto del constructor.
  insertSnippet(altIndex, snippet) {
    const alt = this.meal.alternatives[altIndex];
    if (!alt) return;
    for (const cp of snippet.customProducts || []) {
      if (alt.items.length >= this.maxFoodItemsPerAlternative) break;
      const raw = cp.product;
      const product = raw && typeof raw === 'object' ? raw : null;
      const productId = product?._id || (typeof raw === 'string' ? raw : undefined);
      if (!productId) continue;
      const quantity = cp.quantity ?? undefined;
      const item = {
        productId,
        productName: product?.name || 'Producto guardado',
        quantity,
        product: product || undefined
      };
      if (product) this.recalculateItemMacros(item);
      alt.items.push(item);
    }
    for (const cr of snippet.customRecipes || []) {
      if (alt.items.length >= this.maxFoodItemsPerAlternative) break;
      const raw = cr.recipe;
      const recipe = raw && typeof raw === 'object' ? raw : null;
      const recipeId = recipe?._id || (typeof raw === 'string' ? raw : undefined);
      if (!recipeId) continue;
      const quantity = cr.quantity ?? undefined;
      const item = {
        recipeId,
        recipeName: recipe?.name || 'Receta guardada',
        quantity,
        recipe: recipe || undefined,
        addedCustomProducts: cr.addedCustomProducts,
        modifiedBaseCustomProducts: cr.modifiedBaseCustomProducts,
        removedBaseCustomProductIds: cr.removedBaseCustomProductIds
      };
      if (recipe) this.recalculateItemMacros(item);
      alt.items.push(item);
    }
  }
  saveAsSnippet(altIndex, event) {
    var _this8 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      event.stopPropagation();
      const alt = _this8.meal.alternatives[altIndex];
      const slot = _this8.meal.slot;
      if (!alt || !alt.items.length || !alt.items.every(i => i.productId || i.recipeId)) return;
      yield _this8.ionicUtilService.showAlert({
        header: 'Guardar como snippet',
        message: 'Reutilizable en cualquier plantilla o cliente, con 1 clic.',
        inputs: [{
          name: 'name',
          type: 'text',
          placeholder: `p. ej. ${slot} habitual`
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
            } = _this8.snippetEntries(alt.items);
            _this8.mealSnippetApi.create(name, customProducts, customRecipes).subscribe({
              next: () => _this8.ionicUtilService.showToast({
                message: `Snippet "${name}" guardado`,
                duration: 2000
              }),
              error: () => _this8.ionicUtilService.showErrorToast('No se pudo guardar el snippet', 'Error', 3000)
            });
            return true;
          }
        }]
      });
    })();
  }
  snippetEntries(items) {
    const customProducts = [];
    const customRecipes = [];
    for (const item of items) {
      if (item.recipeId) {
        customRecipes.push({
          recipe: item.recipeId,
          recipeName: item.recipeName,
          quantity: item.quantity || null,
          addedCustomProducts: (item.addedCustomProducts || []).map(cp => this.recipeService.serializeCustomProductForPersistence(cp)),
          modifiedBaseCustomProducts: item.modifiedBaseCustomProducts || [],
          removedBaseCustomProductIds: item.removedBaseCustomProductIds || []
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
  trackByIndex(index) {
    return index;
  }
}
_DayMealEditorModalComponent = DayMealEditorModalComponent;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(DayMealEditorModalComponent, "\u0275fac", function DayMealEditorModalComponent_Factory(t) {
  return new (t || _DayMealEditorModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_14__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_9__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](_shared_services_meal_snippet_api_service__WEBPACK_IMPORTED_MODULE_10__.MealSnippetApiService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](src_app_core_services_custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_11__.CustomProductService), _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdirectiveInject"](src_app_core_services_recipe_recipe_service__WEBPACK_IMPORTED_MODULE_12__.RecipeService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(DayMealEditorModalComponent, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineComponent"]({
  type: _DayMealEditorModalComponent,
  selectors: [["app-day-meal-editor-modal"]],
  inputs: {
    meal: "meal",
    dayLabel: "dayLabel",
    mode: "mode"
  },
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵStandaloneFeature"]],
  decls: 19,
  vars: 6,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["type", "button", "aria-label", "Cerrar", 1, "tf-page-header__back-button", 3, "click"], ["name", "close-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "editor-modal-content"], ["class", "panel-hint", 4, "ngIf"], ["class", "alternative-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "add-alternative-btn", 3, "disabled", "click"], ["name", "add-outline"], [1, "editor-modal-footer"], ["type", "button", 1, "submit-button", 3, "click"], [1, "panel-hint"], [1, "alternative-card"], ["class", "alternative-header", 4, "ngIf"], ["class", "input-wrapper", 4, "ngIf"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "snippet-actions-row"], ["type", "button", 1, "add-food-item-btn", 3, "disabled", "click"], ["name", "bookmark-outline"], ["type", "button", "class", "snippet-save-link", 3, "click", 4, "ngIf"], [1, "alternative-header"], [1, "alternative-title"], [1, "alternative-actions"], ["type", "button", "title", "Duplicar opci\u00F3n (para cambiar solo un alimento)", "aria-label", "Duplicar opci\u00F3n", 1, "remove-alternative-btn", "alternative-action-copy", 3, "disabled", "click"], ["name", "copy-outline"], ["type", "button", "aria-label", "Eliminar opci\u00F3n", 1, "remove-alternative-btn", "alternative-action-danger", 3, "disabled", "click"], ["name", "trash-outline"], [1, "input-wrapper"], ["name", "pricetag-outline", 1, "input-icon"], ["type", "text", "placeholder", "Etiqueta (p. ej. Desayuno A)", 1, "input-field", 3, "ngModel", "ngModelOptions", "ngModelChange"], ["class", "picked-food-card", 4, "ngIf"], ["class", "empty-food-slot", 4, "ngIf"], [1, "picked-food-card"], [1, "picked-food-header"], ["type", "button", "aria-label", "Cambiar por otro alimento", "title", "Cambiar por otro alimento", 1, "picked-food-name", "picked-food-name-btn", 3, "disabled", "click"], [3, "name"], ["type", "button", "class", "remove-alternative-btn", "aria-label", "Editar ingredientes de la receta", "title", "Editar ingredientes de la receta", 3, "click", 4, "ngIf"], ["type", "button", "class", "remove-alternative-btn", "aria-label", "Eliminar alimento", 3, "click", 4, "ngIf"], [1, "picked-food-qty-row"], [1, "qty-label"], [1, "qty-input-wrapper"], ["type", "number", "min", "1", 1, "qty-input", 3, "ngModel", "ngModelChange"], [1, "qty-unit"], ["class", "picked-food-macros", 4, "ngIf"], ["type", "button", "aria-label", "Editar ingredientes de la receta", "title", "Editar ingredientes de la receta", 1, "remove-alternative-btn", 3, "click"], ["name", "options-outline"], ["type", "button", "aria-label", "Eliminar alimento", 1, "remove-alternative-btn", 3, "click"], [1, "picked-food-macros"], [1, "macro-item"], [1, "macro-dot", "kcal"], [1, "macro-value"], [1, "macro-dot", "protein"], [1, "macro-dot", "carbs"], [1, "macro-dot", "fat"], [1, "empty-food-slot"], ["type", "button", 1, "search-product-btn", 3, "disabled", "click"], ["name", "search-outline"], ["type", "button", 1, "snippet-save-link", 3, "click"]],
  template: function DayMealEditorModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function DayMealEditorModalComponent_Template_button_click_4_listener() {
        return ctx.dismiss();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](5, "ion-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](6, "div", 6)(7, "h1", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](9, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](10, "ion-content", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](11, DayMealEditorModalComponent_p_11_Template, 2, 0, "p", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtemplate"](12, DayMealEditorModalComponent_div_12_Template, 12, 7, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](13, "button", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function DayMealEditorModalComponent_Template_button_click_13_listener() {
        return ctx.addAlternative();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelement"](14, "ion-icon", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](15, " A\u00F1adir alternativa ");
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementStart"](16, "ion-footer", 14)(17, "button", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵlistener"]("click", function DayMealEditorModalComponent_Template_button_click_17_listener() {
        return ctx.dismiss();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtext"](18, "Listo");
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵtextInterpolate2"]("", ctx.dayLabel, " \u00B7 ", ctx.meal.slot, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngIf", ctx.mode === "choice");
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("ngForOf", ctx.meal.alternatives)("ngForTrackBy", ctx.trackByIndex);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵproperty"]("disabled", ctx.meal.alternatives.length >= ctx.maxAlternatives);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_15__.DecimalPipe, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonicModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonLabel],
  styles: [".editor-modal-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n}\n\n.panel-hint[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: var(--tf-text-muted);\n  margin: 0 0 16px;\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n  height: 50px;\n  margin-bottom: 12px;\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  flex-shrink: 0;\n  font-size: 1.1rem;\n}\n\n.input-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n  font-size: 0.9rem;\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.alternative-card[_ngcontent-%COMP%] {\n  padding: 12px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-radius: 12px;\n  margin-bottom: 12px;\n}\n\n.alternative-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 10px;\n}\n\n.alternative-title[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 700;\n  color: var(--tf-text);\n}\n\n.picked-food-card[_ngcontent-%COMP%] {\n  background-color: #141414;\n  border: 1px solid #252525;\n  border-radius: 12px;\n  margin-bottom: 10px;\n  padding: 12px 14px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.picked-food-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.picked-food-name[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-weight: 600;\n  font-size: 0.95rem;\n  color: #fff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.picked-food-name[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 1rem;\n  color: var(--tf-accent);\n}\n\n.picked-food-name-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  padding: 0;\n  text-align: left;\n  cursor: pointer;\n}\n.picked-food-name-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: var(--tf-accent);\n}\n.picked-food-name-btn[_ngcontent-%COMP%]:hover:not(:disabled)   ion-icon[_ngcontent-%COMP%] {\n  color: var(--tf-accent);\n}\n.picked-food-name-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: default;\n}\n\n.picked-food-qty-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  margin-top: 8px;\n}\n\n.qty-label[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--tf-text-muted);\n}\n\n.qty-input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-radius: 8px;\n  padding: 4px 10px;\n}\n\n.qty-input[_ngcontent-%COMP%] {\n  width: 56px;\n  background: transparent;\n  border: none;\n  color: var(--tf-text);\n  font-size: 0.85rem;\n  text-align: right;\n  -moz-appearance: textfield;\n}\n.qty-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.qty-input[_ngcontent-%COMP%]::-webkit-outer-spin-button, .qty-input[_ngcontent-%COMP%]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n.qty-unit[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--tf-text-muted);\n}\n\n.picked-food-macros[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  margin-top: 10px;\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex: 1;\n  justify-content: center;\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot.kcal[_ngcontent-%COMP%] {\n  background: var(--ion-color-primary);\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot.protein[_ngcontent-%COMP%] {\n  background: var(--ion-color-alternative);\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot.carbs[_ngcontent-%COMP%] {\n  background: var(--ion-color-success);\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot.fat[_ngcontent-%COMP%] {\n  background: var(--ion-color-secondary);\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-value[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: rgba(255, 255, 255, 0.85);\n  white-space: nowrap;\n}\n\n.empty-food-slot[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 10px;\n}\n\n.alternative-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 2px;\n  flex-shrink: 0;\n}\n\n.remove-alternative-btn[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 30px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  color: var(--tf-text-muted);\n  cursor: pointer;\n  flex-shrink: 0;\n}\n.remove-alternative-btn[_ngcontent-%COMP%]:hover {\n  color: var(--tf-danger);\n}\n.remove-alternative-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n\n.alternative-action-copy[_ngcontent-%COMP%] {\n  color: var(--tf-text-secondary);\n}\n.alternative-action-copy[_ngcontent-%COMP%]:hover {\n  color: var(--tf-accent);\n}\n\n.alternative-action-danger[_ngcontent-%COMP%] {\n  color: var(--tf-danger);\n  opacity: 0.85;\n}\n.alternative-action-danger[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n}\n\n.search-product-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 42px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  background: var(--tf-accent-soft);\n  border: 1px solid var(--tf-accent-soft-border);\n  border-radius: 10px;\n  color: var(--tf-accent);\n  font-size: 0.84rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n\n.add-food-item-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 38px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  background: transparent;\n  border: 1px dashed var(--tf-border-strong);\n  border-radius: 10px;\n  color: var(--tf-text-muted);\n  font-size: 0.8rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.add-food-item-btn[_ngcontent-%COMP%]:not(:disabled):hover {\n  border-color: var(--tf-accent);\n  color: var(--tf-accent);\n}\n.add-food-item-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n\n.add-alternative-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 44px;\n  margin-bottom: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  background: transparent;\n  border: 1px dashed var(--tf-border-strongest);\n  border-radius: 12px;\n  color: var(--tf-text-secondary);\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.add-alternative-btn[_ngcontent-%COMP%]:not(:disabled):hover {\n  border-color: var(--tf-accent);\n  color: var(--tf-accent);\n}\n.add-alternative-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n\n.snippet-actions-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 10px;\n  margin-bottom: 8px;\n}\n\n.snippet-save-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  width: 100%;\n  background: none;\n  border: none;\n  color: var(--tf-accent);\n  font-size: 0.8rem;\n  font-weight: 600;\n  margin-bottom: 4px;\n  cursor: pointer;\n}\n\n.editor-modal-footer[_ngcontent-%COMP%] {\n  --background: var(--tf-surface-1);\n  padding: 12px 16px;\n  border-top: 1px solid var(--tf-border);\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  width: 100%;\n  height: 50px;\n  font-size: 0.92rem;\n}\n.submit-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZGlldC10ZW1wbGF0ZXMvcGFnZXMvZGlldC10ZW1wbGF0ZS1idWlsZGVyL2NvbXBvbmVudHMvZGF5LW1lYWwtZWRpdG9yLW1vZGFsL2RheS1tZWFsLWVkaXRvci1tb2RhbC5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9faW5wdXRzLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX2J1dHRvbnMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUNFLDBCQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7QUFGRjs7QUFLQTtFQUNFLGtCQUFBO0VBQ0EsMkJBQUE7RUFDQSxnQkFBQTtBQUZGOztBQUtBO0VDWEUsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLCtCRFMwQjtFQ1IxQix5Q0FBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGlEQUFBO0VETUEsWUFBQTtFQUNBLG1CQUFBO0FBS0Y7QUNWRTtFQUNFLDhCQUFBO0FEWUo7O0FBTEE7RUNGRSwyQkFBQTtFQUNBLGNBQUE7RURHQSxpQkFBQTtBQVNGOztBQU5BO0VDRkUsT0FBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EscUJBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7RURIQSxpQkFBQTtBQWdCRjtBQ1hFO0VBQ0UsMkJBQUE7QURhSjs7QUFoQkE7RUFDRSxhQUFBO0VBQ0EsK0JBQUE7RUFDQSxrQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFtQkY7O0FBaEJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtBQW1CRjs7QUFoQkE7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUFtQkY7O0FBYkE7RUFDRSx5QkFBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esd0NBQUE7QUFnQkY7O0FBYkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBZ0JGOztBQWJBO0VBQ0UsT0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFnQkY7QUFkRTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsdUJBQUE7QUFnQko7O0FBVEE7RUFDRSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBWUY7QUFWRTtFQUNFLHVCQUFBO0FBWUo7QUFWSTtFQUNFLHVCQUFBO0FBWU47QUFSRTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBVUo7O0FBTkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0FBU0Y7O0FBTkE7RUFDRSxrQkFBQTtFQUNBLDJCQUFBO0FBU0Y7O0FBTkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsK0JBQUE7RUFDQSxrQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFTRjs7QUFOQTtFQUNFLFdBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFXQSwwQkFBQTtBQURGO0FBUkU7RUFDRSxhQUFBO0FBVUo7QUFQRTtFQUVFLHdCQUFBO0VBQ0EsU0FBQTtBQVFKOztBQUhBO0VBQ0UsaUJBQUE7RUFDQSwyQkFBQTtBQU1GOztBQUhBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0FBTUY7QUFKRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0VBQ0EsdUJBQUE7QUFNSjtBQUhFO0VBQ0UsVUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QUFLSjtBQUhJO0VBQ0Usb0NBQUE7QUFLTjtBQUZJO0VBQ0Usd0NBQUE7QUFJTjtBQURJO0VBQ0Usb0NBQUE7QUFHTjtBQUFJO0VBQ0Usc0NBQUE7QUFFTjtBQUVFO0VBQ0Usa0JBQUE7RUFDQSxnQ0FBQTtFQUNBLG1CQUFBO0FBQUo7O0FBT0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7QUFKRjs7QUFPQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxjQUFBO0FBSkY7O0FBT0E7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBQUpGO0FBTUU7RUFDRSx1QkFBQTtBQUpKO0FBT0U7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQUxKOztBQVdBO0VBQ0UsK0JBQUE7QUFSRjtBQVVFO0VBQ0UsdUJBQUE7QUFSSjs7QUFZQTtFQUNFLHVCQUFBO0VBQ0EsYUFBQTtBQVRGO0FBV0U7RUFDRSxVQUFBO0FBVEo7O0FBYUE7RUFDRSxPQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsUUFBQTtFQUNBLGlDQUFBO0VBQ0EsOENBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFWRjs7QUFhQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxRQUFBO0VBQ0EsdUJBQUE7RUFDQSwwQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQVZGO0FBWUU7RUFDRSw4QkFBQTtFQUNBLHVCQUFBO0FBVko7QUFhRTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBWEo7O0FBZUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxRQUFBO0VBQ0EsdUJBQUE7RUFDQSw2Q0FBQTtFQUNBLG1CQUFBO0VBQ0EsK0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQVpGO0FBY0U7RUFDRSw4QkFBQTtFQUNBLHVCQUFBO0FBWko7QUFlRTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBYko7O0FBaUJBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0FBZEY7O0FBaUJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQWRGOztBQWlCQTtFQUNFLGlDQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQ0FBQTtBQWRGOztBQWlCQTtFRWpXRSxZQUFBO0VBQ0EsbUJBRmlDO0VBR2pDLHFDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxnRkFBQTtFRjZWQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBUkY7QUVyVkU7RUFDRSxzQkFBQTtBRnVWSjtBRXBWRTtFQUNFLGFBQUE7RUFDQSxlQUFBO0FGc1ZKO0FFblZFO0VBQ0UsaUNBQUE7RUFDQSxtQkFBQTtBRnFWSiIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJy4uLy4uLy4uLy4uLy4uLy4uLy4uL3RoZW1lL2J1dHRvbnMnO1xuQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vLi4vLi4vdGhlbWUvaW5wdXRzJztcblxuLmVkaXRvci1tb2RhbC1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1iZyk7XG4gIC0tcGFkZGluZy1zdGFydDogMTZweDtcbiAgLS1wYWRkaW5nLWVuZDogMTZweDtcbiAgLS1wYWRkaW5nLXRvcDogMTZweDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMTZweDtcbn1cblxuLnBhbmVsLWhpbnQge1xuICBmb250LXNpemU6IDAuODJyZW07XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgbWFyZ2luOiAwIDAgMTZweDtcbn1cblxuLmlucHV0LXdyYXBwZXIge1xuICBAaW5jbHVkZSB0Zi1pbnB1dC13cmFwcGVyKHZhcigtLXRmLXN1cmZhY2UtMikpO1xuICBoZWlnaHQ6IDUwcHg7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG59XG5cbi5pbnB1dC1pY29uIHtcbiAgQGluY2x1ZGUgdGYtaW5wdXQtaWNvbjtcbiAgZm9udC1zaXplOiAxLjFyZW07XG59XG5cbi5pbnB1dC1maWVsZCB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LWZpZWxkO1xuICBmb250LXNpemU6IDAuOXJlbTtcbn1cblxuLmFsdGVybmF0aXZlLWNhcmQge1xuICBwYWRkaW5nOiAxMnB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xufVxuXG4uYWx0ZXJuYXRpdmUtaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uYWx0ZXJuYXRpdmUtdGl0bGUge1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbn1cblxuLy8gRWxlZ2lkbyDDosKAwpQgbWlzbW8gc2hlbGwgcXVlIHByb2R1Y3QuY29tcG9uZW50LnNjc3MvcmVjaXBlLWNhcmQuY29tcG9uZW50LnNjc3Ncbi8vIGRlIHNlYXJjaC1mb29kcyAoZm9uZG8vYm9yZGUvcmFkaW8vc29tYnJhICsgZmlsYSBkZSBtYWNyby1kb3RzKSwgcGFyYSBxdWVcbi8vIFwiZXN0byB5YSBlcyB1biBhbGltZW50byByZWFsIHBhdXRhZG9cIiBzZSBsZWEgaWd1YWwgZW4gdG9kYSBsYSBhcHAuXG4ucGlja2VkLWZvb2QtY2FyZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxNDE0MTQ7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMyNTI1MjU7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gIHBhZGRpbmc6IDEycHggMTRweDtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuLnBpY2tlZC1mb29kLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xufVxuXG4ucGlja2VkLWZvb2QtbmFtZSB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgY29sb3I6ICNmZmY7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIH1cbn1cblxuLy8gRWwgbm9tYnJlIGVzIHRhbWJpw4PCqW4gZWwgYm90w4PCs24gXCJjYW1iaWFyIHBvciBvdHJvIGFsaW1lbnRvXCIgw6LCgMKUIG1pc21vXG4vLyB0ZXh0by9pY29ubywgYWhvcmEgY2xpY2FibGU6IHN1c3RpdHV5ZSBlbCBhbGltZW50byBlbiB1biBwYXNvLCBzaW4gZWxcbi8vIHJvZGVvIGRlIHZhY2lhciBlbCBodWVjbyB5IHZvbHZlciBhIGJ1c2Nhci5cbi5waWNrZWQtZm9vZC1uYW1lLWJ0biB7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIHBhZGRpbmc6IDA7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcblxuICAmOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHtcbiAgICBjb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIH1cbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNjtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gIH1cbn1cblxuLnBpY2tlZC1mb29kLXF0eS1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTBweDtcbiAgbWFyZ2luLXRvcDogOHB4O1xufVxuXG4ucXR5LWxhYmVsIHtcbiAgZm9udC1zaXplOiAwLjc4cmVtO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG59XG5cbi5xdHktaW5wdXQtd3JhcHBlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNHB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIHBhZGRpbmc6IDRweCAxMHB4O1xufVxuXG4ucXR5LWlucHV0IHtcbiAgd2lkdGg6IDU2cHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xuICB0ZXh0LWFsaWduOiByaWdodDtcblxuICAmOmZvY3VzIHtcbiAgICBvdXRsaW5lOiBub25lO1xuICB9XG5cbiAgJjo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbixcbiAgJjo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgIG1hcmdpbjogMDtcbiAgfVxuICAtbW96LWFwcGVhcmFuY2U6IHRleHRmaWVsZDtcbn1cblxuLnF0eS11bml0IHtcbiAgZm9udC1zaXplOiAwLjhyZW07XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbn1cblxuLnBpY2tlZC1mb29kLW1hY3JvcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiA4cHg7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG5cbiAgLm1hY3JvLWl0ZW0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDZweDtcbiAgICBmbGV4OiAxO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB9XG5cbiAgLm1hY3JvLWRvdCB7XG4gICAgd2lkdGg6IDhweDtcbiAgICBoZWlnaHQ6IDhweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgZmxleC1zaHJpbms6IDA7XG5cbiAgICAmLmtjYWwge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIH1cblxuICAgICYucHJvdGVpbiB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItYWx0ZXJuYXRpdmUpO1xuICAgIH1cblxuICAgICYuY2FyYnMge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICAgIH1cblxuICAgICYuZmF0IHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xuICAgIH1cbiAgfVxuXG4gIC5tYWNyby12YWx1ZSB7XG4gICAgZm9udC1zaXplOiAwLjc4cmVtO1xuICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODUpO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIH1cbn1cblxuLy8gVmFjw4PCrW8gw6LCgMKUIHNvbG8gdHJhcyBcIkNhbWJpYXIgcG9yIG90cm8gYWxpbWVudG9cIiBzb2JyZSB1biBpdGVtIHlhIGVsZWdpZG9cbi8vIChudW5jYSBhbCBjcmVhciB1bm8gbnVldm8pLiBEZWxpYmVyYWRhbWVudGUgbcODwqFzIGxpZ2VybyBxdWVcbi8vIC5waWNrZWQtZm9vZC1jYXJkOiBubyBlcyB1biBhbGltZW50byByZWFsIHRvZGF2w4PCrWEsIG5vIG1lcmVjZSBlbCBtaXNtbyBwZXNvLlxuLmVtcHR5LWZvb2Qtc2xvdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uYWx0ZXJuYXRpdmUtYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMnB4O1xuICBmbGV4LXNocmluazogMDtcbn1cblxuLnJlbW92ZS1hbHRlcm5hdGl2ZS1idG4ge1xuICB3aWR0aDogMzBweDtcbiAgaGVpZ2h0OiAzMHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGZsZXgtc2hyaW5rOiAwO1xuXG4gICY6aG92ZXIge1xuICAgIGNvbG9yOiB2YXIoLS10Zi1kYW5nZXIpO1xuICB9XG5cbiAgJjpkaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogMC40O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgfVxufVxuXG4vLyBDb3BpYXIvYm9ycmFyIG9wY2nDg8KzbjogY29sb3JlcyBmaWpvcyAobm8gc29sbyBhbCBob3ZlcikgcGEgZGlzdGluZ3Vpcmxvc1xuLy8gZGUgdW4gdmlzdGF6bywgbWlzbW8gY3JpdGVyaW8gc2Vjb25kYXJ5L2RhbmdlciBxdWUgZWwgcmVzdG8gZGUgbGEgYXBwLlxuLmFsdGVybmF0aXZlLWFjdGlvbi1jb3B5IHtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcblxuICAmOmhvdmVyIHtcbiAgICBjb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgfVxufVxuXG4uYWx0ZXJuYXRpdmUtYWN0aW9uLWRhbmdlciB7XG4gIGNvbG9yOiB2YXIoLS10Zi1kYW5nZXIpO1xuICBvcGFjaXR5OiAwLjg1O1xuXG4gICY6aG92ZXIge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuLnNlYXJjaC1wcm9kdWN0LWJ0biB7XG4gIGZsZXg6IDE7XG4gIGhlaWdodDogNDJweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogNnB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtc29mdCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWFjY2VudC1zb2Z0LWJvcmRlcik7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICBmb250LXNpemU6IDAuODRyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmFkZC1mb29kLWl0ZW0tYnRuIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMzhweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogNnB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiAxcHggZGFzaGVkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGZvbnQtc2l6ZTogMC44cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgJjpub3QoOmRpc2FibGVkKTpob3ZlciB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICB9XG5cbiAgJjpkaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogMC40O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgfVxufVxuXG4uYWRkLWFsdGVybmF0aXZlLWJ0biB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDQ0cHg7XG4gIG1hcmdpbi1ib3R0b206IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDZweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogMXB4IGRhc2hlZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nZXN0KTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgJjpub3QoOmRpc2FibGVkKTpob3ZlciB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICB9XG5cbiAgJjpkaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogMC40O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgfVxufVxuXG4uc25pcHBldC1hY3Rpb25zLXJvdyB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjtcbiAgZ2FwOiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG59XG5cbi5zbmlwcGV0LXNhdmUtbGluayB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDZweDtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIGZvbnQtc2l6ZTogMC44cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmVkaXRvci1tb2RhbC1mb290ZXIge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMSk7XG4gIHBhZGRpbmc6IDEycHggMTZweDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG59XG5cbi5zdWJtaXQtYnV0dG9uIHtcbiAgQGluY2x1ZGUgdGYtZ3JhZGllbnQtYnV0dG9uO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA1MHB4O1xuICBmb250LXNpemU6IDAuOTJyZW07XG59XG4iLCIvLyBGaWxhIGRlIGlucHV0IGNvbiBpY29ubyAod3JhcHBlciArIGljb25vICsgY2FtcG8pIMOiwoDClCByZXBldGlkYSBlbiA0IHDDg8KhZ2luYXNcbi8vIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuIEVsIGZvbmRvXG4vLyBkZWwgd3JhcHBlciBlcyBlbCDDg8K6bmljbyB2YWxvciBxdWUgdmFyw4PCrWEgcG9yIHDDg8KhZ2luYSAoc3VwZXJmaWNpZSAxIG8gMiBzZWfDg8K6blxuLy8gY29udGV4dG8gdmlzdWFsKSwgZGUgYWjDg8KtIGVsIHBhcsODwqFtZXRybzsgdGFtYcODwrFvIGRlIGZ1ZW50ZS9hbHRvL21hcmdlbiBzZVxuLy8gZGVqYW4gZnVlcmEgZGVsIG1peGluIHBvcnF1ZSBjYWRhIHDDg8KhZ2luYSBsb3MgZmlqYSBzZWfDg8K6biBzdSBwcm9waW8gbGF5b3V0LlxuQG1peGluIHRmLWlucHV0LXdyYXBwZXIoJGJnOiB2YXIoLS10Zi1zdXJmYWNlLTEpKSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgYmFja2dyb3VuZDogJGJnO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMCAxNHB4O1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6Zm9jdXMtd2l0aGluIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIH1cbn1cblxuQG1peGluIHRmLWlucHV0LWljb24ge1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG5AbWl4aW4gdGYtaW5wdXQtZmllbGQge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGhlaWdodDogMTAwJTtcblxuICAmOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG59XG4iLCIvLyBCb3TDg8KzbiBDVEEgY29uIGdyYWRpZW50ZSBkZSBhY2VudG8gw6LCgMKUIG1pc21vIGJsb3F1ZSByZXBldGlkbyBlbiB+MTEgc2l0aW9zIGRlXG4vLyB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgcG9yIGxheW91dCAod2lkdGgsIGhlaWdodCwgZm9udC1zaXplLCBtYXJnaW4pLlxuLy9cbi8vIExhIG1pdGFkIGRlIGxvcyBzaXRpb3Mgb3JpZ2luYWxlcyBubyB0ZW7Dg8KtYW4gdHJhbnNpY2nDg8Kzbi9mZWVkYmFjayBkZSBwdWxzYWNpw4PCs25cbi8vIG5pIDpmb2N1cy12aXNpYmxlIMOiwoDClCBlbCBtaXhpbiBsb3MgYcODwrFhZGUgc2llbXByZSwgY2llcnJhIGVzZSBodWVjbyBkZVxuLy8gY29uc2lzdGVuY2lhIGRlIGludGVyYWNjacODwrNuIChQUk9EVUNULm1kOiBcInVuIHNvbG8gcGF0csODwrNuIHBvciB0aXBvIGRlXG4vLyBjb21wb25lbnRlXCIpIGVuIHZleiBkZSBwZXJwZXR1YXIgbGEgdmFyaWFjacODwrNuIGFjY2lkZW50YWwuXG5AbWl4aW4gdGYtZ3JhZGllbnQtYnV0dG9uKCRyYWRpdXM6IDEycHgpIHtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAkcmFkaXVzO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtZ3JhZGllbnQpO1xuICBjb2xvcjogdmFyKC0tdGYtYWNjZW50LWNvbnRyYXN0KTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpLCBvcGFjaXR5IDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk3KTtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNDU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtdGV4dCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxufVxuXG4vLyBCb3TDg8KzbiBkZSBoZWFkZXIgcXVlIGVzIHNvbG8gdW4gaWNvbm8gw6LCgMKUIG1pc21vIGxvb2sgXCJlbnZ1ZWx0b1wiIHF1ZSB5YSB1c2EgbGFcbi8vIGFwcCBkZSBjb25zdW1pZG9yIGVuIHN1cyB0b29sYmFycyAocGFja2FnZXMvc2hhcmVkLWZlYXR1cmVzLy4uLi9kaWV0cy9cbi8vIGNvbXBvbmVudHMvdG9vbGJhci1jYWxlbmRhcjogZm9uZG8gKyBib3JkZXItcmFkaXVzICsgY2FqYSBmaWphIDQ0eDQ0LCBlblxuLy8gdmV6IGRlbCBpb24tYnV0dG9uIHBsYW5vL3RyYW5zcGFyZW50ZSBxdWUgdGVuw4PCrWEgY2FkYSBwYW50YWxsYSBkZSB0cmFpbmVyc1xuLy8gaGFzdGEgYWhvcmEpLiBUb2tlbmVhZG8gYSBsYSBwYWxldGEgZGUgZXN0YSBhcHAgZW4gdmV6IGRlIHJlcGV0aXIgbG9zXG4vLyByZ2JhKDI1NSwyNTUsMjU1LC4uLikgc3VlbHRvcyBkZWwgb3JpZ2luYWwuXG4vL1xuLy8gU2lydmUgdGFudG8gcGFyYSA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIj4gKHVzYSBsYXMgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzXG4vLyBkZSBJb25pYykgY29tbyBwYXJhIHVuIDxidXR0b24+IG5hdGl2byAodXNhIGxhcyBwcm9waWVkYWRlcyBwbGFuYXMpIMOiwoDClFxuLy8gYW1ib3MgY29leGlzdGVuIGhveSBlbiB0cmFpbmVycyBwYXJhIGVsIG1pc21vIHJvbCBkZSBcInZvbHZlclwiL1wiY2VycmFyXCIuXG5AbWl4aW4gdGYtaWNvbi1idXR0b24oJHNpemU6IDQ0cHgsICRyYWRpdXM6IDEycHgsICRpY29uLXNpemU6IDIwcHgpIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICAtLWJhY2tncm91bmQtYWN0aXZhdGVkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtaG92ZXI6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIC0tYmFja2dyb3VuZC1mb2N1c2VkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIC0tYm9yZGVyLXJhZGl1czogI3skcmFkaXVzfTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAtLXBhZGRpbmctZW5kOiAwO1xuICAtLXBhZGRpbmctdG9wOiAwO1xuICAtLXBhZGRpbmctYm90dG9tOiAwO1xuXG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgd2lkdGg6ICRzaXplO1xuICBoZWlnaHQ6ICRzaXplO1xuICBtaW4td2lkdGg6ICRzaXplO1xuICBtaW4taGVpZ2h0OiAkc2l6ZTtcbiAgbWFyZ2luOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICBjb2xvciB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAkaWNvbi1zaXplO1xuICB9XG59XG5cbi8vIEV4cGFuc29yIGludmlzaWJsZSBkZSB6b25hIHB1bHNhYmxlLlxuLy9cbi8vIFBBUkEgUVXDg8KJOiB1biBjb250cm9sIGNvbXBhY3RvICh1biBpY29ubyBkZSAzMiBweCBlbiB1bmEgZmlsYSBkZSB0YWJsYSwgdW5cbi8vIGVubGFjZSBkZSB0ZXh0byBkZSAxNiBweCkgbm8gbGxlZ2EgYSBsb3MgNDQgcHggcXVlIGV4aWdlIFBST0RVQ1QubWQsIHlcbi8vIGVuZ29yZGFybG8gZGUgdmVyZGFkIGRlc3BsYXphIHRvZG8gbG8gcXVlIHRpZW5lIGFscmVkZWRvciDDosKAwpQgZW4gdW5hIHRhYmxhXG4vLyBkZSB2ZWludGUgZmlsYXMsIDggcHggcG9yIGZpbGEgc29uIG1lZGlhIHBhbnRhbGxhLlxuLy9cbi8vIEVsIHBzZXVkb2VsZW1lbnRvIGNyZWNlIGhhY2lhIGZ1ZXJhIHNpbiBvY3VwYXIgc2l0aW8gZW4gZWwgZmx1am8sIGFzw4PCrSBxdWVcbi8vIGVsIGJvdMODwrNuIHNlIHZlIHBlcXVlw4PCsW8geSBzZSBwdWxzYSBncmFuZGUuXG4vL1xuLy8gQVZJU08gREUgTUVESUNJw4PCk046IGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIE5PIHZlIGVzdGUgcHNldWRvZWxlbWVudG8sIGFzw4PCrVxuLy8gcXVlIGFsIHZlcmlmaWNhciBoYXkgcXVlIHVzYXIgZWxlbWVudEZyb21Qb2ludCBjb24gZWwgZWxlbWVudG8gZGVudHJvIGRlbFxuLy8gdmlld3BvcnQuIEFkZW3Dg8KhcyBlbCBoaXQtdGVzdCBkZXZ1ZWx2ZSAyIHB4IG1lbm9zIHF1ZSBsYSBjYWphIGRlY2xhcmFkYVxuLy8gKGNvbXByb2JhZG86IC00cHggZGEgNDIsIC02cHggZGEgNDYpLCBhc8ODwq0gcXVlIHVuIDQyIG1lZGlkbyBzb24gNDQgcmVhbGVzLlxuLy9cbi8vICRncm93OiBjdcODwqFudG8gY3JlY2UgcG9yIGNhZGEgbGFkby4gNHB4IGxsZXZhIHVuIGNvbnRyb2wgZGUgMzYgcHggYSA0NC5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlcigkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldDogLSN7JGdyb3d9O1xuICB9XG59XG5cbi8vIFZhcmlhbnRlIHF1ZSBzb2xvIGNyZWNlIGVuIFZFUlRJQ0FMLiBQYXJhIGNvbnRyb2xlcyBlbiBmaWxhIGRvbmRlIGVsXG4vLyBleHBhbnNvciBob3Jpem9udGFsIHNlIHNvbGFwYXLDg8KtYSBjb24gZWwgZGUgYWwgbGFkbyB5IHJvYmFyw4PCrWEgc3VzIHRvcXVlcy5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlci15KCRncm93OiA0cHgpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogLSN7JGdyb3d9O1xuICAgIGJvdHRvbTogLSN7JGdyb3d9O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
}));


/***/ }),

/***/ 77406:
/*!***************************************************************************************************!*\
  !*** ./src/app/features/diet-templates/pages/diet-template-builder/diet-template-builder.page.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DietTemplateBuilderPage: () => (/* binding */ DietTemplateBuilderPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 68075);
/* harmony import */ var _models_diet_template_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../models/diet-template.model */ 27094);
/* harmony import */ var _components_day_meal_editor_modal_day_meal_editor_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/day-meal-editor-modal/day-meal-editor-modal.component */ 28457);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _services_diet_template_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/diet-template-api.service */ 63459);
/* harmony import */ var _shared_services_plan_assignment_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/services/plan-assignment-api.service */ 40098);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var src_app_core_services_custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/custom-product/custom-product.service */ 57846);
/* harmony import */ var src_app_core_services_recipe_recipe_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/services/recipe/recipe.service */ 50888);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic/angular */ 54844);


var _DietTemplateBuilderPage;














function DietTemplateBuilderPage_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "div", 14)(2, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
}
function DietTemplateBuilderPage_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "ion-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, "No se pudo cargar la plantilla");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5, "Comprueba tu conexi\u00F3n e int\u00E9ntalo de nuevo.");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function DietTemplateBuilderPage_div_12_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r5);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r4.load());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](7, "Reintentar");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
}
function DietTemplateBuilderPage_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "ion-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](3, "Faltan las fechas del plan");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5, "Vuelve a la ficha del cliente y empieza de nuevo desde \"Crear dieta\".");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function DietTemplateBuilderPage_div_13_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r6.goBack());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](7, "Volver");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
}
function DietTemplateBuilderPage_ng_container_14_p_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "p", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, " El cliente marcar\u00E1 cada d\u00EDa cu\u00E1l de estos men\u00FAs le toca (p. ej. \"Entrenamiento\" / \"Descanso\") \u2014 no hace falta asignar d\u00EDas de la semana. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
}
function DietTemplateBuilderPage_ng_container_14_p_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "p", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", ctx_r9.emptyRowsHint, " ");
  }
}
function DietTemplateBuilderPage_ng_container_14_p_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "p", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" Sin patr\u00F3n asignado: ", ctx_r10.uncoveredWeekdays, ". Esos d\u00EDas no se tocar\u00E1 la dieta del cliente. ");
  }
}
function DietTemplateBuilderPage_ng_container_14_p_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "p", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "ion-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" D\u00EDa repetido en varios patrones: ", ctx_r11.duplicateWeekdaysWarning, ". ");
  }
}
function DietTemplateBuilderPage_ng_container_14_div_17_div_3_div_5_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "button", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function DietTemplateBuilderPage_ng_container_14_div_17_div_3_div_5_button_1_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r25);
      const w_r22 = restoredCtx.$implicit;
      const row_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2).$implicit;
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r23.toggleWeekday(ctx_r23.asPattern(row_r18), w_r22.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const w_r22 = ctx.$implicit;
    const row_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2).$implicit;
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("selected", ctx_r21.asPattern(row_r18).appliesTo.includes(w_r22.value));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", w_r22.short, " ");
  }
}
function DietTemplateBuilderPage_ng_container_14_div_17_div_3_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, DietTemplateBuilderPage_ng_container_14_div_17_div_3_div_5_button_1_Template, 2, 3, "button", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r20.weekdays);
  }
}
function DietTemplateBuilderPage_ng_container_14_div_17_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 46)(1, "div", 47)(2, "input", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function DietTemplateBuilderPage_ng_container_14_div_17_div_3_Template_input_ngModelChange_2_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r28);
      const row_r18 = restoredCtx.$implicit;
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r27.setRowLabel(row_r18, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "button", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function DietTemplateBuilderPage_ng_container_14_div_17_div_3_Template_button_click_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r28);
      const d_r19 = restoredCtx.index;
      const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r29.removeRow(d_r19));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](4, "ion-icon", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](5, DietTemplateBuilderPage_ng_container_14_div_17_div_3_div_5_Template, 2, 1, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r18 = ctx.$implicit;
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngModel", ctx_r15.rowLabel(row_r18));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("aria-label", "Eliminar " + ctx_r15.rowNoun);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r15.mode === "recurring");
  }
}
function DietTemplateBuilderPage_ng_container_14_div_17_ng_container_4_button_3_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r38 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "button", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function DietTemplateBuilderPage_ng_container_14_div_17_ng_container_4_button_3_button_3_Template_button_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r38);
      const d_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().index;
      const s_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().index;
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r36.duplicateMealTo(d_r34, s_r31, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](1, "ion-icon", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
}
function DietTemplateBuilderPage_ng_container_14_div_17_ng_container_4_button_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "button", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("dragstart", function DietTemplateBuilderPage_ng_container_14_div_17_ng_container_4_button_3_Template_button_dragstart_0_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r41);
      const d_r34 = restoredCtx.index;
      const s_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().index;
      const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r40.onCellDragStart(d_r34, s_r31, $event));
    })("dragover", function DietTemplateBuilderPage_ng_container_14_div_17_ng_container_4_button_3_Template_button_dragover_0_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r41);
      const d_r34 = restoredCtx.index;
      const s_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().index;
      const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r43.onCellDragOver(d_r34, s_r31, $event));
    })("dragleave", function DietTemplateBuilderPage_ng_container_14_div_17_ng_container_4_button_3_Template_button_dragleave_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r41);
      const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r45.onCellDragLeave());
    })("drop", function DietTemplateBuilderPage_ng_container_14_div_17_ng_container_4_button_3_Template_button_drop_0_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r41);
      const d_r34 = restoredCtx.index;
      const s_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().index;
      const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r46.onCellDrop(d_r34, s_r31, $event));
    })("click", function DietTemplateBuilderPage_ng_container_14_div_17_ng_container_4_button_3_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r41);
      const d_r34 = restoredCtx.index;
      const s_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().index;
      const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r48.openMealEditor(d_r34, s_r31));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "span", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, DietTemplateBuilderPage_ng_container_14_div_17_ng_container_4_button_3_button_3_Template, 2, 0, "button", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r33 = ctx.$implicit;
    const d_r34 = ctx.index;
    const s_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().index;
    const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("has-items", row_r33.meals[s_r31].alternatives.length > 0)("drag-over", (ctx_r32.dragOverCell == null ? null : ctx_r32.dragOverCell.dayIndex) === d_r34 && (ctx_r32.dragOverCell == null ? null : ctx_r32.dragOverCell.mealIndex) === s_r31);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵattribute"]("draggable", row_r33.meals[s_r31].alternatives.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r32.mealSummary(row_r33.meals[s_r31]));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", row_r33.meals[s_r31].alternatives.length);
  }
}
function DietTemplateBuilderPage_ng_container_14_div_17_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, DietTemplateBuilderPage_ng_container_14_div_17_ng_container_4_button_3_Template, 4, 7, "button", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const slot_r30 = ctx.$implicit;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](slot_r30);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r16.activeRows)("ngForTrackBy", ctx_r16.trackByIndex);
  }
}
function DietTemplateBuilderPage_ng_container_14_div_17_div_7_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "span", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](3, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5, "kcal");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](7, "span", 67)(8, "span", 68)(9, "span", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "div", 70)(11, "span", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](13, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](14, "span", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](16, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](17, "span", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipe"](19, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const row_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]().$implicit;
    const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](3, 10, ctx_r52.dayTotals(row_r51).kcal, "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleProp"]("flex-grow", ctx_r52.macroBarSegments(row_r51).protein || 0.001);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleProp"]("flex-grow", ctx_r52.macroBarSegments(row_r51).carbs || 0.001);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleProp"]("flex-grow", ctx_r52.macroBarSegments(row_r51).fat || 0.001);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("P ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](13, 13, ctx_r52.dayTotals(row_r51).protein, "1.0-0"), "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("C ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](16, 16, ctx_r52.dayTotals(row_r51).carbs, "1.0-0"), "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"]("G ", _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵpipeBind2"](19, 19, ctx_r52.dayTotals(row_r51).fat, "1.0-0"), "g");
  }
}
function DietTemplateBuilderPage_ng_container_14_div_17_div_7_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1, "Sin alimentos");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
}
function DietTemplateBuilderPage_ng_container_14_div_17_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](1, DietTemplateBuilderPage_ng_container_14_div_17_div_7_ng_container_1_Template, 20, 22, "ng-container", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](2, DietTemplateBuilderPage_ng_container_14_div_17_div_7_ng_template_2_Template, 2, 0, "ng-template", null, 64, _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r51 = ctx.$implicit;
    const _r53 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵreference"](3);
    const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r17.hasAnyItems(row_r51))("ngIfElse", _r53);
  }
}
function DietTemplateBuilderPage_ng_container_14_div_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "div", 39)(1, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](3, DietTemplateBuilderPage_ng_container_14_div_17_div_3_Template, 6, 3, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](4, DietTemplateBuilderPage_ng_container_14_div_17_ng_container_4_Template, 4, 3, "ng-container", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](5, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](6, "Totales");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](7, DietTemplateBuilderPage_ng_container_14_div_17_div_7_Template, 4, 2, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵstyleProp"]("grid-template-columns", "128px repeat(" + ctx_r12.activeRows.length + ", minmax(160px, 1fr))");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r12.activeRows)("ngForTrackBy", ctx_r12.trackByIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r12.mealSlots)("ngForTrackBy", ctx_r12.trackByIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngForOf", ctx_r12.activeRows)("ngForTrackBy", ctx_r12.trackByIndex);
  }
}
function DietTemplateBuilderPage_ng_container_14_span_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx_r13.isCreatingForClient ? "Crear y asignar" : "Guardar plantilla");
  }
}
function DietTemplateBuilderPage_ng_container_14_ion_spinner_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](0, "ion-spinner", 75);
  }
}
function DietTemplateBuilderPage_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r57 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](2, "ion-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](3, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("ngModelChange", function DietTemplateBuilderPage_ng_container_14_Template_input_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r57);
      const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r56.name = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](4, "p", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](5, "\u00BFC\u00F3mo se repite esta plantilla?");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "div", 23)(7, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function DietTemplateBuilderPage_ng_container_14_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r57);
      const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r58.setMode("sequential"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8, " D\u00EDas (1, 2, 3...) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](9, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function DietTemplateBuilderPage_ng_container_14_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r57);
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r59.setMode("recurring"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](10, " Por d\u00EDa de la semana ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](11, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function DietTemplateBuilderPage_ng_container_14_Template_button_click_11_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r57);
      const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r60.setMode("choice"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](12, " El cliente elige cada d\u00EDa ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](13, DietTemplateBuilderPage_ng_container_14_p_13_Template, 2, 0, "p", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](14, DietTemplateBuilderPage_ng_container_14_p_14_Template, 2, 1, "p", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](15, DietTemplateBuilderPage_ng_container_14_p_15_Template, 2, 1, "p", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](16, DietTemplateBuilderPage_ng_container_14_p_16_Template, 3, 1, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](17, DietTemplateBuilderPage_ng_container_14_div_17_Template, 8, 8, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](18, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function DietTemplateBuilderPage_ng_container_14_Template_button_click_18_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r57);
      const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r61.addRow());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](19, "ion-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](21, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function DietTemplateBuilderPage_ng_container_14_Template_button_click_21_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵrestoreView"](_r57);
      const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵresetView"](ctx_r62.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](22, DietTemplateBuilderPage_ng_container_14_span_22_Template, 2, 1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](23, DietTemplateBuilderPage_ng_container_14_ion_spinner_23_Template, 1, 0, "ion-spinner", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("placeholder", ctx_r3.isCreatingForClient ? "Nombre de la dieta" : "Nombre de la plantilla")("ngModel", ctx_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("selected", ctx_r3.mode === "sequential");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("selected", ctx_r3.mode === "recurring");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵclassProp"]("selected", ctx_r3.mode === "choice");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r3.mode === "choice");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx_r3.activeRows.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r3.mode === "recurring" && ctx_r3.activeRows.length && ctx_r3.uncoveredWeekdays);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r3.mode === "recurring" && ctx_r3.activeRows.length && ctx_r3.duplicateWeekdaysWarning);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r3.activeRows.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", ctx_r3.activeRows.length >= ctx_r3.activeRowsLimit);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate1"](" ", "A\u00F1adir " + ctx_r3.rowNoun, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("disabled", !ctx_r3.canSave || ctx_r3.isSaving);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", !ctx_r3.isSaving);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx_r3.isSaving);
  }
}
// Replanteamiento MVP (nutrición) — constructor de la plantilla: días con sus
// 6 comidas fijas (mismo enum que DietDay real), cada comida con una o varias
// alternativas (Fase 9 — mismo patrón multi-alternativa que client-detail.page.ts
// #panel de pautar). Se guarda explícitamente (sin autosave) para no disparar
// un PUT por cada pulsación.
class DietTemplateBuilderPage {
  constructor(route, router, dietTemplateApi, planAssignmentApi, ionicUtilService, customProductService, recipeService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "route", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietTemplateApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "planAssignmentApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "customProductService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recipeService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "state", 'loading');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "templateId", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "name", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "days", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isSaving", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "mealSlots", _models_diet_template_model__WEBPACK_IMPORTED_MODULE_2__.MEAL_SLOTS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "maxDays", 14);
    // Auditoría de arquitectura (Fase 8/9) — "sequential" es el tablero
    // Día 1..N de siempre; "recurring" y "choice" comparten `dayPatterns[]`
    // (patrones por día de la semana fijo, o elegidos por el cliente cada día
    // respectivamente) para no perder los días secuenciales si el entrenador
    // cambia de modo y vuelve a cambiar.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "mode", 'sequential');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dayPatterns", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "maxPatterns", 10);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "weekdays", _models_diet_template_model__WEBPACK_IMPORTED_MODULE_2__.WEEKDAYS);
    // TAREA5 (auditoría UX, Fase C) — tablero semanal: días × comidas en
    // rejilla, en vez del acordeón día→comida→alimentos anterior. Una celda
    // se edita en DayMealEditorModalComponent (ver ese archivo para el porqué
    // de un modal real en vez de un panel propio), y se puede arrastrar
    // entera (con todas sus alternativas) a otra celda para moverla, o
    // duplicarla a otro día sin moverla del origen.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "draggedFrom", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dragOverCell", null);
    // "Crear dieta" (ver diet-templates-routing.module.ts, ruta
    // for-client/:clientId) — mismo tablero, pero sin plantilla que cargar:
    // guardar crea+asigna directo a este cliente en vez de actualizar una
    // plantilla de la biblioteca.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isCreatingForClient", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "clientId", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "clientName", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "forClientSchedule", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "destroyRef", (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_9__.DestroyRef));
    // Solo fiable en el constructor (getCurrentNavigation() vuelve a null en
    // cuanto la navegación termina, y ngOnInit ya corre después) — mismo
    // motivo por el que Angular documenta leerlo aquí y no más abajo.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "navigationState", this.routerNavigationState() || {});
    this.route = route;
    this.router = router;
    this.dietTemplateApi = dietTemplateApi;
    this.planAssignmentApi = planAssignmentApi;
    this.ionicUtilService = ionicUtilService;
    this.customProductService = customProductService;
    this.recipeService = recipeService;
  }
  routerNavigationState() {
    return this.router.getCurrentNavigation()?.extras?.state ?? history.state;
  }
  // TASK-051 (MASTER_BACKLOG.md) — antes leía el :id una sola vez de
  // route.snapshot en ngOnInit. Sin explotar hoy (la lista no navega de una
  // plantilla abierta directamente a otra), pero defiende contra el caso en
  // que Angular reutilice esta instancia entre dos ':id' distintos de la
  // misma ruta (comportamiento por defecto cuando solo cambia el
  // parámetro) — mismo criterio aplicado en RoutineBuilderPage.
  ngOnInit() {
    this.route.paramMap.pipe((0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_10__.takeUntilDestroyed)(this.destroyRef)).subscribe(params => {
      const clientId = params.get('clientId');
      if (clientId) {
        this.startForClient(clientId);
        return;
      }
      this.templateId = params.get('id') || '';
      this.load();
    });
  }
  // Sin plantilla que cargar — arranca en blanco, listo para construir.
  // Nombre y fechas ya se decidieron en el modal previo (ver
  // ApplyDietTemplateModalComponent#forDirectCreate); si por lo que sea no
  // llegaron (refresco de página, navegación directa a la URL), no hay
  // fecha con la que crear nada — mejor un error claro que una asignación a
  // medias.
  startForClient(clientId) {
    const nav = this.navigationState;
    if (!nav.startDate || !nav.endMode) {
      this.state = 'error';
      return;
    }
    this.isCreatingForClient = true;
    this.clientId = clientId;
    this.clientName = nav.clientName || 'este cliente';
    this.name = nav.name || '';
    this.forClientSchedule = nav;
    this.mode = 'sequential';
    this.days = [];
    this.dayPatterns = [];
    this.state = 'loaded';
  }
  load() {
    this.state = 'loading';
    this.dietTemplateApi.list().subscribe({
      next: templates => {
        const template = (templates || []).find(t => t._id === this.templateId);
        if (!template) {
          this.state = 'error';
          return;
        }
        this.applyTemplate(template);
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      }
    });
  }
  applyTemplate(template) {
    this.name = template.name;
    this.mode = template.mode || 'sequential';
    this.days = (template.days || []).map(day => ({
      dayLabel: day.dayLabel,
      meals: this.mealsFromPayload(day.meals)
    }));
    this.dayPatterns = (template.dayPatterns || []).map(pattern => ({
      name: pattern.name,
      appliesTo: Array.isArray(pattern.appliesTo) ? pattern.appliesTo : [],
      meals: this.mealsFromPayload(pattern.meals)
    }));
  }
  mealsFromPayload(meals) {
    return this.mealSlots.map(slot => {
      const existing = (meals || []).find(m => m.slot === slot);
      return {
        slot,
        alternatives: (existing?.alternatives || []).map(alt => ({
          label: alt.label || '',
          items: [...this.customProductsToItems(alt.customProducts), ...this.customRecipesToItems(alt.customRecipes)]
        }))
      };
    });
  }
  // --- Filas activas del tablero: días secuenciales o patrones (semanales o
  // elegidos por el cliente), según el modo. Ambos comparten forma
  // {meals: TemplateMeal[]}, así que el resto de métodos (editor de celda,
  // drag&drop, snippets...) operan sobre esta lista sin duplicarse por modo. ---
  get activeRows() {
    return this.mode === 'sequential' ? this.days : this.dayPatterns;
  }
  get activeRowsLimit() {
    return this.mode === 'sequential' ? this.maxDays : this.maxPatterns;
  }
  // F20-duodecies — antes "Añadir menú"/"Eliminar menú" se usaba tal cual
  // para recurring Y choice por igual (el código solo distinguía
  // sequential de "todo lo demás"), aunque solo en choice es de verdad un
  // menú intercambiable — en recurring es un patrón que decide el
  // calendario, no el cliente (ver explicación dada al usuario). Un único
  // getter para no repetir el ternario de 3 vías en cada sitio del html.
  get rowNoun() {
    if (this.mode === 'sequential') return 'día';
    if (this.mode === 'recurring') return 'patrón';
    return 'menú';
  }
  get emptyRowsHint() {
    if (this.mode === 'sequential') return 'Añade el primer día para empezar a construir la plantilla.';
    return `Añade el primer ${this.rowNoun} para empezar.`;
  }
  setMode(mode) {
    this.mode = mode;
  }
  rowLabel(row) {
    return this.mode === 'sequential' ? row.dayLabel : row.name;
  }
  setRowLabel(row, value) {
    if (this.mode === 'sequential') {
      row.dayLabel = value;
    } else {
      row.name = value;
    }
  }
  // Angular templates no admiten "as" de TypeScript — este helper evita
  // repetir "$any(row)" por todo el HTML del tablero en modo recurrente/choice.
  asPattern(row) {
    return row;
  }
  // F20-decies — un día solo puede pertenecer a UN patrón a la vez: al
  // marcarlo aquí, se quita automáticamente de cualquier otro patrón que ya
  // lo tuviera. Antes cada patrón tenía su propia selección de días sin
  // relación con las demás, así que nada impedía marcar el mismo día en dos
  // sitios — solo se avisaba a posteriori (ver duplicateWeekdaysWarning).
  // Con exclusión mutua, la ambigüedad deja de poder CONSTRUIRSE desde el
  // editor (no hace falta detectarla si no puede existir) — mismo criterio
  // por el que "sequential" nunca tiene este problema: cada día solo puede
  // estar en un sitio, por construcción. duplicateWeekdaysWarning se queda
  // como red de seguridad para plantillas guardadas ANTES de este cambio.
  toggleWeekday(pattern, weekday) {
    const i = pattern.appliesTo.indexOf(weekday);
    if (i >= 0) {
      pattern.appliesTo.splice(i, 1);
      return;
    }
    for (const other of this.dayPatterns) {
      if (other === pattern) continue;
      const otherIndex = other.appliesTo.indexOf(weekday);
      if (otherIndex >= 0) other.appliesTo.splice(otherIndex, 1);
    }
    pattern.appliesTo.push(weekday);
  }
  // Aviso suave (no bloquea guardar) de qué días de la semana no quedan
  // cubiertos por ningún patrón — ese día concreto simplemente no tocará
  // nada del plan (ver plan-resolver.js), pero conviene que sea explícito.
  // Solo aplica en modo "recurring" — en "choice" no hay días de la semana.
  get uncoveredWeekdays() {
    if (this.mode !== 'recurring') return '';
    const covered = new Set(this.dayPatterns.flatMap(p => p.appliesTo));
    const missing = this.weekdays.filter(w => !covered.has(w.value));
    return missing.map(w => w.label).join(', ');
  }
  // Red de seguridad, no un caso esperado: toggleWeekday ya impide crear
  // solapes NUEVOS (exclusión mutua entre patrones), pero una plantilla
  // guardada ANTES de ese cambio (o tocada directamente por API) podría
  // seguir teniendo un día en 2+ patrones. Si eso ocurre, deja claro cuál
  // gana — plan-resolver.js#resolvePlanForDate resuelve por orden de
  // aparición en dayPatterns (.find), el primer patrón de la lista que
  // cubra ese día es el que se aplica; el resto queda silenciosamente
  // ignorado para esa fecha.
  get duplicateWeekdaysWarning() {
    if (this.mode !== 'recurring') return '';
    const parts = [];
    for (const w of this.weekdays) {
      const patterns = this.dayPatterns.filter(p => p.appliesTo.includes(w.value));
      if (patterns.length < 2) continue;
      const winner = patterns[0].name.trim() || 'sin nombre';
      parts.push(`${w.short} (gana "${winner}")`);
    }
    return parts.join(', ');
  }
  // El backend persiste cada alimento como ref REAL a CustomProduct (refactor
  // 2026-08, ver diet-template-schema.js), no como blob "clipboard" crudo —
  // autopopulate ya trae `cp.product` (Product real) en cada find/findOne.
  // Antes este método ignoraba eso y ponía un nombre genérico; ahora lee el
  // nombre real y cachea las macros con el mismo cálculo que usa
  // day-meal-editor-modal al elegir un alimento nuevo (CustomProductService
  // .getMacros), para que una plantilla reabierta se vea igual que una recién
  // compuesta.
  customProductsToItems(customProducts) {
    if (!Array.isArray(customProducts)) return [];
    return customProducts.filter(cp => cp?.product).map(cp => {
      const macros = this.customProductService.getMacros(cp);
      return {
        productId: typeof cp.product === 'string' ? cp.product : cp.product?._id,
        productName: cp.product?.name || 'Alimento guardado',
        quantity: cp.quantity,
        kcal: macros.kcal,
        protein: macros.protein,
        carbs: macros.carbs,
        fat: macros.fat,
        // Cacheado para edición de cantidad in situ (ver day-meal-editor-modal
        // .onQuantityChange) — solo disponible cuando cp.product ya venía
        // poblado (siempre, salvo datos muy antiguos).
        product: typeof cp.product === 'object' ? cp.product : undefined
      };
    });
  }
  // Mismo criterio que customProductsToItems — `cr.recipe` ya llega
  // autopoblado (Recipe real), y las macros se calculan con
  // RecipeService.calculateCustomRecipeTotals (mismo cálculo reutilizado en
  // day-meal-editor-modal).
  customRecipesToItems(customRecipes) {
    if (!Array.isArray(customRecipes)) return [];
    return customRecipes.filter(cr => cr?.recipe).map(cr => {
      const macros = this.recipeService.calculateCustomRecipeTotals(cr.recipe, cr).portionMacros;
      return {
        recipeId: typeof cr.recipe === 'string' ? cr.recipe : cr.recipe?._id,
        recipeName: cr.recipe?.name || 'Receta guardada',
        quantity: cr.quantity,
        kcal: macros.kcal,
        protein: macros.protein,
        carbs: macros.carbs,
        fat: macros.fat,
        recipe: typeof cr.recipe === 'object' ? cr.recipe : undefined,
        // Personalización ya guardada de esta receta para esta comida
        // (ver RecipeIngredientsEditorModalComponent) — autopoblada igual
        // que cr.recipe, se conserva al reabrir la plantilla.
        addedCustomProducts: cr.addedCustomProducts,
        modifiedBaseCustomProducts: cr.modifiedBaseCustomProducts,
        removedBaseCustomProductIds: cr.removedBaseCustomProductIds
      };
    });
  }
  // Espejo de alternativeToCustomEntries en client-detail.page.ts — mismo
  // formato "clipboard" que ya acepta mealModel.pasteMeal (F12/F28). Cada
  // alimento es siempre un producto o una receta real (ver canSave), nunca
  // macros tecleadas a mano.
  itemsToCustomEntries(items) {
    const customProducts = [];
    const customRecipes = [];
    for (const item of items) {
      if (item.recipeId) {
        customRecipes.push({
          recipe: item.recipeId,
          quantity: item.quantity || null,
          // Personalización de ingredientes para esta comida en concreto
          // (ver RecipeIngredientsEditorModalComponent) — backend ya la
          // materializa igual que el resto (custom-recipe-dao.js
          // #createCustomRecipe).
          addedCustomProducts: (item.addedCustomProducts || []).map(cp => this.recipeService.serializeCustomProductForPersistence(cp)),
          modifiedBaseCustomProducts: item.modifiedBaseCustomProducts || [],
          removedBaseCustomProductIds: item.removedBaseCustomProductIds || []
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
  addRow() {
    if (this.activeRows.length >= this.activeRowsLimit) return;
    if (this.mode === 'sequential') {
      this.days.push({
        dayLabel: `Día ${this.days.length + 1}`,
        meals: this.mealSlots.map(slot => ({
          slot,
          alternatives: []
        }))
      });
    } else {
      this.dayPatterns.push({
        name: this.mode === 'choice' ? `Menú ${this.dayPatterns.length + 1}` : `Patrón ${this.dayPatterns.length + 1}`,
        appliesTo: [],
        meals: this.mealSlots.map(slot => ({
          slot,
          alternatives: []
        }))
      });
    }
  }
  removeRow(index) {
    this.activeRows.splice(index, 1);
  }
  // F20-septies — total de macros del día/patrón: suma la PRIMERA
  // alternativa de cada comida (la que rige cuando no hay elección — con
  // 2+ alternativas no hay un "total real" único, esta es la lectura más
  // representativa sin inventar una media rara). kcal/protein/carbs/fat de
  // cada TemplateFoodItem ya vienen calculados para su quantity actual
  // (mismo snapshot que pinta el resto del builder), no hace falta volver
  // a tocar producto/receta real.
  dayTotals(row) {
    const totals = {
      kcal: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
    for (const meal of row.meals) {
      for (const item of meal.alternatives?.[0]?.items || []) {
        totals.kcal += item.kcal || 0;
        totals.protein += item.protein || 0;
        totals.carbs += item.carbs || 0;
        totals.fat += item.fat || 0;
      }
    }
    return totals;
  }
  hasAnyItems(row) {
    return row.meals.some(meal => (meal.alternatives?.[0]?.items?.length || 0) > 0);
  }
  // Proporción de cada macro sobre el total de KCAL del día (no de gramos:
  // 1g de grasa aporta más del doble de kcal que 1g de proteína/carbo, una
  // barra por gramos sería visualmente engañosa) — para la barra
  // segmentada bajo el número de kcal.
  macroBarSegments(row) {
    const totals = this.dayTotals(row);
    const proteinKcal = totals.protein * 4;
    const carbsKcal = totals.carbs * 4;
    const fatKcal = totals.fat * 9;
    const sum = proteinKcal + carbsKcal + fatKcal;
    if (sum <= 0) return {
      protein: 0,
      carbs: 0,
      fat: 0
    };
    return {
      protein: proteinKcal / sum * 100,
      carbs: carbsKcal / sum * 100,
      fat: fatKcal / sum * 100
    };
  }
  mealSummary(meal) {
    const alternatives = meal.alternatives || [];
    if (!alternatives.length) return 'Vacía';
    if (alternatives.length === 1) {
      const n = alternatives[0].items.length;
      return `${n} alimento${n === 1 ? '' : 's'}`;
    }
    return `${alternatives.length} alternativas`;
  }
  // --- Editor de celda (día × comida) ---
  // meal se pasa por referencia al modal: las mutaciones que haga dentro
  // (añadir/quitar alternativas, alimentos...) se reflejan directamente
  // aquí, en el mismo objeto que vive dentro de days/dayPatterns — no hace
  // falta releer nada al cerrar.
  openMealEditor(dayIndex, mealIndex) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const row = _this.activeRows[dayIndex];
      const meal = row.meals[mealIndex];
      // Siempre se edita con al menos una alternativa visible en pantalla,
      // aunque la celda esté vacía — igual que el panel de "Pautar" en
      // client-detail.page.ts.
      if (!meal.alternatives.length) {
        meal.alternatives.push({
          label: '',
          items: [{}]
        });
      }
      yield _this.ionicUtilService.showModal({
        component: _components_day_meal_editor_modal_day_meal_editor_modal_component__WEBPACK_IMPORTED_MODULE_3__.DayMealEditorModalComponent,
        componentProps: {
          meal,
          dayLabel: _this.rowLabel(row),
          mode: _this.mode
        },
        cssClass: 'tf-panel-modal'
      });
    })();
  }
  // --- Arrastrar y soltar: mover una comida completa (con todas sus
  // alternativas) de una celda a otra. Si el destino ya tiene algo, pide
  // confirmación antes de sobrescribir — perder una comida ya compuesta por
  // un arrastre accidental sería un desastre silencioso. ---
  onCellDragStart(dayIndex, mealIndex, event) {
    const meal = this.activeRows[dayIndex].meals[mealIndex];
    if (!meal.alternatives.length) {
      event.preventDefault();
      return;
    }
    this.draggedFrom = {
      dayIndex,
      mealIndex
    };
    event.dataTransfer?.setData('text/plain', 'meal');
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
  }
  onCellDragOver(dayIndex, mealIndex, event) {
    if (!this.draggedFrom) return;
    event.preventDefault();
    this.dragOverCell = {
      dayIndex,
      mealIndex
    };
  }
  onCellDragLeave() {
    this.dragOverCell = null;
  }
  onCellDrop(dayIndex, mealIndex, event) {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      event.preventDefault();
      _this2.dragOverCell = null;
      const from = _this2.draggedFrom;
      _this2.draggedFrom = null;
      if (!from) return;
      if (from.dayIndex === dayIndex && from.mealIndex === mealIndex) return;
      const targetMeal = _this2.activeRows[dayIndex].meals[mealIndex];
      if (targetMeal.alternatives.length) {
        yield _this2.ionicUtilService.showAlert({
          header: `¿Sobrescribir "${_this2.rowLabel(_this2.activeRows[dayIndex])} · ${targetMeal.slot}"?`,
          message: 'Ya tiene alimentos compuestos — se reemplazan por los de la comida que arrastraste.',
          buttons: [{
            text: 'Cancelar',
            role: 'cancel'
          }, {
            text: 'Sobrescribir',
            role: 'destructive',
            handler: () => _this2.moveMeal(from, {
              dayIndex,
              mealIndex
            })
          }]
        });
        return;
      }
      _this2.moveMeal(from, {
        dayIndex,
        mealIndex
      });
    })();
  }
  moveMeal(from, to) {
    const sourceMeal = this.activeRows[from.dayIndex].meals[from.mealIndex];
    const targetMeal = this.activeRows[to.dayIndex].meals[to.mealIndex];
    targetMeal.alternatives = sourceMeal.alternatives;
    sourceMeal.alternatives = [];
  }
  // --- Duplicar (copiar, sin mover) una comida a otro día/patrón, mismo slot ---
  duplicateMealTo(dayIndex, mealIndex, event) {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      event.stopPropagation();
      const meal = _this3.activeRows[dayIndex].meals[mealIndex];
      if (!meal.alternatives.length) return;
      const otherRows = _this3.activeRows.map((row, i) => ({
        row,
        i
      })).filter(({
        i
      }) => i !== dayIndex);
      if (!otherRows.length) return;
      yield _this3.ionicUtilService.showActionSheet({
        header: `Copiar "${meal.slot}" a...`,
        buttons: [...otherRows.map(({
          row,
          i
        }) => ({
          text: _this3.rowLabel(row),
          handler: () => {
            _this3.activeRows[i].meals[mealIndex].alternatives = meal.alternatives.map(alt => ({
              label: alt.label,
              items: alt.items.map(item => ({
                ...item
              }))
            }));
          }
        })), {
          text: 'Cancelar',
          role: 'cancel'
        }]
      });
    })();
  }
  trackByIndex(index) {
    return index;
  }
  mealValid(meal) {
    const isMultiple = meal.alternatives.length >= 2;
    return meal.alternatives.every(alt => alt.items.length > 0 && alt.items.every(item => !!(item.productId || item.recipeId)) && (!isMultiple || alt.label.trim()));
  }
  get canSave() {
    if (!this.name.trim()) return false;
    const rowsValid = this.activeRows.every(row => row.meals.every(meal => this.mealValid(meal)));
    if (!rowsValid) return false;
    if (this.mode === 'recurring') {
      return this.dayPatterns.every(p => p.name.trim() && p.appliesTo.length > 0);
    }
    if (this.mode === 'choice') {
      return this.dayPatterns.every(p => p.name.trim());
    }
    return true;
  }
  mealsToSave(meals) {
    return meals.filter(meal => meal.alternatives.length > 0).map(meal => ({
      slot: meal.slot,
      alternatives: meal.alternatives.filter(alt => alt.items.length > 0).map(alt => ({
        label: alt.label.trim(),
        ...this.itemsToCustomEntries(alt.items)
      }))
    }));
  }
  save() {
    if (!this.canSave || this.isSaving) return;
    this.isSaving = true;
    // Solo se envían las comidas con al menos una alternativa — un slot
    // vacío no aporta nada al aplicar la plantilla. Cada alimento se
    // convierte a formato "clipboard" (customProducts/customRecipes) — el
    // que realmente espera el backend, no el TemplateFoodItem de la UI.
    const daysToSave = this.days.map(day => ({
      dayLabel: day.dayLabel.trim() || 'Día',
      meals: this.mealsToSave(day.meals)
    }));
    const dayPatternsToSave = this.dayPatterns.map(pattern => ({
      name: pattern.name.trim() || 'Patrón',
      appliesTo: this.mode === 'recurring' ? pattern.appliesTo : [],
      meals: this.mealsToSave(pattern.meals)
    }));
    if (this.isCreatingForClient) {
      this.saveForClient(daysToSave, dayPatternsToSave);
      return;
    }
    this.dietTemplateApi.update(this.templateId, this.name.trim(), daysToSave, this.mode, dayPatternsToSave).subscribe({
      next: () => {
        this.isSaving = false;
        this.ionicUtilService.showToast({
          message: 'Plantilla guardada',
          duration: 2000
        });
      },
      error: () => {
        this.isSaving = false;
        this.ionicUtilService.showErrorToast('No se pudo guardar la plantilla', 'Error', 3000);
      }
    });
  }
  saveForClient(daysToSave, dayPatternsToSave) {
    const schedule = this.forClientSchedule;
    if (!schedule) {
      this.isSaving = false;
      this.ionicUtilService.showErrorToast('Faltan las fechas del plan — vuelve atrás e inténtalo de nuevo', 'Error', 3500);
      return;
    }
    this.planAssignmentApi.createDirect(this.clientId, {
      name: this.name.trim(),
      days: daysToSave,
      mode: this.mode,
      dayPatterns: dayPatternsToSave,
      startDate: schedule.startDate,
      endMode: schedule.endMode,
      fixedEndDate: schedule.fixedEndDate,
      durationValue: schedule.durationValue,
      durationUnit: schedule.durationUnit
    }).subscribe({
      next: () => {
        this.isSaving = false;
        this.ionicUtilService.showToast({
          message: `Dieta creada y asignada a ${this.clientName}`,
          duration: 2500
        });
        this.router.navigate(['/tabs/clients', this.clientId]);
      },
      error: err => {
        this.isSaving = false;
        const message = err?.status === 409 ? err?.error?.message || 'Esas fechas se solapan con otra fase.' : 'No se pudo crear la dieta';
        this.ionicUtilService.showErrorToast(message, 'Error', 3500);
      }
    });
  }
  goBack() {
    if (this.isCreatingForClient) {
      this.router.navigate(['/tabs/clients', this.clientId]);
      return;
    }
    this.router.navigate(['/tabs/diet-templates']);
  }
}
_DietTemplateBuilderPage = DietTemplateBuilderPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(DietTemplateBuilderPage, "\u0275fac", function DietTemplateBuilderPage_Factory(t) {
  return new (t || _DietTemplateBuilderPage)(_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_11__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_services_diet_template_api_service__WEBPACK_IMPORTED_MODULE_4__.DietTemplateApiService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](_shared_services_plan_assignment_api_service__WEBPACK_IMPORTED_MODULE_5__.PlanAssignmentApiService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_6__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_core_services_custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_7__.CustomProductService), _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdirectiveInject"](src_app_core_services_recipe_recipe_service__WEBPACK_IMPORTED_MODULE_8__.RecipeService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(DietTemplateBuilderPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineComponent"]({
  type: _DietTemplateBuilderPage,
  selectors: [["app-diet-template-builder"]],
  decls: 15,
  vars: 5,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["type", "button", "aria-label", "Volver", 1, "tf-page-header__back-button", 3, "click"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "builder-content"], ["class", "detail-skeleton", 4, "ngIf"], ["class", "state-message", 4, "ngIf"], [4, "ngIf"], [1, "detail-skeleton"], [1, "skeleton-block", 2, "height", "60px"], [1, "state-message"], ["name", "cloud-offline-outline"], [1, "retry-button", 3, "click"], ["name", "calendar-outline"], [1, "input-wrapper"], ["name", "restaurant-outline", 1, "input-icon"], ["type", "text", 1, "input-field", 3, "placeholder", "ngModel", "ngModelChange"], [1, "section-hint"], [1, "end-mode-options"], ["type", "button", 1, "end-mode-option", 3, "click"], ["class", "section-hint mode-hint", 4, "ngIf"], ["class", "empty-hint", 4, "ngIf"], ["class", "empty-hint uncovered-hint", 4, "ngIf"], ["class", "empty-hint duplicate-hint", 4, "ngIf"], ["class", "board-scroll", 4, "ngIf"], ["type", "button", 1, "add-alternative-btn", 3, "disabled", "click"], ["name", "add-outline"], ["type", "button", 1, "submit-button", 3, "disabled", "click"], ["name", "dots", 4, "ngIf"], [1, "section-hint", "mode-hint"], [1, "empty-hint"], [1, "empty-hint", "uncovered-hint"], [1, "empty-hint", "duplicate-hint"], ["name", "alert-circle-outline"], [1, "board-scroll"], [1, "board-grid"], [1, "board-corner"], ["class", "board-day-header", 4, "ngFor", "ngForOf", "ngForTrackBy"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "board-totals-header"], ["class", "board-day-totals", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "board-day-header"], [1, "board-day-header-row"], ["type", "text", 1, "day-label-input", 3, "ngModel", "ngModelChange"], ["type", "button", 1, "board-day-remove", 3, "click"], ["name", "trash-outline"], ["class", "weekday-picker", 4, "ngIf"], [1, "weekday-picker"], ["type", "button", "class", "weekday-chip", 3, "selected", "click", 4, "ngFor", "ngForOf"], ["type", "button", 1, "weekday-chip", 3, "click"], [1, "board-slot-header"], ["type", "button", "class", "board-cell", 3, "has-items", "drag-over", "dragstart", "dragover", "dragleave", "drop", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "board-cell", 3, "dragstart", "dragover", "dragleave", "drop", "click"], [1, "board-cell-summary"], ["type", "button", "class", "board-cell-action", "title", "Copiar a otra columna", "aria-label", "Copiar a otra columna", 3, "click", 4, "ngIf"], ["type", "button", "title", "Copiar a otra columna", "aria-label", "Copiar a otra columna", 1, "board-cell-action", 3, "click"], ["name", "copy-outline"], [1, "board-day-totals"], [4, "ngIf", "ngIfElse"], ["emptyTotals", ""], [1, "totals-kcal"], [1, "totals-macro-bar"], [1, "totals-macro-segment", "totals-macro-segment--protein"], [1, "totals-macro-segment", "totals-macro-segment--carbs"], [1, "totals-macro-segment", "totals-macro-segment--fat"], [1, "totals-macro-legend"], [1, "macro-tag", "macro-tag--protein"], [1, "macro-tag", "macro-tag--carbs"], [1, "macro-tag", "macro-tag--fat"], [1, "totals-empty"], ["name", "dots"]],
  template: function DietTemplateBuilderPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵlistener"]("click", function DietTemplateBuilderPage_Template_button_click_4_listener() {
        return ctx.goBack();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](5, "ion-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](6, "div", 6)(7, "h1", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelement"](9, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementStart"](10, "ion-content", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](11, DietTemplateBuilderPage_div_11_Template, 3, 0, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](12, DietTemplateBuilderPage_div_12_Template, 8, 0, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](13, DietTemplateBuilderPage_div_13_Template, 8, 0, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtemplate"](14, DietTemplateBuilderPage_ng_container_14_Template, 24, 18, "ng-container", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵtextInterpolate"](ctx.isCreatingForClient ? "Crear dieta" : "Editar plantilla");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.state === "loading");
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.state === "error" && !ctx.isCreatingForClient);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.state === "error" && ctx.isCreatingForClient);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵproperty"]("ngIf", ctx.state === "loaded");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_12__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_12__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_14__.IonSpinner, _angular_common__WEBPACK_IMPORTED_MODULE_12__.DecimalPipe],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n.builder-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 12px;\n  --padding-bottom: 24px;\n}\n\n.detail-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.skeleton-block[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n  border-radius: 12px;\n}\n.skeleton-block[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n\n.empty-hint[_ngcontent-%COMP%] {\n  font-size: 0.86rem;\n  color: var(--tf-text-muted);\n  text-align: center;\n}\n\n.state-message[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 10px;\n  padding: 96px 32px 0;\n  color: var(--tf-text-muted);\n}\n.state-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  color: var(--tf-text-faint);\n  margin-bottom: 6px;\n}\n.state-message[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: var(--tf-text);\n  margin: 0;\n}\n.state-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  line-height: 1.5;\n  max-width: 34ch;\n  margin: 0 0 4px;\n}\n\n.retry-button[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  height: var(--tf-touch-min);\n  padding: 0 20px;\n  background: var(--tf-surface-5);\n  color: var(--tf-text);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-sm);\n  font-size: 0.9rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform var(--tf-duration-fast) var(--tf-ease-out);\n}\n.retry-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.96);\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n  position: relative;\n  height: 50px;\n  margin-bottom: 12px;\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  flex-shrink: 0;\n  font-size: 1.1rem;\n}\n\n.input-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n  font-size: 0.9rem;\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.add-alternative-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 44px;\n  margin-bottom: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  background: transparent;\n  border: 1px dashed var(--tf-border-strongest);\n  border-radius: 12px;\n  color: var(--tf-text-secondary);\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.add-alternative-btn[_ngcontent-%COMP%]:not(:disabled):hover {\n  border-color: var(--tf-accent);\n  color: var(--tf-accent);\n}\n.add-alternative-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  width: 100%;\n  height: 50px;\n  font-size: 0.92rem;\n}\n.submit-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n\n.section-hint[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--tf-text-secondary);\n  margin: 4px 0 8px;\n}\n\n.mode-hint[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--tf-text-muted);\n  margin-top: -4px;\n}\n\n.end-mode-options[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin-bottom: 12px;\n}\n\n.end-mode-option[_ngcontent-%COMP%] {\n  height: 40px;\n  border-radius: 10px;\n  border: 1px solid var(--tf-border-strong);\n  background: var(--tf-surface-2);\n  color: var(--tf-text-secondary);\n  font-size: 0.8rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.end-mode-option.selected[_ngcontent-%COMP%] {\n  border-color: var(--tf-accent);\n  color: var(--tf-accent);\n  background: var(--tf-accent-soft);\n}\n\n.uncovered-hint[_ngcontent-%COMP%] {\n  color: var(--tf-accent-text);\n  margin-bottom: 8px;\n}\n\n.duplicate-hint[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  color: var(--tf-danger);\n  margin-bottom: 8px;\n}\n.duplicate-hint[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 1rem;\n}\n\n.weekday-picker[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 3px;\n}\n\n.weekday-chip[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 22px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 5px;\n  border: 1px solid var(--tf-border-strong);\n  background: transparent;\n  color: var(--tf-text-muted);\n  font-size: 0.66rem;\n  font-weight: 700;\n  cursor: pointer;\n  padding: 0;\n}\n.weekday-chip.selected[_ngcontent-%COMP%] {\n  border-color: var(--tf-accent);\n  color: var(--tf-accent-contrast, #fff);\n  background: var(--tf-accent);\n}\n\n.board-scroll[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  margin-bottom: 16px;\n  border-radius: 12px;\n  border: 1px solid var(--tf-border);\n  -webkit-overflow-scrolling: touch;\n}\n\n.board-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-auto-rows: minmax(56px, auto);\n  gap: 1px;\n  background: var(--tf-border);\n  width: 100%;\n}\n\n.board-corner[_ngcontent-%COMP%], .board-day-header[_ngcontent-%COMP%], .board-slot-header[_ngcontent-%COMP%], .board-cell[_ngcontent-%COMP%] {\n  background: var(--tf-surface-1);\n}\n\n.board-corner[_ngcontent-%COMP%] {\n  position: sticky;\n  left: 0;\n  z-index: 2;\n}\n\n.board-day-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  padding: 8px;\n}\n\n.board-day-header-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n\n.board-day-header[_ngcontent-%COMP%]   .day-label-input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  color: var(--tf-text);\n  font-size: 0.82rem;\n  font-weight: 600;\n}\n.board-day-header[_ngcontent-%COMP%]   .day-label-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n\n.board-day-remove[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  color: var(--tf-text-muted);\n  cursor: pointer;\n  flex-shrink: 0;\n}\n.board-day-remove[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.board-day-remove[_ngcontent-%COMP%]:hover {\n  color: var(--tf-danger);\n}\n\n.board-slot-header[_ngcontent-%COMP%] {\n  position: sticky;\n  left: 0;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  padding: 0 10px;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--tf-text-secondary);\n}\n\n.board-cell[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  justify-content: center;\n  gap: 2px;\n  padding: 8px 10px;\n  border: none;\n  cursor: pointer;\n  text-align: left;\n}\n.board-cell.has-items[_ngcontent-%COMP%] {\n  background: var(--tf-accent-soft);\n}\n.board-cell.drag-over[_ngcontent-%COMP%] {\n  outline: 2px dashed var(--tf-accent);\n  outline-offset: -2px;\n}\n.board-cell[draggable=true][_ngcontent-%COMP%] {\n  cursor: grab;\n}\n\n.board-cell-summary[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--tf-text-muted);\n}\n.has-items[_ngcontent-%COMP%]   .board-cell-summary[_ngcontent-%COMP%] {\n  color: var(--tf-accent);\n  font-weight: 600;\n}\n\n.board-cell-action[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 4px;\n  right: 4px;\n  width: 22px;\n  height: 22px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  color: var(--tf-text-muted);\n  cursor: pointer;\n}\n.board-cell-action[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.board-cell-action[_ngcontent-%COMP%]:hover {\n  color: var(--tf-accent);\n}\n\n.board-totals-header[_ngcontent-%COMP%] {\n  position: sticky;\n  left: 0;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  padding: 0 10px;\n  font-size: 0.72rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  color: var(--tf-text-faint);\n  background: var(--tf-surface-2);\n}\n\n.board-day-totals[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  gap: 6px;\n  padding: 10px;\n  background: var(--tf-surface-2);\n}\n\n.totals-kcal[_ngcontent-%COMP%] {\n  font-size: 1.15rem;\n  font-weight: 800;\n  color: var(--tf-text);\n  line-height: 1;\n}\n.totals-kcal[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  margin-left: 3px;\n  font-size: 0.62rem;\n  font-weight: 600;\n  color: var(--tf-text-muted);\n  text-transform: uppercase;\n}\n\n.totals-macro-bar[_ngcontent-%COMP%] {\n  display: flex;\n  height: 5px;\n  border-radius: var(--tf-radius-pill);\n  overflow: hidden;\n  background: var(--tf-surface-4);\n}\n\n.totals-macro-segment[_ngcontent-%COMP%] {\n  flex-basis: 0;\n  flex-shrink: 0;\n  min-width: 0;\n  transition: flex-grow var(--tf-duration-base) var(--tf-ease-out);\n}\n.totals-macro-segment--protein[_ngcontent-%COMP%] {\n  background: #60a5fa;\n}\n.totals-macro-segment--carbs[_ngcontent-%COMP%] {\n  background: #34d399;\n}\n.totals-macro-segment--fat[_ngcontent-%COMP%] {\n  background: #f472b6;\n}\n\n.totals-macro-legend[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n\n.macro-tag[_ngcontent-%COMP%] {\n  font-size: 0.66rem;\n  font-weight: 700;\n  color: var(--tf-text-muted);\n  font-variant-numeric: tabular-nums;\n}\n.macro-tag--protein[_ngcontent-%COMP%] {\n  color: #60a5fa;\n}\n.macro-tag--carbs[_ngcontent-%COMP%] {\n  color: #34d399;\n}\n.macro-tag--fat[_ngcontent-%COMP%] {\n  color: #f472b6;\n}\n\n.totals-empty[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  color: var(--tf-text-faint);\n  font-style: italic;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZGlldC10ZW1wbGF0ZXMvcGFnZXMvZGlldC10ZW1wbGF0ZS1idWlsZGVyL2RpZXQtdGVtcGxhdGUtYnVpbGRlci5wYWdlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX2lucHV0cy5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19idXR0b25zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJBO0VBQ0U7SUFDRSwyQkFBQTtFQ3hCRjtBQUNGO0FBQUE7RUFDRSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0FBRUY7O0FBQ0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0FBRUY7O0FBQ0E7RURiRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7RUNlQSxtQkFBQTtBQUVGO0FEZkU7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsNEJBQUE7RUFDQSwrRUFBQTtFQUNBLG1DQUFBO0FDaUJKO0FEZEU7RUFDRTtJQUNFLGVBQUE7RUNnQko7QUFDRjs7QUFaQTtFQUNFLGtCQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQkFBQTtBQWVGOztBQVRBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxvQkFBQTtFQUNBLDJCQUFBO0FBWUY7QUFWRTtFQUNFLGVBQUE7RUFDQSwyQkFBQTtFQUNBLGtCQUFBO0FBWUo7QUFURTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLFNBQUE7QUFXSjtBQVJFO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0FBVUo7O0FBTkE7RUFDRSxlQUFBO0VBQ0EsMkJBQUE7RUFDQSxlQUFBO0VBQ0EsK0JBQUE7RUFDQSxxQkFBQTtFQUNBLHlDQUFBO0VBQ0Esa0NBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGdFQUFBO0FBU0Y7QUFQRTtFQUNFLHNCQUFBO0FBU0o7O0FBTEE7RUM1RUUsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLCtCRDBFMEI7RUN6RTFCLHlDQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsaURBQUE7RUR1RUEsa0JBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7QUFlRjtBQ3RGRTtFQUNFLDhCQUFBO0FEd0ZKOztBQWZBO0VDcEVFLDJCQUFBO0VBQ0EsY0FBQTtFRHFFQSxpQkFBQTtBQW1CRjs7QUFoQkE7RUNwRUUsT0FBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EscUJBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7RUQrREEsaUJBQUE7QUEwQkY7QUN2RkU7RUFDRSwyQkFBQTtBRHlGSjs7QUExQkE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxRQUFBO0VBQ0EsdUJBQUE7RUFDQSw2Q0FBQTtFQUNBLG1CQUFBO0VBQ0EsK0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQTZCRjtBQTNCRTtFQUNFLDhCQUFBO0VBQ0EsdUJBQUE7QUE2Qko7QUExQkU7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQTRCSjs7QUF4QkE7RUVwSEUsWUFBQTtFQUNBLG1CQUZpQztFQUdqQyxxQ0FBQTtFQUNBLGdDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0ZBQUE7RUZnSEEsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQWlDRjtBRWpKRTtFQUNFLHNCQUFBO0FGbUpKO0FFaEpFO0VBQ0UsYUFBQTtFQUNBLGVBQUE7QUZrSko7QUUvSUU7RUFDRSxpQ0FBQTtFQUNBLG1CQUFBO0FGaUpKOztBQXRDQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSwrQkFBQTtFQUNBLGlCQUFBO0FBeUNGOztBQXRDQTtFQUNFLGdCQUFBO0VBQ0EsMkJBQUE7RUFDQSxnQkFBQTtBQXlDRjs7QUF0Q0E7RUFDRSxhQUFBO0VBQ0EscUNBQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7QUF5Q0Y7O0FBdENBO0VBQ0UsWUFBQTtFQUNBLG1CQUFBO0VBQ0EseUNBQUE7RUFDQSwrQkFBQTtFQUNBLCtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUF5Q0Y7QUF2Q0U7RUFDRSw4QkFBQTtFQUNBLHVCQUFBO0VBQ0EsaUNBQUE7QUF5Q0o7O0FBbENBO0VBQ0UsNEJBQUE7RUFDQSxrQkFBQTtBQXFDRjs7QUEvQkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtBQWtDRjtBQWhDRTtFQUNFLGNBQUE7RUFDQSxlQUFBO0FBa0NKOztBQTlCQTtFQUNFLGFBQUE7RUFDQSxRQUFBO0FBaUNGOztBQTlCQTtFQUNFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLHlDQUFBO0VBQ0EsdUJBQUE7RUFDQSwyQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsVUFBQTtBQWlDRjtBQS9CRTtFQUNFLDhCQUFBO0VBQ0Esc0NBQUE7RUFDQSw0QkFBQTtBQWlDSjs7QUEzQkE7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQ0FBQTtFQU1BLGlDQUFBO0FBeUJGOztBQXRCQTtFQUNFLGFBQUE7RUFDQSxrQ0FBQTtFQUNBLFFBQUE7RUFDQSw0QkFBQTtFQUtBLFdBQUE7QUFxQkY7O0FBbEJBOzs7O0VBSUUsK0JBQUE7QUFxQkY7O0FBbEJBO0VBQ0UsZ0JBQUE7RUFDQSxPQUFBO0VBQ0EsVUFBQTtBQXFCRjs7QUFsQkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0VBQ0EsWUFBQTtBQXFCRjs7QUFsQkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBcUJGOztBQWxCQTtFQUNFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBcUJGO0FBbkJFO0VBQ0UsYUFBQTtBQXFCSjs7QUFqQkE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBQW9CRjtBQWxCRTtFQUNFLGVBQUE7QUFvQko7QUFqQkU7RUFDRSx1QkFBQTtBQW1CSjs7QUFmQTtFQUNFLGdCQUFBO0VBQ0EsT0FBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLCtCQUFBO0FBa0JGOztBQWZBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLHVCQUFBO0VBQ0EsUUFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQWtCRjtBQWhCRTtFQUNFLGlDQUFBO0FBa0JKO0FBZkU7RUFDRSxvQ0FBQTtFQUNBLG9CQUFBO0FBaUJKO0FBZEU7RUFDRSxZQUFBO0FBZ0JKOztBQVpBO0VBQ0Usa0JBQUE7RUFDQSwyQkFBQTtBQWVGO0FBYkU7RUFDRSx1QkFBQTtFQUNBLGdCQUFBO0FBZUo7O0FBWEE7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLDJCQUFBO0VBQ0EsZUFBQTtBQWNGO0FBWkU7RUFDRSxlQUFBO0FBY0o7QUFYRTtFQUNFLHVCQUFBO0FBYUo7O0FBSkE7RUFDRSxnQkFBQTtFQUNBLE9BQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7RUFDQSwrQkFBQTtBQU9GOztBQUpBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSxRQUFBO0VBQ0EsYUFBQTtFQUNBLCtCQUFBO0FBT0Y7O0FBSkE7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxjQUFBO0FBT0Y7QUFMRTtFQUNFLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLDJCQUFBO0VBQ0EseUJBQUE7QUFPSjs7QUFIQTtFQUNFLGFBQUE7RUFDQSxXQUFBO0VBQ0Esb0NBQUE7RUFDQSxnQkFBQTtFQUNBLCtCQUFBO0FBTUY7O0FBSEE7RUFDRSxhQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7RUFDQSxnRUFBQTtBQU1GO0FBSkU7RUFDRSxtQkFBQTtBQU1KO0FBSEU7RUFDRSxtQkFBQTtBQUtKO0FBRkU7RUFDRSxtQkFBQTtBQUlKOztBQUFBO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSxRQUFBO0FBR0Y7O0FBQUE7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQ0FBQTtBQUdGO0FBREU7RUFDRSxjQUFBO0FBR0o7QUFBRTtFQUNFLGNBQUE7QUFFSjtBQUNFO0VBQ0UsY0FBQTtBQUNKOztBQUdBO0VBQ0Usa0JBQUE7RUFDQSwyQkFBQTtFQUNBLGtCQUFBO0FBQUYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTa2VsZXRvbiBkZSBjYXJnYSBjb24gYmFycmlkbyBkZSBzaGltbWVyIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gbGl0ZXJhbG1lbnRlXG4vLyBlbiB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgKGJvcmRlci1yYWRpdXMsIGhlaWdodCwgd2lkdGgsIHZhcmlhbnRlcyBjb24gbm9tYnJlKS5cbkBtaXhpbiB0Zi1za2VsZXRvbi1zaGltbWVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuXG4gICY6OmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHRyYW5zcGFyZW50LCB2YXIoLS10Zi1zaGltbWVyKSwgdHJhbnNwYXJlbnQpO1xuICAgIGFuaW1hdGlvbjogdGYtc2hpbW1lciAxLjRzIGluZmluaXRlO1xuICB9XG5cbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICAmOjphZnRlciB7XG4gICAgICBhbmltYXRpb246IG5vbmU7XG4gICAgfVxuICB9XG59XG5cbkBrZXlmcmFtZXMgdGYtc2hpbW1lciB7XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgfVxufVxuIiwiQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vdGhlbWUvc2tlbGV0b24nO1xuQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vdGhlbWUvYnV0dG9ucyc7XG5AaW1wb3J0ICcuLi8uLi8uLi8uLi8uLi90aGVtZS9pbnB1dHMnO1xuXG4uYnVpbGRlci1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1iZyk7XG4gIC0tcGFkZGluZy1zdGFydDogMTZweDtcbiAgLS1wYWRkaW5nLWVuZDogMTZweDtcbiAgLS1wYWRkaW5nLXRvcDogMTJweDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMjRweDtcbn1cblxuLmRldGFpbC1za2VsZXRvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogOHB4O1xufVxuXG4uc2tlbGV0b24tYmxvY2sge1xuICAvLyBBbnRlcyBzaW4gQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIMOiwoDClCBlbCBtaXhpbiBsbyBpbmNsdXllXG4gIC8vIHNpZW1wcmUsIGNpZXJyYSB1biBodWVjbyBkZSBhY2Nlc2liaWxpZGFkIHJlYWwgcXVlIHRlbsODwq1hIGVzdGEgcMODwqFnaW5hLlxuICBAaW5jbHVkZSB0Zi1za2VsZXRvbi1zaGltbWVyO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xufVxuXG4uZW1wdHktaGludCB7XG4gIGZvbnQtc2l6ZTogMC44NnJlbTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi8vIEVzdGFkbyBkZSBlcnJvciBhIHBhbnRhbGxhIGNvbXBsZXRhIMOiwoDClCBtaXNtbyBwYXRyw4PCs24gcXVlIGNsaWVudHMucGFnZS5zY3NzIC9cbi8vIGRhc2hib2FyZC5wYWdlLnNjc3MgKGljb25vICsgaDIgKyBwICsgQ1RBKSwgZW4gdmV6IGRlbCBww4PCoXJyYWZvIHN1ZWx0byBxdWVcbi8vIHRlbsODwq1hIGFudGVzIGVzdGEgcGFudGFsbGEuXG4uc3RhdGUtbWVzc2FnZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xuICBwYWRkaW5nOiA5NnB4IDMycHggMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDQwcHg7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtZmFpbnQpO1xuICAgIG1hcmdpbi1ib3R0b206IDZweDtcbiAgfVxuXG4gIGgyIHtcbiAgICBmb250LXNpemU6IDEuMDVyZW07XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgcCB7XG4gICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICBtYXgtd2lkdGg6IDM0Y2g7XG4gICAgbWFyZ2luOiAwIDAgNHB4O1xuICB9XG59XG5cbi5yZXRyeS1idXR0b24ge1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIGhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgcGFkZGluZzogMCAyMHB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTUpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtc20pO1xuICBmb250LXNpemU6IDAuOXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpO1xuICB9XG59XG5cbi5pbnB1dC13cmFwcGVyIHtcbiAgQGluY2x1ZGUgdGYtaW5wdXQtd3JhcHBlcih2YXIoLS10Zi1zdXJmYWNlLTIpKTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBoZWlnaHQ6IDUwcHg7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG59XG5cbi5pbnB1dC1pY29uIHtcbiAgQGluY2x1ZGUgdGYtaW5wdXQtaWNvbjtcbiAgZm9udC1zaXplOiAxLjFyZW07XG59XG5cbi5pbnB1dC1maWVsZCB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LWZpZWxkO1xuICBmb250LXNpemU6IDAuOXJlbTtcbn1cblxuLmFkZC1hbHRlcm5hdGl2ZS1idG4ge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA0NHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IDFweCBkYXNoZWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZ2VzdCk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICY6bm90KDpkaXNhYmxlZCk6aG92ZXIge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgICBjb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNDtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gIH1cbn1cblxuLnN1Ym1pdC1idXR0b24ge1xuICBAaW5jbHVkZSB0Zi1ncmFkaWVudC1idXR0b247XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDUwcHg7XG4gIGZvbnQtc2l6ZTogMC45MnJlbTtcbn1cblxuLy8gQXVkaXRvcsODwq1hIGRlIGFycXVpdGVjdHVyYSAoRmFzZSA4LzkpIMOiwoDClCBzZWxlY3RvciBkZSBtb2RvIChzZWN1ZW5jaWFsIC9cbi8vIHJlY3VycmVudGUgcG9yIHNlbWFuYSAvIGVsZWdpZG8gcG9yIGVsIGNsaWVudGUpLCBtaXNtbyBsb29rIHF1ZSBlbFxuLy8gc2VsZWN0b3IgZGUgcGVyaW9kbyBkZWwgbW9kYWwgXCJBcGxpY2FyIHBsYW50aWxsYVwiLlxuLnNlY3Rpb24taGludCB7XG4gIGZvbnQtc2l6ZTogMC43OHJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgbWFyZ2luOiA0cHggMCA4cHg7XG59XG5cbi5tb2RlLWhpbnQge1xuICBmb250LXdlaWdodDogNDAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIG1hcmdpbi10b3A6IC00cHg7XG59XG5cbi5lbmQtbW9kZS1vcHRpb25zIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcbiAgZ2FwOiA4cHg7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG59XG5cbi5lbmQtbW9kZS1vcHRpb24ge1xuICBoZWlnaHQ6IDQwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBmb250LXNpemU6IDAuOHJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICYuc2VsZWN0ZWQge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgICBjb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtc29mdCk7XG4gIH1cbn1cblxuLy8gTm8gaGF5IHRva2VuIHNlbcODwqFudGljbyBkZSBcIndhcm5pbmdcIiBlbiB0b2tlbnMuc2NzcyDDosKAwpQgZXN0ZSBhdmlzbyBubyBibG9xdWVhXG4vLyBndWFyZGFyLCBhc8ODwq0gcXVlIHJldXRpbGl6YSBlbCBhY2VudG8gZGUgbWFyY2EgKHRleHRvKSBlbiB2ZXogZGUgaW52ZW50YXIgdW5cbi8vIGhleCBzdWVsdG8gbnVldm8uXG4udW5jb3ZlcmVkLWhpbnQge1xuICBjb2xvcjogdmFyKC0tdGYtYWNjZW50LXRleHQpO1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG59XG5cbi8vIENhc28gY29udHJhcmlvIGEgdW5jb3ZlcmVkV2Vla2RheXMgKHVuIGTDg8KtYSBlbiAwIHBhdHJvbmVzIHZzLiB1biBkw4PCrWEgZW4gMispXG4vLyDDosKAwpQgZW4gLS10Zi1kYW5nZXIsIG5vIGVsIGFjZW50byBkZSBtYXJjYTogYXF1w4PCrSBlbCByaWVzZ28gcmVhbCBlcyBxdWUgZWxcbi8vIHRyYWluZXIgY3JlYSBxdWUgbWFuZGEgdW4gcGF0csODwrNuIGN1YW5kbyBlbiBsYSBwcsODwqFjdGljYSBtYW5kYSBvdHJvLlxuLmR1cGxpY2F0ZS1oaW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG4gIGNvbG9yOiB2YXIoLS10Zi1kYW5nZXIpO1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG5cbiAgaW9uLWljb24ge1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgfVxufVxuXG4ud2Vla2RheS1waWNrZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDNweDtcbn1cblxuLndlZWtkYXktY2hpcCB7XG4gIGZsZXg6IDE7XG4gIGhlaWdodDogMjJweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGZvbnQtc2l6ZTogMC42NnJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBwYWRkaW5nOiAwO1xuXG4gICYuc2VsZWN0ZWQge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgICBjb2xvcjogdmFyKC0tdGYtYWNjZW50LWNvbnRyYXN0LCAjZmZmKTtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQpO1xuICB9XG59XG5cbi8vID09PSBUQVJFQTUgKGF1ZGl0b3LDg8KtYSBVWCwgRmFzZSBDKSDDosKAwpQgdGFibGVybyBzZW1hbmFsID09PVxuXG4uYm9hcmQtc2Nyb2xsIHtcbiAgb3ZlcmZsb3cteDogYXV0bztcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcblxuICAvLyBTaW4gZXN0bywgZWwgc2Nyb2xsIGhvcml6b250YWwgbmF0aXZvIGFwYXJlY2UgcGVybyBhcnJhc3RyYXIgdW5hIGNlbGRhXG4gIC8vIChkcmFnJmRyb3ApIG5vIHNlIGRpc3Rpbmd1ZSB2aXN1YWxtZW50ZSBkZSB1biBzaW1wbGUgc2Nyb2xsIMOiwoDClCBlbFxuICAvLyAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZyBzdWF2ZSBheXVkYSBlbiB0cmFja3BhZHMvdG91Y2ggYSBxdWUgZWxcbiAgLy8gcHJpbWVyIGdlc3RvIG5vIHNlIGNvbmZ1bmRhIGNvbiBpbmljaWFyIHVuIGRyYWcuXG4gIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaDtcbn1cblxuLmJvYXJkLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLWF1dG8tcm93czogbWlubWF4KDU2cHgsIGF1dG8pO1xuICBnYXA6IDFweDtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYm9yZGVyKTtcbiAgLy8gTGFzIGNvbHVtbmFzIHVzYW4gbWlubWF4KDE2MHB4LCAxZnIpOiBlbiBlc2NyaXRvcmlvIGFuY2hvIHNlIHJlcGFydGVuIGVsXG4gIC8vIGVzcGFjaW8gc29icmFudGUgZW4gdmV6IGRlIGRlamFybG8gdmFjw4PCrW8gYSBsYSBkZXJlY2hhOyBjb24gbXVjaGFzXG4gIC8vIGNvbHVtbmFzIChtw4PCoXMgZMODwq1hcyBkZSBsb3MgcXVlIGNhYmVuKSBlbCBtw4PCrW5pbW8gZGUgMTYwcHggZnVlcnphIGVsIGFuY2hvXG4gIC8vIGEgc3VwZXJhciBlbCAxMDAlIHkgYXBhcmVjZSBlbCBzY3JvbGwgaG9yaXpvbnRhbCBkZSAuYm9hcmQtc2Nyb2xsLlxuICB3aWR0aDogMTAwJTtcbn1cblxuLmJvYXJkLWNvcm5lcixcbi5ib2FyZC1kYXktaGVhZGVyLFxuLmJvYXJkLXNsb3QtaGVhZGVyLFxuLmJvYXJkLWNlbGwge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTEpO1xufVxuXG4uYm9hcmQtY29ybmVyIHtcbiAgcG9zaXRpb246IHN0aWNreTtcbiAgbGVmdDogMDtcbiAgei1pbmRleDogMjtcbn1cblxuLmJvYXJkLWRheS1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDZweDtcbiAgcGFkZGluZzogOHB4O1xufVxuXG4uYm9hcmQtZGF5LWhlYWRlci1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDRweDtcbn1cblxuLmJvYXJkLWRheS1oZWFkZXIgLmRheS1sYWJlbC1pbnB1dCB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICBmb250LXNpemU6IDAuODJyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG5cbiAgJjpmb2N1cyB7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgfVxufVxuXG4uYm9hcmQtZGF5LXJlbW92ZSB7XG4gIHdpZHRoOiAyNHB4O1xuICBoZWlnaHQ6IDI0cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZmxleC1zaHJpbms6IDA7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgfVxuXG4gICY6aG92ZXIge1xuICAgIGNvbG9yOiB2YXIoLS10Zi1kYW5nZXIpO1xuICB9XG59XG5cbi5ib2FyZC1zbG90LWhlYWRlciB7XG4gIHBvc2l0aW9uOiBzdGlja3k7XG4gIGxlZnQ6IDA7XG4gIHotaW5kZXg6IDE7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDAgMTBweDtcbiAgZm9udC1zaXplOiAwLjc4cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xufVxuXG4uYm9hcmQtY2VsbCB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDJweDtcbiAgcGFkZGluZzogOHB4IDEwcHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuXG4gICYuaGFzLWl0ZW1zIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtc29mdCk7XG4gIH1cblxuICAmLmRyYWctb3ZlciB7XG4gICAgb3V0bGluZTogMnB4IGRhc2hlZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAtMnB4O1xuICB9XG5cbiAgJltkcmFnZ2FibGU9J3RydWUnXSB7XG4gICAgY3Vyc29yOiBncmFiO1xuICB9XG59XG5cbi5ib2FyZC1jZWxsLXN1bW1hcnkge1xuICBmb250LXNpemU6IDAuNzhyZW07XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcblxuICAuaGFzLWl0ZW1zICYge1xuICAgIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIH1cbn1cblxuLmJvYXJkLWNlbGwtYWN0aW9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDRweDtcbiAgcmlnaHQ6IDRweDtcbiAgd2lkdGg6IDIycHg7XG4gIGhlaWdodDogMjJweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gIH1cblxuICAmOmhvdmVyIHtcbiAgICBjb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgfVxufVxuXG4vLyBGMjAtc2VwdGllcyDDosKAwpQgZmlsYSBkZSB0b3RhbGVzIGRlIG1hY3JvcywgbWlzbWEgY3VhZHLDg8KtY3VsYSBxdWUgZWwgcmVzdG9cbi8vIGRlbCB0YWJsZXJvICh1bmEgY2VsZGEgcG9yIGNvbHVtbmEpLiBNaXNtb3MgY29sb3JlcyBwb3IgbWFjcm8gcXVlXG4vLyA8YXBwLW51dHJpdGlvbi10cmFja2luZy1jaGFydD4gKHByb3Rlw4PCrW5hL2NhcmJvcy9ncmFzYSkgw6LCgMKUIGVsIG1pc21vXG4vLyBsZW5ndWFqZSB2aXN1YWwgZW4gdG9kbyBlbCBtw4PCs2R1bG8gZGUgbnV0cmljacODwrNuLCBubyB1bmEgcGFsZXRhIG51ZXZhXG4vLyBpbnZlbnRhZGEgYXF1w4PCrS5cbi5ib2FyZC10b3RhbHMtaGVhZGVyIHtcbiAgcG9zaXRpb246IHN0aWNreTtcbiAgbGVmdDogMDtcbiAgei1pbmRleDogMTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMCAxMHB4O1xuICBmb250LXNpemU6IDAuNzJyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LWZhaW50KTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbn1cblxuLmJvYXJkLWRheS10b3RhbHMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMik7XG59XG5cbi50b3RhbHMta2NhbCB7XG4gIGZvbnQtc2l6ZTogMS4xNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICBsaW5lLWhlaWdodDogMTtcblxuICBzbWFsbCB7XG4gICAgbWFyZ2luLWxlZnQ6IDNweDtcbiAgICBmb250LXNpemU6IDAuNjJyZW07XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgfVxufVxuXG4udG90YWxzLW1hY3JvLWJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogNXB4O1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtcGlsbCk7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG59XG5cbi50b3RhbHMtbWFjcm8tc2VnbWVudCB7XG4gIGZsZXgtYmFzaXM6IDA7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICBtaW4td2lkdGg6IDA7XG4gIHRyYW5zaXRpb246IGZsZXgtZ3JvdyB2YXIoLS10Zi1kdXJhdGlvbi1iYXNlKSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJi0tcHJvdGVpbiB7XG4gICAgYmFja2dyb3VuZDogIzYwYTVmYTtcbiAgfVxuXG4gICYtLWNhcmJzIHtcbiAgICBiYWNrZ3JvdW5kOiAjMzRkMzk5O1xuICB9XG5cbiAgJi0tZmF0IHtcbiAgICBiYWNrZ3JvdW5kOiAjZjQ3MmI2O1xuICB9XG59XG5cbi50b3RhbHMtbWFjcm8tbGVnZW5kIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IDZweDtcbn1cblxuLm1hY3JvLXRhZyB7XG4gIGZvbnQtc2l6ZTogMC42NnJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBmb250LXZhcmlhbnQtbnVtZXJpYzogdGFidWxhci1udW1zO1xuXG4gICYtLXByb3RlaW4ge1xuICAgIGNvbG9yOiAjNjBhNWZhO1xuICB9XG5cbiAgJi0tY2FyYnMge1xuICAgIGNvbG9yOiAjMzRkMzk5O1xuICB9XG5cbiAgJi0tZmF0IHtcbiAgICBjb2xvcjogI2Y0NzJiNjtcbiAgfVxufVxuXG4udG90YWxzLWVtcHR5IHtcbiAgZm9udC1zaXplOiAwLjc0cmVtO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1mYWludCk7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbn1cblxuIiwiLy8gRmlsYSBkZSBpbnB1dCBjb24gaWNvbm8gKHdyYXBwZXIgKyBpY29ubyArIGNhbXBvKSDDosKAwpQgcmVwZXRpZGEgZW4gNCBww4PCoWdpbmFzXG4vLyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLiBFbCBmb25kb1xuLy8gZGVsIHdyYXBwZXIgZXMgZWwgw4PCum5pY28gdmFsb3IgcXVlIHZhcsODwq1hIHBvciBww4PCoWdpbmEgKHN1cGVyZmljaWUgMSBvIDIgc2Vnw4PCum5cbi8vIGNvbnRleHRvIHZpc3VhbCksIGRlIGFow4PCrSBlbCBwYXLDg8KhbWV0cm87IHRhbWHDg8KxbyBkZSBmdWVudGUvYWx0by9tYXJnZW4gc2Vcbi8vIGRlamFuIGZ1ZXJhIGRlbCBtaXhpbiBwb3JxdWUgY2FkYSBww4PCoWdpbmEgbG9zIGZpamEgc2Vnw4PCum4gc3UgcHJvcGlvIGxheW91dC5cbkBtaXhpbiB0Zi1pbnB1dC13cmFwcGVyKCRiZzogdmFyKC0tdGYtc3VyZmFjZS0xKSkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEwcHg7XG4gIGJhY2tncm91bmQ6ICRiZztcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBhZGRpbmc6IDAgMTRweDtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmZvY3VzLXdpdGhpbiB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICB9XG59XG5cbkBtaXhpbiB0Zi1pbnB1dC1pY29uIHtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBmbGV4LXNocmluazogMDtcbn1cblxuQG1peGluIHRmLWlucHV0LWZpZWxkIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBvdXRsaW5lOiBub25lO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBoZWlnaHQ6IDEwMCU7XG5cbiAgJjo6cGxhY2Vob2xkZXIge1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgfVxufVxuIiwiLy8gQm90w4PCs24gQ1RBIGNvbiBncmFkaWVudGUgZGUgYWNlbnRvIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gZW4gfjExIHNpdGlvcyBkZVxuLy8gfjEwIHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS5cbi8vIENhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW8gc2VsZWN0b3IgeSBhw4PCsWFkZSBlbmNpbWEgc29sbyBsb1xuLy8gcXVlIHZhcsODwq1hIHBvciBsYXlvdXQgKHdpZHRoLCBoZWlnaHQsIGZvbnQtc2l6ZSwgbWFyZ2luKS5cbi8vXG4vLyBMYSBtaXRhZCBkZSBsb3Mgc2l0aW9zIG9yaWdpbmFsZXMgbm8gdGVuw4PCrWFuIHRyYW5zaWNpw4PCs24vZmVlZGJhY2sgZGUgcHVsc2FjacODwrNuXG4vLyBuaSA6Zm9jdXMtdmlzaWJsZSDDosKAwpQgZWwgbWl4aW4gbG9zIGHDg8KxYWRlIHNpZW1wcmUsIGNpZXJyYSBlc2UgaHVlY28gZGVcbi8vIGNvbnNpc3RlbmNpYSBkZSBpbnRlcmFjY2nDg8KzbiAoUFJPRFVDVC5tZDogXCJ1biBzb2xvIHBhdHLDg8KzbiBwb3IgdGlwbyBkZVxuLy8gY29tcG9uZW50ZVwiKSBlbiB2ZXogZGUgcGVycGV0dWFyIGxhIHZhcmlhY2nDg8KzbiBhY2NpZGVudGFsLlxuQG1peGluIHRmLWdyYWRpZW50LWJ1dHRvbigkcmFkaXVzOiAxMnB4KSB7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LWdyYWRpZW50KTtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudC1jb250cmFzdCk7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSwgb3BhY2l0eSAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45Nyk7XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjQ1O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLXRleHQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLy8gQm90w4PCs24gZGUgaGVhZGVyIHF1ZSBlcyBzb2xvIHVuIGljb25vIMOiwoDClCBtaXNtbyBsb29rIFwiZW52dWVsdG9cIiBxdWUgeWEgdXNhIGxhXG4vLyBhcHAgZGUgY29uc3VtaWRvciBlbiBzdXMgdG9vbGJhcnMgKHBhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy8uLi4vZGlldHMvXG4vLyBjb21wb25lbnRzL3Rvb2xiYXItY2FsZW5kYXI6IGZvbmRvICsgYm9yZGVyLXJhZGl1cyArIGNhamEgZmlqYSA0NHg0NCwgZW5cbi8vIHZleiBkZWwgaW9uLWJ1dHRvbiBwbGFuby90cmFuc3BhcmVudGUgcXVlIHRlbsODwq1hIGNhZGEgcGFudGFsbGEgZGUgdHJhaW5lcnNcbi8vIGhhc3RhIGFob3JhKS4gVG9rZW5lYWRvIGEgbGEgcGFsZXRhIGRlIGVzdGEgYXBwIGVuIHZleiBkZSByZXBldGlyIGxvc1xuLy8gcmdiYSgyNTUsMjU1LDI1NSwuLi4pIHN1ZWx0b3MgZGVsIG9yaWdpbmFsLlxuLy9cbi8vIFNpcnZlIHRhbnRvIHBhcmEgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCI+ICh1c2EgbGFzIENTUyBjdXN0b20gcHJvcGVydGllc1xuLy8gZGUgSW9uaWMpIGNvbW8gcGFyYSB1biA8YnV0dG9uPiBuYXRpdm8gKHVzYSBsYXMgcHJvcGllZGFkZXMgcGxhbmFzKSDDosKAwpRcbi8vIGFtYm9zIGNvZXhpc3RlbiBob3kgZW4gdHJhaW5lcnMgcGFyYSBlbCBtaXNtbyByb2wgZGUgXCJ2b2x2ZXJcIi9cImNlcnJhclwiLlxuQG1peGluIHRmLWljb24tYnV0dG9uKCRzaXplOiA0NHB4LCAkcmFkaXVzOiAxMnB4LCAkaWNvbi1zaXplOiAyMHB4KSB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcbiAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1iYWNrZ3JvdW5kLWhvdmVyOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtZm9jdXNlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1jb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICAtLWJvcmRlci1yYWRpdXM6ICN7JHJhZGl1c307XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbiAgLS1wYWRkaW5nLXRvcDogMDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMDtcblxuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6ICRyYWRpdXM7XG4gIHdpZHRoOiAkc2l6ZTtcbiAgaGVpZ2h0OiAkc2l6ZTtcbiAgbWluLXdpZHRoOiAkc2l6ZTtcbiAgbWluLWhlaWdodDogJHNpemU7XG4gIG1hcmdpbjogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCksXG4gICAgY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogJGljb24tc2l6ZTtcbiAgfVxufVxuXG4vLyBFeHBhbnNvciBpbnZpc2libGUgZGUgem9uYSBwdWxzYWJsZS5cbi8vXG4vLyBQQVJBIFFVw4PCiTogdW4gY29udHJvbCBjb21wYWN0byAodW4gaWNvbm8gZGUgMzIgcHggZW4gdW5hIGZpbGEgZGUgdGFibGEsIHVuXG4vLyBlbmxhY2UgZGUgdGV4dG8gZGUgMTYgcHgpIG5vIGxsZWdhIGEgbG9zIDQ0IHB4IHF1ZSBleGlnZSBQUk9EVUNULm1kLCB5XG4vLyBlbmdvcmRhcmxvIGRlIHZlcmRhZCBkZXNwbGF6YSB0b2RvIGxvIHF1ZSB0aWVuZSBhbHJlZGVkb3Igw6LCgMKUIGVuIHVuYSB0YWJsYVxuLy8gZGUgdmVpbnRlIGZpbGFzLCA4IHB4IHBvciBmaWxhIHNvbiBtZWRpYSBwYW50YWxsYS5cbi8vXG4vLyBFbCBwc2V1ZG9lbGVtZW50byBjcmVjZSBoYWNpYSBmdWVyYSBzaW4gb2N1cGFyIHNpdGlvIGVuIGVsIGZsdWpvLCBhc8ODwq0gcXVlXG4vLyBlbCBib3TDg8KzbiBzZSB2ZSBwZXF1ZcODwrFvIHkgc2UgcHVsc2EgZ3JhbmRlLlxuLy9cbi8vIEFWSVNPIERFIE1FRElDScODwpNOOiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBOTyB2ZSBlc3RlIHBzZXVkb2VsZW1lbnRvLCBhc8ODwq1cbi8vIHF1ZSBhbCB2ZXJpZmljYXIgaGF5IHF1ZSB1c2FyIGVsZW1lbnRGcm9tUG9pbnQgY29uIGVsIGVsZW1lbnRvIGRlbnRybyBkZWxcbi8vIHZpZXdwb3J0LiBBZGVtw4PCoXMgZWwgaGl0LXRlc3QgZGV2dWVsdmUgMiBweCBtZW5vcyBxdWUgbGEgY2FqYSBkZWNsYXJhZGFcbi8vIChjb21wcm9iYWRvOiAtNHB4IGRhIDQyLCAtNnB4IGRhIDQ2KSwgYXPDg8KtIHF1ZSB1biA0MiBtZWRpZG8gc29uIDQ0IHJlYWxlcy5cbi8vXG4vLyAkZ3JvdzogY3XDg8KhbnRvIGNyZWNlIHBvciBjYWRhIGxhZG8uIDRweCBsbGV2YSB1biBjb250cm9sIGRlIDM2IHB4IGEgNDQuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIoJGdyb3c6IDRweCkge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IC0jeyRncm93fTtcbiAgfVxufVxuXG4vLyBWYXJpYW50ZSBxdWUgc29sbyBjcmVjZSBlbiBWRVJUSUNBTC4gUGFyYSBjb250cm9sZXMgZW4gZmlsYSBkb25kZSBlbFxuLy8gZXhwYW5zb3IgaG9yaXpvbnRhbCBzZSBzb2xhcGFyw4PCrWEgY29uIGVsIGRlIGFsIGxhZG8geSByb2JhcsODwq1hIHN1cyB0b3F1ZXMuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIteSgkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC0jeyRncm93fTtcbiAgICBib3R0b206IC0jeyRncm93fTtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ }),

/***/ 75318:
/*!***********************************************************************************************!*\
  !*** ./src/app/features/diet-templates/pages/diet-templates-list/diet-templates-list.page.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DietTemplatesListPage: () => (/* binding */ DietTemplatesListPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _services_diet_template_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/diet-template-api.service */ 63459);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 54844);


var _DietTemplatesListPage;







function DietTemplatesListPage_span_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Crear");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function DietTemplatesListPage_ion_spinner_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ion-spinner", 19);
  }
}
function DietTemplatesListPage_div_19_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "div", 25)(4, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
const _c0 = function () {
  return [1, 2, 3];
};
function DietTemplatesListPage_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, DietTemplatesListPage_div_19_div_1_Template, 5, 0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](1, _c0));
  }
}
function DietTemplatesListPage_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "ion-icon", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "No se pudieron cargar tus plantillas");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Comprueba tu conexi\u00F3n e int\u00E9ntalo de nuevo.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function DietTemplatesListPage_div_20_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r7.load());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Reintentar");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function DietTemplatesListPage_ng_container_21_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "ion-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Todav\u00EDa no has creado ninguna plantilla");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Crea tu primera plantilla arriba: un conjunto de d\u00EDas y comidas reutilizable entre clientes.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function DietTemplatesListPage_ng_container_21_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 34)(1, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function DietTemplatesListPage_ng_container_21_div_2_div_1_Template_button_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r14);
      const template_r12 = restoredCtx.$implicit;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r13.openTemplate(template_r12));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "ion-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 37)(4, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function DietTemplatesListPage_ng_container_21_div_2_div_1_Template_button_click_8_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r14);
      const template_r12 = restoredCtx.$implicit;
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r15.confirmDelete(template_r12, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "ion-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const template_r12 = ctx.$implicit;
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](template_r12.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"]("", ctx_r11.dayCount(template_r12), " d\u00EDa", ctx_r11.dayCount(template_r12) === 1 ? "" : "s", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵattribute"]("aria-label", "Eliminar plantilla " + template_r12.name);
  }
}
function DietTemplatesListPage_ng_container_21_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, DietTemplatesListPage_ng_container_21_div_2_div_1_Template, 10, 4, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r10.templates)("ngForTrackBy", ctx_r10.trackByTemplateId);
  }
}
function DietTemplatesListPage_ng_container_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, DietTemplatesListPage_ng_container_21_div_1_Template, 6, 0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, DietTemplatesListPage_ng_container_21_div_2_Template, 2, 2, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r4.templates.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r4.templates.length);
  }
}
// Replanteamiento MVP (nutrición) — biblioteca de plantillas de dieta del
// profesional, reutilizables entre clientes (mismo espíritu que las
// plantillas de Table para rutinas).
class DietTemplatesListPage {
  constructor(dietTemplateApi, router, ionicUtilService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietTemplateApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "state", 'loading');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "templates", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "newName", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isCreating", false);
    this.dietTemplateApi = dietTemplateApi;
    this.router = router;
    this.ionicUtilService = ionicUtilService;
  }
  ngOnInit() {
    this.load();
  }
  // ion-router-outlet cachea la página al volver del builder (push/pop) —
  // sin esto, "Volver" desde diet-template-builder.page.ts mostraría la
  // lista desactualizada (la plantilla recién creada/editada no aparecería
  // hasta un refresco manual). ngOnInit solo se dispara una vez por
  // instancia. Mismo fix ya aplicado en RoutinesPage (TASK-013).
  ionViewWillEnter() {
    this.load();
  }
  load() {
    this.state = 'loading';
    this.dietTemplateApi.list().subscribe({
      next: templates => {
        this.templates = templates || [];
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      }
    });
  }
  createAndEdit() {
    const name = this.newName.trim();
    if (!name || this.isCreating) return;
    this.isCreating = true;
    this.dietTemplateApi.create(name, []).subscribe({
      next: template => {
        this.isCreating = false;
        this.openTemplate(template);
      },
      error: () => {
        this.isCreating = false;
        this.ionicUtilService.showErrorToast('No se pudo crear la plantilla', 'Error', 3000);
      }
    });
  }
  openTemplate(template) {
    this.router.navigate(['/tabs/diet-templates', template._id]);
  }
  confirmDelete(template, event) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      event.stopPropagation();
      yield _this.ionicUtilService.showAlert({
        header: 'Eliminar plantilla',
        message: `¿Eliminar "${template.name}"? No afecta a las dietas ya aplicadas a clientes.`,
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            _this.dietTemplateApi.delete(template._id).subscribe({
              next: () => _this.load(),
              error: () => _this.ionicUtilService.showErrorToast('No se pudo eliminar', 'Error', 3000)
            });
          }
        }]
      });
    })();
  }
  trackByTemplateId(_index, template) {
    return template._id;
  }
  dayCount(template) {
    return template.days?.length || 0;
  }
}
_DietTemplatesListPage = DietTemplatesListPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(DietTemplatesListPage, "\u0275fac", function DietTemplatesListPage_Factory(t) {
  return new (t || _DietTemplatesListPage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_diet_template_api_service__WEBPACK_IMPORTED_MODULE_2__.DietTemplateApiService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_3__.IonicUtilService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(DietTemplatesListPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _DietTemplatesListPage,
  selectors: [["app-diet-templates-list"]],
  decls: 22,
  vars: 7,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["aria-label", "Abrir men\u00FA de navegaci\u00F3n", 1, "tf-page-header__back-button"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "templates-content"], [1, "page-hint"], [1, "create-template-row"], [1, "input-wrapper"], ["name", "restaurant-outline", 1, "input-icon"], ["type", "text", "placeholder", "Nombre de la nueva plantilla", 1, "input-field", 3, "ngModel", "ngModelChange", "keyup.enter"], ["type", "button", 1, "submit-button", 3, "disabled", "click"], [4, "ngIf"], ["name", "dots", 4, "ngIf"], ["class", "templates-skeleton", 4, "ngIf"], ["class", "state-message", 4, "ngIf"], ["name", "dots"], [1, "templates-skeleton"], ["class", "template-row template-row--skeleton", 4, "ngFor", "ngForOf"], [1, "template-row", "template-row--skeleton"], [1, "skeleton-block", "skeleton-icon"], [1, "skeleton-name-block"], [1, "skeleton-line", "skeleton-line--name"], [1, "skeleton-line", "skeleton-line--meta"], [1, "state-message"], ["name", "cloud-offline-outline"], [1, "retry-button", 3, "click"], ["class", "templates-grid", 4, "ngIf"], ["name", "restaurant-outline"], [1, "templates-grid"], ["class", "template-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "template-row"], ["type", "button", 1, "template-row-main", 3, "click"], ["name", "restaurant-outline", 1, "template-row-icon"], [1, "template-info"], [1, "template-name"], [1, "template-meta"], ["type", "button", 1, "delete-template-btn", 3, "click"], ["name", "trash-outline"]],
  template: function DietTemplatesListPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "ion-menu-button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 5)(6, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Plantillas de dieta");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "ion-content", 8)(10, "p", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, " Construye una plantilla una vez (d\u00EDas con sus comidas) y apl\u00EDcala a cualquier cliente eligiendo solo la fecha de inicio, en vez de teclear cada comida de cada d\u00EDa a mano. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "div", 10)(13, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](14, "ion-icon", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "input", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function DietTemplatesListPage_Template_input_ngModelChange_15_listener($event) {
        return ctx.newName = $event;
      })("keyup.enter", function DietTemplatesListPage_Template_input_keyup_enter_15_listener() {
        return ctx.createAndEdit();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "button", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function DietTemplatesListPage_Template_button_click_16_listener() {
        return ctx.createAndEdit();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](17, DietTemplatesListPage_span_17_Template, 2, 0, "span", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, DietTemplatesListPage_ion_spinner_18_Template, 1, 0, "ion-spinner", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](19, DietTemplatesListPage_div_19_Template, 2, 2, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](20, DietTemplatesListPage_div_20_Template, 8, 0, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](21, DietTemplatesListPage_ng_container_21_Template, 3, 2, "ng-container", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.newName);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", !ctx.newName.trim() || ctx.isCreating);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.isCreating);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isCreating);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.state === "loading");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.state === "error");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.state === "loaded");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonMenuButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonSpinner],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-card-in {\n  from {\n    opacity: 0;\n    transform: translateY(6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.templates-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: var(--tf-space-4);\n  --padding-end: var(--tf-space-4);\n  --padding-top: var(--tf-space-3);\n  --padding-bottom: var(--tf-space-6);\n}\n\n.page-hint[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-muted);\n  line-height: var(--tf-line-height-base);\n  margin: 0 0 var(--tf-space-4);\n}\n\n.create-template-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  gap: var(--tf-space-2);\n  margin-bottom: var(--tf-space-5);\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n  height: 46px;\n  flex: 1;\n  min-width: 0;\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  flex-shrink: 0;\n  font-size: 1.1rem;\n}\n\n.input-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n  font-size: var(--tf-font-size-base);\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  width: auto;\n  height: 46px;\n  padding: 0 var(--tf-space-5);\n  font-size: var(--tf-font-size-base);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.submit-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n\n.templates-skeleton[_ngcontent-%COMP%], .templates-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: var(--tf-space-2);\n}\n@media (max-width: 700px) {\n  .templates-skeleton[_ngcontent-%COMP%], .templates-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n.skeleton-block[_ngcontent-%COMP%], .skeleton-line[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n}\n.skeleton-block[_ngcontent-%COMP%]::after, .skeleton-line[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after, .skeleton-line[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n\n.skeleton-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n}\n\n.skeleton-name-block[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.skeleton-line[_ngcontent-%COMP%] {\n  border-radius: 4px;\n  height: 12px;\n}\n.skeleton-line--name[_ngcontent-%COMP%] {\n  width: 50%;\n  height: 14px;\n}\n.skeleton-line--meta[_ngcontent-%COMP%] {\n  width: 30%;\n}\n\n.state-message[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 10px;\n  padding: var(--tf-space-8) var(--tf-space-6) 0;\n  color: var(--tf-text-muted);\n}\n.state-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 36px;\n  color: var(--tf-text-faint);\n  margin-bottom: 6px;\n}\n.state-message[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: var(--tf-text);\n  margin: 0;\n}\n.state-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-base);\n  line-height: 1.5;\n  max-width: 34ch;\n  margin: 0 0 4px;\n}\n\n.retry-button[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  height: var(--tf-touch-min);\n  padding: 0 20px;\n  background: var(--tf-surface-5);\n  color: var(--tf-text);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-sm);\n  font-size: var(--tf-font-size-base);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform var(--tf-duration-fast) var(--tf-ease-out);\n}\n.retry-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.96);\n}\n.retry-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.template-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-md);\n  animation: _ngcontent-%COMP%_tf-card-in 320ms var(--tf-ease-out) backwards;\n  transition: border-color var(--tf-duration-fast) var(--tf-ease-out);\n}\n@media (prefers-reduced-motion: reduce) {\n  .template-row[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n.template-row[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 0ms;\n}\n.template-row[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 35ms;\n}\n.template-row[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 70ms;\n}\n.template-row[_ngcontent-%COMP%]:nth-child(4) {\n  animation-delay: 105ms;\n}\n.template-row[_ngcontent-%COMP%]:nth-child(5) {\n  animation-delay: 140ms;\n}\n.template-row[_ngcontent-%COMP%]:nth-child(6) {\n  animation-delay: 175ms;\n}\n.template-row[_ngcontent-%COMP%]:nth-child(7) {\n  animation-delay: 210ms;\n}\n.template-row[_ngcontent-%COMP%]:nth-child(8) {\n  animation-delay: 245ms;\n}\n.template-row[_ngcontent-%COMP%]:nth-child(9) {\n  animation-delay: 280ms;\n}\n.template-row[_ngcontent-%COMP%]:nth-child(10) {\n  animation-delay: 315ms;\n}\n.template-row[_ngcontent-%COMP%]:nth-child(11) {\n  animation-delay: 350ms;\n}\n.template-row[_ngcontent-%COMP%]:nth-child(12) {\n  animation-delay: 385ms;\n}\n.template-row[_ngcontent-%COMP%]:hover {\n  border-color: var(--tf-border-strong);\n}\n\n.template-row-main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-3);\n  padding: var(--tf-space-3);\n  background: transparent;\n  border: none;\n  color: inherit;\n  font-family: inherit;\n  text-align: left;\n  cursor: pointer;\n  border-radius: var(--tf-radius-md);\n  transition: background var(--tf-duration-fast) var(--tf-ease-out);\n}\n.template-row-main[_ngcontent-%COMP%]:hover, .template-row-main[_ngcontent-%COMP%]:active {\n  background: var(--tf-surface-2);\n}\n.template-row-main[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: -2px;\n}\n\n.template-row-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: var(--tf-accent);\n  font-size: 1.2rem;\n}\n\n.template-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.template-name[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-base);\n  color: var(--tf-text);\n  font-weight: 600;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.template-meta[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-text-muted);\n}\n\n.delete-template-btn[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: var(--tf-touch-min);\n  height: var(--tf-touch-min);\n  margin-right: var(--tf-space-1);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  border-radius: var(--tf-radius-sm);\n  color: var(--tf-text-muted);\n  cursor: pointer;\n  transition: color var(--tf-duration-fast) var(--tf-ease-out), background var(--tf-duration-fast) var(--tf-ease-out);\n}\n.delete-template-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.delete-template-btn[_ngcontent-%COMP%]:hover, .delete-template-btn[_ngcontent-%COMP%]:active {\n  color: var(--tf-danger);\n  background: var(--tf-danger-soft);\n}\n.delete-template-btn[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZGlldC10ZW1wbGF0ZXMvcGFnZXMvZGlldC10ZW1wbGF0ZXMtbGlzdC9kaWV0LXRlbXBsYXRlcy1saXN0LnBhZ2Uuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fYW5pbWF0aW9ucy5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19pbnB1dHMuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fYnV0dG9ucy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCQTtFQUNFO0lBQ0UsMkJBQUE7RUN4QkY7QUFDRjtBQ3VCQTtFQUNFO0lBQ0UsVUFBQTtJQUNBLDBCQUFBO0VEckJGO0VDdUJBO0lBQ0UsVUFBQTtJQUNBLHdCQUFBO0VEckJGO0FBQ0Y7QUFUQTtFQUNFLDBCQUFBO0VBQ0Esa0NBQUE7RUFDQSxnQ0FBQTtFQUNBLGdDQUFBO0VBQ0EsbUNBQUE7QUFXRjs7QUFSQTtFQUNFLGlDQUFBO0VBQ0EsMkJBQUE7RUFDQSx1Q0FBQTtFQUNBLDZCQUFBO0FBV0Y7O0FBTEE7RUFDRSxhQUFBO0VBQ0Esb0JBQUE7RUFDQSxzQkFBQTtFQUNBLGdDQUFBO0FBUUY7O0FBTEE7RUV4QkUsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLCtCQUoyQjtFQUszQix5Q0FBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGlEQUFBO0VGbUJBLFlBQUE7RUFDQSxPQUFBO0VBQ0EsWUFBQTtBQWVGO0FFbENFO0VBQ0UsOEJBQUE7QUZvQ0o7O0FBZkE7RUVoQkUsMkJBQUE7RUFDQSxjQUFBO0VGaUJBLGlCQUFBO0FBbUJGOztBQWhCQTtFRWhCRSxPQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxxQkFBQTtFQUNBLG9CQUFBO0VBQ0EsWUFBQTtFRldBLG1DQUFBO0FBMEJGO0FFbkNFO0VBQ0UsMkJBQUE7QUZxQ0o7O0FBMUJBO0VHckNFLFlBQUE7RUFDQSxtQkFGaUM7RUFHakMscUNBQUE7RUFDQSxnQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGdGQUFBO0VIaUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsNEJBQUE7RUFDQSxtQ0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0FBbUNGO0FHMUVFO0VBQ0Usc0JBQUE7QUg0RUo7QUd6RUU7RUFDRSxhQUFBO0VBQ0EsZUFBQTtBSDJFSjtBR3hFRTtFQUNFLGlDQUFBO0VBQ0EsbUJBQUE7QUgwRUo7O0FBekNBOztFQUVFLGFBQUE7RUFDQSxxQ0FBQTtFQUNBLHNCQUFBO0FBNENGO0FBMUNFO0VBTkY7O0lBT0ksMEJBQUE7RUE4Q0Y7QUFDRjs7QUEzQ0E7O0VEcEVFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSwrQkFBQTtBQ29IRjtBRGxIRTs7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsNEJBQUE7RUFDQSwrRUFBQTtFQUNBLG1DQUFBO0FDcUhKO0FEbEhFO0VBQ0U7O0lBQ0UsZUFBQTtFQ3FISjtBQUNGOztBQTVEQTtFQUNFLGNBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBK0RGOztBQTVEQTtFQUNFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtBQStERjs7QUE1REE7RUFDRSxrQkFBQTtFQUNBLFlBQUE7QUErREY7QUE3REU7RUFDRSxVQUFBO0VBQ0EsWUFBQTtBQStESjtBQTVERTtFQUNFLFVBQUE7QUE4REo7O0FBdERBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSw4Q0FBQTtFQUNBLDJCQUFBO0FBeURGO0FBdkRFO0VBQ0UsZUFBQTtFQUNBLDJCQUFBO0VBQ0Esa0JBQUE7QUF5REo7QUF0REU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxTQUFBO0FBd0RKO0FBckRFO0VBQ0UsbUNBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxlQUFBO0FBdURKOztBQW5EQTtFQUNFLGVBQUE7RUFDQSwyQkFBQTtFQUNBLGVBQUE7RUFDQSwrQkFBQTtFQUNBLHFCQUFBO0VBQ0EseUNBQUE7RUFDQSxrQ0FBQTtFQUNBLG1DQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0VBQUE7QUFzREY7QUFwREU7RUFDRSxzQkFBQTtBQXNESjtBQW5ERTtFQUNFLG1DQUFBO0VBQ0EsbUJBQUE7QUFxREo7O0FBakRBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsK0JBQUE7RUFDQSxrQ0FBQTtFQUNBLGtDQUFBO0VDbktBLHdEQUFBO0VEcUtBLG1FQUFBO0FBb0RGO0FDdk5FO0VENEpGO0lDM0pJLGVBQUE7RUQwTkY7QUFDRjtBQy9NSTtFQUNFLG9CQUFBO0FEaU5OO0FDbE5JO0VBQ0UscUJBQUE7QURvTk47QUNyTkk7RUFDRSxxQkFBQTtBRHVOTjtBQ3hOSTtFQUNFLHNCQUFBO0FEME5OO0FDM05JO0VBQ0Usc0JBQUE7QUQ2Tk47QUM5Tkk7RUFDRSxzQkFBQTtBRGdPTjtBQ2pPSTtFQUNFLHNCQUFBO0FEbU9OO0FDcE9JO0VBQ0Usc0JBQUE7QURzT047QUN2T0k7RUFDRSxzQkFBQTtBRHlPTjtBQzFPSTtFQUNFLHNCQUFBO0FENE9OO0FDN09JO0VBQ0Usc0JBQUE7QUQrT047QUNoUEk7RUFDRSxzQkFBQTtBRGtQTjtBQTNGRTtFQUNFLHFDQUFBO0FBNkZKOztBQXRGQTtFQUNFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSwwQkFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7RUFDQSxvQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGtDQUFBO0VBQ0EsaUVBQUE7QUF5RkY7QUF2RkU7RUFFRSwrQkFBQTtBQXdGSjtBQXJGRTtFQUNFLG1DQUFBO0VBQ0Esb0JBQUE7QUF1Rko7O0FBbkZBO0VBQ0UsY0FBQTtFQUNBLHVCQUFBO0VBQ0EsaUJBQUE7QUFzRkY7O0FBbkZBO0VBQ0UsT0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0FBc0ZGOztBQW5GQTtFQUNFLG1DQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQXNGRjs7QUFuRkE7RUFDRSxpQ0FBQTtFQUNBLDJCQUFBO0FBc0ZGOztBQWpGQTtFQUNFLGNBQUE7RUFDQSwwQkFBQTtFQUNBLDJCQUFBO0VBQ0EsK0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLGtDQUFBO0VBQ0EsMkJBQUE7RUFDQSxlQUFBO0VBQ0EsbUhBQUE7QUFvRkY7QUFqRkU7RUFDRSxlQUFBO0FBbUZKO0FBaEZFO0VBRUUsdUJBQUE7RUFDQSxpQ0FBQTtBQWlGSjtBQTlFRTtFQUNFLG1DQUFBO0VBQ0EsbUJBQUE7QUFnRkoiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTa2VsZXRvbiBkZSBjYXJnYSBjb24gYmFycmlkbyBkZSBzaGltbWVyIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gbGl0ZXJhbG1lbnRlXG4vLyBlbiB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgKGJvcmRlci1yYWRpdXMsIGhlaWdodCwgd2lkdGgsIHZhcmlhbnRlcyBjb24gbm9tYnJlKS5cbkBtaXhpbiB0Zi1za2VsZXRvbi1zaGltbWVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuXG4gICY6OmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHRyYW5zcGFyZW50LCB2YXIoLS10Zi1zaGltbWVyKSwgdHJhbnNwYXJlbnQpO1xuICAgIGFuaW1hdGlvbjogdGYtc2hpbW1lciAxLjRzIGluZmluaXRlO1xuICB9XG5cbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICAmOjphZnRlciB7XG4gICAgICBhbmltYXRpb246IG5vbmU7XG4gICAgfVxuICB9XG59XG5cbkBrZXlmcmFtZXMgdGYtc2hpbW1lciB7XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgfVxufVxuIiwiQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vdGhlbWUvc2tlbGV0b24nO1xuQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vdGhlbWUvYnV0dG9ucyc7XG5AaW1wb3J0ICcuLi8uLi8uLi8uLi8uLi90aGVtZS9pbnB1dHMnO1xuQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vdGhlbWUvYW5pbWF0aW9ucyc7XG5cbi50ZW1wbGF0ZXMtY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtYmcpO1xuICAtLXBhZGRpbmctc3RhcnQ6IHZhcigtLXRmLXNwYWNlLTQpO1xuICAtLXBhZGRpbmctZW5kOiB2YXIoLS10Zi1zcGFjZS00KTtcbiAgLS1wYWRkaW5nLXRvcDogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIC0tcGFkZGluZy1ib3R0b206IHZhcigtLXRmLXNwYWNlLTYpO1xufVxuXG4ucGFnZS1oaW50IHtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGxpbmUtaGVpZ2h0OiB2YXIoLS10Zi1saW5lLWhlaWdodC1iYXNlKTtcbiAgbWFyZ2luOiAwIDAgdmFyKC0tdGYtc3BhY2UtNCk7XG59XG5cbi8vIE5vbWJyZSArIFwiQ3JlYXJcIiBlbiB1bmEgc29sYSBmaWxhIMOiwoDClCBhbnRlcyBkb3MgYmxvcXVlcyBhIGFuY2hvIGNvbXBsZXRvXG4vLyBhcGlsYWRvcyAoaW5wdXQsIGx1ZWdvIGJvdMODwrNuKSwgZG9ibGUgYWx0byBkZSBsbyBuZWNlc2FyaW8gcGFyYSB1bmEgc29sYVxuLy8gYWNjacODwrNuIGRlIHVuYSBsw4PCrW5lYS5cbi5jcmVhdGUtdGVtcGxhdGUtcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIG1hcmdpbi1ib3R0b206IHZhcigtLXRmLXNwYWNlLTUpO1xufVxuXG4uaW5wdXQtd3JhcHBlciB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LXdyYXBwZXI7XG4gIGhlaWdodDogNDZweDtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4uaW5wdXQtaWNvbiB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LWljb247XG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xufVxuXG4uaW5wdXQtZmllbGQge1xuICBAaW5jbHVkZSB0Zi1pbnB1dC1maWVsZDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtYmFzZSk7XG59XG5cbi5zdWJtaXQtYnV0dG9uIHtcbiAgQGluY2x1ZGUgdGYtZ3JhZGllbnQtYnV0dG9uO1xuICB3aWR0aDogYXV0bztcbiAgaGVpZ2h0OiA0NnB4O1xuICBwYWRkaW5nOiAwIHZhcigtLXRmLXNwYWNlLTUpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1iYXNlKTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4vLyAtLS0gU2tlbGV0b24gZGUgY2FyZ2E6IG1pc21hIGZvcm1hIHF1ZSBsYSBmaWxhIHJlYWwgKGljb25vICsgbm9tYnJlICtcbi8vIG1ldGFkYXRvKSwgbm8gZG9zIGJsb3F1ZXMgZ2Vuw4PCqXJpY29zIHNpbiByZWxhY2nDg8KzbiBjb24gZWwgY29udGVuaWRvIGZpbmFsIC0tLVxuLnRlbXBsYXRlcy1za2VsZXRvbixcbi50ZW1wbGF0ZXMtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG5cbiAgQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cbn1cblxuLnNrZWxldG9uLWJsb2NrLFxuLnNrZWxldG9uLWxpbmUge1xuICBAaW5jbHVkZSB0Zi1za2VsZXRvbi1zaGltbWVyO1xufVxuXG4uc2tlbGV0b24taWNvbiB7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICB3aWR0aDogMjRweDtcbiAgaGVpZ2h0OiAyNHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG59XG5cbi5za2VsZXRvbi1uYW1lLWJsb2NrIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDZweDtcbn1cblxuLnNrZWxldG9uLWxpbmUge1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGhlaWdodDogMTJweDtcblxuICAmLS1uYW1lIHtcbiAgICB3aWR0aDogNTAlO1xuICAgIGhlaWdodDogMTRweDtcbiAgfVxuXG4gICYtLW1ldGEge1xuICAgIHdpZHRoOiAzMCU7XG4gIH1cbn1cblxuLy8gLS0tIEVzdGFkb3MgZGUgc2VjY2nDg8KzbiAoZXJyb3IgLyB2YWPDg8Ktbykgw6LCgMKUIG1pc21vIHBhdHLDg8KzbiBxdWUgY2xpZW50cy5wYWdlL1xuLy8gZGFzaGJvYXJkLnBhZ2UgKGljb25vICsgdMODwq10dWxvICsgdGV4dG8gWysgQ1RBXSksIG5vIHVuIHDDg8KhcnJhZm8gc3VlbHRvLlxuLy8gUGFkZGluZyByZWR1Y2lkbyByZXNwZWN0byBhbCBwYXRyw4PCs24gZGUgcMODwqFnaW5hIGNvbXBsZXRhOiBlbCBmb3JtdWxhcmlvIGRlXG4vLyBjcmVhY2nDg8KzbiBhcnJpYmEgeWEgb2N1cGEgbGEgY2FiZWNlcmEgZGUgbGEgcGFudGFsbGEsIGVzdG8gZXMgdW5hIHNlY2Npw4PCs24uIC0tLVxuLnN0YXRlLW1lc3NhZ2Uge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtOCkgdmFyKC0tdGYtc3BhY2UtNikgMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDM2cHg7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtZmFpbnQpO1xuICAgIG1hcmdpbi1ib3R0b206IDZweDtcbiAgfVxuXG4gIGgyIHtcbiAgICBmb250LXNpemU6IDEuMDVyZW07XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gICAgbWFyZ2luOiAwO1xuICB9XG5cbiAgcCB7XG4gICAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtYmFzZSk7XG4gICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICBtYXgtd2lkdGg6IDM0Y2g7XG4gICAgbWFyZ2luOiAwIDAgNHB4O1xuICB9XG59XG5cbi5yZXRyeS1idXR0b24ge1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIGhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgcGFkZGluZzogMCAyMHB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTUpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtc20pO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1iYXNlKTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG59XG5cbi50ZW1wbGF0ZS1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTEpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbWQpO1xuICBAaW5jbHVkZSB0Zi1jYXJkLWluLXN0YWdnZXI7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjpob3ZlciB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgfVxufVxuXG4vLyBab25hIG5hdmVnYWJsZSBkZSBsYSBmaWxhIChub21icmUgKyBtZXRhZGF0bykgw6LCgMKUIGJvdMODwrNuIHJlYWwgc2VwYXJhZG8gZGVsXG4vLyBib3TDg8KzbiBkZSBlbGltaW5hciwgZW4gdmV6IGRlIGFuaWRhciB1biA8YnV0dG9uPiBkZW50cm8gZGUgb3RybyBlbGVtZW50b1xuLy8gY2xpY2FibGUgKGFjY2VzaWJsZSBwb3IgdGVjbGFkbywgc2luIGNvbmZsaWN0byBkZSBmb2NvKS5cbi50ZW1wbGF0ZS1yb3ctbWFpbiB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbWQpO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmhvdmVyLFxuICAmOmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7XG4gIH1cbn1cblxuLnRlbXBsYXRlLXJvdy1pY29uIHtcbiAgZmxleC1zaHJpbms6IDA7XG4gIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICBmb250LXNpemU6IDEuMnJlbTtcbn1cblxuLnRlbXBsYXRlLWluZm8ge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMnB4O1xufVxuXG4udGVtcGxhdGUtbmFtZSB7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWJhc2UpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4udGVtcGxhdGUtbWV0YSB7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xufVxuXG4vLyBPYmpldGl2byB0w4PCoWN0aWwgZGUgNDRweCAoUFJPRFVDVC5tZCkgw6LCgMKUIGFudGVzIDM2cHguIFRyYW5zcGFyZW50ZSBwb3Jcbi8vIGRlZmVjdG8gcGFyYSBubyBsZWVyc2UgY29tbyB1bmEgY2FyZCBhbmlkYWRhIGRlbnRybyBkZSBsYSBmaWxhLlxuLmRlbGV0ZS10ZW1wbGF0ZS1idG4ge1xuICBmbGV4LXNocmluazogMDtcbiAgd2lkdGg6IHZhcigtLXRmLXRvdWNoLW1pbik7XG4gIGhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgbWFyZ2luLXJpZ2h0OiB2YXIoLS10Zi1zcGFjZS0xKTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1zbSk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBjb2xvciB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCksXG4gICAgYmFja2dyb3VuZCB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgfVxuXG4gICY6aG92ZXIsXG4gICY6YWN0aXZlIHtcbiAgICBjb2xvcjogdmFyKC0tdGYtZGFuZ2VyKTtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1kYW5nZXItc29mdCk7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cbiIsIi8vIEVudHJhZGEgZXNjYWxvbmFkYSBkZSBsaXN0YXMvZ3JpZHMgZGUgY2FyZHMgYWwgY2FyZ2FyIMOiwoDClCBtaXNtbyBibG9xdWVcbi8vIChrZXlmcmFtZSArIGFuaW1hdGlvbiArIGd1YXJkIGRlIHByZWZlcnMtcmVkdWNlZC1tb3Rpb24pIHJlcGV0aWRvIGJ5dGUgYVxuLy8gYnl0ZSBlbiA5IHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuLiBNaXNtbyBjcml0ZXJpbyBxdWVcbi8vIF9za2VsZXRvbi5zY3NzL19idXR0b25zLnNjc3M6IGNhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW9cbi8vIHNlbGVjdG9yIHkgYcODwrFhZGUgZW5jaW1hIHNvbG8gbG8gcXVlIHZhcsODwq1hIChyYWRpbywgdGFtYcODwrFvLi4uKS5cbkBtaXhpbiB0Zi1jYXJkLWluLWFuaW1hdGlvbiB7XG4gIGFuaW1hdGlvbjogdGYtY2FyZC1pbiAzMjBtcyB2YXIoLS10Zi1lYXNlLW91dCkgYmFja3dhcmRzO1xuXG4gIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgYW5pbWF0aW9uOiBub25lO1xuICB9XG59XG5cbi8vIFZhcmlhbnRlIHBhcmEgbGlzdGFzOiBhZGVtw4PCoXMgZGVsIGZ1bmRpZG8sIGVzY2Fsb25hIGVsIHJldHJhc28gZGUgY2FkYVxuLy8gZWxlbWVudG8gcG9yIHN1IHBvc2ljacODwrNuIChudGgtY2hpbGQpLiAkbWF4LWl0ZW1zIGFjb3RhIGVsIGJ1Y2xlIGFsIG7DgsK6XG4vLyByYXpvbmFibGUgZGUgdGFyamV0YXMgdmlzaWJsZXMgcG9yIHDDg8KhZ2luYSDDosKAwpQgbm8gdGllbmUgc2VudGlkbyBnZW5lcmFyIG3Dg8Khc1xuLy8gcmVnbGFzIG50aC1jaGlsZCBxdWUgZWxlbWVudG9zIHB1ZWRlIGxsZWdhciBhIGhhYmVyLlxuQG1peGluIHRmLWNhcmQtaW4tc3RhZ2dlcigkbWF4LWl0ZW1zOiAxMiwgJHN0ZXA6IDM1bXMpIHtcbiAgQGluY2x1ZGUgdGYtY2FyZC1pbi1hbmltYXRpb247XG5cbiAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCAkbWF4LWl0ZW1zIHtcbiAgICAmOm50aC1jaGlsZCgjeyRpfSkge1xuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAjeygkaSAtIDEpICogJHN0ZXB9O1xuICAgIH1cbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHRmLWNhcmQtaW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg2cHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuIiwiLy8gRmlsYSBkZSBpbnB1dCBjb24gaWNvbm8gKHdyYXBwZXIgKyBpY29ubyArIGNhbXBvKSDDosKAwpQgcmVwZXRpZGEgZW4gNCBww4PCoWdpbmFzXG4vLyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLiBFbCBmb25kb1xuLy8gZGVsIHdyYXBwZXIgZXMgZWwgw4PCum5pY28gdmFsb3IgcXVlIHZhcsODwq1hIHBvciBww4PCoWdpbmEgKHN1cGVyZmljaWUgMSBvIDIgc2Vnw4PCum5cbi8vIGNvbnRleHRvIHZpc3VhbCksIGRlIGFow4PCrSBlbCBwYXLDg8KhbWV0cm87IHRhbWHDg8KxbyBkZSBmdWVudGUvYWx0by9tYXJnZW4gc2Vcbi8vIGRlamFuIGZ1ZXJhIGRlbCBtaXhpbiBwb3JxdWUgY2FkYSBww4PCoWdpbmEgbG9zIGZpamEgc2Vnw4PCum4gc3UgcHJvcGlvIGxheW91dC5cbkBtaXhpbiB0Zi1pbnB1dC13cmFwcGVyKCRiZzogdmFyKC0tdGYtc3VyZmFjZS0xKSkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEwcHg7XG4gIGJhY2tncm91bmQ6ICRiZztcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBhZGRpbmc6IDAgMTRweDtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmZvY3VzLXdpdGhpbiB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICB9XG59XG5cbkBtaXhpbiB0Zi1pbnB1dC1pY29uIHtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBmbGV4LXNocmluazogMDtcbn1cblxuQG1peGluIHRmLWlucHV0LWZpZWxkIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBvdXRsaW5lOiBub25lO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBoZWlnaHQ6IDEwMCU7XG5cbiAgJjo6cGxhY2Vob2xkZXIge1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgfVxufVxuIiwiLy8gQm90w4PCs24gQ1RBIGNvbiBncmFkaWVudGUgZGUgYWNlbnRvIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gZW4gfjExIHNpdGlvcyBkZVxuLy8gfjEwIHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS5cbi8vIENhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW8gc2VsZWN0b3IgeSBhw4PCsWFkZSBlbmNpbWEgc29sbyBsb1xuLy8gcXVlIHZhcsODwq1hIHBvciBsYXlvdXQgKHdpZHRoLCBoZWlnaHQsIGZvbnQtc2l6ZSwgbWFyZ2luKS5cbi8vXG4vLyBMYSBtaXRhZCBkZSBsb3Mgc2l0aW9zIG9yaWdpbmFsZXMgbm8gdGVuw4PCrWFuIHRyYW5zaWNpw4PCs24vZmVlZGJhY2sgZGUgcHVsc2FjacODwrNuXG4vLyBuaSA6Zm9jdXMtdmlzaWJsZSDDosKAwpQgZWwgbWl4aW4gbG9zIGHDg8KxYWRlIHNpZW1wcmUsIGNpZXJyYSBlc2UgaHVlY28gZGVcbi8vIGNvbnNpc3RlbmNpYSBkZSBpbnRlcmFjY2nDg8KzbiAoUFJPRFVDVC5tZDogXCJ1biBzb2xvIHBhdHLDg8KzbiBwb3IgdGlwbyBkZVxuLy8gY29tcG9uZW50ZVwiKSBlbiB2ZXogZGUgcGVycGV0dWFyIGxhIHZhcmlhY2nDg8KzbiBhY2NpZGVudGFsLlxuQG1peGluIHRmLWdyYWRpZW50LWJ1dHRvbigkcmFkaXVzOiAxMnB4KSB7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LWdyYWRpZW50KTtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudC1jb250cmFzdCk7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSwgb3BhY2l0eSAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45Nyk7XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjQ1O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLXRleHQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLy8gQm90w4PCs24gZGUgaGVhZGVyIHF1ZSBlcyBzb2xvIHVuIGljb25vIMOiwoDClCBtaXNtbyBsb29rIFwiZW52dWVsdG9cIiBxdWUgeWEgdXNhIGxhXG4vLyBhcHAgZGUgY29uc3VtaWRvciBlbiBzdXMgdG9vbGJhcnMgKHBhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy8uLi4vZGlldHMvXG4vLyBjb21wb25lbnRzL3Rvb2xiYXItY2FsZW5kYXI6IGZvbmRvICsgYm9yZGVyLXJhZGl1cyArIGNhamEgZmlqYSA0NHg0NCwgZW5cbi8vIHZleiBkZWwgaW9uLWJ1dHRvbiBwbGFuby90cmFuc3BhcmVudGUgcXVlIHRlbsODwq1hIGNhZGEgcGFudGFsbGEgZGUgdHJhaW5lcnNcbi8vIGhhc3RhIGFob3JhKS4gVG9rZW5lYWRvIGEgbGEgcGFsZXRhIGRlIGVzdGEgYXBwIGVuIHZleiBkZSByZXBldGlyIGxvc1xuLy8gcmdiYSgyNTUsMjU1LDI1NSwuLi4pIHN1ZWx0b3MgZGVsIG9yaWdpbmFsLlxuLy9cbi8vIFNpcnZlIHRhbnRvIHBhcmEgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCI+ICh1c2EgbGFzIENTUyBjdXN0b20gcHJvcGVydGllc1xuLy8gZGUgSW9uaWMpIGNvbW8gcGFyYSB1biA8YnV0dG9uPiBuYXRpdm8gKHVzYSBsYXMgcHJvcGllZGFkZXMgcGxhbmFzKSDDosKAwpRcbi8vIGFtYm9zIGNvZXhpc3RlbiBob3kgZW4gdHJhaW5lcnMgcGFyYSBlbCBtaXNtbyByb2wgZGUgXCJ2b2x2ZXJcIi9cImNlcnJhclwiLlxuQG1peGluIHRmLWljb24tYnV0dG9uKCRzaXplOiA0NHB4LCAkcmFkaXVzOiAxMnB4LCAkaWNvbi1zaXplOiAyMHB4KSB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcbiAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1iYWNrZ3JvdW5kLWhvdmVyOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtZm9jdXNlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1jb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICAtLWJvcmRlci1yYWRpdXM6ICN7JHJhZGl1c307XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbiAgLS1wYWRkaW5nLXRvcDogMDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMDtcblxuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6ICRyYWRpdXM7XG4gIHdpZHRoOiAkc2l6ZTtcbiAgaGVpZ2h0OiAkc2l6ZTtcbiAgbWluLXdpZHRoOiAkc2l6ZTtcbiAgbWluLWhlaWdodDogJHNpemU7XG4gIG1hcmdpbjogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCksXG4gICAgY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogJGljb24tc2l6ZTtcbiAgfVxufVxuXG4vLyBFeHBhbnNvciBpbnZpc2libGUgZGUgem9uYSBwdWxzYWJsZS5cbi8vXG4vLyBQQVJBIFFVw4PCiTogdW4gY29udHJvbCBjb21wYWN0byAodW4gaWNvbm8gZGUgMzIgcHggZW4gdW5hIGZpbGEgZGUgdGFibGEsIHVuXG4vLyBlbmxhY2UgZGUgdGV4dG8gZGUgMTYgcHgpIG5vIGxsZWdhIGEgbG9zIDQ0IHB4IHF1ZSBleGlnZSBQUk9EVUNULm1kLCB5XG4vLyBlbmdvcmRhcmxvIGRlIHZlcmRhZCBkZXNwbGF6YSB0b2RvIGxvIHF1ZSB0aWVuZSBhbHJlZGVkb3Igw6LCgMKUIGVuIHVuYSB0YWJsYVxuLy8gZGUgdmVpbnRlIGZpbGFzLCA4IHB4IHBvciBmaWxhIHNvbiBtZWRpYSBwYW50YWxsYS5cbi8vXG4vLyBFbCBwc2V1ZG9lbGVtZW50byBjcmVjZSBoYWNpYSBmdWVyYSBzaW4gb2N1cGFyIHNpdGlvIGVuIGVsIGZsdWpvLCBhc8ODwq0gcXVlXG4vLyBlbCBib3TDg8KzbiBzZSB2ZSBwZXF1ZcODwrFvIHkgc2UgcHVsc2EgZ3JhbmRlLlxuLy9cbi8vIEFWSVNPIERFIE1FRElDScODwpNOOiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBOTyB2ZSBlc3RlIHBzZXVkb2VsZW1lbnRvLCBhc8ODwq1cbi8vIHF1ZSBhbCB2ZXJpZmljYXIgaGF5IHF1ZSB1c2FyIGVsZW1lbnRGcm9tUG9pbnQgY29uIGVsIGVsZW1lbnRvIGRlbnRybyBkZWxcbi8vIHZpZXdwb3J0LiBBZGVtw4PCoXMgZWwgaGl0LXRlc3QgZGV2dWVsdmUgMiBweCBtZW5vcyBxdWUgbGEgY2FqYSBkZWNsYXJhZGFcbi8vIChjb21wcm9iYWRvOiAtNHB4IGRhIDQyLCAtNnB4IGRhIDQ2KSwgYXPDg8KtIHF1ZSB1biA0MiBtZWRpZG8gc29uIDQ0IHJlYWxlcy5cbi8vXG4vLyAkZ3JvdzogY3XDg8KhbnRvIGNyZWNlIHBvciBjYWRhIGxhZG8uIDRweCBsbGV2YSB1biBjb250cm9sIGRlIDM2IHB4IGEgNDQuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIoJGdyb3c6IDRweCkge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IC0jeyRncm93fTtcbiAgfVxufVxuXG4vLyBWYXJpYW50ZSBxdWUgc29sbyBjcmVjZSBlbiBWRVJUSUNBTC4gUGFyYSBjb250cm9sZXMgZW4gZmlsYSBkb25kZSBlbFxuLy8gZXhwYW5zb3IgaG9yaXpvbnRhbCBzZSBzb2xhcGFyw4PCrWEgY29uIGVsIGRlIGFsIGxhZG8geSByb2JhcsODwq1hIHN1cyB0b3F1ZXMuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIteSgkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC0jeyRncm93fTtcbiAgICBib3R0b206IC0jeyRncm93fTtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ }),

/***/ 85965:
/*!******************************************************************************************!*\
  !*** ./src/app/shared/components/product-detail-panel/product-detail-panel.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProductDetailPanelComponent: () => (/* binding */ ProductDetailPanelComponent)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var src_app_core_services_custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/custom-product/custom-product.service */ 57846);
/* harmony import */ var src_app_core_services_recipe_recipe_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/recipe/recipe.service */ 50888);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var src_app_features_diets_components_meal_components_search_foods_components_create_product_create_product_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/features/diets/components/meal/components/search-foods/components/create-product/create-product.page */ 75627);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 84725);


var _ProductDetailPanelComponent;










function ProductDetailPanelComponent_p_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r0.product == null ? null : ctx_r0.product.brand);
  }
}
function ProductDetailPanelComponent_div_48_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "ion-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Vegano");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function ProductDetailPanelComponent_div_48_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "ion-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Vegetariano");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function ProductDetailPanelComponent_div_48_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "ion-icon", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Sin lactosa");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function ProductDetailPanelComponent_div_48_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "ion-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Sin gluten");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function ProductDetailPanelComponent_div_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 29)(1, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, ProductDetailPanelComponent_div_48_div_2_Template, 4, 0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, ProductDetailPanelComponent_div_48_div_3_Template, 4, 0, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, ProductDetailPanelComponent_div_48_div_4_Template, 4, 0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, ProductDetailPanelComponent_div_48_div_5_Template, 4, 0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.product == null ? null : ctx_r1.product.vegan);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.product == null ? null : ctx_r1.product.vegetarian);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.product == null ? null : ctx_r1.product.lactoseFree);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.product == null ? null : ctx_r1.product.glutenFree);
  }
}
function ProductDetailPanelComponent_button_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ProductDetailPanelComponent_button_49_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r9.addToTarget());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "ion-icon", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r2.addLabel, " ");
  }
}
function ProductDetailPanelComponent_ng_container_50_div_1_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 49)(1, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](5, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r15.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](5, 3, row_r15.value, "1.0-1"), " ", row_r15.unit, "");
  }
}
function ProductDetailPanelComponent_ng_container_50_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, ProductDetailPanelComponent_ng_container_50_div_1_div_1_Template, 6, 6, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r11.secondaryRows);
  }
}
function ProductDetailPanelComponent_ng_container_50_h3_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "h3", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Micronutrientes");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function ProductDetailPanelComponent_ng_container_50_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 49)(1, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](5, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const row_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](row_r17.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](5, 3, row_r17.value, "1.0-2"), " ", row_r17.unit, "");
  }
}
function ProductDetailPanelComponent_ng_container_50_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, ProductDetailPanelComponent_ng_container_50_div_3_div_1_Template, 6, 6, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r13.microRows);
  }
}
function ProductDetailPanelComponent_ng_container_50_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, ProductDetailPanelComponent_ng_container_50_div_1_Template, 2, 1, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, ProductDetailPanelComponent_ng_container_50_h3_2_Template, 2, 0, "h3", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, ProductDetailPanelComponent_ng_container_50_div_3_Template, 2, 1, "div", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r3.secondaryRows.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r3.microRows.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r3.microRows.length);
  }
}
function ProductDetailPanelComponent_button_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ProductDetailPanelComponent_button_51_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r18.editProduct());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "ion-icon", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, " Editar producto ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
const _c0 = function () {
  return {
    standalone: true
  };
};
// Fix (ronda "3 sidenavs") — panel de detalle SEPARADO (no interno a
// search-foods): lo abre quien controla el buscador (RecipeBuilderModalComponent,
// day-meal-editor-modal...) al recibir SearchFoodsTrainerContext#onFocusItem,
// o directamente al tocar un ingrediente YA añadido. Versión de solo lectura
// (+ cantidad) de AddProductPage del cliente — mismos campos/conversión de
// unidades (ver CreateProductPage.NUTRITION_FIELDS/MG_TO_G_FIELDS), sin
// arrastrar su edición/autoguardado.
class ProductDetailPanelComponent {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "product", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recipe", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "quantity", 100);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "onQuantityChange", void 0);
    // Fix — "Añadir a la receta/comida" directo desde el detalle, sin tener
    // que volver al buscador a marcar el checkbox. Solo lo pasan los
    // consumidores cuando el alimento previsualizado AÚN NO está añadido
    // (ver day-meal-editor-modal/RecipeBuilderModalComponent#showDetailPanel)
    // — al editar un ingrediente YA añadido no tiene sentido, no se pasa.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "onAdd", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "addLabel", 'Añadir');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalController", (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "customProductService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(src_app_core_services_custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_2__.CustomProductService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recipeService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(src_app_core_services_recipe_recipe_service__WEBPACK_IMPORTED_MODULE_3__.RecipeService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "userService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__.UserService));
  }
  dismiss() {
    void this.modalController.dismiss();
  }
  get isRecipe() {
    return !!this.recipe;
  }
  get macros() {
    if (this.recipe) {
      return this.recipeService.calculateCustomRecipeTotals(this.recipe, {
        quantity: this.quantity ?? undefined,
        quantityCooked: null
      }).portionMacros;
    }
    if (this.product) {
      return this.customProductService.getMacros({
        product: this.product,
        quantity: this.quantity ?? 100
      });
    }
    return {
      kcal: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
  }
  // Filas "por cantidad": el valor guardado es por 100g, se escala igual
  // que las macros principales — mismo criterio que totalCalories/... en
  // AddProductPage, sin reinventar la fórmula.
  get secondaryRows() {
    return this.buildRows(ProductDetailPanelComponent.SECONDARY_MACROS);
  }
  get microRows() {
    return this.buildRows(ProductDetailPanelComponent.MICRONUTRIENTS);
  }
  buildRows(rows) {
    if (!this.product) return [];
    const multiplier = (this.quantity ?? 100) / 100;
    const result = [];
    for (const row of rows) {
      const per100g = this.product[row.field];
      if (per100g === null || per100g === undefined) continue;
      result.push({
        label: row.label,
        value: per100g * row.toDisplay * multiplier,
        unit: row.unit
      });
    }
    return result;
  }
  onQtyChange(value) {
    const parsed = parseFloat(value);
    const next = Number.isFinite(parsed) && parsed > 0 ? parsed : null;
    this.quantity = next;
    this.onQuantityChange?.(next);
  }
  addToTarget() {
    if (!this.onAdd) return;
    this.onAdd(this.quantity ?? 100);
    // Autodismiss: este botón vive DENTRO del propio panel, así que al
    // pulsarlo el panel siempre es el overlay más reciente (topmost) —
    // cerrar así nunca es ambiguo.
    void this.modalController.dismiss();
  }
  canEditProduct() {
    if (!this.product) return false;
    const trainerId = this.userService.getLocalUser?._id;
    return !!trainerId && this.product.userId === trainerId;
  }
  editProduct() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this.product) return;
      const modal = yield _this.modalController.create({
        component: src_app_features_diets_components_meal_components_search_foods_components_create_product_create_product_page__WEBPACK_IMPORTED_MODULE_5__.CreateProductPage,
        componentProps: {
          modalMode: true,
          modalEditProduct: _this.product
        },
        cssClass: 'tf-panel-modal'
      });
      yield modal.present();
      const {
        data,
        role
      } = yield modal.onDidDismiss();
      if (role === 'confirm' && data?.product) {
        _this.product = data.product;
      }
    })();
  }
}
_ProductDetailPanelComponent = ProductDetailPanelComponent;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ProductDetailPanelComponent, "SECONDARY_MACROS", [{
  label: 'Grasas saturadas',
  field: 'saturatedFat100g',
  unit: 'g',
  toDisplay: 1
}, {
  label: 'Azúcares',
  field: 'sugars100g',
  unit: 'g',
  toDisplay: 1
}, {
  label: 'Fibra',
  field: 'fiber100g',
  unit: 'g',
  toDisplay: 1
}, {
  label: 'Sal',
  field: 'salt100g',
  unit: 'g',
  toDisplay: 1
}]);
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ProductDetailPanelComponent, "MICRONUTRIENTS", [{
  label: 'Sodio',
  field: 'sodium100g',
  unit: 'mg',
  toDisplay: 1000
}, {
  label: 'Colesterol',
  field: 'cholesterol100g',
  unit: 'mg',
  toDisplay: 1000
}, {
  label: 'Calcio',
  field: 'calcium100g',
  unit: 'mg',
  toDisplay: 1000
}, {
  label: 'Hierro',
  field: 'iron100g',
  unit: 'mg',
  toDisplay: 1000
}, {
  label: 'Magnesio',
  field: 'magnesium100g',
  unit: 'mg',
  toDisplay: 1000
}, {
  label: 'Fósforo',
  field: 'phosphorus100g',
  unit: 'mg',
  toDisplay: 1000
}, {
  label: 'Potasio',
  field: 'potassium100g',
  unit: 'mg',
  toDisplay: 1000
}, {
  label: 'Zinc',
  field: 'zinc100g',
  unit: 'mg',
  toDisplay: 1000
}, {
  label: 'Cobre',
  field: 'copper100g',
  unit: 'mg',
  toDisplay: 1000
}, {
  label: 'Manganeso',
  field: 'manganese100g',
  unit: 'mg',
  toDisplay: 1000
}, {
  label: 'Selenio',
  field: 'selenium100g',
  unit: 'µg',
  toDisplay: 1000000
}, {
  label: 'Yodo',
  field: 'iodine100g',
  unit: 'µg',
  toDisplay: 1000000
}, {
  label: 'Vitamina A',
  field: 'vitaminA100g',
  unit: 'µg',
  toDisplay: 1000000
}, {
  label: 'Vitamina C',
  field: 'vitaminC100g',
  unit: 'mg',
  toDisplay: 1000
}, {
  label: 'Vitamina D',
  field: 'vitaminD100g',
  unit: 'µg',
  toDisplay: 1000000
}, {
  label: 'Vitamina E',
  field: 'vitaminE100g',
  unit: 'mg',
  toDisplay: 1000
}, {
  label: 'Vitamina K',
  field: 'vitaminK100g',
  unit: 'µg',
  toDisplay: 1000000
}, {
  label: 'Vitamina B1',
  field: 'vitaminB1100g',
  unit: 'mg',
  toDisplay: 1000
}, {
  label: 'Vitamina B2',
  field: 'vitaminB2100g',
  unit: 'mg',
  toDisplay: 1000
}, {
  label: 'Vitamina B3',
  field: 'vitaminB3100g',
  unit: 'mg',
  toDisplay: 1000
}, {
  label: 'Vitamina B6',
  field: 'vitaminB6100g',
  unit: 'mg',
  toDisplay: 1000
}, {
  label: 'Vitamina B9 (fólico)',
  field: 'vitaminB9100g',
  unit: 'µg',
  toDisplay: 1000000
}, {
  label: 'Vitamina B12',
  field: 'vitaminB12100g',
  unit: 'µg',
  toDisplay: 1000000
}]);
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ProductDetailPanelComponent, "\u0275fac", function ProductDetailPanelComponent_Factory(t) {
  return new (t || _ProductDetailPanelComponent)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ProductDetailPanelComponent, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: _ProductDetailPanelComponent,
  selectors: [["app-product-detail-panel"]],
  inputs: {
    product: "product",
    recipe: "recipe",
    quantity: "quantity",
    onQuantityChange: "onQuantityChange",
    onAdd: "onAdd",
    addLabel: "addLabel"
  },
  decls: 52,
  vars: 25,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["type", "button", "aria-label", "Cerrar", 1, "tf-page-header__back-button", 3, "click"], ["name", "close-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "detail-panel-content"], ["class", "detail-brand", 4, "ngIf"], [1, "detail-qty-row"], [1, "qty-label"], [1, "qty-input-wrapper"], ["type", "number", "min", "1", 1, "qty-input", 3, "ngModel", "ngModelOptions", "ngModelChange"], [1, "qty-unit"], [1, "detail-macros"], [1, "macro-item"], [1, "macro-dot", "kcal"], [1, "macro-value"], [1, "macro-name"], [1, "macro-dot", "protein"], [1, "macro-dot", "carbs"], [1, "macro-dot", "fat"], ["class", "dietary-features-section", 4, "ngIf"], ["type", "button", "class", "add-to-target-btn", 3, "click", 4, "ngIf"], [4, "ngIf"], ["type", "button", "class", "detail-action-btn", 3, "click", 4, "ngIf"], [1, "detail-brand"], [1, "dietary-features-section"], [1, "dietary-grid", "icons-only"], ["class", "dietary-option active vegan", 4, "ngIf"], ["class", "dietary-option active vegetarian", 4, "ngIf"], ["class", "dietary-option active lactose-free", 4, "ngIf"], ["class", "dietary-option active gluten-free", 4, "ngIf"], [1, "dietary-option", "active", "vegan"], ["name", "leaf"], [1, "tooltip-text"], [1, "dietary-option", "active", "vegetarian"], [1, "dietary-option", "active", "lactose-free"], ["name", "water"], [1, "dietary-option", "active", "gluten-free"], ["name", "nutrition"], ["type", "button", 1, "add-to-target-btn", 3, "click"], ["name", "add-circle-outline"], ["class", "nutrient-table", 4, "ngIf"], ["class", "section-title", 4, "ngIf"], [1, "nutrient-table"], ["class", "nutrient-row", 4, "ngFor", "ngForOf"], [1, "nutrient-row"], [1, "nutrient-label"], [1, "nutrient-value"], [1, "section-title"], ["type", "button", 1, "detail-action-btn", 3, "click"], ["name", "create-outline"]],
  template: function ProductDetailPanelComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ProductDetailPanelComponent_Template_button_click_4_listener() {
        return ctx.dismiss();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "ion-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 6)(7, "h1", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](9, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "ion-content", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, ProductDetailPanelComponent_p_11_Template, 2, 1, "p", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "div", 11)(13, "ion-label", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, "Cantidad");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "div", 13)(16, "input", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function ProductDetailPanelComponent_Template_input_ngModelChange_16_listener($event) {
        return ctx.onQtyChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "span", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](18, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "div", 16)(20, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](21, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](23);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](24, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](26, "kcal");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](27, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](28, "div", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](30);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](31, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](32, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](33, "Prote\u00EDna");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](34, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](35, "div", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](36, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](37);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](38, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](39, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](40, "Carbos");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](41, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](42, "div", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](43, "span", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](44);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](45, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](46, "span", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](47, "Grasas");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](48, ProductDetailPanelComponent_div_48_Template, 6, 4, "div", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](49, ProductDetailPanelComponent_button_49_Template, 3, 1, "button", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](50, ProductDetailPanelComponent_ng_container_50_Template, 4, 3, "ng-container", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](51, ProductDetailPanelComponent_button_51_Template, 3, 0, "button", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"]((ctx.recipe == null ? null : ctx.recipe.name) || (ctx.product == null ? null : ctx.product.name));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.product == null ? null : ctx.product.brand);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx.quantity)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](24, _c0));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](24, 12, ctx.macros.kcal, "1.0-0"));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](31, 15, ctx.macros.protein, "1.0-1"), "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](38, 18, ctx.macros.carbs, "1.0-1"), "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](45, 21, ctx.macros.fat, "1.0-1"), "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", (ctx.product == null ? null : ctx.product.vegan) || (ctx.product == null ? null : ctx.product.vegetarian) || (ctx.product == null ? null : ctx.product.lactoseFree) || (ctx.product == null ? null : ctx.product.glutenFree));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.onAdd);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.isRecipe);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.canEditProduct());
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_8__.DecimalPipe],
  styles: [".detail-panel-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n}\n\n.detail-brand[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--tf-text-muted);\n  margin: 0 0 12px;\n}\n\n.dietary-features-section[_ngcontent-%COMP%] {\n  padding-top: 16px;\n  margin-top: 4px;\n  margin-bottom: 20px;\n  border-top: 1px solid var(--tf-border);\n}\n\n.dietary-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  gap: 12px;\n}\n.dietary-grid.icons-only[_ngcontent-%COMP%]   .dietary-option[_ngcontent-%COMP%] {\n  position: relative;\n  width: 36px;\n  height: 36px;\n  padding: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.dietary-grid.icons-only[_ngcontent-%COMP%]   .dietary-option[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  margin: 0;\n}\n.dietary-grid.icons-only[_ngcontent-%COMP%]   .dietary-option[_ngcontent-%COMP%]   .tooltip-text[_ngcontent-%COMP%] {\n  visibility: hidden;\n  width: 100px;\n  background-color: #1a1a1a;\n  color: #fff;\n  text-align: center;\n  border-radius: 8px;\n  padding: 6px 4px;\n  position: absolute;\n  z-index: 100;\n  bottom: 125%;\n  left: 50%;\n  margin-left: -50px;\n  opacity: 0;\n  transition: opacity 0.3s, transform 0.3s;\n  transform: translateY(10px);\n  font-size: 0.75rem;\n  font-weight: 600;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);\n  pointer-events: none;\n}\n.dietary-grid.icons-only[_ngcontent-%COMP%]   .dietary-option[_ngcontent-%COMP%]   .tooltip-text[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  top: 100%;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 5px;\n  border-style: solid;\n  border-color: #1a1a1a transparent transparent transparent;\n}\n.dietary-grid.icons-only[_ngcontent-%COMP%]   .dietary-option[_ngcontent-%COMP%]:active   .tooltip-text[_ngcontent-%COMP%], .dietary-grid.icons-only[_ngcontent-%COMP%]   .dietary-option[_ngcontent-%COMP%]:hover   .tooltip-text[_ngcontent-%COMP%] {\n  visibility: visible;\n  opacity: 1;\n  transform: translateY(0);\n}\n\n.dietary-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 20px;\n  padding: 8px 14px;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.dietary-option[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: var(--tf-text-muted);\n}\n.dietary-option.active.vegan[_ngcontent-%COMP%] {\n  background: rgba(46, 204, 113, 0.15);\n  border-color: #2ecc71;\n}\n.dietary-option.active.vegan[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #2ecc71;\n}\n.dietary-option.active.vegetarian[_ngcontent-%COMP%] {\n  background: rgba(162, 209, 73, 0.15);\n  border-color: #a2d149;\n}\n.dietary-option.active.vegetarian[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #a2d149;\n}\n.dietary-option.active.lactose-free[_ngcontent-%COMP%] {\n  background: rgba(155, 89, 182, 0.15);\n  border-color: #9b59b6;\n}\n.dietary-option.active.lactose-free[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #9b59b6;\n}\n.dietary-option.active.gluten-free[_ngcontent-%COMP%] {\n  background: rgba(241, 196, 15, 0.15);\n  border-color: #f1c40f;\n}\n.dietary-option.active.gluten-free[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: #f1c40f;\n}\n\n.detail-qty-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  margin-bottom: 16px;\n}\n\n.qty-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--tf-text-muted);\n}\n\n.qty-input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-radius: 8px;\n  padding: 6px 12px;\n}\n\n.qty-input[_ngcontent-%COMP%] {\n  width: 64px;\n  background: transparent;\n  border: none;\n  color: var(--tf-text);\n  font-size: 0.9rem;\n  text-align: right;\n  -moz-appearance: textfield;\n}\n.qty-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.qty-input[_ngcontent-%COMP%]::-webkit-outer-spin-button, .qty-input[_ngcontent-%COMP%]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n.qty-unit[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--tf-text-muted);\n}\n\n.detail-macros[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  padding: 14px;\n  background: #141414;\n  border: 1px solid #252525;\n  border-radius: 12px;\n  margin-bottom: 20px;\n}\n.detail-macros[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  flex: 1;\n}\n.detail-macros[_ngcontent-%COMP%]   .macro-dot[_ngcontent-%COMP%] {\n  width: 9px;\n  height: 9px;\n  border-radius: 50%;\n}\n.detail-macros[_ngcontent-%COMP%]   .macro-dot.kcal[_ngcontent-%COMP%] {\n  background: var(--ion-color-primary);\n}\n.detail-macros[_ngcontent-%COMP%]   .macro-dot.protein[_ngcontent-%COMP%] {\n  background: var(--ion-color-alternative);\n}\n.detail-macros[_ngcontent-%COMP%]   .macro-dot.carbs[_ngcontent-%COMP%] {\n  background: var(--ion-color-success);\n}\n.detail-macros[_ngcontent-%COMP%]   .macro-dot.fat[_ngcontent-%COMP%] {\n  background: var(--ion-color-secondary);\n}\n.detail-macros[_ngcontent-%COMP%]   .macro-value[_ngcontent-%COMP%] {\n  font-size: 0.92rem;\n  font-weight: 700;\n  color: #fff;\n}\n.detail-macros[_ngcontent-%COMP%]   .macro-name[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  color: var(--tf-text-muted);\n}\n\n.add-to-target-btn[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  width: 100%;\n  height: 46px;\n  margin-bottom: 20px;\n  font-size: 0.88rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n}\n.add-to-target-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.add-to-target-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.add-to-target-btn[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n\n.section-title[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  color: var(--tf-text-muted);\n  margin: 20px 0 10px;\n}\n\n.nutrient-table[_ngcontent-%COMP%] {\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: 10px;\n  overflow: hidden;\n}\n\n.nutrient-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 9px 14px;\n  font-size: 0.82rem;\n  border-bottom: 1px solid var(--tf-border);\n}\n.nutrient-row[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.nutrient-label[_ngcontent-%COMP%] {\n  color: var(--tf-text-secondary);\n}\n\n.nutrient-value[_ngcontent-%COMP%] {\n  color: var(--tf-text);\n  font-weight: 600;\n}\n\n.detail-action-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 42px;\n  margin-top: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-radius: 8px;\n  color: var(--tf-text-secondary);\n  font-size: 0.84rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.detail-action-btn[_ngcontent-%COMP%]:hover {\n  border-color: var(--tf-accent);\n  color: var(--tf-accent);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvcHJvZHVjdC1kZXRhaWwtcGFuZWwvcHJvZHVjdC1kZXRhaWwtcGFuZWwuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX2J1dHRvbnMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUNFLDBCQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7QUFGRjs7QUFLQTtFQUNFLGtCQUFBO0VBQ0EsMkJBQUE7RUFDQSxnQkFBQTtBQUZGOztBQU9BO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQ0FBQTtBQUpGOztBQU9BO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSwyQkFBQTtFQUNBLFNBQUE7QUFKRjtBQU9JO0VBQ0Usa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBQUxOO0FBT007RUFDRSxpQkFBQTtFQUNBLFNBQUE7QUFMUjtBQVFNO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLFNBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSx3Q0FBQTtFQUNBLDJCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLDBDQUFBO0VBQ0EseUNBQUE7RUFDQSxvQkFBQTtBQU5SO0FBUVE7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsU0FBQTtFQUNBLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHlEQUFBO0FBTlY7QUFVTTtFQUVFLG1CQUFBO0VBQ0EsVUFBQTtFQUNBLHdCQUFBO0FBVFI7O0FBZUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EscUNBQUE7RUFDQSwyQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsaUJBQUE7RUFDQSxpREFBQTtBQVpGO0FBY0U7RUFDRSxpQkFBQTtFQUNBLDJCQUFBO0FBWko7QUFnQkk7RUFDRSxvQ0FBQTtFQUNBLHFCQUFBO0FBZE47QUFnQk07RUFDRSxjQUFBO0FBZFI7QUFrQkk7RUFDRSxvQ0FBQTtFQUNBLHFCQUFBO0FBaEJOO0FBa0JNO0VBQ0UsY0FBQTtBQWhCUjtBQW9CSTtFQUNFLG9DQUFBO0VBQ0EscUJBQUE7QUFsQk47QUFvQk07RUFDRSxjQUFBO0FBbEJSO0FBc0JJO0VBQ0Usb0NBQUE7RUFDQSxxQkFBQTtBQXBCTjtBQXNCTTtFQUNFLGNBQUE7QUFwQlI7O0FBMEJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7QUF2QkY7O0FBMEJBO0VBQ0Usa0JBQUE7RUFDQSwyQkFBQTtBQXZCRjs7QUEwQkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsK0JBQUE7RUFDQSxrQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUF2QkY7O0FBMEJBO0VBQ0UsV0FBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtFQVdBLDBCQUFBO0FBakNGO0FBd0JFO0VBQ0UsYUFBQTtBQXRCSjtBQXlCRTtFQUVFLHdCQUFBO0VBQ0EsU0FBQTtBQXhCSjs7QUE2QkE7RUFDRSxrQkFBQTtFQUNBLDJCQUFBO0FBMUJGOztBQTZCQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLFFBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUExQkY7QUE0QkU7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0FBMUJKO0FBNkJFO0VBQ0UsVUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtBQTNCSjtBQTZCSTtFQUNFLG9DQUFBO0FBM0JOO0FBOEJJO0VBQ0Usd0NBQUE7QUE1Qk47QUErQkk7RUFDRSxvQ0FBQTtBQTdCTjtBQWdDSTtFQUNFLHNDQUFBO0FBOUJOO0FBa0NFO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7QUFoQ0o7QUFtQ0U7RUFDRSxpQkFBQTtFQUNBLDJCQUFBO0FBakNKOztBQXFDQTtFQzdPRSxZQUFBO0VBQ0EsbUJBRmlDO0VBR2pDLHFDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxnRkFBQTtFRHlPQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFFBQUE7QUE1QkY7QUNsTkU7RUFDRSxzQkFBQTtBRG9OSjtBQ2pORTtFQUNFLGFBQUE7RUFDQSxlQUFBO0FEbU5KO0FDaE5FO0VBQ0UsaUNBQUE7RUFDQSxtQkFBQTtBRGtOSjs7QUFvQkE7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxzQkFBQTtFQUNBLDJCQUFBO0VBQ0EsbUJBQUE7QUFqQkY7O0FBb0JBO0VBQ0UsK0JBQUE7RUFDQSxrQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUFqQkY7O0FBb0JBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EseUNBQUE7QUFqQkY7QUFtQkU7RUFDRSxtQkFBQTtBQWpCSjs7QUFxQkE7RUFDRSwrQkFBQTtBQWxCRjs7QUFxQkE7RUFDRSxxQkFBQTtFQUNBLGdCQUFBO0FBbEJGOztBQXFCQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFFBQUE7RUFDQSwrQkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0JBQUE7RUFDQSwrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBbEJGO0FBb0JFO0VBQ0UsOEJBQUE7RUFDQSx1QkFBQTtBQWxCSiIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJy4uLy4uLy4uLy4uL3RoZW1lL2J1dHRvbnMnO1xuQGltcG9ydCAnLi4vLi4vLi4vLi4vdGhlbWUvaW5wdXRzJztcblxuLmRldGFpbC1wYW5lbC1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1iZyk7XG4gIC0tcGFkZGluZy1zdGFydDogMTZweDtcbiAgLS1wYWRkaW5nLWVuZDogMTZweDtcbiAgLS1wYWRkaW5nLXRvcDogMTZweDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMTZweDtcbn1cblxuLmRldGFpbC1icmFuZCB7XG4gIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBtYXJnaW46IDAgMCAxMnB4O1xufVxuXG4vLyBNaXNtbyBkaXNlw4PCsW8gcXVlIEFkZFByb2R1Y3RQYWdlIChjbGllbnRlLCBhZGQtcHJvZHVjdC5wYWdlLnNjc3MpIMOiwoDClFxuLy8gcmV1dGlsaXphZG8gdGFsIGN1YWwsIHNvbG8gY2FtYmlhIHZhcigtLWNhcmQtYm9yZGVyKSBwb3IgdmFyKC0tdGYtYm9yZGVyKS5cbi5kaWV0YXJ5LWZlYXR1cmVzLXNlY3Rpb24ge1xuICBwYWRkaW5nLXRvcDogMTZweDtcbiAgbWFyZ2luLXRvcDogNHB4O1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbn1cblxuLmRpZXRhcnktZ3JpZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBnYXA6IDEycHg7XG5cbiAgJi5pY29ucy1vbmx5IHtcbiAgICAuZGlldGFyeS1vcHRpb24ge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgd2lkdGg6IDM2cHg7XG4gICAgICBoZWlnaHQ6IDM2cHg7XG4gICAgICBwYWRkaW5nOiAwO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgIGN1cnNvcjogcG9pbnRlcjtcblxuICAgICAgaW9uLWljb24ge1xuICAgICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgfVxuXG4gICAgICAudG9vbHRpcC10ZXh0IHtcbiAgICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICAgICAgICB3aWR0aDogMTAwcHg7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMxYTFhMWE7XG4gICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgICAgcGFkZGluZzogNnB4IDRweDtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB6LWluZGV4OiAxMDA7XG4gICAgICAgIGJvdHRvbTogMTI1JTtcbiAgICAgICAgbGVmdDogNTAlO1xuICAgICAgICBtYXJnaW4tbGVmdDogLTUwcHg7XG4gICAgICAgIG9wYWNpdHk6IDA7XG4gICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcywgdHJhbnNmb3JtIDAuM3M7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMHB4KTtcbiAgICAgICAgZm9udC1zaXplOiAwLjc1cmVtO1xuICAgICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjUpO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcblxuICAgICAgICAmOjphZnRlciB7XG4gICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgIHRvcDogMTAwJTtcbiAgICAgICAgICBsZWZ0OiA1MCU7XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IC01cHg7XG4gICAgICAgICAgYm9yZGVyLXdpZHRoOiA1cHg7XG4gICAgICAgICAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICMxYTFhMWEgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQgdHJhbnNwYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJjphY3RpdmUgLnRvb2x0aXAtdGV4dCxcbiAgICAgICY6aG92ZXIgLnRvb2x0aXAtdGV4dCB7XG4gICAgICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gICAgICAgIG9wYWNpdHk6IDE7XG4gICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLmRpZXRhcnktb3B0aW9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wOCk7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIHBhZGRpbmc6IDhweCAxNHB4O1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIH1cblxuICAmLmFjdGl2ZSB7XG4gICAgJi52ZWdhbiB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDQ2LCAyMDQsIDExMywgMC4xNSk7XG4gICAgICBib3JkZXItY29sb3I6ICMyZWNjNzE7XG5cbiAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgY29sb3I6ICMyZWNjNzE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJi52ZWdldGFyaWFuIHtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMTYyLCAyMDksIDczLCAwLjE1KTtcbiAgICAgIGJvcmRlci1jb2xvcjogI2EyZDE0OTtcblxuICAgICAgaW9uLWljb24ge1xuICAgICAgICBjb2xvcjogI2EyZDE0OTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmLmxhY3Rvc2UtZnJlZSB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDE1NSwgODksIDE4MiwgMC4xNSk7XG4gICAgICBib3JkZXItY29sb3I6ICM5YjU5YjY7XG5cbiAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgY29sb3I6ICM5YjU5YjY7XG4gICAgICB9XG4gICAgfVxuXG4gICAgJi5nbHV0ZW4tZnJlZSB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI0MSwgMTk2LCAxNSwgMC4xNSk7XG4gICAgICBib3JkZXItY29sb3I6ICNmMWM0MGY7XG5cbiAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgY29sb3I6ICNmMWM0MGY7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi5kZXRhaWwtcXR5LXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xufVxuXG4ucXR5LWxhYmVsIHtcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG59XG5cbi5xdHktaW5wdXQtd3JhcHBlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNHB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIHBhZGRpbmc6IDZweCAxMnB4O1xufVxuXG4ucXR5LWlucHV0IHtcbiAgd2lkdGg6IDY0cHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1zaXplOiAwLjlyZW07XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuXG4gICY6Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cblxuICAmOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uLFxuICAmOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uIHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgbWFyZ2luOiAwO1xuICB9XG4gIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xufVxuXG4ucXR5LXVuaXQge1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbn1cblxuLmRldGFpbC1tYWNyb3Mge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nOiAxNHB4O1xuICBiYWNrZ3JvdW5kOiAjMTQxNDE0O1xuICBib3JkZXI6IDFweCBzb2xpZCAjMjUyNTI1O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuXG4gIC5tYWNyby1pdGVtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDRweDtcbiAgICBmbGV4OiAxO1xuICB9XG5cbiAgLm1hY3JvLWRvdCB7XG4gICAgd2lkdGg6IDlweDtcbiAgICBoZWlnaHQ6IDlweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG5cbiAgICAmLmtjYWwge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIH1cblxuICAgICYucHJvdGVpbiB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItYWx0ZXJuYXRpdmUpO1xuICAgIH1cblxuICAgICYuY2FyYnMge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICAgIH1cblxuICAgICYuZmF0IHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zZWNvbmRhcnkpO1xuICAgIH1cbiAgfVxuXG4gIC5tYWNyby12YWx1ZSB7XG4gICAgZm9udC1zaXplOiAwLjkycmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgY29sb3I6ICNmZmY7XG4gIH1cblxuICAubWFjcm8tbmFtZSB7XG4gICAgZm9udC1zaXplOiAwLjdyZW07XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG59XG5cbi5hZGQtdG8tdGFyZ2V0LWJ0biB7XG4gIEBpbmNsdWRlIHRmLWdyYWRpZW50LWJ1dHRvbjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNDZweDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgZm9udC1zaXplOiAwLjg4cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG59XG5cbi5zZWN0aW9uLXRpdGxlIHtcbiAgZm9udC1zaXplOiAwLjhyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgbWFyZ2luOiAyMHB4IDAgMTBweDtcbn1cblxuLm51dHJpZW50LXRhYmxlIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0xKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cblxuLm51dHJpZW50LXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgcGFkZGluZzogOXB4IDE0cHg7XG4gIGZvbnQtc2l6ZTogMC44MnJlbTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG5cbiAgJjpsYXN0LWNoaWxkIHtcbiAgICBib3JkZXItYm90dG9tOiBub25lO1xuICB9XG59XG5cbi5udXRyaWVudC1sYWJlbCB7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG59XG5cbi5udXRyaWVudC12YWx1ZSB7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmRldGFpbC1hY3Rpb24tYnRuIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNDJweDtcbiAgbWFyZ2luLXRvcDogMjBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogNnB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGZvbnQtc2l6ZTogMC44NHJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICY6aG92ZXIge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgICBjb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgfVxufVxuIiwiLy8gQm90w4PCs24gQ1RBIGNvbiBncmFkaWVudGUgZGUgYWNlbnRvIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gZW4gfjExIHNpdGlvcyBkZVxuLy8gfjEwIHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS5cbi8vIENhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW8gc2VsZWN0b3IgeSBhw4PCsWFkZSBlbmNpbWEgc29sbyBsb1xuLy8gcXVlIHZhcsODwq1hIHBvciBsYXlvdXQgKHdpZHRoLCBoZWlnaHQsIGZvbnQtc2l6ZSwgbWFyZ2luKS5cbi8vXG4vLyBMYSBtaXRhZCBkZSBsb3Mgc2l0aW9zIG9yaWdpbmFsZXMgbm8gdGVuw4PCrWFuIHRyYW5zaWNpw4PCs24vZmVlZGJhY2sgZGUgcHVsc2FjacODwrNuXG4vLyBuaSA6Zm9jdXMtdmlzaWJsZSDDosKAwpQgZWwgbWl4aW4gbG9zIGHDg8KxYWRlIHNpZW1wcmUsIGNpZXJyYSBlc2UgaHVlY28gZGVcbi8vIGNvbnNpc3RlbmNpYSBkZSBpbnRlcmFjY2nDg8KzbiAoUFJPRFVDVC5tZDogXCJ1biBzb2xvIHBhdHLDg8KzbiBwb3IgdGlwbyBkZVxuLy8gY29tcG9uZW50ZVwiKSBlbiB2ZXogZGUgcGVycGV0dWFyIGxhIHZhcmlhY2nDg8KzbiBhY2NpZGVudGFsLlxuQG1peGluIHRmLWdyYWRpZW50LWJ1dHRvbigkcmFkaXVzOiAxMnB4KSB7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LWdyYWRpZW50KTtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudC1jb250cmFzdCk7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSwgb3BhY2l0eSAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45Nyk7XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjQ1O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLXRleHQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLy8gQm90w4PCs24gZGUgaGVhZGVyIHF1ZSBlcyBzb2xvIHVuIGljb25vIMOiwoDClCBtaXNtbyBsb29rIFwiZW52dWVsdG9cIiBxdWUgeWEgdXNhIGxhXG4vLyBhcHAgZGUgY29uc3VtaWRvciBlbiBzdXMgdG9vbGJhcnMgKHBhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy8uLi4vZGlldHMvXG4vLyBjb21wb25lbnRzL3Rvb2xiYXItY2FsZW5kYXI6IGZvbmRvICsgYm9yZGVyLXJhZGl1cyArIGNhamEgZmlqYSA0NHg0NCwgZW5cbi8vIHZleiBkZWwgaW9uLWJ1dHRvbiBwbGFuby90cmFuc3BhcmVudGUgcXVlIHRlbsODwq1hIGNhZGEgcGFudGFsbGEgZGUgdHJhaW5lcnNcbi8vIGhhc3RhIGFob3JhKS4gVG9rZW5lYWRvIGEgbGEgcGFsZXRhIGRlIGVzdGEgYXBwIGVuIHZleiBkZSByZXBldGlyIGxvc1xuLy8gcmdiYSgyNTUsMjU1LDI1NSwuLi4pIHN1ZWx0b3MgZGVsIG9yaWdpbmFsLlxuLy9cbi8vIFNpcnZlIHRhbnRvIHBhcmEgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCI+ICh1c2EgbGFzIENTUyBjdXN0b20gcHJvcGVydGllc1xuLy8gZGUgSW9uaWMpIGNvbW8gcGFyYSB1biA8YnV0dG9uPiBuYXRpdm8gKHVzYSBsYXMgcHJvcGllZGFkZXMgcGxhbmFzKSDDosKAwpRcbi8vIGFtYm9zIGNvZXhpc3RlbiBob3kgZW4gdHJhaW5lcnMgcGFyYSBlbCBtaXNtbyByb2wgZGUgXCJ2b2x2ZXJcIi9cImNlcnJhclwiLlxuQG1peGluIHRmLWljb24tYnV0dG9uKCRzaXplOiA0NHB4LCAkcmFkaXVzOiAxMnB4LCAkaWNvbi1zaXplOiAyMHB4KSB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcbiAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1iYWNrZ3JvdW5kLWhvdmVyOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtZm9jdXNlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1jb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICAtLWJvcmRlci1yYWRpdXM6ICN7JHJhZGl1c307XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbiAgLS1wYWRkaW5nLXRvcDogMDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMDtcblxuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6ICRyYWRpdXM7XG4gIHdpZHRoOiAkc2l6ZTtcbiAgaGVpZ2h0OiAkc2l6ZTtcbiAgbWluLXdpZHRoOiAkc2l6ZTtcbiAgbWluLWhlaWdodDogJHNpemU7XG4gIG1hcmdpbjogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCksXG4gICAgY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogJGljb24tc2l6ZTtcbiAgfVxufVxuXG4vLyBFeHBhbnNvciBpbnZpc2libGUgZGUgem9uYSBwdWxzYWJsZS5cbi8vXG4vLyBQQVJBIFFVw4PCiTogdW4gY29udHJvbCBjb21wYWN0byAodW4gaWNvbm8gZGUgMzIgcHggZW4gdW5hIGZpbGEgZGUgdGFibGEsIHVuXG4vLyBlbmxhY2UgZGUgdGV4dG8gZGUgMTYgcHgpIG5vIGxsZWdhIGEgbG9zIDQ0IHB4IHF1ZSBleGlnZSBQUk9EVUNULm1kLCB5XG4vLyBlbmdvcmRhcmxvIGRlIHZlcmRhZCBkZXNwbGF6YSB0b2RvIGxvIHF1ZSB0aWVuZSBhbHJlZGVkb3Igw6LCgMKUIGVuIHVuYSB0YWJsYVxuLy8gZGUgdmVpbnRlIGZpbGFzLCA4IHB4IHBvciBmaWxhIHNvbiBtZWRpYSBwYW50YWxsYS5cbi8vXG4vLyBFbCBwc2V1ZG9lbGVtZW50byBjcmVjZSBoYWNpYSBmdWVyYSBzaW4gb2N1cGFyIHNpdGlvIGVuIGVsIGZsdWpvLCBhc8ODwq0gcXVlXG4vLyBlbCBib3TDg8KzbiBzZSB2ZSBwZXF1ZcODwrFvIHkgc2UgcHVsc2EgZ3JhbmRlLlxuLy9cbi8vIEFWSVNPIERFIE1FRElDScODwpNOOiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBOTyB2ZSBlc3RlIHBzZXVkb2VsZW1lbnRvLCBhc8ODwq1cbi8vIHF1ZSBhbCB2ZXJpZmljYXIgaGF5IHF1ZSB1c2FyIGVsZW1lbnRGcm9tUG9pbnQgY29uIGVsIGVsZW1lbnRvIGRlbnRybyBkZWxcbi8vIHZpZXdwb3J0LiBBZGVtw4PCoXMgZWwgaGl0LXRlc3QgZGV2dWVsdmUgMiBweCBtZW5vcyBxdWUgbGEgY2FqYSBkZWNsYXJhZGFcbi8vIChjb21wcm9iYWRvOiAtNHB4IGRhIDQyLCAtNnB4IGRhIDQ2KSwgYXPDg8KtIHF1ZSB1biA0MiBtZWRpZG8gc29uIDQ0IHJlYWxlcy5cbi8vXG4vLyAkZ3JvdzogY3XDg8KhbnRvIGNyZWNlIHBvciBjYWRhIGxhZG8uIDRweCBsbGV2YSB1biBjb250cm9sIGRlIDM2IHB4IGEgNDQuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIoJGdyb3c6IDRweCkge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IC0jeyRncm93fTtcbiAgfVxufVxuXG4vLyBWYXJpYW50ZSBxdWUgc29sbyBjcmVjZSBlbiBWRVJUSUNBTC4gUGFyYSBjb250cm9sZXMgZW4gZmlsYSBkb25kZSBlbFxuLy8gZXhwYW5zb3IgaG9yaXpvbnRhbCBzZSBzb2xhcGFyw4PCrWEgY29uIGVsIGRlIGFsIGxhZG8geSByb2JhcsODwq1hIHN1cyB0b3F1ZXMuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIteSgkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC0jeyRncm93fTtcbiAgICBib3R0b206IC0jeyRncm93fTtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ }),

/***/ 20176:
/*!***************************************************************************************!*\
  !*** ./src/app/shared/components/product-detail-panel/product-detail-panel.module.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProductDetailPanelModule: () => (/* binding */ ProductDetailPanelModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _product_detail_panel_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./product-detail-panel.component */ 85965);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);

var _ProductDetailPanelModule;



class ProductDetailPanelModule {}
_ProductDetailPanelModule = ProductDetailPanelModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProductDetailPanelModule, "\u0275fac", function ProductDetailPanelModule_Factory(t) {
  return new (t || _ProductDetailPanelModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProductDetailPanelModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _ProductDetailPanelModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProductDetailPanelModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ProductDetailPanelModule, {
    declarations: [_product_detail_panel_component__WEBPACK_IMPORTED_MODULE_2__.ProductDetailPanelComponent],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule],
    exports: [_product_detail_panel_component__WEBPACK_IMPORTED_MODULE_2__.ProductDetailPanelComponent]
  });
})();

/***/ }),

/***/ 41853:
/*!******************************************************************************************!*\
  !*** ./src/app/shared/components/recipe-builder-modal/recipe-builder-modal.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RecipeBuilderModalComponent: () => (/* binding */ RecipeBuilderModalComponent)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var src_app_core_services_custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/custom-product/custom-product.service */ 57846);
/* harmony import */ var src_app_core_services_recipe_recipe_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/recipe/recipe.service */ 50888);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var src_app_features_diets_components_meal_components_search_foods_components_create_product_create_product_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/features/diets/components/meal/components/search-foods/components/create-product/create-product.page */ 75627);
/* harmony import */ var src_app_features_diets_components_meal_components_search_foods_search_foods_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/features/diets/components/meal/components/search-foods/search-foods.page */ 65693);
/* harmony import */ var _product_detail_panel_product_detail_panel_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../product-detail-panel/product-detail-panel.component */ 85965);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 84725);


var _RecipeBuilderModalComponent;












function RecipeBuilderModalComponent_span_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate2"](" ", ctx_r0.instructions.length, "/", ctx_r0.maxInstructionSteps, " ");
  }
}
function RecipeBuilderModalComponent_div_23_div_2_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RecipeBuilderModalComponent_div_23_div_2_button_5_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r13);
      const i_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]().index;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r11.removeInstructionStep(i_r9));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](1, "ion-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function RecipeBuilderModalComponent_div_23_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 35)(1, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "div", 37)(4, "textarea", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("input", function RecipeBuilderModalComponent_div_23_div_2_Template_textarea_input_4_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r15);
      const i_r9 = restoredCtx.index;
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r14.onInstructionChange(i_r9, $event.target.value));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](5, RecipeBuilderModalComponent_div_23_div_2_button_5_Template, 2, 0, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const step_r8 = ctx.$implicit;
    const i_r9 = ctx.index;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](i_r9 + 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("value", step_r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r6.instructions.length > 1);
  }
}
function RecipeBuilderModalComponent_div_23_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" M\u00E1ximo ", ctx_r7.maxInstructionSteps, " pasos ");
  }
}
function RecipeBuilderModalComponent_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 30)(1, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](2, RecipeBuilderModalComponent_div_23_div_2_Template, 6, 3, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](3, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RecipeBuilderModalComponent_div_23_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r17);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r16.addInstructionStep());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "ion-icon", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](6, "A\u00F1adir paso");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, RecipeBuilderModalComponent_div_23_span_7_Template, 2, 1, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r1.instructions)("ngForTrackBy", ctx_r1.trackByIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx_r1.instructions.length >= ctx_r1.maxInstructionSteps);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.instructions.length >= ctx_r1.maxInstructionSteps);
  }
}
function RecipeBuilderModalComponent_ng_container_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 43)(2, "div", 44)(3, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RecipeBuilderModalComponent_ng_container_24_Template_button_click_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r21);
      const i_r19 = restoredCtx.index;
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r20.previewIngredient(i_r19));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "ion-icon", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RecipeBuilderModalComponent_ng_container_24_Template_button_click_6_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r21);
      const i_r19 = restoredCtx.index;
      const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r22.removeIngredient(i_r19));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](7, "ion-icon", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "div", 49)(9, "ion-label", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](10, "Cantidad");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "div", 51)(12, "input", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function RecipeBuilderModalComponent_ng_container_24_Template_input_ngModelChange_12_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r21);
      const ingredient_r18 = restoredCtx.$implicit;
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r23.onQuantityChange(ingredient_r18, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "span", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14, "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "div", 54)(16, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](17, "div", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](20, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](21, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](22, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](23, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](25, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](26, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](27, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](28, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](30, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](31, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](32, "div", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](33, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipe"](35, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ingredient_r18 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"](" ", ingredient_r18.product.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ingredient_r18.quantity);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](20, 6, ctx_r2.ingredientMacros(ingredient_r18).kcal, "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](25, 9, ctx_r2.ingredientMacros(ingredient_r18).protein, "1.0-1"), "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](30, 12, ctx_r2.ingredientMacros(ingredient_r18).carbs, "1.0-1"), "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpipeBind2"](35, 15, ctx_r2.ingredientMacros(ingredient_r18).fat, "1.0-1"), "g");
  }
}
function RecipeBuilderModalComponent_p_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "p", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " A\u00F1ade al menos 2 ingredientes para poder guardar. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function RecipeBuilderModalComponent_span_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "Guardar receta");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
function RecipeBuilderModalComponent_ion_spinner_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "ion-spinner", 62);
  }
}
// Fix7 — el trainer no podía crear recetas nuevas (solo elegir ya
// existentes). No reutiliza ConfigRecipePage del cliente: esa pantalla
// arrastra un RecipeDraftService + un flujo de "añadir ingrediente" basado
// en navegación por rutas (goToSearchFoods con ingredientMode, tempData...)
// que no tiene sentido dentro de un panel/modal aislado. En vez de hacerla
// dual-mode (riesgo alto, toca una pantalla compartida con mucho estado),
// este componente es un builder mínimo propio: nombre + lista de
// ingredientes (reutilizando SearchFoodsPage/CreateProductPage para
// elegir/crear cada producto, igual que el resto del constructor de
// plantillas) + POST a recipeService.compose() — el mismo endpoint que usa
// ConfigRecipePage en modo "create" sin meal asociada.
class RecipeBuilderModalComponent {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalController", (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.inject)(_ionic_angular__WEBPACK_IMPORTED_MODULE_9__.ModalController));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "customProductService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.inject)(src_app_core_services_custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_2__.CustomProductService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recipeService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.inject)(src_app_core_services_recipe_recipe_service__WEBPACK_IMPORTED_MODULE_3__.RecipeService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.inject)(src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_4__.IonicUtilService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "name", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ingredients", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isOpeningPicker", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isSaving", false);
    // Preparación (instrucciones) — mismo patrón simple que ConfigRecipePage
    // del cliente (descriptionSteps: pasos de texto plano, sin chips ni
    // drag&drop — eso se probó y se quitó, complejidad innecesaria). Se
    // guarda tal cual en el campo description ya existente, sin tocar
    // modelo de datos. Colapsado por defecto, un botón bajo el nombre lo
    // revela.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "showInstructions", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "instructions", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "maxInstructionSteps", 20);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "maxInstructionStepLength", 300);
    // --- Panel de detalle (ProductDetailPanelComponent) ---
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "pickerModal", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "detailModal", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "selectionApi", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "suppressNextPickerCleanup", false);
  }
  get canSave() {
    return this.name.trim().length > 0 && this.ingredients.length >= 2;
  }
  dismiss() {
    void this.modalController.dismiss(null, 'cancel');
  }
  ingredientMacros(ingredient) {
    return this.customProductService.getMacros({
      product: ingredient.product,
      quantity: ingredient.quantity
    });
  }
  removeIngredient(index) {
    this.ingredients.splice(index, 1);
  }
  // La cantidad se edita in situ (mismo criterio que un ingrediente ya
  // elegido en la comida): no hace falta reabrir ningún selector solo para
  // cambiar el número de gramos.
  onQuantityChange(ingredient, value) {
    const parsed = parseFloat(value);
    ingredient.quantity = Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }
  // replaceIndex: null = añadir un ingrediente nuevo al final; un índice
  // concreto = sustituir ESE ingrediente por el que se elija ahora (mismo
  // patrón itemIndex que day-meal-editor-modal.openProductSearch).
  openIngredientPicker() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (replaceIndex = null) {
      if (_this.isOpeningPicker) return;
      _this.isOpeningPicker = true;
      try {
        const outerModal = yield _this.modalController.create({
          component: src_app_features_diets_components_meal_components_search_foods_search_foods_page__WEBPACK_IMPORTED_MODULE_6__.SearchFoodsPage,
          componentProps: {
            trainerContext: _this.buildTrainerContext(() => void outerModal.dismiss(), replaceIndex)
          },
          // A la izquierda de este panel (que sigue abierto y visible detrás),
          // sin backdrop propio para no oscurecerlo — se ve la receta
          // creciendo a la derecha mientras se buscan/crean ingredientes.
          // MISMO ancho que el panel de la receta ("del mismo tamaño").
          // ion-disable-focus-trap: con 2+ paneles abiertos a la vez, el focus
          // trap global de Ionic (trapKeyboardFocus, ver @ionic/core/overlays)
          // considera "activo" solo el último <ion-modal> presentado y
          // devuelve a la fuerza el foco ahí en cuanto detecta un focus en
          // OTRO overlay — ni dejaba escribir en el nombre/instrucciones de la
          // receta mientras este buscador seguía abierto. Es la clase oficial
          // de Ionic para optar por que este overlay NO participe en el
          // focus trap (la usan ellos mismos para el sheet con backdrop
          // desactivado, mismo caso que el nuestro: showBackdrop:false).
          cssClass: 'tf-panel-modal-left ion-disable-focus-trap',
          // showBackdrop:false NO desactiva backdropDismiss — sin esto, el
          // backdrop invisible se comía el primer click sobre otra card en
          // vez de dejarlo pasar (había que tocar dos veces).
          showBackdrop: false,
          backdropDismiss: false
        });
        _this.pickerModal = outerModal;
        yield outerModal.present();
        yield outerModal.onDidDismiss();
        _this.pickerModal = null;
        // Si el cierre fue porque tocamos un ingrediente YA añadido (ver
        // previewIngredient), el panel de detalle que acabamos de abrir para
        // ESE ingrediente no debe cerrarse — solo lo cerramos en el cierre
        // "normal" del buscador.
        if (_this.suppressNextPickerCleanup) {
          _this.suppressNextPickerCleanup = false;
        } else {
          yield _this.closeDetailPanel();
        }
      } finally {
        _this.isOpeningPicker = false;
      }
    }).apply(this, arguments);
  }
  buildTrainerContext(closeOuter, replaceIndex) {
    return {
      clientUser: {},
      dietDay: {},
      meal: {},
      // Una receta solo puede tener productos reales como ingredientes
      // (mismo criterio que ConfigRecipePage.addIngredients con
      // ingredientMode:true, que restringe la búsqueda a "products"): las
      // recetas marcadas en la selección múltiple se descartan aquí.
      targetLabel: this.name.trim() || 'la receta',
      confirmSelection: items => this.addIngredients(items, replaceIndex),
      closeSelf: closeOuter,
      registerSelectionApi: api => this.selectionApi = api,
      pickCreateProduct: () => void this.createIngredientProduct(closeOuter, replaceIndex),
      // Tocar una card SOLO previsualiza (naranja + panel de detalle
      // aparte, el más a la izquierda de los 3) — nunca añade.
      onFocusItem: item => void this.showDetailPanel(item, null)
    };
  }
  // No espera a que el panel anterior se cierre antes de abrir el nuevo:
  // si tocas producto A (abre detalle) y enseguida producto B, el detalle
  // debe pasar a mostrar B directamente — no cerrarse y quedar esperando
  // un segundo toque sobre B. `previous` se dismissea EN PARALELO al
  // present() del nuevo, nunca antes (eso era lo que forzaba el segundo
  // toque).
  showDetailPanel(item, ingredientIndex) {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const previous = _this2.detailModal;
      const modal = yield _this2.modalController.create({
        component: _product_detail_panel_product_detail_panel_component__WEBPACK_IMPORTED_MODULE_7__.ProductDetailPanelComponent,
        componentProps: {
          product: item.product,
          quantity: item.quantity,
          onQuantityChange: ingredientIndex !== null ? value => {
            const ingredient = _this2.ingredients[ingredientIndex];
            if (ingredient) ingredient.quantity = value ?? 0;
          } : undefined,
          // "Añadir a la receta" directo desde el detalle — solo tiene
          // sentido para un producto que aún no está en la receta (los ya
          // añadidos se abren vía previewIngredient, con ingredientIndex).
          // Marca el producto en la cesta del buscador (como el checkbox) y
          // solo cierra el propio panel de detalle — el buscador sigue
          // abierto. "Añadir N a la receta" (abajo del buscador) es quien de
          // verdad confirma y cierra todo.
          onAdd: ingredientIndex === null && item.kind === 'product' && item.product ? quantity => _this2.selectionApi?.setSelected(item, quantity) : undefined,
          addLabel: `Añadir a ${_this2.name.trim() || 'la receta'}`
        },
        // 2 paneles de 420px delante (receta + buscador) mientras el
        // buscador esté abierto; solo 1 (la receta) si ya se cerró.
        // ion-disable-focus-trap: ver comentario largo en openIngredientPicker
        // más arriba — imprescindible aquí también, este panel es el que
        // suele estar MÁS arriba de los 3 (el foco se secuestraba hacia él
        // incluso queriendo escribir en el propio panel de detalle).
        cssClass: (_this2.pickerModal ? 'tf-panel-modal-detail-2' : 'tf-panel-modal-detail-1') + ' ion-disable-focus-trap',
        showBackdrop: false,
        backdropDismiss: false
      });
      _this2.detailModal = modal;
      if (previous) yield previous.dismiss();
      yield modal.present();
      void modal.onDidDismiss().then(() => {
        if (_this2.detailModal === modal) _this2.detailModal = null;
      });
    })();
  }
  closeDetailPanel() {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this3.detailModal) {
        yield _this3.detailModal.dismiss();
        _this3.detailModal = null;
      }
    })();
  }
  // Tocar un ingrediente YA añadido (no un resultado de búsqueda): cierra
  // el buscador si estaba abierto y muestra su detalle pegado a la receta
  // — quedan solo 2 paneles (receta + detalle), como pide el flujo.
  previewIngredient(index) {
    var _this4 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const ingredient = _this4.ingredients[index];
      if (!ingredient) return;
      if (_this4.pickerModal) {
        _this4.suppressNextPickerCleanup = true;
        yield _this4.pickerModal.dismiss();
        // Sin esto, showDetailPanel podía leer this.pickerModal todavía como
        // "abierto" (la limpieza real vive en el continue-after-await de
        // openIngredientPicker, que puede no haber corrido aún) y elegir el
        // offset de 3 paneles cuando ya solo quedan 2 — el panel de detalle
        // se posicionaba fuera de sitio.
        _this4.pickerModal = null;
      }
      yield _this4.showDetailPanel({
        kind: 'product',
        product: ingredient.product,
        quantity: ingredient.quantity
      }, index);
    })();
  }
  addIngredients(items, replaceIndex) {
    items.forEach((item, i) => {
      if (item.kind !== 'product' || !item.product) return;
      const ingredient = {
        product: item.product,
        quantity: item.quantity ?? 100
      };
      if (replaceIndex !== null && i === 0) {
        this.ingredients[replaceIndex] = ingredient;
      } else {
        this.ingredients.push(ingredient);
      }
    });
  }
  createIngredientProduct(closeOuter, replaceIndex) {
    var _this5 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this5.modalController.create({
        component: src_app_features_diets_components_meal_components_search_foods_components_create_product_create_product_page__WEBPACK_IMPORTED_MODULE_5__.CreateProductPage,
        componentProps: {
          modalMode: true
        },
        cssClass: 'tf-panel-modal'
      });
      yield modal.present();
      const {
        data,
        role
      } = yield modal.onDidDismiss();
      if (role === 'confirm' && data?.product) {
        const ingredient = {
          product: data.product,
          quantity: 100
        };
        if (replaceIndex !== null) {
          _this5.ingredients[replaceIndex] = ingredient;
        } else {
          _this5.ingredients.push(ingredient);
        }
      }
      closeOuter();
    })();
  }
  toggleInstructions() {
    this.showInstructions = !this.showInstructions;
    if (this.showInstructions && this.instructions.length === 0) {
      this.instructions.push('');
    }
  }
  addInstructionStep() {
    if (this.instructions.length >= this.maxInstructionSteps) return;
    this.instructions.push('');
  }
  removeInstructionStep(index) {
    this.instructions.splice(index, 1);
  }
  onInstructionChange(index, value) {
    this.instructions[index] = value.slice(0, this.maxInstructionStepLength);
  }
  // Fix — sin trackBy, *ngFor sobre instructions (array de strings) usa la
  // identidad del propio string como clave: al escribir, onInstructionChange
  // sustituye el string en ese índice por uno NUEVO, así que Angular veía
  // "se borró este paso y se insertó otro" y RECREABA el <textarea> en cada
  // pulsación — el foco se perdía y solo dejaba escribir un carácter de una
  // vez. Con trackBy por índice, el elemento del array puede cambiar de
  // valor sin que el nodo DOM se recree.
  trackByIndex(index) {
    return index;
  }
  save() {
    var _this6 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this6.canSave || _this6.isSaving) return;
      _this6.isSaving = true;
      const customProducts = _this6.ingredients.map(ingredient => ({
        product: ingredient.product._id,
        quantity: ingredient.quantity
      }));
      const description = _this6.instructions.map(step => step.trim()).filter(Boolean).join('\n');
      _this6.recipeService.compose({
        recipe: {
          name: _this6.name.trim(),
          customProducts,
          description: description || undefined
        }
      }).subscribe({
        next: result => {
          _this6.isSaving = false;
          void _this6.modalController.dismiss(result.recipe, 'confirm');
        },
        error: err => {
          _this6.isSaving = false;
          _this6.ionicUtilService.showErrorToast(err?.error?.message || 'No se pudo crear la receta', 'Error', 3000);
        }
      });
    })();
  }
}
_RecipeBuilderModalComponent = RecipeBuilderModalComponent;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RecipeBuilderModalComponent, "\u0275fac", function RecipeBuilderModalComponent_Factory(t) {
  return new (t || _RecipeBuilderModalComponent)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RecipeBuilderModalComponent, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: _RecipeBuilderModalComponent,
  selectors: [["app-recipe-builder-modal"]],
  decls: 33,
  vars: 10,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["type", "button", "aria-label", "Cerrar", 1, "tf-page-header__back-button", 3, "click"], ["name", "close-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "builder-modal-content"], [1, "panel-hint"], [1, "input-wrapper"], ["name", "restaurant-outline", 1, "input-icon"], ["type", "text", "placeholder", "Nombre de la receta", 1, "input-field", 3, "ngModel", "ngModelChange"], [1, "description-editor-wrapper"], ["type", "button", 1, "description-trigger", 3, "click"], [1, "trigger-title"], [1, "trigger-right"], ["class", "step-counter", 4, "ngIf"], [1, "trigger-icon", 3, "name"], ["class", "description-card", 4, "ngIf"], [4, "ngFor", "ngForOf"], ["type", "button", 1, "add-ingredient-btn", 3, "disabled", "click"], ["name", "add-outline"], ["class", "ingredients-hint", 4, "ngIf"], [1, "builder-modal-footer"], ["type", "button", 1, "submit-button", 3, "disabled", "click"], [4, "ngIf"], ["name", "dots", 4, "ngIf"], [1, "step-counter"], [1, "description-card"], [1, "description-steps-editor"], ["class", "description-step editable", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "add-step-btn-full", 3, "disabled", "click"], ["class", "steps-limit-hint", 4, "ngIf"], [1, "description-step", "editable"], [1, "description-step-index"], [1, "step-input-wrapper"], ["rows", "1", "placeholder", "Ej. Corta la zanahoria y ponla a hervir...", 1, "description-step-input", 3, "value", "input"], ["type", "button", "class", "remove-step-btn-inline", "aria-label", "Quitar paso", 3, "click", 4, "ngIf"], ["type", "button", "aria-label", "Quitar paso", 1, "remove-step-btn-inline", 3, "click"], ["name", "close"], [1, "steps-limit-hint"], [1, "picked-food-card"], [1, "picked-food-header"], ["type", "button", "aria-label", "Ver detalle del ingrediente", "title", "Ver detalle", 1, "picked-food-name", "picked-food-name-btn", 3, "click"], ["name", "nutrition-outline"], ["type", "button", "aria-label", "Quitar ingrediente", 1, "remove-btn", 3, "click"], ["name", "trash-outline"], [1, "picked-food-qty-row"], [1, "qty-label"], [1, "qty-input-wrapper"], ["type", "number", "min", "1", 1, "qty-input", 3, "ngModel", "ngModelChange"], [1, "qty-unit"], [1, "picked-food-macros"], [1, "macro-item"], [1, "macro-dot", "kcal"], [1, "macro-value"], [1, "macro-dot", "protein"], [1, "macro-dot", "carbs"], [1, "macro-dot", "fat"], [1, "ingredients-hint"], ["name", "dots"]],
  template: function RecipeBuilderModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RecipeBuilderModalComponent_Template_button_click_4_listener() {
        return ctx.dismiss();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](5, "ion-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "div", 6)(7, "h1", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8, "Nueva receta");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](9, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](10, "ion-content", 9)(11, "p", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, " Crea una receta real a partir de 2 o m\u00E1s productos: quedar\u00E1 en tu biblioteca, lista para pautar en cualquier plantilla o cliente. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](14, "ion-icon", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "input", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("ngModelChange", function RecipeBuilderModalComponent_Template_input_ngModelChange_15_listener($event) {
        return ctx.name = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](16, "div", 14)(17, "button", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RecipeBuilderModalComponent_Template_button_click_17_listener() {
        return ctx.toggleInstructions();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "span", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](19, "Preparaci\u00F3n");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](21, RecipeBuilderModalComponent_span_21_Template, 2, 2, "span", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](22, "ion-icon", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](23, RecipeBuilderModalComponent_div_23_Template, 8, 4, "div", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](24, RecipeBuilderModalComponent_ng_container_24_Template, 36, 18, "ng-container", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](25, "button", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RecipeBuilderModalComponent_Template_button_click_25_listener() {
        return ctx.openIngredientPicker();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](26, "ion-icon", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](27, " A\u00F1adir ingrediente ");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](28, RecipeBuilderModalComponent_p_28_Template, 2, 0, "p", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](29, "ion-footer", 25)(30, "button", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RecipeBuilderModalComponent_Template_button_click_30_listener() {
        return ctx.save();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](31, RecipeBuilderModalComponent_span_31_Template, 2, 0, "span", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](32, RecipeBuilderModalComponent_ion_spinner_32_Template, 1, 0, "ion-spinner", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngModel", ctx.name);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.instructions.length > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("name", ctx.showInstructions ? "chevron-up" : "chevron-down");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.showInstructions);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx.ingredients);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", ctx.isOpeningPicker);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.ingredients.length > 0 && ctx.ingredients.length < 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("disabled", !ctx.canSave || ctx.isSaving);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx.isSaving);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.isSaving);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonSpinner, _angular_common__WEBPACK_IMPORTED_MODULE_10__.DecimalPipe],
  styles: [".builder-modal-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n}\n\n.panel-hint[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: var(--tf-text-muted);\n  margin: 0 0 16px;\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n  height: 50px;\n  margin-bottom: 16px;\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  flex-shrink: 0;\n  font-size: 1.1rem;\n}\n\n.input-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n  font-size: 0.9rem;\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.picked-food-card[_ngcontent-%COMP%] {\n  background-color: #141414;\n  border: 1px solid #252525;\n  border-radius: 12px;\n  margin-bottom: 10px;\n  padding: 12px 14px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.picked-food-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.picked-food-name[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-weight: 600;\n  font-size: 0.95rem;\n  color: #fff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.picked-food-name[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 1rem;\n  color: var(--tf-accent);\n}\n\n.picked-food-name-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  padding: 0;\n  text-align: left;\n  cursor: pointer;\n}\n.picked-food-name-btn[_ngcontent-%COMP%]:hover:not(:disabled) {\n  color: var(--tf-accent);\n}\n.picked-food-name-btn[_ngcontent-%COMP%]:hover:not(:disabled)   ion-icon[_ngcontent-%COMP%] {\n  color: var(--tf-accent);\n}\n.picked-food-name-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: default;\n}\n\n.picked-food-qty-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  margin-top: 8px;\n}\n\n.qty-label[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--tf-text-muted);\n}\n\n.qty-input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-radius: 8px;\n  padding: 4px 10px;\n}\n\n.qty-input[_ngcontent-%COMP%] {\n  width: 56px;\n  background: transparent;\n  border: none;\n  color: var(--tf-text);\n  font-size: 0.85rem;\n  text-align: right;\n  -moz-appearance: textfield;\n}\n.qty-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.qty-input[_ngcontent-%COMP%]::-webkit-outer-spin-button, .qty-input[_ngcontent-%COMP%]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n.qty-unit[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--tf-text-muted);\n}\n\n.remove-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  color: var(--tf-text-muted);\n  cursor: pointer;\n  flex-shrink: 0;\n  width: 30px;\n  height: 30px;\n}\n.remove-btn[_ngcontent-%COMP%]:hover {\n  color: var(--tf-danger);\n}\n\n.picked-food-macros[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  margin-top: 10px;\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex: 1;\n  justify-content: center;\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot.kcal[_ngcontent-%COMP%] {\n  background: var(--ion-color-primary);\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot.protein[_ngcontent-%COMP%] {\n  background: var(--ion-color-alternative);\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot.carbs[_ngcontent-%COMP%] {\n  background: var(--ion-color-success);\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot.fat[_ngcontent-%COMP%] {\n  background: var(--ion-color-secondary);\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-value[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: rgba(255, 255, 255, 0.85);\n  white-space: nowrap;\n}\n\n.add-ingredient-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 44px;\n  margin-top: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  background: transparent;\n  border: 1px dashed var(--tf-border-strong);\n  border-radius: 10px;\n  color: var(--tf-text-muted);\n  font-size: 0.84rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.add-ingredient-btn[_ngcontent-%COMP%]:not(:disabled):hover {\n  border-color: var(--tf-accent);\n  color: var(--tf-accent);\n}\n.add-ingredient-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n\n.ingredients-hint[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--tf-text-muted);\n  margin: 10px 2px 0;\n}\n\n.description-editor-wrapper[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.description-editor-wrapper[_ngcontent-%COMP%]   .description-trigger[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px 12px;\n  border: 1px solid var(--tf-border);\n  background: var(--tf-surface-2);\n  color: var(--tf-text-secondary);\n  border-radius: 12px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  min-width: 0;\n  font-size: 0.82rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s ease;\n}\n.description-editor-wrapper[_ngcontent-%COMP%]   .description-trigger[_ngcontent-%COMP%]:active {\n  background: var(--tf-surface-1);\n}\n.description-editor-wrapper[_ngcontent-%COMP%]   .description-trigger[_ngcontent-%COMP%]   .trigger-title[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n  min-width: 0;\n  text-align: left;\n  letter-spacing: 0.2px;\n}\n.description-editor-wrapper[_ngcontent-%COMP%]   .description-trigger[_ngcontent-%COMP%]   .trigger-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.description-editor-wrapper[_ngcontent-%COMP%]   .description-trigger[_ngcontent-%COMP%]   .step-counter[_ngcontent-%COMP%] {\n  font-size: 0.72rem;\n  font-weight: 600;\n  color: var(--tf-text-muted);\n}\n.description-editor-wrapper[_ngcontent-%COMP%]   .description-trigger[_ngcontent-%COMP%]   .trigger-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--tf-text-secondary);\n  flex-shrink: 0;\n}\n.description-editor-wrapper[_ngcontent-%COMP%]   .description-card[_ngcontent-%COMP%] {\n  margin-top: 0;\n  padding: 12px;\n  border: 1px solid var(--tf-border);\n  border-top: none;\n  border-radius: 0 0 12px 12px;\n  background: var(--tf-surface-1);\n}\n\n.description-steps-editor[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n.description-steps-editor[_ngcontent-%COMP%]   .description-step.editable[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  gap: 10px;\n}\n.description-steps-editor[_ngcontent-%COMP%]   .description-step-index[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 26px;\n  height: 26px;\n  margin-top: 4px;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  background: rgba(var(--ion-color-primary-rgb), 0.12);\n  color: var(--ion-color-primary);\n  font-size: 0.74rem;\n  font-weight: 700;\n  line-height: 1;\n}\n.description-steps-editor[_ngcontent-%COMP%]   .step-input-wrapper[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  position: relative;\n  display: flex;\n  align-items: flex-start;\n}\n.description-steps-editor[_ngcontent-%COMP%]   .step-input-wrapper[_ngcontent-%COMP%]   .description-step-input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  resize: none;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-radius: 10px;\n  padding: 10px 36px 10px 12px;\n  color: var(--tf-text);\n  font-size: 0.9rem;\n  font-family: inherit;\n  line-height: 1.4;\n  transition: border-color 0.15s ease;\n}\n.description-steps-editor[_ngcontent-%COMP%]   .step-input-wrapper[_ngcontent-%COMP%]   .description-step-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n.description-steps-editor[_ngcontent-%COMP%]   .step-input-wrapper[_ngcontent-%COMP%]   .description-step-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--tf-accent);\n}\n.description-steps-editor[_ngcontent-%COMP%]   .step-input-wrapper[_ngcontent-%COMP%]   .remove-step-btn-inline[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 6px;\n  top: 6px;\n  background: none;\n  border: none;\n  padding: 4px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 50%;\n  transition: background 0.15s ease;\n  z-index: 2;\n}\n.description-steps-editor[_ngcontent-%COMP%]   .step-input-wrapper[_ngcontent-%COMP%]   .remove-step-btn-inline[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--tf-danger);\n  pointer-events: none;\n}\n.description-steps-editor[_ngcontent-%COMP%]   .step-input-wrapper[_ngcontent-%COMP%]   .remove-step-btn-inline[_ngcontent-%COMP%]:hover {\n  background: rgba(var(--ion-color-danger-rgb), 0.15);\n}\n.description-steps-editor[_ngcontent-%COMP%]   .add-step-btn-full[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 10px 16px;\n  border: 1px dashed rgba(var(--ion-color-primary-rgb), 0.3);\n  background: rgba(var(--ion-color-primary-rgb), 0.05);\n  border-radius: 8px;\n  color: var(--ion-color-primary);\n  font-size: 0.84rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: background 0.15s ease;\n}\n.description-steps-editor[_ngcontent-%COMP%]   .add-step-btn-full[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n}\n.description-steps-editor[_ngcontent-%COMP%]   .add-step-btn-full[_ngcontent-%COMP%]:active {\n  background: rgba(var(--ion-color-primary-rgb), 0.12);\n}\n.description-steps-editor[_ngcontent-%COMP%]   .add-step-btn-full[disabled][_ngcontent-%COMP%] {\n  opacity: 0.4;\n  pointer-events: none;\n}\n.description-steps-editor[_ngcontent-%COMP%]   .steps-limit-hint[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  color: var(--tf-text-muted);\n  text-align: center;\n  margin-top: -4px;\n}\n\n.builder-modal-footer[_ngcontent-%COMP%] {\n  --background: var(--tf-surface-1);\n  padding: 12px 16px;\n  border-top: 1px solid var(--tf-border);\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  width: 100%;\n  height: 50px;\n  font-size: 0.92rem;\n}\n.submit-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvcmVjaXBlLWJ1aWxkZXItbW9kYWwvcmVjaXBlLWJ1aWxkZXItbW9kYWwuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX2lucHV0cy5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19idXR0b25zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7RUFDRSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0FBRkY7O0FBS0E7RUFDRSxrQkFBQTtFQUNBLDJCQUFBO0VBQ0EsZ0JBQUE7QUFGRjs7QUFLQTtFQ1hFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSwrQkRTMEI7RUNSMUIseUNBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpREFBQTtFRE1BLFlBQUE7RUFDQSxtQkFBQTtBQUtGO0FDVkU7RUFDRSw4QkFBQTtBRFlKOztBQUxBO0VDRkUsMkJBQUE7RUFDQSxjQUFBO0VER0EsaUJBQUE7QUFTRjs7QUFOQTtFQ0ZFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0Esb0JBQUE7RUFDQSxZQUFBO0VESEEsaUJBQUE7QUFnQkY7QUNYRTtFQUNFLDJCQUFBO0FEYUo7O0FBYkE7RUFDRSx5QkFBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esd0NBQUE7QUFnQkY7O0FBYkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBZ0JGOztBQWJBO0VBQ0UsT0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFnQkY7QUFkRTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsdUJBQUE7QUFnQko7O0FBVEE7RUFDRSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBWUY7QUFWRTtFQUNFLHVCQUFBO0FBWUo7QUFWSTtFQUNFLHVCQUFBO0FBWU47QUFSRTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBVUo7O0FBTkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0FBU0Y7O0FBTkE7RUFDRSxrQkFBQTtFQUNBLDJCQUFBO0FBU0Y7O0FBTkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsK0JBQUE7RUFDQSxrQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFTRjs7QUFOQTtFQUNFLFdBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFhQSwwQkFBQTtBQUhGO0FBUkU7RUFDRSxhQUFBO0FBVUo7QUFMRTtFQUVFLHdCQUFBO0VBQ0EsU0FBQTtBQU1KOztBQURBO0VBQ0UsaUJBQUE7RUFDQSwyQkFBQTtBQUlGOztBQURBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSwyQkFBQTtFQUNBLGVBQUE7RUFDQSxjQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7QUFJRjtBQUZFO0VBQ0UsdUJBQUE7QUFJSjs7QUFBQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLFFBQUE7RUFDQSxnQkFBQTtBQUdGO0FBREU7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsT0FBQTtFQUNBLHVCQUFBO0FBR0o7QUFBRTtFQUNFLFVBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBRUo7QUFBSTtFQUNFLG9DQUFBO0FBRU47QUFDSTtFQUNFLHdDQUFBO0FBQ047QUFFSTtFQUNFLG9DQUFBO0FBQU47QUFHSTtFQUNFLHNDQUFBO0FBRE47QUFLRTtFQUNFLGtCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxtQkFBQTtBQUhKOztBQU9BO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxRQUFBO0VBQ0EsdUJBQUE7RUFDQSwwQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQUpGO0FBTUU7RUFDRSw4QkFBQTtFQUNBLHVCQUFBO0FBSko7QUFPRTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBTEo7O0FBU0E7RUFDRSxrQkFBQTtFQUNBLDJCQUFBO0VBQ0Esa0JBQUE7QUFORjs7QUFZQTtFQUNFLG1CQUFBO0FBVEY7QUFXRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGtDQUFBO0VBQ0EsK0JBQUE7RUFDQSwrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxTQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsaUNBQUE7QUFUSjtBQVdJO0VBQ0UsK0JBQUE7QUFUTjtBQVlJO0VBQ0UsY0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0FBVk47QUFhSTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxjQUFBO0FBWE47QUFjSTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSwyQkFBQTtBQVpOO0FBZUk7RUFDRSxlQUFBO0VBQ0EsK0JBQUE7RUFDQSxjQUFBO0FBYk47QUFpQkU7RUFDRSxhQUFBO0VBQ0EsYUFBQTtFQUNBLGtDQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLCtCQUFBO0FBZko7O0FBbUJBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtBQWhCRjtBQWtCRTtFQUNFLGFBQUE7RUFDQSxvQkFBQTtFQUNBLFNBQUE7QUFoQko7QUFtQkU7RUFDRSxjQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0Esb0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxvREFBQTtFQUNBLCtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUFqQko7QUFvQkU7RUFDRSxPQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0FBbEJKO0FBb0JJO0VBQ0UsT0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsK0JBQUE7RUFDQSxrQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsNEJBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtFQUNBLG1DQUFBO0FBbEJOO0FBb0JNO0VBQ0UsMkJBQUE7QUFsQlI7QUFxQk07RUFDRSxhQUFBO0VBQ0EsOEJBQUE7QUFuQlI7QUF1Qkk7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxRQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUNBQUE7RUFDQSxVQUFBO0FBckJOO0FBdUJNO0VBQ0UsaUJBQUE7RUFDQSx1QkFBQTtFQUNBLG9CQUFBO0FBckJSO0FBd0JNO0VBQ0UsbURBQUE7QUF0QlI7QUEyQkU7RUFDRSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxRQUFBO0VBQ0Esa0JBQUE7RUFDQSwwREFBQTtFQUNBLG9EQUFBO0VBQ0Esa0JBQUE7RUFDQSwrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsaUNBQUE7QUF6Qko7QUEyQkk7RUFDRSxpQkFBQTtBQXpCTjtBQTRCSTtFQUNFLG9EQUFBO0FBMUJOO0FBNkJJO0VBQ0UsWUFBQTtFQUNBLG9CQUFBO0FBM0JOO0FBK0JFO0VBQ0Usa0JBQUE7RUFDQSwyQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUE3Qko7O0FBaUNBO0VBQ0UsaUNBQUE7RUFDQSxrQkFBQTtFQUNBLHNDQUFBO0FBOUJGOztBQWlDQTtFRXRhRSxZQUFBO0VBQ0EsbUJBRmlDO0VBR2pDLHFDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxnRkFBQTtFRmthQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBeEJGO0FFMVlFO0VBQ0Usc0JBQUE7QUY0WUo7QUV6WUU7RUFDRSxhQUFBO0VBQ0EsZUFBQTtBRjJZSjtBRXhZRTtFQUNFLGlDQUFBO0VBQ0EsbUJBQUE7QUYwWUo7QUFlRTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBYkoiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi8uLi8uLi8uLi90aGVtZS9idXR0b25zJztcbkBpbXBvcnQgJy4uLy4uLy4uLy4uL3RoZW1lL2lucHV0cyc7XG5cbi5idWlsZGVyLW1vZGFsLWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLXRmLWJnKTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxNnB4O1xuICAtLXBhZGRpbmctZW5kOiAxNnB4O1xuICAtLXBhZGRpbmctdG9wOiAxNnB4O1xuICAtLXBhZGRpbmctYm90dG9tOiAxNnB4O1xufVxuXG4ucGFuZWwtaGludCB7XG4gIGZvbnQtc2l6ZTogMC44MnJlbTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBtYXJnaW46IDAgMCAxNnB4O1xufVxuXG4uaW5wdXQtd3JhcHBlciB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LXdyYXBwZXIodmFyKC0tdGYtc3VyZmFjZS0yKSk7XG4gIGhlaWdodDogNTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbn1cblxuLmlucHV0LWljb24ge1xuICBAaW5jbHVkZSB0Zi1pbnB1dC1pY29uO1xuICBmb250LXNpemU6IDEuMXJlbTtcbn1cblxuLmlucHV0LWZpZWxkIHtcbiAgQGluY2x1ZGUgdGYtaW5wdXQtZmllbGQ7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xufVxuXG4vLyBNaXNtbyBzaGVsbCBxdWUgbGFzIGNhcmRzIGVsZWdpZGFzIGRlbCBjb25zdHJ1Y3RvciBkZSBjb21pZGFzXG4vLyAoZGF5LW1lYWwtZWRpdG9yLW1vZGFsLmNvbXBvbmVudC5zY3NzKSDDosKAwpQgdW4gaW5ncmVkaWVudGUgeWEgZWxlZ2lkbyBlc1xuLy8gY29uY2VwdHVhbG1lbnRlIGxvIG1pc21vIHF1ZSB1biBhbGltZW50byBwYXV0YWRvLlxuLnBpY2tlZC1mb29kLWNhcmQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTQxNDE0O1xuICBib3JkZXI6IDFweCBzb2xpZCAjMjUyNTI1O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBwYWRkaW5nOiAxMnB4IDE0cHg7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi5waWNrZWQtZm9vZC1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbn1cblxuLnBpY2tlZC1mb29kLW5hbWUge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNnB4O1xuICBmb250LXdlaWdodDogNjAwO1xuICBmb250LXNpemU6IDAuOTVyZW07XG4gIGNvbG9yOiAjZmZmO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcblxuICBpb24taWNvbiB7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICB9XG59XG5cbi8vIEVsIG5vbWJyZSBlcyB0YW1iacODwqluIGVsIGJvdMODwrNuIFwiY2FtYmlhciBwcm9kdWN0b1wiIMOiwoDClCBtaXNtbyB0ZXh0by9pY29ub1xuLy8gcXVlIGVsIHZlY2lubyBkZSBzb2xvLWxlY3R1cmEsIHBlcm8gY2xpY2FibGUgKHJlYWJyZSBlbCBidXNjYWRvclxuLy8gYXB1bnRhbmRvIGEgZXN0ZSBpbmdyZWRpZW50ZSBlbiBjb25jcmV0bykuXG4ucGlja2VkLWZvb2QtbmFtZS1idG4ge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgJjpob3Zlcjpub3QoOmRpc2FibGVkKSB7XG4gICAgY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBjb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgICB9XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjY7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG59XG5cbi5waWNrZWQtZm9vZC1xdHktcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDEwcHg7XG4gIG1hcmdpbi10b3A6IDhweDtcbn1cblxuLnF0eS1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMC43OHJlbTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xufVxuXG4ucXR5LWlucHV0LXdyYXBwZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDRweDtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBwYWRkaW5nOiA0cHggMTBweDtcbn1cblxuLnF0eS1pbnB1dCB7XG4gIHdpZHRoOiA1NnB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG5cbiAgJjpmb2N1cyB7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgfVxuXG4gIC8vIE9jdWx0YXIgbGFzIGZsZWNoYXMgbmF0aXZhcyBkZWwgbnVtYmVyIGlucHV0IMOiwoDClCBlbCB0ZWNsYWRvIG51bcODwqlyaWNvXG4gIC8vIGRlbCBtw4PCs3ZpbCB5YSBjdWJyZSBlc3RvLCBsYXMgZmxlY2hhcyBzb2xvIGHDg8KxYWRlbiBydWlkbyB2aXN1YWwuXG4gICY6Oi13ZWJraXQtb3V0ZXItc3Bpbi1idXR0b24sXG4gICY6Oi13ZWJraXQtaW5uZXItc3Bpbi1idXR0b24ge1xuICAgIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgICBtYXJnaW46IDA7XG4gIH1cbiAgLW1vei1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7XG59XG5cbi5xdHktdW5pdCB7XG4gIGZvbnQtc2l6ZTogMC44cmVtO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG59XG5cbi5yZW1vdmUtYnRuIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmbGV4LXNocmluazogMDtcbiAgd2lkdGg6IDMwcHg7XG4gIGhlaWdodDogMzBweDtcblxuICAmOmhvdmVyIHtcbiAgICBjb2xvcjogdmFyKC0tdGYtZGFuZ2VyKTtcbiAgfVxufVxuXG4ucGlja2VkLWZvb2QtbWFjcm9zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDhweDtcbiAgbWFyZ2luLXRvcDogMTBweDtcblxuICAubWFjcm8taXRlbSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogNnB4O1xuICAgIGZsZXg6IDE7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIH1cblxuICAubWFjcm8tZG90IHtcbiAgICB3aWR0aDogOHB4O1xuICAgIGhlaWdodDogOHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBmbGV4LXNocmluazogMDtcblxuICAgICYua2NhbCB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgfVxuXG4gICAgJi5wcm90ZWluIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1hbHRlcm5hdGl2ZSk7XG4gICAgfVxuXG4gICAgJi5jYXJicyB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgfVxuXG4gICAgJi5mYXQge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG4gICAgfVxuICB9XG5cbiAgLm1hY3JvLXZhbHVlIHtcbiAgICBmb250LXNpemU6IDAuNzhyZW07XG4gICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSk7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgfVxufVxuXG4uYWRkLWluZ3JlZGllbnQtYnRuIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNDRweDtcbiAgbWFyZ2luLXRvcDogNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IDFweCBkYXNoZWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgZm9udC1zaXplOiAwLjg0cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgJjpub3QoOmRpc2FibGVkKTpob3ZlciB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICB9XG5cbiAgJjpkaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogMC40O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgfVxufVxuXG4uaW5ncmVkaWVudHMtaGludCB7XG4gIGZvbnQtc2l6ZTogMC43OHJlbTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBtYXJnaW46IDEwcHggMnB4IDA7XG59XG5cbi8vIFByZXBhcmFjacODwrNuIMOiwoDClCBtaXNtbyBwYXRyw4PCs24vZXN0aWxvIHF1ZSBDb25maWdSZWNpcGVQYWdlIGRlbCBjbGllbnRlXG4vLyAoZGVzY3JpcHRpb24tZWRpdG9yLXdyYXBwZXIsIHZlciBjb25maWctcmVjaXBlLnBhZ2Uuc2NzcyksIHBvcnRhZG8gY29uIGxvc1xuLy8gdG9rZW5zIGRlIGNvbG9yIGRlbCB0cmFpbmVyICgtLXRmLSogZW4gdmV6IGRlIC0tY2FyZC1ib3JkZXIvLS10ZXh0LSopLlxuLmRlc2NyaXB0aW9uLWVkaXRvci13cmFwcGVyIHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcblxuICAuZGVzY3JpcHRpb24tdHJpZ2dlciB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcGFkZGluZzogMTBweCAxMnB4O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBnYXA6IDEycHg7XG4gICAgbWluLXdpZHRoOiAwO1xuICAgIGZvbnQtc2l6ZTogMC44MnJlbTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzIGVhc2U7XG5cbiAgICAmOmFjdGl2ZSB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTEpO1xuICAgIH1cblxuICAgIC50cmlnZ2VyLXRpdGxlIHtcbiAgICAgIGZsZXg6IDEgMSBhdXRvO1xuICAgICAgbWluLXdpZHRoOiAwO1xuICAgICAgdGV4dC1hbGlnbjogbGVmdDtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAwLjJweDtcbiAgICB9XG5cbiAgICAudHJpZ2dlci1yaWdodCB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGdhcDogOHB4O1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgfVxuXG4gICAgLnN0ZXAtY291bnRlciB7XG4gICAgICBmb250LXNpemU6IDAuNzJyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICAgIH1cblxuICAgIC50cmlnZ2VyLWljb24ge1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgICAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIH1cbiAgfVxuXG4gIC5kZXNjcmlwdGlvbi1jYXJkIHtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICAgIHBhZGRpbmc6IDEycHg7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgICBib3JkZXItdG9wOiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDAgMCAxMnB4IDEycHg7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0xKTtcbiAgfVxufVxuXG4uZGVzY3JpcHRpb24tc3RlcHMtZWRpdG9yIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxMHB4O1xuXG4gIC5kZXNjcmlwdGlvbi1zdGVwLmVkaXRhYmxlIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICAgIGdhcDogMTBweDtcbiAgfVxuXG4gIC5kZXNjcmlwdGlvbi1zdGVwLWluZGV4IHtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICB3aWR0aDogMjZweDtcbiAgICBoZWlnaHQ6IDI2cHg7XG4gICAgbWFyZ2luLXRvcDogNHB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4xMik7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICBmb250LXNpemU6IDAuNzRyZW07XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBsaW5lLWhlaWdodDogMTtcbiAgfVxuXG4gIC5zdGVwLWlucHV0LXdyYXBwZXIge1xuICAgIGZsZXg6IDE7XG4gICAgbWluLXdpZHRoOiAwO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuXG4gICAgLmRlc2NyaXB0aW9uLXN0ZXAtaW5wdXQge1xuICAgICAgZmxleDogMTtcbiAgICAgIG1pbi13aWR0aDogMDtcbiAgICAgIHJlc2l6ZTogbm9uZTtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMik7XG4gICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgIHBhZGRpbmc6IDEwcHggMzZweCAxMHB4IDEycHg7XG4gICAgICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgICAgIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjE1cyBlYXNlO1xuXG4gICAgICAmOjpwbGFjZWhvbGRlciB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgICAgIH1cblxuICAgICAgJjpmb2N1cyB7XG4gICAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAucmVtb3ZlLXN0ZXAtYnRuLWlubGluZSB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICByaWdodDogNnB4O1xuICAgICAgdG9wOiA2cHg7XG4gICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgcGFkZGluZzogNHB4O1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC4xNXMgZWFzZTtcbiAgICAgIHotaW5kZXg6IDI7XG5cbiAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICAgIGNvbG9yOiB2YXIoLS10Zi1kYW5nZXIpO1xuICAgICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgIH1cblxuICAgICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLWRhbmdlci1yZ2IpLCAwLjE1KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAuYWRkLXN0ZXAtYnRuLWZ1bGwge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBnYXA6IDZweDtcbiAgICBwYWRkaW5nOiAxMHB4IDE2cHg7XG4gICAgYm9yZGVyOiAxcHggZGFzaGVkIHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4zKTtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMDUpO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIGZvbnQtc2l6ZTogMC44NHJlbTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMTVzIGVhc2U7XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICB9XG5cbiAgICAmOmFjdGl2ZSB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMTIpO1xuICAgIH1cblxuICAgICZbZGlzYWJsZWRdIHtcbiAgICAgIG9wYWNpdHk6IDAuNDtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIH1cbiAgfVxuXG4gIC5zdGVwcy1saW1pdC1oaW50IHtcbiAgICBmb250LXNpemU6IDAuNzRyZW07XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBtYXJnaW4tdG9wOiAtNHB4O1xuICB9XG59XG5cbi5idWlsZGVyLW1vZGFsLWZvb3RlciB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0xKTtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbn1cblxuLnN1Ym1pdC1idXR0b24ge1xuICBAaW5jbHVkZSB0Zi1ncmFkaWVudC1idXR0b247XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDUwcHg7XG4gIGZvbnQtc2l6ZTogMC45MnJlbTtcblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjQ7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG59XG4iLCIvLyBGaWxhIGRlIGlucHV0IGNvbiBpY29ubyAod3JhcHBlciArIGljb25vICsgY2FtcG8pIMOiwoDClCByZXBldGlkYSBlbiA0IHDDg8KhZ2luYXNcbi8vIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuIEVsIGZvbmRvXG4vLyBkZWwgd3JhcHBlciBlcyBlbCDDg8K6bmljbyB2YWxvciBxdWUgdmFyw4PCrWEgcG9yIHDDg8KhZ2luYSAoc3VwZXJmaWNpZSAxIG8gMiBzZWfDg8K6blxuLy8gY29udGV4dG8gdmlzdWFsKSwgZGUgYWjDg8KtIGVsIHBhcsODwqFtZXRybzsgdGFtYcODwrFvIGRlIGZ1ZW50ZS9hbHRvL21hcmdlbiBzZVxuLy8gZGVqYW4gZnVlcmEgZGVsIG1peGluIHBvcnF1ZSBjYWRhIHDDg8KhZ2luYSBsb3MgZmlqYSBzZWfDg8K6biBzdSBwcm9waW8gbGF5b3V0LlxuQG1peGluIHRmLWlucHV0LXdyYXBwZXIoJGJnOiB2YXIoLS10Zi1zdXJmYWNlLTEpKSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgYmFja2dyb3VuZDogJGJnO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMCAxNHB4O1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6Zm9jdXMtd2l0aGluIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIH1cbn1cblxuQG1peGluIHRmLWlucHV0LWljb24ge1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG5AbWl4aW4gdGYtaW5wdXQtZmllbGQge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGhlaWdodDogMTAwJTtcblxuICAmOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG59XG4iLCIvLyBCb3TDg8KzbiBDVEEgY29uIGdyYWRpZW50ZSBkZSBhY2VudG8gw6LCgMKUIG1pc21vIGJsb3F1ZSByZXBldGlkbyBlbiB+MTEgc2l0aW9zIGRlXG4vLyB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgcG9yIGxheW91dCAod2lkdGgsIGhlaWdodCwgZm9udC1zaXplLCBtYXJnaW4pLlxuLy9cbi8vIExhIG1pdGFkIGRlIGxvcyBzaXRpb3Mgb3JpZ2luYWxlcyBubyB0ZW7Dg8KtYW4gdHJhbnNpY2nDg8Kzbi9mZWVkYmFjayBkZSBwdWxzYWNpw4PCs25cbi8vIG5pIDpmb2N1cy12aXNpYmxlIMOiwoDClCBlbCBtaXhpbiBsb3MgYcODwrFhZGUgc2llbXByZSwgY2llcnJhIGVzZSBodWVjbyBkZVxuLy8gY29uc2lzdGVuY2lhIGRlIGludGVyYWNjacODwrNuIChQUk9EVUNULm1kOiBcInVuIHNvbG8gcGF0csODwrNuIHBvciB0aXBvIGRlXG4vLyBjb21wb25lbnRlXCIpIGVuIHZleiBkZSBwZXJwZXR1YXIgbGEgdmFyaWFjacODwrNuIGFjY2lkZW50YWwuXG5AbWl4aW4gdGYtZ3JhZGllbnQtYnV0dG9uKCRyYWRpdXM6IDEycHgpIHtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAkcmFkaXVzO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtZ3JhZGllbnQpO1xuICBjb2xvcjogdmFyKC0tdGYtYWNjZW50LWNvbnRyYXN0KTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpLCBvcGFjaXR5IDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk3KTtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNDU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtdGV4dCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxufVxuXG4vLyBCb3TDg8KzbiBkZSBoZWFkZXIgcXVlIGVzIHNvbG8gdW4gaWNvbm8gw6LCgMKUIG1pc21vIGxvb2sgXCJlbnZ1ZWx0b1wiIHF1ZSB5YSB1c2EgbGFcbi8vIGFwcCBkZSBjb25zdW1pZG9yIGVuIHN1cyB0b29sYmFycyAocGFja2FnZXMvc2hhcmVkLWZlYXR1cmVzLy4uLi9kaWV0cy9cbi8vIGNvbXBvbmVudHMvdG9vbGJhci1jYWxlbmRhcjogZm9uZG8gKyBib3JkZXItcmFkaXVzICsgY2FqYSBmaWphIDQ0eDQ0LCBlblxuLy8gdmV6IGRlbCBpb24tYnV0dG9uIHBsYW5vL3RyYW5zcGFyZW50ZSBxdWUgdGVuw4PCrWEgY2FkYSBwYW50YWxsYSBkZSB0cmFpbmVyc1xuLy8gaGFzdGEgYWhvcmEpLiBUb2tlbmVhZG8gYSBsYSBwYWxldGEgZGUgZXN0YSBhcHAgZW4gdmV6IGRlIHJlcGV0aXIgbG9zXG4vLyByZ2JhKDI1NSwyNTUsMjU1LC4uLikgc3VlbHRvcyBkZWwgb3JpZ2luYWwuXG4vL1xuLy8gU2lydmUgdGFudG8gcGFyYSA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIj4gKHVzYSBsYXMgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzXG4vLyBkZSBJb25pYykgY29tbyBwYXJhIHVuIDxidXR0b24+IG5hdGl2byAodXNhIGxhcyBwcm9waWVkYWRlcyBwbGFuYXMpIMOiwoDClFxuLy8gYW1ib3MgY29leGlzdGVuIGhveSBlbiB0cmFpbmVycyBwYXJhIGVsIG1pc21vIHJvbCBkZSBcInZvbHZlclwiL1wiY2VycmFyXCIuXG5AbWl4aW4gdGYtaWNvbi1idXR0b24oJHNpemU6IDQ0cHgsICRyYWRpdXM6IDEycHgsICRpY29uLXNpemU6IDIwcHgpIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICAtLWJhY2tncm91bmQtYWN0aXZhdGVkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtaG92ZXI6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIC0tYmFja2dyb3VuZC1mb2N1c2VkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIC0tYm9yZGVyLXJhZGl1czogI3skcmFkaXVzfTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAtLXBhZGRpbmctZW5kOiAwO1xuICAtLXBhZGRpbmctdG9wOiAwO1xuICAtLXBhZGRpbmctYm90dG9tOiAwO1xuXG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgd2lkdGg6ICRzaXplO1xuICBoZWlnaHQ6ICRzaXplO1xuICBtaW4td2lkdGg6ICRzaXplO1xuICBtaW4taGVpZ2h0OiAkc2l6ZTtcbiAgbWFyZ2luOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICBjb2xvciB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAkaWNvbi1zaXplO1xuICB9XG59XG5cbi8vIEV4cGFuc29yIGludmlzaWJsZSBkZSB6b25hIHB1bHNhYmxlLlxuLy9cbi8vIFBBUkEgUVXDg8KJOiB1biBjb250cm9sIGNvbXBhY3RvICh1biBpY29ubyBkZSAzMiBweCBlbiB1bmEgZmlsYSBkZSB0YWJsYSwgdW5cbi8vIGVubGFjZSBkZSB0ZXh0byBkZSAxNiBweCkgbm8gbGxlZ2EgYSBsb3MgNDQgcHggcXVlIGV4aWdlIFBST0RVQ1QubWQsIHlcbi8vIGVuZ29yZGFybG8gZGUgdmVyZGFkIGRlc3BsYXphIHRvZG8gbG8gcXVlIHRpZW5lIGFscmVkZWRvciDDosKAwpQgZW4gdW5hIHRhYmxhXG4vLyBkZSB2ZWludGUgZmlsYXMsIDggcHggcG9yIGZpbGEgc29uIG1lZGlhIHBhbnRhbGxhLlxuLy9cbi8vIEVsIHBzZXVkb2VsZW1lbnRvIGNyZWNlIGhhY2lhIGZ1ZXJhIHNpbiBvY3VwYXIgc2l0aW8gZW4gZWwgZmx1am8sIGFzw4PCrSBxdWVcbi8vIGVsIGJvdMODwrNuIHNlIHZlIHBlcXVlw4PCsW8geSBzZSBwdWxzYSBncmFuZGUuXG4vL1xuLy8gQVZJU08gREUgTUVESUNJw4PCk046IGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIE5PIHZlIGVzdGUgcHNldWRvZWxlbWVudG8sIGFzw4PCrVxuLy8gcXVlIGFsIHZlcmlmaWNhciBoYXkgcXVlIHVzYXIgZWxlbWVudEZyb21Qb2ludCBjb24gZWwgZWxlbWVudG8gZGVudHJvIGRlbFxuLy8gdmlld3BvcnQuIEFkZW3Dg8KhcyBlbCBoaXQtdGVzdCBkZXZ1ZWx2ZSAyIHB4IG1lbm9zIHF1ZSBsYSBjYWphIGRlY2xhcmFkYVxuLy8gKGNvbXByb2JhZG86IC00cHggZGEgNDIsIC02cHggZGEgNDYpLCBhc8ODwq0gcXVlIHVuIDQyIG1lZGlkbyBzb24gNDQgcmVhbGVzLlxuLy9cbi8vICRncm93OiBjdcODwqFudG8gY3JlY2UgcG9yIGNhZGEgbGFkby4gNHB4IGxsZXZhIHVuIGNvbnRyb2wgZGUgMzYgcHggYSA0NC5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlcigkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldDogLSN7JGdyb3d9O1xuICB9XG59XG5cbi8vIFZhcmlhbnRlIHF1ZSBzb2xvIGNyZWNlIGVuIFZFUlRJQ0FMLiBQYXJhIGNvbnRyb2xlcyBlbiBmaWxhIGRvbmRlIGVsXG4vLyBleHBhbnNvciBob3Jpem9udGFsIHNlIHNvbGFwYXLDg8KtYSBjb24gZWwgZGUgYWwgbGFkbyB5IHJvYmFyw4PCrWEgc3VzIHRvcXVlcy5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlci15KCRncm93OiA0cHgpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogLSN7JGdyb3d9O1xuICAgIGJvdHRvbTogLSN7JGdyb3d9O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
}));


/***/ }),

/***/ 53152:
/*!***************************************************************************************!*\
  !*** ./src/app/shared/components/recipe-builder-modal/recipe-builder-modal.module.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RecipeBuilderModalModule: () => (/* binding */ RecipeBuilderModalModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _recipe_builder_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./recipe-builder-modal.component */ 41853);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);

var _RecipeBuilderModalModule;



class RecipeBuilderModalModule {}
_RecipeBuilderModalModule = RecipeBuilderModalModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipeBuilderModalModule, "\u0275fac", function RecipeBuilderModalModule_Factory(t) {
  return new (t || _RecipeBuilderModalModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipeBuilderModalModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _RecipeBuilderModalModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipeBuilderModalModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](RecipeBuilderModalModule, {
    declarations: [_recipe_builder_modal_component__WEBPACK_IMPORTED_MODULE_2__.RecipeBuilderModalComponent],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule],
    exports: [_recipe_builder_modal_component__WEBPACK_IMPORTED_MODULE_2__.RecipeBuilderModalComponent]
  });
})();

/***/ }),

/***/ 47075:
/*!****************************************************************************************************************!*\
  !*** ./src/app/shared/components/recipe-ingredients-editor-modal/recipe-ingredients-editor-modal.component.ts ***!
  \****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RecipeIngredientsEditorModalComponent: () => (/* binding */ RecipeIngredientsEditorModalComponent)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var src_app_core_services_custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/custom-product/custom-product.service */ 57846);
/* harmony import */ var src_app_core_services_recipe_recipe_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/recipe/recipe.service */ 50888);
/* harmony import */ var src_app_features_diets_components_meal_components_search_foods_components_create_product_create_product_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/features/diets/components/meal/components/search-foods/components/create-product/create-product.page */ 75627);
/* harmony import */ var src_app_features_diets_components_meal_components_search_foods_search_foods_page__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/features/diets/components/meal/components/search-foods/search-foods.page */ 65693);
/* harmony import */ var _product_detail_panel_product_detail_panel_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../product-detail-panel/product-detail-panel.component */ 85965);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 84725);


var _RecipeIngredientsEditorModalComponent;











function RecipeIngredientsEditorModalComponent_ng_container_13_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "base");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function RecipeIngredientsEditorModalComponent_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 16)(2, "div", 17)(3, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function RecipeIngredientsEditorModalComponent_ng_container_13_Template_button_click_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5);
      const i_r2 = restoredCtx.index;
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r4.previewIngredient(i_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "ion-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](6, RecipeIngredientsEditorModalComponent_ng_container_13_span_6_Template, 2, 0, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function RecipeIngredientsEditorModalComponent_ng_container_13_Template_button_click_7_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5);
      const i_r2 = restoredCtx.index;
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r6.removeIngredient(i_r2));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](8, "ion-icon", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "div", 23)(10, "ion-label", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](11, "Cantidad");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "div", 25)(13, "input", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function RecipeIngredientsEditorModalComponent_ng_container_13_Template_input_ngModelChange_13_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r5);
      const ingredient_r1 = restoredCtx.$implicit;
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r7.onQuantityChange(ingredient_r1, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](15, "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](16, "div", 28)(17, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](18, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](19, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](21, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](22, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](23, "div", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](24, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](25);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](26, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](27, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](28, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](29, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](30);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](31, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](32, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](33, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](34, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](35);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](36, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ingredient_r1 = ctx.$implicit;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ingredient_r1.product.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r0.isBaseIngredient(ingredient_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ingredient_r1.quantity);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind2"](21, 7, ctx_r0.ingredientMacros(ingredient_r1).kcal, "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind2"](26, 10, ctx_r0.ingredientMacros(ingredient_r1).protein, "1.0-1"), "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind2"](31, 13, ctx_r0.ingredientMacros(ingredient_r1).carbs, "1.0-1"), "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind2"](36, 16, ctx_r0.ingredientMacros(ingredient_r1).fat, "1.0-1"), "g");
  }
}
// Personalizar los ingredientes de una receta YA ELEGIDA en una comida
// (añadir/quitar/cambiar cantidad), sin tocar la receta base — mismo caso
// que ConfigRecipePage en modo "add" del cliente, reutilizando su MISMA
// lógica de diff (RecipeService.mergeRecipeIngredients/
// areCustomProductsEquivalent/buildModifiedBaseCustomProduct/
// serializeCustomProductForPersistence — la fórmula, no la pantalla, ver
// comentario en RecipeBuilderModalComponent para el porqué).
class RecipeIngredientsEditorModalComponent {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recipe", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "addedCustomProducts", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modifiedBaseCustomProducts", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "removedBaseCustomProductIds", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalController", (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.inject)(_ionic_angular__WEBPACK_IMPORTED_MODULE_8__.ModalController));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "customProductService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.inject)(src_app_core_services_custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_2__.CustomProductService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recipeService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.inject)(src_app_core_services_recipe_recipe_service__WEBPACK_IMPORTED_MODULE_3__.RecipeService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ingredients", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isOpeningPicker", false);
    // --- Panel de detalle (ProductDetailPanelComponent) ---
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "pickerModal", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "detailModal", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "selectionApi", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "suppressNextPickerCleanup", false);
  }
  ngOnInit() {
    this.ingredients = this.recipeService.mergeRecipeIngredients(this.recipe, {
      recipe: this.recipe,
      addedCustomProducts: this.addedCustomProducts,
      modifiedBaseCustomProducts: this.modifiedBaseCustomProducts,
      removedBaseCustomProductIds: this.removedBaseCustomProductIds
    });
  }
  get canSave() {
    return this.ingredients.length >= 1;
  }
  ingredientMacros(ingredient) {
    return this.customProductService.getMacros(ingredient);
  }
  isBaseIngredient(ingredient) {
    return !!ingredient._id && !!this.findBaseIngredient(ingredient._id);
  }
  findBaseIngredient(id) {
    return (this.recipe.customProducts || []).find(base => base._id === id);
  }
  onQuantityChange(ingredient, value) {
    const parsed = parseFloat(value);
    ingredient.quantity = Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
  }
  removeIngredient(index) {
    this.ingredients.splice(index, 1);
  }
  openIngredientPicker() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this.isOpeningPicker) return;
      _this.isOpeningPicker = true;
      try {
        const outerModal = yield _this.modalController.create({
          component: src_app_features_diets_components_meal_components_search_foods_search_foods_page__WEBPACK_IMPORTED_MODULE_5__.SearchFoodsPage,
          componentProps: {
            trainerContext: _this.buildTrainerContext(() => void outerModal.dismiss())
          },
          // A la izquierda de este panel (sigue visible detrás), sin backdrop
          // propio, MISMO ancho — mismo criterio que RecipeBuilderModalComponent.
          // ion-disable-focus-trap: ver comentario largo en
          // RecipeBuilderModalComponent#openIngredientPicker — sin esto, el
          // focus trap global de Ionic no dejaba escribir en los ingredientes
          // de la receta mientras este buscador seguía abierto.
          cssClass: 'tf-panel-modal-left ion-disable-focus-trap',
          showBackdrop: false,
          backdropDismiss: false
        });
        _this.pickerModal = outerModal;
        yield outerModal.present();
        yield outerModal.onDidDismiss();
        _this.pickerModal = null;
        if (_this.suppressNextPickerCleanup) {
          _this.suppressNextPickerCleanup = false;
        } else {
          yield _this.closeDetailPanel();
        }
      } finally {
        _this.isOpeningPicker = false;
      }
    })();
  }
  buildTrainerContext(closeOuter) {
    return {
      clientUser: {},
      dietDay: {},
      meal: {},
      // Un ingrediente de receta solo puede ser un producto real — igual
      // que RecipeBuilderModalComponent, las recetas marcadas se descartan.
      targetLabel: this.recipe.name || 'la receta',
      confirmSelection: items => this.addIngredients(items),
      closeSelf: closeOuter,
      registerSelectionApi: api => this.selectionApi = api,
      pickCreateProduct: () => void this.createIngredientProduct(closeOuter),
      onFocusItem: item => void this.showDetailPanel(item, null)
    };
  }
  // No espera a que el panel anterior se cierre antes de abrir el nuevo
  // (ver comentario largo en RecipeBuilderModalComponent#showDetailPanel).
  showDetailPanel(item, ingredientIndex) {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const previous = _this2.detailModal;
      const modal = yield _this2.modalController.create({
        component: _product_detail_panel_product_detail_panel_component__WEBPACK_IMPORTED_MODULE_6__.ProductDetailPanelComponent,
        componentProps: {
          product: item.product,
          quantity: item.quantity,
          onQuantityChange: ingredientIndex !== null ? value => {
            const ingredient = _this2.ingredients[ingredientIndex];
            if (ingredient) ingredient.quantity = value ?? 0;
          } : undefined,
          // Marca el producto en la cesta del buscador (como el checkbox) y
          // solo cierra el propio panel de detalle — igual que en
          // RecipeBuilderModalComponent#showDetailPanel.
          onAdd: ingredientIndex === null && item.kind === 'product' && item.product ? quantity => _this2.selectionApi?.setSelected(item, quantity) : undefined,
          addLabel: `Añadir a ${_this2.recipe.name || 'la receta'}`
        },
        cssClass: (_this2.pickerModal ? 'tf-panel-modal-detail-2' : 'tf-panel-modal-detail-1') + ' ion-disable-focus-trap',
        showBackdrop: false,
        backdropDismiss: false
      });
      _this2.detailModal = modal;
      if (previous) yield previous.dismiss();
      yield modal.present();
      void modal.onDidDismiss().then(() => {
        if (_this2.detailModal === modal) _this2.detailModal = null;
      });
    })();
  }
  closeDetailPanel() {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this3.detailModal) {
        yield _this3.detailModal.dismiss();
        _this3.detailModal = null;
      }
    })();
  }
  previewIngredient(index) {
    var _this4 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const ingredient = _this4.ingredients[index];
      if (!ingredient) return;
      if (_this4.pickerModal) {
        _this4.suppressNextPickerCleanup = true;
        yield _this4.pickerModal.dismiss();
        // Ver comentario en RecipeBuilderModalComponent#previewIngredient —
        // sin esto, showDetailPanel podía elegir el offset de 3 paneles con
        // el buscador ya cerrado.
        _this4.pickerModal = null;
      }
      yield _this4.showDetailPanel({
        kind: 'product',
        product: ingredient.product,
        quantity: ingredient.quantity
      }, index);
    })();
  }
  addIngredients(items) {
    for (const item of items) {
      if (item.kind !== 'product' || !item.product) continue;
      this.ingredients.push({
        product: item.product,
        quantity: item.quantity ?? 100
      });
    }
  }
  createIngredientProduct(closeOuter) {
    var _this5 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modal = yield _this5.modalController.create({
        component: src_app_features_diets_components_meal_components_search_foods_components_create_product_create_product_page__WEBPACK_IMPORTED_MODULE_4__.CreateProductPage,
        componentProps: {
          modalMode: true
        },
        cssClass: 'tf-panel-modal'
      });
      yield modal.present();
      const {
        data,
        role
      } = yield modal.onDidDismiss();
      if (role === 'confirm' && data?.product) {
        _this5.ingredients.push({
          product: data.product,
          quantity: 100
        });
      }
      closeOuter();
    })();
  }
  dismiss() {
    void this.modalController.dismiss(null, 'cancel');
  }
  // Compara el estado actual contra la receta base: lo que ya no está =
  // quitado, lo que cambió = modificado, lo que nunca estuvo = añadido.
  // Mismo cálculo que ConfigRecipePage#save (addRecipeToMeal), reutilizando
  // los métodos de RecipeService en vez de reescribir el diff.
  save() {
    const removedBaseCustomProductIds = this.recipeService.getRemovedBaseIngredients(this.recipe, this.ingredients).map(ingredient => ingredient._id).filter(Boolean);
    const modifiedBaseCustomProducts = [];
    const addedCustomProducts = [];
    for (const ingredient of this.ingredients) {
      const base = ingredient._id ? this.findBaseIngredient(ingredient._id) : undefined;
      if (base) {
        if (!this.recipeService.areCustomProductsEquivalent(base, ingredient)) {
          modifiedBaseCustomProducts.push(this.recipeService.buildModifiedBaseCustomProduct(base, ingredient));
        }
      } else {
        addedCustomProducts.push(ingredient);
      }
    }
    const result = {
      addedCustomProducts,
      modifiedBaseCustomProducts,
      removedBaseCustomProductIds
    };
    void this.modalController.dismiss(result, 'confirm');
  }
}
_RecipeIngredientsEditorModalComponent = RecipeIngredientsEditorModalComponent;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RecipeIngredientsEditorModalComponent, "\u0275fac", function RecipeIngredientsEditorModalComponent_Factory(t) {
  return new (t || _RecipeIngredientsEditorModalComponent)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RecipeIngredientsEditorModalComponent, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: _RecipeIngredientsEditorModalComponent,
  selectors: [["app-recipe-ingredients-editor-modal"]],
  inputs: {
    recipe: "recipe",
    addedCustomProducts: "addedCustomProducts",
    modifiedBaseCustomProducts: "modifiedBaseCustomProducts",
    removedBaseCustomProductIds: "removedBaseCustomProductIds"
  },
  decls: 20,
  vars: 4,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["type", "button", "aria-label", "Cerrar", 1, "tf-page-header__back-button", 3, "click"], ["name", "close-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "editor-modal-content"], [1, "panel-hint"], [4, "ngFor", "ngForOf"], ["type", "button", 1, "add-ingredient-btn", 3, "disabled", "click"], ["name", "add-outline"], [1, "editor-modal-footer"], ["type", "button", 1, "submit-button", 3, "disabled", "click"], [1, "picked-food-card"], [1, "picked-food-header"], ["type", "button", "aria-label", "Ver detalle del ingrediente", "title", "Ver detalle", 1, "picked-food-name", "picked-food-name-btn", 3, "click"], ["name", "nutrition-outline"], ["class", "base-badge", 4, "ngIf"], ["type", "button", "aria-label", "Quitar ingrediente", 1, "remove-btn", 3, "click"], ["name", "trash-outline"], [1, "picked-food-qty-row"], [1, "qty-label"], [1, "qty-input-wrapper"], ["type", "number", "min", "1", 1, "qty-input", 3, "ngModel", "ngModelChange"], [1, "qty-unit"], [1, "picked-food-macros"], [1, "macro-item"], [1, "macro-dot", "kcal"], [1, "macro-value"], [1, "macro-dot", "protein"], [1, "macro-dot", "carbs"], [1, "macro-dot", "fat"], [1, "base-badge"]],
  template: function RecipeIngredientsEditorModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function RecipeIngredientsEditorModalComponent_Template_button_click_4_listener() {
        return ctx.dismiss();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](5, "ion-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "div", 6)(7, "h1", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](9, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "ion-content", 9)(11, "p", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](12, " Ajusta esta receta solo para esta comida \u2014 no cambia la receta original de tu biblioteca. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](13, RecipeIngredientsEditorModalComponent_ng_container_13_Template, 37, 19, "ng-container", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](14, "button", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function RecipeIngredientsEditorModalComponent_Template_button_click_14_listener() {
        return ctx.openIngredientPicker();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](15, "ion-icon", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](16, " A\u00F1adir ingrediente ");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](17, "ion-footer", 14)(18, "button", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function RecipeIngredientsEditorModalComponent_Template_button_click_18_listener() {
        return ctx.save();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](19, " Guardar cambios ");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("Ingredientes de ", ctx.recipe.name, "");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx.ingredients);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", ctx.isOpeningPicker);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", !ctx.canSave);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonLabel, _angular_common__WEBPACK_IMPORTED_MODULE_9__.DecimalPipe],
  styles: [".editor-modal-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n}\n\n.panel-hint[_ngcontent-%COMP%] {\n  font-size: 0.82rem;\n  color: var(--tf-text-muted);\n  margin: 0 0 16px;\n}\n\n.picked-food-card[_ngcontent-%COMP%] {\n  background-color: #141414;\n  border: 1px solid #252525;\n  border-radius: 12px;\n  margin-bottom: 10px;\n  padding: 12px 14px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n\n.picked-food-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.picked-food-name[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-weight: 600;\n  font-size: 0.95rem;\n  color: #fff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.picked-food-name[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 1rem;\n  color: var(--tf-accent);\n}\n\n.picked-food-name-btn[_ngcontent-%COMP%] {\n  background: transparent;\n  border: none;\n  padding: 0;\n  text-align: left;\n  cursor: pointer;\n}\n.picked-food-name-btn[_ngcontent-%COMP%]:hover {\n  color: var(--tf-accent);\n}\n.picked-food-name-btn[_ngcontent-%COMP%]:hover   ion-icon[_ngcontent-%COMP%] {\n  color: var(--tf-accent);\n}\n\n.base-badge[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 0.66rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.02em;\n  color: var(--tf-text-muted);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 6px;\n  padding: 1px 6px;\n}\n\n.remove-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  color: var(--tf-text-muted);\n  cursor: pointer;\n  flex-shrink: 0;\n  width: 30px;\n  height: 30px;\n}\n.remove-btn[_ngcontent-%COMP%]:hover {\n  color: var(--tf-danger);\n}\n\n.picked-food-qty-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 10px;\n  margin-top: 8px;\n}\n\n.qty-label[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: var(--tf-text-muted);\n}\n\n.qty-input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-radius: 8px;\n  padding: 4px 10px;\n}\n\n.qty-input[_ngcontent-%COMP%] {\n  width: 56px;\n  background: transparent;\n  border: none;\n  color: var(--tf-text);\n  font-size: 0.85rem;\n  text-align: right;\n  -moz-appearance: textfield;\n}\n.qty-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n}\n.qty-input[_ngcontent-%COMP%]::-webkit-outer-spin-button, .qty-input[_ngcontent-%COMP%]::-webkit-inner-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n\n.qty-unit[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--tf-text-muted);\n}\n\n.picked-food-macros[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  margin-top: 10px;\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex: 1;\n  justify-content: center;\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot.kcal[_ngcontent-%COMP%] {\n  background: var(--ion-color-primary);\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot.protein[_ngcontent-%COMP%] {\n  background: var(--ion-color-alternative);\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot.carbs[_ngcontent-%COMP%] {\n  background: var(--ion-color-success);\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot.fat[_ngcontent-%COMP%] {\n  background: var(--ion-color-secondary);\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-value[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  color: rgba(255, 255, 255, 0.85);\n  white-space: nowrap;\n}\n\n.add-ingredient-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 44px;\n  margin-top: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  background: transparent;\n  border: 1px dashed var(--tf-border-strong);\n  border-radius: 10px;\n  color: var(--tf-text-muted);\n  font-size: 0.84rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.add-ingredient-btn[_ngcontent-%COMP%]:not(:disabled):hover {\n  border-color: var(--tf-accent);\n  color: var(--tf-accent);\n}\n.add-ingredient-btn[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n\n.editor-modal-footer[_ngcontent-%COMP%] {\n  --background: var(--tf-surface-1);\n  padding: 12px 16px;\n  border-top: 1px solid var(--tf-border);\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  width: 100%;\n  height: 50px;\n  font-size: 0.92rem;\n}\n.submit-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvcmVjaXBlLWluZ3JlZGllbnRzLWVkaXRvci1tb2RhbC9yZWNpcGUtaW5ncmVkaWVudHMtZWRpdG9yLW1vZGFsLmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19idXR0b25zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7RUFDRSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0FBRkY7O0FBS0E7RUFDRSxrQkFBQTtFQUNBLDJCQUFBO0VBQ0EsZ0JBQUE7QUFGRjs7QUFLQTtFQUNFLHlCQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSx3Q0FBQTtBQUZGOztBQUtBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtBQUZGOztBQUtBO0VBQ0UsT0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFGRjtBQUlFO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSx1QkFBQTtBQUZKOztBQU1BO0VBQ0UsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQUhGO0FBS0U7RUFDRSx1QkFBQTtBQUhKO0FBS0k7RUFDRSx1QkFBQTtBQUhOOztBQVFBO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7RUFDQSx5Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFMRjs7QUFRQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBTEY7QUFPRTtFQUNFLHVCQUFBO0FBTEo7O0FBU0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLFNBQUE7RUFDQSxlQUFBO0FBTkY7O0FBU0E7RUFDRSxrQkFBQTtFQUNBLDJCQUFBO0FBTkY7O0FBU0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsK0JBQUE7RUFDQSxrQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFORjs7QUFTQTtFQUNFLFdBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFXQSwwQkFBQTtBQWhCRjtBQU9FO0VBQ0UsYUFBQTtBQUxKO0FBUUU7RUFFRSx3QkFBQTtFQUNBLFNBQUE7QUFQSjs7QUFZQTtFQUNFLGlCQUFBO0VBQ0EsMkJBQUE7QUFURjs7QUFZQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLFFBQUE7RUFDQSxnQkFBQTtBQVRGO0FBV0U7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsT0FBQTtFQUNBLHVCQUFBO0FBVEo7QUFZRTtFQUNFLFVBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FBVko7QUFZSTtFQUNFLG9DQUFBO0FBVk47QUFhSTtFQUNFLHdDQUFBO0FBWE47QUFjSTtFQUNFLG9DQUFBO0FBWk47QUFlSTtFQUNFLHNDQUFBO0FBYk47QUFpQkU7RUFDRSxrQkFBQTtFQUNBLGdDQUFBO0VBQ0EsbUJBQUE7QUFmSjs7QUFtQkE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFFBQUE7RUFDQSx1QkFBQTtFQUNBLDBDQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBaEJGO0FBa0JFO0VBQ0UsOEJBQUE7RUFDQSx1QkFBQTtBQWhCSjtBQW1CRTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBakJKOztBQXFCQTtFQUNFLGlDQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQ0FBQTtBQWxCRjs7QUFxQkE7RUNwTkUsWUFBQTtFQUNBLG1CQUZpQztFQUdqQyxxQ0FBQTtFQUNBLGdDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0ZBQUE7RURnTkEsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtBQVpGO0FDcE1FO0VBQ0Usc0JBQUE7QURzTUo7QUNuTUU7RUFDRSxhQUFBO0VBQ0EsZUFBQTtBRHFNSjtBQ2xNRTtFQUNFLGlDQUFBO0VBQ0EsbUJBQUE7QURvTUo7QUFHRTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBREoiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi8uLi8uLi8uLi90aGVtZS9idXR0b25zJztcbkBpbXBvcnQgJy4uLy4uLy4uLy4uL3RoZW1lL2lucHV0cyc7XG5cbi5lZGl0b3ItbW9kYWwtY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtYmcpO1xuICAtLXBhZGRpbmctc3RhcnQ6IDE2cHg7XG4gIC0tcGFkZGluZy1lbmQ6IDE2cHg7XG4gIC0tcGFkZGluZy10b3A6IDE2cHg7XG4gIC0tcGFkZGluZy1ib3R0b206IDE2cHg7XG59XG5cbi5wYW5lbC1oaW50IHtcbiAgZm9udC1zaXplOiAwLjgycmVtO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIG1hcmdpbjogMCAwIDE2cHg7XG59XG5cbi5waWNrZWQtZm9vZC1jYXJkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE0MTQxNDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzI1MjUyNTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgcGFkZGluZzogMTJweCAxNHB4O1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG4ucGlja2VkLWZvb2QtaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG59XG5cbi5waWNrZWQtZm9vZC1uYW1lIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDZweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAwLjk1cmVtO1xuICBjb2xvcjogI2ZmZjtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG5cbiAgaW9uLWljb24ge1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICBjb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgfVxufVxuXG4ucGlja2VkLWZvb2QtbmFtZS1idG4ge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgJjpob3ZlciB7XG4gICAgY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBjb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgICB9XG4gIH1cbn1cblxuLmJhc2UtYmFkZ2Uge1xuICBmbGV4LXNocmluazogMDtcbiAgZm9udC1zaXplOiAwLjY2cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogMC4wMmVtO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHBhZGRpbmc6IDFweCA2cHg7XG59XG5cbi5yZW1vdmUtYnRuIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmbGV4LXNocmluazogMDtcbiAgd2lkdGg6IDMwcHg7XG4gIGhlaWdodDogMzBweDtcblxuICAmOmhvdmVyIHtcbiAgICBjb2xvcjogdmFyKC0tdGYtZGFuZ2VyKTtcbiAgfVxufVxuXG4ucGlja2VkLWZvb2QtcXR5LXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiAxMHB4O1xuICBtYXJnaW4tdG9wOiA4cHg7XG59XG5cbi5xdHktbGFiZWwge1xuICBmb250LXNpemU6IDAuNzhyZW07XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbn1cblxuLnF0eS1pbnB1dC13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA0cHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMik7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgcGFkZGluZzogNHB4IDEwcHg7XG59XG5cbi5xdHktaW5wdXQge1xuICB3aWR0aDogNTZweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuXG4gICY6Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gIH1cblxuICAmOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uLFxuICAmOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uIHtcbiAgICAtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmU7XG4gICAgbWFyZ2luOiAwO1xuICB9XG4gIC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xufVxuXG4ucXR5LXVuaXQge1xuICBmb250LXNpemU6IDAuOHJlbTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xufVxuXG4ucGlja2VkLWZvb2QtbWFjcm9zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDhweDtcbiAgbWFyZ2luLXRvcDogMTBweDtcblxuICAubWFjcm8taXRlbSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogNnB4O1xuICAgIGZsZXg6IDE7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIH1cblxuICAubWFjcm8tZG90IHtcbiAgICB3aWR0aDogOHB4O1xuICAgIGhlaWdodDogOHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBmbGV4LXNocmluazogMDtcblxuICAgICYua2NhbCB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgfVxuXG4gICAgJi5wcm90ZWluIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1hbHRlcm5hdGl2ZSk7XG4gICAgfVxuXG4gICAgJi5jYXJicyB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgfVxuXG4gICAgJi5mYXQge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG4gICAgfVxuICB9XG5cbiAgLm1hY3JvLXZhbHVlIHtcbiAgICBmb250LXNpemU6IDAuNzhyZW07XG4gICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSk7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgfVxufVxuXG4uYWRkLWluZ3JlZGllbnQtYnRuIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNDRweDtcbiAgbWFyZ2luLXRvcDogNHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IDFweCBkYXNoZWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgZm9udC1zaXplOiAwLjg0cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgJjpub3QoOmRpc2FibGVkKTpob3ZlciB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICB9XG5cbiAgJjpkaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogMC40O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgfVxufVxuXG4uZWRpdG9yLW1vZGFsLWZvb3RlciB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0xKTtcbiAgcGFkZGluZzogMTJweCAxNnB4O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbn1cblxuLnN1Ym1pdC1idXR0b24ge1xuICBAaW5jbHVkZSB0Zi1ncmFkaWVudC1idXR0b247XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDUwcHg7XG4gIGZvbnQtc2l6ZTogMC45MnJlbTtcblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjQ7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG59XG4iLCIvLyBCb3TDg8KzbiBDVEEgY29uIGdyYWRpZW50ZSBkZSBhY2VudG8gw6LCgMKUIG1pc21vIGJsb3F1ZSByZXBldGlkbyBlbiB+MTEgc2l0aW9zIGRlXG4vLyB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgcG9yIGxheW91dCAod2lkdGgsIGhlaWdodCwgZm9udC1zaXplLCBtYXJnaW4pLlxuLy9cbi8vIExhIG1pdGFkIGRlIGxvcyBzaXRpb3Mgb3JpZ2luYWxlcyBubyB0ZW7Dg8KtYW4gdHJhbnNpY2nDg8Kzbi9mZWVkYmFjayBkZSBwdWxzYWNpw4PCs25cbi8vIG5pIDpmb2N1cy12aXNpYmxlIMOiwoDClCBlbCBtaXhpbiBsb3MgYcODwrFhZGUgc2llbXByZSwgY2llcnJhIGVzZSBodWVjbyBkZVxuLy8gY29uc2lzdGVuY2lhIGRlIGludGVyYWNjacODwrNuIChQUk9EVUNULm1kOiBcInVuIHNvbG8gcGF0csODwrNuIHBvciB0aXBvIGRlXG4vLyBjb21wb25lbnRlXCIpIGVuIHZleiBkZSBwZXJwZXR1YXIgbGEgdmFyaWFjacODwrNuIGFjY2lkZW50YWwuXG5AbWl4aW4gdGYtZ3JhZGllbnQtYnV0dG9uKCRyYWRpdXM6IDEycHgpIHtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAkcmFkaXVzO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtZ3JhZGllbnQpO1xuICBjb2xvcjogdmFyKC0tdGYtYWNjZW50LWNvbnRyYXN0KTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpLCBvcGFjaXR5IDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk3KTtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNDU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtdGV4dCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxufVxuXG4vLyBCb3TDg8KzbiBkZSBoZWFkZXIgcXVlIGVzIHNvbG8gdW4gaWNvbm8gw6LCgMKUIG1pc21vIGxvb2sgXCJlbnZ1ZWx0b1wiIHF1ZSB5YSB1c2EgbGFcbi8vIGFwcCBkZSBjb25zdW1pZG9yIGVuIHN1cyB0b29sYmFycyAocGFja2FnZXMvc2hhcmVkLWZlYXR1cmVzLy4uLi9kaWV0cy9cbi8vIGNvbXBvbmVudHMvdG9vbGJhci1jYWxlbmRhcjogZm9uZG8gKyBib3JkZXItcmFkaXVzICsgY2FqYSBmaWphIDQ0eDQ0LCBlblxuLy8gdmV6IGRlbCBpb24tYnV0dG9uIHBsYW5vL3RyYW5zcGFyZW50ZSBxdWUgdGVuw4PCrWEgY2FkYSBwYW50YWxsYSBkZSB0cmFpbmVyc1xuLy8gaGFzdGEgYWhvcmEpLiBUb2tlbmVhZG8gYSBsYSBwYWxldGEgZGUgZXN0YSBhcHAgZW4gdmV6IGRlIHJlcGV0aXIgbG9zXG4vLyByZ2JhKDI1NSwyNTUsMjU1LC4uLikgc3VlbHRvcyBkZWwgb3JpZ2luYWwuXG4vL1xuLy8gU2lydmUgdGFudG8gcGFyYSA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIj4gKHVzYSBsYXMgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzXG4vLyBkZSBJb25pYykgY29tbyBwYXJhIHVuIDxidXR0b24+IG5hdGl2byAodXNhIGxhcyBwcm9waWVkYWRlcyBwbGFuYXMpIMOiwoDClFxuLy8gYW1ib3MgY29leGlzdGVuIGhveSBlbiB0cmFpbmVycyBwYXJhIGVsIG1pc21vIHJvbCBkZSBcInZvbHZlclwiL1wiY2VycmFyXCIuXG5AbWl4aW4gdGYtaWNvbi1idXR0b24oJHNpemU6IDQ0cHgsICRyYWRpdXM6IDEycHgsICRpY29uLXNpemU6IDIwcHgpIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICAtLWJhY2tncm91bmQtYWN0aXZhdGVkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtaG92ZXI6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIC0tYmFja2dyb3VuZC1mb2N1c2VkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIC0tYm9yZGVyLXJhZGl1czogI3skcmFkaXVzfTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAtLXBhZGRpbmctZW5kOiAwO1xuICAtLXBhZGRpbmctdG9wOiAwO1xuICAtLXBhZGRpbmctYm90dG9tOiAwO1xuXG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgd2lkdGg6ICRzaXplO1xuICBoZWlnaHQ6ICRzaXplO1xuICBtaW4td2lkdGg6ICRzaXplO1xuICBtaW4taGVpZ2h0OiAkc2l6ZTtcbiAgbWFyZ2luOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICBjb2xvciB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAkaWNvbi1zaXplO1xuICB9XG59XG5cbi8vIEV4cGFuc29yIGludmlzaWJsZSBkZSB6b25hIHB1bHNhYmxlLlxuLy9cbi8vIFBBUkEgUVXDg8KJOiB1biBjb250cm9sIGNvbXBhY3RvICh1biBpY29ubyBkZSAzMiBweCBlbiB1bmEgZmlsYSBkZSB0YWJsYSwgdW5cbi8vIGVubGFjZSBkZSB0ZXh0byBkZSAxNiBweCkgbm8gbGxlZ2EgYSBsb3MgNDQgcHggcXVlIGV4aWdlIFBST0RVQ1QubWQsIHlcbi8vIGVuZ29yZGFybG8gZGUgdmVyZGFkIGRlc3BsYXphIHRvZG8gbG8gcXVlIHRpZW5lIGFscmVkZWRvciDDosKAwpQgZW4gdW5hIHRhYmxhXG4vLyBkZSB2ZWludGUgZmlsYXMsIDggcHggcG9yIGZpbGEgc29uIG1lZGlhIHBhbnRhbGxhLlxuLy9cbi8vIEVsIHBzZXVkb2VsZW1lbnRvIGNyZWNlIGhhY2lhIGZ1ZXJhIHNpbiBvY3VwYXIgc2l0aW8gZW4gZWwgZmx1am8sIGFzw4PCrSBxdWVcbi8vIGVsIGJvdMODwrNuIHNlIHZlIHBlcXVlw4PCsW8geSBzZSBwdWxzYSBncmFuZGUuXG4vL1xuLy8gQVZJU08gREUgTUVESUNJw4PCk046IGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIE5PIHZlIGVzdGUgcHNldWRvZWxlbWVudG8sIGFzw4PCrVxuLy8gcXVlIGFsIHZlcmlmaWNhciBoYXkgcXVlIHVzYXIgZWxlbWVudEZyb21Qb2ludCBjb24gZWwgZWxlbWVudG8gZGVudHJvIGRlbFxuLy8gdmlld3BvcnQuIEFkZW3Dg8KhcyBlbCBoaXQtdGVzdCBkZXZ1ZWx2ZSAyIHB4IG1lbm9zIHF1ZSBsYSBjYWphIGRlY2xhcmFkYVxuLy8gKGNvbXByb2JhZG86IC00cHggZGEgNDIsIC02cHggZGEgNDYpLCBhc8ODwq0gcXVlIHVuIDQyIG1lZGlkbyBzb24gNDQgcmVhbGVzLlxuLy9cbi8vICRncm93OiBjdcODwqFudG8gY3JlY2UgcG9yIGNhZGEgbGFkby4gNHB4IGxsZXZhIHVuIGNvbnRyb2wgZGUgMzYgcHggYSA0NC5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlcigkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldDogLSN7JGdyb3d9O1xuICB9XG59XG5cbi8vIFZhcmlhbnRlIHF1ZSBzb2xvIGNyZWNlIGVuIFZFUlRJQ0FMLiBQYXJhIGNvbnRyb2xlcyBlbiBmaWxhIGRvbmRlIGVsXG4vLyBleHBhbnNvciBob3Jpem9udGFsIHNlIHNvbGFwYXLDg8KtYSBjb24gZWwgZGUgYWwgbGFkbyB5IHJvYmFyw4PCrWEgc3VzIHRvcXVlcy5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlci15KCRncm93OiA0cHgpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogLSN7JGdyb3d9O1xuICAgIGJvdHRvbTogLSN7JGdyb3d9O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
}));


/***/ }),

/***/ 43090:
/*!*************************************************************************************************************!*\
  !*** ./src/app/shared/components/recipe-ingredients-editor-modal/recipe-ingredients-editor-modal.module.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RecipeIngredientsEditorModalModule: () => (/* binding */ RecipeIngredientsEditorModalModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _recipe_ingredients_editor_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./recipe-ingredients-editor-modal.component */ 47075);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);

var _RecipeIngredientsEditorModalModule;



class RecipeIngredientsEditorModalModule {}
_RecipeIngredientsEditorModalModule = RecipeIngredientsEditorModalModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipeIngredientsEditorModalModule, "\u0275fac", function RecipeIngredientsEditorModalModule_Factory(t) {
  return new (t || _RecipeIngredientsEditorModalModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipeIngredientsEditorModalModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _RecipeIngredientsEditorModalModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipeIngredientsEditorModalModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](RecipeIngredientsEditorModalModule, {
    declarations: [_recipe_ingredients_editor_modal_component__WEBPACK_IMPORTED_MODULE_2__.RecipeIngredientsEditorModalComponent],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule],
    exports: [_recipe_ingredients_editor_modal_component__WEBPACK_IMPORTED_MODULE_2__.RecipeIngredientsEditorModalComponent]
  });
})();

/***/ }),

/***/ 78101:
/*!*****************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/models/product.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IProduct: () => (/* binding */ IProduct)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);

class IProduct {
  constructor(product) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_id", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "name", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "brand", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "code", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "verified", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "productQuantity", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "servingQuantity", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "servingUnit", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "userId", void 0);
    // If set, this product was created by the user
    // Macros y básicos
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "energyKcal100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "carbohydrates100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "sugars100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "fat100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "saturatedFat100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "protein100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "fiber100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "salt100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "sodium100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "cholesterol100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "transFat100g", void 0);
    // Minerales
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "calcium100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "iron100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "magnesium100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "phosphorus100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "potassium100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "zinc100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "copper100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "manganese100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selenium100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "iodine100g", void 0);
    // Vitaminas
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminA100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminC100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminD100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminE100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminK100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminB1100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminB2100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminB3100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminB5100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminB6100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminB9100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vitaminB12100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "biotin100g", void 0);
    // Otros
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "omega3100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "omega6100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "omega9100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "caffeine100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "taurine100g", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "alcohol100g", void 0);
    // Información dietética
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "ingredients", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "allergens", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "traces", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vegan", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "vegetarian", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "lactoseFree", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "glutenFree", void 0);
    Object.assign(this, product);
    if (this.name) this.name = this.name.trim();
    if (this.brand) this.brand = this.brand.trim();
    if (this.code) this.code = this.code.toString().trim();
    // Eliminar propiedades con valores null, undefined o strings vacíos
    // Mantenemos false y 0
    Object.keys(this).forEach(key => {
      const val = this[key];
      if (val === null || val === undefined || val === '') {
        delete this[key];
      }
    });
  }
}

/***/ }),

/***/ 40048:
/*!********************************************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/diets/components/meal/components/search-foods/components/create-product/create-product.module.ts ***!
  \********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreateProductPageModule: () => (/* binding */ CreateProductPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _create_product_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-product.page */ 75627);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);

var _CreateProductPageModule;






// Fix5 (train-fit-trainers) — el routing vive aparte, en
// CreateProductPageRoutingModule: así este módulo solo declara/exporta el
// componente y puede importarse desde OTRA app (el constructor de
// plantillas del trainer, vía ion-modal) sin arrastrar un
// RouterModule.forChild({path:''}) que pisaría las rutas propias de quien
// lo importe. NG6007 exige que el componente se declare en un único
// NgModule dentro del mismo programa TS — por eso un único punto de
// declaración+exports, reutilizado por rutas y por modal.
class CreateProductPageModule {}
_CreateProductPageModule = CreateProductPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CreateProductPageModule, "\u0275fac", function CreateProductPageModule_Factory(t) {
  return new (t || _CreateProductPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CreateProductPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _CreateProductPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CreateProductPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](CreateProductPageModule, {
    declarations: [_create_product_page__WEBPACK_IMPORTED_MODULE_1__.CreateProductPage],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule, src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_2__.SharedModule],
    exports: [_create_product_page__WEBPACK_IMPORTED_MODULE_1__.CreateProductPage]
  });
})();

/***/ }),

/***/ 75627:
/*!******************************************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/diets/components/meal/components/search-foods/components/create-product/create-product.page.ts ***!
  \******************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreateProductPage: () => (/* binding */ CreateProductPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var src_app_core_models_product__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/models/product */ 78101);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_product_product_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/product/product.service */ 24630);
/* harmony import */ var src_app_core_services_diet_day_diet_day_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/diet-day/diet-day.service */ 18086);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/util/navigation.service */ 22938);
/* harmony import */ var src_app_core_services_util_bar_code_scanner_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/services/util/bar-code-scanner.service */ 75822);
/* harmony import */ var src_app_core_services_util_ad_mob_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/services/util/ad-mob.service */ 36718);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var src_app_core_directives_decimal_input_directive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/core/directives/decimal-input.directive */ 379);
/* harmony import */ var src_app_core_directives_hide_keyboard_on_scroll_directive__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/core/directives/hide-keyboard-on-scroll.directive */ 35855);


var _CreateProductPage;

















const _c0 = ["barcodeInput"];
function CreateProductPage_ion_progress_bar_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "ion-progress-bar", 135);
  }
}
function CreateProductPage_ng_template_528_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "ion-spinner", 136);
  }
}
function CreateProductPage_ng_container_534_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx_r4.isEditMode ? _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](3, 1, "CREATE_PRODUCT.SAVE_CHANGES_BTN") : _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](4, 3, "CREATE_PRODUCT.CREATE_BTN"));
  }
}
function CreateProductPage_ng_template_535_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](2, 1, "COMMON.SAVING"));
  }
}
const _c1 = function (a0) {
  return {
    "dark-theme": a0
  };
};
class CreateProductPage {
  constructor(productService, dietDayService, ionicUtilService, userService, activatedRoute, navigationService, barCodeScannerService, adMobService, translate, modalController) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "productService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietDayService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "userService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "activatedRoute", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "navigationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "barCodeScannerService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "adMobService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "translate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalController", void 0);
    // From previous modal
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "user", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "meal", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietDay", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "codeBar", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "highlightCodeInput", false);
    // Theme support
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "theme", void 0);
    // TAREA5/Fix5 (train-fit-trainers) — permite abrir esta misma pantalla
    // (la real y completa: macros+micros+alérgenos+vegano+escáner) como
    // ion-modal en vez de como ruta del cliente, sin duplicar el formulario
    // en un componente aparte del trainer. En modalMode se salta
    // loadParametersFromRoute (no hay ActivatedRoute útil dentro de un
    // modal) y, al guardar/cancelar, se cierra el modal en vez de navegar
    // por rutas que no existen en la app del entrenador.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalMode", false);
    // Editar un producto propio ya existente en modalMode (ver
    // SearchFoodsPage#editTrainerPreviewProduct) — mismo formulario que crear,
    // solo precargado. En modo ruta normal esto sigue llegando por query
    // params (loadParametersFromRoute), sin usar este input.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalEditProduct", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "productForm", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "saveInProgress", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isEditMode", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "editingProduct", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "returnUrl", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "productByCodeSub", void 0);
    // Ingredient mode support
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ingredientMode", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "barcodeInput", void 0);
    this.productService = productService;
    this.dietDayService = dietDayService;
    this.ionicUtilService = ionicUtilService;
    this.userService = userService;
    this.activatedRoute = activatedRoute;
    this.navigationService = navigationService;
    this.barCodeScannerService = barCodeScannerService;
    this.adMobService = adMobService;
    this.translate = translate;
    this.modalController = modalController;
  }
  ngOnInit() {
    if (this.modalMode) {
      this.user = this.userService.getLocalUser;
      if (this.modalEditProduct) {
        this.isEditMode = true;
        this.editingProduct = this.modalEditProduct;
      }
      this.initForm();
      return;
    }
    this.loadParametersFromRoute();
    this.initForm();
    // Load ingredient mode from navigation state
    const state = window.history.state || {};
    this.ingredientMode = state.ingredientMode || false;
    console.log('[DEBUG] CreateProduct - ingredientMode:', this.ingredientMode);
  }
  createCustomProduct() {
    if (this.saveInProgress || this.productForm.invalid) return;
    this.saveInProgress = true;
    const formValues = {
      ...this.productForm.value
    };
    // Unit conversions (UI -> DB/g)
    const mgToG = val => val !== null && val !== undefined && val !== '' ? parseFloat(val) / 1000 : null;
    const ugToG = val => val !== null && val !== undefined && val !== '' ? parseFloat(val) / 1000000 : null;
    const toNum = val => val !== null && val !== undefined && val !== '' ? parseFloat(val) : null;
    // Numeric fields (those already in grams or values as-is)
    const numericFields = ['energyKcal100g', 'carbohydrates100g', 'fat100g', 'protein100g', 'fiber100g', 'sugars100g', 'salt100g', 'saturatedFat100g', 'alcohol100g', 'productQuantity', 'servingQuantity', 'omega3100g', 'omega6100g', 'omega9100g', 'transFat100g'];
    numericFields.forEach(field => {
      formValues[field] = toNum(formValues[field]);
    });
    // Minerals (mg)
    ['calcium100g', 'iron100g', 'magnesium100g', 'phosphorus100g', 'potassium100g', 'zinc100g', 'copper100g', 'manganese100g', 'cholesterol100g', 'sodium100g'].forEach(field => {
      formValues[field] = mgToG(formValues[field]);
    });
    // Minerals (µg)
    ['selenium100g', 'iodine100g'].forEach(field => {
      formValues[field] = ugToG(formValues[field]);
    });
    // Vitamins (mg)
    ['vitaminB1100g', 'vitaminB2100g', 'vitaminB3100g', 'vitaminB5100g', 'vitaminB6100g', 'vitaminC100g', 'vitaminE100g', 'caffeine100g', 'taurine100g'].forEach(field => {
      formValues[field] = mgToG(formValues[field]);
    });
    // Vitamins (µg)
    ['vitaminA100g', 'vitaminB9100g', 'vitaminB12100g', 'vitaminD100g', 'vitaminK100g', 'biotin100g'].forEach(field => {
      formValues[field] = ugToG(formValues[field]);
    });
    let newProduct = this.isEditMode && this.editingProduct ? {
      ...this.editingProduct
    } : {};
    Object.assign(newProduct, formValues);
    // Process text fields as arrays
    const splitText = text => typeof text === 'string' ? text.split(',').map(i => i.trim()).filter(i => i.length > 0) : text;
    newProduct.ingredients = Array.isArray(formValues.ingredients) ? formValues.ingredients.join(', ') : formValues.ingredients;
    newProduct.allergens = splitText(formValues.allergens);
    newProduct.traces = splitText(formValues.traces);
    newProduct = new src_app_core_models_product__WEBPACK_IMPORTED_MODULE_2__.IProduct(newProduct);
    // Si estamos en modo edición, mantenemos el ID original
    if (this.isEditMode && this.editingProduct) {
      newProduct._id = this.editingProduct._id;
    } else {
      // Eliminar _id para evitar errores de duplicado en MongoDB al crear uno nuevo
      delete newProduct._id;
    }
    // UPDATE Product
    if (this.isEditMode) {
      console.log('[EditProduct] Iniciando actualización de producto:', newProduct._id);
      this.productService.updateProduct(newProduct).subscribe({
        next: updatedProduct => {
          const t = this.translate.instant.bind(this.translate);
          this.dietDayService.syncUpdatedProductInCurrentDietDay(updatedProduct || newProduct);
          this.ionicUtilService.showToast({
            message: t('CREATE_PRODUCT.UPDATE_SUCCESS', {
              name: updatedProduct?.name || newProduct.name
            }),
            duration: 2000,
            color: 'success'
          });
          if (this.modalMode) {
            void this.modalController.dismiss({
              kind: 'product',
              product: updatedProduct || newProduct,
              quantity: 100
            }, 'confirm');
            return;
          }
          this.navigationService.setTempData('updatedProductForAddProduct', updatedProduct || newProduct);
          this.adMobService.interstitial('create_product');
          this.navigationService.backNoAnim();
        },
        error: err => {
          this.saveInProgress = false;
          console.error('[EditProduct] Error al actualizar:', err);
          this.ionicUtilService.showToast({
            message: this.translate.instant('CREATE_PRODUCT.UPDATE_ERROR'),
            duration: 2000,
            color: 'danger'
          });
        }
      });
      return;
    }
    // Crear solo el Product base. La cantidad y su posible incorporación a
    // una meal/receta pertenecen al flujo de add-product.
    newProduct.userId = this.user._id;
    this.productService.saveProduct(newProduct).subscribe({
      next: createdProduct => {
        this.navigationService.setTempData('searchFoodsResult', {
          refresh: true
        });
        this.ionicUtilService.showToast({
          message: this.translate.instant('CREATE_PRODUCT.CREATE_SUCCESS', {
            name: createdProduct.name
          }),
          duration: 1200,
          color: 'success'
        });
        this.adMobService.interstitial('create_product');
        this.openAddProduct(createdProduct, false, true);
      },
      error: error => {
        this.saveInProgress = false;
        console.error('[CreateProduct] Error al crear:', error);
        this.ionicUtilService.showToast({
          message: this.translate.instant('CREATE_PRODUCT.CREATE_ERROR'),
          duration: 2000,
          color: 'danger'
        });
      }
    });
  }
  openScanner() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.codeBar = undefined;
      _this.highlightCodeInput = false;
      const scannedCode = yield _this.barCodeScannerService.startScanner();
      if (!scannedCode) return;
      const idUser = _this.user?._id || _this.userService.getLocalUser?._id;
      if (idUser) {
        yield _this.ionicUtilService.showLoading({
          message: _this.translate.instant('CREATE_PRODUCT.SEARCHING'),
          spinner: 'crescent',
          cssClass: 'loading-orange'
        });
        _this.productByCodeSub = _this.productService.getProductByCode(idUser, scannedCode).subscribe({
          next: resProduct => {
            const product = resProduct?.product;
            if (product) {
              // 🔧 FIX: Producto encontrado - manejar según modo
              _this.ionicUtilService.hideLoading();
              if (_this.ingredientMode) {
                console.log('[DEBUG] create-product.openScanner: producto encontrado en ingredientMode');
                const t = _this.translate.instant.bind(_this.translate);
                _this.ionicUtilService.showAlert({
                  header: t('CREATE_PRODUCT.PRODUCT_FOUND_HEADER'),
                  message: t('CREATE_PRODUCT.PRODUCT_FOUND_MESSAGE', {
                    name: product.name
                  }),
                  buttons: [{
                    text: t('COMMON.CANCEL'),
                    role: 'cancel',
                    handler: () => {
                      _this.codeBar = scannedCode;
                      if (_this.productForm) {
                        _this.productForm.get('code')?.setValue(_this.codeBar);
                        _this.productForm.get('code')?.updateValueAndValidity();
                      }
                      _this.highlightCodeInput = true;
                      setTimeout(() => _this.barcodeInput?.setFocus(), 250);
                    }
                  }, {
                    text: t('CREATE_PRODUCT.USE_PRODUCT'),
                    handler: () => {
                      _this.openAddProduct(product, true);
                    }
                  }]
                });
              } else {
                _this.openAddProduct(product, true);
              }
            } else {
              // ✅ Producto no encontrado: mantener código en input
              _this.ionicUtilService.hideLoading();
              _this.codeBar = scannedCode;
              if (_this.productForm) {
                _this.productForm.get('code')?.setValue(_this.codeBar);
                _this.productForm.get('code')?.updateValueAndValidity();
              }
              _this.highlightCodeInput = true;
              setTimeout(() => _this.barcodeInput?.setFocus(), 250);
            }
          },
          error: _ => {
            _this.ionicUtilService.hideLoading();
            const t = _this.translate.instant.bind(_this.translate);
            _this.ionicUtilService.showAlert({
              header: t('COMMON.ERROR'),
              message: t('CREATE_PRODUCT.SEARCH_ERROR'),
              buttons: [t('COMMON.OK')]
            });
          },
          complete: () => {
            _this.productByCodeSub = undefined;
          }
        });
      }
    })();
  }
  goBack() {
    this.cancelProductLookup();
    if (this.modalMode) {
      void this.modalController.dismiss(null, 'cancel');
      return;
    }
    this.navigationService.backNoAnim();
  }
  openAddProduct(product, isScanned, justCreated = false) {
    if (this.modalMode) {
      void this.modalController.dismiss({
        kind: 'product',
        product,
        quantity: 100
      }, 'confirm');
      return;
    }
    const returnUrl = this.returnUrl || '/search-foods';
    const queryParams = {
      product: JSON.stringify(product),
      isScanned: String(isScanned),
      justCreated: String(justCreated),
      ingredientMode: String(this.ingredientMode),
      returnUrl
    };
    if (this.meal) queryParams.meal = JSON.stringify(this.meal);
    if (this.dietDay) queryParams.dietDay = JSON.stringify(this.dietDay);
    this.navigationService.goToAddProduct({
      replaceUrl: false,
      queryParams,
      state: {
        product,
        isScanned,
        justCreated,
        ingredientMode: this.ingredientMode,
        meal: this.meal,
        dietDay: this.dietDay,
        returnUrl
      }
    });
  }
  initForm() {
    this.productForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormGroup({
      code: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(this.codeBar ? this.codeBar : null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.nullValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.maxLength(100)])),
      brand: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.maxLength(200)),
      name: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.maxLength(200)])),
      // Basic macronutrients (required)
      carbohydrates100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)])),
      energyKcal100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)])),
      fat100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)])),
      protein100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)])),
      // Basic macronutrients (optional)
      fiber100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      sugars100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      salt100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      saturatedFat100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      sodium100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      cholesterol100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      transFat100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      // Vitamins (existing)
      vitaminA100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      vitaminC100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      // Additional minerals
      calcium100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      iron100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      magnesium100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      phosphorus100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      potassium100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      zinc100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      copper100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      manganese100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      selenium100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      iodine100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      // Additional vitamins
      vitaminB1100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      vitaminB2100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      vitaminB3100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      vitaminB5100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      vitaminB6100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      vitaminB9100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      vitaminB12100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      vitaminD100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      vitaminE100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      vitaminK100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      biotin100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      // Fatty acids
      omega3100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      omega6100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      omega9100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      // Other nutrients
      caffeine100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      taurine100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      alcohol100g: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      // Product information
      productQuantity: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      servingQuantity: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.min(0), _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.max(100000)]),
      servingUnit: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null),
      ingredients: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.maxLength(2000)),
      // Allergens and dietary
      allergens: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.maxLength(1000)),
      traces: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.maxLength(1000)),
      vegan: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(false),
      vegetarian: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(false),
      lactoseFree: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(false),
      glutenFree: new _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControl(false)
    });
    // Si estamos en modo edición, rellenamos el formulario
    if (this.isEditMode && this.editingProduct) {
      const p = this.editingProduct;
      const mg = val => val !== undefined && val !== null ? parseFloat((val * 1000).toFixed(4)) : null;
      const ug = val => val !== undefined && val !== null ? parseFloat((val * 1000000).toFixed(4)) : null;
      this.productForm.patchValue({
        code: p.code,
        brand: p.brand,
        name: p.name,
        carbohydrates100g: p.carbohydrates100g,
        energyKcal100g: p.energyKcal100g ? Math.round(p.energyKcal100g) : null,
        fat100g: p.fat100g,
        protein100g: p.protein100g,
        fiber100g: p.fiber100g,
        sugars100g: p.sugars100g,
        salt100g: p.salt100g,
        saturatedFat100g: p.saturatedFat100g,
        sodium100g: mg(p.sodium100g),
        cholesterol100g: mg(p.cholesterol100g),
        transFat100g: p.transFat100g,
        vitaminA100g: ug(p.vitaminA100g),
        vitaminC100g: mg(p.vitaminC100g),
        calcium100g: mg(p.calcium100g),
        iron100g: mg(p.iron100g),
        magnesium100g: mg(p.magnesium100g),
        phosphorus100g: mg(p.phosphorus100g),
        potassium100g: mg(p.potassium100g),
        zinc100g: mg(p.zinc100g),
        copper100g: mg(p.copper100g),
        manganese100g: mg(p.manganese100g),
        selenium100g: ug(p.selenium100g),
        iodine100g: ug(p.iodine100g),
        vitaminB1100g: mg(p.vitaminB1100g),
        vitaminB2100g: mg(p.vitaminB2100g),
        vitaminB3100g: mg(p.vitaminB3100g),
        vitaminB5100g: mg(p.vitaminB5100g),
        vitaminB6100g: mg(p.vitaminB6100g),
        vitaminB9100g: ug(p.vitaminB9100g),
        vitaminB12100g: ug(p.vitaminB12100g),
        vitaminD100g: ug(p.vitaminD100g),
        vitaminE100g: mg(p.vitaminE100g),
        vitaminK100g: ug(p.vitaminK100g),
        biotin100g: ug(p.biotin100g),
        omega3100g: p.omega3100g,
        omega6100g: p.omega6100g,
        omega9100g: p.omega9100g,
        caffeine100g: mg(p.caffeine100g),
        taurine100g: mg(p.taurine100g),
        alcohol100g: p.alcohol100g,
        productQuantity: p.productQuantity,
        servingQuantity: p.servingQuantity,
        servingUnit: p.servingUnit,
        ingredients: Array.isArray(p.ingredients) ? p.ingredients.join(', ') : p.ingredients,
        allergens: p.allergens?.join(', '),
        traces: p.traces?.join(', '),
        vegan: p.vegan || false,
        vegetarian: p.vegetarian || false,
        lactoseFree: p.lactoseFree || false,
        glutenFree: p.glutenFree || false
      });
    }
    setTimeout(() => {
      if (this.codeBar) {
        this.productForm.get('code')?.setValue(this.codeBar);
        this.productForm.get('code')?.updateValueAndValidity();
      }
    });
  }
  loadParametersFromRoute() {
    // Cargar parámetros cuando se abre por ruta
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['user']) {
        try {
          this.user = JSON.parse(params['user']);
        } catch (_) {}
      }
      if (params['meal']) {
        try {
          this.meal = JSON.parse(params['meal']);
        } catch (_) {}
      }
      if (params['dietDay']) {
        try {
          this.dietDay = JSON.parse(params['dietDay']);
        } catch (_) {}
      }
      if (params['codeBar']) {
        this.codeBar = params['codeBar'];
        if (this.productForm) {
          this.productForm.get('code')?.setValue(this.codeBar);
          this.productForm.get('code')?.updateValueAndValidity();
        }
        // Resaltar y enfocar el input cuando venimos desde SearchFoods con código escaneado
        this.highlightCodeInput = true;
        setTimeout(() => this.barcodeInput?.setFocus(), 250);
      }
      if (params['theme']) {
        try {
          this.theme = typeof params['theme'] === 'string' ? params['theme'] : this.theme;
        } catch (_) {}
      }
      if (params['returnUrl']) {
        this.returnUrl = params['returnUrl'];
      }
      if (params['isEditMode']) {
        this.isEditMode = params['isEditMode'] === 'true' || params['isEditMode'] === true;
      }
      if (params['product']) {
        try {
          this.editingProduct = JSON.parse(params['product']);
          if (this.productForm) this.initForm(); // Re-init form if product is now available
        } catch (_) {}
      }
    });
    // También leer state al volver del escáner
    const state = window.history.state || {};
    // Preferir state para compatibilidad con NavController
    if (state.isEditMode !== undefined) {
      this.isEditMode = !!state.isEditMode;
    }
    if (state.product) {
      this.editingProduct = state.product;
      if (this.productForm) this.initForm();
    }
    if (state.user && !this.user) {
      try {
        this.user = state.user;
      } catch (_) {}
    }
    if (state.meal && !this.meal) {
      try {
        this.meal = state.meal;
      } catch (_) {}
    }
    if (state.dietDay && !this.dietDay) {
      try {
        this.dietDay = state.dietDay;
      } catch (_) {}
    }
    if (state.theme && !this.theme) {
      try {
        this.theme = state.theme;
      } catch (_) {}
    }
    if (state.codeBar) {
      this.codeBar = state.codeBar;
      if (this.productForm) {
        this.productForm.get('code')?.setValue(this.codeBar);
        this.productForm.get('code')?.updateValueAndValidity();
      }
      // Resaltar y enfocar el input si hay código en state (flujo de SearchFoods)
      this.highlightCodeInput = true;
      setTimeout(() => this.barcodeInput?.setFocus(), 250);
    }
    if (state.userId && !this.user) this.user = {
      _id: state.userId
    };
    if (state.mealName && !this.meal) this.meal = {
      name: state.mealName
    };
    if (state.returnUrl) this.returnUrl = state.returnUrl;
    // Fallback de usuario si no se pudo reconstruir desde state/query
    if (!this.user && this.userService.getLocalUser) {
      this.user = this.userService.getLocalUser;
    }
    // Si hay código (desde SearchFoods), resaltar y enfocar
    if (this.codeBar) {
      this.highlightCodeInput = true;
      setTimeout(() => this.barcodeInput?.setFocus(), 250);
    }
  }
  ionViewWillEnter() {
    // Ionic mantiene viva la instancia de la página en el stack; sin esto,
    // un saveInProgress=true que quedó colgado de una creación anterior
    // (nunca se resetea en el camino de éxito, solo en el de error) se
    // arrastra a la siguiente vez que se entra en modo edición.
    this.saveInProgress = false;
  }
  ionViewWillLeave() {
    this.cancelProductLookup();
  }
  cancelProductLookup() {
    try {
      this.productByCodeSub?.unsubscribe();
      this.productByCodeSub = undefined;
    } catch {}
    this.ionicUtilService.hideLoading();
  }
  onCodeInputChange() {
    // Quitar resaltado cuando el usuario modifica el código manualmente
    this.highlightCodeInput = false;
  }
}
_CreateProductPage = CreateProductPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(CreateProductPage, "\u0275fac", function CreateProductPage_Factory(t) {
  return new (t || _CreateProductPage)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_app_core_services_product_product_service__WEBPACK_IMPORTED_MODULE_3__.ProductService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_app_core_services_diet_day_diet_day_service__WEBPACK_IMPORTED_MODULE_4__.DietDayService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_5__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_6__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_14__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_7__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_app_core_services_util_bar_code_scanner_service__WEBPACK_IMPORTED_MODULE_8__.BarCodeScannerService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_app_core_services_util_ad_mob_service__WEBPACK_IMPORTED_MODULE_9__.AdMobService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_16__.ModalController));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(CreateProductPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
  type: _CreateProductPage,
  selectors: [["app-create-product"]],
  viewQuery: function CreateProductPage_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵloadQuery"]()) && (ctx.barcodeInput = _t.first);
    }
  },
  inputs: {
    theme: "theme",
    modalMode: "modalMode",
    modalEditProduct: "modalEditProduct"
  },
  decls: 537,
  vars: 258,
  consts: [[1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], [1, "tf-page-header__back-button", 3, "click"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], ["class", "save-progress", "type", "indeterminate", "color", "primary", 4, "ngIf"], ["appHideKeyboardOnScroll", "", 1, "elegant-content", 3, "ngClass"], [1, "form-container"], [1, "elegant-form", 3, "formGroup"], [1, "form-sections"], [1, "product-header-card"], [1, "card-title"], [1, "input-grid"], [1, "custom-input-container", "barcode-input"], [1, "custom-label", "barcode-label"], [1, "input-wrapper", "barcode-wrapper"], ["type", "number", "inputmode", "numeric", "formControlName", "code", 1, "custom-input", 3, "placeholder", "ionInput"], ["barcodeInput", ""], ["fill", "clear", 1, "action-btn", "note-btn", "scanner-button", 3, "click"], ["slot", "icon-only", "name", "barcode-outline"], [1, "custom-input-container"], [1, "custom-label"], [1, "input-wrapper"], ["type", "text", "formControlName", "name", 1, "custom-input", 3, "placeholder"], ["type", "text", "formControlName", "brand", 1, "custom-input", 3, "placeholder"], [1, "nutrition-card"], [1, "nutrition-title"], [1, "nutrition-item", "calories-section"], [1, "custom-input-container", "calories-input"], [1, "custom-label", "calories-label"], ["name", "flame-outline"], [1, "input-wrapper", "calories-wrapper"], ["type", "text", "inputmode", "numeric", "formControlName", "energyKcal100g", "placeholder", "0", "appDecimalInput", "", 1, "custom-input", "calories-value", 3, "maxDecimals"], [1, "input-unit", "primary-unit"], [1, "macros-section"], [1, "macros-header"], [1, "macros-title"], ["name", "analytics-outline"], [1, "macros-grid"], [1, "macro-item", "fat-macro"], [1, "custom-input-container", "fat-input"], [1, "custom-label", "fat-label"], [1, "macro-dot", "fat-dot"], ["type", "text", "inputmode", "decimal", "formControlName", "fat100g", "placeholder", "0", "appDecimalInput", "", 1, "custom-input", 3, "maxDecimals"], [1, "input-unit", "secondary-unit"], [1, "macro-item", "saturated-fat-macro"], [1, "custom-input-container", "saturated-fat-input"], [1, "custom-label", "saturated-fat-label"], ["type", "text", "inputmode", "decimal", "formControlName", "saturatedFat100g", "placeholder", "0", "appDecimalInput", "", 1, "custom-input", 3, "maxDecimals"], [1, "macro-item", "carbs-macro"], [1, "custom-input-container", "carbs-input"], [1, "custom-label", "carbs-label"], [1, "macro-dot", "carbs-dot"], ["type", "text", "inputmode", "decimal", "formControlName", "carbohydrates100g", "placeholder", "0", "appDecimalInput", "", 1, "custom-input", 3, "maxDecimals"], [1, "macro-item", "sugars-macro"], [1, "custom-input-container", "sugars-input"], [1, "custom-label", "sugars-label"], ["type", "text", "inputmode", "decimal", "formControlName", "sugars100g", "placeholder", "0", "appDecimalInput", "", 1, "custom-input", 3, "maxDecimals"], [1, "macro-item", "fiber-macro"], [1, "custom-input-container", "fiber-input"], [1, "custom-label", "fiber-label"], [1, "macro-dot", "fiber-dot"], ["type", "text", "inputmode", "decimal", "formControlName", "fiber100g", "placeholder", "0", "appDecimalInput", "", 1, "custom-input", 3, "maxDecimals"], [1, "macro-item", "protein-macro"], [1, "custom-input-container", "protein-input"], [1, "custom-label", "protein-label"], [1, "macro-dot", "protein-dot"], ["type", "text", "inputmode", "decimal", "formControlName", "protein100g", "placeholder", "0", "appDecimalInput", "", 1, "custom-input", 3, "maxDecimals"], ["value", "additional-info"], ["slot", "header", "lines", "none"], ["name", "add-circle-outline"], ["slot", "content", 1, "ion-padding"], [1, "quantities-section"], [1, "section-subtitle"], ["name", "cube-outline"], [1, "quantities-grid"], ["name", "restaurant-outline"], ["type", "text", "inputmode", "decimal", "formControlName", "servingQuantity", "appDecimalInput", "", 1, "custom-input", 3, "placeholder", "maxDecimals"], [1, "input-unit"], ["type", "text", "inputmode", "decimal", "formControlName", "productQuantity", "appDecimalInput", "", 1, "custom-input", 3, "placeholder", "maxDecimals"], [1, "dietary-features-section"], ["name", "leaf-outline"], [1, "dietary-grid"], [1, "dietary-option", 3, "click"], [3, "name"], [1, "macro-item"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "calcium100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "iron100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "magnesium100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "phosphorus100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "potassium100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "zinc100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "copper100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "manganese100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "selenium100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "iodine100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "appDecimalInput", "", "formControlName", "sodium100g", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "appDecimalInput", "", "formControlName", "salt100g", 1, "custom-input", 3, "maxDecimals"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "vitaminA100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "vitaminD100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "vitaminE100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "vitaminK100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "vitaminC100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "vitaminB1100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "vitaminB2100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "vitaminB3100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "vitaminB5100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "vitaminB6100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "vitaminB9100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "vitaminB12100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "biotin100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "cholesterol100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "transFat100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "omega3100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "omega6100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "omega9100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "caffeine100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "taurine100g", "appDecimalInput", "", 1, "custom-input"], ["type", "text", "inputmode", "decimal", "placeholder", "0", "formControlName", "alcohol100g", "appDecimalInput", "", 1, "custom-input"], [1, "text-info-grid", "ion-margin-top"], [1, "text-info-card"], [1, "text-info-header"], ["rows", "3", "formControlName", "ingredients", 1, "custom-info-textarea", 3, "placeholder", "maxlength", "counter"], ["rows", "2", "formControlName", "allergens", 1, "custom-info-textarea", 3, "placeholder", "maxlength", "counter"], ["rows", "2", "formControlName", "traces", 1, "custom-info-textarea", 3, "placeholder", "maxlength", "counter"], ["notLoading", ""], [1, "fixed-save-footer", "create-product-footer"], [1, "footer-content"], ["expand", "block", "size", "large", 1, "create-button", 3, "disabled", "click"], [1, "button-content"], [4, "ngIf", "ngIfElse"], ["savingProduct", ""], ["type", "indeterminate", "color", "primary", 1, "save-progress"], ["name", "dots", "color", "primary"]],
  template: function CreateProductPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-header")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function CreateProductPage_Template_button_click_4_listener() {
        return ctx.goBack();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](5, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](6, "ion-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](7, "div", 5)(8, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](10, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](11, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](12, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](13, CreateProductPage_ion_progress_bar_13_Template, 1, 0, "ion-progress-bar", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](14, "ion-content", 9)(15, "div", 10)(16, "form", 11)(17, "div", 12)(18, "ion-card", 13)(19, "ion-card-header")(20, "ion-card-title", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](21);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](22, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](23, "ion-card-content")(24, "div", 15)(25, "div", 16)(26, "ion-label", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](27);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](28, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](29, "div", 18)(30, "ion-input", 19, 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ionInput", function CreateProductPage_Template_ion_input_ionInput_30_listener() {
        return ctx.onCodeInputChange();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](32, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](33, "ion-button", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function CreateProductPage_Template_ion_button_click_33_listener() {
        return ctx.openScanner();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](34, "ion-icon", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](35, "div", 23)(36, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](37);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](38, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](39, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](40, "ion-input", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](41, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](42, "div", 23)(43, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](44);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](45, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](46, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](47, "ion-input", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](48, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](49, "ion-card", 28)(50, "ion-card-header")(51, "ion-card-title", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](52);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](53, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](54, "ion-note");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](55);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](56, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](57, "ion-card-content")(58, "div", 30)(59, "div", 31)(60, "ion-label", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](61, "ion-icon", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](62);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](63, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](64, "div", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](65, "ion-input", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](66, "span", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](67, "kcal");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](68, "div", 37)(69, "div", 38)(70, "ion-text", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](71, "ion-icon", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](72);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](73, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](74, "div", 41)(75, "div", 42)(76, "div", 43)(77, "ion-label", 44);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](78, "div", 45);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](79);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](80, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](81, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](82, "ion-input", 46);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](83, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](84, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](85, "div", 48)(86, "div", 49)(87, "ion-label", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](88);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](89, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](90, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](91, "ion-input", 51);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](92, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](93, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](94, "div", 52)(95, "div", 53)(96, "ion-label", 54);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](97, "div", 55);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](98);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](99, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](100, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](101, "ion-input", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](102, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](103, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](104, "div", 57)(105, "div", 58)(106, "ion-label", 59);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](107);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](108, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](109, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](110, "ion-input", 60);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](111, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](112, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](113, "div", 61)(114, "div", 62)(115, "ion-label", 63);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](116, "div", 64);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](117);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](118, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](119, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](120, "ion-input", 65);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](121, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](122, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](123, "div", 66)(124, "div", 67)(125, "ion-label", 68);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](126, "div", 69);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](127);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](128, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](129, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](130, "ion-input", 70);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](131, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](132, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](133, "ion-card", 28)(134, "ion-accordion-group")(135, "ion-accordion", 71)(136, "ion-item", 72)(137, "ion-label", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](138, "ion-icon", 73);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](139);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](140, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](141, "div", 74)(142, "div", 75)(143, "h4", 76);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](144, "ion-icon", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](145);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](146, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](147, "div", 78)(148, "div", 23)(149, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](150, "ion-icon", 79);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](151);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](152, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](153, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](154, "ion-input", 80);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](155, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](156, "span", 81);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](157, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](158, "div", 23)(159, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](160, "ion-icon", 77);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](161);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](162, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](163, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](164, "ion-input", 82);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](165, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](166, "span", 81);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](167, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](168, "div", 83)(169, "h4", 76);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](170, "ion-icon", 84);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](171);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](172, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](173, "div", 85)(174, "div", 86);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function CreateProductPage_Template_div_click_174_listener() {
        let tmp_b_0;
        let tmp_b_1;
        return (tmp_b_0 = ctx.productForm.get("vegan")) == null ? null : tmp_b_0.setValue(!((tmp_b_1 = ctx.productForm.get("vegan")) == null ? null : tmp_b_1.value));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](175, "ion-icon", 87);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](176, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](177);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](178, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](179, "div", 86);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function CreateProductPage_Template_div_click_179_listener() {
        let tmp_b_0;
        let tmp_b_1;
        return (tmp_b_0 = ctx.productForm.get("vegetarian")) == null ? null : tmp_b_0.setValue(!((tmp_b_1 = ctx.productForm.get("vegetarian")) == null ? null : tmp_b_1.value));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](180, "ion-icon", 87);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](181, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](182);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](183, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](184, "div", 86);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function CreateProductPage_Template_div_click_184_listener() {
        let tmp_b_0;
        let tmp_b_1;
        return (tmp_b_0 = ctx.productForm.get("lactoseFree")) == null ? null : tmp_b_0.setValue(!((tmp_b_1 = ctx.productForm.get("lactoseFree")) == null ? null : tmp_b_1.value));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](185, "ion-icon", 87);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](186, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](187);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](188, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](189, "div", 86);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function CreateProductPage_Template_div_click_189_listener() {
        let tmp_b_0;
        let tmp_b_1;
        return (tmp_b_0 = ctx.productForm.get("glutenFree")) == null ? null : tmp_b_0.setValue(!((tmp_b_1 = ctx.productForm.get("glutenFree")) == null ? null : tmp_b_1.value));
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](190, "ion-icon", 87);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](191, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](192);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](193, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](194, "ion-list-header")(195, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](196);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](197, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](198, "div", 41)(199, "div", 88)(200, "div", 23)(201, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](202);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](203, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](204, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](205, "ion-input", 89);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](206, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](207, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](208, "div", 88)(209, "div", 23)(210, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](211);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](212, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](213, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](214, "ion-input", 90);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](215, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](216, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](217, "div", 88)(218, "div", 23)(219, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](220);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](221, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](222, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](223, "ion-input", 91);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](224, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](225, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](226, "div", 88)(227, "div", 23)(228, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](229);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](230, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](231, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](232, "ion-input", 92);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](233, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](234, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](235, "div", 88)(236, "div", 23)(237, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](238);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](239, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](240, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](241, "ion-input", 93);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](242, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](243, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](244, "div", 88)(245, "div", 23)(246, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](247);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](248, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](249, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](250, "ion-input", 94);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](251, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](252, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](253, "div", 88)(254, "div", 23)(255, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](256);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](257, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](258, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](259, "ion-input", 95);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](260, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](261, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](262, "div", 88)(263, "div", 23)(264, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](265);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](266, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](267, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](268, "ion-input", 96);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](269, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](270, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](271, "div", 88)(272, "div", 23)(273, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](274);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](275, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](276, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](277, "ion-input", 97);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](278, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](279, "\u00B5g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](280, "div", 88)(281, "div", 23)(282, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](283);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](284, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](285, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](286, "ion-input", 98);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](287, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](288, "\u00B5g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](289, "div", 88)(290, "div", 23)(291, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](292);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](293, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](294, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](295, "ion-input", 99);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](296, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](297, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](298, "div", 88)(299, "div", 23)(300, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](301);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](302, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](303, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](304, "ion-input", 100);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](305, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](306, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](307, "ion-list-header")(308, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](309);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](310, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](311, "div", 41)(312, "div", 88)(313, "div", 23)(314, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](315);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](316, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](317, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](318, "ion-input", 101);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](319, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](320, "\u00B5g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](321, "div", 88)(322, "div", 23)(323, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](324);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](325, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](326, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](327, "ion-input", 102);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](328, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](329, "\u00B5g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](330, "div", 88)(331, "div", 23)(332, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](333);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](334, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](335, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](336, "ion-input", 103);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](337, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](338, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](339, "div", 88)(340, "div", 23)(341, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](342);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](343, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](344, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](345, "ion-input", 104);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](346, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](347, "\u00B5g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](348, "div", 88)(349, "div", 23)(350, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](351);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](352, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](353, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](354, "ion-input", 105);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](355, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](356, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](357, "div", 88)(358, "div", 23)(359, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](360);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](361, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](362, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](363, "ion-input", 106);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](364, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](365, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](366, "div", 88)(367, "div", 23)(368, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](369);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](370, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](371, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](372, "ion-input", 107);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](373, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](374, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](375, "div", 88)(376, "div", 23)(377, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](378);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](379, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](380, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](381, "ion-input", 108);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](382, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](383, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](384, "div", 88)(385, "div", 23)(386, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](387);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](388, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](389, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](390, "ion-input", 109);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](391, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](392, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](393, "div", 88)(394, "div", 23)(395, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](396);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](397, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](398, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](399, "ion-input", 110);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](400, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](401, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](402, "div", 88)(403, "div", 23)(404, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](405);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](406, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](407, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](408, "ion-input", 111);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](409, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](410, "\u00B5g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](411, "div", 88)(412, "div", 23)(413, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](414);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](415, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](416, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](417, "ion-input", 112);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](418, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](419, "\u00B5g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](420, "div", 88)(421, "div", 23)(422, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](423);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](424, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](425, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](426, "ion-input", 113);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](427, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](428, "\u00B5g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](429, "ion-list-header")(430, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](431);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](432, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](433, "div", 41)(434, "div", 88)(435, "div", 23)(436, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](437);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](438, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](439, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](440, "ion-input", 114);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](441, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](442, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](443, "div", 88)(444, "div", 23)(445, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](446);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](447, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](448, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](449, "ion-input", 115);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](450, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](451, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](452, "div", 88)(453, "div", 23)(454, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](455);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](456, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](457, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](458, "ion-input", 116);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](459, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](460, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](461, "div", 88)(462, "div", 23)(463, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](464);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](465, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](466, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](467, "ion-input", 117);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](468, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](469, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](470, "div", 88)(471, "div", 23)(472, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](473);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](474, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](475, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](476, "ion-input", 118);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](477, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](478, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](479, "div", 88)(480, "div", 23)(481, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](482);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](483, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](484, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](485, "ion-input", 119);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](486, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](487, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](488, "div", 88)(489, "div", 23)(490, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](491);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](492, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](493, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](494, "ion-input", 120);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](495, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](496, "mg");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](497, "div", 88)(498, "div", 23)(499, "ion-label", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](500);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](501, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](502, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](503, "ion-input", 121);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](504, "span", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](505, "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](506, "div", 122)(507, "div", 123)(508, "div", 124)(509, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](510);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](511, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](512, "ion-textarea", 125);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](513, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](514, "div", 123)(515, "div", 124)(516, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](517);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](518, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](519, "ion-textarea", 126);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](520, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](521, "div", 123)(522, "div", 124)(523, "ion-label");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](524);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](525, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](526, "ion-textarea", 127);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](527, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](528, CreateProductPage_ng_template_528_Template, 1, 0, "ng-template", null, 128, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](530, "ion-footer", 129)(531, "div", 130)(532, "ion-button", 131);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function CreateProductPage_Template_ion_button_click_532_listener() {
        return ctx.createCustomProduct();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](533, "div", 132);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](534, CreateProductPage_ng_container_534_Template, 5, 5, "ng-container", 133);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](535, CreateProductPage_ng_template_535_Template, 3, 3, "ng-template", null, 134, _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()()();
    }
    if (rf & 2) {
      const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵreference"](536);
      let tmp_40_0;
      let tmp_41_0;
      let tmp_43_0;
      let tmp_44_0;
      let tmp_46_0;
      let tmp_47_0;
      let tmp_49_0;
      let tmp_50_0;
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵattribute"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](5, 110, "COMMON.BACK"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](ctx.isEditMode ? _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](10, 112, "CREATE_PRODUCT.HEADER_TITLE_EDIT") : _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](11, 114, "CREATE_PRODUCT.HEADER_TITLE_CREATE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.saveInProgress);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵclassProp"]("has-save-footer", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction1"](256, _c1, ctx.theme === "dark"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("formGroup", ctx.productForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](22, 116, "CREATE_PRODUCT.GENERAL_INFO_TITLE"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](28, 118, "CREATE_PRODUCT.BARCODE_LABEL"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵclassProp"]("highlight-code", ctx.highlightCodeInput);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](32, 120, "CREATE_PRODUCT.BARCODE_PLACEHOLDER"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](38, 122, "CREATE_PRODUCT.NAME_LABEL"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](41, 124, "CREATE_PRODUCT.NAME_PLACEHOLDER"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](45, 126, "CREATE_PRODUCT.BRAND_LABEL"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](48, 128, "CREATE_PRODUCT.BRAND_PLACEHOLDER"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](53, 130, "CREATE_PRODUCT.NUTRITION_INFO_TITLE"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](56, 132, "CREATE_PRODUCT.PER_100G_NOTE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](63, 134, "CREATE_PRODUCT.CALORIES_LABEL"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("maxDecimals", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](73, 136, "CREATE_PRODUCT.MACRONUTRIENTS_TITLE"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](80, 138, "CREATE_PRODUCT.FAT_LABEL"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("maxDecimals", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](89, 140, "CREATE_PRODUCT.SATURATED_LABEL"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("maxDecimals", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](99, 142, "CREATE_PRODUCT.CARBS_LABEL"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("maxDecimals", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](108, 144, "CREATE_PRODUCT.SUGARS_LABEL"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("maxDecimals", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](118, 146, "CREATE_PRODUCT.FIBER_LABEL"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("maxDecimals", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](128, 148, "CREATE_PRODUCT.PROTEIN_LABEL"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("maxDecimals", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](140, 150, "CREATE_PRODUCT.FULL_INFO_TITLE"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](146, 152, "CREATE_PRODUCT.PRODUCT_QUANTITIES_TITLE"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](152, 154, "CREATE_PRODUCT.SERVING_QTY_LABEL"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](155, 156, "CREATE_PRODUCT.SERVING_QTY_PLACEHOLDER"))("maxDecimals", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](162, 158, "CREATE_PRODUCT.TOTAL_QTY_LABEL"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](165, 160, "CREATE_PRODUCT.TOTAL_QTY_PLACEHOLDER"))("maxDecimals", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](172, 162, "CREATE_PRODUCT.DIETARY_FEATURES_TITLE"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵclassProp"]("active", (tmp_40_0 = ctx.productForm.get("vegan")) == null ? null : tmp_40_0.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("name", ((tmp_41_0 = ctx.productForm.get("vegan")) == null ? null : tmp_41_0.value) ? "checkmark-circle" : "ellipse-outline");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](178, 164, "CREATE_PRODUCT.VEGAN"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵclassProp"]("active", (tmp_43_0 = ctx.productForm.get("vegetarian")) == null ? null : tmp_43_0.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("name", ((tmp_44_0 = ctx.productForm.get("vegetarian")) == null ? null : tmp_44_0.value) ? "checkmark-circle" : "ellipse-outline");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](183, 166, "CREATE_PRODUCT.VEGETARIAN"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵclassProp"]("active", (tmp_46_0 = ctx.productForm.get("lactoseFree")) == null ? null : tmp_46_0.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("name", ((tmp_47_0 = ctx.productForm.get("lactoseFree")) == null ? null : tmp_47_0.value) ? "checkmark-circle" : "ellipse-outline");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](188, 168, "CREATE_PRODUCT.LACTOSE_FREE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵclassProp"]("active", (tmp_49_0 = ctx.productForm.get("glutenFree")) == null ? null : tmp_49_0.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("name", ((tmp_50_0 = ctx.productForm.get("glutenFree")) == null ? null : tmp_50_0.value) ? "checkmark-circle" : "ellipse-outline");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](193, 170, "CREATE_PRODUCT.GLUTEN_FREE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](197, 172, "CREATE_PRODUCT.MINERALS_TITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](203, 174, "CREATE_PRODUCT.CALCIUM"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](212, 176, "CREATE_PRODUCT.IRON"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](221, 178, "CREATE_PRODUCT.MAGNESIUM"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](230, 180, "CREATE_PRODUCT.PHOSPHORUS"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](239, 182, "CREATE_PRODUCT.POTASSIUM"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](248, 184, "CREATE_PRODUCT.ZINC"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](257, 186, "CREATE_PRODUCT.COPPER"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](266, 188, "CREATE_PRODUCT.MANGANESE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](275, 190, "CREATE_PRODUCT.SELENIUM"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](284, 192, "CREATE_PRODUCT.IODINE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](293, 194, "CREATE_PRODUCT.SODIUM"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](302, 196, "CREATE_PRODUCT.SALT"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("maxDecimals", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](310, 198, "CREATE_PRODUCT.VITAMINS_TITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](316, 200, "CREATE_PRODUCT.VIT_A"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](325, 202, "CREATE_PRODUCT.VIT_D"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](334, 204, "CREATE_PRODUCT.VIT_E"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](343, 206, "CREATE_PRODUCT.VIT_K"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](352, 208, "CREATE_PRODUCT.VIT_C"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](361, 210, "CREATE_PRODUCT.VIT_B1"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](370, 212, "CREATE_PRODUCT.VIT_B2"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](379, 214, "CREATE_PRODUCT.VIT_B3"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](388, 216, "CREATE_PRODUCT.VIT_B5"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](397, 218, "CREATE_PRODUCT.VIT_B6"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](406, 220, "CREATE_PRODUCT.VIT_B9"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](415, 222, "CREATE_PRODUCT.VIT_B12"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](424, 224, "CREATE_PRODUCT.BIOTIN"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](432, 226, "CREATE_PRODUCT.OTHER_TITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](438, 228, "CREATE_PRODUCT.CHOLESTEROL"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](447, 230, "CREATE_PRODUCT.TRANS_FAT"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](456, 232, "CREATE_PRODUCT.OMEGA3"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](465, 234, "CREATE_PRODUCT.OMEGA6"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](474, 236, "CREATE_PRODUCT.OMEGA9"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](483, 238, "CREATE_PRODUCT.CAFFEINE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](492, 240, "CREATE_PRODUCT.TAURINE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](501, 242, "CREATE_PRODUCT.ALCOHOL"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](511, 244, "CREATE_PRODUCT.INGREDIENTS_LABEL"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](513, 246, "CREATE_PRODUCT.INGREDIENTS_PLACEHOLDER"))("maxlength", 2000)("counter", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](518, 248, "CREATE_PRODUCT.ALLERGENS_LABEL"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](520, 250, "CREATE_PRODUCT.ALLERGENS_PLACEHOLDER"))("maxlength", 1000)("counter", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](525, 252, "CREATE_PRODUCT.TRACES_LABEL"));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](527, 254, "CREATE_PRODUCT.TRACES_PLACEHOLDER"))("maxlength", 1000)("counter", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("disabled", ctx.productForm.invalid || ctx.saveInProgress);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx.saveInProgress)("ngIfElse", _r5);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_17__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormControlName, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonAccordion, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonAccordionGroup, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonCard, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonCardContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonCardHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonCardTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonInput, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonListHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonNote, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonProgressBar, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonSpinner, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonTextarea, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.NumericValueAccessor, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.TextValueAccessor, src_app_core_directives_decimal_input_directive__WEBPACK_IMPORTED_MODULE_10__.DecimalInputDirective, src_app_core_directives_hide_keyboard_on_scroll_directive__WEBPACK_IMPORTED_MODULE_11__.HideKeyboardOnScrollDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_15__.TranslatePipe],
  styles: ["[_nghost-%COMP%] {\n  --border-radius: 12px;\n  --shadow-elevation: 0 4px 16px rgba(0, 0, 0, 0.15);\n  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  --input-border-radius: 12px;\n  --input-padding: 12px 16px;\n  --card-background: #141414;\n  --card-border: #252525;\n  --text-primary: #ffffff;\n  --text-secondary: #b0b0b0;\n  --text-muted: #888888;\n}\n\n.action-btn[_ngcontent-%COMP%] {\n  --padding-start: 14px;\n  --padding-end: 14px;\n  --padding-top: 14px;\n  --padding-bottom: 14px;\n  --border-radius: 14px;\n  width: 45px;\n  height: 45px;\n  margin: 0;\n}\n.action-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n}\n\n.note-btn[_ngcontent-%COMP%] {\n  --color: var(--ion-color-primary);\n  --background: rgba(var(--ion-color-primary-rgb), 0.15);\n  --background-activated: rgba(var(--ion-color-primary-rgb), 0.25);\n}\n\n.create-product-page[_ngcontent-%COMP%] {\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n  --padding-start: 12px;\n  --padding-end: 12px;\n  --background: #0a0a0a;\n}\n\n.elegant-content[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.elegant-content.has-save-footer[_ngcontent-%COMP%] {\n  --padding-bottom: 88px;\n}\n.elegant-content.has-save-footer[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%] {\n  padding-bottom: 96px;\n}\n.elegant-content[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 600px;\n  margin: 0 auto;\n}\n.elegant-content[_ngcontent-%COMP%]   .elegant-form[_ngcontent-%COMP%]   .form-sections[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.product-header-card[_ngcontent-%COMP%], .nutrition-card[_ngcontent-%COMP%], .additional-info-card[_ngcontent-%COMP%] {\n  background: #141414 !important;\n  border: 1px solid #252525 !important;\n  border-radius: var(--border-radius);\n  box-shadow: var(--shadow-elevation);\n  margin-bottom: 12px;\n  overflow: hidden;\n}\n.product-header-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%], .nutrition-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%], .additional-info-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  padding: 16px;\n  background: transparent !important;\n}\n.product-header-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%], .nutrition-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%], .additional-info-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {\n  padding-bottom: 6px;\n  background: transparent !important;\n}\n\nion-card[_ngcontent-%COMP%] {\n  margin: 16px 0;\n  background: #141414 !important;\n  border: 1px solid #252525 !important;\n}\nion-card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--ion-text-color);\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 16px 16px 8px 16px;\n}\nion-card[_ngcontent-%COMP%]   .card-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  color: var(--ion-color-primary);\n}\nion-card[_ngcontent-%COMP%]   .card-note[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--ion-color-medium);\n  margin: 0;\n  padding: 0 16px 8px 40px;\n  font-style: italic;\n}\n\n.card-title[_ngcontent-%COMP%], .nutrition-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.card-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], .nutrition-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: var(--text-secondary);\n}\n.card-title[_ngcontent-%COMP%]   ion-note[_ngcontent-%COMP%], .nutrition-title[_ngcontent-%COMP%]   ion-note[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 0.75rem;\n  color: var(--text-muted);\n}\n\n.custom-input-container[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  position: relative;\n}\n\nion-accordion[_ngcontent-%COMP%] {\n  background: transparent;\n}\nion-accordion[_ngcontent-%COMP%]   ion-item[slot=header][_ngcontent-%COMP%] {\n  --background: transparent;\n  --background-hover: transparent;\n  --background-hover-opacity: 0;\n  --background-activated: transparent;\n  --border-width: 0;\n  --inner-padding-end: 16px;\n  margin-bottom: 0;\n}\nion-accordion[_ngcontent-%COMP%]   .ion-padding[_ngcontent-%COMP%] {\n  --padding-top: 0;\n}\n\nion-accordion[value=additional-info][_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  margin-bottom: 12px;\n}\nion-accordion[value=additional-info][_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .custom-label[_ngcontent-%COMP%] {\n  margin-bottom: 0;\n  flex: 1;\n}\nion-accordion[value=additional-info][_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%] {\n  width: 180px;\n  flex: 0 0 180px;\n}\n\n.custom-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.85rem;\n  font-weight: 600;\n  margin-bottom: 6px;\n  color: var(--text-primary);\n}\n.custom-label[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  color: var(--text-secondary);\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: stretch;\n  background: var(--card-background);\n  border: 1px solid var(--card-border);\n  border-radius: var(--input-border-radius);\n  transition: var(--transition);\n  overflow: hidden;\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--ion-color-primary);\n}\n\n.custom-input[_ngcontent-%COMP%] {\n  --background: transparent;\n  --color: var(--text-primary);\n  --placeholder-color: var(--text-muted);\n  --padding-start: 16px;\n  --padding-end: 0;\n  --padding-top: 12px;\n  --padding-bottom: 12px;\n  flex: 1;\n  font-size: 0.95rem;\n  font-weight: 500;\n  border: none;\n}\n\n.input-unit[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  align-self: stretch;\n  padding: 0 12px;\n  font-size: 0.8rem;\n  font-weight: 600;\n  color: var(--text-secondary);\n  background: rgba(37, 37, 37, 0.3);\n  border-left: 1px solid var(--card-border);\n  min-width: 32px;\n  text-align: center;\n}\n\n.barcode-wrapper[_ngcontent-%COMP%] {\n  align-items: stretch;\n}\n.barcode-wrapper[_ngcontent-%COMP%]   .scanner-button[_ngcontent-%COMP%] {\n  --background: rgba(var(--ion-color-primary-rgb), 0.15);\n  --background-activated: rgba(var(--ion-color-primary-rgb), 0.25);\n  --color: var(--ion-color-primary);\n  --border-radius: 0;\n  margin: 0;\n  width: 46px;\n  height: auto;\n  align-self: stretch;\n  border-left: 1px solid var(--card-border);\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n  border-top-right-radius: var(--input-border-radius);\n  border-bottom-right-radius: var(--input-border-radius);\n}\n.barcode-wrapper[_ngcontent-%COMP%]   .scanner-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: var(--ion-color-primary);\n}\n\n.elegant-input[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%], .elegant-input[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {\n  --background: var(--ion-color-step-50, #fafafa);\n  --border-width: 1px;\n  --border-color: rgba(var(--ion-color-primary-rgb), 0.2);\n  --color: var(--ion-text-color);\n  --placeholder-color: var(--ion-color-medium);\n  --padding-start: 16px;\n  --padding-end: 16px;\n  font-weight: 500;\n}\n.elegant-input[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]:focus-within, .elegant-input[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%]:focus-within {\n  --border-color: var(--ion-color-primary);\n  --background: var(--ion-item-background);\n}\n.elegant-input[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: var(--ion-text-color);\n  margin-bottom: 4px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  max-width: 100%;\n}\n.elegant-input[_ngcontent-%COMP%]   .input-icon[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n  font-size: 1.2rem;\n  margin-right: 8px;\n}\n.elegant-input[_ngcontent-%COMP%]   .unit-label[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--ion-color-secondary);\n  font-weight: 600;\n  margin-left: 8px;\n}\n\n.calories-section[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n  width: 100%;\n}\n.calories-section[_ngcontent-%COMP%]   .calories-input[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n.calories-section[_ngcontent-%COMP%]   .calories-input[_ngcontent-%COMP%]   .custom-label[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: White;\n  margin-bottom: 0;\n  flex: 1;\n}\n.calories-section[_ngcontent-%COMP%]   .calories-input[_ngcontent-%COMP%]   .custom-label[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.3rem;\n  margin-right: 8px;\n  color: var(--ion-color-primary);\n}\n.calories-section[_ngcontent-%COMP%]   .calories-input[_ngcontent-%COMP%]   .calories-wrapper[_ngcontent-%COMP%] {\n  flex: 0 0 180px;\n  min-width: 180px;\n  border: 1px solid var(--ion-color-primary) !important;\n  align-items: stretch;\n}\n.calories-section[_ngcontent-%COMP%]   .calories-input[_ngcontent-%COMP%]   .calories-wrapper[_ngcontent-%COMP%]   .calories-value[_ngcontent-%COMP%] {\n  font-size: 1.4rem !important;\n  font-weight: 700;\n  color: var(--ion-color-primary) !important;\n}\n.calories-section[_ngcontent-%COMP%]   .calories-input[_ngcontent-%COMP%]   .calories-wrapper[_ngcontent-%COMP%]   .primary-unit[_ngcontent-%COMP%] {\n  background: var(--ion-color-primary) !important;\n  color: var(--ion-color-primary-contrast) !important;\n  font-weight: 700;\n  font-size: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  align-self: stretch;\n  padding: 0 16px;\n  border-left: 1px solid var(--ion-color-primary);\n}\n\n@media (min-width: 768px) {\n  .calories-section[_ngcontent-%COMP%]   .calories-input[_ngcontent-%COMP%]   .calories-wrapper[_ngcontent-%COMP%] {\n    flex: 0 0 200px;\n    min-width: 200px;\n  }\n}\n@media (min-width: 1024px) {\n  .calories-section[_ngcontent-%COMP%]   .calories-input[_ngcontent-%COMP%]   .calories-wrapper[_ngcontent-%COMP%] {\n    flex: 0 0 220px;\n    min-width: 220px;\n  }\n}\n@media (max-width: 480px) {\n  .calories-section[_ngcontent-%COMP%]   .calories-input[_ngcontent-%COMP%]   .calories-wrapper[_ngcontent-%COMP%] {\n    flex: 0 0 160px;\n    min-width: 160px;\n  }\n}\n.macros-section[_ngcontent-%COMP%]   .macros-header[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.macros-section[_ngcontent-%COMP%]   .macros-header[_ngcontent-%COMP%]   .macros-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 1rem;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n.macros-section[_ngcontent-%COMP%]   .macros-header[_ngcontent-%COMP%]   .macros-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: var(--text-secondary);\n}\n.macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 12px;\n}\n.macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}\n.macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .custom-label[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  min-width: 0;\n}\n.macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%] {\n  flex: 0 0 180px;\n  min-width: 180px;\n}\n.macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   .custom-input[_ngcontent-%COMP%] {\n  text-align: right;\n  --padding-end: 12px;\n  --padding-start: 12px;\n  font-size: 1.1rem !important;\n  font-weight: 600 !important;\n  color: var(--text-primary) !important;\n}\n.macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .saturated-fat-macro[_ngcontent-%COMP%], .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .sugars-macro[_ngcontent-%COMP%] {\n  grid-column: span 1;\n}\n.macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .saturated-fat-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%], .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .sugars-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%] {\n  max-width: 100%;\n  margin-left: 20px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .saturated-fat-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .custom-label[_ngcontent-%COMP%], .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .sugars-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .custom-label[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--text-secondary);\n  font-weight: 500;\n  flex: 1;\n  display: flex;\n  align-items: center;\n  min-width: 0;\n}\n.macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .saturated-fat-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .custom-label[_ngcontent-%COMP%]   .macro-dot[_ngcontent-%COMP%], .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .sugars-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .custom-label[_ngcontent-%COMP%]   .macro-dot[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n}\n.macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .saturated-fat-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%], .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .sugars-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%] {\n  flex: 0 0 140px;\n  min-width: 140px;\n}\n.macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .saturated-fat-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   .custom-input[_ngcontent-%COMP%], .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .sugars-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   .custom-input[_ngcontent-%COMP%] {\n  font-size: 0.9rem !important;\n  font-weight: 600 !important;\n  text-align: right;\n  --padding-end: 8px;\n  --padding-start: 8px;\n  color: var(--text-primary) !important;\n}\n.macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .saturated-fat-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   .input-unit[_ngcontent-%COMP%], .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .sugars-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]   .input-unit[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  padding: 14px 12px 12px 4px;\n  min-width: 32px;\n  text-align: center;\n}\n@media (min-width: 768px) {\n  .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%] {\n    flex: 0 0 200px;\n    min-width: 200px;\n  }\n  .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .saturated-fat-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%], .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .sugars-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%] {\n    margin-left: 20px;\n    gap: 8px;\n  }\n  .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .saturated-fat-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%], .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .sugars-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%] {\n    flex: 0 0 160px;\n    min-width: 160px;\n  }\n}\n@media (min-width: 1024px) {\n  .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%] {\n    flex: 0 0 220px;\n    min-width: 220px;\n  }\n  .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .saturated-fat-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%], .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .sugars-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%] {\n    margin-left: 20px;\n    gap: 8px;\n  }\n  .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .saturated-fat-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%], .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .sugars-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%] {\n    flex: 0 0 180px;\n    min-width: 180px;\n  }\n}\n@media (max-width: 480px) {\n  .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%] {\n    flex: 0 0 160px;\n    min-width: 160px;\n  }\n  .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .saturated-fat-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%], .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .sugars-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%] {\n    margin-left: 16px;\n    gap: 6px;\n  }\n  .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .saturated-fat-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%], .macros-section[_ngcontent-%COMP%]   .macros-grid[_ngcontent-%COMP%]   .sugars-macro[_ngcontent-%COMP%]   .custom-input-container[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%] {\n    flex: 0 0 120px;\n    min-width: 120px;\n  }\n}\n\n.macro-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  margin-right: 4px;\n}\n\n.fat-dot[_ngcontent-%COMP%] {\n  background-color: var(--ion-color-secondary);\n}\n\n.carbs-dot[_ngcontent-%COMP%] {\n  background-color: var(--ion-color-success);\n}\n\n.protein-dot[_ngcontent-%COMP%] {\n  background-color: var(--ion-color-alternative);\n}\n\n.fiber-dot[_ngcontent-%COMP%] {\n  background-color: #96ceb4;\n}\n\n.saturated-fat-dot[_ngcontent-%COMP%] {\n  background-color: #ff8a80;\n}\n\n.sugars-dot[_ngcontent-%COMP%] {\n  background-color: #ffb74d;\n}\n\n.secondary-unit[_ngcontent-%COMP%] {\n  background: rgba(37, 37, 37, 0.3) !important;\n  color: var(--text-secondary) !important;\n}\n\n.action-section[_ngcontent-%COMP%] {\n  margin-top: 20px;\n}\n.action-section[_ngcontent-%COMP%]   .save-button[_ngcontent-%COMP%] {\n  --border-radius: var(--border-radius);\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n  font-weight: 600;\n  font-size: 1rem;\n}\n.action-section[_ngcontent-%COMP%]   .save-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n\n.info-card[_ngcontent-%COMP%], .nutrition-card[_ngcontent-%COMP%], .quantities-card[_ngcontent-%COMP%], .additional-nutrition-card[_ngcontent-%COMP%] {\n  background: #141414 !important;\n  border: 1px solid #252525 !important;\n  border-left: none !important;\n}\n\n.create-product-footer[_ngcontent-%COMP%] {\n  --background: #141414;\n  background: #141414;\n  border-top: 1px solid rgba(var(--ion-color-primary-rgb), 0.2);\n}\n.create-product-footer[_ngcontent-%COMP%]   .footer-content[_ngcontent-%COMP%] {\n  max-width: 600px;\n  margin: 0 auto;\n  padding: 12px 16px calc(12px + var(--ion-safe-area-bottom, 0px));\n}\n.create-product-footer[_ngcontent-%COMP%]   .footer-content[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --background: var(--ion-color-primary);\n  --color: var(--ion-color-primary-contrast);\n  font-weight: 600;\n  font-size: 1rem;\n  height: 48px;\n  margin: 0;\n}\n.create-product-footer[_ngcontent-%COMP%]   .footer-content[_ngcontent-%COMP%]   ion-button.button-disabled[_ngcontent-%COMP%] {\n  --background: var(--ion-color-medium);\n  --color: var(--ion-color-medium-contrast);\n}\n.create-product-footer[_ngcontent-%COMP%]   .footer-content[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   .loading-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.create-product-footer[_ngcontent-%COMP%]   .footer-content[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   .loading-content[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  --color: var(--ion-color-primary-contrast);\n}\n.create-product-footer[_ngcontent-%COMP%]   .footer-content[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]   .loading-content[_ngcontent-%COMP%]   .loading-text[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n.create-product-footer[_ngcontent-%COMP%]   .footer-content[_ngcontent-%COMP%]   .save-progress[_ngcontent-%COMP%] {\n  height: 3px;\n  margin-top: 8px;\n  --background: rgba(var(--ion-color-primary-rgb), 0.18);\n  --progress-background: var(--ion-color-primary);\n}\n\n.input-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n}\n@media (min-width: 768px) {\n  .input-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n.nutrition-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\n@media (min-width: 768px) {\n  .nutrition-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (min-width: 1024px) {\n  .nutrition-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(3, 1fr);\n  }\n}\n\n.quantities-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 16px;\n}\n@media (min-width: 768px) {\n  .quantities-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n.additional-grid[_ngcontent-%COMP%] {\n  display: grid;\n  gap: 12px;\n}\n@media (min-width: 768px) {\n  .additional-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n\n.create-button[_ngcontent-%COMP%] {\n  --background: var(--ion-color-primary);\n  --color: var(--ion-color-primary-contrast);\n  font-weight: 600;\n  font-size: 1rem;\n  height: 48px;\n  margin: 0;\n}\n.create-button.button-disabled[_ngcontent-%COMP%] {\n  --background: var(--ion-color-medium);\n  --color: var(--ion-color-medium-contrast);\n}\n.create-button[_ngcontent-%COMP%]   .button-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 600;\n}\n.create-button[_ngcontent-%COMP%]   .button-content[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n}\n\n.nutrition-input[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n}\n\nion-card-content[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n\n.dark-theme[_ngcontent-%COMP%]   ion-card[_ngcontent-%COMP%] {\n  background: #141414 !important;\n  border: 1px solid #252525 !important;\n}\n.dark-theme[_ngcontent-%COMP%]   .product-header-card[_ngcontent-%COMP%], .dark-theme[_ngcontent-%COMP%]   .nutrition-card[_ngcontent-%COMP%], .dark-theme[_ngcontent-%COMP%]   .additional-info-card[_ngcontent-%COMP%] {\n  background: #141414 !important;\n  border: 1px solid #252525 !important;\n}\n.dark-theme[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%] {\n  background: #141414 !important;\n  border: 1px solid #252525 !important;\n}\n.dark-theme[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--ion-color-primary) !important;\n}\n.dark-theme[_ngcontent-%COMP%]   .input-unit[_ngcontent-%COMP%] {\n  background: rgba(37, 37, 37, 0.3) !important;\n  border-left: 1px solid #252525 !important;\n}\n.dark-theme[_ngcontent-%COMP%]   .elegant-input[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%], .dark-theme[_ngcontent-%COMP%]   .elegant-input[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {\n  --background: #141414 !important;\n  --border-color: #252525 !important;\n}\n.dark-theme[_ngcontent-%COMP%]   .elegant-input[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]:focus-within, .dark-theme[_ngcontent-%COMP%]   .elegant-input[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%]:focus-within {\n  --background: #141414 !important;\n}\n\n@media (max-width: 768px) {\n  .create-product-page[_ngcontent-%COMP%] {\n    --padding-start: 8px;\n    --padding-end: 8px;\n  }\n  .custom-input-container[_ngcontent-%COMP%] {\n    margin-bottom: 12px;\n  }\n  .macros-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.text-info-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n\n.text-info-card[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.03);\n  border: 1px solid #252525;\n  border-radius: 12px;\n  overflow: hidden;\n}\n.text-info-card[_ngcontent-%COMP%]   .text-info-header[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  padding: 8px 16px;\n  border-bottom: 1px solid #252525;\n}\n.text-info-card[_ngcontent-%COMP%]   .text-info-header[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 700;\n  color: white;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.text-info-card[_ngcontent-%COMP%]   .custom-info-textarea[_ngcontent-%COMP%] {\n  --background: transparent;\n  --color: #b0b0b0;\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 12px;\n  --padding-bottom: 12px;\n  font-size: 0.9rem;\n  line-height: 1.4;\n}\n\n.section-subtitle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 1rem;\n  font-weight: 700;\n  color: white;\n  margin: 20px 0 12px 0;\n}\n.section-subtitle[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n}\n\n.dietary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 10px;\n  margin-bottom: 20px;\n}\n\n.dietary-option[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: #1a1a1a;\n  border: 1px solid #333;\n  border-radius: 10px;\n  padding: 12px;\n  transition: all 0.2s ease;\n  cursor: pointer;\n}\n.dietary-option[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: #666;\n}\n.dietary-option[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  font-weight: 600;\n  color: #b0b0b0;\n}\n.dietary-option.active[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-primary-rgb), 0.1);\n  border-color: var(--ion-color-primary);\n}\n.dietary-option.active[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n}\n.dietary-option.active[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  color: white;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL2RpZXRzL2NvbXBvbmVudHMvbWVhbC9jb21wb25lbnRzL3NlYXJjaC1mb29kcy9jb21wb25lbnRzL2NyZWF0ZS1wcm9kdWN0L2NyZWF0ZS1wcm9kdWN0LnBhZ2Uuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQTtFQUNFLHFCQUFBO0VBQ0Esa0RBQUE7RUFDQSxtREFBQTtFQUNBLDJCQUFBO0VBQ0EsMEJBQUE7RUFDQSwwQkFBQTtFQUNBLHNCQUFBO0VBQ0EsdUJBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0FBQUY7O0FBS0E7RUFDRSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLHFCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxTQUFBO0FBRkY7QUFJRTtFQUNFLGlCQUFBO0FBRko7O0FBTUE7RUFDRSxpQ0FBQTtFQUNBLHNEQUFBO0VBQ0EsZ0VBQUE7QUFIRjs7QUFPQTtFQUNFLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EscUJBQUE7QUFKRjs7QUFRQTtFQUNFLGFBQUE7QUFMRjtBQU9FO0VBQ0Usc0JBQUE7QUFMSjtBQU9JO0VBQ0Usb0JBQUE7QUFMTjtBQVVFO0VBQ0UsYUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQVJKO0FBWUk7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7QUFWTjs7QUFnQkE7OztFQUdFLDhCQUFBO0VBQ0Esb0NBQUE7RUFDQSxtQ0FBQTtFQUNBLG1DQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtBQWJGO0FBZUU7OztFQUNFLGFBQUE7RUFDQSxrQ0FBQTtBQVhKO0FBY0U7OztFQUNFLG1CQUFBO0VBQ0Esa0NBQUE7QUFWSjs7QUFlQTtFQUNFLGNBQUE7RUFDQSw4QkFBQTtFQUNBLG9DQUFBO0FBWkY7QUFjRTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsMkJBQUE7QUFaSjtBQWNJO0VBQ0UsaUJBQUE7RUFDQSwrQkFBQTtBQVpOO0FBZ0JFO0VBQ0Usa0JBQUE7RUFDQSw4QkFBQTtFQUNBLFNBQUE7RUFDQSx3QkFBQTtFQUNBLGtCQUFBO0FBZEo7O0FBbUJBOztFQUVFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsMEJBQUE7QUFoQkY7QUFrQkU7O0VBQ0UsaUJBQUE7RUFDQSw0QkFBQTtBQWZKO0FBa0JFOztFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSx3QkFBQTtBQWZKOztBQW9CQTtFQUNFLG1CQUFBO0VBQ0Esa0JBQUE7QUFqQkY7O0FBcUJBO0VBQ0UsdUJBQUE7QUFsQkY7QUFvQkU7RUFDRSx5QkFBQTtFQUNBLCtCQUFBO0VBQ0EsNkJBQUE7RUFDQSxtQ0FBQTtFQUNBLGlCQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtBQWxCSjtBQXFCRTtFQUNFLGdCQUFBO0FBbkJKOztBQXlCRTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0FBdEJKO0FBd0JJO0VBQ0UsZ0JBQUE7RUFDQSxPQUFBO0FBdEJOO0FBeUJJO0VBQ0UsWUFBQTtFQUNBLGVBQUE7QUF2Qk47O0FBNEJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLDBCQUFBO0FBekJGO0FBMkJFO0VBQ0UsZUFBQTtFQUNBLDRCQUFBO0FBekJKOztBQTZCQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG9CQUFBO0VBQ0Esa0NBQUE7RUFDQSxvQ0FBQTtFQUNBLHlDQUFBO0VBQ0EsNkJBQUE7RUFDQSxnQkFBQTtBQTFCRjtBQTRCRTtFQUNFLHNDQUFBO0FBMUJKOztBQThCQTtFQUNFLHlCQUFBO0VBQ0EsNEJBQUE7RUFDQSxzQ0FBQTtFQUNBLHFCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsT0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0FBM0JGOztBQThCQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0VBQ0EsaUNBQUE7RUFDQSx5Q0FBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQTNCRjs7QUErQkE7RUFDRSxvQkFBQTtBQTVCRjtBQThCRTtFQUNFLHNEQUFBO0VBQ0EsZ0VBQUE7RUFDQSxpQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSx5Q0FBQTtFQUNBLHlCQUFBO0VBQ0EsNEJBQUE7RUFDQSxtREFBQTtFQUNBLHNEQUFBO0FBNUJKO0FBOEJJO0VBQ0UsaUJBQUE7RUFDQSwrQkFBQTtBQTVCTjs7QUFvQ0U7O0VBRUUsK0NBQUE7RUFDQSxtQkFBQTtFQUNBLHVEQUFBO0VBQ0EsOEJBQUE7RUFDQSw0Q0FBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtBQWpDSjtBQW1DSTs7RUFDRSx3Q0FBQTtFQUNBLHdDQUFBO0FBaENOO0FBb0NFO0VBQ0UsZ0JBQUE7RUFDQSw0QkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtBQWxDSjtBQXFDRTtFQUNFLCtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxpQkFBQTtBQW5DSjtBQXNDRTtFQUNFLGlCQUFBO0VBQ0EsaUNBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FBcENKOztBQXlDQTtFQUNFLG1CQUFBO0VBQ0EsV0FBQTtBQXRDRjtBQXdDRTtFQUNFLFdBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsU0FBQTtBQXRDSjtBQXdDSTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxPQUFBO0FBdENOO0FBd0NNO0VBQ0UsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLCtCQUFBO0FBdENSO0FBMENJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EscURBQUE7RUFDQSxvQkFBQTtBQXhDTjtBQTBDTTtFQUNFLDRCQUFBO0VBQ0EsZ0JBQUE7RUFDQSwwQ0FBQTtBQXhDUjtBQTJDTTtFQUNFLCtDQUFBO0VBQ0EsbURBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLCtDQUFBO0FBekNSOztBQWdEQTtFQUNFO0lBQ0UsZUFBQTtJQUNBLGdCQUFBO0VBN0NGO0FBQ0Y7QUFnREE7RUFDRTtJQUNFLGVBQUE7SUFDQSxnQkFBQTtFQTlDRjtBQUNGO0FBaURBO0VBQ0U7SUFDRSxlQUFBO0lBQ0EsZ0JBQUE7RUEvQ0Y7QUFDRjtBQW9ERTtFQUNFLG1CQUFBO0FBbERKO0FBb0RJO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLDBCQUFBO0FBbEROO0FBb0RNO0VBQ0UsaUJBQUE7RUFDQSw0QkFBQTtBQWxEUjtBQXVERTtFQUNFLGFBQUE7RUFDQSwwQkFBQTtFQUNBLFNBQUE7QUFyREo7QUF3RE07RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLFNBQUE7QUF0RFI7QUF3RFE7RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtBQXREVjtBQXlEUTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQXZEVjtBQXlEVTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLDRCQUFBO0VBQ0EsMkJBQUE7RUFDQSxxQ0FBQTtBQXZEWjtBQThESTs7RUFFRSxtQkFBQTtBQTVETjtBQThETTs7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBM0RSO0FBNkRROztFQUNFLGlCQUFBO0VBQ0EsNEJBQUE7RUFDQSxnQkFBQTtFQUNBLE9BQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0FBMURWO0FBNERVOztFQUNFLFVBQUE7RUFDQSxXQUFBO0FBekRaO0FBNkRROztFQUNFLGVBQUE7RUFDQSxnQkFBQTtBQTFEVjtBQTREVTs7RUFDRSw0QkFBQTtFQUNBLDJCQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EscUNBQUE7QUF6RFo7QUE0RFU7O0VBQ0UsaUJBQUE7RUFDQSwyQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQXpEWjtBQWdFSTtFQUdNO0lBQ0UsZUFBQTtJQUNBLGdCQUFBO0VBaEVWO0VBdUVNOztJQUNFLGlCQUFBO0lBQ0EsUUFBQTtFQXBFUjtFQXNFUTs7SUFDRSxlQUFBO0lBQ0EsZ0JBQUE7RUFuRVY7QUFDRjtBQXdFSTtFQUdNO0lBQ0UsZUFBQTtJQUNBLGdCQUFBO0VBeEVWO0VBK0VNOztJQUNFLGlCQUFBO0lBQ0EsUUFBQTtFQTVFUjtFQThFUTs7SUFDRSxlQUFBO0lBQ0EsZ0JBQUE7RUEzRVY7QUFDRjtBQWdGSTtFQUdNO0lBQ0UsZUFBQTtJQUNBLGdCQUFBO0VBaEZWO0VBdUZNOztJQUNFLGlCQUFBO0lBQ0EsUUFBQTtFQXBGUjtFQXNGUTs7SUFDRSxlQUFBO0lBQ0EsZ0JBQUE7RUFuRlY7QUFDRjs7QUEyRkE7RUFDRSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUF4RkY7O0FBMkZBO0VBQ0UsNENBQUE7QUF4RkY7O0FBMkZBO0VBQ0UsMENBQUE7QUF4RkY7O0FBMkZBO0VBQ0UsOENBQUE7QUF4RkY7O0FBMkZBO0VBQ0UseUJBQUE7QUF4RkY7O0FBMkZBO0VBQ0UseUJBQUE7QUF4RkY7O0FBMkZBO0VBQ0UseUJBQUE7QUF4RkY7O0FBNEZBO0VBQ0UsNENBQUE7RUFDQSx1Q0FBQTtBQXpGRjs7QUE2RkE7RUFDRSxnQkFBQTtBQTFGRjtBQTRGRTtFQUNFLHFDQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQTFGSjtBQTRGSTtFQUNFLGlCQUFBO0FBMUZOOztBQWdHQTs7OztFQUlFLDhCQUFBO0VBQ0Esb0NBQUE7RUFDQSw0QkFBQTtBQTdGRjs7QUFpR0E7RUFDRSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsNkRBQUE7QUE5RkY7QUFnR0U7RUFDRSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxnRUFBQTtBQTlGSjtBQWdHSTtFQUNFLHNDQUFBO0VBQ0EsMENBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsU0FBQTtBQTlGTjtBQWdHTTtFQUNFLHFDQUFBO0VBQ0EseUNBQUE7QUE5RlI7QUFpR007RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBL0ZSO0FBaUdRO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSwwQ0FBQTtBQS9GVjtBQWtHUTtFQUNFLGlCQUFBO0FBaEdWO0FBcUdJO0VBQ0UsV0FBQTtFQUNBLGVBQUE7RUFDQSxzREFBQTtFQUNBLCtDQUFBO0FBbkdOOztBQXlHQTtFQUNFLGFBQUE7RUFDQSxTQUFBO0FBdEdGO0FBd0dFO0VBSkY7SUFLSSwwQkFBQTtFQXJHRjtBQUNGOztBQXdHQTtFQUNFLGFBQUE7RUFDQSxTQUFBO0FBckdGO0FBdUdFO0VBSkY7SUFLSSxxQ0FBQTtFQXBHRjtBQUNGO0FBc0dFO0VBUkY7SUFTSSxxQ0FBQTtFQW5HRjtBQUNGOztBQXNHQTtFQUNFLGFBQUE7RUFDQSxTQUFBO0FBbkdGO0FBcUdFO0VBSkY7SUFLSSxxQ0FBQTtFQWxHRjtBQUNGOztBQXFHQTtFQUNFLGFBQUE7RUFDQSxTQUFBO0FBbEdGO0FBb0dFO0VBSkY7SUFLSSxxQ0FBQTtFQWpHRjtBQUNGOztBQXFHQTtFQUNFLHNDQUFBO0VBQ0EsMENBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0EsU0FBQTtBQWxHRjtBQW9HRTtFQUNFLHFDQUFBO0VBQ0EseUNBQUE7QUFsR0o7QUFxR0U7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsZ0JBQUE7QUFuR0o7QUFxR0k7RUFDRSxpQkFBQTtBQW5HTjs7QUEwR0U7RUFDRSxpQkFBQTtBQXZHSjs7QUE0R0E7RUFDRSxhQUFBO0FBekdGOztBQWlIRTtFQUNFLDhCQUFBO0VBQ0Esb0NBQUE7QUE5R0o7QUFpSEU7OztFQUdFLDhCQUFBO0VBQ0Esb0NBQUE7QUEvR0o7QUFrSEU7RUFDRSw4QkFBQTtFQUNBLG9DQUFBO0FBaEhKO0FBa0hJO0VBQ0UsaURBQUE7QUFoSE47QUFvSEU7RUFDRSw0Q0FBQTtFQUNBLHlDQUFBO0FBbEhKO0FBdUhJOztFQUVFLGdDQUFBO0VBQ0Esa0NBQUE7QUFySE47QUF1SE07O0VBQ0UsZ0NBQUE7QUFwSFI7O0FBMkhBO0VBQ0U7SUFDRSxvQkFBQTtJQUNBLGtCQUFBO0VBeEhGO0VBMkhBO0lBQ0UsbUJBQUE7RUF6SEY7RUE0SEE7SUFDRSwwQkFBQTtFQTFIRjtBQUNGO0FBOEhBO0VBQ0UsYUFBQTtFQUNBLDBCQUFBO0VBQ0EsU0FBQTtBQTVIRjs7QUErSEE7RUFDRSxxQ0FBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtBQTVIRjtBQThIRTtFQUNFLHFDQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQ0FBQTtBQTVISjtBQThISTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtBQTVITjtBQWdJRTtFQUNFLHlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUE5SEo7O0FBbUlBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxxQkFBQTtBQWhJRjtBQWtJRTtFQUNFLCtCQUFBO0FBaElKOztBQW9JQTtFQUNFLGFBQUE7RUFDQSxxQ0FBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtBQWpJRjs7QUFvSUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLHlCQUFBO0VBQ0EsZUFBQTtBQWpJRjtBQW1JRTtFQUNFLGlCQUFBO0VBQ0EsV0FBQTtBQWpJSjtBQW9JRTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBbElKO0FBcUlFO0VBQ0UsbURBQUE7RUFDQSxzQ0FBQTtBQW5JSjtBQXFJSTtFQUNFLCtCQUFBO0FBbklOO0FBc0lJO0VBQ0UsWUFBQTtBQXBJTiIsInNvdXJjZXNDb250ZW50IjpbIi8vIFZhcmlhYmxlcyBsb2NhbGVzIC0gQWp1c3RhZGFzIHBhcmEgbcODwrN2aWwgY29uIGNvbG9yZXMgbW9kZXJub3Ncbjpob3N0IHtcbiAgLS1ib3JkZXItcmFkaXVzOiAxMnB4O1xuICAtLXNoYWRvdy1lbGV2YXRpb246IDAgNHB4IDE2cHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcbiAgLS10cmFuc2l0aW9uOiBhbGwgMC4zcyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpO1xuICAtLWlucHV0LWJvcmRlci1yYWRpdXM6IDEycHg7XG4gIC0taW5wdXQtcGFkZGluZzogMTJweCAxNnB4O1xuICAtLWNhcmQtYmFja2dyb3VuZDogIzE0MTQxNDtcbiAgLS1jYXJkLWJvcmRlcjogIzI1MjUyNTtcbiAgLS10ZXh0LXByaW1hcnk6ICNmZmZmZmY7XG4gIC0tdGV4dC1zZWNvbmRhcnk6ICNiMGIwYjA7XG4gIC0tdGV4dC1tdXRlZDogIzg4ODg4ODtcbn1cblxuXG4vLyBFc3RpbG9zIHBhcmEgYm90b25lcyBkZSBhY2Npw4PCs24gKGNvcGlhZG9zIGRlIGN1cnJlbnQtd29ya291dClcbi5hY3Rpb24tYnRuIHtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxNHB4O1xuICAtLXBhZGRpbmctZW5kOiAxNHB4O1xuICAtLXBhZGRpbmctdG9wOiAxNHB4O1xuICAtLXBhZGRpbmctYm90dG9tOiAxNHB4O1xuICAtLWJvcmRlci1yYWRpdXM6IDE0cHg7XG4gIHdpZHRoOiA0NXB4O1xuICBoZWlnaHQ6IDQ1cHg7XG4gIG1hcmdpbjogMDtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxLjNyZW07XG4gIH1cbn1cblxuLm5vdGUtYnRuIHtcbiAgLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAtLWJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4xNSk7XG4gIC0tYmFja2dyb3VuZC1hY3RpdmF0ZWQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4yNSk7XG59XG5cbi8vIENvbnRlbmlkbyBwcmluY2lwYWxcbi5jcmVhdGUtcHJvZHVjdC1wYWdlIHtcbiAgLS1wYWRkaW5nLXRvcDogOHB4O1xuICAtLXBhZGRpbmctYm90dG9tOiA4cHg7XG4gIC0tcGFkZGluZy1zdGFydDogMTJweDtcbiAgLS1wYWRkaW5nLWVuZDogMTJweDtcbiAgLS1iYWNrZ3JvdW5kOiAjMGEwYTBhO1xufVxuXG4vLyBDb250ZW50IHN0eWxlc1xuLmVsZWdhbnQtY29udGVudCB7XG4gIHBhZGRpbmc6IDE2cHg7XG5cbiAgJi5oYXMtc2F2ZS1mb290ZXIge1xuICAgIC0tcGFkZGluZy1ib3R0b206IDg4cHg7XG5cbiAgICAuZm9ybS1jb250YWluZXIge1xuICAgICAgcGFkZGluZy1ib3R0b206IDk2cHg7XG4gICAgfVxuICB9XG5cbiAgLy8gRm9ybSBjb250YWluZXJcbiAgLmZvcm0tY29udGFpbmVyIHtcbiAgICBwYWRkaW5nOiAyMHB4O1xuICAgIG1heC13aWR0aDogNjAwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gIH1cblxuICAuZWxlZ2FudC1mb3JtIHtcbiAgICAuZm9ybS1zZWN0aW9ucyB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICB9XG4gIH1cbn1cblxuLy8gVGFyamV0YXMgcHJpbmNpcGFsZXNcbi5wcm9kdWN0LWhlYWRlci1jYXJkLFxuLm51dHJpdGlvbi1jYXJkLFxuLmFkZGl0aW9uYWwtaW5mby1jYXJkIHtcbiAgYmFja2dyb3VuZDogIzE0MTQxNCAhaW1wb3J0YW50O1xuICBib3JkZXI6IDFweCBzb2xpZCAjMjUyNTI1ICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLWJvcmRlci1yYWRpdXMpO1xuICBib3gtc2hhZG93OiB2YXIoLS1zaGFkb3ctZWxldmF0aW9uKTtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICBpb24tY2FyZC1jb250ZW50IHtcbiAgICBwYWRkaW5nOiAxNnB4O1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gIH1cblxuICBpb24tY2FyZC1oZWFkZXIge1xuICAgIHBhZGRpbmctYm90dG9tOiA2cHg7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgfVxufVxuXG4vLyBDYXJkIHN0eWxlc1xuaW9uLWNhcmQge1xuICBtYXJnaW46IDE2cHggMDtcbiAgYmFja2dyb3VuZDogIzE0MTQxNCAhaW1wb3J0YW50O1xuICBib3JkZXI6IDFweCBzb2xpZCAjMjUyNTI1ICFpbXBvcnRhbnQ7XG5cbiAgLmNhcmQtdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi10ZXh0LWNvbG9yKTtcbiAgICBtYXJnaW46IDA7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogOHB4O1xuICAgIHBhZGRpbmc6IDE2cHggMTZweCA4cHggMTZweDtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4zcmVtO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICB9XG4gIH1cblxuICAuY2FyZC1ub3RlIHtcbiAgICBmb250LXNpemU6IDAuODVyZW07XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwIDE2cHggOHB4IDQwcHg7XG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xuICB9XG59XG5cbi8vIFTDg8KtdHVsb3MgZGUgdGFyamV0YXNcbi5jYXJkLXRpdGxlLFxuLm51dHJpdGlvbi10aXRsZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNnB4O1xuICBmb250LXNpemU6IDEuMXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRleHQtcHJpbWFyeSk7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gIH1cblxuICBpb24tbm90ZSB7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG4gICAgZm9udC1zaXplOiAwLjc1cmVtO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcbiAgfVxufVxuXG4vLyBJbnB1dHMgcGVyc29uYWxpemFkb3MgLSBNw4PCoXMgY29tcGFjdG9zIGNvbiBkaXNlw4PCsW8gbW9kZXJub1xuLmN1c3RvbS1pbnB1dC1jb250YWluZXIge1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG5cbi8vIEVzdGlsb3MgcGFyYSBlbCBhY29yZGXDg8KzbiAoRXN0aWxvIGlndWFsIGEgYWRkLXByb2R1Y3QpXG5pb24tYWNjb3JkaW9uIHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG5cbiAgaW9uLWl0ZW1bc2xvdD1cImhlYWRlclwiXSB7XG4gICAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAtLWJhY2tncm91bmQtaG92ZXI6IHRyYW5zcGFyZW50O1xuICAgIC0tYmFja2dyb3VuZC1ob3Zlci1vcGFjaXR5OiAwO1xuICAgIC0tYmFja2dyb3VuZC1hY3RpdmF0ZWQ6IHRyYW5zcGFyZW50O1xuICAgIC0tYm9yZGVyLXdpZHRoOiAwO1xuICAgIC0taW5uZXItcGFkZGluZy1lbmQ6IDE2cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgfVxuXG4gIC5pb24tcGFkZGluZyB7XG4gICAgLS1wYWRkaW5nLXRvcDogMDtcbiAgfVxufVxuXG4vLyBTb2JyZWVzY3JpYmlyIGNvbmZpZ3VyYWNpb25lcyBxdWUgcm9tcGVuIGxhIGFsaW5lYWNpw4PCs24gaG9yaXpvbnRhbCBlbiBlbCBhY29yZGXDg8KzblxuaW9uLWFjY29yZGlvblt2YWx1ZT1cImFkZGl0aW9uYWwtaW5mb1wiXSB7XG4gIC5jdXN0b20taW5wdXQtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbi1ib3R0b206IDEycHg7XG5cbiAgICAuY3VzdG9tLWxhYmVsIHtcbiAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICBmbGV4OiAxO1xuICAgIH1cblxuICAgIC5pbnB1dC13cmFwcGVyIHtcbiAgICAgIHdpZHRoOiAxODBweDsgLy8gQ29oZXJlbnRlIGNvbiBhZGQtcHJvZHVjdFxuICAgICAgZmxleDogMCAwIDE4MHB4O1xuICAgIH1cbiAgfVxufVxuXG4uY3VzdG9tLWxhYmVsIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG4gIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gIH1cbn1cblxuLmlucHV0LXdyYXBwZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1jYXJkLWJhY2tncm91bmQpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1jYXJkLWJvcmRlcik7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLWlucHV0LWJvcmRlci1yYWRpdXMpO1xuICB0cmFuc2l0aW9uOiB2YXIoLS10cmFuc2l0aW9uKTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAmOmZvY3VzLXdpdGhpbiB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIH1cbn1cblxuLmN1c3RvbS1pbnB1dCB7XG4gIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIC0tY29sb3I6IHZhcigtLXRleHQtcHJpbWFyeSk7XG4gIC0tcGxhY2Vob2xkZXItY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1xuICAtLXBhZGRpbmctc3RhcnQ6IDE2cHg7XG4gIC0tcGFkZGluZy1lbmQ6IDA7XG4gIC0tcGFkZGluZy10b3A6IDEycHg7XG4gIC0tcGFkZGluZy1ib3R0b206IDEycHg7XG4gIGZsZXg6IDE7XG4gIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgYm9yZGVyOiBub25lO1xufVxuXG4uaW5wdXQtdW5pdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1zZWxmOiBzdHJldGNoO1xuICBwYWRkaW5nOiAwIDEycHg7XG4gIGZvbnQtc2l6ZTogMC44cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuICBiYWNrZ3JvdW5kOiByZ2JhKDM3LCAzNywgMzcsIDAuMyk7XG4gIGJvcmRlci1sZWZ0OiAxcHggc29saWQgdmFyKC0tY2FyZC1ib3JkZXIpO1xuICBtaW4td2lkdGg6IDMycHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLy8gU2Nhbm5lciBpbnB1dDogdmlzdWFsIGNvbW8gdW5pZGFkIGFjb3BsYWRhIChzaW4gcmFkaW8gZW4gbGFkbyBpenF1aWVyZG8pXG4uYmFyY29kZS13cmFwcGVyIHtcbiAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG5cbiAgLnNjYW5uZXItYnV0dG9uIHtcbiAgICAtLWJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4xNSk7XG4gICAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjI1KTtcbiAgICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgLS1ib3JkZXItcmFkaXVzOiAwO1xuICAgIG1hcmdpbjogMDtcbiAgICB3aWR0aDogNDZweDtcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgYWxpZ24tc2VsZjogc3RyZXRjaDtcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkIHZhcigtLWNhcmQtYm9yZGVyKTtcbiAgICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAwO1xuICAgIGJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXM6IDA7XG4gICAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IHZhcigtLWlucHV0LWJvcmRlci1yYWRpdXMpO1xuICAgIGJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzOiB2YXIoLS1pbnB1dC1ib3JkZXItcmFkaXVzKTtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICB9XG4gIH1cbn1cblxuLy8gSW5wdXQgc3R5bGVzXG4uZWxlZ2FudC1pbnB1dCB7XG5cbiAgaW9uLWlucHV0LFxuICBpb24tc2VsZWN0IHtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zdGVwLTUwLCAjZmFmYWZhKTtcbiAgICAtLWJvcmRlci13aWR0aDogMXB4O1xuICAgIC0tYm9yZGVyLWNvbG9yOiByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMik7XG4gICAgLS1jb2xvcjogdmFyKC0taW9uLXRleHQtY29sb3IpO1xuICAgIC0tcGxhY2Vob2xkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgIC0tcGFkZGluZy1zdGFydDogMTZweDtcbiAgICAtLXBhZGRpbmctZW5kOiAxNnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG5cbiAgICAmOmZvY3VzLXdpdGhpbiB7XG4gICAgICAtLWJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24taXRlbS1iYWNrZ3JvdW5kKTtcbiAgICB9XG4gIH1cblxuICBpb24tbGFiZWwge1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLWlvbi10ZXh0LWNvbG9yKTtcbiAgICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIG1heC13aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5pbnB1dC1pY29uIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICB9XG5cbiAgLnVuaXQtbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIG1hcmdpbi1sZWZ0OiA4cHg7XG4gIH1cbn1cblxuLy8gU2VjY2nDg8KzbiBkZSBjYWxvcsODwq1hcyBkZXN0YWNhZGFcbi5jYWxvcmllcy1zZWN0aW9uIHtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgd2lkdGg6IDEwMCU7XG5cbiAgLmNhbG9yaWVzLWlucHV0IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgZ2FwOiAxMnB4O1xuXG4gICAgLmN1c3RvbS1sYWJlbCB7XG4gICAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBjb2xvcjogV2hpdGU7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgICAgZmxleDogMTtcblxuICAgICAgaW9uLWljb24ge1xuICAgICAgICBmb250LXNpemU6IDEuM3JlbTtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmNhbG9yaWVzLXdyYXBwZXIge1xuICAgICAgZmxleDogMCAwIDE4MHB4O1xuICAgICAgbWluLXdpZHRoOiAxODBweDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSAhaW1wb3J0YW50O1xuICAgICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG5cbiAgICAgIC5jYWxvcmllcy12YWx1ZSB7XG4gICAgICAgIGZvbnQtc2l6ZTogMS40cmVtICFpbXBvcnRhbnQ7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSkgIWltcG9ydGFudDtcbiAgICAgIH1cblxuICAgICAgLnByaW1hcnktdW5pdCB7XG4gICAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSAhaW1wb3J0YW50O1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpICFpbXBvcnRhbnQ7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgICAgIGFsaWduLXNlbGY6IHN0cmV0Y2g7XG4gICAgICAgIHBhZGRpbmc6IDAgMTZweDtcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIE1lZGlhIHF1ZXJpZXMgcGFyYSBjYWxvcsODwq1hcyAoY29uc2lzdGVuY2lhIGNvbiBtYWNyb3MpXG5AbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgLmNhbG9yaWVzLXNlY3Rpb24gLmNhbG9yaWVzLWlucHV0IC5jYWxvcmllcy13cmFwcGVyIHtcbiAgICBmbGV4OiAwIDAgMjAwcHg7XG4gICAgbWluLXdpZHRoOiAyMDBweDtcbiAgfVxufVxuXG5AbWVkaWEgKG1pbi13aWR0aDogMTAyNHB4KSB7XG4gIC5jYWxvcmllcy1zZWN0aW9uIC5jYWxvcmllcy1pbnB1dCAuY2Fsb3JpZXMtd3JhcHBlciB7XG4gICAgZmxleDogMCAwIDIyMHB4O1xuICAgIG1pbi13aWR0aDogMjIwcHg7XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XG4gIC5jYWxvcmllcy1zZWN0aW9uIC5jYWxvcmllcy1pbnB1dCAuY2Fsb3JpZXMtd3JhcHBlciB7XG4gICAgZmxleDogMCAwIDE2MHB4O1xuICAgIG1pbi13aWR0aDogMTYwcHg7XG4gIH1cbn1cblxuLy8gTWFjcm9udXRyaWVudGVzXG4ubWFjcm9zLXNlY3Rpb24ge1xuICAubWFjcm9zLWhlYWRlciB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcblxuICAgIC5tYWNyb3MtdGl0bGUge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBnYXA6IDZweDtcbiAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KTtcblxuICAgICAgaW9uLWljb24ge1xuICAgICAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICAgICAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAubWFjcm9zLWdyaWQge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gICAgZ2FwOiAxMnB4O1xuXG4gICAgLm1hY3JvLWl0ZW0ge1xuICAgICAgLmN1c3RvbS1pbnB1dC1jb250YWluZXIge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgIGdhcDogMTJweDtcblxuICAgICAgICAuY3VzdG9tLWxhYmVsIHtcbiAgICAgICAgICBmbGV4OiAxO1xuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICBtaW4td2lkdGg6IDA7XG4gICAgICAgIH1cblxuICAgICAgICAuaW5wdXQtd3JhcHBlciB7XG4gICAgICAgICAgZmxleDogMCAwIDE4MHB4O1xuICAgICAgICAgIG1pbi13aWR0aDogMTgwcHg7XG5cbiAgICAgICAgICAuY3VzdG9tLWlucHV0IHtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICAgICAgLS1wYWRkaW5nLWVuZDogMTJweDtcbiAgICAgICAgICAgIC0tcGFkZGluZy1zdGFydDogMTJweDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMS4xcmVtICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICBmb250LXdlaWdodDogNjAwICFpbXBvcnRhbnQ7XG4gICAgICAgICAgICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KSAhaW1wb3J0YW50O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFN1YmNhdGVnb3LDg8KtYXMgbcODwqFzIGVzdHJlY2hhcyBwYXJhIHNpbXVsYXIgZXRpcXVldGEgbnV0cmljaW9uYWxcbiAgICAuc2F0dXJhdGVkLWZhdC1tYWNybyxcbiAgICAuc3VnYXJzLW1hY3JvIHtcbiAgICAgIGdyaWQtY29sdW1uOiBzcGFuIDE7XG5cbiAgICAgIC5jdXN0b20taW5wdXQtY29udGFpbmVyIHtcbiAgICAgICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgICAgICBtYXJnaW4tbGVmdDogMjBweDsgLy8gSW5kZW50YWNpw4PCs24gcGFyYSBtb3N0cmFyIGplcmFycXXDg8KtYVxuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBnYXA6IDhweDsgLy8gTWVub3IgZXNwYWNpbyBlbnRyZSBldGlxdWV0YSBlIGlucHV0XG5cbiAgICAgICAgLmN1c3RvbS1sYWJlbCB7XG4gICAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICAgICAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgICAgICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgICAgIGZsZXg6IDE7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIG1pbi13aWR0aDogMDtcblxuICAgICAgICAgIC5tYWNyby1kb3Qge1xuICAgICAgICAgICAgd2lkdGg6IDZweDtcbiAgICAgICAgICAgIGhlaWdodDogNnB4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC5pbnB1dC13cmFwcGVyIHtcbiAgICAgICAgICBmbGV4OiAwIDAgMTQwcHg7IC8vIE3Dg8KhcyBlc3RyZWNobyBxdWUgbG9zIHByaW5jaXBhbGVzXG4gICAgICAgICAgbWluLXdpZHRoOiAxNDBweDtcblxuICAgICAgICAgIC5jdXN0b20taW5wdXQge1xuICAgICAgICAgICAgZm9udC1zaXplOiAwLjlyZW0gIWltcG9ydGFudDtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDAgIWltcG9ydGFudDtcbiAgICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICAgICAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICAgICAgICAgICAgLS1wYWRkaW5nLXN0YXJ0OiA4cHg7XG4gICAgICAgICAgICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KSAhaW1wb3J0YW50O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC5pbnB1dC11bml0IHtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMC44cmVtO1xuICAgICAgICAgICAgcGFkZGluZzogMTRweCAxMnB4IDEycHggNHB4O1xuICAgICAgICAgICAgbWluLXdpZHRoOiAzMnB4O1xuICAgICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1lZGlhIHF1ZXJpZXMgcGFyYSBtYW50ZW5lciBjb25zaXN0ZW5jaWEgZW4gdG9kYXMgbGFzIHBhbnRhbGxhc1xuICAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgICAgLm1hY3JvLWl0ZW0ge1xuICAgICAgICAuY3VzdG9tLWlucHV0LWNvbnRhaW5lciB7XG4gICAgICAgICAgLmlucHV0LXdyYXBwZXIge1xuICAgICAgICAgICAgZmxleDogMCAwIDIwMHB4O1xuICAgICAgICAgICAgbWluLXdpZHRoOiAyMDBweDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLnNhdHVyYXRlZC1mYXQtbWFjcm8sXG4gICAgICAuc3VnYXJzLW1hY3JvIHtcbiAgICAgICAgLmN1c3RvbS1pbnB1dC1jb250YWluZXIge1xuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAyMHB4O1xuICAgICAgICAgIGdhcDogOHB4O1xuXG4gICAgICAgICAgLmlucHV0LXdyYXBwZXIge1xuICAgICAgICAgICAgZmxleDogMCAwIDE2MHB4O1xuICAgICAgICAgICAgbWluLXdpZHRoOiAxNjBweDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogMTAyNHB4KSB7XG4gICAgICAubWFjcm8taXRlbSB7XG4gICAgICAgIC5jdXN0b20taW5wdXQtY29udGFpbmVyIHtcbiAgICAgICAgICAuaW5wdXQtd3JhcHBlciB7XG4gICAgICAgICAgICBmbGV4OiAwIDAgMjIwcHg7XG4gICAgICAgICAgICBtaW4td2lkdGg6IDIyMHB4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAuc2F0dXJhdGVkLWZhdC1tYWNybyxcbiAgICAgIC5zdWdhcnMtbWFjcm8ge1xuICAgICAgICAuY3VzdG9tLWlucHV0LWNvbnRhaW5lciB7XG4gICAgICAgICAgbWFyZ2luLWxlZnQ6IDIwcHg7XG4gICAgICAgICAgZ2FwOiA4cHg7XG5cbiAgICAgICAgICAuaW5wdXQtd3JhcHBlciB7XG4gICAgICAgICAgICBmbGV4OiAwIDAgMTgwcHg7XG4gICAgICAgICAgICBtaW4td2lkdGg6IDE4MHB4O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkge1xuICAgICAgLm1hY3JvLWl0ZW0ge1xuICAgICAgICAuY3VzdG9tLWlucHV0LWNvbnRhaW5lciB7XG4gICAgICAgICAgLmlucHV0LXdyYXBwZXIge1xuICAgICAgICAgICAgZmxleDogMCAwIDE2MHB4O1xuICAgICAgICAgICAgbWluLXdpZHRoOiAxNjBweDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLnNhdHVyYXRlZC1mYXQtbWFjcm8sXG4gICAgICAuc3VnYXJzLW1hY3JvIHtcbiAgICAgICAgLmN1c3RvbS1pbnB1dC1jb250YWluZXIge1xuICAgICAgICAgIG1hcmdpbi1sZWZ0OiAxNnB4O1xuICAgICAgICAgIGdhcDogNnB4O1xuXG4gICAgICAgICAgLmlucHV0LXdyYXBwZXIge1xuICAgICAgICAgICAgZmxleDogMCAwIDEyMHB4O1xuICAgICAgICAgICAgbWluLXdpZHRoOiAxMjBweDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gTWFjcm8gZG90cyB5IGNvbG9yZXNcbi5tYWNyby1kb3Qge1xuICB3aWR0aDogOHB4O1xuICBoZWlnaHQ6IDhweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBtYXJnaW4tcmlnaHQ6IDRweDtcbn1cblxuLmZhdC1kb3Qge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbn1cblxuLmNhcmJzLWRvdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbn1cblxuLnByb3RlaW4tZG90IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taW9uLWNvbG9yLWFsdGVybmF0aXZlKTtcbn1cblxuLmZpYmVyLWRvdCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5NmNlYjQ7XG59XG5cbi5zYXR1cmF0ZWQtZmF0LWRvdCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjhhODA7XG59XG5cbi5zdWdhcnMtZG90IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYjc0ZDtcbn1cblxuLy8gVW5pZGFkZXMgc2VjdW5kYXJpYXNcbi5zZWNvbmRhcnktdW5pdCB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMzcsIDM3LCAzNywgMC4zKSAhaW1wb3J0YW50O1xuICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpICFpbXBvcnRhbnQ7XG59XG5cbi8vIEJvdMODwrNuIGRlIGFjY2nDg8KzblxuLmFjdGlvbi1zZWN0aW9uIHtcbiAgbWFyZ2luLXRvcDogMjBweDtcblxuICAuc2F2ZS1idXR0b24ge1xuICAgIC0tYm9yZGVyLXJhZGl1czogdmFyKC0tYm9yZGVyLXJhZGl1cyk7XG4gICAgLS1wYWRkaW5nLXRvcDogMTZweDtcbiAgICAtLXBhZGRpbmctYm90dG9tOiAxNnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuXG4gICAgaW9uLWljb24ge1xuICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gICAgfVxuICB9XG59XG5cbi8vIFNwZWNpZmljIGNhcmQgdHlwZXMgLSBDbGVhbiBzdHlsZSBsaWtlIGFkZC1wcm9kdWN0XG4uaW5mby1jYXJkLFxuLm51dHJpdGlvbi1jYXJkLFxuLnF1YW50aXRpZXMtY2FyZCxcbi5hZGRpdGlvbmFsLW51dHJpdGlvbi1jYXJkIHtcbiAgYmFja2dyb3VuZDogIzE0MTQxNCAhaW1wb3J0YW50O1xuICBib3JkZXI6IDFweCBzb2xpZCAjMjUyNTI1ICFpbXBvcnRhbnQ7XG4gIGJvcmRlci1sZWZ0OiBub25lICFpbXBvcnRhbnQ7XG59XG5cbi8vIEZvb3RlciBzdHlsZXNcbi5jcmVhdGUtcHJvZHVjdC1mb290ZXIge1xuICAtLWJhY2tncm91bmQ6ICMxNDE0MTQ7XG4gIGJhY2tncm91bmQ6ICMxNDE0MTQ7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMik7XG5cbiAgLmZvb3Rlci1jb250ZW50IHtcbiAgICBtYXgtd2lkdGg6IDYwMHB4O1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIHBhZGRpbmc6IDEycHggMTZweCBjYWxjKDEycHggKyB2YXIoLS1pb24tc2FmZS1hcmVhLWJvdHRvbSwgMHB4KSk7XG5cbiAgICBpb24tYnV0dG9uIHtcbiAgICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgIGhlaWdodDogNDhweDtcbiAgICAgIG1hcmdpbjogMDtcblxuICAgICAgJi5idXR0b24tZGlzYWJsZWQge1xuICAgICAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtLWNvbnRyYXN0KTtcbiAgICAgIH1cblxuICAgICAgLmxvYWRpbmctY29udGVudCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGdhcDogOHB4O1xuXG4gICAgICAgIGlvbi1zcGlubmVyIHtcbiAgICAgICAgICB3aWR0aDogMjBweDtcbiAgICAgICAgICBoZWlnaHQ6IDIwcHg7XG4gICAgICAgICAgLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgLmxvYWRpbmctdGV4dCB7XG4gICAgICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAuc2F2ZS1wcm9ncmVzcyB7XG4gICAgICBoZWlnaHQ6IDNweDtcbiAgICAgIG1hcmdpbi10b3A6IDhweDtcbiAgICAgIC0tYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjE4KTtcbiAgICAgIC0tcHJvZ3Jlc3MtYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBHcmlkIGxheW91dHNcbi5pbnB1dC1ncmlkIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ2FwOiAxNnB4O1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG59XG5cbi5udXRyaXRpb24tZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogMTJweDtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDEwMjRweCkge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XG4gIH1cbn1cblxuLnF1YW50aXRpZXMtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdhcDogMTZweDtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xuICB9XG59XG5cbi5hZGRpdGlvbmFsLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBnYXA6IDEycHg7XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcbiAgfVxufVxuXG4vLyBCdXR0b24gZW5oYW5jZW1lbnRzXG4uY3JlYXRlLWJ1dHRvbiB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgaGVpZ2h0OiA0OHB4O1xuICBtYXJnaW46IDA7XG5cbiAgJi5idXR0b24tZGlzYWJsZWQge1xuICAgIC0tYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bS1jb250cmFzdCk7XG4gIH1cblxuICAuYnV0dG9uLWNvbnRlbnQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDhweDtcbiAgICBmb250LXdlaWdodDogNjAwO1xuXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgfVxuICB9XG59XG5cbi8vIEVuaGFuY2VkIGlucHV0IHN0eWxlc1xuLm51dHJpdGlvbi1pbnB1dCB7XG4gIGlvbi1sYWJlbCB7XG4gICAgZm9udC1zaXplOiAwLjlyZW07XG4gIH1cbn1cblxuLy8gQ2FyZCBjb250ZW50IHBhZGRpbmdcbmlvbi1jYXJkLWNvbnRlbnQge1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4vLyBSZW1vdmVkIGFuaW1hdGlvbnMgZm9yIG1vYmlsZSBhcHBcblxuLy8gUmVzcG9uc2l2ZSBkZXNpZ25cbi8vIERhcmsgdGhlbWUgc3BlY2lmaWMgc3R5bGVzXG4uZGFyay10aGVtZSB7XG4gIGlvbi1jYXJkIHtcbiAgICBiYWNrZ3JvdW5kOiAjMTQxNDE0ICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyOiAxcHggc29saWQgIzI1MjUyNSAhaW1wb3J0YW50O1xuICB9XG5cbiAgLnByb2R1Y3QtaGVhZGVyLWNhcmQsXG4gIC5udXRyaXRpb24tY2FyZCxcbiAgLmFkZGl0aW9uYWwtaW5mby1jYXJkIHtcbiAgICBiYWNrZ3JvdW5kOiAjMTQxNDE0ICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyOiAxcHggc29saWQgIzI1MjUyNSAhaW1wb3J0YW50O1xuICB9XG5cbiAgLmlucHV0LXdyYXBwZXIge1xuICAgIGJhY2tncm91bmQ6ICMxNDE0MTQgIWltcG9ydGFudDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMjUyNTI1ICFpbXBvcnRhbnQ7XG5cbiAgICAmOmZvY3VzLXdpdGhpbiB7XG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxuXG4gIC5pbnB1dC11bml0IHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDM3LCAzNywgMzcsIDAuMykgIWltcG9ydGFudDtcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICMyNTI1MjUgIWltcG9ydGFudDtcbiAgfVxuXG4gIC5lbGVnYW50LWlucHV0IHtcblxuICAgIGlvbi1pbnB1dCxcbiAgICBpb24tc2VsZWN0IHtcbiAgICAgIC0tYmFja2dyb3VuZDogIzE0MTQxNCAhaW1wb3J0YW50O1xuICAgICAgLS1ib3JkZXItY29sb3I6ICMyNTI1MjUgIWltcG9ydGFudDtcblxuICAgICAgJjpmb2N1cy13aXRoaW4ge1xuICAgICAgICAtLWJhY2tncm91bmQ6ICMxNDE0MTQgIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gUmVzcG9uc2l2ZVxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5jcmVhdGUtcHJvZHVjdC1wYWdlIHtcbiAgICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcbiAgICAtLXBhZGRpbmctZW5kOiA4cHg7XG4gIH1cblxuICAuY3VzdG9tLWlucHV0LWNvbnRhaW5lciB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgfVxuXG4gIC5tYWNyb3MtZ3JpZCB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XG4gIH1cbn1cblxuLy8gU2VjY2lvbmVzIGRlIHRleHRvIChJbmdyZWRpZW50ZXMsIGV0Yy4pXG4udGV4dC1pbmZvLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgZ2FwOiAxNnB4O1xufVxuXG4udGV4dC1pbmZvLWNhcmQge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xuICBib3JkZXI6IDFweCBzb2xpZCAjMjUyNTI1O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gIC50ZXh0LWluZm8taGVhZGVyIHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpO1xuICAgIHBhZGRpbmc6IDhweCAxNnB4O1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMjUyNTI1O1xuXG4gICAgaW9uLWxhYmVsIHtcbiAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICAgIH1cbiAgfVxuXG4gIC5jdXN0b20taW5mby10ZXh0YXJlYSB7XG4gICAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICAtLWNvbG9yOiAjYjBiMGIwO1xuICAgIC0tcGFkZGluZy1zdGFydDogMTZweDtcbiAgICAtLXBhZGRpbmctZW5kOiAxNnB4O1xuICAgIC0tcGFkZGluZy10b3A6IDEycHg7XG4gICAgLS1wYWRkaW5nLWJvdHRvbTogMTJweDtcbiAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICBsaW5lLWhlaWdodDogMS40O1xuICB9XG59XG5cbi8vIENhcmFjdGVyw4PCrXN0aWNhcyBEaWV0w4PCqXRpY2FzXG4uc2VjdGlvbi1zdWJ0aXRsZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgbWFyZ2luOiAyMHB4IDAgMTJweCAwO1xuXG4gIGlvbi1pY29uIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICB9XG59XG5cbi5kaWV0YXJ5LWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xuICBnYXA6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi5kaWV0YXJ5LW9wdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgYmFja2dyb3VuZDogIzFhMWExYTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzMzMztcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgcGFkZGluZzogMTJweDtcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICBjb2xvcjogIzY2NjtcbiAgfVxuXG4gIGlvbi1sYWJlbCB7XG4gICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogI2IwYjBiMDtcbiAgfVxuXG4gICYuYWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMSk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIH1cblxuICAgIGlvbi1sYWJlbCB7XG4gICAgICBjb2xvcjogd2hpdGU7XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ })

}]);
//# sourceMappingURL=src_app_features_diet-templates_diet-templates_module_ts.js.map