'use strict';

var express = require('express');
var controller = require('./agenda.controller');
import * as auth from '../../auth/auth.service';

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('diputado'), controller.create);
// router.put('/:id', controller.upsert);
// router.patch('/:id', controller.patch);
router.delete('/:id', auth.hasRole('diputado'), controller.destroy);

module.exports = router;
