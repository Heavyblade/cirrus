describe("Router Component", function(){

  beforeEach(function(){
    Router.routes = {};
    params = {}
  });

  it("Should be able to add simple routes", function(){
    Router.addRoutes({"/some/path/resource": "controller#action"})
    routes =  Object.keys(Router.routes)
    expect(routes.length).toEqual(1);
    expect(routes[0]).toEqual("/some/path/resource")
  });

  it("should be able to add a route with params", function(){
    Router.addRoutes({"/some/:param/resource": "controller#action"})
    routes =  Object.keys(Router.routes)
    expect(routes.length).toEqual(1);
    expect(routes[0]).toEqual("/some/(\\w+)/resource")
  });

  it("should point to me the properly controller#action", function(){
    Router.addRoutes({"/some/:param/resource": "controller1#action1",
                      "/path": "controller2#action1",
                      "some/43/resource": "controller3#action1"
    });

    routing = Router.pointRequest("/some/23/resource")
    expect(routing instanceof Array).toBeTruthy();
    expect(routing[0]).toEqual("/some/:param/resource")
    expect(routing[1]).toEqual("controller1#action1")
  });

  it("should able to add params to the global params scope", function(){
    Router.addRoutes({"/some/:id/resource/:userid/action": "controller1#action1"})
    routing = Router.pointRequest("/some/23/resource/42/action")
    expect(params.id).toEqual("23");
    expect(params.userid).toEqual("42");
  });

  it("should point me to the last coincidence", function(){
    Router.addRoutes({"/some/:param/resource": "controller1#action1",
                      "/some/:param/resource": "controller2#action2"});
    routing = Router.pointRequest("/some/23/resource");
    expect(routing[1]).toEqual("controller2#action2")
  });

  it("should not point me to partial coincidence", function(){
    Router.addRoutes({"/some/:param/resource/action": "controller1#action1",
                      "/some/:param/resource": "controller2#action2"});
    routing = Router.pointRequest("/some/23/resource");
    routes =  Object.keys(Router.routes)
    expect(routes.length).toEqual(2);
    expect(routing[1]).toEqual("controller2#action2")
  });
});

describe("Main App", function(){
  it("should extend it self to add controllers", function(){
     var usersController = {
        index: function(){return("Hello")}
      }

      TheApp.extend({
        users: usersController
      })
      expect(TheApp["users"]["index"]()).toEqual("Hello")
  });
});

describe("Request Object", function(){
  beforeEach(function(){
    params = {}
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
    expect(params.foo).toEqual("bar");
    expect(params.hello).toEqual("world");
  });

});


describe("Response Object", function(){

  beforeEach(function(){
      // Setting up an Application to test
      var usersController = {
        show: function(){return({hello: "world", id: params.userid, x: params.x})}
      }
      TheApp.extend({ usersController: usersController })
      Router.addRoutes({"/users/:userid/show": "users#show"});
      CRLF = "\r\n"
  });

  it("should find the proper action and give me the HTTP JSON response", function(){
    httpGet = "GET /users/44/show?x=foo HTTP/1.0"
    request = Request(httpGet);
    expected_resp = JSON.stringify({hello: "world", id: "44", x: params.x });
    response = Response(request);
    expect(typeof(response)).toEqual("string");
    expect(response.split("\r\n")[0]).toEqual("HTTP/1.0 200 ok");
    expect(response.split("\n\r\n")[1]).toEqual(expected_resp);
  });

  it("should set the proper headers for a JSON response", function(){
    httpGet = "GET /users/44/show?x=foo HTTP/1.0"
    request = Request(httpGet);
    response = Response(request);
    expect(response.split(CRLF)[1]).toEqual("Content-Type: text/json")
  });

});

