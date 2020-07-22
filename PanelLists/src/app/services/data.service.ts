import { Injectable } from '@angular/core';
import { ApiPathService } from './api-path.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  sortParams: any;

  constructor(
    private apiPath: ApiPathService,
    private http: HttpClient
    ) { }

    public getPannellistDetails(): Observable<any> {
      const apiPath = `${this.apiPath.baseUrl}/Root/Panelist`;
      return this.http.get(apiPath)
    }

    public fetchSurveyData(pannellistID): Observable<any> {
      const apiPath = `${this.apiPath.baseUrl}/Root/Surveys`;
      return this.http.get(apiPath, {
        params: new HttpParams().set('panelist_id', pannellistID)
      })
    }

    public SortFields(field, order?): Observable<any> {
      const apiPath = `${this.apiPath.baseUrl}/Root/Panelist`;
      if (order !== '') {
        this.sortParams = new HttpParams().set('sortby', field).set('sortorder', order)
      } else {
        this.sortParams = new HttpParams().set('sortby', field)
      }
      return this.http.get(apiPath, {
        params: this.sortParams
      })
    }

    public FilterFields(query): Observable<any> {
      // filter=${query}
      const apiPath = `${this.apiPath.baseUrl}/Root/Panelist?${query}`;
      return this.http.get(apiPath)
    }

    public getAllEligiblePanelist(): Observable<any> {
      const apiPath = `${this.apiPath.baseUrl}/Root/Panelist/Eligible`;
      return this.http.get(apiPath)
    }    

    public getSurveyName(): Observable<any> {
      const apiPath = `${this.apiPath.baseUrl}/Root/Projects`;
      return this.http.get(apiPath)
    }

    public statusChange(panellistId: number, statusCode: number): Observable<any> {
      const apiPath = `${this.apiPath.baseUrl}/Root/Panelist/${panellistId}`;
      return this.http.patch(apiPath,{'status': statusCode})
    }

    public allocateSurvey(payload): Observable<any> {
      const apiPath = `${this.apiPath.baseUrl}/Root/Panelist/AllocateSurvey`;
      return this.http.post(apiPath, payload)
    }
}
