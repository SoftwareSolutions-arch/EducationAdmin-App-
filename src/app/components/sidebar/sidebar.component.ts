import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/colleges', title: 'College',  icon:'school', class: '' },
    { path: '/courses', title: 'Courses',  icon:'library_books', class: '' },
    { path: '/articles', title: 'Articles',  icon:'bubble_chart', class: '' },
    { path: '/fees', title: 'Fees',  icon:'payment', class: '' },
    { path: '/leads', title: 'Leads',  icon:'dehaze', class: '' },
    { path: '/location', title: 'location',  icon:'public', class: '' },
    { path: '/branchinfracollege', title: 'all details',  icon:'edit', class: '' },
    { path: '/company', title: 'company',  icon:'work', class: '' },
    { path: '/course-branch', title: 'course-branch',  icon:'notes', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO', icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
