theRoot = {}

describe("Response Object", function(){

  beforeEach(function(){
      wApp.router.routes = {};
      wApp.router.params = {}
      theRoot.vars = {};
      // Setting up an Application to test
      wApp.usersController = { show: function(params){return({hello: "world", id: wApp.router.params.userid, x: wApp.router.params.x})} }
      wApp.router.addRoutes({"GET /users/:userid/show": "usersController#show"});
      CRLF = "\r\n"
  });


  it("should find the proper action and give me the HTTP JSON response", function(){
    var httpGet = "GET /users/44/show?x=foo HTTP/1.1"
    var request = wApp.request(httpGet);
    var expected_resp = JSON.stringify({hello: "world", id: "44", x: wApp.router.params.x });
    var response = wApp.response(request);
    expect(typeof(response)).toEqual("string");
    expect(response.split("\r\n")[0]).toEqual("HTTP/1.1 200 OK");
    expect(response.split("\r\n\r\n")[1]).toEqual(expected_resp);
  });

  it("should render the proper HTTP headers to the response", function(){
    var httpGet = "GET /users/44/show?x=foo HTTP/1.1"
    var request = wApp.request(httpGet);
    var expected_resp = JSON.stringify({hello: "world", id: "44", x: wApp.router.params.x });
    var response = wApp.response(request);
    var headers = response.split("\r\n\r\n")[0].split("\r\n")
    expect(typeof(response)).toEqual("string");
    expect(headers[2].split(" ")[1]).toEqual("" + expected_resp.length);
  });

  it("should set the proper headers for a JSON response", function(){
    var httpGet = "GET /users/44/show?x=foo HTTP/1.1"
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expect(response.split(CRLF)[7]).toEqual("Content-Type: application/json; charset=utf-8")
  });

  it("should able to handle JSONP request from JQuery", function(){
    var httpGet = "GET /users/44/show?x=foo&callback=jQuery11224324 HTTP/1.1"
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expected_resp = "jQuery11224324(" + JSON.stringify({hello: "world", id: "44", x: wApp.router.params.x }) + ")";
    expect(response.split(CRLF)[7]).toEqual("Content-Type: application/javascript; charset=utf-8")
    expect(response.split("\n\r\n")[1]).toEqual(expected_resp);
  });

  it("should handle no matching urls", function(){
    var httpGet = "GET /shops/44/show?x=foo HTTP/1.1"
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expect(response).toEqual("HTTP/1.0 404 NOT FOUND")
  });

  it("should calculate the proper Content-length", function() {
    var httpGet = "GET /users/44/show?x=foo HTTP/1.1"
    var request = wApp.request(httpGet);
    var expected_resp = JSON.stringify({hello: "world", id: "44", x: wApp.router.params.x });
    var response = wApp.response(request);
    expect(response.split("\r\n")[2]).toEqual("Content-Length: " + expected_resp.length);
  })

  it("should properly handle the internal errors and send the response", function(){

    wApp.usersController = { show: function(params){ i.dont.exist += 0 } }
    var httpGet = "GET /users/44/show?x=foo HTTP/1.1"
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    var expectedResponse = JSON.stringify({message: "i is not defined"})

    expect(response.split("\r\n")[0]).toEqual("HTTP/1.0 500  INTERNAL SERVER ERROR")
    expect(response.split("\r\n\r\n")[1]).toEqual(expectedResponse);
  });

});

describe("Handling HTML templates", function() {

  it("should be able to take the HTML from a path", function(){
    var path = "users/show"
    var result = wApp.getHTML(path);
    expect(result.type).toEqual("html");
  });

  it("should be able to render a template from path", function(){
    var path = "users/showtemp"
    var result = wApp.getHTML(path);
    expect(result.type).toEqual("template");
  });
});


describe("Handling standar html request", function(){

  beforeEach(function(){
      wApp.router.routes = {};
      wApp.router.params = {}
      theRoot.vars = {};
      // Setting up an Application to test
      wApp.usersController = {
        show: function(params){return({message: "Hello World"})},
        template: function(params){return({message: "Hello Template"})},
        edit: function(params){return({message: "Hello Template"})}
      }
      wApp.router.addRoutes({"GET /users/:userid/show": "usersController#show", 
                             "GET /users/:userid/template": "usersController#template",
                             "GET /users/:userid/edit": "usersController#edit",
                            });
      CRLF = "\r\n"
  });

  it("should render te proper template for the controller#action", function(){
    var httpGet = "GET /users/44/show HTTP/1.1\r\nAccept: text/html"
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expect(response.split("\r\n\r\n")[1]).toEqual("<div><h1>Hello World</h1></div>");
  });

  it("should render te proper template for the controller#action", function(){
    var httpGet = "GET /users/44/template HTTP/1.1\r\nAccept: text/html"
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expect(response.split("\r\n\r\n")[1]).toEqual("<div><h1>Hello Template</h1></div>");
  });

  it("should show a message with no-view template", function(){
    var httpGet = "GET /users/44/edit HTTP/1.1\r\nAccept: text/html"
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    var resp = "<div><h1>There is not view for this action</h1></div>" 
    expect(response.split("\r\n\r\n")[1]).toEqual(resp);
  });
});
