"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_features_invites_invites_module_ts"],{

/***/ 90698:
/*!************************************************************!*\
  !*** ./src/app/features/invites/invites-routing.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InvitesPageRoutingModule: () => (/* binding */ InvitesPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _invites_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invites.page */ 99868);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _InvitesPageRoutingModule;




const routes = [{
  path: '',
  component: _invites_page__WEBPACK_IMPORTED_MODULE_1__.InvitesPage
}];
class InvitesPageRoutingModule {}
_InvitesPageRoutingModule = InvitesPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(InvitesPageRoutingModule, "\u0275fac", function InvitesPageRoutingModule_Factory(t) {
  return new (t || _InvitesPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(InvitesPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _InvitesPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(InvitesPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](InvitesPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 69971:
/*!****************************************************!*\
  !*** ./src/app/features/invites/invites.module.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InvitesPageModule: () => (/* binding */ InvitesPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _invites_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./invites-routing.module */ 90698);
/* harmony import */ var _invites_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./invites.page */ 99868);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);

var _InvitesPageModule;




class InvitesPageModule {}
_InvitesPageModule = InvitesPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(InvitesPageModule, "\u0275fac", function InvitesPageModule_Factory(t) {
  return new (t || _InvitesPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(InvitesPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _InvitesPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(InvitesPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _invites_routing_module__WEBPACK_IMPORTED_MODULE_2__.InvitesPageRoutingModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](InvitesPageModule, {
    declarations: [_invites_page__WEBPACK_IMPORTED_MODULE_3__.InvitesPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _invites_routing_module__WEBPACK_IMPORTED_MODULE_2__.InvitesPageRoutingModule]
  });
})();

/***/ }),

/***/ 99868:
/*!**************************************************!*\
  !*** ./src/app/features/invites/invites.page.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InvitesPage: () => (/* binding */ InvitesPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _services_trainer_invites_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./services/trainer-invites-api.service */ 93918);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 54844);


var _InvitesPage;








function InvitesPage_ng_container_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "p", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "ion-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const hint_r14 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", hint_r14, " ");
  }
}
function InvitesPage_ng_template_23_p_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "ion-icon", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, " Elige un \u00E1mbito ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function InvitesPage_ng_template_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, InvitesPage_ng_template_23_p_0_Template, 3, 0, "p", 37);
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r2.form.touched && !ctx_r2.hasScopeSelected);
  }
}
function InvitesPage_ng_container_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "p", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "ion-icon", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const hint_r16 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", hint_r16, " ");
  }
}
function InvitesPage_ng_template_32_p_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "ion-icon", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, " Elige un \u00E1mbito ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function InvitesPage_ng_template_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, InvitesPage_ng_template_32_p_0_Template, 3, 0, "p", 37);
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r5.form.touched && !ctx_r5.hasScopeSelected);
  }
}
function InvitesPage_div_34_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "div", 43)(2, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function InvitesPage_div_34_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 44)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "No se pudo cargar la configuraci\u00F3n del cuestionario.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function InvitesPage_div_34_div_2_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r22);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r21.loadIntakeConfig());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Reintentar");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function InvitesPage_div_34_ng_container_3_span_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "ion-spinner", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, " Guardando ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function InvitesPage_div_34_ng_container_3_button_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function InvitesPage_div_34_ng_container_3_button_6_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r28);
      const field_r26 = restoredCtx.$implicit;
      const ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r27.toggleIntakeField(field_r26));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "ion-icon", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const field_r26 = ctx.$implicit;
    const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r24.intakeFieldLabels[field_r26]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("field-toggle-icon--active", ctx_r24.selectedIntakeFields.has(field_r26));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("name", ctx_r24.selectedIntakeFields.has(field_r26) ? "checkbox" : "square-outline");
  }
}
function InvitesPage_div_34_ng_container_3_div_9_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 64)(1, "button", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function InvitesPage_div_34_ng_container_3_div_9_div_1_Template_button_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r32);
      const question_r30 = restoredCtx.$implicit;
      const ctx_r31 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r31.toggleCustomQuestionEnabled(question_r30.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](2, "ion-icon", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "span", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "button", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function InvitesPage_div_34_ng_container_3_div_9_div_1_Template_button_click_5_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r32);
      const question_r30 = restoredCtx.$implicit;
      const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r33.removeCustomQuestion(question_r30.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "ion-icon", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const question_r30 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("field-toggle-icon--active", question_r30.enabled);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("name", question_r30.enabled ? "checkbox" : "square-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](question_r30.label);
  }
}
function InvitesPage_div_34_ng_container_3_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, InvitesPage_div_34_ng_container_3_div_9_div_1_Template, 7, 4, "div", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r25.customQuestions)("ngForTrackBy", ctx_r25.trackByQuestionId);
  }
}
const _c0 = function () {
  return {
    standalone: true
  };
};
function InvitesPage_div_34_ng_container_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 46)(2, "p", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, " Elige qu\u00E9 le preguntas a un cliente nuevo. Los campos que desactives no aparecer\u00E1n en su cuestionario. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, InvitesPage_div_34_ng_container_3_span_4_Template, 3, 0, "span", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, InvitesPage_div_34_ng_container_3_button_6_Template, 4, 4, "button", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "h4", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8, "Preguntas personalizadas");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, InvitesPage_div_34_ng_container_3_div_9_Template, 2, 2, "div", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "div", 53)(11, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](12, "ion-icon", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "input", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function InvitesPage_div_34_ng_container_3_Template_input_ngModelChange_13_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r35);
      const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r34.newQuestionLabel = $event);
    })("keyup.enter", function InvitesPage_div_34_ng_container_3_Template_input_keyup_enter_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r35);
      const ctx_r36 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r36.addCustomQuestion());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "button", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function InvitesPage_div_34_ng_container_3_Template_button_click_14_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r35);
      const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r37.addCustomQuestion());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](15, "ion-icon", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r20.savingIntakeConfig);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r20.intakeConfigFields);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r20.customQuestions.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx_r20.newQuestionLabel)("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](6, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", !ctx_r20.canAddCustomQuestion);
  }
}
function InvitesPage_div_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, InvitesPage_div_34_div_1_Template, 3, 0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, InvitesPage_div_34_div_2_Template, 5, 0, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, InvitesPage_div_34_ng_container_3_Template, 16, 7, "ng-container", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r6.intakeConfigState === "loading");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r6.intakeConfigState === "error");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r6.intakeConfigState === "loaded");
  }
}
function InvitesPage_ion_spinner_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ion-spinner", 69);
  }
}
function InvitesPage_div_40_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "El email es obligatorio");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function InvitesPage_div_40_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Introduce un email v\u00E1lido");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function InvitesPage_div_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, InvitesPage_div_40_span_1_Template, 2, 0, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, InvitesPage_div_40_span_2_Template, 2, 0, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    let tmp_0_0;
    let tmp_1_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", (tmp_0_0 = ctx_r8.form.get("clientEmail")) == null ? null : tmp_0_0.errors == null ? null : tmp_0_0.errors["required"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx_r8.form.get("clientEmail")) == null ? null : tmp_1_0.errors == null ? null : tmp_1_0.errors["email"]);
  }
}
function InvitesPage_span_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Enviar invitaci\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function InvitesPage_ion_spinner_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ion-spinner", 59);
  }
}
function InvitesPage_div_47_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "div", 74)(2, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
const _c1 = function () {
  return [1, 2];
};
function InvitesPage_div_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, InvitesPage_div_47_div_1_Template, 3, 0, "div", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](1, _c1));
  }
}
function InvitesPage_div_48_Template(rf, ctx) {
  if (rf & 1) {
    const _r43 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 44)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "No se pudieron cargar tus invitaciones.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "button", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function InvitesPage_div_48_Template_button_click_3_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r43);
      const ctx_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r42.loadInvites());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Reintentar");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function InvitesPage_ng_container_49_p_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " No tienes invitaciones pendientes. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function InvitesPage_ng_container_49_div_3_div_6_ion_spinner_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ion-spinner", 59);
  }
}
function InvitesPage_ng_container_49_div_3_div_6_ion_icon_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ion-icon", 91);
  }
}
function InvitesPage_ng_container_49_div_3_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r53 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 84)(1, "div", 85)(2, "span", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "ion-icon", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 87)(6, "span", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "button", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function InvitesPage_ng_container_49_div_3_div_6_Template_button_click_8_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r53);
      const inv_r49 = restoredCtx.$implicit;
      const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r52.confirmCancel(inv_r49));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, InvitesPage_ng_container_49_div_3_div_6_ion_spinner_9_Template, 1, 0, "ion-spinner", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](10, InvitesPage_ng_container_49_div_3_div_6_ion_icon_10_Template, 1, 0, "ion-icon", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const inv_r49 = ctx.$implicit;
    const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("name", inv_r49.scope === "training" ? "barbell-outline" : "nutrition-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r48.scopeLabel(inv_r49.scope), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵattribute"]("data-status", inv_r49.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r48.statusLabel(inv_r49.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r48.cancellingId === inv_r49._id)("title", "Cancelar invitaci\u00F3n de " + ctx_r48.scopeLabel(inv_r49.scope));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵattribute"]("aria-label", "Cancelar invitaci\u00F3n de " + ctx_r48.scopeLabel(inv_r49.scope));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r48.cancellingId === inv_r49._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r48.cancellingId !== inv_r49._id);
  }
}
function InvitesPage_ng_container_49_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 79)(1, "div", 80)(2, "span", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, InvitesPage_ng_container_49_div_3_div_6_Template, 11, 9, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r47 = ctx.$implicit;
    const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r45.clientDisplayName(group_r47) || "Cliente");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](group_r47.clientEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", group_r47.invites)("ngForTrackBy", ctx_r45.trackByInviteId);
  }
}
function InvitesPage_ng_container_49_ng_container_4_div_4_div_6_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "ion-icon", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const scope_r59 = ctx.$implicit;
    const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("name", scope_r59 === "training" ? "barbell-outline" : "nutrition-outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r58.scopeLabel(scope_r59), " ");
  }
}
function InvitesPage_ng_container_49_ng_container_4_div_4_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 84)(1, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, InvitesPage_ng_container_49_ng_container_4_div_4_div_6_span_2_Template, 3, 2, "span", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "span", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const statusGroup_r57 = ctx.$implicit;
    const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", statusGroup_r57.scopes);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵattribute"]("data-status", statusGroup_r57.status);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r56.statusLabel(statusGroup_r57.status));
  }
}
function InvitesPage_ng_container_49_ng_container_4_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 79)(1, "div", 80)(2, "span", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, InvitesPage_ng_container_49_ng_container_4_div_4_div_6_Template, 5, 3, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const group_r55 = ctx.$implicit;
    const ctx_r54 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r54.clientDisplayName(group_r55) || "Cliente");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](group_r55.clientEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", group_r55.statusGroups)("ngForTrackBy", ctx_r54.trackByStatus);
  }
}
function InvitesPage_ng_container_49_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "h2", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "Historial");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, InvitesPage_ng_container_49_ng_container_4_div_4_Template, 7, 4, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r46.groupedHistoryInvites)("ngForTrackBy", ctx_r46.trackByClientEmail);
  }
}
function InvitesPage_ng_container_49_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, InvitesPage_ng_container_49_p_1_Template, 2, 0, "p", 76);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, InvitesPage_ng_container_49_div_3_Template, 7, 4, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, InvitesPage_ng_container_49_ng_container_4_Template, 5, 2, "ng-container", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx_r13.pendingInvites.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r13.groupedPendingInvites)("ngForTrackBy", ctx_r13.trackByClientEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx_r13.historyInvites.length);
  }
}
class InvitesPage {
  groupByClient(invites) {
    const groups = new Map();
    for (const invite of invites) {
      const key = invite.clientEmail.toLowerCase();
      if (!groups.has(key)) {
        groups.set(key, {
          clientEmail: invite.clientEmail,
          clientId: invite.clientId,
          invites: []
        });
      }
      groups.get(key).invites.push(invite);
    }
    return [...groups.values()];
  }
  trackByClientEmail(_index, group) {
    return group.clientEmail;
  }
  trackByStatus(_index, statusGroup) {
    return statusGroup.status;
  }
  trackByInviteId(_index, invite) {
    return invite._id;
  }
  clientDisplayName(group) {
    const client = group.invites.find(invite => invite.client)?.client;
    if (!client?.name && !client?.lastname) return null;
    return `${client.name || ''} ${client.lastname || ''}`.trim();
  }
  groupByStatus(invites) {
    const groups = new Map();
    for (const invite of invites) {
      if (!groups.has(invite.status)) {
        groups.set(invite.status, {
          status: invite.status,
          scopes: [],
          invites: []
        });
      }
      const group = groups.get(invite.status);
      group.scopes.push(invite.scope);
      group.invites.push(invite);
    }
    return [...groups.values()];
  }
  groupByClientWithStatus(invites) {
    return this.groupByClient(invites).map(group => ({
      ...group,
      statusGroups: this.groupByStatus(group.invites)
    }));
  }
  // TASK-049 (MASTER_BACKLOG.md) — personalización del cuestionario inicial.

