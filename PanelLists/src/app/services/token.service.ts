import { Injectable } from '@angular/core';
import { TokenType } from '../enums/token-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private tokens = {};
  private storageKey = "tokens";

  constructor() {
    const tokenString = sessionStorage.getItem(this.storageKey);
    if (tokenString) {
      this.tokens = JSON.parse(tokenString);
    }
   }

   public getTokens(): object {
    return this.tokens;
  }

  public setAuthorizationToken(token: string, tokenType: string): void {
    this.tokens[TokenType.AUTHORIZATION] = `${tokenType} ${token}`;
    this.saveTokens();
  }

  public getAuthorizationToken(): string | undefined {
    return this.tokens[TokenType.AUTHORIZATION];
  }

  public exists(): boolean {
    return !!sessionStorage.getItem(this.storageKey);
  }
  
  private saveTokens(): void {
    sessionStorage.setItem(this.storageKey, JSON.stringify(this.tokens));
    // sessionStorage.setItem(
    //   this.projectStorageKey,
    //   JSON.stringify(this.projectTokens)
    // );
  }
  
  public clearTokens(): void {
    // this.projectTokens = {};
    this.tokens = {};

    // sessionStorage.removeItem(this.projectStorageKey);
    sessionStorage.removeItem(this.storageKey);
  }
}
