(function(){
  'use strict';

  module.exports.unwrapMessage = function(obj) {

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
      if (notifications.notification[0].hasOwnProperty('id')) {
        output.notificationId = notifications.notification[0].id[0];
      }


      var sObject = notifications.notification[0].sobject[0];
      if (sObject.hasOwnProperty('$') && sObject['$'].hasOwnProperty('xsi:type')) {
        output.type = sObject['$']['xsi:type'].replace('sf:','');
      }

      var fields = {};
      var keys = Object.keys(sObject);
      for (var i = 0; i < keys.length; i++) {
        if (keys[i] !== '$') {
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

})();
