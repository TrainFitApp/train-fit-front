import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from 'src/app/core/services/util/util.service';
import { CONCEPTS, CONCEPT_TYPES, CONCEPT_VALUES, Concept } from './constants/concepts';
import { NavigationService } from 'src/app/core/services/util/navigation.service';

export interface ConceptGroup {
  letter: string;
  items: Concept[];
}

function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[̀-ͯ]/g, '');
}

@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.page.html',
  styleUrls: ['./concepts.page.scss'],
})
export class ConceptsPage {
  public search: string;
  public CONCEPT_VALUES = [...CONCEPT_VALUES];
  public CONCEPT_TYPES = CONCEPT_TYPES;
  public groups: ConceptGroup[] = [];

  constructor(
    public navigationService: NavigationService,
    private readonly utilService: UtilService,
    private readonly translate: TranslateService,
  ) {
    this.sortConceptsAlphabetically(this.CONCEPT_VALUES);
    this.buildGroups();
  }

  public closeModal(): void {
    this.navigationService.goBack();
  }

  public getTypeLabel(type: string): string {
    if (type === CONCEPT_TYPES.nutrition) return this.translate.instant('CONCEPTS.NUTRITION');
    if (type === CONCEPT_TYPES.training) return this.translate.instant('CONCEPTS.TRAINING');
    return this.translate.instant('CONCEPTS.GENERAL');
  }

  public trackByLetter(_index: number, group: ConceptGroup): string {
    return group.letter;
  }

  public trackByKey(_index: number, concept: Concept): string {
    return concept.key;
  }

  private sortConceptsAlphabetically(concepts: Concept[]): void {
    concepts.sort((a, b) => a.name.localeCompare(b.name));
  }

  private buildGroups(): void {
    const map = new Map<string, Concept[]>();
    for (const concept of this.CONCEPT_VALUES) {
      const letter = removeAccents(concept.name.charAt(0).toUpperCase());
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter).push(concept);
    }
    this.groups = Array.from(map.entries()).map(([letter, items]) => ({ letter, items }));
  }

  public searchConcepts(event: Event): void {
    this.search = this.utilService.getEventString(event);
    const query = removeAccents(this.search.toLowerCase());

    this.CONCEPT_VALUES = CONCEPTS.filter((concept) => {
      const nameMatch = removeAccents(concept.name.toLowerCase()).includes(query);
      const descriptionMatch = removeAccents(concept.description.toLowerCase()).includes(query);

      return nameMatch || descriptionMatch;
    });

    this.sortConceptsAlphabetically(this.CONCEPT_VALUES);
    this.buildGroups();
  }
}
