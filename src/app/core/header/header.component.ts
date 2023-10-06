import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  openMain(){
    location.replace("");
  }
  openCategories(){
    location.replace("/pages/categories");
  }

  seeAll(){
    location.replace("/pages/list");
  }

  openSuggestions(){
    location.replace("/pages/suggestion")
  }
}
