function renderProcess(processId, params) {
    importClass("VProcess");
    var process = new VProcess(theRoot);
    var fields = params.fields;
    process.setProcess(processId);

    var CRLF = "\r\n";
    var verb = "HTTP/1.0 200 OK";
    delete(params.body);
    delete(params.fields);
    var keysList = Object.keys(params);
    var i = keysList.length;

    while(i--) { process.setVar(keysList[i].toUpperCase(),  wApp.getType(params[keysList[i]]) );}

    process.exec();

    var result = process.varToString("RESULT");

    // If the var result is empty try to render the output
    if (result === "") {
        var pResult = process.result();
        if ((process.objectInfo().outputType() === 2) && (pResult.size() > 0)) {
            result = JSON.stringify(vRegisterListToJSON(pResult, fields));
        } else if (process.objectInfo().outputType() === 1) {
            var list = new VRegisterList(theRoot);
            list.setTable(pResult.tableInfo().idRef());
            list.append(pResult);
            result = JSON.stringify(vRegisterListToJSON(list, fields));
        }
    }

    var headers = [("Date: " + (new Date()).toGMTString()),("Content-Length: " + result.length)];
    headers = headers.concat(BasicHeaders).concat(["Content-Type: text/html; charset=utf-8"]);

    var fullResponse = verb + CRLF + headers.join(CRLF) + CRLF + CRLF + result;
    return(fullResponse);
}

function renderQuery(queryId, params) {
    importClass("VQuery");
    var query = new VQuery(theRoot);
    var fields = params.fields;
    query.setQuery(queryId);

    var CRLF = "\r\n";
    var verb = "HTTP/1.0 200 OK";

    delete(params.body);
    delete(params.fields);
    var keysList = Object.keys(params);
    var i = keysList.length;

    while(i--) { query.setVar(keysList[i].toUpperCase(),  wApp.getType(params[keysList[i]]));}

    if (query.exec()) {
       var jsonResp = JSON.stringify(vRegisterListToJSON(query.result(), fields));
       var headers = [("Date: " + (new Date()).toGMTString()),("Content-Length: " + jsonResp.length)];
       headers = headers.concat(BasicHeaders).concat(["Content-Type: application/json; charset=utf-8"]);

       var fullResponse = verb + CRLF + headers.join(CRLF) + CRLF + CRLF + jsonResp;
       return(fullResponse);
    }
}

function vRegisterListToJSON(vregisterlist, neededFields) {
    var table   = vregisterlist.tableInfo(),
        nFields = table.fieldCount(),
        i       = vregisterlist.size(),
        result  = [],
        fields  = [],
        type    = 0,
        fieldType;

    // Selecting fields to be mapped
    if (neededFields === undefined) {
        while(nFields--) {
            fieldType = parseInt(table.fieldType(nFields), 10);
            type = (fieldType === 11 ? parseInt("11" + table.fieldObjectType(nFields)) : fieldType);
            fields.push({fieldName: table.fieldId(nFields), fieldType: type});
        }
    } else {
      neededFields = neededFields.toUpperCase().split(",");
      while(nFields--) {
        if ( neededFields.indexOf(table.fieldId(nFields)) > -1 ) { fields.push({fieldName: table.fieldId(nFields), fieldType: table.fieldType(nFields)}); }
       }
    }

    nFields = fields.length;
    while(i--) {
      var record     = vregisterlist.readAt(i),
          z          = nFields,
          recordJSON = {};
      while(z--) {
          recordJSON[fields[z].fieldName] = mapField(fields[z].fieldType, fields[z].fieldName, record);
      }
      result.push(recordJSON);
    }
    return(result);
}

function mapField(type, fieldName, record) {
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
  return(result);
}
