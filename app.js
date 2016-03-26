var services = require('./services/services');
var soap = require('soap');
var fs = require('fs');
var http = require('http');

var wsdl = fs.readFileSync('wsdls/sfdc_create_acct_04ki0000000L6tv.wsdl', 'utf8');

console.log('services', JSON.stringify(services));

var server = http.createServer(function(request,response) {
  console.log('not found!');
  response.end("404: Not Found: " + request.url);
});

server.log = function(type, data) {
  console.log('type', type);
  console.log('data', data);
};

server.listen(3000);

soap.listen(server, {
    // Server options.
    path: '/04ki0000000L6tv',
    services: services,
    xml: wsdl,

    // // WSDL options.
    // attributesKey: 'theAttrs',
    // valueKey: 'theVal',
    // xmlKey: 'theXml'
});
