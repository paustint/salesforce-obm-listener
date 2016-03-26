# Salesforce Outbound Message Catcher

Application modified from [here](https://www.topcoder.com/blog/catching-salesforce-outbound-messages-with-nodejs/)

Simple node.js application for catching [Outbound Messages](https://developer.salesforce.com/page/Outbound_Messaging) sent from Salesforce.

Outbound messages are sent in XML so this will catch the message and convert the XML to an object that you can easily work with to do awesome stuff.

## Instructions

From the command line type:

```
git clone git@github.com:jeffdonthemic/salesforce-obm-catcher.git
cd salesforce-obm-catcher
npm install # install dependencies
npm start # start the server
npm test # run all tests
```

Modify the code in /routes/obm.js to do awesome stuff with the data from the outbound message.

## Contributors
* Jeff Douglas -> [jeffdonthemic](https://github.com/jeffdonthemic)
