describe("Router Component", function(){

  beforeEach(function(){
    wApp.router.routes = {};
    wApp.router.params = {}
  });

  it("Should be able to add simple routes", function(){
    wApp.router.addRoutes({"/some/path/resource": "controller#action"})
    routes =  Object.keys(wApp.router.routes)
    expect(routes.length).toEqual(1);
    expect(routes[0]).toEqual("/some/path/resource")
  });

  it("should handle no matching routes", function(){
     wApp.router.addRoutes({"/some/path/resource": "controller#action"});
     routing = wApp.router.pointRequest("/some/23/resource");
     expect(routing).toEqual("NOT FOUND");
  });

  it("should be able to add a route with params", function(){
    wApp.router.addRoutes({"/some/:param/resource": "controller#action"})
    routes =  Object.keys(wApp.router.routes)
    expect(routes.length).toEqual(1);
    expect(routes[0]).toEqual("/some/(\\w+)/resource")
  });

  it("should point to me the properly controller#action", function(){
    wApp.router.addRoutes({"/some/:param/resource": "controller1#action1",
                      "/path": "controller2#action1",
                      "some/43/resource": "controller3#action1"
    });

    routing = wApp.router.pointRequest("/some/23/resource")
    expect(routing).toEqual("controller1#action1")
  });

  it("should able to add params to the global params scope", function(){
    wApp.router.addRoutes({"/some/:id/resource/:userid/action": "controller1#action1"})
    routing = wApp.router.pointRequest("/some/23/resource/42/action")
    expect(wApp.router.params.id).toEqual("23");
    expect(wApp.router.params.userid).toEqual("42");
  });

  it("should point me to the last coincidence", function(){
    wApp.router.addRoutes({"/some/:param/resource": "controller1#action1",
                      "/some/:param/resource": "controller2#action2"});
    routing = wApp.router.pointRequest("/some/23/resource");
    expect(routing).toEqual("controller2#action2")
  });

  it("should not point me to partial coincidence", function(){
    wApp.router.addRoutes({"/some/:param/resource/action": "controller1#action1",
                      "/some/:param/resource": "controller2#action2"});
    routing = wApp.router.pointRequest("/some/23/resource");
    routes =  Object.keys(wApp.router.routes)
    expect(routes.length).toEqual(2);
    expect(routing).toEqual("controller2#action2")
  });
});
// xxxxxxxxxxxxxxxxxxxxxxEnd Router xxxxxxxxxxxxxxxxxxxxxxx
describe("Main App", function(){
  it("should extend it self to add controllers", function(){
     var usersController = {
        index: function(){return("Hello")}
      }

      var appsController = {
        index: function(){return("Hello2")}
      }

      wApp.extend({
        users: usersController,
        apps: appsController
      })
      expect(wApp["users"]["index"]()).toEqual("Hello")
      expect(wApp["apps"]["index"]()).toEqual("Hello2")
  });
});

describe("Request Object", function(){
  beforeEach(function(){
    wApp.router.params = {}
  });

  it("should decode the HTTP GET request", function(){
    httpGet = "GET /some/path/toresource HTTP/1.0"
    request = Request(httpGet);
    expect(request.verb).toEqual("GET");
    expect(request.path).toEqual("/some/path/toresource")
    expect(request.protocol).toEqual("HTTP/1.0")
    expect(request.url).toEqual("/some/path/toresource")
  });

  it("Should parse the query varibles in the url", function(){
    httpGet = "GET /some/path/toresource?foo=bar&hello=world HTTP/1.0"
    request = Request(httpGet);
    expect(request.encodeParams).toEqual("foo=bar&hello=world");
    expect(wApp.router.params.foo).toEqual("bar");
    expect(wApp.router.params.hello).toEqual("world");
  });

  it("should be able to handle a HTTP request with headers", function(){
    httpGet = "GET /some/path/toresource?foo=bar&hello=world HTTP/1.0\r\nContent-Type: application/json\r\nConnection: Keep-Alive\r\n"
    request = Request(httpGet);
    expect(request.encodeParams).toEqual("foo=bar&hello=world");
    expect(wApp.router.params.foo).toEqual("bar");
    expect(wApp.router.params.hello).toEqual("world");
    expect(request.headers["Content-Type"]).toEqual("application/json");
    expect(request.headers["Connection"]).toEqual("Keep-Alive");
  });

});


describe("Response Object", function(){

  beforeEach(function(){
      // Setting up an Application to test
      var usersController = {
        show: function(){return({hello: "world", id: wApp.router.params.userid, x: wApp.router.params.x})}
      }
      wApp.extend({ usersController: usersController })
      wApp.router.addRoutes({"/users/:userid/show": "users#show"});

      CRLF = "\r\n"
  });

  it("should find the proper action and give me the HTTP JSON response", function(){
    httpGet = "GET /users/44/show?x=foo HTTP/1.1"
    request = Request(httpGet);
    expected_resp = JSON.stringify({hello: "world", id: "44", x: wApp.router.params.x });
    response = Response(request);
    expect(typeof(response)).toEqual("string");
    expect(response.split("\r\n")[0]).toEqual("HTTP/1.1 200 OK");
    expect(response.split("\n\r\n")[1]).toEqual(expected_resp);
  });

  it("should set the proper headers for a JSON response", function(){
    httpGet = "GET /users/44/show?x=foo HTTP/1.1"
    request = Request(httpGet);
    response = Response(request);
    expect(response.split(CRLF)[2]).toEqual("Content-Type: application/json; charset=utf-8")
  });

  it("should able to handle JSONP request from JQuery", function(){
    httpGet = "GET /users/44/show?x=foo&callback=jQuery11224324 HTTP/1.1"
    request = Request(httpGet);
    response = Response(request);
    expected_resp = "jQuery11224324(" + JSON.stringify({hello: "world", id: "44", x: wApp.router.params.x }) + ")";
    expect(response.split(CRLF)[2]).toEqual("Content-Type: application/javascript; charset=utf-8")
    expect(response.split("\n\r\n")[1]).toEqual(expected_resp);
  });

  it("should handle no matching urls", function(){
    httpGet = "GET /shops/44/show?x=foo HTTP/1.1"
    request = Request(httpGet);
    response = Response(request);
    expect(response).toEqual("HTTP/1.1 404 NOT FOUND")
  });

});

