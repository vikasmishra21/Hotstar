import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { map, retryWhen, tap, delayWhen } from 'rxjs/operators';
import { timer } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public credentials = {
    username: "",
    password: "",
  };
  public loggingIn = false;
  constructor(private router: Router, private auth: AuthService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.returnFromComponent();
  }

  public returnFromComponent() {
    if (this.tokenService.exists() === true) {
      this.router.navigate(["home"]);
    }
  }

  public onKeyUp(event): void {
    if (event.keyCode === 13) {
      this.login();
    }
  }

  public login(): void {
    if (
      this.credentials.username.trim() === "" ||
      this.credentials.password === "" ||
      this.loggingIn
    ) {
      return;
    }

    this.loggingIn = true;

    this.auth
      .login(this.credentials.username.trim(), this.credentials.password)
      .pipe(
        map(val => {
          if (!val) {
            //error will be picked up by retryWhen
            throw val;
          }
          return val;
        })
      ).subscribe(
        (res) => {
          this.router.navigate(["home"]);
          this.loggingIn = false;
        },
        (err) => {
          this.loggingIn = false;
        }
      );
  }

  public forogotPassword(): void {
    const username = this.credentials.username.trim();

    if (!username) {
      return;
    }

    window.open(
      `https://app.rebuscode.com/#!/ForgotPassword?username=${username}`,
      "_blank"
    );
  }

}
