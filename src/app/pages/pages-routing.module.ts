import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriesComponent} from "./categories/categories.component";
import {MainComponent} from "./main/main.component";
import {ListComponent} from "./list/list.component";
import {AdminCreateComponent} from "./admin-create/admin-create.component";
import {SuggestionComponent} from "./suggestion/suggestion.component";
import {LoginComponent} from "./login/login.component";
import {AdminListComponent} from "./admin-list/admin-list.component";
import {AdminEditComponent} from "./admin-edit/admin-edit.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'list', component: ListComponent },
  { path: 'login', component:LoginComponent},
  { path: 'suggestion', component: SuggestionComponent},
  { path: 'admin/create', component: AdminCreateComponent},
  { path: 'admin/polls', component: AdminListComponent},
  { path: 'admin/edit/:pollId', component: AdminEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
