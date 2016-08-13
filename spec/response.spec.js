theRoot = {};
// xxxxxxxxxxxxxxxxxxx Base 64 Encode Libreary xxxxxxxxxxxx
function StringBuffer(){this.buffer=[]}StringBuffer.prototype.append=function(a){this.buffer.push(a);return this};StringBuffer.prototype.toString=function(){return this.buffer.join("")};
var Base64={codex:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(a){for(var c=new StringBuffer,a=new Utf8EncodeEnumerator(a);a.moveNext();){var b=a.current;a.moveNext();var d=a.current;a.moveNext();var e=a.current,h=b>>2,b=(b&3)<<4|d>>4,g=(d&15)<<2|e>>6,f=e&63;isNaN(d)?g=f=64:isNaN(e)&&(f=64);c.append(this.codex.charAt(h)+this.codex.charAt(b)+this.codex.charAt(g)+this.codex.charAt(f))}return c.toString()},decode:function(a){for(var c=new StringBuffer,a=new Base64DecodeEnumerator(a);a.moveNext();){var b=
a.current;if(128>b)c.append(String.fromCharCode(b));else if(191<b&&224>b){a.moveNext();var d=a.current;c.append(String.fromCharCode((b&31)<<6|d&63))}else a.moveNext(),d=a.current,a.moveNext(),c.append(String.fromCharCode((b&15)<<12|(d&63)<<6|a.current&63))}return c.toString()}};function Utf8EncodeEnumerator(a){this._input=a;this._index=-1;this._buffer=[]}
Utf8EncodeEnumerator.prototype={current:Number.NaN,moveNext:function(){if(0<this._buffer.length)return this.current=this._buffer.shift(),!0;if(this._index>=this._input.length-1)return this.current=Number.NaN,!1;var a=this._input.charCodeAt(++this._index);13==a&&10==this._input.charCodeAt(this._index+1)&&(a=10,this._index+=2);128>a?this.current=a:(127<a&&2048>a?this.current=a>>6|192:(this.current=a>>12|224,this._buffer.push(a>>6&63|128)),this._buffer.push(a&63|128));return!0}};
function Base64DecodeEnumerator(a){this._input=a;this._index=-1;this._buffer=[]}
Base64DecodeEnumerator.prototype={current:64,moveNext:function(){if(0<this._buffer.length)return this.current=this._buffer.shift(),!0;if(this._index>=this._input.length-1)return this.current=64,!1;var a=Base64.codex.indexOf(this._input.charAt(++this._index)),c=Base64.codex.indexOf(this._input.charAt(++this._index)),b=Base64.codex.indexOf(this._input.charAt(++this._index)),d=Base64.codex.indexOf(this._input.charAt(++this._index)),e=(b&3)<<6|d;this.current=a<<2|c>>4;64!=b&&this._buffer.push((c&15)<<
4|b>>2);64!=d&&this._buffer.push(e);return!0}};


