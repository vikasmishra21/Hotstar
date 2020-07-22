import { Injectable } from '@angular/core';

interface IUserInfo {
  unique_name: string;
  username: string;
  userid: string;
  CustomerID: string;
  subrole: string;
  CustomerName: string;
  plan: string;
  app: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userInfo: IUserInfo | null = null;
  // private currentProjectId: string;
  private storageKey = "userInfo";

  constructor() { 
    let userInfo = sessionStorage.getItem(this.storageKey);
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }
  }

  public setUserInfo(userInfo: IUserInfo): void {
    this.userInfo = userInfo;
    this.saveUserInfo(this.userInfo);
  }

  public getUserInfo(): IUserInfo {
    return this.userInfo;
  }

  private saveUserInfo(userInfo): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(userInfo));
  }

  public removeUserInfo(): void {
    sessionStorage.removeItem(this.storageKey);
  }
}
