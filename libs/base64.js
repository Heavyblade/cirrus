// xxxxxxxxxxxxxxxxxxx Base 64 Encode Libreary xxxxxxxxxxxx
function StringBuffer(){this.buffer=[]}StringBuffer.prototype.append=function(a){this.buffer.push(a);return this};StringBuffer.prototype.toString=function(){return this.buffer.join("")};
var Base64={codex:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(a){for(var c=new StringBuffer,a=new Utf8EncodeEnumerator(a);a.moveNext();){var b=a.current;a.moveNext();var d=a.current;a.moveNext();var e=a.current,h=b>>2,b=(b&3)<<4|d>>4,g=(d&15)<<2|e>>6,f=e&63;isNaN(d)?g=f=64:isNaN(e)&&(f=64);c.append(this.codex.charAt(h)+this.codex.charAt(b)+this.codex.charAt(g)+this.codex.charAt(f))}return c.toString()},decode:function(a){for(var c=new StringBuffer,a=new Base64DecodeEnumerator(a);a.moveNext();){var b=
a.current;if(128>b)c.append(String.fromCharCode(b));else if(191<b&&224>b){a.moveNext();var d=a.current;c.append(String.fromCharCode((b&31)<<6|d&63))}else a.moveNext(),d=a.current,a.moveNext(),c.append(String.fromCharCode((b&15)<<12|(d&63)<<6|a.current&63))}return c.toString()}};function Utf8EncodeEnumerator(a){this._input=a;this._index=-1;this._buffer=[]}
Utf8EncodeEnumerator.prototype={current:Number.NaN,moveNext:function(){if(0<this._buffer.length)return this.current=this._buffer.shift(),!0;if(this._index>=this._input.length-1)return this.current=Number.NaN,!1;var a=this._input.charCodeAt(++this._index);13==a&&10==this._input.charCodeAt(this._index+1)&&(a=10,this._index+=2);128>a?this.current=a:(127<a&&2048>a?this.current=a>>6|192:(this.current=a>>12|224,this._buffer.push(a>>6&63|128)),this._buffer.push(a&63|128));return!0}};
function Base64DecodeEnumerator(a){this._input=a;this._index=-1;this._buffer=[]}
Base64DecodeEnumerator.prototype={current:64,moveNext:function(){if(0<this._buffer.length)return this.current=this._buffer.shift(),!0;if(this._index>=this._input.length-1)return this.current=64,!1;var a=Base64.codex.indexOf(this._input.charAt(++this._index)),c=Base64.codex.indexOf(this._input.charAt(++this._index)),b=Base64.codex.indexOf(this._input.charAt(++this._index)),d=Base64.codex.indexOf(this._input.charAt(++this._index)),e=(b&3)<<6|d;this.current=a<<2|c>>4;64!=b&&this._buffer.push((c&15)<<
4|b>>2);64!=d&&this._buffer.push(e);return!0}};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Base64;
}
