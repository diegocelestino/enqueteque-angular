import { Injectable } from '@angular/core';
import {environment} from "../enviroment/enviroment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BaseService} from "./base.service";
import {PollFullDto} from "../models/poll-full-dto.model";
import {PollFullCreateDto} from "../models/poll-full-create-dto.model";
import {Observable} from "rxjs";
import {PollDto} from "../models/poll-dto.model";

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService {
  apiUrl = `${environment.apiUrl}/admin`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  postPoll(pollFullCreateDto: PollFullCreateDto, token: string): Observable<PollFullDto> {
    return this.httpClient.post<PollFullDto>(this.apiUrl, pollFullCreateDto,
        {headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept-Language': 'pt-BR',
          'Authorization' : 'Bearer ' + token,
        })});
  }

    getAllPolls(token: string) : Observable<PollDto[]> {
            return this.httpClient.get<PollDto[]>(this.apiUrl,
                {headers: new HttpHeaders({
                        'Content-Type': 'application/json',
                        'Accept-Language': 'pt-BR',
                        'Authorization' : 'Bearer ' + token,
                    })});
    }

  getPollById(pollId: string | null): Observable<PollFullDto> {
    return this.httpClient.get<PollFullDto>(this.apiUrl + "/" + pollId, this.httpOptions);
  }

  putPoll(pollFullDto: PollFullDto | undefined, token: string): Observable<PollFullDto> {
    return this.httpClient.put<PollFullDto>(this.apiUrl, pollFullDto,
      {headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept-Language': 'pt-BR',
          'Authorization' : 'Bearer ' + token,
        })});
  }

    deletePoll(token: string, pollId: string) {
      console.log(this.apiUrl + "/" + pollId)
        return this.httpClient.delete<void>(this.apiUrl + "/" + pollId, this.httpOptions);
    }
}