describe("Response Object", function(){

  beforeEach(function(){
      wApp.router.routes = [];
      wApp.router.rexRoutes = [];
      wApp.router.params = {};
      theRoot.vars = {};
      // Setting up an Application to test
      wApp.usersController = { show: function(params){return({hello: "world", id: wApp.router.params.userid, x: wApp.router.params.x});} };
      wApp.router.addRoutes({"GET /users/:userid/show": "usersController#show"});
      CRLF = "\r\n";
  });


  it("should find the proper action and give me the HTTP JSON response", function(){
    var httpGet = "GET /users/44/show?x=foo HTTP/1.1";
    var request = wApp.request(httpGet);
    var expected_resp = JSON.stringify({hello: "world", id: "44", x: wApp.router.params.x });
    var response = wApp.response(request);
    expect(typeof(response)).toEqual("string");
    expect(response.split("\r\n")[0]).toEqual("HTTP/1.0 200 OK");
    expect(response.split("\r\n\r\n")[1]).toEqual(expected_resp);
  });

  it("should render the proper HTTP headers to the response", function(){
    var httpGet = "GET /users/44/show?x=foo HTTP/1.1";
    var request = wApp.request(httpGet);
    var expected_resp = JSON.stringify({hello: "world", id: "44", x: wApp.router.params.x });
    var response = wApp.response(request);
    var headers = response.split("\r\n\r\n")[0].split("\r\n");
    expect(typeof(response)).toEqual("string");
    expect(headers[2].split(" ")[1]).toEqual("" + expected_resp.length);
  });

  it("should set the proper headers for a JSON response", function(){
    var httpGet = "GET /users/44/show?x=foo HTTP/1.1";
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expect(response.split(CRLF)[4]).toEqual("Content-Type: application/json; charset=utf-8");
  });

  it("should able to handle JSONP request from JQuery", function(){
    var httpGet = "GET /users/44/show?x=foo&callback=jQuery11224324 HTTP/1.1";
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expected_resp = "jQuery11224324(" + JSON.stringify({hello: "world", id: "44", x: wApp.router.params.x }) + ")";
    expect(response.split(CRLF)[4]).toEqual("Content-Type: application/javascript; charset=utf-8");
    expect(response.split("\n\r\n")[1]).toEqual(expected_resp);
  });

  it("should handle no matching urls", function(){
    var httpGet = "GET /shops/44/show?x=foo HTTP/1.1";
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expect(response).toEqual("HTTP/1.0 404 NOT FOUND");
  });

  it("should calculate the proper Content-length", function() {
    var httpGet = "GET /users/44/show?x=foo HTTP/1.1";
    var request = wApp.request(httpGet);
    var expected_resp = JSON.stringify({hello: "world", id: "44", x: wApp.router.params.x });
    var response = wApp.response(request);
    expect(response.split("\r\n")[2]).toEqual("Content-Length: " + expected_resp.length);
  });

  it("should properly handle the internal errors and send the response", function(){

    wApp.usersController = { show: function(params){
      throw({message: "i is not defined"});
    } };
    var httpGet = "GET /users/44/show?x=foo HTTP/1.1";
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    var expectedResponse = JSON.stringify({message: "i is not defined"});

    expect(response.split("\r\n")[0]).toEqual("HTTP/1.0 500 INTERNAL SERVER ERROR");
  });

  it("should send the allowed verbs when options action is requested", function(){
    var httpGet = "OPTIONS / HTTP/1.0";
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expect(response.split("\r\n")[0]).toEqual("HTTP/1.0 204 OK");
    expect(response.split("\r\n")[3]).toEqual("Access-Control-Allow-Methods: GET, POST, PUT, HEAD, OPTIONS, DELETE");
  });

  it("should render custom response code and message when present", function(){
      wApp.usersController = { show: function(params){return({hello: "world", responseCode: {code: "700", message: "CUSTOM MESSAGE"}});} };
      var httpGet = "GET /users/44/show?x=foo HTTP/1.1";
      var request = wApp.request(httpGet);
      var response = wApp.response(request);
      expect(response.split("\r\n")[0]).toEqual("HTTP/1.0 700 CUSTOM MESSAGE");
      expect(response.split("\r\n\r\n")[1]).toEqual(JSON.stringify({hello: "world"}));
  });

  it("should render with standar OK message when no present", function(){
      var httpGet = "GET /users/44/show?x=foo HTTP/1.1";
      var request = wApp.request(httpGet);
      var response = wApp.response(request);
      expect(response.split("\r\n")[0]).toEqual("HTTP/1.0 200 OK");
  });

  it("should be able to perform a before filter", function() {
      wApp.usersController.before = function(params) {
           params.current_user = 20;
           params.current_user_email = "johndoe@gmail.com";
           return(params);
      };

      wApp.usersController.show = function(params) {
           return(params);
      };

      var httpGet = "GET /users/44/show?x=foo HTTP/1.1";
      var request = wApp.request(httpGet);
      var response = wApp.response(request);
      expect(JSON.parse(response.split("\r\n\r\n")[1]).current_user).toEqual(20);
  });

  it("should be able to set custom headers on the response", function(){
      wApp.usersController.show = function(params){
        wApp.responseHeaders.set("Custom", "hello-world");
        wApp.responseHeaders.set("Custom2", "hello-world2");
        return({hello: "world"});
      };

      var httpGet = "GET /users/44/show?x=foo HTTP/1.1";
      var request = wApp.request(httpGet);
      var response = wApp.response(request);

      expect(response.split("\r\n\r\n")[0].split("\r\n")[5]).toEqual("Custom: hello-world");
      expect(response.split("\r\n\r\n")[0].split("\r\n")[6]).toEqual("Custom2: hello-world2");
  });

  it("should response with Unauthorized response for a required Authorization end-point", function(){
      wApp.usersController.show = function(params){ return({hello: "world"}); };
      wApp.usersController.authentication = {all: true, username: "pedro", password: "abc123"};

      var httpGet  = "GET /users/44/show.json HTTP/1.1";
      var request  = wApp.request(httpGet);
      var response = wApp.response(request);

      expect(response.split("\r\n\r\n")[0].split("\r\n")[0]).toEqual("HTTP/1.0 401 Unauthorized");
  });

  it("should allow request with valid authentication", function(){
      wApp.usersController.show = function(params){ return({hello: "world"}); };
      wApp.usersController.authentication = {all: true, username: "pedro", password: "abc123"};

      var header   = "Authorization: Basic " + Base64.encode("pedro:abc123"),
          httpGet  = "GET /users/44/show.json HTTP/1.1\r\n" + header,
          request  = wApp.request(httpGet),
          response = wApp.response(request);

      expect(response.split("\r\n\r\n")[0].split("\r\n")[0]).toEqual("HTTP/1.0 200 OK");
      expect(response.split("\r\n\r\n")[1]).toEqual(JSON.stringify({hello: "world"}));
  });

  it("should block access for wrong Authentication params", function(){
      wApp.usersController.show = function(params){ return({hello: "world"}); };
      wApp.usersController.authentication = {all: true, username: "pedro", password: "xxxx"};

      var header   = "Authorization: Basic " + Base64.encode("pedro:abc123"),
          httpGet  = "GET /users/44/show.json HTTP/1.1\r\n" + header,
          request  = wApp.request(httpGet),
          response = wApp.response(request);

      expect(response.split("\r\n\r\n")[0].split("\r\n")[0]).toEqual("HTTP/1.0 401 Unauthorized");
  })
});

