var compressor = require('node-minify');

// Using Google Closure with jQuery 2.0
new compressor.minify({
    type: 'gcc',
    language: 'ECMASCRIPT5',
    fileIn: ['libs/base64.js', 'libs/handlebars.js', 'libs/cirrus.js'],
    fileOut: 'builds/cirrus.min.js',
    callback: function(err){
        console.log(err);
    }
});
