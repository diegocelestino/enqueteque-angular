import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { MainComponent } from './main/main.component';
import { PollComponent } from './main/poll/poll.component';
import { OthersComponent } from './main/others/others.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    MainComponent,
    PollComponent,
    OthersComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
