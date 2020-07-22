import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiPathService {

  private _baseUrl = 'https://rchotstar.azurewebsites.net';

  constructor() { }

  get baseUrl(): string {
    return this._baseUrl;
  }
}
