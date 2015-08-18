//xxxxxxxxxxxxxxxxxxx Main Application Definition xxxxxxxxx
  wApp = {
    // System Router
    version: "1.4",
    config: { filesTable: "cirrusdat/FILES_MEM", root_path: "D://cirrus" },
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
                    i    = keys.length;
                while(i--) {
                    if(keys[i].split(" ")[0] == "resource") {
                      var rest = this.createREST(keys[i].split(" ")[1]);
                      this.addRoutes(rest, "rest");
                    } else {
                      var basic = {},
                          key = keys[i];
                      basic[key] = rutes[key];
                      var myRegex = new RegExp(key.replace(/:\w+/g, "([\\w@\.]+)") + "\/?$", "i");
                      this.rexRoutes.unshift(myRegex);
                      this.routes.unshift(basic);
                    }
                }
            }
        },
        createREST: function(resource) {
          var rest = {};
          rest["GET /" + resource]               = resource + "Controller#index";
          rest["GET /" + resource + "/new"]      = resource + "Controller#new";
          rest["POST /" + resource]              = resource + "Controller#create";
          rest["GET /" + resource + "/:id"]      = resource + "Controller#show";
          rest["GET /" + resource + "/:id/edit"] = resource + "Controller#edit";
          rest["PUT /" + resource + "/:id"]      = resource + "Controller#update";
          rest["DELETE /" + resource + "/:id"]   = resource + "Controller#delete";
          return(rest);
        },
        pointRequest: function (url) {
            var z = this.rexRoutes.length;
            for(i=0; i < z; i++) {
              var rutaRegExp  = this.rexRoutes[i],
                   match      = url.match(rutaRegExp);

              if (match){
                var x = this.routes[i]; // Keys from the match object
                var custom_route = Object.keys(x)[0];

                // extract URL params and Add it to global params
                var requestParams = custom_route.match(/:(\w+)/g);
                if (requestParams) {
                  var requestVars = url.match(rutaRegExp);
                  requestVars.shift();
                  var z = requestParams.length;
                  while(z--) { var param = requestParams[z]; this.params[param.replace(":", "")]=decodeURIComponent(requestVars[requestParams.indexOf(param)]);}
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
      flash: {},
      flashGet: {},
      flashSet: {},
      setFlash: function(key, value) {
        this.changed = true;
        this.flashSet[key] = value;
        return(true);
      },
      getFlash: function(key) {
        return(this.flashGet[key]);
      },
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
          var encoded = "";

          if (Object.keys(this.flashSet).length > 0) {
              this.session.flash = this.flashSet;
              this.flashSet = {};
          }

          if (Object.keys(this.session).length !== 0) {
            expires = this.session.expires;
            path = this.session.path;
            delete(this.session.expires);
            delete(this.session.path);
            encoded = Base64.encode(encodeURIComponent(JSON.stringify(this.session)));
          }

          var cookie = this.cookie_name + "=" + encoded;
          if(expires !== undefined) {cookie += ("; " + "expires=" + expires.toGMTString());}
          if(path !== undefined) {cookie += ("; " + "path=" + path);}

          return("set-Cookie: " + cookie);
      },
      getFromHeader: function(cookie) {
        var regexp = new RegExp(wApp.session.cookie_name + "=(\\w+)\\;?");
        var myCookie = {},
            cookie_name = wApp.cookie_name;

        var matched_cookie = cookie.match(regexp);
        if(matched_cookie) {
          myCookie[cookie_name] = matched_cookie[1];
          a = Base64.decode(myCookie[cookie_name]);
          b = decodeURIComponent(a);
          myCookie.session = JSON.parse(b.replace(/\0/g, ''));
          this.cookie = myCookie; // raw cookie + session
          this.session = myCookie.session;
          if (this.session.flash !== undefined) {
              this.flashGet = this.session.flash;
              delete(this.session.flash);
              this.changed = true;
          }
        }
        return(myCookie[cookie_name]);
      }
    },
    params: function(){return(this.router.params);},
    request: Request,
    response: Response,
    logError: logError,
    getHTML: getHTML,
    vRegisterListToJSON: vRegisterListToJSON,
    renderProcess: renderProcess,
    renderQuery: renderQuery,
    mapField: mapField,
    getType: getType
  };

// xxxxxxxxxxxxxxxxxxxxxxxxx HTTP Parser xxxxxxxxxxxxxx
    function http_parser(http_request, type) {
      var split_request = http_request.split("\r\n\r\n"); //split header from body

      var request          = split_request[0].match(/^(GET|POST|PUT|DELETE|UPDATE|OPTIONS) (.+) (.+)[\r\n]?/),
          headers          = split_request[0].replace(/^(GET|POST|PUT|DELETE|UPDATE|OPTIONS) (.+) (.+)[\r\n]?/, ""),
          header_regx      = /(.+): (.+)/g,
          body_params_regx = /([^&]+)=([^&]+)/g,
          url_and_params   = request[2].split("?"),
          extension        = url_and_params[0].match(/\.(\w+)$/i),
          req = {verb:       request[1],
               path:         request[2],
               protocol:     request[3],
               url:          url_and_params[0],
               extension:    (extension ? extension[1].toLowerCase() : undefined),
               encodeParams: url_and_params[1],
               decodeParams: {},
               headers:      {},
               body:         {},
               bodyDecoded:  {},
               cookie:       ""};

      // Setting Headers
      // Delete "-" in header's names
      while(header = header_regx.exec(headers)) { req.headers[header[1]] = header[2];}

      // Get the Query String
      var params = req.encodeParams
      if(req.encodeParams) { while(param = body_params_regx.exec(params)) {req.decodeParams[param[1]] = wApp.getType(decodeURIComponent(param[2]).replace(/\+/g, " "));} }

      // Body params if any
      if(split_request.length == 2) {
        params = req.body = split_request[1].trim().replace(/\+/g, " ");
        while(body = body_params_regx.exec(params)) {
          // check for method en params
          if (body[1] == "_method" && decodeURIComponent(body[2]).match(/^(PUT|DELETE)$/i)) {
              req.verb = decodeURIComponent(body[2]).toUpperCase();
          } else {
              var actual = req.bodyDecoded[body[1]],
                  newVal = wApp.getType(decodeURIComponent(body[2]));

              if (actual == undefined) {
                  req.bodyDecoded[body[1]] = newVal;
              } else {
                  if ( typeof(actual) != "object" ) { req.bodyDecoded[body[1]] = [actual]; }
                  req.bodyDecoded[body[1]].push(newVal);
              }
          }
        }
      }
      return(req);
    }

// xxxxxxxxxxxxxxxxxxxxxxxxx Request Object xxxxxxxxxxxxxx
    function Request(http_request) {
      try{
          var req = http_parser(http_request);
          wApp.router.params = req.decodeParams;
          if (req.bodyDecoded !== undefined) { wApp.router.params.body = req.bodyDecoded; }

          // body json
          if ( req.headers["Content-Type"] !== undefined && req.headers["Content-Type"].match(/application\/json/i) && req.body){ wApp.router.params.body = JSON.parse(req.body); }

          // body XML
          else if ( req.headers["Content-Type"] !== undefined && req.headers["Content-Type"].match(/text\/xml/i) && req.body){ wApp.router.params.body = req.body; }

          else{ wApp.router.params.body = req.bodyDecoded; }

          // Set Cookie
          if(req.headers.Cookie !== undefined) { wApp.session.getFromHeader(req.headers.Cookie); }
          return(req);
        }catch(e){return(e);} // Capturamos el error de parseo del JSON
    }

    function getType(str){
      var isInteger       = /^[1-9]\d*$/i,
          isCommaFloat    = /^\d*,\d*$/i,
          isPointFloat    = /^\d*\.\d*$/i,
          isCurrencyComma = /^\d{1,3}(\.\d{3})*(\,\d*)?$/g,
          isCurrencyPoint = /^\d{1,3}(\,\d{3})*(\.\d*)?$/g,
          isBool = /(true|false)/,

          // 10/12/2012, 1/5/12
          isPureDatedmy = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}$/,

          // 2012/12/10, 2012-12-10
          isPureDateymd = /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/,

          /* DateTime */

          // Local String => "5/25/2014 9:05:34 PM"
          isDateTime = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4} \d{1,2}:\d{1,2}:\d{1,2} \w\w$/,

          // UTC => "Mon, 26 May 2014 02:05:34 GMT"
          isDateTimeUTC = /^\w*, \d* \w* \d{2,4} \d{1,2}:\d{1,2}:\d{1,2} \w\w\w$/,

          // ISO string => "2014-05-26T02:25:07.850Z"
          isDateTimeISO = /^\d{2,4}-\d{1,2}-\d{1,2}T\d{1,2}:\d{1,2}:\d{1,2}\.\d*Z$/;

      if (str.match(isInteger) && str.length < 14) {return(parseInt(str, 10));}
      if (str.match(isCurrencyComma)) {return(parseFloat(str.replace(/\./g, "").replace(",", ".")));}
      if (str.match(isCurrencyPoint)) {return(parseFloat(str.replace(/\,/g, "")));}
      if (str.match(isCommaFloat)) {return(parseFloat(str.replace(",", ".")));}
      if (str.match(isPointFloat)) {return(parseFloat(str));}
      if (str.match(isBool)) {return(str == "true" ? true : false);}
      if (str.match(isPureDatedmy)) {
          var params1 = str.split("/");
          var params2 = str.split("-");
          var params = params1.length > 1 ? params1 : params2;
          var date = new Date(parseInt(params[2],10), (parseInt(params[1],10)-1), parseInt(params[0],10));
          return(date);
      }
      if (str.match(isPureDateymd)) {
          var params1 = str.split("/");
          var params2 = str.split("-");
          var params = params1.length > 1 ? params1 : params2;
          var date = new Date(parseInt(params[0],10), (parseInt(params[1],10)-1), parseInt(params[2],10));
          return(date);
      }
      if (str.match(isDateTime)) {
          var params = str.split(" ");
          var dayParts = params[0].split("/");
          var hourParts = params[1].split(":");
          var hora = params[2].match(/am/i) ? parseInt(hourParts[0]) :(parseInt(hourParts[0]) + 12);
          var date = new Date(parseInt(dayParts[2],10), (parseInt(dayParts[0],10)-1), parseInt(dayParts[1],10), hora, parseInt(hourParts[1],10), parseInt(hourParts[2],10));
          return(date);
      }

      if(str.match(isDateTimeUTC)) {
          var months = {"Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6, "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12};
          var params = str.split(",")[1].split(" ");
          var day = parseInt(params[0],10);
          var month = months[params[1]];
          var year = parseInt(params[2],10);
          var hour = parseInt(parmas[3].split(":")[0],10);
          var minute = parseInt(parmas[3].split(":")[1],10);
          var second = parseInt(parmas[3].split(":")[2],10);

          var date = new Date(year, month, day, hour, minute, second);
          return(date);
      }

      if(str.match(isDateTimeISO)) {
          var params = str.split("T");
          var params1 = params[0];
          var params2 = params[1].split(".")[0];
          var year = parseInt(params1.split("-")[0],10);
          var month = parseInt(params1.split("-")[1],10) - 1 ;
          var day = parseInt(params1.split("-")[2],10);
          var hour = parseInt(params2.split(":")[0],10);
          var minute = parseInt(params2.split(":")[1],10);
          var second = parseInt(params2.split(":")[2],10);

          var date = new Date(year, month, day, hour, minute, second);
          return(date);
      }

      return(str);
    }
