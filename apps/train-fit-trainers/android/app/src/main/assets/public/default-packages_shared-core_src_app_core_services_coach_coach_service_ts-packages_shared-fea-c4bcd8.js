"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-packages_shared-core_src_app_core_services_coach_coach_service_ts-packages_shared-fea-c4bcd8"],{

/***/ 96370:
/*!*******************************************************************************!*\
  !*** ../../packages/shared-core/src/app/core/services/coach/coach.service.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CoachService: () => (/* binding */ CoachService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 37728);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 27453);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 2950);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 98945);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 51097);
/* harmony import */ var _http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../http/http.service */ 88552);

var _CoachService;





// Tab Coach, Fase 1 — detecta si el usuario autenticado tiene algo que ver
// en el tab "Coach": un profesional con relación ACTIVA, o una invitación
// todavía sin responder. Antes solo miraba "activa", así que un cliente
// recién invitado no veía el tab y tenía que encontrar el acceso oculto en
// Configuración ("Mis profesionales", ya eliminado) para responder — ahora
// el tab aparece en cuanto hay una invitación, sea cual sea su estado.
// Vive en shared-core (no en shared-features) porque lo consumen tanto la
// capa app (tabs.page.ts) como shared-features (user-loader.page.ts) —
// misma dirección de dependencias que UserService.
class CoachService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_hasCoachRelation", (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.signal)(false));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "hasCoachRelation", (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.computed)(() => this._hasCoachRelation()));
    // Distinto de hasCoachRelation (que también cuenta invitaciones sin
    // responder): esto es "asignado" de verdad — al menos un profesional con
    // relación ACTIVA. Lo usa configuration.page.ts para ocultar la
    // configuración de anuncios a un cliente que ya lleva un trainer.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_hasActiveTrainer", (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.signal)(false));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "hasActiveTrainer", (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.computed)(() => this._hasActiveTrainer()));
    this.http = http;
  }
  // Nunca debe romper el flujo que la llama (arranque de la app, respuesta a
  // una invitación, desvinculación) — cualquier fallo se traduce en "sin
  // relación" en vez de propagar el error.
  refresh() {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.forkJoin)({
      active: this.http.get('trainer/info'),
      pending: this.http.get('trainer/invites/mine')
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(({
      active,
      pending
    }) => {
      this._hasActiveTrainer.set((active || []).length > 0);
      return (active || []).length > 0 || (pending || []).length > 0;
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.tap)(hasCoachRelation => this._hasCoachRelation.set(hasCoachRelation)), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.catchError)(() => {
      this._hasCoachRelation.set(false);
      this._hasActiveTrainer.set(false);
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.of)(false);
    }));
  }
}
_CoachService = CoachService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CoachService, "\u0275fac", function CoachService_Factory(t) {
  return new (t || _CoachService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CoachService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _CoachService,
  factory: _CoachService.ɵfac,
  providedIn: 'root'
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

/***/ 61206:
/*!*************************************************************************************************************************!*\
  !*** ../../packages/shared-features/src/app/features/profile/components/configuration/components/editor/editor.page.ts ***!
  \*************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditorPage: () => (/* binding */ EditorPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs */ 76022);
/* harmony import */ var src_app_shared_constants_activity_factor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/constants/activity-factor */ 48547);
/* harmony import */ var src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/shared/constants/objetives */ 49903);
/* harmony import */ var src_app_shared_constants_sex__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/shared/constants/sex */ 97664);
/* harmony import */ var src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/shared/constants/steps */ 2923);
/* harmony import */ var src_app_shared_constants_training__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/shared/constants/training */ 58163);
/* harmony import */ var src_app_shared_constants_user_validations__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/shared/constants/user-validations */ 96676);
/* harmony import */ var src_app_shared_models_macros_data__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/shared/models/macros-data */ 41805);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/core/services/util/navigation.service */ 22938);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var src_app_core_services_nutritional_goal_nutritional_goal_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/core/services/nutritional-goal/nutritional-goal.service */ 29586);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ionic/angular */ 45398);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngx-translate/core */ 647);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var src_app_core_directives_cursor_end_directive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! src/app/core/directives/cursor-end.directive */ 71445);
/* harmony import */ var src_app_core_directives_decimal_input_directive__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! src/app/core/directives/decimal-input.directive */ 379);

var _EditorPage;





















