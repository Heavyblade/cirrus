// xxxxxxxxxx URI params into a object xxxxxxxxxxxxxxxxxxx
    var params = {}
    function parse_params(array){
      array.forEach(function(variable){
          subarray = variable.split("=");
          params[subarray[0]] = subarray[1];
      });
      return(params);
    };

// xxxxxxxxxxxxxxxx System Router xxxxxxxxxxxxxxxxxxxxxxxx
    var Router = {
        routes: {},
        addRoutes: function(rutes) {
            keys = Object.keys(rutes);
            var _this = this;
            keys.forEach(function(key){
                basic = {}
                basic[key] = rutes[key]
                _this.routes[key.replace(/:\w+/g, "(\\w+)")] = basic;
            });
        },
        pointRequest: function(url){
          url = url.replace("/", "\\/")
          keys = Object.keys(this.routes);
            keys_count = keys.length
            for(i=0; i < keys_count; i++){
              rutaRegExp = new RegExp((keys[i] + "\$"),"g")
              match = url.match(rutaRegExp)
              if (match){
                x = this.routes[keys[i]]; // Keys from the match object
                custom_route = Object.keys(x)[0];

                // extract URL params and Add it to global params
                var requestParams = custom_route.match(/:(\w+)/g);
                var requestVars = url.match(rutaRegx);
                var requestParams.forEach(function(param){params[param]=requestVars[requestParams.indexOf(param)]});

                // if match returns ["/paht/:variable", "controller#method"]
                return([custom_route, x[custom_route]]);
              };
            };
        }
    }

//xxxxxxxxxxxxxxxxxxx Main Application Def xxxxxxxxxxxxxxx
    function App() {}

    App.prototype.extend =  function(m, e){
        var e = e || this;
        for (var x in m) e[x] = m[x];
        return e;
    };

    TheApp = new App;

// xxxxxxxxxxxxxxxxxxxx App Code xxxxxxxxxxxxxxxxxxxxxxxxx

    var usersController = {
        index: function(){alert("hola")}
    }

// xxxxxxxxxxxxxxx Setting Up the application xxxxxxxxxxxx

    // custom routes controller#action
    Router.addRoutes({
        "/users/:some_param/action":  "users#index"
    });

    // Add Controllers and actionsz
    TheApp.extend({
      users: usersController
    })

// xxxxxxxxxxxxxxxxxxxxxxxxx Request Object xxxxxxxxxxxxxx
    function Request(http_request) {
      var request = http_request.split(" ");
      req = {verbo: request[0], 
             path: request[1], 
             protocolo: request[2], 
             url: request[1].split("?")[0], 
             encodeParams: request[1].split("?")[0] };

      // set the global params added to the URL
      parse_params(decodeURIComponent(req.encodeParams.split("&")));
      return(req);
    };

// xxxxxxxxxxxxxxxxxxxxxxxxx Response Object xxxxxxxxxxxxxx
  function Response(request) {
    // Get the route, asign params and call the action
    actions = Router.pointRequest(request.url);
    controllerAction = actions[1].split("#");
    resp = TheApp[(controllerAction[0] + "Controller")][controllerAction[1]]();
    return(JSON.stringify(resp));
  }

