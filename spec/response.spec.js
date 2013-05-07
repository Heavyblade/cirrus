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

    expect(response.split("\r\n")[0]).toEqual("HTTP/1.O 500  INTERNAL SERVER ERROR")
    expect(response.split("\r\n\r\n")[1]).toEqual(expectedResponse);
  });

});