const _c0 = function (a0) {
  return {
    age: a0
  };
};
function EditorPage_div_92_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 58)(1, "span", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind2"](3, 1, "EDITOR.AGE_YEARS", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpureFunction1"](4, _c0, ctx_r0.calculateAge())));
  }
}
function EditorPage_ng_template_96_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "ion-datetime", 60);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("ionChange", function EditorPage_ng_template_96_Template_ion_datetime_ionChange_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r10);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵresetView"](ctx_r9.onDateChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](1, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](3, "div", 61);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](4, "ion-icon", 62);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("preferWheel", true)("doneText", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](1, 8, "COMMON.OK"))("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](2, 10, "COMMON.CANCEL"))("max", ctx_r1.getMaxDate())("min", ctx_r1.getMinDate())("showDefaultButtons", true)("locale", ctx_r1.locale);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](7, 12, "EDITOR.BIRTH_MODAL_TITLE"));
  }
}
function EditorPage_ion_select_option_111_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "ion-select-option", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const stepValue_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", stepValue_r11.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](2, 2, stepValue_r11.name), " ");
  }
}
function EditorPage_ion_card_113_div_6_ion_select_option_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "ion-select-option", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const activity_r15 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", activity_r15.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](2, 2, activity_r15.name), " ");
  }
}
function EditorPage_ion_card_113_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 22)(1, "ion-label", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](4, "div", 30)(5, "ion-select", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](6, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](8, EditorPage_ion_card_113_div_6_ion_select_option_8_Template, 3, 4, "ion-select-option", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](9, "ion-icon", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](3, 4, "EDITOR.ACTIVITY_LABEL"));
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](6, 6, "EDITOR.CANCEL_BTN"));
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](7, 8, "EDITOR.ACTIVITY_PLACEHOLDER"));
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngForOf", ctx_r12.ACTIVITY_FACTOR_VALUES);
  }
}
function EditorPage_ion_card_113_ion_card_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "ion-card", 46)(1, "ion-card-content")(2, "ion-label", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](5, "p", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](7, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](4, 2, ctx_r13.activityType == null ? null : ctx_r13.activityType.name));
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](7, 4, ctx_r13.activityType == null ? null : ctx_r13.activityType.description));
  }
}
function EditorPage_ion_card_113_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "ion-card", 63)(1, "ion-card-header")(2, "ion-card-title", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](5, "ion-card-content");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](6, EditorPage_ion_card_113_div_6_Template, 10, 10, "div", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](7, EditorPage_ion_card_113_ion_card_7_Template, 8, 6, "ion-card", 65);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵclassProp"]("highlight-card", ctx_r3.shouldHighlightActivity);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("id", "activity-card");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](4, 6, "EDITOR.ACTIVITY_LEVEL"), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx_r3.userForm.controls.steps.value === ctx_r3.STEPS[ctx_r3.STEPS_TYPES.notCounted].value);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx_r3.userForm.controls.activity.value);
  }
}
function EditorPage_ion_select_option_128_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "ion-select-option", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const training_r16 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", training_r16.value);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](2, 2, training_r16.name), " ");
  }
}
function EditorPage_ion_select_option_144_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "ion-select-option", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const objetive_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", objetive_r17.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](2, 2, objetive_r17.name), " ");
  }
}
const _c1 = function (a0) {
  return {
    kcal: a0
  };
};
function EditorPage_ng_container_154_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind2"](2, 1, "EDITOR.OBJECTIVE_DESC_VALUE", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpureFunction1"](4, _c1, ctx_r6.Math.abs(ctx_r6.userForm.controls.objetive.value))), " ");
  }
}
function EditorPage_div_155_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "div", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "ion-label", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](2, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](3, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](4, "ion-range", 69);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("ionChange", function EditorPage_div_155_Template_ion_range_ionChange_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r19);
      const ctx_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵresetView"](ctx_r18.changeObjetive($event));
    })("ionKnobMoveStart", function EditorPage_div_155_Template_ion_range_ionKnobMoveStart_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r19);
      const ctx_r20 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵresetView"](ctx_r20.changeObjetive($event));
    })("ionKnobMoveEnd", function EditorPage_div_155_Template_ion_range_ionKnobMoveEnd_4_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵrestoreView"](_r19);
      const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵresetView"](ctx_r21.changeObjetive($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("innerHTML", ctx_r7.OBJETIVES[ctx_r7.OBJETIVE_TYPES.gain].key === ctx_r7.objetiveSelected.key ? _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](2, 7, "EDITOR.SELECT_SUPERAVIT") : _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](3, 9, "EDITOR.SELECT_DEFICIT"), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsanitizeHtml"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("min", 50)("max", 500)("pin", true)("step", 50)("ticks", true)("snaps", true);
  }
}
function EditorPage_ion_item_162_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "ion-item", 70);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](1, "ion-icon", 71);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](2, "ion-label", 72);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](4, "translate");
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](4, 1, "EDITOR.ERROR_MSG"), " ");
  }
}
const _c2 = function (a0) {
  return {
    key: a0
  };
};
class EditorPage {
  get locale() {
    return this.translate.currentLang === 'en' ? 'en-US' : 'es-ES';
  }
  constructor(navigationService, userService, nutritionalGoalService, ionicUtilService, platform, translate) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "navigationService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "userService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "nutritionalGoalService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "platform", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "translate", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "content", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "dateModal", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isDateModalOpen", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "shouldHighlightActivity", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "user", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "initialFormUser", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "userForm", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "objetiveSelected", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "initialObjetive", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "initialObjetiveType", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "objetive$", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "stepsDescription", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "trainingDescription", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "macrosData", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "loading", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "objetiveFinal", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "calculationError", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "STEPS_VALUES", src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_4__.STEPS_VALUES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "STEPS", src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_4__.STEPS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "STEPS_TYPES", src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_4__.STEPS_TYPES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "ACTIVITY_FACTOR", src_app_shared_constants_activity_factor__WEBPACK_IMPORTED_MODULE_1__.ACTIVITY_FACTOR);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "ACTIVITY_FACTOR_VALUES", src_app_shared_constants_activity_factor__WEBPACK_IMPORTED_MODULE_1__.ACTIVITY_FACTOR_VALUES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "OBJETIVES", src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_2__.OBJETIVES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "OBJETIVE_TYPES", src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_2__.OBJETIVE_TYPES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "OBJETIVES_VALUES", src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_2__.OBJETIVES_VALUES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "SEX", src_app_shared_constants_sex__WEBPACK_IMPORTED_MODULE_3__.SEX);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "SEX_TYPES", src_app_shared_constants_sex__WEBPACK_IMPORTED_MODULE_3__.SEX_TYPES);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "USER_VALIDATIONS", src_app_shared_constants_user_validations__WEBPACK_IMPORTED_MODULE_6__.USER_VALIDATIONS);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "TRAINING_TYPE_VALUES", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "Math", Math);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_maxDate", null);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "_minDate", null);
    this.navigationService = navigationService;
    this.userService = userService;
    this.nutritionalGoalService = nutritionalGoalService;
    this.ionicUtilService = ionicUtilService;
    this.platform = platform;
    this.translate = translate;
  }
  get activityType() {
    return this.userService.getActivityFactor(this.userForm.controls.activity.value);
  }
  ngOnInit() {
    this.user = JSON.parse(JSON.stringify(this.userService.getLocalUser));
    this.initUserForm();
  }
  initUserForm() {
    this.initialFormUser = new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormGroup({});
    this.userForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormGroup({
      name: new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControl(this.user.name, src_app_shared_constants_user_validations__WEBPACK_IMPORTED_MODULE_6__.USER_VALIDATIONS.name),
      lastname: new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControl(this.user.lastname, src_app_shared_constants_user_validations__WEBPACK_IMPORTED_MODULE_6__.USER_VALIDATIONS.lastname),
      weight: new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControl(this.user.weight, src_app_shared_constants_user_validations__WEBPACK_IMPORTED_MODULE_6__.USER_VALIDATIONS.weight),
      height: new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControl(this.user.height, src_app_shared_constants_user_validations__WEBPACK_IMPORTED_MODULE_6__.USER_VALIDATIONS.height),
      birth: new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControl(this.user.birth, src_app_shared_constants_user_validations__WEBPACK_IMPORTED_MODULE_6__.USER_VALIDATIONS.birth),
      sex: new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControl(this.user.sex, src_app_shared_constants_user_validations__WEBPACK_IMPORTED_MODULE_6__.USER_VALIDATIONS.sex),
      steps: new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControl(this.user.steps, src_app_shared_constants_user_validations__WEBPACK_IMPORTED_MODULE_6__.USER_VALIDATIONS.steps),
      activity: new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControl(this.user.activity, src_app_shared_constants_user_validations__WEBPACK_IMPORTED_MODULE_6__.USER_VALIDATIONS.activity),
      objetive: new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControl(Math.abs(this.user.objetive), src_app_shared_constants_user_validations__WEBPACK_IMPORTED_MODULE_6__.USER_VALIDATIONS.objetive),
      objetiveType: new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControl(null, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.required),
      training: new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControl(this.user.training, src_app_shared_constants_user_validations__WEBPACK_IMPORTED_MODULE_6__.USER_VALIDATIONS.training),
      kcalTotal: new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControl(Math.round(this.user.kcalTotal || 0), src_app_shared_constants_user_validations__WEBPACK_IMPORTED_MODULE_6__.USER_VALIDATIONS.kcalTotal),
      proteinsGTotal: new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControl(Math.round(this.user.proteinsGTotal || 0), src_app_shared_constants_user_validations__WEBPACK_IMPORTED_MODULE_6__.USER_VALIDATIONS.proteinsGTotal),
      carbohydratesGTotal: new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControl(Math.round(this.user.carbohydratesGTotal || 0), src_app_shared_constants_user_validations__WEBPACK_IMPORTED_MODULE_6__.USER_VALIDATIONS.carbohydratesGTotal),
      fatGTotal: new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControl(Math.round(this.user.fatGTotal || 0), src_app_shared_constants_user_validations__WEBPACK_IMPORTED_MODULE_6__.USER_VALIDATIONS.fatGTotal)
    });
    this.initObjetive();
    this.initActivity();
    this.initTraining();
    this.initDescriptions();
    this.handleMacros();
    // Verificar validación inicial del campo activity
    this.checkActivityValidation();
    const observables = [this.userForm.controls.weight.valueChanges, this.userForm.controls.height.valueChanges, this.userForm.controls.birth.valueChanges, this.userForm.controls.sex.valueChanges, this.userForm.controls.steps.valueChanges, this.userForm.controls.activity.valueChanges, this.userForm.controls.objetive.valueChanges, this.userForm.controls.objetiveType.valueChanges, this.userForm.controls.training.valueChanges];
    (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.merge)(...observables).subscribe(() => this.autoCalculate());
    Object.keys(this.userForm.value).forEach(controlName => {
      this.initialFormUser.addControl(controlName, new _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControl(this.userForm.value[controlName]));
    });
  }
  initDescriptions() {
    this.setStepsDescription();
    this.setTrainingDescription();
  }
  handleMacros() {
    const obs = [this.userForm.controls.kcalTotal.valueChanges, this.userForm.controls.proteinsGTotal.valueChanges, this.userForm.controls.carbohydratesGTotal.valueChanges, this.userForm.controls.fatGTotal.valueChanges];
    (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.merge)(...obs).subscribe(() => {
      const kcalTotal = this.userForm.controls.kcalTotal.value;
      const proteinsGTotal = this.userForm.controls.proteinsGTotal.value;
      const carbohydratesGTotal = this.userForm.controls.carbohydratesGTotal.value;
      const fatGTotal = this.userForm.controls.fatGTotal.value;
      const proteinKcal = proteinsGTotal * src_app_shared_models_macros_data__WEBPACK_IMPORTED_MODULE_7__.MACROS_VALUES.proteins;
      const carbohydratesKcal = carbohydratesGTotal * src_app_shared_models_macros_data__WEBPACK_IMPORTED_MODULE_7__.MACROS_VALUES.carbohydrates;
      const fatKcal = fatGTotal * src_app_shared_models_macros_data__WEBPACK_IMPORTED_MODULE_7__.MACROS_VALUES.fat;
      this.calculationError = proteinKcal + carbohydratesKcal + fatKcal > kcalTotal + 25 || proteinKcal + carbohydratesKcal + fatKcal < kcalTotal - 25;
    });
  }
  initTraining() {
    let trainingValues = this.updateTrainingOptions(this.userForm.controls.steps.value);
    this.userForm.controls.training.setValue(this.userForm.controls.training.value);
    this.userForm.controls.training.valueChanges.subscribe(() => this.setTrainingDescription());
    this.userForm.controls.steps.valueChanges.subscribe(selectedStep => {
      this.setStepsDescription();
      if (selectedStep === src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_4__.STEPS[src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_4__.STEPS_TYPES.notCounted].value) {
        this.userForm.controls.activity.setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.required);
      } else {
        this.userForm.controls.activity.clearValidators();
      }
      this.userForm.controls.activity.updateValueAndValidity();
      // Primero saca el id con el value del form para saber a que training nos referimos,
      const idTraining = Object.values(trainingValues).find(trainingTemp => trainingTemp.value === this.userForm.controls.training.value).id;
      trainingValues = this.updateTrainingOptions(selectedStep);
      // Después con ese id sacamos el training pero actualizado de haber cambiado los steps
      const trainingValue = Object.values(trainingValues).find(trainingTemp => trainingTemp.id === idTraining).value;
      // desppués con el id training sacamos el valor de ese training y se asigna al form
      this.userForm.controls.training.setValue(trainingValue);
    });
  }
  updateTrainingOptions(selectedStep) {
    const trainingValues = (0,src_app_shared_constants_training__WEBPACK_IMPORTED_MODULE_5__.calculateTrainingValues)(selectedStep);
    if (trainingValues) Object.assign(this.TRAINING_TYPE_VALUES, Object.values(trainingValues));
    return trainingValues;
  }
  selectObjetive(objetive) {
    this.objetiveSelected = objetive;
    this.userForm.controls.objetiveType.setValue(objetive.id);
    this.userForm.controls.objetive.setValue(Math.abs(objetive.value));
  }
  selectObjetiveFromSelect(event) {
    const selectedId = event.detail.value;
    const selectedObjetive = this.OBJETIVES_VALUES.find(obj => obj.id === selectedId);
    if (selectedObjetive) {
      this.selectObjetive(selectedObjetive);
    }
  }
  changeObjetive(event) {
    const value = Number(event.detail.value);
    this.userForm.controls.objetive.setValue(value);
  }
  close() {
    if (this.checkAndHandleMissingActivity(true)) return;
    if (this.userForm.valid && !this.calculationError) {
      if (JSON.stringify(this.userForm.value) !== JSON.stringify(this.initialFormUser.value) || this.hasObjetiveChange()) {
        const alertOptions = {
          header: this.translate.instant('EDITOR.SAVE_HEADER'),
          message: this.translate.instant('EDITOR.SAVE_MSG'),
          cssClass: "alert-grid-buttons",
          buttons: [{
            text: this.translate.instant('EDITOR.CANCEL_BTN'),
            role: "cancel"
          }, {
            text: this.translate.instant('EDITOR.SAVE_BTN'),
            handler: () => {
              this.updateUser();
            }
          }, {
            text: this.translate.instant('EDITOR.DISCARD_BTN'),
            role: "destructive",
            handler: () => {
              this.objetiveSelected = this.initialObjetiveType;
              this.userForm.reset(this.initialFormUser.value);
              this.autoCalculate();
              this.ionicUtilService.closeModal();
            }
          }]
        };
        this.ionicUtilService.showAlert(alertOptions);
      } else this.ionicUtilService.closeModal();
    } else {
      const alertOptions = {
        header: this.translate.instant('EDITOR.MISSING_FIELDS_HEADER'),
        message: this.translate.instant('EDITOR.MISSING_FIELDS_CLOSE'),
        buttons: [{
          text: this.translate.instant('EDITOR.UNDERSTOOD'),
          role: "cancel"
        }]
      };
      this.ionicUtilService.showAlert(alertOptions);
    }
  }
  autoCalculate() {
    this.setFinalObjetive();
    setTimeout(() => {
      const userWithFormValues = {
        ...this.user,
        ...this.userForm.value,
        objetive: this.objetiveFinal
      };
      const computedUser = this.userService.setUserMacrosAndKcal(userWithFormValues);
      Object.assign(this.user, computedUser);
      this.calculate();
      const kcalTotal = Math.round(computedUser.kcalTotal || 0);
      const proteinsGTotal = parseFloat((computedUser.proteinsGTotal || 0).toFixed(2));
      const carbohydratesGTotal = parseFloat((computedUser.carbohydratesGTotal || 0).toFixed(2));
      const fatGTotal = parseFloat((computedUser.fatGTotal || 0).toFixed(2));
      this.syncActiveGoal(kcalTotal, proteinsGTotal, carbohydratesGTotal, fatGTotal);
      this.userForm.controls.kcalTotal.setValue(this.userForm.controls.kcalTotal.value);
    });
  }
  syncActiveGoal(kcalTotal, proteins, carbs, fat) {
    if (this.user.goalInUse) {
      this.nutritionalGoalService.update(this.user.goalInUse, {
        kcalTotal,
        proteinsGTotal: proteins,
        carbohydratesGTotal: carbs,
        fatGTotal: fat
      }).subscribe();
    } else {
      this.nutritionalGoalService.create({
        name: 'Default',
        kcalTotal,
        proteinsGTotal: proteins,
        carbohydratesGTotal: carbs,
        fatGTotal: fat
      }).subscribe(goal => {
        this.nutritionalGoalService.setActive(goal._id).subscribe({
          next: () => {
            this.user.goalInUse = goal._id;
          }
        });
      });
    }
  }
  setStepsDescription() {
    this.stepsDescription = src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_4__.STEPS_VALUES.find(sTemp => sTemp.value === this.userForm.controls.steps.value).name;
  }
  setTrainingDescription() {
    this.trainingDescription = this.TRAINING_TYPE_VALUES.find(tTemp => tTemp.value === this.userForm.controls.training.value).name;
  }
  calculate() {
    this.userForm.controls.kcalTotal.setValue(Math.round(this.user.kcalTotal || 0), {
      emitEvent: false
    });
    this.userForm.controls.proteinsGTotal.setValue(Math.round(this.user.proteinsGTotal || 0), {
      emitEvent: false
    });
    this.userForm.controls.carbohydratesGTotal.setValue(Math.round(this.user.carbohydratesGTotal || 0), {
      emitEvent: false
    });
    this.userForm.controls.fatGTotal.setValue(Math.round(this.user.fatGTotal || 0), {
      emitEvent: false
    });
  }
  updateUser() {
    // Verificar validación antes de proceder
    if (this.checkAndHandleMissingActivity(false)) return;
    if (!this.userForm.valid) {
      const alertOptions = {
        header: this.translate.instant('EDITOR.MISSING_FIELDS_HEADER'),
        message: this.translate.instant('EDITOR.MISSING_FIELDS_SAVE'),
        buttons: [{
          text: this.translate.instant('EDITOR.UNDERSTOOD'),
          role: "cancel"
        }]
      };
      this.ionicUtilService.showAlert(alertOptions);
      return;
    }
    this.loading = true;
    const userToUpdate = {};
    const formValue = this.userForm.value;
    const skipFields = ["objetiveType", "kcalTotal", "proteinsGTotal", "carbohydratesGTotal", "fatGTotal"];
    Object.keys(formValue).forEach(key => {
      if (!skipFields.includes(key) && formValue[key] !== this.initialFormUser.value[key]) {
        userToUpdate[key] = formValue[key];
      }
    });
    // Verificar si el objetivo ha cambiado
    if (this.hasObjetiveChange()) {
      userToUpdate.objetive = this.objetiveFinal;
    }
    // Solo actualizar si hay cambios
    if (Object.keys(userToUpdate).length === 0) {
      this.ionicUtilService.showToast({
        message: this.translate.instant('EDITOR.NO_CHANGES_MSG'),
        color: "warning",
        duration: 2000
      });
      this.loading = false;
      return;
    }
    // Incluir el _id del usuario para la actualización
    userToUpdate._id = this.user._id;
    // IMPORTANTE: Preservar usos activos para evitar que se deseleccionen
    if (this.user.workoutInUse !== undefined) {
      userToUpdate.workoutInUse = this.user.workoutInUse;
    }
    if (this.user.tableInUse !== undefined) {
      userToUpdate.tableInUse = this.user.tableInUse;
    }
    if (this.user.dietInUse !== undefined) {
      userToUpdate.dietInUse = this.user.dietInUse;
    }
    if (this.user.goalInUse !== undefined) {
      userToUpdate.goalInUse = this.user.goalInUse;
    }
    this.userService.updateUser(userToUpdate).subscribe({
      next: user => {
        this.user = user;
        this.userService.setLocalUser = user; // Actualizar el usuario local
        this.ionicUtilService.showToast({
          message: this.translate.instant('EDITOR.UPDATE_SUCCESS'),
          color: "success",
          duration: 2000
        });
        this.ionicUtilService.closeModal();
        this.loading = false;
      },
      error: error => {
        this.ionicUtilService.showToast({
          message: this.translate.instant('EDITOR.UPDATE_ERROR'),
          color: "danger",
          duration: 2000
        });
        this.loading = false;
      }
    });
  }
  initObjetive() {
    // Determinar el tipo de objetivo basado en el valor actual
    let objetiveType;
    if (this.user.objetive > 0) {
      objetiveType = src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_2__.OBJETIVE_TYPES.gain;
    } else if (this.user.objetive < 0) {
      objetiveType = src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_2__.OBJETIVE_TYPES.loss;
    } else {
      objetiveType = src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_2__.OBJETIVE_TYPES.maintenance;
    }
    this.userForm.controls.objetiveType.setValue(objetiveType);
    if (this.user.objetive > 0) this.objetiveSelected = src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_2__.OBJETIVES[src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_2__.OBJETIVE_TYPES.gain];else if (this.user.objetive < 0) this.objetiveSelected = src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_2__.OBJETIVES[src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_2__.OBJETIVE_TYPES.loss];else this.objetiveSelected = src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_2__.OBJETIVES[src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_2__.OBJETIVE_TYPES.maintenance];
    this.userForm.controls.objetive.setValue(Math.abs(this.userForm.controls.objetive.value));
    this.initialObjetive = this.user.objetive;
    this.initialObjetiveType = {
      ...this.objetiveSelected
    };
    this.setFinalObjetive();
    this.handleObjetive();
  }
  handleObjetive() {
    this.userForm.controls.objetiveType.valueChanges.subscribe(value => {
      if (value === src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_2__.OBJETIVE_TYPES.maintenance) {
        this.userForm.controls.objetive.setValue(0);
      }
    });
  }
  initActivity() {
    this.userForm.controls.steps.valueChanges.subscribe(res => {
      if (res === src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_4__.STEPS[src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_4__.STEPS_TYPES.notCounted].value) {
        this.userForm.controls.activity.setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.required);
        this.userForm.controls.activity.setValue(null);
      } else {
        this.userForm.controls.activity.clearValidators();
      }
      this.userForm.controls.activity.updateValueAndValidity();
    });
  }
  setFinalObjetive() {
    const objetiveType = this.userForm.controls.objetiveType.value;
    const objetiveValue = this.userForm.controls.objetive.value;
    if (objetiveType === src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_2__.OBJETIVE_TYPES.loss) {
      this.objetiveFinal = -Math.abs(objetiveValue);
    } else if (objetiveType === src_app_shared_constants_objetives__WEBPACK_IMPORTED_MODULE_2__.OBJETIVE_TYPES.gain) {
      this.objetiveFinal = Math.abs(objetiveValue);
    } else {
      this.objetiveFinal = 0;
    }
  }
  hasObjetiveChange() {
    return this.initialObjetiveType.id !== this.objetiveSelected.id || this.initialObjetive !== this.objetiveFinal;
  }
  // Métodos para el selector de fecha mejorado
  openDatePicker() {
    const datetimeButton = document.querySelector("#datetime-button");
    if (datetimeButton) {
      datetimeButton.click();
    }
  }
  onDateChange(event) {
    const selectedDate = event.detail.value;
    if (selectedDate) {
      this.userForm.get("birth")?.setValue(selectedDate);
      this.userForm.get("birth")?.markAsTouched();
    }
  }
  getFormattedBirthDate() {
    const birthValue = this.userForm.get("birth")?.value;
    if (!birthValue) return "";
    const date = new Date(birthValue);
    const options = {
      day: "2-digit",
      month: "long",
      year: "numeric"
    };
    return date.toLocaleDateString(this.locale, options);
  }
  calculateAge() {
    const birthValue = this.userForm.get("birth")?.value;
    if (!birthValue) return 0;
    const birthDate = new Date(birthValue);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || monthDiff === 0 && today.getDate() < birthDate.getDate()) {
      age--;
    }
    return age;
  }
  getMaxDate() {
    if (!this._maxDate) {
      // Máximo: hace 13 años (edad mínima)
      const maxDate = new Date();
      maxDate.setFullYear(maxDate.getFullYear() - 13);
      this._maxDate = maxDate.toISOString();
    }
    return this._maxDate;
  }
  getMinDate() {
    if (!this._minDate) {
      // Mínimo: hace 120 años (edad máxima razonable)
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 120);
      this._minDate = minDate.toISOString();
    }
    return this._minDate;
  }
  checkActivityValidation() {
    // Verificar si el campo activity debe ser requerido al inicializar
    if (this.userForm.controls.steps.value === src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_4__.STEPS[src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_4__.STEPS_TYPES.notCounted].value) {
      this.userForm.controls.activity.setValidators(_angular_forms__WEBPACK_IMPORTED_MODULE_15__.Validators.required);
      this.userForm.controls.activity.updateValueAndValidity();
    }
  }
  checkAndHandleMissingActivity(isClosing = false) {
    const stepsValue = this.userForm.controls.steps.value;
    const activityControl = this.userForm.controls.activity;
    if (stepsValue === src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_4__.STEPS[src_app_shared_constants_steps__WEBPACK_IMPORTED_MODULE_4__.STEPS_TYPES.notCounted].value && (activityControl.value === null || activityControl.value === undefined || activityControl.value === "")) {
      const buttons = [{
        text: this.translate.instant('EDITOR.FILL_BTN'),
        handler: () => {
          this.scrollToActivityAndHighlight();
        }
      }];
      if (isClosing) {
        buttons.push({
          text: this.translate.instant('EDITOR.DISCARD_BTN2'),
          role: "destructive",
          handler: () => {
            this.objetiveSelected = this.initialObjetiveType;
            this.userForm.reset(this.initialFormUser.value);
            this.autoCalculate();
            this.ionicUtilService.closeModal();
          }
        });
      }
      const alertOptions = {
        header: this.translate.instant('EDITOR.ACTIVITY_REQUIRED_HEADER'),
        message: this.translate.instant('EDITOR.ACTIVITY_REQUIRED_MSG'),
        buttons: buttons
      };
      this.ionicUtilService.showAlert(alertOptions);
      return true;
    }
    return false;
  }
  scrollToActivityAndHighlight() {
    const element = document.getElementById("activity-card");
    if (element) {
      const yOffset = element.offsetTop - 100; // Ajuste para que no quede pegado arriba
      this.content.scrollToPoint(0, yOffset, 800);
      // Activar animación
      this.shouldHighlightActivity = true;
      setTimeout(() => {
        this.shouldHighlightActivity = false;
      }, 2500); // Duración de la animación + un poco más
    }
  }
}
_EditorPage = EditorPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(EditorPage, "\u0275fac", function EditorPage_Factory(t) {
  return new (t || _EditorPage)(_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](src_app_core_services_util_navigation_service__WEBPACK_IMPORTED_MODULE_8__.NavigationService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_9__.UserService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](src_app_core_services_nutritional_goal_nutritional_goal_service__WEBPACK_IMPORTED_MODULE_10__.NutritionalGoalService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_11__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_17__.Platform), _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdirectiveInject"](_ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslateService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(EditorPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineComponent"]({
  type: _EditorPage,
  selectors: [["app-editor"]],
  viewQuery: function EditorPage_Query(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonContent, 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵviewQuery"](_ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonModal, 5);
    }
    if (rf & 2) {
      let _t;
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵloadQuery"]()) && (ctx.content = _t.first);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵloadQuery"]()) && (ctx.dateModal = _t.first);
    }
  },
  decls: 193,
  vars: 141,
  consts: [[1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], [1, "tf-page-header__back-button", 3, "click"], ["name", "chevron-back-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "tf-page-header__progress"], [1, "tf-page-header__progress-indicator"], [3, "formGroup"], [1, "profile-card"], ["color", "primary"], [1, "form-container"], [1, "input-row"], [1, "input-group"], [1, "input-label"], [1, "input-wrapper"], ["type", "text", "formControlName", "name", "appCursorEnd", "", 1, "modern-input", 3, "placeholder"], ["name", "person-outline", 1, "input-icon"], ["type", "text", "formControlName", "lastname", "appCursorEnd", "", 1, "modern-input", 3, "placeholder"], ["name", "people-outline", 1, "input-icon"], [1, "input-group", "full-width"], [1, "informative-badge"], [1, "badge-text"], ["name", "mail-outline", 1, "badge-icon"], ["type", "text", "inputmode", "decimal", "formControlName", "weight", "maxlength", "6", "appCursorEnd", "", "appDecimalInput", "", 1, "modern-input", 3, "placeholder"], ["name", "fitness-outline", 1, "input-icon"], ["type", "text", "inputmode", "numeric", "formControlName", "height", "maxlength", "3", "appCursorEnd", "", "appDecimalInput", "", 1, "modern-input", 3, "placeholder", "maxDecimals"], ["name", "resize-outline", 1, "input-icon"], [1, "select-wrapper"], ["formControlName", "sex", "interface", "action-sheet", "mode", "ios", 3, "cancelText", "placeholder"], [3, "value"], ["name", "chevron-down-outline", 1, "select-icon"], [1, "datetime-enhanced-wrapper"], [1, "datetime-display", 3, "click"], [1, "date-text"], ["class", "age-indicator", 4, "ngIf"], ["name", "calendar-outline", 1, "calendar-icon"], ["id", "datetime-button", "datetime", "datetime", 1, "hidden-datetime-button"], ["trigger", "datetime-button", 1, "datetime-modal", "birthdate-datetime-modal", 3, "keepContentsMounted", "showBackdrop", "willPresent", "willDismiss"], ["formControlName", "steps", "interface", "action-sheet", "mode", "ios", 3, "cancelText", "placeholder"], [3, "value", 4, "ngFor", "ngForOf"], ["class", "profile-card", 3, "id", "highlight-card", 4, "ngIf"], ["formControlName", "training", "interface", "action-sheet", "mode", "ios", 3, "cancelText", "placeholder"], ["formControlName", "objetiveType", "interface", "action-sheet", "mode", "ios", 3, "cancelText", "placeholder", "ionChange"], [1, "info-card"], ["color", "primary", 1, "info-title"], [1, "info-description"], [4, "ngIf"], ["class", "objective-slider", 4, "ngIf"], [1, "profile-card", "macros-card"], ["class", "error-message", 4, "ngIf"], [1, "macros-summary", 2, "display", "grid", "grid-template-columns", "repeat(4, 1fr)", "gap", "12px"], [1, "kpi"], [1, "title"], [1, "value"], ["expand", "block", 1, "save-button-global", 3, "disabled", "click"], [1, "age-indicator"], [1, "age-text"], ["id", "datetime", "mode", "ios", "presentation", "date", "formControlName", "birth", 3, "preferWheel", "doneText", "cancelText", "max", "min", "showDefaultButtons", "locale", "ionChange"], ["slot", "title", 1, "datetime-title"], ["name", "calendar-outline"], [1, "profile-card", 3, "id"], ["class", "input-group full-width", 4, "ngIf"], ["class", "info-card", 4, "ngIf"], ["formControlName", "activity", "interface", "action-sheet", "mode", "ios", 3, "cancelText", "placeholder"], [1, "objective-slider"], [1, "section-label", 3, "innerHTML"], ["formControlName", "objetive", "mode", "ios", 1, "custom-range", 3, "min", "max", "pin", "step", "ticks", "snaps", "ionChange", "ionKnobMoveStart", "ionKnobMoveEnd"], [1, "error-message"], ["name", "warning-outline", "slot", "start", "color", "danger"], ["color", "danger", 1, "ion-text-wrap"]],
  template: function EditorPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](0, "ion-header")(1, "div", 0)(2, "div", 1)(3, "div", 2)(4, "button", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function EditorPage_Template_button_click_4_listener() {
        return ctx.close();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](5, "ion-icon", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](6, "div", 5)(7, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](9, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](10, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](11, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](12, "div", 9);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](13, "ion-content")(14, "ion-list")(15, "form", 10)(16, "ion-card", 11)(17, "ion-card-header")(18, "ion-card-title", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](19);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](20, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](21, "ion-card-content")(22, "div", 13)(23, "div", 14)(24, "div", 15)(25, "label", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](26);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](27, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](28, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](29, "input", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](30, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](31, "ion-icon", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](32, "div", 15)(33, "label", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](34);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](35, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](36, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](37, "input", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](38, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](39, "ion-icon", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](40, "div", 14)(41, "div", 22)(42, "label", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](43);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](44, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](45, "div", 23)(46, "span", 24);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](47);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](48, "ion-icon", 25);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](49, "div", 14)(50, "div", 15)(51, "label", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](52);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](53, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](54, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](55, "input", 26);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](56, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](57, "ion-icon", 27);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](58, "div", 15)(59, "label", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](60);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](61, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](62, "div", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](63, "input", 28);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](64, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](65, "ion-icon", 29);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](66, "div", 14)(67, "div", 22)(68, "ion-label", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](69);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](70, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](71, "div", 30)(72, "ion-select", 31);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](73, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](74, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](75, "ion-select-option", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](76);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](77, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](78, "ion-select-option", 32);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](79);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](80, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](81, "ion-icon", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](82, "div", 14)(83, "div", 22)(84, "label", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](85);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](86, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](87, "div", 34)(88, "div", 35);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function EditorPage_Template_div_click_88_listener() {
        return ctx.openDatePicker();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](89, "span", 36);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](90);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](91, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](92, EditorPage_div_92_Template, 4, 6, "div", 37);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](93, "ion-icon", 38)(94, "ion-datetime-button", 39);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](95, "ion-modal", 40);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("willPresent", function EditorPage_Template_ion_modal_willPresent_95_listener() {
        return ctx.isDateModalOpen = true;
      })("willDismiss", function EditorPage_Template_ion_modal_willDismiss_95_listener() {
        return ctx.isDateModalOpen = false;
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](96, EditorPage_ng_template_96_Template, 8, 14, "ng-template");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](97, "ion-card", 11)(98, "ion-card-header")(99, "ion-card-title", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](100);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](101, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](102, "ion-card-content")(103, "div", 22)(104, "ion-label", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](105);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](106, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](107, "div", 30)(108, "ion-select", 41);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](109, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](110, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](111, EditorPage_ion_select_option_111_Template, 3, 4, "ion-select-option", 42);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](112, "ion-icon", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](113, EditorPage_ion_card_113_Template, 8, 8, "ion-card", 43);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](114, "ion-card", 11)(115, "ion-card-header")(116, "ion-card-title", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](117);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](118, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](119, "ion-card-content")(120, "div", 22)(121, "ion-label", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](122);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](123, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](124, "div", 30)(125, "ion-select", 44);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](126, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](127, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](128, EditorPage_ion_select_option_128_Template, 3, 4, "ion-select-option", 42);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](129, "ion-icon", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](130, "ion-card", 11)(131, "ion-card-header")(132, "ion-card-title", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](133);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](134, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](135, "ion-card-content")(136, "div", 22)(137, "ion-label", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](138);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](139, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](140, "div", 30)(141, "ion-select", 45);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("ionChange", function EditorPage_Template_ion_select_ionChange_141_listener($event) {
        return ctx.selectObjetiveFromSelect($event);
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](142, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](143, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](144, EditorPage_ion_select_option_144_Template, 3, 4, "ion-select-option", 42);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](145, "ion-icon", 33);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](146, "ion-card", 46)(147, "ion-card-content")(148, "ion-label", 47);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](149);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](150, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](151, "p", 48);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](152);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](153, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](154, EditorPage_ng_container_154_Template, 3, 6, "ng-container", 49);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](155, EditorPage_div_155_Template, 5, 11, "div", 50);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](156, "ion-card", 51)(157, "ion-card-header")(158, "ion-card-title", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](159);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](160, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](161, "ion-card-content");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtemplate"](162, EditorPage_ion_item_162_Template, 5, 3, "ion-item", 52);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](163, "div", 53)(164, "div", 54)(165, "div", 55);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](166);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](167, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](168, "div", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](169);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](170, "div", 54)(171, "div", 55);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](172);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](173, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](174, "div", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](175);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](176, "div", 54)(177, "div", 55);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](178);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](179, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](180, "div", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](181);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](182, "div", 54)(183, "div", 55);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](184);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](185, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](186, "div", 56);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](187);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementStart"](188, "div")(189, "ion-button", 57);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵlistener"]("click", function EditorPage_Template_ion_button_click_189_listener() {
        return ctx.updateUser();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtext"](190);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipe"](191, "translate");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelementEnd"]()()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵelement"](192, "ion-footer");
    }
    if (rf & 2) {
      let tmp_23_0;
      let tmp_25_0;
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](9, 62, "EDITOR.TITLE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵstyleProp"]("visibility", ctx.loading ? "visible" : "hidden");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("formGroup", ctx.userForm);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](20, 64, "EDITOR.PERSONAL_DATA"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](7);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](27, 66, "EDITOR.NAME"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](30, 68, "EDITOR.NAME_PLACEHOLDER"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](35, 70, "EDITOR.LASTNAME"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](38, 72, "EDITOR.LASTNAME_PLACEHOLDER"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](44, 74, "EDITOR.EMAIL"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](ctx.user == null ? null : ctx.user.email);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](53, 76, "EDITOR.WEIGHT"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](56, 78, "EDITOR.WEIGHT_PLACEHOLDER"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](61, 80, "EDITOR.HEIGHT"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](64, 82, "EDITOR.HEIGHT_PLACEHOLDER"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("maxDecimals", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](70, 84, "EDITOR.SEX"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](73, 86, "EDITOR.CANCEL_BTN"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](74, 88, "EDITOR.SEX_PLACEHOLDER"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", ctx.SEX_TYPES.female);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](77, 90, "EDITOR.FEMALE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("value", ctx.SEX_TYPES.male);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](80, 92, "EDITOR.MALE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](6);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](86, 94, "EDITOR.BIRTH_DATE"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵclassProp"]("placeholder", !((tmp_23_0 = ctx.userForm.get("birth")) == null ? null : tmp_23_0.value));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", ctx.getFormattedBirthDate() || _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](91, 96, "EDITOR.BIRTH_PLACEHOLDER"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", (tmp_25_0 = ctx.userForm.get("birth")) == null ? null : tmp_25_0.value);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("keepContentsMounted", true)("showBackdrop", true);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](101, 98, "EDITOR.PHYSICAL_ACTIVITY"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](106, 100, "EDITOR.DAILY_STEPS"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](109, 102, "EDITOR.CANCEL_BTN"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](110, 104, "EDITOR.STEPS_PLACEHOLDER"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngForOf", ctx.STEPS_VALUES);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx.userForm.controls.steps.value && ctx.userForm.controls.steps.value === ctx.STEPS[ctx.STEPS_TYPES.notCounted].value);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](118, 106, "EDITOR.TRAINING_FREQUENCY"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](123, 108, "EDITOR.TRAINING_LABEL"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](126, 110, "EDITOR.CANCEL_BTN"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](127, 112, "EDITOR.TRAINING_PLACEHOLDER"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngForOf", ctx.TRAINING_TYPE_VALUES);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](134, 114, "EDITOR.OBJECTIVE"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](139, 116, "EDITOR.OBJECTIVE_LABEL"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("cancelText", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](142, 118, "EDITOR.CANCEL_BTN"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpropertyInterpolate"]("placeholder", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](143, 120, "EDITOR.OBJECTIVE_PLACEHOLDER"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngForOf", ctx.OBJETIVES_VALUES);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](150, 122, ctx.objetiveSelected.name));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind2"](153, 124, "EDITOR.OBJECTIVE_DESC", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpureFunction1"](139, _c2, ctx.objetiveSelected.key)), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx.objetiveSelected.key !== ctx.OBJETIVES[ctx.OBJETIVE_TYPES.maintenance].key);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx.objetiveSelected.key !== ctx.OBJETIVES[ctx.OBJETIVE_TYPES.maintenance].key);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](160, 127, "EDITOR.MACRONUTRIENTS"), " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("ngIf", ctx.calculationError);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](4);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](167, 129, "EDITOR.CALORIES"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", (ctx.userForm.controls.kcalTotal.value == null ? null : ctx.userForm.controls.kcalTotal.value.toFixed(0)) || 0, " ");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](173, 131, "EDITOR.PROTEINS"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", (ctx.userForm.controls.proteinsGTotal.value == null ? null : ctx.userForm.controls.proteinsGTotal.value.toFixed(0)) || 0, "g ");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](179, 133, "EDITOR.CARBS"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", (ctx.userForm.controls.carbohydratesGTotal.value == null ? null : ctx.userForm.controls.carbohydratesGTotal.value.toFixed(0)) || 0, "g ");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](185, 135, "EDITOR.FATS"));
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", (ctx.userForm.controls.fatGTotal.value == null ? null : ctx.userForm.controls.fatGTotal.value.toFixed(0)) || 0, "g ");
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵproperty"]("disabled", ctx.loading);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵpipeBind1"](191, 137, "EDITOR.SAVE_CHANGES"), " ");
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_20__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_20__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_15__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_15__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_15__.FormControlName, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonCard, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonCardContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonCardHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonCardTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonDatetime, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonDatetimeButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonItem, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonLabel, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonList, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonRange, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonSelect, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonSelectOption, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.IonModal, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.SelectValueAccessor, _ionic_angular__WEBPACK_IMPORTED_MODULE_19__.TextValueAccessor, src_app_core_directives_cursor_end_directive__WEBPACK_IMPORTED_MODULE_12__.CursorEndDirective, src_app_core_directives_decimal_input_directive__WEBPACK_IMPORTED_MODULE_13__.DecimalInputDirective, _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslatePipe],
  styles: ["ion-list[_ngcontent-%COMP%] {\n  background: transparent;\n  padding: 0;\n  margin: 7px;\n}\n\n.top-input[_ngcontent-%COMP%] {\n  --background: var(--ion-color-light);\n  --color: var(--ion-color-dark);\n  --placeholder-color: var(--ion-color-medium);\n  --border-radius: 12px;\n  margin: 8px 0;\n  --padding-start: 16px;\n  --padding-end: 16px;\n}\n\n.profile-card[_ngcontent-%COMP%] {\n  margin: 20px 0;\n  border-radius: 16px;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);\n  overflow: hidden;\n  background: #141414;\n  border: 1px solid #252525;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .profile-card[_ngcontent-%COMP%] {\n  background: #141414;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);\n  border-color: #252525;\n}\n.profile-card.highlight-card[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_highlight-card 2.5s ease-in-out forwards !important;\n}\n.profile-card.highlight-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%], .profile-card.highlight-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  background: transparent !important;\n}\n.profile-card.highlight-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]::before {\n  background: var(--ion-color-warning) !important;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {\n  background: #141414;\n  padding: 24px 24px 20px 24px;\n  position: relative;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .profile-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {\n  background: #141414;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 3px;\n  background: linear-gradient(90deg, var(--ion-color-primary) 0%, var(--ion-color-primary-shade) 100%);\n  border-radius: 8px 8px 0 0;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  font-weight: 700;\n  letter-spacing: 0.5px;\n  text-transform: uppercase;\n  margin-bottom: 8px;\n  color: var(--ion-color-primary-contrast);\n  display: flex;\n  align-items: center;\n  line-height: 1.3;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .profile-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary-contrast);\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 400;\n  line-height: 1.4;\n  color: var(--ion-color-medium);\n  margin: 0;\n  padding-left: 32px;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .profile-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-subtitle[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   .section-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  margin-right: 10px;\n  color: var(--ion-color-primary);\n  flex-shrink: 0;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .profile-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   .section-icon[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  padding: 24px;\n  background: #141414;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .form-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .input-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n@media (max-width: 768px) {\n  .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .input-row[_ngcontent-%COMP%] {\n    gap: 12px;\n  }\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .input-group.full-width[_ngcontent-%COMP%] {\n  flex: 1 1 100%;\n}\n@media (max-width: 768px) {\n  .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .input-group[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: calc(50% - 6px);\n    max-width: calc(50% - 6px);\n  }\n  .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .input-group.full-width[_ngcontent-%COMP%] {\n    flex: 1 1 100%;\n    min-width: 100%;\n    max-width: 100%;\n  }\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .input-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--pe-text, #e5e7eb);\n  margin-bottom: 6px;\n  letter-spacing: 0.025em;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .input-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .modern-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 16px;\n  padding-right: 44px;\n  border: 2px solid #252525;\n  border-radius: 10px;\n  background: #0e0e0e;\n  color: var(--ion-color-primary-contrast);\n  font-size: 0.95rem;\n  font-weight: 400;\n  transition: all 0.2s ease;\n  outline: none;\n}\n@media (max-width: 768px) {\n  .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .modern-input[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n    padding-right: 38px;\n    font-size: 0.9rem;\n  }\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .modern-input[_ngcontent-%COMP%]::placeholder {\n  color: var(--ion-color-medium);\n  font-style: italic;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .modern-input[_ngcontent-%COMP%]:focus {\n  border-color: var(--ion-color-primary);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  background: #0e0e0e;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .informative-badge[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  padding: 14px 16px;\n  background: rgba(255, 255, 255, 0.04);\n  border-radius: 12px;\n  margin-top: 4px;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .informative-badge[_ngcontent-%COMP%]   .badge-icon[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: var(--ion-color-primary);\n  opacity: 0.8;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .informative-badge[_ngcontent-%COMP%]   .badge-text[_ngcontent-%COMP%] {\n  color: var(--pe-text-muted, #9ca3af);\n  font-size: 0.95rem;\n  font-weight: 500;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .select-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .modern-select[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 12px 16px;\n  padding-right: 44px;\n  border: 2px solid #252525;\n  border-radius: 10px;\n  background: #0e0e0e;\n  color: var(--ion-color-primary-contrast);\n  font-size: 0.95rem;\n  font-weight: 400;\n  transition: all 0.2s ease;\n  outline: none;\n  -webkit-appearance: none;\n          appearance: none;\n  cursor: pointer;\n}\n@media (max-width: 768px) {\n  .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .modern-select[_ngcontent-%COMP%] {\n    padding: 10px 12px;\n    padding-right: 38px;\n    font-size: 0.9rem;\n  }\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .modern-select[_ngcontent-%COMP%]:focus {\n  border-color: var(--ion-color-primary);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n  background: #0e0e0e;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .modern-select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  background: #0e0e0e;\n  color: var(--ion-color-primary-contrast);\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .input-icon[_ngcontent-%COMP%], .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .select-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 14px;\n  font-size: 1.1rem;\n  color: var(--pe-muted, #9ca3af);\n  pointer-events: none;\n  z-index: 1;\n}\n@media (max-width: 768px) {\n  .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .input-icon[_ngcontent-%COMP%], .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .select-icon[_ngcontent-%COMP%] {\n    right: 10px;\n    font-size: 1rem;\n  }\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .datetime-enhanced-wrapper[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .datetime-display[_ngcontent-%COMP%] {\n  width: 100%;\n  background: #0e0e0e;\n  color: var(--ion-color-primary-contrast);\n  border: 2px solid #252525;\n  border-radius: 10px;\n  padding: 12px 44px 12px 16px;\n  font-size: 0.95rem;\n  font-weight: 400;\n  cursor: pointer;\n  transition: all 0.2s ease;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  min-height: 48px;\n}\n@media (max-width: 768px) {\n  .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .datetime-display[_ngcontent-%COMP%] {\n    padding: 10px 38px 10px 12px;\n    font-size: 0.9rem;\n    min-height: 44px;\n  }\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .datetime-display[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--pe-accent, #3b82f6);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .date-text[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .date-text.placeholder[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium);\n  font-style: italic;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .age-indicator[_ngcontent-%COMP%] {\n  background: rgba(var(--ion-color-primary-rgb), 0.2);\n  color: var(--ion-color-primary);\n  padding: 4px 8px;\n  border-radius: 6px;\n  font-size: 0.8rem;\n  font-weight: 500;\n  margin-left: 8px;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .age-text[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .calendar-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  right: 12px;\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--pe-text-muted, #9ca3af);\n  font-size: 1.2rem;\n  pointer-events: none;\n  z-index: 2;\n}\n@media (max-width: 768px) {\n  .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .calendar-icon[_ngcontent-%COMP%] {\n    right: 10px;\n    font-size: 1.1rem;\n  }\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .hidden-datetime-button[_ngcontent-%COMP%] {\n  display: none;\n}\n\n[_ngcontent-%COMP%]:root   .profile-card[_ngcontent-%COMP%] {\n  background: #ffffff;\n}\n[_ngcontent-%COMP%]:root   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  background: #ffffff;\n}\n[_ngcontent-%COMP%]:root   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .input-label[_ngcontent-%COMP%] {\n  color: var(--ion-color-dark);\n}\n[_ngcontent-%COMP%]:root   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .modern-input[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  color: var(--ion-color-dark);\n  border-color: #e2e8f0;\n}\n[_ngcontent-%COMP%]:root   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .modern-input[_ngcontent-%COMP%]::placeholder {\n  color: #64748b;\n}\n[_ngcontent-%COMP%]:root   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .modern-input[_ngcontent-%COMP%]:focus {\n  background: #ffffff;\n  border-color: var(--ion-color-primary);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n[_ngcontent-%COMP%]:root   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .modern-select[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  color: var(--ion-color-dark);\n  border-color: #e2e8f0;\n}\n[_ngcontent-%COMP%]:root   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .modern-select[_ngcontent-%COMP%]:focus {\n  background: #ffffff;\n  border-color: var(--ion-color-primary);\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);\n}\n[_ngcontent-%COMP%]:root   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .modern-select[_ngcontent-%COMP%]   option[_ngcontent-%COMP%] {\n  background: #ffffff;\n  color: var(--ion-color-dark);\n}\n[_ngcontent-%COMP%]:root   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .input-icon[_ngcontent-%COMP%], [_ngcontent-%COMP%]:root   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .select-icon[_ngcontent-%COMP%] {\n  color: #64748b;\n}\n[_ngcontent-%COMP%]:root   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .datetime-display[_ngcontent-%COMP%] {\n  background: #f8fafc !important;\n  color: #111827 !important;\n  border-color: #d1d5db !important;\n}\n[_ngcontent-%COMP%]:root   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .datetime-display[_ngcontent-%COMP%]:focus-within {\n  border-color: #3b82f6 !important;\n  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;\n}\n[_ngcontent-%COMP%]:root   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .datetime-display[_ngcontent-%COMP%]   .date-text.placeholder[_ngcontent-%COMP%] {\n  color: #6b7280 !important;\n}\n[_ngcontent-%COMP%]:root   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .calendar-icon[_ngcontent-%COMP%] {\n  color: #6b7280 !important;\n}\n[_ngcontent-%COMP%]:root   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .age-indicator[_ngcontent-%COMP%] {\n  background: #3b82f6 !important;\n  color: white !important;\n}\n\nbody[color-theme=dark][_ngcontent-%COMP%]   .profile-card[_ngcontent-%COMP%] {\n  background: #1f2937;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  background: #1f2937;\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n  --color: var(--pe-text, #ffffff);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  color: var(--pe-text, #ffffff);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n  --background: var(--pe-bg-secondary, var(--ion-color-step-100));\n  --color: var(--pe-text, #ffffff);\n  border: 1px solid var(--pe-border, var(--ion-color-step-200));\n}\n\n.activity-section[_ngcontent-%COMP%], .training-section[_ngcontent-%COMP%] {\n  margin: 24px 0;\n  padding: 0;\n}\n.activity-section[_ngcontent-%COMP%]   .section-label[_ngcontent-%COMP%], .training-section[_ngcontent-%COMP%]   .section-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n  margin-bottom: 16px;\n  padding-left: 4px;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .activity-section[_ngcontent-%COMP%]   .section-label[_ngcontent-%COMP%], [data-theme=dark][_ngcontent-%COMP%]   .training-section[_ngcontent-%COMP%]   .section-label[_ngcontent-%COMP%] {\n  color: var(--ion-color-light);\n}\n\n.info-card[_ngcontent-%COMP%] {\n  margin: 16px 0 20px 0;\n  border-radius: 12px;\n  background: linear-gradient(135deg, rgba(var(--ion-color-primary-rgb), 0.05) 0%, rgba(var(--ion-color-primary-rgb), 0.02) 100%);\n  border: 1px solid rgba(var(--ion-color-primary-rgb), 0.1);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);\n}\n.info-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n  padding: 16px 20px;\n  background: transparent;\n}\n.info-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .info-title[_ngcontent-%COMP%] {\n  font-size: 1rem;\n  font-weight: 600;\n  color: var(--ion-color-primary);\n  margin-bottom: 8px;\n  display: block;\n}\n.info-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .info-description[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  line-height: 1.5;\n  color: var(--ion-color-medium);\n  margin: 0;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   .info-description[_ngcontent-%COMP%] {\n  color: var(--ion-color-medium-tint);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .info-card[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, rgba(var(--ion-color-primary-rgb), 0.08) 0%, rgba(var(--ion-color-primary-rgb), 0.04) 100%);\n  border-color: rgba(var(--ion-color-primary-rgb), 0.15);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);\n}\n\n.custom-radio-group[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 12px;\n  margin: 20px 0;\n}\n@media (max-width: 768px) {\n  .custom-radio-group[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 10px;\n  }\n}\n.custom-radio-group[_ngcontent-%COMP%]   .radio-item[_ngcontent-%COMP%] {\n  --background: var(--ion-color-light);\n  --border-radius: 12px;\n  --padding-start: 18px;\n  --padding-end: 18px;\n  --min-height: 56px;\n  margin: 0;\n  border: 2px solid rgba(var(--ion-color-primary-rgb), 0.1);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  cursor: pointer;\n}\n.custom-radio-group[_ngcontent-%COMP%]   .radio-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  font-size: 0.95rem;\n  font-weight: 500;\n  color: var(--ion-color-dark);\n  line-height: 1.4;\n}\n.custom-radio-group[_ngcontent-%COMP%]   .radio-item[_ngcontent-%COMP%]   ion-radio[_ngcontent-%COMP%] {\n  --color: var(--ion-color-primary);\n  --color-checked: var(--ion-color-primary);\n  margin-left: auto;\n}\n.custom-radio-group[_ngcontent-%COMP%]   .radio-item.item-radio-checked[_ngcontent-%COMP%] {\n  --background: rgba(var(--ion-color-primary-rgb), 0.08);\n  border-color: var(--ion-color-primary);\n  box-shadow: 0 0 0 1px rgba(var(--ion-color-primary-rgb), 0.2);\n}\n.custom-radio-group[_ngcontent-%COMP%]   .radio-item.item-radio-checked[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary);\n  font-weight: 600;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .custom-radio-group[_ngcontent-%COMP%]   .radio-item[_ngcontent-%COMP%] {\n  --background: var(--ion-color-dark-tint);\n  border-color: rgba(var(--ion-color-primary-rgb), 0.15);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .custom-radio-group[_ngcontent-%COMP%]   .radio-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  color: white;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .custom-radio-group[_ngcontent-%COMP%]   .radio-item.item-radio-checked[_ngcontent-%COMP%] {\n  --background: rgba(var(--ion-color-primary-rgb), 0.12);\n}\n[data-theme=dark][_ngcontent-%COMP%]   .custom-radio-group[_ngcontent-%COMP%]   .radio-item.item-radio-checked[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  color: var(--ion-color-primary-tint);\n}\n\n.section-label[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1.1rem;\n  font-weight: 600;\n  color: var(--ion-color-dark);\n  margin: 24px 0 16px 0;\n  padding-left: 4px;\n}\n[data-theme=dark][_ngcontent-%COMP%]   .section-label[_ngcontent-%COMP%] {\n  color: var(--ion-color-light);\n}\n\n.macro-summary[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, var(--ion-color-tertiary-tint) 0%, var(--ion-color-tertiary) 100%);\n  border-radius: var(--pe-radius, 16px);\n  padding: 20px;\n  margin: 16px 0;\n  border: 1px solid var(--pe-border-2, var(--ion-color-step-300));\n}\n.macro-summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: var(--ion-color-tertiary-contrast);\n  margin-bottom: 16px;\n  font-weight: 600;\n  text-align: center;\n}\n.macro-summary[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 12px 0;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.2);\n}\n.macro-summary[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.macro-summary[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%]   .macro-label[_ngcontent-%COMP%] {\n  color: var(--ion-color-tertiary-contrast);\n  font-weight: 500;\n  display: flex;\n  align-items: center;\n}\n.macro-summary[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%]   .macro-label[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  margin-right: 8px;\n  font-size: 1.2rem;\n}\n.macro-summary[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%]   .macro-value[_ngcontent-%COMP%] {\n  color: var(--ion-color-tertiary-contrast);\n  font-weight: 600;\n  font-size: 1.1rem;\n}\n\n[_ngcontent-%COMP%]:root   .macro-summary[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, var(--ion-color-tertiary-tint) 0%, var(--ion-color-tertiary) 100%);\n  border: 1px solid var(--ion-color-light-shade);\n}\n[_ngcontent-%COMP%]:root   .macro-summary[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%] {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.1);\n}\n\nbody[color-theme=dark][_ngcontent-%COMP%]   .macro-summary[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, var(--pe-bg-tertiary, #374151) 0%, var(--pe-card-2, #232f3f) 100%);\n  border: 1px solid var(--pe-border-2, var(--ion-color-step-300));\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .macro-summary[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: var(--pe-text, #ffffff);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .macro-summary[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%] {\n  border-bottom: 1px solid var(--pe-border, rgba(255, 255, 255, 0.1));\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .macro-summary[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%]   .macro-label[_ngcontent-%COMP%] {\n  color: var(--pe-text, #ffffff);\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .macro-summary[_ngcontent-%COMP%]   .macro-item[_ngcontent-%COMP%]   .macro-value[_ngcontent-%COMP%] {\n  color: var(--pe-accent, var(--ion-color-primary));\n}\n\nion-range[_ngcontent-%COMP%] {\n  --bar-background: var(--pe-border, var(--ion-color-light-shade));\n  --bar-background-active: var(--pe-accent, var(--ion-color-primary));\n  --knob-background: var(--pe-accent, var(--ion-color-primary));\n  --knob-size: 24px;\n  --bar-height: 6px;\n  --knob-box-shadow: none;\n  margin: 20px 0;\n}\n\n[_ngcontent-%COMP%]:root   ion-range[_ngcontent-%COMP%] {\n  --bar-background: var(--ion-color-light-shade);\n  --bar-background-active: var(--ion-color-primary);\n  --knob-background: var(--ion-color-primary);\n  --knob-box-shadow: none;\n}\n\nbody[color-theme=dark][_ngcontent-%COMP%]   ion-range[_ngcontent-%COMP%] {\n  --bar-background: var(--pe-border, var(--ion-color-step-200));\n  --bar-background-active: var(--pe-accent, var(--ion-color-primary));\n  --knob-background: var(--pe-accent, var(--ion-color-primary));\n  --knob-box-shadow: none;\n}\n\nion-modal.datetime-modal[_ngcontent-%COMP%] {\n  --height: auto;\n  --border-radius: 16px;\n  --box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);\n}\n\n@media (max-width: 768px) {\n  .profile-card[_ngcontent-%COMP%] {\n    margin: 12px 0;\n  }\n  .profile-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%] {\n    padding: 20px 16px 16px 16px;\n  }\n  .profile-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-title[_ngcontent-%COMP%] {\n    font-size: 1rem;\n    letter-spacing: 0.3px;\n  }\n  .profile-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   ion-card-subtitle[_ngcontent-%COMP%] {\n    font-size: 0.8rem;\n    padding-left: 28px;\n  }\n  .profile-card[_ngcontent-%COMP%]   ion-card-header[_ngcontent-%COMP%]   .section-icon[_ngcontent-%COMP%] {\n    font-size: 1.1rem;\n    margin-right: 8px;\n  }\n  .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .macro-summary[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  ion-radio-group[_ngcontent-%COMP%] {\n    gap: 8px;\n  }\n  ion-radio-group[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n    margin: 2px;\n    --padding-start: 12px;\n    --padding-end: 12px;\n  }\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n  font-weight: 400;\n}\n.profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]::placeholder {\n  font-style: italic;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .profile-card[_ngcontent-%COMP%], ion-radio-group[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n    transition: none;\n  }\n}\n@media (prefers-contrast: high) {\n  .profile-card[_ngcontent-%COMP%] {\n    border-width: 2px;\n  }\n  .profile-card[_ngcontent-%COMP%]   ion-card-content[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%] {\n    border-width: 2px;\n  }\n  ion-radio-group[_ngcontent-%COMP%]   ion-item[_ngcontent-%COMP%] {\n    border-width: 2px;\n  }\n}\n  ion-modal.modal-default.show-modal ~ ion-modal.modal-default {\n  --backdrop-opacity: 0.5;\n}\n\n.kpi[_ngcontent-%COMP%] {\n  border: 1px solid var(--ion-color-step-200, #374151);\n  background: var(--ion-color-step-50, #14171c);\n  border-radius: 12px;\n  padding: 10px;\n}\n.kpi[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: var(--ion-color-medium, #9ca3af);\n}\n.kpi[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 900;\n  margin-top: 4px;\n  color: var(--ion-color-dark, #ffffff);\n}\n\n[_ngcontent-%COMP%]:root   .kpi[_ngcontent-%COMP%] {\n  background: #f8fafc;\n  border-color: #e2e8f0;\n}\n[_ngcontent-%COMP%]:root   .kpi[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  color: #64748b;\n}\n[_ngcontent-%COMP%]:root   .kpi[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: #1e293b;\n}\n\nbody[color-theme=dark][_ngcontent-%COMP%]   .kpi[_ngcontent-%COMP%] {\n  background: #14171c;\n  border-color: #374151;\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .kpi[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n  color: #9ca3af;\n}\nbody[color-theme=dark][_ngcontent-%COMP%]   .kpi[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n  color: #ffffff;\n}\n\n.macros-summary[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 12px;\n}\n\n@media (max-width: 480px) {\n  .macros-summary[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n    gap: 8px;\n  }\n  .kpi[_ngcontent-%COMP%] {\n    padding: 8px;\n  }\n  .kpi[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n    font-size: 11px;\n  }\n  .kpi[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n    font-size: 16px;\n  }\n}\n@media (max-width: 320px) {\n  .macros-summary[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 6px;\n  }\n  .kpi[_ngcontent-%COMP%] {\n    padding: 6px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n  .kpi[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%] {\n    font-size: 12px;\n    margin-bottom: 0;\n  }\n  .kpi[_ngcontent-%COMP%]   .value[_ngcontent-%COMP%] {\n    font-size: 16px;\n    margin-top: 0;\n  }\n}\n  .action-sheet-button-inner {\n  color: white !important;\n}\n\n  .action-sheet-selected .action-sheet-button-inner {\n  color: var(--ion-color-primary) !important;\n}\n\n  ion-action-sheet .action-sheet-cancel {\n  color: white !important;\n}\n\n@keyframes _ngcontent-%COMP%_highlight-card {\n  0% {\n    background-color: rgba(var(--ion-color-warning-rgb), 0.6);\n    border-color: rgba(var(--ion-color-warning-rgb), 1);\n  }\n  100% {\n    background-color: #141414;\n    border-color: #252525;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uLy4uLy4uL3BhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy9zcmMvYXBwL2ZlYXR1cmVzL3Byb2ZpbGUvY29tcG9uZW50cy9jb25maWd1cmF0aW9uL2NvbXBvbmVudHMvZWRpdG9yL2VkaXRvci5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSx1QkFBQTtFQUNBLFVBQUE7RUFDQSxXQUFBO0FBQ0Y7O0FBRUE7RUFDRSxvQ0FBQTtFQUNBLDhCQUFBO0VBQ0EsNENBQUE7RUFDQSxxQkFBQTtFQUNBLGFBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0FBQ0Y7O0FBR0E7RUFDRSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSwwQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSx5QkFBQTtFQUNBLGlEQUFBO0FBQUY7QUFFRTtFQUNFLG1CQUFBO0VBQ0EsMENBQUE7RUFDQSxxQkFBQTtBQUFKO0FBR0U7RUFDRSw4REFBQTtBQURKO0FBR0k7O0VBRUUsa0NBQUE7QUFETjtBQUlJO0VBQ0UsK0NBQUE7QUFGTjtBQU1FO0VBQ0UsbUJBQUE7RUFFQSw0QkFBQTtFQUNBLGtCQUFBO0FBTEo7QUFPSTtFQUNFLG1CQUFBO0FBTE47QUFRSTtFQUNFLFdBQUE7RUFDQSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLFdBQUE7RUFDQSxvR0FBQTtFQUNBLDBCQUFBO0FBTk47QUFTSTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSx3Q0FBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FBUE47QUFTTTtFQUNFLHdDQUFBO0FBUFI7QUFXSTtFQUNFLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxnQkFBQTtFQUNBLDhCQUFBO0VBQ0EsU0FBQTtFQUNBLGtCQUFBO0FBVE47QUFXTTtFQUNFLDhCQUFBO0FBVFI7QUFhSTtFQUNFLGtCQUFBO0VB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bEpGO0VBcUpBO0lBQ0UsWUFBQTtJQUNBLGFBQUE7SUFDQSw4QkFBQTtJQUNBLG1CQUFBO0VBbkpGO0VBcUpFO0lBQ0UsZUFBQTtJQUNBLGdCQUFBO0VBbkpKO0VBc0pFO0lBQ0UsZUFBQTtJQUNBLGFBQUE7RUFwSko7QUFDRjtBQXdKQTtFQUNFLHVCQUFBO0FBdEpGOztBQXlKQTtFQUNFLDBDQUFBO0FBdEpGOztBQXlKQTtFQUNFLHVCQUFBO0FBdEpGOztBQXlKQTtFQUNFO0lBQ0UseURBQUE7SUFDQSxtREFBQTtFQXRKRjtFQXdKQTtJQUNFLHlCQUFBO0lBQ0EscUJBQUE7RUF0SkY7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbImlvbi1saXN0IHtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogN3B4O1xufVxuXG4udG9wLWlucHV0IHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAtLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gIC0tcGxhY2Vob2xkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAtLWJvcmRlci1yYWRpdXM6IDEycHg7XG4gIG1hcmdpbjogOHB4IDA7XG4gIC0tcGFkZGluZy1zdGFydDogMTZweDtcbiAgLS1wYWRkaW5nLWVuZDogMTZweDtcbn1cblxuLy8gRXN0aWxvcyBwYXJhIGxhcyBjYXJkcyBkZWwgcGVyZmlsXG4ucHJvZmlsZS1jYXJkIHtcbiAgbWFyZ2luOiAyMHB4IDA7XG4gIGJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjA4KTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgYmFja2dyb3VuZDogIzE0MTQxNDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzI1MjUyNTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgY3ViaWMtYmV6aWVyKDAuNCwgMCwgMC4yLCAxKTtcblxuICBbZGF0YS10aGVtZT1cImRhcmtcIl0gJiB7XG4gICAgYmFja2dyb3VuZDogIzE0MTQxNDtcbiAgICBib3gtc2hhZG93OiAwIDRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4yNSk7XG4gICAgYm9yZGVyLWNvbG9yOiAjMjUyNTI1O1xuICB9XG5cbiAgJi5oaWdobGlnaHQtY2FyZCB7XG4gICAgYW5pbWF0aW9uOiBoaWdobGlnaHQtY2FyZCAyLjVzIGVhc2UtaW4tb3V0IGZvcndhcmRzICFpbXBvcnRhbnQ7XG5cbiAgICBpb24tY2FyZC1oZWFkZXIsXG4gICAgaW9uLWNhcmQtY29udGVudCB7XG4gICAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIGlvbi1jYXJkLWhlYWRlcjo6YmVmb3JlIHtcbiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci13YXJuaW5nKSAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxuXG4gIGlvbi1jYXJkLWhlYWRlciB7XG4gICAgYmFja2dyb3VuZDogIzE0MTQxNDtcblxuICAgIHBhZGRpbmc6IDI0cHggMjRweCAyMHB4IDI0cHg7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICAgW2RhdGEtdGhlbWU9XCJkYXJrXCJdICYge1xuICAgICAgYmFja2dyb3VuZDogIzE0MTQxNDtcbiAgICB9XG5cbiAgICAmOjpiZWZvcmUge1xuICAgICAgY29udGVudDogXCJcIjtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogMDtcbiAgICAgIGxlZnQ6IDA7XG4gICAgICByaWdodDogMDtcbiAgICAgIGhlaWdodDogM3B4O1xuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDkwZGVnLCB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSkgMCUsIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXNoYWRlKSAxMDAlKTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDhweCA4cHggMCAwO1xuICAgIH1cblxuICAgIGlvbi1jYXJkLXRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4xcmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAwLjVweDtcbiAgICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgICBtYXJnaW4tYm90dG9tOiA4cHg7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBsaW5lLWhlaWdodDogMS4zO1xuXG4gICAgICBbZGF0YS10aGVtZT1cImRhcmtcIl0gJiB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaW9uLWNhcmQtc3VidGl0bGUge1xuICAgICAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICBsaW5lLWhlaWdodDogMS40O1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgbWFyZ2luOiAwO1xuICAgICAgcGFkZGluZy1sZWZ0OiAzMnB4O1xuXG4gICAgICBbZGF0YS10aGVtZT1cImRhcmtcIl0gJiB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAuc2VjdGlvbi1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgICAgIG1hcmdpbi1yaWdodDogMTBweDtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICBmbGV4LXNocmluazogMDtcblxuICAgICAgW2RhdGEtdGhlbWU9XCJkYXJrXCJdICYge1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgIHBhZGRpbmc6IDI0cHg7XG4gICAgYmFja2dyb3VuZDogIzE0MTQxNDtcblxuICAgIC5mb3JtLWNvbnRhaW5lciB7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgIGdhcDogMjBweDtcbiAgICB9XG5cbiAgICAuaW5wdXQtcm93IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDE2cHg7XG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XG5cbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgICAgICBnYXA6IDEycHg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmlucHV0LWdyb3VwIHtcbiAgICAgIGZsZXg6IDE7XG4gICAgICBtaW4td2lkdGg6IDA7XG5cbiAgICAgICYuZnVsbC13aWR0aCB7XG4gICAgICAgIGZsZXg6IDEgMSAxMDAlO1xuICAgICAgfVxuXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICAgICAgZmxleDogMTtcbiAgICAgICAgbWluLXdpZHRoOiBjYWxjKDUwJSAtIDZweCk7XG4gICAgICAgIG1heC13aWR0aDogY2FsYyg1MCUgLSA2cHgpO1xuXG4gICAgICAgICYuZnVsbC13aWR0aCB7XG4gICAgICAgICAgZmxleDogMSAxIDEwMCU7XG4gICAgICAgICAgbWluLXdpZHRoOiAxMDAlO1xuICAgICAgICAgIG1heC13aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC5pbnB1dC1sYWJlbCB7XG4gICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgY29sb3I6IHZhcigtLXBlLXRleHQsICNlNWU3ZWIpO1xuICAgICAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICAgICAgbGV0dGVyLXNwYWNpbmc6IDAuMDI1ZW07XG4gICAgfVxuXG4gICAgLmlucHV0LXdyYXBwZXIge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLm1vZGVybi1pbnB1dCB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIHBhZGRpbmc6IDEycHggMTZweDtcbiAgICAgIHBhZGRpbmctcmlnaHQ6IDQ0cHg7XG4gICAgICBib3JkZXI6IDJweCBzb2xpZCAjMjUyNTI1O1xuICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgIGJhY2tncm91bmQ6ICMwZTBlMGU7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnktY29udHJhc3QpO1xuICAgICAgZm9udC1zaXplOiAwLjk1cmVtO1xuICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG4gICAgICBvdXRsaW5lOiBub25lO1xuXG4gICAgICBAbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgICAgICAgcGFkZGluZzogMTBweCAxMnB4O1xuICAgICAgICBwYWRkaW5nLXJpZ2h0OiAzOHB4O1xuICAgICAgICBmb250LXNpemU6IDAuOXJlbTtcbiAgICAgIH1cblxuICAgICAgJjo6cGxhY2Vob2xkZXIge1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLW1lZGl1bSk7XG4gICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgIH1cblxuICAgICAgJjpmb2N1cyB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSg1OSwgMTMwLCAyNDYsIDAuMSk7XG4gICAgICAgIGJhY2tncm91bmQ6ICMwZTBlMGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmluZm9ybWF0aXZlLWJhZGdlIHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgZ2FwOiAxMnB4O1xuICAgICAgcGFkZGluZzogMTRweCAxNnB4O1xuICAgICAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA0KTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICBtYXJnaW4tdG9wOiA0cHg7XG5cbiAgICAgIC5iYWRnZS1pY29uIHtcbiAgICAgICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgIG9wYWNpdHk6IDAuODtcbiAgICAgIH1cblxuICAgICAgLmJhZGdlLXRleHQge1xuICAgICAgICBjb2xvcjogdmFyKC0tcGUtdGV4dC1tdXRlZCwgIzljYTNhZik7XG4gICAgICAgIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAuc2VsZWN0LXdyYXBwZXIge1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgfVxuXG4gICAgLm1vZGVybi1zZWxlY3Qge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gICAgICBwYWRkaW5nLXJpZ2h0OiA0NHB4O1xuICAgICAgYm9yZGVyOiAycHggc29saWQgIzI1MjUyNTtcbiAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICBiYWNrZ3JvdW5kOiAjMGUwZTBlO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcbiAgICAgIGZvbnQtc2l6ZTogMC45NXJlbTtcblxuICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgICAgIHBhZGRpbmc6IDEwcHggMTJweDtcbiAgICAgICAgcGFkZGluZy1yaWdodDogMzhweDtcbiAgICAgICAgZm9udC1zaXplOiAwLjlyZW07XG4gICAgICB9XG4gICAgICBmb250LXdlaWdodDogNDAwO1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgICAgIG91dGxpbmU6IG5vbmU7XG4gICAgICBhcHBlYXJhbmNlOiBub25lO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICAgICAmOmZvY3VzIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDU5LCAxMzAsIDI0NiwgMC4xKTtcbiAgICAgICAgYmFja2dyb3VuZDogIzBlMGUwZTtcbiAgICAgIH1cblxuICAgICAgb3B0aW9uIHtcbiAgICAgICAgYmFja2dyb3VuZDogIzBlMGUwZTtcbiAgICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LWNvbnRyYXN0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAuaW5wdXQtaWNvbixcbiAgICAuc2VsZWN0LWljb24ge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgcmlnaHQ6IDE0cHg7XG4gICAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICAgIGNvbG9yOiB2YXIoLS1wZS1tdXRlZCwgIzljYTNhZik7XG4gICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgIHotaW5kZXg6IDE7XG5cbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgICAgICByaWdodDogMTBweDtcbiAgICAgICAgZm9udC1zaXplOiAxcmVtO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5kYXRldGltZS1lbmhhbmNlZC13cmFwcGVyIHtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIH1cblxuICAgIC5kYXRldGltZS1kaXNwbGF5IHtcbiAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgYmFja2dyb3VuZDogIzBlMGUwZTtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1jb250cmFzdCk7XG4gICAgICBib3JkZXI6IDJweCBzb2xpZCAjMjUyNTI1O1xuICAgICAgYm9yZGVyLXJhZGl1czogMTBweDtcbiAgICAgIHBhZGRpbmc6IDEycHggNDRweCAxMnB4IDE2cHg7XG4gICAgICBmb250LXNpemU6IDAuOTVyZW07XG4gICAgICBmb250LXdlaWdodDogNDAwO1xuICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgbWluLWhlaWdodDogNDhweDtcblxuICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgICAgIHBhZGRpbmc6IDEwcHggMzhweCAxMHB4IDEycHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgICAgICBtaW4taGVpZ2h0OiA0NHB4O1xuICAgICAgfVxuXG4gICAgICAmOmZvY3VzLXdpdGhpbiB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0tcGUtYWNjZW50LCAjM2I4MmY2KTtcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEoNTksIDEzMCwgMjQ2LCAwLjEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5kYXRlLXRleHQge1xuICAgICAgZmxleDogMTtcblxuICAgICAgJi5wbGFjZWhvbGRlciB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtKTtcbiAgICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5hZ2UtaW5kaWNhdG9yIHtcbiAgICAgIGJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4yKTtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICBwYWRkaW5nOiA0cHggOHB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogNnB4O1xuICAgICAgZm9udC1zaXplOiAwLjhyZW07XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgbWFyZ2luLWxlZnQ6IDhweDtcbiAgICB9XG5cbiAgICAuYWdlLXRleHQge1xuICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICB9XG5cbiAgICAuY2FsZW5kYXItaWNvbiB7XG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICByaWdodDogMTJweDtcbiAgICAgIHRvcDogNTAlO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICAgICAgY29sb3I6IHZhcigtLXBlLXRleHQtbXV0ZWQsICM5Y2EzYWYpO1xuICAgICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgICAgIHotaW5kZXg6IDI7XG5cbiAgICAgIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgICAgICByaWdodDogMTBweDtcbiAgICAgICAgZm9udC1zaXplOiAxLjFyZW07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLmhpZGRlbi1kYXRldGltZS1idXR0b24ge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cbn1cblxuLy8gVGVtYSBjbGFybyBlc3BlY8ODwq1maWNvXG46cm9vdCAucHJvZmlsZS1jYXJkIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcblxuICBpb24tY2FyZC1jb250ZW50IHtcbiAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuXG4gICAgLmlucHV0LWxhYmVsIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgfVxuXG4gICAgLm1vZGVybi1pbnB1dCB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjhmYWZjO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1kYXJrKTtcbiAgICAgIGJvcmRlci1jb2xvcjogI2UyZThmMDtcblxuICAgICAgJjo6cGxhY2Vob2xkZXIge1xuICAgICAgICBjb2xvcjogIzY0NzQ4YjtcbiAgICAgIH1cblxuICAgICAgJjpmb2N1cyB7XG4gICAgICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XG4gICAgICAgIGJvcmRlci1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgICBib3gtc2hhZG93OiAwIDAgMCAzcHggcmdiYSg1OSwgMTMwLCAyNDYsIDAuMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLm1vZGVybi1zZWxlY3Qge1xuICAgICAgYmFja2dyb3VuZDogI2Y4ZmFmYztcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgICBib3JkZXItY29sb3I6ICNlMmU4ZjA7XG5cbiAgICAgICY6Zm9jdXMge1xuICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICAgICAgICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgICAgYm94LXNoYWRvdzogMCAwIDAgM3B4IHJnYmEoNTksIDEzMCwgMjQ2LCAwLjEpO1xuICAgICAgfVxuXG4gICAgICBvcHRpb24ge1xuICAgICAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICAgICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5pbnB1dC1pY29uLFxuICAgIC5zZWxlY3QtaWNvbiB7XG4gICAgICBjb2xvcjogIzY0NzQ4YjtcbiAgICB9XG5cbiAgICAuZGF0ZXRpbWUtZGlzcGxheSB7XG4gICAgICBiYWNrZ3JvdW5kOiAjZjhmYWZjICFpbXBvcnRhbnQ7XG4gICAgICBjb2xvcjogIzExMTgyNyAhaW1wb3J0YW50O1xuICAgICAgYm9yZGVyLWNvbG9yOiAjZDFkNWRiICFpbXBvcnRhbnQ7XG5cbiAgICAgICY6Zm9jdXMtd2l0aGluIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAjM2I4MmY2ICFpbXBvcnRhbnQ7XG4gICAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDNweCByZ2JhKDU5LCAxMzAsIDI0NiwgMC4xKSAhaW1wb3J0YW50O1xuICAgICAgfVxuXG4gICAgICAuZGF0ZS10ZXh0LnBsYWNlaG9sZGVyIHtcbiAgICAgICAgY29sb3I6ICM2YjcyODAgIWltcG9ydGFudDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAuY2FsZW5kYXItaWNvbiB7XG4gICAgICBjb2xvcjogIzZiNzI4MCAhaW1wb3J0YW50O1xuICAgIH1cblxuICAgIC5hZ2UtaW5kaWNhdG9yIHtcbiAgICAgIGJhY2tncm91bmQ6ICMzYjgyZjYgIWltcG9ydGFudDtcbiAgICAgIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xuICAgIH1cbiAgfVxufVxuXG4vLyBUZW1hIG9zY3VybyBlc3BlY8ODwq1maWNvXG5ib2R5W2NvbG9yLXRoZW1lPVwiZGFya1wiXSAucHJvZmlsZS1jYXJkIHtcbiAgYmFja2dyb3VuZDogIzFmMjkzNztcbiAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG5cbiAgaW9uLWNhcmQtY29udGVudCB7XG4gICAgYmFja2dyb3VuZDogIzFmMjkzNztcblxuICAgIGlvbi1pdGVtIHtcbiAgICAgIC0tY29sb3I6IHZhcigtLXBlLXRleHQsICNmZmZmZmYpO1xuXG4gICAgICBpb24tbGFiZWwge1xuICAgICAgICBjb2xvcjogdmFyKC0tcGUtdGV4dCwgI2ZmZmZmZik7XG4gICAgICB9XG5cbiAgICAgIGlvbi1pbnB1dCB7XG4gICAgICAgIC0tYmFja2dyb3VuZDogdmFyKC0tcGUtYmctc2Vjb25kYXJ5LCB2YXIoLS1pb24tY29sb3Itc3RlcC0xMDApKTtcbiAgICAgICAgLS1jb2xvcjogdmFyKC0tcGUtdGV4dCwgI2ZmZmZmZik7XG4gICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXBlLWJvcmRlciwgdmFyKC0taW9uLWNvbG9yLXN0ZXAtMjAwKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIEVzdGlsb3MgbWVqb3JhZG9zIHBhcmEgc2VjY2lvbmVzIGRlIGFjdGl2aWRhZFxuLmFjdGl2aXR5LXNlY3Rpb24sXG4udHJhaW5pbmctc2VjdGlvbiB7XG4gIG1hcmdpbjogMjRweCAwO1xuICBwYWRkaW5nOiAwO1xuXG4gIC5zZWN0aW9uLWxhYmVsIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICBmb250LXdlaWdodDogNjAwO1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyayk7XG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDtcbiAgICBwYWRkaW5nLWxlZnQ6IDRweDtcblxuICAgIFtkYXRhLXRoZW1lPVwiZGFya1wiXSAmIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbGlnaHQpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBDYXJkcyBkZSBpbmZvcm1hY2nDg8KzbiBtZWpvcmFkYXNcbi5pbmZvLWNhcmQge1xuICBtYXJnaW46IDE2cHggMCAyMHB4IDA7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcbiAgICAxMzVkZWcsXG4gICAgcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjA1KSAwJSxcbiAgICByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMDIpIDEwMCVcbiAgKTtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjEpO1xuICBib3gtc2hhZG93OiAwIDJweCA4cHggcmdiYSgwLCAwLCAwLCAwLjA0KTtcblxuICBpb24tY2FyZC1jb250ZW50IHtcbiAgICBwYWRkaW5nOiAxNnB4IDIwcHg7XG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG5cbiAgICAuaW5mby10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICBmb250LXdlaWdodDogNjAwO1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDhweDtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIH1cblxuICAgIC5pbmZvLWRlc2NyaXB0aW9uIHtcbiAgICAgIGZvbnQtc2l6ZTogMC44NzVyZW07XG4gICAgICBsaW5lLWhlaWdodDogMS41O1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci1tZWRpdW0pO1xuICAgICAgbWFyZ2luOiAwO1xuXG4gICAgICBbZGF0YS10aGVtZT1cImRhcmtcIl0gJiB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtLXRpbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIFtkYXRhLXRoZW1lPVwiZGFya1wiXSAmIHtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoXG4gICAgICAxMzVkZWcsXG4gICAgICByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMDgpIDAlLFxuICAgICAgcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjA0KSAxMDAlXG4gICAgKTtcbiAgICBib3JkZXItY29sb3I6IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4xNSk7XG4gICAgYm94LXNoYWRvdzogMCAycHggOHB4IHJnYmEoMCwgMCwgMCwgMC4xNSk7XG4gIH1cbn1cblxuLy8gUmFkaW8gZ3JvdXBzIG1lam9yYWRvc1xuLmN1c3RvbS1yYWRpby1ncm91cCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMjgwcHgsIDFmcikpO1xuICBnYXA6IDEycHg7XG4gIG1hcmdpbjogMjBweCAwO1xuXG4gIEBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICAgIGdhcDogMTBweDtcbiAgfVxuXG4gIC5yYWRpby1pdGVtIHtcbiAgICAtLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1saWdodCk7XG4gICAgLS1ib3JkZXItcmFkaXVzOiAxMnB4O1xuICAgIC0tcGFkZGluZy1zdGFydDogMThweDtcbiAgICAtLXBhZGRpbmctZW5kOiAxOHB4O1xuICAgIC0tbWluLWhlaWdodDogNTZweDtcbiAgICBtYXJnaW46IDA7XG4gICAgYm9yZGVyOiAycHggc29saWQgcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjEpO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzIGN1YmljLWJlemllcigwLjQsIDAsIDAuMiwgMSk7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuXG4gICAgaW9uLWxhYmVsIHtcbiAgICAgIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICAgICAgbGluZS1oZWlnaHQ6IDEuNDtcbiAgICB9XG5cbiAgICBpb24tcmFkaW8ge1xuICAgICAgLS1jb2xvcjogdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpO1xuICAgICAgLS1jb2xvci1jaGVja2VkOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICBtYXJnaW4tbGVmdDogYXV0bztcbiAgICB9XG5cbiAgICAmLml0ZW0tcmFkaW8tY2hlY2tlZCB7XG4gICAgICAtLWJhY2tncm91bmQ6IHJnYmEodmFyKC0taW9uLWNvbG9yLXByaW1hcnktcmdiKSwgMC4wOCk7XG4gICAgICBib3JkZXItY29sb3I6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgICAgIGJveC1zaGFkb3c6IDAgMCAwIDFweCByZ2JhKHZhcigtLWlvbi1jb2xvci1wcmltYXJ5LXJnYiksIDAuMik7XG5cbiAgICAgIGlvbi1sYWJlbCB7XG4gICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSk7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgW2RhdGEtdGhlbWU9XCJkYXJrXCJdICYge1xuICAgICAgLS1iYWNrZ3JvdW5kOiB2YXIoLS1pb24tY29sb3ItZGFyay10aW50KTtcbiAgICAgIGJvcmRlci1jb2xvcjogcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjE1KTtcblxuICAgICAgaW9uLWxhYmVsIHtcbiAgICAgICAgY29sb3I6IHdoaXRlO1xuICAgICAgfVxuXG4gICAgICAmLml0ZW0tcmFkaW8tY2hlY2tlZCB7XG4gICAgICAgIC0tYmFja2dyb3VuZDogcmdiYSh2YXIoLS1pb24tY29sb3ItcHJpbWFyeS1yZ2IpLCAwLjEyKTtcblxuICAgICAgICBpb24tbGFiZWwge1xuICAgICAgICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeS10aW50KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBFc3RpbG9zIHBhcmEgbGFiZWxzIGRlIHNlY2Npw4PCs25cbi5zZWN0aW9uLWxhYmVsIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWRhcmspO1xuICBtYXJnaW46IDI0cHggMCAxNnB4IDA7XG4gIHBhZGRpbmctbGVmdDogNHB4O1xuXG4gIFtkYXRhLXRoZW1lPVwiZGFya1wiXSAmIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLWxpZ2h0KTtcbiAgfVxufVxuXG4vLyBFc3RpbG9zIHBhcmEgZWwgcmVzdW1lbiBkZSBtYWNyb3Ncbi5tYWNyby1zdW1tYXJ5IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5LXRpbnQpIDAlLCB2YXIoLS1pb24tY29sb3ItdGVydGlhcnkpIDEwMCUpO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS1wZS1yYWRpdXMsIDE2cHgpO1xuICBwYWRkaW5nOiAyMHB4O1xuICBtYXJnaW46IDE2cHggMDtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tcGUtYm9yZGVyLTIsIHZhcigtLWlvbi1jb2xvci1zdGVwLTMwMCkpO1xuXG4gIGgzIHtcbiAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0KTtcbiAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG5cbiAgLm1hY3JvLWl0ZW0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgcGFkZGluZzogMTJweCAwO1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMik7XG5cbiAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgICB9XG5cbiAgICAubWFjcm8tbGFiZWwge1xuICAgICAgY29sb3I6IHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeS1jb250cmFzdCk7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cbiAgICAgIGlvbi1pY29uIHtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gICAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5tYWNyby12YWx1ZSB7XG4gICAgICBjb2xvcjogdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5LWNvbnRyYXN0KTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgICBmb250LXNpemU6IDEuMXJlbTtcbiAgICB9XG4gIH1cbn1cblxuLy8gTWFjcm8gc3VtbWFyeSB0ZW1hIGNsYXJvXG46cm9vdCAubWFjcm8tc3VtbWFyeSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHZhcigtLWlvbi1jb2xvci10ZXJ0aWFyeS10aW50KSAwJSwgdmFyKC0taW9uLWNvbG9yLXRlcnRpYXJ5KSAxMDAlKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcblxuICAubWFjcm8taXRlbSB7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHJnYmEoMCwgMCwgMCwgMC4xKTtcbiAgfVxufVxuXG4vLyBNYWNybyBzdW1tYXJ5IHRlbWEgb3NjdXJvXG5ib2R5W2NvbG9yLXRoZW1lPVwiZGFya1wiXSAubWFjcm8tc3VtbWFyeSB7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHZhcigtLXBlLWJnLXRlcnRpYXJ5LCAjMzc0MTUxKSAwJSwgdmFyKC0tcGUtY2FyZC0yLCAjMjMyZjNmKSAxMDAlKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tcGUtYm9yZGVyLTIsIHZhcigtLWlvbi1jb2xvci1zdGVwLTMwMCkpO1xuXG4gIGgzIHtcbiAgICBjb2xvcjogdmFyKC0tcGUtdGV4dCwgI2ZmZmZmZik7XG4gIH1cblxuICAubWFjcm8taXRlbSB7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLXBlLWJvcmRlciwgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpKTtcblxuICAgIC5tYWNyby1sYWJlbCB7XG4gICAgICBjb2xvcjogdmFyKC0tcGUtdGV4dCwgI2ZmZmZmZik7XG4gICAgfVxuXG4gICAgLm1hY3JvLXZhbHVlIHtcbiAgICAgIGNvbG9yOiB2YXIoLS1wZS1hY2NlbnQsIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSk7XG4gICAgfVxuICB9XG59XG5cbi8vIEVzdGlsb3MgcGFyYSByYW5nZSBzbGlkZXJcbmlvbi1yYW5nZSB7XG4gIC0tYmFyLWJhY2tncm91bmQ6IHZhcigtLXBlLWJvcmRlciwgdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKSk7XG4gIC0tYmFyLWJhY2tncm91bmQtYWN0aXZlOiB2YXIoLS1wZS1hY2NlbnQsIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSk7XG4gIC0ta25vYi1iYWNrZ3JvdW5kOiB2YXIoLS1wZS1hY2NlbnQsIHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KSk7XG4gIC0ta25vYi1zaXplOiAyNHB4O1xuICAtLWJhci1oZWlnaHQ6IDZweDtcbiAgLS1rbm9iLWJveC1zaGFkb3c6IG5vbmU7XG4gIG1hcmdpbjogMjBweCAwO1xufVxuXG4vLyBSYW5nZSBzbGlkZXIgdGVtYSBjbGFyb1xuOnJvb3QgaW9uLXJhbmdlIHtcbiAgLS1iYXItYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLWxpZ2h0LXNoYWRlKTtcbiAgLS1iYXItYmFja2dyb3VuZC1hY3RpdmU6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgLS1rbm9iLWJhY2tncm91bmQ6IHZhcigtLWlvbi1jb2xvci1wcmltYXJ5KTtcbiAgLS1rbm9iLWJveC1zaGFkb3c6IG5vbmU7XG59XG5cbi8vIFJhbmdlIHNsaWRlciB0ZW1hIG9zY3Vyb1xuYm9keVtjb2xvci10aGVtZT1cImRhcmtcIl0gaW9uLXJhbmdlIHtcbiAgLS1iYXItYmFja2dyb3VuZDogdmFyKC0tcGUtYm9yZGVyLCB2YXIoLS1pb24tY29sb3Itc3RlcC0yMDApKTtcbiAgLS1iYXItYmFja2dyb3VuZC1hY3RpdmU6IHZhcigtLXBlLWFjY2VudCwgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpKTtcbiAgLS1rbm9iLWJhY2tncm91bmQ6IHZhcigtLXBlLWFjY2VudCwgdmFyKC0taW9uLWNvbG9yLXByaW1hcnkpKTtcbiAgLS1rbm9iLWJveC1zaGFkb3c6IG5vbmU7XG59XG5cbmlvbi1tb2RhbC5kYXRldGltZS1tb2RhbCB7XG4gIC0taGVpZ2h0OiBhdXRvO1xuICAtLWJvcmRlci1yYWRpdXM6IDE2cHg7XG4gIC0tYm94LXNoYWRvdzogMCAxMHB4IDE1cHggLTNweCByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbi8vIFJlc3BvbnNpdmUgZGVzaWduXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgLnByb2ZpbGUtY2FyZCB7XG4gICAgbWFyZ2luOiAxMnB4IDA7XG5cbiAgICBpb24tY2FyZC1oZWFkZXIge1xuICAgICAgcGFkZGluZzogMjBweCAxNnB4IDE2cHggMTZweDtcblxuICAgICAgaW9uLWNhcmQtdGl0bGUge1xuICAgICAgICBmb250LXNpemU6IDFyZW07XG4gICAgICAgIGxldHRlci1zcGFjaW5nOiAwLjNweDtcbiAgICAgIH1cblxuICAgICAgaW9uLWNhcmQtc3VidGl0bGUge1xuICAgICAgICBmb250LXNpemU6IDAuOHJlbTtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAyOHB4O1xuICAgICAgfVxuXG4gICAgICAuc2VjdGlvbi1pY29uIHtcbiAgICAgICAgZm9udC1zaXplOiAxLjFyZW07XG4gICAgICAgIG1hcmdpbi1yaWdodDogOHB4O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgICAgcGFkZGluZzogMTZweDtcbiAgICB9XG4gIH1cblxuICAubWFjcm8tc3VtbWFyeSB7XG4gICAgcGFkZGluZzogMTZweDtcbiAgfVxuXG4gIGlvbi1yYWRpby1ncm91cCB7XG4gICAgZ2FwOiA4cHg7XG5cbiAgICBpb24taXRlbSB7XG4gICAgICBtYXJnaW46IDJweDtcbiAgICAgIC0tcGFkZGluZy1zdGFydDogMTJweDtcbiAgICAgIC0tcGFkZGluZy1lbmQ6IDEycHg7XG4gICAgfVxuICB9XG5cbiAgLy8gTWFyZ2VuIHJlbW92aWRvIHBhcmEgZXZpdGFyIGVmZWN0b3MgdmlzdWFsZXMgZXh0cmHDg8Kxb3MgZW4gYm90b25lc1xufVxuXG4vLyBFc3RpbG9zIGFkaWNpb25hbGVzIHBhcmEgbWVqb3JhciBsYSBsZWdpYmlsaWRhZFxuLnByb2ZpbGUtY2FyZCB7XG4gIGlvbi1jYXJkLWNvbnRlbnQge1xuICAgIGlvbi1pdGVtIHtcbiAgICAgIGlvbi1sYWJlbCB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgICB9XG5cbiAgICAgIGlvbi1pbnB1dCB7XG4gICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG5cbiAgICAgICAgJjo6cGxhY2Vob2xkZXIge1xuICAgICAgICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBNZWpvcmFzIGRlIGFjY2VzaWJpbGlkYWRcbkBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gIC5wcm9maWxlLWNhcmQsXG4gIGlvbi1yYWRpby1ncm91cCBpb24taXRlbSB7XG4gICAgdHJhbnNpdGlvbjogbm9uZTtcbiAgfVxufVxuXG4vLyBNZWpvcmFzIHBhcmEgcGFudGFsbGFzIGRlIGFsdG8gY29udHJhc3RlXG5AbWVkaWEgKHByZWZlcnMtY29udHJhc3Q6IGhpZ2gpIHtcbiAgLnByb2ZpbGUtY2FyZCB7XG4gICAgYm9yZGVyLXdpZHRoOiAycHg7XG5cbiAgICBpb24tY2FyZC1jb250ZW50IHtcbiAgICAgIGlvbi1pdGVtIHtcbiAgICAgICAgaW9uLWlucHV0IHtcbiAgICAgICAgICBib3JkZXItd2lkdGg6IDJweDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlvbi1yYWRpby1ncm91cCB7XG4gICAgaW9uLWl0ZW0ge1xuICAgICAgYm9yZGVyLXdpZHRoOiAycHg7XG4gICAgfVxuICB9XG59XG5cbjo6bmctZGVlcCBpb24tbW9kYWwubW9kYWwtZGVmYXVsdC5zaG93LW1vZGFsIH4gaW9uLW1vZGFsLm1vZGFsLWRlZmF1bHQge1xuICAtLWJhY2tkcm9wLW9wYWNpdHk6IDAuNTtcbn1cblxuLy8gRXN0aWxvcyBwYXJhIEtQSXMgZGUgbWFjcm9udXRyaWVudGVzIChyZXBsaWNhbmRvIHBlcnNvbmFsLmh0bWwpXG4ua3BpIHtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0taW9uLWNvbG9yLXN0ZXAtMjAwLCAjMzc0MTUxKTtcbiAgYmFja2dyb3VuZDogdmFyKC0taW9uLWNvbG9yLXN0ZXAtNTAsICMxNDE3MWMpO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAxMHB4O1xuXG4gIC50aXRsZSB7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItbWVkaXVtLCAjOWNhM2FmKTtcbiAgfVxuXG4gIC52YWx1ZSB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICAgIGZvbnQtd2VpZ2h0OiA5MDA7XG4gICAgbWFyZ2luLXRvcDogNHB4O1xuICAgIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItZGFyaywgI2ZmZmZmZik7XG4gIH1cbn1cblxuLy8gVGVtYSBjbGFybyBwYXJhIEtQSXNcbjpyb290IC5rcGkge1xuICBiYWNrZ3JvdW5kOiAjZjhmYWZjO1xuICBib3JkZXItY29sb3I6ICNlMmU4ZjA7XG5cbiAgLnRpdGxlIHtcbiAgICBjb2xvcjogIzY0NzQ4YjtcbiAgfVxuXG4gIC52YWx1ZSB7XG4gICAgY29sb3I6ICMxZTI5M2I7XG4gIH1cbn1cblxuLy8gVGVtYSBvc2N1cm8gcGFyYSBLUElzXG5ib2R5W2NvbG9yLXRoZW1lPVwiZGFya1wiXSAua3BpIHtcbiAgYmFja2dyb3VuZDogIzE0MTcxYztcbiAgYm9yZGVyLWNvbG9yOiAjMzc0MTUxO1xuXG4gIC50aXRsZSB7XG4gICAgY29sb3I6ICM5Y2EzYWY7XG4gIH1cblxuICAudmFsdWUge1xuICAgIGNvbG9yOiAjZmZmZmZmO1xuICB9XG59XG5cbi8vIE1lZGlhIHF1ZXJpZXMgcGFyYSByZXNwb25zaXZpZGFkIGRlIG1hY3JvbnV0cmllbnRlc1xuLm1hY3Jvcy1zdW1tYXJ5IHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcbiAgZ2FwOiAxMnB4O1xufVxuXG4vLyBQYW50YWxsYXMgcGVxdWXDg8KxYXMgKGhhc3RhIDQ4MHB4KSAtIDJ4MiBncmlkXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcbiAgLm1hY3Jvcy1zdW1tYXJ5IHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xuICAgIGdhcDogOHB4O1xuICB9XG5cbiAgLmtwaSB7XG4gICAgcGFkZGluZzogOHB4O1xuXG4gICAgLnRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMTFweDtcbiAgICB9XG5cbiAgICAudmFsdWUge1xuICAgICAgZm9udC1zaXplOiAxNnB4O1xuICAgIH1cbiAgfVxufVxuXG4vLyBQYW50YWxsYXMgbXV5IHBlcXVlw4PCsWFzIChoYXN0YSAzMjBweCkgLSBjb2x1bW5hIMODwrpuaWNhXG5AbWVkaWEgKG1heC13aWR0aDogMzIwcHgpIHtcbiAgLm1hY3Jvcy1zdW1tYXJ5IHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcbiAgICBnYXA6IDZweDtcbiAgfVxuXG4gIC5rcGkge1xuICAgIHBhZGRpbmc6IDZweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgLnRpdGxlIHtcbiAgICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgfVxuXG4gICAgLnZhbHVlIHtcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcbiAgICAgIG1hcmdpbi10b3A6IDA7XG4gICAgfVxuICB9XG59XG5cbjo6bmctZGVlcCAuYWN0aW9uLXNoZWV0LWJ1dHRvbi1pbm5lciB7XG4gIGNvbG9yOiB3aGl0ZSAhaW1wb3J0YW50O1xufVxuXG46Om5nLWRlZXAgLmFjdGlvbi1zaGVldC1zZWxlY3RlZCAuYWN0aW9uLXNoZWV0LWJ1dHRvbi1pbm5lciB7XG4gIGNvbG9yOiB2YXIoLS1pb24tY29sb3ItcHJpbWFyeSkgIWltcG9ydGFudDtcbn1cblxuOjpuZy1kZWVwIGlvbi1hY3Rpb24tc2hlZXQgLmFjdGlvbi1zaGVldC1jYW5jZWwge1xuICBjb2xvcjogd2hpdGUgIWltcG9ydGFudDtcbn1cblxuQGtleWZyYW1lcyBoaWdobGlnaHQtY2FyZCB7XG4gIDAlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKHZhcigtLWlvbi1jb2xvci13YXJuaW5nLXJnYiksIDAuNik7XG4gICAgYm9yZGVyLWNvbG9yOiByZ2JhKHZhcigtLWlvbi1jb2xvci13YXJuaW5nLXJnYiksIDEpO1xuICB9XG4gIDEwMCUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMxNDE0MTQ7XG4gICAgYm9yZGVyLWNvbG9yOiAjMjUyNTI1O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ }),

/***/ 49903:
/*!**********************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/constants/objetives.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OBJETIVES: () => (/* binding */ OBJETIVES),
/* harmony export */   OBJETIVES_VALUES: () => (/* binding */ OBJETIVES_VALUES),
/* harmony export */   OBJETIVE_TYPES: () => (/* binding */ OBJETIVE_TYPES)
/* harmony export */ });
var OBJETIVE_TYPES;
(function (OBJETIVE_TYPES) {
  OBJETIVE_TYPES[OBJETIVE_TYPES["gain"] = 0] = "gain";
  OBJETIVE_TYPES[OBJETIVE_TYPES["maintenance"] = 1] = "maintenance";
  OBJETIVE_TYPES[OBJETIVE_TYPES["loss"] = 2] = "loss";
})(OBJETIVE_TYPES || (OBJETIVE_TYPES = {}));
const OBJETIVES = {
  [OBJETIVE_TYPES.gain]: {
    id: OBJETIVE_TYPES.gain,
    name: 'OBJETIVES.GAIN_WEIGHT',
    key: 'superávit',
    value: 300
  },
  [OBJETIVE_TYPES.maintenance]: {
    id: OBJETIVE_TYPES.maintenance,
    name: 'OBJETIVES.MAINTAIN_WEIGHT',
    key: 'mantenimiento',
    value: 0
  },
  [OBJETIVE_TYPES.loss]: {
    id: OBJETIVE_TYPES.loss,
    name: 'OBJETIVES.LOSE_WEIGHT',
    key: 'déficit',
    value: -300
  }
};
const OBJETIVES_VALUES = Object.values(OBJETIVES);

