'use strict';

import angular from 'angular';
import LoginController from './login.controller';

export default angular.module('anppApp.login', [])
  .controller('LoginController', LoginController)
  .name;
