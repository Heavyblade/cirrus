var VRegister = require("./vregister");
var jf = require('jsonfile')
var fs = require('fs');
var theRoot = {} 

function getFileNames(path) {
    var files = fs.readdirSync(path); 
    var i = files.length
    var fileList = new Array()
    while(i--) {
      var file = files[i];
      if(file.match(/.+\..+$/)) {
        var content = fs.readFileSync((path + "/" + file), 'utf8')
        fileList.push({path: path, file: file, content: content, type: "1"})
      } else {
        fileList = fileList.concat(getFileNames(path + "/" + file))
      }
    }
    return(fileList);
}

function VRegisterList(theRoot) {
  this.table = ""
  this.setTable = function(table) { this.table = table }
  
  this.load = function(index, params) {
     var file = jf.readFileSync("./spec/fixtures/files.json")
     var base = file[params[0]]
     var registro = new VRegister(theRoot);
     registro.fields = {BODY: base.content, TIPO: base.tipo}
     this.records = [registro]
     return([registro]);
  }

  this.records = []
  this.listSize = function() { return(this.records.length) }
  this.readAt = function(position) { return(this.records[position]); }
}

module.exports = VRegisterList;
