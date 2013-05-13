function VRegister(theRoot) {
  this.fields = {}
  this.fieldToString = function(field) {
    return(this.fields[field]);
  }

}
module.exports = VRegister;
