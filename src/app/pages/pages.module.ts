import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { MainComponent } from './main/main.component';
import { PollComponent } from './main/poll/poll.component';
import { OthersComponent } from './main/others/others.component';
import {ListComponent} from "./list/list.component";
import {CreateComponent} from "./create/create.component";
import {SuggestionComponent} from "./suggestion/suggestion.component";


@NgModule({
  declarations: [
    CategoriesComponent,
    MainComponent,
    PollComponent,
    OthersComponent,
    ListComponent,
    CreateComponent,
    SuggestionComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
