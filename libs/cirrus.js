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
            }
        },
        routes: [],
        rexRoutes: [],
        addRoutes: function (rutes, type) {
            if ( Object.keys(this.routes).length === 0 || type == "rest") {
                var keys = Object.keys(rutes),
                    i = keys.length;
                while(i--) {
                    if(keys[i].split(" ")[0] == "resource") {
                      var rest = this.createREST(keys[i].split(" ")[1]);
                      this.addRoutes(rest, "rest");
                    } else {
                      var basic = {},
                          key = keys[i];
                      basic[key] = rutes[key];
                      var myRegex = new RegExp(key.replace(/:id/g, "(\\d+)").replace(/:\w+/g, "(\\w+)") + "\/?$", "i"); 
                      this.rexRoutes.push(myRegex);
                      this.routes.push(basic);
                    }
                }
            }
        },
        createREST: function(resource) {
          var rest = {};
          rest["GET /" + resource] = resource + "Controller#index";
          rest["GET /" + resource + "/new"] = resource + "Controller#new";
          rest["POST /" + resource] = resource + "Controller#create";
          rest["GET /" + resource + "/:id"] = resource + "Controller#show";
          rest["GET /" + resource + "/:id/edit"] = resource + "Controller#edit";
          rest["PUT /" + resource + "/:id"] = resource + "Controller#update";
          rest["DELETE /" + resource + "/:id"] = resource + "Controller#delete";
          return(rest);
        },
        pointRequest: function (url) {
            var i = this.rexRoutes.length;
            while(i--) {
              var rutaRegExp = this.rexRoutes[i];
              var match = url.match(rutaRegExp);

              if (match){
                var x = this.routes[i]; // Keys from the match object
                var custom_route = Object.keys(x)[0];

                // extract URL params and Add it to global params
                var requestParams = custom_route.match(/:(\w+)/g);
                if (requestParams) {
                  var requestVars = url.match(rutaRegExp);
                  requestVars.shift();
                  var z = requestParams.length;
                  while(z--) { var param = requestParams[z]; this.params[param.replace(":", "")]=requestVars[requestParams.indexOf(param)];}
                }
                // if match returns "controller#method"
                return(x[custom_route]);
              }
            }
            return("NOT FOUND");
        }
    },
    session: {
      cookie_name: "v7App",
      cookie: {session: {}},
      session: {},
      changed: false,
      set: function (key, value) {
        this.changed = true;
        this.session[key] = value;
        return(true);
      },
      get: function(key){
        return(this.session[key]);
      },
      setInHeader: function() {
          var expires;
          var path;
          var enconded = "";

          if (Object.keys(this.session).length !== 0) {
            expires = this.session.expires;
            path = this.session.path;
            delete this.session.expires;
            delete this.session.path;
            encoded = Base64.encode(encodeURIComponent(JSON.stringify(this.session)));
          }

          var cookie = this.cookie_name + "=" + encoded;
          if(expires !== undefined) {cookie += ("; " + "expires=" + expires.toGMTString());}
          if(path !== undefined) {cookie += ("; " + "path=" + path);}

          return("set-Cookie: " + cookie);
      },
      getFromHeader: function(cookie) { 
        var regexp = new RegExp(wApp.cookie_name + "=(\\w+)\\;?");
        var myCookie = {},
            cookie_name = wApp.cookie_name;

        var matched_cookie = cookie.match(regexp);
        if(matched_cookie) {
          myCookie[cookie_name] = matched_cookie[1];
          myCookie.session = JSON.parse(decodeURIComponent(Base64.decode(myCookie[cookie_name])));
          this.cookie = myCookie; // raw cookie + session
          this.session = myCookie.session;
        }
        return(myCookie[cookie_name]);
      }      
    },
    params: function(){return(this.router.params);},
    request: Request,
    response: Response,
    logError: logError,
    getHTML: getHTML
  };

// xxxxxxxxxxxxxxxxxxxxxxxxx HTTP Parser xxxxxxxxxxxxxx
function http_parser(http_request, type) {
  var split_request = http_request.split("\r\n\r\n"); //split header from body
  var response = /(HTTP\/1\.[1|0]) (\d{3}) (.+)/;

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
        wApp.router.params = req.decodeParams;
        wApp.router.params.body = req.bodyDecoded;
        // Set Cookie
        if(req.headers.Cookie !== undefined) { wApp.session.getFromHeader(req.headers.Cookie); }
        var memory_routes = theRoot.varToString("ROUTES");
        if (memory_routes !== "") { wApp.router.routes = JSON.parse(memory_routes); }
        return(req);
    }

