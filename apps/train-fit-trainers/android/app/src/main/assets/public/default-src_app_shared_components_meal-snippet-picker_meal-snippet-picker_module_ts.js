"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_shared_components_meal-snippet-picker_meal-snippet-picker_module_ts"],{

/***/ 51111:
/*!****************************************************************************************!*\
  !*** ./src/app/shared/components/meal-snippet-picker/meal-snippet-picker.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MealSnippetPickerComponent: () => (/* binding */ MealSnippetPickerComponent)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _services_meal_snippet_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/meal-snippet-api.service */ 20790);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var src_app_core_services_custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/custom-product/custom-product.service */ 57846);
/* harmony import */ var src_app_core_services_recipe_recipe_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/recipe/recipe.service */ 50888);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 84725);


var _MealSnippetPickerComponent;








function MealSnippetPickerComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "div", 8)(2, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function MealSnippetPickerComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 9)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, "No se pudieron cargar tus snippets.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function MealSnippetPickerComponent_div_9_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r3.load());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "Reintentar");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function MealSnippetPickerComponent_ng_container_10_p_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " Todav\u00EDa no has guardado ning\u00FAn snippet. Comp\u00F3n una comida y usa \"Guardar como snippet\" para reutilizarla en cualquier plantilla o cliente. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function MealSnippetPickerComponent_ng_container_10_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "ion-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function MealSnippetPickerComponent_ng_container_10_div_2_Template_input_ngModelChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r9.search = $event);
    })("ngModelChange", function MealSnippetPickerComponent_ng_container_10_div_2_Template_input_ngModelChange_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r10);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r11.onSearchChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r6.search);
  }
}
function MealSnippetPickerComponent_ng_container_10_p_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" Ning\u00FAn snippet coincide con \"", ctx_r7.search, "\". ");
  }
}
function MealSnippetPickerComponent_ng_container_10_ion_accordion_5_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 33)(1, "div", 34)(2, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "ion-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 38)(8, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](9, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](12, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](14, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](17, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](19, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](22, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](24, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](27, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const cp_r15 = ctx.$implicit;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r13.productName(cp_r15), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r13.entryQuantity(cp_r15));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](12, 6, ctx_r13.productMacros(cp_r15).kcal, "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](17, 9, ctx_r13.productMacros(cp_r15).protein, "1.0-1"), "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](22, 12, ctx_r13.productMacros(cp_r15).carbs, "1.0-1"), "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](27, 15, ctx_r13.productMacros(cp_r15).fat, "1.0-1"), "g");
  }
}
function MealSnippetPickerComponent_ng_container_10_ion_accordion_5_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 33)(1, "div", 34)(2, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "ion-icon", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "div", 38)(8, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](9, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](12, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](14, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](17, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](19, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](22, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](24, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](25, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](27, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const cr_r16 = ctx.$implicit;
    const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r14.recipeName(cr_r16), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r14.entryQuantity(cr_r16));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](12, 6, ctx_r14.recipeMacros(cr_r16).kcal, "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](17, 9, ctx_r14.recipeMacros(cr_r16).protein, "1.0-1"), "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](22, 12, ctx_r14.recipeMacros(cr_r16).carbs, "1.0-1"), "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](27, 15, ctx_r14.recipeMacros(cr_r16).fat, "1.0-1"), "g");
  }
}
function MealSnippetPickerComponent_ng_container_10_ion_accordion_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-accordion", 19)(1, "ion-item", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "ion-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "ion-label")(4, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, MealSnippetPickerComponent_ng_container_10_ion_accordion_5_div_9_Template, 28, 18, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, MealSnippetPickerComponent_ng_container_10_ion_accordion_5_div_10_Template, 28, 18, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "div", 26)(12, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function MealSnippetPickerComponent_ng_container_10_ion_accordion_5_Template_button_click_12_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r18);
      const snippet_r12 = restoredCtx.$implicit;
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r17.pick(snippet_r12));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](13, "ion-icon", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, " Usar este snippet ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function MealSnippetPickerComponent_ng_container_10_ion_accordion_5_Template_button_click_15_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r18);
      const snippet_r12 = restoredCtx.$implicit;
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r19.renameSnippet($event, snippet_r12));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](16, "ion-icon", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function MealSnippetPickerComponent_ng_container_10_ion_accordion_5_Template_button_click_17_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r18);
      const snippet_r12 = restoredCtx.$implicit;
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r20.confirmDelete($event, snippet_r12));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](18, "ion-icon", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const snippet_r12 = ctx.$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", snippet_r12._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](snippet_r12.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate2"]("", ctx_r8.itemCount(snippet_r12), " alimento", ctx_r8.itemCount(snippet_r12) === 1 ? "" : "s", "");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", snippet_r12.customProducts);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", snippet_r12.customRecipes);
  }
}
function MealSnippetPickerComponent_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, MealSnippetPickerComponent_ng_container_10_p_1_Template, 2, 0, "p", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, MealSnippetPickerComponent_ng_container_10_div_2_Template, 3, 1, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, MealSnippetPickerComponent_ng_container_10_p_3_Template, 2, 1, "p", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "ion-accordion-group", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, MealSnippetPickerComponent_ng_container_10_ion_accordion_5_Template, 19, 6, "ion-accordion", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r2.snippets.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.snippets.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.snippets.length && !ctx_r2.filteredSnippets.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r2.filteredSnippets)("ngForTrackBy", ctx_r2.trackBySnippetId);
  }
}
const EMPTY_MACROS = {
  kcal: 0,
  protein: 0,
  carbs: 0,
  fat: 0
};
// TAREA5 (auditoría UX, Fase C) — picker puro: lista, deja elegir uno
// (dismiss con role 'confirm' y el snippet completo) y permite borrar. La
// acción de CREAR uno nuevo vive en quien compone la comida (el propio
// tablero/composer), no aquí — este modal solo consume la biblioteca.
class MealSnippetPickerComponent {
  constructor(mealSnippetApi, ionicUtilService, modalController, customProductService, recipeService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "mealSnippetApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "customProductService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recipeService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "state", 'loading');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "snippets", []);
    // TASK-047 (MASTER_BACKLOG.md) — filtro en memoria: mismo criterio que
    // RoutinesPage/TemplatePickerModalComponent, no hace falta paginación de
    // backend para una biblioteca personal de este tamaño esperado.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "search", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "filteredSnippets", []);
    this.mealSnippetApi = mealSnippetApi;
    this.ionicUtilService = ionicUtilService;
    this.modalController = modalController;
    this.customProductService = customProductService;
    this.recipeService = recipeService;
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.state = 'loading';
    this.mealSnippetApi.list().subscribe({
      next: snippets => {
        this.snippets = snippets || [];
        this.applySearch();
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      }
    });
  }
  onSearchChange() {
    this.applySearch();
  }
  applySearch() {
    const term = this.search.trim().toLowerCase();
    this.filteredSnippets = term ? this.snippets.filter(s => s.name.toLowerCase().includes(term)) : this.snippets;
  }
  itemCount(snippet) {
    return (snippet.customProducts?.length || 0) + (snippet.customRecipes?.length || 0);
  }
  // Fix2 — accordion: customProducts/customRecipes vienen autopopulados
  // por el backend (mongoose-autopopulate, ver meal-schema.js), así que el
  // producto/receta real ya está disponible sin llamadas extra.
  productName(entry) {
    const product = entry?.product;
    return product && typeof product === 'object' && product.name || 'Producto guardado';
  }
  recipeName(entry) {
    const recipe = entry?.recipe;
    return recipe && typeof recipe === 'object' && recipe.name || 'Receta guardada';
  }
  entryQuantity(entry) {
    const quantity = entry?.quantity;
    return quantity ? `${quantity}g` : '';
  }
  // Mismas macros que picked-food-card en day-meal-editor-modal: reutiliza
  // el cálculo canónico (CustomProductService.getMacros/RecipeService
  // .calculateCustomRecipeTotals), no lo reinventa.
  productMacros(entry) {
    const product = entry?.product;
    const quantity = entry?.quantity ?? 100;
    if (!product || typeof product !== 'object') return EMPTY_MACROS;
    return this.customProductService.getMacros({
      product,
      quantity
    });
  }
  recipeMacros(entry) {
    const recipe = entry?.recipe;
    const quantity = entry?.quantity ?? undefined;
    if (!recipe || typeof recipe !== 'object') return EMPTY_MACROS;
    return this.recipeService.calculateCustomRecipeTotals(recipe, {
      quantity,
      quantityCooked: null
    }).portionMacros;
  }
  pick(snippet) {
    void this.modalController.dismiss(snippet, 'confirm');
  }
  confirmDelete(event, snippet) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      event.stopPropagation();
      yield _this.ionicUtilService.showAlert({
        header: `¿Borrar "${snippet.name}"?`,
        message: 'No afecta a las comidas donde ya se haya insertado antes.',
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Borrar',
          role: 'destructive',
          handler: () => {
            _this.mealSnippetApi.delete(snippet._id).subscribe(() => {
              _this.snippets = _this.snippets.filter(s => s._id !== snippet._id);
              _this.applySearch();
            });
          }
        }]
      });
    })();
  }
  // TASK-047 (MASTER_BACKLOG.md) — solo renombrar (ver nota en
  // meal-snippet-api.service.ts sobre por qué no re-componer contenido aquí).
  renameSnippet(event, snippet) {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      event.stopPropagation();
      yield _this2.ionicUtilService.showAlert({
        header: 'Renombrar snippet',
        inputs: [{
          name: 'name',
          type: 'text',
          value: snippet.name,
          attributes: {
            maxlength: 80
          }
        }],
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Guardar',
          handler: data => {
            const name = (data?.name || '').trim();
            if (!name) return false;
            _this2.mealSnippetApi.rename(snippet._id, name).subscribe({
              next: updated => {
                snippet.name = updated.name;
                _this2.applySearch();
              },
              error: () => {
                _this2.ionicUtilService.showToast({
                  message: 'No se pudo renombrar el snippet',
                  duration: 2500
                });
              }
            });
            return true;
          }
        }]
      });
    })();
  }
  dismiss() {
    void this.modalController.dismiss(null, 'cancel');
  }
  trackBySnippetId(_index, snippet) {
    return snippet._id;
  }
}
_MealSnippetPickerComponent = MealSnippetPickerComponent;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(MealSnippetPickerComponent, "\u0275fac", function MealSnippetPickerComponent_Factory(t) {
  return new (t || _MealSnippetPickerComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_services_meal_snippet_api_service__WEBPACK_IMPORTED_MODULE_2__.MealSnippetApiService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_3__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_core_services_custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_4__.CustomProductService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_core_services_recipe_recipe_service__WEBPACK_IMPORTED_MODULE_5__.RecipeService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(MealSnippetPickerComponent, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: _MealSnippetPickerComponent,
  selectors: [["app-meal-snippet-picker"]],
  decls: 11,
  vars: 3,
  consts: [[1, "ion-no-border"], ["slot", "end"], [3, "click"], [1, "snippet-picker-content"], ["class", "detail-skeleton", 4, "ngIf"], ["class", "section-error", 4, "ngIf"], [4, "ngIf"], [1, "detail-skeleton"], [1, "skeleton-block", 2, "height", "52px"], [1, "section-error"], [1, "retry-button", 3, "click"], ["class", "empty-hint", 4, "ngIf"], ["class", "input-wrapper", 4, "ngIf"], [1, "snippet-group"], ["toggleIcon", "chevron-down-outline", 3, "value", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "empty-hint"], [1, "input-wrapper"], ["name", "search-outline", 1, "input-icon"], ["type", "text", "placeholder", "Buscar snippet", 1, "input-field", 3, "ngModel", "ngModelChange"], ["toggleIcon", "chevron-down-outline", 3, "value"], ["slot", "header", "lines", "none", 1, "snippet-header"], ["name", "bookmark", "slot", "start", 1, "snippet-icon"], [1, "snippet-name"], [1, "snippet-count"], ["slot", "content", 1, "snippet-detail"], ["class", "picked-food-card", 4, "ngFor", "ngForOf"], [1, "snippet-detail-actions"], ["type", "button", 1, "snippet-pick-btn", 3, "click"], ["name", "add-circle-outline"], ["type", "button", "aria-label", "Renombrar", 1, "snippet-icon-btn", 3, "click"], ["name", "pencil-outline"], ["type", "button", "aria-label", "Borrar", 1, "snippet-icon-btn", "danger", 3, "click"], ["name", "trash-outline"], [1, "picked-food-card"], [1, "picked-food-header"], [1, "picked-food-name"], ["name", "nutrition-outline"], [1, "picked-food-qty"], [1, "picked-food-macros"], [1, "macro-item"], [1, "macro-dot", "kcal"], [1, "macro-value"], [1, "macro-dot", "protein"], [1, "macro-dot", "carbs"], [1, "macro-dot", "fat"], ["name", "restaurant-outline"]],
  template: function MealSnippetPickerComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-header", 0)(1, "ion-toolbar")(2, "ion-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Insertar snippet");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "ion-buttons", 1)(5, "ion-button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function MealSnippetPickerComponent_Template_ion_button_click_5_listener() {
        return ctx.dismiss();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6, "Cerrar");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "ion-content", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, MealSnippetPickerComponent_div_8_Template, 3, 0, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, MealSnippetPickerComponent_div_9_Template, 5, 0, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, MealSnippetPickerComponent_ng_container_10_Template, 6, 5, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.state === "loading");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.state === "error");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.state === "loaded");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonAccordion, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonAccordionGroup, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonToolbar, _angular_common__WEBPACK_IMPORTED_MODULE_8__.DecimalPipe],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n.snippet-picker-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 12px;\n}\n\n.detail-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.skeleton-block[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n  border-radius: 12px;\n}\n.skeleton-block[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n\n.section-error[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .empty-hint[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--tf-text-muted);\n  text-align: center;\n  line-height: 1.4;\n}\n\n.retry-button[_ngcontent-%COMP%] {\n  display: block;\n  margin: 8px auto 0;\n  background: none;\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 8px;\n  color: var(--tf-text);\n  padding: 8px 16px;\n  cursor: pointer;\n}\n\n.snippet-group[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 8px;\n}\n.snippet-group[_ngcontent-%COMP%]   ion-accordion[_ngcontent-%COMP%] {\n  display: block;\n  margin-bottom: 10px;\n}\n.snippet-group[_ngcontent-%COMP%]   ion-accordion[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n\n.snippet-header[_ngcontent-%COMP%] {\n  --background: var(--tf-surface-1);\n  --border-color: var(--tf-border);\n  --color: var(--tf-text);\n  border: 1px solid var(--tf-border);\n  border-radius: 10px;\n}\n.snippet-header[_ngcontent-%COMP%]   .ion-accordion-toggle-icon[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n}\n\n.snippet-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--ion-color-primary);\n  flex-shrink: 0;\n}\n\n.snippet-name[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.snippet-count[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.76rem;\n  color: var(--tf-text-muted);\n  margin-top: 2px;\n}\n\n.snippet-detail[_ngcontent-%COMP%] {\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-top: none;\n  border-radius: 0 0 10px 10px;\n  padding: 10px 14px 12px;\n}\n\n.picked-food-card[_ngcontent-%COMP%] {\n  background-color: #141414;\n  border: 1px solid #252525;\n  border-radius: 12px;\n  margin-bottom: 8px;\n  padding: 12px 14px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.picked-food-card[_ngcontent-%COMP%]:last-of-type {\n  margin-bottom: 12px;\n}\n\n.picked-food-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.picked-food-name[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-weight: 600;\n  font-size: 0.9rem;\n  color: #fff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.picked-food-name[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 1rem;\n  color: var(--tf-accent);\n}\n\n.picked-food-qty[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 0.8rem;\n  color: #888;\n}\n\n.picked-food-macros[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  margin-top: 10px;\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex: 1;\n  justify-content: center;\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot.kcal[_ngcontent-%COMP%] {\n  background: var(--ion-color-primary);\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot.protein[_ngcontent-%COMP%] {\n  background: var(--ion-color-alternative);\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot.carbs[_ngcontent-%COMP%] {\n  background: var(--ion-color-success);\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-dot.fat[_ngcontent-%COMP%] {\n  background: var(--ion-color-secondary);\n}\n.picked-food-macros[_ngcontent-%COMP%]   .macro-value[_ngcontent-%COMP%] {\n  font-size: 0.76rem;\n  color: rgba(255, 255, 255, 0.85);\n  white-space: nowrap;\n}\n\n.snippet-detail-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-top: 10px;\n}\n\n.snippet-pick-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 38px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  background: var(--tf-accent-soft);\n  border: 1px solid var(--tf-accent-soft-border);\n  border-radius: 8px;\n  color: var(--tf-accent);\n  font-size: 0.82rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n\n.snippet-icon-btn[_ngcontent-%COMP%] {\n  width: 38px;\n  height: 38px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  color: var(--tf-text-muted);\n  cursor: pointer;\n  flex-shrink: 0;\n}\n.snippet-icon-btn[_ngcontent-%COMP%]:hover {\n  color: var(--tf-accent);\n}\n.snippet-icon-btn.danger[_ngcontent-%COMP%]:hover {\n  color: var(--tf-danger);\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  margin-bottom: 12px;\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 12px;\n  color: var(--tf-text-muted);\n  font-size: 1.1rem;\n}\n\n.input-field[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 42px;\n  padding: 0 14px 0 38px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-radius: 10px;\n  color: var(--tf-text);\n  font-size: 0.85rem;\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n.input-field[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--tf-accent);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvbWVhbC1zbmlwcGV0LXBpY2tlci9tZWFsLXNuaXBwZXQtcGlja2VyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCQTtFQUNFO0lBQ0UsMkJBQUE7RUN4QkY7QUFDRjtBQURBO0VBQ0UsMEJBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFHRjs7QUFBQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFFBQUE7QUFHRjs7QUFBQTtFRFhFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSwrQkFBQTtFQ1dBLG1CQUFBO0FBS0Y7QURkRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSw0QkFBQTtFQUNBLCtFQUFBO0VBQ0EsbUNBQUE7QUNnQko7QURiRTtFQUNFO0lBQ0UsZUFBQTtFQ2VKO0FBQ0Y7O0FBZkE7O0VBRUUsa0JBQUE7RUFDQSwyQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFrQkY7O0FBZkE7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHlDQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtBQWtCRjs7QUFYQTtFQUNFLGNBQUE7RUFDQSxrQkFBQTtBQWNGO0FBWEU7RUFDRSxjQUFBO0VBQ0EsbUJBQUE7QUFhSjtBQVhJO0VBQ0UsZ0JBQUE7QUFhTjs7QUFSQTtFQUNFLGlDQUFBO0VBQ0EsZ0NBQUE7RUFDQSx1QkFBQTtFQUNBLGtDQUFBO0VBQ0EsbUJBQUE7QUFXRjtBQU5FO0VBQ0UsMkJBQUE7QUFRSjs7QUFKQTtFQUNFLGVBQUE7RUFDQSwrQkFBQTtFQUNBLGNBQUE7QUFPRjs7QUFKQTtFQUNFLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUFPRjs7QUFKQTtFQUNFLGNBQUE7RUFDQSxrQkFBQTtFQUNBLDJCQUFBO0VBQ0EsZUFBQTtBQU9GOztBQUpBO0VBQ0UsK0JBQUE7RUFDQSxrQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7RUFDQSx1QkFBQTtBQU9GOztBQURBO0VBQ0UseUJBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxrQkFBQTtFQUNBLHdDQUFBO0FBSUY7QUFGRTtFQUNFLG1CQUFBO0FBSUo7O0FBQUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBR0Y7O0FBQUE7RUFDRSxPQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtBQUdGO0FBREU7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLHVCQUFBO0FBR0o7O0FBQ0E7RUFDRSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxXQUFBO0FBRUY7O0FBQ0E7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxRQUFBO0VBQ0EsZ0JBQUE7QUFFRjtBQUFFO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLE9BQUE7RUFDQSx1QkFBQTtBQUVKO0FBQ0U7RUFDRSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBQUNKO0FBQ0k7RUFDRSxvQ0FBQTtBQUNOO0FBRUk7RUFDRSx3Q0FBQTtBQUFOO0FBR0k7RUFDRSxvQ0FBQTtBQUROO0FBSUk7RUFDRSxzQ0FBQTtBQUZOO0FBTUU7RUFDRSxrQkFBQTtFQUNBLGdDQUFBO0VBQ0EsbUJBQUE7QUFKSjs7QUFRQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxnQkFBQTtBQUxGOztBQVFBO0VBQ0UsT0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFFBQUE7RUFDQSxpQ0FBQTtFQUNBLDhDQUFBO0VBQ0Esa0JBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBTEY7O0FBUUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBQUxGO0FBT0U7RUFDRSx1QkFBQTtBQUxKO0FBUUU7RUFDRSx1QkFBQTtBQU5KOztBQVlBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQVRGOztBQVlBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsMkJBQUE7RUFDQSxpQkFBQTtBQVRGOztBQVlBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtFQUNBLCtCQUFBO0VBQ0Esa0NBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7QUFURjtBQVdFO0VBQ0UsMkJBQUE7QUFUSjtBQVlFO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0FBVkoiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTa2VsZXRvbiBkZSBjYXJnYSBjb24gYmFycmlkbyBkZSBzaGltbWVyIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gbGl0ZXJhbG1lbnRlXG4vLyBlbiB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgKGJvcmRlci1yYWRpdXMsIGhlaWdodCwgd2lkdGgsIHZhcmlhbnRlcyBjb24gbm9tYnJlKS5cbkBtaXhpbiB0Zi1za2VsZXRvbi1zaGltbWVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuXG4gICY6OmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHRyYW5zcGFyZW50LCB2YXIoLS10Zi1zaGltbWVyKSwgdHJhbnNwYXJlbnQpO1xuICAgIGFuaW1hdGlvbjogdGYtc2hpbW1lciAxLjRzIGluZmluaXRlO1xuICB9XG5cbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICAmOjphZnRlciB7XG4gICAgICBhbmltYXRpb246IG5vbmU7XG4gICAgfVxuICB9XG59XG5cbkBrZXlmcmFtZXMgdGYtc2hpbW1lciB7XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgfVxufVxuIiwiQGltcG9ydCAnLi4vLi4vLi4vLi4vdGhlbWUvc2tlbGV0b24nO1xuQGltcG9ydCAnLi4vLi4vLi4vLi4vdGhlbWUvYnV0dG9ucyc7XG5cbi5zbmlwcGV0LXBpY2tlci1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1iZyk7XG4gIC0tcGFkZGluZy1zdGFydDogMTZweDtcbiAgLS1wYWRkaW5nLWVuZDogMTZweDtcbiAgLS1wYWRkaW5nLXRvcDogMTJweDtcbn1cblxuLmRldGFpbC1za2VsZXRvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogOHB4O1xufVxuXG4uc2tlbGV0b24tYmxvY2sge1xuICBAaW5jbHVkZSB0Zi1za2VsZXRvbi1zaGltbWVyO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xufVxuXG4uc2VjdGlvbi1lcnJvciBwLFxuLmVtcHR5LWhpbnQge1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBsaW5lLWhlaWdodDogMS40O1xufVxuXG4ucmV0cnktYnV0dG9uIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogOHB4IGF1dG8gMDtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICBwYWRkaW5nOiA4cHggMTZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4vLyBGaXgyIMOiwoDClCBjYWRhIHNuaXBwZXQgZXMgdW4gaW9uLWFjY29yZGlvbjogZWwgaGVhZGVyIHBpY2EvY29sYXBzYSBsYVxuLy8gdmlzdGEgcHJldmlhIGRlIHN1cyBwcm9kdWN0b3MvcmVjZXRhcywgeSBcIlVzYXIgZXN0ZSBzbmlwcGV0XCIgKGRlbnRybyxcbi8vIG5vIGVuIGVsIGhlYWRlcikgZXMgbGEgw4PCum5pY2EgYWNjacODwrNuIHF1ZSBsbyBpbnNlcnRhIMOiwoDClCBhc8ODwq0gZXhwYW5kaXIgcGFyYVxuLy8gbWlyYXIgY29udGVuaWRvIHkgZWxlZ2lybG8gc29uIGRvcyBnZXN0b3MgZGlzdGludG9zLCBubyBlbCBtaXNtbyBjbGljay5cbi5zbmlwcGV0LWdyb3VwIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcblxuICAvLyBFc3BhY2lvIGVudHJlIGFjY29yZGlvbnMgw6LCgMKUIElvbmljIGxvcyByZW5kZXJpemEgcGVnYWRvcyBwb3IgZGVmZWN0by5cbiAgaW9uLWFjY29yZGlvbiB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcblxuICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICBtYXJnaW4tYm90dG9tOiAwO1xuICAgIH1cbiAgfVxufVxuXG4uc25pcHBldC1oZWFkZXIge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMSk7XG4gIC0tYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1ib3JkZXIpO1xuICAtLWNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcblxuICAvLyBJb25pYyBpbnllY3RhIGVsIGNoZXZyb24gZGUgZXhwYW5kaXIvY29sYXBzYXIgY29uIHN1IGNvbG9yIHBvclxuICAvLyBkZWZlY3RvIChwZW5zYWRvIHBhcmEgdGVtYSBjbGFybykgw6LCgMKUIHNpbiBlc3RvIHNlIHZlIGFwYWdhZG8gc29icmVcbiAgLy8gLS10Zi1zdXJmYWNlLTEgb3NjdXJvLlxuICAuaW9uLWFjY29yZGlvbi10b2dnbGUtaWNvbiB7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG59XG5cbi5zbmlwcGV0LWljb24ge1xuICBmb250LXNpemU6IDE4cHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4uc25pcHBldC1uYW1lIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtc2l6ZTogMC44OHJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xufVxuXG4uc25pcHBldC1jb3VudCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXNpemU6IDAuNzZyZW07XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgbWFyZ2luLXRvcDogMnB4O1xufVxuXG4uc25pcHBldC1kZXRhaWwge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItdG9wOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAwIDAgMTBweCAxMHB4O1xuICBwYWRkaW5nOiAxMHB4IDE0cHggMTJweDtcbn1cblxuLy8gTWlzbW8gc2hlbGwgcXVlIHBpY2tlZC1mb29kLWNhcmQgZW4gZGF5LW1lYWwtZWRpdG9yLW1vZGFsIMOiwoDClCB1biBhbGltZW50b1xuLy8gZGVudHJvIGRlIHVuIHNuaXBwZXQgc2UgbGVlIGlndWFsIHF1ZSB1biBhbGltZW50byB5YSBlbGVnaWRvIGVuIGVsXG4vLyBjb25zdHJ1Y3RvciBkZSBjb21pZGFzLlxuLnBpY2tlZC1mb29kLWNhcmQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTQxNDE0O1xuICBib3JkZXI6IDFweCBzb2xpZCAjMjUyNTI1O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIHBhZGRpbmc6IDEycHggMTRweDtcbiAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcblxuICAmOmxhc3Qtb2YtdHlwZSB7XG4gICAgbWFyZ2luLWJvdHRvbTogMTJweDtcbiAgfVxufVxuXG4ucGlja2VkLWZvb2QtaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG59XG5cbi5waWNrZWQtZm9vZC1uYW1lIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDZweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAwLjlyZW07XG4gIGNvbG9yOiAjZmZmO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcblxuICBpb24taWNvbiB7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICB9XG59XG5cbi5waWNrZWQtZm9vZC1xdHkge1xuICBmbGV4LXNocmluazogMDtcbiAgZm9udC1zaXplOiAwLjhyZW07XG4gIGNvbG9yOiAjODg4O1xufVxuXG4ucGlja2VkLWZvb2QtbWFjcm9zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDhweDtcbiAgbWFyZ2luLXRvcDogMTBweDtcblxuICAubWFjcm8taXRlbSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogNnB4O1xuICAgIGZsZXg6IDE7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIH1cblxuICAubWFjcm8tZG90IHtcbiAgICB3aWR0aDogOHB4O1xuICAgIGhlaWdodDogOHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBmbGV4LXNocmluazogMDtcblxuICAgICYua2NhbCB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgfVxuXG4gICAgJi5wcm90ZWluIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1hbHRlcm5hdGl2ZSk7XG4gICAgfVxuXG4gICAgJi5jYXJicyB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgfVxuXG4gICAgJi5mYXQge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG4gICAgfVxuICB9XG5cbiAgLm1hY3JvLXZhbHVlIHtcbiAgICBmb250LXNpemU6IDAuNzZyZW07XG4gICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSk7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgfVxufVxuXG4uc25pcHBldC1kZXRhaWwtYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBtYXJnaW4tdG9wOiAxMHB4O1xufVxuXG4uc25pcHBldC1waWNrLWJ0biB7XG4gIGZsZXg6IDE7XG4gIGhlaWdodDogMzhweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogNnB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtc29mdCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWFjY2VudC1zb2Z0LWJvcmRlcik7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIGZvbnQtc2l6ZTogMC44MnJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uc25pcHBldC1pY29uLWJ0biB7XG4gIHdpZHRoOiAzOHB4O1xuICBoZWlnaHQ6IDM4cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZmxleC1zaHJpbms6IDA7XG5cbiAgJjpob3ZlciB7XG4gICAgY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIH1cblxuICAmLmRhbmdlcjpob3ZlciB7XG4gICAgY29sb3I6IHZhcigtLXRmLWRhbmdlcik7XG4gIH1cbn1cblxuLy8gVEFTSy0wNDcgw6LCgMKUIGJ1c2NhZG9yLCBtaXNtbyBwYXRyw4PCs24gdmlzdWFsIHlhIHVzYWRvIGVuIFJvdXRpbmVzUGFnZS9cbi8vIEV4ZXJjaXNlTGlicmFyeVBhZ2UvVGVtcGxhdGVQaWNrZXJNb2RhbENvbXBvbmVudC5cbi5pbnB1dC13cmFwcGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xufVxuXG4uaW5wdXQtaWNvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMTJweDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBmb250LXNpemU6IDEuMXJlbTtcbn1cblxuLmlucHV0LWZpZWxkIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNDJweDtcbiAgcGFkZGluZzogMCAxNHB4IDAgMzhweDtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICBmb250LXNpemU6IDAuODVyZW07XG5cbiAgJjo6cGxhY2Vob2xkZXIge1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgfVxuXG4gICY6Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ }),

/***/ 32470:
/*!*************************************************************************************!*\
  !*** ./src/app/shared/components/meal-snippet-picker/meal-snippet-picker.module.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MealSnippetPickerModule: () => (/* binding */ MealSnippetPickerModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _meal_snippet_picker_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./meal-snippet-picker.component */ 51111);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);

