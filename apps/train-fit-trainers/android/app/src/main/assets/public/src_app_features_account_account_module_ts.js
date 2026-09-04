"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["src_app_features_account_account_module_ts"],{

/***/ 35298:
/*!************************************************************!*\
  !*** ./src/app/features/account/account-routing.module.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountPageRoutingModule: () => (/* binding */ AccountPageRoutingModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var _account_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./account.page */ 29988);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 69717);

var _AccountPageRoutingModule;




const routes = [{
  path: '',
  component: _account_page__WEBPACK_IMPORTED_MODULE_1__.AccountPage
}];
class AccountPageRoutingModule {}
_AccountPageRoutingModule = AccountPageRoutingModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AccountPageRoutingModule, "\u0275fac", function AccountPageRoutingModule_Factory(t) {
  return new (t || _AccountPageRoutingModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AccountPageRoutingModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
  type: _AccountPageRoutingModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AccountPageRoutingModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
  imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes), _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AccountPageRoutingModule, {
    imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
  });
})();

/***/ }),

/***/ 30859:
/*!****************************************************!*\
  !*** ./src/app/features/account/account.module.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountPageModule: () => (/* binding */ AccountPageModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _account_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./account-routing.module */ 35298);
/* harmony import */ var _account_page__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./account.page */ 29988);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 69717);

var _AccountPageModule;




class AccountPageModule {}
_AccountPageModule = AccountPageModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AccountPageModule, "\u0275fac", function AccountPageModule_Factory(t) {
  return new (t || _AccountPageModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AccountPageModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({
  type: _AccountPageModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(AccountPageModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _account_routing_module__WEBPACK_IMPORTED_MODULE_2__.AccountPageRoutingModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](AccountPageModule, {
    declarations: [_account_page__WEBPACK_IMPORTED_MODULE_3__.AccountPage],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _account_routing_module__WEBPACK_IMPORTED_MODULE_2__.AccountPageRoutingModule]
  });
})();

/***/ }),

/***/ 29988:
/*!**************************************************!*\
  !*** ./src/app/features/account/account.page.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AccountPage: () => (/* binding */ AccountPage)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 38288);
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/core/services/auth/auth.service */ 74048);
/* harmony import */ var src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/core/services/user/user.service */ 66802);
/* harmony import */ var src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/core/services/util/ionic-util.service */ 37057);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 84725);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ionic/angular */ 54844);


var _AccountPage;









