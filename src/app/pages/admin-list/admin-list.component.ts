import {Component, OnInit} from '@angular/core';
import {PollDto} from "../../core/models/poll-dto.model";
import {first} from "rxjs";
import {AdminService} from "../../core/services/admin.service";


@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit{
  evidencePoll: PollDto | undefined;
  pollsDto: PollDto[] | undefined;
  token: string | undefined | null;

  constructor(
      private adminService: AdminService,
  ) {}

  ngOnInit(): void {
    this.token = localStorage.getItem("token");
    this.loadAllPolls();
  }

  private loadAllPolls() {
    this.adminService.getAllPolls(this.token!)
        .pipe(first())
        .subscribe({
          next: pollPageDto => {
            this.pollsDto = pollPageDto;
          }
        })
  }

  deletePoll(evidencePoll: PollDto | undefined) {
    console.log(evidencePoll)
    this.adminService.deletePoll(this.token!, evidencePoll!.id!)
        .pipe(first())
        .subscribe({
          next: () => {
            this.cancelDeletePoll();
            location.reload();
          }
        })
  }

  openCreateForm(){
    location.replace("/pages/admin/create");
  }

  editPoll(id: string) {
    location.replace("/pages/admin/edit/" + id);
  }

  confirmDeletePoll(poll: PollDto) {
    let modal = document.getElementById("modal-container");
    this.evidencePoll = poll;
    modal!.style.display = "flex";
  }

  cancelDeletePoll() {
    let modal = document.getElementById("modal-container");
    modal!.style.display = "none";
  }

}
