import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PollFullDto} from "../models/poll-full-dto.model";
import {environment} from "../enviroment/enviroment";

@Injectable({
  providedIn: 'root'
})
export class PollService extends BaseService{
  apiUrl = `${environment.apiUrl}/poll`;
  latest: string = "/latest";

  constructor(private httpClient: HttpClient) {
    super();
  }

  getLatestPoll(pollId: string | undefined): Observable<PollFullDto> {
    return this.httpClient.get<PollFullDto>(this.apiUrl + this.latest, this.httpOptions);
  }

}
