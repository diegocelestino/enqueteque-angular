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
  pollId: string;
  leftPercentage: number | undefined;
  rightPercentage: number | undefined;
  leftImage: string | undefined;
  rightImage: string | undefined;

  constructor(
    private pollService: PollService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.pollId = '';
  }

  ngOnInit(): void {
    this.loadPoll(this.pollId);
  }

  private loadPoll(pollId: string) {
    this.pollService.getLatestPoll(pollId)
      .pipe(first())
      .subscribe({
        next: pollFullDto => {
          this.pollFullDto = pollFullDto;
          this.getPercentages(pollFullDto);
          this.getImages(pollFullDto);
        }
      })
  }

  private getPercentages(pollFullDto: PollFullDto): void{
    let leftVotes = Number(pollFullDto!.choices!.at(0)!.votes);
    let rightVotes = Number(pollFullDto!.choices!.at(1)!.votes);
    let totalVotes = leftVotes + rightVotes;
    this.leftPercentage = 100 * leftVotes / totalVotes;
    this.rightPercentage = 100 * rightVotes / totalVotes;
  }


  private getImages(pollFullDto: PollFullDto) {
    this.leftImage = 'data:image/png;base64,' + pollFullDto?.choices?.at(0)!.image;
    this.rightImage = 'data:image/png;base64,' + pollFullDto?.choices?.at(1)!.image;
  }
}
