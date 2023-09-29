import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Token} from "../models/token.model";
import {Login} from "../models/login.model";
import {environment} from "../enviroment/enviroment";
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService{
  apiUrl = `${environment.apiUrl}/auth/signin`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  postLogin(loginDto: Login): Observable<Token> {
    return this.httpClient.post<Token>(this.apiUrl, loginDto, this.httpOptions);
  }
}
