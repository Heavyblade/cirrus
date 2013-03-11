var wApp = require("./cirrus.js")

wApp.usersController = {
  show: function(params){
    return({hello: "world", id: wApp.router.params.userid, x: wApp.router.params.x})}
}
wApp.router.addRoutes({"GET /users/:userid/show": "usersController#show"});


// load the net module to create a tcp server.
var net = require('net');

// setup a tcp server
var server = net.createServer(function (socket) {
  var request = ""
  // every time someone connects, tell them hello and then close the connection.
  socket.addListener("connect", function () {
    socket.on('data', function(data) {
        request = wApp.request(data.toString())
        socket.end(wApp.response(request));
    })
  });

});

// fire up the server bound to port 7000 on localhost
server.listen((process.env.PORT || 5000), "localhost");
