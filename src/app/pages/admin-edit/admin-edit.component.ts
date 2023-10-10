import {Component, OnInit} from '@angular/core';
import {PollFullDto} from "../../core/models/poll-full-dto.model";
import {AdminService} from "../../core/services/admin.service";
import {ActivatedRoute} from "@angular/router";
import {first} from "rxjs";
import {PollDto} from "../../core/models/poll-dto.model";

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit{
  pollFullDto: PollFullDto | undefined;
  pollId: string | null;
  leftImage: string | unknown;
  rightImage: unknown;

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {
    this.pollId = this.route.snapshot.paramMap.get("pollId");
  }

  ngOnInit(): void {
    this.loadPoll(this.pollId);
  }

  private loadPoll(pollId: string | null) {
    this.adminService.getPollById(pollId)
      .pipe(first())
      .subscribe({
        next: pollFullDto => {
          this.pollFullDto = pollFullDto;
          this.leftImage = pollFullDto!.choices!.at(0)!.image;
          this.rightImage = pollFullDto!.choices!.at(1)!.image;
        }
      })
  }

  putPoll() {
    this.mountPoll();
    this.adminService.putPoll(this.pollFullDto, '')
      .pipe(first())
      .subscribe({
        next: pollFullDto => {
          this.pollFullDto = pollFullDto;
          this.leftImage = pollFullDto!.choices!.at(0)!.image;
          this.rightImage = pollFullDto!.choices!.at(1)!.image;
        }
      })
  }

  mountPoll(){
    this.pollFullDto!.pollDto!.title = (<HTMLInputElement>document.getElementById("poll-title")).value;
    this.pollFullDto!.pollDto!.category = (<HTMLInputElement>document.getElementById("poll-category")).value;
    this.pollFullDto!.choices!.at(0)!.title = (<HTMLInputElement>document.getElementById("left-choice-title")).value;
    this.pollFullDto!.choices!.at(0)!.image = <string>this.leftImage;
    this.pollFullDto!.choices!.at(1)!.title = (<HTMLInputElement>document.getElementById("right-choice-title")).value;
    this.pollFullDto!.choices!.at(1)!.image = <string>this.rightImage;


    return null;
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
