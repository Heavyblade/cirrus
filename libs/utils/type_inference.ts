export function getType(str) {
  var isInteger = /^[1-9]\d*$/i,
    isCommaFloat = /^\d*,\d*$/i,
    isPointFloat = /^\d*\.\d*$/i,
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
    isDateTimeISO = /^\d{2,4}-\d{1,2}-\d{1,2}T\d{1,2}:\d{1,2}:\d{1,2}\.\d*Z$/,
    params1, params2, params, date, year, month, day, minute, second;


  if (str.match(isInteger) && str.length < 14) { return (parseInt(str, 10)); }
  if (str.match(isCurrencyComma)) { return (parseFloat(str.replace(/\./g, "").replace(",", "."))); }
  if (str.match(isCurrencyPoint)) { return (parseFloat(str.replace(/\,/g, ""))); }
  if (str.match(isCommaFloat)) { return (parseFloat(str.replace(",", "."))); }
  if (str.match(isPointFloat)) { return (parseFloat(str)); }
  if (str.match(isBool)) { return (str == "true" ? true : false); }
  if (str.match(isPureDatedmy)) {
    params1 = str.split("/");
    params2 = str.split("-");
    params = params1.length > 1 ? params1 : params2;
    date = new Date(parseInt(params[2], 10), (parseInt(params[1], 10) - 1), parseInt(params[0], 10));
    return (date);
  }
  if (str.match(isPureDateymd)) {
    params1 = str.split("/");
    params2 = str.split("-");
    params = params1.length > 1 ? params1 : params2;
    date = new Date(parseInt(params[0], 10), (parseInt(params[1], 10) - 1), parseInt(params[2], 10));
    return (date);
  }
  if (str.match(isDateTime)) {
    params = str.split(" ");
    var dayParts = params[0].split("/");
    var hourParts = params[1].split(":");
    var hora = params[2].match(/am/i) ? parseInt(hourParts[0]) : (parseInt(hourParts[0]) + 12);
    date = new Date(parseInt(dayParts[2], 10), (parseInt(dayParts[0], 10) - 1), parseInt(dayParts[1], 10), hora, parseInt(hourParts[1], 10), parseInt(hourParts[2], 10));
    return (date);
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
    return (date);
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
    return (date);
  }

  return (str);
}
