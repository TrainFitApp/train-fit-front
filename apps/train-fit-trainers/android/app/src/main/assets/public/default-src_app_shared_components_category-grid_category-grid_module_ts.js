"use strict";
(self["webpackChunkapp"] = self["webpackChunkapp"] || []).push([["default-src_app_shared_components_category-grid_category-grid_module_ts"],{

/***/ 32443:
/*!****************************************************************************!*\
  !*** ./src/app/shared/components/category-grid/category-grid.component.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CategoryGridComponent: () => (/* binding */ CategoryGridComponent)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 69717);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 31133);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ionic/angular */ 54844);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 64409);

var _CategoryGridComponent;




function CategoryGridComponent_a_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "a", 2)(1, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "ion-icon", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "span", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "span", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "Ver todas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "ion-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const c_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", c_r1.path);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleProp"]("background", c_r1.colorVar);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("name", c_r1.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](c_r1.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](c_r1.description);
  }
}
// Movimiento 1 Coach Pro — extraído tal cual del interior de TemplatesPage al
// partirse "Plantillas" en Biblioteca (/tabs/templates) y Mi método
// (/tabs/method). Ambas presentan la misma rejilla de tarjetas-categoría;
// duplicar el markup y sus ~80 líneas de SCSS habría dejado dos copias que se
// desincronizan a la primera. El componente no añade comportamiento nuevo:
// es exactamente lo que ya había, con las categorías como entrada.
class CategoryGridComponent {
  constructor() {
    (0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, "categories", []);
  }
  trackByPath(_index, category) {
    return category.path;
  }
}
_CategoryGridComponent = CategoryGridComponent;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CategoryGridComponent, "\u0275fac", function CategoryGridComponent_Factory(t) {
  return new (t || _CategoryGridComponent)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CategoryGridComponent, "\u0275cmp", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
  type: _CategoryGridComponent,
  selectors: [["app-category-grid"]],
  inputs: {
    categories: "categories"
  },
  decls: 2,
  vars: 2,
  consts: [[1, "category-grid"], ["class", "category-card", 3, "routerLink", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "category-card", 3, "routerLink"], [1, "category-icon"], [3, "name"], [1, "category-name"], [1, "category-desc"], [1, "category-link"], ["name", "chevron-forward"]],
  template: function CategoryGridComponent_Template(rf, ctx) {
    if (rf & 1) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, CategoryGridComponent_a_1_Template, 10, 6, "a", 1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    }
    if (rf & 2) {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.categories)("ngForTrackBy", ctx.trackByPath);
    }
  },
  dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.IonIcon, _ionic_angular__WEBPACK_IMPORTED_MODULE_3__.RouterLinkWithHrefDelegate, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink],
  styles: ["@keyframes _ngcontent-%COMP%_tf-card-in {\n  from {\n    opacity: 0;\n    transform: translateY(6px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.category-grid[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--tf-space-4);\n  margin-bottom: var(--tf-space-6);\n}\n\n.category-card[_ngcontent-%COMP%] {\n  flex: 1 1 calc(33.333% - var(--tf-space-4) * 2 / 3);\n  min-width: 0;\n  display: flex;\n  flex-direction: column;\n  align-items: flex-start;\n  gap: 2px;\n  background: var(--tf-surface-1);\n  border: 1px solid var(--tf-border);\n  border-radius: var(--tf-radius-lg);\n  padding: var(--tf-space-5);\n  text-decoration: none;\n  transition: border-color var(--tf-duration-fast) var(--tf-ease-out), transform var(--tf-duration-fast) var(--tf-ease-out);\n  animation: _ngcontent-%COMP%_tf-card-in 320ms var(--tf-ease-out) backwards;\n}\n@media (prefers-reduced-motion: reduce) {\n  .category-card[_ngcontent-%COMP%] {\n    animation: none;\n  }\n}\n.category-card[_ngcontent-%COMP%]:nth-child(1) {\n  animation-delay: 0ms;\n}\n.category-card[_ngcontent-%COMP%]:nth-child(2) {\n  animation-delay: 35ms;\n}\n.category-card[_ngcontent-%COMP%]:nth-child(3) {\n  animation-delay: 70ms;\n}\n.category-card[_ngcontent-%COMP%]:nth-child(4) {\n  animation-delay: 105ms;\n}\n.category-card[_ngcontent-%COMP%]:nth-child(5) {\n  animation-delay: 140ms;\n}\n.category-card[_ngcontent-%COMP%]:nth-child(6) {\n  animation-delay: 175ms;\n}\n.category-card[_ngcontent-%COMP%]:nth-child(7) {\n  animation-delay: 210ms;\n}\n.category-card[_ngcontent-%COMP%]:nth-child(8) {\n  animation-delay: 245ms;\n}\n.category-card[_ngcontent-%COMP%]:nth-child(9) {\n  animation-delay: 280ms;\n}\n.category-card[_ngcontent-%COMP%]:nth-child(10) {\n  animation-delay: 315ms;\n}\n.category-card[_ngcontent-%COMP%]:nth-child(11) {\n  animation-delay: 350ms;\n}\n.category-card[_ngcontent-%COMP%]:nth-child(12) {\n  animation-delay: 385ms;\n}\n@media (max-width: 900px) {\n  .category-card[_ngcontent-%COMP%] {\n    flex-basis: calc(50% - var(--tf-space-4) / 2);\n  }\n}\n@media (max-width: 560px) {\n  .category-card[_ngcontent-%COMP%] {\n    flex-basis: 100%;\n  }\n}\n.category-card[_ngcontent-%COMP%]:hover {\n  border-color: var(--tf-border-strongest);\n}\n.category-card[_ngcontent-%COMP%]:active {\n  transform: scale(0.99);\n}\n.category-card[_ngcontent-%COMP%]:focus-visible {\n  outline: 2px solid var(--tf-accent);\n  outline-offset: 2px;\n}\n\n.category-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 40px;\n  height: 40px;\n  border-radius: var(--tf-radius-md);\n  color: var(--tf-accent-contrast);\n  margin-bottom: var(--tf-space-3);\n}\n.category-icon[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n}\n\n.category-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: var(--tf-font-size-md);\n  color: var(--tf-text);\n}\n\n.category-desc[_ngcontent-%COMP%] {\n  font-size: var(--tf-font-size-sm);\n  color: var(--tf-text-muted);\n  margin-bottom: var(--tf-space-4);\n}\n\n.category-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  font-size: var(--tf-font-size-sm);\n  font-weight: 600;\n  color: var(--tf-accent-text);\n}\n.category-link[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy90aGVtZS9fYW5pbWF0aW9ucy5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9zaGFyZWQvY29tcG9uZW50cy9jYXRlZ29yeS1ncmlkL2NhdGVnb3J5LWdyaWQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMkJBO0VBQ0U7SUFDRSxVQUFBO0lBQ0EsMEJBQUE7RUMxQkY7RUQ0QkE7SUFDRSxVQUFBO0lBQ0Esd0JBQUE7RUMxQkY7QUFDRjtBQVBBO0VBQ0UsYUFBQTtFQUNBLGVBQUE7RUFDQSxzQkFBQTtFQUNBLGdDQUFBO0FBU0Y7O0FBTkE7RUFLRSxtREFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSx1QkFBQTtFQUNBLFFBQUE7RUFDQSwrQkFBQTtFQUNBLGtDQUFBO0VBQ0Esa0NBQUE7RUFDQSwwQkFBQTtFQUNBLHFCQUFBO0VBQ0EseUhBQUE7RURuQkEsd0RBQUE7QUN5QkY7QUR2QkU7RUNDRjtJREFJLGVBQUE7RUMwQkY7QUFDRjtBRGZJO0VBQ0Usb0JBQUE7QUNpQk47QURsQkk7RUFDRSxxQkFBQTtBQ29CTjtBRHJCSTtFQUNFLHFCQUFBO0FDdUJOO0FEeEJJO0VBQ0Usc0JBQUE7QUMwQk47QUQzQkk7RUFDRSxzQkFBQTtBQzZCTjtBRDlCSTtFQUNFLHNCQUFBO0FDZ0NOO0FEakNJO0VBQ0Usc0JBQUE7QUNtQ047QURwQ0k7RUFDRSxzQkFBQTtBQ3NDTjtBRHZDSTtFQUNFLHNCQUFBO0FDeUNOO0FEMUNJO0VBQ0Usc0JBQUE7QUM0Q047QUQ3Q0k7RUFDRSxzQkFBQTtBQytDTjtBRGhESTtFQUNFLHNCQUFBO0FDa0ROO0FBM0NFO0VBcEJGO0lBcUJJLDZDQUFBO0VBOENGO0FBQ0Y7QUE1Q0U7RUF4QkY7SUF5QkksZ0JBQUE7RUErQ0Y7QUFDRjtBQTdDRTtFQUNFLHdDQUFBO0FBK0NKO0FBNUNFO0VBQ0Usc0JBQUE7QUE4Q0o7QUEzQ0U7RUFDRSxtQ0FBQTtFQUNBLG1CQUFBO0FBNkNKOztBQXpDQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxrQ0FBQTtFQUNBLGdDQUFBO0VBQ0EsZ0NBQUE7QUE0Q0Y7QUExQ0U7RUFDRSxlQUFBO0FBNENKOztBQXhDQTtFQUNFLGdCQUFBO0VBQ0EsaUNBQUE7RUFDQSxxQkFBQTtBQTJDRjs7QUF4Q0E7RUFDRSxpQ0FBQTtFQUNBLDJCQUFBO0VBQ0EsZ0NBQUE7QUEyQ0Y7O0FBeENBO0VBQ0Usb0JBQUE7RUFDQSxtQkFBQTtFQUNBLFFBQUE7RUFDQSxpQ0FBQTtFQUNBLGdCQUFBO0VBQ0EsNEJBQUE7QUEyQ0Y7QUF6Q0U7RUFDRSxlQUFBO0FBMkNKIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRW50cmFkYSBlc2NhbG9uYWRhIGRlIGxpc3Rhcy9ncmlkcyBkZSBjYXJkcyBhbCBjYXJnYXIgw6LCgMKUIG1pc21vIGJsb3F1ZVxuLy8gKGtleWZyYW1lICsgYW5pbWF0aW9uICsgZ3VhcmQgZGUgcHJlZmVycy1yZWR1Y2VkLW1vdGlvbikgcmVwZXRpZG8gYnl0ZSBhXG4vLyBieXRlIGVuIDkgcMODwqFnaW5hcyBhbnRlcyBkZSBlc3RhIGV4dHJhY2Npw4PCs24uIE1pc21vIGNyaXRlcmlvIHF1ZVxuLy8gX3NrZWxldG9uLnNjc3MvX2J1dHRvbnMuc2NzczogY2FkYSBww4PCoWdpbmEgYXBsaWNhIGVsIG1peGluIHNvYnJlIHN1IHByb3Bpb1xuLy8gc2VsZWN0b3IgeSBhw4PCsWFkZSBlbmNpbWEgc29sbyBsbyBxdWUgdmFyw4PCrWEgKHJhZGlvLCB0YW1hw4PCsW8uLi4pLlxuQG1peGluIHRmLWNhcmQtaW4tYW5pbWF0aW9uIHtcbiAgYW5pbWF0aW9uOiB0Zi1jYXJkLWluIDMyMG1zIHZhcigtLXRmLWVhc2Utb3V0KSBiYWNrd2FyZHM7XG5cbiAgQG1lZGlhIChwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpIHtcbiAgICBhbmltYXRpb246IG5vbmU7XG4gIH1cbn1cblxuLy8gVmFyaWFudGUgcGFyYSBsaXN0YXM6IGFkZW3Dg8KhcyBkZWwgZnVuZGlkbywgZXNjYWxvbmEgZWwgcmV0cmFzbyBkZSBjYWRhXG4vLyBlbGVtZW50byBwb3Igc3UgcG9zaWNpw4PCs24gKG50aC1jaGlsZCkuICRtYXgtaXRlbXMgYWNvdGEgZWwgYnVjbGUgYWwgbsOCwrpcbi8vIHJhem9uYWJsZSBkZSB0YXJqZXRhcyB2aXNpYmxlcyBwb3IgcMODwqFnaW5hIMOiwoDClCBubyB0aWVuZSBzZW50aWRvIGdlbmVyYXIgbcODwqFzXG4vLyByZWdsYXMgbnRoLWNoaWxkIHF1ZSBlbGVtZW50b3MgcHVlZGUgbGxlZ2FyIGEgaGFiZXIuXG5AbWl4aW4gdGYtY2FyZC1pbi1zdGFnZ2VyKCRtYXgtaXRlbXM6IDEyLCAkc3RlcDogMzVtcykge1xuICBAaW5jbHVkZSB0Zi1jYXJkLWluLWFuaW1hdGlvbjtcblxuICBAZm9yICRpIGZyb20gMSB0aHJvdWdoICRtYXgtaXRlbXMge1xuICAgICY6bnRoLWNoaWxkKCN7JGl9KSB7XG4gICAgICBhbmltYXRpb24tZGVsYXk6ICN7KCRpIC0gMSkgKiAkc3RlcH07XG4gICAgfVxuICB9XG59XG5cbkBrZXlmcmFtZXMgdGYtY2FyZC1pbiB7XG4gIGZyb20ge1xuICAgIG9wYWNpdHk6IDA7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDZweCk7XG4gIH1cbiAgdG8ge1xuICAgIG9wYWNpdHk6IDE7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG59XG4iLCJAaW1wb3J0ICcuLi8uLi8uLi8uLi90aGVtZS9hbmltYXRpb25zJztcblxuLmNhdGVnb3J5LWdyaWQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIGdhcDogdmFyKC0tdGYtc3BhY2UtNCk7XG4gIG1hcmdpbi1ib3R0b206IHZhcigtLXRmLXNwYWNlLTYpO1xufVxuXG4uY2F0ZWdvcnktY2FyZCB7XG4gIC8vIEZsZXggKG5vdCBncmlkKSBvbiBwdXJwb3NlOiB3aXRoIGEgZml4ZWQgMy1jb2x1bW4gZ3JpZCwgYW5cbiAgLy8gaXRlbSBsZWZ0IGFsb25lIG9uIHRoZSBsYXN0IHJvdyBzaXRzIGF0IDEvMyB3aWR0aCB3aXRoIGEgYmFyZSBnYXBcbiAgLy8gbmV4dCB0byBpdC4gZmxleC1ncm93IGxldHMgYSBkYW5nbGluZyBsYXN0LXJvdyBjYXJkIHN0cmV0Y2ggdG8gZmlsbFxuICAvLyB0aGUgcm93IGluc3RlYWQgb2YgbGVhdmluZyB0aGF0IGdhcC5cbiAgZmxleDogMSAxIGNhbGMoMzMuMzMzJSAtIHZhcigtLXRmLXNwYWNlLTQpICogMiAvIDMpO1xuICBtaW4td2lkdGg6IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBnYXA6IDJweDtcbiAgYmFja2dyb3VuZDogdmFyKC0tdGYtc3VyZmFjZS0xKTtcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tdGYtYm9yZGVyKTtcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tdGYtcmFkaXVzLWxnKTtcbiAgcGFkZGluZzogdmFyKC0tdGYtc3BhY2UtNSk7XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgdHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIHZhcigtLXRmLWR1cmF0aW9uLWZhc3QpIHZhcigtLXRmLWVhc2Utb3V0KSxcbiAgICB0cmFuc2Zvcm0gdmFyKC0tdGYtZHVyYXRpb24tZmFzdCkgdmFyKC0tdGYtZWFzZS1vdXQpO1xuICBAaW5jbHVkZSB0Zi1jYXJkLWluLXN0YWdnZXI7XG5cbiAgQG1lZGlhIChtYXgtd2lkdGg6IDkwMHB4KSB7XG4gICAgZmxleC1iYXNpczogY2FsYyg1MCUgLSB2YXIoLS10Zi1zcGFjZS00KSAvIDIpO1xuICB9XG5cbiAgQG1lZGlhIChtYXgtd2lkdGg6IDU2MHB4KSB7XG4gICAgZmxleC1iYXNpczogMTAwJTtcbiAgfVxuXG4gICY6aG92ZXIge1xuICAgIGJvcmRlci1jb2xvcjogdmFyKC0tdGYtYm9yZGVyLXN0cm9uZ2VzdCk7XG4gIH1cblxuICAmOmFjdGl2ZSB7XG4gICAgdHJhbnNmb3JtOiBzY2FsZSgwLjk5KTtcbiAgfVxuXG4gICY6Zm9jdXMtdmlzaWJsZSB7XG4gICAgb3V0bGluZTogMnB4IHNvbGlkIHZhcigtLXRmLWFjY2VudCk7XG4gICAgb3V0bGluZS1vZmZzZXQ6IDJweDtcbiAgfVxufVxuXG4uY2F0ZWdvcnktaWNvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB3aWR0aDogNDBweDtcbiAgaGVpZ2h0OiA0MHB4O1xuICBib3JkZXItcmFkaXVzOiB2YXIoLS10Zi1yYWRpdXMtbWQpO1xuICBjb2xvcjogdmFyKC0tdGYtYWNjZW50LWNvbnRyYXN0KTtcbiAgbWFyZ2luLWJvdHRvbTogdmFyKC0tdGYtc3BhY2UtMyk7XG5cbiAgaW9uLWljb24ge1xuICAgIGZvbnQtc2l6ZTogMjBweDtcbiAgfVxufVxuXG4uY2F0ZWdvcnktbmFtZSB7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLW1kKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQpO1xufVxuXG4uY2F0ZWdvcnktZGVzYyB7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcbiAgY29sb3I6IHZhcigtLXRmLXRleHQtbXV0ZWQpO1xuICBtYXJnaW4tYm90dG9tOiB2YXIoLS10Zi1zcGFjZS00KTtcbn1cblxuLmNhdGVnb3J5LWxpbmsge1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiA0cHg7XG4gIGZvbnQtc2l6ZTogdmFyKC0tdGYtZm9udC1zaXplLXNtKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgY29sb3I6IHZhcigtLXRmLWFjY2VudC10ZXh0KTtcblxuICBpb24taWNvbiB7XG4gICAgZm9udC1zaXplOiAxNHB4O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
}));


