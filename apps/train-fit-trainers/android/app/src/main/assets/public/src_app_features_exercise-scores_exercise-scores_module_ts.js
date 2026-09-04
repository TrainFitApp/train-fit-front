"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_features_exercise-scores_exercise-scores_module_ts"],{

/***/ 75636:
/*!********************************************************************************************************!*\
  !*** ./src/app/features/exercise-scores/components/score-editor-modal/score-editor-modal.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ScoreEditorModalComponent: () => (/* binding */ ScoreEditorModalComponent)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_core_constants_exercise_score__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/constants/exercise-score */ 84316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _services_exercise_scores_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/exercise-scores-api.service */ 72766);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 84725);

var _ScoreEditorModalComponent;







function ScoreEditorModalComponent_span_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r0.scoredMuscleCount, " marcados");
  }
}
function ScoreEditorModalComponent_li_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const level_r7 = ctx.$implicit;
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](level_r7);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r1.muscleAnchor(level_r7), " ");
  }
}
function ScoreEditorModalComponent_div_16_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ScoreEditorModalComponent_div_16_button_4_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r13);
      const level_r10 = restoredCtx.$implicit;
      const muscle_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r11.setMuscle(muscle_r8, level_r10));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const level_r10 = ctx.$implicit;
    const muscle_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("selected", ctx_r9.muscleValue(muscle_r8) === level_r10);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("title", ctx_r9.muscleAnchor(level_r10));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵattribute"]("aria-pressed", ctx_r9.muscleValue(muscle_r8) === level_r10)("aria-label", muscle_r8 + ": " + ctx_r9.muscleAnchor(level_r10));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", level_r10, " ");
  }
}
function ScoreEditorModalComponent_div_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 29)(1, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, ScoreEditorModalComponent_div_16_button_4_Template, 2, 6, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const muscle_r8 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](muscle_r8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r2.levels)("ngForTrackBy", ctx_r2.trackByLevel);
  }
}
function ScoreEditorModalComponent_span_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r3.scoredJointCount, " marcadas");
  }
}
function ScoreEditorModalComponent_div_22_li_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "li")(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const level_r17 = ctx.$implicit;
    const ctx_r15 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](level_r17);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r15.jointAnchor(level_r17), " ");
  }
}
function ScoreEditorModalComponent_div_22_div_3_button_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ScoreEditorModalComponent_div_22_div_3_button_4_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r23);
      const level_r20 = restoredCtx.$implicit;
      const joint_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r21.setJoint(joint_r18, level_r20));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const level_r20 = ctx.$implicit;
    const joint_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("selected", ctx_r19.jointValue(joint_r18) === level_r20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("title", ctx_r19.jointAnchor(level_r20));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵattribute"]("aria-pressed", ctx_r19.jointValue(joint_r18) === level_r20)("aria-label", joint_r18 + ": " + ctx_r19.jointAnchor(level_r20));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", level_r20, " ");
  }
}
function ScoreEditorModalComponent_div_22_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 29)(1, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, ScoreEditorModalComponent_div_22_div_3_button_4_Template, 2, 6, "button", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const joint_r18 = ctx.$implicit;
    const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](joint_r18);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r16.levels)("ngForTrackBy", ctx_r16.trackByLevel);
  }
}
function ScoreEditorModalComponent_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 34)(1, "ul", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, ScoreEditorModalComponent_div_22_li_2_Template, 4, 2, "li", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, ScoreEditorModalComponent_div_22_div_3_Template, 5, 3, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r4.levels)("ngForTrackBy", ctx_r4.trackByLevel);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r4.joints)("ngForTrackBy", ctx_r4.trackByName);
  }
}
function ScoreEditorModalComponent_span_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Guardar");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ScoreEditorModalComponent_ion_spinner_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ion-spinner", 37);
  }
}
/**
 * Movimiento 6 Coach Pro — puntuar UN ejercicio.
 *
 * Dieciséis músculos y ocho articulaciones son veinticuatro decisiones. Para
 * que eso no sea una pantalla imposible:
 *   - la escala es de cuatro niveles, no de diez;
 *   - se arranca en 0 (que es la respuesta correcta para la mayoría);
 *   - las articulaciones van plegadas, porque casi todo el criterio útil
 *     está en los músculos y quien no quiera tocarlas no las ve.
 */
