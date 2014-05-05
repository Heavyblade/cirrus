wApp = require("./../builds/cirrus.min.test.js");

describe("Router Component", function(){

  beforeEach(function(){
    wApp.router.routes = [];
    wApp.router.rexRoutes = [];
    wApp.router.params = {};
    theRoot.vars = {};
  });

  it("Should be able to add simple routes", function(){
    wApp.router.addRoutes({"GET /some/path/resource": "controller#action"});
    var routes =  wApp.router.routes;
    expect(routes.length).toEqual(1);
    expect(Object.keys(routes[0])[0]).toEqual("GET /some/path/resource");
  });

  it("should handle no matching routes", function(){
     wApp.router.addRoutes({"GET /some/path/resource": "controller#action"});
     var routing = wApp.router.pointRequest("GET /some/23/resource");
     expect(routing).toEqual("NOT FOUND");
  });

  it("should be able to add a route with params", function(){
    wApp.router.addRoutes({"GET /some/:param/resource": "controller#action"});
    var routes =  wApp.router.routes;
    expect(routes.length).toEqual(1);
    expect(wApp.router.rexRoutes[0]).toEqual(new RegExp("GET /some/([\\w]+)/resource\/?$", "i"));
  });

  it("should point to me the properly controller#action", function(){
    wApp.router.addRoutes({"GET /some/:param/resource": "controller1#action1",
                      "GET /path": "controller2#action1",
                      "GET some/43/resource": "controller3#action1"
    });

    var routing = wApp.router.pointRequest("GET /some/23/resource");
    expect(routing).toEqual("controller1#action1");
  });

  it("should able to add params to the global params scope", function(){
    wApp.router.addRoutes({"GET /some/:id/resource/:userid/action": "controller1#action1"});
    var routing = wApp.router.pointRequest("GET /some/23/resource/42/action");
    expect(wApp.router.params.id).toEqual("23");
    expect(wApp.router.params.userid).toEqual("42");
  });
  
  it("should able to add alpha numeric vars to params scope", function(){
    wApp.router.addRoutes({"GET /some/:cosa": "controller1#action1"});
    var routing = wApp.router.pointRequest("GET /some/cristian");
    expect(wApp.router.params.cosa).toEqual("cristian");
  });

  it("should point me to the last coincidence on repited routes", function(){
    wApp.router.addRoutes({"GET /some/:param/resource": "controller1#action1",
                      "GET /some/:param/resource": "controller2#action2"});
    var routing = wApp.router.pointRequest("GET /some/23/resource");
    expect(routing).toEqual("controller2#action2");
  });

  it("should point me to the first coincidence on similar routes", function(){
    wApp.router.addRoutes({"GET /user/action": "controller1#action1",
                      "GET /user/:id": "controller2#action2"});
    var routing = wApp.router.pointRequest("GET /user/action");
    expect(routing).toEqual("controller1#action1");

    var routing = wApp.router.pointRequest("GET /user/g");
    expect(routing).toEqual("controller2#action2");
  });

  it("should not point me to partial coincidence", function(){
    wApp.router.addRoutes({"GET /some/:param/resource/action": "controller1#action1",
                      "GET /some/:param/resource": "controller2#action2"});
    var routing = wApp.router.pointRequest("GET /some/23/resource");
    var routes =  Object.keys(wApp.router.routes);
    expect(routes.length).toEqual(2);
    expect(routing).toEqual("controller2#action2");
  });

  it("should build REST routes for a resource", function() {
    var users = wApp.router.createREST("users");
    var router = Object.keys(users);
    expect(router[0]).toEqual("GET /users");
    expect(router[1]).toEqual("GET /users/new");
    expect(router[2]).toEqual("POST /users");
    expect(router[3]).toEqual("GET /users/:id");
    expect(router[4]).toEqual("GET /users/:id/edit");
    expect(router[5]).toEqual("PUT /users/:id");
    expect(router[6]).toEqual("DELETE /users/:id");
  });

  it("should add to router routes REST routes", function() {
    wApp.router.addRoutes({"resource users": "users", "GET /users/anotheraction": "usersController#anotheraction"});
    var routing = Object.keys(wApp.router.routes);
    expect(routing.length).toEqual(8);
  });

  it("should be able to behave different depending on HTTP verb", function(){
    wApp.router.addRoutes({"resource users": "users"});
    wApp.usersController = {
      index: function(params) { return({method: "I'm Index"});},
      create: function(params) { return({method: "I'm create"});}
    };
    var response = wApp.response(wApp.request("GET /users HTTP/1.0\r\n\r\n"));
    expect(response.split("\n\r\n")[1]).toEqual(JSON.stringify({method: "I'm Index"}));
    var response = wApp.response(wApp.request("POST /users HTTP/1.0\r\n\r\n"));
    expect(response.split("\n\r\n")[1]).toEqual(JSON.stringify({method: "I'm create"}));
  });

  it("should be able to handle case insensitive urls", function(){
    wApp.router.addRoutes({"/helloworld": "usersController#index"});
    wApp.usersController = {
      index: function(params) { return({method: "I'm Index"});}
    };
    var response = wApp.response(wApp.request("GET /helloWorld HTTP/1.0\r\n\r\n"));
    expect(response.split("\n\r\n")[1]).toEqual(JSON.stringify({method: "I'm Index"}));
  });

  it("should be able to handle urls ended in /", function(){
    wApp.router.addRoutes({"/helloworld": "usersController#index"});
    wApp.usersController = {
      index: function(params) { return({method: "I'm Index"});}
    };
    var response = wApp.response(wApp.request("GET /helloWorld/ HTTP/1.0\r\n\r\n"));
    expect(response.split("\n\r\n")[1]).toEqual(JSON.stringify({method: "I'm Index"}));
  });

  it("should be able to point request with out extension", function(){
    wApp.router.addRoutes({"GET /some_url": "statiController#index"});
    wApp.statiController = {
      index: function(params) { return({method: "I'm Index"});}
    };
    var response = wApp.response(wApp.request("GET /some_url.json HTTP/1.0\r\n\r\n"));
    expect(response.split("\n\r\n")[1]).toEqual(JSON.stringify({method: "I'm Index"}));
  });


  it("Should be able to point to the proper asset resource with extension", function(){
    wApp.usersController = {
      show: function(params){return({message: "Hello World"})},
    }
    wApp.router.addRoutes({"GET /users/:userid/show": "usersController#show"});

    var httpGet = "GET /users/44/show.html HTTP/1.1\r\n";
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expect(response.split("\r\n\r\n")[1]).toEqual("<html><head></head><body><div><h1>Hello World</h1></div></body></html>");
  });

  it("should map a .pro route to a process", function(){
    wApp.router.addRoutes({"GET /some_url.pro": "box/process"});
    var process = wApp.router.pointRequest("GET /some_url.pro");
    expect(process).toEqual("box/process");
    var process = wApp.router.pointRequest("GET /some_url.pro/");
    expect(process).toEqual("box/process");
  });

  it("should map a .bus route to a process", function(){
    wApp.router.addRoutes({"GET /some_url.bus": "box/query"});
    var process = wApp.router.pointRequest("GET /some_url.bus");
    expect(process).toEqual("box/query");
    var process = wApp.router.pointRequest("GET /some_url.bus/");
    expect(process).toEqual("box/query");
  });
});
