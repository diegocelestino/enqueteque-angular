import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MainPageComponent } from './main-page/main-page.component';
import { PollComponent } from './main-page/poll/poll.component';
import { OthersComponent } from './main-page/others/others.component';
import { ListComponent } from './list/list.component';
import { CategoriesComponent } from './categories/categories.component';
import { SugestionComponent } from './sugestion/sugestion.component';
import { SuggestionComponent } from './suggestion/suggestion.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainPageComponent,
    PollComponent,
    OthersComponent,
    ListComponent,
    CategoriesComponent,
    SugestionComponent,
    SuggestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
