import {Component, OnInit} from '@angular/core';
import {VoteService} from "../../core/services/vote.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateService} from "../../core/services/create.service";
import {PollCreateDto} from "../../core/models/poll-create-dto.model";
import {ChoiceCreateDto} from "../../core/models/choice-create-dto.model";
import {PollFullCreateDto} from "../../core/models/poll-full-create-dto.model";
import {first} from "rxjs";
import {PollFullDto} from "../../core/models/poll-full-dto.model";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  private token: string | undefined;
  private leftImage: unknown;
  private rightImage: unknown;
  private pollFullDto: PollFullDto | undefined;

  constructor(
    private createService: CreateService,
    private voteService: VoteService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.paramMap.get('token')!;
  }

  postPoll() {
    this.createService.postPoll(this.mountPoll(), this.token!)
      .pipe(first())
      .subscribe({
        next: pollFullDto => {
          this.pollFullDto = pollFullDto;
        }
      })
    this.dismountPoll();
  }

  mountPoll(){
    let pollCreateDto = new PollCreateDto(
      (<HTMLInputElement>document.getElementById("poll-title")).value,
      (<HTMLInputElement>document.getElementById("poll-category")).value
    );

    let leftChoice = new ChoiceCreateDto(
      (<HTMLInputElement>document.getElementById("left-option-title")).value,
      <string>this.leftImage);

    let rightChoice = new ChoiceCreateDto(
      (<HTMLInputElement>document.getElementById("right-option-title")).value,
      <string>this.rightImage);

    return new PollFullCreateDto(pollCreateDto, [leftChoice,rightChoice]);
  }

  dismountPoll(){
      (<HTMLInputElement>document.getElementById("poll-title")).value = '';
      (<HTMLInputElement>document.getElementById("poll-category")).value = '';
      (<HTMLInputElement>document.getElementById("left-option-title")).value = '';
      (<HTMLInputElement>document.getElementById("right-option-title")).value = '';
      (<HTMLInputElement>document.getElementById("left-option-image")).value = '';
      (<HTMLInputElement>document.getElementById("right-option-image")).value = '';
  }

  convertImageToBase64(image: File, orientation: string) {
    const promise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (<string>reader.result!)
          .replace('data:', '')
          .replace(/^.+,/, '');
        resolve(base64String);
      };
      reader.readAsDataURL(image);
    });
    promise.then(image => {
      if(orientation == "left"){
        this.leftImage = image;
      } else {
        this.rightImage = image;
      }
    });
  }

  onFileSelected(event: any, orientation: string) {
    this.convertImageToBase64(event.target.files[0], orientation);
  }

}
