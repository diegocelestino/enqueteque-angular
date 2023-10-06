import { Component } from '@angular/core';
import {PollService} from "../../core/services/poll.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-categories2',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: string[] | undefined;

  constructor(
    private pollService: PollService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories() {
    this.pollService.loadCategories()
      .pipe(first())
      .subscribe({
        next: categories => {
          this.categories = categories;
        }
      })
  }

  openCategories(category: string) {
    location.replace("/pages/list?category=" + category)
  }
}
