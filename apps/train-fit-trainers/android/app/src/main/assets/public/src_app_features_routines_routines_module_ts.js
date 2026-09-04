"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_features_routines_routines_module_ts"],{

/***/ 82601:
/*!*********************************************************************************!*\
  !*** ./src/app/features/routines/pages/routine-builder/routine-builder.page.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoutineBuilderPage: () => (/* binding */ RoutineBuilderPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core/rxjs-interop */ 68075);
/* harmony import */ var src_app_shared_components_search_exercises_search_exercises_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/components/search-exercises/search-exercises.page */ 93305);
/* harmony import */ var _template_scheme_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./template-scheme.util */ 73182);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_core_services_workout_template_workout_template_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/workout-template/workout-template-api.service */ 80441);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ionic/angular */ 54844);


var _RoutineBuilderPage;











function RoutineBuilderPage_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "div", 14)(2, "div", 15)(3, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RoutineBuilderPage_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](1, "ion-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "No se pudo cargar la plantilla");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Comprueba tu conexi\u00F3n e int\u00E9ntalo de nuevo.");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RoutineBuilderPage_div_12_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r3.load());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "Reintentar");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
}
function RoutineBuilderPage_ng_container_13_button_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "button", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RoutineBuilderPage_ng_container_13_button_15_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r12);
      const lvl_r10 = restoredCtx.$implicit;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r11.level = lvl_r10);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const lvl_r10 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵclassProp"]("selected", ctx_r5.level === lvl_r10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"](" ", ctx_r5.levels[lvl_r10], " ");
  }
}
function RoutineBuilderPage_ng_container_13_span_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, "Guardar");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RoutineBuilderPage_ng_container_13_ion_spinner_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](0, "ion-spinner", 44);
  }
}
function RoutineBuilderPage_ng_container_13_p_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "p", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1, " Todav\u00EDa no has a\u00F1adido ning\u00FAn bloque. Un bloque agrupa uno o varios ejercicios (recta, superserie, circuito...). ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
}
function RoutineBuilderPage_ng_container_13_div_38_div_9_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const block_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("", block_r13.rounds, " rondas");
  }
}
function RoutineBuilderPage_ng_container_13_div_38_div_9_span_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const block_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("Descanso ejercicios: ", block_r13.restBetweenExercises, "s");
  }
}
function RoutineBuilderPage_ng_container_13_div_38_div_9_span_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const block_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate1"]("Descanso rondas: ", block_r13.restBetweenRounds, "s");
  }
}
function RoutineBuilderPage_ng_container_13_div_38_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](1, RoutineBuilderPage_ng_container_13_div_38_div_9_span_1_Template, 2, 1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](2, RoutineBuilderPage_ng_container_13_div_38_div_9_span_2_Template, 2, 1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](3, RoutineBuilderPage_ng_container_13_div_38_div_9_span_3_Template, 2, 1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const block_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", block_r13.rounds);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", block_r13.restBetweenExercises);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", block_r13.restBetweenRounds);
  }
}
function RoutineBuilderPage_ng_container_13_div_38_div_10_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 65)(1, "label", 66)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Series");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "input", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RoutineBuilderPage_ng_container_13_div_38_div_10_div_6_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r29);
      const ex_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ex_r23.scheme.count = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "label", 66)(6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "Reps min");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "input", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RoutineBuilderPage_ng_container_13_div_38_div_10_div_6_Template_input_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r29);
      const ex_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ex_r23.scheme.repsMin = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "label", 66)(10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "Reps max");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "input", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RoutineBuilderPage_ng_container_13_div_38_div_10_div_6_Template_input_ngModelChange_12_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r29);
      const ex_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ex_r23.scheme.repsMax = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](13, "label", 66)(14, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](15, "RIR min");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "input", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RoutineBuilderPage_ng_container_13_div_38_div_10_div_6_Template_input_ngModelChange_16_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r29);
      const ex_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ex_r23.scheme.rirMin = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](17, "label", 66)(18, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](19, "RIR max");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "input", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RoutineBuilderPage_ng_container_13_div_38_div_10_div_6_Template_input_ngModelChange_20_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r29);
      const ex_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ex_r23.scheme.rirMax = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ex_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ex_r23.scheme.count);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ex_r23.scheme.repsMin);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ex_r23.scheme.repsMax);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ex_r23.scheme.rirMin);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ex_r23.scheme.rirMax);
  }
}
function RoutineBuilderPage_ng_container_13_div_38_div_10_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 65)(1, "label", 66)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Series");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "input", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RoutineBuilderPage_ng_container_13_div_38_div_10_div_7_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r41);
      const ex_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ex_r23.scheme.count = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "label", 70)(6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "Tiempo");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "input", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RoutineBuilderPage_ng_container_13_div_38_div_10_div_7_Template_input_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r41);
      const ex_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ex_r23.scheme.expectedTime = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ex_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ex_r23.scheme.count);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ex_r23.scheme.expectedTime);
  }
}
function RoutineBuilderPage_ng_container_13_div_38_div_10_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r47 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 65)(1, "label", 66)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3, "Series");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "input", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RoutineBuilderPage_ng_container_13_div_38_div_10_div_8_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r47);
      const ex_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ex_r23.scheme.count = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](5, "label", 70)(6, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7, "Tiempo");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "input", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RoutineBuilderPage_ng_container_13_div_38_div_10_div_8_Template_input_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r47);
      const ex_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ex_r23.scheme.expectedTime = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "label", 66)(10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](11, "Distancia (km)");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "input", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RoutineBuilderPage_ng_container_13_div_38_div_10_div_8_Template_input_ngModelChange_12_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r47);
      const ex_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ex_r23.scheme.expectedDistance = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ex_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ex_r23.scheme.count);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ex_r23.scheme.expectedTime);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ex_r23.scheme.expectedDistance);
  }
}
function RoutineBuilderPage_ng_container_13_div_38_div_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 58)(1, "div", 59)(2, "span", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "button", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RoutineBuilderPage_ng_container_13_div_38_div_10_Template_button_click_4_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r55);
      const ex_r23 = restoredCtx.$implicit;
      const block_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]().$implicit;
      const ctx_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r53.removeExercise(block_r13, ex_r23));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "ion-icon", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](6, RoutineBuilderPage_ng_container_13_div_38_div_10_div_6_Template, 21, 5, "div", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](7, RoutineBuilderPage_ng_container_13_div_38_div_10_div_7_Template, 9, 2, "div", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](8, RoutineBuilderPage_ng_container_13_div_38_div_10_div_8_Template, 13, 3, "div", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "p", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ex_r23 = ctx.$implicit;
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"]((ex_r23.exercise == null ? null : ex_r23.exercise.name) || "Ejercicio eliminado del cat\u00E1logo");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r15.isSchemeNormal(ex_r23.scheme));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r15.isSchemeIsometric(ex_r23.scheme));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r15.isSchemeCardio(ex_r23.scheme));
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r15.schemeSummary(ex_r23.scheme));
  }
}
function RoutineBuilderPage_ng_container_13_div_38_Template(rf, ctx) {
  if (rf & 1) {
    const _r57 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "div", 46)(1, "button", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RoutineBuilderPage_ng_container_13_div_38_Template_button_click_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r57);
      const block_r13 = restoredCtx.$implicit;
      const ctx_r56 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r56.editBlockAlert(block_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](2, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](3, "ion-icon", 49);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](4, "span", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "span", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](8, "ion-icon", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](9, RoutineBuilderPage_ng_container_13_div_38_div_9_Template, 4, 3, "div", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](10, RoutineBuilderPage_ng_container_13_div_38_div_10_Template, 11, 5, "div", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "button", 55);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RoutineBuilderPage_ng_container_13_div_38_Template_button_click_11_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r57);
      const block_r13 = restoredCtx.$implicit;
      const ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r58.addExercise(block_r13));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](12, "ion-icon", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13, " A\u00F1adir ejercicio ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const block_r13 = ctx.$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](block_r13.name || ctx_r9.blockTypeLabels[block_r13.type]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtextInterpolate"](ctx_r9.blockTypeLabels[block_r13.type]);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", block_r13.rounds || block_r13.restBetweenExercises || block_r13.restBetweenRounds);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", block_r13.exercises)("ngForTrackBy", ctx_r9.trackByIndex);
  }
}
function RoutineBuilderPage_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r60 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](1, "div", 19)(2, "div", 20)(3, "div", 21)(4, "label", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](5, "Nombre");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](7, "ion-icon", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](8, "input", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RoutineBuilderPage_ng_container_13_Template_input_ngModelChange_8_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r60);
      const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r59.name = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](9, "label", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](10, "Descripci\u00F3n");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](11, "textarea", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RoutineBuilderPage_ng_container_13_Template_textarea_ngModelChange_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r60);
      const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r61.description = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](12, "label", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](13, "Nivel");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](14, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](15, RoutineBuilderPage_ng_container_13_button_15_Template, 2, 3, "button", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](16, "div", 29)(17, "div", 30)(18, "label", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](19, "Etiquetas");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](20, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](21, "ion-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](22, "input", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RoutineBuilderPage_ng_container_13_Template_input_ngModelChange_22_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r60);
      const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r62.tagsText = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](23, "div", 30)(24, "label", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](25, "Equipo");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](26, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](27, "ion-icon", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](28, "input", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("ngModelChange", function RoutineBuilderPage_ng_container_13_Template_input_ngModelChange_28_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r60);
      const ctx_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r63.equipmentText = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](29, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RoutineBuilderPage_ng_container_13_Template_button_click_29_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r60);
      const ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r64.save());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](30, RoutineBuilderPage_ng_container_13_span_30_Template, 2, 0, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](31, RoutineBuilderPage_ng_container_13_ion_spinner_31_Template, 1, 0, "ion-spinner", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](32, "div", 37)(33, "div", 21)(34, "div", 38)(35, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](36, "Contenido");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](37, RoutineBuilderPage_ng_container_13_p_37_Template, 2, 0, "p", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](38, RoutineBuilderPage_ng_container_13_div_38_Template, 14, 5, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](39, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RoutineBuilderPage_ng_container_13_Template_button_click_39_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵrestoreView"](_r60);
      const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵresetView"](ctx_r65.addBlockAlert());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](40, "ion-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](41, " A\u00F1adir bloque ");
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r2.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r2.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r2.levelKeys);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r2.tagsText);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngModel", ctx_r2.equipmentText);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("disabled", !ctx_r2.canSave);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", !ctx_r2.isSaving);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.isSaving);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx_r2.blocks.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngForOf", ctx_r2.blocks)("ngForTrackBy", ctx_r2.trackByIndex);
  }
}
const BLOCK_TYPES = ['straight', 'superset', 'circuit', 'warmup', 'finisher'];
const BLOCK_TYPE_LABELS = {
  straight: 'Recta',
  superset: 'Superserie',
  circuit: 'Circuito',
  warmup: 'Calentamiento',
  finisher: 'Finisher'
};
const LEVEL_LABELS = {
  principiante: 'Principiante',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado'
};
// Plantillas de entrenamiento — constructor de contenido desde cero (la
// pieza que faltaba: routines.page.ts solo gestionaba metadata, nunca
// bloques/ejercicios/series). Mismo esqueleto que
// diet-template-builder.page.ts: carga vía list() + find por id (sin
// endpoint GET-one dedicado), estado local editable, sin autosave, "Guardar"
// explícito. blocks[].exercises[].exercise viene poblado por el backend
// (populate en workout-template-dao.js#listByTrainer/update) — SIEMPRE
// objeto Exercise aquí, nunca string; se normaliza a id plano solo al
// construir el payload de guardado (ver save()).
class RoutineBuilderPage {
  constructor(route, router, workoutTemplateApi, ionicUtilService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "route", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "workoutTemplateApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "state", 'loading');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "templateId", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "name", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "description", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "level", 'intermedio');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "tagsText", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "equipmentText", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "blocks", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isSaving", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "levels", LEVEL_LABELS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "levelKeys", ['principiante', 'intermedio', 'avanzado']);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "blockTypeLabels", BLOCK_TYPE_LABELS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "schemeSummary", _template_scheme_util__WEBPACK_IMPORTED_MODULE_3__.schemeSummary);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "destroyRef", (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_6__.DestroyRef));
    this.route = route;
    this.router = router;
    this.workoutTemplateApi = workoutTemplateApi;
    this.ionicUtilService = ionicUtilService;
  }
  // TASK-051 (MASTER_BACKLOG.md) — antes leía el :id una sola vez de
  // route.snapshot en ngOnInit. Sin explotar hoy (routines.page.ts no
  // navega de una plantilla abierta directamente a otra sin pasar por la
  // lista), pero si el Router llegara a reutilizar esta instancia entre dos
  // navegaciones ':id' distintas de la misma ruta (comportamiento por
  // defecto de Angular cuando solo cambia el parámetro), ngOnInit no
  // volvería a dispararse y se seguiría editando la plantilla vieja.
  // Suscripción reactiva en vez de snapshot — recarga si el id cambia.
  ngOnInit() {
    this.route.paramMap.pipe((0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_7__.takeUntilDestroyed)(this.destroyRef)).subscribe(params => {
      this.templateId = params.get('id') || '';
      this.load();
    });
  }
  load() {
    this.state = 'loading';
    this.workoutTemplateApi.list().subscribe({
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
    this.description = template.description || '';
    this.level = template.level || 'intermedio';
    this.tagsText = (template.tags || []).join(', ');
    this.equipmentText = (template.equipment || []).join(', ');
    this.blocks = (template.blocks || []).map(block => this.blockFromTemplate(block));
  }
  blockFromTemplate(block) {
    return {
      name: block.name || '',
      type: block.type || 'straight',
      rounds: block.rounds ?? null,
      restBetweenExercises: block.restBetweenExercises ?? null,
      restBetweenRounds: block.restBetweenRounds ?? null,
      instructions: block.instructions || '',
      exercises: (block.exercises || []).map(ex => this.exerciseFromTemplate(ex))
    };
  }
  exerciseFromTemplate(ex) {
    const exercise = typeof ex.exercise === 'string' ? {
      _id: ex.exercise,
      name: '?'
    } : ex.exercise;
    return {
      exercise,
      notes: ex.notes || '',
      scheme: (0,_template_scheme_util__WEBPACK_IMPORTED_MODULE_3__.schemeFromExistingSets)(ex.sets, exercise)
    };
  }
  trackByIndex(index) {
    return index;
  }
  // --- Bloques ---
  addBlockAlert() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.ionicUtilService.showAlert({
        header: 'Nuevo bloque',
        inputs: [{
          name: 'name',
          type: 'text',
          placeholder: 'Nombre (opcional)'
        }],
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Siguiente',
          handler: data => {
            _this.chooseBlockTypeAlert((data?.name || '').trim());
            return true;
          }
        }]
      });
    })();
  }
  // AlertController no soporta mezclar inputs de texto con radio en el mismo
  // alert — el tipo de bloque se elige en un segundo paso encadenado, mismo
  // patrón que chooseBlockTypeAlert en workout.component.ts.
  chooseBlockTypeAlert(name) {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const inputs = BLOCK_TYPES.map((type, index) => ({
        type: 'radio',
        label: _this2.blockTypeLabels[type],
        value: type,
        checked: index === 0
      }));
      yield _this2.ionicUtilService.showAlert({
        header: 'Tipo de bloque',
        inputs,
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Crear',
          handler: type => {
            _this2.blocks.push({
              name,
              type: type || 'straight',
              rounds: null,
              restBetweenExercises: null,
              restBetweenRounds: null,
              instructions: '',
              exercises: []
            });
            return true;
          }
        }]
      });
    })();
  }
  editBlockAlert(block) {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this3.ionicUtilService.showAlert({
        header: block.name || _this3.blockTypeLabels[block.type],
        buttons: [{
          text: 'Renombrar',
          handler: () => {
            _this3.renameBlockAlert(block);
            return false;
          }
        }, {
          text: 'Rondas / descansos',
          handler: () => {
            _this3.blockTimingAlert(block);
            return false;
          }
        }, {
          text: 'Borrar bloque',
          cssClass: 'alert-button-danger',
          handler: () => {
            _this3.confirmDeleteBlock(block);
            return false;
          }
        }, {
          text: 'Cancelar',
          role: 'cancel'
        }]
      });
    })();
  }
  renameBlockAlert(block) {
    var _this4 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this4.ionicUtilService.showAlert({
        header: 'Renombrar bloque',
        inputs: [{
          name: 'name',
          type: 'text',
          value: block.name
        }],
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Guardar',
          handler: data => {
            block.name = (data?.name || '').trim();
            return true;
          }
        }]
      });
    })();
  }
  blockTimingAlert(block) {
    var _this5 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this5.ionicUtilService.showAlert({
        header: 'Rondas y descansos',
        inputs: [{
          name: 'rounds',
          type: 'number',
          placeholder: 'Rondas',
          value: block.rounds ?? ''
        }, {
          name: 'restBetweenExercises',
          type: 'number',
          placeholder: 'Descanso entre ejercicios (s)',
          value: block.restBetweenExercises ?? ''
        }, {
          name: 'restBetweenRounds',
          type: 'number',
          placeholder: 'Descanso entre rondas (s)',
          value: block.restBetweenRounds ?? ''
        }],
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Guardar',
          handler: data => {
            block.rounds = data?.rounds !== '' && data?.rounds != null ? Number(data.rounds) : null;
            block.restBetweenExercises = data?.restBetweenExercises !== '' && data?.restBetweenExercises != null ? Number(data.restBetweenExercises) : null;
            block.restBetweenRounds = data?.restBetweenRounds !== '' && data?.restBetweenRounds != null ? Number(data.restBetweenRounds) : null;
            return true;
          }
        }]
      });
    })();
  }
  confirmDeleteBlock(block) {
    var _this6 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this6.ionicUtilService.showAlert({
        header: 'Borrar bloque',
        message: `¿Seguro que quieres borrar "${block.name || _this6.blockTypeLabels[block.type]}"? Se perderán sus ejercicios.`,
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Borrar',
          cssClass: 'alert-button-danger',
          handler: () => {
            _this6.blocks = _this6.blocks.filter(b => b !== block);
          }
        }]
      });
    })();
  }
  // --- Ejercicios ---
  addExercise(block) {
    var _this7 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const modalOptions = {
        component: src_app_shared_components_search_exercises_search_exercises_page__WEBPACK_IMPORTED_MODULE_2__.SearchExercisesPage,
        componentProps: {
          pickerMode: true
        },
        cssClass: 'tf-panel-modal'
      };
      // pickerMode ahora es selección múltiple — confirma con todos los
      // ejercicios marcados a la vez (ver confirmPickerSelection() en
      // SearchExercisesPage), no con uno solo por apertura del picker.
      const res = yield _this7.ionicUtilService.showModal(modalOptions);
      const exercises = res?.data;
      if (!exercises?.length) return;
      exercises.forEach(exercise => {
        block.exercises.push({
          exercise,
          notes: '',
          scheme: (0,_template_scheme_util__WEBPACK_IMPORTED_MODULE_3__.defaultSchemeFor)(exercise)
        });
      });
    })();
  }
  removeExercise(block, exercise) {
    block.exercises = block.exercises.filter(e => e !== exercise);
  }
  isSchemeNormal(scheme) {
    return scheme.kind === 'normal';
  }
  isSchemeIsometric(scheme) {
    return scheme.kind === 'isometric';
  }
  isSchemeCardio(scheme) {
    return scheme.kind === 'cardio';
  }
  // --- Guardar ---
  get canSave() {
    return this.name.trim().length > 0 && !this.isSaving;
  }
  save() {
    if (!this.canSave) return;
    this.isSaving = true;
    const tags = this.tagsText.split(',').map(t => t.trim()).filter(Boolean);
    const equipment = this.equipmentText.split(',').map(t => t.trim()).filter(Boolean);
    const blocks = this.blocks.map((block, blockIndex) => ({
      name: block.name,
      type: block.type,
      order: blockIndex,
      rounds: block.rounds,
      restBetweenExercises: block.restBetweenExercises,
      restBetweenRounds: block.restBetweenRounds,
      instructions: block.instructions,
      exercises: block.exercises.map((ex, exIndex) => ({
        // Normalizar a id string plano — el estado local guarda el Exercise
        // poblado completo; enviarlo tal cual haría que Mongoose falle al
        // castear un objeto plano a ObjectId.
        exercise: ex.exercise._id,
        order: exIndex,
        notes: ex.notes,
        sets: (0,_template_scheme_util__WEBPACK_IMPORTED_MODULE_3__.buildSetsFromScheme)(ex.scheme)
      }))
    }));
    this.workoutTemplateApi.update(this.templateId, {
      name: this.name.trim(),
      description: this.description.trim(),
      level: this.level,
      tags,
      equipment,
      blocks
    }).subscribe({
      next: () => {
        this.isSaving = false;
        this.ionicUtilService.showToast({
          message: 'Plantilla guardada',
          duration: 1500
        });
      },
      error: () => {
        this.isSaving = false;
        this.ionicUtilService.showToast({
          message: 'No se pudo guardar la plantilla',
          duration: 2500
        });
      }
    });
  }
  goBack() {
    this.router.navigate(['/tabs/routines']);
  }
}
_RoutineBuilderPage = RoutineBuilderPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RoutineBuilderPage, "\u0275fac", function RoutineBuilderPage_Factory(t) {
  return new (t || _RoutineBuilderPage)(_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_8__.Router), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_core_services_workout_template_workout_template_api_service__WEBPACK_IMPORTED_MODULE_4__.WorkoutTemplateApiService), _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_5__.IonicUtilService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RoutineBuilderPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵdefineComponent"]({
  type: _RoutineBuilderPage,
  selectors: [["app-routine-builder"]],
  decls: 14,
  vars: 3,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["type", "button", "aria-label", "Volver", 1, "tf-page-header__back-button", 3, "click"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "builder-content"], ["class", "builder-skeleton", 4, "ngIf"], ["class", "state-message", 4, "ngIf"], [4, "ngIf"], [1, "builder-skeleton"], [1, "skeleton-block", "skeleton-block--sidebar"], [1, "skeleton-block", "skeleton-block--block"], [1, "state-message"], ["name", "cloud-offline-outline"], [1, "retry-button", 3, "click"], [1, "builder-layout"], [1, "builder-sidebar"], [1, "builder-section"], [1, "field-label"], [1, "input-wrapper"], ["name", "pricetag-outline", 1, "input-icon"], ["type", "text", "placeholder", "Ej: Empuje 4 series", 1, "input-field", 3, "ngModel", "ngModelChange"], ["rows", "2", "placeholder", "Descripci\u00F3n (opcional)", 1, "builder-textarea", 3, "ngModel", "ngModelChange"], [1, "level-picker"], ["type", "button", "class", "level-option", 3, "selected", "click", 4, "ngFor", "ngForOf"], [1, "field-pair"], [1, "field-pair-col"], ["name", "bookmarks-outline", 1, "input-icon"], ["type", "text", "placeholder", "fuerza, tren superior...", 1, "input-field", 3, "ngModel", "ngModelChange"], ["name", "barbell-outline", 1, "input-icon"], ["type", "text", "placeholder", "mancuernas, banco...", 1, "input-field", 3, "ngModel", "ngModelChange"], ["type", "button", 1, "submit-button", 3, "disabled", "click"], ["name", "dots", 4, "ngIf"], [1, "builder-main"], [1, "section-heading"], ["class", "empty-hint", 4, "ngIf"], ["class", "block-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "add-block-btn", 3, "click"], ["name", "add-circle-outline"], ["type", "button", 1, "level-option", 3, "click"], ["name", "dots"], [1, "empty-hint"], [1, "block-card"], ["type", "button", 1, "block-header", 3, "click"], [1, "block-header-main"], ["name", "layers-outline"], [1, "block-name"], [1, "block-type-badge"], ["name", "chevron-forward-outline", 1, "block-header-chevron"], ["class", "block-header-meta", 4, "ngIf"], ["class", "exercise-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "add-exercise-btn", 3, "click"], ["name", "add-outline"], [1, "block-header-meta"], [1, "exercise-row"], [1, "exercise-row-header"], [1, "exercise-name"], ["type", "button", "aria-label", "Quitar ejercicio", 1, "remove-exercise-btn", 3, "click"], ["name", "close-outline"], ["class", "scheme-fields", 4, "ngIf"], [1, "scheme-summary"], [1, "scheme-fields"], [1, "scheme-field"], ["type", "number", "min", "1", "max", "20", 3, "ngModel", "ngModelChange"], ["type", "number", "min", "0", 3, "ngModel", "ngModelChange"], ["type", "number", "min", "-1", 3, "ngModel", "ngModelChange"], [1, "scheme-field", "scheme-field--wide"], ["type", "text", "placeholder", "ej. 30s", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "ej. 10min", 3, "ngModel", "ngModelChange"]],
  template: function RoutineBuilderPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵlistener"]("click", function RoutineBuilderPage_Template_button_click_4_listener() {
        return ctx.goBack();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](5, "ion-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](6, "div", 6)(7, "h1", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtext"](8, "Plantilla de entrenamiento");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelement"](9, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementStart"](10, "ion-content", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](11, RoutineBuilderPage_div_11_Template, 4, 0, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](12, RoutineBuilderPage_div_12_Template, 8, 0, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵtemplate"](13, RoutineBuilderPage_ng_container_13_Template, 42, 11, "ng-container", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](11);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.state === "loading");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.state === "error");
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_6__["ɵɵproperty"]("ngIf", ctx.state === "loaded");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_9__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_9__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.MaxValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_10__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_11__.IonSpinner],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n.builder-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 12px;\n  --padding-bottom: 24px;\n}\n\n.skeleton-block[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n  border-radius: 12px;\n}\n.skeleton-block[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n\n.builder-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.skeleton-block--sidebar[_ngcontent-%COMP%] {\n  height: 220px;\n}\n\n.skeleton-block--block[_ngcontent-%COMP%] {\n  height: 120px;\n}\n\n.empty-hint[_ngcontent-%COMP%] {\n  font-size: 0.86rem;\n  color: var(--tf-text-muted);\n  text-align: center;\n}\n\n.state-message[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 10px;\n  padding: 96px 32px 0;\n  color: var(--tf-text-muted);\n}\n.state-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  color: var(--tf-text-faint);\n  margin-bottom: 6px;\n}\n.state-message[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: var(--tf-text);\n  margin: 0;\n}\n.state-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  line-height: 1.5;\n  max-width: 34ch;\n  margin: 0 0 4px;\n}\n\n.retry-button[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  height: var(--tf-touch-min);\n  padding: 0 20px;\n  background: var(--tf-surface-5);\n  color: var(--tf-text);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-sm);\n  font-size: 0.9rem;\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform var(--tf-duration-fast) var(--tf-ease-out);\n}\n.retry-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.96);\n}\n\n.builder-layout[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.builder-section[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.field-pair[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.field-pair[_ngcontent-%COMP%]   .field-pair-col[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.field-pair[_ngcontent-%COMP%]   .field-label[_ngcontent-%COMP%] {\n  margin-top: 12px;\n}\n\n@media (min-width: 900px) {\n  .builder-content[_ngcontent-%COMP%] {\n    --padding-start: 28px;\n    --padding-end: 28px;\n    --padding-top: 20px;\n  }\n  .builder-layout[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: minmax(280px, 340px) 1fr;\n    align-items: start;\n    gap: 24px;\n    max-width: 1220px;\n    margin: 0 auto;\n  }\n  .builder-sidebar[_ngcontent-%COMP%] {\n    position: sticky;\n    top: 20px;\n    display: flex;\n    flex-direction: column;\n    gap: 14px;\n  }\n  .builder-sidebar[_ngcontent-%COMP%]   .builder-section[_ngcontent-%COMP%] {\n    margin-bottom: 0;\n  }\n  .builder-main[_ngcontent-%COMP%]   .builder-section[_ngcontent-%COMP%] {\n    margin-bottom: 0;\n  }\n}\n.field-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.78rem;\n  font-weight: 600;\n  color: var(--tf-text-secondary);\n  margin: 12px 0 6px;\n}\n.field-label[_ngcontent-%COMP%]:first-child {\n  margin-top: 0;\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n  position: relative;\n  height: 46px;\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  flex-shrink: 0;\n  font-size: 1.05rem;\n}\n\n.input-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n  font-size: 0.88rem;\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.builder-textarea[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-radius: 10px;\n  color: var(--tf-text);\n  padding: 10px 12px;\n  font-size: 0.88rem;\n  resize: vertical;\n}\n.builder-textarea[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: var(--tf-accent);\n}\n\n.level-picker[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 8px;\n}\n\n.level-option[_ngcontent-%COMP%] {\n  height: 38px;\n  border-radius: 10px;\n  border: 1px solid var(--tf-border-strong);\n  background: var(--tf-surface-2);\n  color: var(--tf-text-secondary);\n  font-size: 0.8rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.level-option.selected[_ngcontent-%COMP%] {\n  border-color: var(--tf-accent);\n  color: var(--tf-accent);\n  background: var(--tf-accent-soft);\n}\n\n.section-heading[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 700;\n  color: var(--tf-text);\n  margin-bottom: 10px;\n}\n\n.block-card[_ngcontent-%COMP%] {\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: 12px;\n  margin-bottom: 12px;\n  padding: 12px;\n}\n\n.block-header[_ngcontent-%COMP%] {\n  display: block;\n  width: 100%;\n  background: transparent;\n  border: none;\n  padding: 0;\n  margin-bottom: 8px;\n  font-family: inherit;\n  text-align: left;\n  color: inherit;\n  cursor: pointer;\n}\n.block-header[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n  border-radius: 6px;\n}\n\n.block-header-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.block-header-main[_ngcontent-%COMP%]    > ion-icon[_ngcontent-%COMP%]:first-child {\n  color: var(--tf-text-muted);\n}\n\n.block-header-chevron[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 16px;\n  color: var(--tf-text-faint);\n}\n\n.block-name[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 0.9rem;\n  font-weight: 700;\n  color: var(--tf-text);\n}\n\n.block-type-badge[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.02em;\n  text-transform: uppercase;\n  color: var(--tf-accent-text);\n  background: var(--tf-accent-soft);\n  border: 1px solid var(--tf-accent-soft-border);\n  border-radius: 6px;\n  padding: 2px 7px;\n}\n\n.block-header-meta[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  margin-top: 4px;\n  font-size: 0.72rem;\n  color: var(--tf-text-muted);\n}\n\n.exercise-row[_ngcontent-%COMP%] {\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-subtle);\n  border-radius: 10px;\n  padding: 10px;\n  margin-bottom: 8px;\n}\n\n.exercise-row-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n\n.exercise-name[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.remove-exercise-btn[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 26px;\n  height: 26px;\n  background: transparent;\n  border: none;\n  color: var(--tf-text-muted);\n  cursor: pointer;\n}\n.remove-exercise-btn[_ngcontent-%COMP%]:hover {\n  color: var(--tf-danger);\n}\n.remove-exercise-btn[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 1px;\n  border-radius: 4px;\n}\n\n.scheme-fields[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));\n  gap: 8px;\n}\n\n.scheme-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n.scheme-field--wide[_ngcontent-%COMP%] {\n  grid-column: span 2;\n}\n.scheme-field[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.03em;\n  color: var(--tf-text-muted);\n}\n.scheme-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  width: 100%;\n  background: var(--tf-surface-4);\n  border: 1px solid var(--tf-border);\n  border-radius: 6px;\n  color: var(--tf-text);\n  padding: 5px 6px;\n  font-size: 13px;\n  font-weight: 600;\n}\n.scheme-field[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 1px;\n}\n\n.scheme-summary[_ngcontent-%COMP%] {\n  margin: 6px 0 0;\n  font-size: 0.74rem;\n  color: var(--tf-text-muted);\n}\n\n.add-exercise-btn[_ngcontent-%COMP%], .add-block-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 40px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  background: transparent;\n  border: 1px dashed var(--tf-border-strong);\n  border-radius: 10px;\n  color: var(--tf-text-secondary);\n  font-size: 0.82rem;\n  font-weight: 600;\n  cursor: pointer;\n}\n.add-exercise-btn[_ngcontent-%COMP%]:hover, .add-block-btn[_ngcontent-%COMP%]:hover {\n  border-color: var(--tf-accent);\n  color: var(--tf-accent);\n}\n\n.add-block-btn[_ngcontent-%COMP%] {\n  height: 44px;\n  border-color: var(--tf-border-strongest);\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  width: 100%;\n  height: 50px;\n  font-size: 0.92rem;\n}\n.submit-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvcm91dGluZXMvcGFnZXMvcm91dGluZS1idWlsZGVyL3JvdXRpbmUtYnVpbGRlci5wYWdlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX2lucHV0cy5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19idXR0b25zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJBO0VBQ0U7SUFDRSwyQkFBQTtFQ3hCRjtBQUNGO0FBQUE7RUFDRSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0FBRUY7O0FBQ0E7RURQRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7RUNPQSxtQkFBQTtBQUlGO0FEVEU7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsNEJBQUE7RUFDQSwrRUFBQTtFQUNBLG1DQUFBO0FDV0o7QURSRTtFQUNFO0lBQ0UsZUFBQTtFQ1VKO0FBQ0Y7O0FBWEE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0FBY0Y7O0FBWEE7RUFDRSxhQUFBO0FBY0Y7O0FBWEE7RUFDRSxhQUFBO0FBY0Y7O0FBWEE7RUFDRSxrQkFBQTtFQUNBLDJCQUFBO0VBQ0Esa0JBQUE7QUFjRjs7QUFUQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0VBQ0Esb0JBQUE7RUFDQSwyQkFBQTtBQVlGO0FBVkU7RUFDRSxlQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQkFBQTtBQVlKO0FBVEU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxTQUFBO0FBV0o7QUFSRTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZUFBQTtBQVVKOztBQU5BO0VBQ0UsZUFBQTtFQUNBLDJCQUFBO0VBQ0EsZUFBQTtFQUNBLCtCQUFBO0VBQ0EscUJBQUE7RUFDQSx5Q0FBQTtFQUNBLGtDQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxnRUFBQTtBQVNGO0FBUEU7RUFDRSxzQkFBQTtBQVNKOztBQUxBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0FBUUY7O0FBTEE7RUFDRSxtQkFBQTtBQVFGOztBQUxBO0VBQ0UsYUFBQTtFQUNBLFNBQUE7QUFRRjtBQU5FO0VBQ0UsT0FBQTtFQUNBLFlBQUE7QUFRSjtBQUxFO0VBQ0UsZ0JBQUE7QUFPSjs7QUFJQTtFQUNFO0lBQ0UscUJBQUE7SUFDQSxtQkFBQTtJQUNBLG1CQUFBO0VBREY7RUFJQTtJQUNFLGFBQUE7SUFDQSwrQ0FBQTtJQUNBLGtCQUFBO0lBQ0EsU0FBQTtJQUNBLGlCQUFBO0lBQ0EsY0FBQTtFQUZGO0VBS0E7SUFDRSxnQkFBQTtJQUNBLFNBQUE7SUFDQSxhQUFBO0lBQ0Esc0JBQUE7SUFDQSxTQUFBO0VBSEY7RUFNQTtJQUNFLGdCQUFBO0VBSkY7RUFPQTtJQUNFLGdCQUFBO0VBTEY7QUFDRjtBQVFBO0VBQ0UsY0FBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSwrQkFBQTtFQUNBLGtCQUFBO0FBTkY7QUFRRTtFQUNFLGFBQUE7QUFOSjs7QUFVQTtFQy9KRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsK0JENkowQjtFQzVKMUIseUNBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpREFBQTtFRDBKQSxrQkFBQTtFQUNBLFlBQUE7QUFBRjtBQ3pKRTtFQUNFLDhCQUFBO0FEMkpKOztBQUFBO0VDdEpFLDJCQUFBO0VBQ0EsY0FBQTtFRHVKQSxrQkFBQTtBQUlGOztBQURBO0VDdEpFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0Esb0JBQUE7RUFDQSxZQUFBO0VEaUpBLGtCQUFBO0FBV0Y7QUMxSkU7RUFDRSwyQkFBQTtBRDRKSjs7QUFYQTtFQUNFLFdBQUE7RUFDQSwrQkFBQTtFQUNBLGtDQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQWNGO0FBWkU7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7QUFjSjs7QUFWQTtFQUNFLGFBQUE7RUFDQSxxQ0FBQTtFQUNBLFFBQUE7QUFhRjs7QUFWQTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtFQUNBLHlDQUFBO0VBQ0EsK0JBQUE7RUFDQSwrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBYUY7QUFYRTtFQUNFLDhCQUFBO0VBQ0EsdUJBQUE7RUFDQSxpQ0FBQTtBQWFKOztBQVRBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7QUFZRjs7QUFUQTtFQUNFLCtCQUFBO0VBQ0Esa0NBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtBQVlGOztBQVRBO0VBQ0UsY0FBQTtFQUNBLFdBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxvQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7QUFZRjtBQVZFO0VBQ0UsbUNBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0FBWUo7O0FBUkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBV0Y7QUFURTtFQUNFLDJCQUFBO0FBV0o7O0FBSkE7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLDJCQUFBO0FBT0Y7O0FBSkE7RUFDRSxPQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0FBT0Y7O0FBSkE7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsNEJBQUE7RUFDQSxpQ0FBQTtFQUNBLDhDQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQU9GOztBQUpBO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSxTQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsMkJBQUE7QUFPRjs7QUFKQTtFQUNFLCtCQUFBO0VBQ0EseUNBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtBQU9GOztBQUpBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsOEJBQUE7RUFDQSxrQkFBQTtBQU9GOztBQUpBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0FBT0Y7O0FBSkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsMkJBQUE7RUFDQSxlQUFBO0FBT0Y7QUFMRTtFQUNFLHVCQUFBO0FBT0o7QUFKRTtFQUNFLG1DQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtBQU1KOztBQUdBO0VBQ0UsYUFBQTtFQUNBLDBEQUFBO0VBQ0EsUUFBQTtBQUFGOztBQUdBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtFQUNBLFlBQUE7QUFBRjtBQUVFO0VBQ0UsbUJBQUE7QUFBSjtBQUdFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7RUFDQSxzQkFBQTtFQUNBLDJCQUFBO0FBREo7QUFJRTtFQUNFLFdBQUE7RUFDQSwrQkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0JBQUE7RUFDQSxxQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FBRko7QUFJSTtFQUNFLG1DQUFBO0VBQ0EsbUJBQUE7QUFGTjs7QUFPQTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtFQUNBLDJCQUFBO0FBSkY7O0FBT0E7O0VBRUUsV0FBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFFBQUE7RUFDQSx1QkFBQTtFQUNBLDBDQUFBO0VBQ0EsbUJBQUE7RUFDQSwrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBSkY7QUFNRTs7RUFDRSw4QkFBQTtFQUNBLHVCQUFBO0FBSEo7O0FBT0E7RUFDRSxZQUFBO0VBQ0Esd0NBQUE7QUFKRjs7QUFPQTtFRTdaRSxZQUFBO0VBQ0EsbUJBRmlDO0VBR2pDLHFDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxnRkFBQTtFRnlaQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FBRUY7QUUzWkU7RUFDRSxzQkFBQTtBRjZaSjtBRTFaRTtFQUNFLGFBQUE7RUFDQSxlQUFBO0FGNFpKO0FFelpFO0VBQ0UsaUNBQUE7RUFDQSxtQkFBQTtBRjJaSiIsInNvdXJjZXNDb250ZW50IjpbIi8vIFNrZWxldG9uIGRlIGNhcmdhIGNvbiBiYXJyaWRvIGRlIHNoaW1tZXIgw6LCgMKUIG1pc21vIGJsb3F1ZSByZXBldGlkbyBsaXRlcmFsbWVudGVcbi8vIGVuIH4xMCBww4PCoWdpbmFzIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuXG4vLyBDYWRhIHDDg8KhZ2luYSBhcGxpY2EgZWwgbWl4aW4gc29icmUgc3UgcHJvcGlvIHNlbGVjdG9yIHkgYcODwrFhZGUgZW5jaW1hIHNvbG8gbG9cbi8vIHF1ZSB2YXLDg8KtYSAoYm9yZGVyLXJhZGl1cywgaGVpZ2h0LCB3aWR0aCwgdmFyaWFudGVzIGNvbiBub21icmUpLlxuQG1peGluIHRmLXNrZWxldG9uLXNoaW1tZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG5cbiAgJjo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldDogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgdHJhbnNwYXJlbnQsIHZhcigtLXRmLXNoaW1tZXIpLCB0cmFuc3BhcmVudCk7XG4gICAgYW5pbWF0aW9uOiB0Zi1zaGltbWVyIDEuNHMgaW5maW5pdGU7XG4gIH1cblxuICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xuICAgICY6OmFmdGVyIHtcbiAgICAgIGFuaW1hdGlvbjogbm9uZTtcbiAgICB9XG4gIH1cbn1cblxuQGtleWZyYW1lcyB0Zi1zaGltbWVyIHtcbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xuICB9XG59XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi8uLi8uLi90aGVtZS9za2VsZXRvbic7XG5AaW1wb3J0ICcuLi8uLi8uLi8uLi8uLi90aGVtZS9idXR0b25zJztcbkBpbXBvcnQgJy4uLy4uLy4uLy4uLy4uL3RoZW1lL2lucHV0cyc7XG5cbi5idWlsZGVyLWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLXRmLWJnKTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxNnB4O1xuICAtLXBhZGRpbmctZW5kOiAxNnB4O1xuICAtLXBhZGRpbmctdG9wOiAxMnB4O1xuICAtLXBhZGRpbmctYm90dG9tOiAyNHB4O1xufVxuXG4uc2tlbGV0b24tYmxvY2sge1xuICBAaW5jbHVkZSB0Zi1za2VsZXRvbi1zaGltbWVyO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xufVxuXG4vLyAtLS0gQ2FyZ2EgZGUgcMODwqFnaW5hIGNvbXBsZXRhOiBmb3JtYSBhcHJveGltYWRhIGRlbCBsYXlvdXQgZmluYWwgKHBhbmVsIGRlXG4vLyBtZXRhZGF0YSArIGJsb3F1ZXMpLCBubyBkb3MgYmxvcXVlcyBnZW7Dg8Kpcmljb3Mgw6LCgMKUIG1pc21vIGNyaXRlcmlvIHF1ZVxuLy8gZGFzaGJvYXJkLnBhZ2Uuc2NzcyAtLS1cbi5idWlsZGVyLXNrZWxldG9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxMnB4O1xufVxuXG4uc2tlbGV0b24tYmxvY2stLXNpZGViYXIge1xuICBoZWlnaHQ6IDIyMHB4O1xufVxuXG4uc2tlbGV0b24tYmxvY2stLWJsb2NrIHtcbiAgaGVpZ2h0OiAxMjBweDtcbn1cblxuLmVtcHR5LWhpbnQge1xuICBmb250LXNpemU6IDAuODZyZW07XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4vLyAtLS0gRXN0YWRvIGRlIGVycm9yIGRlIHDDg8KhZ2luYSBjb21wbGV0YSDDosKAwpQgbWlzbW8gcGF0csODwrNuIHF1ZVxuLy8gY2xpZW50cy5wYWdlLnNjc3MgLyBkYXNoYm9hcmQucGFnZS5zY3NzIChpY29ubyArIHTDg8KtdHVsbyArIHRleHRvICsgQ1RBKSAtLS1cbi5zdGF0ZS1tZXNzYWdlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBnYXA6IDEwcHg7XG4gIHBhZGRpbmc6IDk2cHggMzJweCAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dC1mYWludCk7XG4gICAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICB9XG5cbiAgaDIge1xuICAgIGZvbnQtc2l6ZTogMS4wNXJlbTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgICBtYXJnaW46IDA7XG4gIH1cblxuICBwIHtcbiAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICBsaW5lLWhlaWdodDogMS41O1xuICAgIG1heC13aWR0aDogMzRjaDtcbiAgICBtYXJnaW46IDAgMCA0cHg7XG4gIH1cbn1cblxuLnJldHJ5LWJ1dHRvbiB7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgaGVpZ2h0OiB2YXIoLS10Zi10b3VjaC1taW4pO1xuICBwYWRkaW5nOiAwIDIwcHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNSk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1zbSk7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45Nik7XG4gIH1cbn1cblxuLmJ1aWxkZXItbGF5b3V0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmJ1aWxkZXItc2VjdGlvbiB7XG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XG59XG5cbi5maWVsZC1wYWlyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxMnB4O1xuXG4gIC5maWVsZC1wYWlyLWNvbCB7XG4gICAgZmxleDogMTtcbiAgICBtaW4td2lkdGg6IDA7XG4gIH1cblxuICAuZmllbGQtbGFiZWwge1xuICAgIG1hcmdpbi10b3A6IDEycHg7XG4gIH1cbn1cblxuLy8gRGVza3RvcC93ZWIgw6LCgMKUIGFudGVzIHRvZG8gc2UgYXBpbGFiYSBlbiB1bmEgc29sYSBjb2x1bW5hIGEgbG8gYW5jaG8gZGUgbGFcbi8vIHZlbnRhbmEgKGNhbXBvcyBkZSBtZXRhZGF0YSBhIDEyMDBweCsgZGUgYW5jaG8gcGFyYSB1biBpbnB1dCBxdWUgc29sb1xuLy8gbmVjZXNpdGEgfjMwMHB4KS4gRWwgbm9tYnJlL2Rlc2NyaXBjacODwrNuL25pdmVsL2V0aXF1ZXRhcyBxdWVkYW4gZW4gdW5cbi8vIHBhbmVsIGZpam8gYSBsYSBpenF1aWVyZGEgw6LCgMKUIG5vIHNlIHBpZXJkZW4gZGUgdmlzdGEgYWwgYmFqYXIgcG9yIGxvc1xuLy8gYmxvcXVlcyDDosKAwpQgeSBcIkNvbnRlbmlkb1wiIHBhc2EgYSBzZXIgbGEgY29sdW1uYSBhbmNoYSwgcXVlIGVzIGRvbmRlIGRlXG4vLyB2ZXJkYWQgaGFjZSBmYWx0YSBlbCBlc3BhY2lvIChsYXMgZmlsYXMgZGUgc2VyaWVzL3JlcHMvUklSIHlhIG5vXG4vLyBuZWNlc2l0YW4gZW52b2x2ZXIpLlxuQG1lZGlhIChtaW4td2lkdGg6IDkwMHB4KSB7XG4gIC5idWlsZGVyLWNvbnRlbnQge1xuICAgIC0tcGFkZGluZy1zdGFydDogMjhweDtcbiAgICAtLXBhZGRpbmctZW5kOiAyOHB4O1xuICAgIC0tcGFkZGluZy10b3A6IDIwcHg7XG4gIH1cblxuICAuYnVpbGRlci1sYXlvdXQge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiBtaW5tYXgoMjgwcHgsIDM0MHB4KSAxZnI7XG4gICAgYWxpZ24taXRlbXM6IHN0YXJ0O1xuICAgIGdhcDogMjRweDtcbiAgICBtYXgtd2lkdGg6IDEyMjBweDtcbiAgICBtYXJnaW46IDAgYXV0bztcbiAgfVxuXG4gIC5idWlsZGVyLXNpZGViYXIge1xuICAgIHBvc2l0aW9uOiBzdGlja3k7XG4gICAgdG9wOiAyMHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBnYXA6IDE0cHg7XG4gIH1cblxuICAuYnVpbGRlci1zaWRlYmFyIC5idWlsZGVyLXNlY3Rpb24ge1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gIH1cblxuICAuYnVpbGRlci1tYWluIC5idWlsZGVyLXNlY3Rpb24ge1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gIH1cbn1cblxuLmZpZWxkLWxhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtc2l6ZTogMC43OHJlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgbWFyZ2luOiAxMnB4IDAgNnB4O1xuXG4gICY6Zmlyc3QtY2hpbGQge1xuICAgIG1hcmdpbi10b3A6IDA7XG4gIH1cbn1cblxuLmlucHV0LXdyYXBwZXIge1xuICBAaW5jbHVkZSB0Zi1pbnB1dC13cmFwcGVyKHZhcigtLXRmLXN1cmZhY2UtMikpO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogNDZweDtcbn1cblxuLmlucHV0LWljb24ge1xuICBAaW5jbHVkZSB0Zi1pbnB1dC1pY29uO1xuICBmb250LXNpemU6IDEuMDVyZW07XG59XG5cbi5pbnB1dC1maWVsZCB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LWZpZWxkO1xuICBmb250LXNpemU6IDAuODhyZW07XG59XG5cbi5idWlsZGVyLXRleHRhcmVhIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMik7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgcGFkZGluZzogMTBweCAxMnB4O1xuICBmb250LXNpemU6IDAuODhyZW07XG4gIHJlc2l6ZTogdmVydGljYWw7XG5cbiAgJjpmb2N1cyB7XG4gICAgb3V0bGluZTogbm9uZTtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIH1cbn1cblxuLmxldmVsLXBpY2tlciB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XG4gIGdhcDogOHB4O1xufVxuXG4ubGV2ZWwtb3B0aW9uIHtcbiAgaGVpZ2h0OiAzOHB4O1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgZm9udC1zaXplOiAwLjhyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcblxuICAmLnNlbGVjdGVkIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gICAgY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LXNvZnQpO1xuICB9XG59XG5cbi5zZWN0aW9uLWhlYWRpbmcge1xuICBmb250LXNpemU6IDAuOTVyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cblxuLmJsb2NrLWNhcmQge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTEpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4O1xufVxuXG4uYmxvY2staGVhZGVyIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBjb2xvcjogaW5oZXJpdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIH1cbn1cblxuLmJsb2NrLWhlYWRlci1tYWluIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA4cHg7XG5cbiAgPiBpb24taWNvbjpmaXJzdC1jaGlsZCB7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG59XG5cbi8vIFNlw4PCsWFsIGRlIHF1ZSBsYSBjYWJlY2VyYSBkZWwgYmxvcXVlIHNlIHB1ZWRlIHB1bHNhciAocmVub21icmFyL3JvbmRhcy9cbi8vIGJvcnJhcikgw6LCgMKUIGVuIG3Dg8KzdmlsIG5vIGhheSA6aG92ZXIgcXVlIGxvIGRpc3RpbmdhIGEgc2ltcGxlIHZpc3RhLCBtaXNtb1xuLy8gY3JpdGVyaW8gcXVlIC5zdGF0LWNoZXZyb24gZW4gZGFzaGJvYXJkLnBhZ2Uuc2Nzcy5cbi5ibG9jay1oZWFkZXItY2hldnJvbiB7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICBmb250LXNpemU6IDE2cHg7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LWZhaW50KTtcbn1cblxuLmJsb2NrLW5hbWUge1xuICBmbGV4OiAxO1xuICBmb250LXNpemU6IDAuOXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xufVxuXG4uYmxvY2stdHlwZS1iYWRnZSB7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDJlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudC10ZXh0KTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LXNvZnQpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQtc29mdC1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHBhZGRpbmc6IDJweCA3cHg7XG59XG5cbi5ibG9jay1oZWFkZXItbWV0YSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiAxMHB4O1xuICBtYXJnaW4tdG9wOiA0cHg7XG4gIGZvbnQtc2l6ZTogMC43MnJlbTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xufVxuXG4uZXhlcmNpc2Utcm93IHtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN1YnRsZSk7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbn1cblxuLmV4ZXJjaXNlLXJvdy1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIG1hcmdpbi1ib3R0b206IDhweDtcbn1cblxuLmV4ZXJjaXNlLW5hbWUge1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbn1cblxuLnJlbW92ZS1leGVyY2lzZS1idG4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDI2cHg7XG4gIGhlaWdodDogMjZweDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgJjpob3ZlciB7XG4gICAgY29sb3I6IHZhcigtLXRmLWRhbmdlcik7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAxcHg7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICB9XG59XG5cbi8vIEdyaWQgZW4gdmV6IGRlIGZsZXgtd3JhcDogY29uIGZsZXgtd3JhcCBsYXMgZmlsYXMgZGUgY2FtcG9zIChzZXJpZXMvcmVwcy9cbi8vIFJJUikgc2UgcXVlZGFiYW4gcGVnYWRhcyBhIGxhIGl6cXVpZXJkYSBzaW4gdXNhciBlbCBhbmNobyBkZWwgYmxvcXVlIGVuXG4vLyBkZXNrdG9wIChlbCBibG9xdWUgcHVlZGUgbGxlZ2FyIGEgODAwcHgrIHkgbG9zIGlucHV0cyBhIDU2cHgpLiBDb24gZ3JpZCArXG4vLyBhdXRvLWZpdCBsYXMgY29sdW1uYXMgc2UgcmVwYXJ0ZW4gZWwgYW5jaG8gZGlzcG9uaWJsZSBlbnRyZSBzw4PCrSDDosKAwpQgZW4gbcODwrN2aWxcbi8vIGNhYmVuIG1lbm9zIGNvbHVtbmFzIHkgbmluZ3VuYSBxdWVkYSBodcODwqlyZmFuYSBvY3VwYW5kbyBzb2xvIHN1IG3Dg8Ktbmltby5cbi5zY2hlbWUtZmllbGRzIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maXQsIG1pbm1heCg2MHB4LCAxZnIpKTtcbiAgZ2FwOiA4cHg7XG59XG5cbi5zY2hlbWUtZmllbGQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDJweDtcbiAgbWluLXdpZHRoOiAwO1xuXG4gICYtLXdpZGUge1xuICAgIGdyaWQtY29sdW1uOiBzcGFuIDI7XG4gIH1cblxuICBzcGFuIHtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGxldHRlci1zcGFjaW5nOiAwLjAzZW07XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG5cbiAgaW5wdXQge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgICBib3JkZXItcmFkaXVzOiA2cHg7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICAgIHBhZGRpbmc6IDVweCA2cHg7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG5cbiAgICAmOmZvY3VzLXZpc2libGUge1xuICAgICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgICBvdXRsaW5lLW9mZnNldDogMXB4O1xuICAgIH1cbiAgfVxufVxuXG4uc2NoZW1lLXN1bW1hcnkge1xuICBtYXJnaW46IDZweCAwIDA7XG4gIGZvbnQtc2l6ZTogMC43NHJlbTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xufVxuXG4uYWRkLWV4ZXJjaXNlLWJ0bixcbi5hZGQtYmxvY2stYnRuIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNDBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGdhcDogNnB4O1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiAxcHggZGFzaGVkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBmb250LXNpemU6IDAuODJyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcblxuICAmOmhvdmVyIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gICAgY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIH1cbn1cblxuLmFkZC1ibG9jay1idG4ge1xuICBoZWlnaHQ6IDQ0cHg7XG4gIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYm9yZGVyLXN0cm9uZ2VzdCk7XG59XG5cbi5zdWJtaXQtYnV0dG9uIHtcbiAgQGluY2x1ZGUgdGYtZ3JhZGllbnQtYnV0dG9uO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA1MHB4O1xuICBmb250LXNpemU6IDAuOTJyZW07XG59XG4iLCIvLyBGaWxhIGRlIGlucHV0IGNvbiBpY29ubyAod3JhcHBlciArIGljb25vICsgY2FtcG8pIMOiwoDClCByZXBldGlkYSBlbiA0IHDDg8KhZ2luYXNcbi8vIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuIEVsIGZvbmRvXG4vLyBkZWwgd3JhcHBlciBlcyBlbCDDg8K6bmljbyB2YWxvciBxdWUgdmFyw4PCrWEgcG9yIHDDg8KhZ2luYSAoc3VwZXJmaWNpZSAxIG8gMiBzZWfDg8K6blxuLy8gY29udGV4dG8gdmlzdWFsKSwgZGUgYWjDg8KtIGVsIHBhcsODwqFtZXRybzsgdGFtYcODwrFvIGRlIGZ1ZW50ZS9hbHRvL21hcmdlbiBzZVxuLy8gZGVqYW4gZnVlcmEgZGVsIG1peGluIHBvcnF1ZSBjYWRhIHDDg8KhZ2luYSBsb3MgZmlqYSBzZWfDg8K6biBzdSBwcm9waW8gbGF5b3V0LlxuQG1peGluIHRmLWlucHV0LXdyYXBwZXIoJGJnOiB2YXIoLS10Zi1zdXJmYWNlLTEpKSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgYmFja2dyb3VuZDogJGJnO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMCAxNHB4O1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6Zm9jdXMtd2l0aGluIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIH1cbn1cblxuQG1peGluIHRmLWlucHV0LWljb24ge1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG5AbWl4aW4gdGYtaW5wdXQtZmllbGQge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGhlaWdodDogMTAwJTtcblxuICAmOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG59XG4iLCIvLyBCb3TDg8KzbiBDVEEgY29uIGdyYWRpZW50ZSBkZSBhY2VudG8gw6LCgMKUIG1pc21vIGJsb3F1ZSByZXBldGlkbyBlbiB+MTEgc2l0aW9zIGRlXG4vLyB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgcG9yIGxheW91dCAod2lkdGgsIGhlaWdodCwgZm9udC1zaXplLCBtYXJnaW4pLlxuLy9cbi8vIExhIG1pdGFkIGRlIGxvcyBzaXRpb3Mgb3JpZ2luYWxlcyBubyB0ZW7Dg8KtYW4gdHJhbnNpY2nDg8Kzbi9mZWVkYmFjayBkZSBwdWxzYWNpw4PCs25cbi8vIG5pIDpmb2N1cy12aXNpYmxlIMOiwoDClCBlbCBtaXhpbiBsb3MgYcODwrFhZGUgc2llbXByZSwgY2llcnJhIGVzZSBodWVjbyBkZVxuLy8gY29uc2lzdGVuY2lhIGRlIGludGVyYWNjacODwrNuIChQUk9EVUNULm1kOiBcInVuIHNvbG8gcGF0csODwrNuIHBvciB0aXBvIGRlXG4vLyBjb21wb25lbnRlXCIpIGVuIHZleiBkZSBwZXJwZXR1YXIgbGEgdmFyaWFjacODwrNuIGFjY2lkZW50YWwuXG5AbWl4aW4gdGYtZ3JhZGllbnQtYnV0dG9uKCRyYWRpdXM6IDEycHgpIHtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAkcmFkaXVzO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtZ3JhZGllbnQpO1xuICBjb2xvcjogdmFyKC0tdGYtYWNjZW50LWNvbnRyYXN0KTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpLCBvcGFjaXR5IDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk3KTtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNDU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtdGV4dCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxufVxuXG4vLyBCb3TDg8KzbiBkZSBoZWFkZXIgcXVlIGVzIHNvbG8gdW4gaWNvbm8gw6LCgMKUIG1pc21vIGxvb2sgXCJlbnZ1ZWx0b1wiIHF1ZSB5YSB1c2EgbGFcbi8vIGFwcCBkZSBjb25zdW1pZG9yIGVuIHN1cyB0b29sYmFycyAocGFja2FnZXMvc2hhcmVkLWZlYXR1cmVzLy4uLi9kaWV0cy9cbi8vIGNvbXBvbmVudHMvdG9vbGJhci1jYWxlbmRhcjogZm9uZG8gKyBib3JkZXItcmFkaXVzICsgY2FqYSBmaWphIDQ0eDQ0LCBlblxuLy8gdmV6IGRlbCBpb24tYnV0dG9uIHBsYW5vL3RyYW5zcGFyZW50ZSBxdWUgdGVuw4PCrWEgY2FkYSBwYW50YWxsYSBkZSB0cmFpbmVyc1xuLy8gaGFzdGEgYWhvcmEpLiBUb2tlbmVhZG8gYSBsYSBwYWxldGEgZGUgZXN0YSBhcHAgZW4gdmV6IGRlIHJlcGV0aXIgbG9zXG4vLyByZ2JhKDI1NSwyNTUsMjU1LC4uLikgc3VlbHRvcyBkZWwgb3JpZ2luYWwuXG4vL1xuLy8gU2lydmUgdGFudG8gcGFyYSA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIj4gKHVzYSBsYXMgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzXG4vLyBkZSBJb25pYykgY29tbyBwYXJhIHVuIDxidXR0b24+IG5hdGl2byAodXNhIGxhcyBwcm9waWVkYWRlcyBwbGFuYXMpIMOiwoDClFxuLy8gYW1ib3MgY29leGlzdGVuIGhveSBlbiB0cmFpbmVycyBwYXJhIGVsIG1pc21vIHJvbCBkZSBcInZvbHZlclwiL1wiY2VycmFyXCIuXG5AbWl4aW4gdGYtaWNvbi1idXR0b24oJHNpemU6IDQ0cHgsICRyYWRpdXM6IDEycHgsICRpY29uLXNpemU6IDIwcHgpIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICAtLWJhY2tncm91bmQtYWN0aXZhdGVkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtaG92ZXI6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIC0tYmFja2dyb3VuZC1mb2N1c2VkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIC0tYm9yZGVyLXJhZGl1czogI3skcmFkaXVzfTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAtLXBhZGRpbmctZW5kOiAwO1xuICAtLXBhZGRpbmctdG9wOiAwO1xuICAtLXBhZGRpbmctYm90dG9tOiAwO1xuXG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgd2lkdGg6ICRzaXplO1xuICBoZWlnaHQ6ICRzaXplO1xuICBtaW4td2lkdGg6ICRzaXplO1xuICBtaW4taGVpZ2h0OiAkc2l6ZTtcbiAgbWFyZ2luOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICBjb2xvciB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAkaWNvbi1zaXplO1xuICB9XG59XG5cbi8vIEV4cGFuc29yIGludmlzaWJsZSBkZSB6b25hIHB1bHNhYmxlLlxuLy9cbi8vIFBBUkEgUVXDg8KJOiB1biBjb250cm9sIGNvbXBhY3RvICh1biBpY29ubyBkZSAzMiBweCBlbiB1bmEgZmlsYSBkZSB0YWJsYSwgdW5cbi8vIGVubGFjZSBkZSB0ZXh0byBkZSAxNiBweCkgbm8gbGxlZ2EgYSBsb3MgNDQgcHggcXVlIGV4aWdlIFBST0RVQ1QubWQsIHlcbi8vIGVuZ29yZGFybG8gZGUgdmVyZGFkIGRlc3BsYXphIHRvZG8gbG8gcXVlIHRpZW5lIGFscmVkZWRvciDDosKAwpQgZW4gdW5hIHRhYmxhXG4vLyBkZSB2ZWludGUgZmlsYXMsIDggcHggcG9yIGZpbGEgc29uIG1lZGlhIHBhbnRhbGxhLlxuLy9cbi8vIEVsIHBzZXVkb2VsZW1lbnRvIGNyZWNlIGhhY2lhIGZ1ZXJhIHNpbiBvY3VwYXIgc2l0aW8gZW4gZWwgZmx1am8sIGFzw4PCrSBxdWVcbi8vIGVsIGJvdMODwrNuIHNlIHZlIHBlcXVlw4PCsW8geSBzZSBwdWxzYSBncmFuZGUuXG4vL1xuLy8gQVZJU08gREUgTUVESUNJw4PCk046IGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIE5PIHZlIGVzdGUgcHNldWRvZWxlbWVudG8sIGFzw4PCrVxuLy8gcXVlIGFsIHZlcmlmaWNhciBoYXkgcXVlIHVzYXIgZWxlbWVudEZyb21Qb2ludCBjb24gZWwgZWxlbWVudG8gZGVudHJvIGRlbFxuLy8gdmlld3BvcnQuIEFkZW3Dg8KhcyBlbCBoaXQtdGVzdCBkZXZ1ZWx2ZSAyIHB4IG1lbm9zIHF1ZSBsYSBjYWphIGRlY2xhcmFkYVxuLy8gKGNvbXByb2JhZG86IC00cHggZGEgNDIsIC02cHggZGEgNDYpLCBhc8ODwq0gcXVlIHVuIDQyIG1lZGlkbyBzb24gNDQgcmVhbGVzLlxuLy9cbi8vICRncm93OiBjdcODwqFudG8gY3JlY2UgcG9yIGNhZGEgbGFkby4gNHB4IGxsZXZhIHVuIGNvbnRyb2wgZGUgMzYgcHggYSA0NC5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlcigkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldDogLSN7JGdyb3d9O1xuICB9XG59XG5cbi8vIFZhcmlhbnRlIHF1ZSBzb2xvIGNyZWNlIGVuIFZFUlRJQ0FMLiBQYXJhIGNvbnRyb2xlcyBlbiBmaWxhIGRvbmRlIGVsXG4vLyBleHBhbnNvciBob3Jpem9udGFsIHNlIHNvbGFwYXLDg8KtYSBjb24gZWwgZGUgYWwgbGFkbyB5IHJvYmFyw4PCrWEgc3VzIHRvcXVlcy5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlci15KCRncm93OiA0cHgpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogLSN7JGdyb3d9O1xuICAgIGJvdHRvbTogLSN7JGdyb3d9O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
}));


