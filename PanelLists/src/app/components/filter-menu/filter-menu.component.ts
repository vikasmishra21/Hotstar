import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { Mappings } from 'src/app/constants/mappings';
import { map, retryWhen, tap, delayWhen } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.css']
})
export class FilterMenuComponent implements OnInit {
  public toggleDetails = [];
  public queryString = '';
  public queryStringForSort = '';
  public finalQueryString = '';
  public _and = 'and';
  public _eq = 'eq';
  public _newAnd1 = '&';
  public _newEq1 = '=';
  public panelData: any;
  public filters: any;
  public sorts: any;
  public showLoader: boolean;

  constructor(private dataService: DataService, private dtService: DataTransferService) { }

  ngOnInit(): void {
    this.dtService.getPanellistToFilter().subscribe(data => {
      this.panelData = data;
    })
    this.filters = Mappings.filters
    this.sorts = Mappings.sorts
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
    return this.queryString
  }

  public setValueField(name, value) {
    let _o = {}
    let params = this.queryStringForSort.split(this._newAnd1)
    if (params[0] !== '') {
      for (let i = 0; i < params.length; i++) {
        let keyValues = params[i].split(this._newEq1)
        _o[keyValues[0]] = keyValues[1]
      }
    }

    if (_o[name] && _o[name].indexOf('' + value) > -1) {
      _o[name].splice(_o[name].indexOf('' + value), 1);
    } else {
      _o[name] = _o[name] ? [value] : [value]
    }
    let newStr = ''
    let and = ''
    Object.keys(_o).map(key => {
      if (_o[key][0] === "") {
        _o[key].splice(0, 1)
      }
      if (_o[key].length === 0) {

      } else {
        newStr += and + key + this._newEq1 + _o[key]
        and = this._newAnd1

      }
    })
    this.queryStringForSort = newStr
    return this.queryStringForSort
  }

  sortQuertMAnipulation() {
    if (this.queryStringForSort.split('&')[0] !== undefined && this.queryStringForSort.split('&')[1] === undefined) {
      return this.queryStringForSort.split('&')[0]
    } else if (this.queryStringForSort.split('&')[0] === undefined && this.queryStringForSort.split('&')[1] !== undefined) {
      return this.queryString.split('&')[1]
    } else if (this.queryStringForSort.split('&')[0] !== undefined && this.queryStringForSort.split('&')[1] !== undefined) {
      return this.queryStringForSort.split('&')[0] + '&' + this.queryStringForSort.split('&')[1]
    } else {
      return ''
    }
  }

  queryManipulation() {
    const qStr = this.sortQuertMAnipulation()
    if (qStr !== '' && this.queryString === '') {
      this.finalQueryString = qStr
      return this.finalQueryString
    } else if (qStr === '' && this.queryString !== '') {
      this.finalQueryString = 'filter=' + this.queryString
      return this.finalQueryString
    } else if (qStr !== '' && this.queryString !== '') {
      this.finalQueryString = qStr + '&filter=' + this.queryString
      return this.finalQueryString
    } else {
      this.finalQueryString = ''
      return this.finalQueryString
    }
  }

  submit() {
    this.showLoader = true;
    this.toggleDetails = []

    this.queryManipulation()
    if (this.finalQueryString.length !== 0) {
      this.dataService.FilterFields(this.finalQueryString).pipe(
        map(val => {
          if (!val) {
            //error will be picked up by retryWhen
            throw val;
          }
          return val;
        })
      ).subscribe(data => {
        this.showLoader = false;
        this.dtService.sendSortedPanellistDetails(data)

      })
    } else {
      this.dtService.sendSortedPanellistDetails(this.panelData)
      this.showLoader = false;
    }
    this.close()
  }

  toGetChecked(name, arrayID) {
    var stateData = arrayID.length;
    for (let i = 0; i < stateData; i++) {
      setTimeout(() => {
        var idVal = name + arrayID[i];
        var elem = document.getElementById(idVal);
        elem.classList.add("checked");
      })
    }
  }

  toGetCheckedSort(arrayID) {
    for (let i = 0; i < arrayID.length; i++) {
      setTimeout(() => {
        var idVal = arrayID[i];
        var elem = document.getElementById(idVal);
        elem.classList.add("checked");
      })
    }
  }

  getState() {

    // For filters
    if (this.queryString !== '') {
      if (this.queryString.includes('state')) {
        const arrayID = this.queryString.split('state')[1].split('and')[0].split('eq')[1].split(',')
        this.toGetChecked('State', arrayID)
      }
      if (this.queryString.includes('city')) {
        const arrayID = this.queryString.split('city')[1].split('and')[0].split('eq')[1].split(',')
        this.toGetChecked('City', arrayID)
      }
      if (this.queryString.includes('nccs')) {
        const arrayID = this.queryString.split('nccs')[1].split('and')[0].split('eq')[1].split(',')
        this.toGetChecked('NCCS', arrayID)
      }
    }

    // For Sorting
    if (this.queryStringForSort !== '') {
      if (this.queryStringForSort.includes('sortby')) {
        const arrayID = this.queryStringForSort.split('sortby')[1].split('&')[0].split('=')[1].split(',')
        this.toGetCheckedSort(arrayID)
      }
      if (this.queryStringForSort.includes('sortorder')) {
        const arrayID = this.queryStringForSort.split('sortorder')[1].split('&')[0].split('=')[1].split(',')
        this.toGetCheckedSort(arrayID)
      }
    }
  }

  clear() {
    this.toggleDetails = []
    this.finalQueryString = ''
    this.queryString = ''
    this.queryStringForSort = ''
    this.dtService.sendSortedPanellistDetails(this.panelData);
    const allIcons = document.getElementsByClassName('scrollOption');
    for (let i = 0; i < allIcons.length; i++) {
      allIcons[i].classList.remove('checked');
    }
    this.close()
  }

  close() {
    const nav = document.getElementById('filter-nav');
    nav.style.visibility = "hidden";
    nav.style.width = "0px";
    nav.style.right = "-5px"
  }

  itemChecked(id) {
    var icon = document.getElementById(id);
    if (icon.classList.contains("checked")) {
      icon.classList.remove("checked")
    }
    else {
      icon.classList.add("checked")
    }
  }

  itemCheckedRadio(classname, id) {
    const allIcons = document.getElementsByClassName(classname);
    for (let i = 0; i < allIcons.length; i++) {
      allIcons[i].classList.remove('checked');
    }
    var icon = document.getElementById(id);
    icon.classList.add("checked")
  }

}
