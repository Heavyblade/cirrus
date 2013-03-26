Base64 = require("./../libs/base64.js")
var CRLF = "\r\n"

describe("Cookies handling", function(){
  beforeEach(function(){
      wApp.router.routes = {};
      wApp.router.params = {};
      wApp.session.cookie = {}
      wApp.session.session = {}
      wApp.session.changed = false

      // Setting up an Application to test
      wApp.usersController = {
        show: function(params){return({hello: "world", id: wApp.router.params.userid, x: wApp.router.params.x})}
      }
      wApp.router.addRoutes({"GET /users/:userid/show": "usersController#show"});

      var cookie = wApp.cookie_name + "=" + Base64.encode(encodeURIComponent(JSON.stringify({name: "JhonDoe", spaces: "Jhon Doe"}))) + ";";
      var httpGet = "GET /some/path/toresource?foo=bar&hello=world HTTP/1.0\r\nContent-Type: application/json\r\nConnection: Keep-Alive\r\nCookie: " + cookie + "\r\n\r\n"
      var request = wApp.request(httpGet);
  });

  it("Should extract the cookie from the header and parse it", function(){
    expect(wApp.session.get("name")).toEqual("JhonDoe");
    expect(wApp.session.get("spaces")).toEqual("Jhon Doe");
  });

  it("should be able to identify if the cookie has changed by adding keys", function(){
    expect(wApp.session.changed).toBe(false);
    wApp.session.set("username", "Hello John"); 
    expect(wApp.session.changed).toBe(true);
  });

  it("should be able to identify if the cookie has changed by changing values", function(){
    expect(wApp.session.changed).toBe(false);
    wApp.session.set("name", "Peter");
    expect(wApp.session.changed).toBe(true);
  });

  it("should only take the cookie that belongs to the app", function(){
      wApp.router.params = {};
      wApp.session.cookie = {}
      wApp.session.session = {}

      var cookie =  "second_cookie=abc123";
      var httpGet = "GET /some/path/toresource?foo=bar&hello=world HTTP/1.0\r\nContent-Type: application/json\r\nConnection: Keep-Alive\r\nCookie: " + cookie + "\r\n\r\n"
      var request = wApp.request(httpGet);

      expect(Object.keys(wApp.session.cookie).length).toEqual(0);
  })

  describe("Setting the cookie header", function(){
    beforeEach(function(){
      wApp.router.routes = {};
      wApp.router.params = {};
      wApp.session.cookie = {session: {}}
      wApp.session.session = {}
      wApp.session.changed = false

      // Setting up an Application to test
      wApp.router.addRoutes({"GET /users/:userid/show": "usersController#show"});
    })

    it("should be able to indicate if cookie is or changed", function(){
      expect(wApp.session.changed).toBe(false);
    });

    it("should set the properly cookie header", function(){
      wApp.usersController = {
        show: function(params){
          wApp.session.set("username", "Hello John");
          return({hello: "world", id: wApp.router.params.userid, x: wApp.router.params.x})}
      }

      var httpGet = "GET /users/23/show HTTP/1.0\r\nContent-Type: application/json\r\nConnection: Keep-Alive\r\n\r\n"
      var request = wApp.request(httpGet);
      var response = wApp.response(request)
      var base = response.split(CRLF)[8].split(": ")[1].split(";")[0].split(wApp.session.cookie_name + "=")[1]
      var session = JSON.parse(decodeURIComponent(Base64.decode(base)));

      expect(response.split(CRLF)[8].split(": ")[0]).toEqual("set-Cookie")
      expect(session.username).toEqual("Hello John")
    })

    it("should set the path to apply the cookie", function(){
      wApp.usersController = {
        show: function(params){
          wApp.session.set("username", "Hello John");
          wApp.session.set("path", "/my_path");

          return({hello: "world", id: wApp.router.params.userid, x: wApp.router.params.x})}
      }

      var httpGet = "GET /users/23/show HTTP/1.0\r\nContent-Type: application/json\r\nConnection: Keep-Alive\r\n\r\n"
      var response = wApp.response(wApp.request(httpGet))

      base = response.split(CRLF)[8].split(": ")[1].split(";")[0].split(wApp.session.cookie_name + "=")[1]
      var session = JSON.parse(decodeURIComponent(Base64.decode(base)));
      var keys = Object.keys(session).length

      var cookie = response.split(CRLF)[8].split(": ")[1]
      var path = cookie.split(";")[1].split("=")[1]
      expect("/my_path").toEqual(path)
      expect(keys).toEqual(1)
    })

    it("should set the expires date to the cookie", function(){
      wApp.usersController = {
        show: function(params){
          wApp.session.set("username", "Hello John");
          var data = new Date("2012-12-31")
          wApp.session.set("expires", data)

          return({hello: "world", id: wApp.router.params.userid, x: wApp.router.params.x})}
      }

      var httpGet = "GET /users/23/show HTTP/1.0\r\nContent-Type: application/json\r\nConnection: Keep-Alive\r\n\r\n"
      var response = wApp.response(wApp.request(httpGet))

      // Get the session from cookie
      base = response.split(CRLF)[8].split(": ")[1].split(";")[0].split(wApp.session.cookie_name + "=")[1]
      var session = JSON.parse(decodeURIComponent(Base64.decode(base)));
      var keys = Object.keys(session).length

      var cookie = response.split(CRLF)[8].split(": ")[1]
      var date = cookie.split(";")[1].split("=")[1]
      expect("Mon, 31 Dec 2012 00:00:00 GMT").toEqual(date)
      expect(keys).toEqual(1);
    })

  })

});

