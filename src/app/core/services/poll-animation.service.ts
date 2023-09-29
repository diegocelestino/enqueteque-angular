import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PollAnimationService {

  constructor() { }

  countVotes(leftPercentage: number, rightPercentage: number) {
    let rightLevel = document.getElementById("right-level");
    let leftLevel = document.getElementById("left-level");
    let mobileRightLevel = document.getElementById("mobile-right-level");
    let mobileLeftLevel = document.getElementById("mobile-left-level");
    leftLevel!.style.transitionDuration = "1s";
    rightLevel!.style.transitionDuration = "1s";
    mobileLeftLevel!.style.transitionDuration = "1s";
    mobileRightLevel!.style.transitionDuration = "1s";
    leftLevel!.style.width = leftPercentage?.toPrecision(2) + "%";
    rightLevel!.style.width = rightPercentage?.toPrecision(2) + "%";
    mobileLeftLevel!.style.width = leftPercentage?.toPrecision(2) + "%";
    mobileRightLevel!.style.width = rightPercentage?.toPrecision(2) + "%";
  }

  resetVotes(){
    let rightLevel = document.getElementById("right-level");
    let leftLevel = document.getElementById("left-level");
    leftLevel!.style.transitionDuration = "0s";
    rightLevel!.style.transitionDuration = "0s";
    leftLevel!.style.width = "0";
    rightLevel!.style.width = "0";
  }

  showActionPanel(orientation: string){
    let actionPanel = document.getElementById("action-panel");
    actionPanel!.style.justifyContent = orientation;
    this.showElement("action-panel");
  }

  hideElement(id: string) {
    let poll = document.getElementById(id);
    poll!.style.opacity = "0";
    poll!.style.zIndex = "-1";
  }

  showElement(id: string){
    let poll = document.getElementById(id);
    poll!.style.opacity = "1";
    poll!.style.zIndex = "2";
  }

  hideButtons(id1: string, id2: string) {
    this.hideElement(id1);
    this.hideElement(id2);
  }

  showButtons() {
    this.showElement("desktop-left-poll-button");
    this.showElement("desktop-right-poll-button");
  }

  private mobileResetVotes() {
    let leftLevel = document.getElementById("mobile-left-level");
    let rightLevel = document.getElementById("mobile-right-level");
    leftLevel!.style.width = "0";
    rightLevel!.style.width = "0";
  }

  hideMobile(){
    this.hideElement("left-mobile-title");
    this.hideElement("right-mobile-title");
    this.mobileResetVotes();
    this.showElement("right-mobile-percentage");
    this.showElement("right-mobile-votes");
    this.showElement("left-mobile-percentage");
    this.showElement("left-mobile-votes");
    this.showElement("mobile-action-buttons");
  }

  showMobile() {
    this.showElement("left-mobile-title");
    this.showElement("right-mobile-title");

    this.hideElement("right-mobile-percentage");
    this.hideElement("right-mobile-votes");
    this.hideElement("left-mobile-percentage");
    this.hideElement("left-mobile-votes");
    this.hideElement("mobile-action-buttons");
  }

  restartMobileLevels(){
    let leftLevel = document.getElementById("mobile-left-level");
    let rightLevel = document.getElementById("mobile-right-level");
    leftLevel!.style.width = "100%";
    rightLevel!.style.width = "100%";
  }

  emphasizeImage(orientation: string) {
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

  restartImages() {
    let leftImage = document.getElementById("mobile-left-image");
    let rightImage = document.getElementById("mobile-right-image");
    rightImage!.style.width = "50%";
    leftImage!.style.width = "50%";
  }

  disableVoting() {
    let leftVoteButton = document.getElementById("mobile-left-choice");
    let rightVoteButton = document.getElementById("mobile-right-choice");
    leftVoteButton!.style.pointerEvents = "none";
    rightVoteButton!.style.pointerEvents = "none";
  }

  enableVoting() {
    let leftVoteButton = document.getElementById("mobile-left-choice");
    let rightVoteButton = document.getElementById("mobile-right-choice");
    leftVoteButton!.style.pointerEvents = "auto";
    rightVoteButton!.style.pointerEvents = "auto";
  }
}
