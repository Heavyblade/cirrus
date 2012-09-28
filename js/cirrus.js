//xxxxxxxxxxxxxxxxxxx Main Application Definition xxxxxxxx
    function App() {
      // System Router

      this.router = {
          params: {},
          parse_params: function(array) {
              var keys = array.length;
              while(keys--) {
                  var subarray = array[keys].split("=");
                  this.params[subarray[0]] = subarray[1];
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
                    this.routes[key.replace(/:\w+/g, "(\\w+)")] = basic;
                  }
              }
          },
          createREST: function(resource) {
            var rest = {}
            rest["GET /" + resource] = resource + "#index"
            rest["GET /" + resource + "/new"] = resource + "#new"
            rest["POST /" + resource] = resource + "#create"
            rest["GET /" + resource + "/:id"] = resource + "#show"
            rest["GET /" + resource + "/:id/edit"] = resource + "#edit"
            rest["PUT /" + resource + "/:id"] = resource + "#update"
            rest["DELETE /" + resource + "/:id"] = resource + "#delete"
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
      }
      this.params = this.router.params   
    }

    App.prototype.extend =  function(m, e){
        var e = e || this;
        for (var x in m) e[x] = m[x];
        return e;
    };

    wApp = new App

// xxxxxxxxxxxxxxxxxxxxxxxxx Request Object xxxxxxxxxxxxxx
    function Request(http_request) {
      var headAndBody = http_request.split("\r\n\r\n") //split header from body

      var headers = headAndBody[0].split("\r\n")
      var request = headers[0].split(" ");
      headers.shift(); //delete the request
      

      var req = {verb: request[0], 
             path: request[1], 
             protocol: request[2], 
             url: request[1].split("?")[0], 
             encodeParams: request[1].split("?")[1],
             headers: {},
             body: {} };

      // Setting the request Headers
      if(headers.length != 0) {
          var i = headers.length;
          while(i--) {
              var header = headers[i].split(":")
              req["headers"][header[0].trim()] = header[1].trim();
          }
      }

      if ((headAndBody.length == 2) && (headAndBody[headAndBody.length -1] != "")) {
          req.body = decodeURIComponent(headAndBody[1])
          var array = req.body.split("&");

          var keys = array.length;
          wApp.router.params.body = {}
          while(keys--) {
                var subarray = array[keys].split("=");
                wApp.router.params.body[subarray[0]] = subarray[1].replace(/\+/g, " ");
          };
      }

      // set the global params added to the URL
      if (typeof(req.encodeParams) != "undefined") {
        wApp.router.parse_params(decodeURIComponent(req.encodeParams).split("&"));
      }
      return(req);
    };

// xxxxxxxxxxxxxxxxxxxx Response Object xxxxxxxxxxxxxxxxxxx
  function Response(request) {
    var actions = wApp.router.pointRequest(request.verb + " " + request.url);
    if(actions != "NOT FOUND") {
      var controllerAction = actions.split("#");
      var resp = renderResponse(controllerAction[0], controllerAction[1])
    } else {
      var resp = "HTTP/1.1 404 NOT FOUND"
    };
    return (resp);
  };

  function renderResponse(controller, action) {
      var CRLF = "\r\n";
      var jsonresp = wApp[(controller)][action](wApp.router.params);
      var jsonp = wApp.router.params.callback;
      var jsonresp = jsonp ? (jsonp + "(" + JSON.stringify(jsonresp) + ")") : JSON.stringify(jsonresp)
      jsonresp = unescape(encodeURIComponent(jsonresp));
      var headers = [("Date: " + (new Date).toGMTString()), 
                      ("Content-Type: application/" + (jsonp ? "javascript" : "json")  + "; charset=utf-8"), 
                      ("Content-Length: " + jsonresp.length), 
                      "Server: Velneo v7",
                      "transfer-coding: chunked",	  
                      "Keep-Alive: timeout=5, max=94",
                      "Connection: Keep-Alive"],
          verb = "HTTP/1.1 200 OK"   

      var fullResponse = verb + CRLF + headers.join(CRLF) + CRLF + CRLF + jsonresp
      return(fullResponse);
  };