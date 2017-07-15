'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    title: 'Inicio',
    state: 'main'
  },
  {
    title: 'Agenda',
    state: 'agenda'
  }
  ];
  isLoggedIn: Function;
  isAdmin: Function;
  isDiputado: Function;
  getCurrentUser: Function;
  isCollapsed = true;
  constructor(Auth) {
    'ngInject';

    this.Auth = Auth;
    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = false;
    //get current user
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.isDiputado = false
    
    
    if (this.Auth.getCurrentUser().then(response => {
      console.log("rol es", response.role);
      switch (response.role){
        case "diputado":
          this.isDiputado = true;
          break;
        case "admin":
          this.isAdmin = true;
          break;
        default:
          break;
      }
      return response.role
    }));
  }
}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.pug'),
    controller: NavbarComponent
  })
  .name;
