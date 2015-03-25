// xxxxxxxxxxxxxxxxxxx Base 64 Encode Libreary xxxxxxxxxxxx
function StringBuffer(){this.buffer=[]}StringBuffer.prototype.append=function(a){this.buffer.push(a);return this};StringBuffer.prototype.toString=function(){return this.buffer.join("")};
var Base64={codex:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(a){for(var c=new StringBuffer,a=new Utf8EncodeEnumerator(a);a.moveNext();){var b=a.current;a.moveNext();var d=a.current;a.moveNext();var e=a.current,h=b>>2,b=(b&3)<<4|d>>4,g=(d&15)<<2|e>>6,f=e&63;isNaN(d)?g=f=64:isNaN(e)&&(f=64);c.append(this.codex.charAt(h)+this.codex.charAt(b)+this.codex.charAt(g)+this.codex.charAt(f))}return c.toString()},decode:function(a){for(var c=new StringBuffer,a=new Base64DecodeEnumerator(a);a.moveNext();){var b=
a.current;if(128>b)c.append(String.fromCharCode(b));else if(191<b&&224>b){a.moveNext();var d=a.current;c.append(String.fromCharCode((b&31)<<6|d&63))}else a.moveNext(),d=a.current,a.moveNext(),c.append(String.fromCharCode((b&15)<<12|(d&63)<<6|a.current&63))}return c.toString()}};function Utf8EncodeEnumerator(a){this._input=a;this._index=-1;this._buffer=[]}
Utf8EncodeEnumerator.prototype={current:Number.NaN,moveNext:function(){if(0<this._buffer.length)return this.current=this._buffer.shift(),!0;if(this._index>=this._input.length-1)return this.current=Number.NaN,!1;var a=this._input.charCodeAt(++this._index);13==a&&10==this._input.charCodeAt(this._index+1)&&(a=10,this._index+=2);128>a?this.current=a:(127<a&&2048>a?this.current=a>>6|192:(this.current=a>>12|224,this._buffer.push(a>>6&63|128)),this._buffer.push(a&63|128));return!0}};
function Base64DecodeEnumerator(a){this._input=a;this._index=-1;this._buffer=[]}
Base64DecodeEnumerator.prototype={current:64,moveNext:function(){if(0<this._buffer.length)return this.current=this._buffer.shift(),!0;if(this._index>=this._input.length-1)return this.current=64,!1;var a=Base64.codex.indexOf(this._input.charAt(++this._index)),c=Base64.codex.indexOf(this._input.charAt(++this._index)),b=Base64.codex.indexOf(this._input.charAt(++this._index)),d=Base64.codex.indexOf(this._input.charAt(++this._index)),e=(b&3)<<6|d;this.current=a<<2|c>>4;64!=b&&this._buffer.push((c&15)<<
4|b>>2);64!=d&&this._buffer.push(e);return!0}};

var CRLF = "\r\n";

describe("Flash session handling", function() {
  beforeEach(function(){
      theRoot.vars          = {};
      wApp.router.routes    = [];
      wApp.router.rexRoutes = [];
      wApp.session.cookie   = {};
      wApp.session.session  = {};
      wApp.session.changed  = false;

      // Setting up an Application to test
      wApp.usersController = {
        show: function(params){return({hello: "world", id: wApp.router.params.userid, x: wApp.router.params.x})}
      };

      wApp.router.addRoutes({"GET /users/:userid/show": "usersController#show"});
  });


  it("it should set the flash in the session", function() {
      // Setting up an Application to test
      wApp.usersController = {
        show: function(params){ wApp.session.flash["notice"] = "Hola Mundo" ; return({}); }
      };

      wApp.router.addRoutes({"GET /users/:userid/show": "usersController#show"});
      var httpGet = "GET /users/20/show HTTP/1.0\r\nContent-Type: application/json\r\nConnection: Keep-Alive\r\n\r\n";
      wApp.session.flash["notice"] = "Hola Mundo";
      var request = wApp.request(httpGet);
      var cookie = wApp.session.setInHeader();

      var expected_cookie = wApp.session.cookie_name + "=" + Base64.encode(encodeURIComponent(JSON.stringify({flash: {notice: "Hola Mundo"}})));
      expect(cookie).toEqual("set-Cookie: " + expected_cookie);
  });


});

describe("Cookies handling", function(){
  beforeEach(function(){
      theRoot.vars = {};
      wApp.router.routes = [];
      wApp.router.rexRoutes = [];
      wApp.session.cookie = {};
      wApp.session.session = {};
      wApp.session.flash = {};
      wApp.session.changed = false;

      // Setting up an Application to test
      wApp.usersController = {
        show: function(params){return({hello: "world", id: wApp.router.params.userid, x: wApp.router.params.x})}
      }
      wApp.router.addRoutes({"GET /users/:userid/show": "usersController#show"});

      var cookie = wApp.session.cookie_name + "=" + Base64.encode(encodeURIComponent(JSON.stringify({name: "JhonDoe", spaces: "Jhon Doe"}))) + ";";
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
  });

  it("should be able to add the flash objects to the session", function() {
      
    
  });

  describe("Setting the cookie header", function(){
    beforeEach(function(){
      wApp.router.routes = [];
      wApp.router.rexRoutes = [];
      wApp.router.params = {};
      theRoot.vars = {};
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

