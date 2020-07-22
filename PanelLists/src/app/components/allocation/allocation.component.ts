import { Component, OnInit } from '@angular/core';
import { Mappings } from 'src/app/constants/mappings';
import { DataService } from 'src/app/services/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogTemplateComponent } from '../dialog-template/dialog-template.component';
import { map, retryWhen, tap, delayWhen } from 'rxjs/operators';
import { timer } from 'rxjs';
@Component({
  selector: 'app-allocation',
  templateUrl: './allocation.component.html',
  styleUrls: ['./allocation.component.css']
})
export class AllocationComponent implements OnInit {

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
  public lat: number;
  public lng: number;
  public zoom: number = 15;
  public queryString = '';
  public idList = '';
  public idListLength: number = 0;
  public _and = 'and';
  public _eq = 'eq';
  public marked = false;
  public theCheckbox = false;
  public tempIdList: any;
  public showLoader: boolean;
  public toggle: boolean = false;
  public ownedtv: any
  idMobileMapObject: any;

  constructor(private dataService: DataService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.showLoader = true;
    this.dataService.getAllEligiblePanelist().pipe(
      map(val => {
        if (!val) {
          //error will be picked up by retryWhen
          throw val;
        }
        return val;
      })
      // retryWhen(errors =>
      //   errors.pipe(
      //     //log error message
      //     tap(val => console.log(`Can't fetch the eligible panelists.`)),
      //     delayWhen(val => timer(2000))
      //   )
      // )
    ).subscribe(data => {
      this.showLoader = false;
      this.panallistData = data;
      this.pannellistLength = this.panallistData.length;
    })
    this.stateMapping = Mappings.statesMap
    this.cityMapping = Mappings.cityMap
    this.nccsMapping = Mappings.nccsMap
    this.genderMapping = Mappings.genderMap
    this.educationMapping = Mappings.educationMap
    this.ownedtv = Mappings.ownedtvtype
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    if (this.queryString !== '') {
      const newIdString = this.queryString.split('eq')[1];
      const arrayID = newIdString.split(',')
      this.idMobileMapObject = []
      for (let index = 0; index < arrayID.length; index++) {
        for (let i = 0; i < this.panallistData.length; i++) {
          const id = parseInt(arrayID[index])
          if (this.panallistData[i].id === id) {
            this.idMobileMapObject.push({"ID": id, "Mobile_Number": this.panallistData[i].mobile_Number, "AD_ID": this.panallistData[i].aD_ID})
          }
        }
      }
      dialogConfig.data = [this.idMobileMapObject, this.idListLength];
    } else {
      this.idMobileMapObject = []
      dialogConfig.data = [this.idMobileMapObject, this.idListLength];
    }
    const dialogRef = this.dialog.open(DialogTemplateComponent, dialogConfig);
  }

  toggleVisibility(e) {
    this.marked = e.target.checked;
    if (this.marked === true) {
      this.queryString = ''
      for (const detail of this.panallistData) {
        this.queryString += ',' + detail.id
      }
      this.fetchSelectedIds()
    } else {
      this.queryString = ''
      this.fetchSelectedIds()
    }
  }

  fetchSelectedIds() {
    if (this.queryString === '') {
      this.queryString = ''
      this.idListLength = 0
    } else if (!this.queryString.startsWith('ideq')) {
      this.idList = this.queryString.substring(1)
      this.queryString = 'ideq' + this.idList
      this.tempIdList = this.idList.split(',')
      this.idListLength = this.tempIdList.length
    } else {
      this.idList = this.queryString.split('eq')[1]
      this.queryString = 'ideq' + this.queryString.split('eq')[1]
      this.tempIdList = this.idList.split(',')
      this.idListLength = this.tempIdList.length

    }

  }

  getContentHeight() {
    return window.innerHeight - 230;
  }

  getContentWidth() {
    var width = document.getElementById("brandData").offsetWidth;
    return width;
  }

  public setValue(name, value) {
    let _o = {}
    let params = this.queryString.split(this._and)
    if (params[0] !== '') {
      for (let i = 0; i < params.length; i++) {
        let keyValues = params[i].split(this._eq)
        _o[keyValues[0]] = keyValues[1].split(',')
      }
    }

    if (_o[name] && _o[name].indexOf('' + value) > -1) {
      _o[name].splice(_o[name].indexOf('' + value), 1);
    } else {
      _o[name] = _o[name] ? _o[name].concat(value) : [value]
    }
    let newStr = ''
    let and = ''
    Object.keys(_o).map(key => {
      if (_o[key][0] === "") {
        _o[key].splice(0, 1)
      }
      if (_o[key].length === 0) {

      } else {
        newStr += and + key + this._eq + _o[key].join(',')
        and = this._and

      }
    })
    this.queryString = newStr
    this.fetchSelectedIds()
    return this.queryString


  }

  public clickEvent(id) {
    //if you just want to toggle the class; change toggle variable.
    var rowSelect = document.getElementById(id);
    if (rowSelect.classList.contains("rowColor")) {
      rowSelect.classList.remove("rowColor");
    }
    else {
      rowSelect.classList.add("rowColor");
    }
  }

}
