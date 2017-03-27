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

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;

    if (this.isAdmin)
      console.log("es admin");
    else
      console.log("no es admin");  

    //check if diputado  
    this.isDiputado = Auth.isDiputadoSync;
    if (Auth.isDiputadoSync) 
      console.log("es diputado?");


    this.getCurrentUser = Auth.getCurrentUserSync;
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.pug'),
    controller: NavbarComponent
  })
  .name;
