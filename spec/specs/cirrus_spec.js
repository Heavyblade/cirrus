describe("Router Component", function(){

  beforeEach(function(){
    wApp.router.routes = {};
    wApp.router.params = {}
  });

  it("Should be able to add simple routes", function(){
    wApp.router.addRoutes({"GET /some/path/resource": "controller#action"})
    var routes =  Object.keys(wApp.router.routes)
    expect(routes.length).toEqual(1);
    expect(routes[0]).toEqual("GET /some/path/resource")
  });

  it("should handle no matching routes", function(){
     wApp.router.addRoutes({"GET /some/path/resource": "controller#action"});
     var routing = wApp.router.pointRequest("GET /some/23/resource");
     expect(routing).toEqual("NOT FOUND");
  });

  it("should be able to add a route with params", function(){
    wApp.router.addRoutes({"GET /some/:param/resource": "controller#action"})
    var routes =  Object.keys(wApp.router.routes)
    expect(routes.length).toEqual(1);
    expect(routes[0]).toEqual("GET /some/(\\d+)/resource")
  });

  it("should point to me the properly controller#action", function(){
    wApp.router.addRoutes({"GET /some/:param/resource": "controller1#action1",
                      "GET /path": "controller2#action1",
                      "GET some/43/resource": "controller3#action1"
    });

    var routing = wApp.router.pointRequest("GET /some/23/resource")
    expect(routing).toEqual("controller1#action1")
  });

  it("should able to add params to the global params scope", function(){
    wApp.router.addRoutes({"GET /some/:id/resource/:userid/action": "controller1#action1"})
    var routing = wApp.router.pointRequest("GET /some/23/resource/42/action")
    expect(wApp.router.params.id).toEqual("23");
    expect(wApp.router.params.userid).toEqual("42");
  });

  it("should point me to the last coincidence", function(){
    wApp.router.addRoutes({"GET /some/:param/resource": "controller1#action1",
                      "GET /some/:param/resource": "controller2#action2"});
    var routing = wApp.router.pointRequest("GET /some/23/resource");
    expect(routing).toEqual("controller2#action2")
  });

  it("should not point me to partial coincidence", function(){
    wApp.router.addRoutes({"GET /some/:param/resource/action": "controller1#action1",
                      "GET /some/:param/resource": "controller2#action2"});
    var routing = wApp.router.pointRequest("GET /some/23/resource");
    var routes =  Object.keys(wApp.router.routes)
    expect(routes.length).toEqual(2);
    expect(routing).toEqual("controller2#action2")
  });

  it("should build REST routes for a resource", function() {
    var users = wApp.router.createREST("users");
    var router = Object.keys(users)
    expect(router[0]).toEqual("GET /users")
    expect(router[1]).toEqual("GET /users/new")
    expect(router[2]).toEqual("POST /users")
    expect(router[3]).toEqual("GET /users/:id")
    expect(router[4]).toEqual("GET /users/:id/edit")
    expect(router[5]).toEqual("PUT /users/:id")
    expect(router[6]).toEqual("DELETE /users/:id")
  })

  it("should add to router routes REST routes", function() {
    wApp.router.addRoutes({"resource users": "users", "GET /users/anotheraction": "usersController#anotheraction"})
    var routing = Object.keys(wApp.router.routes)
    expect(routing.length).toEqual(8)
  })
});
// xxxxxxxxxxxxxxxxxxxxxxEnd Router xxxxxxxxxxxxxxxxxxxxxxx
describe("Main App", function(){
  it("should extend it self to add controllers", function(){
     wApp.usersController = {
        index: function(params){return("Hello")}
      }

      wApp.appsController = {
        index: function(params){return("Hello2")}
      }

      expect(wApp["usersController"]["index"]()).toEqual("Hello")
      expect(wApp["appsController"]["index"]()).toEqual("Hello2")
  });
});

describe("Request Object", function(){
  beforeEach(function(){
    wApp.router.params = {}
  });

  it("should decode the HTTP GET request", function(){
    var httpGet = "GET /some/path/toresource HTTP/1.0\r\n\r\n"
    var request = Request(httpGet);
    expect(request.verb).toEqual("GET");
    expect(request.path).toEqual("/some/path/toresource")
    expect(request.protocol).toEqual("HTTP/1.0")
    expect(request.url).toEqual("/some/path/toresource")
  });

  it("Should parse the query variables in the url", function(){
    var httpGet = "GET /some/path/toresource?foo=bar&hello=world&sentence=one+sentence+space HTTP/1.0\r\n\r\n"
    var request = Request(httpGet);
    expect(request.encodeParams).toEqual("foo=bar&hello=world&sentence=one+sentence+space");
    expect(wApp.router.params.foo).toEqual("bar");
    expect(wApp.router.params.hello).toEqual("world");
    expect(wApp.router.params.sentence).toEqual("one sentence space")
  });

  it("should be able to handle a HTTP request with headers", function(){
    var httpGet = "GET /some/path/toresource?foo=bar&hello=world HTTP/1.0\r\nContent-Type: application/json\r\nConnection: Keep-Alive\r\n\r\n"
    var request = Request(httpGet);
    expect(request.encodeParams).toEqual("foo=bar&hello=world");
    expect(wApp.router.params.foo).toEqual("bar");
    expect(wApp.router.params.hello).toEqual("world");
    expect(request.headers["Content-Type"]).toEqual("application/json");
    expect(request.headers["Connection"]).toEqual("Keep-Alive");
  });

  it("should be able to handle HTTP post with body", function () {
    var httpGet = "POST /some/path/toresource?foo=bar&hello=world HTTP/1.0\r\nContent-Type: application/json\r\nConnection: Keep-Alive\r\n\r\nname=john&lastname=doe" 
    var request = Request(httpGet);
    expect(request.body).toEqual("name=john&lastname=doe");
    expect(wApp.router.params.body.name).toEqual("john");
  })

});