/***/ }),

/***/ 73182:
/*!*********************************************************************************!*\
  !*** ./src/app/features/routines/pages/routine-builder/template-scheme.util.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   buildSetsFromScheme: () => (/* binding */ buildSetsFromScheme),
/* harmony export */   defaultSchemeFor: () => (/* binding */ defaultSchemeFor),
/* harmony export */   schemeFromExistingSets: () => (/* binding */ schemeFromExistingSets),
/* harmony export */   schemeSummary: () => (/* binding */ schemeSummary)
/* harmony export */ });
function defaultSchemeFor(exercise) {
  if (exercise?.isCardio) {
    return {
      kind: 'cardio',
      count: 3,
      expectedTime: '',
      expectedDistance: null
    };
  }
  if (exercise?.isIsometric) {
    return {
      kind: 'isometric',
      count: 3,
      expectedTime: ''
    };
  }
  return {
    kind: 'normal',
    count: 3,
    repsMin: 8,
    repsMax: 12,
    rirMin: 1,
    rirMax: 2
  };
}
// Reconstruye un esquema editable a partir de series ya existentes (al abrir
// una plantilla guardada) — toma la primera serie como representativa, mismo
// criterio que schemeFromExistingSets en el componente ya borrado.
function schemeFromExistingSets(sets, exercise) {
  const list = sets || [];
  if (!list.length) return defaultSchemeFor(exercise);
  const first = list[0];
  if (exercise?.isCardio) {
    return {
      kind: 'cardio',
      count: list.length,
      expectedTime: first.expectedTime || '',
      expectedDistance: first.expectedDistance ?? null
    };
  }
  if (exercise?.isIsometric) {
    return {
      kind: 'isometric',
      count: list.length,
      expectedTime: first.expectedTime || ''
    };
  }
  const reps = first.expectedReps || [];
  const rir = first.expectedRir || [];
  return {
    kind: 'normal',
    count: list.length,
    repsMin: reps[0] ?? 8,
    repsMax: reps[1] ?? reps[0] ?? 12,
    rirMin: rir[0] ?? 1,
    rirMax: rir[1] ?? rir[0] ?? 2
  };
}
function buildSetsFromScheme(scheme) {
  const count = Math.max(1, Math.min(20, Math.round(scheme.count) || 1));
  if (scheme.kind === 'cardio') {
    const expectedTime = (scheme.expectedTime || '').trim();
    const expectedDistance = scheme.expectedDistance ?? null;
    return Array.from({
      length: count
    }, () => ({
      expectedReps: [],
      expectedRir: [],
      expectedTime,
      expectedDistance
    }));
  }
  if (scheme.kind === 'isometric') {
    const expectedTime = (scheme.expectedTime || '').trim();
    return Array.from({
      length: count
    }, () => ({
      expectedReps: [],
      expectedRir: [],
      expectedTime,
      expectedDistance: null
    }));
  }
  const repsMin = Math.max(0, Math.round(scheme.repsMin) || 0);
  const repsMax = Math.max(repsMin, Math.round(scheme.repsMax) || repsMin);
  const rirMin = Number.isFinite(scheme.rirMin) ? Math.round(scheme.rirMin) : 0;
  const rirMax = Math.max(rirMin, Number.isFinite(scheme.rirMax) ? Math.round(scheme.rirMax) : rirMin);
  return Array.from({
    length: count
  }, () => ({
    expectedReps: [repsMin, repsMax],
    expectedRir: [rirMin, rirMax],
    expectedTime: '',
    expectedDistance: null
  }));
}
function schemeSummary(scheme) {
  if (scheme.kind === 'cardio') {
    const time = scheme.expectedTime || '—';
    const distance = scheme.expectedDistance ? ` · ${scheme.expectedDistance} km` : '';
    return `${scheme.count} × ${time}${distance}`;
  }
  if (scheme.kind === 'isometric') {
    return `${scheme.count} × ${scheme.expectedTime || '—'}`;
  }
  return `${scheme.count} × ${scheme.repsMin}-${scheme.repsMax} reps · RIR ${scheme.rirMin}-${scheme.rirMax}`;
}