  constructor(trainerInvitesApi, ionicUtilService, router) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "trainerInvitesApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "form", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isSending", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "listState", 'loading');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "pendingInvites", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "historyInvites", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "cancellingId", null);
    // Calculados UNA VEZ en loadInvites(), no en un getter/método de plantilla
    // — un getter (o una llamada a método) usado directamente en *ngFor se
    // reevalúa en CADA ciclo de detección de cambios y devuelve arrays/objetos
    // nuevos cada vez, lo que hace que *ngFor destruya y recree todas las
    // filas sin parar y deja la pantalla colgada en cuanto hay invitaciones
    // reales que listar (mismo bug ya visto y corregido en clients.page.ts).
    // Pendientes va por INVITACIÓN, no por grupo de estado — cada fila tiene
    // un único chip de ámbito y un único botón de cancelar, sin ambigüedad de
    // cuál cancela cuál cuando el cliente tiene los dos ámbitos a la vez.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "groupedPendingInvites", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "groupedHistoryInvites", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "intakeFieldLabels", {
      goals: 'Objetivos',
      healthConditions: 'Salud y lesiones',
      experienceLevel: 'Nivel de experiencia',
      availability: 'Disponibilidad',
      equipment: 'Equipamiento disponible',
      allergies: 'Alergias',
      favoriteFoods: 'Alimentos favoritos',
      dislikedFoods: 'Alimentos que no le gustan',
      cooksAtHome: 'Cocina en casa'
    });
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "intakeConfigState", 'loading');
    // El catálogo de campos es un conjunto cerrado ya conocido en compilación
    // (intakeFieldLabels arriba) — no depende de lo que devuelva el backend en
    // cada carga, así que no hace falta guardarlo como estado propio ni
    // esperar la respuesta para saber qué checkboxes mostrar.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "intakeConfigFields", Object.keys(this.intakeFieldLabels));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "selectedIntakeFields", new Set());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "savingIntakeConfig", false);
    // El panel ya no es un accordion manual — aparece solo en cuanto se marca
    // Entrenamiento y/o Nutrición arriba (ver hasScopeSelected/template), y se
    // pide la config la primera vez que eso ocurre.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "intakeConfigRequested", false);
    // Preguntas de texto libre que el trainer añade además de los 9 campos
    // predefinidos — mismo documento (TrainerIntakeConfig), mismo botón
    // "Guardar". Un id temporal (client-side) hasta el primer guardado, para
    // que trackBy/borrar funcionen antes de tener el id real del backend.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "customQuestions", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "newQuestionLabel", '');
    // El panel de cuestionario es GLOBAL del trainer (no hay un enabledFields
    // por scope en el backend, ver train-fit-back/components/trainerIntakeConfig)
    // — este filtro es puramente de presentación: qué checkboxes se OFRECEN en
    // esta pantalla según el scope marcado en el form de invitar de ARRIBA, no
    // cambia qué se guarda (sigue siendo la misma config de 9 campos).
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "trainingIntakeFields", ['goals', 'healthConditions', 'experienceLevel', 'availability', 'equipment']);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "nutritionIntakeFields", ['allergies', 'favoriteFoods', 'dislikedFoods', 'cooksAtHome']);
    // Estado del email frente a ESTE trainer, comprobado al perder el foco
    // del campo — evita que el trainer marque un ámbito que el backend va a
    // rechazar igual al enviar (índice único trainerId+clientEmail+scope).
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "emailScopeStatus", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "checkingEmail", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "lastCheckedEmail", null);
    this.trainerInvitesApi = trainerInvitesApi;
    this.ionicUtilService = ionicUtilService;
    this.router = router;
  }
  ngOnInit() {
    this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroup({
      clientEmail: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl(null, [_angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.Validators.email]),
      training: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl(false),
      nutrition: new _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControl(false)
    });
    // Cambiar el email invalida la comprobación anterior — nunca se deja un
    // "ya lo llevas" de un email distinto pegado en pantalla.
    this.form.get('clientEmail')?.valueChanges.subscribe(() => {
      this.emailScopeStatus = null;
      this.lastCheckedEmail = null;
    });
    this.loadInvites();
    // Carga ya, no solo al marcar un ámbito — hace falta lastScopes para
    // saber si hay que pre-marcar Entrenamiento/Nutrición nada más entrar.
    this.loadIntakeConfig();
  }
  toggleScope(controlName) {
    if (this.isScopeBlocked(controlName)) return;
    const control = this.form.get(controlName);
    const nextValue = !control?.value;
    control?.setValue(nextValue);
    this.syncIntakeFieldsForScope(controlName, nextValue);
  }
  // En lugar de ocultar los checkboxes que no encajan con el ámbito
  // marcado, se dejan siempre los 9 visibles y se seleccionan/deseleccionan
  // solos los que pertenecen a ese ámbito al marcar/desmarcar Entrenamiento
  // o Nutrición — el trainer sigue pudiendo ajustar cualquiera a mano
  // después.
  syncIntakeFieldsForScope(scope, enabled) {
    const fields = scope === 'training' ? this.trainingIntakeFields : this.nutritionIntakeFields;
    fields.forEach(field => {
      if (enabled) this.selectedIntakeFields.add(field);else this.selectedIntakeFields.delete(field);
    });
  }
  isScopeBlocked(scope) {
    return !!this.emailScopeStatus?.[scope]?.blocked;
  }
  emailScopeStatusMessage(scope) {
    const state = this.emailScopeStatus?.[scope];
    if (!state?.blocked) return null;
    switch (state.status) {
      case 'active':
        return 'Ya es tu cliente en este ámbito';
      case 'pending':
        return 'Ya tiene una invitación pendiente de respuesta';
      case 'cuestionario_pendiente':
        return 'Ya aceptó, esperando que complete el cuestionario';
      case 'en_revision':
        return 'Cuestionario recibido, pendiente de tu confirmación';
      default:
        return 'Ya existe una relación en curso con este ámbito';
    }
  }
  onEmailBlur() {
    const control = this.form.get('clientEmail');
    const email = (control?.value || '').trim().toLowerCase();
    if (!email || control?.invalid || email === this.lastCheckedEmail) {
      return;
    }
    this.checkingEmail = true;
    this.trainerInvitesApi.checkClientEmailStatus(email).subscribe({
      next: status => {
        this.checkingEmail = false;
        this.lastCheckedEmail = email;
        this.emailScopeStatus = status;
        // Un ámbito que ya estaba marcado pero ahora resulta bloqueado no
        // se manda igual — se desmarca solo, junto con el aviso.
        ['training', 'nutrition'].forEach(scope => {
          if (status[scope].blocked && this.form.get(scope)?.value) {
            this.form.get(scope)?.setValue(false);
            this.syncIntakeFieldsForScope(scope, false);
          }
        });
      },
      // Fallo silencioso — no bloquea al trainer, el backend igual protege
      // al enviar (mismo índice único), esto es solo el aviso anticipado.
      error: () => {
        this.checkingEmail = false;
      }
    });
  }
  get hasScopeSelected() {
    return !!(this.form?.value.training || this.form?.value.nutrition);
  }
  loadInvites() {
    this.listState = 'loading';
    this.trainerInvitesApi.getMyInvites().subscribe({
      next: invites => {
        const sorted = [...(invites || [])].sort((a, b) => new Date(b.invitedAt).getTime() - new Date(a.invitedAt).getTime());
        this.pendingInvites = sorted.filter(invite => invite.status === 'pending' || invite.status === 'cuestionario_pendiente');
        // en_revision ya no se lista aquí — el cliente ya aceptó y mandó el
        // cuestionario, así que se revisa/confirma en "Clientes"
        // (clients.page.ts), no en esta pantalla de invitaciones.
        this.historyInvites = sorted.filter(invite => !['pending', 'cuestionario_pendiente', 'en_revision'].includes(invite.status));
        this.groupedPendingInvites = this.groupByClient(this.pendingInvites);
        this.groupedHistoryInvites = this.groupByClientWithStatus(this.historyInvites);
        this.listState = 'loaded';
      },
      error: () => {
        this.listState = 'error';
      }
    });
  }
  submit() {
    if (this.form.invalid || !this.hasScopeSelected || this.isSending) {
      this.form.markAllAsTouched();
      return;
    }
    // El cuestionario (checkboxes + preguntas custom) ya no se guarda en
    // cada click — se manda junto con la invitación, solo si el trainer
    // llegó a abrir el panel (si no, no hay nada que guardar).
    if (this.intakeConfigRequested) {
      this.saveIntakeConfig();
    }
    const scopes = [...(this.form.value.training ? ['training'] : []), ...(this.form.value.nutrition ? ['nutrition'] : [])];
    this.isSending = true;
    this.trainerInvitesApi.sendInvite(this.form.value.clientEmail.trim().toLowerCase(), scopes).subscribe({
      next: response => {
        this.isSending = false;
        this.handleSendResults(response.results);
      },
      error: err => {
        this.isSending = false;
        // MVP-trainers F21 — límite de clientes del plan alcanzado: llevar
        // al paywall (F02) en vez de un error genérico sin acción posible.
        if (err?.error?.code === 'TRAINER_LIMIT_REACHED') {
          this.ionicUtilService.showErrorToast(err.error.message, 'Límite de tu plan alcanzado', 3500);
          void this.router.navigate(['/tabs/subscription']);
          return;
        }
        this.ionicUtilService.showErrorToast(err?.error?.message || 'No se pudo enviar la invitación', 'Error', 3000);
      }
    });
  }
  handleSendResults(results) {
    const succeeded = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);
    if (succeeded.length) {
      const labels = succeeded.map(r => this.scopeLabel(r.scope)).join(' y ');
      this.ionicUtilService.showToast({
        message: `Invitación de ${labels} enviada correctamente`,
        duration: 3500
      });
      this.form.reset({
        clientEmail: null,
        training: false,
        nutrition: false
      });
      this.loadInvites();
    }
    failed.forEach(r => {
      this.ionicUtilService.showErrorToast(`${this.scopeLabel(r.scope)}: ${r.error}`, 'No se pudo invitar', 4000);
    });
  }
  confirmCancel(invite) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const alert = yield _this.ionicUtilService.showAlert({
        header: 'Cancelar invitación',
        message: `¿Seguro que quieres cancelar la invitación de ${_this.scopeLabel(invite.scope)} a ${invite.clientEmail}?`,
        buttons: [{
          text: 'Volver',
          role: 'cancel'
        }, {
          text: 'Cancelar invitación',
          cssClass: 'alert-button-danger',
          handler: () => _this.cancelInvite(invite)
        }]
      });
      void alert;
    })();
  }
  cancelInvite(invite) {
    this.cancellingId = invite._id;
    this.trainerInvitesApi.cancelInvite(invite._id).subscribe({
      next: () => {
        this.cancellingId = null;
        this.ionicUtilService.showToast({
          message: 'Invitación cancelada',
          duration: 2500
        });
        this.loadInvites();
      },
      error: () => {
        this.cancellingId = null;
        this.ionicUtilService.showErrorToast('No se pudo cancelar la invitación', 'Error', 3000);
      }
    });
  }
  scopeLabel(scope) {
    return scope === 'training' ? 'Entrenamiento' : 'Nutrición';
  }
  statusLabel(status) {
    switch (status) {
      case 'pending':
        return 'Invitación enviada';
      case 'cuestionario_pendiente':
        return 'Esperando cuestionario';
      case 'en_revision':
        return 'Cuestionario recibido';
      case 'active':
        return 'Aceptada';
      case 'declined':
        return 'Rechazada';
      case 'revoked':
        return 'Finalizada';
      default:
        return status;
    }
  }
  // --- TASK-049: personalizar cuestionario inicial ---
  // Sin config guardada todavía, el backend devuelve el catálogo COMPLETO
  // (9 campos) como valor por defecto — si se cargara tal cual, la primera
  // vez que un trainer marca un solo ámbito verían los 9 campos marcados en
  // vez de solo los 5/4 que tienen sentido para ese ámbito. Se filtra lo
  // cargado por el/los ámbito(s) ya marcados en el form de arriba: si el
  // trainer sí había guardado antes una selección propia dentro de esa
  // categoría (p. ej. sin "Equipamiento"), ese subconjunto se respeta igual
  // porque el filtro solo QUITA lo que sobra, nunca añade nada nuevo.
  filterFieldsForActiveScopes(fields) {
    const wantsTraining = !!this.form?.value.training;
    const wantsNutrition = !!this.form?.value.nutrition;
    const result = new Set();
    fields.forEach(field => {
      const inTraining = this.trainingIntakeFields.includes(field);
      const inNutrition = this.nutritionIntakeFields.includes(field);
      if (wantsTraining && inTraining || wantsNutrition && inNutrition) {
        result.add(field);
      }
    });
    return result;
  }
  loadIntakeConfig() {
    this.intakeConfigRequested = true;
    this.intakeConfigState = 'loading';
    this.trainerInvitesApi.getIntakeConfig().subscribe({
      next: config => {
        // Se recuerdan los últimos checkboxes de ámbito marcados — antes de
        // filtrar los campos por ámbito activo, si no se filtrarían contra
        // el form todavía vacío (Entrenamiento/Nutrición sin marcar).
        this.form.patchValue({
          training: (config.lastScopes || []).includes('training'),
          nutrition: (config.lastScopes || []).includes('nutrition')
        }, {
          emitEvent: false
        });
        this.selectedIntakeFields = this.filterFieldsForActiveScopes(new Set(config.enabledFields));
        // Al entrar normal a la pantalla, las preguntas custom ya guardadas
        // aparecen SIN marcar — el trainer las vuelve a marcar a mano si
        // quiere incluirlas en esta tanda. Solo aparecen marcadas de
        // entrada las que se acaban de crear en esta misma sesión (ver
        // addCustomQuestion, que se añade después de esta carga y por tanto
        // no pasa por aquí).
        this.customQuestions = (config.customQuestions || []).map(q => ({
          ...q,
          enabled: false
        }));
        this.intakeConfigState = 'loaded';
      },
      error: () => {
        this.intakeConfigState = 'error';
      }
    });
  }
  toggleIntakeField(field) {
    if (this.selectedIntakeFields.has(field)) {
      this.selectedIntakeFields.delete(field);
    } else {
      this.selectedIntakeFields.add(field);
    }
  }
  get canAddCustomQuestion() {
    return this.newQuestionLabel.trim().length > 0;
  }
  addCustomQuestion() {
    if (!this.canAddCustomQuestion) return;
    this.customQuestions = [...this.customQuestions, {
      id: `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      label: this.newQuestionLabel.trim(),
      enabled: true
    }];
    this.newQuestionLabel = '';
  }
  removeCustomQuestion(id) {
    this.customQuestions = this.customQuestions.filter(q => q.id !== id);
  }
  toggleCustomQuestionEnabled(id) {
    this.customQuestions = this.customQuestions.map(q => q.id === id ? {
      ...q,
      enabled: !q.enabled
    } : q);
  }
  trackByQuestionId(_index, question) {
    return question.id;
  }
  // Ya no se guarda en cada click de checkbox — se manda una sola vez junto
  // con el envío de la invitación (ver submit()), así que aquí solo hace
  // falta la guarda normal contra doble-disparo.
  saveIntakeConfig() {
    if (this.savingIntakeConfig) return;
    this.savingIntakeConfig = true;
    const lastScopes = [...(this.form.value.training ? ['training'] : []), ...(this.form.value.nutrition ? ['nutrition'] : [])];
    this.trainerInvitesApi.updateIntakeConfig([...this.selectedIntakeFields], this.customQuestions, lastScopes).subscribe({
      next: config => {
        this.savingIntakeConfig = false;
        this.selectedIntakeFields = new Set(config.enabledFields);
        this.customQuestions = config.customQuestions || [];
      },
      error: err => {
        this.savingIntakeConfig = false;
        this.ionicUtilService.showErrorToast(err?.error?.message || 'No se pudo guardar la configuración', 'Error', 3000);
      }
    });
  }
}
_InvitesPage = InvitesPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(InvitesPage, "\u0275fac", function InvitesPage_Factory(t) {
  return new (t || _InvitesPage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_trainer_invites_api_service__WEBPACK_IMPORTED_MODULE_2__.TrainerInvitesApiService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_3__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(InvitesPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _InvitesPage,
  selectors: [["app-invites"]],
  decls: 50,
  vars: 22,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["aria-label", "Abrir men\u00FA de navegaci\u00F3n", 1, "tf-page-header__back-button"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "invites-content"], [1, "invite-form", 3, "formGroup", "ngSubmit"], [1, "form-title"], [1, "form-subtitle"], [1, "scope-options"], [1, "scope-option-wrapper"], ["type", "button", 1, "scope-option", 3, "disabled", "click"], ["name", "barbell-outline"], [1, "scope-check", 3, "name"], [4, "ngIf", "ngIfElse"], ["trainingScopeError", ""], ["name", "nutrition-outline"], ["nutritionScopeError", ""], ["class", "intake-config-panel", 4, "ngIf"], [1, "input-group"], [1, "input-wrapper"], ["name", "mail-outline", 1, "input-icon"], ["type", "email", "formControlName", "clientEmail", "placeholder", "Email del cliente", 1, "input-field", 3, "blur"], ["name", "dots", "class", "email-check-spinner", 4, "ngIf"], ["class", "validation-error", 4, "ngIf"], ["type", "submit", 1, "submit-button", 3, "disabled"], [4, "ngIf"], ["name", "dots", 4, "ngIf"], [1, "invites-list-section"], [1, "section-heading"], ["class", "history-list", 4, "ngIf"], ["class", "section-error", 4, "ngIf"], [1, "scope-blocked-hint"], ["name", "information-circle-outline"], ["class", "scope-blocked-hint scope-blocked-hint--error", 4, "ngIf"], [1, "scope-blocked-hint", "scope-blocked-hint--error"], ["name", "alert-circle-outline"], [1, "intake-config-panel"], ["class", "detail-skeleton", 4, "ngIf"], [1, "detail-skeleton"], [1, "skeleton-block", 2, "height", "32px"], [1, "section-error"], [1, "retry-button", 3, "click"], [1, "intake-config-hint-row"], [1, "intake-config-hint"], ["class", "intake-config-save-status", 4, "ngIf"], [1, "field-toggle-grid"], ["type", "button", "class", "field-toggle-row", 3, "click", 4, "ngFor", "ngForOf"], [1, "intake-config-subheading"], ["class", "custom-question-list", 4, "ngIf"], [1, "add-question-row"], ["name", "help-circle-outline", 1, "input-icon"], ["type", "text", "placeholder", "Ej. \u00BFAlguna cirug\u00EDa reciente?", 1, "input-field", 3, "ngModel", "ngModelOptions", "ngModelChange", "keyup.enter"], ["type", "button", "aria-label", "A\u00F1adir pregunta", 1, "add-question-submit", 3, "disabled", "click"], ["name", "return-down-back-outline"], [1, "intake-config-save-status"], ["name", "dots"], ["type", "button", 1, "field-toggle-row", 3, "click"], [3, "name"], [1, "custom-question-list"], ["class", "custom-question-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "custom-question-row"], ["type", "button", 1, "custom-question-toggle", 3, "click"], [1, "custom-question-label"], ["type", "button", "aria-label", "Borrar pregunta", 1, "custom-question-remove", 3, "click"], ["name", "trash-outline"], ["name", "dots", 1, "email-check-spinner"], [1, "validation-error"], [1, "history-list"], ["class", "history-card skeleton", 4, "ngFor", "ngForOf"], [1, "history-card", "skeleton"], [1, "skeleton-line", "skeleton-line--email"], [1, "skeleton-line", "skeleton-line--chip"], ["class", "empty-hint", 4, "ngIf"], ["class", "history-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "empty-hint"], [1, "history-card"], [1, "history-card-header"], [1, "history-card-name"], [1, "history-card-email"], ["class", "history-card-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "history-card-row"], [1, "history-scopes"], [1, "history-scope-tag"], [1, "history-card-row-right"], [1, "status-label"], [1, "cancel-button", 3, "disabled", "title", "click"], ["name", "close-outline", 4, "ngIf"], ["name", "close-outline"], [1, "section-heading", "section-heading--secondary"], ["class", "history-scope-tag", 4, "ngFor", "ngForOf"]],
  template: function InvitesPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "ion-menu-button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 5)(6, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Invitar");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "ion-content", 8)(10, "form", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngSubmit", function InvitesPage_Template_form_ngSubmit_10_listener() {
        return ctx.submit();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "h2", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "Invita a un cliente");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "p", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, " Introduce su email y elige qu\u00E9 vas a llevarle. Puedes marcar los dos \u00E1mbitos a la vez. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "div", 12)(16, "div", 13)(17, "button", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function InvitesPage_Template_button_click_17_listener() {
        return ctx.toggleScope("training");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](18, "ion-icon", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, "Entrenamiento");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](21, "ion-icon", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](22, InvitesPage_ng_container_22_Template, 4, 1, "ng-container", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](23, InvitesPage_ng_template_23_Template, 1, 1, "ng-template", null, 18, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "div", 13)(26, "button", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function InvitesPage_Template_button_click_26_listener() {
        return ctx.toggleScope("nutrition");
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](27, "ion-icon", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](28, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](29, "Nutrici\u00F3n");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](30, "ion-icon", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](31, InvitesPage_ng_container_31_Template, 4, 1, "ng-container", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](32, InvitesPage_ng_template_32_Template, 1, 1, "ng-template", null, 20, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](34, InvitesPage_div_34_Template, 4, 3, "div", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "div", 22)(36, "div", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](37, "ion-icon", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](38, "input", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("blur", function InvitesPage_Template_input_blur_38_listener() {
        return ctx.onEmailBlur();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](39, InvitesPage_ion_spinner_39_Template, 1, 0, "ion-spinner", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](40, InvitesPage_div_40_Template, 3, 2, "div", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](41, "button", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](42, InvitesPage_span_42_Template, 2, 0, "span", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](43, InvitesPage_ion_spinner_43_Template, 1, 0, "ion-spinner", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](44, "div", 31)(45, "h2", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](46, "Invitaciones pendientes");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](47, InvitesPage_div_47_Template, 2, 2, "div", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](48, InvitesPage_div_48_Template, 5, 0, "div", 34);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](49, InvitesPage_ng_container_49_Template, 5, 4, "ng-container", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](24);
      const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](33);
      let tmp_13_0;
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](10);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("formGroup", ctx.form);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("selected", ctx.form.value.training);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx.isScopeBlocked("training"));
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("name", ctx.form.value.training ? "checkmark-circle" : "ellipse-outline");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.emailScopeStatusMessage("training"))("ngIfElse", _r1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("selected", ctx.form.value.nutrition);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx.isScopeBlocked("nutrition"));
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("name", ctx.form.value.nutrition ? "checkmark-circle" : "ellipse-outline");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.emailScopeStatusMessage("nutrition"))("ngIfElse", _r4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.hasScopeSelected);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.checkingEmail);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ((tmp_13_0 = ctx.form.get("clientEmail")) == null ? null : tmp_13_0.invalid) && ((tmp_13_0 = ctx.form.get("clientEmail")) == null ? null : tmp_13_0.touched));
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx.form.invalid || !ctx.hasScopeSelected || ctx.isSending || ctx.checkingEmail);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.isSending);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isSending);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.listState === "loading");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.listState === "error");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.listState === "loaded");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.NgModel, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormControlName, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonMenuButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonSpinner],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n.invites-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n}\n\n.invite-form[_ngcontent-%COMP%] {\n  padding: 4px 16px 8px;\n}\n\n.form-title[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  font-weight: 700;\n  letter-spacing: -0.02em;\n  color: var(--tf-text);\n  margin: 4px 0 4px;\n}\n\n.form-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  color: var(--tf-text-muted);\n  line-height: 1.45;\n  margin: 0 0 20px;\n  max-width: 42ch;\n}\n\n.input-group[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n  height: 52px;\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  flex-shrink: 0;\n  font-size: 20px;\n}\n\n.input-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n  font-size: 1rem;\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.validation-error[_ngcontent-%COMP%] {\n  color: var(--tf-danger);\n  font-size: 0.8rem;\n  margin-top: 6px;\n  padding-left: 2px;\n}\n\n.scope-options[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n  margin-bottom: 6px;\n}\n\n.scope-option-wrapper[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  align-items: flex-start;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n\n.scope-option[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 14px;\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-lg);\n  color: var(--tf-text-secondary);\n  font-family: inherit;\n  font-size: 0.88rem;\n  font-weight: 600;\n  cursor: pointer;\n  transition: border-color 160ms var(--tf-ease-out), background 160ms var(--tf-ease-out), transform 160ms var(--tf-ease-out);\n}\n.scope-option[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]:first-child {\n  font-size: 18px;\n  color: var(--tf-text-muted);\n  flex-shrink: 0;\n}\n.scope-option[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  flex: 1;\n  text-align: left;\n}\n.scope-option[_ngcontent-%COMP%]   .scope-check[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--tf-text-faint);\n  flex-shrink: 0;\n}\n.scope-option[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n.scope-option.selected[_ngcontent-%COMP%] {\n  border-color: var(--tf-accent);\n  background: rgba(254, 144, 0, 0.08);\n  color: var(--tf-text);\n}\n.scope-option.selected[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]:first-child {\n  color: var(--tf-accent);\n}\n.scope-option.selected[_ngcontent-%COMP%]   .scope-check[_ngcontent-%COMP%] {\n  color: var(--tf-accent);\n}\n.scope-option[_ngcontent-%COMP%]:disabled {\n  opacity: 0.55;\n  cursor: default;\n}\n.scope-option[_ngcontent-%COMP%]:disabled:active {\n  transform: none;\n}\n\n.scope-blocked-hint[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 5px;\n  width: -moz-fit-content;\n  width: fit-content;\n  margin: 0;\n  padding: 0 2px;\n  font-size: 0.74rem;\n  line-height: 1.3;\n  color: var(--tf-text-muted);\n}\n.scope-blocked-hint[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 13px;\n  flex-shrink: 0;\n  margin-top: 1px;\n  color: var(--tf-text-faint);\n}\n\n.scope-blocked-hint--error[_ngcontent-%COMP%] {\n  color: var(--tf-danger);\n}\n.scope-blocked-hint--error[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  color: var(--tf-danger);\n}\n\n.email-check-spinner[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 16px;\n  height: 16px;\n  color: var(--tf-text-muted);\n}\n\n.intake-config-panel[_ngcontent-%COMP%] {\n  padding: 12px 14px;\n  margin: 4px 0 20px;\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n}\n\n.intake-config-hint-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 10px;\n  margin: 0 0 12px;\n}\n\n.intake-config-hint[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  color: var(--tf-text-muted);\n  line-height: 1.4;\n  margin: 0;\n}\n\n.intake-config-save-status[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.72rem;\n  color: var(--tf-text-faint);\n  white-space: nowrap;\n}\n.intake-config-save-status[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%] {\n  width: 12px;\n  height: 12px;\n}\n\n.field-toggle-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n  margin-bottom: 4px;\n}\n@media (max-width: 560px) {\n  .field-toggle-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 360px) {\n  .field-toggle-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n\n.field-toggle-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px;\n  width: 100%;\n  min-height: var(--tf-touch-min);\n  padding: 10px 12px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-subtle);\n  border-radius: var(--tf-radius-md);\n  color: var(--tf-text-secondary);\n  font-size: 0.86rem;\n  font-family: inherit;\n  text-align: left;\n  cursor: pointer;\n  transition: border-color 160ms var(--tf-ease-out), color 160ms var(--tf-ease-out);\n}\n.field-toggle-row[_ngcontent-%COMP%]:active {\n  transform: scale(0.99);\n}\n.field-toggle-row[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.field-toggle-row[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  color: var(--tf-text-faint);\n  flex-shrink: 0;\n}\n\n.field-toggle-icon--active[_ngcontent-%COMP%] {\n  color: var(--tf-accent) !important;\n}\n\n.intake-config-subheading[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  color: var(--tf-text-muted);\n  margin: 16px 0 8px;\n}\n\n.custom-question-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 10px;\n}\n\n.custom-question-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 4px 6px 4px 12px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-subtle);\n  border-radius: var(--tf-radius-md);\n}\n\n.custom-question-toggle[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 0;\n  background: transparent;\n  border: none;\n  color: var(--tf-text-secondary);\n  font-family: inherit;\n  text-align: left;\n  cursor: pointer;\n}\n.custom-question-toggle[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 20px;\n  color: var(--tf-text-faint);\n}\n\n.custom-question-label[_ngcontent-%COMP%] {\n  min-width: 0;\n  font-size: 0.86rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.custom-question-remove[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: transparent;\n  border: none;\n  border-radius: var(--tf-radius-sm);\n  color: var(--tf-text-faint);\n  cursor: pointer;\n  transition: background 160ms var(--tf-ease-out), color 160ms var(--tf-ease-out);\n}\n.custom-question-remove[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.custom-question-remove[_ngcontent-%COMP%]:active {\n  background: var(--tf-danger-soft);\n  color: var(--tf-danger);\n}\n\n.add-question-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding-top: 10px;\n  border-top: 1px solid var(--tf-border-subtle);\n  margin-top: 4px;\n}\n\n.add-question-row[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 44px;\n  padding-right: 6px;\n}\n\n.add-question-submit[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 32px;\n  height: 32px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: var(--tf-surface-4);\n  border: none;\n  border-radius: var(--tf-radius-sm);\n  color: var(--tf-text-secondary);\n  cursor: pointer;\n  transition: opacity 160ms var(--tf-ease-out), color 160ms var(--tf-ease-out);\n}\n.add-question-submit[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 17px;\n}\n.add-question-submit[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n.add-question-submit[_ngcontent-%COMP%]:not(:disabled):active {\n  color: var(--tf-accent);\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  width: 100%;\n  height: 52px;\n  margin-top: 20px;\n  font-size: 1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.submit-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n\n.invites-list-section[_ngcontent-%COMP%] {\n  padding: 28px 16px 32px;\n}\n\n.section-heading[_ngcontent-%COMP%] {\n  font-size: 0.78rem;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.04em;\n  color: var(--tf-text-muted);\n  margin: 0 0 10px;\n}\n.section-heading--secondary[_ngcontent-%COMP%] {\n  margin-top: 24px;\n}\n\n.empty-hint[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  color: var(--tf-text-muted);\n  margin: 0 0 4px;\n}\n\n.section-error[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 10px;\n}\n.section-error[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  color: var(--tf-text-muted);\n  margin: 0;\n}\n\n.retry-button[_ngcontent-%COMP%] {\n  height: 38px;\n  padding: 0 16px;\n  background: var(--tf-surface-5);\n  color: var(--tf-text);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-sm);\n  font-size: 0.85rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n\n@keyframes _ngcontent-%COMP%_row-in {\n  from {\n    opacity: 0;\n    transform: translateY(4px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.history-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.history-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  padding: 14px 16px;\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: 14px;\n  animation: _ngcontent-%COMP%_row-in 280ms var(--tf-ease-out) backwards;\n}\n.history-card[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 0ms;\n}\n.history-card[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 30ms;\n}\n.history-card[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 60ms;\n}\n.history-card[_ngcontent-%COMP%]:nth-child(4) {\n  animation-delay: 90ms;\n}\n.history-card[_ngcontent-%COMP%]:nth-child(5) {\n  animation-delay: 120ms;\n}\n.history-card[_ngcontent-%COMP%]:nth-child(6) {\n  animation-delay: 150ms;\n}\n.history-card[_ngcontent-%COMP%]:nth-child(7) {\n  animation-delay: 180ms;\n}\n.history-card[_ngcontent-%COMP%]:nth-child(8) {\n  animation-delay: 210ms;\n}\n.history-card[_ngcontent-%COMP%]:nth-child(9) {\n  animation-delay: 240ms;\n}\n.history-card[_ngcontent-%COMP%]:nth-child(10) {\n  animation-delay: 270ms;\n}\n.history-card[_ngcontent-%COMP%]:nth-child(11) {\n  animation-delay: 300ms;\n}\n.history-card[_ngcontent-%COMP%]:nth-child(12) {\n  animation-delay: 330ms;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .history-card[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n.history-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 12px;\n}\n\n.history-card-name[_ngcontent-%COMP%] {\n  min-width: 0;\n  font-size: 0.94rem;\n  font-weight: 700;\n  letter-spacing: -0.01em;\n  color: var(--tf-text);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.history-card-email[_ngcontent-%COMP%] {\n  flex-shrink: 1;\n  min-width: 0;\n  font-size: 0.78rem;\n  color: var(--tf-text-muted);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.history-card-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  justify-content: space-between;\n  gap: 8px 10px;\n  padding-top: 12px;\n  border-top: 1px solid var(--tf-border);\n}\n\n.history-scopes[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  min-width: 0;\n}\n\n.history-scope-tag[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 0.76rem;\n  font-weight: 600;\n  color: var(--tf-text-secondary);\n  background: var(--tf-surface-3);\n  border: 1px solid var(--tf-border);\n  border-radius: 999px;\n  padding: 4px 10px 4px 8px;\n}\n.history-scope-tag[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--tf-accent);\n}\n\n.cancel-button[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 34px;\n  height: 34px;\n  border-radius: 50%;\n  border: 1px solid var(--tf-border-strong);\n  background: var(--tf-surface-2);\n  color: var(--tf-text-secondary);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), border-color 160ms var(--tf-ease-out), color 160ms var(--tf-ease-out);\n}\n.cancel-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n}\n.cancel-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.92);\n}\n.cancel-button[_ngcontent-%COMP%]:hover {\n  border-color: var(--tf-danger);\n  color: var(--tf-danger);\n}\n.cancel-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: default;\n}\n\n.history-card-row-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  flex-shrink: 0;\n}\n\n.status-label[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 0.72rem;\n  font-weight: 700;\n  padding: 4px 10px;\n  border-radius: 999px;\n  color: var(--tf-text-muted);\n  background: var(--tf-surface-4);\n  border: 1px solid var(--tf-border);\n}\n.status-label[data-status=active][_ngcontent-%COMP%] {\n  color: var(--tf-success);\n  background: var(--tf-success-soft);\n  border-color: var(--tf-success-border);\n}\n.status-label[data-status=declined][_ngcontent-%COMP%] {\n  color: var(--tf-danger);\n  background: var(--tf-danger-soft);\n  border-color: var(--tf-danger-border);\n}\n.status-label[data-status=revoked][_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  background: var(--tf-surface-4);\n  border-color: var(--tf-border);\n}\n\n@media (max-width: 420px) {\n  .history-card[_ngcontent-%COMP%] {\n    padding: 12px 14px;\n  }\n  .history-card-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 2px;\n  }\n  .history-card-email[_ngcontent-%COMP%] {\n    font-size: 0.74rem;\n  }\n  .history-card-row[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  .history-scope-tag[_ngcontent-%COMP%] {\n    font-size: 0.72rem;\n    padding: 3px 8px 3px 7px;\n  }\n  .status-label[_ngcontent-%COMP%] {\n    font-size: 0.68rem;\n    padding: 3px 8px;\n  }\n  .history-card-row-right[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n  .cancel-button[_ngcontent-%COMP%] {\n    width: 30px;\n    height: 30px;\n  }\n  .cancel-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n}\n.history-card.skeleton[_ngcontent-%COMP%] {\n  pointer-events: none;\n  animation: none;\n}\n\n.skeleton-line[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n  border-radius: 4px;\n  height: 12px;\n}\n.skeleton-line[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-line[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n.skeleton-line--email[_ngcontent-%COMP%] {\n  width: 45%;\n  height: 14px;\n}\n.skeleton-line--chip[_ngcontent-%COMP%] {\n  width: 25%;\n}\n\n.detail-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.skeleton-block[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n  border-radius: 10px;\n}\n.skeleton-block[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvaW52aXRlcy9pbnZpdGVzLnBhZ2Uuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9faW5wdXRzLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX2J1dHRvbnMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF5QkE7RUFDRTtJQUNFLDJCQUFBO0VDeEJGO0FBQ0Y7QUFBQTtFQUNFLDBCQUFBO0FBRUY7O0FBQ0E7RUFDRSxxQkFBQTtBQUVGOztBQUNBO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EscUJBQUE7RUFDQSxpQkFBQTtBQUVGOztBQUNBO0VBQ0Usa0JBQUE7RUFDQSwyQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBRUY7O0FBQ0E7RUFDRSxtQkFBQTtBQUVGOztBQUNBO0VDMUJFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSwrQkFKMkI7RUFLM0IseUNBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpREFBQTtFRHFCQSxZQUFBO0FBU0Y7QUM1QkU7RUFDRSw4QkFBQTtBRDhCSjs7QUFUQTtFQ2hCRSwyQkFBQTtFQUNBLGNBQUE7RURpQkEsZUFBQTtBQWFGOztBQVZBO0VDaEJFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0Esb0JBQUE7RUFDQSxZQUFBO0VEV0EsZUFBQTtBQW9CRjtBQzdCRTtFQUNFLDJCQUFBO0FEK0JKOztBQXBCQTtFQUNFLHVCQUFBO0VBQ0EsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsaUJBQUE7QUF1QkY7O0FBcEJBO0VBQ0UsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0FBdUJGOztBQXBCQTtFQUNFLE9BQUE7RUFDQSxZQUFBO0VBSUEsdUJB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OHNCSjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU2tlbGV0b24gZGUgY2FyZ2EgY29uIGJhcnJpZG8gZGUgc2hpbW1lciDDosKAwpQgbWlzbW8gYmxvcXVlIHJlcGV0aWRvIGxpdGVyYWxtZW50ZVxuLy8gZW4gfjEwIHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS5cbi8vIENhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW8gc2VsZWN0b3IgeSBhw4PCsWFkZSBlbmNpbWEgc29sbyBsb1xuLy8gcXVlIHZhcsODwq1hIChib3JkZXItcmFkaXVzLCBoZWlnaHQsIHdpZHRoLCB2YXJpYW50ZXMgY29uIG5vbWJyZSkuXG5AbWl4aW4gdGYtc2tlbGV0b24tc2hpbW1lciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcblxuICAmOjphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGluc2V0OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCB0cmFuc3BhcmVudCwgdmFyKC0tdGYtc2hpbW1lciksIHRyYW5zcGFyZW50KTtcbiAgICBhbmltYXRpb246IHRmLXNoaW1tZXIgMS40cyBpbmZpbml0ZTtcbiAgfVxuXG4gIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgJjo6YWZ0ZXIge1xuICAgICAgYW5pbWF0aW9uOiBub25lO1xuICAgIH1cbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHRmLXNoaW1tZXIge1xuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XG4gIH1cbn1cbiIsIkBpbXBvcnQgJy4uLy4uLy4uL3RoZW1lL3NrZWxldG9uJztcbkBpbXBvcnQgJy4uLy4uLy4uL3RoZW1lL2J1dHRvbnMnO1xuQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvaW5wdXRzJztcblxuLmludml0ZXMtY29udGVudCB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtYmcpO1xufVxuXG4uaW52aXRlLWZvcm0ge1xuICBwYWRkaW5nOiA0cHggMTZweCA4cHg7XG59XG5cbi5mb3JtLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxldHRlci1zcGFjaW5nOiAtMC4wMmVtO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIG1hcmdpbjogNHB4IDAgNHB4O1xufVxuXG4uZm9ybS1zdWJ0aXRsZSB7XG4gIGZvbnQtc2l6ZTogMC44OHJlbTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBsaW5lLWhlaWdodDogMS40NTtcbiAgbWFyZ2luOiAwIDAgMjBweDtcbiAgbWF4LXdpZHRoOiA0MmNoO1xufVxuXG4uaW5wdXQtZ3JvdXAge1xuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xufVxuXG4uaW5wdXQtd3JhcHBlciB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LXdyYXBwZXI7XG4gIGhlaWdodDogNTJweDtcbn1cblxuLmlucHV0LWljb24ge1xuICBAaW5jbHVkZSB0Zi1pbnB1dC1pY29uO1xuICBmb250LXNpemU6IDIwcHg7XG59XG5cbi5pbnB1dC1maWVsZCB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LWZpZWxkO1xuICBmb250LXNpemU6IDFyZW07XG59XG5cbi52YWxpZGF0aW9uLWVycm9yIHtcbiAgY29sb3I6IHZhcigtLXRmLWRhbmdlcik7XG4gIGZvbnQtc2l6ZTogMC44cmVtO1xuICBtYXJnaW4tdG9wOiA2cHg7XG4gIHBhZGRpbmctbGVmdDogMnB4O1xufVxuXG4uc2NvcGUtb3B0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBnYXA6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDZweDtcbn1cblxuLnNjb3BlLW9wdGlvbi13cmFwcGVyIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xuICAvLyBmbGV4LXN0YXJ0IChubyBlbCBzdHJldGNoIHBvciBkZWZlY3RvKSDDosKAwpQgZWwgYm90w4PCs24geWEgZnVlcnphIHN1IHByb3Bpb1xuICAvLyAxMDAlIGRlIGFuY2hvLCBwZXJvIGVsIGF2aXNvIGRlIGFiYWpvIG5vIGRlYmUgZXN0aXJhcnNlIGNvbiDDg8KpbDogZGViZVxuICAvLyBxdWVkYXJzZSBwZWdhZG8gYSBzdSB0ZXh0bywgbm8gb2N1cGFyIGxhIGNvbHVtbmEgZW50ZXJhLlxuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA2cHg7XG59XG5cbi5zY29wZS1vcHRpb24ge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIHBhZGRpbmc6IDE0cHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbGcpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiAwLjg4cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCksIGJhY2tncm91bmQgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpLFxuICAgIHRyYW5zZm9ybSAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgaW9uLWljb246Zmlyc3QtY2hpbGQge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gIH1cblxuICBzcGFuIHtcbiAgICBmbGV4OiAxO1xuICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gIH1cblxuICAuc2NvcGUtY2hlY2sge1xuICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dC1mYWludCk7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gIH1cblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk4KTtcbiAgfVxuXG4gICYuc2VsZWN0ZWQge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NCwgMTQ0LCAwLCAwLjA4KTtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG5cbiAgICBpb24taWNvbjpmaXJzdC1jaGlsZCB7XG4gICAgICBjb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgICB9XG5cbiAgICAuc2NvcGUtY2hlY2sge1xuICAgICAgY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gICAgfVxuICB9XG5cbiAgLy8gWWEgbG8gbGxldmEgZW4gZXN0ZSDDg8KhbWJpdG8gKG8gaGF5IGFsZ28gZW4gY3Vyc28pIMOiwoDClCBlbCBlbWFpbCBsbyBkaWpvLFxuICAvLyBubyB0aWVuZSBzZW50aWRvIGRlamFyIG1hcmNhcmxvIHBhcmEgcXVlIGVsIGJhY2tlbmQgbG8gcmVjaGFjZSBpZ3VhbC5cbiAgJjpkaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogMC41NTtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG5cbiAgICAmOmFjdGl2ZSB7XG4gICAgICB0cmFuc2Zvcm06IG5vbmU7XG4gICAgfVxuICB9XG59XG5cbi8vIEF2aXNvIHB1bnR1YWwgYmFqbyBlbCBib3TDg8KzbiBibG9xdWVhZG8gw6LCgMKUIHBvciBxdcODwqkgbm8gc2UgcHVlZGUgbWFyY2FyIGVzdGVcbi8vIMODwqFtYml0byBhaG9yYSBtaXNtbywgbWlzbW8gY3JpdGVyaW8gZGUgY29sb3IgcXVlIC52YWxpZGF0aW9uLWVycm9yIHBlcm9cbi8vIGluZm9ybWF0aXZvIChubyB1biBmYWxsbyBkZSB2YWxpZGFjacODwrNuIGRlbCBwcm9waW8gY2FtcG8pLlxuLnNjb3BlLWJsb2NrZWQtaGludCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBnYXA6IDVweDtcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDAgMnB4O1xuICBmb250LXNpemU6IDAuNzRyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjM7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIG1hcmdpbi10b3A6IDFweDtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dC1mYWludCk7XG4gIH1cbn1cblxuLy8gXCJFbGlnZSB1biDDg8KhbWJpdG9cIiDDosKAwpQgbWlzbW8gaHVlY28vdGFtYcODwrFvIHF1ZSBlbCBhdmlzbyBkZSBhcnJpYmEgKG51bmNhIHNlXG4vLyBtdWVzdHJhbiBsb3MgZG9zIGEgbGEgdmV6LCB2ZXIgKm5nSWYvZWxzZSBlbiBlbCBIVE1MKSwgcGVybyBlbiByb2pvIGRlXG4vLyBlcnJvciBlbiB2ZXogZGUgZ3JpcyBpbmZvcm1hdGl2by5cbi5zY29wZS1ibG9ja2VkLWhpbnQtLWVycm9yIHtcbiAgY29sb3I6IHZhcigtLXRmLWRhbmdlcik7XG5cbiAgaW9uLWljb24ge1xuICAgIGNvbG9yOiB2YXIoLS10Zi1kYW5nZXIpO1xuICB9XG59XG5cbi5lbWFpbC1jaGVjay1zcGlubmVyIHtcbiAgZmxleC1zaHJpbms6IDA7XG4gIHdpZHRoOiAxNnB4O1xuICBoZWlnaHQ6IDE2cHg7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbn1cblxuLy8gLS0tIFRBU0stMDQ5OiBwZXJzb25hbGl6YXIgY3Vlc3Rpb25hcmlvIGluaWNpYWwgLS0tXG4vLyBZYSBubyBlcyB1biBhY2NvcmRpb24gbWFudWFsIMOiwoDClCBhcGFyZWNlIHNvbG8gKHNpbiBib3TDg8KzbiBxdWUgbG8gYWJyYS9jaWVycmUpXG4vLyBlbiBjdWFudG8gc2UgbWFyY2EgRW50cmVuYW1pZW50byB5L28gTnV0cmljacODwrNuIGFycmliYSwgdmVyIGhhc1Njb3BlU2VsZWN0ZWQuXG4uaW50YWtlLWNvbmZpZy1wYW5lbCB7XG4gIHBhZGRpbmc6IDEycHggMTRweDtcbiAgbWFyZ2luOiA0cHggMCAyMHB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTEpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbGcpO1xufVxuXG4uaW50YWtlLWNvbmZpZy1oaW50LXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTBweDtcbiAgbWFyZ2luOiAwIDAgMTJweDtcbn1cblxuLmludGFrZS1jb25maWctaGludCB7XG4gIGZvbnQtc2l6ZTogMC44cmVtO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGxpbmUtaGVpZ2h0OiAxLjQ7XG4gIG1hcmdpbjogMDtcbn1cblxuLy8gU2luIGJvdMODwrNuIFwiR3VhcmRhclwiIMOiwoDClCBjYWRhIGNhbWJpbyBzZSBndWFyZGEgc29sbyAodmVyIHNjaGVkdWxlQXV0b1NhdmUgZW5cbi8vIGludml0ZXMucGFnZS50cyk7IGVzdG8gZXMgZWwgw4PCum5pY28gaW5kaWNpbyB2aXN1YWwgZGUgcXVlIGhheSB1biBndWFyZGFkb1xuLy8gZW4gY3Vyc28sIG5vIHVuYSBhY2Npw4PCs24gcGFyYSBlbCB0cmFpbmVyLlxuLmludGFrZS1jb25maWctc2F2ZS1zdGF0dXMge1xuICBmbGV4LXNocmluazogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA0cHg7XG4gIGZvbnQtc2l6ZTogMC43MnJlbTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtZmFpbnQpO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuXG4gIGlvbi1zcGlubmVyIHtcbiAgICB3aWR0aDogMTJweDtcbiAgICBoZWlnaHQ6IDEycHg7XG4gIH1cbn1cblxuLy8gMyBjb2x1bW5hcyBmaWphcyDDosKAwpQgYW50ZXMgZXJhIHVuYSBsaXN0YSBhcGlsYWRhIGRlIDkgZmlsYXMgYSB0b2RvIGxvIGFuY2hvLFxuLy8gZGVqYW5kbyBtdWNow4PCrXNpbW8gZXNwYWNpbyB2YWPDg8KtbyBhIGxhIGRlcmVjaGEgZGUgY2FkYSBjaGVja2JveC4gRW4gbcODwrN2aWxcbi8vIGVzdHJlY2hvIHNlIHJlZHVjZSBhIDIgeSBsdWVnbyBhIDEgZW4gdmV6IGRlIGZvcnphciBjb2x1bW5hcyBpbGVnaWJsZXMuXG4uZmllbGQtdG9nZ2xlLWdyaWQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCAxZnIpO1xuICBnYXA6IDhweDtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xuXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA1NjBweCkge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XG4gIH1cblxuICBAbWVkaWEgKG1heC13aWR0aDogMzYwcHgpIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgfVxufVxuXG4vLyBNaXNtbyBwYXRyw4PCs24gcXVlIC5maWVsZC10b2dnbGUtcm93IGVuIGNoZWNraW4tdGVtcGxhdGVzLnBhZ2UuaHRtbCDDosKAwpQgbWlzbWFcbi8vIGZvcm1hIGRlIHByb2JsZW1hIChlbCB0cmFpbmVyIGFjdGl2YS9kZXNhY3RpdmEgY3XDg8KhbGVzIGRlIE4gY2FtcG9zIGZpam9zXG4vLyB1c2EpLCBtaXNtbyBjb21wb25lbnRlIHZpc3VhbCwgZW4gdmV6IGRlIHVuIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj4gbmF0aXZvXG4vLyBzaW4gZXN0aWxvIHF1ZSBoYWJyw4PCrWEgcm90byBsYSB2b2NhYnVsYXJpbyB2aXN1YWwgeWEgZXN0YWJsZWNpZG8gZW4gZXN0YVxuLy8gYXBwIHBhcmEgXCJhbHRlcm5hciB1biBjYW1wbyBkZSB1bmEgbGlzdGFcIiAodmVyIHRhbWJpw4PCqW4gLnNjb3BlLW9wdGlvbiBtw4PCoXNcbi8vIGFycmliYSBlbiBlc3RlIG1pc21vIGFyY2hpdm8sIG1pc21vIGxlbmd1YWplIGRlIGljb25vK2VzdGFkbykuXG4uZmllbGQtdG9nZ2xlLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiA4cHg7XG4gIHdpZHRoOiAxMDAlO1xuICBtaW4taGVpZ2h0OiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICBwYWRkaW5nOiAxMHB4IDEycHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMik7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdWJ0bGUpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbWQpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBmb250LXNpemU6IDAuODZyZW07XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCksIGNvbG9yIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk5KTtcbiAgfVxuXG4gIHNwYW4ge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgfVxuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtZmFpbnQpO1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICB9XG59XG5cbi5maWVsZC10b2dnbGUtaWNvbi0tYWN0aXZlIHtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudCkgIWltcG9ydGFudDtcbn1cblxuLmludGFrZS1jb25maWctc3ViaGVhZGluZyB7XG4gIGZvbnQtc2l6ZTogMC43OHJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDNlbTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBtYXJnaW46IDE2cHggMCA4cHg7XG59XG5cbi8vIC0tLSBQcmVndW50YXMgcGVyc29uYWxpemFkYXMgKGFkZW3Dg8KhcyBkZSBsb3MgOSBjYW1wb3MgcHJlZGVmaW5pZG9zKSAtLS1cbi5jdXN0b20tcXVlc3Rpb24tbGlzdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogNnB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xufVxuXG4uY3VzdG9tLXF1ZXN0aW9uLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNHB4O1xuICBwYWRkaW5nOiA0cHggNnB4IDRweCAxMnB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3VidGxlKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLW1kKTtcbn1cblxuLy8gTWlzbW8gY2hlY2tib3grbGFiZWwgcXVlIC5maWVsZC10b2dnbGUtcm93LCBwYXJhIHF1ZSBhY3RpdmFyL2Rlc2FjdGl2YXJcbi8vIHVuYSBwcmVndW50YSBjdXN0b20gc2Ugc2llbnRhIGlndWFsIHF1ZSB1biBjYW1wbyBwcmVkZWZpbmlkbyDDosKAwpQgcGVybyBzaW5cbi8vIHN1IHByb3BpbyBmb25kby9ib3JkZSAoeWEgbG9zIHBvbmUgLmN1c3RvbS1xdWVzdGlvbi1yb3csIHF1ZSB0YW1iacODwqluXG4vLyBhbG9qYSBlbCBib3TDg8KzbiBkZSBib3JyYXIgYWwgbGFkbykuXG4uY3VzdG9tLXF1ZXN0aW9uLXRvZ2dsZSB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIHBhZGRpbmc6IDZweCAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtZmFpbnQpO1xuICB9XG59XG5cbi5jdXN0b20tcXVlc3Rpb24tbGFiZWwge1xuICBtaW4td2lkdGg6IDA7XG4gIGZvbnQtc2l6ZTogMC44NnJlbTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi5jdXN0b20tcXVlc3Rpb24tcmVtb3ZlIHtcbiAgZmxleC1zaHJpbms6IDA7XG4gIHdpZHRoOiAzMnB4O1xuICBoZWlnaHQ6IDMycHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtc20pO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1mYWludCk7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCksIGNvbG9yIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxN3B4O1xuICB9XG5cbiAgJjphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLWRhbmdlci1zb2Z0KTtcbiAgICBjb2xvcjogdmFyKC0tdGYtZGFuZ2VyKTtcbiAgfVxufVxuXG4uYWRkLXF1ZXN0aW9uLXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBwYWRkaW5nLXRvcDogMTBweDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdWJ0bGUpO1xuICBtYXJnaW4tdG9wOiA0cHg7XG59XG5cbi5hZGQtcXVlc3Rpb24tcm93IC5pbnB1dC13cmFwcGVyIHtcbiAgZmxleDogMTtcbiAgaGVpZ2h0OiA0NHB4O1xuICBwYWRkaW5nLXJpZ2h0OiA2cHg7XG59XG5cbi8vIEljb25vIGRlIFwiZW50ZXJcIiBkZW50cm8gZGVsIHByb3BpbyBpbnB1dCBlbiB2ZXogZGUgdW4gYm90w4PCs24gXCJBw4PCsWFkaXJcIlxuLy8gYXBhcnRlIMOiwoDClCBtaXNtbyBnZXN0byBxdWUgZW52aWFyIGVsIGNhbXBvIGNvbiBsYSB0ZWNsYSBFbnRlclxuLy8gKChrZXl1cC5lbnRlcikgZW4gZWwgaW5wdXQpLCBzb2xvIHF1ZSB0YW1iacODwqluIGNsaWNhYmxlLlxuLmFkZC1xdWVzdGlvbi1zdWJtaXQge1xuICBmbGV4LXNocmluazogMDtcbiAgd2lkdGg6IDMycHg7XG4gIGhlaWdodDogMzJweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLXNtKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSwgY29sb3IgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDE3cHg7XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjQ7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG5cbiAgJjpub3QoOmRpc2FibGVkKTphY3RpdmUge1xuICAgIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICB9XG59XG5cbi5zdWJtaXQtYnV0dG9uIHtcbiAgQGluY2x1ZGUgdGYtZ3JhZGllbnQtYnV0dG9uO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA1MnB4O1xuICBtYXJnaW4tdG9wOiAyMHB4O1xuICBmb250LXNpemU6IDFyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xufVxuXG4vLyAtLS0gTGlzdGEgZGUgaW52aXRhY2lvbmVzIC0tLVxuLmludml0ZXMtbGlzdC1zZWN0aW9uIHtcbiAgcGFkZGluZzogMjhweCAxNnB4IDMycHg7XG59XG5cbi5zZWN0aW9uLWhlYWRpbmcge1xuICBmb250LXNpemU6IDAuNzhyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gIGxldHRlci1zcGFjaW5nOiAwLjA0ZW07XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgbWFyZ2luOiAwIDAgMTBweDtcblxuICAmLS1zZWNvbmRhcnkge1xuICAgIG1hcmdpbi10b3A6IDI0cHg7XG4gIH1cbn1cblxuLmVtcHR5LWhpbnQge1xuICBmb250LXNpemU6IDAuODhyZW07XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgbWFyZ2luOiAwIDAgNHB4O1xufVxuXG4uc2VjdGlvbi1lcnJvciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBnYXA6IDEwcHg7XG5cbiAgcCB7XG4gICAgZm9udC1zaXplOiAwLjg4cmVtO1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgICBtYXJnaW46IDA7XG4gIH1cbn1cblxuLnJldHJ5LWJ1dHRvbiB7XG4gIGhlaWdodDogMzhweDtcbiAgcGFkZGluZzogMCAxNnB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTUpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtc20pO1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuQGtleWZyYW1lcyByb3ctaW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg0cHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuXG4vLyAtLS0gUGVuZGllbnRlcyBlIEhpc3RvcmlhbCBjb21wYXJ0ZW4gbGEgbWlzbWEgY2FyZCAodmVyIGludml0ZXMucGFnZS5odG1sKVxuLy8gw6LCgMKUIGxhIMODwrpuaWNhIGRpZmVyZW5jaWEgZXMgcXVlIFBlbmRpZW50ZXMgYcODwrFhZGUgYm90b25lcyBkZSBjYW5jZWxhci4gLS0tXG4uaGlzdG9yeS1saXN0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA4cHg7XG59XG5cbi5oaXN0b3J5LWNhcmQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDEycHg7XG4gIHBhZGRpbmc6IDE0cHggMTZweDtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0xKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogMTRweDtcbiAgYW5pbWF0aW9uOiByb3ctaW4gMjgwbXMgdmFyKC0tdGYtZWFzZS1vdXQpIGJhY2t3YXJkcztcblxuICBAZm9yICRpIGZyb20gMSB0aHJvdWdoIDEyIHtcbiAgICAmOm50aC1jaGlsZCgjeyRpfSkge1xuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAjeygkaSAtIDEpICogMzB9bXM7XG4gICAgfVxuICB9XG59XG5cbkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gIC5oaXN0b3J5LWNhcmQge1xuICAgIGFuaW1hdGlvbjogbm9uZTtcbiAgfVxufVxuXG4vLyBOb21icmUgYSBsYSBpenF1aWVyZGEsIGVtYWlsIHBlZ2FkbyBhbCBib3JkZSBkZXJlY2hvIMOiwoDClCBzaSBubyBoYXkgbm9tYnJlXG4vLyAoY2xpZW50ZSBxdWUgbnVuY2EgbGxlZ8ODwrMgYSBhY2VwdGFyKSwgZWwgZW1haWwgaGFjZSBkZSBub21icmUgeSBubyBzZVxuLy8gcmVwaXRlIGEgbGEgZGVyZWNoYSAodmVyIGNsaWVudERpc3BsYXlOYW1lKCkgZW4gaW52aXRlcy5wYWdlLnRzKS5cbi5oaXN0b3J5LWNhcmQtaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGJhc2VsaW5lO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGdhcDogMTJweDtcbn1cblxuLmhpc3RvcnktY2FyZC1uYW1lIHtcbiAgbWluLXdpZHRoOiAwO1xuICBmb250LXNpemU6IDAuOTRyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGxldHRlci1zcGFjaW5nOiAtMC4wMWVtO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uaGlzdG9yeS1jYXJkLWVtYWlsIHtcbiAgZmxleC1zaHJpbms6IDE7XG4gIG1pbi13aWR0aDogMDtcbiAgZm9udC1zaXplOiAwLjc4cmVtO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4vLyBGaWxhIGRlIGRldGFsbGU6IMODwqFtYml0byhzKSBhIGxhIGl6cXVpZXJkYSAoMSBvIDIsIHNlZ8ODwrpuIGxvIHF1ZSB0dXZpZXJhXG4vLyBlc2UgY2xpZW50ZSkgY29tbyBjaGlwcywgZXN0YWRvIGNvbW8gcGlsbCBwZWdhZGEgYWwgYm9yZGUgZGVyZWNobyDDosKAwpRcbi8vIHNlcGFyYWRhIGRlbCBoZWFkZXIgcG9yIHVuIGZpbGV0ZSB0ZW51ZSBlbiB2ZXogZGUgdW5hIHRhcmpldGEgYW5pZGFkYVxuLy8gKHZlciBhbnRpLXJlZmVyZW5jaWEgZW4gUFJPRFVDVC5tZDogXCJubyBjYXJkcyBhbmlkYWRhc1wiKS4gZmxleC13cmFwIHBhcmFcbi8vIHF1ZSBlbiBtw4PCs3ZpbCwgc2kgZG9zIGNoaXBzICsgbGEgcGlsbCBkZSBlc3RhZG8gbm8gY2FiZW4gZW4gdW5hIGzDg8KtbmVhLCBlbFxuLy8gZXN0YWRvIGJhamUgZW4gdmV6IGRlIGNvbXByaW1pcnNlIG8gZGVzYm9yZGFyLlxuLmhpc3RvcnktY2FyZC1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgZ2FwOiA4cHggMTBweDtcbiAgcGFkZGluZy10b3A6IDEycHg7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xufVxuXG4uaGlzdG9yeS1zY29wZXMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogNnB4O1xuICBtaW4td2lkdGg6IDA7XG59XG5cbi8vIENoaXAgY29uIHRpbnRlIHByb3BpbyAobm8gZWwgLnNjb3BlLWNoaXAgZ3JpcyBwbGFubyBxdWUgdXNhIGVsIHJlc3RvIGRlXG4vLyBsYSBhcHApIMOiwoDClCBlc3RlIGhpc3RvcmlhbCB5YSBubyB0aWVuZSBlbCBib3TDg8KzbiBkZSBjYW5jZWxhciBjb21vIMODwrpuaWNvXG4vLyBhY2VudG8sIGFzw4PCrSBxdWUgZWwgw4PCoW1iaXRvIHNlIGxlZSBjb21vIGV0aXF1ZXRhIHJlYWwsIG5vIGNvbW8gdGV4dG8gc3VlbHRvLlxuLmhpc3Rvcnktc2NvcGUtdGFnIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA1cHg7XG4gIGZvbnQtc2l6ZTogMC43NnJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIHBhZGRpbmc6IDRweCAxMHB4IDRweCA4cHg7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBjb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgfVxufVxuXG4uY2FuY2VsLWJ1dHRvbiB7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICB3aWR0aDogMzRweDtcbiAgaGVpZ2h0OiAzNHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpLCBib3JkZXItY29sb3IgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpLFxuICAgIGNvbG9yIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICB9XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45Mik7XG4gIH1cblxuICAmOmhvdmVyIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWRhbmdlcik7XG4gICAgY29sb3I6IHZhcigtLXRmLWRhbmdlcik7XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjY7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG59XG5cbi8vIEFncnVwYSBlbCBlc3RhZG8gKyBsb3MgYm90b25lcyBkZSBjYW5jZWxhciAoUGVuZGllbnRlcykgYWwgYm9yZGUgZGVyZWNob1xuLy8gZGUgbGEgZmlsYSDDosKAwpQgSGlzdG9yaWFsIHNvbG8gcG9uZSB1biAuc3RhdHVzLWxhYmVsIGFow4PCrSwgc2luIGVzdGUgd3JhcHBlci5cbi5oaXN0b3J5LWNhcmQtcm93LXJpZ2h0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4vLyBQaWxsIGNvbiB0aW50ZSBwcm9waW8gcG9yIGVzdGFkbyDDosKAwpQgc2UgbGVlIGRlIHVuIHZpc3Rhem8gc2luIHRlbmVyIHF1ZVxuLy8gbGVlciBlbCB0ZXh0bywgbWlzbW8gY3JpdGVyaW8gZGUgY29sb3IgcXVlIGVsIHJlc3RvIGRlIGxhIGFwcFxuLy8gKHN1Y2Nlc3MvZGFuZ2VyKSBtw4PCoXMgdW5hIHZhcmlhbnRlIG5ldXRyYSBwYXJhIFwicmV2b2tlZFwiIChGaW5hbGl6YWRhKS5cbi5zdGF0dXMtbGFiZWwge1xuICBmbGV4LXNocmluazogMDtcbiAgZm9udC1zaXplOiAwLjcycmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBwYWRkaW5nOiA0cHggMTBweDtcbiAgYm9yZGVyLXJhZGl1czogOTk5cHg7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcblxuICAmW2RhdGEtc3RhdHVzPSdhY3RpdmUnXSB7XG4gICAgY29sb3I6IHZhcigtLXRmLXN1Y2Nlc3MpO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1Y2Nlc3Mtc29mdCk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1zdWNjZXNzLWJvcmRlcik7XG4gIH1cblxuICAmW2RhdGEtc3RhdHVzPSdkZWNsaW5lZCddIHtcbiAgICBjb2xvcjogdmFyKC0tdGYtZGFuZ2VyKTtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1kYW5nZXItc29mdCk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1kYW5nZXItYm9yZGVyKTtcbiAgfVxuXG4gICZbZGF0YS1zdGF0dXM9J3Jldm9rZWQnXSB7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1ib3JkZXIpO1xuICB9XG59XG5cbi8vIC0tLSBNw4PCs3ZpbDogbm9tYnJlIHkgZW1haWwgeWEgbm8gY2FiZW4gZW4gbGEgbWlzbWEgbMODwq1uZWEgc2luIHRydW5jYXJzZSBsb3Ncbi8vIGRvcyBhIGxhIHZleiDDosKAwpQgc2UgYXBpbGFuLCBlbWFpbCBtw4PCoXMgcGVxdWXDg8KxbyBkZWJham8uIFVtYnJhbCBzdWJpZG8gZGVcbi8vIDM4MHB4IGEgNDIwcHggcG9ycXVlIGNvbiBsYXMgbnVldmFzIGNoaXBzL3BpbGxzIChtw4PCoXMgYW5jaGFzIHF1ZSBlbCB0ZXh0b1xuLy8gcGxhbm8gZGUgYW50ZXMpIGxhIGzDg8KtbmVhIHNlIGFwcmlldGEgYW50ZXMgZW4gcGFudGFsbGFzIHJlYWxlcyBkZSBnYW1hXG4vLyBtZWRpYSAofjM5MC00MTJweCkuIC0tLVxuQG1lZGlhIChtYXgtd2lkdGg6IDQyMHB4KSB7XG4gIC5oaXN0b3J5LWNhcmQge1xuICAgIHBhZGRpbmc6IDEycHggMTRweDtcbiAgfVxuXG4gIC5oaXN0b3J5LWNhcmQtaGVhZGVyIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICAgIGdhcDogMnB4O1xuICB9XG5cbiAgLmhpc3RvcnktY2FyZC1lbWFpbCB7XG4gICAgZm9udC1zaXplOiAwLjc0cmVtO1xuICB9XG5cbiAgLmhpc3RvcnktY2FyZC1yb3cge1xuICAgIGdhcDogOHB4O1xuICB9XG5cbiAgLmhpc3Rvcnktc2NvcGUtdGFnIHtcbiAgICBmb250LXNpemU6IDAuNzJyZW07XG4gICAgcGFkZGluZzogM3B4IDhweCAzcHggN3B4O1xuICB9XG5cbiAgLnN0YXR1cy1sYWJlbCB7XG4gICAgZm9udC1zaXplOiAwLjY4cmVtO1xuICAgIHBhZGRpbmc6IDNweCA4cHg7XG4gIH1cblxuICAuaGlzdG9yeS1jYXJkLXJvdy1yaWdodCB7XG4gICAgZ2FwOiA2cHg7XG4gIH1cblxuICAuY2FuY2VsLWJ1dHRvbiB7XG4gICAgd2lkdGg6IDMwcHg7XG4gICAgaGVpZ2h0OiAzMHB4O1xuXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgIH1cbiAgfVxufVxuXG4vLyAtLS0gU2tlbGV0b24gLS0tXG4uaGlzdG9yeS1jYXJkLnNrZWxldG9uIHtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG4gIGFuaW1hdGlvbjogbm9uZTtcbn1cblxuLnNrZWxldG9uLWxpbmUge1xuICBAaW5jbHVkZSB0Zi1za2VsZXRvbi1zaGltbWVyO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGhlaWdodDogMTJweDtcblxuICAmLS1lbWFpbCB7XG4gICAgd2lkdGg6IDQ1JTtcbiAgICBoZWlnaHQ6IDE0cHg7XG4gIH1cblxuICAmLS1jaGlwIHtcbiAgICB3aWR0aDogMjUlO1xuICB9XG59XG5cbi8vIC0tLSBUQVJFQSAzOiByZXZpc2FyIGN1ZXN0aW9uYXJpbyArIGNvbmZpcm1hciBjbGllbnRlIC0tLVxuLmRldGFpbC1za2VsZXRvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogOHB4O1xufVxuXG4uc2tlbGV0b24tYmxvY2sge1xuICAvLyBBbnRlcyBzaW4gQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIMOiwoDClCBlbCBtaXhpbiBsbyBpbmNsdXllXG4gIC8vIHNpZW1wcmUsIGNpZXJyYSB1biBodWVjbyBkZSBhY2Nlc2liaWxpZGFkIHJlYWwgcXVlIHRlbsODwq1hIGVzdGEgcMODwqFnaW5hLlxuICBAaW5jbHVkZSB0Zi1za2VsZXRvbi1zaGltbWVyO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xufVxuXG4iLCIvLyBGaWxhIGRlIGlucHV0IGNvbiBpY29ubyAod3JhcHBlciArIGljb25vICsgY2FtcG8pIMOiwoDClCByZXBldGlkYSBlbiA0IHDDg8KhZ2luYXNcbi8vIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuIEVsIGZvbmRvXG4vLyBkZWwgd3JhcHBlciBlcyBlbCDDg8K6bmljbyB2YWxvciBxdWUgdmFyw4PCrWEgcG9yIHDDg8KhZ2luYSAoc3VwZXJmaWNpZSAxIG8gMiBzZWfDg8K6blxuLy8gY29udGV4dG8gdmlzdWFsKSwgZGUgYWjDg8KtIGVsIHBhcsODwqFtZXRybzsgdGFtYcODwrFvIGRlIGZ1ZW50ZS9hbHRvL21hcmdlbiBzZVxuLy8gZGVqYW4gZnVlcmEgZGVsIG1peGluIHBvcnF1ZSBjYWRhIHDDg8KhZ2luYSBsb3MgZmlqYSBzZWfDg8K6biBzdSBwcm9waW8gbGF5b3V0LlxuQG1peGluIHRmLWlucHV0LXdyYXBwZXIoJGJnOiB2YXIoLS10Zi1zdXJmYWNlLTEpKSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgYmFja2dyb3VuZDogJGJnO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMCAxNHB4O1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6Zm9jdXMtd2l0aGluIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIH1cbn1cblxuQG1peGluIHRmLWlucHV0LWljb24ge1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG5AbWl4aW4gdGYtaW5wdXQtZmllbGQge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGhlaWdodDogMTAwJTtcblxuICAmOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG59XG4iLCIvLyBCb3TDg8KzbiBDVEEgY29uIGdyYWRpZW50ZSBkZSBhY2VudG8gw6LCgMKUIG1pc21vIGJsb3F1ZSByZXBldGlkbyBlbiB+MTEgc2l0aW9zIGRlXG4vLyB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgcG9yIGxheW91dCAod2lkdGgsIGhlaWdodCwgZm9udC1zaXplLCBtYXJnaW4pLlxuLy9cbi8vIExhIG1pdGFkIGRlIGxvcyBzaXRpb3Mgb3JpZ2luYWxlcyBubyB0ZW7Dg8KtYW4gdHJhbnNpY2nDg8Kzbi9mZWVkYmFjayBkZSBwdWxzYWNpw4PCs25cbi8vIG5pIDpmb2N1cy12aXNpYmxlIMOiwoDClCBlbCBtaXhpbiBsb3MgYcODwrFhZGUgc2llbXByZSwgY2llcnJhIGVzZSBodWVjbyBkZVxuLy8gY29uc2lzdGVuY2lhIGRlIGludGVyYWNjacODwrNuIChQUk9EVUNULm1kOiBcInVuIHNvbG8gcGF0csODwrNuIHBvciB0aXBvIGRlXG4vLyBjb21wb25lbnRlXCIpIGVuIHZleiBkZSBwZXJwZXR1YXIgbGEgdmFyaWFjacODwrNuIGFjY2lkZW50YWwuXG5AbWl4aW4gdGYtZ3JhZGllbnQtYnV0dG9uKCRyYWRpdXM6IDEycHgpIHtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAkcmFkaXVzO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtZ3JhZGllbnQpO1xuICBjb2xvcjogdmFyKC0tdGYtYWNjZW50LWNvbnRyYXN0KTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpLCBvcGFjaXR5IDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk3KTtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNDU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtdGV4dCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxufVxuXG4vLyBCb3TDg8KzbiBkZSBoZWFkZXIgcXVlIGVzIHNvbG8gdW4gaWNvbm8gw6LCgMKUIG1pc21vIGxvb2sgXCJlbnZ1ZWx0b1wiIHF1ZSB5YSB1c2EgbGFcbi8vIGFwcCBkZSBjb25zdW1pZG9yIGVuIHN1cyB0b29sYmFycyAocGFja2FnZXMvc2hhcmVkLWZlYXR1cmVzLy4uLi9kaWV0cy9cbi8vIGNvbXBvbmVudHMvdG9vbGJhci1jYWxlbmRhcjogZm9uZG8gKyBib3JkZXItcmFkaXVzICsgY2FqYSBmaWphIDQ0eDQ0LCBlblxuLy8gdmV6IGRlbCBpb24tYnV0dG9uIHBsYW5vL3RyYW5zcGFyZW50ZSBxdWUgdGVuw4PCrWEgY2FkYSBwYW50YWxsYSBkZSB0cmFpbmVyc1xuLy8gaGFzdGEgYWhvcmEpLiBUb2tlbmVhZG8gYSBsYSBwYWxldGEgZGUgZXN0YSBhcHAgZW4gdmV6IGRlIHJlcGV0aXIgbG9zXG4vLyByZ2JhKDI1NSwyNTUsMjU1LC4uLikgc3VlbHRvcyBkZWwgb3JpZ2luYWwuXG4vL1xuLy8gU2lydmUgdGFudG8gcGFyYSA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIj4gKHVzYSBsYXMgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzXG4vLyBkZSBJb25pYykgY29tbyBwYXJhIHVuIDxidXR0b24+IG5hdGl2byAodXNhIGxhcyBwcm9waWVkYWRlcyBwbGFuYXMpIMOiwoDClFxuLy8gYW1ib3MgY29leGlzdGVuIGhveSBlbiB0cmFpbmVycyBwYXJhIGVsIG1pc21vIHJvbCBkZSBcInZvbHZlclwiL1wiY2VycmFyXCIuXG5AbWl4aW4gdGYtaWNvbi1idXR0b24oJHNpemU6IDQ0cHgsICRyYWRpdXM6IDEycHgsICRpY29uLXNpemU6IDIwcHgpIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICAtLWJhY2tncm91bmQtYWN0aXZhdGVkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtaG92ZXI6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIC0tYmFja2dyb3VuZC1mb2N1c2VkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIC0tYm9yZGVyLXJhZGl1czogI3skcmFkaXVzfTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAtLXBhZGRpbmctZW5kOiAwO1xuICAtLXBhZGRpbmctdG9wOiAwO1xuICAtLXBhZGRpbmctYm90dG9tOiAwO1xuXG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgd2lkdGg6ICRzaXplO1xuICBoZWlnaHQ6ICRzaXplO1xuICBtaW4td2lkdGg6ICRzaXplO1xuICBtaW4taGVpZ2h0OiAkc2l6ZTtcbiAgbWFyZ2luOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICBjb2xvciB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAkaWNvbi1zaXplO1xuICB9XG59XG5cbi8vIEV4cGFuc29yIGludmlzaWJsZSBkZSB6b25hIHB1bHNhYmxlLlxuLy9cbi8vIFBBUkEgUVXDg8KJOiB1biBjb250cm9sIGNvbXBhY3RvICh1biBpY29ubyBkZSAzMiBweCBlbiB1bmEgZmlsYSBkZSB0YWJsYSwgdW5cbi8vIGVubGFjZSBkZSB0ZXh0byBkZSAxNiBweCkgbm8gbGxlZ2EgYSBsb3MgNDQgcHggcXVlIGV4aWdlIFBST0RVQ1QubWQsIHlcbi8vIGVuZ29yZGFybG8gZGUgdmVyZGFkIGRlc3BsYXphIHRvZG8gbG8gcXVlIHRpZW5lIGFscmVkZWRvciDDosKAwpQgZW4gdW5hIHRhYmxhXG4vLyBkZSB2ZWludGUgZmlsYXMsIDggcHggcG9yIGZpbGEgc29uIG1lZGlhIHBhbnRhbGxhLlxuLy9cbi8vIEVsIHBzZXVkb2VsZW1lbnRvIGNyZWNlIGhhY2lhIGZ1ZXJhIHNpbiBvY3VwYXIgc2l0aW8gZW4gZWwgZmx1am8sIGFzw4PCrSBxdWVcbi8vIGVsIGJvdMODwrNuIHNlIHZlIHBlcXVlw4PCsW8geSBzZSBwdWxzYSBncmFuZGUuXG4vL1xuLy8gQVZJU08gREUgTUVESUNJw4PCk046IGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIE5PIHZlIGVzdGUgcHNldWRvZWxlbWVudG8sIGFzw4PCrVxuLy8gcXVlIGFsIHZlcmlmaWNhciBoYXkgcXVlIHVzYXIgZWxlbWVudEZyb21Qb2ludCBjb24gZWwgZWxlbWVudG8gZGVudHJvIGRlbFxuLy8gdmlld3BvcnQuIEFkZW3Dg8KhcyBlbCBoaXQtdGVzdCBkZXZ1ZWx2ZSAyIHB4IG1lbm9zIHF1ZSBsYSBjYWphIGRlY2xhcmFkYVxuLy8gKGNvbXByb2JhZG86IC00cHggZGEgNDIsIC02cHggZGEgNDYpLCBhc8ODwq0gcXVlIHVuIDQyIG1lZGlkbyBzb24gNDQgcmVhbGVzLlxuLy9cbi8vICRncm93OiBjdcODwqFudG8gY3JlY2UgcG9yIGNhZGEgbGFkby4gNHB4IGxsZXZhIHVuIGNvbnRyb2wgZGUgMzYgcHggYSA0NC5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlcigkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldDogLSN7JGdyb3d9O1xuICB9XG59XG5cbi8vIFZhcmlhbnRlIHF1ZSBzb2xvIGNyZWNlIGVuIFZFUlRJQ0FMLiBQYXJhIGNvbnRyb2xlcyBlbiBmaWxhIGRvbmRlIGVsXG4vLyBleHBhbnNvciBob3Jpem9udGFsIHNlIHNvbGFwYXLDg8KtYSBjb24gZWwgZGUgYWwgbGFkbyB5IHJvYmFyw4PCrWEgc3VzIHRvcXVlcy5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlci15KCRncm93OiA0cHgpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogLSN7JGdyb3d9O1xuICAgIGJvdHRvbTogLSN7JGdyb3d9O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
}));


/***/ })

}]);
//# sourceMappingURL=src_app_features_invites_invites_module_ts.js.map