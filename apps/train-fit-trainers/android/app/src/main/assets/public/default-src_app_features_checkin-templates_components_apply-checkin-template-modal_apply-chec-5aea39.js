"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_features_checkin-templates_components_apply-checkin-template-modal_apply-chec-5aea39"],{

/***/ 79651:
/*!******************************************************************************************************************************!*\
  !*** ./src/app/features/checkin-templates/components/apply-checkin-template-modal/apply-checkin-template-modal.component.ts ***!
  \******************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApplyCheckinTemplateModalComponent: () => (/* binding */ ApplyCheckinTemplateModalComponent)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _services_checkin_templates_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/checkin-templates-api.service */ 47672);
/* harmony import */ var _clients_services_trainer_clients_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../clients/services/trainer-clients-api.service */ 60562);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);

var _ApplyCheckinTemplateModalComponent;










function ApplyCheckinTemplateModalComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "ion-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("ngModelChange", function ApplyCheckinTemplateModalComponent_div_13_Template_input_ngModelChange_2_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r7);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r6.onSearchChange($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngModel", ctx_r0.searchQuery);
  }
}
function ApplyCheckinTemplateModalComponent_p_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "No tienes clientes todav\u00EDa.");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ApplyCheckinTemplateModalComponent_p_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "p", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Ning\u00FAn cliente coincide con la b\u00FAsqueda. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
}
function ApplyCheckinTemplateModalComponent_button_17_span_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const client_r8 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](client_r8.user.email);
  }
}
function ApplyCheckinTemplateModalComponent_button_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ApplyCheckinTemplateModalComponent_button_17_Template_button_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r12);
      const client_r8 = restoredCtx.$implicit;
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r11.toggleClientSelected(client_r8));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "div", 25)(4, "span", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](6, ApplyCheckinTemplateModalComponent_button_17_span_6_Template, 2, 1, "span", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](7, "ion-icon", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const client_r8 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵclassProp"]("apply-client-row--selected", ctx_r3.isClientSelected(client_r8));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", !client_r8.user);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵstyleProp"]("background", "hsl(" + ctx_r3.getAvatarHue(client_r8) + ", 45%, 22%)")("color", "hsl(" + ctx_r3.getAvatarHue(client_r8) + ", 70%, 78%)");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", ctx_r3.getInitials(client_r8), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate"](ctx_r3.getFullName(client_r8));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", client_r8.user);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("name", ctx_r3.isClientSelected(client_r8) ? "checkmark-circle" : "ellipse-outline");
  }
}
function ApplyCheckinTemplateModalComponent_span_20_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate2"](" Aplicar a ", ctx_r4.selectedClientIds.size, " cliente", ctx_r4.selectedClientIds.size === 1 ? "" : "s", " ");
  }
}
function ApplyCheckinTemplateModalComponent_ion_spinner_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "ion-spinner", 30);
  }
}
// Extraído de checkin-templates.page.ts / templates.page.ts (duplicado en
// ambas) a un modal standalone real. El panel "Aplicar" vivía como un
// <div position:fixed> hecho a mano DENTRO de la página que lo abría —
// Ionic marca `.ion-page` con `contain: layout`, que la convierte en
// containing block de ese `fixed`: el panel dejaba de posicionarse contra
// el viewport y se apilaba codo a codo con el <ion-header> de esa misma
// página, quedando tapado por él. Un ion-modal real (ModalController) se
// adjunta fuera de `.ion-page`, en la capa de overlays de Ionic — mismo
// mecanismo que ya usan sin problema los buscadores de clientes/ejercicios.
// cssClass: 'tf-panel-modal' (theme/tokens.scss) le da el mismo aspecto de
// panel anclado a la derecha en escritorio que tenía el div original.
class ApplyCheckinTemplateModalComponent {
  constructor(modalController, checkinTemplatesApi, trainerClientsApi, ionicUtilService) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "modalController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "checkinTemplatesApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "trainerClientsApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "ionicUtilService", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "template", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "loadingClients", true);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "myClients", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selectedClientIds", new Set());
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "isApplying", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "searchQuery", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "filteredClients", []);
    this.modalController = modalController;
    this.checkinTemplatesApi = checkinTemplatesApi;
    this.trainerClientsApi = trainerClientsApi;
    this.ionicUtilService = ionicUtilService;
  }
  ngOnInit() {
    this.trainerClientsApi.getMyClients().subscribe(clients => {
      this.myClients = clients || [];
      this.loadingClients = false;
      this.applyFilteredClients();
    });
  }
  dismiss() {
    this.modalController.dismiss();
  }
  onSearchChange(value) {
    this.searchQuery = value;
    this.applyFilteredClients();
  }
  applyFilteredClients() {
    const query = this.searchQuery.trim().toLowerCase();
    this.filteredClients = !query ? this.myClients : this.myClients.filter(c => {
      if (!c.user) return false;
      const haystack = `${c.user.name} ${c.user.lastname} ${c.user.email}`.toLowerCase();
      return haystack.includes(query);
    });
  }
  toggleClientSelected(client) {
    const id = client.user?._id;
    if (!id) return;
    if (this.selectedClientIds.has(id)) this.selectedClientIds.delete(id);else this.selectedClientIds.add(id);
  }
  isClientSelected(client) {
    return !!client.user && this.selectedClientIds.has(client.user._id);
  }
  confirmApply() {
    if (!this.selectedClientIds.size || this.isApplying) return;
    this.isApplying = true;
    this.checkinTemplatesApi.apply(this.template._id, [...this.selectedClientIds]).subscribe({
      next: result => {
        this.isApplying = false;
        const total = result.applied.length + result.skipped.length;
        this.ionicUtilService.showToast({
          message: result.skipped.length > 0 ? `Aplicada a ${result.applied.length} de ${total} clientes (${result.skipped.length} sin relación activa)` : `Aplicada a ${result.applied.length} cliente${result.applied.length === 1 ? '' : 's'}`,
          duration: 3500
        });
        this.modalController.dismiss(true);
      },
      error: () => {
        this.isApplying = false;
        this.ionicUtilService.showErrorToast('No se pudo aplicar la plantilla', 'Error', 3000);
      }
    });
  }
  getFullName(client) {
    if (!client.user) return 'Cliente';
    return `${client.user.name} ${client.user.lastname}`.trim();
  }
  // Mismo patrón de avatar (iniciales + tono por hash del id) que clients.page.ts.
  getInitials(client) {
    if (!client.user) return '?';
    const name = client.user.name?.charAt(0) || '';
    const lastname = client.user.lastname?.charAt(0) || '';
    return (name + lastname).toUpperCase() || '?';
  }
  getAvatarHue(client) {
    const id = client.user?._id || '';
    let sum = 0;
    for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
    return ApplyCheckinTemplateModalComponent.AVATAR_HUES[sum % ApplyCheckinTemplateModalComponent.AVATAR_HUES.length];
  }
  trackByClientId(_index, client) {
    return client.user?._id || _index.toString();
  }
}
_ApplyCheckinTemplateModalComponent = ApplyCheckinTemplateModalComponent;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ApplyCheckinTemplateModalComponent, "AVATAR_HUES", [18, 45, 200, 260, 320, 160]);
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ApplyCheckinTemplateModalComponent, "\u0275fac", function ApplyCheckinTemplateModalComponent_Factory(t) {
  return new (t || _ApplyCheckinTemplateModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_5__.ModalController), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_services_checkin_templates_api_service__WEBPACK_IMPORTED_MODULE_1__.CheckinTemplatesApiService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_clients_services_trainer_clients_api_service__WEBPACK_IMPORTED_MODULE_2__.TrainerClientsApiService), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_3__.IonicUtilService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ApplyCheckinTemplateModalComponent, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
  type: _ApplyCheckinTemplateModalComponent,
  selectors: [["app-apply-checkin-template-modal"]],
  inputs: {
    template: "template"
  },
  standalone: true,
  features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
  decls: 22,
  vars: 9,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["type", "button", "aria-label", "Cerrar", 1, "tf-page-header__back-button", 3, "click"], ["name", "close-outline"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "apply-modal-content"], [1, "panel-subtitle"], ["class", "input-wrapper", 4, "ngIf"], ["class", "empty-hint", 4, "ngIf"], [1, "apply-client-list"], ["class", "apply-client-row", 3, "apply-client-row--selected", "disabled", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "apply-modal-footer"], [1, "submit-button", 3, "disabled", "click"], [4, "ngIf"], ["name", "dots", 4, "ngIf"], [1, "input-wrapper"], ["name", "search-outline", 1, "input-icon"], ["type", "text", "placeholder", "Buscar por nombre o correo", 1, "input-field", 3, "ngModel", "ngModelChange"], [1, "empty-hint"], [1, "apply-client-row", 3, "disabled", "click"], [1, "apply-client-avatar"], [1, "apply-client-info"], [1, "apply-client-name"], ["class", "apply-client-email", 4, "ngIf"], [1, "apply-client-check", 3, "name"], [1, "apply-client-email"], ["name", "dots"]],
  template: function ApplyCheckinTemplateModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ApplyCheckinTemplateModalComponent_Template_button_click_4_listener() {
        return ctx.dismiss();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](5, "ion-icon", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "div", 6)(7, "h1", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](9, "div", 8);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "ion-content", 9)(11, "p", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](12, "Selecciona los clientes a los que quieres aplicar esta plantilla.");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](13, ApplyCheckinTemplateModalComponent_div_13_Template, 3, 1, "div", 11);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](14, ApplyCheckinTemplateModalComponent_p_14_Template, 2, 0, "p", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](15, ApplyCheckinTemplateModalComponent_p_15_Template, 2, 0, "p", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](16, "div", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](17, ApplyCheckinTemplateModalComponent_button_17_Template, 8, 11, "button", 14);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "ion-footer", 15)(19, "button", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function ApplyCheckinTemplateModalComponent_Template_button_click_19_listener() {
        return ctx.confirmApply();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](20, ApplyCheckinTemplateModalComponent_span_20_Template, 2, 2, "span", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](21, ApplyCheckinTemplateModalComponent_ion_spinner_21_Template, 1, 0, "ion-spinner", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](8);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Aplicar \"", ctx.template == null ? null : ctx.template.name, "\"");
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.myClients.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.loadingClients && !ctx.myClients.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.myClients.length && !ctx.filteredClients.length);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngForOf", ctx.filteredClients)("ngForTrackBy", ctx.trackByClientId);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("disabled", !ctx.selectedClientIds.size || ctx.isApplying);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", !ctx.isApplying);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isApplying);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonicModule, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.IonSpinner],
  styles: [".apply-modal-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 16px;\n  --padding-bottom: 16px;\n}\n\n.panel-subtitle[_ngcontent-%COMP%] {\n  font-size: 0.85rem;\n  color: var(--tf-text-muted);\n  margin: 0 0 14px;\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n  height: 50px;\n  margin-bottom: 16px;\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  flex-shrink: 0;\n  font-size: 18px;\n}\n\n.input-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n  font-size: 0.95rem;\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.empty-hint[_ngcontent-%COMP%] {\n  font-size: 0.86rem;\n  color: var(--tf-text-muted);\n  margin: 0 0 8px;\n}\n\n.apply-client-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.apply-client-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  width: 100%;\n  padding: 9px 10px;\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: 12px;\n  margin-bottom: 4px;\n  font-family: inherit;\n  text-align: left;\n  cursor: pointer;\n  transition: background 160ms var(--tf-ease-out), border-color 160ms var(--tf-ease-out);\n}\n.apply-client-row[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.apply-client-row[_ngcontent-%COMP%]:active {\n  background: var(--tf-surface-2);\n}\n.apply-client-row[_ngcontent-%COMP%]:disabled {\n  opacity: 0.4;\n  cursor: default;\n}\n.apply-client-row--selected[_ngcontent-%COMP%] {\n  background: var(--tf-accent-soft);\n  border-color: var(--tf-accent-soft-border);\n}\n\n.apply-client-avatar[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 0.8rem;\n  font-weight: 700;\n}\n\n.apply-client-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  gap: 1px;\n}\n\n.apply-client-name[_ngcontent-%COMP%] {\n  font-size: 0.88rem;\n  font-weight: 600;\n  color: var(--tf-text);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.apply-client-email[_ngcontent-%COMP%] {\n  font-size: 0.76rem;\n  color: var(--tf-text-muted);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.apply-client-check[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  font-size: 20px;\n  color: var(--tf-text-faint);\n}\n.apply-client-row--selected[_ngcontent-%COMP%]   .apply-client-check[_ngcontent-%COMP%] {\n  color: var(--tf-accent);\n}\n\n.apply-modal-footer[_ngcontent-%COMP%] {\n  --background: var(--tf-surface-1);\n  padding: 12px 16px;\n  border-top: 1px solid var(--tf-border);\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  width: 100%;\n  height: 50px;\n  font-size: 0.95rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.submit-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvY2hlY2tpbi10ZW1wbGF0ZXMvY29tcG9uZW50cy9hcHBseS1jaGVja2luLXRlbXBsYXRlLW1vZGFsL2FwcGx5LWNoZWNraW4tdGVtcGxhdGUtbW9kYWwuY29tcG9uZW50LnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvdGhlbWUvX2lucHV0cy5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19idXR0b25zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0E7RUFDRSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHNCQUFBO0FBRkY7O0FBS0E7RUFDRSxrQkFBQTtFQUNBLDJCQUFBO0VBQ0EsZ0JBQUE7QUFGRjs7QUFLQTtFQ1hFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSwrQkRTMEI7RUNSMUIseUNBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpREFBQTtFRE1BLFlBQUE7RUFDQSxtQkFBQTtBQUtGO0FDVkU7RUFDRSw4QkFBQTtBRFlKOztBQUxBO0VDRkUsMkJBQUE7RUFDQSxjQUFBO0VER0EsZUFBQTtBQVNGOztBQU5BO0VDRkUsT0FBQTtFQUNBLFlBQUE7RUFDQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EscUJBQUE7RUFDQSxvQkFBQTtFQUNBLFlBQUE7RURIQSxrQkFBQTtBQWdCRjtBQ1hFO0VBQ0UsMkJBQUE7QURhSjs7QUFoQkE7RUFDRSxrQkFBQTtFQUNBLDJCQUFBO0VBQ0EsZUFBQTtBQW1CRjs7QUFoQkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7QUFtQkY7O0FBaEJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxpQkFBQTtFQUNBLHVCQUFBO0VBQ0EsNkJBQUE7RUFDQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxzRkFBQTtBQW1CRjtBQWpCRTtFQUNFLGdCQUFBO0FBbUJKO0FBaEJFO0VBQ0UsK0JBQUE7QUFrQko7QUFmRTtFQUNFLFlBQUE7RUFDQSxlQUFBO0FBaUJKO0FBZEU7RUFDRSxpQ0FBQTtFQUNBLDBDQUFBO0FBZ0JKOztBQVpBO0VBQ0UsY0FBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUFlRjs7QUFaQTtFQUNFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtBQWVGOztBQVpBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBZUY7O0FBWkE7RUFDRSxrQkFBQTtFQUNBLDJCQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQUNBLG1CQUFBO0FBZUY7O0FBWkE7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLDJCQUFBO0FBZUY7QUFiRTtFQUNFLHVCQUFBO0FBZUo7O0FBWEE7RUFDRSxpQ0FBQTtFQUNBLGtCQUFBO0VBQ0Esc0NBQUE7QUFjRjs7QUFYQTtFRXpIRSxZQUFBO0VBQ0EsbUJBRmlDO0VBR2pDLHFDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFDQSxnRkFBQTtFRnFIQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUFvQkY7QUU1SUU7RUFDRSxzQkFBQTtBRjhJSjtBRTNJRTtFQUNFLGFBQUE7RUFDQSxlQUFBO0FGNklKO0FFMUlFO0VBQ0UsaUNBQUE7RUFDQSxtQkFBQTtBRjRJSiIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJy4uLy4uLy4uLy4uLy4uL3RoZW1lL2J1dHRvbnMnO1xuQGltcG9ydCAnLi4vLi4vLi4vLi4vLi4vdGhlbWUvaW5wdXRzJztcblxuLmFwcGx5LW1vZGFsLWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLXRmLWJnKTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxNnB4O1xuICAtLXBhZGRpbmctZW5kOiAxNnB4O1xuICAtLXBhZGRpbmctdG9wOiAxNnB4O1xuICAtLXBhZGRpbmctYm90dG9tOiAxNnB4O1xufVxuXG4ucGFuZWwtc3VidGl0bGUge1xuICBmb250LXNpemU6IDAuODVyZW07XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgbWFyZ2luOiAwIDAgMTRweDtcbn1cblxuLmlucHV0LXdyYXBwZXIge1xuICBAaW5jbHVkZSB0Zi1pbnB1dC13cmFwcGVyKHZhcigtLXRmLXN1cmZhY2UtMikpO1xuICBoZWlnaHQ6IDUwcHg7XG4gIG1hcmdpbi1ib3R0b206IDE2cHg7XG59XG5cbi5pbnB1dC1pY29uIHtcbiAgQGluY2x1ZGUgdGYtaW5wdXQtaWNvbjtcbiAgZm9udC1zaXplOiAxOHB4O1xufVxuXG4uaW5wdXQtZmllbGQge1xuICBAaW5jbHVkZSB0Zi1pbnB1dC1maWVsZDtcbiAgZm9udC1zaXplOiAwLjk1cmVtO1xufVxuXG4uZW1wdHktaGludCB7XG4gIGZvbnQtc2l6ZTogMC44NnJlbTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBtYXJnaW46IDAgMCA4cHg7XG59XG5cbi5hcHBseS1jbGllbnQtbGlzdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5hcHBseS1jbGllbnQtcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogOXB4IDEwcHg7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogNHB4O1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSwgYm9yZGVyLWNvbG9yIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmxhc3QtY2hpbGQge1xuICAgIG1hcmdpbi1ib3R0b206IDA7XG4gIH1cblxuICAmOmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0yKTtcbiAgfVxuXG4gICY6ZGlzYWJsZWQge1xuICAgIG9wYWNpdHk6IDAuNDtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gIH1cblxuICAmLS1zZWxlY3RlZCB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LXNvZnQpO1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYWNjZW50LXNvZnQtYm9yZGVyKTtcbiAgfVxufVxuXG4uYXBwbHktY2xpZW50LWF2YXRhciB7XG4gIGZsZXgtc2hyaW5rOiAwO1xuICB3aWR0aDogMzhweDtcbiAgaGVpZ2h0OiAzOHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmb250LXNpemU6IDAuOHJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbn1cblxuLmFwcGx5LWNsaWVudC1pbmZvIHtcbiAgZmxleDogMTtcbiAgbWluLXdpZHRoOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBnYXA6IDFweDtcbn1cblxuLmFwcGx5LWNsaWVudC1uYW1lIHtcbiAgZm9udC1zaXplOiAwLjg4cmVtO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uYXBwbHktY2xpZW50LWVtYWlsIHtcbiAgZm9udC1zaXplOiAwLjc2cmVtO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uYXBwbHktY2xpZW50LWNoZWNrIHtcbiAgZmxleC1zaHJpbms6IDA7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtZmFpbnQpO1xuXG4gIC5hcHBseS1jbGllbnQtcm93LS1zZWxlY3RlZCAmIHtcbiAgICBjb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgfVxufVxuXG4uYXBwbHktbW9kYWwtZm9vdGVyIHtcbiAgLS1iYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTEpO1xuICBwYWRkaW5nOiAxMnB4IDE2cHg7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xufVxuXG4uc3VibWl0LWJ1dHRvbiB7XG4gIEBpbmNsdWRlIHRmLWdyYWRpZW50LWJ1dHRvbjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNTBweDtcbiAgZm9udC1zaXplOiAwLjk1cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cbiIsIi8vIEZpbGEgZGUgaW5wdXQgY29uIGljb25vICh3cmFwcGVyICsgaWNvbm8gKyBjYW1wbykgw6LCgMKUIHJlcGV0aWRhIGVuIDQgcMODwqFnaW5hc1xuLy8gYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS4gRWwgZm9uZG9cbi8vIGRlbCB3cmFwcGVyIGVzIGVsIMODwrpuaWNvIHZhbG9yIHF1ZSB2YXLDg8KtYSBwb3IgcMODwqFnaW5hIChzdXBlcmZpY2llIDEgbyAyIHNlZ8ODwrpuXG4vLyBjb250ZXh0byB2aXN1YWwpLCBkZSBhaMODwq0gZWwgcGFyw4PCoW1ldHJvOyB0YW1hw4PCsW8gZGUgZnVlbnRlL2FsdG8vbWFyZ2VuIHNlXG4vLyBkZWphbiBmdWVyYSBkZWwgbWl4aW4gcG9ycXVlIGNhZGEgcMODwqFnaW5hIGxvcyBmaWphIHNlZ8ODwrpuIHN1IHByb3BpbyBsYXlvdXQuXG5AbWl4aW4gdGYtaW5wdXQtd3JhcHBlcigkYmc6IHZhcigtLXRmLXN1cmZhY2UtMSkpIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xuICBiYWNrZ3JvdW5kOiAkYmc7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAwIDE0cHg7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjpmb2N1cy13aXRoaW4ge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgfVxufVxuXG5AbWl4aW4gdGYtaW5wdXQtaWNvbiB7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbkBtaXhpbiB0Zi1pbnB1dC1maWVsZCB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgb3V0bGluZTogbm9uZTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgaGVpZ2h0OiAxMDAlO1xuXG4gICY6OnBsYWNlaG9sZGVyIHtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIH1cbn1cbiIsIi8vIEJvdMODwrNuIENUQSBjb24gZ3JhZGllbnRlIGRlIGFjZW50byDDosKAwpQgbWlzbW8gYmxvcXVlIHJlcGV0aWRvIGVuIH4xMSBzaXRpb3MgZGVcbi8vIH4xMCBww4PCoWdpbmFzIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuXG4vLyBDYWRhIHDDg8KhZ2luYSBhcGxpY2EgZWwgbWl4aW4gc29icmUgc3UgcHJvcGlvIHNlbGVjdG9yIHkgYcODwrFhZGUgZW5jaW1hIHNvbG8gbG9cbi8vIHF1ZSB2YXLDg8KtYSBwb3IgbGF5b3V0ICh3aWR0aCwgaGVpZ2h0LCBmb250LXNpemUsIG1hcmdpbikuXG4vL1xuLy8gTGEgbWl0YWQgZGUgbG9zIHNpdGlvcyBvcmlnaW5hbGVzIG5vIHRlbsODwq1hbiB0cmFuc2ljacODwrNuL2ZlZWRiYWNrIGRlIHB1bHNhY2nDg8KzblxuLy8gbmkgOmZvY3VzLXZpc2libGUgw6LCgMKUIGVsIG1peGluIGxvcyBhw4PCsWFkZSBzaWVtcHJlLCBjaWVycmEgZXNlIGh1ZWNvIGRlXG4vLyBjb25zaXN0ZW5jaWEgZGUgaW50ZXJhY2Npw4PCs24gKFBST0RVQ1QubWQ6IFwidW4gc29sbyBwYXRyw4PCs24gcG9yIHRpcG8gZGVcbi8vIGNvbXBvbmVudGVcIikgZW4gdmV6IGRlIHBlcnBldHVhciBsYSB2YXJpYWNpw4PCs24gYWNjaWRlbnRhbC5cbkBtaXhpbiB0Zi1ncmFkaWVudC1idXR0b24oJHJhZGl1czogMTJweCkge1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6ICRyYWRpdXM7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLWFjY2VudC1ncmFkaWVudCk7XG4gIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQtY29udHJhc3QpO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCksIG9wYWNpdHkgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTcpO1xuICB9XG5cbiAgJjpkaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogMC40NTtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi10ZXh0KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG59XG5cbi8vIEJvdMODwrNuIGRlIGhlYWRlciBxdWUgZXMgc29sbyB1biBpY29ubyDDosKAwpQgbWlzbW8gbG9vayBcImVudnVlbHRvXCIgcXVlIHlhIHVzYSBsYVxuLy8gYXBwIGRlIGNvbnN1bWlkb3IgZW4gc3VzIHRvb2xiYXJzIChwYWNrYWdlcy9zaGFyZWQtZmVhdHVyZXMvLi4uL2RpZXRzL1xuLy8gY29tcG9uZW50cy90b29sYmFyLWNhbGVuZGFyOiBmb25kbyArIGJvcmRlci1yYWRpdXMgKyBjYWphIGZpamEgNDR4NDQsIGVuXG4vLyB2ZXogZGVsIGlvbi1idXR0b24gcGxhbm8vdHJhbnNwYXJlbnRlIHF1ZSB0ZW7Dg8KtYSBjYWRhIHBhbnRhbGxhIGRlIHRyYWluZXJzXG4vLyBoYXN0YSBhaG9yYSkuIFRva2VuZWFkbyBhIGxhIHBhbGV0YSBkZSBlc3RhIGFwcCBlbiB2ZXogZGUgcmVwZXRpciBsb3Ncbi8vIHJnYmEoMjU1LDI1NSwyNTUsLi4uKSBzdWVsdG9zIGRlbCBvcmlnaW5hbC5cbi8vXG4vLyBTaXJ2ZSB0YW50byBwYXJhIDxpb24tYnV0dG9uIGZpbGw9XCJjbGVhclwiPiAodXNhIGxhcyBDU1MgY3VzdG9tIHByb3BlcnRpZXNcbi8vIGRlIElvbmljKSBjb21vIHBhcmEgdW4gPGJ1dHRvbj4gbmF0aXZvICh1c2EgbGFzIHByb3BpZWRhZGVzIHBsYW5hcykgw6LCgMKUXG4vLyBhbWJvcyBjb2V4aXN0ZW4gaG95IGVuIHRyYWluZXJzIHBhcmEgZWwgbWlzbW8gcm9sIGRlIFwidm9sdmVyXCIvXCJjZXJyYXJcIi5cbkBtaXhpbiB0Zi1pY29uLWJ1dHRvbigkc2l6ZTogNDRweCwgJHJhZGl1czogMTJweCwgJGljb24tc2l6ZTogMjBweCkge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG4gIC0tYmFja2dyb3VuZC1hY3RpdmF0ZWQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIC0tYmFja2dyb3VuZC1ob3ZlcjogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1iYWNrZ3JvdW5kLWZvY3VzZWQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIC0tY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgLS1ib3JkZXItcmFkaXVzOiAjeyRyYWRpdXN9O1xuICAtLXBhZGRpbmctc3RhcnQ6IDA7XG4gIC0tcGFkZGluZy1lbmQ6IDA7XG4gIC0tcGFkZGluZy10b3A6IDA7XG4gIC0tcGFkZGluZy1ib3R0b206IDA7XG5cbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAkcmFkaXVzO1xuICB3aWR0aDogJHNpemU7XG4gIGhlaWdodDogJHNpemU7XG4gIG1pbi13aWR0aDogJHNpemU7XG4gIG1pbi1oZWlnaHQ6ICRzaXplO1xuICBtYXJnaW46IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpLFxuICAgIGNvbG9yIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6ICRpY29uLXNpemU7XG4gIH1cbn1cblxuLy8gRXhwYW5zb3IgaW52aXNpYmxlIGRlIHpvbmEgcHVsc2FibGUuXG4vL1xuLy8gUEFSQSBRVcODwok6IHVuIGNvbnRyb2wgY29tcGFjdG8gKHVuIGljb25vIGRlIDMyIHB4IGVuIHVuYSBmaWxhIGRlIHRhYmxhLCB1blxuLy8gZW5sYWNlIGRlIHRleHRvIGRlIDE2IHB4KSBubyBsbGVnYSBhIGxvcyA0NCBweCBxdWUgZXhpZ2UgUFJPRFVDVC5tZCwgeVxuLy8gZW5nb3JkYXJsbyBkZSB2ZXJkYWQgZGVzcGxhemEgdG9kbyBsbyBxdWUgdGllbmUgYWxyZWRlZG9yIMOiwoDClCBlbiB1bmEgdGFibGFcbi8vIGRlIHZlaW50ZSBmaWxhcywgOCBweCBwb3IgZmlsYSBzb24gbWVkaWEgcGFudGFsbGEuXG4vL1xuLy8gRWwgcHNldWRvZWxlbWVudG8gY3JlY2UgaGFjaWEgZnVlcmEgc2luIG9jdXBhciBzaXRpbyBlbiBlbCBmbHVqbywgYXPDg8KtIHF1ZVxuLy8gZWwgYm90w4PCs24gc2UgdmUgcGVxdWXDg8KxbyB5IHNlIHB1bHNhIGdyYW5kZS5cbi8vXG4vLyBBVklTTyBERSBNRURJQ0nDg8KTTjogZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgTk8gdmUgZXN0ZSBwc2V1ZG9lbGVtZW50bywgYXPDg8KtXG4vLyBxdWUgYWwgdmVyaWZpY2FyIGhheSBxdWUgdXNhciBlbGVtZW50RnJvbVBvaW50IGNvbiBlbCBlbGVtZW50byBkZW50cm8gZGVsXG4vLyB2aWV3cG9ydC4gQWRlbcODwqFzIGVsIGhpdC10ZXN0IGRldnVlbHZlIDIgcHggbWVub3MgcXVlIGxhIGNhamEgZGVjbGFyYWRhXG4vLyAoY29tcHJvYmFkbzogLTRweCBkYSA0MiwgLTZweCBkYSA0NiksIGFzw4PCrSBxdWUgdW4gNDIgbWVkaWRvIHNvbiA0NCByZWFsZXMuXG4vL1xuLy8gJGdyb3c6IGN1w4PCoW50byBjcmVjZSBwb3IgY2FkYSBsYWRvLiA0cHggbGxldmEgdW4gY29udHJvbCBkZSAzNiBweCBhIDQ0LlxuQG1peGluIHRmLXRvdWNoLWV4cGFuZGVyKCRncm93OiA0cHgpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGluc2V0OiAtI3skZ3Jvd307XG4gIH1cbn1cblxuLy8gVmFyaWFudGUgcXVlIHNvbG8gY3JlY2UgZW4gVkVSVElDQUwuIFBhcmEgY29udHJvbGVzIGVuIGZpbGEgZG9uZGUgZWxcbi8vIGV4cGFuc29yIGhvcml6b250YWwgc2Ugc29sYXBhcsODwq1hIGNvbiBlbCBkZSBhbCBsYWRvIHkgcm9iYXLDg8KtYSBzdXMgdG9xdWVzLlxuQG1peGluIHRmLXRvdWNoLWV4cGFuZGVyLXkoJGdyb3c6IDRweCkge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAtI3skZ3Jvd307XG4gICAgYm90dG9tOiAtI3skZ3Jvd307XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
}));


