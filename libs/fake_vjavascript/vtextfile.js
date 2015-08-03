var jf = require('jsonfile'),
    fs = require('fs'),
    Handlebars = require('./../handlebars');


function VTextFile(path) {
    this.path    = path;
    this.readAll = function() {
                  var file = jf.readFileSync("./spec/fixtures/hd_files.json");
                  var html = file[this.path];

                  if ( this.path.split(".")[this.path.split(".").length-1] == "hbs" ) {
                      html.content = Handlebars.precompile(html.content).toString();
                  }

                  if (html != undefined) {
                      return(html.content);
                  } else {
                      return("");
                  }

    };
    this.exists  = function() {
                  var file = jf.readFileSync("./spec/fixtures/hd_files.json");
                  var html = file[this.path];
                  return(html !== undefined);
    };
    this.open   = function(mode) {
                  return true;
    };
}

module.exports = VTextFile;
