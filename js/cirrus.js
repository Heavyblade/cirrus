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
                // if match returns ["/paht/:variable", "controller#method"]
                return([custom_route, x[custom_route]]);
              };
            };
        }
    }

//xxxxxxxxxxxxxxxxxxx Main Application Definition xxxxxxxx
    function App() {}

    App.prototype.extend =  function(m, e){
        var e = e || this;
        for (var x in m) e[x] = m[x];
        return e;
    };

    TheApp = new App;

// xxxxxxxxxxxxxxxxxxxxxxxxx Request Object xxxxxxxxxxxxxx
    function Request(http_request) {
      var request = http_request.split(" ");
      req = {verb: request[0], 
             path: request[1], 
             protocol: request[2], 
             url: request[1].split("?")[0], 
             encodeParams: request[1].split("?")[1] };

      // set the global params added to the URL
      if (typeof(req.encodeParams) != "undefined") {
        parse_params(decodeURIComponent(req.encodeParams).split("&"));
      }
      return(req);
    };

// xxxxxxxxxxxxxxxxxxxxxxxxx Response Object xxxxxxxxxxxxxx
  function Response(request) {
    // Get the route, asign params and call the action
    var actions = Router.pointRequest(request.url);
    var controllerAction = actions[1].split("#");
    var jsonresp = TheApp[(controllerAction[0] + "Controller")][controllerAction[1]]();

    var jsonresp = JSON.stringify(jsonresp);
    var CRLF = "\r\n"
    headers = ["HTTP/1.1 200 OK",
            ("Date: " + (new Date).toGMTString()), 
            "Content-Type: application/json; charset=utf-8", 
            ("Content-Length: " + jsonresp.length), 
            "Server: Velneo v7",
            "transfer-coding: chunked",	  
            "Keep-Alive: timeout=5, max=94",
            "Connection: Keep-Alive"]
    var reps = headers.join(CRLF) + CRLF + CRLF + jsonresp
    return (reps)
  }

