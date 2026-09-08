"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_features_method_method_module_ts"],{

/***/ 99282:
/*!**********************************************************!*\
  !*** ./src/app/features/method/method-routing.module.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MethodPageRoutingModule: () => (/* binding */ MethodPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _method_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./method.page */ 36052);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _MethodPageRoutingModule;




const routes = [{
  path: '',
  component: _method_page__WEBPACK_IMPORTED_MODULE_1__.MethodPage
}];
class MethodPageRoutingModule {}
_MethodPageRoutingModule = MethodPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MethodPageRoutingModule, "\u0275fac", function MethodPageRoutingModule_Factory(t) {
  return new (t || _MethodPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MethodPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _MethodPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MethodPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](MethodPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 55387:
/*!**************************************************!*\
  !*** ./src/app/features/method/method.module.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MethodPageModule: () => (/* binding */ MethodPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _shared_components_category_grid_category_grid_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/components/category-grid/category-grid.module */ 57818);
/* harmony import */ var _method_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./method-routing.module */ 99282);
/* harmony import */ var _method_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./method.page */ 36052);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 69717);

var _MethodPageModule;





class MethodPageModule {}
_MethodPageModule = MethodPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MethodPageModule, "\u0275fac", function MethodPageModule_Factory(t) {
  return new (t || _MethodPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MethodPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
  type: _MethodPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MethodPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _method_routing_module__WEBPACK_IMPORTED_MODULE_3__.MethodPageRoutingModule, _shared_components_category_grid_category_grid_module__WEBPACK_IMPORTED_MODULE_2__.CategoryGridModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](MethodPageModule, {
    declarations: [_method_page__WEBPACK_IMPORTED_MODULE_4__.MethodPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _method_routing_module__WEBPACK_IMPORTED_MODULE_3__.MethodPageRoutingModule, _shared_components_category_grid_category_grid_module__WEBPACK_IMPORTED_MODULE_2__.CategoryGridModule]
  });
})();

/***/ }),

/***/ 36052:
/*!************************************************!*\
  !*** ./src/app/features/method/method.page.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MethodPage: () => (/* binding */ MethodPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _checkin_templates_components_apply_checkin_template_modal_apply_checkin_template_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../checkin-templates/components/apply-checkin-template-modal/apply-checkin-template-modal.component */ 79651);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _checkin_templates_services_checkin_templates_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../checkin-templates/services/checkin-templates-api.service */ 47672);
/* harmony import */ var _protocols_services_coach_protocols_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../protocols/services/coach-protocols-api.service */ 37551);
/* harmony import */ var _automations_services_coach_rules_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../automations/services/coach-rules-api.service */ 87402);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _shared_components_category_grid_category_grid_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../shared/components/category-grid/category-grid.component */ 32443);


var _MethodPage;