/***/ }),

/***/ 76050:
/*!**************************************************************!*\
  !*** ./src/app/features/routines/routines-routing.module.ts ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoutinesPageRoutingModule: () => (/* binding */ RoutinesPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _routines_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routines.page */ 59956);
/* harmony import */ var _pages_routine_builder_routine_builder_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pages/routine-builder/routine-builder.page */ 82601);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);

var _RoutinesPageRoutingModule;





const routes = [{
  path: '',
  component: _routines_page__WEBPACK_IMPORTED_MODULE_1__.RoutinesPage
}, {
  path: ':id',
  component: _pages_routine_builder_routine_builder_page__WEBPACK_IMPORTED_MODULE_2__.RoutineBuilderPage
}];
class RoutinesPageRoutingModule {}
_RoutinesPageRoutingModule = RoutinesPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RoutinesPageRoutingModule, "\u0275fac", function RoutinesPageRoutingModule_Factory(t) {
  return new (t || _RoutinesPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RoutinesPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _RoutinesPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RoutinesPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](RoutinesPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
  });
})();

/***/ }),

/***/ 18171:
/*!******************************************************!*\
  !*** ./src/app/features/routines/routines.module.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoutinesPageModule: () => (/* binding */ RoutinesPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _routines_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routines-routing.module */ 76050);
