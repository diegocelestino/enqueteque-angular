import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriesComponent} from "./categories/categories.component";
import {MainComponent} from "./main/main.component";
import {ListComponent} from "./list/list.component";
import {CreateComponent} from "./create/create.component";
import {SuggestionComponent} from "./suggestion/suggestion.component";
import {LoginComponent} from "./login/login.component";
import {AdminListComponent} from "./admin-list/admin-list.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'list', component: ListComponent },
  { path: 'login', component:LoginComponent},
  { path: 'suggestion', component: SuggestionComponent},
  { path: 'admin/create', component: CreateComponent},
  { path: 'admin/polls', component: AdminListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
