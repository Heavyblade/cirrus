String.prototype.repeat = function(num){
    return new Array( num + 1 ).join( this );
}

String.prototype.rjust = function(width, padding) {
    padding = padding || " ";
    padding = padding.substr(0, 1);
    
    if (this.length < width) {
        return padding.repeat(width - this.length) + this;
    } else {
        return this;
    }
}

String.prototype.spacify = function() {
    var sentence = this.replace(/__/g, '-').replace(/_/g, ' ');
    if (sentence.match(/\s/) && !sentence.match(/\-/)) {
      var words = sentence.split(' ');
      for (i in words) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
      }
      sentence = words.join(' ');
    }
    return sentence.replace(/\-/g, '_');
}