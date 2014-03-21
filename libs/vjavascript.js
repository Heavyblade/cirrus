theRoot = {
  varToString: function(variable) {
    return(this.vars[variable] == undefined ? "" : this.vars[variable]);
  },
  vars: {},
  setVar: function(variable, value) {
      this.vars[variable] = value
  }
}
var VRegister = require('./../libs/fake_vjavascript/vregister');
var VRegisterList = require('./../libs/fake_vjavascript/vregister_list');
var VProcess = require('./../libs/fake_vjavascript/vprocess');
