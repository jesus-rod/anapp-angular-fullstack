'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('agenda', {
      url: '/agenda',
      template: '<agenda></agenda>'
    });
}