function AccountPage_span_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    let tmp_0_0;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"]((tmp_0_0 = ctx_r0.user()) == null ? null : tmp_0_0.email);
  }
}
function AccountPage_div_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AccountPage_div_31_Template_div_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r4);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r3.closeEditPanel());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AccountPage_div_32_span_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Guardar cambios");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function AccountPage_div_32_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "ion-spinner", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "span", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Guardando cambios");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
  }
}
function AccountPage_div_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](1, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "h3", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Editar perfil");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](5, "ion-icon", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "input", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AccountPage_div_32_Template_input_ngModelChange_6_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8);
      const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r7.formName = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](8, "ion-icon", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "input", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AccountPage_div_32_Template_input_ngModelChange_9_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8);
      const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r9.formLastname = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](11, "ion-icon", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](12, "input", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("ngModelChange", function AccountPage_div_32_Template_input_ngModelChange_12_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8);
      const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r10.formEmail = $event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AccountPage_div_32_Template_button_click_13_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r8);
      const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx_r11.saveProfile());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, AccountPage_div_32_span_14_Template, 2, 0, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](15, AccountPage_div_32_ng_container_15_Template, 4, 0, "ng-container", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r2.formName);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r2.formLastname);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModel", ctx_r2.formEmail);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", !ctx_r2.formName.trim() || !ctx_r2.formLastname.trim() || !ctx_r2.formEmail.trim() || ctx_r2.isSavingProfile);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵattribute"]("aria-busy", ctx_r2.isSavingProfile);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx_r2.isSavingProfile);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx_r2.isSavingProfile);
  }
}
// "Mi cuenta" — antes reutilizaba el ProfilePage compartido con
// train-fit-front/train-fit-management (pantalla de macros/dieta/premium del
// CONSUMIDOR, casi vacía para un rol de entrenador). Página local propia de
// esta app: solo servicios de datos compartidos (UserService/AuthService),
// nunca el componente de pantalla compartido — así no afecta a las otras 2
// apps del monorepo. Ver MVP-trainers/tareas-grandes/TAREA5.
class AccountPage {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "userService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(src_app_core_services_user_user_service__WEBPACK_IMPORTED_MODULE_3__.UserService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "authService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(src_app_core_services_auth_auth_service__WEBPACK_IMPORTED_MODULE_2__.AuthService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "ionicUtilService", (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(src_app_core_services_util_ionic_util_service__WEBPACK_IMPORTED_MODULE_4__.IonicUtilService));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "router", (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router));
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "user", this.userService.localUser);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "showEditPanel", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "isSavingProfile", false);
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "formName", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "formLastname", '');
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this, "formEmail", '');
  }
  get initials() {
    const user = this.user();
    if (!user?.name) return '?';
    const first = user.name.charAt(0) || '';
    const last = user.lastname?.charAt(0) || '';
    return (first + last).toUpperCase() || '?';
  }
  get fullName() {
    const user = this.user();
    if (!user?.name) return 'Tu cuenta';
    return `${user.name} ${user.lastname || ''}`.trim();
  }
  goToSubscription() {
    void this.router.navigate(['/tabs/subscription']);
  }
  openEditPanel() {
    const user = this.user();
    this.formName = user?.name || '';
    this.formLastname = user?.lastname || '';
    this.formEmail = user?.email || '';
    this.showEditPanel = true;
  }
  closeEditPanel() {
    this.showEditPanel = false;
  }
  saveProfile() {
    const user = this.user();
    if (!user || !this.formName.trim() || !this.formLastname.trim() || !this.formEmail.trim()) return;
    const userToUpdate = {
      _id: user._id
    };
    if (this.formName.trim() !== user.name) userToUpdate.name = this.formName.trim();
    if (this.formLastname.trim() !== user.lastname) userToUpdate.lastname = this.formLastname.trim();
    if (this.formEmail.trim() !== user.email) userToUpdate.email = this.formEmail.trim();
    if (Object.keys(userToUpdate).length === 1) {
      this.showEditPanel = false;
      return;
    }
    this.isSavingProfile = true;
    this.userService.updateUser(userToUpdate).subscribe({
      next: () => {
        this.isSavingProfile = false;
        this.showEditPanel = false;
        void this.ionicUtilService.showToast({
          message: 'Perfil actualizado',
          color: 'success',
          duration: 2000
        });
      },
      error: () => {
        this.isSavingProfile = false;
        void this.ionicUtilService.showToast({
          message: 'No se pudo actualizar el perfil',
          color: 'danger',
          duration: 2000
        });
      }
    });
  }
  confirmLogout() {
    var _this = this;
    return (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      yield _this.ionicUtilService.showAlert({
        header: 'Cerrar sesión',
        message: '¿Seguro que quieres cerrar sesión?',
        buttons: [{
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Cerrar sesión',
          cssClass: 'alert-button-danger',
          handler: () => _this.authService.logout()
        }]
      });
    })();
  }
}
_AccountPage = AccountPage;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(AccountPage, "\u0275fac", function AccountPage_Factory(t) {
  return new (t || _AccountPage)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_1__["default"])(AccountPage, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
  type: _AccountPage,
  selectors: [["app-account"]],
  decls: 33,
  vars: 5,
  consts: [[1, "ion-no-border"], [1, "tf-page-header"], [1, "tf-page-header__content"], [1, "tf-page-header__back-section"], ["aria-label", "Abrir men\u00FA de navegaci\u00F3n", 1, "tf-page-header__back-button"], [1, "tf-page-header__title-section"], [1, "tf-page-header__title"], [1, "tf-page-header__actions"], [1, "account-content"], [1, "account-card"], [1, "account-avatar"], [1, "account-info"], [1, "account-name"], ["class", "account-email", 4, "ngIf"], [1, "account-menu"], ["type", "button", 1, "account-menu-item", 3, "click"], ["name", "person-outline"], ["name", "chevron-forward-outline", 1, "account-menu-chevron"], ["name", "card-outline"], ["type", "button", 1, "logout-button", 3, "click"], ["name", "log-out-outline"], ["class", "panel-backdrop", 3, "click", 4, "ngIf"], ["class", "panel-sheet", 4, "ngIf"], [1, "account-email"], [1, "panel-backdrop", 3, "click"], [1, "panel-sheet"], [1, "panel-handle"], [1, "panel-title"], [1, "input-wrapper"], ["name", "person-outline", 1, "input-icon"], ["type", "text", "placeholder", "Nombre", 1, "input-field", 3, "ngModel", "ngModelChange"], ["type", "text", "placeholder", "Apellidos", 1, "input-field", 3, "ngModel", "ngModelChange"], ["name", "mail-outline", 1, "input-icon"], ["type", "email", "placeholder", "Correo", 1, "input-field", 3, "ngModel", "ngModelChange"], [1, "submit-button", 3, "disabled", "click"], [4, "ngIf"], ["name", "dots", "aria-hidden", "true"], [1, "sr-only"]],
  template: function AccountPage_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "ion-header", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](4, "ion-menu-button", 4);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 5)(6, "h1", 6);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7, "Mi cuenta");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](8, "div", 7);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](9, "ion-content", 8)(10, "div", 9)(11, "div", 10);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "div", 11)(14, "span", 12);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](16, AccountPage_span_16_Template, 2, 1, "span", 13);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](17, "nav", 14)(18, "button", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AccountPage_Template_button_click_18_listener() {
        return ctx.openEditPanel();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](19, "ion-icon", 16);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](21, "Editar perfil");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](22, "ion-icon", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](23, "button", 15);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AccountPage_Template_button_click_23_listener() {
        return ctx.goToSubscription();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](24, "ion-icon", 18);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](25, "span");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](26, "Suscripci\u00F3n");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](27, "ion-icon", 17);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](28, "button", 19);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function AccountPage_Template_button_click_28_listener() {
        return ctx.confirmLogout();
      });
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](29, "ion-icon", 20);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](30, " Cerrar sesi\u00F3n ");
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](31, AccountPage_div_31_Template, 1, 0, "div", 21);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](32, AccountPage_div_32_Template, 16, 7, "div", 22);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      let tmp_2_0;
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](12);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.initials);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](ctx.fullName);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", (tmp_2_0 = ctx.user()) == null ? null : tmp_2_0.email);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](15);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.showEditPanel);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.showEditPanel);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_8__.NgModel, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonContent, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonHeader, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonMenuButton, _ionic_angular__WEBPACK_IMPORTED_MODULE_9__.IonSpinner],
  styles: ["@keyframes _ngcontent-%COMP%_tf-backdrop-in {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-sheet-in {\n  from {\n    transform: translateY(16px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-side-panel-in {\n  from {\n    transform: translateX(24px);\n    opacity: 0;\n  }\n  to {\n    transform: translateX(0);\n    opacity: 1;\n  }\n}\n@keyframes _ngcontent-%COMP%_tf-card-in {\n  from {\n    opacity: 0;\n    transform: translateY(6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.account-content[_ngcontent-%COMP%] {\n  --background: var(--tf-bg);\n  --padding-start: 20px;\n  --padding-end: 20px;\n  --padding-top: 20px;\n  --padding-bottom: 32px;\n}\n\n.account-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  text-align: left;\n  gap: var(--tf-space-4);\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n  padding: var(--tf-space-5);\n  margin-bottom: var(--tf-space-5);\n  animation: _ngcontent-%COMP%_tf-card-in 320ms var(--tf-ease-out) backwards;\n}\n@media (prefers-reduced-motion: reduce) {\n  .account-card[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n\n.account-avatar[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 1.4rem;\n  font-weight: 700;\n  flex-shrink: 0;\n}\n\n.account-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  flex: 1;\n  min-width: 0;\n}\n\n.account-name[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-lg);\n  font-weight: 600;\n  color: var(--tf-text);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.account-email[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-muted);\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.account-menu[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n  overflow: hidden;\n  margin-bottom: var(--tf-space-5);\n  animation: _ngcontent-%COMP%_tf-card-in 320ms var(--tf-ease-out) backwards;\n  animation-delay: 35ms;\n}\n@media (prefers-reduced-motion: reduce) {\n  .account-menu[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n\n.account-menu-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--tf-space-3);\n  min-height: var(--tf-touch-min);\n  padding: 0 var(--tf-space-4);\n  background: none;\n  border: none;\n  border-top: 1px solid var(--tf-border);\n  color: var(--tf-text);\n  font-size: var(--tf-font-size-base);\n  font-weight: 500;\n  text-align: left;\n  cursor: pointer;\n  font-family: inherit;\n  transition: background var(--tf-duration-fast) var(--tf-ease-out);\n}\n.account-menu-item[_ngcontent-%COMP%]:first-child {\n  border-top: none;\n}\n.account-menu-item[_ngcontent-%COMP%]:hover {\n  background: var(--tf-surface-2);\n}\n.account-menu-item[_ngcontent-%COMP%]:active {\n  background: var(--tf-surface-2);\n}\n.account-menu-item[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: -2px;\n}\n.account-menu-item[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]:first-child {\n  font-size: 19px;\n  color: var(--tf-accent);\n  flex-shrink: 0;\n}\n.account-menu-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.account-menu-chevron[_ngcontent-%COMP%] {\n  color: var(--tf-text-faint);\n  font-size: 16px;\n  flex-shrink: 0;\n}\n\n.logout-button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--tf-space-2);\n  width: 100%;\n  min-height: var(--tf-touch-min);\n  background: var(--tf-danger-soft);\n  color: var(--tf-danger);\n  border: 1px solid var(--tf-danger-border);\n  border-radius: var(--tf-radius-lg);\n  font-size: var(--tf-font-size-base);\n  font-weight: 600;\n  cursor: pointer;\n  transition: transform var(--tf-duration-fast) var(--tf-ease-out);\n  animation: _ngcontent-%COMP%_tf-card-in 320ms var(--tf-ease-out) backwards;\n  animation-delay: 70ms;\n}\n@media (prefers-reduced-motion: reduce) {\n  .logout-button[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n.logout-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.98);\n}\n.logout-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-danger);\n  outline-offset: 2px;\n}\n.logout-button[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n\n.sr-only[_ngcontent-%COMP%] {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  white-space: nowrap;\n  border: 0;\n}\n\n.panel-backdrop[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: var(--tf-overlay);\n  z-index: var(--tf-z-modal-backdrop, 400);\n  animation: _ngcontent-%COMP%_tf-backdrop-in 200ms var(--tf-ease-out) both;\n}\n@media (prefers-reduced-motion: reduce) {\n  .panel-backdrop[_ngcontent-%COMP%] {\n    animation: none;\n    opacity: 1;\n  }\n}\n\n.panel-sheet[_ngcontent-%COMP%] {\n  position: fixed;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: var(--tf-z-modal, 500);\n  background: var(--tf-surface-1);\n  border-top: 1px solid var(--tf-border-strong);\n  border-radius: 20px 20px 0 0;\n  padding: 10px 16px 24px;\n  max-height: 80vh;\n  overflow-y: auto;\n  animation: _ngcontent-%COMP%_tf-sheet-in 260ms var(--tf-ease-out) both;\n}\n@media (prefers-reduced-motion: reduce) {\n  .panel-sheet[_ngcontent-%COMP%] {\n    animation: none;\n    opacity: 1;\n    transform: none;\n  }\n}\n\n.panel-handle[_ngcontent-%COMP%] {\n  width: 36px;\n  height: 4px;\n  border-radius: 2px;\n  background: var(--tf-border-strongest);\n  margin: 0 auto 14px;\n}\n\n.panel-title[_ngcontent-%COMP%] {\n  font-size: 1.05rem;\n  font-weight: 700;\n  color: var(--tf-text);\n  margin: 0 0 14px;\n}\n\n.input-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  background: var(--tf-surface-2);\n  border: 1px solid var(--tf-border-strong);\n  border-radius: 12px;\n  padding: 0 14px;\n  transition: border-color 160ms var(--tf-ease-out);\n  height: 50px;\n  margin-bottom: 14px;\n}\n.input-wrapper[_ngcontent-%COMP%]:focus-within {\n  border-color: var(--tf-accent);\n}\n\n.input-icon[_ngcontent-%COMP%] {\n  color: var(--tf-text-muted);\n  flex-shrink: 0;\n  font-size: 18px;\n}\n\n.input-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n  background: transparent;\n  border: none;\n  outline: none;\n  color: var(--tf-text);\n  font-family: inherit;\n  height: 100%;\n  font-size: 0.95rem;\n}\n.input-field[_ngcontent-%COMP%]::placeholder {\n  color: var(--tf-text-muted);\n}\n\n.submit-button[_ngcontent-%COMP%] {\n  border: none;\n  border-radius: 12px;\n  background: var(--tf-accent-gradient);\n  color: var(--tf-accent-contrast);\n  font-weight: 700;\n  cursor: pointer;\n  transition: transform 160ms var(--tf-ease-out), opacity 160ms var(--tf-ease-out);\n  width: 100%;\n  height: 50px;\n  margin-top: 4px;\n  font-size: 0.95rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.submit-button[_ngcontent-%COMP%]:active {\n  transform: scale(0.97);\n}\n.submit-button[_ngcontent-%COMP%]:disabled {\n  opacity: 0.45;\n  cursor: default;\n}\n.submit-button[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-text);\n  outline-offset: 2px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fcGFuZWwtc2hlZXQuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYWNjb3VudC9hY2NvdW50LnBhZ2Uuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fYW5pbWF0aW9ucy5zY3NzIiwid2VicGFjazovLy4vc3JjL3RoZW1lL19pbnB1dHMuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fYnV0dG9ucy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXdEQTtFQUNFO0lBQ0UsVUFBQTtFQ3ZERjtFRHlEQTtJQUNFLFVBQUE7RUN2REY7QUFDRjtBRDBEQTtFQUNFO0lBQ0UsMkJBQUE7SUFDQSxVQUFBO0VDeERGO0VEMERBO0lBQ0Usd0JBQUE7SUFDQSxVQUFBO0VDeERGO0FBQ0Y7QUQwSEE7RUFDRTtJQUNFLDJCQUFBO0lBQ0EsVUFBQTtFQ3hIRjtFRDBIQTtJQUNFLHdCQUFBO0lBQ0EsVUFBQTtFQ3hIRjtBQUNGO0FDQUE7RUFDRTtJQUNFLFVBQUE7SUFDQSwwQkFBQTtFREVGO0VDQUE7SUFDRSxVQUFBO0lBQ0Esd0JBQUE7RURFRjtBQUNGO0FBaENBO0VBQ0UsMEJBQUE7RUFDQSxxQkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtBQWtDRjs7QUEvQkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSwrQkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0NBQUE7RUFDQSwwQkFBQTtFQUNBLGdDQUFBO0VDakJBLHdEQUFBO0FEb0RGO0FDbERFO0VES0Y7SUNKSSxlQUFBO0VEcURGO0FBQ0Y7O0FBakNBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQkFBQTtFQUNBLHFDQUFBO0VBQ0EsZ0NBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBb0NGOztBQTdCQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFFBQUE7RUFDQSxPQUFBO0VBQ0EsWUFBQTtBQWdDRjs7QUE3QkE7RUFDRSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7QUFnQ0Y7O0FBN0JBO0VBQ0UsaUNBQUE7RUFDQSwyQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxtQkFBQTtBQWdDRjs7QUE3QkE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSwrQkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0NBQUE7RUFDQSxnQkFBQTtFQUNBLGdDQUFBO0VDMUVBLHdEQUFBO0VENEVBLHFCQUFBO0FBZ0NGO0FDMUdFO0VEaUVGO0lDaEVJLGVBQUE7RUQ2R0Y7QUFDRjs7QUFsQ0E7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxzQkFBQTtFQUNBLCtCQUFBO0VBQ0EsNEJBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxzQ0FBQTtFQUNBLHFCQUFBO0VBQ0EsbUNBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLG9CQUFBO0VBQ0EsaUVBQUE7QUFxQ0Y7QUFuQ0U7RUFDRSxnQkFBQTtBQXFDSjtBQWxDRTtFQUNFLCtCQUFBO0FBb0NKO0FBakNFO0VBQ0UsK0JBQUE7QUFtQ0o7QUFoQ0U7RUFDRSxtQ0FBQTtFQUNBLG9CQUFBO0FBa0NKO0FBL0JFO0VBQ0UsZUFBQTtFQUNBLHVCQUFBO0VBQ0EsY0FBQTtBQWlDSjtBQTlCRTtFQUNFLE9BQUE7QUFnQ0o7O0FBNUJBO0VBQ0UsMkJBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBQStCRjs7QUE1QkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLHNCQUFBO0VBQ0EsV0FBQTtFQUNBLCtCQUFBO0VBQ0EsaUNBQUE7RUFDQSx1QkFBQTtFQUNBLHlDQUFBO0VBQ0Esa0NBQUE7RUFDQSxtQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGdFQUFBO0VDaEpBLHdEQUFBO0VEa0pBLHFCQUFBO0FBK0JGO0FDL0tFO0VEZ0lGO0lDL0hJLGVBQUE7RURrTEY7QUFDRjtBQWxDRTtFQUNFLHNCQUFBO0FBb0NKO0FBakNFO0VBQ0UsbUNBQUE7RUFDQSxtQkFBQTtBQW1DSjtBQWhDRTtFQUNFLGVBQUE7QUFrQ0o7O0FBNUJBO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0VBQ0EsV0FBQTtFQUNBLFVBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtBQStCRjs7QUEzQkE7RURoTEUsZUFBQTtFQUNBLFFBQUE7RUFDQSw2QkFBQTtFQUNBLHdDQUFBO0VBT0EsdURBQUE7QUN5TUY7QUR2TUU7RUNvS0Y7SURuS0ksZUFBQTtJQUNBLFVBQUE7RUMwTUY7QUFDRjs7QUFyQ0E7RURqS0UsZUFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsU0FBQTtFQUNBLCtCQUFBO0VBQ0EsK0JBQUE7RUFDQSw2Q0FBQTtFQUNBLDRCQUFBO0VBQ0EsdUJBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0Esb0RBQUE7QUMwTUY7QUR0TUU7RUNrSkY7SURqSkksZUFBQTtJQUNBLFVBQUE7SUFDQSxlQUFBO0VDeU1GO0FBQ0Y7O0FBdkRBO0VEOUlFLFdBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7RUFDQSxzQ0FBQTtFQUNBLG1CQUFBO0FDeU1GOztBQTNEQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtFQUNBLGdCQUFBO0FBOERGOztBQTNEQTtFRXBNRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsK0JGa00wQjtFRWpNMUIseUNBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpREFBQTtFRitMQSxZQUFBO0VBQ0EsbUJBQUE7QUFxRUY7QUVuUUU7RUFDRSw4QkFBQTtBRnFRSjs7QUFyRUE7RUUzTEUsMkJBQUE7RUFDQSxjQUFBO0VGNExBLGVBQUE7QUF5RUY7O0FBdEVBO0VFM0xFLE9BQUE7RUFDQSxZQUFBO0VBQ0EsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHFCQUFBO0VBQ0Esb0JBQUE7RUFDQSxZQUFBO0VGc0xBLGtCQUFBO0FBZ0ZGO0FFcFFFO0VBQ0UsMkJBQUE7QUZzUUo7O0FBaEZBO0VHaE5FLFlBQUE7RUFDQSxtQkFGaUM7RUFHakMscUNBQUE7RUFDQSxnQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLGdGQUFBO0VINE1BLFdBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7QUF5RkY7QUd6U0U7RUFDRSxzQkFBQTtBSDJTSjtBR3hTRTtFQUNFLGFBQUE7RUFDQSxlQUFBO0FIMFNKO0FHdlNFO0VBQ0UsaUNBQUE7RUFDQSxtQkFBQTtBSHlTSiIsInNvdXJjZXNDb250ZW50IjpbIi8vIEJvdHRvbSBzaGVldCAoYmFja2Ryb3AgKyBwYW5lbCBkZXNsaXphbnRlIGRlc2RlIGFiYWpvKSDDosKAwpQgZHVwbGljYWRvIGJ5dGUgYVxuLy8gYnl0ZSBlbiAyIHDDg8KhZ2luYXMgYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID5cbi8vIEZhc2UgMykuIFRhbWJpw4PCqW4gYXBhcmVjZSBmdWVyYSBkZSBlc3RhIGFwcCBlbiBwYWNrYWdlcy9zaGFyZWQtZmVhdHVyZXNcbi8vIChvbmJvYXJkaW5nLCBteS1jaGVja2lucywgZXRjLikgw6LCgMKUIGZ1ZXJhIGRlIGFsY2FuY2UgYXF1w4PCrSBwb3JxdWUgZXNhIGNhcGEgbm9cbi8vIHRpZW5lIGxvcyB0b2tlbnMgLS10Zi0qOyBzaSBlc2FzIHDDg8KhZ2luYXMgbWlncmFuIGEgLS10Zi0qIGFsZ8ODwrpuIGTDg8KtYSwgZXN0ZVxuLy8gbWlzbW8gcGFydGlhbCBlcyBlbCBkZXN0aW5vIG5hdHVyYWwuXG5AbWl4aW4gdGYtcGFuZWwtYmFja2Ryb3Age1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIGluc2V0OiAwO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1vdmVybGF5KTtcbiAgei1pbmRleDogdmFyKC0tdGYtei1tb2RhbC1iYWNrZHJvcCwgNDAwKTtcbiAgLy8gYGJvdGhgIHkgbm8gZWwgdmFsb3IgcG9yIGRlZmVjdG8gYG5vbmVgOiBzaW4gZmlsbC1tb2RlIGVsIGVsZW1lbnRvIHNlXG4gIC8vIHF1ZWRhIGVuIHN1IHZhbG9yIEJBU0UgbWllbnRyYXMgbGEgYW5pbWFjacODwrNuIGVzdMODwqEgcGVuZGllbnRlIGRlIGFycmFuY2FyXG4gIC8vIMOiwoDClHBlc3Rhw4PCsWEgZW4gc2VndW5kbyBwbGFubywgd2VidmlldyBxdWUgZGlmaWVyZSBlbCBwcmltZXIgZnJhbWXDosKAwpQgeSBjb21vXG4gIC8vIGVsIGtleWZyYW1lIHBhcnRlIGRlIG9wYWNpdHkgMCwgbGEgaG9qYSBhcGFyZWPDg8KtYSBhIG1lZGlhcywgdHJhbnNsw4PCumNpZGEsXG4gIC8vIGRlamFuZG8gdmVyIGxhIGZpY2hhIGRlIGRldHLDg8Khcy4gTWVkaWRvOiBjb24gbGEgYW5pbWFjacODwrNuIHNpbiBhdmFuemFyLFxuICAvLyBvcGFjaXR5IGNvbXB1dGFiYSAwLlxuICBhbmltYXRpb246IHRmLWJhY2tkcm9wLWluIDIwMG1zIHZhcigtLXRmLWVhc2Utb3V0KSBib3RoO1xuXG4gIEBtZWRpYSAocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKSB7XG4gICAgYW5pbWF0aW9uOiBub25lO1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuQG1peGluIHRmLXBhbmVsLXNoZWV0IHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgYm90dG9tOiAwO1xuICB6LWluZGV4OiB2YXIoLS10Zi16LW1vZGFsLCA1MDApO1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTEpO1xuICBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyLXN0cm9uZyk7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHggMjBweCAwIDA7XG4gIHBhZGRpbmc6IDEwcHggMTZweCAyNHB4O1xuICBtYXgtaGVpZ2h0OiA4MHZoO1xuICBvdmVyZmxvdy15OiBhdXRvO1xuICBhbmltYXRpb246IHRmLXNoZWV0LWluIDI2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSBib3RoO1xuXG4gIC8vIFNpbiBhbmltYWNpw4PCs24sIGVsIGVzdGFkbyBmaW5hbCB0aWVuZSBxdWUgcXVlZGFyIGV4cGzDg8KtY2l0bzogYG5vbmVgIGJvcnJhXG4gIC8vIHRhbWJpw4PCqW4gZWwgYGJvdGhgIGRlIGFycmliYS5cbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICBhbmltYXRpb246IG5vbmU7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IG5vbmU7XG4gIH1cbn1cblxuQG1peGluIHRmLXBhbmVsLWhhbmRsZSB7XG4gIHdpZHRoOiAzNnB4O1xuICBoZWlnaHQ6IDRweDtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xuICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1ib3JkZXItc3Ryb25nZXN0KTtcbiAgbWFyZ2luOiAwIGF1dG8gMTRweDtcbn1cblxuQGtleWZyYW1lcyB0Zi1iYWNrZHJvcC1pbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gIH1cbn1cblxuQGtleWZyYW1lcyB0Zi1zaGVldC1pbiB7XG4gIGZyb20ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxNnB4KTtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gIHRvIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFBhbmVsIGxhdGVyYWwgZGVyZWNoby4gTWlzbWEgcGllemEgcXVlIGxhIGJvdHRvbSBzaGVldCBwZXJvIGFuY2xhZG8gYWxcbi8vIGxhZG8sIHBhcmEgZm9ybXVsYXJpb3MgbGFyZ29zIHF1ZSBzZSByZWxsZW5hbiBtaXJhbmRvIGVsIGNvbnRlbmlkbyBkZVxuLy8gZGV0csODwqFzIChzdXBsZW1lbnRvcyBqdW50byBhIHN1cyBncsODwqFmaWNhcywgcG9yIGVqZW1wbG8pLlxuLy9cbi8vIEVuIG3Dg8KzdmlsIE5PIHNlIGxhdGVyYWxpemE6IDQwMHB4IGRlIGFuY2hvIHNvYnJlIHVuYSBwYW50YWxsYSBkZSAzOTAgZXMgdW5hXG4vLyBob2phIGEgcGFudGFsbGEgY29tcGxldGEgbWFsIGhlY2hhLiBQb3IgZGViYWpvIGRlIDc2OHB4IHNpZ3VlIHNpZW5kb1xuLy8gYm90dG9tIHNoZWV0LCBxdWUgZXMgZWwgZ2VzdG8gcXVlIGxhIGdlbnRlIGVzcGVyYSBhaMODwq0uXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIEVsIHZlbG8gc2UgYWNsYXJhIGVuIGVzY3JpdG9yaW86IGVsIHBhbmVsIHNlIGxhdGVyYWxpemEgcHJlY2lzYW1lbnRlIHBhcmFcbi8vIHBvZGVyIG1pcmFyIGxvIHF1ZSBoYXkgZGV0csODwqFzIG1pZW50cmFzIHNlIHJlbGxlbmEgKGxhcyBncsODwqFmaWNhcyBkZVxuLy8gcHJvZ3Jlc28sIGFsIHBhdXRhciB1biBzdXBsZW1lbnRvKS4gQWwgNTAlIHF1ZWRhYmFuIGFwYWdhZGFzLlxuQG1peGluIHRmLXNpZGUtcGFuZWwtYmFja2Ryb3Age1xuICBAaW5jbHVkZSB0Zi1wYW5lbC1iYWNrZHJvcDtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMjUpO1xuICB9XG59XG5cbkBtaXhpbiB0Zi1zaWRlLXBhbmVsKCR3aWR0aDogNDIwcHgpIHtcbiAgQGluY2x1ZGUgdGYtcGFuZWwtc2hlZXQ7XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiBhdXRvO1xuICAgIHJpZ2h0OiAwO1xuICAgIHdpZHRoOiAkd2lkdGg7XG4gICAgbWF4LXdpZHRoOiA5MnZ3O1xuICAgIC8vIDEwMHZoIHkgbm8gYG5vbmVgOiBzaSB1biBhbmNlc3RybyBjb24gYGNvbnRhaW5gIGNhcHR1cmEgZWwgZml4ZWRcbiAgICAvLyAoaW9uLWNvbnRlbnQgbG8gaGFjZSksIGVsIHBhbmVsIHRvbWEgbGEgYWx0dXJhIGRlIEVTRSBhbmNlc3Ryby4gU2lcbiAgICAvLyBtaWRlIG3Dg8KhcyBxdWUgbGEgdmVudGFuYSwgZWwgcGllIGNvbiBHdWFyZGFyIHNlIHF1ZWRhIGZ1ZXJhIGRlXG4gICAgLy8gcGFudGFsbGEuIE1lZGlkbzogODQwcHggZGUgYWx0byBlbiB1bmEgdmVudGFuYSBkZSA4MDAuXG4gICAgbWF4LWhlaWdodDogMTAwdmg7XG4gICAgLy8gU2luIGVzdG8gZWwgcmVsbGVubyBzZSBzdW1hIGFsIGFuY2hvIHkgYWwgYWx0bzogZWwgcGFuZWwgbWVkw4PCrWEgNDgxcHhcbiAgICAvLyBwaWRpZW5kbyA0NDAsIHkgODQwIGRlIGFsdG8gZW4gdW5hIHZlbnRhbmEgZGUgODAwLCBkZXNib3JkYW5kbyBwb3JcbiAgICAvLyBhYmFqby4gRXN0ZSBwcm95ZWN0byBubyB0aWVuZSByZXNldCBnbG9iYWwgZGUgYm94LXNpemluZy5cbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgIGJvcmRlci10b3A6IG5vbmU7XG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCB2YXIoLS10Zi1ib3JkZXItc3Ryb25nKTtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIHBhZGRpbmc6IHZhcigtLXRmLXNwYWNlLTUpIHZhcigtLXRmLXNwYWNlLTUpIDA7XG4gICAgYW5pbWF0aW9uOiB0Zi1zaWRlLXBhbmVsLWluIDI2MG1zIHZhcigtLXRmLWVhc2Utb3V0KSBib3RoO1xuXG4gICAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICAgIGFuaW1hdGlvbjogbm9uZTtcbiAgICAgIG9wYWNpdHk6IDE7XG4gICAgICB0cmFuc2Zvcm06IG5vbmU7XG4gICAgfVxuICB9XG59XG5cbi8vIEVsIGFzYSBkZSBhcnJhc3RyZSBzb2xvIHRpZW5lIHNlbnRpZG8gZW4gbGEgaG9qYSBpbmZlcmlvcjogZW4gdW4gcGFuZWxcbi8vIGxhdGVyYWwgbm8gaGF5IG5hZGEgcXVlIGFycmFzdHJhciBoYWNpYSBhYmFqby5cbkBtaXhpbiB0Zi1zaWRlLXBhbmVsLWhhbmRsZSB7XG4gIEBpbmNsdWRlIHRmLXBhbmVsLWhhbmRsZTtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogNzY4cHgpIHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgdGYtc2lkZS1wYW5lbC1pbiB7XG4gIGZyb20ge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgyNHB4KTtcbiAgICBvcGFjaXR5OiAwO1xuICB9XG4gIHRvIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gICAgb3BhY2l0eTogMTtcbiAgfVxufVxuIiwiQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvcGFuZWwtc2hlZXQnO1xuQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvaW5wdXRzJztcbkBpbXBvcnQgJy4uLy4uLy4uL3RoZW1lL2J1dHRvbnMnO1xuQGltcG9ydCAnLi4vLi4vLi4vdGhlbWUvYW5pbWF0aW9ucyc7XG5cbi5hY2NvdW50LWNvbnRlbnQge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLXRmLWJnKTtcbiAgLS1wYWRkaW5nLXN0YXJ0OiAyMHB4O1xuICAtLXBhZGRpbmctZW5kOiAyMHB4O1xuICAtLXBhZGRpbmctdG9wOiAyMHB4O1xuICAtLXBhZGRpbmctYm90dG9tOiAzMnB4O1xufVxuXG4uYWNjb3VudC1jYXJkIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgZ2FwOiB2YXIoLS10Zi1zcGFjZS00KTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0xKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLWxnKTtcbiAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtNSk7XG4gIG1hcmdpbi1ib3R0b206IHZhcigtLXRmLXNwYWNlLTUpO1xuICBAaW5jbHVkZSB0Zi1jYXJkLWluLWFuaW1hdGlvbjtcbn1cblxuLy8gR3JhZGllbnRlIGRlIGFjZW50byBlbiB2ZXogZGUgLS10Zi1hY2NlbnQgcGxhbm8gw6LCgMKUIG1pc21vIHRyYXRhbWllbnRvIHF1ZSBlbFxuLy8gQ1RBIHByaW1hcmlvICh0Zi1ncmFkaWVudC1idXR0b24pLCByZWZ1ZXJ6YSBsYSBpZGVudGlkYWQgZGUgbWFyY2EgZW4gZWxcbi8vIGVsZW1lbnRvIG3Dg8KhcyBwcm9taW5lbnRlIGRlIFwiTWkgY3VlbnRhXCIuXG4uYWNjb3VudC1hdmF0YXIge1xuICB3aWR0aDogNjRweDtcbiAgaGVpZ2h0OiA2NHB4O1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLWFjY2VudC1ncmFkaWVudCk7XG4gIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQtY29udHJhc3QpO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxLjRyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4vLyBMYSBpbmZvIGRlIHBlcmZpbCBvY3VwYSBlbCByZXN0byBkZSBsYSBmaWxhIChhbnRlcyBxdWVkYWJhIGNlbnRyYWRhIGVuXG4vLyBjb2x1bW5hIGRlbnRybyBkZSBsYSBjYXJkIGNvbXBsZXRhLCBkZWphbmRvIGh1ZWNvcyB2YWPDg8Ktb3MgYSBsb3MgbGFkb3MgZW5cbi8vIHBhbnRhbGxhcyBhbmNoYXMpIMOiwoDClCBtaXNtbyBwYXRyw4PCs24gXCJpY29ubyArIGNvbnRlbmlkbyBmbGV4OjFcIiBxdWUgeWEgdXNhXG4vLyAuYWNjb3VudC1tZW51LWl0ZW0gbcODwqFzIGFiYWpvLlxuLmFjY291bnQtaW5mbyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGdhcDogMnB4O1xuICBmbGV4OiAxO1xuICBtaW4td2lkdGg6IDA7XG59XG5cbi5hY2NvdW50LW5hbWUge1xuICBmb250LXNpemU6IHZhcigtLXRmLWZvbnQtc2l6ZS1sZyk7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG59XG5cbi5hY2NvdW50LWVtYWlsIHtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtc20pO1xuICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xufVxuXG4uYWNjb3VudC1tZW51IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0xKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLWxnKTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbWFyZ2luLWJvdHRvbTogdmFyKC0tdGYtc3BhY2UtNSk7XG4gIEBpbmNsdWRlIHRmLWNhcmQtaW4tYW5pbWF0aW9uO1xuICBhbmltYXRpb24tZGVsYXk6IDM1bXM7XG59XG5cbi5hY2NvdW50LW1lbnUtaXRlbSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtMyk7XG4gIG1pbi1oZWlnaHQ6IHZhcigtLXRmLXRvdWNoLW1pbik7XG4gIHBhZGRpbmc6IDAgdmFyKC0tdGYtc3BhY2UtNCk7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG4gIGJvcmRlcjogbm9uZTtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlcik7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0KTtcbiAgZm9udC1zaXplOiB2YXIoLS10Zi1mb250LXNpemUtYmFzZSk7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6Zmlyc3QtY2hpbGQge1xuICAgIGJvcmRlci10b3A6IG5vbmU7XG4gIH1cblxuICAmOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kOiB2YXIoLS10Zi1zdXJmYWNlLTIpO1xuICB9XG5cbiAgJjphY3RpdmUge1xuICAgIGJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMik7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1hY2NlbnQpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAtMnB4O1xuICB9XG5cbiAgaW9uLWljb246Zmlyc3QtY2hpbGQge1xuICAgIGZvbnQtc2l6ZTogMTlweDtcbiAgICBjb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgICBmbGV4LXNocmluazogMDtcbiAgfVxuXG4gIHNwYW4ge1xuICAgIGZsZXg6IDE7XG4gIH1cbn1cblxuLmFjY291bnQtbWVudS1jaGV2cm9uIHtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtZmFpbnQpO1xuICBmb250LXNpemU6IDE2cHg7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuXG4ubG9nb3V0LWJ1dHRvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBnYXA6IHZhcigtLXRmLXNwYWNlLTIpO1xuICB3aWR0aDogMTAwJTtcbiAgbWluLWhlaWdodDogdmFyKC0tdGYtdG91Y2gtbWluKTtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtZGFuZ2VyLXNvZnQpO1xuICBjb2xvcjogdmFyKC0tdGYtZGFuZ2VyKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtZGFuZ2VyLWJvcmRlcik7XG4gIGJvcmRlci1yYWRpdXM6IHZhcigtLXRmLXJhZGl1cy1sZyk7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLWJhc2UpO1xuICBmb250LXdlaWdodDogNjAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS10Zi1kdXJhdGlvbi1mYXN0KSB2YXIoLS10Zi1lYXNlLW91dCk7XG4gIEBpbmNsdWRlIHRmLWNhcmQtaW4tYW5pbWF0aW9uO1xuICBhbmltYXRpb24tZGVsYXk6IDcwbXM7XG5cbiAgJjphY3RpdmUge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMC45OCk7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi1kYW5nZXIpO1xuICAgIG91dGxpbmUtb2Zmc2V0OiAycHg7XG4gIH1cblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxOHB4O1xuICB9XG59XG5cbi8vIFRleHRvIHNvbG8gcGFyYSBsZWN0b3JlcyBkZSBwYW50YWxsYSAoZXN0YWRvIFwiZ3VhcmRhbmRvXCIgZGVsIGJvdMODwrNuIGRlXG4vLyBwZXJmaWwsIGhveSDDg8K6bmljYW1lbnRlIHZpc3VhbCB2w4PCrWEgZWwgc3Bpbm5lcikuXG4uc3Itb25seSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDFweDtcbiAgaGVpZ2h0OiAxcHg7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogLTFweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgY2xpcDogcmVjdCgwLCAwLCAwLCAwKTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgYm9yZGVyOiAwO1xufVxuXG4vLyAtLS0gUGFuZWw6IGVkaXRhciBwZXJmaWwgKGJvdHRvbSBzaGVldCkgLS0tXG4ucGFuZWwtYmFja2Ryb3Age1xuICBAaW5jbHVkZSB0Zi1wYW5lbC1iYWNrZHJvcDtcbn1cblxuLnBhbmVsLXNoZWV0IHtcbiAgQGluY2x1ZGUgdGYtcGFuZWwtc2hlZXQ7XG59XG5cbi5wYW5lbC1oYW5kbGUge1xuICBAaW5jbHVkZSB0Zi1wYW5lbC1oYW5kbGU7XG59XG5cbi5wYW5lbC10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMS4wNXJlbTtcbiAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICBtYXJnaW46IDAgMCAxNHB4O1xufVxuXG4uaW5wdXQtd3JhcHBlciB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LXdyYXBwZXIodmFyKC0tdGYtc3VyZmFjZS0yKSk7XG4gIGhlaWdodDogNTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTRweDtcbn1cblxuLmlucHV0LWljb24ge1xuICBAaW5jbHVkZSB0Zi1pbnB1dC1pY29uO1xuICBmb250LXNpemU6IDE4cHg7XG59XG5cbi5pbnB1dC1maWVsZCB7XG4gIEBpbmNsdWRlIHRmLWlucHV0LWZpZWxkO1xuICBmb250LXNpemU6IDAuOTVyZW07XG59XG5cbi5zdWJtaXQtYnV0dG9uIHtcbiAgQGluY2x1ZGUgdGYtZ3JhZGllbnQtYnV0dG9uO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA1MHB4O1xuICBtYXJnaW4tdG9wOiA0cHg7XG4gIGZvbnQtc2l6ZTogMC45NXJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG4iLCIvLyBFbnRyYWRhIGVzY2Fsb25hZGEgZGUgbGlzdGFzL2dyaWRzIGRlIGNhcmRzIGFsIGNhcmdhciDDosKAwpQgbWlzbW8gYmxvcXVlXG4vLyAoa2V5ZnJhbWUgKyBhbmltYXRpb24gKyBndWFyZCBkZSBwcmVmZXJzLXJlZHVjZWQtbW90aW9uKSByZXBldGlkbyBieXRlIGFcbi8vIGJ5dGUgZW4gOSBww4PCoWdpbmFzIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8Kzbi4gTWlzbW8gY3JpdGVyaW8gcXVlXG4vLyBfc2tlbGV0b24uc2Nzcy9fYnV0dG9ucy5zY3NzOiBjYWRhIHDDg8KhZ2luYSBhcGxpY2EgZWwgbWl4aW4gc29icmUgc3UgcHJvcGlvXG4vLyBzZWxlY3RvciB5IGHDg8KxYWRlIGVuY2ltYSBzb2xvIGxvIHF1ZSB2YXLDg8KtYSAocmFkaW8sIHRhbWHDg8Kxby4uLikuXG5AbWl4aW4gdGYtY2FyZC1pbi1hbmltYXRpb24ge1xuICBhbmltYXRpb246IHRmLWNhcmQtaW4gMzIwbXMgdmFyKC0tdGYtZWFzZS1vdXQpIGJhY2t3YXJkcztcblxuICBAbWVkaWEgKHByZWZlcnMtcmVkdWNlZC1tb3Rpb246IHJlZHVjZSkge1xuICAgIGFuaW1hdGlvbjogbm9uZTtcbiAgfVxufVxuXG4vLyBWYXJpYW50ZSBwYXJhIGxpc3RhczogYWRlbcODwqFzIGRlbCBmdW5kaWRvLCBlc2NhbG9uYSBlbCByZXRyYXNvIGRlIGNhZGFcbi8vIGVsZW1lbnRvIHBvciBzdSBwb3NpY2nDg8KzbiAobnRoLWNoaWxkKS4gJG1heC1pdGVtcyBhY290YSBlbCBidWNsZSBhbCBuw4LCulxuLy8gcmF6b25hYmxlIGRlIHRhcmpldGFzIHZpc2libGVzIHBvciBww4PCoWdpbmEgw6LCgMKUIG5vIHRpZW5lIHNlbnRpZG8gZ2VuZXJhciBtw4PCoXNcbi8vIHJlZ2xhcyBudGgtY2hpbGQgcXVlIGVsZW1lbnRvcyBwdWVkZSBsbGVnYXIgYSBoYWJlci5cbkBtaXhpbiB0Zi1jYXJkLWluLXN0YWdnZXIoJG1heC1pdGVtczogMTIsICRzdGVwOiAzNW1zKSB7XG4gIEBpbmNsdWRlIHRmLWNhcmQtaW4tYW5pbWF0aW9uO1xuXG4gIEBmb3IgJGkgZnJvbSAxIHRocm91Z2ggJG1heC1pdGVtcyB7XG4gICAgJjpudGgtY2hpbGQoI3skaX0pIHtcbiAgICAgIGFuaW1hdGlvbi1kZWxheTogI3soJGkgLSAxKSAqICRzdGVwfTtcbiAgICB9XG4gIH1cbn1cblxuQGtleWZyYW1lcyB0Zi1jYXJkLWluIHtcbiAgZnJvbSB7XG4gICAgb3BhY2l0eTogMDtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoNnB4KTtcbiAgfVxuICB0byB7XG4gICAgb3BhY2l0eTogMTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cbn1cbiIsIi8vIEZpbGEgZGUgaW5wdXQgY29uIGljb25vICh3cmFwcGVyICsgaWNvbm8gKyBjYW1wbykgw6LCgMKUIHJlcGV0aWRhIGVuIDQgcMODwqFnaW5hc1xuLy8gYW50ZXMgZGUgZXN0YSBleHRyYWNjacODwrNuICh2ZXIgVEFSRUE0LXVpLXV4LXJlZGlzZW5vLm1kID4gRmFzZSAzKS4gRWwgZm9uZG9cbi8vIGRlbCB3cmFwcGVyIGVzIGVsIMODwrpuaWNvIHZhbG9yIHF1ZSB2YXLDg8KtYSBwb3IgcMODwqFnaW5hIChzdXBlcmZpY2llIDEgbyAyIHNlZ8ODwrpuXG4vLyBjb250ZXh0byB2aXN1YWwpLCBkZSBhaMODwq0gZWwgcGFyw4PCoW1ldHJvOyB0YW1hw4PCsW8gZGUgZnVlbnRlL2FsdG8vbWFyZ2VuIHNlXG4vLyBkZWphbiBmdWVyYSBkZWwgbWl4aW4gcG9ycXVlIGNhZGEgcMODwqFnaW5hIGxvcyBmaWphIHNlZ8ODwrpuIHN1IHByb3BpbyBsYXlvdXQuXG5AbWl4aW4gdGYtaW5wdXQtd3JhcHBlcigkYmc6IHZhcigtLXRmLXN1cmZhY2UtMSkpIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAxMHB4O1xuICBiYWNrZ3JvdW5kOiAkYmc7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXRmLWJvcmRlci1zdHJvbmcpO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICBwYWRkaW5nOiAwIDE0cHg7XG4gIHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCk7XG5cbiAgJjpmb2N1cy13aXRoaW4ge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYWNjZW50KTtcbiAgfVxufVxuXG5AbWl4aW4gdGYtaW5wdXQtaWNvbiB7XG4gIGNvbG9yOiB2YXIoLS10Zi10ZXh0LW11dGVkKTtcbiAgZmxleC1zaHJpbms6IDA7XG59XG5cbkBtaXhpbiB0Zi1pbnB1dC1maWVsZCB7XG4gIGZsZXg6IDE7XG4gIG1pbi13aWR0aDogMDtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogbm9uZTtcbiAgb3V0bGluZTogbm9uZTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgaGVpZ2h0OiAxMDAlO1xuXG4gICY6OnBsYWNlaG9sZGVyIHtcbiAgICBjb2xvcjogdmFyKC0tdGYtdGV4dC1tdXRlZCk7XG4gIH1cbn1cbiIsIi8vIEJvdMODwrNuIENUQSBjb24gZ3JhZGllbnRlIGRlIGFjZW50byDDosKAwpQgbWlzbW8gYmxvcXVlIHJlcGV0aWRvIGVuIH4xMSBzaXRpb3MgZGVcbi8vIH4xMCBww4PCoWdpbmFzIGFudGVzIGRlIGVzdGEgZXh0cmFjY2nDg8KzbiAodmVyIFRBUkVBNC11aS11eC1yZWRpc2Vuby5tZCA+IEZhc2UgMykuXG4vLyBDYWRhIHDDg8KhZ2luYSBhcGxpY2EgZWwgbWl4aW4gc29icmUgc3UgcHJvcGlvIHNlbGVjdG9yIHkgYcODwrFhZGUgZW5jaW1hIHNvbG8gbG9cbi8vIHF1ZSB2YXLDg8KtYSBwb3IgbGF5b3V0ICh3aWR0aCwgaGVpZ2h0LCBmb250LXNpemUsIG1hcmdpbikuXG4vL1xuLy8gTGEgbWl0YWQgZGUgbG9zIHNpdGlvcyBvcmlnaW5hbGVzIG5vIHRlbsODwq1hbiB0cmFuc2ljacODwrNuL2ZlZWRiYWNrIGRlIHB1bHNhY2nDg8KzblxuLy8gbmkgOmZvY3VzLXZpc2libGUgw6LCgMKUIGVsIG1peGluIGxvcyBhw4PCsWFkZSBzaWVtcHJlLCBjaWVycmEgZXNlIGh1ZWNvIGRlXG4vLyBjb25zaXN0ZW5jaWEgZGUgaW50ZXJhY2Npw4PCs24gKFBST0RVQ1QubWQ6IFwidW4gc29sbyBwYXRyw4PCs24gcG9yIHRpcG8gZGVcbi8vIGNvbXBvbmVudGVcIikgZW4gdmV6IGRlIHBlcnBldHVhciBsYSB2YXJpYWNpw4PCs24gYWNjaWRlbnRhbC5cbkBtaXhpbiB0Zi1ncmFkaWVudC1idXR0b24oJHJhZGl1czogMTJweCkge1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6ICRyYWRpdXM7XG4gIGJhY2tncm91bmQ6IHZhcigtLXRmLWFjY2VudC1ncmFkaWVudCk7XG4gIGNvbG9yOiB2YXIoLS10Zi1hY2NlbnQtY29udHJhc3QpO1xuICBmb250LXdlaWdodDogNzAwO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAxNjBtcyB2YXIoLS10Zi1lYXNlLW91dCksIG9wYWNpdHkgMTYwbXMgdmFyKC0tdGYtZWFzZS1vdXQpO1xuXG4gICY6YWN0aXZlIHtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuOTcpO1xuICB9XG5cbiAgJjpkaXNhYmxlZCB7XG4gICAgb3BhY2l0eTogMC40NTtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG4gIH1cblxuICAmOmZvY3VzLXZpc2libGUge1xuICAgIG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS10Zi10ZXh0KTtcbiAgICBvdXRsaW5lLW9mZnNldDogMnB4O1xuICB9XG59XG5cbi8vIEJvdMODwrNuIGRlIGhlYWRlciBxdWUgZXMgc29sbyB1biBpY29ubyDDosKAwpQgbWlzbW8gbG9vayBcImVudnVlbHRvXCIgcXVlIHlhIHVzYSBsYVxuLy8gYXBwIGRlIGNvbnN1bWlkb3IgZW4gc3VzIHRvb2xiYXJzIChwYWNrYWdlcy9zaGFyZWQtZmVhdHVyZXMvLi4uL2RpZXRzL1xuLy8gY29tcG9uZW50cy90b29sYmFyLWNhbGVuZGFyOiBmb25kbyArIGJvcmRlci1yYWRpdXMgKyBjYWphIGZpamEgNDR4NDQsIGVuXG4vLyB2ZXogZGVsIGlvbi1idXR0b24gcGxhbm8vdHJhbnNwYXJlbnRlIHF1ZSB0ZW7Dg8KtYSBjYWRhIHBhbnRhbGxhIGRlIHRyYWluZXJzXG4vLyBoYXN0YSBhaG9yYSkuIFRva2VuZWFkbyBhIGxhIHBhbGV0YSBkZSBlc3RhIGFwcCBlbiB2ZXogZGUgcmVwZXRpciBsb3Ncbi8vIHJnYmEoMjU1LDI1NSwyNTUsLi4uKSBzdWVsdG9zIGRlbCBvcmlnaW5hbC5cbi8vXG4vLyBTaXJ2ZSB0YW50byBwYXJhIDxpb24tYnV0dG9uIGZpbGw9XCJjbGVhclwiPiAodXNhIGxhcyBDU1MgY3VzdG9tIHByb3BlcnRpZXNcbi8vIGRlIElvbmljKSBjb21vIHBhcmEgdW4gPGJ1dHRvbj4gbmF0aXZvICh1c2EgbGFzIHByb3BpZWRhZGVzIHBsYW5hcykgw6LCgMKUXG4vLyBhbWJvcyBjb2V4aXN0ZW4gaG95IGVuIHRyYWluZXJzIHBhcmEgZWwgbWlzbW8gcm9sIGRlIFwidm9sdmVyXCIvXCJjZXJyYXJcIi5cbkBtaXhpbiB0Zi1pY29uLWJ1dHRvbigkc2l6ZTogNDRweCwgJHJhZGl1czogMTJweCwgJGljb24tc2l6ZTogMjBweCkge1xuICAtLWJhY2tncm91bmQ6IHZhcigtLXRmLXN1cmZhY2UtMyk7XG4gIC0tYmFja2dyb3VuZC1hY3RpdmF0ZWQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIC0tYmFja2dyb3VuZC1ob3ZlcjogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgLS1iYWNrZ3JvdW5kLWZvY3VzZWQ6IHZhcigtLXRmLXN1cmZhY2UtNCk7XG4gIC0tY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgLS1ib3JkZXItcmFkaXVzOiAjeyRyYWRpdXN9O1xuICAtLXBhZGRpbmctc3RhcnQ6IDA7XG4gIC0tcGFkZGluZy1lbmQ6IDA7XG4gIC0tcGFkZGluZy10b3A6IDA7XG4gIC0tcGFkZGluZy1ib3R0b206IDA7XG5cbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0zKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtc2Vjb25kYXJ5KTtcbiAgYm9yZGVyOiBub25lO1xuICBib3JkZXItcmFkaXVzOiAkcmFkaXVzO1xuICB3aWR0aDogJHNpemU7XG4gIGhlaWdodDogJHNpemU7XG4gIG1pbi13aWR0aDogJHNpemU7XG4gIG1pbi1oZWlnaHQ6ICRzaXplO1xuICBtYXJnaW46IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQgdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpLFxuICAgIGNvbG9yIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KTtcblxuICAmOmFjdGl2ZSB7XG4gICAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS00KTtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxuXG4gIGlvbi1pY29uIHtcbiAgICBmb250LXNpemU6ICRpY29uLXNpemU7XG4gIH1cbn1cblxuLy8gRXhwYW5zb3IgaW52aXNpYmxlIGRlIHpvbmEgcHVsc2FibGUuXG4vL1xuLy8gUEFSQSBRVcODwok6IHVuIGNvbnRyb2wgY29tcGFjdG8gKHVuIGljb25vIGRlIDMyIHB4IGVuIHVuYSBmaWxhIGRlIHRhYmxhLCB1blxuLy8gZW5sYWNlIGRlIHRleHRvIGRlIDE2IHB4KSBubyBsbGVnYSBhIGxvcyA0NCBweCBxdWUgZXhpZ2UgUFJPRFVDVC5tZCwgeVxuLy8gZW5nb3JkYXJsbyBkZSB2ZXJkYWQgZGVzcGxhemEgdG9kbyBsbyBxdWUgdGllbmUgYWxyZWRlZG9yIMOiwoDClCBlbiB1bmEgdGFibGFcbi8vIGRlIHZlaW50ZSBmaWxhcywgOCBweCBwb3IgZmlsYSBzb24gbWVkaWEgcGFudGFsbGEuXG4vL1xuLy8gRWwgcHNldWRvZWxlbWVudG8gY3JlY2UgaGFjaWEgZnVlcmEgc2luIG9jdXBhciBzaXRpbyBlbiBlbCBmbHVqbywgYXPDg8KtIHF1ZVxuLy8gZWwgYm90w4PCs24gc2UgdmUgcGVxdWXDg8KxbyB5IHNlIHB1bHNhIGdyYW5kZS5cbi8vXG4vLyBBVklTTyBERSBNRURJQ0nDg8KTTjogZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkgTk8gdmUgZXN0ZSBwc2V1ZG9lbGVtZW50bywgYXPDg8KtXG4vLyBxdWUgYWwgdmVyaWZpY2FyIGhheSBxdWUgdXNhciBlbGVtZW50RnJvbVBvaW50IGNvbiBlbCBlbGVtZW50byBkZW50cm8gZGVsXG4vLyB2aWV3cG9ydC4gQWRlbcODwqFzIGVsIGhpdC10ZXN0IGRldnVlbHZlIDIgcHggbWVub3MgcXVlIGxhIGNhamEgZGVjbGFyYWRhXG4vLyAoY29tcHJvYmFkbzogLTRweCBkYSA0MiwgLTZweCBkYSA0NiksIGFzw4PCrSBxdWUgdW4gNDIgbWVkaWRvIHNvbiA0NCByZWFsZXMuXG4vL1xuLy8gJGdyb3c6IGN1w4PCoW50byBjcmVjZSBwb3IgY2FkYSBsYWRvLiA0cHggbGxldmEgdW4gY29udHJvbCBkZSAzNiBweCBhIDQ0LlxuQG1peGluIHRmLXRvdWNoLWV4cGFuZGVyKCRncm93OiA0cHgpIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gICY6OmJlZm9yZSB7XG4gICAgY29udGVudDogJyc7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGluc2V0OiAtI3skZ3Jvd307XG4gIH1cbn1cblxuLy8gVmFyaWFudGUgcXVlIHNvbG8gY3JlY2UgZW4gVkVSVElDQUwuIFBhcmEgY29udHJvbGVzIGVuIGZpbGEgZG9uZGUgZWxcbi8vIGV4cGFuc29yIGhvcml6b250YWwgc2Ugc29sYXBhcsODwq1hIGNvbiBlbCBkZSBhbCBsYWRvIHkgcm9iYXLDg8KtYSBzdXMgdG9xdWVzLlxuQG1peGluIHRmLXRvdWNoLWV4cGFuZGVyLXkoJGdyb3c6IDRweCkge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAtI3skZ3Jvd307XG4gICAgYm90dG9tOiAtI3skZ3Jvd307XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
}));


/***/ })

}]);
//# sourceMappingURL=src_app_features_account_account_module_ts.js.map