"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_features_routine-templates_routine-templates_module_ts"],{

/***/ 51598:
/*!********************************************************************************!*\
  !*** ./src/app/features/routine-templates/routine-templates-routing.module.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoutineTemplatesPageRoutingModule: () => (/* binding */ RoutineTemplatesPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _routine_templates_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./routine-templates.page */ 51280);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _RoutineTemplatesPageRoutingModule;




const routes = [{
  path: '',
  component: _routine_templates_page__WEBPACK_IMPORTED_MODULE_1__.RoutineTemplatesPage
}];
class RoutineTemplatesPageRoutingModule {}
_RoutineTemplatesPageRoutingModule = RoutineTemplatesPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RoutineTemplatesPageRoutingModule, "\u0275fac", function RoutineTemplatesPageRoutingModule_Factory(t) {
  return new (t || _RoutineTemplatesPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RoutineTemplatesPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _RoutineTemplatesPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RoutineTemplatesPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](RoutineTemplatesPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 75607:
/*!************************************************************************!*\
  !*** ./src/app/features/routine-templates/routine-templates.module.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoutineTemplatesPageModule: () => (/* binding */ RoutineTemplatesPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _routine_templates_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./routine-templates-routing.module */ 51598);
/* harmony import */ var _routine_templates_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routine-templates.page */ 51280);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);

var _RoutineTemplatesPageModule;




class RoutineTemplatesPageModule {}
_RoutineTemplatesPageModule = RoutineTemplatesPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RoutineTemplatesPageModule, "\u0275fac", function RoutineTemplatesPageModule_Factory(t) {
  return new (t || _RoutineTemplatesPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RoutineTemplatesPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _RoutineTemplatesPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(RoutineTemplatesPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _routine_templates_routing_module__WEBPACK_IMPORTED_MODULE_2__.RoutineTemplatesPageRoutingModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](RoutineTemplatesPageModule, {
    declarations: [_routine_templates_page__WEBPACK_IMPORTED_MODULE_3__.RoutineTemplatesPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _routine_templates_routing_module__WEBPACK_IMPORTED_MODULE_2__.RoutineTemplatesPageRoutingModule]
  });
})();

/***/ }),

/***/ 51280:
/*!**********************************************************************!*\
  !*** ./src/app/features/routine-templates/routine-templates.page.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RoutineTemplatesPage: () => (/* binding */ RoutineTemplatesPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_routine_template_routine_template_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/routine-template/routine-template-api.service */ 76391);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @ionic/angular */ 54844);


var _RoutineTemplatesPage;







