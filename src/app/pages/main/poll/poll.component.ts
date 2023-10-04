import {Component, OnInit} from '@angular/core';
import {PollFullDto} from "../../../core/models/poll-full-dto.model";
import {PollService} from "../../../core/services/poll.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {PollAnimationService} from "../../../core/services/poll-animation.service";
import {VoteService} from "../../../core/services/vote.service";


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
    private voteService: VoteService,
    private route: ActivatedRoute,
    private router: Router,
    private pollAnimation: PollAnimationService,
  ) {

    this.pollId = this.route.snapshot.paramMap.get('pollId')!;
  }

  ngOnInit(): void {
    this.loadPoll(this.pollId);
  }

  private loadPoll(pollId: string) {
    this.pollService.loadPoll(pollId)
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
    let leftVotes = pollFullDto!.choices!.at(0)!.votes;
    let rightVotes = pollFullDto!.choices!.at(1)!.votes;
    let totalVotes = leftVotes + rightVotes;
    this.leftPercentage = 100 * leftVotes / totalVotes;
    this.rightPercentage = 100 * rightVotes / totalVotes;
  }

  private getImages(pollFullDto: PollFullDto) {
    this.leftImage = 'data:image/png;base64,' + pollFullDto?.choices?.at(0)!.image;
    this.rightImage = 'data:image/png;base64,' + pollFullDto?.choices?.at(1)!.image;
  }

  voteOnLeft() {
    this.pollAnimation.hideButtons("desktop-left-poll-button", "desktop-right-poll-button");
    this.pollAnimation.hideElement("desktop-right-choice");
    this.pollAnimation.showActionPanel("flex-end");
    this.pollAnimation.emphasizeImage("left");
    this.pollAnimation.hideMobile();
    this.pollAnimation.disableVoting();
    this.pollAnimation.countVotes(this.leftPercentage!, this.rightPercentage!);
    this.pollFullDto!.choices!.at(0)!.votes += 1;
    this.getPercentages(this.pollFullDto!);
    this.postVote(this.pollFullDto!.choices!.at(0)!.id!);
  }

  voteOnRight() {
    this.pollAnimation.hideButtons("desktop-left-poll-button", "desktop-right-poll-button");
    this.pollAnimation.hideElement("desktop-left-choice");
    this.pollAnimation.showActionPanel("flex-start");
    this.pollAnimation.emphasizeImage("right");
    this.pollAnimation.hideMobile();
    this.pollAnimation.disableVoting();
    this.pollAnimation.countVotes(this.leftPercentage!, this.rightPercentage!);
    this.pollFullDto!.choices!.at(1)!.votes += 1;
    this.getPercentages(this.pollFullDto!);
    this.postVote(this.pollFullDto!.choices!.at(1)!.id!);
  }

  voteAgain() {
    this.pollAnimation.hideElement("action-panel");
    this.pollAnimation.showMobile();
    this.pollAnimation.restartMobileLevels();
    this.pollAnimation.restartImages();
    this.pollAnimation.showButtons();
    this.pollAnimation.resetVotes();
    this.pollAnimation.showElement("desktop-left-choice");
    this.pollAnimation.showElement("desktop-right-choice");
    this.pollAnimation.enableVoting();
  }

  private postVote(choiceId: string) {
    this.voteService.postVote(choiceId)
      .pipe(first())
      .subscribe();
  }
}
