import {Component, OnInit} from '@angular/core';
import {PollFullDto} from "../../../core/models/poll-full-dto.model";
import {PollService} from "../../../core/services/poll.service";
import {ActivatedRoute, Router} from "@angular/router";
import {first} from "rxjs";
import {style} from "@angular/animations";
import {PollAnimationService} from "../../../core/services/poll-animation.service";


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
    private pollAnimation: PollAnimationService,
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
    this.hideButtons("desktop-left-poll-button", "desktop-right-poll-button");
    this.hideElement("desktop-right-choice");
    this.showActionPanel("flex-end");
    this.emphasizeImage("left");

    this.hideMobile();

    this.disableVoting();

    this.countVotes();
    this.pollFullDto!.choices!.at(0)!.votes += 1;
    this.getPercentages(this.pollFullDto!);
  }

  voteOnRight() {
    this.hideButtons("desktop-left-poll-button", "desktop-right-poll-button");
    this.hideElement("desktop-left-choice");
    this.showActionPanel("flex-start");
    this.emphasizeImage("right");

    this.hideMobile();

    this.countVotes();
    this.pollFullDto!.choices!.at(1)!.votes += 1;
    this.getPercentages(this.pollFullDto!);
  }

  voteAgain() {
    this.hideElement("action-panel");
    this.showMobile();
    this.restartMobileLevels();
    this.restartImages();
    this.showButtons();
    this.resetVotes();
    this.showElement("desktop-left-choice");
    this.showElement("desktop-right-choice");
    this.enableVoting();
  }

  private countVotes() {
    let rightLevel = document.getElementById("right-level");
    let leftLevel = document.getElementById("left-level");
    let mobileRightLevel = document.getElementById("mobile-right-level");
    let mobileLeftLevel = document.getElementById("mobile-left-level");
    leftLevel!.style.transitionDuration = "1s";
    rightLevel!.style.transitionDuration = "1s";
    mobileLeftLevel!.style.transitionDuration = "1s";
    mobileRightLevel!.style.transitionDuration = "1s";
    leftLevel!.style.width = this.leftPercentage?.toPrecision(2) + "%";
    rightLevel!.style.width = this.rightPercentage?.toPrecision(2) + "%";
    mobileLeftLevel!.style.width = this.leftPercentage?.toPrecision(2) + "%";
    mobileRightLevel!.style.width = this.rightPercentage?.toPrecision(2) + "%";
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
    this.showElement("action-panel");
  }

  private hideElement(id: string) {
    let poll = document.getElementById(id);
    poll!.style.opacity = "0";
    poll!.style.zIndex = "-1";
  }

  private showElement(id: string){
    let poll = document.getElementById(id);
    poll!.style.opacity = "1";
    poll!.style.zIndex = "2";
  }

  private hideButtons(id1: string, id2: string) {
    this.hideElement(id1);
    this.hideElement(id2);
  }

  private showButtons() {
    this.showElement("desktop-left-poll-button");
    this.showElement("desktop-right-poll-button");
  }

  private mobileResetVotes() {
    let leftLevel = document.getElementById("mobile-left-level");
    let rightLevel = document.getElementById("mobile-right-level");
    leftLevel!.style.width = "0";
    rightLevel!.style.width = "0";
  }

  private hideMobile(){
    this.hideElement("left-mobile-title");
    this.hideElement("right-mobile-title");
    this.mobileResetVotes();
    this.showElement("right-mobile-percentage");
    this.showElement("right-mobile-votes");
    this.showElement("left-mobile-percentage");
    this.showElement("left-mobile-votes");
    this.showElement("mobile-action-buttons");
  }

  private showMobile() {
    this.showElement("left-mobile-title");
    this.showElement("right-mobile-title");

    this.hideElement("right-mobile-percentage");
    this.hideElement("right-mobile-votes");
    this.hideElement("left-mobile-percentage");
    this.hideElement("left-mobile-votes");
    this.hideElement("mobile-action-buttons");
  }

  private restartMobileLevels(){
    let leftLevel = document.getElementById("mobile-left-level");
    let rightLevel = document.getElementById("mobile-right-level");
    leftLevel!.style.width = "100%";
    rightLevel!.style.width = "100%";
  }

  private emphasizeImage(orientation: string) {
    let leftImage = document.getElementById("mobile-left-image");
    let rightImage = document.getElementById("mobile-right-image");
    if (orientation == "left"){
      rightImage!.style.width = "1%";
      leftImage!.style.width = "99%";
    } else {
      rightImage!.style.width = "99%";
      leftImage!.style.width = "1%";
    }
  }

  private restartImages() {
    let leftImage = document.getElementById("mobile-left-image");
    let rightImage = document.getElementById("mobile-right-image");
    rightImage!.style.width = "50%";
    leftImage!.style.width = "50%";
  }

  private disableVoting() {
    let leftVoteButton = document.getElementById("mobile-left-choice");
    let rightVoteButton = document.getElementById("mobile-right-choice");
    leftVoteButton!.style.pointerEvents = "none";
    rightVoteButton!.style.pointerEvents = "none";
  }

  private enableVoting() {
    let leftVoteButton = document.getElementById("mobile-left-choice");
    let rightVoteButton = document.getElementById("mobile-right-choice");
    leftVoteButton!.style.pointerEvents = "auto";
    rightVoteButton!.style.pointerEvents = "auto";
  }
}