class ScoreEditorModalComponent {
  constructor(exerciseScoresApi, ionicUtilService, modalController) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "exerciseScoresApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "modalController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "exerciseId", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "exerciseName", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "existing", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "catalog", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "levels", src_app_core_constants_exercise_score__WEBPACK_IMPORTED_MODULE_1__.SCORE_LEVELS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "muscleValues", new Map());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "jointValues", new Map());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "secondsPerSet", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "showJoints", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isSaving", false);
    this.exerciseScoresApi = exerciseScoresApi;
    this.ionicUtilService = ionicUtilService;
    this.modalController = modalController;
  }
  ngOnInit() {
    for (const muscle of this.muscles) {
      this.muscleValues.set(muscle, (0,src_app_core_constants_exercise_score__WEBPACK_IMPORTED_MODULE_1__.scoreFor)(this.existing?.muscleScores, muscle));
    }
    for (const joint of this.joints) {
      this.jointValues.set(joint, (0,src_app_core_constants_exercise_score__WEBPACK_IMPORTED_MODULE_1__.scoreFor)(this.existing?.jointScores, joint));
    }
    this.secondsPerSet = this.existing?.secondsPerSet ?? null;
    // Si ya había alguna articulación puntuada, la sección se abre sola:
    // esconder lo que el entrenador escribió haría pensar que se ha perdido.
    this.showJoints = (this.existing?.jointScores || []).length > 0;
  }
  get muscles() {
    return this.catalog?.muscles || [];
  }
  get joints() {
    return this.catalog?.joints || [];
  }
  muscleAnchor(level) {
    return this.catalog?.muscleAnchors?.[level] || '';
  }
  jointAnchor(level) {
    return this.catalog?.jointAnchors?.[level] || '';
  }
  muscleValue(muscle) {
    return this.muscleValues.get(muscle) || 0;
  }
  jointValue(joint) {
    return this.jointValues.get(joint) || 0;
  }
  setMuscle(muscle, level) {
    this.muscleValues.set(muscle, level);
  }
  setJoint(joint, level) {
    this.jointValues.set(joint, level);
  }
  // Cuántos ha puntuado ya. Se enseña porque veinticuatro decisiones sin
  // ninguna señal de avance se abandonan a la mitad.
  get scoredMuscleCount() {
    return [...this.muscleValues.values()].filter(value => value > 0).length;
  }
  get scoredJointCount() {
    return [...this.jointValues.values()].filter(value => value > 0).length;
  }
  toggleJoints() {
    this.showJoints = !this.showJoints;
  }
  cancel() {
    // false = no se ha guardado nada, la lista de detrás no necesita
    // recargarse.
    this.modalController.dismiss(false);
  }
  save() {
    if (this.isSaving) return;
    this.isSaving = true;
    this.exerciseScoresApi.save(this.exerciseId, {
      muscleScores: toEntries(this.muscleValues),
      jointScores: toEntries(this.jointValues),
      secondsPerSet: this.secondsPerSet
    }).subscribe({
      next: () => {
        this.isSaving = false;
        this.modalController.dismiss(true);
      },
      error: () => {
        this.isSaving = false;
        this.ionicUtilService.showErrorToast('No se pudo guardar la puntuación', 'Error', 2500);
      }
    });
  }
  trackByName(_index, name) {
    return name;
  }
  trackByLevel(_index, level) {
    return level;
  }
}
_ScoreEditorModalComponent = ScoreEditorModalComponent;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ScoreEditorModalComponent, "\u0275fac", function ScoreEditorModalComponent_Factory(t) {
  return new (t || _ScoreEditorModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_exercise_scores_api_service__WEBPACK_IMPORTED_MODULE_2__.ExerciseScoresApiService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_3__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ScoreEditorModalComponent, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _ScoreEditorModalComponent,
  selectors: [["app-score-editor-modal"]],
  inputs: {
    exerciseId: "exerciseId",
    exerciseName: "exerciseName",
    existing: "existing",
    catalog: "catalog"
  },
  decls: 36,
  vars: 14,
  consts: [[1, "score-editor"], [1, "editor-header"], [1, "editor-title-block"], [1, "editor-title"], [1, "editor-subtitle"], ["type", "button", "aria-label", "Cerrar", 1, "close-button", 3, "click"], ["name", "close-outline"], [1, "editor-body"], [1, "section-head"], [1, "section-title"], ["class", "section-count", 4, "ngIf"], [1, "legend"], [4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "score-row", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "joints-toggle", 3, "click"], ["aria-hidden", "true", 3, "name"], [1, "joints-toggle-label"], ["class", "joints-body", 4, "ngIf"], ["for", "seconds-per-set", 1, "field-label"], [1, "field-hint"], [1, "input-wrapper"], ["name", "stopwatch-outline", 1, "input-icon"], ["id", "seconds-per-set", "type", "number", "min", "0", "max", "600", "placeholder", "40", 1, "input-field", 3, "ngModel", "ngModelChange"], [1, "editor-footer"], ["type", "button", 1, "cancel-button", 3, "click"], ["type", "button", 1, "submit-button", 3, "disabled", "click"], [4, "ngIf"], ["name", "dots", 4, "ngIf"], [1, "section-count"], [1, "score-row"], [1, "score-name"], [1, "score-levels"], ["type", "button", "class", "score-level", 3, "selected", "title", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "score-level", 3, "title", "click"], [1, "joints-body"], ["type", "button", "class", "score-level score-level--joint", 3, "selected", "title", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["type", "button", 1, "score-level", "score-level--joint", 3, "title", "click"], ["name", "dots"]],
  template: function ScoreEditorModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0)(1, "header", 1)(2, "div", 2)(3, "h2", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "p", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6, " Tu criterio sobre este ejercicio. Solo lo ves t\u00FA: no se comparte con otros profesionales. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "button", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ScoreEditorModalComponent_Template_button_click_7_listener() {
        return ctx.cancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "ion-icon", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "div", 7)(10, "div", 8)(11, "h3", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "Estimulaci\u00F3n muscular");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, ScoreEditorModalComponent_span_13_Template, 2, 1, "span", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "ul", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](15, ScoreEditorModalComponent_li_15_Template, 4, 2, "li", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](16, ScoreEditorModalComponent_div_16_Template, 5, 3, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "button", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ScoreEditorModalComponent_Template_button_click_17_listener() {
        return ctx.toggleJoints();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](18, "ion-icon", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "span", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, "Estr\u00E9s articular");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](21, ScoreEditorModalComponent_span_21_Template, 2, 1, "span", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](22, ScoreEditorModalComponent_div_22_Template, 4, 4, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](23, "label", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](24, "Segundos por serie (opcional)");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](25, "p", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](26, " Sin contar el descanso. Se usa para estimar cu\u00E1nto dura una sesi\u00F3n; si lo dejas vac\u00EDo se usa un valor por defecto. ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](27, "div", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](28, "ion-icon", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](29, "input", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ScoreEditorModalComponent_Template_input_ngModelChange_29_listener($event) {
        return ctx.secondsPerSet = $event;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](30, "footer", 23)(31, "button", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ScoreEditorModalComponent_Template_button_click_31_listener() {
        return ctx.cancel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](32, "Cancelar");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "button", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ScoreEditorModalComponent_Template_button_click_33_listener() {
        return ctx.save();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](34, ScoreEditorModalComponent_span_34_Template, 2, 0, "span", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](35, ScoreEditorModalComponent_ion_spinner_35_Template, 1, 0, "ion-spinner", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx.exerciseName);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](9);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.scoredMuscleCount);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.levels)("ngForTrackBy", ctx.trackByLevel);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.muscles)("ngForTrackBy", ctx.trackByName);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵattribute"]("aria-expanded", ctx.showJoints);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("name", ctx.showJoints ? "chevron-down-outline" : "chevron-forward-outline");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.scoredJointCount);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.showJoints);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx.secondsPerSet);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", ctx.isSaving);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.isSaving);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isSaving);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.MaxValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonSpinner],
  styles: ["[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\n\n.score-editor[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  background: var(--tf-bg);\n  color: var(--tf-text);\n}\n\n.editor-header[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  align-items: flex-start;\n  gap: var(--tf-space-3);\n  padding: var(--tf-space-5);\n  border-bottom: 1px solid var(--tf-border);\n}\n\n.editor-title-block[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n\n.editor-title[_ngcontent-%COMP%] {\n  margin: 0 0 4px;\n  font-size: var(--tf-font-size-lg);\n  font-weight: 700;\n}\n\n.editor-subtitle[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-xs);\n  line-height: 1.45;\n  color: var(--tf-text-muted);\n}\n\n.close-button[_ngcontent-%COMP%] {\n  --background: var(--tf-surface-3);\n  --background-activated: var(--tf-surface-4);\n  --background-hover: var(--tf-surface-4);\n  --background-focused: var(--tf-surface-4);\n  --color: var(--tf-text-secondary);\n  --border-radius: 12px;\n  --padding-start: 0;\n  --padding-end: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  background: var(--tf-surface-3);\n  color: var(--tf-text-secondary);\n  border: none;\n  border-radius: 12px;\n  width: 44px;\n  height: 44px;\n  min-width: 44px;\n  min-height: 44px;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  transition: background var(--tf-duration-fast) var(--tf-ease-out), color var(--tf-duration-fast) var(--tf-ease-out);\n  flex-shrink: 0;\n}\n.close-button[_ngcontent-%COMP%]:active {\n  background: var(--tf-surface-4);\n}\n.close-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.close-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n\n.editor-body[_ngcontent-%COMP%] {\n  flex: 1;\n  min-height: 0;\n  overflow-y: auto;\n  padding: var(--tf-space-4) var(--tf-space-5) var(--tf-space-5);\n}\n\n.section-head[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: var(--tf-space-3);\n  margin-bottom: var(--tf-space-2);\n}\n\n.section-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n  letter-spacing: 0.06em;\n  text-transform: uppercase;\n  color: var(--tf-text-muted);\n}\n\n.section-count[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: 2px 8px;\n  border-radius: var(--tf-radius-pill);\n  background: var(--tf-accent-soft);\n  color: var(--tf-accent-text);\n  font-size: var(--tf-font-size-xs);\n  font-weight: 700;\n}\n\n.legend[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0 0 var(--tf-space-4);\n  padding: var(--tf-space-3);\n  background: var(--tf-surface-2);\n  border-radius: var(--tf-radius-md);\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n  font-size: var(--tf-font-size-xs);\n  line-height: 1.4;\n  color: var(--tf-text-muted);\n}\n.legend[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  display: inline-block;\n  min-width: 14px;\n  color: var(--tf-text);\n}\n\n.score-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-3);\n  padding: 6px 0;\n  border-top: 1px solid var(--tf-border-subtle);\n}\n.score-row[_ngcontent-%COMP%]:first-of-type {\n  border-top: none;\n}\n\n.score-name[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-secondary);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.score-levels[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 4px;\n  flex-shrink: 0;\n}\n\n.score-level[_ngcontent-%COMP%] {\n  width: 38px;\n  min-height: 44px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-md);\n  color: var(--tf-text-muted);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  font-weight: 700;\n  cursor: pointer;\n  transition: border-color var(--tf-duration-fast) var(--tf-ease-out), background var(--tf-duration-fast) var(--tf-ease-out), color var(--tf-duration-fast) var(--tf-ease-out);\n}\n.score-level.selected[_ngcontent-%COMP%] {\n  border-color: var(--tf-accent);\n  background: var(--tf-accent-soft);\n  color: var(--tf-text);\n}\n.score-level--joint.selected[_ngcontent-%COMP%] {\n  border-color: var(--tf-danger);\n  background: var(--tf-danger-soft);\n  color: var(--tf-danger-text);\n}\n.score-level[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.joints-toggle[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  min-height: 48px;\n  margin-top: var(--tf-space-5);\n  padding: 0;\n  background: none;\n  border: none;\n  border-top: 1px solid var(--tf-border);\n  color: var(--tf-text);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  text-align: left;\n  cursor: pointer;\n}\n.joints-toggle[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 15px;\n  color: var(--tf-text-muted);\n}\n.joints-toggle[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.joints-toggle-label[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.joints-body[_ngcontent-%COMP%] {\n  padding-top: var(--tf-space-3);\n}\n\n.field-label[_ngcontent-%COMP%] {\n  display: block;\n  margin: var(--tf-space-5) 0 4px;\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n  letter-spacing: 0.04em;\n  text-transform: uppercase;\n  color: var(--tf-text-muted);\n}\n\n.field-hint[_ngcontent-%COMP%] {\n  margin: 0 0 var(--tf-space-2);\n  font-size: var(--tf-font-size-xs);\n  line-height: 1.45;\n  color: var(--tf-text-muted);\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  flex-shrink: 0;\n}\n\n.input-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.editor-footer[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  gap: var(--tf-space-3);\n  padding: var(--tf-space-4) var(--tf-space-5);\n  border-top: 1px solid var(--tf-border);\n}\n\n.cancel-button[_ngcontent-%COMP%] {\n  flex: 0 0 auto;\n  min-height: 48px;\n  padding: 0 var(--tf-space-5);\n  background: none;\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-md);\n  color: var(--tf-text-secondary);\n  font-family: inherit;\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  cursor: pointer;\n}\n.cancel-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  flex: 1;\n}\n.submit-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZXhlcmNpc2Utc2NvcmVzL2NvbXBvbmVudHMvc2NvcmUtZWRpdG9yLW1vZGFsL3Njb3JlLWVkaXRvci1tb2RhbC5jb21wb25lbnQuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fYnV0dG9ucy5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19pbnB1dHMuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQTtFQUNFLGNBQUE7RUFDQSxZQUFBO0FBRkY7O0FBS0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0VBQ0Esd0JBQUE7RUFDQSxxQkFBQTtBQUZGOztBQU9BO0VBQ0UsY0FBQTtFQUNBLGFBQUE7RUFDQSx1QkFBQTtFQUNBLHNCQUFBO0VBQ0EsMEJBQUE7RUFDQSx5Q0FBQTtBQUpGOztBQU9BO0VBQ0UsT0FBQTtFQUNBLFlBQUE7QUFKRjs7QUFPQTtFQUNFLGVBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0FBSkY7O0FBT0E7RUFDRSxTQUFBO0VBQ0EsaUNBQUE7RUFDQSxpQkFBQTtFQUNBLDJCQUFBO0FBSkY7O0FBT0E7RUNERSxpQ0FBQTtFQUNBLDJDQUFBO0VBQ0EsdUNBQUE7RUFDQSx5Q0FBQTtFQUNBLGlDQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtFQUVBLCtCQUFBO0VBQ0EsK0JBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBZjBDO0VBZ0IxQyxXQWhCMkI7RUFpQjNCLFlBakIyQjtFQWtCM0IsZUFsQjJCO0VBbUIzQixnQkFuQjJCO0VBb0IzQixTQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxlQUFBO0VBQ0EsbUhBQUE7RURyQkEsY0FBQTtBQW1CRjtBQ0tFO0VBQ0UsK0JBQUE7QURISjtBQ01FO0VBQ0UsbUNBQUE7RUFDQSxtQkFBQTtBREpKO0FDT0U7RUFDRSxlQXRDMEQ7QURpQzlEOztBQTFCQTtFQUNFLE9BQUE7RUFDQSxhQUFBO0VBQ0EsZ0JBQUE7RUFDQSw4REFBQTtBQTZCRjs7QUExQkE7RUFDRSxhQUFBO0VBQ0EscUJBQUE7RUFDQSw4QkFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0NBQUE7QUE2QkY7O0FBMUJBO0VBQ0UsU0FBQTtFQUNBLGlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO0VBQ0EsMkJBQUE7QUE2QkY7O0FBMUJBO0VBQ0UsY0FBQTtFQUNBLGdCQUFBO0VBQ0Esb0NBQUE7RUFDQSxpQ0FBQTtFQUNBLDRCQUFBO0VBQ0EsaUNBQUE7RUFDQSxnQkFBQTtBQTZCRjs7QUF6QkE7RUFDRSxnQkFBQTtFQUNBLDZCQUFBO0VBQ0EsMEJBQUE7RUFDQSwrQkFBQTtFQUNBLGtDQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtFQUNBLGlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSwyQkFBQTtBQTRCRjtBQTFCRTtFQUNFLHFCQUFBO0VBQ0EsZUFBQTtFQUNBLHFCQUFBO0FBNEJKOztBQXhCQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtFQUNBLDZDQUFBO0FBMkJGO0FBekJFO0VBQ0UsZ0JBQUE7QUEyQko7O0FBdkJBO0VBQ0UsT0FBQTtFQUNBLFlBQUE7RUFDQSxpQ0FBQTtFQUNBLCtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBMEJGOztBQXZCQTtFQUNFLGFBQUE7RUFDQSxRQUFBO0VBQ0EsY0FBQTtBQTBCRjs7QUFuQkE7RUFDRSxXQUFBO0VBQ0EsZ0JBQUE7RUFDQSwrQkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0NBQUE7RUFDQSwyQkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUNBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSw0S0FBQTtBQXNCRjtBQWxCRTtFQUNFLDhCQUFBO0VBQ0EsaUNBQUE7RUFDQSxxQkFBQTtBQW9CSjtBQWZFO0VBQ0UsOEJBQUE7RUFDQSxpQ0FBQTtFQUNBLDRCQUFBO0FBaUJKO0FBZEU7RUFDRSxtQ0FBQTtFQUNBLG1CQUFBO0FBZ0JKOztBQVpBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLFdBQUE7RUFDQSxnQkFBQTtFQUNBLDZCQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsWUFBQTtFQUNBLHNDQUFBO0VBQ0EscUJBQUE7RUFDQSxvQkFBQTtFQUNBLGlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFlRjtBQWJFO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSwyQkFBQTtBQWVKO0FBWkU7RUFDRSxtQ0FBQTtFQUNBLG1CQUFBO0FBY0o7O0FBVkE7RUFDRSxPQUFBO0FBYUY7O0FBVkE7RUFDRSw4QkFBQTtBQWFGOztBQVZBO0VBQ0UsY0FBQTtFQUNBLCtCQUFBO0VBQ0EsaUNBQUE7RUFDQSxnQkFBQTtFQUNBLHNCQUFBO0VBQ0EseUJBQUE7RUFDQSwyQkFBQTtBQWFGOztBQVZBO0VBQ0UsNkJBQUE7RUFDQSxpQ0FBQTtFQUNBLGlCQUFBO0VBQ0EsMkJBQUE7QUFhRjs7QUFWQTtFRTdORSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsK0JBSjJCO0VBSzNCLHlDQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsaURBQUE7QUYyT0Y7QUV6T0U7RUFDRSw4QkFBQTtBRjJPSjs7QUFwQkE7RUVsTkUsMkJBQUE7RUFDQSxjQUFBO0FGME9GOztBQXJCQTtFRWpORSxPQUFBO0VBQ0EsWUFBQTtFQUNBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLGFBQUE7RUFDQSxxQkFBQTtFQUNBLG9CQUFBO0VBQ0EsWUFBQTtBRjBPRjtBRXhPRTtFQUNFLDJCQUFBO0FGME9KOztBQS9CQTtFQUNFLGNBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSw0Q0FBQTtFQUNBLHNDQUFBO0FBa0NGOztBQS9CQTtFQUNFLGNBQUE7RUFDQSxnQkFBQTtFQUNBLDRCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx5Q0FBQTtFQUNBLGtDQUFBO0VBQ0EsK0JBQUE7RUFDQSxvQkFBQTtFQUNBLGlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBa0NGO0FBaENFO0VBQ0UsbUNBQUE7RUFDQSxtQkFBQTtBQWtDSjs7QUE5QkE7RUNoUUUsWUFBQTtFQUNBLG1CQUZpQztFQUdqQyxxQ0FBQTtFQUNBLGdDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsZ0ZBQUE7RUQ0UEEsT0FBQTtBQXVDRjtBQ2pTRTtFQUNFLHNCQUFBO0FEbVNKO0FDaFNFO0VBQ0UsYUFBQTtFQUNBLGVBQUE7QURrU0o7QUMvUkU7RUFDRSxpQ0FBQTtFQUNBLG1CQUFBO0FEaVNKIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vdGhlbWUvYnV0dG9ucyc7XG5AaW1wb3J0ICcuLi8uLi8uLi8uLi8uLi90aGVtZS9pbnB1dHMnO1xuXG46aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi5zY29yZS1lZGl0b3Ige1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLWJnKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xufVxuXG4vLyBMYSBjYWJlY2VyYSB5IGVsIHBpZSBzZSBxdWVkYW4gZmlqb3M6IHZlaW50aWN1YXRybyBmaWxhcyBkZSBwdW50dWFjacODwrNuIG5vXG4vLyBwdWVkZW4gZGVqYXIgZWwgYm90w4PCs24gZGUgZ3VhcmRhciBhbCBmaW5hbCBkZSB1biBkZXNwbGF6YW1pZW50byBsYXJnby5cbi5lZGl0b3ItaGVhZGVyIHtcbiAgZmxleC1zaHJpbms6IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTMpO1xuICBwYWRkaW5nOiB2YXIoLS10Zi1zcGFjZS01KTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG59XG5cbi5lZGl0b3ItdGl0bGUtYmxvY2sge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG59XG5cbi5lZGl0b3ItdGl0bGUge1xuICBtYXJnaW46IDAgMCA0cHg7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWxnKTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLmVkaXRvci1zdWJ0aXRsZSB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUteHMpO1xuICBsaW5lLWhlaWdodDogMS40NTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xufVxuXG4uY2xvc2UtYnV0dG9uIHtcbiAgQGluY2x1ZGUgdGYtaWNvbi1idXR0b247XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4uZWRpdG9yLWJvZHkge1xuICBmbGV4OiAxO1xuICBtaW4taGVpZ2h0OiAwO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBwYWRkaW5nOiB2YXIoLS10Zi1zcGFjZS00KSB2YXIoLS10Zi1zcGFjZS01KSB2YXIoLS10Zi1zcGFjZS01KTtcbn1cblxuLnNlY3Rpb24taGVhZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBiYXNlbGluZTtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTMpO1xuICBtYXJnaW4tYm90dG9tOiB2YXIoLS10Zi1zcGFjZS0yKTtcbn1cblxuLnNlY3Rpb24tdGl0bGUge1xuICBtYXJnaW46IDA7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDZlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xufVxuXG4uc2VjdGlvbi1jb3VudCB7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICBwYWRkaW5nOiAycHggOHB4O1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtcGlsbCk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLWFjY2VudC1zb2Z0KTtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudC10ZXh0KTtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUteHMpO1xuICBmb250LXdlaWdodDogNzAwO1xufVxuXG4vLyBVbmEgdmV6IGFycmliYTogc29uIGxhcyBtaXNtYXMgY3VhdHJvIGZyYXNlcyBwYXJhIGRpZWNpc8ODwqlpcyBtw4PCunNjdWxvcy5cbi5sZWdlbmQge1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBtYXJnaW46IDAgMCB2YXIoLS10Zi1zcGFjZS00KTtcbiAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMik7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1tZCk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogNHB4O1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS14cyk7XG4gIGxpbmUtaGVpZ2h0OiAxLjQ7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcblxuICBzdHJvbmcge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBtaW4td2lkdGg6IDE0cHg7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICB9XG59XG5cbi5zY29yZS1yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTMpO1xuICBwYWRkaW5nOiA2cHggMDtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdWJ0bGUpO1xuXG4gICY6Zmlyc3Qtb2YtdHlwZSB7XG4gICAgYm9yZGVyLXRvcDogbm9uZTtcbiAgfVxufVxuXG4uc2NvcmUtbmFtZSB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLnNjb3JlLWxldmVscyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogNHB4O1xuICBmbGV4LXNocmluazogMDtcbn1cblxuLy8gQ3VhdHJvIGJvdG9uZXMgcG9yIGZpbGEgeSB2ZWludGljdWF0cm8gZmlsYXM6IG5vIGNhYmVuIGEgNDQgcHggZGUgYW5jaG8gZW5cbi8vIHVuIG3Dg8KzdmlsLCBhc8ODwq0gcXVlIGNyZWNlbiBlbiBBTFRPIGhhc3RhIGxvcyA0NCB5IHNlIHF1ZWRhbiBlc3RyZWNob3MuIExhXG4vLyB6b25hIHB1bHNhYmxlIHNpZ3VlIHNpZW5kbyBkZSA0NCBweCBlbiB2ZXJ0aWNhbCwgcXVlIGVzIGxhIGRpcmVjY2nDg8KzbiBlbiBsYVxuLy8gcXVlIGVsIHB1bGdhciBmYWxsYS4gTWlzbW8gY3JpdGVyaW8gcXVlIGxhIGVzY2FsYSBkZSBkb2xvci5cbi5zY29yZS1sZXZlbCB7XG4gIHdpZHRoOiAzOHB4O1xuICBtaW4taGVpZ2h0OiA0NHB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbWQpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICBjb2xvciB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJi5zZWxlY3RlZCB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLWFjY2VudC1zb2Z0KTtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIH1cblxuICAvLyBFbCBlc3Ryw4PCqXMgYXJ0aWN1bGFyIGVuIHJvam86IHNvbiBsYXMgZG9zIGVzY2FsYXMgaWTDg8KpbnRpY2FzIGVuIGZvcm1hLCB5XG4gIC8vIGVsIGNvbG9yIGV2aXRhIGNvbmZ1bmRpciBjdcODwqFsIHNlIGVzdMODwqEgdG9jYW5kby5cbiAgJi0tam9pbnQuc2VsZWN0ZWQge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtZGFuZ2VyKTtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1kYW5nZXItc29mdCk7XG4gICAgY29sb3I6IHZhcigtLXRmLWRhbmdlci10ZXh0KTtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxufVxuXG4uam9pbnRzLXRvZ2dsZSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogNDhweDtcbiAgbWFyZ2luLXRvcDogdmFyKC0tdGYtc3BhY2UtNSk7XG4gIHBhZGRpbmc6IDA7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmbGV4LXNocmluazogMDtcbiAgICBmb250LXNpemU6IDE1cHg7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG59XG5cbi5qb2ludHMtdG9nZ2xlLWxhYmVsIHtcbiAgZmxleDogMTtcbn1cblxuLmpvaW50cy1ib2R5IHtcbiAgcGFkZGluZy10b3A6IHZhcigtLXRmLXNwYWNlLTMpO1xufVxuXG4uZmllbGQtbGFiZWwge1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luOiB2YXIoLS10Zi1zcGFjZS01KSAwIDRweDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUteHMpO1xuICBmb250LXdlaWdodDogNjAwO1xuICBsZXR0ZXItc3BhY2luZzogMC4wNGVtO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG59XG5cbi5maWVsZC1oaW50IHtcbiAgbWFyZ2luOiAwIDAgdmFyKC0tdGYtc3BhY2UtMik7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgbGluZS1oZWlnaHQ6IDEuNDU7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbn1cblxuLmlucHV0LXdyYXBwZXIge1xuICBAaW5jbHVkZSB0Zi1pbnB1dC13cmFwcGVyO1xufVxuXG4uaW5wdXQtaWNvbiB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LWljb247XG59XG5cbi5pbnB1dC1maWVsZCB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LWZpZWxkO1xufVxuXG4uZWRpdG9yLWZvb3RlciB7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTMpO1xuICBwYWRkaW5nOiB2YXIoLS10Zi1zcGFjZS00KSB2YXIoLS10Zi1zcGFjZS01KTtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG59XG5cbi5jYW5jZWwtYnV0dG9uIHtcbiAgZmxleDogMCAwIGF1dG87XG4gIG1pbi1oZWlnaHQ6IDQ4cHg7XG4gIHBhZGRpbmc6IDAgdmFyKC0tdGYtc3BhY2UtNSk7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbWQpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG59XG5cbi5zdWJtaXQtYnV0dG9uIHtcbiAgQGluY2x1ZGUgdGYtZ3JhZGllbnQtYnV0dG9uO1xuICBmbGV4OiAxO1xufVxuIiwiLy8gQm90w4PCs24gQ1RBIGNvbiBncmFkaWVudGUgZGUgYWNlbnRvIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gZW4gfjExIHNpdGlvcyBkZVxuLy8gfjEwIHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS5cbi8vIENhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW8gc2VsZWN0b3IgeSBhw4PCsWFkZSBlbmNpbWEgc29sbyBsb1xuLy8gcXVlIHZhcsODwq1hIHBvciBsYXlvdXQgKHdpZHRoLCBoZWlnaHQsIGZvbnQtc2l6ZSwgbWFyZ2luKS5cbi8vXG4vLyBMYSBtaXRhZCBkZSBsb3Mgc2l0aW9zIG9yaWdpbmFsZXMgbm8gdGVuw4PCrWFuIHRyYW5zaWNpw4PCs24vZmVlZGJhY2sgZGUgcHVsc2FjacODwrNuXG4vLyBuaSA6Zm9jdXMtdmlzaWJsZSDDosKAwpQgZWwgbWl4aW4gbG9zIGHDg8KxYWRlIHNpZW1wcmUsIGNpZXJyYSBlc2UgaHVlY28gZGVcbi8vIGNvbnNpc3RlbmNpYSBkZSBpbnRlcmFjY2nDg8KzbiAoUFJPRFVDVC5tZDogXCJ1biBzb2xvIHBhdHLDg8KzbiBwb3IgdGlwbyBkZVxuLy8gY29tcG9uZW50ZVwiKSBlbiB2ZXogZGUgcGVycGV0dWFyIGxhIHZhcmlhY2nDg8KzbiBhY2NpZGVudGFsLlxuQG1peGluIHRmLWdyYWRpZW50LWJ1dHRvbigkcmFkaXVzOiAxMnB4KSB7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LWdyYWRpZW50KTtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudC1jb250cmFzdCk7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSwgb3BhY2l0eSAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45Nyk7XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjQ1O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLXRleHQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLy8gQm90w4PCs24gZGUgaGVhZGVyIHF1ZSBlcyBzb2xvIHVuIGljb25vIMOiwoDClCBtaXNtbyBsb29rIFwiZW52dWVsdG9cIiBxdWUgeWEgdXNhIGxhXG4vLyBhcHAgZGUgY29uc3VtaWRvciBlbiBzdXMgdG9vbGJhcnMgKHBhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy8uLi4vZGlldHMvXG4vLyBjb21wb25lbnRzL3Rvb2xiYXItY2FsZW5kYXI6IGZvbmRvICsgYm9yZGVyLXJhZGl1cyArIGNhamEgZmlqYSA0NHg0NCwgZW5cbi8vIHZleiBkZWwgaW9uLWJ1dHRvbiBwbGFuby90cmFuc3BhcmVudGUgcXVlIHRlbsODwq1hIGNhZGEgcGFudGFsbGEgZGUgdHJhaW5lcnNcbi8vIGhhc3RhIGFob3JhKS4gVG9rZW5lYWRvIGEgbGEgcGFsZXRhIGRlIGVzdGEgYXBwIGVuIHZleiBkZSByZXBldGlyIGxvc1xuLy8gcmdiYSgyNTUsMjU1LDI1NSwuLi4pIHN1ZWx0b3MgZGVsIG9yaWdpbmFsLlxuLy9cbi8vIFNpcnZlIHRhbnRvIHBhcmEgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCI+ICh1c2EgbGFzIENTUyBjdXN0b20gcHJvcGVydGllc1xuLy8gZGUgSW9uaWMpIGNvbW8gcGFyYSB1biA8YnV0dG9uPiBuYXRpdm8gKHVzYSBsYXMgcHJvcGllZGFkZXMgcGxhbmFzKSDDosKAwpRcbi8vIGFtYm9zIGNvZXhpc3RlbiBob3kgZW4gdHJhaW5lcnMgcGFyYSBlbCBtaXNtbyByb2wgZGUgXCJ2b2x2ZXJcIi9cImNlcnJhclwiLlxuQG1peGluIHRmLWljb24tYnV0dG9uKCRzaXplOiA0NHB4LCAkcmFkaXVzOiAxMnB4LCAkaWNvbi1zaXplOiAyMHB4KSB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcbiAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1iYWNrZ3JvdW5kLWhvdmVyOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtZm9jdXNlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1jb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICAtLWJvcmRlci1yYWRpdXM6ICN7JHJhZGl1c307XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbiAgLS1wYWRkaW5nLXRvcDogMDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMDtcblxuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6ICRyYWRpdXM7XG4gIHdpZHRoOiAkc2l6ZTtcbiAgaGVpZ2h0OiAkc2l6ZTtcbiAgbWluLXdpZHRoOiAkc2l6ZTtcbiAgbWluLWhlaWdodDogJHNpemU7XG4gIG1hcmdpbjogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCksXG4gICAgY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogJGljb24tc2l6ZTtcbiAgfVxufVxuXG4vLyBFeHBhbnNvciBpbnZpc2libGUgZGUgem9uYSBwdWxzYWJsZS5cbi8vXG4vLyBQQVJBIFFVw4PCiTogdW4gY29udHJvbCBjb21wYWN0byAodW4gaWNvbm8gZGUgMzIgcHggZW4gdW5hIGZpbGEgZGUgdGFibGEsIHVuXG4vLyBlbmxhY2UgZGUgdGV4dG8gZGUgMTYgcHgpIG5vIGxsZWdhIGEgbG9zIDQ0IHB4IHF1ZSBleGlnZSBQUk9EVUNULm1kLCB5XG4vLyBlbmdvcmRhcmxvIGRlIHZlcmRhZCBkZXNwbGF6YSB0b2RvIGxvIHF1ZSB0aWVuZSBhbHJlZGVkb3Igw6LCgMKUIGVuIHVuYSB0YWJsYVxuLy8gZGUgdmVpbnRlIGZpbGFzLCA4IHB4IHBvciBmaWxhIHNvbiBtZWRpYSBwYW50YWxsYS5cbi8vXG4vLyBFbCBwc2V1ZG9lbGVtZW50byBjcmVjZSBoYWNpYSBmdWVyYSBzaW4gb2N1cGFyIHNpdGlvIGVuIGVsIGZsdWpvLCBhc8ODwq0gcXVlXG4vLyBlbCBib3TDg8KzbiBzZSB2ZSBwZXF1ZcODwrFvIHkgc2UgcHVsc2EgZ3JhbmRlLlxuLy9cbi8vIEFWSVNPIERFIE1FRElDScODwpNOOiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBOTyB2ZSBlc3RlIHBzZXVkb2VsZW1lbnRvLCBhc8ODwq1cbi8vIHF1ZSBhbCB2ZXJpZmljYXIgaGF5IHF1ZSB1c2FyIGVsZW1lbnRGcm9tUG9pbnQgY29uIGVsIGVsZW1lbnRvIGRlbnRybyBkZWxcbi8vIHZpZXdwb3J0LiBBZGVtw4PCoXMgZWwgaGl0LXRlc3QgZGV2dWVsdmUgMiBweCBtZW5vcyBxdWUgbGEgY2FqYSBkZWNsYXJhZGFcbi8vIChjb21wcm9iYWRvOiAtNHB4IGRhIDQyLCAtNnB4IGRhIDQ2KSwgYXPDg8KtIHF1ZSB1biA0MiBtZWRpZG8gc29uIDQ0IHJlYWxlcy5cbi8vXG4vLyAkZ3JvdzogY3XDg8KhbnRvIGNyZWNlIHBvciBjYWRhIGxhZG8uIDRweCBsbGV2YSB1biBjb250cm9sIGRlIDM2IHB4IGEgNDQuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIoJGdyb3c6IDRweCkge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IC0jeyRncm93fTtcbiAgfVxufVxuXG4vLyBWYXJpYW50ZSBxdWUgc29sbyBjcmVjZSBlbiBWRVJUSUNBTC4gUGFyYSBjb250cm9sZXMgZW4gZmlsYSBkb25kZSBlbFxuLy8gZXhwYW5zb3IgaG9yaXpvbnRhbCBzZSBzb2xhcGFyw4PCrWEgY29uIGVsIGRlIGFsIGxhZG8geSByb2JhcsODwq1hIHN1cyB0b3F1ZXMuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIteSgkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC0jeyRncm93fTtcbiAgICBib3R0b206IC0jeyRncm93fTtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICB9XG59XG4iLCIvLyBGaWxhIGRlIGlucHV0IGNvbiBpY29ubyAod3JhcHBlciArIGljb25vICsgY2FtcG8pIMOiwoDClCByZXBldGlkYSBlbiA0IHDDg8KhZ2luYXNcbi8vIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuIEVsIGZvbmRvXG4vLyBkZWwgd3JhcHBlciBlcyBlbCDDg8K6bmljbyB2YWxvciBxdWUgdmFyw4PCrWEgcG9yIHDDg8KhZ2luYSAoc3VwZXJmaWNpZSAxIG8gMiBzZWfDg8K6blxuLy8gY29udGV4dG8gdmlzdWFsKSwgZGUgYWjDg8KtIGVsIHBhcsODwqFtZXRybzsgdGFtYcODwrFvIGRlIGZ1ZW50ZS9hbHRvL21hcmdlbiBzZVxuLy8gZGVqYW4gZnVlcmEgZGVsIG1peGluIHBvcnF1ZSBjYWRhIHDDg8KhZ2luYSBsb3MgZmlqYSBzZWfDg8K6biBzdSBwcm9waW8gbGF5b3V0LlxuQG1peGluIHRmLWlucHV0LXdyYXBwZXIoJGJnOiB2YXIoLS10Zi1zdXJmYWNlLTEpKSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgYmFja2dyb3VuZDogJGJnO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMCAxNHB4O1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6Zm9jdXMtd2l0aGluIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIH1cbn1cblxuQG1peGluIHRmLWlucHV0LWljb24ge1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG5AbWl4aW4gdGYtaW5wdXQtZmllbGQge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGhlaWdodDogMTAwJTtcblxuICAmOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));

// Los ceros no se mandan: el backend los descarta igualmente (la ausencia ya
// significa "no lo trabaja"), y enviarlos sería mandar dieciséis entradas
// para guardar tres.
function toEntries(values) {
  return [...values.entries()].filter(([, score]) => score > 0).map(([name, score]) => ({
    name,
    score
  }));
}

/***/ }),

