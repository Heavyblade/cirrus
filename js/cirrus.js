// xxxxxxxxxxxxxxxxxxx Base 64 Encode Libreary xxxxxxxxxxxx
function StringBuffer(){this.buffer=[]}StringBuffer.prototype.append=function(a){this.buffer.push(a);return this};StringBuffer.prototype.toString=function(){return this.buffer.join("")};
var Base64={codex:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(a){for(var c=new StringBuffer,a=new Utf8EncodeEnumerator(a);a.moveNext();){var b=a.current;a.moveNext();var d=a.current;a.moveNext();var e=a.current,h=b>>2,b=(b&3)<<4|d>>4,g=(d&15)<<2|e>>6,f=e&63;isNaN(d)?g=f=64:isNaN(e)&&(f=64);c.append(this.codex.charAt(h)+this.codex.charAt(b)+this.codex.charAt(g)+this.codex.charAt(f))}return c.toString()},decode:function(a){for(var c=new StringBuffer,a=new Base64DecodeEnumerator(a);a.moveNext();){var b=
a.current;if(128>b)c.append(String.fromCharCode(b));else if(191<b&&224>b){a.moveNext();var d=a.current;c.append(String.fromCharCode((b&31)<<6|d&63))}else a.moveNext(),d=a.current,a.moveNext(),c.append(String.fromCharCode((b&15)<<12|(d&63)<<6|a.current&63))}return c.toString()}};function Utf8EncodeEnumerator(a){this._input=a;this._index=-1;this._buffer=[]}
Utf8EncodeEnumerator.prototype={current:Number.NaN,moveNext:function(){if(0<this._buffer.length)return this.current=this._buffer.shift(),!0;if(this._index>=this._input.length-1)return this.current=Number.NaN,!1;var a=this._input.charCodeAt(++this._index);13==a&&10==this._input.charCodeAt(this._index+1)&&(a=10,this._index+=2);128>a?this.current=a:(127<a&&2048>a?this.current=a>>6|192:(this.current=a>>12|224,this._buffer.push(a>>6&63|128)),this._buffer.push(a&63|128));return!0}};
function Base64DecodeEnumerator(a){this._input=a;this._index=-1;this._buffer=[]}
Base64DecodeEnumerator.prototype={current:64,moveNext:function(){if(0<this._buffer.length)return this.current=this._buffer.shift(),!0;if(this._index>=this._input.length-1)return this.current=64,!1;var a=Base64.codex.indexOf(this._input.charAt(++this._index)),c=Base64.codex.indexOf(this._input.charAt(++this._index)),b=Base64.codex.indexOf(this._input.charAt(++this._index)),d=Base64.codex.indexOf(this._input.charAt(++this._index)),e=(b&3)<<6|d;this.current=a<<2|c>>4;64!=b&&this._buffer.push((c&15)<<
4|b>>2);64!=d&&this._buffer.push(e);return!0}};

