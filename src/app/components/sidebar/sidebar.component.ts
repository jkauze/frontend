import { Component, OnInit } from '@angular/core';
import { AppService } from 'app/app.service';
import { USER_TYPE } from 'app/interfaces/user';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/solicitudes', title: 'Solicitudes',  icon: 'notifications', class: '' },
    { path: '/laboratorios', title: 'Laboratorios', icon: 'desktop_windows', class: ''},
    { path: '/horario', title: 'Horario', icon: 'schedule', class: ''},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private app: AppService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.app.isUserType(USER_TYPE.LAB_F).then(isLabF => {
      if (isLabF) {
        this.addAdminRoute();
      }
    });
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  addAdminRoute() {
    this.menuItems.push({
      path: '/labf-admin',
      title: 'Administrar',
      icon: 'notifications',
      class: ''
    });
  }
}
