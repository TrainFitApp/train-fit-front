"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_features_food-exchanges_food-exchanges_module_ts"],{

/***/ 34186:
/*!**************************************************************************!*\
  !*** ./src/app/features/food-exchanges/food-exchanges-routing.module.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FoodExchangesPageRoutingModule: () => (/* binding */ FoodExchangesPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _food_exchanges_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./food-exchanges.page */ 59612);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _FoodExchangesPageRoutingModule;




const routes = [{
  path: '',
  component: _food_exchanges_page__WEBPACK_IMPORTED_MODULE_1__.FoodExchangesPage
}];
class FoodExchangesPageRoutingModule {}
_FoodExchangesPageRoutingModule = FoodExchangesPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(FoodExchangesPageRoutingModule, "\u0275fac", function FoodExchangesPageRoutingModule_Factory(t) {
  return new (t || _FoodExchangesPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(FoodExchangesPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _FoodExchangesPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(FoodExchangesPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](FoodExchangesPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 84467:
/*!******************************************************************!*\
  !*** ./src/app/features/food-exchanges/food-exchanges.module.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FoodExchangesPageModule: () => (/* binding */ FoodExchangesPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _food_exchanges_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./food-exchanges-routing.module */ 34186);
/* harmony import */ var _food_exchanges_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./food-exchanges.page */ 59612);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);

var _FoodExchangesPageModule;




class FoodExchangesPageModule {}
_FoodExchangesPageModule = FoodExchangesPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(FoodExchangesPageModule, "\u0275fac", function FoodExchangesPageModule_Factory(t) {
  return new (t || _FoodExchangesPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(FoodExchangesPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _FoodExchangesPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(FoodExchangesPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _food_exchanges_routing_module__WEBPACK_IMPORTED_MODULE_2__.FoodExchangesPageRoutingModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](FoodExchangesPageModule, {
    declarations: [_food_exchanges_page__WEBPACK_IMPORTED_MODULE_3__.FoodExchangesPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _food_exchanges_routing_module__WEBPACK_IMPORTED_MODULE_2__.FoodExchangesPageRoutingModule]
  });
})();

/***/ }),

/***/ 59612:
/*!****************************************************************!*\
  !*** ./src/app/features/food-exchanges/food-exchanges.page.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FoodExchangesPage: () => (/* binding */ FoodExchangesPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _models_food_exchange_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/food-exchange.model */ 79130);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _services_food_exchanges_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./services/food-exchanges-api.service */ 50862);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 64409);


var _FoodExchangesPage;








