function VRegister(theRoot) {
  this.fields = {};
  this.fieldToString = function(field) {
    return(this.fields[field]);
  };

  this.fieldToDouble = function(field) {
    return(this.fields[field]);
  };
  this.fieldToBool = function(field) {
    return(this.fields[field]);
  };

  this.fieldToInteger = function(field) {
    return(this.fields[field]);
  };

  this.setField = function(field, value) {
    this.fields[field] = value;
  };

}
module.exports = VRegister;
