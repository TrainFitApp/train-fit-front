"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_features_diet-templates_models_diet-template_model_ts-src_app_shared_componen-13dfa4"],{

/***/ 27094:
/*!***********************************************************************!*\
  !*** ./src/app/features/diet-templates/models/diet-template.model.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MEAL_SLOTS: () => (/* binding */ MEAL_SLOTS),
/* harmony export */   WEEKDAYS: () => (/* binding */ WEEKDAYS)
/* harmony export */ });
// Replanteamiento MVP (nutrición) — mismo formato "clipboard" que ya usa
// MealAlternativeInput/customProducts en client-detail.model.ts, reutilizado
// aquí para construir plantillas reutilizables entre clientes.
const MEAL_SLOTS = ['Desayuno', 'Almuerzo', 'Comida', 'Merienda', 'Cena', 'Recena'];
const WEEKDAYS = [{
  value: 1,
  label: 'Lunes',
  short: 'L'
}, {
  value: 2,
  label: 'Martes',
  short: 'M'
}, {
  value: 3,
  label: 'Miércoles',
  short: 'X'
}, {
  value: 4,
  label: 'Jueves',
  short: 'J'
}, {
  value: 5,
  label: 'Viernes',
  short: 'V'
}, {
  value: 6,
  label: 'Sábado',
  short: 'S'
}, {
  value: 0,
  label: 'Domingo',
  short: 'D'
}];

/***/ }),

/***/ 78381:
/*!******************************************************************************************!*\
  !*** ./src/app/shared/components/product-search-modal/product-search-modal.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProductSearchModalComponent: () => (/* binding */ ProductSearchModalComponent)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 85342);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 27453);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 71636);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 84498);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 47114);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs/operators */ 51097);
/* harmony import */ var src_app_core_services_product_product_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/product/product-api.service */ 7559);
/* harmony import */ var src_app_core_services_recipe_recipe_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/recipe/recipe-api.service */ 12713);
/* harmony import */ var src_app_core_services_recipe_recipe_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/recipe/recipe.service */ 50888);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ 84725);

var _ProductSearchModalComponent;













function ProductSearchModalComponent_ion_button_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ProductSearchModalComponent_ion_button_5_Template_ion_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r7.closeCreateProduct());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Volver");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function ProductSearchModalComponent_ion_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-button", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ProductSearchModalComponent_ion_button_6_Template_ion_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r9.dismiss());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Cerrar");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function ProductSearchModalComponent_ng_container_8_span_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Crear y usar este producto");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function ProductSearchModalComponent_ng_container_8_ion_spinner_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "ion-spinner", 22);
  }
}
const _c0 = function () {
  return {
    standalone: true
  };
};
function ProductSearchModalComponent_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](2, "ion-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](3, "input", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function ProductSearchModalComponent_ng_container_8_Template_input_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r13.newProduct.name = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "p", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Valores por 100g:");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 11)(7, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](8, "ion-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "input", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function ProductSearchModalComponent_ng_container_8_Template_input_ngModelChange_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r14);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r15.newProduct.energyKcal100g = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](11, "ion-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "input", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function ProductSearchModalComponent_ng_container_8_Template_input_ngModelChange_12_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r14);
      const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r16.newProduct.protein100g = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](14, "ion-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "input", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function ProductSearchModalComponent_ng_container_8_Template_input_ngModelChange_15_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r14);
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r17.newProduct.carbohydrates100g = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](17, "ion-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](18, "input", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function ProductSearchModalComponent_ng_container_8_Template_input_ngModelChange_18_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r14);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r18.newProduct.fat100g = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "button", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ProductSearchModalComponent_ng_container_8_Template_button_click_19_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r14);
      const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r19.saveNewProduct());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](20, ProductSearchModalComponent_ng_container_8_span_20_Template, 2, 0, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](21, ProductSearchModalComponent_ng_container_8_ion_spinner_21_Template, 1, 0, "ion-spinner", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r2.newProduct.name)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](13, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r2.newProduct.energyKcal100g)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](14, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r2.newProduct.protein100g)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](15, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r2.newProduct.carbohydrates100g)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](16, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r2.newProduct.fat100g)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](17, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", !ctx_r2.canSaveNewProduct || ctx_r2.isSavingProduct);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r2.isSavingProduct);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.isSavingProduct);
  }
}
function ProductSearchModalComponent_ng_container_9_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ProductSearchModalComponent_ng_container_9_button_9_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r29);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r28.openCreateProduct());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "ion-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](2, " Crear producto nuevo ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function ProductSearchModalComponent_ng_container_9_p_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("Escribe para buscar en la biblioteca de ", ctx_r21.mode === "products" ? "alimentos" : "recetas", ".");
  }
}
function ProductSearchModalComponent_ng_container_9_p_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "No se pudo completar la b\u00FAsqueda.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function ProductSearchModalComponent_ng_container_9_p_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("Sin resultados para \"", ctx_r23.searchTerm, "\".");
  }
}
function ProductSearchModalComponent_ng_container_9_p_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("Sin resultados para \"", ctx_r24.searchTerm, "\".");
  }
}
function ProductSearchModalComponent_ng_container_9_div_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "div", 34)(2, "div", 34)(3, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function ProductSearchModalComponent_ng_container_9_ng_container_15_div_1_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const product_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](product_r31.brand);
  }
}
function ProductSearchModalComponent_ng_container_9_ng_container_15_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ProductSearchModalComponent_ng_container_9_ng_container_15_div_1_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r35);
      const product_r31 = restoredCtx.$implicit;
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r34.selectProduct(product_r31));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 37)(2, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, ProductSearchModalComponent_ng_container_9_ng_container_15_div_1_span_4_Template, 2, 1, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const product_r31 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](product_r31.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", product_r31.brand);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", product_r31.energyKcal100g, " kcal/100g");
  }
}
function ProductSearchModalComponent_ng_container_9_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, ProductSearchModalComponent_ng_container_9_ng_container_15_div_1_Template, 7, 3, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r26.products)("ngForTrackBy", ctx_r26.trackByProductId);
  }
}
function ProductSearchModalComponent_ng_container_9_ng_container_16_div_1_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const recipe_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r38.recipeIngredientsSummary(recipe_r37));
  }
}
function ProductSearchModalComponent_ng_container_9_ng_container_16_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ProductSearchModalComponent_ng_container_9_ng_container_16_div_1_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r41);
      const recipe_r37 = restoredCtx.$implicit;
      const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r40.selectRecipe(recipe_r37));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 37)(2, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, ProductSearchModalComponent_ng_container_9_ng_container_16_div_1_span_4_Template, 2, 1, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "span", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](7, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const recipe_r37 = ctx.$implicit;
    const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](recipe_r37.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r36.recipeIngredientsSummary(recipe_r37));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](7, 3, ctx_r36.recipeMacros(recipe_r37).kcal, "1.0-0"), " kcal");
  }
}
function ProductSearchModalComponent_ng_container_9_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, ProductSearchModalComponent_ng_container_9_ng_container_16_div_1_Template, 8, 6, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r27.recipes)("ngForTrackBy", ctx_r27.trackByRecipeId);
  }
}
function ProductSearchModalComponent_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 23)(2, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ProductSearchModalComponent_ng_container_9_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r43);
      const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r42.setMode("products"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Productos");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ProductSearchModalComponent_ng_container_9_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r43);
      const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r44.setMode("recipes"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Recetas");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](7, "ion-icon", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "input", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function ProductSearchModalComponent_ng_container_9_Template_input_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r43);
      const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r45.onSearchChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, ProductSearchModalComponent_ng_container_9_button_9_Template, 3, 0, "button", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, ProductSearchModalComponent_ng_container_9_p_10_Template, 2, 1, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, ProductSearchModalComponent_ng_container_9_p_11_Template, 2, 0, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](12, ProductSearchModalComponent_ng_container_9_p_12_Template, 2, 1, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, ProductSearchModalComponent_ng_container_9_p_13_Template, 2, 1, "p", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](14, ProductSearchModalComponent_ng_container_9_div_14_Template, 4, 0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, ProductSearchModalComponent_ng_container_9_ng_container_15_Template, 2, 2, "ng-container", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, ProductSearchModalComponent_ng_container_9_ng_container_16_Template, 2, 2, "ng-container", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("selected", ctx_r3.mode === "products");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("selected", ctx_r3.mode === "recipes");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("placeholder", ctx_r3.mode === "products" ? "Nombre del alimento (m\u00EDn. 2 letras)" : "Nombre de la receta (m\u00EDn. 2 letras)")("ngModel", ctx_r3.searchTerm)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](15, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r3.mode === "products");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r3.state === "idle");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r3.state === "error");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r3.state === "loaded" && ctx_r3.mode === "products" && !ctx_r3.products.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r3.state === "loaded" && ctx_r3.mode === "recipes" && !ctx_r3.recipes.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r3.state === "loading");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r3.mode === "products");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r3.mode === "recipes");
  }
}
function ProductSearchModalComponent_ng_container_10_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r46.selectedProduct.brand);
  }
}
function ProductSearchModalComponent_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r48 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 42)(2, "div", 43)(3, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, ProductSearchModalComponent_ng_container_10_span_5_Template, 2, 1, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](7, "ion-icon", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "input", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function ProductSearchModalComponent_ng_container_10_Template_input_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r48);
      const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r47.quantity = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 46)(10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](12, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](15, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](18, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](21, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ProductSearchModalComponent_ng_container_10_Template_button_click_22_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r48);
      const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r49.backToResults());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](23, "ion-icon", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](24, " Elegir otro alimento ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r4.selectedProduct.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r4.selectedProduct.brand);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r4.quantity)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](20, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](12, 8, ctx_r4.selectedProduct.energyKcal100g * (ctx_r4.quantity || 0) / 100, "1.0-0"), " kcal");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("P ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](15, 11, (ctx_r4.selectedProduct.protein100g || 0) * (ctx_r4.quantity || 0) / 100, "1.0-1"), " g");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("C ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](18, 14, (ctx_r4.selectedProduct.carbohydrates100g || 0) * (ctx_r4.quantity || 0) / 100, "1.0-1"), " g");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("G ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](21, 17, (ctx_r4.selectedProduct.fat100g || 0) * (ctx_r4.quantity || 0) / 100, "1.0-1"), " g");
  }
}
function ProductSearchModalComponent_ng_container_11_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r50.recipeIngredientsSummary(ctx_r50.selectedRecipe));
  }
}
function ProductSearchModalComponent_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r52 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 42)(2, "div", 43)(3, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, ProductSearchModalComponent_ng_container_11_span_5_Template, 2, 1, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](7, "ion-icon", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "input", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function ProductSearchModalComponent_ng_container_11_Template_input_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r52);
      const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r51.quantity = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 46)(10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](12, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](15, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](18, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](19, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](21, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ProductSearchModalComponent_ng_container_11_Template_button_click_22_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r52);
      const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r53.backToResults());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](23, "ion-icon", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](24, " Elegir otra receta ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r5.selectedRecipe.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r5.recipeIngredientsSummary(ctx_r5.selectedRecipe));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r5.quantity)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](20, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](12, 8, ctx_r5.recipeMacros(ctx_r5.selectedRecipe).kcal, "1.0-0"), " kcal (total receta)");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("P ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](15, 11, ctx_r5.recipeMacros(ctx_r5.selectedRecipe).protein, "1.0-1"), " g");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("C ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](18, 14, ctx_r5.recipeMacros(ctx_r5.selectedRecipe).carbs, "1.0-1"), " g");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("G ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](21, 17, ctx_r5.recipeMacros(ctx_r5.selectedRecipe).fat, "1.0-1"), " g");
  }
}
function ProductSearchModalComponent_ion_footer_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-footer", 0)(1, "ion-toolbar")(2, "button", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function ProductSearchModalComponent_ion_footer_12_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r55);
      const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r54.confirm());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", ctx_r6.selectedProduct ? !ctx_r6.quantity || ctx_r6.quantity <= 0 : false);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r6.selectedProduct ? "Usar este alimento" : "Usar esta receta", " ");
  }
}
// TAREA1/TAREA5 — buscador de alimentos reales para pautar comida (biblioteca
// de productos + biblioteca de recetas del entrenador), presentado como panel
// lateral en escritorio (cssClass 'tf-panel-modal' en las llamadas a
// modalController.create). Ya no admite macros tecleadas a mano — un
// profesional pauta un producto o una receta real, nunca un número inventado.
// Reutiliza los mismos servicios que la pantalla search-foods del consumidor
// (ProductAPIService/RecipeApiService/RecipeService) sin heredar su
// acoplamiento a la sesión del consumidor logueado (esa pantalla lee
// UserService.getLocalUser + DietDayService.currentDietDay directamente, sin
// @Input — no es reutilizable tal cual para "cliente del entrenador"; ver
// MVP-trainers/tareas-grandes/TAREA5).
class ProductSearchModalComponent {
  constructor() {
    // TAREA5 — cuando el producto/receta ya se eligió en otra pantalla (el
    // buscador real de search-foods, ver SearchFoodsTrainerContext), este
    // panel se abre directo en el paso de cantidad/confirmar en vez de en la
    // búsqueda.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "preselectedProduct", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "preselectedRecipe", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "startInCreateProduct", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "productApi", (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(src_app_core_services_product_product_api_service__WEBPACK_IMPORTED_MODULE_1__.ProductAPIService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "recipeApi", (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(src_app_core_services_recipe_recipe_api_service__WEBPACK_IMPORTED_MODULE_2__.RecipeApiService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "recipeService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(src_app_core_services_recipe_recipe_service__WEBPACK_IMPORTED_MODULE_3__.RecipeService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "userService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__.UserService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "ionicUtilService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_5__.IonicUtilService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "modalController", (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "mode", 'products');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "state", 'idle');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "searchTerm", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "products", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "recipes", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selectedProduct", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selectedRecipe", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "quantity", 100);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "showCreateProduct", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isSavingProduct", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "newProduct", this.emptyNewProduct());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "searchTerm$", new rxjs__WEBPACK_IMPORTED_MODULE_8__.Subject());
    this.searchTerm$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.debounceTime)(400), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.switchMap)(term => {
      this.state = 'loading';
      // catchError DENTRO del switchMap: un error de red no debe matar
      // la suscripción exterior (RxJS propaga errores del observable
      // interno al externo, y eso desuscribe la búsqueda para siempre —
      // sin esto, un único fallo dejaba el modal permanentemente roto).
      // Casteado a un tipo de Observable único: sin esto, el tipo unión
      // Observable<IProduct[]> | Observable<Recipe[]> hace que TypeScript
      // resuelva mal la sobrecarga de .pipe()/catchError() (error crítico
      // de tipos, no solo un aviso — "Expected 0 arguments, but got 1").
      const search$ = this.mode === 'products' ? this.productApi.searchProduct(0, term) : this.recipeApi.searchRecipes(term, 0, 10);
      return search$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_12__.catchError)(() => {
        this.state = 'error';
        return (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.of)(null);
      }));
    })).subscribe(results => {
      if (results === null) return;
      if (this.mode === 'products') {
        this.products = results || [];
      } else {
        this.recipes = results || [];
      }
      this.state = 'loaded';
    });
  }
  ngOnInit() {
    if (this.preselectedProduct) this.selectProduct(this.preselectedProduct);
    if (this.preselectedRecipe) this.selectRecipe(this.preselectedRecipe);
    if (this.startInCreateProduct) this.openCreateProduct();
  }
  ngOnDestroy() {
    this.searchTerm$.complete();
  }
  setMode(mode) {
    if (this.mode === mode) return;
    this.mode = mode;
    this.showCreateProduct = false;
    this.products = [];
    this.recipes = [];
    this.state = 'idle';
    if (this.searchTerm.trim().length >= 2) {
      this.searchTerm$.next(this.searchTerm.trim());
    }
  }
  onSearchChange(term) {
    this.searchTerm = term;
    const trimmed = term.trim();
    if (trimmed.length < 2) {
      this.state = 'idle';
      this.products = [];
      this.recipes = [];
      return;
    }
    this.searchTerm$.next(trimmed);
  }
  selectProduct(product) {
    this.selectedProduct = product;
    this.quantity = 100;
  }
  selectRecipe(recipe) {
    this.selectedRecipe = recipe;
    this.quantity = null;
  }
  backToResults() {
    this.selectedProduct = null;
    this.selectedRecipe = null;
  }
  recipeMacros(recipe) {
    return this.recipeService.calculateRecipeMacros(recipe);
  }
  recipeIngredientsSummary(recipe) {
    return this.recipeService.getTopIngredients(recipe, 3);
  }
  // Fix7 — el título reflejaba solo showCreateProduct; con preselectedRecipe
  // (creación de receta nueva desde el trainer, ver RecipeBuilderModalComponent)
  // este modal se abre directo en la vista "cantidad/confirmar" y seguía
  // diciendo "Buscar alimento" aunque la búsqueda ni se mostraba.
  get headerTitle() {
    if (this.showCreateProduct) return 'Crear producto';
    if (this.selectedProduct || this.selectedRecipe) return 'Confirmar cantidad';
    return 'Buscar alimento';
  }
  trackByProductId(_index, product) {
    return product._id;
  }
  trackByRecipeId(_index, recipe) {
    return recipe._id || _index.toString();
  }
  // --- Crear producto ---
  emptyNewProduct() {
    return {
      name: '',
      energyKcal100g: null,
      protein100g: null,
      carbohydrates100g: null,
      fat100g: null
    };
  }
  openCreateProduct() {
    this.showCreateProduct = true;
    this.newProduct = this.emptyNewProduct();
  }
  closeCreateProduct() {
    this.showCreateProduct = false;
  }
  get canSaveNewProduct() {
    return !!this.newProduct.name.trim() && this.newProduct.energyKcal100g !== null && this.newProduct.energyKcal100g >= 0;
  }
  saveNewProduct() {
    if (!this.canSaveNewProduct || this.isSavingProduct) return;
    this.isSavingProduct = true;
    const userId = this.userService.localUser()?._id;
    this.productApi.saveProduct({
      name: this.newProduct.name.trim(),
      energyKcal100g: this.newProduct.energyKcal100g || 0,
      protein100g: this.newProduct.protein100g || 0,
      carbohydrates100g: this.newProduct.carbohydrates100g || 0,
      fat100g: this.newProduct.fat100g || 0,
      productQuantity: 100,
      userId
    }).subscribe({
      next: product => {
        this.isSavingProduct = false;
        this.showCreateProduct = false;
        this.ionicUtilService.showToast({
          message: `"${product.name}" creado`,
          duration: 2000
        });
        this.selectProduct(product);
      },
      error: err => {
        this.isSavingProduct = false;
        this.ionicUtilService.showErrorToast(err?.error?.message || 'No se pudo crear el producto', 'Error', 3000);
      }
    });
  }
  dismiss() {
    void this.modalController.dismiss(null, 'cancel');
  }
  confirm() {
    if (this.selectedProduct) {
      if (!this.quantity || this.quantity <= 0) return;
      const result = {
        kind: 'product',
        product: this.selectedProduct,
        quantity: this.quantity
      };
      void this.modalController.dismiss(result, 'confirm');
      return;
    }
    if (this.selectedRecipe) {
      const result = {
        kind: 'recipe',
        recipe: this.selectedRecipe,
        quantity: this.quantity && this.quantity > 0 ? this.quantity : null
      };
      void this.modalController.dismiss(result, 'confirm');
    }
  }
}
_ProductSearchModalComponent = ProductSearchModalComponent;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProductSearchModalComponent, "\u0275fac", function ProductSearchModalComponent_Factory(t) {
  return new (t || _ProductSearchModalComponent)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProductSearchModalComponent, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: _ProductSearchModalComponent,
  selectors: [["app-product-search-modal"]],
  inputs: {
    preselectedProduct: "preselectedProduct",
    preselectedRecipe: "preselectedRecipe",
    startInCreateProduct: "startInCreateProduct"
  },
  decls: 13,
  vars: 8,
  consts: [[1, "ion-no-border"], ["slot", "end"], [3, "click", 4, "ngIf"], [1, "product-search-content"], [4, "ngIf"], ["class", "ion-no-border", 4, "ngIf"], [3, "click"], [1, "input-wrapper"], ["name", "pricetag-outline", 1, "input-icon"], ["type", "text", "placeholder", "Nombre del producto", 1, "input-field", 3, "ngModel", "ngModelOptions", "ngModelChange"], [1, "section-hint"], [1, "macro-grid"], ["name", "flame-outline", 1, "input-icon"], ["type", "number", "placeholder", "Kcal", 1, "input-field", 3, "ngModel", "ngModelOptions", "ngModelChange"], ["name", "fitness-outline", 1, "input-icon"], ["type", "number", "placeholder", "Prote\u00EDna (g)", 1, "input-field", 3, "ngModel", "ngModelOptions", "ngModelChange"], ["name", "nutrition-outline", 1, "input-icon"], ["type", "number", "placeholder", "Carbohidratos (g)", 1, "input-field", 3, "ngModel", "ngModelOptions", "ngModelChange"], ["name", "water-outline", 1, "input-icon"], ["type", "number", "placeholder", "Grasas (g)", 1, "input-field", 3, "ngModel", "ngModelOptions", "ngModelChange"], ["type", "button", 1, "confirm-button", 3, "disabled", "click"], ["name", "dots", 4, "ngIf"], ["name", "dots"], [1, "mode-toggle"], ["type", "button", 1, "mode-option", 3, "click"], ["name", "search-outline", 1, "input-icon"], ["type", "text", 1, "input-field", 3, "placeholder", "ngModel", "ngModelOptions", "ngModelChange"], ["type", "button", "class", "create-product-link", 3, "click", 4, "ngIf"], ["class", "empty-hint", 4, "ngIf"], ["class", "detail-skeleton", 4, "ngIf"], ["type", "button", 1, "create-product-link", 3, "click"], ["name", "add-circle-outline"], [1, "empty-hint"], [1, "detail-skeleton"], [1, "skeleton-block", 2, "height", "52px"], ["class", "product-row", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "product-row", 3, "click"], [1, "product-info"], [1, "product-name"], ["class", "product-brand", 4, "ngIf"], [1, "product-kcal"], [1, "product-brand"], [1, "selected-card"], [1, "selected-header"], ["name", "scale-outline", 1, "input-icon"], ["type", "number", "placeholder", "Cantidad (g)", 1, "input-field", 3, "ngModel", "ngModelOptions", "ngModelChange"], [1, "macro-preview"], ["type", "button", 1, "back-link-button", 3, "click"], ["name", "arrow-back-outline"], ["type", "number", "placeholder", "Cantidad (g) \u2014 opcional, vac\u00EDo = receta completa", 1, "input-field", 3, "ngModel", "ngModelOptions", "ngModelChange"], [1, "confirm-button", 3, "disabled", "click"]],
  template: function ProductSearchModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-header", 0)(1, "ion-toolbar")(2, "ion-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "ion-buttons", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, ProductSearchModalComponent_ion_button_5_Template, 2, 0, "ion-button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, ProductSearchModalComponent_ion_button_6_Template, 2, 0, "ion-button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](7, "ion-content", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, ProductSearchModalComponent_ng_container_8_Template, 22, 18, "ng-container", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, ProductSearchModalComponent_ng_container_9_Template, 17, 16, "ng-container", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, ProductSearchModalComponent_ng_container_10_Template, 25, 21, "ng-container", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, ProductSearchModalComponent_ng_container_11_Template, 25, 21, "ng-container", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](12, ProductSearchModalComponent_ion_footer_12_Template, 4, 2, "ion-footer", 5);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx.headerTitle);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.showCreateProduct);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.showCreateProduct);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.showCreateProduct);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.showCreateProduct && !ctx.selectedProduct && !ctx.selectedRecipe);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.selectedProduct);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.selectedRecipe);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.selectedProduct || ctx.selectedRecipe);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_14__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_14__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonSpinner, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonToolbar, _angular_common__WEBPACK_IMPORTED_MODULE_14__.DecimalPipe],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n.product-search-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 12px;\n}\n\n.mode-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 12px;\n}\n\n.mode-option[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 10px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 10px;\n  color: var(--tf-text-secondary);\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: border-color 160ms var(--tf-ease-out), color 160ms var(--tf-ease-out), transform 160ms var(--tf-ease-out);\n}\n.mode-option.selected[_ngcontent-%COMP%] {\n  border-color: var(--tf-accent);\n  color: var(--tf-text);\n}\n.mode-option[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n\n.create-product-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: none;\n  border: none;\n  color: var(--tf-accent-text);\n  font-size: 0.85rem;\n  font-weight: 600;\n  padding: 0 0 12px;\n  cursor: pointer;\n}\n.create-product-link[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n\n.section-hint[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--tf-text-muted);\n  margin: 0 0 10px;\n}\n\n.macro-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: 0 10px;\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  margin-bottom: 12px;\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 12px;\n  color: var(--tf-text-muted);\n  font-size: 1.1rem;\n}\n\n.input-field[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 46px;\n  padding: 0 14px 0 40px;\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: 10px;\n  color: var(--tf-text);\n  font-size: 0.9rem;\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n.input-field[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--tf-accent);\n}\n\n.empty-hint[_ngcontent-%COMP%] {\n  font-size: 0.86rem;\n  color: var(--tf-text-muted);\n  text-align: center;\n  margin-top: 24px;\n}\n\n.detail-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.skeleton-block[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n  border-radius: 12px;\n}\n.skeleton-block[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n\n.product-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 12px;\n  margin-bottom: 6px;\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: 10px;\n  cursor: pointer;\n}\n\n.product-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n\n.product-name[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--tf-text);\n  font-weight: 600;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.product-brand[_ngcontent-%COMP%] {\n  font-size: 0.76rem;\n  color: var(--tf-text-muted);\n}\n\n.product-kcal[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--tf-accent);\n  font-weight: 600;\n  white-space: nowrap;\n}\n\n.selected-card[_ngcontent-%COMP%] {\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: 12px;\n  padding: 16px;\n}\n\n.selected-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  margin-bottom: 14px;\n}\n\n.macro-preview[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  font-size: 0.82rem;\n  color: var(--tf-text-secondary);\n  margin-bottom: 14px;\n}\n\n.back-link-button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  background: none;\n  border: none;\n  color: var(--tf-text-muted);\n  font-size: 0.82rem;\n  padding: 0;\n  cursor: pointer;\n}\n\n.confirm-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  width: calc(100% - 32px);\n  height: 48px;\n  margin: 0 16px 12px;\n  font-size: 0.92rem;\n}\n.confirm-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.confirm-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.confirm-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvcHJvZHVjdC1zZWFyY2gtbW9kYWwvcHJvZHVjdC1zZWFyY2gtbW9kYWwuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX2J1dHRvbnMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF5QkE7RUFDRTtJQUNFLDJCQUFBO0VDeEJGO0FBQ0Y7QUFEQTtFQUNFLDBCQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FBR0Y7O0FBQUE7RUFDRSxhQUFBO0VBQ0EsUUFBQTtFQUNBLG1CQUFBO0FBR0Y7O0FBQUE7RUFDRSxPQUFBO0VBQ0EsYUFBQTtFQUNBLCtCQUFBO0VBQ0EseUNBQUE7RUFDQSxtQkFBQTtFQUNBLCtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxxSEFBQTtBQUdGO0FBQUU7RUFDRSw4QkFBQTtFQUNBLHFCQUFBO0FBRUo7QUFDRTtFQUNFLHNCQUFBO0FBQ0o7O0FBR0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsNEJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0FBQUY7QUFFRTtFQUNFLGVBQUE7QUFBSjs7QUFJQTtFQUNFLGlCQUFBO0VBQ0EsMkJBQUE7RUFDQSxnQkFBQTtBQURGOztBQUlBO0VBQ0UsYUFBQTtFQUNBLHFDQUFBO0VBQ0EsV0FBQTtBQURGOztBQUlBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQURGOztBQUlBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsMkJBQUE7RUFDQSxpQkFBQTtBQURGOztBQUlBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtFQUNBLCtCQUFBO0VBQ0Esa0NBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7QUFERjtBQUdFO0VBQ0UsMkJBQUE7QUFESjtBQUlFO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0FBRko7O0FBTUE7RUFDRSxrQkFBQTtFQUNBLDJCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQUhGOztBQU1BO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtBQUhGOztBQU1BO0VEOUdFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSwrQkFBQTtFQzhHQSxtQkFBQTtBQURGO0FEM0dFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLDRCQUFBO0VBQ0EsK0VBQUE7RUFDQSxtQ0FBQTtBQzZHSjtBRDFHRTtFQUNFO0lBQ0UsZUFBQTtFQzRHSjtBQUNGOztBQVRBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsK0JBQUE7RUFDQSxrQ0FBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtBQVlGOztBQVRBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7QUFZRjs7QUFUQTtFQUNFLGlCQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtBQVlGOztBQVRBO0VBQ0Usa0JBQUE7RUFDQSwyQkFBQTtBQVlGOztBQVRBO0VBQ0UsaUJBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFZRjs7QUFUQTtFQUNFLCtCQUFBO0VBQ0Esa0NBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7QUFZRjs7QUFUQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtBQVlGOztBQVRBO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSwrQkFBQTtFQUNBLG1CQUFBO0FBWUY7O0FBVEE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxlQUFBO0FBWUY7O0FBVEE7RUMxTEUsWUFBQTtFQUNBLG1CQUZpQztFQUdqQyxxQ0FBQTtFQUNBLGdDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0ZBQUE7RURzTEEsd0JBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtBQWtCRjtBQ3pNRTtFQUNFLHNCQUFBO0FEMk1KO0FDeE1FO0VBQ0UsYUFBQTtFQUNBLGVBQUE7QUQwTUo7QUN2TUU7RUFDRSxpQ0FBQTtFQUNBLG1CQUFBO0FEeU1KIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU2tlbGV0b24gZGUgY2FyZ2EgY29uIGJhcnJpZG8gZGUgc2hpbW1lciDDosKAwpQgbWlzbW8gYmxvcXVlIHJlcGV0aWRvIGxpdGVyYWxtZW50ZVxuLy8gZW4gfjEwIHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS5cbi8vIENhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW8gc2VsZWN0b3IgeSBhw4PCsWFkZSBlbmNpbWEgc29sbyBsb1xuLy8gcXVlIHZhcsODwq1hIChib3JkZXItcmFkaXVzLCBoZWlnaHQsIHdpZHRoLCB2YXJpYW50ZXMgY29uIG5vbWJyZSkuXG5AbWl4aW4gdGYtc2tlbGV0b24tc2hpbW1lciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcblxuICAmOjphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGluc2V0OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCB0cmFuc3BhcmVudCwgdmFyKC0tdGYtc2hpbW1lciksIHRyYW5zcGFyZW50KTtcbiAgICBhbmltYXRpb246IHRmLXNoaW1tZXIgMS40cyBpbmZpbml0ZTtcbiAgfVxuXG4gIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgJjo6YWZ0ZXIge1xuICAgICAgYW5pbWF0aW9uOiBub25lO1xuICAgIH1cbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHRmLXNoaW1tZXIge1xuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XG4gIH1cbn1cbiIsIkBpbXBvcnQgJy4uLy4uLy4uLy4uL3RoZW1lL3NrZWxldG9uJztcbkBpbXBvcnQgJy4uLy4uLy4uLy4uL3RoZW1lL2J1dHRvbnMnO1xuXG4ucHJvZHVjdC1zZWFyY2gtY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtYmcpO1xuICAtLXBhZGRpbmctc3RhcnQ6IDE2cHg7XG4gIC0tcGFkZGluZy1lbmQ6IDE2cHg7XG4gIC0tcGFkZGluZy10b3A6IDEycHg7XG59XG5cbi5tb2RlLXRvZ2dsZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogOHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xufVxuXG4ubW9kZS1vcHRpb24ge1xuICBmbGV4OiAxO1xuICBwYWRkaW5nOiAxMHB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCksIGNvbG9yIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICB0cmFuc2Zvcm0gMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICYuc2VsZWN0ZWQge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIH1cblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk3KTtcbiAgfVxufVxuXG4uY3JlYXRlLXByb2R1Y3QtbGluayB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNnB4O1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQtdGV4dCk7XG4gIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgcGFkZGluZzogMCAwIDEycHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxN3B4O1xuICB9XG59XG5cbi5zZWN0aW9uLWhpbnQge1xuICBmb250LXNpemU6IDAuOHJlbTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBtYXJnaW46IDAgMCAxMHB4O1xufVxuXG4ubWFjcm8tZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XG4gIGdhcDogMCAxMHB4O1xufVxuXG4uaW5wdXQtd3JhcHBlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMTJweDtcbn1cblxuLmlucHV0LWljb24ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDEycHg7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgZm9udC1zaXplOiAxLjFyZW07XG59XG5cbi5pbnB1dC1maWVsZCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDQ2cHg7XG4gIHBhZGRpbmc6IDAgMTRweCAwIDQwcHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1zaXplOiAwLjlyZW07XG5cbiAgJjo6cGxhY2Vob2xkZXIge1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgfVxuXG4gICY6Zm9jdXMge1xuICAgIG91dGxpbmU6IG5vbmU7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICB9XG59XG5cbi5lbXB0eS1oaW50IHtcbiAgZm9udC1zaXplOiAwLjg2cmVtO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLXRvcDogMjRweDtcbn1cblxuLmRldGFpbC1za2VsZXRvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogOHB4O1xufVxuXG4uc2tlbGV0b24tYmxvY2sge1xuICBAaW5jbHVkZSB0Zi1za2VsZXRvbi1zaGltbWVyO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xufVxuXG4ucHJvZHVjdC1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTEpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5wcm9kdWN0LWluZm8ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDJweDtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4ucHJvZHVjdC1uYW1lIHtcbiAgZm9udC1zaXplOiAwLjlyZW07XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG59XG5cbi5wcm9kdWN0LWJyYW5kIHtcbiAgZm9udC1zaXplOiAwLjc2cmVtO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG59XG5cbi5wcm9kdWN0LWtjYWwge1xuICBmb250LXNpemU6IDAuOHJlbTtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi5zZWxlY3RlZC1jYXJkIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0xKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMTZweDtcbn1cblxuLnNlbGVjdGVkLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMnB4O1xuICBtYXJnaW4tYm90dG9tOiAxNHB4O1xufVxuXG4ubWFjcm8tcHJldmlldyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiAxMHB4O1xuICBmb250LXNpemU6IDAuODJyZW07XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIG1hcmdpbi1ib3R0b206IDE0cHg7XG59XG5cbi5iYWNrLWxpbmstYnV0dG9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBmb250LXNpemU6IDAuODJyZW07XG4gIHBhZGRpbmc6IDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmNvbmZpcm0tYnV0dG9uIHtcbiAgQGluY2x1ZGUgdGYtZ3JhZGllbnQtYnV0dG9uO1xuICB3aWR0aDogY2FsYygxMDAlIC0gMzJweCk7XG4gIGhlaWdodDogNDhweDtcbiAgbWFyZ2luOiAwIDE2cHggMTJweDtcbiAgZm9udC1zaXplOiAwLjkycmVtO1xufVxuIiwiLy8gQm90w4PCs24gQ1RBIGNvbiBncmFkaWVudGUgZGUgYWNlbnRvIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gZW4gfjExIHNpdGlvcyBkZVxuLy8gfjEwIHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS5cbi8vIENhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW8gc2VsZWN0b3IgeSBhw4PCsWFkZSBlbmNpbWEgc29sbyBsb1xuLy8gcXVlIHZhcsODwq1hIHBvciBsYXlvdXQgKHdpZHRoLCBoZWlnaHQsIGZvbnQtc2l6ZSwgbWFyZ2luKS5cbi8vXG4vLyBMYSBtaXRhZCBkZSBsb3Mgc2l0aW9zIG9yaWdpbmFsZXMgbm8gdGVuw4PCrWFuIHRyYW5zaWNpw4PCs24vZmVlZGJhY2sgZGUgcHVsc2FjacODwrNuXG4vLyBuaSA6Zm9jdXMtdmlzaWJsZSDDosKAwpQgZWwgbWl4aW4gbG9zIGHDg8KxYWRlIHNpZW1wcmUsIGNpZXJyYSBlc2UgaHVlY28gZGVcbi8vIGNvbnNpc3RlbmNpYSBkZSBpbnRlcmFjY2nDg8KzbiAoUFJPRFVDVC5tZDogXCJ1biBzb2xvIHBhdHLDg8KzbiBwb3IgdGlwbyBkZVxuLy8gY29tcG9uZW50ZVwiKSBlbiB2ZXogZGUgcGVycGV0dWFyIGxhIHZhcmlhY2nDg8KzbiBhY2NpZGVudGFsLlxuQG1peGluIHRmLWdyYWRpZW50LWJ1dHRvbigkcmFkaXVzOiAxMnB4KSB7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LWdyYWRpZW50KTtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudC1jb250cmFzdCk7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSwgb3BhY2l0eSAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45Nyk7XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjQ1O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLXRleHQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLy8gQm90w4PCs24gZGUgaGVhZGVyIHF1ZSBlcyBzb2xvIHVuIGljb25vIMOiwoDClCBtaXNtbyBsb29rIFwiZW52dWVsdG9cIiBxdWUgeWEgdXNhIGxhXG4vLyBhcHAgZGUgY29uc3VtaWRvciBlbiBzdXMgdG9vbGJhcnMgKHBhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy8uLi4vZGlldHMvXG4vLyBjb21wb25lbnRzL3Rvb2xiYXItY2FsZW5kYXI6IGZvbmRvICsgYm9yZGVyLXJhZGl1cyArIGNhamEgZmlqYSA0NHg0NCwgZW5cbi8vIHZleiBkZWwgaW9uLWJ1dHRvbiBwbGFuby90cmFuc3BhcmVudGUgcXVlIHRlbsODwq1hIGNhZGEgcGFudGFsbGEgZGUgdHJhaW5lcnNcbi8vIGhhc3RhIGFob3JhKS4gVG9rZW5lYWRvIGEgbGEgcGFsZXRhIGRlIGVzdGEgYXBwIGVuIHZleiBkZSByZXBldGlyIGxvc1xuLy8gcmdiYSgyNTUsMjU1LDI1NSwuLi4pIHN1ZWx0b3MgZGVsIG9yaWdpbmFsLlxuLy9cbi8vIFNpcnZlIHRhbnRvIHBhcmEgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCI+ICh1c2EgbGFzIENTUyBjdXN0b20gcHJvcGVydGllc1xuLy8gZGUgSW9uaWMpIGNvbW8gcGFyYSB1biA8YnV0dG9uPiBuYXRpdm8gKHVzYSBsYXMgcHJvcGllZGFkZXMgcGxhbmFzKSDDosKAwpRcbi8vIGFtYm9zIGNvZXhpc3RlbiBob3kgZW4gdHJhaW5lcnMgcGFyYSBlbCBtaXNtbyByb2wgZGUgXCJ2b2x2ZXJcIi9cImNlcnJhclwiLlxuQG1peGluIHRmLWljb24tYnV0dG9uKCRzaXplOiA0NHB4LCAkcmFkaXVzOiAxMnB4LCAkaWNvbi1zaXplOiAyMHB4KSB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcbiAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1iYWNrZ3JvdW5kLWhvdmVyOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtZm9jdXNlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1jb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICAtLWJvcmRlci1yYWRpdXM6ICN7JHJhZGl1c307XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbiAgLS1wYWRkaW5nLXRvcDogMDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMDtcblxuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6ICRyYWRpdXM7XG4gIHdpZHRoOiAkc2l6ZTtcbiAgaGVpZ2h0OiAkc2l6ZTtcbiAgbWluLXdpZHRoOiAkc2l6ZTtcbiAgbWluLWhlaWdodDogJHNpemU7XG4gIG1hcmdpbjogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCksXG4gICAgY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogJGljb24tc2l6ZTtcbiAgfVxufVxuXG4vLyBFeHBhbnNvciBpbnZpc2libGUgZGUgem9uYSBwdWxzYWJsZS5cbi8vXG4vLyBQQVJBIFFVw4PCiTogdW4gY29udHJvbCBjb21wYWN0byAodW4gaWNvbm8gZGUgMzIgcHggZW4gdW5hIGZpbGEgZGUgdGFibGEsIHVuXG4vLyBlbmxhY2UgZGUgdGV4dG8gZGUgMTYgcHgpIG5vIGxsZWdhIGEgbG9zIDQ0IHB4IHF1ZSBleGlnZSBQUk9EVUNULm1kLCB5XG4vLyBlbmdvcmRhcmxvIGRlIHZlcmRhZCBkZXNwbGF6YSB0b2RvIGxvIHF1ZSB0aWVuZSBhbHJlZGVkb3Igw6LCgMKUIGVuIHVuYSB0YWJsYVxuLy8gZGUgdmVpbnRlIGZpbGFzLCA4IHB4IHBvciBmaWxhIHNvbiBtZWRpYSBwYW50YWxsYS5cbi8vXG4vLyBFbCBwc2V1ZG9lbGVtZW50byBjcmVjZSBoYWNpYSBmdWVyYSBzaW4gb2N1cGFyIHNpdGlvIGVuIGVsIGZsdWpvLCBhc8ODwq0gcXVlXG4vLyBlbCBib3TDg8KzbiBzZSB2ZSBwZXF1ZcODwrFvIHkgc2UgcHVsc2EgZ3JhbmRlLlxuLy9cbi8vIEFWSVNPIERFIE1FRElDScODwpNOOiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBOTyB2ZSBlc3RlIHBzZXVkb2VsZW1lbnRvLCBhc8ODwq1cbi8vIHF1ZSBhbCB2ZXJpZmljYXIgaGF5IHF1ZSB1c2FyIGVsZW1lbnRGcm9tUG9pbnQgY29uIGVsIGVsZW1lbnRvIGRlbnRybyBkZWxcbi8vIHZpZXdwb3J0LiBBZGVtw4PCoXMgZWwgaGl0LXRlc3QgZGV2dWVsdmUgMiBweCBtZW5vcyBxdWUgbGEgY2FqYSBkZWNsYXJhZGFcbi8vIChjb21wcm9iYWRvOiAtNHB4IGRhIDQyLCAtNnB4IGRhIDQ2KSwgYXPDg8KtIHF1ZSB1biA0MiBtZWRpZG8gc29uIDQ0IHJlYWxlcy5cbi8vXG4vLyAkZ3JvdzogY3XDg8KhbnRvIGNyZWNlIHBvciBjYWRhIGxhZG8uIDRweCBsbGV2YSB1biBjb250cm9sIGRlIDM2IHB4IGEgNDQuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIoJGdyb3c6IDRweCkge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IC0jeyRncm93fTtcbiAgfVxufVxuXG4vLyBWYXJpYW50ZSBxdWUgc29sbyBjcmVjZSBlbiBWRVJUSUNBTC4gUGFyYSBjb250cm9sZXMgZW4gZmlsYSBkb25kZSBlbFxuLy8gZXhwYW5zb3IgaG9yaXpvbnRhbCBzZSBzb2xhcGFyw4PCrWEgY29uIGVsIGRlIGFsIGxhZG8geSByb2JhcsODwq1hIHN1cyB0b3F1ZXMuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIteSgkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC0jeyRncm93fTtcbiAgICBib3R0b206IC0jeyRncm93fTtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ }),

/***/ 80763:
/*!*********************************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/nutritional-goal/nutritional-goal-api.service.ts ***!
  \*********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NutritionalGoalApiService: () => (/* binding */ NutritionalGoalApiService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 65821);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _NutritionalGoalApiService;



class NutritionalGoalApiService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "endpoint", 'nutritionalgoals');
    this.http = http;
  }
  create(data) {
    return this.http.post(this.endpoint, data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  getById(id) {
    return this.http.get(`${this.endpoint}/${id}`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  getAll() {
    return this.http.get(this.endpoint).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  update(id, data) {
    return this.http.put(`${this.endpoint}/${id}`, data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  activate(id) {
    return this.http.put(`${this.endpoint}/${id}/activate`, {}).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
  delete(id) {
    return this.http.delete(`${this.endpoint}/${id}`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.take)(1));
  }
}
_NutritionalGoalApiService = NutritionalGoalApiService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(NutritionalGoalApiService, "\u0275fac", function NutritionalGoalApiService_Factory(t) {
  return new (t || _NutritionalGoalApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(NutritionalGoalApiService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _NutritionalGoalApiService,
  factory: _NutritionalGoalApiService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 29586:
/*!*****************************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/nutritional-goal/nutritional-goal.service.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NutritionalGoalService: () => (/* binding */ NutritionalGoalService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 98945);
/* harmony import */ var _nutritional_goal_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nutritional-goal-api.service */ 80763);
/* harmony import */ var _user_user_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user/user.service */ 66802);

var _NutritionalGoalService;





class NutritionalGoalService {
  constructor(api, userService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "api", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "userService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_goals", (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.signal)([]));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "goals", (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.computed)(() => this._goals()));
    this.api = api;
    this.userService = userService;
  }
  loadGoals() {
    return this.api.getAll().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(goals => this._goals.set(goals)));
  }
  get activeGoal() {
    const user = this.userService.getLocalUser;
    if (!user?.goalInUse) return null;
    return this._goals().find(g => g._id === user.goalInUse) || null;
  }
  getGoalById(id) {
    return this._goals().find(g => g._id === id);
  }
  create(data) {
    return this.api.create(data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(goal => {
      this._goals.update(list => [goal, ...list]);
      const user = this.userService.getLocalUser;
      if (user && !user.goalInUse) {
        this.userService.setLocalUser = {
          ...user,
          goalInUse: goal._id
        };
      }
    }));
  }
  update(id, data) {
    return this.api.update(id, data).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(updated => this._goals.update(list => list.map(g => g._id === id ? updated : g))));
  }
  delete(id) {
    return this.api.delete(id).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(response => {
      this._goals.update(list => list.filter(g => g._id !== id));
      const user = this.userService.getLocalUser;
      if (user) {
        this.userService.setLocalUser = {
          ...user,
          goalInUse: response?.goalInUse || undefined
        };
      }
    }));
  }
  setActive(goalId) {
    return this.api.activate(goalId).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(response => {
      const user = this.userService.getLocalUser;
      if (!user) return;
      this.userService.setLocalUser = {
        ...user,
        goalInUse: response.goalInUse
      };
    }));
  }
  canDelete(goalId) {
    return this._goals().length > 1;
  }
  refreshFromServer() {
    return this.api.getAll().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.tap)(goals => this._goals.set(goals)));
  }
}
_NutritionalGoalService = NutritionalGoalService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(NutritionalGoalService, "\u0275fac", function NutritionalGoalService_Factory(t) {
  return new (t || _NutritionalGoalService)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_nutritional_goal_api_service__WEBPACK_IMPORTED_MODULE_1__.NutritionalGoalApiService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵinject"](_user_user_service__WEBPACK_IMPORTED_MODULE_2__.UserService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(NutritionalGoalService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
  token: _NutritionalGoalService,
  factory: _NutritionalGoalService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 57806:
/*!***************************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/recipe/recipe-draft.service.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RecipeDraftService: () => (/* binding */ RecipeDraftService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 69717);

var _RecipeDraftService;


const EMPTY_FORM = {
  name: '',
  description: '',
  quantity: null,
  quantityCooked: null
};
const EMPTY_STATE = {
  active: false,
  mode: 'create',
  recipe: null,
  customRecipe: null,
  meal: null,
  dietDay: null,
  returnUrl: null,
  ingredients: [],
  editingIngredientIndex: null,
  editingBaseRecipe: false,
  form: EMPTY_FORM
};
class RecipeDraftService {
  constructor() {
    /**
     * Fuente única en memoria para el draft de recipes.
     * Evita depender de tempData/history.state al navegar entre:
     * config-recipe -> search-foods -> add-product -> config-recipe
     */
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_state", (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.signal)(EMPTY_STATE));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "state", (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.computed)(() => this._state()));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isActive", (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.computed)(() => this._state().active));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "mode", (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.computed)(() => this._state().mode));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "recipe", (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.computed)(() => this._state().recipe));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "customRecipe", (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.computed)(() => this._state().customRecipe));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "meal", (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.computed)(() => this._state().meal));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "dietDay", (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.computed)(() => this._state().dietDay));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "returnUrl", (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.computed)(() => this._state().returnUrl));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "form", (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.computed)(() => this._state().form));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "ingredients", (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.computed)(() => this._state().ingredients));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "editingIngredientIndex", (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.computed)(() => this._state().editingIngredientIndex));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "editingBaseRecipe", (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.computed)(() => this._state().editingBaseRecipe));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "editingIngredient", (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.computed)(() => {
      const state = this._state();
      const index = state.editingIngredientIndex;
      if (index === null || index < 0 || index >= state.ingredients.length) {
        return null;
      }
      return state.ingredients[index];
    }));
  }
  startDraft(input) {
    this._state.set({
      active: true,
      mode: input.mode,
      recipe: this.cloneRecipe(input.recipe),
      customRecipe: this.cloneCustomRecipe(input.customRecipe ?? null),
      meal: this.cloneMeal(input.meal ?? null),
      dietDay: this.cloneDietDay(input.dietDay ?? null),
      returnUrl: input.returnUrl ?? null,
      ingredients: this.cloneIngredients(input.ingredients ?? []),
      editingIngredientIndex: input.editingIngredientIndex ?? null,
      editingBaseRecipe: !!input.editingBaseRecipe,
      form: {
        ...EMPTY_FORM,
        ...(input.form ?? EMPTY_FORM)
      }
    });
  }
  matchesContext(context) {
    const current = this._state();
    if (!current.active) return false;
    return current.mode === context.mode && this.normalizeId(current.recipe) === this.normalizeId(context.recipe) && this.normalizeId(current.customRecipe) === this.normalizeId(context.customRecipe) && this.normalizeId(current.meal) === this.normalizeId(context.meal);
  }
  setForm(partial) {
    this._state.update(state => ({
      ...state,
      form: {
        ...state.form,
        ...partial
      }
    }));
  }
  setIngredients(ingredients) {
    this._state.update(state => ({
      ...state,
      ingredients: this.cloneIngredients(ingredients)
    }));
  }
  setEditingIngredientIndex(index) {
    this._state.update(state => ({
      ...state,
      editingIngredientIndex: index
    }));
  }
  setEditingBaseRecipe(editingBaseRecipe) {
    this._state.update(state => ({
      ...state,
      editingBaseRecipe
    }));
  }
  syncRecipe(recipe) {
    this._state.update(state => {
      if (!state.active) return state;
      const nextRecipe = this.cloneRecipe(recipe);
      const nextCustomRecipe = state.customRecipe ? {
        ...state.customRecipe,
        recipe: typeof state.customRecipe.recipe === 'object' && nextRecipe ? nextRecipe : state.customRecipe.recipe
      } : null;
      return {
        ...state,
        recipe: nextRecipe,
        customRecipe: nextCustomRecipe,
        form: {
          ...state.form,
          name: nextRecipe?.name ?? '',
          description: nextRecipe?.description ?? ''
        }
      };
    });
  }
  updateIngredientAt(index, ingredient) {
    this._state.update(state => {
      const nextIngredients = this.cloneIngredients(state.ingredients);
      if (index >= 0 && index < nextIngredients.length) {
        nextIngredients[index] = this.cloneIngredient(ingredient);
      } else {
        nextIngredients.push(this.cloneIngredient(ingredient));
      }
      return {
        ...state,
        ingredients: nextIngredients
      };
    });
  }
  removeProductReferences(productId) {
    if (!productId) return;
    this._state.update(state => {
      if (!state.active) return state;
      const nextRecipe = state.recipe ? {
        ...state.recipe,
        customProducts: this.cloneIngredients((state.recipe.customProducts || []).filter(ingredient => this.getProductId(ingredient) !== productId))
      } : null;
      const removedBaseIds = new Set((state.recipe?.customProducts || []).filter(ingredient => this.getProductId(ingredient) === productId).map(ingredient => ingredient?._id?.toString?.()).filter(Boolean));
      const nextCustomRecipe = state.customRecipe ? {
        ...state.customRecipe,
        recipe: typeof state.customRecipe.recipe === 'object' && nextRecipe ? nextRecipe : state.customRecipe.recipe,
        addedCustomProducts: this.cloneIngredients((state.customRecipe.addedCustomProducts || []).filter(ingredient => this.getProductId(ingredient) !== productId)),
        modifiedBaseCustomProducts: (state.customRecipe.modifiedBaseCustomProducts || []).filter(item => {
          const baseCustomProductId = typeof item?.baseCustomProductId === 'string' ? item.baseCustomProductId : item?.baseCustomProductId?._id;
          return !removedBaseIds.has((baseCustomProductId || '').toString());
        }),
        removedBaseCustomProductIds: (state.customRecipe.removedBaseCustomProductIds || []).filter(id => !removedBaseIds.has((id?._id || id || '').toString()))
      } : null;
      const nextIngredients = this.cloneIngredients(state.ingredients.filter(ingredient => this.getProductId(ingredient) !== productId));
      const currentEditingIndex = state.editingIngredientIndex;
      const nextEditingIngredientIndex = typeof currentEditingIndex === 'number' && currentEditingIndex >= nextIngredients.length ? null : currentEditingIndex;
      return {
        ...state,
        recipe: nextRecipe,
        customRecipe: nextCustomRecipe,
        ingredients: nextIngredients,
        editingIngredientIndex: nextEditingIngredientIndex
      };
    });
  }
  reset() {
    this._state.set(EMPTY_STATE);
  }
  normalizeId(value) {
    if (!value) return null;
    if (typeof value === 'string') return value;
    if (value?._id) return value._id.toString();
    if (value?.name) return `name:${value.name}`;
    if (value?.date) return `date:${value.date}`;
    return null;
  }
  cloneIngredients(ingredients) {
    return (ingredients || []).map(ingredient => this.cloneIngredient(ingredient));
  }
  cloneIngredient(ingredient) {
    return {
      ...ingredient,
      allergens: ingredient?.allergens ? [...ingredient.allergens] : undefined,
      traces: ingredient?.traces ? [...ingredient.traces] : undefined,
      product: typeof ingredient?.product === 'object' && ingredient.product ? {
        ...ingredient.product
      } : ingredient?.product
    };
  }
  cloneRecipe(recipe) {
    if (!recipe) return null;
    return {
      ...recipe,
      customProducts: this.cloneIngredients(recipe.customProducts || [])
    };
  }
  cloneCustomRecipe(customRecipe) {
    if (!customRecipe) return null;
    return {
      ...customRecipe,
      recipe: typeof customRecipe.recipe === 'object' && customRecipe.recipe ? this.cloneRecipe(customRecipe.recipe) : customRecipe.recipe,
      addedCustomProducts: this.cloneIngredients(customRecipe.addedCustomProducts || []),
      modifiedBaseCustomProducts: (customRecipe.modifiedBaseCustomProducts || []).map(item => ({
        ...item,
        allergens: item?.allergens ? [...item.allergens] : undefined,
        traces: item?.traces ? [...item.traces] : undefined
      })),
      removedBaseCustomProductIds: [...(customRecipe.removedBaseCustomProductIds || [])]
    };
  }
  cloneMeal(meal) {
    if (!meal) return null;
    return {
      ...meal,
      customProducts: this.cloneIngredients(meal.customProducts || []),
      customRecipes: [...(meal.customRecipes || [])]
    };
  }
  cloneDietDay(dietDay) {
    if (!dietDay) return null;
    return {
      ...dietDay,
      meals: [...(dietDay.meals || [])]
    };
  }
  getProductId(ingredient) {
    const product = ingredient?.product;
    return product?._id?.toString?.() || product?.toString?.() || null;
  }
}
_RecipeDraftService = RecipeDraftService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipeDraftService, "\u0275fac", function RecipeDraftService_Factory(t) {
  return new (t || _RecipeDraftService)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipeDraftService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
  token: _RecipeDraftService,
  factory: _RecipeDraftService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 71234:
/*!*************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/diets/components/macros-bars/macros-bars.component.ts ***!
  \*************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MacrosBarsComponent: () => (/* binding */ MacrosBarsComponent)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 45398);
/* harmony import */ var src_app_core_services_diet_day_diet_day_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/diet-day/diet-day.service */ 18086);
/* harmony import */ var src_app_core_services_nutritional_goal_nutritional_goal_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/nutritional-goal/nutritional-goal.service */ 29586);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var src_app_shared_models_macros_data__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/models/macros-data */ 41805);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 54844);


var _MacrosBarsComponent;









const _c0 = function (a0) {
  return {
    "progress-complete": a0
  };
};
function MacrosBarsComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 3)(1, "div", 4)(2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "ion-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "div", 7)(5, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](7, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](10, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](11, "ion-progress-bar", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](7, 4, ctx_r0.macrosData.kcal, "1.0-0"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" / ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](10, 7, ctx_r0._kcalTotal, "1.0-0"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx_r0.macrosData.kcal > ctx_r0._kcalTotal ? 1 : ctx_r0.macrosData.kcal / ctx_r0._kcalTotal)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](10, _c0, ctx_r0.macrosData.kcal >= ctx_r0._kcalTotal));
  }
}
function MacrosBarsComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 3)(1, "div", 4)(2, "div", 11)(3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "P");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 7)(6, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](8, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](11, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "ion-progress-bar", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](8, 4, ctx_r1.macrosData.protein, "1.1-1"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" / ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](11, 7, ctx_r1._proteinsGTotal, "1.0-0"), " g ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx_r1.macrosData.protein > ctx_r1._proteinsGTotal ? 1 : ctx_r1.macrosData.protein / ctx_r1._proteinsGTotal)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](10, _c0, ctx_r1.macrosData.protein >= ctx_r1._proteinsGTotal));
  }
}
function MacrosBarsComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 3)(1, "div", 4)(2, "div", 13)(3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "H");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 7)(6, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](8, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](11, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "ion-progress-bar", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](8, 4, ctx_r2.macrosData.carbohydrate, "1.1-1"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" / ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](11, 7, ctx_r2._carbohydratesGTotal, "1.0-0"), " g ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx_r2.macrosData.carbohydrate > ctx_r2._carbohydratesGTotal ? 1 : ctx_r2.macrosData.carbohydrate / ctx_r2._carbohydratesGTotal)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](10, _c0, ctx_r2.macrosData.carbohydrate >= ctx_r2._carbohydratesGTotal));
  }
}
function MacrosBarsComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 3)(1, "div", 4)(2, "div", 15)(3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](4, "G");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 7)(6, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](8, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipe"](11, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "ion-progress-bar", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](8, 4, ctx_r3.macrosData.fat, "1.1-1"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" / ", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpipeBind2"](11, 7, ctx_r3._fatGTotal, "1.0-0"), " g ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("value", ctx_r3.macrosData.fat > ctx_r3._fatGTotal ? 1 : ctx_r3.macrosData.fat / ctx_r3._fatGTotal)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](10, _c0, ctx_r3.macrosData.fat >= ctx_r3._fatGTotal));
  }
}
const _c1 = function (a0) {
  return {
    "dark-theme": a0
  };
};
class MacrosBarsComponent {
  get _kcalTotal() {
    return this.activeGoal?.kcalTotal || this.user?.kcalTotal || 0;
  }
  get _proteinsGTotal() {
    return this.activeGoal?.proteinsGTotal || this.user?.proteinsGTotal || 0;
  }
  get _carbohydratesGTotal() {
    return this.activeGoal?.carbohydratesGTotal || this.user?.carbohydratesGTotal || 0;
  }
  get _fatGTotal() {
    return this.activeGoal?.fatGTotal || this.user?.fatGTotal || 0;
  }
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isFooterHidden", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "macrosBars", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "theme", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "clickable", true);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "user", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "activeGoal", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "macrosData", new src_app_shared_models_macros_data__WEBPACK_IMPORTED_MODULE_5__.MacrosData());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietDay", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietDaySubscription", void 0);
    // Inyección de servicios con signals
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "userService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_4__.UserService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "nutritionalGoalService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(src_app_core_services_nutritional_goal_nutritional_goal_service__WEBPACK_IMPORTED_MODULE_3__.NutritionalGoalService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietDayService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(src_app_core_services_diet_day_diet_day_service__WEBPACK_IMPORTED_MODULE_2__.DietDayService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "navCtrl", (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.NavController));
    // Effect para reaccionar a cambios en el usuario
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.effect)(() => {
      const updatedUser = this.userService.localUser();
      if (updatedUser) {
        this.user = updatedUser;
        this.loadActiveGoal();
        if (this.dietDay) {
          this.getDietInfo();
        }
      }
    });
    // Suscripción al dietDay actual
    this.dietDaySubscription = this.dietDayService.getCurrentDietDay.subscribe(resDietDay => {
      this.dietDay = resDietDay;
      if (this.dietDay) {
        setTimeout(() => {
          this.getDietInfo();
        }, 0);
      }
    });
  }
  loadActiveGoal() {
    if (this.user?.goalInUse) {
      const goal = this.nutritionalGoalService.getGoalById(this.user.goalInUse);
      if (goal) {
        this.activeGoal = goal;
      } else {
        this.nutritionalGoalService.refreshFromServer().subscribe(goals => {
          this.activeGoal = goals.find(g => g._id === this.user.goalInUse) || null;
        });
      }
    } else {
      this.activeGoal = null;
    }
  }
  ngOnDestroy() {
    // Limpiar suscripción
    if (this.dietDaySubscription) {
      this.dietDaySubscription.unsubscribe();
    }
  }
  calculateProgressBar(current, max) {
    return current * 100 / max / 100;
  }
  getDietInfo() {
    if (!this.dietDay) return;
    this.macrosData = new src_app_shared_models_macros_data__WEBPACK_IMPORTED_MODULE_5__.MacrosData();
    this.macrosData.kcal = this.dietDayService.getDietDayKcal(this.dietDay);
    this.macrosData.protein = this.dietDayService.getDietDayProteins(this.dietDay);
    this.macrosData.carbohydrate = this.dietDayService.getDietDayCarbohydrates(this.dietDay);
    this.macrosData.fat = this.dietDayService.getDietDayFat(this.dietDay);
  }
  openNutritionalObjectives() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this.clickable) return;
      yield _this.navCtrl.navigateForward(['/tabs/diets/nutritional-objectives']);
    })();
  }
  calculateMacros100g(mealTemp, customProductTemp) {
    const energy100 = customProductTemp.energyKcal100g ?? customProductTemp.product?.energyKcal100g ?? 0;
    const protein100 = customProductTemp.protein100g ?? customProductTemp.product?.protein100g ?? 0;
    const carbs100 = customProductTemp.carbohydrates100g ?? customProductTemp.product?.carbohydrates100g ?? 0;
    const fat100 = customProductTemp.fat100g ?? customProductTemp.product?.fat100g ?? 0;
    mealTemp.kcal += energy100 * customProductTemp.quantity / 100 || 0;
    mealTemp.protein += protein100 * customProductTemp.quantity / 100 || 0;
    mealTemp.carbohydrate += carbs100 * customProductTemp.quantity / 100 || 0;
    mealTemp.fat += fat100 * customProductTemp.quantity / 100 || 0;
  }
}
_MacrosBarsComponent = MacrosBarsComponent;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(MacrosBarsComponent, "\u0275fac", function MacrosBarsComponent_Factory(t) {
  return new (t || _MacrosBarsComponent)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(MacrosBarsComponent, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: _MacrosBarsComponent,
  selectors: [["app-macros-bars"]],
  inputs: {
    isFooterHidden: "isFooterHidden",
    macrosBars: "macrosBars",
    theme: "theme",
    clickable: "clickable"
  },
  decls: 6,
  vars: 8,
  consts: [[1, "macros-container", 3, "hidden", "ngClass", "click"], [1, "macros-flex-container"], ["class", "macro-item", 4, "ngIf"], [1, "macro-item"], [1, "macro-header"], [1, "macro-icon", "calories-icon"], ["name", "flash-outline"], [1, "macro-values"], [1, "macro-value"], [1, "macro-goal"], [1, "calories-bar", 3, "value", "ngClass"], [1, "macro-icon", "protein-icon"], [1, "protein-bar", 3, "value", "ngClass"], [1, "macro-icon", "carbs-icon"], [1, "carbs-bar", 3, "value", "ngClass"], [1, "macro-icon", "fat-icon"], [1, "fat-bar", 3, "value", "ngClass"]],
  template: function MacrosBarsComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function MacrosBarsComponent_Template_div_click_0_listener() {
        return ctx.openNutritionalObjectives();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, MacrosBarsComponent_div_2_Template, 12, 12, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, MacrosBarsComponent_div_3_Template, 13, 12, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](4, MacrosBarsComponent_div_4_Template, 13, 12, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](5, MacrosBarsComponent_div_5_Template, 13, 12, "div", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("hidden", ctx.isFooterHidden)("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction1"](6, _c1, ctx.theme === "dark"));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !(ctx.macrosBars == null ? null : ctx.macrosBars.hideBars) && !(ctx.macrosBars == null ? null : ctx.macrosBars.hideMinKcal));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !(ctx.macrosBars == null ? null : ctx.macrosBars.hideBars) && !(ctx.macrosBars == null ? null : ctx.macrosBars.hideMinProtein));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !(ctx.macrosBars == null ? null : ctx.macrosBars.hideBars) && !(ctx.macrosBars == null ? null : ctx.macrosBars.hideMinCarbohydrates));
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !(ctx.macrosBars == null ? null : ctx.macrosBars.hideBars) && !(ctx.macrosBars == null ? null : ctx.macrosBars.hideMinFat));
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgClass, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonProgressBar, _angular_common__WEBPACK_IMPORTED_MODULE_8__.DecimalPipe],
  styles: ["ion-progress-bar[_ngcontent-%COMP%] {\n  border-radius: 2px;\n  height: 4px !important;\n}\n\n.macros-container[_ngcontent-%COMP%] {\n  background: #141414;\n  padding: 4px 6px !important;\n  margin: 0 !important;\n  border-radius: 0 !important;\n  position: relative;\n}\n.macros-container[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border-radius: 0;\n  padding: 1px;\n  background: linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02));\n  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);\n  -webkit-mask-composite: xor;\n          mask-composite: exclude;\n  pointer-events: none;\n  z-index: 1;\n}\n.macros-container[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 1px;\n  background: #252525;\n  z-index: 10;\n}\n.macros-container[_ngcontent-%COMP%]   .macro-value[_ngcontent-%COMP%] {\n  color: #ffffff !important;\n  font-weight: 700 !important;\n  font-variant-numeric: tabular-nums;\n  font-size: 12px;\n  line-height: 1.1;\n  letter-spacing: -0.02em;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\n  -webkit-background-clip: text;\n  background-clip: text;\n}\n.macros-container[_ngcontent-%COMP%]   .macro-goal[_ngcontent-%COMP%] {\n  color: #9ca3af !important;\n  font-weight: 500 !important;\n  font-size: 10px;\n  line-height: 1.2;\n  letter-spacing: 0.01em;\n  opacity: 0.9;\n}\n@media (max-width: 480px) {\n  .macros-container[_ngcontent-%COMP%]   .macro-goal[_ngcontent-%COMP%] {\n    font-weight: 600;\n    opacity: 1;\n  }\n}\n.macros-container[_ngcontent-%COMP%]   .macro-icon[_ngcontent-%COMP%] {\n  width: 22px;\n  height: 22px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transform: scale(1);\n  position: relative;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2);\n}\n.macros-container[_ngcontent-%COMP%]   .macro-icon[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 2px;\n  left: 2px;\n  right: 2px;\n  height: 40%;\n  border-radius: 50%;\n  pointer-events: none;\n}\n.macros-container[_ngcontent-%COMP%]   .macro-icon[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .macros-container[_ngcontent-%COMP%]   .macro-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 11px;\n  font-weight: bold;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);\n  z-index: 1;\n  position: relative;\n}\n.macros-container[_ngcontent-%COMP%]   .macro-icon.calories-icon[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #FE9000 0%, #ff7b00 100%) !important;\n  border: 1px solid rgba(254, 144, 0, 0.3);\n}\n.macros-container[_ngcontent-%COMP%]   .macro-icon.protein-icon[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #3880ff 0%, #2563eb 100%) !important;\n  border: 1px solid rgba(56, 128, 255, 0.3);\n}\n.macros-container[_ngcontent-%COMP%]   .macro-icon.carbs-icon[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #2dd36f 0%, #059669 100%) !important;\n  border: 1px solid rgba(45, 211, 111, 0.3);\n}\n.macros-container[_ngcontent-%COMP%]   .macro-icon.fat-icon[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #ffc409 0%, #ca8a04 100%) !important;\n  border: 1px solid rgba(255, 196, 9, 0.3);\n}\n.macros-container[_ngcontent-%COMP%]   ion-progress-bar[_ngcontent-%COMP%] {\n  background: #252525 !important;\n  width: 100%;\n  border-radius: 3px !important;\n  overflow: hidden;\n  position: relative;\n}\n.macros-container[_ngcontent-%COMP%]   ion-progress-bar[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%);\n  pointer-events: none;\n}\n.macros-container[_ngcontent-%COMP%]   ion-progress-bar.calories-bar[_ngcontent-%COMP%] {\n  --progress-background: linear-gradient(90deg, #FE9000 0%, #ff7b00 100%) !important;\n  box-shadow: inset 0 1px 2px rgba(254, 144, 0, 0.3);\n}\n.macros-container[_ngcontent-%COMP%]   ion-progress-bar.protein-bar[_ngcontent-%COMP%] {\n  --progress-background: linear-gradient(90deg, #3880ff 0%, #2563eb 100%) !important;\n  box-shadow: inset 0 1px 2px rgba(56, 128, 255, 0.3);\n}\n.macros-container[_ngcontent-%COMP%]   ion-progress-bar.carbs-bar[_ngcontent-%COMP%] {\n  --progress-background: linear-gradient(90deg, #2dd36f 0%, #059669 100%) !important;\n  box-shadow: inset 0 1px 2px rgba(45, 211, 111, 0.3);\n}\n.macros-container[_ngcontent-%COMP%]   ion-progress-bar.fat-bar[_ngcontent-%COMP%] {\n  --progress-background: linear-gradient(90deg, #ffc409 0%, #ca8a04 100%) !important;\n  box-shadow: inset 0 1px 2px rgba(255, 196, 9, 0.3);\n}\n.macros-container[_ngcontent-%COMP%]   ion-progress-bar[_ngcontent-%COMP%]::part(progress) {\n  position: relative;\n}\n.macros-container[_ngcontent-%COMP%]   ion-progress-bar[_ngcontent-%COMP%]::part(progress)::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 50%;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);\n  pointer-events: none;\n}\n.macros-container[_ngcontent-%COMP%]:not(.dark-theme)   .macro-value[_ngcontent-%COMP%] {\n  color: #ffffff !important;\n}\n.macros-container[_ngcontent-%COMP%]:not(.dark-theme)   .macro-goal[_ngcontent-%COMP%] {\n  color: #9ca3af !important;\n}\n.macros-container.dark-theme[_ngcontent-%COMP%]   .macro-value[_ngcontent-%COMP%] {\n  color: #ffffff !important;\n}\n.macros-container.dark-theme[_ngcontent-%COMP%]   .macro-goal[_ngcontent-%COMP%] {\n  color: #9ca3af !important;\n}\n.macros-container[_ngcontent-%COMP%]   ion-progress-bar.progress-complete[_ngcontent-%COMP%] {\n  --progress-background: #ef4444 !important;\n}\n.macros-container[_ngcontent-%COMP%]   .macros-flex-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: stretch;\n  justify-content: space-between;\n  width: 100%;\n  gap: 12px;\n}\n@media (max-width: 480px) {\n  .macros-container[_ngcontent-%COMP%]   .macros-flex-container[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n}\n@media (max-width: 360px) {\n  .macros-container[_ngcontent-%COMP%]   .macros-flex-container[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n}\n.macros-container[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  flex: 1;\n  position: relative;\n  padding: 8px 4px;\n  min-width: 0;\n  border-radius: 8px;\n  cursor: pointer;\n}\n.macros-container[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%]:not(:last-child)::after {\n  content: \"\";\n  position: absolute;\n  right: -6px;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 1px;\n  height: 60%;\n  background: rgba(255, 255, 255, 0.1);\n}\n@media (max-width: 480px) {\n  .macros-container[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%]:not(:last-child)::after {\n    right: -4px;\n    height: 50%;\n  }\n}\n.macros-container[_ngcontent-%COMP%]   .macro-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin-bottom: 10px;\n  width: 100%;\n  justify-content: center;\n}\n@media (max-width: 480px) {\n  .macros-container[_ngcontent-%COMP%]   .macro-header[_ngcontent-%COMP%] {\n    gap: 6px;\n    margin-bottom: 8px;\n  }\n}\n.macros-container[_ngcontent-%COMP%]   .macro-values[_ngcontent-%COMP%] {\n  text-align: center;\n  min-width: 0;\n  flex: 1;\n  white-space: nowrap;\n  overflow: hidden;\n}\n@media (max-width: 360px) {\n  .macros-container[_ngcontent-%COMP%]   .macro-values[_ngcontent-%COMP%] {\n    font-size: 0.9em;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL2RpZXRzL2NvbXBvbmVudHMvbWFjcm9zLWJhcnMvbWFjcm9zLWJhcnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtFQUNBLHNCQUFBO0FBQ0Y7O0FBU0E7RUFDRSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0Esb0JBQUE7RUFDQSwyQkFBQTtFQUNBLGtCQUFBO0FBTkY7QUFRRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSx5RkFBQTtFQUNBLDhFQUNFO1VBREYsc0VBQ0U7RUFFRiwyQkFBQTtVQUFBLHVCQUFBO0VBQ0Esb0JBQUE7RUFDQSxVQUFBO0FBUko7QUFXRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7QUFUSjtBQVlFO0VBQ0UseUJBQUE7RUFDQSwyQkFBQTtFQUNBLGtDQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSx5Q0FBQTtFQUNBLDZCQUFBO0VBQ0EscUJBQUE7QUFWSjtBQWFFO0VBQ0UseUJBQUE7RUFDQSwyQkFBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0EsWUFBQTtBQVhKO0FBYUk7RUFSRjtJQVNJLGdCQUFBO0lBQ0EsVUFBQTtFQVZKO0FBQ0Y7QUFjRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFFQSw4R0FDRTtBQWROO0FBa0JJO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7QUFoQk47QUFtQkk7O0VBRUUsWUFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLHlDQUFBO0VBQ0EsVUFBQTtFQUNBLGtCQUFBO0FBakJOO0FBb0JJO0VBQ0Usd0VBQUE7RUFDQSx3Q0FBQTtBQWxCTjtBQXFCSTtFQUNFLHdFQUFBO0VBQ0EseUNBQUE7QUFuQk47QUFzQkk7RUFDRSx3RUFBQTtFQUNBLHlDQUFBO0FBcEJOO0FBdUJJO0VBQ0Usd0VBQUE7RUFDQSx3Q0FBQTtBQXJCTjtBQXlCRTtFQUNFLDhCQUFBO0VBQ0EsV0FBQTtFQUNBLDZCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQXZCSjtBQXlCSTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLG1HQUFBO0VBQ0Esb0JBQUE7QUF2Qk47QUEwQkk7RUFDRSxrRkFBQTtFQUNBLGtEQUFBO0FBeEJOO0FBMkJJO0VBQ0Usa0ZBQUE7RUFDQSxtREFBQTtBQXpCTjtBQTRCSTtFQUNFLGtGQUFBO0VBQ0EsbURBQUE7QUExQk47QUE2Qkk7RUFDRSxrRkFBQTtFQUNBLGtEQUFBO0FBM0JOO0FBOEJJO0VBQ0Usa0JBQUE7QUE1Qk47QUE4Qk07RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxNQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxXQUFBO0VBQ0Esa0ZBQUE7RUFDQSxvQkFBQTtBQTVCUjtBQWtDSTtFQUNFLHlCQUFBO0FBaENOO0FBbUNJO0VBQ0UseUJBQUE7QUFqQ047QUFzQ0k7RUFDRSx5QkFBQTtBQXBDTjtBQXVDSTtFQUNFLHlCQUFBO0FBckNOO0FBeUNFO0VBQ0UseUNBQUE7QUF2Q0o7QUEyQ0U7RUFDRSxhQUFBO0VBQ0Esb0JBQUE7RUFDQSw4QkFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0FBekNKO0FBMkNJO0VBUEY7SUFRSSxRQUFBO0VBeENKO0FBQ0Y7QUEwQ0k7RUFYRjtJQVlJLFFBQUE7RUF2Q0o7QUFDRjtBQTBDRTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsT0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FBeENKO0FBMENJO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFFBQUE7RUFDQSwyQkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0VBQ0Esb0NBQUE7QUF4Q047QUEwQ007RUFWRjtJQVdJLFdBQUE7SUFDQSxXQUFBO0VBdkNOO0FBQ0Y7QUEyQ0U7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EsdUJBQUE7QUF6Q0o7QUEyQ0k7RUFSRjtJQVNJLFFBQUE7SUFDQSxrQkFBQTtFQXhDSjtBQUNGO0FBMkNFO0VBQ0Usa0JBQUE7RUFDQSxZQUFBO0VBQ0EsT0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUF6Q0o7QUEyQ0k7RUFQRjtJQVFJLGdCQUFBO0VBeENKO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpb24tcHJvZ3Jlc3MtYmFyIHtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBoZWlnaHQ6IDRweCAhaW1wb3J0YW50O1xuICAvLyBBbmltYWNpw4PCs24gc3VhdmUgcGFyYSBsYXMgYmFycmFzIGRlIHByb2dyZXNvIGVsaW1pbmFkYVxuICAvLyB0cmFuc2l0aW9uOiBhbGwgMC42cyBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpICFpbXBvcnRhbnQ7XG5cbiAgLy8gQW5pbWFjacODwrNuIGRlbCBwcm9ncmVzbyBpbnRlcm5vIGVsaW1pbmFkYVxuICAvLyAmOjpwYXJ0KHByb2dyZXNzKSB7XG4gIC8vICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuOHMgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKSAhaW1wb3J0YW50O1xuICAvLyB9XG59XG5cbi5tYWNyb3MtY29udGFpbmVyIHtcbiAgYmFja2dyb3VuZDogIzE0MTQxNDtcbiAgcGFkZGluZzogNHB4IDZweCAhaW1wb3J0YW50O1xuICBtYXJnaW46IDAgIWltcG9ydGFudDtcbiAgYm9yZGVyLXJhZGl1czogMCAhaW1wb3J0YW50O1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiBcIlwiO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcbiAgICBib3R0b206IDA7XG4gICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICBwYWRkaW5nOiAxcHg7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4KSwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKSk7XG4gICAgbWFzazpcbiAgICAgIGxpbmVhci1ncmFkaWVudCgjZmZmIDAgMCkgY29udGVudC1ib3gsXG4gICAgICBsaW5lYXItZ3JhZGllbnQoI2ZmZiAwIDApO1xuICAgIG1hc2stY29tcG9zaXRlOiBleGNsdWRlO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIHotaW5kZXg6IDE7XG4gIH1cblxuICAmOjphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGhlaWdodDogMXB4O1xuICAgIGJhY2tncm91bmQ6ICMyNTI1MjU7XG4gICAgei1pbmRleDogMTA7XG4gIH1cblxuICAubWFjcm8tdmFsdWUge1xuICAgIGNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7XG4gICAgZm9udC13ZWlnaHQ6IDcwMCAhaW1wb3J0YW50O1xuICAgIGZvbnQtdmFyaWFudC1udW1lcmljOiB0YWJ1bGFyLW51bXM7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGxpbmUtaGVpZ2h0OiAxLjE7XG4gICAgbGV0dGVyLXNwYWNpbmc6IC0wLjAyZW07XG4gICAgdGV4dC1zaGFkb3c6IDAgMXB4IDJweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG4gICAgLXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6IHRleHQ7XG4gICAgYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xuICB9XG5cbiAgLm1hY3JvLWdvYWwge1xuICAgIGNvbG9yOiAjOWNhM2FmICFpbXBvcnRhbnQ7XG4gICAgZm9udC13ZWlnaHQ6IDUwMCAhaW1wb3J0YW50O1xuICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICBsaW5lLWhlaWdodDogMS4yO1xuICAgIGxldHRlci1zcGFjaW5nOiAwLjAxZW07XG4gICAgb3BhY2l0eTogMC45O1xuXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgb3BhY2l0eTogMTtcbiAgICB9XG4gIH1cblxuICAvLyBJY29ub3MgZGUgbWFjcm9zIGNvbiBjb2xvcmVzIGVzcGVjw4PCrWZpY29zIC0gT3B0aW1pemFkb3NcbiAgLm1hY3JvLWljb24ge1xuICAgIHdpZHRoOiAyMnB4O1xuICAgIGhlaWdodDogMjJweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgYm94LXNoYWRvdzpcbiAgICAgIDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuMiksXG4gICAgICAwIDFweCAycHggcmdiYSgwLCAwLCAwLCAwLjEpLFxuICAgICAgaW5zZXQgMCAxcHggMCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XG5cbiAgICAmOjpiZWZvcmUge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDJweDtcbiAgICAgIGxlZnQ6IDJweDtcbiAgICAgIHJpZ2h0OiAycHg7XG4gICAgICBoZWlnaHQ6IDQwJTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIH1cblxuICAgIHNwYW4sXG4gICAgaW9uLWljb24ge1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICB0ZXh0LXNoYWRvdzogMCAxcHggMnB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcbiAgICAgIHotaW5kZXg6IDE7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuXG4gICAgJi5jYWxvcmllcy1pY29uIHtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNGRTkwMDAgMCUsICNmZjdiMDAgMTAwJSkgIWltcG9ydGFudDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU0LCAxNDQsIDAsIDAuMyk7XG4gICAgfVxuXG4gICAgJi5wcm90ZWluLWljb24ge1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzM4ODBmZiAwJSwgIzI1NjNlYiAxMDAlKSAhaW1wb3J0YW50O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg1NiwgMTI4LCAyNTUsIDAuMyk7XG4gICAgfVxuXG4gICAgJi5jYXJicy1pY29uIHtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICMyZGQzNmYgMCUsICMwNTk2NjkgMTAwJSkgIWltcG9ydGFudDtcbiAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoNDUsIDIxMSwgMTExLCAwLjMpO1xuICAgIH1cblxuICAgICYuZmF0LWljb24ge1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI2ZmYzQwOSAwJSwgI2NhOGEwNCAxMDAlKSAhaW1wb3J0YW50O1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDE5NiwgOSwgMC4zKTtcbiAgICB9XG4gIH1cblxuICBpb24tcHJvZ3Jlc3MtYmFyIHtcbiAgICBiYWNrZ3JvdW5kOiAjMjUyNTI1ICFpbXBvcnRhbnQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4ICFpbXBvcnRhbnQ7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgICAmOjpiZWZvcmUge1xuICAgICAgY29udGVudDogJyc7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICB0b3A6IDA7XG4gICAgICByaWdodDogMDtcbiAgICAgIGJvdHRvbTogMDtcbiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgdHJhbnNwYXJlbnQgMCUsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkgNTAlLCB0cmFuc3BhcmVudCAxMDAlKTtcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIH1cblxuICAgICYuY2Fsb3JpZXMtYmFyIHtcbiAgICAgIC0tcHJvZ3Jlc3MtYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjRkU5MDAwIDAlLCAjZmY3YjAwIDEwMCUpICFpbXBvcnRhbnQ7XG4gICAgICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAycHggcmdiYSgyNTQsIDE0NCwgMCwgMC4zKTtcbiAgICB9XG5cbiAgICAmLnByb3RlaW4tYmFyIHtcbiAgICAgIC0tcHJvZ3Jlc3MtYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCAjMzg4MGZmIDAlLCAjMjU2M2ViIDEwMCUpICFpbXBvcnRhbnQ7XG4gICAgICBib3gtc2hhZG93OiBpbnNldCAwIDFweCAycHggcmdiYSg1NiwgMTI4LCAyNTUsIDAuMyk7XG4gICAgfVxuXG4gICAgJi5jYXJicy1iYXIge1xuICAgICAgLS1wcm9ncmVzcy1iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICMyZGQzNmYgMCUsICMwNTk2NjkgMTAwJSkgIWltcG9ydGFudDtcbiAgICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDJweCByZ2JhKDQ1LCAyMTEsIDExMSwgMC4zKTtcbiAgICB9XG5cbiAgICAmLmZhdC1iYXIge1xuICAgICAgLS1wcm9ncmVzcy1iYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsICNmZmM0MDkgMCUsICNjYThhMDQgMTAwJSkgIWltcG9ydGFudDtcbiAgICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMXB4IDJweCByZ2JhKDI1NSwgMTk2LCA5LCAwLjMpO1xuICAgIH1cblxuICAgICY6OnBhcnQocHJvZ3Jlc3MpIHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgICAgJjo6YWZ0ZXIge1xuICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIGxlZnQ6IDA7XG4gICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICBoZWlnaHQ6IDUwJTtcbiAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjIpIDAlLCB0cmFuc3BhcmVudCAxMDAlKTtcbiAgICAgICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgJjpub3QoLmRhcmstdGhlbWUpIHtcbiAgICAubWFjcm8tdmFsdWUge1xuICAgICAgY29sb3I6ICNmZmZmZmYgIWltcG9ydGFudDtcbiAgICB9XG5cbiAgICAubWFjcm8tZ29hbCB7XG4gICAgICBjb2xvcjogIzljYTNhZiAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxuXG4gICYuZGFyay10aGVtZSB7XG4gICAgLm1hY3JvLXZhbHVlIHtcbiAgICAgIGNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgLm1hY3JvLWdvYWwge1xuICAgICAgY29sb3I6ICM5Y2EzYWYgIWltcG9ydGFudDtcbiAgICB9XG4gIH1cblxuICBpb24tcHJvZ3Jlc3MtYmFyLnByb2dyZXNzLWNvbXBsZXRlIHtcbiAgICAtLXByb2dyZXNzLWJhY2tncm91bmQ6ICNlZjQ0NDQgIWltcG9ydGFudDtcbiAgfVxuXG4gIC8vIENvbnRlbmVkb3IgZmxleCBwYXJhIG1hY3JvcyAtIE1lam9yYWRvIHBhcmEgcmVzcG9uc2l2aWRhZFxuICAubWFjcm9zLWZsZXgtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBnYXA6IDEycHg7XG5cbiAgICBAbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcbiAgICAgIGdhcDogOHB4O1xuICAgIH1cblxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiAzNjBweCkge1xuICAgICAgZ2FwOiA2cHg7XG4gICAgfVxuICB9XG5cbiAgLm1hY3JvLWl0ZW0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGZsZXg6IDE7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHBhZGRpbmc6IDhweCA0cHg7XG4gICAgbWluLXdpZHRoOiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgICAmOm5vdCg6bGFzdC1jaGlsZCk6OmFmdGVyIHtcbiAgICAgIGNvbnRlbnQ6ICcnO1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgcmlnaHQ6IC02cHg7XG4gICAgICB0b3A6IDUwJTtcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgICAgIHdpZHRoOiAxcHg7XG4gICAgICBoZWlnaHQ6IDYwJTtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcblxuICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XG4gICAgICAgIHJpZ2h0OiAtNHB4O1xuICAgICAgICBoZWlnaHQ6IDUwJTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAubWFjcm8taGVhZGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA4cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiA0ODBweCkge1xuICAgICAgZ2FwOiA2cHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgfVxuICB9XG5cbiAgLm1hY3JvLXZhbHVlcyB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIG1pbi13aWR0aDogMDtcbiAgICBmbGV4OiAxO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAgIEBtZWRpYSAobWF4LXdpZHRoOiAzNjBweCkge1xuICAgICAgZm9udC1zaXplOiAwLjllbTtcbiAgICB9XG4gIH1cbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ }),

/***/ 51887:
/*!*********************************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/diets/components/meal/components/search-foods/components/product/product.component.ts ***!
  \*********************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProductComponent: () => (/* binding */ ProductComponent)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 65821);
/* harmony import */ var src_app_core_models_customProduct__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/models/customProduct */ 9268);
/* harmony import */ var src_app_shared_constants_db_translations_es_en_db_map__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/constants/db-translations/es-en-db.map */ 76717);
/* harmony import */ var src_app_shared_models_theme__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/models/theme */ 20544);
/* harmony import */ var src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/constants/measureFilter */ 46926);
/* harmony import */ var src_app_core_services_custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/custom-product/custom-product.service */ 57846);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var src_app_core_services_util_util_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/util/util.service */ 35400);
/* harmony import */ var src_app_core_services_diet_day_diet_day_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/diet-day/diet-day.service */ 18086);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/services/util/navigation.service */ 22938);
/* harmony import */ var src_app_core_services_meal_meal_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/core/services/meal/meal.service */ 96994);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _shared_ui_src_app_shared_pipes_measure_pipe__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../../../../../../shared-ui/src/app/shared/pipes/measure.pipe */ 78688);

var _ProductComponent;

















function ProductComponent_ion_icon_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "ion-icon", 20);
  }
}
const _c0 = function (a0) {
  return {
    mealName: a0
  };
};
function ProductComponent_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" (", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](2, 1, "ADD_PRODUCT.ADDED_TO_MEAL", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction1"](4, _c0, ctx_r1.mealNameTranslated)), ") ");
  }
}
function ProductComponent_span_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"]("[", ctx_r2.brand, "]");
  }
}
function ProductComponent_button_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function ProductComponent_button_14_Template_button_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r6.onTrainerFavoriteClick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](1, "ion-icon", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵclassProp"]("is-favorite", ctx_r3.isTrainerFavorite);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("name", ctx_r3.isTrainerFavorite ? "bookmark" : "bookmark-outline");
  }
}
function ProductComponent_div_15_ion_spinner_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](0, "ion-spinner", 28);
  }
}
function ProductComponent_div_15_ion_checkbox_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "ion-checkbox", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("ionChange", function ProductComponent_div_15_ion_checkbox_2_Template_ion_checkbox_ionChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵresetView"](ctx_r10.trainerMultiSelect ? ctx_r10.onTrainerCheckboxChange($event) : ctx_r10.ingredientMode ? ctx_r10.onCheckboxChangeIngredientMode($event) : ctx_r10.toggleProduct($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("checked", ctx_r9.isChecked)("disabled", ctx_r9.isBusy);
  }
}
function ProductComponent_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function ProductComponent_div_15_Template_div_click_0_listener($event) {
      return $event.stopPropagation();
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](1, ProductComponent_div_15_ion_spinner_1_Template, 1, 0, "ion-spinner", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](2, ProductComponent_div_15_ion_checkbox_2_Template, 1, 2, "ion-checkbox", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx_r4.actionLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", !ctx_r4.actionLoading);
  }
}
function ProductComponent_div_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate2"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](2, 2, "ADD_PRODUCT.NO_INFO"), " ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind1"](3, 4, ctx_r5.MEASURE_FILTER[ctx_r5.MEASURE_FILTER[ctx_r5.measureFilter].id].name), " ");
  }
}
const _c1 = function (a0) {
  return {
    "font-weight": a0
  };
};
class ProductComponent {
  get mealNameTranslated() {
    if (this.ingredientMode) {
      return this.translate.instant('FILTER.RECIPE');
    }
    const name = this.meal?.name || '';
    if (this.translate.currentLang === 'en') {
      return src_app_shared_constants_db_translations_es_en_db_map__WEBPACK_IMPORTED_MODULE_2__.DB_ES_EN_MAP[name] || name;
    }
    return name;
  }
  constructor(customProductService, translate, utilService, dietDayService, userService, navigationService, mealService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "customProductService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "translate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "utilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "dietDayService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "userService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "navigationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "mealService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "dietDay", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "meal", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "product", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "ingredientMode", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isIngredientSelected", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "recentCustomProduct", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "showRecentIcon", false);
    // TAREA5 (train-fit-trainers) — selección múltiple: cuando está activa, un
    // click en la fila o en el checkbox marca/desmarca este producto en la
    // "cesta" del panel (ver SearchFoodsPage#trainerSelection) en vez de
    // escribir contra la dieta del CONSUMIDOR logueado (que es lo que hacen
    // toggleProduct()/openAddProduct() más abajo — ninguno de los dos sirve
    // para "la dieta de OTRO usuario"). Código nuevo, no reutiliza ni modifica
    // la rama de ingredientMode.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "trainerMultiSelect", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isTrainerSelected", false);
    // Fix — sin esto, la card de un producto ya marcado en la cesta (modo
    // entrenador) mostraba SIEMPRE la cantidad/macros por defecto del
    // producto (servingQuantity/100g), nunca la cantidad custom que el
    // trainer puso en la cesta o en el panel de detalle — displayCustomProduct
    // solo miraba meal.customProducts (vacío en modo entrenador) y
    // recentCustomProduct (histórico, no la selección actual).
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "trainerSelectedQuantity", null);
    // TAREA5 (auditoría UX, Fase B) — favoritos personales del entrenador.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isTrainerFavorite", false);
    // Fix (ronda detalle) — resaltado naranja cuando este producto es el que
    // se está previsualizando en el panel de detalle aparte (ver
    // SearchFoodsPage#onFocusItem). No implica selección.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isTrainerFocused", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "delete", new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "update", new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "ingredientToggle", new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "trainerToggle", new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "trainerFavoriteToggle", new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "trainerFocus", new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "measureFilter", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "brand", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "loading", {
      value: false
    });
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "actionLoading", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isChecked", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "customProduct", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "productQuantity", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "MEASURE_FILTER_TYPES", src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_4__.MEASURE_FILTER_TYPES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "CUSTOM_PRODUCT_KEYS", src_app_core_models_customProduct__WEBPACK_IMPORTED_MODULE_1__.CUSTOM_PRODUCT_KEYS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "MEASURE_FILTER", src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_4__.MEASURE_FILTER);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "THEMES", src_app_shared_models_theme__WEBPACK_IMPORTED_MODULE_3__.THEMES);
    this.customProductService = customProductService;
    this.translate = translate;
    this.utilService = utilService;
    this.dietDayService = dietDayService;
    this.userService = userService;
    this.navigationService = navigationService;
    this.mealService = mealService;
  }
  ngOnInit() {
    this.getLoading();
    this.existCustomProduct();
    if (this.meal && !this.ingredientMode) this.utilService.getUnselected.subscribe(() => this.isProductChecked());
    this.getProductQuanityByFilter();
    this.setBrand();
    this.isProductChecked();
  }
  ngOnChanges(changes) {
    if (changes.meal || changes.isIngredientSelected || changes.isTrainerSelected || changes.trainerSelectedQuantity || changes.product || changes.recentCustomProduct) {
      this.existCustomProduct();
      this.isProductChecked();
      this.setBrand();
    }
  }
  get isBusy() {
    return this.loading.value || this.actionLoading;
  }
  get displayCustomProduct() {
    if (this.trainerMultiSelect && this.isTrainerSelected && this.trainerSelectedQuantity != null) {
      return {
        ...(this.customProduct || {}),
        product: this.product,
        quantity: this.trainerSelectedQuantity
      };
    }
    return this.customProduct || this.recentCustomProduct || null;
  }
  onCardClick() {
    if (this.isBusy) return;
    if (this.trainerMultiSelect) {
      // Fix (ronda detalle) — tocar la card ya NO añade/quita de la
      // selección (eso es exclusivo del checkbox, ver onTrainerCheckboxChange
      // más abajo): solo previsualiza en el panel de detalle aparte.
      this.trainerFocus.emit(this.product);
      return;
    }
    if (this.ingredientMode) {
      this.onRowClickIngredientMode();
      return;
    }
    this.openAddProduct();
  }
  // Checkbox dedicado del modo entrenador — separado de
  // onCheckboxChangeIngredientMode/toggleProduct para no arrastrar ninguna
  // de sus llamadas a la API del consumidor.
  onTrainerCheckboxChange(event) {
    this.trainerToggle.emit({
      product: this.product,
      checked: event.detail.checked
    });
    // Añadir con el check también previsualiza — no solo tocar la card.
    if (event.detail.checked) {
      this.trainerFocus.emit(this.product);
    }
  }
  onTrainerFavoriteClick(event) {
    event.stopPropagation();
    this.trainerFavoriteToggle.emit(this.product);
  }
  // Handler for row click in ingredient mode - navigate to add-product
  onRowClickIngredientMode() {
    console.log('[DEBUG] Row clicked in ingredient mode, navigating to add-product');
    const selectedIngredient = this.customProduct || null;
    const editingIngredientIndex = selectedIngredient ? this.getSelectedIngredientIndex(selectedIngredient) : null;
    // Navigate to add-product in ingredient mode
    this.navigationService.goToAddProduct({
      state: {
        product: selectedIngredient && typeof selectedIngredient.product === 'object' ? selectedIngredient.product : this.product,
        customProduct: selectedIngredient,
        editingIngredientIndex,
        meal: this.meal,
        dietDay: this.dietDay,
        ingredientMode: true,
        returnUrl: '/search-foods'
      }
    });
  }
  // Handler for checkbox change in ingredient mode
  onCheckboxChangeIngredientMode(event) {
    const checked = event.detail.checked;
    this.isChecked = checked;
    console.log('[DEBUG] Checkbox changed in ingredient mode:', {
      productName: this.product.name,
      productId: this.product._id,
      isChecked: this.isChecked,
      quantity: this.getEffectiveQuantity()
    });
    this.ingredientToggle.emit({
      product: this.product,
      quantity: this.getEffectiveQuantity(),
      checked: this.isChecked
    });
  }
  toggleProduct(event) {
    if (this.isBusy) return;
    const checked = this.utilService.getEventCheck(event);
    // In ingredient mode, just emit the product without API calls
    if (this.ingredientMode) {
      this.isChecked = checked;
      this.ingredientToggle.emit({
        product: this.product,
        quantity: this.getEffectiveQuantity(),
        checked: checked
      });
      return;
    }
    const newCustomProduct = this.buildCustomProductForAdd();
    if (checked) {
      if (this.product.energyKcal100g !== undefined && this.product.energyKcal100g !== null && this.product.protein100g !== undefined && this.product.protein100g !== null && this.product.carbohydrates100g !== undefined && this.product.carbohydrates100g !== null && this.product.fat100g !== undefined && this.product.fat100g !== null && (this.product.productQuantity || src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_4__.MEASURE_FILTER[src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_4__.MEASURE_FILTER_TYPES.total].id !== this.measureFilter) && (this.product.servingQuantity || src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_4__.MEASURE_FILTER[src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_4__.MEASURE_FILTER_TYPES.racion].id !== this.measureFilter)) {
        this.actionLoading = true;
        const idDietInUse = this.userService.getLocalUser.dietInUse;
        this.dietDayService.createCustomProduct(this.loading, this.dietDay, newCustomProduct, this.meal, idDietInUse).subscribe({
          next: () => {
            this.isChecked = true;
            this.actionLoading = false;
          },
          error: () => {
            this.isChecked = false;
            this.actionLoading = false;
            this.loading.value = false;
          }
        });
      } else {
        this.isChecked = false;
        this.openAddProduct();
      }
    } else {
      this.actionLoading = true;
      this.loading.value = true;
      const customProductToDelete = this.meal.customProducts.find(resCustomProduct => this.getCustomProductProductId(resCustomProduct) === this.getProductId(this.product));
      if (!customProductToDelete) {
        console.warn('[toggleProduct] No se encontró customProduct para eliminar. Puede que ya estuviera borrado.', this.product._id);
        this.isChecked = false;
        this.loading.value = false;
        this.actionLoading = false;
        return;
      }
      this.customProductService.deleteCustomProduct(customProductToDelete._id).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.take)(1)).subscribe({
        next: () => {
          this.isChecked = false;
          const indexCustomProduct = this.meal.customProducts.findIndex(customProductTemp => customProductTemp._id === customProductToDelete._id);
          this.meal.customProducts.splice(indexCustomProduct, 1);
          this.dietDayService.setCurrentDietDay = this.dietDay;
          this.customProduct = undefined;
          this.loading.value = false;
          this.actionLoading = false;
        },
        error: () => {
          this.loading.value = false;
          this.actionLoading = false;
        }
      });
    }
  }
  checkIfInfoExist() {
    if (typeof this.displayCustomProduct?.quantity === 'number' && this.displayCustomProduct.quantity > 0) {
      return false;
    }
    if (this.measureFilter === this.MEASURE_FILTER_TYPES.auto || this.measureFilter === this.MEASURE_FILTER_TYPES.cieng) {
      return false;
    }
    return !this.product.servingQuantity && this.measureFilter === this.MEASURE_FILTER_TYPES.racion || !this.product.productQuantity && this.measureFilter === this.MEASURE_FILTER_TYPES.total;
  }
  getProductQuanityByFilter() {
    this.utilService.getMeasureFilter.subscribe(resMeasureFilter => {
      this.measureFilter = resMeasureFilter;
      switch (this.measureFilter) {
        case src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_4__.MEASURE_FILTER_TYPES.auto:
          this.productQuantity = this.product.servingQuantity || 100;
          break;
        case src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_4__.MEASURE_FILTER_TYPES.cieng:
          this.productQuantity = 100;
          break;
        case src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_4__.MEASURE_FILTER_TYPES.racion:
          this.productQuantity = this.product.servingQuantity;
          break;
        case src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_4__.MEASURE_FILTER_TYPES.total:
          this.productQuantity = this.product.productQuantity;
          break;
      }
    });
  }
  isProductChecked() {
    if (this.trainerMultiSelect) {
      this.isChecked = this.isTrainerSelected;
      return;
    }
    // In ingredient mode, use the input from parent
    if (this.ingredientMode) {
      this.isChecked = this.isIngredientSelected;
      return;
    }
    // Guard against null meal or customProducts
    if (!this.meal?.customProducts) {
      this.isChecked = false;
      return;
    }
    const productId = this.getProductId(this.product);
    this.isChecked = !!this.meal.customProducts.find(customProductTemp => this.getCustomProductProductId(customProductTemp) === productId);
  }
  existCustomProduct() {
    const productId = this.getProductId(this.product);
    if (this.meal?.customProducts) this.customProduct = this.meal.customProducts.find(customProductTemp => this.getCustomProductProductId(customProductTemp) === productId);
  }
  getSelectedIngredientIndex(selectedIngredient) {
    if (!this.meal?.customProducts?.length) return null;
    const selectedProductId = this.getCustomProductProductId(selectedIngredient);
    if (!selectedProductId) return null;
    const index = this.meal.customProducts.findIndex(customProductTemp => this.getCustomProductProductId(customProductTemp) === selectedProductId);
    return index >= 0 ? index : null;
  }
  getCustomProductProductId(customProduct) {
    return this.getProductId(customProduct?.product);
  }
  getProductId(product) {
    if (!product) return null;
    if (typeof product === 'string') return product;
    return product?._id?.toString?.() || null;
  }
  getLoading() {
    this.utilService.getLoading.subscribe(res => this.loading.value = res);
  }
  openAddProduct() {
    const queryParams = {
      dietDay: JSON.stringify(this.dietDay),
      meal: JSON.stringify(this.meal),
      product: JSON.stringify(this.product),
      productQuantity: this.getEffectiveQuantity()
    };
    this.navigationService.goToAddProduct({
      replaceUrl: false,
      queryParams,
      state: {
        dietDay: this.dietDay,
        meal: this.meal,
        product: this.product,
        productQuantity: this.getEffectiveQuantity(),
        ingredientMode: this.ingredientMode,
        customProduct: this.customProduct,
        returnUrl: '/search-foods'
      }
    });
  }
  setBrand() {
    this.brand = this.displayCustomProduct ? this.displayCustomProduct.product?.brand : this.product.brand;
  }
  getEffectiveQuantity() {
    return this.customProduct?.quantity ?? this.recentCustomProduct?.quantity ?? this.productQuantity ?? 100;
  }
  buildCustomProductForAdd() {
    if (this.recentCustomProduct && !this.customProduct) {
      const recentPayload = {
        ...this.recentCustomProduct
      };
      delete recentPayload._id;
      delete recentPayload.mealId;
      delete recentPayload.customRecipeId;
      delete recentPayload.baseCustomProductId;
      delete recentPayload.lastUsedAt;
      return {
        ...recentPayload,
        quantity: this.getEffectiveQuantity(),
        order: 0,
        product: this.product
      };
    }
    return this.customProductService.composeCustomProduct(this.product, this.getEffectiveQuantity(), 0);
  }
}
_ProductComponent = ProductComponent;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProductComponent, "\u0275fac", function ProductComponent_Factory(t) {
  return new (t || _ProductComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_app_core_services_custom_product_custom_product_service__WEBPACK_IMPORTED_MODULE_5__.CustomProductService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_app_core_services_util_util_service__WEBPACK_IMPORTED_MODULE_6__.UtilService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_app_core_services_diet_day_diet_day_service__WEBPACK_IMPORTED_MODULE_7__.DietDayService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_8__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_9__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdirectiveInject"](src_app_core_services_meal_meal_service__WEBPACK_IMPORTED_MODULE_10__.MealService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ProductComponent, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵdefineComponent"]({
  type: _ProductComponent,
  selectors: [["app-product"]],
  inputs: {
    dietDay: "dietDay",
    meal: "meal",
    product: "product",
    ingredientMode: "ingredientMode",
    isIngredientSelected: "isIngredientSelected",
    recentCustomProduct: "recentCustomProduct",
    showRecentIcon: "showRecentIcon",
    trainerMultiSelect: "trainerMultiSelect",
    isTrainerSelected: "isTrainerSelected",
    trainerSelectedQuantity: "trainerSelectedQuantity",
    isTrainerFavorite: "isTrainerFavorite",
    isTrainerFocused: "isTrainerFocused"
  },
  outputs: {
    delete: "delete",
    update: "update",
    ingredientToggle: "ingredientToggle",
    trainerToggle: "trainerToggle",
    trainerFavoriteToggle: "trainerFavoriteToggle",
    trainerFocus: "trainerFocus"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵNgOnChangesFeature"]],
  decls: 38,
  vars: 47,
  consts: [[1, "product-card", 3, "click"], [1, "product-content"], [1, "product-header"], [1, "product-info"], [1, "name-row"], [1, "product-name"], ["name", "time-outline", "class", "recent-product-icon", 4, "ngIf"], ["class", "added-label", 4, "ngIf"], [1, "product-qty", 3, "ngStyle"], ["class", "product-brand", 4, "ngIf"], ["type", "button", "class", "trainer-favorite-btn", 3, "is-favorite", "click", 4, "ngIf"], ["class", "checkbox-container", 3, "click", 4, "ngIf"], [1, "product-macros"], [1, "macro-item"], [1, "macro-dot", "kcal"], [1, "macro-value"], [1, "macro-dot", "protein"], [1, "macro-dot", "carbs"], [1, "macro-dot", "fat"], ["class", "info-warning", 4, "ngIf"], ["name", "time-outline", 1, "recent-product-icon"], [1, "added-label"], [1, "product-brand"], ["type", "button", 1, "trainer-favorite-btn", 3, "click"], [3, "name"], [1, "checkbox-container", 3, "click"], ["name", "crescent", "color", "primary", 4, "ngIf"], ["mode", "ios", 3, "checked", "disabled", "ionChange", 4, "ngIf"], ["name", "crescent", "color", "primary"], ["mode", "ios", 3, "checked", "disabled", "ionChange"], [1, "info-warning"]],
  template: function ProductComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵlistener"]("click", function ProductComponent_Template_div_click_0_listener() {
        return ctx.onCardClick();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](6, ProductComponent_ion_icon_6_Template, 1, 0, "ion-icon", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](8, ProductComponent_span_8_Template, 3, 6, "span", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](9, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](11, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](12, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](13, ProductComponent_span_13_Template, 2, 1, "span", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](14, ProductComponent_button_14_Template, 2, 3, "button", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](15, ProductComponent_div_15_Template, 3, 2, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](16, "div", 12)(17, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](18, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](19, "span", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](20);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](21, "measure");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](22, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](23, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](24, "span", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](25);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](26, "measure");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](27, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](28, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](29, "span", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](30);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](31, "measure");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](32, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelement"](33, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementStart"](34, "span", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtext"](35);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipe"](36, "measure");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtemplate"](37, ProductComponent_div_37_Template, 4, 6, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      let tmp_9_0;
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵclassProp"]("product-selected", ctx.isChecked)("ingredient-mode", ctx.ingredientMode)("is-loading", ctx.actionLoading)("trainer-focused", ctx.isTrainerFocused);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.showRecentIcon);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", ctx.product.name, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.isChecked && ctx.meal);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵstyleProp"]("color", ctx.isChecked ? "var(--ion-color-secondary)" : "#888");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpureFunction1"](45, _c1, !!ctx.displayCustomProduct ? "bolder" : ""));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](11, 23, (tmp_9_0 = ctx.displayCustomProduct == null ? null : ctx.displayCustomProduct.quantity) !== null && tmp_9_0 !== undefined ? tmp_9_0 : ctx.productQuantity, "1.0-1") ? "(" + _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind2"](12, 26, (tmp_9_0 = ctx.displayCustomProduct == null ? null : ctx.displayCustomProduct.quantity) !== null && tmp_9_0 !== undefined ? tmp_9_0 : ctx.productQuantity, "1.0-1") + "g)" : "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.brand);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.trainerMultiSelect);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.meal || ctx.ingredientMode || ctx.trainerMultiSelect);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind3"](21, 29, ctx.displayCustomProduct || ctx.product, ctx.displayCustomProduct ? ctx.MEASURE_FILTER_TYPES.total : ctx.measureFilter, ctx.CUSTOM_PRODUCT_KEYS.energy));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind3"](26, 33, ctx.displayCustomProduct || ctx.product, ctx.displayCustomProduct ? ctx.MEASURE_FILTER_TYPES.total : ctx.measureFilter, ctx.CUSTOM_PRODUCT_KEYS.protein));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind3"](31, 37, ctx.displayCustomProduct || ctx.product, ctx.displayCustomProduct ? ctx.MEASURE_FILTER_TYPES.total : ctx.measureFilter, ctx.CUSTOM_PRODUCT_KEYS.carbohydrates));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵpipeBind3"](36, 41, ctx.displayCustomProduct || ctx.product, ctx.displayCustomProduct ? ctx.MEASURE_FILTER_TYPES.total : ctx.measureFilter, ctx.CUSTOM_PRODUCT_KEYS.fat));
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_12__["ɵɵproperty"]("ngIf", ctx.checkIfInfoExist());
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_15__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_15__.NgStyle, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonCheckbox, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.IonSpinner, _ionic_angular__WEBPACK_IMPORTED_MODULE_16__.BooleanValueAccessor, _angular_common__WEBPACK_IMPORTED_MODULE_15__.DecimalPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslatePipe, _shared_ui_src_app_shared_pipes_measure_pipe__WEBPACK_IMPORTED_MODULE_11__.MeasurePipe],
  styles: [".product-card[_ngcontent-%COMP%] {\n  background-color: #141414;\n  border: 1px solid #252525;\n  border-radius: 12px;\n  margin: 6px 4px;\n  padding: 12px 14px;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  cursor: pointer;\n}\n.product-card.product-selected[_ngcontent-%COMP%] {\n  border-color: var(--ion-color-primary);\n  background-color: rgba(var(--ion-color-primary-rgb), 0.04);\n}\n.product-card.trainer-focused[_ngcontent-%COMP%] {\n  border-color: var(--ion-color-alternative);\n  box-shadow: 0 0 0 1px var(--ion-color-alternative);\n}\n.product-card.is-loading[_ngcontent-%COMP%] {\n  pointer-events: none;\n}\n.product-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n  background-color: #1a1a1a;\n}\n\n.product-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.product-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 12px;\n}\n\n.product-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n}\n\n.name-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n.product-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 1rem;\n  color: #fff;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  flex: 1;\n  min-width: 0;\n}\n\n.recent-product-icon[_ngcontent-%COMP%] {\n  margin-left: 4px;\n  color: var(--ion-color-primary);\n  font-size: 0.95rem;\n  vertical-align: -2px;\n}\n\n.product-qty[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: #888;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n\n.product-brand[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: rgba(255, 255, 255, 0.5);\n  margin-top: 2px;\n}\n\n.checkbox-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  flex-shrink: 0;\n  padding-top: 2px;\n}\n\n.trainer-favorite-btn[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  border: none;\n  background: transparent;\n  color: #666;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  flex-shrink: 0;\n}\n.trainer-favorite-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: inherit;\n  font-size: 18px;\n}\n.trainer-favorite-btn.is-favorite[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n}\n\nion-checkbox[_ngcontent-%COMP%] {\n  --size: 24px;\n  --checkbox-background-checked: var(--ion-color-primary);\n  --border-color: #444;\n  --border-color-checked: var(--ion-color-primary);\n}\nion-checkbox[_ngcontent-%COMP%]::part(container) {\n  border-radius: 6px;\n}\n\n.product-macros[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n  margin-top: 4px;\n}\n\n.macro-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex: 1;\n  justify-content: center;\n}\n\n.macro-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.macro-dot.kcal[_ngcontent-%COMP%] {\n  background: var(--ion-color-primary);\n}\n.macro-dot.protein[_ngcontent-%COMP%] {\n  background: var(--ion-color-alternative);\n}\n.macro-dot.carbs[_ngcontent-%COMP%] {\n  background: var(--ion-color-success);\n}\n.macro-dot.fat[_ngcontent-%COMP%] {\n  background: var(--ion-color-secondary);\n}\n\n.macro-value[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: rgba(255, 255, 255, 0.85);\n  white-space: nowrap;\n}\n\n.info-warning[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--ion-color-warning);\n  margin-top: 4px;\n  text-align: center;\n}\n\n.card-progress[_ngcontent-%COMP%] {\n  height: 3px;\n  margin-top: 4px;\n  --background: rgba(var(--ion-color-primary-rgb), 0.18);\n  --progress-background: var(--ion-color-primary);\n}\n\n.ingredient-mode[_ngcontent-%COMP%]   ion-checkbox[_ngcontent-%COMP%] {\n  --size: 28px;\n}\n.ingredient-mode[_ngcontent-%COMP%]   ion-checkbox[_ngcontent-%COMP%]::part(container) {\n  border-radius: 8px;\n}\n\n.added-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--ion-color-primary);\n  font-weight: 500;\n}\n\n.product-selected[_ngcontent-%COMP%]   .macro-dot[_ngcontent-%COMP%] {\n  box-shadow: 0 0 8px rgba(255, 255, 255, 0.2);\n  transform: scale(1.1);\n}\n.product-selected[_ngcontent-%COMP%]   .product-name[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL2RpZXRzL2NvbXBvbmVudHMvbWVhbC9jb21wb25lbnRzL3NlYXJjaC1mb29kcy9jb21wb25lbnRzL3Byb2R1Y3QvcHJvZHVjdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLHlCQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGlEQUFBO0VBQ0Esd0NBQUE7RUFDQSxlQUFBO0FBQ0Y7QUFDRTtFQUNFLHNDQUFBO0VBQ0EsMERBQUE7QUFDSjtBQUtFO0VBQ0UsMENBQUE7RUFDQSxrREFBQTtBQUhKO0FBTUU7RUFDRSxvQkFBQTtBQUpKO0FBT0U7RUFDRSxzQkFBQTtFQUNBLHlCQUFBO0FBTEo7O0FBU0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0FBTkY7O0FBVUE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSx1QkFBQTtFQUNBLFNBQUE7QUFQRjs7QUFVQTtFQUNFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FBUEY7O0FBVUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLFFBQUE7QUFQRjs7QUFVQTtFQUNFLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxPQUFBO0VBQ0EsWUFBQTtBQVBGOztBQVVBO0VBQ0UsZ0JBQUE7RUFDQSwrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7QUFQRjs7QUFVQTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtBQVBGOztBQVVBO0VBQ0Usa0JBQUE7RUFDQSwrQkFBQTtFQUNBLGVBQUE7QUFQRjs7QUFVQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0FBUEY7O0FBV0E7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0EsV0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLGNBQUE7QUFSRjtBQVVFO0VBQ0UsY0FBQTtFQUNBLGVBQUE7QUFSSjtBQVdFO0VBQ0UsK0JBQUE7QUFUSjs7QUFhQTtFQUNFLFlBQUE7RUFDQSx1REFBQTtFQUNBLG9CQUFBO0VBQ0EsZ0RBQUE7QUFWRjtBQVlFO0VBQ0Usa0JBQUE7QUFWSjs7QUFlQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLFFBQUE7RUFDQSxlQUFBO0FBWkY7O0FBZUE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsT0FBQTtFQUNBLHVCQUFBO0FBWkY7O0FBZUE7RUFDRSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBQVpGO0FBY0U7RUFDRSxvQ0FBQTtBQVpKO0FBZUU7RUFDRSx3Q0FBQTtBQWJKO0FBZ0JFO0VBQ0Usb0NBQUE7QUFkSjtBQWlCRTtFQUNFLHNDQUFBO0FBZko7O0FBbUJBO0VBQ0UsaUJBQUE7RUFDQSxnQ0FBQTtFQUNBLG1CQUFBO0FBaEJGOztBQW9CQTtFQUNFLGtCQUFBO0VBQ0EsK0JBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUFqQkY7O0FBb0JBO0VBQ0UsV0FBQTtFQUNBLGVBQUE7RUFDQSxzREFBQTtFQUNBLCtDQUFBO0FBakJGOztBQXNCRTtFQUNFLFlBQUE7QUFuQko7QUFxQkk7RUFDRSxrQkFBQTtBQW5CTjs7QUF3QkE7RUFDRSxlQUFBO0VBQ0EsK0JBQUE7RUFDQSxnQkFBQTtBQXJCRjs7QUEwQkU7RUFDRSw0Q0FBQTtFQUNBLHFCQUFBO0FBdkJKO0FBMEJFO0VBQ0UsK0JBQUE7QUF4QkoiLCJzb3VyY2VzQ29udGVudCI6WyIucHJvZHVjdC1jYXJkIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE0MTQxNDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzI1MjUyNTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgbWFyZ2luOiA2cHggNHB4O1xuICBwYWRkaW5nOiAxMnB4IDE0cHg7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG4gIGN1cnNvcjogcG9pbnRlcjtcblxuICAmLnByb2R1Y3Qtc2VsZWN0ZWQge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4wNCk7XG4gIH1cblxuICAvLyBTb2xvIHByZXZpc3VhbGl6YWRvIChwYW5lbCBkZSBkZXRhbGxlIGFwYXJ0ZSksIG5vIHNlbGVjY2lvbmFkbyDDosKAwpQgY29sb3JcbiAgLy8gZGlzdGludG8gKGFsdGVybmF0aXZlL25hcmFuamEpIHBhcmEgbm8gY29uZnVuZGlybG8gY29uIFwieWEgYcODwrFhZGlkb1wiXG4gIC8vIChwcmltYXJ5LCBhcnJpYmEpLlxuICAmLnRyYWluZXItZm9jdXNlZCB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItYWx0ZXJuYXRpdmUpO1xuICAgIGJveC1zaGFkb3c6IDAgMCAwIDFweCB2YXIoLS1pb24tY29sb3ItYWx0ZXJuYXRpdmUpO1xuICB9XG5cbiAgJi5pcy1sb2FkaW5nIHtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgfVxuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTgpO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMxYTFhMWE7XG4gIH1cbn1cblxuLnByb2R1Y3QtY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogOHB4O1xufVxuXG4vLyBIZWFkZXJcbi5wcm9kdWN0LWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGdhcDogMTJweDtcbn1cblxuLnByb2R1Y3QtaW5mbyB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLm5hbWUtcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDhweDtcbn1cblxuLnByb2R1Y3QtbmFtZSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtc2l6ZTogMXJlbTtcbiAgY29sb3I6ICNmZmY7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG59XG5cbi5yZWNlbnQtcHJvZHVjdC1pY29uIHtcbiAgbWFyZ2luLWxlZnQ6IDRweDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgZm9udC1zaXplOiAwLjk1cmVtO1xuICB2ZXJ0aWNhbC1hbGlnbjogLTJweDtcbn1cblxuLnByb2R1Y3QtcXR5IHtcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xuICBjb2xvcjogIzg4ODtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbi5wcm9kdWN0LWJyYW5kIHtcbiAgZm9udC1zaXplOiAwLjc1cmVtO1xuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xuICBtYXJnaW4tdG9wOiAycHg7XG59XG5cbi5jaGVja2JveC1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmxleC1zaHJpbms6IDA7XG4gIHBhZGRpbmctdG9wOiAycHg7XG59XG5cbi8vIFRBUkVBNSAoYXVkaXRvcsODwq1hIFVYLCBGYXNlIEIpXG4udHJhaW5lci1mYXZvcml0ZS1idG4ge1xuICB3aWR0aDogMjZweDtcbiAgaGVpZ2h0OiAyNnB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjNjY2O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgcGFkZGluZzogMDtcbiAgZmxleC1zaHJpbms6IDA7XG5cbiAgaW9uLWljb24ge1xuICAgIGNvbG9yOiBpbmhlcml0O1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgfVxuXG4gICYuaXMtZmF2b3JpdGUge1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIH1cbn1cblxuaW9uLWNoZWNrYm94IHtcbiAgLS1zaXplOiAyNHB4O1xuICAtLWNoZWNrYm94LWJhY2tncm91bmQtY2hlY2tlZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAtLWJvcmRlci1jb2xvcjogIzQ0NDtcbiAgLS1ib3JkZXItY29sb3ItY2hlY2tlZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuXG4gICY6OnBhcnQoY29udGFpbmVyKSB7XG4gICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICB9XG59XG5cbi8vIE1hY3JvcyBSb3dcbi5wcm9kdWN0LW1hY3JvcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiA4cHg7XG4gIG1hcmdpbi10b3A6IDRweDtcbn1cblxuLm1hY3JvLWl0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDZweDtcbiAgZmxleDogMTtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5tYWNyby1kb3Qge1xuICB3aWR0aDogOHB4O1xuICBoZWlnaHQ6IDhweDtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBmbGV4LXNocmluazogMDtcblxuICAmLmtjYWwge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgfVxuXG4gICYucHJvdGVpbiB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWFsdGVybmF0aXZlKTtcbiAgfVxuXG4gICYuY2FyYnMge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzKTtcbiAgfVxuXG4gICYuZmF0IHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgfVxufVxuXG4ubWFjcm8tdmFsdWUge1xuICBmb250LXNpemU6IDAuOHJlbTtcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSk7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi8vIEluZm8gV2FybmluZ1xuLmluZm8td2FybmluZyB7XG4gIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nKTtcbiAgbWFyZ2luLXRvcDogNHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5jYXJkLXByb2dyZXNzIHtcbiAgaGVpZ2h0OiAzcHg7XG4gIG1hcmdpbi10b3A6IDRweDtcbiAgLS1iYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMTgpO1xuICAtLXByb2dyZXNzLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbn1cblxuLy8gSW5ncmVkaWVudCBNb2RlIHJlZmluZW1lbnRzXG4uaW5ncmVkaWVudC1tb2RlIHtcbiAgaW9uLWNoZWNrYm94IHtcbiAgICAtLXNpemU6IDI4cHg7XG5cbiAgICAmOjpwYXJ0KGNvbnRhaW5lcikge1xuICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIH1cbiAgfVxufVxuXG4uYWRkZWQtbGFiZWwge1xuICBmb250LXNpemU6IDExcHg7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi8vIEFuaW1hdGlvbnMgd2hlbiBzZWxlY3RlZFxuLnByb2R1Y3Qtc2VsZWN0ZWQge1xuICAubWFjcm8tZG90IHtcbiAgICBib3gtc2hhZG93OiAwIDAgOHB4IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4yKTtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDEuMSk7XG4gIH1cblxuICAucHJvZHVjdC1uYW1lIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ }),

/***/ 53263:
/*!*****************************************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/diets/components/meal/components/search-foods/components/recipe-card/recipe-card.component.ts ***!
  \*****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RecipeCardComponent: () => (/* binding */ RecipeCardComponent)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_shared_constants_db_translations_es_en_db_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/constants/db-translations/es-en-db.map */ 76717);
/* harmony import */ var src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/constants/measureFilter */ 46926);
/* harmony import */ var src_app_core_services_recipe_recipe_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/recipe/recipe.service */ 50888);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var src_app_core_services_util_util_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/util/util.service */ 35400);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 54844);

var _RecipeCardComponent;









function RecipeCardComponent_ion_icon_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-icon", 21);
  }
}
const _c0 = function (a0) {
  return {
    mealName: a0
  };
};
function RecipeCardComponent_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" (", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](2, 1, "RECIPE_CARD.ADDED_TO_MEAL", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](4, _c0, ctx_r1.mealNameTranslated)), ") ");
  }
}
function RecipeCardComponent_button_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function RecipeCardComponent_button_15_Template_button_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r6);
      const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r5.onTrainerFavoriteClick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-icon", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("is-favorite", ctx_r2.isTrainerFavorite);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("name", ctx_r2.isTrainerFavorite ? "bookmark" : "bookmark-outline");
  }
}
function RecipeCardComponent_div_16_ion_spinner_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-spinner", 28);
  }
}
function RecipeCardComponent_div_16_ion_checkbox_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-checkbox", 29);
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("checked", ctx_r8.isChecked)("disabled", ctx_r8.isBusy);
  }
}
function RecipeCardComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function RecipeCardComponent_div_16_Template_div_click_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r9.onCheckboxClick($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, RecipeCardComponent_div_16_ion_spinner_1_Template, 1, 0, "ion-spinner", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, RecipeCardComponent_div_16_ion_checkbox_2_Template, 1, 2, "ion-checkbox", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r3.loading);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r3.loading);
  }
}
function RecipeCardComponent_div_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 30)(1, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](2, "ion-icon", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, " Verificada ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
const _c1 = function (a0) {
  return {
    "font-weight": a0
  };
};
class RecipeCardComponent {
  get isBusy() {
    return this.loadingObj.value || this.loading;
  }
  get mealNameTranslated() {
    const name = this.meal?.name || '';
    if (this.translate.currentLang === 'en') {
      return src_app_shared_constants_db_translations_es_en_db_map__WEBPACK_IMPORTED_MODULE_1__.DB_ES_EN_MAP[name] || name;
    }
    return name;
  }
  constructor(recipeService, translate, utilService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "recipeService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "translate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "utilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "recipe", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "meal", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "dietDay", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "user", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "loading", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "recentCustomRecipe", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "loadingObj", {
      value: false
    });
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "showRecentIcon", false);
    // TAREA5 (train-fit-trainers) — mismo patrón que ProductComponent: marca/
    // desmarca esta receta en la "cesta" del panel en vez de mutar
    // meal.customRecipes (dieta del CONSUMIDOR logueado, no la del cliente).
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "trainerMultiSelect", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isTrainerSelected", false);
    // Fix — mismo motivo que ProductComponent#trainerSelectedQuantity: sin
    // esto, getRecipeDisplayQuantity() nunca veía la cantidad custom puesta en
    // la cesta/panel de detalle (foundInstance siempre null en modo
    // entrenador, meal.customRecipes está vacío) y la card mostraba
    // cantidad/macros por defecto de la receta.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "trainerSelectedQuantity", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isTrainerFavorite", false);
    // Fix (ronda detalle) — resaltado naranja al previsualizar (ver
    // ProductComponent#isTrainerFocused, mismo criterio).
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isTrainerFocused", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "toggle", new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "edit", new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "remove", new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "quickAdd", new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "trainerToggle", new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "trainerFavoriteToggle", new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "trainerFocus", new _angular_core__WEBPACK_IMPORTED_MODULE_5__.EventEmitter());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "macros", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "topIngredients", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isFavorite", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isChecked", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "displayQuantity", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "measureFilter", src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_2__.MEASURE_FILTER_TYPES.auto);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "foundInstance", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "measureFilterSub", void 0);
    this.recipeService = recipeService;
    this.translate = translate;
    this.utilService = utilService;
  }
  ngOnInit() {
    this.setTopIngredients();
    this.checkFavorite();
    this.checkIsChecked();
    this.measureFilterSub = this.utilService.getMeasureFilter.subscribe(filter => {
      this.measureFilter = filter;
      this.displayQuantity = this.getRecipeDisplayQuantity();
      this.calculateMacros();
    });
    this.utilService.getLoading.subscribe(res => this.loadingObj.value = res);
  }
  ngOnChanges(changes) {
    if (changes.meal || changes.recipe || changes.isTrainerSelected || changes.trainerSelectedQuantity) {
      console.log('[RECIPE-CARD] Meal changed, rechecking:', this.recipe.name);
      this.checkIsChecked();
      this.calculateMacros();
    }
  }
  ngOnDestroy() {
    this.measureFilterSub?.unsubscribe();
  }
  checkIsChecked() {
    if (this.trainerMultiSelect) {
      this.isChecked = this.isTrainerSelected;
      this.displayQuantity = this.getRecipeDisplayQuantity();
      return;
    }
    if (!this.meal?.customRecipes) {
      this.isChecked = false;
      this.foundInstance = null;
      this.displayQuantity = this.getRecipeDisplayQuantity();
      console.log('[RECIPE-CARD]', this.recipe.name, 'not checked - no instances in meal');
      return;
    }
    this.foundInstance = this.meal.customRecipes.find(instance => {
      const recipe = typeof instance.recipe === 'object' ? instance.recipe : null;
      if (!recipe) return false;
      const recipeId = recipe._id;
      return recipeId === this.recipe?._id;
    });
    this.isChecked = !!this.foundInstance;
    this.displayQuantity = this.getRecipeDisplayQuantity();
    console.log('[RECIPE-CARD]', this.recipe.name, 'isChecked:', this.isChecked);
  }
  calculateMacros() {
    const merged = this.foundInstance ? this.recipeService.calculateCustomRecipeTotals(this.recipe, this.foundInstance) : null;
    const totals = merged?.totals || this.recipeService.calculateRecipeMacros(this.recipe);
    const baseline = this.getRecipeTotalCookedWeight(totals.quantity);
    const quantityForMeasure = this.getRecipeDisplayQuantity();
    const ratio = baseline > 0 && quantityForMeasure ? quantityForMeasure / baseline : 0;
    this.macros = {
      kcal: merged ? merged.portionMacros.kcal : totals.kcal * ratio,
      protein: merged ? merged.portionMacros.protein : totals.protein * ratio,
      carbs: merged ? merged.portionMacros.carbs : totals.carbs * ratio,
      fat: merged ? merged.portionMacros.fat : totals.fat * ratio
    };
  }
  setTopIngredients() {
    this.topIngredients = this.recipeService.getTopIngredients(this.recipe, 3);
  }
  checkFavorite() {
    this.isFavorite = this.user?.archivedRecipes?.includes(this.recipe._id) ?? false;
  }
  onCardClick() {
    if (this.isBusy) return;
    if (this.trainerMultiSelect) {
      // Fix (ronda detalle) — solo previsualiza, no añade (ver
      // ProductComponent#onCardClick, mismo criterio).
      this.trainerFocus.emit(this.recipe);
      return;
    }
    // Click on card always goes to add/edit mode
    this.toggle.emit(this.recipe);
  }
  onCheckboxClick(event) {
    // Stop propagation so card click doesn't fire
    event.stopPropagation();
    if (this.isBusy) return;
    if (this.trainerMultiSelect) {
      const checked = !this.isTrainerSelected;
      this.trainerToggle.emit({
        recipe: this.recipe,
        checked
      });
      // Añadir con el check también previsualiza — no solo tocar la card.
      if (checked) this.trainerFocus.emit(this.recipe);
      return;
    }
    // If checked, remove from meal
    if (this.isChecked) {
      this.remove.emit(this.recipe);
    } else {
      // If not checked, quick-add directly to meal
      this.quickAdd.emit(this.recipe);
    }
  }
  onEditClick(event) {
    event.stopPropagation();
    this.edit.emit(this.recipe);
  }
  onTrainerFavoriteClick(event) {
    event.stopPropagation();
    this.trainerFavoriteToggle.emit(this.recipe);
  }
  getRecipeDisplayQuantity() {
    if (this.trainerMultiSelect && this.isTrainerSelected && this.trainerSelectedQuantity != null) {
      return this.trainerSelectedQuantity;
    }
    const total = this.getRecipeTotalCookedWeight();
    const consumed = this.getConsumedWeight();
    if (this.foundInstance) {
      return consumed ?? 0;
    }
    const recentQty = this.toPositiveNumber(this.recentCustomRecipe?.quantity);
    if (recentQty !== null) {
      return recentQty;
    }
    switch (this.measureFilter) {
      case src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_2__.MEASURE_FILTER_TYPES.cieng:
        return 100;
      case src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_2__.MEASURE_FILTER_TYPES.racion:
        return consumed;
      case src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_2__.MEASURE_FILTER_TYPES.total:
        return total;
      case src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_2__.MEASURE_FILTER_TYPES.auto:
      default:
        return consumed ?? 100;
    }
  }
  getRecipeTotalCookedWeight(fallbackFromIngredients) {
    const fromInstance = this.toPositiveNumber(this.foundInstance?.quantityCooked);
    if (fromInstance) return fromInstance;
    const fromIngredients = this.toPositiveNumber(fallbackFromIngredients) ?? this.toPositiveNumber(this.recipeService.calculateRecipeMacros(this.recipe).quantity);
    return fromIngredients ?? null;
  }
  getConsumedWeight() {
    const fromInstance = this.toPositiveNumber(this.foundInstance?.quantity);
    if (fromInstance) return fromInstance;
    return null;
  }
  toPositiveNumber(value) {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return null;
    }
    return parsed;
  }
}
_RecipeCardComponent = RecipeCardComponent;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipeCardComponent, "\u0275fac", function RecipeCardComponent_Factory(t) {
  return new (t || _RecipeCardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_core_services_recipe_recipe_service__WEBPACK_IMPORTED_MODULE_3__.RecipeService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslateService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_core_services_util_util_service__WEBPACK_IMPORTED_MODULE_4__.UtilService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RecipeCardComponent, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: _RecipeCardComponent,
  selectors: [["app-recipe-card"]],
  inputs: {
    recipe: "recipe",
    meal: "meal",
    dietDay: "dietDay",
    user: "user",
    loading: "loading",
    recentCustomRecipe: "recentCustomRecipe",
    showRecentIcon: "showRecentIcon",
    trainerMultiSelect: "trainerMultiSelect",
    isTrainerSelected: "isTrainerSelected",
    trainerSelectedQuantity: "trainerSelectedQuantity",
    isTrainerFavorite: "isTrainerFavorite",
    isTrainerFocused: "isTrainerFocused"
  },
  outputs: {
    toggle: "toggle",
    edit: "edit",
    remove: "remove",
    quickAdd: "quickAdd",
    trainerToggle: "trainerToggle",
    trainerFavoriteToggle: "trainerFavoriteToggle",
    trainerFocus: "trainerFocus"
  },
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵNgOnChangesFeature"]],
  decls: 39,
  vars: 38,
  consts: [[1, "recipe-card", 3, "click"], [1, "recipe-content"], [1, "recipe-header"], [1, "recipe-info"], [1, "name-row"], [1, "recipe-name"], ["name", "time-outline", "class", "recent-product-icon", 4, "ngIf"], ["class", "added-label", 4, "ngIf"], [1, "recipe-qty", 3, "ngStyle"], [1, "recipe-ingredients"], [1, "recipe-actions"], ["type", "button", "class", "trainer-favorite-btn", 3, "is-favorite", "click", 4, "ngIf"], ["class", "checkbox-container", 3, "click", 4, "ngIf"], [1, "recipe-macros"], [1, "macro-item"], [1, "macro-dot", "kcal"], [1, "macro-value"], [1, "macro-dot", "protein"], [1, "macro-dot", "carbs"], [1, "macro-dot", "fat"], ["class", "recipe-badges", 4, "ngIf"], ["name", "time-outline", 1, "recent-product-icon"], [1, "added-label"], ["type", "button", 1, "trainer-favorite-btn", 3, "click"], [3, "name"], [1, "checkbox-container", 3, "click"], ["name", "crescent", "color", "primary", 4, "ngIf"], ["mode", "ios", "style", "pointer-events: none", 3, "checked", "disabled", 4, "ngIf"], ["name", "crescent", "color", "primary"], ["mode", "ios", 2, "pointer-events", "none", 3, "checked", "disabled"], [1, "recipe-badges"], [1, "badge", "verified"], ["name", "shield-checkmark"]],
  template: function RecipeCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function RecipeCardComponent_Template_div_click_0_listener() {
        return ctx.onCardClick();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "span", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](6, RecipeCardComponent_ion_icon_6_Template, 1, 0, "ion-icon", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, RecipeCardComponent_span_8_Template, 3, 6, "span", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "span", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](11, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "span", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](15, RecipeCardComponent_button_15_Template, 2, 3, "button", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](16, RecipeCardComponent_div_16_Template, 3, 2, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "div", 13)(18, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](19, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "span", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](22, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](24, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "span", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](26);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](27, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](29, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](30, "span", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](31);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](32, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](33, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](34, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](35, "span", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](36);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](37, "number");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](38, RecipeCardComponent_div_38_Template, 4, 0, "div", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("is-checked", ctx.isChecked)("is-loading", ctx.isBusy)("trainer-focused", ctx.isTrainerFocused);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.showRecentIcon);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx.recipe.name, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.isChecked && ctx.meal);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵstyleProp"]("color", ctx.isChecked ? "var(--ion-color-secondary)" : "#888");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](36, _c1, ctx.isChecked ? "bolder" : ""));
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx.displayQuantity !== null ? "(" + _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](11, 21, ctx.displayQuantity, "1.0-1") + "g)" : "-", " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.topIngredients);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.trainerMultiSelect);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.meal || ctx.trainerMultiSelect);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](22, 24, ctx.macros.kcal, "1.0-0"));
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](27, 27, ctx.macros.protein, "1.0-1"), "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](32, 30, ctx.macros.carbs, "1.0-1"), "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind2"](37, 33, ctx.macros.fat, "1.0-1"), "g");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.recipe.verified);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgStyle, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonCheckbox, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonSpinner, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.BooleanValueAccessor, _angular_common__WEBPACK_IMPORTED_MODULE_7__.DecimalPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_6__.TranslatePipe],
  styles: [".recipe-card[_ngcontent-%COMP%] {\n  background-color: #141414;\n  border: 1px solid #252525;\n  border-radius: 12px;\n  margin: 6px 4px;\n  padding: 12px 14px;\n  transition: all 0.2s ease;\n}\n.recipe-card.is-checked[_ngcontent-%COMP%] {\n  border-color: var(--ion-color-primary);\n  background-color: rgba(var(--ion-color-primary-rgb), 0.04);\n}\n.recipe-card.trainer-focused[_ngcontent-%COMP%] {\n  border-color: var(--ion-color-alternative);\n  box-shadow: 0 0 0 1px var(--ion-color-alternative);\n}\n.recipe-card.is-loading[_ngcontent-%COMP%] {\n  pointer-events: none;\n}\n\n.recipe-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n  background-color: #1a1a1a;\n}\n\n.checkbox-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n}\n\n.recipe-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.recipe-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 12px;\n}\n\n.recipe-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.name-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n.recipe-name[_ngcontent-%COMP%] {\n  display: block;\n  font-weight: 600;\n  font-size: 1rem;\n  color: #fff;\n  line-height: 1.4;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  flex: 1;\n  min-width: 0;\n}\n\n.recent-product-icon[_ngcontent-%COMP%] {\n  margin-left: 4px;\n  color: var(--ion-color-primary);\n  font-size: 0.95rem;\n  vertical-align: -2px;\n}\n\n.recipe-qty[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n\n.recipe-ingredients[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.75rem;\n  color: rgba(255, 255, 255, 0.5);\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  margin-top: 2px;\n}\n\n.recipe-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n\n.trainer-favorite-btn[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  border: none;\n  background: transparent;\n  color: #666;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  flex-shrink: 0;\n}\n.trainer-favorite-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: inherit;\n  font-size: 18px;\n}\n.trainer-favorite-btn.is-favorite[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n}\n\n.edit-btn[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  color: var(--ion-color-primary);\n  width: 32px;\n  height: 32px;\n  border-radius: 8px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n.edit-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.edit-btn[_ngcontent-%COMP%]:hover {\n  background: rgba(var(--ion-color-primary-rgb), 0.15);\n  border-color: rgba(var(--ion-color-primary-rgb), 0.3);\n}\n.edit-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.9);\n}\n\n  .checkbox-container ion-checkbox {\n  --border-radius: 8px;\n  --size: 24px;\n}\n\n.recipe-macros[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n.macro-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex: 1;\n  justify-content: center;\n}\n\n.macro-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n.macro-dot.kcal[_ngcontent-%COMP%] {\n  background: var(--ion-color-primary);\n}\n.macro-dot.protein[_ngcontent-%COMP%] {\n  background: var(--ion-color-alternative);\n}\n.macro-dot.carbs[_ngcontent-%COMP%] {\n  background: var(--ion-color-success);\n}\n.macro-dot.fat[_ngcontent-%COMP%] {\n  background: var(--ion-color-secondary);\n}\n\n.macro-value[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: rgba(255, 255, 255, 0.85);\n}\n\n.recipe-badges[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  margin-top: 2px;\n}\n\n.badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  padding: 3px 8px;\n  border-radius: 6px;\n  font-size: 0.7rem;\n  font-weight: 600;\n}\n.badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n}\n.badge.verified[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-success-rgb), 0.15);\n  color: var(--ion-color-success);\n}\n\n.added-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--ion-color-primary);\n  font-weight: 500;\n}\n\n.card-progress[_ngcontent-%COMP%] {\n  height: 3px;\n  margin-top: 4px;\n  --background: rgba(var(--ion-color-primary-rgb), 0.18);\n  --progress-background: var(--ion-color-primary);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL2RpZXRzL2NvbXBvbmVudHMvbWVhbC9jb21wb25lbnRzL3NlYXJjaC1mb29kcy9jb21wb25lbnRzL3JlY2lwZS1jYXJkL3JlY2lwZS1jYXJkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0kseUJBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7QUFDSjtBQUNJO0VBQ0ksc0NBQUE7RUFDQSwwREFBQTtBQUNSO0FBRUk7RUFDSSwwQ0FBQTtFQUNBLGtEQUFBO0FBQVI7QUFHSTtFQUNJLG9CQUFBO0FBRFI7O0FBS0E7RUFDSSxzQkFBQTtFQUNBLHlCQUFBO0FBRko7O0FBS0E7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7QUFGSjs7QUFLQTtFQUNJLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFFBQUE7QUFGSjs7QUFNQTtFQUNJLGFBQUE7RUFDQSw4QkFBQTtFQUNBLHVCQUFBO0VBQ0EsU0FBQTtBQUhKOztBQU1BO0VBQ0ksT0FBQTtFQUNBLFlBQUE7QUFISjs7QUFNQTtFQUNJLGFBQUE7RUFDQSxtQkFBQTtFQUNBLDhCQUFBO0VBQ0EsUUFBQTtBQUhKOztBQU1BO0VBQ0ksY0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLE9BQUE7RUFDQSxZQUFBO0FBSEo7O0FBTUE7RUFDSSxnQkFBQTtFQUNBLCtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtBQUhKOztBQU1BO0VBQ0ksa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7QUFISjs7QUFNQTtFQUNJLGNBQUE7RUFDQSxrQkFBQTtFQUNBLCtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZUFBQTtBQUhKOztBQU1BO0VBQ0ksYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGNBQUE7QUFISjs7QUFPQTtFQUNJLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxVQUFBO0VBQ0EsY0FBQTtBQUpKO0FBTUk7RUFDSSxjQUFBO0VBQ0EsZUFBQTtBQUpSO0FBT0k7RUFDSSwrQkFBQTtBQUxSOztBQVNBO0VBQ0kscUNBQUE7RUFDQSwwQ0FBQTtFQUNBLCtCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsVUFBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtBQU5KO0FBUUk7RUFDSSxlQUFBO0FBTlI7QUFTSTtFQUNJLG9EQUFBO0VBQ0EscURBQUE7QUFQUjtBQVVJO0VBQ0kscUJBQUE7QUFSUjs7QUFjSTtFQUNJLG9CQUFBO0VBQ0EsWUFBQTtBQVhSOztBQWdCQTtFQUNJLGFBQUE7RUFDQSw4QkFBQTtFQUNBLFFBQUE7QUFiSjs7QUFnQkE7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsT0FBQTtFQUNBLHVCQUFBO0FBYko7O0FBZ0JBO0VBQ0ksVUFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QUFiSjtBQWVJO0VBQ0ksb0NBQUE7QUFiUjtBQWdCSTtFQUNJLHdDQUFBO0FBZFI7QUFpQkk7RUFDSSxvQ0FBQTtBQWZSO0FBa0JJO0VBQ0ksc0NBQUE7QUFoQlI7O0FBb0JBO0VBQ0ksa0JBQUE7RUFDQSxnQ0FBQTtBQWpCSjs7QUFxQkE7RUFDSSxhQUFBO0VBQ0EsUUFBQTtFQUNBLGVBQUE7QUFsQko7O0FBcUJBO0VBQ0ksb0JBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBQWxCSjtBQW9CSTtFQUNJLGVBQUE7QUFsQlI7QUFxQkk7RUFDSSxvREFBQTtFQUNBLCtCQUFBO0FBbkJSOztBQXVCQTtFQUNJLGVBQUE7RUFDQSwrQkFBQTtFQUNBLGdCQUFBO0FBcEJKOztBQXVCQTtFQUNJLFdBQUE7RUFDQSxlQUFBO0VBQ0Esc0RBQUE7RUFDQSwrQ0FBQTtBQXBCSiIsInNvdXJjZXNDb250ZW50IjpbIi5yZWNpcGUtY2FyZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzE0MTQxNDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjMjUyNTI1O1xuICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgbWFyZ2luOiA2cHggNHB4O1xuICAgIHBhZGRpbmc6IDEycHggMTRweDtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xuXG4gICAgJi5pcy1jaGVja2VkIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4wNCk7XG4gICAgfVxuXG4gICAgJi50cmFpbmVyLWZvY3VzZWQge1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1hbHRlcm5hdGl2ZSk7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDFweCB2YXIoLS1pb24tY29sb3ItYWx0ZXJuYXRpdmUpO1xuICAgIH1cblxuICAgICYuaXMtbG9hZGluZyB7XG4gICAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICAgIH1cbn1cblxuLnJlY2lwZS1jYXJkOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk4KTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMWExYTFhO1xufVxuXG4uY2hlY2tib3gtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgaGVpZ2h0OiAxMDAlO1xufVxuXG4ucmVjaXBlLWNvbnRlbnQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBnYXA6IDhweDtcbn1cblxuLy8gSGVhZGVyXG4ucmVjaXBlLWhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgZ2FwOiAxMnB4O1xufVxuXG4ucmVjaXBlLWluZm8ge1xuICAgIGZsZXg6IDE7XG4gICAgbWluLXdpZHRoOiAwO1xufVxuXG4ubmFtZS1yb3cge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgZ2FwOiA4cHg7XG59XG5cbi5yZWNpcGUtbmFtZSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgY29sb3I6ICNmZmY7XG4gICAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgZmxleDogMTtcbiAgICBtaW4td2lkdGg6IDA7XG59XG5cbi5yZWNlbnQtcHJvZHVjdC1pY29uIHtcbiAgICBtYXJnaW4tbGVmdDogNHB4O1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgZm9udC1zaXplOiAwLjk1cmVtO1xuICAgIHZlcnRpY2FsLWFsaWduOiAtMnB4O1xufVxuXG4ucmVjaXBlLXF0eSB7XG4gICAgZm9udC1zaXplOiAwLjg1cmVtO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgZmxleC1zaHJpbms6IDA7XG59XG5cbi5yZWNpcGUtaW5ncmVkaWVudHMge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGZvbnQtc2l6ZTogMC43NXJlbTtcbiAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICBtYXJnaW4tdG9wOiAycHg7XG59XG5cbi5yZWNpcGUtYWN0aW9ucyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogOHB4O1xuICAgIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4vLyBUQVJFQTUgKGF1ZGl0b3LDg8KtYSBVWCwgRmFzZSBCKVxuLnRyYWluZXItZmF2b3JpdGUtYnRuIHtcbiAgICB3aWR0aDogMjZweDtcbiAgICBoZWlnaHQ6IDI2cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBjb2xvcjogIzY2NjtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgcGFkZGluZzogMDtcbiAgICBmbGV4LXNocmluazogMDtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICB9XG5cbiAgICAmLmlzLWZhdm9yaXRlIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICB9XG59XG5cbi5lZGl0LWJ0biB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICB3aWR0aDogMzJweDtcbiAgICBoZWlnaHQ6IDMycHg7XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xuXG4gICAgaW9uLWljb24ge1xuICAgICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgfVxuXG4gICAgJjpob3ZlciB7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4xNSk7XG4gICAgICAgIGJvcmRlci1jb2xvcjogcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjMpO1xuICAgIH1cblxuICAgICY6YWN0aXZlIHtcbiAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjkpO1xuICAgIH1cbn1cblxuLy8gQ2hlY2tib3ggc3R5bGluZyB0byBtYWtlIGl0IG1vcmUgc3F1YXJlLWxpa2Vcbjo6bmctZGVlcCAuY2hlY2tib3gtY29udGFpbmVyIHtcbiAgICBpb24tY2hlY2tib3gge1xuICAgICAgICAtLWJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgICAgLS1zaXplOiAyNHB4O1xuICAgIH1cbn1cblxuLy8gTWFjcm9zXG4ucmVjaXBlLW1hY3JvcyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgZ2FwOiA4cHg7XG59XG5cbi5tYWNyby1pdGVtIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA2cHg7XG4gICAgZmxleDogMTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLm1hY3JvLWRvdCB7XG4gICAgd2lkdGg6IDhweDtcbiAgICBoZWlnaHQ6IDhweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgZmxleC1zaHJpbms6IDA7XG5cbiAgICAmLmtjYWwge1xuICAgICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgfVxuXG4gICAgJi5wcm90ZWluIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWFsdGVybmF0aXZlKTtcbiAgICB9XG5cbiAgICAmLmNhcmJzIHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICAgIH1cblxuICAgICYuZmF0IHtcbiAgICAgICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG4gICAgfVxufVxuXG4ubWFjcm8tdmFsdWUge1xuICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjg1KTtcbn1cblxuLy8gQmFkZ2VzXG4ucmVjaXBlLWJhZGdlcyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBnYXA6IDZweDtcbiAgICBtYXJnaW4tdG9wOiAycHg7XG59XG5cbi5iYWRnZSB7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDRweDtcbiAgICBwYWRkaW5nOiAzcHggOHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICBmb250LXNpemU6IDAuN3JlbTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuXG4gICAgaW9uLWljb24ge1xuICAgICAgICBmb250LXNpemU6IDEycHg7XG4gICAgfVxuXG4gICAgJi52ZXJpZmllZCB7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MtcmdiKSwgMC4xNSk7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gICAgfVxufVxuXG4uYWRkZWQtbGFiZWwge1xuICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5jYXJkLXByb2dyZXNzIHtcbiAgICBoZWlnaHQ6IDNweDtcbiAgICBtYXJnaW4tdG9wOiA0cHg7XG4gICAgLS1iYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMTgpO1xuICAgIC0tcHJvZ3Jlc3MtYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
}));


/***/ }),

/***/ 65693:
/*!**************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/diets/components/meal/components/search-foods/search-foods.page.ts ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchFoodsPage: () => (/* binding */ SearchFoodsPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _capacitor_keyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @capacitor/keyboard */ 31649);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! rxjs */ 65821);
/* harmony import */ var src_app_core_models_customProduct__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/models/customProduct */ 9268);
/* harmony import */ var src_app_shared_constants_actions_fab__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/constants/actions-fab */ 5303);
/* harmony import */ var src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/constants/measureFilter */ 46926);
/* harmony import */ var src_app_shared_models_filterGroup__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/models/filterGroup */ 37576);
/* harmony import */ var src_app_shared_components_popover_actions_popover_actions_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/components/popover-actions/popover-actions.component */ 49665);
/* harmony import */ var src_app_shared_constants_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/shared/constants/actions */ 97235);
/* harmony import */ var src_app_core_services_diet_day_diet_day_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/services/diet-day/diet-day.service */ 18086);
/* harmony import */ var src_app_core_services_diet_diet_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/core/services/diet/diet.service */ 36752);
/* harmony import */ var src_app_core_services_util_util_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/core/services/util/util.service */ 35400);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var src_app_core_services_meal_meal_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/core/services/meal/meal.service */ 96994);
/* harmony import */ var src_app_core_services_product_product_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! src/app/core/services/product/product.service */ 24630);
/* harmony import */ var src_app_core_services_recipe_recipe_api_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! src/app/core/services/recipe/recipe-api.service */ 12713);
/* harmony import */ var src_app_core_services_recipe_recipe_draft_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! src/app/core/services/recipe/recipe-draft.service */ 57806);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! src/app/core/services/util/navigation.service */ 22938);
/* harmony import */ var src_app_core_services_util_bar_code_scanner_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! src/app/core/services/util/bar-code-scanner.service */ 75822);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @ionic/angular */ 45398);
/* harmony import */ var src_app_core_services_billing_billing_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! src/app/core/services/billing/billing.service */ 58854);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _shared_ui_src_app_shared_components_filter_icons_filter_icons_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../../../../../../../../../shared-ui/src/app/shared/components/filter-icons/filter-icons.component */ 57781);
/* harmony import */ var src_app_core_directives_hide_keyboard_on_scroll_directive__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! src/app/core/directives/hide-keyboard-on-scroll.directive */ 35855);
/* harmony import */ var _macros_bars_macros_bars_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../../../macros-bars/macros-bars.component */ 71234);
/* harmony import */ var _components_product_product_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/product/product.component */ 51887);
/* harmony import */ var _components_recipe_card_recipe_card_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/recipe-card/recipe-card.component */ 53263);


var _SearchFoodsPage;

































const _c0 = ["filterIconsRef"];
function SearchFoodsPage_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](0, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("click", function SearchFoodsPage_button_10_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r13.openScanner());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](1, "ion-icon", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
  }
}
function SearchFoodsPage_button_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](0, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("click", function SearchFoodsPage_button_11_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r16);
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r15.deselectedAll());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](1, "ion-icon", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
  }
}
function SearchFoodsPage_app_filter_icons_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](0, "app-filter-icons", 26, 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("filterMeasureSelect", function SearchFoodsPage_app_filter_icons_12_Template_app_filter_icons_filterMeasureSelect_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r18.filterByMeasure($event));
    })("filterSelection", function SearchFoodsPage_app_filter_icons_12_Template_app_filter_icons_filterSelection_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r19);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r20.setFilterIconsValueBySelection($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("disabled", !ctx_r3.load)("ingredientMode", ctx_r3.ingredientMode)("currentMode", ctx_r3.currentMode);
  }
}
function SearchFoodsPage_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](0, "div", 28)(1, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("click", function SearchFoodsPage_div_13_Template_button_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r21.createProductForIngredient());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](2, "ion-icon", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipeBind1"](5, 1, "SEARCH_FOODS.ADD_INGREDIENT_BTN"));
  }
}
function SearchFoodsPage_ng_container_15_ion_list_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](1, "app-product", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("delete", function SearchFoodsPage_ng_container_15_ion_list_1_ng_container_1_Template_app_product_delete_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r29);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r28.deleteProduct($event));
    })("ingredientToggle", function SearchFoodsPage_ng_container_15_ion_list_1_ng_container_1_Template_app_product_ingredientToggle_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r29);
      const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r30.onIngredientToggle($event));
    })("trainerToggle", function SearchFoodsPage_ng_container_15_ion_list_1_ng_container_1_Template_app_product_trainerToggle_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r29);
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r31.onTrainerProductToggle($event));
    })("trainerFavoriteToggle", function SearchFoodsPage_ng_container_15_ion_list_1_ng_container_1_Template_app_product_trainerFavoriteToggle_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r29);
      const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r32.onTrainerFavoriteProductToggle($event));
    })("trainerFocus", function SearchFoodsPage_ng_container_15_ion_list_1_ng_container_1_Template_app_product_trainerFocus_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r29);
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r33.onTrainerProductFocus($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const product_r27 = ctx.$implicit;
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("dietDay", ctx_r26.dietDay)("meal", ctx_r26.ingredientMode ? ctx_r26.getVirtualMealForIngredients() : ctx_r26.meal)("product", product_r27)("ingredientMode", ctx_r26.ingredientMode)("isIngredientSelected", ctx_r26.isIngredientSelected(product_r27))("recentCustomProduct", ctx_r26.getRecentCustomProduct(product_r27))("showRecentIcon", ctx_r26.isRecentProduct(product_r27))("trainerMultiSelect", !!ctx_r26.trainerContext)("isTrainerSelected", ctx_r26.isProductInTrainerSelection(product_r27))("trainerSelectedQuantity", ctx_r26.getTrainerSelectedQuantity(product_r27))("isTrainerFavorite", ctx_r26.isTrainerFavoriteProduct(product_r27))("isTrainerFocused", ctx_r26.isProductFocused(product_r27));
  }
}
function SearchFoodsPage_ng_container_15_ion_list_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](0, "ion-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](1, SearchFoodsPage_ng_container_15_ion_list_1_ng_container_1_Template, 2, 12, "ng-container", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngForOf", ctx_r23.products);
  }
}
function SearchFoodsPage_ng_container_15_ng_template_2_ng_container_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](0, "div", 36)(1, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](2, "ion-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](9, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("click", function SearchFoodsPage_ng_container_15_ng_template_2_ng_container_0_div_1_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r37);
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r36.createProductFromEmptyState());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](10, "ion-icon", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipeBind1"](5, 3, "SEARCH_FOODS.NO_MATCHES"));
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipeBind1"](8, 5, "SEARCH_FOODS.NO_MATCHES_MSG"));
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipeBind1"](12, 7, "SEARCH_FOODS.CREATE_PRODUCT"), " ");
  }
}
function SearchFoodsPage_ng_container_15_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](1, SearchFoodsPage_ng_container_15_ng_template_2_ng_container_0_div_1_Template, 13, 9, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](3);
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵreference"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngIf", ctx_r34.shouldShowProductsEmptyState())("ngIfElse", _r7);
  }
}
function SearchFoodsPage_ng_container_15_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](0, SearchFoodsPage_ng_container_15_ng_template_2_ng_container_0_Template, 2, 2, "ng-container", 13);
  }
  if (rf & 2) {
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngIf", ctx_r25.load);
  }
}
function SearchFoodsPage_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](1, SearchFoodsPage_ng_container_15_ion_list_1_Template, 2, 1, "ion-list", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](2, SearchFoodsPage_ng_container_15_ng_template_2_Template, 1, 1, "ng-template", null, 32, _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵreference"](3);
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngIf", ctx_r5.products.length > 0)("ngIfElse", _r24);
  }
}
function SearchFoodsPage_ng_container_16_ion_list_1_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r44 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](1, "app-recipe-card", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("toggle", function SearchFoodsPage_ng_container_16_ion_list_1_ng_container_1_Template_app_recipe_card_toggle_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r44);
      const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r43.onRecipeToggle($event));
    })("quickAdd", function SearchFoodsPage_ng_container_16_ion_list_1_ng_container_1_Template_app_recipe_card_quickAdd_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r44);
      const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r45.onRecipeQuickAdd($event));
    })("edit", function SearchFoodsPage_ng_container_16_ion_list_1_ng_container_1_Template_app_recipe_card_edit_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r44);
      const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r46.onRecipeEdit($event));
    })("remove", function SearchFoodsPage_ng_container_16_ion_list_1_ng_container_1_Template_app_recipe_card_remove_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r44);
      const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r47.onRecipeRemove($event));
    })("trainerToggle", function SearchFoodsPage_ng_container_16_ion_list_1_ng_container_1_Template_app_recipe_card_trainerToggle_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r44);
      const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r48.onTrainerRecipeToggle($event));
    })("trainerFavoriteToggle", function SearchFoodsPage_ng_container_16_ion_list_1_ng_container_1_Template_app_recipe_card_trainerFavoriteToggle_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r44);
      const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r49.onTrainerFavoriteRecipeToggle($event));
    })("trainerFocus", function SearchFoodsPage_ng_container_16_ion_list_1_ng_container_1_Template_app_recipe_card_trainerFocus_1_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r44);
      const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r50.onTrainerRecipeFocus($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const recipe_r42 = ctx.$implicit;
    const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("recipe", recipe_r42)("meal", ctx_r41.meal)("dietDay", ctx_r41.dietDay)("user", ctx_r41.user)("loading", ctx_r41.isRecipeLoading(recipe_r42))("recentCustomRecipe", ctx_r41.getRecentCustomRecipe(recipe_r42))("showRecentIcon", ctx_r41.isRecentRecipe(recipe_r42))("trainerMultiSelect", !!ctx_r41.trainerContext)("isTrainerSelected", ctx_r41.isRecipeInTrainerSelection(recipe_r42))("trainerSelectedQuantity", ctx_r41.getTrainerSelectedRecipeQuantity(recipe_r42))("isTrainerFavorite", ctx_r41.isTrainerFavoriteRecipe(recipe_r42))("isTrainerFocused", ctx_r41.isRecipeFocused(recipe_r42));
  }
}
function SearchFoodsPage_ng_container_16_ion_list_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](0, "ion-list");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](1, SearchFoodsPage_ng_container_16_ion_list_1_ng_container_1_Template, 2, 12, "ng-container", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngForOf", ctx_r38.recipes);
  }
}
function SearchFoodsPage_ng_container_16_ng_template_2_ng_container_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r54 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](0, "div", 36)(1, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](2, "ion-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](9, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("click", function SearchFoodsPage_ng_container_16_ng_template_2_ng_container_0_div_1_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r54);
      const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r53.createRecipeFromEmptyState());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](10, "ion-icon", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipeBind1"](5, 3, "SEARCH_FOODS.NO_MATCHES"));
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipeBind1"](8, 5, "SEARCH_FOODS.NO_MATCHES_MSG"));
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipeBind1"](12, 7, "SEARCH_FOODS.CREATE_RECIPE"), " ");
  }
}
function SearchFoodsPage_ng_container_16_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](1, SearchFoodsPage_ng_container_16_ng_template_2_ng_container_0_div_1_Template, 13, 9, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](3);
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵreference"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngIf", ctx_r51.shouldShowProductsEmptyState())("ngIfElse", _r7);
  }
}
function SearchFoodsPage_ng_container_16_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](0, SearchFoodsPage_ng_container_16_ng_template_2_ng_container_0_Template, 2, 2, "ng-container", 13);
  }
  if (rf & 2) {
    const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngIf", ctx_r40.load);
  }
}
function SearchFoodsPage_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](1, SearchFoodsPage_ng_container_16_ion_list_1_Template, 2, 1, "ion-list", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](2, SearchFoodsPage_ng_container_16_ng_template_2_Template, 1, 1, "ng-template", null, 41, _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵreference"](3);
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngIf", ctx_r6.recipes.length > 0)("ngIfElse", _r39);
  }
}
function SearchFoodsPage_ng_template_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](0, "div", 36)(1, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](2, "ion-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](3, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipeBind1"](5, 2, "SEARCH_FOODS.START_SEARCHING"));
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipeBind1"](8, 4, "SEARCH_FOODS.START_SEARCHING_MSG"));
  }
}
function SearchFoodsPage_ng_container_19_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](0, "div", 44)(1, "div", 45)(2, "div", 46)(3, "div", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](4, "ion-skeleton-text", 48)(5, "ion-skeleton-text", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](6, "ion-skeleton-text", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](7, "ion-skeleton-text", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](8, "div", 52)(9, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](10, "div", 54)(11, "ion-skeleton-text", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](12, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](13, "div", 56)(14, "ion-skeleton-text", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](15, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](16, "div", 57)(17, "ion-skeleton-text", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](18, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](19, "div", 58)(20, "ion-skeleton-text", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("animated", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("animated", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("animated", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("animated", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("animated", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("animated", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("animated", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("animated", true);
  }
}
const _c1 = function () {
  return [1, 2, 3, 4, 5, 6];
};
function SearchFoodsPage_ng_container_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](1, SearchFoodsPage_ng_container_19_div_1_Template, 21, 8, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpureFunction0"](1, _c1));
  }
}
function SearchFoodsPage_div_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r58 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](0, "div", 59)(1, "div", 60)(2, "button", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("click", function SearchFoodsPage_div_24_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r58);
      const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r57.setMode("products"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](3, "ion-icon", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](4, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](7, "button", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("click", function SearchFoodsPage_div_24_Template_button_click_7_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r58);
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r59.setMode("recipes"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](8, "ion-icon", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](9, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](12, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](13, "button", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("click", function SearchFoodsPage_div_24_Template_button_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r58);
      const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r60.openCreateActionSheet());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](14, "ion-icon", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵclassProp"]("is-active", ctx_r10.currentMode === "products");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipeBind1"](6, 8, "SEARCH_FOODS.ITEM_TYPE_PRODUCTS_CAP"));
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵclassProp"]("is-active", ctx_r10.currentMode === "recipes");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipeBind1"](11, 10, "SEARCH_FOODS.ITEM_TYPE_RECIPES_CAP"));
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵclassProp"]("recipes-active", ctx_r10.currentMode === "recipes");
  }
}
function SearchFoodsPage_div_25_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](0, "div", 67)(1, "ion-card", 68)(2, "ion-card-content")(3, "div", 69)(4, "div", 70)(5, "span", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipe"](7, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](8, "span", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](9, "kcal");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](10, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](11, "div", 74)(12, "span", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipe"](14, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](15, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](16, "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](17, "span", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](18, "Prote\u00EDna");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](19, "div", 74)(20, "span", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipe"](22, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](23, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](24, "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](25, "span", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](26, "Carbos");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](27, "div", 74)(28, "span", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](29);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipe"](30, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](31, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](32, "g");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](33, "span", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](34, "Grasas");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()()()()()();
  }
  if (rf & 2) {
    const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipeBind2"](7, 4, ctx_r11.ingredientMacros.kcal, "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipeBind2"](14, 7, ctx_r11.ingredientMacros.protein, "1.0-1"));
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipeBind2"](22, 10, ctx_r11.ingredientMacros.carbs, "1.0-1"));
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpipeBind2"](30, 13, ctx_r11.ingredientMacros.fat, "1.0-1"));
  }
}
const _c2 = function () {
  return {
    standalone: true
  };
};
function SearchFoodsPage_div_26_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r64 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](0, "div", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](1, "ion-icon", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](2, "span", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](4, "input", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("ngModelChange", function SearchFoodsPage_div_26_div_2_Template_input_ngModelChange_4_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r64);
      const item_r62 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](item_r62.quantity = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](5, "button", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("click", function SearchFoodsPage_div_26_div_2_Template_button_click_5_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r64);
      const item_r62 = restoredCtx.$implicit;
      const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r65.removeTrainerSelectionItem(item_r62));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](6, "ion-icon", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const item_r62 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("name", item_r62.kind === "recipe" ? "restaurant-outline" : "nutrition-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtextInterpolate"](item_r62.kind === "recipe" ? item_r62.recipe == null ? null : item_r62.recipe.name : item_r62.product == null ? null : item_r62.product.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngModel", item_r62.quantity)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵpureFunction0"](4, _c2));
  }
}
function SearchFoodsPage_div_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r67 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](0, "div", 78)(1, "div", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](2, SearchFoodsPage_div_26_div_2_Template, 7, 5, "div", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](3, "button", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("click", function SearchFoodsPage_div_26_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵrestoreView"](_r67);
      const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵresetView"](ctx_r66.confirmTrainerSelection());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngForOf", ctx_r12.trainerSelection)("ngForTrackBy", ctx_r12.trackByTrainerSelection);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtextInterpolate2"](" A\u00F1adir ", ctx_r12.trainerSelection.length, " a ", (ctx_r12.trainerContext == null ? null : ctx_r12.trainerContext.targetLabel) || (ctx_r12.meal == null ? null : ctx_r12.meal.name), " ");
  }
}
class SearchFoodsPage {
  get currentMode() {
    return this._currentMode;
  }
  set currentMode(value) {
    console.log("[DEBUG - MODE] currentMode changing from", this._currentMode, "to", value, new Error().stack);
    this._currentMode = value;
  }
  get products() {
    return this._products();
  }
  set products(value) {
    this._products.set(value ?? []);
  }
  get selectedIngredients() {
    return this._selectedIngredients();
  }
  set selectedIngredients(value) {
    this._selectedIngredients.set(value ?? []);
  }
  get ingredientMacros() {
    return this._ingredientMacros();
  }
  set ingredientMacros(value) {
    this._ingredientMacros.set(value ?? {
      kcal: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    });
  }
  constructor(dietDayService, dietService, utilService, ionicUtilService, mealService, productService, recipeApiService, recipeDraftService, userService, activatedRoute, navigationService, barCodeScannerService, platform, routerOutlet, cdr, billingService, translate) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietDayService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "utilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "mealService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "productService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recipeApiService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recipeDraftService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "userService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "activatedRoute", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "navigationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "barCodeScannerService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "platform", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "routerOutlet", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "cdr", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "billingService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "translate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "trainerContext", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "modalController", (0,_angular_core__WEBPACK_IMPORTED_MODULE_26__.inject)(_ionic_angular__WEBPACK_IMPORTED_MODULE_27__.ModalController));
    // app-filter-icons mantiene su propio estado visual (ownFilter/favFilter/
    // shieldFilter), sin @Input desde aquí — si reseteamos searchFilterGroup
    // por código hay que empujarlo también al hijo o se desincroniza (icono
    // marcado pero búsqueda sin filtrar).
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "filterIconsRef", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "meal", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "user", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietDay", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "searchFilterGroup", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_products", (0,_angular_core__WEBPACK_IMPORTED_MODULE_26__.signal)([]));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recipes", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recentCustomProducts", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recentCustomRecipes", []);
    // TAREA5 — "cesta" de selección múltiple, solo se usa cuando trainerContext
    // está presente. Vive aquí (no en un componente aparte) porque necesita
    // sobrevivir a cambios de modo (Productos ↔ Recetas) y a la paginación de
    // resultados sin perder lo ya marcado.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "trainerSelection", []);
    // TAREA5 (auditoría UX, Fase B) — favoritos son la biblioteca PERSONAL del
    // entrenador (lo que suele recomendar a cualquier cliente), no del cliente
    // que esté viendo — por eso se leen/escriben contra el entrenador logueado
    // (this.userService.getLocalUser), nunca contra trainerContext.clientUser.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "trainerFavoriteProductIds", new Set());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "trainerFavoriteRecipeIds", new Set());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "hasStartedFoodSearch", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "loadingRecipeIds", new Set());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "idUser", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "load", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isFooterHidden", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "searchBarValue", "");
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_currentMode", "products");
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ingredientMode", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_selectedIngredients", (0,_angular_core__WEBPACK_IMPORTED_MODULE_26__.signal)([]));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "_ingredientMacros", (0,_angular_core__WEBPACK_IMPORTED_MODULE_26__.signal)({
      kcal: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    }));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "CUSTOM_PRODUCT_VALUES", src_app_core_models_customProduct__WEBPACK_IMPORTED_MODULE_3__.CUSTOM_PRODUCT_VALUES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ACTION_TYPES", src_app_shared_constants_actions__WEBPACK_IMPORTED_MODULE_8__.ACTION_TYPES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "returnUrl", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "hasInitialized", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recentProductsLimit", 15);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recentRecipesLimit", 15);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "productByCodeSub", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recentProductsSub", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recentRecipesSub", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "searchProductsSub", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "searchRecipesSub", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "productsRequestVersion", 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "recipesRequestVersion", 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "backButton$", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "keyboardWillShowHandle", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "keyboardWillHideHandle", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "keyboardDidShowHandle", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "keyboardDidHideHandle", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "visualViewportResizeHandler", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "baseViewportHeight", void 0);
    // --- Foco/previsualización (modo entrenador) ---
    // Tocar una card SOLO marca foco (naranja) y avisa a quien controla el
    // panel de detalle aparte (ver onFocusItem en SearchFoodsTrainerContext,
    // implementado por RecipeBuilderModalComponent/day-meal-editor-modal...).
    // Añadir a la selección sigue siendo EXCLUSIVO del checkbox — nunca se
    // añade solo por tocar la card.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "focusedTrainerItem", null);
    this.dietDayService = dietDayService;
    this.dietService = dietService;
    this.utilService = utilService;
    this.ionicUtilService = ionicUtilService;
    this.mealService = mealService;
    this.productService = productService;
    this.recipeApiService = recipeApiService;
    this.recipeDraftService = recipeDraftService;
    this.userService = userService;
    this.activatedRoute = activatedRoute;
    this.navigationService = navigationService;
    this.barCodeScannerService = barCodeScannerService;
    this.platform = platform;
    this.routerOutlet = routerOutlet;
    this.cdr = cdr;
    this.billingService = billingService;
    this.translate = translate;
    this.utilService.setMeasureFilter = src_app_shared_constants_measureFilter__WEBPACK_IMPORTED_MODULE_5__.MEASURE_FILTER_TYPES.auto;
  }
  ngOnInit() {
    this.initInputsFromRoute();
    this.initVariables();
  }
  ionViewWillEnter() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // TAREA5 — modo entrenador: contexto ya viene completo por @Input, sin
      // NavigationService.getState()/getTempData() (bus de estado del
      // consumidor) ni DietDayService.currentDietDay (dieta EN VIVO del
      // consumidor logueado, no la del cliente). Return temprano antes de
      // tocar nada de eso.
      if (_this.trainerContext) {
        _this.user = _this.trainerContext.clientUser;
        _this.dietDay = _this.trainerContext.dietDay;
        _this.meal = _this.trainerContext.meal;
        _this.searchFilterGroup = new src_app_shared_models_filterGroup__WEBPACK_IMPORTED_MODULE_6__.SearchFilterGroup();
        _this.searchFilterGroup.userId = _this.user?._id;
        _this.searchFilterGroup.ownFilter = false;
        _this.hasStartedFoodSearch = false;
        _this.trainerSelection = [];
        const trainerUser = _this.userService.getLocalUser;
        _this.trainerFavoriteProductIds = new Set(trainerUser?.archivedProducts || []);
        _this.trainerFavoriteRecipeIds = new Set(trainerUser?.archivedRecipes || []);
        _this.currentMode = "products";
        _this.trainerContext.registerSelectionApi?.({
          setSelected: (item, quantity) => _this.setTrainerItemSelected(item, quantity)
        });
        // Mismo camino que un arranque en frío normal (ver search()/onModeChange
        // más abajo): con hasStartedFoodSearch=false, carga los productos
        // recientes de ESTA comida antes de que el entrenador escriba nada. Se
        // queda vacío sin romper nada si el cliente no tiene dietId todavía
        // (loadRecentProductsForMeal ya contempla ese caso).
        _this.loadRecentProductsForMeal();
        return;
      }
      _this.initializeBackButtonHandler();
      void _this.initializeKeyboardListeners();
      console.log("[DEBUG - LIFECYCLE] ionViewWillEnter called, currentMode:", _this.currentMode, "hasInitialized:", _this.hasInitialized);
      console.log("[DEBUG - LIFECYCLE] selectedIngredients at START:", _this.selectedIngredients.length);
      console.log("[DEBUG - LIFECYCLE] ingredientMode at START:", _this.ingredientMode);
      _this.user = _this.userService.getLocalUser;
      // Leer posibles parámetros de retorno desde el escáner o config-recipe
      const state = _this.navigationService.getState() || {};
      if (state.userId && !_this.user) _this.user = {
        _id: state.userId
      };
      if (state.mealName && !_this.meal) _this.meal = {
        name: state.mealName
      };
      if (state.returnUrl) _this.returnUrl = state.returnUrl;
      if (state.fromDiets) {
        const currentDietDay = _this.dietDayService.currentDietDay;
        if (currentDietDay) {
          _this.dietDay = currentDietDay;
          const stateMeal = state.meal || _this.meal;
          let updatedMeal;
          if (stateMeal?._id) {
            updatedMeal = currentDietDay.meals.find(m => m._id === stateMeal._id);
          }
          if (!updatedMeal && stateMeal?.name) {
            updatedMeal = currentDietDay.meals.find(m => m.name === stateMeal.name);
          }
          if (updatedMeal) {
            _this.meal = {
              ...updatedMeal
            };
          }
        }
      }
      _this.syncMealAndDietDayFromService();
      // Check if we're returning from config-recipe
      const returningFromConfigRecipe = state.returningFromConfigRecipe;
      if (returningFromConfigRecipe) {
        // Restore saved search state
        const savedState = _this.navigationService.getTempData("searchFoodsState");
        if (savedState) {
          console.log("[DEBUG] Restoring complete search state:", savedState);
          if (savedState.searchFilterGroup) {
            Object.assign(_this.searchFilterGroup, savedState.searchFilterGroup);
          }
          if (savedState.currentMode) {
            _this.currentMode = savedState.currentMode;
          }
          if (savedState.returnUrl !== undefined) {
            _this.returnUrl = savedState.returnUrl;
          }
          if (savedState.ingredientMode !== undefined) {
            _this.ingredientMode = savedState.ingredientMode;
          }
          if (savedState.hasStartedFoodSearch !== undefined) {
            _this.hasStartedFoodSearch = !!savedState.hasStartedFoodSearch;
          }
          // Get UPDATED meal and dietDay from service (they may have been updated in config-recipe)
          const currentDietDay = _this.dietDayService.currentDietDay;
          if (currentDietDay) {
            _this.dietDay = currentDietDay;
            const updatedMeal = _this.findMealInDietDay(currentDietDay, savedState.meal);
            if (updatedMeal) {
              // Create a new reference to force Angular change detection
              _this.meal = {
                ...updatedMeal
              };
              console.log("[DEBUG] Updated meal from dietDay service:", _this.meal);
              console.log("[DEBUG] Meal customRecipes:", _this.meal.customRecipes);
              console.log("[DEBUG] Number of recipe instances:", _this.meal.customRecipes?.length);
            } else {
              _this.meal = savedState.meal;
            }
          } else {
            // Fallback to saved state if service doesn't have current diet day
            if (savedState.meal !== undefined) {
              _this.meal = savedState.meal;
            }
            if (savedState.dietDay !== undefined) {
              _this.dietDay = savedState.dietDay;
            }
          }
        }
        // 🔧 FIX PROBLEMA 2: Also read currentMode directly from state (not just savedState)
        // This handles the case when creating a NEW recipe (no savedState exists)
        if (state.currentMode) {
          console.log("[DEBUG] Setting currentMode from state:", state.currentMode);
          _this.currentMode = state.currentMode;
        }
        if (state.deletedRecipe) {
          _this.handleRecipeDeletedLocally(state.deletedRecipe);
        }
        // If recipe name/description was edited inline, update it in the local list
        if (state.updatedRecipe) {
          const idx = _this.recipes.findIndex(r => r._id === state.updatedRecipe._id);
          if (idx !== -1) {
            // Sustituimos el objeto entero para que también se reflejen borrados
            // como description/name vacíos sin heredar propiedades antiguas.
            _this.recipes[idx] = {
              ...state.updatedRecipe
            };
            _this.recipes = [..._this.recipes];
          }
          if (_this.meal?.customRecipes?.length) {
            _this.meal = {
              ..._this.meal,
              customRecipes: _this.meal.customRecipes.map(customRecipe => {
                const recipeRef = typeof customRecipe.recipe === "object" ? customRecipe.recipe : null;
                if (recipeRef?._id !== state.updatedRecipe._id) {
                  return customRecipe;
                }
                return {
                  ...customRecipe,
                  recipe: {
                    ...state.updatedRecipe
                  }
                };
              })
            };
          }
        }
        // Clear the flag and temp data
        _this.navigationService.clearStateKeys(["returningFromConfigRecipe", "deletedRecipe", "updatedRecipe"]);
        _this.navigationService.clearTempData("searchFoodsState");
      }
      // Ingredient mode for recipe creation - CRITICAL: must be read here too
      // Check if we have newIngredient first to avoid unnecessary operations
      const hasNewIngredient = _this.navigationService.getTempData("newIngredient");
      if (state.ingredientMode) {
        _this.ingredientMode = true;
        // Force mode to products when in ingredient mode
        _this.currentMode = "products";
        // Reset search state so loadRecentProductsForMeal runs (page may be reused)
        _this.hasStartedFoodSearch = false;
        // Store ingredient mode state in tempData for back button handler
        // This ensures the state persists even if ionViewWillEnter is called multiple times
        if (state.returnUrl) {
          _this.returnUrl = state.returnUrl;
          _this.navigationService.setTempData("ingredientModeState", {
            active: true,
            returnUrl: state.returnUrl
          });
        }
        // Recipes usa un draft compartido en memoria como fuente principal.
        // TempData queda solo como compatibilidad/fallback.
        if (_this.recipeDraftService.isActive()) {
          _this.selectedIngredients = _this.recipeDraftService.ingredients();
        }
        // 🔧 FIX: PRIMERO restaurar de tempData si existe (volviendo de create-product)
        else {
          const tempIngredients = _this.navigationService.getTempData("selectedIngredients");
          if (tempIngredients && tempIngredients.length > 0) {
            console.log("[DEBUG] Restoring selectedIngredients from tempData:", tempIngredients.length);
            _this.selectedIngredients = tempIngredients;
            // ⚠️ NO limpiar tempData aquí - se necesita para múltiples ciclos de vida
            // Se limpiará cuando salgamos del modo ingrediente
          }
          // SEGUNDO: si no hay tempData, usar state.existingIngredients
          else if (state.existingIngredients && state.existingIngredients.length > 0) {
            console.log("[DEBUG] Loading existingIngredients from state:", state.existingIngredients.length);
            _this.selectedIngredients = state.existingIngredients;
          }
        }
        if (_this.recipeDraftService.isActive()) {
          _this.syncRecipeDraftIngredients();
        }
        console.log("[DEBUG - STATE] Final selectedIngredients.length:", _this.selectedIngredients.length);
        console.log("[DEBUG] Entering ingredient mode with ingredients:", _this.selectedIngredients.length);
        console.log("[DEBUG] Existing ingredients:", _this.selectedIngredients.map(i => i.product?.name));
        _this.calculateIngredientMacros();
        if (hasNewIngredient) {
          console.log("[DEBUG] Skipping search - processing newIngredient instead");
        }
      } else if (!returningFromConfigRecipe) {
        // 🔧 FIX: Check if we have tempData (returning from create-product in ingredient mode)
        // If we have tempData with ingredients or newIngredient, we're still in ingredient mode
        const tempIngredients = _this.navigationService.getTempData("selectedIngredients");
        const hasNewIngredient = _this.navigationService.getTempData("newIngredient");
        if (!tempIngredients && !hasNewIngredient) {
          // Only reset ingredient mode if NOT returning from config-recipe AND no tempData
          // This means we're truly entering normal mode (not coming from create-product)
          console.log("[DEBUG] Resetting ingredient mode - entering normal mode");
          _this.ingredientMode = false;
          _this.selectedIngredients = [];
          _this.ingredientMacros = {
            kcal: 0,
            protein: 0,
            carbs: 0,
            fat: 0
          };
          // Limpiar tempData de ingredientes al salir del modo ingrediente
          _this.navigationService.clearTempData("selectedIngredients");
          _this.navigationService.clearTempData("ingredientModeState");
        } else {
          console.log("[DEBUG] Has tempData - staying/activating ingredient mode");
          // We're returning from create-product, stay in (or activate) ingredient mode
          _this.ingredientMode = true;
          _this.currentMode = "products";
          // Restore ingredients from tempData
          if (tempIngredients && tempIngredients.length > 0) {
            console.log("[DEBUG] Restoring selectedIngredients from tempData (fallback):", tempIngredients.length);
            _this.selectedIngredients = tempIngredients;
          }
          _this.calculateIngredientMacros();
        }
      } else if (!_this.ingredientMode && _this.selectedIngredients.length > 0) {
        console.log("[DEBUG] ingredientMode=false but selectedIngredients not empty, clearing");
        _this.selectedIngredients = [];
        _this.ingredientMacros = {
          kcal: 0,
          protein: 0,
          carbs: 0,
          fat: 0
        };
        _this.navigationService.clearTempData("selectedIngredients");
        _this.navigationService.clearTempData("ingredientModeState");
      }
      // Check if returning from add-product with a new ingredient
      // Process AFTER setting ingredientMode to ensure proper context
      const newIngredient = _this.navigationService.getTempData("newIngredient");
      console.log("[DEBUG] Checking for newIngredient...");
      console.log("[DEBUG] newIngredient:", newIngredient);
      console.log("[DEBUG] this.ingredientMode:", _this.ingredientMode);
      console.log("[DEBUG] state.ingredientMode:", state.ingredientMode);
      if (newIngredient && _this.ingredientMode) {
        _this.applyNewIngredientToSelection(newIngredient);
        _this.navigationService.clearTempData("newIngredient");
      }
      if (_this.ingredientMode && _this.recipeDraftService.isActive()) {
        _this.selectedIngredients = _this.recipeDraftService.ingredients();
        _this.calculateIngredientMacros();
      }
      // Manejo de resultados al volver desde AddProduct por ruta (sin modales)
      const navStateResult = _this.navigationService.getState() || {};
      const navStateTemp = _this.navigationService.getTempData("searchFoodsResult") || {};
      _this.navigationService.clearTempData("searchFoodsResult");
      const result = {
        ...(navStateResult || {}),
        ...(navStateResult.result || {}),
        ...navStateTemp
      };
      // Determine if we need to search
      let shouldSearch = false;
      if (result?.deleteOwnProduct) {
        _this.handleProductDeletedLocally(result.deleteOwnProduct);
        shouldSearch = false;
      } else if (result?.createdViaAddProduct) {
        // Switch to products segment when creating a product
        _this.currentMode = "products";
        // Mostrar "Todos los productos": no dejar arrastrado un filtro own/fav/shield previo
        _this.searchFilterGroup.ownFilter = false;
        _this.searchFilterGroup.favFilter = false;
        _this.searchFilterGroup.shieldFilter = false;
        // app-filter-icons no tiene @Input para esto: hay que resetear su
        // estado visual explícitamente o el icono queda marcado sin filtrar.
        _this.filterIconsRef?.selectAllFilter();
        _this.syncMealAndDietDayFromService();
        // Force search to refresh products list from API after creation
        _this.markFoodSearchStarted();
        shouldSearch = true;
      } else if (result?.createdViaCreateProduct) {
        // Switch to products segment when creating a custom product
        _this.currentMode = "products";
        // Mostrar "Todos los productos": no dejar arrastrado un filtro own/fav/shield previo
        _this.searchFilterGroup.ownFilter = false;
        _this.searchFilterGroup.favFilter = false;
        _this.searchFilterGroup.shieldFilter = false;
        _this.filterIconsRef?.selectAllFilter();
        _this.syncMealAndDietDayFromService();
        // Force search to refresh products list from API after creation
        _this.markFoodSearchStarted();
        shouldSearch = true;
      } else if (result?.refresh) {
        // Force refresh requested
        _this.syncMealAndDietDayFromService();
        _this.markFoodSearchStarted();
        shouldSearch = true;
      } else if (!returningFromConfigRecipe) {
        if (!_this.hasInitialized) {
          console.log("[DEBUG - INIT] Loading recent products only, currentMode:", _this.currentMode);
          _this.hasInitialized = true;
        }
      } else {
        console.log("[DEBUG] Returning from config-recipe, keeping current products:", _this.products.length);
        const activeListIsEmpty = _this.currentMode === "recipes" ? !_this.recipes || _this.recipes.length === 0 : !_this.products || _this.products.length === 0;
        if (activeListIsEmpty) {
          console.log("[DEBUG] Active segment list is empty", _this.currentMode);
          shouldSearch = _this.hasStartedFoodSearch;
        } else {
          // Ensure load is true to hide skeletons
          _this.load = true;
        }
      }
      // Execute search only once if needed
      if (shouldSearch) {
        _this.search();
      } else if (!_this.hasStartedFoodSearch) {
        if (_this.currentMode === "products") {
          _this.loadRecentProductsForMeal();
        } else if (_this.currentMode === "recipes") {
          _this.loadRecentRecipesForMeal();
        } else {
          _this.load = true;
        }
      }
      // 🍎 iOS: Inhabilitar gesto de ir hacia atrás si estamos en modo ingrediente
      // Esto evita que el swipe-back nos lleve a 'diets' en lugar de volver a 'config-recipe'
      if (_this.platform.is("ios") && _this.ingredientMode && _this.routerOutlet) {
        console.log("[iOS] Disabling swipe-back gesture in ingredient mode");
        _this.routerOutlet.swipeGesture = false;
      }
      // 🔧 FIX: Procesar posible producto actualizado desde navegación
      if (state.updatedProduct) {
        console.log("[DEBUG] Processing updatedProduct from state:", state.updatedProduct.name);
        const idx = _this.products.findIndex(p => p._id === state.updatedProduct._id);
        if (idx !== -1) {
          _this.products = _this.products.map((p, index) => index === idx ? {
            ...state.updatedProduct
          } : p);
          console.log("[DEBUG] Updated product in local list at index:", idx);
        }
        const hasDietDayChanges = _this.dietDayService.syncUpdatedProductInCurrentDietDay(state.updatedProduct);
        if (hasDietDayChanges) {
          _this.syncMealAndDietDayFromService();
        }
      }
    })();
  }
  ngOnDestroy() {
    this.recentProductsSub?.unsubscribe();
    this.recentRecipesSub?.unsubscribe();
    this.searchProductsSub?.unsubscribe();
    this.searchRecipesSub?.unsubscribe();
    if (this.backButton$) {
      this.backButton$.unsubscribe();
    }
  }
  initializeBackButtonHandler() {
    if (this.backButton$) {
      this.backButton$.unsubscribe();
    }
    this.backButton$ = this.platform.backButton.subscribeWithPriority(9999, () => {
      // Check if we're in ingredient mode by checking component state OR tempData
      // This ensures back button works even if ionViewWillEnter cleared the state
      const tempIngredientModeState = this.navigationService.getTempData("ingredientModeState");
      if (this.ingredientMode || tempIngredientModeState && tempIngredientModeState.active) {
        console.log("[BACK BUTTON] Ingredient mode detected, using returnUrl");
        // Ensure returnUrl is set from tempData if component state was cleared
        if (!this.returnUrl && tempIngredientModeState?.returnUrl) {
          this.returnUrl = tempIngredientModeState.returnUrl;
        }
        if (!this.ingredientMode && tempIngredientModeState?.active) {
          this.ingredientMode = true;
        }
      }
      this.close();
    });
  }
  ionViewWillLeave() {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this2.removeKeyboardListeners();
      if (_this2.ingredientMode && _this2.returnUrl) {
        _this2.syncRecipeDraftIngredients();
        const ingredientsCopy = _this2.cloneSelectedIngredients();
        _this2.navigationService.setTempData("selectedIngredients", ingredientsCopy);
      }
      _this2.cancelProductLookup();
      _this2.recentProductsSub?.unsubscribe();
      _this2.recentRecipesSub?.unsubscribe();
      _this2.searchProductsSub?.unsubscribe();
      _this2.searchRecipesSub?.unsubscribe();
      // 🍎 Re-habilitar gesto de ir hacia atrás al salir
      if (_this2.platform.is("ios") && _this2.routerOutlet) {
        _this2.routerOutlet.swipeGesture = true;
      }
    })();
  }
  initializeKeyboardListeners() {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this3.removeKeyboardListeners();
      if (_this3.platform.is('capacitor')) {
        const handleShow = () => _this3.setFooterHidden(true);
        const handleHide = () => _this3.setFooterHidden(false);
        try {
          _this3.keyboardWillShowHandle = yield _capacitor_keyboard__WEBPACK_IMPORTED_MODULE_2__.Keyboard.addListener("keyboardWillShow", handleShow);
          _this3.keyboardWillHideHandle = yield _capacitor_keyboard__WEBPACK_IMPORTED_MODULE_2__.Keyboard.addListener("keyboardWillHide", handleHide);
          _this3.keyboardDidShowHandle = yield _capacitor_keyboard__WEBPACK_IMPORTED_MODULE_2__.Keyboard.addListener("keyboardDidShow", handleShow);
          _this3.keyboardDidHideHandle = yield _capacitor_keyboard__WEBPACK_IMPORTED_MODULE_2__.Keyboard.addListener("keyboardDidHide", handleHide);
        } catch (error) {
          console.error("[Keyboard] Failed to register listeners", error);
        }
      }
      if (_this3.platform.is("ios") && window.visualViewport) {
        _this3.baseViewportHeight = window.visualViewport.height;
        _this3.visualViewportResizeHandler = () => {
          const currentHeight = window.visualViewport?.height;
          if (!currentHeight) {
            return;
          }
          if (!_this3.baseViewportHeight || currentHeight > _this3.baseViewportHeight) {
            _this3.baseViewportHeight = currentHeight;
          }
          const isKeyboardVisible = currentHeight < (_this3.baseViewportHeight ?? currentHeight) - 120;
          _this3.setFooterHidden(isKeyboardVisible);
          if (!isKeyboardVisible) {
            _this3.baseViewportHeight = currentHeight;
          }
        };
        window.visualViewport.addEventListener("resize", _this3.visualViewportResizeHandler);
      }
    })();
  }
  removeKeyboardListeners() {
    var _this4 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this4.platform.is('capacitor')) {
        try {
          yield _this4.keyboardWillShowHandle?.remove();
          yield _this4.keyboardWillHideHandle?.remove();
          yield _this4.keyboardDidShowHandle?.remove();
          yield _this4.keyboardDidHideHandle?.remove();
        } catch (error) {
          console.error("[Keyboard] Failed to remove listeners", error);
        }
      }
      _this4.keyboardWillShowHandle = undefined;
      _this4.keyboardWillHideHandle = undefined;
      _this4.keyboardDidShowHandle = undefined;
      _this4.keyboardDidHideHandle = undefined;
      if (_this4.visualViewportResizeHandler && window.visualViewport) {
        window.visualViewport.removeEventListener("resize", _this4.visualViewportResizeHandler);
      }
      _this4.visualViewportResizeHandler = undefined;
      _this4.baseViewportHeight = undefined;
    })();
  }
  setFooterHidden(hidden) {
    if (this.isFooterHidden === hidden) {
      return;
    }
    this.isFooterHidden = hidden;
    // Forzar detección de cambios inmediata para que los *ngIf del footer
    // se actualicen en el mismo ciclo que la animación del teclado,
    // evitando el estado intermedio que rompe el layout.
    this.cdr.detectChanges();
  }
  search(event) {
    console.log("[DEBUG - SEARCH] search() called, event:", event, new Error().stack);
    if (event !== undefined) {
      this.markFoodSearchStarted();
    }
    if (!this.hasStartedFoodSearch) {
      if (this.currentMode === "products") {
        this.loadRecentProductsForMeal();
      } else if (this.currentMode === "recipes") {
        this.loadRecentRecipesForMeal();
      }
      return;
    }
    this.searchFilterGroup.page = 0;
    if (event !== undefined) {
      this.searchFilterGroup.search = typeof event === "string" ? event : this.utilService.getEventString(event);
      this.searchBarValue = this.searchFilterGroup.search;
    }
    this.products = [];
    this.recipes = [];
    if (this.currentMode === "products" && this.shouldSkipProductsSearch()) {
      this.load = true;
      return;
    }
    if (this.currentMode === "products") {
      this.searchProducts();
    } else {
      this.searchRecipes();
    }
  }
  setFilterIconsValueBySelection(event) {
    this.markFoodSearchStarted();
    Object.assign(this.searchFilterGroup, event);
    this.searchFilterGroup.page = 0;
    this.products = [];
    this.recipes = [];
    if (this.currentMode === "products" && this.shouldSkipProductsSearch()) {
      this.load = true;
      return;
    }
    if (this.currentMode === "products") {
      this.searchProducts();
    } else {
      this.searchRecipes();
    }
  }
  onModeChange(mode) {
    // Prevent mode change in ingredient mode - always stay in products
    if (this.ingredientMode && mode !== "products") {
      return;
    }
    // Update segment UI immediately
    this.currentMode = mode;
    this.cdr.detectChanges();
    // Run data work in next tick to avoid delayed visual feedback on mobile
    setTimeout(() => {
      if (this.currentMode !== mode) {
        return;
      }
      this.searchFilterGroup.ownFilter = false;
      this.searchFilterGroup.favFilter = false;
      this.searchFilterGroup.shieldFilter = false;
      this.searchFilterGroup.page = 0;
      this.products = [];
      this.recipes = [];
      // If no search has been performed yet, load recent items first
      // This ensures recent recipes/products appear before any API search
      if (!this.hasStartedFoodSearch) {
        if (mode === "products") {
          this.loadRecentProductsForMeal();
        } else {
          this.loadRecentRecipesForMeal();
        }
        return;
      }
      if (mode === "products" && this.shouldSkipProductsSearch()) {
        this.load = true;
        return;
      }
      if (mode === "products") {
        this.searchProducts();
      } else {
        this.searchRecipes();
      }
    }, 0);
  }
  setMode(mode) {
    // Prevent mode change in ingredient mode
    if (this.ingredientMode && mode !== "products") {
      return;
    }
    if (this.currentMode !== mode) {
      this.onModeChange(mode);
    }
  }
  loadData(event) {
    if (!this.hasStartedFoodSearch) {
      event.target.complete();
      return;
    }
    if (this.currentMode === "products" && this.shouldSkipProductsSearch()) {
      event.target.complete();
      return;
    }
    this.searchFilterGroup.page++;
    setTimeout(() => {
      event.target.complete();
      if (this.currentMode === "products") {
        this.searchProducts();
      } else {
        this.searchRecipes();
      }
    }, 500);
  }
  filterByMeasure(eventMeasureFilter) {
    this.utilService.setMeasureFilter = eventMeasureFilter;
  }
  openScanner() {
    var _this5 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // 🔧 FIX: Guardar ingredientes antes de navegar (prevención de pérdida)
      if (_this5.ingredientMode && _this5.selectedIngredients.length > 0) {
        console.log("[DEBUG] Saving selectedIngredients before scanner:", _this5.selectedIngredients);
        _this5.navigationService.setTempData("selectedIngredients", _this5.cloneSelectedIngredients());
      }
      const scannedCode = yield _this5.barCodeScannerService.startScanner();
      if (!scannedCode) return;
      yield _this5.ionicUtilService.showLoading({
        message: _this5.translate.instant('SEARCH_FOODS.SEARCHING_PRODUCT'),
        spinner: "crescent",
        cssClass: "loading-orange"
      });
      _this5.productByCodeSub = _this5.productService.getProductByCode(_this5.user._id, scannedCode).subscribe({
        next: resProduct => {
          const isScanned = true;
          const product = resProduct["product"];
          if (product) {
            // 🔧 FIX: Producto encontrado - diferenciar por modo
            const queryParams = {
              product: JSON.stringify(product),
              isScanned: isScanned,
              productQuantity: product.servingQuantity
            };
            const baseState = {
              product,
              isScanned,
              productQuantity: product.servingQuantity,
              returnUrl: "/search-foods"
            };
            if (_this5.ingredientMode) {
              // ✅ MODO INGREDIENTE: No pasar meal/dietDay, SÍ pasar ingredientMode
              console.log("[DEBUG] Scanner → add-product (ingredientMode)");
              baseState.ingredientMode = true;
            } else {
              // MODO NORMAL: Incluir meal y dietDay
              console.log("[DEBUG] Scanner → add-product (normal mode)");
              queryParams.dietDay = JSON.stringify(_this5.dietDay);
              queryParams.meal = JSON.stringify(_this5.meal);
              baseState.dietDay = _this5.dietDay;
              baseState.meal = _this5.meal;
            }
            _this5.ionicUtilService.hideLoading();
            _this5.navigationService.goToAddProduct({
              replaceUrl: false,
              queryParams,
              state: baseState
            });
          } else {
            // ✅ Producto no encontrado
            _this5.ionicUtilService.hideLoading();
            _this5.createProduct(scannedCode);
          }
        },
        error: _ => {
          _this5.ionicUtilService.hideLoading();
          const t = _this5.translate.instant.bind(_this5.translate);
          _this5.ionicUtilService.showAlert({
            header: t('COMMON.ERROR'),
            message: t('SEARCH_FOODS.PRODUCT_NOT_FOUND'),
            buttons: [t('COMMON.OK')]
          });
        },
        complete: () => {
          _this5.productByCodeSub = undefined;
        }
      });
    })();
  }
  onCloseFab(actionFab) {
    switch (actionFab) {
      case src_app_shared_constants_actions_fab__WEBPACK_IMPORTED_MODULE_4__.ACTIONS_FAB_TYPES.createProduct:
        this.createProduct();
        break;
      case src_app_shared_constants_actions_fab__WEBPACK_IMPORTED_MODULE_4__.ACTIONS_FAB_TYPES.createRecipe:
        void this.createRecipe();
        break;
    }
  }
  openCreateActionSheet() {
    var _this6 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // TAREA5/Fix7 — modo entrenador: si el consumidor de trainerContext
      // implementa pickCreateRecipe, ofrece el mismo selector producto/receta
      // que el consumidor normal; si no, mantiene el atajo directo a crear
      // producto de antes.
      if (_this6.trainerContext) {
        if (!_this6.trainerContext.pickCreateRecipe) {
          _this6.trainerContext.pickCreateProduct();
          return;
        }
        const t = _this6.translate.instant.bind(_this6.translate);
        const result = yield _this6.ionicUtilService.showActionSheet({
          cssClass: "create-action-sheet",
          mode: "ios",
          buttons: [{
            text: t('ACTIONS_FAB.NEW_PRODUCT'),
            icon: "nutrition-outline",
            data: src_app_shared_constants_actions_fab__WEBPACK_IMPORTED_MODULE_4__.ACTIONS_FAB_TYPES.createProduct,
            cssClass: "action-sheet-product"
          }, {
            text: t('ACTIONS_FAB.NEW_RECIPE'),
            icon: "restaurant-outline",
            data: src_app_shared_constants_actions_fab__WEBPACK_IMPORTED_MODULE_4__.ACTIONS_FAB_TYPES.createRecipe,
            cssClass: "action-sheet-recipe"
          }]
        });
        if (result.data === src_app_shared_constants_actions_fab__WEBPACK_IMPORTED_MODULE_4__.ACTIONS_FAB_TYPES.createRecipe) {
          _this6.trainerContext.pickCreateRecipe();
        } else if (result.data === src_app_shared_constants_actions_fab__WEBPACK_IMPORTED_MODULE_4__.ACTIONS_FAB_TYPES.createProduct) {
          _this6.trainerContext.pickCreateProduct();
        }
        return;
      }
      const t = _this6.translate.instant.bind(_this6.translate);
      const actionSheetOptions = {
        cssClass: "create-action-sheet",
        mode: "ios",
        buttons: [{
          text: t('ACTIONS_FAB.NEW_PRODUCT'),
          icon: "nutrition-outline",
          data: src_app_shared_constants_actions_fab__WEBPACK_IMPORTED_MODULE_4__.ACTIONS_FAB_TYPES.createProduct,
          cssClass: "action-sheet-product"
        }, {
          text: t('ACTIONS_FAB.NEW_RECIPE'),
          icon: "restaurant-outline",
          data: src_app_shared_constants_actions_fab__WEBPACK_IMPORTED_MODULE_4__.ACTIONS_FAB_TYPES.createRecipe,
          cssClass: "action-sheet-recipe"
        }]
      };
      const result = yield _this6.ionicUtilService.showActionSheet(actionSheetOptions);
      if (result.data !== undefined) {
        _this6.onCloseFab(result.data);
      }
    })();
  }
  /**
   * Eliminar un producto del usuario. El producto se identifica por su _id.
   * Solo el creador puede borrar sus propios productos (detectado por product.userId).
   */
  deleteProduct(productId) {
    const product = this.products?.find(p => p._id === productId);
    const productName = product ? product.name : this.translate.instant('COMMON.THIS') + " producto";
    const t = this.translate.instant.bind(this.translate);
    const alertOptions = {
      header: t('SEARCH_FOODS.DELETE_PRODUCT_HEADER'),
      message: t('SEARCH_FOODS.DELETE_PRODUCT_CONFIRM', {
        name: productName
      }),
      buttons: [{
        text: t('COMMON.CANCEL').toUpperCase(),
        role: "cancel"
      }, {
        text: t('COMMON.DELETE').toUpperCase(),
        role: "destructive",
        handler: () => {
          this.productService.deleteProduct(productId).subscribe({
            next: () => {
              this.handleProductDeletedLocally(productId);
              this.search();
            },
            error: err => {
              console.error("[deleteProduct] Error:", err);
              this.ionicUtilService.showToast({
                message: t('SEARCH_FOODS.DELETE_PRODUCT_ERROR'),
                duration: 2000,
                color: "danger"
              });
            }
          });
        }
      }]
    };
    this.ionicUtilService.showAlert(alertOptions);
  }
  handleProductDeletedLocally(productId) {
    if (!productId) {
      return;
    }
    // Mantener el draft de recipes alineado con el borrado real del Product.
    this.recipeDraftService.removeProductReferences(productId);
    this.products = (this.products || []).filter(p => p?._id !== productId);
    // Limpiar selectedIngredients (modo ingredientes)
    if (this.selectedIngredients?.length) {
      const filteredIngredients = this.selectedIngredients.filter(ing => ing?.product?._id !== productId);
      // Actualizar usando el setter para disparar el signal
      this.selectedIngredients = filteredIngredients;
      this.calculateIngredientMacros();
      this.navigationService.setTempData("selectedIngredients", this.cloneSelectedIngredients());
      if (this.currentMode === "products") {
        this.setSelectedIngredientsFirst();
      }
    } else if (this.ingredientMode) {
      this.selectedIngredients = [];
      this.navigationService.setTempData("selectedIngredients", []);
    }
    // Limpiar receta en tempData si existe (para config-recipe)
    const savedRecipe = this.navigationService.getTempData("configRecipeDef");
    if (savedRecipe && Array.isArray(savedRecipe.customProducts)) {
      savedRecipe.customProducts = savedRecipe.customProducts.filter(cp => {
        const cpProductId = typeof cp?.product === "string" ? cp.product : cp?.product?._id;
        return cpProductId !== productId;
      });
      this.navigationService.setTempData("configRecipeDef", savedRecipe);
    }
    // Limpiar customRecipe en tempData si existe
    const savedInstance = this.navigationService.getTempData("configRecipeInstance");
    if (savedInstance) {
      if (Array.isArray(savedInstance.addedCustomProducts)) {
        savedInstance.addedCustomProducts = savedInstance.addedCustomProducts.filter(addCp => {
          const addProductId = typeof addCp?.product === "string" ? addCp.product : addCp?.product?._id;
          return addProductId !== productId;
        });
      }
      const recipe = typeof savedInstance.recipe === "object" ? savedInstance.recipe : null;
      if (recipe && Array.isArray(recipe.customProducts)) {
        const removedCustomProductIds = new Set();
        recipe.customProducts = recipe.customProducts.filter(cp => {
          const cpProductId = typeof cp?.product === "string" ? cp.product : cp?.product?._id;
          const keep = cpProductId !== productId;
          if (!keep && cp?._id) {
            removedCustomProductIds.add(cp._id.toString());
          }
          return keep;
        });
        // Limpiar overrides relacionados
        if (removedCustomProductIds.size > 0 && Array.isArray(savedInstance.modifiedBaseCustomProducts)) {
          savedInstance.modifiedBaseCustomProducts = savedInstance.modifiedBaseCustomProducts.filter(override => {
            const overrideId = typeof override?.baseCustomProductId === "string" ? override.baseCustomProductId : override?.baseCustomProductId?._id;
            return !removedCustomProductIds.has((overrideId || "").toString());
          });
          savedInstance.removedBaseCustomProductIds = (savedInstance.removedBaseCustomProductIds || []).filter(id => !removedCustomProductIds.has((id?._id || id).toString()));
        }
      }
      this.navigationService.setTempData("configRecipeInstance", savedInstance);
    }
    if (this.user?.archivedProducts?.includes(productId)) {
      this.user.archivedProducts = this.user.archivedProducts.filter(id => id !== productId);
      this.userService.setLocalUser = this.user;
    }
    const currentDietDay = this.dietDayService.currentDietDay;
    if (!currentDietDay?.meals?.length) {
      return;
    }
    let hasDietDayChanges = false;
    currentDietDay.meals.forEach(mealTemp => {
      if (mealTemp?.customProducts?.length) {
        const originalLen = mealTemp.customProducts.length;
        mealTemp.customProducts = mealTemp.customProducts.filter(cp => cp?.product?._id !== productId);
        if (mealTemp.customProducts.length !== originalLen) {
          hasDietDayChanges = true;
        }
      }
      if (mealTemp?.customRecipes?.length) {
        mealTemp.customRecipes.forEach(customRecipe => {
          if (!customRecipe) return;
          if (Array.isArray(customRecipe.addedCustomProducts)) {
            const originalAdditional = customRecipe.addedCustomProducts.length;
            customRecipe.addedCustomProducts = customRecipe.addedCustomProducts.filter(addCp => {
              const addProductId = typeof addCp?.product === "string" ? addCp.product : addCp?.product?._id;
              return addProductId !== productId;
            });
            if (customRecipe.addedCustomProducts.length !== originalAdditional) {
              hasDietDayChanges = true;
            }
          }
          const recipe = typeof customRecipe.recipe === "object" ? customRecipe.recipe : null;
          if (recipe && Array.isArray(recipe.customProducts)) {
            const removedCustomProductIds = new Set();
            const originalRecipeCpLen = recipe.customProducts.length;
            recipe.customProducts = recipe.customProducts.filter(cp => {
              const cpProductId = typeof cp?.product === "string" ? cp.product : cp?.product?._id;
              const keep = cpProductId !== productId;
              if (!keep && cp?._id) {
                removedCustomProductIds.add(cp._id.toString());
              }
              return keep;
            });
            if (recipe.customProducts.length !== originalRecipeCpLen) {
              hasDietDayChanges = true;
            }
            if (removedCustomProductIds.size > 0 && Array.isArray(customRecipe.modifiedBaseCustomProducts)) {
              const originalOverridesLen = customRecipe.modifiedBaseCustomProducts.length;
              customRecipe.modifiedBaseCustomProducts = customRecipe.modifiedBaseCustomProducts.filter(override => {
                const overrideId = typeof override?.baseCustomProductId === "string" ? override.baseCustomProductId : override?.baseCustomProductId?._id;
                return !removedCustomProductIds.has((overrideId || "").toString());
              });
              if (customRecipe.modifiedBaseCustomProducts.length !== originalOverridesLen) {
                hasDietDayChanges = true;
              }
            }
          }
        });
      }
    });
    if (hasDietDayChanges) {
      this.dietDay = {
        ...currentDietDay
      };
      this.dietDayService.setCurrentDietDay = this.dietDay;
      this.syncMealAndDietDayFromService();
    }
  }
  handleRecipeDeletedLocally(recipeId) {
    if (!recipeId) {
      return;
    }
    this.recipeDraftService.reset();
    this.recipes = (this.recipes || []).filter(recipe => recipe?._id !== recipeId);
    if (this.user?.archivedRecipes?.includes(recipeId)) {
      this.user.archivedRecipes = this.user.archivedRecipes.filter(id => id !== recipeId);
      this.userService.setLocalUser = this.user;
    }
    if (this.meal?.customRecipes?.length) {
      this.meal = {
        ...this.meal,
        customRecipes: this.meal.customRecipes.filter(customRecipe => this.getRecipeIdFromCustomRecipe(customRecipe) !== recipeId)
      };
    }
    const currentDietDay = this.dietDayService.currentDietDay || this.dietDay;
    if (currentDietDay?.meals?.length) {
      let hasChanges = false;
      const meals = currentDietDay.meals.map(meal => {
        const currentCustomRecipes = meal.customRecipes || [];
        const nextCustomRecipes = currentCustomRecipes.filter(customRecipe => this.getRecipeIdFromCustomRecipe(customRecipe) !== recipeId);
        if (nextCustomRecipes.length === currentCustomRecipes.length) {
          return meal;
        }
        hasChanges = true;
        return {
          ...meal,
          customRecipes: nextCustomRecipes
        };
      });
      if (hasChanges) {
        const nextDietDay = {
          ...currentDietDay,
          meals
        };
        this.dietDay = nextDietDay;
        this.dietDayService.setCurrentDietDay = nextDietDay;
      }
    }
    this.navigationService.clearTempData("configRecipeFormState");
    this.navigationService.clearTempData("configRecipeInstance");
    this.navigationService.clearTempData("configRecipeDef");
    this.navigationService.clearTempData("selectedIngredients");
  }
  getRecipeIdFromCustomRecipe(customRecipe) {
    const recipeRef = customRecipe?.recipe;
    if (!recipeRef) return null;
    if (typeof recipeRef === "string") return recipeRef;
    return recipeRef?._id?.toString?.() || recipeRef?.toString?.() || null;
  }
  // Handler for ingredient mode - adds/removes product to local array without API calls
  onIngredientToggle(data) {
    const {
      product,
      quantity,
      checked
    } = data;
    console.log("[DEBUG] onIngredientToggle called:", {
      productName: product.name,
      productId: product._id,
      quantity,
      checked,
      currentCount: this.selectedIngredients.length
    });
    if (checked) {
      // Check if already exists to avoid duplicates
      const alreadyExists = this.selectedIngredients.some(ing => ing.product?._id === product._id);
      if (!alreadyExists) {
        // Add to selected ingredients
        const newIngredient = {
          product: product,
          quantity: quantity
        };
        this.selectedIngredients = [...this.selectedIngredients, newIngredient];
        console.log("[DEBUG] Added ingredient, new count:", this.selectedIngredients.length);
      } else {
        console.log("[DEBUG] Ingredient already exists, skipping");
      }
    } else {
      // Remove from selected ingredients
      const index = this.selectedIngredients.findIndex(ing => ing.product?._id === product._id);
      if (index > -1) {
        this.selectedIngredients = this.selectedIngredients.filter(ing => ing.product?._id !== product._id);
        console.log("[DEBUG] Removed ingredient, new count:", this.selectedIngredients.length);
      }
    }
    this.calculateIngredientMacros();
    this.syncRecipeDraftIngredients();
    console.log("[DEBUG] selectedIngredients names:", this.selectedIngredients.map(i => i.product?.name));
  }
  // Calculate macros for selected ingredients
  calculateIngredientMacros() {
    const nextMacros = {
      kcal: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    };
    for (const ing of this.selectedIngredients) {
      const qty = ing.quantity || 0;
      const factor = qty / 100;
      // Pull up macros from product if not present
      const product = ing.product || {};
      const kcal = ing.energyKcal100g ?? product.energyKcal100g ?? 0;
      const protein = ing.protein100g ?? product.protein100g ?? 0;
      const carbs = ing.carbohydrates100g ?? product.carbohydrates100g ?? 0;
      const fat = ing.fat100g ?? product.fat100g ?? 0;
      nextMacros.kcal += kcal * factor;
      nextMacros.protein += protein * factor;
      nextMacros.carbs += carbs * factor;
      nextMacros.fat += fat * factor;
    }
    this.ingredientMacros = nextMacros;
  }
  syncRecipeDraftIngredients() {
    if (!this.recipeDraftService.isActive()) return;
    this.recipeDraftService.setIngredients(this.selectedIngredients);
  }
  applyNewIngredientToSelection(newIngredient) {
    if (this.recipeDraftService.isActive()) {
      this.selectedIngredients = this.recipeDraftService.ingredients();
    }
    const clonedIngredient = this.cloneIngredient(newIngredient);
    const newProductId = this.getIngredientProductId(clonedIngredient);
    const existingIndex = newProductId ? this.selectedIngredients.findIndex(ingredient => this.getIngredientProductId(ingredient) === newProductId) : -1;
    if (existingIndex >= 0) {
      const nextIngredients = [...this.selectedIngredients];
      nextIngredients[existingIndex] = clonedIngredient;
      this.selectedIngredients = nextIngredients;
    } else {
      this.selectedIngredients = [...this.selectedIngredients, clonedIngredient];
    }
    this.calculateIngredientMacros();
    this.syncRecipeDraftIngredients();
    this.navigationService.setTempData("selectedIngredients", this.cloneSelectedIngredients());
    if (this.currentMode === "products") {
      this.setSelectedIngredientsFirst();
    }
  }
  getIngredientProductId(ingredient) {
    const product = ingredient?.product;
    return this.getProductId(product);
  }
  getCustomProductProductId(customProduct) {
    return this.getProductId(customProduct?.product);
  }
  getProductId(product) {
    if (!product) return null;
    if (typeof product === "string") return product;
    return product?._id?.toString?.() || product?.toString?.() || null;
  }
  cloneIngredient(ingredient) {
    return {
      ...ingredient,
      allergens: ingredient?.allergens ? [...ingredient.allergens] : undefined,
      traces: ingredient?.traces ? [...ingredient.traces] : undefined,
      product: typeof ingredient?.product === "object" && ingredient.product ? {
        ...ingredient.product
      } : ingredient?.product
    };
  }
  cloneRecentCustomProduct(customProduct, keepBaseCustomProductId) {
    if (!customProduct) return customProduct;
    const cloned = {
      ...customProduct
    };
    delete cloned._id;
    delete cloned.customRecipeId;
    delete cloned.mealId;
    delete cloned.lastUsedAt;
    if (!keepBaseCustomProductId) {
      delete cloned.baseCustomProductId;
    }
    return cloned;
  }
  cloneSelectedIngredients() {
    return this.selectedIngredients.map(ingredient => this.cloneIngredient(ingredient));
  }
  // Check if a product is already selected as ingredient
  isIngredientSelected(product) {
    if (!this.ingredientMode) {
      return false;
    }
    const isSelected = this.selectedIngredients.some(ing => ing.product?._id === product._id);
    // Uncomment for debugging
    // console.log('[DEBUG] isIngredientSelected for', product.name, ':', isSelected);
    return isSelected;
  }
  getRecentCustomProduct(product) {
    const productId = this.getProductId(product);
    if (!productId) {
      return null;
    }
    return this.recentCustomProducts.find(customProduct => this.getCustomProductProductId(customProduct) === productId) || null;
  }
  isRecentProduct(product) {
    return !!this.getRecentCustomProduct(product);
  }
  getRecentCustomRecipe(recipe) {
    const recipeId = recipe?._id;
    if (!recipeId) {
      return null;
    }
    return this.recentCustomRecipes.find(customRecipe => {
      const recipeRef = typeof customRecipe?.recipe === "object" ? customRecipe.recipe : null;
      return recipeRef?._id === recipeId;
    }) || null;
  }
  isRecentRecipe(recipe) {
    return !!this.getRecentCustomRecipe(recipe);
  }
  // Create a virtual meal for ingredient mode to show quantities in product cards
  getVirtualMealForIngredients() {
    if (!this.ingredientMode || this.selectedIngredients.length === 0) {
      return null;
    }
    return {
      customProducts: this.selectedIngredients
    };
  }
  deselectedAll() {
    const popover = {
      component: src_app_shared_components_popover_actions_popover_actions_component__WEBPACK_IMPORTED_MODULE_7__.PopoverActionsComponent,
      componentProps: {
        actionsPopover: [src_app_shared_constants_actions__WEBPACK_IMPORTED_MODULE_8__.ACTIONS[this.ACTION_TYPES.deselect]]
      },
      event: event,
      mode: "ios"
    };
    this.ionicUtilService.showPopover(popover).then(res => {
      this.handleAction(res.data);
    });
  }
  handleAction(actionType) {
    switch (actionType) {
      case src_app_shared_constants_actions__WEBPACK_IMPORTED_MODULE_8__.ACTIONS[this.ACTION_TYPES.deselect]:
        this.handleDeselectAll();
        break;
    }
  }
  handleDeselectAll() {
    if (this.ingredientMode) {
      this.selectedIngredients = [];
      this.ingredientMacros = {
        kcal: 0,
        protein: 0,
        carbs: 0,
        fat: 0
      };
      this.ionicUtilService.showToast({
        message: this.translate.instant('SEARCH_FOODS.INGREDIENTS_DESELECTED'),
        duration: 1500,
        position: "bottom"
      });
      return;
    }
    if (!this.meal || !this.meal._id) {
      console.error("No meal selected");
      return;
    }
    const isRecipeMode = this.currentMode === "recipes";
    const itemTypeKey = isRecipeMode ? 'SEARCH_FOODS.ITEM_TYPE_RECIPES' : 'SEARCH_FOODS.ITEM_TYPE_PRODUCTS';
    const itemTypePluralKey = isRecipeMode ? 'SEARCH_FOODS.ITEM_TYPE_RECIPES_CAP' : 'SEARCH_FOODS.ITEM_TYPE_PRODUCTS_CAP';
    const t = this.translate.instant.bind(this.translate);
    const itemType = t(itemTypeKey);
    const itemTypePlural = t(itemTypePluralKey);
    const alertOptions = {
      header: t('SEARCH_FOODS.DELETE_ITEMS_HEADER', {
        itemType
      }),
      message: t('SEARCH_FOODS.DELETE_ITEMS_CONFIRM', {
        itemType,
        mealName: this.meal.name
      }),
      buttons: [{
        text: t('COMMON.CANCEL').toUpperCase(),
        role: "cancel"
      }, {
        text: t('COMMON.DELETE').toUpperCase(),
        cssClass: "danger",
        handler: () => {
          const observable = isRecipeMode ? this.mealService.deleteMealRecipes(this.meal._id) : this.mealService.deleteMealCustomProducts(this.meal._id);
          observable.subscribe({
            next: updatedMeal => {
              this.meal = updatedMeal;
              if (this.dietDay) {
                const mealIndex = this.dietDay.meals.findIndex(m => m._id === this.meal._id);
                if (mealIndex !== -1) {
                  this.dietDay.meals[mealIndex] = updatedMeal;
                }
                this.dietDayService.setCurrentDietDay = this.dietDay;
              }
              this.utilService.setUnselected = true;
              this.ionicUtilService.showToast({
                message: t('SEARCH_FOODS.ITEMS_DELETED', {
                  itemType: itemTypePlural,
                  mealName: this.meal.name
                }),
                duration: 1000
              });
            },
            error: err => {
              console.error(`Error deleting:`, err);
              this.ionicUtilService.showToast({
                message: t('SEARCH_FOODS.ITEMS_DELETE_ERROR', {
                  itemType
                }),
                duration: 2000,
                color: "danger"
              });
            }
          });
        }
      }]
    };
    this.ionicUtilService.showAlert(alertOptions);
  }
  initVariables() {
    this.searchFilterGroup = new src_app_shared_models_filterGroup__WEBPACK_IMPORTED_MODULE_6__.SearchFilterGroup();
    this.searchFilterGroup.userId = this.user?._id || this.userService.getLocalUser?._id;
    // Si proviene de perfil
    this.searchFilterGroup.ownFilter = !!!this.meal;
    this.products = [];
    if (this.meal) {
      this.dietDayService.getCurrentDietDay.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_28__.take)(1)).subscribe(res => {
        this.dietDay = res;
        this.meal = res.meals.find(mealTemp => mealTemp.name === this.meal.name);
      });
    }
  }
  syncMealAndDietDayFromService() {
    const currentDietDay = this.dietDayService.currentDietDay;
    if (!currentDietDay || !this.meal) {
      return;
    }
    this.dietDay = currentDietDay;
    const updatedMeal = this.findMealInDietDay(currentDietDay, this.meal);
    if (updatedMeal) {
      this.meal = {
        ...updatedMeal
      };
    }
  }
  findMealIndexInDietDay(dietDay, referenceMeal) {
    if (!dietDay?.meals?.length || !referenceMeal) {
      return -1;
    }
    if (referenceMeal._id) {
      const indexById = dietDay.meals.findIndex(meal => meal?._id === referenceMeal._id);
      if (indexById !== -1) {
        return indexById;
      }
    }
    if (referenceMeal.name) {
      return dietDay.meals.findIndex(meal => meal?.name === referenceMeal.name);
    }
    return -1;
  }
  findMealInDietDay(dietDay, referenceMeal) {
    const mealIndex = this.findMealIndexInDietDay(dietDay, referenceMeal);
    if (mealIndex === -1 || !dietDay) {
      return undefined;
    }
    return dietDay.meals[mealIndex];
  }
  markFoodSearchStarted() {
    this.hasStartedFoodSearch = true;
    this.recentProductsSub?.unsubscribe();
    this.recentRecipesSub?.unsubscribe();
  }
  loadRecentProductsForMeal(force = false) {
    if (this.hasStartedFoodSearch && !force || this.currentMode !== "products") {
      return;
    }
    const dietId = this.user?.dietInUse || this.userService.getLocalUser?.dietInUse;
    const mealIndex = this.findMealIndexInDietDay(this.dietDay, this.meal);
    if (!dietId || mealIndex === -1) {
      this.recentCustomProducts = [];
      this.products = [];
      this.load = true;
      if (this.ingredientMode) {
        this.setSelectedIngredientsFirst();
      }
      return;
    }
    this.load = false;
    this.recentProductsSub?.unsubscribe();
    this.recentProductsSub = this.dietService.getRecentMealProducts(dietId, mealIndex, {
      limit: this.recentProductsLimit
    }).subscribe({
      next: customProducts => {
        if (this.hasStartedFoodSearch && !force) {
          return;
        }
        this.recentCustomProducts = customProducts || [];
        this.products = this.getProductsFromCustomProducts(this.recentCustomProducts);
        if (this.ingredientMode) {
          this.setSelectedIngredientsFirst();
        } else if (this.meal) {
          this.setCustomProductsFirst();
        }
        this.load = true;
      },
      error: () => {
        if (this.hasStartedFoodSearch && !force) {
          return;
        }
        this.recentCustomProducts = [];
        this.products = [];
        this.load = true;
        if (this.ingredientMode) {
          this.setSelectedIngredientsFirst();
        }
      }
    });
  }
  loadRecentRecipesForMeal(force = false) {
    if (this.hasStartedFoodSearch && !force || this.currentMode !== "recipes") {
      return;
    }
    const dietId = this.user?.dietInUse || this.userService.getLocalUser?.dietInUse;
    const mealIndex = this.findMealIndexInDietDay(this.dietDay, this.meal);
    if (!dietId || mealIndex === -1) {
      this.recentCustomRecipes = [];
      this.recipes = [];
      this.load = true;
      return;
    }
    this.load = false;
    this.recentRecipesSub?.unsubscribe();
    this.recentRecipesSub = this.dietService.getRecentMealRecipes(dietId, mealIndex, {
      limit: this.recentRecipesLimit
    }).subscribe({
      next: customRecipes => {
        if (this.hasStartedFoodSearch && !force) {
          return;
        }
        this.recentCustomRecipes = customRecipes || [];
        this.recipes = this.getRecipesFromCustomRecipes(this.recentCustomRecipes);
        if (this.meal) {
          this.setCustomRecipesFirst();
        }
        this.load = true;
      },
      error: () => {
        if (this.hasStartedFoodSearch && !force) {
          return;
        }
        this.recentCustomRecipes = [];
        this.recipes = [];
        this.load = true;
      }
    });
  }
  getRecipesFromCustomRecipes(customRecipes) {
    const recipes = [];
    const recipeIds = new Set();
    for (const customRecipe of customRecipes || []) {
      const recipe = typeof customRecipe?.recipe === "object" ? customRecipe.recipe : null;
      const recipeId = recipe?._id?.toString();
      if (!recipe || !recipeId || recipeIds.has(recipeId)) {
        continue;
      }
      recipeIds.add(recipeId);
      recipes.push(recipe);
    }
    return recipes;
  }
  getProductsFromCustomProducts(customProducts) {
    const products = [];
    const productIds = new Set();
    for (const customProduct of customProducts || []) {
      const product = typeof customProduct?.product === "object" ? customProduct.product : null;
      const productId = this.getProductId(product);
      if (!product || !productId || productIds.has(productId)) {
        continue;
      }
      productIds.add(productId);
      products.push(product);
    }
    return products;
  }
  searchProducts() {
    if (this.shouldSkipProductsSearch()) {
      this.load = true;
      this.products = [];
      return;
    }
    const search = (this.searchFilterGroup?.search || "").trim();
    // When search is empty, load recent products and put meal ones first
    if (search.length <= 1 && !this.hasActiveFilters()) {
      this.loadRecentProductsForMeal(true);
      return;
    }
    const page = this.searchFilterGroup.page || 0;
    if (page === 0) {
      this.productsRequestVersion++;
    }
    const requestVersion = this.productsRequestVersion;
    this.searchProductsSub?.unsubscribe();
    console.log("[DEBUG - API] searchProducts() called, page:", this.searchFilterGroup.page, new Error().stack);
    this.load = false;
    this.searchProductsSub = this.mealService.searchAllWithFilters(this.searchFilterGroup).subscribe(resFoods => {
      if (requestVersion !== this.productsRequestVersion) {
        return;
      }
      this.products = this.mergeProducts(this.products, resFoods);
      // Priority: ingredient mode takes precedence over meal mode
      if (this.ingredientMode) {
        this.setSelectedIngredientsFirst();
      } else if (this.meal) {
        this.setCustomProductsFirst();
      }
      this.load = true;
    });
  }
  mergeProducts(current, incoming) {
    if (!Array.isArray(incoming) || incoming.length === 0) {
      return [...(current || [])];
    }
    const merged = [...(current || [])];
    const existingIds = new Set(merged.map(product => product?._id).filter(id => typeof id === "string" && id.length > 0));
    for (const product of incoming) {
      const id = product?._id;
      if (typeof id === "string" && id.length > 0) {
        if (existingIds.has(id)) {
          continue;
        }
        existingIds.add(id);
      }
      merged.push(product);
    }
    return merged;
  }
  hasActiveFilters() {
    return !!this.searchFilterGroup?.ownFilter || !!this.searchFilterGroup?.favFilter || !!this.searchFilterGroup?.shieldFilter || !!this.searchFilterGroup?.defaultOnly;
  }
  shouldSkipProductsSearch() {
    if (this.hasActiveFilters()) {
      return false;
    }
    const search = (this.searchFilterGroup?.search || "").trim();
    if (search.length > 1) {
      return false;
    }
    // Empty search: only skip if there are NO products in meal / selected ingredients
    if (this.ingredientMode) {
      return !(this.selectedIngredients?.length > 0);
    }
    return !(this.meal?.customProducts?.length > 0);
  }
  isSearchTooShortForProducts() {
    return this.shouldSkipProductsSearch();
  }
  // No depende de nada específico de productos (solo del término de búsqueda
  // compartido), así que también cubre el estado vacío de recetas.
  shouldShowProductsEmptyState() {
    return this.hasStartedFoodSearch && !this.isSearchTooShortForProducts();
  }
  // Fix (trainer, ronda 2) — este botón del empty-state (0 resultados de
  // búsqueda) es el punto de entrada MÁS pisado a "crear producto/receta"
  // en la práctica, mucho más que el action sheet del FAB. Llamaba
  // directo a createProduct()/createRecipe() (navegación por rutas del
  // cliente), saltándose trainerContext por completo — en modo trainer
  // eso navega la app entera fuera del modal en vez de abrir
  // CreateProductPage/RecipeBuilderModalComponent. Mismo criterio que
  // openCreateActionSheet.
  createProductFromEmptyState() {
    if (this.trainerContext) {
      this.trainerContext.pickCreateProduct();
      return;
    }
    this.createProduct();
  }
  createRecipeFromEmptyState() {
    if (this.trainerContext) {
      if (this.trainerContext.pickCreateRecipe) {
        this.trainerContext.pickCreateRecipe();
      } else {
        this.trainerContext.pickCreateProduct();
      }
      return;
    }
    void this.createRecipe();
  }
  /**
   * 🔧 Poner recetas de la meal primero (igual que setCustomProductsFirst)
   * Extrae recetas de meal.customRecipes, las filtra y las pone al inicio
   */
  setCustomRecipesFirst() {
    if (!this.meal?.customRecipes) {
      return;
    }
    // Obtención de recipes de customRecipes provenientes de meal
    const recipesOnMeal = this.meal.customRecipes.map(customRecipe => {
      return typeof customRecipe.recipe === "object" ? customRecipe.recipe : null;
    }).filter(recipeTemp => {
      if (recipeTemp) {
        const idRecipe = recipeTemp._id;
        const verified = !!recipeTemp?.verified;
        const fav = this.user?.archivedRecipes?.includes(idRecipe);
        // Aplicar filtros activos
        if (this.searchFilterGroup.shieldFilter && !verified) return false;
        if (this.searchFilterGroup.favFilter && !fav) return false;
        if (this.searchFilterGroup.ownFilter && verified) return false; // Own = no verified
        return true;
      }
      return false;
    })
    // Filtro local para los customRecipes
    .filter(recipeTemp => {
      if (!this.searchFilterGroup.search) return true;
      const nombreRecipe = recipeTemp.name.toLowerCase();
      const terminoBusqueda = this.searchFilterGroup.search.toLowerCase();
      return nombreRecipe.includes(terminoBusqueda);
    });
    console.log("[setCustomRecipesFirst] Recipes on meal after filters:", recipesOnMeal.length, recipesOnMeal.map(r => r.name));
    // Sacamos estas recipes de la lista general de recipes (evitar duplicados)
    this.recipes = this.recipes.filter(recipeTemp => !recipesOnMeal.find(recipeOnMealTemp => recipeTemp._id === recipeOnMealTemp._id));
    // Poner las recipes de la meal al inicio
    this.recipes = [...recipesOnMeal, ...this.recipes];
    console.log("[setCustomRecipesFirst] ✅ Final recipes count:", this.recipes.length, "First 3:", this.recipes.slice(0, 3).map(r => r.name));
  }
  searchRecipes() {
    const search = (this.searchFilterGroup?.search || "").trim();
    // When search is empty, load recent recipes and put meal ones first
    if (search.length <= 1 && !this.hasActiveFilters()) {
      this.loadRecentRecipesForMeal(true);
      return;
    }
    const page = this.searchFilterGroup.page || 0;
    if (page === 0) {
      this.recipesRequestVersion++;
    }
    const requestVersion = this.recipesRequestVersion;
    this.searchRecipesSub?.unsubscribe();
    console.log("[DEBUG - API] searchRecipes() called, page:", this.searchFilterGroup.page, new Error().stack);
    this.load = false;
    const requestPage = this.searchFilterGroup.page || 0;
    const request$ = this.recipeApiService.searchRecipes(search, requestPage, 10, {
      own: !!this.searchFilterGroup.ownFilter,
      fav: !!this.searchFilterGroup.favFilter,
      verified: !!this.searchFilterGroup.shieldFilter
    });
    this.searchRecipesSub = request$.subscribe({
      next: recipes => {
        if (requestVersion !== this.recipesRequestVersion) {
          return;
        }
        let filtered = recipes;
        // 🔧 FILTRAR DUPLICADOS: Evitar recetas que ya están en la lista
        const existingIds = new Set(this.recipes.map(r => r._id));
        filtered = filtered.filter(r => !existingIds.has(r._id));
        console.log("[DEBUG - searchRecipes] Recipes from API:", recipes.length, "After filters:", filtered.length, "Existing:", this.recipes.length);
        this.recipes = this.recipes.concat(filtered);
        // 🔧 Poner recetas de la meal primero (igual que setCustomProductsFirst)
        if (this.meal) {
          this.setCustomRecipesFirst();
        }
        console.log("[DEBUG - searchRecipes] Total recipes now:", this.recipes.length);
        this.load = true;
      },
      error: () => {
        if (requestVersion !== this.recipesRequestVersion) {
          return;
        }
        this.load = true;
      }
    });
  }
  // Recipe event handlers — inalcanzable en modo entrenador: recipe-card
  // intercepta el click/checkbox y emite (trainerToggle) en vez de
  // (toggle)/(quickAdd) cuando trainerMultiSelect está activo (ver
  // onTrainerRecipeToggle más abajo).
  onRecipeToggle(recipe) {
    const existingInstance = this.findCustomRecipeForRecipe(recipe);
    if (existingInstance) {
      // If already in meal, edit it
      this.editRecipeFromMeal(recipe, existingInstance);
    } else {
      // If not in meal, add it with recent data if available
      const recentCustomRecipe = this.getRecentCustomRecipe(recipe);
      this.addRecipeToMeal(recipe, recentCustomRecipe);
    }
  }
  onRecipeQuickAdd(recipe) {
    if (this.isRecipeLoading(recipe)) return;
    const existingInstance = this.findCustomRecipeForRecipe(recipe);
    if (existingInstance) {
      this.removeRecipeFromMeal(existingInstance);
      return;
    }
    const recentCustomRecipe = this.getRecentCustomRecipe(recipe);
    this.quickAddRecipeToMeal(recipe, recentCustomRecipe);
  }
  onRecipeRemove(recipe) {
    const existingInstance = this.findCustomRecipeForRecipe(recipe);
    if (existingInstance) {
      this.removeRecipeFromMeal(existingInstance);
    }
  }
  quickAddRecipeToMeal(recipe, recentCustomRecipe) {
    if (!this.meal || !recipe?._id) {
      return;
    }
    this.setRecipeLoading(recipe, true);
    this.utilService.setLoading = true;
    let quantity = 100;
    let quantityCooked = null;
    let addedCustomProducts = [];
    let modifiedBaseCustomProducts = [];
    let removedBaseCustomProductIds = [];
    if (recentCustomRecipe) {
      quantity = recentCustomRecipe.quantity ?? 100;
      quantityCooked = recentCustomRecipe.quantityCooked ?? null;
      addedCustomProducts = (recentCustomRecipe.addedCustomProducts || []).map(cp => this.cloneRecentCustomProduct(cp));
      modifiedBaseCustomProducts = (recentCustomRecipe.modifiedBaseCustomProducts || []).map(cp => this.cloneRecentCustomProduct(cp, true));
      removedBaseCustomProductIds = recentCustomRecipe.removedBaseCustomProductIds || [];
    }
    const composePayload = {
      recipeId: recipe._id,
      customRecipe: {
        quantity,
        quantityCooked,
        modifiedBaseCustomProducts,
        removedBaseCustomProductIds,
        addedCustomProducts
      },
      context: this.buildRecipeComposeContext()
    };
    this.recipeApiService.compose(composePayload).subscribe({
      next: result => {
        if (result?.dietDay) {
          this.dietDay = result.dietDay;
          this.dietDayService.setCurrentDietDay = result.dietDay;
          this.syncMealAndDietDayFromService();
        } else if (result?.meal) {
          const previousMeal = this.meal;
          this.meal = result.meal;
          if (this.dietDay) {
            const mealIndex = this.findMealIndexInDietDay(this.dietDay, previousMeal);
            if (mealIndex !== -1) {
              this.dietDay.meals[mealIndex] = result.meal;
              this.dietDayService.setCurrentDietDay = {
                ...this.dietDay
              };
            }
          }
        } else {
          this.syncMealAndDietDayFromService();
        }
        this.ionicUtilService.showToast({
          message: this.translate.instant('SEARCH_FOODS.RECIPE_ADDED'),
          duration: 1500,
          color: "success"
        });
      },
      error: error => {
        this.setRecipeLoading(recipe, false);
        this.utilService.setLoading = false;
        console.error("[quickAddRecipeToMeal] Error:", error);
        this.ionicUtilService.showToast({
          message: this.translate.instant('SEARCH_FOODS.RECIPE_ADD_ERROR'),
          duration: 2000,
          color: "danger"
        });
      },
      complete: () => {
        this.setRecipeLoading(recipe, false);
        this.utilService.setLoading = false;
      }
    });
  }
  isRecipeLoading(recipe) {
    return !!recipe?._id && this.loadingRecipeIds.has(recipe._id);
  }
  setRecipeLoading(recipe, loading) {
    if (!recipe?._id) return;
    const nextLoadingRecipeIds = new Set(this.loadingRecipeIds);
    if (loading) {
      nextLoadingRecipeIds.add(recipe._id);
    } else {
      nextLoadingRecipeIds.delete(recipe._id);
    }
    this.loadingRecipeIds = nextLoadingRecipeIds;
  }
  removeRecipeFromMeal(instance) {
    if (!this.meal?._id || !instance._id) return;
    const t = this.translate.instant.bind(this.translate);
    this.ionicUtilService.showAlert({
      header: t('SEARCH_FOODS.DELETE_RECIPE_CONFIRM_HEADER'),
      message: t('SEARCH_FOODS.DELETE_RECIPE_CONFIRM_MESSAGE'),
      buttons: [{
        text: t('COMMON.CANCEL'),
        role: "cancel"
      }, {
        text: t('COMMON.DELETE'),
        role: "confirm",
        handler: () => {
          this.mealService.deleteMealCustomRecipe(this.meal._id, instance._id).subscribe({
            next: updatedMeal => {
              this.meal = updatedMeal;
              if (this.dietDay) {
                const mealIndex = this.dietDay.meals.findIndex(m => m._id === this.meal._id);
                if (mealIndex !== -1) {
                  this.dietDay.meals[mealIndex] = updatedMeal;
                  this.dietDayService.setCurrentDietDay = this.dietDay;
                }
              }
              this.ionicUtilService.showToast({
                message: t('SEARCH_FOODS.RECIPE_DELETED_FROM_MEAL'),
                duration: 2000,
                color: "success"
              });
            },
            error: err => {
              console.error("Error deleting recipe instance:", err);
              this.ionicUtilService.showToast({
                message: t('SEARCH_FOODS.RECIPE_DELETE_ERROR'),
                duration: 2000,
                color: "danger"
              });
            }
          });
        }
      }]
    });
  }
  addRecipeToMeal(recipe, recentCustomRecipe) {
    // Save current search state to restore when returning
    this.navigationService.setTempData("searchFoodsState", {
      searchFilterGroup: {
        ...this.searchFilterGroup
      },
      currentMode: this.currentMode,
      searchTerm: this.searchFilterGroup.search,
      returnUrl: this.returnUrl,
      meal: this.meal,
      dietDay: this.dietDay,
      ingredientMode: this.ingredientMode,
      hasStartedFoodSearch: this.hasStartedFoodSearch
    });
    const navState = {
      mode: "add",
      recipe: recipe,
      meal: this.meal,
      dietDay: this.dietDay,
      returnUrl: "/search-foods",
      selectedDate: window.history.state?.selectedDate || this.dietDay?.date
    };
    // Pass recent custom recipe data so config-recipe pre-fills quantity and modifications
    if (recentCustomRecipe) {
      navState.customRecipe = recentCustomRecipe;
    }
    // Navigate to add recipe flow
    this.navigationService.goToConfigRecipe({
      state: navState
    });
  }
  buildRecipeComposeContext() {
    if (!this.meal) return null;
    if (this.dietDay?._id && this.meal?._id) {
      return {
        mealId: this.meal._id
      };
    }
    if (this.dietDay) {
      const indexMeal = this.findMealIndexInDietDay(this.dietDay, this.meal);
      if (indexMeal !== -1) {
        return {
          dietInUseId: this.user?.dietInUse || this.userService.getLocalUser?.dietInUse,
          indexMeal,
          currentDate: this.dietDay.date
        };
      }
    }
    return null;
  }
  toPositiveNumber(value) {
    if (value === null || value === undefined || value === "") {
      return null;
    }
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return null;
    }
    return parsed;
  }
  onRecipeEdit(recipe) {
    const existingInstance = this.findCustomRecipeForRecipe(recipe);
    if (existingInstance) {
      this.editRecipeFromMeal(recipe, existingInstance);
    }
  }
  editRecipeFromMeal(recipe, customRecipe) {
    // Save current search state to restore when returning
    this.navigationService.setTempData("searchFoodsState", {
      searchFilterGroup: {
        ...this.searchFilterGroup
      },
      currentMode: this.currentMode,
      searchTerm: this.searchFilterGroup.search,
      returnUrl: this.returnUrl,
      meal: this.meal,
      dietDay: this.dietDay,
      ingredientMode: this.ingredientMode,
      hasStartedFoodSearch: this.hasStartedFoodSearch
    });
    this.navigationService.goToConfigRecipe({
      state: {
        mode: "edit",
        recipe: recipe,
        customRecipe: customRecipe,
        meal: this.meal,
        dietDay: this.dietDay,
        returnUrl: "/search-foods",
        selectedDate: window.history.state?.selectedDate || this.dietDay?.date
      }
    });
  }
  findCustomRecipeForRecipe(recipe) {
    return this.meal?.customRecipes?.find(customRecipe => {
      const recipeRef = typeof customRecipe.recipe === "object" ? customRecipe.recipe : null;
      return recipeRef?._id === recipe._id;
    }) || null;
  }
  onRecipeFavoriteToggle(recipe) {
    const t = this.translate.instant.bind(this.translate);
    this.recipeApiService.toggleArchived(recipe._id).subscribe({
      next: res => {
        if (res.isArchived) {
          if (!this.user.archivedRecipes) this.user.archivedRecipes = [];
          this.user.archivedRecipes.push(recipe._id);
        } else {
          const idx = this.user.archivedRecipes?.indexOf(recipe._id);
          if (idx > -1) this.user.archivedRecipes.splice(idx, 1);
        }
        this.userService.setLocalUser = this.user;
        this.ionicUtilService.showToast({
          message: res.isArchived ? t('SEARCH_FOODS.RECIPE_ADDED_FAV') : t('SEARCH_FOODS.RECIPE_REMOVED_FAV'),
          duration: 1500
        });
      },
      error: () => {
        this.ionicUtilService.showToast({
          message: t('SEARCH_FOODS.FAV_UPDATE_ERROR'),
          duration: 1500
        });
      }
    });
  }
  setCustomProductsFirst() {
    // Show products already in meal at the top, excluding them from API results
    const searchTerm = this.searchFilterGroup.search?.toLowerCase() || "";
    const hasActiveSearch = searchTerm.length > 0;
    // TAREA5 — trainerContext "sin comida real" (constructor de plantillas,
    // composer multi-cliente) pasa meal:{} — sin este guard, .customProducts
    // era undefined y rompía TODA búsqueda en modo entrenador cuando la
    // API devolvía 0 resultados (this.load nunca llegaba a true).
    const productsOnMeal = (this.meal.customProducts || []).map(customProductTemp => customProductTemp.product).filter(productTemp => {
      if (!productTemp) return false;
      if (this.searchFilterGroup.ownFilter) {
        return productTemp.userId === this.user?._id;
      }
      // Apply active filters regardless of search
      const idProduct = productTemp._id;
      const verified = !!productTemp?.verified;
      const fav = this.user.archivedProducts?.includes(idProduct) || false;
      if (this.searchFilterGroup.favFilter && !fav) return false;
      if (this.searchFilterGroup.shieldFilter && !verified) return false;
      // When there's NO active search, show ALL products that pass filters
      if (!hasActiveSearch) {
        return true;
      }
      // When searching, filter by search term
      const matchesSearch = productTemp.name.toLowerCase().includes(searchTerm);
      return matchesSearch;
    });
    // Always remove products in meal from API results to avoid duplicates (use Set for O(1) lookup)
    const productsOnMealIds = new Set((this.meal.customProducts || []).map(customProductTemp => customProductTemp.product?._id).filter(id => !!id));
    this.products = this.products.filter(productTemp => !productsOnMealIds.has(productTemp._id));
    this.products = [...productsOnMeal, ...this.products];
  }
  setSelectedIngredientsFirst() {
    // Show selected ingredients at the top, excluding them from API results
    const searchTerm = this.searchFilterGroup.search?.toLowerCase() || "";
    const hasActiveSearch = searchTerm.length > 0;
    const selectedProducts = this.selectedIngredients.map(customProductTemp => customProductTemp.product).filter(productTemp => {
      if (!productTemp) return false;
      if (this.searchFilterGroup.ownFilter) {
        return productTemp.userId === this.user?._id;
      }
      // Apply active filters regardless of search
      const idProduct = productTemp._id;
      const verified = !!productTemp?.verified;
      const fav = this.user.archivedProducts?.includes(idProduct) || false;
      if (this.searchFilterGroup.favFilter && !fav) return false;
      if (this.searchFilterGroup.shieldFilter && !verified) return false;
      // When there's NO active search, show ALL selected ingredients that pass filters
      if (!hasActiveSearch) {
        return true;
      }
      // When searching, filter selected ingredients by search term
      const matchesSearch = productTemp.name.toLowerCase().includes(searchTerm);
      return matchesSearch;
    });
    // Always remove selected products from API results to avoid duplicates (use Set for O(1) lookup)
    const selectedProductIds = new Set(this.selectedIngredients.map(customProductTemp => customProductTemp.product?._id).filter(id => !!id));
    this.products = this.products.filter(productTemp => !selectedProductIds.has(productTemp._id));
    // Put selected products first
    this.products = [...selectedProducts, ...this.products];
  }
  createProduct(scannedCode) {
    const queryParams = {
      user: JSON.stringify(this.user),
      codeBar: scannedCode || undefined,
      returnUrl: "/search-foods"
    };
    const baseState = {
      user: this.user,
      codeBar: scannedCode,
      returnUrl: "/search-foods"
    };
    if (this.ingredientMode) {
      // ✅ MODO INGREDIENTE: No pasar meal/dietDay, SÍ pasar ingredientMode
      console.log("[DEBUG] createProduct → create-product (ingredientMode)");
      baseState.ingredientMode = true;
    } else {
      // MODO NORMAL: Incluir meal y dietDay
      console.log("[DEBUG] createProduct → create-product (normal mode)");
      queryParams.meal = this.meal ? JSON.stringify(this.meal) : undefined;
      queryParams.dietDay = this.meal ? JSON.stringify(this.dietDay) : undefined;
      baseState.meal = this.meal;
      baseState.dietDay = this.dietDay;
      baseState.selectedDate = window.history.state?.selectedDate || this.dietDay?.date;
    }
    // Limpiar undefined para evitar '?meal=undefined'
    Object.keys(queryParams).forEach(k => queryParams[k] === undefined && delete queryParams[k]);
    this.navigationService.goToCreateProduct({
      queryParams,
      state: baseState
    });
  }
  createRecipe() {
    var _this7 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (yield _this7.billingService.isFreshLimitReached("recipes")) {
        yield _this7.ionicUtilService.showPremiumLimitAlert({
          message: _this7.translate.instant('SEARCH_FOODS.PREMIUM_LIMIT_RECIPES'),
          onUpgrade: () => _this7.navigationService.goToPremium()
        });
        return;
      }
      // Save current search state to restore when returning
      _this7.navigationService.setTempData("searchFoodsState", {
        searchFilterGroup: {
          ..._this7.searchFilterGroup
        },
        currentMode: _this7.currentMode,
        searchTerm: _this7.searchFilterGroup.search,
        returnUrl: _this7.returnUrl,
        meal: _this7.meal,
        dietDay: _this7.dietDay,
        ingredientMode: _this7.ingredientMode,
        hasStartedFoodSearch: _this7.hasStartedFoodSearch
      });
      _this7.navigationService.goToConfigRecipe({
        state: {
          mode: "create",
          meal: _this7.meal,
          dietDay: _this7.dietDay,
          returnUrl: "/search-foods",
          selectedDate: window.history.state?.selectedDate || _this7.dietDay?.date
        }
      });
    })();
  }
  initInputsFromRoute() {
    const state = window.history.state || {};
    if (!this.user && (state.user || state.userId)) {
      try {
        this.user = state.user ?? {
          _id: state.userId
        };
      } catch (_) {}
    }
    if (!this.meal && (state.meal || state.mealName)) {
      try {
        this.meal = state.meal ?? {
          name: state.mealName
        };
      } catch (_) {}
    }
    if (state.returnUrl) this.returnUrl = state.returnUrl;
    // Ingredient mode for recipe creation
    if (state.ingredientMode) {
      this.ingredientMode = true;
      this.selectedIngredients = state.existingIngredients || [];
    }
    this.activatedRoute.queryParams.subscribe(params => {
      if (!this.user) {
        if (params["user"]) {
          try {
            this.user = JSON.parse(params["user"]);
          } catch (_) {}
        } else if (params["userId"]) {
          this.user = {
            _id: params["userId"]
          };
        }
      }
      if (!this.meal) {
        if (params["meal"]) {
          try {
            this.meal = JSON.parse(params["meal"]);
          } catch (_) {}
        } else if (params["mealName"]) {
          this.meal = {
            name: params["mealName"]
          };
        }
      }
      // No procesar codeBar desde query/state en esta página
      if (params["returnUrl"]) this.returnUrl = params["returnUrl"];
    });
  }
  close(result) {
    var _this8 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (_this8.trainerContext) {
        void _this8.modalController.dismiss();
        return;
      }
      console.log("SearchFoods: close called", {
        returnUrl: _this8.returnUrl,
        meal: !!_this8.meal,
        mealName: _this8.meal?.name,
        ingredientMode: _this8.ingredientMode,
        selectedIngredientsCount: _this8.selectedIngredients.length
      });
      // In ingredient mode, pass back selected ingredients using temp storage
      if (_this8.ingredientMode && _this8.returnUrl) {
        _this8.syncRecipeDraftIngredients();
        console.log("SearchFoods: storing ingredients in temp storage:", _this8.selectedIngredients.length);
        console.log("SearchFoods: Detailed ingredient list:");
        _this8.selectedIngredients.forEach((ing, idx) => {
          console.log(`  [${idx}] ${ing.product?.name} - ${ing.quantity}g - ID: ${ing.product?._id}`);
        });
        const ingredientsCopy = _this8.cloneSelectedIngredients();
        // Store in temp storage (more reliable than navigation state)
        _this8.navigationService.setTempData("selectedIngredients", ingredientsCopy);
        // Clear ingredient mode state from tempData when returning
        _this8.navigationService.clearTempData("ingredientModeState");
        // Pass back selected date to diets
        const navState = window.history.state;
        _this8.navigationService.backTo(_this8.returnUrl, {
          state: {
            selectedIngredients: ingredientsCopy,
            meal: _this8.meal,
            dietDay: _this8.dietDay,
            selectedDate: navState?.selectedDate || _this8.dietDay?.date
          }
        });
        return;
      }
      // Pass back selected date in results too
      const finalNavState = window.history.state;
      const finalResult = {
        ...result,
        selectedDate: finalNavState?.selectedDate || _this8.dietDay?.date
      };
      // Handle return URL navigation
      if (_this8.returnUrl && _this8.returnUrl !== "/search-foods") {
        console.log("SearchFoods: navigating to returnUrl:", _this8.returnUrl);
        _this8.navigationService.backTo(_this8.returnUrl, {
          state: {
            result: finalResult,
            selectedDate: finalResult.selectedDate
          }
        });
      } else {
        // Default navigation based on context
        if (_this8.meal) {
          console.log("SearchFoods: returning to diets (has meal)");
          _this8.navigationService.backTo(["/tabs/diets"], {
            state: {
              selectedDate: finalResult.selectedDate
            }
          });
        } else {
          console.log("SearchFoods: back with no animation");
          _this8.navigationService.backNoAnim();
        }
      }
    })();
  }
  // === TAREA5 (train-fit-trainers) — selección múltiple ===
  // Cesta de selección: el entrenador marca varios productos/recetas con
  // checkbox (product.component.ts/recipe-card.component.ts, @Output
  // trainerToggle) y los confirma de una sola vez, en vez de un ciclo
  // completo de buscar→elegir→confirmar por cada alimento.
  isProductInTrainerSelection(product) {
    return this.trainerSelection.some(item => item.kind === "product" && item.product?._id === product._id);
  }
  isRecipeInTrainerSelection(recipe) {
    return this.trainerSelection.some(item => item.kind === "recipe" && item.recipe?._id === recipe._id);
  }
  // Fix — cantidad custom actual de la cesta para esta card (product.
  // component.ts/recipe-card.component.ts#trainerSelectedQuantity), para que
  // la card muestre la cantidad/macros elegidas en vez de las de serie.
  getTrainerSelectedQuantity(product) {
    return this.trainerSelection.find(item => item.kind === "product" && item.product?._id === product._id)?.quantity ?? null;
  }
  getTrainerSelectedRecipeQuantity(recipe) {
    return this.trainerSelection.find(item => item.kind === "recipe" && item.recipe?._id === recipe._id)?.quantity ?? null;
  }
  onTrainerProductToggle(event) {
    if (event.checked) {
      if (this.isProductInTrainerSelection(event.product)) return;
      const recent = this.getRecentCustomProduct(event.product);
      const defaultQuantity = recent?.quantity ?? event.product.servingQuantity ?? 100;
      this.trainerSelection = [...this.trainerSelection, {
        kind: "product",
        product: event.product,
        quantity: Math.round(defaultQuantity * 10) / 10
      }];
    } else {
      this.trainerSelection = this.trainerSelection.filter(item => !(item.kind === "product" && item.product?._id === event.product._id));
    }
  }
  onTrainerRecipeToggle(event) {
    if (event.checked) {
      if (this.isRecipeInTrainerSelection(event.recipe)) return;
      const recent = this.getRecentCustomRecipe(event.recipe);
      this.trainerSelection = [...this.trainerSelection, {
        kind: "recipe",
        recipe: event.recipe,
        quantity: recent?.quantity ?? null
      }];
    } else {
      this.trainerSelection = this.trainerSelection.filter(item => !(item.kind === "recipe" && item.recipe?._id === event.recipe._id));
    }
  }
  // Fix — llamado desde fuera (ver registerSelectionApi más arriba) cuando
  // el trainer pulsa "Añadir" DENTRO del panel de detalle externo: marca el
  // producto/receta en la cesta con la cantidad que haya puesto ahí (como si
  // hubiese tocado el checkbox), sin cerrar este buscador. Si ya estaba en
  // la cesta, solo actualiza la cantidad en vez de duplicarlo.
  setTrainerItemSelected(item, quantity) {
    if (item.kind === "product" && item.product) {
      const product = item.product;
      const existing = this.trainerSelection.find(i => i.kind === "product" && i.product?._id === product._id);
      this.trainerSelection = existing ? this.trainerSelection.map(i => i === existing ? {
        ...i,
        quantity
      } : i) : [...this.trainerSelection, {
        kind: "product",
        product,
        quantity
      }];
    } else if (item.kind === "recipe" && item.recipe) {
      const recipe = item.recipe;
      const existing = this.trainerSelection.find(i => i.kind === "recipe" && i.recipe?._id === recipe._id);
      this.trainerSelection = existing ? this.trainerSelection.map(i => i === existing ? {
        ...i,
        quantity
      } : i) : [...this.trainerSelection, {
        kind: "recipe",
        recipe,
        quantity
      }];
    }
  }
  isProductFocused(product) {
    return this.focusedTrainerItem?.kind === "product" && this.focusedTrainerItem.product?._id === product._id;
  }
  isRecipeFocused(recipe) {
    return this.focusedTrainerItem?.kind === "recipe" && this.focusedTrainerItem.recipe?._id === recipe._id;
  }
  onTrainerProductFocus(product) {
    const existing = this.trainerSelection.find(item => item.kind === "product" && item.product?._id === product._id);
    const item = {
      kind: "product",
      product,
      quantity: existing?.quantity ?? product.servingQuantity ?? 100
    };
    this.focusedTrainerItem = item;
    this.trainerContext?.onFocusItem?.(item);
  }
  onTrainerRecipeFocus(recipe) {
    const existing = this.trainerSelection.find(item => item.kind === "recipe" && item.recipe?._id === recipe._id);
    const item = {
      kind: "recipe",
      recipe,
      quantity: existing?.quantity ?? null
    };
    this.focusedTrainerItem = item;
    this.trainerContext?.onFocusItem?.(item);
  }
  isTrainerFavoriteProduct(product) {
    return this.trainerFavoriteProductIds.has(product._id);
  }
  isTrainerFavoriteRecipe(recipe) {
    return this.trainerFavoriteRecipeIds.has(recipe._id);
  }
  onTrainerFavoriteProductToggle(product) {
    const trainerUserId = this.userService.getLocalUser?._id;
    if (!trainerUserId) return;
    const wasFavorite = this.trainerFavoriteProductIds.has(product._id);
    // Optimista: refleja el cambio ya mismo, sin esperar la respuesta — es
    // una preferencia personal de baja fricción, no una escritura crítica.
    if (wasFavorite) {
      this.trainerFavoriteProductIds.delete(product._id);
    } else {
      this.trainerFavoriteProductIds.add(product._id);
    }
    this.productService.addFavoriteProduct(product._id, trainerUserId).subscribe({
      error: () => {
        if (wasFavorite) {
          this.trainerFavoriteProductIds.add(product._id);
        } else {
          this.trainerFavoriteProductIds.delete(product._id);
        }
      }
    });
  }
  onTrainerFavoriteRecipeToggle(recipe) {
    const wasFavorite = this.trainerFavoriteRecipeIds.has(recipe._id);
    if (wasFavorite) {
      this.trainerFavoriteRecipeIds.delete(recipe._id);
    } else {
      this.trainerFavoriteRecipeIds.add(recipe._id);
    }
    this.recipeApiService.toggleArchived(recipe._id).subscribe({
      error: () => {
        if (wasFavorite) {
          this.trainerFavoriteRecipeIds.add(recipe._id);
        } else {
          this.trainerFavoriteRecipeIds.delete(recipe._id);
        }
      }
    });
  }
  removeTrainerSelectionItem(item) {
    this.trainerSelection = this.trainerSelection.filter(i => i !== item);
  }
  trackByTrainerSelection(_index, item) {
    return item.kind === "product" ? `p:${item.product?._id}` : `r:${item.recipe?._id}`;
  }
  confirmTrainerSelection() {
    if (!this.trainerContext || !this.trainerSelection.length) return;
    this.trainerContext.confirmSelection([...this.trainerSelection]);
    this.trainerSelection = [];
    if (this.trainerContext.closeSelf) {
      this.trainerContext.closeSelf();
    } else {
      void this.modalController.dismiss();
    }
  }
  /**
   * Create a new recipe from selected ingredients in ingredient mode
   */
  createRecipeFromIngredients() {
    if (this.selectedIngredients.length < 2) {
      this.ionicUtilService.showToast({
        message: this.translate.instant('SEARCH_FOODS.MIN_INGREDIENTS'),
        duration: 2000,
        color: "warning"
      });
      return;
    }
    console.log("[DEBUG] Creating recipe from ingredients:", this.selectedIngredients.length);
    // Navigate to config-recipe in create mode with selected ingredients
    this.navigationService.goToConfigRecipe({
      state: {
        mode: "create",
        meal: this.meal,
        dietDay: this.dietDay,
        existingIngredients: this.selectedIngredients,
        selectedDate: window.history.state?.selectedDate || this.dietDay?.date
      }
    });
  }
  /**
   * Create a new product from scratch in ingredient mode
   */
  createProductForIngredient() {
    console.log("[DEBUG] Creating new product for ingredient mode");
    // Save current ingredients state
    this.syncRecipeDraftIngredients();
    this.navigationService.setTempData("selectedIngredients", this.cloneSelectedIngredients());
    this.navigationService.goToCreateProduct({
      state: {
        ingredientMode: true,
        returnUrl: "/search-foods",
        meal: this.meal,
        dietDay: this.dietDay
      }
    });
  }
  cancelProductLookup() {
    try {
      this.productByCodeSub?.unsubscribe();
      this.productByCodeSub = undefined;
    } catch {}
    this.ionicUtilService.hideLoading();
  }
}
_SearchFoodsPage = SearchFoodsPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(SearchFoodsPage, "\u0275fac", function SearchFoodsPage_Factory(t) {
  return new (t || _SearchFoodsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](src_app_core_services_diet_day_diet_day_service__WEBPACK_IMPORTED_MODULE_9__.DietDayService), _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](src_app_core_services_diet_diet_service__WEBPACK_IMPORTED_MODULE_10__.DietService), _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](src_app_core_services_util_util_service__WEBPACK_IMPORTED_MODULE_11__.UtilService), _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_12__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](src_app_core_services_meal_meal_service__WEBPACK_IMPORTED_MODULE_13__.MealService), _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](src_app_core_services_product_product_service__WEBPACK_IMPORTED_MODULE_14__.ProductService), _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](src_app_core_services_recipe_recipe_api_service__WEBPACK_IMPORTED_MODULE_15__.RecipeApiService), _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](src_app_core_services_recipe_recipe_draft_service__WEBPACK_IMPORTED_MODULE_16__.RecipeDraftService), _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_17__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_29__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_18__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](src_app_core_services_util_bar_code_scanner_service__WEBPACK_IMPORTED_MODULE_19__.BarCodeScannerService), _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_30__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonRouterOutlet, 8), _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_26__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](src_app_core_services_billing_billing_service__WEBPACK_IMPORTED_MODULE_20__.BillingService), _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_31__.TranslateService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(SearchFoodsPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵdefineComponent"]({
  type: _SearchFoodsPage,
  selectors: [["app-products"]],
  viewQuery: function SearchFoodsPage_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵloadQuery"]()) && (ctx.filterIconsRef = _t.first);
    }
  },
  inputs: {
    trainerContext: "trainerContext"
  },
  decls: 28,
  vars: 14,
  consts: [[1, "search-header"], [1, "header-content"], [1, "back-section"], [1, "back-button", 3, "click"], ["name", "chevron-back-outline"], [1, "search-section"], ["debounce", "250", "placeholder", "Buscar...", "mode", "ios", "animated", "", 1, "custom-searchbar", 3, "value", "ionInput"], ["searchbar", ""], [1, "actions-section"], ["class", "action-button ripple-effect", 3, "click", 4, "ngIf"], [3, "disabled", "ingredientMode", "currentMode", "filterMeasureSelect", "filterSelection", 4, "ngIf"], ["class", "ingredient-add-inline", 4, "ngIf"], ["appHideKeyboardOnScroll", ""], [4, "ngIf"], ["encourageSearch", ""], [3, "disabled", "ionInfinite"], ["loadingSpinner", "crescent"], [1, "search-foods-footer"], [1, "footer-wrapper"], ["class", "footer-controls footer-section--segment", 4, "ngIf"], ["class", "ingredient-macros footer-section--ingredient", 4, "ngIf"], ["class", "trainer-basket footer-section--trainer", 4, "ngIf"], [1, "footer-section--macros", 2, "width", "100%", 3, "isFooterHidden", "clickable"], [1, "action-button", "ripple-effect", 3, "click"], ["name", "barcode-outline"], ["name", "ellipsis-vertical-outline", "color", "primary"], [3, "disabled", "ingredientMode", "currentMode", "filterMeasureSelect", "filterSelection"], ["filterIconsRef", ""], [1, "ingredient-add-inline"], [1, "ingredient-add-btn", 3, "click"], ["name", "add-circle"], [4, "ngIf", "ngIfElse"], ["noProducts", ""], [4, "ngFor", "ngForOf"], [3, "dietDay", "meal", "product", "ingredientMode", "isIngredientSelected", "recentCustomProduct", "showRecentIcon", "trainerMultiSelect", "isTrainerSelected", "trainerSelectedQuantity", "isTrainerFavorite", "isTrainerFocused", "delete", "ingredientToggle", "trainerToggle", "trainerFavoriteToggle", "trainerFocus"], ["class", "no-results-card", 4, "ngIf", "ngIfElse"], [1, "no-results-card"], [1, "no-results-icon"], ["name", "search-outline"], ["type", "button", 1, "no-results-action", 3, "click"], ["name", "add-circle-outline"], ["noRecipes", ""], [3, "recipe", "meal", "dietDay", "user", "loading", "recentCustomRecipe", "showRecentIcon", "trainerMultiSelect", "isTrainerSelected", "trainerSelectedQuantity", "isTrainerFavorite", "isTrainerFocused", "toggle", "quickAdd", "edit", "remove", "trainerToggle", "trainerFavoriteToggle", "trainerFocus"], ["class", "skeleton-product-card", 4, "ngFor", "ngForOf"], [1, "skeleton-product-card"], [1, "skeleton-header"], [1, "skeleton-info"], [1, "skeleton-name-row"], [1, "skeleton-product-name", 3, "animated"], [1, "skeleton-product-quantity", 3, "animated"], [1, "skeleton-product-brand", 3, "animated"], [1, "skeleton-checkbox", 3, "animated"], [1, "skeleton-macros"], [1, "skeleton-macro-col"], [1, "skeleton-color-dot", "primary"], [1, "skeleton-macro-value", 3, "animated"], [1, "skeleton-color-dot", "alternative"], [1, "skeleton-color-dot", "success"], [1, "skeleton-color-dot", "secondary"], [1, "footer-controls", "footer-section--segment"], [1, "mode-toggle"], ["type", "button", 1, "mode-btn", 3, "click"], ["name", "nutrition-outline"], ["name", "restaurant-outline"], [1, "mode-indicator"], [1, "add-btn", 3, "click"], ["name", "add-outline"], [1, "ingredient-macros", "footer-section--ingredient"], [1, "ingredient-macro-summary-card"], [1, "macro-summary-flex"], [1, "summary-item", "calories"], [1, "summary-value"], [1, "summary-label"], [1, "summary-divider"], [1, "summary-item"], [1, "summary-label", "protein"], [1, "summary-label", "carbs"], [1, "summary-label", "fat"], [1, "trainer-basket", "footer-section--trainer"], [1, "trainer-basket-list"], ["class", "trainer-basket-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "trainer-basket-confirm", 3, "click"], [1, "trainer-basket-row"], [3, "name"], [1, "trainer-basket-name"], ["type", "number", "min", "1", "placeholder", "g", 1, "trainer-basket-qty", 3, "ngModel", "ngModelOptions", "ngModelChange"], ["type", "button", 1, "trainer-basket-remove", 3, "click"], ["name", "close-outline"]],
  template: function SearchFoodsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](0, "ion-header")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("click", function SearchFoodsPage_Template_button_click_4_listener() {
        return ctx.close();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](5, "ion-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](6, "div", 5)(7, "ion-searchbar", 6, 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("ionInput", function SearchFoodsPage_Template_ion_searchbar_ionInput_7_listener($event) {
        return ctx.search($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](9, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](10, SearchFoodsPage_button_10_Template, 2, 0, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](11, SearchFoodsPage_button_11_Template, 2, 0, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](12, SearchFoodsPage_app_filter_icons_12_Template, 2, 3, "app-filter-icons", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](13, SearchFoodsPage_div_13_Template, 6, 3, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](14, "ion-content", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](15, SearchFoodsPage_ng_container_15_Template, 4, 2, "ng-container", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](16, SearchFoodsPage_ng_container_16_Template, 4, 2, "ng-container", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](17, SearchFoodsPage_ng_template_17_Template, 9, 6, "ng-template", null, 14, _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](19, SearchFoodsPage_ng_container_19_Template, 2, 2, "ng-container", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](20, "ion-infinite-scroll", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵlistener"]("ionInfinite", function SearchFoodsPage_Template_ion_infinite_scroll_ionInfinite_20_listener($event) {
        return ctx.loadData($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](21, "ion-infinite-scroll-content", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementStart"](22, "ion-footer", 17)(23, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](24, SearchFoodsPage_div_24_Template, 15, 12, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](25, SearchFoodsPage_div_25_Template, 35, 16, "div", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵtemplate"](26, SearchFoodsPage_div_26_Template, 5, 4, "div", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelement"](27, "app-macros-bars", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("value", ctx.searchBarValue);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngIf", ctx.currentMode !== "recipes" && !ctx.trainerContext);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngIf", !ctx.trainerContext);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngIf", ctx.meal);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngIf", ctx.ingredientMode);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngIf", ctx.currentMode === "products");
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngIf", ctx.currentMode === "recipes");
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngIf", !ctx.load);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("disabled", !ctx.hasStartedFoodSearch || !ctx.load);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngIf", ctx.meal && !ctx.isFooterHidden && !ctx.ingredientMode);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngIf", ctx.ingredientMode && !ctx.isFooterHidden);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("ngIf", ctx.trainerContext && ctx.trainerSelection.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_26__["ɵɵproperty"]("isFooterHidden", ctx.isFooterHidden || ctx.ingredientMode || !!ctx.trainerContext)("clickable", false);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_32__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_32__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_33__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_33__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_33__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_33__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_33__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonCard, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonCardContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonInfiniteScroll, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonInfiniteScrollContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonSearchbar, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.IonSkeletonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_27__.TextValueAccessor, _shared_ui_src_app_shared_components_filter_icons_filter_icons_component__WEBPACK_IMPORTED_MODULE_21__.FilterIconsComponent, src_app_core_directives_hide_keyboard_on_scroll_directive__WEBPACK_IMPORTED_MODULE_22__.HideKeyboardOnScrollDirective, _macros_bars_macros_bars_component__WEBPACK_IMPORTED_MODULE_23__.MacrosBarsComponent, _components_product_product_component__WEBPACK_IMPORTED_MODULE_24__.ProductComponent, _components_recipe_card_recipe_card_component__WEBPACK_IMPORTED_MODULE_25__.RecipeCardComponent, _angular_common__WEBPACK_IMPORTED_MODULE_32__.DecimalPipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_31__.TranslatePipe],
  styles: ["ion-header[_ngcontent-%COMP%] {\n  --background: transparent;\n  background: transparent;\n  border: none;\n}\nion-header[_ngcontent-%COMP%]::after {\n  display: none;\n}\n\n.search-header[_ngcontent-%COMP%] {\n  background: #141414;\n  border-bottom: 1px solid #252525;\n}\n.search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 4px 16px 0;\n  min-height: 40px;\n  gap: 12px;\n}\n.search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .back-section[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n}\n.search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .back-section[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border: none;\n  border-radius: 8px;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: rgba(255, 255, 255, 0.7);\n  transition: all 0.2s ease;\n}\n.search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .back-section[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n  background: rgba(255, 255, 255, 0.1);\n}\n.search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .back-section[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   ion-searchbar[_ngcontent-%COMP%] {\n  --background: rgba(255, 255, 255, 0.05);\n  --border-radius: 8px;\n  --box-shadow: none;\n  --color: rgba(255, 255, 255, 0.9);\n  --placeholder-color: rgba(255, 255, 255, 0.5);\n  --icon-color: rgba(255, 255, 255, 0.7);\n  --clear-button-color: rgba(255, 255, 255, 0.7);\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --height: 36px;\n  margin: 0;\n  padding: 0;\n}\n.search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   ion-searchbar.searchbar-has-focus[_ngcontent-%COMP%] {\n  --background: rgba(255, 255, 255, 0.08);\n}\n.search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   ion-searchbar[_ngcontent-%COMP%]::part(icon) {\n  right: 12px !important;\n  left: auto !important;\n  position: absolute !important;\n  width: 18px;\n  height: 18px;\n}\n.search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .search-section[_ngcontent-%COMP%]   ion-searchbar[_ngcontent-%COMP%]::part(input) {\n  padding-inline-start: 12px !important;\n  padding-inline-end: 38px !important;\n  background: transparent !important;\n}\n.search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-shrink: 0;\n}\n.search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .action-button[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  border: none;\n  border-radius: 8px;\n  width: 40px;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: rgba(255, 255, 255, 0.7);\n  transition: all 0.2s ease;\n}\n.search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .action-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n  background: rgba(255, 255, 255, 0.1);\n}\n.search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .action-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.search-header[_ngcontent-%COMP%]   .filter-icons-container[_ngcontent-%COMP%] {\n  margin-top: 0px;\n}\n.search-header[_ngcontent-%COMP%]   .ingredient-add-inline[_ngcontent-%COMP%] {\n  padding: 6px 12px 10px;\n}\n.search-header[_ngcontent-%COMP%]   .ingredient-add-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 44px;\n  border: none;\n  border-radius: 10px;\n  background: rgba(254, 144, 0, 0.14);\n  color: var(--ion-color-primary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 8px;\n  font-size: 0.78rem;\n  font-weight: 700;\n  letter-spacing: 0.4px;\n  text-transform: uppercase;\n}\n.search-header[_ngcontent-%COMP%]   .ingredient-add-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n\n@media (max-width: 768px) {\n  .search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%] {\n    padding: 4px 16px 0;\n    min-height: 40px;\n  }\n  .search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .back-section[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%], .search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .action-button[_ngcontent-%COMP%] {\n    width: 36px;\n    height: 36px;\n  }\n  .search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .back-section[_ngcontent-%COMP%]   .back-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], .search-header[_ngcontent-%COMP%]   .header-content[_ngcontent-%COMP%]   .actions-section[_ngcontent-%COMP%]   .action-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n}\n.fixed[_ngcontent-%COMP%] {\n  bottom: 6em;\n}\n\n.ios[_ngcontent-%COMP%]   .fixed[_ngcontent-%COMP%] {\n  bottom: 8em;\n}\n\n.hidden[_ngcontent-%COMP%] {\n  display: none;\n}\n\n.skeleton-product-card[_ngcontent-%COMP%] {\n  background-color: #141414;\n  border: 1px solid #252525;\n  border-radius: 12px;\n  margin: 6px 4px;\n  padding: 12px;\n}\n\n.skeleton-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 12px;\n  margin-bottom: 8px;\n}\n\n.skeleton-info[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n.skeleton-name-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.skeleton-product-name[_ngcontent-%COMP%] {\n  width: 120px;\n  height: 18px;\n  border-radius: 4px;\n  --background: rgba(255, 255, 255, 0.15);\n}\n\n.skeleton-product-quantity[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 14px;\n  border-radius: 4px;\n  --background: rgba(255, 255, 255, 0.08);\n}\n\n.skeleton-product-brand[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 12px;\n  border-radius: 4px;\n  margin-top: 4px;\n  --background: rgba(255, 255, 255, 0.05);\n}\n\n.skeleton-checkbox[_ngcontent-%COMP%] {\n  width: 24px;\n  height: 24px;\n  border-radius: 6px;\n  --background: rgba(255, 255, 255, 0.1);\n}\n\n.skeleton-macros[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n.skeleton-macro-col[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  flex: 1;\n}\n\n.skeleton-color-dot[_ngcontent-%COMP%] {\n  width: 8px;\n  height: 8px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  opacity: 0.5;\n}\n.skeleton-color-dot.primary[_ngcontent-%COMP%] {\n  background: var(--ion-color-primary);\n}\n.skeleton-color-dot.alternative[_ngcontent-%COMP%] {\n  background: var(--ion-color-alternative);\n}\n.skeleton-color-dot.success[_ngcontent-%COMP%] {\n  background: var(--ion-color-success);\n}\n.skeleton-color-dot.secondary[_ngcontent-%COMP%] {\n  background: var(--ion-color-secondary);\n}\n\n.skeleton-macro-value[_ngcontent-%COMP%] {\n  width: 30px;\n  height: 14px;\n  border-radius: 3px;\n  --background: rgba(255, 255, 255, 0.1);\n}\n\n.no-results-card[_ngcontent-%COMP%] {\n  margin: 22px 12px;\n  padding: 18px 16px;\n  border-radius: 14px;\n  border: 1px solid #2a2a2a;\n  background: #171717;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 10px;\n}\n.no-results-card[_ngcontent-%COMP%]   .no-results-icon[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 999px;\n  background: rgba(255, 255, 255, 0.06);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.no-results-card[_ngcontent-%COMP%]   .no-results-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n  color: rgba(255, 255, 255, 0.72);\n}\n.no-results-card[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 2px 0 0;\n  font-size: 1rem;\n  font-weight: 700;\n  color: rgba(255, 255, 255, 0.92);\n}\n.no-results-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.87rem;\n  line-height: 1.35;\n  color: rgba(255, 255, 255, 0.62);\n}\n.no-results-card[_ngcontent-%COMP%]   .no-results-action[_ngcontent-%COMP%] {\n  margin-top: 4px;\n  border: none;\n  border-radius: 10px;\n  height: 40px;\n  padding: 0 14px;\n  background: rgba(254, 144, 0, 0.15);\n  color: var(--ion-color-primary);\n  font-size: 0.86rem;\n  font-weight: 700;\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n.no-results-card[_ngcontent-%COMP%]   .no-results-action[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n\n.search-foods-footer[_ngcontent-%COMP%] {\n  --background: transparent;\n  background: transparent;\n  position: relative;\n}\n\n.footer-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  background: #141414;\n  border-top: 1px solid #252525;\n}\n.footer-wrapper[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  height: 120px;\n  background: #141414;\n  z-index: -1;\n}\n\n.footer-section--segment[_ngcontent-%COMP%], .footer-section--ingredient[_ngcontent-%COMP%] {\n  order: 1;\n}\n\n.footer-section--macros[_ngcontent-%COMP%] {\n  order: 2;\n}\n\n.footer-section--trainer[_ngcontent-%COMP%] {\n  order: 1;\n}\n\n.trainer-basket[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 10px 12px;\n  background: #141414;\n  border-top: 1px solid #252525;\n}\n\n.trainer-basket-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  max-height: 168px;\n  overflow-y: auto;\n}\n\n.trainer-basket-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 8px 10px;\n  border-radius: 12px;\n  background: #1a1a1a;\n  border: 1px solid rgba(255, 255, 255, 0.05);\n}\n.trainer-basket-row[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  color: var(--ion-color-primary);\n  flex-shrink: 0;\n}\n\n.trainer-basket-name[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 13.5px;\n  color: #eee;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.trainer-basket-qty[_ngcontent-%COMP%] {\n  width: 52px;\n  height: 30px;\n  border-radius: 8px;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  background: #101010;\n  color: #eee;\n  text-align: center;\n  font-size: 13px;\n}\n\n.trainer-basket-remove[_ngcontent-%COMP%] {\n  width: 26px;\n  height: 26px;\n  border-radius: 50%;\n  border: none;\n  background: transparent;\n  color: #888;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n  flex-shrink: 0;\n}\n.trainer-basket-remove[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: inherit;\n  font-size: 18px;\n}\n\n.trainer-basket-confirm[_ngcontent-%COMP%] {\n  height: 44px;\n  border-radius: 12px;\n  border: none;\n  background: var(--ion-color-primary);\n  color: var(--ion-color-primary-contrast);\n  font-weight: 600;\n  font-size: 14.5px;\n}\n\n.footer-controls[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  padding: 8px 12px;\n  background: #141414;\n}\n\n.mode-toggle[_ngcontent-%COMP%] {\n  position: relative;\n  flex: 1;\n  display: flex;\n  align-items: center;\n  background: #2a2a2a;\n  border: 1px solid #333;\n  border-radius: 14px;\n  padding: 4px;\n  overflow: hidden;\n}\n\n.mode-btn[_ngcontent-%COMP%] {\n  position: relative;\n  z-index: 1;\n  flex: 1;\n  border: none;\n  background: transparent;\n  color: #b0b0b0;\n  font-size: 0.85rem;\n  font-weight: 700;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 8px 10px;\n  border-radius: 10px;\n  transition: color 0.2s ease;\n}\n.mode-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.mode-btn.is-active[_ngcontent-%COMP%] {\n  color: #fff;\n}\n\n.mode-indicator[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 4px;\n  left: 4px;\n  width: calc(50% - 4px);\n  height: calc(100% - 8px);\n  background: #141414;\n  border-radius: 10px;\n  transition: transform 0.25s ease;\n}\n.mode-indicator.recipes-active[_ngcontent-%COMP%] {\n  transform: translateX(100%);\n}\n\n.add-btn[_ngcontent-%COMP%] {\n  width: 44px;\n  height: 44px;\n  border-radius: 12px;\n  border: none;\n  background: var(--ion-color-primary);\n  color: var(--ion-color-primary-contrast);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0;\n}\n.add-btn[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 22px;\n}\n\n.ingredient-macros[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  padding: 8px 12px;\n  background: #141414;\n  border-top: 1px solid #252525;\n}\n.ingredient-macros[_ngcontent-%COMP%]   .ingredient-macro-summary-card[_ngcontent-%COMP%] {\n  margin: 0;\n  border: 1px solid rgba(255, 255, 255, 0.05);\n  border-radius: 16px;\n  box-shadow: none;\n  background: #1a1a1a;\n}\n.ingredient-macros[_ngcontent-%COMP%]   .ingredient-macro-summary-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  padding: 12px 8px;\n}\n.ingredient-macros[_ngcontent-%COMP%]   .macro-summary-flex[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-around;\n  text-align: center;\n}\n.ingredient-macros[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 2px;\n}\n.ingredient-macros[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%]   .summary-value[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 800;\n  color: white;\n  line-height: 1.2;\n}\n.ingredient-macros[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%]   .summary-value[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.75em;\n  font-weight: 600;\n  margin-left: 1px;\n  color: rgba(255, 255, 255, 0.5);\n}\n.ingredient-macros[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%]   .summary-label[_ngcontent-%COMP%] {\n  font-size: 0.6rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n  color: rgba(255, 255, 255, 0.6);\n}\n.ingredient-macros[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%]   .summary-label.protein[_ngcontent-%COMP%] {\n  color: var(--ion-color-alternative);\n}\n.ingredient-macros[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%]   .summary-label.carbs[_ngcontent-%COMP%] {\n  color: var(--ion-color-success);\n}\n.ingredient-macros[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%]   .summary-label.fat[_ngcontent-%COMP%] {\n  color: var(--ion-color-secondary);\n}\n.ingredient-macros[_ngcontent-%COMP%]   .summary-item.calories[_ngcontent-%COMP%]   .summary-value[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n  font-size: 1.25rem;\n}\n.ingredient-macros[_ngcontent-%COMP%]   .summary-item.calories[_ngcontent-%COMP%]   .summary-label[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n}\n.ingredient-macros[_ngcontent-%COMP%]   .summary-divider[_ngcontent-%COMP%] {\n  width: 1px;\n  height: 30px;\n  background: rgba(255, 255, 255, 0.1);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL2RpZXRzL2NvbXBvbmVudHMvbWVhbC9jb21wb25lbnRzL3NlYXJjaC1mb29kcy9zZWFyY2gtZm9vZHMucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UseUJBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7QUFDRjtBQUFFO0VBQ0UsYUFBQTtBQUVKOztBQUVBO0VBQ0UsbUJBQUE7RUFDQSxnQ0FBQTtBQUNGO0FBQ0U7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxTQUFBO0FBQ0o7QUFDSTtFQUNFLGNBQUE7QUFDTjtBQUNNO0VBQ0UscUNBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsK0JBQUE7RUFDQSx5QkFBQTtBQUNSO0FBQ1E7RUFDRSxzQkFBQTtFQUNBLG9DQUFBO0FBQ1Y7QUFFUTtFQUNFLGVBQUE7QUFBVjtBQUtJO0VBQ0UsT0FBQTtFQUNBLFlBQUE7QUFITjtBQUtNO0VBQ0UsdUNBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUNBQUE7RUFDQSw2Q0FBQTtFQUNBLHNDQUFBO0VBQ0EsOENBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0FBSFI7QUFLUTtFQUNFLHVDQUFBO0FBSFY7QUFPUTtFQUNFLHNCQUFBO0VBQ0EscUJBQUE7RUFDQSw2QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBTFY7QUFRUTtFQUNFLHFDQUFBO0VBQ0EsbUNBQUE7RUFDQSxrQ0FBQTtBQU5WO0FBV0k7RUFDRSxhQUFBO0VBQ0EsUUFBQTtFQUNBLGNBQUE7QUFUTjtBQVdNO0VBQ0UscUNBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsK0JBQUE7RUFDQSx5QkFBQTtBQVRSO0FBV1E7RUFDRSxzQkFBQTtFQUNBLG9DQUFBO0FBVFY7QUFZUTtFQUNFLGVBQUE7QUFWVjtBQWdCRTtFQUNFLGVBQUE7QUFkSjtBQWlCRTtFQUNFLHNCQUFBO0FBZko7QUFrQkU7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLG1DQUFBO0VBQ0EsK0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFFBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSx5QkFBQTtBQWhCSjtBQWtCSTtFQUNFLGVBQUE7QUFoQk47O0FBc0JBO0VBRUk7SUFDQSxtQkFBQTtJQUNBLGdCQUFBO0VBcEJGO0VBc0JJOztJQUVFLFdBQUE7SUFDQSxZQUFBO0VBcEJOO0VBc0JNOztJQUNFLGVBQUE7RUFuQlI7QUFDRjtBQXlCQTtFQUNFLFdBQUE7QUF2QkY7O0FBMkJFO0VBQ0UsV0FBQTtBQXhCSjs7QUE0QkE7RUFDRSxhQUFBO0FBekJGOztBQTZCQTtFQUNFLHlCQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxhQUFBO0FBMUJGOztBQTZCQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLHVCQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0FBMUJGOztBQTZCQTtFQUNFLE9BQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7QUExQkY7O0FBNkJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtBQTFCRjs7QUE2QkE7RUFDRSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsdUNBQUE7QUExQkY7O0FBNkJBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHVDQUFBO0FBMUJGOztBQTZCQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0VBQ0EsdUNBQUE7QUExQkY7O0FBNkJBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHNDQUFBO0FBMUJGOztBQTZCQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLFFBQUE7QUExQkY7O0FBNkJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxRQUFBO0VBQ0EsT0FBQTtBQTFCRjs7QUE2QkE7RUFDRSxVQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7QUExQkY7QUE0QkU7RUFDRSxvQ0FBQTtBQTFCSjtBQTZCRTtFQUNFLHdDQUFBO0FBM0JKO0FBOEJFO0VBQ0Usb0NBQUE7QUE1Qko7QUErQkU7RUFDRSxzQ0FBQTtBQTdCSjs7QUFpQ0E7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0Esc0NBQUE7QUE5QkY7O0FBaUNBO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EseUJBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0FBOUJGO0FBZ0NFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxvQkFBQTtFQUNBLHFDQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUE5Qko7QUFnQ0k7RUFDRSxlQUFBO0VBQ0EsZ0NBQUE7QUE5Qk47QUFrQ0U7RUFDRSxlQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0NBQUE7QUFoQ0o7QUFtQ0U7RUFDRSxTQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdDQUFBO0FBakNKO0FBb0NFO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsbUNBQUE7RUFDQSwrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtBQWxDSjtBQW9DSTtFQUNFLGVBQUE7QUFsQ047O0FBd0NBO0VBQ0UseUJBQUE7RUFDQSx1QkFBQTtFQUNBLGtCQUFBO0FBckNGOztBQTJDQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsNkJBQUE7QUF4Q0Y7QUEyQ0U7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FBekNKOztBQThDQTs7RUFFRSxRQUFBO0FBM0NGOztBQStDQTtFQUNFLFFBQUE7QUE1Q0Y7O0FBK0NBO0VBQ0UsUUFBQTtBQTVDRjs7QUFnREE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLDZCQUFBO0FBN0NGOztBQWdEQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FBN0NGOztBQWdEQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQ0FBQTtBQTdDRjtBQStDRTtFQUNFLGVBQUE7RUFDQSwrQkFBQTtFQUNBLGNBQUE7QUE3Q0o7O0FBaURBO0VBQ0UsT0FBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQTlDRjs7QUFpREE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsMENBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUE5Q0Y7O0FBaURBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLFdBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFVBQUE7RUFDQSxjQUFBO0FBOUNGO0FBZ0RFO0VBQ0UsY0FBQTtFQUNBLGVBQUE7QUE5Q0o7O0FBa0RBO0VBQ0UsWUFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLG9DQUFBO0VBQ0Esd0NBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FBL0NGOztBQWtEQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0FBL0NGOztBQWtEQTtFQUNFLGtCQUFBO0VBQ0EsT0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQS9DRjs7QUFrREE7RUFDRSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxPQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0EsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFFBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7QUEvQ0Y7QUFpREU7RUFDRSxlQUFBO0FBL0NKO0FBa0RFO0VBQ0UsV0FBQTtBQWhESjs7QUFvREE7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxTQUFBO0VBQ0Esc0JBQUE7RUFDQSx3QkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQ0FBQTtBQWpERjtBQW1ERTtFQUNFLDJCQUFBO0FBakRKOztBQXFEQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0Esb0NBQUE7RUFDQSx3Q0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsVUFBQTtBQWxERjtBQW9ERTtFQUNFLGVBQUE7QUFsREo7O0FBdURBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLDZCQUFBO0FBcERGO0FBc0RFO0VBQ0UsU0FBQTtFQUNBLDJDQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBcERKO0FBc0RJO0VBQ0UsaUJBQUE7QUFwRE47QUF3REU7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSw2QkFBQTtFQUNBLGtCQUFBO0FBdERKO0FBeURFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBdkRKO0FBeURJO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQXZETjtBQXlETTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLCtCQUFBO0FBdkRSO0FBMkRJO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7RUFDQSwrQkFBQTtBQXpETjtBQTJETTtFQUNFLG1DQUFBO0FBekRSO0FBNERNO0VBQ0UsK0JBQUE7QUExRFI7QUE2RE07RUFDRSxpQ0FBQTtBQTNEUjtBQWdFTTtFQUNFLCtCQUFBO0VBQ0Esa0JBQUE7QUE5RFI7QUFpRU07RUFDRSwrQkFBQTtBQS9EUjtBQW9FRTtFQUNFLFVBQUE7RUFDQSxZQUFBO0VBQ0Esb0NBQUE7QUFsRUoiLCJzb3VyY2VzQ29udGVudCI6WyJpb24taGVhZGVyIHtcbiAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgJjo6YWZ0ZXIge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cblxuLnNlYXJjaC1oZWFkZXIge1xuICBiYWNrZ3JvdW5kOiAjMTQxNDE0O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzI1MjUyNTtcblxuICAuaGVhZGVyLWNvbnRlbnQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgcGFkZGluZzogNHB4IDE2cHggMDtcbiAgICBtaW4taGVpZ2h0OiA0MHB4O1xuICAgIGdhcDogMTJweDtcblxuICAgIC5iYWNrLXNlY3Rpb24ge1xuICAgICAgZmxleC1zaHJpbms6IDA7XG5cbiAgICAgIC5iYWNrLWJ1dHRvbiB7XG4gICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XG4gICAgICAgIGJvcmRlcjogbm9uZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgICB3aWR0aDogNDBweDtcbiAgICAgICAgaGVpZ2h0OiA0MHB4O1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcblxuICAgICAgICAmOmFjdGl2ZSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTtcbiAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gICAgICAgIH1cblxuICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgZm9udC1zaXplOiAyMHB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLnNlYXJjaC1zZWN0aW9uIHtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBtaW4td2lkdGg6IDA7XG5cbiAgICAgIGlvbi1zZWFyY2hiYXIge1xuICAgICAgICAtLWJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XG4gICAgICAgIC0tYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgICAtLWJveC1zaGFkb3c6IG5vbmU7XG4gICAgICAgIC0tY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45KTtcbiAgICAgICAgLS1wbGFjZWhvbGRlci1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xuICAgICAgICAtLWljb24tY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcbiAgICAgICAgLS1jbGVhci1idXR0b24tY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC43KTtcbiAgICAgICAgLS1wYWRkaW5nLXRvcDogMDtcbiAgICAgICAgLS1wYWRkaW5nLWJvdHRvbTogMDtcbiAgICAgICAgLS1oZWlnaHQ6IDM2cHg7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgcGFkZGluZzogMDtcblxuICAgICAgICAmLnNlYXJjaGJhci1oYXMtZm9jdXMge1xuICAgICAgICAgIC0tYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpeCBwYXJhIG1vdmVyIGVsIGljb25vIGFsIGZpbmFsIChkZXJlY2hhKVxuICAgICAgICAmOjpwYXJ0KGljb24pIHtcbiAgICAgICAgICByaWdodDogMTJweCAhaW1wb3J0YW50OyAvLyBDYW1iaWFkbyBkZSBsZWZ0IGEgcmlnaHRcbiAgICAgICAgICBsZWZ0OiBhdXRvICFpbXBvcnRhbnQ7XG4gICAgICAgICAgcG9zaXRpb246IGFic29sdXRlICFpbXBvcnRhbnQ7XG4gICAgICAgICAgd2lkdGg6IDE4cHg7XG4gICAgICAgICAgaGVpZ2h0OiAxOHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgJjo6cGFydChpbnB1dCkge1xuICAgICAgICAgIHBhZGRpbmctaW5saW5lLXN0YXJ0OiAxMnB4ICFpbXBvcnRhbnQ7IC8vIENhbWJpYWRvIGRlIDM4cHggYSAxMnB4XG4gICAgICAgICAgcGFkZGluZy1pbmxpbmUtZW5kOiAzOHB4ICFpbXBvcnRhbnQ7IC8vIENhbWJpYWRvIGRlIDhweCBhIDM4cHggcGFyYSBkZWphciBlc3BhY2lvIGFsIGljb25vXG4gICAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC5hY3Rpb25zLXNlY3Rpb24ge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGdhcDogOHB4O1xuICAgICAgZmxleC1zaHJpbms6IDA7XG5cbiAgICAgIC5hY3Rpb24tYnV0dG9uIHtcbiAgICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICAgIHdpZHRoOiA0MHB4O1xuICAgICAgICBoZWlnaHQ6IDQwcHg7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjcpO1xuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xuXG4gICAgICAgICY6YWN0aXZlIHtcbiAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTUpO1xuICAgICAgICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgICBmb250LXNpemU6IDIwcHg7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAuZmlsdGVyLWljb25zLWNvbnRhaW5lciB7XG4gICAgbWFyZ2luLXRvcDogMHB4O1xuICB9XG5cbiAgLmluZ3JlZGllbnQtYWRkLWlubGluZSB7XG4gICAgcGFkZGluZzogNnB4IDEycHggMTBweDtcbiAgfVxuXG4gIC5pbmdyZWRpZW50LWFkZC1idG4ge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogNDRweDtcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NCwgMTQ0LCAwLCAwLjE0KTtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBnYXA6IDhweDtcbiAgICBmb250LXNpemU6IDAuNzhyZW07XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBsZXR0ZXItc3BhY2luZzogMC40cHg7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICB9XG4gIH1cbn1cblxuLy8gUmVzcG9uc2l2aWRhZCBtw4PCs3ZpbFxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gIC5zZWFyY2gtaGVhZGVyIHtcbiAgICAuaGVhZGVyLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDRweCAxNnB4IDA7XG4gICAgbWluLWhlaWdodDogNDBweDtcblxuICAgICAgLmJhY2stc2VjdGlvbiAuYmFjay1idXR0b24sXG4gICAgICAuYWN0aW9ucy1zZWN0aW9uIC5hY3Rpb24tYnV0dG9uIHtcbiAgICAgICAgd2lkdGg6IDM2cHg7XG4gICAgICAgIGhlaWdodDogMzZweDtcblxuICAgICAgICBpb24taWNvbiB7XG4gICAgICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi5maXhlZCB7XG4gIGJvdHRvbTogNmVtO1xufVxuXG4uaW9zIHtcbiAgLmZpeGVkIHtcbiAgICBib3R0b206IDhlbTtcbiAgfVxufVxuXG4uaGlkZGVuIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLy8gU2tlbGV0b24gUHJvZHVjdCBTdHlsZXNcbi5za2VsZXRvbi1wcm9kdWN0LWNhcmQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTQxNDE0O1xuICBib3JkZXI6IDFweCBzb2xpZCAjMjUyNTI1O1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBtYXJnaW46IDZweCA0cHg7XG4gIHBhZGRpbmc6IDEycHg7XG59XG5cbi5za2VsZXRvbi1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbn1cblxuLnNrZWxldG9uLWluZm8ge1xuICBmbGV4OiAxO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4uc2tlbGV0b24tbmFtZS1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbn1cblxuLnNrZWxldG9uLXByb2R1Y3QtbmFtZSB7XG4gIHdpZHRoOiAxMjBweDtcbiAgaGVpZ2h0OiAxOHB4O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIC0tYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE1KTtcbn1cblxuLnNrZWxldG9uLXByb2R1Y3QtcXVhbnRpdHkge1xuICB3aWR0aDogNDBweDtcbiAgaGVpZ2h0OiAxNHB4O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIC0tYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA4KTtcbn1cblxuLnNrZWxldG9uLXByb2R1Y3QtYnJhbmQge1xuICB3aWR0aDogODBweDtcbiAgaGVpZ2h0OiAxMnB4O1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIG1hcmdpbi10b3A6IDRweDtcbiAgLS1iYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpO1xufVxuXG4uc2tlbGV0b24tY2hlY2tib3gge1xuICB3aWR0aDogMjRweDtcbiAgaGVpZ2h0OiAyNHB4O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIC0tYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xufVxuXG4uc2tlbGV0b24tbWFjcm9zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDhweDtcbn1cblxuLnNrZWxldG9uLW1hY3JvLWNvbCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDRweDtcbiAgZmxleDogMTtcbn1cblxuLnNrZWxldG9uLWNvbG9yLWRvdCB7XG4gIHdpZHRoOiA4cHg7XG4gIGhlaWdodDogOHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICBvcGFjaXR5OiAwLjU7XG5cbiAgJi5wcmltYXJ5IHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIH1cblxuICAmLmFsdGVybmF0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItYWx0ZXJuYXRpdmUpO1xuICB9XG5cbiAgJi5zdWNjZXNzIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3Itc3VjY2Vzcyk7XG4gIH1cblxuICAmLnNlY29uZGFyeSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXNlY29uZGFyeSk7XG4gIH1cbn1cblxuLnNrZWxldG9uLW1hY3JvLXZhbHVlIHtcbiAgd2lkdGg6IDMwcHg7XG4gIGhlaWdodDogMTRweDtcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xuICAtLWJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbn1cblxuLm5vLXJlc3VsdHMtY2FyZCB7XG4gIG1hcmdpbjogMjJweCAxMnB4O1xuICBwYWRkaW5nOiAxOHB4IDE2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDE0cHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMyYTJhMmE7XG4gIGJhY2tncm91bmQ6ICMxNzE3MTc7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xuXG4gIC5uby1yZXN1bHRzLWljb24ge1xuICAgIHdpZHRoOiA0NHB4O1xuICAgIGhlaWdodDogNDRweDtcbiAgICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDYpO1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMjJweDtcbiAgICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNzIpO1xuICAgIH1cbiAgfVxuXG4gIGgzIHtcbiAgICBtYXJnaW46IDJweCAwIDA7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC45Mik7XG4gIH1cblxuICBwIHtcbiAgICBtYXJnaW46IDA7XG4gICAgZm9udC1zaXplOiAwLjg3cmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjM1O1xuICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNjIpO1xuICB9XG5cbiAgLm5vLXJlc3VsdHMtYWN0aW9uIHtcbiAgICBtYXJnaW4tdG9wOiA0cHg7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgaGVpZ2h0OiA0MHB4O1xuICAgIHBhZGRpbmc6IDAgMTRweDtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NCwgMTQ0LCAwLCAwLjE1KTtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIGZvbnQtc2l6ZTogMC44NnJlbTtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA2cHg7XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBmb250LXNpemU6IDE4cHg7XG4gICAgfVxuICB9XG59XG5cbi8vIEZvb3RlciBDb250cm9scyBSb3dcbi5zZWFyY2gtZm9vZHMtZm9vdGVyIHtcbiAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLy8gQ29udGVuZWRvciBwcmluY2lwYWwgZGVsIGZvb3RlcjogZmxleCBjb2x1bW4gY29uIG9yZGVuIGV4cGzDg8KtY2l0by5cbi8vIEVzdG8gZ2FyYW50aXphIHF1ZSBhdW5xdWUgZWwgRE9NIHN1ZnJhIHJlZmxvd3MgcG9yIGVsIHRlY2xhZG8sXG4vLyBlbCBvcmRlbiB2aXN1YWwgKHNlZ21lbnQgYXJyaWJhLCBtYWNyb3MtYmFyIGFiYWpvKSBOVU5DQSBjYW1iaWUuXG4uZm9vdGVyLXdyYXBwZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kOiAjMTQxNDE0O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzI1MjUyNTtcblxuICAvLyBFeHRpZW5kZSBlbCBjb2xvciBkZWwgZm9vdGVyIHBhcmEgZXZpdGFyIHRyYW5zcGFyZW5jaWFzIGR1cmFudGUgdHJhbnNpY2lvbmVzLlxuICAmOjphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMTAwJTtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGhlaWdodDogMTIwcHg7XG4gICAgYmFja2dyb3VuZDogIzE0MTQxNDtcbiAgICB6LWluZGV4OiAtMTtcbiAgfVxufVxuXG4vLyBFbCBzZWdtZW50L21vZGUtdG9nZ2xlIHNpZW1wcmUgZW4gcHJpbWVyYSBwb3NpY2nDg8KzbiB2aXN1YWxcbi5mb290ZXItc2VjdGlvbi0tc2VnbWVudCxcbi5mb290ZXItc2VjdGlvbi0taW5ncmVkaWVudCB7XG4gIG9yZGVyOiAxO1xufVxuXG4vLyBMYSBiYXJyYSBkZSBtYWNyb3Mgc2llbXByZSBlbiBzZWd1bmRhIHBvc2ljacODwrNuIHZpc3VhbFxuLmZvb3Rlci1zZWN0aW9uLS1tYWNyb3Mge1xuICBvcmRlcjogMjtcbn1cblxuLmZvb3Rlci1zZWN0aW9uLS10cmFpbmVyIHtcbiAgb3JkZXI6IDE7XG59XG5cbi8vIFRBUkVBNSAodHJhaW4tZml0LXRyYWluZXJzKSDDosKAwpQgY2VzdGEgZGUgc2VsZWNjacODwrNuIG3Dg8K6bHRpcGxlXG4udHJhaW5lci1iYXNrZXQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDhweDtcbiAgcGFkZGluZzogMTBweCAxMnB4O1xuICBiYWNrZ3JvdW5kOiAjMTQxNDE0O1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzI1MjUyNTtcbn1cblxuLnRyYWluZXItYmFza2V0LWxpc3Qge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDZweDtcbiAgbWF4LWhlaWdodDogMTY4cHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG59XG5cbi50cmFpbmVyLWJhc2tldC1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgcGFkZGluZzogOHB4IDEwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJhY2tncm91bmQ6ICMxYTFhMWE7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICB9XG59XG5cbi50cmFpbmVyLWJhc2tldC1uYW1lIHtcbiAgZmxleDogMTtcbiAgZm9udC1zaXplOiAxMy41cHg7XG4gIGNvbG9yOiAjZWVlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLnRyYWluZXItYmFza2V0LXF0eSB7XG4gIHdpZHRoOiA1MnB4O1xuICBoZWlnaHQ6IDMwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xuICBiYWNrZ3JvdW5kOiAjMTAxMDEwO1xuICBjb2xvcjogI2VlZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IDEzcHg7XG59XG5cbi50cmFpbmVyLWJhc2tldC1yZW1vdmUge1xuICB3aWR0aDogMjZweDtcbiAgaGVpZ2h0OiAyNnB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAjODg4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgcGFkZGluZzogMDtcbiAgZmxleC1zaHJpbms6IDA7XG5cbiAgaW9uLWljb24ge1xuICAgIGNvbG9yOiBpbmhlcml0O1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgfVxufVxuXG4udHJhaW5lci1iYXNrZXQtY29uZmlybSB7XG4gIGhlaWdodDogNDRweDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtc2l6ZTogMTQuNXB4O1xufVxuXG4uZm9vdGVyLWNvbnRyb2xzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgYmFja2dyb3VuZDogIzE0MTQxNDtcbn1cblxuLm1vZGUtdG9nZ2xlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBmbGV4OiAxO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBiYWNrZ3JvdW5kOiAjMmEyYTJhO1xuICBib3JkZXI6IDFweCBzb2xpZCAjMzMzO1xuICBib3JkZXItcmFkaXVzOiAxNHB4O1xuICBwYWRkaW5nOiA0cHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5tb2RlLWJ0biB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgei1pbmRleDogMTtcbiAgZmxleDogMTtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICNiMGIwYjA7XG4gIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogNnB4O1xuICBwYWRkaW5nOiA4cHggMTBweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgdHJhbnNpdGlvbjogY29sb3IgMC4ycyBlYXNlO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gIH1cblxuICAmLmlzLWFjdGl2ZSB7XG4gICAgY29sb3I6ICNmZmY7XG4gIH1cbn1cblxuLm1vZGUtaW5kaWNhdG9yIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDRweDtcbiAgbGVmdDogNHB4O1xuICB3aWR0aDogY2FsYyg1MCUgLSA0cHgpO1xuICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDhweCk7XG4gIGJhY2tncm91bmQ6ICMxNDE0MTQ7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjI1cyBlYXNlO1xuXG4gICYucmVjaXBlcy1hY3RpdmUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgfVxufVxuXG4uYWRkLWJ0biB7XG4gIHdpZHRoOiA0NHB4O1xuICBoZWlnaHQ6IDQ0cHg7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJvcmRlcjogbm9uZTtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgcGFkZGluZzogMDtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAyMnB4O1xuICB9XG59XG5cbi8vIExlZ2FjeSBpbmdyZWRpZW50IG1hY3JvcyAoa2VwdCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkpXG4uaW5ncmVkaWVudC1tYWNyb3Mge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogNnB4O1xuICBwYWRkaW5nOiA4cHggMTJweDtcbiAgYmFja2dyb3VuZDogIzE0MTQxNDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICMyNTI1MjU7XG5cbiAgLmluZ3JlZGllbnQtbWFjcm8tc3VtbWFyeS1jYXJkIHtcbiAgICBtYXJnaW46IDA7XG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcbiAgICBib3JkZXItcmFkaXVzOiAxNnB4O1xuICAgIGJveC1zaGFkb3c6IG5vbmU7XG4gICAgYmFja2dyb3VuZDogIzFhMWExYTtcblxuICAgIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgICAgcGFkZGluZzogMTJweCA4cHg7XG4gICAgfVxuICB9XG5cbiAgLm1hY3JvLXN1bW1hcnktZmxleCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG4gIC5zdW1tYXJ5LWl0ZW0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogMnB4O1xuXG4gICAgLnN1bW1hcnktdmFsdWUge1xuICAgICAgZm9udC1zaXplOiAxLjFyZW07XG4gICAgICBmb250LXdlaWdodDogODAwO1xuICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuMjtcblxuICAgICAgc21hbGwge1xuICAgICAgICBmb250LXNpemU6IDAuNzVlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDFweDtcbiAgICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC41KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAuc3VtbWFyeS1sYWJlbCB7XG4gICAgICBmb250LXNpemU6IDAuNnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuM3B4O1xuICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcblxuICAgICAgJi5wcm90ZWluIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1hbHRlcm5hdGl2ZSk7XG4gICAgICB9XG5cbiAgICAgICYuY2FyYnMge1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXN1Y2Nlc3MpO1xuICAgICAgfVxuXG4gICAgICAmLmZhdCB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3Itc2Vjb25kYXJ5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmLmNhbG9yaWVzIHtcbiAgICAgIC5zdW1tYXJ5LXZhbHVlIHtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgZm9udC1zaXplOiAxLjI1cmVtO1xuICAgICAgfVxuXG4gICAgICAuc3VtbWFyeS1sYWJlbCB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLnN1bW1hcnktZGl2aWRlciB7XG4gICAgd2lkdGg6IDFweDtcbiAgICBoZWlnaHQ6IDMwcHg7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xuICB9XG59XG5cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
}));


/***/ }),

/***/ 97235:
/*!********************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/constants/actions.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ACTIONS: () => (/* binding */ ACTIONS),
/* harmony export */   ACTION_TYPES: () => (/* binding */ ACTION_TYPES),
/* harmony export */   ACTION_VALUES: () => (/* binding */ ACTION_VALUES)
/* harmony export */ });
var ACTION_TYPES;
(function (ACTION_TYPES) {
  ACTION_TYPES[ACTION_TYPES["edit"] = 0] = "edit";
  ACTION_TYPES[ACTION_TYPES["copy"] = 1] = "copy";
  // share = 2,
  ACTION_TYPES[ACTION_TYPES["delete"] = 3] = "delete";
  ACTION_TYPES[ACTION_TYPES["deselect"] = 4] = "deselect";
  // paste = 5,
  // archived = 6,
  ACTION_TYPES[ACTION_TYPES["moveExercises"] = 7] = "moveExercises";
  ACTION_TYPES[ACTION_TYPES["note"] = 8] = "note";
  ACTION_TYPES[ACTION_TYPES["duplicate"] = 9] = "duplicate";
  ACTION_TYPES[ACTION_TYPES["rmCalculator"] = 10] = "rmCalculator";
  ACTION_TYPES[ACTION_TYPES["moveSets"] = 11] = "moveSets";
  ACTION_TYPES[ACTION_TYPES["viewSummary"] = 12] = "viewSummary";
  ACTION_TYPES[ACTION_TYPES["skipWorkout"] = 13] = "skipWorkout";
  ACTION_TYPES[ACTION_TYPES["unskipWorkout"] = 14] = "unskipWorkout";
  ACTION_TYPES[ACTION_TYPES["copyExercises"] = 15] = "copyExercises";
  ACTION_TYPES[ACTION_TYPES["addSet"] = 16] = "addSet";
  ACTION_TYPES[ACTION_TYPES["saveAsTemplate"] = 17] = "saveAsTemplate";
  ACTION_TYPES[ACTION_TYPES["manageBlocks"] = 18] = "manageBlocks";
  ACTION_TYPES[ACTION_TYPES["copyToWeek"] = 19] = "copyToWeek";
  ACTION_TYPES[ACTION_TYPES["stopWorkout"] = 20] = "stopWorkout";
})(ACTION_TYPES || (ACTION_TYPES = {}));
const ACTIONS = {
  // [ACTION_TYPES.archived]: {
  //   id: ACTION_TYPES.archived,
  //   value: 'Guardados',
  //   icon: 'bookmark',
  //   color: 'tertiary',
  // },
  [ACTION_TYPES.edit]: {
    id: ACTION_TYPES.edit,
    value: "ACTIONS.EDIT",
    icon: "pencil-outline",
    color: "alternative"
  },
  [ACTION_TYPES.copy]: {
    id: ACTION_TYPES.copy,
    value: "ACTIONS.COPY",
    icon: "copy-outline",
    color: "primary"
  },
  [ACTION_TYPES.note]: {
    id: ACTION_TYPES.note,
    value: "ACTIONS.NOTE",
    icon: "create-outline",
    color: "secondary"
  },
  // [ACTION_TYPES.share]: {
  //   id: ACTION_TYPES.share,
  //   value: 'Compartir',
  //   icon: 'share-social-outline',
  //   color: 'success',
  // },
  [ACTION_TYPES.delete]: {
    id: ACTION_TYPES.delete,
    value: "ACTIONS.DELETE",
    icon: "trash-outline",
    color: "danger"
  },
  [ACTION_TYPES.moveExercises]: {
    id: ACTION_TYPES.moveExercises,
    value: "ACTIONS.MOVE_EXERCISES",
    icon: "repeat-outline",
    color: "medium"
  },
  [ACTION_TYPES.deselect]: {
    id: ACTION_TYPES.deselect,
    value: "ACTIONS.DESELECT_ALL",
    icon: "remove-circle-outline",
    color: "danger"
  },
  // [ACTION_TYPES.paste]: {
  //   id: ACTION_TYPES.paste,
  //   value: 'Pegar',
  //   icon: 'clipboard-outline',
  //   color: 'secondary',
  // },
  [ACTION_TYPES.duplicate]: {
    id: ACTION_TYPES.duplicate,
    value: "ACTIONS.DUPLICATE",
    icon: "duplicate-outline",
    color: "secondary"
  },
  [ACTION_TYPES.rmCalculator]: {
    id: ACTION_TYPES.rmCalculator,
    value: "ACTIONS.RM_CALCULATOR",
    icon: "calculator-outline",
    color: "primary"
  },
  [ACTION_TYPES.moveSets]: {
    id: ACTION_TYPES.moveSets,
    value: "ACTIONS.MOVE_SETS",
    icon: "swap-vertical",
    color: "medium"
  },
  [ACTION_TYPES.addSet]: {
    id: ACTION_TYPES.addSet,
    value: "ACTIONS.ADD_SET",
    icon: "add-outline",
    color: "primary"
  },
  [ACTION_TYPES.viewSummary]: {
    id: ACTION_TYPES.viewSummary,
    value: "ACTIONS.VIEW_SUMMARY",
    icon: "stats-chart-outline",
    color: "primary"
  },
  [ACTION_TYPES.skipWorkout]: {
    id: ACTION_TYPES.skipWorkout,
    value: "ACTIONS.SKIP_WORKOUT",
    icon: "play-skip-forward-outline",
    color: "alternative"
  },
  [ACTION_TYPES.unskipWorkout]: {
    id: ACTION_TYPES.unskipWorkout,
    value: "ACTIONS.UNSKIP_WORKOUT",
    icon: "arrow-undo-outline",
    color: "medium"
  },
  [ACTION_TYPES.copyExercises]: {
    id: ACTION_TYPES.copyExercises,
    value: "ACTIONS.COPY_EXERCISES",
    icon: "copy-outline",
    color: "primary"
  },
  // Rediseño de entrenamiento (Fase A) — solo se añade al menú cuando el
  // componente padre está en modo panel del entrenador (isModal=true, ver
  // workout.component.ts#getActionsPopover), nunca en train-fit-front.
  [ACTION_TYPES.saveAsTemplate]: {
    id: ACTION_TYPES.saveAsTemplate,
    value: "ACTIONS.SAVE_AS_TEMPLATE",
    icon: "albums-outline",
    color: "tertiary"
  },
  // Rediseño de entrenamiento Fase B — abre la gestión real de bloques
  // (crear/renombrar/borrar) para este workout, integrada en el editor
  // (ver workout.component.ts#manageBlocksAlert), no en un panel aparte.
  [ACTION_TYPES.manageBlocks]: {
    id: ACTION_TYPES.manageBlocks,
    value: "ACTIONS.MANAGE_BLOCKS",
    icon: "layers-outline",
    color: "secondary"
  },
  // Planificador visual (Fase C) — solo se añade al menú en plannerMode (ver
  // workout.component.ts#getActionsPopover); copia esta card a otra semana
  // elegida por el trainer.
  [ACTION_TYPES.copyToWeek]: {
    id: ACTION_TYPES.copyToWeek,
    value: "PLANNER.COPY_TO_WEEK",
    icon: "arrow-redo-outline",
    color: "tertiary"
  },
  [ACTION_TYPES.stopWorkout]: {
    id: ACTION_TYPES.stopWorkout,
    value: "ACTIONS.STOP_WORKOUT",
    icon: "stop-outline",
    color: "danger"
  }
};
const ACTION_VALUES = Object.values(ACTIONS);

/***/ }),

/***/ 71636:
/*!***************************************************************************!*\
  !*** ../../node_modules/rxjs/dist/esm/internal/operators/debounceTime.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   debounceTime: () => (/* binding */ debounceTime)
/* harmony export */ });
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ 27248);
/* harmony import */ var _util_lift__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/lift */ 21138);
/* harmony import */ var _OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./OperatorSubscriber */ 68476);



function debounceTime(dueTime, scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__.asyncScheduler) {
  return (0,_util_lift__WEBPACK_IMPORTED_MODULE_1__.operate)((source, subscriber) => {
    let activeTask = null;
    let lastValue = null;
    let lastTime = null;
    const emit = () => {
      if (activeTask) {
        activeTask.unsubscribe();
        activeTask = null;
        const value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    };
    function emitWhenIdle() {
      const targetTime = lastTime + dueTime;
      const now = scheduler.now();
      if (now < targetTime) {
        activeTask = this.schedule(undefined, targetTime - now);
        subscriber.add(activeTask);
        return;
      }
      emit();
    }
    source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_2__.createOperatorSubscriber)(subscriber, value => {
      lastValue = value;
      lastTime = scheduler.now();
      if (!activeTask) {
        activeTask = scheduler.schedule(emitWhenIdle, dueTime);
        subscriber.add(activeTask);
      }
    }, () => {
      emit();
      subscriber.complete();
    }, undefined, () => {
      lastValue = activeTask = null;
    }));
  });
}

/***/ })

}]);
//# sourceMappingURL=default-src_app_features_diet-templates_models_diet-template_model_ts-src_app_shared_componen-13dfa4.js.map