var express = require('express');
var _ = require("lodash");
var router = express.Router();
var util = require('util');

router.post('/', function(req, res) {
  // get the obm as an object
  var message = unwrapMessage(req.body);
  // set ack to false as the default to send to Salesforce
  var ackSuccess = false;
  if (!_.isEmpty(message)) {
    // set ack to success to send to Salesforce
    ackSuccess = true;
    console.log(message);
    // ------------- TAKE SOME ACTION WITH DATA ------------------------
  }

    res.send(
      '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:out="http://soap.sforce.com/2005/09/outbound"><soapenv:Header/><soapenv:Body><out:notificationsResponse><out:Ack>'+ackSuccess+'</out:Ack></out:notificationsResponse></soapenv:Body></soapenv:Envelope>'
    );

});

// unwrap the xml and return object
unwrapMessage = function(obj) {

  try {
    var output = {};
    var notifications = obj['soapenv:envelope']['soapenv:body'][0].notifications[0];
    if (notifications.hasOwnProperty('organizationid')) {
      output.organizationId = notifications.organizationid[0];
    }
    if (notifications.hasOwnProperty('actionid')) {
      output.actionId = notifications.actionid[0];
    }
    if (notifications.hasOwnProperty('sessionid')) {
      output.sessionId = notifications.sessionid[0];
    }
    if (notifications.hasOwnProperty('enterpriseurl')) {
      output.enterpriseUrl = notifications.enterpriseurl[0];
    }
    if (notifications.hasOwnProperty('partnerurl')) {
      output.partnerUrl = notifications.partnerurl[0];
    }

    var sObject = notifications.notification[0].sobject[0];
    if (sObject.hasOwnProperty('$') && sObject['$'].hasOwnProperty('xsi:type')) {
      output.type = sObject['$']['xsi:type'].replace('sf:','');
    }

    var fields = {};
    var keys = Object.keys(sObject);
    for (var i = 0; i < keys.length; i++) {
      if (keys[i] !== sObject['$']) {
        fields[keys[i].replace('sf:','')] = sObject[keys[i]][0];
      }
    }

    output.fields = fields;


    return output;

  } catch (e) {
    console.log('Could not parse OBM XML', e);
    return {};
  }
};

module.exports = router;
