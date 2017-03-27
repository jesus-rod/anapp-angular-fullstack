'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('diputados', {
      url: '/diputados',
      template: '<diputados></diputados>'
    });
}
