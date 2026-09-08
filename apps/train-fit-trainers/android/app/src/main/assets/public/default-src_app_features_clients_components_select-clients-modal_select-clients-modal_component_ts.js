"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_features_clients_components_select-clients-modal_select-clients-modal_component_ts"],{

/***/ 81800:
/*!****************************************************************************************************!*\
  !*** ./src/app/features/clients/components/select-clients-modal/select-clients-modal.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SelectClientsModalComponent: () => (/* binding */ SelectClientsModalComponent)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 37728);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 27453);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 51097);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _services_trainer_clients_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services/trainer-clients-api.service */ 60562);
/* harmony import */ var _pages_client_detail_services_client_detail_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../pages/client-detail/services/client-detail-api.service */ 61776);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 31133);

var _SelectClientsModalComponent;







function SelectClientsModalComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "div", 9)(2, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function SelectClientsModalComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 10)(1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "No se pudo cargar la lista de clientes.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function SelectClientsModalComponent_ng_container_10_p_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "p", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1, " No tienes m\u00E1s clientes activos con este tipo de relaci\u00F3n. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
}
function SelectClientsModalComponent_ng_container_10_div_2_span_5_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "span", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "ion-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const allergies_r8 = ctx.ngIf;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", allergies_r8, " ");
  }
}
function SelectClientsModalComponent_ng_container_10_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SelectClientsModalComponent_ng_container_10_div_2_Template_div_click_0_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const client_r6 = restoredCtx.$implicit;
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r9.toggle(client_r6.user._id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "ion-checkbox", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SelectClientsModalComponent_ng_container_10_div_2_Template_ion_checkbox_click_1_listener($event) {
      return $event.stopPropagation();
    })("ionChange", function SelectClientsModalComponent_ng_container_10_div_2_Template_ion_checkbox_ionChange_1_listener() {
      const restoredCtx = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const client_r6 = restoredCtx.$implicit;
      const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r12.toggle(client_r6.user._id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", 16)(3, "span", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](5, SelectClientsModalComponent_ng_container_10_div_2_span_5_Template, 3, 1, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const client_r6 = ctx.$implicit;
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("checked", ctx_r5.isSelected(client_r6.user._id));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r5.fullName(client_r6));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r5.allergiesFor(client_r6.user._id));
  }
}
function SelectClientsModalComponent_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, SelectClientsModalComponent_ng_container_10_p_1_Template, 2, 0, "p", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, SelectClientsModalComponent_ng_container_10_div_2_Template, 6, 3, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx_r2.clients.length);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r2.clients)("ngForTrackBy", ctx_r2.trackByClientId);
  }
}
function SelectClientsModalComponent_ion_footer_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-footer", 0)(1, "ion-toolbar")(2, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SelectClientsModalComponent_ion_footer_11_Template_button_click_2_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r14);
      const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r13.confirm());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", !ctx_r3.selectedIds.size);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate2"](" Aplicar a ", ctx_r3.selectedIds.size, " cliente", ctx_r3.selectedIds.size === 1 ? "" : "s", " ");
  }
}
// F30 — selector múltiple de clientes destino para "aplicar en bloque"
// (rutinas F11, comidas F12, objetivos F13). Reutilizable desde cualquier
// punto de client-detail.page que necesite propagar una operación ya
// realizada sobre UN cliente hacia varios más. También usado sin cliente
// origen desde el composer multi-cliente (TAREA5, Fase D) — por eso
// excludeClientId es opcional.
class SelectClientsModalComponent {
  constructor(trainerClientsApi, clientDetailApi, modalController) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "trainerClientsApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "clientDetailApi", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "modalController", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "excludeClientId", void 0);
    // Fase 3 Coach Pro — pasa a ser OPCIONAL. Los tres consumidores originales
    // (rutinas, comidas, objetivos) siguen pasándolo y filtrando igual; el
    // selector de clientes de una automatización no puede exigir un ámbito,
    // porque una regla sobre el peso vale tanto para un cliente de nutrición
    // como para uno de entrenamiento.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "requiredScope", void 0);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "title", 'Aplicar a otros clientes');
    // Fase 3 Coach Pro — permite reabrir el selector con lo ya elegido en vez
    // de empezar de cero cada vez que se edita una regla.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "preselectedIds", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "state", 'loading');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "clients", []);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "selectedIds", new Set());
    // TAREA5 (auditoría UX, Fase D) — aviso de alergias antes de aplicar la
    // misma composición a varios clientes a la vez, para no mandar por error
    // un alimento que alguno no puede comer.
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "allergiesByClientId", new Map());
    this.trainerClientsApi = trainerClientsApi;
    this.clientDetailApi = clientDetailApi;
    this.modalController = modalController;
  }
  ngOnInit() {
    this.preselectedIds.forEach(id => this.selectedIds.add(id));
    this.trainerClientsApi.getMyClients().subscribe({
      next: clients => {
        this.clients = (clients || []).filter(c => c.user && c.user._id !== this.excludeClientId && (
        // Sin requiredScope no se filtra por ámbito (ver el @Input).
        !this.requiredScope || c.scopes.includes(this.requiredScope)));
        this.state = 'loaded';
        if (this.requiredScope === 'nutrition') this.loadAllergies();
      },
      error: () => {
        this.state = 'error';
      }
    });
  }
  loadAllergies() {
    const withIds = this.clients.filter(c => c.user?._id);
    if (!withIds.length) return;
    (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.forkJoin)(withIds.map(c => this.clientDetailApi.getNutritionPreferences(c.user._id).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(null))))).subscribe(results => {
      results.forEach((prefs, i) => {
        const allergies = prefs?.allergies?.trim();
        if (allergies) this.allergiesByClientId.set(withIds[i].user._id, allergies);
      });
    });
  }
  allergiesFor(clientId) {
    return this.allergiesByClientId.get(clientId) || null;
  }
  toggle(clientId) {
    if (this.selectedIds.has(clientId)) {
      this.selectedIds.delete(clientId);
    } else {
      this.selectedIds.add(clientId);
    }
  }
  isSelected(clientId) {
    return this.selectedIds.has(clientId);
  }
  fullName(client) {
    if (!client.user) return 'Cliente';
    return `${client.user.name} ${client.user.lastname}`.trim();
  }
  trackByClientId(_index, client) {
    return client.user?._id || _index.toString();
  }
  dismiss() {
    void this.modalController.dismiss(null, 'cancel');
  }
  confirm() {
    if (!this.selectedIds.size) return;
    void this.modalController.dismiss({
      targetClientIds: Array.from(this.selectedIds)
    }, 'confirm');
  }
}
_SelectClientsModalComponent = SelectClientsModalComponent;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SelectClientsModalComponent, "\u0275fac", function SelectClientsModalComponent_Factory(t) {
  return new (t || _SelectClientsModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_services_trainer_clients_api_service__WEBPACK_IMPORTED_MODULE_1__.TrainerClientsApiService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_pages_client_detail_services_client_detail_api_service__WEBPACK_IMPORTED_MODULE_2__.ClientDetailApiService), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_ionic_angular__WEBPACK_IMPORTED_MODULE_7__.ModalController));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(SelectClientsModalComponent, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
  type: _SelectClientsModalComponent,
  selectors: [["app-select-clients-modal"]],
  inputs: {
    excludeClientId: "excludeClientId",
    requiredScope: "requiredScope",
    title: "title",
    preselectedIds: "preselectedIds"
  },
  decls: 12,
  vars: 5,
  consts: [[1, "ion-no-border"], ["slot", "end"], [3, "click"], [1, "select-clients-content"], ["class", "detail-skeleton", 4, "ngIf"], ["class", "section-error", 4, "ngIf"], [4, "ngIf"], ["class", "ion-no-border", 4, "ngIf"], [1, "detail-skeleton"], [1, "skeleton-block", 2, "height", "52px"], [1, "section-error"], ["class", "empty-hint", 4, "ngIf"], ["class", "client-row", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "empty-hint"], [1, "client-row", 3, "click"], ["mode", "ios", 3, "checked", "click", "ionChange"], [1, "client-info"], [1, "client-name"], ["class", "client-allergy-warning", 4, "ngIf"], [1, "client-allergy-warning"], ["name", "warning-outline"], [1, "confirm-button", 3, "disabled", "click"]],
  template: function SelectClientsModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "ion-header", 0)(1, "ion-toolbar")(2, "ion-title");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "ion-buttons", 1)(5, "ion-button", 2);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function SelectClientsModalComponent_Template_ion_button_click_5_listener() {
        return ctx.dismiss();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Cerrar");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "ion-content", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](8, SelectClientsModalComponent_div_8_Template, 3, 0, "div", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, SelectClientsModalComponent_div_9_Template, 3, 0, "div", 5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, SelectClientsModalComponent_ng_container_10_Template, 3, 3, "ng-container", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](11, SelectClientsModalComponent_ion_footer_11_Template, 4, 3, "ion-footer", 7);
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.title);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.state === "loading");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.state === "error");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.state === "loaded");
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.state === "loaded" && ctx.clients.length);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonButtons, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonCheckbox, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonFooter, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonTitle, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.IonToolbar, _ionic_angular__WEBPACK_IMPORTED_MODULE_7__.BooleanValueAccessor],
  styles: ["@keyframes _ngcontent-%COMP%_tf-shimmer {\n  100% {\n    transform: translateX(100%);\n  }\n}\n.select-clients-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 16px;\n  --padding-end: 16px;\n  --padding-top: 12px;\n}\n\n.detail-skeleton[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n\n.skeleton-block[_ngcontent-%COMP%] {\n  position: relative;\n  overflow: hidden;\n  background: var(--tf-surface-3);\n  border-radius: 12px;\n}\n.skeleton-block[_ngcontent-%COMP%]::after {\n  content: \"\";\n  position: absolute;\n  inset: 0;\n  transform: translateX(-100%);\n  background: linear-gradient(90deg, transparent, var(--tf-shimmer), transparent);\n  animation: _ngcontent-%COMP%_tf-shimmer 1.4s infinite;\n}\n@media (prefers-reduced-motion: reduce) {\n  .skeleton-block[_ngcontent-%COMP%]::after {\n    animation: none;\n  }\n}\n\n.section-error[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .empty-hint[_ngcontent-%COMP%] {\n  font-size: 0.86rem;\n  color: var(--tf-text-muted);\n}\n\n.client-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  padding: 12px;\n  margin-bottom: 6px;\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: 10px;\n  cursor: pointer;\n}\n\n.client-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  min-width: 0;\n}\n\n.client-name[_ngcontent-%COMP%] {\n  font-size: 0.9rem;\n  color: var(--tf-text);\n  font-weight: 600;\n}\n\n.client-allergy-warning[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.76rem;\n  color: #e2734f;\n}\n.client-allergy-warning[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 13px;\n  flex-shrink: 0;\n}\n\n.confirm-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  height: 48px;\n  margin: 0 16px 12px;\n  width: calc(100% - 32px);\n  font-size: 0.92rem;\n}\n.confirm-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.confirm-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.confirm-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fc2tlbGV0b24uc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvY2xpZW50cy9jb21wb25lbnRzL3NlbGVjdC1jbGllbnRzLW1vZGFsL3NlbGVjdC1jbGllbnRzLW1vZGFsLmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19idXR0b25zLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJBO0VBQ0U7SUFDRSwyQkFBQTtFQ3hCRjtBQUNGO0FBREE7RUFDRSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQUdGOztBQUFBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsUUFBQTtBQUdGOztBQUFBO0VEWEUsa0JBQUE7RUFDQSxnQkFBQTtFQUNBLCtCQUFBO0VDV0EsbUJBQUE7QUFLRjtBRGRFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLDRCQUFBO0VBQ0EsK0VBQUE7RUFDQSxtQ0FBQTtBQ2dCSjtBRGJFO0VBQ0U7SUFDRSxlQUFBO0VDZUo7QUFDRjs7QUFmQTs7RUFFRSxrQkFBQTtFQUNBLDJCQUFBO0FBa0JGOztBQWZBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLCtCQUFBO0VBQ0Esa0NBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUFrQkY7O0FBZkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxRQUFBO0VBQ0EsWUFBQTtBQWtCRjs7QUFmQTtFQUNFLGlCQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtBQWtCRjs7QUFkQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QUFpQkY7QUFmRTtFQUNFLGVBQUE7RUFDQSxjQUFBO0FBaUJKOztBQWJBO0VDeERFLFlBQUE7RUFDQSxtQkFGaUM7RUFHakMscUNBQUE7RUFDQSxnQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGdGQUFBO0VEb0RBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLHdCQUFBO0VBQ0Esa0JBQUE7QUFzQkY7QUMzRUU7RUFDRSxzQkFBQTtBRDZFSjtBQzFFRTtFQUNFLGFBQUE7RUFDQSxlQUFBO0FENEVKO0FDekVFO0VBQ0UsaUNBQUE7RUFDQSxtQkFBQTtBRDJFSiIsInNvdXJjZXNDb250ZW50IjpbIi8vIFNrZWxldG9uIGRlIGNhcmdhIGNvbiBiYXJyaWRvIGRlIHNoaW1tZXIgw6LCgMKUIG1pc21vIGJsb3F1ZSByZXBldGlkbyBsaXRlcmFsbWVudGVcbi8vIGVuIH4xMCBww4PCoWdpbmFzIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuXG4vLyBDYWRhIHDDg8KhZ2luYSBhcGxpY2EgZWwgbWl4aW4gc29icmUgc3UgcHJvcGlvIHNlbGVjdG9yIHkgYcODwrFhZGUgZW5jaW1hIHNvbG8gbG9cbi8vIHF1ZSB2YXLDg8KtYSAoYm9yZGVyLXJhZGl1cywgaGVpZ2h0LCB3aWR0aCwgdmFyaWFudGVzIGNvbiBub21icmUpLlxuQG1peGluIHRmLXNrZWxldG9uLXNoaW1tZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG5cbiAgJjo6YWZ0ZXIge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBpbnNldDogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTEwMCUpO1xuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgdHJhbnNwYXJlbnQsIHZhcigtLXRmLXNoaW1tZXIpLCB0cmFuc3BhcmVudCk7XG4gICAgYW5pbWF0aW9uOiB0Zi1zaGltbWVyIDEuNHMgaW5maW5pdGU7XG4gIH1cblxuICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xuICAgICY6OmFmdGVyIHtcbiAgICAgIGFuaW1hdGlvbjogbm9uZTtcbiAgICB9XG4gIH1cbn1cblxuQGtleWZyYW1lcyB0Zi1zaGltbWVyIHtcbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xuICB9XG59XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi8uLi8uLi90aGVtZS9za2VsZXRvbic7XG5AaW1wb3J0ICcuLi8uLi8uLi8uLi8uLi90aGVtZS9idXR0b25zJztcblxuLnNlbGVjdC1jbGllbnRzLWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLXRmLWJnKTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAxNnB4O1xuICAtLXBhZGRpbmctZW5kOiAxNnB4O1xuICAtLXBhZGRpbmctdG9wOiAxMnB4O1xufVxuXG4uZGV0YWlsLXNrZWxldG9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiA4cHg7XG59XG5cbi5za2VsZXRvbi1ibG9jayB7XG4gIEBpbmNsdWRlIHRmLXNrZWxldG9uLXNoaW1tZXI7XG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XG59XG5cbi5zZWN0aW9uLWVycm9yIHAsXG4uZW1wdHktaGludCB7XG4gIGZvbnQtc2l6ZTogMC44NnJlbTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xufVxuXG4uY2xpZW50LXJvdyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMTJweDtcbiAgcGFkZGluZzogMTJweDtcbiAgbWFyZ2luLWJvdHRvbTogNnB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTEpO1xuICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXIpO1xuICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5jbGllbnQtaW5mbyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMnB4O1xuICBtaW4td2lkdGg6IDA7XG59XG5cbi5jbGllbnQtbmFtZSB7XG4gIGZvbnQtc2l6ZTogMC45cmVtO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dCk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi8vIFRBUkVBNSAoYXVkaXRvcsODwq1hIFVYLCBGYXNlIEQpXG4uY2xpZW50LWFsbGVyZ3ktd2FybmluZyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogNHB4O1xuICBmb250LXNpemU6IDAuNzZyZW07XG4gIGNvbG9yOiAjZTI3MzRmO1xuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6IDEzcHg7XG4gICAgZmxleC1zaHJpbms6IDA7XG4gIH1cbn1cblxuLmNvbmZpcm0tYnV0dG9uIHtcbiAgQGluY2x1ZGUgdGYtZ3JhZGllbnQtYnV0dG9uO1xuICBoZWlnaHQ6IDQ4cHg7XG4gIG1hcmdpbjogMCAxNnB4IDEycHg7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAzMnB4KTtcbiAgZm9udC1zaXplOiAwLjkycmVtO1xufVxuIiwiLy8gQm90w4PCs24gQ1RBIGNvbiBncmFkaWVudGUgZGUgYWNlbnRvIMOiwoDClCBtaXNtbyBibG9xdWUgcmVwZXRpZG8gZW4gfjExIHNpdGlvcyBkZVxuLy8gfjEwIHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS5cbi8vIENhZGEgcMODwqFnaW5hIGFwbGljYSBlbCBtaXhpbiBzb2JyZSBzdSBwcm9waW8gc2VsZWN0b3IgeSBhw4PCsWFkZSBlbmNpbWEgc29sbyBsb1xuLy8gcXVlIHZhcsODwq1hIHBvciBsYXlvdXQgKHdpZHRoLCBoZWlnaHQsIGZvbnQtc2l6ZSwgbWFyZ2luKS5cbi8vXG4vLyBMYSBtaXRhZCBkZSBsb3Mgc2l0aW9zIG9yaWdpbmFsZXMgbm8gdGVuw4PCrWFuIHRyYW5zaWNpw4PCs24vZmVlZGJhY2sgZGUgcHVsc2FjacODwrNuXG4vLyBuaSA6Zm9jdXMtdmlzaWJsZSDDosKAwpQgZWwgbWl4aW4gbG9zIGHDg8KxYWRlIHNpZW1wcmUsIGNpZXJyYSBlc2UgaHVlY28gZGVcbi8vIGNvbnNpc3RlbmNpYSBkZSBpbnRlcmFjY2nDg8KzbiAoUFJPRFVDVC5tZDogXCJ1biBzb2xvIHBhdHLDg8KzbiBwb3IgdGlwbyBkZVxuLy8gY29tcG9uZW50ZVwiKSBlbiB2ZXogZGUgcGVycGV0dWFyIGxhIHZhcmlhY2nDg8KzbiBhY2NpZGVudGFsLlxuQG1peGluIHRmLWdyYWRpZW50LWJ1dHRvbigkcmFkaXVzOiAxMnB4KSB7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogJHJhZGl1cztcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtYWNjZW50LWdyYWRpZW50KTtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudC1jb250cmFzdCk7XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDE2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSwgb3BhY2l0eSAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45Nyk7XG4gIH1cblxuICAmOmRpc2FibGVkIHtcbiAgICBvcGFjaXR5OiAwLjQ1O1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLXRleHQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cbn1cblxuLy8gQm90w4PCs24gZGUgaGVhZGVyIHF1ZSBlcyBzb2xvIHVuIGljb25vIMOiwoDClCBtaXNtbyBsb29rIFwiZW52dWVsdG9cIiBxdWUgeWEgdXNhIGxhXG4vLyBhcHAgZGUgY29uc3VtaWRvciBlbiBzdXMgdG9vbGJhcnMgKHBhY2thZ2VzL3NoYXJlZC1mZWF0dXJlcy8uLi4vZGlldHMvXG4vLyBjb21wb25lbnRzL3Rvb2xiYXItY2FsZW5kYXI6IGZvbmRvICsgYm9yZGVyLXJhZGl1cyArIGNhamEgZmlqYSA0NHg0NCwgZW5cbi8vIHZleiBkZWwgaW9uLWJ1dHRvbiBwbGFuby90cmFuc3BhcmVudGUgcXVlIHRlbsODwq1hIGNhZGEgcGFudGFsbGEgZGUgdHJhaW5lcnNcbi8vIGhhc3RhIGFob3JhKS4gVG9rZW5lYWRvIGEgbGEgcGFsZXRhIGRlIGVzdGEgYXBwIGVuIHZleiBkZSByZXBldGlyIGxvc1xuLy8gcmdiYSgyNTUsMjU1LDI1NSwuLi4pIHN1ZWx0b3MgZGVsIG9yaWdpbmFsLlxuLy9cbi8vIFNpcnZlIHRhbnRvIHBhcmEgPGlvbi1idXR0b24gZmlsbD1cImNsZWFyXCI+ICh1c2EgbGFzIENTUyBjdXN0b20gcHJvcGVydGllc1xuLy8gZGUgSW9uaWMpIGNvbW8gcGFyYSB1biA8YnV0dG9uPiBuYXRpdm8gKHVzYSBsYXMgcHJvcGllZGFkZXMgcGxhbmFzKSDDosKAwpRcbi8vIGFtYm9zIGNvZXhpc3RlbiBob3kgZW4gdHJhaW5lcnMgcGFyYSBlbCBtaXNtbyByb2wgZGUgXCJ2b2x2ZXJcIi9cImNlcnJhclwiLlxuQG1peGluIHRmLWljb24tYnV0dG9uKCRzaXplOiA0NHB4LCAkcmFkaXVzOiAxMnB4LCAkaWNvbi1zaXplOiAyMHB4KSB7XG4gIC0tYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcbiAgLS1iYWNrZ3JvdW5kLWFjdGl2YXRlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1iYWNrZ3JvdW5kLWhvdmVyOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICAtLWJhY2tncm91bmQtZm9jdXNlZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1jb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICAtLWJvcmRlci1yYWRpdXM6ICN7JHJhZGl1c307XG4gIC0tcGFkZGluZy1zdGFydDogMDtcbiAgLS1wYWRkaW5nLWVuZDogMDtcbiAgLS1wYWRkaW5nLXRvcDogMDtcbiAgLS1wYWRkaW5nLWJvdHRvbTogMDtcblxuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTMpO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1zZWNvbmRhcnkpO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6ICRyYWRpdXM7XG4gIHdpZHRoOiAkc2l6ZTtcbiAgaGVpZ2h0OiAkc2l6ZTtcbiAgbWluLXdpZHRoOiAkc2l6ZTtcbiAgbWluLWhlaWdodDogJHNpemU7XG4gIG1hcmdpbjogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYmFja2dyb3VuZCB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCksXG4gICAgY29sb3IgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTQpO1xuICB9XG5cbiAgJjpmb2N1cy12aXNpYmxlIHtcbiAgICBvdXRsaW5lOiAycHggc29saWQgdmFyKC0tdGYtYWNjZW50KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogJGljb24tc2l6ZTtcbiAgfVxufVxuXG4vLyBFeHBhbnNvciBpbnZpc2libGUgZGUgem9uYSBwdWxzYWJsZS5cbi8vXG4vLyBQQVJBIFFVw4PCiTogdW4gY29udHJvbCBjb21wYWN0byAodW4gaWNvbm8gZGUgMzIgcHggZW4gdW5hIGZpbGEgZGUgdGFibGEsIHVuXG4vLyBlbmxhY2UgZGUgdGV4dG8gZGUgMTYgcHgpIG5vIGxsZWdhIGEgbG9zIDQ0IHB4IHF1ZSBleGlnZSBQUk9EVUNULm1kLCB5XG4vLyBlbmdvcmRhcmxvIGRlIHZlcmRhZCBkZXNwbGF6YSB0b2RvIGxvIHF1ZSB0aWVuZSBhbHJlZGVkb3Igw6LCgMKUIGVuIHVuYSB0YWJsYVxuLy8gZGUgdmVpbnRlIGZpbGFzLCA4IHB4IHBvciBmaWxhIHNvbiBtZWRpYSBwYW50YWxsYS5cbi8vXG4vLyBFbCBwc2V1ZG9lbGVtZW50byBjcmVjZSBoYWNpYSBmdWVyYSBzaW4gb2N1cGFyIHNpdGlvIGVuIGVsIGZsdWpvLCBhc8ODwq0gcXVlXG4vLyBlbCBib3TDg8KzbiBzZSB2ZSBwZXF1ZcODwrFvIHkgc2UgcHVsc2EgZ3JhbmRlLlxuLy9cbi8vIEFWSVNPIERFIE1FRElDScODwpNOOiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKSBOTyB2ZSBlc3RlIHBzZXVkb2VsZW1lbnRvLCBhc8ODwq1cbi8vIHF1ZSBhbCB2ZXJpZmljYXIgaGF5IHF1ZSB1c2FyIGVsZW1lbnRGcm9tUG9pbnQgY29uIGVsIGVsZW1lbnRvIGRlbnRybyBkZWxcbi8vIHZpZXdwb3J0LiBBZGVtw4PCoXMgZWwgaGl0LXRlc3QgZGV2dWVsdmUgMiBweCBtZW5vcyBxdWUgbGEgY2FqYSBkZWNsYXJhZGFcbi8vIChjb21wcm9iYWRvOiAtNHB4IGRhIDQyLCAtNnB4IGRhIDQ2KSwgYXPDg8KtIHF1ZSB1biA0MiBtZWRpZG8gc29uIDQ0IHJlYWxlcy5cbi8vXG4vLyAkZ3JvdzogY3XDg8KhbnRvIGNyZWNlIHBvciBjYWRhIGxhZG8uIDRweCBsbGV2YSB1biBjb250cm9sIGRlIDM2IHB4IGEgNDQuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIoJGdyb3c6IDRweCkge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgaW5zZXQ6IC0jeyRncm93fTtcbiAgfVxufVxuXG4vLyBWYXJpYW50ZSBxdWUgc29sbyBjcmVjZSBlbiBWRVJUSUNBTC4gUGFyYSBjb250cm9sZXMgZW4gZmlsYSBkb25kZSBlbFxuLy8gZXhwYW5zb3IgaG9yaXpvbnRhbCBzZSBzb2xhcGFyw4PCrWEgY29uIGVsIGRlIGFsIGxhZG8geSByb2JhcsODwq1hIHN1cyB0b3F1ZXMuXG5AbWl4aW4gdGYtdG91Y2gtZXhwYW5kZXIteSgkZ3JvdzogNHB4KSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAmOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICcnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IC0jeyRncm93fTtcbiAgICBib3R0b206IC0jeyRncm93fTtcbiAgICBsZWZ0OiAwO1xuICAgIHJpZ2h0OiAwO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ }),

/***/ 61776:
/*!********************************************************************************************!*\
  !*** ./src/app/features/clients/pages/client-detail/services/client-detail-api.service.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ClientDetailApiService: () => (/* binding */ ClientDetailApiService)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/core/services/http/http.service */ 88552);

