import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuState: boolean = false;


  openMain(){
    location.replace("/pages");
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

  toggleMenu() {
    let mobileMenu = document.getElementById("mobile-menu");
    if(this.menuState){
      mobileMenu!.style.display = "none";
      this.menuState = false;
    } else {
      mobileMenu!.style.display = "flex";
      this.menuState = true;
    }
  }
}
