(function(){
  'use strict';

  var _ = require("lodash");
  var sfdc = require('../helpers/sfdc');
  var SfdcObmLog = require('../models/sfdcObmLog');

  /**
   * 200 - OK success GET
   * 201 - created success POST
   * 203 - created success PUT
   * 204 - no content success DELETE
   * 400 bad request
   * 401 unathorized
   * 403 forbidden
   * 404 not found
   * 405 method not allowed
   */
  /** Helper function to send JSON server response */
  var sendJson = function(res, status, content) {
        // Add default message
        content = content || {};
        if ((status === 200 || status === 201 || status === 203) &&
            !content.hasOwnProperty('message')) {
                content.message = "ok";
        }
        res.status(status);
        res.json(content);
  };

  /** Helper function to send server response */
  var sendSFDC = function(res, successValue) {
    if (_.isUndefined(successValue)) {
      successValue = false;
    }
    res.send(
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:out="http://soap.sforce.com/2005/09/outbound"><soapenv:Header/><soapenv:Body><out:notificationsResponse><out:Ack>'+successValue+'</out:Ack></out:notificationsResponse></soapenv:Body></soapenv:Envelope>'
    );
  };

  /** Helper function to save incoming messages to db */
  var saveDbLog = function(req, message) {
    try {
      // Ensure that none of the keys start with "$" as this is not allowed in mongo
      // Turn object into string JSON and replace $ with _$
      var raw = JSON.parse(JSON.stringify(req.body).split("\"$\"").join("\"_$\""));

      var obm = new SfdcObmLog({raw: raw, unwrapped: message});
      obm.save(function(err) {
        if (err) {
          console.log('Error saving db log record', err);
        } else {
          console.log('log record saved to db', message);
        }
      });
    } catch (e) {
      console.log('Could not save db record', e);
    }
  };


  /** Controllers */

  module.exports.obm = function(req, res) {
    // recieve input and unwrap message
    var message = sfdc.unwrapMessage(req.body);
    // save message receipt to db
    saveDbLog(req, message);
    /// TODO -> do stuff with received message

    // Send response back to SFDC
    sendSFDC(res, !_.isEmpty(message));
  };


})();
