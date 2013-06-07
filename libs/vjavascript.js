theRoot = {}
theApp = {
  globalVarToString: function(variable) {
    return(this.vars[variable] == undefined ? "" : this.vars[variable]);
  },
  vars: {},
  setGlobalVar: function(variable, value) {
      this.vars[variable] = value
  }
}
var VRegister = require('./../libs/fake_vjavascript/vregister');
var VRegisterList = require('./../libs/fake_vjavascript/vregister_list');
