import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationPage } from './configuration.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationPage,
  },
  {
    path: 'concepts',
    loadChildren: () =>
      import('./components/concepts/concepts.module').then(
        (m) => m.ConceptsPageModule
      ),
  },
  {
    path: 'suggestions',
    loadChildren: () =>
      import('./components/suggestions/suggestions.module').then(
        (m) => m.SuggestionsPageModule
      ),
  },
  {
    path: 'references',
    loadChildren: () =>
      import('./components/references/references.module').then(
        (m) => m.ReferencesPageModule
      ),
  },
  {
    path: 'tutorials',
    loadChildren: () =>
      import('./components/tutorials/tutorials.module').then(
        (m) => m.TutorialsPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationPageRoutingModule {}
