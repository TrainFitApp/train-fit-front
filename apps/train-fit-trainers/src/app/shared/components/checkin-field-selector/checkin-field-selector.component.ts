import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CHECKIN_FIELDS, CheckinField, CheckinFieldGroup } from 'src/app/core/constants/checkin-fields';

const GROUP_LABELS: Record<CheckinFieldGroup, string> = {
  composicion_corporal: 'Composición corporal',
  perimetros: 'Perímetros',
  bienestar: 'Bienestar',
  fotos: 'Fotos de progreso',
};

const GROUP_ICONS: Record<CheckinFieldGroup, string> = {
  composicion_corporal: 'body-outline',
  perimetros: 'resize-outline',
  bienestar: 'heart-outline',
  fotos: 'camera-outline',
};

const GROUP_ORDER: CheckinFieldGroup[] = ['composicion_corporal', 'perimetros', 'bienestar', 'fotos'];

/**
 * Elegir qué campos entran en un check-in (traído de la rama resumen-checkins,
 * donde es la superficie única de las pantallas que eligen campos).
 *
 * Dos cosas que este catálogo necesita:
 *
 * 1. PLEGARSE. Son 36 campos (5 + 18 + 13). Desplegados de golpe, llegar a
 *    "Tus propias preguntas" o al botón de guardar era un scroll larguísimo
 *    dentro de un panel de 480px.
 * 2. VERSE LO ELEGIDO. Con 18 perímetros en dos columnas, saber qué había
 *    puesto exigía recorrerlos uno a uno.
 *
 * La cabecera de cada sección es a la vez su interruptor y su resumen:
 * recuento y barra de relleno siguen a la vista con la sección cerrada.
 *
 * `required` es opcional: enlazado, cada campo activo muestra su interruptor
 * "Obligatorio" (plantillas); sin enlazar, el selector solo elige campos.
 */
@Component({
  selector: 'app-checkin-field-selector',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './checkin-field-selector.component.html',
  styleUrls: ['./checkin-field-selector.component.scss'],
})
export class CheckinFieldSelectorComponent implements OnChanges, OnInit {
  @Input() selected: string[] = [];
  @Output() selectedChange = new EventEmitter<string[]>();
  // Obligatorios: siempre subconjunto de `selected` (desactivar un campo lo
  // saca también de aquí, ver toggle).
  @Input() required: string[] | null = null;
  @Output() requiredChange = new EventEmitter<string[]>();

  public readonly groups: { key: CheckinFieldGroup; label: string; icon: string; fields: CheckinField[] }[] =
    GROUP_ORDER.map((key) => ({
      key,
      label: GROUP_LABELS[key],
      icon: GROUP_ICONS[key],
      fields: CHECKIN_FIELDS.filter((f) => f.group === key),
    }));

  public readonly totalFields = CHECKIN_FIELDS.length;

  /**
   * Recuentos y porcentajes por grupo, y qué secciones están abiertas.
   *
   * PRECALCULADOS, nunca getters llamados desde la plantilla: un getter que
   * devuelve un objeto o un array nuevo cambia de identidad en cada ciclo de
   * detección de cambios, Angular recrea el subárbol entero —con sus
   * ion-icon— y realimenta el ciclo hasta congelar la pantalla.
   */
  public counts: Record<string, number> = {};
  public pcts: Record<string, number> = {};
  public openGroups: Record<string, boolean> = {};

  private defaultsApplied = false;

  // Red de seguridad para un uso sin enlazar [selected]: ngOnChanges no se
  // dispara y las secciones se quedarían todas cerradas y sin recuento.
  public ngOnInit(): void {
    if (this.defaultsApplied) return;
    this.recount();
    this.applyDefaultOpenState();
    this.defaultsApplied = true;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes['selected']) return;
    this.recount();
    if (!this.defaultsApplied) {
      this.applyDefaultOpenState();
      this.defaultsApplied = true;
    }
  }

  /**
   * Al abrir: desplegadas las secciones que ya tienen algo (editando una
   * plantilla, eso es lo que se viene a revisar) y, si no hay nada elegido
   * todavía, solo la primera — empezar con las tres abiertas era volver al
   * muro de 36 campos.
   */
  private applyDefaultOpenState(): void {
    const withFields = this.groups.filter((g) => this.counts[g.key] > 0);
    const toOpen = withFields.length ? withFields : this.groups.slice(0, 1);
    this.groups.forEach((g) => (this.openGroups[g.key] = toOpen.includes(g)));
  }

  private recount(): void {
    for (const group of this.groups) {
      const count = group.fields.filter((f) => this.selected.includes(f.key)).length;
      this.counts[group.key] = count;
      this.pcts[group.key] = group.fields.length ? Math.round((count / group.fields.length) * 100) : 0;
    }
  }

  public toggleGroup(key: CheckinFieldGroup): void {
    this.openGroups[key] = !this.openGroups[key];
  }

  public isEnabled(key: string): boolean {
    return this.selected.includes(key);
  }

  public isRequired(key: string): boolean {
    return !!this.required?.includes(key);
  }

  public toggle(key: string): void {
    if (this.isEnabled(key)) {
      this.selectedChange.emit(this.selected.filter((k) => k !== key));
      // Un obligatorio apagado no existe.
      if (this.isRequired(key)) this.requiredChange.emit(this.required!.filter((k) => k !== key));
    } else {
      this.selectedChange.emit([...this.selected, key]);
    }
  }

  public toggleRequired(key: string): void {
    if (!this.required || !this.isEnabled(key)) return;
    this.requiredChange.emit(
      this.isRequired(key) ? this.required.filter((k) => k !== key) : [...this.required, key]
    );
  }

  // En una escala, los extremos (fijan la dirección); en una medida, cómo
  // tomarla — un perímetro de cintura medido un día por el ombligo y otro por
  // la parte más estrecha da una "variación" de 4 cm que no ha ocurrido.
  public fieldDetail(field: CheckinField): string {
    if (field.anchors?.length) {
      const first = field.anchors[0];
      const last = field.anchors[field.anchors.length - 1];
      return `1 = ${first} · ${field.anchors.length} = ${last}`;
    }
    return field.hint || '';
  }

  public trackByFieldKey(_index: number, field: CheckinField): string {
    return field.key;
  }

  public trackByGroupKey(_index: number, group: { key: CheckinFieldGroup }): string {
    return group.key;
  }
}