// xxxxxxxxxxxxxxxxxxxx Response Object xxxxxxxxxxxxxxxxxxx
  var BasicHeaders =[ "Server: Velneo v7",
                      "transfer-coding: chunked",
                      "Keep-Alive: timeout=5, max=94",
                      "Connection: Keep-Alive"
                    ];

  function isAsset(request) {
    return(request.extension === "js" || request.extension === "css");
  }

  function Response(request) {
    try {
          // Comprobamos que si se ha producido un error en el parseo de la petición
          if (request.name == "SyntaxError") throw request;

          if (request.extension === "js" || request.extension === "css" ) {
              // Assetss request handling
              var record = getHTML(request.url);
              if(record.html !== "") {
                var asset_type = (request.url.substr(request.url.length - 3) === "css") ? "text/css" : "application/javascript";
                return(renderResponseAssets(record, asset_type));
              } else {
                return("HTTP/1.0 404 NOT FOUND");
              }
          } else if(request.extension === "pro") {
              // process maping handling
              var process = wApp.router.pointRequest(request.verb + " " + request.url);
              return( process != "NOT FOUND" ? renderProcess(process, wApp.router.params) : "HTTP/1.0 404 NOT FOUND" );

          } else if(request.extension === "bus") {
              // query maping handling
              var query = wApp.router.pointRequest(request.verb + " " + request.url);
              return(query != "NOT FOUND" ? renderQuery(query, wApp.router.params) : "HTTP/1.0 404 NOT FOUND");

          } else if(request.verb === "OPTIONS") {
              // CORS request
              var CRLF = "\r\n";
              var headers = [ "Access-Control-Allow-Origin: *",
                              "Access-Control-Allow-Headers: DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type",
                              "Access-Control-Allow-Methods: GET, POST, PUT, HEAD, OPTIONS, DELETE"];

              return("HTTP/1.0 204 OK" + CRLF + headers.join(CRLF) + CRLF + CRLF);
          } else {
              // HTML or JSON request
              var actions = wApp.router.pointRequest(request.verb + " " + request.url.split(".")[0]);
              if(actions != "NOT FOUND") {
                var controllerAction = actions.split("#");
                return(renderResponse(controllerAction[0], controllerAction[1], wApp, (request.extension || request.headers.Accept)));
              } else {
                return("HTTP/1.0 404 NOT FOUND");
              }
          }
    } catch(e) {
      // Sending Internal Message Error with info
      switch(e.name) {
        case "SyntaxError":
              return renderErrorResponse(e, "Unable to parse JSON string");
        default:
              var errorDesc = logError(e);
              return(renderErrorResponse(e, errorDesc));
      }
    }
  }

  function renderResponseAssets(record, type) {
      var CRLF    = "\r\n",
          verb    = "HTTP/1.0 200 OK",
          string  = record.html,
          headers = [("Date: " + (new Date()).toGMTString()),("Content-Length: " + string.length)];
      if (record.useCache) {
          headers.push("Cache-Control: max-age=" + record.maxAge);
          headers.push("ETag: " + record.eTag);
      }

      headers = headers.concat(BasicHeaders).concat([("Content-Type: " + type)]);
      var fullResponse = verb + CRLF + headers.join(CRLF) + CRLF + CRLF + string;
      return(fullResponse);
  }

  function renderResponse(controller, action, wapp, type) {
      var CRLF = "\r\n";

      if ( wapp[controller].before !== undefined ) {
          wapp.router.params = wapp[controller].before(wapp.router.params);
      }

      var redirect_before = wapp.router.params.redirect_to !== undefined,
          jsonresp = redirect_before ? wapp.router.params : wapp[controller][action](wapp.router.params);

      type = type || "json";
      if (jsonresp.redirect_to) {type = "redirect";} //Check for redirection
      var format = type.match(/(html|xml|json|redirect)/i) || ["json"];
      var rendered = Engine[format[0]](jsonresp, wapp, controller, action);

      var headers = [("Date: " + (new Date()).toGMTString()),("Content-Length: " + (rendered.body ? rendered.body.length: "0"))];
      headers = headers.concat(BasicHeaders).concat(rendered.headers);

      if (wApp.session.changed) {headers.push(wApp.session.setInHeader());}
      var fullResponse = rendered.verb + CRLF + headers.join(CRLF) + CRLF + CRLF + rendered.body;
      return(fullResponse);
  }

  var Engine = {
    json: function(jsonresp, wapp) {
          var verb = jsonresp.responseCode !== undefined && jsonresp.responseCode.code !== undefined && jsonresp.responseCode.message !== undefined ? ("HTTP/1.0 " + jsonresp.responseCode.code + " " + jsonresp.responseCode.message) : "HTTP/1.0 200 OK";
          delete(jsonresp.responseCode);
          var jsonp = wapp.router.params.callback;
          jsonresp = jsonp ? (jsonp + "(" + JSON.stringify(jsonresp) + ")") : JSON.stringify(jsonresp);
          jsonresp = unescape(encodeURIComponent(jsonresp)); // Encode to UFT-8
          var headers = [("Content-Type: application/" + (jsonp ? "javascript" : "json")  + "; charset=utf-8")];
          return({verb: verb, body: jsonresp, headers: headers});
    },
    html: function(jsonresp, wapp, controller, action) {
          var verb = "HTTP/1.0 200 OK",
              full_body;
          if (typeof(jsonresp) == "object") {
              var layout = jsonresp.layout || "application";
              var file = "/views/" + controller.replace("Controller", "") + "/" + action;
              jsonresp.controller = controller;
              jsonresp.action = action;
              jsonresp.session = wApp.session.session;
              jsonresp.flash = wApp.session.flashGet;

              if(jsonresp.layout !== false) {
                  var layoutHTML = getHTML("/layouts/" + layout);
                  if (layoutHTML.type === "template") {eval("layout_temp = " + layoutHTML.html)}

                  var layout_body = layoutHTML.type === "template" ?  Handlebars.VM.template(layout_temp)(jsonresp) : layoutHTML.html;
              } else {
                  // Render without a layout
                  var layout_body = "#yield";
              }

              var pureHTML = getHTML(file);
              if (pureHTML.type === "template") {eval("template = " + pureHTML.html);}
              if (pureHTML.html == "") { pureHTML.html = "<div><h1>There is not view for this action</h1></div>"; }
              var body = pureHTML.type === "template" ?  Handlebars.VM.template(template)(jsonresp) : pureHTML.html;

              full_body = layout_body.replace("#yield", body);
          } else {
              full_body = jsonresp;
          }
          var headers = ["Content-Type: text/html; charset=utf-8"];
          return({verb: verb, body: unescape(encodeURIComponent(full_body)), headers: headers});
    },
    xml: function(jsonresp) {
          var verb    = "HTTP/1.0 200 OK",
              headers = ["Content-Type: text/xml; charset=UTF-8"],
              xmlResp;

          if (jsonresp.xml) {
              xmlResp = unescape(encodeURIComponent(jsonresp.xml));
          } else {
              xmlResp = "<?xml version='1.0' encoding='UTF-8'?><error version='1.0'>The JSON object should have an xml key</error>";
          }
          return({verb: verb, body: xmlResp, headers: headers});
    },
    redirect: function(jsonresp) {
          var verb = "HTTP/1.0 302 Found";
          var headers = ["location: " + jsonresp.redirect_to];
          return({verb: verb, body: "", headers: headers});
    }
  };

  function getHTML(path) {
      importClass( "VTextFile" );
      importClass( "VFile" );

      var extension = path.split(".")[path.split(".").length-1].match(/(css|js|html)/i) == null ? ".html" : "";
      path += extension;

      var file     = new VTextFile( wApp.config.root_path + path ),
          file_hbs = new VTextFile( wApp.config.root_path + path + ".hbs" ),
          type     = file_hbs.exists() ? "template" : "html";

          if ( file.exists() ) {
              if ( file.open( VFile.OpenModeReadOnly ) ) { html = file.readAll(); } else { html = ""; }
          } else if (file_hbs.exists()) {
              if ( file_hbs.open( VFile.OpenModeReadOnly ) ) { html = file_hbs.readAll(); } else { html = ""; }
          } else { html = ""; }

      return({html: html, type: type});
  }

  function logError(e) { return(e.lineNumber === undefined) ? e.message : (e.message + ". In Line Number: " + e.lineNumber); }

  function renderErrorResponse(e, errorDesc) {
      var CRLF = "\r\n";
      var jsonp = wApp.router.params.callback;
      var jsonresp = {message: errorDesc};
      jsonresp = jsonp ? (jsonp + "(" + JSON.stringify(jsonresp) + ")") : JSON.stringify(jsonresp);
      jsonresp = unescape(encodeURIComponent(jsonresp)); // Encode to UFT-8

      var resp = "HTTP/1.0 500 INTERNAL SERVER ERROR" + CRLF + BasicHeaders.join(CRLF) + CRLF + CRLF + jsonresp;
      return(resp);
  }
module.exports = wApp;
