"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_features_checkin-templates_checkin-templates_module_ts"],{

/***/ 80182:
/*!********************************************************************************!*\
  !*** ./src/app/features/checkin-templates/checkin-templates-routing.module.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckinTemplatesPageRoutingModule: () => (/* binding */ CheckinTemplatesPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _checkin_templates_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./checkin-templates.page */ 81512);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _CheckinTemplatesPageRoutingModule;




const routes = [{
  path: '',
  component: _checkin_templates_page__WEBPACK_IMPORTED_MODULE_1__.CheckinTemplatesPage
}];
class CheckinTemplatesPageRoutingModule {}
_CheckinTemplatesPageRoutingModule = CheckinTemplatesPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CheckinTemplatesPageRoutingModule, "\u0275fac", function CheckinTemplatesPageRoutingModule_Factory(t) {
  return new (t || _CheckinTemplatesPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CheckinTemplatesPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _CheckinTemplatesPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CheckinTemplatesPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](CheckinTemplatesPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 49087:
/*!************************************************************************!*\
  !*** ./src/app/features/checkin-templates/checkin-templates.module.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckinTemplatesPageModule: () => (/* binding */ CheckinTemplatesPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _checkin_templates_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./checkin-templates-routing.module */ 80182);
/* harmony import */ var _checkin_templates_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./checkin-templates.page */ 81512);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);

var _CheckinTemplatesPageModule;




class CheckinTemplatesPageModule {}
_CheckinTemplatesPageModule = CheckinTemplatesPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CheckinTemplatesPageModule, "\u0275fac", function CheckinTemplatesPageModule_Factory(t) {
  return new (t || _CheckinTemplatesPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CheckinTemplatesPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _CheckinTemplatesPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CheckinTemplatesPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _checkin_templates_routing_module__WEBPACK_IMPORTED_MODULE_2__.CheckinTemplatesPageRoutingModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](CheckinTemplatesPageModule, {
    declarations: [_checkin_templates_page__WEBPACK_IMPORTED_MODULE_3__.CheckinTemplatesPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _checkin_templates_routing_module__WEBPACK_IMPORTED_MODULE_2__.CheckinTemplatesPageRoutingModule]
  });
})();

/***/ }),

/***/ 81512:
/*!**********************************************************************!*\
  !*** ./src/app/features/checkin-templates/checkin-templates.page.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CADENCE_OPTIONS: () => (/* binding */ CADENCE_OPTIONS),
/* harmony export */   CheckinTemplatesPage: () => (/* binding */ CheckinTemplatesPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_core_constants_checkin_fields__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/constants/checkin-fields */ 73946);
/* harmony import */ var _components_apply_checkin_template_modal_apply_checkin_template_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/apply-checkin-template-modal/apply-checkin-template-modal.component */ 79651);
/* harmony import */ var _models_checkin_template_model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./models/checkin-template.model */ 86284);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _services_checkin_templates_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./services/checkin-templates-api.service */ 47672);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 54844);


var _CheckinTemplatesPage;









function CheckinTemplatesPage_div_12_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 18)(1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](2, "div", 20)(3, "div", 21)(4, "div", 22)(5, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](7, "div", 25)(8, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
}
const _c0 = function () {
  return [1, 2, 3, 4, 5, 6];
};
function CheckinTemplatesPage_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, CheckinTemplatesPage_div_12_div_1_Template, 9, 0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](1, _c0));
  }
}
function CheckinTemplatesPage_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "ion-icon", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "No se pudieron cargar tus plantillas");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5, "Comprueba tu conexi\u00F3n e int\u00E9ntalo de nuevo.");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "button", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CheckinTemplatesPage_div_13_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r7.load());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7, "Reintentar");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
}
function CheckinTemplatesPage_ng_container_14_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "ion-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "Todav\u00EDa no tienes plantillas");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5, "Crea una plantilla de check-in para pedir seguimiento peri\u00F3dico a tus clientes.");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CheckinTemplatesPage_ng_container_14_div_1_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r12);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r11.openCreatePanel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7, "Crear plantilla");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
}
function CheckinTemplatesPage_ng_container_14_div_2_div_1_div_7_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "ion-icon", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipe"](3, "lowercase");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const g_r19 = ctx.$implicit;
    const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("name", ctx_r18.groupIcon(g_r19.key));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate2"](" ", g_r19.count, " ", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpipeBind1"](3, 3, g_r19.label), " ");
  }
}
function CheckinTemplatesPage_ng_container_14_div_2_div_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, CheckinTemplatesPage_ng_container_14_div_2_div_1_div_7_span_1_Template, 4, 5, "span", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const template_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r15.templateGroupSummary(template_r14));
  }
}
function CheckinTemplatesPage_ng_container_14_div_2_div_1_ng_template_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "p", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, "Sin campos activados");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function CheckinTemplatesPage_ng_container_14_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 35)(1, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CheckinTemplatesPage_ng_container_14_div_2_div_1_Template_div_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r22);
      const template_r14 = restoredCtx.$implicit;
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r21.openEditPanel(template_r14));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "div", 37)(3, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "span", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](7, CheckinTemplatesPage_ng_container_14_div_2_div_1_div_7_Template, 2, 1, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](8, CheckinTemplatesPage_ng_container_14_div_2_div_1_ng_template_8_Template, 2, 0, "ng-template", null, 41, _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "div", 24)(13, "button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CheckinTemplatesPage_ng_container_14_div_2_div_1_Template_button_click_13_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r22);
      const template_r14 = restoredCtx.$implicit;
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r23.openApplyPanel(template_r14));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](14, "Aplicar");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "button", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CheckinTemplatesPage_ng_container_14_div_2_div_1_Template_button_click_15_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r22);
      const template_r14 = restoredCtx.$implicit;
      const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r24.confirmDelete(template_r14));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](16, "ion-icon", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const template_r14 = ctx.$implicit;
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵreference"](9);
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](template_r14.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵclassProp"]("cadence-badge--once", template_r14.cadence === "once");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", ctx_r13.cadenceLabel(template_r14), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r13.templateGroupSummary(template_r14).length)("ngIfElse", _r16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", template_r14.enabledFields.length, " campos en total");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵattribute"]("aria-label", "Borrar plantilla " + template_r14.name);
  }
}
function CheckinTemplatesPage_ng_container_14_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, CheckinTemplatesPage_ng_container_14_div_2_div_1_Template, 17, 8, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r10.templates)("ngForTrackBy", ctx_r10.trackByTemplateId);
  }
}
function CheckinTemplatesPage_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, CheckinTemplatesPage_ng_container_14_div_1_Template, 8, 0, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, CheckinTemplatesPage_ng_container_14_div_2_Template, 2, 2, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r2.templates.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r2.templates.length);
  }
}
function CheckinTemplatesPage_div_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CheckinTemplatesPage_div_15_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r26);
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r25.closeEditPanel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function CheckinTemplatesPage_div_16_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CheckinTemplatesPage_div_16_button_10_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r36);
      const option_r34 = restoredCtx.$implicit;
      const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r35.formCadence = option_r34.value);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const option_r34 = ctx.$implicit;
    const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵclassProp"]("cadence-option--active", ctx_r27.formCadence === option_r34.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", option_r34.label, " ");
  }
}
function CheckinTemplatesPage_div_16_div_11_button_4_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const field_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" (", field_r39.unit, ")");
  }
}
function CheckinTemplatesPage_div_16_div_11_button_4_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const field_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    const ctx_r41 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r41.fieldDetail(field_r39));
  }
}
function CheckinTemplatesPage_div_16_div_11_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r45 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CheckinTemplatesPage_div_16_div_11_button_4_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r45);
      const field_r39 = restoredCtx.$implicit;
      const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r44.toggleField(field_r39.key));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "span", 73)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](4, CheckinTemplatesPage_div_16_div_11_button_4_span_4_Template, 2, 1, "span", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, CheckinTemplatesPage_div_16_div_11_button_4_span_5_Template, 2, 1, "span", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](6, "ion-icon", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const field_r39 = ctx.$implicit;
    const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](field_r39.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", field_r39.unit);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r38.fieldDetail(field_r39));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵclassProp"]("field-toggle-icon--active", ctx_r38.isFieldEnabled(field_r39.key));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("name", ctx_r38.isFieldEnabled(field_r39.key) ? "checkbox" : "square-outline");
  }
}
function CheckinTemplatesPage_div_16_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 62)(1, "h4", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "div", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](4, CheckinTemplatesPage_div_16_div_11_button_4_Template, 7, 6, "button", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const group_r37 = ctx.$implicit;
    const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](group_r37.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", group_r37.fields)("ngForTrackBy", ctx_r28.trackByFieldKey);
  }
}
function CheckinTemplatesPage_div_16_div_17_option_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "option", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const type_r51 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("value", type_r51.key);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](type_r51.label);
  }
}
function CheckinTemplatesPage_div_16_div_17_input_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r54 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "input", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CheckinTemplatesPage_div_16_div_17_input_8_Template_input_ngModelChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r54);
      const question_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](question_r46.unit = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    const question_r46 = ctx_r55.$implicit;
    const i_r47 = ctx_r55.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", question_r46.unit);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵattribute"]("aria-label", "Unidad de la pregunta " + (i_r47 + 1));
  }
}
function CheckinTemplatesPage_div_16_div_17_div_13_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r62 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 95)(1, "input", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CheckinTemplatesPage_div_16_div_17_div_13_div_1_Template_input_ngModelChange_1_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r62);
      const o_r59 = restoredCtx.index;
      const question_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2).$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](question_r46.options[o_r59] = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "button", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CheckinTemplatesPage_div_16_div_17_div_13_div_1_Template_button_click_2_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r62);
      const o_r59 = restoredCtx.index;
      const question_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2).$implicit;
      const ctx_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r63.removeOption(question_r46, o_r59));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "ion-icon", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const o_r59 = ctx.index;
    const question_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", question_r46.options[o_r59]);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵattribute"]("aria-label", "Opci\u00F3n " + (o_r59 + 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵattribute"]("aria-label", "Quitar la opci\u00F3n " + (o_r59 + 1));
  }
}
function CheckinTemplatesPage_div_16_div_17_div_13_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r68 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CheckinTemplatesPage_div_16_div_17_div_13_button_2_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r68);
      const question_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2).$implicit;
      const ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r66.addOption(question_r46));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "ion-icon", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "A\u00F1adir opci\u00F3n ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function CheckinTemplatesPage_div_16_div_17_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, CheckinTemplatesPage_div_16_div_17_div_13_div_1_Template, 4, 3, "div", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, CheckinTemplatesPage_div_16_div_17_div_13_button_2_Template, 3, 0, "button", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const question_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", question_r46.options)("ngForTrackBy", ctx_r50.trackByIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ((question_r46.options == null ? null : question_r46.options.length) || 0) < ctx_r50.maxQuestionOptions);
  }
}
function CheckinTemplatesPage_div_16_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r71 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 78)(1, "div", 79)(2, "input", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CheckinTemplatesPage_div_16_div_17_Template_input_ngModelChange_2_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r71);
      const question_r46 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](question_r46.label = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](3, "button", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CheckinTemplatesPage_div_16_div_17_Template_button_click_3_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r71);
      const i_r47 = restoredCtx.index;
      const ctx_r72 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r72.removeCustomQuestion(i_r47));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "ion-icon", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div", 83)(6, "select", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CheckinTemplatesPage_div_16_div_17_Template_select_ngModelChange_6_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r71);
      const question_r46 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](question_r46.type = $event);
    })("ngModelChange", function CheckinTemplatesPage_div_16_div_17_Template_select_ngModelChange_6_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r71);
      const question_r46 = restoredCtx.$implicit;
      const ctx_r74 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r74.onQuestionTypeChange(question_r46));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](7, CheckinTemplatesPage_div_16_div_17_option_7_Template, 2, 2, "option", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](8, CheckinTemplatesPage_div_16_div_17_input_8_Template, 1, 2, "input", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "button", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CheckinTemplatesPage_div_16_div_17_Template_button_click_9_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r71);
      const question_r46 = restoredCtx.$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](question_r46.required = !question_r46.required);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](10, " Obligatoria ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "p", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](13, CheckinTemplatesPage_div_16_div_17_div_13_Template, 3, 3, "div", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const question_r46 = ctx.$implicit;
    const i_r47 = ctx.index;
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", question_r46.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵattribute"]("aria-label", "Enunciado de la pregunta " + (i_r47 + 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵattribute"]("aria-label", "Quitar la pregunta " + (i_r47 + 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", question_r46.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵattribute"]("aria-label", "Tipo de la pregunta " + (i_r47 + 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r29.questionTypes);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", question_r46.type === "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵclassProp"]("required-toggle--on", question_r46.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵattribute"]("aria-checked", !!question_r46.required);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r29.hintFor(question_r46));
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", question_r46.type === "select");
  }
}
function CheckinTemplatesPage_div_16_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r77 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "button", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CheckinTemplatesPage_div_16_button_18_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r77);
      const ctx_r76 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r76.addCustomQuestion());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "ion-icon", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2, "A\u00F1adir pregunta ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function CheckinTemplatesPage_div_16_p_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "p", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r31.customQuestionsError);
  }
}
function CheckinTemplatesPage_div_16_span_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r32.editingId ? "Guardar cambios" : "Crear plantilla");
  }
}
function CheckinTemplatesPage_div_16_ion_spinner_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "ion-spinner", 101);
  }
}
function CheckinTemplatesPage_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r79 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "h3", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "div", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](5, "ion-icon", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "input", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function CheckinTemplatesPage_div_16_Template_input_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r79);
      const ctx_r78 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r78.formName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "h4", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](8, "Cadencia");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "div", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](10, CheckinTemplatesPage_div_16_button_10_Template, 2, 3, "button", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](11, CheckinTemplatesPage_div_16_div_11_Template, 5, 3, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "div", 62)(13, "h4", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](14, "Tus propias preguntas");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](15, "p", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](16, " Lo que el cat\u00E1logo de arriba no cubra. Estas respuestas se guardan y se te muestran, pero no alimentan gr\u00E1ficas ni automatizaciones \u2014 para eso est\u00E1n los campos del cat\u00E1logo. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](17, CheckinTemplatesPage_div_16_div_17_Template, 14, 12, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](18, CheckinTemplatesPage_div_16_button_18_Template, 3, 0, "button", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](19, CheckinTemplatesPage_div_16_p_19_Template, 2, 1, "p", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](20, "button", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CheckinTemplatesPage_div_16_Template_button_click_20_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r79);
      const ctx_r80 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r80.saveTemplate());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](21, CheckinTemplatesPage_div_16_span_21_Template, 2, 1, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](22, CheckinTemplatesPage_div_16_ion_spinner_22_Template, 1, 0, "ion-spinner", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](ctx_r4.editingId ? "Editar plantilla" : "Nueva plantilla");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r4.formName);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r4.CADENCE_OPTIONS);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r4.groups);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r4.formCustomQuestions)("ngForTrackBy", ctx_r4.trackByIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r4.formCustomQuestions.length < ctx_r4.maxCustomQuestions);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r4.customQuestionsError);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("disabled", !ctx_r4.formName.trim() || ctx_r4.isSaving);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r4.isSaving);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r4.isSaving);
  }
}
// Mismos topes que valida el backend (checkin-controller.js): decirlos aquí
// evita ofrecer un botón "añadir" que siempre acabaría en un 400.
const MAX_CUSTOM_QUESTIONS = 20;
const MAX_QUESTION_OPTIONS = 10;
const GROUP_LABELS = {
  composicion_corporal: 'Composición corporal',
  perimetros: 'Perímetros',
  bienestar: 'Bienestar'
};
const GROUP_ICONS = {
  composicion_corporal: 'body-outline',
  perimetros: 'resize-outline',
  bienestar: 'heart-outline'
};
const CADENCE_OPTIONS = [{
  value: 'weekly',
  label: 'Semanal'
}, {
  value: 'biweekly',
  label: 'Quincenal'
}, {
  value: 'once',
  label: 'Una vez'
}];
const CADENCE_LABELS = {
  weekly: 'semanal',
  biweekly: 'quincenal',
  once: 'una vez'
};
class CheckinTemplatesPage {
  cadenceLabel(template) {
    return CADENCE_LABELS[template.cadence] || template.cadence;
  }
  // Desglose por grupo ("3 composición corporal", "5 perímetros"...) para
  // que la card muestre de un vistazo QUÉ tiene activado la plantilla, no
  // solo un conteo total — antes solo decía "8 campos", sin decir de qué.
  // Cacheado por _id (no un getter evaluado en cada ciclo de detección de
  // cambios del *ngFor, mismo criterio que filteredApplyClients de abajo).