/***/ }),

/***/ 58163:
/*!*********************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/constants/training.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TRAINING_TYPES: () => (/* binding */ TRAINING_TYPES),
/* harmony export */   calculateTrainingValues: () => (/* binding */ calculateTrainingValues)
/* harmony export */ });
/* harmony import */ var _steps__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./steps */ 2923);

var TRAINING_TYPES;
(function (TRAINING_TYPES) {
  TRAINING_TYPES[TRAINING_TYPES["veryLight"] = 1] = "veryLight";
  TRAINING_TYPES[TRAINING_TYPES["light"] = 2] = "light";
  TRAINING_TYPES[TRAINING_TYPES["moderate"] = 3] = "moderate";
  TRAINING_TYPES[TRAINING_TYPES["active"] = 4] = "active";
})(TRAINING_TYPES || (TRAINING_TYPES = {}));
const calculateTrainingValues = selectedStep => {
  switch (selectedStep) {
    case _steps__WEBPACK_IMPORTED_MODULE_0__.STEPS[_steps__WEBPACK_IMPORTED_MODULE_0__.STEPS_TYPES.notCounted].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'TRAINING.NONE',
          value: 1
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: 'TRAINING.ONE_OR_TWO',
          value: 1.02
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: 'TRAINING.THREE_OR_FOUR',
          value: 1.05
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: 'TRAINING.FIVE_OR_SIX',
          value: 1.07
        }
      };
    case _steps__WEBPACK_IMPORTED_MODULE_0__.STEPS[_steps__WEBPACK_IMPORTED_MODULE_0__.STEPS_TYPES.lessThan1000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'TRAINING.NONE',
          value: 1.0862
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: 'TRAINING.ONE_OR_TWO',
          value: 1.107
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: 'TRAINING.THREE_OR_FOUR',
          value: 1.14
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: 'TRAINING.FIVE_OR_SIX',
          value: 1.162
        }
      };
    case _steps__WEBPACK_IMPORTED_MODULE_0__.STEPS[_steps__WEBPACK_IMPORTED_MODULE_0__.STEPS_TYPES.between2000And6000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'TRAINING.NONE',
          value: 1.24
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: 'TRAINING.ONE_OR_TWO',
          value: 1.264
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: 'TRAINING.THREE_OR_FOUR',
          value: 1.301
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: 'TRAINING.FIVE_OR_SIX',
          value: 1.326
        }
      };
    case _steps__WEBPACK_IMPORTED_MODULE_0__.STEPS[_steps__WEBPACK_IMPORTED_MODULE_0__.STEPS_TYPES.between7000And9000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'TRAINING.NONE',
          value: 1.321
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: 'TRAINING.ONE_OR_TWO',
          value: 1.348
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: 'TRAINING.THREE_OR_FOUR',
          value: 1.387
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: 'TRAINING.FIVE_OR_SIX',
          value: 1.413
        }
      };
    case _steps__WEBPACK_IMPORTED_MODULE_0__.STEPS[_steps__WEBPACK_IMPORTED_MODULE_0__.STEPS_TYPES.betweenThan10000And15000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'TRAINING.NONE',
          value: 1.402
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: 'TRAINING.ONE_OR_TWO',
          value: 1.431
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: 'TRAINING.THREE_OR_FOUR',
          value: 1.472
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: 'TRAINING.FIVE_OR_SIX',
          value: 1.5
        }
      };
    case _steps__WEBPACK_IMPORTED_MODULE_0__.STEPS[_steps__WEBPACK_IMPORTED_MODULE_0__.STEPS_TYPES.betweenThan16000And18000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'TRAINING.NONE',
          value: 1.547
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: 'TRAINING.ONE_OR_TWO',
          value: 1.578
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: 'TRAINING.THREE_OR_FOUR',
          value: 1.625
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: 'TRAINING.FIVE_OR_SIX',
          value: 1.655
        }
      };
    case _steps__WEBPACK_IMPORTED_MODULE_0__.STEPS[_steps__WEBPACK_IMPORTED_MODULE_0__.STEPS_TYPES.moreThan19000].value:
      return {
        [TRAINING_TYPES.veryLight]: {
          id: TRAINING_TYPES.veryLight,
          name: 'TRAINING.NONE',
          value: 1.683
        },
        [TRAINING_TYPES.light]: {
          id: TRAINING_TYPES.light,
          name: 'TRAINING.ONE_OR_TWO',
          value: 1.717
        },
        [TRAINING_TYPES.moderate]: {
          id: TRAINING_TYPES.moderate,
          name: 'TRAINING.THREE_OR_FOUR',
          value: 1.767
        },
        [TRAINING_TYPES.active]: {
          id: TRAINING_TYPES.active,
          name: 'TRAINING.FIVE_OR_SIX',
          value: 1.801
        }
      };
    // Agregar más casos según sea necesario para otros valores de STEPS_TYPES
    default:
      return null;
    // Valor por defecto o un objeto vacío
  }
};

/***/ }),

/***/ 96676:
/*!*****************************************************************************!*\
  !*** ../../packages/shared-ui/src/app/shared/constants/user-validations.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   USER_VALIDATIONS: () => (/* binding */ USER_VALIDATIONS)
/* harmony export */ });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ 84725);

const USER_VALIDATIONS = {
  name: _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.maxLength(100)]),
  lastname: _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.minLength(1), _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.maxLength(200)]),
  weight: _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.min(30), _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.max(300)]),
  height: _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.min(70), _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.max(300)]),
  birth: _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required]),
  sex: _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required]),
  steps: _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required]),
  activity: _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required]),
  objetive: _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required]),
  training: _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required]),
  kcalTotal: _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required]),
  proteinsGTotal: _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required]),
  carbohydratesGTotal: _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required]),
  fatGTotal: _angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_0__.Validators.required])
};

/***/ })

}]);
//# sourceMappingURL=default-packages_shared-core_src_app_core_services_coach_coach_service_ts-packages_shared-fea-c4bcd8.js.map