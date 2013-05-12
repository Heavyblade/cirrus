var compressor = require('node-minify');

// Using Google Closure with jQuery 2.0
new compressor.minify({
    type: 'no-compress',
    language: 'ECMASCRIPT5',
    fileIn: ['libs/base64.js', 'libs/cirrus.js'],
    fileOut: 'builds/cirrus.min.js',
    callback: function(err){
        console.log('GCC jquery 2.0');
        console.log(err);
    }
});