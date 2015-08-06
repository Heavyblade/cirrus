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
    wApp.router.routes = [];
    wApp.router.rexRoutes = [];
    theRoot.vars = {};
  });

  it("should decode the HTTP GET request", function(){
    var httpGet = "GET /some/path/toresource HTTP/1.0\r\n\r\n"
    var request = wApp.request(httpGet);
    expect(request.verb).toEqual("GET");
    expect(request.path).toEqual("/some/path/toresource")
    expect(request.protocol).toEqual("HTTP/1.0")
    expect(request.url).toEqual("/some/path/toresource")
  });

  it("Should parse the query variables in the url", function(){
    var httpGet = "GET /some/path/toresource?foo=bar&hello=world&sentence=one+sentence+space HTTP/1.0\r\n\r\n"
    var request = wApp.request(httpGet);
    expect(request.encodeParams).toEqual("foo=bar&hello=world&sentence=one+sentence+space");
    expect(wApp.router.params.foo).toEqual("bar");
    expect(wApp.router.params.hello).toEqual("world");
    expect(wApp.router.params.sentence).toEqual("one sentence space")
  });

  it("should be able to handle change HTTP method via _method param", function() {
    var httpGet = "POST /some/path/toresource?foo=bar&hello=world HTTP/1.0\r\nContent-Type: application/x-www-form-urlencoded\r\nConnection: Keep-Alive\r\n\r\n_method=put\r\n"
    var request = wApp.request(httpGet);
    expect(request.verb).toEqual("PUT");
  });

  it("should be able to handle a HTTP request with headers", function(){
    var httpGet = "GET /some/path/toresource?foo=bar&hello=world HTTP/1.0\r\nContent-Type: application/x-www-form-urlencoded\r\nConnection: Keep-Alive\r\n\r\n"
    var request = wApp.request(httpGet);
    expect(request.encodeParams).toEqual("foo=bar&hello=world");
    expect(wApp.router.params.foo).toEqual("bar");
    expect(wApp.router.params.hello).toEqual("world");
    expect(request.headers["Content-Type"]).toEqual("application/x-www-form-urlencoded");
    expect(request.headers["Connection"]).toEqual("Keep-Alive");
  });

  it("should be able to handle HTTP post with body", function () {
    var httpGet = "POST /some/path/toresource?foo=bar&hello=world HTTP/1.0\r\nContent-Type: application/x-www-form-urlencoded\r\nConnection: Keep-Alive\r\n\r\nname=john&lastname=doe\r\n"
    var request = wApp.request(httpGet);
    expect(request.body).toEqual("name=john&lastname=doe");
    expect(wApp.router.params.body.name).toEqual("john");
  });

  it("should be able to handle HTTP post with body on JSON format", function () {
    var httpGet = "POST /some/path/toresource?foo=bar&hello=world HTTP/1.0\r\nContent-Type: application/json\r\nConnection: Keep-Alive\r\n\r\n{\"name\":\"john\",\"lastname\":\"doe\"}\r\n";
    var request = wApp.request(httpGet);
    expect(request.body).toEqual("{\"name\":\"john\",\"lastname\":\"doe\"}");
    expect(wApp.router.params.body.name).toEqual("john");
  });

  it("should be able to handle blank spaces in body params", function(){
    var httpGet = "POST /some/path/toresource?foo=bar&hello=world HTTP/1.0\r\nContent-Type: application/x-www-form-urlencoded\r\nConnection: Keep-Alive\r\n\r\nname=john&lastname=doe+perez\r\n";
    var request = wApp.request(httpGet);
    expect(request.body).toEqual("name=john&lastname=doe perez");
    expect(wApp.router.params.body.name).toEqual("john");
    expect(wApp.router.params.body.lastname).toEqual("doe perez");
  });

  it("should be able to handle xml body post", function() {
    var httpGet = "POST /some/path/toresource?foo=bar&hello=world HTTP/1.0\r\nContent-Type: text/xml\r\nConnection: Keep-Alive\r\n\r\n<xml><node1>text</node2></xml>\r\n";
    var request = wApp.request(httpGet);
    expect(wApp.router.params.body).toEqual("<xml><node1>text</node2></xml>");
  });

  it("should handle array like params in body", function(){
    var httpGet = "POST /some/path/toresource?foo=bar&hello=world HTTP/1.0\r\nContent-Type: application/x-www-form-urlencoded\r\nConnection: Keep-Alive\r\n\r\nname=john&lastname=doeperez&name=second\r\n";
    var request = wApp.request(httpGet);
    expect(request.body).toEqual("name=john&lastname=doeperez&name=second");
    expect(wApp.router.params.body.name).toEqual(["john","second"]);
    expect(wApp.router.params.body.lastname).toEqual("doeperez");
  });

});