var _MealSnippetPickerModule;



// TAREA5 (auditoría UX, Fase C) — reutilizado desde diet-templates (tablero
// semanal), meal-compose y client-detail; vive en shared por el mismo
// motivo que ProductSearchModalModule (un componente no puede declararse en
// dos NgModules distintos).
class MealSnippetPickerModule {}
_MealSnippetPickerModule = MealSnippetPickerModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealSnippetPickerModule, "\u0275fac", function MealSnippetPickerModule_Factory(t) {
  return new (t || _MealSnippetPickerModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealSnippetPickerModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _MealSnippetPickerModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealSnippetPickerModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](MealSnippetPickerModule, {
    declarations: [_meal_snippet_picker_component__WEBPACK_IMPORTED_MODULE_2__.MealSnippetPickerComponent],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule],
    exports: [_meal_snippet_picker_component__WEBPACK_IMPORTED_MODULE_2__.MealSnippetPickerComponent]
  });
})();

/***/ }),

/***/ 20790:
/*!*************************************************************!*\
  !*** ./src/app/shared/services/meal-snippet-api.service.ts ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MealSnippetApiService: () => (/* binding */ MealSnippetApiService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/http/http.service */ 88552);

var _MealSnippetApiService;


class MealSnippetApiService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  list() {
    return this.http.get(MealSnippetApiService.ENDPOINT);
  }
  create(name, customProducts, customRecipes) {
    return this.http.post(MealSnippetApiService.ENDPOINT, {
      name,
      customProducts,
      customRecipes
    });
  }
  delete(id) {
    return this.http.delete(`${MealSnippetApiService.ENDPOINT}/${id}`);
  }
  // TASK-047 (MASTER_BACKLOG.md) — solo renombrar; re-componer el contenido
  // del snippet exige el mismo composer que ya usa la creación, fuera de
  // alcance aquí (ver TASK-081).
  rename(id, name) {
    return this.http.put(`${MealSnippetApiService.ENDPOINT}/${id}`, {
      name
    });
  }
}
_MealSnippetApiService = MealSnippetApiService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealSnippetApiService, "ENDPOINT", 'trainer/meal-snippets');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealSnippetApiService, "\u0275fac", function MealSnippetApiService_Factory(t) {
  return new (t || _MealSnippetApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MealSnippetApiService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _MealSnippetApiService,
  factory: _MealSnippetApiService.ɵfac,
  providedIn: 'root'
}));


/***/ })

}]);
//# sourceMappingURL=default-src_app_shared_components_meal-snippet-picker_meal-snippet-picker_module_ts.js.map