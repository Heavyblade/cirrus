var wApp = require("./builds/cirrus.min.test.js");
var net = require('net');

// xxxxxxxxxxxxxxxxxxxxxxx Application xxxxxxxxxxxxxxxxxxxxxxx
wApp.usersController = {
  show: function(params) {
    return({hello: "world", id: 20});
  }
};

wApp.router.addRoutes({"GET /users/:userid/show": "usersController#show"});
// xxxxxxxxxxxxxxxx setup a TCP server xxxxxxxxxxxxxxxxxxxxxxx

var HOST = '0.0.0.0';
var PORT = 5000;

net.createServer(function(sock) {
    sock.on('data', function(data) {
        wApp.router.params = {};
        request = wApp.request(data.toString());
        sock.write(wApp.response(request));
    });
}).listen(process.env.PORT || 5000);

console.log('Server listening on ' + HOST +':'+ PORT);
