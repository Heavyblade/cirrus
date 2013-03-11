var wApp = require("./cirrus.js")
var net = require('net');

// xxxxxxxxxxxxxxxxxxxxxxx Application xxxxxxxxxxxxxxxxxxxxxxx
wApp.usersController = {
  show: function(params){
    return({hello: "world", id: wApp.router.params.userid, x: wApp.router.params.x})}
}
wApp.router.addRoutes({"GET /users/:userid/show": "usersController#show"});


// xxxxxxxxxxxxxxxxxxxxxxx setup a tcp server xxxxxxxxxxxxxxxxxxxxxxx
// Nota: solo funciona en local o conexiones muy rápidas

var server = net.createServer(function (socket) {
  var request = ""
  socket.addListener("connect", function () {
    socket.on('data', function(data) {
        wApp.router.params = {}
        request = wApp.request(data.toString())
        socket.end(wApp.response(request));
    })
  });

});

server.listen((process.env.PORT || 5000), "0.0.0.0");
