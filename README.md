# Salesforce Outbound Message Listener

Application inspired from [this blog post](https://www.topcoder.com/blog/catching-salesforce-outbound-messages-with-nodejs/)

Simple node.js application for catching [Outbound Messages](https://developer.salesforce.com/page/Outbound_Messaging) sent from Salesforce.

Outbound messages are sent in XML so this will catch the message and convert the XML to an object that can easily be worked with
keys for the JSON object are modified to remove 'sf:' prefix from all keys.

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

Running locally or in a non-Heroku environment: Create file named `.env` and add the db connection string, for example:

```
MONGOLAB_URI=mongodb://example:example@ds123456.mlab.com:25400/salesforce-obm-listener
```

For Heroku, run the following `heroku config:set MONGOLAB_URI=mongodb://example:example@ds123456.mlab.com:25400/salesforce-obm-listener`

From the command line type:

```
npm install # install dependencies
npm start # start the server locally
npm test # run all tests, server must be running
```

To deploy to heroku (assuming all heroku endpoints and config has been done):
```
git add . -A
git commit -am "some comit message"
git push heroku master
heroku logs -t # this will show console log messages
```

The salesforce endpoint should be configured to `<heroku url here>/sfdc/obm` initially unless additional routes are added.

To implement additional actions, modify the routes the desired endpoints and add controller functtions to /server/controllers/sfdcControllers.js (or make your own controllers if needed)

## Contributors
* Austin Turner -> [paustint](https://github.com/paustint)
