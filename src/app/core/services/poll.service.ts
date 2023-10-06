import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PollFullDto} from "../models/poll-full-dto.model";
import {environment} from "../enviroment/enviroment";
import {PollDto} from "../models/poll-dto.model";
import {PollPageDto} from "../models/poll-page-dto.model";

@Injectable({
  providedIn: 'root'
})
export class PollService extends BaseService{
  apiUrl = `${environment.apiUrl}/poll`;
  latest: string = "/latest";
  others: string = "/others";
  byCategory: string = "/category/";
  allCategories: string = "/category/all";


  constructor(private httpClient: HttpClient) {
    super();
  }

  loadPoll(pollId: string | null): Observable<PollFullDto>{
    if (pollId == null){
      return this.getLatestPoll();
    } else {
      return this.getPollById(pollId);
    }
  }

  getLatestPoll(): Observable<PollFullDto> {
    return this.httpClient.get<PollFullDto>(this.apiUrl + this.latest, this.httpOptions);
  }

  getPollById(pollId: string | undefined): Observable<PollFullDto> {
    return this.httpClient.get<PollFullDto>(this.apiUrl + "/" + pollId, this.httpOptions);
  }

  getOthersPolls(): Observable<PollDto[]> {
    return this.httpClient.get<PollDto[]>(this.apiUrl + this.others, this.httpOptions);
  }

  getAllPolls(page: number): Observable<PollPageDto> {
    return this.httpClient.get<PollPageDto>(this.apiUrl  + "?page=" + page, this.httpOptions);
  }

  loadCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.apiUrl + this.allCategories, this.httpOptions);
  }

  getAllPollsByCategory(category: string, page: number): Observable<PollPageDto> {
    return this.httpClient.get<PollPageDto>(this.apiUrl + this.byCategory + category + "?page=" + page, this.httpOptions);
  }
}