//xxxxxxxxxxxxxxxxxxx Main Application Definition xxxxxxxxx
  wApp = {
    // System Router
    router: {
        params: {body: {}},
        parse_params: function(array) {
            var keys = array.length;
            while(keys--) {
                var subarray = array[keys].split("=");
                this.params[subarray[0]] = subarray[1].replace(/\+/g, " ");
            };
        },
        routes: {},
        addRoutes: function (rutes) {
            var keys = Object.keys(rutes),
                i = keys.length;
            while(i--) {
                if(keys[i].split(" ")[0] == "resource") {
                  var rest = this.createREST(keys[i].split(" ")[1]);
                  this.addRoutes(rest)      
                } else {
                  var basic = {},
                      key = keys[i];
                  basic[key] = rutes[key];
                  this.routes[key.replace(/:\w+/g, "(\\d+)")] = basic;
                }
            }
        },
        createREST: function(resource) {
          var rest = {}
          rest["GET /" + resource] = resource + "Controller#index"
          rest["GET /" + resource + "/new"] = resource + "Controller#new"
          rest["POST /" + resource] = resource + "Controller#create"
          rest["GET /" + resource + "/:id"] = resource + "Controller#show"
          rest["GET /" + resource + "/:id/edit"] = resource + "Controller#edit"
          rest["PUT /" + resource + "/:id"] = resource + "Controller#update"
          rest["DELETE /" + resource + "/:id"] = resource + "Controller#delete"
          return(rest)
        },
        pointRequest: function (url) {
            keys = Object.keys(this.routes);
            var i = keys.length;
            while(i--) {
              var rutaRegExp = new RegExp((keys[i].replace(/\//g, "\\/") + "\$"));
              var match = url.match(rutaRegExp);

              if (match){
                var x = this.routes[keys[i]]; // Keys from the match object
                var custom_route = Object.keys(x)[0];

                // extract URL params and Add it to global params
                var requestParams = custom_route.match(/:(\w+)/g);
                if (requestParams) {
                  var requestVars = url.match(rutaRegExp);
                  requestVars.shift();
                  var i = requestParams.length;
                  while(i--) { var param = requestParams[i]; this.params[param.replace(":", "")]=requestVars[requestParams.indexOf(param)]}
                }
                // if match returns "controller#method"
                return(x[custom_route]);
              };
            };
            return("NOT FOUND");
        }
    },
    cookie_name: "v7App",
    cookie: {session: {}},
    session: {},
    oldcookie: {session: {}},
    sessionChanged: false,
    setInSession: function (key, value) {
      this.sessionChanged = true;
      wApp.session[key] = value;
    },
    setSession: function(options) {
        if (Object.keys(this.session).length != 0) {
          var expires = this.session.expires
          var path = this.session.path
          delete this.session["expires"]
          delete this.session["path"]

          var encoded = Base64.encode(encodeURIComponent(JSON.stringify(this.session)))
        } else {
          var expires = undefined
          var path = undefined
          var enconded = ""
        }

        var cookie = wApp.cookie_name + "=" + encoded
        if(expires != undefined) {cookie += ("; " + "expires=" + expires.toGMTString())}
        if(path != undefined) {cookie += ("; " + "path=" + path)}

        return("set-Cookie: " + cookie);
    },
    getSession: function(cookie) { 
      var regexp = new RegExp(wApp.cookie_name + "=(\\w+)\\;?")
      var myCookie = {},
          cookie_name = wApp.cookie_name

      var matched_cookie = cookie.match(regexp)
      if(matched_cookie) {
        myCookie[cookie_name] = matched_cookie[1]
        myCookie.session = JSON.parse(decodeURIComponent(Base64.decode(myCookie[cookie_name])));
        this.cookie = myCookie
        this.session = myCookie.session
      }
      return(myCookie[cookie_name]);
    },
    params: function(){return(this.router.params);}   
  }

// xxxxxxxxxxxxxxxxxxxxxxxxx HTTP Parser xxxxxxxxxxxxxx
function http_parser(http_request, type) {
  var split_request = http_request.split("\r\n\r\n") //split header from body
  var response = /(HTTP\/1\.[1|0]) (\d{3}) (.+)/

  var request = split_request[0].match(/^(GET|POST|PUT|DELETE|UPDATE) (.+) (.+)[\r\n]?/),
      headers = split_request[0].replace(/^(GET|POST|PUT|DELETE|UPDATE) (.+) (.+)[\r\n]?/, ""),
      header_regx = /(.+): (.+)/g,
      body_params_regx = /([^&]+)=([^&]+)/g,
      url_and_params = request[2].split("?"),
      req = {verb: request[1], 
           path: request[2], 
           protocol: request[3], 
           url: url_and_params[0], 
           encodeParams: url_and_params[1],
           decodeParams:{},
           headers: {},
           body: {},
           bodyDecoded: {},
           cookie: ""};

  // Setting Headers
  while(header = header_regx.exec(headers)) { req.headers[header[1]] = header[2];}

  // Get the Query String
  var params = decodeURIComponent(req.encodeParams).replace(/\+/g, " ");
  if(req.encodeParams) { while(param = body_params_regx.exec(params)) {req.decodeParams[param[1]] = param[2];} }

  // Body params if any
  if(split_request.length == 2) { 
    params = req.body = decodeURIComponent(split_request[1].trim().replace(/\+/g, " "));
    while(body = body_params_regx.exec(params)) { req.bodyDecoded[body[1]] = body[2];} 
  }
  return(req);
}

// xxxxxxxxxxxxxxxxxxxxxxxxx Request Object xxxxxxxxxxxxxx
    function Request(http_request) {
        var req = http_parser(http_request);
        wApp.router.params = req.decodeParams
        wApp.router.params.body = req.bodyDecoded
        // Set Cookie
        if(req.headers["Cookie"] != undefined) {
          wApp.getSession(req.headers["Cookie"]);
        }
        return(req);
    };

// xxxxxxxxxxxxxxxxxxxx Response Object xxxxxxxxxxxxxxxxxxx
  var BasicHeaders =[ "Server: Velneo v7",
                      "transfer-coding: chunked",	
                      "Keep-Alive: timeout=5, max=94",
                      "Connection: Keep-Alive"]
  function Response(request) {
    try {
          var actions = wApp.router.pointRequest(request.verb + " " + request.url);
          if(actions != "NOT FOUND") {
            var controllerAction = actions.split("#");
            var resp = renderResponse(controllerAction[0], controllerAction[1], wApp)
          } else {
            var resp = "HTTP/1.0 404 NOT FOUND"
          };
          return (resp);
    } catch(e) {
      // Sending Internal Message Error with info
      var errorDesc = logError(e)
      return(renderErrorResponse(e, errorDesc));
    }
  };

  function renderResponse(controller, action, wApp) {
      var CRLF = "\r\n";
      var jsonresp = wApp[(controller)][action](wApp.router.params);
      var jsonp = wApp.router.params.callback;
      var jsonresp = jsonp ? (jsonp + "(" + JSON.stringify(jsonresp) + ")") : JSON.stringify(jsonresp)
      jsonresp = unescape(encodeURIComponent(jsonresp)); // Encode to UFT-8
      var headers = [("Date: " + (new Date).toGMTString()), 
                      ("Content-Type: application/" + (jsonp ? "javascript" : "json")  + "; charset=utf-8"), 
                      ("Content-Length: " + jsonresp.length), 
                      "Server: Velneo v7",
                      "transfer-coding: chunked",	
                      "Keep-Alive: timeout=5, max=94",
                      "Connection: Keep-Alive"],
          verb = "HTTP/1.1 200 OK"   
      if (wApp.sessionChanged) {headers.push(wApp.setSession())}
      var fullResponse = verb + CRLF + headers.join(CRLF) + CRLF + CRLF + jsonresp
      return(fullResponse);
  };


  function logError(e) {
     var toLog = (e.lineNumber == undefined) ? e.message : (e.message + ". In Line Number: " + e.lineNumber)
     alert(toLog);
     return(toLog);
  };

  function renderErrorResponse(e, errorDesc) {
      var CRLF = "\r\n";
      var jsonp = wApp.router.params.callback;
      var jsonresp = {message: errorDesc}
      var jsonresp = jsonp ? (jsonp + "(" + JSON.stringify(jsonresp) + ")") : JSON.stringify(jsonresp)
      jsonresp = unescape(encodeURIComponent(jsonresp)); // Encode to UFT-8

      var resp = "HTTP/1.O 500  INTERNAL SERVER ERROR" + CRLF + BasicHeaders.join(CRLF) + CRLF + CRLF + jsonresp
      return(resp)
  };
