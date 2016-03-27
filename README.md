# Salesforce Outbound Message Catcher

Application inspired from [this blog post](https://www.topcoder.com/blog/catching-salesforce-outbound-messages-with-nodejs/)

Simple node.js application for catching [Outbound Messages](https://developer.salesforce.com/page/Outbound_Messaging) sent from Salesforce.

Outbound messages are sent in XML so this will catch the message and convert the XML to an object that can easily be worked with
Keys for the JSON object are modified to remove 'sf:' prefix from all keys.

## Sample processed data
```
{ organizationId: '00DG0000000glAcXXX',
  actionId: '04kG0000000I3EwYYY',
  sessionId: '00DG0000000lgAc!AQ8AQEzUJm1i4D1FRCQELTogBXnHojuT3U0Be9BWM0',
  enterpriseUrl: 'https://na11.salesforce.com/services/Soap/c/32.0/00DG0000000glTd',
  partnerUrl: 'https://na11.salesforce.com/services/Soap/u/32.0/00DG0000000glTd',
  notificationId: '04lG000000SXaX6XXX',
  type: 'Contact',
  fields: { id: '003G00000297TpXXXX', mobilephone: '(111) 111-1111' } }
```


## Instructions

Clone the repository

If desired, create a mongolab account to capture and log the messages in and out.

Create file named `.env` and add the db connection string, for example:

```
MONGOLAB_URI=mongodb://example:example@ds123456.mlab.com:25400/salesforce-obm-listener
```

From the command line type:

```
npm install # install dependencies
npm start # start the server
npm test # run all tests, server must be running
```

The salesforce endpoint should be configured to `<heroku url here>/sfdc/obm` initially unless additional routes are added.

To implement additional actions, modify the routes the desired endpoints and add controller functtions to /server/controllers/sfdcControllers.js (or make your own controllers if needed)

## Contributors
* Austin Turner -> [paustint](https://github.com/paustint)
