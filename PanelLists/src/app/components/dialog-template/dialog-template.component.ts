import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { map, retryWhen, tap, delayWhen } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-dialog-template',
  templateUrl: './dialog-template.component.html',
  styleUrls: ['./dialog-template.component.css']
})
export class DialogTemplateComponent implements OnInit {

  public selected = '';
  public expiryDate: any;
  public projectDetailsList: any;
  public singleProjectDetail: any;
  public todaysDate: any;
  public isValidModal: boolean = false;
  public isDateValid: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public panelistDetails: any, private dataService: DataService) { }

  ngOnInit(): void {
    this.todaysDate = new Date();
    this.projectDetailsList = [];
    this.expiryDate = []
    this.getSurveyProjects()
  }

  getSurveyProjects() {
    this.dataService.getSurveyName().pipe(
      map(val => {
        if (!val) {
          //error will be picked up by retryWhen
          throw val;
        }
        return val;
      })
      
    ).subscribe(data => {
      for (const surveyProjects of data) {
        this.projectDetailsList.push(surveyProjects)
      }
    })
  }

  selectDateEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.isDateValid = true;
    this.expiryDate.push(event.value);
  }

  dateConvertion(date: any) {
    var tzoffset = (date).getTimezoneOffset() * 60000;
    var localISOTime = (new Date(date.getTime() - tzoffset)).toISOString();
    return localISOTime
  }

  getSingleProjectDetail() {
    for (let i = 0; i < this.projectDetailsList.length; i++) {
      if (this.projectDetailsList[i].projectName === this.selected) {
        this.singleProjectDetail = this.projectDetailsList[i]
      }
    }
    return this.singleProjectDetail
  }

  jsonCreation() {
    let index = this.expiryDate.length - 1
    const expiry = this.expiryDate[index]
    const todaysDate = this.dateConvertion(this.todaysDate)
    if (index !== -1 && this.selected !== "" && this.panelistDetails[0].length !==0){
      const singleProjectDetail = this.getSingleProjectDetail()
      const expirySurvetDate = this.dateConvertion(expiry)
      const payload = {
        "CampaignProject": singleProjectDetail,
        "Allocated_On": todaysDate,
        "Survey_Expiry_Date": expirySurvetDate,
        "PanelistAllocationList": this.panelistDetails[0]
      }
      return payload
    }

    return false
  }

  allocate(): void {

    const payload = this.jsonCreation()

    if (payload === false) {
      this.isValidModal = true;

    } else {
      this.dataService.allocateSurvey(payload).pipe(
        map(val => {
          if (!val) {
            //error will be picked up by retryWhen
            throw val;
          }
          return val;
        })
      ).subscribe(data => {
        // console.log(data)
      })
      this.dialogRef.close();
    }

  }

  close() {
    this.dialogRef.close()
  }

}