describe("Handling HTML templates", function() {

  it("should be able to take the HTML from a path", function(){
    var path = "/users/show";
    var result = wApp.getHTML(path);
    expect(result.type).toEqual("html");
  });

  it("should be able to render a template from path", function(){
    var path = "/users/showtemp";
    var result = wApp.getHTML(path);
    expect(result.type).toEqual("template");
  });
});


describe("Handling standar html request", function(){

  beforeEach(function(){
      wApp.router.routes = [];
      wApp.router.rexRoutes = [];
      wApp.router.params = {};
      theRoot.vars = {};
      // Setting up an Application to test
      wApp.usersController = {
        show: function(params){return({message: "Hello World"});},
        template: function(params){return({message: "Hello Template"});},
        edit: function(params){return({message: "Hello Template"});}
      };
      wApp.router.addRoutes({"GET /users/:userid/show": "usersController#show",
                             "GET /users/:userid/template": "usersController#template",
                             "GET /users/:userid/edit": "usersController#edit",
                            });
      CRLF = "\r\n";
  });

  it("should render te proper template for the controller#action", function(){
    var httpGet = "GET /users/44/show HTTP/1.1\r\nAccept: text/html";
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expect(response.split("\r\n\r\n")[1]).toEqual("<html><head></head><body><div><h1>Hello World</h1></div></body></html>");
  });

  it("shoul render the proper template in a custom layout", function(){
    wApp.usersController = {
      show: function(params){return({message: "Hello World", layout: "dashboard"});}
    };
    var httpGet = "GET /users/44/show HTTP/1.1\r\nAccept: text/html";
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expect(response.split("\r\n\r\n")[1]).toEqual("<html><head><title>dashboard</title></head><body><div><h1>Hello World</h1></div></body></html>");
  });

  it("should be able to render the layout by passing the session info", function() {
    wApp.usersController = {
      show: function(params){
            wApp.session.set("hola", "mundo");
            return({message: "Hello World", layout: "template"});
      }
    };
    var httpGet = "GET /users/44/show HTTP/1.1\r\nAccept: text/html";
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expect(response.split("\r\n\r\n")[1]).toEqual("<html><head><title>template</title></head><body>mundo<div><h1>Hello World</h1></div></body></html>");

  });

  it("should render the proper template with out a layout ", function(){
    wApp.usersController = {
      show: function(params){return({message: "Hello World", layout: false});}
    };
    var httpGet = "GET /users/44/show HTTP/1.1\r\nAccept: text/html";
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expect(response.split("\r\n\r\n")[1]).toEqual("<div><h1>Hello World</h1></div>");
  });

  it("should render te proper template for the controller#action", function(){
    var httpGet = "GET /users/44/template HTTP/1.1\r\nAccept: text/html";
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expect(response.split("\r\n\r\n")[1]).toEqual("<html><head></head><body><div><h1>Hello Template</h1></div></body></html>");
  });

  it("should show a message with no-view template", function(){
    var httpGet = "GET /users/44/edit HTTP/1.1\r\nAccept: text/html";
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    var resp = "<html><head></head><body><div><h1>There is not view for this action</h1></div></body></html>";
    expect(response.split("\r\n\r\n")[1]).toEqual(resp);
  });

  it("should get assets css files from database", function(){
    var httpGet = "GET /public/css/application.css HTTP/1.1\r\nAccept: text/css";
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    var resp = 'body {backgrund-color}';
    expect(response.split("\r\n\r\n")[1]).toEqual(resp);
  });

  it("should get assets js files from database", function(){
    var httpGet = "GET /public/css/application.js HTTP/1.1\r\nAccept: text/css";
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    var resp = "function(){alert('hello world')}";
    expect(response.split("\r\n\r\n")[1]).toEqual(resp);
  });

  it("should give a 404 where js isn't on disk", function(){
    var httpGet = "GET /public/javascripts/no_js_file.js HTTP/1.1\r\nAccept: text/css";
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expect(response).toEqual("HTTP/1.0 404 NOT FOUND");
  });

  it("should give a 404 where css isn't on disk", function(){
    var httpGet = "GET /public/css/no_js_file.css HTTP/1.1\r\nAccept: text/css";
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expect(response).toEqual("HTTP/1.0 404 NOT FOUND");
  });

  it("should redirect to another page when needed", function(){
    wApp.usersController = {
      show: function(params){return({message: "Hello World", redirect_to: "/another_page"});}
    };
    var httpGet = "GET /users/44/show HTTP/1.1\r\nAccept: text/html";
    var request = wApp.request(httpGet);
    var response = wApp.response(request);
    expect(response.split("\r\n\r\n")[0].split("\r\n")[0]).toEqual("HTTP/1.0 302 Found");
    expect(response.split("\r\n\r\n")[0].split("\r\n")[4]).toEqual("location: /another_page");
  });

  it("should be able to render a raw html even if action controller isn't there", function(){
    var httpGet   = "GET /users/hello HTTP/1.1\r\nAccept: text/html",
        request   = wApp.request(httpGet),
        response  = wApp.response(request);

    expect(response.split("\r\n\r\n")[1]).toEqual("<html><head></head><body><div><h1>Hello World</h1></div></body></html>");
  });

});

