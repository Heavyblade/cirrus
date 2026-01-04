var fs = require('fs'),
    Handlebars = require('./../handlebars');


function VTextFile(path) {
    this.path    = path;
    this.readAll = function() {
                  var file = JSON.parse(fs.readFileSync("./spec/fixtures/hd_files.json"));
                  var html = file[this.path];

                  if (html != undefined) {
                      return(html.content);
                  } else {
                      return("");
                  }

    };
    this.exists  = function() {
                  var file = JSON.parse(fs.readFileSync("./spec/fixtures/hd_files.json"));
                  var html = file[this.path];
                  return(html !== undefined);
    };
    this.open   = function(mode) {
                  return true;
    };
}

module.exports = VTextFile;
