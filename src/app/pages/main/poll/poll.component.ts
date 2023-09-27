import {Component, OnInit} from '@angular/core';
import {PollFullDto} from "../../../core/models/poll-full-dto.model";
import {PollService} from "../../../core/services/poll.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";


@Component({
  selector: 'app-poll',
  templateUrl: './poll.component.html',
  styleUrls: ['./poll.component.css']
})
export class PollComponent implements OnInit {
  pollFullDto: PollFullDto | undefined;
  pollId: string | undefined;

  constructor(
    private pollService: PollService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.pollId = '';
  }

  ngOnInit(): void {
    this.getPoll(this.pollId);
  }

  private getPoll(pollId: string | undefined) {
    this.pollService.getLatestPoll(pollId)
      .pipe(first())
      .subscribe({
        next: pollFullDto => {
          this.pollFullDto = pollFullDto;
          console.log(this.pollFullDto);
        }
      })
  }
}
