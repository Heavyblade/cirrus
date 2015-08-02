theRoot = {}
var VRegister = require('./../libs/fake_vjavascript/vregister');
var VRegisterList = require('./../libs/fake_vjavascript/vregister_list');
var VTextFile = require('./../libs/fake_vjavascript/vtextfile');

describe("Fake implementation of vJavascript - VRegister", function() {
  it("should be able to set fields", function(){
      var record = new VRegister(theRoot);
      record.fields = {HI: "hello world"}
      expect(record.fieldToString("HI")).toEqual("hello world");
  })
});


describe("Fake implementation of vJavascrip - VRegisterList", function(){
  it("should be able to set the table", function(){
    var records = new VRegisterList(theRoot);
    records.setTable("alias/Table");
    expect(records.table).toEqual("alias/Table");
  });

  it("should show the ammount of records on the list", function(){
    var records = new VRegisterList(theRoot);
    records.setTable("alias/Table");

    var record = new VRegister(theRoot);
    record.fields = {HI: "hello world"}
    records.records = [record]
    expect(records.listSize()).toEqual(1);
  });

  it("should read an VRegister at n position", function(){
    var records = new VRegisterList(theRoot);
    records.setTable("alias/Table");

    var record = new VRegister(theRoot);
    record.fields = {HI: "hello world"}
    records.records = [record]

    expect(records.readAt(0).fieldToString("HI")).toEqual(record.fieldToString("HI"));
  });

  it("should be able to load records from fixture", function(){
    var records = new VRegisterList(theRoot);
    records.setTable("alias/files");

    records.load("ID", ["users/show"]);
    expect(records.listSize()).toEqual(1);
    expect(records.readAt(0).fieldToString("TIPO")).toEqual("1");
    expect(records.readAt(0).fieldToString("BODY")).toEqual("<div><h1>Hello World</h1></div>");
  });
})

describe("Fake implementation of VTextFile", function(){
  it("should be able to read file", function(){
      var html = wApp.getHTML("/users/show.html");
      expect(html.html).toEqual("<div><h1>Hello World</h1></div>");
  });

});
