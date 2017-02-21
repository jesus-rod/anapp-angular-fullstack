'use strict';

var express = require('express'),
  cors = require('cors');
var controller = require('./parroquia.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', cors(), controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.upsert);
router.patch('/:id', auth.hasRole('admin'), controller.patch);
router.delete('/:id', auth.hasRole('admin'),controller.destroy);

module.exports = router;