function MethodPage_section_16_div_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "div", 23);
  }
}
const _c0 = function () {
  return [1, 2, 3];
};
function MethodPage_section_16_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, MethodPage_section_16_div_6_div_1_Template, 1, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](1, _c0));
  }
}
function MethodPage_section_16_div_7_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 26)(1, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function MethodPage_section_16_div_7_div_1_Template_div_click_1_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r10.goToCheckinTemplates());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "div", 30)(7, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function MethodPage_section_16_div_7_div_1_Template_button_click_7_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r11);
      const ct_r9 = restoredCtx.$implicit;
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r12.openApplyPanel(ct_r9));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](8, "Aplicar");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function MethodPage_section_16_div_7_div_1_Template_button_click_9_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r11);
      const ct_r9 = restoredCtx.$implicit;
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r13.confirmDeleteCheckinTemplate(ct_r9));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](10, "ion-icon", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ct_r9 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ct_r9.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate1"]("", ct_r9.enabledFields.length, " campos");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵattribute"]("aria-label", "Borrar plantilla " + ct_r9.name);
  }
}
function MethodPage_section_16_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, MethodPage_section_16_div_7_div_1_Template, 11, 3, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r5.checkinTemplates)("ngForTrackBy", ctx_r5.trackById);
  }
}
function MethodPage_section_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "section", 15)(1, "div", 16)(2, "h3", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Check-ins");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "Ver todas");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, MethodPage_section_16_div_6_Template, 2, 2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, MethodPage_section_16_div_7_Template, 2, 2, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r0.loadingCheckinTemplates);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r0.loadingCheckinTemplates);
  }
}
function MethodPage_section_17_div_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "div", 23);
  }
}
function MethodPage_section_17_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, MethodPage_section_17_div_6_div_1_Template, 1, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](1, _c0));
  }
}
function MethodPage_section_17_div_7_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function MethodPage_section_17_div_7_button_1_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r21);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r20.goToProtocols());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 37)(2, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](6, "ion-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const p_r19 = ctx.$implicit;
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](p_r19.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r18.protocolMeta(p_r19));
  }
}
function MethodPage_section_17_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, MethodPage_section_17_div_7_button_1_Template, 7, 2, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r15.protocols)("ngForTrackBy", ctx_r15.trackById);
  }
}
function MethodPage_section_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "section", 15)(1, "div", 16)(2, "h3", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Protocolos");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "a", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "Ver todos");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, MethodPage_section_17_div_6_Template, 2, 2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, MethodPage_section_17_div_7_Template, 2, 2, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r1.loadingProtocols);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r1.loadingProtocols);
  }
}
function MethodPage_section_18_div_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](0, "div", 23);
  }
}
function MethodPage_section_18_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, MethodPage_section_18_div_6_div_1_Template, 1, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵpureFunction0"](1, _c0));
  }
}
function MethodPage_section_18_div_7_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function MethodPage_section_18_div_7_button_1_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵrestoreView"](_r29);
      const r_r27 = restoredCtx.$implicit;
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵresetView"](ctx_r28.openRule(r_r27));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](1, "div", 37)(2, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](6, "ion-icon", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const r_r27 = ctx.$implicit;
    const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](r_r27.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtextInterpolate"](ctx_r26.ruleMeta(r_r27));
  }
}
function MethodPage_section_18_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](1, MethodPage_section_18_div_7_button_1_Template, 7, 2, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngForOf", ctx_r23.rules)("ngForTrackBy", ctx_r23.trackById);
  }
}
function MethodPage_section_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "section", 15)(1, "div", 16)(2, "h3", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](3, "Automatizaciones");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "a", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, "Ver todas");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](6, MethodPage_section_18_div_6_Template, 2, 2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](7, MethodPage_section_18_div_7_Template, 2, 2, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx_r2.loadingRules);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", !ctx_r2.loadingRules);
  }
}
function MethodPage_p_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "p", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, " Todav\u00EDa no has definido tu m\u00E9todo. Empieza por las plantillas de check-in: son las preguntas que le har\u00E1s a todos tus clientes. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
  }
}
// Movimiento 1 Coach Pro — mitad del antiguo hub "Plantillas".
//
// La otra mitad (Biblioteca, /tabs/templates) guarda lo que el entrenador
// PREPARA PARA UN CLIENTE: entrenamientos, rutinas, dietas, intercambios.
// Aquí vive lo que define CÓMO TRABAJA: qué le pregunta a cada cliente
// (check-ins), qué le monta a uno nuevo de golpe (protocolos) y de qué se
// entera solo sin mirar (automatizaciones). Es la misma distinción que un
// entrenador ya hace de cabeza; el menú simplemente deja de ocultarla.
//
// "Automatizaciones" deja de ser destino del sidebar y entra aquí: la
// escribes una vez y trabaja sola, no es una pantalla de uso diario.
class MethodPage {
  constructor(checkinTemplatesApi, protocolsApi, coachRulesApi, ionicUtilService, router) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "checkinTemplatesApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "protocolsApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "coachRulesApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "categories", [{
      // Antes vivía también como acceso duplicado en Configuración
      // ("Plantillas de check-in") — un solo punto de entrada aquí, mismo
      // nombre que usaba ese acceso para no partir la terminología.
      name: 'Check-in',
      description: 'Qué le preguntas a tus clientes y cada cuánto',
      icon: 'document-text-outline',
      colorVar: 'var(--tf-success)',
      path: '/tabs/checkin-templates'
    }, {
      // Fase 4 Coach Pro — un protocolo NO es contenido nuevo: es una lista
      // de referencias a las plantillas de la Biblioteca (objetivo, check-in,
      // dieta, rutina, reglas, hábitos) que se aplican de una vez.
      name: 'Protocolos',
      description: 'Tu metodología completa, lista para aplicar de una vez a un cliente nuevo',
      icon: 'layers-outline',
      colorVar: 'var(--tf-accent-2, #ff6b35)',
      path: '/tabs/protocols'
    }, {
      // Fase 3 Coach Pro — reglas CUÁNDO/SI/ENTONCES.
      name: 'Automatizaciones',
      description: 'Reglas que vigilan por ti y te avisan cuando algo se sale de lo previsto',
      icon: 'git-branch-outline',
      colorVar: 'var(--tf-accent)',
      path: '/tabs/automations'
    }, {
      // Movimiento 6 Coach Pro — tu criterio sobre cada ejercicio, en
      // números. Va aquí y no en Biblioteca: la biblioteca es lo que le das
      // al cliente, esto es cómo decides tú qué darle.
      name: 'Puntuaciones',
      description: 'Qué músculos trabaja y qué articulaciones castiga cada ejercicio, según tú',
      icon: 'analytics-outline',
      colorVar: 'var(--tf-accent-2, #4fc79a)',
      path: '/tabs/exercise-scores'
    }]);
    // --- Recientes por tipo, mismo patrón que TemplatesPage: misma fuente de
    // datos que cada lista completa, recortada a las 4 más nuevas. ---
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "checkinTemplates", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "loadingCheckinTemplates", true);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "protocols", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "loadingProtocols", true);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "rules", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "loadingRules", true);
    this.checkinTemplatesApi = checkinTemplatesApi;
    this.protocolsApi = protocolsApi;
    this.coachRulesApi = coachRulesApi;
    this.ionicUtilService = ionicUtilService;
    this.router = router;
  }
  ngOnInit() {
    this.loadAll();
  }
  // Mismo bug de caché de ion-router-outlet ya corregido en TemplatesPage —
  // sin esto, tras crear algo desde aquí y volver, la preview seguiría
  // mostrando el estado anterior.
  ionViewWillEnter() {
    this.loadAll();
  }
  loadAll() {
    this.loadCheckinTemplates();
    this.loadProtocols();
    this.loadRules();
  }
  loadCheckinTemplates() {
    this.loadingCheckinTemplates = true;
    this.checkinTemplatesApi.list().subscribe({
      next: templates => {
        this.checkinTemplates = (templates || []).slice().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')).slice(0, 4);
        this.loadingCheckinTemplates = false;
      },
      error: () => {
        this.checkinTemplates = [];
        this.loadingCheckinTemplates = false;
      }
    });
  }
  loadProtocols() {
    this.loadingProtocols = true;
    this.protocolsApi.getMine().subscribe({
      next: protocols => {
        this.protocols = (protocols || []).slice().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')).slice(0, 4);
        this.loadingProtocols = false;
      },
      error: () => {
        this.protocols = [];
        this.loadingProtocols = false;
      }
    });
  }
  loadRules() {
    this.loadingRules = true;
    this.coachRulesApi.getMine().subscribe({
      next: rules => {
        this.rules = (rules || []).slice().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')).slice(0, 4);
        this.loadingRules = false;
      },
      error: () => {
        this.rules = [];
        this.loadingRules = false;
      }
    });
  }
  get isEmpty() {
    return !this.loadingCheckinTemplates && !this.loadingProtocols && !this.loadingRules && !this.checkinTemplates.length && !this.protocols.length && !this.rules.length;
  }
  trackById(_index, item) {
    return item._id;
  }
  // --- Check-ins ---
  // Sin builder propio con ruta ':id' (se edita desde un panel dentro de la
  // propia lista) — el acceso rápido lleva al listado, no a una plantilla
  // concreta.
  goToCheckinTemplates() {
    this.router.navigate(['/tabs/checkin-templates']);
  }
  // Mismo modal real que checkin-templates.page.ts (ver comentario en
  // ApplyCheckinTemplateModalComponent).
  openApplyPanel(template) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.ionicUtilService.showModal({
        component: _checkin_templates_components_apply_checkin_template_modal_apply_checkin_template_modal_component__WEBPACK_IMPORTED_MODULE_2__.ApplyCheckinTemplateModalComponent,
        componentProps: {
          template
        },
        cssClass: 'tf-panel-modal'
      });
    })();
  }
  confirmDeleteCheckinTemplate(template) {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this2.ionicUtilService.showAlert({
        header: 'Borrar plantilla',
        message: `¿Seguro que quieres borrar "${template.name}"? Los clientes que ya la tengan aplicada conservan su configuración actual.`,
        buttons: [{
          text: 'Volver',
          role: 'cancel'
        }, {
          text: 'Borrar',
          cssClass: 'alert-button-danger',
          handler: () => _this2.deleteCheckinTemplate(template)
        }]
      });
    })();
  }
  deleteCheckinTemplate(template) {
    this.checkinTemplatesApi.delete(template._id).subscribe({
      next: () => {
        this.ionicUtilService.showToast({
          message: 'Plantilla borrada',
          duration: 2000
        });
        this.loadCheckinTemplates();
      },
      error: () => {
        this.ionicUtilService.showErrorToast('No se pudo borrar la plantilla', 'Error', 2500);
      }
    });
  }
  // --- Protocolos ---
  goToProtocols() {
    this.router.navigate(['/tabs/protocols']);
  }
  // Un protocolo puede referenciar objetivo, check-in, dieta, rutina, reglas
  // y hábitos: se cuenta lo que realmente trae, no las ranuras que existen.
  // El objetivo nutricional cuenta como UNO aunque tenga 4 macros — para el
  // coach es una sola decisión, y "5 elementos" por poner kcal sería mentir.
  protocolMeta(protocol) {
    const goal = protocol.nutritionalGoal;
    const hasGoal = !!goal && [goal.kcalTotal, goal.proteinsGTotal, goal.carbohydratesGTotal, goal.fatGTotal].some(value => value !== null && value !== undefined);
    const pieces = [hasGoal ? 1 : 0, protocol.checkinTemplateId ? 1 : 0, protocol.dietTemplateId ? 1 : 0, protocol.routineTemplateId ? 1 : 0, (protocol.ruleIds || []).length, (protocol.dailyTasks || []).length].reduce((total, n) => total + n, 0);
    return `${pieces} elemento${pieces === 1 ? '' : 's'}`;
  }
  // --- Automatizaciones ---
  openRule(rule) {
    this.router.navigate(['/tabs/automations', rule._id]);
  }
  ruleMeta(rule) {
    return rule.enabled ? 'Activa' : 'Pausada';
  }
}
_MethodPage = MethodPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(MethodPage, "\u0275fac", function MethodPage_Factory(t) {
  return new (t || _MethodPage)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_checkin_templates_services_checkin_templates_api_service__WEBPACK_IMPORTED_MODULE_3__.CheckinTemplatesApiService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_protocols_services_coach_protocols_api_service__WEBPACK_IMPORTED_MODULE_4__.CoachProtocolsApiService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_automations_services_coach_rules_api_service__WEBPACK_IMPORTED_MODULE_5__.CoachRulesApiService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_6__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_9__.Router));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(MethodPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({
  type: _MethodPage,
  selectors: [["app-method"]],
  decls: 20,
  vars: 5,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["aria-label", "Abrir men\u00FA de navegaci\u00F3n", 1, "tf-page-header__back-button"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "method-content"], [1, "page-hint"], [3, "categories"], [1, "section-heading"], [1, "recent-columns"], ["class", "recent-column", 4, "ngIf"], ["class", "empty-hint", 4, "ngIf"], [1, "recent-column"], [1, "recent-column-header"], [1, "recent-column-title"], ["routerLink", "/tabs/checkin-templates", 1, "recent-column-link"], ["class", "recent-skeleton", 4, "ngIf"], ["class", "recent-list", 4, "ngIf"], [1, "recent-skeleton"], ["class", "skeleton-block recent-row-skeleton", 4, "ngFor", "ngForOf"], [1, "skeleton-block", "recent-row-skeleton"], [1, "recent-list"], ["class", "recent-row recent-row--with-actions", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "recent-row", "recent-row--with-actions"], [1, "recent-row-info", 3, "click"], [1, "recent-row-name"], [1, "recent-row-meta"], [1, "recent-row-actions"], [1, "recent-row-action-btn", 3, "click"], [1, "recent-row-action-btn", "recent-row-action-btn--danger", 3, "click"], ["name", "trash-outline"], ["routerLink", "/tabs/protocols", 1, "recent-column-link"], ["type", "button", "class", "recent-row", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "recent-row", 3, "click"], [1, "recent-row-info"], ["name", "chevron-forward-outline", 1, "recent-row-chevron"], ["routerLink", "/tabs/automations", 1, "recent-column-link"], [1, "empty-hint"]],
  template: function MethodPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](4, "ion-menu-button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](5, "div", 5)(6, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, "Mi m\u00E9todo");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](8, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](9, "ion-content", 8)(10, "p", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](11, "C\u00F3mo trabajas t\u00FA: qu\u00E9 preguntas a tus clientes, qu\u00E9 le montas a uno nuevo y de qu\u00E9 te avisa la app sola.");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](12, "app-category-grid", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "h2", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](14, "Recientes");
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](15, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](16, MethodPage_section_16_Template, 8, 2, "section", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](17, MethodPage_section_17_Template, 8, 2, "section", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](18, MethodPage_section_18_Template, 8, 2, "section", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtemplate"](19, MethodPage_p_19_Template, 2, 0, "p", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("categories", ctx.categories);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.loadingCheckinTemplates || ctx.checkinTemplates.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.loadingProtocols || ctx.protocols.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.loadingRules || ctx.rules.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("ngIf", ctx.isEmpty);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonMenuButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.RouterLinkWithHrefDelegate, _angular_router__WEBPACK_IMPORTED_MODULE_9__.RouterLink, _shared_components_category_grid_category_grid_component__WEBPACK_IMPORTED_MODULE_7__.CategoryGridComponent],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n.method-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 20px;\n  --padding-end: 20px;\n  --padding-top: 4px;\n  --padding-bottom: 32px;\n}\n.method-content[_ngcontent-%COMP%]   .recent-columns[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: var(--tf-space-5);\n  margin-bottom: var(--tf-space-5);\n}\n@media (max-width: 700px) {\n  .method-content[_ngcontent-%COMP%]   .recent-columns[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.method-content[_ngcontent-%COMP%]   .recent-column[_ngcontent-%COMP%] {\n  min-width: 0;\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n  overflow: hidden;\n}\n.method-content[_ngcontent-%COMP%]   .recent-column-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: var(--tf-space-2);\n  padding: var(--tf-space-4) var(--tf-space-4) var(--tf-space-3);\n}\n.method-content[_ngcontent-%COMP%]   .recent-column-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-base);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n.method-content[_ngcontent-%COMP%]   .recent-column-link[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n  color: var(--tf-accent-text);\n  text-decoration: none;\n}\n.method-content[_ngcontent-%COMP%]   .recent-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-2);\n  padding: 0 var(--tf-space-4) var(--tf-space-4);\n}\n.method-content[_ngcontent-%COMP%]   .recent-row-skeleton[_ngcontent-%COMP%] {\n  height: 40px;\n  border-radius: var(--tf-radius-sm);\n}\n.method-content[_ngcontent-%COMP%]   .recent-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.method-content[_ngcontent-%COMP%]   .recent-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-3);\n  width: 100%;\n  padding: var(--tf-space-3) var(--tf-space-4);\n  background: transparent;\n  border: none;\n  border-top: 1px solid var(--tf-border);\n  color: inherit;\n  font-family: inherit;\n  text-align: left;\n  cursor: pointer;\n  transition: background var(--tf-duration-fast) var(--tf-ease-out);\n}\n.method-content[_ngcontent-%COMP%]   .recent-row[_ngcontent-%COMP%]:first-child {\n  border-top: none;\n}\n.method-content[_ngcontent-%COMP%]   .recent-row[_ngcontent-%COMP%]:hover, .method-content[_ngcontent-%COMP%]   .recent-row[_ngcontent-%COMP%]:active {\n  background: var(--tf-surface-2);\n}\n.method-content[_ngcontent-%COMP%]   .recent-row[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: -2px;\n}\n.method-content[_ngcontent-%COMP%]   .recent-row-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n.method-content[_ngcontent-%COMP%]   .recent-row-name[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  color: var(--tf-text);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.method-content[_ngcontent-%COMP%]   .recent-row-meta[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-text-muted);\n}\n.method-content[_ngcontent-%COMP%]   .recent-row-chevron[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 16px;\n  color: var(--tf-text-faint);\n}\n.method-content[_ngcontent-%COMP%]   .recent-row--with-actions[_ngcontent-%COMP%] {\n  cursor: default;\n}\n.method-content[_ngcontent-%COMP%]   .recent-row--with-actions[_ngcontent-%COMP%]:hover, .method-content[_ngcontent-%COMP%]   .recent-row--with-actions[_ngcontent-%COMP%]:active {\n  background: transparent;\n}\n.method-content[_ngcontent-%COMP%]   .recent-row-info[_ngcontent-%COMP%] {\n  cursor: pointer;\n  border-radius: 8px;\n  padding: 2px 4px;\n  margin: -2px -4px;\n  transition: background var(--tf-duration-fast) var(--tf-ease-out);\n}\n.method-content[_ngcontent-%COMP%]   .recent-row-info[_ngcontent-%COMP%]:hover, .method-content[_ngcontent-%COMP%]   .recent-row-info[_ngcontent-%COMP%]:active {\n  background: var(--tf-surface-2);\n}\n.method-content[_ngcontent-%COMP%]   .recent-row-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-shrink: 0;\n}\n.method-content[_ngcontent-%COMP%]   .recent-row-action-btn[_ngcontent-%COMP%] {\n  height: 32px;\n  padding: 0 12px;\n  background: var(--tf-surface-5);\n  color: var(--tf-text);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 8px;\n  font-size: 0.76rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform var(--tf-duration-fast) var(--tf-ease-out);\n}\n.method-content[_ngcontent-%COMP%]   .recent-row-action-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n}\n.method-content[_ngcontent-%COMP%]   .recent-row-action-btn--danger[_ngcontent-%COMP%] {\n  padding: 0 9px;\n  color: var(--tf-danger);\n  border-color: rgba(235, 68, 90, 0.3);\n}\n.method-content[_ngcontent-%COMP%]   .recent-row-action-btn--danger[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n\n.page-hint[_ngcontent-%COMP%] {\n  margin: 0 0 var(--tf-space-5);\n  color: var(--tf-text-muted);\n  font-size: var(--tf-font-size-sm);\n}\n\n.section-heading[_ngcontent-%COMP%] {\n  margin: 0 0 var(--tf-space-4);\n  font-size: var(--tf-font-size-lg);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.empty-hint[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  font-size: var(--tf-font-size-sm);\n  margin: 0 0 var(--tf-space-6);\n}\n\n.skeleton-block[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n}\n.skeleton-block[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvbWV0aG9kL21ldGhvZC5wYWdlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX3JlY2VudC1jb2x1bW5zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJBO0VBQ0U7SUFDRSwyQkFBQTtFQ3hCRjtBQUNGO0FBRUE7RUFDRSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0FBQUY7QUNERTtFQUNFLGFBQUE7RUFDQSwyREFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0NBQUE7QURHSjtBQ0RJO0VBTkY7SUFPSSwwQkFBQTtFRElKO0FBQ0Y7QUNERTtFQUNFLFlBQUE7RUFDQSwrQkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0NBQUE7RUFDQSxnQkFBQTtBREdKO0FDQUU7RUFDRSxhQUFBO0VBQ0EscUJBQUE7RUFDQSw4QkFBQTtFQUNBLHNCQUFBO0VBQ0EsOERBQUE7QURFSjtBQ0NFO0VBQ0UsU0FBQTtFQUNBLG1DQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtBRENKO0FDRUU7RUFDRSxjQUFBO0VBQ0EsaUNBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0VBQ0EscUJBQUE7QURBSjtBQ0dFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esc0JBQUE7RUFDQSw4Q0FBQTtBRERKO0FDSUU7RUFDRSxZQUFBO0VBQ0Esa0NBQUE7QURGSjtBQ0tFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0FESEo7QUNNRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLDRDQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0Esc0NBQUE7RUFDQSxjQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpRUFBQTtBREpKO0FDTUk7RUFDRSxnQkFBQTtBREpOO0FDT0k7RUFFRSwrQkFBQTtBRE5OO0FDU0k7RUFDRSxtQ0FBQTtFQUNBLG9CQUFBO0FEUE47QUNXRTtFQUNFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtBRFRKO0FDWUU7RUFDRSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QURWSjtBQ2FFO0VBQ0UsaUNBQUE7RUFDQSwyQkFBQTtBRFhKO0FDY0U7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLDJCQUFBO0FEWko7QUNxQkU7RUFDRSxlQUFBO0FEbkJKO0FDcUJJO0VBRUUsdUJBQUE7QURwQk47QUN3QkU7RUFDRSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsaUVBQUE7QUR0Qko7QUN3Qkk7RUFFRSwrQkFBQTtBRHZCTjtBQzJCRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxjQUFBO0FEekJKO0FDNEJFO0VBQ0UsWUFBQTtFQUNBLGVBQUE7RUFDQSwrQkFBQTtFQUNBLHFCQUFBO0VBQ0EseUNBQUE7RUFDQSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0VBQUE7QUQxQko7QUM0Qkk7RUFDRSxzQkFBQTtBRDFCTjtBQzZCSTtFQUNFLGNBQUE7RUFDQSx1QkFBQTtFQUNBLG9DQUFBO0FEM0JOO0FDNkJNO0VBQ0UsZUFBQTtBRDNCUjs7QUEzSUE7RUFDRSw2QkFBQTtFQUNBLDJCQUFBO0VBQ0EsaUNBQUE7QUE4SUY7O0FBM0lBO0VBQ0UsNkJBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUE4SUY7O0FBM0lBO0VBQ0UsMkJBQUE7RUFDQSxpQ0FBQTtFQUNBLDZCQUFBO0FBOElGOztBQTNJQTtFRGhDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7QUMrS0Y7QUQ3S0U7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsNEJBQUE7RUFDQSwrRUFBQTtFQUNBLG1DQUFBO0FDK0tKO0FENUtFO0VBQ0U7SUFDRSxlQUFBO0VDOEtKO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTa2VsZXRvbiBkZSBjYXJnYSBjb24gYmFycmlkbyBkZSBzaGltbWVyIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gbGl0ZXJhbG1lbnRlXG4vLyBlbiB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgKGJvcmRlci1yYWRpdXMsIGhlaWdodCwgd2lkdGgsIHZhcmlhbnRlcyBjb24gbm9tYnJlKS5cbkBtaXhpbiB0Zi1za2VsZXRvbi1zaGltbWVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuXG4gICY6OmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHRyYW5zcGFyZW50LCB2YXIoLS10Zi1zaGltbWVyKSwgdHJhbnNwYXJlbnQpO1xuICAgIGFuaW1hdGlvbjogdGYtc2hpbW1lciAxLjRzIGluZmluaXRlO1xuICB9XG5cbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICAmOjphZnRlciB7XG4gICAgICBhbmltYXRpb246IG5vbmU7XG4gICAgfVxuICB9XG59XG5cbkBrZXlmcmFtZXMgdGYtc2hpbW1lciB7XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgfVxufVxuIiwiLy8gTGEgcmVqaWxsYSBkZSBjYXRlZ29yw4PCrWFzIHZpdmUgZW4gc2hhcmVkL2NvbXBvbmVudHMvY2F0ZWdvcnktZ3JpZCB5IGVsXG4vLyBibG9xdWUgXCJSZWNpZW50ZXNcIiBlbiB0aGVtZS9fcmVjZW50LWNvbHVtbnMuc2NzcyDDosKAwpQgY29tcGFydGlkb3MgY29uXG4vLyBCaWJsaW90ZWNhICh0ZW1wbGF0ZXMucGFnZSksIGRlIGxhIHF1ZSBlc3RhIHDDg8KhZ2luYSBlcyBsYSBvdHJhIG1pdGFkLlxuQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvc2tlbGV0b24nO1xuQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvcmVjZW50LWNvbHVtbnMnO1xuXG4ubWV0aG9kLWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLXRmLWJnKTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAyMHB4O1xuICAtLXBhZGRpbmctZW5kOiAyMHB4O1xuICAtLXBhZGRpbmctdG9wOiA0cHg7XG4gIC0tcGFkZGluZy1ib3R0b206IDMycHg7XG5cbiAgQGluY2x1ZGUgdGYtcmVjZW50LWNvbHVtbnM7XG4gIC8vIFNvbG8gbGEgY29sdW1uYSBkZSBjaGVjay1pbnMgdHJhZSBBcGxpY2FyL0JvcnJhciBlbiBsYSBwcm9waWEgZmlsYS5cbiAgQGluY2x1ZGUgdGYtcmVjZW50LXJvdy1hY3Rpb25zO1xufVxuXG4ucGFnZS1oaW50IHtcbiAgbWFyZ2luOiAwIDAgdmFyKC0tdGYtc3BhY2UtNSk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xufVxuXG4uc2VjdGlvbi1oZWFkaW5nIHtcbiAgbWFyZ2luOiAwIDAgdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWxnKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xufVxuXG4uZW1wdHktaGludCB7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBtYXJnaW46IDAgMCB2YXIoLS10Zi1zcGFjZS02KTtcbn1cblxuLnNrZWxldG9uLWJsb2NrIHtcbiAgQGluY2x1ZGUgdGYtc2tlbGV0b24tc2hpbW1lcjtcbn1cbiIsIi8vIEJsb3F1ZSBcIlJlY2llbnRlc1wiIMOiwoDClCByZWppbGxhIGRlIGNvbHVtbmFzLCB1bmEgcG9yIHRpcG8gZGUgcGxhbnRpbGxhLCBjb25cbi8vIGZpbGFzIGNvbXBhY3Rhcy4gRXN0YWJhIGRlbnRybyBkZSB0ZW1wbGF0ZXMucGFnZS5zY3NzOyBhbCBwYXJ0aXJzZVxuLy8gXCJQbGFudGlsbGFzXCIgZW4gQmlibGlvdGVjYSB5IE1pIG3Dg8KpdG9kbyAoTW92aW1pZW50byAxIENvYWNoIFBybykgbGFzIGRvc1xuLy8gcMODwqFnaW5hcyBsbyBuZWNlc2l0YW4gaWTDg8KpbnRpY28sIGFzw4PCrSBxdWUgc2UgZXh0cmFlIGFxdcODwq0gZW4gdmV6IGRlIGNvcGlhcmxvLlxuLy8gTWlzbW8gY3JpdGVyaW8geSBtaXNtYSBmb3JtYSBxdWUgX3NrZWxldG9uLnNjc3M6IHVuIG1peGluIHF1ZSBjYWRhIHDDg8KhZ2luYVxuLy8gYXBsaWNhIHkgc29icmUgZWwgcXVlIGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvIHF1ZSB2YXLDg8KtYS5cbkBtaXhpbiB0Zi1yZWNlbnQtY29sdW1ucyB7XG4gIC8vIC0tLSBhdXRvLWZpdCBoYWNlIHF1ZSB1bmEgY29sdW1uYSBxdWUgbm8gbGxlZ2EgYSByZW5kZXJpemFyc2UgKCpuZ0lmIGVuXG4gIC8vIGVsIDxzZWN0aW9uPikgbm8gcmVzZXJ2ZSBodWVjbzogbm8gaGF5IHVuIG7DgsK6IGZpam8gZGUgY29sdW1uYXMgcXVlXG4gIC8vIFwidmFjaWFyXCIsIGVsIGdyaWQgc2UgcmVwYXJ0ZSBzb2xvIGVudHJlIGxhcyBxdWUgc8ODwq0gZXhpc3Rlbi4gLS0tXG4gIC5yZWNlbnQtY29sdW1ucyB7XG4gICAgZGlzcGxheTogZ3JpZDtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDI2MHB4LCAxZnIpKTtcbiAgICBnYXA6IHZhcigtLXRmLXNwYWNlLTUpO1xuICAgIG1hcmdpbi1ib3R0b206IHZhcigtLXRmLXNwYWNlLTUpO1xuXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDcwMHB4KSB7XG4gICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgICB9XG4gIH1cblxuICAucmVjZW50LWNvbHVtbiB7XG4gICAgbWluLXdpZHRoOiAwO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbGcpO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gIH1cblxuICAucmVjZW50LWNvbHVtbi1oZWFkZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBnYXA6IHZhcigtLXRmLXNwYWNlLTIpO1xuICAgIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTQpIHZhcigtLXRmLXNwYWNlLTQpIHZhcigtLXRmLXNwYWNlLTMpO1xuICB9XG5cbiAgLnJlY2VudC1jb2x1bW4tdGl0bGUge1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1iYXNlKTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgfVxuXG4gIC5yZWNlbnQtY29sdW1uLWxpbmsge1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQtdGV4dCk7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB9XG5cbiAgLnJlY2VudC1za2VsZXRvbiB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gICAgcGFkZGluZzogMCB2YXIoLS10Zi1zcGFjZS00KSB2YXIoLS10Zi1zcGFjZS00KTtcbiAgfVxuXG4gIC5yZWNlbnQtcm93LXNrZWxldG9uIHtcbiAgICBoZWlnaHQ6IDQwcHg7XG4gICAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLXNtKTtcbiAgfVxuXG4gIC5yZWNlbnQtbGlzdCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG5cbiAgLnJlY2VudC1yb3cge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IHZhcigtLXRmLXNwYWNlLTMpO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTMpIHZhcigtLXRmLXNwYWNlLTQpO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAgICY6Zmlyc3QtY2hpbGQge1xuICAgICAgYm9yZGVyLXRvcDogbm9uZTtcbiAgICB9XG5cbiAgICAmOmhvdmVyLFxuICAgICY6YWN0aXZlIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMik7XG4gICAgfVxuXG4gICAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgICAgb3V0bGluZS1vZmZzZXQ6IC0ycHg7XG4gICAgfVxuICB9XG5cbiAgLnJlY2VudC1yb3ctaW5mbyB7XG4gICAgZmxleDogMTtcbiAgICBtaW4td2lkdGg6IDA7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGdhcDogMXB4O1xuICB9XG5cbiAgLnJlY2VudC1yb3ctbmFtZSB7XG4gICAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgfVxuXG4gIC5yZWNlbnQtcm93LW1ldGEge1xuICAgIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIH1cblxuICAucmVjZW50LXJvdy1jaGV2cm9uIHtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtZmFpbnQpO1xuICB9XG59XG5cbi8vIC0tLSBGaWxhIGNvbiBBcGxpY2FyL0VsaW1pbmFyIMOiwoDClCBtaXNtbyBwYXRyw4PCs24gcXVlIC50ZW1wbGF0ZS1jYXJkL1xuLy8gLnRlbXBsYXRlLWFjdGlvbnMgZW4gY2hlY2tpbi10ZW1wbGF0ZXMucGFnZS5zY3NzLCBhZGFwdGFkbyBhIGxhIGFsdHVyYVxuLy8gY29tcGFjdGEgZGUgLnJlY2VudC1yb3cgZW4gdmV6IGRlIHVuIGN1cnNvciBkZSA8YnV0dG9uPiDDg8K6bmljby4gTWl4aW5cbi8vIGFwYXJ0ZSBwb3JxdWUgc29sbyBsYSBjb2x1bW5hIGRlIGNoZWNrLWlucyB0aWVuZSBhY2Npb25lcyBlbiBsYSBmaWxhLiAtLS1cbkBtaXhpbiB0Zi1yZWNlbnQtcm93LWFjdGlvbnMge1xuICAucmVjZW50LXJvdy0td2l0aC1hY3Rpb25zIHtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG5cbiAgICAmOmhvdmVyLFxuICAgICY6YWN0aXZlIHtcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIH1cbiAgfVxuXG4gIC5yZWNlbnQtcm93LWluZm8ge1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgcGFkZGluZzogMnB4IDRweDtcbiAgICBtYXJnaW46IC0ycHggLTRweDtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAgICY6aG92ZXIsXG4gICAgJjphY3RpdmUge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbiAgICB9XG4gIH1cblxuICAucmVjZW50LXJvdy1hY3Rpb25zIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiA2cHg7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gIH1cblxuICAucmVjZW50LXJvdy1hY3Rpb24tYnRuIHtcbiAgICBoZWlnaHQ6IDMycHg7XG4gICAgcGFkZGluZzogMCAxMnB4O1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNSk7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBmb250LXNpemU6IDAuNzZyZW07XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAgICY6YWN0aXZlIHtcbiAgICAgIHRyYW5zZm9ybTogc2NhbGUoMC45NSk7XG4gICAgfVxuXG4gICAgJi0tZGFuZ2VyIHtcbiAgICAgIHBhZGRpbmc6IDAgOXB4O1xuICAgICAgY29sb3I6IHZhcigtLXRmLWRhbmdlcik7XG4gICAgICBib3JkZXItY29sb3I6IHJnYmEoMjM1LCA2OCwgOTAsIDAuMyk7XG5cbiAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgZm9udC1zaXplOiAxNXB4O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
}));


/***/ })

}]);
//# sourceMappingURL=src_app_features_method_method_module_ts.js.map