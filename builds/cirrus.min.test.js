const require$$1 = require("jsonfile");
require("../libs/handlebars.js");
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function VRegister$2(theRoot2) {
  this.fields = {};
  this.fieldToString = function(field) {
    return this.fields[field];
  };
  this.fieldToDouble = function(field) {
    return this.fields[field];
  };
  this.fieldToBool = function(field) {
    return this.fields[field];
  };
  this.fieldToInteger = function(field) {
    return this.fields[field];
  };
  this.setField = function(field, value) {
    this.fields[field] = value;
  };
}
var vregister = VRegister$2;
var VRegister$1 = vregister;
var jf$1 = require$$1;
function VRegisterList$2(theRoot2) {
  this.table = "";
  this.setTable = function(table) {
    this.table = table;
  };
  this.load = function(index, params) {
    this.records = [];
    var file = jf$1.readFileSync("./spec/fixtures/files.json");
    var base = file[params[0]];
    if (base != void 0) {
      var registro = new VRegister$1();
      registro.fields = { BODY: base.content, TIPO: base.tipo, COMPILED: "" };
      this.records = [registro];
      return [registro];
    } else {
      return [];
    }
  };
  this.records = [];
  this.listSize = function() {
    return this.records.length;
  };
  this.size = function() {
    return this.listSize();
  };
  this.readAt = function(position) {
    return this.records[position];
  };
}
var vregister_list = VRegisterList$2;
var VProcess$2 = function(theRoot2) {
  this.vars = {};
  this.setProcess = function(id_process) {
    this.process = id_process;
  };
  this.exec = function(thread, cola) {
    this.vars.RESULT = JSON.stringify({ hello: "world" });
  };
  this.result = function() {
  };
  this.setVar = function(key, value) {
    this.vars[key] = value;
  };
  this.varToString = function(key) {
    return this.vars[key];
  };
};
var vprocess = VProcess$2;
var jf = require$$1;
function VTextFile$2(path) {
  this.path = path;
  this.readAll = function() {
    var file = jf.readFileSync("./spec/fixtures/hd_files.json");
    var html2 = file[this.path];
    if (html2 != void 0) {
      return html2.content;
    } else {
      return "";
    }
  };
  this.exists = function() {
    var file = jf.readFileSync("./spec/fixtures/hd_files.json");
    var html2 = file[this.path];
    return html2 !== void 0;
  };
  this.open = function(mode) {
    return true;
  };
}
var vtextfile = VTextFile$2;
var VFile$2 = {
  OpenModeReadOnly: true
};
var vfile = VFile$2;
var theRoot$1 = {
  varToString: function(variable) {
    return this.vars[variable] === void 0 ? "" : this.vars[variable];
  },
  vars: {},
  setVar: function(variable, value) {
    this.vars[variable] = value;
  }
};
function importClass$1(klass) {
  return klass;
}
var VRegister = vregister;
var VRegisterList$1 = vregister_list;
var VProcess$1 = vprocess;
var VTextFile$1 = vtextfile;
var VFile$1 = vfile;
commonjsGlobal.VRegister = VRegister;
commonjsGlobal.VRegisterList = VRegisterList$1;
commonjsGlobal.VProcess = VProcess$1;
commonjsGlobal.VTextFile = VTextFile$1;
commonjsGlobal.VFile = VFile$1;
commonjsGlobal.theRoot = theRoot$1;
commonjsGlobal.importClass = importClass$1;
var base64 = { exports: {} };
(function(module2) {
  function StringBuffer() {
    this.buffer = [];
  }
  StringBuffer.prototype.append = function(a2) {
    this.buffer.push(a2);
    return this;
  };
  StringBuffer.prototype.toString = function() {
    return this.buffer.join("");
  };
  var Base642 = { codex: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function(a2) {
    for (var c = new StringBuffer(), a2 = new Utf8EncodeEnumerator(a2); a2.moveNext(); ) {
      var b2 = a2.current;
      a2.moveNext();
      var d = a2.current;
      a2.moveNext();
      var e = a2.current, h = b2 >> 2, b2 = (b2 & 3) << 4 | d >> 4, g = (d & 15) << 2 | e >> 6, f = e & 63;
      isNaN(d) ? g = f = 64 : isNaN(e) && (f = 64);
      c.append(this.codex.charAt(h) + this.codex.charAt(b2) + this.codex.charAt(g) + this.codex.charAt(f));
    }
    return c.toString();
  }, decode: function(a2) {
    for (var c = new StringBuffer(), a2 = new Base64DecodeEnumerator(a2); a2.moveNext(); ) {
      var b2 = a2.current;
      if (128 > b2) c.append(String.fromCharCode(b2));
      else if (191 < b2 && 224 > b2) {
        a2.moveNext();
        var d = a2.current;
        c.append(String.fromCharCode((b2 & 31) << 6 | d & 63));
      } else a2.moveNext(), d = a2.current, a2.moveNext(), c.append(String.fromCharCode((b2 & 15) << 12 | (d & 63) << 6 | a2.current & 63));
    }
    return c.toString();
  } };
  function Utf8EncodeEnumerator(a2) {
    this._input = a2;
    this._index = -1;
    this._buffer = [];
  }
  Utf8EncodeEnumerator.prototype = { current: Number.NaN, moveNext: function() {
    if (0 < this._buffer.length) return this.current = this._buffer.shift(), true;
    if (this._index >= this._input.length - 1) return this.current = Number.NaN, false;
    var a2 = this._input.charCodeAt(++this._index);
    13 == a2 && 10 == this._input.charCodeAt(this._index + 1) && (a2 = 10, this._index += 2);
    128 > a2 ? this.current = a2 : (127 < a2 && 2048 > a2 ? this.current = a2 >> 6 | 192 : (this.current = a2 >> 12 | 224, this._buffer.push(a2 >> 6 & 63 | 128)), this._buffer.push(a2 & 63 | 128));
    return true;
  } };
  function Base64DecodeEnumerator(a2) {
    this._input = a2;
    this._index = -1;
    this._buffer = [];
  }
  Base64DecodeEnumerator.prototype = { current: 64, moveNext: function() {
    if (0 < this._buffer.length) return this.current = this._buffer.shift(), true;
    if (this._index >= this._input.length - 1) return this.current = 64, false;
    var a2 = Base642.codex.indexOf(this._input.charAt(++this._index)), c = Base642.codex.indexOf(this._input.charAt(++this._index)), b2 = Base642.codex.indexOf(this._input.charAt(++this._index)), d = Base642.codex.indexOf(this._input.charAt(++this._index)), e = (b2 & 3) << 6 | d;
    this.current = a2 << 2 | c >> 4;
    64 != b2 && this._buffer.push((c & 15) << 4 | b2 >> 2);
    64 != d && this._buffer.push(e);
    return true;
  } };
  if (module2.exports) {
    module2.exports = Base642;
  }
})(base64);
var base64Exports = base64.exports;
var v7_render = { exports: {} };
(function(module2) {
  function renderProcess2(processId, params, wapp) {
    importClass("VProcess");
    var process = new VProcess(theRoot);
    var fields = params.fields;
    process.setProcess(processId);
    var CRLF = "\r\n";
    var verb = "HTTP/1.0 200 OK";
    delete params.body;
    delete params.fields;
    var keysList = Object.keys(params);
    var i2 = keysList.length;
    while (i2--) {
      if (keysList[i2].toUpperCase().match(/^[A-Z0-9_]*$/)) {
        if (params[keysList[i2]] instanceof Date) {
          process.setVar(keysList[i2], params[keysList[i2]].toISOString().split("T")[0]);
        } else {
          process.setVar(keysList[i2].toUpperCase(), params[keysList[i2]]);
        }
      }
    }
    process.exec();
    var result = process.varToString("RESULT");
    var ContentType = "Content-Type: text/html; charset=utf-8";
    if (result === "") {
      var pResult = process.result();
      ContentType = "Content-Type: application/json";
      if (process.objectInfo().outputType() === 2 && pResult.size() > 0) {
        result = JSON.stringify(vRegisterListToJSON2(pResult, fields));
      } else if (process.objectInfo().outputType() === 1) {
        var list = new VRegisterList(theRoot);
        list.setTable(pResult.tableInfo().idRef());
        list.append(pResult);
        result = JSON.stringify(vRegisterListToJSON2(list, fields));
      }
    }
    var headers = ["Date: " + (/* @__PURE__ */ new Date()).toGMTString(), "Content-Length: " + result.length];
    headers = headers.concat(BasicHeaders).concat([ContentType]);
    var fullResponse = verb + CRLF + headers.join(CRLF) + CRLF + CRLF + (wapp.isWindows() ? result : unescape(encodeURIComponent(result)));
    return fullResponse;
  }
  function renderQuery2(queryId, params) {
    importClass("VQuery");
    var query = new VQuery(theRoot);
    var fields = params.fields;
    query.setQuery(queryId);
    var CRLF = "\r\n";
    var verb = "HTTP/1.0 200 OK";
    delete params.body;
    delete params.fields;
    var keysList = Object.keys(params);
    var i2 = keysList.length;
    while (i2--) {
      query.setVar(keysList[i2].toUpperCase(), wApp.getType(params[keysList[i2]]));
    }
    if (query.exec()) {
      var jsonResp = JSON.stringify(vRegisterListToJSON2(query.result(), fields));
      var headers = ["Date: " + (/* @__PURE__ */ new Date()).toGMTString(), "Content-Length: " + jsonResp.length];
      headers = headers.concat(BasicHeaders).concat(["Content-Type: application/json; charset=utf-8"]);
      var fullResponse = verb + CRLF + headers.join(CRLF) + CRLF + CRLF + jsonResp;
      return fullResponse;
    }
  }
  function vRegisterListToJSON2(vregisterlist, neededFields) {
    var table = vregisterlist.tableInfo(), nFields = table.fieldCount(), i2 = vregisterlist.size(), result = [], fields = [], type = 0, fieldType;
    if (neededFields === void 0) {
      while (nFields--) {
        fieldType = parseInt(table.fieldType(nFields), 10);
        type = fieldType === 11 ? parseInt("11" + table.fieldObjectType(nFields)) : fieldType;
        fields.push({ fieldName: table.fieldId(nFields), fieldType: type });
      }
    } else {
      neededFields = typeof neededFields == "string" ? neededFields.toUpperCase().split(",") : neededFields;
      while (nFields--) {
        if (neededFields.indexOf(table.fieldId(nFields)) > -1) {
          fieldType = parseInt(table.fieldType(nFields), 10);
          type = fieldType === 11 ? parseInt("11" + table.fieldObjectType(nFields)) : fieldType;
          fields.push({ fieldName: table.fieldId(nFields), fieldType: type });
        }
      }
    }
    nFields = fields.length;
    while (i2--) {
      var record = vregisterlist.readAt(i2), z2 = nFields, recordJSON = {};
      while (z2--) {
        recordJSON[fields[z2].fieldName] = mapField2(fields[z2].fieldType, fields[z2].fieldName, record);
      }
      result.push(recordJSON);
    }
    return result;
  }
  function mapField2(type, fieldName, record) {
    var intType = parseInt(type);
    var result;
    switch (intType) {
      case 0:
        result = record.fieldToString(fieldName);
        break;
      case 1:
        result = record.fieldToString(fieldName);
        break;
      case 2:
        result = record.fieldToString(fieldName);
        break;
      case 3:
        result = record.fieldToString(fieldName);
        break;
      case 4:
        result = record.fieldToString(fieldName);
        break;
      case 5:
        result = record.fieldToString(fieldName);
        break;
      case 6:
        result = record.fieldToDouble(fieldName);
        break;
      case 7:
        result = record.fieldToDate(fieldName);
        break;
      case 8:
        result = record.fieldToDateTime(fieldName);
        break;
      case 9:
        result = record.fieldToDateTime(fieldName);
        break;
      case 10:
        result = record.fieldToBool(fieldName);
        break;
      case 11:
        result = "";
        break;
      case 111:
        result = record.fieldToString(fieldName);
        break;
      case 112:
        result = record.fieldToString(fieldName);
        break;
      case 12:
        result = "";
        break;
      case 13:
        result = "";
        break;
      case 14:
        result = "";
        break;
      case 15:
        result = "";
        break;
      case 18:
        result = "";
        break;
      default:
        result = record.fieldToString(fieldName);
        break;
    }
    return result;
  }
  if (module2.exports) {
    module2.exports = {
      renderProcess: renderProcess2,
      renderQuery: renderQuery2,
      vRegisterListToJSON: vRegisterListToJSON2,
      mapField: mapField2
    };
  }
})(v7_render);
var v7_renderExports = v7_render.exports;
var renderUtils$1 = v7_renderExports;
var renderProcess = renderUtils$1.renderProcess;
var renderQuery = renderUtils$1.renderQuery;
var vRegisterListToJSON = renderUtils$1.vRegisterListToJSON;
var mapField = renderUtils$1.mapField;
var Base64$1 = base64Exports;
var wApp$1 = {
  version: "1.4",
  isWindows: function() {
    return theApp.sysInfo().getOsString().match(/win/i);
  },
  config: { filesTable: "cirrusdat/FILES_MEM", root_path: "D://cirrus" },
  router: {
    params: { body: {} },
    parse_params: function(array) {
      var keys = array.length;
      while (keys--) {
        var subarray = array[keys].split("=");
        this.params[subarray[0]] = subarray[1].replace(/\+/g, " ");
      }
    },
    routes: [],
    rexRoutes: [],
    addRoutes: function(rutes) {
      var keys = Object.keys(rutes), i2 = keys.length;
      while (i2--) {
        if (keys[i2].split(" ")[0] == "resource") {
          var rest = this.createREST(keys[i2].split(" ")[1]);
          this.addRoutes(rest);
        } else {
          var basic = {}, key = keys[i2];
          basic[key] = rutes[key];
          var myRegex = new RegExp(key.replace(/:\w+/g, "([\\w@.]+)") + "/?$", "i");
          this.rexRoutes.unshift(myRegex);
          this.routes.unshift(basic);
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
      return rest;
    },
    pointRequest: function(url) {
      var z2 = this.rexRoutes.length;
      for (i = 0; i < z2; i++) {
        var rutaRegExp = this.rexRoutes[i], match = url.match(rutaRegExp);
        if (match) {
          var x = this.routes[i];
          var custom_route = Object.keys(x)[0];
          var requestParams = custom_route.match(/:(\w+)/g);
          if (requestParams) {
            var requestVars = url.match(rutaRegExp);
            requestVars.shift();
            z2 = requestParams.length;
            while (z2--) {
              var param2 = requestParams[z2];
              this.params[param2.replace(":", "")] = decodeURIComponent(requestVars[requestParams.indexOf(param2)]);
            }
          }
          return x[custom_route];
        }
      }
      return "NOT FOUND";
    }
  },
  session: {
    cookie_name: "v7App",
    cookie: { session: {} },
    session: {},
    flash: {},
    flashGet: {},
    flashSet: {},
    setFlash: function(key, value) {
      this.changed = true;
      this.flashSet[key] = value;
      return true;
    },
    getFlash: function(key) {
      return this.flashGet[key];
    },
    changed: false,
    set: function(key, value) {
      this.changed = true;
      this.session[key] = value;
      return true;
    },
    get: function(key) {
      return this.session[key];
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
        delete this.session.expires;
        delete this.session.path;
        encoded = Base64$1.encode(encodeURIComponent(JSON.stringify(this.session)));
      }
      var cookie = this.cookie_name + "=" + encoded;
      if (expires !== void 0) {
        cookie += "; expires=" + expires.toGMTString();
      }
      if (path !== void 0) {
        cookie += "; path=" + path;
      }
      return "set-Cookie: " + cookie;
    },
    getFromHeader: function(cookie) {
      var regexp = new RegExp(wApp$1.session.cookie_name + "=(\\w+)\\;?");
      var myCookie = {}, cookie_name = wApp$1.cookie_name;
      var matched_cookie = cookie.match(regexp);
      if (matched_cookie) {
        myCookie[cookie_name] = matched_cookie[1];
        a = Base64$1.decode(myCookie[cookie_name]);
        b = decodeURIComponent(a);
        myCookie.session = JSON.parse(b.replace(/\0/g, ""));
        this.cookie = myCookie;
        this.session = myCookie.session;
        if (this.session.flash !== void 0) {
          this.flashGet = this.session.flash;
          delete this.session.flash;
          this.changed = true;
        }
      }
      return myCookie[cookie_name];
    }
  },
  params: function() {
    return this.router.params;
  },
  responseHeaders: {
    headers: {},
    set: function(name, value) {
      this.headers[name] = value;
    },
    buildForHTTP: function() {
      var keys = Object.keys(this.headers), i2 = keys.length, result = [];
      for (z = 0; z < i2; z++) {
        result.push(keys[z] + ": " + this.headers[keys[z]]);
      }
      return result;
    }
  },
  request: Request,
  response: Response,
  logError,
  getHTML,
  vRegisterListToJSON,
  renderProcess,
  renderQuery,
  mapField,
  getType
};
function http_parser(http_request, type) {
  var split_request = http_request.split("\r\n\r\n");
  var request = split_request[0].match(/^(GET|POST|PUT|DELETE|UPDATE|OPTIONS) (.+) (.+)[\r\n]?/), headers = split_request[0].replace(/^(GET|POST|PUT|DELETE|UPDATE|OPTIONS) (.+) (.+)[\r\n]?/, ""), header_regx = /(.+): (.+)/g, body_params_regx = /([^&]+)=([^&]+)/g, url_and_params = request[2].split("?"), extension = url_and_params[0].match(/\.(\w+)$/i), req = {
    verb: request[1],
    path: request[2],
    protocol: request[3],
    url: url_and_params[0],
    extension: extension ? extension[1].toLowerCase() : void 0,
    encodeParams: url_and_params[1],
    decodeParams: {},
    headers: {},
    body: {},
    bodyDecoded: {},
    cookie: ""
  };
  while (header = header_regx.exec(headers)) {
    req.headers[header[1]] = header[2];
  }
  var params = req.encodeParams;
  if (req.encodeParams) {
    var value, key, current;
    while (param = body_params_regx.exec(params)) {
      key = decodeURIComponent(param[1]).replace("[]", "");
      value = wApp$1.getType(decodeURIComponent(param[2]).replace(/\+/g, " "));
      current = req.decodeParams[key];
      if (current === void 0) {
        req.decodeParams[key] = decodeURIComponent(param[1]).match(/^.*\[\]$/) ? [value] : value;
      } else {
        if (typeof current !== "object") {
          req.decodeParams[key] = [current];
        }
        req.decodeParams[key].push(value);
      }
    }
  }
  if (split_request.length == 2) {
    params = req.body = split_request[1].trim().replace(/\+/g, " ");
    while (body = body_params_regx.exec(params)) {
      if (body[1] == "_method" && decodeURIComponent(body[2]).match(/^(PUT|DELETE)$/i)) {
        req.verb = decodeURIComponent(body[2]).toUpperCase();
      } else {
        var decKey = decodeURIComponent(body[1]).replace("[]", ""), actual = req.bodyDecoded[decKey], newVal = wApp$1.getType(decodeURIComponent(body[2]));
        if (actual === void 0) {
          req.bodyDecoded[decKey] = newVal;
        } else {
          if (typeof actual != "object") {
            req.bodyDecoded[decKey] = [actual];
          }
          req.bodyDecoded[decKey].push(newVal);
        }
      }
    }
  }
  return req;
}
function Request(http_request) {
  try {
    var req = http_parser(http_request);
    wApp$1.router.params = req.decodeParams;
    if (req.bodyDecoded !== void 0) {
      wApp$1.router.params.body = req.bodyDecoded;
    }
    if (req.headers["Content-Type"] !== void 0 && req.headers["Content-Type"].match(/application\/json/i) && req.body) {
      wApp$1.router.params.body = JSON.parse(req.body);
    } else if (req.headers["Content-Type"] !== void 0 && req.headers["Content-Type"].match(/text\/xml/i) && req.body) {
      wApp$1.router.params.body = req.body;
    } else {
      wApp$1.router.params.body = req.bodyDecoded;
    }
    if (req.headers.Cookie !== void 0) {
      wApp$1.session.getFromHeader(req.headers.Cookie);
    }
    return req;
  } catch (e) {
    return e;
  }
}
function getType(str) {
  var isInteger = /^[1-9]\d*$/i, isCommaFloat = /^\d*,\d*$/i, isPointFloat = /^\d*\.\d*$/i, isCurrencyComma = /^\d{1,3}(\.\d{3})*(\,\d*)?$/g, isCurrencyPoint = /^\d{1,3}(\,\d{3})*(\.\d*)?$/g, isBool = /(true|false)/, isPureDatedmy = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}$/, isPureDateymd = /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/, isDateTime = /^\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4} \d{1,2}:\d{1,2}:\d{1,2} \w\w$/, isDateTimeUTC = /^\w*, \d* \w* \d{2,4} \d{1,2}:\d{1,2}:\d{1,2} \w\w\w$/, isDateTimeISO = /^\d{2,4}-\d{1,2}-\d{1,2}T\d{1,2}:\d{1,2}:\d{1,2}\.\d*Z$/, params1, params2, params, date, year, month, day, minute, second;
  if (str.match(isInteger) && str.length < 14) {
    return parseInt(str, 10);
  }
  if (str.match(isCurrencyComma)) {
    return parseFloat(str.replace(/\./g, "").replace(",", "."));
  }
  if (str.match(isCurrencyPoint)) {
    return parseFloat(str.replace(/\,/g, ""));
  }
  if (str.match(isCommaFloat)) {
    return parseFloat(str.replace(",", "."));
  }
  if (str.match(isPointFloat)) {
    return parseFloat(str);
  }
  if (str.match(isBool)) {
    return str == "true" ? true : false;
  }
  if (str.match(isPureDatedmy)) {
    params1 = str.split("/");
    params2 = str.split("-");
    params = params1.length > 1 ? params1 : params2;
    date = new Date(parseInt(params[2], 10), parseInt(params[1], 10) - 1, parseInt(params[0], 10));
    return date;
  }
  if (str.match(isPureDateymd)) {
    params1 = str.split("/");
    params2 = str.split("-");
    params = params1.length > 1 ? params1 : params2;
    date = new Date(parseInt(params[0], 10), parseInt(params[1], 10) - 1, parseInt(params[2], 10));
    return date;
  }
  if (str.match(isDateTime)) {
    params = str.split(" ");
    var dayParts = params[0].split("/");
    var hourParts = params[1].split(":");
    var hora = params[2].match(/am/i) ? parseInt(hourParts[0]) : parseInt(hourParts[0]) + 12;
    date = new Date(parseInt(dayParts[2], 10), parseInt(dayParts[0], 10) - 1, parseInt(dayParts[1], 10), hora, parseInt(hourParts[1], 10), parseInt(hourParts[2], 10));
    return date;
  }
  if (str.match(isDateTimeUTC)) {
    var months = { "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6, "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12 };
    params = str.split(",")[1].split(" ");
    day = parseInt(params[0], 10);
    month = months[params[1]];
    year = parseInt(params[2], 10);
    hour = parseInt(parmas[3].split(":")[0], 10);
    minute = parseInt(parmas[3].split(":")[1], 10);
    second = parseInt(parmas[3].split(":")[2], 10);
    date = new Date(year, month, day, hour, minute, second);
    return date;
  }
  if (str.match(isDateTimeISO)) {
    params = str.split("T");
    params1 = params[0];
    params2 = params[1].split(".")[0];
    year = parseInt(params1.split("-")[0], 10);
    month = parseInt(params1.split("-")[1], 10) - 1;
    day = parseInt(params1.split("-")[2], 10);
    hour = parseInt(params2.split(":")[0], 10);
    minute = parseInt(params2.split(":")[1], 10);
    second = parseInt(params2.split(":")[2], 10);
    date = new Date(year, month, day, hour, minute, second);
    return date;
  }
  return str;
}
var BasicHeaders$1 = [
  "Server: Velneo v7",
  "Access-Control-Allow-Origin: *",
  "Access-Control-Allow-Headers: DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type",
  "Access-Control-Allow-Methods: GET, POST, PUT, HEAD, OPTIONS, DELETE"
];
if (typeof commonjsGlobal !== "undefined") {
  commonjsGlobal.BasicHeaders = BasicHeaders$1;
}
function Response(request) {
  try {
    if (request.name == "SyntaxError") throw request;
    var types = {
      "js": "application/javascript",
      "css": "text/css",
      "woff": "application/font-woff",
      "ttf": "application/font-sfnt",
      "svg": "image/svg+xml",
      "eot": "application/vnd.ms-fontobject"
    };
    if (types[request.extension] !== void 0) {
      var record = getHTML(request.url);
      if (record.html !== "") {
        return renderResponseAssets(record, types[request.extension], wApp$1);
      } else {
        return "HTTP/1.0 404 NOT FOUND";
      }
    } else if (request.extension === "pro") {
      var process = wApp$1.router.pointRequest(request.verb + " " + request.url);
      return process != "NOT FOUND" ? renderProcess(process, wApp$1.router.params, wApp$1) : "HTTP/1.0 404 NOT FOUND";
    } else if (request.extension === "bus") {
      var query = wApp$1.router.pointRequest(request.verb + " " + request.url);
      return query != "NOT FOUND" ? renderQuery(query, wApp$1.router.params) : "HTTP/1.0 404 NOT FOUND";
    } else if (request.verb === "OPTIONS") {
      var CRLF = "\r\n";
      var headers = [
        "Access-Control-Allow-Origin: *",
        "Access-Control-Allow-Headers: DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type",
        "Access-Control-Allow-Methods: GET, POST, PUT, HEAD, OPTIONS, DELETE"
      ];
      return "HTTP/1.0 204 OK" + CRLF + headers.join(CRLF) + CRLF + CRLF;
    } else {
      var actions = wApp$1.router.pointRequest(request.verb + " " + request.url.split(".")[0]);
      if (actions != "NOT FOUND") {
        var controllerAction = actions.split("#");
        return renderResponse(controllerAction[0], controllerAction[1], wApp$1, request);
      } else {
        var orphanHTML = getHTML("/views" + request.url);
        if (orphanHTML.html !== "") {
          var layoutHTML = getHTML("/layouts/application"), layoutBody = layoutHTML.html === "" ? "#yield" : layoutHTML.html, full_body = layoutBody.replace("#yield", orphanHTML.html);
          return renderResponseAssets({ html: full_body }, "text/html; charset=utf-8", wApp$1);
        } else {
          return "HTTP/1.0 404 NOT FOUND";
        }
      }
    }
  } catch (e) {
    switch (e.name) {
      case "SyntaxError":
        return renderErrorResponse(e, "Unable to parse JSON string");
      default:
        var errorDesc = logError(e);
        return renderErrorResponse(e, errorDesc);
    }
  }
}
function renderResponseAssets(record, type, wapp) {
  var CRLF = "\r\n", verb = "HTTP/1.0 200 OK", string = unescape(encodeURIComponent(record.html)), headers = ["Date: " + (/* @__PURE__ */ new Date()).toGMTString(), "Content-Length: " + string.length];
  if (record.useCache) {
    headers.push("Cache-Control: max-age=" + record.maxAge);
    headers.push("ETag: " + record.eTag);
  }
  headers = headers.concat(BasicHeaders$1).concat(["Content-Type: " + type]);
  var fullResponse = verb + CRLF + headers.join(CRLF) + CRLF + CRLF + string;
  return fullResponse;
}
function renderUnauthorized(realm) {
  var CRLF = "\r\n", jsonresp = unescape(encodeURIComponent(JSON.stringify({ message: "Unauthorized" }))), headers = BasicHeaders$1.concat(['WWW-Authenticate: Basic realm="' + (realm || "cirrus") + '"']);
  var resp = "HTTP/1.0 401 Unauthorized" + CRLF + headers.join(CRLF) + CRLF + CRLF + jsonresp;
  return resp;
}
function isAuthorized(controller, request) {
  var userAndPassword = Base64$1.decode(request.headers.Authorization.split(" ")[1]).split(":");
  return controller.authentication.username == userAndPassword[0] && controller.authentication.password == userAndPassword[1];
}
function renderResponse(controller, action, wapp, request) {
  var CRLF = "\r\n", type = request.extension || request.headers.Accept, needsAuthentication = wapp[controller].authentication !== void 0 && typeof wapp[controller].authentication == "object" && wapp[controller].authentication.username !== "" && wapp[controller].authentication.password !== "", actionRequired = ((wapp[controller].authentication || {}).actions || []).indexOf(action) > -1 || (wapp[controller].authentication || {}).all;
  if (needsAuthentication && actionRequired) {
    if (request.headers.Authorization === void 0 || isAuthorized(wapp[controller], request) === false) {
      return renderUnauthorized(wapp[controller].authentication.namespace);
    }
  }
  if (wapp[controller].before !== void 0 && typeof wapp[controller].before == "function") {
    wapp.router.params = wapp[controller].before(wapp.router.params);
  }
  var redirect_before = wapp.router.params.redirect_to !== void 0, jsonresp = redirect_before ? wapp.router.params : wapp[controller][action](wapp.router.params, request);
  type = type || "json";
  if (jsonresp.redirect_to) {
    type = "redirect";
  }
  var format = type.match(/(html|xml|json|redirect)/i) || ["json"];
  var rendered = Engine[format[0]](jsonresp, wapp, controller, action);
  var headers = ["Date: " + (/* @__PURE__ */ new Date()).toGMTString(), "Content-Length: " + (rendered.body ? rendered.body.length : "0")];
  headers = headers.concat(BasicHeaders$1).concat(rendered.headers).concat(wapp.responseHeaders.buildForHTTP());
  if (wApp$1.session.changed) {
    headers.push(wApp$1.session.setInHeader());
  }
  var fullResponse = rendered.verb + CRLF + headers.join(CRLF) + CRLF + CRLF + rendered.body;
  return fullResponse;
}
var Engine = {
  json: function(jsonresp, wapp) {
    var verb = jsonresp.responseCode !== void 0 && jsonresp.responseCode.code !== void 0 && jsonresp.responseCode.message !== void 0 ? "HTTP/1.0 " + jsonresp.responseCode.code + " " + jsonresp.responseCode.message : "HTTP/1.0 200 OK";
    delete jsonresp.responseCode;
    var jsonp = wapp.router.params.callback;
    jsonresp = jsonp ? jsonp + "(" + JSON.stringify(jsonresp) + ")" : JSON.stringify(jsonresp);
    jsonresp = unescape(encodeURIComponent(jsonresp));
    var headers = ["Content-Type: application/" + (jsonp ? "javascript" : "json") + "; charset=utf-8"];
    return { verb, body: jsonresp, headers };
  },
  html: function(jsonresp, wapp, controller, action) {
    var verb = "HTTP/1.0 200 OK", layout_body, full_body;
    if (typeof jsonresp == "object") {
      var layout = jsonresp.layout || "application", file = "/views/" + controller.replace("Controller", "") + "/" + action, template;
      jsonresp.controller = controller;
      jsonresp.action = action;
      jsonresp.session = wApp$1.session.session;
      jsonresp.flash = wApp$1.session.flashGet;
      if (jsonresp.layout !== false) {
        var layoutHTML = getHTML("/layouts/" + layout);
        if (layoutHTML.type === "template") {
          layout_temp = Handlebars.compile(layoutHTML.html);
        }
        layout_body = layoutHTML.type === "template" ? layout_temp(jsonresp) : layoutHTML.html;
      } else {
        layout_body = "#yield";
      }
      var pureHTML = getHTML(file);
      if (pureHTML.type === "template") {
        template = Handlebars.compile(pureHTML.html);
      }
      if (pureHTML.html === "") {
        pureHTML.html = "<div><h1>There is not view for this action</h1></div>";
      }
      var body2 = pureHTML.type === "template" ? template(jsonresp) : pureHTML.html;
      full_body = layout_body.replace("#yield", body2);
    } else {
      full_body = jsonresp;
    }
    var headers = ["Content-Type: text/html; charset=utf-8"];
    return { verb, body: wapp.isWindows() ? full_body : unescape(encodeURIComponent(full_body)), headers };
  },
  xml: function(jsonresp, wapp) {
    var verb = "HTTP/1.0 200 OK", headers = ["Content-Type: text/xml; charset=UTF-8"], xmlResp;
    if (jsonresp.xml) {
      xmlResp = wapp.isWindows() ? jsonresp.xml : unescape(encodeURIComponent(jsonresp.xml));
    } else {
      xmlResp = "<?xml version='1.0' encoding='UTF-8'?><error version='1.0'>The JSON object should have an xml key</error>";
    }
    return { verb, body: xmlResp, headers };
  },
  redirect: function(jsonresp) {
    var verb = "HTTP/1.0 302 Found";
    var headers = ["location: " + jsonresp.redirect_to];
    return { verb, body: "", headers };
  }
};
function getHTML(path) {
  importClass("VTextFile");
  importClass("VFile");
  var extension = path.split(".")[path.split(".").length - 1].match(/(css|js|html|woff|ttf|svg|eot)/i) === null ? ".html" : "";
  path += extension;
  var file = new VTextFile(wApp$1.config.root_path + path), file_hbs = new VTextFile(wApp$1.config.root_path + path + ".hbs"), type = file_hbs.exists() ? "template" : "html";
  if (file.exists()) {
    if (file.open(VFile.OpenModeReadOnly)) {
      html = file.readAll();
    } else {
      html = "";
    }
  } else if (file_hbs.exists()) {
    if (file_hbs.open(VFile.OpenModeReadOnly)) {
      html = file_hbs.readAll();
    } else {
      html = "";
    }
  } else {
    html = "";
  }
  return { html, type };
}
function logError(e) {
  return e.lineNumber === void 0 ? e.message : e.message + ". In Line Number: " + e.lineNumber;
}
function renderErrorResponse(e, errorDesc) {
  var CRLF = "\r\n";
  var jsonp = wApp$1.router.params.callback;
  var jsonresp = { message: errorDesc };
  jsonresp = jsonp ? jsonp + "(" + JSON.stringify(jsonresp) + ")" : JSON.stringify(jsonresp);
  jsonresp = unescape(encodeURIComponent(jsonresp));
  var resp = "HTTP/1.0 500 INTERNAL SERVER ERROR" + CRLF + BasicHeaders$1.join(CRLF) + CRLF + CRLF + jsonresp;
  return resp;
}
var cirrus = wApp$1;
const Base64 = base64Exports;
const renderUtils = v7_renderExports;
if (typeof globalThis.window === "undefined") {
  globalThis.window = globalThis;
}
const Handlebars$1 = commonjsGlobal.Handlebars;
commonjsGlobal.Base64 = Base64;
commonjsGlobal.Handlebars = Handlebars$1;
commonjsGlobal.renderProcess = renderUtils.renderProcess;
commonjsGlobal.renderQuery = renderUtils.renderQuery;
commonjsGlobal.vRegisterListToJSON = renderUtils.vRegisterListToJSON;
commonjsGlobal.mapField = renderUtils.mapField;
var cirrusNode = cirrus;
const cirrusNode$1 = /* @__PURE__ */ getDefaultExportFromCjs(cirrusNode);
module.exports = cirrusNode$1;