describe("Response Object", function(){

  beforeEach(function(){
      wApp.router.routes = {};
      wApp.router.params = {}
      // Setting up an Application to test
      wApp.usersController = {
        show: function(params){return({hello: "world", id: wApp.router.params.userid, x: wApp.router.params.x})}
      }
      wApp.router.addRoutes({"GET /users/:userid/show": "usersController#show"});

      CRLF = "\r\n"
  });


  it("should find the proper action and give me the HTTP JSON response", function(){
    var httpGet = "GET /users/44/show?x=foo HTTP/1.1"
    var request = Request(httpGet);
    var expected_resp = JSON.stringify({hello: "world", id: "44", x: wApp.router.params.x });
    var response = Response(request);
    expect(typeof(response)).toEqual("string");
    expect(response.split("\r\n")[0]).toEqual("HTTP/1.1 200 OK");
    expect(response.split("\r\n\r\n")[1]).toEqual(expected_resp);
  });

  it("should render the proper HTTP headers to the response", function(){
    var httpGet = "GET /users/44/show?x=foo HTTP/1.1"
    var request = Request(httpGet);
    var expected_resp = JSON.stringify({hello: "world", id: "44", x: wApp.router.params.x });
    var response = Response(request);
    var headers = response.split("\r\n\r\n")[0].split("\r\n")
    expect(typeof(response)).toEqual("string");
    expect(headers[3].split(" ")[1]).toEqual("" + expected_resp.length);
  });

  it("should set the proper headers for a JSON response", function(){
    var httpGet = "GET /users/44/show?x=foo HTTP/1.1"
    var request = Request(httpGet);
    var response = Response(request);
    expect(response.split(CRLF)[2]).toEqual("Content-Type: application/json; charset=utf-8")
  });

  it("should able to handle JSONP request from JQuery", function(){
    var httpGet = "GET /users/44/show?x=foo&callback=jQuery11224324 HTTP/1.1"
    var request = Request(httpGet);
    var response = Response(request);
    expected_resp = "jQuery11224324(" + JSON.stringify({hello: "world", id: "44", x: wApp.router.params.x }) + ")";
    expect(response.split(CRLF)[2]).toEqual("Content-Type: application/javascript; charset=utf-8")
    expect(response.split("\n\r\n")[1]).toEqual(expected_resp);
  });

  it("should handle no matching urls", function(){
    var httpGet = "GET /shops/44/show?x=foo HTTP/1.1"
    var request = Request(httpGet);
    var response = Response(request);
    expect(response).toEqual("HTTP/1.1 404 NOT FOUND")
  });

  it("should calculate the proper Content-length", function() {
    var httpGet = "GET /users/44/show?x=foo HTTP/1.1"
    var request = Request(httpGet);
    var expected_resp = JSON.stringify({hello: "world", id: "44", x: wApp.router.params.x });
    var response = Response(request);
    expect(response.split("\r\n")[3]).toEqual("Content-Length: " + expected_resp.length);
  })

});


describe("Controller creation", function(){

  beforeEach(function(){
    wApp.router.routes = {};
    wApp.router.params = {}
  });

  it("should add controllers to wApp object", function(){
    wApp.usersController = {
        show: function(params){return({hello: "world", id: wApp.router.params.userid, x: wApp.router.params.x})}
    }

    expect(typeof(wApp.usersController)).toEqual("object")
    expect(typeof(wApp.posts)).toEqual("undefined")
  });

  it("should receive the params from the request", function(){
    wApp.usersController = {
      show: function(params){return({hello: "world", id: params.id})}
    }
    
    wApp.router.addRoutes({"GET /users/:id":  "usersController#show"});
    var httpGet = "GET /users/23 HTTP/1.1\r\n\r\n"
    var request = Request(httpGet)
    var response = Response(request)
    var respObj = JSON.parse(response.split("\r\n\r\n")[1])
    expect(respObj.id).toEqual("23")
  })
});