/***/ 80354:
/*!****************************************************************************!*\
  !*** ./src/app/features/exercise-scores/exercise-scores-routing.module.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExerciseScoresPageRoutingModule: () => (/* binding */ ExerciseScoresPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _exercise_scores_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./exercise-scores.page */ 16996);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _ExerciseScoresPageRoutingModule;




const routes = [{
  path: '',
  component: _exercise_scores_page__WEBPACK_IMPORTED_MODULE_1__.ExerciseScoresPage
}];
class ExerciseScoresPageRoutingModule {}
_ExerciseScoresPageRoutingModule = ExerciseScoresPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ExerciseScoresPageRoutingModule, "\u0275fac", function ExerciseScoresPageRoutingModule_Factory(t) {
  return new (t || _ExerciseScoresPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ExerciseScoresPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _ExerciseScoresPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ExerciseScoresPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](ExerciseScoresPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 51243:
/*!********************************************************************!*\
  !*** ./src/app/features/exercise-scores/exercise-scores.module.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExerciseScoresPageModule: () => (/* binding */ ExerciseScoresPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _exercise_scores_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./exercise-scores-routing.module */ 80354);
/* harmony import */ var _exercise_scores_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./exercise-scores.page */ 16996);
/* harmony import */ var _components_score_editor_modal_score_editor_modal_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/score-editor-modal/score-editor-modal.component */ 75636);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 69717);