  templateGroupSummary(template) {
    const cached = this.groupSummaryCache.get(template._id);
    if (cached) return cached;
    const summary = this.groups.map(g => ({
      key: g.key,
      label: g.label,
      count: g.fields.filter(f => template.enabledFields.includes(f.key)).length
    })).filter(g => g.count > 0);
    this.groupSummaryCache.set(template._id, summary);
    return summary;
  }
  groupIcon(key) {
    return GROUP_ICONS[key];
  }
  constructor(checkinTemplatesApi, ionicUtilService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "checkinTemplatesApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "state", 'loading');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "templates", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "groups", ['composicion_corporal', 'perimetros', 'bienestar'].map(key => ({
      key,
      label: GROUP_LABELS[key],
      fields: src_app_core_constants_checkin_fields__WEBPACK_IMPORTED_MODULE_2__.CHECKIN_FIELDS.filter(f => f.group === key)
    })));
    // --- Panel: crear/editar plantilla ---
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "showEditPanel", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "editingId", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "formName", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "formFields", new Set());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "formCadence", 'weekly');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isSaving", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "CADENCE_OPTIONS", CADENCE_OPTIONS);
    // Fase 5 Coach Pro — preguntas propias del coach (§7). Conviven con
    // formFields, que sigue siendo el catálogo cerrado.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "formCustomQuestions", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "questionTypes", _models_checkin_template_model__WEBPACK_IMPORTED_MODULE_4__.CUSTOM_QUESTION_TYPES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "maxCustomQuestions", MAX_CUSTOM_QUESTIONS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "maxQuestionOptions", MAX_QUESTION_OPTIONS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "groupSummaryCache", new Map());
    this.checkinTemplatesApi = checkinTemplatesApi;
    this.ionicUtilService = ionicUtilService;
  }
  ngOnInit() {
    this.load();
  }
  load() {
    this.state = 'loading';
    this.checkinTemplatesApi.list().subscribe({
      next: templates => {
        this.templates = templates || [];
        // Invalida el caché de desglose por grupo — una plantilla editada
        // conserva el mismo _id, así que sin esto seguiría mostrando el
        // desglose de campos anterior tras guardar cambios.
        this.groupSummaryCache.clear();
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      }
    });
  }
  // --- Crear/editar ---
  openCreatePanel() {
    this.editingId = null;
    this.formName = '';
    this.formFields = new Set();
    this.formCadence = 'weekly';
    this.formCustomQuestions = [];
    this.showEditPanel = true;
  }
  openEditPanel(template) {
    this.editingId = template._id;
    this.formName = template.name;
    this.formFields = new Set(template.enabledFields);
    this.formCadence = template.cadence;
    // Copia, no referencia: cancelar el panel no debe dejar editada la
    // plantilla de la lista de detrás.
    this.formCustomQuestions = (template.customQuestions || []).map(q => ({
      ...q,
      options: [...(q.options || [])]
    }));
    this.showEditPanel = true;
  }
  // --- Preguntas propias (Fase 5, §7) ---
  addCustomQuestion() {
    if (this.formCustomQuestions.length >= MAX_CUSTOM_QUESTIONS) return;
    this.formCustomQuestions = [...this.formCustomQuestions, {
      label: '',
      type: 'scale_1_5',
      unit: '',
      options: [],
      required: false,
      enabled: true
    }];
  }
  removeCustomQuestion(index) {
    this.formCustomQuestions = this.formCustomQuestions.filter((_, i) => i !== index);
  }
  // Al cambiar de tipo se limpia lo que ya no aplica: una pregunta que era
  // "selector" y pasa a "número" arrastraría opciones invisibles que el
  // backend seguiría guardando.
  onQuestionTypeChange(question) {
    if (question.type !== 'select') question.options = [];
    if (question.type !== 'number') question.unit = '';
  }
  addOption(question) {
    if ((question.options?.length || 0) >= MAX_QUESTION_OPTIONS) return;
    question.options = [...(question.options || []), ''];
  }
  removeOption(question, index) {
    question.options = (question.options || []).filter((_, i) => i !== index);
  }
  trackByIndex(index) {
    return index;
  }
  // Qué significa el tipo elegido, dicho debajo del selector: "frecuencia"
  // no dice por sí solo que su escala sea fija y cuál es.
  hintFor(question) {
    return this.questionTypes.find(t => t.key === question.type)?.hint || '';
  }
  // Por qué no se puede guardar, dicho siempre en vez de dejar el botón
  // desactivado sin explicación.
  get customQuestionsError() {
    for (const question of this.formCustomQuestions) {
      if (!question.label.trim()) return 'Todas las preguntas necesitan un enunciado.';
      if (question.type === 'select') {
        const options = (question.options || []).filter(o => o.trim());
        if (options.length < 2) {
          return `"${question.label || 'Sin título'}" necesita al menos 2 opciones.`;
        }
      }
    }
    return null;
  }
  closeEditPanel() {
    this.showEditPanel = false;
  }
  toggleField(key) {
    if (this.formFields.has(key)) this.formFields.delete(key);else this.formFields.add(key);
  }
  isFieldEnabled(key) {
    return this.formFields.has(key);
  }
  saveTemplate() {
    const name = this.formName.trim();
    if (!name || this.isSaving) return;
    const questionsError = this.customQuestionsError;
    if (questionsError) {
      this.ionicUtilService.showErrorToast(questionsError, 'Revisa las preguntas', 3000);
      return;
    }
    const enabledFields = [...this.formFields];
    // Se limpian antes de enviar: las opciones en blanco de un selector a
    // medio escribir no deben llegar a la plantilla que verá el cliente.
    const customQuestions = this.formCustomQuestions.map(q => ({
      ...q,
      label: q.label.trim(),
      options: (q.options || []).map(o => o.trim()).filter(Boolean)
    }));
    this.isSaving = true;
    const request$ = this.editingId ? this.checkinTemplatesApi.update(this.editingId, {
      name,
      enabledFields,
      cadence: this.formCadence,
      customQuestions
    }) : this.checkinTemplatesApi.create(name, enabledFields, this.formCadence, customQuestions);
    request$.subscribe({
      next: () => {
        this.isSaving = false;
        this.showEditPanel = false;
        this.ionicUtilService.showToast({
          message: this.editingId ? 'Plantilla actualizada' : 'Plantilla creada',
          duration: 2500
        });
        this.load();
      },
      error: err => {
        this.isSaving = false;
        this.ionicUtilService.showErrorToast(err?.error?.message || 'No se pudo guardar la plantilla', 'Error', 3000);
      }
    });
  }
  confirmDelete(template) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.ionicUtilService.showAlert({
        header: 'Borrar plantilla',
        message: `¿Seguro que quieres borrar "${template.name}"? Los clientes que ya la tengan aplicada conservan su configuración actual.`,
        buttons: [{
          text: 'Volver',
          role: 'cancel'
        }, {
          text: 'Borrar',
          cssClass: 'alert-button-danger',
          handler: () => _this.deleteTemplate(template)
        }]
      });
    })();
  }
  deleteTemplate(template) {
    this.checkinTemplatesApi.delete(template._id).subscribe({
      next: () => {
        this.ionicUtilService.showToast({
          message: 'Plantilla borrada',
          duration: 2000
        });
        this.load();
      },
      error: () => {
        this.ionicUtilService.showErrorToast('No se pudo borrar la plantilla', 'Error', 2500);
      }
    });
  }
  // --- Aplicar a clientes ---
  // Modal real (ver comentario en ApplyCheckinTemplateModalComponent) en vez
  // del <div position:fixed> hecho a mano de antes: ese quedaba tapado por
  // el <ion-header> de esta página en escritorio (contain: layout de Ionic
  // en .ion-page). cssClass: 'tf-panel-modal' le da el mismo aspecto de
  // panel anclado a la derecha.
  openApplyPanel(template) {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this2.ionicUtilService.showModal({
        component: _components_apply_checkin_template_modal_apply_checkin_template_modal_component__WEBPACK_IMPORTED_MODULE_3__.ApplyCheckinTemplateModalComponent,
        componentProps: {
          template
        },
        cssClass: 'tf-panel-modal'
      });
    })();
  }
  trackByTemplateId(_index, template) {
    return template._id;
  }
  trackByFieldKey(_index, field) {
    return field.key;
  }
  /**
   * Movimiento 2 Coach Pro — qué va a leer el cliente si activo este campo.
   *
   * En una escala, los extremos: son los que fijan la dirección ("5 = mucho
   * estrés" frente a "5 = duermo bien"), que es justo lo que un entrenador
   * necesita saber antes de activarla y lo que no puede deducir del nombre.
   * En una medida, la instrucción de cómo tomarla.
   *
   * No se pintan las cinco frases enteras: la lista de campos tiene 35
   * filas, y cinco líneas en cada una la volvería ilegible. Las completas
   * las ve el cliente en su formulario, que es quien las tiene que leer.
   */
  fieldDetail(field) {
    if (field.anchors?.length) {
      const first = field.anchors[0];
      const last = field.anchors[field.anchors.length - 1];
      return `1 = ${first} · ${field.anchors.length} = ${last}`;
    }
    return field.hint || '';
  }
}
_CheckinTemplatesPage = CheckinTemplatesPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(CheckinTemplatesPage, "\u0275fac", function CheckinTemplatesPage_Factory(t) {
  return new (t || _CheckinTemplatesPage)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_checkin_templates_api_service__WEBPACK_IMPORTED_MODULE_5__.CheckinTemplatesApiService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_6__.IonicUtilService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(CheckinTemplatesPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: _CheckinTemplatesPage,
  selectors: [["app-checkin-templates"]],
  decls: 17,
  vars: 5,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["aria-label", "Abrir men\u00FA de navegaci\u00F3n", 1, "tf-page-header__back-button"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], ["type", "button", "aria-label", "Nueva plantilla de check-in", 1, "tf-page-header__back-button", 3, "click"], ["name", "add-outline"], [1, "checkin-content"], ["class", "templates-grid templates-skeleton", 4, "ngIf"], ["class", "state-message", 4, "ngIf"], [4, "ngIf"], ["class", "panel-backdrop", 3, "click", 4, "ngIf"], ["class", "panel-sheet panel-sheet--tall", 4, "ngIf"], [1, "templates-grid", "templates-skeleton"], ["class", "template-card template-card--skeleton", 4, "ngFor", "ngForOf"], [1, "template-card", "template-card--skeleton"], [1, "template-card-main"], [1, "skeleton-line", "skeleton-line--title"], [1, "skeleton-line", "skeleton-line--badge"], [1, "skeleton-line", "skeleton-line--meta"], [1, "skeleton-line", "skeleton-line--meta", 2, "width", "40%"], [1, "template-actions"], [1, "skeleton-block", "skeleton-action"], [1, "skeleton-block", "skeleton-action", "skeleton-action--icon"], [1, "state-message"], ["name", "cloud-offline-outline"], [1, "retry-button", 3, "click"], ["class", "templates-grid", 4, "ngIf"], ["name", "clipboard-outline"], [1, "create-cta", 3, "click"], [1, "templates-grid"], ["class", "template-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "template-card"], [1, "template-card-main", 3, "click"], [1, "template-card-top"], [1, "list-card-title"], [1, "cadence-badge"], ["class", "field-summary", 4, "ngIf", "ngIfElse"], ["noFields", ""], [1, "template-total-count"], [1, "template-action-btn", 3, "click"], [1, "template-action-btn", "template-action-btn--danger", 3, "click"], ["name", "trash-outline"], [1, "field-summary"], ["class", "field-summary-item", 4, "ngFor", "ngForOf"], [1, "field-summary-item"], [3, "name"], [1, "field-summary-empty"], [1, "panel-backdrop", 3, "click"], [1, "panel-sheet", "panel-sheet--tall"], [1, "panel-handle"], [1, "panel-title"], [1, "input-wrapper"], ["name", "pricetag-outline", 1, "input-icon"], ["type", "text", "placeholder", "Nombre (ej. B\u00E1sico, Pro)", 1, "input-field", 3, "ngModel", "ngModelChange"], [1, "field-group-heading"], [1, "cadence-options"], ["class", "cadence-option", 3, "cadence-option--active", "click", 4, "ngFor", "ngForOf"], ["class", "field-group", 4, "ngFor", "ngForOf"], [1, "field-group"], [1, "field-group-hint"], ["class", "custom-question", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", "class", "add-question-button", 3, "click", 4, "ngIf"], ["class", "save-error", 4, "ngIf"], [1, "submit-button", 3, "disabled", "click"], ["name", "dots", 4, "ngIf"], [1, "cadence-option", 3, "click"], [1, "field-toggle-grid"], ["class", "field-toggle-row", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "field-toggle-row", 3, "click"], [1, "field-toggle-text"], ["class", "field-unit", 4, "ngIf"], ["class", "field-toggle-detail", 4, "ngIf"], [1, "field-unit"], [1, "field-toggle-detail"], [1, "custom-question"], [1, "custom-question-head"], ["type", "text", "maxlength", "200", "placeholder", "\u00BFC\u00F3mo has dormido esta semana?", 1, "custom-question-input", 3, "ngModel", "ngModelChange"], ["type", "button", 1, "custom-question-remove", 3, "click"], ["name", "close-outline", "aria-hidden", "true"], [1, "custom-question-row"], [1, "custom-question-select", 3, "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "custom-question-input custom-question-input--narrow", "type", "text", "maxlength", "20", "placeholder", "unidad", 3, "ngModel", "ngModelChange", 4, "ngIf"], ["type", "button", "role", "switch", 1, "required-toggle", 3, "click"], [1, "custom-question-hint"], ["class", "option-editor", 4, "ngIf"], [3, "value"], ["type", "text", "maxlength", "20", "placeholder", "unidad", 1, "custom-question-input", "custom-question-input--narrow", 3, "ngModel", "ngModelChange"], [1, "option-editor"], ["class", "option-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", "class", "add-option-button", 3, "click", 4, "ngIf"], [1, "option-row"], ["type", "text", "maxlength", "60", "placeholder", "Opci\u00F3n", 1, "custom-question-input", 3, "ngModel", "ngModelChange"], ["type", "button", 1, "add-option-button", 3, "click"], ["name", "add-outline", "aria-hidden", "true"], ["type", "button", 1, "add-question-button", 3, "click"], [1, "save-error"], ["name", "dots"]],
  template: function CheckinTemplatesPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](4, "ion-menu-button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "div", 5)(6, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7, "Plantillas de check-in");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](8, "div", 7)(9, "button", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function CheckinTemplatesPage_Template_button_click_9_listener() {
        return ctx.openCreatePanel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](10, "ion-icon", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "ion-content", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](12, CheckinTemplatesPage_div_12_Template, 2, 2, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](13, CheckinTemplatesPage_div_13_Template, 8, 0, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](14, CheckinTemplatesPage_ng_container_14_Template, 3, 2, "ng-container", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](15, CheckinTemplatesPage_div_15_Template, 1, 0, "div", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](16, CheckinTemplatesPage_div_16_Template, 23, 11, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.state === "loading");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.state === "error");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.state === "loaded");
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.showEditPanel);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.showEditPanel);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgSelectOption, _angular_forms__WEBPACK_IMPORTED_MODULE_9__["ɵNgSelectMultipleOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.SelectControlValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonMenuButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonSpinner, _angular_common__WEBPACK_IMPORTED_MODULE_8__.LowerCasePipe],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-backdrop-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-sheet-in {\n  from {\n    transform: translateY(16px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-side-panel-in {\n  from {\n    transform: translateX(24px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-card-in {\n  from {\n    opacity: 0;\n    transform: translateY(6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.checkin-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 12px;\n}\n\n.detail-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.templates-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 12px;\n}\n\n.skeleton-block[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n  border-radius: 12px;\n}\n.skeleton-block[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n\n.skeleton-line[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n  border-radius: 4px;\n  height: 12px;\n}\n.skeleton-line[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-line[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n.skeleton-line--title[_ngcontent-%COMP%] {\n  width: 55%;\n  height: 14px;\n}\n.skeleton-line--badge[_ngcontent-%COMP%] {\n  width: 30%;\n  height: 10px;\n  border-radius: 999px;\n  margin-top: 4px;\n}\n.skeleton-line--meta[_ngcontent-%COMP%] {\n  width: 65%;\n  margin-top: 4px;\n}\n\n.skeleton-action[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 34px;\n  border-radius: 8px;\n}\n.skeleton-action--icon[_ngcontent-%COMP%] {\n  width: 34px;\n}\n\n.state-message[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 10px;\n  padding: 64px 32px 0;\n  color: var(--tf-text-muted);\n}\n.state-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  color: var(--tf-text-faint);\n  margin-bottom: 6px;\n}\n.state-message[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: var(--tf-text);\n  margin: 0;\n}\n.state-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  line-height: 1.5;\n  max-width: 34ch;\n  margin: 0 0 4px;\n}\n\n.retry-button[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  height: var(--tf-touch-min);\n  padding: 0 20px;\n  background: var(--tf-surface-5);\n  color: var(--tf-text);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 8px;\n  font-size: 0.9rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out);\n}\n.retry-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.96);\n}\n\n.create-cta[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 10px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  margin-top: 8px;\n  height: var(--tf-touch-min);\n  padding: 0 20px;\n  font-size: 0.9rem;\n}\n.create-cta[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.create-cta[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.create-cta[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n\n.empty-hint[_ngcontent-%COMP%] {\n  font-size: 0.86rem;\n  color: var(--tf-text-muted);\n  margin: 0 0 8px;\n}\n\n.list-card-title[_ngcontent-%COMP%] {\n  font-size: 0.92rem;\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.template-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  padding: 16px;\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: 14px;\n  animation: _ngcontent-%COMP%_tf-card-in 320ms var(--tf-ease-out) backwards;\n}\n@media (prefers-reduced-motion: reduce) {\n  .template-card[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n.template-card[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 0ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 35ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 70ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(4) {\n  animation-delay: 105ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(5) {\n  animation-delay: 140ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(6) {\n  animation-delay: 175ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(7) {\n  animation-delay: 210ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(8) {\n  animation-delay: 245ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(9) {\n  animation-delay: 280ms;\n}\n@media (hover: hover) {\n  .template-card[_ngcontent-%COMP%]:hover {\n    border-color: var(--tf-border-strongest);\n  }\n}\n\n.template-card-main[_ngcontent-%COMP%] {\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 4px 6px;\n  margin: -4px -6px;\n  border-radius: 10px;\n  cursor: pointer;\n  transition: background 160ms var(--tf-ease-out);\n}\n.template-card-main[_ngcontent-%COMP%]:hover, .template-card-main[_ngcontent-%COMP%]:active {\n  background: var(--tf-surface-2);\n}\n\n.template-card-top[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 8px;\n}\n\n.cadence-badge[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 3px 8px;\n  border-radius: 999px;\n  color: var(--tf-accent-text);\n  background: var(--tf-accent-soft);\n  border: 1px solid var(--tf-accent-soft-border);\n  font-size: 0.68rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  white-space: nowrap;\n}\n.cadence-badge--once[_ngcontent-%COMP%] {\n  color: var(--tf-text-secondary);\n  background: var(--tf-surface-3);\n  border-color: var(--tf-border-strong);\n}\n\n.field-summary[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n\n.field-summary-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 0.82rem;\n  color: var(--tf-text-secondary);\n}\n.field-summary-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 15px;\n  color: var(--tf-text-faint);\n}\n\n.field-summary-empty[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.82rem;\n  color: var(--tf-text-faint);\n  font-style: italic;\n}\n\n.template-total-count[_ngcontent-%COMP%] {\n  padding-top: 8px;\n  border-top: 1px solid var(--tf-border-subtle);\n  font-size: 0.72rem;\n  color: var(--tf-text-faint);\n}\n\n.template-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.template-action-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  height: var(--tf-touch-min, 44px);\n  padding: 0 14px;\n  background: var(--tf-surface-5);\n  color: var(--tf-text);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 8px;\n  font-size: 0.8rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out);\n}\n.template-action-btn[_ngcontent-%COMP%]:active {\n  transform: scale(0.95);\n}\n.template-action-btn--danger[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  width: var(--tf-touch-min, 44px);\n  padding: 0;\n  color: var(--tf-danger);\n  border-color: rgba(235, 68, 90, 0.3);\n}\n.template-action-btn--danger[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n\n.panel-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: var(--tf-overlay);\n  z-index: var(--tf-z-modal-backdrop, 400);\n  animation: _ngcontent-%COMP%_tf-backdrop-in 200ms var(--tf-ease-out) both;\n}\n@media (prefers-reduced-motion: reduce) {\n  .panel-backdrop[_ngcontent-%COMP%] {\n    animation: none;\n    opacity: 1;\n  }\n}\n\n.panel-sheet[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: var(--tf-z-modal, 500);\n  background: var(--tf-surface-1);\n  border-top: 1px solid var(--tf-border-strong);\n  border-radius: 20px 20px 0 0;\n  padding: 10px 16px 24px;\n  max-height: 80vh;\n  overflow-y: auto;\n  animation: _ngcontent-%COMP%_tf-sheet-in 260ms var(--tf-ease-out) both;\n}\n@media (prefers-reduced-motion: reduce) {\n  .panel-sheet[_ngcontent-%COMP%] {\n    animation: none;\n    opacity: 1;\n    transform: none;\n  }\n}\n.panel-sheet--tall[_ngcontent-%COMP%] {\n  max-height: 88vh;\n}\n\n.panel-handle[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 4px;\n  border-radius: 2px;\n  background: var(--tf-border-strongest);\n  margin: 0 auto 14px;\n}\n\n.panel-title[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: var(--tf-text);\n  margin: 0 0 4px;\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n  height: 50px;\n  margin-bottom: 16px;\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  flex-shrink: 0;\n  font-size: 18px;\n}\n\n.input-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n  font-size: 0.95rem;\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.field-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n.field-group[_ngcontent-%COMP%]:last-of-type {\n  margin-bottom: 20px;\n}\n\n.field-group-heading[_ngcontent-%COMP%] {\n  font-size: 0.74rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--tf-text-muted);\n  margin: 0 0 8px;\n}\n\n.field-toggle-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));\n  gap: 6px 8px;\n}\n\n.field-toggle-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: var(--tf-space-3);\n  justify-content: space-between;\n  width: 100%;\n  min-height: 44px;\n  padding: 10px 12px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-subtle);\n  border-radius: 10px;\n  color: var(--tf-text-secondary);\n  font-size: 0.86rem;\n  font-family: inherit;\n  text-align: left;\n  cursor: pointer;\n  transition: border-color 160ms var(--tf-ease-out);\n}\n.field-toggle-row[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n.field-toggle-row[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--tf-text-faint);\n  flex-shrink: 0;\n}\n\n.field-unit[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  font-size: 0.78rem;\n}\n\n.field-toggle-text[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n\n.field-toggle-detail[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  font-size: 0.74rem;\n  line-height: 1.35;\n}\n\n.cadence-options[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 20px;\n}\n\n.cadence-option[_ngcontent-%COMP%] {\n  flex: 1;\n  padding: 10px 8px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-subtle);\n  border-radius: 10px;\n  color: var(--tf-text-secondary);\n  font-size: 0.82rem;\n  font-weight: 600;\n  font-family: inherit;\n  text-align: center;\n  cursor: pointer;\n  transition: border-color 160ms var(--tf-ease-out), color 160ms var(--tf-ease-out);\n}\n.cadence-option--active[_ngcontent-%COMP%] {\n  border-color: var(--tf-accent);\n  color: var(--tf-accent);\n}\n\n.field-toggle-icon--active[_ngcontent-%COMP%] {\n  color: var(--tf-accent) !important;\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  width: 100%;\n  height: 50px;\n  margin-top: 4px;\n  font-size: 0.95rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.submit-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n\n.field-group-hint[_ngcontent-%COMP%] {\n  margin: 0 0 var(--tf-space-3);\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-text-muted);\n  line-height: var(--tf-line-height-base);\n  max-width: 62ch;\n}\n\n.custom-question[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-2);\n  margin-bottom: var(--tf-space-3);\n  padding: var(--tf-space-3);\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-md);\n}\n\n.custom-question-head[_ngcontent-%COMP%], .option-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n}\n\n.custom-question-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n  flex-wrap: wrap;\n}\n\n.custom-question-input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-3);\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-sm);\n  color: var(--tf-text);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n}\n.custom-question-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n.custom-question-input[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.custom-question-input--narrow[_ngcontent-%COMP%] {\n  flex: 0 0 110px;\n}\n\n.custom-question-select[_ngcontent-%COMP%] {\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-8) 0 var(--tf-space-3);\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-sm);\n  color: var(--tf-text);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  cursor: pointer;\n  -webkit-appearance: none;\n          appearance: none;\n  background-image: linear-gradient(45deg, transparent 50%, var(--tf-text-muted) 50%), linear-gradient(135deg, var(--tf-text-muted) 50%, transparent 50%);\n  background-position: calc(100% - 18px) calc(50% + 2px), calc(100% - 13px) calc(50% + 2px);\n  background-size: 5px 5px, 5px 5px;\n  background-repeat: no-repeat;\n}\n.custom-question-select[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.custom-question-select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  background: var(--tf-surface-1);\n  color: var(--tf-text);\n}\n\n.custom-question-remove[_ngcontent-%COMP%] {\n  --background: var(--tf-surface-3);\n  --background-activated: var(--tf-surface-4);\n  --background-hover: var(--tf-surface-4);\n  --background-focused: var(--tf-surface-4);\n  --color: var(--tf-text-secondary);\n  --border-radius: var(--tf-radius-sm);\n  --padding-start: 0;\n  --padding-end: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  background: var(--tf-surface-3);\n  color: var(--tf-text-secondary);\n  border: none;\n  border-radius: var(--tf-radius-sm);\n  width: var(--tf-touch-min);\n  height: var(--tf-touch-min);\n  min-width: var(--tf-touch-min);\n  min-height: var(--tf-touch-min);\n  margin: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: background var(--tf-duration-fast) var(--tf-ease-out), color var(--tf-duration-fast) var(--tf-ease-out);\n  flex-shrink: 0;\n}\n.custom-question-remove[_ngcontent-%COMP%]:active {\n  background: var(--tf-surface-4);\n}\n.custom-question-remove[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.custom-question-remove[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n.custom-question-remove[_ngcontent-%COMP%]:hover {\n  background: var(--tf-danger-soft);\n  color: var(--tf-danger-text);\n}\n\n.required-toggle[_ngcontent-%COMP%] {\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-4);\n  background: transparent;\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-pill);\n  color: var(--tf-text-muted);\n  font-family: inherit;\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n  cursor: pointer;\n  transition: background var(--tf-duration-fast) var(--tf-ease-out), border-color var(--tf-duration-fast) var(--tf-ease-out), color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.required-toggle--on[_ngcontent-%COMP%] {\n  background: var(--tf-accent-soft);\n  border-color: var(--tf-accent-soft-border);\n  color: var(--tf-accent-text);\n}\n.required-toggle[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.custom-question-hint[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-text-muted);\n}\n\n.option-editor[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-2);\n  padding-top: var(--tf-space-2);\n  border-top: 1px solid var(--tf-border-subtle);\n}\n\n.add-option-button[_ngcontent-%COMP%], .add-question-button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: var(--tf-space-2);\n  align-self: flex-start;\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-4);\n  background: transparent;\n  border: 1px dashed var(--tf-border-strong);\n  border-radius: var(--tf-radius-md);\n  color: var(--tf-text-secondary);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  cursor: pointer;\n}\n.add-option-button[_ngcontent-%COMP%]:hover, .add-question-button[_ngcontent-%COMP%]:hover {\n  border-color: var(--tf-accent-soft-border);\n  color: var(--tf-text);\n}\n.add-option-button[_ngcontent-%COMP%]:focus-visible, .add-question-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.add-option-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%], .add-question-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n\n.save-error[_ngcontent-%COMP%] {\n  margin: 0 0 var(--tf-space-3);\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-danger-text);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvY2hlY2tpbi10ZW1wbGF0ZXMvY2hlY2tpbi10ZW1wbGF0ZXMucGFnZS5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19wYW5lbC1zaGVldC5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19hbmltYXRpb25zLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX2J1dHRvbnMuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9faW5wdXRzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJBO0VBQ0U7SUFDRSwyQkFBQTtFQ3hCRjtBQUNGO0FDb0RBO0VBQ0U7SUFDRSxVQUFBO0VEbERGO0VDb0RBO0lBQ0UsVUFBQTtFRGxERjtBQUNGO0FDcURBO0VBQ0U7SUFDRSwyQkFBQTtJQUNBLFVBQUE7RURuREY7RUNxREE7SUFDRSx3QkFBQTtJQUNBLFVBQUE7RURuREY7QUFDRjtBQ3FIQTtFQUNFO0lBQ0UsMkJBQUE7SUFDQSxVQUFBO0VEbkhGO0VDcUhBO0lBQ0Usd0JBQUE7SUFDQSxVQUFBO0VEbkhGO0FBQ0Y7QUVMQTtFQUNFO0lBQ0UsVUFBQTtJQUNBLDBCQUFBO0VGT0Y7RUVMQTtJQUNFLFVBQUE7SUFDQSx3QkFBQTtFRk9GO0FBQ0Y7QUFwQ0E7RUFDRSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQXNDRjs7QUFuQ0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0FBc0NGOztBQW5DQTtFQUNFLGFBQUE7RUFDQSw0REFBQTtFQUNBLFNBQUE7QUFzQ0Y7O0FBbkNBO0VEcEJFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSwrQkFBQTtFQ29CQSxtQkFBQTtBQXdDRjtBRDFERTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSw0QkFBQTtFQUNBLCtFQUFBO0VBQ0EsbUNBQUE7QUM0REo7QUR6REU7RUFDRTtJQUNFLGVBQUE7RUMyREo7QUFDRjs7QUFsREE7RUR6QkUsa0JBQUE7RUFDQSxnQkFBQTtFQUNBLCtCQUFBO0VDeUJBLGtCQUFBO0VBQ0EsWUFBQTtBQXVERjtBRC9FRTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSw0QkFBQTtFQUNBLCtFQUFBO0VBQ0EsbUNBQUE7QUNpRko7QUQ5RUU7RUFDRTtJQUNFLGVBQUE7RUNnRko7QUFDRjtBQWxFRTtFQUNFLFVBQUE7RUFDQSxZQUFBO0FBb0VKO0FBakVFO0VBQ0UsVUFBQTtFQUNBLFlBQUE7RUFDQSxvQkFBQTtFQUNBLGVBQUE7QUFtRUo7QUFoRUU7RUFDRSxVQUFBO0VBQ0EsZUFBQTtBQWtFSjs7QUE5REE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBaUVGO0FBL0RFO0VBQ0UsV0FBQTtBQWlFSjs7QUEzREE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLG9CQUFBO0VBQ0EsMkJBQUE7QUE4REY7QUE1REU7RUFDRSxlQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQkFBQTtBQThESjtBQTNERTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLFNBQUE7QUE2REo7QUExREU7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGVBQUE7QUE0REo7O0FBeERBO0VBQ0UsZUFBQTtFQUNBLDJCQUFBO0VBQ0EsZUFBQTtFQUNBLCtCQUFBO0VBQ0EscUJBQUE7RUFDQSx5Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSw4Q0FBQTtBQTJERjtBQXpERTtFQUNFLHNCQUFBO0FBMkRKOztBQXZEQTtFR3ZHRSxZQUFBO0VBQ0EsbUJIdUc0QjtFR3RHNUIscUNBQUE7RUFDQSxnQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGdGQUFBO0VIbUdBLGVBQUE7RUFDQSwyQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtBQWdFRjtBR3BLRTtFQUNFLHNCQUFBO0FIc0tKO0FHbktFO0VBQ0UsYUFBQTtFQUNBLGVBQUE7QUhxS0o7QUdsS0U7RUFDRSxpQ0FBQTtFQUNBLG1CQUFBO0FIb0tKOztBQXhFQTtFQUNFLGtCQUFBO0VBQ0EsMkJBQUE7RUFDQSxlQUFBO0FBMkVGOztBQXhFQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtBQTJFRjs7QUF4RUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0VBQ0EsYUFBQTtFQUNBLCtCQUFBO0VBQ0Esa0NBQUE7RUFDQSxtQkFBQTtFRXRJQSx3REFBQTtBRmtORjtBRWhORTtFRjZIRjtJRTVISSxlQUFBO0VGbU5GO0FBQ0Y7QUV4TUk7RUFDRSxvQkFBQTtBRjBNTjtBRTNNSTtFQUNFLHFCQUFBO0FGNk1OO0FFOU1JO0VBQ0UscUJBQUE7QUZnTk47QUVqTkk7RUFDRSxzQkFBQTtBRm1OTjtBRXBOSTtFQUNFLHNCQUFBO0FGc05OO0FFdk5JO0VBQ0Usc0JBQUE7QUZ5Tk47QUUxTkk7RUFDRSxzQkFBQTtBRjROTjtBRTdOSTtFQUNFLHNCQUFBO0FGK05OO0FFaE9JO0VBQ0Usc0JBQUE7QUZrT047QUF4R0U7RUFDRTtJQUNFLHdDQUFBO0VBMEdKO0FBQ0Y7O0FBdEdBO0VBQ0UsWUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsK0NBQUE7QUF5R0Y7QUF2R0U7RUFFRSwrQkFBQTtBQXdHSjs7QUFwR0E7RUFDRSxhQUFBO0VBQ0EsdUJBQUE7RUFDQSw4QkFBQTtFQUNBLFFBQUE7QUF1R0Y7O0FBakdBO0VBQ0UsY0FBQTtFQUNBLGdCQUFBO0VBQ0Esb0JBQUE7RUFDQSw0QkFBQTtFQUNBLGlDQUFBO0VBQ0EsOENBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0FBb0dGO0FBaEdFO0VBQ0UsK0JBQUE7RUFDQSwrQkFBQTtFQUNBLHFDQUFBO0FBa0dKOztBQTVGQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFFBQUE7QUErRkY7O0FBNUZBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGtCQUFBO0VBQ0EsK0JBQUE7QUErRkY7QUE3RkU7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLDJCQUFBO0FBK0ZKOztBQTNGQTtFQUNFLFNBQUE7RUFDQSxrQkFBQTtFQUNBLDJCQUFBO0VBQ0Esa0JBQUE7QUE4RkY7O0FBM0ZBO0VBQ0UsZ0JBQUE7RUFDQSw2Q0FBQTtFQUNBLGtCQUFBO0VBQ0EsMkJBQUE7QUE4RkY7O0FBM0ZBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtBQThGRjs7QUEzRkE7RUFDRSxPQUFBO0VBQ0EsaUNBQUE7RUFDQSxlQUFBO0VBQ0EsK0JBQUE7RUFDQSxxQkFBQTtFQUNBLHlDQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLDhDQUFBO0FBOEZGO0FBNUZFO0VBQ0Usc0JBQUE7QUE4Rko7QUEzRkU7RUFDRSxjQUFBO0VBQ0EsZ0NBQUE7RUFDQSxVQUFBO0VBQ0EsdUJBQUE7RUFDQSxvQ0FBQTtBQTZGSjtBQTNGSTtFQUNFLGVBQUE7QUE2Rk47O0FBdkZBO0VDMVFFLGVBQUE7RUFDQSxRQUFBO0VBQ0EsNkJBQUE7RUFDQSx3Q0FBQTtFQU9BLHVEQUFBO0FEK1ZGO0FDN1ZFO0VEOFBGO0lDN1BJLGVBQUE7SUFDQSxVQUFBO0VEZ1dGO0FBQ0Y7O0FBakdBO0VDM1BFLGVBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSwrQkFBQTtFQUNBLCtCQUFBO0VBQ0EsNkNBQUE7RUFDQSw0QkFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLG9EQUFBO0FEZ1dGO0FDNVZFO0VENE9GO0lDM09JLGVBQUE7SUFDQSxVQUFBO0lBQ0EsZUFBQTtFRCtWRjtBQUNGO0FBcEhFO0VBQ0UsZ0JBQUE7QUFzSEo7O0FBbEhBO0VDNU9FLFdBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQ0FBQTtFQUNBLG1CQUFBO0FEa1dGOztBQXRIQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLGVBQUE7QUF5SEY7O0FBdEhBO0VJbFNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSwrQkpnUzBCO0VJL1IxQix5Q0FBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGlEQUFBO0VKNlJBLFlBQUE7RUFDQSxtQkFBQTtBQWdJRjtBSTVaRTtFQUNFLDhCQUFBO0FKOFpKOztBQWhJQTtFSXpSRSwyQkFBQTtFQUNBLGNBQUE7RUowUkEsZUFBQTtBQW9JRjs7QUFqSUE7RUl6UkUsT0FBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EscUJBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7RUpvUkEsa0JBQUE7QUEySUY7QUk3WkU7RUFDRSwyQkFBQTtBSitaSjs7QUEzSUE7RUFDRSxtQkFBQTtBQThJRjtBQTVJRTtFQUNFLG1CQUFBO0FBOElKOztBQTFJQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5QkFBQTtFQUNBLHNCQUFBO0VBQ0EsMkJBQUE7RUFDQSxlQUFBO0FBNklGOztBQXRJQTtFQUNFLGFBQUE7RUFDQSw0REFBQTtFQUNBLFlBQUE7QUF5SUY7O0FBdElBO0VBQ0UsYUFBQTtFQUlBLHVCQUFBO0VBQ0Esc0JBQUE7RUFDQSw4QkFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsK0JBQUE7RUFDQSx5Q0FBQTtFQUNBLG1CQUFBO0VBQ0EsK0JBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsaURBQUE7QUFzSUY7QUFwSUU7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQXNJSjtBQW5JRTtFQUNFLGVBQUE7RUFDQSwyQkFBQTtFQUNBLGNBQUE7QUFxSUo7O0FBaklBO0VBQ0UsMkJBQUE7RUFDQSxrQkFBQTtBQW9JRjs7QUFoSUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0VBQ0EsWUFBQTtBQW1JRjs7QUFoSUE7RUFDRSwyQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUFtSUY7O0FBaElBO0VBQ0UsYUFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtBQW1JRjs7QUFoSUE7RUFDRSxPQUFBO0VBQ0EsaUJBQUE7RUFDQSwrQkFBQTtFQUNBLHlDQUFBO0VBQ0EsbUJBQUE7RUFDQSwrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGlGQUFBO0FBbUlGO0FBaklFO0VBQ0UsOEJBQUE7RUFDQSx1QkFBQTtBQW1JSjs7QUEvSEE7RUFDRSxrQ0FBQTtBQWtJRjs7QUEvSEE7RUczWkUsWUFBQTtFQUNBLG1CQUZpQztFQUdqQyxxQ0FBQTtFQUNBLGdDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0ZBQUE7RUh1WkEsV0FBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtBQXdJRjtBR25pQkU7RUFDRSxzQkFBQTtBSHFpQko7QUdsaUJFO0VBQ0UsYUFBQTtFQUNBLGVBQUE7QUhvaUJKO0FHamlCRTtFQUNFLGlDQUFBO0VBQ0EsbUJBQUE7QUhtaUJKOztBQTdJQTtFQUNFLDZCQUFBO0VBQ0EsaUNBQUE7RUFDQSwyQkFBQTtFQUNBLHVDQUFBO0VBQ0EsZUFBQTtBQWdKRjs7QUE3SUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtFQUNBLGdDQUFBO0VBQ0EsMEJBQUE7RUFDQSwrQkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0NBQUE7QUFnSkY7O0FBN0lBOztFQUVFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0FBZ0pGOztBQTdJQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtBQWdKRjs7QUE3SUE7RUFDRSxPQUFBO0VBQ0EsWUFBQTtFQUNBLCtCQUFBO0VBQ0EsNEJBQUE7RUFDQSwrQkFBQTtFQUNBLHlDQUFBO0VBQ0Esa0NBQUE7RUFDQSxxQkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUNBQUE7QUFnSkY7QUE5SUU7RUFDRSwyQkFBQTtBQWdKSjtBQTdJRTtFQUNFLG1DQUFBO0VBQ0EsbUJBQUE7QUErSUo7QUE1SUU7RUFDRSxlQUFBO0FBOElKOztBQTFJQTtFQUNFLCtCQUFBO0VBQ0EsZ0RBQUE7RUFDQSwrQkFBQTtFQUNBLHlDQUFBO0VBQ0Esa0NBQUE7RUFDQSxxQkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUNBQUE7RUFDQSxlQUFBO0VBQ0Esd0JBQUE7VUFBQSxnQkFBQTtFQUNBLHVKQUFBO0VBRUEseUZBQUE7RUFDQSxpQ0FBQTtFQUNBLDRCQUFBO0FBNElGO0FBMUlFO0VBQ0UsbUNBQUE7RUFDQSxtQkFBQTtBQTRJSjtBQXpJRTtFQUNFLCtCQUFBO0VBQ0EscUJBQUE7QUEySUo7O0FBdklBO0VHOWRFLGlDQUFBO0VBQ0EsMkNBQUE7RUFDQSx1Q0FBQTtFQUNBLHlDQUFBO0VBQ0EsaUNBQUE7RUFDQSxvQ0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBRUEsK0JBQUE7RUFDQSwrQkFBQTtFQUNBLFlBQUE7RUFDQSxrQ0hpZDZDO0VHaGQ3QywwQkhnZHdCO0VHL2N4QiwyQkgrY3dCO0VHOWN4Qiw4Qkg4Y3dCO0VHN2N4QiwrQkg2Y3dCO0VHNWN4QixTQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsbUhBQUE7RUh5Y0EsY0FBQTtBQWdLRjtBR3RtQkU7RUFDRSwrQkFBQTtBSHdtQko7QUdybUJFO0VBQ0UsbUNBQUE7RUFDQSxtQkFBQTtBSHVtQko7QUdwbUJFO0VBQ0UsZUgwYmdFO0FBNEtwRTtBQXhLRTtFQUNFLGlDQUFBO0VBQ0EsNEJBQUE7QUEwS0o7O0FBcEtBO0VBQ0UsK0JBQUE7RUFDQSw0QkFBQTtFQUNBLHVCQUFBO0VBQ0EseUNBQUE7RUFDQSxvQ0FBQTtFQUNBLDJCQUFBO0VBQ0Esb0JBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLDRLQUFBO0FBdUtGO0FBbktFO0VBQ0UsaUNBQUE7RUFDQSwwQ0FBQTtFQUNBLDRCQUFBO0FBcUtKO0FBbEtFO0VBQ0UsbUNBQUE7RUFDQSxtQkFBQTtBQW9LSjs7QUFoS0E7RUFDRSxTQUFBO0VBQ0EsaUNBQUE7RUFDQSwyQkFBQTtBQW1LRjs7QUFoS0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtFQUNBLDhCQUFBO0VBQ0EsNkNBQUE7QUFtS0Y7O0FBaEtBOztFQUVFLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLHNCQUFBO0VBQ0EsK0JBQUE7RUFDQSw0QkFBQTtFQUNBLHVCQUFBO0VBQ0EsMENBQUE7RUFDQSxrQ0FBQTtFQUNBLCtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQW1LRjtBQWpLRTs7RUFDRSwwQ0FBQTtFQUNBLHFCQUFBO0FBb0tKO0FBaktFOztFQUNFLG1DQUFBO0VBQ0EsbUJBQUE7QUFvS0o7QUFqS0U7O0VBQ0UsZUFBQTtBQW9LSjs7QUEvSkE7RUFDRSw2QkFBQTtFQUNBLGlDQUFBO0VBQ0EsNEJBQUE7QUFrS0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTa2VsZXRvbiBkZSBjYXJnYSBjb24gYmFycmlkbyBkZSBzaGltbWVyIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gbGl0ZXJhbG1lbnRlXG4vLyBlbiB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgKGJvcmRlci1yYWRpdXMsIGhlaWdodCwgd2lkdGgsIHZhcmlhbnRlcyBjb24gbm9tYnJlKS5cbkBtaXhpbiB0Zi1za2VsZXRvbi1zaGltbWVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuXG4gICY6OmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHRyYW5zcGFyZW50LCB2YXIoLS10Zi1zaGltbWVyKSwgdHJhbnNwYXJlbnQpO1xuICAgIGFuaW1hdGlvbjogdGYtc2hpbW1lciAxLjRzIGluZmluaXRlO1xuICB9XG5cbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICAmOjphZnRlciB7XG4gICAgICBhbmltYXRpb246IG5vbmU7XG4gICAgfVxuICB9XG59XG5cbkBrZXlmcmFtZXMgdGYtc2hpbW1lciB7XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgfVxufVxuIiwiQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvc2tlbGV0b24nO1xuQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvYnV0dG9ucyc7XG5AaW1wb3J0ICcuLi8uLi8uLi90aGVtZS9wYW5lbC1zaGVldCc7XG5AaW1wb3J0ICcuLi8uLi8uLi90aGVtZS9pbnB1dHMnO1xuQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvYW5pbWF0aW9ucyc7XG5cbi5jaGVja2luLWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLXRmLWJnKTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxNnB4O1xuICAtLXBhZGRpbmctZW5kOiAxNnB4O1xuICAtLXBhZGRpbmctdG9wOiAxMnB4O1xufVxuXG4uZGV0YWlsLXNrZWxldG9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA4cHg7XG59XG5cbi50ZW1wbGF0ZXMtZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZmlsbCwgbWlubWF4KDI4MHB4LCAxZnIpKTtcbiAgZ2FwOiAxMnB4O1xufVxuXG4uc2tlbGV0b24tYmxvY2sge1xuICBAaW5jbHVkZSB0Zi1za2VsZXRvbi1zaGltbWVyO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xufVxuXG4uc2tlbGV0b24tbGluZSB7XG4gIEBpbmNsdWRlIHRmLXNrZWxldG9uLXNoaW1tZXI7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgaGVpZ2h0OiAxMnB4O1xuXG4gICYtLXRpdGxlIHtcbiAgICB3aWR0aDogNTUlO1xuICAgIGhlaWdodDogMTRweDtcbiAgfVxuXG4gICYtLWJhZGdlIHtcbiAgICB3aWR0aDogMzAlO1xuICAgIGhlaWdodDogMTBweDtcbiAgICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgICBtYXJnaW4tdG9wOiA0cHg7XG4gIH1cblxuICAmLS1tZXRhIHtcbiAgICB3aWR0aDogNjUlO1xuICAgIG1hcmdpbi10b3A6IDRweDtcbiAgfVxufVxuXG4uc2tlbGV0b24tYWN0aW9uIHtcbiAgd2lkdGg6IDY0cHg7XG4gIGhlaWdodDogMzRweDtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuXG4gICYtLWljb24ge1xuICAgIHdpZHRoOiAzNHB4O1xuICB9XG59XG5cbi8vIC0tLSBFc3RhZG9zIGRlIHDDg8KhZ2luYSBjb21wbGV0YSAoZXJyb3IgLyB2YWPDg8Ktbykgw6LCgMKUIG1pc21vIHBhdHLDg8KzbiBxdWVcbi8vIGNsaWVudHMucGFnZS9kYXNoYm9hcmQucGFnZSAoaWNvbm8gKyB0w4PCrXR1bG8gKyB0ZXh0byArIENUQSksIG5vIHVuIHDDg8KhcnJhZm8gc3VlbHRvIC0tLVxuLnN0YXRlLW1lc3NhZ2Uge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgcGFkZGluZzogNjRweCAzMnB4IDA7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiA0MHB4O1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LWZhaW50KTtcbiAgICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gIH1cblxuICBoMiB7XG4gICAgZm9udC1zaXplOiAxLjA1cmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICAgIG1hcmdpbjogMDtcbiAgfVxuXG4gIHAge1xuICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgbWF4LXdpZHRoOiAzNGNoO1xuICAgIG1hcmdpbjogMCAwIDRweDtcbiAgfVxufVxuXG4ucmV0cnktYnV0dG9uIHtcbiAgbWFyZ2luLXRvcDogOHB4O1xuICBoZWlnaHQ6IHZhcigtLXRmLXRvdWNoLW1pbik7XG4gIHBhZGRpbmc6IDAgMjBweDtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS01KTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBmb250LXNpemU6IDAuOXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpO1xuICB9XG59XG5cbi5jcmVhdGUtY3RhIHtcbiAgQGluY2x1ZGUgdGYtZ3JhZGllbnQtYnV0dG9uKDEwcHgpO1xuICBtYXJnaW4tdG9wOiA4cHg7XG4gIGhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgcGFkZGluZzogMCAyMHB4O1xuICBmb250LXNpemU6IDAuOXJlbTtcbn1cblxuLmVtcHR5LWhpbnQge1xuICBmb250LXNpemU6IDAuODZyZW07XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgbWFyZ2luOiAwIDAgOHB4O1xufVxuXG4ubGlzdC1jYXJkLXRpdGxlIHtcbiAgZm9udC1zaXplOiAwLjkycmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG59XG5cbi50ZW1wbGF0ZS1jYXJkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxMnB4O1xuICBwYWRkaW5nOiAxNnB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTEpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiAxNHB4O1xuICBAaW5jbHVkZSB0Zi1jYXJkLWluLXN0YWdnZXIoJG1heC1pdGVtczogOSk7XG5cbiAgLy8gU29sbyBtb3VzZS90cmFja3BhZCDDosKAwpQgZW4gdG91Y2gsIDpob3ZlciBzZSBxdWVkYXLDg8KtYSBcInBlZ2Fkb1wiIHRyYXMgZWwgdGFwLlxuICBAbWVkaWEgKGhvdmVyOiBob3Zlcikge1xuICAgICY6aG92ZXIge1xuICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1ib3JkZXItc3Ryb25nZXN0KTtcbiAgICB9XG4gIH1cbn1cblxuLnRlbXBsYXRlLWNhcmQtbWFpbiB7XG4gIG1pbi13aWR0aDogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxMHB4O1xuICBwYWRkaW5nOiA0cHggNnB4O1xuICBtYXJnaW46IC00cHggLTZweDtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmhvdmVyLFxuICAmOmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbiAgfVxufVxuXG4udGVtcGxhdGUtY2FyZC10b3Age1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IDhweDtcbn1cblxuLy8gQ2FkZW5jaWEgY29tbyBiYWRnZSB2aXNpYmxlIGRlIHVuIHZpc3Rhem8gKGFudGVzIHNvbG8gdGV4dG8gcGxhbm8gZW5cbi8vIC50ZW1wbGF0ZS1tZXRhKSDDosKAwpQgZXMgbGEgcHJlZ3VudGEgcXVlIG3Dg8KhcyBpbXBvcnRhIGFsIGVsZWdpciBlbnRyZVxuLy8gcGxhbnRpbGxhcyBwYXJlY2lkYXM6IMOCwr9jYWRhIGN1w4PCoW50byBsZSBsbGVnYSBlc3RvIGFsIGNsaWVudGU/XG4uY2FkZW5jZS1iYWRnZSB7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICBwYWRkaW5nOiAzcHggOHB4O1xuICBib3JkZXItcmFkaXVzOiA5OTlweDtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudC10ZXh0KTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LXNvZnQpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQtc29mdC1ib3JkZXIpO1xuICBmb250LXNpemU6IDAuNjhyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cbiAgLy8gXCJVbmEgdmV6XCIgbm8gZXMgdW5hIGNhZGVuY2lhIHJlY3VycmVudGUgw6LCgMKUIGRpc3Rpbmd1aXJsYSBkZWwgYWNlbnRvXG4gIC8vIHJlc2VydmFkbyBwYXJhIHNlbWFuYWwvcXVpbmNlbmFsIGV2aXRhIGxlZXJsYSBjb21vIFwibGEgb3BjacODwrNuIGFjdGl2YVwiLlxuICAmLS1vbmNlIHtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgfVxufVxuXG4vLyBEZXNnbG9zZSBwb3IgZ3J1cG8gw6LCgMKUIGVsIGRldGFsbGUgcmVhbCBxdWUgcGlkacODwrMgcmVlbXBsYXphciBhbCBjb250ZW9cbi8vIHBsYW5vIGRlIFwiOCBjYW1wb3NcIiBxdWUgbm8gZGVjw4PCrWEgbmFkYSBzb2JyZSBRVcODwokgbWlkZSBsYSBwbGFudGlsbGEuXG4uZmllbGQtc3VtbWFyeSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogNXB4O1xufVxuXG4uZmllbGQtc3VtbWFyeS1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG4gIGZvbnQtc2l6ZTogMC44MnJlbTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcblxuICBpb24taWNvbiB7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LWZhaW50KTtcbiAgfVxufVxuXG4uZmllbGQtc3VtbWFyeS1lbXB0eSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiAwLjgycmVtO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1mYWludCk7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbn1cblxuLnRlbXBsYXRlLXRvdGFsLWNvdW50IHtcbiAgcGFkZGluZy10b3A6IDhweDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdWJ0bGUpO1xuICBmb250LXNpemU6IDAuNzJyZW07XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LWZhaW50KTtcbn1cblxuLnRlbXBsYXRlLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbn1cblxuLnRlbXBsYXRlLWFjdGlvbi1idG4ge1xuICBmbGV4OiAxO1xuICBoZWlnaHQ6IHZhcigtLXRmLXRvdWNoLW1pbiwgNDRweCk7XG4gIHBhZGRpbmc6IDAgMTRweDtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS01KTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xuICBmb250LXNpemU6IDAuOHJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTUpO1xuICB9XG5cbiAgJi0tZGFuZ2VyIHtcbiAgICBmbGV4OiAwIDAgYXV0bztcbiAgICB3aWR0aDogdmFyKC0tdGYtdG91Y2gtbWluLCA0NHB4KTtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGNvbG9yOiB2YXIoLS10Zi1kYW5nZXIpO1xuICAgIGJvcmRlci1jb2xvcjogcmdiYSgyMzUsIDY4LCA5MCwgMC4zKTtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICB9XG4gIH1cbn1cblxuLy8gLS0tIFBhbmVsIChib3R0b20gc2hlZXQpIC0tLVxuLnBhbmVsLWJhY2tkcm9wIHtcbiAgQGluY2x1ZGUgdGYtcGFuZWwtYmFja2Ryb3A7XG59XG5cbi5wYW5lbC1zaGVldCB7XG4gIEBpbmNsdWRlIHRmLXBhbmVsLXNoZWV0O1xuXG4gICYtLXRhbGwge1xuICAgIG1heC1oZWlnaHQ6IDg4dmg7XG4gIH1cbn1cblxuLnBhbmVsLWhhbmRsZSB7XG4gIEBpbmNsdWRlIHRmLXBhbmVsLWhhbmRsZTtcbn1cblxuLnBhbmVsLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxLjA1cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIG1hcmdpbjogMCAwIDRweDtcbn1cblxuLmlucHV0LXdyYXBwZXIge1xuICBAaW5jbHVkZSB0Zi1pbnB1dC13cmFwcGVyKHZhcigtLXRmLXN1cmZhY2UtMikpO1xuICBoZWlnaHQ6IDUwcHg7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG59XG5cbi5pbnB1dC1pY29uIHtcbiAgQGluY2x1ZGUgdGYtaW5wdXQtaWNvbjtcbiAgZm9udC1zaXplOiAxOHB4O1xufVxuXG4uaW5wdXQtZmllbGQge1xuICBAaW5jbHVkZSB0Zi1pbnB1dC1maWVsZDtcbiAgZm9udC1zaXplOiAwLjk1cmVtO1xufVxuXG4uZmllbGQtZ3JvdXAge1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuXG4gICY6bGFzdC1vZi10eXBlIHtcbiAgICBtYXJnaW4tYm90dG9tOiAyMHB4O1xuICB9XG59XG5cbi5maWVsZC1ncm91cC1oZWFkaW5nIHtcbiAgZm9udC1zaXplOiAwLjc0cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBsZXR0ZXItc3BhY2luZzogMC4wNGVtO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIG1hcmdpbjogMCAwIDhweDtcbn1cblxuLy8gR3JpZCBlbiB2ZXogZGUgdW5hIGZpbGEgcG9yIGNhbXBvIGEgdG9kbyBlbCBhbmNobyBkZWwgcGFuZWwgKGVsIGJvdHRvbVxuLy8gc2hlZXQgbm8gdGllbmUgbWF4LXdpZHRoLCB2ZXIgdGhlbWUvX3BhbmVsLXNoZWV0LnNjc3MpIMOiwoDClCBjb24gMTkgY2FtcG9zIGVuXG4vLyBcIlBlcsODwq1tZXRyb3NcIiBlc28gZXJhIHVuYSBjb2x1bW5hIGxhcmd1w4PCrXNpbWEgY29uIGxhIGV0aXF1ZXRhIHBlZ2FkYSBhIGxhXG4vLyBpenF1aWVyZGEgeSBlbCBjaGVja2JveCBhIGtpbMODwrNtZXRyb3MgYSBsYSBkZXJlY2hhIGVuIGVzY3JpdG9yaW8uXG4uZmllbGQtdG9nZ2xlLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgyMDBweCwgMWZyKSk7XG4gIGdhcDogNnB4IDhweDtcbn1cblxuLmZpZWxkLXRvZ2dsZS1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICAvLyBmbGV4LXN0YXJ0IHkgbm8gY2VudGVyOiBjb24gbGEgZGVzY3JpcGNpw4PCs24gZGVsIGNhbXBvIGRlYmFqbyBkZWwgbm9tYnJlXG4gIC8vIGxhIGZpbGEgY3JlY2UgYSBkb3MgbMODwq1uZWFzLCB5IGxhIGNhc2lsbGEgZGViZSBxdWVkYXJzZSBhcnJpYmEsIGFsaW5lYWRhXG4gIC8vIGNvbiBlbCBub21icmUsIG5vIGZsb3RhbmRvIGVuIGVsIGNlbnRybyB2ZXJ0aWNhbCBkZWwgYmxvcXVlLlxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0zKTtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogNDRweDtcbiAgcGFkZGluZzogMTBweCAxMnB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3VidGxlKTtcbiAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgZm9udC1zaXplOiAwLjg2cmVtO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNDtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gIH1cblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LWZhaW50KTtcbiAgICBmbGV4LXNocmluazogMDtcbiAgfVxufVxuXG4uZmllbGQtdW5pdCB7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgZm9udC1zaXplOiAwLjc4cmVtO1xufVxuXG4vLyBNb3ZpbWllbnRvIDIgQ29hY2ggUHJvIMOiwoDClCBub21icmUgZGVsIGNhbXBvICsgcXXDg8KpIHZhIGEgbGVlciBlbCBjbGllbnRlLlxuLmZpZWxkLXRvZ2dsZS10ZXh0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAycHg7XG4gIG1pbi13aWR0aDogMDtcbn1cblxuLmZpZWxkLXRvZ2dsZS1kZXRhaWwge1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGZvbnQtc2l6ZTogMC43NHJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMzU7XG59XG5cbi5jYWRlbmNlLW9wdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcbn1cblxuLmNhZGVuY2Utb3B0aW9uIHtcbiAgZmxleDogMTtcbiAgcGFkZGluZzogMTBweCA4cHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMik7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdWJ0bGUpO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBmb250LXNpemU6IDAuODJyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSwgY29sb3IgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICYtLWFjdGl2ZSB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICB9XG59XG5cbi5maWVsZC10b2dnbGUtaWNvbi0tYWN0aXZlIHtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudCkgIWltcG9ydGFudDtcbn1cblxuLnN1Ym1pdC1idXR0b24ge1xuICBAaW5jbHVkZSB0Zi1ncmFkaWVudC1idXR0b247XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDUwcHg7XG4gIG1hcmdpbi10b3A6IDRweDtcbiAgZm9udC1zaXplOiAwLjk1cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQcmVndW50YXMgcHJvcGlhcyBkZWwgY29hY2ggKEZhc2UgNSwgw4LCpzcpXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi5maWVsZC1ncm91cC1oaW50IHtcbiAgbWFyZ2luOiAwIDAgdmFyKC0tdGYtc3BhY2UtMyk7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBsaW5lLWhlaWdodDogdmFyKC0tdGYtbGluZS1oZWlnaHQtYmFzZSk7XG4gIG1heC13aWR0aDogNjJjaDtcbn1cblxuLmN1c3RvbS1xdWVzdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIG1hcmdpbi1ib3R0b206IHZhcigtLXRmLXNwYWNlLTMpO1xuICBwYWRkaW5nOiB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLW1kKTtcbn1cblxuLmN1c3RvbS1xdWVzdGlvbi1oZWFkLFxuLm9wdGlvbi1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTIpO1xufVxuXG4uY3VzdG9tLXF1ZXN0aW9uLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLmN1c3RvbS1xdWVzdGlvbi1pbnB1dCB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbiAgbWluLWhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgcGFkZGluZzogMCB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0xKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1zbSk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcblxuICAmOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG5cbiAgJi0tbmFycm93IHtcbiAgICBmbGV4OiAwIDAgMTEwcHg7XG4gIH1cbn1cblxuLmN1c3RvbS1xdWVzdGlvbi1zZWxlY3Qge1xuICBtaW4taGVpZ2h0OiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICBwYWRkaW5nOiAwIHZhcigtLXRmLXNwYWNlLTgpIDAgdmFyKC0tdGYtc3BhY2UtMyk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtc20pO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDQ1ZGVnLCB0cmFuc3BhcmVudCA1MCUsIHZhcigtLXRmLXRleHQtbXV0ZWQpIDUwJSksXG4gICAgbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0tdGYtdGV4dC1tdXRlZCkgNTAlLCB0cmFuc3BhcmVudCA1MCUpO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjYWxjKDEwMCUgLSAxOHB4KSBjYWxjKDUwJSArIDJweCksIGNhbGMoMTAwJSAtIDEzcHgpIGNhbGMoNTAlICsgMnB4KTtcbiAgYmFja2dyb3VuZC1zaXplOiA1cHggNXB4LCA1cHggNXB4O1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxuXG4gIG9wdGlvbiB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0xKTtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIH1cbn1cblxuLmN1c3RvbS1xdWVzdGlvbi1yZW1vdmUge1xuICBAaW5jbHVkZSB0Zi1pY29uLWJ1dHRvbih2YXIoLS10Zi10b3VjaC1taW4pLCB2YXIoLS10Zi1yYWRpdXMtc20pLCAyMHB4KTtcblxuICBmbGV4LXNocmluazogMDtcblxuICAmOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1kYW5nZXItc29mdCk7XG4gICAgY29sb3I6IHZhcigtLXRmLWRhbmdlci10ZXh0KTtcbiAgfVxufVxuXG4vLyBJbnRlcnJ1cHRvciBkZSBcIm9ibGlnYXRvcmlhXCIgY29tbyBjaGlwIGRlIGVzdGFkbyB5IG5vIGNvbW8gY2FzaWxsYTogZXMgdW5hXG4vLyBwcm9waWVkYWQgZGUgbGEgcHJlZ3VudGEsIHNlIGxlZSBtZWpvciBqdW50byBhbCB0aXBvIHF1ZSBlbiB1bmEgZmlsYSBhcGFydGUuXG4ucmVxdWlyZWQtdG9nZ2xlIHtcbiAgbWluLWhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgcGFkZGluZzogMCB2YXIoLS10Zi1zcGFjZS00KTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtcGlsbCk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICBib3JkZXItY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpLFxuICAgIGNvbG9yIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmLS1vbiB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LXNvZnQpO1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYWNjZW50LXNvZnQtYm9yZGVyKTtcbiAgICBjb2xvcjogdmFyKC0tdGYtYWNjZW50LXRleHQpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG59XG5cbi5jdXN0b20tcXVlc3Rpb24taGludCB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUteHMpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG59XG5cbi5vcHRpb24tZWRpdG9yIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgcGFkZGluZy10b3A6IHZhcigtLXRmLXNwYWNlLTIpO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN1YnRsZSk7XG59XG5cbi5hZGQtb3B0aW9uLWJ1dHRvbixcbi5hZGQtcXVlc3Rpb24tYnV0dG9uIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIGFsaWduLXNlbGY6IGZsZXgtc3RhcnQ7XG4gIG1pbi1oZWlnaHQ6IHZhcigtLXRmLXRvdWNoLW1pbik7XG4gIHBhZGRpbmc6IDAgdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IDFweCBkYXNoZWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1tZCk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcblxuICAmOmhvdmVyIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWFjY2VudC1zb2Z0LWJvcmRlcik7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgfVxufVxuXG4vLyBQb3IgcXXDg8KpIG5vIHNlIHB1ZWRlIGd1YXJkYXIsIGRpY2hvIHNpZW1wcmUuXG4uc2F2ZS1lcnJvciB7XG4gIG1hcmdpbjogMCAwIHZhcigtLXRmLXNwYWNlLTMpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGNvbG9yOiB2YXIoLS10Zi1kYW5nZXItdGV4dCk7XG59XG4iLCIvLyBCb3R0b20gc2hlZXQgKGJhY2tkcm9wICsgcGFuZWwgZGVzbGl6YW50ZSBkZXNkZSBhYmFqbykgw6LCgMKUIGR1cGxpY2FkbyBieXRlIGFcbi8vIGJ5dGUgZW4gMiBww4PCoWdpbmFzIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+XG4vLyBGYXNlIDMpLiBUYW1iacODwqluIGFwYXJlY2UgZnVlcmEgZGUgZXN0YSBhcHAgZW4gcGFja2FnZXMvc2hhcmVkLWZlYXR1cmVzXG4vLyAob25ib2FyZGluZywgbXktY2hlY2tpbnMsIGV0Yy4pIMOiwoDClCBmdWVyYSBkZSBhbGNhbmNlIGFxdcODwq0gcG9ycXVlIGVzYSBjYXBhIG5vXG4vLyB0aWVuZSBsb3MgdG9rZW5zIC0tdGYtKjsgc2kgZXNhcyBww4PCoWdpbmFzIG1pZ3JhbiBhIC0tdGYtKiBhbGfDg8K6biBkw4PCrWEsIGVzdGVcbi8vIG1pc21vIHBhcnRpYWwgZXMgZWwgZGVzdGlubyBuYXR1cmFsLlxuQG1peGluIHRmLXBhbmVsLWJhY2tkcm9wIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBpbnNldDogMDtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtb3ZlcmxheSk7XG4gIHotaW5kZXg6IHZhcigtLXRmLXotbW9kYWwtYmFja2Ryb3AsIDQwMCk7XG4gIC8vIGBib3RoYCB5IG5vIGVsIHZhbG9yIHBvciBkZWZlY3RvIGBub25lYDogc2luIGZpbGwtbW9kZSBlbCBlbGVtZW50byBzZVxuICAvLyBxdWVkYSBlbiBzdSB2YWxvciBCQVNFIG1pZW50cmFzIGxhIGFuaW1hY2nDg8KzbiBlc3TDg8KhIHBlbmRpZW50ZSBkZSBhcnJhbmNhclxuICAvLyDDosKAwpRwZXN0YcODwrFhIGVuIHNlZ3VuZG8gcGxhbm8sIHdlYnZpZXcgcXVlIGRpZmllcmUgZWwgcHJpbWVyIGZyYW1lw6LCgMKUIHkgY29tb1xuICAvLyBlbCBrZXlmcmFtZSBwYXJ0ZSBkZSBvcGFjaXR5IDAsIGxhIGhvamEgYXBhcmVjw4PCrWEgYSBtZWRpYXMsIHRyYW5zbMODwrpjaWRhLFxuICAvLyBkZWphbmRvIHZlciBsYSBmaWNoYSBkZSBkZXRyw4PCoXMuIE1lZGlkbzogY29uIGxhIGFuaW1hY2nDg8KzbiBzaW4gYXZhbnphcixcbiAgLy8gb3BhY2l0eSBjb21wdXRhYmEgMC5cbiAgYW5pbWF0aW9uOiB0Zi1iYWNrZHJvcC1pbiAyMDBtcyB2YXIoLS10Zi1lYXNlLW91dCkgYm90aDtcblxuICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xuICAgIGFuaW1hdGlvbjogbm9uZTtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG5cbkBtaXhpbiB0Zi1wYW5lbC1zaGVldCB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgei1pbmRleDogdmFyKC0tdGYtei1tb2RhbCwgNTAwKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0xKTtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiAyMHB4IDIwcHggMCAwO1xuICBwYWRkaW5nOiAxMHB4IDE2cHggMjRweDtcbiAgbWF4LWhlaWdodDogODB2aDtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgYW5pbWF0aW9uOiB0Zi1zaGVldC1pbiAyNjBtcyB2YXIoLS10Zi1lYXNlLW91dCkgYm90aDtcblxuICAvLyBTaW4gYW5pbWFjacODwrNuLCBlbCBlc3RhZG8gZmluYWwgdGllbmUgcXVlIHF1ZWRhciBleHBsw4PCrWNpdG86IGBub25lYCBib3JyYVxuICAvLyB0YW1iacODwqluIGVsIGBib3RoYCBkZSBhcnJpYmEuXG4gIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgYW5pbWF0aW9uOiBub25lO1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiBub25lO1xuICB9XG59XG5cbkBtaXhpbiB0Zi1wYW5lbC1oYW5kbGUge1xuICB3aWR0aDogMzZweDtcbiAgaGVpZ2h0OiA0cHg7XG4gIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYm9yZGVyLXN0cm9uZ2VzdCk7XG4gIG1hcmdpbjogMCBhdXRvIDE0cHg7XG59XG5cbkBrZXlmcmFtZXMgdGYtYmFja2Ryb3AtaW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgdGYtc2hlZXQtaW4ge1xuICBmcm9tIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTZweCk7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuICB0byB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBQYW5lbCBsYXRlcmFsIGRlcmVjaG8uIE1pc21hIHBpZXphIHF1ZSBsYSBib3R0b20gc2hlZXQgcGVybyBhbmNsYWRvIGFsXG4vLyBsYWRvLCBwYXJhIGZvcm11bGFyaW9zIGxhcmdvcyBxdWUgc2UgcmVsbGVuYW4gbWlyYW5kbyBlbCBjb250ZW5pZG8gZGVcbi8vIGRldHLDg8KhcyAoc3VwbGVtZW50b3MganVudG8gYSBzdXMgZ3LDg8KhZmljYXMsIHBvciBlamVtcGxvKS5cbi8vXG4vLyBFbiBtw4PCs3ZpbCBOTyBzZSBsYXRlcmFsaXphOiA0MDBweCBkZSBhbmNobyBzb2JyZSB1bmEgcGFudGFsbGEgZGUgMzkwIGVzIHVuYVxuLy8gaG9qYSBhIHBhbnRhbGxhIGNvbXBsZXRhIG1hbCBoZWNoYS4gUG9yIGRlYmFqbyBkZSA3NjhweCBzaWd1ZSBzaWVuZG9cbi8vIGJvdHRvbSBzaGVldCwgcXVlIGVzIGVsIGdlc3RvIHF1ZSBsYSBnZW50ZSBlc3BlcmEgYWjDg8KtLlxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBFbCB2ZWxvIHNlIGFjbGFyYSBlbiBlc2NyaXRvcmlvOiBlbCBwYW5lbCBzZSBsYXRlcmFsaXphIHByZWNpc2FtZW50ZSBwYXJhXG4vLyBwb2RlciBtaXJhciBsbyBxdWUgaGF5IGRldHLDg8KhcyBtaWVudHJhcyBzZSByZWxsZW5hIChsYXMgZ3LDg8KhZmljYXMgZGVcbi8vIHByb2dyZXNvLCBhbCBwYXV0YXIgdW4gc3VwbGVtZW50bykuIEFsIDUwJSBxdWVkYWJhbiBhcGFnYWRhcy5cbkBtaXhpbiB0Zi1zaWRlLXBhbmVsLWJhY2tkcm9wIHtcbiAgQGluY2x1ZGUgdGYtcGFuZWwtYmFja2Ryb3A7XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjI1KTtcbiAgfVxufVxuXG5AbWl4aW4gdGYtc2lkZS1wYW5lbCgkd2lkdGg6IDQyMHB4KSB7XG4gIEBpbmNsdWRlIHRmLXBhbmVsLXNoZWV0O1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgIHRvcDogMDtcbiAgICBib3R0b206IDA7XG4gICAgbGVmdDogYXV0bztcbiAgICByaWdodDogMDtcbiAgICB3aWR0aDogJHdpZHRoO1xuICAgIG1heC13aWR0aDogOTJ2dztcbiAgICAvLyAxMDB2aCB5IG5vIGBub25lYDogc2kgdW4gYW5jZXN0cm8gY29uIGBjb250YWluYCBjYXB0dXJhIGVsIGZpeGVkXG4gICAgLy8gKGlvbi1jb250ZW50IGxvIGhhY2UpLCBlbCBwYW5lbCB0b21hIGxhIGFsdHVyYSBkZSBFU0UgYW5jZXN0cm8uIFNpXG4gICAgLy8gbWlkZSBtw4PCoXMgcXVlIGxhIHZlbnRhbmEsIGVsIHBpZSBjb24gR3VhcmRhciBzZSBxdWVkYSBmdWVyYSBkZVxuICAgIC8vIHBhbnRhbGxhLiBNZWRpZG86IDg0MHB4IGRlIGFsdG8gZW4gdW5hIHZlbnRhbmEgZGUgODAwLlxuICAgIG1heC1oZWlnaHQ6IDEwMHZoO1xuICAgIC8vIFNpbiBlc3RvIGVsIHJlbGxlbm8gc2Ugc3VtYSBhbCBhbmNobyB5IGFsIGFsdG86IGVsIHBhbmVsIG1lZMODwq1hIDQ4MXB4XG4gICAgLy8gcGlkaWVuZG8gNDQwLCB5IDg0MCBkZSBhbHRvIGVuIHVuYSB2ZW50YW5hIGRlIDgwMCwgZGVzYm9yZGFuZG8gcG9yXG4gICAgLy8gYWJham8uIEVzdGUgcHJveWVjdG8gbm8gdGllbmUgcmVzZXQgZ2xvYmFsIGRlIGJveC1zaXppbmcuXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICBib3JkZXItdG9wOiBub25lO1xuICAgIGJvcmRlci1sZWZ0OiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICBwYWRkaW5nOiB2YXIoLS10Zi1zcGFjZS01KSB2YXIoLS10Zi1zcGFjZS01KSAwO1xuICAgIGFuaW1hdGlvbjogdGYtc2lkZS1wYW5lbC1pbiAyNjBtcyB2YXIoLS10Zi1lYXNlLW91dCkgYm90aDtcblxuICAgIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgICBhbmltYXRpb246IG5vbmU7XG4gICAgICBvcGFjaXR5OiAxO1xuICAgICAgdHJhbnNmb3JtOiBub25lO1xuICAgIH1cbiAgfVxufVxuXG4vLyBFbCBhc2EgZGUgYXJyYXN0cmUgc29sbyB0aWVuZSBzZW50aWRvIGVuIGxhIGhvamEgaW5mZXJpb3I6IGVuIHVuIHBhbmVsXG4vLyBsYXRlcmFsIG5vIGhheSBuYWRhIHF1ZSBhcnJhc3RyYXIgaGFjaWEgYWJham8uXG5AbWl4aW4gdGYtc2lkZS1wYW5lbC1oYW5kbGUge1xuICBAaW5jbHVkZSB0Zi1wYW5lbC1oYW5kbGU7XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHRmLXNpZGUtcGFuZWwtaW4ge1xuICBmcm9tIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMjRweCk7XG4gICAgb3BhY2l0eTogMDtcbiAgfVxuICB0byB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cbiIsIi8vIEVudHJhZGEgZXNjYWxvbmFkYSBkZSBsaXN0YXMvZ3JpZHMgZGUgY2FyZHMgYWwgY2FyZ2FyIMOiwoDClCBtaXNtbyBibG9xdWVcbi8vIChrZXlmcmFtZSArIGFuaW1hdGlvbiArIGd1YXJkIGRlIHByZWZlcnMtcmVkdWNlZC1tb3Rpb24pIHJlcGV0aWRvIGJ5dGUgYVxuLy8gYnl0ZSBlbiA5IHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuLiBNaXNtbyBjcml0ZXJpbyBxdWVcbi8vIF9za2VsZXRvbi5zY3NzL19idXR0b25zLnNjc3M6IGNhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW9cbi8vIHNlbGVjdG9yIHkgYcODwrFhZGUgZW5jaW1hIHNvbG8gbG8gcXVlIHZhcsODwq1hIChyYWRpbywgdGFtYcODwrFvLi4uKS5cbkBtaXhpbiB0Zi1jYXJkLWluLWFuaW1hdGlvbiB7XG4gIGFuaW1hdGlvbjogdGYtY2FyZC1pbiAzMjBtcyB2YXIoLS10Zi1lYXNlLW91dCkgYmFja3dhcmRzO1xuXG4gIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgYW5pbWF0aW9uOiBub25lO1xuICB9XG59XG5cbi8vIFZhcmlhbnRlIHBhcmEgbGlzdGFzOiBhZGVtw4PCoXMgZGVsIGZ1bmRpZG8sIGVzY2Fsb25hIGVsIHJldHJhc28gZGUgY2FkYVxuLy8gZWxlbWVudG8gcG9yIHN1IHBvc2ljacODwrNuIChudGgtY2hpbGQpLiAkbWF4LWl0ZW1zIGFjb3RhIGVsIGJ1Y2xlIGFsIG7DgsK6XG4vLyByYXpvbmFibGUgZGUgdGFyamV0YXMgdmlzaWJsZXMgcG9yIHDDg8KhZ2luYSDDosKAwpQgbm8gdGllbmUgc2VudGlkbyBnZW5lcmFyIG3Dg8Khc1xuLy8gcmVnbGFzIG50aC1jaGlsZCBxdWUgZWxlbWVudG9zIHB1ZWRlIGxsZWdhciBhIGhhYmVyLlxuQG1peGluIHRmLWNhcmQtaW4tc3RhZ2dlcigkbWF4LWl0ZW1zOiAxMiwgJHN0ZXA6IDM1bXMpIHtcbiAgQGluY2x1ZGUgdGYtY2FyZC1pbi1hbmltYXRpb247XG5cbiAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCAkbWF4LWl0ZW1zIHtcbiAgICAmOm50aC1jaGlsZCgjeyRpfSkge1xuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAjeygkaSAtIDEpICogJHN0ZXB9O1xuICAgIH1cbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHRmLWNhcmQtaW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg2cHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuIiwiLy8gQm90w4PCs24gQ1RBIGNvbiBncmFkaWVudGUgZGUgYWNlbnRvIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gZW4gfjExIHNpdGlvcyBkZVxuLy8gfjEwIHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS5cbi8vIENhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW8gc2VsZWN0b3IgeSBhw4PCsWFkZSBlbmNpbWEgc29sbyBsb1xuLy8gcXVlIHZhcsODwq1hIHBvciBsYXlvdXQgKHdpZHRoLCBoZWlnaHQsIGZvbnQtc2l6ZSwgbWFyZ2luKS5cbi8vXG4vLyBMYSBtaXRhZCBkZSBsb3Mgc2l0aW9zIG9yaWdpbmFsZXMgbm8gdGVuw4PCrWFuIHRyYW5zaWNpw4PCs24vZmVlZGJhY2sgZGUgcHVsc2FjacODwrNuXG4vLyBuaSA6Zm9jdXMtdmlzaWJsZSDDosKAwpQgZWwgbWl4aW4gbG9zIGHDg8KxYWRlIHNpZW1wcmUsIGNpZXJyYSBlc2UgaHVlY28gZGVcbi8vIGNvbnNpc3RlbmNpYSBkZSBpbnRlcmFjY2nDg8KzbiAoUFJPRFVDVC5tZDogXCJ1biBzb2xvIHBhdHLDg8KzbiBwb3IgdGlwbyBkZVxuLy8gY29tcG9uZW50ZVwiKSBlbiB2ZXogZGUgcGVycGV0dWFyIGxhIHZhcmlhY2nDg8KzbiBhY2NpZGVudGFsLlxuQG1peGluIHRmLWdyYWRpZW50LWJ1dHRvbigkcmFkaXVzOiAxMnB4KSB7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LWdyYWRpZW50KTtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudC1jb250cmFzdCk7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSwgb3BhY2l0eSAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45Nyk7XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjQ1O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLXRleHQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLy8gQm90w4PCs24gZGUgaGVhZGVyIHF1ZSBlcyBzb2xvIHVuIGljb25vIMOiwoDClCBtaXNtbyBsb29rIFwiZW52dWVsdG9cIiBxdWUgeWEgdXNhIGxhXG4vLyBhcHAgZGUgY29uc3VtaWRvciBlbiBzdXMgdG9vbGJhcnMgKHBhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy8uLi4vZGlldHMvXG4vLyBjb21wb25lbnRzL3Rvb2xiYXItY2FsZW5kYXI6IGZvbmRvICsgYm9yZGVyLXJhZGl1cyArIGNhamEgZmlqYSA0NHg0NCwgZW5cbi8vIHZleiBkZWwgaW9uLWJ1dHRvbiBwbGFuby90cmFuc3BhcmVudGUgcXVlIHRlbsODwq1hIGNhZGEgcGFudGFsbGEgZGUgdHJhaW5lcnNcbi8vIGhhc3RhIGFob3JhKS4gVG9rZW5lYWRvIGEgbGEgcGFsZXRhIGRlIGVzdGEgYXBwIGVuIHZleiBkZSByZXBldGlyIGxvc1xuLy8gcmdiYSgyNTUsMjU1LDI1NSwuLi4pIHN1ZWx0b3MgZGVsIG9yaWdpbmFsLlxuLy9cbi8vIFNpcnZlIHRhbnRvIHBhcmEgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCI+ICh1c2EgbGFzIENTUyBjdXN0b20gcHJvcGVydGllc1xuLy8gZGUgSW9uaWMpIGNvbW8gcGFyYSB1biA8YnV0dG9uPiBuYXRpdm8gKHVzYSBsYXMgcHJvcGllZGFkZXMgcGxhbmFzKSDDosKAwpRcbi8vIGFtYm9zIGNvZXhpc3RlbiBob3kgZW4gdHJhaW5lcnMgcGFyYSBlbCBtaXNtbyByb2wgZGUgXCJ2b2x2ZXJcIi9cImNlcnJhclwiLlxuQG1peGluIHRmLWljb24tYnV0dG9uKCRzaXplOiA0NHB4LCAkcmFkaXVzOiAxMnB4LCAkaWNvbi1zaXplOiAyMHB4KSB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcbiAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1iYWNrZ3JvdW5kLWhvdmVyOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtZm9jdXNlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1jb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICAtLWJvcmRlci1yYWRpdXM6ICN7JHJhZGl1c307XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbiAgLS1wYWRkaW5nLXRvcDogMDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMDtcblxuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6ICRyYWRpdXM7XG4gIHdpZHRoOiAkc2l6ZTtcbiAgaGVpZ2h0OiAkc2l6ZTtcbiAgbWluLXdpZHRoOiAkc2l6ZTtcbiAgbWluLWhlaWdodDogJHNpemU7XG4gIG1hcmdpbjogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCksXG4gICAgY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogJGljb24tc2l6ZTtcbiAgfVxufVxuXG4vLyBFeHBhbnNvciBpbnZpc2libGUgZGUgem9uYSBwdWxzYWJsZS5cbi8vXG4vLyBQQVJBIFFVw4PCiTogdW4gY29udHJvbCBjb21wYWN0byAodW4gaWNvbm8gZGUgMzIgcHggZW4gdW5hIGZpbGEgZGUgdGFibGEsIHVuXG4vLyBlbmxhY2UgZGUgdGV4dG8gZGUgMTYgcHgpIG5vIGxsZWdhIGEgbG9zIDQ0IHB4IHF1ZSBleGlnZSBQUk9EVUNULm1kLCB5XG4vLyBlbmdvcmRhcmxvIGRlIHZlcmRhZCBkZXNwbGF6YSB0b2RvIGxvIHF1ZSB0aWVuZSBhbHJlZGVkb3Igw6LCgMKUIGVuIHVuYSB0YWJsYVxuLy8gZGUgdmVpbnRlIGZpbGFzLCA4IHB4IHBvciBmaWxhIHNvbiBtZWRpYSBwYW50YWxsYS5cbi8vXG4vLyBFbCBwc2V1ZG9lbGVtZW50byBjcmVjZSBoYWNpYSBmdWVyYSBzaW4gb2N1cGFyIHNpdGlvIGVuIGVsIGZsdWpvLCBhc8ODwq0gcXVlXG4vLyBlbCBib3TDg8KzbiBzZSB2ZSBwZXF1ZcODwrFvIHkgc2UgcHVsc2EgZ3JhbmRlLlxuLy9cbi8vIEFWSVNPIERFIE1FRElDScODwpNOOiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBOTyB2ZSBlc3RlIHBzZXVkb2VsZW1lbnRvLCBhc8ODwq1cbi8vIHF1ZSBhbCB2ZXJpZmljYXIgaGF5IHF1ZSB1c2FyIGVsZW1lbnRGcm9tUG9pbnQgY29uIGVsIGVsZW1lbnRvIGRlbnRybyBkZWxcbi8vIHZpZXdwb3J0LiBBZGVtw4PCoXMgZWwgaGl0LXRlc3QgZGV2dWVsdmUgMiBweCBtZW5vcyBxdWUgbGEgY2FqYSBkZWNsYXJhZGFcbi8vIChjb21wcm9iYWRvOiAtNHB4IGRhIDQyLCAtNnB4IGRhIDQ2KSwgYXPDg8KtIHF1ZSB1biA0MiBtZWRpZG8gc29uIDQ0IHJlYWxlcy5cbi8vXG4vLyAkZ3JvdzogY3XDg8KhbnRvIGNyZWNlIHBvciBjYWRhIGxhZG8uIDRweCBsbGV2YSB1biBjb250cm9sIGRlIDM2IHB4IGEgNDQuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIoJGdyb3c6IDRweCkge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IC0jeyRncm93fTtcbiAgfVxufVxuXG4vLyBWYXJpYW50ZSBxdWUgc29sbyBjcmVjZSBlbiBWRVJUSUNBTC4gUGFyYSBjb250cm9sZXMgZW4gZmlsYSBkb25kZSBlbFxuLy8gZXhwYW5zb3IgaG9yaXpvbnRhbCBzZSBzb2xhcGFyw4PCrWEgY29uIGVsIGRlIGFsIGxhZG8geSByb2JhcsODwq1hIHN1cyB0b3F1ZXMuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIteSgkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC0jeyRncm93fTtcbiAgICBib3R0b206IC0jeyRncm93fTtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICB9XG59XG4iLCIvLyBGaWxhIGRlIGlucHV0IGNvbiBpY29ubyAod3JhcHBlciArIGljb25vICsgY2FtcG8pIMOiwoDClCByZXBldGlkYSBlbiA0IHDDg8KhZ2luYXNcbi8vIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuIEVsIGZvbmRvXG4vLyBkZWwgd3JhcHBlciBlcyBlbCDDg8K6bmljbyB2YWxvciBxdWUgdmFyw4PCrWEgcG9yIHDDg8KhZ2luYSAoc3VwZXJmaWNpZSAxIG8gMiBzZWfDg8K6blxuLy8gY29udGV4dG8gdmlzdWFsKSwgZGUgYWjDg8KtIGVsIHBhcsODwqFtZXRybzsgdGFtYcODwrFvIGRlIGZ1ZW50ZS9hbHRvL21hcmdlbiBzZVxuLy8gZGVqYW4gZnVlcmEgZGVsIG1peGluIHBvcnF1ZSBjYWRhIHDDg8KhZ2luYSBsb3MgZmlqYSBzZWfDg8K6biBzdSBwcm9waW8gbGF5b3V0LlxuQG1peGluIHRmLWlucHV0LXdyYXBwZXIoJGJnOiB2YXIoLS10Zi1zdXJmYWNlLTEpKSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgYmFja2dyb3VuZDogJGJnO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMCAxNHB4O1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6Zm9jdXMtd2l0aGluIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIH1cbn1cblxuQG1peGluIHRmLWlucHV0LWljb24ge1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG5AbWl4aW4gdGYtaW5wdXQtZmllbGQge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGhlaWdodDogMTAwJTtcblxuICAmOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ }),

/***/ 86284:
/*!*****************************************************************************!*\
  !*** ./src/app/features/checkin-templates/models/checkin-template.model.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CUSTOM_QUESTION_TYPES: () => (/* binding */ CUSTOM_QUESTION_TYPES)
/* harmony export */ });
// Los seis tipos de §7, con el texto que ve el coach al elegir. `frequency`
// no lleva opciones configurables: su escala es fija (ver el backend), y eso
// es lo que hace comparables las respuestas entre semanas.
const CUSTOM_QUESTION_TYPES = [{
  key: 'scale_1_5',
  label: 'Escala 1-5',
  hint: 'Del 1 al 5, como el resto de campos de bienestar'
}, {
  key: 'number',
  label: 'Número',
  hint: 'Una cifra, con unidad opcional'
}, {
  key: 'text',
  label: 'Texto libre',
  hint: 'Respuesta abierta'
}, {
  key: 'yes_no',
  label: 'Sí / No',
  hint: 'Dos opciones'
}, {
  key: 'select',
  label: 'Selector',
  hint: 'Tú defines las opciones'
}, {
  key: 'frequency',
  label: 'Frecuencia',
  hint: 'Nunca · Rara vez · A veces · A menudo · Siempre'
}];

/***/ })

}]);
//# sourceMappingURL=src_app_features_checkin-templates_checkin-templates_module_ts.js.map