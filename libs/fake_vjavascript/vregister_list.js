var fs = require('fs');
var theRoot = {} 

function VRegisterList(theRoot) {
  this.table = ""
  this.setTable = function(table) { this.table = table }
  
  this.load = function(index, params) {
    files = getFileNames("./../spec");
  }

  this.records = []
  this.readAt = function(position) { return(this.records[position]); }
}

function getFileNames(path) {
    var files = fs.readdirSync(path); 
    var i = files.length
    var files = []
    while(i--) {
      var file = files[i];
      
      if(file.match(/.+js$/)) {
        var content = fs.readFile('/etc/passwd', function (err, data) {
                        if (err) throw err;
                        console.log(data);
        });

        files.push({name: filem type: "1"})
      } else {
      
      }
    }
}
