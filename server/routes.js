(function () {
  'use strict';

  var express = require('express');
  var router = express.Router();
  var sfdcController = require('./controllers/sfdcController');

  /** Routes */
  router.post('/obm', sfdcController.obm);


  module.exports = router;

})();