/* harmony import */ var _routines_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routines.page */ 59956);
/* harmony import */ var _pages_routine_builder_routine_builder_page__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/routine-builder/routine-builder.page */ 82601);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 69717);

var _RoutinesPageModule;





class RoutinesPageModule {}
_RoutinesPageModule = RoutinesPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RoutinesPageModule, "\u0275fac", function RoutinesPageModule_Factory(t) {
  return new (t || _RoutinesPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RoutinesPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
  type: _RoutinesPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RoutinesPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _routines_routing_module__WEBPACK_IMPORTED_MODULE_2__.RoutinesPageRoutingModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](RoutinesPageModule, {
    declarations: [_routines_page__WEBPACK_IMPORTED_MODULE_3__.RoutinesPage, _pages_routine_builder_routine_builder_page__WEBPACK_IMPORTED_MODULE_4__.RoutineBuilderPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _routines_routing_module__WEBPACK_IMPORTED_MODULE_2__.RoutinesPageRoutingModule]
  });
})();

/***/ }),

/***/ 59956:
/*!****************************************************!*\
  !*** ./src/app/features/routines/routines.page.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoutinesPage: () => (/* binding */ RoutinesPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_workout_template_workout_template_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/workout-template/workout-template-api.service */ 80441);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 54844);


var _RoutinesPage;







