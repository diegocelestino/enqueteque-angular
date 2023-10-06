import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

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