/***/ }),

/***/ 47672:
/*!**************************************************************************************!*\
  !*** ./src/app/features/checkin-templates/services/checkin-templates-api.service.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckinTemplatesApiService: () => (/* binding */ CheckinTemplatesApiService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/http/http.service */ 88552);

var _CheckinTemplatesApiService;


class CheckinTemplatesApiService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  list() {
    return this.http.get('trainer/checkin-templates');
  }
  create(name, enabledFields, cadence, customQuestions = []) {
    return this.http.post('trainer/checkin-templates', {
      name,
      enabledFields,
      cadence,
      customQuestions
    });
  }
  update(id, updates) {
    return this.http.put(`trainer/checkin-templates/${id}`, updates);
  }
  delete(id) {
    return this.http.delete(`trainer/checkin-templates/${id}`);
  }
  apply(id, clientIds) {
    return this.http.post(`trainer/checkin-templates/${id}/apply`, {
      clientIds
    });
  }
}
_CheckinTemplatesApiService = CheckinTemplatesApiService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CheckinTemplatesApiService, "\u0275fac", function CheckinTemplatesApiService_Factory(t) {
  return new (t || _CheckinTemplatesApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CheckinTemplatesApiService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _CheckinTemplatesApiService,
  factory: _CheckinTemplatesApiService.ɵfac,
  providedIn: 'root'
}));


