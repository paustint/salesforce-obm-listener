var services = {
  id_04ki0000000L6tv: {
      MyPort: {
          MyFunction: function(args) {
              return {
                  name: args.name
              };
          },

          // This is how to define an asynchronous function.
          MyAsyncFunction: function(args, callback) {
              // do some work
              callback({
                  name: args.name
              });
          },

          // This is how to receive incoming headers
          HeadersAwareFunction: function(args, cb, headers) {
              return {
                  name: headers.Token
              };
          },

          // You can also inspect the original `req`
          notifications: function(args, cb, headers, req) {
            console.log(args);
              console.log('SOAP `reallyDeatailedFunction` request from ' + req.connection.remoteAddress);
              return {
                  name: headers.Token
              };
          }
      }
  }
};

module.exports = services;
