var theRoot = {
  varToString: function(variable) {
    return(this.vars[variable] === undefined ? "" : this.vars[variable]);
  },
  vars: {},
  setVar: function(variable, value) {
      this.vars[variable] = value
  }
};

function importClass(klass) {
    return(klass);
};

var VRegister     = require('./../libs/fake_vjavascript/vregister');
var VRegisterList = require('./../libs/fake_vjavascript/vregister_list');
var VProcess      = require('./../libs/fake_vjavascript/vprocess');
var VTextFile     = require('./../libs/fake_vjavascript/vtextfile');
var VFile         = require('./../libs/fake_vjavascript/vfile');

global.VRegister = VRegister;
global.VRegisterList = VRegisterList;
global.VProcess = VProcess;
global.VTextFile = VTextFile;
global.VFile = VFile;
global.theRoot = theRoot;
global.importClass = importClass;
