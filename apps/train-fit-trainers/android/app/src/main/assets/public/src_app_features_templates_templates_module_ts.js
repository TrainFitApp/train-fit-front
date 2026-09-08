"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_features_templates_templates_module_ts"],{

/***/ 94898:
/*!****************************************************************!*\
  !*** ./src/app/features/templates/templates-routing.module.ts ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TemplatesPageRoutingModule: () => (/* binding */ TemplatesPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _templates_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates.page */ 32391);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _TemplatesPageRoutingModule;




const routes = [{
  path: '',
  component: _templates_page__WEBPACK_IMPORTED_MODULE_1__.TemplatesPage
}];
class TemplatesPageRoutingModule {}
_TemplatesPageRoutingModule = TemplatesPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TemplatesPageRoutingModule, "\u0275fac", function TemplatesPageRoutingModule_Factory(t) {
  return new (t || _TemplatesPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TemplatesPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _TemplatesPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TemplatesPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](TemplatesPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 10939:
/*!********************************************************!*\
  !*** ./src/app/features/templates/templates.module.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TemplatesPageModule: () => (/* binding */ TemplatesPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _templates_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates-routing.module */ 94898);
/* harmony import */ var _templates_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./templates.page */ 32391);
/* harmony import */ var _shared_components_category_grid_category_grid_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/components/category-grid/category-grid.module */ 57818);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 69717);

var _TemplatesPageModule;





class TemplatesPageModule {}
_TemplatesPageModule = TemplatesPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TemplatesPageModule, "\u0275fac", function TemplatesPageModule_Factory(t) {
  return new (t || _TemplatesPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TemplatesPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
  type: _TemplatesPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TemplatesPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _templates_routing_module__WEBPACK_IMPORTED_MODULE_2__.TemplatesPageRoutingModule, _shared_components_category_grid_category_grid_module__WEBPACK_IMPORTED_MODULE_4__.CategoryGridModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](TemplatesPageModule, {
    declarations: [_templates_page__WEBPACK_IMPORTED_MODULE_3__.TemplatesPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _templates_routing_module__WEBPACK_IMPORTED_MODULE_2__.TemplatesPageRoutingModule, _shared_components_category_grid_category_grid_module__WEBPACK_IMPORTED_MODULE_4__.CategoryGridModule]
  });
})();

/***/ }),

/***/ 32391:
/*!******************************************************!*\
  !*** ./src/app/features/templates/templates.page.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TemplatesPage: () => (/* binding */ TemplatesPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_workout_template_workout_template_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/workout-template/workout-template-api.service */ 80441);
/* harmony import */ var _diet_templates_services_diet_template_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../diet-templates/services/diet-template-api.service */ 63459);
/* harmony import */ var src_app_core_services_routine_template_routine_template_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/routine-template/routine-template-api.service */ 76391);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _shared_components_category_grid_category_grid_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/components/category-grid/category-grid.component */ 32443);


var _TemplatesPage;








