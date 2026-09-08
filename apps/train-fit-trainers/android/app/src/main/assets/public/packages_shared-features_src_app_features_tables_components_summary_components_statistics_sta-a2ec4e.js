"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["packages_shared-features_src_app_features_tables_components_summary_components_statistics_sta-a2ec4e"],{

/***/ 50046:
/*!*************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/tables/components/summary/components/statistics/es-number.pipe.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EsNumberPipe: () => (/* binding */ EsNumberPipe)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 69717);

var _EsNumberPipe;

// Angular's built-in `number` pipe formats using the app's global LOCALE_ID
// (en-US: "1,000.5"), which reads wrong for Spanish users ("1.000,5" is the
// convention here). Scoped to this page only, not a global LOCALE_ID change.
class EsNumberPipe {
  transform(value, digitsInfo = '1.0-3') {
    if (value === null || value === undefined || value === '') return '';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (!Number.isFinite(num)) return '';
    const match = digitsInfo.match(/^\d+\.(\d+)-(\d+)$/);
    const minimumFractionDigits = match ? Number(match[1]) : 0;
    const maximumFractionDigits = match ? Number(match[2]) : 3;
    return new Intl.NumberFormat('es-ES', {
      minimumFractionDigits,
      maximumFractionDigits
    }).format(num);
  }
}
_EsNumberPipe = EsNumberPipe;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(EsNumberPipe, "\u0275fac", function EsNumberPipe_Factory(t) {
  return new (t || _EsNumberPipe)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(EsNumberPipe, "\u0275pipe", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefinePipe"]({
  name: "esNumber",
  type: _EsNumberPipe,
  pure: true
}));


/***/ }),

/***/ 80391:
/*!****************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/tables/components/summary/components/statistics/statistics.module.ts ***!
  \****************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StatisticsPageModule: () => (/* binding */ StatisticsPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _statistics_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./statistics.page */ 61504);
/* harmony import */ var _es_number_pipe__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./es-number.pipe */ 50046);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);

var _StatisticsPageModule;









const routes = [{
  path: '',
  component: _statistics_page__WEBPACK_IMPORTED_MODULE_1__.StatisticsPage
}];
class StatisticsPageModule {}
_StatisticsPageModule = StatisticsPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(StatisticsPageModule, "\u0275fac", function StatisticsPageModule_Factory(t) {
  return new (t || _StatisticsPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(StatisticsPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _StatisticsPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(StatisticsPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule, src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule.forChild(routes)]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](StatisticsPageModule, {
    declarations: [_statistics_page__WEBPACK_IMPORTED_MODULE_1__.StatisticsPage, _es_number_pipe__WEBPACK_IMPORTED_MODULE_2__.EsNumberPipe],
    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonicModule, src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_8__.RouterModule]
  });
})();

/***/ }),

/***/ 61504:
/*!**************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/tables/components/summary/components/statistics/statistics.page.ts ***!
  \**************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   StatisticsPage: () => (/* binding */ StatisticsPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! chart.js */ 86743);
/* harmony import */ var src_app_core_models_rir__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/models/rir */ 57619);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ 65821);
/* harmony import */ var src_app_shared_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/utils */ 20480);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_table_table_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/table/table.service */ 91594);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ionic/angular */ 45398);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var src_app_core_services_exercise_history_exercise_history_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/core/services/exercise-history/exercise-history.service */ 83042);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_core_services_pinned_exercise_note_pinned_exercise_note_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/core/services/pinned-exercise-note/pinned-exercise-note.service */ 49996);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _shared_ui_src_app_shared_components_glossary_info_glossary_info_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../../../../shared-ui/src/app/shared/components/glossary-info/glossary-info.component */ 27057);
/* harmony import */ var _shared_ui_src_app_shared_pipes_translate_db_pipe__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../../../../shared-ui/src/app/shared/pipes/translate-db.pipe */ 36191);
/* harmony import */ var _es_number_pipe__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./es-number.pipe */ 50046);


var _StatisticsPage;

