function RoutineTemplatesPage_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Crear plantilla");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function RoutineTemplatesPage_ion_spinner_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ion-spinner", 21);
  }
}
function RoutineTemplatesPage_div_20_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "div", 24);
  }
}
const _c0 = function () {
  return [1, 2, 3];
};
function RoutineTemplatesPage_div_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, RoutineTemplatesPage_div_20_div_1_Template, 1, 0, "div", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction0"](1, _c0));
  }
}
function RoutineTemplatesPage_div_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "ion-icon", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "Todav\u00EDa no tienes plantillas de rutina");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5, "Crea la primera con el formulario de arriba para reutilizarla con cualquier cliente.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function RoutineTemplatesPage_div_22_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function RoutineTemplatesPage_div_22_div_1_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10);
      const template_r8 = restoredCtx.$implicit;
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r9.openTemplate(template_r8));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 30)(2, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](4, "div", 32)(5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "div", 33)(10, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function RoutineTemplatesPage_div_22_div_1_Template_button_click_10_listener($event) {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r10);
      const template_r8 = restoredCtx.$implicit;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r11.confirmDelete(template_r8, $event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, " Borrar ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const template_r8 = ctx.$implicit;
    const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](template_r8.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r7.microcyclesCount(template_r8), " microciclos");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("", ctx_r7.workoutsCount(template_r8), " entrenamientos");
  }
}
function RoutineTemplatesPage_div_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, RoutineTemplatesPage_div_22_div_1_Template, 12, 3, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx_r4.templates)("ngForTrackBy", ctx_r4.trackByTemplateId);
  }
}
// Rutinas -> Plantillas (rediseño 2026-08) — reemplaza a la antigua
// RoutinesOverviewPage (mostraba rutinas YA ASIGNADAS a clientes, sin
// relación con lo que promete el nombre "Rutinas" en el hub de Plantillas).
// Esta pantalla es la biblioteca real de plantillas de rutina COMPLETA
// (microciclos/splits/workouts) del profesional — distinta de RoutinesPage
// (/tabs/routines, "Entrenamientos": plantilla de un solo día/sesión).
// El contenido (semanas/entrenamientos/ejercicios/series) se autoría con el
// mismo Planificador (PlannerModule) que ya usan las rutinas reales de
// cliente — ver shell-routing.module.ts, ruta 'routine-templates/:tableId/planner'.
// Aplicar una plantilla a un cliente concreto vive en la ficha del cliente
// (client-detail.page.ts, panel "Asignar rutina" > "Usar plantilla"), no aquí.
class RoutineTemplatesPage {
  constructor(routineTemplateApi, ionicUtilService, router) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "routineTemplateApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "templates", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "loading", true);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "newName", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isCreating", false);
    this.routineTemplateApi = routineTemplateApi;
    this.ionicUtilService = ionicUtilService;
    this.router = router;
  }
  ngOnInit() {
    this.loadTemplates();
  }
  // ion-router-outlet cachea la página al volver del Planificador (push/pop)
  // — mismo criterio que RoutinesPage/DietTemplatesListPage.
  ionViewWillEnter() {
    this.loadTemplates();
  }
  loadTemplates() {
    this.loading = true;
    this.routineTemplateApi.list().subscribe({
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
  microcyclesCount(template) {
    return (template.splits || []).length;
  }
  workoutsCount(template) {
    return (template.splits || []).reduce((total, split) => total + (split.workouts?.length || 0), 0);
  }
  trackByTemplateId(_index, template) {
    return template._id;
  }
  createAndEdit() {
    const name = this.newName.trim();
    if (!name || this.isCreating) return;
    this.isCreating = true;
    this.routineTemplateApi.create(name).subscribe({
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
    this.router.navigate(['/tabs/routine-templates', template._id, 'planner']);
  }
  confirmDelete(template, event) {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      event.stopPropagation();
      yield _this.ionicUtilService.showAlert({
        header: 'Borrar plantilla',
        message: `¿Seguro que quieres borrar "${template.name}"? Esta acción no se puede deshacer. Los clientes que ya la tengan aplicada conservan su rutina tal cual.`,
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Borrar',
          cssClass: 'alert-button-danger',
          handler: () => {
            _this.routineTemplateApi.delete(template._id).subscribe({
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
_RoutineTemplatesPage = RoutineTemplatesPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RoutineTemplatesPage, "\u0275fac", function RoutineTemplatesPage_Factory(t) {
  return new (t || _RoutineTemplatesPage)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_core_services_routine_template_routine_template_api_service__WEBPACK_IMPORTED_MODULE_2__.RoutineTemplateApiService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_3__.IonicUtilService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(RoutineTemplatesPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _RoutineTemplatesPage,
  selectors: [["app-routine-templates"]],
  decls: 23,
  vars: 7,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["aria-label", "Abrir men\u00FA de navegaci\u00F3n", 1, "tf-page-header__back-button"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "routine-templates-content"], [1, "templates-page"], [1, "templates-hint"], [1, "create-bar"], [1, "input-wrapper"], ["name", "calendar-outline", 1, "input-icon"], ["type", "text", "placeholder", "Rutina Hipertrofia 4 d\u00EDas", 1, "input-field", 3, "ngModel", "ngModelChange", "keyup.enter"], ["type", "button", 1, "submit-button", 3, "disabled", "click"], [4, "ngIf"], ["name", "dots", 4, "ngIf"], ["class", "templates-skeleton", 4, "ngIf"], ["class", "state-message", 4, "ngIf"], ["class", "templates-grid", 4, "ngIf"], ["name", "dots"], [1, "templates-skeleton"], ["class", "skeleton-block template-card-skeleton", 4, "ngFor", "ngForOf"], [1, "skeleton-block", "template-card-skeleton"], [1, "state-message"], ["name", "calendar-outline"], [1, "templates-grid"], ["class", "template-card", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "template-card", 3, "click"], [1, "template-card-header"], [1, "template-name"], [1, "template-meta"], [1, "template-card-actions"], ["type", "button", 1, "danger-button", 3, "click"]],
  template: function RoutineTemplatesPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](4, "ion-menu-button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 5)(6, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](7, "Plantillas de rutina");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](8, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](9, "ion-content", 8)(10, "div", 9)(11, "p", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, " Crea una plantilla de rutina completa (microciclos, entrenamientos y ejercicios) con el mismo Planificador que usas con tus clientes, y apl\u00EDcala luego a cualquiera de ellos desde su ficha (\"Asignar rutina\" > \"Usar plantilla\"). ");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "div", 11)(14, "div", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](15, "ion-icon", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "input", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function RoutineTemplatesPage_Template_input_ngModelChange_16_listener($event) {
        return ctx.newName = $event;
      })("keyup.enter", function RoutineTemplatesPage_Template_input_keyup_enter_16_listener() {
        return ctx.createAndEdit();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "button", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function RoutineTemplatesPage_Template_button_click_17_listener() {
        return ctx.createAndEdit();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, RoutineTemplatesPage_span_18_Template, 2, 0, "span", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](19, RoutineTemplatesPage_ion_spinner_19_Template, 1, 0, "ion-spinner", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](20, RoutineTemplatesPage_div_20_Template, 2, 2, "div", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](21, RoutineTemplatesPage_div_21_Template, 6, 0, "div", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](22, RoutineTemplatesPage_div_22_Template, 2, 2, "div", 20);
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
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-card-in {\n  from {\n    opacity: 0;\n    transform: translateY(6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.routine-templates-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n}\n\n.templates-page[_ngcontent-%COMP%] {\n  max-width: 1080px;\n  margin: 0 auto;\n  padding: var(--tf-space-5);\n}\n\n.templates-hint[_ngcontent-%COMP%] {\n  margin: 0 0 var(--tf-space-4);\n  font-size: var(--tf-font-size-sm);\n  line-height: var(--tf-line-height-base);\n  color: var(--tf-text-muted);\n}\n\n.create-bar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-3);\n  margin-bottom: var(--tf-space-5);\n}\n@media (min-width: 640px) {\n  .create-bar[_ngcontent-%COMP%] {\n    flex-direction: row;\n  }\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n  flex: 1;\n  height: 46px;\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  flex-shrink: 0;\n  font-size: 1.1rem;\n}\n\n.input-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n  font-size: var(--tf-font-size-base);\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  height: 46px;\n  padding: 0 var(--tf-space-5);\n  font-size: 0.92rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  white-space: nowrap;\n}\n.submit-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n@media (max-width: 639px) {\n  .submit-button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n\n.templates-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--tf-space-4);\n}\n\n.skeleton-block[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n  border-radius: var(--tf-radius-lg);\n}\n.skeleton-block[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n\n.template-card-skeleton[_ngcontent-%COMP%] {\n  flex: 1 1 260px;\n  max-width: 420px;\n  height: 120px;\n}\n\n.state-message[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  gap: 10px;\n  padding: var(--tf-space-8) var(--tf-space-4) 0;\n  color: var(--tf-text-muted);\n}\n.state-message[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  color: var(--tf-text-faint);\n  margin-bottom: 6px;\n}\n.state-message[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 600;\n  color: var(--tf-text);\n  margin: 0;\n}\n.state-message[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  line-height: 1.5;\n  max-width: 34ch;\n  margin: 0;\n}\n\n.templates-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--tf-space-4);\n}\n\n.template-card[_ngcontent-%COMP%] {\n  flex: 1 1 260px;\n  max-width: 420px;\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n  padding: var(--tf-space-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--tf-space-2);\n  background: var(--tf-surface-2);\n  cursor: pointer;\n  transition: border-color var(--tf-duration-fast) var(--tf-ease-out), transform var(--tf-duration-fast) var(--tf-ease-out);\n  animation: _ngcontent-%COMP%_tf-card-in 320ms var(--tf-ease-out) backwards;\n}\n@media (prefers-reduced-motion: reduce) {\n  .template-card[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n.template-card[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 0ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 35ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 70ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(4) {\n  animation-delay: 105ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(5) {\n  animation-delay: 140ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(6) {\n  animation-delay: 175ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(7) {\n  animation-delay: 210ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(8) {\n  animation-delay: 245ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(9) {\n  animation-delay: 280ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(10) {\n  animation-delay: 315ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(11) {\n  animation-delay: 350ms;\n}\n.template-card[_ngcontent-%COMP%]:nth-child(12) {\n  animation-delay: 385ms;\n}\n.template-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--tf-border-strong);\n}\n.template-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n\n.template-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: var(--tf-space-2);\n}\n\n.template-name[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-base);\n  font-weight: 600;\n  color: var(--tf-text);\n}\n\n.template-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--tf-space-3);\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-muted);\n}\n\n.template-card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: var(--tf-space-2);\n  margin-top: var(--tf-space-2);\n}\n\n.danger-button[_ngcontent-%COMP%] {\n  flex: 1;\n  height: 38px;\n  border-radius: 10px;\n  padding: 0 15px;\n  font-size: var(--tf-font-size-sm);\n  font-weight: 700;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: transform var(--tf-duration-fast) var(--tf-ease-out);\n  background: var(--tf-danger-soft);\n  color: var(--tf-danger);\n  border: 1px solid var(--tf-danger-border);\n}\n.danger-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.danger-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvcm91dGluZS10ZW1wbGF0ZXMvcm91dGluZS10ZW1wbGF0ZXMucGFnZS5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19hbmltYXRpb25zLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX2lucHV0cy5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19idXR0b25zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJBO0VBQ0U7SUFDRSwyQkFBQTtFQ3hCRjtBQUNGO0FDdUJBO0VBQ0U7SUFDRSxVQUFBO0lBQ0EsMEJBQUE7RURyQkY7RUN1QkE7SUFDRSxVQUFBO0lBQ0Esd0JBQUE7RURyQkY7QUFDRjtBQVRBO0VBQ0UsMEJBQUE7QUFXRjs7QUFSQTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLDBCQUFBO0FBV0Y7O0FBUkE7RUFDRSw2QkFBQTtFQUNBLGlDQUFBO0VBQ0EsdUNBQUE7RUFDQSwyQkFBQTtBQVdGOztBQU5BO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esc0JBQUE7RUFDQSxnQ0FBQTtBQVNGO0FBUEU7RUFORjtJQU9JLG1CQUFBO0VBVUY7QUFDRjs7QUFQQTtFRTdCRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsK0JGMkIwQjtFRTFCMUIseUNBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpREFBQTtFRndCQSxPQUFBO0VBQ0EsWUFBQTtBQWlCRjtBRXhDRTtFQUNFLDhCQUFBO0FGMENKOztBQWpCQTtFRXBCRSwyQkFBQTtFQUNBLGNBQUE7RUZxQkEsaUJBQUE7QUFxQkY7O0FBbEJBO0VFcEJFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0Esb0JBQUE7RUFDQSxZQUFBO0VGZUEsbUNBQUE7QUE0QkY7QUV6Q0U7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IGNhcmdhIGNvbiBiYXJyaWRvIGRlIHNoaW1tZXIgw6LCgMKUIG1pc21vIGJsb3F1ZSByZXBldGlkbyBsaXRlcmFsbWVudGVcbi8vIGVuIH4xMCBww4PCoWdpbmFzIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuXG4vLyBDYWRhIHDDg8KhZ2luYSBhcGxpY2EgZWwgbWl4aW4gc29icmUgc3UgcHJvcGlvIHNlbGVjdG9yIHkgYcODwrFhZGUgZW5jaW1hIHNvbG8gbG9cbi8vIHF1ZSB2YXLDg8KtYSAoYm9yZGVyLXJhZGl1cywgaGVpZ2h0LCB3aWR0aCwgdmFyaWFudGVzIGNvbiBub21icmUpLlxuQG1peGluIHRmLXNrZWxldG9uLXNoaW1tZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG5cbiAgJjo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldDogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgdHJhbnNwYXJlbnQsIHZhcigtLXRmLXNoaW1tZXIpLCB0cmFuc3BhcmVudCk7XG4gICAgYW5pbWF0aW9uOiB0Zi1zaGltbWVyIDEuNHMgaW5maW5pdGU7XG4gIH1cblxuICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xuICAgICY6OmFmdGVyIHtcbiAgICAgIGFuaW1hdGlvbjogbm9uZTtcbiAgICB9XG4gIH1cbn1cblxuQGtleWZyYW1lcyB0Zi1zaGltbWVyIHtcbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xuICB9XG59XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi90aGVtZS9idXR0b25zJztcbkBpbXBvcnQgJy4uLy4uLy4uL3RoZW1lL2lucHV0cyc7XG5AaW1wb3J0ICcuLi8uLi8uLi90aGVtZS9za2VsZXRvbic7XG5AaW1wb3J0ICcuLi8uLi8uLi90aGVtZS9hbmltYXRpb25zJztcblxuLnJvdXRpbmUtdGVtcGxhdGVzLWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLXRmLWJnKTtcbn1cblxuLnRlbXBsYXRlcy1wYWdlIHtcbiAgbWF4LXdpZHRoOiAxMDgwcHg7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBwYWRkaW5nOiB2YXIoLS10Zi1zcGFjZS01KTtcbn1cblxuLnRlbXBsYXRlcy1oaW50IHtcbiAgbWFyZ2luOiAwIDAgdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcbiAgbGluZS1oZWlnaHQ6IHZhcigtLXRmLWxpbmUtaGVpZ2h0LWJhc2UpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG59XG5cbi8vIC0tLSBDcmVhciBwbGFudGlsbGE6IGlucHV0ICsgQ1RBIGVuIHVuYSBzb2xhIGZpbGEgZW4gcGFudGFsbGFzIGFuY2hhc1xuLy8gKG1pc21vIGNyaXRlcmlvIHF1ZSAuc2VhcmNoLWJhciBlbiBjbGllbnRzLnBhZ2Uuc2NzcyksIGFwaWxhZGFzIGVuIG3Dg8KzdmlsIC0tLVxuLmNyZWF0ZS1iYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTMpO1xuICBtYXJnaW4tYm90dG9tOiB2YXIoLS10Zi1zcGFjZS01KTtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogNjQwcHgpIHtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICB9XG59XG5cbi5pbnB1dC13cmFwcGVyIHtcbiAgQGluY2x1ZGUgdGYtaW5wdXQtd3JhcHBlcih2YXIoLS10Zi1zdXJmYWNlLTIpKTtcbiAgZmxleDogMTtcbiAgaGVpZ2h0OiA0NnB4O1xufVxuXG4uaW5wdXQtaWNvbiB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LWljb247XG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xufVxuXG4uaW5wdXQtZmllbGQge1xuICBAaW5jbHVkZSB0Zi1pbnB1dC1maWVsZDtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtYmFzZSk7XG59XG5cbi5zdWJtaXQtYnV0dG9uIHtcbiAgQGluY2x1ZGUgdGYtZ3JhZGllbnQtYnV0dG9uO1xuICBoZWlnaHQ6IDQ2cHg7XG4gIHBhZGRpbmc6IDAgdmFyKC0tdGYtc3BhY2UtNSk7XG4gIGZvbnQtc2l6ZTogMC45MnJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG5cbiAgQG1lZGlhIChtYXgtd2lkdGg6IDYzOXB4KSB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn1cblxuLy8gLS0tIENhcmdhOiBtaXNtbyBlc3F1ZWxldG8gZGUgbGEgZm9ybWEgZmluYWwgKGdyaWQgZGUgY2FyZHMpLCBubyB1blxuLy8gc3Bpbm5lciBnZW7Dg8KpcmljbyDDosKAwpQgbWlzbW8gY3JpdGVyaW8gcXVlIGRhc2hib2FyZC5wYWdlLnNjc3MgLS0tXG4udGVtcGxhdGVzLXNrZWxldG9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTQpO1xufVxuXG4uc2tlbGV0b24tYmxvY2sge1xuICBAaW5jbHVkZSB0Zi1za2VsZXRvbi1zaGltbWVyO1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbGcpO1xufVxuXG4udGVtcGxhdGUtY2FyZC1za2VsZXRvbiB7XG4gIGZsZXg6IDEgMSAyNjBweDtcbiAgbWF4LXdpZHRoOiA0MjBweDtcbiAgaGVpZ2h0OiAxMjBweDtcbn1cblxuLy8gLS0tIFZhY8ODwq1vIGRlIHDDg8KhZ2luYSBjb21wbGV0YSDDosKAwpQgbWlzbW8gcGF0csODwrNuIHF1ZSBjbGllbnRzL2Rhc2hib2FyZC5wYWdlLnNjc3Ncbi8vIChpY29ubyArIHTDg8KtdHVsbyArIHRleHRvKS4gU2luIENUQSBwcm9waW8gYXF1w4PCrTogZWwgZm9ybXVsYXJpbyBkZSBjcmVhciB5YVxuLy8gZXN0w4PCoSBqdXN0byBlbmNpbWEsIGFzw4PCrSBxdWUgdW4gYm90w4PCs24gZHVwbGljYWRvIHNlcsODwq1hIHJ1aWRvLiAtLS1cbi5zdGF0ZS1tZXNzYWdlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBnYXA6IDEwcHg7XG4gIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTgpIHZhcigtLXRmLXNwYWNlLTQpIDA7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiA0MHB4O1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LWZhaW50KTtcbiAgICBtYXJnaW4tYm90dG9tOiA2cHg7XG4gIH1cblxuICBoMiB7XG4gICAgZm9udC1zaXplOiAxLjA1cmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICAgIG1hcmdpbjogMDtcbiAgfVxuXG4gIHAge1xuICAgIGZvbnQtc2l6ZTogMC45cmVtO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XG4gICAgbWF4LXdpZHRoOiAzNGNoO1xuICAgIG1hcmdpbjogMDtcbiAgfVxufVxuXG4vLyBGbGV4IGVuIHZleiBkZSBncmlkOiBjb24gYXV0by1maXQsIHVuIGNhcmQgc3VlbHRvIGVuIGxhIMODwrpsdGltYSBmaWxhXG4vLyBxdWVkYWJhIGVuY2Fqb25hZG8gZW4gZWwgYW5jaG8gZGUgc3UgY29sdW1uYSAobWlzbW8gcXVlIGxhcyBmaWxhc1xuLy8gY29tcGxldGFzKSBkZWphbmRvIGh1ZWNvIHZhY8ODwq1vIGFsIGxhZG8gZW4gdmV6IGRlIG9jdXBhciBlbCBhbmNob1xuLy8gc29icmFudGUgZGUgZXNhIGZpbGEgw6LCgMKUIGZsZXgtd3JhcCArIGZsZXgtZ3JvdyBsbyByZXBhcnRlIHBvciBsw4PCrW5lYS5cbi50ZW1wbGF0ZXMtZ3JpZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS00KTtcbn1cblxuLy8gVGFyamV0YSBjbGljYWJsZSBjb21wbGV0YSAoYWJyZSBlbCBQbGFuaWZpY2Fkb3IpIMOiwoDClCBjdXJzb3IsIGhvdmVyIHlcbi8vIGZlZWRiYWNrIGRlIHB1bHNhY2nDg8KzbiBleHBsw4PCrWNpdG9zLCBtw4PCoXMgZW50cmFkYSBlc2NhbG9uYWRhIChtaXNtbyBwYXRyw4PCs25cbi8vIHF1ZSAuY2xpZW50LWNhcmQgZW4gY2xpZW50cy5wYWdlLnNjc3MpLCByZXNwZXRhbmRvIHByZWZlcnMtcmVkdWNlZC1tb3Rpb24uXG4udGVtcGxhdGUtY2FyZCB7XG4gIGZsZXg6IDEgMSAyNjBweDtcbiAgbWF4LXdpZHRoOiA0MjBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLWxnKTtcbiAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMik7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICB0cmFuc2Zvcm0gdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuICBAaW5jbHVkZSB0Zi1jYXJkLWluLXN0YWdnZXI7XG5cbiAgJjpob3ZlciB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgfVxuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTgpO1xuICB9XG59XG5cbi50ZW1wbGF0ZS1jYXJkLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG59XG5cbi50ZW1wbGF0ZS1uYW1lIHtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtYmFzZSk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbn1cblxuLnRlbXBsYXRlLW1ldGEge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTMpO1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1zbSk7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbn1cblxuLnRlbXBsYXRlLWNhcmQtYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMik7XG4gIG1hcmdpbi10b3A6IHZhcigtLXRmLXNwYWNlLTIpO1xufVxuXG4vLyBBbHRvL3JhZGlvIGFsaW5lYWRvcyBjb24gbGFzIGFjY2lvbmVzIHNlY3VuZGFyaWFzIHlhIGVzdGFibGVjaWRhcyBlblxuLy8gY2xpZW50cy5wYWdlLnNjc3MgKC5jYW5jZWwtcmV2aWV3LWJ1dHRvbi8uY29uZmlybS1idXR0b24vLnJlamVjdC1idXR0b24pXG4vLyBlbiB2ZXogZGUgcmVpbnZlbnRhciBvdHJvIHRhbWHDg8KxbyBwYXJhIGVsIG1pc21vIHJvbCBkZSBib3TDg8Kzbi5cbi5kYW5nZXItYnV0dG9uIHtcbiAgZmxleDogMTtcbiAgaGVpZ2h0OiAzOHB4O1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBwYWRkaW5nOiAwIDE1cHg7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtZGFuZ2VyLXNvZnQpO1xuICBjb2xvcjogdmFyKC0tdGYtZGFuZ2VyKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtZGFuZ2VyLWJvcmRlcik7XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45Nyk7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cbiIsIi8vIEVudHJhZGEgZXNjYWxvbmFkYSBkZSBsaXN0YXMvZ3JpZHMgZGUgY2FyZHMgYWwgY2FyZ2FyIMOiwoDClCBtaXNtbyBibG9xdWVcbi8vIChrZXlmcmFtZSArIGFuaW1hdGlvbiArIGd1YXJkIGRlIHByZWZlcnMtcmVkdWNlZC1tb3Rpb24pIHJlcGV0aWRvIGJ5dGUgYVxuLy8gYnl0ZSBlbiA5IHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuLiBNaXNtbyBjcml0ZXJpbyBxdWVcbi8vIF9za2VsZXRvbi5zY3NzL19idXR0b25zLnNjc3M6IGNhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW9cbi8vIHNlbGVjdG9yIHkgYcODwrFhZGUgZW5jaW1hIHNvbG8gbG8gcXVlIHZhcsODwq1hIChyYWRpbywgdGFtYcODwrFvLi4uKS5cbkBtaXhpbiB0Zi1jYXJkLWluLWFuaW1hdGlvbiB7XG4gIGFuaW1hdGlvbjogdGYtY2FyZC1pbiAzMjBtcyB2YXIoLS10Zi1lYXNlLW91dCkgYmFja3dhcmRzO1xuXG4gIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgYW5pbWF0aW9uOiBub25lO1xuICB9XG59XG5cbi8vIFZhcmlhbnRlIHBhcmEgbGlzdGFzOiBhZGVtw4PCoXMgZGVsIGZ1bmRpZG8sIGVzY2Fsb25hIGVsIHJldHJhc28gZGUgY2FkYVxuLy8gZWxlbWVudG8gcG9yIHN1IHBvc2ljacODwrNuIChudGgtY2hpbGQpLiAkbWF4LWl0ZW1zIGFjb3RhIGVsIGJ1Y2xlIGFsIG7DgsK6XG4vLyByYXpvbmFibGUgZGUgdGFyamV0YXMgdmlzaWJsZXMgcG9yIHDDg8KhZ2luYSDDosKAwpQgbm8gdGllbmUgc2VudGlkbyBnZW5lcmFyIG3Dg8Khc1xuLy8gcmVnbGFzIG50aC1jaGlsZCBxdWUgZWxlbWVudG9zIHB1ZWRlIGxsZWdhciBhIGhhYmVyLlxuQG1peGluIHRmLWNhcmQtaW4tc3RhZ2dlcigkbWF4LWl0ZW1zOiAxMiwgJHN0ZXA6IDM1bXMpIHtcbiAgQGluY2x1ZGUgdGYtY2FyZC1pbi1hbmltYXRpb247XG5cbiAgQGZvciAkaSBmcm9tIDEgdGhyb3VnaCAkbWF4LWl0ZW1zIHtcbiAgICAmOm50aC1jaGlsZCgjeyRpfSkge1xuICAgICAgYW5pbWF0aW9uLWRlbGF5OiAjeygkaSAtIDEpICogJHN0ZXB9O1xuICAgIH1cbiAgfVxufVxuXG5Aa2V5ZnJhbWVzIHRmLWNhcmQtaW4ge1xuICBmcm9tIHtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSg2cHgpO1xuICB9XG4gIHRvIHtcbiAgICBvcGFjaXR5OiAxO1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcbiAgfVxufVxuIiwiLy8gRmlsYSBkZSBpbnB1dCBjb24gaWNvbm8gKHdyYXBwZXIgKyBpY29ubyArIGNhbXBvKSDDosKAwpQgcmVwZXRpZGEgZW4gNCBww4PCoWdpbmFzXG4vLyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24gKHZlciBUQVJFQTQtdWktdXgtcmVkaXNlbm8ubWQgPiBGYXNlIDMpLiBFbCBmb25kb1xuLy8gZGVsIHdyYXBwZXIgZXMgZWwgw4PCum5pY28gdmFsb3IgcXVlIHZhcsODwq1hIHBvciBww4PCoWdpbmEgKHN1cGVyZmljaWUgMSBvIDIgc2Vnw4PCum5cbi8vIGNvbnRleHRvIHZpc3VhbCksIGRlIGFow4PCrSBlbCBwYXLDg8KhbWV0cm87IHRhbWHDg8KxbyBkZSBmdWVudGUvYWx0by9tYXJnZW4gc2Vcbi8vIGRlamFuIGZ1ZXJhIGRlbCBtaXhpbiBwb3JxdWUgY2FkYSBww4PCoWdpbmEgbG9zIGZpamEgc2Vnw4PCum4gc3UgcHJvcGlvIGxheW91dC5cbkBtaXhpbiB0Zi1pbnB1dC13cmFwcGVyKCRiZzogdmFyKC0tdGYtc3VyZmFjZS0xKSkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDEwcHg7XG4gIGJhY2tncm91bmQ6ICRiZztcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBhZGRpbmc6IDAgMTRweDtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmZvY3VzLXdpdGhpbiB7XG4gICAgYm9yZGVyLWNvbG9yOiB2YXIoLS10Zi1hY2NlbnQpO1xuICB9XG59XG5cbkBtaXhpbiB0Zi1pbnB1dC1pY29uIHtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBmbGV4LXNocmluazogMDtcbn1cblxuQG1peGluIHRmLWlucHV0LWZpZWxkIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiBub25lO1xuICBvdXRsaW5lOiBub25lO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIGZvbnQtZmFtaWx5OiBpbmhlcml0O1xuICBoZWlnaHQ6IDEwMCU7XG5cbiAgJjo6cGxhY2Vob2xkZXIge1xuICAgIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgfVxufVxuIiwiLy8gQm90w4PCs24gQ1RBIGNvbiBncmFkaWVudGUgZGUgYWNlbnRvIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gZW4gfjExIHNpdGlvcyBkZVxuLy8gfjEwIHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS5cbi8vIENhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW8gc2VsZWN0b3IgeSBhw4PCsWFkZSBlbmNpbWEgc29sbyBsb1xuLy8gcXVlIHZhcsODwq1hIHBvciBsYXlvdXQgKHdpZHRoLCBoZWlnaHQsIGZvbnQtc2l6ZSwgbWFyZ2luKS5cbi8vXG4vLyBMYSBtaXRhZCBkZSBsb3Mgc2l0aW9zIG9yaWdpbmFsZXMgbm8gdGVuw4PCrWFuIHRyYW5zaWNpw4PCs24vZmVlZGJhY2sgZGUgcHVsc2FjacODwrNuXG4vLyBuaSA6Zm9jdXMtdmlzaWJsZSDDosKAwpQgZWwgbWl4aW4gbG9zIGHDg8KxYWRlIHNpZW1wcmUsIGNpZXJyYSBlc2UgaHVlY28gZGVcbi8vIGNvbnNpc3RlbmNpYSBkZSBpbnRlcmFjY2nDg8KzbiAoUFJPRFVDVC5tZDogXCJ1biBzb2xvIHBhdHLDg8KzbiBwb3IgdGlwbyBkZVxuLy8gY29tcG9uZW50ZVwiKSBlbiB2ZXogZGUgcGVycGV0dWFyIGxhIHZhcmlhY2nDg8KzbiBhY2NpZGVudGFsLlxuQG1peGluIHRmLWdyYWRpZW50LWJ1dHRvbigkcmFkaXVzOiAxMnB4KSB7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LWdyYWRpZW50KTtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudC1jb250cmFzdCk7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSwgb3BhY2l0eSAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45Nyk7XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjQ1O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLXRleHQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLy8gQm90w4PCs24gZGUgaGVhZGVyIHF1ZSBlcyBzb2xvIHVuIGljb25vIMOiwoDClCBtaXNtbyBsb29rIFwiZW52dWVsdG9cIiBxdWUgeWEgdXNhIGxhXG4vLyBhcHAgZGUgY29uc3VtaWRvciBlbiBzdXMgdG9vbGJhcnMgKHBhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy8uLi4vZGlldHMvXG4vLyBjb21wb25lbnRzL3Rvb2xiYXItY2FsZW5kYXI6IGZvbmRvICsgYm9yZGVyLXJhZGl1cyArIGNhamEgZmlqYSA0NHg0NCwgZW5cbi8vIHZleiBkZWwgaW9uLWJ1dHRvbiBwbGFuby90cmFuc3BhcmVudGUgcXVlIHRlbsODwq1hIGNhZGEgcGFudGFsbGEgZGUgdHJhaW5lcnNcbi8vIGhhc3RhIGFob3JhKS4gVG9rZW5lYWRvIGEgbGEgcGFsZXRhIGRlIGVzdGEgYXBwIGVuIHZleiBkZSByZXBldGlyIGxvc1xuLy8gcmdiYSgyNTUsMjU1LDI1NSwuLi4pIHN1ZWx0b3MgZGVsIG9yaWdpbmFsLlxuLy9cbi8vIFNpcnZlIHRhbnRvIHBhcmEgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCI+ICh1c2EgbGFzIENTUyBjdXN0b20gcHJvcGVydGllc1xuLy8gZGUgSW9uaWMpIGNvbW8gcGFyYSB1biA8YnV0dG9uPiBuYXRpdm8gKHVzYSBsYXMgcHJvcGllZGFkZXMgcGxhbmFzKSDDosKAwpRcbi8vIGFtYm9zIGNvZXhpc3RlbiBob3kgZW4gdHJhaW5lcnMgcGFyYSBlbCBtaXNtbyByb2wgZGUgXCJ2b2x2ZXJcIi9cImNlcnJhclwiLlxuQG1peGluIHRmLWljb24tYnV0dG9uKCRzaXplOiA0NHB4LCAkcmFkaXVzOiAxMnB4LCAkaWNvbi1zaXplOiAyMHB4KSB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcbiAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1iYWNrZ3JvdW5kLWhvdmVyOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtZm9jdXNlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1jb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICAtLWJvcmRlci1yYWRpdXM6ICN7JHJhZGl1c307XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbiAgLS1wYWRkaW5nLXRvcDogMDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMDtcblxuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6ICRyYWRpdXM7XG4gIHdpZHRoOiAkc2l6ZTtcbiAgaGVpZ2h0OiAkc2l6ZTtcbiAgbWluLXdpZHRoOiAkc2l6ZTtcbiAgbWluLWhlaWdodDogJHNpemU7XG4gIG1hcmdpbjogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCksXG4gICAgY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogJGljb24tc2l6ZTtcbiAgfVxufVxuXG4vLyBFeHBhbnNvciBpbnZpc2libGUgZGUgem9uYSBwdWxzYWJsZS5cbi8vXG4vLyBQQVJBIFFVw4PCiTogdW4gY29udHJvbCBjb21wYWN0byAodW4gaWNvbm8gZGUgMzIgcHggZW4gdW5hIGZpbGEgZGUgdGFibGEsIHVuXG4vLyBlbmxhY2UgZGUgdGV4dG8gZGUgMTYgcHgpIG5vIGxsZWdhIGEgbG9zIDQ0IHB4IHF1ZSBleGlnZSBQUk9EVUNULm1kLCB5XG4vLyBlbmdvcmRhcmxvIGRlIHZlcmRhZCBkZXNwbGF6YSB0b2RvIGxvIHF1ZSB0aWVuZSBhbHJlZGVkb3Igw6LCgMKUIGVuIHVuYSB0YWJsYVxuLy8gZGUgdmVpbnRlIGZpbGFzLCA4IHB4IHBvciBmaWxhIHNvbiBtZWRpYSBwYW50YWxsYS5cbi8vXG4vLyBFbCBwc2V1ZG9lbGVtZW50byBjcmVjZSBoYWNpYSBmdWVyYSBzaW4gb2N1cGFyIHNpdGlvIGVuIGVsIGZsdWpvLCBhc8ODwq0gcXVlXG4vLyBlbCBib3TDg8KzbiBzZSB2ZSBwZXF1ZcODwrFvIHkgc2UgcHVsc2EgZ3JhbmRlLlxuLy9cbi8vIEFWSVNPIERFIE1FRElDScODwpNOOiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBOTyB2ZSBlc3RlIHBzZXVkb2VsZW1lbnRvLCBhc8ODwq1cbi8vIHF1ZSBhbCB2ZXJpZmljYXIgaGF5IHF1ZSB1c2FyIGVsZW1lbnRGcm9tUG9pbnQgY29uIGVsIGVsZW1lbnRvIGRlbnRybyBkZWxcbi8vIHZpZXdwb3J0LiBBZGVtw4PCoXMgZWwgaGl0LXRlc3QgZGV2dWVsdmUgMiBweCBtZW5vcyBxdWUgbGEgY2FqYSBkZWNsYXJhZGFcbi8vIChjb21wcm9iYWRvOiAtNHB4IGRhIDQyLCAtNnB4IGRhIDQ2KSwgYXPDg8KtIHF1ZSB1biA0MiBtZWRpZG8gc29uIDQ0IHJlYWxlcy5cbi8vXG4vLyAkZ3JvdzogY3XDg8KhbnRvIGNyZWNlIHBvciBjYWRhIGxhZG8uIDRweCBsbGV2YSB1biBjb250cm9sIGRlIDM2IHB4IGEgNDQuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIoJGdyb3c6IDRweCkge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IC0jeyRncm93fTtcbiAgfVxufVxuXG4vLyBWYXJpYW50ZSBxdWUgc29sbyBjcmVjZSBlbiBWRVJUSUNBTC4gUGFyYSBjb250cm9sZXMgZW4gZmlsYSBkb25kZSBlbFxuLy8gZXhwYW5zb3IgaG9yaXpvbnRhbCBzZSBzb2xhcGFyw4PCrWEgY29uIGVsIGRlIGFsIGxhZG8geSByb2JhcsODwq1hIHN1cyB0b3F1ZXMuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIteSgkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC0jeyRncm93fTtcbiAgICBib3R0b206IC0jeyRncm93fTtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ })

}]);
//# sourceMappingURL=src_app_features_routine-templates_routine-templates_module_ts.js.map