function FoodExchangesPage_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "div", 19)(2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function FoodExchangesPage_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "No se pudieron cargar tus intercambios");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function FoodExchangesPage_div_14_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r6.load());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "Reintentar");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function FoodExchangesPage_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-icon", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Qu\u00E9 puede comer en lugar de qu\u00E9");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, " Define grupos de alimentos equivalentes y tus clientes podr\u00E1n consultarlos cuando no tengan lo pautado. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "Las equivalencias las decides t\u00FA");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, ": el sistema no calcula que 100 g de pollo equivalgan a 120 g de pavo, porque eso depende de si igualas prote\u00EDna, calor\u00EDas o volumen. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function FoodExchangesPage_div_15_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r9);
      const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r8.openEditor());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](10, "Crear mi primer grupo");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
}
function FoodExchangesPage_ul_16_li_1_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](group_r11.category);
  }
}
function FoodExchangesPage_ul_16_li_1_p_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-icon", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("", group_r11.equivalenceNote, " ");
  }
}
function FoodExchangesPage_ul_16_li_1_li_12_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](item_r17.note);
  }
}
function FoodExchangesPage_ul_16_li_1_li_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "li", 45)(1, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, FoodExchangesPage_ul_16_li_1_li_12_span_5_Template, 2, 1, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"]("", item_r17.quantity, " ", item_r17.unit, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](item_r17.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", item_r17.note);
  }
}
function FoodExchangesPage_ul_16_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "li", 28)(1, "div", 29)(2, "div", 30)(3, "h2", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, FoodExchangesPage_ul_16_li_1_span_5_Template, 2, 1, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "p", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, " Referencia: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](10, FoodExchangesPage_ul_16_li_1_p_10_Template, 3, 1, "p", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "ul", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](12, FoodExchangesPage_ul_16_li_1_li_12_Template, 6, 4, "li", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "div", 37)(14, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function FoodExchangesPage_ul_16_li_1_Template_button_click_14_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r22);
      const group_r11 = restoredCtx.$implicit;
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r21.openEditor(group_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](15, "ion-icon", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function FoodExchangesPage_ul_16_li_1_Template_button_click_16_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r22);
      const group_r11 = restoredCtx.$implicit;
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r23.confirmDelete(group_r11));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](17, "ion-icon", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const group_r11 = ctx.$implicit;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](group_r11.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", group_r11.category);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r10.referenceLabel(group_r11));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", group_r11.equivalenceNote);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", group_r11.items)("ngForTrackBy", ctx_r10.trackByIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("aria-label", "Editar " + group_r11.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("aria-label", "Eliminar " + group_r11.name);
  }
}
function FoodExchangesPage_ul_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ul", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](1, FoodExchangesPage_ul_16_li_1_Template, 18, 8, "li", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r3.groups)("ngForTrackBy", ctx_r3.trackByGroupId);
  }
}
function FoodExchangesPage_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function FoodExchangesPage_div_17_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r25);
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r24.closeEditor());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function FoodExchangesPage_div_18_option_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "option", 80);
  }
  if (rf & 2) {
    const suggestion_r34 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", suggestion_r34);
  }
}
function FoodExchangesPage_div_18_button_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r37 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function FoodExchangesPage_div_18_button_25_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r37);
      const base_r35 = restoredCtx.$implicit;
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r36.setBasis(base_r35.key));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const base_r35 = ctx.$implicit;
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("selected", ctx_r27.basis === base_r35.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("aria-pressed", ctx_r27.basis === base_r35.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", base_r35.label, " ");
  }
}
function FoodExchangesPage_div_18_div_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r39 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 82)(1, "label", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "lowercase");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 55)(5, "input", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function FoodExchangesPage_div_18_div_26_Template_input_ngModelChange_5_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r39);
      const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r38.basisAmount = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate2"](" Una raci\u00F3n = \u00BFcu\u00E1ntos ", ctx_r28.basisUnit, " de ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 3, ctx_r28.basisLabel), "? ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r28.basisAmount);
  }
}
function FoodExchangesPage_div_18_div_27_p_7_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const result_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" (", result_r41.exact, " exactas) ");
  }
}
function FoodExchangesPage_div_18_div_27_p_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, " Son ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](4, " raci\u00F3n(es) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](5, FoodExchangesPage_div_18_div_27_p_7_span_5_Template, 2, 1, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const result_r41 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](result_r41.rounded);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", result_r41.exact !== result_r41.rounded);
  }
}
function FoodExchangesPage_div_18_div_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 85)(1, "label", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](3, "lowercase");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "ion-icon", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "input", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function FoodExchangesPage_div_18_div_27_Template_input_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r45);
      const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r44.labelAmount = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, FoodExchangesPage_div_18_div_27_p_7_Template, 6, 2, "p", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" Calculadora: ", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](3, 4, ctx_r29.basisLabel), " de una etiqueta ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("placeholder", "\u00BFCu\u00E1ntos " + ctx_r29.basisUnit + " pone?")("ngModel", ctx_r29.labelAmount);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r29.calculatedExchanges);
  }
}
function FoodExchangesPage_div_18_div_32_option_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "option", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const unit_r50 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", unit_r50);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](unit_r50);
  }
}
function FoodExchangesPage_div_18_div_32_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r53 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function FoodExchangesPage_div_18_div_32_button_10_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r53);
      const i_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().index;
      const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r51.removeItem(i_r47));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-icon", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const i_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]().index;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("aria-label", "Quitar el alimento " + (i_r47 + 1));
  }
}
function FoodExchangesPage_div_18_div_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r56 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 93)(1, "span", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 95)(4, "input", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function FoodExchangesPage_div_18_div_32_Template_input_ngModelChange_4_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r56);
      const item_r46 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](item_r46.name = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 97)(6, "input", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function FoodExchangesPage_div_18_div_32_Template_input_ngModelChange_6_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r56);
      const item_r46 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](item_r46.quantity = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "select", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function FoodExchangesPage_div_18_div_32_Template_select_ngModelChange_7_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r56);
      const item_r46 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](item_r46.unit = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](8, FoodExchangesPage_div_18_div_32_option_8_Template, 2, 2, "option", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "input", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function FoodExchangesPage_div_18_div_32_Template_input_ngModelChange_9_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r56);
      const item_r46 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](item_r46.note = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](10, FoodExchangesPage_div_18_div_32_button_10_Template, 2, 1, "button", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const item_r46 = ctx.$implicit;
    const i_r47 = ctx.index;
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵclassProp"]("item-index--reference", i_r47 === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", i_r47 === 0 ? "Ref." : i_r47 + 1, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", item_r46.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("aria-label", "Nombre del alimento " + (i_r47 + 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", item_r46.quantity);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("aria-label", "Cantidad del alimento " + (i_r47 + 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", item_r46.unit);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("aria-label", "Unidad del alimento " + (i_r47 + 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r30.units);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", item_r46.note);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("aria-label", "Nota del alimento " + (i_r47 + 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r30.items.length > 2);
  }
}
function FoodExchangesPage_div_18_p_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "p", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r31.validationError);
  }
}
function FoodExchangesPage_div_18_span_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx_r32.editingId ? "Guardar" : "Crear grupo");
  }
}
function FoodExchangesPage_div_18_ion_spinner_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "ion-spinner", 104);
  }
}
function FoodExchangesPage_div_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r61 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "h2", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "label", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "Nombre");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 55)(7, "input", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function FoodExchangesPage_div_18_Template_input_ngModelChange_7_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r61);
      const ctx_r60 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r60.name = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](8, "label", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](9, "Categor\u00EDa ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "span", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](11, "(opcional)");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "div", 55)(13, "input", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function FoodExchangesPage_div_18_Template_input_ngModelChange_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r61);
      const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r62.category = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](14, "datalist", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](15, FoodExchangesPage_div_18_option_15_Template, 1, 1, "option", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "label", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17, "\u00BFEn qu\u00E9 son equivalentes?");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "div", 55)(19, "input", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function FoodExchangesPage_div_18_Template_input_ngModelChange_19_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r61);
      const ctx_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r63.equivalenceNote = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "h3", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21, "\u00BFCu\u00E1nto es una raci\u00F3n? (opcional)");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](22, "p", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](23, " Si lo dices, la app te calcula cu\u00E1ntas raciones es cualquier etiqueta. Si no, el grupo sigue siendo una lista de equivalencias escritas a mano. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](25, FoodExchangesPage_div_18_button_25_Template, 2, 4, "button", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](26, FoodExchangesPage_div_18_div_26_Template, 6, 5, "div", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](27, FoodExchangesPage_div_18_div_27_Template, 8, 6, "div", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "h3", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](29, "Alimentos");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](30, "p", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](31, "El primero es la referencia: los dem\u00E1s se leen contra \u00E9l.");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](32, FoodExchangesPage_div_18_div_32_Template, 11, 13, "div", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](33, "button", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function FoodExchangesPage_div_18_Template_button_click_33_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r61);
      const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r64.addItem());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](34, "ion-icon", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](35, "A\u00F1adir alimento ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](36, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](37, FoodExchangesPage_div_18_p_37_Template, 2, 1, "p", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](38, "div", 75)(39, "button", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function FoodExchangesPage_div_18_Template_button_click_39_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r61);
      const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r65.closeEditor());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](40, "Cancelar");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](41, "button", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function FoodExchangesPage_div_18_Template_button_click_41_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r61);
      const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r66.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](42, FoodExchangesPage_div_18_span_42_Template, 2, 1, "span", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](43, FoodExchangesPage_div_18_ion_spinner_43_Template, 1, 0, "ion-spinner", 79);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" ", ctx_r5.editingId ? "Editar grupo" : "Nuevo grupo de intercambio", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r5.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r5.category);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r5.categorySuggestions);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r5.equivalenceNote);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r5.bases)("ngForTrackBy", ctx_r5.trackByIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r5.basis);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r5.hasBasis);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r5.items)("ngForTrackBy", ctx_r5.trackByIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r5.validationError);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx_r5.isSaving);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r5.isSaving);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r5.isSaving);
  }
}
// Fase 5 Coach Pro — grupos de intercambio (§16).
//
// El primer alimento de la lista es la REFERENCIA: el resto se leen contra
// él ("100 g de pollo ≈ 120 g de pavo"). Eso hace innecesario un campo
// "cantidad base" aparte y evita que el coach tenga que repetirla en cada
// fila.
class FoodExchangesPage {
  constructor(foodExchangesApi, ionicUtilService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "foodExchangesApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "categorySuggestions", _models_food_exchange_model__WEBPACK_IMPORTED_MODULE_2__.EXCHANGE_CATEGORY_SUGGESTIONS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "units", _models_food_exchange_model__WEBPACK_IMPORTED_MODULE_2__.EXCHANGE_UNITS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "state", 'loading');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "groups", []);
    // --- Editor ---
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "showEditor", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "editingId", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isSaving", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "name", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "category", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "equivalenceNote", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "items", []);
    // --- Movimiento 5 Coach Pro: base numérica y calculadora de etiquetas ---
    //
    // Esto NO convierte un alimento en otro: la regla de fondo del componente
    // sigue siendo que el sistema no asume equivalencias. Lo que permite es
    // que, cuando el coach YA ha decidido que su ración de hidratos son 15 g,
    // la app le diga que un producto con 30 g por ración son 2 raciones. La
    // aritmética la hace la app; la decisión, él — y por eso es opcional.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "bases", _models_food_exchange_model__WEBPACK_IMPORTED_MODULE_2__.EXCHANGE_BASES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "basis", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "basisAmount", null);
    // Lo que el coach teclea de la etiqueta que tiene delante. No se guarda:
    // es una cuenta de usar y tirar mientras define el grupo.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "labelAmount", null);
    this.foodExchangesApi = foodExchangesApi;
    this.ionicUtilService = ionicUtilService;
  }
  ionViewWillEnter() {
    this.load();
  }
  load() {
    this.state = 'loading';
    this.foodExchangesApi.getMine().subscribe({
      next: groups => {
        this.groups = groups;
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      }
    });
  }
  openEditor(group) {
    this.editingId = group?._id || null;
    this.name = group?.name || '';
    this.category = group?.category || '';
    this.equivalenceNote = group?.equivalenceNote || '';
    this.basis = group?.basis || null;
    this.basisAmount = group?.basisAmount ?? null;
    this.labelAmount = null;
    // Un grupo nuevo arranca con dos filas: uno solo no es un intercambio, y
    // empezar con cero obliga a entender el modelo antes de poder escribir.
    this.items = group ? group.items.map(item => ({
      ...item
    })) : [this.emptyItem(), this.emptyItem()];
    this.showEditor = true;
  }
  // --- Movimiento 5 Coach Pro: calculadora de etiquetas ---
  get hasBasis() {
    return !!this.basis && Number(this.basisAmount) > 0;
  }
  get basisUnit() {
    return this.bases.find(base => base.key === this.basis)?.unit || 'g';
  }
  get basisLabel() {
    return this.bases.find(base => base.key === this.basis)?.label || '';
  }
  /**
   * Cuántas raciones son los `labelAmount` que el coach acaba de leer en una
   * etiqueta. Redondeado a media ración: "1,37 raciones de pan" no es una
   * instrucción que nadie pueda seguir.
   *
   * Devuelve null cuando falta algo, en vez de un 0 que se leería como "este
   * producto no cuenta".
   */
  get calculatedExchanges() {
    if (!this.hasBasis) return null;
    const amount = Number(this.labelAmount);
    if (!Number.isFinite(amount) || amount <= 0) return null;
    const exact = amount / Number(this.basisAmount);
    return {
      exact: Math.round(exact * 100) / 100,
      rounded: Math.round(exact * 2) / 2
    };
  }
  setBasis(basis) {
    // Volver a pulsar la base marcada la quita: el grupo vuelve a ser una
    // lista escrita a mano, que es un estado válido y el que tenían todos
    // los grupos antes de esto.
    this.basis = this.basis === basis ? null : basis;
  }
  closeEditor() {
    this.showEditor = false;
  }
  emptyItem() {
    return {
      name: '',
      quantity: 100,
      unit: 'g',
      note: ''
    };
  }
  addItem() {
    if (this.items.length >= 20) return;
    this.items = [...this.items, this.emptyItem()];
  }
  removeItem(index) {
    if (this.items.length <= 2) return;
    this.items = this.items.filter((_, i) => i !== index);
  }
  get validationError() {
    if (!this.name.trim()) return 'Ponle un nombre al grupo.';
    if (this.items.length < 2) return 'Un intercambio necesita al menos 2 alimentos.';
    for (const item of this.items) {
      if (!item.name.trim()) return 'Todos los alimentos necesitan un nombre.';
      if (!(Number(item.quantity) > 0)) {
        return `"${item.name || 'Sin nombre'}" necesita una cantidad mayor que 0.`;
      }
    }
    return null;
  }
  save() {
    const error = this.validationError;
    if (error) {
      void this.ionicUtilService.showWarningToast(error);
      return;
    }
    if (this.isSaving) return;
    this.isSaving = true;
    const payload = {
      name: this.name.trim(),
      category: this.category.trim(),
      equivalenceNote: this.equivalenceNote.trim(),
      // Los dos van juntos o no van: una base sin cantidad ("iguala
      // hidratos", ¿cuántos?) no permite calcular nada, y una cantidad sin
      // base no significa nada. El backend aplica la misma regla.
      basis: this.hasBasis ? this.basis : null,
      basisAmount: this.hasBasis ? Number(this.basisAmount) : null,
      items: this.items.map(item => ({
        ...item,
        name: item.name.trim(),
        quantity: Number(item.quantity),
        note: (item.note || '').trim()
      }))
    };
    const request$ = this.editingId ? this.foodExchangesApi.update(this.editingId, payload) : this.foodExchangesApi.create(payload);
    request$.subscribe({
      next: () => {
        this.isSaving = false;
        this.showEditor = false;
        this.load();
      },
      error: error => {
        this.isSaving = false;
        void this.ionicUtilService.showErrorToast(error, 'No se pudo guardar el grupo');
      }
    });
  }
  confirmDelete(group) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.ionicUtilService.showAlert({
        header: 'Eliminar grupo',
        message: `"${group.name}" dejará de estar disponible para tus clientes.`,
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            _this.foodExchangesApi.remove(group._id).subscribe({
              next: () => {
                _this.groups = _this.groups.filter(g => g._id !== group._id);
              },
              error: error => void _this.ionicUtilService.showErrorToast(error, 'No se pudo eliminar el grupo')
            });
          }
        }]
      });
    })();
  }
  // "100 g de pollo" — la referencia contra la que se leen los demás.
  referenceLabel(group) {
    const first = group.items?.[0];
    if (!first) return '';
    return `${first.quantity} ${first.unit} de ${first.name}`;
  }
  trackByGroupId(_index, group) {
    return group._id;
  }
  trackByIndex(index) {
    return index;
  }
}
_FoodExchangesPage = FoodExchangesPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(FoodExchangesPage, "\u0275fac", function FoodExchangesPage_Factory(t) {
  return new (t || _FoodExchangesPage)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_services_food_exchanges_api_service__WEBPACK_IMPORTED_MODULE_3__.FoodExchangesApiService), _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_4__.IonicUtilService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(FoodExchangesPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: _FoodExchangesPage,
  selectors: [["app-food-exchanges"]],
  decls: 19,
  vars: 6,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["type", "button", "routerLink", "/tabs/templates", "aria-label", "Volver a plantillas", 1, "tf-page-header__back-button"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], ["type", "button", "aria-label", "Nuevo grupo de intercambio", 1, "tf-page-header__back-button", 3, "click"], ["name", "add-outline"], [1, "exchanges-content"], ["class", "page-skeleton", 4, "ngIf"], ["class", "page-state", 4, "ngIf"], ["class", "page-state page-state--intro", 4, "ngIf"], ["class", "group-list", 4, "ngIf"], ["class", "panel-backdrop", 3, "click", 4, "ngIf"], ["class", "panel-sheet", "role", "dialog", "aria-modal", "true", "aria-labelledby", "exchange-editor-title", 4, "ngIf"], [1, "page-skeleton"], [1, "skeleton-block", "group-card-skeleton"], [1, "page-state"], ["name", "cloud-offline-outline", "aria-hidden", "true"], ["type", "button", 1, "retry-button", 3, "click"], [1, "page-state", "page-state--intro"], ["name", "swap-horizontal-outline", "aria-hidden", "true"], ["type", "button", 1, "primary-button", 3, "click"], [1, "group-list"], ["class", "group-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "group-card"], [1, "group-main"], [1, "group-head"], [1, "group-name"], ["class", "category-chip", 4, "ngIf"], [1, "group-reference"], ["class", "group-note", 4, "ngIf"], [1, "item-preview"], ["class", "item-preview-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "group-actions"], ["type", "button", 1, "icon-button", 3, "click"], ["name", "create-outline", "aria-hidden", "true"], ["type", "button", 1, "icon-button", "icon-button--danger", 3, "click"], ["name", "trash-outline", "aria-hidden", "true"], [1, "category-chip"], [1, "group-note"], ["name", "information-circle-outline", "aria-hidden", "true"], [1, "item-preview-row"], [1, "item-quantity"], [1, "item-name"], ["class", "item-note", 4, "ngIf"], [1, "item-note"], [1, "panel-backdrop", 3, "click"], ["role", "dialog", "aria-modal", "true", "aria-labelledby", "exchange-editor-title", 1, "panel-sheet"], ["aria-hidden", "true", 1, "panel-handle"], ["id", "exchange-editor-title", 1, "panel-title"], ["for", "exchange-name", 1, "field-label"], [1, "input-wrapper"], ["id", "exchange-name", "type", "text", "maxlength", "100", "placeholder", "Fuentes de prote\u00EDna", 1, "input-field", 3, "ngModel", "ngModelChange"], ["for", "exchange-category", 1, "field-label"], [1, "field-optional"], ["id", "exchange-category", "type", "text", "maxlength", "50", "placeholder", "Prote\u00EDna", "list", "exchange-categories", 1, "input-field", 3, "ngModel", "ngModelChange"], ["id", "exchange-categories"], [3, "value", 4, "ngFor", "ngForOf"], ["for", "exchange-note", 1, "field-label"], ["id", "exchange-note", "type", "text", "maxlength", "300", "placeholder", "Equivalen en prote\u00EDna, no en calor\u00EDas", 1, "input-field", 3, "ngModel", "ngModelChange"], [1, "section-title"], [1, "section-hint"], [1, "basis-picker"], ["type", "button", "class", "basis-option", 3, "selected", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "basis-amount", 4, "ngIf"], ["class", "label-calculator", 4, "ngIf"], ["class", "item-editor", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "add-row-button", 3, "click"], ["name", "add-outline", "aria-hidden", "true"], [1, "panel-actions"], ["class", "save-error", 4, "ngIf"], [1, "panel-buttons"], ["type", "button", 1, "cancel-button", 3, "click"], ["type", "button", 1, "submit-button", 3, "disabled", "click"], [4, "ngIf"], ["name", "dots", 4, "ngIf"], [3, "value"], ["type", "button", 1, "basis-option", 3, "click"], [1, "basis-amount"], ["for", "basis-amount", 1, "field-label"], ["id", "basis-amount", "type", "number", "min", "0", "step", "0.1", "placeholder", "15", 1, "input-field", 3, "ngModel", "ngModelChange"], [1, "label-calculator"], ["for", "label-amount", 1, "field-label"], ["name", "calculator-outline", 1, "input-icon"], ["id", "label-amount", "type", "number", "min", "0", "step", "0.1", 1, "input-field", 3, "placeholder", "ngModel", "ngModelChange"], ["class", "calculator-result", 4, "ngIf"], [1, "calculator-result"], ["class", "calculator-exact", 4, "ngIf"], [1, "calculator-exact"], [1, "item-editor"], ["aria-hidden", "true", 1, "item-index"], [1, "item-fields"], ["type", "text", "maxlength", "120", "placeholder", "Pechuga de pollo", 1, "builder-input", 3, "ngModel", "ngModelChange"], [1, "quantity-row"], ["type", "number", "min", "0", 1, "builder-input", "builder-input--narrow", 3, "ngModel", "ngModelChange"], [1, "builder-select", 3, "ngModel", "ngModelChange"], ["type", "text", "maxlength", "200", "placeholder", "nota (en crudo\u2026)", 1, "builder-input", 3, "ngModel", "ngModelChange"], ["type", "button", "class", "icon-button", 3, "click", 4, "ngIf"], ["name", "close-outline", "aria-hidden", "true"], [1, "save-error"], ["name", "dots"]],
  template: function FoodExchangesPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "ion-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 6)(7, "h1", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8, "Intercambios");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "div", 8)(10, "button", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function FoodExchangesPage_Template_button_click_10_listener() {
        return ctx.openEditor();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](11, "ion-icon", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "ion-content", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, FoodExchangesPage_div_13_Template, 3, 0, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, FoodExchangesPage_div_14_Template, 6, 0, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](15, FoodExchangesPage_div_15_Template, 11, 0, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](16, FoodExchangesPage_ul_16_Template, 2, 2, "ul", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](17, FoodExchangesPage_div_17_Template, 1, 0, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](18, FoodExchangesPage_div_18_Template, 44, 15, "div", 17);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](13);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.state === "loading");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.state === "error");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.state === "loaded" && !ctx.groups.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.state === "loaded" && ctx.groups.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.showEditor);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.showEditor);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonSpinner, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.RouterLinkDelegate, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterLink, _angular_common__WEBPACK_IMPORTED_MODULE_6__.LowerCasePipe],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-backdrop-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-sheet-in {\n  from {\n    transform: translateY(16px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-side-panel-in {\n  from {\n    transform: translateX(24px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n.exchanges-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 20px;\n  --padding-end: 20px;\n  --padding-top: 12px;\n  --padding-bottom: 32px;\n}\n\n.page-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-4);\n}\n\n.skeleton-block[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n  border-radius: var(--tf-radius-lg);\n}\n.skeleton-block[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n\n.group-card-skeleton[_ngcontent-%COMP%] {\n  height: 160px;\n}\n\n.page-state[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: var(--tf-space-3);\n  padding: var(--tf-space-12) var(--tf-space-6);\n  color: var(--tf-text-muted);\n}\n.page-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 34px;\n  color: var(--tf-text-faint);\n}\n.page-state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-lg);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n.page-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-sm);\n  line-height: var(--tf-line-height-base);\n  max-width: 56ch;\n}\n.page-state[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--tf-text-secondary);\n}\n\n.page-state--intro[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--tf-accent);\n}\n\n.retry-button[_ngcontent-%COMP%] {\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-5);\n  background: var(--tf-surface-5);\n  color: var(--tf-text);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-sm);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  font-weight: 700;\n  cursor: pointer;\n}\n.retry-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.primary-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: var(--tf-radius-lg);\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-6);\n  margin-top: var(--tf-space-2);\n  font-size: var(--tf-font-size-base);\n}\n.primary-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.primary-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.primary-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n\n.group-list[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-3);\n}\n\n.group-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--tf-space-3);\n  padding: var(--tf-space-4);\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n}\n\n.group-main[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.group-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n  flex-wrap: wrap;\n}\n\n.group-name[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-md);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.category-chip[_ngcontent-%COMP%] {\n  padding: 2px var(--tf-space-2);\n  border-radius: var(--tf-radius-pill);\n  background: var(--tf-surface-4);\n  color: var(--tf-text-secondary);\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n}\n\n.group-reference[_ngcontent-%COMP%] {\n  margin: var(--tf-space-2) 0 0;\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-muted);\n}\n.group-reference[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--tf-text-secondary);\n  font-weight: 600;\n}\n\n.group-note[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--tf-space-2);\n  margin: var(--tf-space-3) 0 0;\n  padding: var(--tf-space-2) var(--tf-space-3);\n  border-radius: var(--tf-radius-sm);\n  background: var(--tf-surface-2);\n  color: var(--tf-text-secondary);\n  font-size: var(--tf-font-size-xs);\n  line-height: var(--tf-line-height-base);\n}\n.group-note[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  margin-top: 1px;\n  font-size: 14px;\n  color: var(--tf-text-muted);\n}\n\n.item-preview[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: var(--tf-space-3) 0 0;\n  padding: 0;\n}\n\n.item-preview-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  gap: var(--tf-space-3);\n  padding: 3px 0;\n  font-size: var(--tf-font-size-sm);\n}\n\n.item-quantity[_ngcontent-%COMP%] {\n  min-width: 8ch;\n  text-align: right;\n  color: var(--tf-text);\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n}\n\n.item-name[_ngcontent-%COMP%] {\n  color: var(--tf-text-secondary);\n}\n\n.item-note[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  font-size: var(--tf-font-size-xs);\n}\n\n.group-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n  flex-shrink: 0;\n}\n\n.icon-button[_ngcontent-%COMP%] {\n  --background: var(--tf-surface-3);\n  --background-activated: var(--tf-surface-4);\n  --background-hover: var(--tf-surface-4);\n  --background-focused: var(--tf-surface-4);\n  --color: var(--tf-text-secondary);\n  --border-radius: var(--tf-radius-sm);\n  --padding-start: 0;\n  --padding-end: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  background: var(--tf-surface-3);\n  color: var(--tf-text-secondary);\n  border: none;\n  border-radius: var(--tf-radius-sm);\n  width: var(--tf-touch-min);\n  height: var(--tf-touch-min);\n  min-width: var(--tf-touch-min);\n  min-height: var(--tf-touch-min);\n  margin: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: background var(--tf-duration-fast) var(--tf-ease-out), color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.icon-button[_ngcontent-%COMP%]:active {\n  background: var(--tf-surface-4);\n}\n.icon-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.icon-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.icon-button--danger[_ngcontent-%COMP%]:hover {\n  background: var(--tf-danger-soft);\n  color: var(--tf-danger-text);\n}\n\n.panel-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: var(--tf-overlay);\n  z-index: var(--tf-z-modal-backdrop, 400);\n  animation: _ngcontent-%COMP%_tf-backdrop-in 200ms var(--tf-ease-out) both;\n}\n@media (prefers-reduced-motion: reduce) {\n  .panel-backdrop[_ngcontent-%COMP%] {\n    animation: none;\n    opacity: 1;\n  }\n}\n\n.panel-sheet[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: var(--tf-z-modal, 500);\n  background: var(--tf-surface-1);\n  border-top: 1px solid var(--tf-border-strong);\n  border-radius: 20px 20px 0 0;\n  padding: 10px 16px 24px;\n  max-height: 80vh;\n  overflow-y: auto;\n  animation: _ngcontent-%COMP%_tf-sheet-in 260ms var(--tf-ease-out) both;\n}\n@media (prefers-reduced-motion: reduce) {\n  .panel-sheet[_ngcontent-%COMP%] {\n    animation: none;\n    opacity: 1;\n    transform: none;\n  }\n}\n@media (min-width: 768px) {\n  .panel-sheet[_ngcontent-%COMP%] {\n    max-width: 640px;\n    margin: 0 auto;\n    right: 0;\n    left: 0;\n  }\n}\n\n.panel-handle[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 4px;\n  border-radius: 2px;\n  background: var(--tf-border-strongest);\n  margin: 0 auto 14px;\n}\n\n.panel-title[_ngcontent-%COMP%] {\n  margin: 0 0 var(--tf-space-4);\n  font-size: var(--tf-font-size-lg);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.section-title[_ngcontent-%COMP%] {\n  margin: var(--tf-space-6) 0 var(--tf-space-1);\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  color: var(--tf-text-secondary);\n}\n\n.section-hint[_ngcontent-%COMP%] {\n  margin: 0 0 var(--tf-space-3);\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-text-muted);\n}\n\n.field-label[_ngcontent-%COMP%] {\n  display: block;\n  margin: var(--tf-space-3) 0 var(--tf-space-2);\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n  color: var(--tf-text-secondary);\n}\n\n.field-optional[_ngcontent-%COMP%] {\n  font-weight: 400;\n  color: var(--tf-text-muted);\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n  height: var(--tf-touch-min);\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.input-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n  font-size: var(--tf-font-size-base);\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.item-editor[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--tf-space-2);\n  margin-bottom: var(--tf-space-2);\n  padding: var(--tf-space-3);\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-md);\n}\n\n.item-index[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  min-width: 34px;\n  padding-top: 12px;\n  color: var(--tf-text-muted);\n  font-size: var(--tf-font-size-xs);\n  font-weight: 700;\n  text-align: center;\n}\n.item-index--reference[_ngcontent-%COMP%] {\n  color: var(--tf-accent-text);\n}\n\n.item-fields[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-2);\n}\n\n.quantity-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--tf-space-2);\n  flex-wrap: wrap;\n}\n\n.builder-input[_ngcontent-%COMP%], .builder-select[_ngcontent-%COMP%] {\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-3);\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-sm);\n  color: var(--tf-text);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  flex: 1;\n  min-width: 0;\n}\n.builder-input[_ngcontent-%COMP%]::placeholder, .builder-select[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n.builder-input[_ngcontent-%COMP%]:focus-visible, .builder-select[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.builder-input--narrow[_ngcontent-%COMP%] {\n  flex: 0 0 88px;\n  font-variant-numeric: tabular-nums;\n}\n\n.builder-select[_ngcontent-%COMP%] {\n  flex: 0 0 84px;\n  padding-right: var(--tf-space-6);\n  cursor: pointer;\n  -webkit-appearance: none;\n          appearance: none;\n  background-image: linear-gradient(45deg, transparent 50%, var(--tf-text-muted) 50%), linear-gradient(135deg, var(--tf-text-muted) 50%, transparent 50%);\n  background-position: calc(100% - 15px) calc(50% + 2px), calc(100% - 10px) calc(50% + 2px);\n  background-size: 5px 5px, 5px 5px;\n  background-repeat: no-repeat;\n}\n.builder-select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  background: var(--tf-surface-1);\n  color: var(--tf-text);\n}\n\n.add-row-button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n  min-height: var(--tf-touch-min);\n  margin-top: var(--tf-space-2);\n  padding: 0 var(--tf-space-4);\n  background: transparent;\n  border: 1px dashed var(--tf-border-strong);\n  border-radius: var(--tf-radius-md);\n  color: var(--tf-text-secondary);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  cursor: pointer;\n}\n.add-row-button[_ngcontent-%COMP%]:hover {\n  border-color: var(--tf-accent-soft-border);\n  color: var(--tf-text);\n}\n.add-row-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.add-row-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n\n.panel-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-3);\n  margin-top: var(--tf-space-6);\n}\n\n.save-error[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-muted);\n}\n\n.panel-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--tf-space-3);\n}\n\n.cancel-button[_ngcontent-%COMP%] {\n  flex: 1;\n  height: var(--tf-touch-min);\n  background: var(--tf-surface-3);\n  color: var(--tf-text-secondary);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n  font-family: inherit;\n  font-size: var(--tf-font-size-base);\n  font-weight: 600;\n  cursor: pointer;\n}\n.cancel-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: var(--tf-radius-lg);\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  flex: 1;\n  height: var(--tf-touch-min);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: var(--tf-font-size-base);\n}\n.submit-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n\n.basis-picker[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  margin-bottom: var(--tf-space-3);\n}\n\n.basis-option[_ngcontent-%COMP%] {\n  min-height: 44px;\n  padding: 0 var(--tf-space-4);\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-pill);\n  color: var(--tf-text-muted);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  cursor: pointer;\n  transition: border-color var(--tf-duration-fast) var(--tf-ease-out), background var(--tf-duration-fast) var(--tf-ease-out), color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.basis-option.selected[_ngcontent-%COMP%] {\n  border-color: var(--tf-accent);\n  background: var(--tf-accent-soft);\n  color: var(--tf-text);\n}\n.basis-option[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.basis-amount[_ngcontent-%COMP%], .label-calculator[_ngcontent-%COMP%] {\n  margin-bottom: var(--tf-space-3);\n}\n\n.calculator-result[_ngcontent-%COMP%] {\n  margin: var(--tf-space-2) 0 0;\n  padding: 10px 12px;\n  border-radius: var(--tf-radius-md);\n  background: var(--tf-accent-soft);\n  color: var(--tf-accent-text);\n  font-size: var(--tf-font-size-sm);\n  line-height: 1.45;\n}\n.calculator-result[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-md);\n}\n\n.calculator-exact[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  font-size: var(--tf-font-size-xs);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZm9vZC1leGNoYW5nZXMvZm9vZC1leGNoYW5nZXMucGFnZS5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19wYW5lbC1zaGVldC5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19idXR0b25zLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX2lucHV0cy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXlCQTtFQUNFO0lBQ0UsMkJBQUE7RUN4QkY7QUFDRjtBQ29EQTtFQUNFO0lBQ0UsVUFBQTtFRGxERjtFQ29EQTtJQUNFLFVBQUE7RURsREY7QUFDRjtBQ3FEQTtFQUNFO0lBQ0UsMkJBQUE7SUFDQSxVQUFBO0VEbkRGO0VDcURBO0lBQ0Usd0JBQUE7SUFDQSxVQUFBO0VEbkRGO0FBQ0Y7QUNxSEE7RUFDRTtJQUNFLDJCQUFBO0lBQ0EsVUFBQTtFRG5IRjtFQ3FIQTtJQUNFLHdCQUFBO0lBQ0EsVUFBQTtFRG5IRjtBQUNGO0FBM0JBO0VBQ0UsMEJBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtBQTZCRjs7QUExQkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtBQTZCRjs7QUExQkE7RURkRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7RUNjQSxrQ0FBQTtBQStCRjtBRDNDRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSw0QkFBQTtFQUNBLCtFQUFBO0VBQ0EsbUNBQUE7QUM2Q0o7QUQxQ0U7RUFDRTtJQUNFLGVBQUE7RUM0Q0o7QUFDRjs7QUF6Q0E7RUFDRSxhQUFBO0FBNENGOztBQXpDQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQkFBQTtFQUNBLDZDQUFBO0VBQ0EsMkJBQUE7QUE0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QkFBQTtFQUNBLGlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsNEtBQUE7QUFvSUY7QUFoSUU7RUFDRSw4QkFBQTtFQUNBLGlDQUFBO0VBQ0EscUJBQUE7QUFrSUo7QUEvSEU7RUFDRSxtQ0FBQTtFQUNBLG1CQUFBO0FBaUlKOztBQTdIQTs7RUFFRSxnQ0FBQTtBQWdJRjs7QUEzSEE7RUFDRSw2QkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0NBQUE7RUFDQSxpQ0FBQTtFQUNBLDRCQUFBO0VBQ0EsaUNBQUE7RUFDQSxpQkFBQTtBQThIRjtBQTVIRTtFQUNFLGlDQUFBO0FBOEhKOztBQXhIQTtFQUNFLDJCQUFBO0VBQ0EsaUNBQUE7QUEySEYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTa2VsZXRvbiBkZSBjYXJnYSBjb24gYmFycmlkbyBkZSBzaGltbWVyIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gbGl0ZXJhbG1lbnRlXG4vLyBlbiB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgKGJvcmRlci1yYWRpdXMsIGhlaWdodCwgd2lkdGgsIHZhcmlhbnRlcyBjb24gbm9tYnJlKS5cbkBtaXhpbiB0Zi1za2VsZXRvbi1zaGltbWVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuXG4gICY6OmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHRyYW5zcGFyZW50LCB2YXIoLS10Zi1zaGltbWVyKSwgdHJhbnNwYXJlbnQpO1xuICAgIGFuaW1hdGlvbjogdGYtc2hpbW1lciAxLjRzIGluZmluaXRlO1xuICB9XG5cbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICAmOjphZnRlciB7XG4gICAgICBhbmltYXRpb246IG5vbmU7XG4gICAgfVxuICB9XG59XG5cbkBrZXlmcmFtZXMgdGYtc2hpbW1lciB7XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgfVxufVxuIiwiQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvc2tlbGV0b24nO1xuQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvYnV0dG9ucyc7XG5AaW1wb3J0ICcuLi8uLi8uLi90aGVtZS9wYW5lbC1zaGVldCc7XG5AaW1wb3J0ICcuLi8uLi8uLi90aGVtZS9pbnB1dHMnO1xuXG4uZXhjaGFuZ2VzLWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLXRmLWJnKTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAyMHB4O1xuICAtLXBhZGRpbmctZW5kOiAyMHB4O1xuICAtLXBhZGRpbmctdG9wOiAxMnB4O1xuICAtLXBhZGRpbmctYm90dG9tOiAzMnB4O1xufVxuXG4ucGFnZS1za2VsZXRvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtNCk7XG59XG5cbi5za2VsZXRvbi1ibG9jayB7XG4gIEBpbmNsdWRlIHRmLXNrZWxldG9uLXNoaW1tZXI7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1sZyk7XG59XG5cbi5ncm91cC1jYXJkLXNrZWxldG9uIHtcbiAgaGVpZ2h0OiAxNjBweDtcbn1cblxuLnBhZ2Utc3RhdGUge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTEyKSB2YXIoLS10Zi1zcGFjZS02KTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDM0cHg7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtZmFpbnQpO1xuICB9XG5cbiAgaDIge1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1sZyk7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIH1cblxuICBwIHtcbiAgICBtYXJnaW46IDA7XG4gICAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICAgIGxpbmUtaGVpZ2h0OiB2YXIoLS10Zi1saW5lLWhlaWdodC1iYXNlKTtcbiAgICBtYXgtd2lkdGg6IDU2Y2g7XG4gIH1cblxuICBzdHJvbmcge1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIH1cbn1cblxuLnBhZ2Utc3RhdGUtLWludHJvIGlvbi1pY29uIHtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG59XG5cbi5yZXRyeS1idXR0b24ge1xuICBtaW4taGVpZ2h0OiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICBwYWRkaW5nOiAwIHZhcigtLXRmLXNwYWNlLTUpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTUpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtc20pO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG59XG5cbi5wcmltYXJ5LWJ1dHRvbiB7XG4gIEBpbmNsdWRlIHRmLWdyYWRpZW50LWJ1dHRvbih2YXIoLS10Zi1yYWRpdXMtbGcpKTtcblxuICBtaW4taGVpZ2h0OiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICBwYWRkaW5nOiAwIHZhcigtLXRmLXNwYWNlLTYpO1xuICBtYXJnaW4tdG9wOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtYmFzZSk7XG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gTGlzdGFkb1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4uZ3JvdXAtbGlzdCB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0zKTtcbn1cblxuLmdyb3VwLWNhcmQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1sZyk7XG59XG5cbi5ncm91cC1tYWluIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xufVxuXG4uZ3JvdXAtaGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLmdyb3VwLW5hbWUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLW1kKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xufVxuXG4uY2F0ZWdvcnktY2hpcCB7XG4gIHBhZGRpbmc6IDJweCB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLXBpbGwpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS14cyk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5ncm91cC1yZWZlcmVuY2Uge1xuICBtYXJnaW46IHZhcigtLXRmLXNwYWNlLTIpIDAgMDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG5cbiAgc3Ryb25nIHtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIH1cbn1cblxuLy8gRWwgY3JpdGVyaW8gZGUgZXF1aXZhbGVuY2lhIGVzIGxvIHF1ZSBldml0YSBxdWUgZWwgaW50ZXJjYW1iaW8gc2Vcbi8vIG1hbGludGVycHJldGU6IHNlIGRlc3RhY2EsIG5vIHNlIGVzY29uZGUgZW50cmUgbG9zIGFsaW1lbnRvcy5cbi5ncm91cC1ub3RlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIG1hcmdpbjogdmFyKC0tdGYtc3BhY2UtMykgMCAwO1xuICBwYWRkaW5nOiB2YXIoLS10Zi1zcGFjZS0yKSB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLXNtKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUteHMpO1xuICBsaW5lLWhlaWdodDogdmFyKC0tdGYtbGluZS1oZWlnaHQtYmFzZSk7XG5cbiAgaW9uLWljb24ge1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIG1hcmdpbi10b3A6IDFweDtcbiAgICBmb250LXNpemU6IDE0cHg7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG59XG5cbi5pdGVtLXByZXZpZXcge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBtYXJnaW46IHZhcigtLXRmLXNwYWNlLTMpIDAgMDtcbiAgcGFkZGluZzogMDtcbn1cblxuLml0ZW0tcHJldmlldy1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIHBhZGRpbmc6IDNweCAwO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG59XG5cbi8vIENhbnRpZGFkZXMgdGFidWxhcmVzIHkgYWxpbmVhZGFzIGEgbGEgZGVyZWNoYTogZXMgbGEgY29sdW1uYSBxdWUgc2Vcbi8vIGNvbXBhcmEgZW50cmUgZmlsYXMsIHkgZGVzYWxpbmVhZGEgb2JsaWdhIGEgbGVlcmxhIG7Dg8K6bWVybyBhIG7Dg8K6bWVyby5cbi5pdGVtLXF1YW50aXR5IHtcbiAgbWluLXdpZHRoOiA4Y2g7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtdmFyaWFudC1udW1lcmljOiB0YWJ1bGFyLW51bXM7XG59XG5cbi5pdGVtLW5hbWUge1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xufVxuXG4uaXRlbS1ub3RlIHtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS14cyk7XG59XG5cbi5ncm91cC1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbi5pY29uLWJ1dHRvbiB7XG4gIEBpbmNsdWRlIHRmLWljb24tYnV0dG9uKHZhcigtLXRmLXRvdWNoLW1pbiksIHZhcigtLXRmLXJhZGl1cy1zbSksIDE4cHgpO1xuXG4gICYtLWRhbmdlcjpob3ZlciB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtZGFuZ2VyLXNvZnQpO1xuICAgIGNvbG9yOiB2YXIoLS10Zi1kYW5nZXItdGV4dCk7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFZGl0b3Jcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLnBhbmVsLWJhY2tkcm9wIHtcbiAgQGluY2x1ZGUgdGYtcGFuZWwtYmFja2Ryb3A7XG59XG5cbi5wYW5lbC1zaGVldCB7XG4gIEBpbmNsdWRlIHRmLXBhbmVsLXNoZWV0O1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgIG1heC13aWR0aDogNjQwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87XG4gICAgcmlnaHQ6IDA7XG4gICAgbGVmdDogMDtcbiAgfVxufVxuXG4ucGFuZWwtaGFuZGxlIHtcbiAgQGluY2x1ZGUgdGYtcGFuZWwtaGFuZGxlO1xufVxuXG4ucGFuZWwtdGl0bGUge1xuICBtYXJnaW46IDAgMCB2YXIoLS10Zi1zcGFjZS00KTtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtbGcpO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG59XG5cbi5zZWN0aW9uLXRpdGxlIHtcbiAgbWFyZ2luOiB2YXIoLS10Zi1zcGFjZS02KSAwIHZhcigtLXRmLXNwYWNlLTEpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG59XG5cbi5zZWN0aW9uLWhpbnQge1xuICBtYXJnaW46IDAgMCB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUteHMpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG59XG5cbi5maWVsZC1sYWJlbCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBtYXJnaW46IHZhcigtLXRmLXNwYWNlLTMpIDAgdmFyKC0tdGYtc3BhY2UtMik7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbn1cblxuLmZpZWxkLW9wdGlvbmFsIHtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xufVxuXG4uaW5wdXQtd3JhcHBlciB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LXdyYXBwZXIodmFyKC0tdGYtc3VyZmFjZS0yKSk7XG4gIGhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbn1cblxuLmlucHV0LWZpZWxkIHtcbiAgQGluY2x1ZGUgdGYtaW5wdXQtZmllbGQ7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWJhc2UpO1xufVxuXG4uaXRlbS1lZGl0b3Ige1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgbWFyZ2luLWJvdHRvbTogdmFyKC0tdGYtc3BhY2UtMik7XG4gIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTMpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbWQpO1xufVxuXG4vLyBFbCBwcmltZXIgYWxpbWVudG8gZXMgbGEgcmVmZXJlbmNpYSBjb250cmEgbGEgcXVlIHNlIGxlZW4gbG9zIGRlbcODwqFzOiBzZVxuLy8gbWFyY2EgY29uIGxhIHBhbGFicmEsIG5vIHNvbG8gY29uIGxhIHBvc2ljacODwrNuLlxuLml0ZW0taW5kZXgge1xuICBmbGV4LXNocmluazogMDtcbiAgbWluLXdpZHRoOiAzNHB4O1xuICBwYWRkaW5nLXRvcDogMTJweDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS14cyk7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICAmLS1yZWZlcmVuY2Uge1xuICAgIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQtdGV4dCk7XG4gIH1cbn1cblxuLml0ZW0tZmllbGRzIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTIpO1xufVxuXG4ucXVhbnRpdHktcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuXG4uYnVpbGRlci1pbnB1dCxcbi5idWlsZGVyLXNlbGVjdCB7XG4gIG1pbi1oZWlnaHQ6IHZhcigtLXRmLXRvdWNoLW1pbik7XG4gIHBhZGRpbmc6IDAgdmFyKC0tdGYtc3BhY2UtMyk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtc20pO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcblxuICAmOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG59XG5cbi5idWlsZGVyLWlucHV0LS1uYXJyb3cge1xuICBmbGV4OiAwIDAgODhweDtcbiAgZm9udC12YXJpYW50LW51bWVyaWM6IHRhYnVsYXItbnVtcztcbn1cblxuLmJ1aWxkZXItc2VsZWN0IHtcbiAgZmxleDogMCAwIDg0cHg7XG4gIHBhZGRpbmctcmlnaHQ6IHZhcigtLXRmLXNwYWNlLTYpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCg0NWRlZywgdHJhbnNwYXJlbnQgNTAlLCB2YXIoLS10Zi10ZXh0LW11dGVkKSA1MCUpLFxuICAgIGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHZhcigtLXRmLXRleHQtbXV0ZWQpIDUwJSwgdHJhbnNwYXJlbnQgNTAlKTtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2FsYygxMDAlIC0gMTVweCkgY2FsYyg1MCUgKyAycHgpLCBjYWxjKDEwMCUgLSAxMHB4KSBjYWxjKDUwJSArIDJweCk7XG4gIGJhY2tncm91bmQtc2l6ZTogNXB4IDVweCwgNXB4IDVweDtcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcblxuICBvcHRpb24ge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMSk7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICB9XG59XG5cbi5hZGQtcm93LWJ1dHRvbiB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTIpO1xuICBtaW4taGVpZ2h0OiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICBtYXJnaW4tdG9wOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgcGFkZGluZzogMCB2YXIoLS10Zi1zcGFjZS00KTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogMXB4IGRhc2hlZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLW1kKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICY6aG92ZXIge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYWNjZW50LXNvZnQtYm9yZGVyKTtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICB9XG59XG5cbi5wYW5lbC1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgbWFyZ2luLXRvcDogdmFyKC0tdGYtc3BhY2UtNik7XG59XG5cbi5zYXZlLWVycm9yIHtcbiAgbWFyZ2luOiAwO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbn1cblxuLnBhbmVsLWJ1dHRvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTMpO1xufVxuXG4uY2FuY2VsLWJ1dHRvbiB7XG4gIGZsZXg6IDE7XG4gIGhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLWxnKTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWJhc2UpO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG59XG5cbi5zdWJtaXQtYnV0dG9uIHtcbiAgQGluY2x1ZGUgdGYtZ3JhZGllbnQtYnV0dG9uKHZhcigtLXRmLXJhZGl1cy1sZykpO1xuXG4gIGZsZXg6IDE7XG4gIGhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWJhc2UpO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIE1vdmltaWVudG8gNSBDb2FjaCBQcm8gw6LCgMKUIGJhc2UgbnVtw4PCqXJpY2EgZGVsIGdydXBvIHkgY2FsY3VsYWRvcmEgZGUgZXRpcXVldGFzLlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4uYmFzaXMtcGlja2VyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IDZweDtcbiAgbWFyZ2luLWJvdHRvbTogdmFyKC0tdGYtc3BhY2UtMyk7XG59XG5cbi5iYXNpcy1vcHRpb24ge1xuICBtaW4taGVpZ2h0OiA0NHB4O1xuICBwYWRkaW5nOiAwIHZhcigtLXRmLXNwYWNlLTQpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtcGlsbCk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpLFxuICAgIGJhY2tncm91bmQgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpLFxuICAgIGNvbG9yIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmLnNlbGVjdGVkIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LXNvZnQpO1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxufVxuXG4uYmFzaXMtYW1vdW50LFxuLmxhYmVsLWNhbGN1bGF0b3Ige1xuICBtYXJnaW4tYm90dG9tOiB2YXIoLS10Zi1zcGFjZS0zKTtcbn1cblxuLy8gRWwgcmVzdWx0YWRvLCBzZXBhcmFkbyBkZWwgY2FtcG86IGVzIGxvIHF1ZSBlbCBjb2FjaCBtaXJhLCB5IG1lemNsYWRvIGNvblxuLy8gZWwgaW5wdXQgc2UgbGVlcsODwq1hIGNvbW8gdW4gdGV4dG8gZGUgYXl1ZGEgbcODwqFzLlxuLmNhbGN1bGF0b3ItcmVzdWx0IHtcbiAgbWFyZ2luOiB2YXIoLS10Zi1zcGFjZS0yKSAwIDA7XG4gIHBhZGRpbmc6IDEwcHggMTJweDtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLW1kKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LXNvZnQpO1xuICBjb2xvcjogdmFyKC0tdGYtYWNjZW50LXRleHQpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGxpbmUtaGVpZ2h0OiAxLjQ1O1xuXG4gIHN0cm9uZyB7XG4gICAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtbWQpO1xuICB9XG59XG5cbi8vIEVsIHZhbG9yIGV4YWN0byBlbiBwZXF1ZcODwrFvIHkgZW50cmUgcGFyw4PCqW50ZXNpczogc2UgZW5zZcODwrFhIHBvcnF1ZSBlbCBjb2FjaFxuLy8gcHVlZGUgcXVlcmVyIGFqdXN0YXIgbGEgcmFjacODwrNuLCBwZXJvIGxvIHF1ZSBzZSBwYXV0YSBlcyBlbCByZWRvbmRlYWRvLlxuLmNhbGN1bGF0b3ItZXhhY3Qge1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbn1cbiIsIi8vIEJvdHRvbSBzaGVldCAoYmFja2Ryb3AgKyBwYW5lbCBkZXNsaXphbnRlIGRlc2RlIGFiYWpvKSDDosKAwpQgZHVwbGljYWRvIGJ5dGUgYVxuLy8gYnl0ZSBlbiAyIHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID5cbi8vIEZhc2UgMykuIFRhbWJpw4PCqW4gYXBhcmVjZSBmdWVyYSBkZSBlc3RhIGFwcCBlbiBwYWNrYWdlcy9zaGFyZWQtZmVhdHVyZXNcbi8vIChvbmJvYXJkaW5nLCBteS1jaGVja2lucywgZXRjLikgw6LCgMKUIGZ1ZXJhIGRlIGFsY2FuY2UgYXF1w4PCrSBwb3JxdWUgZXNhIGNhcGEgbm9cbi8vIHRpZW5lIGxvcyB0b2tlbnMgLS10Zi0qOyBzaSBlc2FzIHDDg8KhZ2luYXMgbWlncmFuIGEgLS10Zi0qIGFsZ8ODwrpuIGTDg8KtYSwgZXN0ZVxuLy8gbWlzbW8gcGFydGlhbCBlcyBlbCBkZXN0aW5vIG5hdHVyYWwuXG5AbWl4aW4gdGYtcGFuZWwtYmFja2Ryb3Age1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGluc2V0OiAwO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1vdmVybGF5KTtcbiAgei1pbmRleDogdmFyKC0tdGYtei1tb2RhbC1iYWNrZHJvcCwgNDAwKTtcbiAgLy8gYGJvdGhgIHkgbm8gZWwgdmFsb3IgcG9yIGRlZmVjdG8gYG5vbmVgOiBzaW4gZmlsbC1tb2RlIGVsIGVsZW1lbnRvIHNlXG4gIC8vIHF1ZWRhIGVuIHN1IHZhbG9yIEJBU0UgbWllbnRyYXMgbGEgYW5pbWFjacODwrNuIGVzdMODwqEgcGVuZGllbnRlIGRlIGFycmFuY2FyXG4gIC8vIMOiwoDClHBlc3Rhw4PCsWEgZW4gc2VndW5kbyBwbGFubywgd2VidmlldyBxdWUgZGlmaWVyZSBlbCBwcmltZXIgZnJhbWXDosKAwpQgeSBjb21vXG4gIC8vIGVsIGtleWZyYW1lIHBhcnRlIGRlIG9wYWNpdHkgMCwgbGEgaG9qYSBhcGFyZWPDg8KtYSBhIG1lZGlhcywgdHJhbnNsw4PCumNpZGEsXG4gIC8vIGRlamFuZG8gdmVyIGxhIGZpY2hhIGRlIGRldHLDg8Khcy4gTWVkaWRvOiBjb24gbGEgYW5pbWFjacODwrNuIHNpbiBhdmFuemFyLFxuICAvLyBvcGFjaXR5IGNvbXB1dGFiYSAwLlxuICBhbmltYXRpb246IHRmLWJhY2tkcm9wLWluIDIwMG1zIHZhcigtLXRmLWVhc2Utb3V0KSBib3RoO1xuXG4gIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgYW5pbWF0aW9uOiBub25lO1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuQG1peGluIHRmLXBhbmVsLXNoZWV0IHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICB6LWluZGV4OiB2YXIoLS10Zi16LW1vZGFsLCA1MDApO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTEpO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHggMjBweCAwIDA7XG4gIHBhZGRpbmc6IDEwcHggMTZweCAyNHB4O1xuICBtYXgtaGVpZ2h0OiA4MHZoO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBhbmltYXRpb246IHRmLXNoZWV0LWluIDI2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSBib3RoO1xuXG4gIC8vIFNpbiBhbmltYWNpw4PCs24sIGVsIGVzdGFkbyBmaW5hbCB0aWVuZSBxdWUgcXVlZGFyIGV4cGzDg8KtY2l0bzogYG5vbmVgIGJvcnJhXG4gIC8vIHRhbWJpw4PCqW4gZWwgYGJvdGhgIGRlIGFycmliYS5cbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICBhbmltYXRpb246IG5vbmU7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IG5vbmU7XG4gIH1cbn1cblxuQG1peGluIHRmLXBhbmVsLWhhbmRsZSB7XG4gIHdpZHRoOiAzNnB4O1xuICBoZWlnaHQ6IDRweDtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1ib3JkZXItc3Ryb25nZXN0KTtcbiAgbWFyZ2luOiAwIGF1dG8gMTRweDtcbn1cblxuQGtleWZyYW1lcyB0Zi1iYWNrZHJvcC1pbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuQGtleWZyYW1lcyB0Zi1zaGVldC1pbiB7XG4gIGZyb20ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxNnB4KTtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gIHRvIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFBhbmVsIGxhdGVyYWwgZGVyZWNoby4gTWlzbWEgcGllemEgcXVlIGxhIGJvdHRvbSBzaGVldCBwZXJvIGFuY2xhZG8gYWxcbi8vIGxhZG8sIHBhcmEgZm9ybXVsYXJpb3MgbGFyZ29zIHF1ZSBzZSByZWxsZW5hbiBtaXJhbmRvIGVsIGNvbnRlbmlkbyBkZVxuLy8gZGV0csODwqFzIChzdXBsZW1lbnRvcyBqdW50byBhIHN1cyBncsODwqFmaWNhcywgcG9yIGVqZW1wbG8pLlxuLy9cbi8vIEVuIG3Dg8KzdmlsIE5PIHNlIGxhdGVyYWxpemE6IDQwMHB4IGRlIGFuY2hvIHNvYnJlIHVuYSBwYW50YWxsYSBkZSAzOTAgZXMgdW5hXG4vLyBob2phIGEgcGFudGFsbGEgY29tcGxldGEgbWFsIGhlY2hhLiBQb3IgZGViYWpvIGRlIDc2OHB4IHNpZ3VlIHNpZW5kb1xuLy8gYm90dG9tIHNoZWV0LCBxdWUgZXMgZWwgZ2VzdG8gcXVlIGxhIGdlbnRlIGVzcGVyYSBhaMODwq0uXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEVsIHZlbG8gc2UgYWNsYXJhIGVuIGVzY3JpdG9yaW86IGVsIHBhbmVsIHNlIGxhdGVyYWxpemEgcHJlY2lzYW1lbnRlIHBhcmFcbi8vIHBvZGVyIG1pcmFyIGxvIHF1ZSBoYXkgZGV0csODwqFzIG1pZW50cmFzIHNlIHJlbGxlbmEgKGxhcyBncsODwqFmaWNhcyBkZVxuLy8gcHJvZ3Jlc28sIGFsIHBhdXRhciB1biBzdXBsZW1lbnRvKS4gQWwgNTAlIHF1ZWRhYmFuIGFwYWdhZGFzLlxuQG1peGluIHRmLXNpZGUtcGFuZWwtYmFja2Ryb3Age1xuICBAaW5jbHVkZSB0Zi1wYW5lbC1iYWNrZHJvcDtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xuICB9XG59XG5cbkBtaXhpbiB0Zi1zaWRlLXBhbmVsKCR3aWR0aDogNDIwcHgpIHtcbiAgQGluY2x1ZGUgdGYtcGFuZWwtc2hlZXQ7XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiBhdXRvO1xuICAgIHJpZ2h0OiAwO1xuICAgIHdpZHRoOiAkd2lkdGg7XG4gICAgbWF4LXdpZHRoOiA5MnZ3O1xuICAgIC8vIDEwMHZoIHkgbm8gYG5vbmVgOiBzaSB1biBhbmNlc3RybyBjb24gYGNvbnRhaW5gIGNhcHR1cmEgZWwgZml4ZWRcbiAgICAvLyAoaW9uLWNvbnRlbnQgbG8gaGFjZSksIGVsIHBhbmVsIHRvbWEgbGEgYWx0dXJhIGRlIEVTRSBhbmNlc3Ryby4gU2lcbiAgICAvLyBtaWRlIG3Dg8KhcyBxdWUgbGEgdmVudGFuYSwgZWwgcGllIGNvbiBHdWFyZGFyIHNlIHF1ZWRhIGZ1ZXJhIGRlXG4gICAgLy8gcGFudGFsbGEuIE1lZGlkbzogODQwcHggZGUgYWx0byBlbiB1bmEgdmVudGFuYSBkZSA4MDAuXG4gICAgbWF4LWhlaWdodDogMTAwdmg7XG4gICAgLy8gU2luIGVzdG8gZWwgcmVsbGVubyBzZSBzdW1hIGFsIGFuY2hvIHkgYWwgYWx0bzogZWwgcGFuZWwgbWVkw4PCrWEgNDgxcHhcbiAgICAvLyBwaWRpZW5kbyA0NDAsIHkgODQwIGRlIGFsdG8gZW4gdW5hIHZlbnRhbmEgZGUgODAwLCBkZXNib3JkYW5kbyBwb3JcbiAgICAvLyBhYmFqby4gRXN0ZSBwcm95ZWN0byBubyB0aWVuZSByZXNldCBnbG9iYWwgZGUgYm94LXNpemluZy5cbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGJvcmRlci10b3A6IG5vbmU7XG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTUpIHZhcigtLXRmLXNwYWNlLTUpIDA7XG4gICAgYW5pbWF0aW9uOiB0Zi1zaWRlLXBhbmVsLWluIDI2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSBib3RoO1xuXG4gICAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICAgIGFuaW1hdGlvbjogbm9uZTtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB0cmFuc2Zvcm06IG5vbmU7XG4gICAgfVxuICB9XG59XG5cbi8vIEVsIGFzYSBkZSBhcnJhc3RyZSBzb2xvIHRpZW5lIHNlbnRpZG8gZW4gbGEgaG9qYSBpbmZlcmlvcjogZW4gdW4gcGFuZWxcbi8vIGxhdGVyYWwgbm8gaGF5IG5hZGEgcXVlIGFycmFzdHJhciBoYWNpYSBhYmFqby5cbkBtaXhpbiB0Zi1zaWRlLXBhbmVsLWhhbmRsZSB7XG4gIEBpbmNsdWRlIHRmLXBhbmVsLWhhbmRsZTtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgdGYtc2lkZS1wYW5lbC1pbiB7XG4gIGZyb20ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyNHB4KTtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gIHRvIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuIiwiLy8gQm90w4PCs24gQ1RBIGNvbiBncmFkaWVudGUgZGUgYWNlbnRvIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gZW4gfjExIHNpdGlvcyBkZVxuLy8gfjEwIHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS5cbi8vIENhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW8gc2VsZWN0b3IgeSBhw4PCsWFkZSBlbmNpbWEgc29sbyBsb1xuLy8gcXVlIHZhcsODwq1hIHBvciBsYXlvdXQgKHdpZHRoLCBoZWlnaHQsIGZvbnQtc2l6ZSwgbWFyZ2luKS5cbi8vXG4vLyBMYSBtaXRhZCBkZSBsb3Mgc2l0aW9zIG9yaWdpbmFsZXMgbm8gdGVuw4PCrWFuIHRyYW5zaWNpw4PCs24vZmVlZGJhY2sgZGUgcHVsc2FjacODwrNuXG4vLyBuaSA6Zm9jdXMtdmlzaWJsZSDDosKAwpQgZWwgbWl4aW4gbG9zIGHDg8KxYWRlIHNpZW1wcmUsIGNpZXJyYSBlc2UgaHVlY28gZGVcbi8vIGNvbnNpc3RlbmNpYSBkZSBpbnRlcmFjY2nDg8KzbiAoUFJPRFVDVC5tZDogXCJ1biBzb2xvIHBhdHLDg8KzbiBwb3IgdGlwbyBkZVxuLy8gY29tcG9uZW50ZVwiKSBlbiB2ZXogZGUgcGVycGV0dWFyIGxhIHZhcmlhY2nDg8KzbiBhY2NpZGVudGFsLlxuQG1peGluIHRmLWdyYWRpZW50LWJ1dHRvbigkcmFkaXVzOiAxMnB4KSB7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LWdyYWRpZW50KTtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudC1jb250cmFzdCk7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSwgb3BhY2l0eSAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45Nyk7XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjQ1O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLXRleHQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLy8gQm90w4PCs24gZGUgaGVhZGVyIHF1ZSBlcyBzb2xvIHVuIGljb25vIMOiwoDClCBtaXNtbyBsb29rIFwiZW52dWVsdG9cIiBxdWUgeWEgdXNhIGxhXG4vLyBhcHAgZGUgY29uc3VtaWRvciBlbiBzdXMgdG9vbGJhcnMgKHBhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy8uLi4vZGlldHMvXG4vLyBjb21wb25lbnRzL3Rvb2xiYXItY2FsZW5kYXI6IGZvbmRvICsgYm9yZGVyLXJhZGl1cyArIGNhamEgZmlqYSA0NHg0NCwgZW5cbi8vIHZleiBkZWwgaW9uLWJ1dHRvbiBwbGFuby90cmFuc3BhcmVudGUgcXVlIHRlbsODwq1hIGNhZGEgcGFudGFsbGEgZGUgdHJhaW5lcnNcbi8vIGhhc3RhIGFob3JhKS4gVG9rZW5lYWRvIGEgbGEgcGFsZXRhIGRlIGVzdGEgYXBwIGVuIHZleiBkZSByZXBldGlyIGxvc1xuLy8gcmdiYSgyNTUsMjU1LDI1NSwuLi4pIHN1ZWx0b3MgZGVsIG9yaWdpbmFsLlxuLy9cbi8vIFNpcnZlIHRhbnRvIHBhcmEgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCI+ICh1c2EgbGFzIENTUyBjdXN0b20gcHJvcGVydGllc1xuLy8gZGUgSW9uaWMpIGNvbW8gcGFyYSB1biA8YnV0dG9uPiBuYXRpdm8gKHVzYSBsYXMgcHJvcGllZGFkZXMgcGxhbmFzKSDDosKAwpRcbi8vIGFtYm9zIGNvZXhpc3RlbiBob3kgZW4gdHJhaW5lcnMgcGFyYSBlbCBtaXNtbyByb2wgZGUgXCJ2b2x2ZXJcIi9cImNlcnJhclwiLlxuQG1peGluIHRmLWljb24tYnV0dG9uKCRzaXplOiA0NHB4LCAkcmFkaXVzOiAxMnB4LCAkaWNvbi1zaXplOiAyMHB4KSB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcbiAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1iYWNrZ3JvdW5kLWhvdmVyOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtZm9jdXNlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1jb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICAtLWJvcmRlci1yYWRpdXM6ICN7JHJhZGl1c307XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbiAgLS1wYWRkaW5nLXRvcDogMDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMDtcblxuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6ICRyYWRpdXM7XG4gIHdpZHRoOiAkc2l6ZTtcbiAgaGVpZ2h0OiAkc2l6ZTtcbiAgbWluLXdpZHRoOiAkc2l6ZTtcbiAgbWluLWhlaWdodDogJHNpemU7XG4gIG1hcmdpbjogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCksXG4gICAgY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogJGljb24tc2l6ZTtcbiAgfVxufVxuXG4vLyBFeHBhbnNvciBpbnZpc2libGUgZGUgem9uYSBwdWxzYWJsZS5cbi8vXG4vLyBQQVJBIFFVw4PCiTogdW4gY29udHJvbCBjb21wYWN0byAodW4gaWNvbm8gZGUgMzIgcHggZW4gdW5hIGZpbGEgZGUgdGFibGEsIHVuXG4vLyBlbmxhY2UgZGUgdGV4dG8gZGUgMTYgcHgpIG5vIGxsZWdhIGEgbG9zIDQ0IHB4IHF1ZSBleGlnZSBQUk9EVUNULm1kLCB5XG4vLyBlbmdvcmRhcmxvIGRlIHZlcmRhZCBkZXNwbGF6YSB0b2RvIGxvIHF1ZSB0aWVuZSBhbHJlZGVkb3Igw6LCgMKUIGVuIHVuYSB0YWJsYVxuLy8gZGUgdmVpbnRlIGZpbGFzLCA4IHB4IHBvciBmaWxhIHNvbiBtZWRpYSBwYW50YWxsYS5cbi8vXG4vLyBFbCBwc2V1ZG9lbGVtZW50byBjcmVjZSBoYWNpYSBmdWVyYSBzaW4gb2N1cGFyIHNpdGlvIGVuIGVsIGZsdWpvLCBhc8ODwq0gcXVlXG4vLyBlbCBib3TDg8KzbiBzZSB2ZSBwZXF1ZcODwrFvIHkgc2UgcHVsc2EgZ3JhbmRlLlxuLy9cbi8vIEFWSVNPIERFIE1FRElDScODwpNOOiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBOTyB2ZSBlc3RlIHBzZXVkb2VsZW1lbnRvLCBhc8ODwq1cbi8vIHF1ZSBhbCB2ZXJpZmljYXIgaGF5IHF1ZSB1c2FyIGVsZW1lbnRGcm9tUG9pbnQgY29uIGVsIGVsZW1lbnRvIGRlbnRybyBkZWxcbi8vIHZpZXdwb3J0LiBBZGVtw4PCoXMgZWwgaGl0LXRlc3QgZGV2dWVsdmUgMiBweCBtZW5vcyBxdWUgbGEgY2FqYSBkZWNsYXJhZGFcbi8vIChjb21wcm9iYWRvOiAtNHB4IGRhIDQyLCAtNnB4IGRhIDQ2KSwgYXPDg8KtIHF1ZSB1biA0MiBtZWRpZG8gc29uIDQ0IHJlYWxlcy5cbi8vXG4vLyAkZ3JvdzogY3XDg8KhbnRvIGNyZWNlIHBvciBjYWRhIGxhZG8uIDRweCBsbGV2YSB1biBjb250cm9sIGRlIDM2IHB4IGEgNDQuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIoJGdyb3c6IDRweCkge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IC0jeyRncm93fTtcbiAgfVxufVxuXG4vLyBWYXJpYW50ZSBxdWUgc29sbyBjcmVjZSBlbiBWRVJUSUNBTC4gUGFyYSBjb250cm9sZXMgZW4gZmlsYSBkb25kZSBlbFxuLy8gZXhwYW5zb3IgaG9yaXpvbnRhbCBzZSBzb2xhcGFyw4PCrWEgY29uIGVsIGRlIGFsIGxhZG8geSByb2JhcsODwq1hIHN1cyB0b3F1ZXMuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIteSgkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC0jeyRncm93fTtcbiAgICBib3R0b206IC0jeyRncm93fTtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICB9XG59XG4iLCIvLyBGaWxhIGRlIGlucHV0IGNvbiBpY29ubyAod3JhcHBlciArIGljb25vICsgY2FtcG8pIMOiwoDClCByZXBldGlkYSBlbiA0IHDDg8KhZ2luYXNcbi8vIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuIEVsIGZvbmRvXG4vLyBkZWwgd3JhcHBlciBlcyBlbCDDg8K6bmljbyB2YWxvciBxdWUgdmFyw4PCrWEgcG9yIHDDg8KhZ2luYSAoc3VwZXJmaWNpZSAxIG8gMiBzZWfDg8K6blxuLy8gY29udGV4dG8gdmlzdWFsKSwgZGUgYWjDg8KtIGVsIHBhcsODwqFtZXRybzsgdGFtYcODwrFvIGRlIGZ1ZW50ZS9hbHRvL21hcmdlbiBzZVxuLy8gZGVqYW4gZnVlcmEgZGVsIG1peGluIHBvcnF1ZSBjYWRhIHDDg8KhZ2luYSBsb3MgZmlqYSBzZWfDg8K6biBzdSBwcm9waW8gbGF5b3V0LlxuQG1peGluIHRmLWlucHV0LXdyYXBwZXIoJGJnOiB2YXIoLS10Zi1zdXJmYWNlLTEpKSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgYmFja2dyb3VuZDogJGJnO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMCAxNHB4O1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6Zm9jdXMtd2l0aGluIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIH1cbn1cblxuQG1peGluIHRmLWlucHV0LWljb24ge1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG5AbWl4aW4gdGYtaW5wdXQtZmllbGQge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGhlaWdodDogMTAwJTtcblxuICAmOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ }),