var _ExerciseScoresPageModule;





class ExerciseScoresPageModule {}
_ExerciseScoresPageModule = ExerciseScoresPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ExerciseScoresPageModule, "\u0275fac", function ExerciseScoresPageModule_Factory(t) {
  return new (t || _ExerciseScoresPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ExerciseScoresPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineNgModule"]({
  type: _ExerciseScoresPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ExerciseScoresPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _exercise_scores_routing_module__WEBPACK_IMPORTED_MODULE_2__.ExerciseScoresPageRoutingModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵsetNgModuleScope"](ExerciseScoresPageModule, {
    declarations: [_exercise_scores_page__WEBPACK_IMPORTED_MODULE_3__.ExerciseScoresPage, _components_score_editor_modal_score_editor_modal_component__WEBPACK_IMPORTED_MODULE_4__.ScoreEditorModalComponent],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _exercise_scores_routing_module__WEBPACK_IMPORTED_MODULE_2__.ExerciseScoresPageRoutingModule]
  });
})();

/***/ }),

/***/ 16996:
/*!******************************************************************!*\
  !*** ./src/app/features/exercise-scores/exercise-scores.page.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ExerciseScoresPage: () => (/* binding */ ExerciseScoresPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_core_constants_exercise_score__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/constants/exercise-score */ 84316);
