'use strict';

import angular from 'angular';

export function OauthButtonsController($window) {
  'ngInject';

  this.loginOauth = function(provider) {
    $window.location.href = `/auth/${provider}`;
  };
}

export default angular.module('anppApp.oauthButtons', [])
  .directive('oauthButtons', function() {
    return {
      template: require('./oauth-buttons.pug'),
      restrict: 'EA',
      controller: OauthButtonsController,
      controllerAs: 'OauthButtons',
      scope: {
        classes: '@'
      }
    };
  })
  .name;
