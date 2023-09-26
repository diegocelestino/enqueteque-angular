import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriesComponent} from "./categories/categories.component";
import {MainComponent} from "./main/main.component";
import {ListComponent} from "./list/list.component";
import {CreateComponent} from "./create/create.component";
import {SuggestionComponent} from "./suggestion/suggestion.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'list', component: ListComponent },
  { path: 'create', component: CreateComponent},
  { path: 'suggestion', component: SuggestionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