function RoutinesPage_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Crear plantilla");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function RoutinesPage_ion_spinner_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ion-spinner", 21);
  }
}
function RoutinesPage_div_20_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "div", 24);
  }
}
const _c0 = function () {
  return [1, 2, 3];
};
function RoutinesPage_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, RoutinesPage_div_20_div_1_Template, 1, 0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](1, _c0));
  }
}
function RoutinesPage_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "ion-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Todav\u00EDa no tienes plantillas");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Crea la primera con el formulario de arriba para reutilizarla con cualquier cliente.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function RoutinesPage_div_22_div_1_p_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const template_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", template_r8.description, " ");
  }
}
function RoutinesPage_div_22_div_1_div_7_span_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const tag_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](tag_r13);
  }
}
function RoutinesPage_div_22_div_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, RoutinesPage_div_22_div_1_div_7_span_1_Template, 2, 1, "span", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const template_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", template_r8.tags);
  }
}
function RoutinesPage_div_22_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function RoutinesPage_div_22_div_1_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r16);
      const template_r8 = restoredCtx.$implicit;
      const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r15.openTemplate(template_r8));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 30)(2, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "span", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, RoutinesPage_div_22_div_1_p_6_Template, 2, 1, "p", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, RoutinesPage_div_22_div_1_div_7_Template, 2, 1, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 35)(9, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](11, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "div", 36)(14, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function RoutinesPage_div_22_div_1_Template_button_click_14_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r16);
      const template_r8 = restoredCtx.$implicit;
      const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r17.duplicateTemplate(template_r8, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, " Duplicar ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function RoutinesPage_div_22_div_1_Template_button_click_16_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r16);
      const template_r8 = restoredCtx.$implicit;
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r18.confirmDelete(template_r8, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](17, " Borrar ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const template_r8 = ctx.$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](template_r8.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r7.levelLabels[template_r8.level]);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", template_r8.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", template_r8.tags == null ? null : template_r8.tags.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r7.blockCount(template_r8), " bloques");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r7.exerciseCount(template_r8), " ejercicios");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx_r7.isDuplicating);
  }
}
function RoutinesPage_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, RoutinesPage_div_22_div_1_Template, 18, 7, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r4.templates)("ngForTrackBy", ctx_r4.trackByTemplateId);
  }
}
const LEVEL_LABELS = {
  principiante: 'Principiante',
  intermedio: 'Intermedio',
  avanzado: 'Avanzado'
};
// Rediseño de entrenamiento (Fase A) — hub "Plantillas de rutinas" conectado
// a datos reales (WorkoutTemplate). El contenido (bloques/ejercicios/series)
// ahora SÍ se autoría directamente aquí — ver RoutineBuilderPage
// (pages/routine-builder/), única superficie de edición (mismo patrón que
// diet-templates: lista con creación inline por nombre + página de builder
// con ruta propia ':id', sin autosave). Ya no hay un alert de edición de
// metadata aparte — evita dos caminos divergentes para lo mismo.
class RoutinesPage {
  constructor(workoutTemplateApi, ionicUtilService, router) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "workoutTemplateApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "templates", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "loading", true);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "newName", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isCreating", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isDuplicating", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "levelLabels", LEVEL_LABELS);
    this.workoutTemplateApi = workoutTemplateApi;
    this.ionicUtilService = ionicUtilService;
    this.router = router;
  }
  ngOnInit() {
    this.loadTemplates();
  }
  // ion-router-outlet cachea la página al volver del builder (push/pop) —
  // sin esto, "Volver" desde routine-builder.page.ts mostraría la lista
  // desactualizada (la plantilla recién creada/editada no aparecería hasta
  // un refresco manual). ngOnInit solo se dispara una vez por instancia.
  ionViewWillEnter() {
    this.loadTemplates();
  }
  loadTemplates() {
    this.loading = true;
    this.workoutTemplateApi.list().subscribe({
      next: templates => {
        this.templates = templates;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.ionicUtilService.showToast({
          message: 'No se pudieron cargar las plantillas',
          duration: 2500
        });
      }
    });
  }
  exerciseCount(template) {
    return (template.blocks || []).reduce((total, block) => total + (block.exercises?.length || 0), 0);
  }
  blockCount(template) {
    return (template.blocks || []).length;
  }
  trackByTemplateId(_index, template) {
    return template._id;
  }
  createAndEdit() {
    const name = this.newName.trim();
    if (!name || this.isCreating) return;
    this.isCreating = true;
    this.workoutTemplateApi.create({
      name
    }).subscribe({
      next: template => {
        this.isCreating = false;
        this.newName = '';
        this.openTemplate(template);
      },
      error: () => {
        this.isCreating = false;
        this.ionicUtilService.showToast({
          message: 'No se pudo crear la plantilla',
          duration: 2500
        });
      }
    });
  }
  openTemplate(template) {
    this.router.navigate(['/tabs/routines', template._id]);
  }
  // TASK-039 (MASTER_BACKLOG.md) — antes, una variante ligera de una
  // plantilla existente exigía reconstruirla íntegra desde cero. Duplica
  // en el frontend (sin endpoint nuevo): create() ya acepta blocks
  // completos. exercise viene poblado ({_id, name}) en el listado — se
  // normaliza al id string plano, mismo criterio que
  // routine-builder.page.ts#save() al guardar.
  duplicateTemplate(template, event) {
    event.stopPropagation();
    if (this.isDuplicating) return;
    this.isDuplicating = true;
    this.workoutTemplateApi.create({
      name: `${template.name} (copia)`,
      description: template.description,
      level: template.level,
      tags: template.tags,
      equipment: template.equipment,
      blocks: (template.blocks || []).map(block => ({
        ...block,
        exercises: (block.exercises || []).map(ex => ({
          ...ex,
          exercise: typeof ex.exercise === 'string' ? ex.exercise : ex.exercise._id
        }))
      }))
    }).subscribe({
      next: created => {
        this.isDuplicating = false;
        this.templates = [created, ...this.templates];
        this.ionicUtilService.showToast({
          message: 'Plantilla duplicada',
          duration: 1500
        });
      },
      error: () => {
        this.isDuplicating = false;
        this.ionicUtilService.showToast({
          message: 'No se pudo duplicar la plantilla',
          duration: 2500
        });
      }
    });
  }
  confirmDelete(template, event) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      event.stopPropagation();
      yield _this.ionicUtilService.showAlert({
        header: 'Borrar plantilla',
        message: `¿Seguro que quieres borrar "${template.name}"? Esta acción no se puede deshacer.`,
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Borrar',
          cssClass: 'alert-button-danger',
          handler: () => {
            _this.workoutTemplateApi.delete(template._id).subscribe({
              next: () => {
                _this.templates = _this.templates.filter(t => t._id !== template._id);
                _this.ionicUtilService.showToast({
                  message: 'Plantilla borrada',
                  duration: 1500
                });
              },
              error: () => {
                _this.ionicUtilService.showToast({
                  message: 'No se pudo borrar la plantilla',
                  duration: 2500
                });
              }
            });
          }
        }]
      });
    })();
  }
}
_RoutinesPage = RoutinesPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RoutinesPage, "\u0275fac", function RoutinesPage_Factory(t) {
  return new (t || _RoutinesPage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_core_services_workout_template_workout_template_api_service__WEBPACK_IMPORTED_MODULE_2__.WorkoutTemplateApiService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_3__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RoutinesPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _RoutinesPage,
  selectors: [["app-routines"]],
  decls: 23,
  vars: 7,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["aria-label", "Abrir men\u00FA de navegaci\u00F3n", 1, "tf-page-header__back-button"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "routines-content"], [1, "templates-page"], [1, "templates-hint"], [1, "create-bar"], [1, "input-wrapper"], ["name", "albums-outline", 1, "input-icon"], ["type", "text", "placeholder", "Plantilla d\u00EDa de empuje", 1, "input-field", 3, "ngModel", "ngModelChange", "keyup.enter"], ["type", "button", 1, "submit-button", 3, "disabled", "click"], [4, "ngIf"], ["name", "dots", 4, "ngIf"], ["class", "templates-skeleton", 4, "ngIf"], ["class", "state-message", 4, "ngIf"], ["class", "templates-grid", 4, "ngIf"], ["name", "dots"], [1, "templates-skeleton"], ["class", "skeleton-block template-card-skeleton", 4, "ngFor", "ngForOf"], [1, "skeleton-block", "template-card-skeleton"], [1, "state-message"], ["name", "albums-outline"], [1, "templates-grid"], ["class", "template-card", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "template-card", 3, "click"], [1, "template-card-header"], [1, "template-name"], [1, "template-level"], ["class", "template-description", 4, "ngIf"], ["class", "template-tags", 4, "ngIf"], [1, "template-meta"], [1, "template-card-actions"], ["type", "button", 1, "secondary-button", 3, "disabled", "click"], ["type", "button", 1, "danger-button", 3, "click"], [1, "template-description"], [1, "template-tags"], ["class", "template-tag", 4, "ngFor", "ngForOf"], [1, "template-tag"]],
  template: function RoutinesPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "ion-menu-button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 5)(6, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Plantillas de entrenamientos");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "ion-content", 8)(10, "div", 9)(11, "p", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, " Crea una plantilla con sus bloques, ejercicios y series prescritas, y apl\u00EDcala a cualquier cliente desde el Planificador en lugar de construir cada entrenamiento desde cero. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "div", 11)(14, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](15, "ion-icon", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "input", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function RoutinesPage_Template_input_ngModelChange_16_listener($event) {
        return ctx.newName = $event;
      })("keyup.enter", function RoutinesPage_Template_input_keyup_enter_16_listener() {
        return ctx.createAndEdit();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "button", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function RoutinesPage_Template_button_click_17_listener() {
        return ctx.createAndEdit();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, RoutinesPage_span_18_Template, 2, 0, "span", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](19, RoutinesPage_ion_spinner_19_Template, 1, 0, "ion-spinner", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](20, RoutinesPage_div_20_Template, 2, 2, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](21, RoutinesPage_div_21_Template, 6, 0, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](22, RoutinesPage_div_22_Template, 2, 2, "div", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](16);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.newName);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", !ctx.newName.trim() || ctx.isCreating);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.isCreating);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isCreating);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.loading);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.templates.length === 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.templates.length > 0);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonMenuButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_8__.IonSpinner],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-card-in {\n  from {\n    opacity: 0;\n    transform: translateY(6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.routines-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n}\n\n.templates-page[_ngcontent-%COMP%] {\n  max-width: 1080px;\n  margin: 0 auto;\n  padding: var(--tf-space-5);\n}\n\n.templates-hint[_ngcontent-%COMP%] {\n  margin: 0 0 var(--tf-space-4);\n  font-size: var(--tf-font-size-sm);\n  line-height: var(--tf-line-height-base);\n  color: var(--tf-text-muted);\n}\n\n.create-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-3);\n  margin-bottom: var(--tf-space-5);\n}\n@media (min-width: 640px) {\n  .create-bar[_ngcontent-%COMP%] {\n    flex-direction: row;\n  }\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n  flex: 1;\n  height: 46px;\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  flex-shrink: 0;\n  font-size: 1.1rem;\n}\n\n.input-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n  font-size: var(--tf-font-size-base);\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  height: 46px;\n  padding: 0 var(--tf-space-5);\n  font-size: 0.92rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  white-space: nowrap;\n}\n.submit-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n@media (max-width: 639px) {\n  .submit-button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n\n.templates-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--tf-space-4);\n}\n\n.skeleton-block[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n  border-radius: var(--tf-radius-lg);\n}\n.skeleton-block[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n\n.template-card-skeleton[_ngcontent-%COMP%] {\n  flex: 1 1 260px;\n  max-width: 420px;\n  height: 168px;\n}\n\n.state-message[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 10px;\n  padding: var(--tf-space-8) var(--tf-space-4) 0;\n  color: var(--tf-text-muted);\n}\n.state-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  color: var(--tf-text-faint);\n  margin-bottom: 6px;\n}\n.state-message[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: var(--tf-text);\n  margin: 0;\n}\n.state-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  line-height: 1.5;\n  max-width: 34ch;\n  margin: 0;\n}\n\n.templates-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--tf-space-4);\n}\n\n.template-card[_ngcontent-%COMP%] {\n  flex: 1 1 260px;\n  max-width: 420px;\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n  padding: var(--tf-space-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-2);\n  background: var(--tf-surface-2);\n  cursor: pointer;\n  transition: border-color var(--tf-duration-fast) var(--tf-ease-out), transform var(--tf-duration-fast) var(--tf-ease-out);\n  animation: _ngcontent-%COMP%_tf-card-in 320ms var(--tf-ease-out) backwards;\n}\n@media (prefers-reduced-motion: reduce) {\n  .template-card[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n.template-card[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 0ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 35ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 70ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(4) {\n  animation-delay: 105ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(5) {\n  animation-delay: 140ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(6) {\n  animation-delay: 175ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(7) {\n  animation-delay: 210ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(8) {\n  animation-delay: 245ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(9) {\n  animation-delay: 280ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(10) {\n  animation-delay: 315ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(11) {\n  animation-delay: 350ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(12) {\n  animation-delay: 385ms;\n}\n.template-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--tf-border-strong);\n}\n.template-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n\n.template-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: var(--tf-space-2);\n}\n\n.template-name[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-base);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.template-level[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 11px;\n  font-weight: 700;\n  letter-spacing: 0.02em;\n  text-transform: uppercase;\n  color: var(--tf-accent-text);\n  background: var(--tf-accent-soft);\n  border: 1px solid var(--tf-accent-soft-border);\n  border-radius: var(--tf-radius-sm);\n  padding: 2px 8px;\n}\n\n.template-description[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-secondary);\n}\n\n.template-tags[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n\n.template-tag[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--tf-text-muted);\n  background: var(--tf-surface-4);\n  border-radius: var(--tf-radius-sm);\n  padding: 2px 8px;\n}\n\n.template-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--tf-space-3);\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-muted);\n}\n\n.template-card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--tf-space-2);\n  margin-top: var(--tf-space-2);\n}\n\n.secondary-button[_ngcontent-%COMP%], .danger-button[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 38px;\n  border-radius: 10px;\n  padding: 0 15px;\n  font-size: var(--tf-font-size-sm);\n  font-weight: 700;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform var(--tf-duration-fast) var(--tf-ease-out);\n}\n.secondary-button[_ngcontent-%COMP%]:active, .danger-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.secondary-button[_ngcontent-%COMP%]:focus-visible, .danger-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.secondary-button[_ngcontent-%COMP%]:disabled, .danger-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.6;\n  cursor: default;\n}\n\n.secondary-button[_ngcontent-%COMP%] {\n  background: var(--tf-surface-4);\n  color: var(--tf-text);\n  border: none;\n}\n\n.danger-button[_ngcontent-%COMP%] {\n  background: var(--tf-danger-soft);\n  color: var(--tf-danger);\n  border: 1px solid var(--tf-danger-border);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvcm91dGluZXMvcm91dGluZXMucGFnZS5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19hbmltYXRpb25zLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX2lucHV0cy5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19idXR0b25zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJBO0VBQ0U7SUFDRSwyQkFBQTtFQ3hCRjtBQUNGO0FDdUJBO0VBQ0U7SUFDRSxVQUFBO0lBQ0EsMEJBQUE7RURyQkY7RUN1QkE7SUFDRSxVQUFBO0lBQ0Esd0JBQUE7RURyQkY7QUFDRjtBQVRBO0VBQ0UsMEJBQUE7QUFXRjs7QUFSQTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLDBCQUFBO0FBV0Y7O0FBUkE7RUFDRSw2QkFBQTtFQUNBLGlDQUFBO0VBQ0EsdUNBQUE7RUFDQSwyQkFBQTtBQVdGOztBQU5BO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQ0FBQTtBQVNGO0FBUEU7RUFORjtJQU9JLG1CQUFBO0VBVUY7QUFDRjs7QUFQQTtFRTdCRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsK0JGMkIwQjtFRTFCMUIseUNBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpREFBQTtFRndCQSxPQUFBO0VBQ0EsWUFBQTtBQWlCRjtBRXhDRTtFQUNFLDhCQUFBO0FGMENKOztBQWpCQTtFRXBCRSwyQkFBQTtFQUNBLGNBQUE7RUZxQkEsaUJBQUE7QUFxQkY7O0FBbEJBO0VFcEJFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0Esb0JBQUE7RUFDQSxZQUFBO0VGZUEsbUNBQUE7QUE0QkY7QUV6Q0U7RUFDRSwyQkFBQTtBRjJDSjs7QUE1QkE7RUd6Q0UsWUFBQTtFQUNBLG1CQUZpQztFQUdqQyxxQ0FBQTtFQUNBLGdDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0ZBQUE7RUhxQ0EsWUFBQTtFQUNBLDRCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBcUNGO0FHOUVFO0VBQ0Usc0JBQUE7QUhnRko7QUc3RUU7RUFDRSxhQUFBO0VBQ0EsZUFBQTtBSCtFSjtBRzVFRTtFQUNFLGlDQUFBO0VBQ0EsbUJBQUE7QUg4RUo7QUE5Q0U7RUFWRjtJQVdJLFdBQUE7RUFpREY7QUFDRjs7QUE1Q0E7RUFDRSxhQUFBO0VBQ0EsZUFBQTtFQUNBLHNCQUFBO0FBK0NGOztBQTVDQTtFRHJFRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7RUNxRUEsa0NBQUE7QUFpREY7QURwSEU7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsNEJBQUE7RUFDQSwrRUFBQTtFQUNBLG1DQUFBO0FDc0hKO0FEbkhFO0VBQ0U7SUFDRSxlQUFBO0VDcUhKO0FBQ0Y7O0FBM0RBO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtBQThERjs7QUF4REE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLDhDQUFBO0VBQ0EsMkJBQUE7QUEyREY7QUF6REU7RUFDRSxlQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQkFBQTtBQTJESjtBQXhERTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLFNBQUE7QUEwREo7QUF2REU7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLFNBQUE7QUF5REo7O0FBakRBO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSxzQkFBQTtBQW9ERjs7QUE5Q0E7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQ0FBQTtFQUNBLGtDQUFBO0VBQ0EsMEJBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxzQkFBQTtFQUNBLCtCQUFBO0VBQ0EsZUFBQTtFQUNBLHlIQUFBO0VDeElBLHdEQUFBO0FEMExGO0FDeExFO0VEMkhGO0lDMUhJLGVBQUE7RUQyTEY7QUFDRjtBQ2hMSTtFQUNFLG9CQUFBO0FEa0xOO0FDbkxJO0VBQ0UscUJBQUE7QURxTE47QUN0TEk7RUFDRSxxQkFBQTtBRHdMTjtBQ3pMSTtFQUNFLHNCQUFBO0FEMkxOO0FDNUxJO0VBQ0Usc0JBQUE7QUQ4TE47QUMvTEk7RUFDRSxzQkFBQTtBRGlNTjtBQ2xNSTtFQUNFLHNCQUFBO0FEb01OO0FDck1JO0VBQ0Usc0JBQUE7QUR1TU47QUN4TUk7RUFDRSxzQkFBQTtBRDBNTjtBQzNNSTtFQUNFLHNCQUFBO0FENk1OO0FDOU1JO0VBQ0Usc0JBQUE7QURnTk47QUNqTkk7RUFDRSxzQkFBQTtBRG1OTjtBQXZGRTtFQUNFLHFDQUFBO0FBeUZKO0FBdEZFO0VBQ0Usc0JBQUE7QUF3Rko7O0FBcEZBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsdUJBQUE7RUFDQSxzQkFBQTtBQXVGRjs7QUFwRkE7RUFDRSxtQ0FBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUF1RkY7O0FBcEZBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0EseUJBQUE7RUFDQSw0QkFBQTtFQUNBLGlDQUFBO0VBQ0EsOENBQUE7RUFDQSxrQ0FBQTtFQUNBLGdCQUFBO0FBdUZGOztBQXBGQTtFQUNFLFNBQUE7RUFDQSxpQ0FBQTtFQUNBLCtCQUFBO0FBdUZGOztBQXBGQTtFQUNFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsUUFBQTtBQXVGRjs7QUFwRkE7RUFDRSxlQUFBO0VBQ0EsMkJBQUE7RUFDQSwrQkFBQTtFQUNBLGtDQUFBO0VBQ0EsZ0JBQUE7QUF1RkY7O0FBcEZBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsaUNBQUE7RUFDQSwyQkFBQTtBQXVGRjs7QUFwRkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSw2QkFBQTtBQXVGRjs7QUFqRkE7O0VBRUUsT0FBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsZ0VBQUE7QUFvRkY7QUFsRkU7O0VBQ0Usc0JBQUE7QUFxRko7QUFsRkU7O0VBQ0UsbUNBQUE7RUFDQSxtQkFBQTtBQXFGSjtBQWxGRTs7RUFDRSxZQUFBO0VBQ0EsZUFBQTtBQXFGSjs7QUFqRkE7RUFDRSwrQkFBQTtFQUNBLHFCQUFBO0VBQ0EsWUFBQTtBQW9GRjs7QUFqRkE7RUFDRSxpQ0FBQTtFQUNBLHVCQUFBO0VBQ0EseUNBQUE7QUFvRkYiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBTa2VsZXRvbiBkZSBjYXJnYSBjb24gYmFycmlkbyBkZSBzaGltbWVyIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gbGl0ZXJhbG1lbnRlXG4vLyBlbiB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgKGJvcmRlci1yYWRpdXMsIGhlaWdodCwgd2lkdGgsIHZhcmlhbnRlcyBjb24gbm9tYnJlKS5cbkBtaXhpbiB0Zi1za2VsZXRvbi1zaGltbWVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuXG4gICY6OmFmdGVyIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC0xMDAlKTtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHRyYW5zcGFyZW50LCB2YXIoLS10Zi1zaGltbWVyKSwgdHJhbnNwYXJlbnQpO1xuICAgIGFuaW1hdGlvbjogdGYtc2hpbW1lciAxLjRzIGluZmluaXRlO1xuICB9XG5cbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICAmOjphZnRlciB7XG4gICAgICBhbmltYXRpb246IG5vbmU7XG4gICAgfVxuICB9XG59XG5cbkBrZXlmcmFtZXMgdGYtc2hpbW1lciB7XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgxMDAlKTtcbiAgfVxufVxuIiwiQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvYnV0dG9ucyc7XG5AaW1wb3J0ICcuLi8uLi8uLi90aGVtZS9pbnB1dHMnO1xuQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvc2tlbGV0b24nO1xuQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvYW5pbWF0aW9ucyc7XG5cbi5yb3V0aW5lcy1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1iZyk7XG59XG5cbi50ZW1wbGF0ZXMtcGFnZSB7XG4gIG1heC13aWR0aDogMTA4MHB4O1xuICBtYXJnaW46IDAgYXV0bztcbiAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtNSk7XG59XG5cbi50ZW1wbGF0ZXMtaGludCB7XG4gIG1hcmdpbjogMCAwIHZhcigtLXRmLXNwYWNlLTQpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGxpbmUtaGVpZ2h0OiB2YXIoLS10Zi1saW5lLWhlaWdodC1iYXNlKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xufVxuXG4vLyAtLS0gQ3JlYXIgcGxhbnRpbGxhOiBpbnB1dCArIENUQSBlbiB1bmEgc29sYSBmaWxhIGVuIHBhbnRhbGxhcyBhbmNoYXNcbi8vIChtaXNtbyBjcml0ZXJpbyBxdWUgLnNlYXJjaC1iYXIgZW4gY2xpZW50cy5wYWdlLnNjc3MpLCBhcGlsYWRhcyBlbiBtw4PCs3ZpbCAtLS1cbi5jcmVhdGUtYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgbWFyZ2luLWJvdHRvbTogdmFyKC0tdGYtc3BhY2UtNSk7XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDY0MHB4KSB7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgfVxufVxuXG4uaW5wdXQtd3JhcHBlciB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LXdyYXBwZXIodmFyKC0tdGYtc3VyZmFjZS0yKSk7XG4gIGZsZXg6IDE7XG4gIGhlaWdodDogNDZweDtcbn1cblxuLmlucHV0LWljb24ge1xuICBAaW5jbHVkZSB0Zi1pbnB1dC1pY29uO1xuICBmb250LXNpemU6IDEuMXJlbTtcbn1cblxuLmlucHV0LWZpZWxkIHtcbiAgQGluY2x1ZGUgdGYtaW5wdXQtZmllbGQ7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWJhc2UpO1xufVxuXG4uc3VibWl0LWJ1dHRvbiB7XG4gIEBpbmNsdWRlIHRmLWdyYWRpZW50LWJ1dHRvbjtcbiAgaGVpZ2h0OiA0NnB4O1xuICBwYWRkaW5nOiAwIHZhcigtLXRmLXNwYWNlLTUpO1xuICBmb250LXNpemU6IDAuOTJyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA2MzlweCkge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59XG5cbi8vIC0tLSBDYXJnYTogbWlzbW8gZXNxdWVsZXRvIGRlIGxhIGZvcm1hIGZpbmFsIChncmlkIGRlIGNhcmRzKSwgbm8gdW5cbi8vIHNwaW5uZXIgZ2Vuw4PCqXJpY28gw6LCgMKUIG1pc21vIGNyaXRlcmlvIHF1ZSBkYXNoYm9hcmQucGFnZS5zY3NzIC0tLVxuLnRlbXBsYXRlcy1za2VsZXRvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS00KTtcbn1cblxuLnNrZWxldG9uLWJsb2NrIHtcbiAgQGluY2x1ZGUgdGYtc2tlbGV0b24tc2hpbW1lcjtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLWxnKTtcbn1cblxuLnRlbXBsYXRlLWNhcmQtc2tlbGV0b24ge1xuICBmbGV4OiAxIDEgMjYwcHg7XG4gIG1heC13aWR0aDogNDIwcHg7XG4gIGhlaWdodDogMTY4cHg7XG59XG5cbi8vIC0tLSBWYWPDg8KtbyBkZSBww4PCoWdpbmEgY29tcGxldGEgw6LCgMKUIG1pc21vIHBhdHLDg8KzbiBxdWUgY2xpZW50cy9kYXNoYm9hcmQucGFnZS5zY3NzXG4vLyAoaWNvbm8gKyB0w4PCrXR1bG8gKyB0ZXh0bykuIFNpbiBDVEEgcHJvcGlvIGFxdcODwq06IGVsIGZvcm11bGFyaW8gZGUgY3JlYXIgeWFcbi8vIGVzdMODwqEganVzdG8gZW5jaW1hLCBhc8ODwq0gcXVlIHVuIGJvdMODwrNuIGR1cGxpY2FkbyBzZXLDg8KtYSBydWlkby4gLS0tXG4uc3RhdGUtbWVzc2FnZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xuICBwYWRkaW5nOiB2YXIoLS10Zi1zcGFjZS04KSB2YXIoLS10Zi1zcGFjZS00KSAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogNDBweDtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dC1mYWludCk7XG4gICAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICB9XG5cbiAgaDIge1xuICAgIGZvbnQtc2l6ZTogMS4wNXJlbTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgICBtYXJnaW46IDA7XG4gIH1cblxuICBwIHtcbiAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICBsaW5lLWhlaWdodDogMS41O1xuICAgIG1heC13aWR0aDogMzRjaDtcbiAgICBtYXJnaW46IDA7XG4gIH1cbn1cblxuLy8gRmxleCBlbiB2ZXogZGUgZ3JpZDogY29uIGF1dG8tZml0LCB1biBjYXJkIHN1ZWx0byBlbiBsYSDDg8K6bHRpbWEgZmlsYVxuLy8gcXVlZGFiYSBlbmNham9uYWRvIGVuIGVsIGFuY2hvIGRlIHN1IGNvbHVtbmEgKG1pc21vIHF1ZSBsYXMgZmlsYXNcbi8vIGNvbXBsZXRhcykgZGVqYW5kbyBodWVjbyB2YWPDg8KtbyBhbCBsYWRvIGVuIHZleiBkZSBvY3VwYXIgZWwgYW5jaG9cbi8vIHNvYnJhbnRlIGRlIGVzYSBmaWxhIMOiwoDClCBmbGV4LXdyYXAgKyBmbGV4LWdyb3cgbG8gcmVwYXJ0ZSBwb3IgbMODwq1uZWEuXG4udGVtcGxhdGVzLWdyaWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtNCk7XG59XG5cbi8vIFRhcmpldGEgY2xpY2FibGUgY29tcGxldGEgKGFicmUgZWwgYnVpbGRlcikgw6LCgMKUIGN1cnNvciwgaG92ZXIgeSBmZWVkYmFjayBkZVxuLy8gcHVsc2FjacODwrNuIGV4cGzDg8KtY2l0b3MsIG3Dg8KhcyBlbnRyYWRhIGVzY2Fsb25hZGEgKG1pc21vIHBhdHLDg8KzbiBxdWVcbi8vIC5jbGllbnQtY2FyZCBlbiBjbGllbnRzLnBhZ2Uuc2NzcyksIHJlc3BldGFuZG8gcHJlZmVycy1yZWR1Y2VkLW1vdGlvbi5cbi50ZW1wbGF0ZS1jYXJkIHtcbiAgZmxleDogMSAxIDI2MHB4O1xuICBtYXgtd2lkdGg6IDQyMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbGcpO1xuICBwYWRkaW5nOiB2YXIoLS10Zi1zcGFjZS00KTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpLFxuICAgIHRyYW5zZm9ybSB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG4gIEBpbmNsdWRlIHRmLWNhcmQtaW4tc3RhZ2dlcjtcblxuICAmOmhvdmVyIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICB9XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45OCk7XG4gIH1cbn1cblxuLnRlbXBsYXRlLWNhcmQtaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0yKTtcbn1cblxuLnRlbXBsYXRlLW5hbWUge1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1iYXNlKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xufVxuXG4udGVtcGxhdGUtbGV2ZWwge1xuICBmbGV4LXNocmluazogMDtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBmb250LXdlaWdodDogNzAwO1xuICBsZXR0ZXItc3BhY2luZzogMC4wMmVtO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBjb2xvcjogdmFyKC0tdGYtYWNjZW50LXRleHQpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtc29mdCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWFjY2VudC1zb2Z0LWJvcmRlcik7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1zbSk7XG4gIHBhZGRpbmc6IDJweCA4cHg7XG59XG5cbi50ZW1wbGF0ZS1kZXNjcmlwdGlvbiB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xufVxuXG4udGVtcGxhdGUtdGFncyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiA2cHg7XG59XG5cbi50ZW1wbGF0ZS10YWcge1xuICBmb250LXNpemU6IDExcHg7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLXNtKTtcbiAgcGFkZGluZzogMnB4IDhweDtcbn1cblxuLnRlbXBsYXRlLW1ldGEge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTMpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbn1cblxuLnRlbXBsYXRlLWNhcmQtYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIG1hcmdpbi10b3A6IHZhcigtLXRmLXNwYWNlLTIpO1xufVxuXG4vLyBBbHRvL3JhZGlvIGFsaW5lYWRvcyBjb24gbGFzIGFjY2lvbmVzIHNlY3VuZGFyaWFzIHlhIGVzdGFibGVjaWRhcyBlblxuLy8gY2xpZW50cy5wYWdlLnNjc3MgKC5jYW5jZWwtcmV2aWV3LWJ1dHRvbi8uY29uZmlybS1idXR0b24vLnJlamVjdC1idXR0b24pXG4vLyBlbiB2ZXogZGUgcmVpbnZlbnRhciBvdHJvIHRhbWHDg8KxbyBwYXJhIGVsIG1pc21vIHJvbCBkZSBib3TDg8Kzbi5cbi5zZWNvbmRhcnktYnV0dG9uLFxuLmRhbmdlci1idXR0b24ge1xuICBmbGV4OiAxO1xuICBoZWlnaHQ6IDM4cHg7XG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gIHBhZGRpbmc6IDAgMTVweDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTcpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG5cbiAgJjpkaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogMC42O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgfVxufVxuXG4uc2Vjb25kYXJ5LWJ1dHRvbiB7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgYm9yZGVyOiBub25lO1xufVxuXG4uZGFuZ2VyLWJ1dHRvbiB7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLWRhbmdlci1zb2Z0KTtcbiAgY29sb3I6IHZhcigtLXRmLWRhbmdlcik7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWRhbmdlci1ib3JkZXIpO1xufVxuIiwiLy8gRW50cmFkYSBlc2NhbG9uYWRhIGRlIGxpc3Rhcy9ncmlkcyBkZSBjYXJkcyBhbCBjYXJnYXIgw6LCgMKUIG1pc21vIGJsb3F1ZVxuLy8gKGtleWZyYW1lICsgYW5pbWF0aW9uICsgZ3VhcmQgZGUgcHJlZmVycy1yZWR1Y2VkLW1vdGlvbikgcmVwZXRpZG8gYnl0ZSBhXG4vLyBieXRlIGVuIDkgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24uIE1pc21vIGNyaXRlcmlvIHF1ZVxuLy8gX3NrZWxldG9uLnNjc3MvX2J1dHRvbnMuc2NzczogY2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3Bpb1xuLy8gc2VsZWN0b3IgeSBhw4PCsWFkZSBlbmNpbWEgc29sbyBsbyBxdWUgdmFyw4PCrWEgKHJhZGlvLCB0YW1hw4PCsW8uLi4pLlxuQG1peGluIHRmLWNhcmQtaW4tYW5pbWF0aW9uIHtcbiAgYW5pbWF0aW9uOiB0Zi1jYXJkLWluIDMyMG1zIHZhcigtLXRmLWVhc2Utb3V0KSBiYWNrd2FyZHM7XG5cbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICBhbmltYXRpb246IG5vbmU7XG4gIH1cbn1cblxuLy8gVmFyaWFudGUgcGFyYSBsaXN0YXM6IGFkZW3Dg8KhcyBkZWwgZnVuZGlkbywgZXNjYWxvbmEgZWwgcmV0cmFzbyBkZSBjYWRhXG4vLyBlbGVtZW50byBwb3Igc3UgcG9zaWNpw4PCs24gKG50aC1jaGlsZCkuICRtYXgtaXRlbXMgYWNvdGEgZWwgYnVjbGUgYWwgbsOCwrpcbi8vIHJhem9uYWJsZSBkZSB0YXJqZXRhcyB2aXNpYmxlcyBwb3IgcMODwqFnaW5hIMOiwoDClCBubyB0aWVuZSBzZW50aWRvIGdlbmVyYXIgbcODwqFzXG4vLyByZWdsYXMgbnRoLWNoaWxkIHF1ZSBlbGVtZW50b3MgcHVlZGUgbGxlZ2FyIGEgaGFiZXIuXG5AbWl4aW4gdGYtY2FyZC1pbi1zdGFnZ2VyKCRtYXgtaXRlbXM6IDEyLCAkc3RlcDogMzVtcykge1xuICBAaW5jbHVkZSB0Zi1jYXJkLWluLWFuaW1hdGlvbjtcblxuICBAZm9yICRpIGZyb20gMSB0aHJvdWdoICRtYXgtaXRlbXMge1xuICAgICY6bnRoLWNoaWxkKCN7JGl9KSB7XG4gICAgICBhbmltYXRpb24tZGVsYXk6ICN7KCRpIC0gMSkgKiAkc3RlcH07XG4gICAgfVxuICB9XG59XG5cbkBrZXlmcmFtZXMgdGYtY2FyZC1pbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDZweCk7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG59XG4iLCIvLyBGaWxhIGRlIGlucHV0IGNvbiBpY29ubyAod3JhcHBlciArIGljb25vICsgY2FtcG8pIMOiwoDClCByZXBldGlkYSBlbiA0IHDDg8KhZ2luYXNcbi8vIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuIEVsIGZvbmRvXG4vLyBkZWwgd3JhcHBlciBlcyBlbCDDg8K6bmljbyB2YWxvciBxdWUgdmFyw4PCrWEgcG9yIHDDg8KhZ2luYSAoc3VwZXJmaWNpZSAxIG8gMiBzZWfDg8K6blxuLy8gY29udGV4dG8gdmlzdWFsKSwgZGUgYWjDg8KtIGVsIHBhcsODwqFtZXRybzsgdGFtYcODwrFvIGRlIGZ1ZW50ZS9hbHRvL21hcmdlbiBzZVxuLy8gZGVqYW4gZnVlcmEgZGVsIG1peGluIHBvcnF1ZSBjYWRhIHDDg8KhZ2luYSBsb3MgZmlqYSBzZWfDg8K6biBzdSBwcm9waW8gbGF5b3V0LlxuQG1peGluIHRmLWlucHV0LXdyYXBwZXIoJGJnOiB2YXIoLS10Zi1zdXJmYWNlLTEpKSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgYmFja2dyb3VuZDogJGJnO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMCAxNHB4O1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6Zm9jdXMtd2l0aGluIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIH1cbn1cblxuQG1peGluIHRmLWlucHV0LWljb24ge1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG5AbWl4aW4gdGYtaW5wdXQtZmllbGQge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGhlaWdodDogMTAwJTtcblxuICAmOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG59XG4iLCIvLyBCb3TDg8KzbiBDVEEgY29uIGdyYWRpZW50ZSBkZSBhY2VudG8gw6LCgMKUIG1pc21vIGJsb3F1ZSByZXBldGlkbyBlbiB+MTEgc2l0aW9zIGRlXG4vLyB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgcG9yIGxheW91dCAod2lkdGgsIGhlaWdodCwgZm9udC1zaXplLCBtYXJnaW4pLlxuLy9cbi8vIExhIG1pdGFkIGRlIGxvcyBzaXRpb3Mgb3JpZ2luYWxlcyBubyB0ZW7Dg8KtYW4gdHJhbnNpY2nDg8Kzbi9mZWVkYmFjayBkZSBwdWxzYWNpw4PCs25cbi8vIG5pIDpmb2N1cy12aXNpYmxlIMOiwoDClCBlbCBtaXhpbiBsb3MgYcODwrFhZGUgc2llbXByZSwgY2llcnJhIGVzZSBodWVjbyBkZVxuLy8gY29uc2lzdGVuY2lhIGRlIGludGVyYWNjacODwrNuIChQUk9EVUNULm1kOiBcInVuIHNvbG8gcGF0csODwrNuIHBvciB0aXBvIGRlXG4vLyBjb21wb25lbnRlXCIpIGVuIHZleiBkZSBwZXJwZXR1YXIgbGEgdmFyaWFjacODwrNuIGFjY2lkZW50YWwuXG5AbWl4aW4gdGYtZ3JhZGllbnQtYnV0dG9uKCRyYWRpdXM6IDEycHgpIHtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAkcmFkaXVzO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtZ3JhZGllbnQpO1xuICBjb2xvcjogdmFyKC0tdGYtYWNjZW50LWNvbnRyYXN0KTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpLCBvcGFjaXR5IDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk3KTtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNDU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtdGV4dCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxufVxuXG4vLyBCb3TDg8KzbiBkZSBoZWFkZXIgcXVlIGVzIHNvbG8gdW4gaWNvbm8gw6LCgMKUIG1pc21vIGxvb2sgXCJlbnZ1ZWx0b1wiIHF1ZSB5YSB1c2EgbGFcbi8vIGFwcCBkZSBjb25zdW1pZG9yIGVuIHN1cyB0b29sYmFycyAocGFja2FnZXMvc2hhcmVkLWZlYXR1cmVzLy4uLi9kaWV0cy9cbi8vIGNvbXBvbmVudHMvdG9vbGJhci1jYWxlbmRhcjogZm9uZG8gKyBib3JkZXItcmFkaXVzICsgY2FqYSBmaWphIDQ0eDQ0LCBlblxuLy8gdmV6IGRlbCBpb24tYnV0dG9uIHBsYW5vL3RyYW5zcGFyZW50ZSBxdWUgdGVuw4PCrWEgY2FkYSBwYW50YWxsYSBkZSB0cmFpbmVyc1xuLy8gaGFzdGEgYWhvcmEpLiBUb2tlbmVhZG8gYSBsYSBwYWxldGEgZGUgZXN0YSBhcHAgZW4gdmV6IGRlIHJlcGV0aXIgbG9zXG4vLyByZ2JhKDI1NSwyNTUsMjU1LC4uLikgc3VlbHRvcyBkZWwgb3JpZ2luYWwuXG4vL1xuLy8gU2lydmUgdGFudG8gcGFyYSA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIj4gKHVzYSBsYXMgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzXG4vLyBkZSBJb25pYykgY29tbyBwYXJhIHVuIDxidXR0b24+IG5hdGl2byAodXNhIGxhcyBwcm9waWVkYWRlcyBwbGFuYXMpIMOiwoDClFxuLy8gYW1ib3MgY29leGlzdGVuIGhveSBlbiB0cmFpbmVycyBwYXJhIGVsIG1pc21vIHJvbCBkZSBcInZvbHZlclwiL1wiY2VycmFyXCIuXG5AbWl4aW4gdGYtaWNvbi1idXR0b24oJHNpemU6IDQ0cHgsICRyYWRpdXM6IDEycHgsICRpY29uLXNpemU6IDIwcHgpIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICAtLWJhY2tncm91bmQtYWN0aXZhdGVkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtaG92ZXI6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIC0tYmFja2dyb3VuZC1mb2N1c2VkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIC0tYm9yZGVyLXJhZGl1czogI3skcmFkaXVzfTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAtLXBhZGRpbmctZW5kOiAwO1xuICAtLXBhZGRpbmctdG9wOiAwO1xuICAtLXBhZGRpbmctYm90dG9tOiAwO1xuXG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgd2lkdGg6ICRzaXplO1xuICBoZWlnaHQ6ICRzaXplO1xuICBtaW4td2lkdGg6ICRzaXplO1xuICBtaW4taGVpZ2h0OiAkc2l6ZTtcbiAgbWFyZ2luOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICBjb2xvciB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAkaWNvbi1zaXplO1xuICB9XG59XG5cbi8vIEV4cGFuc29yIGludmlzaWJsZSBkZSB6b25hIHB1bHNhYmxlLlxuLy9cbi8vIFBBUkEgUVXDg8KJOiB1biBjb250cm9sIGNvbXBhY3RvICh1biBpY29ubyBkZSAzMiBweCBlbiB1bmEgZmlsYSBkZSB0YWJsYSwgdW5cbi8vIGVubGFjZSBkZSB0ZXh0byBkZSAxNiBweCkgbm8gbGxlZ2EgYSBsb3MgNDQgcHggcXVlIGV4aWdlIFBST0RVQ1QubWQsIHlcbi8vIGVuZ29yZGFybG8gZGUgdmVyZGFkIGRlc3BsYXphIHRvZG8gbG8gcXVlIHRpZW5lIGFscmVkZWRvciDDosKAwpQgZW4gdW5hIHRhYmxhXG4vLyBkZSB2ZWludGUgZmlsYXMsIDggcHggcG9yIGZpbGEgc29uIG1lZGlhIHBhbnRhbGxhLlxuLy9cbi8vIEVsIHBzZXVkb2VsZW1lbnRvIGNyZWNlIGhhY2lhIGZ1ZXJhIHNpbiBvY3VwYXIgc2l0aW8gZW4gZWwgZmx1am8sIGFzw4PCrSBxdWVcbi8vIGVsIGJvdMODwrNuIHNlIHZlIHBlcXVlw4PCsW8geSBzZSBwdWxzYSBncmFuZGUuXG4vL1xuLy8gQVZJU08gREUgTUVESUNJw4PCk046IGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIE5PIHZlIGVzdGUgcHNldWRvZWxlbWVudG8sIGFzw4PCrVxuLy8gcXVlIGFsIHZlcmlmaWNhciBoYXkgcXVlIHVzYXIgZWxlbWVudEZyb21Qb2ludCBjb24gZWwgZWxlbWVudG8gZGVudHJvIGRlbFxuLy8gdmlld3BvcnQuIEFkZW3Dg8KhcyBlbCBoaXQtdGVzdCBkZXZ1ZWx2ZSAyIHB4IG1lbm9zIHF1ZSBsYSBjYWphIGRlY2xhcmFkYVxuLy8gKGNvbXByb2JhZG86IC00cHggZGEgNDIsIC02cHggZGEgNDYpLCBhc8ODwq0gcXVlIHVuIDQyIG1lZGlkbyBzb24gNDQgcmVhbGVzLlxuLy9cbi8vICRncm93OiBjdcODwqFudG8gY3JlY2UgcG9yIGNhZGEgbGFkby4gNHB4IGxsZXZhIHVuIGNvbnRyb2wgZGUgMzYgcHggYSA0NC5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlcigkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldDogLSN7JGdyb3d9O1xuICB9XG59XG5cbi8vIFZhcmlhbnRlIHF1ZSBzb2xvIGNyZWNlIGVuIFZFUlRJQ0FMLiBQYXJhIGNvbnRyb2xlcyBlbiBmaWxhIGRvbmRlIGVsXG4vLyBleHBhbnNvciBob3Jpem9udGFsIHNlIHNvbGFwYXLDg8KtYSBjb24gZWwgZGUgYWwgbGFkbyB5IHJvYmFyw4PCrWEgc3VzIHRvcXVlcy5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlci15KCRncm93OiA0cHgpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogLSN7JGdyb3d9O1xuICAgIGJvdHRvbTogLSN7JGdyb3d9O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
}));


/***/ })

}]);
//# sourceMappingURL=src_app_features_routines_routines_module_ts.js.map