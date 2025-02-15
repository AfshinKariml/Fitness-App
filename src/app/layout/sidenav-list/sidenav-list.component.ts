import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent {
  
  @Output() closeSidenav = new EventEmitter<void>();

  
  links = [
    { route: '', icon: 'home', text: 'خانه' },
    { route: '/bmi', icon: 'directions_run', text: 'شاخص توده بدنی' },
    { route: '/support', icon: 'support', text: 'پشتیبانی' },
    { route: '/about', icon: 'info', text: 'درباره ما' },
  ];

  
  OnClose() {
    this.closeSidenav.emit();
  }
}