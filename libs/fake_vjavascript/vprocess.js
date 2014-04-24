function VProcess(theRoot) {
  this.vars = {};

  this.setProcess = function(id_process){
    this.process = id_process;
  };

  this.exec = function(thread, cola) {
    this.vars.RESULT = JSON.stringify({hello: "world"});
  };

  this.result = function(){};
  
  this.setVar = function(key, value) {
      this.vars[key] = value;
  };

  this.varToString = function(key) {
   return(this.vars[key]);
  };

}
module.exports = VProcess;
