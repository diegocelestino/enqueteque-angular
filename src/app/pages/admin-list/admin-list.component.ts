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
            console.log(this.pollsDto);
          }
        })
  }

  openCreateForm(){
    location.replace("/pages/admin/create");
  }

  editPoll(id: string) {
    location.replace("/pages/admin/edit/" + id);
  }
}