function TemplatesPage_section_16_div_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "div", 23);
  }
}
const _c0 = function () {
  return [1, 2, 3];
};
function TemplatesPage_section_16_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, TemplatesPage_section_16_div_6_div_1_Template, 1, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](1, _c0));
  }
}
function TemplatesPage_section_16_div_7_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function TemplatesPage_section_16_div_7_button_1_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r11);
      const template_r9 = restoredCtx.$implicit;
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r10.openFullRoutineTemplate(template_r9));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 27)(2, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "ion-icon", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const template_r9 = ctx.$implicit;
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](template_r9.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r8.fullRoutineTemplateMeta(template_r9));
  }
}
function TemplatesPage_section_16_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, TemplatesPage_section_16_div_7_button_1_Template, 7, 2, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r5.fullRoutineTemplates)("ngForTrackBy", ctx_r5.trackByFullRoutineTemplateId);
  }
}
function TemplatesPage_section_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "section", 15)(1, "div", 16)(2, "h3", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Rutinas");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Ver todas");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, TemplatesPage_section_16_div_6_Template, 2, 2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, TemplatesPage_section_16_div_7_Template, 2, 2, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r0.loadingFullRoutineTemplates);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r0.loadingFullRoutineTemplates);
  }
}
function TemplatesPage_section_17_div_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "div", 23);
  }
}
function TemplatesPage_section_17_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, TemplatesPage_section_17_div_6_div_1_Template, 1, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](1, _c0));
  }
}
function TemplatesPage_section_17_div_7_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function TemplatesPage_section_17_div_7_button_1_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r19);
      const rt_r17 = restoredCtx.$implicit;
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r18.openTemplate(rt_r17));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 27)(2, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "ion-icon", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rt_r17 = ctx.$implicit;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](rt_r17.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", ctx_r16.exerciseCount(rt_r17), " ejercicios");
  }
}
function TemplatesPage_section_17_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, TemplatesPage_section_17_div_7_button_1_Template, 7, 2, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r13.routineTemplates);
  }
}
function TemplatesPage_section_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "section", 15)(1, "div", 16)(2, "h3", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Entrenamientos");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "a", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Ver todas");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, TemplatesPage_section_17_div_6_Template, 2, 2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, TemplatesPage_section_17_div_7_Template, 2, 1, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r1.loadingRoutineTemplates);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r1.loadingRoutineTemplates);
  }
}
function TemplatesPage_section_18_div_6_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "div", 23);
  }
}
function TemplatesPage_section_18_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, TemplatesPage_section_18_div_6_div_1_Template, 1, 0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵpureFunction0"](1, _c0));
  }
}
function TemplatesPage_section_18_div_7_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function TemplatesPage_section_18_div_7_button_1_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r27);
      const dt_r25 = restoredCtx.$implicit;
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r26.openDietTemplate(dt_r25));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 27)(2, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](6, "ion-icon", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const dt_r25 = ctx.$implicit;
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](dt_r25.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r24.dietTemplateMeta(dt_r25));
  }
}
function TemplatesPage_section_18_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, TemplatesPage_section_18_div_7_button_1_Template, 7, 2, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r21.dietTemplates);
  }
}
function TemplatesPage_section_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "section", 15)(1, "div", 16)(2, "h3", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Dietas");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "a", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Ver todas");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, TemplatesPage_section_18_div_6_Template, 2, 2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, TemplatesPage_section_18_div_7_Template, 2, 1, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.loadingDietTemplates);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r2.loadingDietTemplates);
  }
}
function TemplatesPage_p_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " Todav\u00EDa no has creado nada. Empieza desde cualquiera de las categor\u00EDas de arriba. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
// TASK-003 (MASTER_BACKLOG.md) — la sección "Plantillas de rutinas" mostraba
// 3 tarjetas fijas hardcodeadas ("Hipertrofia 4 días", etc.) cuyo botón
// navegaba a la lista genérica /tabs/routines sin relación real con lo que
// prometía la tarjeta. Ahora muestra las plantillas reales del entrenador
// (WorkoutTemplateApiService, mismo servicio que RoutinesPage) y cada
// tarjeta navega a SU builder concreto (/tabs/routines/:id).
//
// Movimiento 1 Coach Pro — esta página era "Plantillas" y guardaba ocho cosas
// muy distintas: material para el cliente (dietas, rutinas) mezclado con la
// forma de trabajar del entrenador (protocolos, automatizaciones, plantillas
// de check-in). Se queda con lo primero y pasa a llamarse **Biblioteca**; lo
// segundo vive ahora en MethodPage (/tabs/method).
class TemplatesPage {
  constructor(workoutTemplateApi, dietTemplateApi, routineTemplateApi, router) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "workoutTemplateApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietTemplateApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "routineTemplateApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "categories", [{
      name: 'Entrenamientos',
      description: 'Biblioteca de bloques de entrenamiento reutilizables',
      icon: 'barbell-outline',
      colorVar: 'var(--tf-accent)',
      path: '/tabs/routines'
    }, {
      // Rutinas -> Plantillas (rediseño 2026-08): antes apuntaba a las Table
      // reales ya asignadas a clientes (rutinas en curso, no reutilizables).
      // Ahora es la biblioteca de plantillas de rutina COMPLETA (microciclos/
      // splits/workouts) del profesional, construida con el mismo
      // Planificador que usa con sus clientes — distinta de "Entrenamientos"
      // (plantilla de un solo día/sesión).
      name: 'Rutinas',
      description: 'Plantillas de rutina completa, listas para aplicar a cualquier cliente',
      icon: 'calendar-outline',
      colorVar: 'var(--tf-accent)',
      path: '/tabs/routine-templates'
    }, {
      name: 'Dietas',
      description: 'Días de comidas reutilizables para aplicar a cualquier cliente',
      icon: 'restaurant-outline',
      colorVar: 'var(--ion-color-tertiary, #ffd359)',
      path: '/tabs/diet-templates'
    }, {
      // Fase 5 Coach Pro (§16) — qué puede comer el cliente en lugar de qué.
      // Las equivalencias las define el coach: el sistema no las calcula.
      name: 'Intercambios',
      description: 'Grupos de alimentos equivalentes que tus clientes pueden consultar',
      icon: 'swap-horizontal-outline',
      colorVar: 'var(--ion-color-tertiary, #ffd359)',
      path: '/tabs/food-exchanges'
    }, {
      name: 'Componer para varios clientes',
      description: 'Pauta la misma comida a un grupo de clientes de una sola vez',
      icon: 'people-circle-outline',
      colorVar: 'var(--tf-accent-2, #4fc79a)',
      path: '/tabs/meal-compose'
    },
    // TASK-042 (MASTER_BACKLOG.md) — antes el catálogo de ejercicios solo era
    // alcanzable como modal picker dentro de construir un workout. Se anida
    // aquí (categoría dentro de "Biblioteca") en vez de como destino nuevo
    // en el sidebar principal, siguiendo el mismo patrón ya usado por
    // rutinas/nutrición/formularios — evita crecer el sidebar
    // (PRODUCT.md > Design Principles) para una pantalla de consulta, no de
    // flujo de trabajo principal.
    {
      name: 'Ejercicios',
      description: 'Consulta el catálogo completo fuera de construir un entrenamiento',
      icon: 'search-outline',
      colorVar: 'var(--tf-danger, #ff5c5c)',
      path: '/tabs/exercises'
    }]);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "routineTemplates", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "loadingRoutineTemplates", true);
    // --- Recientes por tipo (grid de columnas en escritorio) — misma fuente
    // de datos que cada lista completa (RoutinesPage/DietTemplatesListPage),
    // solo recortada a las 4 más nuevas. No hay columna para "Componer para
    // varios clientes"/"Ejercicios": no son plantillas con listado propio, son
    // herramientas.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "dietTemplates", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "loadingDietTemplates", true);
    // Plantillas de rutina COMPLETA (Table con userId=trainerId, microciclos/
    // splits/workouts) — distinto de "Entrenamientos" arriba (WorkoutTemplate,
    // plantilla de un solo día/sesión). Recortado a las 4 más recientes, mismo
    // criterio que las otras 3 columnas.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "fullRoutineTemplates", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "loadingFullRoutineTemplates", true);
    this.workoutTemplateApi = workoutTemplateApi;
    this.dietTemplateApi = dietTemplateApi;
    this.routineTemplateApi = routineTemplateApi;
    this.router = router;
  }
  ngOnInit() {
    this.loadRoutineTemplates();
    this.loadDietTemplates();
    this.loadFullRoutineTemplates();
  }
  // Mismo bug de caché de ion-router-outlet ya corregido en RoutinesPage/
  // DietTemplatesListPage — sin esto, tras crear una plantilla desde aquí y
  // volver, la preview seguiría mostrando el estado anterior.
  ionViewWillEnter() {
    this.loadRoutineTemplates();
    this.loadDietTemplates();
    this.loadFullRoutineTemplates();
  }
  loadRoutineTemplates() {
    this.loadingRoutineTemplates = true;
    this.workoutTemplateApi.list().subscribe({
      next: templates => {
        this.routineTemplates = templates.slice().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')).slice(0, 4);
        this.loadingRoutineTemplates = false;
      },
      error: () => {
        this.routineTemplates = [];
        this.loadingRoutineTemplates = false;
      }
    });
  }
  loadDietTemplates() {
    this.loadingDietTemplates = true;
    this.dietTemplateApi.list().subscribe({
      next: templates => {
        this.dietTemplates = (templates || []).slice().sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || '')).slice(0, 4);
        this.loadingDietTemplates = false;
      },
      error: () => {
        this.dietTemplates = [];
        this.loadingDietTemplates = false;
      }
    });
  }
  loadFullRoutineTemplates() {
    this.loadingFullRoutineTemplates = true;
    this.routineTemplateApi.list().subscribe({
      next: templates => {
        // Table no tiene createdAt (a diferencia de WorkoutTemplate/
        // DietTemplate) — el ObjectId ya codifica el instante de creación en
        // sus primeros 8 caracteres hex, así que ordena igual de bien sin
        // depender de un campo que no existe.
        this.fullRoutineTemplates = templates.slice().sort((a, b) => b._id.localeCompare(a._id)).slice(0, 4);
        this.loadingFullRoutineTemplates = false;
      },
      error: () => {
        this.fullRoutineTemplates = [];
        this.loadingFullRoutineTemplates = false;
      }
    });
  }
  openFullRoutineTemplate(template) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.router.navigate(['/tabs', 'routine-templates', template._id, 'planner']);
    })();
  }
  trackByFullRoutineTemplateId(_index, template) {
    return template._id;
  }
  fullRoutineTemplateMeta(template) {
    const microcycles = (template.splits || []).length;
    return `${microcycles} microciclo${microcycles === 1 ? '' : 's'}`;
  }
  exerciseCount(template) {
    return (template.blocks || []).reduce((total, block) => total + (block.exercises?.length || 0), 0);
  }
  openTemplate(template) {
    this.router.navigate(['/tabs/routines', template._id]);
  }
  openDietTemplate(template) {
    this.router.navigate(['/tabs/diet-templates', template._id]);
  }
  dietTemplateMeta(template) {
    return template.mode === 'sequential' ? `${template.days.length} día${template.days.length === 1 ? '' : 's'}` : `${template.dayPatterns.length} patrón${template.dayPatterns.length === 1 ? '' : 'es'}`;
  }
}
_TemplatesPage = TemplatesPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(TemplatesPage, "\u0275fac", function TemplatesPage_Factory(t) {
  return new (t || _TemplatesPage)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_core_services_workout_template_workout_template_api_service__WEBPACK_IMPORTED_MODULE_2__.WorkoutTemplateApiService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_diet_templates_services_diet_template_api_service__WEBPACK_IMPORTED_MODULE_3__.DietTemplateApiService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_core_services_routine_template_routine_template_api_service__WEBPACK_IMPORTED_MODULE_4__.RoutineTemplateApiService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(TemplatesPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: _TemplatesPage,
  selectors: [["app-templates"]],
  decls: 20,
  vars: 5,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["aria-label", "Abrir men\u00FA de navegaci\u00F3n", 1, "tf-page-header__back-button"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "templates-content"], [1, "page-hint"], [3, "categories"], [1, "section-heading"], [1, "recent-columns"], ["class", "recent-column", 4, "ngIf"], ["class", "empty-hint", 4, "ngIf"], [1, "recent-column"], [1, "recent-column-header"], [1, "recent-column-title"], ["routerLink", "/tabs/routine-templates", 1, "recent-column-link"], ["class", "recent-skeleton", 4, "ngIf"], ["class", "recent-list", 4, "ngIf"], [1, "recent-skeleton"], ["class", "skeleton-block recent-row-skeleton", 4, "ngFor", "ngForOf"], [1, "skeleton-block", "recent-row-skeleton"], [1, "recent-list"], ["type", "button", "class", "recent-row", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "recent-row", 3, "click"], [1, "recent-row-info"], [1, "recent-row-name"], [1, "recent-row-meta"], ["name", "chevron-forward-outline", 1, "recent-row-chevron"], ["routerLink", "/tabs/routines", 1, "recent-column-link"], ["type", "button", "class", "recent-row", 3, "click", 4, "ngFor", "ngForOf"], ["routerLink", "/tabs/diet-templates", 1, "recent-column-link"], [1, "empty-hint"]],
  template: function TemplatesPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](4, "ion-menu-button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "div", 5)(6, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "Biblioteca");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](8, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "ion-content", 8)(10, "p", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "Todo lo que preparas para d\u00E1rselo a un cliente: entrenamientos, rutinas, dietas e intercambios.");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "app-category-grid", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "h2", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](14, "Recientes");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](15, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](16, TemplatesPage_section_16_Template, 8, 2, "section", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](17, TemplatesPage_section_17_Template, 8, 2, "section", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](18, TemplatesPage_section_18_Template, 8, 2, "section", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](19, TemplatesPage_p_19_Template, 2, 0, "p", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("categories", ctx.categories);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.loadingFullRoutineTemplates || ctx.fullRoutineTemplates.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.loadingRoutineTemplates || ctx.routineTemplates.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.loadingDietTemplates || ctx.dietTemplates.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx.loadingRoutineTemplates && !ctx.loadingDietTemplates && !ctx.loadingFullRoutineTemplates && !ctx.routineTemplates.length && !ctx.dietTemplates.length && !ctx.fullRoutineTemplates.length);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonMenuButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.RouterLinkWithHrefDelegate, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink, _shared_components_category_grid_category_grid_component__WEBPACK_IMPORTED_MODULE_5__.CategoryGridComponent],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n.templates-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 20px;\n  --padding-end: 20px;\n  --padding-top: 4px;\n  --padding-bottom: 32px;\n}\n.templates-content[_ngcontent-%COMP%]   .recent-columns[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: var(--tf-space-5);\n  margin-bottom: var(--tf-space-5);\n}\n@media (max-width: 700px) {\n  .templates-content[_ngcontent-%COMP%]   .recent-columns[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.templates-content[_ngcontent-%COMP%]   .recent-column[_ngcontent-%COMP%] {\n  min-width: 0;\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n  overflow: hidden;\n}\n.templates-content[_ngcontent-%COMP%]   .recent-column-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: var(--tf-space-2);\n  padding: var(--tf-space-4) var(--tf-space-4) var(--tf-space-3);\n}\n.templates-content[_ngcontent-%COMP%]   .recent-column-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-base);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n.templates-content[_ngcontent-%COMP%]   .recent-column-link[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n  color: var(--tf-accent-text);\n  text-decoration: none;\n}\n.templates-content[_ngcontent-%COMP%]   .recent-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-2);\n  padding: 0 var(--tf-space-4) var(--tf-space-4);\n}\n.templates-content[_ngcontent-%COMP%]   .recent-row-skeleton[_ngcontent-%COMP%] {\n  height: 40px;\n  border-radius: var(--tf-radius-sm);\n}\n.templates-content[_ngcontent-%COMP%]   .recent-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.templates-content[_ngcontent-%COMP%]   .recent-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-3);\n  width: 100%;\n  padding: var(--tf-space-3) var(--tf-space-4);\n  background: transparent;\n  border: none;\n  border-top: 1px solid var(--tf-border);\n  color: inherit;\n  font-family: inherit;\n  text-align: left;\n  cursor: pointer;\n  transition: background var(--tf-duration-fast) var(--tf-ease-out);\n}\n.templates-content[_ngcontent-%COMP%]   .recent-row[_ngcontent-%COMP%]:first-child {\n  border-top: none;\n}\n.templates-content[_ngcontent-%COMP%]   .recent-row[_ngcontent-%COMP%]:hover, .templates-content[_ngcontent-%COMP%]   .recent-row[_ngcontent-%COMP%]:active {\n  background: var(--tf-surface-2);\n}\n.templates-content[_ngcontent-%COMP%]   .recent-row[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: -2px;\n}\n.templates-content[_ngcontent-%COMP%]   .recent-row-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n.templates-content[_ngcontent-%COMP%]   .recent-row-name[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  color: var(--tf-text);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.templates-content[_ngcontent-%COMP%]   .recent-row-meta[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-text-muted);\n}\n.templates-content[_ngcontent-%COMP%]   .recent-row-chevron[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 16px;\n  color: var(--tf-text-faint);\n}\n\n.page-hint[_ngcontent-%COMP%] {\n  margin: 0 0 var(--tf-space-5);\n  color: var(--tf-text-muted);\n  font-size: var(--tf-font-size-sm);\n}\n\n.section-heading[_ngcontent-%COMP%] {\n  margin: 0 0 var(--tf-space-4);\n  font-size: var(--tf-font-size-lg);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.empty-hint[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  font-size: var(--tf-font-size-sm);\n  margin: 0 0 var(--tf-space-6);\n}\n.empty-hint[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--tf-accent-text);\n  font-weight: 600;\n}\n\n.skeleton-block[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n}\n.skeleton-block[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvdGVtcGxhdGVzL3RlbXBsYXRlcy5wYWdlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX3JlY2VudC1jb2x1bW5zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJBO0VBQ0U7SUFDRSwyQkFBQTtFQ3hCRjtBQUNGO0FBR0E7RUFDRSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0FBREY7QUNERTtFQUNFLGFBQUE7RUFDQSwyREFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0NBQUE7QURHSjtBQ0RJO0VBTkY7SUFPSSwwQkFBQTtFRElKO0FBQ0Y7QUNERTtFQUNFLFlBQUE7RUFDQSwrQkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0NBQUE7RUFDQSxnQkFBQTtBREdKO0FDQUU7RUFDRSxhQUFBO0VBQ0EscUJBQUE7RUFDQSw4QkFBQTtFQUNBLHNCQUFBO0VBQ0EsOERBQUE7QURFSjtBQ0NFO0VBQ0UsU0FBQTtFQUNBLG1DQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtBRENKO0FDRUU7RUFDRSxjQUFBO0VBQ0EsaUNBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0VBQ0EscUJBQUE7QURBSjtBQ0dFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esc0JBQUE7RUFDQSw4Q0FBQTtBRERKO0FDSUU7RUFDRSxZQUFBO0VBQ0Esa0NBQUE7QURGSjtBQ0tFO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0FESEo7QUNNRTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLDRDQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0Esc0NBQUE7RUFDQSxjQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxpRUFBQTtBREpKO0FDTUk7RUFDRSxnQkFBQTtBREpOO0FDT0k7RUFFRSwrQkFBQTtBRE5OO0FDU0k7RUFDRSxtQ0FBQTtFQUNBLG9CQUFBO0FEUE47QUNXRTtFQUNFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtBRFRKO0FDWUU7RUFDRSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QURWSjtBQ2FFO0VBQ0UsaUNBQUE7RUFDQSwyQkFBQTtBRFhKO0FDY0U7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLDJCQUFBO0FEWko7O0FBL0ZBO0VBQ0UsNkJBQUE7RUFDQSwyQkFBQTtFQUNBLGlDQUFBO0FBa0dGOztBQS9GQTtFQUNFLDZCQUFBO0VBQ0EsaUNBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0FBa0dGOztBQS9GQTtFQUNFLDJCQUFBO0VBQ0EsaUNBQUE7RUFDQSw2QkFBQTtBQWtHRjtBQWhHRTtFQUNFLDRCQUFBO0VBQ0EsZ0JBQUE7QUFrR0o7O0FBOUZBO0VEcENFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSwrQkFBQTtBQ3NJRjtBRHBJRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSw0QkFBQTtFQUNBLCtFQUFBO0VBQ0EsbUNBQUE7QUNzSUo7QURuSUU7RUFDRTtJQUNFLGVBQUE7RUNxSUo7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8vIFNrZWxldG9uIGRlIGNhcmdhIGNvbiBiYXJyaWRvIGRlIHNoaW1tZXIgw6LCgMKUIG1pc21vIGJsb3F1ZSByZXBldGlkbyBsaXRlcmFsbWVudGVcbi8vIGVuIH4xMCBww4PCoWdpbmFzIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuXG4vLyBDYWRhIHDDg8KhZ2luYSBhcGxpY2EgZWwgbWl4aW4gc29icmUgc3UgcHJvcGlvIHNlbGVjdG9yIHkgYcODwrFhZGUgZW5jaW1hIHNvbG8gbG9cbi8vIHF1ZSB2YXLDg8KtYSAoYm9yZGVyLXJhZGl1cywgaGVpZ2h0LCB3aWR0aCwgdmFyaWFudGVzIGNvbiBub21icmUpLlxuQG1peGluIHRmLXNrZWxldG9uLXNoaW1tZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG5cbiAgJjo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldDogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgdHJhbnNwYXJlbnQsIHZhcigtLXRmLXNoaW1tZXIpLCB0cmFuc3BhcmVudCk7XG4gICAgYW5pbWF0aW9uOiB0Zi1zaGltbWVyIDEuNHMgaW5maW5pdGU7XG4gIH1cblxuICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xuICAgICY6OmFmdGVyIHtcbiAgICAgIGFuaW1hdGlvbjogbm9uZTtcbiAgICB9XG4gIH1cbn1cblxuQGtleWZyYW1lcyB0Zi1zaGltbWVyIHtcbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xuICB9XG59XG4iLCIvLyBFbCBibG9xdWUgLmNhdGVnb3J5LWdyaWQvLmNhdGVnb3J5LWNhcmQgdml2ZSBhaG9yYSBlblxuLy8gc2hhcmVkL2NvbXBvbmVudHMvY2F0ZWdvcnktZ3JpZCB5IGVsIGRlIFwiUmVjaWVudGVzXCIgZW5cbi8vIHRoZW1lL19yZWNlbnQtY29sdW1ucy5zY3NzIChNb3ZpbWllbnRvIDE6IGxvcyBjb21wYXJ0ZW4gQmlibGlvdGVjYSB5XG4vLyBNaSBtw4PCqXRvZG8pLlxuQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvc2tlbGV0b24nO1xuQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvcmVjZW50LWNvbHVtbnMnO1xuXG4udGVtcGxhdGVzLWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLXRmLWJnKTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAyMHB4O1xuICAtLXBhZGRpbmctZW5kOiAyMHB4O1xuICAtLXBhZGRpbmctdG9wOiA0cHg7XG4gIC0tcGFkZGluZy1ib3R0b206IDMycHg7XG5cbiAgQGluY2x1ZGUgdGYtcmVjZW50LWNvbHVtbnM7XG59XG5cbi5wYWdlLWhpbnQge1xuICBtYXJnaW46IDAgMCB2YXIoLS10Zi1zcGFjZS01KTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG59XG5cbi5zZWN0aW9uLWhlYWRpbmcge1xuICBtYXJnaW46IDAgMCB2YXIoLS10Zi1zcGFjZS00KTtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtbGcpO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG59XG5cbi5lbXB0eS1oaW50IHtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIG1hcmdpbjogMCAwIHZhcigtLXRmLXNwYWNlLTYpO1xuXG4gIGEge1xuICAgIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQtdGV4dCk7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgfVxufVxuXG4uc2tlbGV0b24tYmxvY2sge1xuICBAaW5jbHVkZSB0Zi1za2VsZXRvbi1zaGltbWVyO1xufVxuIiwiLy8gQmxvcXVlIFwiUmVjaWVudGVzXCIgw6LCgMKUIHJlamlsbGEgZGUgY29sdW1uYXMsIHVuYSBwb3IgdGlwbyBkZSBwbGFudGlsbGEsIGNvblxuLy8gZmlsYXMgY29tcGFjdGFzLiBFc3RhYmEgZGVudHJvIGRlIHRlbXBsYXRlcy5wYWdlLnNjc3M7IGFsIHBhcnRpcnNlXG4vLyBcIlBsYW50aWxsYXNcIiBlbiBCaWJsaW90ZWNhIHkgTWkgbcODwql0b2RvIChNb3ZpbWllbnRvIDEgQ29hY2ggUHJvKSBsYXMgZG9zXG4vLyBww4PCoWdpbmFzIGxvIG5lY2VzaXRhbiBpZMODwqludGljbywgYXPDg8KtIHF1ZSBzZSBleHRyYWUgYXF1w4PCrSBlbiB2ZXogZGUgY29waWFybG8uXG4vLyBNaXNtbyBjcml0ZXJpbyB5IG1pc21hIGZvcm1hIHF1ZSBfc2tlbGV0b24uc2NzczogdW4gbWl4aW4gcXVlIGNhZGEgcMODwqFnaW5hXG4vLyBhcGxpY2EgeSBzb2JyZSBlbCBxdWUgYcODwrFhZGUgZW5jaW1hIHNvbG8gbG8gcXVlIHZhcsODwq1hLlxuQG1peGluIHRmLXJlY2VudC1jb2x1bW5zIHtcbiAgLy8gLS0tIGF1dG8tZml0IGhhY2UgcXVlIHVuYSBjb2x1bW5hIHF1ZSBubyBsbGVnYSBhIHJlbmRlcml6YXJzZSAoKm5nSWYgZW5cbiAgLy8gZWwgPHNlY3Rpb24+KSBubyByZXNlcnZlIGh1ZWNvOiBubyBoYXkgdW4gbsOCwrogZmlqbyBkZSBjb2x1bW5hcyBxdWVcbiAgLy8gXCJ2YWNpYXJcIiwgZWwgZ3JpZCBzZSByZXBhcnRlIHNvbG8gZW50cmUgbGFzIHF1ZSBzw4PCrSBleGlzdGVuLiAtLS1cbiAgLnJlY2VudC1jb2x1bW5zIHtcbiAgICBkaXNwbGF5OiBncmlkO1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjYwcHgsIDFmcikpO1xuICAgIGdhcDogdmFyKC0tdGYtc3BhY2UtNSk7XG4gICAgbWFyZ2luLWJvdHRvbTogdmFyKC0tdGYtc3BhY2UtNSk7XG5cbiAgICBAbWVkaWEgKG1heC13aWR0aDogNzAwcHgpIHtcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICAgIH1cbiAgfVxuXG4gIC5yZWNlbnQtY29sdW1uIHtcbiAgICBtaW4td2lkdGg6IDA7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0xKTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICAgIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1sZyk7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgfVxuXG4gIC5yZWNlbnQtY29sdW1uLWhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogYmFzZWxpbmU7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gICAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtNCkgdmFyKC0tdGYtc3BhY2UtNCkgdmFyKC0tdGYtc3BhY2UtMyk7XG4gIH1cblxuICAucmVjZW50LWNvbHVtbi10aXRsZSB7XG4gICAgbWFyZ2luOiAwO1xuICAgIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWJhc2UpO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICB9XG5cbiAgLnJlY2VudC1jb2x1bW4tbGluayB7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUteHMpO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLXRmLWFjY2VudC10ZXh0KTtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIH1cblxuICAucmVjZW50LXNrZWxldG9uIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgICBwYWRkaW5nOiAwIHZhcigtLXRmLXNwYWNlLTQpIHZhcigtLXRmLXNwYWNlLTQpO1xuICB9XG5cbiAgLnJlY2VudC1yb3ctc2tlbGV0b24ge1xuICAgIGhlaWdodDogNDBweDtcbiAgICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtc20pO1xuICB9XG5cbiAgLnJlY2VudC1saXN0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIH1cblxuICAucmVjZW50LXJvdyB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogdmFyKC0tdGYtc3BhY2UtMyk7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtMykgdmFyKC0tdGYtc3BhY2UtNCk7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICAgIGNvbG9yOiBpbmhlcml0O1xuICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICAgJjpmaXJzdC1jaGlsZCB7XG4gICAgICBib3JkZXItdG9wOiBub25lO1xuICAgIH1cblxuICAgICY6aG92ZXIsXG4gICAgJjphY3RpdmUge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbiAgICB9XG5cbiAgICAmOmZvY3VzLXZpc2libGUge1xuICAgICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgICBvdXRsaW5lLW9mZnNldDogLTJweDtcbiAgICB9XG4gIH1cblxuICAucmVjZW50LXJvdy1pbmZvIHtcbiAgICBmbGV4OiAxO1xuICAgIG1pbi13aWR0aDogMDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgZ2FwOiAxcHg7XG4gIH1cblxuICAucmVjZW50LXJvdy1uYW1lIHtcbiAgICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB9XG5cbiAgLnJlY2VudC1yb3ctbWV0YSB7XG4gICAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUteHMpO1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgfVxuXG4gIC5yZWNlbnQtcm93LWNoZXZyb24ge1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dC1mYWludCk7XG4gIH1cbn1cblxuLy8gLS0tIEZpbGEgY29uIEFwbGljYXIvRWxpbWluYXIgw6LCgMKUIG1pc21vIHBhdHLDg8KzbiBxdWUgLnRlbXBsYXRlLWNhcmQvXG4vLyAudGVtcGxhdGUtYWN0aW9ucyBlbiBjaGVja2luLXRlbXBsYXRlcy5wYWdlLnNjc3MsIGFkYXB0YWRvIGEgbGEgYWx0dXJhXG4vLyBjb21wYWN0YSBkZSAucmVjZW50LXJvdyBlbiB2ZXogZGUgdW4gY3Vyc29yIGRlIDxidXR0b24+IMODwrpuaWNvLiBNaXhpblxuLy8gYXBhcnRlIHBvcnF1ZSBzb2xvIGxhIGNvbHVtbmEgZGUgY2hlY2staW5zIHRpZW5lIGFjY2lvbmVzIGVuIGxhIGZpbGEuIC0tLVxuQG1peGluIHRmLXJlY2VudC1yb3ctYWN0aW9ucyB7XG4gIC5yZWNlbnQtcm93LS13aXRoLWFjdGlvbnMge1xuICAgIGN1cnNvcjogZGVmYXVsdDtcblxuICAgICY6aG92ZXIsXG4gICAgJjphY3RpdmUge1xuICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgfVxuICB9XG5cbiAgLnJlY2VudC1yb3ctaW5mbyB7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBwYWRkaW5nOiAycHggNHB4O1xuICAgIG1hcmdpbjogLTJweCAtNHB4O1xuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICAgJjpob3ZlcixcbiAgICAmOmFjdGl2ZSB7XG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICAgIH1cbiAgfVxuXG4gIC5yZWNlbnQtcm93LWFjdGlvbnMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDZweDtcbiAgICBmbGV4LXNocmluazogMDtcbiAgfVxuXG4gIC5yZWNlbnQtcm93LWFjdGlvbi1idG4ge1xuICAgIGhlaWdodDogMzJweDtcbiAgICBwYWRkaW5nOiAwIDEycHg7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS01KTtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIGZvbnQtc2l6ZTogMC43NnJlbTtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICAgJjphY3RpdmUge1xuICAgICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk1KTtcbiAgICB9XG5cbiAgICAmLS1kYW5nZXIge1xuICAgICAgcGFkZGluZzogMCA5cHg7XG4gICAgICBjb2xvcjogdmFyKC0tdGYtZGFuZ2VyKTtcbiAgICAgIGJvcmRlci1jb2xvcjogcmdiYSgyMzUsIDY4LCA5MCwgMC4zKTtcblxuICAgICAgaW9uLWljb24ge1xuICAgICAgICBmb250LXNpemU6IDE1cHg7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ })

}]);
//# sourceMappingURL=src_app_features_templates_templates_module_ts.js.map