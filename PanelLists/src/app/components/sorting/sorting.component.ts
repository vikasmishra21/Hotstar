import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { DataService } from 'src/app/services/data.service';
import { Mappings } from 'src/app/constants/mappings';
import { map, retryWhen, delayWhen, tap } from 'rxjs/operators';
import { timer } from 'rxjs';
@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css']
})
export class SortingComponent implements OnInit {
  public showSort: boolean = false;
  public headerName: string;
  public showLoader: boolean;
  parametersToPass: any;
  DataFields: any = ['Age', 'City', 'State', 'Nccs']
  Order: any = ['Ascending', 'Descending']
  panelData: any;

  constructor(
    private dataService: DataService,
    private fb: FormBuilder,
    private dtService: DataTransferService,
  ) { }

  ngOnInit(): void {
    this.dtService.getPanellistToHeader().subscribe(data => {
      this.panelData = data;
    })
  }

  toggleSort() {
    this.showSort = !this.showSort;
  }

  form = this.fb.group({
    field: [''],
    order: ['']
  })

  onSubmit() {
    this.showLoader = true;
    let field = this.form.value.field.toLowerCase()
    let order = this.form.value.order.toLowerCase()
    if (field === "fields") {
      field = '';
    }
    if (order === "order by") {
      order = '';
    }
    if (field !== '' || (field !== '' && order !== '')) {
      this.dataService.SortFields(field, Mappings.orderMap[order])
      .pipe(
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
        //     tap(val => console.log(`Can't sort.`)),
        //     delayWhen(val => timer(2000))

        //   )
        // )
      ).subscribe(data => {
        this.showLoader = false;
        this.dtService.sendSortedPanellistDetails(data)
      })
    } else {
      this.dtService.sendSortedPanellistDetails(this.panelData)
      this.showLoader = false;
    }
  }


}