/***/ }),

/***/ 60562:
/*!**************************************************************************!*\
  !*** ./src/app/features/clients/services/trainer-clients-api.service.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TrainerClientsApiService: () => (/* binding */ TrainerClientsApiService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/http/http.service */ 88552);

var _TrainerClientsApiService;


class TrainerClientsApiService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  getMyClients() {
    return this.http.get(TrainerClientsApiService.ENDPOINT);
  }
  // TASK-022 (MASTER_BACKLOG.md) — ruta nueva y aditiva (ver trainer-client-
  // routes.js), no sustituye a getMyClients(): los demás consumidores de
  // esa lista (dashboard, select-clients-modal, etc.) siguen necesitando el
  // listado completo.
  getMyClientsPaginated(page, limit, search) {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit)
    });
    if (search.trim()) params.set('search', search.trim());
    return this.http.get(`${TrainerClientsApiService.ENDPOINT}/paginated?${params.toString()}`);
  }
}
_TrainerClientsApiService = TrainerClientsApiService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TrainerClientsApiService, "ENDPOINT", 'trainer/clients');
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TrainerClientsApiService, "\u0275fac", function TrainerClientsApiService_Factory(t) {
  return new (t || _TrainerClientsApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(TrainerClientsApiService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _TrainerClientsApiService,
  factory: _TrainerClientsApiService.ɵfac,
  providedIn: 'root'
}));


/***/ })

}]);
//# sourceMappingURL=default-src_app_features_checkin-templates_components_apply-checkin-template-modal_apply-chec-5aea39.js.map