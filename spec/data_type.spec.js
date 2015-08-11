wApp = require("./../builds/cirrus.min.test.js");

describe("Data Type matching for params", function(){
  it("should identify a pure integer param", function(){
     var param = "123";
     expect(wApp.getType(param)).toEqual(123);
  });

  it("should identify a float comma separated", function(){
      var param = "123,456";
     expect(wApp.getType(param)).toEqual(123.456);
  });

  it("should identify a float point separated", function(){
      var param = "123.45";
      expect(wApp.getType(param)).toEqual(123.45);
  });

  it("should identify a currency float point separated", function(){
      var param = "123.456.000,23";
      expect(wApp.getType(param)).toEqual(123456000.23);
  });

  it("should identify a currency  point separated", function(){
      var param = "123,456,000.23";
      expect(wApp.getType(param)).toEqual(123456000.23);
  });

  it("should identify a boolean", function(){
      var param = "true";
      expect(wApp.getType(param)).toEqual(true);

      var param = "false";
      expect(wApp.getType(param)).toEqual(false);
  });

  it("should parse a date format dd/mm/yyyy or d/m/yy", function(){
     var date1 = "26/05/2014";
     var asDate = new Date(2014, 4, 26);
     expect(wApp.getType(date1)).toEqual(asDate);

     var date1 = "26-05-2014";
     var asDate = new Date(2014, 4, 26);
     expect(wApp.getType(date1)).toEqual(asDate);

     var date1 = "1/5/2014";
     var asDate = new Date(2014, 4, 1);
     expect(wApp.getType(date1)).toEqual(asDate);

     var date1 = "1-5-2014";
     var asDate = new Date(2014, 4, 1);
     expect(wApp.getType(date1)).toEqual(asDate);

     var date1 = "11/08/2015";
     var asDate = new Date(2015,7,11);
     expect(wApp.getType(date1)).toEqual(asDate);
  });

  it("Should parse a date format yyyy/mm/dd or yyyy/m/d", function(){
     var date1 = "2014/05/26";
     var asDate = new Date(2014, 4, 26);
     expect(wApp.getType(date1)).toEqual(asDate);

     var date1 = "2014-05-26";
     var asDate = new Date(2014, 4, 26);
     expect(wApp.getType(date1)).toEqual(asDate);
  });

  describe("Parse date time strings", function(){
     it("Should parse a local string PM", function(){
        var param = "5/25/2014 9:05:34 PM";
        var asDate = new Date(2014, 4, 25, 21, 5, 34);
        expect(wApp.getType(param)).toEqual(asDate);
     });

     it("Should parse a local string AM", function(){
        var param = "5/25/2014 9:05:34 AM";
        var asDate = new Date(2014, 4, 25, 9, 5, 34);
        expect(wApp.getType(param)).toEqual(asDate);
     });

  });

  it("should parce an ISO date", function(){
      var param = "2014-05-26T02:25:07.850Z";
      var asDate = new Date(2014, 4, 26, 2, 25, 7);
      expect(wApp.getType(param)).toEqual(asDate);
  });

  it("should parce an ISO date 24 hours", function(){
      var param = "2014-05-26T20:25:07.850Z";
      var asDate = new Date(2014, 4, 26, 20, 25, 7);
      expect(wApp.getType(param)).toEqual(asDate);
  });
});
