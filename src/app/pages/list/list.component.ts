import {Component, OnInit} from '@angular/core';
import {PollDto} from "../../core/models/poll-dto.model";
import {PollService} from "../../core/services/poll.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {first} from "rxjs";
import {PollPageDto} from "../../core/models/poll-page-dto.model";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  pollPageDto: PollPageDto | undefined;
  base64 = 'data:image/png;base64,';
  title: string | undefined | null;
  category: string | undefined;
  page: number | undefined | null;

  constructor(
    private pollService: PollService,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.category = this.getCategory();
    this.title = this.getTitle();
    this.page = this.getPage();
    this.callPoll(this.category, this.page);
  }

  private loadAllPolls(page: number) {
    this.pollService.getAllPolls(page)
      .pipe(first())
      .subscribe({
        next: pollPageDto => {
          this.pollPageDto = pollPageDto;
        }
      })
  }

  private loadPollByCategory(category: string, page: number){
    this.pollService.getAllPollsByCategory(category, page)
      .pipe(first())
      .subscribe({
        next: pollPageDto => {
          this.pollPageDto = pollPageDto;
          console.log(this.pollPageDto);

        }
      })
  }

  openPoll(pollDto: PollDto) {
    location.replace('pages?pollId=' + pollDto.id);
  }

  private getCategory(): string {
    let category = this.route.snapshot.queryParamMap.get("category");
    if (category == null){
      return "";
    }
    return category;
  }

  private getTitle() {
    if (this.category == null || this.category == "") {
      return "todas as enquetes";
    }
    return this.category;
  }

  private getPage() {
    let page = this.route.snapshot.queryParamMap.get("page");
    if (page == null) {
      return 0;
    }
    return parseInt(page);
  }

  private callPoll(category: string, page: number) {
    if (category == ""){
      this.loadAllPolls(page);
    } else {
      this.loadPollByCategory(category, page);
    }
  }

  previous() {
    location.replace('pages/list?page=' + (parseInt(String(this.page!)) - 1));
  }

  next() {
    location.replace('pages/list?page=' + (parseInt(String(this.page!)) + 1));
  }
}
