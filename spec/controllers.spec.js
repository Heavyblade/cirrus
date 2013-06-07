describe("Controller creation", function(){
  beforeEach(function(){
    wApp.router.routes = {};
    wApp.router.params = {};
    theRoot.vars = {};
  });

  it("should add controllers to wApp object", function(){
    wApp.usersController = {
        show: function(params){return({hello: "world", id: wApp.router.params.userid, x: wApp.router.params.x})}
    }

    expect(typeof(wApp.usersController)).toEqual("object")
    expect(typeof(wApp.posts)).toEqual("undefined")
  });

  it("should receive the params from the request", function(){
    wApp.usersController = {
      show: function(params){return({hello: "world", id: params.id})}
    }
    
    wApp.router.addRoutes({"GET /users/:id":  "usersController#show"});
    var httpGet = "GET /users/23 HTTP/1.1\r\n\r\n"
    var request = wApp.request(httpGet)
    var response = wApp.response(request)
    var respObj = JSON.parse(response.split("\r\n\r\n")[1])
    expect(respObj.id).toEqual("23")
  })
});

function alert(x) {return(x)}
describe("Logging Errors", function(){

  it("should be able to show to me the error message and the stacktrace if is needed", function(){
    try {
      i.dont.exist += 0
    } catch(e) {
      expect(wApp.logError(e)).toEqual("i is not defined");
    }
  })

});