/***/ 79130:
/*!***********************************************************************!*\
  !*** ./src/app/features/food-exchanges/models/food-exchange.model.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXCHANGE_BASES: () => (/* binding */ EXCHANGE_BASES),
/* harmony export */   EXCHANGE_CATEGORY_SUGGESTIONS: () => (/* binding */ EXCHANGE_CATEGORY_SUGGESTIONS),
/* harmony export */   EXCHANGE_UNITS: () => (/* binding */ EXCHANGE_UNITS)
/* harmony export */ });
// Fase 5 Coach Pro — espejo de components/foodExchanges/ (backend).
//
// Regla de fondo (§16): el sistema NO calcula equivalencias. No deduce que
// 100 g de pollo equivalen a 120 g de pavo — eso depende del criterio del
// coach (¿iguala proteína? ¿calorías?) y del cliente concreto. Aquí solo se
// guarda lo que el coach decide.
const EXCHANGE_BASES = [{
  key: 'protein',
  label: 'Proteína',
  unit: 'g'
}, {
  key: 'carbs',
  label: 'Hidratos',
  unit: 'g'
}, {
  key: 'fat',
  label: 'Grasa',
  unit: 'g'
}, {
  key: 'kcal',
  label: 'Calorías',
  unit: 'kcal'
}];
// Sugerencias, no un catálogo cerrado: se ofrecen para no partir de una
// pantalla en blanco, pero el coach puede escribir la suya.
const EXCHANGE_CATEGORY_SUGGESTIONS = ['Proteína', 'Carbohidrato', 'Grasa', 'Verdura', 'Fruta', 'Lácteo'];
const EXCHANGE_UNITS = ['g', 'ml', 'ud', 'cda', 'taza'];

/***/ })

}]);
//# sourceMappingURL=src_app_features_food-exchanges_food-exchanges_module_ts.js.map