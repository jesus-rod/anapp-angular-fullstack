'use strict';

var express = require('express'),
  cors = require('cors')
  ,app = express();
var controller = require('./thing.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();


router.get('/', cors(), controller.index);
router.get('/page', controller.page);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.upsert);
router.patch('/:id', controller.patch);
router.delete('/:id', auth.hasRole('admin') , controller.destroy);

module.exports = router;