/* harmony import */ var _components_score_editor_modal_score_editor_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/score-editor-modal/score-editor-modal.component */ 75636);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _services_exercise_scores_api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services/exercise-scores-api.service */ 72766);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _packages_shared_ui_src_app_shared_components_search_exercises_search_exercises_page__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../packages/shared-ui/src/app/shared/components/search-exercises/search-exercises.page */ 93305);


var _ExerciseScoresPage;









function ExerciseScoresPage_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-header", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4)(5, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ExerciseScoresPage_ng_container_0_Template_button_click_5_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r3);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r2.closePicker());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](6, "ion-icon", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "div", 7)(8, "h1", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9, "Elige un ejercicio");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](10, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](11, "app-search-exercises", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("exerciseSelected", function ExerciseScoresPage_ng_container_0_Template_app_search_exercises_exerciseSelected_11_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r3);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r4.onExerciseSelected($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
  }
}
function ExerciseScoresPage_ng_container_1_div_15_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](0, "div", 20);
  }
}
const _c0 = function () {
  return [1, 2, 3];
};
function ExerciseScoresPage_ng_container_1_div_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, ExerciseScoresPage_ng_container_1_div_15_div_1_Template, 1, 0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵpureFunction0"](1, _c0));
  }
}
function ExerciseScoresPage_ng_container_1_div_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "ion-icon", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "No se pudieron cargar tus puntuaciones");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ExerciseScoresPage_ng_container_1_div_16_Template_button_click_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r11);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r10.load());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5, "Reintentar");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
}
function ExerciseScoresPage_ng_container_1_ng_container_17_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "ion-icon", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](3, "Todav\u00EDa no has puntuado ning\u00FAn ejercicio");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](5, " Empieza por los que m\u00E1s usas. Con cuatro o cinco puntuados el planificador ya te dice c\u00F3mo queda repartida una sesi\u00F3n. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "button", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ExerciseScoresPage_ng_container_1_ng_container_17_div_1_Template_button_click_6_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r15);
      const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r14.openPicker());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](7, "Puntuar un ejercicio");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
  }
}
function ExerciseScoresPage_ng_container_1_ng_container_17_ng_container_2_div_7_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](row_r18.topMuscles);
  }
}
function ExerciseScoresPage_ng_container_1_ng_container_17_ng_container_2_div_7_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "span", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](1, "ion-icon", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const row_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"](" ", row_r18.hardestJoint, " ");
  }
}
function ExerciseScoresPage_ng_container_1_ng_container_17_ng_container_2_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "div", 33)(1, "div", 34)(2, "div", 35)(3, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](5, ExerciseScoresPage_ng_container_1_ng_container_17_ng_container_2_div_7_span_5_Template, 2, 1, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](6, ExerciseScoresPage_ng_container_1_ng_container_17_ng_container_2_div_7_span_6_Template, 3, 1, "span", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](7, "div", 39)(8, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ExerciseScoresPage_ng_container_1_ng_container_17_ng_container_2_div_7_Template_button_click_8_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r24);
      const row_r18 = restoredCtx.$implicit;
      const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r23.editRow(row_r18));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](9, "Editar");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](10, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ExerciseScoresPage_ng_container_1_ng_container_17_ng_container_2_div_7_Template_button_click_10_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r24);
      const row_r18 = restoredCtx.$implicit;
      const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](4);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r25.confirmRemove(row_r18));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](11, "ion-icon", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const row_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate"](row_r18.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", row_r18.topMuscles);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", row_r18.hardestJoint);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵattribute"]("aria-label", "Borrar la puntuaci\u00F3n de " + row_r18.name);
  }
}
function ExerciseScoresPage_ng_container_1_ng_container_17_ng_container_2_p_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](0, "p", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](1, " Ning\u00FAn ejercicio puntuado coincide con la b\u00FAsqueda. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
  }
}
function ExerciseScoresPage_ng_container_1_ng_container_17_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r27 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "div", 26)(2, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](3, "ion-icon", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](4, "input", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("ngModelChange", function ExerciseScoresPage_ng_container_1_ng_container_17_ng_container_2_Template_input_ngModelChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r27);
      const ctx_r26 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r26.searchQuery = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](5, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](7, ExerciseScoresPage_ng_container_1_ng_container_17_ng_container_2_div_7_Template, 12, 4, "div", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](8, ExerciseScoresPage_ng_container_1_ng_container_17_ng_container_2_p_8_Template, 2, 0, "p", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngModel", ctx_r13.searchQuery);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtextInterpolate1"]("", ctx_r13.rows.length, " puntuados");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngForOf", ctx_r13.filteredRows)("ngForTrackBy", ctx_r13.trackByRow);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r13.filteredRows.length);
  }
}
function ExerciseScoresPage_ng_container_1_ng_container_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, ExerciseScoresPage_ng_container_1_ng_container_17_div_1_Template, 8, 0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](2, ExerciseScoresPage_ng_container_1_ng_container_17_ng_container_2_Template, 9, 5, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx_r7.rows.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r7.rows.length);
  }
}
function ExerciseScoresPage_ng_container_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r29 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](1, "ion-header", 1)(2, "div", 2)(3, "div", 3)(4, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](5, "ion-menu-button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](6, "div", 7)(7, "h1", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](8, "Puntuaciones");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](9, "div", 9)(10, "button", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵlistener"]("click", function ExerciseScoresPage_ng_container_1_Template_button_click_10_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵrestoreView"](_r29);
      const ctx_r28 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵresetView"](ctx_r28.openPicker());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelement"](11, "ion-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementStart"](12, "ion-content", 14)(13, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtext"](14, " Cu\u00E1nto estimula cada ejercicio a cada m\u00FAsculo y cu\u00E1nto castiga a cada articulaci\u00F3n, seg\u00FAn tu criterio. El planificador lo suma mientras montas una sesi\u00F3n. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](15, ExerciseScoresPage_ng_container_1_div_15_Template, 2, 2, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](16, ExerciseScoresPage_ng_container_1_div_16_Template, 6, 0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](17, ExerciseScoresPage_ng_container_1_ng_container_17_Template, 3, 2, "ng-container", 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r1.state === "loading");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r1.state === "error");
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx_r1.state === "loaded");
  }
}
/**
 * Movimiento 6 Coach Pro — cuánto estimula cada ejercicio a cada músculo
 * (IEM) y cuánto castiga a cada articulación (IEA), según ESTE entrenador.
 *
 * Vive en Mi método y no en Biblioteca: la biblioteca es el material que le
 * da al cliente, y esto es el criterio con el que lo programa. Es
 * literalmente la definición de "mi método".
 *
 * La pantalla lista lo YA puntuado en vez de los 200 ejercicios del
 * catálogo: puntuar es un trabajo largo que se hace poco a poco, y lo que
 * hace falta ver al volver es por dónde iba.
 */
