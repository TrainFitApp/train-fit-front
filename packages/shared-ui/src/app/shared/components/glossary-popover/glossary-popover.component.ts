import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export type GlossaryTermKey =
  | 'RIR'
  | 'MICROCYCLE'
  | 'ONE_RM'
  | 'BEST_SET'
  | 'EFFECTIVE_VOLUME'
  | 'SETS_COMPARISON'
  | 'PINNED_NOTE'
  | 'SET_OBJECTIVE'
  | 'SESSION_ACTIVITY';

// Movimiento 2 Coach Pro — un nivel concreto de una escala, con su
// significado escrito. Ver el comentario de `levels` más abajo.
export interface GlossaryLevel {
  value: string;
  text: string;
}

@Component({
  selector: 'app-glossary-popover',
  templateUrl: './glossary-popover.component.html',
  styleUrls: ['./glossary-popover.component.scss'],
})
export class GlossaryPopoverComponent implements OnInit {
  @Input() public term: GlossaryTermKey;

  /**
   * Movimiento 2 Coach Pro — la escala nivel a nivel.
   *
   * "RIR: cuántas repeticiones más podrías hacer" explica el CONCEPTO, pero
   * no resuelve la duda real de quien está a mitad de una serie: si esto es
   * un 2 o un 3. Eso solo lo resuelve tener escrito qué se siente en cada
   * nivel — que es lo mismo que hacen las anclas de los check-ins.
   *
   * Opcional: solo RIR tiene escala hoy. Un término sin LEVELS en su fichero
   * de traducción sigue mostrando su título y su descripción como siempre,
   * sin hueco vacío ni la clave en crudo (ver la comprobación de Array).
   */
  public levels: GlossaryLevel[] = [];

  constructor(private translate: TranslateService) {}

  public ngOnInit(): void {
    // ngx-translate devuelve la CLAVE tal cual cuando no existe, así que no
    // basta con comprobar que hay valor: hay que comprobar que es la lista
    // que esperamos. Sin esto, un término sin escala pintaría
    // "GLOSSARY.MICROCYCLE.LEVELS" como si fuera contenido.
    const value = this.translate.instant(`GLOSSARY.${this.term}.LEVELS`);
    this.levels = Array.isArray(value)
      ? value.filter((level) => level && level.value !== undefined && level.text)
      : [];
  }
}
