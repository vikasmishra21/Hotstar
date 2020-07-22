import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Mappings } from 'src/app/constants/mappings';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { map, retryWhen, tap, delayWhen } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-panel-lists',
  templateUrl: './panel-lists.component.html',
  styleUrls: ['./panel-lists.component.css']
})
export class PanelListsComponent implements OnInit {
  public panallistData: any;
  public pannellistLength: number;
  public stateMapping: any;
  public cityMapping: any;
  public nccsMapping: any;
  public genderMapping: any;
  public educationMapping: any;
  public isModelOpen: boolean = false;
  public panellistName: String;
  public panellistAddress: String;
  public panellistPhone: number;
  public surveyCount: number;
  public showLoader: boolean;
  public ownedtv: any
  lat: number;
  lng: number;
  zoom: number = 15;

  constructor(private dataService: DataService, private dtService: DataTransferService) { }

  ngOnInit(): void {

    this.showLoader = true;

    this.dtService.getSortedPanellistDetails().subscribe(data => {
      this.showLoader = false;
      this.panallistData = data;
    })

    this.callPanellistData();

    this.stateMapping = Mappings.statesMap
    this.cityMapping = Mappings.cityMap
    this.nccsMapping = Mappings.nccsMap
    this.genderMapping = Mappings.genderMap
    this.educationMapping = Mappings.educationMap
    this.ownedtv = Mappings.ownedtvtype
  }

  fetchPanelSurveyDetails(pannellistDetails) {
    this.panellistName = pannellistDetails.first_Name + " " + pannellistDetails.last_Name
    this.panellistAddress = pannellistDetails.address_Line1 + " " + pannellistDetails.address_Line2
    this.panellistPhone = pannellistDetails.mobile_Number;
    this.lat = pannellistDetails.latitude === 0 ? 28.4142 : pannellistDetails.latitude
    this.lng = pannellistDetails.longitude === 0 ? 77.0880 : pannellistDetails.longitude

    this.dataService.fetchSurveyData(pannellistDetails.id).subscribe(data => {
      this.surveyCount = data.length;
    })
  }

  callPanellistData() {
    this.dataService.getPannellistDetails().pipe(
      map(val => {
        if (!val) {
          //error will be picked up by retryWhen
          throw val;
        }
        return val;
      }),
      retryWhen(errors =>
        errors.pipe(
          //log error message
          tap(val => console.log(`Can't fetch the panelists`)),
          delayWhen(val => timer(2000))
        
        )
      )
    ).subscribe(data => {
      this.showLoader = false;
      for (const d of data) {
        d.owned_TvType = d.owned_TvType.split(',')
        if (d.owned_TvType[0] === ""){
          d.owned_TvType.length = 0
        }
      }
      this.panallistData = data;
      this.pannellistLength = this.panallistData.length;
      this.dtService.sendPanellistToFilter(data);
      this.dtService.sendPanellistToHeader(data);
    })
  }

  changeStatus(panellistId: number, statusCode: number) {
    this.dataService.statusChange(panellistId, statusCode).subscribe(
      (res) => {
        this.callPanellistData()
      },
      (err) => {
        this.callPanellistData()
      }
    );
  }

  openModal(pannellistDetails) {
    this.fetchPanelSurveyDetails(pannellistDetails);

    this.isModelOpen = true;

    setTimeout(() => {
      var popupClass = document.getElementById("myModal").classList;
      popupClass.add("show");
      document.getElementById("modal-backdrop").style.display = 'block';
    });
  }

  close() {
    setTimeout(() => {
      this.isModelOpen = false;

      document.getElementById("modal-backdrop").style.display = 'none';
      var popupClass = document.getElementById("myModal").classList;
      popupClass.remove("hide");
    });
  }

  getContentHeight() {
    return window.innerHeight - 190;
  }

  getContentWidth() {
    var width = document.getElementById("brandData").offsetWidth;
    return width;
  }
}
