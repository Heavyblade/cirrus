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
                var files = getFileNames("./../../spec/views"),
                    route = params[0],
                    i = files.length
                
                for(z=0; z < i ; z++) {
                    if (files[z].path == route) {
                        var file = files[z]
                        var record = new VRegister(theRoot);
                        record.fields = {NAME: file.path, BODY: file.content, TIPO: file.type }
                        this.records = [record]
                        return([record]);
                    } 
                }
  }

  this.records = []
  this.listSize = function() { this.records.length }
  this.readAt = function(position) { return(this.records[position]); }
}

module.exports = VRegisterList;
