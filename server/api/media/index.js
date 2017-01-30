'use strict';

var express = require('express');
var controller = require('./media.controller');

var router = express.Router();

router.get('/', controller.index);
//router.get('/:id', controller.show);
router.post('/', controller.upload);
//router.put('/:id', controller.upsert);
//router.patch('/:id', controller.patch);
//router.delete('/:id', controller.destroy);

module.exports = router;