describe("Rendering process", function(){
    it("Should render an exiting process", function(){});
    it("Should render a 500 error if process doesn't exists", function(){});
    it("should set vars to the process before executing", function(){});
    it("should give an empty string if result var doesn't exists", function(){});
});

describe("Rendering XML", function(){
   beforeEach(function(){
        wApp.router.routes = [];
        wApp.router.rexRoutes = [];
        wApp.router.params = {};
        theRoot.vars = {};
        // Setting up an Application to test
        wApp.standarController = {
          render: function(params){return({xml: "<xml version='1.0'><node1 var=1></node1></xml>"});}
        };
        wApp.router.addRoutes({"GET /render_xml": "standarController#render"});
        CRLF = "\r\n";
    });

   it("Should render an xml response on xml Accept", function() {
        var httpGet = "GET /render_xml HTTP/1.1\r\nAccept: text/xml";
        var request = wApp.request(httpGet);
        var response = wApp.response(request);
        expect(response.split("\r\n\r\n")[1]).toEqual("<xml version='1.0'><node1 var=1></node1></xml>");
   });

   it("should render xml response on xml extension", function(){
        var httpGet = "GET /render_xml.xml HTTP/1.1\r\nAccept: text/html";
        var request = wApp.request(httpGet);
        var response = wApp.response(request);
        expect(response.split("\r\n\r\n")[1]).toEqual("<xml version='1.0'><node1 var=1></node1></xml>");
   });

   it("should render the proper message when no xml info is given", function(){
        wApp.standarController = {
          render: function(params){return({other: "<xml version='1.0'><node1 var=1></node1></xml>"});}
        };

        var httpGet = "GET /render_xml.xml HTTP/1.1\r\nAccept: text/html";
        var request = wApp.request(httpGet);
        var response = wApp.response(request);
        expect(response.split("\r\n\r\n")[1]).toEqual("<?xml version='1.0' encoding='UTF-8'?><error version='1.0'>The JSON object should have an xml key</error>");
   });
});
