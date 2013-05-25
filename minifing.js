var compressor = require('node-minify');

// Using Google Closure with jQuery 2.0
new compressor.minify({
    type: 'no-compress',
    language: 'ECMASCRIPT5',
    fileIn: ['libs/vjavascript.js','libs/base64.js', 'libs/handlebars_vm.js', 'libs/cirrus.js'],
    fileOut: 'builds/cirrus.min.js',
    callback: function(err){
        console.log(err);
    }
});
