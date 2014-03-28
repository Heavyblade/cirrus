wApp = require("./../builds/cirrus.min.test.js");

theRoot = {};

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
          fields: ["ONE", "TWO", "TREE"],
          fieldType: [1, 6, 10],
          fieldId: function(index) {return(this.fields[index]);}
      };

      var vregister_list = new VRegisterList(theRoot);
      vregister_list.tableInfo = function(){return(tableinfo);};

  });
});
