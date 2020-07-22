import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { TokenService } from './token.service';
import { ApiPathService } from './api-path.service';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private apiPath: ApiPathService,
    private http: HttpClient,
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  public login(username, password): Observable<any> {
    const apiPath = this.apiPath.baseUrl + "/Root/Users/Login";
    const data = {
      Username: username,
      Password: password,
      Grant_type: "password",
      Applicationname: "consort",
    };
    this.tokenService.clearTokens();

    return this.http.post(apiPath, data, { observe: "response" }).pipe(
      map((res: any) => {
        if (res.status !== 200) {
          return res;
        }

        this.tokenService.setAuthorizationToken(
          res.body.access_token,
          'Bearer'
        );

        let tokens = res.body.access_token.split(".");
        // this.userService.setUserInfo(JSON.parse(atob(tokens[1])));

        return res;
      })
    );
  }
}
