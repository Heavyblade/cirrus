// xxxxxxxxxx URI params into a object xxxxxxxxxxxxxxxxxxx
    params = {};
    function parse_params(array) {
      var keys = array.length;
      while(keys--) {
          var subarray = array[keys].split("=");
          params[subarray[0]] = subarray[1];
      };
      return (params);
    };

// xxxxxxxxxxxxxxxx System Router xxxxxxxxxxxxxxxxxxxxxxxx
    Router = {
        routes: {},
        addRoutes: function (rutes) {
            var keys = Object.keys(rutes),
                i = keys.length;
            while(i--) {
                var basic = {},
                    key = keys[i];
                basic[key] = rutes[key];
                this.routes[key.replace(/:\w+/g, "(\\w+)")] = basic;
            }
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
                  while(i--) { var param = requestParams[i]; params[param.replace(":", "")]=requestVars[requestParams.indexOf(param)]}
                }
                // if match returns "controller#method"
                return(x[custom_route]);
              };
            };
            return("NOT FOUND");
        }
    }

//xxxxxxxxxxxxxxxxxxx Main Application Definition xxxxxxxx
    function App() {}

    App.prototype.extend =  function(m, e){
        var e = e || this;
        for (var x in m) e[x] = m[x];
        return e;
    };

    wApp = new App;

// xxxxxxxxxxxxxxxxxxxxxxxxx Request Object xxxxxxxxxxxxxx
    function Request(http_request) {
      var headers = http_request.split("\r\n")
      var request = headers[0].split(" ");
      headers.shift(); //delete the verb
      headers.pop();  // delete the las \r\n

      var req = {verb: request[0], 
             path: request[1], 
             protocol: request[2], 
             url: request[1].split("?")[0], 
             encodeParams: request[1].split("?")[1],
             headers: {} };

      // Setting the request Headers
      if(headers.length != 0) {
          var i = headers.length;
          while(i--) {
              var header = headers[i].split(":")
              req["headers"][header[0].trim()] = header[1].trim();
          }
      }

      // set the global params added to the URL
      if (typeof(req.encodeParams) != "undefined") {
        parse_params(decodeURIComponent(req.encodeParams).split("&"));
      }
      return(req);
    };

// xxxxxxxxxxxxxxxxxxxxxxxxx Response Object xxxxxxxxxxxxxx
  function Response(request) {
    var actions = Router.pointRequest(request.url);

    if(actions != "NOT FOUND") {
      var controllerAction = actions.split("#");
      var resp = renderResponse(controllerAction[0], controllerAction[1])
    } else {
      var resp = "HTTP/1.1 404 NOT FOUND"
    };
    return (resp);
  }

  function renderResponse(controller, action) {
      var CRLF = "\r\n";
      var jsonresp = wApp[(controller + "Controller")][action]();
      var jsonp = params.callback;
      var headers = [("Date: " + (new Date).toGMTString()), 
                      ("Content-Type: application/" + (jsonp ? "javascript" : "json")  + "; charset=utf-8"), 
                      ("Content-Length: " + jsonresp.length), 
                      "Server: Velneo v7",
                      "transfer-coding: chunked",	  
                      "Keep-Alive: timeout=5, max=94",
                      "Connection: Keep-Alive"],
          verb = "HTTP/1.1 200 OK"

      var jsonresp = jsonp ? (jsonp + "(" + JSON.stringify(jsonresp) + ")") : JSON.stringify(jsonresp)

      var fullResponse = verb + CRLF + headers.join(CRLF) + CRLF + CRLF + jsonresp
      return(fullResponse);
  }
