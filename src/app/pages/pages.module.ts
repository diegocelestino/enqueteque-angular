import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { MainComponent } from './main/main.component';
import { PollComponent } from './main/poll/poll.component';
import { OthersComponent } from './main/others/others.component';
import {ListComponent} from "./list/list.component";
import {CreateComponent} from "./create/create.component";
import {SuggestionComponent} from "./suggestion/suggestion.component";
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    MainComponent,
    PollComponent,
    OthersComponent,
    ListComponent,
    CreateComponent,
    SuggestionComponent,
    LoginComponent,
  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        NgOptimizedImage
    ]
})
export class PagesModule { }
