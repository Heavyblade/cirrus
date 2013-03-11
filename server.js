var wapp = require("./cirrus.js")

wapp.userscontroller = {
  show: function(params){
    return({hello: "world", id: wapp.router.params.userid, x: wapp.router.params.x})}
}
wapp.router.addroutes({"get /users/:userid/show": "userscontroller#show"});


// load the net module to create a tcp server.
var net = require('net');

// setup a tcp server
var server = net.createserver(function (socket) {
  var request = ""
  // every time someone connects, tell them hello and then close the connection.
  socket.addlistener("connect", function () {
    socket.on('data', function(data) {
        request = wapp.request(data.tostring())
        socket.end(wapp.response(request));
    })
  });

});

// fire up the server bound to port 7000 on localhost
server.listen(4000, "localhost");
console.log("tcp server listening on port 5000 at localhost.");
