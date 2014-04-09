function renderProcess(processId, params) {
  var process = new VProcess(theRoot);
  process.setProcess(processId);

  var CRLF = "\r\n";
  var verb = "HTTP/1.0 200 OK";

  var keysList = Object.keys(params);
  var i = keysList.length;

  while(i--) { process.setVar(keysList[i].toUpperCase(),  params[keysList[i]]);}

  process.exec();

  var result = process.varToString("RESULT");

  // If the var result is empty try to render the output
  if (result === "") {
      var pResult = process.result();
      if ((process.objectInfo().outputType() === 2) && (pResult.size() > 0)) {
          result = JSON.stringify(vRegisterListToJSON(pResult, params.fields));
      } else if (process.objectInfo().outputType() === 1) {
          var list = new VRegisterList(theRoot);
          list.setTable(pResult.tableInfo().idRef());
          list.append(pResult);
          result = JSON.stringify(vRegisterListToJSON(list, params.fields));
      }
  }

  var headers = [("Date: " + (new Date()).toGMTString()),("Content-Length: " + result.length)];
  headers = headers.concat(BasicHeaders).concat(["Content-Type: text/html; charset=utf-8"]);

  var fullResponse = verb + CRLF + headers.join(CRLF) + CRLF + CRLF + result;
  return(fullResponse);
}

function renderQuery(queryId, params) {
  var query = new VQuery(theRoot);
  query.setQuery(queryId);

  var CRLF = "\r\n";
  var verb = "HTTP/1.0 200 OK";

  var keysList = Object.keys(params);
  var i = keysList.length;

  while(i--) { query.setVar(keysList[i].toUpperCase(),  params[keysList[i]]);}

  if (query.exec()) {
     var jsonResp = JSON.stringify(vRegisterListToJSON(query.result(), params.fields));
  }
  var headers = [("Date: " + (new Date()).toGMTString()),("Content-Length: " + jsonResp.length)];
  headers = headers.concat(BasicHeaders).concat(["Content-Type: application/json; charset=utf-8"]);

  var fullResponse = verb + CRLF + headers.join(CRLF) + CRLF + CRLF + jsonResp;
  return(fullResponse);
}

function vRegisterListToJSON(vregisterlist, neededFields) {
    var table = vregisterlist.tableInfo();
    var nFields = nFields2 = table.fieldCount();
    var i = vregisterlist.size();
    var result = [];

    var fields = [];

    // Selecting fields to be mapped
    if (neededFields === undefined) {
      while(nFields--) { fields.push({fieldName: table.fieldId(nFields), fieldType: table.fieldType(nFields)}); }
    } else {
      neededFields = neededFields.toUpperCase().split(",");
      while(nFields--) { 
        if ( neededFields.indexOf(table.fieldId(nFields)) > -1 ) { fields.push({fieldName: table.fieldId(nFields), fieldType: table.fieldType(nFields)}); }
       }
    }

    var nFields = fields.length;
    while(i--) {
      var record = vregisterlist.readAt(i);
      var z = nFields;
      var recordJSON = {};
      while(z--) {
          recordJSON[fields[z].fieldName] = mapField(fields[z].fieldType, fields[z].fieldName, record);
      }
      result.push(recordJSON);
    }
    return(result);
}

function mapField(type, fieldName, record) {
  type = parseInt(type);
  switch (type) {
    case 0:
    case 1:
    case 2:
    case 3:
    case 4:
    case 5:
       var result = record.fieldToString(fieldName);
       break;
    case 6:
       var result = record.fieldToDouble(fieldName);
       break;
    case 7:
       var result = record.fieldToDate(fieldName);
       break;
    case 8:
       var result = record.fieldToTime(fieldName);
       break;
    case 9:
       var result = record.fieldToDateTime(fieldName);
       break;
    case 10:
       var result = record.fieldToBool(fieldName);
       break;
    default:
       var result = record.fieldToString(fieldName);
  }
  return(result);
}
