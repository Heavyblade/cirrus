var wApp = require("./builds/cirrus.min.test.js");
var net = require('net');

// xxxxxxxxxxxxxxxxxxxxxxx Application xxxxxxxxxxxxxxxxxxxxxxx
wApp.usersController = {
  show: function(params) {
    return({hello: "world", id: 20});
  }
};

wApp.router.addRoutes({"GET /users/:userid/show": "usersController#show"});
wApp.router.addRoutes({"POST /users/:userid/show": "usersController#show"});
// xxxxxxxxxxxxxxxx setup a TCP server xxxxxxxxxxxxxxxxxxxxxxx

var HOST = 'localhost';
var PORT = 4001;

net.createServer(function(sock) {
    sock.on('data', function(data) {
        wApp.router.params = {};
        request = wApp.request(data.toString());
        console.log(request);
        sock.write(wApp.response(request));
    });
}).listen(process.env.PORT || 4001);

console.log('Server listening on ' + HOST +':'+ PORT);
