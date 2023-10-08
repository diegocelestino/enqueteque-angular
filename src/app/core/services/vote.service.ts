import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {environment} from "../enviroment/enviroment";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class VoteService extends BaseService{
  apiUrl = `${environment.apiUrl}/vote/`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  postVote(choiceId: string | undefined): Observable<String> {
    return this.httpClient.post<String>(this.apiUrl + choiceId, this.httpOptions);
  }
}
