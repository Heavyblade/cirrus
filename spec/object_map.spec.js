wApp = require("./../builds/cirrus.min.test.js");

theRoot = {};
var VRegister = require('./../libs/fake_vjavascript/vregister');
var VRegisterList = require('./../libs/fake_vjavascript/vregister_list');
var VProcess = require('./../libs/fake_vjavascript/vprocess');

describe("Mapping v7 objects", function(){

  beforeEach(function(){
      wApp.router.routes = [];
      wApp.router.rexRoutes = [];
      wApp.router.params = {};
      theRoot.vars = {};
      // Setting up an Application to test
      wApp.router.addRoutes({"GET /users/:userid/show": "usersController#show"});
      CRLF = "\r\n";
  });


  it("should be able to transform an vRegisterList into a JSON object", function(){
      var tableinfo = {
          fieldCount: function(){return(this.fields.length);},
          fields: ["NAME", "VALUE", "CHECK"],
          fieldType: function(index) {
            var types = [1, 6, 10];
            return(types[index]);
          },
          fieldId: function(index) {return(this.fields[index]);}
      };

      var vregister_list = new VRegisterList(theRoot);
      vregister_list.tableInfo = function(){return(tableinfo);};

      var record1 = new VRegister(theRoot);
      record1.setField("NAME", "Cristian");
      record1.setField("VALUE", 20);
      record1.setField("CHECK", true);

      var record2 = new VRegister(theRoot);
      record2.setField("NAME", "Camilo");
      record2.setField("VALUE", 30);
      record2.setField("CHECK", true);

      var record3 = new VRegister(theRoot);
      record3.setField("NAME", "Vasquez");
      record3.setField("VALUE", 40);
      record3.setField("CHECK", false);

      vregister_list.records.push(record1);
      vregister_list.records.push(record2);
      vregister_list.records.push(record3);

      var json = wApp.vRegisterListToJSON(vregister_list);

      expect(json[0].NAME).toEqual("Vasquez");
      expect(json[0].VALUE).toEqual(40);
      expect(json[0].CHECK).toEqual(false);
  });

  it("Should render to JSON one single record", function(){
      var tableinfo = {
          fieldCount: function(){return(this.fields.length);},
          fields: ["NAME", "VALUE", "CHECK"],
          fieldType: function(index) {
            var types = [1, 6, 10];
            return(types[index]);
          },
          fieldId: function(index) {return(this.fields[index]);}
      };

      var vregister_list = new VRegisterList(theRoot);
      vregister_list.tableInfo = function(){return(tableinfo);};

      var record1 = new VRegister(theRoot);
      record1.setField("NAME", "Cristian");
      record1.setField("VALUE", 20);
      record1.setField("CHECK", true);

      vregister_list.records.push(record1);
      var json = wApp.vRegisterListToJSON(vregister_list);

      expect(vregister_list.size()).toEqual(1); 
      expect(json[0].NAME).toEqual("Cristian");
      expect(json[0].VALUE).toEqual(20);
      expect(json[0].CHECK).toEqual(true);
  });

  it("should render a json string with the result variable when render a process", function(){
      var result = wApp.renderProcess("MY_PROCESS", {}, wApp);
      var body = result.split("\r\n\r\n")[1];
      expect(body).toEqual(JSON.stringify({hello: "world"}));
  });
 
  it("should try to render a JSON array string if the out put is an vRegisterList object", function(){
      var result = wApp.renderProcess("MY_PROCESS", {}, wApp);
      var body = result.split("\r\n\r\n")[1];
      expect(body).toEqual(JSON.stringify({hello: "world"}));
  });

});
