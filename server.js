var wApp = require("./builds/cirrus.min.test.js")
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
  var request = "";
  socket.addListener("connect", function () {
    socket.on('data', function(data) {
        console.log(data.toString());
        socket.end("HTTP/1.0 200 OK\r\n\r\n<h1>Hola</h1>");
    });
  });

});
console.log("Server UP and running on localhost:5000");
server.listen((process.env.PORT || 5001), '127.0.0.1');
