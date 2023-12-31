import {Component, OnInit} from '@angular/core';
import {PollFullDto} from "../../../core/models/poll-full-dto.model";
import {PollService} from "../../../core/services/poll.service";
import {ActivatedRoute} from "@angular/router";
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
  pollId: string | null;
  leftPercentage: number | undefined;
  rightPercentage: number | undefined;
  leftImage: string | undefined;
  rightImage: string | undefined;

  constructor(
    private pollService: PollService,
    private voteService: VoteService,
    private route: ActivatedRoute,
    private pollAnimation: PollAnimationService,
  ) {

    this.pollId = this.route.snapshot.queryParamMap.get("pollId");
  }

  ngOnInit(): void {
    this.loadPoll(this.pollId);
    this.rightPercentage = 0;
    this.leftPercentage = 0;
  }

  private loadPoll(pollId: string | null) {
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

  private postVote(choiceId: string) {
    this.voteService.postVote(choiceId)
      .pipe(first())
      .subscribe();
  }

  private getPercentages(pollFullDto: PollFullDto): void{
    let leftVotes = pollFullDto!.choices!.at(0)!.votes;
    let rightVotes = pollFullDto!.choices!.at(1)!.votes;
    let totalVotes = leftVotes + rightVotes;
    if (leftVotes != 0){
      this.leftPercentage = 100 * leftVotes / totalVotes;
    }
    if (rightVotes != 0){
      this.rightPercentage = 100 * rightVotes / totalVotes;
    }
  }

  private getImages(pollFullDto: PollFullDto) {
    this.leftImage = 'data:image/png;base64,' + pollFullDto?.choices?.at(0)!.image;
    this.rightImage = 'data:image/png;base64,' + pollFullDto?.choices?.at(1)!.image;
  }

  voteOnLeft() {
    this.pollFullDto!.choices!.at(0)!.votes += 1;
    this.getPercentages(this.pollFullDto!);
    this.pollAnimation.hideButtons("desktop-left-poll-button", "desktop-right-poll-button");
    this.pollAnimation.hideElement("desktop-right-choice");
    this.pollAnimation.showActionPanel("flex-end");
    this.pollAnimation.emphasizeImage("left");
    this.pollAnimation.hideMobile();
    this.pollAnimation.disableVoting();
    this.pollAnimation.countVotes(this.leftPercentage!, this.rightPercentage!);
    this.postVote(this.pollFullDto!.choices!.at(0)!.id!);
  }

  voteOnRight() {
    this.pollFullDto!.choices!.at(1)!.votes += 1;
    this.getPercentages(this.pollFullDto!);
    this.pollAnimation.hideButtons("desktop-left-poll-button", "desktop-right-poll-button");
    this.pollAnimation.hideElement("desktop-left-choice");
    this.pollAnimation.showActionPanel("flex-start");
    this.pollAnimation.emphasizeImage("right");
    this.pollAnimation.hideMobile();
    this.pollAnimation.disableVoting();
    this.pollAnimation.countVotes(this.leftPercentage!, this.rightPercentage!);
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


}
