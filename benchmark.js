var Benchmark = require("benchmark");


var wApp = require("./builds/cirrus.min") 
var wApp2 = require("./builds/cirrus.min")

wApp.router.addRoutes({"resource users": "users"})
var routes = wApp.router.routes
store_routes = JSON.stringify(routes)

wApp.router.routes = {};

var suite = new Benchmark.Suite;
// add tests
suite.add('default behavior', function() {
  wApp.router.addRoutes({"resource users": "users"})
})
.add('variable JSON object', function() {
  wApp.router.routes = JSON.parse(store_routes)
})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})
// run async
.run({ 'async': true });
