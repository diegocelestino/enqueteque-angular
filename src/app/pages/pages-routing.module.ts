import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriesComponent} from "./categories/categories.component";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'categories', component: CategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
