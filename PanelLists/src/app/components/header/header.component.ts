import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public showSort: boolean = false;
  public headerName: string;
  public showLoader: boolean;
  parametersToPass: any;
  DataFields: any = ['Age', 'City', 'State', 'Nccs']
  Order: any = ['Ascending', 'Descending']
  panelData: any;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.setHeaderName(this.router.url);
  }


  logout() {
    this.tokenService.clearTokens();
  }

  openFilterMenu() {
    const nav = document.getElementById('filter-nav');
    nav.style.visibility = 'visible';
    nav.style.width = '300px';
    nav.style.right = '0px';
  }

  openMenu() {
    const nav = document.getElementById('nav');
    nav.style.visibility = 'visible';
    nav.style.width = '200px';
    nav.style.right = '0px';
  }

  private setHeaderName(route: string) {
    switch (route.split('/')[2]) {
      case 'PanelLists':
        this.headerName = 'PANEL LISTS';
        break;
      case 'Allocation':
        this.headerName = 'ALLOCATION';
        break;

    }
  }

}
