import { Injectable } from '@angular/core';
import {environment} from "../enviroment/enviroment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BaseService} from "./base.service";
import {PollFullDto} from "../models/poll-full-dto.model";
import {PollFullCreateDto} from "../models/poll-full-create-dto.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CreateService extends BaseService {
  apiUrl = `${environment.apiUrl}/poll`;

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
}
