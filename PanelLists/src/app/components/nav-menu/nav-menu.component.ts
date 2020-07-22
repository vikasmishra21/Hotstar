import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  close() {
    const nav = document.getElementById('nav');
    nav.style.visibility = "hidden";
    nav.style.width = "0px";
    nav.style.right = "-5px"
  }

  highlight($event, id: string) {
    const allIcons = document.getElementsByClassName('panel-group');
    for (let i = 0; i < allIcons.length; i++) {
      allIcons[i].classList.remove('active');
    }
    var icon = document.getElementById(id);
    icon.classList.add('active');
  }

}
