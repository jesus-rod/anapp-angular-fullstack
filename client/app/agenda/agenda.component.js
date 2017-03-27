'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './agenda.routes';

export class AgendaComponent {

  $http;

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.items = [];
  }

 $onInit() {

    this.$http.get('/api/agendas')
      .then(response => {
        console.log(response);
        this.items = response.data;
      });
  }


}

export default angular.module('anappAngularFullstackApp.agenda', [uiRouter])
  .config(routes)
  .component('agenda', {
    template: require('./agenda.pug'),
    controller: AgendaComponent,
    controllerAs: 'agendaCtrl'
  })
  .name;
