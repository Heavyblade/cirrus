var compressor = require('node-minify');

// Using Google Closure with jQuery 2.0
new compressor.minify({
    type: 'no-compress',
    language: 'ECMASCRIPT5',
    fileIn: ['libs/vjavascript.js','libs/base64.js', 'libs/v7_render.js', 'libs/handlebars_vm.js', 'libs/cirrus.js'],
    fileOut: 'builds/cirrus.min.test.js',
    callback: function(err){
        console.log(err);
    }
});

new compressor.minify({
    type: 'gcc',
    language: 'ECMASCRIPT5',
    fileIn: ['libs/v7_render.js', 'libs/cirrus.js'],
    fileOut: 'builds/cirrus.min.js',
    callback: function(err){
                var fs = require('fs');
                fs.readFile("builds/cirrus.min.js", 'utf8', function (err,data) {
                  if (err) {
                    return console.log(err);
                  }
                  var result = data.replace(/module\.exports\=wApp\;/, '');

                  fs.writeFile("builds/cirrus.min.js", result, 'utf8', function (err) {
                     if (err) return console.log(err);
                  });
                });
              console.log(err);
    }
});
