import {Component, OnInit} from '@angular/core';
import {PollFullDto} from "../../../core/models/poll-full-dto.model";
import {PollService} from "../../../core/services/poll.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {style} from "@angular/animations";


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
    this.hideButtons();
    this.hideElement("desktop-right-choice");
    this.showActionPanel("flex-end");
    this.countVotes();
    this.pollFullDto!.choices!.at(0)!.votes += 1;
    this.getPercentages(this.pollFullDto!);
  }

  voteOnRight() {
    this.hideButtons();
    this.hideElement("desktop-left-choice");
    this.showActionPanel("flex-start");
    this.countVotes();
    this.pollFullDto!.choices!.at(1)!.votes += 1;
    this.getPercentages(this.pollFullDto!);
  }

  voteAgain() {
    this.hideActionPanel();
    this.showButtons();
    this.resetVotes();
    this.showElement("desktop-left-choice");
    this.showElement("desktop-right-choice");
  }

  private countVotes() {
    let rightLevel = document.getElementById("right-level");
    let leftLevel = document.getElementById("left-level");
    leftLevel!.style.transitionDuration = "1s";
    rightLevel!.style.transitionDuration = "1s";
    leftLevel!.style.width = this.leftPercentage?.toPrecision(2) + "%";
    rightLevel!.style.width = this.rightPercentage?.toPrecision(2) + "%";
  }

  private resetVotes(){
    let rightLevel = document.getElementById("right-level");
    let leftLevel = document.getElementById("left-level");
    leftLevel!.style.transitionDuration = "0s";
    rightLevel!.style.transitionDuration = "0s";
    leftLevel!.style.width = "0";
    rightLevel!.style.width = "0";
  }

  private showActionPanel(orientation: string){
    let actionPanel = document.getElementById("action-panel");
    actionPanel!.style.justifyContent = orientation;
    actionPanel!.style.opacity = "1";
    actionPanel!.style.zIndex = "1";
  }

  private hideActionPanel(){
    let actionPanel = document.getElementById("action-panel");
    actionPanel!.style.opacity = "0";
    actionPanel!.style.zIndex = "-1";
  }

  private hideElement(id: string) {
    let poll = document.getElementById(id);
    poll!.style.transitionDuration = "0";
    poll!.style.opacity = "0";
    poll!.style.zIndex = "-1";
  }

  private showElement(id: string){
    let poll = document.getElementById(id);
    poll!.style.opacity = "1";
    poll!.style.zIndex = "2";
  }

  private hideButtons() {
    this.hideElement("desktop-left-poll-button");
    this.hideElement("desktop-right-poll-button")
  }

  private showButtons() {
    this.showElement("desktop-left-poll-button");
    this.showElement("desktop-right-poll-button");
  }
}