class ExerciseScoresPage {
  constructor(exerciseScoresApi, ionicUtilService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "exerciseScoresApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "state", 'loading');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "rows", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "catalog", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "searchQuery", '');
    // El buscador de ejercicios sale como panel, no como pantalla aparte: se
    // usa para puntuar uno y volver, no para navegar a ningún sitio.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "showPicker", false);
    this.exerciseScoresApi = exerciseScoresApi;
    this.ionicUtilService = ionicUtilService;
  }
  ngOnInit() {
    this.load();
  }
  // Mismo bug de caché de ion-router-outlet que el resto de listas de la
  // app: sin esto, volver tras puntuar desde otro sitio mostraría el
  // estado anterior.
  ionViewWillEnter() {
    if (this.catalog) this.load();
  }
  load() {
    this.state = 'loading';
    this.exerciseScoresApi.getCatalog().subscribe({
      next: catalog => {
        this.catalog = catalog;
        this.loadScores();
      },
      error: () => {
        this.state = 'error';
      }
    });
  }
  loadScores() {
    this.exerciseScoresApi.getMine().subscribe({
      next: scores => {
        this.rows = (scores || []).map(score => this.toRow(score));
        this.state = 'loaded';
      },
      error: () => {
        this.state = 'error';
      }
    });
  }
  toRow(score) {
    const topMuscles = [...(score.muscleScores || [])].sort((a, b) => b.score - a.score).slice(0, 3).map(entry => entry.name).join(' · ');
    // Solo se nombra la articulación cuando llega al nivel que obliga a
    // dosificar: decir "Codo 1" en cada fila sería ruido.
    const hardest = [...(score.jointScores || [])].sort((a, b) => b.score - a.score)[0];
    const hardestJoint = hardest && hardest.score >= 2 ? hardest.name : '';
    return {
      score,
      // El nombre viene poblado por Mongoose cuando el ejercicio existe. Si
      // se borró del catálogo, la puntuación se queda huérfana y se dice.
      name: score.exerciseId?.name || 'Ejercicio borrado',
      topMuscles,
      hardestJoint
    };
  }
  get filteredRows() {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.rows;
    return this.rows.filter(row => row.name.toLowerCase().includes(query));
  }
  // --- Puntuar ---
  openPicker() {
    this.showPicker = true;
  }
  closePicker() {
    this.showPicker = false;
  }
  onExerciseSelected(exercise) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      _this.showPicker = false;
      yield _this.openEditor(exercise._id, exercise.name, null);
    })();
  }
  editRow(row) {
    var _this2 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const exerciseId = row.score.exerciseId?._id || String(row.score.exerciseId);
      yield _this2.openEditor(exerciseId, row.name, row.score);
    })();
  }
  openEditor(exerciseId, exerciseName, existing) {
    var _this3 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const dismissed = yield _this3.ionicUtilService.showModal({
        component: _components_score_editor_modal_score_editor_modal_component__WEBPACK_IMPORTED_MODULE_3__.ScoreEditorModalComponent,
        componentProps: {
          exerciseId,
          exerciseName,
          existing,
          catalog: _this3.catalog
        },
        cssClass: 'tf-panel-modal'
      });
      // El modal guarda por su cuenta y devuelve true si algo cambió: la lista
      // solo se recarga entonces, no cada vez que se cierra.
      if (dismissed?.data) _this3.loadScores();
    })();
  }
  confirmRemove(row) {
    var _this4 = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this4.ionicUtilService.showAlert({
        header: 'Quitar puntuación',
        message: `¿Seguro que quieres borrar tu puntuación de "${row.name}"? El ejercicio sigue en la biblioteca.`,
        buttons: [{
          text: 'Volver',
          role: 'cancel'
        }, {
          text: 'Borrar',
          cssClass: 'alert-button-danger',
          handler: () => _this4.remove(row)
        }]
      });
    })();
  }
  remove(row) {
    const exerciseId = row.score.exerciseId?._id || String(row.score.exerciseId);
    this.exerciseScoresApi.remove(exerciseId).subscribe({
      next: () => this.loadScores(),
      error: () => this.ionicUtilService.showErrorToast('No se pudo borrar la puntuación', 'Error', 2500)
    });
  }
  scoreOf(row, muscle) {
    return (0,src_app_core_constants_exercise_score__WEBPACK_IMPORTED_MODULE_2__.scoreFor)(row.score.muscleScores, muscle);
  }
  trackByRow(_index, row) {
    return String(row.score._id || row.name);
  }
}
_ExerciseScoresPage = ExerciseScoresPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ExerciseScoresPage, "\u0275fac", function ExerciseScoresPage_Factory(t) {
  return new (t || _ExerciseScoresPage)(_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](_services_exercise_scores_api_service__WEBPACK_IMPORTED_MODULE_4__.ExerciseScoresApiService), _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_5__.IonicUtilService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(ExerciseScoresPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineComponent"]({
  type: _ExerciseScoresPage,
  selectors: [["app-exercise-scores"]],
  decls: 2,
  vars: 2,
  consts: [[4, "ngIf"], [1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["type", "button", "aria-label", "Volver", 1, "tf-page-header__back-button", 3, "click"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], ["mode", "library", 3, "exerciseSelected"], ["aria-label", "Abrir men\u00FA de navegaci\u00F3n", 1, "tf-page-header__back-button"], ["type", "button", "aria-label", "Puntuar un ejercicio", 1, "tf-page-header__back-button", 3, "click"], ["name", "add-outline"], [1, "scores-content"], [1, "page-hint"], ["class", "page-skeleton", 4, "ngIf"], ["class", "state-message", 4, "ngIf"], [1, "page-skeleton"], ["class", "skeleton-block", 4, "ngFor", "ngForOf"], [1, "skeleton-block"], [1, "state-message"], ["name", "cloud-offline-outline"], ["type", "button", 1, "retry-button", 3, "click"], ["name", "analytics-outline"], ["type", "button", 1, "invite-cta", 3, "click"], [1, "search-bar"], [1, "search-input-wrapper"], ["name", "search-outline", 1, "search-icon"], ["type", "text", "placeholder", "Buscar entre los que ya has puntuado", 1, "search-input", 3, "ngModel", "ngModelChange"], [1, "scored-count"], ["class", "score-card", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "empty-hint", 4, "ngIf"], [1, "score-card"], [1, "score-card-main"], [1, "score-card-info"], [1, "score-card-name"], ["class", "score-card-muscles", 4, "ngIf"], ["class", "joint-warning", 4, "ngIf"], [1, "score-card-actions"], ["type", "button", 1, "row-action", 3, "click"], ["type", "button", 1, "row-action", "row-action--danger", 3, "click"], ["name", "trash-outline"], [1, "score-card-muscles"], [1, "joint-warning"], ["name", "warning-outline", "aria-hidden", "true"], [1, "empty-hint"]],
  template: function ExerciseScoresPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](0, ExerciseScoresPage_ng_container_0_Template, 12, 0, "ng-container", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵtemplate"](1, ExerciseScoresPage_ng_container_1_Template, 18, 3, "ng-container", 0);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", ctx.showPicker);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵproperty"]("ngIf", !ctx.showPicker);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_9__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_10__.IonMenuButton, _packages_shared_ui_src_app_shared_components_search_exercises_search_exercises_page__WEBPACK_IMPORTED_MODULE_6__.SearchExercisesPage],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n.scores-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 20px;\n  --padding-end: 20px;\n  --padding-top: 4px;\n  --padding-bottom: 32px;\n}\n\n.page-hint[_ngcontent-%COMP%] {\n  margin: 0 0 var(--tf-space-5);\n  color: var(--tf-text-muted);\n  font-size: var(--tf-font-size-sm);\n  line-height: 1.5;\n}\n\n.page-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-2);\n}\n\n.skeleton-block[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n  height: 62px;\n  border-radius: var(--tf-radius-md);\n}\n.skeleton-block[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n\n.state-message[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: var(--tf-space-2);\n  padding: var(--tf-space-8) var(--tf-space-4);\n  color: var(--tf-text-muted);\n}\n.state-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 44px;\n  color: var(--tf-text-faint);\n}\n.state-message[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-md);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n.state-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: var(--tf-font-size-sm);\n  line-height: 1.5;\n  max-width: 42ch;\n}\n\n.retry-button[_ngcontent-%COMP%], .invite-cta[_ngcontent-%COMP%] {\n  min-height: 44px;\n  margin-top: var(--tf-space-3);\n  padding: 0 var(--tf-space-5);\n  background: var(--tf-surface-3);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-md);\n  color: var(--tf-text);\n  font-family: inherit;\n  font-weight: 600;\n  cursor: pointer;\n}\n.retry-button[_ngcontent-%COMP%]:focus-visible, .invite-cta[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.search-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-3);\n  margin-bottom: var(--tf-space-4);\n  flex-wrap: wrap;\n}\n\n.search-input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n  flex: 1;\n  min-width: 200px;\n}\n.search-input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.search-icon[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  flex-shrink: 0;\n}\n\n.search-input[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n}\n.search-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.scored-count[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n  color: var(--tf-text-muted);\n}\n\n.score-card[_ngcontent-%COMP%] {\n  margin-bottom: var(--tf-space-2);\n  padding: var(--tf-space-3) var(--tf-space-4);\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-md);\n}\n\n.score-card-main[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-3);\n  flex-wrap: wrap;\n}\n\n.score-card-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 160px;\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n\n.score-card-name[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.score-card-muscles[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-xs);\n  color: var(--tf-text-muted);\n}\n\n.joint-warning[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  flex-shrink: 0;\n  padding: 2px 8px;\n  border-radius: var(--tf-radius-pill);\n  background: var(--tf-danger-soft);\n  color: var(--tf-danger-text);\n  font-size: var(--tf-font-size-xs);\n  font-weight: 600;\n}\n.joint-warning[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n\n.score-card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  flex-shrink: 0;\n}\n\n.row-action[_ngcontent-%COMP%] {\n  min-height: 36px;\n  position: relative;\n  padding: 0 var(--tf-space-3);\n  background: var(--tf-surface-5);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: var(--tf-radius-md);\n  color: var(--tf-text);\n  font-family: inherit;\n  font-size: var(--tf-font-size-xs);\n  font-weight: 700;\n  cursor: pointer;\n  position: relative;\n}\n.row-action[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  inset: -4px;\n}\n.row-action[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n.row-action--danger[_ngcontent-%COMP%] {\n  padding: 0 9px;\n  color: var(--tf-danger-text);\n  border-color: var(--tf-danger-border);\n}\n.row-action--danger[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 15px;\n}\n\n.empty-hint[_ngcontent-%COMP%] {\n  margin: var(--tf-space-4) 0 0;\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-muted);\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvZXhlcmNpc2Utc2NvcmVzL2V4ZXJjaXNlLXNjb3Jlcy5wYWdlLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX2lucHV0cy5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19idXR0b25zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJBO0VBQ0U7SUFDRSwyQkFBQTtFQ3hCRjtBQUNGO0FBQUE7RUFDRSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0FBRUY7O0FBQ0E7RUFDRSw2QkFBQTtFQUNBLDJCQUFBO0VBQ0EsaUNBQUE7RUFDQSxnQkFBQTtBQUVGOztBQUNBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esc0JBQUE7QUFFRjs7QUFDQTtFRHBCRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsK0JBQUE7RUNvQkEsWUFBQTtFQUNBLGtDQUFBO0FBSUY7QUR2QkU7RUFDRSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsNEJBQUE7RUFDQSwrRUFBQTtFQUNBLG1DQUFBO0FDeUJKO0FEdEJFO0VBQ0U7SUFDRSxlQUFBO0VDd0JKO0FBQ0Y7O0FBZEE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSw0Q0FBQTtFQUNBLDJCQUFBO0FBaUJGO0FBZkU7RUFDRSxlQUFBO0VBQ0EsMkJBQUE7QUFpQko7QUFkRTtFQUNFLFNBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUFnQko7QUFiRTtFQUNFLFNBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQWVKOztBQVhBOztFQUVFLGdCQUFBO0VBQ0EsNkJBQUE7RUFDQSw0QkFBQTtFQUNBLCtCQUFBO0VBQ0EseUNBQUE7RUFDQSxrQ0FBQTtFQUNBLHFCQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7QUFjRjtBQVpFOztFQUNFLG1DQUFBO0VBQ0EsbUJBQUE7QUFlSjs7QUFYQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZ0NBQUE7RUFDQSxlQUFBO0FBY0Y7O0FBWEE7RUNqRkUsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLCtCQUoyQjtFQUszQix5Q0FBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGlEQUFBO0VENEVBLE9BQUE7RUFDQSxnQkFBQTtBQXFCRjtBQ2hHRTtFQUNFLDhCQUFBO0FEa0dKOztBQXJCQTtFQ3hFRSwyQkFBQTtFQUNBLGNBQUE7QURpR0Y7O0FBdEJBO0VDdkVFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0Esb0JBQUE7RUFDQSxZQUFBO0FEaUdGO0FDL0ZFO0VBQ0UsMkJBQUE7QURpR0o7O0FBaENBO0VBQ0UsY0FBQTtFQUNBLGlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSwyQkFBQTtBQW1DRjs7QUEvQkE7RUFDRSxnQ0FBQTtFQUNBLDRDQUFBO0VBQ0EsK0JBQUE7RUFDQSxrQ0FBQTtFQUNBLGtDQUFBO0FBa0NGOztBQS9CQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtBQWtDRjs7QUEvQkE7RUFDRSxPQUFBO0VBQ0EsZ0JBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0FBa0NGOztBQS9CQTtFQUNFLGlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtBQWtDRjs7QUE3QkE7RUFDRSxpQ0FBQTtFQUNBLDJCQUFBO0FBZ0NGOztBQTdCQTtFQUNFLG9CQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0Esb0NBQUE7RUFDQSxpQ0FBQTtFQUNBLDRCQUFBO0VBQ0EsaUNBQUE7RUFDQSxnQkFBQTtBQWdDRjtBQTlCRTtFQUNFLGVBQUE7QUFnQ0o7O0FBNUJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGNBQUE7QUErQkY7O0FBNUJBO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLDRCQUFBO0VBQ0EsK0JBQUE7RUFDQSx5Q0FBQTtFQUNBLGtDQUFBO0VBQ0EscUJBQUE7RUFDQSxvQkFBQTtFQUNBLGlDQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VFOUVBLGtCQUFBO0FGOEdGO0FFNUdFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtBRjhHSjtBQWhDRTtFQUNFLG1DQUFBO0VBQ0EsbUJBQUE7QUFrQ0o7QUEvQkU7RUFDRSxjQUFBO0VBQ0EsNEJBQUE7RUFDQSxxQ0FBQTtBQWlDSjtBQS9CSTtFQUNFLGVBQUE7QUFpQ047O0FBNUJBO0VBQ0UsNkJBQUE7RUFDQSxpQ0FBQTtFQUNBLDJCQUFBO0FBK0JGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gU2tlbGV0b24gZGUgY2FyZ2EgY29uIGJhcnJpZG8gZGUgc2hpbW1lciDDosKAwpQgbWlzbW8gYmxvcXVlIHJlcGV0aWRvIGxpdGVyYWxtZW50ZVxuLy8gZW4gfjEwIHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS5cbi8vIENhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW8gc2VsZWN0b3IgeSBhw4PCsWFkZSBlbmNpbWEgc29sbyBsb1xuLy8gcXVlIHZhcsODwq1hIChib3JkZXItcmFkaXVzLCBoZWlnaHQsIHdpZHRoLCB2YXJpYW50ZXMgY29uIG5vbWJyZSkuXG5AbWl4aW4gdGYtc2tlbGV0b24tc2hpbW1lciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcblxuICAmOjphZnRlciB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGluc2V0OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCB0cmFuc3BhcmVudCwgdmFyKC0tdGYtc2hpbW1lciksIHRyYW5zcGFyZW50KTtcbiAgICBhbmltYXRpb246IHRmLXNoaW1tZXIgMS40cyBpbmZpbml0ZTtcbiAgfVxuXG4gIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgJjo6YWZ0ZXIge1xuICAgICAgYW5pbWF0aW9uOiBub25lO1xuICAgIH1cbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHRmLXNoaW1tZXIge1xuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMTAwJSk7XG4gIH1cbn1cbiIsIkBpbXBvcnQgJy4uLy4uLy4uL3RoZW1lL2J1dHRvbnMnO1xuQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvc2tlbGV0b24nO1xuQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvaW5wdXRzJztcblxuLnNjb3Jlcy1jb250ZW50IHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1iZyk7XG4gIC0tcGFkZGluZy1zdGFydDogMjBweDtcbiAgLS1wYWRkaW5nLWVuZDogMjBweDtcbiAgLS1wYWRkaW5nLXRvcDogNHB4O1xuICAtLXBhZGRpbmctYm90dG9tOiAzMnB4O1xufVxuXG4ucGFnZS1oaW50IHtcbiAgbWFyZ2luOiAwIDAgdmFyKC0tdGYtc3BhY2UtNSk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBsaW5lLWhlaWdodDogMS41O1xufVxuXG4ucGFnZS1za2VsZXRvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG59XG5cbi5za2VsZXRvbi1ibG9jayB7XG4gIEBpbmNsdWRlIHRmLXNrZWxldG9uLXNoaW1tZXI7XG4gIGhlaWdodDogNjJweDtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLW1kKTtcbn1cblxuLnN0YXRlLW1lc3NhZ2Uge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTgpIHZhcigtLXRmLXNwYWNlLTQpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogNDRweDtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dC1mYWludCk7XG4gIH1cblxuICBoMiB7XG4gICAgbWFyZ2luOiAwO1xuICAgIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLW1kKTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgfVxuXG4gIHAge1xuICAgIG1hcmdpbjogMDtcbiAgICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gICAgbGluZS1oZWlnaHQ6IDEuNTtcbiAgICBtYXgtd2lkdGg6IDQyY2g7XG4gIH1cbn1cblxuLnJldHJ5LWJ1dHRvbixcbi5pbnZpdGUtY3RhIHtcbiAgbWluLWhlaWdodDogNDRweDtcbiAgbWFyZ2luLXRvcDogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIHBhZGRpbmc6IDAgdmFyKC0tdGYtc3BhY2UtNSk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbWQpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG59XG5cbi5zZWFyY2gtYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS0zKTtcbiAgbWFyZ2luLWJvdHRvbTogdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLnNlYXJjaC1pbnB1dC13cmFwcGVyIHtcbiAgQGluY2x1ZGUgdGYtaW5wdXQtd3JhcHBlcjtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAyMDBweDtcbn1cblxuLnNlYXJjaC1pY29uIHtcbiAgQGluY2x1ZGUgdGYtaW5wdXQtaWNvbjtcbn1cblxuLnNlYXJjaC1pbnB1dCB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LWZpZWxkO1xufVxuXG4uc2NvcmVkLWNvdW50IHtcbiAgZmxleC1zaHJpbms6IDA7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xufVxuXG4vLyAtLS0gRmljaGFzIC0tLVxuLnNjb3JlLWNhcmQge1xuICBtYXJnaW4tYm90dG9tOiB2YXIoLS10Zi1zcGFjZS0yKTtcbiAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtMykgdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1tZCk7XG59XG5cbi5zY29yZS1jYXJkLW1haW4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTMpO1xuICBmbGV4LXdyYXA6IHdyYXA7XG59XG5cbi5zY29yZS1jYXJkLWluZm8ge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDE2MHB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDJweDtcbn1cblxuLnNjb3JlLWNhcmQtbmFtZSB7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xufVxuXG4vLyBMb3MgdHJlcyBtw4PCunNjdWxvcyBxdWUgbcODwqFzIHRyYWJhamE6IGlkZW50aWZpY2FuIGVsIGVqZXJjaWNpbyBkZSB1biB2aXN0YXpvXG4vLyBzaW4gZGVzcGxlZ2FyIGxvcyBkaWVjaXPDg8KpaXMuXG4uc2NvcmUtY2FyZC1tdXNjbGVzIHtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUteHMpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG59XG5cbi5qb2ludC13YXJuaW5nIHtcbiAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNHB4O1xuICBmbGV4LXNocmluazogMDtcbiAgcGFkZGluZzogMnB4IDhweDtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLXBpbGwpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1kYW5nZXItc29mdCk7XG4gIGNvbG9yOiB2YXIoLS10Zi1kYW5nZXItdGV4dCk7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXhzKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxM3B4O1xuICB9XG59XG5cbi5zY29yZS1jYXJkLWFjdGlvbnMge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDZweDtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbi5yb3ctYWN0aW9uIHtcbiAgbWluLWhlaWdodDogMzZweDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiAwIHZhcigtLXRmLXNwYWNlLTMpO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTUpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLW1kKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUteHMpO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG5cbiAgLy8gRXhwYW5zb3IgaW52aXNpYmxlIGhhc3RhIDQ0cHgsIG1pc21vIHBhdHLDg8KzbiBxdWUgZWwgcmVzdG8gZGUgbGEgYXBwLlxuICBAaW5jbHVkZSB0Zi10b3VjaC1leHBhbmRlcjtcblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cblxuICAmLS1kYW5nZXIge1xuICAgIHBhZGRpbmc6IDAgOXB4O1xuICAgIGNvbG9yOiB2YXIoLS10Zi1kYW5nZXItdGV4dCk7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1kYW5nZXItYm9yZGVyKTtcblxuICAgIGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMTVweDtcbiAgICB9XG4gIH1cbn1cblxuLmVtcHR5LWhpbnQge1xuICBtYXJnaW46IHZhcigtLXRmLXNwYWNlLTQpIDAgMDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG59XG4iLCIvLyBGaWxhIGRlIGlucHV0IGNvbiBpY29ubyAod3JhcHBlciArIGljb25vICsgY2FtcG8pIMOiwoDClCByZXBldGlkYSBlbiA0IHDDg8KhZ2luYXNcbi8vIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuIEVsIGZvbmRvXG4vLyBkZWwgd3JhcHBlciBlcyBlbCDDg8K6bmljbyB2YWxvciBxdWUgdmFyw4PCrWEgcG9yIHDDg8KhZ2luYSAoc3VwZXJmaWNpZSAxIG8gMiBzZWfDg8K6blxuLy8gY29udGV4dG8gdmlzdWFsKSwgZGUgYWjDg8KtIGVsIHBhcsODwqFtZXRybzsgdGFtYcODwrFvIGRlIGZ1ZW50ZS9hbHRvL21hcmdlbiBzZVxuLy8gZGVqYW4gZnVlcmEgZGVsIG1peGluIHBvcnF1ZSBjYWRhIHDDg8KhZ2luYSBsb3MgZmlqYSBzZWfDg8K6biBzdSBwcm9waW8gbGF5b3V0LlxuQG1peGluIHRmLWlucHV0LXdyYXBwZXIoJGJnOiB2YXIoLS10Zi1zdXJmYWNlLTEpKSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTBweDtcbiAgYmFja2dyb3VuZDogJGJnO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgcGFkZGluZzogMCAxNHB4O1xuICB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6Zm9jdXMtd2l0aGluIHtcbiAgICBib3JkZXItY29sb3I6IHZhcigtLXRmLWFjY2VudCk7XG4gIH1cbn1cblxuQG1peGluIHRmLWlucHV0LWljb24ge1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG5AbWl4aW4gdGYtaW5wdXQtZmllbGQge1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIGhlaWdodDogMTAwJTtcblxuICAmOjpwbGFjZWhvbGRlciB7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICB9XG59XG4iLCIvLyBCb3TDg8KzbiBDVEEgY29uIGdyYWRpZW50ZSBkZSBhY2VudG8gw6LCgMKUIG1pc21vIGJsb3F1ZSByZXBldGlkbyBlbiB+MTEgc2l0aW9zIGRlXG4vLyB+MTAgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLlxuLy8gQ2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3BpbyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvXG4vLyBxdWUgdmFyw4PCrWEgcG9yIGxheW91dCAod2lkdGgsIGhlaWdodCwgZm9udC1zaXplLCBtYXJnaW4pLlxuLy9cbi8vIExhIG1pdGFkIGRlIGxvcyBzaXRpb3Mgb3JpZ2luYWxlcyBubyB0ZW7Dg8KtYW4gdHJhbnNpY2nDg8Kzbi9mZWVkYmFjayBkZSBwdWxzYWNpw4PCs25cbi8vIG5pIDpmb2N1cy12aXNpYmxlIMOiwoDClCBlbCBtaXhpbiBsb3MgYcODwrFhZGUgc2llbXByZSwgY2llcnJhIGVzZSBodWVjbyBkZVxuLy8gY29uc2lzdGVuY2lhIGRlIGludGVyYWNjacODwrNuIChQUk9EVUNULm1kOiBcInVuIHNvbG8gcGF0csODwrNuIHBvciB0aXBvIGRlXG4vLyBjb21wb25lbnRlXCIpIGVuIHZleiBkZSBwZXJwZXR1YXIgbGEgdmFyaWFjacODwrNuIGFjY2lkZW50YWwuXG5AbWl4aW4gdGYtZ3JhZGllbnQtYnV0dG9uKCRyYWRpdXM6IDEycHgpIHtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAkcmFkaXVzO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1hY2NlbnQtZ3JhZGllbnQpO1xuICBjb2xvcjogdmFyKC0tdGYtYWNjZW50LWNvbnRyYXN0KTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpLCBvcGFjaXR5IDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk3KTtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNDU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtdGV4dCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxufVxuXG4vLyBCb3TDg8KzbiBkZSBoZWFkZXIgcXVlIGVzIHNvbG8gdW4gaWNvbm8gw6LCgMKUIG1pc21vIGxvb2sgXCJlbnZ1ZWx0b1wiIHF1ZSB5YSB1c2EgbGFcbi8vIGFwcCBkZSBjb25zdW1pZG9yIGVuIHN1cyB0b29sYmFycyAocGFja2FnZXMvc2hhcmVkLWZlYXR1cmVzLy4uLi9kaWV0cy9cbi8vIGNvbXBvbmVudHMvdG9vbGJhci1jYWxlbmRhcjogZm9uZG8gKyBib3JkZXItcmFkaXVzICsgY2FqYSBmaWphIDQ0eDQ0LCBlblxuLy8gdmV6IGRlbCBpb24tYnV0dG9uIHBsYW5vL3RyYW5zcGFyZW50ZSBxdWUgdGVuw4PCrWEgY2FkYSBwYW50YWxsYSBkZSB0cmFpbmVyc1xuLy8gaGFzdGEgYWhvcmEpLiBUb2tlbmVhZG8gYSBsYSBwYWxldGEgZGUgZXN0YSBhcHAgZW4gdmV6IGRlIHJlcGV0aXIgbG9zXG4vLyByZ2JhKDI1NSwyNTUsMjU1LC4uLikgc3VlbHRvcyBkZWwgb3JpZ2luYWwuXG4vL1xuLy8gU2lydmUgdGFudG8gcGFyYSA8aW9uLWJ1dHRvbiBmaWxsPVwiY2xlYXJcIj4gKHVzYSBsYXMgQ1NTIGN1c3RvbSBwcm9wZXJ0aWVzXG4vLyBkZSBJb25pYykgY29tbyBwYXJhIHVuIDxidXR0b24+IG5hdGl2byAodXNhIGxhcyBwcm9waWVkYWRlcyBwbGFuYXMpIMOiwoDClFxuLy8gYW1ib3MgY29leGlzdGVuIGhveSBlbiB0cmFpbmVycyBwYXJhIGVsIG1pc21vIHJvbCBkZSBcInZvbHZlclwiL1wiY2VycmFyXCIuXG5AbWl4aW4gdGYtaWNvbi1idXR0b24oJHNpemU6IDQ0cHgsICRyYWRpdXM6IDEycHgsICRpY29uLXNpemU6IDIwcHgpIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICAtLWJhY2tncm91bmQtYWN0aXZhdGVkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtaG92ZXI6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIC0tYmFja2dyb3VuZC1mb2N1c2VkOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIC0tYm9yZGVyLXJhZGl1czogI3skcmFkaXVzfTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAwO1xuICAtLXBhZGRpbmctZW5kOiAwO1xuICAtLXBhZGRpbmctdG9wOiAwO1xuICAtLXBhZGRpbmctYm90dG9tOiAwO1xuXG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LXNlY29uZGFyeSk7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgd2lkdGg6ICRzaXplO1xuICBoZWlnaHQ6ICRzaXplO1xuICBtaW4td2lkdGg6ICRzaXplO1xuICBtaW4taGVpZ2h0OiAkc2l6ZTtcbiAgbWFyZ2luOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICBjb2xvciB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAkaWNvbi1zaXplO1xuICB9XG59XG5cbi8vIEV4cGFuc29yIGludmlzaWJsZSBkZSB6b25hIHB1bHNhYmxlLlxuLy9cbi8vIFBBUkEgUVXDg8KJOiB1biBjb250cm9sIGNvbXBhY3RvICh1biBpY29ubyBkZSAzMiBweCBlbiB1bmEgZmlsYSBkZSB0YWJsYSwgdW5cbi8vIGVubGFjZSBkZSB0ZXh0byBkZSAxNiBweCkgbm8gbGxlZ2EgYSBsb3MgNDQgcHggcXVlIGV4aWdlIFBST0RVQ1QubWQsIHlcbi8vIGVuZ29yZGFybG8gZGUgdmVyZGFkIGRlc3BsYXphIHRvZG8gbG8gcXVlIHRpZW5lIGFscmVkZWRvciDDosKAwpQgZW4gdW5hIHRhYmxhXG4vLyBkZSB2ZWludGUgZmlsYXMsIDggcHggcG9yIGZpbGEgc29uIG1lZGlhIHBhbnRhbGxhLlxuLy9cbi8vIEVsIHBzZXVkb2VsZW1lbnRvIGNyZWNlIGhhY2lhIGZ1ZXJhIHNpbiBvY3VwYXIgc2l0aW8gZW4gZWwgZmx1am8sIGFzw4PCrSBxdWVcbi8vIGVsIGJvdMODwrNuIHNlIHZlIHBlcXVlw4PCsW8geSBzZSBwdWxzYSBncmFuZGUuXG4vL1xuLy8gQVZJU08gREUgTUVESUNJw4PCk046IGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpIE5PIHZlIGVzdGUgcHNldWRvZWxlbWVudG8sIGFzw4PCrVxuLy8gcXVlIGFsIHZlcmlmaWNhciBoYXkgcXVlIHVzYXIgZWxlbWVudEZyb21Qb2ludCBjb24gZWwgZWxlbWVudG8gZGVudHJvIGRlbFxuLy8gdmlld3BvcnQuIEFkZW3Dg8KhcyBlbCBoaXQtdGVzdCBkZXZ1ZWx2ZSAyIHB4IG1lbm9zIHF1ZSBsYSBjYWphIGRlY2xhcmFkYVxuLy8gKGNvbXByb2JhZG86IC00cHggZGEgNDIsIC02cHggZGEgNDYpLCBhc8ODwq0gcXVlIHVuIDQyIG1lZGlkbyBzb24gNDQgcmVhbGVzLlxuLy9cbi8vICRncm93OiBjdcODwqFudG8gY3JlY2UgcG9yIGNhZGEgbGFkby4gNHB4IGxsZXZhIHVuIGNvbnRyb2wgZGUgMzYgcHggYSA0NC5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlcigkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldDogLSN7JGdyb3d9O1xuICB9XG59XG5cbi8vIFZhcmlhbnRlIHF1ZSBzb2xvIGNyZWNlIGVuIFZFUlRJQ0FMLiBQYXJhIGNvbnRyb2xlcyBlbiBmaWxhIGRvbmRlIGVsXG4vLyBleHBhbnNvciBob3Jpem9udGFsIHNlIHNvbGFwYXLDg8KtYSBjb24gZWwgZGUgYWwgbGFkbyB5IHJvYmFyw4PCrWEgc3VzIHRvcXVlcy5cbkBtaXhpbiB0Zi10b3VjaC1leHBhbmRlci15KCRncm93OiA0cHgpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogLSN7JGdyb3d9O1xuICAgIGJvdHRvbTogLSN7JGdyb3d9O1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
}));


