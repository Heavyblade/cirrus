var VRegister = require("./vregister");
var jf = require('jsonfile')
var Handlebars = require("./../handlebars")
var fs = require('fs');
var theRoot = {}

function VRegisterList(theRoot) {
  this.table = ""
  this.setTable = function(table) { this.table = table }
  this.load = function(index, params) {
     this.records = []
     var file = jf.readFileSync("./spec/fixtures/files.json")
     var base = file[params[0]]
     if (base != undefined) {
         var registro = new VRegister(theRoot);
         registro.fields = {BODY: base.content, TIPO: base.tipo, COMPILED: ""};
         this.records = [registro]
         return([registro]);
     } else {
       return([]);
     }
  }
  this.records = []
  this.listSize = function() { return(this.records.length) }
  this.size = function() { return(this.listSize()); }
  this.readAt = function(position) { return(this.records[position]); }
}

module.exports = VRegisterList;