/***/ }),

/***/ 57818:
/*!*************************************************************************!*\
  !*** ./src/app/shared/components/category-grid/category-grid.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CategoryGridModule: () => (/* binding */ CategoryGridModule)
/* harmony export */ });
/* harmony import */ var _Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/@babel/runtime/helpers/esm/defineProperty.js */ 81696);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 64409);
/* harmony import */ var src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/shared/shared.module */ 46499);
/* harmony import */ var _category_grid_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./category-grid.component */ 32443);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 69717);

var _CategoryGridModule;




class CategoryGridModule {}
_CategoryGridModule = CategoryGridModule;
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CategoryGridModule, "\u0275fac", function CategoryGridModule_Factory(t) {
  return new (t || _CategoryGridModule)();
});
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CategoryGridModule, "\u0275mod", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({
  type: _CategoryGridModule
}));
(0,_Users_trainfit_Desktop_TrainFit_train_fit_front_node_modules_babel_runtime_helpers_esm_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__["default"])(CategoryGridModule, "\u0275inj", /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({
  imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule]
}));

(function () {
  (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](CategoryGridModule, {
    declarations: [_category_grid_component__WEBPACK_IMPORTED_MODULE_2__.CategoryGridComponent],
    imports: [src_app_shared_shared_module__WEBPACK_IMPORTED_MODULE_1__.SharedModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule],
    exports: [_category_grid_component__WEBPACK_IMPORTED_MODULE_2__.CategoryGridComponent]
  });
})();

/***/ })

}]);
//# sourceMappingURL=default-src_app_shared_components_category-grid_category-grid_module_ts.js.map