/***/ }),

/***/ 84316:
/*!***************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/constants/exercise-score.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   JOINT_SCORE_ANCHORS: () => (/* binding */ JOINT_SCORE_ANCHORS),
/* harmony export */   MUSCLE_SCORE_ANCHORS: () => (/* binding */ MUSCLE_SCORE_ANCHORS),
/* harmony export */   SCORE_JOINTS: () => (/* binding */ SCORE_JOINTS),
/* harmony export */   SCORE_LEVELS: () => (/* binding */ SCORE_LEVELS),
/* harmony export */   SCORE_MAX: () => (/* binding */ SCORE_MAX),
/* harmony export */   SCORE_MIN: () => (/* binding */ SCORE_MIN),
/* harmony export */   SCORE_MUSCLES: () => (/* binding */ SCORE_MUSCLES),
/* harmony export */   scoreFor: () => (/* binding */ scoreFor)
/* harmony export */ });
/* harmony import */ var _soreness__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./soreness */ 75753);

// Los mismos 16 grupos que el registro de agujetas. Reutilizados a
// propósito: es el mismo mapa del cuerpo, y dos listas distintas harían
// imposible cruzar "qué le estimulo" con "qué le duele".
const SCORE_MUSCLES = _soreness__WEBPACK_IMPORTED_MODULE_0__.SORENESS_MUSCLES;
// Articulaciones que un entrenador vigila al programar. Lista cerrada por el
// mismo motivo que las zonas de dolor: una serie temporal necesita que el
// eje no cambie.
const SCORE_JOINTS = ['Hombro', 'Codo', 'Muñeca', 'Columna cervical', 'Columna lumbar', 'Cadera', 'Rodilla', 'Tobillo'];
// Escala 0-3 y no 0-10: puntuar 200 ejercicios × 16 músculos es un trabajo
// enorme, y cuantos más niveles haya menos consistente será el criterio del
// propio entrenador entre el ejercicio nº 3 y el nº 180.
const SCORE_MIN = 0;
const SCORE_MAX = 3;
const MUSCLE_SCORE_ANCHORS = ['No lo trabaja', 'Lo trabaja de forma secundaria', 'Lo trabaja de forma importante', 'Es el objetivo principal del ejercicio'];
const JOINT_SCORE_ANCHORS = ['No la compromete', 'Carga baja, tolerable a diario', 'Carga alta: hay que dosificarla', 'Muy exigente: no encadenar sesiones'];
const SCORE_LEVELS = Array.from({
  length: SCORE_MAX - SCORE_MIN + 1
}, (_unused, index) => SCORE_MIN + index);
// Los grupos con puntuación 0 no se guardan (la ausencia ya significa cero),
// así que la interfaz necesita rellenar el hueco al pintar la rejilla.
function scoreFor(entries, name) {
  return entries?.find(entry => entry.name === name)?.score ?? 0;
}

/***/ })

}]);
//# sourceMappingURL=src_app_features_exercise-scores_exercise-scores_module_ts.js.map