var _ClientDetailApiService;


function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}
class ClientDetailApiService {
  constructor(http) {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "http", void 0);
    this.http = http;
  }
  base(clientId) {
    return `trainer/clients/${clientId}`;
  }
  getTables(clientId) {
    return this.http.get(`${this.base(clientId)}/tables`);
  }
  getAvailableTemplates(clientId) {
    return this.http.get(`${this.base(clientId)}/tables/available-templates`);
  }
  assignNewRoutine(clientId, name) {
    return this.http.post(`${this.base(clientId)}/tables`, {
      mode: 'new',
      name
    });
  }
  assignTemplateRoutine(clientId, sourceTableId) {
    return this.http.post(`${this.base(clientId)}/tables`, {
      mode: 'duplicate',
      sourceTableId
    });
  }
  getAnthropometry(clientId) {
    return this.http.get(`${this.base(clientId)}/anthropometry`);
  }
  // TASK-019 (MASTER_BACKLOG.md) — antes solo se podía vaciar una Table
  // semana a semana a mano; no existía forma de eliminar la Table completa
  // ya asignada. Endpoint ya existía y ya autorizaba a "trainer" con
  // relación activa (table-access.js#canAccessUserTable) — solo faltaba el
  // consumidor. Nota: la ruta vive bajo /tables, no bajo trainer/clients/,
  // por eso no usa this.base(clientId).
  deleteTable(clientId, tableId) {
    return this.http.delete(`tables/${clientId}/${tableId}`);
  }
  getDiet(clientId, date = todayIsoDate()) {
    return this.http.get(`${this.base(clientId)}/diet?date=${encodeURIComponent(date)}`);
  }
  getNutritionalGoals(clientId) {
    return this.http.get(`${this.base(clientId)}/nutritional-goals`);
  }
  revokeRelation(clientId, scope) {
    return this.http.delete(`trainer/clients/${clientId}?scope=${scope}`);
  }
  // `fiberGTotal` (Fase 5) y `reason` (Fase 4) son opcionales: los objetivos
  // sin fibra y los cambios sin motivo siguen siendo válidos.
  assignNutritionalGoal(clientId, goal) {
    return this.http.post(`${this.base(clientId)}/nutritional-goals`, goal);
  }
  activateNutritionalGoal(clientId, goalId) {
    return this.http.put(`${this.base(clientId)}/nutritional-goals/${goalId}/activate`, {});
  }
  getAnthropometryRequest(clientId) {
    return this.http.get(`${this.base(clientId)}/anthropometry-request`);
  }
  upsertAnthropometryRequest(clientId, body) {
    return this.http.put(`${this.base(clientId)}/anthropometry-request`, body);
  }
  cancelAnthropometryRequest(clientId) {
    return this.http.delete(`${this.base(clientId)}/anthropometry-request`);
  }
  getNotes(clientId) {
    return this.http.get(`${this.base(clientId)}/notes`);
  }
  // TASK-062 (MASTER_BACKLOG.md) — fecha de la última vez que este cliente
  // fue revocado por este trainer, si alguna. null si nunca lo fue (caso
  // normal). Se usa para separar visualmente notas/tareas "de una relación
  // anterior" sin necesidad de purgarlas.
  getPreviousRelationCutoff(clientId) {
    return this.http.get(`${this.base(clientId)}/previous-relation-cutoff`);
  }
  createNote(clientId, text) {
    return this.http.post(`${this.base(clientId)}/notes`, {
      text
    });
  }
  setNotePinned(clientId, noteId, pinned) {
    return this.http.patch(`${this.base(clientId)}/notes/${noteId}`, {
      pinned
    });
  }
  getCheckinConfig(clientId) {
    return this.http.get(`${this.base(clientId)}/checkin-config`);
  }
  getCheckinResponses(clientId) {
    return this.http.get(`${this.base(clientId)}/checkin-responses`);
  }
  getAdherence(clientId) {
    return this.http.get(`${this.base(clientId)}/adherence`);
  }
  // Fase 2 Coach Pro — la pestaña Resumen en UNA petición: alertas,
  // adherencia multidimensional, tendencia de peso y qué tiene asignado.
  // Antes esa misma respuesta exigía 4 llamadas repartidas por 4 pestañas.
  getSummary(clientId) {
    return this.http.get(`${this.base(clientId)}/summary`);
  }
  // Movimiento 3 Coach Pro — altura, sexo y nacimiento del cliente, lo único
  // que le falta a la calculadora corporal (las mediciones ya las carga la
  // pestaña). Llamada propia y barata (una consulta): colgarla de
  // getSummary obligaría a Medidas a pagar las ~9 consultas de Resumen.
  getBodyProfile(clientId) {
    return this.http.get(`${this.base(clientId)}/body-profile`);
  }
  // Movimiento 5 Coach Pro — suplementación pautada. El catálogo de momentos
  // lo decide el backend, igual que el de dolor y el de reglas: así es
  // imposible que la interfaz ofrezca uno que el validador no conoce.
  getSupplementTimings() {
    return this.http.get('supplements/timings');
  }
  getSupplements(clientId) {
    return this.http.get(`${this.base(clientId)}/supplements`);
  }
  createSupplement(clientId, payload) {
    return this.http.post(`${this.base(clientId)}/supplements`, payload);
  }
  updateSupplement(clientId, supplementId, payload) {
    return this.http.put(`${this.base(clientId)}/supplements/${supplementId}`, payload);
  }
  deleteSupplement(clientId, supplementId) {
    return this.http.delete(`${this.base(clientId)}/supplements/${supplementId}`);
  }
  // Movimiento 5 Coach Pro — qué tiene que comprar el cliente para cumplir
  // el plan de ese rango. Sin modelo nuevo detrás: son los mismos días de
  // dieta sumados por producto.
  getShoppingList(clientId, from, to) {
    return this.http.get(`${this.base(clientId)}/shopping-list?from=${from}&to=${to}`);
  }
  // Movimiento 3 Coach Pro — registro diario de dolor del cliente + los
  // umbrales que fijó este entrenador, en UNA petición: la pantalla los
  // enseña juntos porque un "6 en rodilla" no significa nada hasta leerlo al
  // lado de "para a partir de 5".
  getClientPain(clientId, days) {
    return this.http.get(`${this.base(clientId)}/pain?days=${days}`);
  }
  savePainThreshold(clientId, threshold) {
    return this.http.put(`${this.base(clientId)}/pain/thresholds`, threshold);
  }
  removePainThreshold(clientId, zone) {
    return this.http.delete(`${this.base(clientId)}/pain/thresholds/${encodeURIComponent(zone)}`);
  }
  // Serie semanal + comparativa de la última semana contra la anterior. La
  // comparativa no es otra llamada: son los dos últimos elementos de la
  // misma serie, calculados en el backend para no duplicar la aritmética.
  getProgress(clientId, weeks) {
    return this.http.get(`${this.base(clientId)}/progress?weeks=${weeks}`);
  }
  // Fase 4 Coach Pro — qué le he cambiado a este cliente y por qué.
  getChanges(clientId) {
    return this.http.get(`${this.base(clientId)}/changes`);
  }
  // Fase 6 Coach Pro — volumen, PRs y evolución de cargas. Llamada aparte de
  // getProgress porque su consulta es con diferencia la más cara del módulo:
  // solo se pide si el cliente tiene ámbito de entrenamiento.
  getTrainingProgress(clientId, weeks) {
    return this.http.get(`${this.base(clientId)}/training-progress?weeks=${weeks}`);
  }
  // F20-bis — cumplimiento por día (para el calendario de nutrición), distinto
  // de /adherence (kcal pautada vs. objetivo).
  getNutritionCompliance(clientId, from, to) {
    return this.http.get(`${this.base(clientId)}/nutrition-compliance?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
  }
  // F20-ter — pautado vs. consumido (kcal/proteína/carbos/grasa) por día,
  // para el gráfico de comparación junto al calendario.
  getNutritionTracking(clientId, from, to) {
    return this.http.get(`${this.base(clientId)}/nutrition-tracking?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
  }
  getPayments(clientId) {
    return this.http.get(`${this.base(clientId)}/payments`);
  }
  createPayment(clientId, payment) {
    return this.http.post(`${this.base(clientId)}/payments`, payment);
  }
  setPaymentPaid(clientId, paymentId, paid) {
    return this.http.patch(`${this.base(clientId)}/payments/${paymentId}`, {
      paid
    });
  }
  // coach-tab FASE4 — tareas/hábitos.
  getTasks(clientId) {
    return this.http.get(`${this.base(clientId)}/tasks`);
  }
  createTask(clientId, task) {
    return this.http.post(`${this.base(clientId)}/tasks`, task);
  }
  deactivateTask(clientId, taskId) {
    return this.http.delete(`${this.base(clientId)}/tasks/${taskId}`);
  }
  // F12 — pautar una única composición, aplicación inmediata sobre el hueco de comida.
  prescribeMeal(clientId, date, mealId, body) {
    return this.http.post(`${this.base(clientId)}/diet-days/${date}/meals/${mealId}/prescribe`, body);
  }
  // F28 — 2+ alternativas nombradas, aplicación diferida hasta que el cliente elija.
  proposeMealAlternatives(clientId, date, mealSlot, alternatives) {
    return this.http.post(`${this.base(clientId)}/diet-days/${date}/meals/${encodeURIComponent(mealSlot)}/propose`, {
      alternatives
    });
  }
  // F29 — preferencias nutricionales del cliente, solo lectura para el profesional.
  getNutritionPreferences(clientId) {
    return this.http.get(`${this.base(clientId)}/nutrition-preferences`);
  }
  requestNutritionPreferences(clientId) {
    return this.http.post(`${this.base(clientId)}/nutrition-preferences/request`, {});
  }
  // --- F30: aplicar en bloque (reutiliza F11/F12/F13, una vez por cliente destino) ---
  applyRoutineToClients(sourceTableId, targetClientIds) {
    return this.http.post(`trainer/routines/${sourceTableId}/apply-to-clients`, {
      targetClientIds
    });
  }
  applyMealToClients(sourceClientId, date, mealSlot, body, targetClientIds) {
    return this.http.post(`${this.base(sourceClientId)}/diet-days/${date}/meals/${encodeURIComponent(mealSlot)}/apply-to-clients`, {
      ...body,
      targetClientIds
    });
  }
  applyGoalToClients(sourceClientId, goal, targetClientIds) {
    return this.http.post(`${this.base(sourceClientId)}/nutrition-goals/apply-to-clients`, {
      ...goal,
      targetClientIds
    });
  }
}
_ClientDetailApiService = ClientDetailApiService;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ClientDetailApiService, "\u0275fac", function ClientDetailApiService_Factory(t) {
  return new (t || _ClientDetailApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinject"](src_app_core_services_http_http_service__WEBPACK_IMPORTED_MODULE_1__.HttpService));
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ClientDetailApiService, "\u0275prov", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
  token: _ClientDetailApiService,
  factory: _ClientDetailApiService.ɵfac,
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
//# sourceMappingURL=default-src_app_features_clients_components_select-clients-modal_select-clients-modal_component_ts.js.map