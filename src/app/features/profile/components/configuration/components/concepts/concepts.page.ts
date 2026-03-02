import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UtilService } from 'src/app/core/services/util/util.service';
import { CONCEPTS, CONCEPT_TYPES, CONCEPT_VALUES } from './constants/concepts';
import { NavigationService } from 'src/app/core/services/util/navigation.service';

@Component({
  selector: 'app-concepts',
  templateUrl: './concepts.page.html',
  styleUrls: ['./concepts.page.scss'],
})
export class ConceptsPage {
  public search: string;
  public CONCEPT_VALUES = [...CONCEPT_VALUES];
  public CONCEPT_TYPES = CONCEPT_TYPES;

  constructor(
    public navigationService: NavigationService,
    private readonly utilService: UtilService
  ) {
    this.getConceptsOrderedAlphabetically();
  }

  public closeModal(): void {
    this.navigationService.goBack();
  }

  private getConceptsOrderedAlphabetically(): void {
    this.CONCEPT_VALUES.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }

  public searchConcepts(event: Event): void {
    this.search = this.utilService.getEventString(event);

    // Función para eliminar tildes de una cadena de texto
    const removeAccents = (str) => {
      return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    };

    this.CONCEPT_VALUES = CONCEPTS.filter((concept) => {
      const nameMatch = removeAccents(concept.name.toLowerCase()).includes(
        removeAccents(this.search.toLowerCase())
      );
      const descriptionMatch = removeAccents(
        concept.description.toLowerCase()
      ).includes(removeAccents(this.search.toLowerCase()));

      return nameMatch || descriptionMatch;
    });
  }
}
