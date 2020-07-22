import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  
  private sortedPanellistDetails: Subject<any> = new Subject<any>();
  private panellistToHeader: Subject<any> = new Subject<any>();
  private panellistToFilter: Subject<any> = new Subject<any>();

  constructor() { }

  sendSortedPanellistDetails(fields: any) {
    this.sortedPanellistDetails.next(fields);
  }
  getSortedPanellistDetails() {
    return this.sortedPanellistDetails.asObservable();
  }

  sendPanellistToHeader(fields: any) {
    this.panellistToHeader.next(fields);
  }
  getPanellistToHeader() {
    return this.panellistToHeader.asObservable();
  }

  sendPanellistToFilter(fields: any) {
    this.panellistToFilter.next(fields);
  }
  getPanellistToFilter() {
    return this.panellistToFilter.asObservable();
  }
}