const _c0 = ["progressionCanvas"];
function StatisticsPage_div_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const d_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](d_r13);
  }
}
function StatisticsPage_div_30_div_3_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "div", 37);
  }
  if (rf & 2) {
    const w_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleProp"]("background-color", w_r17.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("title", w_r17.name);
  }
}
function StatisticsPage_div_30_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, StatisticsPage_div_30_div_3_div_1_Template, 1, 3, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const day_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", day_r14.workouts);
  }
}
function StatisticsPage_div_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 32)(1, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](3, StatisticsPage_div_30_div_3_Template, 2, 1, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const day_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("inactive", day_r14.inactive)("completed", day_r14.completed);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](day_r14.day);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", day_r14.completed && day_r14.workouts);
  }
}
function StatisticsPage_div_31_ion_chip_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-chip", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translateDb");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const type_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵstyleProp"]("background-color", type_r20.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 3, type_r20.name));
  }
}
function StatisticsPage_div_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 38)(1, "ion-text", 39)(2, "p", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](6, StatisticsPage_div_31_ion_chip_6_Template, 5, 5, "ion-chip", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 2, "TABLES.STATS_TRAINING_TYPES"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r2.uniqueWorkoutTypes);
  }
}
function StatisticsPage_ion_select_option_43_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-select-option", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translateDb");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const w_r21 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("value", w_r21.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate3"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 4, w_r21.name), " (", w_r21.exercises.length, " ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](3, 6, "TABLES.EXERCISE_PLURAL"), ") ");
  }
}
function StatisticsPage_ion_select_option_56_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-select-option", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translateDb");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ex_r22 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("value", ex_r22._id);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 2, ex_r22.exercise == null ? null : ex_r22.exercise.name), " ");
  }
}
function StatisticsPage_div_58_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 46)(1, "div", 47)(2, "div", 48)(3, "div", 49)(4, "div", 50);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](5, "ion-icon", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "span", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](9, "app-glossary-info", 53);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "p", 54);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](8, 2, "NOTES.PINNED_TO_POSITION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r5.pinnedNote.notes);
  }
}
function StatisticsPage_ion_grid_59_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r23.formatSeconds(ctx_r23.personalRecord));
  }
}
function StatisticsPage_ion_grid_59_ng_template_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](1, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](1, 2, ctx_r25.personalRecord, "1.0-1"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r25.isCardio ? "km/h" : "kg");
  }
}
function StatisticsPage_ion_grid_59_app_glossary_info_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](0, "app-glossary-info", 63);
  }
}
function StatisticsPage_ion_grid_59_small_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "kg");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
}
function StatisticsPage_ion_grid_59_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-grid")(1, "ion-row")(2, "ion-col", 55)(3, "ion-card", 56)(4, "ion-card-content")(5, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](11, StatisticsPage_ion_grid_59_ng_container_11_Template, 2, 1, "ng-container", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](12, StatisticsPage_ion_grid_59_ng_template_12_Template, 4, 5, "ng-template", null, 60, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](14, "ion-col", 55)(15, "ion-card", 56)(16, "ion-card-content")(17, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](18);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](19, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](20, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](21, StatisticsPage_ion_grid_59_app_glossary_info_21_Template, 1, 0, "app-glossary-info", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](22, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](23);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](24, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](25, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](26, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](28, "ion-col", 55)(29, "ion-card", 56)(30, "ion-card-content")(31, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](32);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](33, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](34, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](35, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](36);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](37, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](38, StatisticsPage_ion_grid_59_small_38_Template, 2, 0, "small", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](39, "div", 62)(40, "ion-text", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](41);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](42, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](43, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](44, "ion-col", 55)(45, "ion-card", 56)(46, "ion-card-content")(47, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](48);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](49, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](50, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](51, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](52);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](53, "div", 62)(54, "ion-text", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](55);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](56, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()()()();
  }
  if (rf & 2) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](13);
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx_r6.isCardio ? _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](7, 14, "TABLES.STATS_BEST_SPEED") : ctx_r6.isIsometric ? _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](8, 16, "TABLES.STATS_LONGEST_HOLD") : _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](9, 18, "TABLES.STATS_PERSONAL_RECORD"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r6.isIsometric)("ngIfElse", _r24);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx_r6.isCardio || ctx_r6.isIsometric ? _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](19, 20, "TABLES.STATS_TOTAL_TIME") : _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](20, 22, "TABLES.STATS_ESTIMATED_1RM"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r6.isStrength);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx_r6.isCardio || ctx_r6.isIsometric ? _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](24, 24, ctx_r6.metrics.max1RM, "1.0-0") : _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](25, 27, ctx_r6.metrics.max1RM, "1.0-1"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r6.isCardio || ctx_r6.isIsometric ? "min" : "kg");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx_r6.isCardio || ctx_r6.isIsometric ? _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](33, 30, "TABLES.STATS_SESSIONS_DONE") : _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](34, 32, "TABLES.STATS_ACTUAL_VOLUME"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](37, 34, ctx_r6.metrics.totalVolume, "1.0-0"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r6.isStrength);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r6.isCardio || ctx_r6.isIsometric ? _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](42, 37, "TABLES.STATS_THIS_MONTH") : _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](43, 39, "TABLES.STATS_ACCUMULATED"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx_r6.isCardio || ctx_r6.isIsometric ? _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](49, 41, "TABLES.STATS_TOTAL_SESSIONS") : _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](50, 43, "TABLES.STATS_COMPLETED_TIMES"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r6.workoutCompletionCount);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](56, 45, "TABLES.STATS_SESSIONS"));
  }
}
function StatisticsPage_ion_card_60_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "ion-spinner", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
}
function StatisticsPage_ion_card_60_ng_container_8_ng_container_1_ion_row_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-row")(1, "ion-col", 72)(2, "ion-card", 56)(3, "ion-card-content")(4, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](9, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](11, "km/h");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()()();
  }
  if (rf & 2) {
    const ctx_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](6, 2, "TABLES.STATS_ALL_TIME_BEST_PACE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](9, 4, ctx_r37.historicalStats.bestVelocityEver, "1.0-1"), "");
  }
}
function StatisticsPage_ion_card_60_ng_container_8_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, StatisticsPage_ion_card_60_ng_container_8_ng_container_1_ion_row_1_Template, 12, 7, "ion-row", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](7);
    const ctx_r30 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", (ctx_r30.historicalStats == null ? null : ctx_r30.historicalStats.bestVelocityEver) !== null && (ctx_r30.historicalStats == null ? null : ctx_r30.historicalStats.bestVelocityEver) !== undefined)("ngIfElse", _r35);
  }
}
function StatisticsPage_ion_card_60_ng_container_8_ng_template_2_ng_container_0_ion_row_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-row")(1, "ion-col", 72)(2, "ion-card", 56)(3, "ion-card-content")(4, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](6, 2, "TABLES.STATS_ALL_TIME_LONGEST_HOLD"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r39.historicalStats.bestTimeEver);
  }
}
function StatisticsPage_ion_card_60_ng_container_8_ng_template_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, StatisticsPage_ion_card_60_ng_container_8_ng_template_2_ng_container_0_ion_row_1_Template, 9, 4, "ion-row", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](7);
    const ctx_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r38.historicalStats && ctx_r38.historicalStats.bestTimeSecondsEver > 0)("ngIfElse", _r35);
  }
}
function StatisticsPage_ion_card_60_ng_container_8_ng_template_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, StatisticsPage_ion_card_60_ng_container_8_ng_template_2_ng_container_0_Template, 2, 2, "ng-container", 59);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    const _r33 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](5);
    const ctx_r32 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r32.isIsometric)("ngIfElse", _r33);
  }
}
function StatisticsPage_ion_card_60_ng_container_8_ng_template_4_ion_row_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-row")(1, "ion-col", 55)(2, "ion-card", 56)(3, "ion-card-content")(4, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](9, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](11, "kg");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](13, "ion-col", 55)(14, "ion-card", 56)(15, "ion-card-content")(16, "div", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](18, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](19, "div", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](21, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](22, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](23, "kg");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()()();
  }
  if (rf & 2) {
    const best_r41 = ctx.ngIf;
    const ctx_r40 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](6, 5, "TABLES.STATS_ALL_TIME_BEST_SET"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](9, 7, best_r41.weight, "1.0-1"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" \u00D7 ", best_r41.reps, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](18, 10, "TABLES.STATS_ALL_TIME_MAX_WEIGHT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](21, 12, ctx_r40.historicalStats.maxWeightEver, "1.0-1"), "");
  }
}
function StatisticsPage_ion_card_60_ng_container_8_ng_template_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](0, StatisticsPage_ion_card_60_ng_container_8_ng_template_4_ion_row_0_Template, 24, 15, "ion-row", 59);
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    const _r35 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](7);
    const ctx_r34 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r34.historicalStats == null ? null : ctx_r34.historicalStats.bestSet)("ngIfElse", _r35);
  }
}
function StatisticsPage_ion_card_60_ng_container_8_ng_template_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-text", 73);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "TABLES.STATS_ALL_TIME_EMPTY"), " ");
  }
}
function StatisticsPage_ion_card_60_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, StatisticsPage_ion_card_60_ng_container_8_ng_container_1_Template, 2, 2, "ng-container", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](2, StatisticsPage_ion_card_60_ng_container_8_ng_template_2_Template, 1, 2, "ng-template", null, 69, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](4, StatisticsPage_ion_card_60_ng_container_8_ng_template_4_Template, 1, 2, "ng-template", null, 70, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](6, StatisticsPage_ion_card_60_ng_container_8_ng_template_6_Template, 3, 3, "ng-template", null, 71, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const _r31 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵreference"](3);
    const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r29.isCardio)("ngIfElse", _r31);
  }
}
function StatisticsPage_ion_card_60_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-card", 64)(1, "ion-card-header")(2, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](3, "ion-icon", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "ion-card-content");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](7, StatisticsPage_ion_card_60_div_7_Template, 2, 0, "div", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](8, StatisticsPage_ion_card_60_ng_container_8_Template, 8, 2, "ng-container", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](5, 3, "TABLES.STATS_ALL_TIME_TITLE"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r7.historicalStatsLoading);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx_r7.historicalStatsLoading);
  }
}
const _c1 = function (a0) {
  return {
    n: a0
  };
};
function StatisticsPage_ion_card_61_ion_select_option_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-select-option", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const o_r53 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("value", o_r53.idx);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](2, 2, "TABLES.STATS_MICROCYCLE", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](5, _c1, o_r53.splitIndex)), " ");
  }
}
function StatisticsPage_ion_card_61_ion_select_option_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-select-option", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const o_r54 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("value", o_r54.idx);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](2, 2, "TABLES.STATS_MICROCYCLE", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](5, _c1, o_r54.splitIndex)), " ");
  }
}
function StatisticsPage_ion_card_61_div_27_span_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate2"](" ", ctx_r55.comparisonData.velocityDiff > 0 ? "+" : "", "", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](2, 2, ctx_r55.comparisonData.velocityPct, "1.0-1"), "% ");
  }
}
function StatisticsPage_ion_card_61_div_27_span_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "TABLES.STATS_NO_CHANGE"));
  }
}
function StatisticsPage_ion_card_61_div_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 86)(1, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "ion-icon", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "div", 90)(6, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](8, "ion-icon", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "span", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](11, "div", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](12, StatisticsPage_ion_card_61_div_27_span_12_Template, 3, 5, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](13, StatisticsPage_ion_card_61_div_27_span_13_Template, 3, 3, "span", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 10, "TABLES.STATS_BEST_SPEED"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("", ctx_r44.comparisonData.prevMaxVelocity, " km/h");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMap"](ctx_r44.getDiffClass(ctx_r44.comparisonData.velocityDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("name", ctx_r44.getDiffIcon(ctx_r44.comparisonData.velocityDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("", ctx_r44.comparisonData.currMaxVelocity, " km/h");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMap"](ctx_r44.getDiffClass(ctx_r44.comparisonData.velocityDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r44.comparisonData.velocityDiff !== 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r44.comparisonData.velocityDiff === 0);
  }
}
function StatisticsPage_ion_card_61_div_28_span_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate2"](" ", ctx_r57.comparisonData.maxHoldDiff > 0 ? "+" : "", "", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](2, 2, ctx_r57.comparisonData.maxHoldPct, "1.0-1"), "% ");
  }
}
function StatisticsPage_ion_card_61_div_28_span_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "TABLES.STATS_NO_CHANGE"));
  }
}
function StatisticsPage_ion_card_61_div_28_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 86)(1, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "ion-icon", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "div", 90)(6, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](8, "ion-icon", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "span", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](11, "div", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](12, StatisticsPage_ion_card_61_div_28_span_12_Template, 3, 5, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](13, StatisticsPage_ion_card_61_div_28_span_13_Template, 3, 3, "span", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 10, "TABLES.STATS_LONGEST_HOLD"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r45.formatSeconds(ctx_r45.comparisonData.prevMaxHold));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMap"](ctx_r45.getDiffClass(ctx_r45.comparisonData.maxHoldDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("name", ctx_r45.getDiffIcon(ctx_r45.comparisonData.maxHoldDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r45.formatSeconds(ctx_r45.comparisonData.currMaxHold));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMap"](ctx_r45.getDiffClass(ctx_r45.comparisonData.maxHoldDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r45.comparisonData.maxHoldDiff !== 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r45.comparisonData.maxHoldDiff === 0);
  }
}
function StatisticsPage_ion_card_61_div_29_span_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate2"](" ", ctx_r59.comparisonData.timeDiff > 0 ? "+" : "", "", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](2, 2, ctx_r59.comparisonData.timePct, "1.0-1"), "% ");
  }
}
function StatisticsPage_ion_card_61_div_29_span_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "TABLES.STATS_NO_CHANGE"));
  }
}
function StatisticsPage_ion_card_61_div_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 86)(1, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "ion-icon", 100);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "div", 90)(6, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](8, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](9, "ion-icon", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "span", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](12, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](13, "div", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](14, StatisticsPage_ion_card_61_div_29_span_14_Template, 3, 5, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](15, StatisticsPage_ion_card_61_div_29_span_15_Template, 3, 3, "span", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r46 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 10, "TABLES.STATS_TOTAL_TIME"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](8, 12, ctx_r46.comparisonData.prevTotalTime, "1.0-1"), " min");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMap"](ctx_r46.getDiffClass(ctx_r46.comparisonData.timeDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("name", ctx_r46.getDiffIcon(ctx_r46.comparisonData.timeDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](12, 15, ctx_r46.comparisonData.currTotalTime, "1.0-1"), " min");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMap"](ctx_r46.getDiffClass(ctx_r46.comparisonData.timeDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r46.comparisonData.timeDiff !== 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r46.comparisonData.timeDiff === 0);
  }
}
function StatisticsPage_ion_card_61_div_30_span_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate2"](" ", ctx_r61.comparisonData.weightDiff > 0 ? "+" : "", "", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](2, 2, ctx_r61.comparisonData.weightPct, "1.0-1"), "% ");
  }
}
function StatisticsPage_ion_card_61_div_30_span_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "TABLES.STATS_NO_CHANGE"));
  }
}
function StatisticsPage_ion_card_61_div_30_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 86)(1, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "ion-icon", 101);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](5, "app-glossary-info", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "div", 90)(7, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](9, "ion-icon", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "span", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "div", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](13, StatisticsPage_ion_card_61_div_30_span_13_Template, 3, 5, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](14, StatisticsPage_ion_card_61_div_30_span_14_Template, 3, 3, "span", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 10, "TABLES.STATS_BEST_SET"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("", ctx_r47.comparisonData.prevMaxWeight, " kg");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMap"](ctx_r47.getDiffClass(ctx_r47.comparisonData.weightDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("name", ctx_r47.getDiffIcon(ctx_r47.comparisonData.weightDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("", ctx_r47.comparisonData.currMaxWeight, " kg");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMap"](ctx_r47.getDiffClass(ctx_r47.comparisonData.weightDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r47.comparisonData.weightDiff !== 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r47.comparisonData.weightDiff === 0);
  }
}
function StatisticsPage_ion_card_61_div_31_span_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r63 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate2"](" ", ctx_r63.comparisonData.effVolumeDiff > 0 ? "+" : "", "", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](2, 2, ctx_r63.comparisonData.effVolumePct, "1.0-1"), "% ");
  }
}
function StatisticsPage_ion_card_61_div_31_span_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "TABLES.STATS_NO_CHANGE"));
  }
}
function StatisticsPage_ion_card_61_div_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 86)(1, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "ion-icon", 103);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](5, "app-glossary-info", 104);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "div", 90)(7, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](9, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](10, "ion-icon", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](11, "span", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](13, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](14, "div", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](15, StatisticsPage_ion_card_61_div_31_span_15_Template, 3, 5, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](16, StatisticsPage_ion_card_61_div_31_span_16_Template, 3, 3, "span", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r48 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 10, "TABLES.STATS_EFFECTIVE_VOLUME"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](9, 12, ctx_r48.comparisonData.prevEffectiveVolume, "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMap"](ctx_r48.getDiffClass(ctx_r48.comparisonData.effVolumeDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("name", ctx_r48.getDiffIcon(ctx_r48.comparisonData.effVolumeDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](13, 15, ctx_r48.comparisonData.currEffectiveVolume, "1.0-0"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMap"](ctx_r48.getDiffClass(ctx_r48.comparisonData.effVolumeDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r48.comparisonData.effVolumeDiff !== 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r48.comparisonData.effVolumeDiff === 0);
  }
}
function StatisticsPage_ion_card_61_div_32_span_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r65 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate2"](" ", ctx_r65.comparisonData.rirDiff > 0 ? "+" : "", "", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](2, 2, ctx_r65.comparisonData.rirDiff, "1.1-1"), " RIR ");
  }
}
function StatisticsPage_ion_card_61_div_32_span_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "TABLES.STATS_SAME"));
  }
}
function StatisticsPage_ion_card_61_div_32_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 86)(1, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "ion-icon", 97);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](5, "app-glossary-info", 105);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "div", 90)(7, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](9, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](10, "ion-icon", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](11, "span", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](13, "esNumber");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](14, "div", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](15, StatisticsPage_ion_card_61_div_32_span_15_Template, 3, 5, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](16, StatisticsPage_ion_card_61_div_32_span_16_Template, 3, 3, "span", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 10, "TABLES.STATS_AVG_RIR"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r49.comparisonData.prevAvgRir >= 0 ? _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](9, 12, ctx_r49.comparisonData.prevAvgRir, "1.1-1") : "\u2014");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMap"](ctx_r49.getDiffClass(ctx_r49.comparisonData.rirDiff, true));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("name", ctx_r49.getDiffIcon(ctx_r49.comparisonData.rirDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r49.comparisonData.currAvgRir >= 0 ? _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](13, 15, ctx_r49.comparisonData.currAvgRir, "1.1-1") : "\u2014");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMap"](ctx_r49.getDiffClass(ctx_r49.comparisonData.rirDiff, true));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r49.comparisonData.rirDiff !== 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r49.comparisonData.rirDiff === 0);
  }
}
function StatisticsPage_ion_card_61_span_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "lowercase");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r50 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate3"]("", ctx_r50.comparisonData.setsDiff > 0 ? "+" : "", "", ctx_r50.comparisonData.setsDiff, " ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 3, _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](3, 5, "TABLES.STATS_SETS")), "");
  }
}
function StatisticsPage_ion_card_61_span_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 98);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "TABLES.STATS_SAME"));
  }
}
function StatisticsPage_ion_card_61_div_48_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 111)(1, "span", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2, "DS");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "ion-icon", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate2"](" ", ctx_r67.comparisonData.prevDropSets, " \u2192 ", ctx_r67.comparisonData.currDropSets, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMap"](ctx_r67.getDiffClass(ctx_r67.comparisonData.currDropSets - ctx_r67.comparisonData.prevDropSets));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("name", ctx_r67.getDiffIcon(ctx_r67.comparisonData.currDropSets - ctx_r67.comparisonData.prevDropSets));
  }
}
function StatisticsPage_ion_card_61_div_48_span_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 113)(1, "span", 112);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2, "RP");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](4, "ion-icon", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r68 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate2"](" ", ctx_r68.comparisonData.prevRestPauses, " \u2192 ", ctx_r68.comparisonData.currRestPauses, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMap"](ctx_r68.getDiffClass(ctx_r68.comparisonData.currRestPauses - ctx_r68.comparisonData.prevRestPauses));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("name", ctx_r68.getDiffIcon(ctx_r68.comparisonData.currRestPauses - ctx_r68.comparisonData.prevRestPauses));
  }
}
function StatisticsPage_ion_card_61_div_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 106)(1, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](2, "ion-icon", 107);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "div", 108);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](6, StatisticsPage_ion_card_61_div_48_span_6_Template, 5, 5, "span", 109);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](7, StatisticsPage_ion_card_61_div_48_span_7_Template, 5, 5, "span", 110);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r52 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 3, "TABLES.STATS_ADVANCED_TECHNIQUES"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r52.comparisonData.prevDropSets > 0 || ctx_r52.comparisonData.currDropSets > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r52.comparisonData.prevRestPauses > 0 || ctx_r52.comparisonData.currRestPauses > 0);
  }
}
const _c2 = function () {
  return {
    cssClass: "white-text-action-sheet"
  };
};
function StatisticsPage_ion_card_61_Template(rf, ctx) {
  if (rf & 1) {
    const _r70 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-card", 74)(1, "ion-card-header")(2, "div", 75)(3, "div", 76)(4, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "div", 77)(8, "div", 78)(9, "button", 79)(10, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](12, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](13, "ion-icon", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](14, "ion-select", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngModelChange", function StatisticsPage_ion_card_61_Template_ion_select_ngModelChange_14_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r70);
      const ctx_r69 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r69.compareIndexA = $event);
    })("ionChange", function StatisticsPage_ion_card_61_Template_ion_select_ionChange_14_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r70);
      const ctx_r71 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r71.onCompareChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](15, StatisticsPage_ion_card_61_ion_select_option_15_Template, 3, 7, "ion-select-option", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](16, "ion-icon", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](17, "div", 78)(18, "button", 79)(19, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](20);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](21, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](22, "ion-icon", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](23, "ion-select", 82);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngModelChange", function StatisticsPage_ion_card_61_Template_ion_select_ngModelChange_23_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r70);
      const ctx_r72 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r72.compareIndexB = $event);
    })("ionChange", function StatisticsPage_ion_card_61_Template_ion_select_ionChange_23_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r70);
      const ctx_r73 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r73.onCompareChange());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](24, StatisticsPage_ion_card_61_ion_select_option_24_Template, 3, 7, "ion-select-option", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](25, "ion-card-content")(26, "div", 84);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](27, StatisticsPage_ion_card_61_div_27_Template, 14, 12, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](28, StatisticsPage_ion_card_61_div_28_Template, 14, 12, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](29, StatisticsPage_ion_card_61_div_29_Template, 16, 18, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](30, StatisticsPage_ion_card_61_div_30_Template, 15, 12, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](31, StatisticsPage_ion_card_61_div_31_Template, 17, 18, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](32, StatisticsPage_ion_card_61_div_32_Template, 17, 18, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](33, "div", 86)(34, "div", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](35, "ion-icon", 88);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](36);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](37, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](38, "app-glossary-info", 89);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](39, "div", 90)(40, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](41);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](42, "ion-icon", 92);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](43, "span", 93);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](44);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](45, "div", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](46, StatisticsPage_ion_card_61_span_46_Template, 4, 7, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](47, StatisticsPage_ion_card_61_span_47_Template, 3, 3, "span", 95);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](48, StatisticsPage_ion_card_61_div_48_Template, 8, 5, "div", 96);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](6, 26, "TABLES.STATS_COMPARISON"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](12, 28, "TABLES.STATS_MICROCYCLE", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](36, _c1, ctx_r8.compareSplitIndexA)));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("interfaceOptions", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction0"](38, _c2))("ngModel", ctx_r8.compareIndexA);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r8.optionsForA);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](21, 31, "TABLES.STATS_MICROCYCLE", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](39, _c1, ctx_r8.compareSplitIndexB)));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("interfaceOptions", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction0"](41, _c2))("ngModel", ctx_r8.compareIndexB);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r8.optionsForB);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r8.isCardio);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r8.isIsometric);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r8.isCardio || ctx_r8.isIsometric);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r8.isStrength);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r8.isStrength);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r8.isStrength);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](37, 34, "TABLES.STATS_SETS"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r8.comparisonData.prevSets);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMap"](ctx_r8.getDiffClass(ctx_r8.comparisonData.setsDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("name", ctx_r8.getDiffIcon(ctx_r8.comparisonData.setsDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx_r8.comparisonData.currSets);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassMap"](ctx_r8.getDiffClass(ctx_r8.comparisonData.setsDiff));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r8.comparisonData.setsDiff !== 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r8.comparisonData.setsDiff === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r8.comparisonData.prevDropSets + ctx_r8.comparisonData.currDropSets + ctx_r8.comparisonData.prevRestPauses + ctx_r8.comparisonData.currRestPauses > 0);
  }
}
function StatisticsPage_ion_card_62_div_12_ion_select_option_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-select-option", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const idx_r78 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("value", idx_r78);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](2, 2, "TABLES.STATS_SET", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](5, _c1, idx_r78 + 1)), " ");
  }
}
function StatisticsPage_ion_card_62_div_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r80 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 123)(1, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "div", 124)(5, "button", 79)(6, "span", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](9, "ion-icon", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](10, "ion-select", 125);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ionChange", function StatisticsPage_ion_card_62_div_12_Template_ion_select_ionChange_10_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r80);
      const ctx_r79 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r79.onSetTypeChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](11, StatisticsPage_ion_card_62_div_12_ion_select_option_11_Template, 3, 7, "ion-select-option", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r74 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](3, 4, "TABLES.STATS_DIRECT_PROGRESSION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](8, 6, "TABLES.STATS_SET", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](9, _c1, ctx_r74.selectedSetIndex + 1)));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("value", ctx_r74.selectedSetIndex);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r74.availableSetOptions);
  }
}
function StatisticsPage_ion_card_62_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 123)(1, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "ion-text", 126);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](8, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r75 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](3, 2, "TABLES.STATS_WORKLOAD"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", ctx_r75.isCardio ? _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](6, 4, "TABLES.STATS_TIME_VS_SPEED") : ctx_r75.isIsometric ? _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](7, 6, "TABLES.STATS_HOLD_WORKLOAD") : _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](8, 8, "TABLES.STATS_EFF_VOLUME_VS_RIR"), " ");
  }
}
function StatisticsPage_ion_card_62_Template(rf, ctx) {
  if (rf & 1) {
    const _r82 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-card", 114)(1, "ion-card-header", 115)(2, "div", 116)(3, "ion-segment", 117);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ngModelChange", function StatisticsPage_ion_card_62_Template_ion_segment_ngModelChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r82);
      const ctx_r81 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r81.chartMode = $event);
    })("ionChange", function StatisticsPage_ion_card_62_Template_ion_segment_ionChange_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r82);
      const ctx_r83 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r83.onChartModeChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "ion-segment-button", 118)(5, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](8, "ion-segment-button", 119)(9, "ion-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](11, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](12, StatisticsPage_ion_card_62_div_12_Template, 12, 11, "div", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](13, StatisticsPage_ion_card_62_div_13_Template, 9, 10, "div", 120);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](14, "ion-card-content")(15, "div", 121);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](16, "canvas", null, 122);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngModel", ctx_r9.chartMode);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](7, 5, "TABLES.STATS_EVOLUTION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](11, 7, "TABLES.STATS_VOLUME"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r9.chartMode === "evolution");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r9.chartMode === "volume");
  }
}
function StatisticsPage_ion_card_63_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "span", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "span", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](3, 2, "TABLES.STATS_WEIGHT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](6, 4, "TABLES.STATS_REPS"));
  }
}
function StatisticsPage_ion_card_63_ng_container_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "span", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "span", 133);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](3, 2, "TABLES.STATS_SPEED"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](6, 4, "TABLES.STATS_TIME"));
  }
}
function StatisticsPage_ion_card_63_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "span", 132);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](3, 1, "TABLES.STATS_TIME"));
  }
}
function StatisticsPage_ion_card_63_span_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 134);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "TABLES.STATS_INTENSITY"));
  }
}
function StatisticsPage_ion_card_63_div_15_ion_icon_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r94 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-icon", 141);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function StatisticsPage_ion_card_63_div_15_ion_icon_9_Template_ion_icon_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵrestoreView"](_r94);
      const session_r89 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
      const ctx_r92 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵresetView"](ctx_r92.showNoteAlert(session_r89.notes, ctx_r92.translate.instant("TABLES.STATS_MICROCYCLE_NOTE", {
        n: session_r89.splitIndex
      })));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
}
function StatisticsPage_ion_card_63_div_15_ion_item_10_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 148);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "ion-icon", 149);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const set_r95 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", set_r95.restSeconds, "s ");
  }
}
function StatisticsPage_ion_card_63_div_15_ion_item_10_ng_container_7_span_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 157);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](2, 1, "TABLES.STATS_FAILURE"));
  }
}
function StatisticsPage_ion_card_63_div_15_ion_item_10_ng_container_7_span_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 158);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const set_r95 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("", set_r95.rir, " RIR");
  }
}
function StatisticsPage_ion_card_63_div_15_ion_item_10_ng_container_7_span_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 159);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "DS");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
}
function StatisticsPage_ion_card_63_div_15_ion_item_10_ng_container_7_span_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 160);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const set_r95 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](2).$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("RP ", set_r95.restPause, "");
  }
}
function StatisticsPage_ion_card_63_div_15_ion_item_10_ng_container_7_span_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 158);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1, "\u2014");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
}
function StatisticsPage_ion_card_63_div_15_ion_item_10_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 150)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5, "kg");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "div", 151)(7, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](9, "div", 152);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](10, StatisticsPage_ion_card_63_div_15_ion_item_10_ng_container_7_span_10_Template, 3, 3, "span", 153);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](11, StatisticsPage_ion_card_63_div_15_ion_item_10_ng_container_7_span_11_Template, 2, 1, "span", 154);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](12, StatisticsPage_ion_card_63_div_15_ion_item_10_ng_container_7_span_12_Template, 2, 0, "span", 155);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](13, StatisticsPage_ion_card_63_div_15_ion_item_10_ng_container_7_span_13_Template, 2, 1, "span", 156);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](14, StatisticsPage_ion_card_63_div_15_ion_item_10_ng_container_7_span_14_Template, 2, 0, "span", 154);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const set_r95 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](set_r95.weight);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](set_r95.reps);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", set_r95.isFail);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !set_r95.isFail && set_r95.rir !== "-");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", set_r95.isDropSet);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", set_r95.isRestPause);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !set_r95.isFail && set_r95.rir === "-" && !set_r95.isDropSet && !set_r95.isRestPause);
  }
}
function StatisticsPage_ion_card_63_div_15_ion_item_10_ng_container_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 150)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5, "km/h");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "div", 151)(7, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const set_r95 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](set_r95.velocity);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](set_r95.time);
  }
}
function StatisticsPage_ion_card_63_div_15_ion_item_10_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](1, "div", 150)(2, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const set_r95 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](set_r95.time);
  }
}
function StatisticsPage_ion_card_63_div_15_ion_item_10_div_10_div_1_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 167);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ds_r115 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    const ctx_r117 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("RIR ", ctx_r117.formatPerformedRir(ds_r115.rir), "");
  }
}
function StatisticsPage_ion_card_63_div_15_ion_item_10_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 163)(1, "span", 164);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "span", 165);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "span", 165);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](8, StatisticsPage_ion_card_63_div_15_ion_item_10_div_10_div_1_span_8_Template, 2, 1, "span", 166);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ds_r115 = ctx.$implicit;
    const j_r116 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](3, 4, "TABLES.STATS_DROP", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](7, _c1, j_r116 + 1)));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("", ds_r115.weight, " kg");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("\u00D7 ", ds_r115.reps, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ds_r115.rir !== undefined);
  }
}
function StatisticsPage_ion_card_63_div_15_ion_item_10_div_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 161);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, StatisticsPage_ion_card_63_div_15_ion_item_10_div_10_div_1_Template, 9, 9, "div", 162);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const set_r95 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", set_r95.dropSeries);
  }
}
function StatisticsPage_ion_card_63_div_15_ion_item_10_div_11_div_1_span_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "span", 167);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rp_r121 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    const ctx_r123 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("RIR ", ctx_r123.formatPerformedRir(rp_r121.rir), "");
  }
}
function StatisticsPage_ion_card_63_div_15_ion_item_10_div_11_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 163)(1, "span", 164);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](4, "span", 165);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "span", 165);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](8, StatisticsPage_ion_card_63_div_15_ion_item_10_div_11_div_1_span_8_Template, 2, 1, "span", 166);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const rp_r121 = ctx.$implicit;
    const j_r122 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](3, 4, "TABLES.STATS_RP", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](7, _c1, j_r122 + 1)));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("", rp_r121.weight, " kg");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"]("\u00D7 ", rp_r121.reps, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", rp_r121.rir !== undefined);
  }
}
function StatisticsPage_ion_card_63_div_15_ion_item_10_div_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 161);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](1, StatisticsPage_ion_card_63_div_15_ion_item_10_div_11_div_1_Template, 9, 9, "div", 162);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const set_r95 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", set_r95.restPauseSeries);
  }
}
function StatisticsPage_ion_card_63_div_15_ion_item_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-item", 142)(1, "div", 143)(2, "div", 144)(3, "span", 145);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](6, StatisticsPage_ion_card_63_div_15_ion_item_10_span_6_Template, 3, 1, "span", 146);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](7, StatisticsPage_ion_card_63_div_15_ion_item_10_ng_container_7_Template, 15, 7, "ng-container", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](8, StatisticsPage_ion_card_63_div_15_ion_item_10_ng_container_8_Template, 9, 2, "ng-container", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](9, StatisticsPage_ion_card_63_div_15_ion_item_10_ng_container_9_Template, 4, 1, "ng-container", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](10, StatisticsPage_ion_card_63_div_15_ion_item_10_div_10_Template, 2, 1, "div", 147);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](11, StatisticsPage_ion_card_63_div_15_ion_item_10_div_11_Template, 2, 1, "div", 147);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const set_r95 = ctx.$implicit;
    const i_r96 = ctx.index;
    const ctx_r91 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("is-cardio", ctx_r91.isCardio)("is-isometric", ctx_r91.isIsometric);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](5, 11, "TABLES.STATS_SET_LABEL", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](14, _c1, i_r96 + 1)));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", set_r95.restSeconds);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r91.isStrength);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r91.isCardio);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r91.isIsometric);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", set_r95.isDropSet && (set_r95.dropSeries == null ? null : set_r95.dropSeries.length) > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", set_r95.isRestPause && (set_r95.restPauseSeries == null ? null : set_r95.restPauseSeries.length) > 0);
  }
}
function StatisticsPage_ion_card_63_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div")(1, "div", 135)(2, "div", 136)(3, "span", 137);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](5, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](6, "span", 138);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](9, StatisticsPage_ion_card_63_div_15_ion_icon_9_Template, 1, 0, "ion-icon", 139);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](10, StatisticsPage_ion_card_63_div_15_ion_item_10_Template, 12, 16, "ion-item", 140);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const session_r89 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](5, 4, "TABLES.STATS_MICROCYCLE", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction1"](10, _c1, session_r89.splitIndex)));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind2"](8, 7, session_r89.date, "dd/MM/yyyy"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", session_r89.notes);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", session_r89.sets);
  }
}
function StatisticsPage_ion_card_63_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-card")(1, "ion-card-header")(2, "ion-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "ion-card-content")(6, "div", 127)(7, "span", 128);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](9, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](10, StatisticsPage_ion_card_63_ng_container_10_Template, 7, 6, "ng-container", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](11, StatisticsPage_ion_card_63_ng_container_11_Template, 7, 6, "ng-container", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](12, StatisticsPage_ion_card_63_ng_container_12_Template, 4, 3, "ng-container", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](13, StatisticsPage_ion_card_63_span_13_Template, 3, 3, "span", 129);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](14, "ion-list", 130);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](15, StatisticsPage_ion_card_63_div_15_Template, 11, 12, "div", 131);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 11, "TABLES.STATS_DETAILED_HISTORY"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("is-cardio", ctx_r10.isCardio)("is-isometric", ctx_r10.isIsometric);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](9, 13, "TABLES.STATS_SESSION"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r10.isStrength);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r10.isCardio);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r10.isIsometric);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx_r10.isStrength);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx_r10.filteredHistory);
  }
}
function StatisticsPage_div_64_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 168);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "ion-icon", 169);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 2, "TABLES.STATS_SELECT_ROUTINE_EXERCISE"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](7, 4, "TABLES.STATS_SELECT_HINT"));
  }
}
function StatisticsPage_div_65_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "div", 168);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](1, "ion-icon", 170);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](4, 2, "TABLES.STATS_NO_DATA"));
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](7, 4, "TABLES.STATS_NO_DATA_HINT"));
  }
}
const _c3 = function () {
  return {
    cssClass: "no-cancel-action-sheet"
  };
};
chart_js__WEBPACK_IMPORTED_MODULE_12__.Chart.register(...chart_js__WEBPACK_IMPORTED_MODULE_12__.registerables);
class StatisticsPage {
  get compareSplitIndexA() {
    return this.optionsForA.find(o => o.idx === this.compareIndexA)?.splitIndex;
  }
  get compareSplitIndexB() {
    return this.optionsForB.find(o => o.idx === this.compareIndexB)?.splitIndex;
  }
  // Metrics

  get isStrength() {
    return !this.isCardio && !this.isIsometric;
  }
  // Calendar State

