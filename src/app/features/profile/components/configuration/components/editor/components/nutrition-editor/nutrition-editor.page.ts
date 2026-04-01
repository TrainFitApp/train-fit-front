import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import {
  ModalController,
  ToastOptions,
  AlertController,
  Platform,
  IonContent,
} from '@ionic/angular';
import { UserService } from 'src/app/core/services/user/user.service';
import { User } from 'src/app/core/models/user';
import { IonicUtilService } from 'src/app/core/services/util/ionic-util.service';
import { NavigationService } from 'src/app/core/services/util/navigation.service';
import { Subscription } from 'rxjs';
import { AdMobService } from 'src/app/core/services/util/ad-mob.service';

@Component({
  selector: 'app-nutrition-editor',
  templateUrl: './nutrition-editor.page.html',
  styleUrls: ['./nutrition-editor.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NutritionEditorPage implements OnInit {
  @ViewChild(IonContent, { static: false }) content: IonContent;

  public user: User;
  public Math = Math; // Hacer Math disponible en el template

  // Estado principal
  public state = {
    mode: 'g', // 'g' o '%'
    kcalPerG: { p: 4, c: 4, f: 9 },
    lock: { p: false, c: false, f: false, calories: false },
    grams: { p: 0, c: 0, f: 0 },
    pct: { p: 0, c: 0, f: 0 },
    targetKcal: 2000,
    updating: false,
    syncKcal: false,
  };

  // Estado original para detectar cambios
  // Estado original del usuario para restaurar en caso de cancelar
  private originalUser: User;

  private originalState: {
    targetKcal: number;
    grams: { p: number; c: number; f: number };
  } = {
    targetKcal: 2000,
    grams: { p: 0, c: 0, f: 0 },
  };

  constructor(
    private navigationService: NavigationService,
    private userService: UserService,
    private ionicUtilService: IonicUtilService,
    private platform: Platform,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private adMobService: AdMobService
  ) {}

  ngOnInit() {
    this.init();
  }

  // ---------- Utilidades ----------
  public round1(x: number): number {
    return Math.round((+x + Number.EPSILON) * 10) / 10;
  }

  private clamp(x: number, a: number, b: number): number {
    return Math.min(b, Math.max(a, +x || 0));
  }

  private kcalFromGrams(): number {
    return Math.round(
      this.state.grams.p * this.state.kcalPerG.p +
        this.state.grams.c * this.state.kcalPerG.c +
        this.state.grams.f * this.state.kcalPerG.f
    );
  }

  private gramsFromPct(pct: number, kcalPerG: number): number {
    return this.state.targetKcal > 0
      ? Math.round(((pct / 100) * this.state.targetKcal) / kcalPerG)
      : 0;
  }

  private pctFromGrams(g: number, kcalPerG: number): number {
    return this.state.targetKcal > 0
      ? this.round1(((g * kcalPerG) / this.state.targetKcal) * 100)
      : 0;
  }

  // ---------- Inicialización ----------
  private init(): void {
    // Obtener usuario actual
    this.user = this.userService.getLocalUser;

    // Pre-llenar con datos actuales del usuario si existen
    if (this.user) {
      if (this.user.kcalTotal) {
        this.state.targetKcal = Math.round(this.user.kcalTotal);
      }
      if (this.user.proteinsGTotal) {
        this.state.grams.p = Math.round(this.user.proteinsGTotal);
      }
      if (this.user.carbohydratesGTotal) {
        this.state.grams.c = Math.round(this.user.carbohydratesGTotal);
      }
      if (this.user.fatGTotal) {
        this.state.grams.f = Math.round(this.user.fatGTotal);
      }

      // Calcular porcentajes basados en los gramos actuales
      if (this.state.targetKcal > 0) {
        this.state.pct.p = this.pctFromGrams(
          this.state.grams.p,
          this.state.kcalPerG.p
        );
        this.state.pct.c = this.pctFromGrams(
          this.state.grams.c,
          this.state.kcalPerG.c
        );
        this.state.pct.f = this.pctFromGrams(
          this.state.grams.f,
          this.state.kcalPerG.f
        );
      }
    }

    // Configurar valores iniciales en los inputs
    const targetKcalInput = document.getElementById(
      'targetKcal'
    ) as HTMLInputElement;
    const pInput = document.getElementById('pInput') as HTMLInputElement;
    const cInput = document.getElementById('cInput') as HTMLInputElement;
    const fInput = document.getElementById('fInput') as HTMLInputElement;

    if (targetKcalInput)
      targetKcalInput.value = this.state.targetKcal.toString();
    if (pInput) pInput.value = this.state.grams.p.toString();
    if (cInput) cInput.value = this.state.grams.c.toString();
    if (fInput) fInput.value = this.state.grams.f.toString();

    this.updateKcalConstants();
    this.render();

    // Guardar estado original después de la inicialización
    this.saveOriginalState();
  }

  private saveOriginalState(): void {
    // Guardar estado de la interfaz
    this.originalState = {
      targetKcal: this.state.targetKcal,
      grams: {
        p: this.state.grams.p,
        c: this.state.grams.c,
        f: this.state.grams.f,
      },
    };

    // Guardar estado original del usuario (copia profunda)
    this.originalUser = JSON.parse(JSON.stringify(this.user));
  }

  private hasUnsavedChanges(): boolean {
    const hasChanges =
      this.originalState.targetKcal !== this.state.targetKcal ||
      this.originalState.grams.p !== this.state.grams.p ||
      this.originalState.grams.c !== this.state.grams.c ||
      this.originalState.grams.f !== this.state.grams.f;

    console.log('Checking for unsaved changes:', {
      hasChanges,
      original: this.originalState,
      current: {
        targetKcal: this.state.targetKcal,
        grams: this.state.grams,
      },
    });

    return hasChanges;
  }

  private restoreOriginalState(): void {
    console.log('Restoring original state:', this.originalState);

    // Restaurar valores del estado de la interfaz
    this.state.targetKcal = this.originalState.targetKcal;
    this.state.grams.p = this.originalState.grams.p;
    this.state.grams.c = this.originalState.grams.c;
    this.state.grams.f = this.originalState.grams.f;

    // Recalcular porcentajes basados en los valores restaurados
    if (this.state.targetKcal > 0) {
      this.state.pct.p = this.pctFromGrams(
        this.state.grams.p,
        this.state.kcalPerG.p
      );
      this.state.pct.c = this.pctFromGrams(
        this.state.grams.c,
        this.state.kcalPerG.c
      );
      this.state.pct.f = this.pctFromGrams(
        this.state.grams.f,
        this.state.kcalPerG.f
      );
    }

    // IMPORTANTE: Restaurar el usuario original completo en el servicio
    // Esto evita que los cambios se propaguen a otros componentes
    if (this.originalUser) {
      this.userService.setLocalUser = JSON.parse(
        JSON.stringify(this.originalUser)
      );
      this.user = this.userService.getLocalUser;
    }

    // Actualizar los inputs del DOM con los valores restaurados
    const targetKcalInput = document.getElementById(
      'targetKcal'
    ) as HTMLInputElement;
    const pInput = document.getElementById('pInput') as HTMLInputElement;
    const cInput = document.getElementById('cInput') as HTMLInputElement;
    const fInput = document.getElementById('fInput') as HTMLInputElement;

    if (targetKcalInput)
      targetKcalInput.value = this.state.targetKcal.toString();
    if (pInput) pInput.value = this.state.grams.p.toString();
    if (cInput) cInput.value = this.state.grams.c.toString();
    if (fInput) fInput.value = this.state.grams.f.toString();

    // Re-renderizar la interfaz
    this.updateKcalConstants();
    this.render();

    console.log('State and user restored successfully');
  }

  // ---------- Manejo de eventos ----------
  public onTargetKcalChange(event: any): void {
    if (this.state.updating) return; // Prevent loop

    this.state.targetKcal = this.clamp(event.target.value, 0, 100000);

    // Al cambiar calorías, siempre queremos escalar los gramos manteniendo la distribución (%)
    // Esto evita que la barra se "rompa" (supere 100%)

    // Recalcular gramos basados en los porcentajes actuales y las nuevas calorías
    this.state.grams.p = this.gramsFromPct(
      this.state.pct.p,
      this.state.kcalPerG.p
    );
    this.state.grams.c = this.gramsFromPct(
      this.state.pct.c,
      this.state.kcalPerG.c
    );
    this.state.grams.f = this.gramsFromPct(
      this.state.pct.f,
      this.state.kcalPerG.f
    );

    this.syncInputsFromState();
    this.render();
  }

  public onSyncKcalChange(event: any): void {
    this.state.syncKcal = event.target.checked;
    if (this.state.syncKcal) {
      this.state.targetKcal = this.kcalFromGrams();
      const targetKcalInput = document.getElementById(
        'targetKcal'
      ) as HTMLInputElement;
      if (targetKcalInput)
        targetKcalInput.value = this.state.targetKcal.toString();
    }
    this.render();
  }

  public onMacroInput(key: 'p' | 'c' | 'f', event: any): void {
    if (this.state.updating) return;
    const val = this.clamp(event.target.value, 0, 10000);

    // Actualizar gramos
    this.state.grams[key] = val;
    this.state.pct[key] = this.pctFromGrams(val, this.state.kcalPerG[key]);

    // Si syncKcal está activado, actualizar calorías objetivo
    if (this.state.syncKcal) {
      this.state.targetKcal = this.kcalFromGrams();
    }

    // Redistribuir automáticamente si hay macros desbloqueados
    const sum = this.state.pct.p + this.state.pct.c + this.state.pct.f;
    if (sum > 100.0) {
      const others = (['p', 'c', 'f'] as const).filter(
        (k) => k !== key && !this.state.lock[k]
      );
      if (others.length) {
        const excess = sum - 100.0;
        const share = excess / others.length;
        others.forEach((k) => {
          this.state.pct[k] = this.clamp(this.state.pct[k] - share, 0, 100);
          this.state.grams[k] = this.gramsFromPct(
            this.state.pct[k],
            this.state.kcalPerG[k]
          );
        });
      }
    }

    this.syncInputsFromState();
    this.render();
  }

  // ---------- Modo ----------
  public setMode(mode: 'g' | '%'): void {
    if (this.state.mode === mode) return;
    this.state.mode = mode;

    const modeGrams = document.getElementById('modeGrams');
    const modePercent = document.getElementById('modePercent');

    document
      .querySelectorAll('.segmented button')
      .forEach((b) => b.classList.remove('active'));
    if (mode === 'g' && modeGrams) {
      modeGrams.classList.add('active');
    } else if (mode === '%' && modePercent) {
      modePercent.classList.add('active');
    }

    this.syncInputsFromState();
    this.render();
  }

  // ---------- Bloqueos ----------
  public toggleLock(key: 'p' | 'c' | 'f'): void {
    this.state.lock[key] = !this.state.lock[key];
    const elementMap = { p: 'lockP', c: 'lockC', f: 'lockF' };
    const el = document.getElementById(elementMap[key]);
    const icon = el?.querySelector('i');

    if (icon) {
      icon.className = this.state.lock[key] ? 'fa fa-lock' : 'fa fa-unlock';
    }
    if (el) {
      el.classList.toggle('active', this.state.lock[key]);
    }

    // Si se desbloquea un macro, redistribuir automáticamente
    if (!this.state.lock[key]) {
      this.redistributeMacros();
    }

    this.render();
  }

  public toggleCaloriesLock(): void {
    this.state.lock.calories = !this.state.lock.calories;
  }

  public onPercentInput(key: 'p' | 'c' | 'f', event: any): void {
    if (this.state.updating) return;
    const val = this.clamp(event.target.value, 0, 100);

    this.state.pct[key] = val;
    this.state.grams[key] = this.gramsFromPct(
      this.state.pct[key],
      this.state.kcalPerG[key]
    );

    if (this.state.syncKcal) {
      this.state.targetKcal = this.kcalFromGrams();
    }

    // Redistribuir automáticamente si hay macros desbloqueados
    const sum = this.state.pct.p + this.state.pct.c + this.state.pct.f;
    if (sum > 100.0) {
      const others = (['p', 'c', 'f'] as const).filter(
        (k) => k !== key && !this.state.lock[k]
      );
      if (others.length) {
        const excess = sum - 100.0;
        const share = excess / others.length;
        others.forEach((k) => {
          this.state.pct[k] = this.clamp(this.state.pct[k] - share, 0, 100);
          this.state.grams[k] = this.gramsFromPct(
            this.state.pct[k],
            this.state.kcalPerG[k]
          );
        });
      }
    }

    this.syncInputsFromState();
    this.render();
  }

  // ---------- Unified Slider Logic ----------
  public activeDragHandle: 'h1' | 'h2' | null = null;
  @ViewChild('sliderContainer') sliderContainer: ElementRef;

  public startDrag(handle: 'h1' | 'h2', event: any): void {
    // If it's a PointerEvent, use pointer capture for better mobile reliability
    if (event.setPointerCapture && event.pointerId !== undefined) {
      (event.target as HTMLElement).setPointerCapture(event.pointerId);
    }

    // Check locks
    if (this.state.lock.p && handle === 'h1') return;
    if (this.state.lock.f && handle === 'h2') return;

    this.activeDragHandle = handle;
    this.state.updating = true;

    // Pre-cache elements to avoid repetitive DOM lookups during drag
    this.cachedElements = {
      pG: document.getElementById('proteinGramsInput') as HTMLInputElement,
      pP: document.getElementById('proteinPercentInput') as HTMLInputElement,
      cG: document.getElementById('carbsGramsInput') as HTMLInputElement,
      cP: document.getElementById('carbsPercentInput') as HTMLInputElement,
      fG: document.getElementById('fatGramsInput') as HTMLInputElement,
      fP: document.getElementById('fatPercentInput') as HTMLInputElement,
      kcal: document.getElementById('caloriesInput') as HTMLInputElement,
      kcalTotal: document.getElementById('totalKcalFromMacros'),
      // Segmentos del slider para actualización manual
      segP: document.querySelector('.segment-p') as HTMLElement,
      segC: document.querySelector('.segment-c') as HTMLElement,
      segF: document.querySelector('.segment-f') as HTMLElement,
      handle1: document.querySelector('.handle-1') as HTMLElement,
      handle2: document.querySelector('.handle-2') as HTMLElement,
      labelP: document.getElementById('labelP'),
      labelC: document.getElementById('labelC'),
      labelF: document.getElementById('labelF'),
    };

    // Run outside Angular to avoid heavy Change Detection on every move
    this.ngZone.runOutsideAngular(() => {
      document.addEventListener('pointermove', this.onDragMove);
      document.addEventListener('pointerup', this.onDragEnd);
      document.addEventListener('pointercancel', this.onDragEnd);
      document.addEventListener('touchmove', this.onDragMove, {
        passive: false,
      });
      document.addEventListener('touchend', this.onDragEnd);
    });
  }

  private animationFrameId: number | null = null;
  private cachedElements: any = {};

  // Arrow function to preserve 'this' context in event listeners
  private onDragMove = (event: any): void => {
    if (!this.activeDragHandle || !this.sliderContainer) return;

    if (event.cancelable) {
      event.preventDefault(); // Prevent scrolling
    }

    // Throttling with requestAnimationFrame for smooth 60fps performance
    if (this.animationFrameId) return;

    this.animationFrameId = requestAnimationFrame(() => {
      this.animationFrameId = null;
      if (!this.activeDragHandle) return;

      const container = this.sliderContainer.nativeElement as HTMLElement;
      const rect = container.getBoundingClientRect();

      let clientX: number;
      if (event.touches && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
      } else {
        clientX = event.clientX;
      }

      let percentage = ((clientX - rect.left) / rect.width) * 100;
      percentage = this.clamp(percentage, 0, 100);

      // Logic based on which handle is dragged
      if (this.activeDragHandle === 'h1') {
        let newP = percentage;
        let newC = this.state.pct.c;
        let newF = this.state.pct.f;

        if (this.state.lock.c) {
          if (newP + this.state.pct.c > 100) newP = 100 - this.state.pct.c;
          newC = this.state.pct.c;
          newF = 100 - newP - newC;
        } else {
          const currentH2Pos = this.state.pct.p + this.state.pct.c;
          if (newP > currentH2Pos) {
            if (this.state.lock.f) {
              newP = currentH2Pos;
            } else {
              newP = percentage;
              newC = 0;
              newF = 100 - newP;
            }
          } else {
            newP = percentage;
            newC = currentH2Pos - newP;
            newF = 100 - newP - newC;
          }
        }
        this.updateMacrosFromSlider(newP, newC, newF);
      } else if (this.activeDragHandle === 'h2') {
        let h2Pos = percentage;
        let newP = this.state.pct.p;
        let newC = this.state.pct.c;
        let newF = 100 - h2Pos;

        if (h2Pos < newP) {
          if (this.state.lock.p) {
            h2Pos = newP;
          } else {
            newP = h2Pos;
            newC = 0;
          }
        } else {
          if (this.state.lock.c) {
            newP = h2Pos - this.state.pct.c;
            newC = this.state.pct.c;
            if (newP < 0) {
              newP = 0;
              h2Pos = newP + newC;
            }
          } else {
            newC = h2Pos - newP;
          }
        }
        newF = 100 - newP - newC;
        this.updateMacrosFromSlider(newP, newC, newF);
      }
    });
  };

  private onDragEnd = (event?: any): void => {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }

    if (this.activeDragHandle) {
      // Return to Angular zone to sync state and trigger one final Change Detection
      this.ngZone.run(() => {
        this.activeDragHandle = null;
        this.state.updating = false;
        this.cdr.detectChanges();
      });
    }

    if (event && event.releasePointerCapture && event.pointerId !== undefined) {
      try {
        (event.target as HTMLElement).releasePointerCapture(event.pointerId);
      } catch (e) {}
    }

    document.removeEventListener('pointermove', this.onDragMove);
    document.removeEventListener('pointerup', this.onDragEnd);
    document.removeEventListener('pointercancel', this.onDragEnd);
    document.removeEventListener('touchmove', this.onDragMove);
    document.removeEventListener('touchend', this.onDragEnd);
  };

  public onTrackPointerDown(event: any): void {
    if (!this.sliderContainer) return;

    const container = this.sliderContainer.nativeElement as HTMLElement;
    const rect = container.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;

    // Find nearest handle position
    const h1Pos = this.state.pct.p;
    const h2Pos = this.state.pct.p + this.state.pct.c;

    const d1 = Math.abs(x - h1Pos);
    const d2 = Math.abs(x - h2Pos);

    const handle = d1 < d2 ? 'h1' : 'h2';

    // Start drag
    this.startDrag(handle, event);
    // Force first update
    this.onDragMove(event);
  }

  private updateMacrosFromSlider(p: number, c: number, f: number): void {
    // Round to 1 decimal to avoid float jitter execution
    p = this.round1(p);
    c = this.round1(c);
    f = this.round1(100 - p - c);

    // Update state properties (outside Angular, so NO full Change Detection runs)
    this.state.pct.p = p;
    this.state.pct.c = c;
    this.state.pct.f = f;

    this.state.grams.p = this.gramsFromPct(p, this.state.kcalPerG.p);
    this.state.grams.c = this.gramsFromPct(c, this.state.kcalPerG.c);
    this.state.grams.f = this.gramsFromPct(f, this.state.kcalPerG.f);

    if (this.state.syncKcal) {
      this.state.targetKcal = this.kcalFromGrams();
    }

    // MANUAL UI UPDATE - Extremely fast, bypasses Angular
    this.manualUIUpdate();
  }

  private manualUIUpdate(): void {
    const {
      pG,
      pP,
      cG,
      cP,
      fG,
      fP,
      kcal,
      kcalTotal,
      segP,
      segC,
      segF,
      handle1,
      handle2,
      labelP,
      labelC,
      labelF,
    } = this.cachedElements;
    const p = this.state.pct.p;
    const c = this.state.pct.c;
    const f = this.state.pct.f;

    // Actualizar Inputs - Gramos ahora sin decimales (Enteros puros)
    if (pG) pG.value = Math.round(this.state.grams.p).toString();
    if (pP) pP.value = p.toFixed(1);
    if (cG) cG.value = Math.round(this.state.grams.c).toString();
    if (cP) cP.value = c.toFixed(1);
    if (fG) fG.value = Math.round(this.state.grams.f).toString();
    if (fP) fP.value = f.toFixed(1);
    if (kcal) kcal.value = this.state.targetKcal.toString();
    if (kcalTotal)
      kcalTotal.textContent = this.getTotalKcalFromMacros().toString();

    // Actualizar Slider Bar (Segments)
    if (segP) segP.style.width = p + '%';
    if (segC) {
      segC.style.left = p + '%';
      segC.style.width = c + '%';
    }
    if (segF) {
      segF.style.left = p + c + '%';
      segF.style.width = f + '%';
    }

    // Actualizar Labels dentro de la barra
    if (labelP) {
      labelP.textContent = p.toFixed(1) + '%';
      labelP.style.display = p > 8 ? 'block' : 'none';
    }
    if (labelC) {
      labelC.textContent = c.toFixed(1) + '%';
      labelC.style.display = c > 8 ? 'block' : 'none';
    }
    if (labelF) {
      labelF.textContent = f.toFixed(1) + '%';
      labelF.style.display = f > 8 ? 'block' : 'none';
    }

    // Actualizar Handles
    if (handle1) handle1.style.left = p + '%';
    if (handle2) handle2.style.left = p + c + '%';
  }

  // Obsolete event, replaced by unified slider
  public onSliderInput(key: 'p' | 'c' | 'f', event: any): void {
    // No-op
  }

  // ---------- Presets ----------
  public applyPreset(p: number, c: number, f: number): void {
    this.setMode('%');
    this.state.pct = { p, c, f };
    this.state.grams.p = this.gramsFromPct(p, this.state.kcalPerG.p);
    this.state.grams.c = this.gramsFromPct(c, this.state.kcalPerG.c);
    this.state.grams.f = this.gramsFromPct(f, this.state.kcalPerG.f);

    const syncKcal = document.getElementById('syncKcal') as HTMLInputElement;
    if (syncKcal?.checked) {
      this.state.targetKcal = this.kcalFromGrams();
    }

    this.syncInputsFromState();
    this.render();
  }

  public applyKgPreset(p: number, c: number, f: number): void {
    const pPerKg = document.getElementById('pPerKg') as HTMLInputElement;
    const cPerKg = document.getElementById('cPerKg') as HTMLInputElement;
    const fPerKg = document.getElementById('fPerKg') as HTMLInputElement;

    if (pPerKg) pPerKg.value = p.toString();
    if (cPerKg) cPerKg.value = c.toString();
    if (fPerKg) fPerKg.value = f.toString();

    this.applyKg();
  }

  public applyKg(): void {
    const weightKg = document.getElementById('weightKg') as HTMLInputElement;
    const pPerKg = document.getElementById('pPerKg') as HTMLInputElement;
    const cPerKg = document.getElementById('cPerKg') as HTMLInputElement;
    const fPerKg = document.getElementById('fPerKg') as HTMLInputElement;

    const w = +(weightKg?.value || 0);
    if (w <= 0) return;

    const p = +(pPerKg?.value || 0);
    const c = +(cPerKg?.value || 0);
    const f = +(fPerKg?.value || 0);

    this.setMode('g');
    this.state.grams.p = this.round1(p * w);
    this.state.grams.c = this.round1(c * w);
    this.state.grams.f = this.round1(f * w);
    this.state.pct.p = this.pctFromGrams(
      this.state.grams.p,
      this.state.kcalPerG.p
    );
    this.state.pct.c = this.pctFromGrams(
      this.state.grams.c,
      this.state.kcalPerG.c
    );
    this.state.pct.f = this.pctFromGrams(
      this.state.grams.f,
      this.state.kcalPerG.f
    );

    const syncKcal = document.getElementById('syncKcal') as HTMLInputElement;
    if (syncKcal?.checked) {
      this.state.targetKcal = this.kcalFromGrams();
    }

    this.syncInputsFromState();
    this.render();
  }

  // ---------- Actualización de UI ----------
  private updateKcalConstants(): void {
    const pKcalPerG = document.getElementById('pKcalPerG');
    const cKcalPerG = document.getElementById('cKcalPerG');
    const fKcalPerG = document.getElementById('fKcalPerG');

    if (pKcalPerG) pKcalPerG.textContent = this.state.kcalPerG.p.toString();
    if (cKcalPerG) cKcalPerG.textContent = this.state.kcalPerG.c.toString();
    if (fKcalPerG) fKcalPerG.textContent = this.state.kcalPerG.f.toString();

    // Recalcular con nuevas constantes
    if (this.state.mode === 'g') {
      this.state.pct.p = this.pctFromGrams(
        this.state.grams.p,
        this.state.kcalPerG.p
      );
      this.state.pct.c = this.pctFromGrams(
        this.state.grams.c,
        this.state.kcalPerG.c
      );
      this.state.pct.f = this.pctFromGrams(
        this.state.grams.f,
        this.state.kcalPerG.f
      );
    } else {
      this.state.grams.p = this.gramsFromPct(
        this.state.pct.p,
        this.state.kcalPerG.p
      );
      this.state.grams.c = this.gramsFromPct(
        this.state.pct.c,
        this.state.kcalPerG.c
      );
      this.state.grams.f = this.gramsFromPct(
        this.state.pct.f,
        this.state.kcalPerG.f
      );
    }
    this.syncInputsFromState();
    this.render();
  }

  private syncInputsFromState(): void {
    // Only used for initialization or major state changes, not during drag
    const pG = document.getElementById('proteinGramsInput') as HTMLInputElement;
    const pP = document.getElementById(
      'proteinPercentInput'
    ) as HTMLInputElement;
    const cG = document.getElementById('carbsGramsInput') as HTMLInputElement;
    const cP = document.getElementById('carbsPercentInput') as HTMLInputElement;
    const fG = document.getElementById('fatGramsInput') as HTMLInputElement;
    const fP = document.getElementById('fatPercentInput') as HTMLInputElement;
    const kcal = document.getElementById('caloriesInput') as HTMLInputElement;

    if (pG) pG.value = this.state.grams.p.toFixed(0);
    if (pP) pP.value = this.state.pct.p.toFixed(1);
    if (cG) cG.value = this.state.grams.c.toFixed(0);
    if (cP) cP.value = this.state.pct.c.toFixed(1);
    if (fG) fG.value = this.state.grams.f.toFixed(0);
    if (fP) fP.value = this.state.pct.f.toFixed(1);
    if (kcal) kcal.value = this.state.targetKcal.toString();
  }

  private infoLine(k: 'p' | 'c' | 'f'): string {
    const g = this.state.grams[k] || 0;
    const pct = this.state.pct[k] || 0;
    const kcal = this.round1(g * this.state.kcalPerG[k]);
    const nameMap = { p: 'Proteínas', c: 'Carbohidratos', f: 'Grasas' };
    return `<b>${g || 0} g</b> • <b>${kcal} kcal</b> • <b>${pct || 0}%</b>`;
  }

  private render(): void {
    // Round factors for display
    const totalKcal = this.kcalFromGrams();
    const totalKcalElement = document.getElementById('totalKcalFromMacros');
    if (totalKcalElement) {
      totalKcalElement.textContent = totalKcal.toString();
    }
  }

  // ---------- Guardar ----------
  public async save(): Promise<void> {
    if (!this.isValidConfiguration()) {
      console.warn('Configuración inválida, no se puede guardar');

      // Mostrar toast informativo
      const toast: ToastOptions = {
        message:
          'Por favor, ajusta los macronutrientes para que coincidan con el objetivo calórico',
        duration: 3000,
        color: 'warning',
      };
      await this.ionicUtilService.showToast(toast);

      // Hacer scroll a la sección de resumen
      const summarySection = document.querySelector('.summary-section');
      if (summarySection && this.content) {
        // Obtener la posición del elemento
        const yOffset =
          summarySection.getBoundingClientRect().top + window.pageYOffset - 100;
        this.content.scrollToPoint(0, yOffset, 500);
      }

      return;
    }

    // Estrategia de Monetización: Rewarded Ad para guardar cambios maestros
    const alertOptions = {
      header: 'Guardar Configuración',
      message: 'Visualiza un breve anuncio para aplicar y guardar tus nuevos objetivos nutricionales.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Ver Anuncio y Guardar',
          cssClass: 'alert-button-success',
          handler: () => {
            this.adMobService.interstitial('save_nutrition')
              .then(() => {
                this.executeSave();
              })
              .catch((err) => {
                console.error('Error AdMob Interstitial:', err);
                this.executeSave();
              });
          }
        }
      ]
    };

    await this.ionicUtilService.showAlert(alertOptions);
  }

  private executeSave(): void {
    // Actualizar el usuario actual con los nuevos valores
    if (this.user) {
      this.user.kcalTotal = Math.round(this.state.targetKcal);
      this.user.proteinsGTotal = Math.round(this.state.grams.p);
      this.user.carbohydratesGTotal = Math.round(this.state.grams.c);
      this.user.fatGTotal = Math.round(this.state.grams.f);

      // Persistir los cambios en el servidor
      this.userService.updateUser(this.user).subscribe({
        next: (updatedUser) => {
          console.log('Configuración nutricional guardada en servidor:', {
            kcalTotal: updatedUser.kcalTotal,
            proteinsGTotal: updatedUser.proteinsGTotal,
            carbohydratesGTotal: updatedUser.carbohydratesGTotal,
            fatGTotal: updatedUser.fatGTotal,
          });

          // IMPORTANTE: Actualizar el usuario local con el usuario del servidor
          // Esto propagará los cambios a todos los componentes que usan signals
          this.userService.setLocalUser = updatedUser;
          this.user = updatedUser;

          // Mostrar toast de confirmación
          const toast: ToastOptions = {
            message: 'Objetivos nutricionales guardados',
            duration: 2000,
          };
          this.ionicUtilService.showToast(toast);

          // Actualizar estado original después de guardar exitosamente
          this.saveOriginalState();

          // Cerrar el modal después de guardar exitosamente
          setTimeout(() => {
            this.ionicUtilService.closeModal();
          }, 100);
        },
        error: (error) => {
          console.error('Error al guardar configuración nutricional:', error);

          // Mostrar toast de error
          const errorToast: ToastOptions = {
            message: 'Error al guardar. Cambios guardados localmente.',
            duration: 3000,
          };
          this.ionicUtilService.showToast(errorToast);

          // Aún así actualizar localmente como fallback
          this.userService.setLocalUser = this.user;

          // Actualizar estado original después de guardar localmente
          this.saveOriginalState();

          // Cerrar el modal incluso si hay error (los cambios se guardaron localmente)
          setTimeout(() => {
            this.ionicUtilService.closeModal();
          }, 100);
        },
      });
    }
  }

  public isValidConfiguration(): boolean {
    const totalKcalFromMacros = this.kcalFromGrams();
    const delta = Math.abs(totalKcalFromMacros - this.state.targetKcal);
    return delta <= 25; // Margen de error de 25 kcal
  }

  // Métodos para el resumen detallado
  public getTotalKcalFromMacros(): number {
    return Math.round(this.kcalFromGrams());
  }

  public getKcalDifference(): number {
    return Math.round(this.getTotalKcalFromMacros() - this.state.targetKcal);
  }

  public getKcalByMacro(key: string): number {
    const macroKey = key as 'p' | 'c' | 'f';
    return Math.round(
      this.state.grams[macroKey] * this.state.kcalPerG[macroKey]
    );
  }

  public hasKcalExcess(): boolean {
    return this.getKcalDifference() > 10; // Tolerancia de 10 kcal
  }

  public getPercentageSum(): number {
    return this.round1(this.state.pct.p + this.state.pct.c + this.state.pct.f);
  }

  public hasPercentageExcess(): boolean {
    return this.getPercentageSum() > 100.1; // Tolerancia de 0.1%
  }

  public getMacroName(key: string): string {
    const names = { p: 'Proteínas', c: 'CBH', f: 'Grasas' };
    const macroKey = key as 'p' | 'c' | 'f';
    return names[macroKey];
  }

  public getMacroColor(key: string): string {
    const colors = {
      p: 'var(--protein-color)',
      c: 'var(--carbs-color)',
      f: 'var(--fat-color)',
    };
    const macroKey = key as 'p' | 'c' | 'f';
    return colors[macroKey];
  }

  private redistributeMacros(): void {
    // Redistribuir porcentajes para que sumen 100% entre macros no bloqueados
    const totalPct = this.state.pct.p + this.state.pct.c + this.state.pct.f;

    if (totalPct === 100) {
      // Ya suman 100%, no hay nada que redistribuir
      return;
    }

    // Obtener macros no bloqueados
    const unlocked = (['p', 'c', 'f'] as const).filter(
      (k) => !this.state.lock[k]
    );

    if (unlocked.length === 0) {
      // Todos están bloqueados, no se puede redistribuir
      return;
    }

    if (unlocked.length === 1) {
      // Solo uno desbloqueado, ajustar para que la suma sea 100%
      const key = unlocked[0];
      const lockedSum = (['p', 'c', 'f'] as const)
        .filter((k) => k !== key && this.state.lock[k])
        .reduce((sum, k) => sum + this.state.pct[k], 0);

      this.state.pct[key] = Math.max(0, Math.min(100, 100 - lockedSum));
      this.state.grams[key] = this.gramsFromPct(
        this.state.pct[key],
        this.state.kcalPerG[key]
      );
    } else {
      // Múltiples desbloqueados, redistribuir proporcionalmente
      const lockedSum = (['p', 'c', 'f'] as const)
        .filter((k) => this.state.lock[k])
        .reduce((sum, k) => sum + this.state.pct[k], 0);

      const availableForUnlocked = Math.max(0, 100 - lockedSum);
      const currentUnlockedSum = unlocked.reduce(
        (sum, k) => sum + this.state.pct[k],
        0
      );

      if (currentUnlockedSum > 0) {
        // Redistribuir proporcionalmente
        unlocked.forEach((k) => {
          const proportion = this.state.pct[k] / currentUnlockedSum;
          this.state.pct[k] = this.round1(availableForUnlocked * proportion);
          this.state.grams[k] = this.gramsFromPct(
            this.state.pct[k],
            this.state.kcalPerG[k]
          );
        });
      } else {
        // Distribuir equitativamente
        const equalShare = availableForUnlocked / unlocked.length;
        unlocked.forEach((k) => {
          this.state.pct[k] = this.round1(equalShare);
          this.state.grams[k] = this.gramsFromPct(
            this.state.pct[k],
            this.state.kcalPerG[k]
          );
        });
      }
    }

    // Sincronizar inputs y actualizar vista
    this.syncInputsFromState();
  }

  public recalculateMacros(): void {
    if (this.state.targetKcal <= 0) {
      console.warn('No se puede recalcular sin un objetivo de kcal válido');
      return;
    }

    // Obtener proporciones actuales
    const currentTotalKcal = this.kcalFromGrams();
    if (currentTotalKcal <= 0) {
      // Si no hay macros definidos, usar proporciones equilibradas por defecto
      this.applyPreset(30, 40, 30);
      return;
    }

    // Calcular proporciones actuales
    const pKcal = this.state.grams.p * this.state.kcalPerG.p;
    const cKcal = this.state.grams.c * this.state.kcalPerG.c;
    const fKcal = this.state.grams.f * this.state.kcalPerG.f;

    const pProportion = pKcal / currentTotalKcal;
    const cProportion = cKcal / currentTotalKcal;
    const fProportion = fKcal / currentTotalKcal;

    // Aplicar proporciones al nuevo objetivo
    const newPKcal = this.state.targetKcal * pProportion;
    const newCKcal = this.state.targetKcal * cProportion;
    const newFKcal = this.state.targetKcal * fProportion;

    // Convertir a gramos
    this.state.grams.p = this.round1(newPKcal / this.state.kcalPerG.p);
    this.state.grams.c = this.round1(newCKcal / this.state.kcalPerG.c);
    this.state.grams.f = this.round1(newFKcal / this.state.kcalPerG.f);

    // Actualizar porcentajes
    this.state.pct.p = this.round1(pProportion * 100);
    this.state.pct.c = this.round1(cProportion * 100);
    this.state.pct.f = this.round1(fProportion * 100);

    console.log('Macros recalculados manteniendo proporciones:', {
      proportions: { p: pProportion, c: cProportion, f: fProportion },
      newGrams: this.state.grams,
      newPercentages: this.state.pct,
    });

    this.render();
  }

  // ---------- Métodos de cálculo automático ----------
  public autoCalculate(): void {
    this.setFinalObjetive();
    setTimeout(() => {
      // Crear un objeto con los datos del usuario actualizados
      const userForm = {
        ...this.user,
        objetive: this.objetiveFinal,
        kcalTotal: this.state.targetKcal,
        proteinsGTotal: this.state.grams.p,
        carbohydratesGTotal: this.state.grams.c,
        fatGTotal: this.state.grams.f,
      };

      // Recalcular macros y calorías usando el servicio
      const updatedUser = this.userService.setUserMacrosAndKcal(userForm);
      Object.assign(this.user, updatedUser);

      // Actualizar el estado local con los nuevos valores calculados
      this.calculate();
    });
  }

  private setFinalObjetive(): void {
    // Determinar el tipo de objetivo basado en el valor actual del usuario
    let objetiveType: string;
    if (this.user.objetive > 0) {
      objetiveType = 'gain';
    } else if (this.user.objetive < 0) {
      objetiveType = 'loss';
    } else {
      objetiveType = 'maintenance';
    }

    const objetiveValue = Math.abs(this.user.objetive);

    if (objetiveType === 'loss') {
      this.objetiveFinal = -Math.abs(objetiveValue);
    } else if (objetiveType === 'gain') {
      this.objetiveFinal = Math.abs(objetiveValue);
    } else {
      this.objetiveFinal = 0;
    }
  }

  public calculate(): void {
    // Actualizar el estado con los valores recalculados del usuario
    this.state.targetKcal = Math.round(this.user.kcalTotal);
    this.state.grams.p = Math.round(this.user.proteinsGTotal);
    this.state.grams.c = Math.round(this.user.carbohydratesGTotal);
    this.state.grams.f = Math.round(this.user.fatGTotal);

    // Recalcular porcentajes
    if (this.state.targetKcal > 0) {
      this.state.pct.p = this.pctFromGrams(
        this.state.grams.p,
        this.state.kcalPerG.p
      );
      this.state.pct.c = this.pctFromGrams(
        this.state.grams.c,
        this.state.kcalPerG.c
      );
      this.state.pct.f = this.pctFromGrams(
        this.state.grams.f,
        this.state.kcalPerG.f
      );
    }

    // Actualizar la interfaz
    this.syncInputsFromState();
    this.render();
  }

  // Propiedad para almacenar el objetivo final calculado
  public objetiveFinal: number = 0;

  async closeModal() {
    console.log('closeModal() called');

    if (this.hasUnsavedChanges()) {
      console.log('Has unsaved changes, showing confirmation modal');
      const alertOptions = {
        header: 'Cambios sin guardar',
        message: '¿Estás seguro de que quieres salir sin guardar los cambios?',
        cssClass: 'alert-grid-buttons',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
          },
          {
            text: 'Guardar',
            handler: async () => {
              // Llamar a save() y esperar a que complete
              await this.save();
              // Solo cerrar si la validación pasó
              // Si save() retorna early por validación, no se cerrará
            },
          },
          {
            text: 'No guardar',
            role: 'destructive',
            handler: () => {
              this.restoreOriginalState();
              this.ionicUtilService.closeModal();
            },
          },
        ],
      };
      await this.ionicUtilService.showAlert(alertOptions);
    } else {
      console.log('No unsaved changes, closing modal directly');
      this.ionicUtilService.closeModal();
    }
  }
}
