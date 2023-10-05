import {Component, OnInit} from '@angular/core';
import {PollService} from "../../../core/services/poll.service";
import {Router} from "@angular/router";
import {first} from "rxjs";
import {PollDto} from "../../../core/models/poll-dto.model";
import {Token} from "../../../core/models/token.model";

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})
export class OthersComponent implements OnInit{
  pollsDto: PollDto[] | undefined;
  base64 = 'data:image/png;base64,';


  constructor(
    private pollService: PollService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.loadPolls();
  }

  private loadPolls() {
    this.pollService.getOthersPolls()
      .pipe(first())
      .subscribe({
        next: pollsDto => {
          this.pollsDto = pollsDto;
        }
      })
  }

  openPoll(pollDto: PollDto) {
    location.replace('pages/' + pollDto.id);
  }
}