  constructor(tableService, navCtrl, ionicUtilService, exerciseHistoryService, route, pinnedExerciseNoteService, translate) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "tableService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "navCtrl", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "exerciseHistoryService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "route", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "pinnedExerciseNoteService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "translate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "progressionCanvas", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "table", void 0);
    // Selectors Data
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "workouts", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "exercises", []);
    // Selection State
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "selectedWorkoutName", "");
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "selectedExerciseId", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "selectedExerciseName", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "selectedSetIndex", 0);
    // 0 significa "Serie 1"
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "availableSetOptions", []);
    // Chart State
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "chart", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "chartMode", "evolution");
    // evolution (series) o volume (efectivo/RIR)
    // Data State
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "historyData", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "filteredHistory", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "comparisonData", null);
    // Comparison selectors (index within filteredHistory, desc order)
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "compareIndexA", 1);
    // "de" (origen, más antiguo)
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "compareIndexB", 0);
    // "a"  (destino, más reciente)
    // Opciones válidas para cada selector (se recalculan al cambiar selección)
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "optionsForA", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "optionsForB", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "metrics", {
      totalVolume: 0,
      max1RM: 0
    });
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "personalRecord", 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "workoutCompletionCount", 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isCardio", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isIsometric", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "calendarCurrentDate", new Date());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "calendarDays", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "monthYearString", "");
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "hasCompletedWorkouts", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "uniqueWorkoutTypes", []);
    // Data structures for efficient lookup
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "workoutMap", new Map());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "workoutColors", new Map());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "langChangeSubscription", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "SET_COLORS", ["#fe9000", "#d4af37", "#3880ff", "#2dd36f", "#eb445a", "#a78bfa", "#ffc409", "#00d98b", "#4a9eff", "#ffd359"]);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "availableColors", ["#fe9000", "#3880ff", "#2dd36f", "#ffd359", "#ffc455", "#eb445a", "#a78bfa", "#00d98b", "#ffc409", "#4a9eff"]);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "weekDaysHeader", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "historicalStats", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "historicalStatsLoading", false);
    // TASK-020 (MASTER_BACKLOG.md) — reemplaza el gate de TASK-007
    // (hideHistoricalStats): ahora que el endpoint de histórico admite un
    // cliente explícito, la tarjeta se muestra siempre — solo cambia a qué
    // endpoint apunta la petición (ver loadHistoricalStats). null en la ruta
    // de consumidor ('/statistics', sin :clientId): pide su propio histórico,
    // exactamente como siempre.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "clientIdForHistory", null);
    // Nota anclada a la posición (día+ejercicio) de este ejercicio en el
    // microciclo más reciente de la tabla — no varía al navegar el histórico,
    // es la misma nota que se ve en "Añadir ejercicio" (config-exercise.page).
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "pinnedNote", null);
    this.tableService = tableService;
    this.navCtrl = navCtrl;
    this.ionicUtilService = ionicUtilService;
    this.exerciseHistoryService = exerciseHistoryService;
    this.route = route;
    this.pinnedExerciseNoteService = pinnedExerciseNoteService;
    this.translate = translate;
  }
  ngOnInit() {
    this.weekDaysHeader = [this.translate.instant("COMMON.MON"), this.translate.instant("COMMON.TUE"), this.translate.instant("COMMON.WED"), this.translate.instant("COMMON.THU"), this.translate.instant("COMMON.FRI"), this.translate.instant("COMMON.SAT"), this.translate.instant("COMMON.SUN")];
    this.clientIdForHistory = this.route.snapshot.paramMap.get("clientId");
    this.table = this.tableService.currentTable();
    if (this.table && this.table.splits) {
      this.extractWorkouts();
      this.preProcessWorkoutData();
      this.updateCalendarDisplay();
    }
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.weekDaysHeader = [this.translate.instant("COMMON.MON"), this.translate.instant("COMMON.TUE"), this.translate.instant("COMMON.WED"), this.translate.instant("COMMON.THU"), this.translate.instant("COMMON.FRI"), this.translate.instant("COMMON.SAT"), this.translate.instant("COMMON.SUN")];
      this.updateCalendarDisplay();
      if (this.chart) {
        this.updateChart();
      }
    });
  }
  ngOnDestroy() {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
    if (this.chart) {
      this.chart.destroy();
    }
  }
  goBack() {
    this.navCtrl.back();
  }
  // --- Data Pre-processing ---
  extractWorkouts() {
    const workoutMap = new Map();
    if (!this.table || !this.table.splits) return;
    this.table.splits.forEach(split => {
      split.workouts.forEach(w => {
        if (!workoutMap.has(w.name)) {
          // Clonar para no mutar el original
          workoutMap.set(w.name, {
            ...w,
            exercises: [...w.exercises]
          });
        } else {
          const existingWorkout = workoutMap.get(w.name);
          // Añadir solo ejercicios que no estén ya en la lista
          w.exercises.forEach(newEx => {
            const alreadyExists = existingWorkout.exercises.some(ex => {
              // Comparación robusta: ID de base de ejercicio o nombre si no hay base
              const idMatches = ex.exercise?._id && newEx.exercise?._id && ex.exercise._id === newEx.exercise._id;
              const nameMatches = !ex.exercise?._id && !newEx.exercise?._id && ex.exercise?.name === newEx.exercise?.name;
              return idMatches || nameMatches;
            });
            if (!alreadyExists) {
              existingWorkout.exercises.push(newEx);
            }
          });
        }
      });
    });
    this.workouts = Array.from(workoutMap.values());
  }
  preProcessWorkoutData() {
    this.workoutMap.clear();
    this.workoutColors.clear();
    if (!this.table || !this.table.splits) return;
    this.table.splits.forEach(split => {
      split.workouts.forEach(w => {
        if (w.date) {
          const dateObj = new Date(w.date);
          const dateStr = this.formatDate(dateObj);
          if (!this.workoutMap.has(dateStr)) {
            this.workoutMap.set(dateStr, []);
          }
          const workoutsOnDate = this.workoutMap.get(dateStr);
          if (!workoutsOnDate.includes(w.name)) {
            workoutsOnDate.push(w.name);
          }
          if (!this.workoutColors.has(w.name)) {
            const colorIndex = this.workoutColors.size % this.availableColors.length;
            this.workoutColors.set(w.name, this.availableColors[colorIndex]);
          }
        }
      });
    });
    const types = [];
    this.workoutColors.forEach((color, name) => {
      types.push({
        name,
        color
      });
    });
    this.uniqueWorkoutTypes = types.sort((a, b) => a.name.localeCompare(b.name));
  }
  updateCalendarDisplay() {
    this.generateMonthYearString();
    this.generateCalendarDays();
    this.hasCompletedWorkouts = this.calendarDays.some(d => d.completed);
  }
  generateMonthYearString() {
    const locale = this.translate.currentLang === "en" ? "en" : "es";
    this.monthYearString = this.calendarCurrentDate.toLocaleDateString(locale, {
      month: "long",
      year: "numeric"
    });
  }
  generateCalendarDays() {
    this.calendarDays = [];
    const year = this.calendarCurrentDate.getFullYear();
    const month = this.calendarCurrentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    let adjustedStartDay = startDayOfWeek === 0 ? 6 : startDayOfWeek - 1;
    for (let i = 0; i < adjustedStartDay; i++) {
      this.calendarDays.push({
        day: "",
        date: "",
        workoutNames: [],
        workouts: [],
        completed: false,
        inactive: true
      });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = this.formatDate(new Date(year, month, i));
      const workoutNames = this.workoutMap.get(dateStr) || [];
      const workoutsWithColors = workoutNames.map(name => ({
        name,
        color: this.workoutColors.get(name) || "#ff6b35"
      }));
      this.calendarDays.push({
        day: i,
        date: dateStr,
        workoutNames: workoutNames,
        workouts: workoutsWithColors,
        completed: workoutNames.length > 0,
        inactive: false
      });
    }
  }
  changeMonth(delta) {
    this.calendarCurrentDate = new Date(this.calendarCurrentDate.getFullYear(), this.calendarCurrentDate.getMonth() + delta, 1);
    this.updateCalendarDisplay();
  }
  // --- Events ---
  onWorkoutChange(event) {
    const workoutName = event.detail.value;
    if (!workoutName) return;
    this.selectedWorkoutName = workoutName;
    const workout = this.workouts.find(w => w.name === workoutName);
    if (workout) {
      this.exercises = workout.exercises;
      this.selectedExerciseId = null;
      this.selectedExerciseName = null;
      this.pinnedNote = null;
      this.historyData = [];
      this.filteredHistory = [];
      this.comparisonData = null;
      this.compareIndexA = 1;
      this.compareIndexB = 0;
      this.calculateWorkoutStats();
    }
  }
  onExerciseChange(event) {
    const exerciseId = event.detail.value;
    if (!exerciseId) return;
    this.selectedExerciseId = exerciseId;
    const exercise = this.exercises.find(ex => ex._id === exerciseId);
    if (exercise) {
      this.selectedExerciseName = exercise.exercise?.name || this.translate.instant("TABLES.STATS_SELECT_EXERCISE");
      this.selectedSetIndex = 0; // Reset a primera serie
      this.chartMode = "evolution"; // Default mode
      this.generateHistoryData();
      this.loadHistoricalStats(exercise);
      this.loadPinnedNote(exercise);
    }
  }
  // Nota anclada del ejercicio en el microciclo más reciente de la tabla —
  // misma nota que ya se ve en "Añadir ejercicio" (config-exercise.page),
  // no cambia al navegar el histórico de microciclos pasados.
  loadPinnedNote(exercise) {
    this.pinnedNote = null;
    const targetExDefId = exercise.exercise?._id;
    const latestSplit = this.table?.splits?.[this.table.splits.length - 1];
    if (!this.table?._id || !targetExDefId || !latestSplit) return;
    const workoutIndex = latestSplit.workouts.findIndex(w => w.name === this.selectedWorkoutName);
    if (workoutIndex === -1) return;
    const exerciseIndex = latestSplit.workouts[workoutIndex].exercises.findIndex(e => e.exercise?._id === targetExDefId);
    if (exerciseIndex === -1) return;
    this.pinnedExerciseNoteService.getByPosition(this.table._id, workoutIndex, exerciseIndex).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.take)(1)).subscribe(note => {
      this.pinnedNote = note;
    });
  }
  // Histórico a través de TODAS las rutinas del usuario (no solo la actual)
  // — distinto de generateHistoryData()/personalRecord, que están
  // escopeados a la rutina abierta + el nombre de workout seleccionado.
  loadHistoricalStats(exercise) {
    this.historicalStats = null;
    this.historicalStatsLoading = true;
    this.exerciseHistoryService.getStatsForExercise$(exercise.exercise?._id ?? null, exercise.exercise?.name ?? "", this.clientIdForHistory).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_13__.take)(1)).subscribe({
      next: stats => {
        this.historicalStats = stats;
        this.historicalStatsLoading = false;
      },
      error: () => {
        this.historicalStatsLoading = false;
      }
    });
  }
  onChartModeChange(event) {
    this.chartMode = event.detail.value;
    setTimeout(() => this.updateChart());
  }
  onSetTypeChange(event) {
    this.selectedSetIndex = event.detail.value;
    setTimeout(() => this.updateChart());
  }
  onCompareChange() {
    // A debe ser más antiguo (índice mayor en array desc) que B
    if (this.compareIndexA <= this.compareIndexB) return;
    this.refreshCompareOptions();
    this.calculateComparison();
  }
  refreshCompareOptions() {
    // optionsForA: solo microciclos con índice > compareIndexB (más antiguos que B)
    this.optionsForA = this.filteredHistory.map((s, i) => ({
      idx: i,
      splitIndex: s.splitIndex
    })).filter(o => o.idx > this.compareIndexB);
    // optionsForB: solo microciclos con índice < compareIndexA (más recientes que A)
    this.optionsForB = this.filteredHistory.map((s, i) => ({
      idx: i,
      splitIndex: s.splitIndex
    })).filter(o => o.idx < this.compareIndexA);
  }
  // --- Core Logic ---
  calculateWorkoutStats() {
    this.workoutCompletionCount = 0;
    if (!this.table || !this.table.splits || !this.selectedWorkoutName) return;
    this.table.splits.forEach(split => {
      const workout = split.workouts.find(w => w.name === this.selectedWorkoutName);
      if (workout && workout.date) {
        const isStarted = workout.exercises && workout.exercises.some(ex => this.isExerciseStarted(ex));
        if (isStarted) this.workoutCompletionCount++;
      }
    });
  }
  generateHistoryData() {
    this.historyData = [];
    this.comparisonData = null;
    if (!this.selectedWorkoutName || !this.selectedExerciseId || !this.table) return;
    const targetExDef = this.exercises.find(e => e._id === this.selectedExerciseId);
    const targetExDefId = targetExDef?.exercise?._id;
    if (!targetExDefId) return;
    this.isCardio = !!targetExDef?.exercise?.isCardio;
    this.isIsometric = !!targetExDef?.exercise?.isIsometric;
    this.table.splits.forEach((split, index) => {
      const workout = split.workouts.find(w => w.name === this.selectedWorkoutName);
      if (workout && workout.date) {
        const targetEx = workout.exercises.find(e => e.exercise?._id === targetExDefId);
        if (targetEx && this.isExerciseStarted(targetEx)) {
          const filteredSets = targetEx.sets.filter(s => s.doned || s.weight > 0 && s.reps > 0 || s.velocity && s.velocity > 0 || s.time && (0,src_app_shared_utils__WEBPACK_IMPORTED_MODULE_3__.parseTimeToSeconds)(s.time) > 0);
          // Build SessionSet array with sub-series
          const sessionSets = filteredSets.map(s => {
            const normalizedRir = (0,src_app_core_models_rir__WEBPACK_IMPORTED_MODULE_2__.normalizeRirValue)(s.rir);
            const rirNumeric = normalizedRir && normalizedRir[0] !== src_app_core_models_rir__WEBPACK_IMPORTED_MODULE_2__.RIR_FAIL_VALUE ? normalizedRir[0] : undefined;
            return {
              weight: s.weight || 0,
              reps: s.reps || 0,
              rir: (0,src_app_core_models_rir__WEBPACK_IMPORTED_MODULE_2__.formatRirValue)(normalizedRir),
              rirNumeric,
              velocity: s.velocity || 0,
              time: s.time,
              timeSeconds: (0,src_app_shared_utils__WEBPACK_IMPORTED_MODULE_3__.parseTimeToSeconds)(s.time),
              distance: s.distance || 0,
              isDropSet: s.drop === true,
              isRestPause: !!(s.restPause && s.restPause > 0),
              isFail: (0,src_app_core_models_rir__WEBPACK_IMPORTED_MODULE_2__.isRirFail)(s.rir),
              restSeconds: s.restSeconds,
              dropSeries: s.dropSetSeries || [],
              restPauseSeries: s.restPauseSeries || []
            };
          });
          // Real volume: base + all DS/RP sub-series
          const volumeBase = this.calculateVolume(filteredSets);
          const volumeReal = this.calculateVolumeWithSubSeries(filteredSets);
          const bestSet = this.getBestSet(targetEx.sets);
          const totalTimeSeconds = sessionSets.reduce((acc, s) => acc + (s.timeSeconds || 0), 0);
          const maxHoldSeconds = Math.max(...sessionSets.map(s => s.timeSeconds || 0), 0);
          const maxV = Math.max(...sessionSets.map(s => s.velocity || 0), 0);
          // Average RIR (only numeric, non-fail)
          const rirSets = sessionSets.filter(s => typeof s.rirNumeric === "number" && s.rirNumeric >= 0);
          const avgRir = rirSets.length > 0 ? rirSets.reduce((acc, s) => acc + (s.rirNumeric ?? 0), 0) / rirSets.length : -1;
          // Calculate Effective Volume
          let effectiveVolume = 0;
          if (!this.isCardio && !this.isIsometric) {
            sessionSets.forEach(s => {
              const weight = s.weight || 0;
              const reps = s.reps || 0;
              let factor = 0.5; // Default for RIR 4+ or no RIR
              if (s.isFail || s.rirNumeric === 0 || s.rirNumeric === 1) factor = 1.0;else if (s.rirNumeric === 2 || s.rirNumeric === 3) factor = 0.8;
              effectiveVolume += weight * reps * factor;
            });
          }
          const dropSetCount = sessionSets.filter(s => s.isDropSet).length;
          const restPauseCount = sessionSets.filter(s => s.isRestPause).length;
          let sessionMax1RM = 0;
          if (!this.isCardio && !this.isIsometric) {
            sessionSets.forEach(s => {
              if (s.weight && s.reps) {
                const oneRM = this.calculate1RM(s.weight, s.reps);
                if (oneRM > sessionMax1RM) sessionMax1RM = oneRM;
              }
            });
          }
          this.historyData.push({
            date: new Date(workout.date),
            splitIndex: index + 1,
            sets: sessionSets,
            volume: volumeReal,
            volumeBase: volumeBase,
            maxWeight: bestSet ? bestSet.weight : 0,
            maxReps: bestSet ? bestSet.reps : 0,
            maxVelocity: maxV,
            totalTimeSeconds,
            maxHoldSeconds,
            isCardio: this.isCardio,
            isIsometric: this.isIsometric,
            notes: targetEx.notes || "",
            avgRir,
            minRir: rirSets.length > 0 ? Math.min(...rirSets.map(s => s.rirNumeric ?? 0)) : -1,
            dropSetCount,
            restPauseCount,
            sessionMax1RM,
            effectiveVolume
          });
        }
      }
    });
    this.historyData.sort((a, b) => b.splitIndex - a.splitIndex);
    this.filteredHistory = [...this.historyData];
    // Calcular cuántas series máximas hay para este ejercicio en el historial
    const maxSets = Math.max(...this.historyData.map(h => h.sets.length), 0);
    this.availableSetOptions = Array.from({
      length: maxSets
    }, (_, i) => i);
    this.calculateMetrics();
    // Reset compare indices to last two by default
    this.compareIndexA = Math.min(1, this.filteredHistory.length - 1);
    this.compareIndexB = 0;
    this.refreshCompareOptions();
    this.calculateComparison();
    setTimeout(() => this.updateChart());
  }
  calculateComparison() {
    this.comparisonData = null;
    if (this.filteredHistory.length < 2) return;
    // Use selected indices; A = "from", B = "to"
    const prev = this.filteredHistory[this.compareIndexA];
    const curr = this.filteredHistory[this.compareIndexB];
    if (!prev || !curr) return;
    const weightDiff = curr.maxWeight - prev.maxWeight;
    const weightPct = prev.maxWeight > 0 ? weightDiff / prev.maxWeight * 100 : 0;
    const volumeDiff = curr.volume - prev.volume;
    const volumePct = prev.volume > 0 ? volumeDiff / prev.volume * 100 : 0;
    const rirDiff = curr.avgRir >= 0 && prev.avgRir >= 0 ? curr.avgRir - prev.avgRir : 0;
    const setsDiff = curr.sets.length - prev.sets.length;
    const effVolumeDiff = curr.effectiveVolume - prev.effectiveVolume;
    const effVolumePct = prev.effectiveVolume > 0 ? effVolumeDiff / prev.effectiveVolume * 100 : 0;
    // Cardio specific diffs
    const velocityDiff = curr.maxVelocity - prev.maxVelocity;
    const velocityPct = prev.maxVelocity > 0 ? velocityDiff / prev.maxVelocity * 100 : 0;
    const prevTimeTotal = prev.totalTimeSeconds / 60;
    const currTimeTotal = curr.totalTimeSeconds / 60;
    const timeDiff = currTimeTotal - prevTimeTotal;
    const timePct = prevTimeTotal > 0 ? timeDiff / prevTimeTotal * 100 : 0;
    // Isometric specific diffs
    const maxHoldDiff = curr.maxHoldSeconds - prev.maxHoldSeconds;
    const maxHoldPct = prev.maxHoldSeconds > 0 ? maxHoldDiff / prev.maxHoldSeconds * 100 : 0;
    this.comparisonData = {
      prevSplit: prev.splitIndex,
      currSplit: curr.splitIndex,
      prevMaxWeight: prev.maxWeight,
      currMaxWeight: curr.maxWeight,
      weightDiff,
      weightPct,
      prevVolume: prev.volume,
      currVolume: curr.volume,
      volumeDiff,
      volumePct,
      prevAvgRir: prev.avgRir,
      currAvgRir: curr.avgRir,
      rirDiff,
      prevSets: prev.sets.length,
      currSets: curr.sets.length,
      setsDiff,
      prevDropSets: prev.dropSetCount,
      currDropSets: curr.dropSetCount,
      prevRestPauses: prev.restPauseCount,
      currRestPauses: curr.restPauseCount,
      prevEffectiveVolume: prev.effectiveVolume,
      currEffectiveVolume: curr.effectiveVolume,
      effVolumeDiff,
      effVolumePct,
      // Cardio fields
      prevMaxVelocity: prev.maxVelocity,
      currMaxVelocity: curr.maxVelocity,
      velocityDiff,
      velocityPct,
      prevTotalTime: prevTimeTotal,
      currTotalTime: currTimeTotal,
      timeDiff,
      timePct,
      // Isometric fields
      prevMaxHold: prev.maxHoldSeconds,
      currMaxHold: curr.maxHoldSeconds,
      maxHoldDiff,
      maxHoldPct
    };
  }
  calculateMetrics() {
    if (this.historyData.length === 0) {
      this.personalRecord = 0;
      this.metrics.max1RM = 0;
      this.metrics.totalVolume = 0;
      return;
    }
    if (this.isCardio) {
      this.personalRecord = Math.max(...this.historyData.map(h => h.maxVelocity));
      this.metrics.max1RM = this.historyData.reduce((acc, h) => acc + h.totalTimeSeconds / 60, 0);
      this.metrics.totalVolume = this.historyData.length;
    } else if (this.isIsometric) {
      // personalRecord reciclado como "aguante más largo" (segundos), a
      // propósito, mismo patrón que ya usa cardio con maxVelocity.
      this.personalRecord = Math.max(...this.historyData.map(h => h.maxHoldSeconds));
      this.metrics.max1RM = this.historyData.reduce((acc, h) => acc + h.totalTimeSeconds / 60, 0);
      this.metrics.totalVolume = this.historyData.length;
    } else {
      this.personalRecord = Math.max(...this.historyData.map(h => h.maxWeight));
      let peak1RM = 0;
      this.historyData.forEach(session => {
        session.sets.forEach(set => {
          if (set.weight && set.reps) {
            const current1RM = this.calculate1RM(set.weight, set.reps);
            if (current1RM > peak1RM) peak1RM = current1RM;
          }
        });
      });
      this.metrics.max1RM = peak1RM;
      this.metrics.totalVolume = this.historyData.reduce((acc, h) => acc + (h.volume || 0), 0);
    }
  }
  // --- Chart Dispatcher ---
  updateChart() {
    if (!this.progressionCanvas || !this.progressionCanvas.nativeElement) return;
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    const data = [...this.filteredHistory].reverse();
    if (data.length === 0) return;
    if (this.chartMode === "evolution") {
      this.buildProgressionChart(data);
    } else {
      this.buildEffectiveVolumeChart(data);
    }
  }
  buildEffectiveVolumeChart(data) {
    const ctx = this.progressionCanvas.nativeElement.getContext("2d");
    const labels = data.map(h => `M${h.splitIndex}`);
    if (this.isCardio) {
      const timeData = data.map(h => h.totalTimeSeconds / 60);
      const velocityData = data.map(h => h.maxVelocity);
      this.chart = new chart_js__WEBPACK_IMPORTED_MODULE_12__.Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [{
            type: "bar",
            label: this.translate.instant("TABLES.STATS_TOTAL_TIME") + " (min)",
            data: timeData,
            backgroundColor: "rgba(56, 128, 255, 0.4)",
            borderColor: "#3880ff",
            borderWidth: 1,
            borderRadius: 4,
            yAxisID: "y"
          }, {
            type: "line",
            label: this.translate.instant("TABLES.STATS_BEST_SPEED") + " (km/h)",
            data: velocityData,
            borderColor: "#fe9000",
            borderWidth: 2,
            tension: 0.3,
            pointRadius: 4,
            yAxisID: "y1"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                color: "rgba(255,255,255,0.7)",
                font: {
                  size: 10
                }
              }
            },
            tooltip: {
              callbacks: {
                label: ctx => {
                  if (ctx.datasetIndex === 0) return ` ${this.translate.instant("TABLES.STATS_TIME")}: ${ctx.raw} min`;
                  return ` ${this.translate.instant("TABLES.STATS_SPEED")}: ${ctx.raw} km/h`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: "rgba(255,255,255,0.5)"
              }
            },
            y: {
              position: "left",
              title: {
                display: true,
                text: "min",
                color: "rgba(255,255,255,0.3)"
              },
              ticks: {
                color: "rgba(255,255,255,0.5)"
              }
            },
            y1: {
              position: "right",
              title: {
                display: true,
                text: "km/h",
                color: "rgba(254, 144, 0, 0.8)"
              },
              grid: {
                drawOnChartArea: false
              },
              ticks: {
                color: "rgba(254, 144, 0, 0.8)"
              }
            }
          }
        }
      });
    } else if (this.isIsometric) {
      // Solo una serie (tiempo total aguantado), sin segundo eje — a
      // diferencia de cardio, isométrico no tiene una segunda métrica de ritmo.
      const timeData = data.map(h => h.totalTimeSeconds / 60);
      this.chart = new chart_js__WEBPACK_IMPORTED_MODULE_12__.Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [{
            type: "bar",
            label: this.translate.instant("TABLES.STATS_TOTAL_TIME") + " (min)",
            data: timeData,
            backgroundColor: "rgba(56, 128, 255, 0.4)",
            borderColor: "#3880ff",
            borderWidth: 1,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                color: "rgba(255,255,255,0.7)",
                font: {
                  size: 10
                }
              }
            },
            tooltip: {
              callbacks: {
                label: ctx => ` ${this.translate.instant("TABLES.STATS_TIME")}: ${ctx.raw} min`
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: "rgba(255,255,255,0.5)"
              }
            },
            y: {
              position: "left",
              title: {
                display: true,
                text: "min",
                color: "rgba(255,255,255,0.3)"
              },
              ticks: {
                color: "rgba(255,255,255,0.5)"
              }
            }
          }
        }
      });
    } else {
      const volData = data.map(h => h.effectiveVolume);
      const rirData = data.map(h => h.avgRir >= 0 ? h.avgRir : null);
      this.chart = new chart_js__WEBPACK_IMPORTED_MODULE_12__.Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [{
            type: "bar",
            label: this.translate.instant("TABLES.STATS_EFFECTIVE_VOLUME") + " (kg)",
            data: volData,
            backgroundColor: "rgba(254, 144, 0, 0.4)",
            borderColor: "#fe9000",
            borderWidth: 1,
            borderRadius: 4,
            yAxisID: "y"
          }, {
            type: "line",
            label: this.translate.instant("TABLES.STATS_AVG_RIR"),
            data: rirData,
            borderColor: "#3880ff",
            backgroundColor: "transparent",
            borderWidth: 3,
            pointRadius: 4,
            tension: 0.3,
            yAxisID: "y1"
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
              labels: {
                color: "rgba(255,255,255,0.7)",
                font: {
                  size: 10
                }
              }
            },
            tooltip: {
              callbacks: {
                label: ctx => {
                  if (ctx.datasetIndex === 0) return ` ${this.translate.instant("TABLES.STATS_VOLUME")}: ${ctx.raw} kg`;
                  return ` ${this.translate.instant("TABLES.STATS_AVG_RIR")}: ${ctx.raw}`;
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                color: "rgba(255,255,255,0.5)"
              }
            },
            y: {
              position: "left",
              title: {
                display: true,
                text: "kg",
                color: "rgba(255,255,255,0.3)"
              },
              ticks: {
                color: "rgba(255,255,255,0.5)"
              }
            },
            y1: {
              position: "right",
              reverse: true,
              title: {
                display: true,
                text: "RIR",
                color: "rgba(255,255,255,0.3)"
              },
              grid: {
                drawOnChartArea: false
              },
              min: 0,
              ticks: {
                color: "rgba(56, 128, 255, 0.8)"
              }
            }
          }
        }
      });
    }
  }
  // --- Chart: Progression (Weight and Reps of Selected/Best Set) ---
  buildProgressionChart(data) {
    const ctx = this.progressionCanvas.nativeElement.getContext("2d");
    const labels = data.map(h => this.translate.instant("TABLES.STATS_MICROCYCLE", {
      n: h.splitIndex
    }));
    let weightData = [];
    let repsData = [];
    // Serie específica (1, 2, 3...)
    weightData = data.map(h => {
      const s = h.sets[this.selectedSetIndex];
      if (!s) return null;
      if (this.isCardio) return s.velocity || 0;
      if (this.isIsometric) return s.timeSeconds ? s.timeSeconds / 60 : 0;
      return s.weight || 0;
    });
    repsData = data.map(h => {
      const s = h.sets[this.selectedSetIndex];
      if (!s) return null;
      return this.isCardio ? s.timeSeconds ? s.timeSeconds / 60 : 0 : s.reps || 0;
    });
    const yUnit = this.isCardio ? "km/h" : this.isIsometric ? "min" : "kg";
    const repsUnit = this.isCardio ? "min" : "reps";
    const primaryLabel = this.isCardio ? this.translate.instant("TABLES.STATS_SPEED") : this.isIsometric ? this.translate.instant("TABLES.STATS_TIME") : this.translate.instant("TABLES.STATS_WEIGHT") + " (kg)";
    const datasets = [{
      label: primaryLabel,
      data: weightData,
      borderColor: "#fe9000",
      backgroundColor: "rgba(254, 144, 0, 0.12)",
      borderWidth: 3,
      tension: 0.3,
      fill: true,
      pointBackgroundColor: "#fe9000",
      pointBorderColor: "#fff",
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
      spanGaps: true,
      yAxisID: "y"
    }];
    // Isométrico: una sola serie (tiempo), sin segunda métrica.
    if (!this.isIsometric) {
      datasets.push({
        label: this.isCardio ? this.translate.instant("TABLES.STATS_TIME") : this.translate.instant("TABLES.STATS_REPS"),
        data: repsData,
        borderColor: "#3880ff",
        backgroundColor: "rgba(56, 128, 255, 0.05)",
        borderWidth: 2,
        borderDash: [5, 4],
        tension: 0.3,
        fill: false,
        pointBackgroundColor: "#3880ff",
        pointBorderColor: "#fff",
        pointBorderWidth: 1,
        pointRadius: 3,
        pointHoverRadius: 5,
        spanGaps: true,
        yAxisID: "y1"
      });
    }
    this.chart = new chart_js__WEBPACK_IMPORTED_MODULE_12__.Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "rgba(255,255,255,0.7)",
              font: {
                size: 10
              }
            }
          },
          tooltip: {
            callbacks: {
              label: ctx => {
                const v = ctx.raw;
                if (v == null) return "";
                if (ctx.datasetIndex === 0) return ` ${this.isCardio ? this.translate.instant("TABLES.STATS_SPEED") : this.translate.instant("TABLES.STATS_WEIGHT")}: ${v} ${yUnit}`;
                return ` ${this.isCardio ? this.translate.instant("TABLES.STATS_TIME") : this.translate.instant("TABLES.STATS_REPS")}: ${v} ${repsUnit}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: "rgba(255,255,255,0.5)"
            }
          },
          y: {
            position: "left",
            ticks: {
              color: "rgba(255,255,255,0.5)"
            }
          },
          y1: {
            position: "right",
            grid: {
              drawOnChartArea: false
            },
            ticks: {
              color: "rgba(56, 128, 255, 0.8)"
            }
          }
        }
      }
    });
  }
  showNoteAlert(_x) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* (notes, title = _this.translate.instant("NOTES.TITLE")) {
      const alertOptions = {
        header: title,
        message: notes,
        buttons: [_this.translate.instant("COMMON.OK")],
        cssClass: "notes-alert"
      };
      yield _this.ionicUtilService.showAlert(alertOptions);
    }).apply(this, arguments);
  }
  // --- Helpers ---
  getDiffIcon(diff) {
    if (diff > 0) return "trending-up-outline";
    if (diff < 0) return "trending-down-outline";
    return "remove-outline";
  }
  getDiffClass(diff, inverse = false) {
    if (diff === 0) return "neutral";
    const positive = diff > 0;
    if (inverse) return positive ? "negative" : "positive"; // for RIR: lower is better
    return positive ? "positive" : "negative";
  }
  formatPerformedRir(rir) {
    return (0,src_app_core_models_rir__WEBPACK_IMPORTED_MODULE_2__.formatRirValue)(rir);
  }
  formatSeconds(seconds) {
    return (0,src_app_shared_utils__WEBPACK_IMPORTED_MODULE_3__.formatSecondsAsTime)(seconds || 0);
  }
  formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  isExerciseStarted(ex) {
    return ex.sets && ex.sets.some(s => s.doned || s.weight > 0 && s.reps > 0 || s.velocity && s.velocity > 0 || s.distance && s.distance > 0 || (0,src_app_shared_utils__WEBPACK_IMPORTED_MODULE_3__.parseTimeToSeconds)(s.time) > 0);
  }
  getBestSet(sets) {
    if (!sets || sets.length === 0) return null;
    return sets.reduce((prev, curr) => {
      if (this.isCardio) {
        const prevV = prev ? prev.velocity || 0 : 0;
        const currV = curr ? curr.velocity || 0 : 0;
        return currV >= prevV ? curr : prev;
      } else if (this.isIsometric) {
        const prevT = prev ? (0,src_app_shared_utils__WEBPACK_IMPORTED_MODULE_3__.parseTimeToSeconds)(prev.time) : 0;
        const currT = curr ? (0,src_app_shared_utils__WEBPACK_IMPORTED_MODULE_3__.parseTimeToSeconds)(curr.time) : 0;
        return currT >= prevT ? curr : prev;
      } else {
        const prevW = prev ? prev.weight || 0 : 0;
        const currW = curr ? curr.weight || 0 : 0;
        return currW >= prevW ? curr : prev;
      }
    }, sets[0]);
  }
  calculateVolume(sets) {
    return sets ? sets.reduce((acc, s) => acc + (s.weight || 0) * (s.reps || 0), 0) : 0;
  }
  calculateVolumeWithSubSeries(sets) {
    let total = 0;
    sets.forEach(s => {
      // Main set
      total += (s.weight || 0) * (s.reps || 0);
      // Drop set sub-series
      if (s.dropSetSeries && s.dropSetSeries.length > 0) {
        s.dropSetSeries.forEach(ds => {
          total += (ds.weight || 0) * (ds.reps || 0);
        });
      }
      // Rest pause sub-series
      if (s.restPauseSeries && s.restPauseSeries.length > 0) {
        s.restPauseSeries.forEach(rp => {
          total += (rp.weight || 0) * (rp.reps || 0);
        });
      }
    });
    return total;
  }
  calculate1RM(weight, reps) {
    if (reps <= 0) return 0;
    if (reps === 1) return weight;
    return weight * (1 + reps / 30);
  }
}
_StatisticsPage = StatisticsPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(StatisticsPage, "\u0275fac", function StatisticsPage_Factory(t) {
  return new (t || _StatisticsPage)(_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_app_core_services_table_table_service__WEBPACK_IMPORTED_MODULE_4__.TableService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_14__.NavController), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_5__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_app_core_services_exercise_history_exercise_history_service__WEBPACK_IMPORTED_MODULE_6__.ExerciseHistoryService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_15__.ActivatedRoute), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](src_app_core_services_pinned_exercise_note_pinned_exercise_note_service__WEBPACK_IMPORTED_MODULE_7__.PinnedExerciseNoteService), _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslateService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(StatisticsPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineComponent"]({
  type: _StatisticsPage,
  selectors: [["app-statistics"]],
  viewQuery: function StatisticsPage_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵviewQuery"](_c0, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵloadQuery"]()) && (ctx.progressionCanvas = _t.first);
    }
  },
  decls: 66,
  vars: 44,
  consts: [[1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], [1, "tf-page-header__back-button", 3, "click"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "content"], [1, "calendar-card"], [1, "section-icon"], [1, "calendar-header"], ["fill", "clear", 3, "click"], [1, "month-label"], ["name", "chevron-forward-outline"], [1, "calendar-grid"], ["class", "day-header", 4, "ngFor", "ngForOf"], ["class", "day-cell", 3, "inactive", "completed", 4, "ngFor", "ngForOf"], ["class", "calendar-legend", 4, "ngIf"], ["lines", "none"], [1, "select-wrapper"], ["mode", "ios", "interface", "action-sheet", 3, "interfaceOptions", "placeholder", "value", "ionChange"], [3, "value", 4, "ngFor", "ngForOf"], ["name", "chevron-down-outline", 1, "select-icon"], ["mode", "ios", "interface", "action-sheet", 3, "interfaceOptions", "placeholder", "disabled", "value", "ionChange"], ["class", "pinned-note-container", 4, "ngIf"], [4, "ngIf"], ["class", "historical-stats-card", 4, "ngIf"], ["class", "comparison-card", 4, "ngIf"], ["class", "chart-card", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [1, "day-header"], [1, "day-cell"], [1, "day-number"], ["class", "workout-indicators", 4, "ngIf"], [1, "workout-indicators"], ["class", "workout-dot", 3, "background-color", "title", 4, "ngFor", "ngForOf"], [1, "workout-dot", 3, "title"], [1, "calendar-legend"], ["color", "medium"], [1, "legend-title"], [1, "legend-items"], ["class", "legend-chip", 4, "ngFor", "ngForOf"], [1, "legend-chip"], [1, "workout-dot"], [3, "value"], [1, "pinned-note-container"], [1, "pinned-note-card"], [1, "card-header"], [1, "left-section"], [1, "icon-wrapper"], ["name", "pin"], [1, "title"], ["term", "PINNED_NOTE", "size", "sm"], [1, "text"], ["size", "6"], [1, "stat-card"], [1, "stat-label"], [1, "stat-value"], [4, "ngIf", "ngIfElse"], ["notIsometricPr", ""], ["term", "ONE_RM", "size", "sm", 4, "ngIf"], [1, "stat-change"], ["term", "ONE_RM", "size", "sm"], [1, "historical-stats-card"], ["name", "trophy-outline"], ["class", "historical-stats-loading", 4, "ngIf"], [1, "historical-stats-loading"], ["name", "dots"], ["notCardioHistorical", ""], ["notIsometricHistorical", ""], ["noHistoricalData", ""], ["size", "12"], ["color", "medium", 1, "historical-stats-empty"], [1, "comparison-card"], [1, "comparison-header"], [1, "comparison-title-row"], [1, "comparison-selectors"], [1, "select-wrapper", "compare-select-wrapper"], ["type", "button", 1, "microcycle-trigger"], [1, "trigger-value"], ["name", "chevron-down", 1, "trigger-chevron"], ["mode", "ios", "interface", "action-sheet", 1, "micro-cycle-selector-hidden", 3, "interfaceOptions", "ngModel", "ngModelChange", "ionChange"], ["name", "arrow-forward-outline", 1, "compare-arrow"], [1, "comparison-grid"], ["class", "comparison-item", 4, "ngIf"], [1, "comparison-item"], [1, "comparison-item-label"], ["name", "list-outline"], ["term", "SETS_COMPARISON", "size", "sm"], [1, "comparison-item-values"], [1, "prev-val"], [3, "name"], [1, "curr-val"], [1, "comparison-item-pct"], ["class", "neutral", 4, "ngIf"], ["class", "comparison-item comparison-item-full", 4, "ngIf"], ["name", "speedometer-outline"], [1, "neutral"], ["name", "hourglass-outline"], ["name", "time-outline"], ["name", "barbell-outline"], ["term", "BEST_SET", "size", "sm"], ["name", "trending-up-outline"], ["term", "EFFECTIVE_VOLUME", "size", "sm"], ["term", "RIR", "size", "sm"], [1, "comparison-item", "comparison-item-full"], ["name", "flash-outline"], [1, "technique-row"], ["class", "technique-chip ds", 4, "ngIf"], ["class", "technique-chip rp", 4, "ngIf"], [1, "technique-chip", "ds"], [1, "t-label"], [1, "technique-chip", "rp"], [1, "chart-card"], [1, "chart-card-header"], [1, "chart-mode-container"], ["mode", "ios", 3, "ngModel", "ngModelChange", "ionChange"], ["value", "evolution"], ["value", "volume"], ["class", "chart-header-main", 4, "ngIf"], [1, "chart-container"], ["progressionCanvas", ""], [1, "chart-header-main"], [1, "select-wrapper", "set-select-wrapper"], ["mode", "ios", "interface", "popover", 1, "micro-cycle-selector-hidden", 3, "value", "ionChange"], ["color", "medium", 2, "font-size", "0.8rem"], [1, "history-table-header"], [1, "header-col-session"], ["class", "header-col-rir", 4, "ngIf"], ["lines", "none", 1, "history-list"], [4, "ngFor", "ngForOf"], [1, "header-col-weight"], [1, "header-col-reps"], [1, "header-col-rir"], [1, "session-divider"], [1, "session-header-left"], [1, "week-badge-label"], [1, "session-date"], ["name", "create-outline", "color", "primary", "class", "session-note-icon clickable", 3, "click", 4, "ngIf"], ["class", "history-item", 4, "ngFor", "ngForOf"], ["name", "create-outline", "color", "primary", 1, "session-note-icon", "clickable", 3, "click"], [1, "history-item"], [1, "history-row-content"], [1, "col-session"], [1, "set-index"], ["class", "rest-seconds-badge", 4, "ngIf"], ["class", "subseries-container", 4, "ngIf"], [1, "rest-seconds-badge"], ["name", "timer-outline"], [1, "col-weight"], [1, "col-reps"], [1, "col-rir"], ["class", "fail-label", 4, "ngIf"], ["class", "rir-value", 4, "ngIf"], ["class", "intensity-drop", 4, "ngIf"], ["class", "intensity-rp", 4, "ngIf"], [1, "fail-label"], [1, "rir-value"], [1, "intensity-drop"], [1, "intensity-rp"], [1, "subseries-container"], ["class", "subseries-item", 4, "ngFor", "ngForOf"], [1, "subseries-item"], [1, "subseries-label"], [1, "subseries-val"], ["class", "subseries-rir", 4, "ngIf"], [1, "subseries-rir"], [1, "empty-state"], ["name", "stats-chart-outline"], ["name", "alert-circle-outline"]],
  template: function StatisticsPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](0, "ion-header")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function StatisticsPage_Template_button_click_4_listener() {
        return ctx.goBack();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](5, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](6, "ion-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](7, "div", 5)(8, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](10, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](11, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](12, "ion-content")(13, "div", 8)(14, "ion-card", 9)(15, "ion-card-header")(16, "ion-card-subtitle");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](17, "span", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](18);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](19, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](20, "ion-card-content")(21, "div", 11)(22, "ion-button", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function StatisticsPage_Template_ion_button_click_22_listener() {
        return ctx.changeMonth(-1);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](23, "ion-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](24, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](25);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](26, "ion-button", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("click", function StatisticsPage_Template_ion_button_click_26_listener() {
        return ctx.changeMonth(1);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](27, "ion-icon", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](28, "div", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](29, StatisticsPage_div_29_Template, 2, 1, "div", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](30, StatisticsPage_div_30_Template, 4, 6, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](31, StatisticsPage_div_31_Template, 7, 4, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](32, "ion-card")(33, "ion-card-header")(34, "ion-card-subtitle");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](35, "span", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](36);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](37, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](38, "ion-card-content")(39, "ion-item", 19)(40, "div", 20)(41, "ion-select", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ionChange", function StatisticsPage_Template_ion_select_ionChange_41_listener($event) {
        return ctx.onWorkoutChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](42, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](43, StatisticsPage_ion_select_option_43_Template, 4, 8, "ion-select-option", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](44, "ion-icon", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](45, "ion-card")(46, "ion-card-header")(47, "ion-card-subtitle");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](48, "span", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtext"](49);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](50, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementStart"](51, "ion-card-content")(52, "ion-item", 19)(53, "div", 20)(54, "ion-select", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵlistener"]("ionChange", function StatisticsPage_Template_ion_select_ionChange_54_listener($event) {
        return ctx.onExerciseChange($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipe"](55, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](56, StatisticsPage_ion_select_option_56_Template, 3, 4, "ion-select-option", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelement"](57, "ion-icon", 23);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](58, StatisticsPage_div_58_Template, 12, 4, "div", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](59, StatisticsPage_ion_grid_59_Template, 57, 47, "ion-grid", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](60, StatisticsPage_ion_card_60_Template, 9, 5, "ion-card", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](61, StatisticsPage_ion_card_61_Template, 49, 42, "ion-card", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](62, StatisticsPage_ion_card_62_Template, 18, 9, "ion-card", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](63, StatisticsPage_ion_card_63_Template, 16, 15, "ion-card", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](64, StatisticsPage_div_64_Template, 8, 6, "div", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtemplate"](65, StatisticsPage_div_65_Template, 8, 6, "div", 30);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵattribute"]("aria-label", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](5, 28, "COMMON.BACK"));
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](10, 30, "TABLES.STATS_PAGE_TITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](19, 32, "TABLES.STATS_CALENDAR_TITLE"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate"](ctx.monthYearString);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx.weekDaysHeader);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx.calendarDays);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.hasCompletedWorkouts && ctx.uniqueWorkoutTypes.length > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](37, 34, "TABLES.STATS_SELECT_WORKOUT"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("interfaceOptions", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction0"](42, _c3))("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](42, 36, "TABLES.STATS_CHOOSE_WORKOUT"))("value", ctx.selectedWorkoutName);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx.workouts);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵclassProp"]("disabled-card", !ctx.selectedWorkoutName);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](50, 38, "TABLES.STATS_SELECT_EXERCISE"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("interfaceOptions", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpureFunction0"](43, _c3))("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵpipeBind1"](55, 40, "TABLES.STATS_CHOOSE_EXERCISE"))("disabled", !ctx.selectedWorkoutName)("value", ctx.selectedExerciseId);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngForOf", ctx.exercises);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.pinnedNote);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.selectedExerciseId && ctx.historyData.length > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.selectedExerciseId);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.filteredHistory.length >= 2 && ctx.selectedExerciseId);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.selectedExerciseId && ctx.historyData.length > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.selectedExerciseId && ctx.historyData.length > 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", !ctx.selectedWorkoutName || !ctx.selectedExerciseId);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵproperty"]("ngIf", ctx.selectedExerciseId && ctx.historyData.length === 0);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_17__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_17__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_18__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonCard, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonCardContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonCardHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonCardSubtitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonCardTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonChip, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonCol, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonGrid, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonRow, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonSegment, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonSegmentButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonSelect, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonSelectOption, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonSpinner, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonText, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.SelectValueAccessor, _shared_ui_src_app_shared_components_glossary_info_glossary_info_component__WEBPACK_IMPORTED_MODULE_8__.GlossaryInfoComponent, _angular_common__WEBPACK_IMPORTED_MODULE_17__.LowerCasePipe, _angular_common__WEBPACK_IMPORTED_MODULE_17__.DatePipe, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslatePipe, _shared_ui_src_app_shared_pipes_translate_db_pipe__WEBPACK_IMPORTED_MODULE_9__.TranslateDbPipe, _es_number_pipe__WEBPACK_IMPORTED_MODULE_10__.EsNumberPipe],
  styles: ["@charset \"UTF-8\";\n[_nghost-%COMP%] {\n  --black: var(--ion-background-color, #0d0d0d);\n  --dark-gray: var(--ion-card-background, #1a1a1a);\n  --medium-gray: var(--ion-color-step-150, #2a2a2a);\n  --light-gray: var(--ion-color-step-200, #3a3a3a);\n  --text-primary: var(--ion-text-color, #ffffff);\n  --text-secondary: var(--ion-color-step-600, #9a9a9a);\n  --text-tertiary: var(--ion-color-step-400, #6a6a6a);\n  --orange: var(--ion-color-primary, #fe9000);\n  --orange-light: var(--ion-color-primary-tint, #fe9b1a);\n  --orange-dark: var(--ion-color-primary-shade, #e07f00);\n  --orange-glow: rgba(254, 144, 0, 0.3);\n  --blue: var(--ion-color-alternative, #3880ff);\n  --green: var(--ion-color-success, #2dd36f);\n  --purple: var(--ion-color-tertiary, #ffd359);\n}\n\n\n\n*[_ngcontent-%COMP%]:hover, [_ngcontent-%COMP%]::after:hover, [_ngcontent-%COMP%]::before:hover {\n  cursor: default !important;\n}\n\nion-button[_ngcontent-%COMP%], ion-item[_ngcontent-%COMP%], ion-chip[_ngcontent-%COMP%], ion-segment-button[_ngcontent-%COMP%], .clickable[_ngcontent-%COMP%], button[_ngcontent-%COMP%], a[_ngcontent-%COMP%] {\n  --background-hover: transparent !important;\n  --background-activated: transparent !important;\n  --background-focused: transparent !important;\n  --ripple-color: transparent !important;\n  --color-hover: inherit !important;\n  --box-shadow: none !important;\n}\n\n\n\n.content[_ngcontent-%COMP%] {\n  padding: 12px;\n  max-width: 100%;\n  margin: 0 auto;\n  width: 100%;\n  box-sizing: border-box;\n}\n@media (min-width: 768px) {\n  .content[_ngcontent-%COMP%] {\n    max-width: 800px;\n    padding: 16px;\n  }\n}\n\n\n\nion-content[_ngcontent-%COMP%] {\n  --background: var(--black);\n  --color: var(--text-primary);\n}\n\nion-card[_ngcontent-%COMP%] {\n  --background: var(--dark-gray);\n  --color: var(--text-primary);\n  border: 1px solid var(--medium-gray);\n  border-radius: 16px;\n  margin: 0 0 12px 0;\n  box-shadow: none;\n  width: 100%;\n  max-width: 100%;\n  box-sizing: border-box;\n}\n@media (min-width: 768px) {\n  ion-card[_ngcontent-%COMP%] {\n    margin-bottom: 16px;\n  }\n}\nion-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {\n  padding: 14px 16px 6px;\n}\n@media (min-width: 768px) {\n  ion-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {\n    padding: 16px 20px 8px;\n  }\n}\nion-card[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {\n  font-size: 17px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n@media (min-width: 768px) {\n  ion-card[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n}\nion-card[_ngcontent-%COMP%]   ion-card-subtitle[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n@media (min-width: 768px) {\n  ion-card[_ngcontent-%COMP%]   ion-card-subtitle[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n}\nion-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  padding: 10px 12px 14px;\n}\n@media (min-width: 768px) {\n  ion-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n    padding: 12px 20px 20px;\n  }\n}\n\n.section-icon[_ngcontent-%COMP%] {\n  width: 6px;\n  height: 6px;\n  background: var(--orange);\n  border-radius: 50%;\n  box-shadow: 0 0 12px var(--orange-glow);\n  flex-shrink: 0;\n}\n\n\n\n.calendar-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: visible;\n}\n.calendar-card[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background: linear-gradient(90deg, var(--orange), var(--orange-light));\n}\n.calendar-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  overflow: visible;\n}\n\n.calendar-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n  gap: 8px;\n}\n@media (min-width: 768px) {\n  .calendar-header[_ngcontent-%COMP%] {\n    margin-bottom: 16px;\n  }\n}\n.calendar-header[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%] {\n  --color: var(--text-secondary);\n  --padding-start: 4px;\n  --padding-end: 4px;\n  margin: 0;\n  flex-shrink: 0;\n  min-width: 40px;\n}\n\n.month-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  font-weight: 700;\n  text-transform: capitalize;\n  color: var(--text-primary);\n  flex: 1;\n  text-align: center;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n@media (min-width: 576px) {\n  .month-label[_ngcontent-%COMP%] {\n    font-size: 15px;\n  }\n}\n@media (min-width: 768px) {\n  .month-label[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n}\n\n.calendar-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(7, 1fr);\n  gap: 4px;\n  text-align: center;\n  width: 100%;\n  max-width: 100%;\n  box-sizing: border-box;\n}\n@media (min-width: 576px) {\n  .calendar-grid[_ngcontent-%COMP%] {\n    gap: 6px;\n  }\n}\n@media (min-width: 768px) {\n  .calendar-grid[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n}\n\n.day-header[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--text-tertiary);\n  margin-bottom: 4px;\n  padding: 4px 0;\n}\n@media (min-width: 576px) {\n  .day-header[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n}\n@media (min-width: 768px) {\n  .day-header[_ngcontent-%COMP%] {\n    font-size: 12px;\n    margin-bottom: 8px;\n  }\n}\n\n.day-cell[_ngcontent-%COMP%] {\n  aspect-ratio: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: 12px;\n  border-radius: 6px;\n  color: var(--text-secondary);\n  position: relative;\n  background: rgba(255, 255, 255, 0.02);\n  padding: 2px;\n  gap: 2px;\n  min-width: 0;\n  overflow: hidden;\n  box-sizing: border-box;\n}\n@media (min-width: 576px) {\n  .day-cell[_ngcontent-%COMP%] {\n    font-size: 13px;\n    border-radius: 7px;\n    padding: 3px;\n    gap: 3px;\n  }\n}\n@media (min-width: 768px) {\n  .day-cell[_ngcontent-%COMP%] {\n    font-size: 14px;\n    border-radius: 8px;\n    padding: 4px;\n    gap: 4px;\n  }\n}\n.day-cell.inactive[_ngcontent-%COMP%] {\n  opacity: 0;\n  pointer-events: none;\n}\n.day-cell.completed[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.05);\n  color: var(--text-primary);\n  font-weight: 600;\n  border: 1px solid rgba(255, 255, 255, 0.1);\n}\n.day-cell[_ngcontent-%COMP%]   .day-number[_ngcontent-%COMP%] {\n  z-index: 1;\n  font-size: 11px;\n  line-height: 1;\n}\n@media (min-width: 576px) {\n  .day-cell[_ngcontent-%COMP%]   .day-number[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n@media (min-width: 768px) {\n  .day-cell[_ngcontent-%COMP%]   .day-number[_ngcontent-%COMP%] {\n    font-size: 13px;\n  }\n}\n.day-cell[_ngcontent-%COMP%]   .workout-indicators[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 2px;\n  justify-content: center;\n  flex-wrap: wrap;\n  max-width: 100%;\n  overflow: hidden;\n}\n@media (min-width: 768px) {\n  .day-cell[_ngcontent-%COMP%]   .workout-indicators[_ngcontent-%COMP%] {\n    gap: 3px;\n  }\n}\n.day-cell[_ngcontent-%COMP%]   .workout-dot[_ngcontent-%COMP%] {\n  width: 4px;\n  height: 4px;\n  border-radius: 50%;\n  flex-shrink: 0;\n}\n@media (min-width: 576px) {\n  .day-cell[_ngcontent-%COMP%]   .workout-dot[_ngcontent-%COMP%] {\n    width: 5px;\n    height: 5px;\n  }\n}\n@media (min-width: 768px) {\n  .day-cell[_ngcontent-%COMP%]   .workout-dot[_ngcontent-%COMP%] {\n    width: 6px;\n    height: 6px;\n  }\n}\n\n.calendar-legend[_ngcontent-%COMP%] {\n  margin-top: 14px;\n  padding-top: 12px;\n  border-top: 1px solid var(--medium-gray);\n}\n@media (min-width: 768px) {\n  .calendar-legend[_ngcontent-%COMP%] {\n    margin-top: 20px;\n    padding-top: 16px;\n  }\n}\n.calendar-legend[_ngcontent-%COMP%]   .legend-title[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.8px;\n  margin-bottom: 10px;\n  margin-top: 0;\n}\n@media (min-width: 768px) {\n  .calendar-legend[_ngcontent-%COMP%]   .legend-title[_ngcontent-%COMP%] {\n    font-size: 12px;\n    margin-bottom: 12px;\n  }\n}\n.calendar-legend[_ngcontent-%COMP%]   .legend-items[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n  justify-content: flex-start;\n}\n@media (min-width: 768px) {\n  .calendar-legend[_ngcontent-%COMP%]   .legend-items[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n}\n\n.legend-chip[_ngcontent-%COMP%] {\n  --background: rgba(255, 255, 255, 0.05);\n  --color: var(--text-secondary);\n  height: 28px;\n  font-size: 11px;\n  border: 1px solid var(--medium-gray);\n  transition: all 0.2s ease;\n  margin: 0;\n}\n@media (min-width: 768px) {\n  .legend-chip[_ngcontent-%COMP%] {\n    height: 32px;\n    font-size: 12px;\n  }\n}\n.legend-chip[_ngcontent-%COMP%]   .workout-dot[_ngcontent-%COMP%] {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  flex-shrink: 0;\n  margin-right: 4px;\n}\n@media (min-width: 768px) {\n  .legend-chip[_ngcontent-%COMP%]   .workout-dot[_ngcontent-%COMP%] {\n    width: 8px;\n    height: 8px;\n    margin-right: 6px;\n  }\n}\n.legend-chip[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n@media (min-width: 768px) {\n  .legend-chip[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n\n\n\n.disabled-card[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  pointer-events: none;\n}\n\n\n\nion-item[_ngcontent-%COMP%] {\n  --background: transparent;\n  --border-color: transparent;\n  --padding-start: 0;\n  --padding-end: 0;\n  --min-height: 48px;\n}\nion-item[_ngcontent-%COMP%]   .select-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n}\nion-item[_ngcontent-%COMP%]   .select-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 10px;\n  top: 50%;\n  transform: translateY(-50%);\n  font-size: 16px;\n  color: #ffffff;\n  opacity: 0.85;\n  pointer-events: none;\n  z-index: 1;\n}\nion-item[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {\n  width: 100%;\n  --padding-end: 36px;\n  --placeholder-color: #ffffff !important;\n  --placeholder-opacity: 1;\n  color: #ffffff !important;\n  --color: #ffffff !important;\n  font-size: 15px;\n  font-weight: 500;\n}\nion-item[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%]::part(text), ion-item[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%]::part(placeholder), ion-item[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%]::part(icon) {\n  color: #ffffff !important;\n  opacity: 1 !important;\n  --color: #ffffff !important;\n  -webkit-text-fill-color: #ffffff !important;\n}\nion-item[_ngcontent-%COMP%]   ion-select.ios[_ngcontent-%COMP%] {\n  --color: #ffffff !important;\n  color: #ffffff !important;\n}\n@media (min-width: 768px) {\n  ion-item[_ngcontent-%COMP%]   ion-select[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n}\n\n\n\n  .no-cancel-action-sheet {\n  --button-color: #ffffff !important;\n  --button-color-activated: #ffffff !important;\n  --color: #ffffff !important;\n}\n  .no-cancel-action-sheet .action-sheet-button {\n  color: #ffffff !important;\n}\n\n\n\nion-grid[_ngcontent-%COMP%] {\n  padding: 0;\n}\n\n\n\n.stat-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  margin: 0;\n}\n.stat-card[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background: linear-gradient(90deg, var(--orange), var(--orange-light));\n}\n.stat-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  padding: 14px;\n}\n@media (min-width: 768px) {\n  .stat-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n\n.stat-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 600;\n  color: var(--text-secondary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 6px;\n}\n@media (min-width: 768px) {\n  .stat-label[_ngcontent-%COMP%] {\n    font-size: 11px;\n    margin-bottom: 8px;\n  }\n}\n\n.stat-value[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 800;\n  letter-spacing: -1px;\n  margin-bottom: 4px;\n  color: var(--text-primary);\n}\n@media (min-width: 576px) {\n  .stat-value[_ngcontent-%COMP%] {\n    font-size: 26px;\n  }\n}\n@media (min-width: 768px) {\n  .stat-value[_ngcontent-%COMP%] {\n    font-size: 28px;\n    margin-bottom: 6px;\n  }\n}\n.stat-value[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 0.5em;\n  font-weight: 600;\n  color: var(--text-secondary);\n  margin-left: 4px;\n}\n\n.stat-change[_ngcontent-%COMP%] {\n  font-size: 11px;\n}\n@media (min-width: 768px) {\n  .stat-change[_ngcontent-%COMP%] {\n    font-size: 12px;\n  }\n}\n\n\n\n.chart-card[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: transparent;\n  border: none;\n}\n.chart-card[_ngcontent-%COMP%]::before {\n  display: none;\n}\n.chart-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {\n  padding-bottom: 0;\n}\n\n.chart-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 14px 16px 0;\n  gap: 8px;\n}\n.chart-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 15px;\n}\n\n.chart-tabs[_ngcontent-%COMP%] {\n  display: flex;\n  background: rgba(255, 255, 255, 0.06);\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  border-radius: 10px;\n  padding: 3px;\n  gap: 2px;\n}\n.chart-tabs[_ngcontent-%COMP%]   .chart-tab[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  padding: 5px 10px;\n  border-radius: 7px;\n  border: none;\n  background: transparent;\n  color: rgba(255, 255, 255, 0.4);\n  font-family: \"Outfit\", sans-serif;\n  font-size: 11px;\n  font-weight: 600;\n  transition: all 0.2s ease;\n  white-space: nowrap;\n}\n.chart-tabs[_ngcontent-%COMP%]   .chart-tab[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n  flex-shrink: 0;\n}\n.chart-tabs[_ngcontent-%COMP%]   .chart-tab.active[_ngcontent-%COMP%] {\n  background: var(--orange);\n  color: #fff;\n}\n\n.chart-mode-desc[_ngcontent-%COMP%] {\n  margin: 8px 0 0;\n  font-size: 11px;\n  color: rgba(255, 255, 255, 0.4);\n  font-style: italic;\n  text-align: center;\n  min-height: 16px;\n}\n\n.historical-stats-card[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 15px;\n}\n.historical-stats-card[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  color: var(--ion-color-primary);\n}\n\n.historical-stats-loading[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 12px 0;\n}\n\n.historical-stats-empty[_ngcontent-%COMP%] {\n  display: block;\n  text-align: center;\n  font-size: 13px;\n  padding: 8px 0;\n}\n\n.comparison-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  padding-top: 0;\n}\n\n.comparison-header[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: stretch;\n  gap: 10px;\n  width: 100%;\n}\n.comparison-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n\n.comparison-title-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n}\n\n.comparison-selectors[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.compare-select-wrapper[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.compare-arrow[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: var(--orange);\n  flex-shrink: 0;\n}\n\n.select-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n}\n\n.microcycle-trigger[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  padding: 8px 10px;\n  border: 1px solid rgba(var(--ion-color-primary-rgb), 0.25);\n  background: rgba(var(--ion-color-primary-rgb), 0.06);\n  border-radius: 8px;\n  min-width: 0;\n}\n.microcycle-trigger[_ngcontent-%COMP%]   .trigger-value[_ngcontent-%COMP%] {\n  min-width: 0;\n  font-size: 12px;\n  font-weight: 700;\n  font-family: \"Outfit\", sans-serif;\n  color: var(--orange);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.microcycle-trigger[_ngcontent-%COMP%]   .trigger-chevron[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--orange);\n  flex-shrink: 0;\n}\n\n.micro-cycle-selector-hidden[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  pointer-events: auto;\n  --padding-start: 0;\n  --padding-end: 0;\n  --background: transparent;\n  --border-width: 0;\n  --border-color: transparent;\n}\n\n.comparison-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));\n  gap: 10px;\n  margin-top: 12px;\n}\n\n.comparison-item[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.04);\n  border: 1px solid rgba(255, 255, 255, 0.08);\n  border-radius: 12px;\n  padding: 12px;\n}\n.comparison-item[_ngcontent-%COMP%]   .comparison-item-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  font-size: 10px;\n  font-weight: 700;\n  color: rgba(255, 255, 255, 0.4);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 8px;\n}\n.comparison-item[_ngcontent-%COMP%]   .comparison-item-label[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--orange);\n}\n.comparison-item[_ngcontent-%COMP%]   .comparison-item-values[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 4px;\n  margin-bottom: 4px;\n}\n.comparison-item[_ngcontent-%COMP%]   .comparison-item-values[_ngcontent-%COMP%]   .prev-val[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: rgba(255, 255, 255, 0.45);\n}\n.comparison-item[_ngcontent-%COMP%]   .comparison-item-values[_ngcontent-%COMP%]   .curr-val[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 800;\n  color: var(--text-primary);\n}\n.comparison-item[_ngcontent-%COMP%]   .comparison-item-values[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n.comparison-item[_ngcontent-%COMP%]   .comparison-item-values[_ngcontent-%COMP%]   ion-icon.positive[_ngcontent-%COMP%] {\n  color: #2dd36f;\n}\n.comparison-item[_ngcontent-%COMP%]   .comparison-item-values[_ngcontent-%COMP%]   ion-icon.negative[_ngcontent-%COMP%] {\n  color: #eb445a;\n}\n.comparison-item[_ngcontent-%COMP%]   .comparison-item-values[_ngcontent-%COMP%]   ion-icon.neutral[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.3);\n}\n.comparison-item[_ngcontent-%COMP%]   .comparison-item-pct[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  text-align: right;\n}\n.comparison-item[_ngcontent-%COMP%]   .comparison-item-pct.positive[_ngcontent-%COMP%] {\n  color: #2dd36f;\n}\n.comparison-item[_ngcontent-%COMP%]   .comparison-item-pct.negative[_ngcontent-%COMP%] {\n  color: #eb445a;\n}\n.comparison-item[_ngcontent-%COMP%]   .comparison-item-pct.neutral[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.3);\n}\n\n.chart-container[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(20, 20, 20, 0.95) 0%, rgba(30, 30, 30, 0.95) 100%);\n  border-radius: 16px;\n  padding: 24px;\n  margin: 16px 0;\n  border: 1px solid rgba(212, 175, 55, 0.2);\n  position: relative;\n  min-height: 350px;\n  width: 100%;\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n}\n.chart-container[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 2px;\n  background: linear-gradient(90deg, transparent, #d4af37, transparent);\n  opacity: 0.6;\n  z-index: 2;\n}\n.chart-container[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%] {\n  width: 100% !important;\n  height: 300px !important;\n  border-radius: 8px;\n  background: rgba(0, 0, 0, 0.1);\n  position: relative;\n  z-index: 1;\n}\n@media (max-width: 768px) {\n  .chart-container[_ngcontent-%COMP%] {\n    padding: 16px;\n    min-height: 280px;\n  }\n  .chart-container[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%] {\n    height: 250px !important;\n  }\n}\n\n\n\n.history-table-header[_ngcontent-%COMP%] {\n  display: flex;\n  padding: 8px 16px;\n  background: rgba(255, 255, 255, 0.05);\n  border-radius: 8px 8px 0 0;\n  margin-bottom: 4px;\n}\n.history-table-header[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-tertiary);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  white-space: nowrap;\n}\n\n.history-list[_ngcontent-%COMP%] {\n  background: transparent;\n  padding: 0;\n}\n\n\n\n.session-divider[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 8px 16px;\n  background: rgba(255, 255, 255, 0.02);\n  border-top: 1px solid var(--medium-gray);\n}\n.session-divider[_ngcontent-%COMP%]   .session-header-left[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  gap: 12px;\n  min-width: 0;\n}\n.session-divider[_ngcontent-%COMP%]   .week-badge-label[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 2px 8px;\n  background: rgba(var(--ion-color-medium-rgb), 0.2);\n  border: 1px solid rgba(var(--ion-color-medium-rgb), 0.3);\n  border-radius: 10px;\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-secondary);\n  white-space: nowrap;\n  flex-shrink: 0;\n}\n.session-divider[_ngcontent-%COMP%]   .session-date[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-tertiary);\n  font-weight: 600;\n  white-space: nowrap;\n}\n.session-divider[_ngcontent-%COMP%]   .session-note-icon[_ngcontent-%COMP%] {\n  margin-left: auto;\n  font-size: 14px;\n  flex-shrink: 0;\n}\n.session-divider[_ngcontent-%COMP%]:first-child {\n  border-top: none;\n}\n\n.history-item[_ngcontent-%COMP%] {\n  --background: transparent;\n  --padding-start: 0;\n  --padding-end: 0;\n  --inner-padding-end: 0;\n  --min-height: 40px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.03);\n}\n.history-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n\n.history-row-content[_ngcontent-%COMP%], .history-table-header[_ngcontent-%COMP%] {\n  width: 100%;\n  display: flex;\n  align-items: center;\n  padding: 0 16px;\n}\n.history-row-content[_ngcontent-%COMP%]   .header-col-session[_ngcontent-%COMP%], .history-row-content[_ngcontent-%COMP%]   .col-session[_ngcontent-%COMP%], .history-table-header[_ngcontent-%COMP%]   .header-col-session[_ngcontent-%COMP%], .history-table-header[_ngcontent-%COMP%]   .col-session[_ngcontent-%COMP%] {\n  width: 15%;\n  flex-shrink: 0;\n}\n.history-row-content[_ngcontent-%COMP%]   .col-session[_ngcontent-%COMP%], .history-table-header[_ngcontent-%COMP%]   .col-session[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 3px;\n}\n.history-row-content[_ngcontent-%COMP%]   .header-col-weight[_ngcontent-%COMP%], .history-row-content[_ngcontent-%COMP%]   .col-weight[_ngcontent-%COMP%], .history-table-header[_ngcontent-%COMP%]   .header-col-weight[_ngcontent-%COMP%], .history-table-header[_ngcontent-%COMP%]   .col-weight[_ngcontent-%COMP%] {\n  width: 25%;\n  flex-shrink: 0;\n  text-align: center;\n}\n.history-row-content[_ngcontent-%COMP%]   .header-col-reps[_ngcontent-%COMP%], .history-row-content[_ngcontent-%COMP%]   .col-reps[_ngcontent-%COMP%], .history-table-header[_ngcontent-%COMP%]   .header-col-reps[_ngcontent-%COMP%], .history-table-header[_ngcontent-%COMP%]   .col-reps[_ngcontent-%COMP%] {\n  width: 25%;\n  flex-shrink: 0;\n  text-align: center;\n}\n.history-row-content[_ngcontent-%COMP%]   .header-col-rir[_ngcontent-%COMP%], .history-row-content[_ngcontent-%COMP%]   .col-rir[_ngcontent-%COMP%], .history-table-header[_ngcontent-%COMP%]   .header-col-rir[_ngcontent-%COMP%], .history-table-header[_ngcontent-%COMP%]   .col-rir[_ngcontent-%COMP%] {\n  width: 35%;\n  flex-shrink: 0;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 4px;\n  flex-wrap: wrap;\n}\n.history-row-content.is-cardio[_ngcontent-%COMP%]   .header-col-session[_ngcontent-%COMP%], .history-row-content.is-cardio[_ngcontent-%COMP%]   .col-session[_ngcontent-%COMP%], .history-table-header.is-cardio[_ngcontent-%COMP%]   .header-col-session[_ngcontent-%COMP%], .history-table-header.is-cardio[_ngcontent-%COMP%]   .col-session[_ngcontent-%COMP%] {\n  width: 20%;\n}\n.history-row-content.is-cardio[_ngcontent-%COMP%]   .header-col-weight[_ngcontent-%COMP%], .history-row-content.is-cardio[_ngcontent-%COMP%]   .col-weight[_ngcontent-%COMP%], .history-table-header.is-cardio[_ngcontent-%COMP%]   .header-col-weight[_ngcontent-%COMP%], .history-table-header.is-cardio[_ngcontent-%COMP%]   .col-weight[_ngcontent-%COMP%] {\n  width: 40%;\n}\n.history-row-content.is-cardio[_ngcontent-%COMP%]   .header-col-reps[_ngcontent-%COMP%], .history-row-content.is-cardio[_ngcontent-%COMP%]   .col-reps[_ngcontent-%COMP%], .history-table-header.is-cardio[_ngcontent-%COMP%]   .header-col-reps[_ngcontent-%COMP%], .history-table-header.is-cardio[_ngcontent-%COMP%]   .col-reps[_ngcontent-%COMP%] {\n  width: 40%;\n}\n.history-row-content.is-isometric[_ngcontent-%COMP%]   .header-col-session[_ngcontent-%COMP%], .history-row-content.is-isometric[_ngcontent-%COMP%]   .col-session[_ngcontent-%COMP%], .history-table-header.is-isometric[_ngcontent-%COMP%]   .header-col-session[_ngcontent-%COMP%], .history-table-header.is-isometric[_ngcontent-%COMP%]   .col-session[_ngcontent-%COMP%] {\n  width: 20%;\n}\n.history-row-content.is-isometric[_ngcontent-%COMP%]   .header-col-weight[_ngcontent-%COMP%], .history-row-content.is-isometric[_ngcontent-%COMP%]   .col-weight[_ngcontent-%COMP%], .history-table-header.is-isometric[_ngcontent-%COMP%]   .header-col-weight[_ngcontent-%COMP%], .history-table-header.is-isometric[_ngcontent-%COMP%]   .col-weight[_ngcontent-%COMP%] {\n  width: 80%;\n}\n.history-row-content[_ngcontent-%COMP%]   .header-col-notes[_ngcontent-%COMP%], .history-row-content[_ngcontent-%COMP%]   .col-notes[_ngcontent-%COMP%], .history-table-header[_ngcontent-%COMP%]   .header-col-notes[_ngcontent-%COMP%], .history-table-header[_ngcontent-%COMP%]   .col-notes[_ngcontent-%COMP%] {\n  \n\n  display: none;\n}\n\n.set-index[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  color: var(--text-tertiary);\n  text-transform: uppercase;\n}\n\n.session-indicators[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  align-items: center;\n}\n.session-indicators[_ngcontent-%COMP%]   .type-dot[_ngcontent-%COMP%] {\n  font-size: 8px;\n  font-weight: 800;\n  padding: 2px 5px;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.session-indicators[_ngcontent-%COMP%]   .type-dot.drop[_ngcontent-%COMP%] {\n  color: #ef4444;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.2);\n}\n.session-indicators[_ngcontent-%COMP%]   .type-dot.rest[_ngcontent-%COMP%] {\n  color: #2563eb;\n  background: rgba(37, 99, 235, 0.1);\n  border: 1px solid rgba(37, 99, 235, 0.2);\n}\n.session-indicators[_ngcontent-%COMP%]   .type-dot.fail[_ngcontent-%COMP%] {\n  color: var(--orange);\n  background: rgba(254, 144, 0, 0.1);\n  border: 1px solid rgba(254, 144, 0, 0.2);\n}\n\n.history-row-content[_ngcontent-%COMP%]   .col-weight[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .history-row-content[_ngcontent-%COMP%]   .col-reps[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 15px;\n  font-weight: 700;\n  color: var(--text-primary);\n}\n.history-row-content[_ngcontent-%COMP%]   .col-weight[_ngcontent-%COMP%]   small[_ngcontent-%COMP%], .history-row-content[_ngcontent-%COMP%]   .col-reps[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: var(--text-secondary);\n  margin-left: 3px;\n  font-weight: 500;\n}\n.history-row-content[_ngcontent-%COMP%]   .col-rir[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  font-size: 10px;\n  color: var(--text-secondary);\n  margin-left: 3px;\n  font-weight: 500;\n}\n\n.rir-value[_ngcontent-%COMP%] {\n  font-size: 13px;\n  font-weight: 600;\n  color: var(--text-primary);\n}\n\n.fail-label[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 700;\n  color: var(--ion-color-primary);\n  background: rgba(var(--ion-color-primary-rgb), 0.15);\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n\n.week-badge[_ngcontent-%COMP%] {\n  --background: var(--medium-gray);\n  --color: var(--text-secondary);\n  --padding-top: 4px;\n  --padding-bottom: 4px;\n  --padding-start: 8px;\n  --padding-end: 8px;\n  font-size: 10px;\n  font-weight: 700;\n  min-width: 32px;\n}\n\n\n\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n  color: var(--text-secondary);\n}\n@media (min-width: 768px) {\n  .empty-state[_ngcontent-%COMP%] {\n    padding: 60px 20px;\n  }\n}\n.empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 56px;\n  margin-bottom: 14px;\n  opacity: 0.3;\n}\n@media (min-width: 768px) {\n  .empty-state[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n    font-size: 64px;\n    margin-bottom: 16px;\n  }\n}\n.empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 17px;\n  font-weight: 700;\n  margin-bottom: 8px;\n  color: var(--text-primary);\n}\n@media (min-width: 768px) {\n  .empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 18px;\n  }\n}\n.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 13px;\n  max-width: 300px;\n  margin: 0 auto;\n  line-height: 1.5;\n  color: var(--text-tertiary);\n}\n@media (min-width: 768px) {\n  .empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n    font-size: 14px;\n  }\n}\n\n\n\n@keyframes _ngcontent-%COMP%_fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(20px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\nion-card[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeInUp 0.4s ease backwards;\n}\n\n\n\n.subseries-container[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 4px 16px 8px 32px;\n  display: flex;\n  flex-direction: column;\n  gap: 3px;\n}\n\n.subseries-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 3px 8px;\n  border-radius: 6px;\n  background: rgba(255, 255, 255, 0.03);\n  border-left: 2px solid rgba(255, 255, 255, 0.1);\n}\n.subseries-item[_ngcontent-%COMP%]   .subseries-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 700;\n  color: rgba(255, 255, 255, 0.35);\n  min-width: 52px;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.subseries-item[_ngcontent-%COMP%]   .subseries-val[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  color: rgba(255, 255, 255, 0.65);\n}\n.subseries-item[_ngcontent-%COMP%]   .subseries-rir[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 600;\n  color: rgba(255, 255, 255, 0.3);\n  margin-left: auto;\n  background: rgba(255, 255, 255, 0.05);\n  padding: 1px 6px;\n  border-radius: 4px;\n}\n\nion-item[_ngcontent-%COMP%]:has(.type-dot.drop)    ~ .subseries-container[_ngcontent-%COMP%]   .subseries-item[_ngcontent-%COMP%] {\n  border-left-color: rgba(239, 68, 68, 0.4);\n}\nion-item[_ngcontent-%COMP%]:has(.type-dot.drop)    ~ .subseries-container[_ngcontent-%COMP%]   .subseries-label[_ngcontent-%COMP%] {\n  color: rgba(239, 68, 68, 0.7);\n}\n\nion-item[_ngcontent-%COMP%]:has(.type-dot.rest)    ~ .subseries-container[_ngcontent-%COMP%]   .subseries-item[_ngcontent-%COMP%] {\n  border-left-color: rgba(37, 99, 235, 0.4);\n}\nion-item[_ngcontent-%COMP%]:has(.type-dot.rest)    ~ .subseries-container[_ngcontent-%COMP%]   .subseries-label[_ngcontent-%COMP%] {\n  color: rgba(56, 128, 255, 0.7);\n}\n\n\n\n.comparison-item-full[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n\n\n\n.technique-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  margin-top: 4px;\n}\n\n.technique-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  padding: 5px 12px;\n  border-radius: 8px;\n  font-size: 12px;\n  font-weight: 700;\n  flex: 1;\n  min-width: 90px;\n}\n.technique-chip[_ngcontent-%COMP%]   .t-label[_ngcontent-%COMP%] {\n  font-size: 10px;\n  font-weight: 800;\n  padding: 2px 6px;\n  border-radius: 4px;\n  letter-spacing: 0.5px;\n}\n.technique-chip[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 13px;\n  margin-left: auto;\n}\n.technique-chip[_ngcontent-%COMP%]   ion-icon.positive[_ngcontent-%COMP%] {\n  color: #2dd36f;\n}\n.technique-chip[_ngcontent-%COMP%]   ion-icon.negative[_ngcontent-%COMP%] {\n  color: #eb445a;\n}\n.technique-chip[_ngcontent-%COMP%]   ion-icon.neutral[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.3);\n}\n.technique-chip.ds[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.08);\n  border: 1px solid rgba(239, 68, 68, 0.2);\n  color: rgba(239, 68, 68, 0.9);\n}\n.technique-chip.ds[_ngcontent-%COMP%]   .t-label[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.15);\n  color: #ef4444;\n}\n.technique-chip.rp[_ngcontent-%COMP%] {\n  background: rgba(37, 99, 235, 0.08);\n  border: 1px solid rgba(37, 99, 235, 0.2);\n  color: rgba(56, 128, 255, 0.9);\n}\n.technique-chip.rp[_ngcontent-%COMP%]   .t-label[_ngcontent-%COMP%] {\n  background: rgba(37, 99, 235, 0.15);\n  color: #3880ff;\n}\n\n.no-wrap[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n\n.clickable[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n\n.intensity-drop[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 600;\n  color: #ef4444;\n  background: rgba(239, 68, 68, 0.1);\n  border: 1px solid rgba(239, 68, 68, 0.2);\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n\n.intensity-rp[_ngcontent-%COMP%] {\n  font-size: 0.7rem;\n  font-weight: 600;\n  color: #2563eb;\n  background: rgba(59, 130, 246, 0.1);\n  border: 1px solid rgba(37, 99, 235, 0.2);\n  padding: 2px 6px;\n  border-radius: 4px;\n}\n\n.rest-seconds-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 2px;\n  font-size: 0.65rem;\n  font-weight: 600;\n  color: var(--ion-color-primary);\n  background: rgba(var(--ion-color-primary-rgb), 0.1);\n  padding: 1px 5px;\n  border-radius: 4px;\n  white-space: nowrap;\n}\n.rest-seconds-badge[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n}\n\n.chart-mode-container[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n  width: 100%;\n}\n.chart-mode-container[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%] {\n  --background: transparent;\n  border-radius: 12px;\n  padding: 2px;\n}\n.chart-mode-container[_ngcontent-%COMP%]   ion-segment[_ngcontent-%COMP%]   ion-segment-button[_ngcontent-%COMP%] {\n  --color: rgba(255, 255, 255, 0.5);\n  --color-checked: #fe9000;\n  --indicator-color: rgba(254, 144, 0, 0.12);\n  font-size: 11px;\n  font-weight: 700;\n  min-height: 36px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n.set-select-wrapper[_ngcontent-%COMP%] {\n  width: auto;\n  margin-left: auto;\n  flex-shrink: 0;\n}\n.set-select-wrapper[_ngcontent-%COMP%]   .microcycle-trigger[_ngcontent-%COMP%] {\n  width: auto;\n  padding: 6px 10px;\n}\n\n.pinned-note-container[_ngcontent-%COMP%] {\n  margin: 12px 8px;\n}\n.pinned-note-container[_ngcontent-%COMP%]   .pinned-note-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n  padding: 12px 16px;\n  border-radius: 12px;\n  background: linear-gradient(135deg, rgba(56, 128, 255, 0.1) 0%, rgba(56, 128, 255, 0.04) 100%);\n  border: 1px solid rgba(56, 128, 255, 0.2);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);\n}\n.pinned-note-container[_ngcontent-%COMP%]   .pinned-note-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.pinned-note-container[_ngcontent-%COMP%]   .pinned-note-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .left-section[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.pinned-note-container[_ngcontent-%COMP%]   .pinned-note-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .left-section[_ngcontent-%COMP%]   .icon-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  color: #3880ff;\n}\n.pinned-note-container[_ngcontent-%COMP%]   .pinned-note-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .left-section[_ngcontent-%COMP%]   .icon-wrapper[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 1rem;\n}\n.pinned-note-container[_ngcontent-%COMP%]   .pinned-note-card[_ngcontent-%COMP%]   .card-header[_ngcontent-%COMP%]   .left-section[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  font-size: 0.8rem;\n  font-weight: 700;\n  color: #3880ff;\n  text-transform: uppercase;\n  letter-spacing: 0.3px;\n}\n.pinned-note-container[_ngcontent-%COMP%]   .pinned-note-card[_ngcontent-%COMP%]   .text[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.85rem;\n  line-height: 1.5;\n  color: var(--text-primary);\n  white-space: pre-wrap;\n}\n\n.chart-header-main[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  width: 100%;\n  gap: 12px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL3RhYmxlcy9jb21wb25lbnRzL3N1bW1hcnkvY29tcG9uZW50cy9zdGF0aXN0aWNzL3N0YXRpc3RpY3MucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUFoQjtFQUNFLDZDQUFBO0VBQ0EsZ0RBQUE7RUFDQSxpREFBQTtFQUNBLGdEQUFBO0VBQ0EsOENBQUE7RUFDQSxvREFBQTtFQUNBLG1EQUFBO0VBQ0EsMkNBQUE7RUFDQSxzREFBQTtFQUNBLHNEQUFBO0VBQ0EscUNBQUE7RUFDQSw2Q0FBQTtFQUNBLDBDQUFBO0VBQ0EsNENBQUE7QUFFRjs7QUFDQSwwREFBQTtBQUlFOzs7RUFDRSwwQkFBQTtBQUNKOztBQUdBOzs7Ozs7O0VBT0UsMENBQUE7RUFDQSw4Q0FBQTtFQUNBLDRDQUFBO0VBQ0Esc0NBQUE7RUFDQSxpQ0FBQTtFQUNBLDZCQUFBO0FBQUY7O0FBR0EsdUNBQUE7QUFDQTtFQUNFLGFBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtFQUNBLFdBQUE7RUFDQSxzQkFBQTtBQUFGO0FBRUU7RUFQRjtJQVFJLGdCQUFBO0lBQ0EsYUFBQTtFQUNGO0FBQ0Y7O0FBRUEsb0JBQUE7QUFDQTtFQUNFLDBCQUFBO0VBQ0EsNEJBQUE7QUFDRjs7QUFFQTtFQUNFLDhCQUFBO0VBQ0EsNEJBQUE7RUFDQSxvQ0FBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxlQUFBO0VBQ0Esc0JBQUE7QUFDRjtBQUNFO0VBWEY7SUFZSSxtQkFBQTtFQUVGO0FBQ0Y7QUFBRTtFQUNFLHNCQUFBO0FBRUo7QUFBSTtFQUhGO0lBSUksc0JBQUE7RUFHSjtBQUNGO0FBQUU7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSwwQkFBQTtBQUVKO0FBQUk7RUFMRjtJQU1JLGVBQUE7RUFHSjtBQUNGO0FBQUU7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QUE7RUFDQSw4RkFBQTtFQUtBLHlDQUFBO0VBQ0EseUNBQUE7QUFqRko7QUFtRkk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7QUFqRk47QUFtRk07RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBakZSO0FBbUZRO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0FBakZWO0FBbUZVO0VBQ0UsZUFBQTtBQWpGWjtBQXFGUTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtBQW5GVjtBQXdGSTtFQUNFLFNBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsMEJBQUE7RUFDQSxxQkFBQTtBQXRGTjs7QUEyRkE7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxTQUFBO0FBeEZGIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICAtLWJsYWNrOiB2YXIoLS1pb24tYmFja2dyb3VuZC1jb2xvciwgIzBkMGQwZCk7XG4gIC0tZGFyay1ncmF5OiB2YXIoLS1pb24tY2FyZC1iYWNrZ3JvdW5kLCAjMWExYTFhKTtcbiAgLS1tZWRpdW0tZ3JheTogdmFyKC0taW9uLWNvbG9yLXN0ZXAtMTUwLCAjMmEyYTJhKTtcbiAgLS1saWdodC1ncmF5OiB2YXIoLS1pb24tY29sb3Itc3RlcC0yMDAsICMzYTNhM2EpO1xuICAtLXRleHQtcHJpbWFyeTogdmFyKC0taW9uLXRleHQtY29sb3IsICNmZmZmZmYpO1xuICAtLXRleHQtc2Vjb25kYXJ5OiB2YXIoLS1pb24tY29sb3Itc3RlcC02MDAsICM5YTlhOWEpO1xuICAtLXRleHQtdGVydGlhcnk6IHZhcigtLWlvbi1jb2xvci1zdGVwLTQwMCwgIzZhNmE2YSk7XG4gIC0tb3JhbmdlOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSwgI2ZlOTAwMCk7XG4gIC0tb3JhbmdlLWxpZ2h0OiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS10aW50LCAjZmU5YjFhKTtcbiAgLS1vcmFuZ2UtZGFyazogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktc2hhZGUsICNlMDdmMDApO1xuICAtLW9yYW5nZS1nbG93OiByZ2JhKDI1NCwgMTQ0LCAwLCAwLjMpO1xuICAtLWJsdWU6IHZhcigtLWlvbi1jb2xvci1hbHRlcm5hdGl2ZSwgIzM4ODBmZik7XG4gIC0tZ3JlZW46IHZhcigtLWlvbi1jb2xvci1zdWNjZXNzLCAjMmRkMzZmKTtcbiAgLS1wdXJwbGU6IHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeSwgI2ZmZDM1OSk7XG59XG5cbi8qIERlc2FjdGl2YXIgZWZlY3RvcyBob3ZlciB5IGN1cnNvcmVzIGVuIHRvZGEgbGEgcMODwqFnaW5hICovXG4qLFxuOjphZnRlcixcbjo6YmVmb3JlIHtcbiAgJjpob3ZlciB7XG4gICAgY3Vyc29yOiBkZWZhdWx0ICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuaW9uLWJ1dHRvbixcbmlvbi1pdGVtLFxuaW9uLWNoaXAsXG5pb24tc2VnbWVudC1idXR0b24sXG4uY2xpY2thYmxlLFxuYnV0dG9uLFxuYSB7XG4gIC0tYmFja2dyb3VuZC1ob3ZlcjogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogdHJhbnNwYXJlbnQgIWltcG9ydGFudDtcbiAgLS1iYWNrZ3JvdW5kLWZvY3VzZWQ6IHRyYW5zcGFyZW50ICFpbXBvcnRhbnQ7XG4gIC0tcmlwcGxlLWNvbG9yOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAtLWNvbG9yLWhvdmVyOiBpbmhlcml0ICFpbXBvcnRhbnQ7XG4gIC0tYm94LXNoYWRvdzogbm9uZSAhaW1wb3J0YW50O1xufVxuXG4vKiBDb250ZW50IFdyYXBwZXIgLSBGaXhlZCByZXNwb25zaXZlICovXG4uY29udGVudCB7XG4gIHBhZGRpbmc6IDEycHg7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAwIGF1dG87XG4gIHdpZHRoOiAxMDAlO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgIG1heC13aWR0aDogODAwcHg7XG4gICAgcGFkZGluZzogMTZweDtcbiAgfVxufVxuXG4vKiBJb25pYyBPdmVycmlkZXMgKi9cbmlvbi1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1ibGFjayk7XG4gIC0tY29sb3I6IHZhcigtLXRleHQtcHJpbWFyeSk7XG59XG5cbmlvbi1jYXJkIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1kYXJrLWdyYXkpO1xuICAtLWNvbG9yOiB2YXIoLS10ZXh0LXByaW1hcnkpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1tZWRpdW0tZ3JheSk7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIG1hcmdpbjogMCAwIDEycHggMDtcbiAgYm94LXNoYWRvdzogbm9uZTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICB9XG5cbiAgaW9uLWNhcmQtaGVhZGVyIHtcbiAgICBwYWRkaW5nOiAxNHB4IDE2cHggNnB4O1xuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgICBwYWRkaW5nOiAxNnB4IDIwcHggOHB4O1xuICAgIH1cbiAgfVxuXG4gIGlvbi1jYXJkLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDE3cHg7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KTtcblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgIH1cbiAgfVxuXG4gIGlvbi1jYXJkLXN1YnRpdGxlIHtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuOHB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDhweDtcblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgIH1cbiAgfVxuXG4gIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDEwcHggMTJweCAxNHB4O1xuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgICBwYWRkaW5nOiAxMnB4IDIwcHggMjBweDtcbiAgICB9XG4gIH1cbn1cblxuLnNlY3Rpb24taWNvbiB7XG4gIHdpZHRoOiA2cHg7XG4gIGhlaWdodDogNnB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1vcmFuZ2UpO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJveC1zaGFkb3c6IDAgMCAxMnB4IHZhcigtLW9yYW5nZS1nbG93KTtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbi8qIENhbGVuZGFyIENhcmQgKi9cbi5jYWxlbmRhci1jYXJkIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBvdmVyZmxvdzogdmlzaWJsZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGhlaWdodDogM3B4O1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgdmFyKC0tb3JhbmdlKSwgdmFyKC0tb3JhbmdlLWxpZ2h0KSk7XG4gIH1cblxuICBpb24tY2FyZC1jb250ZW50IHtcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgfVxufVxuXG4uY2FsZW5kYXItaGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICBnYXA6IDhweDtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICB9XG5cbiAgaW9uLWJ1dHRvbiB7XG4gICAgLS1jb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuICAgIC0tcGFkZGluZy1zdGFydDogNHB4O1xuICAgIC0tcGFkZGluZy1lbmQ6IDRweDtcbiAgICBtYXJnaW46IDA7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgbWluLXdpZHRoOiA0MHB4O1xuICB9XG59XG5cbi5tb250aC1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LXByaW1hcnkpO1xuICBmbGV4OiAxO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiA1NzZweCkge1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgfVxuXG4gIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgfVxufVxuXG4uY2FsZW5kYXItZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDcsIDFmcik7XG4gIGdhcDogNHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDU3NnB4KSB7XG4gICAgZ2FwOiA2cHg7XG4gIH1cblxuICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICBnYXA6IDhweDtcbiAgfVxufVxuXG4uZGF5LWhlYWRlciB7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRleHQtdGVydGlhcnkpO1xuICBtYXJnaW4tYm90dG9tOiA0cHg7XG4gIHBhZGRpbmc6IDRweCAwO1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiA1NzZweCkge1xuICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgfVxuXG4gIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gIH1cbn1cblxuLmRheS1jZWxsIHtcbiAgYXNwZWN0LXJhdGlvOiAxO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKTtcbiAgcGFkZGluZzogMnB4O1xuICBnYXA6IDJweDtcbiAgbWluLXdpZHRoOiAwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiA1NzZweCkge1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICBib3JkZXItcmFkaXVzOiA3cHg7XG4gICAgcGFkZGluZzogM3B4O1xuICAgIGdhcDogM3B4O1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICBwYWRkaW5nOiA0cHg7XG4gICAgZ2FwOiA0cHg7XG4gIH1cblxuICAmLmluYWN0aXZlIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG5cbiAgJi5jb21wbGV0ZWQge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XG4gICAgY29sb3I6IHZhcigtLXRleHQtcHJpbWFyeSk7XG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG4gIH1cblxuICAuZGF5LW51bWJlciB7XG4gICAgei1pbmRleDogMTtcbiAgICBmb250LXNpemU6IDExcHg7XG4gICAgbGluZS1oZWlnaHQ6IDE7XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNTc2cHgpIHtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICB9XG4gIH1cblxuICAud29ya291dC1pbmRpY2F0b3JzIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGdhcDogMnB4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIGZsZXgtd3JhcDogd3JhcDtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgICAgZ2FwOiAzcHg7XG4gICAgfVxuICB9XG5cbiAgLndvcmtvdXQtZG90IHtcbiAgICB3aWR0aDogNHB4O1xuICAgIGhlaWdodDogNHB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBmbGV4LXNocmluazogMDtcblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA1NzZweCkge1xuICAgICAgd2lkdGg6IDVweDtcbiAgICAgIGhlaWdodDogNXB4O1xuICAgIH1cblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgICAgd2lkdGg6IDZweDtcbiAgICAgIGhlaWdodDogNnB4O1xuICAgIH1cbiAgfVxufVxuXG4uY2FsZW5kYXItbGVnZW5kIHtcbiAgbWFyZ2luLXRvcDogMTRweDtcbiAgcGFkZGluZy10b3A6IDEycHg7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1tZWRpdW0tZ3JheSk7XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgbWFyZ2luLXRvcDogMjBweDtcbiAgICBwYWRkaW5nLXRvcDogMTZweDtcbiAgfVxuXG4gIC5sZWdlbmQtdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBsZXR0ZXItc3BhY2luZzogMC44cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTBweDtcbiAgICBtYXJnaW4tdG9wOiAwO1xuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBtYXJnaW4tYm90dG9tOiAxMnB4O1xuICAgIH1cbiAgfVxuXG4gIC5sZWdlbmQtaXRlbXMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICAgIGdhcDogNnB4O1xuICAgIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgICAgZ2FwOiA4cHg7XG4gICAgfVxuICB9XG59XG5cbi5sZWdlbmQtY2hpcCB7XG4gIC0tYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcbiAgLS1jb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuICBoZWlnaHQ6IDI4cHg7XG4gIGZvbnQtc2l6ZTogMTFweDtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tbWVkaXVtLWdyYXkpO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlO1xuICBtYXJnaW46IDA7XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgaGVpZ2h0OiAzMnB4O1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgfVxuXG4gIC53b3Jrb3V0LWRvdCB7XG4gICAgd2lkdGg6IDdweDtcbiAgICBoZWlnaHQ6IDdweDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgbWFyZ2luLXJpZ2h0OiA0cHg7XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICAgIHdpZHRoOiA4cHg7XG4gICAgICBoZWlnaHQ6IDhweDtcbiAgICAgIG1hcmdpbi1yaWdodDogNnB4O1xuICAgIH1cbiAgfVxuXG4gIGlvbi1sYWJlbCB7XG4gICAgZm9udC1zaXplOiAxMXB4O1xuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgfVxuICB9XG59XG5cbi8qIERpc2FibGVkIENhcmQgKi9cbi5kaXNhYmxlZC1jYXJkIHtcbiAgb3BhY2l0eTogMC41O1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLyogSW9uaWMgU2VsZWN0IFN0eWxpbmcgKi9cbmlvbi1pdGVtIHtcbiAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgLS1ib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuICAtLXBhZGRpbmctc3RhcnQ6IDA7XG4gIC0tcGFkZGluZy1lbmQ6IDA7XG4gIC0tbWluLWhlaWdodDogNDhweDtcblxuICAuc2VsZWN0LXdyYXBwZXIge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuXG4gIC5zZWxlY3QtaWNvbiB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAxMHB4O1xuICAgIHRvcDogNTAlO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgY29sb3I6ICNmZmZmZmY7XG4gICAgb3BhY2l0eTogMC44NTtcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICB6LWluZGV4OiAxO1xuICB9XG5cbiAgaW9uLXNlbGVjdCB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgLS1wYWRkaW5nLWVuZDogMzZweDtcbiAgICAtLXBsYWNlaG9sZGVyLWNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7XG4gICAgLS1wbGFjZWhvbGRlci1vcGFjaXR5OiAxO1xuICAgIGNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7XG4gICAgLS1jb2xvcjogI2ZmZmZmZiAhaW1wb3J0YW50O1xuICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICBmb250LXdlaWdodDogNTAwO1xuXG4gICAgJjo6cGFydCh0ZXh0KSxcbiAgICAmOjpwYXJ0KHBsYWNlaG9sZGVyKSxcbiAgICAmOjpwYXJ0KGljb24pIHtcbiAgICAgIGNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7XG4gICAgICBvcGFjaXR5OiAxICFpbXBvcnRhbnQ7XG4gICAgICAtLWNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7XG4gICAgICAtd2Via2l0LXRleHQtZmlsbC1jb2xvcjogI2ZmZmZmZiAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgICYuaW9zIHtcbiAgICAgIC0tY29sb3I6ICNmZmZmZmYgIWltcG9ydGFudDtcbiAgICAgIGNvbG9yOiAjZmZmZmZmICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgICBmb250LXNpemU6IDE2cHg7XG4gICAgfVxuICB9XG59XG5cbi8qIEFjdGlvbiBTaGVldCBnbG9iYWwgb3ZlcnJpZGVzIHBhcmEgc2VsZWN0cyBlbiBlc3RhIHDDg8KhZ2luYSAqL1xuOjpuZy1kZWVwIC5uby1jYW5jZWwtYWN0aW9uLXNoZWV0IHtcbiAgLS1idXR0b24tY29sb3I6ICNmZmZmZmYgIWltcG9ydGFudDtcbiAgLS1idXR0b24tY29sb3ItYWN0aXZhdGVkOiAjZmZmZmZmICFpbXBvcnRhbnQ7XG4gIC0tY29sb3I6ICNmZmZmZmYgIWltcG9ydGFudDtcbiAgXG4gIC5hY3Rpb24tc2hlZXQtYnV0dG9uIHtcbiAgICBjb2xvcjogI2ZmZmZmZiAhaW1wb3J0YW50O1xuICB9XG59XG5cbi8qIFN0YXRzIEdyaWQgKi9cbmlvbi1ncmlkIHtcbiAgcGFkZGluZzogMDtcbn1cblxuLyogU3RhdHMgQ2FyZHMgKi9cbi5zdGF0LWNhcmQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG1hcmdpbjogMDtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGhlaWdodDogM3B4O1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgdmFyKC0tb3JhbmdlKSwgdmFyKC0tb3JhbmdlLWxpZ2h0KSk7XG4gIH1cblxuICBpb24tY2FyZC1jb250ZW50IHtcbiAgICBwYWRkaW5nOiAxNHB4O1xuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgICBwYWRkaW5nOiAxNnB4O1xuICAgIH1cbiAgfVxufVxuXG4uc3RhdC1sYWJlbCB7XG4gIGZvbnQtc2l6ZTogMTBweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICBtYXJnaW4tYm90dG9tOiA2cHg7XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgZm9udC1zaXplOiAxMXB4O1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgfVxufVxuXG4uc3RhdC12YWx1ZSB7XG4gIGZvbnQtc2l6ZTogMjRweDtcbiAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IC0xcHg7XG4gIG1hcmdpbi1ib3R0b206IDRweDtcbiAgY29sb3I6IHZhcigtLXRleHQtcHJpbWFyeSk7XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDU3NnB4KSB7XG4gICAgZm9udC1zaXplOiAyNnB4O1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgZm9udC1zaXplOiAyOHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDZweDtcbiAgfVxuXG4gIHNtYWxsIHtcbiAgICBmb250LXNpemU6IDAuNWVtO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgICBtYXJnaW4tbGVmdDogNHB4O1xuICB9XG59XG5cbi5zdGF0LWNoYW5nZSB7XG4gIGZvbnQtc2l6ZTogMTFweDtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICBmb250LXNpemU6IDEycHg7XG4gIH1cbn1cblxuLyogQ2hhcnQgU2VjdGlvbiAqL1xuLmNoYXJ0LWNhcmQge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG5cbiAgaW9uLWNhcmQtaGVhZGVyIHtcbiAgICBwYWRkaW5nLWJvdHRvbTogMDtcbiAgfVxufVxuXG4vLyBDaGFydCBoZWFkZXIgd2l0aCB0YWJzXG4uY2hhcnQtY2FyZC1oZWFkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHBhZGRpbmc6IDE0cHggMTZweCAwO1xuICBnYXA6IDhweDtcblxuICBpb24tY2FyZC10aXRsZSB7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gICAgZm9udC1zaXplOiAxNXB4O1xuICB9XG59XG5cbi5jaGFydC10YWJzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA2KTtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBwYWRkaW5nOiAzcHg7XG4gIGdhcDogMnB4O1xuXG4gIC5jaGFydC10YWIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDRweDtcbiAgICBwYWRkaW5nOiA1cHggMTBweDtcbiAgICBib3JkZXItcmFkaXVzOiA3cHg7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XG4gICAgZm9udC1mYW1pbHk6IFwiT3V0Zml0XCIsIHNhbnMtc2VyaWY7XG4gICAgZm9udC1zaXplOiAxMXB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuXG4gICAgaW9uLWljb24ge1xuICAgICAgZm9udC1zaXplOiAxMnB4O1xuICAgICAgZmxleC1zaHJpbms6IDA7XG4gICAgfVxuXG4gICAgJi5hY3RpdmUge1xuICAgICAgYmFja2dyb3VuZDogdmFyKC0tb3JhbmdlKTtcbiAgICAgIGNvbG9yOiAjZmZmO1xuICAgIH1cbiAgfVxufVxuXG4uY2hhcnQtbW9kZS1kZXNjIHtcbiAgbWFyZ2luOiA4cHggMCAwO1xuICBmb250LXNpemU6IDExcHg7XG4gIGNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCk7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtaW4taGVpZ2h0OiAxNnB4O1xufVxuXG4vLyBBbGwtVGltZSBIaXN0b3JpY2FsIFN0YXRzIENhcmRcbi5oaXN0b3JpY2FsLXN0YXRzLWNhcmQge1xuICBpb24tY2FyZC10aXRsZSB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIGdhcDogOHB4O1xuICAgIGZvbnQtc2l6ZTogMTVweDtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMThweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgfVxuICB9XG59XG5cbi5oaXN0b3JpY2FsLXN0YXRzLWxvYWRpbmcge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgcGFkZGluZzogMTJweCAwO1xufVxuXG4uaGlzdG9yaWNhbC1zdGF0cy1lbXB0eSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgcGFkZGluZzogOHB4IDA7XG59XG5cbi8vIENvbXBhcmlzb24gQ2FyZFxuLmNvbXBhcmlzb24tY2FyZCB7XG4gIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgIHBhZGRpbmctdG9wOiAwO1xuICB9XG59XG5cbi5jb21wYXJpc29uLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBnYXA6IDEwcHg7XG4gIHdpZHRoOiAxMDAlO1xuXG4gIGlvbi1jYXJkLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDE1cHg7XG4gIH1cbn1cblxuLmNvbXBhcmlzb24tdGl0bGUtcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG59XG5cbi5jb21wYXJpc29uLXNlbGVjdG9ycyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xufVxuXG4uY29tcGFyZS1zZWxlY3Qtd3JhcHBlciB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbn1cblxuLmNvbXBhcmUtYXJyb3cge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGNvbG9yOiB2YXIoLS1vcmFuZ2UpO1xuICBmbGV4LXNocmluazogMDtcbn1cblxuLy8gTWlzbW8gcGF0csODwrNuIGRlIHRyaWdnZXIgKyBpb24tc2VsZWN0IG9jdWx0byBxdWUgZWwgc2VsZWN0b3IgZGVcbi8vIG1pY3JvY2ljbG9zIGRlIG1lc29jeWNsZS5wYWdlL251dHJpdGlvbmFsLW9iamVjdGl2ZXMsIHBhcmEgY29uc2lzdGVuY2lhXG4vLyB2aXN1YWwgZW4gdG9kYSBsYSBhcHAuXG4uc2VsZWN0LXdyYXBwZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4ubWljcm9jeWNsZS10cmlnZ2VyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IDZweDtcbiAgcGFkZGluZzogOHB4IDEwcHg7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4yNSk7XG4gIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4wNik7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgbWluLXdpZHRoOiAwO1xuXG4gIC50cmlnZ2VyLXZhbHVlIHtcbiAgICBtaW4td2lkdGg6IDA7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgZm9udC1mYW1pbHk6IFwiT3V0Zml0XCIsIHNhbnMtc2VyaWY7XG4gICAgY29sb3I6IHZhcigtLW9yYW5nZSk7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB9XG5cbiAgLnRyaWdnZXItY2hldnJvbiB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGNvbG9yOiB2YXIoLS1vcmFuZ2UpO1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICB9XG59XG5cbi5taWNyby1jeWNsZS1zZWxlY3Rvci1oaWRkZW4ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgb3BhY2l0eTogMDtcbiAgcG9pbnRlci1ldmVudHM6IGF1dG87XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbiAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgLS1ib3JkZXItd2lkdGg6IDA7XG4gIC0tYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cblxuLmNvbXBhcmlzb24tZ3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMTQwcHgsIDFmcikpO1xuICBnYXA6IDEwcHg7XG4gIG1hcmdpbi10b3A6IDEycHg7XG59XG5cbi5jb21wYXJpc29uLWl0ZW0ge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDQpO1xuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDgpO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAxMnB4O1xuXG4gIC5jb21wYXJpc29uLWl0ZW0tbGFiZWwge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBnYXA6IDVweDtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjQpO1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1vcmFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIC5jb21wYXJpc29uLWl0ZW0tdmFsdWVzIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGdhcDogNHB4O1xuICAgIG1hcmdpbi1ib3R0b206IDRweDtcblxuICAgIC5wcmV2LXZhbCB7XG4gICAgICBmb250LXNpemU6IDEycHg7XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC40NSk7XG4gICAgfVxuXG4gICAgLmN1cnItdmFsIHtcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XG4gICAgICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KTtcbiAgICB9XG5cbiAgICBpb24taWNvbiB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG5cbiAgICAgICYucG9zaXRpdmUge1xuICAgICAgICBjb2xvcjogIzJkZDM2ZjtcbiAgICAgIH1cblxuICAgICAgJi5uZWdhdGl2ZSB7XG4gICAgICAgIGNvbG9yOiAjZWI0NDVhO1xuICAgICAgfVxuXG4gICAgICAmLm5ldXRyYWwge1xuICAgICAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC5jb21wYXJpc29uLWl0ZW0tcGN0IHtcbiAgICBmb250LXNpemU6IDExcHg7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcblxuICAgICYucG9zaXRpdmUge1xuICAgICAgY29sb3I6ICMyZGQzNmY7XG4gICAgfVxuXG4gICAgJi5uZWdhdGl2ZSB7XG4gICAgICBjb2xvcjogI2ViNDQ1YTtcbiAgICB9XG5cbiAgICAmLm5ldXRyYWwge1xuICAgICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgICB9XG4gIH1cbn1cblxuLmNoYXJ0LWNvbnRhaW5lciB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcbiAgICAxMzVkZWcsXG4gICAgcmdiYSgyMCwgMjAsIDIwLCAwLjk1KSAwJSxcbiAgICByZ2JhKDMwLCAzMCwgMzAsIDAuOTUpIDEwMCVcbiAgKTtcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgcGFkZGluZzogMjRweDtcbiAgbWFyZ2luOiAxNnB4IDA7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjEyLCAxNzUsIDU1LCAwLjIpO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG1pbi1oZWlnaHQ6IDM1MHB4O1xuICB3aWR0aDogMTAwJTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGhlaWdodDogMnB4O1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgdHJhbnNwYXJlbnQsICNkNGFmMzcsIHRyYW5zcGFyZW50KTtcbiAgICBvcGFjaXR5OiAwLjY7XG4gICAgei1pbmRleDogMjtcbiAgfVxuXG4gIGNhbnZhcyB7XG4gICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbiAgICBoZWlnaHQ6IDMwMHB4ICFpbXBvcnRhbnQ7XG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgei1pbmRleDogMTtcbiAgfVxuXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgIHBhZGRpbmc6IDE2cHg7XG4gICAgbWluLWhlaWdodDogMjgwcHg7XG5cbiAgICBjYW52YXMge1xuICAgICAgaGVpZ2h0OiAyNTBweCAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxufVxuXG4vKiBIaXN0b3J5IExpc3QgJiBUYWJsZSBIZWFkZXIgKi9cbi5oaXN0b3J5LXRhYmxlLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBhZGRpbmc6IDhweCAxNnB4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpO1xuICBib3JkZXItcmFkaXVzOiA4cHggOHB4IDAgMDtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xuXG4gIHNwYW4ge1xuICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LXRlcnRpYXJ5KTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgIGxldHRlci1zcGFjaW5nOiAwLjVweDtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICB9XG59XG5cbi5oaXN0b3J5LWxpc3Qge1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgcGFkZGluZzogMDtcbn1cblxuLyogU2Vzc2lvbiBHcm91cGluZyBIZWFkZXIgKi9cbi5zZXNzaW9uLWRpdmlkZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHBhZGRpbmc6IDhweCAxNnB4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDIpO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tbWVkaXVtLWdyYXkpO1xuXG4gIC8vIENvbnRlbmVkb3IgaXpxdWllcmRvOiBsYWJlbCArIGZlY2hhIGVuIGZsZXggcm93IGNvbiBnYXAgZXhwbMODwq1jaXRvLlxuICAvLyBVc2FyIGdhcCBDU1MgKG5vIHdoaXRlc3BhY2UgZW50cmUgZWxlbWVudG9zIGlubGluZSkgZXMgbGEgw4PCmk5JQ0EgZm9ybWFcbiAgLy8gZGUgZ2FyYW50aXphciBzZXBhcmFjacODwrNuIGNvbnNpc3RlbnRlIGVuIHRvZG9zIGxvcyBkaXNwb3NpdGl2b3MgeSBmdWVudGVzLlxuICAuc2Vzc2lvbi1oZWFkZXItbGVmdCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgZ2FwOiAxMnB4OyAgLy8gU2VwYXJhY2nDg8KzbiBnYXJhbnRpemFkYSBwb3IgQ1NTLCBudW5jYSBwb3Igd2hpdGVzcGFjZVxuICAgIG1pbi13aWR0aDogMDtcbiAgfVxuXG4gIC8vIEJhZGdlIHZpc3VhbCBpbXBsZW1lbnRhZG8gY29tbyA8c3Bhbj4gcGFyYSBldml0YXIgdmFyaWFjaW9uZXMgZGVcbiAgLy8gcmVuZGVyaXphZG8gZGUgaW9uLWJhZGdlIGVudHJlIGRpc3Bvc2l0aXZvc1xuICAud2Vlay1iYWRnZS1sYWJlbCB7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBwYWRkaW5nOiAycHggOHB4O1xuICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLW1lZGl1bS1yZ2IpLCAwLjIpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEodmFyKC0taW9uLWNvbG9yLW1lZGl1bS1yZ2IpLCAwLjMpO1xuICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgZm9udC1zaXplOiAxMXB4O1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgY29sb3I6IHZhcigtLXRleHQtc2Vjb25kYXJ5KTtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICB9XG5cbiAgLnNlc3Npb24tZGF0ZSB7XG4gICAgZm9udC1zaXplOiAxMXB4O1xuICAgIGNvbG9yOiB2YXIoLS10ZXh0LXRlcnRpYXJ5KTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIH1cblxuICAuc2Vzc2lvbi1ub3RlLWljb24ge1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICAgIGZvbnQtc2l6ZTogMTRweDtcbiAgICBmbGV4LXNocmluazogMDtcbiAgfVxuXG4gICY6Zmlyc3QtY2hpbGQge1xuICAgIGJvcmRlci10b3A6IG5vbmU7XG4gIH1cbn1cblxuXG4uaGlzdG9yeS1pdGVtIHtcbiAgLS1iYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAtLXBhZGRpbmctZW5kOiAwO1xuICAtLWlubmVyLXBhZGRpbmctZW5kOiAwO1xuICAtLW1pbi1oZWlnaHQ6IDQwcHg7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xuXG4gICY6bGFzdC1jaGlsZCB7XG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgfVxufVxuXG4uaGlzdG9yeS1yb3ctY29udGVudCxcbi5oaXN0b3J5LXRhYmxlLWhlYWRlciB7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAwIDE2cHg7XG5cbiAgLmhlYWRlci1jb2wtc2Vzc2lvbixcbiAgLmNvbC1zZXNzaW9uIHtcbiAgICB3aWR0aDogMTUlO1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICB9XG5cbiAgLmNvbC1zZXNzaW9uIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gICAgZ2FwOiAzcHg7XG4gIH1cblxuICAuaGVhZGVyLWNvbC13ZWlnaHQsXG4gIC5jb2wtd2VpZ2h0IHtcbiAgICB3aWR0aDogMjUlO1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG4gIC5oZWFkZXItY29sLXJlcHMsXG4gIC5jb2wtcmVwcyB7XG4gICAgd2lkdGg6IDI1JTtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cblxuICAuaGVhZGVyLWNvbC1yaXIsXG4gIC5jb2wtcmlyIHtcbiAgICB3aWR0aDogMzUlO1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgZ2FwOiA0cHg7XG4gICAgZmxleC13cmFwOiB3cmFwO1xuICB9XG5cbiAgJi5pcy1jYXJkaW8ge1xuICAgIC5oZWFkZXItY29sLXNlc3Npb24sXG4gICAgLmNvbC1zZXNzaW9uIHtcbiAgICAgIHdpZHRoOiAyMCU7XG4gICAgfVxuICAgIC5oZWFkZXItY29sLXdlaWdodCxcbiAgICAuY29sLXdlaWdodCB7XG4gICAgICB3aWR0aDogNDAlO1xuICAgIH1cbiAgICAuaGVhZGVyLWNvbC1yZXBzLFxuICAgIC5jb2wtcmVwcyB7XG4gICAgICB3aWR0aDogNDAlO1xuICAgIH1cbiAgfVxuXG4gICYuaXMtaXNvbWV0cmljIHtcbiAgICAuaGVhZGVyLWNvbC1zZXNzaW9uLFxuICAgIC5jb2wtc2Vzc2lvbiB7XG4gICAgICB3aWR0aDogMjAlO1xuICAgIH1cbiAgICAuaGVhZGVyLWNvbC13ZWlnaHQsXG4gICAgLmNvbC13ZWlnaHQge1xuICAgICAgd2lkdGg6IDgwJTtcbiAgICB9XG4gIH1cblxuICAuaGVhZGVyLWNvbC1ub3RlcyxcbiAgLmNvbC1ub3RlcyB7XG4gICAgLyogVGhpcyBjb2x1bW4gaXMgcmVtb3ZlZCBhcyB0aGUgc3VtIG9mIHRoZSBvdGhlciBjb2x1bW5zIGlzIDEwMCUgKi9cbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG59XG5cbi5zZXQtaW5kZXgge1xuICBmb250LXNpemU6IDExcHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LXRlcnRpYXJ5KTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuLnNlc3Npb24taW5kaWNhdG9ycyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogNHB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gIC50eXBlLWRvdCB7XG4gICAgZm9udC1zaXplOiA4cHg7XG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgICBwYWRkaW5nOiAycHggNXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cbiAgICAmLmRyb3Age1xuICAgICAgY29sb3I6ICNlZjQ0NDQ7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDIzOSwgNjgsIDY4LCAwLjEpO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyMzksIDY4LCA2OCwgMC4yKTtcbiAgICB9XG5cbiAgICAmLnJlc3Qge1xuICAgICAgY29sb3I6ICMyNTYzZWI7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDM3LCA5OSwgMjM1LCAwLjEpO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgzNywgOTksIDIzNSwgMC4yKTtcbiAgICB9XG5cbiAgICAmLmZhaWwge1xuICAgICAgY29sb3I6IHZhcigtLW9yYW5nZSk7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NCwgMTQ0LCAwLCAwLjEpO1xuICAgICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTQsIDE0NCwgMCwgMC4yKTtcbiAgICB9XG4gIH1cbn1cblxuLmhpc3Rvcnktcm93LWNvbnRlbnQge1xuICAuY29sLXdlaWdodCxcbiAgLmNvbC1yZXBzIHtcbiAgICBzcGFuIHtcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KTtcbiAgICB9XG5cbiAgICBzbWFsbCB7XG4gICAgICBmb250LXNpemU6IDEwcHg7XG4gICAgICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuICAgICAgbWFyZ2luLWxlZnQ6IDNweDtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgfVxuICB9XG5cbiAgLmNvbC1yaXIge1xuICAgIHNtYWxsIHtcbiAgICAgIGZvbnQtc2l6ZTogMTBweDtcbiAgICAgIGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gICAgICBtYXJnaW4tbGVmdDogM3B4O1xuICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICB9XG4gIH1cbn1cblxuLnJpci12YWx1ZSB7XG4gIGZvbnQtc2l6ZTogMTNweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRleHQtcHJpbWFyeSk7XG59XG5cbi8vIEludGVuc2l0eSBiYWRnZSBzdHlsZXMgw6LCgMKUIHNhbWUgYXMgd29ya291dC5jb21wb25lbnQuc2Nzc1xuLmZhaWwtbGFiZWwge1xuICBmb250LXNpemU6IDAuN3JlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjE1KTtcbiAgcGFkZGluZzogMnB4IDZweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxuXG4ud2Vlay1iYWRnZSB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tbWVkaXVtLWdyYXkpO1xuICAtLWNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSk7XG4gIC0tcGFkZGluZy10b3A6IDRweDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogNHB4O1xuICAtLXBhZGRpbmctc3RhcnQ6IDhweDtcbiAgLS1wYWRkaW5nLWVuZDogOHB4O1xuICBmb250LXNpemU6IDEwcHg7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIG1pbi13aWR0aDogMzJweDtcbn1cblxuLyogRW1wdHkgU3RhdGUgKi9cbi5lbXB0eS1zdGF0ZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogNDBweCAyMHB4O1xuICBjb2xvcjogdmFyKC0tdGV4dC1zZWNvbmRhcnkpO1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgIHBhZGRpbmc6IDYwcHggMjBweDtcbiAgfVxuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDU2cHg7XG4gICAgbWFyZ2luLWJvdHRvbTogMTRweDtcbiAgICBvcGFjaXR5OiAwLjM7XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICAgIGZvbnQtc2l6ZTogNjRweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgfVxuICB9XG5cbiAgaDMge1xuICAgIGZvbnQtc2l6ZTogMTdweDtcbiAgICBmb250LXdlaWdodDogNzAwO1xuICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KTtcblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiA3NjhweCkge1xuICAgICAgZm9udC1zaXplOiAxOHB4O1xuICAgIH1cbiAgfVxuXG4gIHAge1xuICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICBtYXgtd2lkdGg6IDMwMHB4O1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgY29sb3I6IHZhcigtLXRleHQtdGVydGlhcnkpO1xuXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgfVxuICB9XG59XG5cbi8qIEFuaW1hdGlvbnMgKi9cbkBrZXlmcmFtZXMgZmFkZUluVXAge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgyMHB4KTtcbiAgfVxuXG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuXG5pb24tY2FyZCB7XG4gIGFuaW1hdGlvbjogZmFkZUluVXAgMC40cyBlYXNlIGJhY2t3YXJkcztcbn1cblxuLyogw6LClMKAw6LClMKAw6LClMKAIFN1Yi1zZXJpZXMgRFMgLyBSUCBpbiBIaXN0b3J5IFRhYmxlIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgCAqL1xuLnN1YnNlcmllcy1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogNHB4IDE2cHggOHB4IDMycHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogM3B4O1xufVxuXG4uc3Vic2VyaWVzLWl0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDhweDtcbiAgcGFkZGluZzogM3B4IDhweDtcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xuICBib3JkZXItbGVmdDogMnB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcblxuICAuc3Vic2VyaWVzLWxhYmVsIHtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjM1KTtcbiAgICBtaW4td2lkdGg6IDUycHg7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBsZXR0ZXItc3BhY2luZzogMC4zcHg7XG4gIH1cblxuICAuc3Vic2VyaWVzLXZhbCB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42NSk7XG4gIH1cblxuICAuc3Vic2VyaWVzLXJpciB7XG4gICAgZm9udC1zaXplOiAxMHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpO1xuICAgIHBhZGRpbmc6IDFweCA2cHg7XG4gICAgYm9yZGVyLXJhZGl1czogNHB4O1xuICB9XG59XG5cbi8vIERTIHN1Yi1zZXJpZXM6IHJlZCBhY2NlbnRcbmlvbi1pdGVtOmhhcygudHlwZS1kb3QuZHJvcCkgfiAuc3Vic2VyaWVzLWNvbnRhaW5lciB7XG4gIC5zdWJzZXJpZXMtaXRlbSB7XG4gICAgYm9yZGVyLWxlZnQtY29sb3I6IHJnYmEoMjM5LCA2OCwgNjgsIDAuNCk7XG4gIH1cblxuICAuc3Vic2VyaWVzLWxhYmVsIHtcbiAgICBjb2xvcjogcmdiYSgyMzksIDY4LCA2OCwgMC43KTtcbiAgfVxufVxuXG4vLyBSUCBzdWItc2VyaWVzOiBibHVlIGFjY2VudFxuaW9uLWl0ZW06aGFzKC50eXBlLWRvdC5yZXN0KSB+IC5zdWJzZXJpZXMtY29udGFpbmVyIHtcbiAgLnN1YnNlcmllcy1pdGVtIHtcbiAgICBib3JkZXItbGVmdC1jb2xvcjogcmdiYSgzNywgOTksIDIzNSwgMC40KTtcbiAgfVxuXG4gIC5zdWJzZXJpZXMtbGFiZWwge1xuICAgIGNvbG9yOiByZ2JhKDU2LCAxMjgsIDI1NSwgMC43KTtcbiAgfVxufVxuXG4vKiDDosKUwoDDosKUwoDDosKUwoAgQ29tcGFyaXNvbjogRnVsbC13aWR0aCBpdGVtIMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgMOiwpTCgCAqL1xuLmNvbXBhcmlzb24taXRlbS1mdWxsIHtcbiAgZ3JpZC1jb2x1bW46IDEgLyAtMTtcbn1cblxuLyogw6LClMKAw6LClMKAw6LClMKAIENvbXBhcmlzb246IFRlY2huaXF1ZSBjaGlwcyDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoDDosKUwoAgKi9cbi50ZWNobmlxdWUtcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA4cHg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgbWFyZ2luLXRvcDogNHB4O1xufVxuXG4udGVjaG5pcXVlLWNoaXAge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA2cHg7XG4gIHBhZGRpbmc6IDVweCAxMnB4O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiA5MHB4O1xuXG4gIC50LWxhYmVsIHtcbiAgICBmb250LXNpemU6IDEwcHg7XG4gICAgZm9udC13ZWlnaHQ6IDgwMDtcbiAgICBwYWRkaW5nOiAycHggNnB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICBsZXR0ZXItc3BhY2luZzogMC41cHg7XG4gIH1cblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xuXG4gICAgJi5wb3NpdGl2ZSB7XG4gICAgICBjb2xvcjogIzJkZDM2ZjtcbiAgICB9XG5cbiAgICAmLm5lZ2F0aXZlIHtcbiAgICAgIGNvbG9yOiAjZWI0NDVhO1xuICAgIH1cblxuICAgICYubmV1dHJhbCB7XG4gICAgICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xuICAgIH1cbiAgfVxuXG4gICYuZHMge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjM5LCA2OCwgNjgsIDAuMDgpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjM5LCA2OCwgNjgsIDAuMik7XG4gICAgY29sb3I6IHJnYmEoMjM5LCA2OCwgNjgsIDAuOSk7XG5cbiAgICAudC1sYWJlbCB7XG4gICAgICBiYWNrZ3JvdW5kOiByZ2JhKDIzOSwgNjgsIDY4LCAwLjE1KTtcbiAgICAgIGNvbG9yOiAjZWY0NDQ0O1xuICAgIH1cbiAgfVxuXG4gICYucnAge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMzcsIDk5LCAyMzUsIDAuMDgpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMzcsIDk5LCAyMzUsIDAuMik7XG4gICAgY29sb3I6IHJnYmEoNTYsIDEyOCwgMjU1LCAwLjkpO1xuXG4gICAgLnQtbGFiZWwge1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgzNywgOTksIDIzNSwgMC4xNSk7XG4gICAgICBjb2xvcjogIzM4ODBmZjtcbiAgICB9XG4gIH1cbn1cblxuLm5vLXdyYXAge1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uY2xpY2thYmxlIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uaW50ZW5zaXR5LWRyb3Age1xuICBmb250LXNpemU6IDAuN3JlbTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6ICNlZjQ0NDQ7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjM5LCA2OCwgNjgsIDAuMSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjM5LCA2OCwgNjgsIDAuMik7XG4gIHBhZGRpbmc6IDJweCA2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuLmludGVuc2l0eS1ycCB7XG4gIGZvbnQtc2l6ZTogMC43cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogIzI1NjNlYjtcbiAgYmFja2dyb3VuZDogcmdiYSg1OSwgMTMwLCAyNDYsIDAuMSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMzcsIDk5LCAyMzUsIDAuMik7XG4gIHBhZGRpbmc6IDJweCA2cHg7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbn1cblxuLnJlc3Qtc2Vjb25kcy1iYWRnZSB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDJweDtcbiAgZm9udC1zaXplOiAwLjY1cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICBiYWNrZ3JvdW5kOiByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMSk7XG4gIHBhZGRpbmc6IDFweCA1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAwLjhyZW07XG4gIH1cbn1cblxuLmNoYXJ0LW1vZGUtY29udGFpbmVyIHtcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgd2lkdGg6IDEwMCU7XG5cbiAgaW9uLXNlZ21lbnQge1xuICAgIC0tYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICBwYWRkaW5nOiAycHg7XG5cbiAgICBpb24tc2VnbWVudC1idXR0b24ge1xuICAgICAgLS1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpO1xuICAgICAgLS1jb2xvci1jaGVja2VkOiAjZmU5MDAwO1xuICAgICAgLS1pbmRpY2F0b3ItY29sb3I6IHJnYmEoMjU0LCAxNDQsIDAsIDAuMTIpO1xuICAgICAgZm9udC1zaXplOiAxMXB4O1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIG1pbi1oZWlnaHQ6IDM2cHg7XG4gICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuNXB4O1xuICAgIH1cbiAgfVxufVxuXG4uc2V0LXNlbGVjdC13cmFwcGVyIHtcbiAgd2lkdGg6IGF1dG87XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBmbGV4LXNocmluazogMDtcblxuICAubWljcm9jeWNsZS10cmlnZ2VyIHtcbiAgICB3aWR0aDogYXV0bztcbiAgICBwYWRkaW5nOiA2cHggMTBweDtcbiAgfVxufVxuXG4vLyBOb3RhIGFuY2xhZGEgZGVsIGVqZXJjaWNpbyDDosKAwpQgbWlzbWEgaWRlbnRpZGFkIHZpc3VhbCBxdWUgZW5cbi8vIGNvbmZpZy1leGVyY2lzZS5wYWdlLnNjc3MsIHZlcnNpw4PCs24gZGUgc29sbyBsZWN0dXJhIChzaW4gYWNjaW9uZXMpLlxuLnBpbm5lZC1ub3RlLWNvbnRhaW5lciB7XG4gIG1hcmdpbjogMTJweCA4cHg7XG5cbiAgLnBpbm5lZC1ub3RlLWNhcmQge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBnYXA6IDhweDtcbiAgICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gICAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAxMzVkZWcsXG4gICAgICByZ2JhKDU2LCAxMjgsIDI1NSwgMC4xMCkgMCUsXG4gICAgICByZ2JhKDU2LCAxMjgsIDI1NSwgMC4wNCkgMTAwJVxuICAgICk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg1NiwgMTI4LCAyNTUsIDAuMjApO1xuICAgIGJveC1zaGFkb3c6IDAgMnB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMDgpO1xuXG4gICAgLmNhcmQtaGVhZGVyIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgICAubGVmdC1zZWN0aW9uIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgZ2FwOiA4cHg7XG5cbiAgICAgICAgLmljb24td3JhcHBlciB7XG4gICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgIGNvbG9yOiAjMzg4MGZmO1xuXG4gICAgICAgICAgaW9uLWljb24ge1xuICAgICAgICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC50aXRsZSB7XG4gICAgICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgICBjb2xvcjogIzM4ODBmZjtcbiAgICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICAgICAgICAgIGxldHRlci1zcGFjaW5nOiAwLjNweDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC50ZXh0IHtcbiAgICAgIG1hcmdpbjogMDtcbiAgICAgIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgICBjb2xvcjogdmFyKC0tdGV4dC1wcmltYXJ5KTtcbiAgICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcDtcbiAgICB9XG4gIH1cbn1cblxuLmNoYXJ0LWhlYWRlci1tYWluIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbiAgZ2FwOiAxMnB4O1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
}));


/***/ })

}]);
//# sourceMappingURL=packages_shared-features_src_app_features_tables_components_summary_components_statistics_sta-a2ec4e.js.map