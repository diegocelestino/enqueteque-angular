import { Component } from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../core/services/login.service";
import {Login} from "../../core/models/login.model";
import {first} from "rxjs";
import {Token} from "../../core/models/token.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private loginDto: Login | undefined;

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {}


  postLogin() {
    let name = (<HTMLInputElement>document.getElementById("name")).value;
    let password = (<HTMLInputElement>document.getElementById("password")).value;
    this.loginDto = new Login(name, password);
    this.loginService.postLogin(this.loginDto)
      .pipe(first())
      .subscribe({
        next: token => {
          this.openCreateForm(token);
        }
      })
  }

  openCreateForm(token: Token) {
    this.router.navigate(['pages','create', token.token]);
  }
}
