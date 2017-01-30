'use strict';

import angular from 'angular';
import {
  UtilService
} from './util.service';

export default angular.module('anppApp.util', [])
  .factory('Util', UtilService)
  .name;
