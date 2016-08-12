var wApp = require("./builds/cirrus.min.test.js");
var net = require('net');

// xxxxxxxxxxxxxxxxxxxxxxx Application xxxxxxxxxxxxxxxxxxxxxxx
wApp.usersController = {
  show: function(params){
    wApp.responseHeaders.set("WWW-Authenticate", "Basic realm=\"myrealms\"")
    return({responseCode: {code: 401, message: "Unauthorized"}, hello: "world", id: wApp.router.params.userid, x: wApp.router.params.x});}
};

wApp.router.addRoutes({"GET /users/:userid/show": "usersController#show"});
// xxxxxxxxxxxxxxxx setup a TCP server xxxxxxxxxxxxxxxxxxxxxxx

var HOST = '0.0.0.0';
var PORT = 5000;

net.createServer(function(sock) {
    sock.on('data', function(data) {

        wApp.router.params = {};
        request = wApp.request(data.toString());
        console.log(request);
        sock.write(wApp.response(request));

    });
}).listen(process.env.PORT || 5000);

console.log('Server listening on ' + HOST +':'+ PORT);