// xxxxxxxxxxxxxxxxxxxx Response Object xxxxxxxxxxxxxxxxxxx
  var BasicHeaders =[ "Server: Velneo v7",
                      "transfer-coding: chunked",	
                      "Keep-Alive: timeout=5, max=94",
                      "Connection: Keep-Alive"];

  function isAsset(url) { return(url.match(/(\.css$|\.js$)/i));}

  function Response(request) {
    try {
          if (isAsset(request.url) === null) {
              var actions = wApp.router.pointRequest(request.verb + " " + request.url);
              if(actions != "NOT FOUND") {
                var controllerAction = actions.split("#");
                return(renderResponse(controllerAction[0], controllerAction[1], wApp, request.headers.Accept));
              } else {
                return("HTTP/1.0 404 NOT FOUND");
              }
          } else {
              var html = getHTML(request.url).html;
              if(html !== "") {
                var asset_type = (request.url.substr(request.url.length - 3) === "css") ? "text/css" : "application/javascript";
                return(renderResponseAssets(html, asset_type));
              } else {
                return("HTTP/1.0 404 NOT FOUND");
              }  
          }
    } catch(e) {
      // Sending Internal Message Error with info
      var errorDesc = logError(e);
     return(renderErrorResponse(e, errorDesc));
    }
  }

  function renderResponseAssets(string, type) {
      var CRLF = "\r\n";
      var verb = "HTTP/1.0 200 OK";
      var headers = [("Date: " + (new Date()).toGMTString()),("Content-Length: " + string.length)];
      headers = headers.concat(BasicHeaders).concat([("Content-Type: " + type)]);
      var fullResponse = verb + CRLF + headers.join(CRLF) + CRLF + CRLF + string;
      return(fullResponse);
  }

  function renderResponse(controller, action, wapp, type) {
      var CRLF = "\r\n";
      var jsonresp = wapp[(controller)][action](wapp.router.params);

      type = type || "json";
      if (jsonresp.redirect_to) {type = "redirect";} //Check for redirection
      var format = type.match(/(html|json|redirect)/i) || ["json"];
      var rendered = Engine[format[0]](jsonresp, wapp, controller, action);

      var headers = [("Date: " + (new Date()).toGMTString()),("Content-Length: " + (rendered.body ? rendered.body.length: "0"))];
      headers = headers.concat(BasicHeaders).concat(rendered.headers);

      if (wApp.session.changed) {headers.push(wApp.session.setInHeader());}
      var fullResponse = rendered.verb + CRLF + headers.join(CRLF) + CRLF + CRLF + rendered.body;
      return(fullResponse);
  }


  var Engine = {
    json: function(jsonresp, wapp) {
          var verb = "HTTP/1.0 200 OK";
          var jsonp = wapp.router.params.callback;
          jsonresp = jsonp ? (jsonp + "(" + JSON.stringify(jsonresp) + ")") : JSON.stringify(jsonresp);
          jsonresp = unescape(encodeURIComponent(jsonresp)); // Encode to UFT-8
          var headers = [("Content-Type: application/" + (jsonp ? "javascript" : "json")  + "; charset=utf-8")];
          return({verb: verb, body: jsonresp, headers: headers});
    },
    html: function(jsonresp, wapp, controller, action) {
          var verb = "HTTP/1.0 200 OK";
          var layout = jsonresp.layout || "application";
          var file = "/views/" + controller.replace("Controller", "") + "/" + action;

          // Render without a layout
          if(jsonresp.layout !== false) {
              var layoutHTML = getHTML("/layouts/" + layout);
              if (layoutHTML.type == "template") {eval("layout_temp = " + layoutHTML.template);}
              var layout_body = layoutHTML.type == "template" ?  Handlebars.VM.template(layout_temp)(jsonresp) : layoutHTML.html;   
          } else { var layout_body = "#yield";}

          var pureHTML = getHTML(file);
          if (pureHTML.type == "template") {eval("template = " + pureHTML.template);}
          var body = pureHTML.type == "template" ?  Handlebars.VM.template(template)(jsonresp) : pureHTML.html;   

          var full_body = layout_body.replace("#yield", body) 
          var headers = ["Content-Type: text/html; charset=utf-8"];
          return({verb: verb, body: unescape(encodeURIComponent(full_body)), headers: headers});
    },
    redirect: function(jsonresp) {
          var verb = "HTTP/1.0 302 Found";
          var headers = ["location: " + jsonresp.redirect_to];
          return({verb: verb, body: "", headers: headers});
    }
  };

  function getHTML(path) {
    var records = new VRegisterList(theRoot);
    records.setTable("cirrusdat/FILES_MEM");
    records.load("PATH", [path]);

    if (records.listSize() > 0) {
        var record = records.readAt(0); 
        var html =  record.fieldToString("BODY");
        var type =  record.fieldToString("TIPO") == "1" ? "html" : "template";
        var template = record.fieldToString("COMPILED");
    } else {
        // TODO check what happens when two calls to load
        records.load("NAME", ["NOT_VIEW"]);
        var html =  records.readAt(0).fieldToString("BODY");
        var template = "";
        var type = "html";
    }
    return({html: html, type: type, template: template});  
  }

  function logError(e) { return(e.lineNumber === undefined) ? e.message : (e.message + ". In Line Number: " + e.lineNumber); }

  function renderErrorResponse(e, errorDesc) {
      var CRLF = "\r\n";
      var jsonp = wApp.router.params.callback;
      var jsonresp = {message: errorDesc};
      jsonresp = jsonp ? (jsonp + "(" + JSON.stringify(jsonresp) + ")") : JSON.stringify(jsonresp);
      jsonresp = unescape(encodeURIComponent(jsonresp)); // Encode to UFT-8

      var resp = "HTTP/1.0 500  INTERNAL SERVER ERROR" + CRLF + BasicHeaders.join(CRLF) + CRLF + CRLF + jsonresp;
      return(resp);
  }
module.exports = wApp;
